import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Clock, ExternalLink, Play, Pause, Check, AlertCircle,
  ChevronDown, ChevronUp, RotateCcw, Square,
  ZoomIn, ZoomOut, Maximize2, Minimize2, Eye, EyeOff, Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

const HISTORY_KEY = "lca_simulator_history";

// ───────────── Pill button ─────────────
function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-xs font-medium font-body border transition-colors " +
        (active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-primary border-primary hover:bg-primary/10")
      }
    >
      {children}
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
}: {
  sources: string[];
  title: string;
  zoom: number;
  fitToWidth: boolean;
  className?: string;
}) {
  return (
    <div className={`relative bg-card border border-border rounded-lg overflow-hidden ${className ?? ""}`}>
      <div className="bg-muted/30 overflow-auto p-3 flex flex-col items-center gap-3">
        {sources.map((src, i) => (
          <div key={src} className="relative w-full flex justify-center">
            {sources.length > 1 && (
              <div className="absolute -top-1 left-2 z-10 px-2 py-0.5 rounded bg-card border border-border text-[10px] font-mono text-muted-foreground shadow-sm">
                Page {i + 1} of {sources.length}
              </div>
            )}
            <img
              src={src}
              alt={`${title} — page ${i + 1}`}
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
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history] = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, []);

  const topics = useMemo(() => uniqueTopics(questionIndex), []);
  const filtered = useMemo(
    () => filterQuestions(questionIndex, topicFilter, marksFilter),
    [topicFilter, marksFilter],
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Exam Simulator</h1>
      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8 max-w-2xl">
        Select a question type and mark allocation. The timer starts the moment you confirm your selection.
      </p>

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

      {/* Filter row 2 — marks */}
      <div className="mb-6">
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
  const [readingMode, setReadingMode] = useState(false);
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
  const colourClass =
    pct > 0.5 ? "stroke-primary text-primary"
    : pct > 0.25 ? "stroke-amber-600 text-amber-600"
    : "stroke-red-600 text-red-600";
  const expired = remaining === 0;

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const elapsedM = Math.floor(elapsed / 60);
  const elapsedS = elapsed % 60;
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  // SVG circular progress
  const circ = 2 * Math.PI * 70; // radius 70
  const offset = circ * (1 - pct);

  const handleSubmit = useCallback(() => onSubmit(elapsed), [onSubmit, elapsed]);

  // Zoom controls
  const zoomIn  = () => { setFitMode(false); setZoom((z) => Math.min(3.0, +(z + 0.2).toFixed(2))); };
  const zoomOut = () => { setFitMode(false); setZoom((z) => Math.max(0.8, +(z - 0.2).toFixed(2))); };
  const zoomReset = () => { setFitMode(false); setZoom(1.7); };
  const toggleFit = () => setFitMode((f) => !f);

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-7 py-6 pb-16">
      {/* ─── Persistent timer & progress header ─── */}
      <div className="mb-4 bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${pct > 0.5 ? "text-primary" : pct > 0.25 ? "text-amber-600" : "text-red-600"}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Remaining</span>
            <span className={`font-mono text-lg font-bold ${paused ? "text-amber-600" : expired ? "text-red-600" : "text-foreground"}`}>
              {paused ? "PAUSED" : timeStr}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Elapsed</span>
            <span className="font-mono text-sm text-foreground">
              {String(elapsedM).padStart(2, "0")}:{String(elapsedS).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Flag className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Marks pace</span>
            <span className="font-mono text-sm text-foreground">{marksEarned} / {question.marks}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setReadingMode((r) => !r)}>
              {readingMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {readingMode ? "Exit reading mode" : "Reading mode"}
            </Button>
          </div>
        </div>

        {/* Progress bar with checkpoint flags */}
        <div className="relative h-7 px-5 pb-3">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-linear ${
                pct > 0.5 ? "bg-primary" : pct > 0.25 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${elapsedPct * 100}%` }}
            />
          </div>
          {checkpoints.map((cp, i) => {
            const reached = elapsedPct >= cp.pctOfTime - 0.01;
            return (
              <div
                key={i}
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `calc(${cp.pctOfTime * 100}% + 20px - ${cp.pctOfTime * 40}px)` }}
                title={cp.label}
              >
                <div className={`w-2.5 h-2.5 rounded-full border-2 ${
                  reached ? "bg-primary border-primary" : "bg-card border-border"
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* LEFT — question */}
        <div className={
          "relative transition-all " +
          (paused ? "opacity-40 pointer-events-none " : "") +
          (readingMode ? "ring-4 ring-primary/30 rounded-xl bg-card p-2" : "")
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
            <div className="mb-3 px-4 py-2 bg-destructive/10 border border-destructive/30 rounded text-destructive font-body text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Time is up — submit when ready.
            </div>
          )}
          {!readingMode && (
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <p className="text-xs font-body text-muted-foreground leading-relaxed">
                This question is from the <strong className="text-foreground">{question.year}</strong> Leaving Certificate Higher Level Accounting paper, Question {question.questionNumber}. Open the question in the viewer below and work through it on paper or on the scratchpad.
              </p>
            </div>
          )}

          {/* Reading-mode highlight strip */}
          {readingMode && (
            <div className="mb-3 px-4 py-2 bg-primary/10 border-l-4 border-primary rounded-r flex items-center gap-3">
              <Flag className="h-4 w-4 text-primary" />
              <span className="font-display text-sm font-semibold text-foreground">
                {question.year} · Q{question.questionNumber} · {question.subtopic}
              </span>
              <span className="ml-auto text-[11px] font-mono text-muted-foreground">
                {question.marks} marks · {question.timingMinutes} min target
              </span>
            </div>
          )}

          {/* Zoom toolbar */}
          <div className="flex items-center gap-2 mb-2 px-1">
            <Button size="sm" variant="outline" onClick={zoomOut} aria-label="Zoom out">
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="font-mono text-xs text-muted-foreground w-12 text-center">
              {fitMode ? "FIT" : `${Math.round(zoom * 100)}%`}
            </span>
            <Button size="sm" variant="outline" onClick={zoomIn} aria-label="Zoom in">
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" variant="outline" onClick={zoomReset}>Reset</Button>
            <Button
              size="sm"
              variant={fitMode ? "default" : "outline"}
              onClick={toggleFit}
              className={fitMode ? "bg-primary text-primary-foreground" : ""}
            >
              {fitMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              {fitMode ? "Fixed size" : "Fit to container"}
            </Button>
          </div>

          <ScreenshotPageView
            sources={questionSources}
            zoom={zoom}
            fitToWidth={fitMode}
            title={`${question.year} Q${question.questionNumber}`}
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

        {/* RIGHT — control panel */}
        <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            {/* Circular timer */}
            <div className="flex justify-center mb-3">
              <div className="relative" style={{ width: 180, height: 180 }}>
                <svg width="180" height="180" className="-rotate-90">
                  <circle cx="90" cy="90" r="70" fill="none" strokeWidth="8" className="stroke-border" />
                  <circle
                    cx="90" cy="90" r="70" fill="none" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    className={`${colourClass} transition-all duration-1000 ease-linear ${expired ? "animate-pulse" : ""}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {paused ? (
                    <PauseGlyph className="h-12 w-12 text-amber-600" />
                  ) : (
                    <div className={`font-mono text-[40px] font-bold ${expired ? "text-red-600" : "text-foreground"}`}>
                      {timeStr}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center text-xs font-body text-muted-foreground mb-1">
              {question.timingMinutes} minute target · {question.marks} marks
            </div>
            <div className="text-center text-[11px] font-body text-muted-foreground mb-4">
              Recommended pace: 27 seconds per mark
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setPaused((p) => !p)}
                className="w-full"
              >
                {paused
                  ? <><Play className="h-4 w-4" /> Continue</>
                  : <><PauseGlyph className="h-4 w-4 text-primary" /> Pause</>
                }
              </Button>
              <Button
                onClick={handleSubmit}
                className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground ${expired ? "animate-pulse" : ""}`}
              >
                <Check className="h-4 w-4" /> Submit & See Marking Scheme
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmAbandon(true)}
                className="w-full text-muted-foreground hover:text-destructive"
              >
                <Square className="h-3.5 w-3.5" /> Abandon Question
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 text-xs font-body space-y-1.5">
            <div className="flex justify-between"><span className="text-muted-foreground">Topic</span><span className="text-foreground font-medium text-right">{question.subtopic}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Year & Q</span><span className="font-mono text-foreground">{question.year} · Q{question.questionNumber}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Started</span><span className="font-mono text-foreground">{startedAt.current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span></div>
            <div className="pt-2 mt-2 border-t border-border">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Mark checkpoints</div>
              <ul className="space-y-1">
                {checkpoints.map((cp, i) => {
                  const reached = elapsedPct >= cp.pctOfTime - 0.01;
                  return (
                    <li key={i} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${reached ? "bg-primary" : "bg-border"}`} />
                      <span className={reached ? "text-foreground" : "text-muted-foreground"}>
                        {cp.label} <span className="font-mono">({cp.marks}m)</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
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
  question, actualSeconds, onAgain, onAnother,
}: {
  question: ExamQuestion;
  actualSeconds: number;
  onAgain: () => void;
  onAnother: () => void;
}) {
  const targetSeconds = question.timingMinutes * 60;
  const within = actualSeconds <= targetSeconds;
  const mins = Math.floor(actualSeconds / 60);
  const secs = actualSeconds % 60;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h2 className="font-display text-3xl font-bold text-foreground mb-6">Session Complete</h2>

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
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      />
    );
  }
  return <SelectStage onStart={handleStart} />;
}
