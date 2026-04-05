import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RATIO_THEORY, FORMULAS } from "@/data/studyContent";
import { INTERP_PARTB } from "@/data/predictions";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ChevronRight, Check, X } from "lucide-react";

const RATIO_FORMULAS = FORMULAS.filter(f => ["Profitability", "Liquidity", "Efficiency", "Gearing", "Investment"].includes(f.section));

const RATIO_CATEGORIES = ["All", "Profitability", "Liquidity", "Efficiency", "Gearing", "Investment"];

const RATIO_DEFINITIONS: Record<string, { definition: string; ideal?: string; interpretation: string }> = {
  "Return on Capital Employed (ROCE)": { definition: "Measures how efficiently a company uses its capital to generate profit.", ideal: "Higher = better (compare to interest rates)", interpretation: "If ROCE > interest rate on borrowings, borrowing is justified." },
  "Gross Profit Margin": { definition: "Percentage of each euro of sales retained after cost of goods sold.", ideal: "Depends on industry", interpretation: "Higher margin = better markup or lower cost of sales." },
  "Net Profit Margin": { definition: "Percentage of sales retained as profit after ALL expenses.", interpretation: "Compare to GP% — big gap suggests high expenses." },
  "Earnings Per Share (EPS)": { definition: "Profit attributable to each ordinary share.", interpretation: "Key metric for shareholders. Higher = more attractive." },
  "Current Ratio": { definition: "Measures short-term liquidity — ability to pay debts due within 1 year.", ideal: "2:1", interpretation: "Below 1 = potential liquidity crisis. Too high = idle assets." },
  "Acid Test Ratio": { definition: "Liquidity excluding stock (hardest asset to convert to cash).", ideal: "1:1", interpretation: "More conservative than current ratio. Critical for businesses with slow-moving stock." },
  "Stock Turnover": { definition: "How many times stock is sold and replaced in a year.", ideal: "Higher = better", interpretation: "Low turnover = obsolete/slow stock. Supermarkets: 20+, Jewellers: 2-3." },
  "Debtors Collection Period": { definition: "Average number of days debtors take to pay.", ideal: "30-60 days", interpretation: "Increasing = poor credit control. Compare to credit terms given." },
  "Gearing Ratio": { definition: "Proportion of capital employed financed by long-term debt.", ideal: "Below 50%", interpretation: "High gearing = risky (must pay interest regardless of profit)." },
  "Interest Cover": { definition: "How many times operating profit covers interest payments.", ideal: "4+ times", interpretation: "Below 2 = danger zone. Bank will check this before lending." },
  "Dividend Yield": { definition: "Return a shareholder gets from dividends relative to share price.", interpretation: "Income investors want high yield. Growth investors accept lower." },
  "P/E Ratio": { definition: "How much investors pay for each euro of earnings.", interpretation: "High P/E = investors expect growth. Low P/E = undervalued or declining." },
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RatiosPage() {
  const [revealedQ, setRevealedQ] = useState<Set<number>>(new Set());
  const [catFilter, setCatFilter] = useState("All");
  const [expandedRatio, setExpandedRatio] = useState<string | null>(null);

  // Formula quiz state
  const [quizFormulas, setQuizFormulas] = useState(() => shuffleArray(RATIO_FORMULAS));
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState({ got: 0, missed: 0 });

  const filteredFormulas = useMemo(() => {
    if (catFilter === "All") return RATIO_FORMULAS;
    return RATIO_FORMULAS.filter(f => f.section === catFilter);
  }, [catFilter]);

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { All: RATIO_FORMULAS.length };
    RATIO_FORMULAS.forEach(f => { counts[f.section] = (counts[f.section] || 0) + 1; });
    return counts;
  }, []);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Q5 Ratios Hub</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        Everything you need for Q5 Interpretation of Accounts. Formulas, theory questions, stakeholder analysis, and the LIPGLOSS report structure.
      </p>

      {/* Q5 guaranteed banner */}
      <Card className="mb-6 bg-sage-bg border-border">
        <CardContent className="p-4 flex items-center gap-3">
          <Badge className="bg-tier-vl text-white text-[10px] font-bold shrink-0">EVERY YEAR</Badge>
          <p className="text-sm font-medium">Q5 Interpretation of Accounts appears on every HL paper. It's free marks if you know the formulas.</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="formulas">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="formulas">Learn Ratios</TabsTrigger>
          <TabsTrigger value="quiz">Formula Quiz</TabsTrigger>
          <TabsTrigger value="lipgloss">LIPGLOSS Report</TabsTrigger>
          <TabsTrigger value="theory">Theory Qs</TabsTrigger>
          <TabsTrigger value="stakeholders">Part B</TabsTrigger>
        </TabsList>

        {/* LEARN RATIOS TAB */}
        <TabsContent value="formulas">
          {/* Category filter pills */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            {RATIO_CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant={catFilter === cat ? "default" : "outline"}
                size="sm"
                className="text-xs h-7 px-3"
                onClick={() => setCatFilter(cat)}
              >
                {cat} ({catCounts[cat] || 0})
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-4">{filteredFormulas.length} formulas. Click any ratio to expand the 3-step learning card.</p>

          <div className="space-y-3">
            {filteredFormulas.map(f => {
              const def = RATIO_DEFINITIONS[f.name];
              const isExpanded = expandedRatio === f.name;
              return (
                <Card
                  key={f.name}
                  className={`border-border cursor-pointer transition-all ${isExpanded ? "ring-2 ring-primary/30" : "hover:shadow-sm"}`}
                  onClick={() => setExpandedRatio(isExpanded ? null : f.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-bold">{f.name}</p>
                          <Badge variant="outline" className="text-[8px]">{f.section}</Badge>
                        </div>
                        <p className="font-mono text-xs text-primary">{f.formula}</p>
                      </div>
                      {f.notes && <span className="text-[9px] text-muted-foreground bg-muted rounded px-2 py-0.5 shrink-0">{f.notes}</span>}
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                    {isExpanded && def && (
                      <div className="mt-4 space-y-3 border-t border-border pt-4" onClick={e => e.stopPropagation()}>
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">Step 1 — Definition</p>
                          <p className="text-xs leading-relaxed">{def.definition}</p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">Step 2 — Formula</p>
                          <p className="font-mono text-sm font-bold text-primary">{f.formula}</p>
                          {def.ideal && <p className="text-[10px] text-muted-foreground mt-1">Ideal: {def.ideal}</p>}
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Step 3 — Interpretation</p>
                          <p className="text-xs leading-relaxed">{def.interpretation}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* FORMULA QUIZ TAB */}
        <TabsContent value="quiz">
          <p className="text-xs text-muted-foreground mb-4">Test yourself — see the ratio name, try to recall the formula, then reveal to check.</p>
          {quizIdx < quizFormulas.length ? (
            <div className="max-w-[500px] mx-auto">
              <Card className="mb-4 border-border">
                <CardContent className="p-6 text-center">
                  <Badge variant="outline" className="text-[10px] mb-3">{quizFormulas[quizIdx].section}</Badge>
                  <h3 className="font-display text-lg font-bold mb-4">{quizFormulas[quizIdx].name}</h3>
                  {!quizRevealed ? (
                    <Button size="sm" className="text-xs" onClick={() => setQuizRevealed(true)}>
                      <Eye className="h-3 w-3 mr-1" /> Reveal Formula
                    </Button>
                  ) : (
                    <>
                      <p className="font-mono text-sm font-bold text-primary mb-4">{quizFormulas[quizIdx].formula}</p>
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => {
                          setQuizScore(prev => ({ ...prev, got: prev.got + 1 }));
                          setQuizRevealed(false);
                          setQuizIdx(quizIdx + 1);
                        }}>
                          <Check className="h-3 w-3" /> Got It
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => {
                          setQuizScore(prev => ({ ...prev, missed: prev.missed + 1 }));
                          setQuizRevealed(false);
                          setQuizIdx(quizIdx + 1);
                        }}>
                          <X className="h-3 w-3" /> Missed
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <p className="text-xs text-center text-muted-foreground">
                {quizIdx + 1} / {quizFormulas.length} · Got: {quizScore.got} · Missed: {quizScore.missed}
              </p>
            </div>
          ) : (
            <Card className="max-w-[500px] mx-auto border-border">
              <CardContent className="p-8 text-center">
                <h2 className="font-display text-xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-3xl font-mono font-bold mb-1" style={{ color: quizScore.got > quizScore.missed ? "hsl(142, 72%, 29%)" : "hsl(0, 72%, 51%)" }}>
                  {Math.round((quizScore.got / quizFormulas.length) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground mb-4">{quizScore.got} / {quizFormulas.length} correct</p>
                <Button size="sm" onClick={() => { setQuizFormulas(shuffleArray(RATIO_FORMULAS)); setQuizIdx(0); setQuizRevealed(false); setQuizScore({ got: 0, missed: 0 }); }}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* LIPGLOSS TAB */}
        <TabsContent value="lipgloss">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-lg font-bold mb-4">LIPGLOSS — Report Writing Structure</h2>
              <p className="text-xs text-muted-foreground mb-4">Use this mnemonic to structure your Part (b) report. Each letter = one paragraph.</p>
              {[
                { letter: "L", title: "Liquidity", desc: "Current Ratio, Acid Test. Is the company liquid? Can it pay short-term debts?" },
                { letter: "I", title: "Investments", desc: "Cost vs market value. Good/poor management of investments." },
                { letter: "P", title: "Profitability", desc: "ROCE, GP%, NP%, EPS. Is the company profitable? Trends?" },
                { letter: "G", title: "Gearing", desc: "Gearing Ratio, Interest Cover, Debt/Equity. How dependent on borrowings?" },
                { letter: "L", title: "Loan Repayment", desc: "Can the company repay its loans? Debenture due date." },
                { letter: "O", title: "Other Information", desc: "Dividends, reserves, directors' report, audit report." },
                { letter: "S", title: "Sector", desc: "Industry prospects, competition, economic conditions." },
                { letter: "S", title: "Summary & Recommendation", desc: "Overall verdict. Would you invest/lend/hold debentures?" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{item.letter}</span>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* THEORY TAB */}
        <TabsContent value="theory">
          <p className="text-xs text-muted-foreground mb-4">{RATIO_THEORY.length} past exam theory questions on ratios and interpretation.</p>
          <div className="space-y-3">
            {RATIO_THEORY.map((q, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-1.5 mb-2 flex-wrap">
                    {q.tags.map(t => <Badge key={t} variant="outline" className="text-[8px]">{t}</Badge>)}
                  </div>
                  <p className="text-sm font-medium mb-2">{q.q}</p>
                  <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => setRevealedQ(prev => {
                    const next = new Set(prev);
                    next.has(i) ? next.delete(i) : next.add(i);
                    return next;
                  })}>
                    {revealedQ.has(i) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {revealedQ.has(i) ? "Hide" : "Show Answer"}
                  </Button>
                  {revealedQ.has(i) && (
                    <div className="mt-3 p-3 bg-sage-bg rounded-lg text-xs font-light leading-relaxed whitespace-pre-line">{q.a}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* STAKEHOLDERS TAB */}
        <TabsContent value="stakeholders">
          <p className="text-xs text-muted-foreground mb-4">Part (b) stakeholder analysis — who's most likely for 2026?</p>
          <div className="space-y-4">
            {INTERP_PARTB.map(s => (
              <Card key={s.type} className="border-l-4" style={{ borderLeftColor: s.color }}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.prob}%</span>
                    <div>
                      <h3 className="text-sm font-bold">{s.type}</h3>
                      <p className="text-[10px] text-muted-foreground">Last: {s.lastYear} · Appeared: {s.years.join(", ")}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed mb-2">{s.rationale}</p>
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    {s.ratios.map(r => <Badge key={r} variant="outline" className="text-[8px]">{r}</Badge>)}
                  </div>
                  <p className="text-xs bg-amber-50 dark:bg-amber-950/20 rounded p-2 border border-amber-200 dark:border-amber-800">{s.studyTips}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
