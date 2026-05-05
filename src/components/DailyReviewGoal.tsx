import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Target, AlertCircle, CheckCircle2, Settings2, X, Flame } from "lucide-react";
import type { Flashcard } from "@/data/theory";

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
          </div>
        )}
      </CardContent>
    </Card>
  );
}