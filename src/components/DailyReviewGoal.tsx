import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Target, AlertCircle, CheckCircle2, Settings2, X, Flame,
  Bookmark, Plus, Trash2, Check,
} from "lucide-react";
import type { Flashcard } from "@/data/theory";
import { toast } from "sonner";

/** SM-2 entry shape — must stay in sync with FlashcardDeck.tsx */
interface SrsEntry {
  ef: number; interval: number; reps: number;
  due: string; reviews: number; last: string;
}

interface GoalSettings {
  /** Reviews per day target. */
  dailyTarget: number;
  /** Topics counted toward the goal. Empty = all topics. */
  topics: string[];
  /** Show inline reminder banner when due cards exist. */
  remindersOn: boolean;
}

/**
 * Saved bundle of goal settings the user can swap between
 * (e.g. "Exam 1", "Revision Week"). Stored separately so swapping
 * a preset overwrites the live settings without losing other presets.
 */
interface GoalPreset {
  id: string;
  name: string;
  settings: GoalSettings;
}

interface GoalProgress {
  /** YYYY-MM-DD of today's tracked session. Reset when day rolls over. */
  day: string;
  /** Cards reviewed today (counted toward target). */
  reviewedToday: number;
  /** Current daily-goal hit streak. */
  streak: number;
  /** Last day the goal was hit (YYYY-MM-DD). */
  lastHit: string;
}

const SETTINGS_KEY = "lc-flash-goal-settings-v1";
const PROGRESS_KEY = "lc-flash-goal-progress-v1";
const PRESETS_KEY = "lc-flash-goal-presets-v1";
const SRS_KEY = "lc-flash-srs-v1";

const todayISO = () => new Date().toISOString().slice(0, 10);
function diffDays(a: string, b: string) {
  return Math.round(
    (new Date(a).getTime() - new Date(b).getTime()) / 86_400_000,
  );
}

/**
 * Daily review goal tracker for the flashcard deck.
 * - Target N cards/day, optionally restricted to chosen topics
 * - Shows progress, due-today reminder, and a hit-streak counter
 * - Persists to localStorage; counts cards reviewed today by inspecting
 *   the shared SRS map (cards whose `last` field equals today)
 */
export default function DailyReviewGoal({
  allCards,
  availableTopics,
  onJumpToDue,
}: {
  allCards: Flashcard[];
  availableTopics: string[];
  onJumpToDue?: () => void;
}) {
  const [settings, setSettings] = useLocalStorage<GoalSettings>(SETTINGS_KEY, {
    dailyTarget: 20,
    topics: [],
    remindersOn: true,
  });
  const [progress, setProgress] = useLocalStorage<GoalProgress>(PROGRESS_KEY, {
    day: todayISO(),
    reviewedToday: 0,
    streak: 0,
    lastHit: "",
  });
  const [presets, setPresets] = useLocalStorage<GoalPreset[]>(PRESETS_KEY, []);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [newPresetName, setNewPresetName] = useState("");
  const [srs] = useLocalStorage<Record<string, SrsEntry>>(SRS_KEY, {});
  const [editing, setEditing] = useState(false);

  const today = todayISO();
  const inScope = (topic: string) =>
    settings.topics.length === 0 || settings.topics.includes(topic);

  const scopedCards = useMemo(
    () => allCards.filter(c => inScope(c.topic)),
    [allCards, settings.topics],
  );

  // Cards reviewed today within scope (derived from SRS map).
  const reviewedTodayDerived = useMemo(() => {
    let n = 0;
    for (const c of scopedCards) {
      const e = srs[c.term];
      if (e && e.last === today) n += 1;
    }
    return n;
  }, [scopedCards, srs, today]);

  // Due / overdue counts within scope.
  const dueCount = useMemo(() => {
    let n = 0;
    for (const c of scopedCards) {
      const e = srs[c.term];
      if (!e || e.due <= today) n += 1;
    }
    return n;
  }, [scopedCards, srs, today]);

  const overdueCount = useMemo(() => {
    let n = 0;
    for (const c of scopedCards) {
      const e = srs[c.term];
      if (e && e.due < today) n += 1;
    }
    return n;
  }, [scopedCards, srs, today]);

  // Reset/roll progress when the day changes, and update streak when target hit.
  useEffect(() => {
    if (progress.day !== today) {
      // Day rolled over — if yesterday's goal was missed, break streak.
      const missed =
        progress.lastHit === "" || diffDays(today, progress.lastHit) > 1;
      setProgress({
        day: today,
        reviewedToday: 0,
        streak: missed ? 0 : progress.streak,
        lastHit: progress.lastHit,
      });
      return;
    }
    // Sync today's count from SRS truth.
    if (reviewedTodayDerived !== progress.reviewedToday) {
      const justHit =
        reviewedTodayDerived >= settings.dailyTarget &&
        progress.reviewedToday < settings.dailyTarget;
      setProgress(p => ({
        ...p,
        reviewedToday: reviewedTodayDerived,
        ...(justHit
          ? {
              lastHit: today,
              streak:
                p.lastHit && diffDays(today, p.lastHit) === 1
                  ? p.streak + 1
                  : Math.max(p.streak, 1),
            }
          : {}),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today, reviewedTodayDerived, settings.dailyTarget]);

  const pct = Math.min(
    100,
    Math.round((reviewedTodayDerived / Math.max(1, settings.dailyTarget)) * 100),
  );
  const goalHit = reviewedTodayDerived >= settings.dailyTarget;

  const toggleTopic = (t: string) =>
    setSettings(s => ({
      ...s,
      topics: s.topics.includes(t)
        ? s.topics.filter(x => x !== t)
        : [...s.topics, t],
    }));

  // ── Preset helpers ────────────────────────────────────────
  const applyPreset = (p: GoalPreset) => {
    setSettings(p.settings);
    setActivePresetId(p.id);
    toast.success(`Switched to "${p.name}"`);
  };
  const saveAsPreset = () => {
    const name = newPresetName.trim();
    if (!name) {
      toast.error("Name your preset first");
      return;
    }
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    setPresets(ps => [...ps, { id, name, settings: { ...settings } }]);
    setActivePresetId(id);
    setNewPresetName("");
    toast.success(`Saved "${name}"`);
  };
  const overwriteActive = () => {
    if (!activePresetId) return;
    setPresets(ps =>
      ps.map(p => (p.id === activePresetId ? { ...p, settings: { ...settings } } : p)),
    );
    const name = presets.find(p => p.id === activePresetId)?.name ?? "preset";
    toast.success(`Updated "${name}"`);
  };
  const deletePreset = (id: string) => {
    const name = presets.find(p => p.id === id)?.name ?? "preset";
    if (!confirm(`Delete preset "${name}"?`)) return;
    setPresets(ps => ps.filter(p => p.id !== id));
    if (activePresetId === id) setActivePresetId(null);
  };

  // Detect whether the current settings still match the active preset.
  const activePresetDirty = useMemo(() => {
    if (!activePresetId) return false;
    const p = presets.find(x => x.id === activePresetId);
    if (!p) return false;
    return JSON.stringify(p.settings) !== JSON.stringify(settings);
  }, [activePresetId, presets, settings]);

  return (
    <Card className="mb-4 border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card">
      <CardContent className="p-4">
        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="font-display text-sm font-semibold text-foreground">
            Daily review goal
          </h3>
          {progress.streak > 0 && (
            <Badge
              variant="outline"
              className="ml-1 gap-1 text-[10px] font-mono border-primary/30 text-primary"
            >
              <Flame className="h-3 w-3" /> {progress.streak}d
            </Badge>
          )}
          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {reviewedTodayDerived} / {settings.dailyTarget} today
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
            onClick={() => setEditing(e => !e)}
            aria-label="Goal settings"
          >
            {editing ? <X className="h-3.5 w-3.5" /> : <Settings2 className="h-3.5 w-3.5" />}
          </Button>
        </div>

        {/* Preset switcher — quick swap between saved topic+target bundles */}
        {presets.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <Bookmark className="h-3 w-3 text-muted-foreground" />
            {presets.map(p => {
              const active = p.id === activePresetId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono border transition-colors inline-flex items-center gap-1 ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                  title={`${p.settings.dailyTarget}/day · ${p.settings.topics.length || "all"} topics`}
                >
                  {active && <Check className="h-3 w-3" />}
                  {p.name}
                </button>
              );
            })}
            {activePresetId && activePresetDirty && (
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400">
                · unsaved changes
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all ${
              goalHit ? "bg-primary" : pct >= 50 ? "bg-primary/70" : "bg-primary/40"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Status / reminder */}
        <div className="flex items-center gap-2 text-[11px] font-body">
          {goalHit ? (
            <span className="inline-flex items-center gap-1 text-primary font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Goal hit — {reviewedTodayDerived - settings.dailyTarget > 0
                ? `+${reviewedTodayDerived - settings.dailyTarget} bonus reviews`
                : "great work"}
              .
            </span>
          ) : settings.remindersOn && dueCount > 0 ? (
            <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-3.5 w-3.5" />
              {overdueCount > 0
                ? `${overdueCount} overdue · ${dueCount} due today`
                : `${dueCount} due today`}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {settings.dailyTarget - reviewedTodayDerived} to go
              {settings.topics.length > 0
                ? ` · ${settings.topics.length} topic${settings.topics.length === 1 ? "" : "s"} selected`
                : ""}
            </span>
          )}
          {!goalHit && dueCount > 0 && onJumpToDue && (
            <Button
              size="sm"
              variant="outline"
              className="ml-auto h-6 px-2 text-[11px]"
              onClick={onJumpToDue}
            >
              Review due
            </Button>
          )}
        </div>

        {/* Settings panel */}
        {editing && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs text-foreground font-body">
                Cards per day
              </label>
              <Input
                type="number"
                min={1}
                max={500}
                value={settings.dailyTarget}
                onChange={(e) =>
                  setSettings(s => ({
                    ...s,
                    dailyTarget: Math.max(1, Math.min(500, Number(e.target.value) || 1)),
                  }))
                }
                className="h-7 w-20 text-xs font-mono"
              />
              <label className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-body text-muted-foreground">
                <input
                  type="checkbox"
                  checked={settings.remindersOn}
                  onChange={(e) =>
                    setSettings(s => ({ ...s, remindersOn: e.target.checked }))
                  }
                  className="accent-primary"
                />
                Show due-card reminders
              </label>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                Count these topics
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, topics: [] }))}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono border transition-colors ${
                    settings.topics.length === 0
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  All topics
                </button>
                {availableTopics.map(t => {
                  const active = settings.topics.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTopic(t)}
                      className={`px-2 py-0.5 rounded-full text-[11px] font-mono border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground font-body mt-2">
                Reviews on selected topics count toward your goal. Leave empty to count every flashcard topic.
              </p>
            </div>

            {/* Preset manager */}
            <div className="pt-3 border-t border-border">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                Saved presets
              </div>
              {presets.length === 0 ? (
                <p className="text-[11px] text-muted-foreground font-body mb-2">
                  Save the current target + topic mix as a named preset
                  (e.g. "Exam 1", "Revision Week") and switch in one tap.
                </p>
              ) : (
                <ul className="space-y-1 mb-2">
                  {presets.map(p => (
                    <li
                      key={p.id}
                      className="flex items-center gap-2 text-[11px] font-body"
                    >
                      <span className="font-mono text-foreground truncate flex-1">
                        {p.name}
                      </span>
                      <span className="font-mono text-muted-foreground shrink-0">
                        {p.settings.dailyTarget}/day ·{" "}
                        {p.settings.topics.length === 0
                          ? "all topics"
                          : `${p.settings.topics.length} topics`}
                      </span>
                      <button
                        type="button"
                        onClick={() => applyPreset(p)}
                        className="text-primary hover:underline shrink-0"
                      >
                        Use
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePreset(p.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-2">
                <Input
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  placeholder="e.g. Exam 1"
                  className="h-7 text-xs font-body flex-1"
                  onKeyDown={(e) => { if (e.key === "Enter") saveAsPreset(); }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-[11px] gap-1"
                  onClick={saveAsPreset}
                >
                  <Plus className="h-3 w-3" /> Save
                </Button>
                {activePresetId && activePresetDirty && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-[11px]"
                    onClick={overwriteActive}
                  >
                    Update active
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}