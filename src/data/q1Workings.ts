import type { Archetype } from "./archetypes";

export const Q1_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "universal", label: "Universal" },
  { key: "company", label: "Company" },
  { key: "manufacturing", label: "Manufacturing" },
];

export const Q1_ARCHETYPES: Archetype[] = [
  {
    id: "q1-van-disposal",
    type: "Universal",
    name: "Van Disposal with Trade-In",
    year: 2025,
    source: "ADJ (iii)",
    totalMarks: 18,
    category: "universal",
    desc: "Old van traded in against new van. Cheque for net amount incorrectly treated as purchase of trading stock.",
    partSummary: ["Reverse Purchases","Record New Van","Remove Old Van","Depreciation","Disposal A/C","P&L & BS Impact"],
    question: `<p><strong>Provide for depreciation on delivery vans</strong> at the annual rate of 15% of cost from the date of purchase to the date of sale.</p>
<p><strong>NOTE:</strong> On 30/06/2024 a delivery van, which cost €35,000 on 31/08/2022, was traded in against a new van which cost €48,000. An allowance of €23,200 was given on the old van. The cheque for the net amount was entered in the bank account but was <strong>incorrectly treated as a purchase of trading stock</strong>.</p>
<p><em>TB: Delivery Vans (Cost €132,000): €110,500 | Purchases: €622,400</em></p>`,
    steps: [
      {
        title: "Step 1 — What went wrong?",
        marks: 0,
        explain: "McConnell paid €24,800 (48,000 − 23,200) by cheque for the new van. Bank was credited correctly, but Purchases was debited instead of Delivery Vans. Purchases is overstated by €24,800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Purchases A/C</th><th class="text-left p-2 border border-border" colspan="2">Delivery Vans A/C (Cost)</th></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance</td><td class="p-2 border border-border text-right font-mono">622,400</td><td class="p-2 border border-border">Per trial balance</td><td class="p-2 border border-border text-right font-mono">132,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Reverse the Error in Purchases",
        marks: 3,
        explain: "Credit Purchases to remove the €24,800 incorrectly debited. This brings Purchases down to the correct figure.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Purchases A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 622,400</td><td class="p-2 border border-border">Delivery Vans (error): <strong>24,800</strong></td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted: 597,600</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: ["Forgetting to credit Purchases — leaving it overstated"]
      },
      {
        title: "Step 3 — Record the New Van & Remove Old Van",
        marks: 4,
        explain: "Debit Delivery Vans with cost of new van (€48,000). Credit Delivery Vans to remove cost of old van (€35,000).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Delivery Vans A/C (Cost)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 132,000</td><td class="p-2 border border-border">Old van removed: 35,000</td></tr><tr><td class="p-2 border border-border">New van (cost): 48,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Error reversal: 24,800</td><td class="p-2 border border-border"></td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted: 169,800</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: ["Forgetting to add the €24,800 error reversal to Delivery Vans"]
      },
      {
        title: "Step 4 — Depreciation on Old Van to Date of Sale",
        marks: 4,
        explain: "Old van cost €35,000, bought 31/08/2022, sold 30/06/2024. Depreciation at 15% of cost per year from date of purchase to date of sale. 31/08/2022 to 30/06/2024 = 22 months. Depreciation = 35,000 × 15% × 22/12 = €9,625.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Accumulated Depreciation — Old Van</th></tr></thead><tbody><tr><td class="p-2 border border-border">Cost</td><td class="p-2 border border-border text-right font-mono">35,000</td></tr><tr><td class="p-2 border border-border">Rate</td><td class="p-2 border border-border text-right font-mono">15%</td></tr><tr><td class="p-2 border border-border">Period: 31/08/2022 → 30/06/2024</td><td class="p-2 border border-border text-right font-mono">22 months</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Acc. Dep on old van</td><td class="p-2 border border-border text-right font-mono">9,625</td></tr></tbody></table>`,
        mistakes: ["Using NBV instead of cost for straight-line","Counting months incorrectly — it's 22 months, not 24"]
      },
      {
        title: "Step 5 — Disposal Account",
        marks: 4,
        explain: "Disposal Account: Debit cost of old van (35,000), Credit accumulated depreciation (9,625), Credit trade-in allowance (23,200). Balance = Loss on disposal.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Old Van A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 35,000</td><td class="p-2 border border-border">Acc. Dep: 9,625</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Trade-in allowance: 23,200</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold text-red-600">Loss on disposal: 2,175</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">35,000</td><td class="p-2 border border-border">35,000</td></tr></tbody></table>`,
        mistakes: ["Forgetting the trade-in allowance goes on credit side of disposal","Putting loss on disposal on the wrong side"]
      },
      {
        title: "Step 6 — Full Year Depreciation on Remaining Vans",
        marks: 3,
        explain: "Remaining vans after removing old and adding new: €169,800. Full year depreciation at 15% = €25,470. But the new van (€48,000) was bought mid-year (30/06/2024), so 6 months only: 48,000 × 15% × 6/12 = €3,600. Other vans: (169,800 − 48,000) × 15% = €18,270. Total dep = 18,270 + 3,600 = €21,870.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Van</th><th class="p-2 border border-border text-right">Cost</th><th class="p-2 border border-border text-right">Rate</th><th class="p-2 border border-border text-right">Period</th><th class="p-2 border border-border text-right">Dep</th></tr></thead><tbody><tr><td class="p-2 border border-border">Existing vans</td><td class="p-2 border border-border text-right font-mono">121,800</td><td class="p-2 border border-border text-right">15%</td><td class="p-2 border border-border text-right">12 mths</td><td class="p-2 border border-border text-right font-mono">18,270</td></tr><tr><td class="p-2 border border-border">New van</td><td class="p-2 border border-border text-right font-mono">48,000</td><td class="p-2 border border-border text-right">15%</td><td class="p-2 border border-border text-right">6 mths</td><td class="p-2 border border-border text-right font-mono">3,600</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border" colspan="4">Total Depreciation — Delivery Vans</td><td class="p-2 border border-border text-right font-mono">21,870</td></tr></tbody></table>`,
        mistakes: ["Applying full year depreciation to the new van","Forgetting the old van's depreciation was already handled in disposal"]
      }
    ]
  },
  {
    id: "q1-mortgage-interest",
    type: "Universal",
    name: "Mortgage/Debenture Interest & Suspense",
    year: 2025,
    source: "ADJ (v)+(ix)",
    totalMarks: 10,
    category: "universal",
    desc: "Interest paid was incorrect amount, correct amount involves accrual. Suspense entry to fix the difference.",
    partSummary: ["Calculate correct interest","Record accrual","Fix suspense","P&L impact","BS impact"],
    question: `<p><strong>Mortgage interest</strong> at 6% p.a. on a mortgage of €120,000. The TB shows €5,400 paid. The correct full year amount is €7,200.</p><p>The difference of €1,800 was entered in the suspense account.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Correct Interest",
        marks: 2,
        explain: "Mortgage = €120,000 × 6% = €7,200 for the full year. TB shows only €5,400 paid, so €1,800 is still due (accrued).",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Mortgage</td><td class="p-2 border border-border text-right font-mono">120,000</td></tr><tr><td class="p-2 border border-border">Rate</td><td class="p-2 border border-border text-right font-mono">6%</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Full year interest</td><td class="p-2 border border-border text-right font-mono">7,200</td></tr><tr><td class="p-2 border border-border">Already paid (TB)</td><td class="p-2 border border-border text-right font-mono">5,400</td></tr><tr class="font-bold"><td class="p-2 border border-border">Amount due (accrual)</td><td class="p-2 border border-border text-right font-mono">1,800</td></tr></tbody></table>`,
        mistakes: ["Using the TB figure as the P&L charge instead of the full €7,200"]
      },
      {
        title: "Step 2 — Record the Accrual",
        marks: 2,
        explain: "Debit Mortgage Interest (P&L) €1,800. Credit Accruals (BS — Current Liabilities) €1,800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Mortgage Interest (P&L)</td><td class="p-2 border border-border text-right font-mono">1,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Accruals (BS — CL)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,800</td></tr></tbody></table>`,
        mistakes: ["Forgetting the accrual appears as a current liability on the BS"]
      },
      {
        title: "Step 3 — Clear the Suspense Account",
        marks: 2,
        explain: "The €1,800 difference was placed in Suspense. Now that we've debited Mortgage Interest, the Suspense account is cleared.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Suspense A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 1,800</td><td class="p-2 border border-border">Mortgage Interest: 1,800</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Balance: NIL ✓</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: ["Not clearing the suspense — leaving a balance"]
      },
      {
        title: "Step 4 — Impact on P&L",
        marks: 2,
        explain: "Mortgage interest expense in P&L = full €7,200 (€5,400 paid + €1,800 accrued). This is shown as a separate line after expenses, before income.",
        content: `<p class="text-sm"><strong>P&L:</strong> Mortgage Interest = <strong>€7,200</strong> (shown between expenses and income)</p>`,
        mistakes: []
      },
      {
        title: "Step 5 — Impact on Balance Sheet",
        marks: 2,
        explain: "Accrued mortgage interest of €1,800 appears under Current Liabilities. The mortgage principal of €120,000 remains under Long-Term Liabilities.",
        content: `<p class="text-sm"><strong>BS Current Liabilities:</strong> Mortgage interest due = <strong>€1,800</strong></p><p class="text-sm"><strong>BS Long-Term Liabilities:</strong> Mortgage = <strong>€120,000</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-revaluation-eoy",
    type: "Universal",
    name: "Revaluation of Buildings (End of Year)",
    year: 2025,
    source: "ADJ (viii)+(ix.3)",
    totalMarks: 10,
    category: "universal",
    desc: "Buildings revalued at year end. Replace cost and accumulated depreciation with new valuation.",
    partSummary: ["Calculate NBV","Find revaluation surplus","Adjust BS","Depreciation impact","Reserves entry"],
    question: `<p><strong>Buildings</strong> (cost €300,000, acc. dep €45,000) are to be revalued to <strong>€320,000</strong> at 31/12/2024.</p>`,
    steps: [
      {
        title: "Step 1 — Current NBV",
        marks: 2,
        explain: "NBV = Cost − Accumulated Depreciation = 300,000 − 45,000 = €255,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Cost</td><td class="p-2 border border-border text-right font-mono">300,000</td></tr><tr><td class="p-2 border border-border">Less Acc. Dep</td><td class="p-2 border border-border text-right font-mono">(45,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">NBV</td><td class="p-2 border border-border text-right font-mono">255,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Revaluation Surplus",
        marks: 2,
        explain: "Revaluation surplus = New value − NBV = 320,000 − 255,000 = €65,000. This goes to Revaluation Reserve on BS.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">New valuation</td><td class="p-2 border border-border text-right font-mono">320,000</td></tr><tr><td class="p-2 border border-border">Less NBV</td><td class="p-2 border border-border text-right font-mono">(255,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Revaluation Surplus</td><td class="p-2 border border-border text-right font-mono">65,000</td></tr></tbody></table>`,
        mistakes: ["Calculating surplus using cost instead of NBV"]
      },
      {
        title: "Step 3 — Journal Entry",
        marks: 3,
        explain: "Remove old cost and acc. dep, replace with new valuation. Credit the surplus to Revaluation Reserve.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Buildings (new value)</td><td class="p-2 border border-border text-right font-mono">320,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Acc. Dep — Buildings</td><td class="p-2 border border-border text-right font-mono">45,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Buildings (old cost)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">300,000</td></tr><tr><td class="p-2 border border-border">Revaluation Reserve</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">65,000</td></tr></tbody></table>`,
        mistakes: ["Not clearing the old accumulated depreciation"]
      },
      {
        title: "Step 4 — BS Impact",
        marks: 2,
        explain: "Buildings now shown at €320,000 (no accumulated depreciation — it's been reset). Revaluation Reserve of €65,000 appears under Capital & Reserves.",
        content: `<p class="text-sm"><strong>Fixed Assets:</strong> Buildings = <strong>€320,000</strong> (acc dep = nil)</p><p class="text-sm"><strong>Capital & Reserves:</strong> Revaluation Reserve = <strong>€65,000</strong></p>`,
        mistakes: ["Showing the surplus in the P&L instead of Revaluation Reserve — revaluations do NOT go through P&L"]
      },
      {
        title: "Step 5 — Future Depreciation",
        marks: 1,
        explain: "After revaluation, depreciation is calculated on the NEW value of €320,000 over the remaining useful life. No depreciation in the year of revaluation if revalued at year end.",
        content: `<p class="text-sm">Future annual depreciation = €320,000 ÷ remaining useful life</p>`,
        mistakes: ["Depreciating on the old cost after revaluation"]
      }
    ]
  },
  {
    id: "q1-bad-debt-recovery",
    type: "Universal",
    name: "Bad Debt Recovery (Partial)",
    year: 2025,
    source: "ADJ (vi)",
    totalMarks: 6,
    category: "universal",
    desc: "A previously written-off debtor pays part of their debt. Record the recovery as income.",
    partSummary: ["Identify recovery","Record in P&L","BS impact"],
    question: `<p>A debt of €2,400 previously written off as bad has been <strong>partially recovered</strong>. The debtor paid <strong>€1,500</strong> by cheque.</p>`,
    steps: [
      {
        title: "Step 1 — Identify the Recovery",
        marks: 1,
        explain: "The full debt was €2,400 but only €1,500 was recovered. This €1,500 is income — it goes to the credit side of P&L as 'Bad Debt Recovered'.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Original debt written off</td><td class="p-2 border border-border text-right font-mono">2,400</td></tr><tr><td class="p-2 border border-border">Amount recovered</td><td class="p-2 border border-border text-right font-mono">1,500</td></tr><tr><td class="p-2 border border-border">Still irrecoverable</td><td class="p-2 border border-border text-right font-mono">900</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Double Entry",
        marks: 3,
        explain: "Debit Bank €1,500 (cash received). Credit Bad Debts Recovered €1,500 (income in P&L). Do NOT reinstate the debtor — the money went straight to bank.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border text-right font-mono">1,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bad Debts Recovered (P&L income)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,500</td></tr></tbody></table>`,
        mistakes: ["Reinstating the full €2,400 as a debtor","Putting the recovery in Trading Account instead of P&L income"]
      },
      {
        title: "Step 3 — P&L and BS",
        marks: 2,
        explain: "P&L: Bad Debts Recovered = €1,500 (shown under Income). BS: Bank increases by €1,500.",
        content: `<p class="text-sm"><strong>P&L — Income:</strong> Bad debts recovered = <strong>€1,500</strong></p><p class="text-sm"><strong>BS:</strong> Bank balance increases by <strong>€1,500</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-goods-own-use",
    type: "Universal",
    name: "Goods for Own Use (Drawings)",
    year: 2025,
    source: "ADJ (vii)",
    totalMarks: 6,
    category: "universal",
    desc: "Owner took goods at cost for personal use. Reduce Purchases, increase Drawings.",
    partSummary: ["Reduce Purchases","Increase Drawings","BS impact"],
    question: `<p>The owner took goods costing <strong>€3,200</strong> for personal use. This has <strong>not been recorded</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — The Adjustment",
        marks: 2,
        explain: "Goods taken by owner = Drawings. Purchases must be reduced (credited) and Drawings increased (debited). Use COST price, not selling price.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Drawings</td><td class="p-2 border border-border text-right font-mono">3,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,200</td></tr></tbody></table>`,
        mistakes: ["Using selling price instead of cost price","Debiting Purchases instead of crediting it"]
      },
      {
        title: "Step 2 — Effect on Trading A/C",
        marks: 2,
        explain: "Purchases decrease by €3,200. This increases Gross Profit by €3,200.",
        content: `<p class="text-sm"><strong>Trading A/C:</strong> Purchases reduced by €3,200 → Gross Profit increases by €3,200</p>`,
        mistakes: []
      },
      {
        title: "Step 3 — Effect on BS",
        marks: 2,
        explain: "Drawings increase by €3,200. This reduces Capital (Capital − Drawings).",
        content: `<p class="text-sm"><strong>BS:</strong> Drawings = existing drawings + €3,200. This reduces the owner's Capital.</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-prov-bad-debts",
    type: "Universal",
    name: "Provision for Bad Debts",
    year: 2025,
    source: "ADJ (ix.4)",
    totalMarks: 4,
    category: "universal",
    desc: "Create or adjust provision for bad debts as a percentage of adjusted debtors.",
    partSummary: ["Calculate adjusted debtors","New provision","Increase/decrease"],
    question: `<p>Create a provision for bad debts of <strong>5%</strong> of debtors. Debtors per TB: €48,000. Existing provision: €2,000. Bad debts written off this year: €800.</p>`,
    steps: [
      {
        title: "Step 1 — Adjusted Debtors & New Provision",
        marks: 2,
        explain: "Adjusted debtors = TB debtors − bad debts written off = 48,000 − 800 = €47,200. New provision = 5% × 47,200 = €2,360. Existing provision = €2,000. Increase = €360.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Debtors (TB)</td><td class="p-2 border border-border text-right font-mono">48,000</td></tr><tr><td class="p-2 border border-border">Less: Bad debts w/o</td><td class="p-2 border border-border text-right font-mono">(800)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Adjusted Debtors</td><td class="p-2 border border-border text-right font-mono">47,200</td></tr><tr><td class="p-2 border border-border">New Provision (5%)</td><td class="p-2 border border-border text-right font-mono">2,360</td></tr><tr><td class="p-2 border border-border">Old Provision</td><td class="p-2 border border-border text-right font-mono">(2,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Increase in provision (P&L charge)</td><td class="p-2 border border-border text-right font-mono">360</td></tr></tbody></table>`,
        mistakes: ["Calculating provision on TB debtors without adjusting for bad debts written off","Charging the full new provision instead of just the increase"]
      },
      {
        title: "Step 2 — P&L and BS",
        marks: 2,
        explain: "P&L: Increase in provision for bad debts = €360 (expense under Selling & Distribution). BS: Debtors shown net = 47,200 − 2,360 = €44,840.",
        content: `<p class="text-sm"><strong>P&L (S&D):</strong> Increase in provision for bad debts = <strong>€360</strong></p><p class="text-sm"><strong>P&L (S&D):</strong> Bad debts written off = <strong>€800</strong></p><p class="text-sm"><strong>BS — Current Assets:</strong> Debtors (47,200 − 2,360) = <strong>€44,840</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-patent-writeoff",
    type: "Universal",
    name: "Patent Write-Off & Investment Income",
    year: 2025,
    source: "ADJ (ii)+(vi)",
    totalMarks: 8,
    category: "universal",
    desc: "Write off a patent and record investment income due but not yet received.",
    partSummary: ["Patent write-off","Investment income accrual","P&L entries","BS entries"],
    question: `<p><strong>Patent</strong> (TB: €12,000) is to be written off by <strong>25%</strong> per annum. Investment income of <strong>€1,800</strong> is due but not yet received.</p>`,
    steps: [
      {
        title: "Step 1 — Patent Write-Off",
        marks: 2,
        explain: "Write off 25% of patent: 12,000 × 25% = €3,000. Debit Patent Written Off (P&L — Admin). Credit Patent (BS — Fixed Asset).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Patent Written Off (P&L — Admin)</td><td class="p-2 border border-border text-right font-mono">3,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Patent (BS)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,000</td></tr></tbody></table>`,
        mistakes: ["Patent write-off goes to Admin, not S&D"]
      },
      {
        title: "Step 2 — Investment Income Accrual",
        marks: 2,
        explain: "Investment income of €1,800 is due. Debit Investment Income Due (BS — CA). Credit Investment Income (P&L — Income).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Investment Income Due (BS — CA)</td><td class="p-2 border border-border text-right font-mono">1,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Investment Income (P&L — Income)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,800</td></tr></tbody></table>`,
        mistakes: ["Putting investment income under Trading Account — it's P&L income"]
      },
      {
        title: "Step 3 — P&L Impact",
        marks: 2,
        explain: "Patent written off = €3,000 (Admin expense, reduces NP). Investment income = €1,800 (Income, increases NP).",
        content: `<p class="text-sm"><strong>Admin Expenses:</strong> Patent written off = €3,000</p><p class="text-sm"><strong>Income:</strong> Investment income = €1,800</p>`,
        mistakes: []
      },
      {
        title: "Step 4 — BS Impact",
        marks: 2,
        explain: "Patent reduced to €9,000 (12,000 − 3,000) under Fixed Assets. Investment Income Due = €1,800 under Current Assets.",
        content: `<p class="text-sm"><strong>Fixed Assets:</strong> Patent = 12,000 − 3,000 = <strong>€9,000</strong></p><p class="text-sm"><strong>Current Assets:</strong> Investment income due = <strong>€1,800</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-credit-sale-vat",
    type: "Universal",
    name: "Credit Sale with VAT & Undispatched Goods",
    year: 2025,
    source: "ADJ (iv)",
    totalMarks: 6,
    category: "universal",
    desc: "A credit sale including VAT was not recorded. Goods have not yet been dispatched (sale or return).",
    partSummary: ["Separate VAT","Record sale","Adjust for undispatched"],
    question: `<p>A credit sale of <strong>€9,840 (VAT inclusive at 23%)</strong> was made on 28/12/2024 but has not been recorded. The goods have been dispatched.</p>`,
    steps: [
      {
        title: "Step 1 — Separate VAT",
        marks: 2,
        explain: "VAT-inclusive amount = €9,840. To find the VAT: 9,840 × 23/123 = €1,840. Net sale = 9,840 − 1,840 = €8,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">VAT-inclusive amount</td><td class="p-2 border border-border text-right font-mono">9,840</td></tr><tr><td class="p-2 border border-border">VAT (23/123)</td><td class="p-2 border border-border text-right font-mono">1,840</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net sale</td><td class="p-2 border border-border text-right font-mono">8,000</td></tr></tbody></table>`,
        mistakes: ["Calculating VAT as 23% of 9,840 (that gives €2,263 — wrong!)","The formula is Amount × 23/123, NOT Amount × 23%"]
      },
      {
        title: "Step 2 — Record the Sale",
        marks: 2,
        explain: "Debit Debtors €9,840 (full amount owed). Credit Sales €8,000 (net). Credit VAT €1,840.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Debtors</td><td class="p-2 border border-border text-right font-mono">9,840</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Sales</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">8,000</td></tr><tr><td class="p-2 border border-border">VAT</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,840</td></tr></tbody></table>`,
        mistakes: ["Forgetting to split out the VAT","Debiting Sales instead of crediting it"]
      },
      {
        title: "Step 3 — P&L and BS",
        marks: 2,
        explain: "Sales increase by €8,000 in Trading Account. Debtors increase by €9,840. VAT liability increases by €1,840.",
        content: `<p class="text-sm"><strong>Trading:</strong> Sales increases by €8,000</p><p class="text-sm"><strong>BS — CA:</strong> Debtors increases by €9,840</p><p class="text-sm"><strong>BS — CL:</strong> VAT payable increases by €1,840</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-debenture-interest-midyear",
    type: "Company",
    name: "Debenture Interest (Mid-Year Issue)",
    year: 2025,
    source: "Company",
    totalMarks: 4,
    category: "company",
    desc: "Debentures issued mid-year — interest calculated for the period since issue.",
    partSummary: ["Calculate interest","Accrual entry"],
    question: `<p>8% Debentures of <strong>€200,000</strong> were issued on <strong>1/04/2024</strong>. No interest has been paid or accrued.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Interest Due",
        marks: 2,
        explain: "Debentures = €200,000 × 8% = €16,000 per year. Issued 1/04/2024, so for 9 months to 31/12/2024: 16,000 × 9/12 = €12,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Debentures</td><td class="p-2 border border-border text-right font-mono">200,000</td></tr><tr><td class="p-2 border border-border">Rate</td><td class="p-2 border border-border text-right">8%</td></tr><tr><td class="p-2 border border-border">Period</td><td class="p-2 border border-border text-right">9 months</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Interest due</td><td class="p-2 border border-border text-right font-mono">12,000</td></tr></tbody></table>`,
        mistakes: ["Charging a full year of interest instead of 9 months"]
      },
      {
        title: "Step 2 — Record Entry",
        marks: 2,
        explain: "Debit Debenture Interest (P&L) €12,000. Credit Debenture Interest Due (BS — CL) €12,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Debenture Interest (P&L)</td><td class="p-2 border border-border text-right font-mono">12,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Debenture Interest Due (BS — CL)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">12,000</td></tr></tbody></table>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-appropriation",
    type: "Company",
    name: "Appropriation: Tax, Dividends & Reserve",
    year: 2025,
    source: "Company",
    totalMarks: 6,
    category: "company",
    desc: "Corporation tax provision, proposed dividends, and transfer to general reserve.",
    partSummary: ["Tax provision","Dividends","Reserve transfer"],
    question: `<p>Provide for corporation tax at <strong>12.5%</strong> of net profit. Proposed ordinary dividend of <strong>€0.08 per share</strong> on 500,000 shares. Transfer <strong>€15,000</strong> to General Reserve.</p>`,
    steps: [
      {
        title: "Step 1 — Appropriation Account",
        marks: 4,
        explain: "Start with Net Profit from P&L. Deduct: (1) Corporation tax, (2) Proposed dividends = 500,000 × €0.08 = €40,000, (3) Transfer to reserve = €15,000. Balance = Retained Profit.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Appropriation Account</th></tr></thead><tbody><tr><td class="p-2 border border-border">Net Profit (from P&L)</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border">Less: Corporation Tax (12.5%)</td><td class="p-2 border border-border text-right font-mono">(XXX)</td></tr><tr><td class="p-2 border border-border">Profit After Tax</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border">Less: Proposed Dividends (500,000 × 0.08)</td><td class="p-2 border border-border text-right font-mono">(40,000)</td></tr><tr><td class="p-2 border border-border">Less: Transfer to General Reserve</td><td class="p-2 border border-border text-right font-mono">(15,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Retained Profit for Year</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr></tbody></table>`,
        mistakes: ["Putting corporation tax under expenses instead of appropriation","Forgetting that dividends PAID are NOT in appropriation — only PROPOSED"]
      },
      {
        title: "Step 2 — BS Impact",
        marks: 2,
        explain: "Tax provision and proposed dividends appear as Current Liabilities. General Reserve appears under Capital & Reserves. Retained profit adds to P&L balance on BS.",
        content: `<p class="text-sm"><strong>CL:</strong> Corporation Tax = XXX | Proposed Dividends = €40,000</p><p class="text-sm"><strong>Capital & Reserves:</strong> General Reserve increases by €15,000 | P&L balance = Opening + Retained</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-raw-materials",
    type: "Manufacturing",
    name: "Raw Materials Consumed",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 4,
    category: "manufacturing",
    desc: "Calculate raw materials consumed for the Manufacturing Account.",
    partSummary: ["Opening + Purchases − Closing","Manufacturing A/C entry"],
    question: `<p>Opening stock of raw materials: <strong>€18,000</strong>. Purchases of raw materials: <strong>€95,000</strong>. Closing stock of raw materials: <strong>€22,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Raw Materials Consumed",
        marks: 2,
        explain: "Raw Materials Consumed = Opening Stock + Purchases − Closing Stock = 18,000 + 95,000 − 22,000 = €91,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Opening Stock — Raw Materials</td><td class="p-2 border border-border text-right font-mono">18,000</td></tr><tr><td class="p-2 border border-border">Add: Purchases of Raw Materials</td><td class="p-2 border border-border text-right font-mono">95,000</td></tr><tr><td class="p-2 border border-border">Less: Closing Stock — Raw Materials</td><td class="p-2 border border-border text-right font-mono">(22,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Raw Materials Consumed</td><td class="p-2 border border-border text-right font-mono">91,000</td></tr></tbody></table>`,
        mistakes: ["Confusing raw materials stock with finished goods stock"]
      },
      {
        title: "Step 2 — Position in Manufacturing Account",
        marks: 2,
        explain: "Raw Materials Consumed is the first item in the Manufacturing Account. It is part of Prime Cost (Materials + Direct Labour).",
        content: `<p class="text-sm"><strong>Manufacturing Account:</strong></p><p class="text-sm">Raw Materials Consumed = €91,000</p><p class="text-sm">+ Direct Labour = XXX</p><p class="text-sm">= <strong>Prime Cost</strong></p>`,
        mistakes: ["Putting raw materials in the Trading Account instead of Manufacturing Account"]
      }
    ]
  },
  {
    id: "q1-scrap-disposal",
    type: "Manufacturing",
    name: "Sale of Scrap & Machine Disposal",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 6,
    category: "manufacturing",
    desc: "Sale of factory scrap reduces factory overheads. Machine disposal follows standard disposal procedure.",
    partSummary: ["Scrap sale treatment","Machine disposal","Manufacturing A/C"],
    question: `<p>Scrap materials were sold for <strong>€2,400</strong>. A factory machine (cost €40,000, acc. dep €28,000) was sold for <strong>€15,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Sale of Scrap",
        marks: 2,
        explain: "Sale of scrap is credited against Factory Overheads in the Manufacturing Account (reduces the cost of production). It is NOT income in the P&L.",
        content: `<p class="text-sm"><strong>Manufacturing Account — Factory Overheads:</strong></p><p class="text-sm">Factory overheads (per TB) = XXX</p><p class="text-sm">Less: Sale of scrap = (2,400)</p><p class="text-sm">= Adjusted factory overheads</p>`,
        mistakes: ["Putting scrap sale in P&L income — it belongs in Manufacturing Account"]
      },
      {
        title: "Step 2 — Machine Disposal",
        marks: 2,
        explain: "NBV = 40,000 − 28,000 = €12,000. Sold for €15,000. Profit on disposal = €3,000. This profit goes to P&L as income.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Machine A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 40,000</td><td class="p-2 border border-border">Acc. Dep: 28,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Bank (proceeds): 15,000</td></tr><tr><td class="p-2 border border-border font-bold text-green-600">Profit: 3,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: ["Putting profit on disposal of FACTORY machine in Manufacturing Account — it goes to P&L"]
      },
      {
        title: "Step 3 — Where Each Item Goes",
        marks: 2,
        explain: "Scrap sale → Manufacturing Account (reduces factory overheads). Profit on machine disposal → P&L Income section. These are different destinations!",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Item</th><th class="p-2 border border-border">Destination</th></tr></thead><tbody><tr><td class="p-2 border border-border">Sale of scrap €2,400</td><td class="p-2 border border-border">Manufacturing A/C (reduces factory O/H)</td></tr><tr><td class="p-2 border border-border">Profit on disposal €3,000</td><td class="p-2 border border-border">P&L — Income</td></tr></tbody></table>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-damaged-stock",
    type: "Universal",
    name: "Damaged / Obsolete Stock",
    year: 2025,
    source: "ADJ (i)",
    totalMarks: 4,
    category: "universal",
    desc: "Stock damaged or obsolete must be valued at NRV (lower of cost and NRV).",
    partSummary: ["Identify NRV","Adjust closing stock"],
    question: `<p>Closing stock includes items that cost <strong>€4,000</strong> but have a net realisable value of only <strong>€1,500</strong>.</p><p>Total closing stock at cost: <strong>€52,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Apply Lower of Cost and NRV",
        marks: 2,
        explain: "Damaged items: Cost = €4,000, NRV = €1,500. Use NRV (lower). Write down = 4,000 − 1,500 = €2,500. Adjusted closing stock = 52,000 − 2,500 = €49,500.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Total closing stock at cost</td><td class="p-2 border border-border text-right font-mono">52,000</td></tr><tr><td class="p-2 border border-border">Less: Write-down (4,000 − 1,500)</td><td class="p-2 border border-border text-right font-mono">(2,500)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted closing stock</td><td class="p-2 border border-border text-right font-mono">49,500</td></tr></tbody></table>`,
        mistakes: ["Using the full cost of €4,000 — must use NRV of €1,500"]
      },
      {
        title: "Step 2 — Effect",
        marks: 2,
        explain: "Lower closing stock reduces Gross Profit. Closing stock on BS = €49,500 (Current Asset).",
        content: `<p class="text-sm"><strong>Trading A/C:</strong> Closing Stock = €49,500 (lower GP than if using full cost)</p><p class="text-sm"><strong>BS — CA:</strong> Stock = €49,500</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-goods-in-transit",
    type: "Universal",
    name: "Goods in Transit",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Goods purchased but not yet received at year end. Include in purchases, add to closing stock.",
    partSummary: ["Adjust purchases","Adjust stock"],
    question: `<p>Goods costing <strong>€6,000</strong> were purchased on 28/12/2024 but <strong>had not arrived by year end</strong>. They were not included in the TB or closing stock.</p>`,
    steps: [
      {
        title: "Step 1 — Record the Purchase",
        marks: 2,
        explain: "The goods belong to the business (title has passed). Debit Purchases €6,000, Credit Creditors €6,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border text-right font-mono">6,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">6,000</td></tr></tbody></table>`,
        mistakes: ["Not recording the purchase at all because goods haven't arrived"]
      },
      {
        title: "Step 2 — Add to Closing Stock",
        marks: 2,
        explain: "Also add €6,000 to closing stock since the goods belong to the business even though not physically present.",
        content: `<p class="text-sm"><strong>Trading A/C:</strong> Purchases ↑ by €6,000, Closing Stock ↑ by €6,000 — net effect on GP = NIL</p><p class="text-sm"><strong>BS:</strong> Stock ↑ €6,000 and Creditors ↑ €6,000</p>`,
        mistakes: ["Only adjusting purchases without adjusting stock — this would reduce GP incorrectly"]
      }
    ]
  },
  {
    id: "q1-sale-or-return",
    type: "Universal",
    name: "Goods on Sale or Return",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Goods sent on sale or return not yet accepted must be reversed from sales and added back to stock.",
    partSummary: ["Reverse the sale","Adjust stock"],
    question: `<p>Goods costing <strong>€3,000</strong> (selling price €4,500) were sent to a customer on <strong>sale or return</strong>. At year end the customer had <strong>not yet accepted</strong> the goods. The sale was recorded at selling price.</p>`,
    steps: [
      {
        title: "Step 1 — Reverse the Sale",
        marks: 2,
        explain: "Since the customer hasn't accepted, this is NOT a sale. Debit Sales €4,500. Credit Debtors €4,500. The goods are still ours.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Sales</td><td class="p-2 border border-border text-right font-mono">4,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Debtors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">4,500</td></tr></tbody></table>`,
        mistakes: ["Reversing at cost (€3,000) instead of selling price (€4,500)"]
      },
      {
        title: "Step 2 — Add Back to Stock",
        marks: 2,
        explain: "Add back at COST (€3,000) to closing stock. Stock is always valued at cost (or NRV if lower).",
        content: `<p class="text-sm"><strong>Trading:</strong> Sales reduced by €4,500. Closing stock increased by €3,000.</p><p class="text-sm"><strong>BS:</strong> Debtors reduced by €4,500. Stock increased by €3,000.</p>`,
        mistakes: ["Adding back to stock at selling price instead of cost"]
      }
    ]
  },
  {
    id: "q1-prepayments",
    type: "Universal",
    name: "Prepayments (Time Apportion)",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Insurance or rent paid in advance — only charge the current year portion to P&L.",
    partSummary: ["Calculate prepaid amount","Adjust expense"],
    question: `<p>Insurance of <strong>€4,800</strong> was paid on 1/10/2024 covering 12 months to 30/09/2025. The TB shows total insurance paid of <strong>€6,200</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Prepayment",
        marks: 2,
        explain: "€4,800 covers 12 months. Only 3 months (Oct–Dec) fall in 2024. Current year portion = 4,800 × 3/12 = €1,200. Prepaid = 4,800 − 1,200 = €3,600.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Insurance paid</td><td class="p-2 border border-border text-right font-mono">4,800</td></tr><tr><td class="p-2 border border-border">Period in current year</td><td class="p-2 border border-border text-right">3/12</td></tr><tr><td class="p-2 border border-border">Current year charge</td><td class="p-2 border border-border text-right font-mono">1,200</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Prepaid (9 months)</td><td class="p-2 border border-border text-right font-mono">3,600</td></tr></tbody></table>`,
        mistakes: ["Charging the full €4,800 to the P&L"]
      },
      {
        title: "Step 2 — P&L and BS",
        marks: 2,
        explain: "P&L Insurance = TB figure − prepaid = 6,200 − 3,600 = €2,600. Prepaid Insurance = €3,600 (Current Asset on BS).",
        content: `<p class="text-sm"><strong>P&L (Admin):</strong> Insurance = 6,200 − 3,600 = <strong>€2,600</strong></p><p class="text-sm"><strong>BS — CA:</strong> Prepaid Insurance = <strong>€3,600</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-accruals",
    type: "Universal",
    name: "Accruals (Amounts Due)",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Expenses incurred but not yet paid at year end — add to the P&L charge and show as CL.",
    partSummary: ["Calculate accrual","Adjust expense"],
    question: `<p>Electricity for December 2024 amounting to <strong>€450</strong> has not been paid or recorded.</p>`,
    steps: [
      {
        title: "Step 1 — Record the Accrual",
        marks: 2,
        explain: "Debit Light & Heat (P&L) €450. Credit Accruals (BS — CL) €450.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Light & Heat (P&L)</td><td class="p-2 border border-border text-right font-mono">450</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Accruals (BS — CL)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">450</td></tr></tbody></table>`,
        mistakes: ["Not recording the accrual — understates expenses and overstates profit"]
      },
      {
        title: "Step 2 — Effect",
        marks: 2,
        explain: "P&L: Light & Heat increased by €450 (reduces NP). BS: Accruals of €450 appears as a Current Liability.",
        content: `<p class="text-sm"><strong>P&L:</strong> Light & Heat = TB figure + €450</p><p class="text-sm"><strong>BS — CL:</strong> Accrued expenses includes €450</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-private-expense",
    type: "Universal",
    name: "Private Expense in Business Expense",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Owner's private expense was paid from business account — treat as drawings.",
    partSummary: ["Reduce expense","Increase drawings"],
    question: `<p>The insurance figure in the TB (€6,200) includes <strong>€800</strong> for the owner's private car insurance.</p>`,
    steps: [
      {
        title: "Step 1 — Separate Private from Business",
        marks: 2,
        explain: "Debit Drawings €800 (private expense). Credit Insurance €800 (remove from business expense).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Drawings</td><td class="p-2 border border-border text-right font-mono">800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Insurance</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">800</td></tr></tbody></table>`,
        mistakes: ["Leaving the private expense in the business accounts — overstates expenses"]
      },
      {
        title: "Step 2 — Effect",
        marks: 2,
        explain: "Insurance in P&L reduces by €800 (NP increases). Drawings increase by €800 (Capital reduces).",
        content: `<p class="text-sm"><strong>P&L:</strong> Insurance = 6,200 − 800 = €5,400</p><p class="text-sm"><strong>BS:</strong> Drawings increase by €800</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-factory-oh-split",
    type: "Manufacturing",
    name: "Factory Overhead Allocation (Split)",
    year: 2024,
    source: "Manufacturing",
    totalMarks: 4,
    category: "manufacturing",
    desc: "Shared expenses must be split between factory (Manufacturing A/C) and general (P&L).",
    partSummary: ["Apply split ratio","Allocate to accounts"],
    question: `<p>Light & Heat (€18,000) and Insurance (€12,000) are to be apportioned: <strong>Factory 60%, General 40%</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Split",
        marks: 2,
        explain: "Light & Heat: Factory = 18,000 × 60% = €10,800, General = €7,200. Insurance: Factory = 12,000 × 60% = €7,200, General = €4,800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Expense</th><th class="p-2 border border-border text-right">Total</th><th class="p-2 border border-border text-right">Factory (60%)</th><th class="p-2 border border-border text-right">General (40%)</th></tr></thead><tbody><tr><td class="p-2 border border-border">Light & Heat</td><td class="p-2 border border-border text-right font-mono">18,000</td><td class="p-2 border border-border text-right font-mono">10,800</td><td class="p-2 border border-border text-right font-mono">7,200</td></tr><tr><td class="p-2 border border-border">Insurance</td><td class="p-2 border border-border text-right font-mono">12,000</td><td class="p-2 border border-border text-right font-mono">7,200</td><td class="p-2 border border-border text-right font-mono">4,800</td></tr></tbody></table>`,
        mistakes: ["Putting all of a shared expense in one account"]
      },
      {
        title: "Step 2 — Destination",
        marks: 2,
        explain: "Factory portion → Manufacturing Account (Factory Overheads). General portion → P&L (Admin Expenses).",
        content: `<p class="text-sm"><strong>Manufacturing A/C — Factory O/H:</strong> L&H €10,800 + Insurance €7,200 = €18,000</p><p class="text-sm"><strong>P&L — Admin:</strong> L&H €7,200 + Insurance €4,800 = €12,000</p>`,
        mistakes: ["Not splitting wages — if question mentions factory wages vs office wages, these also need splitting"]
      }
    ]
  },
  {
    id: "q1-wip",
    type: "Manufacturing",
    name: "Work in Progress (WIP) Adjustment",
    year: 2024,
    source: "Manufacturing",
    totalMarks: 4,
    category: "manufacturing",
    desc: "Opening and closing WIP adjustment in the Manufacturing Account.",
    partSummary: ["Opening WIP","Closing WIP"],
    question: `<p>Opening WIP: <strong>€14,000</strong>. Closing WIP: <strong>€16,500</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — WIP in Manufacturing Account",
        marks: 2,
        explain: "After Prime Cost + Factory Overheads = Total Factory Cost. Then adjust for WIP: Add Opening WIP, Less Closing WIP. This gives Cost of Goods Manufactured.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Total Factory Cost</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border">Add: Opening WIP</td><td class="p-2 border border-border text-right font-mono">14,000</td></tr><tr><td class="p-2 border border-border">Less: Closing WIP</td><td class="p-2 border border-border text-right font-mono">(16,500)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Cost of Goods Manufactured</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr></tbody></table>`,
        mistakes: ["Putting WIP in the Trading Account — it belongs in Manufacturing Account only"]
      },
      {
        title: "Step 2 — BS Treatment",
        marks: 2,
        explain: "Closing WIP (€16,500) appears as a Current Asset on the Balance Sheet, separate from finished goods stock.",
        content: `<p class="text-sm"><strong>BS — Current Assets:</strong> Work in Progress = <strong>€16,500</strong></p><p class="text-sm">This is separate from Finished Goods stock.</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-rent-receivable",
    type: "Universal",
    name: "Rent Receivable (Income with Prepaid)",
    year: 2024,
    source: "Common",
    totalMarks: 4,
    category: "universal",
    desc: "Rental income received includes an amount relating to the next year — income in advance.",
    partSummary: ["Calculate current year income","Record prepaid income"],
    question: `<p>Rent received per TB: <strong>€9,600</strong>. This includes <strong>€2,400</strong> received in advance for January–March next year.</p>`,
    steps: [
      {
        title: "Step 1 — Adjust Income",
        marks: 2,
        explain: "Rent for this year only = 9,600 − 2,400 = €7,200. The €2,400 is income received in advance (a liability).",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Rent received (TB)</td><td class="p-2 border border-border text-right font-mono">9,600</td></tr><tr><td class="p-2 border border-border">Less: Received in advance</td><td class="p-2 border border-border text-right font-mono">(2,400)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Current year rent income</td><td class="p-2 border border-border text-right font-mono">7,200</td></tr></tbody></table>`,
        mistakes: ["Showing the full €9,600 as income for the year"]
      },
      {
        title: "Step 2 — P&L and BS",
        marks: 2,
        explain: "P&L: Rent received = €7,200 (Income). BS: Rent received in advance = €2,400 (Current Liability).",
        content: `<p class="text-sm"><strong>P&L — Income:</strong> Rent received = €7,200</p><p class="text-sm"><strong>BS — CL:</strong> Rent received in advance = €2,400</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-bank-recon",
    type: "Universal",
    name: "Bank Reconciliation in Q1",
    year: 2024,
    source: "ADJ (viii)",
    totalMarks: 4,
    category: "universal",
    desc: "Standing order or direct debit not recorded in cash book — adjust the bank balance.",
    partSummary: ["Identify unrecorded items","Adjust bank"],
    question: `<p>The bank statement shows a standing order of <strong>€250/month</strong> for insurance for 3 months (Oct–Dec) that has not been recorded in the books.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Amount",
        marks: 2,
        explain: "Standing order: €250 × 3 months = €750. This has been paid by the bank but not recorded in the books.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Monthly standing order</td><td class="p-2 border border-border text-right font-mono">250</td></tr><tr><td class="p-2 border border-border">Months unrecorded</td><td class="p-2 border border-border text-right">3</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Total unrecorded</td><td class="p-2 border border-border text-right font-mono">750</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Double Entry",
        marks: 2,
        explain: "Debit Insurance (P&L) €750. Credit Bank €750. This reduces the bank balance and increases the expense.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Insurance (P&L)</td><td class="p-2 border border-border text-right font-mono">750</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">750</td></tr></tbody></table>`,
        mistakes: ["Only adjusting the bank without recording the expense"]
      }
    ]
  },
  {
    id: "q1-revaluation-soy",
    type: "Universal",
    name: "Revaluation of Buildings (Start of Year)",
    year: 2024,
    source: "Variant",
    totalMarks: 6,
    category: "universal",
    desc: "Buildings revalued at start of year — depreciation must be charged on new value for the full year.",
    partSummary: ["Revaluation entry","Depreciation on new value","BS impact"],
    question: `<p>Buildings (cost €200,000, acc. dep €30,000) were revalued to <strong>€250,000</strong> at the <strong>start of the year</strong>. Depreciate at 2% of value per annum.</p>`,
    steps: [
      {
        title: "Step 1 — Revaluation",
        marks: 2,
        explain: "NBV = 200,000 − 30,000 = €170,000. Surplus = 250,000 − 170,000 = €80,000 → Revaluation Reserve.",
        content: `<p class="text-sm">NBV = €170,000. Revalued to €250,000. Surplus = <strong>€80,000</strong> → Revaluation Reserve.</p>`,
        mistakes: []
      },
      {
        title: "Step 2 — Depreciation on New Value",
        marks: 2,
        explain: "Since revalued at START of year, charge full year depreciation on new value: 250,000 × 2% = €5,000.",
        content: `<p class="text-sm"><strong>Depreciation:</strong> 250,000 × 2% = <strong>€5,000</strong> (P&L — Admin)</p><p class="text-sm"><strong>Buildings NBV:</strong> 250,000 − 5,000 = <strong>€245,000</strong></p>`,
        mistakes: ["Using old cost for depreciation","Not charging depreciation because of revaluation"]
      },
      {
        title: "Step 3 — Summary",
        marks: 2,
        explain: "BS: Buildings = €245,000 (250,000 − 5,000). Revaluation Reserve = €80,000. P&L: Depreciation = €5,000.",
        content: `<p class="text-sm"><strong>Fixed Assets:</strong> Buildings = €245,000</p><p class="text-sm"><strong>Capital & Reserves:</strong> Revaluation Reserve = €80,000</p><p class="text-sm"><strong>P&L:</strong> Depreciation — Buildings = €5,000</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-vat-fixed-asset",
    type: "Universal",
    name: "VAT on Fixed Asset Purchase",
    year: 2024,
    source: "ADJ (viii)",
    totalMarks: 4,
    category: "universal",
    desc: "VAT paid on a fixed asset purchase is reclaimable — must be separated from cost.",
    partSummary: ["Separate VAT","Adjust fixed asset cost"],
    question: `<p>Equipment costing <strong>€12,300 (VAT inclusive at 23%)</strong> was purchased. The full amount was debited to Equipment account.</p>`,
    steps: [
      {
        title: "Step 1 — Separate VAT",
        marks: 2,
        explain: "VAT = 12,300 × 23/123 = €2,300. Net cost = 12,300 − 2,300 = €10,000. The VAT is reclaimable.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Inclusive amount</td><td class="p-2 border border-border text-right font-mono">12,300</td></tr><tr><td class="p-2 border border-border">VAT (23/123)</td><td class="p-2 border border-border text-right font-mono">2,300</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net cost</td><td class="p-2 border border-border text-right font-mono">10,000</td></tr></tbody></table>`,
        mistakes: ["Depreciating on the VAT-inclusive figure"]
      },
      {
        title: "Step 2 — Adjust",
        marks: 2,
        explain: "Credit Equipment €2,300 (remove VAT from cost). Debit VAT €2,300 (reclaimable). Equipment now at correct cost of €10,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">VAT (refundable)</td><td class="p-2 border border-border text-right font-mono">2,300</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Equipment</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">2,300</td></tr></tbody></table>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-creditor-discount",
    type: "Universal",
    name: "Creditor Settlement / Discount",
    year: 2024,
    source: "ADJ (ix.3)",
    totalMarks: 4,
    category: "universal",
    desc: "A creditor accepted a reduced amount in full settlement. Record the discount received.",
    partSummary: ["Record settlement","Discount received"],
    question: `<p>A creditor owed <strong>€5,000</strong> accepted <strong>€4,600</strong> in full settlement.</p>`,
    steps: [
      {
        title: "Step 1 — Record Settlement",
        marks: 2,
        explain: "Pay €4,600 (Credit Bank). Clear the full €5,000 creditor (Debit Creditors). Difference of €400 = Discount Received (Credit P&L).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border text-right font-mono">5,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">4,600</td></tr><tr><td class="p-2 border border-border">Discount Received (P&L — Income)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">400</td></tr></tbody></table>`,
        mistakes: ["Confusing discount received (income) with discount allowed (expense)"]
      },
      {
        title: "Step 2 — Effect",
        marks: 2,
        explain: "P&L: Discount Received = €400 (Income). BS: Creditors decrease by €5,000. Bank decreases by €4,600.",
        content: `<p class="text-sm"><strong>P&L — Income:</strong> Discount received = €400</p><p class="text-sm"><strong>BS:</strong> Creditors ↓ €5,000, Bank ↓ €4,600</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-investment-midyear",
    type: "Company",
    name: "Investment Income (Mid-Year Acquisition)",
    year: 2024,
    source: "Company",
    totalMarks: 4,
    category: "company",
    desc: "Investments purchased mid-year — only apportion income from date of acquisition.",
    partSummary: ["Calculate income due","Record accrual"],
    question: `<p>Investments of <strong>€80,000</strong> (earning 5% p.a.) were purchased on <strong>1/07/2024</strong>. No income has been recorded.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Investment Income Due",
        marks: 2,
        explain: "80,000 × 5% = €4,000/year. From 1/07 to 31/12 = 6 months. Income due = 4,000 × 6/12 = €2,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Investment</td><td class="p-2 border border-border text-right font-mono">80,000</td></tr><tr><td class="p-2 border border-border">Rate</td><td class="p-2 border border-border text-right">5%</td></tr><tr><td class="p-2 border border-border">Period</td><td class="p-2 border border-border text-right">6 months</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Income due</td><td class="p-2 border border-border text-right font-mono">2,000</td></tr></tbody></table>`,
        mistakes: ["Calculating a full year of income"]
      },
      {
        title: "Step 2 — Record",
        marks: 2,
        explain: "Debit Investment Income Due (BS — CA) €2,000. Credit Investment Income (P&L — Income) €2,000.",
        content: `<p class="text-sm"><strong>P&L — Income:</strong> Investment Income = €2,000</p><p class="text-sm"><strong>BS — CA:</strong> Investment Income Due = €2,000</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-store-own-employees",
    type: "Manufacturing",
    name: "Store Built by Own Employees",
    year: 2024,
    source: "ADJ (vii)",
    totalMarks: 4,
    category: "manufacturing",
    desc: "Factory employees built a store — capitalise the labour cost as a fixed asset.",
    partSummary: ["Capitalise labour","Adjust Manufacturing A/C"],
    question: `<p>Factory employees spent 2 weeks building a new storage area. The cost of their wages for this period was <strong>€8,400</strong>. This was included in factory wages.</p>`,
    steps: [
      {
        title: "Step 1 — Capitalise the Wages",
        marks: 2,
        explain: "€8,400 of factory wages relates to building a fixed asset, not production. Remove from Manufacturing Account and capitalise.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Buildings / Premises (BS — FA)</td><td class="p-2 border border-border text-right font-mono">8,400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Factory Wages (Manufacturing A/C)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">8,400</td></tr></tbody></table>`,
        mistakes: ["Leaving the wages in the Manufacturing Account — this overstates cost of production"]
      },
      {
        title: "Step 2 — Effect",
        marks: 2,
        explain: "Manufacturing Account: Direct Labour reduced by €8,400 → lower Cost of Production → lower Cost of Sales → higher GP. BS: Fixed Assets increase by €8,400.",
        content: `<p class="text-sm"><strong>Mfg A/C:</strong> Direct Labour reduced by €8,400</p><p class="text-sm"><strong>BS — Fixed Assets:</strong> Buildings/Premises increases by €8,400</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-fire-damage",
    type: "Company",
    name: "Fire Damage & Insurance Compensation",
    year: 2023,
    source: "ADJ",
    totalMarks: 4,
    category: "company",
    desc: "Stock destroyed by fire, insurance compensation received. Record loss and recovery.",
    partSummary: ["Stock write-off","Insurance claim"],
    question: `<p>Stock costing <strong>€12,000</strong> was destroyed by fire. The insurance company has agreed to pay <strong>€10,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Remove Destroyed Stock",
        marks: 2,
        explain: "Reduce closing stock by €12,000 (or don't include it if not yet counted). The uninsured loss = 12,000 − 10,000 = €2,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Stock destroyed</td><td class="p-2 border border-border text-right font-mono">12,000</td></tr><tr><td class="p-2 border border-border">Insurance compensation</td><td class="p-2 border border-border text-right font-mono">10,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Uninsured loss</td><td class="p-2 border border-border text-right font-mono">2,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Entries",
        marks: 2,
        explain: "Debit Insurance Claim Due (BS — CA) €10,000. Debit Loss by Fire (P&L) €2,000. Credit Closing Stock (or Trading A/C) €12,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Insurance Claim Due (BS — CA)</td><td class="p-2 border border-border text-right font-mono">10,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Loss by Fire (P&L)</td><td class="p-2 border border-border text-right font-mono">2,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Stock / Trading A/C</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">12,000</td></tr></tbody></table>`,
        mistakes: ["Crediting the full €12,000 to P&L instead of splitting between insurance claim and loss"]
      }
    ]
  },
  {
    id: "q1-bonus-commission",
    type: "Universal",
    name: "Bonus Sales Commission",
    year: 2023,
    source: "ADJ (xii)",
    totalMarks: 6,
    category: "universal",
    desc: "Sales commission calculated as a percentage of sales, accrued at year end.",
    partSummary: ["Calculate commission","Record accrual","P&L placement"],
    question: `<p>Sales staff earn a <strong>3% commission</strong> on sales. Total sales = <strong>€850,000</strong>. Commission already paid and recorded: <strong>€20,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate Total Commission",
        marks: 2,
        explain: "Total commission = 850,000 × 3% = €25,500. Already paid = €20,000. Amount due (accrual) = €5,500.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Total commission (3% × 850,000)</td><td class="p-2 border border-border text-right font-mono">25,500</td></tr><tr><td class="p-2 border border-border">Already paid</td><td class="p-2 border border-border text-right font-mono">(20,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Accrual due</td><td class="p-2 border border-border text-right font-mono">5,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Record Accrual",
        marks: 2,
        explain: "Debit Commission (P&L — S&D) €5,500. Credit Accruals (BS — CL) €5,500.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Commission (P&L — S&D)</td><td class="p-2 border border-border text-right font-mono">5,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Accruals (BS — CL)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">5,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — P&L Placement",
        marks: 2,
        explain: "Commission goes under Selling & Distribution expenses. Total commission in P&L = €25,500 (20,000 paid + 5,500 accrued).",
        content: `<p class="text-sm"><strong>P&L — Selling & Distribution:</strong> Commission = <strong>€25,500</strong></p><p class="text-sm"><strong>BS — CL:</strong> Accrued commission = <strong>€5,500</strong></p>`,
        mistakes: ["Putting sales commission under Admin instead of S&D"]
      }
    ]
  },
  {
    id: "q1-rent-prepaid-miscalc",
    type: "Universal",
    name: "Rent Prepaid Miscalculation",
    year: 2023,
    source: "ADJ (iii)",
    totalMarks: 6,
    category: "universal",
    desc: "Rent was prepaid but the wrong amount was calculated. Fix the prepayment figure.",
    partSummary: ["Correct prepayment","Adjust P&L","BS impact"],
    question: `<p>Rent of <strong>€24,000</strong> per annum is paid quarterly in advance. The TB shows rent of <strong>€30,000</strong>. The accountant incorrectly calculated the prepayment as €3,000 instead of <strong>€6,000</strong>.</p>`,
    steps: [
      {
        title: "Step 1 — Find Correct Figures",
        marks: 2,
        explain: "Annual rent = €24,000. TB shows €30,000 paid (5 quarters). Prepaid = 30,000 − 24,000 = €6,000 (one quarter in advance). The accountant had only €3,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Rent paid (TB)</td><td class="p-2 border border-border text-right font-mono">30,000</td></tr><tr><td class="p-2 border border-border">Current year charge</td><td class="p-2 border border-border text-right font-mono">24,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Correct prepayment</td><td class="p-2 border border-border text-right font-mono">6,000</td></tr><tr><td class="p-2 border border-border">Previously calculated</td><td class="p-2 border border-border text-right font-mono">3,000</td></tr><tr><td class="p-2 border border-border">Additional prepaid needed</td><td class="p-2 border border-border text-right font-mono">3,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Correct the Entry",
        marks: 2,
        explain: "Debit Prepayments (BS — CA) €3,000 (increase). Credit Rent (P&L) €3,000 (reduce expense).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Prepaid Rent (BS — CA)</td><td class="p-2 border border-border text-right font-mono">3,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Rent (P&L)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — Final Figures",
        marks: 2,
        explain: "P&L: Rent = €24,000 (correct annual charge). BS: Prepaid Rent = €6,000 (Current Asset).",
        content: `<p class="text-sm"><strong>P&L — Admin:</strong> Rent = <strong>€24,000</strong></p><p class="text-sm"><strong>BS — CA:</strong> Prepaid Rent = <strong>€6,000</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-wages-backdated",
    type: "Manufacturing",
    name: "Wages Backdated (Pay Increase)",
    year: 2024,
    source: "ADJ (vi)",
    totalMarks: 8,
    category: "manufacturing",
    desc: "A wage increase backdated several months — calculate arrears and adjust factory wages, accounting for extension labour that already includes the increase.",
    partSummary: ["Calculate backdated increase","Adjust for extension labour","Record entries & destinations"],
    question: `<p><strong>Provide for a recent wage increase of 6%</strong> which has been agreed with the trade unions and is to be backdated to cover the four months from 01/09/2023.</p><p><em>From 2024 Mock (Dillon Manufacturing Ltd)</em><br>Direct factory wages per TB: €125,000. During 2023, an extension was added to the factory by the company's own employees. The cost of the labour was €24,000 (<strong>which includes the recent wage increase</strong>).</p>`,
    steps: [
      {
        title: "Step 1 — Calculate the Backdated Increase",
        marks: 3,
        explain: "The TB wages (€125,000) are at the OLD rate for the full year. The 6% increase applies for 4 months (Sep–Dec). Backdated wages = 125,000 × 6% × 4/12 = €2,500.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Wages Backdated Calculation</th></tr></thead><tbody><tr><td class="p-2 border border-border">TB factory wages</td><td class="p-2 border border-border text-right font-mono">125,000</td></tr><tr><td class="p-2 border border-border">Increase: 125,000 × 6% × 4/12</td><td class="p-2 border border-border text-right font-mono font-bold text-green-700 dark:text-green-400">2,500</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted factory wages → Mfg A/C</td><td class="p-2 border border-border text-right font-mono">127,500</td></tr></tbody></table>`,
        mistakes: ["Using the wrong number of months — it's 4 months (Sep–Dec), not 6"]
      },
      {
        title: "Step 2 — Extension Labour Already Includes the Increase",
        marks: 3,
        explain: "The question says the €24,000 extension labour \"includes the recent wage increase.\" This means you do NOT add a backdated amount on top of the €24,000 — it's already at the new rate. Capitalise the full €24,000 to Buildings.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Factory Wages A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">TB wages: 125,000</td><td class="p-2 border border-border">Capitalised to Buildings (extension): <strong>24,000</strong></td></tr><tr><td class="p-2 border border-border font-bold text-green-700 dark:text-green-400">Backdated increase: 2,500</td><td class="p-2 border border-border">Manufacturing Account (balance): 103,500</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">127,500</td><td class="p-2 border border-border">127,500</td></tr></tbody></table>`,
        mistakes: ["Adding a backdated amount on top of €24,000 extension labour — it already includes the increase", "Forgetting to capitalise the extension labour to Buildings"]
      },
      {
        title: "Step 3 — Destinations & Trap",
        marks: 2,
        explain: "Factory wages (125,000 + 2,500 − 24,000 = 103,500) → Manufacturing Account. Buildings cost increases by €24,000. Wages due (€2,500) → Current Liability on Balance Sheet.",
        content: `<p class="text-sm"><strong>Mfg A/C:</strong> Factory wages = 125,000 + 2,500 − 24,000 = <strong>€103,500</strong></p><p class="text-sm"><strong>BS — Fixed Assets:</strong> Buildings cost increased by <strong>+€24,000</strong></p><p class="text-sm"><strong>BS — CL:</strong> Wages due (accrual) = <strong>€2,500</strong></p><p class="text-sm text-red-600 dark:text-red-400 mt-3 font-medium"><strong>TRAP:</strong> The backdated wages (€2,500) are owed but not yet paid = Current Liability. If the extension labour did NOT include the increase, you'd need to add 6% × 4/12 of the extension wages too. Read the question wording carefully — "which includes" vs "which does not include" changes the answer.</p>`,
        mistakes: ["Forgetting to show wages due as a current liability on BS"]
      }
    ]
  },
  {
    id: "q1-dishonoured-cheque",
    type: "Universal",
    name: "Dishonoured Cheque — Debtor Bankrupt",
    year: 2023,
    source: "ADJ (ix)",
    totalMarks: 8,
    category: "universal",
    desc: "A cheque received from a debtor bounced and the debtor has gone bankrupt. Write off as bad debt.",
    partSummary: ["Reverse cheque","Reinstate debtor","Write off","Provision impact"],
    question: `<p>A cheque for <strong>€3,600</strong> received from T. Ryan was dishonoured. T. Ryan has since <strong>gone bankrupt</strong> and the debt is now irrecoverable.</p>`,
    steps: [
      {
        title: "Step 1 — Reverse the Cheque",
        marks: 2,
        explain: "The cheque was received and credited to bank. Now it bounced, so: Debit Debtors €3,600 (reinstate the debt). Credit Bank €3,600 (remove from bank).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Debtors (T. Ryan)</td><td class="p-2 border border-border text-right font-mono">3,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,600</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Write Off as Bad Debt",
        marks: 2,
        explain: "Since Ryan is bankrupt, immediately write off: Debit Bad Debts (P&L). Credit Debtors.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bad Debts (P&L — S&D)</td><td class="p-2 border border-border text-right font-mono">3,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Debtors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,600</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — Net Effect on Bank and Debtors",
        marks: 2,
        explain: "Bank decreases by €3,600. Debtors: +3,600 (reinstate) − 3,600 (write off) = no net change. Bad debts expense increases by €3,600.",
        content: `<p class="text-sm"><strong>Net Effect:</strong></p><p class="text-sm">Bank ↓ €3,600</p><p class="text-sm">Debtors: unchanged (reinstated then written off)</p><p class="text-sm">P&L — S&D: Bad debts ↑ €3,600</p>`,
        mistakes: []
      },
      {
        title: "Step 4 — Provision Impact",
        marks: 2,
        explain: "If there's a provision for bad debts, remember that debtors figure has changed (bank reduced but debtors net same). Recalculate provision on adjusted debtors. The provision may decrease slightly.",
        content: `<p class="text-sm">Recalculate provision for bad debts on the new adjusted debtors figure. If provision decreases, the decrease is income in P&L (reduces the bad debt charge slightly).</p>`,
        mistakes: ["Forgetting to recalculate the provision after writing off a bad debt"]
      }
    ]
  },
  {
    id: "q1-equipment-debt-settlement",
    type: "Universal",
    name: "Equipment Given as Debt Settlement",
    year: 2023,
    source: "ADJ (xi)",
    totalMarks: 8,
    category: "universal",
    desc: "Owner gave business equipment to a creditor to settle a debt. Record disposal and debt clearance.",
    partSummary: ["Remove asset","Clear creditor","Disposal account","P&L impact"],
    question: `<p>Equipment (cost <strong>€8,000</strong>, acc. dep <strong>€5,000</strong>) was given to a creditor to settle a debt of <strong>€4,000</strong>. Not yet recorded.</p>`,
    steps: [
      {
        title: "Step 1 — Disposal Account",
        marks: 3,
        explain: "NBV = 8,000 − 5,000 = €3,000. Equipment exchanged for €4,000 debt settlement (treated as proceeds). Profit = 4,000 − 3,000 = €1,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Equipment A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 8,000</td><td class="p-2 border border-border">Acc. Dep: 5,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Creditors (settlement): 4,000</td></tr><tr><td class="p-2 border border-border font-bold text-green-600">Profit: 1,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Clear the Creditor",
        marks: 2,
        explain: "Debit Creditors €4,000 (debt settled). No bank entry needed — payment was by asset transfer.",
        content: `<p class="text-sm"><strong>Creditors</strong> reduced by €4,000 (debt fully settled by giving the equipment)</p>`,
        mistakes: ["Recording a bank payment — no cash was exchanged"]
      },
      {
        title: "Step 3 — Remove Asset from BS",
        marks: 1,
        explain: "Remove equipment cost (€8,000) and its accumulated depreciation (€5,000) from the BS.",
        content: `<p class="text-sm"><strong>Fixed Assets:</strong> Equipment Cost ↓ €8,000, Acc. Dep ↓ €5,000</p>`,
        mistakes: []
      },
      {
        title: "Step 4 — P&L Impact",
        marks: 2,
        explain: "Profit on disposal = €1,000 appears as income in P&L.",
        content: `<p class="text-sm"><strong>P&L — Income:</strong> Profit on disposal of equipment = <strong>€1,000</strong></p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-bank-recon-transposition",
    type: "Universal",
    name: "Bank Reconciliation — Transposition & Credit Errors",
    year: 2023,
    source: "ADJ (ix)",
    totalMarks: 8,
    category: "universal",
    desc: "Bank statement shows transposition error in a lodgement and a credit transfer not recorded in the books.",
    partSummary: ["Identify transposition","Credit transfer","Adjusted bank","Cashbook correction"],
    question: `<p>The bank statement shows a lodgement of <strong>€5,430</strong> but the cashbook recorded it as <strong>€5,340</strong> (transposition error). A credit transfer of <strong>€1,200</strong> from a debtor appears on the statement but is not in the cashbook.</p>`,
    steps: [
      {
        title: "Step 1 — Transposition Error",
        marks: 2,
        explain: "Cashbook recorded €5,340 instead of €5,430. Difference = €90. The cashbook is understated. Debit Bank (cashbook) €90.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Bank statement</td><td class="p-2 border border-border text-right font-mono">5,430</td></tr><tr><td class="p-2 border border-border">Cashbook</td><td class="p-2 border border-border text-right font-mono">5,340</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Correction needed (Debit Bank)</td><td class="p-2 border border-border text-right font-mono">90</td></tr></tbody></table>`,
        mistakes: ["Adjusting the bank statement side — transposition in cashbook means fix the cashbook"]
      },
      {
        title: "Step 2 — Credit Transfer",
        marks: 2,
        explain: "Credit transfer = debtor paid directly into bank. Bank has it, cashbook doesn't. Debit Bank €1,200, Credit Debtors €1,200.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border text-right font-mono">1,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Debtors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — Effect on Cashbook",
        marks: 2,
        explain: "Both corrections increase the cashbook bank balance by €1,290 (90 + 1,200). Debtors decrease by €1,200.",
        content: `<p class="text-sm"><strong>Bank (cashbook):</strong> increases by €1,290</p><p class="text-sm"><strong>Debtors:</strong> decreases by €1,200</p>`,
        mistakes: []
      },
      {
        title: "Step 4 — Reconciliation Statement",
        marks: 2,
        explain: "After correcting the cashbook, prepare a Bank Reconciliation Statement starting with the adjusted cashbook balance to match the bank statement.",
        content: `<p class="text-sm">Bank Reconciliation starts with <strong>adjusted cashbook balance</strong>, then adjust for unpresented cheques (subtract) and lodgements not yet credited (add) to reach the bank statement balance.</p>`,
        mistakes: ["Mixing up which items go in the cashbook correction vs the reconciliation statement"]
      }
    ]
  },
  {
    id: "q1-machine-disposal-omitted",
    type: "Manufacturing",
    name: "Machine Disposal Completely Omitted",
    year: 2022,
    source: "ADJ (vii)",
    totalMarks: 8,
    category: "manufacturing",
    desc: "A factory machine was sold but no entries were made. Record the full disposal from scratch.",
    partSummary: ["Calculate NBV","Record disposal","Remove from books","P&L impact"],
    question: `<p>A factory machine (cost <strong>€60,000</strong>) was sold for <strong>€18,000</strong>. It had been depreciated at 20% reducing balance for <strong>3 years</strong>. No entries have been made for the sale.</p>`,
    steps: [
      {
        title: "Step 1 — Calculate NBV (Reducing Balance)",
        marks: 3,
        explain: "Year 1: 60,000 × 20% = 12,000, NBV = 48,000. Year 2: 48,000 × 20% = 9,600, NBV = 38,400. Year 3: 38,400 × 20% = 7,680, NBV = 30,720. Acc Dep = 60,000 − 30,720 = 29,280.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Year</th><th class="p-2 border border-border text-right">Opening NBV</th><th class="p-2 border border-border text-right">Dep (20%)</th><th class="p-2 border border-border text-right">Closing NBV</th></tr></thead><tbody><tr><td class="p-2 border border-border">1</td><td class="p-2 border border-border text-right font-mono">60,000</td><td class="p-2 border border-border text-right font-mono">12,000</td><td class="p-2 border border-border text-right font-mono">48,000</td></tr><tr><td class="p-2 border border-border">2</td><td class="p-2 border border-border text-right font-mono">48,000</td><td class="p-2 border border-border text-right font-mono">9,600</td><td class="p-2 border border-border text-right font-mono">38,400</td></tr><tr><td class="p-2 border border-border">3</td><td class="p-2 border border-border text-right font-mono">38,400</td><td class="p-2 border border-border text-right font-mono">7,680</td><td class="p-2 border border-border text-right font-mono">30,720</td></tr></tbody></table>`,
        mistakes: ["Using straight line instead of reducing balance","Depreciating on cost each year instead of NBV"]
      },
      {
        title: "Step 2 — Disposal Account",
        marks: 2,
        explain: "NBV = €30,720. Sold for €18,000. Loss on disposal = 30,720 − 18,000 = €12,720.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Machine A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 60,000</td><td class="p-2 border border-border">Acc. Dep: 29,280</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Bank (proceeds): 18,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold text-red-600">Loss: 12,720</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">60,000</td><td class="p-2 border border-border">60,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3 — Entries Required",
        marks: 2,
        explain: "Since nothing was recorded: Debit Bank €18,000 (proceeds). Credit Machinery €60,000. Debit Acc Dep €29,280. Debit Loss on Disposal €12,720 (P&L).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border text-right font-mono">18,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Acc. Dep — Machinery</td><td class="p-2 border border-border text-right font-mono">29,280</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Loss on Disposal (P&L)</td><td class="p-2 border border-border text-right font-mono">12,720</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Machinery (Cost)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">60,000</td></tr></tbody></table>`,
        mistakes: ["Forgetting to record the bank receipt"]
      },
      {
        title: "Step 4 — P&L Placement",
        marks: 1,
        explain: "Loss on disposal of factory machine = €12,720. Goes to P&L as an expense (NOT Manufacturing Account — profits/losses on disposal always go to P&L).",
        content: `<p class="text-sm"><strong>P&L — Expenses:</strong> Loss on disposal = €12,720</p><p class="text-sm"><strong>BS:</strong> Machinery cost ↓ €60,000, Acc Dep ↓ €29,280, Bank ↑ €18,000</p>`,
        mistakes: ["Putting loss on disposal in Manufacturing Account — it goes to P&L"]
      }
    ]
  },
  {
    id: "q1-stock-fire-insurance",
    type: "Universal",
    name: "Stock Destroyed by Fire + Insurance Claim",
    year: 2022,
    source: "ADJ (v)/(x)",
    totalMarks: 6,
    category: "universal",
    desc: "Stock destroyed by fire with partial insurance compensation. Split between insured and uninsured loss.",
    partSummary: ["Remove from stock","Insurance claim","Uninsured loss"],
    question: `<p>Stock costing <strong>€8,500</strong> was destroyed by fire on 20/12/2024. The insurance company agreed to pay <strong>€6,000</strong>. The destroyed stock was <strong>included</strong> in the closing stock figure of €45,000.</p>`,
    steps: [
      {
        title: "Step 1 — Remove Destroyed Stock",
        marks: 2,
        explain: "Reduce closing stock by €8,500: new closing stock = 45,000 − 8,500 = €36,500.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Closing stock (per count)</td><td class="p-2 border border-border text-right font-mono">45,000</td></tr><tr><td class="p-2 border border-border">Less: Destroyed stock</td><td class="p-2 border border-border text-right font-mono">(8,500)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Adjusted closing stock</td><td class="p-2 border border-border text-right font-mono">36,500</td></tr></tbody></table>`,
        mistakes: ["Not removing from closing stock if it was already excluded from the count"]
      },
      {
        title: "Step 2 — Split Insured vs Uninsured",
        marks: 2,
        explain: "Insurance claim = €6,000 (Debtor — Current Asset). Uninsured loss = 8,500 − 6,000 = €2,500 (P&L expense).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Insurance Claim Due (BS — CA)</td><td class="p-2 border border-border text-right font-mono">6,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Loss by Fire (P&L)</td><td class="p-2 border border-border text-right font-mono">2,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Stock (Trading A/C)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">8,500</td></tr></tbody></table>`,
        mistakes: ["Charging the full €8,500 to P&L and ignoring the insurance"]
      },
      {
        title: "Step 3 — Summary",
        marks: 2,
        explain: "Trading: Closing stock = €36,500. P&L: Loss by fire = €2,500. BS: Insurance claim due = €6,000 (CA). Stock = €36,500 (CA).",
        content: `<p class="text-sm"><strong>Trading:</strong> Closing stock = €36,500</p><p class="text-sm"><strong>P&L:</strong> Loss by fire = €2,500</p><p class="text-sm"><strong>BS — CA:</strong> Insurance claim = €6,000</p>`,
        mistakes: []
      }
    ]
  },
  {
    id: "q1-private-debt-offset",
    type: "Universal",
    name: "Private Debt Offset Against Business Debt",
    year: 2022,
    source: "ADJ (i)",
    totalMarks: 6,
    category: "universal",
    desc: "A business creditor owed money personally to the owner. The debts are offset against each other.",
    partSummary: ["Understand the offset","Double entry","BS impact"],
    question: `<p>T. Walsh is a creditor of the business for <strong>€3,500</strong>. Walsh owes the owner <strong>€1,500</strong> personally. It was agreed to offset the personal debt against the business debt.</p>`,
    steps: [
      {
        title: "Step 1 — Understand the Offset",
        marks: 2,
        explain: "Business owes Walsh €3,500 (creditor). Walsh owes the owner €1,500 privately. The €1,500 private debt is set against the business debt. Net creditor = 3,500 − 1,500 = €2,000.",
        content: `<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Business debt to Walsh</td><td class="p-2 border border-border text-right font-mono">3,500</td></tr><tr><td class="p-2 border border-border">Walsh's private debt to owner</td><td class="p-2 border border-border text-right font-mono">(1,500)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net creditor balance</td><td class="p-2 border border-border text-right font-mono">2,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2 — Double Entry",
        marks: 2,
        explain: "Debit Creditors €1,500 (reduce business debt). Credit Drawings €1,500 (owner used private money to reduce business liability — reverse of drawings).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border text-right font-mono">1,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Drawings (or Capital introduced)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,500</td></tr></tbody></table>`,
        mistakes: ["Debiting the P&L — this is a BS-only adjustment, no P&L impact"]
      },
      {
        title: "Step 3 — BS Impact",
        marks: 2,
        explain: "Creditors reduced by €1,500. Capital increases by €1,500 (or Drawings decreases). No P&L effect.",
        content: `<p class="text-sm"><strong>BS — CL:</strong> Creditors ↓ €1,500 (Walsh now €2,000)</p><p class="text-sm"><strong>BS — Capital:</strong> Drawings ↓ €1,500 (or capital introduced ↑ €1,500)</p><p class="text-sm"><strong>P&L:</strong> No effect</p>`,
        mistakes: []
      }
    ]
  }
];
