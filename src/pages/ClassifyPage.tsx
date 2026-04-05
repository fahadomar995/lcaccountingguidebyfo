import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CLASSIFY_ITEMS, CLASSIFY_CATEGORIES, type ClassifyCategory } from "@/data/studyContent";
import { Check, X, RotateCcw, Shuffle } from "lucide-react";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type TopicKey = "ALL" | "ST" | "CO" | "MFG" | "CLUB" | "SERVICE" | "CF" | "NONE";

const TOPIC_TABS: { key: TopicKey; label: string; categories: ClassifyCategory[] }[] = [
  { key: "ALL", label: "All", categories: CLASSIFY_CATEGORIES },
  { key: "ST", label: "Sole Trader", categories: ["Trading Account", "P&L (Administration)", "P&L (Selling & Distribution)", "BS Fixed Assets", "BS Current Assets", "BS Creditors < 1 Year", "BS Creditors > 1 Year", "BS Capital & Reserves", "NOT in any account"] },
  { key: "CO", label: "Company", categories: ["Trading Account", "P&L (Administration)", "P&L (Selling & Distribution)", "BS Fixed Assets", "BS Current Assets", "BS Creditors < 1 Year", "BS Creditors > 1 Year", "BS Capital & Reserves", "NOT in any account"] },
  { key: "MFG", label: "Manufacturing", categories: ["Manufacturing Account", "Trading Account", "P&L (Administration)", "BS Fixed Assets", "BS Current Assets"] },
  { key: "CLUB", label: "Club", categories: ["BS Current Assets", "BS Creditors < 1 Year", "BS Creditors > 1 Year", "BS Capital & Reserves", "NOT in any account"] },
  { key: "NONE", label: "Trick Items", categories: ["NOT in any account"] },
];

const CAT_COLORS: Record<ClassifyCategory, string> = {
  "Trading Account": "bg-emerald-600 hover:bg-emerald-700",
  "P&L (Administration)": "bg-blue-600 hover:bg-blue-700",
  "P&L (Selling & Distribution)": "bg-indigo-600 hover:bg-indigo-700",
  "BS Fixed Assets": "bg-amber-700 hover:bg-amber-800",
  "BS Current Assets": "bg-cyan-600 hover:bg-cyan-700",
  "BS Creditors < 1 Year": "bg-rose-600 hover:bg-rose-700",
  "BS Creditors > 1 Year": "bg-red-800 hover:bg-red-900",
  "BS Capital & Reserves": "bg-purple-600 hover:bg-purple-700",
  "Manufacturing Account": "bg-orange-600 hover:bg-orange-700",
  "NOT in any account": "bg-gray-600 hover:bg-gray-700",
};

const CAT_SHORT: Record<ClassifyCategory, string> = {
  "Trading Account": "Trading",
  "P&L (Administration)": "P&L Admin",
  "P&L (Selling & Distribution)": "P&L S&D",
  "BS Fixed Assets": "Fixed Assets",
  "BS Current Assets": "Current Assets",
  "BS Creditors < 1 Year": "CL < 1yr",
  "BS Creditors > 1 Year": "CL > 1yr",
  "BS Capital & Reserves": "Capital",
  "Manufacturing Account": "Mfg",
  "NOT in any account": "None",
};

function getDistractors(correct: ClassifyCategory, pool: ClassifyCategory[]): ClassifyCategory[] {
  const others = pool.filter(c => c !== correct);
  const shuffled = shuffleArray(others);
  return shuffled.slice(0, 3);
}

export default function ClassifyPage() {
  const [mode, setMode] = useState<"quiz" | "reference">("quiz");
  const [topic, setTopic] = useState<TopicKey>("ALL");
  const [items, setItems] = useState(() => shuffleArray(CLASSIFY_ITEMS));
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState<("correct" | "wrong" | null)[]>(() => new Array(CLASSIFY_ITEMS.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<ClassifyCategory | null>(null);
  const [bestScore, setBestScore] = useLocalStorage("lc-classify-best", 0);

  const topicTab = TOPIC_TABS.find(t => t.key === topic) || TOPIC_TABS[0];

  const filteredItems = useMemo(() => {
    if (topic === "ALL") return items;
    return items.filter(item => topicTab.categories.includes(item.answer));
  }, [items, topic, topicTab]);

  const correctCount = answered.filter(a => a === "correct").length;
  const wrongCount = answered.filter(a => a === "wrong").length;
  const totalAnswered = correctCount + wrongCount;

  const currentItem = filteredItems[current];
  const choices = useMemo(() => {
    if (!currentItem) return [];
    const distractors = getDistractors(currentItem.answer, topicTab.categories);
    return shuffleArray([currentItem.answer, ...distractors]);
  }, [currentItem, topicTab]);

  const answer = (choice: ClassifyCategory) => {
    if (!currentItem) return;
    const isCorrect = choice === currentItem.answer;
    setLastAnswer(currentItem.answer);
    const globalIdx = items.indexOf(currentItem);
    setAnswered(prev => {
      const next = [...prev];
      next[globalIdx] = isCorrect ? "correct" : "wrong";
      return next;
    });
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setLastAnswer(null);
      if (current < filteredItems.length - 1) {
        setCurrent(current + 1);
      }
    }, 1500);
  };

  const reset = () => {
    const score = Math.round((correctCount / Math.max(totalAnswered, 1)) * 100);
    if (score > bestScore) setBestScore(score);
    setItems(shuffleArray(CLASSIFY_ITEMS));
    setCurrent(0);
    setAnswered(new Array(CLASSIFY_ITEMS.length).fill(null));
    setShowResult(false);
    setLastAnswer(null);
  };

  const categories = useMemo(() => {
    const cats: Record<string, typeof CLASSIFY_ITEMS> = {};
    CLASSIFY_ITEMS.forEach(item => {
      const cat = item.answer;
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(item);
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
        <p className="text-xs text-muted-foreground mb-4">
          {CLASSIFY_ITEMS.length} items across {CLASSIFY_CATEGORIES.length} categories. Use this as a study reference.
        </p>
        {Object.entries(categories).map(([cat, catItems]) => (
          <div key={cat} className="mb-6">
            <h2 className="font-display text-sm font-bold mb-2 pb-1 border-b border-border flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${CAT_COLORS[cat as ClassifyCategory]?.split(" ")[0] || "bg-muted"}`} />
              {cat}
              <Badge variant="outline" className="text-[9px] ml-auto">{catItems.length}</Badge>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {catItems.map(item => (
                <div key={item.item} className="text-xs p-2 rounded border bg-muted/50 border-border">
                  <span className="font-medium">{item.item}</span>
                  {item.hint && <p className="text-[10px] text-muted-foreground mt-0.5 italic">{item.hint}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const result = currentItem ? answered[items.indexOf(currentItem)] : null;

  return (
    <div className="max-w-[700px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Where Does This Go?</h1>
          <p className="text-xs text-muted-foreground">{filteredItems.length} items · 4 choices per question</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => setMode("reference")}>Reference</Button>
      </div>

      {/* Topic filter tabs */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {TOPIC_TABS.map(t => (
          <Button
            key={t.key}
            variant={topic === t.key ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-3"
            onClick={() => { setTopic(t.key); setCurrent(0); }}
          >
            {t.label}
          </Button>
        ))}
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
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(current / Math.max(filteredItems.length, 1)) * 100}%` }} />
        </div>
        <span className="text-xs font-mono text-muted-foreground">{current + 1}/{filteredItems.length}</span>
      </div>

      {/* Question card */}
      {currentItem && (
        <>
          <Card className={`mb-6 border-2 transition-colors ${showResult && result === "correct" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : showResult && result === "wrong" ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-border"}`}>
            <CardContent className="p-8 text-center">
              <h2 className="font-display text-xl font-bold mb-2">{currentItem.item}</h2>
              {currentItem.hint && <p className="text-xs text-muted-foreground italic">{currentItem.hint}</p>}
              {showResult && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {result === "correct" ? <Check className="h-5 w-5 text-green-600" /> : <X className="h-5 w-5 text-red-500" />}
                  <span className={`text-sm font-bold ${result === "correct" ? "text-green-600" : "text-red-500"}`}>
                    {result === "correct" ? "Correct!" : `Wrong — it's ${lastAnswer}`}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 4-choice buttons */}
          {!showResult && (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {choices.map(cat => (
                <Button
                  key={cat}
                  className={`h-12 text-xs font-bold text-white ${CAT_COLORS[cat]}`}
                  onClick={() => answer(cat)}
                >
                  {CAT_SHORT[cat]}
                </Button>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5" /> Restart & Shuffle
        </Button>
      </div>
    </div>
  );
}
