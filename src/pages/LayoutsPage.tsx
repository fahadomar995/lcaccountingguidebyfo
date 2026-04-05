import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_FORMATS } from "@/data/studyContent";
import { Check, X } from "lucide-react";

const TAB_LABELS: Record<string, string> = {
  "trading-st": "ST P&L",
  "trading-plc": "Published P&L",
  "bs-st": "ST Bal Sheet",
  "balance-sheet-plc": "Co. Bal Sheet",
  "manufacturing": "Mfg",
  "cash-flow-stmt": "Cash Flow",
  "published-bs": "Published BS",
  "club-ie": "Club I&E",
  "club-bs": "Club BS",
  "service-ie": "Service I&E",
  "mcs": "MCS",
  "cash-budget": "Cash Budget",
  "job-cost": "Job Cost",
};

export default function LayoutsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const active = LAYOUT_FORMATS[activeIdx];

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">Layout Practice</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
        Master every accounting format. Toggle between the filled reference and practice mode — where you type item names into each row from memory.
      </p>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {LAYOUT_FORMATS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => { setActiveIdx(i); setPracticeMode(false); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              i === activeIdx
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {TAB_LABELS[l.id] || l.title}
          </button>
        ))}
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-6">
        <button
          onClick={() => setPracticeMode(false)}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${!practiceMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
        >
          Reference
        </button>
        <button
          onClick={() => setPracticeMode(true)}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${practiceMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
        >
          Practice
        </button>
      </div>

      {practiceMode ? (
        <PracticeLayout layout={active} />
      ) : (
        <Card className="border-border overflow-hidden">
          {/* Title header - accounting style */}
          <div className="bg-muted/50 border-b border-border px-5 py-4 text-center">
            <h2 className="font-display text-base font-bold">{active.title}</h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">of __________ for the year ended 31/12/20__</p>
            <Badge variant="outline" className="text-[10px] mt-1">{active.section}</Badge>
          </div>

          {/* Tips panel */}
          {active.tips.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-border px-5 py-3">
              <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-0.5 list-disc list-inside">
                {active.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}

          {/* Accounting statement format */}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left p-2.5 border-b-2 border-foreground/20 font-bold text-xs w-[45%]"></th>
                    {active.columns.map((c, i) => (
                      <th key={i} className="p-2.5 border-b-2 border-foreground/20 text-right font-bold text-xs w-[100px]">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {active.rows.map((row, i) => {
                    const isEmpty = row.label.trim() === "";
                    const isSection = !row.indent && !row.isTotal && !row.isSubtotal && !isEmpty && row.values.every(v => v === "");
                    return (
                      <tr
                        key={i}
                        className={`
                          ${row.isTotal ? "border-t-2 border-b-[3px] border-double border-foreground/40 bg-muted/20" : ""}
                          ${row.isSubtotal ? "border-t border-foreground/20" : ""}
                          ${isSection ? "bg-muted/10" : ""}
                        `}
                      >
                        <td className={`
                          p-2 border-b border-border text-xs
                          ${row.indent ? "pl-8" : "pl-3"}
                          ${row.isTotal ? "font-bold" : ""}
                          ${row.isSubtotal ? "font-semibold" : ""}
                          ${isSection ? "font-bold text-foreground/80 italic" : ""}
                        `}>
                          {row.label}
                        </td>
                        {row.values.map((v, j) => (
                          <td
                            key={j}
                            className={`
                              p-2 border-b border-border text-right text-xs font-mono
                              ${row.isTotal ? "font-bold border-t-2 border-b-[3px] border-double border-foreground/40" : ""}
                              ${row.isSubtotal ? "font-semibold border-t border-foreground/20" : ""}
                              ${v.startsWith("(") ? "text-red-600 dark:text-red-400" : ""}
                            `}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PracticeLayout({ layout }: { layout: typeof LAYOUT_FORMATS[0] }) {
  const labelsToGuess = layout.rows.filter(r => r.label.trim() !== "").map(r => r.label);
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFinished = current >= labelsToGuess.length;
  const correctCount = results.filter(Boolean).length;

  useEffect(() => {
    if (!showResult && !isFinished) {
      inputRef.current?.focus();
    }
  }, [current, showResult, isFinished]);

  const checkAnswer = () => {
    const g = guess.trim().toLowerCase();
    const correct = labelsToGuess[current].toLowerCase();
    const isCorrect = g === correct || (g.length > 2 && correct.includes(g));
    setResults(prev => [...prev, isCorrect]);
    setShowResult(true);
  };

  const next = () => {
    setShowResult(false);
    setGuess("");
    setCurrent(current + 1);
  };

  const restart = () => {
    setCurrent(0);
    setGuess("");
    setShowResult(false);
    setResults([]);
  };

  if (isFinished) {
    const pct = Math.round((correctCount / labelsToGuess.length) * 100);
    return (
      <Card className="border-border">
        <CardContent className="p-8 text-center">
          <h2 className="font-display text-xl font-bold mb-2">Complete!</h2>
          <p className="text-3xl font-mono font-bold mb-1" style={{ color: pct >= 70 ? "hsl(142, 72%, 29%)" : pct >= 40 ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)" }}>{pct}%</p>
          <p className="text-sm text-muted-foreground mb-4">{correctCount} / {labelsToGuess.length} correct</p>
          <Button size="sm" onClick={restart}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const prevLabel = current > 0 ? labelsToGuess[current - 1] : null;

  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-base font-bold">{layout.title}</h2>
            <p className="text-xs text-muted-foreground">Row {current + 1} of {labelsToGuess.length}{prevLabel ? ` — after "${prevLabel}"` : ""}</p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">{correctCount}/{current}</Badge>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-5">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(current / labelsToGuess.length) * 100}%` }} />
        </div>

        {showResult ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {results[current] ? (
                <Check className="h-5 w-5 text-green-600 shrink-0" />
              ) : (
                <X className="h-5 w-5 text-red-500 shrink-0" />
              )}
              <span className={`text-sm font-bold ${results[current] ? "text-green-600" : "text-red-500"}`}>
                {results[current] ? "Correct!" : `Wrong — it's "${labelsToGuess[current]}"`}
              </span>
            </div>
            {!results[current] && (
              <p className="text-xs text-muted-foreground">You typed: "{guess || "(blank)"}"</p>
            )}
            <Button size="sm" className="text-xs" onClick={next}>
              {current < labelsToGuess.length - 1 ? "Next Row →" : "See Results"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              ref={inputRef}
              className="h-9 text-sm"
              placeholder="Type the line item name..."
              value={guess}
              onChange={e => setGuess(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") checkAnswer(); }}
            />
            <div className="flex gap-2">
              <Button size="sm" className="text-xs" onClick={checkAnswer}>Check</Button>
              <Button size="sm" variant="outline" className="text-xs" onClick={restart}>Restart</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
