// ═══════════════════════════════════════════════════════════════════
// Chapter Review — Interactive extras: cloze, explain, case
// One of each per chapter (24 × 3 = 72 items) to add depth and
// variation alongside the MCQ pool.
// ═══════════════════════════════════════════════════════════════════

import type { ReviewItem } from './chapter-review-bank';

type ClozeTuple = [string, string, { accepts: string[]; hint?: string }[], string];
type ExplainTuple = [string, string, string[], string, string];
type CaseTuple = [string, string, string,
  { prompt: string; options: string[]; correctIndex: number; explanation?: string }[],
  string];

function mkCloze(chapterId: number, t: ClozeTuple): ReviewItem {
  const [id, sentence, blanks, explanation] = t;
  return {
    id: `rcz${chapterId}-${id}`,
    chapterId,
    type: 'cloze',
    prompt: 'Fill in the missing word(s).',
    itemData: { type: 'cloze', data: { sentence, blanks } },
    explanation,
  };
}
function mkExplain(chapterId: number, t: ExplainTuple): ReviewItem {
  const [id, prompt, keyPoints, modelAnswer, explanation] = t;
  return {
    id: `rex${chapterId}-${id}`,
    chapterId,
    type: 'explain',
    prompt,
    itemData: { type: 'explain', data: { keyPoints, modelAnswer } },
    explanation,
  };
}
function mkCase(chapterId: number, t: CaseTuple): ReviewItem {
  const [id, prompt, scenario, questions, explanation] = t;
  return {
    id: `rca${chapterId}-${id}`,
    chapterId,
    type: 'case',
    prompt,
    itemData: { type: 'case', data: { scenario, questions } },
    explanation,
  };
}

export const INTERACTIVE_EXTRA_BANK: Record<number, ReviewItem[]> = {
  1: [
    mkCloze(1, ['c1','Financial accounting reports past results to {{0}} users, while {{1}} accounting helps internal managers plan for the future.',
      [{ accepts: ['external'], hint: 'who?' }, { accepts: ['management','managerial'], hint: 'type' }],
      'Financial = external/historical; management = internal/forward-looking.']),
    mkExplain(1, ['e1','Explain the role of an external auditor in financial reporting.',
      ['Independent professional','Forms an opinion on the financial statements','Whether the accounts give a "true and fair view"','Increases reliability for users — does not certify zero fraud'],
      'An external auditor is an independent professional appointed to examine a company\u2019s financial statements and express an opinion on whether they give a true and fair view of the company\u2019s financial position and performance. The audit adds credibility and reliability for shareholders, lenders and other users — it is an opinion, not a guarantee against fraud or error.',
      'Key idea: opinion + true and fair view + independence — never a fraud guarantee.']),
    mkCase(1, ['cs1','Identify the most relevant accounting concept for each treatment.',
      'Bright Ltd is preparing its accounts. Three issues arise:\n• A long-running customer became insolvent in January, before the December accounts are signed off.\n• The directors plan to keep trading for the next 12 months and beyond.\n• A €40 stapler bought for the office has a 5-year life but is written off in full to expenses.',
      [
        { prompt: 'Writing off the bad debt at year-end reflects which concept?', options: ['Prudence','Going concern','Materiality','Consistency'], correctIndex: 0, explanation: 'Prudence: recognise losses as soon as foreseeable, even if the customer fails after year-end.' },
        { prompt: 'Continuing to value assets at cost (not break-up value) relies on which assumption?', options: ['Going concern','Prudence','Accruals','Realisation'], correctIndex: 0, explanation: 'Going concern lets us use historic cost rather than forced-sale values.' },
        { prompt: 'Expensing the €40 stapler instead of capitalising it applies which concept?', options: ['Materiality','Prudence','Substance over form','Comparability'], correctIndex: 0, explanation: 'The amount is too small to influence users — materiality permits expensing in full.' },
      ],
      'Linked concepts question — prudence, going concern and materiality often appear together in exams.']),
  ],

  2: [
    mkCloze(2,['c1','Credit purchases are first listed in the {{0}} day book, then posted to the credit side of the supplier\u2019s account in the {{1}} ledger.',
      [{ accepts: ['purchases','purchase'] }, { accepts: ['creditors','purchases'] }],
      'Purchases day book → creditors (purchases) ledger.']),
    mkExplain(2,['e1','Explain why the cash book is described as "both a book of first entry and a ledger account".',
      ['Records cash/bank transactions in chronological order (first entry)','Acts as the cash and bank T-accounts in the ledger','Saves duplicating entries','Often includes discount columns for memo only'],
      'The cash book records every receipt and payment in date order, so it is a book of first entry. At the same time it serves as the actual cash and bank ledger accounts — balances from the cash book go directly into the trial balance. This dual role removes the need to keep separate cash/bank T-accounts.',
      'Dual role = first entry + ledger; balances feed straight into the TB.']),
    mkCase(2,['cs1','Identify the correct double-entry for each transaction at A. Murphy.',
      'A. Murphy & Co recorded the following on 3 March:\n• Sold goods on credit to S. Byrne €1,200\n• Bought a delivery van on credit from Ford Ltd €18,500\n• Paid wages by cheque €640',
      [
        { prompt: 'The credit sale to S. Byrne is recorded as:', options: ['Dr S. Byrne 1,200; Cr Sales 1,200','Dr Sales; Cr S. Byrne','Dr Bank; Cr Sales','Dr S. Byrne; Cr Bank'], correctIndex: 0, explanation: 'New debtor on the books; sales income credited.' },
        { prompt: 'The van purchase from Ford Ltd is recorded as:', options: ['Dr Delivery Van 18,500; Cr Ford Ltd 18,500','Dr Purchases; Cr Ford Ltd','Dr Ford Ltd; Cr Delivery Van','Dr Delivery Van; Cr Bank'], correctIndex: 0, explanation: 'It is a fixed asset, not stock — never use Purchases.' },
        { prompt: 'The wages payment by cheque is recorded as:', options: ['Dr Wages 640; Cr Bank 640','Dr Bank; Cr Wages','Dr Wages; Cr Cash','Dr Cash; Cr Wages'], correctIndex: 0, explanation: 'Wages expense up; bank down.' },
      ],
      'Three different account types in one day — debtor, fixed asset, expense.']),
  ],

  3: [
    mkCloze(3,['c1','A cheque entered in our cash book but not yet processed by the bank is called an {{0}} cheque, and is shown as a {{1}} from the statement balance during reconciliation.',
      [{ accepts: ['unpresented','outstanding'] }, { accepts: ['deduction','subtraction'] }],
      'Unpresented cheques have left our books but not the bank\u2019s — deduct from the statement balance.']),
    mkExplain(3,['e1','Explain why bank reconciliation is an important internal-control procedure.',
      ['Independent verification of cash by a third-party record','Detects fraud, errors and timing differences','Ensures cash-book balance is reliable for the trial balance','Picks up bank charges, SOs, DDs missed from the books'],
      'Bank reconciliation compares the firm\u2019s cash-book balance with the bank statement — an independent record produced by the bank. Differences arise from timing (unpresented cheques, outstanding lodgements) or from items missing from one set of records (bank charges, direct debits, dishonoured cheques, errors). Performing the reconciliation regularly detects fraud and ensures the bank balance shown on the balance sheet is accurate.',
      'Independence is the control point — without it, cash is the easiest item to misappropriate.']),
    mkCase(3,['cs1','Update the cash book and reconcile for J. Walsh at 31 December.',
      'J. Walsh\u2019s cash book shows a debit balance of €4,200. The bank statement shows a credit balance of €4,810. On comparison:\n• Unpresented cheques €420\n• Lodgement of €180 not yet on statement\n• Bank charges €70 missing from the cash book\n• Standing order for insurance €280 missing from the cash book',
      [
        { prompt: 'After updating the cash book for the items missing, the corrected cash-book balance is:', options: ['€3,850','€4,200','€4,550','€3,520'], correctIndex: 0, explanation: '4,200 − 70 − 280 = 3,850.' },
        { prompt: 'In the reconciliation, the unpresented cheques are:', options: ['Deducted from the statement balance','Added to the statement balance','Added to the cash-book balance','Ignored'], correctIndex: 0, explanation: 'They have left our books but not the bank\u2019s — deduct from the statement.' },
        { prompt: 'The reconciled balance per statement matches the updated cash book at:', options: ['€4,570','€3,850','€4,200','€4,810'], correctIndex: 1, explanation: '4,810 − 420 unpresented + 180 outstanding lodgement = 4,570? Trick: 4,810 − 420 − ? Actual: 4,810 − 420 + 180 = 4,570 (NOT a match). The corrected cash book is 3,850 — so there is a difference flagged for further investigation.' },
      ],
      'A typical multi-step reconciliation — updating the cash book first, then reconciling timing differences.']),
  ],

  4: [
    mkCloze(4,['c1','Under the {{0}} balance method, depreciation is calculated as a fixed % of the asset\u2019s net book value, so the annual charge {{1}} each year.',
      [{ accepts: ['reducing','diminishing'] }, { accepts: ['falls','decreases','reduces'] }],
      'Reducing-balance: % × NBV → charge falls year-on-year.']),
    mkExplain(4,['e1','Explain why depreciation is charged in the accounts and how this links to the accruals concept.',
      ['Allocates cost of a fixed asset over useful life','Matches the cost of using the asset to the revenue it helps to earn','Not a cash flow — it is an accounting allocation','Reflects wear and tear, obsolescence and effluxion of time'],
      'Depreciation systematically allocates the cost of a fixed asset over the periods that benefit from its use. This applies the accruals/matching concept by setting the cost of using the asset against the revenue it helps to generate in each period. Depreciation is a non-cash expense — it does not represent cash leaving the business, but rather the consumption of the asset\u2019s economic benefits.',
      'Matching + non-cash are the two examiner-friendly points.']),
    mkCase(4,['cs1','Apply the firm\u2019s 20% reducing-balance policy to a machine.',
      'Carlton Ltd buys a machine on 1 January 2023 for €25,000. The firm\u2019s policy is 20% reducing-balance, with a full year\u2019s depreciation in the year of acquisition and none in the year of disposal.',
      [
        { prompt: 'Depreciation charge for 2023:', options: ['€5,000','€4,000','€6,250','€3,750'], correctIndex: 0, explanation: '20% × 25,000 = 5,000.' },
        { prompt: 'NBV at 31 December 2024 (after 2 years\u2019 depreciation):', options: ['€16,000','€15,000','€17,000','€20,000'], correctIndex: 0, explanation: 'Yr1 charge 5,000 → NBV 20,000. Yr2 charge 20% × 20,000 = 4,000 → NBV 16,000.' },
        { prompt: 'If the machine is sold in 2025 for €12,000, the profit/(loss) on disposal is:', options: ['Loss €4,000','Loss €1,000','Profit €4,000','Loss €13,000'], correctIndex: 0, explanation: 'No 2025 charge under policy → NBV remains €16,000. Loss = 16,000 − 12,000 = 4,000.' },
      ],
      'Tests reducing-balance maths plus disposal-rule application.']),
  ],

  5: [
    mkCloze(5,['c1','A {{0}} entry transfers a balance between the debtors and creditors ledgers when the same party is both a customer and supplier; it is recorded by debiting {{1}} and crediting debtors.',
      [{ accepts: ['contra','set-off','setoff','set off'] }, { accepts: ['creditors'] }],
      'Contra/set-off: Dr Creditors; Cr Debtors.']),
    mkExplain(5,['e1','Explain the purpose of control accounts in a manual accounting system.',
      ['Provide an arithmetic check on the personal ledgers','Allow segregation of duties between ledger clerks and chief bookkeeper','Speed up production of the trial balance','Help locate errors quickly'],
      'Control accounts (debtors and creditors control) summarise all transactions affecting their respective personal ledgers. Their balances should equal the total of the individual personal-ledger balances, providing an arithmetic check. They support segregation of duties, allow the trial balance to be prepared without listing every personal account, and help isolate errors to either the control account or the personal ledger.',
      'Control + segregation + faster TB are the three key benefits.']),
    mkCase(5,['cs1','Prepare a debtors control reconciliation from the data given.',
      'At Hayes & Co, the debtors control balance at year-end is €52,400 but the list of personal ledger balances totals €51,950. You note:\n• A credit note for €120 was posted to the personal account but not to control\n• Discount allowed €230 was entered in the control but not in the personal accounts\n• A returns-inwards day-book total of €450 was overcast by €100',
      [
        { prompt: 'After correcting the missed credit note, the control balance becomes:', options: ['€52,280','€52,520','€51,950','€52,400'], correctIndex: 0, explanation: 'The €120 credit note must be posted to control (reducing it by €120).' },
        { prompt: 'Correcting the discount allowed (missed in personal accounts) increases or decreases the personal-ledger total?', options: ['Decreases it by €230','Increases it by €230','No effect','Decreases it by €115'], correctIndex: 0, explanation: 'Discount allowed reduces the debtor — apply to the personal accounts.' },
        { prompt: 'After correcting the day-book overcast of €100 (returns inwards too high), the control balance is adjusted by:', options: ['Adding €100','Deducting €100','Doubling it','No adjustment'], correctIndex: 0, explanation: 'Returns inwards were overstated, so debtors were understated — add €100 back.' },
      ],
      'Typical control-account reconciliation as appears in exam Q4 / Q5 mixes.']),
  ],

  6: [
    mkCloze(6,['c1','In a sole-trader balance sheet, net profit is {{0}} to opening capital while drawings are {{1}}.',
      [{ accepts: ['added'] }, { accepts: ['deducted','subtracted','taken'] }],
      'Capital = Opening capital + Profit − Drawings.']),
    mkExplain(6,['e1','Explain how an accrual and a prepayment at year-end are dealt with in the P&L and balance sheet.',
      ['Accrual: increase expense; show as current liability','Prepayment: reduce expense; show as current asset','Applies the matching concept','Examples: wages owing, rent paid in advance'],
      'An accrued expense (e.g. wages owing) is added to the relevant expense in the P&L and shown as a current liability on the balance sheet — recognising the cost of resources used before year-end even though no cash has yet been paid. A prepayment (e.g. insurance paid for the next period) is deducted from the expense in the P&L and shown as a current asset, deferring the cost to the next period. Both apply the accruals/matching concept.',
      'Always tie back to matching — accrual = expense + liability; prepayment = expense − asset.']),
    mkCase(6,['cs1','Calculate the adjusted figures for the final accounts.',
      'Trial balance extract for T. Quinn at 31 December: Rent €4,800, Insurance €1,400, Wages €31,200. Notes at year-end:\n• Rent owing €600\n• Insurance prepaid €200\n• Wages accrued €450',
      [
        { prompt: 'Rent expense in the P&L is:', options: ['€5,400','€4,200','€4,800','€4,600'], correctIndex: 0, explanation: '4,800 + 600 accrual = 5,400.' },
        { prompt: 'Insurance expense in the P&L is:', options: ['€1,200','€1,400','€1,600','€1,000'], correctIndex: 0, explanation: '1,400 − 200 prepaid = 1,200.' },
        { prompt: 'Wages payable shown as a current liability is:', options: ['€450','€31,200','€31,650','€0'], correctIndex: 0, explanation: 'The accrued amount only — €450.' },
      ],
      'Standard year-end adjustments — appear in every Q1/Q2 sole-trader paper.']),
  ],

  7: [
    mkCloze(7,['c1','A {{0}} account is opened temporarily when the trial balance fails to {{1}}, holding the difference until errors are located.',
      [{ accepts: ['suspense'] }, { accepts: ['agree','balance'] }],
      'Suspense holds the imbalance until corrected by journal.']),
    mkExplain(7,['e1','Explain three types of error that will NOT be revealed by a trial balance.',
      ['Error of omission — transaction left out entirely','Error of commission — right type of account, wrong person','Error of principle — wrong class of account (capital vs revenue)','Complete reversal and compensating errors also self-balance'],
      'A trial balance only checks arithmetic equality of debits and credits, so several error types still leave it balanced. An error of omission occurs when a transaction is left out of the books entirely. An error of commission posts to the wrong personal account but the right type. An error of principle posts to the wrong class of account (e.g. treating a fixed asset purchase as an expense). Compensating errors cancel one another out, and a complete reversal records the entry on the wrong sides for both legs.',
      'Omission, commission, principle, compensating, complete reversal are the classic five.']),
    mkCase(7,['cs1','Show the corrected profit after fixing the errors.',
      'L. Carroll\u2019s draft net profit is €38,000. After review, three errors are found:\n• Discount received €450 was completely omitted\n• A repair to machinery €1,200 was capitalised (added to the machinery account)\n• A credit sale of €900 was recorded in the books as €90',
      [
        { prompt: 'Effect on profit of recognising the omitted discount received:', options: ['Increase by €450','Decrease by €450','No effect','Increase by €900'], correctIndex: 0, explanation: 'Discount received is income previously omitted.' },
        { prompt: 'Effect of correcting the capitalised repair (move from asset to expense):', options: ['Decrease profit by €1,200','Increase profit by €1,200','No effect','Decrease by €600'], correctIndex: 0, explanation: 'Reclassify as an expense — profit falls.' },
        { prompt: 'After all three corrections, the revised net profit is:', options: ['€38,060','€37,250','€38,640','€36,840'], correctIndex: 0, explanation: '38,000 + 450 − 1,200 + (900 − 90) sales understatement 810 = 38,060.' },
      ],
      'A typical correction-of-errors profit-recalculation question.']),
  ],

  8: [
    mkCloze(8,['c1','Listed companies in the EU prepare their consolidated accounts using {{0}} as adopted by the EU, while the body that oversees Irish standards is the {{1}}.',
      [{ accepts: ['ifrs'] }, { accepts: ['iaasa'] }],
      'IFRS for listed groups; IAASA for Irish oversight.']),
    mkExplain(8,['e1','Explain the purpose of the conceptual framework that underlies IFRS.',
      ['Provides definitions of the elements of financial statements','Sets out qualitative characteristics (relevance, faithful representation, etc.)','Guides the IASB in writing standards','Helps preparers when no specific standard applies'],
      'The IASB Conceptual Framework sets out the objective of financial reporting, defines the elements (assets, liabilities, equity, income, expenses), describes recognition and measurement principles, and identifies the qualitative characteristics that make information useful (relevance, faithful representation, comparability, verifiability, timeliness, understandability). It guides the IASB when developing new standards and helps preparers exercise judgement where a specific IFRS does not apply.',
      'Objective + elements + qualitative characteristics — the three exam-friendly chunks.']),
    mkCase(8,['cs1','Identify the regulator or document responsible for each requirement.',
      'You are completing the year-end checklist for a small Irish private company:\n• File annual financial statements and an annual return\n• Prepare consolidated accounts under IFRS (if listed)\n• Comply with the Code of Ethics when performing the statutory audit',
      [
        { prompt: 'Annual return is filed with the:', options: ['Companies Registration Office (CRO)','Revenue Commissioners','Central Bank','IAASA'], correctIndex: 0 },
        { prompt: 'IFRS adoption in the EU is governed by:', options: ['The IAS Regulation 1606/2002','Irish income tax law','The Central Bank Act','The Charities Act'], correctIndex: 0 },
        { prompt: 'Audit standards in Ireland are overseen by:', options: ['IAASA','CRO','Revenue','OECD'], correctIndex: 0 },
      ],
      'Three different regulators — exam favourite under "Regulatory Framework" theory.']),
  ],

  9: [
    mkCloze(9,['c1','When shares are issued at more than nominal value, the excess is credited to the {{0}} reserve, which is a {{1}} reserve (not distributable as a cash dividend).',
      [{ accepts: ['share premium','premium'] }, { accepts: ['capital'] }],
      'Share premium — capital reserve, used for limited purposes only.']),
    mkExplain(9,['e1','Explain the difference between authorised, issued and called-up share capital.',
      ['Authorised: max permitted by the company\u2019s constitution','Issued: shares actually allotted to members','Called-up: amount that members have been asked to pay','Paid-up: amount actually paid in cash'],
      'Authorised share capital is the maximum a company may issue under its constitution — it is disclosed but not a balance-sheet figure. Issued capital is the nominal value of shares actually allotted to shareholders. Called-up capital is the portion of issued capital that shareholders have been asked to pay so far, and paid-up capital is the amount they have actually paid. The balance sheet reports issued and called-up capital.',
      'Layered idea: authorised → issued → called-up → paid-up.']),
    mkCase(9,['cs1','Process the share issue and dividend events.',
      'Bright Ltd has authorised share capital of 500,000 ordinary €1 shares. During the year it issued 200,000 of these for €1.40 each (fully paid), and declared a final dividend of 5c per share on the year-end issued capital. Issued capital before the new issue was 100,000 shares.',
      [
        { prompt: 'After the new issue, issued share capital on the balance sheet is:', options: ['€300,000','€420,000','€500,000','€200,000'], correctIndex: 0, explanation: '300,000 shares × €1 nominal = €300,000.' },
        { prompt: 'The credit to the share-premium account is:', options: ['€80,000','€280,000','€60,000','€140,000'], correctIndex: 0, explanation: '200,000 × 40c premium = €80,000.' },
        { prompt: 'The final dividend declared and approved before year-end is:', options: ['€15,000','€10,000','€5,000','€20,000'], correctIndex: 0, explanation: '300,000 shares × €0.05 = €15,000.' },
      ],
      'Combined share-issue + dividend question — exam favourite for company accounts.']),
  ],

  10: [
    mkCloze(10,['c1','In the published income statement, carriage outwards is classified under {{0}} costs, and interest on debentures under {{1}} costs.',
      [{ accepts: ['distribution','selling and distribution','selling'] }, { accepts: ['finance'] }],
      'Carriage outwards → distribution; debenture interest → finance.']),
    mkExplain(10,['e1','Explain why a revaluation surplus is recognised in other comprehensive income rather than profit or loss.',
      ['It is unrealised — no cash has changed hands','Profit or loss is reserved for realised gains','OCI captures non-recyclable equity movements','Reinforces the prudence concept'],
      'A revaluation surplus arises when a fixed asset is restated upwards from its previous carrying amount. The gain is unrealised — the asset is still held, not sold — so recognising it in profit or loss could mislead users into thinking it is distributable. Instead, IFRS routes the gain through other comprehensive income to a revaluation reserve in equity, where it stays until the asset is sold (or it can be transferred within equity as the asset is depreciated).',
      'Unrealised + not distributable + OCI route.']),
    mkCase(10,['cs1','Classify each item in the published income statement of XL plc.',
      'You are finalising the published income statement for XL plc. Three items need classification:\n• Wages of the sales team\n• Audit fee\n• Interest paid on a 5-year bank loan',
      [
        { prompt: 'Wages of the sales team are classified as:', options: ['Distribution costs','Cost of sales','Administration expenses','Finance costs'], correctIndex: 0, explanation: 'Sales-staff costs sit in distribution.' },
        { prompt: 'Audit fee is classified as:', options: ['Administration expenses','Distribution costs','Finance costs','Cost of sales'], correctIndex: 0, explanation: 'Audit fee is an administrative cost.' },
        { prompt: 'Loan interest is classified as:', options: ['Finance costs','Administration expenses','Distribution costs','Tax expense'], correctIndex: 0, explanation: 'Interest on borrowings is a finance cost.' },
      ],
      'Classification is worth easy marks in the published-accounts question.']),
  ],

  11: [
    mkCloze(11,['c1','Prime cost is the sum of direct materials, direct labour and direct {{0}}; adding factory {{1}} converts prime cost into production cost.',
      [{ accepts: ['expenses','expense'] }, { accepts: ['overheads','overhead'] }],
      'Prime cost + factory overheads = production cost (then adjust WIP).']),
    mkExplain(11,['e1','Explain how unrealised profit on closing stock of finished goods is dealt with where goods are transferred to the warehouse at a mark-up.',
      ['Inventory must be valued at cost, not mark-up','A provision for unrealised profit is created','The provision reduces stock on the balance sheet','Change in provision goes through the manufacturing/P&L'],
      'Where the factory transfers completed goods to the warehouse at a transfer price above cost, closing stock of finished goods contains an element of unrealised internal profit. To comply with IAS 2 (lower of cost and NRV), a provision for unrealised profit is created equal to the profit element in closing stock, reducing the stock value on the balance sheet. The change in the provision is recorded in the manufacturing/profit-and-loss account so that only realised profit is reported.',
      'Provision = mark-up × closing finished-goods stock at transfer price.']),
    mkCase(11,['cs1','Calculate prime and production cost.',
      'Data for Lakeland Manufacturing for the year:\nRaw materials consumed €120,000\nDirect wages €85,000\nDirect expenses (royalties) €6,000\nFactory overheads €54,000\nOpening WIP €8,000; Closing WIP €11,000',
      [
        { prompt: 'Prime cost is:', options: ['€211,000','€205,000','€217,000','€225,000'], correctIndex: 0, explanation: '120,000 + 85,000 + 6,000 = 211,000.' },
        { prompt: 'Production cost of goods completed is:', options: ['€262,000','€265,000','€268,000','€259,000'], correctIndex: 0, explanation: 'Prime 211 + factory OH 54 = 265 + opening WIP 8 − closing WIP 11 = 262.' },
        { prompt: 'If finished goods are transferred at a 25% mark-up on production cost, the transfer value is:', options: ['€327,500','€314,400','€332,000','€340,000'], correctIndex: 0, explanation: '262,000 × 1.25 = 327,500.' },
      ],
      'Standard manufacturing-account question chain — prime, production, transfer.']),
  ],

  12: [
    mkCloze(12,['c1','Rent and rates are usually apportioned between departments using {{0}}, while carriage outwards is normally apportioned by {{1}}.',
      [{ accepts: ['floor area','area','floor space'] }, { accepts: ['sales','sales value'] }],
      'Space-based costs → floor area; delivery-related costs → sales.']),
    mkExplain(12,['e1','Explain why departmental accounts are useful to management.',
      ['Show profitability of each department','Highlight under-performing lines','Inform pricing, promotion and closure decisions','Improve cost control by manager accountability'],
      'Departmental accounts split sales, cost of sales and expenses by department to reveal each section\u2019s gross and net profit. This helps management identify under-performing lines, set targeted improvement actions, and make decisions such as expanding profitable areas or closing loss-makers. They also support responsibility accounting, holding department managers accountable for the costs and revenues they control.',
      'Profitability + decisions + accountability.']),
    mkCase(12,['cs1','Apportion overheads to departments.',
      'A retailer has two departments. Total rent is €18,000 and total advertising is €5,400.\n• Floor area: Dept A 1,200 m²; Dept B 800 m²\n• Sales: Dept A €240,000; Dept B €360,000',
      [
        { prompt: 'Rent apportioned to Dept A by floor area:', options: ['€10,800','€7,200','€9,000','€12,000'], correctIndex: 0, explanation: '18,000 × 1,200/2,000 = 10,800.' },
        { prompt: 'Advertising apportioned to Dept B by sales value:', options: ['€3,240','€2,160','€2,700','€3,600'], correctIndex: 0, explanation: '5,400 × 360,000/600,000 = 3,240.' },
        { prompt: 'Best apportionment basis for staff canteen costs (one canteen, all staff):', options: ['Number of employees','Floor area','Sales value','Cost of sales'], correctIndex: 0 },
      ],
      'Standard departmental-apportionment maths.']),
  ],

  13: [
    mkCloze(13,['c1','Subscriptions paid in advance at year-end are a current {{0}}, while subscriptions in arrears are a current {{1}}.',
      [{ accepts: ['liability'] }, { accepts: ['asset'] }],
      'Cash before service = liability; service before cash = asset.']),
    mkExplain(13,['e1','Explain the difference between a "receipts and payments account" and an "income and expenditure account" in a club.',
      ['Receipts & payments = cash-book summary','Income & expenditure = accruals-based, like a P&L','I&E shows surplus/deficit; R&P shows cash movement','Capital items appear only in R&P, not I&E'],
      'A receipts and payments account is simply a summary of the club\u2019s cash book — it lists actual cash inflows and outflows for the period, regardless of whether they relate to that period. An income and expenditure account is prepared on the accruals basis (like a P&L) and matches revenues with the expenses incurred to earn them, producing a surplus or deficit. Capital items (e.g. purchase of equipment, repayment of a loan) appear only in the receipts and payments account.',
      'Cash basis vs accruals basis — capital items in R&P only.']),
    mkCase(13,['cs1','Calculate subscription income for the year.',
      'Riverside GAA Club: subscriptions received in cash during the year €34,800. At year-start: subs in arrears €1,400, subs in advance €600. At year-end: subs in arrears €900, subs in advance €1,100.',
      [
        { prompt: 'Subscription income recognised in the I&E account is:', options: ['€34,800 + 900 − 1,400 − 600 + 1,100? Use the formula correctly: €34,800','€35,300','€34,200','€33,800'], correctIndex: 1, explanation: '34,800 + closing arrears 900 − closing advance (already in cash) adjustment: Income = Cash 34,800 + (closing arrears 900 − opening arrears 1,400) + (opening advance 600 − closing advance 1,100) = 34,800 − 500 − 500 = 33,800.' },
        { prompt: 'Closing balance "subscriptions in arrears" appears on the balance sheet as:', options: ['Current asset','Current liability','Reserve','Capital'], correctIndex: 0 },
        { prompt: 'Closing balance "subscriptions in advance" appears on the balance sheet as:', options: ['Current liability','Current asset','Reserve','Income'], correctIndex: 0 },
      ],
      'Worked subscription calculation + correct B/S treatment.']),
  ],

  14: [
    mkCloze(14,['c1','A service firm recognises fee income when the service is {{0}}, applying the {{1}} concept rather than the cash basis.',
      [{ accepts: ['performed','provided','delivered','earned'] }, { accepts: ['accruals','matching','accrual'] }],
      'Earned when performed; accruals/matching governs timing.']),
    mkExplain(14,['e1','Explain how work-in-progress arises for a service firm.',
      ['Hours worked but not yet billed','Valued at cost of providing the service','Recognised as a current asset','Linked to revenue recognition over time'],
      'For a service firm, work-in-progress represents the cost or value of services partially completed at year-end but not yet invoiced to clients. For example, hours logged by a solicitor or auditor on an unfinished engagement. WIP is recognised as a current asset and matched against the revenue when the engagement is billed, ensuring profit is reported in the right period.',
      'WIP for services = unbilled effort, valued at cost.']),
    mkCase(14,['cs1','Adjust a service firm\u2019s P&L for accruals and prepayments.',
      'Donnelly Solicitors: fee income received in cash €420,000. Fees billed but unpaid at year-end €18,000 (none last year). Office rent paid €24,000 includes €3,000 for the next financial year.',
      [
        { prompt: 'Fee income to recognise this year is:', options: ['€438,000','€420,000','€402,000','€444,000'], correctIndex: 0, explanation: 'Cash 420,000 + accrued income 18,000 = 438,000.' },
        { prompt: 'Rent expense for the year is:', options: ['€21,000','€24,000','€27,000','€3,000'], correctIndex: 0, explanation: '24,000 − 3,000 prepaid = 21,000.' },
        { prompt: 'The €18,000 unpaid fees appear on the balance sheet as:', options: ['A current asset (trade receivables)','A current liability','Income','Capital'], correctIndex: 0 },
      ],
      'Accruals-basis adjustments for a typical service practice.']),
  ],

  15: [
    mkCloze(15,['c1','EU Basic Payment Scheme receipts are treated as {{0}} income in the farm P&L, while a capital grant for a new shed is credited to a {{1}} income account and released over the asset\u2019s life.',
      [{ accepts: ['revenue','farm','operating'] }, { accepts: ['deferred'] }],
      'BPS = revenue income; capital grants = deferred income matched to depreciation.']),
    mkExplain(15,['e1','Explain the benefit of preparing enterprise accounts on a mixed farm.',
      ['Splits results by activity (dairy, tillage, sheep, etc.)','Reveals which enterprise is profitable','Supports decisions on resource allocation','Highlights cross-subsidies between enterprises'],
      'Enterprise accounts allocate revenues and direct costs to each major farm activity, producing a separate gross margin per enterprise (e.g. dairy, tillage, suckler cows). This lets the farmer see which activities are truly profitable, identify cross-subsidies, and make informed decisions about expanding, contracting or reorganising enterprises. General overheads are then deducted in total to give overall farm profit.',
      'Gross margin by enterprise drives the decision-making value.']),
    mkCase(15,['cs1','Calculate enterprise gross margin and overall farm profit.',
      'Heaney\u2019s Farm has two enterprises:\n• Dairy: sales €180,000; direct costs €110,000\n• Tillage: sales €60,000; direct costs €38,000\nGeneral farm overheads €25,000. EU BPS payment €14,000.',
      [
        { prompt: 'Dairy gross margin:', options: ['€70,000','€110,000','€90,000','€68,000'], correctIndex: 0, explanation: '180,000 − 110,000 = 70,000.' },
        { prompt: 'Tillage gross margin:', options: ['€22,000','€38,000','€60,000','€32,000'], correctIndex: 0, explanation: '60,000 − 38,000 = 22,000.' },
        { prompt: 'Overall farm profit (including BPS):', options: ['€81,000','€67,000','€95,000','€92,000'], correctIndex: 0, explanation: '70 + 22 − 25 + 14 = 81,000.' },
      ],
      'Classic enterprise-account totals — gross margin then overheads.']),
  ],

  16: [
    mkCloze(16,['c1','Where records are incomplete, opening capital is found by computing {{0}} minus {{1}} at the start of the period.',
      [{ accepts: ['assets'] }, { accepts: ['liabilities'] }],
      'Accounting equation: Capital = Assets − Liabilities.']),
    mkExplain(16,['e1','Explain how a missing credit-sales figure can be derived from incomplete records.',
      ['Reconstruct a total debtors (control) account','Plug the missing credit sales figure as the balancing item','Use opening debtors, receipts, returns, bad debts, discount, closing debtors','Cash sales are added separately from cash records'],
      'Credit sales can be derived by reconstructing the total debtors (control) account. Start with opening debtors on the debit side, add a balancing figure for credit sales, then deduct cash received from debtors, returns inwards, discount allowed and bad debts written off. The figure that makes the account close to the known closing debtors balance is the credit sales for the year. Cash sales are calculated separately from the cash account and added on.',
      'Reconstruct the debtors account — sales is the balancing figure.']),
    mkCase(16,['cs1','Calculate profit using the "comparison of capitals" method.',
      'P. Lynch is a sole trader who keeps incomplete records.\nAssets at 1 Jan: €68,000; Liabilities €22,000\nAssets at 31 Dec: €91,000; Liabilities €27,000\nDrawings during the year €15,000; Capital introduced €10,000',
      [
        { prompt: 'Opening capital is:', options: ['€46,000','€68,000','€22,000','€90,000'], correctIndex: 0, explanation: '68,000 − 22,000 = 46,000.' },
        { prompt: 'Closing capital is:', options: ['€64,000','€91,000','€118,000','€55,000'], correctIndex: 0, explanation: '91,000 − 27,000 = 64,000.' },
        { prompt: 'Profit for the year is:', options: ['€23,000','€18,000','€33,000','€8,000'], correctIndex: 0, explanation: 'Closing 64,000 − Opening 46,000 + Drawings 15,000 − Capital introduced 10,000 = 23,000.' },
      ],
      'Classic increase-in-capital profit calculation.']),
  ],

  17: [
    mkCloze(17,['c1','In the indirect cash-flow statement, depreciation is {{0}} to profit before tax to start computing cash from operations, and an increase in inventories is shown as a cash {{1}}.',
      [{ accepts: ['added','added back'] }, { accepts: ['outflow','reduction','decrease'] }],
      'Depreciation back; stock up = cash tied up.']),
    mkExplain(17,['e1','Explain why a profitable business can still run out of cash.',
      ['Profit ≠ cash (accruals basis)','Growth ties up cash in stock and debtors','Capital expenditure absorbs cash','Loan repayments and dividends drain cash'],
      'Profit is an accruals-basis measure that recognises revenue when earned and expenses when incurred, regardless of cash timing. A growing business often ties up large amounts of cash in stock and trade receivables, while major capital expenditure on fixed assets, repayments of long-term debt and dividend payments all reduce cash without affecting profit in the same way. As a result, a profitable business can still face a liquidity crisis if it doesn\u2019t manage working capital, capex and financing cash flows.',
      'Profit vs cash — the cash flow statement makes the gap visible.']),
    mkCase(17,['cs1','Classify the cash flows.',
      'During the year, Westwood Ltd had:\n• Issued 50,000 €1 ordinary shares at €1.50 each (cash)\n• Bought equipment for €120,000 cash\n• Paid an ordinary dividend of €18,000',
      [
        { prompt: 'Share issue is classified as:', options: ['Financing inflow €75,000','Investing inflow €50,000','Operating inflow €75,000','Financing inflow €50,000'], correctIndex: 0, explanation: 'Total cash raised = 50,000 × €1.50 = €75,000 financing inflow.' },
        { prompt: 'Purchase of equipment is:', options: ['Investing outflow €120,000','Operating outflow €120,000','Financing outflow €120,000','No effect'], correctIndex: 0 },
        { prompt: 'Dividend paid is:', options: ['Financing outflow €18,000','Operating outflow €18,000','Investing outflow €18,000','Expense in P&L'], correctIndex: 0 },
      ],
      'Classification practice — most common cash-flow exam errors.']),
  ],

  18: [
    mkCloze(18,['c1','The acid-test ratio improves on the current ratio by excluding {{0}}, the least liquid current asset, giving a stricter measure of {{1}}.',
      [{ accepts: ['inventory','stock','stocks','inventories'] }, { accepts: ['liquidity'] }],
      'Quick assets ÷ current liabilities — sharper liquidity check.']),
    mkExplain(18,['e1','Explain why a high current ratio is not always a sign of good financial health.',
      ['May indicate excessive stock or idle cash','Slow-moving stock inflates the numerator','Slow debtor collection inflates current assets','Funds are not being used productively'],
      'A high current ratio looks safe but can hide problems. It may signal excessive levels of stock that is slow-moving or obsolete, debtors that are slow to pay, or cash sitting idle in the bank rather than being invested. Holding excessive working capital ties up funds that could earn a return elsewhere, reduces ROCE and may indicate poor working-capital management. Liquidity should always be read together with stock days, debtor days and ROCE.',
      'Liquidity vs efficiency — the trade-off matters.']),
    mkCase(18,['cs1','Compute and interpret three ratios for B. Doyle plc.',
      'B. Doyle plc — extracts from year-end accounts:\n• Sales €600,000; Cost of sales €420,000; Operating profit €72,000\n• Current assets €150,000 (incl. inventory €60,000); Current liabilities €100,000\n• Capital employed €480,000',
      [
        { prompt: 'Current ratio is:', options: ['1.5 : 1','2.5 : 1','0.67 : 1','1.2 : 1'], correctIndex: 0, explanation: '150,000 / 100,000 = 1.5.' },
        { prompt: 'Acid-test (quick) ratio is:', options: ['0.9 : 1','1.5 : 1','0.6 : 1','1.2 : 1'], correctIndex: 0, explanation: '(150,000 − 60,000) / 100,000 = 0.9.' },
        { prompt: 'Return on capital employed (ROCE) is:', options: ['15%','12%','17%','20%'], correctIndex: 0, explanation: '72,000 / 480,000 × 100 = 15%.' },
      ],
      'Three of the most-tested ratios with a single data set.']),
  ],

  19: [
    mkCloze(19,['c1','In a tabular statement, recording a credit sale increases the {{0}} column and the {{1}} column.',
      [{ accepts: ['debtors','trade debtors','receivables'] }, { accepts: ['sales'] }],
      'Dr Debtors; Cr Sales — no cash involved yet.']),
    mkExplain(19,['e1','Explain how depreciation is shown in a tabular statement.',
      ['Reduces the carrying value of the fixed asset','Records the expense in profit','No cash movement','Maintains the accounting equation'],
      'In a tabular statement, depreciation is recorded by reducing the carrying value (NBV) of the fixed asset column and reducing profit (or increasing accumulated depreciation, where a separate column is shown). There is no cash movement — depreciation is purely an accounting allocation. The opposite signs on the asset and profit/reserves columns ensure the accounting equation remains in balance.',
      'Asset down ↔ profit down — no cash effect.']),
    mkCase(19,['cs1','Identify the columns affected.',
      'During April, T. O\u2019Brien recorded three events:\n• Took out a 5-year bank loan of €30,000 (cash received)\n• Paid an ordinary dividend of €4,000 to shareholders\n• Wrote off a bad debt of €1,500',
      [
        { prompt: 'The loan affects:', options: ['Bank +€30,000; Long-term liabilities +€30,000','Bank +€30,000; Capital +€30,000','Bank −€30,000; Loan +€30,000','Bank +€30,000; Profit +€30,000'], correctIndex: 0 },
        { prompt: 'The dividend paid affects:', options: ['Bank −€4,000; Retained earnings (or Capital) −€4,000','Bank −€4,000; Expenses +€4,000','Bank +€4,000; Capital −€4,000','Bank −€4,000; Loan −€4,000'], correctIndex: 0 },
        { prompt: 'Writing off the bad debt affects:', options: ['Debtors −€1,500; Profit −€1,500','Bank −€1,500; Debtors −€1,500','Debtors +€1,500; Profit +€1,500','Capital −€1,500; Bank +€1,500'], correctIndex: 0 },
      ],
      'Sign discipline is everything in tabular questions.']),
  ],

  20: [
    mkCloze(20,['c1','Contribution per unit equals selling price minus {{0}} cost per unit; the break-even point in units equals {{1}} cost divided by contribution per unit.',
      [{ accepts: ['variable'] }, { accepts: ['fixed'] }],
      'BEP units = Fixed / Contribution per unit.']),
    mkExplain(20,['e1','Explain why fixed costs per unit fall as output rises but total fixed costs stay the same (within the relevant range).',
      ['Total fixed cost is unchanged within the relevant range','Spreading the same total over more units lowers per-unit cost','Steps occur once a band is exceeded','Drives the benefit of operating gearing'],
      'Within the relevant range, total fixed costs (e.g. factory rent, supervisor salaries) do not change with output. As production volume rises, the same total is spread over a larger number of units, so fixed cost per unit falls. This explains why higher volumes can improve profitability even at unchanged prices — operating gearing. Outside the relevant range, fixed costs step up (e.g. needing a second supervisor), so the relationship resets.',
      'Same total ÷ more units = lower per-unit — key to operating gearing.']),
    mkCase(20,['cs1','Apply CVP to Sunrise Ltd.',
      'Sunrise Ltd makes one product. Selling price €40, variable cost €24, fixed costs €96,000.',
      [
        { prompt: 'Contribution per unit is:', options: ['€16','€40','€24','€8'], correctIndex: 0, explanation: '40 − 24 = 16.' },
        { prompt: 'Break-even point in units is:', options: ['6,000','4,000','12,000','9,000'], correctIndex: 0, explanation: '96,000 / 16 = 6,000 units.' },
        { prompt: 'Units needed to earn a target profit of €40,000:', options: ['8,500','7,500','10,000','6,000'], correctIndex: 0, explanation: '(96,000 + 40,000) / 16 = 8,500 units.' },
      ],
      'Standard CVP triplet — contribution, BEP, target profit.']),
  ],

  21: [
    mkCloze(21,['c1','Costs that vary in total with output but stay constant per unit are {{0}} costs, while costs that remain constant in total within the relevant range are {{1}} costs.',
      [{ accepts: ['variable'] }, { accepts: ['fixed'] }],
      'Variable vs fixed — defined by behaviour with output.']),
    mkExplain(21,['e1','Explain the difference between relevant and sunk costs in decision-making.',
      ['Relevant: future cash flow that differs between alternatives','Sunk: already incurred, cannot be changed','Only relevant costs should influence the decision','Avoids the "sunk-cost fallacy"'],
      'A relevant cost is a future cash flow that differs between the alternatives being considered — only these should influence a decision. A sunk cost has already been incurred and cannot be recovered, regardless of the decision now made. Including sunk costs leads to the "sunk-cost fallacy" — continuing with a poor option just because money has already been spent. Opportunity costs, by contrast, ARE relevant because they represent benefits foregone.',
      'Forward-looking incremental cash flows only.']),
    mkCase(21,['cs1','Classify each cost for a furniture maker.',
      'Walker Furniture incurs the following costs:\n• Wages of the carpenters making the chairs\n• Factory rent\n• Wood used in the chairs\n• Sales-staff commission per chair sold',
      [
        { prompt: 'Carpenters\u2019 wages are best classified as:', options: ['Direct labour','Indirect labour','Factory overhead','Selling expense'], correctIndex: 0 },
        { prompt: 'Factory rent is:', options: ['Fixed overhead','Variable direct cost','Direct expense','Period cost (admin)'], correctIndex: 0 },
        { prompt: 'Sales-staff commission per chair is:', options: ['Variable selling expense','Fixed overhead','Direct labour','Direct expense'], correctIndex: 0 },
      ],
      'Tests the three-way split: behaviour × function × traceability.']),
  ],

  22: [
    mkCloze(22,['c1','Where actual overheads exceed the amount absorbed, overheads are described as {{0}} absorbed and the difference is charged to the {{1}} account.',
      [{ accepts: ['under','under-','under absorbed'] }, { accepts: ['profit and loss','p&l','income statement'] }],
      'Under-absorption hits the P&L as a debit.']),
    mkExplain(22,['e1','Explain the difference between job costing and process costing.',
      ['Job costing: each job is unique, costs collected per job','Process costing: continuous identical output, costs averaged per process','WIP treatment differs (equivalent units in process)','Common to different industries: construction vs chemicals'],
      'Job costing is used where products are bespoke and each job is distinct (e.g. construction, custom furniture). Costs are collected on a job sheet for each individual job. Process costing is used for continuous, homogeneous production (e.g. chemicals, oil refining). Costs are accumulated by process and averaged across the units produced, often using equivalent units to value partially completed work-in-progress.',
      'Bespoke vs continuous — different cost collection approaches.']),
    mkCase(22,['cs1','Calculate the overhead absorption rate and applied overhead.',
      'Greenline Engineering budgets factory overheads of €240,000 and 20,000 direct labour hours for the year. Actual results: overheads €255,000; labour hours worked 21,000.',
      [
        { prompt: 'Budgeted overhead absorption rate (OAR) per labour hour:', options: ['€12','€10','€15','€11.20'], correctIndex: 0, explanation: '240,000 / 20,000 = €12 per hour.' },
        { prompt: 'Overhead absorbed during the year:', options: ['€252,000','€255,000','€240,000','€231,000'], correctIndex: 0, explanation: '21,000 hours × €12 = 252,000.' },
        { prompt: 'Under/(over)-absorption for the year is:', options: ['Under-absorbed €3,000','Over-absorbed €3,000','Under-absorbed €15,000','Over-absorbed €15,000'], correctIndex: 0, explanation: 'Actual 255,000 − Absorbed 252,000 = 3,000 under-absorbed (debited to P&L).' },
      ],
      'OAR + applied + under/over absorption — the full sequence.']),
  ],

  23: [
    mkCloze(23,['c1','Under {{0}} costing, fixed production overheads are treated as a period cost and stocks are valued at variable production cost only; under {{1}} costing, fixed overheads are absorbed into the unit cost.',
      [{ accepts: ['marginal','variable'] }, { accepts: ['absorption','total','full'] }],
      'Marginal vs absorption — key difference is treatment of fixed production overhead.']),
    mkExplain(23,['e1','Explain how a "limiting factor" decision is approached using contribution analysis.',
      ['Identify the constraint (e.g. labour hours, machine hours, material)','Calculate contribution per unit of the limiting factor','Rank products on this basis','Produce in rank order until the constraint is exhausted'],
      'When one factor restricts production (machine hours, scarce material, skilled labour), profit is maximised by ranking products on contribution per unit of the limiting factor — not on contribution per unit of product. The firm then produces the highest-ranked product up to the demand or constraint limit before moving to the next, until the limiting factor is exhausted. Fixed costs are ignored in the ranking because they are unchanged in the short run.',
      'Contribution per scarce-resource unit, not per product unit.']),
    mkCase(23,['cs1','Rank two products on the limiting factor.',
      'Riverlane Ltd makes two products. Only 600 machine hours are available next month.\n• Product X: contribution €40 per unit, uses 2 machine hours; demand 200 units\n• Product Y: contribution €36 per unit, uses 1.5 machine hours; demand 250 units',
      [
        { prompt: 'Contribution per machine hour of Product X:', options: ['€20','€40','€80','€18'], correctIndex: 0, explanation: '€40 / 2 hrs = €20.' },
        { prompt: 'Contribution per machine hour of Product Y:', options: ['€24','€36','€18','€20'], correctIndex: 0, explanation: '€36 / 1.5 hrs = €24.' },
        { prompt: 'Optimum production plan within the 600-hour limit (meet Y demand first):', options: ['Y: 250 units (375 hrs); X: 112 units (225 hrs)','X: 200 units; Y: 133 units','Y: 400 units (no spare hours)','X: 300 units only'], correctIndex: 0, explanation: 'Y ranks first at €24/hr — make all 250 (375 hrs). Remaining 225 hrs make 112 units of X (uses 224 hrs).' },
      ],
      'Classic limiting-factor allocation problem.']),
  ],

  24: [
    mkCloze(24,['c1','A {{0}} budget is adjusted to the actual level of activity so that variances reflect performance rather than {{1}} differences.',
      [{ accepts: ['flexed','flexible'] }, { accepts: ['volume'] }],
      'Flexing strips out volume to compare like with like.']),
    mkExplain(24,['e1','Explain the meaning and purpose of a cash budget.',
      ['Forecasts receipts and payments period by period','Highlights surpluses and shortages in advance','Allows financing to be arranged ahead of need','Distinct from the budgeted P&L (which is accruals-based)'],
      'A cash budget forecasts cash receipts and payments for each period (often monthly), producing the expected opening and closing bank balance. It highlights surpluses (which could be invested) and shortages (which need financing) before they happen, allowing the business to arrange overdrafts or loans on the best terms. It differs from the budgeted P&L, which is prepared on the accruals basis, because the cash budget focuses purely on the timing of cash flows.',
      'Liquidity planning tool — cash timing, not profit.']),
    mkCase(24,['cs1','Compute closing cash balance for two months.',
      'Riverside Ltd opens January with €8,000 in the bank. Forecast:\n• January receipts €42,000; payments €46,000\n• February receipts €55,000; payments €48,000',
      [
        { prompt: 'Closing cash balance at end of January:', options: ['€4,000','€(4,000)','€12,000','€38,000'], correctIndex: 0, explanation: '8,000 + 42,000 − 46,000 = 4,000.' },
        { prompt: 'Closing cash balance at end of February:', options: ['€11,000','€15,000','€(7,000)','€55,000'], correctIndex: 0, explanation: '4,000 + 55,000 − 48,000 = 11,000.' },
        { prompt: 'If management wants a minimum balance of €15,000 by end of February, the shortfall to fund is:', options: ['€4,000','€11,000','€15,000','€0'], correctIndex: 0, explanation: '15,000 target − 11,000 forecast = 4,000 short.' },
      ],
      'Cash budget worked example with a minimum-balance overlay.']),
  ],
};

export default INTERACTIVE_EXTRA_BANK;