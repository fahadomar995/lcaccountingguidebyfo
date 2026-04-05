import { Wrench, Landmark, Briefcase, BarChart3, Banknote, Clock, PieChart, CheckSquare, CalendarDays, type LucideIcon } from "lucide-react";

export interface LearnModule {
  id: number;
  title: string;
  icon: LucideIcon;
  lessons: { title: string; steps: number }[];
  color: string;
}

export const LEARN_MODULES: LearnModule[] = [
  {
    id: 1, title: "Correction of Errors", icon: Wrench, color: "hsl(0, 72%, 51%)",
    lessons: [
      { title: "Types of Errors", steps: 4 },
      { title: "Suspense Account", steps: 3 },
      { title: "Correcting Journal Entries", steps: 5 },
      { title: "Corrected Trial Balance", steps: 3 },
      { title: "Corrected P&L & Balance Sheet", steps: 4 },
      { title: "Practice Questions", steps: 3 },
    ]
  },
  {
    id: 2, title: "Club Accounts", icon: Landmark, color: "hsl(142, 72%, 29%)",
    lessons: [
      { title: "Accumulated Fund", steps: 3 },
      { title: "Subscriptions Account", steps: 4 },
      { title: "Special Purpose P&L", steps: 3 },
      { title: "Income & Expenditure", steps: 5 },
      { title: "Closing Balance Sheet", steps: 3 },
      { title: "Levy & Life Membership", steps: 3 },
      { title: "Practice Questions", steps: 2 },
    ]
  },
  {
    id: 3, title: "Service Firm Accounts", icon: "💼", color: "hsl(217, 91%, 60%)",
    lessons: [
      { title: "Statement of Capital", steps: 3 },
      { title: "Fee Income & Expenses", steps: 4 },
      { title: "Income & Expenditure Account", steps: 4 },
      { title: "Closing Balance Sheet", steps: 3 },
      { title: "Depreciation & Adjustments", steps: 4 },
      { title: "Practice Questions", steps: 2 },
    ]
  },
  {
    id: 4, title: "Published Accounts", icon: "📊", color: "hsl(270, 60%, 50%)",
    lessons: [
      { title: "Companies Act Requirements", steps: 3 },
      { title: "Published P&L", steps: 5 },
      { title: "Published Balance Sheet", steps: 5 },
      { title: "Notes to Accounts", steps: 4 },
      { title: "Audit & Directors Report", steps: 3 },
      { title: "Practice Questions", steps: 2 },
    ]
  },
  {
    id: 5, title: "Cash Flow Statement", icon: "💰", color: "hsl(38, 92%, 50%)",
    lessons: [
      { title: "Cash vs Profit", steps: 3 },
      { title: "Operating Activities", steps: 4 },
      { title: "Returns & Servicing", steps: 3 },
      { title: "Capital & Financial", steps: 4 },
      { title: "Reconciliation", steps: 3 },
      { title: "Practice Questions", steps: 2 },
    ]
  }
];

// ═══════════════════════════════════════════════════
// CLASSIFY — 10 Categories
// ═══════════════════════════════════════════════════

export type ClassifyCategory =
  | "Trading Account"
  | "P&L (Administration)"
  | "P&L (Selling & Distribution)"
  | "BS Fixed Assets"
  | "BS Current Assets"
  | "BS Creditors < 1 Year"
  | "BS Creditors > 1 Year"
  | "BS Capital & Reserves"
  | "Manufacturing Account"
  | "NOT in any account";

export const CLASSIFY_CATEGORIES: ClassifyCategory[] = [
  "Trading Account",
  "P&L (Administration)",
  "P&L (Selling & Distribution)",
  "BS Fixed Assets",
  "BS Current Assets",
  "BS Creditors < 1 Year",
  "BS Creditors > 1 Year",
  "BS Capital & Reserves",
  "Manufacturing Account",
  "NOT in any account",
];

export interface ClassifyItem {
  item: string;
  answer: ClassifyCategory;
  hint?: string;
}

export const CLASSIFY_ITEMS: ClassifyItem[] = [
  // Trading Account
  { item: "Sales", answer: "Trading Account" },
  { item: "Purchases", answer: "Trading Account" },
  { item: "Opening Stock", answer: "Trading Account" },
  { item: "Closing Stock", answer: "Trading Account" },
  { item: "Returns Inwards", answer: "Trading Account" },
  { item: "Returns Outwards", answer: "Trading Account" },
  { item: "Carriage Inwards", answer: "Trading Account" },
  { item: "Customs Duty", answer: "Trading Account" },
  { item: "Import Levies", answer: "Trading Account" },
  { item: "Cost of Sales", answer: "Trading Account" },
  { item: "Gross Profit", answer: "Trading Account", hint: "Balancing figure in the Trading Account" },
  { item: "Discount Received (Trade)", answer: "Trading Account", hint: "Trade discount reduces cost of purchases" },

  // P&L (Administration)
  { item: "Salaries", answer: "P&L (Administration)" },
  { item: "Rent Expense", answer: "P&L (Administration)" },
  { item: "Insurance", answer: "P&L (Administration)" },
  { item: "Light & Heat", answer: "P&L (Administration)" },
  { item: "Telephone", answer: "P&L (Administration)" },
  { item: "Postage", answer: "P&L (Administration)" },
  { item: "Stationery", answer: "P&L (Administration)" },
  { item: "Cleaning", answer: "P&L (Administration)" },
  { item: "Repairs", answer: "P&L (Administration)" },
  { item: "Bad Debts", answer: "P&L (Administration)" },
  { item: "Provision for Bad Debts (Increase)", answer: "P&L (Administration)" },
  { item: "Provision for Bad Debts (Decrease)", answer: "P&L (Administration)", hint: "Credit side — reduces expenses" },
  { item: "Depreciation", answer: "P&L (Administration)" },
  { item: "Bank Charges", answer: "P&L (Administration)" },
  { item: "Interest Paid", answer: "P&L (Administration)" },
  { item: "Professional Fees", answer: "P&L (Administration)" },
  { item: "General Expenses", answer: "P&L (Administration)" },
  { item: "Audit Fee", answer: "P&L (Administration)" },
  { item: "Loss on Sale of Fixed Asset", answer: "P&L (Administration)" },
  { item: "Profit on Sale of Fixed Asset", answer: "P&L (Administration)", hint: "Credit side — reduces admin expenses" },
  { item: "Discount Allowed", answer: "P&L (Administration)" },
  { item: "Discount Received", answer: "P&L (Administration)", hint: "Credit side — cash discount" },
  { item: "Rent Received", answer: "P&L (Administration)", hint: "Credit side — income" },
  { item: "Interest Received", answer: "P&L (Administration)", hint: "Credit side — income" },
  { item: "Investment Income", answer: "P&L (Administration)", hint: "Credit side — income" },
  { item: "Commission Received", answer: "P&L (Administration)", hint: "Credit side — income" },
  { item: "Patent Written Off", answer: "P&L (Administration)" },
  { item: "Goodwill Written Off", answer: "P&L (Administration)" },

  // P&L (Selling & Distribution)
  { item: "Carriage Outwards", answer: "P&L (Selling & Distribution)" },
  { item: "Advertising", answer: "P&L (Selling & Distribution)" },
  { item: "Sales Representatives' Salaries", answer: "P&L (Selling & Distribution)" },
  { item: "Sales Commission Paid", answer: "P&L (Selling & Distribution)" },
  { item: "Packaging & Delivery Costs", answer: "P&L (Selling & Distribution)" },
  { item: "Motor Expenses", answer: "P&L (Selling & Distribution)", hint: "If sales-related vehicles" },
  { item: "Exhibition Costs", answer: "P&L (Selling & Distribution)" },
  { item: "Samples", answer: "P&L (Selling & Distribution)" },

  // BS Fixed Assets
  { item: "Premises", answer: "BS Fixed Assets" },
  { item: "Machinery", answer: "BS Fixed Assets" },
  { item: "Motor Vehicles", answer: "BS Fixed Assets" },
  { item: "Office Equipment", answer: "BS Fixed Assets" },
  { item: "Fixtures & Fittings", answer: "BS Fixed Assets" },
  { item: "Land", answer: "BS Fixed Assets" },
  { item: "Goodwill (BS)", answer: "BS Fixed Assets", hint: "Intangible asset — until written off" },
  { item: "Patents (BS)", answer: "BS Fixed Assets", hint: "Intangible asset" },
  { item: "Investments (Long-Term)", answer: "BS Fixed Assets" },
  { item: "Accumulated Depreciation", answer: "BS Fixed Assets", hint: "Deducted from cost to give NBV" },

  // BS Current Assets
  { item: "Closing Stock (BS)", answer: "BS Current Assets" },
  { item: "Debtors", answer: "BS Current Assets" },
  { item: "Cash at Bank", answer: "BS Current Assets" },
  { item: "Cash in Hand", answer: "BS Current Assets" },
  { item: "Prepaid Insurance", answer: "BS Current Assets" },
  { item: "Prepaid Rent", answer: "BS Current Assets" },
  { item: "Prepaid Rates", answer: "BS Current Assets" },
  { item: "Petty Cash", answer: "BS Current Assets" },
  { item: "Investment Income Due", answer: "BS Current Assets", hint: "Debtor — income earned but not received" },
  { item: "Fees Due (Service Firm)", answer: "BS Current Assets" },
  { item: "Subscriptions Due (Club)", answer: "BS Current Assets" },
  { item: "Short-Term Investments", answer: "BS Current Assets" },
  { item: "Work in Progress", answer: "BS Current Assets" },

  // BS Creditors < 1 Year
  { item: "Creditors", answer: "BS Creditors < 1 Year" },
  { item: "Bank Overdraft", answer: "BS Creditors < 1 Year" },
  { item: "Accrued Expenses", answer: "BS Creditors < 1 Year" },
  { item: "VAT Owed", answer: "BS Creditors < 1 Year" },
  { item: "PAYE/PRSI Owed", answer: "BS Creditors < 1 Year" },
  { item: "Income Tax Owed", answer: "BS Creditors < 1 Year" },
  { item: "Corporation Tax Owed", answer: "BS Creditors < 1 Year" },
  { item: "Dividends Proposed", answer: "BS Creditors < 1 Year" },
  { item: "Deferred Income", answer: "BS Creditors < 1 Year" },
  { item: "Subscriptions in Advance (Club)", answer: "BS Creditors < 1 Year", hint: "Money received for next year" },
  { item: "Fees in Advance (Service Firm)", answer: "BS Creditors < 1 Year" },

  // BS Creditors > 1 Year
  { item: "Bank Loan (Long-Term)", answer: "BS Creditors > 1 Year" },
  { item: "Mortgage", answer: "BS Creditors > 1 Year" },
  { item: "Debentures", answer: "BS Creditors > 1 Year" },
  { item: "Long-Term Loan", answer: "BS Creditors > 1 Year" },
  { item: "Levy Fund (Club)", answer: "BS Creditors > 1 Year", hint: "Reserve for special project" },
  { item: "Life Membership Fund (Club)", answer: "BS Creditors > 1 Year" },

  // BS Capital & Reserves
  { item: "Capital", answer: "BS Capital & Reserves" },
  { item: "Accumulated Fund (Club)", answer: "BS Capital & Reserves", hint: "Club equivalent of Capital" },
  { item: "Ordinary Share Capital", answer: "BS Capital & Reserves" },
  { item: "Preference Share Capital", answer: "BS Capital & Reserves" },
  { item: "Share Premium", answer: "BS Capital & Reserves" },
  { item: "Revaluation Reserve", answer: "BS Capital & Reserves" },
  { item: "General Reserve", answer: "BS Capital & Reserves" },
  { item: "Retained Profits", answer: "BS Capital & Reserves" },
  { item: "Revenue Reserves", answer: "BS Capital & Reserves" },
  { item: "Capital Reserves", answer: "BS Capital & Reserves" },

  // Manufacturing Account
  { item: "Raw Materials Purchased", answer: "Manufacturing Account" },
  { item: "Direct Labour", answer: "Manufacturing Account" },
  { item: "Direct Expenses", answer: "Manufacturing Account" },
  { item: "Factory Rent", answer: "Manufacturing Account" },
  { item: "Factory Insurance", answer: "Manufacturing Account" },
  { item: "Factory Power", answer: "Manufacturing Account" },
  { item: "Depreciation of Factory Machinery", answer: "Manufacturing Account" },
  { item: "Factory Maintenance", answer: "Manufacturing Account" },
  { item: "Indirect Factory Wages", answer: "Manufacturing Account" },
  { item: "Factory Rates", answer: "Manufacturing Account" },
  { item: "Opening Raw Materials", answer: "Manufacturing Account" },
  { item: "Closing Raw Materials", answer: "Manufacturing Account" },
  { item: "Prime Cost", answer: "Manufacturing Account", hint: "Direct Materials + Direct Labour + Direct Expenses" },

  // NOT in any account
  { item: "Drawings", answer: "NOT in any account", hint: "Deducted directly from Capital on BS — not an expense" },
  { item: "Capital Introduced", answer: "NOT in any account", hint: "Added directly to Capital on BS" },
  { item: "Receipts from Debtors", answer: "NOT in any account", hint: "Cash movement only — already recorded as sales" },
  { item: "Payments to Creditors", answer: "NOT in any account", hint: "Cash movement only — already recorded as purchases" },
  { item: "Cash Sales (already recorded)", answer: "NOT in any account", hint: "Already in Sales figure" },
  { item: "Bank Lodgement", answer: "NOT in any account", hint: "Internal transfer — no effect on profit or BS total" },
  { item: "Petty Cash Reimbursement", answer: "NOT in any account", hint: "Internal transfer between cash and bank" },
];

// ═══════════════════════════════════════════════════
// LAYOUTS — 11 Templates
// ═══════════════════════════════════════════════════

export interface LayoutFormat {
  id: string;
  title: string;
  section: string;
  columns: string[];
  rows: { label: string; values: string[]; isTotal?: boolean; isSubtotal?: boolean; indent?: boolean }[];
  tips: string[];
}

export const LAYOUT_FORMATS: LayoutFormat[] = [
  {
    id: "trading-st", title: "Trading P&L (Sole Trader)", section: "Q1",
    columns: ["€", "€"],
    rows: [
      { label: "Sales", values: ["", "X"] },
      { label: "Less: Returns Inwards", values: ["", "(X)"] },
      { label: "Net Sales", values: ["", "X"], isSubtotal: true },
      { label: "Less: Cost of Sales", values: ["", ""] },
      { label: "Opening Stock", values: ["X", ""], indent: true },
      { label: "Add: Purchases", values: ["X", ""], indent: true },
      { label: "Add: Carriage Inwards", values: ["X", ""], indent: true },
      { label: "Less: Returns Outwards", values: ["(X)", ""], indent: true },
      { label: "Net Purchases", values: ["X", ""], indent: true },
      { label: "Goods Available for Sale", values: ["X", ""], isSubtotal: true },
      { label: "Less: Closing Stock", values: ["(X)", ""] },
      { label: "Cost of Sales", values: ["", "(X)"] },
      { label: "Gross Profit", values: ["", "X"], isSubtotal: true },
      { label: "Add: Income (Rent Received, etc.)", values: ["", "X"] },
      { label: "Less: Expenses", values: ["", ""] },
      { label: "Wages & Salaries", values: ["X", ""], indent: true },
      { label: "Rent", values: ["X", ""], indent: true },
      { label: "Insurance", values: ["X", ""], indent: true },
      { label: "Light & Heat", values: ["X", ""], indent: true },
      { label: "Depreciation", values: ["X", ""], indent: true },
      { label: "Bad Debts", values: ["X", ""], indent: true },
      { label: "General Expenses", values: ["X", ""], indent: true },
      { label: "Total Expenses", values: ["", "(X)"] },
      { label: "Net Profit", values: ["", "X"], isTotal: true },
    ],
    tips: ["Carriage Inwards is a Trading Account item", "Carriage Outwards is a P&L expense", "Drawings are NOT an expense — deducted from Capital on BS"]
  },
  {
    id: "trading-plc", title: "Trading P&L (Published Company)", section: "Q4",
    columns: ["€", "€"],
    rows: [
      { label: "Turnover", values: ["", "X"] },
      { label: "Cost of Sales", values: ["", "(X)"] },
      { label: "Gross Profit", values: ["", "X"], isSubtotal: true },
      { label: "Distribution Costs", values: ["(X)", ""] },
      { label: "Administrative Expenses", values: ["(X)", ""] },
      { label: "", values: ["", "(X)"] },
      { label: "Operating Profit", values: ["", "X"], isSubtotal: true },
      { label: "Investment Income", values: ["X", ""] },
      { label: "Interest Payable", values: ["(X)", ""] },
      { label: "", values: ["", "X"] },
      { label: "Profit Before Tax", values: ["", "X"], isSubtotal: true },
      { label: "Corporation Tax", values: ["", "(X)"] },
      { label: "Profit After Tax", values: ["", "X"], isTotal: true },
    ],
    tips: ["Cost of Sales = Opening Stock + Purchases − Closing Stock", "Distribution = Carriage Out, Advertising, Salespeople Salaries", "Admin = Office costs, Depreciation, Bad Debts, Audit Fee"]
  },
  {
    id: "bs-st", title: "Balance Sheet (Sole Trader)", section: "Q1",
    columns: ["€", "€"],
    rows: [
      { label: "Fixed Assets", values: ["", ""] },
      { label: "Premises", values: ["X", ""], indent: true },
      { label: "Equipment", values: ["X", ""], indent: true },
      { label: "Motor Vehicles", values: ["X", ""], indent: true },
      { label: "Less: Accumulated Depreciation", values: ["(X)", ""] },
      { label: "Net Fixed Assets", values: ["", "X"], isSubtotal: true },
      { label: "Current Assets", values: ["", ""] },
      { label: "Closing Stock", values: ["X", ""], indent: true },
      { label: "Debtors", values: ["X", ""], indent: true },
      { label: "Prepayments", values: ["X", ""], indent: true },
      { label: "Bank", values: ["X", ""], indent: true },
      { label: "Cash", values: ["X", ""], indent: true },
      { label: "", values: ["X", ""] },
      { label: "Less: Current Liabilities", values: ["", ""] },
      { label: "Creditors", values: ["X", ""], indent: true },
      { label: "Accruals", values: ["X", ""], indent: true },
      { label: "Bank Overdraft", values: ["X", ""], indent: true },
      { label: "", values: ["(X)", ""] },
      { label: "Working Capital", values: ["", "X"], isSubtotal: true },
      { label: "Total Net Assets", values: ["", "X"], isSubtotal: true },
      { label: "Financed By:", values: ["", ""] },
      { label: "Opening Capital", values: ["", "X"] },
      { label: "Add: Net Profit", values: ["", "X"] },
      { label: "Less: Drawings", values: ["", "(X)"] },
      { label: "Closing Capital", values: ["", "X"], isTotal: true },
    ],
    tips: ["Total Net Assets MUST equal Closing Capital", "Prepayments are current assets", "Accruals are current liabilities"]
  },
  {
    id: "balance-sheet-plc", title: "Balance Sheet (Published Company)", section: "Q4",
    columns: ["€", "€"],
    rows: [
      { label: "Fixed Assets (Net Book Value)", values: ["", "X"] },
      { label: "Current Assets", values: ["", ""] },
      { label: "Stock", values: ["X", ""], indent: true },
      { label: "Debtors", values: ["X", ""], indent: true },
      { label: "Cash", values: ["X", ""], indent: true },
      { label: "", values: ["", "X"], isSubtotal: true },
      { label: "Creditors: Amounts < 1 year", values: ["", "(X)"] },
      { label: "Net Current Assets", values: ["", "X"], isSubtotal: true },
      { label: "Total Assets less Current Liabilities", values: ["", "X"], isSubtotal: true },
      { label: "Creditors: Amounts > 1 year", values: ["", "(X)"] },
      { label: "Net Assets", values: ["", "X"], isTotal: true },
      { label: "Capital and Reserves", values: ["", ""] },
      { label: "Ordinary Share Capital", values: ["X", ""], indent: true },
      { label: "Share Premium", values: ["X", ""], indent: true },
      { label: "Retained Profits", values: ["X", ""], indent: true },
      { label: "Shareholders' Funds", values: ["", "X"], isTotal: true },
    ],
    tips: ["Net Assets MUST equal Shareholders' Funds", "Creditors < 1 year includes bank overdraft, creditors, tax, dividends proposed"]
  },
  {
    id: "manufacturing", title: "Manufacturing Account", section: "Q1",
    columns: ["€", "€"],
    rows: [
      { label: "Opening Stock of Raw Materials", values: ["X", ""] },
      { label: "Add: Purchases of Raw Materials", values: ["X", ""] },
      { label: "Less: Closing Stock of Raw Materials", values: ["(X)", ""] },
      { label: "Cost of Raw Materials Used", values: ["", "X"], isSubtotal: true },
      { label: "Direct Labour (Factory Wages)", values: ["", "X"] },
      { label: "Direct Expenses", values: ["", "X"] },
      { label: "Prime Cost", values: ["", "X"], isSubtotal: true },
      { label: "Add: Factory Overheads", values: ["", ""] },
      { label: "Factory Rent", values: ["X", ""], indent: true },
      { label: "Factory Insurance", values: ["X", ""], indent: true },
      { label: "Factory Power", values: ["X", ""], indent: true },
      { label: "Dep'n of Factory Machinery", values: ["X", ""], indent: true },
      { label: "Indirect Factory Wages", values: ["X", ""], indent: true },
      { label: "Total Factory Overheads", values: ["", "X"] },
      { label: "Factory Cost of Production", values: ["", "X"], isSubtotal: true },
      { label: "Add: Opening WIP", values: ["", "X"] },
      { label: "Less: Closing WIP", values: ["", "(X)"] },
      { label: "Cost of Finished Goods", values: ["", "X"], isTotal: true },
    ],
    tips: ["Prime Cost = Direct Materials + Direct Labour + Direct Expenses", "WIP = Work in Progress (partially completed goods)", "Cost of Finished Goods transfers to Trading Account"]
  },
  {
    id: "cash-flow-stmt", title: "Cash Flow Statement", section: "Q3",
    columns: ["€", "€"],
    rows: [
      { label: "Operating Profit", values: ["", "X"] },
      { label: "Add: Depreciation", values: ["X", ""] },
      { label: "Add/Less: Stock change", values: ["X/(X)", ""] },
      { label: "Add/Less: Debtors change", values: ["X/(X)", ""] },
      { label: "Add/Less: Creditors change", values: ["X/(X)", ""] },
      { label: "Net Cash from Operations", values: ["", "X"], isSubtotal: true },
      { label: "Returns on Investments & Servicing", values: ["", ""] },
      { label: "Interest paid", values: ["(X)", ""] },
      { label: "Dividends paid", values: ["(X)", ""] },
      { label: "", values: ["", "(X)"] },
      { label: "Capital Expenditure", values: ["", ""] },
      { label: "Purchase of Fixed Assets", values: ["(X)", ""] },
      { label: "Sale of Fixed Assets", values: ["X", ""] },
      { label: "", values: ["", "X/(X)"] },
      { label: "Net Cash Flow", values: ["", "X"], isTotal: true },
    ],
    tips: ["Stock increase = LESS cash (debit balance grew)", "Debtors increase = LESS cash (money owed grew)", "Creditors increase = MORE cash (delayed payments)"]
  },
  {
    id: "published-bs", title: "Published Balance Sheet", section: "Q4",
    columns: ["This Year €", "Last Year €"],
    rows: [
      { label: "Fixed Assets", values: ["", ""] },
      { label: "Intangible Assets", values: ["X", "X"], indent: true },
      { label: "Tangible Assets", values: ["X", "X"], indent: true },
      { label: "Financial Assets", values: ["X", "X"], indent: true },
      { label: "", values: ["X", "X"], isSubtotal: true },
      { label: "Current Assets", values: ["", ""] },
      { label: "Stock", values: ["X", "X"], indent: true },
      { label: "Debtors", values: ["X", "X"], indent: true },
      { label: "Cash at Bank and in Hand", values: ["X", "X"], indent: true },
      { label: "", values: ["X", "X"], isSubtotal: true },
      { label: "Creditors: Amounts falling due within 1 year", values: ["(X)", "(X)"] },
      { label: "Net Current Assets", values: ["X", "X"], isSubtotal: true },
      { label: "Total Assets less Current Liabilities", values: ["X", "X"], isSubtotal: true },
      { label: "Creditors: Amounts falling due after 1 year", values: ["(X)", "(X)"] },
      { label: "Net Assets", values: ["X", "X"], isTotal: true },
      { label: "Capital and Reserves", values: ["", ""] },
      { label: "Called-up Share Capital", values: ["X", "X"], indent: true },
      { label: "Share Premium", values: ["X", "X"], indent: true },
      { label: "Revaluation Reserve", values: ["X", "X"], indent: true },
      { label: "Profit and Loss Account", values: ["X", "X"], indent: true },
      { label: "Shareholders' Funds", values: ["X", "X"], isTotal: true },
    ],
    tips: ["Must show comparative figures (this year and last year)", "Net Assets = Shareholders' Funds"]
  },
  {
    id: "club-ie", title: "Club Income & Expenditure", section: "Q2",
    columns: ["€", "€"],
    rows: [
      { label: "Income", values: ["", ""] },
      { label: "Subscriptions", values: ["", "X"] },
      { label: "Profit on Special Event", values: ["", "X"] },
      { label: "Fundraising Income", values: ["", "X"] },
      { label: "Investment Income", values: ["", "X"] },
      { label: "Total Income", values: ["", "X"], isSubtotal: true },
      { label: "Less: Expenditure", values: ["", ""] },
      { label: "Wages", values: ["X", ""], indent: true },
      { label: "Rent & Rates", values: ["X", ""], indent: true },
      { label: "Insurance", values: ["X", ""], indent: true },
      { label: "Light & Heat", values: ["X", ""], indent: true },
      { label: "Repairs & Maintenance", values: ["X", ""], indent: true },
      { label: "Depreciation", values: ["X", ""], indent: true },
      { label: "Printing & Stationery", values: ["X", ""], indent: true },
      { label: "Total Expenditure", values: ["", "(X)"] },
      { label: "Surplus / (Deficit)", values: ["", "X"], isTotal: true },
    ],
    tips: ["Subscriptions must be on accruals basis", "Surplus is added to Accumulated Fund on BS", "Special event profit comes from a separate P&L"]
  },
  {
    id: "club-bs", title: "Club Balance Sheet", section: "Q2",
    columns: ["€", "€"],
    rows: [
      { label: "Fixed Assets (NBV)", values: ["", "X"] },
      { label: "Current Assets", values: ["", ""] },
      { label: "Stock (supplies)", values: ["X", ""], indent: true },
      { label: "Subscriptions Due", values: ["X", ""], indent: true },
      { label: "Prepayments", values: ["X", ""], indent: true },
      { label: "Bank", values: ["X", ""], indent: true },
      { label: "Cash", values: ["X", ""], indent: true },
      { label: "", values: ["", "X"], isSubtotal: true },
      { label: "Less: Current Liabilities", values: ["", ""] },
      { label: "Creditors", values: ["X", ""], indent: true },
      { label: "Accruals", values: ["X", ""], indent: true },
      { label: "Subscriptions in Advance", values: ["X", ""], indent: true },
      { label: "", values: ["", "(X)"] },
      { label: "Net Current Assets", values: ["", "X"], isSubtotal: true },
      { label: "Less: Long-Term Liabilities", values: ["", ""] },
      { label: "Levy Fund", values: ["", "(X)"], indent: true },
      { label: "Life Membership Fund", values: ["", "(X)"], indent: true },
      { label: "Net Assets", values: ["", "X"], isTotal: true },
      { label: "Financed By:", values: ["", ""] },
      { label: "Opening Accumulated Fund", values: ["", "X"] },
      { label: "Add: Surplus for Year", values: ["", "X"] },
      { label: "Closing Accumulated Fund", values: ["", "X"], isTotal: true },
    ],
    tips: ["Accumulated Fund = Club's net worth (like Capital)", "Subscriptions Due = current asset (debtor)", "Subscriptions in Advance = current liability"]
  },
  {
    id: "service-ie", title: "Service Firm I&E", section: "Q2",
    columns: ["€", "€"],
    rows: [
      { label: "Fee Income", values: ["", "X"] },
      { label: "Less: Expenses", values: ["", ""] },
      { label: "Salaries", values: ["X", ""], indent: true },
      { label: "Rent", values: ["X", ""], indent: true },
      { label: "Insurance", values: ["X", ""], indent: true },
      { label: "Light & Heat", values: ["X", ""], indent: true },
      { label: "Telephone", values: ["X", ""], indent: true },
      { label: "Motor Expenses", values: ["X", ""], indent: true },
      { label: "Depreciation", values: ["X", ""], indent: true },
      { label: "Bad Debts", values: ["X", ""], indent: true },
      { label: "General Expenses", values: ["X", ""], indent: true },
      { label: "Total Expenses", values: ["", "(X)"] },
      { label: "Net Profit / (Loss)", values: ["", "X"], isTotal: true },
    ],
    tips: ["No Trading Account — service firms have no stock", "Fee income is the main revenue source", "Adjust fees for amounts due and received in advance"]
  },
  {
    id: "mcs", title: "Marginal Costing Statement", section: "Q8",
    columns: ["Per Unit €", "Total €"],
    rows: [
      { label: "Sales", values: ["X", "X"] },
      { label: "Less: Variable Costs", values: ["", ""] },
      { label: "Materials", values: ["(X)", "(X)"], indent: true },
      { label: "Direct Labour", values: ["(X)", "(X)"], indent: true },
      { label: "Variable O/H", values: ["(X)", "(X)"], indent: true },
      { label: "Total Variable Costs", values: ["(X)", "(X)"], isSubtotal: true },
      { label: "Contribution", values: ["X", "X"], isSubtotal: true },
      { label: "Less: Fixed Costs", values: ["", "(X)"] },
      { label: "Profit/Loss", values: ["", "X"], isTotal: true },
    ],
    tips: ["Contribution = Sales − Variable Costs ONLY", "BEP = Fixed Costs ÷ Unit Contribution", "MoS = Actual Sales − BEP"]
  },
  {
    id: "cash-budget", title: "Cash Budget (6 months)", section: "Q9",
    columns: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    rows: [
      { label: "Opening Balance", values: ["X","X","X","X","X","X"] },
      { label: "Add: Receipts", values: ["","","","","",""] },
      { label: "Cash Sales", values: ["X","X","X","X","X","X"], indent: true },
      { label: "Credit Receipts", values: ["X","X","X","X","X","X"], indent: true },
      { label: "Total Receipts", values: ["X","X","X","X","X","X"], isSubtotal: true },
      { label: "Less: Payments", values: ["","","","","",""] },
      { label: "Purchases", values: ["(X)","(X)","(X)","(X)","(X)","(X)"], indent: true },
      { label: "Wages", values: ["(X)","(X)","(X)","(X)","(X)","(X)"], indent: true },
      { label: "Overheads", values: ["(X)","(X)","(X)","(X)","(X)","(X)"], indent: true },
      { label: "Total Payments", values: ["(X)","(X)","(X)","(X)","(X)","(X)"], isSubtotal: true },
      { label: "Closing Balance", values: ["X","X","X","X","X","X"], isTotal: true },
    ],
    tips: ["Depreciation is NEVER in a cash budget — it's a non-cash item", "Opening balance of one month = Closing balance of previous month", "Equipment purchase goes in the month it's PAID for"]
  },
  {
    id: "job-cost", title: "Job Cost Sheet", section: "Q8",
    columns: ["€"],
    rows: [
      { label: "Direct Materials", values: ["X"] },
      { label: "Direct Labour", values: ["X"] },
      { label: "Prime Cost", values: ["X"], isSubtotal: true },
      { label: "Production Overheads Absorbed", values: ["X"] },
      { label: "Total Production Cost", values: ["X"], isSubtotal: true },
      { label: "Admin & Selling O/H", values: ["X"] },
      { label: "Total Cost", values: ["X"], isSubtotal: true },
      { label: "Profit (X% mark-up)", values: ["X"] },
      { label: "Selling Price", values: ["X"], isTotal: true },
    ],
    tips: ["Overheads = Hours worked × OAR per hour", "Mark-up is on COST, Margin is on SALES", "Each department may have a different OAR"]
  },
];

// ═══════════════════════════════════════════════════
// FORMULAS
// ═══════════════════════════════════════════════════

export interface Formula {
  name: string;
  formula: string;
  section: string;
  notes?: string;
}

export const FORMULAS: Formula[] = [
  { name: "Return on Capital Employed (ROCE)", formula: "Operating Profit / Capital Employed × 100", section: "Profitability" },
  { name: "Gross Profit Margin", formula: "Gross Profit / Sales × 100", section: "Profitability" },
  { name: "Net Profit Margin", formula: "Net Profit / Sales × 100", section: "Profitability" },
  { name: "Mark-Up", formula: "Gross Profit / Cost of Sales × 100", section: "Profitability" },
  { name: "Earnings Per Share (EPS)", formula: "Profit After Tax / Number of Ordinary Shares", section: "Profitability" },
  { name: "Current Ratio", formula: "Current Assets / Current Liabilities", section: "Liquidity", notes: "Ideal: 2:1" },
  { name: "Acid Test Ratio", formula: "(Current Assets − Stock) / Current Liabilities", section: "Liquidity", notes: "Ideal: 1:1" },
  { name: "Stock Turnover", formula: "Cost of Sales / Average Stock", section: "Efficiency", notes: "Higher = better" },
  { name: "Debtors Collection Period", formula: "Debtors / Credit Sales × 365", section: "Efficiency", notes: "Lower = better" },
  { name: "Creditors Payment Period", formula: "Creditors / Credit Purchases × 365", section: "Efficiency" },
  { name: "Gearing Ratio", formula: "Long-Term Liabilities / Capital Employed × 100", section: "Gearing", notes: "Below 50% = low geared" },
  { name: "Interest Cover", formula: "Operating Profit / Interest Payable", section: "Gearing", notes: "Higher = safer" },
  { name: "Debt/Equity Ratio", formula: "Long-Term Liabilities / Shareholders' Funds × 100", section: "Gearing" },
  { name: "Dividend Yield", formula: "DPS / Market Price × 100", section: "Investment" },
  { name: "Dividend Cover", formula: "EPS / DPS", section: "Investment", notes: "Higher = more retained" },
  { name: "P/E Ratio", formula: "Market Price / EPS", section: "Investment", notes: "Higher = more expensive" },
  { name: "Net Asset Value Per Share", formula: "Net Assets / Number of Ordinary Shares", section: "Investment" },
  { name: "Return on Equity (ROE)", formula: "Profit After Tax / Shareholders' Funds × 100", section: "Profitability" },
  { name: "Working Capital", formula: "Current Assets − Current Liabilities", section: "Liquidity" },
  { name: "Break-Even Point (units)", formula: "Fixed Costs / Unit Contribution", section: "Costing" },
  { name: "Break-Even Point (€)", formula: "BEP units × Selling Price", section: "Costing" },
  { name: "Margin of Safety (units)", formula: "Actual Sales − BEP", section: "Costing" },
  { name: "Margin of Safety (%)", formula: "MoS units / Actual Sales × 100", section: "Costing" },
  { name: "Contribution", formula: "Sales − Variable Costs", section: "Costing" },
  { name: "Contribution/Sales Ratio", formula: "Contribution / Sales × 100", section: "Costing" },
  { name: "BEP (using C/S Ratio)", formula: "Fixed Costs / C/S Ratio", section: "Costing" },
  { name: "Target Profit (units)", formula: "(Fixed Costs + Target Profit) / Unit Contribution", section: "Costing" },
  { name: "Variable Cost per Unit (High/Low)", formula: "Change in Cost / Change in Activity", section: "Costing" },
  { name: "Overhead Absorption Rate", formula: "Budgeted Overheads / Budgeted Activity", section: "Costing" },
  { name: "Straight Line Depreciation", formula: "(Cost − Residual Value) / Useful Life", section: "Depreciation" },
  { name: "Reducing Balance Depreciation", formula: "NBV × Rate%", section: "Depreciation" },
];

// ═══════════════════════════════════════════════════
// Q1 ADJUSTMENTS
// ═══════════════════════════════════════════════════

export interface Q1Adjustment {
  name: string;
  type: string;
  debit: string;
  credit: string;
  effect: string;
  example: string;
  accountTypes: string[];
}

export const Q1_ADJUSTMENTS: Q1Adjustment[] = [
  { name: "Closing Stock", type: "Year-End", debit: "Stock (BS)", credit: "Trading A/c", effect: "Increases GP, appears as current asset", example: "Closing stock €15,000", accountTypes: ["Sole Trader","Company","Manufacturing"] },
  { name: "Depreciation", type: "Year-End", debit: "Depreciation Expense (P&L)", credit: "Provision for Depreciation (BS)", effect: "Reduces NP and NBV of asset", example: "Depreciate machinery 10% SL", accountTypes: ["Sole Trader","Company","Manufacturing"] },
  { name: "Accrued Expenses", type: "Year-End", debit: "Expense (P&L)", credit: "Accruals (BS — CL)", effect: "Increases expense, adds to creditors", example: "Electricity due €400", accountTypes: ["Sole Trader","Company","Manufacturing"] },
  { name: "Prepaid Expenses", type: "Year-End", debit: "Prepayments (BS — CA)", credit: "Expense (P&L)", effect: "Reduces expense, adds to debtors", example: "Insurance prepaid €600", accountTypes: ["Sole Trader","Company","Manufacturing"] },
  { name: "Accrued Income", type: "Year-End", debit: "Accrued Income (BS — CA)", credit: "Income (P&L)", effect: "Increases income, adds to debtors", example: "Rent due but not received €500", accountTypes: ["Sole Trader","Company"] },
  { name: "Bad Debts Write Off", type: "Year-End", debit: "Bad Debts (P&L)", credit: "Debtors (BS — CA)", effect: "Reduces debtors and NP", example: "J. Murphy's debt of €300 irrecoverable", accountTypes: ["Sole Trader","Company"] },
  { name: "Provision for Bad Debts (Increase)", type: "Year-End", debit: "P&L (increase amount)", credit: "Provision for Bad Debts (BS)", effect: "Reduces NP and net debtors", example: "Provision 5% of debtors", accountTypes: ["Sole Trader","Company"] },
  { name: "Provision for Bad Debts (Decrease)", type: "Year-End", debit: "Provision for Bad Debts (BS)", credit: "P&L (decrease amount)", effect: "Increases NP", example: "Reduce provision from 5% to 3%", accountTypes: ["Sole Trader","Company"] },
  { name: "Goods for Own Use (Drawings)", type: "Adjustment", debit: "Drawings (BS)", credit: "Purchases (Trading)", effect: "Reduces purchases and capital", example: "Owner took goods worth €200", accountTypes: ["Sole Trader"] },
  { name: "Returns Not Recorded", type: "Error", debit: "Returns Inwards / Returns Outwards", credit: "Debtors / Creditors", effect: "Adjusts sales/purchases and debtors/creditors", example: "Returns inwards €150 not recorded", accountTypes: ["Sole Trader","Company"] },
  { name: "Investment Income Due", type: "Year-End", debit: "Investment Income Due (BS — CA)", credit: "Investment Income (P&L)", effect: "Increases income and debtors", example: "Dividend declared but not received", accountTypes: ["Company"] },
  { name: "Proposed Dividends", type: "Year-End", debit: "Appropriation A/c", credit: "Proposed Dividends (BS — CL)", effect: "Reduces retained profits, adds to creditors", example: "Proposed dividend of €0.10 per share", accountTypes: ["Company"] },
  { name: "Corporation Tax", type: "Year-End", debit: "P&L (Tax Expense)", credit: "Tax Liability (BS — CL)", effect: "Reduces profit, adds to creditors", example: "Corporation tax at 12.5%", accountTypes: ["Company"] },
  { name: "Transfer to Reserves", type: "Year-End", debit: "Appropriation A/c", credit: "General Reserve (BS)", effect: "Reduces distributable profits", example: "Transfer €10,000 to general reserve", accountTypes: ["Company"] },
  { name: "Manufacturing Overhead Adjustment", type: "Year-End", debit: "Manufacturing A/c", credit: "Expense (P&L)", effect: "Moves factory costs to manufacturing account", example: "Factory rent, factory insurance", accountTypes: ["Manufacturing"] },
  { name: "Work in Progress", type: "Year-End", debit: "WIP (BS — CA)", credit: "Manufacturing A/c", effect: "Closing WIP reduces cost of production", example: "WIP at year end €8,000", accountTypes: ["Manufacturing"] },
];

// ═══════════════════════════════════════════════════
// RATIO THEORY
// ═══════════════════════════════════════════════════

export interface RatioTheoryQ {
  q: string;
  a: string;
  tags: string[];
}

export const RATIO_THEORY: RatioTheoryQ[] = [
  {q:"How might a company overcome liquidity problems?",a:"Issue extra shares. Sell investments. Cut dividends. Sale and leaseback of fixed assets. Cut expenses.",tags:["Liquidity"]},
  {q:"Distinguish between liquidity and solvency.",a:"Liquidity measures the ability to pay short-term debts. Acid test ratio is a good indicator.\n\nSolvency is the ability to pay ALL debts (long term). A business is solvent if total assets exceed outside liabilities.",tags:["Liquidity","Solvency"]},
  {q:"How might a company overcome profitability problems?",a:"Buy raw materials from a cheaper source. Cut overheads. Advertise to increase sales.",tags:["Profitability"]},
  {q:"Explain how a faster stock turnover can increase profitability.",a:"Each time stock is sold, because it contains a mark-up, profitability increases. Faster turnover may mean bulk-buying discounts, reduced holding costs.",tags:["Stock Turnover","Profitability"]},
  {q:"How might a highly geared company reduce its dependence on long-term debt?",a:"Issue more shares. Reduce dividends and plough-back profits. Convert debt to ordinary shares. Increase reserves.",tags:["Gearing"]},
  {q:"What are the limitations of ratio analysis?",a:"Don't allow for seasonal fluctuations. Based on past events. Don't account for staffing, location etc. Balance sheet is one point in time. Different accounting policies affect comparisons.",tags:["Limitations"]},
  {q:"What might encourage a bank to give a loan?",a:"Productive purpose. Interest cover at least 4 times. Gearing below 50%. Retaining profits (dividend cover >2). Adequate security in fixed assets.",tags:["Bank Manager","Gearing"]},
  {q:"Name the users of financial statements.",a:"Banks, Creditors, Debenture holders, Existing/Potential Shareholders, Management, Employees, Competitors, Financial Commentators, Revenue Commissioners.",tags:["Users of Financial Statements"]},
];

// ═══════════════════════════════════════════════════
// STUDY TOOLS
// ═══════════════════════════════════════════════════

export interface StudyTool {
  title: string;
  desc: string;
  icon: string;
  content: string[];
}

export const STUDY_TOOLS_DATA: StudyTool[] = [
  {
    title: "Exam Timing Guide",
    desc: "How to allocate your 2.5 hours across all sections",
    icon: "⏱️",
    content: [
      "Section 1 — Q1 (120 marks): 45 minutes maximum",
      "Section 2 — Q2-Q7 pick 2 (100 marks each): 35 minutes each = 70 minutes",
      "Section 3 — Q8 or Q9 (80 marks): 30 minutes",
      "Reading & checking time: 5 minutes",
      "Total: 2 hours 30 minutes",
      "TIP: Start with Q1 — it's worth the most marks and is the most predictable",
      "TIP: Don't spend more than 45 mins on Q1 — you need time for the rest"
    ]
  },
  {
    title: "Mark Allocation",
    desc: "How marks are distributed across the paper",
    icon: "📊",
    content: [
      "Q1 (Section 1): 120 marks — Final Accounts with adjustments",
      "Q2-Q7 (Section 2): 100 marks each, answer 2 — Various topics",
      "Q8 (Section 3): 80 marks — Costing (always)",
      "Q9 (Section 3): 80 marks — Budgeting (always)",
      "Total: 400 marks (120 + 200 + 80)",
      "Common mistake: Spending too long on Section 2 questions"
    ]
  },
  {
    title: "Revision Checklist",
    desc: "Track what you've covered",
    icon: "✅",
    content: [
      "□ Q1: Sole Trader Final Accounts",
      "□ Q1: Company Final Accounts (Published)",
      "□ Q1: Manufacturing Accounts",
      "□ Q1: All adjustment types practised",
      "□ Q5: All 19 ratio formulas memorised",
      "□ Q5: LIPGLOSS report structure",
      "□ S2: Club Accounts",
      "□ S2: Service Firm Accounts",
      "□ S2: Cash Flow Statements",
      "□ S2: Correction of Errors",
      "□ S2: Published Accounts",
      "□ S2: Tabular Statements",
      "□ S2: Incomplete Records",
      "□ Q8: Marginal Costing + BEP",
      "□ Q8: Absorption Costing",
      "□ Q8: Job Costing + OH Apportionment",
      "□ Q9: Cash Budgets",
      "□ Q9: Production Budgets",
      "□ Q9: Flexible Budgets + High/Low",
      "□ Theory: All topic areas reviewed"
    ]
  },
  {
    title: "Study Planner",
    desc: "Suggested 6-week revision schedule",
    icon: "📅",
    content: [
      "Week 1: Q1 (Sole Trader + Company) — do 3 past papers timed",
      "Week 2: Q5 Ratios + Section 2 (Club, Service Firm)",
      "Week 3: Section 2 (Cash Flow, Errors, Published Accounts)",
      "Week 4: Q8 Costing (Marginal, Absorption, Job Costing)",
      "Week 5: Q9 Budgeting (Cash Budget, Flexible Budget)",
      "Week 6: Full mock papers under timed conditions + Theory revision",
      "Every day: 10 flashcards + 5 classify items + review 2 formulas"
    ]
  }
];
