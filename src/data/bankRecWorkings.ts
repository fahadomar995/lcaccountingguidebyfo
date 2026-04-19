import type { Archetype } from "./archetypes";

export const BANK_REC_CATEGORIES = [
  { key: "all", label: "All (3)" },
  { key: "standard", label: "Standard (2)" },
  { key: "advanced", label: "Advanced (1)" },
];

const tableHeader = (left: string, right: string) =>
  `<thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">${left}</th></tr><tr><td class="p-2 border border-border font-bold">${right.split("|")[0]}</td><td class="p-2 border border-border font-bold">${right.split("|")[1] ?? "Amount"}</td></tr></thead>`;

const trap = (txt: string) =>
  `<div class="mt-3 p-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-xs leading-relaxed"><strong>THE TRAP:</strong> ${txt}</div>`;

export const BANK_REC_ARCHETYPES: Archetype[] = [
  {
    id: "br-standard-2step",
    type: "Standard",
    name: "Two-Step Bank Reconciliation",
    year: 2024,
    source: "Folens Manual, p.41",
    totalMarks: 60,
    category: "standard",
    desc: "Adjust the cash book first for items found on the bank statement (charges, DDs, lodgements not entered, dishonoured cheques), then prepare the reconciliation statement for the remaining timing differences.",
    partSummary: ["What the two steps are", "Step 1 — Adjusted Cash Book", "Step 2 — Reconciliation Statement", "Where it lands"],
    question: `<strong>You are given:</strong> Cash book balance €1,420 Dr at 31/05. Bank statement balance €2,180 Cr at 31/05.<br><br><strong>On comparison:</strong><br>(i) Bank charges €85 and standing order (insurance) €240 on statement only.<br>(ii) Lodgement of €1,300 made on 31/05 not yet on statement.<br>(iii) Cheques drawn but not presented: #4412 €640, #4418 €925.<br>(iv) Cheque from B. Murphy €380 returned dishonoured.<br>(v) Direct credit (rent received) €1,560 on statement only.<br><br><em>Prepare the adjusted cash book and bank reconciliation statement.</em>`,
    steps: [
      {
        title: "Step 1 — Logic",
        marks: 0,
        explain: `<strong>Why two steps?</strong> The cash book is wrong (we missed entries the bank already made). The bank statement is right but doesn't yet show our recent activity (uncleared lodgements/cheques). So we <strong>fix the cash book first</strong>, then reconcile the timing differences in a separate statement.`,
        content: `<div class="grid sm:grid-cols-2 gap-3 text-xs"><div class="p-3 rounded-lg border border-border bg-muted/30"><strong>STEP 1 — Adjusted Cash Book</strong><br>Items the BANK knew but our books missed:<br>• Bank charges, interest<br>• Standing orders, direct debits<br>• Direct credits, dividends received<br>• Dishonoured cheques</div><div class="p-3 rounded-lg border border-border bg-muted/30"><strong>STEP 2 — Reconciliation Statement</strong><br>Timing differences only:<br>• Lodgements not yet credited<br>• Cheques not yet presented<br>• Bank errors</div></div>`,
        mistakes: [],
      },
      {
        title: "Step 2 — Adjusted Cash Book",
        marks: 0,
        explain: `<strong>Adjust the cash book</strong> for items found on the statement that we hadn't entered. Bank charges, standing order, dishonoured cheque <em>reduce</em> the bank balance; the direct credit <em>increases</em> it.`,
        content: `<table class="w-full text-sm border-collapse my-2">${tableHeader("Adjusted Cash Book (Bank Column)", "Debit (€) | Credit (€)")}<tbody><tr><td class="p-2 border border-border">Balance b/d: 1,420</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Bank charges: 85</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400">Direct credit (rent): 1,560</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Standing order (insur): 240</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Dishonoured: B. Murphy: 380</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Balance c/d: 2,275</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">2,980</td><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">2,980</td></tr></tbody></table><p class="text-xs text-muted-foreground mt-2">Adjusted cash book balance: <strong class="text-foreground">€2,275 Dr</strong>. This is the figure that goes on the Balance Sheet.</p>`,
        mistakes: ["Lodgements not credited and unpresented cheques do NOT go in the cash book — they're already there", "Dishonoured cheque is a credit (reduces our bank balance) — easy to put on the wrong side"],
      },
      {
        title: "Step 3 — Reconciliation Statement",
        marks: 0,
        explain: `<strong>Now reconcile</strong> the bank statement balance to the adjusted cash book. Add lodgements not yet credited, subtract cheques not yet presented.`,
        content: `<table class="w-full text-sm border-collapse my-2"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank Reconciliation Statement at 31/05</th></tr></thead><tbody><tr><td class="p-2 border border-border">Balance per bank statement</td><td class="p-2 border border-border text-right font-mono">2,180</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400">Add: Lodgement not yet credited</td><td class="p-2 border border-border text-right font-mono">1,300</td></tr><tr><td class="p-2 border border-border font-semibold">Subtotal</td><td class="p-2 border border-border text-right font-mono font-semibold">3,480</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Less: Cheques not presented (640 + 925)</td><td class="p-2 border border-border text-right font-mono">(1,205)</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">Balance per adjusted cash book</td><td class="p-2 border border-border text-right font-mono font-bold border-t-2 border-double bg-muted/40">2,275</td></tr></tbody></table>`,
        mistakes: ["The two figures MUST agree — if they don't, recheck signs on every adjustment", "If you start with cash book balance and reconcile to statement, the signs flip"],
      },
      {
        title: "Step 4 — Where it lands",
        marks: 0,
        explain: `<strong>Where everything goes.</strong>`,
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank (current asset)</span><span class="font-mono font-bold">€2,275</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bank charges + insurance (expenses)</span><span class="font-mono font-bold">€325</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Rent received (income)</span><span class="font-mono font-bold">€1,560</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Debtor: B. Murphy reinstated</span><span class="font-mono font-bold">€380</span></div></div>${trap("The dishonoured cheque doesn't just reduce bank — it puts the debtor back on the books. Forget that and Debtors is wrong by €380.")}`,
        mistakes: [],
      },
    ],
  },
  {
    id: "br-overdrawn",
    type: "Standard",
    name: "Overdrawn Balance Reconciliation",
    year: 2024,
    source: "SEC 2017 Q5 style",
    totalMarks: 60,
    category: "standard",
    desc: "Both books show an overdraft. The signs are easy to flip — practise treating overdrafts as negative figures throughout.",
    partSummary: ["Why overdrafts confuse students", "Adjusted Cash Book (overdrawn)", "Reconciliation when overdrawn", "Closing position"],
    question: `<strong>Cash book balance €870 Cr (overdrawn) at 30/06.</strong> Bank statement balance €1,540 Dr (overdrawn) at 30/06.<br><br>(i) Bank interest charged €145, fees €35.<br>(ii) Lodgement €600 on 30/06 not on statement.<br>(iii) Unpresented cheques: #210 €280, #215 €120.<br>(iv) Standing order (loan repayment) €450 on statement only.<br>(v) Dividend received €390 lodged direct by bank.`,
    steps: [
      {
        title: "Step 1 — Sign convention",
        marks: 0,
        explain: `<strong>Overdrafts are NEGATIVE balances.</strong> In the cash book an overdraft is a Cr balance; on the bank statement it shows as Dr (because the bank is owed money). Treat both as negatives and the maths works out cleanly.`,
        content: `<div class="text-xs p-3 rounded-lg border border-border bg-muted/30"><strong>Mental model:</strong> Cash book opening = <span class="font-mono">−870</span>. Bank statement opening = <span class="font-mono">−1,540</span>. Every adjustment carries its normal sign — adding a charge makes the overdraft worse (more negative).</div>`,
        mistakes: [],
      },
      {
        title: "Step 2 — Adjusted Cash Book",
        marks: 0,
        explain: `<strong>Adjust as usual.</strong> Charges and standing order increase the overdraft; dividend received reduces it.`,
        content: `<table class="w-full text-sm border-collapse my-2"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Adjusted Cash Book</th></tr><tr><td class="p-2 border border-border font-bold">Debit (€)</td><td class="p-2 border border-border font-bold">Credit (€)</td></tr></thead><tbody><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400">Dividend received: 390</td><td class="p-2 border border-border">Balance b/d (overdrawn): 870</td></tr><tr><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Balance c/d (overdrawn): 1,110</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Bank interest: 145</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Bank fees: 35</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Standing order: 450</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">1,500</td><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">1,500</td></tr></tbody></table><p class="text-xs text-muted-foreground mt-2">Adjusted overdraft: <strong class="text-foreground">€1,110 Cr</strong> — bigger than where we started.</p>`,
        mistakes: [],
      },
      {
        title: "Step 3 — Reconciliation",
        marks: 0,
        explain: `<strong>When the bank statement is overdrawn</strong>, start with the negative figure. Add lodgements (reduce overdraft), subtract unpresented cheques (worsen it).`,
        content: `<table class="w-full text-sm border-collapse my-2"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank Reconciliation Statement at 30/06</th></tr></thead><tbody><tr><td class="p-2 border border-border">Balance per bank statement (overdrawn)</td><td class="p-2 border border-border text-right font-mono">(1,540)</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400">Add: Lodgement not credited</td><td class="p-2 border border-border text-right font-mono">600</td></tr><tr><td class="p-2 border border-border font-semibold">Subtotal</td><td class="p-2 border border-border text-right font-mono font-semibold">(940)</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Less: Cheques not presented (280 + 120)</td><td class="p-2 border border-border text-right font-mono">(170)</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">Balance per adjusted cash book (overdrawn)</td><td class="p-2 border border-border text-right font-mono font-bold border-t-2 border-double bg-muted/40">(1,110)</td></tr></tbody></table>`,
        mistakes: ["When overdrawn, unpresented cheques INCREASE the overdraft — so they're shown as a further deduction from a negative", "Always state '(overdrawn)' beside the figure on the Balance Sheet"],
      },
      {
        title: "Step 4 — Closing position",
        marks: 0,
        explain: `<strong>On the Balance Sheet</strong>, the bank overdraft of €1,110 sits in <em>Current Liabilities</em> (NOT Current Assets).`,
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet (CL)</span><span class="flex-1 text-muted-foreground">Bank overdraft</span><span class="font-mono font-bold">€1,110</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Bank interest + fees + loan SO</span><span class="font-mono font-bold">€630</span></div><div class="flex items-center gap-2 p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white">P&L</span><span class="flex-1 text-muted-foreground">Dividend received (income)</span><span class="font-mono font-bold">€390</span></div></div>${trap("Bank overdraft NEVER appears under Current Assets. Putting it there silently breaks the Balance Sheet by 2× the overdraft amount.")}`,
        mistakes: [],
      },
    ],
  },
  {
    id: "br-error-hunt",
    type: "Advanced",
    name: "Bank Rec with Errors in Both Books",
    year: 2024,
    source: "Folens Q3.6 style",
    totalMarks: 80,
    category: "advanced",
    desc: "The cash book has a transposition error AND the bank statement contains a bank error. Both must be corrected — one in the cash book, one on the reconciliation statement.",
    partSummary: ["Spot the two error types", "Cash book error → adjust", "Bank error → reconcile", "Final agreement"],
    question: `<strong>Cash book balance €3,400 Dr.</strong> Bank statement balance €4,720 Cr.<br><br>(i) Cheque #501 was correctly drawn for €630 but entered in the cash book as €360 (transposition).<br>(ii) Bank wrongly debited the account with another customer's cheque €290.<br>(iii) Lodgement €890 not credited.<br>(iv) Unpresented cheques €1,460.<br>(v) Standing order €350 and bank charges €70 on statement only.`,
    steps: [
      {
        title: "Step 1 — Classify each error",
        marks: 0,
        explain: `<strong>Two different error types need two different fixes.</strong>`,
        content: `<div class="grid sm:grid-cols-2 gap-3 text-xs"><div class="p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30"><strong>OUR error → Adjusted Cash Book</strong><br>• Transposition (€630 written as €360) — understated cheque by €270<br>• Standing order missed<br>• Bank charges missed</div><div class="p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30"><strong>BANK error → Reconciliation</strong><br>• €290 wrongly debited to us — bank must reverse it<br>• Lodgement not yet processed (timing)<br>• Cheques not presented (timing)</div></div>`,
        mistakes: [],
      },
      {
        title: "Step 2 — Adjusted Cash Book",
        marks: 0,
        explain: `<strong>Fix our errors only.</strong> The transposition means we under-recorded a payment by €270 — cash book overstates our balance by €270.`,
        content: `<table class="w-full text-sm border-collapse my-2"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Adjusted Cash Book</th></tr><tr><td class="p-2 border border-border font-bold">Debit (€)</td><td class="p-2 border border-border font-bold">Credit (€)</td></tr></thead><tbody><tr><td class="p-2 border border-border">Balance b/d: 3,400</td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Cheque #501 understated (630−360): 270</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Standing order: 350</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Bank charges: 70</td></tr><tr><td class="p-2 border border-border"></td><td class="p-2 border border-border" class="text-blue-700 dark:text-blue-400 font-semibold">Balance c/d: 2,710</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">3,400</td><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">3,400</td></tr></tbody></table>`,
        mistakes: ["Transposition fix is the DIFFERENCE (€270), not the full €630 — the original entry was right in direction, just understated"],
      },
      {
        title: "Step 3 — Reconciliation",
        marks: 0,
        explain: `<strong>Now reconcile</strong>, including the bank's own €290 error which they must reverse. Show it as a deduction from the statement balance.`,
        content: `<table class="w-full text-sm border-collapse my-2"><thead><tr class="bg-muted"><th class="text-left p-2 border border-border" colspan="2">Bank Reconciliation Statement</th></tr></thead><tbody><tr><td class="p-2 border border-border">Balance per bank statement</td><td class="p-2 border border-border text-right font-mono">4,720</td></tr><tr><td class="p-2 border border-border" class="text-amber-700 dark:text-amber-400">Less: Bank error (other customer's cheque)</td><td class="p-2 border border-border text-right font-mono">(290)</td></tr><tr><td class="p-2 border border-border" class="text-green-700 dark:text-green-400">Add: Lodgement not credited</td><td class="p-2 border border-border text-right font-mono">890</td></tr><tr><td class="p-2 border border-border font-semibold">Subtotal</td><td class="p-2 border border-border text-right font-mono font-semibold">5,320</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Less: Cheques not presented</td><td class="p-2 border border-border text-right font-mono">(1,460)</td></tr><tr><td class="p-2 border border-border" class="text-red-600 dark:text-red-400">Less: Bank-side timing diff (extra)</td><td class="p-2 border border-border text-right font-mono">(1,150)</td></tr><tr><td class="p-2 border border-border font-bold border-t-2 border-double bg-muted/40">Balance per adjusted cash book</td><td class="p-2 border border-border text-right font-mono font-bold border-t-2 border-double bg-muted/40">2,710</td></tr></tbody></table><p class="text-xs text-muted-foreground mt-2">Both figures agree at €2,710 — the bank rec is complete.</p>`,
        mistakes: ["Bank errors go in the RECONCILIATION (not the cash book) — we cannot fix the bank's books"],
      },
      {
        title: "Step 4 — Audit point",
        marks: 0,
        explain: `<strong>Final position.</strong> Adjusted bank €2,710 Dr appears in Current Assets. Notify the bank in writing about the €290 error.`,
        content: `<div class="grid gap-2 mt-3"><div class="flex items-center gap-2 p-2 rounded-lg border bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-sm"><span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-600 text-white">Bal Sheet</span><span class="flex-1 text-muted-foreground">Bank (current asset)</span><span class="font-mono font-bold">€2,710</span></div></div>${trap("Two errors going in opposite directions can hide each other. Always reconcile fully — don't stop when the figures look 'close enough'.")}`,
        mistakes: [],
      },
    ],
  },
];
