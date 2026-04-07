// Q8 Costing — Introduction, Formulas, Theory Bank, and Practice Archetypes
// Extracted from original costing-3.html

export interface TheoryQuestion {
  year: number;
  marks: number;
  question: string;
  answer: string;
}

export interface FormulaCard {
  name: string;
  formula: string;
  note: string;
}

export const COSTING_INTRO = [
  {
    title: "What is Q8?",
    content: `<p>Question 8 is <strong>always a costing question</strong>, worth 80 marks. It appears in Section 3, where students choose between Q8 (Costing) and Q9 (Budgeting). The SEC frequently combines multiple sub-topics within a single Q8.</p>`
  },
  {
    title: "What to Expect",
    content: `<p>The examiner will typically give you:</p><ul><li>A profit and loss account or cost data for a manufacturing company</li><li>Information about which costs are fixed and variable (sometimes you must separate them using the High/Low method)</li><li>A series of parts (a) through (f), each building on the previous answer</li><li>At least one theory question at the end (5–13 marks)</li></ul><p class="mt-2"><strong>Recent pattern (2019–2025):</strong> Pure Marginal in 2025, 2023, 2020. Job Costing in 2024 and 2022. The examiner alternates between these, sometimes combining with stock valuation or absorption costing.</p>`
  },
  {
    title: "What the SEC Expects",
    content: `<ul><li><strong>Always write the formula first</strong> — even if your number is wrong, the formula earns marks</li><li><strong>Show all workings</strong> — marks are awarded per line, not just the answer</li><li><strong>State units</strong> — "17,434 units" not just "17,434". 1-mark penalty for missing units</li><li><strong>Profit Margin ≠ Mark-Up</strong> — 30% margin: Cost = 70% of SP. 30% mark-up: SP = Cost × 1.30</li><li><strong>Commission changes when SP changes</strong> — if commission is "5% of sales" and you change the SP, commission per unit changes too</li></ul>`
  },
  {
    title: "Common Trap: Variable vs Fixed",
    accent: true,
    content: `<p>The question will say something like "20% of factory overheads are variable" or "apart from sales commission of 5% of sales, selling and administration expenses are fixed." You <strong>must</strong> correctly identify every cost before building the MCS. Get this wrong and everything that follows will be wrong.</p><p class="mt-2"><strong>Remember:</strong> Sales commission is ALWAYS variable. Admin is almost always fixed. Factory overheads are usually mixed.</p>`
  }
];

export const COSTING_FORMULAS: { section: string; cards: FormulaCard[] }[] = [
  {
    section: "Marginal Costing Formulas",
    cards: [
      { name: "Contribution", formula: "Contribution = Sales − Variable Costs", note: "Per unit: SP − VCpu = Unit Contribution (UCpu)" },
      { name: "Break-Even Point (units)", formula: "BEP = Fixed Costs ÷ UCpu", note: "Units where profit = zero. Always round UP." },
      { name: "Break-Even Point (€)", formula: "BEP (€) = BEP units × SP", note: "Or: FC ÷ C/S Ratio" },
      { name: "Margin of Safety", formula: "MoS = Actual Sales − BEP", note: "Units, euro, or %: (MoS ÷ Actual) × 100" },
      { name: "Target Profit", formula: "Units = (FC + Target Profit) ÷ UCpu", note: "Same as BEP but add desired profit to FC" },
      { name: "C/S Ratio", formula: "C/S = (Contribution ÷ Sales) × 100", note: "Use when unit figures unavailable. BEP(€) = FC ÷ C/S" },
      { name: "Profit Formula", formula: "Profit = (Units × UCpu) − FC", note: "Master equation. Rearrange for any unknown." },
    ]
  },
  {
    section: "Job Costing / Overhead Formulas",
    cards: [
      { name: "OH Absorption Rate", formula: "Rate = Total Dept OH ÷ Dept Hours", note: "Labour hours or machine hours depending on dept type" },
      { name: "Job Cost", formula: "DM + DL + OH Absorbed = Total Cost", note: "OH = Hours × Rate, per department" },
      { name: "Profit Margin", formula: "SP = Cost ÷ (1 − Margin%)", note: "30% margin: SP = Cost ÷ 0.70. NOT Cost × 1.30" },
      { name: "High/Low Method", formula: "VCpu = (HighCost − LowCost) ÷ (HighUnits − LowUnits)", note: "FC = Total − (Units × VCpu). Same at all levels." },
    ]
  }
];

export const COSTING_APPORTIONMENT_NOTE = `<strong>Floor space:</strong> Rent, rates, cleaning, buildings insurance · <strong>Volume:</strong> Light & heat · <strong>Machine hours:</strong> Maintenance, power · <strong>Machinery valuation:</strong> Depreciation, machinery insurance · <strong>Employees:</strong> Canteen, supervisors, admin · <strong>Direct materials:</strong> Material handling`;

export const COSTING_THEORY: TheoryQuestion[] = [
  { year: 2003, marks: 6, question: "State two reasons for product costing and explain each.", answer: "To establish the selling price for tendering. To control costs (budget vs actual). To help planning and decision making. To ascertain closing stock value for final accounts." },
  { year: 2005, marks: 8, question: "Name three overhead absorption rates and why they use budgeted figures.", answer: "Per Labour Hour, Per Machine Hour, Per Unit, % of Prime Cost.\n\nBased on budgeted costs because actual costs aren't known until year-end — business needs to set prices for tendering." },
  { year: 2006, marks: 8, question: "Differences between Marginal and Absorption costing. Which for financial accounting?", answer: "Different profit because stock valued differently. Marginal excludes fixed costs from product cost; absorption includes them. Closing stock lower under marginal.\n\nAbsorption costing — matches costs with revenues and complies with standards." },
  { year: 2007, marks: 8, question: "Explain re-apportionment. Illustrate over-absorption of overheads.", answer: "Re-apportionment: service dept costs transferred to production depts because overheads can only be recovered through production.\n\nOver-absorption: costs over-recovered — budgeted > actual. E.g. fuel costs fell below budget." },
  { year: 2008, marks: 4, question: "Purpose of C/S Ratio? When is it essential?", answer: "To calculate BEP. Essential when unit figures unavailable — only total figures known." },
  { year: 2009, marks: 8, question: "Step fixed cost with example. Two differences: Management vs Financial accounting.", answer: "Step fixed: fixed within a range, increases in steps outside. E.g. rent jumps when new factory floor needed.\n\nManagement: future planning, internal, no legal requirements, frequent reports, by department.\nFinancial: past events, internal+external, governed by legislation, annual, whole business." },
  { year: 2017, marks: 10, question: "What is Sensitivity Analysis?", answer: "'What if' analysis — shows effect on profit from changes in: selling price, sales volume, variable costs, or fixed costs." },
  { year: 2019, marks: 8, question: "Why transfer service dept OH to production? Distinguish allocation, apportionment, absorption.", answer: "Service depts don't produce — costs must be transferred because overheads can only be recovered through production.\n\nAllocation: costs directly identified to a dept.\nApportionment: shared costs divided by a basis.\nAbsorption: charging overheads to products via a rate." },
  { year: 2022, marks: 10, question: "Why budgeted figures for OH rates? Explain under-absorption.", answer: "Because actual costs unknown until year-end — prices needed at time of order.\n\nUnder-absorption: actual > budgeted. Causes: higher labour hours, estimation errors, unexpected cost increases." },
  { year: 2023, marks: 6, question: "Benefits of absorption costing.", answer: "All costs recovered in SP. More accurate stock valuation. Helps calculate total production cost. No need to separate fixed/variable. Complies with standards. Matches costs and revenues." },
  { year: 2025, marks: 13, question: "Sensitivity analysis with example. Step fixed cost. Sketch step fixed cost graph.", answer: "Sensitivity: effect on profit from changes in SP, VCpu, FC, volume. E.g. 'what if SP reduced by €2?'\n\nStep fixed: fixed in a range, jumps at thresholds. E.g. rent €5k for 0-10k units, €15k above.\n\nGraph: X=Output, Y=Cost. Horizontal lines with vertical jumps (staircase). Label both axes, 3+ steps." },
];
