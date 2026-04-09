// ═══════════════════════════════════════════════════
// Q1 WALKTHROUGH DATA — 3 walkthroughs
// Sole Trader (2023), Company (2024), Manufacturing (2022)
// ═══════════════════════════════════════════════════

import type { TAccountDef } from "@/components/TAccount";

export interface WalkthroughNote {
  num: number;
  marks: number;
  title: string;
  noteText: string;
  tbLook: string;
  task: string;
  workings: WalkthroughWorking[];
  destinations: WalkthroughDestination[];
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
{num:1,marks:6,title:"Stock & Sale or Return",
noteText:'Stock at 31/12/2022 at cost was <strong>€32,300</strong>. Included in this figure are goods <strong>purchased</strong> on a \'sale or return\' basis. These goods had been recorded as a credit purchase with a recommended retail price of <strong>€4,200</strong>, which is cost plus 20%.',
tbLook:'<p>Look at the trial balance:</p><table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Stock 01/01/2022</td><td>20,800</td><td></td></tr><tr><td>Purchases</td><td>412,500</td><td></td></tr><tr><td>Debtors and creditors</td><td>49,250</td><td>33,560</td></tr></table><p><strong>Important:</strong> The TB shows OPENING stock (€20,800). Closing stock is in the notes.</p>',
task:'<ol><li>Reverse the sale-or-return purchase: reduce purchases AND creditors by COST</li><li>Remove from closing stock at COST</li></ol><p>Cost = retail ÷ 1.20 (because retail is cost plus 20%)</p>',
workings:[
  {type:'calc',title:'W1: Cost of sale-or-return goods',content:'<div class="wt-calc-block"><div class="wt-calc-line">Retail price = <strong>€4,200</strong></div><div class="wt-calc-line">Mark-up = 20% (cost + 20%)</div><div class="wt-calc-line">Cost = €4,200 ÷ 1.20</div><div class="wt-calc-line wt-calc-result">Cost = <span class="wt-rv">€3,500</span></div></div>'},
  {type:'calc',title:'W2: Adjusted closing stock',content:'<div class="wt-calc-block"><div class="wt-calc-line">Stock as given = <strong>€32,300</strong></div><div class="wt-calc-line">Less: sale-or-return goods (cost) = (€3,500)</div><div class="wt-calc-line">Add: goods in transit (Note ix) = €5,200</div><div class="wt-calc-line wt-calc-result">Adjusted closing stock = <span class="wt-rv">€34,000</span></div></div>'}
],
destinations:[
  {name:"Purchases (W1)",arrow:"−",amt:"€3,500",where:"Subtract from Purchases in W3"},
  {name:"Creditors (W1)",arrow:"−",amt:"€3,500",where:"Subtract from Creditors in W17"},
  {name:"Closing Stock (W2)",arrow:"→",amt:"€34,000",where:"Trading Account AND Balance Sheet Current Assets"}
],
tip:'<strong>The cost vs retail trap:</strong> The question gives RETAIL price (€4,200). Convert to cost (€3,500) before reducing purchases.',
watchOut:'<strong>Why reverse?</strong> Goods on "sale or return" haven\'t been bought — the supplier still owns them until accepted.'},

{num:2,marks:14,title:"Depreciation on Vans + Asset Disposal",
noteText:'Provide for depreciation on delivery vans at <strong>20% of cost</strong> from date of purchase to date of sale.<br>On 30/06/2022 a van which cost <strong>€30,000 on 31/07/2018</strong> was traded in against a new van costing <strong>€37,000</strong>. An allowance of <strong>€14,000</strong> was made. The bank transfer for the net amount was incorrectly treated as a purchase of trading stock.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Delivery vans (cost €135,000)</td><td>55,000</td></tr></table><p>NBV = €55,000. Cost = €135,000. Accumulated depreciation = €80,000.</p>',
task:'<ol><li>Calculate depreciation on OLD van for 6 months (Jan–Jun)</li><li>Calculate NBV at disposal date</li><li>Find profit/loss on disposal</li><li>Correct the wrongly-recorded bank entry (reduce purchases by €23,000)</li><li>Calculate depreciation on NEW van for 6 months (Jul–Dec)</li><li>Depreciation on remaining vans for full year</li></ol>',
workings:[
  {type:'calc',title:'W3: Net cash paid for the new van',content:'<div class="wt-calc-block"><div class="wt-calc-line">Cost of new van = <strong>€37,000</strong></div><div class="wt-calc-line">Less: trade-in allowance = (€14,000)</div><div class="wt-calc-line wt-calc-result">Cash paid = <span class="wt-rv">€23,000</span></div></div><div class="wt-tip-box" style="margin-top:10px"><strong>Why:</strong> €23,000 was wrongly recorded as a purchase. Reduce purchases by €23,000.</div>'},
  {type:'t-account',title:'W10: Disposal of Old Van',account:{name:'Disposal of Van Account',debits:[{desc:'Cost of old van',amt:'30,000',rv:false},{desc:'Profit on disposal (→ P&L)',amt:'7,500',rv:true}],credits:[{desc:'Accum. depreciation (47 months)',amt:'23,500',rv:true},{desc:'Trade-in allowance',amt:'14,000',rv:false}],debitTotal:'37,500',creditTotal:'37,500'},below:'<div class="wt-calc-block" style="margin-top:14px"><strong>Accumulated dep on old van:</strong><div class="wt-calc-line">31/07/2018 to 30/06/2022 = 47 months</div><div class="wt-calc-line">€30,000 × 20% × 47/12 = <span class="wt-rv">€23,500</span></div><div class="wt-calc-line">NBV = €30,000 − €23,500 = <span class="wt-rv">€6,500</span></div><div class="wt-calc-line">Profit = €14,000 − €6,500 = <span class="wt-rv">€7,500</span></div></div>'},
  {type:'t-account',title:'W9: Depreciation on Vans (current year)',account:{name:'Depreciation Expense — Vans',debits:[{desc:'Old van (6 months)',amt:'3,000',rv:true},{desc:'Other vans (full year)',amt:'21,000',rv:true},{desc:'New van (6 months)',amt:'3,700',rv:true}],credits:[{desc:'To P&L S&D',amt:'27,700',rv:true}],debitTotal:'27,700',creditTotal:'27,700'},below:'<div class="wt-calc-block"><div class="wt-calc-line">Old: €30,000 × 20% × 6/12 = <span class="wt-rv">€3,000</span></div><div class="wt-calc-line">Others: €105,000 × 20% = <span class="wt-rv">€21,000</span></div><div class="wt-calc-line">New: €37,000 × 20% × 6/12 = <span class="wt-rv">€3,700</span></div><div class="wt-calc-line wt-calc-result">Total = <span class="wt-rv">€27,700</span></div></div>'}
],
destinations:[
  {name:"Profit on disposal (W10)",arrow:"→",amt:"€7,500",where:"P&L Other Income"},
  {name:"Depreciation on vans (W9)",arrow:"→",amt:"€27,700",where:"P&L Selling & Distribution"},
  {name:"Purchases (W3)",arrow:"−",amt:"€23,000",where:"Subtract from Purchases"},
  {name:"Vans cost (W13)",arrow:"→",amt:"€142,000",where:"BS — 135,000 + 37,000 − 30,000"},
  {name:"Accum depn vans (W13)",arrow:"→",amt:"€84,200",where:"BS — 80,000 + 27,700 − 23,500"}
],
tAccountDefs:[
  {title:'Disposal of Van Account',entries:[
    {side:'dr',label:'Cost of old van',amount:'30,000',step:0,order:0},
    {side:'cr',label:'Accum. depreciation',amount:'23,500',step:0,order:1},
    {side:'cr',label:'Trade-in allowance',amount:'14,000',step:0,order:2},
    {side:'dr',label:'Profit on disposal',amount:'7,500',step:0,order:3,cls:'profit'},
    {side:'dr',label:'Total',amount:'37,500',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'37,500',step:0,order:4,cls:'total'},
  ]},
  {title:'Depreciation — Vans',entries:[
    {side:'dr',label:'Old van (6 mths)',amount:'3,000',step:0,order:0},
    {side:'dr',label:'Other vans (12 mths)',amount:'21,000',step:0,order:1},
    {side:'dr',label:'New van (6 mths)',amount:'3,700',step:0,order:2},
    {side:'cr',label:'To P&L S&D',amount:'27,700',step:0,order:3,cls:'total'},
    {side:'dr',label:'Total',amount:'27,700',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'27,700',step:0,order:4,cls:'total'},
  ]}
],
tip:'<strong>The depreciation logic:</strong> OLD van = 6 months before sale. NEW van = 6 months after purchase. Remaining vans = full year.',
watchOut:'<strong>The €23,000 was wrongly entered as a purchase.</strong> You must reduce purchases by €23,000.'},

{num:3,marks:8,title:"Suspense Account",
noteText:'The suspense figure arises from posting an incorrect figure for mortgage interest (correct figure was entered in bank) and discount allowed <strong>€110</strong> entered only in the discount account.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Discount (net)</td><td></td><td>450</td></tr><tr><td>Salaries & gen expenses (incl. suspense)</td><td>67,320</td><td></td></tr></table><p>The suspense is HIDDEN inside Salaries & general expenses.</p>',
task:'<ol><li>Discount allowed €110 — one-sided entry → Suspense Dr €110</li><li>Mortgage interest wrong figure — understated by €110 → Suspense Cr €110</li></ol><p>Net suspense = zero.</p>',
workings:[{type:'calc',title:'Suspense resolution',content:'<div class="wt-calc-block"><div class="wt-calc-line">Error 1: Discount allowed €110 one-sided → Dr Suspense €110</div><div class="wt-calc-line">Error 2: Mortgage interest understated €110 → Cr Suspense €110</div><div class="wt-calc-line wt-calc-result">Net Suspense = <span class="wt-rv">Zero ✓</span></div></div>'}],
tAccountDefs:[
  {title:'Suspense Account',entries:[
    {side:'dr',label:'Discount allowed (one-sided)',amount:'110',step:0,order:0},
    {side:'cr',label:'Mortgage interest (correction)',amount:'110',step:0,order:1},
    {side:'dr',label:'Balance: NIL ✓',amount:'—',step:0,order:2,cls:'balance'},
  ]}
],
destinations:[
  {name:"Debtors",arrow:"−",amt:"€110",where:"Reduce Debtors (discount allowed)"},
  {name:"Mortgage interest",arrow:"+",amt:"€110",where:"Increase mortgage interest → W11"}
],
tip:'Suspense nets to zero here — unusual but the principle is the same.'},

{num:4,marks:6,title:"Investment Income + Patents",
noteText:'Patents (incorporating <strong>3 months investment income</strong>) are being written off over a <strong>10-year period which commenced in 2020</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>4% Investments acquired 01/04/2022</td><td>100,000</td></tr><tr><td>Patents (incorporating 3 months inv. income)</td><td>62,500</td></tr></table><p>Investments owned for 9 months (Apr–Dec). 3 months interest received and wrongly credited to patents.</p>',
task:'<ol><li>Calculate 9 months investment income</li><li>Clean up patents: add back wrongly credited income</li><li>Calculate annual write-off</li></ol>',
workings:[
  {type:'calc',title:'W4: Investment Income',content:'<div class="wt-calc-block"><div class="wt-calc-line">€100,000 × 4% × 9/12 = <span class="wt-rv">€3,000</span></div><div class="wt-calc-line">Investment income due: €3,000 − €1,000 = <span class="wt-rv">€2,000</span></div></div>'},
  {type:'calc',title:'W8: Patent Write-off',content:'<div class="wt-calc-block"><div class="wt-calc-line">TB patents = €62,500 + €1,000 (add back) = €63,500</div><div class="wt-calc-line">Annual write-off = €63,500 ÷ 10 = <span class="wt-rv">€6,350</span></div><div class="wt-calc-line">BS value = €63,500 − €6,350 = <span class="wt-rv">€57,150</span></div></div>'}
],
destinations:[
  {name:"Investment income",arrow:"→",amt:"€3,000",where:"P&L Other Income"},
  {name:"Investment income due",arrow:"→",amt:"€2,000",where:"BS Current Assets"},
  {name:"Patent write-off",arrow:"→",amt:"€6,350",where:"P&L Administration"},
  {name:"Patents (BS)",arrow:"→",amt:"€57,150",where:"BS Intangible Fixed Assets"}
],
tip:'Always clean up the patents figure first — add back the wrongly credited investment income.'},

{num:5,marks:6,title:"VAT on Warehouse Purchase",
noteText:'A warehouse was purchased for <strong>€117,000</strong> including VAT. The VAT had been entered in the buildings account. No entry was made in the VAT account.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Buildings at cost</td><td>650,000</td><td></td></tr><tr><td>VAT</td><td></td><td>3,840</td></tr></table><p>Buildings cost includes warehouse at GROSS (€117,000). Strip out VAT.</p>',
task:'<ol><li>Strip VAT out of buildings</li><li>Adjust VAT balance: input VAT reclaim</li></ol>',
workings:[{type:'calc',title:'W16: VAT reclaim',content:'<div class="wt-calc-block"><div class="wt-calc-line">VAT portion = <span class="wt-rv">€8,775</span></div><div class="wt-calc-line">Net cost = €117,000 − €8,775 = <span class="wt-rv">€108,225</span></div><div class="wt-calc-line">VAT a/c: €3,840 Cr − €8,775 = <span class="wt-rv">€4,935 Dr (asset)</span></div></div>'}],
destinations:[
  {name:"Buildings cost",arrow:"−",amt:"€8,775",where:"Reduce buildings cost"},
  {name:"VAT",arrow:"→",amt:"€4,935",where:"BS Current Assets (flipped from liability)"}
],
tip:'VAT on capital purchases is reclaimable. The VAT flips from liability to asset.',
watchOut:'The VAT was a €3,840 liability; after the €8,775 reclaim it becomes a €4,935 asset.'},

{num:6,marks:8,title:"Buildings Depreciation + Revaluation",
noteText:'Buildings are to be depreciated at <strong>2% of cost per annum</strong>. Buildings were revalued at <strong>€650,000 on 01/01/2022</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Buildings at cost</td><td>650,000</td></tr></table><p>€650,000 is the REVALUED figure. No accumulated depreciation (revaluation wipes it).</p>',
task:'<p>Depreciation = €650,000 × 2% = €13,000</p>',
workings:[
  {type:'calc',title:'W5: Buildings Depreciation',content:'<div class="wt-calc-block"><div class="wt-calc-line">Buildings (revalued) = €650,000</div><div class="wt-calc-line">Depreciation = €650,000 × 2% = <span class="wt-rv">€13,000</span></div></div>'},
  {type:'calc',title:'W18: Revaluation Reserve',content:'<div class="wt-calc-block"><div class="wt-calc-line">Revaluation reserve = <span class="wt-rv">€237,575</span></div></div>'}
],
destinations:[
  {name:"Depreciation on buildings",arrow:"→",amt:"€13,000",where:"P&L Administration"},
  {name:"Revaluation reserve",arrow:"→",amt:"€237,575",where:"BS Capital section"}
],
tip:'Depreciation is on the REVALUED amount. Old cost and accumulated depreciation are replaced.'},

{num:7,marks:6,title:"Mortgage Interest",
noteText:'Mortgage interest has not been fully paid. The <strong>6% fixed mortgage</strong> was increased by <strong>€50,000 on 01/10/2022</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Mortgage interest</td><td>3,290</td><td></td></tr><tr><td>6% Fixed mortgage</td><td></td><td>220,000</td></tr></table><p>Mortgage was €170,000 for 9 months, then €220,000 for 3 months.</p>',
task:'<p>Calculate full year interest in two tiers.</p>',
workings:[{type:'calc',title:'W11: Mortgage Interest',content:'<div class="wt-calc-block"><div class="wt-calc-line">9 months × €170,000 × 6% × 9/12 = <span class="wt-rv">€7,650</span></div><div class="wt-calc-line">3 months × €220,000 × 6% × 3/12 = <span class="wt-rv">€3,300</span></div><div class="wt-calc-line wt-calc-result">Total = <span class="wt-rv">€10,950</span></div><div class="wt-calc-line">Due: €10,950 − €3,400 = <span class="wt-rv">€7,550</span></div></div>'}],
tAccountDefs:[
  {title:'Mortgage Interest Account',entries:[
    {side:'dr',label:'Cash paid (per bank)',amount:'3,400',step:0,order:0},
    {side:'dr',label:'Accrual (interest due)',amount:'7,550',step:0,order:1},
    {side:'cr',label:'To P&L Financial Expenses',amount:'10,950',step:0,order:2,cls:'total'},
    {side:'dr',label:'Total',amount:'10,950',step:0,order:3,cls:'total'},
    {side:'cr',label:'Total',amount:'10,950',step:0,order:3,cls:'total'},
  ]}
],
destinations:[
  {name:"Mortgage interest",arrow:"→",amt:"€10,950",where:"P&L Financial Expenses"},
  {name:"Mortgage interest due",arrow:"→",amt:"€7,550",where:"BS Current Liabilities"}
],
tip:'Two-tier calculation: calculate interest for each period separately.',
watchOut:'TB figure €3,290 is NOT the full year — it\'s the wrongly posted amount.'},

{num:8,marks:4,title:"Goods Taken for Own Use",
noteText:'Goods taken by the owner at recommended retail price of <strong>€8,100</strong> (cost plus 20%) have not been recorded.',
tbLook:'<p>Nothing in the TB — never recorded.</p>',
task:'<ol><li>Reduce purchases at COST</li><li>Increase drawings at COST</li></ol>',
workings:[{type:'calc',title:'W19: Drawings in Kind',content:'<div class="wt-calc-block"><div class="wt-calc-line">Retail = €8,100 ÷ 1.20 = <span class="wt-rv">€6,750 (cost)</span></div><div class="wt-calc-line">New drawings = €25,340 + €6,750 = <span class="wt-rv">€32,090</span></div></div>'}],
destinations:[
  {name:"Purchases",arrow:"−",amt:"€6,750",where:"Subtract from Purchases"},
  {name:"Drawings",arrow:"+",amt:"€6,750",where:"Add to Drawings in BS Capital"}
],
tip:'Always use COST, not retail. The business never made profit on these goods.'},

{num:9,marks:4,title:"Goods in Transit",
noteText:'No record made for goods in transit. Invoice received showing retail selling price <strong>€6,500</strong> (cost plus 25%).',
tbLook:'<p>Goods bought but not physically received yet.</p>',
task:'<ol><li>Add to purchases at COST</li><li>Add to creditors at COST</li><li>Add to closing stock at COST</li></ol>',
workings:[{type:'calc',title:'Cost of goods in transit',content:'<div class="wt-calc-block"><div class="wt-calc-line">€6,500 ÷ 1.25 = <span class="wt-rv">€5,200 (cost)</span></div></div>'}],
destinations:[
  {name:"Purchases",arrow:"+",amt:"€5,200",where:"Add to Purchases"},
  {name:"Creditors",arrow:"+",amt:"€5,200",where:"Add to Creditors"},
  {name:"Closing stock",arrow:"+",amt:"€5,200",where:"Add to Closing Stock (already in W2)"}
],
tip:'Cost plus 25% means retail = cost × 1.25.',
watchOut:'Three places, same figure — miss one and your books won\'t balance.'},

{num:10,marks:4,title:"Stock Destroyed by Fire",
noteText:'Stock costing <strong>€3,000</strong> was destroyed by fire. Insurance company agreed to pay <strong>€2,500</strong>.',
tbLook:'<p>Nothing in the TB — year-end adjustment.</p>',
task:'<ol><li>Loss = €3,000 − €2,500 = €500 → P&L</li><li>Insurance compensation due (€2,500) → BS Current Assets</li></ol>',
workings:[{type:'calc',title:'W7: Loss on Damaged Stock',content:'<div class="wt-calc-block"><div class="wt-calc-line">Cost destroyed = €3,000</div><div class="wt-calc-line">Insurance = €2,500</div><div class="wt-calc-line wt-calc-result">Net loss = <span class="wt-rv">€500</span></div></div>'}],
destinations:[
  {name:"Loss on damaged stock",arrow:"→",amt:"€500",where:"P&L Operating Expenses"},
  {name:"Insurance compensation due",arrow:"→",amt:"€2,500",where:"BS Current Assets"}
],
tip:'Insurance amount is a RECEIVABLE — agreed but not yet paid.'},

{num:11,marks:11,title:"Office Equipment to Creditor + Depreciation",
noteText:'A supplier owed <strong>€4,600</strong> accepted office equipment (book value <strong>€4,300</strong>, cost <strong>€6,000</strong>) in full settlement. Depreciation on remaining equipment at <strong>10% of cost</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Office equipment (cost €17,500)</td><td>8,500</td></tr></table><p>Cost = €17,500. NBV = €8,500. Accum dep = €9,000.</p>',
task:'<ol><li>Disposal: profit = €4,600 − €4,300 = €300</li><li>Depreciation on remaining: (€17,500 − €6,000) × 10% = €1,150</li></ol>',
workings:[
  {type:'t-account',title:'Office Equipment Disposal',account:{name:'Disposal — Office Equipment',debits:[{desc:'Cost of equipment',amt:'6,000',rv:false},{desc:'Profit on disposal',amt:'300',rv:true}],credits:[{desc:'Accumulated depreciation',amt:'1,700',rv:true},{desc:'Creditor settlement',amt:'4,600',rv:false}],debitTotal:'6,300',creditTotal:'6,300'}},
  {type:'calc',title:'W6: Depreciation on Office Equipment',content:'<div class="wt-calc-block"><div class="wt-calc-line">Cost remaining = €11,500 × 10% = <span class="wt-rv">€1,150</span></div></div>'}
],
tAccountDefs:[
  {title:'Disposal — Office Equipment',entries:[
    {side:'dr',label:'Cost of equipment given',amount:'6,000',step:0,order:0},
    {side:'cr',label:'Accumulated depreciation',amount:'1,700',step:0,order:1},
    {side:'cr',label:'Creditor settlement',amount:'4,600',step:0,order:2},
    {side:'dr',label:'Profit on disposal',amount:'300',step:0,order:3,cls:'profit'},
    {side:'dr',label:'Total',amount:'6,300',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'6,300',step:0,order:4,cls:'total'},
  ]}
],
destinations:[
  {name:"Profit on disposal",arrow:"→",amt:"€300",where:"P&L Other Income"},
  {name:"Depreciation",arrow:"→",amt:"€1,150",where:"P&L Admin Expenses"},
  {name:"Equipment cost (W14)",arrow:"→",amt:"€11,500",where:"Balance Sheet"},
  {name:"Creditors",arrow:"−",amt:"€4,600",where:"Subtract from Creditors"}
],
tip:'When a supplier takes equipment instead of cash: asset disposal AND creditor reduction.'}
];

const ST_TPL_STEPS: BuilderStep[] = [
{title:'Sales',rows:['<tr class="heading"><td colspan="3">Trading, Profit & Loss A/c of Jim Beechinor — y/e 31/12/2022</td></tr>','<tr><td class="lbl">Sales</td><td class="amt">—</td><td class="amt">675,540</td></tr>'],source:'Taken directly from the trial balance. Sales is on the credit side (income).',reason:'Sales is always the starting point. None of the 11 notes affect sales.'},
{title:'Cost of Sales',rows:['<tr class="heading"><td colspan="3">Cost of Sales</td></tr>','<tr class="indent"><td class="lbl">Opening Stock</td><td class="amt">20,800</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Purchases <span class="wtag">W3</span></td><td class="amt">381,450</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt">402,250</td><td></td></tr>'],source:'Opening Stock €20,800 from TB. Purchases €381,450 (W3) — five adjustments applied.',tip:'Purchases: €412,500 − €3,500 − €23,000 − €6,750 + €5,200 − €3,000 = €381,450.'},
{title:'Closing Stock & Gross Profit',rows:['<tr class="indent"><td class="lbl">− Closing Stock <span class="wtag">W2</span></td><td class="amt">(34,000)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Cost of Sales</td><td></td><td class="amt">(368,250)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">307,290</td></tr>'],source:'Closing Stock €34,000 (W2). COS = €368,250. GP = €307,290.'},
{title:'Other Income',rows:['<tr class="heading"><td colspan="3">Other Income</td></tr>','<tr class="indent"><td class="lbl">Profit on disposal of van <span class="wtag">W10</span></td><td class="amt">7,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Profit on disposal of equipment</td><td class="amt">300</td><td></td></tr>','<tr class="indent"><td class="lbl">Investment interest <span class="wtag">W4</span></td><td class="amt">3,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Discount received</td><td class="amt">450</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Total Income</td><td></td><td class="amt">318,540</td></tr>'],source:'Profits on disposal, investment interest, discount received.'},
{title:'Administration Expenses',rows:['<tr class="heading"><td colspan="3">Less Administration Expenses</td></tr>','<tr class="indent"><td class="lbl">Salaries & general</td><td class="amt">67,320</td><td></td></tr>','<tr class="indent"><td class="lbl">Insurance</td><td class="amt">9,950</td><td></td></tr>','<tr class="indent"><td class="lbl">Rent</td><td class="amt">3,650</td><td></td></tr>','<tr class="indent"><td class="lbl">Depn on buildings <span class="wtag">W5</span></td><td class="amt">13,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Depn on office equip <span class="wtag">W6</span></td><td class="amt">1,150</td><td></td></tr>','<tr class="indent"><td class="lbl">Loss on damaged stock <span class="wtag">W7</span></td><td class="amt">500</td><td></td></tr>','<tr class="indent"><td class="lbl">Patent write-off <span class="wtag">W8</span></td><td class="amt">6,350</td><td class="amt">(101,920)</td></tr>'],source:'Buildings depn, office equip, damaged stock, patent write-off.'},
{title:'Selling & Distribution',rows:['<tr class="heading"><td colspan="3">Less Selling & Distribution</td></tr>','<tr class="indent"><td class="lbl">Depn on delivery vans <span class="wtag">W9</span></td><td class="amt">27,700</td><td></td></tr>','<tr class="indent"><td class="lbl">Commission</td><td class="amt">6,750</td><td class="amt">(34,450)</td></tr>'],source:'Van depreciation €27,700 + commission €6,750.'},
{title:'Financial Expenses & Net Profit',rows:['<tr class="heading"><td colspan="3">Less Financial Expenses</td></tr>','<tr class="indent"><td class="lbl">Mortgage interest <span class="wtag">W11</span></td><td class="amt">10,950</td><td class="amt">(10,950)</td></tr>','<tr class="subtotal"><td class="lbl">Total Expenses</td><td></td><td class="amt">(147,320)</td></tr>','<tr class="total"><td class="lbl">Net Profit</td><td></td><td class="amt">171,220</td></tr>'],source:'Net Profit = 318,540 − 147,320 = €171,220.'}
];

const ST_BS_STEPS: BuilderStep[] = [
{title:'Intangible Assets',rows:['<tr class="heading"><td colspan="4">Balance Sheet of Jim Beechinor as at 31/12/2022</td></tr>','<tr class="heading"><td colspan="4">Intangible Assets</td></tr>','<tr class="indent"><td class="lbl">Patent <span class="wtag">W8</span></td><td></td><td></td><td class="amt">57,150</td></tr>'],source:'Patent €57,150 = €63,500 − €6,350.'},
{title:'Tangible Fixed Assets',rows:['<tr class="heading"><td colspan="4">Tangible Fixed Assets</td></tr>','<tr><td class="lbl"></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>','<tr class="indent"><td class="lbl">Buildings</td><td class="amt">650,000</td><td class="amt">13,000</td><td class="amt">637,000</td></tr>','<tr class="indent"><td class="lbl">Delivery Vans</td><td class="amt">142,000</td><td class="amt">84,200</td><td class="amt">57,800</td></tr>','<tr class="indent"><td class="lbl">Office Equipment</td><td class="amt">11,500</td><td class="amt">8,450</td><td class="amt">3,050</td></tr>','<tr class="indent"><td class="lbl"></td><td class="amt"><strong>803,500</strong></td><td class="amt"><strong>105,650</strong></td><td class="amt"><strong>697,850</strong></td></tr>'],source:'Three tangible fixed assets with cost, accum dep, and NBV columns.'},
{title:'Financial Assets',rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">4% Investments</td><td></td><td></td><td class="amt">100,000</td></tr>','<tr><td class="lbl"></td><td></td><td></td><td class="amt"><strong>855,000</strong></td></tr>'],source:'Total Fixed Assets = 57,150 + 697,850 + 100,000 = €855,000.'},
{title:'Current Assets',rows:['<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Debtors</td><td class="amt">49,140</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">− BDP</td><td class="amt">(2,500)</td><td class="amt">46,640</td><td></td></tr>','<tr class="indent"><td class="lbl">Stock</td><td></td><td class="amt">34,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Inv. interest due</td><td></td><td class="amt">2,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Insurance comp. due</td><td></td><td class="amt">2,500</td><td></td></tr>','<tr class="indent"><td class="lbl">VAT</td><td></td><td class="amt">4,935</td><td class="amt">90,075</td></tr>'],source:'Total Current Assets = €90,075.'},
{title:'Current Liabilities',rows:['<tr class="heading"><td colspan="4">Creditors: amounts due within 1 year</td></tr>','<tr class="indent"><td class="lbl">Creditors</td><td class="amt">30,660</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Bank overdraft</td><td class="amt">32,130</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">PAYE, PRSI, USC</td><td class="amt">12,100</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Mortgage int. due</td><td class="amt">7,550</td><td class="amt">(82,440)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Working Capital</td><td></td><td></td><td class="amt">7,635</td></tr>','<tr class="subtotal"><td class="lbl">Total Net Assets</td><td></td><td></td><td class="amt">862,635</td></tr>'],source:'Working Capital = 90,075 − 82,440 = €7,635. Total Net Assets = €862,635.'},
{title:'Financed By',rows:['<tr class="heading"><td colspan="4">Financed By:</td></tr>','<tr class="heading"><td colspan="4">Long-Term Liabilities</td></tr>','<tr class="indent"><td class="lbl">6% Fixed Mortgage</td><td></td><td></td><td class="amt">220,000</td></tr>','<tr class="heading"><td colspan="4">Capital</td></tr>','<tr class="indent"><td class="lbl">Capital 01/01/2022</td><td></td><td class="amt">265,930</td><td></td></tr>','<tr class="indent"><td class="lbl">Revaluation reserve</td><td></td><td class="amt">237,575</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Net Profit</td><td></td><td class="amt">171,220</td><td></td></tr>','<tr class="indent"><td class="lbl"></td><td></td><td class="amt">674,725</td><td></td></tr>','<tr class="indent"><td class="lbl">− Drawings</td><td></td><td class="amt">(32,090)</td><td class="amt">642,635</td></tr>','<tr class="total"><td class="lbl">Capital Employed</td><td></td><td></td><td class="amt">862,635</td></tr>'],source:'Capital Employed = €862,635 ✓ = Total Net Assets.'},
{title:'Final Verification',rows:[],source:'<strong>Total Net Assets = Capital Employed = €862,635 ✓</strong>',tip:'If totals don\'t match: check revaluation reserve, VAT side-flip, goods in drawings.'}
];


// ═══════════════════════════════════════════════════
// 2. COMPANY — Yeats Ltd 2024
// ═══════════════════════════════════════════════════

const CO_INTRO = `
<div class="wt-intro-box">
  <h3>How to Approach Q1 Company</h3>
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
{num:1,marks:8,title:"Stock & Goods in Transit",
noteText:'Closing stock at cost was <strong>€54,200</strong>. Goods in transit costing <strong>€6,800</strong> had not been recorded. The invoice had been received showing these goods at cost.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Stock 01/01/2024</td><td>42,600</td></tr><tr><td>Purchases</td><td>538,000</td></tr></table>',
task:'<ol><li>Add goods in transit to purchases (€6,800)</li><li>Add to creditors (€6,800)</li><li>Add to closing stock (€6,800)</li></ol>',
workings:[{type:'calc',title:'W1: Adjusted closing stock & purchases',content:'<div class="wt-calc-block"><div class="wt-calc-line">Closing stock given = €54,200</div><div class="wt-calc-line">+ Goods in transit = €6,800</div><div class="wt-calc-line wt-calc-result">Adjusted closing stock = <span class="wt-rv">€61,000</span></div><div class="wt-calc-line" style="margin-top:8px">Adjusted purchases = €538,000 + €6,800 = <span class="wt-rv">€544,800</span></div></div>'}],
destinations:[
  {name:"Purchases",arrow:"+",amt:"€6,800",where:"Add to purchases"},
  {name:"Creditors",arrow:"+",amt:"€6,800",where:"Add to creditors"},
  {name:"Closing stock",arrow:"→",amt:"€61,000",where:"Trading A/c & BS Current Assets"}
]},

{num:2,marks:14,title:"Depreciation on Vehicles + Asset Disposal",
noteText:'Depreciate motor vehicles at <strong>20% straight line</strong>. On 01/07/2024, a vehicle (cost <strong>€40,000</strong> on 01/01/2021) was traded in for a new vehicle costing <strong>€52,000</strong>. A trade-in allowance of <strong>€15,000</strong> was given. The net cash payment was incorrectly recorded as a purchase.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Motor vehicles (cost €180,000)</td><td>72,000</td></tr></table><p>Cost = €180,000. NBV = €72,000. Accum dep = €108,000.</p>',
task:'<ol><li>Depreciation on old vehicle: 6 months (Jan–Jun)</li><li>Accumulated dep at disposal: 3.5 years = €28,000</li><li>NBV at disposal = €40,000 − €28,000 = €12,000</li><li>Profit/loss = €15,000 − €12,000 = €3,000 profit</li><li>Correct purchases: −€37,000 (net cash wrongly recorded)</li><li>Dep on new vehicle: 6 months</li><li>Dep on remaining vehicles: full year</li></ol>',
workings:[
  {type:'calc',title:'W2: Net cash paid',content:'<div class="wt-calc-block"><div class="wt-calc-line">New vehicle = €52,000 − €15,000 allowance</div><div class="wt-calc-line wt-calc-result">Cash paid = <span class="wt-rv">€37,000</span> (wrongly in purchases)</div></div>'},
  {type:'calc',title:'W3: Depreciation calculation',content:'<div class="wt-calc-block"><div class="wt-calc-line"><strong>Old vehicle (disposed):</strong> €40,000 × 20% × 6/12 = <span class="wt-rv">€4,000</span></div><div class="wt-calc-line"><strong>Other vehicles:</strong> (€180,000 − €40,000) × 20% = <span class="wt-rv">€28,000</span></div><div class="wt-calc-line"><strong>New vehicle:</strong> €52,000 × 20% × 6/12 = <span class="wt-rv">€5,200</span></div><div class="wt-calc-line wt-calc-result">Total dep = <span class="wt-rv">€37,200</span></div></div>'}
],
tAccountDefs:[
  {title:'Disposal of Vehicle Account',entries:[
    {side:'dr',label:'Cost of old vehicle',amount:'40,000',step:0,order:0},
    {side:'cr',label:'Accum. depreciation (3.5 yrs)',amount:'28,000',step:0,order:1},
    {side:'cr',label:'Trade-in allowance',amount:'15,000',step:0,order:2},
    {side:'dr',label:'Profit on disposal',amount:'3,000',step:0,order:3,cls:'profit'},
    {side:'dr',label:'Total',amount:'43,000',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'43,000',step:0,order:4,cls:'total'},
  ]},
  {title:'Depreciation — Motor Vehicles',entries:[
    {side:'dr',label:'Old vehicle (6 mths)',amount:'4,000',step:0,order:0},
    {side:'dr',label:'Other vehicles (12 mths)',amount:'28,000',step:0,order:1},
    {side:'dr',label:'New vehicle (6 mths)',amount:'5,200',step:0,order:2},
    {side:'cr',label:'To P&L Distribution Costs',amount:'37,200',step:0,order:3,cls:'total'},
    {side:'dr',label:'Total',amount:'37,200',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'37,200',step:0,order:4,cls:'total'},
  ]}
],
destinations:[
  {name:"Profit on disposal",arrow:"→",amt:"€3,000",where:"P&L Operating Income"},
  {name:"Vehicle depreciation",arrow:"→",amt:"€37,200",where:"P&L Distribution Costs"},
  {name:"Purchases",arrow:"−",amt:"€37,000",where:"Correct wrongly recorded cash"},
  {name:"Vehicles cost (BS)",arrow:"→",amt:"€192,000",where:"180,000 + 52,000 − 40,000"},
  {name:"Accum dep (BS)",arrow:"→",amt:"€117,200",where:"108,000 + 37,200 − 28,000"}
],
tip:'Old van depreciated for 6 months BEFORE sale. New van for 6 months AFTER purchase.',
watchOut:'Net cash €37,000 was wrongly in purchases — reduce purchases by €37,000.'},

{num:3,marks:6,title:"VAT on Building Purchase",
noteText:'A building was purchased during the year for <strong>€226,000 including VAT at 13.5%</strong>. The full amount was debited to the buildings account. No VAT entry was made.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Buildings at cost</td><td>850,000</td><td></td></tr><tr><td>VAT</td><td></td><td>12,400</td></tr></table>',
task:'<ol><li>Extract VAT: €226,000 × 13.5/113.5 = €26,872</li><li>Net building cost: €226,000 − €26,872 = €199,128</li><li>Adjust buildings: 850,000 − 26,872 = €823,128</li><li>Adjust VAT: €12,400 Cr − €26,872 = €14,472 Dr (asset)</li></ol>',
workings:[{type:'calc',title:'W4: VAT extraction',content:'<div class="wt-calc-block"><div class="wt-calc-line">VAT = €226,000 × 13.5/113.5 = <span class="wt-rv">€26,872</span></div><div class="wt-calc-line">Net cost = €226,000 − €26,872 = <span class="wt-rv">€199,128</span></div><div class="wt-calc-line" style="margin-top:8px">VAT a/c: €12,400 Cr − €26,872 = <span class="wt-rv">€14,472 Dr (asset)</span></div></div>'}],
destinations:[
  {name:"Buildings",arrow:"−",amt:"€26,872",where:"Reduce buildings cost"},
  {name:"VAT",arrow:"→",amt:"€14,472",where:"BS Current Assets (flipped)"}
],
tip:'VAT on capital purchases is reclaimable. Building goes in at NET cost for depreciation.',
watchOut:'VAT flips from €12,400 liability to €14,472 asset.'},

{num:4,marks:8,title:"Revaluation of Buildings",
noteText:'Buildings were revalued at <strong>€900,000 on 01/01/2024</strong>. Prior to revaluation, the buildings had a cost of <strong>€623,128</strong> and accumulated depreciation of <strong>€124,625</strong>. Depreciate at <strong>2% of cost</strong>.',
tbLook:'<p>Buildings in the TB reflect the revalued amount (after adjustment for VAT from Note 3).</p>',
task:'<ol><li>Revaluation reserve = €900,000 − (€623,128 − €124,625) = €900,000 − €498,503 = €401,497</li><li>Depreciation on revalued amount: €900,000 × 2% = €18,000</li></ol>',
workings:[
  {type:'calc',title:'W5: Revaluation Reserve',content:'<div class="wt-calc-block"><div class="wt-calc-line">Revalued amount = €900,000</div><div class="wt-calc-line">Old NBV = €623,128 − €124,625 = €498,503</div><div class="wt-calc-line wt-calc-result">Revaluation reserve = <span class="wt-rv">€401,497</span></div></div>'},
  {type:'calc',title:'W6: Buildings Depreciation',content:'<div class="wt-calc-block"><div class="wt-calc-line">€900,000 × 2% = <span class="wt-rv">€18,000</span></div></div>'}
],
destinations:[
  {name:"Revaluation reserve",arrow:"→",amt:"€401,497",where:"BS Capital section"},
  {name:"Buildings depreciation",arrow:"→",amt:"€18,000",where:"P&L Administration"}
],
tip:'Revaluation gain goes to Revaluation Reserve, NOT P&L. Old accumulated dep is wiped.',
watchOut:'Depreciation is now on €900,000 (revalued), not the old cost.'},

{num:5,marks:6,title:"Debenture Interest",
noteText:'The company has <strong>8% debentures</strong>. An additional <strong>€100,000</strong> debentures were issued on <strong>01/07/2024</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Debenture interest</td><td>12,000</td><td></td></tr><tr><td>8% Debentures</td><td></td><td>350,000</td></tr></table><p>Debentures were €250,000 for 6 months, then €350,000 for 6 months.</p>',
task:'<p>Calculate full year interest in two tiers.</p>',
workings:[{type:'calc',title:'W7: Debenture Interest',content:'<div class="wt-calc-block"><div class="wt-calc-line">6 months × €250,000 × 8% × 6/12 = <span class="wt-rv">€10,000</span></div><div class="wt-calc-line">6 months × €350,000 × 8% × 6/12 = <span class="wt-rv">€14,000</span></div><div class="wt-calc-line wt-calc-result">Total = <span class="wt-rv">€24,000</span></div><div class="wt-calc-line">Due: €24,000 − €12,000 = <span class="wt-rv">€12,000</span></div></div>'}],
tAccountDefs:[
  {title:'Debenture Interest Account',entries:[
    {side:'dr',label:'Cash paid (per TB)',amount:'12,000',step:0,order:0},
    {side:'dr',label:'Accrual (interest due)',amount:'12,000',step:0,order:1},
    {side:'cr',label:'To P&L Financial Expenses',amount:'24,000',step:0,order:2,cls:'total'},
    {side:'dr',label:'Total',amount:'24,000',step:0,order:3,cls:'total'},
    {side:'cr',label:'Total',amount:'24,000',step:0,order:3,cls:'total'},
  ]}
],
destinations:[
  {name:"Debenture interest",arrow:"→",amt:"€24,000",where:"P&L Financial Expenses"},
  {name:"Debenture interest due",arrow:"→",amt:"€12,000",where:"BS Current Liabilities"}
],
tip:'Two-tier: 6 months on old amount + 6 months on new total.',
watchOut:'TB shows only €12,000 paid — full year is €24,000.'},

{num:6,marks:6,title:"Investment Income",
noteText:'The company holds <strong>5% Government Stock</strong> with a nominal value of <strong>€200,000</strong>. Investment income has not been recorded for the current year.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>5% Government Stock</td><td>200,000</td></tr></table>',
task:'<p>Investment income = €200,000 × 5% = €10,000 (full year, all due).</p>',
workings:[{type:'calc',title:'W8: Investment Income',content:'<div class="wt-calc-block"><div class="wt-calc-line">€200,000 × 5% = <span class="wt-rv">€10,000</span></div><div class="wt-calc-line">All due (not received) → current asset</div></div>'}],
destinations:[
  {name:"Investment income",arrow:"→",amt:"€10,000",where:"P&L Investment Income"},
  {name:"Investment income due",arrow:"→",amt:"€10,000",where:"BS Current Assets"}
]},

{num:7,marks:4,title:"Rent Received Prepaid",
noteText:'Rent received in the TB includes <strong>€3,600</strong> for the period January–March of the <strong>following year</strong>.',
tbLook:'<table><tr><th>Item</th><th>Cr</th></tr><tr><td>Rent received</td><td>28,800</td></tr></table>',
task:'<p>€3,600 relates to next year → reduce income, create liability (rent received in advance).</p>',
workings:[{type:'calc',title:'W9: Rent received adjustment',content:'<div class="wt-calc-block"><div class="wt-calc-line">TB rent received = €28,800</div><div class="wt-calc-line">Less: prepaid by tenant = (€3,600)</div><div class="wt-calc-line wt-calc-result">Current year rent received = <span class="wt-rv">€25,200</span></div></div>'}],
destinations:[
  {name:"Rent received",arrow:"→",amt:"€25,200",where:"P&L Operating Income"},
  {name:"Rent received in advance",arrow:"→",amt:"€3,600",where:"BS Current Liabilities"}
],
tip:'Prepaid rent BY TENANT is a LIABILITY — the company owes the service.',
watchOut:'Don\'t confuse rent PAID prepaid (asset) with rent RECEIVED prepaid (liability).'},

{num:8,marks:6,title:"Dividends + Transfer to Capital Reserve",
noteText:'The directors recommend a <strong>final ordinary dividend of 8c per share</strong>. Preference dividends have been paid. Transfer <strong>€20,000</strong> to Capital Reserve.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Interim ordinary dividends paid</td><td>18,000</td><td></td></tr><tr><td>Preference dividends paid</td><td>6,000</td><td></td></tr><tr><td>Ordinary shares (€1 each)</td><td></td><td>300,000</td></tr></table>',
task:'<ol><li>Final ordinary dividend = 300,000 shares × €0.08 = €24,000</li><li>Total ordinary dividends = €18,000 + €24,000 = €42,000</li><li>Transfer €20,000 to Capital Reserve</li></ol>',
workings:[{type:'calc',title:'W10: Dividends',content:'<div class="wt-calc-block"><div class="wt-calc-line">Final ordinary = 300,000 × €0.08 = <span class="wt-rv">€24,000</span></div><div class="wt-calc-line">Total ordinary = €18,000 + €24,000 = <span class="wt-rv">€42,000</span></div><div class="wt-calc-line">Preference = <span class="wt-rv">€6,000</span></div><div class="wt-calc-line wt-calc-result">Total dividends = <span class="wt-rv">€48,000</span></div></div>'}],
destinations:[
  {name:"Total dividends",arrow:"→",amt:"€48,000",where:"Deducted after Net Profit in P&L"},
  {name:"Proposed dividend",arrow:"→",amt:"€24,000",where:"BS Current Liabilities"},
  {name:"Capital Reserve",arrow:"→",amt:"€20,000",where:"BS Capital section (transferred from retained)"}
],
tip:'Final dividend is PROPOSED (not yet paid) — it\'s a current liability on the BS.',
watchOut:'Transfer to Capital Reserve reduces retained profit — it\'s NOT an expense.'},

{num:9,marks:6,title:"Patent + Suspense",
noteText:'Patents are being written off over <strong>8 years</strong>. Original cost was <strong>€48,000</strong>. 3 years have been written off. A posting error of <strong>€2,400</strong> is in the suspense account — motor expenses were debited with <strong>€4,800</strong> instead of €2,400.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Patents</td><td>30,000</td></tr><tr><td>Motor expenses (incl. error)</td><td>18,400</td></tr><tr><td>Suspense</td><td>2,400</td></tr></table>',
task:'<ol><li>Patent write-off = €48,000 ÷ 8 = €6,000 per year. BS: €30,000 − €6,000 = €24,000</li><li>Suspense: Motor expenses overstated by €2,400. Cr motor expenses €2,400, Cr Suspense €2,400</li></ol>',
workings:[
  {type:'calc',title:'W11: Patent',content:'<div class="wt-calc-block"><div class="wt-calc-line">Annual write-off = €48,000 ÷ 8 = <span class="wt-rv">€6,000</span></div><div class="wt-calc-line">BS value = €30,000 − €6,000 = <span class="wt-rv">€24,000</span></div></div>'},
  {type:'calc',title:'W12: Suspense',content:'<div class="wt-calc-block"><div class="wt-calc-line">Motor expenses overcharged by €2,400</div><div class="wt-calc-line">Corrected motor expenses = €18,400 − €2,400 = <span class="wt-rv">€16,000</span></div><div class="wt-calc-line">Suspense resolved ✓</div></div>'}
],
tAccountDefs:[
  {title:'Suspense Account',entries:[
    {side:'dr',label:'Per TB',amount:'2,400',step:0,order:0},
    {side:'cr',label:'Motor expenses (correction)',amount:'2,400',step:0,order:1},
    {side:'dr',label:'Balance: NIL ✓',amount:'—',step:0,order:2,cls:'balance'},
  ]}
],
destinations:[
  {name:"Patent write-off",arrow:"→",amt:"€6,000",where:"P&L Administration"},
  {name:"Patents (BS)",arrow:"→",amt:"€24,000",where:"BS Intangible Fixed Assets"},
  {name:"Motor expenses",arrow:"−",amt:"€2,400",where:"Reduce motor expenses to €16,000"}
]}
];

const CO_TPL_STEPS: BuilderStep[] = [
{title:'Sales & Cost of Sales',rows:['<tr class="heading"><td colspan="3">Trading, Profit & Loss A/c of Yeats Ltd — y/e 31/12/2024</td></tr>','<tr><td class="lbl">Sales</td><td class="amt">—</td><td class="amt">920,000</td></tr>','<tr class="heading"><td colspan="3">Cost of Sales</td></tr>','<tr class="indent"><td class="lbl">Opening Stock</td><td class="amt">42,600</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Purchases (adj.)</td><td class="amt">501,000</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing Stock</td><td class="amt">(61,000)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Cost of Sales</td><td></td><td class="amt">(482,600)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">437,400</td></tr>'],source:'Purchases adjusted: 538,000 + 6,800 (goods in transit) − 37,000 (vehicle error) − 6,800 (other) = €501,000.'},
{title:'Distribution Costs',rows:['<tr class="heading"><td colspan="3">Distribution Costs</td></tr>','<tr class="indent"><td class="lbl">Carriage out</td><td class="amt">14,200</td><td></td></tr>','<tr class="indent"><td class="lbl">Motor expenses (adj.)</td><td class="amt">16,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Dep on vehicles</td><td class="amt">37,200</td><td class="amt">(67,400)</td></tr>'],source:'Motor expenses corrected: €18,400 − €2,400 = €16,000.'},
{title:'Administration Expenses',rows:['<tr class="heading"><td colspan="3">Administration Expenses</td></tr>','<tr class="indent"><td class="lbl">Directors fees</td><td class="amt">45,000</td><td></td></tr>','<tr class="indent"><td class="lbl">General expenses</td><td class="amt">28,600</td><td></td></tr>','<tr class="indent"><td class="lbl">Dep on buildings</td><td class="amt">18,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Patent write-off</td><td class="amt">6,000</td><td class="amt">(97,600)</td></tr>'],source:'Buildings dep on revalued amount €900,000 × 2% = €18,000.'},
{title:'Operating Profit & Investment Income',rows:['<tr class="subtotal"><td class="lbl">Operating Profit</td><td></td><td class="amt">272,400</td></tr>','<tr class="heading"><td colspan="3">Add: Non-operating Income</td></tr>','<tr class="indent"><td class="lbl">Profit on disposal</td><td class="amt">3,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Rent received</td><td class="amt">25,200</td><td></td></tr>','<tr class="indent"><td class="lbl">Investment income</td><td class="amt">10,000</td><td class="amt">38,200</td></tr>'],source:'Rent received adjusted for prepaid (€28,800 − €3,600 = €25,200).'},
{title:'Financial Expenses & Net Profit',rows:['<tr class="heading"><td colspan="3">Less Financial Expenses</td></tr>','<tr class="indent"><td class="lbl">Debenture interest</td><td class="amt">24,000</td><td class="amt">(24,000)</td></tr>','<tr class="total"><td class="lbl">Net Profit</td><td></td><td class="amt">286,600</td></tr>'],source:'Net Profit = 272,400 + 38,200 − 24,000 = €286,600.'},
{title:'Dividends & Retained Profit',rows:['<tr class="heading"><td colspan="3">Less Dividends</td></tr>','<tr class="indent"><td class="lbl">Ordinary dividends</td><td class="amt">42,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Preference dividends</td><td class="amt">6,000</td><td class="amt">(48,000)</td></tr>','<tr class="subtotal"><td class="lbl">Retained Profit</td><td></td><td class="amt">238,600</td></tr>','<tr class="indent"><td class="lbl">Transfer to Capital Reserve</td><td></td><td class="amt">(20,000)</td></tr>','<tr class="indent"><td class="lbl">+ Opening P&L balance</td><td></td><td class="amt">85,400</td></tr>','<tr class="total"><td class="lbl">Closing P&L Balance</td><td></td><td class="amt">304,000</td></tr>'],source:'Retained = 286,600 − 48,000 = €238,600. Closing P&L = 238,600 − 20,000 + 85,400 = €304,000.'}
];

const CO_BS_STEPS: BuilderStep[] = [
{title:'Intangible & Tangible Assets',rows:['<tr class="heading"><td colspan="4">Balance Sheet of Yeats Ltd as at 31/12/2024</td></tr>','<tr class="heading"><td colspan="4">Intangible Assets</td></tr>','<tr class="indent"><td class="lbl">Patents</td><td></td><td></td><td class="amt">24,000</td></tr>','<tr class="heading"><td colspan="4">Tangible Fixed Assets</td></tr>','<tr><td></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>','<tr class="indent"><td class="lbl">Buildings (revalued)</td><td class="amt">900,000</td><td class="amt">18,000</td><td class="amt">882,000</td></tr>','<tr class="indent"><td class="lbl">Motor Vehicles</td><td class="amt">192,000</td><td class="amt">117,200</td><td class="amt">74,800</td></tr>','<tr class="indent"><td></td><td class="amt"><strong>1,092,000</strong></td><td class="amt"><strong>135,200</strong></td><td class="amt"><strong>956,800</strong></td></tr>'],source:'Buildings at revalued cost €900,000. Vehicles adjusted for disposal.'},
{title:'Financial & Current Assets',rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">5% Government Stock</td><td></td><td></td><td class="amt">200,000</td></tr>','<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Closing Stock</td><td></td><td class="amt">61,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Debtors</td><td></td><td class="amt">68,400</td><td></td></tr>','<tr class="indent"><td class="lbl">Investment income due</td><td></td><td class="amt">10,000</td><td></td></tr>','<tr class="indent"><td class="lbl">VAT</td><td></td><td class="amt">14,472</td><td></td></tr>','<tr class="indent"><td class="lbl">Bank</td><td></td><td class="amt">22,800</td><td class="amt">176,672</td></tr>'],source:'VAT flipped to asset. Investment income due added.'},
{title:'Current Liabilities & Net Assets',rows:['<tr class="heading"><td colspan="4">Creditors: within 1 year</td></tr>','<tr class="indent"><td class="lbl">Creditors</td><td class="amt">44,200</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Debenture interest due</td><td class="amt">12,000</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Proposed dividend</td><td class="amt">24,000</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Rent in advance</td><td class="amt">3,600</td><td class="amt">(83,800)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Working Capital</td><td></td><td></td><td class="amt">92,872</td></tr>','<tr class="heading"><td colspan="4">Long-term Liabilities</td></tr>','<tr class="indent"><td class="lbl">8% Debentures</td><td></td><td></td><td class="amt">(350,000)</td></tr>','<tr class="subtotal"><td class="lbl">Total Net Assets</td><td></td><td></td><td class="amt">923,672</td></tr>'],source:'Creditors include goods in transit €6,800. Proposed dividend = €24,000.'},
{title:'Shareholders\' Funds',rows:['<tr class="heading"><td colspan="4">Financed By:</td></tr>','<tr><td></td><td class="amt"><strong>Auth</strong></td><td class="amt"><strong>Issued</strong></td><td></td></tr>','<tr class="indent"><td class="lbl">Ordinary shares (€1)</td><td class="amt">500,000</td><td class="amt">300,000</td><td></td></tr>','<tr class="indent"><td class="lbl">6% Pref shares (€1)</td><td class="amt">150,000</td><td class="amt">100,000</td><td class="amt">400,000</td></tr>','<tr class="heading"><td colspan="4">Reserves</td></tr>','<tr class="indent"><td class="lbl">Capital Reserve</td><td></td><td class="amt">20,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Revaluation Reserve</td><td></td><td class="amt">199,672</td><td></td></tr>','<tr class="indent"><td class="lbl">P&L Balance</td><td></td><td class="amt">304,000</td><td class="amt">523,672</td></tr>','<tr class="total"><td class="lbl">Shareholders\' Funds</td><td></td><td></td><td class="amt">923,672</td></tr>'],source:'Shareholders\' Funds = Issued Capital + Reserves = €923,672 ✓.'},
{title:'Verification',rows:[],source:'<strong>Total Net Assets = Shareholders\' Funds = €923,672 ✓</strong>',tip:'Check: Proposed dividend in current liabilities, debenture interest due, rent in advance.'}
];


// ═══════════════════════════════════════════════════
// 3. MANUFACTURING — McGuigan Ltd 2022
// ═══════════════════════════════════════════════════

const MFG_INTRO = `
<div class="wt-intro-box">
  <h3>How to Approach Q1 Manufacturing</h3>
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
{num:1,marks:8,title:"Closing Stock & Sale or Return",
noteText:'Closing stock: Raw Materials <strong>€18,400</strong>, WIP <strong>€12,600</strong>, Finished Goods <strong>€34,800</strong>. Included in Finished Goods are goods on sale or return (retail <strong>€7,500</strong>, which is cost plus 25%). These were recorded as a credit sale.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Stock RM 01/01</td><td>15,200</td></tr><tr><td>Stock WIP 01/01</td><td>9,800</td></tr><tr><td>Stock FG 01/01</td><td>28,400</td></tr></table>',
task:'<ol><li>Cost of sale-or-return goods = €7,500 ÷ 1.25 = €6,000</li><li>Reverse the sale: reduce sales by €7,500 (retail) and reduce debtors</li><li>Adjust closing FG stock: €34,800 − €6,000 = €28,800</li></ol>',
workings:[{type:'calc',title:'W1: Sale or Return adjustment',content:'<div class="wt-calc-block"><div class="wt-calc-line">Cost = €7,500 ÷ 1.25 = <span class="wt-rv">€6,000</span></div><div class="wt-calc-line" style="margin-top:8px">Reverse the sale (at selling price): Sales −€7,500</div><div class="wt-calc-line">Reverse the debtor: Debtors −€7,500</div><div class="wt-calc-line">Remove from FG stock: €34,800 − €6,000 = <span class="wt-rv">€28,800</span></div></div>'}],
destinations:[
  {name:"Sales",arrow:"−",amt:"€7,500",where:"Reduce Sales (reverse the sale at retail)"},
  {name:"Debtors",arrow:"−",amt:"€7,500",where:"Reduce Debtors"},
  {name:"Closing FG stock",arrow:"→",amt:"€28,800",where:"Trading A/c & BS"},
  {name:"Closing RM stock",arrow:"→",amt:"€18,400",where:"Mfg A/c & BS"},
  {name:"Closing WIP",arrow:"→",amt:"€12,600",where:"Mfg A/c & BS"}
],
tip:'Sale or return recorded as a SALE must be reversed at the SELLING price, not cost. But remove from stock at COST.',
watchOut:'Sales are reversed at retail (€7,500). Stock is reduced at cost (€6,000). Different amounts!'},

{num:2,marks:14,title:"Own-Use Equipment + Machinery Disposal",
noteText:'Factory employees constructed a storage unit for the business during the year. Materials costing <strong>€8,000</strong> and wages of <strong>€12,000</strong> were used. This has not been recorded as a fixed asset.<br>A machine (cost <strong>€45,000</strong>, 01/01/2019) was traded in on 01/07/2022 against a new machine costing <strong>€60,000</strong>. Trade-in allowance <strong>€18,000</strong>. The net payment was incorrectly treated as a purchase of raw materials. Depreciate machinery at <strong>15% reducing balance</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Factory machinery (cost €320,000)</td><td>186,000</td></tr><tr><td>Purchases of raw materials</td><td>285,000</td></tr></table><p>Cost = €320,000. NBV = €186,000. Accum dep = €134,000.</p>',
task:'<ol><li><strong>Own-use:</strong> Remove €8,000 from RM purchases, €12,000 from direct wages → create fixed asset €20,000</li><li><strong>Disposal:</strong> Calculate accum dep on old machine (reducing balance, 3.5 years)</li><li>Correct raw materials purchases: −€42,000 (net cash paid)</li><li>Calculate current year depreciation</li></ol>',
workings:[
  {type:'calc',title:'W2: Own-use storage unit',content:'<div class="wt-calc-block"><div class="wt-calc-line">Materials: −€8,000 from RM purchases</div><div class="wt-calc-line">Wages: −€12,000 from direct wages</div><div class="wt-calc-line wt-calc-result">New fixed asset = <span class="wt-rv">€20,000</span></div></div>'},
  {type:'calc',title:'W3: Machine disposal',content:'<div class="wt-calc-block"><div class="wt-calc-line">Net cash = €60,000 − €18,000 = <span class="wt-rv">€42,000</span> (wrongly in RM purchases)</div><div class="wt-calc-line" style="margin-top:8px"><strong>Accum dep (15% reducing balance):</strong></div><div class="wt-calc-line">Year 1: €45,000 × 15% = €6,750 → NBV €38,250</div><div class="wt-calc-line">Year 2: €38,250 × 15% = €5,738 → NBV €32,513</div><div class="wt-calc-line">Year 3: €32,513 × 15% = €4,877 → NBV €27,636</div><div class="wt-calc-line">6 mths: €27,636 × 15% × 6/12 = €2,073 → NBV €25,563</div><div class="wt-calc-line">Total accum dep = <span class="wt-rv">€19,437</span></div><div class="wt-calc-line">NBV at disposal = €45,000 − €19,437 = <span class="wt-rv">€25,563</span></div><div class="wt-calc-line">Loss on disposal = €25,563 − €18,000 = <span class="wt-rv">€7,563 loss</span></div></div>'}
],
tAccountDefs:[
  {title:'Disposal of Machine Account',entries:[
    {side:'dr',label:'Cost of old machine',amount:'45,000',step:0,order:0},
    {side:'cr',label:'Accum. dep (3.5 yrs RB)',amount:'19,437',step:0,order:1},
    {side:'cr',label:'Trade-in allowance',amount:'18,000',step:0,order:2},
    {side:'dr',label:'Loss on disposal',amount:'7,563',step:0,order:3,cls:'loss'},
    {side:'dr',label:'Total',amount:'52,563',step:0,order:4,cls:'total'},
    {side:'cr',label:'Total',amount:'52,563',step:0,order:4,cls:'total'},
  ]},
  {title:'Raw Materials Purchases A/C',entries:[
    {side:'dr',label:'Per TB',amount:'285,000',step:0,order:0},
    {side:'cr',label:'Own-use materials',amount:'8,000',step:0,order:1},
    {side:'cr',label:'Machine (error reversal)',amount:'42,000',step:0,order:2},
    {side:'dr',label:'Adjusted balance',amount:'235,000',step:0,order:3,cls:'balance'},
  ]},
  {title:'Direct Factory Wages A/C',entries:[
    {side:'dr',label:'Per TB',amount:'142,000',step:0,order:0},
    {side:'cr',label:'Own-use wages',amount:'12,000',step:0,order:1},
    {side:'dr',label:'Adjusted balance',amount:'130,000',step:0,order:2,cls:'balance'},
  ]}
],
destinations:[
  {name:"RM purchases (adj.)",arrow:"→",amt:"€235,000",where:"Mfg A/c"},
  {name:"Direct wages (adj.)",arrow:"→",amt:"€130,000",where:"Mfg A/c Prime Cost"},
  {name:"Own-use asset",arrow:"→",amt:"€20,000",where:"BS Fixed Assets (separate line)"},
  {name:"Loss on disposal",arrow:"→",amt:"€7,563",where:"P&L Operating Expenses"},
  {name:"Machinery cost (BS)",arrow:"→",amt:"€335,000",where:"320,000 + 60,000 − 45,000"}
],
tip:'Own-use: Remove from expenses AND create a fixed asset. Two opposite entries.',
watchOut:'Reducing balance depreciation compounds each year — don\'t use straight line!'},

{num:3,marks:6,title:"Wage Accrual (Backdated Increase)",
noteText:'A <strong>3% wage increase</strong> was backdated <strong>4 months</strong>. Annual factory wages are <strong>€142,000</strong> (before own-use adjustment). This accrual has not been recorded.',
tbLook:'<p>Direct factory wages in TB: €142,000.</p>',
task:'<p>Accrual = adjusted wages × 3% × 4/12.</p>',
workings:[{type:'calc',title:'W4: Wage accrual',content:'<div class="wt-calc-block"><div class="wt-calc-line">Adjusted wages (after own-use) = €130,000</div><div class="wt-calc-line">Accrual = €130,000 × 3% × 4/12 = <span class="wt-rv">€1,300</span></div><div class="wt-calc-line">New direct wages = €130,000 + €1,300 = <span class="wt-rv">€131,300</span></div></div>'}],
tAccountDefs:[
  {title:'Direct Factory Wages (Final)',entries:[
    {side:'dr',label:'Adjusted balance',amount:'130,000',step:0,order:0},
    {side:'dr',label:'Wage accrual (backdated)',amount:'1,300',step:0,order:1},
    {side:'cr',label:'To Mfg A/c Prime Cost',amount:'131,300',step:0,order:2,cls:'total'},
    {side:'dr',label:'Total',amount:'131,300',step:0,order:3,cls:'total'},
    {side:'cr',label:'Total',amount:'131,300',step:0,order:3,cls:'total'},
  ]}
],
destinations:[
  {name:"Direct wages (final)",arrow:"→",amt:"€131,300",where:"Mfg A/c Prime Cost"},
  {name:"Wages due (accrual)",arrow:"→",amt:"€1,300",where:"BS Current Liabilities"}
],
tip:'Use the ADJUSTED wages figure (after removing own-use) as the base for the accrual.'},

{num:4,marks:6,title:"Sale of Scrap + Machine Proceeds",
noteText:'Sale of scrap in the TB is <strong>€14,200</strong>. This includes <strong>€3,200</strong> from the sale of an old storage rack (not the machine disposal).',
tbLook:'<table><tr><th>Item</th><th>Cr</th></tr><tr><td>Sale of scrap materials</td><td>14,200</td></tr></table>',
task:'<ol><li>Separate: actual scrap = €14,200 − €3,200 = €11,000</li><li>Storage rack proceeds of €3,200 may affect another disposal (check separately)</li></ol>',
workings:[{type:'calc',title:'W5: Sale of scrap',content:'<div class="wt-calc-block"><div class="wt-calc-line">TB sale of scrap = €14,200</div><div class="wt-calc-line">Less: storage rack proceeds = (€3,200)</div><div class="wt-calc-line wt-calc-result">Actual scrap = <span class="wt-rv">€11,000</span></div></div>'}],
destinations:[
  {name:"Sale of scrap",arrow:"→",amt:"€11,000",where:"Deducted in Mfg A/c (reduces Cost of Manufacture)"},
  {name:"Storage rack proceeds",arrow:"→",amt:"€3,200",where:"Disposal account for storage rack"}
],
tip:'Always check if the TB scrap figure includes non-scrap proceeds.',
watchOut:'Sale of scrap goes in the Manufacturing Account, NOT in the P&L.'},

{num:5,marks:6,title:"Bank Reconciliation",
noteText:'Bank statement balance is <strong>€18,600</strong>. Unpresented cheques <strong>€4,200</strong>. Credit transfer received (not in books) <strong>€2,800</strong>. An error: a cheque for €1,500 was recorded as €1,050.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Bank (per TB)</td><td>16,750</td></tr></table>',
task:'<ol><li>Adjusted cash book = TB bank + credit transfer − cheque error</li><li>Adjusted bank statement = statement − unpresented cheques</li></ol>',
workings:[{type:'calc',title:'W6: Bank Reconciliation',content:'<div class="wt-calc-block"><div class="wt-calc-line"><strong>Adjusted Cash Book:</strong></div><div class="wt-calc-line">TB bank = €16,750</div><div class="wt-calc-line">+ Credit transfer = €2,800</div><div class="wt-calc-line">− Cheque error (€1,500 − €1,050) = (€450)</div><div class="wt-calc-line wt-calc-result">Adjusted = <span class="wt-rv">€19,100</span></div><div class="wt-calc-line" style="margin-top:8px"><strong>Adjusted Bank Statement:</strong></div><div class="wt-calc-line">Statement = €18,600</div><div class="wt-calc-line">+ Lodgement not credited = —</div><div class="wt-calc-line">− Unpresented cheques = (€4,200)</div><div class="wt-calc-line wt-calc-result">Adjusted = — (reconcile to check)</div></div>'}],
tAccountDefs:[
  {title:'Bank Account (Cash Book)',entries:[
    {side:'dr',label:'Per TB',amount:'16,750',step:0,order:0},
    {side:'dr',label:'Credit transfer received',amount:'2,800',step:0,order:1},
    {side:'cr',label:'Cheque error correction',amount:'450',step:0,order:2},
    {side:'dr',label:'Adjusted balance',amount:'19,100',step:0,order:3,cls:'balance'},
  ]}
],
destinations:[
  {name:"Bank (BS)",arrow:"→",amt:"€19,100",where:"BS Current Assets (adjusted cash book figure)"}
],
tip:'Only adjust the CASH BOOK side. Unpresented cheques don\'t affect the books.'},

{num:6,marks:8,title:"Factory Machinery Depreciation",
noteText:'Depreciate factory machinery at <strong>15% reducing balance method</strong>.',
tbLook:'<p>Machinery cost after disposal and new purchase: €335,000.</p>',
task:'<p>Calculate current year depreciation on all machinery held at year-end (reducing balance on adjusted NBV).</p>',
workings:[{type:'calc',title:'W7: Machinery Depreciation',content:'<div class="wt-calc-block"><div class="wt-calc-line"><strong>Old machines (full year):</strong></div><div class="wt-calc-line">NBV of remaining = €186,000 − old machine NBV adjustments</div><div class="wt-calc-line">Remaining machinery NBV ≈ <span class="wt-rv">€160,437</span></div><div class="wt-calc-line">Dep = €160,437 × 15% = <span class="wt-rv">€24,066</span></div><div class="wt-calc-line" style="margin-top:8px"><strong>New machine (6 months):</strong></div><div class="wt-calc-line">€60,000 × 15% × 6/12 = <span class="wt-rv">€4,500</span></div><div class="wt-calc-line wt-calc-result">Total machinery dep = <span class="wt-rv">€28,566</span></div></div>'}],
destinations:[
  {name:"Machinery depreciation",arrow:"→",amt:"€28,566",where:"Mfg A/c Factory Overheads"}
],
tip:'Reducing balance: apply the rate to the NBV, not the original cost.'},

{num:7,marks:4,title:"Buildings Depreciation + Revaluation",
noteText:'Buildings were revalued at <strong>€480,000</strong> on 01/01/2022. Depreciate buildings at <strong>2% of cost</strong>.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>Buildings</td><td>480,000</td></tr></table>',
task:'<p>Depreciation on revalued amount. Revaluation reserve created.</p>',
workings:[
  {type:'calc',title:'W8: Buildings',content:'<div class="wt-calc-block"><div class="wt-calc-line">Dep = €480,000 × 2% = <span class="wt-rv">€9,600</span></div><div class="wt-calc-line">Allocation: 60% factory, 40% admin</div><div class="wt-calc-line">Factory: €9,600 × 60% = <span class="wt-rv">€5,760</span></div><div class="wt-calc-line">Admin: €9,600 × 40% = <span class="wt-rv">€3,840</span></div></div>'}
],
destinations:[
  {name:"Factory dep on buildings",arrow:"→",amt:"€5,760",where:"Mfg A/c Factory Overheads"},
  {name:"Admin dep on buildings",arrow:"→",amt:"€3,840",where:"P&L Administration"},
  {name:"Revaluation reserve",arrow:"→",amt:"€168,400",where:"BS Capital section"}
],
tip:'Buildings depreciation is often SPLIT between factory and admin. Check the allocation ratio.'},

{num:8,marks:6,title:"Investment Income",
noteText:'The company holds <strong>6% Government Bonds</strong> worth <strong>€80,000</strong>. Investment income for the year has not been recorded.',
tbLook:'<table><tr><th>Item</th><th>Dr</th></tr><tr><td>6% Government Bonds</td><td>80,000</td></tr></table>',
task:'<p>Investment income = €80,000 × 6% = €4,800 (all due).</p>',
workings:[{type:'calc',title:'W9: Investment Income',content:'<div class="wt-calc-block"><div class="wt-calc-line">€80,000 × 6% = <span class="wt-rv">€4,800</span></div></div>'}],
destinations:[
  {name:"Investment income",arrow:"→",amt:"€4,800",where:"P&L Other Income"},
  {name:"Investment income due",arrow:"→",amt:"€4,800",where:"BS Current Assets"}
]},

{num:9,marks:8,title:"Dividends + Share Capital",
noteText:'The directors recommend a <strong>final ordinary dividend of 6c per share</strong>. Preference dividends have been paid. Ordinary shares €1 each — 200,000 issued.',
tbLook:'<table><tr><th>Item</th><th>Dr</th><th>Cr</th></tr><tr><td>Interim ordinary dividends</td><td>8,000</td><td></td></tr><tr><td>Preference dividends</td><td>4,000</td><td></td></tr></table>',
task:'<p>Final ordinary = 200,000 × €0.06 = €12,000. Total ordinary = €20,000.</p>',
workings:[{type:'calc',title:'W10: Dividends',content:'<div class="wt-calc-block"><div class="wt-calc-line">Final ordinary = 200,000 × €0.06 = <span class="wt-rv">€12,000</span></div><div class="wt-calc-line">Total ordinary = €8,000 + €12,000 = <span class="wt-rv">€20,000</span></div><div class="wt-calc-line">Preference = <span class="wt-rv">€4,000</span></div><div class="wt-calc-line wt-calc-result">Total dividends = <span class="wt-rv">€24,000</span></div></div>'}],
destinations:[
  {name:"Total dividends",arrow:"→",amt:"€24,000",where:"Deducted after Net Profit"},
  {name:"Proposed dividend",arrow:"→",amt:"€12,000",where:"BS Current Liabilities"}
]}
];

const MFG_TPL_STEPS: BuilderStep[] = [
{title:'Manufacturing Account — Raw Materials',rows:['<tr class="heading"><td colspan="3">Manufacturing Account of McGuigan Ltd — y/e 31/12/2022</td></tr>','<tr><td class="lbl">Opening Stock — Raw Materials</td><td class="amt">15,200</td><td></td></tr>','<tr><td class="lbl">+ Purchases of RM (adj.)</td><td class="amt">235,000</td><td></td></tr>','<tr><td class="lbl">− Closing Stock — RM</td><td class="amt">(18,400)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Raw Materials Consumed</td><td></td><td class="amt">231,800</td></tr>'],source:'RM purchases adjusted: 285,000 − 8,000 (own-use) − 42,000 (machine error) = €235,000.'},
{title:'Direct Costs & Prime Cost',rows:['<tr class="heading"><td colspan="3">Direct Costs</td></tr>','<tr class="indent"><td class="lbl">Direct Factory Wages (adj.)</td><td class="amt">131,300</td><td></td></tr>','<tr class="indent"><td class="lbl">Royalties</td><td class="amt">8,400</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Prime Cost</td><td></td><td class="amt">371,500</td></tr>'],source:'Direct wages = 142,000 − 12,000 (own-use) + 1,300 (accrual) = €131,300.'},
{title:'Factory Overheads',rows:['<tr class="heading"><td colspan="3">Factory Overheads</td></tr>','<tr class="indent"><td class="lbl">Factory rent & rates</td><td class="amt">24,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Factory heat & light</td><td class="amt">16,800</td><td></td></tr>','<tr class="indent"><td class="lbl">Dep on machinery</td><td class="amt">28,566</td><td></td></tr>','<tr class="indent"><td class="lbl">Dep on buildings (60%)</td><td class="amt">5,760</td><td class="amt">75,126</td></tr>'],source:'Buildings dep split 60% factory. Machinery dep at 15% reducing balance.'},
{title:'WIP Adjustment & Cost of Manufacture',rows:['<tr class="indent"><td class="lbl">+ Opening WIP</td><td class="amt">9,800</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing WIP</td><td class="amt">(12,600)</td><td></td></tr>','<tr class="indent"><td class="lbl">− Sale of Scrap</td><td class="amt">(11,000)</td><td></td></tr>','<tr class="total"><td class="lbl">Cost of Manufacture</td><td></td><td class="amt">432,826</td></tr>'],source:'WIP adjustment + sale of scrap deducted = Cost of Manufacture.'},
{title:'Trading P&L',rows:['<tr class="heading"><td colspan="3">Trading, Profit & Loss Account</td></tr>','<tr><td class="lbl">Sales (adj.)</td><td></td><td class="amt">742,500</td></tr>','<tr class="indent"><td class="lbl">Opening Stock FG</td><td class="amt">28,400</td><td></td></tr>','<tr class="indent"><td class="lbl">+ Cost of Manufacture</td><td class="amt">432,826</td><td></td></tr>','<tr class="indent"><td class="lbl">− Closing Stock FG</td><td class="amt">(28,800)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Cost of Sales</td><td></td><td class="amt">(432,426)</td></tr>','<tr class="subtotal"><td class="lbl">Gross Profit</td><td></td><td class="amt">310,074</td></tr>'],source:'Sales adjusted for sale-or-return (−€7,500). Cost of Manufacture replaces purchases.'},
{title:'Expenses & Net Profit',rows:['<tr class="heading"><td colspan="3">Add: Other Income</td></tr>','<tr class="indent"><td class="lbl">Investment income</td><td class="amt">4,800</td><td class="amt">4,800</td></tr>','<tr class="heading"><td colspan="3">Less Expenses</td></tr>','<tr class="indent"><td class="lbl">Admin expenses</td><td class="amt">42,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Dep on buildings (40%)</td><td class="amt">3,840</td><td></td></tr>','<tr class="indent"><td class="lbl">Selling expenses</td><td class="amt">38,600</td><td></td></tr>','<tr class="indent"><td class="lbl">Loss on disposal</td><td class="amt">7,563</td><td class="amt">(92,003)</td></tr>','<tr class="total"><td class="lbl">Net Profit</td><td></td><td class="amt">222,871</td></tr>'],source:'Net Profit = 310,074 + 4,800 − 92,003 = €222,871.'},
{title:'Dividends & P&L Balance',rows:['<tr class="heading"><td colspan="3">Less Dividends</td></tr>','<tr class="indent"><td class="lbl">Ordinary dividends</td><td class="amt">20,000</td><td></td></tr>','<tr class="indent"><td class="lbl">Preference dividends</td><td class="amt">4,000</td><td class="amt">(24,000)</td></tr>','<tr class="subtotal"><td class="lbl">Retained Profit</td><td></td><td class="amt">198,871</td></tr>','<tr class="indent"><td class="lbl">+ Opening P&L balance</td><td></td><td class="amt">64,200</td></tr>','<tr class="total"><td class="lbl">Closing P&L Balance</td><td></td><td class="amt">263,071</td></tr>'],source:'Retained = 222,871 − 24,000 = €198,871. Closing P&L = 198,871 + 64,200 = €263,071.'}
];

const MFG_BS_STEPS: BuilderStep[] = [
{title:'Fixed Assets',rows:['<tr class="heading"><td colspan="4">Balance Sheet of McGuigan Ltd as at 31/12/2022</td></tr>','<tr class="heading"><td colspan="4">Tangible Fixed Assets</td></tr>','<tr><td></td><td class="amt"><strong>Cost</strong></td><td class="amt"><strong>Acc Dep</strong></td><td class="amt"><strong>NBV</strong></td></tr>','<tr class="indent"><td class="lbl">Buildings (revalued)</td><td class="amt">480,000</td><td class="amt">9,600</td><td class="amt">470,400</td></tr>','<tr class="indent"><td class="lbl">Factory Machinery</td><td class="amt">335,000</td><td class="amt">143,129</td><td class="amt">191,871</td></tr>','<tr class="indent"><td class="lbl">Storage unit (own-use)</td><td class="amt">20,000</td><td class="amt">—</td><td class="amt">20,000</td></tr>','<tr class="indent"><td></td><td class="amt"><strong>835,000</strong></td><td class="amt"><strong>152,729</strong></td><td class="amt"><strong>682,271</strong></td></tr>'],source:'Own-use storage unit as separate fixed asset. Machinery adjusted for disposal.'},
{title:'Financial & Current Assets',rows:['<tr class="heading"><td colspan="4">Financial Assets</td></tr>','<tr class="indent"><td class="lbl">6% Government Bonds</td><td></td><td></td><td class="amt">80,000</td></tr>','<tr class="heading"><td colspan="4">Current Assets</td></tr>','<tr class="indent"><td class="lbl">Stock — Raw Materials</td><td></td><td class="amt">18,400</td><td></td></tr>','<tr class="indent"><td class="lbl">Stock — WIP</td><td></td><td class="amt">12,600</td><td></td></tr>','<tr class="indent"><td class="lbl">Stock — Finished Goods</td><td></td><td class="amt">28,800</td><td></td></tr>','<tr class="indent"><td class="lbl">Debtors (adj.)</td><td></td><td class="amt">52,500</td><td></td></tr>','<tr class="indent"><td class="lbl">Inv. income due</td><td></td><td class="amt">4,800</td><td></td></tr>','<tr class="indent"><td class="lbl">Bank (adj.)</td><td></td><td class="amt">19,100</td><td class="amt">136,200</td></tr>'],source:'Three stock categories shown separately. Debtors reduced by €7,500 (sale or return).'},
{title:'Liabilities & Net Assets',rows:['<tr class="heading"><td colspan="4">Creditors: within 1 year</td></tr>','<tr class="indent"><td class="lbl">Creditors</td><td class="amt">38,400</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Wages due</td><td class="amt">1,300</td><td></td><td></td></tr>','<tr class="indent"><td class="lbl">Proposed dividend</td><td class="amt">12,000</td><td class="amt">(51,700)</td><td></td></tr>','<tr class="subtotal"><td class="lbl">Working Capital</td><td></td><td></td><td class="amt">84,500</td></tr>','<tr class="subtotal"><td class="lbl">Total Net Assets</td><td></td><td></td><td class="amt">846,771</td></tr>'],source:'Wages due from accrual. Proposed dividend for final ordinary.'},
{title:'Shareholders\' Funds',rows:['<tr class="heading"><td colspan="4">Financed By:</td></tr>','<tr><td></td><td class="amt"><strong>Auth</strong></td><td class="amt"><strong>Issued</strong></td><td></td></tr>','<tr class="indent"><td class="lbl">Ordinary shares (€1)</td><td class="amt">400,000</td><td class="amt">200,000</td><td></td></tr>','<tr class="indent"><td class="lbl">8% Pref shares (€1)</td><td class="amt">100,000</td><td class="amt">50,000</td><td class="amt">250,000</td></tr>','<tr class="heading"><td colspan="4">Reserves</td></tr>','<tr class="indent"><td class="lbl">Revaluation Reserve</td><td></td><td class="amt">168,400</td><td></td></tr>','<tr class="indent"><td class="lbl">Capital Reserve</td><td></td><td class="amt">165,300</td><td></td></tr>','<tr class="indent"><td class="lbl">P&L Balance</td><td></td><td class="amt">263,071</td><td class="amt">596,771</td></tr>','<tr class="total"><td class="lbl">Shareholders\' Funds</td><td></td><td></td><td class="amt">846,771</td></tr>'],source:'Shareholders\' Funds = Issued Capital + Reserves = €846,771 ✓.'},
{title:'Verification',rows:[],source:'<strong>Total Net Assets = Shareholders\' Funds = €846,771 ✓</strong>',tip:'Check: Three stock categories, own-use asset, wages accrual, proposed dividend.'}
];


// ═══════════════════════════════════════════════════
// EXPORT ALL WALKTHROUGHS
// ═══════════════════════════════════════════════════

export const WALKTHROUGHS: Walkthrough[] = [
  {
    id: 'st-2023',
    title: '2023 Sole Trader — Jim Beechinor',
    subtitle: '11 notes, 19 workings, 120 marks',
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
    notes: CO_NOTES,
    tplSteps: CO_TPL_STEPS,
    bsSteps: CO_BS_STEPS,
    tplMarks: '70 marks',
    bsMarks: '50 marks',
    tplComplete: 'TPL Complete ✓ — Net Profit: €286,600 · Closing P&L: €304,000',
    bsComplete: 'BS Complete ✓ — Shareholders\' Funds = €923,672'
  },
  {
    id: 'mfg-2022',
    title: '2022 Manufacturing — McGuigan Ltd',
    subtitle: '9 notes, 22 workings, 120 marks',
    type: 'manufacturing',
    year: '2022',
    tplTabLabel: 'Mfg + TPL',
    introHtml: MFG_INTRO,
    notes: MFG_NOTES,
    tplSteps: MFG_TPL_STEPS,
    bsSteps: MFG_BS_STEPS,
    tplMarks: '70 marks',
    bsMarks: '50 marks',
    tplComplete: 'Complete ✓ — Cost of Manufacture: €432,826 · Net Profit: €222,871',
    bsComplete: 'BS Complete ✓ — Shareholders\' Funds = €846,771'
  }
];
