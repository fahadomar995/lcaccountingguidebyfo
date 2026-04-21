// ═══════════════════════════════════════════════════════════════════
// EXAM SIMULATOR — QUESTION INDEX
// Single source of truth. Add new entries below — no code changes needed.
// ═══════════════════════════════════════════════════════════════════

export interface ExamQuestion {
  id: string;                  // unique identifier e.g. "2019_Q6_suspense"
  year: number;
  questionNumber: number;
  section: 1 | 2 | 3;
  marks: 60 | 80 | 100 | 120;
  topic: string;               // broad topic
  subtopic: string;            // specific
  paperUrl: string;            // PDF url (SEC = external, mocks = /papers/...)
  paperPage: number;           // page number of the question
  markingSchemeUrl: string;
  markingSchemePage: number;
  timingMinutes: number;       // marks × 0.45, rounded
  notes: string;
}

// SEC papers are hosted externally — we reuse the same URL pattern as
// src/data/pastPapers.ts so iframes resolve to a real PDF.
const secPaper = (year: number) =>
  `https://www.studystrivers.ie/exampaperfiles/higher/accounting/accounting${year}.pdf`;
const secMs = (year: number) =>
  `https://www.studystrivers.ie/markingschemefiles/higher/accounting/accounting${year}.pdf`;

export const questionIndex: ExamQuestion[] = [

  // ─── CORRECTION OF ERRORS / SUSPENSE ──────────────────────────────
  {
    id: "2023_Q6_suspense",
    year: 2023, questionNumber: 6, section: 2, marks: 100,
    topic: "Correction of Errors", subtopic: "Suspense Account",
    paperUrl: secPaper(2023), paperPage: 5,
    markingSchemeUrl: secMs(2023), markingSchemePage: 12,
    timingMinutes: 45, notes: "Six errors, suspense account required",
  },
  {
    id: "2021_Q6_suspense",
    year: 2021, questionNumber: 6, section: 2, marks: 100,
    topic: "Correction of Errors", subtopic: "Suspense Account",
    paperUrl: secPaper(2021), paperPage: 5,
    markingSchemeUrl: secMs(2021), markingSchemePage: 11,
    timingMinutes: 45, notes: "Corrected profit and balance sheet required",
  },

  // ─── TABULAR STATEMENTS ───────────────────────────────────────────
  {
    id: "2022_Q6_tabular",
    year: 2022, questionNumber: 6, section: 2, marks: 100,
    topic: "Tabular Statements", subtopic: "Tabular Statement",
    paperUrl: secPaper(2022), paperPage: 5,
    markingSchemeUrl: secMs(2022), markingSchemePage: 11,
    timingMinutes: 45, notes: "Balance sheet effects of multiple transactions",
  },

  // ─── CLUB ACCOUNTS ────────────────────────────────────────────────
  {
    id: "2022_Q7_club",
    year: 2022, questionNumber: 7, section: 2, marks: 100,
    topic: "Club Accounts", subtopic: "Club Accounts",
    paperUrl: secPaper(2022), paperPage: 7,
    markingSchemeUrl: secMs(2022), markingSchemePage: 15,
    timingMinutes: 45, notes: "Accumulated fund, income and expenditure account",
  },
  {
    id: "2019_Q7_club",
    year: 2019, questionNumber: 7, section: 2, marks: 100,
    topic: "Club Accounts", subtopic: "Club Accounts",
    paperUrl: secPaper(2019), paperPage: 7,
    markingSchemeUrl: secMs(2019), markingSchemePage: 14,
    timingMinutes: 45, notes: "Accumulated fund, bar account, income and expenditure",
  },

  // ─── INTERPRETATION OF ACCOUNTS — Q5 ──────────────────────────────
  {
    id: "2023_Q5_interpretation",
    year: 2023, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2023), paperPage: 4,
    markingSchemeUrl: secMs(2023), markingSchemePage: 9,
    timingMinutes: 45, notes: "Debenture holder perspective, Part B and C included",
  },
  {
    id: "2022_Q5_interpretation",
    year: 2022, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2022), paperPage: 4,
    markingSchemeUrl: secMs(2022), markingSchemePage: 9,
    timingMinutes: 45, notes: "Shareholder perspective, profitability and dividend ratios",
  },
  {
    id: "2021_Q5_interpretation",
    year: 2021, questionNumber: 5, section: 2, marks: 100,
    topic: "Interpretation of Accounts", subtopic: "Ratio Analysis",
    paperUrl: secPaper(2021), paperPage: 4,
    markingSchemeUrl: secMs(2021), markingSchemePage: 9,
    timingMinutes: 45, notes: "Bank manager perspective, liquidity ratios",
  },

  // ─── MARGINAL COSTING — Q8 ────────────────────────────────────────
  {
    id: "2023_Q8_marginal",
    year: 2023, questionNumber: 8, section: 3, marks: 80,
    topic: "Costing", subtopic: "Marginal Costing",
    paperUrl: secPaper(2023), paperPage: 8,
    markingSchemeUrl: secMs(2023), markingSchemePage: 17,
    timingMinutes: 36, notes: "Marginal costing statement, BEP, margin of safety",
  },
  {
    id: "2020_Q8_marginal",
    year: 2020, questionNumber: 8, section: 3, marks: 80,
    topic: "Costing", subtopic: "Marginal Costing",
    paperUrl: secPaper(2020), paperPage: 8,
    markingSchemeUrl: secMs(2020), markingSchemePage: 16,
    timingMinutes: 36, notes: "Marginal vs absorption comparison",
  },

  // ─── JOB COSTING — Q8 ─────────────────────────────────────────────
  {
    id: "2022_Q8_jobcosting",
    year: 2022, questionNumber: 8, section: 3, marks: 80,
    topic: "Costing", subtopic: "Job Costing",
    paperUrl: secPaper(2022), paperPage: 8,
    markingSchemeUrl: secMs(2022), markingSchemePage: 17,
    timingMinutes: 36, notes: "Job cost statement with overhead absorption",
  },

  // ─── CASH BUDGET — Q9 ─────────────────────────────────────────────
  {
    id: "2023_Q9_cashbudget",
    year: 2023, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Cash Budget",
    paperUrl: secPaper(2023), paperPage: 9,
    markingSchemeUrl: secMs(2023), markingSchemePage: 19,
    timingMinutes: 36, notes: "Three-month cash budget with debtors and creditors lag",
  },
  {
    id: "2022_Q9_flexiblebudget",
    year: 2022, questionNumber: 9, section: 3, marks: 80,
    topic: "Budgeting", subtopic: "Flexible Budget",
    paperUrl: secPaper(2022), paperPage: 9,
    markingSchemeUrl: secMs(2022), markingSchemePage: 19,
    timingMinutes: 36, notes: "Flexible budget with variance analysis",
  },

  // ─── CONTROL ACCOUNTS ─────────────────────────────────────────────
  {
    id: "2022_Q2_control",
    year: 2022, questionNumber: 2, section: 1, marks: 60,
    topic: "Control Accounts", subtopic: "Debtors Control Account",
    paperUrl: secPaper(2022), paperPage: 2,
    markingSchemeUrl: secMs(2022), markingSchemePage: 4,
    timingMinutes: 27, notes: "Debtors control with contra entries",
  },

  // ─── DEPRECIATION ─────────────────────────────────────────────────
  {
    id: "2021_Q3_depreciation",
    year: 2021, questionNumber: 3, section: 1, marks: 60,
    topic: "Depreciation", subtopic: "Depreciation and Disposal",
    paperUrl: secPaper(2021), paperPage: 2,
    markingSchemeUrl: secMs(2021), markingSchemePage: 5,
    timingMinutes: 27, notes: "Straight line and reducing balance, asset disposal",
  },
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
