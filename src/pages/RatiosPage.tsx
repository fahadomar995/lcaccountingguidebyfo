import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RATIO_THEORY, FORMULAS } from "@/data/studyContent";
import { INTERP_PARTB } from "@/data/predictions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const RATIO_FORMULAS = FORMULAS.filter(f => ["Profitability", "Liquidity", "Efficiency", "Gearing", "Investment"].includes(f.section));

export default function RatiosPage() {
  const [revealedQ, setRevealedQ] = useState<Set<number>>(new Set());

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
          <TabsTrigger value="formulas">19 Formulas</TabsTrigger>
          <TabsTrigger value="lipgloss">LIPGLOSS Report</TabsTrigger>
          <TabsTrigger value="theory">Theory Questions</TabsTrigger>
          <TabsTrigger value="stakeholders">Part B Stakeholders</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas">
          <p className="text-xs text-muted-foreground mb-4">Memorise all {RATIO_FORMULAS.length} ratio formulas. Group them by category to make learning easier.</p>
          {["Profitability", "Liquidity", "Efficiency", "Gearing", "Investment"].map(section => {
            const formulas = RATIO_FORMULAS.filter(f => f.section === section);
            return (
              <div key={section} className="mb-5">
                <h3 className="font-display text-sm font-bold mb-2 pb-1 border-b border-border">{section}</h3>
                <div className="space-y-2">
                  {formulas.map(f => (
                    <Card key={f.name} className="border-border">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-xs font-bold">{f.name}</p>
                          <p className="font-mono text-xs text-primary mt-0.5">{f.formula}</p>
                        </div>
                        {f.notes && <span className="text-[9px] text-muted-foreground bg-muted rounded px-2 py-0.5">{f.notes}</span>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>

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
