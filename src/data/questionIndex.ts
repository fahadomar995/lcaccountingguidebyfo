// ═══════════════════════════════════════════════════════════════════
// EXAM SIMULATOR — QUESTION INDEX
// Single source of truth. Every entry has been audited against the
// real SEC PDF — page numbers refer to the page where the question
// physically begins. Most questions span two pages; the simulator
// renders both via /public/simulator-pages/<id>-{question,marking}-{1,2}.png
// ═══════════════════════════════════════════════════════════════════

export interface ExamQuestion {
  id: string;
  year: number;
  questionNumber: number;
  section: 1 | 2 | 3;
  marks: 60 | 80 | 100 | 120;
  topic: string;
  subtopic: string;
  /** External SEC URL — used as the "Open PDF" fallback link only. */
  paperUrl: string;
  /** Page number where the question starts in the original SEC PDF. */
  paperPage: number;
  markingSchemeUrl: string;
  markingSchemePage: number;
  /** Number of physical pages the question occupies (1 or 2). */
  paperPageCount: 1 | 2;
  /** Number of physical pages the marking-scheme answer occupies (1 or 2). */
  markingPageCount: 1 | 2;
  /** Recommended timing, mins. SEC pace is ~0.45 min per mark. */
  timingMinutes: number;
  notes: string;
}

const secPaper = (year: number) =>
  `https://www.studystrivers.ie/exampaperfiles/higher/accounting/accounting${year}.pdf`;
const secMs = (year: number) =>
  `https://www.studystrivers.ie/markingschemefiles/higher/accounting/accounting${year}.pdf`;

export const questionIndex: ExamQuestion[] = [
  // ─── 2019 ─────────────────────────────────────────────────────────
  { id: "2019_Q2_creditors", year: 2019, questionNumber: 2, section: 1, marks: 60,
    topic: "Control Accounts", subtopic: "Creditors Control Account",
    paperUrl: secPaper(2019), paperPage: 4, paperPageCount: 1,
    markingSchemeUrl: secMs(2019), markingSchemePage: 6, markingPageCount: 1,
    timingMinutes: 27, notes: "Creditors control account with adjustments" },

  { id: "2019_Q4_tabular", year: 2019, questionNumber: 4, section: 1, marks: 60,
    topic: "Tabular Statements", subtopic: "Tabular Statement",
    paperUrl: secPaper(2019), paperPage: 6, paperPageCount: 2,
    markingSchemeUrl: secMs(2019), markingSchemePage: 10, markingPageCount: 1,
    timingMinutes: 27, notes: "Miller Ltd — eight transactions over the year" },

  { id: "2019_Q5_interpretation", year: 2019, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2019), paperPage: 8, paperPageCount: 2,
    markingSchemeUrl: secMs(2019), markingSchemePage: 11, markingPageCount: 2,
    timingMinutes: 45, notes: "Shareholder perspective — full ratio set" },

  { id: "2019_Q6_club", year: 2019, questionNumber: 6, section: 2, marks: 100,
    topic: "Club Accounts", subtopic: "Club Accounts",
    paperUrl: secPaper(2019), paperPage: 10, paperPageCount: 2,
    markingSchemeUrl: secMs(2019), markingSchemePage: 14, markingPageCount: 2,
    timingMinutes: 45, notes: "Crest Wood Golf Club — bar trading + I&E" },

  { id: "2019_Q7_cashflow", year: 2019, questionNumber: 7, section: 2, marks: 100,
    topic: "Cash Flow", subtopic: "Cash Flow Statement",
    paperUrl: secPaper(2019), paperPage: 12, paperPageCount: 2,
    markingSchemeUrl: secMs(2019), markingSchemePage: 18, markingPageCount: 2,
    timingMinutes: 45, notes: "Jackson plc — cash flow + reconciliation" },

  { id: "2019_Q8_jobcosting", year: 2019, questionNumber: 8, section: 3, marks: 80,
    topic: "Costing", subtopic: "Overhead Apportionment / Job Costing",
    paperUrl: secPaper(2019), paperPage: 14, paperPageCount: 2,
    markingSchemeUrl: secMs(2019), markingSchemePage: 21, markingPageCount: 2,
    timingMinutes: 36, notes: "Service-dept reapportionment + job costing" },

  { id: "2019_Q9_production", year: 2019, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Production Budgeting",
    paperUrl: secPaper(2019), paperPage: 16, paperPageCount: 1,
    markingSchemeUrl: secMs(2019), markingSchemePage: 25, markingPageCount: 2,
    timingMinutes: 36, notes: "Two-product production + cost budget" },

  // ─── 2020 ─────────────────────────────────────────────────────────
  { id: "2020_Q3_incomplete", year: 2020, questionNumber: 3, section: 1, marks: 60,
    topic: "Incomplete Records", subtopic: "Sole Trader Incomplete Records",
    paperUrl: secPaper(2020), paperPage: 6, paperPageCount: 1,
    markingSchemeUrl: secMs(2020), markingSchemePage: 9, markingPageCount: 2,
    timingMinutes: 27, notes: "S. Staunton — opening capital + adjustments" },

  { id: "2020_Q6_suspense", year: 2020, questionNumber: 6, section: 2, marks: 100,
    topic: "Correction of Errors", subtopic: "Suspense Account",
    paperUrl: secPaper(2020), paperPage: 10, paperPageCount: 2,
    markingSchemeUrl: secMs(2020), markingSchemePage: 19, markingPageCount: 2,
    timingMinutes: 45, notes: "J. Beglin — six errors + corrected balance sheet" },

  { id: "2020_Q8_marginal", year: 2020, questionNumber: 8, section: 3, marks: 80,
    topic: "Costing", subtopic: "Marginal vs Absorption Costing",
    paperUrl: secPaper(2020), paperPage: 14, paperPageCount: 2,
    markingSchemeUrl: secMs(2020), markingSchemePage: 26, markingPageCount: 2,
    timingMinutes: 36, notes: "Aldridge Ltd — BEP, MoS, marginal vs absorption" },

  { id: "2020_Q9_cashbudget", year: 2020, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Production & Cash Budget",
    paperUrl: secPaper(2020), paperPage: 16, paperPageCount: 1,
    markingSchemeUrl: secMs(2020), markingSchemePage: 30, markingPageCount: 2,
    timingMinutes: 36, notes: "Houghton Ltd — six-month cash budget" },

  // ─── 2021 ─────────────────────────────────────────────────────────
  { id: "2021_Q2_tabular", year: 2021, questionNumber: 2, section: 1, marks: 60,
    topic: "Tabular Statements", subtopic: "Tabular Statement",
    paperUrl: secPaper(2021), paperPage: 6, paperPageCount: 2,
    markingSchemeUrl: secMs(2021), markingSchemePage: 10, markingPageCount: 1,
    timingMinutes: 27, notes: "Tabular statement of effects" },

  { id: "2021_Q3_depreciation", year: 2021, questionNumber: 3, section: 1, marks: 60,
    topic: "Depreciation", subtopic: "Depreciation of Fixed Assets",
    paperUrl: secPaper(2021), paperPage: 8, paperPageCount: 1,
    markingSchemeUrl: secMs(2021), markingSchemePage: 11, markingPageCount: 2,
    timingMinutes: 27, notes: "Straight-line + asset disposal + theory" },

  { id: "2021_Q4_debtors", year: 2021, questionNumber: 4, section: 1, marks: 60,
    topic: "Control Accounts", subtopic: "Debtors Control Account",
    paperUrl: secPaper(2021), paperPage: 9, paperPageCount: 1,
    markingSchemeUrl: secMs(2021), markingSchemePage: 13, markingPageCount: 1,
    timingMinutes: 27, notes: "Debtors control with contra entries" },

  { id: "2021_Q5_interpretation", year: 2021, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2021), paperPage: 11, paperPageCount: 1,
    markingSchemeUrl: secMs(2021), markingSchemePage: 14, markingPageCount: 2,
    timingMinutes: 45, notes: "Bank manager perspective — gearing focus" },

  { id: "2021_Q7_cashflow", year: 2021, questionNumber: 7, section: 2, marks: 100,
    topic: "Cash Flow", subtopic: "Cash Flow Statement",
    paperUrl: secPaper(2021), paperPage: 14, paperPageCount: 2,
    markingSchemeUrl: secMs(2021), markingSchemePage: 22, markingPageCount: 2,
    timingMinutes: 45, notes: "Reid plc — cash flow + reconciliation" },

  { id: "2021_Q9_flexible", year: 2021, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Flexible Budget",
    paperUrl: secPaper(2021), paperPage: 18, paperPageCount: 1,
    markingSchemeUrl: secMs(2021), markingSchemePage: 28, markingPageCount: 2,
    timingMinutes: 36, notes: "Flex budget at 90% activity, marginal format" },

  // ─── 2022 ─────────────────────────────────────────────────────────
  { id: "2022_Q2_cashflow", year: 2022, questionNumber: 2, section: 1, marks: 60,
    topic: "Cash Flow", subtopic: "Cash Flow Statement",
    paperUrl: secPaper(2022), paperPage: 6, paperPageCount: 2,
    markingSchemeUrl: secMs(2022), markingSchemePage: 10, markingPageCount: 2,
    timingMinutes: 27, notes: "Puspure plc — short-form cash flow" },

  { id: "2022_Q3_suspense", year: 2022, questionNumber: 3, section: 1, marks: 60,
    topic: "Correction of Errors", subtopic: "Suspense Account",
    paperUrl: secPaper(2022), paperPage: 8, paperPageCount: 1,
    markingSchemeUrl: secMs(2022), markingSchemePage: 13, markingPageCount: 2,
    timingMinutes: 27, notes: "Fletcher Ltd — six errors" },

  { id: "2022_Q5_interpretation", year: 2022, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2022), paperPage: 11, paperPageCount: 1,
    markingSchemeUrl: secMs(2022), markingSchemePage: 19, markingPageCount: 2,
    timingMinutes: 45, notes: "Watson plc — bank-manager perspective" },

  { id: "2022_Q6_incomplete", year: 2022, questionNumber: 6, section: 2, marks: 100,
    topic: "Incomplete Records", subtopic: "Incomplete Records",
    paperUrl: secPaper(2022), paperPage: 12, paperPageCount: 2,
    markingSchemeUrl: secMs(2022), markingSchemePage: 23, markingPageCount: 2,
    timingMinutes: 45, notes: "McSharry — full statement + corrected accounts" },

  { id: "2022_Q7_club", year: 2022, questionNumber: 7, section: 2, marks: 100,
    topic: "Club Accounts", subtopic: "Club Accounts",
    paperUrl: secPaper(2022), paperPage: 14, paperPageCount: 2,
    markingSchemeUrl: secMs(2022), markingSchemePage: 28, markingPageCount: 2,
    timingMinutes: 45, notes: "Abbey Hockey Club — accumulated fund + I&E" },

  { id: "2022_Q9_budgeting", year: 2022, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Production / Cost / Cash Budget",
    paperUrl: secPaper(2022), paperPage: 18, paperPageCount: 1,
    markingSchemeUrl: secMs(2022), markingSchemePage: 36, markingPageCount: 2,
    timingMinutes: 36, notes: "Harrington Ltd — production budget + variances" },

  // ─── 2023 ─────────────────────────────────────────────────────────
  { id: "2023_Q4_tabular", year: 2023, questionNumber: 4, section: 1, marks: 60,
    topic: "Tabular Statements", subtopic: "Tabular Statement",
    paperUrl: secPaper(2023), paperPage: 8, paperPageCount: 2,
    markingSchemeUrl: secMs(2023), markingSchemePage: 13, markingPageCount: 1,
    timingMinutes: 27, notes: "Tabular statement of effects" },

  { id: "2023_Q5_interpretation", year: 2023, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2023), paperPage: 11, paperPageCount: 1,
    markingSchemeUrl: secMs(2023), markingSchemePage: 14, markingPageCount: 2,
    timingMinutes: 45, notes: "Debenture-holder perspective — Goodwin plc" },

  { id: "2023_Q7_service", year: 2023, questionNumber: 7, section: 2, marks: 100,
    topic: "Service Firm", subtopic: "Service Firm Final Accounts",
    paperUrl: secPaper(2023), paperPage: 14, paperPageCount: 2,
    markingSchemeUrl: secMs(2023), markingSchemePage: 23, markingPageCount: 2,
    timingMinutes: 45, notes: "Dental practice — service firm final accounts" },

  { id: "2023_Q9_budgeting", year: 2023, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Cash Budget",
    paperUrl: secPaper(2023), paperPage: 18, paperPageCount: 1,
    markingSchemeUrl: secMs(2023), markingSchemePage: 30, markingPageCount: 2,
    timingMinutes: 36, notes: "Lupin Ltd — six-month cash budget" },
];

// ═══════════════════════════════════════════════════════════════════
// PURE FILTER FUNCTION — unit-testable, no side effects
// ═══════════════════════════════════════════════════════════════════
export function filterQuestions(
  all: ExamQuestion[],
  topic: string | "ALL",
  marks: ExamQuestion["marks"] | "ALL",
): ExamQuestion[] {
  return all.filter((q) => {
    if (topic !== "ALL" && q.topic !== topic) return false;
    if (marks !== "ALL" && q.marks !== marks) return false;
    return true;
  });
}

export function uniqueTopics(all: ExamQuestion[]): string[] {
  return Array.from(new Set(all.map((q) => q.topic))).sort();
}
