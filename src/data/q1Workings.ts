import type { Archetype } from "./archetypes";

export const Q1_CATEGORIES = [
  { key: "all", label: "All (37)" },
  { key: "universal", label: "Universal (26)" },
  { key: "company", label: "Company (4)" },
  { key: "manufacturing", label: "Manufacturing (7)" },
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
    desc: "Provide for depreciation on delivery vans at the annual rate of 15% of cost from the date of purchase to the date of sale.NOTE: On 30/06/2024 a delive...",
    partSummary: ["What went wrong? McConnell...", "Correct the Purchases error....", "Record new van and...", "Three-part depreciation split for..."],
    question: `<strong>Provide for depreciation on delivery vans</strong> at the annual rate of 15% of cost from the date of purchase to the date of sale.<br><br><strong>NOTE:</strong> On 30/06/2024 a delivery van, which cost €35,000 on 31/08/2022, was traded in against a new van which cost €48,000. An allowance of €23,200 was given on the old van. The cheque for the net amount was entered in the bank account but was <strong>incorrectly treated as a purchase of trading stock</strong>.<br><br><em>TB: Delivery Vans (Cost €132,000): €110,500 | Purchases: €622,400</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "What went wrong? McConnell paid €24,800 (48,000 − 23,200) by cheque for the new van. Bank was credited correctly, but Purchases was debited instead of Delivery Vans. Purchases is overstated by €24,800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Purchases A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 622,400</td><td class="p-2 border border-border"></td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Delivery Vans A/C (Cost)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 132,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Correct the Purchases error. Remove the €24,800 van cheque. Purchases corrected to €597,600. (Goods for own use €10,750 also deducted — see that working.)",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Purchases A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 622,400</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Van cheque (reverse): 24,800</td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Delivery Vans A/C (Cost)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 132,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Record new van and remove old van. Debit Vans with new van cost (€48,000). Credit Vans to remove old van at original cost (€35,000).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Delivery Vans A/C (Cost)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 132,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Old van disposed: 35,000</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">New van purchased: 48,000</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Balance c/d: 145,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Three-part depreciation split for P&L. Only the current year depreciation goes to the P&L — split by who held which van and for how long.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Depreciation Working (→ P&L)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Old van (Jan–Jun): 15% × 35,000 × 6/12: 2,625</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">New van (Jul–Dec): 15% × 48,000 × 6/12: 3,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Other vans: 15% × 97,000: 14,550</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">TOTAL → P&L: 20,775</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Disposal profit or loss. Accumulate depreciation over the old van's entire life (Aug 2022 to Jun 2024 = 22 months), then compare NBV to trade-in allowance.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Van</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost of old van: 35,000</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Acc dep (15% × 35k × 22/12): 9,625</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Trade-in allowance: 23,200</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 35,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">LOSS on disposal → P&L: 2,175</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 6",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Purchases corrected (−24,800)</span><span class="font-mono font-bold">€597,600</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Depreciation on vans</span><span class="font-mono font-bold">€20,775</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Loss on disposal</span><span class="font-mono font-bold">€2,175</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Vans at cost (132k+48k−35k)</span><span class="font-mono font-bold">€145,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Vans acc dep (21.5k+20.8k−9.6k)</span><span class="font-mono font-bold">€32,650</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N3  Purchases: 622,400 − 24,800 − 10,750 = 586,850<br>N4  Loss: 35,000 − 9,625 − 23,200 = 2,175<br>N5  Dep: 2,625 + 3,600 + 14,550 = 20,775<br>N18 Cost: 132,000 + 48,000 − 35,000 = 145,000<br>N19 AD: 21,500 + 20,775 − 9,625 = 32,650<br></div>`,
        mistakes: ["THE TRAP: The van purchase is hidden in Purchases. Miss this and your Gross Profit, P&L, AND Balance Sheet are all wrong. One error cascades into 15–20 lost marks."]
      },
    ]
  },
  {
    id: "q1-mortgage-interest",
    type: "Universal",
    name: "Mortgage/Debenture Interest & Suspense",
    year: 2025,
    source: "ADJ (v)+(ix)",
    totalMarks: 15,
    category: "universal",
    desc: "(v) The suspense figure arises as a result of the incorrect figure for mortgage interest (although the correct entry had been made in the bank account...",
    partSummary: ["Calculate the full year's...", "Find the suspense error....", "Resolve suspense into Insurance....", "Calculate amount due. Total..."],
    question: `<strong>(v)</strong> The suspense figure arises as a result of the incorrect figure for mortgage interest (although the correct entry had been made in the bank account) and a payment of €5,400 towards PAYE, PRSI & USC entered on the incorrect side of the bank account.<br><br><strong>(ix)</strong> Provision should be made for mortgage interest due.<br><br><em>TB: 6% Mortgage (incl. €70,000 received 01/06/2024): €220,000 | Mortgage int. paid first 9 months: €7,400 | Insurance (incl. suspense): €20,900</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate the full year's interest. The mortgage was €150,000 for the first 5 months, then €220,000 for the remaining 7 months.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Mortgage Interest Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Jan–May: 150,000 × 6% × 5/12: 3,750</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Jun–Dec: 220,000 × 6% × 7/12: 7,700</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">TOTAL for year → P&L: 11,450</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Find the suspense error. TB says €7,400 paid for 9 months. Correct 9-month figure: 3,750 + (220k × 6% × 4/12) = 3,750 + 4,400 = €8,150. Bank recorded €8,150 correctly but only €7,400 posted to the ledger. Difference: €750 went to suspense.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Suspense A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">PAYE wrong side (5,400 × 2): 10,800</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Mortgage error (8,150 − 7,400): 750</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Resolve suspense into Insurance. TB says \"Insurance (incorporating suspense): €20,900.\" The PAYE error adds €10,800 to insurance. The mortgage shortfall of €750 is subtracted.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Insurance A/C (Corrected)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 20,900</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Add: PAYE wrong side: 10,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Less: Mortgage error: (750)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Corrected → P&L: 30,950</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Calculate amount due. Total charge: €11,450. Bank paid €8,150 correctly. Balance = current liability.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Mortgage Interest A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Paid (correct bank figure): 8,150</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">P&L charge (full year): 11,450</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Interest due (balance): 3,300</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 11,450</td><td class="p-2 border border-border font-bold bg-muted">: 11,450</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Mortgage interest (full year)</span><span class="font-mono font-bold">€11,450</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Insurance (corrected)</span><span class="font-mono font-bold">€30,950</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Mortgage interest due (CL)</span><span class="font-mono font-bold">€3,300</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank adjusted for PAYE error</span><span class="font-mono font-bold">€40,800</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N9  Insurance: 20,900 + 10,800 − 750 = 30,950<br>N15 Mortgage: 3,750 + 7,700 = 11,450<br>N26 Due: 11,450 − 8,150 = 3,300<br>N27 Bank: 30,100 + 10,800 − 1,600 + 1,500 = 40,800<br></div>`,
        mistakes: ["THE TRAP: The suspense is hidden inside Insurance. Miss it and Insurance is understated by €10,050, mortgage interest is wrong, and the bank balance is wrong."]
      },
    ]
  },
  {
    id: "q1-revaluation-eoy",
    type: "Universal",
    name: "Revaluation of Buildings (End of Year)",
    year: 2025,
    source: "ADJ (viii)+(ix.3)",
    totalMarks: 15,
    category: "universal",
    desc: "(viii) A new warehouse was purchased for €102,150 which includes VAT at 13.5%. Amount entered in land & buildings. No VAT entry made. It was decided t...",
    partSummary: ["Step 1 — Remove...", "Step 2 — Depreciate...", "Step 3 — Revalue....", "Step 4 — Strip..."],
    question: `<strong>(viii)</strong> A new warehouse was purchased for €102,150 which includes VAT at 13.5%. Amount entered in land & buildings. No VAT entry made. It was decided to revalue the land and buildings at €1,100,000 on 31/12/2024.<br><strong>(ix.3)</strong> Depreciation on buildings at 2% of cost per annum (land at cost was €100,000).<br><br><em>TB: Land & Buildings: €870,000 | Prov. for Dep. Buildings: €95,000</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Remove VAT from building cost. The warehouse cost €102,150 incl VAT at 13.5%. VAT portion: 102,150 − (102,150 / 1.135) = €12,150. Corrected L&B cost: 870,000 − 12,150 = €857,850.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Land & Buildings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 870,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less VAT element: (12,150)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Corrected cost: 857,850</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Depreciate BEFORE revaluing. Land (€100,000) is never depreciated. Buildings: 857,850 − 100,000 = €757,850. Depreciation: 757,850 × 2% = €15,157. This goes to P&L.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Depreciation Working</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Buildings cost (excl land): 757,850</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Depreciation: × 2%: 15,157</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">New acc dep: 95,000 + 15,157: 110,157</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Revalue. Increase L&B from €857,850 to €1,100,000. The increase of €242,150 is debited to L&B and credited to Revaluation Reserve.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Land & Buildings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Corrected cost: 857,850</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Revaluation increase: 242,150</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Revalued amount: 1,100,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — Strip accumulated depreciation. ALL accumulated depreciation (€110,157) is wiped off and transferred to the Revaluation Reserve. After revaluation, acc dep = NIL.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Revaluation Reserve</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Increase in value: 242,150</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Acc dep stripped (95k + 15,157): 110,157</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted">TOTAL reserve: 352,307</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Depreciation on buildings</span><span class="font-mono font-bold">€15,157</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">L&B at revalued amount</span><span class="font-mono font-bold">€1,100,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Acc dep on buildings</span><span class="font-mono font-bold">€NIL</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Revaluation Reserve</span><span class="font-mono font-bold">€352,307</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N7  Dep: (870,000 − 12,150 − 100,000) × 2% = 15,157<br>N17 L&B: 870,000 − 12,150 + 242,150 = 1,100,000<br>N28 Reval Res: 242,150 + 95,000 + 15,157 = 352,307<br></div>`,
        mistakes: ["KEY: End-of-year revaluation means depreciate at the OLD cost first, then revalue, then strip ALL accumulated depreciation (old + new) into the reserve. If it were start-of-year, you'd strip first, revalue, then depreciate at the NEW amount."]
      },
    ]
  },
  {
    id: "q1-bad-debt-recovery",
    type: "Universal",
    name: "Bad Debt Recovery (Partial)",
    year: 2025,
    source: "ADJ (vi)",
    totalMarks: 9,
    category: "universal",
    desc: "(vi) A cheque for €1,600 had been received on 31/12/2024 in respect of a debt of €3,200 previously written off as bad. The debtor wishes to continue t...",
    partSummary: ["The full debt is...", "Update Debtors. The debtor...", "Where everything goes."],
    question: `<strong>(vi)</strong> A cheque for €1,600 had been received on 31/12/2024 in respect of a debt of €3,200 previously written off as bad. The debtor wishes to continue trading with McConnell and has agreed to pay the other half of the debt within one month. <strong>No entry was made in the books.</strong><br><br><em>TB: Debtors: €73,500</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "The full debt is recovered. Although only €1,600 cash has been received, the debtor has agreed to pay the remaining €1,600. So the full €3,200 is a bad debt recovered — shown as income in the P&L.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bad Debts Recovered A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Full debt recovered → P&L income: 3,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Update Debtors. The debtor now owes €1,600 (agreed to pay within 1 month). Add this to Debtors as a current asset. The €1,600 cheque received goes to reduce the bank overdraft.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Debtors A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 73,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: debtor balance owed: 1,600</td><td class="p-2 border border-border"></td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Cheque received: 1,600</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bad debt recovered (income)</span><span class="font-mono font-bold">€3,200</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors increased by €1,600</span><span class="font-mono font-bold">€(part of 89,860)</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank reduced by €1,600</span><span class="font-mono font-bold">€(part of 40,800)</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N10 Bad debt recovered: 3,200<br>N20 Debtors: 73,500 + 14,760 + 1,600 = 89,860<br>N27 Bank: 30,100 + 10,800 − 1,600 + 1,500 = 40,800<br></div>`,
        mistakes: ["KEY: The full €3,200 goes to P&L as income, not just the €1,600 received. The debtor's agreement to pay the rest means the full amount is recovered. The €1,600 still owed becomes a debtor (current asset)."]
      },
    ]
  },
  {
    id: "q1-goods-own-use",
    type: "Universal",
    name: "Goods for Own Use (Drawings)",
    year: 2025,
    source: "ADJ (vii)",
    totalMarks: 9,
    category: "universal",
    desc: "(vii) Goods taken by McConnell for his own personal use during the year were not recorded. These goods had a retail value of €12,900, which is cost pl...",
    partSummary: ["Work back to cost...", "Double entry. Credit Purchases...", "Where everything goes."],
    question: `<strong>(vii)</strong> Goods taken by McConnell for his own personal use during the year were not recorded. These goods had a retail value of €12,900, which is cost plus 20%.<br><br><em>TB: Purchases: €622,400 | Drawings: €13,700</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Work back to cost price. Retail is cost + 20%. So cost = 12,900 / 1.20 = €10,750. We always use cost price for this adjustment because goods were recorded at cost in Purchases.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Cost Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Retail value: 12,900</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Mark-up: cost + 20%</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-green-700 dark:text-green-400 font-semibold">Cost: 12,900 / 1.20: 10,750</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Double entry. Credit Purchases (reduce by cost price) and Debit Drawings (owner took goods). The goods leave the business — Purchases is reduced, so Gross Profit increases.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Purchases A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Goods for own use (at cost): 10,750</td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Drawings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 13,700</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add goods at cost: 10,750</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Total drawings: 24,450</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Purchases reduced by cost (€10,750)</span><span class="font-mono font-bold">€586,850</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Drawings increased</span><span class="font-mono font-bold">€24,450</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N3  Purchases: 622,400 − 24,800 − 10,750 = 586,850<br>N29 Drawings: 13,700 + 10,750 = 24,450<br></div>`,
        mistakes: ["KEY: Always use cost price, not retail/selling price. The mark-up tells you the relationship: \"cost plus 20%\" means divide by 1.20. \"Mark-up on cost of 25%\" means divide by 1.25."]
      },
    ]
  },
  {
    id: "q1-provision-bd",
    type: "Universal",
    name: "Provision for Bad Debts",
    year: 2025,
    source: "ADJ (ix.4)",
    totalMarks: 6,
    category: "universal",
    desc: "(ix.4) Provision for bad debts to be adjusted to 5% of debtors.TB: Debtors: €73,500 (adjusted to €89,860 after all adjustments) | Provision for bad de...",
    partSummary: ["Calculate the new provision....", "Where it goes. An..."],
    question: `<strong>(ix.4)</strong> Provision for bad debts to be adjusted to 5% of debtors.<br><br><em>TB: Debtors: €73,500 (adjusted to €89,860 after all adjustments) | Provision for bad debts: €3,600</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate the new provision. You must use the adjusted debtors figure (after all other adjustments to debtors have been made). New provision: 5% × 89,860 = €4,493.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Provision Working</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Adjusted debtors (N20): 89,860</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">New provision: × 5%: 4,493</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Old provision (TB): 3,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-red-600 dark:text-red-400 font-semibold">INCREASE → P&L expense: 893</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes. An increase in the provision is an expense (debit P&L). A decrease would be income (credit P&L).",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Increase in bad debt provision (expense)</span><span class="font-mono font-bold">€893</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors less provision (89,860 − 4,493)</span><span class="font-mono font-bold">€85,367</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N12 Increase: 4,493 − 3,600 = 893<br>N21 Provision: 89,860 × 5% = 4,493<br></div>`,
        mistakes: ["KEY: Always calculate the provision on the ADJUSTED debtors figure (after bad debts written off, bad debt recovery additions, credit sales added, etc). The P&L only shows the CHANGE in provision, not the full amount."]
      },
    ]
  },
  {
    id: "q1-patent-investment",
    type: "Universal",
    name: "Patent Write-Off & Investment Income",
    year: 2025,
    source: "ADJ (ii)+(vi)",
    totalMarks: 12,
    category: "universal",
    desc: "(ii) Patents are being written off over a 6-year period, which commenced in 2022.Advertising (incorporating three months investment income): €4,2004% ...",
    partSummary: ["Extract investment income from...", "Calculate full year investment...", "Write off the patent....", "Where everything goes."],
    question: `<strong>(ii)</strong> Patents are being written off over a 6-year period, which commenced in 2022.<br><br><strong>Advertising (incorporating three months investment income):</strong> €4,200<br><strong>4% Investments acquired 01/06/2024:</strong> €120,000<br><br><em>TB: Patents: €62,400</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Extract investment income from Advertising. The three months' investment income was incorrectly credited to Advertising. Calculate: 120,000 × 3% × 3/12 = €900. Add this back to Advertising (it reduced the figure).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Advertising A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: 4,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add back investment income: 900</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Corrected → P&L: 5,100</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Calculate full year investment income. Investments acquired 01/06/2024. Held for 7 months to year end. Income: 120,000 × 3% × 7/12 = €2,100. The €900 already received (hidden in advertising) means €1,200 is still due.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Investment Income</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Full year: 120k × 3% × 7/12: 2,100</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Already received (in Advertising): (900)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-blue-700 dark:text-blue-400 font-semibold">Investment income due (CA): 1,200</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Write off the patent. TB shows €62,400. Commenced 2022, 6-year period. By 31/12/2024 that's 3 years already written off (2022, 2023, 2024 is the 3rd year). But wait — the TB figure IS the remaining balance. So: 62,400 / 4 remaining years = €15,600 per year.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Patent A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance (remaining): 62,400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Remaining years: 4</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Annual write-off → P&L: 15,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Balance → Bal Sheet: 46,800</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Advertising (corrected)</span><span class="font-mono font-bold">€5,100</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Patent written off</span><span class="font-mono font-bold">€15,600</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Investment income</span><span class="font-mono font-bold">€2,100</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Patent (intangible asset)</span><span class="font-mono font-bold">€46,800</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Investment income due (CA)</span><span class="font-mono font-bold">€1,200</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N6  Advertising: 4,200 + 900 = 5,100<br>N8  Patent w/o: 62,400 / 4 = 15,600<br>N14 Inv income: 120,000 × 3% × 7/12 = 2,100<br>N16 Patent BS: 62,400 − 15,600 = 46,800<br>N22 Inv due: 2,100 − 900 = 1,200<br></div>`,
        mistakes: []
      },
    ]
  },
  {
    id: "q1-credit-sale-vat",
    type: "Universal",
    name: "Credit Sale with VAT & Undispatched Goods",
    year: 2025,
    source: "ADJ (iv)",
    totalMarks: 9,
    category: "universal",
    desc: "(iv) In late December 2024 goods with a retail selling price of €14,760 (including VAT at 23%) had been sold on credit. This was a mark-up on cost of ...",
    partSummary: ["Break down the selling...", "Record the sale. Add...", "Where everything goes."],
    question: `<strong>(iv)</strong> In late December 2024 goods with a retail selling price of €14,760 (including VAT at 23%) had been sold on credit. This was a mark-up on cost of 20%. No entry had been made in the books. The goods were not dispatched from the warehouse until 05/01/2025.<br><br><em>TB: Closing stock: €84,000</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Break down the selling price. €14,760 includes VAT at 23%. Price excl VAT: 14,760 / 1.23 = €12,000. VAT element: €2,760. Cost price: 12,000 / 1.20 = €10,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Price Breakdown</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Selling price incl VAT: 14,760</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Excl VAT: ÷ 1.23: 12,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">VAT portion: 2,760</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Cost: 12,000 ÷ 1.20: 10,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Record the sale. Add €12,000 to Sales (excl VAT). Add €14,760 to Debtors (full amount incl VAT — the debtor owes the lot). Credit VAT by €2,760. But the goods weren't dispatched — they're still in the warehouse. So reduce closing stock by €10,000 (at cost).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Adjustments</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Sales + 12,000 (excl VAT): → 896,300</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors + 14,760 (incl VAT): → see N20</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Closing stock − 10,000 (at cost): → see N2</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">VAT − 2,760 (owed to Revenue): → see N23</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Sales increased by €12,000 (excl VAT)</span><span class="font-mono font-bold">€896,300</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Closing stock reduced by €10,000 (cost)</span><span class="font-mono font-bold">€71,700</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors increased by €14,760</span><span class="font-mono font-bold">€(part of 89,860)</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">VAT adjusted by €2,760</span><span class="font-mono font-bold">€23,190</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N1  Sales: 884,300 + 12,000 = 896,300<br>N2  Stock: 84,000 − 2,300 − 10,000 = 71,700<br>N20 Debtors: 73,500 + 14,760 + 1,600 = 89,860<br>N23 VAT: 13,800 − 2,760 + 12,150 = 23,190<br></div>`,
        mistakes: ["KEY: Sales is excl VAT, Debtors is incl VAT. And even though the goods haven't been dispatched, the sale is recorded because the invoice has been sent — but the goods are still in stock so you must reduce closing stock at cost."]
      },
    ]
  },
  {
    id: "q1-debenture-interest",
    type: "Company",
    name: "Debenture Interest (Mid-Year Issue)",
    year: 2025,
    source: "Company",
    totalMarks: 6,
    category: "company",
    desc: "From 2025 Q1B (Cahill Ltd): 6% Debentures: €240,000. Debenture interest paid: €10,000.The debenture interest calculation works identically to mortgage...",
    partSummary: ["Calculate the full year's...", "Key difference from Sole..."],
    question: `<strong>From 2025 Q1B (Cahill Ltd):</strong> 6% Debentures: €240,000. Debenture interest paid: €10,000.<br><br>The debenture interest calculation works identically to mortgage interest. If debentures were issued mid-year, split the calculation. The full year charge goes to the P&L <strong>before</strong> the Appropriation section (it's a charge against profit, not an appropriation).`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate the full year's debenture interest. If there's a mid-year issue, split the calculation. For Cahill Ltd: 6% × 240,000 = €14,400. But we need to check if there was a mid-year change. The marking scheme shows N14: 9,600 + 3,600 OR 2,400 + 10,800 = €13,200.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Debenture Interest A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Paid during year: 10,000</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">P&L charge (full year): 13,200</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Interest due (balance): 3,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 13,200</td><td class="p-2 border border-border font-bold bg-muted">: 13,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Key difference from Sole Trader: Debenture interest appears in the P&L before Net Profit — it's a charge against profit. Dividends come after Net Profit in the Appropriation section. The amount due is a Current Liability.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Debenture interest (charge against profit)</span><span class="font-mono font-bold">€13,200</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debenture interest due (CL)</span><span class="font-mono font-bold">€3,200</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N14 Deb int: 9,600 + 3,600 = 13,200<br>N26 Due: 13,200 − 10,000 = 3,200<br></div>`,
        mistakes: ["REMEMBER: Debenture interest = charge against profit (above Net Profit line). Dividends = appropriation of profit (below Net Profit line). Corporation Tax sits between them."]
      },
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
    desc: "The Appropriation section appears at the bottom of the Company P&L after Operating Profit. It shows how profit is distributed. Based on 2025 Q1B (Cahi...",
    partSummary: ["The Appropriation sequence. This...", "Where items go in..."],
    question: `<strong>The Appropriation section</strong> appears at the bottom of the Company P&L after Operating Profit. It shows how profit is distributed. Based on 2025 Q1B (Cahill Ltd):<br><br>Dividends paid: €26,000 | P&L balance 01/01: (€43,400)`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "The Appropriation sequence. This is rigid — always in this exact order. Net Profit → less Corp Tax → Profit After Tax → less Dividends → Retained Profit → less Transfer to Reserve → add/subtract P&L balance b/f → P&L balance c/f.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Appropriation Format</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Net Profit: 157,755</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less Dividends paid: (26,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Retained profit: 131,755</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">P&L balance 01/01/2024: (43,400)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-green-700 dark:text-green-400 font-semibold">P&L balance 31/12/2024: 88,355</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where items go in the Balance Sheet: Dividends paid — nowhere (already paid, reduces bank). If \"proposed dividends\" — Current Liability. Corporation Tax provision — Current Liability. Transfer to reserve — adds to Capital Reserve in Financed By. P&L balance — shown in Capital and Reserves.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Dividends (appropriation, after Net Profit)</span><span class="font-mono font-bold">€26,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">P&L balance in Capital & Reserves</span><span class="font-mono font-bold">€88,355</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>Net Profit − Dividends + P&L b/f = P&L c/f<br>157,755 − 26,000 + (−43,400) = 88,355<br></div>`,
        mistakes: ["KEY: An opening P&L loss (debit balance like −43,400) is subtracted. Don't accidentally add it. Also: proposed dividends are a Current Liability; paid dividends are not."]
      },
    ]
  },
  {
    id: "q1-raw-materials",
    type: "Manufacturing",
    name: "Raw Materials Consumed",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 6,
    category: "manufacturing",
    desc: "The Manufacturing Account starts with the raw materials consumed calculation. Based on 2022 Q1A (McGuigan Ltd):TB: Opening stock RM: €27,300 | Purchas...",
    partSummary: ["Raw materials consumed. Same...", "Purchases RM adjustment: TB..."],
    question: `<strong>The Manufacturing Account</strong> starts with the raw materials consumed calculation. Based on 2022 Q1A (McGuigan Ltd):<br><br><em>TB: Opening stock RM: €27,300 | Purchases RM: €760,400 | Closing stock RM: €28,300</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Raw materials consumed. Same structure as Cost of Goods Sold in Trading Account, but for raw materials only. Carriage inwards on raw materials is included here.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Manufacturing Account (Top Section)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening stock raw materials: 27,300</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Purchases RM (adjusted): 709,400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">: 736,700</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less closing stock RM: (28,300)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Cost of RM consumed: 708,400</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Purchases RM adjustment: TB 760,400 + 11,000 (credit purchase in suspense) − 62,000 (materials used for store) = 709,400. The store materials are capitalised to Buildings, not consumed in manufacturing.",
        content: `<div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N1 Purchases RM: 760,400 + 11,000 − 62,000 = 709,400<br>RM consumed: 27,300 + 709,400 − 28,300 = 708,400<br></div>`,
        mistakes: ["KEY: Only raw materials go here — not finished goods stock. The Balance Sheet shows THREE separate stock lines: Raw Materials, Work in Progress, and Finished Goods."]
      },
    ]
  },
  {
    id: "q1-scrap-machine",
    type: "Manufacturing",
    name: "Sale of Scrap & Machine Disposal",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 9,
    category: "manufacturing",
    desc: "(iii) Included in the figure for sale of scrap materials is €7,000 received from the sale of an old machine on 31/03/2021. This machine had cost €30,0...",
    partSummary: ["Separate machine proceeds from...", "Machine disposal. Cost €30,000,...", "Where everything goes."],
    question: `<strong>(iii)</strong> Included in the figure for sale of scrap materials is €7,000 received from the sale of an old machine on 31/03/2021. This machine had cost €30,000 on 01/09/2016.<br><br><em>TB: Sale of scrap materials: €18,950</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Separate machine proceeds from scrap. The sale of scrap figure (€18,950) includes €7,000 from the machine sale. Actual scrap: 18,950 − 7,000 = €11,950. The €7,000 is the proceeds for the machine disposal working.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Scrap Separation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">TB: Sale of scrap materials: 18,950</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less machine proceeds: (7,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-green-700 dark:text-green-400 font-semibold">Actual scrap → Manufacturing A/C: 11,950</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Machine disposal. Cost €30,000, purchased 01/09/2016, sold 31/03/2021. Acc dep: 15% × 30,000 × 4 yrs 7 months = €20,625. NBV: 30,000 − 20,625 = €9,375. Proceeds: €7,000. Loss = €2,375. Loss goes to Manufacturing Account (factory asset).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Machine</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 30,000</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Acc dep (15% × 30k × 55/12): 20,625</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 30,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Proceeds (from scrap): 7,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">LOSS → Manufacturing A/C: 2,375</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where everything goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Sale of scrap (deducted at bottom)</span><span class="font-mono font-bold">€11,950</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Loss on machine (factory overhead)</span><span class="font-mono font-bold">€2,375</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Machinery cost reduced by €30,000</span><span class="font-mono font-bold">€310,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Machinery acc dep adjusted</span><span class="font-mono font-bold">€77,000</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N5  Loss: 30,000 − 20,625 − 7,000 = 2,375<br>N7  Scrap: 18,950 − 7,000 = 11,950<br>N16 Machinery cost: 340,000 − 30,000 = 310,000<br>N17 Mach AD: 50,000 + 47,625 − 20,625 = 77,000<br></div>`,
        mistakes: ["KEY: Loss on MACHINE goes to Manufacturing Account (factory asset). Loss on VAN goes to P&L Selling & Distribution. Profit on machine disposal would go to P&L as operating income."]
      },
    ]
  },
  {
    id: "q1-damaged-stock",
    type: "Universal",
    name: "Damaged / Obsolete Stock",
    year: 2025,
    source: "ADJ (i)",
    totalMarks: 6,
    category: "universal",
    desc: "(i) Stock at cost on 31/12/2024 was €84,000. This figure includes stock at a cost of €10,600 but which was later damaged and now has a net realisable ...",
    partSummary: ["Reduce closing stock. Stock...", "Simple. Closing stock appears..."],
    question: `<strong>(i)</strong> Stock at cost on 31/12/2024 was €84,000. This figure includes stock at a cost of €10,600 but which was later damaged and now has a net realisable value of €8,300.`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Reduce closing stock. Stock is valued at the lower of cost and NRV. The damaged stock cost €10,600 but is only worth €8,300. Reduce closing stock by the difference: 10,600 − 8,300 = €2,300.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Closing Stock Adjustment</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Stock at cost: 84,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less: damaged stock (cost − NRV): (2,300)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Adjusted closing stock: 81,700</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Also less undispatched goods): (10,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Final closing stock: 71,700</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Simple. Closing stock appears in both the Trading Account and the Balance Sheet at the adjusted figure.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Closing stock (adjusted)</span><span class="font-mono font-bold">€71,700</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Closing stock (current asset)</span><span class="font-mono font-bold">€71,700</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N2 Stock: 84,000 − 2,300 − 10,000 = 71,700<br></div>`,
        mistakes: ["KEY: You reduce by the DIFFERENCE (cost minus NRV), not the full cost. If NRV was zero, you'd reduce by the full €10,600."]
      },
    ]
  },
  {
    id: "q1-goods-in-transit",
    type: "Universal",
    name: "Goods in Transit",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "No record has been made in the books for \"goods in transit\" on 31/12/2021. The invoice for these goods had been received showing the recommended retai...",
    partSummary: ["Work back to cost...", "Three entries needed —..."],
    question: `<strong>No record has been made in the books for "goods in transit" on 31/12/2021.</strong> The invoice for these goods had been received showing the recommended retail selling price of €24,500, which is cost plus 25%.<br><br><em>From 2020 Q1A (S. Heighway)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Work back to cost price. Selling price is cost + 25%. Cost = 24,500 / 1.25 = €19,600. The goods belong to us (invoice received) but haven't arrived yet, so they're not in our stock count.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Cost Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Retail selling price: 24,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Mark-up: cost + 25%</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-green-700 dark:text-green-400 font-semibold">Cost price: 24,500 / 1.25: 19,600</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Three entries needed — all at COST price. Increase Purchases (we bought them). Increase Creditors (we owe the supplier). Increase Closing Stock (the goods exist, just not here yet).",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Purchases increased by cost</span><span class="font-mono font-bold">€+19,600</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Closing stock increased by cost</span><span class="font-mono font-bold">€+19,600</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Creditors increased by cost</span><span class="font-mono font-bold">€+19,600</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>Purchases: TB + 19,600<br>Closing stock: TB + 19,600<br>Creditors: TB + 19,600<br></div>`,
        mistakes: ["KEY: All three entries are at COST price, not selling price. The mark-up is only used to calculate cost. Net effect on Gross Profit = zero (purchases up, stock up by same amount)."]
      },
    ]
  },
  {
    id: "q1-sale-or-return",
    type: "Universal",
    name: "Goods on Sale or Return",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "Finished goods were sent to a customer on a 'sale or return' basis on 31/12/2023. These goods were recorded in the books as a credit sale of €21,250. ...",
    partSummary: ["The sale hasn't happened...", "Where it goes."],
    question: `<strong>Finished goods were sent to a customer on a 'sale or return' basis on 31/12/2023.</strong> These goods were recorded in the books as a credit sale of €21,250. This is a mark-up on cost of 25%.<br><br><em>From 2024 Q1B (Sexton Ltd)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "The sale hasn't happened yet. Sale or return means the customer hasn't confirmed the purchase. But the books recorded it as a credit sale. We need to reverse everything. Cost = 21,250 / 1.25 = €17,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Reversal</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Reduce Sales by selling price: 21,250</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Reduce Debtors by selling price: 21,250</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Increase Closing Stock by cost: 17,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Sales reduced by selling price</span><span class="font-mono font-bold">€−21,250</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Closing stock increased by cost</span><span class="font-mono font-bold">€+17,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors reduced by selling price</span><span class="font-mono font-bold">€−21,250</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>Sales: TB − 21,250<br>Stock FG: TB + 17,000<br>Debtors: TB − 21,250<br></div>`,
        mistakes: ["KEY: Reduce Sales and Debtors by SELLING price. Increase stock by COST price. The difference between the two reduces Gross Profit."]
      },
    ]
  },
  {
    id: "q1-prepayment",
    type: "Universal",
    name: "Prepayments (Time Apportion)",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "Advertising is for the year ended 30/04/2021.This means 12 months were paid covering Jan 2020 to Apr 2021. Only 8 months (Jan–Aug or Jan–Dec minus 4 m...",
    partSummary: ["Calculate the prepaid portion....", "Where it goes. The..."],
    question: `<strong>Advertising is for the year ended 30/04/2021.</strong><br><br>This means 12 months were paid covering Jan 2020 to Apr 2021. Only 8 months (Jan–Aug or Jan–Dec minus 4 months) relate to this year. 4 months are prepaid.<br><br><em>Common in Sole Trader Q1</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate the prepaid portion. If advertising of €6,000 covers 12 months to 30/04/2021 and the year end is 31/12/2020, then 4 months (Jan–Apr 2021) are prepaid. Prepaid = 6,000 × 4/12 = €2,000. P&L charge = 6,000 − 2,000 = €4,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Advertising A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Paid (TB): 6,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Less prepaid (4/12): (2,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-blue-700 dark:text-blue-400 font-semibold">P&L charge (8 months): 4,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes. The prepaid amount is a current asset — the business has paid for something it hasn't used yet.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Advertising (reduced)</span><span class="font-mono font-bold">€4,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Advertising prepaid (current asset)</span><span class="font-mono font-bold">€2,000</span></div></div>`,
        mistakes: ["KEY: \"For the year ended 30/04\" means it runs TO April — so Jan to Apr of next year is prepaid. Count the months carefully. Insurance prepaid and rent prepaid work identically."]
      },
    ]
  },
  {
    id: "q1-accrual",
    type: "Universal",
    name: "Accruals (Amounts Due)",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "Provision should be made for rent due on 31/12/2024.Rent in TB: €17,600 covers 01/01/2024 to 31/08/2024 (8 months).From 2025 Q1A — ADJ (ix.1)...",
    partSummary: ["Calculate the full year...", "Where it goes."],
    question: `<strong>Provision should be made for rent due on 31/12/2024.</strong><br><br>Rent in TB: €17,600 covers 01/01/2024 to 31/08/2024 (8 months).<br><br><em>From 2025 Q1A — ADJ (ix.1)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate the full year amount. €17,600 for 8 months. Monthly: 17,600 / 8 = €2,200. Full year: 2,200 × 12 = €26,400. Amount due: 26,400 − 17,600 = €8,800.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Rent A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Paid (TB, 8 months): 17,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Rent due (4 months): 8,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-blue-700 dark:text-blue-400 font-semibold">Full year → P&L: 26,400</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Rent (full year charge)</span><span class="font-mono font-bold">€26,400</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Rent due (current liability)</span><span class="font-mono font-bold">€8,800</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N11 Rent: 17,600 + 8,800 = 26,400<br>N24 Rent due: 26,400 − 17,600 = 8,800<br></div>`,
        mistakes: ["KEY: An amount DUE BY us = increase expense in P&L + current liability. An amount DUE TO us (e.g. rent receivable due) = increase income in P&L + current asset."]
      },
    ]
  },
  {
    id: "q1-private-expense",
    type: "Universal",
    name: "Private Expense in Business Expense",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "Included in Insurance is a cheque for €900 which is for the owner's private house insurance.Common across all Sole Trader papers...",
    partSummary: ["Simple transfer. The private...", "Where it goes."],
    question: `<strong>Included in Insurance is a cheque for €900 which is for the owner's private house insurance.</strong><br><br><em>Common across all Sole Trader papers</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Simple transfer. The private expense was paid from the business bank account and recorded as a business expense. Remove it from the expense and add it to drawings.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Insurance A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 8,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less private portion: (900)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted" class="text-blue-700 dark:text-blue-400 font-semibold">Business expense → P&L: 7,300</td><td class="p-2 border border-border"></td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Drawings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 12,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Add private insurance: 900</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Total drawings: 13,100</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Insurance (reduced)</span><span class="font-mono font-bold">€7,300</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Drawings (increased)</span><span class="font-mono font-bold">€13,100</span></div></div>`,
        mistakes: ["KEY: This also applies to \"mortgage interest — 20% relates to private dwelling\" in company accounts. The private portion goes to Drawings, the business portion stays as an expense."]
      },
    ]
  },
  {
    id: "q1-revaluation-soy",
    type: "Universal",
    name: "Revaluation of Buildings (Start of Year)",
    year: 2025,
    source: "Variant",
    totalMarks: 9,
    category: "universal",
    desc: "It was decided to revalue the land and buildings at €950,000 on 01/01/2022. The land element is €150,000. Buildings depreciated at 2% of cost per annu...",
    partSummary: ["Start of year =...", "Step 1: Strip existing...", "Step 2: Revalue. Increase..."],
    question: `<strong>It was decided to revalue the land and buildings at €950,000 on 01/01/2022.</strong> The land element is €150,000. Buildings depreciated at 2% of cost per annum.<br><br><em>From 2023 Q3 (Weber Ltd). Different from end-of-year revaluation.</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Start of year = different sequence. First strip existing accumulated depreciation into Revaluation Reserve. Then revalue. Then depreciate at the NEW revalued amount.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Sequence Comparison</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">END of year: Depreciate → Revalue → Strip</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">START of year: Strip → Revalue → Depreciate</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 1: Strip existing accumulated depreciation. Transfer all existing acc dep to Revaluation Reserve. Say acc dep was €70,000. Revaluation Reserve: +€70,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Revaluation Reserve</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Acc dep stripped: 70,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Revaluation increase: 100,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted">Total reserve: 170,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 2: Revalue. Increase L&B from €800,000 to €950,000 (+€150,000 to Reval Reserve). Step 3: Depreciate at NEW amount. Buildings: 950,000 − 150,000 (land) = €800,000. Dep: 800,000 × 2% = €16,000 → P&L.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Depreciation (at REVALUED amount)</span><span class="font-mono font-bold">€16,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">L&B at revalued amount</span><span class="font-mono font-bold">€950,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Acc dep (new year only)</span><span class="font-mono font-bold">€16,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Revaluation Reserve</span><span class="font-mono font-bold">€170,000</span></div></div>`,
        mistakes: ["CRITICAL DIFFERENCE: End-of-year: depreciate at OLD cost (smaller P&L charge). Start-of-year: depreciate at NEW revalued amount (larger P&L charge). The Reval Reserve is also different — start-of-year only includes old acc dep + increase, not current year dep."]
      },
    ]
  },
  {
    id: "q1-vat-fixed-asset",
    type: "Universal",
    name: "VAT on Fixed Asset Purchase",
    year: 2025,
    source: "ADJ (viii)",
    totalMarks: 6,
    category: "universal",
    desc: "A new warehouse was purchased during the year for €102,150, which includes VAT at 13.5%. The amount paid to the vendor was entered in the land & build...",
    partSummary: ["Separate the VAT from...", "Where it goes. The..."],
    question: `<strong>A new warehouse was purchased during the year for €102,150, which includes VAT at 13.5%.</strong> The amount paid to the vendor was entered in the land & buildings account. No entry was made in the VAT account.<br><br><em>From 2025 Q1A</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Separate the VAT from the cost. The full amount (€102,150) was debited to L&B, but the VAT portion should be in the VAT account. Cost excl VAT = 102,150 / 1.135 = €90,000. VAT = €12,150.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Land & Buildings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB (includes VAT): 870,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Remove VAT element: (12,150)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Corrected cost: 857,850</td><td class="p-2 border border-border"></td></tr></tbody></table><table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">VAT A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 13,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add warehouse VAT (reclaimable): 12,150</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Adjusted VAT: 25,950</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes. The VAT is reclaimable — it's a debit in the VAT account (current asset if net debit, reduces liability if net credit).",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">L&B cost reduced by VAT</span><span class="font-mono font-bold">€857,850</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">VAT account adjusted</span><span class="font-mono font-bold">€see N23</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>L&B: 870,000 − 12,150 = 857,850<br>VAT: 13,800 + 12,150 − 2,760 = 23,190<br></div>`,
        mistakes: ["KEY: VAT on fixed assets is reclaimable — debit the VAT account. The building cost must EXCLUDE VAT for depreciation calculations. Common error: depreciating on the VAT-inclusive figure."]
      },
    ]
  },
  {
    id: "q1-creditor-settlement",
    type: "Universal",
    name: "Creditor Settlement / Discount",
    year: 2025,
    source: "ADJ (ix.3)",
    totalMarks: 6,
    category: "universal",
    desc: "A bank transfer for €1,500 was made to a creditor in full settlement of a debt of €1,650.From 2025 Q1A...",
    partSummary: ["The creditor accepted less...", "Where it goes."],
    question: `<strong>A bank transfer for €1,500 was made to a creditor in full settlement of a debt of €1,650.</strong><br><br><em>From 2025 Q1A</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "The creditor accepted less than owed. Debt was €1,650, paid €1,500. Discount received: 1,650 − 1,500 = €150. Creditors reduced by full debt (€1,650). Discount received is income.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Creditors A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Bank payment: 1,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Discount received: 150</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Total debt cleared: 1,650</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Discount received (added to net discount)</span><span class="font-mono font-bold">€+150</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Creditors reduced by €1,650</span><span class="font-mono font-bold">€61,350</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank increased by €1,500</span><span class="font-mono font-bold">€see N27</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N13 Discount: 9,900 + 150 = 10,050<br>N25 Creditors: 63,000 − 1,650 = 61,350<br></div>`,
        mistakes: ["KEY: Creditors reduce by the FULL debt (€1,650), not just the payment. The difference is discount received — income in the P&L."]
      },
    ]
  },
  {
    id: "q1-rent-receivable",
    type: "Universal",
    name: "Rent Receivable (Income with Prepaid)",
    year: 2025,
    source: "Common",
    totalMarks: 6,
    category: "universal",
    desc: "Rent received in TB includes rent prepaid by a tenant. TB: Rent: €13,500 for 18 months. Year end 31/12. So 6 months (Jan–Jun next year) are prepaid by...",
    partSummary: ["Rent received is INCOME....", "Where it goes. Rent..."],
    question: `<strong>Rent received in TB includes rent prepaid by a tenant.</strong> TB: Rent: €13,500 for 18 months. Year end 31/12. So 6 months (Jan–Jun next year) are prepaid by the tenant.<br><br><em>From 2024 Q1A (Yeats Ltd)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Rent received is INCOME. But if a tenant has prepaid, we've received more than we've earned this year. Earned: 13,500 × 12/18 = €10,500. Prepaid by tenant: 13,500 − 10,500 = €3,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Rent Receivable A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Received (TB): 13,500</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Less prepaid by tenant: (3,000)</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted" class="text-green-700 dark:text-green-400 font-semibold">Earned this year → P&L income: 10,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes. Rent prepaid by a tenant is a current liability — we owe the tenant that service.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Rent received (income)</span><span class="font-mono font-bold">€10,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Rent receivable prepaid (CL)</span><span class="font-mono font-bold">€3,000</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N7 Rent: 13,500 − 3,000 = 10,500<br>N21 Rent prepaid: 3,000<br></div>`,
        mistakes: ["KEY: Rent PREPAID by a tenant = current liability (we owe them the space). Rent DUE to us = current asset (they owe us money). Don't confuse with rent we pay — that's an expense."]
      },
    ]
  },
  {
    id: "q1-bank-recon",
    type: "Universal",
    name: "Bank Reconciliation in Q1",
    year: 2025,
    source: "ADJ (viii)",
    totalMarks: 6,
    category: "universal",
    desc: "The figure for bank in the trial balance has been taken from the firm's own records. However, a bank statement shows an overdraft of €76,200. Discrepa...",
    partSummary: ["Only adjust the CASH...", "Unpresented cheques DON'T adjust..."],
    question: `<strong>The figure for bank in the trial balance has been taken from the firm's own records. However, a bank statement shows an overdraft of €76,200.</strong> Discrepancies: credit transfer received (bad debt recovery), cheque entered at wrong amount, cheque returned unpresented, advertising cheque not presented.<br><br><em>From 2020/2021 Q1A</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Only adjust the CASH BOOK (our records). Items in the bank statement that aren't in our books need to be entered. Items in our books that aren't in the bank statement (unpresented cheques, lodgements not yet credited) are for the reconciliation only — they DON'T change our ledger.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank A/C (Adjustments)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Credit transfer received (BDR): 1,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Cheque error (6,300 entered as 5,700): 600</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Cheque returned (add back): 2,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Unpresented cheques DON'T adjust the bank account. They only appear in the reconciliation statement. The advertising cheque of €14,200 not presented does NOT change our bank figure — it's already recorded in our books.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank adjusted for items in statement only</span><span class="font-mono font-bold">€see working</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bad debt recovered (from credit transfer)</span><span class="font-mono font-bold">€income</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors adjusted for BDR</span><span class="font-mono font-bold">€adjusted</span></div></div>`,
        mistakes: ["THE RULE: If it's in the bank STATEMENT but not our BOOKS → adjust our bank account. If it's in our BOOKS but not the bank STATEMENT → reconciliation only, no ledger change."]
      },
    ]
  },
  {
    id: "q1-factory-overhead-split",
    type: "Manufacturing",
    name: "Factory Overhead Allocation (Split)",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 6,
    category: "manufacturing",
    desc: "Building depreciation: 2% of cost per annum. The question states \"80% of building depreciation relates to the factory.\" Or the question says nothing —...",
    partSummary: ["If a split is...", "Same principle applies to..."],
    question: `<strong>Building depreciation: 2% of cost per annum.</strong> The question states "80% of building depreciation relates to the factory." Or the question says nothing — meaning ALL depreciation goes to Manufacturing Account.<br><br><em>From 2024 Q1B (Sexton Ltd) — N7: 2% × 800,000 = 16,000. Factory: 12,800. Admin: 3,200.</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "If a split is stated: Calculate total depreciation, then allocate. 2% × 800,000 = €16,000. Factory: 80% × 16,000 = €12,800 → Manufacturing Account. Admin: 20% × 16,000 = €3,200 → P&L Administration. If no split is stated: 100% goes to Manufacturing Account.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Building Depreciation Split</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Total: 2% × 800,000: 16,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Factory (80%) → Mfg A/C: 12,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Admin (20%) → P&L: 3,200</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Same principle applies to rent, insurance, light & heat — any shared expense can be split. The question will always state the ratio.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Factory portion of depreciation</span><span class="font-mono font-bold">€12,800</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L Admin</span><span class="flex-1 text-muted-foreground">Admin portion of depreciation</span><span class="font-mono font-bold">€3,200</span></div></div>`,
        mistakes: ["KEY: The split is ONLY applied when the question tells you. If it just says \"depreciate buildings at 2%\" with no mention of a split, the full amount goes to the Manufacturing Account."]
      },
    ]
  },
  {
    id: "q1-wip-adjustment",
    type: "Manufacturing",
    name: "Work in Progress (WIP) Adjustment",
    year: 2025,
    source: "Manufacturing",
    totalMarks: 6,
    category: "manufacturing",
    desc: "Opening WIP: €38,650. Closing WIP: €27,600.WIP represents goods that are partially complete at the start or end of the year. The adjustment appears ne...",
    partSummary: ["Add opening WIP, subtract...", "Where it goes. Both..."],
    question: `<strong>Opening WIP: €38,650. Closing WIP: €27,600.</strong><br><br>WIP represents goods that are partially complete at the start or end of the year. The adjustment appears near the bottom of the Manufacturing Account, after factory overheads.<br><br><em>From 2022 Q1A (McGuigan Ltd)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Add opening WIP, subtract closing WIP. Opening WIP was partially complete at the start — we need to add these costs. Closing WIP is partially complete at the end — subtract because they're not finished products yet. Net WIP: 38,650 − 27,600 = +€11,050 added to cost.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Manufacturing A/C (WIP section)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Total after factory overheads: 1,048,786</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: Opening WIP: 38,650</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less: Closing WIP: (27,600)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">After WIP adjustment: 1,059,836</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Where it goes. Both WIP figures also appear as separate lines in Current Assets on the Balance Sheet (alongside RM and FG stock).",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">WIP adjustment (after overheads, before scrap)</span><span class="font-mono font-bold">€+11,050</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Closing WIP (current asset)</span><span class="font-mono font-bold">€27,600</span></div></div>`,
        mistakes: ["KEY: The Balance Sheet shows THREE stock lines: Raw Materials, Work in Progress, and Finished Goods. Don't lump them together."]
      },
    ]
  },
  {
    id: "q1-store-employees",
    type: "Manufacturing",
    name: "Store Built by Own Employees",
    year: 2025,
    source: "ADJ (vii)",
    totalMarks: 6,
    category: "manufacturing",
    desc: "During 2021 a store was built by the firm's own employees. The cost of their labour €60,000 had been treated as a business expense and the materials c...",
    partSummary: ["Capitalise both labour and...", "Reverse the expense entries...."],
    question: `<strong>During 2021 a store was built by the firm's own employees.</strong> The cost of their labour €60,000 had been treated as a business expense and the materials costing €62,000 were taken from existing stock. No entry had been made in the books for the store.<br><br><em>From 2022 Q1A (McGuigan Ltd)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Capitalise both labour and materials to Buildings. The labour was in Wages (expense) and the materials were in Purchases of RM. Both need to be removed from expenses and added to the Buildings fixed asset.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Buildings A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per TB: 865,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: labour (from wages): 60,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: materials (from RM purchases): 62,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Corrected cost: 987,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Reverse the expense entries. Reduce Factory Wages by €60,000 (plus any wage increase applicable). Reduce Purchases of RM by €62,000. Both were incorrectly treated as current expenses.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Factory wages reduced</span><span class="font-mono font-bold">€−60,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Purchases RM reduced</span><span class="font-mono font-bold">€−62,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Buildings cost increased</span><span class="font-mono font-bold">€+122,000</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N2  Wages: 148,000 + 740 − 60,300 = 88,440<br>N1  Purchases RM: 760,400 + 11,000 − 62,000 = 709,400<br>N14 Buildings: 890,000 + 60,300 + 62,000 = 1,012,300<br></div>`,
        mistakes: ["KEY: The wage increase for the 3 months must also be calculated on the store workers' wages before capitalising. This was a 2% increase for 3 months in the McGuigan question."]
      },
    ]
  },
  {
    id: "q1-investment-income",
    type: "Company",
    name: "Investment Income (Mid-Year Acquisition)",
    year: 2025,
    source: "Company",
    totalMarks: 6,
    category: "company",
    desc: "3% Investments acquired 01/06/2024: €120,000.Advertising (incorporating three months investment income): €4,200.From 2025 Q1A — same principle in Comp...",
    partSummary: ["Calculate full income for...", "Mirror image of debenture/mortgage..."],
    question: `<strong>3% Investments acquired 01/06/2024: €120,000.</strong><br>Advertising (incorporating three months investment income): €4,200.<br><br><em>From 2025 Q1A — same principle in Company and Sole Trader</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Calculate full income for the period held. Acquired 01/06, year end 31/12 = 7 months. Income: 120,000 × 3% × 7/12 = €2,100. Some was already received (€900 hidden in Advertising). Amount due: 2,100 − 900 = €1,200.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Investment Income A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Full period: 120k × 3% × 7/12: 2,100</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Already received (in Advertising): 900</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Investment income due (CA): 1,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Mirror image of debenture/mortgage interest. Investment income is income (P&L credit). Amount due to us = current asset. Amount received in advance = current liability.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Investment income (full period)</span><span class="font-mono font-bold">€2,100</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Investment income due (CA)</span><span class="font-mono font-bold">€1,200</span></div></div><div class="bg-muted/50 border border-border rounded-lg p-3 mt-3 font-mono text-xs leading-relaxed"><div class="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 font-sans">N-Workings</div>N14 Income: 120,000 × 3% × 7/12 = 2,100<br>N22 Due: 2,100 − 900 = 1,200<br></div>`,
        mistakes: ["KEY: Investment income due = current ASSET (they owe us). Debenture/mortgage interest due = current LIABILITY (we owe them). Same calculation method, opposite sides of the Balance Sheet."]
      },
    ]
  },
  {
    id: "q1-fire-compensation",
    type: "Company",
    name: "Fire Damage & Insurance Compensation",
    year: 2025,
    source: "ADJ",
    totalMarks: 6,
    category: "company",
    desc: "During 2020 a storeroom which cost €75,000 and stock which cost €24,000 were destroyed by fire. The insurance company agreed to contribute €90,000 in ...",
    partSummary: ["Remove destroyed assets from...", "The compensation receivable goes..."],
    question: `<strong>During 2020 a storeroom which cost €75,000 and stock which cost €24,000 were destroyed by fire.</strong> The insurance company agreed to contribute €90,000 in compensation. No entry had been made in the books.<br><br><em>From 2021 Q1A (A. Kenny)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Remove destroyed assets from the books. The storeroom (€75,000) comes off Buildings. The stock (€24,000) comes off Purchases/Stock. The insurance compensation (€90,000) is receivable. The net position: 90,000 − 75,000 − 24,000 = −€9,000 loss OR split between asset and stock.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Fire Account</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Building destroyed (cost): 75,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Insurance compensation: 90,000</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Stock destroyed (cost): 24,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Loss on fire → P&L: 9,000</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 99,000</td><td class="p-2 border border-border font-bold bg-muted">: 99,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "The compensation receivable goes to Current Assets if not yet received. The loss goes to P&L Administration. For damaged stock specifically, the marking scheme often shows: cost − compensation = loss on damaged stock in the Manufacturing Account.",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Loss on fire (expense)</span><span class="font-mono font-bold">€9,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Buildings cost reduced</span><span class="font-mono font-bold">€−75,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Fire insurance due (CA)</span><span class="font-mono font-bold">€90,000</span></div></div>`,
        mistakes: ["KEY: If a new storeroom was built by employees (common follow-up), capitalise the labour and materials to Buildings — see the \"Store Built by Own Employees\" working."]
      },
    ]
  },
  {
    id: "q1-wages-backdated",
    type: "Manufacturing",
    name: "Wages Backdated (Pay Increase)",
    year: 2025,
    source: "ADJ (vi)",
    totalMarks: 9,
    category: "manufacturing",
    desc: "Provide for a recent wage increase of 6% which has been agreed with the trade unions and is to be backdated to cover the four months from 01/09/2023.F...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — Extension...", "Where it goes:"],
    question: `<strong>Provide for a recent wage increase of 6%</strong> which has been agreed with the trade unions and is to be backdated to cover the four months from 01/09/2023.<br><br><em>From 2024 Mock (Dillon Manufacturing Ltd)</em><br>Direct factory wages per TB: €125,000. During 2023, an extension was added to the factory by the company's own employees. The cost of the labour was €24,000 (<strong>which includes the recent wage increase</strong>).`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate the backdated increase on factory wages. The TB wages (€125,000) are at the OLD rate for the full year. The 6% increase applies for 4 months (Sep–Dec). Backdated wages = 125,000 × 6% × 4/12 = €2,500.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Wages Backdated Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">TB factory wages: 125,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Increase: 125,000 × 6% × 4/12: 2,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Adjusted factory wages → Mfg A/C: 127,500</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Extension labour already includes the increase. The question says the €24,000 extension labour \"includes the recent wage increase.\" This means you do NOT add a backdated amount on top of the €24,000 — it's already at the new rate. Capitalise the full €24,000 to Buildings.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Factory Wages A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">TB wages: 125,000</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Capitalised to Buildings (extension): 24,000</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Backdated increase: 2,500</td><td class="p-2 border border-border">Manufacturing Account (balance): 103,500</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 127,500</td><td class="p-2 border border-border font-bold bg-muted">: 127,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Factory wages (125,000 + 2,500 − 24,000)</span><span class="font-mono font-bold">€103,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Buildings cost increased (extension)</span><span class="font-mono font-bold">€+24,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Wages due (current liability)</span><span class="font-mono font-bold">€2,500</span></div></div>`,
        mistakes: ["TRAP: The backdated wages (€2,500) are owed but not yet paid = Current Liability. If the extension labour did NOT include the increase, you'd need to add 6% × 4/12 of the extension wages too. Read the question wording carefully — \"which includes\" vs \"which does not include\" changes the answer."]
      },
    ]
  },
  {
    id: "q1-bonus-commission",
    type: "Universal",
    name: "Bonus Sales Commission",
    year: 2025,
    source: "ADJ (xii)",
    totalMarks: 9,
    category: "universal",
    desc: "The managing director should be paid a bonus commission of 4% on sales in excess of €750,000. Sales for the year were €1,025,000.From 2024 Mock (Dillo...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — Two...", "Where it goes:"],
    question: `<strong>The managing director should be paid a bonus commission of 4% on sales in excess of €750,000.</strong> Sales for the year were €1,025,000.<br><br><em>From 2024 Mock (Dillon Manufacturing Ltd)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate the commission. Commission applies only on sales ABOVE the threshold. Excess = €1,025,000 − €750,000 = €275,000. Commission = 4% × €275,000 = €11,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Commission Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Total sales: 1,025,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Less threshold: (750,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Excess over threshold: 275,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Commission: 4% × 275,000: 11,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Two effects. The commission is: (1) a Selling & Distribution expense in the P&L (reduces Net Profit), and (2) a Current Liability on the Balance Sheet (amount owed to the director but not yet paid).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Commission Account</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">P&L: S&D expense: 11,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Commission due (CL): 11,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">S&D: Commission expense</span><span class="font-mono font-bold">€11,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Commission due (current liability)</span><span class="font-mono font-bold">€11,000</span></div></div>`,
        mistakes: ["TRAP: Commission is based on EXCESS over the threshold, not total sales. If you calculate 4% × 1,025,000 = €41,000, you've lost all marks. Also: commission is S&D (selling expense), NOT Administration. If the question says \"included in selling expenses\" then the figure is already there — don't double-count."]
      },
    ]
  },
  {
    id: "q1-bank-recon-transposition",
    type: "Universal",
    name: "Bank Reconciliation — Transposition & Credit Errors",
    year: 2025,
    source: "ADJ (ix)",
    totalMarks: 12,
    category: "universal",
    desc: "A bank statement dated 31/12/2023 has arrived showing a balance of €11,709 credit. As well as the cheque for €28,500 left in the drawer from the sale ...",
    partSummary: ["Step 1 — The...", "Step 2 — Bank...", "Step 3 — The...", "Where it goes:"],
    question: `<strong>A bank statement dated 31/12/2023 has arrived showing a balance of €11,709 credit.</strong> As well as the cheque for €28,500 left in the drawer from the sale of an old machine, a comparison of the bank account and the bank statement revealed the following discrepancies:<br>1. A cheque for €910 received from a debtor had been dishonoured. The debtor has been declared bankrupt — write it off as a bad debt.<br>2. A cheque of €4,000 issued to a supplier has not been presented for payment.<br>3. Bank charges of €99 had been deducted by the bank.<br><br>Also: goods purchased on credit for €3,500 have been entered as €5,300 on the correct side of Harvey's account and as €3,050 on the credit side of the purchases account.<br><em>From 2024 Mock</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — The firm's bank account needs correcting first. The firm's records don't know about: (a) the dishonoured cheque (reduces bank by €910), (b) bank charges (reduces bank by €99), (c) the machine cheque not lodged (add €28,500 to bank). These adjust the FIRM'S bank balance.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank Account (Firm's records)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Per trial balance: XXX</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Dishonoured cheque: 910</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: Machine cheque lodged: 28,500</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Bank charges: 99</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Bank Reconciliation Statement. Start with the BANK STATEMENT balance and adjust for items the bank doesn't know about yet: unpresented cheques (subtract) and lodgements not yet credited (add).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank Reconciliation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Balance per bank statement: 11,709</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Add: Machine cheque (lodged late): 28,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Less: Unpresented cheque: (4,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Balance per adjusted bank a/c: 36,209</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — The transposition/amount errors. Goods cost €3,500. Harvey's (creditor) was debited €5,300 instead of €3,500 (overstated by €1,800). Purchases was credited €3,050 instead of €3,500 (understated by €450). Fix: Credit Harvey's by €1,800, Debit Purchases by €450. The remaining €1,350 goes to Suspense (because the TB won't balance).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Error Corrections</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Purchases (add missing €450): 450</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors: Harvey (reduce by €1,800): 1,800</td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Suspense (balancing: 1,800−450): 1,350</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bad debt written off (dishonoured)</span><span class="font-mono font-bold">€910</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bank charges (admin expense)</span><span class="font-mono font-bold">€99</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank (adjusted per reconciliation)</span><span class="font-mono font-bold">€36,209</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Creditors reduced (Harvey)</span><span class="font-mono font-bold">€−1,800</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading</span><span class="flex-1 text-muted-foreground">Purchases increased</span><span class="font-mono font-bold">€+450</span></div></div>`,
        mistakes: ["TRAPS: (1) Dishonoured cheque from a bankrupt debtor = bad debt, not just a bank adjustment. (2) Bank charges are an EXPENSE (admin), not just a bank adjustment. (3) The transposition error creates a suspense difference because one side is wrong by more than the other. (4) Unpresented cheques go in the RECONCILIATION, not the firm's bank account."]
      },
    ]
  },
  {
    id: "q1-machine-disposal-omitted",
    type: "Manufacturing",
    name: "Machine Disposal Completely Omitted",
    year: 2025,
    source: "ADJ (vii)",
    totalMarks: 12,
    category: "manufacturing",
    desc: "Machinery which had cost €40,000 in April 2021 was sold in October 2023. The proceeds of the disposal was €28,500. All the entries in relation to this...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — Record...", "Step 3 — The...", "Where it goes:"],
    question: `<strong>Machinery which had cost €40,000 in April 2021 was sold in October 2023.</strong> The proceeds of the disposal was €28,500. All the entries in relation to this transaction were completely omitted from the books and the cheque for €28,500 was mistakenly left in an office drawer for ten weeks and not lodged to the bank account until January 2024.<br><br><em>From 2024 Mock (Dillon Manufacturing Ltd)</em><br>Depreciation on plant & machinery: 10% of cost. Full year in year of acquisition, none in year of disposal.`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate accumulated depreciation on the old machine. Cost €40,000, acquired April 2021. Full year dep in year of acquisition, none in year of disposal. So: 2021 full year + 2022 full year = 2 years. Acc dep = 10% × €40,000 × 2 = €8,000. NBV at disposal = 40,000 − 8,000 = €32,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Depreciation on old machine</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">2021: 10% × 40,000 (full year): 4,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">2022: 10% × 40,000 (full year): 4,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">2023: none (year of disposal): —</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Total acc dep: 8,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Record the disposal. Since everything was omitted: remove machine at cost (credit Machinery €40,000), remove its acc dep (debit Acc Dep €8,000), record proceeds (debit Bank/Cash €28,500). The cheque wasn't lodged — it's cash in the drawer, not bank.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal of Machine</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost of machine: 40,000</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Accumulated depreciation: 8,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Proceeds (cash in drawer): 28,500</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 40,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">LOSS on disposal: 3,500</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted">: 40,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — The cheque in the drawer. The €28,500 was NOT lodged to the bank by year end. It's cash in hand, not bank. Add to Cash on BS. The bank statement reconciliation may also reference this.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Cash / Bank impact</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Cash in hand (drawer cheque): 28,500</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">This is NOT in the bank a/c: —</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Mfg A/C</span><span class="flex-1 text-muted-foreground">Loss on disposal (factory overhead)</span><span class="font-mono font-bold">€3,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Machinery cost reduced</span><span class="font-mono font-bold">€−40,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Machinery acc dep reduced</span><span class="font-mono font-bold">€−8,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Cash in hand (cheque in drawer)</span><span class="font-mono font-bold">€28,500</span></div></div>`,
        mistakes: ["TRAPS: (1) EVERYTHING was omitted — you must record cost removal, acc dep removal, AND proceeds. (2) The cheque was in a drawer = CASH, not Bank. (3) Machine disposal loss goes to Manufacturing Account (factory overhead), NOT P&L. (4) No depreciation in the year of disposal per company policy."]
      },
    ]
  },
  {
    id: "q1-fire-stock-insurance",
    type: "Universal",
    name: "Stock Destroyed by Fire + Insurance Claim",
    year: 2025,
    source: "ADJ (v)/(x)",
    totalMarks: 9,
    category: "universal",
    desc: "During the year, stock of raw materials which had cost €6,000 was destroyed by fire. There was an excess of €500 on the insurance policy and the insur...",
    partSummary: ["Step 1 — Remove...", "Step 2 — Three...", "Where it goes:"],
    question: `<strong>During the year, stock of raw materials which had cost €6,000 was destroyed by fire.</strong> There was an excess of €500 on the insurance policy and the insurance company agreed to pay the remainder.<br><br><em>From 2024 Mock (Dillon Mfg) + 2025 Mock (Barrett ST)</em><br>In the Sole Trader version: stock costing €5,000 destroyed, insurance compensation of €4,250.`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Remove the destroyed stock. The stock no longer exists. If it's in closing stock, reduce closing stock by €6,000. If it was already consumed (RM → Manufacturing), no stock adjustment needed — but the cost needs to be accounted for.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Stock Adjustment</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Stock destroyed at cost: 6,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Less insurance excess (owner bears): (500)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Insurance claim receivable: 5,500</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Three entries. (1) Reduce closing stock (or RM purchases) by €6,000. (2) Insurance claim due of €5,500 = Current Asset. (3) The €500 excess = a LOSS charged to P&L (or Manufacturing if RM).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Fire Account</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Stock destroyed (at cost): 6,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Insurance claim receivable: 5,500</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 6,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Loss (excess not covered): 500</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted">: 6,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-600 text-white">Trading/Mfg</span><span class="flex-1 text-muted-foreground">Reduce closing stock (or RM)</span><span class="font-mono font-bold">€−6,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Insurance claim due (current asset)</span><span class="font-mono font-bold">€5,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L/Mfg</span><span class="flex-1 text-muted-foreground">Loss on fire (excess amount)</span><span class="font-mono font-bold">€500</span></div></div>`,
        mistakes: ["TRAPS: (1) The insurance claim is a CURRENT ASSET, not income — you haven't received the money yet. (2) The excess (€500) is the owner's uninsured loss = expense. (3) If RM in manufacturing, the loss goes to Manufacturing Account. If trading stock in ST, it goes to P&L."]
      },
    ]
  },
  {
    id: "q1-dishonoured-bankrupt",
    type: "Universal",
    name: "Dishonoured Cheque — Debtor Bankrupt",
    year: 2025,
    source: "ADJ (ix)",
    totalMarks: 12,
    category: "universal",
    desc: "A cheque for €5,700 received in full settlement of a business debt of €6,000 was correctly recorded in the books. However, no entry had been made in t...",
    partSummary: ["Step 1 — Original...", "Step 2 — The...", "Step 3 — Cash...", "Where it goes:"],
    question: `<strong>A cheque for €5,700 received in full settlement of a business debt of €6,000</strong> was correctly recorded in the books. However, no entry had been made in the books regarding the dishonouring of this cheque and the subsequent payment of €1,500 cash received from the customer.<br>The customer paid €1,500 cash and was put in the safe.<br><br><em>From 2024 Mock (Fowler Suspense Q)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Original entry was correct. Debtor owed €6,000. Paid €5,700 in full settlement. So: Bank Dr €5,700, Discount Allowed Dr €300, Debtors Cr €6,000. This was correctly recorded.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Original (correct) entry</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Bank: 5,700</td><td class="p-2 border border-border">Debtors: 6,000</td></tr><tr><td class="p-2 border border-border">Discount allowed: 300</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — The cheque bounced. The €5,700 cheque was dishonoured. We need to reverse the original entry: Debtors Dr €6,000, Bank Cr €5,700, Discount Allowed Cr €300. The debtor owes us €6,000 again.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Reverse dishonoured cheque</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Debtors (reinstate debt): 6,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Bank (cheque bounced): 5,700</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Discount allowed (reverse): 300</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Cash payment of €1,500 received. The debtor paid €1,500 in cash (put in safe). Cash Dr €1,500, Debtors Cr €1,500. Remaining debt = €6,000 − €1,500 = €4,500. This becomes a debtor on the BS (or bad debt if bankrupt).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Cash received</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Cash (in safe): 1,500</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors (partial payment): 1,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors increased by €4,500 (6,000−1,500)</span><span class="font-mono font-bold">€+4,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank reduced</span><span class="font-mono font-bold">€−5,700</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Cash increased (in safe)</span><span class="font-mono font-bold">€+1,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Discount allowed reversed</span><span class="font-mono font-bold">€−300</span></div></div>`,
        mistakes: ["TRAPS: (1) The original entry was CORRECT — don't fix what wasn't broken. The issue is the BOUNCE wasn't recorded. (2) Cash in the safe ≠ bank. (3) If the debtor is declared bankrupt, the remaining €4,500 becomes a bad debt expense. (4) The discount allowed gets reversed — it was given but the cheque bounced."]
      },
    ]
  },
  {
    id: "q1-equipment-settlement",
    type: "Universal",
    name: "Equipment Given as Debt Settlement",
    year: 2025,
    source: "ADJ (xi)",
    totalMarks: 12,
    category: "universal",
    desc: "A supplier who was owed €4,250 accepted office equipment with a book value of €3,500 in full settlement of the debt. The office equipment had cost €5,...",
    partSummary: ["Step 1 — Remove...", "Step 2 — Reduce...", "Step 3 — Depreciate...", "Where it goes:"],
    question: `<strong>A supplier who was owed €4,250 accepted office equipment with a book value of €3,500 in full settlement of the debt.</strong> The office equipment had cost €5,000. No entry was made in the books in respect of this transaction. Provide for depreciation on office equipment held on 31/12/2024 at the rate of 20% of cost.<br><br><em>From 2025 Mock (Barrett Sole Trader)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Remove the equipment. Equipment cost €5,000. Book value €3,500 means accumulated depreciation = €1,500. Remove at cost and remove its acc dep.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Equipment Disposal</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost of equipment given: 5,000</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Accumulated depreciation: 1,500</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: 5,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Value to creditor (settlement): 4,250</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">PROFIT on disposal: 750</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold bg-muted">: 5,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Reduce the creditor. The supplier accepted equipment worth €3,500 (book value) in settlement of a €4,250 debt. The supplier accepted it at €4,250 value (full settlement). So: Creditors reduced by €4,250. The difference between €4,250 (settlement value) and €3,500 (NBV) = €750 profit on disposal.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Creditors A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment settlement: 4,250</td><td class="p-2 border border-border">Balance (reduced by €4,250): —</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Depreciate remaining equipment. Original equipment cost minus the disposed equipment: remaining equipment is depreciated at 20% of cost on 31/12/2024.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Depreciation Working</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Remaining equipment at cost: (15,000−5,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">= €10,000 × 20%: 2,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Depreciation charge → P&L: 2,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Profit on disposal of equipment</span><span class="font-mono font-bold">€750</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Depreciation on remaining equipment</span><span class="font-mono font-bold">€2,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Equipment cost reduced</span><span class="font-mono font-bold">€−5,000</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Equipment acc dep reduced</span><span class="font-mono font-bold">€−1,500</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Creditors reduced</span><span class="font-mono font-bold">€−4,250</span></div></div>`,
        mistakes: ["TRAPS: (1) No entry was made — you must record EVERYTHING (cost removal, dep removal, creditor reduction, profit/loss). (2) The profit is the difference between what the creditor accepted (€4,250) and the NBV (€3,500) = €750 PROFIT, not loss. (3) Only depreciate equipment STILL HELD at year end — exclude the disposed equipment from the dep calculation."]
      },
    ]
  },
  {
    id: "q1-private-debt-offset",
    type: "Universal",
    name: "Private Debt Offset Against Business Debt",
    year: 2025,
    source: "ADJ (i)",
    totalMarks: 9,
    category: "universal",
    desc: "A private debt of €950, owed by Fowler, had been offset in full settlement against a business debt of €1,050 owed to Fowler. No entry had been made in...",
    partSummary: ["Step 1 — Understand...", "Step 2 — Journal...", "Where it goes:"],
    question: `<strong>A private debt of €950, owed by Fowler, had been offset in full settlement against a business debt of €1,050 owed to Fowler.</strong> No entry had been made in the books in respect of this transaction.<br><br><em>From 2024 Mock (Fowler Suspense Q)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand the offset. Fowler OWES the business €1,050 (he's a debtor). But the business owner OWES Fowler €950 privately (this is a personal debt — Drawings). The two debts are offset: Fowler pays the net difference of €100 (or the business writes off the €950 against the €1,050).",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Before offset</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Fowler owes business (debtor): 1,050</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Owner owes Fowler (private): 950</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Journal entry. Debit Drawings €950 (private debt is the owner's personal expense). Credit Debtors €1,050 (Fowler's account cleared). Debit Discount Allowed €100 (the €100 difference given as a discount). No — actually: Debit Drawings €950, Debit Discount Allowed €100, Credit Debtors €1,050.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Drawings (private debt): 950</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors: Fowler (cleared): 1,050</td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Discount allowed: 100</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtors reduced</span><span class="font-mono font-bold">€−1,050</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Drawings increased</span><span class="font-mono font-bold">€+950</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Discount allowed</span><span class="font-mono font-bold">€100</span></div></div>`,
        mistakes: ["TRAPS: (1) The private debt (€950) is DRAWINGS — it's the owner's personal obligation, not the business's. (2) The difference (€100) may be discount allowed if given as a settlement discount. (3) This error affects the suspense if only one side was recorded."]
      },
    ]
  },
  {
    id: "q1-rent-prepaid-miscalc",
    type: "Universal",
    name: "Rent Prepaid Miscalculation",
    year: 2025,
    source: "ADJ (iii)",
    totalMarks: 9,
    category: "universal",
    desc: "The expenses prepaid figure relates to an 18-month payment of €3,600 for rent of a warehouse which commenced on 01/01/2023. The payment was recorded c...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — Find...", "Where it goes:"],
    question: `<strong>The expenses prepaid figure relates to an 18-month payment of €3,600 for rent of a warehouse which commenced on 01/01/2023.</strong> The payment was recorded correctly in both the bank account and rent account. However, it was pointed out by an internal auditor that the figure for the amount prepaid was incorrectly calculated. No entry has been made in the books to make this correction.<br><br><em>From 2024 Mock (Fowler Suspense Q)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate the correct prepaid. 18-month payment of €3,600 starting 01/01/2023, covering Jan 2023 to Jun 2024. Monthly cost = €3,600 ÷ 18 = €200/month. Year ended 31/12/2023 uses 12 months. Prepaid = 6 months remaining × €200 = €1,200.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Correct Prepaid Calculation</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Total payment: 3,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Monthly: 3,600 ÷ 18: 200/mth</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">This year: 12 months × 200: 2,400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Prepaid: 6 months × 200: 1,200</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Find the error. The TB shows \"Expenses prepaid €650.\" The correct prepaid is €1,200. The prepaid was UNDERSTATED by €550. This means rent in the P&L was OVERSTATED by €550 (too much charged as expense). Correct: increase prepaid by €550, reduce rent expense by €550.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Correction</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Prepaid (increase by): 550</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Rent expense (reduce by): 550</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where it goes:",
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Rent expense reduced (correctly: €2,400 not €2,950)</span><span class="font-mono font-bold">€−550</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Prepaid increased (correctly: €1,200 not €650)</span><span class="font-mono font-bold">€+550</span></div></div>`,
        mistakes: ["TRAPS: (1) The BANK entry was correct — the full €3,600 was paid. The error is only in the PREPAID split. (2) Incorrect prepaid means incorrect rent expense — they move together. (3) This affects both the corrected P&L and the corrected BS."]
      },
    ]
  },
];
