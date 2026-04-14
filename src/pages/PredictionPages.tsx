import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RESULTS, SEC3_Q8_RESULTS, SEC3_Q9_RESULTS, INTERP_PARTB, tier, getAppearances, avgGap, markovPRaw,
  SEC2_HISTORY, ALL_YEARS, CURRENT_YEAR, TOPICS, buildResults, buildResultsForHistory,
  SEC3_Q8_HISTORY, SEC3_Q8_YEARS, SEC3_Q8_SUBTOPICS, SEC3_Q9_HISTORY, SEC3_Q9_YEARS, SEC3_Q9_SUBTOPICS,
  ACCOUNT_TYPE_TOPICS, isAccountType
} from "@/data/predictions";
import type { PredictionResult } from "@/data/predictions";
import {
  SECTION2_TOPICS, getPearson, PEARSON_CORRELATIONS, shannonEntropy, bayesianPosterior,
  runMonteCarlo, getScenarioProbs, getCombinationProbs, runFullBacktest, runBacktest,
  computeBrierScores, bootstrapModelUncertainty, hazardRate, KEY_FINDINGS, SEC3_CONFIRMED_DATA
} from "@/data/predictionHelpers";
import { PREDICTION_PAGES } from "@/data/navigation";
import { useMemo, useState, useCallback } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Play, Info } from "lucide-react";

/* ── Shared nav ── */
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

/* ═══════════════════════════════════════════════════════════════ */
/* OVERVIEW & DETAIL PAGE                                        */
/* ═══════════════════════════════════════════════════════════════ */
export function PredOverview() {
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Prediction Engine — Full Detail</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Click any topic row to expand stats, year history, and model breakdown.</p>
      <PredNav />

      {/* Guaranteed row */}
      <div className="border-l-4 rounded-lg mb-2 bg-card" style={{ borderLeftColor: "#4a8a52" }}>
        <div className="flex items-center gap-3 p-3">
          <span className="font-mono text-xs font-bold" style={{ color: "#4a8a52" }}>—</span>
          <span className="text-sm font-bold flex-1">Interpretation of Accounts (Q5)</span>
          <div className="w-24 bg-muted rounded-full h-4 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "100%", background: "#4a8a52" }} />
          </div>
          <span className="font-mono text-sm font-bold" style={{ color: "#4a8a52" }}>100%</span>
          <Badge variant="outline" className="text-[8px]" style={{ color: "#4a8a52", borderColor: "#4a8a5244" }}>GUARANTEED</Badge>
        </div>
      </div>

      {/* Topic detail rows */}
      {RESULTS.map((r, i) => {
        const t = tier(r.prob);
        const isOpen = openTopic === r.key;
        const app = r.appearances.sort((a, b) => a - b);
        const gaps: number[] = [];
        for (let j = 1; j < app.length; j++) gaps.push(app[j] - app[j - 1]);
        const ag = r.gap !== "N/A" ? parseFloat(r.gap) : 4;
        const overdue = !r.wildcard && r.yearsSinceLast && r.yearsSinceLast > ag
          ? `~${(r.yearsSinceLast - ag).toFixed(1)} yrs` : "Not yet";

        return (
          <div key={r.key} className="border-l-4 rounded-lg mb-2 bg-card" style={{ borderLeftColor: t.color }}>
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => setOpenTopic(isOpen ? null : r.key)}
            >
              <span className="font-mono text-xs font-bold w-6" style={{ color: t.color }}>#{i + 1}</span>
              <span className="text-sm font-bold flex-1">{r.key}{r.wildcard ? " *" : ""}</span>
              <div className="w-24 bg-muted rounded-full h-4 overflow-hidden hidden sm:block">
                <div className="h-full rounded-full" style={{ width: `${r.prob}%`, background: t.color }} />
              </div>
              <span className="font-mono text-sm font-bold" style={{ color: t.color }}>{r.prob}%</span>
              <Badge variant="outline" className="text-[8px] hidden sm:inline-flex" style={{ color: t.color, borderColor: t.color + "44" }}>{t.label.toUpperCase()}</Badge>
              {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>

            {isOpen && (
              <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Stats grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                  {[
                    ["Appearances", r.wildcard ? "0 (never)" : `${r.appearances.length}x`],
                    ["Last appeared", r.wildcard ? "Never" : `${r.lastYear}`],
                    ["Years since", r.wildcard ? "N/A" : `${r.yearsSinceLast} yr${r.yearsSinceLast !== 1 ? "s" : ""}`],
                    ["Avg gap", r.wildcard ? "N/A" : `${r.gap} yrs`],
                    ["Overdue by", r.wildcard ? "Massive" : overdue],
                    ["2026 prob", `${r.prob}%`],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-muted/50 rounded-lg p-2 text-center">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
                      <div className="text-sm font-mono font-bold mt-1" style={{ color: t.color }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Year chips */}
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Year history (2001–2025)</div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {ALL_YEARS.map(y => {
                    const hit = r.appearances.includes(y);
                    return (
                      <span key={y} className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${hit ? "text-white" : "text-muted-foreground bg-muted"}`}
                        style={hit ? { background: t.color, color: "#fff" } : {}}
                      >{String(y).slice(2)}</span>
                    );
                  })}
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">26 ?</span>
                </div>

                {/* Algorithm breakdown */}
                {!r.wildcard && (
                  <>
                    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Algorithm Breakdown</div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="bg-muted/50 rounded p-2 text-center">
                        <div className="text-[9px] text-muted-foreground font-bold">Markov P</div>
                        <div className="font-mono font-bold text-sm" style={{ color: t.color }}>{r.markovProb}%</div>
                      </div>
                      <div className="bg-muted/50 rounded p-2 text-center">
                        <div className="text-[9px] text-muted-foreground font-bold">Gap Ratio</div>
                        <div className="font-mono font-bold text-sm" style={{ color: t.color }}>
                          {r.yearsSinceLast ? (r.yearsSinceLast / ag).toFixed(2) : "N/A"}x
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded p-2 text-center">
                        <div className="text-[9px] text-muted-foreground font-bold">Recency</div>
                        <div className="font-mono font-bold text-sm" style={{ color: t.color }}>
                          {r.yearsSinceLast ? Math.round(1 / (1 + Math.exp(-6 * (r.yearsSinceLast / ag - 0.65))) * 100) : "N/A"}%
                        </div>
                      </div>
                      <div className="bg-muted/50 rounded p-2 text-center">
                        <div className="text-[9px] text-muted-foreground font-bold">Streak pen.</div>
                        <div className="font-mono font-bold text-sm" style={{ color: t.color }}>
                          {(() => {
                            const sorted = [...r.appearances].sort((a, b) => b - a);
                            let s = 0;
                            for (let k = 0; k < sorted.length; k++) {
                              if (sorted[k] === CURRENT_YEAR - 1 - s) s++; else break;
                            }
                            return Math.round(Math.pow(0.78, Math.max(0, s - 1)) * 100);
                          })()}%
                        </div>
                      </div>
                    </div>

                    {/* Pearson correlations */}
                    {(() => {
                      const corrs = RESULTS.filter(o => !o.wildcard && o.key !== r.key)
                        .map(o => ({ key: o.key, r: getPearson(r.key, o.key) }))
                        .filter(c => Math.abs(c.r) > 0.15)
                        .sort((a, b) => b.r - a.r);
                      if (corrs.length === 0) return null;
                      return (
                        <div className="mb-3">
                          <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Correlations with other topics</div>
                          <div className="flex flex-wrap gap-1">
                            {corrs.map(c => (
                              <span key={c.key} className="text-[10px] px-2 py-0.5 rounded border border-border bg-muted/50">
                                {c.key} <strong style={{ color: c.r > 0 ? "#4a8a52" : "#b04040" }}>{c.r > 0 ? "+" : ""}{c.r.toFixed(2)}</strong>
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}

                {r.note && <p className="text-xs text-muted-foreground italic">{r.note}</p>}
              </div>
            )}
          </div>
        );
      })}

      <p className="text-[10px] text-muted-foreground mt-4">Note: Statistical model only. Always study all topics.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* CHARTS & TIMELINE PAGE                                        */
/* ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════ */
/* INTERP PART B PAGE                                            */
/* ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════ */
/* Q1 PREDICTOR PAGE                                             */
/* ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════ */
/* SECTION 3 PREDICTOR                                           */
/* ═══════════════════════════════════════════════════════════════ */
export function PredSection3() {
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Section 3 Predictor</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Q8 (Costing) and Q9 (Budgeting) predictions for 2026. Students choose one question.</p>
      <PredNav />

      {/* Warning box */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6 text-xs">
        <div className="flex gap-2 items-start">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div><strong>Data verification notice:</strong> Section 3 historical data covers confirmed papers from 2019-2025 only. Treat these with more caution than the Section 2 predictions.</div>
        </div>
      </div>

      {/* How it works */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-2">How Section 3 Works</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Section 3 is worth 80 marks (20% of the paper). It offers two questions — Q8 and Q9. You answer one.
            <strong> Q8 is always a costing question. Q9 is always a budgeting question.</strong> This is a fixed rule, not a rotation.
            Sub-topics can combine within a single question, making predictions harder than Section 2.
          </p>
        </CardContent>
      </Card>

      <ResultsTable results={SEC3_Q8_RESULTS} title="Q8 Costing — Sub-topic Probabilities" />
      <ResultsTable results={SEC3_Q9_RESULTS} title="Q9 Budgeting — Sub-topic Probabilities" />

      {/* Confirmed data table */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-3">Confirmed Section 3 Data (2019-2025)</h3>
          <p className="text-[10px] text-muted-foreground mb-3">Verified from SEC papers and Institute of Education reviews.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border-b border-border">Year</th>
                  <th className="text-left p-2 border-b border-border">Q8 (Costing)</th>
                  <th className="text-left p-2 border-b border-border">Q9 (Budgeting)</th>
                  <th className="text-left p-2 border-b border-border">Source</th>
                </tr>
              </thead>
              <tbody>
                {SEC3_CONFIRMED_DATA.map(d => (
                  <tr key={d.year} className="border-b border-border">
                    <td className="p-2 font-mono font-bold">{d.year}</td>
                    <td className="p-2">{d.q8}</td>
                    <td className="p-2">{d.q9}</td>
                    <td className="p-2 text-muted-foreground">{d.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground">Statistical model only. Sub-topics can combine unpredictably. Always prepare all topics within your chosen track.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* MONTE CARLO & SCENARIOS                                       */
/* ═══════════════════════════════════════════════════════════════ */
export function PredSimulate() {
  const [runs, setRuns] = useState(10000);
  const [mcResults, setMcResults] = useState<ReturnType<typeof runMonteCarlo> | null>(null);
  const [mcRunning, setMcRunning] = useState(false);
  const [scenarioTopic, setScenarioTopic] = useState("");

  const startMC = useCallback(() => {
    setMcRunning(true);
    setTimeout(() => {
      const res = runMonteCarlo(runs);
      setMcResults(res);
      setMcRunning(false);
    }, 50);
  }, [runs]);

  const scenarioResults = useMemo(() => scenarioTopic ? getScenarioProbs(scenarioTopic) : [], [scenarioTopic]);
  const combos = useMemo(() => getCombinationProbs().slice(0, 20), []);
  const bayesian = useMemo(() => RESULTS.filter(r => !r.wildcard).map(r => ({ ...r, bay: bayesianPosterior(r.key) })), []);

  // Quantitative overview
  const entropy = useMemo(() => shannonEntropy(), []);
  const brierData = useMemo(() => computeBrierScores(), []);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Simulation Tools</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Monte Carlo simulation, scenario modelling, combination analysis — powered by the central prediction model.</p>
      <PredNav />

      {/* Account-type constraint notice */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6 text-xs flex gap-2 items-start">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div><strong>Account-type constraint active:</strong> Only one of Service Firm, Club Accounts, or Farm Accounts can appear in a single year. All simulations enforce this rule.</div>
      </div>

      {/* Quantitative overview */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-3">Model Confidence Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="font-mono text-xl font-bold" style={{ color: entropy < 0.6 ? "#4a8a52" : entropy < 0.8 ? "#b8862a" : "#b04040" }}>
                {Math.round(entropy * 100)}%
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Entropy ({entropy < 0.6 ? "Focused" : entropy < 0.8 ? "Moderate" : "Spread"})</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="font-mono text-xl font-bold" style={{ color: brierData.overall < 0.15 ? "#4a8a52" : brierData.overall < 0.25 ? "#b8862a" : "#b04040" }}>
                {brierData.overall}
              </div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Brier Score</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="font-mono text-xl font-bold text-primary">{RESULTS[0].prob}%</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Top: {RESULTS[0].key.split(" ")[0]}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="font-mono text-xl font-bold text-muted-foreground">{RESULTS.filter(r => !r.wildcard).length}</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Topics Modelled</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bayesian Credible Intervals */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Bayesian Credible Intervals</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Beta-Binomial posterior with uniform Beta(1,1) prior. Shows 90% credible interval for each topic's true base rate.</p>
          <div className="space-y-1.5">
            {bayesian.map(r => {
              const t = tier(r.prob);
              const lo = Math.round(r.bay.lower * 100);
              const hi = Math.round(r.bay.upper * 100);
              const mean = Math.round(r.bay.mean * 100);
              return (
                <div key={r.key} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-36 shrink-0 truncate">{r.key}</span>
                  <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden relative">
                    <div className="absolute h-full rounded-full opacity-30" style={{ left: `${lo}%`, width: `${hi - lo}%`, background: t.color }} />
                    <div className="absolute h-full w-0.5 rounded" style={{ left: `${mean}%`, background: t.color }} />
                  </div>
                  <span className="font-mono text-[10px] font-bold w-20 text-right" style={{ color: t.color }}>{lo}% - {hi}%</span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">Bar = 90% credible interval. Line = posterior mean. Wider bars = more uncertainty.</p>
        </CardContent>
      </Card>

      {/* Monte Carlo */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Monte Carlo Simulation</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Weighted random sampling with account-type constraint. Each run picks 2 topics for Q6/Q7.</p>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <select value={runs} onChange={e => setRuns(Number(e.target.value))} className="border border-border rounded px-3 py-1.5 text-sm bg-card">
              <option value={5000}>5,000</option>
              <option value={10000}>10,000</option>
              <option value={50000}>50,000</option>
            </select>
            <Button onClick={startMC} disabled={mcRunning} size="sm">
              <Play className="w-3 h-3 mr-1" />{mcRunning ? "Running..." : "Run Simulation"}
            </Button>
          </div>

          {mcResults && (
            <>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="font-mono text-lg font-bold text-primary">{mcResults.N.toLocaleString()}</div>
                  <div className="text-[9px] font-bold uppercase text-muted-foreground">Simulations</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="font-mono text-lg font-bold text-primary">{mcResults.topicFreqs[0]?.pct}%</div>
                  <div className="text-[9px] font-bold uppercase text-muted-foreground">Top: {mcResults.topicFreqs[0]?.key.split(" ")[0]}</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="font-mono text-lg font-bold text-primary">{mcResults.pairFreqs[0]?.pct}%</div>
                  <div className="text-[9px] font-bold uppercase text-muted-foreground">Top pair</div>
                </div>
              </div>

              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Topic appearance frequency</div>
              <div className="space-y-1 mb-4">
                {mcResults.topicFreqs.filter(f => f.pct > 0).map(f => {
                  const mr = RESULTS.find(r => r.key === f.key);
                  const t = tier(mr?.prob || 10);
                  return (
                    <div key={f.key} className="flex items-center gap-3">
                      <span className="text-xs font-medium w-36 shrink-0 truncate">{f.key}</span>
                      <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(f.pct / mcResults.topicFreqs[0].pct) * 100}%`, background: t.color }} />
                      </div>
                      <span className="font-mono text-[10px] font-bold w-20 text-right" style={{ color: t.color }}>{f.pct}% <span className="text-muted-foreground font-normal">+/-{f.ci}</span></span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Most common topic pairs</div>
              <div className="space-y-1">
                {mcResults.pairFreqs.slice(0, 10).map((p, i) => (
                  <div key={p.pair} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-muted-foreground w-6">#{i + 1}</span>
                    <span className="text-xs font-medium flex-1">{p.pair}</span>
                    <div className="w-24 bg-muted rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${(p.pct / mcResults.pairFreqs[0].pct) * 100}%` }} />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-primary w-10 text-right">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Scenario Simulator */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Scenario Simulator</h3>
          <p className="text-[10px] text-muted-foreground mb-4">If topic X appears in Q6, how do Q7 probabilities change? Driven by Pearson correlations.</p>
          <select value={scenarioTopic} onChange={e => setScenarioTopic(e.target.value)} className="border border-border rounded px-3 py-1.5 text-sm bg-card w-full max-w-xs mb-3">
            <option value="">— Select a topic —</option>
            {RESULTS.filter(r => !r.wildcard).map(r => (
              <option key={r.key} value={r.key}>{r.key} ({r.prob}%)</option>
            ))}
          </select>

          {scenarioTopic && isAccountType(scenarioTopic) && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-3 text-xs">
              <strong>Account-type constraint applied:</strong> {ACCOUNT_TYPE_TOPICS.filter(t => t !== scenarioTopic).join(" and ")} excluded from Q7 results.
            </div>
          )}

          {scenarioResults.length > 0 && (
            <div className="space-y-1">
              {scenarioResults.map((r, i) => {
                const t = tier(r.prob);
                const diff = r.prob - r.originalProb;
                return (
                  <div key={r.key} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-muted-foreground w-6">#{i + 1}</span>
                    <span className="text-xs font-medium flex-1">
                      {r.key}
                      {Math.abs(r.pearson) > 0.1 && (
                        <span className="text-[9px] ml-1 font-mono" style={{ color: r.pearson > 0 ? "#4a8a52" : "#b04040" }}>
                          r={r.pearson > 0 ? "+" : ""}{r.pearson.toFixed(2)}
                        </span>
                      )}
                    </span>
                    <div className="w-20 bg-muted rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.prob}%`, background: t.color }} />
                    </div>
                    <span className="font-mono text-[10px] font-bold w-10 text-right" style={{ color: t.color }}>{r.prob}%</span>
                    <span className="font-mono text-[10px] font-bold w-10 text-right" style={{ color: diff > 0 ? "#4a8a52" : diff < 0 ? "#b04040" : undefined }}>
                      {diff > 0 ? "+" : ""}{diff}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Combination Probability */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Combination Probability Engine</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Joint probability of topic pairs. Account-type constraint enforced. Pearson-adjusted.</p>
          <div className="space-y-1">
            {combos.map((c, i) => (
              <div key={`${c.a}-${c.b}`} className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-muted-foreground w-6">#{i + 1}</span>
                <span className="text-xs font-medium flex-1">
                  <strong>{c.a}</strong> <span className="text-muted-foreground">&</span> <strong>{c.b}</strong>
                  {Math.abs(c.pearson) > 0.1 && (
                    <span className="text-[9px] ml-1" style={{ color: c.pearson > 0 ? "#4a8a52" : "#b04040" }}>
                      (r={c.pearson > 0 ? "+" : ""}{c.pearson.toFixed(2)})
                    </span>
                  )}
                </span>
                <div className="w-20 bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(c.prob / combos[0].prob) * 100}%` }} />
                </div>
                <span className="font-mono text-[10px] font-bold text-primary w-10 text-right">{c.prob}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground">Statistical model only. Monte Carlo results vary between runs. Always study all topics.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* MODEL PARAMETERS                                              */
/* ═══════════════════════════════════════════════════════════════ */
export function PredModel() {
  const PRESETS = {
    ensemble: { wMarkov: 0.35, wFreq: 0.25, wGap: 0.25, wRecency: 0.15, lambda: 0.10 },
    markov: { wMarkov: 1.00, wFreq: 0.00, wGap: 0.00, wRecency: 0.00, lambda: 0.10 },
    freq: { wMarkov: 0.00, wFreq: 1.00, wGap: 0.00, wRecency: 0.00, lambda: 0.10 },
    gap: { wMarkov: 0.00, wFreq: 0.00, wGap: 1.00, wRecency: 0.00, lambda: 0.10 },
    recency: { wMarkov: 0.00, wFreq: 0.00, wGap: 0.00, wRecency: 1.00, lambda: 0.10 },
  };
  const [params, setParams] = useState(PRESETS.ensemble);
  const [activePreset, setActivePreset] = useState("ensemble");
  const customResults = useMemo(() => buildResults(params), [params]);

  // Sensitivity analysis
  const sensitivity = useMemo(() => {
    const base = buildResults();
    const paramKeys = ["wMarkov", "wFreq", "wGap", "wRecency"] as const;
    const labels: Record<string, string> = { wMarkov: "Markov weight", wFreq: "Freq. weight", wGap: "Gap weight", wRecency: "Recency weight" };
    return paramKeys.map(pk => {
      const testP = { ...PRESETS.ensemble, [pk]: Math.min(1.0, PRESETS.ensemble[pk] + 0.10) };
      const mod = buildResults(testP);
      let maxBoost = { key: "", delta: -999 };
      let maxReduce = { key: "", delta: 999 };
      for (const b of base) {
        const m = mod.find(x => x.key === b.key);
        if (m) {
          const d = m.prob - b.prob;
          if (d > maxBoost.delta) maxBoost = { key: b.key, delta: d };
          if (d < maxReduce.delta) maxReduce = { key: b.key, delta: d };
        }
      }
      const baseTop3 = base.slice(0, 3).map(r => r.key).join(",");
      const modTop3 = mod.slice(0, 3).map(r => r.key).join(",");
      return { param: labels[pk], boost: maxBoost, reduce: maxReduce, rankChanged: baseTop3 !== modTop3 };
    });
  }, []);

  // Model comparison
  const modelComparison = useMemo(() => {
    const models = [
      { name: "Ensemble (default)", params: PRESETS.ensemble, color: "hsl(var(--primary))" },
      { name: "Markov-only", params: PRESETS.markov, color: "#4a8a52" },
      { name: "Frequency-only", params: PRESETS.freq, color: "#b8862a" },
      { name: "Gap-only", params: PRESETS.gap, color: "#c06030" },
    ];
    return models.map(m => ({ ...m, results: buildResults(m.params).slice(0, 5) }));
  }, []);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Model Parameters</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Adjust algorithm weights with live results. Compare model variants.</p>
      <PredNav />

      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-3">Interactive Model Parameters</h3>
          <p className="text-[10px] text-muted-foreground mb-4">All weights must sum to 1.0. Adjust sliders — predictions update live.</p>

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {Object.entries(PRESETS).map(([name]) => (
              <Button key={name} variant={activePreset === name ? "default" : "outline"} size="sm" className="text-xs h-7 capitalize"
                onClick={() => { setParams(PRESETS[name as keyof typeof PRESETS]); setActivePreset(name); }}>
                {name}
              </Button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            {[
              { key: "wMarkov", label: "Markov Chain Weight" },
              { key: "wFreq", label: "Weighted Frequency" },
              { key: "wGap", label: "Gap Score Weight" },
              { key: "wRecency", label: "Recency Weight" },
            ].map(({ key, label }) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold">{label}</span>
                  <span className="font-mono text-primary">{(params[key as keyof typeof params] * 100).toFixed(0)}%</span>
                </div>
                <input type="range" min="0" max="100" value={params[key as keyof typeof params] * 100}
                  onChange={e => { setParams(prev => ({ ...prev, [key]: Number(e.target.value) / 100 })); setActivePreset(""); }}
                  className="w-full accent-primary" />
              </div>
            ))}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold">Decay Rate (λ)</span>
                <span className="font-mono text-primary">{params.lambda.toFixed(2)}</span>
              </div>
              <input type="range" min="1" max="30" value={params.lambda * 100}
                onChange={e => { setParams(prev => ({ ...prev, lambda: Number(e.target.value) / 100 })); setActivePreset(""); }}
                className="w-full accent-primary" />
            </div>
          </div>

          {/* Weight sum warning */}
          {Math.abs(params.wMarkov + params.wFreq + params.wGap + params.wRecency - 1.0) > 0.01 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-3 text-xs">
              Note: Weights don't sum to 1.0. Model auto-normalises but consider adjusting.
            </div>
          )}

          {/* Live results */}
          <div className="mt-4">
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Live Predictions</div>
            <div className="space-y-1">
              {customResults.map((r, i) => {
                const t = tier(r.prob);
                const defaultR = RESULTS.find(d => d.key === r.key);
                const delta = defaultR ? r.prob - defaultR.prob : 0;
                return (
                  <div key={r.key} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold w-6" style={{ color: t.color }}>#{i + 1}</span>
                    <span className="text-xs font-medium flex-1">{r.key}</span>
                    <div className="w-28 bg-muted rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.prob}%`, background: t.color }} />
                    </div>
                    <span className="font-mono text-[10px] font-bold w-10 text-right" style={{ color: t.color }}>{r.prob}%</span>
                    <span className="font-mono text-[10px] font-bold w-10 text-right" style={{ color: delta > 0 ? "#4a8a52" : delta < 0 ? "#b04040" : undefined }}>
                      {delta !== 0 ? (delta > 0 ? "+" : "") + delta : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity Analysis */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Sensitivity Analysis</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Effect of increasing each parameter by 0.10 on the top-3 predicted topics.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border-b border-border">Parameter +0.10</th>
                  <th className="text-left p-2 border-b border-border">Most boosted</th>
                  <th className="text-left p-2 border-b border-border">Most reduced</th>
                  <th className="p-2 border-b border-border text-center">Ranking effect</th>
                </tr>
              </thead>
              <tbody>
                {sensitivity.map(s => (
                  <tr key={s.param} className="border-b border-border">
                    <td className="p-2 font-bold">{s.param}</td>
                    <td className="p-2"><span style={{ color: "#4a8a52" }} className="font-semibold">{s.boost.key}</span> <span className="font-mono" style={{ color: "#4a8a52" }}>(+{s.boost.delta})</span></td>
                    <td className="p-2"><span style={{ color: "#b04040" }} className="font-semibold">{s.reduce.key}</span> <span className="font-mono" style={{ color: "#b04040" }}>({s.reduce.delta})</span></td>
                    <td className="p-2 text-center">
                      {s.rankChanged
                        ? <Badge variant="outline" className="text-[8px] border-amber-400 text-amber-600">Ranking changes</Badge>
                        : <Badge variant="outline" className="text-[8px] border-green-400 text-green-600">Stable</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Model Comparison */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-3">Model Comparison</h3>
          <p className="text-[10px] text-muted-foreground mb-4">How the top-5 rankings change across different modelling approaches.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {modelComparison.map(m => (
              <div key={m.name} className="bg-muted/50 border border-border rounded-lg p-3">
                <h4 className="text-xs font-bold mb-2" style={{ color: m.color }}>{m.name}</h4>
                {m.results.map((r, i) => {
                  const t = tier(r.prob);
                  return (
                    <div key={r.key} className="flex justify-between text-[10px] py-0.5 border-b border-border last:border-0">
                      <span className="font-semibold">#{i + 1} {r.key.split(" ").slice(0, 2).join(" ")}</span>
                      <span className="font-mono font-bold" style={{ color: t.color }}>{r.prob}%</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm box */}
      <Card className="border-border bg-slate-900 text-white">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-2">How the Algorithm Works</h3>
          <div className="text-xs space-y-1 leading-relaxed opacity-90">
            <p><strong className="text-blue-300">Step 1 — Weighted Frequency:</strong> Each appearance weighted by e^(-λ×(2026-year)). Higher λ = faster decay.</p>
            <p><strong className="text-blue-300">Step 2 — Markov Chain:</strong> P(appear 2026 | state in 2025). Uses observed 2001-2025 transition rates.</p>
            <p><strong className="text-blue-300">Step 3 — Gap Score:</strong> yearsSinceLast / avgGap, capped at 2.5×.</p>
            <p><strong className="text-blue-300">Step 4 — Sigmoid Recency:</strong> 1/(1+e^(-6×(gapRatio-0.65))). Smooth S-curve.</p>
            <p><strong className="text-blue-300">Step 5 — Streak Penalty:</strong> 0.78^(consecutive_years-1).</p>
            <p><strong className="text-blue-300">Final Score:</strong> (wFreq×wf + MarkovP×wm + GapScore×wg + Recency×wr) × StreakPenalty, normalised to 8-85%.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* STATS & BACKTESTING                                           */
/* ═══════════════════════════════════════════════════════════════ */
export function PredStats() {
  const backtestData = useMemo(() => runFullBacktest(), []);
  const totalHits = backtestData.reduce((s, b) => s + b.hits, 0);
  const totalPoss = backtestData.length * 2;
  const hitRate = Math.round((totalHits / totalPoss) * 100);

  const brierData = useMemo(() => computeBrierScores(), []);
  const bootstrap = useMemo(() => bootstrapModelUncertainty(200), []);
  const hazardData = useMemo(() => RESULTS.filter(r => !r.wildcard).map(r => ({ ...r, hz: hazardRate(r.key) })), []);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Statistics & Model Transparency</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Full statistical breakdown — algorithm, descriptive stats, correlations, gap analysis, and backtesting.</p>
      <PredNav />

      {/* Key findings */}
      <Card className="mb-6 border-l-4 border-l-red-400">
        <CardContent className="p-5">
          <h4 className="text-xs font-bold text-red-500 mb-2">Key Findings — Corrected 2001-2025 HL Data</h4>
          <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
            {KEY_FINDINGS.map(f => (
              <p key={f.id}><strong className="text-foreground">Finding {f.id}:</strong> {f.text}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm box */}
      <Card className="mb-6 border-border bg-slate-900 text-white">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-2">Algorithm: How Predictions Are Generated</h3>
          <div className="text-xs space-y-1 leading-relaxed opacity-90">
            <p><strong className="text-blue-300">Step 1 — Weighted Frequency (25%):</strong> Each appearance weighted by e^(-0.1×(2026-year)). Recent appearances count ~10× more than those 10 years ago.</p>
            <p><strong className="text-blue-300">Step 2 — Markov Chain (35%):</strong> P(appear 2026 | state in 2025). Appeared in 2025 → historical P = 0.00. Absent → uses observed transition rate from 25-year matrix.</p>
            <p><strong className="text-blue-300">Step 3 — Gap Score (25%):</strong> yearsSinceLast / avgGap, capped at 2.5×. A topic 2× overdue scores far higher.</p>
            <p><strong className="text-blue-300">Step 4 — Sigmoid Recency (15%):</strong> 1/(1+e^(-6×(gapRatio-0.65))). Smooth S-curve.</p>
            <p><strong className="text-blue-300">Step 5 — Streak Penalty:</strong> 0.78^(consecutive_years-1).</p>
            <p><strong className="text-blue-300">Pearson r:</strong> Computed on the 25-year binary appearance matrix. Used to flag unlikely Q6+Q7 combinations.</p>
          </div>
        </CardContent>
      </Card>

      {/* Descriptive stats table */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Descriptive Statistics — 2001-2025</h3>
          <p className="text-[10px] text-muted-foreground mb-4">All values computed live from the verified 25-year dataset. Gap Ratio &gt; 1.0 = overdue.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border-b border-border">Topic</th>
                  <th className="p-2 border-b border-border text-center">Freq</th>
                  <th className="p-2 border-b border-border text-center">MRI</th>
                  <th className="p-2 border-b border-border text-center">Avg Gap</th>
                  <th className="p-2 border-b border-border text-center">Yrs Since</th>
                  <th className="p-2 border-b border-border text-center">Gap Ratio</th>
                  <th className="p-2 border-b border-border text-center">In 2025?</th>
                  <th className="p-2 border-b border-border text-center">Markov P</th>
                  <th className="p-2 border-b border-border text-center">2026 P</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.filter(r => !r.wildcard).map(r => {
                  const ag = r.gap !== "N/A" ? parseFloat(r.gap) : 4;
                  const gr = r.yearsSinceLast ? (r.yearsSinceLast / ag).toFixed(2) : "N/A";
                  const grNum = parseFloat(gr);
                  const in2025 = r.lastYear === 2025;
                  const t = tier(r.prob);
                  return (
                    <tr key={r.key} className="border-b border-border hover:bg-muted/30">
                      <td className="p-2 font-bold">{r.key}</td>
                      <td className="p-2 text-center font-mono">{r.appearances.length}</td>
                      <td className="p-2 text-center font-mono">{r.mri}</td>
                      <td className="p-2 text-center font-mono">{r.gap}</td>
                      <td className="p-2 text-center font-mono">{r.yearsSinceLast || "N/A"}</td>
                      <td className="p-2 text-center font-mono font-bold" style={{ color: isNaN(grNum) ? undefined : grNum > 1 ? "#d97706" : undefined }}>{gr}</td>
                      <td className="p-2 text-center font-bold" style={{ color: in2025 ? "#dc2626" : "#16a34a" }}>{in2025 ? "YES" : "NO"}</td>
                      <td className="p-2 text-center font-mono font-bold" style={{ color: r.markovProb === 0 ? "#dc2626" : r.markovProb > 40 ? "#16a34a" : "#d97706" }}>{r.markovProb}%</td>
                      <td className="p-2 text-center font-mono font-bold" style={{ color: t.color }}>{r.prob}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pearson Correlation Table */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Pearson Correlation Table (|r| &gt; 0.20)</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Negative r = topics rarely appear together. Use to eliminate unlikely Q6+Q7 pairs.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border-b border-border">Topic A</th>
                  <th className="text-left p-2 border-b border-border">Topic B</th>
                  <th className="p-2 border-b border-border text-center">r</th>
                  <th className="text-left p-2 border-b border-border">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {PEARSON_CORRELATIONS.map((c, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-2 font-bold">{c.a}</td>
                    <td className="p-2 font-bold">{c.b}</td>
                    <td className="p-2 text-center font-mono text-sm font-bold" style={{ color: c.r > 0.3 ? "#16a34a" : c.r < -0.3 ? "#dc2626" : "#d97706" }}>
                      {c.r.toFixed(3)}
                    </td>
                    <td className="p-2 text-muted-foreground">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Backtesting */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Backtesting — Model vs Actual (2018-2025)</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Simulates running the model at the start of each year using only prior data. Shows whether actual topics appeared in the model's top-3.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-2 border-b border-border">Year</th>
                  <th className="text-left p-2 border-b border-border">Top 3 Predicted</th>
                  <th className="text-left p-2 border-b border-border">Actual Topics</th>
                  <th className="p-2 border-b border-border text-center">Hits</th>
                </tr>
              </thead>
              <tbody>
                {backtestData.map(b => (
                  <tr key={b.year} className="border-b border-border">
                    <td className="p-2 font-mono font-bold">{b.year}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {b.top3.map((t, i) => (
                          <Badge key={t} variant="outline" className="text-[8px]">#{i + 1} {t}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1">
                        {b.actual.map(t => {
                          const hit = b.top3.includes(t);
                          return (
                            <Badge key={t} variant={hit ? "default" : "destructive"} className="text-[8px]">
                              {hit ? "v " : ""}{t}
                            </Badge>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <Badge variant={b.hits === 2 ? "default" : b.hits === 1 ? "outline" : "destructive"} className="text-[8px]">
                        {b.hits}/2
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-3 text-xs font-semibold">
            Backtest result (2018-2025): <span className="font-mono">{totalHits}/{totalPoss}</span> actual topics appeared in model's top-3 (<span className="font-mono">{hitRate}%</span> hit rate).
          </div>
        </CardContent>
      </Card>

      {/* Brier Score */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Brier Score — Model Calibration</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Brier score ranges from 0 (perfect) to 1 (worst). Measures whether predicted probabilities are honest.</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {(() => {
              const best = brierData.perYear.reduce((a, b) => a.brier < b.brier ? a : b);
              const worst = brierData.perYear.reduce((a, b) => a.brier > b.brier ? a : b);
              return [
                { label: `Overall (${brierData.overall < 0.15 ? "Good" : brierData.overall < 0.25 ? "Fair" : "Weak"})`, val: brierData.overall, color: brierData.overall < 0.15 ? "#4a8a52" : brierData.overall < 0.25 ? "#b8862a" : "#b04040" },
                { label: `Best Year (${best.year})`, val: best.brier, color: "#4a8a52" },
                { label: `Worst Year (${worst.year})`, val: worst.brier, color: "#b04040" },
              ].map(s => (
                <div key={s.label} className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="font-mono text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[9px] font-bold uppercase text-muted-foreground mt-1">{s.label}</div>
                </div>
              ));
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Bootstrap Uncertainty */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Bootstrap Model Uncertainty</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Resamples the 25-year history 200 times with replacement. Shows how sensitive each prediction is to the specific data observed.</p>
          <div className="space-y-1.5">
            {RESULTS.filter(r => !r.wildcard).map(r => {
              const t = tier(r.prob);
              const b = bootstrap[r.key];
              if (!b) return null;
              return (
                <div key={r.key} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-36 shrink-0 truncate">{r.key}</span>
                  <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden relative">
                    <div className="absolute h-full rounded-full opacity-30" style={{ left: `${Math.max(0, b.lower)}%`, width: `${Math.min(85, b.upper) - Math.max(0, b.lower)}%`, background: t.color }} />
                    <div className="absolute h-full w-0.5 rounded" style={{ left: `${r.prob}%`, background: t.color }} />
                  </div>
                  <span className="font-mono text-[10px] font-bold w-24 text-right" style={{ color: t.color }}>{b.lower}% - {b.upper}%</span>
                  <span className="font-mono text-[9px] text-muted-foreground w-12 text-right">SD:{b.sd}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">Bar = 90% bootstrap interval (200 resamples). Vertical line = model prediction.</p>
        </CardContent>
      </Card>

      {/* Hazard Rates */}
      <Card className="mb-6 border-border">
        <CardContent className="p-5">
          <h3 className="font-display text-sm font-bold mb-1">Survival Analysis — Hazard Rates</h3>
          <p className="text-[10px] text-muted-foreground mb-4">Given a topic has been absent for N years, what fraction of its historical gaps were shorter? Higher hazard = more overdue.</p>
          <div className="space-y-1.5">
            {hazardData.map(r => {
              const t = tier(r.prob);
              const hColor = r.hz.rate > 0.7 ? "#b04040" : r.hz.rate > 0.5 ? "#b8862a" : "#4a8a52";
              const hLabel = r.hz.rate > 0.7 ? "Overdue" : r.hz.rate > 0.5 ? "Due soon" : "Not yet due";
              return (
                <div key={r.key} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-36 shrink-0 truncate">{r.key}</span>
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.round(r.hz.rate * 100)}%`, background: hColor }} />
                  </div>
                  <span className="font-mono text-[10px] font-bold w-10 text-right" style={{ color: hColor }}>{Math.round(r.hz.rate * 100)}%</span>
                  <span className="text-[9px] text-muted-foreground w-16 text-right">{hLabel}</span>
                  <span className="font-mono text-[9px] text-muted-foreground w-14 text-right">gap:{r.hz.currentGap}yr</span>
                </div>
              );
            })}
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">Hazard rate = fraction of historical gaps shorter than the current absence period.</p>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground">Data sourced from examinations.ie, instituteofeducation.ie, and davidwilson.ie. Always study all topics.</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* TOPIC GRID PAGE                                               */
/* ═══════════════════════════════════════════════════════════════ */
export function PredTopicGrid() {
  const years: number[] = [];
  for (let y = 2001; y <= 2025; y++) years.push(y);

  const totalAppearances = SECTION2_TOPICS.reduce((s, t) => s + t.years.length, 0);

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl font-bold mb-2">Past Paper Topic Grid</h1>
      <p className="text-sm text-muted-foreground font-light mb-6">Every Section 2 topic appearance from 2001 to 2025. The data powering all predictions.</p>
      <PredNav />

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { val: years.length, label: "Years" },
          { val: SECTION2_TOPICS.length, label: "Topics" },
          { val: totalAppearances, label: "Total Appearances" },
          { val: 2, label: "Per Year" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="font-mono text-xl font-bold text-primary">{s.val}</div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs text-muted-foreground items-center flex-wrap">
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-primary inline-block" /> Appeared</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-muted border border-border inline-block" /> Did not appear</span>
        <span className="text-[10px]">(Section 2: Q6 and Q7 — two topics per year)</span>
      </div>

      {/* Grid table */}
      <div className="overflow-x-auto border border-border rounded-lg bg-card">
        <table className="text-[10px] border-collapse w-full" style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th className="p-1.5 text-left font-bold text-muted-foreground border-b-2 border-border sticky left-0 bg-card z-10" style={{ minWidth: 140 }}>Topic</th>
              {years.map(y => (
                <th key={y} className="p-1 text-center font-mono font-bold text-muted-foreground border-b-2 border-border whitespace-nowrap">{`'${String(y).slice(2)}`}</th>
              ))}
              <th className="p-1.5 text-center font-bold text-muted-foreground border-b-2 border-border">Total</th>
              <th className="p-1.5 text-center font-bold text-muted-foreground border-b-2 border-border">Last</th>
              <th className="p-1.5 text-center font-bold text-muted-foreground border-b-2 border-border">Gap</th>
            </tr>
          </thead>
          <tbody>
            {SECTION2_TOPICS.map(topic => {
              const last = topic.years[topic.years.length - 1];
              const gap = 2025 - last;
              return (
                <tr key={topic.name} className="border-b border-border hover:bg-muted/30">
                  <td className="p-1.5 font-semibold text-foreground sticky left-0 bg-card whitespace-nowrap">{topic.name}</td>
                  {years.map(y => {
                    const hit = topic.years.includes(y);
                    return (
                      <td key={y} className="p-0.5 text-center">
                        {hit
                          ? <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary text-white text-[9px] font-bold font-mono">v</span>
                          : <span className="text-muted-foreground">·</span>}
                      </td>
                    );
                  })}
                  <td className="p-1.5 text-center font-mono font-bold text-primary">{topic.years.length}</td>
                  <td className="p-1.5 text-center font-mono text-muted-foreground">{last}</td>
                  <td className="p-1.5 text-center font-mono font-bold" style={{ color: gap >= 3 ? "hsl(var(--tier-po))" : undefined }}>
                    {gap}{gap >= 3 ? " !" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border">
              <td className="p-1.5 font-bold sticky left-0 bg-card">Topics/Year</td>
              {years.map(y => {
                const count = SECTION2_TOPICS.filter(t => t.years.includes(y)).length;
                return <td key={y} className="p-1 text-center font-mono font-bold text-primary">{count}</td>;
              })}
              <td /><td /><td />
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-[10px] text-muted-foreground mt-4">Data verified against 625points.com. Higher Level papers only (2001-2025).</p>
    </div>
  );
}
