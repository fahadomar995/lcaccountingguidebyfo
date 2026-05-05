import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Check, X, Trophy, Brain, Clock } from "lucide-react";
import type { Flashcard } from "@/data/theory";

type CardStatus = "know" | "learning";

/** SM-2 lite scheduling state per card term. */
interface SrsEntry {
  /** Ease factor (1.3 – 2.8). Higher = longer intervals. */
  ef: number;
  /** Interval in days until next review. */
  interval: number;
  /** Number of consecutive successful reviews. */
  reps: number;
  /** ISO date the card is next due. */
  due: string;
  /** Total reviews ever. */
  reviews: number;
  /** ISO date of last review. */
  last: string;
}

type Grade = 0 | 1 | 2 | 3; // 0 again, 1 hard, 2 good, 3 easy

const todayISO = () => new Date().toISOString().slice(0, 10);
function addDays(iso: string, days: number) {
  const d = new Date(iso); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function schedule(prev: SrsEntry | undefined, grade: Grade): SrsEntry {
  const cur: SrsEntry = prev ?? { ef: 2.5, interval: 0, reps: 0, due: todayISO(), reviews: 0, last: todayISO() };
  let { ef, interval, reps } = cur;
  if (grade === 0) { reps = 0; interval = 0; }
  else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = grade === 1 ? 2 : 3;
    else interval = Math.round(interval * ef * (grade === 1 ? 0.7 : grade === 3 ? 1.3 : 1));
  }
  // Update ease factor (SM-2 formula approximation)
  const q = grade === 0 ? 2 : grade === 1 ? 3 : grade === 2 ? 4 : 5;
  ef = Math.max(1.3, Math.min(2.8, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))));
  return {
    ef, interval, reps,
    due: addDays(todayISO(), Math.max(0, interval)),
    reviews: cur.reviews + 1,
    last: todayISO(),
  };
}

interface Props {
  cards: Flashcard[];
  storageKey?: string; // Defaults to "lc-flash-status-v2"
}

/**
 * Quizlet-style flashcard study deck.
 * - Per-card status persisted to localStorage (know / learning)
 * - Smart round: starts with new + learning cards, cycles unknowns until all marked know
 * - Keyboard: ← prev, → next, Space flip, 1 = learning, 2 = know
 * - Shuffle, Restart round, end-of-round summary
 */
export default function FlashcardDeck({ cards, storageKey = "lc-flash-status-v2" }: Props) {
  const [statusMap, setStatusMap] = useLocalStorage<Record<string, CardStatus>>(storageKey, {});
  const [srs, setSrs] = useLocalStorage<Record<string, SrsEntry>>("lc-flash-srs-v1", {});
  const [stats, setStats] = useLocalStorage<{ totalReviews: number; lastSession: string }>(
    "lc-flash-stats-v1", { totalReviews: 0, lastSession: "" }
  );
  // Mirror the Daily Review Goal scope so "Active recall · Due only" honours
  // the topics selected in the active preset (empty = all topics).
  const [goalSettings] = useLocalStorage<{ dailyTarget: number; topics: string[]; remindersOn: boolean }>(
    "lc-flash-goal-settings-v1",
    { dailyTarget: 20, topics: [], remindersOn: true },
  );
  const [mode, setMode] = useState<"classic" | "recall">("recall");
  const [dueOnly, setDueOnly] = useState(true);
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);

  // Build initial round.
  // Recall mode: cards due today/earlier first (or new), prioritised by overdue days; optionally only due.
  // Classic mode: learning → new → known, like before.
  const buildRound = useCallback((shuffle = false) => {
    const inGoalScope = (topic: string) =>
      goalSettings.topics.length === 0 || goalSettings.topics.includes(topic);
    const learning: number[] = [];
    const newCards: number[] = [];
    const known: number[] = [];
    cards.forEach((c, i) => {
      const s = statusMap[c.term];
      if (s === "learning") learning.push(i);
      else if (s === "know") known.push(i);
      else newCards.push(i);
    });
    let round: number[];
    if (mode === "recall") {
      const today = todayISO();
      const scored = cards.map((c, i) => {
        const e = srs[c.term];
        if (!e) return { i, score: 1_000_000, isNew: true, isDue: true };
        const overdue = (new Date(today).getTime() - new Date(e.due).getTime()) / 86_400_000;
        return { i, score: overdue, isNew: false, isDue: overdue >= 0 };
      });
      // When "Due only" is on, restrict to topics chosen in the active goal preset.
      const pool = dueOnly
        ? scored.filter(s => s.isDue && inGoalScope(cards[s.i].topic))
        : scored;
      pool.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.score - a.score);
      round = pool.map(p => p.i);
    } else {
      round = [...learning, ...newCards, ...known];
    }
    if (shuffle) {
      for (let i = round.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [round[i], round[j]] = [round[j], round[i]];
      }
    }
    setOrder(round);
    setPos(0);
    setFlipped(false);
    setRoundComplete(false);
    setRoundCorrect(0);
  }, [cards, statusMap, srs, mode, dueOnly, goalSettings.topics]);

  // Initialize / re-initialize when card list changes
  useEffect(() => {
    buildRound(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, mode, dueOnly, goalSettings.topics]);

  const total = order.length;
  const currentIdx = order[pos];
  const current = currentIdx !== undefined ? cards[currentIdx] : undefined;
  const status = current ? statusMap[current.term] : undefined;

  const knownCount = useMemo(
    () => cards.filter(c => statusMap[c.term] === "know").length,
    [cards, statusMap]
  );
  const learningCount = useMemo(
    () => cards.filter(c => statusMap[c.term] === "learning").length,
    [cards, statusMap]
  );
  const remainingCount = total - pos;

  const dueTodayCount = useMemo(() => {
    const today = todayISO();
    return cards.filter(c => {
      const e = srs[c.term];
      return !e || e.due <= today;
    }).length;
  }, [cards, srs]);
  const totalReviews = stats.totalReviews;

  const advance = useCallback(() => {
    if (pos + 1 >= total) {
      setRoundComplete(true);
    } else {
      setPos(pos + 1);
      setFlipped(false);
    }
  }, [pos, total]);

  const markStatus = useCallback((newStatus: CardStatus) => {
    if (!current) return;
    setStatusMap(prev => ({ ...prev, [current.term]: newStatus }));
    if (newStatus === "know") setRoundCorrect(c => c + 1);
    advance();
  }, [current, advance, setStatusMap]);

  const gradeCard = useCallback((grade: Grade) => {
    if (!current) return;
    const next = schedule(srs[current.term], grade);
    setSrs(prev => ({ ...prev, [current.term]: next }));
    setStatusMap(prev => ({
      ...prev,
      [current.term]: grade >= 2 ? "know" : "learning",
    }));
    setStats(s => ({ totalReviews: s.totalReviews + 1, lastSession: todayISO() }));
    if (grade >= 2) setRoundCorrect(c => c + 1);
    advance();
  }, [current, srs, setSrs, setStatusMap, setStats, advance]);

  const goPrev = useCallback(() => {
    if (pos > 0) {
      setPos(pos - 1);
      setFlipped(false);
    }
  }, [pos]);

  const goNext = useCallback(() => {
    advance();
  }, [advance]);

  const restartRound = useCallback(() => buildRound(false), [buildRound]);
  const shuffleDeck = useCallback(() => buildRound(true), [buildRound]);

  const studyLearningOnly = useCallback(() => {
    const learning = cards
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => statusMap[c.term] === "learning")
      .map(({ i }) => i);
    if (learning.length === 0) return;
    setOrder(learning);
    setPos(0);
    setFlipped(false);
    setRoundComplete(false);
    setRoundCorrect(0);
  }, [cards, statusMap]);

  const resetAll = useCallback(() => {
    if (!confirm("Reset progress on all flashcards in this deck?")) return;
    setStatusMap(prev => {
      const next = { ...prev };
      cards.forEach(c => { delete next[c.term]; });
      return next;
    });
    buildRound(false);
  }, [cards, setStatusMap, buildRound]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (roundComplete) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " ") { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (mode === "recall") {
        if (e.key === "1") gradeCard(0);
        else if (e.key === "2") gradeCard(1);
        else if (e.key === "3") gradeCard(2);
        else if (e.key === "4") gradeCard(3);
      } else {
        if (e.key === "1") markStatus("learning");
        else if (e.key === "2") markStatus("know");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [roundComplete, goPrev, goNext, markStatus, gradeCard, mode]);

  if (cards.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-8">No flashcards available.</p>;
  }

  // Round complete summary
  if (roundComplete) {
    const stillLearning = cards.filter(c => statusMap[c.term] === "learning").length;
    return (
      <div className="max-w-[500px] mx-auto">
        <Card className="p-8 text-center">
          <CardContent className="p-0">
            <Trophy className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-display text-xl font-bold mb-1">Round complete</h3>
            <p className="text-xs text-muted-foreground mb-5">
              You marked {roundCorrect} of {total} as known this round.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <div className="font-mono text-2xl font-bold text-primary">{knownCount}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Know</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold" style={{ color: "hsl(var(--tier-po))" }}>{stillLearning}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Learning</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-muted-foreground">{cards.length - knownCount - stillLearning}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">New</div>
              </div>
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              {stillLearning > 0 && (
                <Button size="sm" onClick={studyLearningOnly}>
                  Study {stillLearning} learning
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => buildRound(false)}>
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Restart full deck
              </Button>
              <Button size="sm" variant="outline" onClick={() => buildRound(true)}>
                <Shuffle className="h-3.5 w-3.5 mr-1.5" />
                Shuffle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!current) return null;

  const progressPct = total > 0 ? (pos / total) * 100 : 0;
  const cardSrs = srs[current.term];

  return (
    <div className="max-w-[560px] mx-auto">
      {/* Mode + due bar */}
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="inline-flex rounded-md border border-border overflow-hidden">
          <button
            type="button"
            onClick={() => setMode("recall")}
            className={`px-2.5 py-1 text-[11px] font-mono inline-flex items-center gap-1 ${mode === "recall" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            title="Spaced repetition (active recall)"
          >
            <Brain className="h-3 w-3" /> Active recall
          </button>
          <button
            type="button"
            onClick={() => setMode("classic")}
            className={`px-2.5 py-1 text-[11px] font-mono ${mode === "classic" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
          >
            Classic
          </button>
        </div>
        {mode === "recall" && (
          <label className="text-[11px] font-mono text-muted-foreground inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={dueOnly}
              onChange={(e) => setDueOnly(e.target.checked)}
              className="accent-primary h-3 w-3"
            />
            Due only
          </label>
        )}
        <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground ml-auto">
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {dueTodayCount} due</span>
          <span>{totalReviews} reviews</span>
        </div>
      </div>

      {/* Top stats bar — persistent deck progress (X / N) until reset */}
      <div className="flex items-center justify-between mb-2 text-[11px] font-mono flex-wrap gap-y-1">
        <span className="text-muted-foreground">Card {pos + 1} of {total}</span>
        <div className="flex gap-3 items-center">
          <span className="text-primary font-bold" title="Cards marked 'Know'">
            {knownCount}/{cards.length} learned
          </span>
          <span className="font-bold" style={{ color: "hsl(var(--tier-po))" }} title="Cards marked 'Still learning'">
            {learningCount} learning
          </span>
          <span className="text-muted-foreground" title="Cards left in this round">
            {remainingCount} left
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer select-none"
        style={{ minHeight: 240 }}
        onClick={() => setFlipped(f => !f)}
      >
        <Card
          className={`p-8 text-center transition-all duration-300 ${flipped ? "bg-sage-bg" : "bg-card"} ${status === "know" ? "border-primary/40" : ""}`}
          style={status === "learning" ? { borderColor: "hsl(var(--tier-po) / 0.4)" } : undefined}
        >
          <CardContent className="p-0 flex flex-col justify-center" style={{ minHeight: 180 }}>
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px]">{current.topic}</Badge>
              {status === "know" && <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30">Know</Badge>}
              {status === "learning" && (
                <Badge
                  className="text-[10px]"
                  style={{ background: "hsl(var(--tier-po) / 0.15)", color: "hsl(var(--tier-po))", borderColor: "hsl(var(--tier-po) / 0.3)" }}
                >
                  Learning
                </Badge>
              )}
              {mode === "recall" && cardSrs && (
                <Badge variant="outline" className="text-[10px] font-mono">
                  next +{cardSrs.interval}d · ef {cardSrs.ef.toFixed(2)}
                </Badge>
              )}
            </div>
            {!flipped ? (
              <p className="font-display text-lg font-bold">{current.term}</p>
            ) : (
              <p className="text-sm font-light leading-relaxed">{current.def}</p>
            )}
            <p className="text-[10px] text-muted-foreground mt-4">
              {flipped ? "Tap or press Space to see term" : "Tap or press Space to reveal definition"}
            </p>
          </CardContent>
        </Card>
      </div>

      {mode === "recall" ? (
        <div className="grid grid-cols-4 gap-1.5 mt-4">
          <Button variant="outline" onClick={() => gradeCard(0)} className="h-12 flex-col gap-0.5 text-[11px]" style={{ borderColor: "hsl(var(--tier-po) / 0.5)", color: "hsl(var(--tier-po))" }}>
            Again<span className="text-[9px] font-mono opacity-60">1 · &lt;1d</span>
          </Button>
          <Button variant="outline" onClick={() => gradeCard(1)} className="h-12 flex-col gap-0.5 text-[11px]">
            Hard<span className="text-[9px] font-mono opacity-60">2</span>
          </Button>
          <Button onClick={() => gradeCard(2)} className="h-12 flex-col gap-0.5 text-[11px] bg-primary hover:bg-primary/90">
            Good<span className="text-[9px] font-mono opacity-70">3</span>
          </Button>
          <Button variant="outline" onClick={() => gradeCard(3)} className="h-12 flex-col gap-0.5 text-[11px] border-primary/40 text-primary">
            Easy<span className="text-[9px] font-mono opacity-60">4</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => markStatus("learning")}
            className="h-12"
            style={{ borderColor: "hsl(var(--tier-po) / 0.4)", color: "hsl(var(--tier-po))" }}
          >
            <X className="h-4 w-4 mr-2" />
            Still learning
            <kbd className="ml-2 text-[9px] font-mono opacity-60">1</kbd>
          </Button>
          <Button
            onClick={() => markStatus("know")}
            className="h-12 bg-primary hover:bg-primary/90"
          >
            <Check className="h-4 w-4 mr-2" />
            Know it
            <kbd className="ml-2 text-[9px] font-mono opacity-70">2</kbd>
          </Button>
        </div>
      )}

      {/* Secondary controls */}
      <div className="flex items-center justify-between mt-3">
        <Button variant="ghost" size="sm" onClick={goPrev} disabled={pos === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Prev
        </Button>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={shuffleDeck} title="Shuffle deck">
            <Shuffle className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={restartRound} title="Restart round">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={resetAll} className="text-[10px] text-muted-foreground" title="Reset all progress in this deck">
            Reset
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={goNext}>
          Skip <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-3 font-mono">
        ← prev · → next · Space flip · {mode === "recall" ? "1 again · 2 hard · 3 good · 4 easy" : "1 learning · 2 know"}
      </p>
    </div>
  );
}
