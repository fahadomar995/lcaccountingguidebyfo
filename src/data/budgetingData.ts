// Q9 Budgeting — Introduction, Formulas, Theory Bank
// Extracted from original budgeting-3.html

import type { TheoryQuestion, FormulaCard } from "./costingData";

export const BUDGETING_INTRO = [
  {
    title: "What is Q9?",
    content: `<p>Question 9 is <strong>always a budgeting question</strong>, worth 80 marks. Students choose between Q8 (Costing) and Q9 (Budgeting). The SEC uses two main formats: <strong>Cash Budgets</strong> (6-month grids with collection/payment patterns) and <strong>Flexible Budgets</strong> (High/Low separation, MCS at new activity levels). Production Budgets often appear combined with cash budgets.</p>`
  },
  {
    title: "What to Expect",
    content: `<ul><li><strong>Cash Budget:</strong> Monthly sales/purchases forecasts + collection/payment patterns with discounts + loan interest + capital expenditure. Build a 6-month grid showing receipts, payments, net cash, opening/closing balance.</li><li><strong>Flexible Budget:</strong> Three activity levels given. Separate costs into fixed and variable using High/Low. Prepare MCS at a new level. Calculate BEP and MoS.</li><li><strong>Production Budget:</strong> Calculate units to produce, raw materials needed, labour hours. Often combined with a cash budget.</li><li><strong>Theory:</strong> Always 6–10 marks on advantages of budgeting, types of budgets, principal budget factor, controllable costs.</li></ul>`
  },
  {
    title: "Key Trap: Cash vs Accruals",
    accent: true,
    content: `<p>The cash budget uses <strong>cash basis</strong> — only actual cash in and out. Depreciation is NOT a cash flow (deduct it from fixed overheads). But the Budgeted P&L uses <strong>accruals basis</strong> — include depreciation, discounts, and total figures for the period. Students constantly mix these up.</p>`
  }
];

export const BUDGETING_FORMULAS: { section: string; cards: FormulaCard[] }[] = [
  {
    section: "Budgeting Formulas",
    cards: [
      { name: "Cash Sales Receipt", formula: "Sales × Cash% × (1 − Discount%)", note: "E.g. €468k × 40% × 95% = €177,840 received same month" },
      { name: "Credit Collection", formula: "Prior Sales × Credit% × Collection%", note: "M+1 and M+2 collections from credit customers" },
      { name: "Purchase Payment", formula: "Prior Purchases × Payment% × (1 − Discount%)", note: "Similar lagged pattern to sales collections" },
      { name: "Depreciation (Straight Line)", formula: "(Cost − Scrap) ÷ Life", note: "NOT a cash flow. Deduct from fixed OH for cash budget." },
      { name: "Loan Interest (Monthly)", formula: "Outstanding Balance × Rate ÷ 12", note: "Reduces each month as capital is repaid" },
      { name: "High/Low Method", formula: "VCpu = (HighCost − LowCost) ÷ (HighUnits − LowUnits)", note: "Then FC = Total − (Units × VCpu)" },
      { name: "Production Budget", formula: "Units = Sales + Closing Stock − Opening Stock", note: "Then: Materials = Units × material/unit, Labour = Units × hrs/unit" },
    ]
  }
];

export const BUDGETING_THEORY: TheoryQuestion[] = [
  { year: 2016, marks: 6, question: "Outline the advantages of budgeting for a business.", answer: "Planning: forces management to plan ahead and set targets. Control: actual results can be compared with budgeted figures to identify variances. Coordination: ensures all departments work together towards common goals. Communication: budgets communicate plans and expectations to all staff. Motivation: targets give employees goals to achieve. Responsibility: budget holders are accountable for their area." },
  { year: 2017, marks: 6, question: "Explain the term 'Principal Budget Factor'. Give an example.", answer: "The principal budget factor (or limiting factor) is the factor that limits the activity of a business. It is the starting point for budget preparation because all other budgets depend on it. Most commonly it is sales demand — you can't produce more than you can sell. Other examples: shortage of raw materials, limited machine capacity, shortage of skilled labour, limited factory space." },
  { year: 2018, marks: 6, question: "Explain 'controllable cost' with an example.", answer: "A controllable cost is a cost that can be controlled by the manager of a cost centre. The manager decides on the amount or whether it should be incurred, and can be held responsible for variances. Example: all variable costs are controllable — sales commission can be controlled by the sales manager. Uncontrollable: rates set by the local authority — externally determined." },
  { year: 2020, marks: 6, question: "State four factors a business should consider when preparing sales forecasts.", answer: "Market research and opinions of sales staff. Trends and state of the economy. Selling price to be charged. Competition in the market. Whether the product is a luxury or necessity. Last year's sales from other stores. Seasonal factors. Advertising spend." },
  { year: 2023, marks: 6, question: "What factors for expected sales figures? Advice based on the cash budget.", answer: "Factors: market research, economy trends, price, competition, luxury vs necessity, prior year sales.\n\nAdvice: reference specific figures from the cash budget — e.g. deficit of €69,525 in March. Recommend: arrange overdraft, better credit terms, hire vs buy equipment, negotiate longer supplier credit, reduce January purchases." },
  { year: 2025, marks: 6, question: "Explain the purpose of preparing a production budget. Distinguish between a fixed budget and a flexible budget.", answer: "Production budget: determines how many units to produce to meet expected sales demand while maintaining desired stock levels. Units to produce = budgeted sales + closing stock − opening stock.\n\nFixed budget: prepared for one level of activity only. Does not change when actual output differs from budgeted. Used for planning.\n\nFlexible budget: prepared for several levels of activity. Adjusts costs based on actual output. Used for control — allows meaningful comparison of actual vs budgeted costs at the actual level of activity." },
];
