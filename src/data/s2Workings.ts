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
  // ═══════════════════════════════════════════════════
  // SUSPENSE (14)
  // ═══════════════════════════════════════════════════
  {
    id:"s2-bad-debt-recovered-reinstated",type:"Suspense",name:"Bad Debt Recovered — Debtor Reinstated",year:2024,source:"2024 Q7(i)",totalMarks:8,category:"suspense",
    desc:"A debtor whose debt was previously written off paid 80% of the original debt. Full debt must be reinstated as income.",
    partSummary:["Find original debt","Reinstate debtor","Record bank","Suspense effect"],
    question:`<p><strong>€900 received from V. Mullen</strong>, debtor whose debt was previously written off. This represents 80% of the original debt. Debtor will pay the remainder by January. No entry made.</p>`,
    steps:[
      {title:"Step 1 — Find Original Debt",marks:2,explain:"€900 = 80% of original. Original = 900 ÷ 0.80 = €1,125. The full €1,125 must be reinstated as bad debt recovered (income).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Amount received</td><td class="p-2 border border-border text-right font-mono">900</td></tr><tr><td class="p-2 border border-border">Percentage paid</td><td class="p-2 border border-border text-right">80%</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Original debt</td><td class="p-2 border border-border text-right font-mono">1,125</td></tr></tbody></table>`,mistakes:["Only recording the €900 received — the full debt must be reinstated"]},
      {title:"Step 2 — Double Entry",marks:3,explain:"Debit Bank €900 (cash received). Debit Debtors €225 (balance still owed). Credit Bad Debts Recovered €1,125 (P&L income).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border text-right font-mono">900</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Debtors (V. Mullen)</td><td class="p-2 border border-border text-right font-mono">225</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bad Debts Recovered (P&L)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,125</td></tr></tbody></table>`,mistakes:["Not reinstating the 20% balance as a debtor"]},
      {title:"Step 3 — Effect on Suspense",marks:1,explain:"Both sides posted correctly (2 debits = 1 credit). This is a complete omission — does NOT affect suspense.",content:`<p class="text-sm">No effect on suspense — this was a complete omission (nothing was recorded).</p>`,mistakes:[]},
      {title:"Step 4 — Effect on Profit",marks:2,explain:"Net Profit increases by €1,125 (bad debt recovered is income). Debtors increase by €225. Bank increases by €900.",content:`<p class="text-sm"><strong>NP ↑ €1,125</strong> (income). Debtors ↑ €225. Bank ↑ €900.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-van-disposal-cash-sale",type:"Suspense",name:"Van Disposal Entered as a Cash Sale",year:2024,source:"2024 Q7(ii)",totalMarks:10,category:"suspense",
    desc:"A van sold was incorrectly recorded as a cash sale. Must reverse the sale and record proper disposal.",
    partSummary:["Reverse cash sale","Disposal account","Loss/profit","Suspense effect","NP effect"],
    question:`<p>A delivery van (cost €28,000, acc. dep €18,000) was sold for <strong>€8,500</strong>. The €8,500 was debited to Bank and credited to <strong>Sales</strong> instead of being treated as a disposal.</p>`,
    steps:[
      {title:"Step 1 — Reverse the Incorrect Entry",marks:2,explain:"Sales was credited €8,500 — wrong. Debit Sales €8,500 to remove it.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Sales</td><td class="p-2 border border-border text-right font-mono">8,500</td><td class="p-2 border border-border"></td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 2 — Calculate NBV & Disposal",marks:3,explain:"NBV = 28,000 − 18,000 = €10,000. Sold for €8,500. Loss = €1,500.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Disposal A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Cost: 28,000</td><td class="p-2 border border-border">Acc Dep: 18,000</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border">Bank: 8,500</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border font-bold text-red-600">Loss: 1,500</td></tr></tbody></table>`,mistakes:["Using selling price as NBV"]},
      {title:"Step 3 — Correct Entries",marks:2,explain:"Credit Delivery Vans (cost) €28,000. Debit Acc Dep €18,000. Debit Loss on Disposal €1,500. Credit Sales reversal €8,500.",content:`<p class="text-sm">Remove van from books: Vans ↓ €28,000, Acc Dep ↓ €18,000. Record loss €1,500 in P&L (S&D).</p>`,mistakes:[]},
      {title:"Step 4 — Suspense Effect",marks:1,explain:"Original entry: Dr Bank ✓, Cr Sales ✓ — both sides posted. This doesn't affect suspense. It's an error of principle.",content:`<p class="text-sm">Error of principle — does NOT affect suspense.</p>`,mistakes:[]},
      {title:"Step 5 — Effect on NP",marks:2,explain:"Sales ↓ €8,500 → GP ↓ €8,500. Loss on disposal ↑ €1,500 → NP ↓ €1,500. Total NP effect: ↓ €10,000.",content:`<p class="text-sm"><strong>NP ↓ €10,000</strong> (Sales reversed €8,500 + Loss recorded €1,500)</p>`,mistakes:["Forgetting both the sales reversal AND the loss"]}
    ]
  },
  {
    id:"s2-private-debt-offset-s2",type:"Suspense",name:"Private Debt Offset Against Business Debt",year:2022,source:"2022 Q6(iii)",totalMarks:8,category:"suspense",
    desc:"Owner's private debtor is also a business creditor. Offset the amounts and record the entry.",
    partSummary:["Understand offset","Journal entry","Suspense effect","NP effect"],
    question:`<p>Walsh is a creditor for <strong>€4,200</strong>. Walsh owes the owner <strong>€1,800</strong> privately. The private debt was offset but only creditors was debited — no other entry was made. Suspense was credited with €1,800.</p>`,
    steps:[
      {title:"Step 1 — What Should Have Happened",marks:2,explain:"Debit Creditors €1,800. Credit Capital/Drawings €1,800. Only the debit was posted, so suspense was credited to balance.",content:`<p class="text-sm">Correct entry: Dr Creditors €1,800, Cr Capital €1,800. Only Dr was done → Suspense Cr €1,800.</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Debit Suspense €1,800 (to clear it). Credit Capital/Drawings €1,800 (the missing credit).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Suspense</td><td class="p-2 border border-border text-right font-mono">1,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Capital</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,800</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Suspense Effect",marks:1,explain:"Suspense had a credit balance of €1,800. Now debited €1,800 — cleared.",content:`<p class="text-sm">Suspense: Cr €1,800 cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"No P&L accounts involved. Capital increases, Creditors decrease. NP unchanged.",content:`<p class="text-sm"><strong>NP: No effect.</strong> This is a BS-only adjustment.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-vat-credit-purchase",type:"Suspense",name:"VAT on Credit Purchase — Wrong Sides & Amounts",year:2024,source:"2024 Q6(ii)",totalMarks:10,category:"suspense",
    desc:"A credit purchase with VAT was recorded with debits and credits reversed and amounts wrong.",
    partSummary:["Correct entry","What was done","Difference","Suspense","NP effect"],
    question:`<p>A credit purchase of <strong>€6,150 (VAT inclusive at 23%)</strong> was recorded as: Dr Creditors €6,150, Cr Purchases €5,000, Cr VAT €1,150. Everything is reversed and VAT is wrong.</p>`,
    steps:[
      {title:"Step 1 — Calculate Correct Figures",marks:2,explain:"VAT inclusive = €6,150. VAT = 6,150 × 23/123 = €1,150. Net = €5,000. Correct entry: Dr Purchases €5,000, Dr VAT €1,150, Cr Creditors €6,150.",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Inclusive amount</td><td class="p-2 border border-border text-right font-mono">6,150</td></tr><tr><td class="p-2 border border-border">VAT (23/123)</td><td class="p-2 border border-border text-right font-mono">1,150</td></tr><tr><td class="p-2 border border-border">Net purchase</td><td class="p-2 border border-border text-right font-mono">5,000</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 2 — Compare What Was Done vs Correct",marks:3,explain:"What was done: Dr Creditors 6,150, Cr Purchases 5,000, Cr VAT 1,150. What's correct: Dr Purchases 5,000, Dr VAT 1,150, Cr Creditors 6,150. Everything is reversed.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Should be</th><th class="p-2 border border-border">Was done</th><th class="p-2 border border-border">Fix needed</th></tr></thead><tbody><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border">Dr 5,000</td><td class="p-2 border border-border">Cr 5,000</td><td class="p-2 border border-border">Dr 10,000</td></tr><tr><td class="p-2 border border-border">VAT</td><td class="p-2 border border-border">Dr 1,150</td><td class="p-2 border border-border">Cr 1,150</td><td class="p-2 border border-border">Dr 2,300</td></tr><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border">Cr 6,150</td><td class="p-2 border border-border">Dr 6,150</td><td class="p-2 border border-border">Cr 12,300</td></tr></tbody></table>`,mistakes:["Only reversing once — need to reverse AND re-enter (double the amount)"]},
      {title:"Step 3 — Correcting Entry",marks:2,explain:"Dr Purchases €10,000. Dr VAT €2,300. Cr Creditors €12,300.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border text-right font-mono">10,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">VAT</td><td class="p-2 border border-border text-right font-mono">2,300</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">12,300</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 4 — Suspense Effect",marks:1,explain:"Original: Dr 6,150, Cr 6,150. TB balanced. No suspense effect — this is a reversal error.",content:`<p class="text-sm">No suspense effect — debits equalled credits in the wrong entry.</p>`,mistakes:[]},
      {title:"Step 5 — NP Effect",marks:2,explain:"Purchases ↑ €10,000 → GP ↓ €10,000 → NP ↓ €10,000.",content:`<p class="text-sm"><strong>NP ↓ €10,000</strong> (Purchases increases by €10,000)</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-equipment-credit-wrong",type:"Suspense",name:"Equipment on Credit — Wrong Side of Creditor + Wrong Account",year:2020,source:"2020 Q6(iii)",totalMarks:10,category:"suspense",
    desc:"Equipment bought on credit was debited to Purchases and the creditor was debited instead of credited.",
    partSummary:["Identify errors","Correct entry","Suspense","NP effect","BS effect"],
    question:`<p>Equipment bought on credit for <strong>€4,800</strong>. Entry made: Dr Purchases €4,800, Dr Creditors €4,800. Should be: Dr Equipment €4,800, Cr Creditors €4,800.</p>`,
    steps:[
      {title:"Step 1 — Identify Two Errors",marks:2,explain:"(1) Wrong account debited: Purchases instead of Equipment. (2) Creditors debited instead of credited — wrong side.",content:`<p class="text-sm">Two errors: wrong account (Purchases not Equipment) + wrong side (Creditors Dr not Cr).</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Dr Equipment €4,800. Cr Purchases €4,800. Cr Creditors €9,600 (reverse the Dr of 4,800 and post the correct Cr of 4,800).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Equipment</td><td class="p-2 border border-border text-right font-mono">4,800</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">4,800</td></tr><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">9,600</td></tr><tr><td class="p-2 border border-border">Suspense</td><td class="p-2 border border-border text-right font-mono">9,600</td><td class="p-2 border border-border"></td></tr></tbody></table>`,mistakes:["Only correcting one of the two errors"]},
      {title:"Step 3 — Suspense",marks:2,explain:"Original: Dr 9,600 (Purchases + Creditors), Cr 0. TB imbalanced by €9,600. Suspense Cr €9,600. Now Dr Suspense €9,600 to clear.",content:`<p class="text-sm">Suspense Cr €9,600 → cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Purchases ↓ €4,800 → GP ↑ €4,800 → NP ↑ €4,800.",content:`<p class="text-sm"><strong>NP ↑ €4,800</strong></p>`,mistakes:[]},
      {title:"Step 5 — BS Effect",marks:1,explain:"Equipment ↑ €4,800 (FA). Creditors ↑ €9,600 (CL).",content:`<p class="text-sm">Equipment ↑ €4,800. Creditors ↑ €9,600 (was Dr, now Cr).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-creditor-equipment-settlement",type:"Suspense",name:"Creditor Accepted Equipment as Debt Settlement",year:2022,source:"2022 Q6(v)",totalMarks:10,category:"suspense",
    desc:"A creditor accepted equipment in full settlement. Disposal of equipment and clearing of creditor.",
    partSummary:["NBV calculation","Disposal","Creditor cleared","Profit/Loss","Suspense"],
    question:`<p>Equipment (cost €12,000, acc dep €8,000) given to a creditor in full settlement of <strong>€5,500</strong>. Only entry: Dr Creditors €5,500, Cr Suspense €5,500.</p>`,
    steps:[
      {title:"Step 1 — Calculate NBV",marks:1,explain:"NBV = 12,000 − 8,000 = €4,000. Settlement value = €5,500. Profit on disposal = 5,500 − 4,000 = €1,500.",content:`<p class="text-sm">NBV = €4,000. Proceeds (debt cleared) = €5,500. <strong>Profit = €1,500.</strong></p>`,mistakes:[]},
      {title:"Step 2 — Correct Full Entry",marks:3,explain:"Dr Creditors €5,500 (already done ✓). Cr Equipment (cost) €12,000. Dr Acc Dep €8,000. Cr Profit on Disposal €1,500.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Acc Dep — Equipment</td><td class="p-2 border border-border text-right font-mono">8,000</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Equipment (Cost)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">12,000</td></tr><tr><td class="p-2 border border-border">Profit on Disposal (P&L)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,500</td></tr><tr><td class="p-2 border border-border">Suspense</td><td class="p-2 border border-border text-right font-mono">5,500</td><td class="p-2 border border-border"></td></tr></tbody></table>`,mistakes:["Forgetting the profit/loss on disposal"]},
      {title:"Step 3 — Suspense",marks:2,explain:"Suspense had Cr €5,500. Now Dr €5,500 to clear.",content:`<p class="text-sm">Suspense cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Profit on disposal ↑ €1,500 → NP ↑ €1,500.",content:`<p class="text-sm"><strong>NP ↑ €1,500</strong></p>`,mistakes:[]},
      {title:"Step 5 — BS Effect",marks:2,explain:"Equipment ↓ €4,000 (NBV removed). Creditors ↓ €5,500.",content:`<p class="text-sm">Equipment (NBV) ↓ €4,000. Creditors ↓ €5,500.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-dishonoured-personal",type:"Suspense",name:"Dishonoured Cheque + Payment from Personal Bank",year:2020,source:"2020 Q6(v)",totalMarks:8,category:"suspense",
    desc:"A cheque bounced and the owner paid the debt from a personal account. Two entries needed.",
    partSummary:["Reverse cheque","Reinstate debtor","Owner payment","Suspense"],
    question:`<p>A cheque for <strong>€2,800</strong> from debtor K. Byrne bounced. The owner paid the debt from a <strong>personal bank account</strong>. Only the dishonour was recorded (Dr Debtors, Cr Bank).</p>`,
    steps:[
      {title:"Step 1 — Dishonour Already Recorded",marks:1,explain:"Dr Debtors €2,800, Cr Bank €2,800 — correct for the dishonour. ✓",content:`<p class="text-sm">Dishonour entry is correct. Debtor reinstated, bank reduced.</p>`,mistakes:[]},
      {title:"Step 2 — Owner's Personal Payment",marks:3,explain:"Owner paid from personal funds = Capital Introduced. Dr Debtors is cleared. Entry: Dr Debtors (Cr to clear) — wait, the debtor is being paid off. Dr Bank €2,800 (business receives), Cr Capital €2,800 (owner introduces). Then Dr Debtors — no, the debtor was paid by the owner. So: clear the debtor by crediting Debtors. The source is the owner's personal money = capital.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Capital (introduced)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">2,800</td></tr><tr><td class="p-2 border border-border">Debtors (K. Byrne)</td><td class="p-2 border border-border text-right font-mono"></td><td class="p-2 border border-border text-right font-mono">2,800</td></tr><tr><td class="p-2 border border-border">Suspense</td><td class="p-2 border border-border text-right font-mono">2,800</td><td class="p-2 border border-border"></td></tr></tbody></table>`,mistakes:["Debiting bank — the payment came from the owner's PERSONAL bank, not business bank"]},
      {title:"Step 3 — Suspense",marks:2,explain:"The personal payment wasn't recorded at all. If only one side was posted to balance, suspense has the difference.",content:`<p class="text-sm">Suspense cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"No P&L accounts affected. Capital ↑, Debtors ↓. NP unchanged.",content:`<p class="text-sm"><strong>NP: No effect.</strong></p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-rent-prepaid-incorrect",type:"Suspense",name:"Rent Prepaid — Incorrect Calculation",year:2024,source:"2024 Q6(iii)",totalMarks:8,category:"suspense",
    desc:"Rent prepaid was calculated incorrectly. Fix the prepayment figure and adjust P&L.",
    partSummary:["Correct prepayment","Adjust rent","Suspense","NP effect"],
    question:`<p>Rent of <strong>€18,000 p.a.</strong> paid quarterly in advance. TB: Rent €22,500. Prepaid was recorded as €3,000 but should be <strong>€4,500</strong>. Difference of €1,500 in suspense.</p>`,
    steps:[
      {title:"Step 1 — Correct Figures",marks:2,explain:"Rent paid = €22,500 (5 quarters). Annual = €18,000. Correct prepaid = 22,500 − 18,000 = €4,500. Was recorded as €3,000. Under-stated by €1,500.",content:`<p class="text-sm">Correct prepaid: €4,500. Recorded: €3,000. Fix: increase prepaid by €1,500.</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Dr Prepayments €1,500. Cr Rent (P&L) €1,500. And clear Suspense.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Prepayments</td><td class="p-2 border border-border text-right font-mono">1,500</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Rent (P&L)</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">1,500</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Suspense",marks:1,explain:"Suspense balance of €1,500 cleared.",content:`<p class="text-sm">Suspense cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Rent ↓ €1,500 → NP ↑ €1,500.",content:`<p class="text-sm"><strong>NP ↑ €1,500</strong></p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-goods-returned-credit",type:"Suspense",name:"Goods Returned — Only Credit Entry Made",year:2022,source:"2022 Q6(i)",totalMarks:10,category:"suspense",
    desc:"Returns inwards were recorded but only the credit to debtors was posted. The debit to Returns was omitted.",
    partSummary:["What happened","Missing entry","Suspense","Effect on TB","NP effect"],
    question:`<p>Goods of <strong>€3,400</strong> were returned by a customer. Only entry: Cr Debtors €3,400. The debit to Returns Inwards was omitted.</p>`,
    steps:[
      {title:"Step 1 — What Should Have Happened",marks:2,explain:"Dr Returns Inwards €3,400, Cr Debtors €3,400. Only the credit was posted.",content:`<p class="text-sm">Missing: Dr Returns Inwards €3,400.</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Dr Returns Inwards €3,400 (the missing debit). Cr Suspense €3,400 (clear the imbalance).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Returns Inwards</td><td class="p-2 border border-border text-right font-mono">3,400</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Suspense</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">3,400</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Suspense",marks:2,explain:"Credits exceeded debits by €3,400. Suspense had Dr €3,400. Now Cr €3,400 to clear.",content:`<p class="text-sm">Suspense: Dr €3,400 cleared. ✓</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Returns Inwards ↑ €3,400 → Net Sales ↓ → GP ↓ €3,400 → NP ↓ €3,400.",content:`<p class="text-sm"><strong>NP ↓ €3,400</strong></p>`,mistakes:[]},
      {title:"Step 5 — BS Effect",marks:1,explain:"Debtors already reduced (Cr was posted). No further BS change.",content:`<p class="text-sm">Debtors already correct. Only P&L affected now.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-repairs-insurance-wrong",type:"Suspense",name:"Repairs & Insurance — Credited to Wrong Accounts",year:2020,source:"2020 Q6(iv)",totalMarks:10,category:"suspense",
    desc:"Repairs debited correctly but credited to Insurance instead of Bank. Two accounts need fixing.",
    partSummary:["Identify error","Correct entry","Suspense","NP effect","BS effect"],
    question:`<p>Repairs of <strong>€2,600</strong> paid by cheque. Entry made: Dr Repairs €2,600, Cr Insurance €2,600. Should have been Cr Bank.</p>`,
    steps:[
      {title:"Step 1 — What's Wrong",marks:2,explain:"Repairs debit is correct. But Insurance was credited instead of Bank. Insurance is understated, Bank is not reduced.",content:`<p class="text-sm">Dr Repairs ✓. Cr Insurance ✗ (should be Cr Bank).</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Dr Insurance €2,600 (reverse the wrong credit). Cr Bank €2,600 (post the correct credit).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Insurance</td><td class="p-2 border border-border text-right font-mono">2,600</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">2,600</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Suspense",marks:2,explain:"Original entry balanced (Dr = Cr). No suspense effect — this is an error of commission.",content:`<p class="text-sm">No suspense effect — error of commission.</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Insurance ↑ €2,600 (restored to correct figure) — wait, Insurance was CREDITED, so it was reduced. Now we're debiting it back. Net: Insurance expense returns to original. NP unchanged by the insurance part. Repairs was correctly posted. No NP change overall.",content:`<p class="text-sm"><strong>NP: No effect.</strong> Insurance restored, Bank corrected.</p>`,mistakes:["Thinking this affects profit — it doesn't, as insurance goes back to original"]},
      {title:"Step 5 — BS",marks:1,explain:"Bank ↓ €2,600 (now correctly reduced).",content:`<p class="text-sm">Bank ↓ €2,600.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-equipment-purchases-wrong-side",type:"Suspense",name:"Equipment Purchased — Credit on Wrong Side + Debited to Purchases",year:2020,source:"2020 Q6(i)",totalMarks:10,category:"suspense",
    desc:"Equipment bought on credit: debited to Purchases and Bank was credited instead of Creditors.",
    partSummary:["What was done","Correct entry","Fix","Suspense","NP effect"],
    question:`<p>Equipment <strong>€7,200</strong> bought on credit. Entry: Dr Purchases €7,200, Cr Bank €7,200. Should be: Dr Equipment €7,200, Cr Creditors €7,200.</p>`,
    steps:[
      {title:"Step 1 — Two Errors",marks:2,explain:"Wrong debit account (Purchases not Equipment) and wrong credit account (Bank not Creditors).",content:`<p class="text-sm">Error 1: Dr Purchases (should be Equipment). Error 2: Cr Bank (should be Creditors).</p>`,mistakes:[]},
      {title:"Step 2 — Correcting Entry",marks:3,explain:"Dr Equipment €7,200. Cr Purchases €7,200. Dr Bank €7,200 (reverse wrong credit). Cr Creditors €7,200.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Account</th><th class="p-2 border border-border">Debit</th><th class="p-2 border border-border">Credit</th></tr></thead><tbody><tr><td class="p-2 border border-border">Equipment</td><td class="p-2 border border-border text-right font-mono">7,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Bank</td><td class="p-2 border border-border text-right font-mono">7,200</td><td class="p-2 border border-border"></td></tr><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">7,200</td></tr><tr><td class="p-2 border border-border">Creditors</td><td class="p-2 border border-border"></td><td class="p-2 border border-border text-right font-mono">7,200</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Suspense",marks:2,explain:"Original: Dr 7,200, Cr 7,200 — balanced. No suspense effect.",content:`<p class="text-sm">No suspense effect — both sides were posted.</p>`,mistakes:[]},
      {title:"Step 4 — NP Effect",marks:2,explain:"Purchases ↓ €7,200 → GP ↑ → NP ↑ €7,200.",content:`<p class="text-sm"><strong>NP ↑ €7,200</strong></p>`,mistakes:[]},
      {title:"Step 5 — BS",marks:1,explain:"Equipment ↑ €7,200. Bank ↑ €7,200 (restored). Creditors ↑ €7,200.",content:`<p class="text-sm">Equipment ↑, Bank ↑ (restored), Creditors ↑.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-suspense-template",type:"Suspense",name:"Suspense Account T-Account (Template)",year:2025,source:"Every Year",totalMarks:6,category:"suspense",
    desc:"The template for building a Suspense Account T-Account in Q6/Q7.",
    partSummary:["Opening balance","Post corrections","Clear to nil"],
    question:`<p>Build a Suspense Account T-Account from the corrections identified in the errors question.</p>`,
    steps:[
      {title:"Step 1 — Opening Balance",marks:2,explain:"The suspense balance is given (debit or credit). This represents the TB imbalance. Place it on the correct side.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Suspense A/C</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Balance b/d: XXX</td><td class="p-2 border border-border">(or balance on credit side)</td></tr></tbody></table>`,mistakes:["Putting the balance on the wrong side"]},
      {title:"Step 2 — Post Each Correction",marks:2,explain:"For each error that AFFECTS suspense, post the suspense entry. Only errors where debits ≠ credits in the original entry affect suspense.",content:`<p class="text-sm">Only post errors that cause a TB imbalance. Errors of principle, commission, original entry, and compensating do NOT affect suspense.</p>`,mistakes:["Posting all errors to suspense — many don't affect it"]},
      {title:"Step 3 — Close Off",marks:2,explain:"After all corrections, the suspense account should balance to NIL. If it doesn't, there are more errors to find.",content:`<p class="text-sm">Suspense must close to <strong>NIL</strong>. If a balance remains, check your corrections.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-corrected-np-template",type:"Suspense",name:"Statement of Corrected Net Profit (Template)",year:2025,source:"Every Year",totalMarks:6,category:"suspense",
    desc:"Template for the Statement of Corrected Net Profit — start with draft NP, adjust for each error's effect.",
    partSummary:["Draft NP","Adjust each error","Corrected NP"],
    question:`<p>Prepare a Statement of Corrected Net Profit starting from the draft Net Profit figure.</p>`,
    steps:[
      {title:"Step 1 — Start with Draft NP",marks:1,explain:"Begin with the Net Profit per the draft accounts (before corrections).",content:`<p class="text-sm"><strong>Draft Net Profit: €XXX</strong></p>`,mistakes:[]},
      {title:"Step 2 — Adjust for Each Error",marks:3,explain:"For each error: if it increases NP, add. If it decreases NP, subtract. Only errors affecting P&L accounts change NP. BS-only errors have no effect.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Error</th><th class="p-2 border border-border text-right">Effect on NP</th></tr></thead><tbody><tr><td class="p-2 border border-border">Error (i)</td><td class="p-2 border border-border text-right font-mono">+/− XXX</td></tr><tr><td class="p-2 border border-border">Error (ii)</td><td class="p-2 border border-border text-right font-mono">+/− XXX</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Corrected Net Profit</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr></tbody></table>`,mistakes:["Including BS-only adjustments — they don't affect NP"]},
      {title:"Step 3 — Check",marks:2,explain:"Income increases → NP ↑. Expense increases → NP ↓. Income decreases → NP ↓. Expense decreases → NP ↑.",content:`<p class="text-sm"><strong>Rules:</strong> Income ↑ = NP ↑. Expense ↑ = NP ↓. Always check the direction.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-corrected-bs-template",type:"Suspense",name:"Corrected Balance Sheet (Template)",year:2025,source:"Every Year",totalMarks:6,category:"suspense",
    desc:"Template for producing a Corrected Balance Sheet extract after error corrections.",
    partSummary:["Draft BS items","Adjust each","Corrected figures"],
    question:`<p>Prepare a Corrected Balance Sheet extract showing the effect of all corrections.</p>`,
    steps:[
      {title:"Step 1 — List Affected Items",marks:2,explain:"For each BS item affected by the corrections, show: Draft figure → Adjustment → Corrected figure.",content:`<p class="text-sm">Go through each error and note which BS items change: Fixed Assets, Debtors, Creditors, Bank, Prepayments, Capital, etc.</p>`,mistakes:[]},
      {title:"Step 2 — Corrected BS Extract",marks:2,explain:"Present the corrected figures. The corrected NP feeds into Capital (retained earnings).",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Item</th><th class="p-2 border border-border text-right">Draft</th><th class="p-2 border border-border text-right">Adj</th><th class="p-2 border border-border text-right">Corrected</th></tr></thead><tbody><tr><td class="p-2 border border-border">[Each item]</td><td class="p-2 border border-border text-right font-mono">XXX</td><td class="p-2 border border-border text-right font-mono">±XXX</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Check Balance",marks:2,explain:"Net Assets must equal Capital. If they don't balance, check: (1) Did you include the corrected NP in Capital? (2) Did you adjust all BS items?",content:`<p class="text-sm">Net Assets = Capital + Corrected NP − Drawings. <strong>Must balance.</strong></p>`,mistakes:["Forgetting to add corrected NP to Capital"]}
    ]
  },
  // ═══════════════════════════════════════════════════
  // CLUB ACCOUNTS (8)
  // ═══════════════════════════════════════════════════
  {
    id:"s2-club-accumulated-fund",type:"Club",name:"Accumulated Fund — Full Asset & Liability Statement",year:2025,source:"Part (a)",totalMarks:12,category:"club",
    desc:"Calculate the opening accumulated fund by listing all opening assets and liabilities.",
    partSummary:["Fixed assets","Current assets","Current liabilities","Long-term liabilities","Accumulated fund","Presentation"],
    question:`<p>Prepare the Accumulated Fund at the start of the year from the given opening figures.</p>`,
    steps:[
      {title:"Step 1 — List Fixed Assets",marks:2,explain:"Include all fixed assets at their NBV (cost − accumulated depreciation). Equipment, premises, vehicles, etc.",content:`<p class="text-sm">Fixed Assets = Cost − Acc Dep = NBV. List each category separately.</p>`,mistakes:[]},
      {title:"Step 2 — List Current Assets",marks:2,explain:"Bank, cash, stock (bar/supplies), subscriptions due, prepayments, investment income due.",content:`<p class="text-sm">Current Assets: Bank, Cash, Stock, Subs due, Prepayments.</p>`,mistakes:["Forgetting subs due is a current asset"]},
      {title:"Step 3 — List Current Liabilities",marks:2,explain:"Creditors, accruals, subs in advance, bar creditors.",content:`<p class="text-sm">Current Liabilities: Creditors, Accruals, Subs in advance.</p>`,mistakes:["Subs in advance = CREDIT = liability, not asset"]},
      {title:"Step 4 — Long-Term Liabilities",marks:2,explain:"Loans, life membership fund, levy fund.",content:`<p class="text-sm">Long-term: Loans, Life Membership Fund, Levy Fund.</p>`,mistakes:[]},
      {title:"Step 5 — Calculate",marks:2,explain:"Accumulated Fund = Total Assets − Total Liabilities.",content:`<p class="text-sm"><strong>Accumulated Fund = Assets − Liabilities</strong></p>`,mistakes:[]},
      {title:"Step 6 — Presentation",marks:2,explain:"Present in balance sheet format. This figure appears at the bottom of the closing BS as 'Opening Accumulated Fund'.",content:`<p class="text-sm">Closing BS: Opening Accumulated Fund + Surplus/(Deficit) = Closing Accumulated Fund.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-investment",type:"Club",name:"Investment Value (Reverse from Partial Income)",year:2025,source:"W5",totalMarks:8,category:"club",
    desc:"Calculate investment value when given partial-year income and the rate of return.",
    partSummary:["Annual income","Find investment value","Partial year adjustment","BS entry"],
    question:`<p>Investment income received during the year: <strong>€2,400</strong> for 8 months. Rate of return: <strong>4%</strong>.</p>`,
    steps:[
      {title:"Step 1 — Find Annual Income",marks:2,explain:"€2,400 for 8 months. Annual = 2,400 × 12/8 = €3,600.",content:`<p class="text-sm">Annual income = 2,400 × 12/8 = <strong>€3,600</strong></p>`,mistakes:["Using 2,400 as the annual figure"]},
      {title:"Step 2 — Find Investment Value",marks:2,explain:"Income = Value × Rate. Value = Income ÷ Rate = 3,600 ÷ 0.04 = €90,000.",content:`<p class="text-sm">Investment = 3,600 ÷ 4% = <strong>€90,000</strong></p>`,mistakes:["Dividing the 8-month figure by the rate instead of the annual figure"]},
      {title:"Step 3 — I&E Figure",marks:2,explain:"I&E shows the full year income due = €3,600. If only €2,400 received, the remaining €1,200 is investment income due (CA).",content:`<p class="text-sm">I&E: Investment income = €3,600. BS CA: Investment income due = €1,200.</p>`,mistakes:[]},
      {title:"Step 4 — BS",marks:2,explain:"Investments = €90,000 (Financial Fixed Asset). Investment income due = €1,200 (CA).",content:`<p class="text-sm">BS: Investments = €90,000 (FA). Income due = €1,200 (CA).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-subs-linear",type:"Club",name:"Subscriptions (Linear List — SEC Method)",year:2025,source:"W6",totalMarks:6,category:"club",
    desc:"Calculate subscription income for I&E using the SEC's preferred linear list method.",
    partSummary:["List all receipts","Adjust for timing","I&E figure"],
    question:`<p>Subs received €36,000. Opening due €800. Closing due €1,200. Opening in advance €400. Closing in advance €600.</p>`,
    steps:[
      {title:"Step 1 — Linear Calculation",marks:3,explain:"Start with cash received. Add closing due (earned but not received). Subtract opening due (last year's, received this year). Add opening in advance (received last year, earned this year). Subtract closing in advance (received this year, earned next year).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Cash received</td><td class="p-2 border border-border text-right font-mono">36,000</td></tr><tr><td class="p-2 border border-border">Add: Closing due</td><td class="p-2 border border-border text-right font-mono">1,200</td></tr><tr><td class="p-2 border border-border">Less: Opening due</td><td class="p-2 border border-border text-right font-mono">(800)</td></tr><tr><td class="p-2 border border-border">Add: Opening in advance</td><td class="p-2 border border-border text-right font-mono">400</td></tr><tr><td class="p-2 border border-border">Less: Closing in advance</td><td class="p-2 border border-border text-right font-mono">(600)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">I&E: Subscriptions</td><td class="p-2 border border-border text-right font-mono">36,200</td></tr></tbody></table>`,mistakes:["Getting the additions and subtractions reversed"]},
      {title:"Step 2 — Memory Aid",marks:1,explain:"COAO rule: Closing due = Add, Opening due = Subtract, Opening advance = Add, Closing advance = Subtract.",content:`<p class="text-sm"><strong>COAO:</strong> Closing due (+), Opening due (−), Advance: Opening (+), Closing (−).</p>`,mistakes:[]},
      {title:"Step 3 — BS Treatment",marks:2,explain:"Subs due = CA. Subs in advance = CL.",content:`<p class="text-sm">BS: Subs due €1,200 (CA). Subs in advance €600 (CL).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-loan-interest",type:"Club",name:"Loan + Interest Backdating (Division Method)",year:2025,source:"W8",totalMarks:8,category:"club",
    desc:"Calculate loan amount from interest paid, considering partial-year backdating.",
    partSummary:["Find loan from interest","Backdate calculation","I&E entry","BS entry"],
    question:`<p>Loan interest paid: <strong>€3,600</strong> covering 9 months at <strong>8% per annum</strong>.</p>`,
    steps:[
      {title:"Step 1 — Find Annual Interest",marks:2,explain:"€3,600 for 9 months. Annual = 3,600 × 12/9 = €4,800.",content:`<p class="text-sm">Annual interest = 3,600 × 12/9 = <strong>€4,800</strong></p>`,mistakes:[]},
      {title:"Step 2 — Find Loan Amount",marks:2,explain:"Interest = Loan × Rate. Loan = Interest ÷ Rate = 4,800 ÷ 0.08 = €60,000.",content:`<p class="text-sm">Loan = 4,800 ÷ 8% = <strong>€60,000</strong></p>`,mistakes:[]},
      {title:"Step 3 — I&E",marks:2,explain:"I&E shows full year interest = €4,800. If only €3,600 paid, the accrual = €1,200.",content:`<p class="text-sm">I&E: Loan interest = €4,800. Accrual = €1,200 (CL).</p>`,mistakes:[]},
      {title:"Step 4 — BS",marks:2,explain:"Loan = €60,000 (Long-term liability). Interest accrued = €1,200 (CL).",content:`<p class="text-sm">BS: Loan €60,000 (LTL). Interest due €1,200 (CL).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-bar-trading",type:"Club",name:"Bar Trading Account (Debtors & Creditors Adjustment)",year:2025,source:"W9",totalMarks:8,category:"club",
    desc:"Prepare bar trading account with opening/closing bar debtors and creditors.",
    partSummary:["Bar sales (adjusted)","Cost of bar sales","Bar wages","Bar profit"],
    question:`<p>Bar receipts €42,000. Opening bar debtors €1,800. Closing bar debtors €2,200. Bar purchases paid €19,500. Opening bar creditors €2,000. Closing bar creditors €2,400. Bar wages €9,000. Opening bar stock €3,000. Closing bar stock €3,500.</p>`,
    steps:[
      {title:"Step 1 — Bar Sales (Accruals Basis)",marks:2,explain:"Bar sales = Receipts + Closing debtors − Opening debtors = 42,000 + 2,200 − 1,800 = €42,400.",content:`<p class="text-sm">Bar sales = 42,000 + 2,200 − 1,800 = <strong>€42,400</strong></p>`,mistakes:["Using cash receipts as sales"]},
      {title:"Step 2 — Bar Purchases (Accruals Basis)",marks:2,explain:"Bar purchases = Paid + Closing creditors − Opening creditors = 19,500 + 2,400 − 2,000 = €19,900.",content:`<p class="text-sm">Bar purchases = 19,500 + 2,400 − 2,000 = <strong>€19,900</strong></p>`,mistakes:[]},
      {title:"Step 3 — Bar Trading Account",marks:2,explain:"Sales 42,400 − (Opening stock 3,000 + Purchases 19,900 − Closing stock 3,500) = GP 23,000. Less wages 9,000 = Bar profit 14,000.",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Bar Sales</td><td class="p-2 border border-border text-right font-mono">42,400</td></tr><tr><td class="p-2 border border-border">Cost of bar sales</td><td class="p-2 border border-border text-right font-mono">(19,400)</td></tr><tr><td class="p-2 border border-border font-bold">Gross Profit</td><td class="p-2 border border-border text-right font-mono">23,000</td></tr><tr><td class="p-2 border border-border">Bar wages</td><td class="p-2 border border-border text-right font-mono">(9,000)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Bar Profit → I&E</td><td class="p-2 border border-border text-right font-mono">14,000</td></tr></tbody></table>`,mistakes:["Not adjusting for debtors/creditors changes"]},
      {title:"Step 4 — I&E & BS",marks:2,explain:"I&E: Bar profit = €14,000 (income). BS: Bar stock €3,500 (CA), Bar debtors €2,200 (CA), Bar creditors €2,400 (CL).",content:`<p class="text-sm">I&E income: €14,000. BS: stock, debtors, creditors at closing figures.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-coaching-wages",type:"Club",name:"Coaching Expenses & Wages (with Bonus)",year:2025,source:"W10",totalMarks:6,category:"club",
    desc:"Calculate coaching expenses including a performance bonus that hasn't been paid.",
    partSummary:["Regular wages","Bonus accrual","I&E entry"],
    question:`<p>Coaching wages paid: <strong>€24,000</strong>. A bonus of <strong>€2,000</strong> is due but unpaid at year end.</p>`,
    steps:[
      {title:"Step 1 — Total Coaching Cost",marks:2,explain:"Paid €24,000 + Bonus accrual €2,000 = €26,000.",content:`<p class="text-sm">Total = 24,000 + 2,000 = <strong>€26,000</strong></p>`,mistakes:["Forgetting the accrued bonus"]},
      {title:"Step 2 — I&E",marks:2,explain:"I&E: Coaching expenses = €26,000 (expenditure).",content:`<p class="text-sm">I&E: Coaching = €26,000.</p>`,mistakes:[]},
      {title:"Step 3 — BS",marks:2,explain:"Accrued bonus = €2,000 (Current Liability).",content:`<p class="text-sm">BS CL: Accrued wages/bonus = €2,000.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-life-membership",type:"Club",name:"Life Membership Annual Write-Off",year:2025,source:"W11",totalMarks:6,category:"club",
    desc:"Write off life membership fees over the agreed period. Transfer annual portion to I&E as income.",
    partSummary:["Calculate annual write-off","I&E entry","BS entry"],
    question:`<p>Life membership fees received: <strong>€12,000</strong> (10 members × €1,200). To be written off over <strong>10 years</strong>. This is Year 3.</p>`,
    steps:[
      {title:"Step 1 — Annual Write-Off",marks:2,explain:"Total life membership = €12,000. Written off over 10 years. Annual = 12,000 ÷ 10 = €1,200 per year.",content:`<p class="text-sm">Annual write-off = 12,000 ÷ 10 = <strong>€1,200</strong></p>`,mistakes:[]},
      {title:"Step 2 — I&E",marks:2,explain:"I&E income: Life membership written off = €1,200.",content:`<p class="text-sm">I&E: Life membership = €1,200 (income).</p>`,mistakes:["Putting full €12,000 as income — only the annual portion"]},
      {title:"Step 3 — BS",marks:2,explain:"Life Membership Fund = 12,000 − (3 × 1,200) = 12,000 − 3,600 = €8,400. This is a long-term liability on the BS.",content:`<p class="text-sm">BS: Life Membership Fund = €8,400 (LTL).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-club-equipment-dep",type:"Club",name:"Equipment Depreciation (Year of Acquisition/Disposal Rule)",year:2025,source:"W1",totalMarks:6,category:"club",
    desc:"Apply depreciation rules: full year in year of acquisition, none in year of disposal.",
    partSummary:["Identify assets","Apply rules","I&E charge"],
    question:`<p>Equipment at start: €40,000. New equipment bought 1/06: €8,000. Old equipment sold: cost €6,000. Depreciation rate: <strong>10% straight line</strong>. Full year in year of purchase, none in year of sale.</p>`,
    steps:[
      {title:"Step 1 — Assets to Depreciate",marks:2,explain:"Opening €40,000 − sold €6,000 + new €8,000 = €42,000. But: full year on new (even though mid-year), none on sold.",content:`<p class="text-sm">Depreciate: (40,000 − 6,000) existing + 8,000 new = €42,000 at 10%.</p>`,mistakes:["Pro-rating the new equipment — question says full year in year of acquisition"]},
      {title:"Step 2 — Calculate",marks:2,explain:"42,000 × 10% = €4,200. No depreciation on the sold equipment.",content:`<p class="text-sm">Depreciation = 42,000 × 10% = <strong>€4,200</strong></p>`,mistakes:[]},
      {title:"Step 3 — I&E and BS",marks:2,explain:"I&E: Depreciation expense = €4,200. BS: Equipment at NBV (cost 42,000 − acc dep).",content:`<p class="text-sm">I&E: Depreciation = €4,200. BS: Equipment NBV adjusted.</p>`,mistakes:[]}
    ]
  },
  // ═══════════════════════════════════════════════════
  // SERVICE FIRM (5)
  // ═══════════════════════════════════════════════════
  {
    id:"s2-service-loan",type:"Service",name:"Loan Amount (Division Method)",year:2024,source:"W2",totalMarks:8,category:"service",
    desc:"Find the loan amount from the interest figure using the division method.",
    partSummary:["Annual interest","Find loan","Accrual","BS entry"],
    question:`<p>Loan interest paid <strong>€5,250</strong> for 7 months at <strong>6%</strong>.</p>`,
    steps:[
      {title:"Step 1 — Annual Interest",marks:2,explain:"5,250 × 12/7 = €9,000 annual.",content:`<p class="text-sm">Annual = 5,250 × 12/7 = <strong>€9,000</strong></p>`,mistakes:[]},
      {title:"Step 2 — Loan",marks:2,explain:"Loan = 9,000 ÷ 0.06 = €150,000.",content:`<p class="text-sm">Loan = 9,000 ÷ 6% = <strong>€150,000</strong></p>`,mistakes:[]},
      {title:"Step 3 — Accrual",marks:2,explain:"5 months unpaid = 9,000 × 5/12 = €3,750 accrual.",content:`<p class="text-sm">Accrued interest = €3,750 (CL).</p>`,mistakes:[]},
      {title:"Step 4 — I&E & BS",marks:2,explain:"I&E: Interest €9,000. BS: Loan €150,000 (LTL), Accrued interest €3,750 (CL).",content:`<p class="text-sm">I&E: €9,000. BS: Loan €150,000, Accrued €3,750.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-service-investment",type:"Service",name:"Investment Value (from Partial-Year Income)",year:2024,source:"W1/W5",totalMarks:6,category:"service",
    desc:"Same division method: find investment value from partial-year income received.",
    partSummary:["Annualise income","Find value","I&E figure"],
    question:`<p>Investment income received: <strong>€1,600</strong> for 4 months. Rate: <strong>5%</strong>.</p>`,
    steps:[
      {title:"Step 1 — Annualise",marks:2,explain:"1,600 × 12/4 = €4,800 annual income.",content:`<p class="text-sm">Annual = €4,800</p>`,mistakes:[]},
      {title:"Step 2 — Investment Value",marks:2,explain:"4,800 ÷ 0.05 = €96,000.",content:`<p class="text-sm">Investment = <strong>€96,000</strong></p>`,mistakes:[]},
      {title:"Step 3 — I&E",marks:2,explain:"I&E: Investment income = €4,800 (full year). Income due = 4,800 − 1,600 = €3,200 (CA).",content:`<p class="text-sm">I&E: €4,800. BS: Income due €3,200 (CA).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-service-supplies",type:"Service",name:"Supplies Consumed (5-Item Linear Formula)",year:2024,source:"W9",totalMarks:8,category:"service",
    desc:"Calculate supplies consumed using the 5-item linear formula: Opening + Purchases − Returns − Closing − Personal use.",
    partSummary:["Opening stock","Add purchases","Less returns","Less closing","Less personal"],
    question:`<p>Opening supplies €3,200. Purchases €14,800. Returns €400. Closing supplies €2,600. Owner took supplies worth €500.</p>`,
    steps:[
      {title:"Step 1 — Calculate",marks:4,explain:"3,200 + 14,800 − 400 − 2,600 − 500 = €14,500.",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Opening supplies</td><td class="p-2 border border-border text-right font-mono">3,200</td></tr><tr><td class="p-2 border border-border">Add: Purchases</td><td class="p-2 border border-border text-right font-mono">14,800</td></tr><tr><td class="p-2 border border-border">Less: Returns</td><td class="p-2 border border-border text-right font-mono">(400)</td></tr><tr><td class="p-2 border border-border">Less: Closing supplies</td><td class="p-2 border border-border text-right font-mono">(2,600)</td></tr><tr><td class="p-2 border border-border">Less: Personal use</td><td class="p-2 border border-border text-right font-mono">(500)</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Supplies consumed</td><td class="p-2 border border-border text-right font-mono">14,500</td></tr></tbody></table>`,mistakes:["Forgetting to deduct personal use (drawings)"]},
      {title:"Step 2 — I&E",marks:2,explain:"I&E: Supplies consumed = €14,500 (expenditure).",content:`<p class="text-sm">I&E: Supplies = €14,500. Drawings ↑ €500.</p>`,mistakes:[]},
      {title:"Step 3 — BS",marks:2,explain:"Stock of supplies = €2,600 (CA). Drawings includes €500.",content:`<p class="text-sm">BS: Supplies stock €2,600 (CA).</p>`,mistakes:[]},
      {title:"Step 4 — Note",marks:0,explain:"Personal use = Drawings. It reduces the expense AND increases drawings (reduces capital).",content:`<p class="text-sm">Personal use is always at COST for supplies.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-service-wages-split",type:"Service",name:"Wages Split (Secretary Clinic vs Shop)",year:2024,source:"W11",totalMarks:6,category:"service",
    desc:"Split wages between different departments of a service firm.",
    partSummary:["Total wages","Apply split","Assign to I&E sections"],
    question:`<p>Total wages €48,000. Secretary splits time: <strong>60% clinic, 40% shop</strong>. Shop assistant €18,000 (all shop).</p>`,
    steps:[
      {title:"Step 1 — Calculate Split",marks:3,explain:"Secretary wages = 48,000 − 18,000 = €30,000. Clinic: 30,000 × 60% = €18,000. Shop: 30,000 × 40% = €12,000. Plus shop assistant €18,000. Shop total = €30,000.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Item</th><th class="p-2 border border-border text-right">Clinic</th><th class="p-2 border border-border text-right">Shop</th></tr></thead><tbody><tr><td class="p-2 border border-border">Secretary</td><td class="p-2 border border-border text-right font-mono">18,000</td><td class="p-2 border border-border text-right font-mono">12,000</td></tr><tr><td class="p-2 border border-border">Shop assistant</td><td class="p-2 border border-border text-right font-mono">—</td><td class="p-2 border border-border text-right font-mono">18,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Total</td><td class="p-2 border border-border text-right font-mono">18,000</td><td class="p-2 border border-border text-right font-mono">30,000</td></tr></tbody></table>`,mistakes:["Splitting the shop assistant's wages too"]},
      {title:"Step 2 — I&E",marks:2,explain:"Show separately in I&E: Clinic wages €18,000. Shop wages €30,000 (or net against shop revenue).",content:`<p class="text-sm">I&E: Clinic wages €18,000. Shop wages €30,000.</p>`,mistakes:[]},
      {title:"Step 3 — Shop Trading Account",marks:1,explain:"If there's a shop, prepare a separate trading account with shop revenue − cost of supplies − shop wages = shop profit → I&E.",content:`<p class="text-sm">Shop profit transfers to I&E as income (like a bar trading account).</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-service-bank",type:"Service",name:"Bank Balance (Multiple Adjustments)",year:2024,source:"W20",totalMarks:6,category:"service",
    desc:"Calculate the correct bank balance after multiple adjustments not yet recorded.",
    partSummary:["TB bank figure","Standing orders","Direct debits","Corrected balance"],
    question:`<p>Bank per TB: <strong>€8,400 Dr</strong>. Standing order for insurance €300/month for 3 months not recorded. Direct debit for loan repayment €500 not recorded. Credit transfer from debtor €1,200 not recorded.</p>`,
    steps:[
      {title:"Step 1 — List Adjustments",marks:3,explain:"Insurance SO: 300 × 3 = €900 (Cr Bank). Loan DD: €500 (Cr Bank). Credit transfer: €1,200 (Dr Bank).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Bank per TB</td><td class="p-2 border border-border text-right font-mono">8,400</td></tr><tr><td class="p-2 border border-border">Less: Insurance SO (3 × 300)</td><td class="p-2 border border-border text-right font-mono">(900)</td></tr><tr><td class="p-2 border border-border">Less: Loan DD</td><td class="p-2 border border-border text-right font-mono">(500)</td></tr><tr><td class="p-2 border border-border">Add: Credit transfer</td><td class="p-2 border border-border text-right font-mono">1,200</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Corrected bank</td><td class="p-2 border border-border text-right font-mono">8,200</td></tr></tbody></table>`,mistakes:["Forgetting to adjust the other accounts too (Insurance, Loan, Debtors)"]},
      {title:"Step 2 — Other Account Effects",marks:2,explain:"Insurance ↑ €900. Loan ↓ €500. Debtors ↓ €1,200.",content:`<p class="text-sm">I&E: Insurance ↑ €900. BS: Loan ↓ €500, Debtors ↓ €1,200.</p>`,mistakes:[]},
      {title:"Step 3 — BS",marks:1,explain:"Bank = €8,200 (CA).",content:`<p class="text-sm">BS: Bank = €8,200.</p>`,mistakes:[]}
    ]
  },
  // ═══════════════════════════════════════════════════
  // PUBLISHED ACCOUNTS (5)
  // ═══════════════════════════════════════════════════
  {
    id:"s2-published-patent",type:"Published",name:"Patent Amortisation (in Cost of Sales)",year:2024,source:"Working A",totalMarks:8,category:"published",
    desc:"Patent amortisation is included in Cost of Sales in Published Accounts (unlike Sole Trader where it's Admin).",
    partSummary:["Calculate amortisation","Add to Cost of Sales","Working A entry","Note disclosure"],
    question:`<p>Patent cost €80,000, useful life 10 years. This is Year 4. Include amortisation in Cost of Sales.</p>`,
    steps:[
      {title:"Step 1 — Annual Amortisation",marks:2,explain:"80,000 ÷ 10 = €8,000 per year.",content:`<p class="text-sm">Amortisation = 80,000 ÷ 10 = <strong>€8,000</strong></p>`,mistakes:[]},
      {title:"Step 2 — Working A (Cost of Sales)",marks:3,explain:"In Published Accounts, patent amortisation goes into Cost of Sales (Working A), NOT Admin like in Sole Trader.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Working A: Cost of Sales</th></tr></thead><tbody><tr><td class="p-2 border border-border">Opening stock</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border">Purchases</td><td class="p-2 border border-border text-right font-mono">XXX</td></tr><tr><td class="p-2 border border-border font-bold">Patent Amortisation</td><td class="p-2 border border-border text-right font-mono">8,000</td></tr><tr><td class="p-2 border border-border">Closing stock</td><td class="p-2 border border-border text-right font-mono">(XXX)</td></tr></tbody></table>`,mistakes:["Putting patent amortisation in Admin — in Published Accounts it goes in Cost of Sales"]},
      {title:"Step 3 — BS",marks:2,explain:"Patent on BS: 80,000 − (4 × 8,000) = 80,000 − 32,000 = €48,000. Shown under Intangible Fixed Assets.",content:`<p class="text-sm">BS: Intangible Assets: Patent = €48,000.</p>`,mistakes:[]},
      {title:"Step 4 — Note",marks:1,explain:"Disclose in notes: Patent amortisation policy and amount charged.",content:`<p class="text-sm">Note: Patent amortised at €8,000 p.a. over 10 years.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-published-commission",type:"Published",name:"Commission Earned (Extract from Distribution)",year:2024,source:"Working D",totalMarks:6,category:"published",
    desc:"Commission earned by staff is included in distribution costs but is actually income. Extract it.",
    partSummary:["Identify commission","Remove from distribution","Add to income"],
    question:`<p>Distribution costs €65,000 include commission earned by salespeople of <strong>€4,500</strong>. The commission is actually Other Operating Income.</p>`,
    steps:[
      {title:"Step 1 — Extract Commission",marks:2,explain:"Commission earned is income, not a cost. Remove from Distribution (Working B) and add to Other Operating Income (Working D).",content:`<p class="text-sm">Distribution costs: 65,000 − 4,500 = <strong>€60,500</strong></p><p class="text-sm">Other Operating Income: + <strong>€4,500</strong></p>`,mistakes:["Leaving it in Distribution — it's income, not a cost"]},
      {title:"Step 2 — Effect",marks:2,explain:"Distribution ↓ €4,500 (costs reduced). Other Income ↑ €4,500. Net effect on Operating Profit = ↑ €9,000 (double benefit).",content:`<p class="text-sm">Operating Profit ↑ €9,000 (distribution ↓ 4,500 + income ↑ 4,500).</p>`,mistakes:["Only adjusting one side — must adjust both"]},
      {title:"Step 3 — Workings",marks:2,explain:"Working B shows distribution costs less commission. Working D shows commission as other operating income.",content:`<p class="text-sm">Working B: €60,500. Working D: €4,500.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-published-vehicle-dep",type:"Published",name:"Vehicle Dep (Reducing Balance vs Straight Line)",year:2024,source:"Note 3",totalMarks:8,category:"published",
    desc:"Calculate depreciation using different methods for different asset types in Published Accounts.",
    partSummary:["Straight line on buildings","Reducing balance on vehicles","Note 3 disclosure","BS figures"],
    question:`<p>Buildings: cost €400,000, dep 2% SL. Vehicles: NBV €60,000, dep 25% reducing balance. Equipment: cost €120,000, dep 10% SL.</p>`,
    steps:[
      {title:"Step 1 — Buildings (SL)",marks:2,explain:"400,000 × 2% = €8,000.",content:`<p class="text-sm">Buildings dep = <strong>€8,000</strong></p>`,mistakes:[]},
      {title:"Step 2 — Vehicles (RB)",marks:2,explain:"NBV €60,000 × 25% = €15,000.",content:`<p class="text-sm">Vehicles dep = <strong>€15,000</strong></p>`,mistakes:["Using cost for reducing balance — must use NBV"]},
      {title:"Step 3 — Equipment (SL)",marks:2,explain:"120,000 × 10% = €12,000.",content:`<p class="text-sm">Equipment dep = <strong>€12,000</strong></p>`,mistakes:[]},
      {title:"Step 4 — Note 3",marks:2,explain:"Note 3 shows the fixed asset schedule: Cost, Acc Dep, NBV for each category. Total dep = 8,000 + 15,000 + 12,000 = €35,000.",content:`<p class="text-sm">Total depreciation: €35,000. Split: Buildings €8,000, Vehicles €15,000, Equipment €12,000. Buildings & Equipment dep → Admin. Vehicles dep → Distribution.</p>`,mistakes:["Putting all depreciation in one category"]}
    ]
  },
  {
    id:"s2-published-wages-split",type:"Published",name:"Wages & Expenses Split (Distribution vs Admin)",year:2024,source:"Working B/C",totalMarks:8,category:"published",
    desc:"Split shared expenses between distribution costs and admin expenses using given percentages.",
    partSummary:["Identify shared costs","Apply percentages","Working B total","Working C total"],
    question:`<p>Wages €96,000 (60% admin, 40% distribution). Rent €24,000 (75% admin, 25% distribution). Light & Heat €12,000 (50/50). Insurance €8,000 (all admin).</p>`,
    steps:[
      {title:"Step 1 — Split Each Expense",marks:4,explain:"Apply the percentages given for each shared expense.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border">Expense</th><th class="p-2 border border-border text-right">Distribution</th><th class="p-2 border border-border text-right">Admin</th></tr></thead><tbody><tr><td class="p-2 border border-border">Wages</td><td class="p-2 border border-border text-right font-mono">38,400</td><td class="p-2 border border-border text-right font-mono">57,600</td></tr><tr><td class="p-2 border border-border">Rent</td><td class="p-2 border border-border text-right font-mono">6,000</td><td class="p-2 border border-border text-right font-mono">18,000</td></tr><tr><td class="p-2 border border-border">L&H</td><td class="p-2 border border-border text-right font-mono">6,000</td><td class="p-2 border border-border text-right font-mono">6,000</td></tr><tr><td class="p-2 border border-border">Insurance</td><td class="p-2 border border-border text-right font-mono">—</td><td class="p-2 border border-border text-right font-mono">8,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Totals</td><td class="p-2 border border-border text-right font-mono">50,400</td><td class="p-2 border border-border text-right font-mono">89,600</td></tr></tbody></table>`,mistakes:["Putting all wages in admin when the question gives a split"]},
      {title:"Step 2 — Add Depreciation",marks:2,explain:"Add vehicle dep to Distribution, building/equipment dep to Admin.",content:`<p class="text-sm">Working B (Distribution) = 50,400 + vehicle dep. Working C (Admin) = 89,600 + building/equip dep + directors' fees.</p>`,mistakes:[]},
      {title:"Step 3 — Workings in Published P&L",marks:1,explain:"Published P&L: Turnover − Cost of Sales = GP − Distribution (B) − Admin (C) = Operating Profit.",content:`<p class="text-sm">These workings are shown as notes to the Published P&L.</p>`,mistakes:[]},
      {title:"Step 4 — Check",marks:1,explain:"Total of all splits should equal the TB figures. 50,400 + 89,600 = 140,000 = 96,000 + 24,000 + 12,000 + 8,000. ✓",content:`<p class="text-sm">Always verify: Distribution + Admin = Total TB expenses. ✓</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-published-contingent",type:"Published",name:"Contingent Liability (Lawsuit — Disclose vs Provide)",year:2024,source:"Note 5",totalMarks:6,category:"published",
    desc:"Determine whether a lawsuit should be provided for (probable) or disclosed in a note (possible).",
    partSummary:["Assess probability","Provide or disclose","Note wording"],
    question:`<p>The company is being sued for <strong>€50,000</strong>. Legal advice: the outcome is <strong>possible but not probable</strong>.</p>`,
    steps:[
      {title:"Step 1 — Assess",marks:2,explain:"Probable = Provide (debit P&L, credit provision). Possible = Disclose in notes only. Remote = Ignore.",content:`<p class="text-sm"><strong>Probable:</strong> Provide. <strong>Possible:</strong> Disclose. <strong>Remote:</strong> Ignore.</p>`,mistakes:["Providing for a 'possible' liability — only provide if 'probable'"]},
      {title:"Step 2 — Treatment",marks:2,explain:"Since outcome is 'possible but not probable', DISCLOSE in a note only. Do NOT create a provision. No P&L charge.",content:`<p class="text-sm">Disclose only: <strong>No provision in accounts.</strong> Note disclosure required.</p>`,mistakes:["Creating a provision for €50,000"]},
      {title:"Step 3 — Note Wording",marks:2,explain:"Note 5: 'The company is subject to a legal claim for €50,000. Based on legal advice, the directors consider the outcome to be possible but not probable. No provision has been made.'",content:`<p class="text-sm italic">"The company is subject to a legal claim for €50,000. The directors consider the outcome possible but not probable. No provision has been made."</p>`,mistakes:[]}
    ]
  },
  // ═══════════════════════════════════════════════════
  // CASH FLOW (5)
  // ═══════════════════════════════════════════════════
  {
    id:"s2-cf-operating",type:"Cash Flow",name:"Reconciliation — Operating Profit to Cash from Operations",year:2024,source:"Section 1",totalMarks:8,category:"cashflow",
    desc:"Indirect method: start with operating profit, add back non-cash items, adjust for working capital changes.",
    partSummary:["Operating profit","Non-cash items","Working capital","Cash from operations"],
    question:`<p>Operating Profit €72,000. Depreciation €15,000. Profit on sale of land €4,000. Stock ↑ €3,000. Debtors ↓ €1,500. Creditors ↑ €2,000.</p>`,
    steps:[
      {title:"Step 1 — Start",marks:1,explain:"Begin with Operating Profit = €72,000.",content:`<p class="text-sm">Operating Profit = <strong>€72,000</strong></p>`,mistakes:["Starting with Net Profit"]},
      {title:"Step 2 — Non-Cash",marks:3,explain:"Add back depreciation €15,000. Deduct profit on sale of land €4,000 (it's not an operating item — goes to Section 3).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Operating Profit</td><td class="p-2 border border-border text-right font-mono">72,000</td></tr><tr><td class="p-2 border border-border">Add: Depreciation</td><td class="p-2 border border-border text-right font-mono">15,000</td></tr><tr><td class="p-2 border border-border">Less: Profit on sale of land</td><td class="p-2 border border-border text-right font-mono">(4,000)</td></tr><tr class="font-bold"><td class="p-2 border border-border">Adjusted</td><td class="p-2 border border-border text-right font-mono">83,000</td></tr></tbody></table>`,mistakes:["Adding profit on disposal instead of subtracting","Forgetting depreciation"]},
      {title:"Step 3 — Working Capital",marks:2,explain:"Stock ↑ = cash used (−3,000). Debtors ↓ = cash received (+1,500). Creditors ↑ = cash saved (+2,000).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Adjusted</td><td class="p-2 border border-border text-right font-mono">83,000</td></tr><tr><td class="p-2 border border-border">Stock increase</td><td class="p-2 border border-border text-right font-mono">(3,000)</td></tr><tr><td class="p-2 border border-border">Debtors decrease</td><td class="p-2 border border-border text-right font-mono">1,500</td></tr><tr><td class="p-2 border border-border">Creditors increase</td><td class="p-2 border border-border text-right font-mono">2,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Cash from Operations</td><td class="p-2 border border-border text-right font-mono">83,500</td></tr></tbody></table>`,mistakes:["Getting working capital signs wrong"]},
      {title:"Step 4 — Key Rule",marks:2,explain:"Asset ↑ = cash ↓. Asset ↓ = cash ↑. Liability ↑ = cash ↑. Liability ↓ = cash ↓.",content:`<p class="text-sm"><strong>Memory:</strong> Assets and cash move in opposite directions. Liabilities and cash move together.</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-cf-fixed-assets-paid",type:"Cash Flow",name:"Find Cash Paid for Fixed Assets",year:2024,source:"Section 4",totalMarks:6,category:"cashflow",
    desc:"Calculate how much cash was actually paid for fixed assets using the T-account approach.",
    partSummary:["Opening FA","Closing FA","Disposals","Cash paid"],
    question:`<p>Opening fixed assets (cost): €200,000. Closing: €260,000. A machine costing €15,000 was sold during the year.</p>`,
    steps:[
      {title:"Step 1 — Fixed Assets T-Account",marks:3,explain:"Opening 200,000 + Purchases ? − Disposals 15,000 = Closing 260,000. Purchases = 260,000 + 15,000 − 200,000 = €75,000.",content:`<table class="w-full text-sm border-collapse"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Fixed Assets A/C (Cost)</th></tr><tr><td class="p-2 border border-border font-bold">Debit</td><td class="p-2 border border-border font-bold">Credit</td></tr></thead><tbody><tr><td class="p-2 border border-border">Opening: 200,000</td><td class="p-2 border border-border">Disposals: 15,000</td></tr><tr><td class="p-2 border border-border font-bold">Purchases: 75,000</td><td class="p-2 border border-border">Closing: 260,000</td></tr></tbody></table>`,mistakes:["Forgetting to add back disposals"]},
      {title:"Step 2 — Cash Paid",marks:2,explain:"Cash paid for fixed assets = €75,000. This goes in Section 4 (Capital Expenditure) as an outflow.",content:`<p class="text-sm"><strong>Section 4:</strong> Purchase of fixed assets = <strong>(€75,000)</strong></p>`,mistakes:[]},
      {title:"Step 3 — Check",marks:1,explain:"Always verify: Opening + Purchases − Disposals = Closing. 200,000 + 75,000 − 15,000 = 260,000. ✓",content:`<p class="text-sm">200,000 + 75,000 − 15,000 = 260,000 ✓</p>`,mistakes:[]}
    ]
  },
  {
    id:"s2-cf-disposal-proceeds",type:"Cash Flow",name:"Disposal Proceeds (Cash Inflow)",year:2024,source:"Section 4",totalMarks:6,category:"cashflow",
    desc:"Calculate the actual cash received from selling a fixed asset for the cash flow statement.",
    partSummary:["NBV at disposal","Profit or loss","Cash received"],
    question:`<p>Machine sold: cost €15,000, acc dep €11,000. Profit on disposal per P&L: €2,000.</p>`,
    steps:[
      {title:"Step 1 — Calculate NBV",marks:1,explain:"NBV = 15,000 − 11,000 = €4,000.",content:`<p class="text-sm">NBV = <strong>€4,000</strong></p>`,mistakes:[]},
      {title:"Step 2 — Cash Received",marks:3,explain:"NBV + Profit = Cash received. 4,000 + 2,000 = €6,000. (Or NBV − Loss if there was a loss.)",content:`<p class="text-sm">Cash received = NBV + Profit = 4,000 + 2,000 = <strong>€6,000</strong></p>`,mistakes:["Using the profit as the cash received — must add to NBV","Using cost or NBV alone as the proceeds"]},
      {title:"Step 3 — Cash Flow",marks:2,explain:"Section 4: Sale of fixed assets = €6,000 (inflow). The profit was already deducted in Section 1.",content:`<p class="text-sm"><strong>Section 4:</strong> Sale of fixed assets = <strong>€6,000</strong></p>`,mistakes:["Double-counting the profit"]}
    ]
  },
  {
    id:"s2-cf-interest-tax-div",type:"Cash Flow",name:"Interest, Tax & Dividends Paid",year:2024,source:"Sections 2/3/5",totalMarks:8,category:"cashflow",
    desc:"Calculate actual cash paid for interest, tax, and dividends using opening/closing creditor balances.",
    partSummary:["Interest paid","Tax paid","Dividends paid","Cash flow sections"],
    question:`<p>P&L: Interest €8,000, Tax €12,000, Dividends €20,000. Opening interest due €2,000, closing €3,000. Opening tax due €10,000, closing €12,000. Dividends proposed last year €15,000 (paid this year).</p>`,
    steps:[
      {title:"Step 1 — Interest Paid (Cash)",marks:2,explain:"Interest paid = P&L charge + Opening due − Closing due = 8,000 + 2,000 − 3,000 = €7,000.",content:`<p class="text-sm">Interest paid = 8,000 + 2,000 − 3,000 = <strong>€7,000</strong></p>`,mistakes:["Using the P&L figure directly"]},
      {title:"Step 2 — Tax Paid (Cash)",marks:2,explain:"Tax paid = P&L charge + Opening due − Closing due = 12,000 + 10,000 − 12,000 = €10,000.",content:`<p class="text-sm">Tax paid = 12,000 + 10,000 − 12,000 = <strong>€10,000</strong></p>`,mistakes:["Using provision instead of actual cash paid"]},
      {title:"Step 3 — Dividends Paid",marks:2,explain:"Dividends paid = Last year's proposed (€15,000). This year's proposed is NOT paid yet.",content:`<p class="text-sm">Dividends paid = last year's proposed = <strong>€15,000</strong></p>`,mistakes:["Using this year's proposed dividends — those aren't paid until next year"]},
      {title:"Step 4 — Place in Sections",marks:2,explain:"Interest paid → Section 2. Tax paid → Section 5. Dividends paid → Section 2.",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Section 2: Interest paid</td><td class="p-2 border border-border text-right font-mono">(7,000)</td></tr><tr><td class="p-2 border border-border">Section 2: Dividends paid</td><td class="p-2 border border-border text-right font-mono">(15,000)</td></tr><tr><td class="p-2 border border-border">Section 5: Tax paid</td><td class="p-2 border border-border text-right font-mono">(10,000)</td></tr></tbody></table>`,mistakes:[]}
    ]
  },
  {
    id:"s2-cf-financing",type:"Cash Flow",name:"Liquid Resources & Financing (Shares, Debentures)",year:2024,source:"Sections 7/8",totalMarks:6,category:"cashflow",
    desc:"Record shares issued, debentures issued/repaid, and loans in the financing section.",
    partSummary:["Shares issued","Debentures","Loans","Net financing"],
    question:`<p>Shares issued during year: <strong>€50,000</strong> (at a premium of €10,000). Debentures repaid: <strong>€30,000</strong>. New loan taken: <strong>€40,000</strong>.</p>`,
    steps:[
      {title:"Step 1 — Share Issue",marks:2,explain:"Total cash from shares = Nominal + Premium = 50,000 + 10,000 = €60,000. This is a cash inflow.",content:`<p class="text-sm">Shares issued (incl premium) = <strong>€60,000</strong> (inflow)</p>`,mistakes:["Excluding the share premium — the full cash received goes here"]},
      {title:"Step 2 — Debentures & Loans",marks:2,explain:"Debentures repaid = €30,000 (outflow). New loan = €40,000 (inflow).",content:`<table class="w-full text-sm border-collapse"><tbody><tr><td class="p-2 border border-border">Shares issued</td><td class="p-2 border border-border text-right font-mono">60,000</td></tr><tr><td class="p-2 border border-border">Debentures repaid</td><td class="p-2 border border-border text-right font-mono">(30,000)</td></tr><tr><td class="p-2 border border-border">Loan received</td><td class="p-2 border border-border text-right font-mono">40,000</td></tr><tr class="font-bold bg-muted"><td class="p-2 border border-border">Net Financing</td><td class="p-2 border border-border text-right font-mono">70,000</td></tr></tbody></table>`,mistakes:[]},
      {title:"Step 3 — Note",marks:2,explain:"Financing section only shows CASH movements. Share issue = total cash received. Debenture interest is in Section 2, not here.",content:`<p class="text-sm">Financing = cash from/to capital providers. Interest is in Section 2.</p>`,mistakes:["Putting interest payments in Financing"]}
    ]
  }
];
