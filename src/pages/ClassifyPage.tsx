import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CLASSIFY_ITEMS } from "@/data/studyContent";
import { Check, X, RotateCcw, Shuffle } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ClassifyPage() {
  const [mode, setMode] = useState<"quiz" | "reference">("quiz");
  const [items, setItems] = useState(() => shuffleArray(CLASSIFY_ITEMS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<("correct" | "wrong" | null)[]>(() => new Array(CLASSIFY_ITEMS.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [bestScore, setBestScore] = useLocalStorage("lc-classify-best", 0);

  const correctCount = answered.filter(a => a === "correct").length;
  const wrongCount = answered.filter(a => a === "wrong").length;
  const totalAnswered = correctCount + wrongCount;

  const answer = (choice: "debit" | "credit") => {
    const isCorrect = choice === items[current].answer;
    setAnswered(prev => {
      const next = [...prev];
      next[current] = isCorrect ? "correct" : "wrong";
      return next;
    });
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      if (current < items.length - 1) {
        setCurrent(current + 1);
      }
    }, 1200);
  };

  const reset = () => {
    const score = Math.round((correctCount / Math.max(totalAnswered, 1)) * 100);
    if (score > bestScore) setBestScore(score);
    setItems(shuffleArray(CLASSIFY_ITEMS));
    setCurrent(0);
    setAnswered(new Array(CLASSIFY_ITEMS.length).fill(null));
    setShowResult(false);
  };

  const categories = useMemo(() => {
    const cats: Record<string, typeof CLASSIFY_ITEMS> = {};
    CLASSIFY_ITEMS.forEach(item => {
      if (!cats[item.category]) cats[item.category] = [];
      cats[item.category].push(item);
    });
    return cats;
  }, []);

  if (mode === "reference") {
    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display text-2xl font-bold">Classification Reference</h1>
          <Button variant="outline" size="sm" className="text-xs ml-auto" onClick={() => setMode("quiz")}>Quiz Mode</Button>
        </div>
        {Object.entries(categories).map(([cat, catItems]) => (
          <div key={cat} className="mb-6">
            <h2 className="font-display text-sm font-bold mb-2 pb-1 border-b border-border">{cat}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {catItems.map(item => (
                <div key={item.item} className={`text-xs p-2 rounded border ${item.answer === "debit" ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" : "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"}`}>
                  <span className="font-medium">{item.item}</span>
                  <Badge variant="outline" className={`text-[8px] ml-1.5 ${item.answer === "debit" ? "text-blue-600 border-blue-300" : "text-rose-600 border-rose-300"}`}>
                    {item.answer.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const item = items[current];
  const result = answered[current];

  return (
    <div className="max-w-[600px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Where Does This Go?</h1>
          <p className="text-xs text-muted-foreground">{CLASSIFY_ITEMS.length} items · Debit or Credit?</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setMode("reference")}>Reference</Button>
      </div>

      {/* Stats */}
      <Card className="mb-6 border-border">
        <CardContent className="p-4 flex gap-6 justify-center flex-wrap">
          <div className="text-center"><span className="font-mono text-lg font-bold text-green-600">{correctCount}</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Correct</p></div>
          <div className="text-center"><span className="font-mono text-lg font-bold text-red-500">{wrongCount}</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Wrong</p></div>
          <div className="text-center"><span className="font-mono text-lg font-bold text-primary">{totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0}%</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</p></div>
          <div className="text-center"><span className="font-mono text-lg font-bold text-muted-foreground">{bestScore}%</span><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Best</p></div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(current / items.length) * 100}%` }} />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{current + 1}/{items.length}</span>
      </div>

      {/* Question card */}
      <Card className={`mb-6 border-2 transition-colors ${showResult && result === "correct" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : showResult && result === "wrong" ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-border"}`}>
        <CardContent className="p-8 text-center">
          <Badge variant="outline" className="text-[9px] mb-3">{item.category}</Badge>
          <h2 className="font-display text-xl font-bold mb-2">{item.item}</h2>
          {item.hint && <p className="text-xs text-muted-foreground italic">{item.hint}</p>}
          {showResult && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {result === "correct" ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />}
              <span className={`text-sm font-bold ${result === "correct" ? "text-green-600" : "text-red-500"}`}>
                {result === "correct" ? "Correct!" : `Wrong — it's ${item.answer.toUpperCase()}`}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Answer buttons */}
      {!showResult && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button size="lg" className="h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700" onClick={() => answer("debit")}>
            DEBIT
          </Button>
          <Button size="lg" className="h-14 text-lg font-bold bg-rose-600 hover:bg-rose-700" onClick={() => answer("credit")}>
            CREDIT
          </Button>
        </div>
      )}

      <div className="flex justify-center">
        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" /> Restart & Shuffle
        </Button>
      </div>
    </div>
  );
}
