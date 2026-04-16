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
// Q8 COSTING ARCHETYPES — from original costing-3.html
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
    partSummary: ["MCS + Break-up of Costs", "BEP + MoS", "Target Profit (+25%)", "Price cut + advertising", "FC increase + SP change", "Target profit (10% of sales)", "Theory: Sensitivity + Step Fixed + Graph"],
    question: `<h3>2025 — Section 3, Question 8: Marginal Costing</h3>
<div class="text-sm text-muted-foreground leading-relaxed">
<p><strong>Kells Ltd</strong> produces a single product. The company's profit and loss account for the year ended 31/12/2024, during which <strong>42,000 units</strong> were produced and sold, was as follows:</p>
<table class="w-full text-xs border-collapse my-2">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Item</th><th class="p-1.5 border border-border text-right">€</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Sales (42,000 units)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right">1,528,800</td></tr>
<tr><td class="p-1.5 border border-border">Materials</td><td class="p-1.5 border border-border text-right">537,600</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Direct labour</td><td class="p-1.5 border border-border text-right">361,200</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Factory overheads</td><td class="p-1.5 border border-border text-right">136,500</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Administration expenses</td><td class="p-1.5 border border-border text-right">95,700</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Selling expenses</td><td class="p-1.5 border border-border text-right">90,000</td><td class="p-1.5 border border-border text-right">1,221,000</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border">Net Profit</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right">307,800</td></tr>
</table>
<p>The materials, direct labour and 20% of the factory overheads are variable costs. Apart from sales commission of 5% of sales, selling and administration expenses are fixed.</p>
<p><strong>You are required to calculate:</strong></p>
<p>(a) The company's break-even point and margin of safety.</p>
<p>(b) Units to sell in 2025 to increase net profit by 25%, assuming SP, cost levels & percentages unchanged.</p>
<p>(c) Profit if SP reduced to €34, advertising increased by €13,000, units sold increase to 45,000.</p>
<p>(d) SP per unit if fixed costs increase by 10% but volume of sales and profit remain the same.</p>
<p>(e) Units at €35 SP to provide profit of 10% of sales revenue.</p>
<p>(f)(i) Explain sensitivity analysis. (ii) Explain step fixed cost. (iii) Sketch a step fixed cost graph.</p>
</div>`,
    steps: [
      {
        title: "Break-up of Costs",
        marks: 19,
        explain: "<strong>First, identify what's variable and what's fixed.</strong> The question tells you: Materials, Direct Labour, and 20% of Factory O/H are variable. Sales commission = 5% of sales is also variable. Everything else is fixed. Build the break-up table showing Total, Fixed, Variable, and Variable Cost per Unit for each cost line.",
        content: `<table class="w-full text-xs border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Cost</th><th class="p-1.5 border border-border text-right">Total (€)</th><th class="p-1.5 border border-border text-right">FC (€)</th><th class="p-1.5 border border-border text-right">VC (€)</th><th class="p-1.5 border border-border text-right">VCpu (€)</th></tr>
<tr><td class="p-1.5 border border-border">Materials</td><td class="p-1.5 border border-border text-right font-mono">537,600</td><td class="p-1.5 border border-border text-right font-mono">0</td><td class="p-1.5 border border-border text-right font-mono">537,600</td><td class="p-1.5 border border-border text-right font-mono">12.80</td></tr>
<tr><td class="p-1.5 border border-border">Direct Labour</td><td class="p-1.5 border border-border text-right font-mono">361,200</td><td class="p-1.5 border border-border text-right font-mono">0</td><td class="p-1.5 border border-border text-right font-mono">361,200</td><td class="p-1.5 border border-border text-right font-mono">8.60</td></tr>
<tr><td class="p-1.5 border border-border">Factory O/H</td><td class="p-1.5 border border-border text-right font-mono">136,500</td><td class="p-1.5 border border-border text-right font-mono">109,200</td><td class="p-1.5 border border-border text-right font-mono">27,300</td><td class="p-1.5 border border-border text-right font-mono">0.65</td></tr>
<tr><td class="p-1.5 border border-border">Admin expenses</td><td class="p-1.5 border border-border text-right font-mono">95,700</td><td class="p-1.5 border border-border text-right font-mono">95,700</td><td class="p-1.5 border border-border text-right font-mono">0</td><td class="p-1.5 border border-border text-right font-mono">0.00</td></tr>
<tr><td class="p-1.5 border border-border">Selling expenses</td><td class="p-1.5 border border-border text-right font-mono">90,000</td><td class="p-1.5 border border-border text-right font-mono">13,560</td><td class="p-1.5 border border-border text-right font-mono">76,440</td><td class="p-1.5 border border-border text-right font-mono">1.82</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Totals</strong></td><td class="p-1.5 border border-border text-right font-mono">1,221,000</td><td class="p-1.5 border border-border text-right font-mono">218,460</td><td class="p-1.5 border border-border text-right font-mono">1,002,540</td><td class="p-1.5 border border-border text-right font-mono">23.87</td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950"><strong>Key working — Selling expenses:</strong> Commission = 5% × €1,528,800 = €76,440 (variable). Fixed selling = €90,000 − €76,440 = €13,560. Factory O/H: 20% variable = €27,300, 80% fixed = €109,200.</p>`,
        mistakes: ["Forgetting that sales commission (5% of sales) is a VARIABLE cost — many students treat all selling expenses as fixed", "Calculating factory OH variable as 20% of 136,500 = 27,300 — correct. Common error: using 20% of total costs instead", "VCpu = Total VC ÷ 42,000 units. Don't round too early — keep 2 decimal places"]
      },
      {
        title: "Marginal Costing Statement",
        marks: "In (a)",
        explain: "<strong>Now build the MCS from your break-up.</strong> Format: Sales − Variable Costs = Contribution − Fixed Costs = Profit. Show both total and per unit columns. The Unit Contribution is the key figure — you'll use it for every calculation that follows.",
        content: `<table class="w-full text-xs border-collapse max-w-sm">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Marginal Costing Statement</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Sales (42,000 × €36.40)</td><td class="p-1.5 border border-border text-right font-mono">1,528,800</td></tr>
<tr><td class="p-1.5 border border-border">Less: Variable Costs (42,000 × €23.87)</td><td class="p-1.5 border border-border text-right font-mono">(1,002,540)</td></tr>
<tr class="font-bold"><td class="p-1.5 border border-border"><strong>Contribution</strong></td><td class="p-1.5 border border-border text-right font-mono">526,260</td></tr>
<tr><td class="p-1.5 border border-border">Less: Fixed Costs</td><td class="p-1.5 border border-border text-right font-mono">(218,460)</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Profit</strong></td><td class="p-1.5 border border-border text-right font-mono">307,800</td></tr>
</table>
<table class="w-full text-xs border-collapse max-w-[200px] mt-3">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Unit figures</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Selling Price</td><td class="p-1.5 border border-border text-right font-mono">36.40</td></tr>
<tr><td class="p-1.5 border border-border">Variable Cost p.u.</td><td class="p-1.5 border border-border text-right font-mono">(23.87)</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Unit Contribution</strong></td><td class="p-1.5 border border-border text-right font-mono">12.53</td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Selling Price per unit:</strong> €1,528,800 ÷ 42,000 = <strong>€36.40</strong>. This isn't given directly — you must calculate it from total sales ÷ units. Unit Contribution = €36.40 − €23.87 = <strong>€12.53</strong>. This is your most important number.</p>`,
        mistakes: ["SP per unit is NOT given in the question — you must calculate it: 1,528,800 ÷ 42,000 = €36.40", "Contribution must equal Sales − Variable Costs ONLY. Do NOT deduct fixed costs from contribution", "Check: Contribution − Fixed Costs should = Profit from the original P&L (€307,800). If not, you've made an error in your break-up"]
      },
      {
        title: "(a) Break-Even Point & Margin of Safety",
        marks: 16,
        explain: "<strong>BEP = Fixed Costs ÷ Unit Contribution.</strong> This gives you units. Multiply by SP for euro value. Margin of Safety = Actual Sales − BEP (in units or €). This tells you how much sales can drop before the company makes a loss.",
        content: `<div class="text-sm space-y-2 leading-relaxed">
<p><strong>Break-Even Point:</strong></p>
<p class="ml-5">BEP = FC ÷ UCpu = €218,460 ÷ €12.53 = <strong>17,434 units</strong></p>
<p class="ml-5">BEP (€) = 17,434 × €36.40 = <strong>€634,598</strong></p>
<p class="mt-4"><strong>Margin of Safety:</strong></p>
<p class="ml-5">MoS = Actual − BEP = 42,000 − 17,434 = <strong>24,566 units</strong></p>
<p class="ml-5">MoS (€) = 24,566 × €36.40 = <strong>€894,202</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Formula reminder:</strong> BEP (units) = Fixed Costs ÷ Contribution per Unit. Always state the formula, show the substitution, then the answer — this gets you 3 marks even if the number is wrong.</p>`,
        mistakes: ["Always round BEP UP to whole units (you can't sell 0.43 of a unit)", "Don't forget to show BEP in BOTH units and euro — the question asks for both", "MoS can also be expressed as a percentage: (24,566 ÷ 42,000) × 100 = 58.5%"]
      },
      {
        title: "(b) Units for 25% Profit Increase",
        marks: 8,
        explain: "<strong>Target Profit questions follow the same formula as BEP, but add the target profit to fixed costs.</strong> New target = current profit + 25%. Units = (FC + Target Profit) ÷ UCpu.",
        content: `<div class="text-sm space-y-2 leading-relaxed">
<p><strong>Target Profit:</strong> €307,800 × 1.25 = <strong>€384,750</strong></p>
<p><strong>Formula:</strong> Sales − VC − FC = Profit</p>
<p class="ml-5">Let X = number of units</p>
<p class="ml-5">36.40X − 23.87X − 218,460 = 384,750</p>
<p class="ml-5">12.53X = 603,210</p>
<p class="ml-5">X = <strong>48,140 units</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Alternative quick method:</strong> Units = (FC + Target Profit) ÷ UCpu = (218,460 + 384,750) ÷ 12.53 = 48,140 units. Both methods get full marks.</p>`,
        mistakes: ["The 25% increase is on PROFIT (€307,800), not on sales", "Don't recalculate variable costs or fixed costs — the question says 'assume SP, cost levels & percentages remain unchanged'"]
      },
      {
        title: "(c) Profit with Price Cut + Advertising",
        marks: 8,
        explain: "<strong>Scenario change: new SP (€34), extra advertising (€13,000), new volume (45,000 units).</strong> Rebuild the MCS with changed figures. Variable cost per unit stays at €23.87 EXCEPT the commission which is now 5% of the new SP.",
        content: `<div class="text-sm space-y-2 leading-relaxed">
<p><strong>New VC per unit:</strong></p>
<p class="ml-5">Old VCpu without commission: €23.87 − €1.82 = €22.05</p>
<p class="ml-5">New commission: 5% × €34 = <strong>€1.70</strong></p>
<p class="ml-5">New VCpu = €22.05 + €1.70 = <strong>€23.75</strong></p>
<p class="ml-5">New UCpu = €34.00 − €23.75 = <strong>€10.25</strong></p>
<p class="mt-3"><strong>New Fixed Costs:</strong> €218,460 + €13,000 = <strong>€231,460</strong></p>
<p class="mt-3"><strong>Profit:</strong></p>
<p class="ml-5">Contribution = 45,000 × €10.25 = €461,250</p>
<p class="ml-5">Profit = €461,250 − €231,460 = <strong>€229,790</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950"><strong>Critical trap:</strong> When SP changes, the sales commission (5% of sales) also changes because it's a percentage of the NEW selling price, not the old one. This is the most common error on this part.</p>`,
        mistakes: ["Commission changes when SP changes! 5% × €34 = €1.70 (not the old €1.82)", "The extra advertising (€13,000) is added to FIXED costs, not variable", "Note this profit (€229,790) is LESS than the original (€307,800) — the price cut and extra advertising aren't worth it"]
      },
      {
        title: "(d) SP if Fixed Costs +10%, Same Profit",
        marks: 8,
        explain: "<strong>Fixed costs increase by 10%, but profit and volume stay the same.</strong> Work backwards from the profit equation to find the new SP. Remember: commission is 5% of the NEW (unknown) SP.",
        content: `<div class="text-sm space-y-2 leading-relaxed font-mono">
<p><strong class="font-sans">Let SP = X</strong></p>
<p>New FC: €218,460 × 1.10 = <strong>€240,306</strong></p>
<p>New Commission: 5% of X = 0.05X</p>
<p>New VCpu: €22.05 + 0.05X</p>
<p class="mt-3"><strong class="font-sans">Equation:</strong></p>
<p class="ml-5">42,000X − 42,000(22.05 + 0.05X) − 240,306 = 307,800</p>
<p class="ml-5">42,000X − 926,100 − 2,100X − 240,306 = 307,800</p>
<p class="ml-5">39,900X = 1,474,206</p>
<p class="ml-5">X = <strong>€36.95</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted font-sans"><strong>Why can't you just add €0.55 to the old price?</strong> Because when SP changes, the 5% commission also changes. So the equation uses 0.05X (variable) rather than a fixed commission amount. This is an algebra question disguised as accounting.</p>`,
        mistakes: ["You MUST use algebra here because commission depends on the unknown SP", "Volume stays at 42,000 (same as original) — the question says 'volume of sales remains the same'", "Don't forget to multiply the old VCpu (without commission) by 42,000 units"]
      },
      {
        title: "(e) Units at €35 for 10% Profit on Sales",
        marks: 8,
        explain: "<strong>Target: Profit = 10% of Sales Revenue.</strong> Let X = units. Sales = 35X. Profit = 0.10 × 35X = 3.5X. Build the equation and solve.",
        content: `<div class="text-sm space-y-2 leading-relaxed font-mono">
<p><strong class="font-sans">Let X = number of units</strong></p>
<p>New SP = €35. New commission = 5% × €35 = €1.75</p>
<p>New VCpu = €22.05 + €1.75 = <strong>€23.80</strong></p>
<p>New UCpu = €35.00 − €23.80 = <strong>€11.20</strong></p>
<p class="mt-3"><strong class="font-sans">Profit = 10% of Sales:</strong></p>
<p class="ml-5">35X − 23.80X − 218,460 = 3.5X</p>
<p class="ml-5">11.20X − 218,460 = 3.5X</p>
<p class="ml-5">7.70X = 218,460</p>
<p class="ml-5">X = <strong>28,371 units</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted font-sans"><strong>The trick:</strong> Profit isn't a fixed amount here — it's 10% of sales, which depends on how many units you sell. So you can't use the simple BEP formula. You must set up the equation with profit as 3.5X on the right side, then move it to the left.</p>`,
        mistakes: ["Profit = 10% of SALES (35X), not 10% of contribution", "Commission changes again because SP = €35 (not €36.40)", "This is testing your algebra — show each line of working for method marks"]
      },
      {
        title: "(f) Theory — Sensitivity, Step Fixed, Graph",
        marks: 13,
        explain: "<strong>Theory is worth 13 marks here — don't skip it!</strong> Sensitivity Analysis, Step Fixed Costs, and a graph. Each needs a clear definition with an example.",
        content: `<div class="text-sm space-y-3 leading-relaxed">
<p><strong>(f)(i) Sensitivity Analysis</strong></p>
<p>A "what-if" analysis that examines how changes in key variables affect profit. The four variables: <strong>Selling Price, Variable Cost per Unit, Fixed Costs, Sales Volume.</strong></p>
<p class="ml-5 text-xs text-muted-foreground">Example: "What if we reduce the selling price by €2? New UCpu = €10.53, new BEP = 20,746 units."</p>

<p class="mt-2"><strong>(f)(ii) Step Fixed Cost</strong></p>
<p>A cost that is fixed within a certain range of output but increases in steps when a threshold is crossed.</p>
<p class="ml-5 text-xs text-muted-foreground">Example: Rent is €5,000 for 0–10,000 units, €15,000 for 10,001–20,000 units, €25,000 for 20,001–30,000 units.</p>

<p class="mt-2"><strong>(f)(iii) Step Fixed Cost Graph</strong></p>
<pre class="text-xs font-mono bg-muted p-3 rounded-lg mt-1">
Cost (€)
  │
35,000 ┤                    ┌──────────
       │                    │
25,000 ┤          ┌─────────┘
       │          │
 5,000 ┤──────────┘
       │
       └──────────┬─────────┬──────────→
              10,000    20,000     Output</pre>
</div>`,
        mistakes: ["For sensitivity analysis, you must mention the FOUR variables: SP, VCpu, FC, and volume", "The graph must have LABELLED axes — 'Cost (€)' and 'Output (units)'", "Show at least 3 steps in your graph with specific numbers from the table given"]
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
    partSummary: ["OH Analysis Sheet (11 items, 4 depts)", "Reapportionment of service depts", "OH Absorption Rates", "Job Cost Sheet for Job AB6710"],
    question: `<h3>2024 — Section 3, Question 8: Overhead Apportionment/Job Costing</h3>
<div class="text-sm text-muted-foreground leading-relaxed">
<p><strong>Wyndham Ltd</strong> has two production departments (Assembly and Finishing) and two ancillary/service departments (Finance and Human Resource). Service department overheads are to be apportioned to production departments on the basis of <strong>labour hours</strong>.</p>
<p>The budgeted overheads for the year ended 31/12/2024:</p>
<table class="w-full text-xs border-collapse my-2">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Overhead</th><th class="p-1.5 border border-border text-right">Total €</th><th class="p-1.5 border border-border text-right">Assembly €</th><th class="p-1.5 border border-border text-right">Finishing €</th><th class="p-1.5 border border-border text-right">Finance €</th><th class="p-1.5 border border-border text-right">HR €</th></tr>
<tr><td class="p-1.5 border border-border">Indirect labour</td><td class="p-1.5 border border-border text-right">18,900</td><td class="p-1.5 border border-border text-right">15,120</td><td class="p-1.5 border border-border text-right">3,780</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Material handling costs</td><td class="p-1.5 border border-border text-right">9,900</td><td class="p-1.5 border border-border text-right">5,500</td><td class="p-1.5 border border-border text-right">4,400</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border"></td></tr>
</table>
<p>Additional information: Floor space 10k:5k:3k:2k. Volume 15k:10k:3k:2k. Machine hours 30k:20k. Labour hours 60k:15k. Machinery valuation 150k:50k. Employees 25:10:5:5.</p>
<p class="mt-2"><strong>Job No. AB6710:</strong> Assembly: DM €4,500, DL €3,600, 280 MH, 320 LH. Finishing: DM €3,200, DL €4,350, 350 MH, 275 LH. Profit margin: 30%.</p>
</div>`,
    steps: [
      {
        title: "(a) Overhead Analysis Sheet — Apportionment",
        marks: 24,
        explain: "<strong>This is the big one — 24 marks.</strong> You need to allocate each of the 11 overheads to the 4 departments using the correct apportionment basis. Some overheads are already allocated (indirect labour, material handling). The rest need a basis: floor space, machine hours, volume, machinery valuation, or number of employees.",
        content: `<div class="overflow-x-auto"><table class="w-full text-[11px] border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border min-w-[110px]">Overhead</th><th class="p-1.5 border border-border">Basis</th><th class="p-1.5 border border-border text-right">Total</th><th class="p-1.5 border border-border text-right">Assy</th><th class="p-1.5 border border-border text-right">Fin</th><th class="p-1.5 border border-border text-right">Fin.</th><th class="p-1.5 border border-border text-right">HR</th></tr>
<tr><td class="p-1.5 border border-border">Indirect labour</td><td class="p-1.5 border border-border">Given</td><td class="p-1.5 border border-border text-right font-mono">18,900</td><td class="p-1.5 border border-border text-right font-mono">15,120</td><td class="p-1.5 border border-border text-right font-mono">3,780</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr>
<tr><td class="p-1.5 border border-border">Mat. handling</td><td class="p-1.5 border border-border">Given</td><td class="p-1.5 border border-border text-right font-mono">9,900</td><td class="p-1.5 border border-border text-right font-mono">5,500</td><td class="p-1.5 border border-border text-right font-mono">4,400</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr>
<tr><td class="p-1.5 border border-border">Factory cleaning</td><td class="p-1.5 border border-border">Floor</td><td class="p-1.5 border border-border text-right font-mono">12,500</td><td class="p-1.5 border border-border text-right font-mono">6,250</td><td class="p-1.5 border border-border text-right font-mono">3,125</td><td class="p-1.5 border border-border text-right font-mono">1,875</td><td class="p-1.5 border border-border text-right font-mono">1,250</td></tr>
<tr><td class="p-1.5 border border-border">Mach. maintenance</td><td class="p-1.5 border border-border">MH</td><td class="p-1.5 border border-border text-right font-mono">21,600</td><td class="p-1.5 border border-border text-right font-mono">12,960</td><td class="p-1.5 border border-border text-right font-mono">8,640</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr>
<tr><td class="p-1.5 border border-border">Light & heat</td><td class="p-1.5 border border-border">Vol</td><td class="p-1.5 border border-border text-right font-mono">36,000</td><td class="p-1.5 border border-border text-right font-mono">18,000</td><td class="p-1.5 border border-border text-right font-mono">12,000</td><td class="p-1.5 border border-border text-right font-mono">3,600</td><td class="p-1.5 border border-border text-right font-mono">2,400</td></tr>
<tr><td class="p-1.5 border border-border">Depreciation</td><td class="p-1.5 border border-border">M.val</td><td class="p-1.5 border border-border text-right font-mono">25,000</td><td class="p-1.5 border border-border text-right font-mono">18,750</td><td class="p-1.5 border border-border text-right font-mono">6,250</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr>
<tr><td class="p-1.5 border border-border">Bldg insurance</td><td class="p-1.5 border border-border">Floor</td><td class="p-1.5 border border-border text-right font-mono">2,700</td><td class="p-1.5 border border-border text-right font-mono">1,350</td><td class="p-1.5 border border-border text-right font-mono">675</td><td class="p-1.5 border border-border text-right font-mono">405</td><td class="p-1.5 border border-border text-right font-mono">270</td></tr>
<tr><td class="p-1.5 border border-border">Canteen</td><td class="p-1.5 border border-border">Emps</td><td class="p-1.5 border border-border text-right font-mono">14,850</td><td class="p-1.5 border border-border text-right font-mono">8,250</td><td class="p-1.5 border border-border text-right font-mono">3,300</td><td class="p-1.5 border border-border text-right font-mono">1,650</td><td class="p-1.5 border border-border text-right font-mono">1,650</td></tr>
<tr><td class="p-1.5 border border-border">Rent and rates</td><td class="p-1.5 border border-border">Floor</td><td class="p-1.5 border border-border text-right font-mono">12,600</td><td class="p-1.5 border border-border text-right font-mono">6,300</td><td class="p-1.5 border border-border text-right font-mono">3,150</td><td class="p-1.5 border border-border text-right font-mono">1,890</td><td class="p-1.5 border border-border text-right font-mono">1,260</td></tr>
<tr><td class="p-1.5 border border-border">Supervisors</td><td class="p-1.5 border border-border">Emps</td><td class="p-1.5 border border-border text-right font-mono">50,850</td><td class="p-1.5 border border-border text-right font-mono">28,250</td><td class="p-1.5 border border-border text-right font-mono">11,300</td><td class="p-1.5 border border-border text-right font-mono">5,650</td><td class="p-1.5 border border-border text-right font-mono">5,650</td></tr>
<tr><td class="p-1.5 border border-border">Admin costs</td><td class="p-1.5 border border-border">Emps</td><td class="p-1.5 border border-border text-right font-mono">9,675</td><td class="p-1.5 border border-border text-right font-mono">5,375</td><td class="p-1.5 border border-border text-right font-mono">2,150</td><td class="p-1.5 border border-border text-right font-mono">1,075</td><td class="p-1.5 border border-border text-right font-mono">1,075</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Totals</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>214,575</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>126,105</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>58,770</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>16,145</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>13,555</strong></td></tr>
</table></div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Apportionment bases:</strong> Floor space → cleaning, insurance, rent. Volume → light & heat. Machine hours → maintenance. Machinery valuation → depreciation. Employees → canteen, supervisors, admin.</p>`,
        mistakes: ["Machine maintenance uses MACHINE HOURS, not labour hours — common mix-up", "Light & heat uses VOLUME (cubic metres), not floor space (square metres)", "Depreciation uses MACHINERY VALUATION, not machine hours", "Service departments (Finance, HR) get NO share of machine-related costs"]
      },
      {
        title: "(b) Reapportionment of Service Departments",
        marks: 12,
        explain: "<strong>Service departments don't produce anything — their costs must be transferred to production departments.</strong> The question says to use labour hours as the basis. Apportion Finance and HR costs to Assembly and Finishing based on their share of labour hours (60,000 : 15,000 = 4:1).",
        content: `<div class="text-sm space-y-2 leading-relaxed">
<p><strong>Labour hours ratio:</strong> Assembly 60,000 : Finishing 15,000 = <strong>4 : 1</strong></p>
<p class="mt-3"><strong>Reapportion Finance (€16,145):</strong></p>
<p class="ml-5">Assembly: 16,145 × 4/5 = <strong>12,916</strong></p>
<p class="ml-5">Finishing: 16,145 × 1/5 = <strong>3,229</strong></p>
<p class="mt-3"><strong>Reapportion HR (€13,555):</strong></p>
<p class="ml-5">Assembly: 13,555 × 4/5 = <strong>10,844</strong></p>
<p class="ml-5">Finishing: 13,555 × 1/5 = <strong>2,711</strong></p>
</div>
<table class="w-full text-xs border-collapse max-w-sm mt-3">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border"></th><th class="p-1.5 border border-border text-right">Assembly €</th><th class="p-1.5 border border-border text-right">Finishing €</th></tr>
<tr><td class="p-1.5 border border-border">Before reapportionment</td><td class="p-1.5 border border-border text-right font-mono">126,105</td><td class="p-1.5 border border-border text-right font-mono">58,770</td></tr>
<tr><td class="p-1.5 border border-border">+ Finance</td><td class="p-1.5 border border-border text-right font-mono">12,916</td><td class="p-1.5 border border-border text-right font-mono">3,229</td></tr>
<tr><td class="p-1.5 border border-border">+ HR</td><td class="p-1.5 border border-border text-right font-mono">10,844</td><td class="p-1.5 border border-border text-right font-mono">2,711</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Total OH</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>149,865</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>64,710</strong></td></tr>
</table>
<p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Check:</strong> 149,865 + 64,710 = 214,575 = original total. Finance and HR columns should now be zero.</p>`,
        mistakes: ["Use LABOUR HOURS for reapportionment (as stated in the question), not employees or floor space", "The ratio is 60,000 : 15,000 = 4:1 (so 4/5 and 1/5), NOT 60,000 : 75,000", "After reapportionment, Finance and HR columns must equal ZERO — all their costs have been transferred"]
      },
      {
        title: "(c) Overhead Absorption Rates",
        marks: 10,
        explain: "<strong>Now calculate how much overhead each department charges per hour of work.</strong> Assembly uses labour hours (labour-intensive), Finishing uses machine hours (machine-intensive). The rate = Total departmental OH ÷ Hours.",
        content: `<div class="text-sm space-y-2 leading-relaxed">
<p><strong>1) Assembly Dept — Labour Hour Rate:</strong></p>
<p class="ml-5">Total OH = <strong>€149,865</strong></p>
<p class="ml-5">Labour hours = 60,000</p>
<p class="ml-5">Rate = 149,865 ÷ 60,000 = <strong>€2.50 per labour hour</strong></p>
<p class="mt-4"><strong>2) Finishing Dept — Machine Hour Rate:</strong></p>
<p class="ml-5">Total OH = <strong>€64,710</strong></p>
<p class="ml-5">Machine hours = 20,000</p>
<p class="ml-5">Rate = 64,710 ÷ 20,000 = <strong>€3.24 per machine hour</strong></p>
</div>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Why different bases?</strong> Assembly is labour-intensive (more labour hours than machine hours), so overhead is absorbed based on labour hours. Finishing is more machine-dependent, so machine hours are used. The marking scheme accepts the student's own figure from part (a).</p>`,
        mistakes: ["Assembly = LABOUR hours (60,000), Finishing = MACHINE hours (20,000) — don't mix them up", "The marking scheme says 'own figure from part (a) acceptable' — so use YOUR total even if it differs", "State the unit clearly: 'per labour hour' or 'per machine hour' — 1 mark penalty for missing units"]
      },
      {
        title: "(d) Job Cost Sheet — Job AB6710",
        marks: "Remaining",
        explain: "<strong>Now price the job.</strong> Add up: Direct Materials + Direct Labour + Overheads (using the rates you just calculated) = Total Cost. Then add profit margin of 30% to get the selling price.",
        content: `<table class="w-full text-xs border-collapse max-w-md">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Job Cost Sheet — Job AB6710</th><th class="p-1.5 border border-border text-right">Assy €</th><th class="p-1.5 border border-border text-right">Fin €</th><th class="p-1.5 border border-border text-right">Total €</th></tr>
<tr><td class="p-1.5 border border-border">Direct Materials</td><td class="p-1.5 border border-border text-right font-mono">4,500</td><td class="p-1.5 border border-border text-right font-mono">3,200</td><td class="p-1.5 border border-border text-right font-mono">7,700</td></tr>
<tr><td class="p-1.5 border border-border">Direct Labour</td><td class="p-1.5 border border-border text-right font-mono">3,600</td><td class="p-1.5 border border-border text-right font-mono">4,350</td><td class="p-1.5 border border-border text-right font-mono">7,950</td></tr>
<tr><td class="p-1.5 border border-border">OH: Assy (320 hrs × €2.50)</td><td class="p-1.5 border border-border text-right font-mono">800</td><td class="p-1.5 border border-border text-right font-mono"></td><td class="p-1.5 border border-border text-right font-mono">800</td></tr>
<tr><td class="p-1.5 border border-border">OH: Fin (350 hrs × €3.24)</td><td class="p-1.5 border border-border text-right font-mono"></td><td class="p-1.5 border border-border text-right font-mono">1,134</td><td class="p-1.5 border border-border text-right font-mono">1,134</td></tr>
<tr class="font-bold"><td class="p-1.5 border border-border"><strong>Total Cost</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>17,584</strong></td></tr>
<tr><td class="p-1.5 border border-border">Profit (30% margin)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">7,536</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Selling Price</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>25,120</strong></td></tr>
</table>
<p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Profit margin of 30%:</strong> This means profit = 30% of SELLING PRICE (not of cost). So: Cost = 70% of SP. SP = Cost ÷ 0.70 = 17,584 ÷ 0.70 = <strong>€25,120</strong>. Profit = 25,120 − 17,584 = €7,536. <strong>Common error:</strong> 30% × 17,584 = 5,275. This gives a MARK-UP of 30%, not a margin.</p>`,
        mistakes: ["Assembly OH uses LABOUR HOURS (320), Finishing uses MACHINE HOURS (350) — match the absorption basis", "Profit MARGIN of 30% means Cost = 70% of SP. So SP = Cost ÷ 0.70. This is NOT the same as adding 30% to cost (that's mark-up)", "If the question said 'mark-up of 30%' you would calculate 17,584 × 1.30 = €22,859. Read carefully!"]
      }
    ]
  },
  // ─── ARCHETYPE 3: MARGINAL vs ABSORPTION COMPARISON ──────────────
  {
    id: "absorption-compare",
    type: "Marginal vs Absorption",
    name: "Blackwater Ltd — Full Comparison",
    year: 2024,
    source: "Leaving Cert — Topic Comparison",
    totalMarks: 60,
    category: "absorption",
    desc: "Same data, two methods. Build income statements under BOTH marginal and absorption costing, reconcile the profit difference, and learn when to use each method.",
    partSummary: ["Cost per unit (both methods)", "Marginal Income Statement", "Absorption Income Statement", "Profit Reconciliation", "Key Differences Table", "When to Use Each"],
    question: `<h3>Marginal vs Absorption Costing — Blackwater Ltd</h3>
<div class="text-sm text-muted-foreground leading-relaxed">
<p><strong>Blackwater Ltd</strong> manufactures a single product. The following information relates to the year ended 31/12/2024:</p>
<table class="w-full text-xs border-collapse my-2">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Production & Sales</th><th class="p-1.5 border border-border text-right">Units</th></tr>
<tr><td class="p-1.5 border border-border">Units produced</td><td class="p-1.5 border border-border text-right">50,000</td></tr>
<tr><td class="p-1.5 border border-border">Units sold</td><td class="p-1.5 border border-border text-right">45,000</td></tr>
<tr><td class="p-1.5 border border-border">Opening stock</td><td class="p-1.5 border border-border text-right">0</td></tr>
<tr><td class="p-1.5 border border-border">Closing stock</td><td class="p-1.5 border border-border text-right">5,000</td></tr>
</table>
<table class="w-full text-xs border-collapse my-2">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Cost Information</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Selling price per unit</td><td class="p-1.5 border border-border text-right">40</td></tr>
<tr><td class="p-1.5 border border-border">Direct materials per unit</td><td class="p-1.5 border border-border text-right">12</td></tr>
<tr><td class="p-1.5 border border-border">Direct labour per unit</td><td class="p-1.5 border border-border text-right">8</td></tr>
<tr><td class="p-1.5 border border-border">Variable factory overhead per unit</td><td class="p-1.5 border border-border text-right">4</td></tr>
<tr><td class="p-1.5 border border-border">Variable selling & admin per unit sold</td><td class="p-1.5 border border-border text-right">2</td></tr>
<tr><td class="p-1.5 border border-border">Fixed factory overhead (annual)</td><td class="p-1.5 border border-border text-right">150,000</td></tr>
<tr><td class="p-1.5 border border-border">Fixed selling & admin (annual)</td><td class="p-1.5 border border-border text-right">80,000</td></tr>
</table>
<p>The company absorbs fixed factory overhead based on <strong>normal capacity of 50,000 units</strong>.</p>
<p><strong>Required:</strong> (a) Production cost per unit under both methods. (b) Marginal costing income statement. (c) Absorption costing income statement. (d) Reconcile the profit difference. (e) Key differences.</p>
</div>`,
    steps: [
      {
        title: "Production Cost per Unit — Both Methods",
        marks: 10,
        explain: "<strong>Start by calculating the production cost per unit under each method.</strong> The key difference: marginal costing includes only VARIABLE production costs, while absorption costing adds a share of FIXED factory overhead. Fixed OH rate = €150,000 ÷ 50,000 = €3.00/unit.",
        content: `<table class="w-full text-xs border-collapse max-w-md">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Cost Element</th><th class="p-1.5 border border-border text-right">Marginal (€)</th><th class="p-1.5 border border-border text-right">Absorption (€)</th></tr>
<tr><td class="p-1.5 border border-border">Direct materials</td><td class="p-1.5 border border-border text-right font-mono">12.00</td><td class="p-1.5 border border-border text-right font-mono">12.00</td></tr>
<tr><td class="p-1.5 border border-border">Direct labour</td><td class="p-1.5 border border-border text-right font-mono">8.00</td><td class="p-1.5 border border-border text-right font-mono">8.00</td></tr>
<tr><td class="p-1.5 border border-border">Variable factory O/H</td><td class="p-1.5 border border-border text-right font-mono">4.00</td><td class="p-1.5 border border-border text-right font-mono">4.00</td></tr>
<tr><td class="p-1.5 border border-border">Fixed factory O/H absorbed</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">3.00</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Production cost per unit</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>24.00</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>27.00</strong></td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Fixed OH rate:</strong> €150,000 ÷ 50,000 = <strong>€3.00/unit</strong>. Variable S&A (€2) is a selling cost, NOT a production cost — excluded from both methods.</p>`,
        mistakes: ["Including variable selling & admin (€2) in production cost — it's a period cost under BOTH methods", "Forgetting that variable factory O/H is in BOTH methods — only FIXED factory O/H is the difference", "Adding fixed S&A to absorption cost per unit — fixed S&A is never absorbed into product cost"]
      },
      {
        title: "Marginal Costing Income Statement",
        marks: 15,
        explain: "<strong>Under marginal costing, stock is valued at VARIABLE production cost only (€24/unit).</strong> Fixed factory overhead is treated as a period cost — the ENTIRE €150,000 is expensed in the year.",
        content: `<table class="w-full text-xs border-collapse max-w-md">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Marginal Costing Income Statement</th><th class="p-1.5 border border-border text-right">€</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Sales (45,000 × €40)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">1,800,000</td></tr>
<tr><td class="p-1.5 border border-border pl-5">Opening stock (0 × €24)</td><td class="p-1.5 border border-border text-right font-mono">0</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">+ Variable production (50,000 × €24)</td><td class="p-1.5 border border-border text-right font-mono">1,200,000</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">− Closing stock (5,000 × €24)</td><td class="p-1.5 border border-border text-right font-mono">(120,000)</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Variable cost of sales</td><td class="p-1.5 border border-border text-right font-mono">1,080,000</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">+ Variable S&A (45,000 × €2)</td><td class="p-1.5 border border-border text-right font-mono">90,000</td><td class="p-1.5 border border-border text-right font-mono">(1,170,000)</td></tr>
<tr class="font-bold"><td class="p-1.5 border border-border"><strong>Contribution</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>630,000</strong></td></tr>
<tr><td class="p-1.5 border border-border pl-5">Fixed factory overhead</td><td class="p-1.5 border border-border text-right font-mono">150,000</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">Fixed selling & admin</td><td class="p-1.5 border border-border text-right font-mono">80,000</td><td class="p-1.5 border border-border text-right font-mono">(230,000)</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Net Profit (Marginal)</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>400,000</strong></td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Key point:</strong> Closing stock valued at €24 × 5,000 = <strong>€120,000</strong> (variable cost only). The entire €150,000 of fixed factory OH hits this year's profit.</p>`,
        mistakes: ["Valuing closing stock at €27 (absorption cost) — under marginal, stock is ALWAYS at variable cost only (€24)", "Deducting only part of fixed factory OH — under marginal, the ENTIRE fixed factory OH (€150,000) is expensed", "Calculating variable S&A on units produced (50,000) — it's a selling cost, so use units SOLD (45,000)"]
      },
      {
        title: "Absorption Costing Income Statement",
        marks: 15,
        explain: "<strong>Under absorption costing, stock is valued at FULL production cost (€27/unit), which includes €3 of fixed overhead per unit.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Absorption Costing Income Statement</th><th class="p-1.5 border border-border text-right">€</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Sales (45,000 × €40)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">1,800,000</td></tr>
<tr><td class="p-1.5 border border-border pl-5">Opening stock (0 × €27)</td><td class="p-1.5 border border-border text-right font-mono">0</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">+ Production (50,000 × €27)</td><td class="p-1.5 border border-border text-right font-mono">1,350,000</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">− Closing stock (5,000 × €27)</td><td class="p-1.5 border border-border text-right font-mono">(135,000)</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border">Cost of sales</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">(1,215,000)</td></tr>
<tr class="font-bold"><td class="p-1.5 border border-border"><strong>Gross Profit</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>585,000</strong></td></tr>
<tr><td class="p-1.5 border border-border pl-5">Variable S&A (45,000 × €2)</td><td class="p-1.5 border border-border text-right font-mono">90,000</td><td class="p-1.5 border border-border"></td></tr>
<tr><td class="p-1.5 border border-border pl-5">Fixed selling & admin</td><td class="p-1.5 border border-border text-right font-mono">80,000</td><td class="p-1.5 border border-border text-right font-mono">(170,000)</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Net Profit (Absorption)</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>415,000</strong></td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Key point:</strong> Closing stock valued at €27 × 5,000 = <strong>€135,000</strong> (including €3 × 5,000 = €15,000 of fixed overhead). No under/over-absorption because actual production = normal capacity.</p>`,
        mistakes: ["Valuing closing stock at €24 (marginal cost) — under absorption, stock is at FULL production cost (€27)", "Including fixed factory OH as a separate expense line — under absorption it's ALREADY in cost of sales via the €3/unit rate", "Forgetting to check for over/under absorption when actual production ≠ normal capacity"]
      },
      {
        title: "Profit Reconciliation",
        marks: 10,
        explain: "<strong>The two methods gave different profits — but by exactly €15,000.</strong> The difference = fixed OH trapped in the CHANGE in stock. Formula: Absorption Profit = Marginal Profit + (Change in Stock × Fixed OH rate per unit).",
        content: `<table class="w-full text-xs border-collapse max-w-sm">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border">Profit Reconciliation</th><th class="p-1.5 border border-border text-right">€</th></tr>
<tr><td class="p-1.5 border border-border">Net Profit (Marginal Costing)</td><td class="p-1.5 border border-border text-right font-mono">400,000</td></tr>
<tr><td class="p-1.5 border border-border">+ Fixed OH in closing stock (5,000 × €3)</td><td class="p-1.5 border border-border text-right font-mono">15,000</td></tr>
<tr><td class="p-1.5 border border-border">− Fixed OH in opening stock (0 × €3)</td><td class="p-1.5 border border-border text-right font-mono">0</td></tr>
<tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Net Profit (Absorption Costing)</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>415,000</strong></td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Three scenarios:</strong><br/>• <strong>Production > Sales</strong> (stock UP): Absorption profit > Marginal profit (this case)<br/>• <strong>Production < Sales</strong> (stock DOWN): Absorption profit < Marginal profit<br/>• <strong>Production = Sales</strong> (no stock change): Both profits IDENTICAL</p>`,
        mistakes: ["Using variable cost per unit (€24) instead of the fixed OH rate (€3) in the reconciliation", "Reversing the direction — when stock INCREASES, absorption > marginal", "Thinking the profit difference is permanent — it's a TIMING difference"]
      },
      {
        title: "Key Differences — Comparison Table",
        marks: 10,
        explain: "<strong>This is the comparison you need to memorise for the theory section.</strong> The SEC frequently asks students to explain the differences between marginal and absorption costing.",
        content: `<table class="w-full text-[11px] border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border" style="width:28%">Aspect</th><th class="text-left p-1.5 border border-border">Marginal Costing</th><th class="text-left p-1.5 border border-border">Absorption Costing</th></tr>
<tr><td class="p-1.5 border border-border font-semibold">Stock valuation</td><td class="p-1.5 border border-border">Variable production cost only (€24/unit)</td><td class="p-1.5 border border-border">Full production cost incl. fixed OH (€27/unit)</td></tr>
<tr><td class="p-1.5 border border-border font-semibold">Fixed factory OH</td><td class="p-1.5 border border-border">Period cost — all expensed in the year</td><td class="p-1.5 border border-border">Product cost — absorbed into each unit</td></tr>
<tr><td class="p-1.5 border border-border font-semibold">Statement format</td><td class="p-1.5 border border-border">Contribution approach</td><td class="p-1.5 border border-border">Gross profit approach</td></tr>
<tr><td class="p-1.5 border border-border font-semibold">Profit when stock rises</td><td class="p-1.5 border border-border">Lower</td><td class="p-1.5 border border-border">Higher</td></tr>
<tr><td class="p-1.5 border border-border font-semibold">Main use</td><td class="p-1.5 border border-border">Internal decisions: BEP, MoS, special orders</td><td class="p-1.5 border border-border">External reporting: required by IAS 2</td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Remember:</strong> Marginal treats fixed factory OH as a cost of TIME (expense in the period). Absorption treats it as a cost of UNITS (attach to each unit produced).</p>`,
        mistakes: ["Saying 'absorption costing is always better' — neither is better; they serve different purposes", "Forgetting that IAS 2 requires absorption costing for published accounts", "Saying both methods always give the same profit — they only agree when production = sales"]
      },
      {
        title: "When to Use Each Method",
        marks: "Theory",
        explain: "<strong>The examiner often asks 'when would you use marginal costing vs absorption costing?'</strong>",
        content: `<table class="w-full text-[11px] border-collapse">
<tr class="bg-muted"><th class="text-left p-1.5 border border-border" style="width:50%">Use MARGINAL When...</th><th class="text-left p-1.5 border border-border">Use ABSORPTION When...</th></tr>
<tr><td class="p-1.5 border border-border">Calculating BEP or margin of safety</td><td class="p-1.5 border border-border">Preparing published financial statements (IAS 2)</td></tr>
<tr><td class="p-1.5 border border-border">Deciding on a special order below normal price</td><td class="p-1.5 border border-border">Valuing stock in the balance sheet</td></tr>
<tr><td class="p-1.5 border border-border">Make-or-buy decisions</td><td class="p-1.5 border border-border">Long-term pricing where all costs must be recovered</td></tr>
<tr><td class="p-1.5 border border-border">Product mix decisions</td><td class="p-1.5 border border-border">Job costing and cost-plus contracts</td></tr>
<tr><td class="p-1.5 border border-border">Short-term decisions where FC won't change</td><td class="p-1.5 border border-border">Reporting to external stakeholders</td></tr>
</table>
<p class="mt-3 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Classic exam answer:</strong> "Marginal costing is used for SHORT-TERM, INTERNAL decision-making. Absorption costing is used for LONG-TERM reporting and published financial statements because IAS 2 requires stock to be valued at full production cost."</p>`,
        mistakes: ["Saying one method is 'right' and the other is 'wrong' — both are valid, for different purposes", "Forgetting that IAS 2 REQUIRES absorption costing for published accounts", "Thinking absorption costing is outdated — it's still required by law for external accounts"]
      }
    ]
  },
  {
    id: "stock-2021",
    type: "Stock Valuation",
    name: "Xander Ltd — FIFO Stock Valuation",
    year: 2021,
    source: "SEC 2021 Q8 (a)",
    totalMarks: 27,
    category: "stock",
    desc: "Calculate closing stock units, value with FIFO, prepare a trading account, and explain effect of overvaluation.",
    partSummary: ["Closing Stock Units", "FIFO Value", "Trading Account", "Theory"],
    question: `<h3>2021 Q8(a): Stock Valuation — Xander Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p><strong>Xander Ltd</strong> is a retail store buying and selling one product. Information for year 2020 (excluding VAT):</p><table class="w-full text-xs border-collapse my-2"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Period</th><th class="p-1.5 border border-border text-right">Purchases on Credit</th><th class="p-1.5 border border-border text-right">Credit Sales</th><th class="p-1.5 border border-border text-right">Cash Sales</th></tr><tr><td class="p-1.5 border border-border">01/01–30/04</td><td class="p-1.5 border border-border text-right">4,600 @ €7</td><td class="p-1.5 border border-border text-right">1,300 @ €12</td><td class="p-1.5 border border-border text-right">2,700 @ €13</td></tr><tr><td class="p-1.5 border border-border">01/05–31/08</td><td class="p-1.5 border border-border text-right">7,400 @ €8</td><td class="p-1.5 border border-border text-right">2,100 @ €13</td><td class="p-1.5 border border-border text-right">2,450 @ €14</td></tr><tr><td class="p-1.5 border border-border">01/09–31/12</td><td class="p-1.5 border border-border text-right">2,400 @ €9</td><td class="p-1.5 border border-border text-right">1,950 @ €14</td><td class="p-1.5 border border-border text-right">2,150 @ €15</td></tr></table><p>Opening stock 01/01/2020: <strong>1,400 units @ €6 each</strong>.</p><p><strong>Required:</strong> (i) Value of closing stock using FIFO. (ii) Trading account. (iii) Effect on GP if closing stock overvalued.</p></div>`,
    steps: [
      {
        title: "Closing Stock in Units",
        marks: 6,
        explain: "<strong>Closing Stock = Opening + Purchases − Sales</strong> (in units).",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border"></th><th class="p-1.5 border border-border text-right">Units</th></tr><tr><td class="p-1.5 border border-border">Opening Stock</td><td class="p-1.5 border border-border text-right font-mono">1,400</td></tr><tr><td class="p-1.5 border border-border">+ Purchases (4,600 + 7,400 + 2,400)</td><td class="p-1.5 border border-border text-right font-mono">14,400</td></tr><tr><td class="p-1.5 border border-border">− Total Sales (5,350 + 7,300)</td><td class="p-1.5 border border-border text-right font-mono">(12,650)</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Closing Stock</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>3,150 units</strong></td></tr></table>`,
        mistakes: ["Add credit AND cash sales together", "Work in UNITS first — ignore prices", "Total purchases = 14,400"]
      },
      {
        title: "(i) FIFO Closing Stock Value",
        marks: 8,
        explain: "<strong>FIFO = First In, First Out.</strong> 3,150 units = most recent purchases. Work backwards from last quarter.",
        content: `<table class="w-full text-xs border-collapse max-w-sm"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">FIFO Layers</th><th class="p-1.5 border border-border text-right">Units</th><th class="p-1.5 border border-border text-right">Price</th><th class="p-1.5 border border-border text-right">Value</th></tr><tr><td class="p-1.5 border border-border">Last quarter (€9)</td><td class="p-1.5 border border-border text-right font-mono">2,400</td><td class="p-1.5 border border-border text-right">€9</td><td class="p-1.5 border border-border text-right font-mono">21,600</td></tr><tr><td class="p-1.5 border border-border">Balance from Q2 (€8)</td><td class="p-1.5 border border-border text-right font-mono">750</td><td class="p-1.5 border border-border text-right">€8</td><td class="p-1.5 border border-border text-right font-mono">6,000</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Total</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>3,150</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>27,600</strong></td></tr></table>`,
        mistakes: ["Start from LAST purchase batch and work backwards", "Only 750 needed from the €8 batch", "Total must = 3,150 units"]
      },
      {
        title: "(ii) Trading Account",
        marks: 11,
        explain: "<strong>Sales − Cost of Sales = Gross Profit.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border" colspan="3">Trading Account — y/e 31/12/2020</th></tr><tr><td class="p-1.5 border border-border">Sales</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">171,850</td></tr><tr><td class="p-1.5 border border-border">Opening Stock (1,400 × €6)</td><td class="p-1.5 border border-border text-right font-mono">8,400</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">+ Purchases</td><td class="p-1.5 border border-border text-right font-mono">113,000</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">− Closing Stock</td><td class="p-1.5 border border-border text-right font-mono">(27,600)</td><td class="p-1.5 border border-border text-right font-mono">(93,800)</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Gross Profit</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>78,050</strong></td></tr></table>`,
        mistakes: ["Sales calculated by quarter and price", "Opening stock at €6 (NOT current price)", "Use YOUR closing stock from part (i)"]
      },
      {
        title: "(iii) Theory: Overvaluation",
        marks: 2,
        explain: "<strong>Effect on gross profit if closing stock is overvalued.</strong>",
        content: `<div class="text-sm leading-relaxed"><p>If closing stock is overvalued → <strong>reduced</strong> COS → <strong>higher gross profit</strong>.</p><p class="mt-2 text-xs text-muted-foreground"><em>Chain:</em> Overstated stock → Understated COS → Overstated GP → Overstated NP → Overstated tax.</p></div>`,
        mistakes: ["Mention BOTH COS effect AND GP effect", "Higher stock = lower COS = higher GP"]
      }
    ]
  },
  {
    id: "product-2021",
    type: "Product Costing",
    name: "Bello Ltd — Product Costing",
    year: 2021,
    source: "SEC 2021 Q8 (b)",
    totalMarks: 34,
    category: "job",
    desc: "Three production departments with separate OH absorption rates plus a general admin OH rate. Price Job 1920X with a 33⅓% profit margin.",
    partSummary: ["OH Rates", "Job Cost", "Selling Price"],
    question: `<h3>2021 Q8(b): Product Costing — Bello Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p><strong>Bello Ltd</strong> manufactures medical equipment with three production departments:</p><table class="w-full text-xs border-collapse my-2"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Department</th><th class="p-1.5 border border-border text-right">Budgeted OH</th><th class="p-1.5 border border-border text-right">Labour Hours</th><th class="p-1.5 border border-border text-right">Rate/Hour</th></tr><tr><td class="p-1.5 border border-border">Manufacturing</td><td class="p-1.5 border border-border text-right">€250,000</td><td class="p-1.5 border border-border text-right">40,000</td><td class="p-1.5 border border-border text-right">€8.50</td></tr><tr><td class="p-1.5 border border-border">Assembly</td><td class="p-1.5 border border-border text-right">€160,000</td><td class="p-1.5 border border-border text-right">12,500</td><td class="p-1.5 border border-border text-right">€3.50</td></tr><tr><td class="p-1.5 border border-border">Finishing</td><td class="p-1.5 border border-border text-right">€40,000</td><td class="p-1.5 border border-border text-right">3,200</td><td class="p-1.5 border border-border text-right">€6.25</td></tr></table><p>General administration: <strong>€1,002,600</strong>. Job 1920X: 35 kg @ €11.50/kg. Labour: Mfg 25 hrs, Assy 8 hrs, Fin 5 hrs. Profit margin: 33⅓%.</p></div>`,
    steps: [
      {
        title: "(i) OH Absorption Rates",
        marks: 6,
        explain: "<strong>Each department: Total OH ÷ Labour Hours.</strong>",
        content: `<div class="text-sm space-y-2 leading-relaxed"><p><strong>Manufacturing:</strong> €250,000 ÷ 40,000 = <strong>€6.25/labour hr</strong></p><p><strong>Assembly:</strong> €160,000 ÷ 12,500 = <strong>€12.80/labour hr</strong></p><p><strong>Finishing:</strong> €40,000 ÷ 3,200 = <strong>€12.50/labour hr</strong></p><p class="mt-2"><strong>General Admin:</strong> €1,002,600 ÷ 55,700 = <strong>€18.00/labour hr</strong></p></div>`,
        mistakes: ["All depts use LABOUR hours", "Admin uses TOTAL labour hours (55,700)", "Show formula and substitution"]
      },
      {
        title: "(ii) Job Cost + Selling Price",
        marks: 14,
        explain: "<strong>DM + DL + Production OH + Admin OH = Total Cost. SP = Cost ÷ (2/3).</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Job 1920X</th><th class="p-1.5 border border-border text-right">€</th><th class="p-1.5 border border-border text-right">€</th></tr><tr><td class="p-1.5 border border-border">Direct Materials (35 × €11.50)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">402.50</td></tr><tr><td class="p-1.5 border border-border">Direct Labour</td><td class="p-1.5 border border-border text-right font-mono">271.75</td><td class="p-1.5 border border-border text-right font-mono">271.75</td></tr><tr class="font-bold"><td class="p-1.5 border border-border">Prime Cost</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">674.25</td></tr><tr><td class="p-1.5 border border-border">Production OH</td><td class="p-1.5 border border-border text-right font-mono">321.15</td><td class="p-1.5 border border-border text-right font-mono">321.15</td></tr><tr><td class="p-1.5 border border-border">General Admin (38 × €18)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">684.00</td></tr><tr class="font-bold"><td class="p-1.5 border border-border">Total Cost (66⅔%)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">1,679.40</td></tr><tr><td class="p-1.5 border border-border">Profit (33⅓%)</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">839.70</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Selling Price</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>2,519.10</strong></td></tr></table><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>SP = €1,679.40 × 1.5 = €2,519.10</strong>. 33⅓% MARGIN: Cost = 66⅔% of SP.</p>`,
        mistakes: ["Admin uses TOTAL hours on job (38)", "33⅓% MARGIN ≠ mark-up", "SP = Cost × 1.5 (because 2/3 = cost)"]
      }
    ]
  },
  {
    id: "underover-2021",
    type: "Under/Over Absorption",
    name: "Duff Ltd — Under/Over Absorption",
    year: 2021,
    source: "SEC 2021 Q8 (c)",
    totalMarks: 19,
    category: "overhead",
    desc: "Calculate budgeted absorption rates, compare actual vs absorbed, identify under or over absorption per department.",
    partSummary: ["Budgeted Rates", "Actual vs Absorbed", "Theory"],
    question: `<h3>2021 Q8(c): Under/Over Absorption — Duff Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p>Duff Manufacturing Ltd budgeted vs actual costs for 3 departments.</p><p><strong>Required:</strong> (i) Departmental OH absorption rates. (ii) Under/over absorption. (iii) Implications.</p></div>`,
    steps: [
      {
        title: "(i) Budgeted Absorption Rates",
        marks: 6,
        explain: "<strong>Dept A: machine-intensive → machine hours. Dept B & C: labour hours.</strong>",
        content: `<div class="text-sm space-y-2 leading-relaxed"><p><strong>Dept A:</strong> €196,000 ÷ 28,000 MH = <strong>€7.00/machine hr</strong></p><p><strong>Dept B:</strong> €40,500 ÷ 45,000 LH = <strong>€0.90/labour hr</strong></p><p><strong>Dept C:</strong> €66,250 ÷ 25,000 LH = <strong>€2.65/labour hr</strong></p></div>`,
        mistakes: ["Use BUDGETED figures for the rate", "Dept A = MACHINE hours (28k MH vs 6k LH)", "State units clearly"]
      },
      {
        title: "(ii) Under/Over Absorption",
        marks: 11,
        explain: "<strong>Absorbed = Actual hours × Budgeted rate. Compare with Actual OH.</strong>",
        content: `<table class="w-full text-xs border-collapse"><tr class="bg-muted"><th class="text-left p-1.5 border border-border"></th><th class="p-1.5 border border-border text-right">Dept A</th><th class="p-1.5 border border-border text-right">Dept B</th><th class="p-1.5 border border-border text-right">Dept C</th><th class="p-1.5 border border-border text-right">Total</th></tr><tr><td class="p-1.5 border border-border">Actual OH</td><td class="p-1.5 border border-border text-right font-mono">195,000</td><td class="p-1.5 border border-border text-right font-mono">38,400</td><td class="p-1.5 border border-border text-right font-mono">68,000</td><td class="p-1.5 border border-border text-right font-mono">301,400</td></tr><tr><td class="p-1.5 border border-border">Absorbed</td><td class="p-1.5 border border-border text-right font-mono">203,000</td><td class="p-1.5 border border-border text-right font-mono">37,800</td><td class="p-1.5 border border-border text-right font-mono">68,900</td><td class="p-1.5 border border-border text-right font-mono">309,700</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>(Under)/Over</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>8,000</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>(600)</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>900</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>8,300</strong></td></tr></table>`,
        mistakes: ["ACTUAL hours × BUDGETED rate", "Over: absorbed > actual", "Dept B is the only UNDER-absorbed dept"]
      },
      {
        title: "(iii) Implications",
        marks: 2,
        explain: "<strong>Over-absorption increases profit but makes quotes uncompetitive.</strong>",
        content: `<div class="text-sm leading-relaxed space-y-2"><p><strong>1.</strong> Over-absorption increases reported profit — actual costs lower than expected.</p><p><strong>2.</strong> Quotes may be uncompetitive — prices set too high based on inflated budgeted costs.</p></div>`,
        mistakes: ["Mention BOTH profit effect and pricing effect"]
      }
    ]
  },
  {
    id: "flex-2024",
    type: "Flexible Budget",
    name: "Royston Ltd — Flexible Budgeting",
    year: 2024,
    source: "SEC 2024 Q8 (a)",
    totalMarks: 48,
    category: "marginal",
    desc: "High/Low to separate production OH and other OH. Build flexible budget at 85% using marginal costing. BEP + MoS.",
    partSummary: ["High/Low Prod OH", "High/Low Other OH", "Flex Budget 85%", "BEP+MoS", "Theory"],
    question: `<h3>2024 Q8(a): Flexible Budgeting — Royston Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p><strong>Royston Ltd</strong> manufactures a component. Flexible budgets at 50%, 75%, 95% capacity (20k, 30k, 38k units). Profit = 20% of sales.</p><p><strong>Required:</strong> (i) Separate production OH. (ii) Separate other OH. (iii) Flexible budget at 85%. (iv) BEP and MoS. (v) Controllable cost.</p></div>`,
    steps: [
      {
        title: "(i) High/Low — Production OH",
        marks: 11,
        explain: "<strong>VCpu = (High − Low cost) ÷ Unit difference. Then prove FC.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-sm"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Production OH</th><th class="p-1.5 border border-border text-right">Units</th><th class="p-1.5 border border-border text-right">Cost</th></tr><tr><td class="p-1.5 border border-border">High</td><td class="p-1.5 border border-border text-right font-mono">38,000</td><td class="p-1.5 border border-border text-right font-mono">191,000</td></tr><tr><td class="p-1.5 border border-border">Low</td><td class="p-1.5 border border-border text-right font-mono">20,000</td><td class="p-1.5 border border-border text-right font-mono">110,000</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border">Difference</td><td class="p-1.5 border border-border text-right font-mono">18,000</td><td class="p-1.5 border border-border text-right font-mono">81,000</td></tr></table><div class="text-sm mt-3 space-y-1"><p><strong>VCpu</strong> = €81,000 ÷ 18,000 = <strong>€4.50</strong></p><p><strong>FC</strong> = 191,000 − (38,000 × 4.50) = <strong>€20,000</strong></p><p>Proof @ 20,000: 110,000 − (20,000 × 4.50) = €20,000 ✓</p></div>`,
        mistakes: ["Use HIGHEST and LOWEST levels only", "Show proof at both levels", "Admin OH is clearly fixed (€80,600 at all 3 levels)"]
      },
      {
        title: "(ii) High/Low — Other OH",
        marks: 14,
        explain: "<strong>Same method for Other OH. Then summarise all VCpu and FC.</strong>",
        content: `<div class="text-sm space-y-2 leading-relaxed"><p><strong>VCpu</strong> = €140,400 ÷ 18,000 = <strong>€7.80</strong></p><p><strong>Fixed</strong> = €171,000 − (20,000 × €7.80) = <strong>€15,000</strong></p><p class="mt-3 font-bold">Summary: Total VCpu = €4.50 + €15.00 + €4.50 + €7.80 = €31.80</p><p class="font-bold">Total FC = €20,000 + €15,000 + €80,600 = €115,600</p></div>`,
        mistakes: ["Materials VCpu = €90,000 ÷ 20,000 = €4.50 — purely variable", "Wages VCpu = €300,000 ÷ 20,000 = €15.00 — purely variable", "Admin OH is FIXED — don't apply High/Low"]
      }
    ]
  }
];

export const COSTING_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "marginal", label: "Marginal" },
  { key: "job", label: "Job Costing" },
  { key: "absorption", label: "Absorption" },
  { key: "stock", label: "Stock Valuation" },
  { key: "overhead", label: "Overhead" },
];

// ═══════════════════════════════════════════════════════════════════════
// Q9 BUDGETING ARCHETYPES — from original budgeting-3.html
// ═══════════════════════════════════════════════════════════════════════
export const BUDGETING_ARCHETYPES: Archetype[] = [
  {
    id: "cash-2023",
    type: "Cash Budget",
    name: "Lupin Ltd — Cash Budget",
    year: 2023,
    source: "SEC 2023 Q9",
    totalMarks: 80,
    category: "cash",
    desc: "6-month cash budget with credit collection patterns, loan interest, equipment purchase, and budgeted P&L.",
    partSummary: ["Collection Pattern", "Receipts Grid", "Payments Grid", "Net Cash", "Budgeted P&L", "Theory"],
    question: `<h3>2023 Q9: Cash Budget — Lupin Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p>New business, €80,000 capital. Sales Jan–Jun: €468k, €544.5k, €567k, €585k, €594k, €661k. Purchases: €436k, €320k, €325k, €330k, €335k, €345k.</p><p>40% cash (5% discount). 60% credit (60% M+1, 40% M+2). Purchases: 50% M+1 (2% discount), 50% M+2. Wages €84,500/m. Variable OH €4/unit. Fixed OH €82,000/m (incl. dep). Equipment €36,000 (5yr, 5% scrap). Loan €24,000 at 8%, capital from Feb in 32 instalments.</p></div>`,
    steps: [
      {
        title: "Collection Pattern Logic",
        marks: "Workings",
        explain: "<strong>Work out how cash flows in before building the grid.</strong> 40% cash (less 5% discount) + 60% credit (60% in M+1, 40% in M+2).",
        content: `<div class="text-sm space-y-2 leading-relaxed"><p><strong>Cash Sales:</strong> Sales × 40% × 95%</p><p>Jan: €468,000 × 0.40 × 0.95 = <strong>€177,840</strong></p><p class="mt-2"><strong>Credit M+1:</strong> Prior Sales × 60% × 60%</p><p>Feb from Jan: €468,000 × 0.60 × 0.60 = <strong>€168,480</strong></p><p class="mt-2"><strong>Credit M+2:</strong> Two months ago × 60% × 40%</p><p>Mar from Jan: €468,000 × 0.60 × 0.40 = <strong>€112,320</strong></p></div><p class="mt-3 text-xs p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950"><strong>Trap:</strong> Cash discount 5% on SALES (given to customers). Purchase discount 2% RECEIVED from suppliers. Don't mix them. No credit receipts in January (new business).</p>`,
        mistakes: ["5% discount on CASH sales only (the 40%)", "No credit receipts in January — new business", "Purchase discount 2% on first 50% only"]
      },
      {
        title: "(a) Cash Budget — Receipts",
        marks: "Part of 58",
        explain: "<strong>Three receipt lines per month.</strong> Cash sales + Credit M+1 + Credit M+2.",
        content: `<div class="overflow-x-auto"><table class="w-full text-[11px] border-collapse"><tr class="bg-muted"><th class="text-left p-1.5 border border-border min-w-[100px]">Receipts</th><th class="p-1.5 border border-border text-right">Jan</th><th class="p-1.5 border border-border text-right">Feb</th><th class="p-1.5 border border-border text-right">Mar</th><th class="p-1.5 border border-border text-right">Apr</th><th class="p-1.5 border border-border text-right">May</th><th class="p-1.5 border border-border text-right">Jun</th></tr><tr><td class="p-1.5 border border-border">Cash Sales</td><td class="p-1.5 border border-border text-right font-mono">177,840</td><td class="p-1.5 border border-border text-right font-mono">206,910</td><td class="p-1.5 border border-border text-right font-mono">215,460</td><td class="p-1.5 border border-border text-right font-mono">222,300</td><td class="p-1.5 border border-border text-right font-mono">225,720</td><td class="p-1.5 border border-border text-right font-mono">251,180</td></tr><tr><td class="p-1.5 border border-border">Credit M+1</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">168,480</td><td class="p-1.5 border border-border text-right font-mono">196,020</td><td class="p-1.5 border border-border text-right font-mono">204,120</td><td class="p-1.5 border border-border text-right font-mono">210,600</td><td class="p-1.5 border border-border text-right font-mono">213,840</td></tr><tr><td class="p-1.5 border border-border">Credit M+2</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">112,320</td><td class="p-1.5 border border-border text-right font-mono">130,680</td><td class="p-1.5 border border-border text-right font-mono">136,080</td><td class="p-1.5 border border-border text-right font-mono">140,400</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Total</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>177,840</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>375,390</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>523,800</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>557,100</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>572,400</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>605,420</strong></td></tr></table></div>`,
        mistakes: ["January: ZERO credit receipts", "February: credit from Jan only", "Each figure = 1 mark"]
      },
      {
        title: "(a) Cash Budget — Payments",
        marks: "Part of 58",
        explain: "<strong>Purchases follow lagged pattern.</strong> Add wages, variable OH, fixed OH (less depreciation), equipment, loan.",
        content: `<div class="overflow-x-auto"><table class="w-full text-[11px] border-collapse"><tr class="bg-muted"><th class="text-left p-1.5 border border-border min-w-[100px]">Payments</th><th class="p-1.5 border border-border text-right">Jan</th><th class="p-1.5 border border-border text-right">Feb</th><th class="p-1.5 border border-border text-right">Mar</th><th class="p-1.5 border border-border text-right">Apr</th><th class="p-1.5 border border-border text-right">May</th><th class="p-1.5 border border-border text-right">Jun</th></tr><tr><td class="p-1.5 border border-border">Purch M+1</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">213,640</td><td class="p-1.5 border border-border text-right font-mono">156,800</td><td class="p-1.5 border border-border text-right font-mono">159,250</td><td class="p-1.5 border border-border text-right font-mono">161,700</td><td class="p-1.5 border border-border text-right font-mono">164,150</td></tr><tr><td class="p-1.5 border border-border">Purch M+2</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">218,000</td><td class="p-1.5 border border-border text-right font-mono">160,000</td><td class="p-1.5 border border-border text-right font-mono">162,500</td><td class="p-1.5 border border-border text-right font-mono">165,000</td></tr><tr><td class="p-1.5 border border-border">Wages</td><td class="p-1.5 border border-border text-right font-mono">84,500</td><td class="p-1.5 border border-border text-right font-mono">84,500</td><td class="p-1.5 border border-border text-right font-mono">84,500</td><td class="p-1.5 border border-border text-right font-mono">84,500</td><td class="p-1.5 border border-border text-right font-mono">84,500</td><td class="p-1.5 border border-border text-right font-mono">84,500</td></tr><tr><td class="p-1.5 border border-border">Var OH</td><td class="p-1.5 border border-border text-right font-mono">37,440</td><td class="p-1.5 border border-border text-right font-mono">43,560</td><td class="p-1.5 border border-border text-right font-mono">45,360</td><td class="p-1.5 border border-border text-right font-mono">46,800</td><td class="p-1.5 border border-border text-right font-mono">47,520</td><td class="p-1.5 border border-border text-right font-mono">52,880</td></tr><tr><td class="p-1.5 border border-border">Fixed OH</td><td class="p-1.5 border border-border text-right font-mono">81,430</td><td class="p-1.5 border border-border text-right font-mono">81,430</td><td class="p-1.5 border border-border text-right font-mono">81,430</td><td class="p-1.5 border border-border text-right font-mono">81,430</td><td class="p-1.5 border border-border text-right font-mono">81,430</td><td class="p-1.5 border border-border text-right font-mono">81,430</td></tr><tr><td class="p-1.5 border border-border">Equipment</td><td class="p-1.5 border border-border text-right font-mono">36,000</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr><tr><td class="p-1.5 border border-border">Capital</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">750</td><td class="p-1.5 border border-border text-right font-mono">750</td><td class="p-1.5 border border-border text-right font-mono">750</td><td class="p-1.5 border border-border text-right font-mono">750</td><td class="p-1.5 border border-border text-right font-mono">750</td></tr><tr><td class="p-1.5 border border-border">Interest</td><td class="p-1.5 border border-border text-right font-mono">160</td><td class="p-1.5 border border-border text-right font-mono">155</td><td class="p-1.5 border border-border text-right font-mono">150</td><td class="p-1.5 border border-border text-right font-mono">145</td><td class="p-1.5 border border-border text-right font-mono">140</td><td class="p-1.5 border border-border text-right font-mono">135</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Total</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>239,530</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>424,035</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>586,990</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>532,875</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>538,540</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>548,845</strong></td></tr></table></div><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Var OH:</strong> Units = Sales ÷ €50. Jan: 468k÷50 = 9,360 × €4. <strong>Fixed OH:</strong> €82,000 − dep(€570) = €81,430. <strong>Interest:</strong> €24k × 8% ÷ 12, decreasing.</p>`,
        mistakes: ["Depreciation is NOT cash — deduct from fixed OH", "Purchase M+1: 50% × 98% (with discount)", "Interest on OUTSTANDING balance (decreasing)", "Capital starts FEBRUARY"]
      },
      {
        title: "(a) Net Cash + Closing Balance",
        marks: "Part of 58",
        explain: "<strong>Net = Receipts − Payments. Add Opening Cash + Loan.</strong>",
        content: `<div class="overflow-x-auto"><table class="w-full text-[11px] border-collapse"><tr class="bg-muted"><th class="text-left p-1.5 border border-border min-w-[100px]"></th><th class="p-1.5 border border-border text-right">Jan</th><th class="p-1.5 border border-border text-right">Feb</th><th class="p-1.5 border border-border text-right">Mar</th><th class="p-1.5 border border-border text-right">Apr</th><th class="p-1.5 border border-border text-right">May</th><th class="p-1.5 border border-border text-right">Jun</th></tr><tr><td class="p-1.5 border border-border">Net Cash</td><td class="p-1.5 border border-border text-right font-mono">-61,690</td><td class="p-1.5 border border-border text-right font-mono">-48,645</td><td class="p-1.5 border border-border text-right font-mono">-63,190</td><td class="p-1.5 border border-border text-right font-mono">24,225</td><td class="p-1.5 border border-border text-right font-mono">33,860</td><td class="p-1.5 border border-border text-right font-mono">56,575</td></tr><tr><td class="p-1.5 border border-border">Loan</td><td class="p-1.5 border border-border text-right font-mono">24,000</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td><td class="p-1.5 border border-border text-right font-mono">—</td></tr><tr><td class="p-1.5 border border-border">Opening</td><td class="p-1.5 border border-border text-right font-mono">80,000</td><td class="p-1.5 border border-border text-right font-mono">42,310</td><td class="p-1.5 border border-border text-right font-mono">-6,335</td><td class="p-1.5 border border-border text-right font-mono">-69,525</td><td class="p-1.5 border border-border text-right font-mono">-45,300</td><td class="p-1.5 border border-border text-right font-mono">-11,440</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Closing</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>42,310</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>-6,335</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>-69,525</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>-45,300</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>-11,440</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>45,135</strong></td></tr></table></div><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Story:</strong> Positive Jan (€42k) → negative Feb–May → worst −€69,525 end March → recovers to €45,135 by June. Need overdraft of ≥€70,000.</p>`,
        mistakes: ["Opening Jan = €80,000 (owner investment)", "Loan is separate receipt", "Each closing = next opening"]
      },
      {
        title: "(b) Budgeted P&L",
        marks: 16,
        explain: "<strong>Accruals basis — total figures for 6 months.</strong> Include depreciation and discounts.",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border" colspan="3">Budgeted P&L — 6 months to 30/06/2024</th></tr><tr><td class="p-1.5 border border-border">Sales</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">3,419,500</td></tr><tr><td class="p-1.5 border border-border">Materials</td><td class="p-1.5 border border-border text-right font-mono">2,091,000</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">Wages</td><td class="p-1.5 border border-border text-right font-mono">507,000</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">Variable OH</td><td class="p-1.5 border border-border text-right font-mono">273,560</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">Fixed OH</td><td class="p-1.5 border border-border text-right font-mono">488,580</td><td class="p-1.5 border border-border text-right font-mono">(3,360,140)</td></tr><tr><td class="p-1.5 border border-border">Gross Profit</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">59,360</td></tr><tr><td class="p-1.5 border border-border">Depreciation</td><td class="p-1.5 border border-border text-right font-mono">3,420</td><td class="p-1.5 border border-border"></td></tr><tr><td class="p-1.5 border border-border">Discount Allowed</td><td class="p-1.5 border border-border text-right font-mono">68,390</td><td class="p-1.5 border border-border text-right font-mono">(71,810)</td></tr><tr><td class="p-1.5 border border-border">Discount Received</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">17,460</td></tr><tr><td class="p-1.5 border border-border">Interest</td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono">(885)</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Net Profit</strong></td><td class="p-1.5 border border-border"></td><td class="p-1.5 border border-border text-right font-mono"><strong>4,125</strong></td></tr></table>`,
        mistakes: ["P&L uses TOTAL figures (accruals)", "Depreciation IS in P&L but NOT in cash budget", "Discount Allowed = expense, Received = income"]
      },
      {
        title: "(c) Theory + Advice",
        marks: 6,
        explain: "<strong>Factors for sales forecasts + advice based on cash budget figures.</strong>",
        content: `<div class="text-sm space-y-2 leading-relaxed"><p><strong>Factors:</strong> Market research, economy, price, competition, luxury/necessity, prior year sales.</p><p><strong>Advice:</strong> Deficit Feb–May, worst −€69,525 March. Arrange overdraft ≥€70k, better credit terms, hire vs buy equipment, longer supplier credit, reduce Jan purchases.</p></div>`,
        mistakes: ["Reference SPECIFIC figures from your cash budget", "Give at least 4 recommendations", "Link advice to the pattern"]
      }
    ]
  },
  {
    id: "production-2024",
    type: "Production Budget",
    name: "Hiform Ltd — Two Products",
    year: 2024,
    source: "SEC pattern (2024/2021)",
    totalMarks: 80,
    category: "production",
    desc: "Calculate production units, raw materials usage, purchases, and direct labour cost. Most frequent Q9 format.",
    partSummary: ["Sales Budget", "Production Budget", "Materials Usage", "Materials Purchases", "Labour Budget", "Theory"],
    question: `<h3>Q9: Production Budget — Hiform Ltd</h3><div class="text-sm text-muted-foreground leading-relaxed"><p><strong>Hiform Ltd</strong> manufactures Quantum and Magnum.</p><table class="w-full text-xs border-collapse my-2"><tr class="bg-muted"><th class="text-left p-1.5 border border-border"></th><th class="p-1.5 border border-border text-right">Quantum</th><th class="p-1.5 border border-border text-right">Magnum</th></tr><tr><td class="p-1.5 border border-border">Sales</td><td class="p-1.5 border border-border text-right">7,000</td><td class="p-1.5 border border-border text-right">5,000</td></tr><tr><td class="p-1.5 border border-border">SP</td><td class="p-1.5 border border-border text-right">€15</td><td class="p-1.5 border border-border text-right">€20</td></tr><tr><td class="p-1.5 border border-border">Opening Stock</td><td class="p-1.5 border border-border text-right">900</td><td class="p-1.5 border border-border text-right">600</td></tr><tr><td class="p-1.5 border border-border">Closing Stock</td><td class="p-1.5 border border-border text-right">1,000</td><td class="p-1.5 border border-border text-right">500</td></tr></table><p>Material A: 6 kg (Q), 9 kg (M). Material B: 14 kg (Q), 11 kg (M). Labour: Q 4 hrs, M 6 hrs @ €11/hr.</p></div>`,
    steps: [
      {
        title: "(a) Sales Budget",
        marks: 8,
        explain: "<strong>Units × Selling Price.</strong> Starting point of all budgeting.",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Sales Budget</th><th class="p-1.5 border border-border text-right">Quantum</th><th class="p-1.5 border border-border text-right">Magnum</th></tr><tr><td class="p-1.5 border border-border">Units</td><td class="p-1.5 border border-border text-right font-mono">7,000</td><td class="p-1.5 border border-border text-right font-mono">5,000</td></tr><tr><td class="p-1.5 border border-border">SP</td><td class="p-1.5 border border-border text-right font-mono">€15</td><td class="p-1.5 border border-border text-right font-mono">€20</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Budgeted Sales</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>€105,000</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>€100,000</strong></td></tr></table>`,
        mistakes: ["Show units, price, and total separately"]
      },
      {
        title: "(b) Production Budget",
        marks: 14,
        explain: "<strong>Production = Sales + Closing Stock − Opening Stock.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Production (units)</th><th class="p-1.5 border border-border text-right">Quantum</th><th class="p-1.5 border border-border text-right">Magnum</th></tr><tr><td class="p-1.5 border border-border">Sales</td><td class="p-1.5 border border-border text-right font-mono">7,000</td><td class="p-1.5 border border-border text-right font-mono">5,000</td></tr><tr><td class="p-1.5 border border-border">+ Closing Stock</td><td class="p-1.5 border border-border text-right font-mono">1,000</td><td class="p-1.5 border border-border text-right font-mono">500</td></tr><tr><td class="p-1.5 border border-border">− Opening Stock</td><td class="p-1.5 border border-border text-right font-mono">(900)</td><td class="p-1.5 border border-border text-right font-mono">(600)</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Budgeted Production</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>7,100</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>4,900</strong></td></tr></table>`,
        mistakes: ["Closing stock ADDED, opening SUBTRACTED", "Magnum: closing < opening, produce LESS than sales"]
      },
      {
        title: "(c) Materials Usage Budget",
        marks: 14,
        explain: "<strong>Production × Material per unit, by material type.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Materials Usage</th><th class="p-1.5 border border-border text-right">Mat A (kg)</th><th class="p-1.5 border border-border text-right">Mat B (kg)</th></tr><tr><td class="p-1.5 border border-border">Quantum (7,100 × 6 / 14)</td><td class="p-1.5 border border-border text-right font-mono">42,600</td><td class="p-1.5 border border-border text-right font-mono">99,400</td></tr><tr><td class="p-1.5 border border-border">Magnum (4,900 × 9 / 11)</td><td class="p-1.5 border border-border text-right font-mono">44,100</td><td class="p-1.5 border border-border text-right font-mono">53,900</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Total Usage</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>86,700</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>153,300</strong></td></tr></table>`,
        mistakes: ["Use PRODUCTION units, not Sales units", "Each product uses BOTH materials"]
      },
      {
        title: "(d) Materials Purchases Budget",
        marks: 14,
        explain: "<strong>Purchases = Usage + Closing Stock − Opening Stock.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Purchases</th><th class="p-1.5 border border-border text-right">Mat A (kg)</th><th class="p-1.5 border border-border text-right">Mat B (kg)</th></tr><tr><td class="p-1.5 border border-border">Usage</td><td class="p-1.5 border border-border text-right font-mono">86,700</td><td class="p-1.5 border border-border text-right font-mono">153,300</td></tr><tr><td class="p-1.5 border border-border">+ Closing Stock</td><td class="p-1.5 border border-border text-right font-mono">7,000</td><td class="p-1.5 border border-border text-right font-mono">13,500</td></tr><tr><td class="p-1.5 border border-border">− Opening Stock</td><td class="p-1.5 border border-border text-right font-mono">(6,500)</td><td class="p-1.5 border border-border text-right font-mono">(11,000)</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Purchases</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>87,200</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>155,800</strong></td></tr></table>`,
        mistakes: ["Same pattern as production budget", "Stock is in KILOGRAMS"]
      },
      {
        title: "(e) Direct Labour Budget",
        marks: 14,
        explain: "<strong>Production × Hours/unit × Rate/hour.</strong>",
        content: `<table class="w-full text-xs border-collapse max-w-md"><tr class="bg-muted"><th class="text-left p-1.5 border border-border">Labour Budget</th><th class="p-1.5 border border-border text-right">Quantum</th><th class="p-1.5 border border-border text-right">Magnum</th></tr><tr><td class="p-1.5 border border-border">Production</td><td class="p-1.5 border border-border text-right font-mono">7,100</td><td class="p-1.5 border border-border text-right font-mono">4,900</td></tr><tr><td class="p-1.5 border border-border">× Hours/unit</td><td class="p-1.5 border border-border text-right font-mono">4</td><td class="p-1.5 border border-border text-right font-mono">6</td></tr><tr><td class="p-1.5 border border-border">= Labour Hours</td><td class="p-1.5 border border-border text-right font-mono">28,400</td><td class="p-1.5 border border-border text-right font-mono">29,400</td></tr><tr><td class="p-1.5 border border-border">× Rate</td><td class="p-1.5 border border-border text-right font-mono">€11</td><td class="p-1.5 border border-border text-right font-mono">€11</td></tr><tr class="font-bold border-t-2 border-border"><td class="p-1.5 border border-border"><strong>Labour Cost</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>€312,400</strong></td><td class="p-1.5 border border-border text-right font-mono"><strong>€323,400</strong></td></tr></table><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Total:</strong> €312,400 + €323,400 = <strong>€635,800</strong></p>`,
        mistakes: ["Use PRODUCTION units from part (b)", "Show hours separately from cost"]
      },
      {
        title: "(f) Theory",
        marks: 6,
        explain: "<strong>Why prepare a production budget?</strong>",
        content: `<div class="text-sm leading-relaxed"><ul class="space-y-1 list-disc pl-4"><li>Determines units to manufacture to meet demand while maintaining stock</li><li>Forms basis for materials, labour, overhead budgets</li><li>Ensures production capacity is sufficient</li><li>Coordinates departments</li><li>Acts as a control mechanism — compare actual vs budget</li></ul></div>`,
        mistakes: ["Mention BOTH the calculation AND link to other budgets", "Include planning, control, and coordination"]
      }
    ]
  },
  {
    id: "cashprod-combined",
    type: "Cash + Production",
    name: "Cash Budget + Production Combined",
    year: 2024,
    source: "SEC pattern (2024/2020)",
    totalMarks: 80,
    category: "combined",
    desc: "Production budget feeds into materials and labour, then cash budget incorporates payments. Most common modern Q9 format.",
    partSummary: ["Production Budget", "Materials Cost", "Cash Receipts", "Cash Payments", "Net Cash", "Theory"],
    question: `<h3>Q9: Cash + Production Combined</h3><div class="text-sm text-muted-foreground leading-relaxed"><p>Combines a Production Budget with a Cash Budget. Used in 2024 and 2020.</p><ul class="space-y-1 list-disc pl-4 mt-2"><li><strong>Part (a):</strong> Production Budget</li><li><strong>Part (b):</strong> Materials Usage and Purchases</li><li><strong>Part (c):</strong> Cash Budget (3-6 months)</li><li><strong>Part (d):</strong> Theory</li></ul></div>`,
    steps: [
      {
        title: "Step 1: Production Budget",
        marks: "~14",
        explain: "<strong>Production = Sales + Closing Stock − Opening Stock.</strong>",
        content: `<div class="text-sm leading-relaxed space-y-2"><p>For each product:</p><p class="pl-4 font-mono">Production = Sales + Closing Stock − Opening Stock</p><p class="mt-2">E.g. Sales 8,000 + Closing 800 − Opening 700 = <strong>8,100 units</strong></p></div>`,
        mistakes: ["Always start with production budget", "Closing added, opening deducted", "Calculate per product"]
      },
      {
        title: "Step 2: Materials Cost",
        marks: "~10",
        explain: "<strong>Production × kg/unit × €/kg = total material cost.</strong>",
        content: `<div class="text-sm leading-relaxed space-y-2"><p>E.g. 8,100 units × 5 kg × €4/kg = <strong>€162,000</strong></p><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted"><strong>Cash budget:</strong> If paid one month in arrears, this becomes a payment in the FOLLOWING month.</p></div>`,
        mistakes: ["Use production units, not sales", "Apply credit terms for cash budget timing"]
      },
      {
        title: "Step 3: Cash Receipts",
        marks: "~14",
        explain: "<strong>Cash sales (with discount) + credit collections (lagged).</strong>",
        content: `<div class="text-sm leading-relaxed"><ul class="space-y-1 list-disc pl-4"><li><strong>Cash sales:</strong> Sales × Cash% × (1 − Discount%)</li><li><strong>Credit M+1:</strong> Prior Sales × Credit% × 60%</li><li><strong>Credit M+2:</strong> Two months ago × Credit% × 40%</li></ul><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted">New businesses: ZERO credit receipts in month 1.</p></div>`,
        mistakes: ["No credit receipts in opening month for new business", "Discount only on cash portion"]
      },
      {
        title: "Step 4: Cash Payments",
        marks: "~16",
        explain: "<strong>Materials (lagged), wages (same month), fixed OH (less depreciation), capital items, loan interest.</strong>",
        content: `<div class="text-sm leading-relaxed"><ul class="space-y-1 list-disc pl-4"><li><strong>Materials:</strong> credit lag with discount</li><li><strong>Wages:</strong> same month</li><li><strong>Fixed OH:</strong> LESS depreciation</li><li><strong>Equipment:</strong> month of purchase</li><li><strong>Loan interest:</strong> outstanding × rate ÷ 12</li></ul><p class="mt-2 text-xs font-bold text-destructive">Depreciation is NEVER in a cash budget.</p></div>`,
        mistakes: ["Depreciation is NOT cash", "Material discount only on % paid early", "Loan interest decreases as capital repaid"]
      },
      {
        title: "Step 5: Net Cash Position",
        marks: "~6",
        explain: "<strong>Receipts − Payments + Opening = Closing.</strong>",
        content: `<div class="text-sm leading-relaxed space-y-2"><p>Each month: Net Cash = Receipts − Payments</p><p>+ Opening Balance = <strong>Closing Balance</strong> → next month's opening</p><p class="mt-2 text-xs p-3 rounded-lg border border-border bg-muted">For theory: reference specific figures. E.g. "deficit of €X in March — recommend overdraft of €Y+"</p></div>`,
        mistakes: ["Each closing = next opening", "Negative = overdraft needed", "Reference specific months in advice"]
      }
    ]
  }
];

export const BUDGETING_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cash", label: "Cash Budget" },
  { key: "production", label: "Production Budget" },
  { key: "combined", label: "Cash + Production" },
  { key: "flexible", label: "Flexible Budget" },
];
