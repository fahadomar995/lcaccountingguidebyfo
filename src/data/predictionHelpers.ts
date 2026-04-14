// === Prediction Helper Functions ===
// Extracted from shared.js HTML files

import {
  RESULTS, SEC2_HISTORY, ALL_YEARS, CURRENT_YEAR, TOPICS,
  getAppearances, avgGap, markovPRaw, buildResultsForHistory,
  ACCOUNT_TYPE_TOPICS, isAccountType,
  type PredictionResult, type TopicMeta
} from "./predictions";

// === SECTION2_TOPICS for topic grid ===
export const SECTION2_TOPICS = [
  { name: "Published Accounts", years: getAppearances("Published Accounts") },
  { name: "Service Firm", years: getAppearances("Service Firm") },
  { name: "Cash Flow", years: getAppearances("Cash Flow") },
  { name: "Correction of Errors", years: getAppearances("Correction of Errors") },
  { name: "Club Accounts", years: getAppearances("Club Accounts") },
  { name: "Inc Records A", years: getAppearances("Inc Records A") },
  { name: "Inc Records B", years: getAppearances("Inc Records B") },
  { name: "Tabular Statements", years: getAppearances("Tabular Statements") },
];

// === Pearson Correlation ===
export function getPearson(topicA: string, topicB: string): number {
  const n = ALL_YEARS.length;
  const xArr = ALL_YEARS.map(y => SEC2_HISTORY[y]?.includes(topicA) ? 1 : 0);
  const yArr = ALL_YEARS.map(y => SEC2_HISTORY[y]?.includes(topicB) ? 1 : 0);
  const mx = xArr.reduce((s, v) => s + v, 0) / n;
  const my = yArr.reduce((s, v) => s + v, 0) / n;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < n; i++) {
    const a = xArr[i] - mx, b = yArr[i] - my;
    num += a * b; dx += a * a; dy += b * b;
  }
  return dx > 0 && dy > 0 ? num / Math.sqrt(dx * dy) : 0;
}

// === Pearson Correlation Table (|r| > 0.20) ===
export const PEARSON_CORRELATIONS: { a: string; b: string; r: number; note: string }[] = [
  { a: "Club Accounts", b: "Inc Records B", r: 0.408, note: "POSITIVE — co-appeared in 2019 and 2022." },
  { a: "Service Firm", b: "Cash Flow", r: -0.389, note: "Strong negative — unlikely together." },
  { a: "Published Accounts", b: "Club Accounts", r: -0.375, note: "Strong negative." },
  { a: "Published Accounts", b: "Inc Records A", r: -0.375, note: "Strong negative." },
  { a: "Published Accounts", b: "Correction of Errors", r: -0.336, note: "Moderate negative." },
  { a: "Service Firm", b: "Correction of Errors", r: -0.336, note: "Moderate negative." },
  { a: "Cash Flow", b: "Correction of Errors", r: -0.336, note: "Moderate negative." },
  { a: "Published Accounts", b: "Tabular Statements", r: -0.327, note: "Moderate negative." },
  { a: "Cash Flow", b: "Tabular Statements", r: -0.327, note: "Moderate negative." },
  { a: "Club Accounts", b: "Inc Records A", r: -0.250, note: "Moderate negative." },
  { a: "Club Accounts", b: "Correction of Errors", r: -0.218, note: "Moderate negative." },
  { a: "Club Accounts", b: "Tabular Statements", r: -0.218, note: "Moderate negative." },
];

// === Shannon Entropy ===
export function shannonEntropy(): number {
  const probs = RESULTS.filter(r => !r.wildcard).map(r => r.prob / 100);
  const total = probs.reduce((s, p) => s + p, 0);
  const norm = probs.map(p => p / total);
  const maxE = Math.log2(norm.length);
  const e = -norm.reduce((s, p) => s + (p > 0 ? p * Math.log2(p) : 0), 0);
  return maxE > 0 ? e / maxE : 0;
}

// === Bayesian Posterior (Beta-Binomial) ===
export function bayesianPosterior(key: string): { mean: number; lower: number; upper: number } {
  const app = getAppearances(key);
  const n = ALL_YEARS.length;
  const k = app.length;
  const alpha = 1 + k;
  const beta = 1 + n - k;
  const mean = alpha / (alpha + beta);
  // 90% credible interval using normal approximation
  const variance = (alpha * beta) / ((alpha + beta) ** 2 * (alpha + beta + 1));
  const sd = Math.sqrt(variance);
  return { mean, lower: Math.max(0, mean - 1.645 * sd), upper: Math.min(1, mean + 1.645 * sd) };
}

// === Monte Carlo with account-type constraint ===
export function runMonteCarlo(N: number): { topicFreqs: { key: string; pct: number; ci: number }[]; pairFreqs: { pair: string; pct: number }[]; N: number } {
  const topics = RESULTS.filter(r => !r.wildcard);
  const probs = topics.map(t => t.prob / 100);
  const total = probs.reduce((s, p) => s + p, 0);
  const normalized = probs.map(p => p / total);

  const counts: Record<string, number> = {};
  const pairCounts: Record<string, number> = {};
  topics.forEach(t => { counts[t.key] = 0; });

  for (let i = 0; i < N; i++) {
    // Pick first topic
    let r1 = Math.random(), cum = 0, pick1 = 0;
    for (let j = 0; j < topics.length; j++) { cum += normalized[j]; if (r1 <= cum) { pick1 = j; break; } }

    // Build adjusted probs for second pick (exclude picked + account-type constraint)
    const adj: number[] = [];
    const pick1Key = topics[pick1].key;
    const pick1IsAcct = isAccountType(pick1Key);
    for (let j = 0; j < topics.length; j++) {
      if (j === pick1) { adj.push(0); continue; }
      if (pick1IsAcct && isAccountType(topics[j].key)) { adj.push(0); continue; }
      adj.push(normalized[j]);
    }
    const adjTotal = adj.reduce((s, p) => s + p, 0);
    if (adjTotal === 0) continue;
    const adjNorm = adj.map(p => p / adjTotal);

    let r2 = Math.random(), cum2 = 0, pick2 = 0;
    for (let j = 0; j < topics.length; j++) { cum2 += adjNorm[j]; if (r2 <= cum2) { pick2 = j; break; } }

    counts[topics[pick1].key]++;
    counts[topics[pick2].key]++;

    const pairKey = [topics[pick1].key, topics[pick2].key].sort().join(" + ");
    pairCounts[pairKey] = (pairCounts[pairKey] || 0) + 1;
  }

  const topicFreqs = Object.entries(counts)
    .map(([key, count]) => {
      const pct = parseFloat(((count / N) * 100).toFixed(1));
      const p = pct / 100;
      const ci = parseFloat((1.96 * Math.sqrt(p * (1 - p) / N) * 100).toFixed(1));
      return { key, pct, ci };
    })
    .sort((a, b) => b.pct - a.pct);

  const pairFreqs = Object.entries(pairCounts)
    .map(([pair, count]) => ({ pair, pct: parseFloat(((count / N) * 100).toFixed(1)) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 15);

  return { topicFreqs, pairFreqs, N };
}

// === Scenario Simulator ===
export function getScenarioProbs(fixedKey: string): { key: string; prob: number; originalProb: number; pearson: number }[] {
  const others = RESULTS.filter(r => !r.wildcard && r.key !== fixedKey);
  const fixedIsAcct = isAccountType(fixedKey);
  
  return others
    .filter(r => !(fixedIsAcct && isAccountType(r.key)))
    .map(r => {
      const prs = getPearson(fixedKey, r.key);
      const adjustment = prs * 15; // scale pearson effect
      const newProb = Math.max(5, Math.min(90, Math.round(r.prob + adjustment)));
      return { key: r.key, prob: newProb, originalProb: r.prob, pearson: prs };
    })
    .sort((a, b) => b.prob - a.prob);
}

// === Combination Probabilities ===
export function getCombinationProbs(): { a: string; b: string; prob: number; pearson: number }[] {
  const topics = RESULTS.filter(r => !r.wildcard);
  const combos: { a: string; b: string; prob: number; pearson: number }[] = [];
  
  for (let i = 0; i < topics.length; i++) {
    for (let j = i + 1; j < topics.length; j++) {
      if (isAccountType(topics[i].key) && isAccountType(topics[j].key)) continue;
      const prs = getPearson(topics[i].key, topics[j].key);
      const joint = (topics[i].prob / 100) * (topics[j].prob / 100) * (1 + prs * 0.5);
      combos.push({ a: topics[i].key, b: topics[j].key, prob: parseFloat((joint * 100).toFixed(1)), pearson: prs });
    }
  }
  
  return combos.sort((a, b) => b.prob - a.prob);
}

// === Backtest (top-3) ===
export function runBacktest(testYear: number): { top3: string[]; actual: string[]; hits: number } {
  const trainingYears = ALL_YEARS.filter(y => y < testYear);
  const trainingHistory: Record<number, string[]> = {};
  trainingYears.forEach(y => { trainingHistory[y] = SEC2_HISTORY[y]; });
  const results = buildResultsForHistory(trainingHistory, trainingYears, TOPICS);
  const top3 = results.filter(r => !r.wildcard).slice(0, 3).map(r => r.key);
  const actual = SEC2_HISTORY[testYear] || [];
  const hits = actual.filter(a => top3.includes(a)).length;
  return { top3, actual, hits };
}

export function runFullBacktest(): { year: number; top3: string[]; actual: string[]; hits: number }[] {
  const testYears = ALL_YEARS.filter(y => y >= 2018);
  return testYears.map(y => ({ year: y, ...runBacktest(y) }));
}

// === Brier Score ===
export function computeBrierScores(): { overall: number; perYear: { year: number; brier: number }[] } {
  const testYears = ALL_YEARS.filter(y => y >= 2012);
  const nonWild = TOPICS.filter(t => !t.wildcard);
  const perYear: { year: number; brier: number }[] = [];
  
  for (const testYear of testYears) {
    const trainingYears = ALL_YEARS.filter(y => y < testYear);
    const trainingHistory: Record<number, string[]> = {};
    trainingYears.forEach(y => { trainingHistory[y] = SEC2_HISTORY[y]; });
    const results = buildResultsForHistory(trainingHistory, trainingYears, TOPICS);
    
    let brierSum = 0;
    for (const topic of nonWild) {
      const pred = results.find(r => r.key === topic.key);
      const p = pred ? pred.prob / 100 : 0.1;
      const actual = SEC2_HISTORY[testYear]?.includes(topic.key) ? 1 : 0;
      brierSum += (p - actual) ** 2;
    }
    perYear.push({ year: testYear, brier: parseFloat((brierSum / nonWild.length).toFixed(3)) });
  }
  
  const overall = parseFloat((perYear.reduce((s, y) => s + y.brier, 0) / perYear.length).toFixed(3));
  return { overall, perYear };
}

// === Bootstrap Uncertainty ===
export function bootstrapModelUncertainty(nBootstraps = 200): Record<string, { lower: number; upper: number; sd: number }> {
  const nonWild = TOPICS.filter(t => !t.wildcard);
  const probSamples: Record<string, number[]> = {};
  nonWild.forEach(t => { probSamples[t.key] = []; });
  
  for (let b = 0; b < nBootstraps; b++) {
    // Resample years with replacement
    const sampledYears: number[] = [];
    const sampledHistory: Record<number, string[]> = {};
    for (let i = 0; i < ALL_YEARS.length; i++) {
      const y = ALL_YEARS[Math.floor(Math.random() * ALL_YEARS.length)];
      sampledYears.push(2001 + i);
      sampledHistory[2001 + i] = SEC2_HISTORY[y] || [];
    }
    const sortedYears = sampledYears.sort((a, b) => a - b);
    const results = buildResultsForHistory(sampledHistory, sortedYears, TOPICS);
    for (const r of results) {
      if (!r.wildcard && probSamples[r.key]) {
        probSamples[r.key].push(r.prob);
      }
    }
  }
  
  const result: Record<string, { lower: number; upper: number; sd: number }> = {};
  for (const key of Object.keys(probSamples)) {
    const vals = probSamples[key].sort((a, b) => a - b);
    if (vals.length === 0) { result[key] = { lower: 0, upper: 0, sd: 0 }; continue; }
    const lo = vals[Math.floor(vals.length * 0.05)];
    const hi = vals[Math.floor(vals.length * 0.95)];
    const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
    const variance = vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length;
    result[key] = { lower: lo, upper: hi, sd: parseFloat(Math.sqrt(variance).toFixed(1)) };
  }
  return result;
}

// === Hazard Rate ===
export function hazardRate(key: string): { rate: number; currentGap: number } {
  const app = getAppearances(key).sort((a, b) => a - b);
  if (app.length < 2) return { rate: 0, currentGap: app.length ? CURRENT_YEAR - app[app.length - 1] : 25 };
  
  const gaps: number[] = [];
  for (let i = 1; i < app.length; i++) gaps.push(app[i] - app[i - 1]);
  
  const currentGap = CURRENT_YEAR - app[app.length - 1];
  const shorter = gaps.filter(g => g <= currentGap).length;
  return { rate: shorter / gaps.length, currentGap };
}

// === KEY FINDINGS (for stats page) ===
export const KEY_FINDINGS = [
  { id: 1, text: "No-repeat rule: P(topic appears | appeared last year) = 0.00 for EVERY topic. No HL topic has ever appeared two years in a row." },
  { id: 2, text: "2nd-order Markov dominates: P(Service Firm | absent 2024 & 2025) = 0.833 — the strongest signal in the model." },
  { id: 3, text: "Three data corrections: 2019 = Club+Cash Flow (not Inc A+B). 2020 = Correction+Service. 2022 = Club+Inc Records B (not Correction+Inc B)." },
  { id: 4, text: "Club Accounts 5 verified appearances: 2008, 2012, 2016, 2019, 2022. Avg gap 3.5 yrs. Now 4 yrs since 2022 — overdue." },
  { id: 5, text: "Club+Inc B positive correlation (r=+0.408): Both times Inc Records B appeared (2022), it was paired with Club Accounts." },
  { id: 6, text: "Tabular Statements only 4 appearances: 2007, 2014, 2017, 2025. Appeared 2025 → Markov P = 0.00 for 2026." },
];

// === SEC3 Confirmed Data ===
export const SEC3_CONFIRMED_DATA = [
  { year: 2025, q8: "Marginal Costing", q9: "Production Budget", source: "Institute of Education" },
  { year: 2024, q8: "Flexible Budget + Stock Valuation", q9: "Cash + Production Budget", source: "SEC paper / IoE review" },
  { year: 2023, q8: "Marginal + Absorption Costing", q9: "Cash Budget", source: "SEC paper / IoE review" },
  { year: 2022, q8: "Job Costing", q9: "—", source: "625points.com" },
  { year: 2021, q8: "Stock Valuation + Product Costing + Absorption", q9: "Production Budget", source: "625points.com" },
  { year: 2020, q8: "Marginal + Absorption Costing", q9: "Cash + Production Budget", source: "625points.com" },
  { year: 2019, q8: "Overhead Apportionment + Job Costing", q9: "—", source: "625points.com" },
];
