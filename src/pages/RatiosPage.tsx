import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RATIO_LEARN_DATA,
  FORMULA_QUIZ_DATA,
  SECTOR_NOTES,
  PART_C_QUESTIONS,
  STAKEHOLDER_GUIDES,
  Q5_PRACTICE_EXAMS,
} from "@/data/ratioData";
import { ChevronLeft, ChevronRight, Check, X, Eye, EyeOff } from "lucide-react";

const TABS = [
  { id: "learn", label: "Learn Ratios" },
  { id: "practice", label: "Q5 Practice" },
  { id: "quiz", label: "Formula Quiz" },
  { id: "report", label: "Part (b) Guide" },
  { id: "sectors", label: "Sector Notes" },
  { id: "partc", label: "Part (c)" },
] as const;

const CATS = ["All", "Profitability", "Investment", "Liquidity", "Gearing"] as const;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RatiosPage() {
  const [tab, setTab] = useState<string>("learn");

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">Q5 Ratios Hub</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
        Everything for the 100-mark Interpretation of Accounts question.
      </p>

      <Card className="mb-6 bg-sage-bg border-border">
        <CardContent className="p-4 flex items-center gap-3">
          <Badge className="bg-tier-vl text-white text-[10px] font-bold shrink-0">EVERY YEAR</Badge>
          <p className="text-sm font-medium">Q5 appears on every HL paper. It's free marks if you know the formulas.</p>
        </CardContent>
      </Card>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-6 border-b border-border pb-3">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "learn" && <LearnTab />}
      {tab === "practice" && <PracticeTab />}
      {tab === "quiz" && <QuizTab />}
      {tab === "report" && <ReportTab />}
      {tab === "sectors" && <SectorsTab />}
      {tab === "partc" && <PartCTab />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LEARN RATIOS TAB
   ═══════════════════════════════════════════════════════ */
function LearnTab() {
  const [cat, setCat] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [step, setStep] = useState(0);

  const filtered = useMemo(
    () => cat === "All" ? RATIO_LEARN_DATA : RATIO_LEARN_DATA.filter(r => r.cat === cat),
    [cat]
  );

  const catCounts = useMemo(() => {
    const c: Record<string, number> = { All: RATIO_LEARN_DATA.length };
    RATIO_LEARN_DATA.forEach(r => { c[r.cat] = (c[r.cat] || 0) + 1; });
    return c;
  }, []);

  const selected = filtered[selectedIdx] || filtered[0];

  return (
    <>
      <div className="flex gap-1.5 flex-wrap mb-4">
        {CATS.map(c => (
          <Button
            key={c}
            variant={cat === c ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-3"
            onClick={() => { setCat(c); setSelectedIdx(0); setStep(0); }}
          >
            {c} ({catCounts[c] || 0})
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
        {filtered.map((r, i) => (
          <button
            key={r.id}
            onClick={() => { setSelectedIdx(i); setStep(0); }}
            className={`text-left p-3 rounded-lg border transition-all ${
              i === selectedIdx
                ? "bg-primary/10 border-primary/30 ring-1 ring-primary/20"
                : "bg-card border-border hover:bg-muted/50"
            }`}
          >
            <p className="text-xs font-bold leading-tight">{r.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{r.cat} · 3 steps</p>
          </button>
        ))}
      </div>

      {selected && (
        <Card className="border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-[10px]">{selected.cat}</Badge>
              <h3 className="font-display text-base font-bold">{selected.name}</h3>
            </div>

            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
                {selected.steps[step]?.label}
              </p>
              <div
                className="text-sm leading-relaxed ratio-step-content"
                dangerouslySetInnerHTML={{ __html: selected.steps[step]?.html || "" }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="text-xs gap-1"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                <ChevronLeft className="h-3 w-3" /> Back
              </Button>
              <div className="text-xs text-muted-foreground">{step + 1}/3</div>
              <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${((step + 1) / 3) * 100}%` }}
                />
              </div>
              <Button
                size="sm"
                className="text-xs gap-1"
                disabled={step >= 2}
                onClick={() => setStep(step + 1)}
              >
                Next <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   Q5 PRACTICE TAB
   ═══════════════════════════════════════════════════════ */
function PracticeTab() {
  const [examIdx, setExamIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const exam = Q5_PRACTICE_EXAMS[examIdx];

  const resetExam = () => {
    setAnswers({});
    setChecked({});
    setRevealed(new Set());
  };

  const checkRatio = (idx: number) => {
    const key = `${examIdx}-${idx}`;
    const v = (answers[key] || "").trim().replace(/[€,%\s]/g, "").replace(/,/g, "");
    const n = parseFloat(v);
    if (isNaN(n)) return;
    const r = exam.ratios[idx];
    let ok = Math.abs(n - r.answer) <= r.tolerance;
    if (!ok && r.answer >= 10000 && Math.abs(n * 1000 - r.answer) <= r.tolerance) ok = true;
    setChecked(prev => ({ ...prev, [key]: ok }));
  };

  const yearLabel = (y: string) => {
    if (y === "2022D") return "2022 Deferred";
    if (y === "2025M") return "2025 Mock";
    if (y === "2023M") return "2023 Mock";
    return y;
  };

  const correctCount = exam.ratios.filter((_, i) => checked[`${examIdx}-${i}`] === true).length;
  const attemptCount = exam.ratios.filter((_, i) => checked[`${examIdx}-${i}`] !== undefined).length;

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Q5_PRACTICE_EXAMS.map((e, i) => (
          <button
            key={i}
            onClick={() => { setExamIdx(i); resetExam(); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              i === examIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {yearLabel(e.year)} — {e.company}
          </button>
        ))}
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-3 mb-4 bg-muted/50 rounded-lg p-3">
        <span className="text-xs font-medium">Score:</span>
        <span className="font-mono text-sm font-bold">{correctCount * 10}/{exam.ratios.length * 10}</span>
        <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: attemptCount > 0 ? `${(correctCount / exam.ratios.length) * 100}%` : "0%" }}
          />
        </div>
        <Button size="sm" variant="outline" className="text-xs" onClick={resetExam}>Reset</Button>
      </div>

      {/* Exam paper */}
      <Card className="border-border mb-6">
        <CardContent className="p-5">
          <div className="text-xs text-muted-foreground mb-1">{yearLabel(exam.year)} — Section 2 — Question 5</div>
          <h3 className="font-display text-base font-bold mb-3">Interpretation of Accounts</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">{exam.intro}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* P&L */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <caption className="text-left text-[10px] font-bold mb-1">{exam.pnlCaption}</caption>
                <tbody>
                  {exam.pnl.map((r, i) => (
                    <tr key={i} className={r.bold ? "border-t border-foreground/20" : ""}>
                      <td className={`py-0.5 pr-2 ${r.bold ? "font-bold" : ""}`}>{r.l}</td>
                      <td className="py-0.5 text-right font-mono w-20">{r.c1 || ""}</td>
                      <td className="py-0.5 text-right font-mono w-20">{r.c2 || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prior year ratios */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <caption className="text-left text-[10px] font-bold mb-1">{exam.priorCaption}</caption>
                <tbody>
                  {exam.prior.map((p, i) => (
                    <tr key={i}>
                      <td className="py-0.5 pr-2">{p[0]}</td>
                      <td className="py-0.5 text-right font-mono w-20">{p[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Balance Sheet */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border-collapse">
              <caption className="text-left text-[10px] font-bold mb-1">{exam.bsCaption}</caption>
              <tbody>
                {exam.bs.map((r, i) => (
                  <tr key={i} className={r.line ? "border-t border-foreground/20" : ""}>
                    <td className={`py-0.5 pr-2 ${r.hdr ? "font-bold" : ""} ${r.ind ? "pl-4" : ""}`}>{r.l}</td>
                    <td className="py-0.5 text-right font-mono w-20">{r.c1 || ""}</td>
                    <td className="py-0.5 text-right font-mono w-20">{r.c2 || ""}</td>
                    <td className="py-0.5 text-right font-mono w-20">{r.c3 || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground italic mb-2">{exam.marketNote}</p>
          <div className="text-xs text-muted-foreground space-y-1 border-t border-border pt-3">
            <p className="font-bold">(a) You are required to calculate the following:</p>
            <p className="text-[10px]">(where appropriate calculations should be made to <strong>two</strong> decimal places).</p>
            {exam.questions.map((q, i) => <p key={i} className="pl-2">{q}</p>)}
            <p className="font-mono text-[10px]">(50)</p>
            {exam.partB && <p className="italic mt-2">{exam.partB}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Ratio questions */}
      <div className="space-y-3">
        {exam.ratios.map((r, i) => {
          const key = `${examIdx}-${i}`;
          const isDone = checked[key] !== undefined;
          const isCorrect = checked[key] === true;
          const isRevealed = revealed.has(key);

          return (
            <Card key={i} className={`border-border ${isDone ? (isCorrect ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500") : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-mono">({i + 1})</span>
                  <span className="text-[10px] text-muted-foreground">10 marks</span>
                </div>
                <p className="text-sm mb-3">{r.q}</p>

                <div className="flex gap-2 items-center mb-2">
                  <span className="text-xs text-muted-foreground">Answer:</span>
                  <Input
                    className="h-8 text-sm w-48 font-mono"
                    placeholder="Type your answer..."
                    value={answers[key] || ""}
                    disabled={isDone}
                    onChange={e => setAnswers(prev => ({ ...prev, [key]: e.target.value }))}
                    onKeyDown={e => { if (e.key === "Enter") checkRatio(i); }}
                  />
                  <Button
                    size="sm"
                    className="text-xs"
                    disabled={isDone}
                    onClick={() => checkRatio(i)}
                  >
                    {isDone ? (isCorrect ? "✓ Correct" : "✗ Wrong") : "Check"}
                  </Button>
                </div>

                {isDone && !isRevealed && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs mt-1"
                    onClick={() => setRevealed(prev => new Set(prev).add(key))}
                  >
                    {isCorrect ? "View Working" : "Show Marking Scheme"}
                  </Button>
                )}

                {(isRevealed || (isDone && isCorrect)) && (
                  <div className="mt-3 p-3 bg-sage-bg rounded-lg space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">Marking Scheme Working</p>
                    {r.steps.map((s, si) => (
                      <p key={si} className="text-xs font-mono">{s}</p>
                    ))}
                    <p className="text-xs font-mono font-bold mt-2">Answer: {r.display}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FORMULA QUIZ TAB
   ═══════════════════════════════════════════════════════ */
function QuizTab() {
  const [formulas, setFormulas] = useState(() => shuffleArray(FORMULA_QUIZ_DATA));
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showAnswer && idx < formulas.length) inputRef.current?.focus();
  }, [idx, showAnswer]);

  const checkFormula = () => {
    const g = guess.trim().toLowerCase().replace(/\s+/g, " ");
    const f = formulas[idx];
    const target = f.formula.toLowerCase().replace(/\s+/g, " ").replace(/×/g, "x");
    const gNorm = g.replace(/×/g, "x").replace(/÷/g, "/");

    let isCorrect = gNorm === target || f.accept.some(a => gNorm === a.toLowerCase());
    // Fuzzy: check if core parts match
    if (!isCorrect) {
      const gWords = gNorm.replace(/[^a-z0-9/ ]/g, "").split(/\s+/);
      const tWords = target.replace(/[^a-z0-9/ ]/g, "").split(/\s+/);
      const matchCount = gWords.filter(w => tWords.includes(w)).length;
      if (matchCount >= tWords.length * 0.7) isCorrect = true;
    }

    setResult(isCorrect);
    setShowAnswer(true);
    if (isCorrect) setCorrect(c => c + 1);
    else setWrong(w => w + 1);
  };

  const next = () => {
    setGuess("");
    setShowAnswer(false);
    setResult(null);
    setIdx(idx + 1);
  };

  const restart = () => {
    setFormulas(shuffleArray(FORMULA_QUIZ_DATA));
    setIdx(0);
    setGuess("");
    setCorrect(0);
    setWrong(0);
    setShowAnswer(false);
    setResult(null);
  };

  if (idx >= formulas.length) {
    const pct = Math.round((correct / formulas.length) * 100);
    return (
      <Card className="max-w-[500px] mx-auto border-border">
        <CardContent className="p-8 text-center">
          <h2 className="font-display text-xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-3xl font-mono font-bold mb-1" style={{ color: pct >= 70 ? "hsl(142, 72%, 29%)" : pct >= 40 ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)" }}>{pct}%</p>
          <p className="text-sm text-muted-foreground mb-4">{correct} / {formulas.length} correct</p>
          <Button size="sm" onClick={restart}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const f = formulas[idx];

  return (
    <>
      <p className="text-xs text-muted-foreground mb-4">Type the formula, then check. Score: <span className="font-mono text-green-600">{correct}</span> / <span className="font-mono text-red-500">{wrong}</span> / {formulas.length}</p>

      <Card className="max-w-[600px] mx-auto border-border">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <Badge variant="outline" className="text-[10px] mb-2">{f.hint}</Badge>
            <h3 className="font-display text-lg font-bold">{f.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{idx + 1} / {formulas.length}</p>
          </div>

          {!showAnswer ? (
            <div className="space-y-3">
              <Input
                ref={inputRef}
                className="h-10 text-sm font-mono text-center"
                placeholder="Type the formula..."
                value={guess}
                onChange={e => setGuess(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") checkFormula(); }}
              />
              <div className="flex gap-2 justify-center">
                <Button size="sm" className="text-xs" onClick={checkFormula}>Check</Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => { setShowAnswer(true); setWrong(w => w + 1); }}>
                  Show Me
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                {result ? (
                  <><Check className="h-5 w-5 text-green-600" /><span className="text-sm font-bold text-green-600">Correct!</span></>
                ) : (
                  <><X className="h-5 w-5 text-red-500" /><span className="text-sm font-bold text-red-500">Not quite</span></>
                )}
              </div>
              <p className="font-mono text-sm font-bold text-primary">{f.formula}</p>
              {!result && guess && <p className="text-xs text-muted-foreground">You typed: "{guess}"</p>}
              <Button size="sm" className="text-xs" onClick={next}>
                {idx < formulas.length - 1 ? "Next →" : "See Results"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   PART (B) GUIDE TAB
   ═══════════════════════════════════════════════════════ */
function ReportTab() {
  const [shIdx, setShIdx] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const LIPGLOSS = [
    { letter: "L", title: "Liquidity", desc: "Acid test ratio, current ratio. Can the firm pay its short-term debts?" },
    { letter: "I", title: "Investments", desc: "Cost vs market value. Good/poor management of resources? Debenture redemption fund?" },
    { letter: "P", title: "Profitability", desc: "ROCE, EPS, ROSF, gross margin, net margin. Is the return adequate?" },
    { letter: "G", title: "Gearing", desc: "Gearing ratio, interest cover. How dependent on outside borrowing?" },
    { letter: "L", title: "Loan security", desc: "Fixed assets vs debt. Is the loan adequately secured? (Bank Manager / Debenture Holders)" },
    { letter: "O", title: "Other info", desc: "Dividends, dividend cover, dividend yield, P/E ratio, DPS." },
    { letter: "S", title: "Sector", desc: "State the sector (1 mark). Growth/decline? Competition? Economic conditions? (3–4 sentences = full marks)" },
    { letter: "S", title: "Summary/Conclusion", desc: 'Clear Yes/No recommendation with reason. "I would / would not recommend..."' },
  ];

  const sh = STAKEHOLDER_GUIDES[shIdx];

  return (
    <>
      {/* 40 marks banner */}
      <div className="bg-sage-bg border border-border rounded-xl p-4 text-center mb-5">
        <p className="font-mono text-3xl font-bold text-primary">40 marks</p>
        <p className="text-xs text-muted-foreground">Part (b) — Report layout with relevant ratios, percentages, and analysis</p>
      </div>

      {/* Report layout */}
      <Card className="border-border mb-5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-sm font-bold">Report Layout (always include)</h3>
            <Badge variant="outline" className="text-[10px]">2 marks</Badge>
          </div>
          <div className="text-xs leading-relaxed bg-muted/30 rounded-lg p-3 font-mono">
            <strong>To:</strong> [Stakeholder]<br />
            <strong>From:</strong> [Your name], Financial Analyst<br />
            <strong>Date:</strong> [Date]<br />
            <strong>Re:</strong> Analysis of [Company] plc accounts for year ended 31/12/20XX<br /><br />
            <strong>Main Findings:</strong> [Analysis below]<br />
            <strong>Conclusion:</strong> [Recommendation]<br />
            <strong>Signed:</strong> [Name]
          </div>
        </CardContent>
      </Card>

      {/* LIPGLOSS */}
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">The LIPGLOSS Method</p>
        <div className="grid grid-cols-[auto_1fr] border border-border rounded-lg overflow-hidden">
          {LIPGLOSS.map((item, i) => (
            <div key={i} className="contents">
              <div className="flex items-center justify-center bg-primary text-primary-foreground font-mono text-lg font-bold px-4 py-2.5 border-b border-primary/20">{item.letter}</div>
              <div className="px-4 py-2.5 text-xs text-muted-foreground border-b border-border leading-relaxed" dangerouslySetInnerHTML={{ __html: `<strong>${item.title}</strong> — ${item.desc}` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder tabs */}
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Stakeholder-Specific Guides</p>
      <div className="flex gap-1.5 mb-4">
        {STAKEHOLDER_GUIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => { setShIdx(i); setExpandedSections(new Set()); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              i === shIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Stakeholder sections */}
      <div className="space-y-3">
        {sh.sections.map((sec, i) => (
          <Card key={i} className="border-border border-l-4 border-l-primary/40">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold">{sec.title}</h4>
                <Badge variant="outline" className="text-[10px]">{sec.marks} marks</Badge>
              </div>
              <div className="text-xs leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: sec.body }} />
              {sec.sample && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs mt-2 gap-1"
                    onClick={() => {
                      const next = new Set(expandedSections);
                      next.has(i) ? next.delete(i) : next.add(i);
                      setExpandedSections(next);
                    }}
                  >
                    {expandedSections.has(i) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {expandedSections.has(i) ? "Hide Sample" : "Show Sample Answer"}
                  </Button>
                  {expandedSections.has(i) && (
                    <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg text-xs leading-relaxed whitespace-pre-line border border-amber-200 dark:border-amber-800">
                      {sec.sample}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTOR NOTES TAB
   ═══════════════════════════════════════════════════════ */
function SectorsTab() {
  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-5">
        <p className="text-xs"><strong>Worth 4–5 marks every year.</strong> State the sector by name. Comment on short-term AND long-term prospects.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTOR_NOTES.map((s, i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4">
              <h4 className="text-sm font-bold mb-2">{s.name}</h4>
              <div className="text-xs leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: s.body }} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   PART (C) TAB
   ═══════════════════════════════════════════════════════ */
function PartCTab() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  return (
    <>
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-5">
        <p className="text-xs"><strong>Part (c) is worth 10 marks.</strong> Click any question to reveal the answer.</p>
      </div>
      <div className="space-y-3">
        {PART_C_QUESTIONS.map((q, i) => (
          <Card
            key={i}
            className="border-border cursor-pointer transition-all hover:shadow-sm"
            onClick={() => {
              const next = new Set(expanded);
              next.has(i) ? next.delete(i) : next.add(i);
              setExpanded(next);
            }}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-1">{q.q}</p>
              <p className="text-[10px] text-muted-foreground mb-2">{q.data}</p>
              {expanded.has(i) && (
                <div className="mt-3 p-3 bg-sage-bg rounded-lg text-xs leading-relaxed border-t border-border pt-3">
                  <p className="font-bold mb-2">Marking Scheme:</p>
                  <p className="whitespace-pre-line">{q.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
