export interface LearnModule {
  id: number;
  title: string;
  icon: string;
  lessons: { title: string; steps: number }[];
  color: string;
}

export const LEARN_MODULES: LearnModule[] = [
  {
    id: 1, title: "Correction of Errors", icon: "🔧", color: "hsl(0, 72%, 51%)",
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
    id: 2, title: "Club Accounts", icon: "🏟️", color: "hsl(142, 72%, 29%)",
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

export interface ClassifyItem {
  item: string;
  answer: "debit" | "credit";
  category: string;
  hint?: string;
}

export const CLASSIFY_ITEMS: ClassifyItem[] = [
  // Assets (Debit)
  { item: "Premises", answer: "debit", category: "Fixed Assets" },
  { item: "Machinery", answer: "debit", category: "Fixed Assets" },
  { item: "Motor Vehicles", answer: "debit", category: "Fixed Assets" },
  { item: "Office Equipment", answer: "debit", category: "Fixed Assets" },
  { item: "Fixtures & Fittings", answer: "debit", category: "Fixed Assets" },
  { item: "Goodwill", answer: "debit", category: "Fixed Assets" },
  { item: "Patents", answer: "debit", category: "Fixed Assets" },
  { item: "Investments", answer: "debit", category: "Fixed Assets" },
  { item: "Land", answer: "debit", category: "Fixed Assets" },
  { item: "Debtors", answer: "debit", category: "Current Assets" },
  { item: "Stock", answer: "debit", category: "Current Assets" },
  { item: "Cash at Bank", answer: "debit", category: "Current Assets" },
  { item: "Cash in Hand", answer: "debit", category: "Current Assets" },
  { item: "Prepaid Insurance", answer: "debit", category: "Current Assets" },
  { item: "Prepaid Rent", answer: "debit", category: "Current Assets" },
  { item: "Prepaid Rates", answer: "debit", category: "Current Assets" },
  { item: "Petty Cash", answer: "debit", category: "Current Assets" },
  // Expenses (Debit)
  { item: "Purchases", answer: "debit", category: "Expenses" },
  { item: "Carriage Inwards", answer: "debit", category: "Expenses" },
  { item: "Wages", answer: "debit", category: "Expenses" },
  { item: "Salaries", answer: "debit", category: "Expenses" },
  { item: "Rent Expense", answer: "debit", category: "Expenses" },
  { item: "Insurance", answer: "debit", category: "Expenses" },
  { item: "Light & Heat", answer: "debit", category: "Expenses" },
  { item: "Telephone", answer: "debit", category: "Expenses" },
  { item: "Postage", answer: "debit", category: "Expenses" },
  { item: "Advertising", answer: "debit", category: "Expenses" },
  { item: "Repairs", answer: "debit", category: "Expenses" },
  { item: "Bad Debts", answer: "debit", category: "Expenses" },
  { item: "Discount Allowed", answer: "debit", category: "Expenses" },
  { item: "Depreciation", answer: "debit", category: "Expenses" },
  { item: "Bank Charges", answer: "debit", category: "Expenses" },
  { item: "Interest Paid", answer: "debit", category: "Expenses" },
  { item: "Carriage Outwards", answer: "debit", category: "Expenses" },
  { item: "Drawings", answer: "debit", category: "Expenses", hint: "Reduces capital — always debit" },
  { item: "Returns Inwards", answer: "debit", category: "Expenses" },
  { item: "Motor Expenses", answer: "debit", category: "Expenses" },
  { item: "Cleaning", answer: "debit", category: "Expenses" },
  { item: "Stationery", answer: "debit", category: "Expenses" },
  { item: "Commission Paid", answer: "debit", category: "Expenses" },
  { item: "General Expenses", answer: "debit", category: "Expenses" },
  { item: "Professional Fees", answer: "debit", category: "Expenses" },
  { item: "Provision for Bad Debts (Increase)", answer: "debit", category: "Expenses" },
  { item: "Loss on Sale of Fixed Asset", answer: "debit", category: "Expenses" },
  // Liabilities (Credit)
  { item: "Capital", answer: "credit", category: "Capital & Reserves" },
  { item: "Creditors", answer: "credit", category: "Current Liabilities" },
  { item: "Bank Overdraft", answer: "credit", category: "Current Liabilities" },
  { item: "Accrued Expenses", answer: "credit", category: "Current Liabilities" },
  { item: "VAT Owed", answer: "credit", category: "Current Liabilities" },
  { item: "PAYE/PRSI Owed", answer: "credit", category: "Current Liabilities" },
  { item: "Bank Loan", answer: "credit", category: "Long-Term Liabilities" },
  { item: "Mortgage", answer: "credit", category: "Long-Term Liabilities" },
  { item: "Debentures", answer: "credit", category: "Long-Term Liabilities" },
  { item: "Long-Term Loan", answer: "credit", category: "Long-Term Liabilities" },
  // Income (Credit)
  { item: "Sales", answer: "credit", category: "Income" },
  { item: "Returns Outwards", answer: "credit", category: "Income" },
  { item: "Discount Received", answer: "credit", category: "Income" },
  { item: "Rent Received", answer: "credit", category: "Income" },
  { item: "Commission Received", answer: "credit", category: "Income" },
  { item: "Interest Received", answer: "credit", category: "Income" },
  { item: "Profit on Sale of Fixed Asset", answer: "credit", category: "Income" },
  { item: "Investment Income", answer: "credit", category: "Income" },
  { item: "Provision for Bad Debts (Decrease)", answer: "credit", category: "Income" },
  { item: "Accumulated Fund", answer: "credit", category: "Capital & Reserves", hint: "Club equivalent of Capital" },
  { item: "Reserves", answer: "credit", category: "Capital & Reserves" },
  { item: "Retained Profits", answer: "credit", category: "Capital & Reserves" },
  { item: "Share Premium", answer: "credit", category: "Capital & Reserves" },
  { item: "Revaluation Reserve", answer: "credit", category: "Capital & Reserves" },
  { item: "Ordinary Share Capital", answer: "credit", category: "Capital & Reserves" },
  { item: "Preference Share Capital", answer: "credit", category: "Capital & Reserves" },
  { item: "Revenue Reserves", answer: "credit", category: "Capital & Reserves" },
  { item: "Capital Reserves", answer: "credit", category: "Capital & Reserves" },
  { item: "Income Tax Owed", answer: "credit", category: "Current Liabilities" },
  { item: "Dividends Proposed", answer: "credit", category: "Current Liabilities" },
  { item: "Deferred Income", answer: "credit", category: "Current Liabilities" },
  { item: "Subscriptions in Advance", answer: "credit", category: "Current Liabilities", hint: "Club — money received for next year" },
];

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
];

export interface Formula {
  name: string;
  formula: string;
  section: string;
  notes?: string;
}

export const FORMULAS: Formula[] = [
  // Ratios (Q5)
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
  // Costing (Q8)
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
  // Depreciation
  { name: "Straight Line Depreciation", formula: "(Cost − Residual Value) / Useful Life", section: "Depreciation" },
  { name: "Reducing Balance Depreciation", formula: "NBV × Rate%", section: "Depreciation" },
];

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
