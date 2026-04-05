import type { Archetype } from "./archetypes";

export const S2_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "club", label: "Club Accounts" },
  { key: "service", label: "Service Firm" },
  { key: "cashflow", label: "Cash Flow" },
  { key: "published", label: "Published" },
  { key: "errors", label: "Correction of Errors" },
];

export const S2_ARCHETYPES: Archetype[] = [
  {
    id: "s2-club-subs",
    type: "Club Accounts",
    name: "Subscriptions Account (Accruals Basis)",
    year: 2025,
    source: "Q2 — Club",
    totalMarks: 12,
    category: "club",
    desc: "Build the subscriptions account with opening/closing debtors and creditors (advance subs).",
    partSummary: ["T-Account structure","Opening balances","Cash received","Closing adjustments","I&E figure"],
    question: `<p>Abbey Sports Club. Subscriptions received by cheque during the year: <strong>€42,000</strong>. Subscriptions due at start: <strong>€1,200</strong>. Subscriptions due at end: <strong>€1,800</strong>. Subscriptions in advance at start: <strong>€600</strong>. Subscriptions in advance at end: <strong>€900</strong>. Annual subscription: <strong>€300</strong>. 150 members.</p>`,
    steps: [
      {
        title: "Step 1 — T-Account Structure",
        marks: 2,
        explain: "The Subscriptions Account has: DEBIT side = Opening creditors (in advance) + I&E figure + Closing debtors (due). CREDIT side = Opening debtors (due) + Bank (cash received) + Closing creditors (in advance).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Subscriptions A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening in advance (b/d)</td><td class="p-2 border border-border">Opening due (b/d)</td></tr><tr><td class="p-2 border border-border font-bold">I&E (balancing figure)</td><td class="p-2 border border-border">Bank (cash received)</td></tr><tr><td class="p-2 border border-border">Closing due (c/d)</td><td class="p-2 border border-border">Closing in advance (c/d)</td></tr></tbody></table>`,
        mistakes: ["Putting debtors and creditors on the wrong sides"]
      },
      {
        title: "Step 2 — Fill in Known Figures",
        marks: 4,
        explain: "Debit: Opening in advance €600 + Closing due €1,800. Credit: Opening due €1,200 + Bank €42,000 + Closing in advance €900.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Subscriptions A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening in advance: 600</td><td class="p-2 border border-border">Opening due: 1,200</td></tr><tr><td class="p-2 border border-border font-bold">I&E: ???</td><td class="p-2 border border-border">Bank: 42,000</td></tr><tr><td class="p-2 border border-border">Closing due: 1,800</td><td class="p-2 border border-border">Closing in advance: 900</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — Calculate I&E Figure",
        marks: 4,
        explain: "Credit total = 1,200 + 42,000 + 900 = €44,100. Known debits = 600 + 1,800 = €2,400. I&E = 44,100 − 2,400 = €41,700. OR: 150 members × €300 = €45,000, then adjust for debtors/creditors changes.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Subscriptions A/C — Complete</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening in advance: 600</td><td class="p-2 border border-border">Opening due: 1,200</td></tr><tr><td class="p-2 border border-border font-bold text-green-600">I&E: 41,700</td><td class="p-2 border border-border">Bank: 42,000</td></tr><tr><td class="p-2 border border-border">Closing due: 1,800</td><td class="p-2 border border-border">Closing in advance: 900</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">44,100</td><td class="p-2 border border-border">44,100 ✓</td></tr></tbody></table>`,
        mistakes: ["Using cash received (€42,000) as the I&E figure — must use accruals basis"]
      },
      {
        title: "Step 4 — I&E and BS Treatment",
        marks: 2,
        explain: "I&E Account: Subscriptions = €41,700 (income). BS: Subs due = €1,800 (CA). Subs in advance = €900 (CL).",
        content: `<p class="text-sm"><strong>I&E — Income:</strong> Subscriptions = €41,700</p><p class="text-sm"><strong>BS — CA:</strong> Subscriptions due = €1,800</p><p class="text-sm"><strong>BS — CL:</strong> Subscriptions in advance = €900</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "s2-club-accumulated-fund",
    type: "Club Accounts",
    name: "Accumulated Fund (Opening BS)",
    year: 2025,
    source: "Q2 — Club",
    totalMarks: 8,
    category: "club",
    desc: "Calculate the opening accumulated fund by listing opening assets and liabilities.",
    partSummary: ["List opening assets","List opening liabilities","Calculate fund"],
    question: `<p>At the start of the year: Equipment €28,000, Stock (bar) €2,400, Bank €5,600, Subs due €1,200, Creditors €3,800, Subs in advance €600, Loan €10,000.</p>`,
    steps: [
      {
        title: "Step 1 — List Assets and Liabilities",
        marks: 4,
        explain: "Assets: Equipment 28,000 + Stock 2,400 + Bank 5,600 + Subs due 1,200 = €37,200. Liabilities: Creditors 3,800 + Subs in advance 600 + Loan 10,000 = €14,400.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Opening Balance Sheet</th></tr></thead><tbody><tr><td class="p-2 border border-border font-bold" colspan="2">Assets</td></tr><tr><td class="p-2 border border-border pl-4">Equipment</td><td class="p-2 border border-border text-right font-mono">28,000</td></tr><tr><td class="p-2 border border-border pl-4">Stock (bar)</td><td class="p-2 border border-border text-right font-mono">2,400</td></tr><tr><td class="p-2 border border-border pl-4">Bank</td><td class="p-2 border border-border text-right font-mono">5,600</td></tr><tr><td class="p-2 border border-border pl-4">Subs due</td><td class="p-2 border border-border text-right font-mono">1,200</td></tr><tr class="font-bold"><td class="p-2 border border-border">Total Assets</td><td class="p-2 border border-border text-right font-mono">37,200</td></tr><tr><td class="p-2 border border-border font-bold" colspan="2">Liabilities</td></tr><tr><td class="p-2 border border-border pl-4">Creditors</td><td class="p-2 border border-border text-right font-mono">3,800</td></tr><tr><td class="p-2 border border-border pl-4">Subs in advance</td><td class="p-2 border border-border text-right font-mono">600</td></tr><tr><td class="p-2 border border-border pl-4">Loan</td><td class="p-2 border border-border text-right font-mono">10,000</td></tr><tr class="font-bold"><td class="p-2 border border-border">Total Liabilities</td><td class="p-2 border border-border text-right font-mono">14,400</td></tr></tbody></table>`,
        mistakes: ["Forgetting subs in advance is a liability, not an asset"]
      },
      {
        title: "Step 2 — Accumulated Fund",
        marks: 4,
        explain: "Accumulated Fund = Total Assets − Total Liabilities = 37,200 − 14,400 = €22,800. This is the club's 'Capital' equivalent.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Total Assets</td><td class="p-2 border border-border text-right font-mono">37,200</td></tr><tr><td class="p-2 border border-border">Less: Total Liabilities</td><td class="p-2 border border-border text-right font-mono">(14,400)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Opening Accumulated Fund</td><td class="p-2 border border-border text-right font-mono">22,800</td></tr></tbody></table><p class="text-sm mt-2">This figure goes at the bottom of the closing BS: Opening Accumulated Fund + Surplus = Closing Accumulated Fund.</p>`,
        mistakes: ["Treating accumulated fund as the same as capital — the concept is the same but the terminology is different for clubs"]
      }
    ]
  },
  {
    id: "s2-club-bar-trading",
    type: "Club Accounts",
    name: "Bar Trading Account",
    year: 2025,
    source: "Q2 — Club",
    totalMarks: 10,
    category: "club",
    desc: "Prepare a separate trading account for the club bar to find bar profit/loss.",
    partSummary: ["Bar sales","Cost of bar supplies","Bar wages","Bar profit"],
    question: `<p>Bar sales: <strong>€38,000</strong>. Opening bar stock: <strong>€2,400</strong>. Bar purchases: <strong>€18,000</strong>. Closing bar stock: <strong>€2,800</strong>. Bar wages: <strong>€8,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Cost of Bar Sales",
        marks: 4,
        explain: "Opening Stock + Purchases − Closing Stock = 2,400 + 18,000 − 2,800 = €17,600.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Opening bar stock</td><td class="p-2 border border-border text-right font-mono">2,400</td></tr><tr><td class="p-2 border border-border">Add: Bar purchases</td><td class="p-2 border border-border text-right font-mono">18,000</td></tr><tr><td class="p-2 border border-border">Less: Closing bar stock</td><td class="p-2 border border-border text-right font-mono">(2,800)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Cost of bar sales</td><td class="p-2 border border-border text-right font-mono">17,600</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Bar Trading Account",
        marks: 4,
        explain: "Bar Sales − Cost of Bar Sales = Gross Profit. Then deduct bar-specific expenses (wages).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bar Trading Account</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bar Sales</td><td class="p-2 border border-border text-right font-mono">38,000</td></tr><tr><td class="p-2 border border-border">Less: Cost of bar sales</td><td class="p-2 border border-border text-right font-mono">(17,600)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Gross Profit</td><td class="p-2 border border-border text-right font-mono">20,400</td></tr><tr><td class="p-2 border border-border">Less: Bar wages</td><td class="p-2 border border-border text-right font-mono">(8,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Bar Profit</td><td class="p-2 border border-border text-right font-mono">12,400</td></tr></tbody></table>`,
        mistakes: ["Putting bar items in the main I&E account — they go in a SEPARATE bar trading account"]
      },
      {
        title: "Step 3 — Transfer to I&E",
        marks: 2,
        explain: "The bar profit of €12,400 is transferred to the Income & Expenditure Account as income.",
        content: `<p class="text-sm"><strong>I&E Account — Income:</strong> Profit on bar = <strong>€12,400</strong></p><p class="text-sm">Bar stock (€2,800) appears as a Current Asset on the BS.</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "s2-service-capital",
    type: "Service Firm",
    name: "Statement of Capital",
    year: 2024,
    source: "Q2 — Service",
    totalMarks: 8,
    category: "service",
    desc: "Prepare a statement of capital to find the opening capital of a service firm from incomplete records.",
    partSummary: ["List opening assets","List opening liabilities","Calculate capital"],
    question: `<p>D. Murphy, Solicitor. At start of year: Office Equipment €45,000, Motor Vehicle €32,000, Debtors (fees) €8,200, Bank €3,400, Creditors €5,600, Loan €20,000.</p>`,
    steps: [
      {
        title: "Step 1 — Opening Statement of Affairs",
        marks: 4,
        explain: "List all assets and liabilities at the start. Assets: Equipment 45,000 + Vehicle 32,000 + Debtors 8,200 + Bank 3,400 = €88,600. Liabilities: Creditors 5,600 + Loan 20,000 = €25,600.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Statement of Capital</th></tr></thead><tbody><tr><td class="p-2 border border-border font-bold" colspan="2">Assets</td></tr><tr><td class="p-2 border border-border pl-4">Office Equipment</td><td class="p-2 border border-border text-right font-mono">45,000</td></tr><tr><td class="p-2 border border-border pl-4">Motor Vehicle</td><td class="p-2 border border-border text-right font-mono">32,000</td></tr><tr><td class="p-2 border border-border pl-4">Debtors (fees due)</td><td class="p-2 border border-border text-right font-mono">8,200</td></tr><tr><td class="p-2 border border-border pl-4">Bank</td><td class="p-2 border border-border text-right font-mono">3,400</td></tr><tr class="font-bold"><td class="p-2 border border-border">Total Assets</td><td class="p-2 border border-border text-right font-mono">88,600</td></tr><tr><td class="p-2 border border-border font-bold" colspan="2">Liabilities</td></tr><tr><td class="p-2 border border-border pl-4">Creditors</td><td class="p-2 border border-border text-right font-mono">5,600</td></tr><tr><td class="p-2 border border-border pl-4">Loan</td><td class="p-2 border border-border text-right font-mono">20,000</td></tr><tr class="font-bold"><td class="p-2 border border-border">Total Liabilities</td><td class="p-2 border border-border text-right font-mono">25,600</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Opening Capital</td><td class="p-2 border border-border text-right font-mono">63,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Use in Final Accounts",
        marks: 4,
        explain: "Opening capital goes on the BS. Capital section: Opening Capital + Net Profit − Drawings = Closing Capital.",
        content: `<p class="text-sm"><strong>BS — Capital Section:</strong></p><table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Opening Capital</td><td class="p-2 border border-border text-right font-mono">63,000</td></tr><tr><td class="p-2 border border-border">Add: Net Profit</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border">Less: Drawings</td><td class="p-2 border border-border text-right font-mono">(XXX)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Closing Capital</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr></tbody></table>`,
        mistakes: ["Confusing opening and closing capital"]
      }
    ]
  },
  {
    id: "s2-service-fees",
    type: "Service Firm",
    name: "Fee Income Adjustments",
    year: 2024,
    source: "Q2 — Service",
    totalMarks: 6,
    category: "service",
    desc: "Adjust fee income for fees due (debtors) and fees received in advance.",
    partSummary: ["Opening adjustments","Cash received","Closing adjustments"],
    question: `<p>Fees received during year: <strong>€120,000</strong>. Opening fees due: <strong>€6,000</strong>. Closing fees due: <strong>€8,500</strong>. Fees received in advance at end: <strong>€3,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Fee Income T-Account",
        marks: 3,
        explain: "Same concept as subscriptions. I&E figure is the balancing figure.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Fee Income A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening in advance: —</td><td class="p-2 border border-border">Opening due: 6,000</td></tr><tr><td class="p-2 border border-border font-bold text-green-600">I&E: 125,500</td><td class="p-2 border border-border">Bank: 120,000</td></tr><tr><td class="p-2 border border-border">Closing due: 8,500</td><td class="p-2 border border-border">Closing in advance: 3,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">134,000</td><td class="p-2 border border-border">129,000</td></tr></tbody></table>`,
        mistakes: ["Using cash received as fee income — must use accruals basis"]
      },
      {
        title: "Step 2 — Calculation Check",
        marks: 3,
        explain: "Credit total: 6,000 + 120,000 + 3,000 = 129,000. Debit (excl I&E): 0 + 8,500 = 8,500. I&E = 129,000 − 8,500 = 120,500. Wait — no opening in advance. Let me recalculate: Debits must = Credits. Credits = 129,000. I&E + 8,500 = 129,000. I&E = 120,500.",
        content: `<p class="text-sm">Fee income for I&E = <strong>€120,500</strong></p><p class="text-sm"><strong>BS — CA:</strong> Fees due = €8,500</p><p class="text-sm"><strong>BS — CL:</strong> Fees in advance = €3,000</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "s2-cashflow-operating",
    type: "Cash Flow",
    name: "Cash Flow — Operating Activities",
    year: 2024,
    source: "Q4 — Cash Flow",
    totalMarks: 16,
    category: "cashflow",
    desc: "Reconcile operating profit to net cash from operating activities using the indirect method.",
    partSummary: ["Start with operating profit","Add back non-cash","Working capital changes","Tax & interest paid"],
    question: `<p>Operating Profit: <strong>€85,000</strong>. Depreciation: <strong>€12,000</strong>. Loss on disposal: <strong>€3,000</strong>. Stock increase: <strong>€4,000</strong>. Debtors decrease: <strong>€2,500</strong>. Creditors increase: <strong>€1,800</strong>. Tax paid: <strong>€8,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Start with Operating Profit",
        marks: 2,
        explain: "Begin with Operating Profit from the P&L. This is BEFORE interest and tax.",
        content: `<p class="text-sm font-mono">Operating Profit = <strong>€85,000</strong></p>`,
        mistakes: ["Starting with Net Profit instead of Operating Profit"]
      },
      {
        title: "Step 2 — Add Back Non-Cash Items",
        marks: 4,
        explain: "Depreciation is not a cash cost — add it back. Loss on disposal is not a cash item — add it back. Profit on disposal would be deducted.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Operating Profit</td><td class="p-2 border border-border text-right font-mono">85,000</td></tr><tr><td class="p-2 border border-border">Add: Depreciation</td><td class="p-2 border border-border text-right font-mono">12,000</td></tr><tr><td class="p-2 border border-border">Add: Loss on disposal</td><td class="p-2 border border-border text-right font-mono">3,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted profit</td><td class="p-2 border border-border text-right font-mono">100,000</td></tr></tbody></table>`,
        mistakes: ["Subtracting depreciation instead of adding it back","Forgetting profit/loss on disposal"]
      },
      {
        title: "Step 3 — Working Capital Changes",
        marks: 6,
        explain: "Stock INCREASE = cash used (subtract). Debtors DECREASE = cash received (add). Creditors INCREASE = cash saved (add). Think: 'Did this change free up cash or use cash?'",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Adjusted profit</td><td class="p-2 border border-border text-right font-mono">100,000</td></tr><tr><td class="p-2 border border-border">Stock increase</td><td class="p-2 border border-border text-right font-mono">(4,000)</td></tr><tr><td class="p-2 border border-border">Debtors decrease</td><td class="p-2 border border-border text-right font-mono">2,500</td></tr><tr><td class="p-2 border border-border">Creditors increase</td><td class="p-2 border border-border text-right font-mono">1,800</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Cash generated from operations</td><td class="p-2 border border-border text-right font-mono">100,300</td></tr></tbody></table>`,
        mistakes: ["Getting the sign wrong on working capital changes — remember: asset increase = cash used, liability increase = cash gained"]
      },
      {
        title: "Step 4 — Tax Paid",
        marks: 4,
        explain: "Deduct tax actually PAID during the year (not the provision). Net cash from operating activities = 100,300 − 8,000 = €92,300.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Cash generated from operations</td><td class="p-2 border border-border text-right font-mono">100,300</td></tr><tr><td class="p-2 border border-border">Tax paid</td><td class="p-2 border border-border text-right font-mono">(8,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net Cash from Operating Activities</td><td class="p-2 border border-border text-right font-mono">92,300</td></tr></tbody></table>`,
        mistakes: ["Using the tax provision instead of tax actually paid — check opening and closing tax creditor"]
      }
    ]
  },
  {
    id: "s2-cashflow-sections",
    type: "Cash Flow",
    name: "Cash Flow — Full 5 Sections",
    year: 2024,
    source: "Q4 — Cash Flow",
    totalMarks: 20,
    category: "cashflow",
    desc: "Complete all 5 sections of a cash flow statement and reconcile to opening/closing bank.",
    partSummary: ["Operating","Returns on Investment","Capital Expenditure","Financing","Reconciliation"],
    question: `<p>Operating activities: <strong>€92,300</strong>. Interest paid: <strong>€6,000</strong>. Dividends paid: <strong>€15,000</strong>. Equipment purchased: <strong>€40,000</strong>. Equipment sold: <strong>€8,000</strong>. Loan repaid: <strong>€20,000</strong>. Shares issued: <strong>€30,000</strong>. Opening bank: <strong>€12,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Operating Activities",
        marks: 4,
        explain: "From the previous working: Net Cash from Operating Activities = €92,300.",
        content: `<p class="text-sm font-mono"><strong>1. Operating Activities: €92,300</strong></p>`,
        mistakes: []
      },
      {
        title: "Step 2 — Returns on Investments & Servicing of Finance",
        marks: 4,
        explain: "Interest paid and dividends paid go here. Both are cash outflows.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">2. Returns on Investment & Servicing</th></tr></thead><tbody><tr><td class="p-2 border border-border">Interest paid</td><td class="p-2 border border-border text-right font-mono">(6,000)</td></tr><tr><td class="p-2 border border-border">Dividends paid</td><td class="p-2 border border-border text-right font-mono">(15,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Section 2 Total</td><td class="p-2 border border-border text-right font-mono">(21,000)</td></tr></tbody></table>`,
        mistakes: ["Putting interest in operating activities — it goes in Section 2"]
      },
      {
        title: "Step 3 — Capital Expenditure",
        marks: 4,
        explain: "Purchase and sale of fixed assets. Purchase = outflow, Sale = inflow.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">3. Capital Expenditure</th></tr></thead><tbody><tr><td class="p-2 border border-border">Purchase of equipment</td><td class="p-2 border border-border text-right font-mono">(40,000)</td></tr><tr><td class="p-2 border border-border">Sale of equipment</td><td class="p-2 border border-border text-right font-mono">8,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Section 3 Total</td><td class="p-2 border border-border text-right font-mono">(32,000)</td></tr></tbody></table>`,
        mistakes: ["Using the profit on sale instead of the actual cash received"]
      },
      {
        title: "Step 4 — Financing",
        marks: 4,
        explain: "Shares issued (inflow) and loans repaid (outflow).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">4. Financing</th></tr></thead><tbody><tr><td class="p-2 border border-border">Shares issued</td><td class="p-2 border border-border text-right font-mono">30,000</td></tr><tr><td class="p-2 border border-border">Loan repaid</td><td class="p-2 border border-border text-right font-mono">(20,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Section 4 Total</td><td class="p-2 border border-border text-right font-mono">10,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5 — Net Cash Flow & Reconciliation",
        marks: 4,
        explain: "Add all sections: 92,300 − 21,000 − 32,000 + 10,000 = €49,300. Closing bank = Opening + Net = 12,000 + 49,300 = €61,300.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">5. Reconciliation</th></tr></thead><tbody><tr><td class="p-2 border border-border">Net increase in cash</td><td class="p-2 border border-border text-right font-mono">49,300</td></tr><tr><td class="p-2 border border-border">Opening bank balance</td><td class="p-2 border border-border text-right font-mono">12,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Closing bank balance</td><td class="p-2 border border-border text-right font-mono">61,300</td></tr></tbody></table>`,
        mistakes: ["Closing bank should match the BS bank figure — if it doesn't, check your sections"]
      }
    ]
  },
  {
    id: "s2-suspense-journal",
    type: "Correction of Errors",
    name: "Suspense Account & Journal Entries",
    year: 2024,
    source: "Q3 — Errors",
    totalMarks: 16,
    category: "errors",
    desc: "Identify errors, prepare correcting journal entries, and clear the suspense account.",
    partSummary: ["Classify errors","Journal entries","Suspense clearance","Effect on profit"],
    question: `<p>The TB didn't balance. A suspense account with a <strong>debit balance of €3,200</strong> was opened. The following errors were discovered:<br>(i) Sales returns €400 debited to Purchases instead of Returns Inwards.<br>(ii) Rent €1,200 paid by cheque was not recorded.<br>(iii) Equipment €2,000 debited to Repairs.</p>`,
    steps: [
      {
        title: "Step 1 — Classify Each Error",
        marks: 4,
        explain: "(i) Compensating — wrong account debited but both sides recorded, doesn't affect suspense. (ii) Complete omission — nothing recorded, TB still balances, doesn't affect suspense. (iii) Error of principle — capital expenditure treated as revenue, doesn't affect suspense.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Error</th><th class="p-2 border border-border">Type</th><th class="p-2 border border-border">Affects Suspense?</th></tr></thead><tbody><tr><td class="p-2 border border-border">(i) Sales returns to wrong A/C</td><td class="p-2 border border-border">Compensating</td><td class="p-2 border border-border">No</td></tr><tr><td class="p-2 border border-border">(ii) Rent omitted</td><td class="p-2 border border-border">Complete omission</td><td class="p-2 border border-border">No</td></tr><tr><td class="p-2 border border-border">(iii) Equipment to Repairs</td><td class="p-2 border border-border">Error of principle</td><td class="p-2 border border-border">No</td></tr></tbody></table>`,
        mistakes: ["Not all errors affect the suspense account — only errors that cause one side to be bigger"]
      },
      {
        title: "Step 2 — Correcting Journal Entries",
        marks: 6,
        explain: "For each error, write the correcting double entry.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Error</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">(i) Returns Inwards 400</td><td class="p-2 border border-border text-right font-mono">400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">(i) Purchases 400</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">400</td></tr><tr><td class="p-2 border border-border">(ii) Rent 1,200</td><td class="p-2 border border-border text-right font-mono">1,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">(ii) Bank 1,200</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,200</td></tr><tr><td class="p-2 border border-border">(iii) Equipment 2,000</td><td class="p-2 border border-border text-right font-mono">2,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">(iii) Repairs 2,000</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">2,000</td></tr></tbody></table>`,
        mistakes: ["Not narrating each journal entry — the examiner wants to see WHY"]
      },
      {
        title: "Step 3 — Effect on Profit",
        marks: 4,
        explain: "(i) Returns Inwards ↑ 400 → Sales ↓ → GP ↓ 400. Purchases ↓ 400 → GP ↑ 400. Net = NIL. (ii) Rent ↑ 1,200 → NP ↓ 1,200. (iii) Repairs ↓ 2,000 → NP ↑ 2,000. Net effect on NP = +800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Error</th><th class="p-2 border border-border text-right">Effect on NP</th></tr></thead><tbody><tr><td class="p-2 border border-border">(i) Returns/Purchases swap</td><td class="p-2 border border-border text-right font-mono">NIL</td></tr><tr><td class="p-2 border border-border">(ii) Rent omitted</td><td class="p-2 border border-border text-right font-mono text-red-600">−1,200</td></tr><tr><td class="p-2 border border-border">(iii) Equipment from Repairs</td><td class="p-2 border border-border text-right font-mono text-green-600">+2,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net effect on NP</td><td class="p-2 border border-border text-right font-mono">+800</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4 — Suspense Note",
        marks: 2,
        explain: "None of these three errors affected the suspense. The €3,200 debit balance in suspense must be caused by other errors not yet found. Always check: does the error make one side of the TB bigger?",
        content: `<p class="text-sm">The suspense account of €3,200 debit balance has NOT been cleared by these corrections. Look for errors where only ONE side was posted (e.g., a credit entry of €1,600 was omitted → suspense has a debit balance of €1,600 × 2 = €3,200).</p>`,
        mistakes: ["Assuming all errors affect suspense — many don't"]
      }
    ]
  },
  {
    id: "s2-published-pl",
    type: "Published Accounts",
    name: "Published P&L (FRS Format)",
    year: 2024,
    source: "Q4 — Published",
    totalMarks: 16,
    category: "published",
    desc: "Prepare a Published P&L Account in FRS format with workings for Cost of Sales, Distribution, and Admin.",
    partSummary: ["Turnover","Cost of Sales (W1)","Distribution (W2)","Admin (W3)","Interest","Tax","Dividends"],
    question: `<p>Prepare a Published P&L Account from the following: Turnover €500,000, Opening Stock €30,000, Purchases €280,000, Closing Stock €35,000, Distribution expenses €42,000, Admin expenses €38,000, Depreciation (vans) €8,000, Depreciation (buildings) €6,000, Directors' fees €25,000, Interest paid €4,000, Tax €12,000.</p>`,
    steps: [
      {
        title: "Step 1 — Cost of Sales (Working A)",
        marks: 4,
        explain: "Opening Stock + Purchases − Closing Stock = 30,000 + 280,000 − 35,000 = €275,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Working A: Cost of Sales</th></tr></thead><tbody><tr><td class="p-2 border border-border">Opening Stock</td><td class="p-2 border border-border text-right font-mono">30,000</td></tr><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border text-right font-mono">280,000</td></tr><tr><td class="p-2 border border-border">Closing Stock</td><td class="p-2 border border-border text-right font-mono">(35,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Cost of Sales</td><td class="p-2 border border-border text-right font-mono">275,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Distribution Costs (Working B)",
        marks: 3,
        explain: "Distribution expenses + van depreciation = 42,000 + 8,000 = €50,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Working B: Distribution Costs</th></tr></thead><tbody><tr><td class="p-2 border border-border">Distribution expenses (TB)</td><td class="p-2 border border-border text-right font-mono">42,000</td></tr><tr><td class="p-2 border border-border">Depreciation — Vans</td><td class="p-2 border border-border text-right font-mono">8,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Distribution Costs</td><td class="p-2 border border-border text-right font-mono">50,000</td></tr></tbody></table>`,
        mistakes: ["Putting van depreciation in Admin instead of Distribution"]
      },
      {
        title: "Step 3 — Admin Expenses (Working C)",
        marks: 3,
        explain: "Admin expenses + building depreciation + directors' fees = 38,000 + 6,000 + 25,000 = €69,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Working C: Administrative Expenses</th></tr></thead><tbody><tr><td class="p-2 border border-border">Admin expenses (TB)</td><td class="p-2 border border-border text-right font-mono">38,000</td></tr><tr><td class="p-2 border border-border">Depreciation — Buildings</td><td class="p-2 border border-border text-right font-mono">6,000</td></tr><tr><td class="p-2 border border-border">Directors' fees</td><td class="p-2 border border-border text-right font-mono">25,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Admin Expenses</td><td class="p-2 border border-border text-right font-mono">69,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4 — Published P&L",
        marks: 6,
        explain: "Put it all together in the FRS format.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Published Profit & Loss Account</th></tr></thead><tbody><tr><td class="p-2 border border-border">Turnover</td><td class="p-2 border border-border text-right font-mono">500,000</td></tr><tr><td class="p-2 border border-border">Cost of Sales (W.A)</td><td class="p-2 border border-border text-right font-mono">(275,000)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Gross Profit</td><td class="p-2 border border-border text-right font-mono">225,000</td></tr><tr><td class="p-2 border border-border">Distribution Costs (W.B)</td><td class="p-2 border border-border text-right font-mono">(50,000)</td></tr><tr><td class="p-2 border border-border">Admin Expenses (W.C)</td><td class="p-2 border border-border text-right font-mono">(69,000)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Operating Profit</td><td class="p-2 border border-border text-right font-mono">106,000</td></tr><tr><td class="p-2 border border-border">Interest Payable</td><td class="p-2 border border-border text-right font-mono">(4,000)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Profit Before Tax</td><td class="p-2 border border-border text-right font-mono">102,000</td></tr><tr><td class="p-2 border border-border">Corporation Tax</td><td class="p-2 border border-border text-right font-mono">(12,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Profit After Tax</td><td class="p-2 border border-border text-right font-mono">90,000</td></tr></tbody></table>`,
        mistakes: ["Putting interest in operating profit — it comes AFTER","Forgetting to show workings A, B, C as notes"]
      }
    ]
  }
];
