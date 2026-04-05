import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { THEORY_BANK, THEORY_FLASHCARDS, THEORY_TOPICS } from "@/data/theory";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Eye, EyeOff, RotateCcw, Check, X, Minus, ChevronLeft, ChevronRight, BarChart3, Shuffle } from "lucide-react";

type Score = "got" | "partial" | "missed";
const PAGE_SIZE = 20;

export default function TheoryPage() {
  const [topicFilter, setTopicFilter] = useState<string>("All");
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
  const [scores, setScores] = useLocalStorage<Record<number, Score>>("lc-theory-scores", {});
  const [page, setPage] = useState(0);

  // Flashcard state
  const [flashTopic, setFlashTopic] = useState<string>("All");
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useLocalStorage<string[]>("lc-flash-known", []);

  // Practice mode state
  const [practiceFilter, setPracticeFilter] = useState<string>("All");
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceRevealed, setPracticeRevealed] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceShuffled, setPracticeShuffled] = useState(false);
  const [practiceOrder, setPracticeOrder] = useState<number[]>([]);

  const filtered = useMemo(() => {
    if (topicFilter === "All") return THEORY_BANK;
    return THEORY_BANK.filter(q => q.topic === topicFilter);
  }, [topicFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const flashFiltered = useMemo(() => {
    return flashTopic === "All" ? THEORY_FLASHCARDS : THEORY_FLASHCARDS.filter(f => f.topic === flashTopic);
  }, [flashTopic]);

  // Practice filtered questions
  const practiceFiltered = useMemo(() => {
    const base = practiceFilter === "All" ? THEORY_BANK : THEORY_BANK.filter(q => q.topic === practiceFilter);
    return base;
  }, [practiceFilter]);

  const practiceQuestions = useMemo(() => {
    if (practiceShuffled && practiceOrder.length === practiceFiltered.length) {
      return practiceOrder.map(i => practiceFiltered[i]);
    }
    return practiceFiltered;
  }, [practiceFiltered, practiceShuffled, practiceOrder]);

  const currentPracticeQ = practiceQuestions[practiceIdx];
  const currentPracticeGlobalIdx = currentPracticeQ ? THEORY_BANK.indexOf(currentPracticeQ) : -1;

  const shufflePractice = useCallback(() => {
    const order = Array.from({ length: practiceFiltered.length }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setPracticeOrder(order);
    setPracticeShuffled(true);
    setPracticeIdx(0);
    setPracticeRevealed(false);
    setPracticeAnswer("");
  }, [practiceFiltered.length]);

  const goToPracticeNext = () => {
    if (practiceIdx < practiceQuestions.length - 1) {
      setPracticeIdx(practiceIdx + 1);
      setPracticeRevealed(false);
      setPracticeAnswer("");
    }
  };

  const goToPracticePrev = () => {
    if (practiceIdx > 0) {
      setPracticeIdx(practiceIdx - 1);
      setPracticeRevealed(false);
      setPracticeAnswer("");
    }
  };

  const toggleReveal = (i: number) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const setScore = (i: number, score: Score) => {
    setScores(prev => ({ ...prev, [i]: score }));
  };

  // Frequency analysis
  const freqData = useMemo(() => {
    const map: Record<string, number> = {};
    THEORY_BANK.forEach(q => { map[q.topic] = (map[q.topic] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);

  const uniqueYears = useMemo(() => new Set(THEORY_BANK.map(q => q.year)).size, []);
  const uniqueSubTopics = useMemo(() => new Set(THEORY_BANK.flatMap(q => q.tags)).size, []);

  const totalScored = Object.keys(scores).length;
  const gotCount = Object.values(scores).filter(s => s === "got").length;

  // Practice stats
  const practiceScored = practiceQuestions.filter((_, i) => {
    const gIdx = THEORY_BANK.indexOf(practiceQuestions[i]);
    return scores[gIdx] !== undefined;
  }).length;
  const practiceGot = practiceQuestions.filter((_, i) => {
    const gIdx = THEORY_BANK.indexOf(practiceQuestions[i]);
    return scores[gIdx] === "got";
  }).length;

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Theory Revision</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        {THEORY_BANK.length} past exam theory questions with marking scheme answers. Filter by topic, practise, and track your progress.
      </p>

      {/* Stats banner */}
      <Card className="mb-6 border-border">
        <CardContent className="p-4 flex flex-wrap gap-6 items-center justify-center">
          <Stat label="Questions" value={String(THEORY_BANK.length)} />
          <Stat label="Topics" value={String(THEORY_TOPICS.length)} />
          <Stat label="Exam Years" value={String(uniqueYears)} />
          <Stat label="Sub-Topics" value={String(uniqueSubTopics)} />
          <Stat label="Flashcards" value={String(THEORY_FLASHCARDS.length)} />
          {totalScored > 0 && <Stat label="Score" value={`${Math.round(gotCount / totalScored * 100)}%`} />}
        </CardContent>
      </Card>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="questions">All Questions</TabsTrigger>
          <TabsTrigger value="practice">Practice Mode</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
        </TabsList>

        {/* ALL QUESTIONS TAB */}
        <TabsContent value="questions">
          <FilterBar topics={THEORY_TOPICS} active={topicFilter} onSelect={(t) => { setTopicFilter(t); setPage(0); }} />
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-muted-foreground">{filtered.length} question{filtered.length !== 1 ? "s" : ""}</p>
            {totalPages > 1 && (
              <p className="text-xs text-muted-foreground font-mono">Page {page + 1} of {totalPages}</p>
            )}
          </div>
          <div className="space-y-4">
            {paged.map((q) => {
              const globalIdx = THEORY_BANK.indexOf(q);
              const revealed = revealedIds.has(globalIdx);
              return (
                <QuestionCard
                  key={globalIdx}
                  q={q}
                  revealed={revealed}
                  onToggle={() => toggleReveal(globalIdx)}
                  score={scores[globalIdx]}
                  onScore={(s) => setScore(globalIdx, s)}
                  showScoring={false}
                />
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button variant="outline" size="sm" className="text-xs" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} variant={page === i ? "default" : "outline"} size="sm" className="text-xs w-8 h-8 p-0" onClick={() => setPage(i)}>
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="text-xs" disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* PRACTICE MODE — Single question quiz flow */}
        <TabsContent value="practice">
          <FilterBar topics={THEORY_TOPICS} active={practiceFilter} onSelect={(t) => { setPracticeFilter(t); setPracticeIdx(0); setPracticeRevealed(false); setPracticeAnswer(""); setPracticeShuffled(false); }} />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground font-mono">
                {practiceIdx + 1} of {practiceQuestions.length}
              </p>
              {practiceScored > 0 && (
                <p className="text-xs text-muted-foreground">
                  {practiceGot}/{practiceScored} correct ({Math.round(practiceGot / practiceScored * 100)}%)
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs gap-1 h-7" onClick={shufflePractice}>
                <Shuffle className="h-3 w-3" /> Shuffle
              </Button>
              <Button variant="outline" size="sm" className="text-xs gap-1 h-7" onClick={() => { setPracticeIdx(0); setPracticeRevealed(false); setPracticeAnswer(""); setScores({}); }}>
                <RotateCcw className="h-3 w-3" /> Reset
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-6">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((practiceIdx + 1) / practiceQuestions.length) * 100}%` }} />
          </div>

          {currentPracticeQ && (
            <div className="space-y-4">
              {/* Question */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <Badge variant="outline" className="text-[10px]">{currentPracticeQ.topic}</Badge>
                    <span className="text-[11px] font-mono text-muted-foreground">{currentPracticeQ.year}</span>
                    <span className="text-[11px] font-mono text-primary font-bold">{currentPracticeQ.marks} marks</span>
                    {scores[currentPracticeGlobalIdx] && (
                      <Badge className={`text-[9px] ${scores[currentPracticeGlobalIdx] === "got" ? "bg-green-600" : scores[currentPracticeGlobalIdx] === "partial" ? "bg-amber-500" : "bg-red-500"} text-white`}>
                        {scores[currentPracticeGlobalIdx] === "got" ? "Got It" : scores[currentPracticeGlobalIdx] === "partial" ? "Partial" : "Missed"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {currentPracticeQ.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">{tag}</span>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed font-medium">{currentPracticeQ.q}</p>
                </CardContent>
              </Card>

              {/* Your answer area */}
              <Card className="border-border border-dashed">
                <CardContent className="p-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Your Answer (scratch pad)</label>
                  <textarea
                    className="w-full min-h-[120px] bg-transparent border border-border rounded-lg p-3 text-sm leading-relaxed resize-y focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Write your answer here before revealing the marking scheme answer..."
                    value={practiceAnswer}
                    onChange={(e) => setPracticeAnswer(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Reveal / Answer */}
              {!practiceRevealed ? (
                <Button className="w-full gap-2" size="lg" onClick={() => setPracticeRevealed(true)}>
                  <Eye className="h-4 w-4" /> Reveal Marking Scheme Answer
                </Button>
              ) : (
                <>
                  <Card className="border-border bg-sage-bg">
                    <CardContent className="p-6">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Marking Scheme Answer</h4>
                      <p className="text-sm font-light leading-relaxed whitespace-pre-line">{currentPracticeQ.a}</p>
                    </CardContent>
                  </Card>

                  {/* Self-scoring */}
                  <div className="flex gap-3 justify-center">
                    <Button size="lg" variant={scores[currentPracticeGlobalIdx] === "got" ? "default" : "outline"} className="text-sm gap-2 flex-1 max-w-[160px]" onClick={() => setScore(currentPracticeGlobalIdx, "got")}>
                      <Check className="h-4 w-4" /> Got It
                    </Button>
                    <Button size="lg" variant={scores[currentPracticeGlobalIdx] === "partial" ? "default" : "outline"} className="text-sm gap-2 flex-1 max-w-[160px]" onClick={() => setScore(currentPracticeGlobalIdx, "partial")}>
                      <Minus className="h-4 w-4" /> Partial
                    </Button>
                    <Button size="lg" variant={scores[currentPracticeGlobalIdx] === "missed" ? "default" : "outline"} className="text-sm gap-2 flex-1 max-w-[160px]" onClick={() => setScore(currentPracticeGlobalIdx, "missed")}>
                      <X className="h-4 w-4" /> Missed
                    </Button>
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="text-xs gap-1" disabled={practiceIdx === 0} onClick={goToPracticePrev}>
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </Button>
                <Button size="sm" className="text-xs gap-1" disabled={practiceIdx === practiceQuestions.length - 1} onClick={goToPracticeNext}>
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* FLASHCARDS */}
        <TabsContent value="flashcards">
          <FilterBar topics={THEORY_TOPICS} active={flashTopic} onSelect={(t) => { setFlashTopic(t); setFlashIndex(0); setFlipped(false); }} />
          {flashFiltered.length > 0 ? (
            <div className="max-w-[500px] mx-auto">
              <p className="text-xs text-muted-foreground mb-3 text-center">
                {flashIndex + 1} of {flashFiltered.length} · {known.length} known
              </p>
              <div
                className="relative cursor-pointer"
                style={{ minHeight: 220 }}
                onClick={() => setFlipped(!flipped)}
              >
                <Card className={`p-8 text-center transition-all duration-300 ${flipped ? "bg-sage-bg" : "bg-card"}`}>
                  <CardContent className="p-0">
                    <Badge variant="outline" className="mb-4 text-[10px]">{flashFiltered[flashIndex].topic}</Badge>
                    {!flipped ? (
                      <p className="font-display text-lg font-bold">{flashFiltered[flashIndex].term}</p>
                    ) : (
                      <p className="text-sm font-light leading-relaxed">{flashFiltered[flashIndex].def}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground mt-4">{flipped ? "Click to see term" : "Click to reveal definition"}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-3 justify-center mt-4">
                <Button variant="outline" size="sm" onClick={() => { setFlashIndex(Math.max(0, flashIndex - 1)); setFlipped(false); }} disabled={flashIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant={known.includes(flashFiltered[flashIndex].term) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const term = flashFiltered[flashIndex].term;
                    setKnown(prev => prev.includes(term) ? prev.filter(t => t !== term) : [...prev, term]);
                  }}
                >
                  {known.includes(flashFiltered[flashIndex].term) ? "Known ✓" : "Mark Known"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setFlashIndex(Math.min(flashFiltered.length - 1, flashIndex + 1)); setFlipped(false); }} disabled={flashIndex === flashFiltered.length - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No flashcards for this topic.</p>
          )}
        </TabsContent>

        {/* FREQUENCY */}
        <TabsContent value="frequency">
          <p className="text-xs text-muted-foreground mb-4">How often each topic appears as a theory question in the HL exam.</p>
          <div className="space-y-2">
            {freqData.map(([topic, count]) => (
              <div key={topic} className="flex items-center gap-3">
                <span className="text-sm font-medium w-44 shrink-0">{topic}</span>
                <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-primary/80 rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${(count / freqData[0][1]) * 100}%` }}
                  >
                    <span className="text-[10px] font-mono font-bold text-primary-foreground">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FilterBar({ topics, active, onSelect }: { topics: string[]; active: string; onSelect: (t: string) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap mb-4">
      <Button variant={active === "All" ? "default" : "outline"} size="sm" className="text-xs h-7 px-3" onClick={() => onSelect("All")}>All</Button>
      {topics.map(t => (
        <Button key={t} variant={active === t ? "default" : "outline"} size="sm" className="text-xs h-7 px-3" onClick={() => onSelect(t)}>
          {t}
        </Button>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center min-w-[60px]">
      <div className="font-mono text-lg font-bold text-primary">{value}</div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

interface QuestionCardProps {
  q: { topic: string; year: number; marks: number; tags: string[]; q: string; a: string };
  revealed: boolean;
  onToggle: () => void;
  score?: Score;
  onScore: (s: Score) => void;
  showScoring: boolean;
}

function QuestionCard({ q, revealed, onToggle, score, onScore, showScoring }: QuestionCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge variant="outline" className="text-[10px]">{q.topic}</Badge>
          <span className="text-[11px] font-mono text-muted-foreground">{q.year}</span>
          <span className="text-[11px] font-mono text-primary font-bold">{q.marks} marks</span>
          {score && (
            <Badge className={`text-[9px] ${score === "got" ? "bg-green-600" : score === "partial" ? "bg-amber-500" : "bg-red-500"} text-white`}>
              {score === "got" ? "Got It" : score === "partial" ? "Partial" : "Missed"}
            </Badge>
          )}
        </div>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {q.tags.map(tag => (
            <span key={tag} className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">{tag}</span>
          ))}
        </div>
        <p className="text-sm leading-relaxed mb-3">{q.q}</p>
        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={onToggle}>
          {revealed ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {revealed ? "Hide Answer" : "Show Answer"}
        </Button>
        {revealed && (
          <div className="mt-4 p-4 bg-sage-bg border border-border rounded-lg">
            <p className="text-sm font-light leading-relaxed whitespace-pre-line">{q.a}</p>
          </div>
        )}
        {revealed && showScoring && (
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant={score === "got" ? "default" : "outline"} className="text-xs gap-1 h-7" onClick={() => onScore("got")}>
              <Check className="h-3 w-3" /> Got It
            </Button>
            <Button size="sm" variant={score === "partial" ? "default" : "outline"} className="text-xs gap-1 h-7" onClick={() => onScore("partial")}>
              <Minus className="h-3 w-3" /> Partial
            </Button>
            <Button size="sm" variant={score === "missed" ? "default" : "outline"} className="text-xs gap-1 h-7" onClick={() => onScore("missed")}>
              <X className="h-3 w-3" /> Missed
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
