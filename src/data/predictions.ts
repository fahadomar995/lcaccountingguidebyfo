// === LC Accounting 2026 — Prediction Data & Algorithms ===

export const SEC2_HISTORY: Record<number, string[]> = {
  2001:["Inc Records A","Service Firm"],2002:["Published Accounts","Cash Flow"],
  2003:["Correction of Errors","Inc Records A"],2004:["Published Accounts","Service Firm"],
  2005:["Cash Flow","Inc Records A"],2006:["Published Accounts","Correction of Errors"],
  2007:["Service Firm","Tabular Statements"],2008:["Club Accounts","Correction of Errors"],
  2009:["Cash Flow","Service Firm"],2010:["Correction of Errors","Inc Records A"],
  2011:["Published Accounts","Service Firm"],2012:["Club Accounts","Cash Flow"],
  2013:["Published Accounts","Service Firm"],2014:["Correction of Errors","Tabular Statements"],
  2015:["Published Accounts","Cash Flow"],2016:["Club Accounts","Correction of Errors"],
  2017:["Service Firm","Tabular Statements"],2018:["Cash Flow","Published Accounts"],
  2019:["Club Accounts","Cash Flow"],2020:["Correction of Errors","Service Firm"],
  2021:["Published Accounts","Cash Flow"],2022:["Club Accounts","Inc Records B"],
  2023:["Published Accounts","Service Firm"],2024:["Cash Flow","Correction of Errors"],
  2025:["Inc Records A","Tabular Statements"]
};

export const ALL_YEARS = Object.keys(SEC2_HISTORY).map(Number).sort((a,b)=>a-b);
export const CURRENT_YEAR = 2026;

export interface TopicMeta {
  key: string;
  note: string;
  wildcard?: boolean;
}

export const TOPICS: TopicMeta[] = [
  {key:"Published Accounts",note:"Highest-frequency (9x in 25 yrs). Last seen 2023."},
  {key:"Service Firm",note:"9x appearances. Absent 2024 & 2025 — strongest 2026 signal."},
  {key:"Club Accounts",note:"5x: 2008,2012,2016,2019,2022. Avg gap 3.5 yrs. Overdue."},
  {key:"Farm Accounts",note:"WILDCARD: on syllabus but never set.",wildcard:true},
  {key:"Cash Flow",note:"High frequency (8x). Appeared 2024."},
  {key:"Correction of Errors",note:"High frequency (8x). Appeared 2024."},
  {key:"Inc Records A",note:"5x. Appeared 2025 — very unlikely for 2026."},
  {key:"Inc Records B",note:"Only 1 verified HL appearance (2022)."},
  {key:"Tabular Statements",note:"4x. Just appeared 2025 — very unlikely."}
];

export const SEC3_Q8_HISTORY: Record<number, string[]> = {
  2019:["Overhead Apportionment","Job Costing"],2020:["Marginal Costing","Absorption Costing"],
  2021:["Stock Valuation","Product Costing","Absorption Costing"],2022:["Job Costing"],
  2023:["Marginal Costing","Absorption Costing"],2024:["Flexible Budget","Stock Valuation"],
  2025:["Marginal Costing"]
};
export const SEC3_Q8_YEARS = Object.keys(SEC3_Q8_HISTORY).map(Number).sort((a,b)=>a-b);

export const SEC3_Q8_SUBTOPICS: TopicMeta[] = [
  {key:"Marginal Costing",note:"Contribution statements, break-even."},
  {key:"Absorption Costing",note:"Overhead absorption rates."},
  {key:"Job Costing",note:"Job cost sheets. Last 2022."},
  {key:"Product Costing",note:"Unit cost calculations."},
  {key:"Stock Valuation",note:"FIFO method."},
  {key:"Overhead Apportionment",note:"Allocation of indirect costs. Last 2019."}
];

export const SEC3_Q9_HISTORY: Record<number, string[]> = {
  2020:["Cash Budget","Production Budget"],2021:["Production Budget"],
  2023:["Cash Budget"],2024:["Cash Budget","Production Budget"],2025:["Production Budget"]
};
export const SEC3_Q9_YEARS = Object.keys(SEC3_Q9_HISTORY).map(Number).sort((a,b)=>a-b);

export const SEC3_Q9_SUBTOPICS: TopicMeta[] = [
  {key:"Cash Budget",note:"Cash inflows/outflows."},
  {key:"Production Budget",note:"Units to produce. Most frequent."},
  {key:"Flexible Budget",note:"Budgets at different activity levels."}
];

export const ACCOUNT_TYPE_TOPICS = ['Service Firm','Club Accounts','Farm Accounts'];
export function isAccountType(key: string) { return ACCOUNT_TYPE_TOPICS.includes(key); }

// === ALGORITHMS ===

export function getAppearances(key: string, history = SEC2_HISTORY, years = ALL_YEARS): number[] {
  return years.filter(y => history[y]?.includes(key));
}

export function avgGap(years: number[]): number {
  if (years.length < 2) return 4;
  const s = [...years].sort((a,b)=>a-b);
  let total = 0;
  for (let i = 1; i < s.length; i++) total += s[i] - s[i-1];
  return total / (s.length - 1);
}

function wFreq(key: string, lambda = 0.10, history = SEC2_HISTORY, years = ALL_YEARS): number {
  return getAppearances(key, history, years).reduce((s, y) => s + Math.exp(-lambda * (CURRENT_YEAR - y)), 0);
}

function markovP(key: string, history = SEC2_HISTORY, years = ALL_YEARS): number {
  const appeared: Record<number, boolean> = {};
  getAppearances(key, history, years).forEach(y => { appeared[y] = true; });
  let yY=0, yYt=0, yN=0, yNt=0;
  const startYr = years.length > 0 ? years[0] + 1 : 2002;
  const endYr = years.length > 0 ? years[years.length - 1] : 2025;
  for (let y = startYr; y <= endYr; y++) {
    const prev = !!appeared[y-1], curr = !!appeared[y];
    if (prev) { yYt++; if (curr) yY++; } else { yNt++; if (curr) yN++; }
  }
  const app = getAppearances(key, history, years);
  const justApp = app.length > 0 && app[app.length-1] === endYr;
  if (justApp) return (yY + 0.5) / (yYt + 1);
  return (yN + 0.5) / (yNt + 1);
}

export function markovPRaw(key: string, history = SEC2_HISTORY, years = ALL_YEARS): number {
  const appeared: Record<number, boolean> = {};
  getAppearances(key, history, years).forEach(y => { appeared[y] = true; });
  let yY=0, yYt=0, yN=0, yNt=0;
  const startYr = years.length > 0 ? years[0] + 1 : 2002;
  const endYr = years.length > 0 ? years[years.length - 1] : 2025;
  for (let y = startYr; y <= endYr; y++) {
    const prev = !!appeared[y-1], curr = !!appeared[y];
    if (prev) { yYt++; if (curr) yY++; } else { yNt++; if (curr) yN++; }
  }
  const app = getAppearances(key, history, years);
  const justApp = app.length > 0 && app[app.length-1] === endYr;
  if (justApp) return yYt > 0 ? yY/yYt : 0;
  return yNt > 0 ? yN/yNt : 0;
}

function streakPenalty(key: string, history = SEC2_HISTORY, years = ALL_YEARS): number {
  const app = getAppearances(key, history, years).sort((a,b)=>b-a);
  let s = 0;
  for (let i = 0; i < app.length; i++) {
    if (app[i] === CURRENT_YEAR - 1 - s) s++; else break;
  }
  return Math.pow(0.78, Math.max(0, s - 1));
}

interface Params { wMarkov: number; wFreq: number; wGap: number; wRecency: number; lambda: number; }
const DEFAULT_PARAMS: Params = {wMarkov:0.35, wFreq:0.25, wGap:0.25, wRecency:0.15, lambda:0.10};

function finalScore(key: string, params = DEFAULT_PARAMS, topicsMeta = TOPICS, history = SEC2_HISTORY, years = ALL_YEARS): number {
  const meta = topicsMeta.find(t => t.key === key);
  if (meta?.wildcard) return 0.05;
  const app = getAppearances(key, history, years);
  if (!app.length) return 0.04;
  const ag = avgGap(app);
  const yrsSince = CURRENT_YEAR - app[app.length-1];
  const gapRatio = ag > 0 ? yrsSince / ag : 0;
  const gapScore = Math.min(gapRatio, 2.5);
  const recency = 1 / (1 + Math.exp(-6 * (gapRatio - 0.65)));
  const allWF = topicsMeta.filter(t => !t.wildcard).map(t => wFreq(t.key, params.lambda, history, years));
  const maxWF = Math.max(...allWF) || 1;
  const wf_norm = wFreq(key, params.lambda, history, years) / maxWF;
  const mp = markovP(key, history, years);
  const sp = streakPenalty(key, history, years);
  return (wf_norm * params.wFreq + mp * params.wMarkov + gapScore * params.wGap + recency * params.wRecency) * sp;
}

export interface PredictionResult {
  key: string; note: string; wildcard: boolean; appearances: number[];
  lastYear: number | null; gap: string; yearsSinceLast: number | null;
  mri: string; markovProb: number; rawFinal: number; prob: number;
}

export function buildResultsForHistory(
  history: Record<number, string[]>, years: number[], topicsMeta: TopicMeta[], params = DEFAULT_PARAMS
): PredictionResult[] {
  const numYears = years.length;
  const rawScores = topicsMeta.map(t => {
    const app = getAppearances(t.key, history, years);
    const ag = app.length > 1 ? avgGap(app) : (t.wildcard ? 0 : 4);
    const lastYear = app.length ? app[app.length-1] : null;
    const yrsSince = lastYear ? CURRENT_YEAR - lastYear : null;
    const mri = app.length ? (numYears / app.length).toFixed(2) : 'N/A';
    return {
      key: t.key, note: t.note || '', wildcard: !!t.wildcard,
      appearances: app, lastYear, gap: ag ? ag.toFixed(1) : 'N/A',
      yearsSinceLast: yrsSince, mri,
      markovProb: t.wildcard ? 0 : parseFloat((markovPRaw(t.key, history, years)*100).toFixed(1)),
      rawFinal: finalScore(t.key, params, topicsMeta, history, years)
    };
  });
  const realRaws = rawScores.filter(r => !r.wildcard).map(r => r.rawFinal);
  const maxR = Math.max(...realRaws) || 1;
  const minR = Math.min(...realRaws) || 0;
  return rawScores.map(r => {
    let prob: number;
    if (r.wildcard) { prob = 10; }
    else if (maxR === minR) { prob = 50; }
    else { prob = Math.round(8 + (r.rawFinal - minR) / (maxR - minR) * 77); prob = Math.min(Math.max(prob, 8), 85); }
    return { ...r, prob };
  }).sort((a,b) => b.prob - a.prob);
}

export function buildResults(params?: Params) {
  return buildResultsForHistory(SEC2_HISTORY, ALL_YEARS, TOPICS, params);
}

// Pre-computed results
export const RESULTS = buildResults();
export const SEC3_Q8_RESULTS = buildResultsForHistory(SEC3_Q8_HISTORY, SEC3_Q8_YEARS, SEC3_Q8_SUBTOPICS);
export const SEC3_Q9_RESULTS = buildResultsForHistory(SEC3_Q9_HISTORY, SEC3_Q9_YEARS, SEC3_Q9_SUBTOPICS);

// Tier helper
export interface Tier { label: string; color: string; cls: string; }
export function tier(p: number): Tier {
  if (p >= 65) return {label:"Very Likely", color:"hsl(var(--tier-vl))", cls:"tier-vl"};
  if (p >= 45) return {label:"Likely", color:"hsl(var(--tier-li))", cls:"tier-li"};
  if (p >= 28) return {label:"Possible", color:"hsl(var(--tier-po))", cls:"tier-po"};
  if (p >= 15) return {label:"Unlikely", color:"hsl(var(--tier-un))", cls:"tier-un"};
  return {label:"Very Unlikely", color:"hsl(var(--tier-vu))", cls:"tier-vu"};
}
