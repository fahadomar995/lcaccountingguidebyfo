import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESULTS, SEC3_Q8_RESULTS, SEC3_Q9_RESULTS, INTERP_PARTB, tier, getAppearances, avgGap, markovPRaw, SEC2_HISTORY, ALL_YEARS, CURRENT_YEAR, TOPICS, buildResults, buildResultsForHistory, SEC3_Q8_HISTORY, SEC3_Q8_YEARS, SEC3_Q8_SUBTOPICS, SEC3_Q9_HISTORY, SEC3_Q9_YEARS, SEC3_Q9_SUBTOPICS } from "@/data/predictions";
import type { PredictionResult } from "@/data/predictions";
import { PREDICTION_PAGES } from "@/data/navigation";
import { useMemo, useState } from "react";

function PredNav() {
  const loc = useLocation();
  return (
    <div className="flex gap-1.5 flex-wrap mb-6">
      {PREDICTION_PAGES.map(p => (
        <Link key={p.url} to={p.url}>
          <Button variant={loc.pathname === p.url ? "default" : "outline"} size="sm" className="text-xs h-7 px-3">{p.title}</Button>
        </Link>
      ))}
    </div>
  );
}

function ResultsTable({ results, title }: { results: PredictionResult[]; title: string }) {
  return (
    <div className="mb-8">
      <h3 className="font-display text-sm font-bold mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-2 border-b border-border">Topic</th>
              <th className="p-2 border-b border-border text-right">Prob</th>
              <th className="p-2 border-b border-border text-right">Tier</th>
              <th className="p-2 border-b border-border text-right">Apps</th>
              <th className="p-2 border-b border-border text-right">Last</th>
              <th className="p-2 border-b border-border text-right">Gap</th>
              <th className="p-2 border-b border-border text-right">MRI</th>
              <th className="p-2 border-b border-border text-right">Markov</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => {
              const t = tier(r.prob);
              return (
                <tr key={r.key} className="border-b border-border hover:bg-muted/50">
                  <td className="p-2 font-medium">{r.key}{r.wildcard ? " *" : ""}</td>
                  <td className="p-2 text-right font-mono font-bold" style={{ color: t.color }}>{r.prob}%</td>
                  <td className="p-2 text-right"><Badge variant="outline" className="text-[8px]" style={{ color: t.color, borderColor: t.color + "44" }}>{t.label}</Badge></td>
                  <td className="p-2 text-right font-mono">{r.appearances.length}</td>
                  <td className="p-2 text-right font-mono">{r.lastYear || "—"}</td>
                  <td className="p-2 text-right font-mono">{r.gap}</td>
                  <td className="p-2 text-right font-mono">{r.mri}</td>
                  <td className="p-2 text-right font-mono">{r.markovProb}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// OVERVIEW PAGE
export function PredOverview() {
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Prediction Engine</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Statistical forecasting tools powered by 25 years of verified HL exam data (2001–2025).</p>
      <PredNav />
      <ResultsTable results={RESULTS} title="Section 2 — Topic Probabilities for 2026" />
      <ResultsTable results={SEC3_Q8_RESULTS} title="Q8 Costing — Sub-topic Probabilities" />
      <ResultsTable results={SEC3_Q9_RESULTS} title="Q9 Budgeting — Sub-topic Probabilities" />
    </div>
  );
}

// CHARTS PAGE
export function PredCharts() {
  const maxProb = Math.max(...RESULTS.map(r => r.prob));
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Charts & Timeline</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Visual probability breakdown and historical timeline.</p>
      <PredNav />

      <h3 className="font-display text-sm font-bold mb-4">Section 2 Probability Distribution</h3>
      <div className="space-y-2 mb-8">
        {RESULTS.filter(r => !r.wildcard).map(r => {
          const t = tier(r.prob);
          return (
            <div key={r.key} className="flex items-center gap-3">
              <span className="text-xs font-medium w-40 shrink-0 truncate">{r.key}</span>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(r.prob / maxProb) * 100}%`, background: t.color }}>
                  <span className="text-[10px] font-mono font-bold text-white">{r.prob}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="font-display text-sm font-bold mb-4">Appearance Timeline (2001–2025)</h3>
      <div className="overflow-x-auto">
        <table className="text-[10px] border-collapse">
          <thead>
            <tr>
              <th className="p-1 text-left font-bold w-32">Topic</th>
              {ALL_YEARS.map(y => <th key={y} className="p-1 text-center w-6 font-mono">{String(y).slice(2)}</th>)}
            </tr>
          </thead>
          <tbody>
            {RESULTS.filter(r => !r.wildcard).map(r => (
              <tr key={r.key} className="border-b border-border">
                <td className="p-1 font-medium truncate">{r.key}</td>
                {ALL_YEARS.map(y => {
                  const appeared = SEC2_HISTORY[y]?.includes(r.key);
                  return <td key={y} className="p-1 text-center">{appeared ? <span className="inline-block w-3 h-3 rounded-full bg-primary" /> : <span className="text-muted-foreground">·</span>}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// INTERP PAGE
export function PredInterp() {
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Interpretation Part B</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Stakeholder rotation analysis for Q5 Part (b).</p>
      <PredNav />
      <div className="space-y-4">
        {INTERP_PARTB.map(s => (
          <Card key={s.type} className="border-l-4" style={{ borderLeftColor: s.color }}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-3xl font-bold" style={{ color: s.color }}>{s.prob}%</span>
                <div>
                  <h3 className="text-base font-bold">{s.type}</h3>
                  <p className="text-xs text-muted-foreground">Last: {s.lastYear} · Years: {s.years.join(", ")}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-3">{s.rationale}</p>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {s.ratios.map(r => <Badge key={r} variant="outline" className="text-[9px]">{r}</Badge>)}
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs">{s.studyTips}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Q1 PREDICTOR PAGE
export function PredQ1() {
  const Q1_PAIRS = [
    { pair: "Sole Trader + Manufacturing", prob: 48, reason: "Company streak breaks. Non-CO slot alternation pattern points to MFG next." },
    { pair: "Company + Manufacturing", prob: 35, reason: "Company streak holds. Manufacturing appears in either scenario." },
    { pair: "Company + Sole Trader", prob: 15, reason: "Requires MFG skip despite perfect alternation pattern." },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Q1 Predictor</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Account type pair analysis for Section 1, Question 1.</p>
      <PredNav />
      <div className="space-y-3">
        {Q1_PAIRS.map((p, i) => {
          const colors = ["hsl(var(--tier-vl))", "hsl(var(--tier-po))", "hsl(var(--tier-un))"];
          return (
            <Card key={p.pair} className="border-l-4" style={{ borderLeftColor: colors[i] }}>
              <CardContent className="p-5 flex items-start gap-4">
                <span className="font-mono text-2xl font-bold shrink-0" style={{ color: colors[i] }}>{p.prob}%</span>
                <div>
                  <h3 className="text-sm font-bold mb-1">{p.pair}</h3>
                  <p className="text-xs text-muted-foreground font-light">{p.reason}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// SECTION 3 PREDICTOR
export function PredSection3() {
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Section 3 Predictor</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Sub-topic predictions for Q8 (Costing) and Q9 (Budgeting).</p>
      <PredNav />
      <ResultsTable results={SEC3_Q8_RESULTS} title="Q8 Costing — Sub-topic Probabilities" />
      <ResultsTable results={SEC3_Q9_RESULTS} title="Q9 Budgeting — Sub-topic Probabilities" />

      <h3 className="font-display text-sm font-bold mb-3">Q8 History (2019–2025)</h3>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-muted">
            <th className="text-left p-2 border-b border-border">Year</th>
            <th className="text-left p-2 border-b border-border">Sub-topics</th>
          </tr></thead>
          <tbody>
            {Object.entries(SEC3_Q8_HISTORY).sort(([a],[b]) => Number(b)-Number(a)).map(([y, topics]) => (
              <tr key={y} className="border-b border-border"><td className="p-2 font-mono font-bold">{y}</td><td className="p-2">{topics.join(", ")}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-display text-sm font-bold mb-3">Q9 History (2020–2025)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead><tr className="bg-muted">
            <th className="text-left p-2 border-b border-border">Year</th>
            <th className="text-left p-2 border-b border-border">Sub-topics</th>
          </tr></thead>
          <tbody>
            {Object.entries(SEC3_Q9_HISTORY).sort(([a],[b]) => Number(b)-Number(a)).map(([y, topics]) => (
              <tr key={y} className="border-b border-border"><td className="p-2 font-mono font-bold">{y}</td><td className="p-2">{topics.join(", ")}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// MONTE CARLO & SCENARIOS
export function PredSimulate() {
  const [runs, setRuns] = useState(1000);
  const [simResults, setSimResults] = useState<Record<string, number> | null>(null);

  const runMonteCarlo = () => {
    const topics = RESULTS.filter(r => !r.wildcard);
    const probs = topics.map(t => t.prob / 100);
    const total = probs.reduce((s, p) => s + p, 0);
    const normalized = probs.map(p => p / total);
    
    const counts: Record<string, number> = {};
    topics.forEach(t => { counts[t.key] = 0; });
    
    for (let i = 0; i < runs; i++) {
      // Pick 2 topics weighted by probability
      const picked: string[] = [];
      for (let p = 0; p < 2; p++) {
        let r = Math.random();
        let cumulative = 0;
        for (let j = 0; j < topics.length; j++) {
          cumulative += normalized[j];
          if (r <= cumulative && !picked.includes(topics[j].key)) {
            picked.push(topics[j].key);
            break;
          }
        }
      }
      picked.forEach(k => { if (counts[k] !== undefined) counts[k]++; });
    }
    
    setSimResults(counts);
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Monte Carlo & Scenarios</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Run simulations to see how often each topic appears across thousands of random scenarios.</p>
      <PredNav />

      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Simulations</label>
              <select value={runs} onChange={e => setRuns(Number(e.target.value))} className="border border-border rounded px-3 py-1.5 text-sm bg-card">
                <option value={100}>100</option>
                <option value={1000}>1,000</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000</option>
              </select>
            </div>
            <Button onClick={runMonteCarlo} className="mt-4">Run Simulation</Button>
          </div>
        </CardContent>
      </Card>

      {simResults && (
        <div className="space-y-2">
          <h3 className="font-display text-sm font-bold mb-3">Results ({runs.toLocaleString()} simulations)</h3>
          {Object.entries(simResults)
            .sort(([,a], [,b]) => b - a)
            .map(([key, count]) => {
              const pct = (count / runs) * 100;
              const t = tier(pct > 50 ? 85 : pct > 30 ? 50 : pct > 15 ? 30 : 10);
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-40 shrink-0">{key}</span>
                  <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                    <div className="h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${pct}%`, background: t.color, minWidth: 30 }}>
                      <span className="text-[9px] font-mono font-bold text-white">{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">{count}×</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// MODEL PARAMETERS
export function PredModel() {
  const [params, setParams] = useState({ wMarkov: 0.35, wFreq: 0.25, wGap: 0.25, wRecency: 0.15, lambda: 0.10 });
  const customResults = useMemo(() => buildResults(params), [params]);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Model Parameters</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Adjust the weighting of each algorithm component and see how predictions change.</p>
      <PredNav />

      <Card className="mb-6 border-border">
        <CardContent className="p-5 space-y-4">
          {[
            { key: "wMarkov", label: "Markov Chain Weight", desc: "2nd-order transition probabilities" },
            { key: "wFreq", label: "Weighted Frequency", desc: "Exponential decay frequency scoring" },
            { key: "wGap", label: "Gap Score Weight", desc: "Mean recurrence interval gap analysis" },
            { key: "wRecency", label: "Recency Weight", desc: "Sigmoid-based recency scoring" },
          ].map(({ key, label, desc }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">{label}</span>
                <span className="font-mono text-primary">{(params[key as keyof typeof params] * 100).toFixed(0)}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mb-1">{desc}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={params[key as keyof typeof params] * 100}
                onChange={e => setParams(prev => ({ ...prev, [key]: Number(e.target.value) / 100 }))}
                className="w-full accent-primary"
              />
            </div>
          ))}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold">Decay Rate (λ)</span>
              <span className="font-mono text-primary">{params.lambda.toFixed(2)}</span>
            </div>
            <input type="range" min="1" max="30" value={params.lambda * 100} onChange={e => setParams(prev => ({ ...prev, lambda: Number(e.target.value) / 100 }))} className="w-full accent-primary" />
          </div>
        </CardContent>
      </Card>

      <ResultsTable results={customResults} title="Custom-Weighted Predictions" />
    </div>
  );
}

// STATS & BACKTESTING
export function PredStats() {
  const backtestResults = useMemo(() => {
    const testYears = ALL_YEARS.filter(y => y >= 2012);
    let correct = 0, total = 0;
    const details: { year: number; predicted: string[]; actual: string[]; hit: boolean }[] = [];
    
    for (const testYear of testYears) {
      const trainingYears = ALL_YEARS.filter(y => y < testYear);
      const trainingHistory: Record<number, string[]> = {};
      trainingYears.forEach(y => { trainingHistory[y] = SEC2_HISTORY[y]; });
      
      const results = buildResultsForHistory(trainingHistory, trainingYears, TOPICS);
      const top2 = results.filter(r => !r.wildcard).slice(0, 2).map(r => r.key);
      const actual = SEC2_HISTORY[testYear] || [];
      const hit = top2.some(p => actual.includes(p));
      
      if (hit) correct++;
      total++;
      details.push({ year: testYear, predicted: top2, actual, hit });
    }
    
    return { correct, total, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0, details };
  }, []);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Stats & Backtesting</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Model validation: how well do predictions match actual exam outcomes?</p>
      <PredNav />

      <Card className="mb-6 border-border bg-sage-bg">
        <CardContent className="p-5 text-center">
          <span className="font-mono text-4xl font-bold text-primary">{backtestResults.accuracy}%</span>
          <p className="text-xs text-muted-foreground mt-1">Backtesting accuracy ({backtestResults.correct}/{backtestResults.total} years, 2012–2025)</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">At least one of the top-2 predicted topics appeared in the actual exam</p>
        </CardContent>
      </Card>

      <h3 className="font-display text-sm font-bold mb-3">Year-by-Year Backtesting</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="text-left p-2 border-b border-border">Year</th>
              <th className="text-left p-2 border-b border-border">Predicted (Top 2)</th>
              <th className="text-left p-2 border-b border-border">Actual</th>
              <th className="p-2 border-b border-border text-center">Hit?</th>
            </tr>
          </thead>
          <tbody>
            {backtestResults.details.map(d => (
              <tr key={d.year} className={`border-b border-border ${d.hit ? "" : "bg-red-50 dark:bg-red-950/10"}`}>
                <td className="p-2 font-mono font-bold">{d.year}</td>
                <td className="p-2">{d.predicted.join(", ")}</td>
                <td className="p-2">{d.actual.join(", ")}</td>
                <td className="p-2 text-center">{d.hit ? <span className="text-green-600 font-bold">✓</span> : <span className="text-red-500 font-bold">✗</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card className="mt-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-3">Model Components</h3>
          <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <p><strong className="text-foreground">2nd-order Markov Chain (35%):</strong> Transition probabilities based on whether a topic appeared in the previous year. Captures the "never appears twice in a row" pattern.</p>
            <p><strong className="text-foreground">Exponential Decay Frequency (25%):</strong> Recent appearances weighted more heavily. λ=0.10 means each year of age reduces weight by ~10%.</p>
            <p><strong className="text-foreground">MRI Gap Scoring (25%):</strong> Mean Recurrence Interval analysis. Topics overdue relative to their historical cycle get higher scores.</p>
            <p><strong className="text-foreground">Sigmoid Recency (15%):</strong> Logistic function scoring based on gap ratio. Creates a smooth "overdue" signal rather than a binary flag.</p>
            <p><strong className="text-foreground">Streak Penalty:</strong> Consecutive appearances reduce future probability by 22% per year of streak (0.78^n).</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
