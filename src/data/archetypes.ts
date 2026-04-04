export interface ArchetypeStep {
  title: string;
  marks: number | string;
  explain: string;
  content: string;
  mistakes: string[];
}

export interface Archetype {
  id: string;
  type: string;
  name: string;
  year: number;
  source: string;
  totalMarks: number;
  category: string;
  desc: string;
  partSummary: string[];
  question: string;
  steps: ArchetypeStep[];
}

// ═══════════════════════════════════════════════════════════════════════
// Q8 COSTING ARCHETYPES
// ═══════════════════════════════════════════════════════════════════════
export const COSTING_ARCHETYPES: Archetype[] = [
  {
    id: "marginal-2025",
    type: "Pure Marginal",
    name: "Kells Ltd — Marginal Costing",
    year: 2025,
    source: "SEC 2025 — Section 3, Question 8",
    totalMarks: 80,
    category: "marginal",
    desc: "Given a P&L, separate fixed/variable costs, build an MCS, calculate BEP & MoS, then handle 5 scenario changes. The most common Q8 format.",
    partSummary: ["MCS + Break-up of Costs","BEP + MoS","Target Profit (+25%)","Price cut + advertising","FC increase + SP change","Target profit (10% of sales)","Theory: Sensitivity + Step Fixed + Graph"],
    question: `<h3>2025 — Section 3, Question 8: Marginal Costing</h3>
<p><strong>Kells Ltd</strong> produces a single product. 42,000 units produced and sold at €36.40 each.</p>
<p>Materials €537,600 · Direct Labour €361,200 · Factory O/H €136,500 · Admin €95,700 · Selling €90,000</p>
<p>Materials, direct labour and 20% of factory O/H are variable. Sales commission = 5% of sales (variable). Rest is fixed.</p>`,
    steps: [
      {
        title: "Break-up of Costs",
        marks: 19,
        explain: "Identify what's variable and what's fixed. Materials, Direct Labour, and 20% of Factory O/H are variable. Sales commission = 5% of sales is also variable. Everything else is fixed.",
        content: `<table class="w-full text-sm border-collapse">
<tr class="bg-muted"><th class="text-left p-2 border">Cost</th><th class="p-2 border text-right">Total</th><th class="p-2 border text-right">FC</th><th class="p-2 border text-right">VC</th><th class="p-2 border text-right">VCpu</th></tr>
<tr><td class="p-2 border font-medium">Materials</td><td class="p-2 border text-right">537,600</td><td class="p-2 border text-right">0</td><td class="p-2 border text-right">537,600</td><td class="p-2 border text-right">12.80</td></tr>
<tr><td class="p-2 border font-medium">Direct Labour</td><td class="p-2 border text-right">361,200</td><td class="p-2 border text-right">0</td><td class="p-2 border text-right">361,200</td><td class="p-2 border text-right">8.60</td></tr>
<tr><td class="p-2 border font-medium">Factory O/H</td><td class="p-2 border text-right">136,500</td><td class="p-2 border text-right">109,200</td><td class="p-2 border text-right">27,300</td><td class="p-2 border text-right">0.65</td></tr>
<tr><td class="p-2 border font-medium">Admin</td><td class="p-2 border text-right">95,700</td><td class="p-2 border text-right">95,700</td><td class="p-2 border text-right">0</td><td class="p-2 border text-right">0.00</td></tr>
<tr><td class="p-2 border font-medium">Selling</td><td class="p-2 border text-right">90,000</td><td class="p-2 border text-right">13,560</td><td class="p-2 border text-right">76,440</td><td class="p-2 border text-right">1.82</td></tr>
<tr class="font-bold border-t-2"><td class="p-2 border">Totals</td><td class="p-2 border text-right">1,221,000</td><td class="p-2 border text-right">218,460</td><td class="p-2 border text-right">1,002,540</td><td class="p-2 border text-right">23.87</td></tr>
</table>
<p class="mt-3 text-xs bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded p-3"><strong>Key working — Selling:</strong> Commission = 5% × €1,528,800 = €76,440 (variable). Fixed selling = €90,000 − €76,440 = €13,560.</p>`,
        mistakes: [
          "Forgetting that sales commission (5% of sales) is a VARIABLE cost",
          "Factory OH variable = 20% of 136,500 = 27,300 — don't use 20% of total costs",
          "VCpu = Total VC ÷ 42,000 units — keep 2 decimal places"
        ]
      },
      {
        title: "Marginal Costing Statement",
        marks: "Included in (a)",
        explain: "Build the MCS: Sales − Variable Costs = Contribution − Fixed Costs = Profit. Unit Contribution is your most important number.",
        content: `<table class="w-full text-sm border-collapse">
<tr class="bg-muted"><th class="text-left p-2 border">MCS</th><th class="p-2 border text-right">€</th></tr>
<tr><td class="p-2 border">Sales (42,000 × €36.40)</td><td class="p-2 border text-right">1,528,800</td></tr>
<tr><td class="p-2 border">Less: Variable Costs</td><td class="p-2 border text-right">(1,002,540)</td></tr>
<tr class="font-bold"><td class="p-2 border">Contribution</td><td class="p-2 border text-right">526,260</td></tr>
<tr><td class="p-2 border">Less: Fixed Costs</td><td class="p-2 border text-right">(218,460)</td></tr>
<tr class="font-bold border-t-2"><td class="p-2 border">Profit</td><td class="p-2 border text-right">307,800</td></tr>
</table>
<p class="mt-3 text-sm"><strong>Unit Contribution:</strong> €36.40 − €23.87 = <strong>€12.53</strong></p>`,
        mistakes: [
          "SP per unit = 1,528,800 ÷ 42,000 = €36.40 — you must calculate it",
          "Contribution = Sales − Variable Costs ONLY — do NOT deduct fixed costs",
          "Check: Contribution − FC should = original P&L profit (€307,800)"
        ]
      },
      {
        title: "(a) Break-Even Point & Margin of Safety",
        marks: 16,
        explain: "BEP = Fixed Costs ÷ Unit Contribution. MoS = Actual Sales − BEP.",
        content: `<div class="text-sm space-y-2">
<p><strong>BEP</strong> = €218,460 ÷ €12.53 = <strong>17,434 units</strong></p>
<p><strong>BEP (€)</strong> = 17,434 × €36.40 = <strong>€634,598</strong></p>
<p class="mt-4"><strong>Margin of Safety</strong> = 42,000 − 17,434 = <strong>24,566 units (58.5%)</strong></p>
<p><strong>MoS (€)</strong> = 24,566 × €36.40 = <strong>€894,202</strong></p>
</div>`,
        mistakes: [
          "BEP must be in UNITS first, then convert to euro",
          "MoS % = MoS units ÷ Actual units × 100",
          "Always show BOTH units and euro values"
        ]
      }
    ]
  },
  {
    id: "job-2024",
    type: "Job Costing",
    name: "Wyndham Ltd — OH Apportionment & Job Costing",
    year: 2024,
    source: "SEC 2024 — Section 3, Question 8",
    totalMarks: 80,
    category: "job",
    desc: "Build an Overhead Analysis Sheet with 11 overheads across 4 departments, reapportion service dept costs, calculate absorption rates, then price a job.",
    partSummary: ["OH Analysis Sheet (11 items, 4 depts)","Reapportionment of service depts","OH Absorption Rates","Job Cost Sheet for Job AB6710"],
    question: `<h3>2024 — Section 3, Question 8: Overhead Apportionment/Job Costing</h3>
<p><strong>Wyndham Ltd</strong> has Assembly, Finishing (production) and Finance, HR (service) departments.</p>
<p>11 overheads to apportion. Service dept costs reapportioned on labour hours (60,000:15,000 = 4:1).</p>`,
    steps: [
      {
        title: "(a) Overhead Analysis Sheet",
        marks: 24,
        explain: "Allocate each of the 11 overheads to the 4 departments using the correct apportionment basis. Floor space → cleaning, insurance, rent. Volume → light & heat. Machine hours → maintenance. Machinery valuation → depreciation. Employees → canteen, supervisors, admin.",
        content: `<table class="w-full text-xs border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border">Overhead</th><th class="p-1.5 border">Basis</th><th class="p-1.5 border text-right">Total</th><th class="p-1.5 border text-right">Assy</th><th class="p-1.5 border text-right">Fin</th><th class="p-1.5 border text-right">Fin.</th><th class="p-1.5 border text-right">HR</th></tr>
<tr><td class="p-1.5 border">Indirect labour</td><td class="p-1.5 border">Given</td><td class="p-1.5 border text-right">18,900</td><td class="p-1.5 border text-right">15,120</td><td class="p-1.5 border text-right">3,780</td><td class="p-1.5 border text-right">—</td><td class="p-1.5 border text-right">—</td></tr>
<tr><td class="p-1.5 border">Factory cleaning</td><td class="p-1.5 border">Floor</td><td class="p-1.5 border text-right">12,500</td><td class="p-1.5 border text-right">6,250</td><td class="p-1.5 border text-right">3,125</td><td class="p-1.5 border text-right">1,875</td><td class="p-1.5 border text-right">1,250</td></tr>
<tr><td class="p-1.5 border">Machine maint.</td><td class="p-1.5 border">Mach hrs</td><td class="p-1.5 border text-right">21,600</td><td class="p-1.5 border text-right">12,960</td><td class="p-1.5 border text-right">8,640</td><td class="p-1.5 border text-right">—</td><td class="p-1.5 border text-right">—</td></tr>
<tr class="font-bold border-t-2"><td class="p-1.5 border" colspan="2">Totals</td><td class="p-1.5 border text-right">214,575</td><td class="p-1.5 border text-right">126,105</td><td class="p-1.5 border text-right">58,770</td><td class="p-1.5 border text-right">16,145</td><td class="p-1.5 border text-right">13,555</td></tr>
</table>`,
        mistakes: [
          "Machine maintenance uses MACHINE HOURS, not labour hours",
          "Light & heat uses VOLUME (cubic metres), not floor space",
          "Depreciation uses MACHINERY VALUATION, not machine hours",
          "Service departments get NO share of machine-related costs"
        ]
      },
      {
        title: "(b) Reapportionment",
        marks: 12,
        explain: "Service department costs transferred to production on labour hours ratio 4:1. Finance €16,145: Assembly gets 4/5 = €12,916, Finishing 1/5 = €3,229. HR €13,555: Assembly 4/5 = €10,844, Finishing 1/5 = €2,711.",
        content: `<div class="text-sm space-y-2">
<p><strong>Ratio:</strong> Assembly 60,000 : Finishing 15,000 = 4 : 1</p>
<p><strong>Finance (€16,145):</strong> Assembly €12,916 · Finishing €3,229</p>
<p><strong>HR (€13,555):</strong> Assembly €10,844 · Finishing €2,711</p>
<p class="mt-3 font-bold">Final: Assembly €149,865 · Finishing €64,710</p>
</div>`,
        mistakes: [
          "Use LABOUR HOURS ratio (as specified), not employees or floor space",
          "Both service depts are reapportioned to production ONLY"
        ]
      }
    ]
  }
];

export const COSTING_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "marginal", label: "Marginal" },
  { key: "absorption", label: "Absorption" },
  { key: "job", label: "Job Costing" },
  { key: "stock", label: "Stock Valuation" },
  { key: "overhead", label: "Overhead Apportionment" },
];

// ═══════════════════════════════════════════════════════════════════════
// Q9 BUDGETING ARCHETYPES
// ═══════════════════════════════════════════════════════════════════════
export const BUDGETING_ARCHETYPES: Archetype[] = [
  {
    id: "cash-2023",
    type: "Cash Budget",
    name: "Lupin Ltd — Cash Budget & Budgeted P&L",
    year: 2023,
    source: "SEC 2023 — Section 2, Question 9",
    totalMarks: 80,
    category: "cash",
    desc: "Prepare a 6-month cash budget with credit sales collection patterns, credit purchase payment patterns, loan interest, equipment purchase, and a budgeted P&L.",
    partSummary: ["6-month Cash Budget (58 marks)","Budgeted P&L (16 marks)","Theory: Sales forecast factors + Advice (6 marks)"],
    question: `<h3>2023 — Section 2, Question 9: Budgeting</h3>
<p><strong>Lupin Ltd</strong> setting up 01/01/2024 with €80,000 lodged. SP = €50/unit.</p>
<p>Cash customers: 40% (5% discount). Credit: 60% — collected 60% in month+1, 40% in month+2.</p>
<p>Purchase payments: 50% in month+1 (2% discount), 50% in month+2.</p>`,
    steps: [
      {
        title: "Cash Collection Pattern",
        marks: "Workings",
        explain: "40% of sales are cash (with 5% discount). 60% are credit — of which 60% is collected one month later and 40% two months later.",
        content: `<div class="text-sm space-y-2">
<p><strong>Cash Sales:</strong> Monthly Sales × 40% × 95% (after 5% discount)</p>
<p>January: €468,000 × 0.40 × 0.95 = <strong>€177,840</strong></p>
<p><strong>Credit Sales (60%):</strong></p>
<p>60% collected in month+1, 40% in month+2</p>
<p>Jan credit: €468,000 × 60% = €280,800</p>
<p>→ Feb: €280,800 × 60% = €168,480</p>
<p>→ Mar: €280,800 × 40% = €112,320</p>
</div>`,
        mistakes: [
          "Cash discount of 5% is on CASH sales only (the 40%), not total sales",
          "Credit customers pay in months AFTER the sale — no credit receipts in January for a new business",
          "Purchase discount of 2% applies only to the 50% paid in month+1"
        ]
      },
      {
        title: "(a) Cash Budget — Receipts",
        marks: "Part of 58",
        explain: "Build the top half of the cash budget grid — Cash Sales, Credit Month+1, Credit Month+2.",
        content: `<div class="overflow-x-auto"><table class="w-full text-xs border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border">Receipts</th><th class="p-1.5 border text-right">Jan</th><th class="p-1.5 border text-right">Feb</th><th class="p-1.5 border text-right">Mar</th><th class="p-1.5 border text-right">Apr</th><th class="p-1.5 border text-right">May</th><th class="p-1.5 border text-right">Jun</th></tr>
<tr><td class="p-1.5 border">Cash Sales</td><td class="p-1.5 border text-right">177,840</td><td class="p-1.5 border text-right">206,910</td><td class="p-1.5 border text-right">215,460</td><td class="p-1.5 border text-right">222,300</td><td class="p-1.5 border text-right">225,720</td><td class="p-1.5 border text-right">251,180</td></tr>
<tr><td class="p-1.5 border">Credit — 1 month</td><td class="p-1.5 border text-right">—</td><td class="p-1.5 border text-right">168,480</td><td class="p-1.5 border text-right">196,020</td><td class="p-1.5 border text-right">204,120</td><td class="p-1.5 border text-right">210,600</td><td class="p-1.5 border text-right">213,840</td></tr>
<tr><td class="p-1.5 border">Credit — 2 months</td><td class="p-1.5 border text-right">—</td><td class="p-1.5 border text-right">—</td><td class="p-1.5 border text-right">112,320</td><td class="p-1.5 border text-right">130,680</td><td class="p-1.5 border text-right">136,080</td><td class="p-1.5 border text-right">140,400</td></tr>
<tr class="font-bold border-t-2"><td class="p-1.5 border">Total Receipts</td><td class="p-1.5 border text-right">177,840</td><td class="p-1.5 border text-right">375,390</td><td class="p-1.5 border text-right">523,800</td><td class="p-1.5 border text-right">557,100</td><td class="p-1.5 border text-right">572,400</td><td class="p-1.5 border text-right">605,420</td></tr>
</table></div>`,
        mistakes: [
          "January has ZERO credit receipts — there are no sales before January (new business)",
          "February has credit from Jan only (1 month), not from 2 months ago",
          "Cash sales discount is 5% OFF (×0.95), not 5% of sales revenue"
        ]
      },
      {
        title: "(c) Theory — Factors & Advice",
        marks: 6,
        explain: "Factors affecting sales forecasts and advice based on the cash budget.",
        content: `<div class="text-sm space-y-2">
<p><strong>Factors for sales forecasts:</strong> Market research; trends/state of economy; selling price; competition; luxury vs necessity; last year's sales.</p>
<p class="mt-3"><strong>Advice:</strong> The cash budget shows deficits in Feb–May, max deficit of €69,525 in March. Arrange overdraft of €70,000+. Offer discounts for faster payment. Consider hiring equipment. Negotiate longer credit terms with suppliers.</p>
</div>`,
        mistakes: [
          "ALWAYS reference specific figures from YOUR cash budget",
          "Give at least 4 distinct recommendations",
          "Link advice to the cash budget pattern"
        ]
      }
    ]
  },
  {
    id: "flexible-2018",
    type: "Flexible Budget",
    name: "SEC 2018 — Flexible Budgeting",
    year: 2018,
    source: "SEC 2018 — Section 3, Question 9",
    totalMarks: 80,
    category: "flexible",
    desc: "Separate costs into fixed and variable using High/Low method, prepare a flexible budget at a new activity level using marginal costing, then calculate BEP and MoS.",
    partSummary: ["High/Low — Production OH","High/Low — Other OH","Flexible Budget at 85%","BEP + MoS","Theory: Controllable Costs"],
    question: `<h3>2018 — Section 3, Question 9: Flexible Budgeting</h3>
<p>Flexible budgets at 50%, 75%, 95% capacity (20k, 30k, 38k units).</p>
<p>Profit = 20% of sales. Separate production OH and other OH using High/Low.</p>`,
    steps: [
      {
        title: "(a)(i) High/Low — Production Overheads",
        marks: 14,
        explain: "Take highest (95%: 38,000 units, €191,000) and lowest (50%: 20,000 units, €110,000). Difference: 18,000 units, €81,000. VCpu = €81,000 ÷ 18,000 = €4.50. Fixed = €20,000.",
        content: `<div class="text-sm space-y-2">
<table class="w-full text-sm border-collapse max-w-md">
<tr class="bg-muted"><th class="text-left p-2 border">Production O/H</th><th class="p-2 border text-right">Units</th><th class="p-2 border text-right">Cost €</th></tr>
<tr><td class="p-2 border">High (95%)</td><td class="p-2 border text-right">38,000</td><td class="p-2 border text-right">191,000</td></tr>
<tr><td class="p-2 border">Low (50%)</td><td class="p-2 border text-right">20,000</td><td class="p-2 border text-right">110,000</td></tr>
<tr class="font-bold border-t-2"><td class="p-2 border">Difference</td><td class="p-2 border text-right">18,000</td><td class="p-2 border text-right">81,000</td></tr>
</table>
<p class="mt-3"><strong>VCpu</strong> = €81,000 ÷ 18,000 = <strong>€4.50</strong></p>
<p><strong>Fixed cost</strong> = €110,000 − (20,000 × €4.50) = <strong>€20,000</strong> ✓ Same at all levels</p>
</div>`,
        mistakes: [
          "Always use HIGHEST and LOWEST levels — not any two random points",
          "The proof table (showing fixed cost is the same at all levels) is worth marks",
          "Admin OH is already clearly fixed (same at all levels) — no High/Low needed"
        ]
      },
      {
        title: "(a)(ii) High/Low — Other Overhead Costs",
        marks: 14,
        explain: "Same method for Other OH. Difference: 18,000 units, €140,400. VCpu = €7.80. Fixed = €15,000.",
        content: `<div class="text-sm space-y-2">
<p><strong>VCpu</strong> = €140,400 ÷ 18,000 = <strong>€7.80</strong></p>
<p><strong>Fixed</strong> = €171,000 − (20,000 × €7.80) = <strong>€15,000</strong></p>
<p class="mt-3 font-bold">Summary: Total VCpu = €4.50 + €15.00 + €4.50 + €7.80 = €31.80</p>
<p class="font-bold">Total FC = €20,000 + €15,000 + €80,600 = €115,600</p>
</div>`,
        mistakes: [
          "Materials VCpu = €90,000 ÷ 20,000 = €4.50 — purely variable",
          "Wages VCpu = €300,000 ÷ 20,000 = €15.00 — also purely variable",
          "Admin OH is FIXED — don't apply High/Low to it"
        ]
      }
    ]
  }
];

export const BUDGETING_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cash", label: "Cash Budget" },
  { key: "production", label: "Production Budget" },
  { key: "flexible", label: "Flexible Budget" },
];
