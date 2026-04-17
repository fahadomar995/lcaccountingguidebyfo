import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Check, X, Trophy } from "lucide-react";
import type { Flashcard } from "@/data/theory";

type CardStatus = "know" | "learning";

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
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [roundComplete, setRoundComplete] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(0);

  // Build initial round: learning cards first, then never-seen, then known last
  const buildRound = useCallback((shuffle = false) => {
    const learning: number[] = [];
    const newCards: number[] = [];
    const known: number[] = [];
    cards.forEach((c, i) => {
      const s = statusMap[c.term];
      if (s === "learning") learning.push(i);
      else if (s === "know") known.push(i);
      else newCards.push(i);
    });
    const round = [...learning, ...newCards, ...known];
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
  }, [cards, statusMap]);

  // Initialize / re-initialize when card list changes
  useEffect(() => {
    buildRound(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

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
      else if (e.key === "1") markStatus("learning");
      else if (e.key === "2") markStatus("know");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [roundComplete, goPrev, goNext, markStatus]);

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
                <div className="font-mono text-2xl font-bold text-amber-600">{stillLearning}</div>
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

  return (
    <div className="max-w-[560px] mx-auto">
      {/* Top stats bar */}
      <div className="flex items-center justify-between mb-2 text-[11px] font-mono">
        <span className="text-muted-foreground">{pos + 1} / {total}</span>
        <div className="flex gap-3">
          <span className="text-primary font-bold">{knownCount} know</span>
          <span className="text-amber-600 font-bold">{learningCount} learning</span>
          <span className="text-muted-foreground">{remainingCount} left</span>
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
        <Card className={`p-8 text-center transition-all duration-300 ${flipped ? "bg-sage-bg" : "bg-card"} ${status === "know" ? "border-primary/40" : status === "learning" ? "border-amber-500/40" : ""}`}>
          <CardContent className="p-0 flex flex-col justify-center" style={{ minHeight: 180 }}>
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px]">{current.topic}</Badge>
              {status === "know" && <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30">Know</Badge>}
              {status === "learning" && <Badge className="text-[10px] bg-amber-500/15 text-amber-700 border-amber-500/30">Learning</Badge>}
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

      {/* Status buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => markStatus("learning")}
          className="h-12 border-amber-500/40 text-amber-700 hover:bg-amber-500/10 hover:text-amber-700"
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
        ← prev · → next · Space flip · 1 learning · 2 know
      </p>
    </div>
  );
}
