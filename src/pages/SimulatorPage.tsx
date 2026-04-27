import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Clock, ExternalLink, Play, Pause, Check, AlertCircle,
  ChevronDown, ChevronUp, RotateCcw, Square,
  ZoomIn, ZoomOut, Maximize2, Minimize2, Eye, EyeOff, Flag, Award, TrendingUp,
  Plus, X, Lightbulb, Filter, BookOpen, PenSquare, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSidebar } from "@/components/ui/sidebar";
import {
  questionIndex, filterQuestions, uniqueTopics, type ExamQuestion,
} from "@/data/questionIndex";

type Stage = "select" | "active" | "results";
type MarksFilter = ExamQuestion["marks"] | "ALL";

interface HistoryEntry {
  id: string;
  year: number;
  topic: string;
  subtopic: string;
  marks: number;
  targetMinutes: number;
  actualSeconds: number;
  completedAt: string;
  withinTarget: boolean;
  marksEarned?: number;
  percentage?: number;
}

interface MistakeEntry {
  id: string;
  topic: string;          // exam topic key (e.g. "Cash Flow")
  text: string;
  createdAt: string;
  questionId?: string;    // year + Q reference where logged
}

const HISTORY_KEY = "lca_simulator_history";
const MISTAKES_KEY = "lca_simulator_mistakes";
const ONBOARDING_KEY = "lca_simulator_onboarding_dismissed";
const ONBOARDING_MODE_KEY = "lca_simulator_onboarding_mode"; // "persist" | "session"

type OnboardingMode = "persist" | "session";

/**
 * Reads the user's preferred persistence mode for the onboarding tour.
 * - "persist" (default): dismissal saved in localStorage, remembered forever.
 * - "session": dismissal saved in sessionStorage, resets next time the
 *   site is opened in a new browser session.
 */
function useOnboardingDismissed(): [boolean, (next: boolean) => void, OnboardingMode, (m: OnboardingMode) => void] {
  const [mode, setModeRaw] = useLocalStorage<OnboardingMode>(ONBOARDING_MODE_KEY, "persist");

  const read = useCallback((m: OnboardingMode) => {
    try {
      const store = m === "session" ? sessionStorage : localStorage;
      return store.getItem(ONBOARDING_KEY) === "true";
    } catch { return false; }
  }, []);

  const [dismissed, setDismissed] = useState<boolean>(() => read(mode));

  // When mode changes, re-read from the matching store so the UI updates.
  useEffect(() => { setDismissed(read(mode)); }, [mode, read]);

  const writeDismissed = useCallback((next: boolean) => {
    try {
      const store = mode === "session" ? sessionStorage : localStorage;
      if (next) store.setItem(ONBOARDING_KEY, "true");
      else store.removeItem(ONBOARDING_KEY);
    } catch {}
    setDismissed(next);
  }, [mode]);

  const setMode = useCallback((next: OnboardingMode) => {
    // Switching modes: clear the *other* store so the preference takes
    // effect immediately and we don't leak a stale dismissal.
    try {
      const other = next === "session" ? localStorage : sessionStorage;
      other.removeItem(ONBOARDING_KEY);
    } catch {}
    setModeRaw(next);
  }, [setModeRaw]);

  return [dismissed, writeDismissed, mode, setMode];
}

// ───────────── Onboarding tooltip ─────────────
/**
 * 30-second walkthrough shown the first time a student lands on the Simulator.
 * Dismissed permanently once closed (stored in localStorage). A "Show again"
 * button in the page header brings it back.
 */
function OnboardingCard({ onDismiss }: { onDismiss: () => void }) {
  const steps = [
    {
      icon: Filter,
      title: "1. Pick a topic",
      body: "Use the quick presets or filter by topic, section and marks to find the question you want to practise.",
    },
    {
      icon: BookOpen,
      title: "2. Open the viewer",
      body: "The timer starts when you hit Start. Read the data and required-info pages, then work it on paper or the scratchpad.",
    },
    {
      icon: PenSquare,
      title: "3. Enter your results",
      body: "Submit to reveal the marking scheme, log the marks you earned, and note any mistakes for next time.",
    },
  ];
  return (
    <div className="relative mb-8 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 rounded-lg p-5 shadow-sm">
      <button
        onClick={onDismiss}
        aria-label="Dismiss onboarding"
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="font-display text-base font-semibold text-foreground">
          New here? 30-second tour
        </h2>
      </div>
      <p className="text-xs text-muted-foreground font-body mb-4">
        Three steps to a full timed practice session.
      </p>
      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((s) => (
          <li
            key={s.title}
            className="bg-card border border-border rounded-md p-3"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="font-display text-sm font-semibold text-foreground">
                {s.title}
              </span>
            </div>
            <p className="text-[11px] leading-snug font-body text-muted-foreground">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[11px] font-mono text-muted-foreground">
          Tip: presets like <strong className="text-foreground">Cash Flow · 100m</strong> jump
          you straight to the most-asked question types.
        </p>
        <Button
          size="sm"
          onClick={onDismiss}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}

// ───────────── Pill button ─────────────
function Pill({
  active,
  onClick,
  children,
  disabled = false,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  count?: number;
}) {
  // When `disabled` is true the pill represents a filter combination that
  // would yield zero matching questions — we grey it out instead of hiding
  // it so students still see the option exists.
  const base = "px-3 py-1.5 rounded-full text-xs font-medium font-body border transition-colors inline-flex items-center gap-1.5";
  const variant = disabled
    ? "bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed"
    : active
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-card text-primary border-primary hover:bg-primary/10";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      title={disabled ? "No questions match this with current filters" : undefined}
      className={`${base} ${variant}`}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span className={`font-mono text-[10px] ${active && !disabled ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

// ───────────── Pause glyph ─────────────
/**
 * Twin-bar pause icon rendered with currentColor + sage-green accent stripes.
 * Used inside the timer when the session is paused, plus on the Pause button.
 */
function PauseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="6"  y="4" width="4" height="16" rx="1.2" fill="currentColor" />
      <rect x="14" y="4" width="4" height="16" rx="1.2" fill="currentColor" />
    </svg>
  );
}

// ───────────── Marks badge ─────────────
function MarksBadge({ marks }: { marks: number }) {
  const colour =
    marks === 60 ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
    : marks === 80 ? "bg-primary/15 text-primary border-primary/30"
    : marks === 100 ? "bg-primary/25 text-primary border-primary/40"
    : "bg-foreground/10 text-foreground border-foreground/20";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${colour}`}>
      {marks} marks
    </span>
  );
}

function getSimulatorImageSrc(id: string, kind: "question" | "marking", page: number = 1) {
  return `/simulator-pages/${id}-${kind}-${page}.png`;
}

// ───────────── Mistake tracker ─────────────
/**
 * Topic-scoped notebook of mistakes the student wants to remember.
 * - In `reminder` mode: shown above the active question as a "watch out for" panel.
 * - In `editor` mode: shown on the results page so they can add fresh mistakes
 *   after marking, and prune ones they've now mastered.
 * Both modes are backed by the same localStorage key, so edits in one place
 * appear in the other immediately.
 */
function MistakeTracker({
  topic,
  questionId,
  mode,
}: {
  topic: string;
  questionId?: string;
  mode: "reminder" | "editor";
}) {
  const [allMistakes, setAllMistakes] = useLocalStorage<MistakeEntry[]>(MISTAKES_KEY, []);
  const [draft, setDraft] = useState("");
  const topicMistakes = useMemo(
    () => allMistakes.filter((m) => m.topic === topic),
    [allMistakes, topic],
  );

  const addMistake = () => {
    const text = draft.trim();
    if (!text) return;
    const entry: MistakeEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      topic,
      text,
      createdAt: new Date().toISOString(),
      questionId,
    };
    setAllMistakes((prev) => [entry, ...prev]);
    setDraft("");
  };

  const removeMistake = (id: string) => {
    setAllMistakes((prev) => prev.filter((m) => m.id !== id));
  };

  // Reminder mode is read-only-ish — showing past mistakes before the timer
  // gets going. We still allow quick removal so they can prune things they
  // no longer need.
  if (mode === "reminder") {
    if (topicMistakes.length === 0) return null;
    return (
      <div className="mb-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-700/40 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <h3 className="font-display text-sm font-semibold text-amber-900 dark:text-amber-200">
            Watch out — past mistakes in {topic}
          </h3>
          <span className="ml-auto text-[10px] font-mono text-amber-700/70 dark:text-amber-400/70">
            {topicMistakes.length} logged
          </span>
        </div>
        <ul className="space-y-1.5">
          {topicMistakes.map((m) => (
            <li
              key={m.id}
              className="flex items-start gap-2 text-xs font-body text-amber-900 dark:text-amber-100 leading-snug"
            >
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
              <span className="flex-1">{m.text}</span>
              <button
                onClick={() => removeMistake(m.id)}
                aria-label="Remove mistake"
                className="text-amber-700/60 hover:text-red-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Editor mode — full add/remove UI for after grading.
  return (
    <div className="bg-card border border-border rounded-lg p-5 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-4 w-4 text-amber-600" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Mistakes to remember — {topic}
        </h3>
        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          {topicMistakes.length} logged
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Note any errors you made on this question. They'll appear automatically the next
        time you start a <strong>{topic}</strong> question so you can avoid repeating them.
      </p>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`e.g. Forgot to add back depreciation in operating activities`}
          className="flex-1 min-h-[60px] text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              addMistake();
            }
          }}
        />
        <Button
          onClick={addMistake}
          disabled={!draft.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground sm:self-start"
        >
          <Plus className="h-4 w-4" /> Add mistake
        </Button>
      </div>

      {topicMistakes.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">
          No mistakes logged for {topic} yet.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {topicMistakes.map((m) => (
            <li
              key={m.id}
              className="flex items-start gap-2 text-xs font-body text-foreground leading-snug bg-muted/40 border border-border rounded px-3 py-2"
            >
              <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="flex-1">
                {m.text}
                {m.questionId && (
                  <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                    · {m.questionId.split("_").slice(0, 2).join(" ")}
                  </span>
                )}
              </span>
              <button
                onClick={() => removeMistake(m.id)}
                aria-label="Remove mistake"
                className="text-muted-foreground hover:text-red-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

function ScreenshotPageView({
  sources,
  title,
  zoom,
  fitToWidth,
  className,
  enableThumbnails = false,
}: {
  sources: string[];
  title: string;
  zoom: number;
  fitToWidth: boolean;
  className?: string;
  enableThumbnails?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [autoSeconds, setAutoSeconds] = useState(20);

  // Label each page. For a 2-page question, page 2 is the "Required info" page
  // (the part (a)/(b)/(c) requirements). Page 1 is "Data".
  const labelFor = (i: number) => {
    if (sources.length === 2) return i === 0 ? "Data" : "Required info";
    if (i === 0) return "Page 1";
    if (i === sources.length - 1) return "Required info";
    return `Page ${i + 1}`;
  };

  // Scroll a thumbnail into view
  const goToPage = useCallback((idx: number) => {
    const el = pageRefs.current[idx];
    const container = containerRef.current;
    if (!el || !container) return;
    const top = el.offsetTop - container.offsetTop - 8;
    container.scrollTo({ top, behavior: "smooth" });
    setActivePage(idx);
  }, []);

  // Auto-advance interval — cycles through pages every N seconds.
  useEffect(() => {
    if (!autoAdvance || sources.length < 2) return;
    const id = setInterval(() => {
      setActivePage((prev) => {
        const next = (prev + 1) % sources.length;
        const el = pageRefs.current[next];
        const container = containerRef.current;
        if (el && container) {
          const top = el.offsetTop - container.offsetTop - 8;
          container.scrollTo({ top, behavior: "smooth" });
        }
        return next;
      });
    }, autoSeconds * 1000);
    return () => clearInterval(id);
  }, [autoAdvance, autoSeconds, sources.length]);

  // Track scroll position to keep activePage in sync with manual scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container || sources.length < 2) return;
    const onScroll = () => {
      const tops = pageRefs.current.map((el) =>
        el ? Math.abs(el.offsetTop - container.offsetTop - container.scrollTop) : Infinity,
      );
      const closest = tops.indexOf(Math.min(...tops));
      if (closest >= 0) setActivePage(closest);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [sources.length]);

  const showThumbs = enableThumbnails && sources.length >= 2;

  return (
    <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      {showThumbs && (
        <div className="flex items-center gap-3 px-3 py-2 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            {sources.map((src, i) => (
              <button
                key={src}
                onClick={() => goToPage(i)}
                className={
                  "group flex items-center gap-2 px-2 py-1 rounded border text-[11px] font-medium transition-colors " +
                  (activePage === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50")
                }
                aria-label={`Go to ${labelFor(i)}`}
              >
                <span className="relative w-10 h-12 overflow-hidden border border-border bg-muted/30 rounded-sm">
                  <img
                    src={src}
                    alt=""
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="font-mono text-[10px] text-muted-foreground">P{i + 1}</span>
                  <span>{labelFor(i)}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-[11px] font-body text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={(e) => setAutoAdvance(e.target.checked)}
                className="h-3.5 w-3.5 accent-primary"
              />
              Auto-advance
            </label>
            {autoAdvance && (
              <select
                value={autoSeconds}
                onChange={(e) => setAutoSeconds(Number(e.target.value))}
                className="text-[11px] font-mono bg-card border border-border rounded px-1.5 py-0.5 text-foreground"
                aria-label="Auto-advance interval"
              >
                <option value={10}>10s</option>
                <option value={20}>20s</option>
                <option value={30}>30s</option>
                <option value={60}>60s</option>
              </select>
            )}
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="bg-muted/30 overflow-auto p-3 flex flex-col items-center gap-3"
        style={showThumbs ? { maxHeight: "calc(100vh - 130px)" } : undefined}
      >
        {sources.map((src, i) => (
          <div
            key={src}
            ref={(el) => (pageRefs.current[i] = el)}
            className="relative w-full flex justify-center scroll-mt-2"
            data-page-index={i}
          >
            {sources.length > 1 && (
              <div className="absolute -top-1 left-2 z-10 px-2 py-0.5 rounded bg-card border border-border text-[10px] font-mono text-muted-foreground shadow-sm">
                {labelFor(i)} · Page {i + 1} of {sources.length}
              </div>
            )}
            <img
              src={src}
              alt={`${title} — ${labelFor(i)}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="block h-auto shadow-sm border border-border bg-card"
              style={{
                width: fitToWidth ? "100%" : `${Math.round(zoom * 100)}%`,
                minWidth: fitToWidth ? undefined : "900px",
                maxWidth: fitToWidth ? "100%" : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  STAGE 1 — SELECTION
// ─────────────────────────────────────────
function SelectStage({ onStart }: { onStart: (q: ExamQuestion) => void }) {
  const [topicFilter, setTopicFilter] = useState<string | "ALL">("ALL");
  const [marksFilter, setMarksFilter] = useState<MarksFilter>("ALL");
  const [sectionFilter, setSectionFilter] = useState<ExamQuestion["section"] | "ALL">("ALL");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history] = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);
  const [onboardingDismissed, setOnboardingDismissed, onboardingMode, setOnboardingMode] = useOnboardingDismissed();

  const topics = useMemo(() => uniqueTopics(questionIndex), []);
  const filtered = useMemo(
    () => filterQuestions(questionIndex, topicFilter, marksFilter, sectionFilter),
    [topicFilter, marksFilter, sectionFilter],
  );

  // ── Counts for each filter option, holding the *other* two filters fixed.
  // This lets us grey out impossible combinations (e.g. picking "Tabular
  // Statements" disables 80m / 120m if no such question exists).
  const topicCounts = useMemo(() => {
    const map: Record<string, number> = { ALL: filterQuestions(questionIndex, "ALL", marksFilter, sectionFilter).length };
    for (const t of topics) {
      map[t] = filterQuestions(questionIndex, t, marksFilter, sectionFilter).length;
    }
    return map;
  }, [topics, marksFilter, sectionFilter]);

  const sectionCounts = useMemo(() => {
    const sections: (ExamQuestion["section"] | "ALL")[] = ["ALL", 1, 2, 3];
    const map: Record<string, number> = {};
    for (const s of sections) {
      map[String(s)] = filterQuestions(questionIndex, topicFilter, marksFilter, s).length;
    }
    return map;
  }, [topicFilter, marksFilter]);

  const marksCounts = useMemo(() => {
    const allMarks: MarksFilter[] = ["ALL", 60, 80, 100, 120];
    const map: Record<string, number> = {};
    for (const m of allMarks) {
      map[String(m)] = filterQuestions(questionIndex, topicFilter, m, sectionFilter).length;
    }
    return map;
  }, [topicFilter, sectionFilter]);

  // Quick presets — common exam combos the user reaches for most.
  const presets: { label: string; topic: string | "ALL"; marks: MarksFilter; section: ExamQuestion["section"] | "ALL" }[] = [
    { label: "Cash Flow · 100m",        topic: "Cash Flow",          marks: 100, section: "ALL" },
    { label: "Job Costing",             topic: "Costing",            marks: "ALL", section: 3 },
    { label: "Final Accounts · S1 60m", topic: "ALL",                marks: 60,  section: 1 },
    { label: "Published · 100m",        topic: "Published Accounts", marks: 100, section: "ALL" },
    { label: "Club · 100m",             topic: "Club",               marks: 100, section: "ALL" },
    { label: "Suspense · 100m",         topic: "Correction of Errors", marks: 100, section: "ALL" },
    { label: "Service · 100m",          topic: "Service Firm",       marks: 100, section: "ALL" },
  ];
  const activePreset = (p: typeof presets[number]) =>
    topicFilter === p.topic && marksFilter === p.marks && sectionFilter === p.section;
  const applyPreset = (p: typeof presets[number]) => {
    setTopicFilter(p.topic);
    setMarksFilter(p.marks);
    setSectionFilter(p.section);
  };
  const resetFilters = () => {
    setTopicFilter("ALL");
    setMarksFilter("ALL");
    setSectionFilter("ALL");
  };
  const filtersActive = topicFilter !== "ALL" || marksFilter !== "ALL" || sectionFilter !== "ALL";

  // ── Mark progress aggregates ──────────────────────────────
  const scored = history.filter((h) => typeof h.marksEarned === "number");
  const totalEarned = scored.reduce((s, h) => s + (h.marksEarned ?? 0), 0);
  const totalAvailable = scored.reduce((s, h) => s + h.marks, 0);
  const avgPct = totalAvailable > 0 ? Math.round((totalEarned / totalAvailable) * 100) : 0;
  const bestByTopic = useMemo(() => {
    const map: Record<string, { best: number; attempts: number }> = {};
    for (const h of scored) {
      const pct = Math.round(((h.marksEarned ?? 0) / h.marks) * 100);
      if (!map[h.subtopic]) map[h.subtopic] = { best: pct, attempts: 1 };
      else {
        map[h.subtopic].best = Math.max(map[h.subtopic].best, pct);
        map[h.subtopic].attempts += 1;
      }
    }
    return Object.entries(map).sort((a, b) => b[1].best - a[1].best);
  }, [scored]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Exam Simulator</h1>
        <div className="mt-2 flex items-center gap-3 shrink-0">
          {/* Persistence preference for the onboarding tour. */}
          <div
            className="hidden sm:inline-flex items-center gap-1 rounded-md border border-border bg-card p-0.5"
            role="group"
            aria-label="Onboarding tour memory"
            title="Choose whether the tour stays dismissed forever or comes back next visit"
          >
            <button
              onClick={() => setOnboardingMode("persist")}
              className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                onboardingMode === "persist"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Remember dismissal
            </button>
            <button
              onClick={() => setOnboardingMode("session")}
              className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                onboardingMode === "session"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Reset on return
            </button>
          </div>
          {onboardingDismissed && (
            <button
              onClick={() => setOnboardingDismissed(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-primary hover:underline"
            >
              <Sparkles className="h-3 w-3" /> Show tour
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl">
        Select a question type and mark allocation. The timer starts the moment you confirm your selection.
      </p>

      {!onboardingDismissed && (
        <OnboardingCard onDismiss={() => setOnboardingDismissed(true)} />
      )}

      {/* ── Mark progress tracker ── */}
      {scored.length > 0 && (
        <div className="mb-8 bg-card border border-border rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-display text-base font-semibold text-foreground">Your progress</h2>
            <span className="ml-auto text-[11px] font-mono text-muted-foreground">
              {scored.length} graded {scored.length === 1 ? "question" : "questions"}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Marks earned</div>
              <div className="font-mono text-2xl text-primary">{totalEarned}<span className="text-muted-foreground text-base"> / {totalAvailable}</span></div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Average</div>
              <div className={`font-mono text-2xl ${avgPct >= 70 ? "text-green-700" : avgPct >= 50 ? "text-amber-600" : "text-red-600"}`}>{avgPct}%</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Sessions</div>
              <div className="font-mono text-2xl text-foreground">{history.length}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Best topic</div>
              <div className="font-display text-sm font-semibold text-foreground truncate">{bestByTopic[0]?.[0] ?? "—"}</div>
              <div className="text-[11px] font-mono text-muted-foreground">{bestByTopic[0]?.[1].best ?? 0}%</div>
            </div>
          </div>
          {/* per-topic bars */}
          <div className="space-y-1.5">
            {bestByTopic.slice(0, 8).map(([topic, s]) => (
              <div key={topic} className="flex items-center gap-3">
                <span className="text-xs text-foreground w-44 truncate">{topic}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${s.best >= 70 ? "bg-primary" : s.best >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${s.best}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-muted-foreground w-20 text-right">
                  {s.best}% · {s.attempts}×
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick presets */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick presets</div>
          {filtersActive && (
            <button
              onClick={resetFilters}
              className="text-[11px] font-mono text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <Pill key={p.label} active={activePreset(p)} onClick={() => applyPreset(p)}>{p.label}</Pill>
          ))}
        </div>
      </div>

      {/* Filter row 1 — topic */}
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Topic</div>
        <div className="flex flex-wrap gap-2">
          <Pill active={topicFilter === "ALL"} onClick={() => setTopicFilter("ALL")}>All Topics</Pill>
          {topics.map((t) => (
            <Pill key={t} active={topicFilter === t} onClick={() => setTopicFilter(t)}>{t}</Pill>
          ))}
        </div>
      </div>

      {/* Filter row 2 — paper section */}
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Paper section</div>
        <div className="flex flex-wrap gap-2">
          <Pill active={sectionFilter === "ALL"} onClick={() => setSectionFilter("ALL")}>All Sections</Pill>
          <Pill active={sectionFilter === 1} onClick={() => setSectionFilter(1)}>Section 1 · Financial</Pill>
          <Pill active={sectionFilter === 2} onClick={() => setSectionFilter(2)}>Section 2 · Financial Acc.</Pill>
          <Pill active={sectionFilter === 3} onClick={() => setSectionFilter(3)}>Section 3 · Management</Pill>
        </div>
      </div>

      {/* Filter row 3 — marks */}
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Marks</div>
        <div className="flex flex-wrap gap-2">
          <Pill active={marksFilter === "ALL"} onClick={() => setMarksFilter("ALL")}>All Marks</Pill>
          {[60, 80, 100, 120].map((m) => (
            <Pill key={m} active={marksFilter === m} onClick={() => setMarksFilter(m as ExamQuestion["marks"])}>
              {m} marks
            </Pill>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="text-[11px] font-mono text-muted-foreground mb-4">
        {filtered.length} question{filtered.length === 1 ? "" : "s"} match
      </div>

      {/* Question grid */}
      {filtered.length === 0 ? (
        <div className="border border-border rounded-lg bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground font-body">
            No questions found for this combination. Try adjusting the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-mono text-2xl font-bold text-primary leading-none">{q.year}</div>
                  <div className="text-[11px] font-body text-muted-foreground mt-0.5">Q{q.questionNumber} · Section {q.section}</div>
                </div>
                <MarksBadge marks={q.marks} />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground leading-tight mb-1">{q.subtopic}</h3>
              <p className="text-[11px] font-body text-muted-foreground mb-2">{q.topic}</p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground mb-2">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Target: {q.timingMinutes} mins</span>
              </div>
              <p className="text-xs font-body text-muted-foreground leading-snug flex-1 mb-4">{q.notes}</p>
              <Button
                onClick={() => onStart(q)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start This Question
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* History panel */}
      <div className="mt-10 border border-border rounded-lg bg-card overflow-hidden">
        <button
          onClick={() => setHistoryOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
        >
          <span className="font-display text-sm font-semibold text-foreground">Recent Sessions</span>
          {historyOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>
        {historyOpen && (
          <div className="border-t border-border p-5">
            {history.length === 0 ? (
              <p className="text-xs text-muted-foreground font-body">
                No sessions completed yet. Start your first timed question above.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-body">
                  <thead>
                    <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Topic</th>
                      <th className="py-2 pr-4">Year & Q</th>
                      <th className="py-2 pr-4">Marks</th>
                      <th className="py-2 pr-4">Time</th>
                      <th className="py-2 pr-4">Score</th>
                      <th className="py-2">vs Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 10).map((h, i) => (
                      <tr key={i} className="border-b border-border/40">
                        <td className="py-2 pr-4 font-mono">{new Date(h.completedAt).toLocaleDateString()}</td>
                        <td className="py-2 pr-4">{h.subtopic}</td>
                        <td className="py-2 pr-4 font-mono">{h.year} · Q{questionIndex.find(q => q.id === h.id)?.questionNumber ?? "—"}</td>
                        <td className="py-2 pr-4 font-mono">{h.marks}</td>
                        <td className="py-2 pr-4 font-mono">{Math.floor(h.actualSeconds / 60)}:{String(h.actualSeconds % 60).padStart(2, "0")}</td>
                        <td className="py-2 pr-4 font-mono">
                          {typeof h.marksEarned === "number"
                            ? <span className={h.percentage! >= 70 ? "text-green-700" : h.percentage! >= 50 ? "text-amber-600" : "text-red-600"}>
                                {h.marksEarned}/{h.marks} ({h.percentage}%)
                              </span>
                            : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="py-2">
                          {h.withinTarget
                            ? <Check className="h-4 w-4 text-green-600" />
                            : <Clock className="h-4 w-4 text-amber-600" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  STAGE 2 — ACTIVE EXAM
// ─────────────────────────────────────────

/** Build mark-breakdown checkpoints — quarters of the question. */
function buildCheckpoints(marks: number) {
  // 4 evenly-spaced sub-targets so the candidate can pace by quarter.
  const quarter = Math.round(marks / 4);
  return [
    { label: "Q1 · setup",     marks: quarter,         pctOfTime: 0.25 },
    { label: "Q2 · core",      marks: quarter * 2,     pctOfTime: 0.50 },
    { label: "Q3 · workings",  marks: quarter * 3,     pctOfTime: 0.75 },
    { label: "Q4 · finalise",  marks: marks,           pctOfTime: 1.00 },
  ];
}

function ActiveStage({
  question, onSubmit, onAbandon,
}: {
  question: ExamQuestion;
  onSubmit: (actualSeconds: number) => void;
  onAbandon: () => void;
}) {
  const totalSeconds = question.timingMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [paused, setPaused] = useState(false);
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const [zoom, setZoom] = useState(1.7);
  const [fitMode, setFitMode] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef<Date>(new Date());
  const checkpoints = useMemo(() => buildCheckpoints(question.marks), [question.marks]);
  const questionSources = useMemo(() => {
    return Array.from({ length: question.paperPageCount }, (_, i) =>
      getSimulatorImageSrc(question.id, "question", i + 1)
    );
  }, [question.id, question.paperPageCount]);
  const markingSources = useMemo(() => {
    return Array.from({ length: question.markingPageCount }, (_, i) =>
      getSimulatorImageSrc(question.id, "marking", i + 1)
    );
  }, [question.id, question.markingPageCount]);

  // Preload images in the background so transitions feel instant.
  useEffect(() => {
    [...questionSources, ...markingSources].forEach(preloadImage);
  }, [questionSources, markingSources]);

  // Timer — interval ref guards against stale closures
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, [paused]);

  const elapsed = totalSeconds - remaining;
  const pct = remaining / totalSeconds; // 1 → 0
  const elapsedPct = 1 - pct;
  // Mark progress = elapsed time mapped onto marks earned at recommended pace.
  const marksEarned = Math.min(question.marks, Math.round(question.marks * elapsedPct));
  const expired = remaining === 0;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const handleSubmit = useCallback(() => onSubmit(elapsed), [onSubmit, elapsed]);

  // Zoom controls
  const zoomIn  = () => { setFitMode(false); setZoom((z) => Math.min(3.0, +(z + 0.2).toFixed(2))); };
  const zoomOut = () => { setFitMode(false); setZoom((z) => Math.max(0.8, +(z - 0.2).toFixed(2))); };
  const toggleFit = () => setFitMode((f) => !f);

  return (
    <div className="w-full mx-auto px-3 sm:px-5 py-3 pb-12">
      {/* ─── Compact sticky control bar — everything in one slim row ─── */}
      <div className="sticky top-0 z-20 mb-2 bg-card/95 backdrop-blur border border-border rounded-md shadow-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-3 py-1.5">
          {/* Question label */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Flag className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="font-display text-xs font-semibold text-foreground truncate">
              {question.year} · Q{question.questionNumber} · {question.subtopic}
            </span>
          </div>

          <span className="hidden sm:inline w-px h-4 bg-border" />

          {/* Timer */}
          <div className="flex items-center gap-1.5">
            <Clock className={`h-3.5 w-3.5 ${pct > 0.5 ? "text-primary" : pct > 0.25 ? "text-amber-600" : "text-red-600"}`} />
            <span className={`font-mono text-base font-bold leading-none ${paused ? "text-amber-600" : expired ? "text-red-600 animate-pulse" : "text-foreground"}`}>
              {paused ? "PAUSED" : timeStr}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground leading-none">
              / {question.timingMinutes}m
            </span>
          </div>

          {/* Marks pace */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pace</span>
            <span className="font-mono text-xs text-foreground">{marksEarned}/{question.marks}</span>
          </div>

          {/* Right cluster — actions */}
          <div className="ml-auto flex items-center gap-1.5">
            {/* Zoom — icon-only buttons to save space */}
            <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={zoomOut} aria-label="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="font-mono text-[10px] text-muted-foreground w-10 text-center">
              {fitMode ? "FIT" : `${Math.round(zoom * 100)}%`}
            </span>
            <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={zoomIn} aria-label="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant={fitMode ? "default" : "outline"}
              onClick={toggleFit}
              aria-label={fitMode ? "Use fixed zoom" : "Fit to container"}
              className={`h-7 w-7 p-0 ${fitMode ? "bg-primary text-primary-foreground" : ""}`}
            >
              {fitMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>

            <span className="w-px h-4 bg-border mx-0.5" />

            <Button
              size="sm"
              variant="outline"
              onClick={() => setPaused((p) => !p)}
              className="h-7 px-2 text-xs"
            >
              {paused
                ? <><Play className="h-3.5 w-3.5" /> Resume</>
                : <><PauseGlyph className="h-3.5 w-3.5 text-primary" /> Pause</>
              }
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              className={`h-7 px-2.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground ${expired ? "animate-pulse" : ""}`}
            >
              <Check className="h-3.5 w-3.5" /> Submit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setConfirmAbandon(true)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
              aria-label="Abandon question"
            >
              <Square className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Slim progress bar */}
        <div className="relative h-1 bg-muted">
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-linear ${
              pct > 0.5 ? "bg-primary" : pct > 0.25 ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${elapsedPct * 100}%` }}
          />
          {checkpoints.map((cp, i) => {
            const reached = elapsedPct >= cp.pctOfTime - 0.01;
            return (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${cp.pctOfTime * 100}%` }}
                title={`${cp.label} (${cp.marks}m)`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${reached ? "bg-primary" : "bg-card border border-border"}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Viewer takes full width ─── */}
      <div className={
        "relative transition-all " +
        (paused ? "opacity-40 pointer-events-none " : "")
      }>
        {paused && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <PauseGlyph className="h-16 w-16 text-amber-600" />
              <div className="font-display text-3xl font-bold text-amber-600 tracking-widest">PAUSED</div>
            </div>
          </div>
        )}
        {expired && (
          <div className="mb-2 px-3 py-1.5 bg-destructive/10 border border-destructive/30 rounded text-destructive font-body text-xs flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5" />
            Time is up — submit when ready.
          </div>
        )}

        {/* Surface past mistakes for this topic so the candidate is primed */}
        <MistakeTracker topic={question.topic} mode="reminder" />

        <ScreenshotPageView
          sources={questionSources}
          zoom={zoom}
          fitToWidth={fitMode}
          title={`${question.year} Q${question.questionNumber}`}
          enableThumbnails
        />
        <a
          href={`${question.paperUrl}#page=${question.paperPage}`}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-body text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Open PDF in new tab
        </a>
      </div>

      <AlertDialog open={confirmAbandon} onOpenChange={setConfirmAbandon}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Abandon this session?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to abandon this session? Your time will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Going</AlertDialogCancel>
            <AlertDialogAction onClick={onAbandon}>Abandon</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ─────────────────────────────────────────
//  STAGE 3 — RESULTS
// ─────────────────────────────────────────
function ResultsStage({
  question, actualSeconds, onAgain, onAnother, onSaveMark, savedMark,
}: {
  question: ExamQuestion;
  actualSeconds: number;
  onAgain: () => void;
  onAnother: () => void;
  onSaveMark: (earned: number) => void;
  savedMark?: number;
}) {
  const targetSeconds = question.timingMinutes * 60;
  const within = actualSeconds <= targetSeconds;
  const mins = Math.floor(actualSeconds / 60);
  const secs = actualSeconds % 60;
  const [markInput, setMarkInput] = useState<string>(savedMark != null ? String(savedMark) : "");
  const [saved, setSaved] = useState<boolean>(savedMark != null);
  const parsed = parseInt(markInput, 10);
  const validMark = !isNaN(parsed) && parsed >= 0 && parsed <= question.marks;
  const pct = validMark ? Math.round((parsed / question.marks) * 100) : 0;

  const handleSaveMark = () => {
    if (!validMark) return;
    onSaveMark(parsed);
    setSaved(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h2 className="font-display text-3xl font-bold text-foreground mb-6">Session Complete</h2>

      {/* ── Mark entry card ── */}
      <div className="bg-card border border-border rounded-lg p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-primary" />
          <h3 className="font-display text-base font-semibold text-foreground">Record your mark</h3>
          {saved && <span className="ml-2 text-[11px] font-mono text-green-700 inline-flex items-center gap-1"><Check className="h-3 w-3" /> saved</span>}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          After grading against the marking scheme below, enter the marks you earned. Your score will be tracked across sessions.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            type="number"
            min={0}
            max={question.marks}
            value={markInput}
            onChange={(e) => { setMarkInput(e.target.value); setSaved(false); }}
            className="w-24 font-mono"
            placeholder="0"
          />
          <span className="text-sm font-mono text-muted-foreground">/ {question.marks} marks</span>
          {validMark && (
            <span className={`font-mono text-sm font-semibold ${pct >= 70 ? "text-green-700" : pct >= 50 ? "text-amber-600" : "text-red-600"}`}>
              {pct}%
            </span>
          )}
          <Button
            onClick={handleSaveMark}
            disabled={!validMark || saved}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4" /> {saved ? "Update saved" : "Save to progress"}
          </Button>
        </div>
        {markInput && !validMark && (
          <p className="text-[11px] text-red-600 mt-2">Enter a number between 0 and {question.marks}.</p>
        )}
      </div>

      {/* ── Mistake tracker — log errors for next time ── */}
      <MistakeTracker
        topic={question.topic}
        questionId={question.id}
        mode="editor"
      />

      <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Topic</div>
            <div className="font-display text-base font-semibold text-foreground">{question.subtopic}</div>
            <div className="text-xs text-muted-foreground">{question.topic}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Year & Q</div>
            <div className="font-mono text-2xl text-primary">{question.year}</div>
            <div className="text-xs text-muted-foreground">Q{question.questionNumber} · {question.marks} marks</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Time Taken</div>
            <div className="font-mono text-2xl text-foreground">{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</div>
            <div className="text-xs text-muted-foreground">Target: {question.timingMinutes}:00</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Result</div>
            {within ? (
              <div className="inline-flex items-center gap-1.5 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-body text-sm font-semibold">Within target time</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-amber-600">
                <Clock className="h-5 w-5" />
                <span className="font-body text-sm font-semibold">Over target time</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mb-3">
        Official SEC Marking Scheme — {question.year} Q{question.questionNumber}
      </h3>
      <ScreenshotPageView
        sources={Array.from({ length: question.markingPageCount }, (_, i) =>
          getSimulatorImageSrc(question.id, "marking", i + 1)
        )}
        zoom={1.6}
        fitToWidth={true}
        className="mb-2"
        title={`${question.year} Q${question.questionNumber} marking scheme`}
      />
      <a
        href={`${question.markingSchemeUrl}#page=${question.markingSchemePage}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-body text-primary hover:underline mb-6"
      >
        <ExternalLink className="h-3.5 w-3.5" /> Open marking scheme in new tab
      </a>

      <div className="flex flex-wrap gap-3 mt-6">
        <Button onClick={onAnother} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Practice Another Question
        </Button>
        <Button variant="outline" onClick={onAgain}>
          <RotateCcw className="h-4 w-4" /> Try This Question Again
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  ROOT PAGE
// ─────────────────────────────────────────
export default function SimulatorPage() {
  const [stage, setStage] = useState<Stage>("select");
  const [active, setActive] = useState<ExamQuestion | null>(null);
  const [actualSeconds, setActualSeconds] = useState(0);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);
  const { setOpen } = useSidebar();
  const [lastEntryAt, setLastEntryAt] = useState<string | null>(null);

  // Auto-collapse the sidebar whenever an exam is active so the candidate
  // gets maximum reading width. Restore it once they leave the active stage.
  useEffect(() => {
    if (stage === "active") setOpen(false);
    else setOpen(true);
  }, [stage, setOpen]);

  const handleStart = (q: ExamQuestion) => {
    setActive(q);
    setActualSeconds(0);
    setStage("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (seconds: number) => {
    if (!active) return;
    setActualSeconds(seconds);
    const entry: HistoryEntry = {
      id: active.id,
      year: active.year,
      topic: active.topic,
      subtopic: active.subtopic,
      marks: active.marks,
      targetMinutes: active.timingMinutes,
      actualSeconds: seconds,
      completedAt: new Date().toISOString(),
      withinTarget: seconds <= active.timingMinutes * 60,
    };
    setHistory((prev) => {
      const next = [entry, ...prev];
      return next.slice(0, 50);
    });
    setLastEntryAt(entry.completedAt);
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveMark = (earned: number) => {
    if (!active || !lastEntryAt) return;
    const pct = Math.round((earned / active.marks) * 100);
    setHistory((prev) =>
      prev.map((h) =>
        h.completedAt === lastEntryAt
          ? { ...h, marksEarned: earned, percentage: pct }
          : h,
      ),
    );
  };

  const savedMark = lastEntryAt
    ? history.find((h) => h.completedAt === lastEntryAt)?.marksEarned
    : undefined;

  const handleAbandon = () => {
    setActive(null);
    setStage("select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnother = () => {
    setActive(null);
    setStage("select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAgain = () => {
    if (!active) return;
    setActualSeconds(0);
    setStage("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (stage === "active" && active) {
    return <ActiveStage question={active} onSubmit={handleSubmit} onAbandon={handleAbandon} />;
  }
  if (stage === "results" && active) {
    return (
      <ResultsStage
        question={active}
        actualSeconds={actualSeconds}
        onAgain={handleAgain}
        onAnother={handleAnother}
        onSaveMark={handleSaveMark}
        savedMark={savedMark}
      />
    );
  }
  return <SelectStage onStart={handleStart} />;
}
