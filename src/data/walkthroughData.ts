// ═══════════════════════════════════════════════════
// Q1 WALKTHROUGH DATA — 3 walkthroughs (extracted from original HTML)
// Sole Trader (2023), Company (2024), Manufacturing (2022)
// ═══════════════════════════════════════════════════

import type { TAccountDef } from "@/components/TAccount";
import { CO_NOTES_STEPS, CO_TPL_STEPS_NEW, CO_BS_STEPS_NEW } from "./walkthroughCompany";
import { MFG_NOTES_STEPS, MFG_TPL_STEPS_NEW, MFG_BS_STEPS_NEW } from "./walkthroughManufacturing";

// ── Step-based T-account engine types ──
export interface NoteStepEntry {
  x: string;       // description
  v: string;       // value/amount
  h?: 'g' | 'r' | 'a' | 'b';  // highlight color
  tot?: number;     // 1 = total row (border-top)
}

export interface NoteStepAccount {
  n: string;        // account name
  d: NoteStepEntry[];  // debit entries
  c: NoteStepEntry[];  // credit entries
  s: 'd' | 'c' | 'a';  // show side: d=debit only, c=credit only, a=both
}

export interface NoteStepDest {
  t: 'trading' | 'pnl' | 'bs';  // destination type
  l: string;       // label (Trading, P&L, Bal Sheet)
  x: string;       // description
  v: string;       // amount
}

export interface NoteStep {
  expl?: { t: 'info' | 'warning' | 'danger' | 'success'; tx: string };
  accts?: NoteStepAccount[];
  dests?: NoteStepDest[];
  nw?: string[];
  trap?: string;
}

export interface WalkthroughNote {
  num: number;
  marks: number;
  title: string;
  noteText: string;
  tbLook: string;
  task: string;
  steps?: NoteStep[];
  // Legacy fields (kept for backwards compat)
  workings?: WalkthroughWorking[];
  destinations?: WalkthroughDestination[];
  tip?: string;
  watchOut?: string;
  tAccountDefs?: TAccountDef[];
}

export interface WalkthroughWorking {
  type: 'calc' | 't-account';
  title: string;
  content?: string;
  account?: {
    name: string;
    debits: { desc: string; amt: string; rv: boolean }[];
    credits: { desc: string; amt: string; rv: boolean }[];
    debitTotal?: string;
    creditTotal?: string;
  };
  below?: string;
}

export interface WalkthroughDestination {
  name: string;
  arrow: string;
  amt: string;
  where: string;
}

export interface BuilderStep {
  title: string;
  rows: string[];
  source: string;
  reason?: string;
  watch?: string;
  tip?: string;
}

export interface Walkthrough {
  id: string;
  title: string;
  subtitle: string;
  type: 'sole-trader' | 'company' | 'manufacturing';
  year: string;
  introHtml: string;
  tplTabLabel: string;
  notes: WalkthroughNote[];
  tplSteps: BuilderStep[];
  bsSteps: BuilderStep[];
  tplMarks: string;
  bsMarks: string;
  tplComplete: string;
  bsComplete: string;
}


// ═══════════════════════════════════════════════════
// 1. SOLE TRADER — Jim Beechinor 2023
// ═══════════════════════════════════════════════════

const ST_INTRO = `
<div class="wt-intro-box green">
  <h3>Meet the Question — Jim Beechinor (2023 Mock Paper)</h3>
  <p>Before diving into the workings, take a moment to <strong>read the actual exam question</strong>. Study the trial balance and notes carefully.</p>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">
    <img src="/images/q1-sole-2023-p1.jpg" alt="2023 Mock Paper Q1 — Trial Balance" style="width:100%;border:1px solid #e0e0e0;border-radius:8px;" />
    <img src="/images/q1-sole-2023-p2.jpg" alt="2023 Mock Paper Q1 — Notes" style="width:100%;border:1px solid #e0e0e0;border-radius:8px;" />
  </div>
</div>

<div class="wt-intro-box">
  <h3>How to Approach Q1 Final Accounts</h3>
  <p>Q1 is worth <strong>120 marks</strong> and is the longest single question on the paper. Don't panic — every Q1 follows the same predictable structure. The trick is to <strong>work in a fixed order</strong> so you never miss anything and you never duplicate work.</p>
  <h4>The 5-step approach:</h4>
  <ol>
    <li><strong>Read the trial balance first.</strong> Don't read the notes yet. Just look at every line and ask "is this an asset, liability, expense, income, or capital item?" Get a feel for the size of the business.</li>
    <li><strong>Read the notes from top to bottom.</strong> Some notes affect multiple things (e.g. asset disposal affects depreciation, fixed assets, AND profit on disposal). Don't try to do them yet — just understand what each is asking.</li>
    <li><strong>Work through the notes one at a time.</strong> Open the relevant T-account, do the calculation, and immediately label where each figure goes (P&L, S+D, balance sheet, etc.). Tick off the note when done.</li>
    <li><strong>Build the Trading, Profit & Loss account line by line.</strong> Tick off each working as you place it. Anything not ticked at the end means you've forgotten something.</li>
    <li><strong>Build the Balance Sheet line by line.</strong> Same approach. The capital section pulls in revaluation reserve, net profit, and drawings — these are the easy marks.</li>
  </ol>
</div>

<div class="wt-intro-box cyan">
  <h3>How to Read the Trial Balance (DEAL / CLIP)</h3>
  <p>The trial balance has two columns — <strong>Debit</strong> and <strong>Credit</strong>. The side a figure is on tells you what it is:</p>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Side (DEAL)</div>
      <div class="wt-dc-item"><strong>D</strong>ebtors / Drawings</div>
      <div class="wt-dc-item"><strong>E</strong>xpenses</div>
      <div class="wt-dc-item"><strong>A</strong>ssets</div>
      <div class="wt-dc-item"><strong>L</strong>osses</div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Side (CLIP)</div>
      <div class="wt-dc-item"><strong>C</strong>reditors / Capital</div>
      <div class="wt-dc-item"><strong>L</strong>iabilities</div>
      <div class="wt-dc-item"><strong>I</strong>ncome</div>
      <div class="wt-dc-item"><strong>P</strong>rofits</div>
    </div>
  </div>
  <h4>How to use this:</h4>
  <p>Take any item in the TB and check which column it's in. <strong>Salaries on the debit side?</strong> That's an expense → goes in P&L expenses. <strong>Discount on the credit side?</strong> That's discount received (income) → goes in P&L other income.</p>
  <div class="wt-watch-box"><strong>Watch out:</strong> "Discount (net)" in the trial balance means the question has already netted discount allowed against discount received. Credit side means net discount RECEIVED (income), debit side means net discount ALLOWED (expense).</div>
</div>

<div class="wt-intro-box purple">
  <h3>The T-Account Rules — Memory Aid</h3>
  <p>Whenever you open a T-account in your workings, this rule tells you which side an entry goes on:</p>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Increases</div>
      <div class="wt-dc-item"><strong>Expense</strong></div>
      <div class="wt-dc-item"><strong>Asset</strong></div>
      <div class="wt-dc-item"><strong>Reducing Liability</strong></div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Increases</div>
      <div class="wt-dc-item"><strong>Income</strong></div>
      <div class="wt-dc-item"><strong>Liability</strong></div>
      <div class="wt-dc-item"><strong>Reducing Asset</strong></div>
    </div>
  </div>
  <p>So if you're doing <strong>depreciation</strong>: depreciation is an EXPENSE (debit P&L) and accumulated depreciation REDUCES the asset (credit accumulated depreciation account).</p>
</div>

<div class="wt-intro-box orange">
  <h3>Common Q1 Traps to Watch For</h3>
  <ul>
    <li><strong>Asset disposal (the classic):</strong> A van or piece of equipment is "traded in" against a new one. Watch for phrases like "traded in", "exchanged", "allowance", "part exchange".</li>
    <li><strong>Sale or return stock:</strong> Goods on "sale or return" basis are NOT actually purchased until accepted. Reverse the purchase AND remove from closing stock.</li>
    <li><strong>Suspense account:</strong> The suspense balance arises from posting errors. Find ALL errors — the suspense balance must equal the sum of corrections.</li>
    <li><strong>VAT on building purchases:</strong> If a building is bought "including VAT", the VAT portion is reclaimable.</li>
    <li><strong>Goods taken for own use:</strong> Reduce purchases and increase drawings. Always use COST, not retail.</li>
    <li><strong>Goods in transit:</strong> Add to BOTH purchases AND closing stock at COST.</li>
    <li><strong>Investment income with patents:</strong> Sometimes income is hidden inside a patent figure — separate it first.</li>
    <li><strong>Profit MARGIN vs Mark-up:</strong> "Cost plus 20%" means mark-up. "20% margin" means 20% of selling price.</li>
  </ul>
</div>
`;

const ST_NOTES: WalkthroughNote[] = [
{num:1,marks:6,title:'Stock & Sale or Return',
noteText:'Stock at 31/12/2022 at cost was <strong>€32,300</strong>. Included in this figure are goods <strong>purchased</strong> on a \'sale or return\' basis. These goods had been recorded as a credit purchase with a recommended retail price of <strong>€4,200</strong>, which is cost plus 20%.',
tbLook:'<p>Look at the trial balance for these lines:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Stock 01/01/2022</td><td>20,800</td><td></td></tr><tr><td>Purchases</td><td>412,500</td><td></td></tr><tr><td>Debtors and creditors</td><td>49,250</td><td>33,560</td></tr></table><p><strong>Important:</strong> The TB shows OPENING stock (€20,800). The closing stock is given in the notes, NOT in the TB.</p>',
task:'<p><strong>Two things to do:</strong></p><ol><li>Reverse the sale-or-return purchase: reduce purchases AND reduce creditors by the COST of the goods (not retail price)</li><li>Remove the same goods from closing stock at COST</li></ol><p>Cost = retail ÷ 1.20 (because retail is cost plus 20%)</p>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Work back to cost.</strong> The retail value is €4,200, which is cost plus 20%. So cost = €4,200 ÷ 1.20 = <strong>€3,500</strong>. Always use cost price for this adjustment because that\'s how the goods were originally recorded.'},
   accts:[{n:'Cost Calculation',d:[{x:'Retail price',v:'4,200'},{x:'Mark-up: cost + 20%',v:'÷ 1.20'},{x:'Cost',v:'3,500',h:'g',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Reverse the purchase.</strong> Credit Purchases and Debit Creditors — this cancels the incorrect entry. The supplier still owns the goods; no purchase has really happened.'},
   accts:[{n:'Purchases A/C',d:[],c:[{x:'Sale-or-return reversal',v:'3,500',h:'r'}],s:'c'},{n:'Creditors A/C',d:[{x:'Sale-or-return reversal',v:'3,500',h:'r'}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Remove from closing stock.</strong> The goods were sitting in the warehouse and were counted as closing stock. Since we\'ve now reversed the purchase, they can\'t be in our stock either. Reduce closing stock by €3,500 (cost).'},
   accts:[{n:'Closing Stock A/C',d:[{x:'Stock as given',v:'32,300'},{x:'Less: sale-or-return (cost)',v:'(3,500)',h:'r'},{x:'Add: goods in transit (Note 9)',v:'5,200',h:'g'},{x:'Adjusted closing stock',v:'34,000',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'trading',l:'Trading',x:'Purchases (−3,500)',v:'see W3'},{t:'bs',l:'Bal Sheet',x:'Creditors (−3,500)',v:'see W17'},{t:'trading',l:'Trading',x:'Closing Stock (adjusted)',v:'34,000'},{t:'bs',l:'Bal Sheet',x:'Stock in Current Assets',v:'34,000'}],
   nw:['W1  Purchases: 412,500 − 3,500 − 23,000 − 6,750 + 5,200 − 3,000 = 381,450','W2  Closing stock: 32,300 − 3,500 + 5,200 = 34,000','W17 Creditors: 33,560 − 3,500 + 5,200 − 4,600 = 30,660'],
   trap:'<strong>KEY:</strong> The €4,200 is the RETAIL price. Never use retail for the purchase reversal — always convert to cost first. "Cost plus 20%" means retail is 120% of cost, so divide by 1.20.'}
]},

{num:2,marks:14,title:'Depreciation on Vans + Asset Disposal',
noteText:'Provide for depreciation on delivery vans at an annual rate of <strong>20% of cost</strong> from date of purchase to date of sale. <br><strong>Note:</strong> On 30/06/2022 a delivery van, which had cost <strong>€30,000 on 31/07/2018</strong>, was traded in against a new van which cost <strong>€37,000</strong>. An allowance of <strong>€14,000</strong> was made on the old van. The bank transfer for the net amount of this transaction was incorrectly treated as a purchase of trading stock. This was the only entry made in the books in respect of this transaction.',
tbLook:'<p>Look at the trial balance for delivery vans:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Delivery vans (cost €135,000)</td><td>55,000</td><td></td></tr></table><p>The €55,000 is the NBV (Net Book Value). The cost is €135,000. So accumulated depreciation already in the books = <strong>€135,000 − €55,000 = €80,000</strong>.</p>',
task:'<p><strong>This is THE classic Q1 trap.</strong> Five things to do:</p><ol><li>Calculate depreciation on the OLD van for 6 months (Jan–Jun 2022)</li><li>Calculate the NBV of the OLD van at date of disposal</li><li>Find profit or loss on disposal: (Allowance + Trade-in proceeds) − NBV</li><li>Correct the books — the cash payment was wrongly treated as stock purchase</li><li>Calculate depreciation on the NEW van for 6 months (Jul–Dec 2022)</li><li>Plus depreciation on remaining old vans for the full year</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — The wrong entry.</strong> Net cheque for the new van = €37,000 − €14,000 (trade-in) = <strong>€23,000</strong>. Beechinor wrongly posted this to purchases. The only entry in the books was Dr Purchases €23,000, Cr Bank €23,000.'},
   accts:[{n:'Purchases A/C (as recorded)',d:[{x:'Per trial balance',v:'412,500'}],c:[],s:'d'},{n:'Delivery Vans A/C (Cost)',d:[{x:'Per trial balance',v:'135,000'}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Reverse the purchase error.</strong> Credit Purchases by €23,000 to remove the wrong entry.'},
   accts:[{n:'Purchases A/C',d:[{x:'Per trial balance',v:'412,500'}],c:[{x:'Reverse van cheque',v:'23,000',h:'r'}],s:'a'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Record the new van and remove the old van.</strong> Debit Vans with the new van cost (€37,000). Credit Vans to remove the disposed old van at its original cost (€30,000).'},
   accts:[{n:'Delivery Vans A/C (Cost)',d:[{x:'Per trial balance',v:'135,000'},{x:'New van purchased',v:'37,000',h:'g'}],c:[{x:'Old van disposed (cost)',v:'30,000',h:'r'},{x:'Balance c/d',v:'142,000',h:'b',tot:1}],s:'a'}]},
  {expl:{t:'info',tx:'<strong>Step 4 — Current year depreciation split three ways.</strong> Old van gets 6 months (Jan–Jun, before disposal). New van gets 6 months (Jul–Dec, after purchase). Other vans get the full year at 20% of their cost.'},
   accts:[{n:'Depreciation Working (→ P&L)',d:[{x:'Old van: 30,000 × 20% × 6/12',v:'3,000',h:'r'},{x:'Other vans: 105,000 × 20%',v:'21,000',h:'b'},{x:'New van: 37,000 × 20% × 6/12',v:'3,700',h:'g'},{x:'TOTAL → S&D Expenses',v:'27,700',tot:1}],c:[],s:'d'}]},
  {expl:{t:'danger',tx:'<strong>Step 5 — Disposal account.</strong> The old van ran from 31/07/2018 to 30/06/2022 = <strong>47 months</strong>. Accumulated depreciation = €30,000 × 20% × 47/12 = €23,500. NBV = €30,000 − €23,500 = €6,500. Trade-in allowance = €14,000. Profit = €14,000 − €6,500 = €7,500.'},
   accts:[{n:'Disposal of Van A/C',d:[{x:'Cost of old van',v:'30,000'},{x:'Profit on disposal → Other Income',v:'7,500',h:'g',tot:1}],c:[{x:'Accum depn (47 months)',v:'23,500',h:'a'},{x:'Trade-in allowance',v:'14,000',h:'b',tot:1}],s:'a'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'trading',l:'Trading',x:'Purchases corrected (−23,000)',v:'see W3'},{t:'pnl',l:'P&L',x:'Profit on disposal → Other Income',v:'7,500'},{t:'pnl',l:'P&L',x:'Depreciation on vans → S&D',v:'27,700'},{t:'bs',l:'Bal Sheet',x:'Vans cost: 135k + 37k − 30k',v:'142,000'},{t:'bs',l:'Bal Sheet',x:'Vans acc dep: 80k + 27.7k − 23.5k',v:'84,200'}],
   nw:['W3  Purchases: 412,500 − 23,000 (etc.) = 381,450','W9  Dep: 3,000 + 21,000 + 3,700 = 27,700','W10 Profit: 14,000 − 6,500 = 7,500','W13 Vans cost: 135,000 + 37,000 − 30,000 = 142,000','W13 Vans AD: 80,000 + 27,700 − 23,500 = 84,200'],
   trap:'<strong>THE TRAP:</strong> The van cheque is hidden in Purchases. Miss the reversal and Purchases is €23,000 too high, Cost of Sales is wrong, Gross Profit is wrong, and every total downstream is wrong. This single error can cascade into 15+ lost marks.'}
]},

{num:3,marks:8,title:'Suspense Account',
noteText:'The suspense figure arises as a result of the posting of an incorrect figure for mortgage interest in the mortgage interest account (although the correct figure for mortgage interest had been entered in the bank account) and <strong>discount allowed €110</strong> entered only in the discount account.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Suspense</td><td></td><td>1,010</td></tr><tr><td>Mortgage Interest (paid first 4 months)</td><td>4,300</td><td></td></tr><tr><td>Discount (net)</td><td></td><td>450</td></tr></table><p>Suspense is on the <strong>credit side</strong> at €1,010. This is the net balance of two errors.</p>',
task:'<p><strong>Two errors to correct:</strong></p><ol><li>Discount allowed €110 was posted only to the discount account. The other side (Cr Debtors) is missing.</li><li>Mortgage interest account has the wrong figure. Bank is correct. We need to find the mortgage interest error using the suspense balance.</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Start with the suspense balance.</strong> The TB shows €1,010 on the credit side. This is the NET of the two errors — we need to clear it to zero by making correcting entries.'},
   accts:[{n:'Suspense A/C',d:[],c:[{x:'Balance per TB',v:'1,010',h:'b'}],s:'c'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Fix the discount error.</strong> Discount allowed €110 was debited to the discount account but the other side (credit to Debtors) is missing. To clear the missing entry: Dr Suspense €110, Cr Debtors €110.'},
   accts:[{n:'Suspense A/C',d:[{x:'Discount allowed correction',v:'110',h:'r'}],c:[{x:'Balance per TB',v:'1,010',h:'b'}],s:'a'},{n:'Debtors A/C',d:[],c:[{x:'Discount allowed (missing)',v:'110',h:'r'}],s:'c'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Fix the mortgage interest error.</strong> The bank account is correct, so the true cash paid = €3,400 (first 4 months). The mortgage interest account shows €4,300, overstated by €900. Clear: Dr Suspense €900, Cr Mortgage Interest €900.'},
   accts:[{n:'Suspense A/C',d:[{x:'Discount correction',v:'110',h:'r'},{x:'Mortgage interest correction',v:'900',h:'r'},{x:'',v:'1,010',tot:1}],c:[{x:'Balance per TB',v:'1,010',h:'b'},{x:'',v:''},{x:'',v:'1,010',tot:1}],s:'a'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'bs',l:'Bal Sheet',x:'Debtors reduced by €110',v:'49,140'},{t:'pnl',l:'P&L',x:'True mortgage int paid = 4,300 − 900',v:'3,400'}],
   nw:['W11 True paid: 4,300 − 900 = 3,400 (feeds into mortgage interest due calc)','W15 Debtors: 49,250 − 110 = 49,140'],
   trap:'<strong>KEY:</strong> The €4,300 in the TB is NOT the cash paid — it\'s what the mortgage interest account wrongly recorded. The actual cash paid was €3,400. This matters for calculating mortgage interest due (Note 7).'}
]},

{num:4,marks:11,title:'Patents with Hidden Investment Income',
noteText:'Patents, which <strong>incorporate 3 months investment income received</strong>, are to be written off over a <strong>10-year period</strong> commencing in 2022.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>4% Investments (01/04/2022)</td><td>100,000</td></tr><tr><td>Patents (incorporating 3 months investment income)</td><td>62,500</td></tr></table><p>Investments acquired 01/04/2022 → 9 months ownership (Apr–Dec). Only 3 months of interest has been received, credited to patents by mistake.</p>',
task:'<p><strong>Three things:</strong></p><ol><li>Calculate 9 months of investment interest for the P&L (full year earned)</li><li>Remove the 3 months wrongly hidden in patents → put in investment income</li><li>Write off the cleaned-up patents over 10 years</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Full year investment income (9 months).</strong> Investments €100,000 at 4% held for 9 months (Apr–Dec). Income earned = €100,000 × 4% × 9/12 = <strong>€3,000</strong>.'},
   accts:[{n:'Investment Income Working',d:[{x:'9 months: 100k × 4% × 9/12',v:'3,000',h:'g'},{x:'3 months received (in patents)',v:'(1,000)',h:'a'},{x:'Investment income due (CA)',v:'2,000',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Clean up the patents figure.</strong> The 3 months of income (€1,000) was CREDITED to patents by mistake (reducing the balance). To reverse: add €1,000 back to patents. True patents balance = €62,500 + €1,000 = <strong>€63,500</strong>.'},
   accts:[{n:'Patents A/C',d:[{x:'Per trial balance',v:'62,500'},{x:'Add back: wrongly credited income',v:'1,000',h:'g'},{x:'True patents balance',v:'63,500',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Write off over 10 years.</strong> The plan commenced in 2022 — this is year 1. Annual write-off = €63,500 ÷ 10 = <strong>€6,350</strong>. Balance remaining on BS = €63,500 − €6,350 = €57,150.'},
   accts:[{n:'Patents A/C',d:[{x:'True balance',v:'63,500'}],c:[{x:'Write-off → P&L (1/10)',v:'6,350',h:'r'},{x:'Balance → Bal Sheet',v:'57,150',h:'b',tot:1}],s:'a'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'pnl',l:'P&L',x:'Investment income',v:'3,000'},{t:'bs',l:'Bal Sheet',x:'Investment income due (CA)',v:'2,000'},{t:'pnl',l:'P&L',x:'Patent written off (Admin)',v:'6,350'},{t:'bs',l:'Bal Sheet',x:'Patents (Intangible FA)',v:'57,150'}],
   nw:['W4  Inv income: 100,000 × 4% × 9/12 = 3,000','W4  Inv due: 3,000 − 1,000 = 2,000','W8  Patent w/o: 63,500 / 10 = 6,350','W8  Patents BS: 63,500 − 6,350 = 57,150'],
   trap:'<strong>THE TRAP:</strong> Students see "Patents €62,500" and write off €6,250 (62,500/10). Wrong — the €62,500 is understated by €1,000. You must ADD the investment income back to patents before dividing by 10, otherwise you lose marks on patents AND investment income.'}
]},

{num:5,marks:6,title:'VAT on Building Purchase',
noteText:'A new warehouse was purchased on 01/01/2022 for <strong>€73,775, including VAT of 13.5%</strong>. The amount paid to the vendor was entered in the buildings account. <strong>No entry was made in the VAT account.</strong>',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Buildings (cost €510,000)</td><td>421,200</td><td></td></tr><tr><td>VAT</td><td></td><td>3,840</td></tr></table><p>The €510,000 cost figure already includes the warehouse at the GROSS price (including VAT).</p>',
task:'<p><strong>Two corrections:</strong></p><ol><li>Strip the VAT out of buildings cost (€73,775 ÷ 1.135 = €65,000 cost, VAT = €8,775)</li><li>Claim the €8,775 as input VAT (reduces VAT liability — may even flip it to an asset)</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Break down the gross amount.</strong> €73,775 includes 13.5% VAT. Price ex-VAT = €73,775 ÷ 1.135 = €65,000. VAT portion = €73,775 − €65,000 = <strong>€8,775</strong>.'},
   accts:[{n:'Warehouse Price Breakdown',d:[{x:'Gross price (incl VAT)',v:'73,775'},{x:'Ex-VAT: ÷ 1.135',v:'65,000',h:'g'},{x:'VAT portion',v:'8,775',h:'a',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Strip VAT from buildings.</strong> Credit Buildings by €8,775 to remove the VAT element.'},
   accts:[{n:'Buildings A/C (Cost)',d:[{x:'Per trial balance',v:'510,000'}],c:[{x:'VAT stripped out',v:'8,775',h:'r'},{x:'Corrected cost',v:'501,225',h:'b',tot:1}],s:'a'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Claim the input VAT.</strong> The €8,775 is reclaimable input VAT. TB had VAT at €3,840 credit (liability). New balance = €3,840 Cr − €8,775 Dr = <strong>€4,935 Dr (asset!)</strong>. VAT has flipped sides.'},
   accts:[{n:'VAT A/C',d:[{x:'Input VAT claim (warehouse)',v:'8,775',h:'g'},{x:'New balance → Current Asset',v:'4,935',h:'b',tot:1}],c:[{x:'Per trial balance',v:'3,840'},{x:'',v:''},{x:'',v:''}],s:'a'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'bs',l:'Bal Sheet',x:'Buildings cost (feeds into W12)',v:'501,225'},{t:'bs',l:'Bal Sheet',x:'VAT → Current ASSETS (flipped!)',v:'4,935'}],
   nw:['W16 VAT: 8,775 (input) − 3,840 (was credit) = 4,935 DR (asset)','Buildings cost feeds into W12 revaluation calc'],
   trap:'<strong>WATCH THIS:</strong> VAT moves from current liabilities to current assets! If you leave it in liabilities, your balance sheet won\'t balance. Always check which side VAT ends up on after input VAT claims.'}
]},

{num:6,marks:11,title:'Buildings Depreciation + Revaluation',
noteText:'Provide for depreciation on buildings at a rate of <strong>2% of cost per annum</strong>. It was decided to revalue the buildings at <strong>€650,000</strong> on <strong>01/01/2022</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Buildings (cost €510,000)</td><td>421,200</td></tr></table><p>After VAT strip (Note 5): cost = €501,225, NBV = €421,200, so accumulated depreciation = €88,800 (TB-based: €510,000 − €421,200).</p>',
task:'<p><strong>Revaluation at START of year (01/01/2022):</strong></p><ol><li>Wipe out ALL accumulated depreciation (€88,800) and transfer to Revaluation Reserve</li><li>Increase buildings value from €501,225 to €650,000 — difference of €148,775 also to reserve</li><li>Calculate current year depreciation on the NEW value (€650,000 × 2%)</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Strip accumulated depreciation.</strong> On revaluation, ALL accumulated depreciation is wiped off and transferred to the Revaluation Reserve. The TB shows €88,800 accum depn on buildings (€510,000 − €421,200).'},
   accts:[{n:'Buildings Acc Dep A/C',d:[{x:'Stripped on revaluation',v:'88,800',h:'g',tot:1}],c:[{x:'Per trial balance',v:'88,800'}],s:'a'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Revalue the buildings.</strong> Corrected cost (after VAT strip) = €501,225. Revalued to €650,000. Increase = €650,000 − €501,225 = <strong>€148,775</strong>. Debit Buildings by the uplift.'},
   accts:[{n:'Buildings A/C (Cost)',d:[{x:'Corrected cost (after VAT)',v:'501,225'},{x:'Revaluation uplift',v:'148,775',h:'g'},{x:'Revalued amount',v:'650,000',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Credit the Revaluation Reserve.</strong> BOTH the accumulated depreciation stripped (€88,800) AND the uplift (€148,775) go to the Revaluation Reserve. Total reserve = <strong>€237,575</strong>.'},
   accts:[{n:'Revaluation Reserve',d:[],c:[{x:'Increase in value (148,775)',v:'148,775',h:'g'},{x:'Acc dep stripped (88,800)',v:'88,800',h:'a'},{x:'TOTAL reserve (Capital section)',v:'237,575',h:'b',tot:1}],s:'c'}]},
  {expl:{t:'info',tx:'<strong>Step 4 — Current year depreciation on the NEW value.</strong> Since revaluation was at 01/01/2022 (start of year), all of 2022\'s depreciation is at the new value. €650,000 × 2% = <strong>€13,000</strong>.'},
   accts:[{n:'Depreciation on Buildings',d:[{x:'650,000 × 2%',v:'13,000',h:'b',tot:1}],c:[],s:'d'},{n:'New Acc Dep Balance',d:[],c:[{x:'From revaluation',v:'NIL',h:'g'},{x:'Current year dep',v:'13,000',h:'b',tot:1}],s:'c'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'pnl',l:'P&L',x:'Depreciation on buildings (Admin)',v:'13,000'},{t:'bs',l:'Bal Sheet',x:'Buildings at revalued amount',v:'650,000'},{t:'bs',l:'Bal Sheet',x:'Acc dep on buildings',v:'13,000'},{t:'bs',l:'Bal Sheet',x:'Revaluation Reserve (Capital)',v:'237,575'}],
   nw:['W5  Depn: 650,000 × 2% = 13,000','W12 Buildings: 510,000 − 8,775 + 148,775 = 650,000','W18 Reval Res: 148,775 + 88,800 = 237,575'],
   trap:'<strong>START vs END of year revaluation:</strong> Here it\'s at the START (01/01/2022), so depreciate at the NEW value for the full year. If it had been at the END of year, you\'d depreciate at OLD cost first, then revalue. Read the date carefully!'}
]},

{num:7,marks:6,title:'Mortgage Interest Due',
noteText:'Provision to be made for <strong>mortgage interest due</strong> and <strong>investment income due</strong> at 31/12/2022.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Cr</th></tr><tr><td>6% Fixed mortgage (incl. €50,000 received 01/10/2022)</td><td>220,000</td></tr></table><p>Mortgage was €170,000 for Jan–Sep (9 months), then €220,000 for Oct–Dec (3 months).</p>',
task:'<p>Calculate the <strong>full year\'s mortgage interest expense</strong>, then compare to what was actually paid to find the amount still due.</p>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Full year expense in two tranches.</strong> Original mortgage of €170,000 ran for 9 months (Jan–Sep). New total of €220,000 ran for 3 months (Oct–Dec). Calculate each separately.'},
   accts:[{n:'Mortgage Interest Calculation',d:[{x:'Jan–Sep: 170,000 × 6% × 9/12',v:'7,650',h:'b'},{x:'Oct–Dec: 220,000 × 6% × 3/12',v:'3,300',h:'g'},{x:'TOTAL for year → P&L',v:'10,950',h:'a',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Calculate the amount due.</strong> Full year expense = €10,950. Actual cash paid (after Note 3 suspense correction) = €4,300 − €900 = <strong>€3,400</strong>. Difference = €7,550 still owing at year-end.'},
   accts:[{n:'Mortgage Interest A/C',d:[{x:'Actual cash paid (corrected)',v:'3,400'},{x:'Interest due (balancing)',v:'7,550',h:'r'},{x:'',v:'10,950',tot:1}],c:[{x:'P&L charge (full year)',v:'10,950',h:'b'},{x:'',v:''},{x:'',v:'10,950',tot:1}],s:'a'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong> Remember: investment income due (€2,000) was already calculated in Note 4.'},
   dests:[{t:'pnl',l:'P&L',x:'Mortgage interest (Financial expense)',v:'10,950'},{t:'bs',l:'Bal Sheet',x:'Mortgage interest due (CL)',v:'7,550'},{t:'bs',l:'Bal Sheet',x:'Investment income due (CA, from N4)',v:'2,000'}],
   nw:['W11 Mortgage: 170,000 × 6% × 9/12 + 220,000 × 6% × 3/12 = 10,950','W11 Due: 10,950 − 3,400 = 7,550'],
   trap:'<strong>Mortgage went UP partway through the year.</strong> Don\'t just multiply €220,000 × 6%. Split the calculation: 9 months on the original balance + 3 months on the new total. Getting this wrong overstates the expense.'}
]},

{num:8,marks:4,title:'Goods Taken by Owner (Drawings in Kind)',
noteText:'Goods taken by Beechinor for his own use during the year were omitted from the books. These goods had a <strong>retail value of €8,100</strong>, which is cost plus 20%.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Drawings</td><td>25,340</td></tr><tr><td>Purchases</td><td>412,500</td></tr></table>',
task:'<p><strong>Two entries at COST:</strong></p><ol><li>Reduce purchases (Beechinor took the goods — they weren\'t sold)</li><li>Increase drawings (owner took value out of the business)</li></ol><p>Convert retail to cost: €8,100 ÷ 1.20 = €6,750.</p>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Work back to cost.</strong> Retail is cost plus 20%, so cost = €8,100 ÷ 1.20 = <strong>€6,750</strong>. Always use cost price — the business never made a profit on these goods because they weren\'t sold.'},
   accts:[{n:'Cost Calculation',d:[{x:'Retail value',v:'8,100'},{x:'Mark-up: cost + 20%',v:'÷ 1.20'},{x:'Cost',v:'6,750',h:'g',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Double entry.</strong> Credit Purchases (reduce cost of goods available) and Debit Drawings (owner took goods). The goods leave the business — Purchases is reduced, so Gross Profit goes up.'},
   accts:[{n:'Purchases A/C',d:[],c:[{x:'Goods for own use (cost)',v:'6,750',h:'r'}],s:'c'},{n:'Drawings A/C',d:[{x:'Per trial balance',v:'25,340'},{x:'Add goods at cost',v:'6,750',h:'g'},{x:'Total drawings',v:'32,090',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'trading',l:'Trading',x:'Purchases reduced (−6,750)',v:'see W3'},{t:'bs',l:'Bal Sheet',x:'Drawings (deducted from Capital)',v:'32,090'}],
   nw:['W3  Purchases: 412,500 − 6,750 (among other adjustments) = 381,450','W19 Drawings: 25,340 + 6,750 = 32,090'],
   trap:'<strong>Always use cost, never retail.</strong> The mark-up relationship tells you how to work back: "cost plus 20%" means divide retail by 1.20. "25% mark-up" means divide by 1.25.'}
]},

{num:9,marks:4,title:'Goods in Transit',
noteText:'No record has been made in the books for \'goods in transit\' on 31/12/2022. The invoice for these goods had been received, showing the recommended <strong>retail selling price of €6,500</strong>, which is <strong>cost plus 25%</strong>.',
tbLook:'<p>Goods in transit: the invoice has been received (so we\'ve bought them) but the goods haven\'t physically arrived yet. They\'re our property at year-end.</p>',
task:'<p><strong>Three entries (all at COST):</strong></p><ol><li>Add to Purchases (we have an invoice)</li><li>Add to Creditors (we owe the supplier)</li><li>Add to Closing Stock (they\'re our property)</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Work back to cost.</strong> Retail €6,500 is cost plus 25%. Cost = €6,500 ÷ 1.25 = <strong>€5,200</strong>. This single figure is used in THREE places.'},
   accts:[{n:'Cost Calculation',d:[{x:'Retail price',v:'6,500'},{x:'Mark-up: cost + 25%',v:'÷ 1.25'},{x:'Cost',v:'5,200',h:'g',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Triple entry at cost.</strong> Dr Purchases €5,200 + Cr Creditors €5,200. Purchases goes up because we\'ve bought them. Creditors goes up because we owe the supplier.'},
   accts:[{n:'Purchases A/C',d:[{x:'Goods in transit',v:'5,200',h:'g'}],c:[],s:'d'},{n:'Creditors A/C',d:[],c:[{x:'Goods in transit',v:'5,200',h:'g'}],s:'c'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Also add to closing stock.</strong> (Already done in Note 1 — that\'s why closing stock = 32,300 − 3,500 + 5,200 = 34,000.)'},
   accts:[{n:'Closing Stock A/C',d:[{x:'Stock as given',v:'32,300'},{x:'Less: sale-or-return (N1)',v:'(3,500)',h:'r'},{x:'Add: goods in transit',v:'5,200',h:'g'},{x:'Adjusted closing stock',v:'34,000',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'trading',l:'Trading',x:'Purchases (+5,200)',v:'see W3'},{t:'bs',l:'Bal Sheet',x:'Creditors (+5,200)',v:'see W17'},{t:'trading',l:'Trading',x:'Closing Stock (+5,200)',v:'34,000'}],
   nw:['W1  Purchases: 412,500 + 5,200 (and other adjustments) = 381,450','W2  Closing stock: 32,300 − 3,500 + 5,200 = 34,000','W17 Creditors: 33,560 + 5,200 (and other adjustments) = 30,660'],
   trap:'<strong>Three places, same figure.</strong> Miss any one and your books won\'t balance. Many students remember the purchase but forget to add to creditors.'}
]},

{num:10,marks:4,title:'Stock Destroyed by Fire',
noteText:'During the year, stock which had cost <strong>€3,000</strong> was destroyed by fire. The insurance company has <strong>agreed to pay compensation of €2,500</strong>.',
tbLook:'<p>Nothing in the trial balance — this is a year-end adjustment that wasn\'t posted.</p>',
task:'<p><strong>Three entries:</strong></p><ol><li>Remove €3,000 from purchases (destroyed stock was already in cost of sales via opening purchases)</li><li>Record €2,500 insurance compensation due (current asset)</li><li>Record €500 net loss on damaged stock (P&L expense)</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Calculate the net loss.</strong> Stock cost €3,000 was destroyed. Insurance will pay €2,500. Net loss = €3,000 − €2,500 = <strong>€500</strong>.'},
   accts:[{n:'Fire Loss Calculation',d:[{x:'Cost of stock destroyed',v:'3,000'},{x:'Insurance recoverable',v:'(2,500)',h:'g'},{x:'Net loss → P&L expense',v:'500',h:'r',tot:1}],c:[],s:'d'}]},
  {expl:{t:'warning',tx:'<strong>Step 2 — Process the double entry.</strong> Cr Purchases €3,000 (stock leaving). Dr Insurance Due €2,500 (receivable). Dr Loss on Damaged Stock €500 (P&L expense).'},
   accts:[{n:'Purchases A/C',d:[],c:[{x:'Stock destroyed (removed)',v:'3,000',h:'r'}],s:'c'},{n:'Insurance Compensation Due',d:[{x:'Due from insurance (CA)',v:'2,500',h:'g'}],c:[],s:'d'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'trading',l:'Trading',x:'Purchases reduced (−3,000)',v:'see W3'},{t:'pnl',l:'P&L',x:'Loss on damaged stock (Admin)',v:'500'},{t:'bs',l:'Bal Sheet',x:'Insurance compensation due (CA)',v:'2,500'}],
   nw:['W3  Purchases: 412,500 − 3,000 (and other adjustments) = 381,450','W7  Net loss: 3,000 − 2,500 = 500'],
   trap:'<strong>Only the NET loss goes to P&L.</strong> Don\'t put €3,000 in expenses — the insurance is covering €2,500 of it. Just the uncovered €500 is a real expense. The €2,500 is a receivable (not income).'}
]},

{num:11,marks:11,title:'Office Equipment to Creditor + Depreciation',
noteText:'A supplier who was owed <strong>€4,600</strong> accepted office equipment with a <strong>book value €4,300</strong> in full settlement of the debt. The office equipment had cost <strong>€6,000</strong>. No entry was made in the books in respect of this transaction. Provide for depreciation on office equipment held on 31/12/2022 at the rate of <strong>10% of cost</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Office equipment (cost €17,500)</td><td>8,500</td></tr></table><p>NBV €8,500. Cost €17,500. Accum depn = €9,000.</p>',
task:'<p><strong>Two parts:</strong></p><ol><li><strong>Disposal:</strong> equipment cost €6,000, NBV €4,300, accepted for €4,600 → profit €300. Reduce creditors by €4,600.</li><li><strong>Depreciation:</strong> on REMAINING equipment: (€17,500 − €6,000) × 10% = €1,150.</li></ol>',
steps:[
  {expl:{t:'info',tx:'<strong>Step 1 — Calculate accumulated depreciation on the disposed item.</strong> Cost €6,000 − NBV €4,300 = <strong>€1,700</strong> of accumulated depreciation on this specific piece.'},
   accts:[{n:'Disposed Equipment — Facts',d:[{x:'Cost',v:'6,000'},{x:'NBV (given)',v:'4,300',h:'b'},{x:'Accum depn (cost − NBV)',v:'1,700',h:'a',tot:1}],c:[],s:'d'}]},
  {expl:{t:'danger',tx:'<strong>Step 2 — Disposal account.</strong> Equipment given to creditor in settlement of €4,600 debt. Profit = €4,600 (settlement value) − €4,300 (NBV) = <strong>€300</strong>.'},
   accts:[{n:'Disposal — Office Equipment',d:[{x:'Cost of disposed item',v:'6,000'},{x:'Profit → Other Income',v:'300',h:'g',tot:1}],c:[{x:'Accumulated depn',v:'1,700',h:'a'},{x:'Creditor settlement',v:'4,600',h:'b',tot:1}],s:'a'}]},
  {expl:{t:'warning',tx:'<strong>Step 3 — Reduce creditors.</strong> The supplier accepted equipment instead of cash. Dr Creditors €4,600 to clear the debt.'},
   accts:[{n:'Creditors A/C',d:[{x:'Debt settled by equipment',v:'4,600',h:'r'}],c:[],s:'d'}]},
  {expl:{t:'info',tx:'<strong>Step 4 — Depreciation on remaining equipment.</strong> Remaining cost = €17,500 − €6,000 = €11,500. Current year depn = €11,500 × 10% = <strong>€1,150</strong>. This goes to P&L Admin.'},
   accts:[{n:'Depreciation — Office Equipment',d:[{x:'Remaining cost',v:'11,500'},{x:'× 10%',v:'× 10%'},{x:'Depn → P&L Admin',v:'1,150',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'info',tx:'<strong>Step 5 — Balance sheet figures.</strong> Cost = €17,500 − €6,000 = €11,500. Accum dep = TB €9,000 + current year €1,150 − disposed €1,700 = €8,450. NBV = €3,050.'},
   accts:[{n:'Office Equipment — BS Summary',d:[{x:'Cost (17,500 − 6,000)',v:'11,500',h:'g'},{x:'Accum dep (9k + 1.15k − 1.7k)',v:'8,450',h:'a'},{x:'NBV',v:'3,050',h:'b',tot:1}],c:[],s:'d'}]},
  {expl:{t:'success',tx:'<strong>Where everything goes.</strong>'},
   dests:[{t:'pnl',l:'P&L',x:'Profit on disposal of equipment',v:'300'},{t:'pnl',l:'P&L',x:'Depreciation on office equipment (Admin)',v:'1,150'},{t:'bs',l:'Bal Sheet',x:'Office equipment cost',v:'11,500'},{t:'bs',l:'Bal Sheet',x:'Office equipment acc dep',v:'8,450'},{t:'bs',l:'Bal Sheet',x:'Creditors reduced (−4,600)',v:'see W17'}],
   nw:['W6  Depn: (17,500 − 6,000) × 10% = 1,150','W14 Cost: 17,500 − 6,000 = 11,500','W14 Acc dep: 9,000 + 1,150 − 1,700 = 8,450','W17 Creditors: 33,560 − 4,600 (and others) = 30,660'],
   trap:'<strong>When a supplier accepts equipment for a debt:</strong> the "proceeds" equal the DEBT amount (€4,600), not the NBV (€4,300). Profit/loss is proceeds − NBV the normal way.'}
]}
];



const ST_TPL_STEPS: BuilderStep[] = [
{title:'Sales',
rows:['<tr class="heading"><td colspan="3">Trading, Profit & Loss A/c of Jim Beechinor — y/e 31/12/2022</td></tr>','<tr><td class="lbl">Sales</td><td class="amt">—</td><td class="amt">675,540</td></tr>'],
source:'Taken <strong>directly from the trial balance</strong>. Sales is on the credit side (income), so it becomes the top line of the Trading Account.',
reason:'Sales is always the starting point of a Trading Account. None of the 11 notes affect sales, so no adjustments are needed here.',
watch:'Don\'t add the retail value of goods taken by the owner (Note 8) to sales. Those goods weren\'t sold — they were taken by the owner. Instead, you <em>reduce purchases</em> by the cost price.'},
{title:'Cost of Sales — Opening Stock & Purchases',
rows:['<tr class="heading"><td colspan="3">Cost of Sales</td></tr>','<tr class="indent"><td class="lbl">Opening Stock</td><td class="amt">20,800</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Purchases <span class="wtag">W3</span></td><td class="amt">381,450</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt">402,250</td><td></td></tr>'],
source:'Opening Stock <strong>€20,800</strong> comes straight from the TB. Purchases <strong>€381,450</strong> is the <strong>W3</strong> figure — the TB starting figure €412,500 with five adjustments applied.',
reason:'Purchases is the most heavily-adjusted line in the whole TPL. Five notes hit it: sale-or-return reversal, the van cash wrongly posted as stock, goods taken by owner, goods in transit (add), and stock destroyed by fire.',
tip:'<strong>Purchases calc:</strong> €412,500 <em>− €3,500 (Note 1)</em> <em>− €23,000 (Note 2)</em> <em>− €6,750 (Note 8)</em> <em>+ €5,200 (Note 9)</em> <em>− €3,000 (Note 10)</em> = <strong>€381,450</strong>. The marking scheme awards 7 marks for getting all five adjustments right.'},
{title:'Cost of Sales — Closing Stock, COS & Gross Profit',
rows:['<tr class="indent"><td class="lbl">− Closing Stock <span class="wtag">W2</span></td><td class="amt">(34,000)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Cost of Sales</td><td></td><td class="amt">(368,250)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">307,290</td></tr>'],
source:'Closing Stock <strong>€34,000</strong> from <strong>W2</strong>: €32,300 (given in Note 1) − €3,500 (sale-or-return goods removed) + €5,200 (goods in transit added).',
reason:'Cost of Sales = Opening Stock + Purchases − Closing Stock = 20,800 + 381,450 − 34,000 = <strong>€368,250</strong>. Gross Profit = Sales − COS = 675,540 − 368,250 = <strong>€307,290</strong>.',
watch:'Your closing stock figure must include the goods-in-transit (Note 9) because the goods legally belong to the business at year-end, even if they haven\'t physically arrived. Miss this and your closing stock is too low and COS is too high.'},
{title:'Administration Expenses — Operating Costs',
rows:['<tr class="heading"><td colspan="3">Less Administration Expenses</td></tr>','<tr class="indent"><td class="lbl">Salaries & general expenses <span class="wtag">TB</span></td><td class="amt">67,320</td><td></td></tr>','<tr class="indent"><td class="lbl">Insurance <span class="wtag">TB</span></td><td class="amt">9,950</td><td></td></tr>','<tr class="indent"><td class="lbl">Rent <span class="wtag">TB</span></td><td class="amt">3,650</td><td></td></tr>'],
source:'All three lines taken <strong>directly from the TB</strong>. No adjustments needed — the question gives no accruals or prepayments for these items.',
reason:'Administration Expenses are the running costs of the business that aren\'t directly linked to selling or financing. Salaries, insurance, and rent are the core day-to-day expenses.',
tip:'If the question had mentioned an accrual or prepayment for insurance or rent, you\'d adjust the TB figure here. Always check if any note refers to these line items.'},
{title:'Administration Expenses — Depreciation & Write-offs',
rows:['<tr class="indent"><td class="lbl">Depreciation on buildings <span class="wtag">W5</span></td><td class="amt">13,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Depreciation on office equipment <span class="wtag">W6</span></td><td class="amt">1,150</td><td></td></tr>','<tr class="indent"><td class="lbl">Loss on damaged stock <span class="wtag">W7</span></td><td class="amt">500</td><td></td></tr>','<tr class="indent"><td class="lbl">Patent written-off <span class="wtag">W8</span></td><td class="amt">6,350</td><td class="amt">(101,920)</td></tr>'],
source:'<strong>Buildings depn €13,000</strong> = €650,000 × 2%. <strong>Office equip depn €1,150</strong> = (€17,500 − €6,000) × 10%. <strong>Loss on damaged stock €500</strong> = €3,000 cost − €2,500 insurance. <strong>Patent write-off €6,350</strong> = €63,500 ÷ 10 years.',
reason:'Buildings and office equipment depreciation go in Admin because those assets are used for administrative functions. Patent write-off is also an admin cost (intangible amortisation). The damaged stock loss is a general operating loss.',
watch:'<strong>Loss on damaged stock:</strong> only <em>€500</em> goes here — the net loss after insurance. The €2,500 insurance compensation goes to the balance sheet as a current asset (receivable), NOT to the P&L as income. Don\'t put €3,000 here.'},
{title:'Selling & Distribution Expenses',
rows:['<tr class="heading"><td colspan="3">Less Selling & Distribution Expenses</td></tr>','<tr class="indent"><td class="lbl">Depreciation on delivery vans <span class="wtag">W9</span></td><td class="amt">27,700</td><td></td></tr>','<tr class="indent"><td class="lbl">Commission <span class="wtag">TB</span></td><td class="amt">6,750</td><td class="amt">(34,450)</td></tr>'],
source:'<strong>Van depreciation €27,700</strong> (W9) = €3,000 (old van 6 months) + €21,000 (other vans full year) + €3,700 (new van 6 months). <strong>Commission €6,750</strong> from TB.',
reason:'Van depreciation goes in <strong>Selling & Distribution</strong>, NOT Administration, because vans deliver goods to customers. Commission is typically paid to sales staff, so it belongs here too.',
watch:'<strong>Most common error:</strong> putting van depreciation in Administration Expenses. Vans = delivery = sales = S+D. Remember: the <em>function</em> of the asset determines which section it goes in, not the asset type.'},
{title:'Financial Expenses & Total Expenses',
rows:['<tr class="heading"><td colspan="3">Less Financial Expenses</td></tr>','<tr class="indent"><td class="lbl">Mortgage interest <span class="wtag">W11</span></td><td class="amt">10,950</td><td class="amt">(10,950)</td></tr>','<tr class="subtotal"><td class="lbl">Total Expenses</td><td></td><td class="amt">(147,320)</td></tr>'],
source:'<strong>Mortgage interest €10,950</strong> (W11) = 9 months on €170,000 + 3 months on €220,000 (the mortgage increased by €50,000 on 01/10/2022). This is the <em>full year\'s expense</em>, not just what was paid.',
reason:'Mortgage interest is a <strong>financial expense</strong> (cost of borrowing), not an operating cost. It sits in its own section after S+D. Total Expenses = Admin + S&D + Financial = 101,920 + 34,450 + 10,950 = <strong>€147,320</strong>.',
tip:'<strong>Accrual basis:</strong> the P&L shows the full €10,950 expense even though only part was actually paid in cash. The unpaid portion (€7,550) goes to the balance sheet as "mortgage interest due" (a current liability).'},
{title:'Other Income — Profits on Disposal',
rows:['<tr class="heading"><td colspan="3">Other Income</td></tr>','<tr class="indent"><td class="lbl">Profit on disposal of delivery van <span class="wtag">W10</span></td><td class="amt">7,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Profit on disposal of equipment <span class="wtag">W11b</span></td><td class="amt">300</td><td></td></tr>'],
source:'<strong>Van profit €7,500</strong> (W10) = Trade-in allowance €14,000 − NBV €6,500. <strong>Equipment profit €300</strong> = Settlement value €4,600 − NBV €4,300.',
reason:'Both profits on disposal go in <strong>Other Income</strong>, not deducted from depreciation. They are separate gains on the sale of fixed assets and must be shown as income lines. Other Income appears <strong>after Total Expenses</strong> in the sole trader P&L format.',
tip:'A <em>profit</em> on disposal means the business received more than the NBV — the asset was worth more than the books said. A <em>loss</em> would go in expenses, not here.'},
{title:'Other Income — Investment Interest & Discount Received',
rows:['<tr class="indent"><td class="lbl">Investment interest <span class="wtag">W4</span></td><td class="amt">3,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Discount received <span class="wtag">TB</span></td><td class="amt">450</td><td class="amt">11,250</td></tr>','<tr class="total"><td class="lbl">Net Profit</td><td></td><td class="amt">171,220</td></tr>'],
source:'<strong>Investment interest €3,000</strong> (W4) = €100,000 × 4% × 9/12 (9 months ownership from 01/04/2022). <strong>Discount received €450</strong> from the TB (credit side). Total Other Income = 7,500 + 300 + 3,000 + 450 = <strong>€11,250</strong>.',
reason:'Net Profit = Gross Profit − Total Expenses + Other Income = 307,290 − 147,320 + 11,250 = <strong>€171,220</strong>. The Other Income sits after expenses but before Net Profit.',
watch:'<strong>Discount side-check:</strong> Discount in the TB was on the <em>credit side</em> (€450), making it discount <em>received</em> (income) → goes here. If it had been on the <em>debit side</em>, it would be discount <em>allowed</em> (an expense) → Selling & Distribution instead. Always check which side.'}
];

const ST_BS_STEPS: BuilderStep[] = [
{title:'Intangible Assets — Patents',
rows:['<tr class="heading"><td colspan="4">Balance Sheet of Jim Beechinor as at 31/12/2022</td></tr>','<tr class="heading"><td colspan="4">Intangible Assets</td></tr>','<tr class="indent"><td class="lbl">Patent <span class="wtag">W8</span></td><td></td><td></td><td class="amt">57,150</td></tr>'],
source:'<strong>Patent €57,150</strong> (W8) = Cleaned-up cost €63,500 − amortisation €6,350 (one year at 1/10).',
reason:'Patents are <strong>intangible assets</strong> — they have value but no physical form. They always appear first on the balance sheet, above tangible fixed assets.',
watch:'Do NOT use the TB figure of €62,500. It had 3 months of investment income (€1,000) hidden inside it. The cleaned-up figure is €63,500. Miss this and your patents AND your investment income are both wrong.'},
{title:'Tangible Fixed Assets — Header',
rows:['<tr class="heading"><td colspan="4">Tangible Fixed Assets</td><td></td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>'],
source:'Tangible fixed assets have three columns on the balance sheet: <strong>Cost, Accumulated Depreciation, and NBV</strong> (Net Book Value = Cost − Accumulated Depreciation).',
reason:'Showing cost and accumulated depreciation separately is required under accounting standards. It tells the reader how much the assets originally cost and how much has been written off so far.',
tip:'The NBV column is what carries forward to the "Total Fixed Assets" figure. The cost and accumulated depreciation columns are for disclosure only.'},
{title:'Buildings',
rows:['<tr class="indent"><td class="lbl">Buildings <span class="wtag">W12</span></td><td class="amt">650,000</td><td class="amt">13,000</td><td class="amt">637,000</td></tr>'],
source:'<strong>Cost €650,000</strong> — the <em>revalued figure</em> from Note 6 (revalued on 01/01/2022). <strong>Accum depn €13,000</strong> — only the current year\'s charge, because the revaluation wiped out all prior depreciation. <strong>NBV €637,000</strong>.',
reason:'When an asset is revalued, the accumulated depreciation is reset to zero and the new cost becomes the starting point. This is why the accum depn is only €13,000, even though the building is many years old.',
watch:'<strong>The revaluation reserve (€237,575) does NOT appear here</strong> — it goes in the Capital section at the bottom of the balance sheet. Don\'t confuse the revaluation amount with the reserve.'},
{title:'Delivery Vans',
rows:['<tr class="indent"><td class="lbl">Delivery Vans <span class="wtag">W13</span></td><td class="amt">142,000</td><td class="amt">84,200</td><td class="amt">57,800</td></tr>'],
source:'<strong>Cost €142,000</strong> = TB €135,000 + €37,000 (new van) − €30,000 (old van disposed). <strong>Accum depn €84,200</strong> = TB €80,000 + €27,700 (current year) − €23,500 (on the disposed van).',
reason:'When an asset is disposed of mid-year, you must remove BOTH its cost AND its accumulated depreciation from the figures. The disposed van\'s accumulated depreciation at the date of sale (€23,500) is removed from the total.',
tip:'<strong>Formula for post-disposal NBV:</strong> Opening Cost + New Additions − Disposed Cost / Opening Accum Depn + Current Year Depn − Accum Depn on Disposed. Memorise this — it\'s tested every year.'},
{title:'Office Equipment',
rows:['<tr class="indent"><td class="lbl">Office Equipment <span class="wtag">W14</span></td><td class="amt">11,500</td><td class="amt">8,450</td><td class="amt">3,050</td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>803,500</strong></td><td class="amt"><strong>105,650</strong></td><td class="amt"><strong>697,850</strong></td></tr>'],
source:'<strong>Cost €11,500</strong> = €17,500 − €6,000 (given to creditor). <strong>Accum depn €8,450</strong> = TB €9,000 + €1,150 − €1,700 (on the equipment disposed). <strong>NBV €3,050</strong>.',
reason:'Same disposal logic as vans, but the "proceeds" here aren\'t cash — the equipment was given to a supplier to settle a €4,600 debt. The equipment\'s NBV was €4,300, so the profit on disposal is €300 (already in TPL Other Income).',
watch:'<strong>Creditor settlement in kind:</strong> when equipment is given to settle a debt, the "proceeds" equal the debt amount (€4,600), not the market value. The profit/loss is calculated the normal way: proceeds − NBV.'},
{title:'Financial Assets — 4% Investments',
rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">4% Investments <span class="wtag">TB</span></td><td></td><td></td><td class="amt">100,000</td></tr>','<tr><td class="lbl"></td><td></td><td></td><td class="amt"><strong>855,000</strong></td></tr>'],
source:'<strong>€100,000</strong> taken directly from the TB. Investments are shown at cost.',
reason:'Financial assets are a separate category between tangible fixed assets and current assets. They represent long-term investments that aren\'t expected to be sold within a year.',
tip:'<strong>Don\'t confuse with the interest:</strong> the <em>investment itself</em> (€100,000) sits here. The <em>interest earned</em> (€3,000) is in the P&L. The <em>interest still owed</em> (€2,000) is a current asset.'},
{title:'Current Assets — Debtors',
rows:['<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Debtors <span class="wtag">W15</span></td><td class="amt">49,140</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">− Provision for bad debts <span class="wtag">TB</span></td><td class="amt">(2,500)</td><td class="amt">46,640</td><td></td></tr>'],
source:'<strong>Debtors €49,140</strong> = TB €49,250 − €110 (discount allowed correction from Note 3/Suspense). <strong>Provision for bad debts €2,500</strong> from TB.',
reason:'Debtors are shown net of the provision for bad debts. The gross debtors figure is shown first, then the provision is deducted, giving the net debtors figure in the inner column.',
tip:'The discount allowed correction (€110) reduces debtors because the discount has been given — debtors owe €110 less.'},
{title:'Current Assets — Stock & Receivables',
rows:['<tr class="indent"><td class="lbl">Stock <span class="wtag">W2</span></td><td></td><td class="amt">34,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Investment interest due <span class="wtag">W4</span></td><td></td><td class="amt">2,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Insurance compensation due <span class="wtag">W7</span></td><td></td><td class="amt">2,500</td><td></td></tr>'],
source:'<strong>Stock €34,000</strong> — same figure as the TPL closing stock. <strong>Investment interest due €2,000</strong> (W4) = 6 months owed at year-end. <strong>Insurance compensation due €2,500</strong> = amount agreed by insurer for fire-damaged stock.',
reason:'All three are current assets because they\'re expected to be converted to cash within a year. Receivables (income earned but not yet received) always sit in current assets, not P&L.',
watch:'<strong>Don\'t forget the €2,000 investment interest due</strong> — it\'s a common omission. Students remember the €3,000 interest in the P&L but forget that only €1,000 was received in cash, so €2,000 is still owing.'},
{title:'Current Assets — VAT (flipped sides)',
rows:['<tr class="indent"><td class="lbl">VAT <span class="wtag">W16</span></td><td></td><td class="amt">4,935</td><td class="amt">90,075</td></tr>'],
source:'<strong>VAT €4,935</strong> (W16) = TB €3,840 (credit, liability) − €8,775 (reclaimable input VAT on warehouse purchase, Note 5). The result flips to a <em>debit balance</em> of €4,935, which is an <strong>asset</strong>.',
reason:'VAT changed sides entirely. In the TB it was a liability (money owed to revenue). After the reclaimable input VAT was applied, the business is now owed money BY revenue, so VAT becomes a current asset.',
watch:'<strong>Critical side-flip:</strong> if you leave VAT in current liabilities as €3,840 or €4,935, your balance sheet won\'t balance. You must move it to current assets AND calculate the new amount. Total Current Assets = <strong>€90,075</strong>.'},
{title:'Current Liabilities — Creditors & Bank',
rows:['<tr class="heading"><td colspan="4">Less Creditors: amounts falling due within 1 year</td></tr>','<tr class="indent"><td class="lbl">Creditors <span class="wtag">W17</span></td><td class="amt">30,660</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Bank overdraft <span class="wtag">TB</span></td><td class="amt">32,130</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">PAYE, PRSI, USC <span class="wtag">TB</span></td><td class="amt">12,100</td><td></td><td></td></tr>'],
source:'<strong>Creditors €30,660</strong> (W17) = TB €33,560 − €3,500 (sale or return) + €5,200 (goods in transit) − €4,600 (equipment to supplier). <strong>Bank €32,130</strong> and <strong>PAYE/PRSI €12,100</strong> from TB.',
reason:'Creditors is as heavily-adjusted as Purchases. Four notes hit it: sale or return reversal, goods in transit, and the equipment-for-debt settlement. Bank is on the credit side of the TB, so it\'s an overdraft (liability), not a positive balance.',
tip:'<strong>Always check which side "Bank" is on</strong>. Debit = positive cash balance (current asset). Credit = overdraft (current liability). In this question it\'s on the credit side.'},
{title:'Current Liabilities — Mortgage Interest Due',
rows:['<tr class="indent"><td class="lbl">Mortgage interest due <span class="wtag">W11</span></td><td class="amt">7,550</td><td class="amt">(82,440)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Working Capital</td><td></td><td></td><td class="amt">7,635</td></tr>','<tr class="subtotal"><td class="lbl">Total Net Assets</td><td></td><td></td><td class="amt">862,635</td></tr>'],
source:'<strong>Mortgage interest due €7,550</strong> (W11) = Total expense €10,950 − cash actually paid €3,400 (interest for the first 4 months at the original €170,000 rate). The unpaid portion is owed at year-end.',
reason:'Working Capital = Current Assets − Current Liabilities = 90,075 − 82,440 = <strong>€7,635</strong>. Total Net Assets = Fixed Assets + Financial Assets + Working Capital = 697,850 + 100,000 + 57,150 + 7,635 = <strong>€862,635</strong>.',
watch:'<strong>Don\'t confuse mortgage interest DUE with mortgage capital.</strong> The €220,000 mortgage capital goes in long-term creditors. The €7,550 is just the <em>interest</em> that\'s overdue — a separate current liability.'},
{title:'Long-Term Liabilities — 6% Fixed Mortgage',
rows:['<tr class="heading"><td colspan="4">Financed By:</td></tr>','<tr class="heading"><td colspan="4">Creditors: amounts falling due after 1 year</td></tr>','<tr class="indent"><td class="lbl">6% Fixed Mortgage <span class="wtag">TB</span></td><td></td><td></td><td class="amt">220,000</td></tr>'],
source:'<strong>€220,000</strong> from the TB. This includes the €50,000 advance received on 01/10/2022, so the year-end balance is €170,000 + €50,000 = €220,000.',
reason:'The mortgage is a <strong>long-term liability</strong> (over 1 year), so it sits in the "Financed By" section, not current liabilities. Only the mortgage interest due (current) is in the working capital calculation.',
tip:'The marking scheme does not require splitting the mortgage between "due within 1 year" and "due after 1 year" for a sole trader. Put the full €220,000 in long-term.'},
{title:'Capital — Opening Balance & Revaluation Reserve',
rows:['<tr class="heading"><td colspan="4">Capital</td></tr>','<tr class="indent"><td class="lbl">Capital 01/01/2022 <span class="wtag">TB</span></td><td></td><td class="amt">265,930</td><td></td></tr>','<tr class="indent"><td class="lbl">Revaluation reserve <span class="wtag">W18</span></td><td></td><td class="amt">237,575</td><td></td></tr>'],
source:'<strong>Capital €265,930</strong> from the TB — the <em>opening</em> balance before any current-year movement. <strong>Revaluation reserve €237,575</strong> (W18) — the gain on revaluing the buildings on 01/01/2022.',
reason:'The revaluation reserve is a <strong>capital reserve</strong>, not income. It appears between the opening capital and the net profit. It\'s created by revaluing an asset upwards and can only be released back to capital when that asset is eventually sold.',
watch:'<strong>The revaluation reserve is NOT in the P&L.</strong> A revaluation gain is not a profit — it\'s an unrealised increase in asset value. Putting it in the P&L would be a serious error and loses marks. Always in Capital.'},
{title:'Capital — Net Profit & Drawings',
rows:['<tr class="indent"><td class="lbl">+ Net Profit (from TPL)</td><td></td><td class="amt">171,220</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">674,725</td><td></td></tr>','<tr class="indent"><td class="lbl">− Drawings <span class="wtag">W19</span></td><td></td><td class="amt">(32,090)</td><td class="amt">642,635</td></tr>','<tr class="total"><td class="lbl">Capital Employed</td><td></td><td></td><td class="amt">862,635</td></tr>'],
source:'<strong>Net profit €171,220</strong> pulled directly from the TPL. <strong>Drawings €32,090</strong> (W19) = TB €25,340 + €6,750 (cost of goods taken by owner in Note 8). Capital Employed = 265,930 + 237,575 + 171,220 − 32,090 + 220,000 = <strong>€862,635</strong>.',
reason:'Net profit is added to capital (it belongs to the owner). Drawings are deducted (they reduce the owner\'s investment). The final figure — Capital Employed — must equal Total Net Assets.',
watch:'<strong>Drawings include goods taken by the owner</strong>, not just cash. €25,340 from the TB represents cash drawings. Add €6,750 (cost of goods in Note 8) to get €32,090. Miss this and the balance sheet won\'t balance.'},
{title:'Final Verification',
rows:[],
source:'<strong>Total Net Assets = €862,635</strong> = <strong>Capital Employed = €862,635</strong> ✓',
reason:'If these two totals match, you\'ve correctly placed every working. All 19 workings are now ticked off — nothing forgotten. Net profit is €171,220.',
tip:'<strong>If your two totals don\'t match</strong>, the most common causes are: (1) forgot revaluation reserve, (2) left VAT in current liabilities, (3) forgot goods taken in drawings, (4) missed investment interest due, (5) miscalculated the van or equipment disposal.'}
];


// ═══════════════════════════════════════════════════
// 2. COMPANY — Yeats Ltd 2023
// ═══════════════════════════════════════════════════

const CO_INTRO = `
<div class="wt-intro-box green">
  <h3>Meet the Question — Yeats Ltd (2024 SEC Paper)</h3>
  <p>Before diving into the workings, take a moment to <strong>read the actual exam question</strong>. Study the trial balance and notes carefully.</p>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">
    <img src="/images/q1-company-2024-p1.jpg" alt="2024 Company Q1 Page 1 — Trial Balance" style="width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.1);" />
    <img src="/images/q1-company-2024-p2.jpg" alt="2024 Company Q1 Page 2 — Notes" style="width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.1);" />
  </div>
</div>

<div class="wt-intro-box">
  <p>A Company Q1 is worth <strong>120 marks</strong> and closely follows the Sole Trader structure, but with key differences: <strong>share capital</strong> instead of owner's capital, a <strong>P&L balance</strong> carried forward, <strong>debentures</strong> as long-term financing, and <strong>dividends</strong> deducted after Net Profit.</p>
  <h4>The 5-step approach:</h4>
  <ol>
    <li><strong>Read the trial balance first.</strong> Identify the three big company-specific items: share capital (ordinary + preference), debentures, and the P&L balance.</li>
    <li><strong>Read the notes from top to bottom.</strong> Look out for the asset disposal trap, VAT on buildings, and revaluation.</li>
    <li><strong>Work through the notes one at a time.</strong> Label destinations: Distribution Costs, Administration, Operating Income, Financial Expenses.</li>
    <li><strong>Build the Trading P&L in company format:</strong> Sales → GP → Distribution Costs → Administration → Operating Profit → Investment Income → Debenture Interest → Net Profit → Dividends → Retained → Opening P&L balance → Closing P&L balance.</li>
    <li><strong>Build the Balance Sheet.</strong> Share capital in Authorised / Issued columns. Revaluation reserve and capital reserve in Capital section.</li>
  </ol>
</div>

<div class="wt-intro-box cyan">
  <h3>How to Read the Trial Balance (DEAL / CLIP)</h3>
  <p>The trial balance has two columns — <strong>Debit</strong> and <strong>Credit</strong>:</p>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Side (DEAL)</div>
      <div class="wt-dc-item"><strong>D</strong>ebtors / Drawings</div>
      <div class="wt-dc-item"><strong>E</strong>xpenses</div>
      <div class="wt-dc-item"><strong>A</strong>ssets</div>
      <div class="wt-dc-item"><strong>L</strong>osses</div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Side (CLIP)</div>
      <div class="wt-dc-item"><strong>C</strong>reditors / Capital</div>
      <div class="wt-dc-item"><strong>L</strong>iabilities</div>
      <div class="wt-dc-item"><strong>I</strong>ncome</div>
      <div class="wt-dc-item"><strong>P</strong>rofits</div>
    </div>
  </div>
  <h4>Company-specific reading tips:</h4>
  <ul>
    <li><strong>P&L balance</strong> is ALWAYS on the credit side — it's accumulated profit.</li>
    <li><strong>Share capital</strong> (ordinary and preference) on credit side — owed to shareholders.</li>
    <li><strong>Debentures</strong> on credit side — long-term loan (liability).</li>
    <li><strong>Dividends paid</strong> on debit side — like drawings, deducted after Net Profit.</li>
    <li><strong>Capital reserve / Revaluation reserve</strong> on credit side — shareholders' equity.</li>
  </ul>
</div>

<div class="wt-intro-box purple">
  <h3>The T-Account Rules — Memory Aid</h3>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Increases</div>
      <div class="wt-dc-item"><strong>Expense</strong></div>
      <div class="wt-dc-item"><strong>Asset</strong></div>
      <div class="wt-dc-item"><strong>Reducing Liability</strong></div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Increases</div>
      <div class="wt-dc-item"><strong>Income</strong></div>
      <div class="wt-dc-item"><strong>Liability</strong></div>
      <div class="wt-dc-item"><strong>Reducing Asset</strong></div>
    </div>
  </div>
</div>

<div class="wt-intro-box orange">
  <h3>Common Company Q1 Traps</h3>
  <ul>
    <li><strong>Authorised vs Issued share capital:</strong> Show BOTH columns. Only Issued counts for Capital Employed.</li>
    <li><strong>Debenture interest mid-year issue:</strong> Additional debentures part-way through mean interest in two chunks.</li>
    <li><strong>VAT on building purchase:</strong> Strip out VAT, move to VAT account as input VAT.</li>
    <li><strong>Revaluation of buildings:</strong> Gain goes to Revaluation Reserve (NOT P&L). Wipes accumulated depreciation.</li>
    <li><strong>Transfer to Capital Reserve:</strong> Deduction from retained profit, NOT an expense.</li>
    <li><strong>Rent received prepaid:</strong> Excess cash over earned amount is a LIABILITY (rent received in advance).</li>
  </ul>
</div>
`;

const CO_NOTES: WalkthroughNote[] = [
{num:1,marks:7,title:'Closing Stock + Damaged Stock',
noteText:'Stock at cost on 31/12/2023 was <strong>€56,900</strong>. This figure includes damaged stock which cost <strong>€3,800</strong> but which now has a <strong>net realisable value of 60% of cost</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Stock on hand 01/01/2023</td><td>44,400</td></tr></table><p>This is the OPENING stock. The closing stock figure comes from Note (i), but will need TWO adjustments before it appears on the Balance Sheet.</p>',
task:'<p><strong>Two adjustments to the closing stock:</strong></p><ol><li><strong>Damaged stock:</strong> cost €3,800, NRV = 60% × €3,800 = €2,280. Loss of €1,520. Stock must be written down to NRV (the lower of cost and NRV rule).</li><li><strong>Sale or return goods (Note iii):</strong> cost €4,000 — these were included in closing stock but are not actually ours. Remove them.</li></ol>',
workings:[
  {type:'calc',title:'W2: Closing stock write-down',content:'<div class="calc-block"><div class="calc-line">Stock at cost = €56,900</div><div class="calc-line">Less: damaged stock write-down:</div><div class="calc-line">€3,800 − (€3,800 × 60%) = €3,800 − €2,280 = <span class="rv-inline">(€1,520)</span></div><div class="calc-line">Less: sale or return goods (Note iii) at cost:</div><div class="calc-line">€5,000 ÷ 1.25 = <span class="rv-inline">(€4,000)</span></div><div class="calc-line calc-result">Adjusted closing stock = <span class="rv-inline">€51,380</span></div></div>'},
],
destinations:[
  {name:'Closing stock (W2)',arrow:'→',amt:'€51,380',where:'Trading account (deduct) + Balance Sheet Current Assets'},
  {name:'Loss on damaged stock',arrow:'→',amt:'included in write-down',where:'The €1,520 is absorbed into Cost of Sales (via the lower closing stock)'},
],
tip:'<strong>Lower of cost and NRV:</strong> The accounting rule says stock must be shown at the LOWER of cost and net realisable value. If NRV is lower, write down the stock to NRV. The write-down is effectively an expense (increases COS).',
watchOut:'<strong>Don\'t double-count the damaged stock:</strong> the €3,800 is ALREADY in the €56,900 at full cost. You reduce it BY €1,520 to get it to the NRV of €2,280 — you don\'t deduct the whole €3,800 and add back €2,280.'},

{num:2,marks:14,title:'Van Depreciation + Asset Disposal',
noteText:'The cost of delivery vans is to be written off on a straight-line basis over <strong>5 years</strong>. A full year\'s depreciation is charged in the year of acquisition and none in the year of disposal. Delivery vans have a <strong>scrap value of 5% of the original cost</strong>. <strong>NOTE:</strong> During the year a delivery van which had cost <strong>€40,000 in 2019</strong> was traded in for <strong>€10,000</strong> against a new delivery van costing <strong>€56,000</strong>. The cheque for the net amount of this transaction was incorrectly treated as a purchase of trading stock but was entered correctly in the bank account. These were the only entries in the books.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Delivery vans (cost €115,000)</td><td>80,000</td></tr></table><p>Cost = €115,000. NBV = €80,000. So accumulated depreciation = <strong>€35,000</strong>.</p>',
task:'<p><strong>This is the classic Q1 trap.</strong> Four things to do:</p><ol><li>Correct the wrongly-posted purchase: the net cheque (€56,000 − €10,000 = €46,000) was treated as stock purchase. Reverse this.</li><li>Add the new van to Vans cost (€56,000); remove the old van from Vans cost (€40,000)</li><li>Calculate profit/loss on disposal: the old van had 4 years depreciation (2019–2022), then no depreciation in year of disposal</li><li>Calculate the NEW year\'s depreciation on the revised cost figure</li></ol>',
workings:[
  {type:'calc',title:'Net cheque (purchases correction)',content:'<div class="calc-block"><div class="calc-line">New van cost = €56,000</div><div class="calc-line">Less: trade-in allowance = (€10,000)</div><div class="calc-line calc-result">Net cheque paid = <span class="rv-inline">€46,000</span></div><div class="calc-line" style="margin-top:8px">This €46,000 was wrongly debited to purchases. <strong>Reverse:</strong> Cr Purchases €46,000.</div></div>'},
  {type:'calc',title:'W9: Profit on Disposal of Old Van',content:'<div class="calc-block"><div class="calc-line"><strong>Accum depn on old van (2019 → 2022, 4 years):</strong></div><div class="calc-line">Annual depn = €40,000 × 95% / 5 = €7,600</div><div class="calc-line">4 years × €7,600 = <span class="rv-inline">€30,400</span></div><div class="calc-line" style="margin-top:8px"><strong>NBV on disposal:</strong></div><div class="calc-line">€40,000 − €30,400 = <span class="rv-inline">€9,600</span></div><div class="calc-line" style="margin-top:8px"><strong>Profit on disposal:</strong></div><div class="calc-line">Trade-in €10,000 − NBV €9,600 = <span class="rv-inline">€400</span></div></div>'},
  {type:'calc',title:'W3: Depreciation on Motor Vehicles (current year)',content:'<div class="calc-block"><div class="calc-line"><strong>New vans cost (after adjustment):</strong></div><div class="calc-line">TB €115,000 + €56,000 − €40,000 = <span class="rv-inline">€131,000</span></div><div class="calc-line" style="margin-top:8px"><strong>Depreciation this year:</strong></div><div class="calc-line">€131,000 × 95% / 5 = <span class="rv-inline">€24,890</span></div></div><div class="tip-box" style="margin-top:10px">The old van gets NO depreciation in year of disposal. The new van gets a FULL year. So the calculation is simply on the new cost figure of €131,000.</div>'},
],
destinations:[
  {name:'Profit on disposal (W9)',arrow:'→',amt:'€400',where:'P&L Operating Income'},
  {name:'Depreciation on vans (W3)',arrow:'→',amt:'€24,890',where:'P&L Distribution Costs'},
  {name:'Purchases (N1)',arrow:'−',amt:'€46,000',where:'Subtract €46,000 from Purchases (wrongly posted)'},
  {name:'Motor Vehicles cost (N13)',arrow:'→',amt:'€131,000',where:'Balance Sheet Tangible Fixed Assets'},
  {name:'Motor Vehicles AD (N14)',arrow:'→',amt:'€29,490',where:'= 35,000 + 24,890 − 30,400'},
],
tip:'<strong>Depreciation on vans → Distribution Costs:</strong> Vans deliver goods to customers. Their depreciation is a selling/distribution cost, not an administration cost. Same rule as in a sole trader.',
watchOut:'<strong>Full year in year of acquisition, none in year of disposal:</strong> This is the company\'s policy — read it carefully. The new van gets a full year of depreciation even though it was only bought mid-year. The old van gets ZERO depreciation in 2023 even though it was disposed of mid-year.'},

{num:3,marks:4,title:'Sale or Return Purchase',
noteText:'It was discovered that goods had been received from a supplier on 31/12/2023 on a \'sale or return\' basis. These goods had been entered in the books as a credit purchase in error. The expected selling price of these goods is <strong>€5,000 which is cost plus 25%</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Purchases and sales</td><td>747,000</td><td>1,080,700</td></tr><tr><td>Debtors and creditors</td><td>69,600</td><td>64,900</td></tr></table>',
task:'<p><strong>Three corrections (same figure in all three):</strong></p><ol><li>Reduce purchases by the COST of the goods</li><li>Reduce creditors by the same amount</li><li>Remove the goods from closing stock if included (already done in W2)</li></ol>',
workings:[
  {type:'calc',title:'Cost of sale-or-return goods',content:'<div class="calc-block"><div class="calc-line">Selling price = €5,000</div><div class="calc-line">Mark-up = 25% (cost plus 25%)</div><div class="calc-line">Cost = €5,000 ÷ 1.25 = <span class="rv-inline">€4,000</span></div></div>'},
],
destinations:[
  {name:'Purchases (N1)',arrow:'−',amt:'€4,000',where:'Subtract from Purchases'},
  {name:'Creditors (N19)',arrow:'−',amt:'€4,000',where:'Subtract from Creditors in Balance Sheet'},
  {name:'Closing stock (W2)',arrow:'−',amt:'€4,000',where:'Already removed in W2 adjustment'},
],
tip:'<strong>Sale or return = no purchase:</strong> Goods on sale-or-return haven\'t been bought. The buyer can return them. Until they\'re accepted, the supplier still owns them. If recorded as a purchase, it must be reversed.',
watchOut:'<strong>Cost vs selling price:</strong> The question gives €5,000 as the SELLING price. Convert to cost (€4,000) before adjusting purchases and creditors. A 25% mark-up means selling = cost × 1.25.'},

{num:4,marks:8,title:'Patents with Hidden Investment Income',
noteText:'Patents (incorporating <strong>3 months investment income</strong>) are being written off over a <strong>7-year period which commenced in 2021</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>3% Investments acquired on 01/05/2023</td><td>120,000</td></tr><tr><td>Patents (incorporating 3 months investment income)</td><td>40,600</td></tr></table><p>The investments were bought 01/05/2023, so the company has owned them for <strong>8 months</strong> (May–Dec). 3 months of interest has been received (credited to patents by mistake).</p>',
task:'<p><strong>Three things to do:</strong></p><ol><li>Calculate 3 months investment income received = €120,000 × 3% × 3/12 = €900. Remove it from patents.</li><li>Write off the cleaned-up patent over the remaining 5 years (7-year plan started in 2021, so by end of 2023 there are 5 years remaining — 2023, 2024, 2025, 2026, 2027... actually 7 years − 2 elapsed = 5 years remaining).</li><li>Put the 3 months (€900) into investment income and calculate the full 8-month income.</li></ol>',
workings:[
  {type:'calc',title:'Cleaning up the patents figure',content:'<div class="calc-block"><div class="calc-line">Patents per TB = €40,600</div><div class="calc-line">+ Investment income wrongly credited = €900</div><div class="calc-line calc-result">True patents (balance remaining) = <span class="rv-inline">€41,500</span></div><div class="calc-line" style="margin-top:8px;color:var(--text-3)">The €900 was credited to patents when the cash was received, reducing the patents balance. Adding it back restores the true patents figure.</div></div>'},
  {type:'calc',title:'N4: Patent Write-off',content:'<div class="calc-block"><div class="calc-line">7-year plan starting 2021. By end 2023, 2 writeoffs have been done (2021, 2022).</div><div class="calc-line">Balance remaining = €41,500</div><div class="calc-line">Years remaining = 7 − 2 = <strong>5 years</strong></div><div class="calc-line calc-result">Current year write-off = €41,500 ÷ 5 = <span class="rv-inline">€8,300</span></div></div>'},
  {type:'calc',title:'N12: Patents Balance Sheet figure',content:'<div class="calc-block"><div class="calc-line">True patents = €41,500</div><div class="calc-line">Less: current year write-off = (€8,300)</div><div class="calc-line calc-result">Patents on Balance Sheet = <span class="rv-inline">€33,200</span></div></div>'},
],
destinations:[
  {name:'Patent written off (N4)',arrow:'→',amt:'€8,300',where:'P&L Administration Expenses'},
  {name:'Patents net (N12)',arrow:'→',amt:'€33,200',where:'Balance Sheet Intangible Fixed Assets'},
  {name:'3 months interest',arrow:'→',amt:'€900',where:'Will be added to investment income in Note 9 (N10)'},
],
tip:'<strong>Why dividing by 5:</strong> The original 7-year plan has already used up 2 years (2021, 2022). The €40,600 balance represents 5 years\' worth of remaining value. So each year\'s writeoff is 1/5 of the balance, not 1/7 of some original cost.',
watchOut:'<strong>The €900 trap:</strong> The 3 months investment income was CREDITED to patents (reducing the balance). To fix: ADD €900 back to patents, then write off the corrected figure. If you forget this, your patents amortisation is wrong AND your investment income is too low by €900.'},

{num:5,marks:6,title:'Suspense Account',
noteText:'The suspense figure arises as a result of an <strong>incorrect figure for debenture interest</strong> (although the correct figure had been entered in the bank account) and <strong>discount allowed €400</strong> entered only in the discount account.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Salaries and general expenses (including suspense)</td><td>218,355</td><td></td></tr><tr><td>Debenture interest for the first nine months</td><td>5,400</td><td></td></tr><tr><td>Discount (net)</td><td>3,500</td><td></td></tr></table><p><strong>Important:</strong> The suspense is HIDDEN inside Salaries and general expenses of €218,355.</p>',
task:'<p><strong>Two errors:</strong></p><ol><li><strong>Discount allowed €400:</strong> entered only in the discount account (debit). Missing half = credit debtors €400. Suspense = Dr €400.</li><li><strong>Debenture interest:</strong> correct in bank, wrong in debenture interest account. Correct 9 months interest = €100,000 × 8% × 9/12 = €6,000. TB shows €5,400 — understated by €600. Correction: Dr Debenture Interest €600, Cr Suspense €600.</li></ol><p>Net suspense = Dr 400 − Cr 600 = Cr 200. The Salaries and Gen Exp TB line is overstated by €200 net (€600 credit − €400 debit).</p>',
workings:[
  {type:'calc',title:'N6: Salaries & General Expenses correction',content:'<div class="calc-block"><div class="calc-line">TB figure (includes suspense) = €218,355</div><div class="calc-line">+ Discount allowed correction (Dr suspense) = €400</div><div class="calc-line">− Debenture interest correction (Cr suspense) = (€600)</div><div class="calc-line calc-result">Adjusted Salaries & Gen Exp = <span class="rv-inline">€218,155</span></div></div>'},
  {type:'calc',title:'Debenture interest correction',content:'<div class="calc-block"><div class="calc-line">Correct 9 months interest: €100,000 × 8% × 9/12 = <span class="rv-inline">€6,000</span></div><div class="calc-line">TB figure = €5,400</div><div class="calc-line">Understated by = €600 (correct via suspense)</div></div>'},
],
destinations:[
  {name:'Salaries & Gen Exp (N6)',arrow:'→',amt:'€218,155',where:'P&L Administration Expenses'},
  {name:'Discount allowed (debtors)',arrow:'−',amt:'€400',where:'Reduce Debtors by €400 (discount given reduces debt)'},
  {name:'Debenture interest correction',arrow:'+',amt:'€600',where:'Feeds into debenture interest calculation in N11'},
],
tip:'<strong>Suspense hidden in another line:</strong> The question is unusual — instead of a suspense a/c in the TB, the suspense is HIDDEN inside salaries and general expenses. To fix both issues, you adjust salaries up or down by the net suspense.',
watchOut:'<strong>Discount allowed reduces DEBTORS not creditors.</strong> Discount allowed = a discount given to customers for prompt payment. The accounting entry is Dr Discount Allowed (expense), Cr Debtors (reduce what they owe). Here, the Cr Debtors side was missed.'},

{num:6,marks:4,title:'VAT on New Warehouse',
noteText:'A new warehouse was purchased during the year for <strong>€100,000 plus VAT @13.5%</strong>. The total amount paid to the vendor was entered in the land &amp; buildings account. No entry was made in the VAT account.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Land and buildings at cost</td><td>580,000</td><td></td></tr><tr><td>VAT</td><td></td><td>1,900</td></tr></table><p>The L&amp;B cost of €580,000 includes the warehouse entered GROSS (€113,500). The VAT portion must be stripped out.</p>',
task:'<p><strong>Two corrections:</strong></p><ol><li>Strip VAT out of L&amp;B: €100,000 × 13.5% = €13,500. Reduce Buildings Cost by €13,500.</li><li>Add €13,500 to VAT as reclaimable input VAT. TB VAT = €1,900 credit (liability). After adding €13,500 input VAT, the VAT balance flips to €11,600 debit (asset).</li></ol>',
workings:[
  {type:'calc',title:'VAT calculation',content:'<div class="calc-block"><div class="calc-line">Warehouse cost ex-VAT = €100,000</div><div class="calc-line">VAT @ 13.5% = €100,000 × 13.5% = <span class="rv-inline">€13,500</span></div><div class="calc-line">Total paid = €113,500</div><div class="calc-line" style="margin-top:8px"><strong>Correction to Buildings:</strong></div><div class="calc-line">Reduce buildings cost by €13,500</div></div>'},
  {type:'calc',title:'N18: VAT balance flip',content:'<div class="calc-block"><div class="calc-line">TB VAT = (€1,900) credit / liability</div><div class="calc-line">Add: reclaimable input VAT on warehouse = €13,500</div><div class="calc-line calc-result">New VAT balance = <span class="rv-inline">€11,600 debit (asset)</span></div></div>'},
],
destinations:[
  {name:'Buildings cost correction',arrow:'−',amt:'€13,500',where:'Feeds into N5 Depn buildings (cost becomes 580,000 − 13,500 = 566,500)'},
  {name:'VAT (N18)',arrow:'→',amt:'€11,600',where:'Balance Sheet Current Assets (flipped from liability)'},
],
tip:'<strong>Input VAT on capital purchases is reclaimable.</strong> When a business buys a fixed asset for its own use, the VAT element is treated as an input tax — it offsets the business\'s output VAT liability or becomes a refund claim.',
watchOut:'<strong>Do NOT include VAT in the cost used for depreciation.</strong> Strip out the €13,500 first. The buildings figure used for depreciation in N5 is €580,000 − €13,500 − €200,000 (land) = €366,500.'},

{num:7,marks:12,title:'Buildings Depreciation + Revaluation',
noteText:'Buildings are to be depreciated at the rate of <strong>2% of cost per annum</strong> (land at cost was €200,000). The company revalued land and buildings at <strong>€700,000</strong> on 31/12/2023 and this has yet to be reflected in the accounts.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Land and buildings at cost</td><td>580,000</td><td></td></tr><tr><td>Accumulated depreciation - buildings</td><td></td><td>38,000</td></tr></table>',
task:'<p><strong>Three things to do:</strong></p><ol><li>Calculate current year depreciation BEFORE revaluation: (€580,000 − €13,500 VAT − €200,000 land) × 2% = €7,330. Charge this to P&amp;L.</li><li>THEN revalue to €700,000 at 31/12/2023. This wipes out ALL accumulated depreciation (€38,000 opening + €7,330 current = €45,330).</li><li>Calculate the revaluation surplus: uplift from current book value to €700,000, PLUS accumulated depreciation written back.</li></ol>',
workings:[
  {type:'calc',title:'N5: Depreciation on Buildings',content:'<div class="calc-block"><div class="calc-line">TB L&B cost = €580,000</div><div class="calc-line">Less: VAT stripped out (N6) = (€13,500)</div><div class="calc-line">Less: land (no depn) = (€200,000)</div><div class="calc-line">Depreciable buildings = <span class="rv-inline">€366,500</span></div><div class="calc-line">Depreciation = €366,500 × 2% = <span class="rv-inline">€7,330</span></div></div>'},
  {type:'calc',title:'N22: Revaluation Reserve',content:'<div class="calc-block"><div class="calc-line"><strong>Book value BEFORE revaluation:</strong></div><div class="calc-line">Corrected cost = €580,000 − €13,500 = €566,500</div><div class="calc-line">Less: opening accum depn = (€38,000)</div><div class="calc-line">Less: current year depn = (€7,330)</div><div class="calc-line">NBV just before reval = <span class="rv-inline">€521,170</span></div><div class="calc-line" style="margin-top:8px"><strong>Revaluation surplus:</strong></div><div class="calc-line">New value = €700,000</div><div class="calc-line">Less: NBV before reval = (€521,170)</div><div class="calc-line">Uplift = <span class="rv-inline">€178,830</span></div><div class="calc-line" style="margin-top:8px;color:var(--text-3)">Marking scheme breakdown: 133,500 (cost uplift) + 38,000 (opening AD written back) + 7,330 (current year depn written back) = <span class="rv-inline">€178,830</span></div></div>'},
  {type:'calc',title:'L&B on Balance Sheet',content:'<div class="calc-block"><div class="calc-line">Cost = <span class="rv-inline">€700,000</span> (revalued)</div><div class="calc-line">Accum depn = <span class="rv-inline">€0</span> (wiped by revaluation)</div><div class="calc-line">NBV = <span class="rv-inline">€700,000</span></div></div>'},
],
destinations:[
  {name:'Depreciation on Buildings (N5)',arrow:'→',amt:'€7,330',where:'P&L Administration Expenses'},
  {name:'Buildings cost',arrow:'→',amt:'€700,000',where:'Balance Sheet Tangible Fixed Assets'},
  {name:'Buildings Acc Depn',arrow:'→',amt:'€0',where:'Wiped by the revaluation'},
  {name:'Revaluation Reserve (N22)',arrow:'→',amt:'€178,830',where:'Balance Sheet Capital section'},
],
tip:'<strong>Depreciation is charged BEFORE the revaluation:</strong> Even though the revaluation is at year-end, you still charge a full year\'s depreciation on the OLD cost first. Then the revaluation wipes all accumulated depreciation. This matches the SEC approach.',
watchOut:'<strong>Land does NOT depreciate.</strong> Strip the €200,000 land cost out BEFORE calculating depreciation. Only buildings (€366,500) are depreciated. This is a commonly missed step.'},

{num:8,marks:5,title:'Rent Received (Prepaid)',
noteText:'The rent received was in respect of a warehouse rented out by the company for <strong>€1,500 per month commencing on 01/06/2023</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Cr</th></tr><tr><td>Rent received</td><td>13,500</td></tr></table><p>€13,500 received in the period from 01/06/2023 to 31/12/2023.</p>',
task:'<p><strong>Calculate what\'s actually EARNED this year vs what\'s been RECEIVED:</strong></p><ol><li>Period 01/06/2023 to 31/12/2023 = 7 months</li><li>Rent earned = €1,500 × 7 months = €10,500</li><li>Cash received = €13,500</li><li>Excess received = €3,000 (rent received in advance / prepaid)</li></ol>',
workings:[
  {type:'calc',title:'N7: Rent Received (accrual basis)',content:'<div class="calc-block"><div class="calc-line">Period earning rent: 01/06/2023 → 31/12/2023 = 7 months</div><div class="calc-line">Rent per month = €1,500</div><div class="calc-line">Rent EARNED = €1,500 × 7 = <span class="rv-inline">€10,500</span></div><div class="calc-line">Cash RECEIVED (per TB) = €13,500</div><div class="calc-line calc-result">Rent received in advance = <span class="rv-inline">€3,000</span></div></div>'},
],
destinations:[
  {name:'Rent received (N7)',arrow:'→',amt:'€10,500',where:'P&L Operating Income'},
  {name:'Rent received prepaid (N21)',arrow:'→',amt:'€3,000',where:'Balance Sheet Current Liabilities'},
],
tip:'<strong>Rent RECEIVED prepaid is a LIABILITY:</strong> If the company has been paid for rent it hasn\'t yet earned, it owes the tenant something — either services (the use of the property) or a refund. So it\'s a current liability.',
watchOut:'<strong>Don\'t confuse with rent PAID prepaid:</strong> Rent paid in advance (your own rent) is an ASSET (prepayment). Rent RECEIVED in advance is a LIABILITY (someone owes you their remaining time in your building). Watch the direction.'},

{num:9,marks:14,title:'Directors\' Recommendations (Investment Income, BDP, Capital Reserve)',
noteText:'The Directors recommend that: (1) Provision should be made for both <strong>investment income due</strong> and <strong>debenture interest due</strong>. (2) Provision for bad debts to be adjusted to <strong>4% of debtors</strong>. (3) A transfer of <strong>€20,000</strong> should be made from profit to the <strong>capital reserve</strong>.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>3% Investments acquired on 01/05/2023</td><td>120,000</td><td></td></tr><tr><td>Bad debts provision</td><td></td><td>3,200</td></tr><tr><td>8% Debentures (incl €40,000 issued 01/10/2023)</td><td></td><td>140,000</td></tr><tr><td>Debenture interest for first 9 months</td><td>5,400</td><td></td></tr><tr><td>Capital reserve</td><td></td><td>15,000</td></tr></table>',
task:'<p><strong>Four sub-calculations:</strong></p><ol><li><strong>Investment income (full 8 months):</strong> €120,000 × 3% × 8/12 = €2,400. Already received = €900 (in patents). Still due = €1,500.</li><li><strong>Debenture interest (full year):</strong> 9 months on €100,000 + 3 months on €140,000 = €6,000 + €2,800 = €8,800. Cash paid (after suspense correction) = €6,000. Due = €2,800.</li><li><strong>BDP:</strong> new 4% of adjusted debtors (€69,200 × 4% = €2,768). Decrease from €3,200 to €2,768 = €432 decrease → Operating Income.</li><li><strong>Capital reserve transfer:</strong> €20,000 from Retained Profit to Capital Reserve.</li></ol>',
workings:[
  {type:'calc',title:'N10: Investment Income (full)',content:'<div class="calc-block"><div class="calc-line">€120,000 × 3% × 8/12 = <span class="rv-inline">€2,400</span></div><div class="calc-line">(Investments owned May–Dec = 8 months)</div></div>'},
  {type:'calc',title:'N17: Investment Income Due',content:'<div class="calc-block"><div class="calc-line">Full year = €2,400</div><div class="calc-line">Already received (3 months in patents) = €900</div><div class="calc-line calc-result">Investment income due = <span class="rv-inline">€1,500</span></div></div>'},
  {type:'calc',title:'N11: Debenture Interest (full year)',content:'<div class="calc-block"><div class="calc-line">Original debentures €100,000 (before 01/10 issue)</div><div class="calc-line">First 9 months: €100,000 × 8% × 9/12 = <span class="rv-inline">€6,000</span></div><div class="calc-line">Last 3 months: €140,000 × 8% × 3/12 = <span class="rv-inline">€2,800</span></div><div class="calc-line calc-result">Total = <span class="rv-inline">€8,800</span></div></div>'},
  {type:'calc',title:'N20: Debenture Interest Due',content:'<div class="calc-block"><div class="calc-line">Full year = €8,800</div><div class="calc-line">Cash paid (corrected via suspense) = €6,000</div><div class="calc-line calc-result">Interest due = <span class="rv-inline">€2,800</span></div></div>'},
  {type:'calc',title:'N8/N15/N16: Debtors & BDP',content:'<div class="calc-block"><div class="calc-line"><strong>Adjusted Debtors:</strong></div><div class="calc-line">TB €69,600 − €400 (discount correction) = <span class="rv-inline">€69,200</span></div><div class="calc-line" style="margin-top:6px"><strong>New BDP:</strong></div><div class="calc-line">€69,200 × 4% = <span class="rv-inline">€2,768</span></div><div class="calc-line"><strong>Change:</strong></div><div class="calc-line">€3,200 (old) − €2,768 (new) = <span class="rv-inline">€432 decrease</span></div></div>'},
],
destinations:[
  {name:'Investment Income (N10)',arrow:'→',amt:'€2,400',where:'P&L — between Operating Profit and Debenture Interest'},
  {name:'Investment Income Due (N17)',arrow:'→',amt:'€1,500',where:'Balance Sheet Current Assets'},
  {name:'Debenture Interest (N11)',arrow:'→',amt:'€8,800',where:'P&L Financial Expenses'},
  {name:'Debenture Interest Due (N20)',arrow:'→',amt:'€2,800',where:'Balance Sheet Current Liabilities'},
  {name:'Decrease in BDP (N8)',arrow:'→',amt:'€432',where:'P&L Operating Income'},
  {name:'BDP balance (N16)',arrow:'→',amt:'€2,768',where:'Balance Sheet — deducted from Debtors'},
  {name:'Transfer to Capital Reserve',arrow:'→',amt:'€20,000',where:'P&L (below Retained Profit); Capital Reserve €15,000 + €20,000 = €35,000 on BS'},
],
tip:'<strong>Decrease in BDP is INCOME:</strong> When you reduce a bad debts provision, you\'re writing BACK an expense. It goes in Operating Income, not as a negative expense. An INCREASE in BDP would go in Distribution Costs.',
watchOut:'<strong>Capital reserve transfer is NOT an expense.</strong> It\'s a movement within equity — taking money from retained earnings and parking it in a non-distributable reserve. Show it below Retained Profit in the P&L, NOT above Net Profit.'}
];

const CO_TPL_STEPS: BuilderStep[] = [
{title:'Sales and Cost of Sales — Opening Stock & Purchases',
rows:['<tr class="heading"><td colspan="3">Trading Profit &amp; Loss Account of Yeats Ltd — y/e 31/12/2023</td></tr>','<tr><td class="lbl">Sales <span class="wtag">TB</span></td><td class="amt">—</td><td class="amt">1,080,700</td></tr>','<tr class="heading"><td colspan="3">Less Cost of Sales</td></tr>','<tr class="indent"><td class="lbl">Opening stock <span class="wtag">TB</span></td><td class="amt">44,400</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Purchases <span class="wtag">N1</span></td><td class="amt">697,000</td><td></td></tr>'],
source:'<strong>Sales €1,080,700</strong> from the TB, unchanged (no notes affect sales for Yeats). <strong>Opening stock €44,400</strong> from TB. <strong>Purchases €697,000</strong> (N1) = TB €747,000 − €46,000 (van cheque wrongly posted) − €4,000 (sale-or-return).',
reason:'Company format starts the same as sole trader: Sales at the top, Cost of Sales as Opening Stock + Purchases − Closing Stock. The only differences come later in the expense layout and the P&L balance carry-forward.',
watch:'<strong>The €46,000 trap:</strong> The net cheque for the new van (€56,000 − €10,000 trade-in = €46,000) was wrongly entered as a stock purchase. If you miss this correction, purchases is too high by €46,000 and cost of sales is wrong.'},
{title:'Closing Stock, Cost of Sales & Gross Profit',
rows:['<tr class="indent"><td class="lbl">− Closing stock <span class="wtag">N2</span></td><td class="amt">(51,380)</td><td class="amt">(690,020)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">390,680</td></tr>'],
source:'<strong>Closing stock €51,380</strong> (N2) = €56,900 − €1,520 (damaged stock write-down) − €4,000 (sale-or-return removed). Cost of Sales = 44,400 + 697,000 − 51,380 = <strong>€690,020</strong>. Gross Profit = 1,080,700 − 690,020 = <strong>€390,680</strong>.',
reason:'The damaged stock write-down of €1,520 is absorbed into COS automatically via the lower closing stock figure — no separate P&L line needed. The sale-or-return goods are removed because the company never truly owned them.',
tip:'<strong>Damaged stock shortcut:</strong> Instead of treating the €1,520 write-down as a separate expense, simply reduce closing stock by the write-down amount. The effect on profit is identical: lower closing stock = higher COS = lower profit.'},
{title:'Distribution Costs',
rows:['<tr class="heading"><td colspan="3">Less Expenses — Distribution Costs</td></tr>','<tr class="indent"><td class="lbl">Discount <span class="wtag">TB</span></td><td class="amt">3,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Depreciation — delivery vans <span class="wtag">N3</span></td><td class="amt">24,890</td><td></td></tr>','<tr class="indent"><td class="lbl">Advertising <span class="wtag">TB</span></td><td class="amt">25,145</td><td class="amt">53,535</td></tr>'],
source:'<strong>Discount €3,500</strong> from TB — on the DEBIT side, so it\'s discount ALLOWED (an expense). <strong>Van depreciation €24,890</strong> (N3) = €131,000 × 95% / 5. <strong>Advertising €25,145</strong> from TB.',
reason:'Distribution Costs (also called Selling &amp; Distribution) are the costs of selling the goods. Discount allowed, delivery van depreciation, and advertising all fit this category.',
watch:'<strong>Discount side-check:</strong> Discount in the TB was on the <em>debit side</em> (€3,500), making it discount <em>allowed</em> — an expense → Distribution Costs. If it had been on the <em>credit side</em>, it would be discount <em>received</em> (income) → Operating Income. Always check which side!'},
{title:'Administration Expenses',
rows:['<tr class="heading"><td colspan="3">Administration Expenses</td></tr>','<tr class="indent"><td class="lbl">Patents written off <span class="wtag">N4</span></td><td class="amt">8,300</td><td></td></tr>','<tr class="indent"><td class="lbl">Depreciation — buildings <span class="wtag">N5</span></td><td class="amt">7,330</td><td></td></tr>','<tr class="indent"><td class="lbl">Salaries &amp; general expenses <span class="wtag">N6</span></td><td class="amt">218,155</td><td class="amt">233,785</td></tr>','<tr class="subtotal"><td class="lbl"></td><td></td><td class="amt">(287,320)</td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">103,360</td></tr>'],
source:'<strong>Patents written off €8,300</strong> (N4) = €41,500 / 5 years remaining. <strong>Buildings depn €7,330</strong> (N5) = €366,500 × 2%. <strong>Salaries &amp; general expenses €218,155</strong> (N6) = €218,355 + €400 (disc allowed correction) − €600 (deb int correction).',
reason:'Administration Expenses are the general running costs (office, management, intangibles amortisation, building depreciation). Total Expenses = Distribution €53,535 + Admin €233,785 = <strong>€287,320</strong>. Interim profit = 390,680 − 287,320 = <strong>€103,360</strong>.',
watch:'<strong>Don\'t put buildings depreciation in Distribution.</strong> Buildings are office/administrative assets, so their depreciation goes in Admin. Vans are delivery/selling assets, so their depreciation goes in Distribution. Asset function determines section.'},
{title:'Operating Income',
rows:['<tr class="heading"><td colspan="3">Add Operating Income</td></tr>','<tr class="indent"><td class="lbl">Rent received <span class="wtag">N7</span></td><td class="amt">10,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Decrease in bad debts provision <span class="wtag">N8</span></td><td class="amt">432</td><td></td></tr>','<tr class="indent"><td class="lbl">Profit on disposal <span class="wtag">N9</span></td><td class="amt">400</td><td class="amt">11,332</td></tr>','<tr class="subtotal"><td class="lbl">Operating Profit</td><td></td><td class="amt">114,692</td></tr>'],
source:'<strong>Rent received €10,500</strong> (N7) = €1,500 × 7 months (earned portion). <strong>Decrease in BDP €432</strong> (N8) = old €3,200 − new €2,768. <strong>Profit on disposal €400</strong> (N9) = trade-in €10,000 − NBV €9,600.',
reason:'Operating Income sits between the expenses block and the Operating Profit total. It\'s non-sales income that\'s still part of normal operations. Operating Profit = 103,360 + 11,332 = <strong>€114,692</strong>.',
tip:'<strong>Decrease in BDP is INCOME:</strong> When the provision shrinks, you\'re releasing a previously-booked expense. It comes back as income in the period of release. An <em>increase</em> in BDP would go in Distribution Costs as an expense.'},
{title:'Investment Income & Debenture Interest',
rows:['<tr class="indent"><td class="lbl">+ Investment income <span class="wtag">N10</span></td><td></td><td class="amt">2,400</td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">117,092</td></tr>','<tr class="indent"><td class="lbl">− Debenture interest <span class="wtag">N11</span></td><td></td><td class="amt">(8,800)</td></tr>','<tr class="subtotal"><td class="lbl">Net Profit</td><td></td><td class="amt">108,292</td></tr>'],
source:'<strong>Investment income €2,400</strong> (N10) = €120,000 × 3% × 8/12. <strong>Debenture interest €8,800</strong> (N11) = 9 months at €100,000 + 3 months at €140,000.',
reason:'Investment Income is non-operating (it\'s financing income, not trading). Debenture Interest is the financial expense of borrowing. Both sit between Operating Profit and Net Profit. Net Profit = 114,692 + 2,400 − 8,800 = <strong>€108,292</strong>.',
watch:'<strong>Debenture mid-year issue:</strong> €40,000 of debentures were issued on 01/10/2023. So for the first 9 months only €100,000 was outstanding, then €140,000 for the last 3 months. Calculate interest in two chunks.'},
{title:'Dividends, Capital Reserve Transfer & Retained Profit',
rows:['<tr class="indent"><td class="lbl">Less Dividends paid <span class="wtag">TB</span></td><td></td><td class="amt">(15,000)</td></tr>','<tr class="subtotal"><td class="lbl">Retained profit</td><td></td><td class="amt">93,292</td></tr>','<tr class="indent"><td class="lbl">Less Transfer to Capital Reserve <span class="wtag">N9(iii)</span></td><td></td><td class="amt">(20,000)</td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">73,292</td></tr>'],
source:'<strong>Dividends paid €15,000</strong> from TB. <strong>Transfer to capital reserve €20,000</strong> from Note 9(iii).',
reason:'Dividends are a distribution of profit, not an expense — they come AFTER Net Profit. Retained profit = 108,292 − 15,000 = <strong>€93,292</strong>. The capital reserve transfer is a movement within equity, not an expense either — so it also goes below Retained profit.',
watch:'<strong>Capital reserve transfer placement:</strong> This is a movement WITHIN equity. It reduces distributable (retained) profit and increases non-distributable (capital) reserve. It must NOT appear as an expense above Net Profit — that would be a serious error.'},
{title:'P&L Balance Carry-Forward',
rows:['<tr class="indent"><td class="lbl">+ P&amp;L balance 01/01/2023 <span class="wtag">TB</span></td><td></td><td class="amt">34,800</td></tr>','<tr class="total"><td class="lbl">P&amp;L balance 31/12/2023</td><td></td><td class="amt">108,092</td></tr>'],
source:'<strong>Opening P&amp;L balance €34,800</strong> from TB (credit side). Closing balance = 73,292 + 34,800 = <strong>€108,092</strong>.',
reason:'Unlike a sole trader, a company carries forward its accumulated P&amp;L balance year on year. The opening balance is added to this year\'s retained profit (after capital reserve transfer). The closing balance goes to the Balance Sheet Capital section.',
tip:'<strong>The P&amp;L balance is the "retained earnings" account.</strong> It tracks accumulated profits not yet paid out as dividends. A company can distribute this as future dividends or transfer it to reserves. It sits in the Capital section of the BS alongside share capital and other reserves.'}
];

const CO_BS_STEPS: BuilderStep[] = [
{title:'Intangible Fixed Assets — Patents',
rows:['<tr class="heading"><td colspan="4">Balance Sheet of Yeats Ltd as at 31/12/2023</td></tr>','<tr class="heading"><td colspan="4">Intangible Fixed Assets</td></tr>','<tr class="indent"><td class="lbl">Patents <span class="wtag">N12</span></td><td></td><td></td><td class="amt">33,200</td></tr>'],
source:'<strong>Patents €33,200</strong> (N12) = Cleaned-up balance €41,500 − current year write-off €8,300.',
reason:'Intangible fixed assets always appear first. The patents balance has already been amortised for the current year, so the figure shown is the NBV at year-end.',
watch:'<strong>Do NOT use the TB figure of €40,600.</strong> It had 3 months of investment income hidden inside it. The cleaned-up balance is €41,500, then write off €8,300 to get €33,200.'},
{title:'Tangible Fixed Assets — Header & Land and Buildings',
rows:['<tr class="heading"><td colspan="4">Tangible Fixed Assets</td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>','<tr class="indent"><td class="lbl">Land &amp; Buildings</td><td class="amt">700,000</td><td class="amt">—</td><td class="amt">700,000</td></tr>'],
source:'<strong>Cost €700,000</strong> (revalued at 31/12/2023). <strong>Accum Depn €0</strong> — wiped out by the revaluation. <strong>NBV €700,000</strong>.',
reason:'When a building is revalued, all accumulated depreciation (opening €38,000 + current year €7,330) is wiped out. The clock starts again at the new value.',
tip:'The revaluation surplus (€178,830) does NOT appear here in the fixed assets section. It goes into the Capital section below as a Revaluation Reserve.'},
{title:'Tangible Fixed Assets — Motor Vehicles',
rows:['<tr class="indent"><td class="lbl">Motor Vehicles <span class="wtag">N13, N14</span></td><td class="amt">131,000</td><td class="amt">29,490</td><td class="amt">101,510</td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>831,000</strong></td><td class="amt"><strong>29,490</strong></td><td class="amt">801,510</td></tr>'],
source:'<strong>Cost €131,000</strong> (N13) = €115,000 + €56,000 (new van) − €40,000 (old van). <strong>Accum Depn €29,490</strong> (N14) = €35,000 + €24,890 (current year) − €30,400 (disposed).',
reason:'Both cost and accumulated depreciation of the disposed van (€40,000 / €30,400) must be REMOVED from the totals. The new van adds €56,000 to cost and gets a full year\'s depreciation.',
tip:'Total TFA NBV = 700,000 + 101,510 = <strong>€801,510</strong>.'},
{title:'Financial Assets — 3% Investments',
rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">3% Investments <span class="wtag">TB</span></td><td></td><td></td><td class="amt">120,000</td></tr>','<tr><td class="lbl"></td><td></td><td></td><td class="amt"><strong>954,710</strong></td></tr>'],
source:'<strong>€120,000</strong> from TB, unchanged.',
reason:'Financial assets are long-term investments, shown at cost. The interest earned goes to the P&L; the interest due goes to current assets. Total Fixed + Intangible + Financial = 33,200 + 801,510 + 120,000 = <strong>€954,710</strong>.',
tip:'The distinction: the €120,000 is the asset itself (here), the €2,400 interest is in the P&L, and the €1,500 interest due will be in current assets.'},
{title:'Current Assets — Stock & Debtors',
rows:['<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Closing Stock <span class="wtag">N2</span></td><td></td><td class="amt">51,380</td><td></td></tr>','<tr class="indent"><td class="lbl">Debtors <span class="wtag">N15</span></td><td class="amt">69,200</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">− Bad debts provision <span class="wtag">N16</span></td><td class="amt">(2,768)</td><td class="amt">66,432</td><td></td></tr>'],
source:'<strong>Stock €51,380</strong> (N2). <strong>Debtors €69,200</strong> (N15) = TB €69,600 − €400 (discount allowed correction). <strong>BDP €2,768</strong> (N16) = €69,200 × 4%.',
reason:'The BDP is calculated on ADJUSTED debtors, not the TB figure. Net debtors = €69,200 − €2,768 = <strong>€66,432</strong>.',
watch:'<strong>Always calculate BDP on adjusted debtors.</strong> If you apply 4% to the TB €69,600, you get €2,784 — wrong. The discount allowed correction (€400) must reduce debtors first.'},
{title:'Current Assets — Receivables',
rows:['<tr class="indent"><td class="lbl">Investment income due <span class="wtag">N17</span></td><td></td><td class="amt">1,500</td><td></td></tr>','<tr class="indent"><td class="lbl">VAT <span class="wtag">N18</span></td><td></td><td class="amt">11,600</td><td class="amt">130,912</td></tr>'],
source:'<strong>Investment income due €1,500</strong> (N17) = total earned €2,400 − already received €900. <strong>VAT €11,600</strong> (N18) = TB −€1,900 liability + €13,500 input VAT reclaim = €11,600 asset.',
reason:'VAT has FLIPPED SIDES. In the TB it was a credit (liability €1,900). After adding the reclaimable warehouse VAT (€13,500), the balance becomes a debit €11,600 — an asset. Total Current Assets = 51,380 + 66,432 + 1,500 + 11,600 = <strong>€130,912</strong>.',
watch:'<strong>VAT side-flip is easy to miss.</strong> If you leave VAT in current liabilities, the balance sheet won\'t balance. You must (a) flip it to assets, and (b) use the correct amount €11,600, not €1,900 or €13,500.'},
{title:'Current Liabilities',
rows:['<tr class="heading"><td colspan="4">Creditors: amounts falling due within 1 year</td></tr>','<tr class="indent"><td class="lbl">Creditors <span class="wtag">N19</span></td><td class="amt">60,900</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Bank <span class="wtag">TB</span></td><td class="amt">57,000</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Debenture interest due <span class="wtag">N20</span></td><td class="amt">2,800</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Rent receivable prepaid <span class="wtag">N21</span></td><td class="amt">3,000</td><td class="amt">(123,700)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Working Capital</td><td></td><td></td><td class="amt">7,212</td></tr>','<tr class="subtotal"><td class="lbl"></td><td></td><td></td><td class="amt">961,922</td></tr>'],
source:'<strong>Creditors €60,900</strong> (N19) = €64,900 − €4,000 (sale-or-return). <strong>Bank €57,000</strong> TB overdraft. <strong>Debenture interest due €2,800</strong> (N20) = €8,800 full year − €6,000 paid. <strong>Rent prepaid €3,000</strong> (N21) = €13,500 received − €10,500 earned.',
reason:'All four are current liabilities. Total Current Liabilities = 60,900 + 57,000 + 2,800 + 3,000 = <strong>€123,700</strong>. Working Capital = Current Assets − Current Liabilities = 130,912 − 123,700 = <strong>€7,212</strong>. Total Net Assets = 954,710 + 7,212 = <strong>€961,922</strong>.',
watch:'<strong>Rent received prepaid is a LIABILITY.</strong> The company has been paid for rent it hasn\'t yet earned — it owes the tenant the remaining time in the warehouse. Don\'t confuse with rent PAID prepaid (which would be an asset).'},
{title:'Financed By — Debentures',
rows:['<tr class="heading"><td colspan="4">Financed By</td></tr>','<tr class="heading"><td colspan="4">Creditors: amounts falling due after 1 year</td></tr>','<tr class="indent"><td class="lbl">8% Debentures <span class="wtag">TB</span></td><td></td><td></td><td class="amt">140,000</td></tr>'],
source:'<strong>€140,000</strong> from TB, unchanged. This is the total debenture balance including the €40,000 issued on 01/10/2023.',
reason:'Debentures are long-term loans (over 1 year). Only the interest due (€2,800) appears in current liabilities. The principal sits here in the "Financed By" section.',
tip:'Alongside share capital and reserves, debentures make up the long-term financing of the company. They appear first in the "Financed By" block.'},
{title:'Share Capital',
rows:['<tr class="heading"><td colspan="4">Share Capital</td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Authorised</strong></td><td class="amt"><strong>Issued</strong></td><td></td></tr>','<tr class="indent"><td class="lbl">Ordinary shares €1 each</td><td class="amt">1,000,000</td><td class="amt">400,000</td><td></td></tr>','<tr class="indent"><td class="lbl">4% Preference shares €1 each</td><td class="amt">600,000</td><td class="amt">100,000</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>1,600,000</strong></td><td class="amt"><strong>500,000</strong></td><td></td></tr>'],
source:'<strong>Authorised:</strong> 1,000,000 ordinary + 600,000 preference = €1,600,000 (from the question intro). <strong>Issued:</strong> €400,000 ordinary + €100,000 preference = €500,000 (from TB).',
reason:'Authorised capital is the maximum a company CAN issue — a disclosure only. Issued capital is what\'s actually in circulation. Only the Issued figure counts for Capital Employed.',
watch:'<strong>Never add the authorised figure to Capital Employed.</strong> Only the Issued €500,000 is real money raised. The Authorised €1,600,000 just tells you how much more the company could issue.'},
{title:'Reserves & P&L Balance',
rows:['<tr class="indent"><td class="lbl">Revaluation Reserve <span class="wtag">N22</span></td><td></td><td class="amt">178,830</td><td></td></tr>','<tr class="indent"><td class="lbl">Capital reserve</td><td></td><td class="amt">35,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Profit &amp; Loss balance</td><td></td><td class="amt">108,092</td><td class="amt">821,922</td></tr>','<tr class="total"><td class="lbl">Capital Employed</td><td></td><td></td><td class="amt">961,922</td></tr>'],
source:'<strong>Revaluation Reserve €178,830</strong> (N22) = €133,500 uplift + €38,000 opening AD written back + €7,330 current year depn written back. <strong>Capital reserve €35,000</strong> = TB €15,000 + €20,000 transfer from retained profit. <strong>P&amp;L balance €108,092</strong> from the TPL.',
reason:'All three reserves together with Issued SC make up the shareholders\' equity. Capital Employed = Debentures 140,000 + SC 500,000 + Reserves (178,830 + 35,000 + 108,092) = <strong>€961,922</strong>.',
watch:'<strong>Three reserves in the capital section:</strong> Revaluation Reserve (from Note 7), Capital Reserve (TB €15,000 + €20,000 transfer from Note 9), and P&amp;L balance (from the TPL closing figure). Missing any of these unbalances the BS.'},
{title:'Final Verification',
rows:[],
source:'<strong>Total Net Assets = €961,922</strong> = <strong>Capital Employed = €961,922</strong> ✓',
reason:'All 22 workings placed. Net Profit €108,292. Retained Profit €93,292. P&amp;L balance 31/12/2023 €108,092. Balance sheet balances.',
tip:'<strong>If your two totals don\'t match</strong> for Company 2024: (1) forgot revaluation reserve, (2) VAT still in liabilities instead of assets, (3) capital reserve transfer put above Net Profit instead of below, (4) used TB debtors for BDP calc, (5) forgot to strip VAT from buildings cost.'}
];


// ═══════════════════════════════════════════════════
// 3. MANUFACTURING — McGuigan Ltd 2021
// ═══════════════════════════════════════════════════

const MFG_INTRO = `
<div class="wt-intro-box green">
  <h3>Meet the Question — McGuigan Ltd (2022 SEC Paper)</h3>
  <p>Before diving into the workings, take a moment to <strong>read the actual exam question</strong>. Study the trial balance and notes carefully.</p>
  <div style="display:flex;flex-direction:column;gap:12px;margin-top:12px;">
    <img src="/images/q1-mfg-2022-p1.jpg" alt="2022 Manufacturing Q1 Page 1 — Trial Balance" style="width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.1);" />
    <img src="/images/q1-mfg-2022-p2.jpg" alt="2022 Manufacturing Q1 Page 2 — Notes" style="width:100%;border-radius:8px;border:1px solid rgba(255,255,255,0.1);" />
  </div>
</div>

<div class="wt-intro-box">
  <p>A Manufacturing Q1 is worth <strong>120 marks</strong> and is the longest and most structured question on the paper. It adds a <strong>Manufacturing Account</strong> that calculates the Cost of Manufacture before the Trading P&L.</p>
  <h4>The 6-step approach:</h4>
  <ol>
    <li><strong>Read the trial balance first.</strong> Note the three stock categories (Raw Materials, Work in Progress, Finished Goods). Identify factory costs vs non-factory costs.</li>
    <li><strong>Read the notes from top to bottom.</strong> Watch for "own-use" items — a store or machine built by employees.</li>
    <li><strong>Work through the notes one at a time.</strong> Open T-accounts, label destinations (Mfg A/c, TPL, or BS).</li>
    <li><strong>Build the Manufacturing Account.</strong> Raw materials consumed → Direct costs → Prime Cost → Factory Overheads → Adjust for WIP → Less sale of scrap → Cost of Manufacture.</li>
    <li><strong>Build the Trading P&L.</strong> Cost of Manufacture replaces Purchases.</li>
    <li><strong>Build the Balance Sheet.</strong> All three closing stock categories appear separately in Current Assets.</li>
  </ol>
</div>

<div class="wt-intro-box cyan">
  <h3>How to Read the Trial Balance (DEAL / CLIP)</h3>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Side (DEAL)</div>
      <div class="wt-dc-item"><strong>D</strong>ebtors / Drawings</div>
      <div class="wt-dc-item"><strong>E</strong>xpenses</div>
      <div class="wt-dc-item"><strong>A</strong>ssets</div>
      <div class="wt-dc-item"><strong>L</strong>osses</div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Side (CLIP)</div>
      <div class="wt-dc-item"><strong>C</strong>reditors / Capital</div>
      <div class="wt-dc-item"><strong>L</strong>iabilities</div>
      <div class="wt-dc-item"><strong>I</strong>ncome</div>
      <div class="wt-dc-item"><strong>P</strong>rofits</div>
    </div>
  </div>
  <h4>Manufacturing-specific reading tips:</h4>
  <ul>
    <li><strong>Three stock figures</strong> (Raw Materials, WIP, Finished Goods) instead of one. Check opening vs closing.</li>
    <li><strong>Direct costs</strong> (Direct Factory Wages, Royalties, Hire of Special Equipment) go in Prime Cost.</li>
    <li><strong>General factory overheads</strong> go in Factory Overheads (below Prime Cost).</li>
    <li><strong>Selling & Administration expenses</strong> go in the TPL, NOT the manufacturing account.</li>
    <li><strong>Sale of scrap</strong> is deducted in the manufacturing account.</li>
  </ul>
</div>

<div class="wt-intro-box purple">
  <h3>The T-Account Rules — Memory Aid</h3>
  <div class="wt-deal-clip">
    <div class="wt-dc-side dr">
      <div class="wt-dc-label">Debit Increases</div>
      <div class="wt-dc-item"><strong>Expense</strong></div>
      <div class="wt-dc-item"><strong>Asset</strong></div>
      <div class="wt-dc-item"><strong>Reducing Liability</strong></div>
    </div>
    <div class="wt-dc-side cr">
      <div class="wt-dc-label">Credit Increases</div>
      <div class="wt-dc-item"><strong>Income</strong></div>
      <div class="wt-dc-item"><strong>Liability</strong></div>
      <div class="wt-dc-item"><strong>Reducing Asset</strong></div>
    </div>
  </div>
</div>

<div class="wt-intro-box orange">
  <h3>Common Manufacturing Q1 Traps</h3>
  <ul>
    <li><strong>Own-use store/equipment:</strong> Employees build something for the business → wages and materials REMOVED from direct costs and ADDED to fixed asset.</li>
    <li><strong>Asset disposal:</strong> Machine traded in. Calculate profit/loss AND correct wrongly-recorded bank entry.</li>
    <li><strong>Sale of scrap:</strong> TB figure may include proceeds from selling old machine — separate these.</li>
    <li><strong>Wage accrual backdated:</strong> 2% increase backdated 3 months = 2% × 3/12 × annual wages.</li>
    <li><strong>Bank reconciliation:</strong> TB bank may differ from bank statement. Credit transfers, errors, unpresented cheques.</li>
    <li><strong>Sale or return stock:</strong> Reverse the purchase AND remove from closing stock.</li>
    <li><strong>Three stocks on BS:</strong> Raw Materials, WIP, AND Finished Goods all appear separately.</li>
  </ul>
</div>
`;

const MFG_NOTES: WalkthroughNote[] = [
{num:1,marks:6,title:'Closing Stocks (Raw, WIP, Finished)',
noteText:'Stocks on hand at 31/12/2021: <strong>Raw materials €28,300</strong>, <strong>Work in progress €27,600</strong>, <strong>Finished goods €58,000</strong>.',
tbLook:'<p>Look at the trial balance for opening stocks:</p><table><tr><th>Item</th><th>Dr</th></tr><tr><td>Raw materials</td><td>27,300</td></tr><tr><td>Work in progress</td><td>38,650</td></tr><tr><td>Finished goods</td><td>38,400</td></tr></table><p>The TB figures are the <strong>OPENING</strong> stocks. The closing stocks come from Note (i).</p>',
task:'<p><strong>Closing stocks are used in THREE different places:</strong></p><ol><li><strong>Raw Materials (€28,300)</strong> — deducted in the Manufacturing account to give Cost of Raw Materials Consumed</li><li><strong>Work in Progress (€27,600)</strong> — deducted in the Manufacturing account after Factory Overheads</li><li><strong>Finished Goods (€58,000)</strong> — deducted in the Trading account (BUT see Note 2 — this figure needs to be adjusted!)</li></ol><p>All three also appear on the Balance Sheet in Current Assets.</p>',
workings:[
  {type:'calc',title:'Stock allocations',content:'<div class="calc-block"><div class="calc-line"><strong>Raw Materials:</strong> opening €27,300 / closing €28,300</div><div class="calc-line"><strong>Work in Progress:</strong> opening €38,650 / closing €27,600</div><div class="calc-line"><strong>Finished Goods:</strong> opening €38,400 / closing €58,000 → adjust to <span class="rv-inline">€49,000</span> (Note 2 + Note 9)</div></div>'},
],
destinations:[
  {name:'Raw Materials (opening)',arrow:'→',amt:'€27,300',where:'Manufacturing A/c top'},
  {name:'Raw Materials (closing)',arrow:'→',amt:'€28,300',where:'Mfg A/c (deduct) + Balance Sheet Current Assets'},
  {name:'WIP (opening)',arrow:'+',amt:'€38,650',where:'Manufacturing A/c (add after Factory OH)'},
  {name:'WIP (closing)',arrow:'−',amt:'€27,600',where:'Manufacturing A/c (deduct) + Balance Sheet'},
  {name:'Finished Goods (opening)',arrow:'→',amt:'€38,400',where:'Trading account top (as Opening Stock)'},
  {name:'Finished Goods (closing)',arrow:'→',amt:'€49,000',where:'Trading account (deduct) + Balance Sheet (final figure after Notes 2 + 9)'},
],
tip:'<strong>Three stocks, three locations:</strong> Raw materials sit at the TOP of the manufacturing account. WIP is adjusted JUST BEFORE the cost of manufacture is struck. Finished goods sit in the Trading section — opening at the top, closing deducted after Cost of Manufacture.',
watchOut:'<strong>Don\'t combine the three stocks on the Balance Sheet.</strong> Show Raw Materials, Work in Progress, and Finished Goods as three separate lines in Current Assets. This is the main visual difference from a sole trader balance sheet.'},

{num:2,marks:6,title:'Sale of Goods Not Dispatched',
noteText:'No entry has been made in the books for sale of goods to a debtor on 31/12/2021. An invoice had been sent for <strong>€10,800</strong>, which included a mark-up on cost of 20%. The goods were not dispatched until 02/01/2022 and were <strong>included in closing stock</strong>.',
tbLook:'<p>This is a year-end adjustment not posted. Look at the TB for:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Sales</td><td></td><td>1,650,000</td></tr><tr><td>Debtors</td><td>76,350</td><td></td></tr></table>',
task:'<p><strong>Two things:</strong></p><ol><li>Recognise the sale — add €10,800 to Sales and €10,800 to Debtors (the invoice was sent, so the sale has occurred even if the goods haven\'t left)</li><li>Since the goods were still in the warehouse on 31/12, they were INCLUDED in the closing stock count at cost. But we\'ve now recognised them as sold, so REMOVE them from closing stock at cost: €10,800 ÷ 1.20 = €9,000</li></ol>',
workings:[
  {type:'calc',title:'Cost of undispatched goods',content:'<div class="calc-block"><div class="calc-line">Invoice / selling price = €10,800</div><div class="calc-line">Mark-up = 20% on cost</div><div class="calc-line">Cost = €10,800 ÷ 1.20 = <span class="rv-inline">€9,000</span></div></div>'},
],
destinations:[
  {name:'Sales (W8)',arrow:'+',amt:'€10,800',where:'Trading account — add to Sales (€1,650,000 + €10,800 = €1,660,800)'},
  {name:'Debtors (W18)',arrow:'+',amt:'€10,800',where:'Balance Sheet Current Assets'},
  {name:'Closing Stock FG (W9)',arrow:'−',amt:'€9,000',where:'Remove from Finished Goods closing stock (Trading a/c + BS)'},
],
tip:'<strong>Revenue recognition rule:</strong> A sale is recognised when the <em>invoice is sent and legal title passes</em>, not when the goods physically leave. The invoice date (31/12) means the sale belongs in this year\'s accounts.',
watchOut:'<strong>The €9,000 and €10,800 are NOT the same number.</strong> €10,800 is the selling price (added to sales and debtors). €9,000 is the cost price (removed from closing stock). Getting these the wrong way round is a common error.'},

{num:3,marks:12,title:'Sale of Scrap Includes Machine Disposal',
noteText:'Included in the figure for sale of scrap materials is <strong>€7,000</strong> received from the sale of an old machine on 31/03/2021. This machine had cost <strong>€30,000</strong> on 01/09/2016.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Sale of scrap materials</td><td></td><td>18,950</td></tr><tr><td>Plant and machinery (cost €340,000)</td><td>290,000</td><td></td></tr></table><p>Machine cost = €340,000. NBV = €290,000. Accumulated depreciation so far = €50,000.</p>',
task:'<p><strong>Three things to sort out:</strong></p><ol><li>Separate €7,000 out of the scrap figure. True scrap = €18,950 − €7,000 = €11,950</li><li>Calculate accumulated depreciation on the OLD machine from 01/09/2016 to 31/03/2021 (4 years 7 months), at 15% of cost straight line</li><li>Calculate the profit/loss on disposal: Proceeds €7,000 − NBV = loss or profit</li></ol>',
workings:[
  {type:'calc',title:'W7: True sale of scrap',content:'<div class="calc-block"><div class="calc-line">TB figure = €18,950</div><div class="calc-line">Less: machine disposal proceeds = (€7,000)</div><div class="calc-line calc-result">True scrap = <span class="rv-inline">€11,950</span></div></div>'},
  {type:'calc',title:'W5: Loss on Machine',content:'<div class="calc-block"><strong>Accum depn on old machine (01/09/2016 → 31/03/2021):</strong><div class="calc-line">Years 2016: 4 months · 2017: 12 · 2018: 12 · 2019: 12 · 2020: 12 · 2021: 3</div><div class="calc-line">Total ≈ 55 months = 4 years 7 months</div><div class="calc-line">Accum depn = €30,000 × 15% × 55/12 = <span class="rv-inline">€20,625</span></div><div class="calc-line" style="margin-top:8px"><strong>NBV on disposal:</strong></div><div class="calc-line">€30,000 − €20,625 = <span class="rv-inline">€9,375</span></div><div class="calc-line" style="margin-top:8px"><strong>Loss on disposal:</strong></div><div class="calc-line">Proceeds €7,000 − NBV €9,375 = <span class="rv-inline">(€2,375) loss</span></div></div>'},
],
destinations:[
  {name:'Sale of scrap (W7)',arrow:'→',amt:'€11,950',where:'Manufacturing A/c — DEDUCT from cost of manufacture'},
  {name:'Loss on machine (W5)',arrow:'→',amt:'€2,375',where:'Manufacturing A/c (Factory Overheads section) — add as a cost'},
  {name:'Accum depn removed (W17)',arrow:'−',amt:'€20,625',where:'Deducted from Machinery Accumulated Depreciation in BS'},
  {name:'Machinery cost removed (W16)',arrow:'−',amt:'€30,000',where:'Deducted from Machinery Cost in BS'},
],
tip:'<strong>Why does the loss go in Factory Overheads?</strong> Because the machine was a factory asset. Losses and profits on disposal of factory assets are treated as factory overheads, not as an operating expense in the TPL. This is a manufacturing-specific rule.',
watchOut:'<strong>The scrap figure in the TB is contaminated.</strong> If you use the full €18,950 as sale of scrap, you double-count the €7,000. You must split it first. The €7,000 is NOT scrap — it\'s proceeds from selling a capital asset, which needs disposal treatment.'}
];

const MFG_TPL_STEPS: BuilderStep[] = [
{title:'Manufacturing Account — Raw Materials',
rows:['<tr class="heading"><td colspan="3">Manufacturing Account of McGuigan Ltd — y/e 31/12/2021</td></tr>','<tr class="indent"><td class="lbl">Opening stock of raw materials</td><td class="amt">27,300</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Purchases of raw materials <span class="wtag">W1</span></td><td class="amt">709,400</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing stock of raw materials</td><td class="amt">(28,300)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Cost of Raw Materials Consumed</td><td></td><td class="amt">708,400</td></tr>'],
source:'<strong>Opening stock €27,300</strong> from TB. <strong>Purchases €709,400</strong> (W1) = TB €760,400 + €11,000 (suspense correction, Note 5) − €62,000 (materials used for store, Note 7). <strong>Closing stock €28,300</strong> from Note 1.',
reason:'The manufacturing account starts by calculating the cost of raw materials actually consumed in production. It\'s the same logic as Cost of Goods Sold but for raw materials instead of finished goods.',
watch:'<strong>Don\'t forget the store adjustment.</strong> The €62,000 of materials used to build the store are NOT part of production — they became a fixed asset. Miss this and your purchases figure is €62,000 too high.'},
{title:'Direct Costs and Prime Cost',
rows:['<tr class="heading"><td colspan="3">Direct Costs</td></tr>','<tr class="indent"><td class="lbl">Direct factory wages <span class="wtag">W2</span></td><td class="amt">88,440</td><td></td></tr>','<tr class="indent"><td class="lbl">Royalties <span class="wtag">TB</span></td><td class="amt">29,600</td><td></td></tr>','<tr class="indent"><td class="lbl">Hire of special equipment <span class="wtag">TB</span></td><td class="amt">37,800</td><td class="amt">155,840</td></tr>','<tr class="subtotal"><td class="lbl">Prime Cost</td><td></td><td class="amt">864,240</td></tr>'],
source:'<strong>Factory wages €88,440</strong> (W2) = TB €148,000 + €740 (2% accrual) − €60,300 (store labour with accrual). <strong>Royalties €29,600</strong> and <strong>Hire of special equipment €37,800</strong> taken directly from TB.',
reason:'Prime Cost = Raw Materials Consumed + all Direct Costs. Royalties and hire of special equipment are direct costs because they vary directly with production volume. Prime Cost = 708,400 + 88,440 + 29,600 + 37,800 = <strong>€864,240</strong>.',
tip:'<strong>Royalties are ALWAYS direct:</strong> royalties are paid per unit produced or as a percentage of sales, so they vary directly with output. Always in the prime cost section of the manufacturing account.'},
{title:'Factory Overheads',
rows:['<tr class="heading"><td colspan="3">Factory Overheads</td></tr>','<tr class="indent"><td class="lbl">General factory overhead <span class="wtag">W3</span></td><td class="amt">114,300</td><td></td></tr>','<tr class="indent"><td class="lbl">Depreciation of plant & machinery <span class="wtag">W4</span></td><td class="amt">47,625</td><td></td></tr>','<tr class="indent"><td class="lbl">Loss on disposal of machine <span class="wtag">W5</span></td><td class="amt">2,375</td><td></td></tr>','<tr class="indent"><td class="lbl">Depreciation on factory buildings <span class="wtag">W6</span></td><td class="amt">20,246</td><td class="amt">184,546</td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">1,048,786</td></tr>'],
source:'<strong>General factory OH €114,300</strong> (W3) = TB €126,700 − €1,400 (discount suspense) − €11,000 (purchases suspense). <strong>Plant depn €47,625</strong> (W4). <strong>Loss on machine €2,375</strong> (W5). <strong>Buildings depn €20,246</strong> (W6) = €1,012,300 × 2%.',
reason:'Factory overheads are the indirect costs of running the factory. Prime Cost + Factory Overheads = total factory costs for the period. The running total of 1,048,786 is now ready for the WIP adjustment.',
watch:'<strong>The loss on the old machine goes in Factory Overheads</strong>, not in the TPL Expenses. It\'s a factory asset loss, so it belongs in the factory cost section. This is manufacturing-specific.'},
{title:'Work in Progress & Scrap Adjustment',
rows:['<tr><td class="lbl"></td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">+ Opening stock of Work in Progress</td><td class="amt">38,650</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing stock of Work in Progress</td><td class="amt">(27,600)</td><td class="amt">11,050</td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">1,059,836</td></tr>','<tr class="indent"><td class="lbl">− Sale of scrap <span class="wtag">W7</span></td><td></td><td class="amt">(11,950)</td></tr>','<tr class="total"><td class="lbl">Cost of Manufacture</td><td></td><td class="amt">1,047,886</td></tr>'],
source:'<strong>Opening WIP €38,650</strong> added, <strong>Closing WIP €27,600</strong> deducted. Net WIP movement = €11,050 (more WIP converted to finished goods than started). <strong>Sale of scrap €11,950</strong> (W7) = TB €18,950 − €7,000 (machine disposal separated).',
reason:'WIP adjustment converts "factory costs incurred" into "factory costs of goods completed". If WIP fell, the cost of goods completed is HIGHER than factory costs incurred. The sale of scrap is a recovery of cost, so it\'s deducted. Cost of Manufacture = 1,048,786 + 11,050 − 11,950 = <strong>€1,047,886</strong>.',
tip:'<strong>Sale of scrap reduces the cost of manufacture:</strong> scrap sales are treated as a recovery of production costs, not as income. This is why they go in the Mfg A/c, not the TPL.'},
{title:'Trading Account — Sales and Cost of Sales',
rows:['<tr class="heading"><td colspan="3">Trading Profit &amp; Loss Account y/e 31/12/2021</td></tr>','<tr><td class="lbl">Sales <span class="wtag">W8</span></td><td></td><td class="amt">1,660,800</td></tr>','<tr class="heading"><td colspan="3">Less Cost of Sales</td></tr>','<tr class="indent"><td class="lbl">Opening stock of finished goods</td><td class="amt">38,400</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Cost of Manufacture</td><td class="amt">1,047,886</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing stock of finished goods <span class="wtag">W9</span></td><td class="amt">(49,000)</td><td class="amt">(1,037,286)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">623,514</td></tr>'],
source:'<strong>Sales €1,660,800</strong> (W8) = TB €1,650,000 + €10,800 (sale not dispatched, Note 2). <strong>Opening FG €38,400</strong> from TB. <strong>Cost of Manufacture €1,047,886</strong> from the manufacturing account above. <strong>Closing FG €49,000</strong> (W9) = €58,000 − €9,000 (cost of undispatched goods removed).',
reason:'In a manufacturing company, Cost of Manufacture REPLACES Purchases in the Trading Account. Everything else works the same way: Opening Stock + Cost of Manufacture − Closing Stock = Cost of Sales. Gross Profit = Sales − Cost of Sales = 1,660,800 − 1,037,286 = <strong>€623,514</strong>.',
watch:'<strong>Closing stock of finished goods is €49,000, not €58,000.</strong> The €9,000 cost of goods invoiced but not dispatched (Note 2) has been removed because those goods are now recognised as sold. Miss this and closing stock is too high AND gross profit is too high.'},
{title:'Selling & Distribution Expenses',
rows:['<tr class="heading"><td colspan="3">Less Expenses — Selling &amp; Distribution</td></tr>','<tr class="indent"><td class="lbl">Bad debt <span class="wtag">W10</span></td><td class="amt">1,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Selling expenses <span class="wtag">TB</span></td><td class="amt">45,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Increase in bad debts provision <span class="wtag">W11</span></td><td class="amt">212</td><td></td></tr>'],
source:'<strong>Bad debt €1,500</strong> (W10) = €5,000 bankrupt debt × 30% (the portion not recovered). <strong>Selling expenses €45,000</strong> from TB. <strong>Increase in BDP €212</strong> (W11) = new provision €3,262 − old provision €3,050.',
reason:'Selling & Distribution expenses are the costs of selling the finished goods. Bad debts and BDP adjustments go here because they arise from credit sales. Selling expenses go here because they relate to selling effort.',
tip:'<strong>Bad debt vs BDP:</strong> A SPECIFIC bad debt (€1,500) is a write-off of a real debtor. The PROVISION is an estimated allowance against debtors that might go bad in future. Both go in S&D, but for different reasons.'},
{title:'Administration Expenses',
rows:['<tr class="heading"><td colspan="3">Administration Expenses</td></tr>','<tr class="indent"><td class="lbl">Administration expenses <span class="wtag">TB</span></td><td class="amt">57,900</td><td class="amt">(104,612)</td></tr>','<tr class="subtotal"><td class="lbl">Operating Profit (Pre-income)</td><td></td><td class="amt">518,902</td></tr>'],
source:'<strong>Administration expenses €57,900</strong> taken directly from TB. Total Expenses = 1,500 + 45,000 + 212 + 57,900 = <strong>€104,612</strong>.',
reason:'Administration expenses are the general running costs of the office (not the factory). The factory costs are in the Manufacturing Account, and the selling costs are in S&D — what\'s left is pure admin.',
watch:'<strong>Don\'t put any factory costs in admin.</strong> Factory overheads belong in the Mfg A/c. General admin is only office expenses, secretarial, legal fees, office supplies, etc.'},
{title:'Operating Income',
rows:['<tr class="heading"><td colspan="3">Add Operating Income</td></tr>','<tr class="indent"><td class="lbl">Rent received <span class="wtag">TB</span></td><td class="amt">15,700</td><td></td></tr>','<tr class="indent"><td class="lbl">Discount received <span class="wtag">TB</span></td><td class="amt">5,350</td><td class="amt">21,050</td></tr>','<tr class="subtotal"><td class="lbl">Operating Profit</td><td></td><td class="amt">539,952</td></tr>'],
source:'<strong>Rent received €15,700</strong> from TB (credit side). <strong>Discount received €5,350</strong> from TB (credit side — net figure).',
reason:'Operating income is non-trading income that\'s still part of normal operations — rental income from spare premises, discount received from suppliers. Added to get Operating Profit = 518,902 + 21,050 = <strong>€539,952</strong>.',
watch:'<strong>Discount side check:</strong> Discount (net) was on the CREDIT side of the TB = discount received (income). If it had been on the debit side, it would be discount allowed (an expense → S&D). Always check which side.'},
{title:'Investment Income, Debenture Interest & Net Profit',
rows:['<tr class="indent"><td class="lbl">Investment income <span class="wtag">W12</span></td><td></td><td class="amt">7,500</td></tr>','<tr class="indent"><td class="lbl">Less Debenture interest <span class="wtag">W13</span></td><td></td><td class="amt">(23,000)</td></tr>','<tr class="total"><td class="lbl">Net Profit</td><td></td><td class="amt">524,452</td></tr>'],
source:'<strong>Investment income €7,500</strong> (W12) = €250,000 × 4% × 9/12. <strong>Debenture interest €23,000</strong> (W13) = 3 months at €250,000 × 8% + 9 months at €300,000 × 8%.',
reason:'Investment income and debenture interest are non-operating items — they relate to financing, not operations. They appear AFTER Operating Profit. Net Profit = 539,952 + 7,500 − 23,000 = <strong>€524,452</strong>.',
tip:'<strong>Debenture issued mid-year:</strong> €50,000 issued on 01/04/2021. First 3 months only €250,000 outstanding, then €300,000 for the last 9 months. Calculate interest for each period separately.'},
{title:'Retained Profit & P&L Balance',
rows:['<tr class="indent"><td class="lbl">Less Dividends paid <span class="wtag">TB</span></td><td></td><td class="amt">(27,500)</td></tr>','<tr class="subtotal"><td class="lbl">Retained Profit</td><td></td><td class="amt">496,952</td></tr>','<tr class="indent"><td class="lbl">+ P&L balance 01/01/2021 <span class="wtag">TB</span></td><td></td><td class="amt">69,500</td></tr>','<tr class="total"><td class="lbl">P&L balance 31/12/2021</td><td></td><td class="amt">566,452</td></tr>'],
source:'<strong>Dividends paid €27,500</strong> from TB. <strong>Opening P&L balance €69,500</strong> from TB.',
reason:'This is the key difference from a sole trader: a company has a P&L account that carries forward. Retained Profit = Net Profit − Dividends = 524,452 − 27,500 = €496,952. Closing P&L Balance = 496,952 + 69,500 = <strong>€566,452</strong>. This figure goes into the Balance Sheet capital section.',
watch:'<strong>Dividends are NOT an expense.</strong> They\'re a distribution of profit to shareholders, deducted AFTER Net Profit (not above it). Never put dividends in the P&L expenses section.'}
];

const MFG_BS_STEPS: BuilderStep[] = [
{title:'Tangible Fixed Assets — Header',
rows:['<tr class="heading"><td colspan="4">Balance Sheet of McGuigan Ltd as at 31/12/2021</td></tr>','<tr class="heading"><td colspan="4">Tangible Fixed Assets</td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>'],
source:'The balance sheet has the same three-column structure as any other: Cost, Accumulated Depreciation, NBV.',
reason:'In a manufacturing company, the fixed assets are typically Factory Buildings and Plant & Machinery — both of which will have been depreciated.',
tip:'Show the cost and accumulated depreciation columns clearly. The marking scheme awards marks for the cost and acc dep figures separately, not just for the NBV.'},
{title:'Factory Buildings',
rows:['<tr class="indent"><td class="lbl">Factory Buildings <span class="wtag">W14, W15</span></td><td class="amt">1,012,300</td><td class="amt">45,246</td><td class="amt">967,054</td></tr>'],
source:'<strong>Cost €1,012,300</strong> (W14) = TB €890,000 + €122,300 (Note 7: store built by own employees, materials €62,000 + labour €60,300 including accrual). <strong>Accum Depn €45,246</strong> (W15) = TB €25,000 + €20,246 (current year at 2% × €1,012,300).',
reason:'The store added in Note 7 becomes a capital addition to buildings, so the cost rises by €122,300. Depreciation is charged on the NEW cost figure, not the old.',
watch:'<strong>Opening accum depn on buildings = €25,000.</strong> Cost €890,000 − NBV €865,000 = €25,000. This gets added to the current year depn of €20,246 = €45,246.'},
{title:'Plant & Machinery',
rows:['<tr class="indent"><td class="lbl">Plant &amp; Machinery <span class="wtag">W16, W17</span></td><td class="amt">310,000</td><td class="amt">77,000</td><td class="amt">233,000</td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>1,322,300</strong></td><td class="amt"><strong>122,246</strong></td><td class="amt"><strong>1,200,054</strong></td></tr>'],
source:'<strong>Cost €310,000</strong> (W16) = TB €340,000 − €30,000 (old machine disposed). <strong>Accum Depn €77,000</strong> (W17) = TB €50,000 + €47,625 (current year) − €20,625 (accum depn on disposed machine).',
reason:'When a fixed asset is disposed of, BOTH its cost AND its accumulated depreciation must be removed from the respective balances. The disposed machine contributes €20,625 of accumulated depreciation that\'s no longer on the books.',
tip:'Total Tangible Fixed Assets = Cost 1,322,300 | Acc Dep 122,246 | NBV <strong>1,200,054</strong>. Only the NBV carries forward to the running total.'},
{title:'Financial Assets — Investments',
rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">4% Investments <span class="wtag">TB</span></td><td></td><td></td><td class="amt">250,000</td></tr>'],
source:'<strong>€250,000</strong> from TB, unchanged. Investments are shown at cost.',
reason:'Financial assets are long-term investments. They sit between tangible fixed assets and current assets on the balance sheet.',
tip:'Running total so far: 1,200,054 + 250,000 = €1,450,054 total fixed + financial assets.'},
{title:'Current Assets — Three Stocks',
rows:['<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Closing stock — Raw Materials</td><td class="amt">28,300</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Closing stock — Work in Progress</td><td class="amt">27,600</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Closing stock — Finished Goods <span class="wtag">W9</span></td><td class="amt">49,000</td><td class="amt">104,900</td><td></td></tr>'],
source:'<strong>Raw Materials €28,300</strong>, <strong>Work in Progress €27,600</strong>, <strong>Finished Goods €49,000</strong> (€58,000 − €9,000 undispatched). Total stock = €104,900.',
reason:'This is the key visual difference from a sole trader balance sheet: three separate stock lines in current assets. The sum of all three is the total stock figure.',
watch:'<strong>All three must be shown separately.</strong> Combining them into one line loses marks in the marking scheme. And use W9 for Finished Goods — the closing stock after the undispatched goods adjustment.'},
{title:'Current Assets — Debtors',
rows:['<tr class="indent"><td class="lbl">Debtors <span class="wtag">W18</span></td><td class="amt">81,550</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">− Bad debts provision <span class="wtag">W11</span></td><td class="amt">(3,262)</td><td class="amt">78,288</td><td></td></tr>'],
source:'<strong>Debtors €81,550</strong> (W18) = TB €76,350 + €10,800 (N2 sale not dispatched) − €5,000 (N8 bankrupt debtor) − €600 (N8 cheque error). <strong>BDP €3,262</strong> = €81,550 × 4%.',
reason:'Debtors is adjusted for four things in total across two notes: the €10,800 invoice recognition (adds), the €5,000 bankrupt debtor write-off (deducts), and the €600 cheque recording error (deducts). Then the new 4% provision is calculated on the adjusted figure.',
watch:'<strong>Provision is based on ADJUSTED debtors (€81,550), not TB debtors.</strong> Miss this and the provision is wrong. €81,550 × 4% = €3,262.'},
{title:'Current Assets — Investment Income Due',
rows:['<tr class="indent"><td class="lbl">Investment income due <span class="wtag">W19</span></td><td></td><td class="amt">4,700</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">187,888</td><td></td></tr>'],
source:'<strong>Investment income due €4,700</strong> (W19) = Total due €7,500 − received €2,800.',
reason:'6 months of investment interest is owed at year-end (9 months earned, only 3 months received in cash). This sits in current assets until received. Total current assets = 104,900 + 78,288 + 4,700 = <strong>€187,888</strong>.',
tip:'Investments were acquired 01/04/2021, so the company has owned them for 9 months (Apr–Dec). 9 months of interest is earned, but only 3 months (typical quarterly) has been received.'},
{title:'Current Liabilities',
rows:['<tr class="heading"><td colspan="4">Less Creditors: amounts falling due within 1 year</td></tr>','<tr class="indent"><td class="lbl">Bank <span class="wtag">W20</span></td><td class="amt">80,900</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Creditors <span class="wtag">W21</span></td><td class="amt">60,000</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">PAYE</td><td class="amt">1,850</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Wages due</td><td class="amt">740</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Debenture interest due <span class="wtag">W22</span></td><td class="amt">18,000</td><td class="amt">(161,490)</td><td class="amt">26,398</td></tr>'],
source:'<strong>Bank €80,900</strong> (W20) — overdraft after reconciliation. <strong>Creditors €60,000</strong> (W21) = TB €61,400 − €1,400 (discount received suspense). <strong>PAYE €1,850</strong> from TB. <strong>Wages due €740</strong> from Note 6. <strong>Debenture interest due €18,000</strong> (W22) = €23,000 − €5,000 paid.',
reason:'Five current liabilities. Working Capital = Current Assets − Current Liabilities = 187,888 − 161,490 = <strong>€26,398</strong>.',
watch:'<strong>Bank is in current liabilities because it\'s an OVERDRAFT.</strong> The TB has it on the credit side, and after reconciliation it\'s still an overdraft (€80,900). Don\'t confuse the bank position.'},
{title:'Financed By — Debentures',
rows:['<tr class="subtotal"><td class="lbl"></td><td></td><td></td><td class="amt">1,476,452</td></tr>','<tr class="heading"><td colspan="4">Financed By</td></tr>','<tr class="indent"><td class="lbl">8% Debentures <span class="wtag">TB</span></td><td></td><td></td><td class="amt">300,000</td></tr>'],
source:'<strong>Debentures €300,000</strong> from TB. Total Net Assets so far = 1,200,054 + 250,000 + 26,398 = <strong>€1,476,452</strong>.',
reason:'Debentures are long-term loans (over 1 year). They appear in the "Financed By" section alongside share capital and reserves, not in current liabilities.',
tip:'The debenture interest DUE (€18,000) goes in current liabilities because it\'s owed now. The debenture principal (€300,000) is the long-term financing.'},
{title:'Share Capital',
rows:['<tr class="heading"><td colspan="4">Share Capital</td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Authorised</strong></td><td class="amt"><strong>Issued</strong></td><td></td></tr>','<tr class="indent"><td class="lbl">Ordinary shares €1 each <span class="wtag">TB</span></td><td class="amt">1,500,000</td><td class="amt">460,000</td><td></td></tr>','<tr class="indent"><td class="lbl">4% Preference shares €1 each <span class="wtag">TB</span></td><td class="amt">500,000</td><td class="amt">150,000</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>2,000,000</strong></td><td class="amt"><strong>610,000</strong></td><td></td></tr>'],
source:'Authorised: 1,500,000 ordinary + 500,000 preference = €2,000,000 (from the question intro). Issued: €460,000 ordinary + €150,000 preference = €610,000 (from TB).',
reason:'Share capital has two figures: Authorised (the maximum the company CAN issue, for disclosure) and Issued (the actual amount currently issued). Only the Issued figure carries forward to Capital Employed.',
watch:'<strong>Don\'t use the authorised figure for Capital Employed.</strong> Only the issued share capital (€610,000) counts. The authorised figure is disclosure only — it shows the room the company has to issue more shares.'},
{title:'Revenue Reserve & Capital Employed',
rows:['<tr class="indent"><td class="lbl">Revenue Reserve / P&L Balance 31/12/2021</td><td></td><td class="amt">566,452</td><td class="amt">1,176,452</td></tr>','<tr class="total"><td class="lbl">Capital Employed</td><td></td><td></td><td class="amt">1,476,452</td></tr>'],
source:'<strong>P&L balance €566,452</strong> pulled directly from the TPL (after retained profit + opening P&L balance). Capital Employed = Debentures €300,000 + Issued SC €610,000 + P&L balance €566,452 = <strong>€1,476,452</strong>.',
reason:'The P&L balance (also called Revenue Reserve) represents the accumulated profits not yet paid as dividends. It\'s owned by the shareholders, so it sits in the "Financed By" section with share capital.',
watch:'<strong>FINAL CHECK:</strong> Capital Employed €1,476,452 = Total Net Assets €1,476,452 ✓. If these don\'t match, something is wrong — commonly the BDP on adjusted debtors, the store capitalisation, or the bank reconciliation.'},
{title:'Final Verification',
rows:[],
source:'<strong>Total Net Assets = €1,476,452</strong> = <strong>Capital Employed = €1,476,452</strong> ✓',
reason:'All 22 workings are now placed. Cost of Manufacture: €1,047,886. Net Profit: €524,452. Retained Profit: €496,952. P&L balance 31/12/2021: €566,452.',
tip:'<strong>If your two totals don\'t match</strong>, the most common causes for Manufacturing questions are: (1) forgot to capitalise the store (Note 7), (2) double-counted the sale of scrap, (3) wrong BDP based on TB debtors instead of adjusted, (4) bank reconciliation gone wrong, (5) debenture interest calculated on wrong balance.'}
];


// ═══════════════════════════════════════════════════
// EXPORT ALL WALKTHROUGHS
// ═══════════════════════════════════════════════════

export const WALKTHROUGHS: Walkthrough[] = [
  {
    id: 'st-2023',
    title: '2023 Sole Trader — Jim Beechinor (Mock Paper)',
    subtitle: 'Mock Paper · 11 notes, 19 workings, 120 marks',
    type: 'sole-trader',
    year: '2023',
    tplTabLabel: 'Trading P&L',
    introHtml: ST_INTRO,
    notes: ST_NOTES,
    tplSteps: ST_TPL_STEPS,
    bsSteps: ST_BS_STEPS,
    tplMarks: '70 marks',
    bsMarks: '50 marks',
    tplComplete: 'TPL Complete ✓ — Net Profit: €171,220',
    bsComplete: 'BS Complete ✓ — Capital Employed = €862,635'
  },
  {
    id: 'co-2024',
    title: '2024 Company — Yeats Ltd',
    subtitle: '9 notes, 22 workings, 120 marks',
    type: 'company',
    year: '2024',
    tplTabLabel: 'Trading P&L',
    introHtml: CO_INTRO,
    notes: CO_NOTES_STEPS,
    tplSteps: CO_TPL_STEPS_NEW,
    bsSteps: CO_BS_STEPS_NEW,
    tplMarks: '75 marks',
    bsMarks: '45 marks',
    tplComplete: 'TPL Complete ✓ — Net Profit: €108,292 · Closing P&L: €108,092',
    bsComplete: 'BS Complete ✓ — Capital Employed = €961,922'
  },
  {
    id: 'mfg-2022',
    title: '2022 Manufacturing — McGuigan Ltd',
    subtitle: '9 notes, 22 workings, 120 marks',
    type: 'manufacturing',
    year: '2022',
    tplTabLabel: 'Mfg + TPL',
    introHtml: MFG_INTRO,
    notes: MFG_NOTES_STEPS,
    tplSteps: MFG_TPL_STEPS_NEW,
    bsSteps: MFG_BS_STEPS_NEW,
    tplMarks: '75 marks',
    bsMarks: '45 marks',
    tplComplete: 'Complete ✓ — Cost of Manufacture: €1,047,886 · Net Profit: €524,452',
    bsComplete: 'BS Complete ✓ — Capital Employed = €1,476,452'
  }
];
