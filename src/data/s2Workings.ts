import type { Archetype } from "./archetypes";

export const S2_CATEGORIES = [
  { key: "all", label: "All (37)" },
  { key: "suspense", label: "Suspense (14)" },
  { key: "club", label: "Club (8)" },
  { key: "service", label: "Service (5)" },
  { key: "published", label: "Published (5)" },
  { key: "cashflow", label: "Cash Flow (5)" },
];

export const S2_ARCHETYPES: Archetype[] = [
  {
    id: "s2-sus-bad-debt",
    type: "Suspense",
    name: "Bad Debt Recovered — Debtor Reinstated",
    year: 2025,
    source: "2024 Q7(i)",
    totalMarks: 12,
    category: "suspense",
    desc: "€900 received from V. Mullen, debtor whose debt was previously written off. This represents 80% of the original debt. Debtor will pay the remainder by...",
    partSummary: ["Step 1 — Understand...", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX..."],
    question: `<strong>€900 received from V. Mullen, debtor whose debt was previously written off.</strong> This represents 80% of the original debt. Debtor will pay the remainder by January 2024. No entry made. <em>2024 SEC Q7</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand the error. Mullen's debt was written off (removed from books). Now he wants to trade again and paid €900 = 80% of original. So original debt = 900 ÷ 0.80 = €1,125. The full €1,125 must be reinstated as \"bad debt recovered\" (income). The €225 balance (20%) remains as a debtor.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen: Nothing. No entry was made at all. This is a complete Error of Omission.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD have happened:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Bank (cash received): 900</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Bad Debts Recovered (income): 1,125</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors: Mullen (20% still owed): 225</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX = SHOULD minus DID. Since nothing was recorded, the fix IS the should entry. Dr Bank 900, Dr Debtors 225, Cr Bad Debts Recovered 1,125.P&L: Bad debts recovered +€1,125 (INCREASES profit).BS: Bank +900, Debtors +225.SUSPENSE: Error of Omission = does NOT affect Suspense (both sides were missing).",
        content: ``,
        mistakes: ["TRAP: The FULL debt (€1,125) goes to income, not just the €900 received. The remaining 20% (€225) is a new debtor on the Balance Sheet."]
      },
    ]
  },
  {
    id: "s2-sus-van-as-sale",
    type: "Suspense",
    name: "Van Disposal Entered as a Cash Sale",
    year: 2025,
    source: "2024 Q7(ii)",
    totalMarks: 15,
    category: "suspense",
    desc: "Delivery van (cost €20,000, BV €12,000) sold for €10,000 cash. Entered as €2,000 Dr Debtors and €1,200 Cr Sales. No other entries made. 2024 SEC Q7...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX..."],
    question: `<strong>Delivery van (cost €20,000, BV €12,000) sold for €10,000 cash.</strong> Entered as €2,000 Dr Debtors and €1,200 Cr Sales. No other entries made. <em>2024 SEC Q7</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. This is one of the most complex errors. A FIXED ASSET disposal was treated as if it were a sale of GOODS. The amounts are also wrong (€2,000 and €1,200 instead of €10,000). We need to: reverse the wrong entries, remove the van at cost, remove its accumulated depreciation, record the cash, and record the loss on disposal.Loss = Cost − Acc Dep − Proceeds = 20,000 − 8,000 − 10,000 = €2,000 loss.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Debtors: 2,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Sales: 1,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD have happened:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Cash/Bank (proceeds): 10,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Delivery Van (at cost): 20,000</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Provision for Depreciation: 8,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">P&L Loss on Disposal: 2,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX (SHOULD minus DID):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Sales (reverse Cr 1,200): 1,200</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Debtors (reverse Dr 2,000): 2,000</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Cash/Bank: 10,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Delivery Van (at cost): 20,000</td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Prov for Dep: 8,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">P&L Loss: 2,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense (balancing): 800</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Dr 800? DID: Dr side 2,000, Cr side 1,200. Difference = 800 (Dr > Cr by 800). This 800 was the original TB imbalance from this error.P&L: Sales reversed (−1,200 from income), Loss on disposal (−2,000). Net: profit DECREASES.BS: Van removed, Dep removed, Cash +10,000, Debtors −2,000.",
        content: ``,
        mistakes: ["TRAPS: (1) Van must be removed at COST (€20,000), not book value. (2) Acc dep must be removed too (€8,000). (3) The Suspense entry is the net one-sided difference from the WRONG entries (2,000 − 1,200 = 800)."]
      },
    ]
  },
  {
    id: "s2-sus-private-offset",
    type: "Suspense",
    name: "Private Debt Offset Against Business Debt",
    year: 2025,
    source: "2022 Q6(iii)",
    totalMarks: 12,
    category: "suspense",
    desc: "A private debt of €400, owed to Power, had been offset in full settlement against a business debt of €425 owed by Power for garden utensils. No entry ...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX..."],
    question: `<strong>A private debt of €400, owed to Power, had been offset in full settlement against a business debt of €425 owed by Power for garden utensils.</strong> No entry had been made. <em>2022 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. Power owes a CREDITOR €425 for garden utensils (business debt). Power is also owed €400 privately (someone owes HIM personally). The private debt offsets against the business debt. Difference = €25 = discount received (the creditor accepts €400 to settle €425).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen: Nothing. Complete omission.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors (clear business debt): 425</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Capital (private debt = drawings): 400</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Discount Received: 25</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX = the SHOULD entry. Dr Creditors 425, Cr Capital 400, Cr Discount 25.Marking scheme: Dr Creditors 1,660 [2], Cr Capital 1,500 [3], Cr Discount 160 [2].P&L: Discount received +€25 (increases profit). BS: Creditors −25, Capital +400 (private debt is effectively drawings from business). SUSPENSE: Error of Omission = does NOT affect Suspense.",
        content: ``,
        mistakes: ["KEY: The private debt is the owner's personal money used to clear a business debt. This = CAPITAL contribution (or reduce Drawings). The difference between the debts = Discount Received (P&L income)."]
      },
    ]
  },
  {
    id: "s2-sus-vat-purchase",
    type: "Suspense",
    name: "VAT on Credit Purchase — Wrong Sides & Amounts",
    year: 2025,
    source: "2024 Q6(ii)",
    totalMarks: 15,
    category: "suspense",
    desc: "Goods purchased on credit from a supplier for €4,000 plus VAT at 23%. The only entries were that the VAT inclusive figure (€4,920) was entered on the ...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX..."],
    question: `<strong>Goods purchased on credit from a supplier for €4,000 plus VAT at 23%.</strong> The only entries were that the VAT inclusive figure (€4,920) was entered on the debit side of the equipment account and the VAT exclusive figure (€4,000) was entered on the credit side of the supplier. <em>Variation from 2024 Q6, 2020, 2018</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate figures. Cost = €4,000. VAT = 23% × 4,000 = €920. Total inclusive = €4,920.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen (WRONG):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Equipment (incl VAT — wrong account): 4,920</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Supplier (excl VAT — too low): 4,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD have happened:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Purchases (excl VAT): 4,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Supplier/Creditors (incl VAT): 4,920</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">VAT: 920</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX (SHOULD minus DID):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Purchases: 4,000</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Equipment (reverse wrong Dr): 4,920</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">VAT: 920</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Supplier (extra €920 needed): 920</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 920</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Cr 920?DID: Dr 4,920, Cr 4,000. Difference = Dr > Cr by 920. So the TB had an excess €920 on the debit side. Suspense Cr 920 corrects this.P&L: Purchases +4,000 (decreases profit).BS: Equipment −4,920, VAT +920, Creditors +920.",
        content: ``,
        mistakes: ["TRAPS: (1) Equipment is WRONG account — should be Purchases. (2) Supplier had EXCLUSIVE figure — should be INCLUSIVE. (3) VAT was completely missed. (4) Three errors in one transaction = 3 things to fix."]
      },
    ]
  },
  {
    id: "s2-sus-equip-wrong-side",
    type: "Suspense",
    name: "Equipment on Credit — Wrong Side of Creditor + Wrong Account",
    year: 2025,
    source: "2020 Q6(iii)",
    totalMarks: 15,
    category: "suspense",
    desc: "Computer equipment bought on credit for €2,500 was entered on the incorrect side of the creditor's account and debited to the purchases account. These...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX:..."],
    question: `<strong>Computer equipment bought on credit for €2,500 was entered on the incorrect side of the creditor's account and debited to the purchases account.</strong> These were the only two entries. <em>2020 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. TWO errors: (A) Creditor was DEBITED instead of CREDITED (reversal = 2× amount). (B) Purchases was debited instead of Equipment (wrong account).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen (WRONG):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Purchases (wrong account): 2,500</td><td class="p-2 border border-border">(nothing on credit side)</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors (WRONG SIDE — should be Cr): 2,500</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD have happened:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment (correct account): 2,500</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors: 2,500</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment: 2,500</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Purchases (reverse wrong Dr): 2,500</td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 5,000</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors (reverse Dr + correct Cr): 5,000</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Dr 5,000?DID: Dr 2,500 (Purch) + Dr 2,500 (Cred wrong side) = Dr total 5,000. Cr total = 0.SHOULD: Dr 2,500 (Equip), Cr 2,500 (Cred). Balanced.The TB had 5,000 excess on debit side. Creditors needs a swing of 5,000 (reverse the Dr 2,500 AND add the correct Cr 2,500).P&L: Purchases reversed = profit INCREASES by €2,500. Equipment is a BS item (no P&L effect).",
        content: ``,
        mistakes: ["KEY: When a creditor is DEBITED instead of CREDITED, the swing is 2× the amount (€5,000 here). This is a REVERSAL error on the creditor's account."]
      },
    ]
  },
  {
    id: "s2-sus-equip-to-creditor",
    type: "Suspense",
    name: "Creditor Accepted Equipment as Debt Settlement",
    year: 2025,
    source: "2022 Q6(v)",
    totalMarks: 15,
    category: "suspense",
    desc: "A creditor owed €1,750 accepted equipment (BV €1,600, cost €3,500) in full settlement. The only entry made was that the creditor's account was credite...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX:..."],
    question: `<strong>A creditor owed €1,750 accepted equipment (BV €1,600, cost €3,500) in full settlement.</strong> The only entry made was that the creditor's account was credited with €1,750. <em>2022 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. Equipment given away to clear a debt. Profit on disposal = settlement value − BV = 1,750 − 1,600 = €150 profit. Acc dep on equipment = cost − BV = 3,500 − 1,600 = €1,900.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">(nothing on debit)</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors: 1,750</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen (full disposal):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors (clear debt): 1,750</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment (at cost): 3,500</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Provision for Depreciation: 1,900</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Profit on Disposal: 150</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Provision for Depreciation: 1,900</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Equipment (at cost): 3,500</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors (reverse Cr + correct Dr): 3,500</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Profit on Disposal: 150</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 1,750</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Cr 1,750? DID: Only Cr 1,750 (one-sided). SHOULD: balanced. The Cr 1,750 created a Cr excess in TB.P&L: Profit on disposal +€150 (increases profit).BS: Equipment −3,500, Acc Dep −1,900, Creditors −1,750 (debt cleared).",
        content: ``,
        mistakes: ["TRAPS: (1) The Cr 1,750 to creditors was the ONLY entry — but creditors should have been DEBITED (debt cleared). That's a swing of 3,500 (reverse 1,750 Cr + add 1,750 Dr). (2) Equipment removed at COST, not BV."]
      },
    ]
  },
  {
    id: "s2-sus-dishonoured-capital",
    type: "Suspense",
    name: "Dishonoured Cheque + Payment from Personal Bank",
    year: 2025,
    source: "2020 Q6(v)",
    totalMarks: 12,
    category: "suspense",
    desc: "A cheque for €920 in settlement of a €990 business debt was correctly recorded. However, no entry was made for the dishonouring of the cheque and the ...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Net effect on Creditors:..."],
    question: `<strong>A cheque for €920 in settlement of a €990 business debt was correctly recorded.</strong> However, no entry was made for the dishonouring of the cheque and the subsequent payment in full by the owner from a personal bank account. <em>2020 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. Original entry was correct: Dr Bank 920, Dr Discount 70, Cr Creditors 990. The cheque BOUNCED. Then the owner paid the FULL €990 from their PERSONAL bank (= Capital injection). Two omissions to fix.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen: Nothing recorded for the bounce or the personal payment.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen (for bounce)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">(Nothing recorded): —</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen:A: Reverse the bounced cheque: Dr Creditors 990, Cr Bank 920, Cr Discount 70.B: Record personal payment: Dr Creditors 990, Cr Capital 990.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Bank (reverse dishonoured): 920</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors: 990</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors: 990</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Capital (personal bank = new capital): 990</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Discount Allowed: 70</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Net effect on Creditors: +990 − 990 = 0 (debt reinstated then cleared again).P&L: Discount reversed −70 (was an expense, now reversed = increases profit... actually discount was income that needs reversing).BS: Bank −920, Capital +990.SUSPENSE: Error of Omission = does NOT affect Suspense.",
        content: ``,
        mistakes: ["KEY: Payment from PERSONAL bank = CAPITAL, not Business Bank. The discount must be reversed because the cheque bounced — the settlement was never completed."]
      },
    ]
  },
  {
    id: "s2-sus-rent-prepaid",
    type: "Suspense",
    name: "Rent Prepaid — Incorrect Calculation",
    year: 2025,
    source: "2024 Q6(iii)",
    totalMarks: 12,
    category: "suspense",
    desc: "An 18-month payment of €3,600 for rent of a warehouse commenced on 01/01/2023. The payment was recorded correctly but the prepaid figure was incorrect...",
    partSummary: ["Step 1 — Calculate...", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX:..."],
    question: `<strong>An 18-month payment of €3,600 for rent of a warehouse commenced on 01/01/2023.</strong> The payment was recorded correctly but the prepaid figure was incorrectly calculated. TB shows Expenses Prepaid €650. <em>2024 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Calculate the correct prepaid. Monthly rent = 3,600 ÷ 18 = €200/month. Year ended 31/12/2023 uses 12 months. Prepaid at year end = 6 months × 200 = €1,200. TB shows €650. Understated by €550.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen: Prepaid recorded as €650 (too low). Bank and Rent account were correct.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Rent Prepaid (BS): 650</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Rent (P&L): 650</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD have happened:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Rent Prepaid (BS): 1,200</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Rent (P&L): 1,200</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX: increase prepaid by €550. Dr Rent Prepaid 550, Cr Rent 550.P&L: Rent expense DECREASES by €550 (profit increases). BS: Rent prepaid increases by €550 (CA). SUSPENSE: Both sides adjusted equally = does NOT affect Suspense.",
        content: ``,
        mistakes: ["TRAP: This is a P&L/BS SPLIT error, not a one-sided error. The bank was correct, rent account was correct — only the prepaid SPLIT was wrong. No Suspense impact."]
      },
    ]
  },
  {
    id: "s2-sus-returns-partial",
    type: "Suspense",
    name: "Goods Returned — Only Credit Entry Made",
    year: 2025,
    source: "2022 Q6(i)",
    totalMarks: 15,
    category: "suspense",
    desc: "Goods previously sold to Savers Supermarket Ltd for €800 had been returned but entered as €80 on the credit side of the customer's account with no oth...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX:..."],
    question: `<strong>Goods previously sold to Savers Supermarket Ltd for €800 had been returned</strong> but entered as €80 on the credit side of the customer's account with no other entry being made. <em>2022 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. Customer returned €800 of goods. Only entry: Cr Debtors €80 (wrong amount AND incomplete — no Sales Returns entry). Two errors: wrong amount + missing debit.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">(nothing on debit)</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Debtors (wrong: €80 not €800): 80</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Sales Returns: 800</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors: 800</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Sales Returns: 800</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Debtors (extra €720 needed): 720</td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 80</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Dr 80? DID: Cr 80 (one-sided). SHOULD: Dr 800, Cr 800 (balanced). The Cr 80 created a Cr excess. Suspense Dr 80 reverses it. Debtors needs Cr 720 more (was Cr 80, should be Cr 800).P&L: Sales Returns +800 (decreases profit). BS: Debtors −800.",
        content: ``,
        mistakes: ["TRAP: Two errors combined: (1) Wrong amount (80 vs 800). (2) Missing debit (Sales Returns). The Suspense entry = the one-sided Cr 80 that was the only entry made."]
      },
    ]
  },
  {
    id: "s2-sus-repairs-insurance",
    type: "Suspense",
    name: "Repairs & Insurance — Credited to Wrong Accounts",
    year: 2025,
    source: "2020 Q6(iv)",
    totalMarks: 15,
    category: "suspense",
    desc: "Payments from the business bank for repairs €1,000 and insurance of private dwelling €750 were entered correctly in the bank account but respectively ...",
    partSummary: ["Step 1 — Understand....", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX:..."],
    question: `<strong>Payments from the business bank for repairs €1,000 and insurance of private dwelling €750</strong> were entered correctly in the bank account but respectively credited to creditors account and to the insurance account. <em>2020 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand. Bank was DEBITED correctly (payments). But: Repairs went Cr Creditors (should be Dr Repairs). Insurance went Cr Insurance (should be Dr Drawings — it's PRIVATE).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">(nothing extra on debit)</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors (wrong: should be Dr Repairs): 1,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Insurance (wrong: should be Dr Drawings): 750</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Repairs (business expense): 1,000</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Bank (already correct): 1,750</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Drawings (private insurance): 750</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors (reverse wrong Cr): 1,000</td><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 3,500</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Insurance (reverse wrong Cr): 750</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Repairs: 1,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Drawings: 750</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Cr 3,500? DID: Bank Cr 1,750 + Creditors Cr 1,000 + Insurance Cr 750 = Total Cr 3,500 excess. SHOULD: Bank Cr 1,750 only. The extra Cr 1,750 from wrong accounts needs reversing, PLUS the missing Dr 1,750 (Repairs + Drawings).P&L: Repairs +1,000 (decreases profit), Insurance reversed (no longer an expense). BS: Creditors +1,000, Drawings +750.",
        content: ``,
        mistakes: ["KEY: Private insurance = DRAWINGS, not a business expense. Repairs should have been DEBITED, not credited to creditors."]
      },
    ]
  },
  {
    id: "s2-sus-equip-purchases",
    type: "Suspense",
    name: "Equipment Purchased — Credit on Wrong Side + Debited to Purchases",
    year: 2025,
    source: "2020 Q6(i)",
    totalMarks: 15,
    category: "suspense",
    desc: "Equipment purchased on credit for €6,600 from P. Babb. Entered on the incorrect side of Babb's account as €6,060 and as €6,000 in the purchases accoun...",
    partSummary: ["Step 1 — THREE...", "Step 2 — DID...", "Step 3 — What...", "Step 4 — FIX..."],
    question: `<strong>Equipment purchased on credit for €6,600 from P. Babb.</strong> Entered on the incorrect side of Babb's account as €6,060 and as €6,000 in the purchases account. <em>2020 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — THREE errors in one. (A) Wrong account: Purchases instead of Equipment. (B) Wrong side: Babb debited instead of credited. (C) Wrong amounts: €6,060 and €6,000 instead of €6,600.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — DID happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What DID Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Babb (WRONG SIDE: should be Cr): 6,060</td><td class="p-2 border border-border">(nothing)</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Purchases (wrong account): 6,000</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — What SHOULD happen:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">What SHOULD Happen</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment: 6,600</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors: Babb: 6,600</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — FIX (from marking scheme):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Journal Entry (Fix)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment: 6,600</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors: Babb: 6,060</td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Suspense: 12,060</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Purchases: 6,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Creditors: Babb (correct entry): 6,600</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Why Suspense = Dr 12,060? DID: Dr 6,060 + Dr 6,000 = 12,060. Cr = 0. Huge debit excess. SHOULD: Dr 6,600, Cr 6,600 (balanced).P&L: Purchases reversed +6,000 (increases profit). Equipment is BS item (no P&L effect).",
        content: ``,
        mistakes: ["TRAP: When a creditor is on the WRONG SIDE, the fix is: reverse the wrong debit AND add the correct credit = 2× the amount swing. Plus the wrong account (Purchases) must be reversed."]
      },
    ]
  },
  {
    id: "s2-sus-tac-template",
    type: "Suspense",
    name: "Suspense Account T-Account (Template)",
    year: 2025,
    source: "Every Year",
    totalMarks: 9,
    category: "suspense",
    desc: "Show the Suspense Account. The opening balance is the TB difference. Only ONE-SIDED errors go through Suspense. Complete omissions, errors of principl...",
    partSummary: ["Step 1 — Which...", "Step 2 — The...", "Step 3 — The..."],
    question: `<strong>Show the Suspense Account.</strong> The opening balance is the TB difference. Only ONE-SIDED errors go through Suspense. Complete omissions, errors of principle, errors of commission, and compensating errors do NOT appear. <em>Required every year — 6-10 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Which errors affect Suspense?• AFFECTS: Entry on wrong side (reversal), wrong amount on one side, entry completely missing from one side, entry in Suspense itself.• DOES NOT AFFECT: Complete omission (both sides missing), Error of Principle (correct sides, wrong class), Error of Commission (correct class, wrong account), Compensating errors (cancel out).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — The T-Account:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Suspense Account</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Opening balance (if debits > credits): XXX</td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Opening balance (if credits > debits): XXX</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Entries that FIX the Cr side: XXX</td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Entries that FIX the Dr side: XXX</td></tr><tr><td class="p-2 border border-border font-bold bg-muted">: XXX</td><td class="p-2 border border-border font-bold bg-muted">: XXX</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — The account MUST balance to ZERO. The closing balance is always zero because once all errors are corrected, the TB balances. If it doesn't balance, you've missed an error or made a calculation mistake.",
        content: ``,
        mistakes: ["EXAM TIP: Part (b)(ii) often asks \"Explain why there is no closing balance.\" Answer: \"The suspense account is a temporary account that holds the TB difference. Once all errors are corrected through the suspense account, the account should be clear because the trial balance now agrees.\""]
      },
    ]
  },
  {
    id: "s2-sus-cnp-template",
    type: "Suspense",
    name: "Statement of Corrected Net Profit (Template)",
    year: 2025,
    source: "Every Year",
    totalMarks: 9,
    category: "suspense",
    desc: "Prepare the statement of corrected net profit. Start with original NP. Only adjust for errors that affect P&L accounts (expenses or income). BS-only e...",
    partSummary: ["Step 1 — Which...", "Step 2 — Layout:...", "Step 3 — Work..."],
    question: `<strong>Prepare the statement of corrected net profit.</strong> Start with original NP. Only adjust for errors that affect P&L accounts (expenses or income). BS-only errors do NOT change profit. <em>Required every year — 12-14 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Which errors change profit?CHANGES profit: Sales, Purchases, Returns, Expenses (rent, advertising, insurance, repairs), Bad debts recovered, Discount, Depreciation, Loss/Profit on disposal.DOES NOT change profit: Equipment, Debtors, Creditors, Bank, Cash, Drawings, Capital, VAT.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Layout:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Statement of Corrected Net Profit</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Original Net Profit: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">ADD (increases profit):</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Expense overstated (reduce it): XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Income understated (add it): XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Purchases reversed: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">LESS (decreases profit):</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Expense understated (add it): (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Income overstated (reduce it): (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">New expense discovered: (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">: (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">CORRECTED NET PROFIT: XXX</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Work through each error systematically. For each error ask: \"Does this change an expense or income?\" If YES, it changes profit. If it only moves items between BS accounts (equipment, creditors, debtors, bank), it does NOT change profit.",
        content: ``,
        mistakes: ["COMMON ADDS: Purchases reversed, Bad debts recovered, Rent prepaid (expense reduced), Discount received, Sales understated.COMMON LESS: New expenses (advertising, repairs, insurance), Loss on disposal, Sales reversed, Discount allowed."]
      },
    ]
  },
  {
    id: "s2-sus-cbs-template",
    type: "Suspense",
    name: "Corrected Balance Sheet (Template)",
    year: 2025,
    source: "Every Year",
    totalMarks: 9,
    category: "suspense",
    desc: "Prepare the corrected balance sheet. Take every BS figure from the original and adjust for each error. Remember: Corrected Net Profit replaces the ori...",
    partSummary: ["Step 1 — Every...", "Step 2 — Key...", "The BS MUST balance...."],
    question: `<strong>Prepare the corrected balance sheet.</strong> Take every BS figure from the original and adjust for each error. Remember: Corrected Net Profit replaces the original. <em>Required every year — 20-22 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Every BS item may need adjusting. Go through each error and note which BS accounts change:• Fixed Assets: equipment added/removed, delivery vans, acc dep• Current Assets: debtors, cash, bank, stock, prepaid• Current Liabilities: creditors, bank OD, VAT, expenses due• Capital section: capital ± private payments, corrected NP, drawings",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Key adjustments to watch for:• Equipment: +/− at COST (show cost and dep separately)• Debtors: ± new debtors, ± bad debt adjustments (deduct Suspense if \"Debtors including Suspense\")• Creditors: ± per journal entries (deduct Suspense if \"Creditors including Suspense\")• Drawings: + private expenses (insurance, rent from private bank)• Net Profit: use the CORRECTED figure from part (c)",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Corrected Balance Sheet Layout</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Fixed Assets (at cost ± adj): XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Less Acc Dep (± adj): (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">NBV: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Current Assets (± adj): XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Less CL (± adj): (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Total Assets less CL: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Capital: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">+ Corrected Net Profit: XXX</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">− Drawings (± adj): (XXX)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">Capital Employed: XXX</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "The BS MUST balance. If it doesn't, check: (1) Did you use corrected NP? (2) Did you adjust drawings for private items? (3) Did you remove Suspense from debtors/creditors?",
        content: ``,
        mistakes: ["KEY: If the question says \"Debtors (including suspense)\" then the Suspense balance is INSIDE the debtors figure. You must subtract it. Same for \"Creditors (including suspense).\""]
      },
    ]
  },
  {
    id: "s2-club-accfund",
    type: "Club",
    name: "Accumulated Fund — Full Asset & Liability Statement",
    year: 2025,
    source: "Part (a)",
    totalMarks: 18,
    category: "club",
    desc: "Show the Accumulated Fund on 01/01/2021. Assets: Clubhouse €950,000 (cost), Equipment €42,000 (cost), Bar Stock €1,820, Bar Debtors €560, Life Members...",
    partSummary: ["Step 1 — Why...", "Step 2 — Calculate...", "Step 3 — Two...", "Step 4 — List..."],
    question: `<strong>Show the Accumulated Fund on 01/01/2021.</strong> Assets: Clubhouse €950,000 (cost), Equipment €42,000 (cost), Bar Stock €1,820, Bar Debtors €560, Life Membership €48,000, Levy Reserve €50,000, Bar Creditors €700, Subs in advance €1,000, Wages due €440, Investment income due €420. All FA have 3 years dep at 01/01. <em>2022 SEC Q7 — 30 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why do we need the Accumulated Fund? A club has no \"Capital\" account like a sole trader. Instead, the Accumulated Fund is the club’s net worth at the start of the year. It’s calculated as: Total Assets − Total Liabilities. Think of it as the club’s \"opening equity.\"You MUST list every single asset and liability given in the question. Missing one = lost marks (1-2 marks each). The marking scheme awards marks for EVERY line item individually.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate fixed asset NBVs FIRST. The question says \"3 years dep accumulated at 01/01.\" This means you need to work backwards:Clubhouse: 950,000 × 2% × 3 = 57,000 dep. NBV = 950,000 − 57,000 = €893,000 [4 marks]Equipment: 42,000 × 12.5% × 3 = 15,750 dep. NBV = 42,000 − 15,750 = €26,250 [4 marks]These go in the Assets column at their NBV, not cost. The marking scheme shows the calculation (cost − dep) beside each one.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Two items need WORKINGS before they can appear here.Investments (W5): The question gives investment income received (€1,050 for 10 months) and the rate (5%). You must reverse-engineer the investment value = €25,200 (see W5 working). This goes in Assets.Loan (W8): The question gives a combined loan + interest repayment (€273,480). You must extract the loan amount = €258,000 and interest due = €5,160 (see W8 working). Both go in Liabilities.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Step 4 — List ALL assets (from marking scheme):",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Assets at 01/01/2021</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Clubhouse (950k − 57k): 893,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Equipment (42k − 15.75k): 26,250</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">5% Investments (W5): 25,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Investment Income due: 420</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bar Stock: 1,820</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bar Debtors: 560</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400 font-semibold">Levy due (30 members overdue): 3,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank: 9,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">TOTAL ASSETS: 960,050</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 5",
        marks: 0,
        explain: "Step 5 — List ALL liabilities:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Liabilities at 01/01/2021</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Life Membership: 48,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Levy Reserve Fund: 50,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Loan (W8): 258,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Loan Interest due (W8): 5,160</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Subs in advance: 1,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Wages due: 440</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bar Creditors: 700</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">TOTAL LIABILITIES: 363,300</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 6",
        marks: 0,
        explain: "ACCUMULATED FUND = 960,050 − 363,300 = €596,750This figure appears in the closing Balance Sheet under \"Financed By: Accumulated Fund/Capital.\"",
        content: ``,
        mistakes: ["COMMONLY MISSED ITEMS: (1) Levy due from previous year = ASSET (members who owe money TO the club). (2) Investment income due = ASSET. (3) Subs in advance = LIABILITY (received but not yet earned). (4) Loan interest due = separate LIABILITY from the loan itself. (5) Fixed assets at NBV not cost. (6) Investments need a working — the value is NOT given directly."]
      },
    ]
  },
  {
    id: "s2-club-invest",
    type: "Club",
    name: "Investment Value (Reverse from Partial Income)",
    year: 2025,
    source: "W5",
    totalMarks: 12,
    category: "club",
    desc: "10 months interest on 5% investments received: €1,050. Investment income due at 01/01: €420. Find the investment value, annual income, and closing inc...",
    partSummary: ["Step 1 — Why...", "Step 2 — Marking...", "Step 3 — Gross...", "Results:\\u2022 Investment value (BS):..."],
    question: `<strong>10 months interest on 5% investments received: €1,050. Investment income due at 01/01: €420.</strong> Find the investment value, annual income, and closing income due. <em>2022 SEC Q7 W5</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why is this tricky? The R&P shows €1,050 cash received — but this includes the €420 that was owed from LAST year (opening investment income due). So the €1,050 is NOT all current-year income. We must strip out the old amount first.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Marking scheme method:Cash received: €1,050Less: opening amount due: (€420)= €630 of CURRENT YEAR income actually received.But €630 only covers SOME months of the year (not all 12). The interest was received \"for 10 months\" — meaning the payment covered 10 months total. Subtracting the 4 months from last year (the €420 opening due) leaves 6 months of current year income = €630.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Gross up to full year:6 months = €630 → 12 months = 630 × 2 = €1,260 annual income.Find investment value:1,260 = 5% of investmentInvestment = 1,260 ÷ 0.05 = €25,200",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Results:\u2022 Investment value (BS): €25,200 (Financial Assets)\u2022 I&E income: €1,260 (full year)\u2022 Closing income due: 1,260 − 630 = €630 (or 25,200 × 5% × 6/12 = €630)The closing amount due becomes a Current Asset on the Balance Sheet.",
        content: ``,
        mistakes: ["FORMULA: (Cash received − Opening due) × (12 ÷ months covered) = Annual income. Annual income ÷ rate = Investment value. This replaces the T-account method and is how the SEC marking scheme presents it."]
      },
    ]
  },
  {
    id: "s2-club-subs",
    type: "Club",
    name: "Subscriptions (Linear List — SEC Method)",
    year: 2025,
    source: "W6",
    totalMarks: 9,
    category: "club",
    desc: "Subscriptions received (R&P): €425,500. Includes: subs for 2022 €3,160 (in advance), levy 2021 on 650 members × €100, levy 2020 on 30 members × €100. ...",
    partSummary: ["Step 1 — Why...", "Step 2 — The...", "Where does everything go?\\u2022..."],
    question: `<strong>Subscriptions received (R&P): €425,500.</strong> Includes: subs for 2022 €3,160 (in advance), levy 2021 on 650 members × €100, levy 2020 on 30 members × €100. Opening subs in advance: €1,000. <em>2022 SEC Q7 W6 — 6 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why can’t we just use €425,500? Because the R&P figure includes items that are NOT ordinary membership subscriptions. The levies go to the Levy Reserve Fund (a separate BS item), and the advance subs belong to NEXT year. We need to strip out everything that isn’t 2021 subscription income.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — The linear list (marking scheme method):The SEC does NOT use a Subscriptions T-account. Instead, a simple addition/subtraction list:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Subscriptions Working</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Received per R&P: 425,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">+ Prepaid b/d (last year’s advance is THIS year’s income): 1,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">− Prepaid c/d (2022 subs received early): (3,160)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">− Levy 2021 (650 × €100): (65,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">− Levy 2020 overdue (30 × €100): (3,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">I&E SUBSCRIPTIONS: 355,340</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where does everything go?\u2022 I&E: Subscriptions €355,340\u2022 BS — Levy Reserve Fund: 50,000 (opening) + 65,000 (2021 levy) = €115,000 (in \"Financed By\")\u2022 BS — Subs prepaid (CL): €3,160 (current liability)",
        content: ``,
        mistakes: ["RULES: (1) Levies → Levy Reserve Fund (BS), NOT I&E. (2) Life memberships → separate Life Membership account, NOT subs. (3) Subs in advance = liability (received but not yet earned). (4) Subs in arrears = asset (earned but not yet received) — but the SEC rarely includes arrears in modern papers."]
      },
    ]
  },
  {
    id: "s2-club-loan",
    type: "Club",
    name: "Loan + Interest Backdating (Division Method)",
    year: 2025,
    source: "W8",
    totalMarks: 12,
    category: "club",
    desc: "Bank loan and 9 months interest at 8% p.a. repaid on 30/06/2021: €273,480. 2022 SEC Q7 W8 — 3 marks...",
    partSummary: ["Step 1 — Why...", "Step 2 — Find...", "Step 3 — Split...", "Summary of destinations:\\u2022 Opening..."],
    question: `<strong>Bank loan and 9 months interest at 8% p.a. repaid on 30/06/2021: €273,480.</strong> <em>2022 SEC Q7 W8 — 3 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why is this a working? The R&P shows ONE combined payment of €273,480. But this includes BOTH the loan repayment AND the interest. We need to separate them because: (A) The loan goes to the opening BS as a liability. (B) The interest is split between the opening BS (months before 01/01) and the I&E (months after 01/01).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Find the loan (division method):Interest rate for 9 months = 8% × 9/12 = 6%.The combined payment = 106% of the loan.Loan = 273,480 ÷ 1.06 = €258,000Total interest = 273,480 − 258,000 = €15,480.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Split the interest by time period.Repaid 30/06/2021. Loan was for 9 months → started 01/10/2020.Monthly interest = 15,480 ÷ 9 = €1,720/month.Before 01/01/2021 (Oct, Nov, Dec 2020 = 3 months):3 × 1,720 = €5,160 → Opening BS liability (interest due).After 01/01/2021 (Jan\u2013Jun 2021 = 6 months):6 × 1,720 = €10,320 → I&E expense.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Summary of destinations:\u2022 Opening BS: Loan €258,000 (liability) + Interest due €5,160 (CL)\u2022 I&E: Loan interest €10,320 (expense)\u2022 Closing BS: Both = €0 (fully repaid 30/06/2021)",
        content: ``,
        mistakes: ["THE FORMULA: Combined ÷ (1 + rate × months/12) = Loan. No algebra needed. The SEC marking scheme uses this exact method: \"8% × 9/12 = 6%, 106% = 273,480, 100% = 258,000.\" Then split interest by counting months before and after 01/01."]
      },
    ]
  },
  {
    id: "s2-club-bar",
    type: "Club",
    name: "Bar Trading Account (Debtors & Creditors Adjustment)",
    year: 2025,
    source: "W9",
    totalMarks: 12,
    category: "club",
    desc: "Bar Receipts €73,600. Opening debtors €560, closing €780. Opening creditors €700, closing €1,100. Opening stock €1,820, closing €10,240. Bar purchases...",
    partSummary: ["Step 1 — Why...", "Step 2 — Find...", "Step 4 — Build...", "Bar Profit = €38,040..."],
    question: `<strong>Bar Receipts €73,600. Opening debtors €560, closing €780. Opening creditors €700, closing €1,100. Opening stock €1,820, closing €10,240. Bar purchases paid €43,800.</strong> <em>2022 SEC Q7 W9</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why can’t we use R&P figures directly? The Receipts & Payments account shows CASH movements only. But if the bar sells on credit (bar debtors exist) or buys on credit (bar creditors exist), the actual sales/purchases differ from the cash received/paid. We must adjust to find the TRUE sales and TRUE purchases on an accruals basis.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Find actual bar sales:Cash received €73,600− Opening debtors €560 (cash from last year’s sales)+ Closing debtors €780 (this year’s sales not yet collected)= €73,820 actual salesStep 3 — Find actual bar purchases:Cash paid €43,800− Opening creditors €700 (paying last year’s purchases)+ Closing creditors €1,100 (this year’s purchases not yet paid)= €44,200 actual purchases",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 4 — Build the Bar Trading Account:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bar Trading Account</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Bar Sales (adjusted)</td><td class="p-2 border border-border">Opening stock: 1,820</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">: 73,820</td><td class="p-2 border border-border">Purchases (adjusted): 44,200</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Less closing stock: (10,240)</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Cost of Sales: (35,780)</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">BAR PROFIT: 38,040</td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Bar Profit = €38,040 → I&E income line.The closing bar stock (€10,240) and bar debtors (€780) are Current Assets on the BS. Bar creditors (€1,100) is a Current Liability.",
        content: ``,
        mistakes: ["ADJUSTMENT FORMULA: Actual figure = Cash − Opening balance + Closing balance. This works for BOTH sales (using debtors) and purchases (using creditors). If there are NO debtors/creditors, just use the R&P cash figures directly."]
      },
    ]
  },
  {
    id: "s2-club-wages",
    type: "Club",
    name: "Coaching Expenses & Wages (with Bonus)",
    year: 2025,
    source: "W10",
    totalMarks: 9,
    category: "club",
    desc: "R&P coaching expenses: €15,540. Opening wages due: €440 (2 weeks). Closing: provide for 3 weeks due with €30 bonus per week for each of the 3 weeks. 2...",
    partSummary: ["Step 1 — What’s...", "Step 2 — Calculate...", "Step 3 — I&E..."],
    question: `<strong>R&P coaching expenses: €15,540. Opening wages due: €440 (2 weeks). Closing: provide for 3 weeks due with €30 bonus per week for each of the 3 weeks.</strong> <em>2022 SEC Q7 W10</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What’s happening here? The R&P shows cash paid to coaches (€15,540). But the I&E needs the EXPENSE for the year, which differs from cash because: (A) Some of the cash paid was for wages owed from LAST year (opening due). (B) Some wages earned THIS year haven’t been paid yet (closing due). We adjust using the accruals formula.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate closing wages due.First, find the normal weekly wage: Opening due was €440 for 2 weeks → weekly = 440 ÷ 2 = €220.Closing due = 3 weeks × (normal wage + bonus) = 3 × (220 + 30) = 3 × 250 = €750.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — I&E expense:I&E = Cash paid − Opening due + Closing due= 15,540 − 440 + 750 = €15,850I&E: Coaching expenses €15,850.BS: Wages due €750 (current liability).",
        content: ``,
        mistakes: ["ACCRUALS FORMULA: I&E = Cash paid − Opening due + Closing due. This is the universal formula for converting any R&P cash figure to an I&E accruals figure. Works for wages, insurance, rent, sundry expenses — ANY expense with opening/closing amounts due or prepaid."]
      },
    ]
  },
  {
    id: "s2-club-life",
    type: "Club",
    name: "Life Membership Annual Write-Off",
    year: 2025,
    source: "W11",
    totalMarks: 9,
    category: "club",
    desc: "Opening Life Membership €48,000. New: €12,000 received during 2021. Written off over 10 years from 2019. 2022 SEC Q7 W11...",
    partSummary: ["Step 1 — What...", "Step 2 — Calculate...", "Results:\\u2022 I&E income: €6,000..."],
    question: `<strong>Opening Life Membership €48,000. New: €12,000 received during 2021. Written off over 10 years from 2019.</strong> <em>2022 SEC Q7 W11</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What is life membership? Members pay a one-off lump sum for lifetime membership instead of annual subs. But the club can’t recognise the FULL amount as income in year 1 — that would overstate income. Instead, it’s spread (amortised) over a set period, typically 10 years. The annual portion goes to I&E income. The unearned balance stays on the BS as a long-term liability.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate annual write-off.Total life membership = 48,000 + 12,000 = €60,000.Marking scheme: (60,000 − 12,000) ÷ 8 = €6,000 per year.Why ÷ 8? The existing €48,000 started in 2019 (10-year period). By 2021, 2 years are done (2019, 2020). 8 years remain. The new €12,000 is added and the total remaining is spread over the remaining 8 years.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Results:\u2022 I&E income: €6,000 (annual write-off credited to I&E)\u2022 BS: Life Membership = 48,000 + 12,000 − 6,000 = €54,000 − previous write-offs. Shown in \"Financed By\" (long-term obligation, NOT a current liability).",
        content: ``,
        mistakes: ["KEY: Life membership is DEFERRED INCOME (like rent received in advance). Only the annual slice goes to I&E. The rest stays on the BS. Some questions say \"credited to income over 10 years commencing in [year]\" — this tells you WHEN to start counting."]
      },
    ]
  },
  {
    id: "s2-club-dep",
    type: "Club",
    name: "Equipment Depreciation (Year of Acquisition/Disposal Rule)",
    year: 2025,
    source: "W1",
    totalMarks: 9,
    category: "club",
    desc: "Equipment dep at 12.5% of cost. Full year in year of acquisition, none in year of disposal. Opening €42,000. Purchased €47,000 (mid-year). Disposed eq...",
    partSummary: ["Step 1 — Understand...", "Step 2 — Calculate:Opening...", "Both go to I&E..."],
    question: `<strong>Equipment dep at 12.5% of cost. Full year in year of acquisition, none in year of disposal.</strong> Opening €42,000. Purchased €47,000 (mid-year). Disposed equipment cost €30,000. <em>2022 SEC Q7 W1</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understand the depreciation policy. \"Full year in year of acquisition\" means NEW equipment gets a full year’s dep even if bought in December. \"None in year of disposal\" means SOLD equipment gets zero dep this year, even if sold in December. This is a common SEC policy — always read it carefully as some questions use the opposite.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate:Opening equipment (full year): (42,000 − 30,000) = 12,000 still owned. 12,000 × 12.5% = €1,500.New equipment (full year per policy): 47,000 × 12.5% = €5,875.Disposed equipment: €0 (none in year of disposal).Total equipment dep = 1,500 + 5,875 = €7,375.Clubhouse dep = 950,000 × 2% = €19,000.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Both go to I&E as expenses:\u2022 Depreciation: Equipment €7,375\u2022 Depreciation: Clubhouse €19,000\u2022 Total dep charge = €26,375",
        content: ``,
        mistakes: ["WATCH OUT: If the policy says \"charged from month of acquisition, none in month of disposal\" then you must apportion by MONTHS. 47,000 × 12.5% × 6/12 = €2,937.50 for a mid-year purchase. Always check which policy the question uses."]
      },
    ]
  },
  {
    id: "s2-svc-loan",
    type: "Service",
    name: "Loan Amount (Division Method)",
    year: 2025,
    source: "W2",
    totalMarks: 12,
    category: "service",
    desc: "Repayment of bank loan plus 16 months interest at 3% p.a. on 01/08/2022: €83,200. 2023 SEC Q7 W2...",
    partSummary: ["Step 1 — What’s...", "Step 2 — Division...", "Step 3 — Split...", "Destinations:\\u2022 Opening BS: Loan..."],
    question: `<strong>Repayment of bank loan plus 16 months interest at 3% p.a. on 01/08/2022: €83,200.</strong> <em>2023 SEC Q7 W2</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What’s the problem? The R&P shows ONE combined figure (€83,200) that includes both the loan repayment AND the accumulated interest. The SEC does not separate these for you — you must extract them. The loan goes to the opening BS. The interest splits between opening BS (months before 01/01) and I&E (months after 01/01).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Division method (SEC marking scheme):Rate for period = 3% × 16/12 = 4%Combined = 104% of loanLoan = 83,200 ÷ 1.04 = €80,000Interest = 83,200 − 80,000 = €3,200 for 16 monthsMonthly = 3,200 ÷ 16 = €200/month",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Split interest by period.Loan started 16 months before 01/08/2022 = 01/04/2021.Months before 01/01/2022: Apr\u2013Dec 2021 = 9 months.Opening BS interest due = 9 × 200 = €1,800.Months in 2022: Jan\u2013Jul = 7 months.I&E interest charge = 7 × 200 = €1,400.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Destinations:\u2022 Opening BS: Loan €80,000 (liability) + Interest due €1,800 (CL)\u2022 I&E expense: Loan interest €1,400\u2022 Closing BS: Both €0 (fully repaid)",
        content: ``,
        mistakes: ["IDENTICAL METHOD to Club loans. The formula works for any loan: Combined ÷ (1 + rate × months/12) = Loan. Then monthly interest = total ÷ months. Count months before and after 01/01 to split between BS and I&E."]
      },
    ]
  },
  {
    id: "s2-svc-invest",
    type: "Service",
    name: "Investment Value (from Partial-Year Income)",
    year: 2025,
    source: "W1/W5",
    totalMarks: 9,
    category: "service",
    desc: "Interest on 4% investments received: €1,600. Investment income due at opening: €800. 2023 SEC Q7 W1...",
    partSummary: ["Step 1 — Same...", "Step 2 — SEC...", "Results:\\u2022 Investment value (BS):..."],
    question: `<strong>Interest on 4% investments received: €1,600. Investment income due at opening: €800.</strong> <em>2023 SEC Q7 W1</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Same principle as Club investments. The cash received (€1,600) includes the opening amount owed (€800). Strip it out first to find the current-year income received in cash. Then gross up to a full year and divide by the rate.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — SEC marking scheme method:1,600 × 3 = 4,800. Why × 3? The €1,600 covers 4 months of the current year. Multiplying by 3 gives 12 months (4 × 3 = 12).4,800 ÷ 0.04 = €120,000 investment value.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Results:\u2022 Investment value (BS): €120,000\u2022 I&E income: 120,000 × 4% = €4,800\u2022 Closing income due: €4,000 (6 months unpaid)",
        content: ``,
        mistakes: ["IDENTICAL METHOD to Club investments. Strip opening due → identify months covered → gross up to 12 months → divide by rate. This same technique appears in Club AND Service every time investments are mentioned."]
      },
    ]
  },
  {
    id: "s2-svc-supplies",
    type: "Service",
    name: "Supplies Consumed (5-Item Linear Formula)",
    year: 2025,
    source: "W9",
    totalMarks: 12,
    category: "service",
    desc: "Dental supplies: Cash paid (R&P) €31,500. Opening stock €7,000. Closing stock €1,800. Opening creditors €3,000. Closing creditors €3,800. 2023 SEC Q7 ...",
    partSummary: ["Step 1 — Why...", "Step 2 — Five-item...", "Step 3 — Why...", "I&E: Purchases of dental..."],
    question: `<strong>Dental supplies: Cash paid (R&P) €31,500. Opening stock €7,000. Closing stock €1,800. Opening creditors €3,000. Closing creditors €3,800.</strong> <em>2023 SEC Q7 W9</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why not just use €31,500? The R&P shows cash paid to suppliers. But the actual COST of supplies used differs because: (A) We used some opening stock (cost from last year). (B) We have closing stock left over (not yet used). (C) We owe more/less to creditors than last year (accruals adjustment). The linear formula handles ALL of these in one step.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Five-item formula (SEC marking scheme):Cash paid: 31,500+ Opening stock: +7,000− Opening creditors: −3,000− Closing stock: −1,800+ Closing creditors: +3,800= €37,500 supplies consumed.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Why does each adjustment work?\u2022 + Opening stock: We had €7,000 of supplies at the start that we used this year but didn’t pay for this year.\u2022 − Opening creditors: Some of the cash we paid was for LAST year’s supplies (clearing old debts), not this year’s.\u2022 − Closing stock: We paid for supplies we haven’t used yet — remove them.\u2022 + Closing creditors: We received supplies we haven’t paid for yet — add them back.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "I&E: Purchases of dental supplies = €37,500.This single formula replaces what would otherwise need a Creditors Control T-Account AND a Trading Account. The SEC marking scheme uses this method consistently.",
        content: ``,
        mistakes: ["MEMORY AID: Cash + Opening stock − Opening creditors − Closing stock + Closing creditors. Remember: opening items are ADDED if assets, SUBTRACTED if liabilities. Closing items are the OPPOSITE."]
      },
    ]
  },
  {
    id: "s2-svc-wages",
    type: "Service",
    name: "Wages Split (Secretary Clinic vs Shop)",
    year: 2025,
    source: "W11",
    totalMarks: 9,
    category: "service",
    desc: "Total wages €72,000 includes €26,000 for secretary who also runs the shop. 30% of secretary salary attributable to shop. Also split: €1,150 insurance,...",
    partSummary: ["Step 1 — Why...", "Step 2 — Wages...", "The shop gets: Wages..."],
    question: `<strong>Total wages €72,000 includes €26,000 for secretary who also runs the shop.</strong> 30% of secretary salary attributable to shop. Also split: €1,150 insurance, €1,500 light & heat, €600 telephone to shop. <em>2023 SEC Q7</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why split? Service firms with a shop (common for dentists, vets, pharmacists) must show a separate SHOP PROFIT/LOSS calculation. The secretary works in both the clinic and shop, so their salary must be allocated proportionally. Same for shared expenses like insurance, heating, and telephone.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Wages calculation:Secretary to shop: 26,000 × 30% = €7,800 (goes to Shop P&L).Clinic wages: 72,000 − 7,800 = €64,200 (goes to I&E).Other splits for shop:\u2022 Insurance: €1,150 (to shop), remainder to I&E\u2022 Light & heat: €1,500 (to shop), remainder to I&E\u2022 Telephone: €600 (to shop), remainder to I&E",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "The shop gets: Wages €7,800 + Insurance €1,150 + L&H €1,500 + Telephone €600 = €11,050 total shop expenses.The main I&E gets the REMAINDER of each expense after the shop portion is deducted.",
        content: ``,
        mistakes: ["EXAM TIP: Part (b) specifically asks for \"Profit/Loss from the shop.\" You must calculate this separately: Shop Sales − Shop Cost of Sales − Shop Expenses = Shop Profit. The shop expenses are the split portions calculated here."]
      },
    ]
  },
  {
    id: "s2-svc-bank",
    type: "Service",
    name: "Bank Balance (Multiple Adjustments)",
    year: 2025,
    source: "W20",
    totalMarks: 9,
    category: "service",
    desc: "Closing bank per R&P: €142,000. Bank charges €90 not recorded. Dishonoured cheque €950 from patient. 2023 SEC Q7 W20...",
    partSummary: ["Step 1 — Why...", "Step 2 — Adjusted...", "Where does everything go?\\u2022..."],
    question: `<strong>Closing bank per R&P: €142,000. Bank charges €90 not recorded. Dishonoured cheque €950 from patient.</strong> <em>2023 SEC Q7 W20</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why adjust the bank? The R&P closing balance (€142,000) doesn’t account for (A) bank charges deducted by the bank but not yet recorded in the books, or (B) cheques that bounced after being deposited. Both reduce the actual bank balance.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Adjusted bank:R&P balance: 142,000− Bank charges: (90) → this is ALSO an I&E expense− Dishonoured cheque: (950) → this becomes a DEBTORCorrected bank = €140,960",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Where does everything go?\u2022 BS: Bank = €140,960 (reduced)\u2022 I&E: Bank fees €90 (new expense)\u2022 BS: Fees due from patients: +€950 (new debtor — patient still owes the money)The dishonoured cheque does NOT affect income. The fee was earned when the service was provided. The patient simply hasn’t paid yet.",
        content: ``,
        mistakes: ["KEY PRINCIPLE: A dishonoured cheque means: (1) REDUCE bank (money returned by bank). (2) INCREASE debtors (patient still owes). (3) Do NOT reduce income. If the question mentions \"contact was made with the patient to re-present the cheque\" — this confirms the debt is still valid."]
      },
    ]
  },
  {
    id: "s2-pub-patent",
    type: "Published",
    name: "Patent Amortisation (in Cost of Sales)",
    year: 2025,
    source: "Working A",
    totalMarks: 12,
    category: "published",
    desc: "Patent acquired 01/01/2018 for €171,000, amortised over 9 years in equal instalments. To be included in cost of sales. 2023 Navan plc (vi)...",
    partSummary: ["Step 1 — What...", "Step 2 — Calculate:Annual...", "Step 3 — Patent...", "Also appears in Note..."],
    question: `<strong>Patent acquired 01/01/2018 for €171,000, amortised over 9 years in equal instalments. To be included in cost of sales.</strong> <em>2023 Navan plc (vi)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What is patent amortisation? A patent is an intangible fixed asset. Like depreciation on tangible assets, patents are \"used up\" over their useful life. The annual charge is called amortisation (same concept, different name). The SEC question tells you WHERE to put it — \"included in cost of sales\" means it goes in Working A, not admin.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate:Annual amortisation = 171,000 ÷ 9 = €19,000 per year.This is added to Cost of Sales in Working A (alongside purchases, opening stock, closing stock).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Patent value on the Balance Sheet:Patent acquired 01/01/2018. Current year end = 31/12/2022 (5th year).Total amortised to date: 19,000 × 5 = 95,000.BS value = 171,000 − 95,000 = €76,000 (shown as Intangible Assets).After this year’s charge: 76,000 − 19,000 = €57,000 (if needed for next year).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Also appears in Note 2 (Operating Profit):\"Operating profit is arrived at after charging: Patents amortised €19,000.\"This is a DISCLOSURE note — it tells shareholders what charges reduced profit. Similar to depreciation disclosure.",
        content: ``,
        mistakes: ["PLACEMENT RULES: \"Included in cost of sales\" → Working A. \"Included in administrative expenses\" → Working C. \"Included in distribution costs\" → Working B. Always check the instruction — the SEC varies the placement."]
      },
    ]
  },
  {
    id: "s2-pub-commission",
    type: "Published",
    name: "Commission Earned (Extract from Distribution)",
    year: 2025,
    source: "Working D",
    totalMarks: 9,
    category: "published",
    desc: "Included in distribution expenses is €14,000 for commission earned. 2023 Goodwin plc (iv)...",
    partSummary: ["Step 1 — Why...", "Step 2 — The...", "This is one of..."],
    question: `<strong>Included in distribution expenses is €14,000 for commission earned.</strong> <em>2023 Goodwin plc (iv)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why extract it? Commission earned is INCOME, but it’s been lumped in with distribution costs (an expense). Leaving it there would: (A) overstate distribution costs by €14,000, and (B) miss €14,000 of income. Extracting it corrects BOTH problems, which is why it has a double impact on Operating Profit.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — The adjustment:Distribution Costs (Working B): REMOVE €14,000 (costs fall by 14k).Other Operating Income (Working D): ADD €14,000 (income rises by 14k).Net effect on Operating Profit: +€28,000.Costs down 14k = +14k to profit. Income up 14k = +14k to profit. Total = +28k.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "This is one of the highest-value adjustments in Published Accounts. A single extraction creates a €28,000 swing in Operating Profit. Students who miss this lose significant marks because the P&L, BS, and all notes will cascade from this error.",
        content: ``,
        mistakes: ["OTHER COMMON EXTRACTIONS: Patent royalties received (extract from admin → Other Operating Income). Profit on sale of land (extract from admin → show separately below Operating Profit). Rental income (extract from wherever it’s \"included in\"). The key phrase is always \"included in [expense category] is...\""]
      },
    ]
  },
  {
    id: "s2-pub-vehicles-rb",
    type: "Published",
    name: "Vehicle Dep (Reducing Balance vs Straight Line)",
    year: 2025,
    source: "Note 3",
    totalMarks: 12,
    category: "published",
    desc: "Buildings at 2% straight line. Delivery vans at 20% reducing balance. Vans cost €150,000, acc dep €27,000. 2023 Navan plc (v)...",
    partSummary: ["Step 1 — Two...", "Step 2 — Calculate...", "Step 3 — Split...", "Note 3 (Tangible Fixed..."],
    question: `<strong>Buildings at 2% straight line. Delivery vans at 20% reducing balance.</strong> Vans cost €150,000, acc dep €27,000. <em>2023 Navan plc (v)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Two different depreciation methods in one question. This is standard for Published Accounts. Buildings use straight line (same charge every year). Vehicles use reducing balance (charge decreases each year). You MUST use the correct method for each asset class.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Calculate each:Buildings (Straight Line): 2% × COST.If cost = 750,000 (before disposal): 750,000 × 2% = €15,000.After disposal of land: buildings remain at cost. Dep = €15,000 (or adjusted if buildings changed).Vehicles (Reducing Balance): 20% × NBV.NBV = 150,000 − 27,000 = €123,000.Dep charge = 20% × 123,000 = €24,600.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Split depreciation between Distribution and Admin.The question says: \"20% to distribution costs and 80% to administrative expenses.\"Buildings dep €15,000: Distribution = 3,000, Admin = 12,000.Vehicles dep €24,600: likely ALL to distribution (delivery vans = distribution asset).These split figures go into the relevant workings.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Note 3 (Tangible Fixed Assets grid):Shows Cost, Acc Dep, and NBV for each asset class at start and end of year. Must account for: additions, disposals, revaluations. This is a standard grid format — practise drawing it.",
        content: ``,
        mistakes: ["CRITICAL: Straight Line = % × COST. Reducing Balance = % × NBV. If you use cost for reducing balance, you get a HIGHER (wrong) answer. The two methods give the same answer only in year 1."]
      },
    ]
  },
  {
    id: "s2-pub-wages-split",
    type: "Published",
    name: "Wages & Expenses Split (Distribution vs Admin)",
    year: 2025,
    source: "Working B/C",
    totalMarks: 12,
    category: "published",
    desc: "Wages €71,000: 40% admin, 60% distribution. Also: directors’ fees €25,500, auditors’ fees €19,500, corporation tax €55,000. 2023 Navan plc...",
    partSummary: ["Step 1 — Where...", "Step 2 — Fixed...", "Step 3 — Split...", "Note 2 (Operating Profit)..."],
    question: `<strong>Wages €71,000: 40% admin, 60% distribution. Also: directors’ fees €25,500, auditors’ fees €19,500, corporation tax €55,000.</strong> <em>2023 Navan plc</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Where does each item go? Published Accounts require expenses to be classified into Cost of Sales, Distribution Costs, Administrative Expenses, or Other Operating Income/Charges. Some items are always in the same category. Others must be split per the question’s instructions.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Fixed placements (ALWAYS the same):\u2022 Directors’ fees €25,500: ALWAYS Admin (Working C) + Note 2\u2022 Auditors’ fees €19,500: ALWAYS Admin (Working C) + Note 2\u2022 Corporation tax €55,000: ALWAYS below Operating Profit (after interest)\u2022 Legal fees: ALWAYS Admin\u2022 Advertising: ALWAYS Distribution",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Split items (per question instructions):Wages: Distribution (B) = 71,000 × 60% = €42,600. Admin (C) = 71,000 × 40% = €28,400.Building dep: per question split ratio.Insurance: per question split ratio.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "Note 2 (Operating Profit) must list:\u2022 Depreciation €XXX\u2022 Patents amortised €XXX\u2022 Auditors’ remuneration €19,500\u2022 Directors’ remuneration €25,500These are DISCLOSURE items required by the Companies Acts.",
        content: ``,
        mistakes: ["EXAM TIP: The Published P&L has a specific ORDER: Turnover → Cost of Sales → Gross Profit → Distribution → Admin → Other Operating Income/Charges → Operating Profit → Investment Income → Interest Payable → Profit before Tax → Tax → Retained Profit. Every item must go in the RIGHT place."]
      },
    ]
  },
  {
    id: "s2-pub-contingent",
    type: "Published",
    name: "Contingent Liability (Lawsuit — Disclose vs Provide)",
    year: 2025,
    source: "Note 5",
    totalMarks: 9,
    category: "published",
    desc: "Company sued for €94,000 unfair dismissal. Legal advisors: unlikely compensation will be paid. Legal fees invoice €7,500 received. 2023 Navan plc (vii...",
    partSummary: ["Step 1 — What...", "Step 2 — Apply...", "Note 5 wording: The company..."],
    question: `<strong>Company sued for €94,000 unfair dismissal. Legal advisors: unlikely compensation will be paid. Legal fees invoice €7,500 received.</strong> <em>2023 Navan plc (vii)</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What is a contingent liability? It’s a possible obligation that depends on a future event (the court case outcome). The accounting treatment depends on the PROBABILITY:\u2022 Probable: Make a provision (Dr P&L, Cr Provision for Liabilities). This reduces profit AND appears on the BS.\u2022 Possible but not probable: DISCLOSE in notes only. No provision. No P&L impact.\u2022 Remote: Ignore completely.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Apply to this question.\"Legal advisors state it is unlikely compensation will have to be paid\" = possible but not probable.→ DISCLOSE ONLY in Note 5. Do NOT make a provision for €94,000.However, the legal fees of €7,500 ARE a real, definite expense regardless of the lawsuit outcome.→ €7,500 goes to Administrative Expenses (Working C).",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Note 5 wording:\"The company is being sued by a former employee for €94,000 for unfair dismissal. The company’s legal advisors have stated that as all proper procedures were followed in the course of the dismissal, it is unlikely that any compensation will have to be paid to the former employee. No provision has been made in these accounts.\"",
        content: ``,
        mistakes: ["KEYWORDS: \"Unlikely\" / \"remote\" / \"improbable\" = disclose only. \"Probable\" / \"likely\" / \"expected\" = make a provision. The SEC tests this distinction regularly. Also: legal FEES are always an expense, even if you win the case."]
      },
    ]
  },
  {
    id: "s2-cf-recon",
    type: "Cash Flow",
    name: "Reconciliation — Operating Profit to Cash from Operations",
    year: 2025,
    source: "Section 1",
    totalMarks: 12,
    category: "cashflow",
    desc: "Operating Profit €205,410. Dep €45,000. Profit on disposal €14,000. Patent amortisation €10,000. Bad debt provision increase €450. Stock +17,600. Debt...",
    partSummary: ["Step 1 — Why...", "Step 2 — Non-cash...", "Step 3 — Working...", "€209,380 feeds into Section..."],
    question: `<strong>Operating Profit €205,410. Dep €45,000. Profit on disposal €14,000. Patent amortisation €10,000. Bad debt provision increase €450. Stock +17,600. Debtors +15,000. Creditors −4,880.</strong> <em>2024 SEC Q6 — 25 marks</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Why do we need this reconciliation? Operating Profit is calculated on an ACCRUALS basis (matching income and expenses to the period they relate to). But the Cash Flow Statement needs the actual CASH generated. They differ because: (A) Some expenses don’t involve cash (depreciation, amortisation, provisions). (B) Profits on disposal include the full gain but the cash is shown separately. (C) Working capital changes (stock, debtors, creditors) tie up or release cash.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Non-cash adjustments:",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Non-Cash Items</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Operating Profit: 205,410</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">ADD: Depreciation (no cash left): 45,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">ADD: Patent amortisation (non-cash): 10,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">ADD: Bad debt provision increase: 450</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">LESS: Profit on disposal: (14,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Adjusted profit: 246,860</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Working capital changes.The logic: if STOCK increases, the company spent cash buying stock = cash OUTFLOW. If DEBTORS increase, customers owe MORE = cash NOT yet received = cash OUTFLOW. If CREDITORS decrease, the company PAID suppliers faster = cash OUTFLOW.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Working Capital Changes</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Stock increase (cash spent buying): (17,600)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Debtors increase (cash not received): (15,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Creditors decrease (cash paid faster): (4,880)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border font-bold bg-muted">NET CASH FROM OPERATIONS: 209,380</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "€209,380 feeds into Section 1 of the Cash Flow Statement.MEMORY AID for working capital:\u2022 Assets UP (stock/debtors) = cash OUT (subtract)\u2022 Assets DOWN = cash IN (add)\u2022 Liabilities UP (creditors) = cash IN (add)\u2022 Liabilities DOWN = cash OUT (subtract)",
        content: ``,
        mistakes: ["WHY subtract profit on disposal? The €14,000 profit is already in Operating Profit. But the actual cash (€35,000 proceeds) appears in Section 4. If we leave the profit here AND show the proceeds in Section 4, we’d double-count. So we remove the profit here and show the full cash in Section 4."]
      },
    ]
  },
  {
    id: "s2-cf-fa-purchases",
    type: "Cash Flow",
    name: "Find Cash Paid for Fixed Assets",
    year: 2025,
    source: "Section 4",
    totalMarks: 9,
    category: "cashflow",
    desc: "Fixed assets at cost: Opening €610,000, Closing €730,000. Disposal at cost €60,000. Revaluation increase on land. 2024 SEC Q6...",
    partSummary: ["Step 1 — What’s...", "Step 2 — T-Account...", "Section 4: Payments to..."],
    question: `<strong>Fixed assets at cost: Opening €610,000, Closing €730,000. Disposal at cost €60,000. Revaluation increase on land.</strong> <em>2024 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — What’s the problem? The BS shows opening and closing FA values, but we need to find how much CASH was spent on NEW assets. The change in value includes: additions (cash), disposals (removed), and revaluations (non-cash). We must separate the cash portion.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — T-Account method:Closing cost + Disposals (at cost) − Opening cost = Total additions.730,000 + 60,000 − 610,000 = €180,000 total additions.But if €25,000 was a revaluation (non-cash):Cash paid = 180,000 − 25,000 = €155,000.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Section 4: Payments to acquire tangible fixed assets = €(155,000)The €25,000 revaluation appears NOWHERE in the cash flow statement because it’s not cash. It affects the BS (Revaluation Reserve +25,000) but not cash.",
        content: ``,
        mistakes: ["ALWAYS CHECK FOR: (1) Revaluations (non-cash — deduct). (2) Extensions to buildings (cash — include). (3) \"No purchase or sale of buildings during the year\" — if cost changed, the difference must be an extension or revaluation. (4) Disposals must be at COST when calculating additions, not at NBV."]
      },
    ]
  },
  {
    id: "s2-cf-disposal",
    type: "Cash Flow",
    name: "Disposal Proceeds (Cash Inflow)",
    year: 2025,
    source: "Section 4",
    totalMarks: 9,
    category: "cashflow",
    desc: "Plant cost €60,000 was sold for €35,000. Acc dep on the asset = €25,000. 2024 SEC Q6...",
    partSummary: ["Step 1 — Understanding...", "Step 2 — What...", "The reason for this..."],
    question: `<strong>Plant cost €60,000 was sold for €35,000.</strong> Acc dep on the asset = €25,000. <em>2024 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Understanding the disposal.Cost: €60,000Acc dep: €25,000NBV: 60,000 − 25,000 = €35,000.Sold for: €35,000.Profit/Loss = 35,000 − 35,000 = €0. (In this case, no profit or loss. But if sold for €35,000 with NBV €49,000, loss = €14,000.)",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — What goes where in the Cash Flow Statement?\u2022 Section 1 (Reconciliation): Profit on disposal is SUBTRACTED (or loss is ADDED). This removes the non-cash element.\u2022 Section 4: The ACTUAL CASH received (€35,000) is shown as an inflow.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "The reason for this split: We want to show the FULL cash inflow in one place (Section 4) without double-counting any part of it. The reconciliation adjustment ensures the profit/loss doesn’t inflate/deflate the operating cash figure.",
        content: ``,
        mistakes: ["GOLDEN RULE: Section 4 always shows PROCEEDS (cash received). Never cost. Never NBV. The profit/loss is handled in Section 1. If you mix these up, you’ll double-count or miss cash."]
      },
    ]
  },
  {
    id: "s2-cf-tax-div",
    type: "Cash Flow",
    name: "Interest, Tax & Dividends Paid",
    year: 2025,
    source: "Sections 2/3/5",
    totalMarks: 12,
    category: "cashflow",
    desc: "Interest payable: Opening €9,210, Closing €8,750. P&L charge €25,200. Tax: Opening €29,440, paid in full. Dividends paid €32,000. 2024 SEC Q6...",
    partSummary: ["Step 1 — These...", "Step 2 — Interest...", "Step 3 — Tax...", "All are shown as..."],
    question: `<strong>Interest payable: Opening €9,210, Closing €8,750. P&L charge €25,200. Tax: Opening €29,440, paid in full. Dividends paid €32,000.</strong> <em>2024 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — These three items each have their own section in the Cash Flow Statement. For each, we need to find the actual CASH paid during the year, which may differ from the P&L charge.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Interest paid (Section 2):Use the T-Account/formula: Opening due + P&L charge − Closing due = Cash paid.= 9,210 + 25,200 − 8,750 = €25,660 paid.Why? The €25,200 charge is the EXPENSE for the year. But we paid off last year’s outstanding interest (€9,210) and didn’t pay this year’s closing balance (€8,750) yet.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Step 3 — Tax paid (Section 3):\"Tax due on 31/12/2022 was paid in full\" = Opening balance = €29,440 paid.The current year’s tax charge (€23,450) will be paid NEXT year — it’s not cash yet.Step 4 — Dividends paid (Section 5):\"Dividends paid during the year amounted to €32,000\" = already a cash figure = €32,000.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Cash Flow Sections</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">S2: Interest Paid: (25,660)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">S3: Tax Paid: (29,440)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">S5: Dividends Paid: (32,000)</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 4",
        marks: 0,
        explain: "All are shown as outflows (negative/brackets).The T-Account formula: Cash paid = Opening + Charge − Closing. This works for interest, tax, and dividends. If \"paid in full during the year\" = just use the opening figure.",
        content: ``,
        mistakes: ["COMMON MISTAKE: Using the P&L charge (€25,200) as the cash paid for interest. The P&L charge is the EXPENSE for the year. The CASH paid also includes paying off last year’s outstanding amount and excludes this year’s unpaid portion."]
      },
    ]
  },
  {
    id: "s2-cf-financing",
    type: "Cash Flow",
    name: "Liquid Resources & Financing (Shares, Debentures)",
    year: 2025,
    source: "Sections 7/8",
    totalMarks: 9,
    category: "cashflow",
    desc: "50,000 shares issued at €1.20 (nominal €1). Debentures redeemed €70,000. Government securities purchased €30,000. 2024 SEC Q6...",
    partSummary: ["Step 1 — Management...", "Step 2 — Financing...", "Final calculation: Decrease in..."],
    question: `<strong>50,000 shares issued at €1.20 (nominal €1). Debentures redeemed €70,000. Government securities purchased €30,000.</strong> <em>2024 SEC Q6</em>`,
    steps: [
      {
        title: "Step 1",
        marks: 0,
        explain: "Step 1 — Management of Liquid Resources (Section 7).Liquid resources = short-term investments that can be quickly converted to cash (government securities, quoted investments held as liquid assets). Purchasing them = cash OUTFLOW. Selling them = cash INFLOW.Government securities purchased: €(30,000) outflow.",
        content: ``,
        mistakes: []
      },
      {
        title: "Step 2",
        marks: 0,
        explain: "Step 2 — Financing (Section 8).Share issue: 50,000 shares × €1.20 = €60,000 total received.Split: Nominal (50,000 × €1) = €50,000 → Financing inflow.Premium (50,000 × €0.20) = €10,000 → Financing inflow (separate line).Debenture redemption: €(70,000) outflow.",
        content: `<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Financing Section</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Receipts from share issue: 50,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400 font-semibold">Share premium received: 10,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400 font-semibold">Repayment of debentures: (70,000)</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Net Financing: (10,000)</td><td class="p-2 border border-border"></td></tr></tbody></table>`,
        mistakes: []
      },
      {
        title: "Step 3",
        marks: 0,
        explain: "Final calculation: Decrease in Cash.Sum ALL sections:S1 Operating: 209,380S2 Interest: (25,660)S3 Tax: (29,440)S4 Capital: (120,000) [including disposal proceeds]S5 Dividends: (32,000)S7 Liquid Resources: (30,000)S8 Financing: (10,000)Total = Decrease/Increase in Cash.CHECK: This should equal: Closing bank − Opening bank (or vice versa for overdraft changes).",
        content: ``,
        mistakes: ["SECTIONS IN ORDER: 1. Operating Activities → 2. Returns on Investment (interest) → 3. Taxation → 4. Capital Expenditure → 5. Equity Dividends → 6. (Acquisitions — rare) → 7. Liquid Resources → 8. Financing → Decrease/Increase in Cash. This order is FIXED by the accounting standard."]
      },
    ]
  },
];
