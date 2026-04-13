// ═══════════════════════════════════════════════════════════════════
// 24-Chapter Theory Content Model — LC HL Accounting
// ═══════════════════════════════════════════════════════════════════

export type Block = 'A' | 'B' | 'C' | 'D';

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface ContentBlock {
  type: 'prose' | 'concept' | 'example' | 'solution' | 'keyterm' | 'watchout' | 'examtip' | 'table' | 'tAccount';
  variant?: 'blue' | 'green' | 'amber' | 'red';
  title?: string;
  html: string;
}

export interface SubTopic {
  id: string;
  title: string;
  body: ContentBlock[];
  keyTerms?: KeyTerm[];
}

export interface Section {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

export interface Chapter {
  id: number;
  block: Block;
  title: string;
  description: string;
  estimatedMinutes: number;
  sections: Section[];
  related: number[];
}

export const BLOCK_LABELS: Record<Block, string> = {
  A: 'Foundations',
  B: 'Final Accounts & Errors',
  C: 'Other Entities & Interpretation',
  D: 'Management Accounting',
};

export const BLOCK_DESCRIPTIONS: Record<Block, string> = {
  A: 'Core concepts, bookkeeping, VAT, depreciation, and control accounts.',
  B: 'Sole trader, company, manufacturing final accounts, errors, and regulatory framework.',
  C: 'Clubs, service firms, farms, incomplete records, cash flow, ratios, and tabular statements.',
  D: 'Cost classification, product costing, marginal costing, and budgeting.',
};

// ═══════════════════════════════════════════════════════════════════
// CHAPTERS
// ═══════════════════════════════════════════════════════════════════

export const CHAPTERS: Chapter[] = [
  // ──────────────────────────────────────────────────
  // BLOCK A — FOUNDATIONS (Chapters 1-5)
  // ──────────────────────────────────────────────────
  {
    id: 1, block: 'A',
    title: 'Introduction to Accounting',
    description: 'Objectives, concepts, bases and policies — the principles underpinning all financial reporting.',
    estimatedMinutes: 22,
    related: [2, 8, 10],
    sections: [
      {
        id: '1.1', title: 'Objectives of Financial Information',
        subTopics: [
          {
            id: '1.1.1', title: 'Financial vs Management Accounting',
            keyTerms: [
              { term: 'Financial Accounting', definition: 'Focuses on past events — collecting and recording financial transactions to show performance and financial position.' },
              { term: 'Management Accounting', definition: 'Concerned with future financial decisions as well as past transactions — provides information for planning, control and decision-making.' },
            ],
            body: [
              { type: 'prose', html: '<p>Accounting is the art of preparing financial information for all organisations. There are two main accounting areas — <strong>financial</strong> and <strong>management</strong>.</p>' },
              { type: 'concept', variant: 'blue', title: 'Financial Accounting', html: '<p>Financial accounting focuses on <strong>past</strong> events. Financial statements show: the performance of the organisation over the accounting period (generally one year), and the financial position at the end of that period.</p><p>The financial statements prepared consist of: a <strong>trading account</strong>, a <strong>profit and loss account</strong>, a <strong>balance sheet</strong>, and a <strong>cash flow statement</strong>.</p>' },
              { type: 'concept', variant: 'green', title: 'Objectives of Financial Accounting', html: '<p>1. To provide financial information which can be used for assessing the organisation and making decisions.</p><p>2. To prepare the relevant financial statements in accordance with rules and regulations as laid down by accounting regulatory bodies.</p>' },
              { type: 'concept', variant: 'amber', title: 'Management Accounting', html: '<p>Unlike financial accounting, management accounting is concerned with <strong>future</strong> financial decisions as well as past transactions. It provides information so that the organisation can plan, control and make decisions. Covered in Chapters 20-24.</p>' },
            ]
          },
          {
            id: '1.1.2', title: 'Qualities of Financial Information',
            keyTerms: [
              { term: 'Relevant', definition: 'The information should meet exactly the requirements of the user(s).' },
              { term: 'Reliable', definition: 'The information should be certified by either a director or an auditor.' },
              { term: 'Comparable', definition: 'Information prepared on a consistent basis so results can be compared year to year and business to business.' },
              { term: 'Understandable', definition: 'Information should be clear, concise and capable of being easily understood by the user(s).' },
            ],
            body: [
              { type: 'prose', html: '<p>Financial information must have four main qualities to benefit an organisation and its users:</p>' },
              { type: 'concept', variant: 'blue', title: 'The Four Qualities', html: '<p><strong>Relevant</strong> — meets exactly the requirements of the user(s).</p><p><strong>Reliable</strong> — certified by either a director or an auditor.</p><p><strong>Comparable</strong> — prepared on a consistent basis from one period to the next.</p><p><strong>Understandable</strong> — clear, concise and easily understood.</p>' },
            ]
          },
          {
            id: '1.1.3', title: 'Users of Financial Information',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>User</th><th>Why They Need Financial Information</th></tr></thead><tbody><tr><td><strong>Owners / Shareholders</strong></td><td>To assess profitability, return on investment, and whether to continue investing.</td></tr><tr><td><strong>Managers</strong></td><td>For planning, controlling, and decision-making within the business.</td></tr><tr><td><strong>Employees / Trade Unions</strong></td><td>To assess job security, wage negotiations, and future prospects.</td></tr><tr><td><strong>Creditors / Suppliers</strong></td><td>To assess whether the business can pay its debts on time.</td></tr><tr><td><strong>Banks / Lenders</strong></td><td>To decide whether to grant or continue loans; assess the ability to repay.</td></tr><tr><td><strong>Revenue Commissioners</strong></td><td>To ensure correct tax is paid (corporation tax, VAT, PAYE).</td></tr><tr><td><strong>Potential Investors</strong></td><td>To decide whether to invest in the business.</td></tr><tr><td><strong>Government / CSO</strong></td><td>For national statistics, economic planning, and policy-making.</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '1.2', title: 'Accounting Concepts',
        subTopics: [
          {
            id: '1.2.1', title: 'The Fundamental Concepts',
            keyTerms: [
              { term: 'Going Concern', definition: 'The assumption that a business will continue to operate for the foreseeable future — assets are valued at cost, not forced-sale value.' },
              { term: 'Accruals (Matching)', definition: 'Income and expenses are matched to the period they relate to, not when cash is received or paid.' },
              { term: 'Prudence (Conservatism)', definition: 'Do not anticipate profits; provide for all foreseeable losses. Recognise revenue only when earned; recognise expenses as soon as they are known.' },
              { term: 'Consistency', definition: 'Once an accounting method is adopted, it should be applied consistently from year to year.' },
              { term: 'Business Entity', definition: 'The business is treated as separate from its owner(s) — personal transactions of the owner are not included in business records.' },
              { term: 'Money Measurement', definition: 'Only items that can be expressed in monetary terms are recorded in accounts.' },
              { term: 'Materiality', definition: 'Items of insignificant value need not be precisely accounted for — e.g. a small waste paper bin can be expensed immediately rather than depreciated.' },
              { term: 'Dual Aspect', definition: 'Every transaction has two effects — a debit and a credit of equal value (the basis of double-entry bookkeeping).' },
              { term: 'Realisation', definition: 'Revenue is only recognised when earned — when goods/services have been delivered, not when cash is received.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Going Concern', html: '<p>The <strong>going concern</strong> concept assumes the business will continue operating indefinitely. This means assets are valued at <strong>historical cost</strong> (what they cost), not at what they could be sold for in a fire sale.</p><p>If the business is NOT a going concern (i.e. closing down), assets must be valued at <strong>net realisable value</strong> (break-up basis).</p>' },
              { type: 'concept', variant: 'green', title: 'Accruals / Matching', html: '<p>Income earned during the period must be matched with the expenses incurred in earning that income, regardless of when cash was received or paid.</p><p>Example: Insurance paid in advance (a prepayment) is deducted from the expense. Wages owed but not yet paid (an accrual) are added to the expense.</p>' },
              { type: 'concept', variant: 'amber', title: 'Prudence', html: '<p>Never anticipate profits — only recognise them when realised. Always provide for ALL foreseeable losses, even if they haven\'t crystallised yet.</p><p>Example: Value stock at the <strong>lower</strong> of cost or net realisable value. Create provisions for bad debts even if the debt has not yet been proven bad.</p>' },
              { type: 'concept', variant: 'red', title: 'Consistency', html: '<p>Once an accounting method is chosen (e.g. straight-line depreciation for machinery), it should be applied consistently from year to year.</p><p>This ensures financial statements are <strong>comparable</strong> over time. If a change is made, it must be disclosed and justified.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Questions on accounting concepts often ask you to identify which concept applies to a given scenario. Know the <strong>definition</strong> of each concept and be able to give a <strong>practical example</strong>.</p>' },
            ]
          },
        ]
      },
      {
        id: '1.3', title: 'Accounting Bases & Policies',
        subTopics: [
          {
            id: '1.3.1', title: 'Bases vs Policies',
            keyTerms: [
              { term: 'Accounting Bases', definition: 'The various methods that may be used to apply accounting concepts — e.g. different depreciation methods are alternative bases.' },
              { term: 'Accounting Policies', definition: 'The specific bases chosen by an organisation from the available options — these are disclosed in the notes to the accounts.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Accounting Bases', html: '<p>Accounting bases are the <strong>various methods available</strong> for applying accounting concepts to transactions. For example:</p><p>Depreciation: straight-line, reducing balance, or sum of digits.</p><p>Stock valuation: FIFO, LIFO, or weighted average.</p><p>Each of these is an <strong>accounting base</strong>.</p>' },
              { type: 'concept', variant: 'green', title: 'Accounting Policies', html: '<p>An accounting policy is the <strong>specific base chosen</strong> by a particular business. For example:</p><p>"We depreciate motor vehicles at 20% per annum on a reducing balance basis." This is a <strong>policy</strong> — it\'s the specific method chosen from the available bases.</p><p>Policies must be <strong>disclosed</strong> in the notes to the financial statements.</p>' },
              { type: 'watchout', title: 'Bases vs Policies', html: '<p><strong>Bases</strong> = the menu of options available. <strong>Policies</strong> = what the business actually chose from that menu.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 2 ──
  {
    id: 2, block: 'A',
    title: 'Accounting Records',
    description: 'Double-entry, books of first entry, VAT, trial balance, final accounts, capital vs revenue, statutory deductions, accruals, prepayments, bad debts.',
    estimatedMinutes: 45,
    related: [1, 3, 5, 6],
    sections: [
      {
        id: '2.1', title: 'Part A: Double-Entry & Books of First Entry',
        subTopics: [
          {
            id: '2.1.1', title: 'The Double-Entry System',
            keyTerms: [
              { term: 'Double-Entry Bookkeeping', definition: 'Every transaction is recorded with a debit entry in one account and a credit entry in another account of equal value.' },
              { term: 'Debit', definition: 'Left side of an account. Records increases in assets and expenses, and decreases in liabilities, capital, and income.' },
              { term: 'Credit', definition: 'Right side of an account. Records increases in liabilities, capital, and income, and decreases in assets and expenses.' },
              { term: 'Ledger', definition: 'A book of accounts where all transactions are recorded using the double-entry system.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'DEAD / CLIC Rule', html: '<p>Use this memory aid to determine which side of the T-account an entry goes on:</p><p><strong>DEAD (Debit):</strong> Expenses, Assets, Drawings — all increase on the DEBIT side.</p><p><strong>CLIC (Credit):</strong> Capital, Liabilities, Income, Creditors — all increase on the CREDIT side.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Account Type</th><th>Increases on</th><th>Decreases on</th></tr></thead><tbody><tr><td>Assets</td><td>Debit</td><td>Credit</td></tr><tr><td>Expenses</td><td>Debit</td><td>Credit</td></tr><tr><td>Drawings</td><td>Debit</td><td>Credit</td></tr><tr><td>Liabilities</td><td>Credit</td><td>Debit</td></tr><tr><td>Capital</td><td>Credit</td><td>Debit</td></tr><tr><td>Income</td><td>Credit</td><td>Debit</td></tr></tbody></table>' },
            ]
          },
          {
            id: '2.1.2', title: 'Books of First Entry (Day Books)',
            keyTerms: [
              { term: 'Purchases Day Book', definition: 'Records all credit purchases of goods for resale.' },
              { term: 'Sales Day Book', definition: 'Records all credit sales of goods.' },
              { term: 'Purchases Returns Day Book', definition: 'Records goods returned to suppliers (credit purchases sent back).' },
              { term: 'Sales Returns Day Book', definition: 'Records goods returned by customers.' },
              { term: 'General Journal', definition: 'Records transactions not covered by other day books — e.g. opening entries, corrections, bad debt write-offs.' },
              { term: 'Cash Book', definition: 'Records all cash and bank transactions. Also serves as the cash/bank ledger accounts.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Day Book</th><th>Records</th><th>Posted To</th></tr></thead><tbody><tr><td>Purchases Day Book</td><td>Credit purchases of stock</td><td>Dr Purchases, Cr Individual creditors</td></tr><tr><td>Sales Day Book</td><td>Credit sales of stock</td><td>Dr Individual debtors, Cr Sales</td></tr><tr><td>Purchases Returns Book</td><td>Goods returned to suppliers</td><td>Dr Individual creditors, Cr Purchase returns</td></tr><tr><td>Sales Returns Book</td><td>Goods returned by customers</td><td>Dr Sales returns, Cr Individual debtors</td></tr><tr><td>Cash Book</td><td>All cash/bank receipts & payments</td><td>Acts as Cash and Bank ledger accounts</td></tr><tr><td>General Journal</td><td>Non-routine entries, corrections, year-end adjustments</td><td>Various ledger accounts</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '2.2', title: 'Part A: VAT & Trial Balance',
        subTopics: [
          {
            id: '2.2.1', title: 'Value Added Tax (VAT)',
            keyTerms: [
              { term: 'VAT', definition: 'A tax charged on goods and services at each stage of production and distribution. The business collects VAT on behalf of Revenue.' },
              { term: 'Output VAT', definition: 'VAT charged on sales — a liability owed to Revenue.' },
              { term: 'Input VAT', definition: 'VAT paid on purchases — reclaimable from Revenue.' },
              { term: 'VAT Liability', definition: 'Output VAT minus Input VAT. If positive, owed to Revenue. If negative, owed by Revenue to the business.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'How VAT Works', html: '<p><strong>Output VAT</strong> = VAT charged on sales to customers → <strong>liability</strong> (owed to Revenue).</p><p><strong>Input VAT</strong> = VAT paid on purchases/expenses → can be <strong>reclaimed</strong> from Revenue.</p><p><strong>VAT due to Revenue</strong> = Output VAT − Input VAT</p><p>If Input VAT > Output VAT, Revenue owes the business a refund.</p>' },
              { type: 'watchout', title: 'VAT on Capital Purchases', html: '<p>VAT paid on the purchase of a fixed asset (e.g. machinery, vehicles, buildings) is <strong>reclaimable</strong>. When a question says "purchased a building including VAT", you must separate the VAT from the cost.</p><p>Cost excluding VAT = Total ÷ (1 + VAT rate). The VAT portion reduces the VAT liability.</p>' },
            ]
          },
          {
            id: '2.2.2', title: 'The Trial Balance',
            keyTerms: [
              { term: 'Trial Balance', definition: 'A list of all ledger account balances at a given date. Total debits must equal total credits. Used as the starting point for preparing final accounts.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Purpose of the Trial Balance', html: '<p>1. To check the <strong>arithmetical accuracy</strong> of the double-entry system (debits should equal credits).</p><p>2. To provide a <strong>starting point</strong> for preparing the final accounts.</p><p>3. To help locate <strong>errors</strong> (though not all errors are revealed by the TB — see Chapter 7).</p>' },
              { type: 'concept', variant: 'amber', title: 'DEAL / CLIP Classification', html: '<p>Use this to classify trial balance items:</p><p><strong>Debit side (DEAL):</strong> Drawings, Expenses, Assets, Losses</p><p><strong>Credit side (CLIP):</strong> Capital, Liabilities, Income, Profits (provisions)</p>' },
            ]
          },
        ]
      },
      {
        id: '2.3', title: 'Part B: Capital vs Revenue',
        subTopics: [
          {
            id: '2.3.1', title: 'Capital and Revenue Expenditure',
            keyTerms: [
              { term: 'Capital Expenditure', definition: 'Spending on acquiring or improving fixed assets — gives benefit for more than one year. Appears on the Balance Sheet.' },
              { term: 'Revenue Expenditure', definition: 'Day-to-day running costs of the business — gives benefit for one accounting period only. Appears in the P&L.' },
              { term: 'Capital Income', definition: 'Income from the sale of a fixed asset or capital introduced by the owner — appears on the Balance Sheet.' },
              { term: 'Revenue Income', definition: 'Income earned from normal trading activities — appears in the P&L account.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Capital</th><th>Revenue</th></tr></thead><tbody><tr><td>Purchase of premises</td><td>Repairs and maintenance</td></tr><tr><td>Purchase of equipment</td><td>Electricity, heating</td></tr><tr><td>Cost of extending a building</td><td>Wages, salaries</td></tr><tr><td>Legal costs of acquiring property</td><td>Advertising, insurance</td></tr><tr><td>Delivery cost of new machine</td><td>Motor running costs</td></tr><tr><td>Installation costs of equipment</td><td>Stationery</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Tricky Cases', html: '<p><strong>Repairs</strong> to an asset = revenue (maintains existing condition).</p><p><strong>Improvements</strong> to an asset = capital (enhances the asset beyond original condition).</p><p><strong>Delivery charges on a new machine</strong> = capital (part of getting the asset ready for use).</p><p><strong>Delivery charges on goods sold to customers</strong> = revenue (carriage outwards).</p>' },
            ]
          },
        ]
      },
      {
        id: '2.4', title: 'Part C: Statutory Deductions',
        subTopics: [
          {
            id: '2.4.1', title: 'PAYE, PRSI & USC',
            keyTerms: [
              { term: 'PAYE', definition: 'Pay As You Earn — income tax deducted from employees\' wages at source by the employer and remitted to Revenue.' },
              { term: 'PRSI', definition: 'Pay Related Social Insurance — contributions by employees and employers for social welfare benefits.' },
              { term: 'USC', definition: 'Universal Social Charge — a tax on gross income payable by individuals.' },
              { term: 'Gross Pay', definition: 'Total pay before any deductions.' },
              { term: 'Net Pay', definition: 'Take-home pay after all deductions (PAYE, PRSI, USC, pension, etc.).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Employer vs Employee Contributions', html: '<p><strong>Employee deductions</strong> (deducted FROM wages): PAYE, employee PRSI, USC → reduce net pay.</p><p><strong>Employer\'s PRSI</strong>: An additional cost to the employer, NOT deducted from employee pay. It is an expense in the P&L.</p><p>Total wages expense in P&L = Gross wages + Employer\'s PRSI.</p>' },
              { type: 'concept', variant: 'green', title: 'Double Entry for Wages', html: '<p>Dr Wages (gross amount + employer PRSI) → P&L expense<br/>Cr Bank (net pay to employees)<br/>Cr PAYE/PRSI/USC (amount owed to Revenue) → current liability until paid</p>' },
            ]
          },
        ]
      },
      {
        id: '2.5', title: 'Part D: Accruals & Prepayments',
        subTopics: [
          {
            id: '2.5.1', title: 'Accruals and Prepayments',
            keyTerms: [
              { term: 'Accrual', definition: 'An expense that has been incurred but not yet paid by the year end — shown as a current liability.' },
              { term: 'Prepayment', definition: 'An expense that has been paid in advance — shown as a current asset.' },
              { term: 'Income Accrued (Due)', definition: 'Income earned but not yet received — shown as a current asset (debtor).' },
              { term: 'Income Prepaid (In Advance)', definition: 'Income received but not yet earned — shown as a current liability.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Expense Accruals', html: '<p>If an expense has been incurred but not yet paid at year end:</p><p>P&L: <strong>Add</strong> the accrual to the amount paid (increase the expense).</p><p>Balance Sheet: Show as a <strong>current liability</strong> (creditor/accrual).</p><p>Example: Electricity bill for December arrives in January → accrue the December charge.</p>' },
              { type: 'concept', variant: 'green', title: 'Expense Prepayments', html: '<p>If an expense has been paid in advance:</p><p>P&L: <strong>Deduct</strong> the prepayment from the amount paid (reduce the expense).</p><p>Balance Sheet: Show as a <strong>current asset</strong> (prepayment).</p><p>Example: Insurance paid for 15 months → 3 months relate to next year → prepayment of 3 months.</p>' },
              { type: 'examtip', title: 'Exam Formula', html: '<p><strong>P&L expense = Amount paid + Closing accrual − Opening accrual − Closing prepayment + Opening prepayment</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '2.6', title: 'Part E: Bad Debts & Provisions',
        subTopics: [
          {
            id: '2.6.1', title: 'Bad Debts and Provision for Bad Debts',
            keyTerms: [
              { term: 'Bad Debt', definition: 'A debt that is definitely unrecoverable — written off as an expense in the P&L.' },
              { term: 'Provision for Bad Debts', definition: 'An estimate of the amount of debts that may not be collected — deducted from debtors on the Balance Sheet.' },
              { term: 'Increase in Provision', definition: 'When the new provision is higher than the old one — the increase is an expense in the P&L.' },
              { term: 'Decrease in Provision', definition: 'When the new provision is lower than the old one — the decrease is income (other income) in the P&L.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Bad Debt Write-Off', html: '<p>When a debt is definitely irrecoverable:</p><p>Dr Bad Debts (expense in P&L)<br/>Cr Debtors (reduce the debtor)</p><p>If a previously written-off bad debt is later recovered:</p><p>Dr Bank<br/>Cr Bad Debts Recovered (income in P&L)</p>' },
              { type: 'concept', variant: 'green', title: 'Provision for Bad Debts', html: '<p>The provision is calculated as a percentage of <strong>remaining debtors</strong> (after writing off bad debts).</p><p><strong>New provision > Old provision:</strong> The increase is an <strong>expense</strong> in P&L.</p><p><strong>New provision < Old provision:</strong> The decrease is <strong>other income</strong> in P&L.</p><p>On the Balance Sheet: Debtors (net of bad debts) <strong>less</strong> Provision = Net Debtors.</p>' },
              { type: 'example', title: 'Worked Example', html: '<p>Debtors per TB: €50,000. Bad debt to write off: €2,000. New provision: 5% of remaining debtors.</p><p>Remaining debtors: €50,000 − €2,000 = €48,000</p><p>New provision: 5% × €48,000 = <strong>€2,400</strong></p><p>If old provision was €2,000: Increase = €400 → expense in P&L.</p><p>Balance Sheet: Debtors €48,000 less provision €2,400 = <strong>€45,600</strong></p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 3 ──
  {
    id: 3, block: 'A',
    title: 'Bank Reconciliation Statements',
    description: 'Purpose, procedure, adjusted bank account, and reconciliation statement preparation.',
    estimatedMinutes: 18,
    related: [2, 7],
    sections: [
      {
        id: '3.1', title: 'Bank Reconciliation',
        subTopics: [
          {
            id: '3.1.1', title: 'Purpose & Reasons for Difference',
            keyTerms: [
              { term: 'Bank Reconciliation Statement', definition: 'A statement that explains the difference between the bank balance in the cash book and the balance on the bank statement.' },
              { term: 'Unpresented Cheques', definition: 'Cheques issued by the business but not yet cashed by the payee — appear in the cash book but not on the bank statement.' },
              { term: 'Lodgements Not Yet Credited', definition: 'Deposits made by the business but not yet processed by the bank.' },
              { term: 'Standing Orders / Direct Debits', definition: 'Payments made automatically by the bank — may not yet be recorded in the cash book.' },
              { term: 'Bank Charges / Interest', definition: 'Fees charged by the bank that the business may not know about until the statement arrives.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why the Balances Differ', html: '<p>The balance in the business\'s cash book rarely agrees with the bank statement because:</p><p>1. <strong>Timing differences:</strong> Unpresented cheques and lodgements not yet credited.</p><p>2. <strong>Items in bank statement but not in cash book:</strong> Bank charges, interest, direct debits, standing orders, dishonoured cheques, dividends received.</p><p>3. <strong>Errors:</strong> In the cash book or by the bank.</p>' },
              { type: 'concept', variant: 'green', title: 'Two-Step Process', html: '<p><strong>Step 1 — Adjust the Cash Book:</strong> Update the cash book for items appearing on the bank statement but not in the cash book (bank charges, interest, direct debits, dishonoured cheques).</p><p><strong>Step 2 — Prepare the Reconciliation Statement:</strong> Start with the adjusted bank statement balance and reconcile to the adjusted cash book balance using timing differences (unpresented cheques, lodgements not credited).</p>' },
            ]
          },
          {
            id: '3.1.2', title: 'Preparing the Bank Reconciliation',
            body: [
              { type: 'concept', variant: 'amber', title: 'Reconciliation Statement Format', html: '<p>Balance per bank statement<br/>Add: Lodgements not yet credited<br/>Less: Unpresented cheques<br/>= <strong>Adjusted Cash Book Balance</strong></p>' },
              { type: 'watchout', title: 'Debit and Credit Reversed', html: '<p>From the bank\'s perspective, your money is their <strong>liability</strong>. So a credit balance on the bank statement = money you have (positive for you). A debit balance = overdrawn.</p><p>From the business\'s perspective (cash book): a debit balance = money in the bank (asset). A credit balance = overdrawn.</p><p>The bank statement and the cash book show <strong>opposite sides</strong>.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Always prepare the adjusted cash book FIRST, then the reconciliation statement. The adjusted cash book balance is the figure that goes on the Balance Sheet.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 4 ──
  {
    id: 4, block: 'A',
    title: 'Depreciation & Revaluation of Fixed Assets',
    description: 'Straight-line and reducing balance methods, scrap value, disposal accounts, and revaluation.',
    estimatedMinutes: 25,
    related: [2, 6, 9],
    sections: [
      {
        id: '4.1', title: 'Part A: Depreciation Methods',
        subTopics: [
          {
            id: '4.1.1', title: 'Straight-Line Method',
            keyTerms: [
              { term: 'Depreciation', definition: 'The reduction in the value of a fixed asset over time due to wear and tear, obsolescence, or the passage of time.' },
              { term: 'Straight-Line Depreciation', definition: 'An equal amount of depreciation is charged each year. Formula: (Cost − Scrap Value) / Useful Life.' },
              { term: 'Net Book Value (NBV)', definition: 'The value of an asset in the books = Cost − Accumulated Depreciation.' },
              { term: 'Scrap Value (Residual Value)', definition: 'The estimated value of the asset at the end of its useful life.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Straight-Line Formula', html: '<p><strong>Annual Depreciation = (Cost − Scrap Value) / Useful Life</strong></p><p>Or if given as a percentage: <strong>Cost × Rate %</strong> (scrap value is ignored when percentage is given).</p><p>Example: Machine costs €50,000, scrap value €5,000, useful life 10 years.<br/>Annual depreciation = (€50,000 − €5,000) / 10 = <strong>€4,500 per year</strong></p>' },
              { type: 'examtip', title: 'Time Apportionment', html: '<p>If an asset is purchased part-way through the year, depreciation is charged <strong>from the date of purchase</strong>. E.g. purchased 01/04, year end 31/12 = 9/12 of a year\'s depreciation.</p><p>Similarly, an asset disposed of mid-year gets depreciation <strong>to the date of disposal</strong>.</p>' },
            ]
          },
          {
            id: '4.1.2', title: 'Reducing Balance Method',
            keyTerms: [
              { term: 'Reducing Balance', definition: 'Depreciation is calculated as a fixed percentage of the Net Book Value at the start of each year. Gives higher depreciation in early years.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Reducing Balance Formula', html: '<p><strong>Depreciation = NBV at start of year × Rate %</strong></p><p>The amount decreases each year because the NBV decreases each year.</p><p>Example: Asset cost €40,000, rate 25%:<br/>Year 1: €40,000 × 25% = €10,000 (NBV = €30,000)<br/>Year 2: €30,000 × 25% = €7,500 (NBV = €22,500)<br/>Year 3: €22,500 × 25% = €5,625 (NBV = €16,875)</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Straight-Line</th><th>Reducing Balance</th></tr></thead><tbody><tr><td>Annual charge</td><td>Equal each year</td><td>Decreasing each year</td></tr><tr><td>Early years</td><td>Lower depreciation</td><td>Higher depreciation</td></tr><tr><td>Later years</td><td>Same</td><td>Lower depreciation</td></tr><tr><td>Suitable for</td><td>Buildings, furniture</td><td>Vehicles, technology (lose value quickly at first)</td></tr><tr><td>NBV reaches zero?</td><td>Yes (or scrap value)</td><td>Never quite reaches zero</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '4.2', title: 'Part B: Disposals & Revaluation',
        subTopics: [
          {
            id: '4.2.1', title: 'Asset Disposal',
            keyTerms: [
              { term: 'Disposal Account', definition: 'A temporary account used to calculate the profit or loss on the sale of a fixed asset.' },
              { term: 'Profit on Disposal', definition: 'When the proceeds of sale exceed the NBV — the profit goes to Other Income in the P&L.' },
              { term: 'Loss on Disposal', definition: 'When the NBV exceeds the proceeds of sale — the loss goes to Expenses in the P&L.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Disposal Account Steps', html: '<p>1. <strong>Debit</strong> Disposal Account with the <strong>cost</strong> of the asset.</p><p>2. <strong>Credit</strong> Disposal Account with the <strong>accumulated depreciation</strong> on the asset.</p><p>3. <strong>Credit</strong> Disposal Account with the <strong>proceeds</strong> (or trade-in value).</p><p>4. The balance = <strong>profit</strong> (credit side bigger) or <strong>loss</strong> (debit side bigger).</p>' },
              { type: 'example', title: 'Disposal Example', html: '<p>Van cost €30,000. Accumulated depreciation €23,500. Trade-in allowance €14,000.</p><p>NBV = €30,000 − €23,500 = €6,500</p><p>Proceeds = €14,000</p><p>Profit on disposal = €14,000 − €6,500 = <strong>€7,500</strong></p>' },
            ]
          },
          {
            id: '4.2.2', title: 'Revaluation of Fixed Assets',
            keyTerms: [
              { term: 'Revaluation', definition: 'Restating a fixed asset at its current market value instead of historical cost.' },
              { term: 'Revaluation Reserve', definition: 'The gain from revaluing an asset. A capital reserve — shown in the capital section of the Balance Sheet.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Revaluation Process', html: '<p>When a fixed asset is revalued upwards:</p><p>1. The asset cost is replaced with the <strong>new valuation</strong>.</p><p>2. <strong>Accumulated depreciation is wiped out</strong> (reset to zero).</p><p>3. The difference between the new value and the old NBV is a <strong>revaluation reserve</strong>.</p><p>4. Future depreciation is based on the <strong>new value</strong> and the <strong>remaining useful life</strong>.</p>' },
              { type: 'example', title: 'Revaluation Example', html: '<p>Building: cost €400,000, accumulated depreciation €87,575. NBV = €312,425.</p><p>Revalued to €550,000 on 01/01/2022.</p><p>Revaluation reserve = €550,000 − €312,425 = <strong>€237,575</strong></p><p>New depreciation = €550,000 × 2% = €11,000 per year (from the new value).</p>' },
              { type: 'watchout', title: 'Revaluation Reserve is NOT Profit', html: '<p>The revaluation reserve goes in the <strong>capital section</strong> of the Balance Sheet, NOT in the P&L. It is an unrealised gain — the asset has not been sold.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 5 ──
  {
    id: 5, block: 'A',
    title: 'Control Accounts',
    description: 'Debtors and creditors control accounts, schedules of debtors/creditors (HL).',
    estimatedMinutes: 20,
    related: [2, 7, 16],
    sections: [
      {
        id: '5.1', title: 'Control Accounts',
        subTopics: [
          {
            id: '5.1.1', title: 'Purpose & Structure',
            keyTerms: [
              { term: 'Control Account', definition: 'A summary account in the general ledger that records the totals of all transactions for a group of accounts (debtors or creditors).' },
              { term: 'Schedule of Debtors', definition: 'A list of all individual debtor balances that should agree with the debtors control account balance.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'What is a Control Account?', html: '<p>A control account is a <strong>summary account</strong> in the general ledger. It records totals from the day books and cash book. The balance should equal the total of all individual account balances in the relevant personal ledger.</p><p>There are two main control accounts: <strong>Debtors Control</strong> (total owed by customers) and <strong>Creditors Control</strong> (total owed to suppliers).</p>' },
              { type: 'concept', variant: 'green', title: 'Debtors Control Account', html: '<p><strong>Debit side:</strong> Opening balance, Credit sales, Dishonoured cheques, Interest charged.</p><p><strong>Credit side:</strong> Cash/cheques received, Sales returns, Bad debts written off, Discount allowed, Contra (set-off), Closing balance.</p>' },
              { type: 'concept', variant: 'amber', title: 'Creditors Control Account', html: '<p><strong>Debit side:</strong> Cash/cheques paid, Purchase returns, Discount received, Contra (set-off), Closing balance.</p><p><strong>Credit side:</strong> Opening balance, Credit purchases.</p>' },
            ]
          },
          {
            id: '5.1.2', title: 'Contra Entries & Set-Offs',
            body: [
              { type: 'concept', variant: 'blue', title: 'What is a Contra Entry?', html: '<p>A <strong>contra</strong> (set-off) occurs when a person is both a debtor AND a creditor of the business. Instead of the business paying them and them paying the business separately, the amounts are <strong>set off</strong> against each other.</p><p>Dr Creditors Control (reduces amount owed to them)<br/>Cr Debtors Control (reduces amount they owe us)</p>' },
            ]
          },
        ]
      },
      {
        id: '5.2', title: 'Contra Entries & Set-Offs',
        subTopics: [
          {
            id: '5.2.1', title: 'Schedule of Debtors/Creditors',
            body: [
              { type: 'concept', variant: 'green', title: 'Preparing a Schedule', html: '<p>The schedule lists every individual debtor (or creditor) and their balance. The total should agree with the control account balance.</p><p>If they don\'t agree, there may be errors in either the control account or the personal ledger accounts.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>In the exam, after preparing the control account, you may be asked to prepare a schedule. Make sure you adjust individual balances for any errors identified.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK B — FINAL ACCOUNTS & ERRORS (Ch 6-12)
  // ──────────────────────────────────────────────────
  {
    id: 6, block: 'B',
    title: 'Final Accounts — Sole Trader',
    description: 'Trading, Profit & Loss Account, Balance Sheet, basic and advanced adjustments.',
    estimatedMinutes: 45,
    related: [2, 4, 7, 9],
    sections: [
      {
        id: '6.1', title: 'The Sole Trader & Final Accounts',
        subTopics: [
          {
            id: '6.1.1', title: 'Structure of Final Accounts',
            keyTerms: [
              { term: 'Sole Trader', definition: 'A business owned by one person. The owner has unlimited liability — personally responsible for all business debts.' },
              { term: 'Trading Account', definition: 'Calculates gross profit by matching sales revenue against cost of goods sold.' },
              { term: 'Gross Profit', definition: 'Sales minus Cost of Sales.' },
              { term: 'Net Profit', definition: 'Gross Profit plus other income minus expenses.' },
              { term: 'Unlimited Liability', definition: 'The owner is personally liable for all debts of the business — personal assets can be seized to pay business debts.' },
            ],
            body: [
              { type: 'prose', html: '<p>A sole trader is a business owned by <strong>one person</strong>. The owner has <strong>unlimited liability</strong> — they are personally responsible for all the debts of the business. The final accounts consist of a Trading, Profit and Loss Account and a Balance Sheet.</p>' },
              { type: 'concept', variant: 'green', title: 'Trading Account — Gross Profit', html: '<p><strong>Gross Profit = Sales − Cost of Sales</strong></p><p>Cost of Sales = Opening Stock + Purchases − Closing Stock</p><p>Additions to purchases: carriage inwards, customs duties.</p><p>Deductions from purchases: drawings of stock.</p><p>Carriage outwards is a P&L expense, NOT part of cost of sales.</p>' },
              { type: 'concept', variant: 'blue', title: 'Profit and Loss Account — Net Profit', html: '<p>Gross Profit − Total Expenses + Other Income = <strong>Net Profit</strong></p><p>Expenses are classified into: <strong>Administration</strong> (wages, rent, insurance, depreciation, light & heat), <strong>Selling & Distribution</strong> (advertising, bad debts, carriage outwards, van depreciation), and <strong>Financial</strong> (loan interest, bank charges).</p><p>Other Income (discount received, reduction in provision, profit on disposal, rent receivable, investment income) appears <strong>after Total Expenses</strong>.</p>' },
              { type: 'concept', variant: 'amber', title: 'Balance Sheet Structure', html: '<p><strong>Fixed Assets</strong> (at cost less accumulated depreciation = NBV)<br/>+ <strong>Current Assets</strong> (closing stock, debtors less provision, prepayments, bank, cash)<br/>− <strong>Current Liabilities</strong> (creditors, accruals, bank overdraft, PAYE/PRSI due)<br/>= <strong>Net Current Assets (Working Capital)</strong><br/>= <strong>Total Net Assets</strong></p><p>Financed by: Opening Capital + Revaluation Reserve + Net Profit − Drawings = <strong>Closing Capital</strong></p>' },
            ]
          },
          {
            id: '6.1.2', title: 'Advantages & Disadvantages of Sole Trader',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Advantages</th><th>Disadvantages</th></tr></thead><tbody><tr><td>Easy and cheap to set up</td><td>Unlimited liability</td></tr><tr><td>Owner keeps all profits</td><td>Limited capital available</td></tr><tr><td>Owner makes all decisions — full control</td><td>Difficult to get loans</td></tr><tr><td>Business affairs are private</td><td>Owner may lack expertise in all areas</td></tr><tr><td>Personal service to customers</td><td>Long working hours</td></tr><tr><td>Flexibility — can adapt quickly</td><td>Lack of continuity if owner dies/retires</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '6.2', title: 'Basic Adjustments',
        subTopics: [
          {
            id: '6.2.1', title: 'Adjustments Summary',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Adjustment</th><th>P&L Effect</th><th>Balance Sheet Effect</th></tr></thead><tbody><tr><td>Closing stock</td><td>Deducted in Trading A/C</td><td>Current asset</td></tr><tr><td>Accrual (expense due)</td><td>Add to expense</td><td>Current liability</td></tr><tr><td>Prepayment (paid in advance)</td><td>Deduct from expense</td><td>Current asset</td></tr><tr><td>Depreciation</td><td>Expense in P&L</td><td>Added to accumulated depreciation; deducted from cost</td></tr><tr><td>Bad debt write-off</td><td>Expense in P&L</td><td>Reduce debtors</td></tr><tr><td>Increase in provision for bad debts</td><td>Expense in P&L</td><td>Deduct new provision from debtors</td></tr><tr><td>Decrease in provision for bad debts</td><td>Other income in P&L</td><td>Deduct new provision from debtors</td></tr><tr><td>Drawings of stock</td><td>Deduct from purchases</td><td>Add to drawings</td></tr><tr><td>Drawings of cash</td><td>No P&L effect</td><td>Reduce bank/cash, add to drawings</td></tr></tbody></table>' },
            ]
          },
          {
            id: '6.2.2', title: 'Step-by-Step Approach to Q1',
            body: [
              { type: 'concept', variant: 'green', title: 'The 5-Step Method', html: '<p>1. <strong>Read the trial balance</strong> — classify every item using DEAL/CLIP.</p><p>2. <strong>Read the notes</strong> — understand what each note is asking before doing any calculations.</p><p>3. <strong>Work through notes one at a time</strong> — open T-accounts, calculate adjustments, label destinations.</p><p>4. <strong>Build the TPL line by line</strong> — tick off each working as you place it.</p><p>5. <strong>Build the Balance Sheet</strong> — same tick-off approach. The capital section pulls in net profit and drawings.</p>' },
              { type: 'examtip', title: 'Exam Strategy', html: '<p>Q1 is worth <strong>120 marks</strong> — the biggest question on the paper. Spend <strong>45-50 minutes</strong>. Do the workings FIRST, then build the statements. If you run out of time, write down all your workings — partial marks are awarded for correct workings even if the final statement is incomplete.</p>' },
            ]
          },
        ]
      },
      {
        id: '6.3', title: 'Advanced Adjustments',
        subTopics: [
          {
            id: '6.3.1', title: 'Investment Income & Interest',
            keyTerms: [
              { term: 'Investment Income', definition: 'Income earned from financial investments such as government stock or shares in other companies.' },
              { term: 'DIRT', definition: 'Deposit Interest Retention Tax — tax deducted at source from bank interest in Ireland.' },
              { term: 'Investment Income Due', definition: 'Investment income earned but not yet received — a current asset on the Balance Sheet.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Investment Income', html: '<p>Investment income (dividends, interest on government stock) is <strong>other income</strong> in the P&L. The investment itself is a <strong>fixed asset</strong> (if long-term) on the Balance Sheet.</p><p><strong>Full year income</strong> goes in the P&L. If only part was received in cash, the balance is <strong>investment income due</strong> — a current asset.</p>' },
              { type: 'concept', variant: 'green', title: 'Investment Income Trapped in Another Figure', html: '<p>Sometimes investment income is hidden inside another figure (e.g. patents). You must:</p><p>1. <strong>Remove it</strong> from the wrong account.</p><p>2. <strong>Credit it</strong> to investment income in the P&L.</p><p>3. <strong>Calculate the full year\'s income earned</strong> — even if only part was received.</p><p>4. The unreceived portion = <strong>income due</strong> (current asset).</p>' },
              { type: 'watchout', title: 'DIRT', html: '<p>If interest was received "net of DIRT at 33%": Gross Interest = Net ÷ 0.67. The gross amount goes to P&L. The DIRT is a tax liability.</p>' },
            ]
          },
          {
            id: '6.3.2', title: 'Goods on Sale or Return',
            keyTerms: [
              { term: 'Sale or Return', definition: 'Goods sent to a customer on a trial basis — they remain the property of the seller until accepted by the customer.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Sale or Return Treatment', html: '<p>If goods are sent on <strong>sale or return</strong> and have NOT been accepted at year end:</p><p>1. <strong>Reduce purchases</strong> by the cost price (if recorded as a purchase).</p><p>2. <strong>Reduce creditors</strong> by the cost price.</p><p>3. <strong>Remove from closing stock</strong> at cost (they were counted but they\'re not ours to keep).</p><p>OR if recorded as a sale:</p><p>1. Reduce sales by selling price. 2. Reduce debtors by selling price. 3. Add cost to closing stock.</p>' },
              { type: 'watchout', title: 'Finding Cost Price', html: '<p><strong>Mark-up:</strong> Cost = Selling Price ÷ (1 + Mark-up rate). E.g. cost plus 25%: Cost = SP ÷ 1.25</p><p><strong>Margin:</strong> Cost = Selling Price × (1 − Margin rate). E.g. 20% margin: Cost = SP × 0.80</p>' },
            ]
          },
          {
            id: '6.3.3', title: 'Goods in Transit & Goods for Own Use',
            body: [
              { type: 'concept', variant: 'blue', title: 'Goods in Transit', html: '<p>Goods ordered and invoiced but not yet physically received at year end. They legally belong to the business, so:</p><p>1. <strong>Add to purchases</strong> (at cost).</p><p>2. <strong>Add to closing stock</strong> (at cost).</p><p>3. <strong>Add to creditors</strong> (if not yet paid).</p>' },
              { type: 'concept', variant: 'green', title: 'Goods Taken for Own Use', html: '<p>When the owner takes business stock for personal use:</p><p>1. <strong>Reduce purchases</strong> by the <strong>cost price</strong> (not selling price).</p><p>2. <strong>Add to drawings</strong> by the cost price.</p><p>Never use the selling price for drawings of stock — always use <strong>cost</strong>.</p>' },
            ]
          },
          {
            id: '6.3.4', title: 'Patents, Goodwill & Intangible Assets',
            keyTerms: [
              { term: 'Patent', definition: 'An exclusive right granted for an invention — gives the holder the sole right to manufacture/sell for a set period.' },
              { term: 'Goodwill', definition: 'The value of the reputation, customer loyalty, and trading connections of a business.' },
              { term: 'Amortisation', definition: 'Writing off the cost of an intangible asset over its useful life — similar to depreciation for tangible assets.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Intangible Assets', html: '<p>Intangible assets include <strong>patents</strong>, <strong>goodwill</strong>, <strong>trademarks</strong>, and <strong>development costs</strong>. They are shown on the Balance Sheet above tangible fixed assets and are <strong>amortised</strong> over their useful life.</p><p>Annual write-off = Cost ÷ Number of years. The write-off is an expense in the P&L.</p>' },
            ]
          },
          {
            id: '6.3.5', title: 'Asset Disposal — The Classic Q1 Trap',
            body: [
              { type: 'concept', variant: 'red', title: 'The Five Steps of a Disposal', html: '<p>1. <strong>Calculate depreciation on the old asset</strong> up to the date of disposal.</p><p>2. <strong>Calculate the NBV</strong> at the date of disposal (cost − total accumulated depreciation).</p><p>3. <strong>Find profit/loss on disposal</strong>: Proceeds (or trade-in allowance) − NBV.</p><p>4. <strong>Correct any wrong entries</strong> — the exam often hides the cash payment in a wrong account (e.g. purchases).</p><p>5. <strong>Calculate depreciation on the new asset</strong> from the date of purchase.</p>' },
              { type: 'watchout', title: 'Where Everything Goes', html: '<p><strong>P&L:</strong> Profit on disposal → Other Income. Loss on disposal → Expense. Current year depreciation → Admin or S&D.</p><p><strong>Balance Sheet:</strong> Update cost (+ new − old), update accumulated depreciation (+ current year − on disposed asset).</p><p><strong>Common error:</strong> The cheque for the new asset may be wrongly recorded as a stock purchase. You must reverse it from purchases and record the correct asset entry.</p>' },
            ]
          },
          {
            id: '6.3.6', title: 'Suspense Account in Q1',
            body: [
              { type: 'concept', variant: 'amber', title: 'Suspense in Final Accounts', html: '<p>When a suspense account appears in the trial balance, it means there are posting errors. You must:</p><p>1. Identify each error from the notes.</p><p>2. Write the correcting entry.</p><p>3. Check if the correction involves the suspense account (only if the TB was affected).</p><p>4. The suspense account must clear to <strong>zero</strong> after all corrections.</p><p>The corrected figures then feed into the TPL and Balance Sheet.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 7, block: 'B',
    title: 'Correction of Errors & Suspense',
    description: 'Types of errors, journal entries for correction, suspense accounts, statement of revised profit.',
    estimatedMinutes: 28,
    related: [2, 5, 6],
    sections: [
      {
        id: '7.1', title: 'Types of Errors',
        subTopics: [
          {
            id: '7.1.1', title: 'Errors That Don\'t Affect the Trial Balance',
            keyTerms: [
              { term: 'Error of Omission', definition: 'A transaction completely left out of the books.' },
              { term: 'Error of Commission', definition: 'Correct amount, correct type of account, but wrong person/account.' },
              { term: 'Error of Principle', definition: 'Entry in the wrong class of account (e.g. expense recorded as asset).' },
              { term: 'Error of Original Entry', definition: 'Wrong amount used for both debit and credit.' },
              { term: 'Compensating Error', definition: 'Two errors of equal amount cancel each other out.' },
              { term: 'Complete Reversal', definition: 'Correct accounts, correct amount, but debit and credit are swapped.' },
            ],
            body: [
              { type: 'concept', variant: 'red', title: 'Six Errors NOT Revealed by the Trial Balance', html: '<table class="learn-table"><tbody><tr><td><strong>Omission</strong></td><td>Transaction completely left out — not recorded at all.</td></tr><tr><td><strong>Commission</strong></td><td>Right amount, right type of account, wrong person.</td></tr><tr><td><strong>Principle</strong></td><td>Wrong class of account. E.g. purchase of van recorded as motor expenses.</td></tr><tr><td><strong>Original Entry</strong></td><td>Wrong amount on both sides. E.g. €560 recorded as €650.</td></tr><tr><td><strong>Compensating</strong></td><td>Two errors of equal amount cancel each other out.</td></tr><tr><td><strong>Complete Reversal</strong></td><td>Correct accounts, correct amount, but debit and credit are swapped.</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key Point', html: '<p>These six errors do <strong>NOT</strong> create a suspense account because total debits still equal total credits.</p>' },
            ]
          },
          {
            id: '7.1.2', title: 'Errors That DO Affect the Trial Balance',
            body: [
              { type: 'concept', variant: 'blue', title: 'Errors Causing a Suspense Account', html: '<p>These errors cause total debits ≠ total credits, creating a <strong>suspense account</strong>:</p><p><strong>Single-sided entry:</strong> Only one side of a transaction recorded.</p><p><strong>Incorrect casting (addition):</strong> A ledger account added up wrong.</p><p><strong>Wrong amount on one side:</strong> Debit and credit recorded at different amounts.</p><p><strong>Two debits / two credits:</strong> Both sides posted to the same side.</p><p><strong>Transposition error (one side):</strong> Digits reversed on one side only.</p>' },
            ]
          },
        ]
      },
      {
        id: '7.2', title: 'Suspense Account & Corrections',
        subTopics: [
          {
            id: '7.2.1', title: 'The Suspense Account',
            keyTerms: [
              { term: 'Suspense Account', definition: 'A temporary account used to record the difference in the trial balance until errors are found and corrected.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'When is a Suspense Account Used?', html: '<p>When the trial balance does not balance, the difference is placed in a <strong>Suspense Account</strong>. As each error is found and corrected, the suspense account balance is reduced until it reaches <strong>zero</strong>.</p>' },
              { type: 'concept', variant: 'green', title: 'Four-Step Correction Method', html: '<p>For each error:</p><p>1. <strong>What was done?</strong> — Write the incorrect entry.</p><p>2. <strong>What should have been done?</strong> — Write the correct entry.</p><p>3. <strong>Write the correcting journal entry.</strong></p><p>4. <strong>Does it involve the Suspense Account?</strong> — Only if the trial balance was affected.</p>' },
            ]
          },
          {
            id: '7.2.2', title: 'Journal Entry Examples',
            body: [
              { type: 'example', title: 'Error of Principle', html: '<p>Purchase of equipment (€2,000) recorded as purchases.</p><p><strong>Wrong:</strong> Dr Purchases €2,000, Cr Bank €2,000</p><p><strong>Should be:</strong> Dr Equipment €2,000, Cr Bank €2,000</p><p><strong>Correction:</strong> Dr Equipment €2,000, Cr Purchases €2,000</p><p>No suspense involved — TB still balanced.</p>' },
              { type: 'example', title: 'Single-Sided Entry', html: '<p>Sales of €500 credited to Sales but not debited to the customer.</p><p><strong>Wrong:</strong> Cr Sales €500 only</p><p><strong>Should be:</strong> Dr Debtor €500, Cr Sales €500</p><p><strong>Correction:</strong> Dr Debtor €500, Cr Suspense €500</p>' },
              { type: 'example', title: 'Complete Reversal', html: '<p>Receipt from debtor Murphy €300 — debit and credit reversed.</p><p><strong>Wrong:</strong> Dr Murphy €300, Cr Bank €300</p><p><strong>Should be:</strong> Dr Bank €300, Cr Murphy €300</p><p><strong>Correction:</strong> Dr Bank €600, Cr Murphy €600 (double the amount to fully reverse and re-record)</p><p>No suspense involved — both sides wrong by equal amounts.</p>' },
            ]
          },
        ]
      },
      {
        id: '7.3', title: 'Statement of Revised Profit',
        subTopics: [
          {
            id: '7.3.1', title: 'Preparing the Statement',
            keyTerms: [
              { term: 'Statement of Revised Profit', definition: 'A statement that adjusts the original net profit for the effect of corrections that change P&L items.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Statement Format', html: '<p>Original Net Profit<br/>Add: Items that <strong>increase</strong> profit (overcharged expenses, understated income)<br/>Less: Items that <strong>decrease</strong> profit (undercharged expenses, overstated income)<br/>= <strong>Revised Net Profit</strong></p>' },
              { type: 'watchout', title: 'Which Corrections Affect Profit?', html: '<p>Only corrections that change a <strong>P&L item</strong> (income or expense) affect the revised profit. Corrections involving only <strong>Balance Sheet items</strong> do NOT affect profit.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>After the Statement of Revised Profit, you may need to prepare a <strong>Corrected Balance Sheet</strong>. Use the revised profit figure in the capital section.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 8, block: 'B',
    title: 'Regulatory Framework of Accounting',
    description: 'Accounting obligations, regulatory agencies, the audit process, ethical standards.',
    estimatedMinutes: 18,
    related: [1, 10],
    sections: [
      {
        id: '8.1', title: 'Accounting Obligations',
        subTopics: [
          {
            id: '8.1.1', title: 'Legal Requirements',
            keyTerms: [
              { term: 'Companies Act 2014', definition: 'The principal legislation governing companies in Ireland — requires proper books of account and annual financial statements.' },
              { term: 'True and Fair View', definition: 'Financial statements must present an accurate and unbiased picture of the company\'s financial position.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Companies Act Requirements', html: '<p>Under the <strong>Companies Act 2014</strong>, every company must:</p><p>1. Keep <strong>proper books of account</strong> on a continuous and consistent basis.</p><p>2. Prepare <strong>annual financial statements</strong> (P&L, Balance Sheet, Cash Flow Statement).</p><p>3. Ensure the accounts give a <strong>true and fair view</strong>.</p><p>4. Have the accounts <strong>audited</strong> (unless exempt as a small company).</p><p>5. File accounts with the <strong>Companies Registration Office (CRO)</strong>.</p>' },
              { type: 'concept', variant: 'amber', title: 'Consequences of Non-Compliance', html: '<p>Directors who fail to keep proper books may be:</p><p>1. <strong>Personally liable</strong> for company debts.</p><p>2. Subject to <strong>fines</strong> and <strong>imprisonment</strong>.</p><p>3. <strong>Restricted or disqualified</strong> from acting as directors.</p>' },
            ]
          },
        ]
      },
      {
        id: '8.2', title: 'Regulatory Agencies',
        subTopics: [
          {
            id: '8.2.1', title: 'Bodies That Regulate Accounting',
            keyTerms: [
              { term: 'Financial Reporting Council (FRC)', definition: 'Sets accounting and auditing standards in the UK and Ireland.' },
              { term: 'IAASA', definition: 'Irish Auditing and Accounting Supervisory Authority — oversees the regulation of auditors and accountants in Ireland.' },
              { term: 'Revenue Commissioners', definition: 'The Irish tax authority responsible for collecting taxes and duties.' },
              { term: 'CRO', definition: 'Companies Registration Office — registers companies and receives annual returns.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Body</th><th>Role</th></tr></thead><tbody><tr><td><strong>FRC</strong></td><td>Sets accounting standards (FRS 102) and auditing standards.</td></tr><tr><td><strong>IAASA</strong></td><td>Oversees regulation of auditors and accountants in Ireland.</td></tr><tr><td><strong>Chartered Accountants Ireland</strong></td><td>Professional body — sets ethical and professional standards.</td></tr><tr><td><strong>CPA Ireland</strong></td><td>Professional body for certified public accountants.</td></tr><tr><td><strong>Revenue Commissioners</strong></td><td>Collects taxes based on financial statements.</td></tr><tr><td><strong>CRO</strong></td><td>Companies must file annual returns and financial statements.</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '8.3', title: 'The Audit',
        subTopics: [
          {
            id: '8.3.1', title: 'Audit Process & Reports',
            keyTerms: [
              { term: 'Audit', definition: 'An independent examination of financial statements by a qualified auditor to verify they give a true and fair view.' },
              { term: 'Unqualified Report', definition: 'A clean report — the auditor is satisfied the accounts are true and fair.' },
              { term: 'Qualified Report', definition: 'The auditor has reservations about certain aspects of the accounts.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Types of Audit Report', html: '<p><strong>Unqualified (clean):</strong> Accounts are true and fair.</p><p><strong>Qualified:</strong> Reservations about specific items ("except for...").</p><p><strong>Adverse:</strong> Accounts do NOT give a true and fair view.</p><p><strong>Disclaimer:</strong> Cannot form an opinion due to insufficient evidence.</p>' },
              { type: 'watchout', title: 'Key Distinction', html: '<p>It is the <strong>directors\' responsibility</strong> to prepare the accounts. The <strong>auditor\'s responsibility</strong> is to examine and report on them.</p>' },
            ]
          },
          {
            id: '8.3.2', title: 'Ethical Standards',
            keyTerms: [
              { term: 'Independence', definition: 'The auditor must be free from any influence that could compromise their objectivity.' },
              { term: 'Confidentiality', definition: 'Auditors must not disclose information obtained during the audit without proper authority.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Five Ethical Principles', html: '<p><strong>Integrity</strong> — honest and straightforward.<br/><strong>Objectivity</strong> — not influenced by bias.<br/><strong>Professional competence</strong> — maintain knowledge and skills.<br/><strong>Confidentiality</strong> — do not disclose without authority.<br/><strong>Professional behaviour</strong> — comply with laws and standards.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 9 — EXPANDED ──
  {
    id: 9, block: 'B',
    title: 'Company Accounts — Internal Use',
    description: 'Limited companies, sources of finance, appropriation account, difficult adjustments.',
    estimatedMinutes: 45,
    related: [6, 10, 17, 18],
    sections: [
      {
        id: '9.1', title: 'Limited Companies',
        subTopics: [
          {
            id: '9.1.1', title: 'Features of Limited Companies',
            keyTerms: [
              { term: 'Limited Company', definition: 'A separate legal entity from its owners (shareholders). Shareholders have limited liability.' },
              { term: 'Limited Liability', definition: 'Shareholders can only lose the amount they have invested or agreed to invest.' },
              { term: 'Separate Legal Entity', definition: 'The company exists in its own right — it can own property, sue, and be sued.' },
              { term: 'Private Ltd', definition: 'Shares cannot be offered to the general public. Min 1, max 149 shareholders.' },
              { term: 'Public PLC', definition: 'Shares can be offered to the public and traded on a stock exchange. Min 7 shareholders.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Features', html: '<p>1. <strong>Limited liability</strong> — shareholders can only lose the amount invested.</p><p>2. <strong>Separate legal entity</strong> — the company can own property, sue, and be sued.</p><p>3. <strong>Perpetual succession</strong> — continues even if shareholders change.</p><p>4. <strong>Transferability of shares</strong> — can be bought and sold.</p><p>5. <strong>Common seal</strong> — the company\'s official signature.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Private Ltd</th><th>Public PLC</th></tr></thead><tbody><tr><td>Min shareholders</td><td>1</td><td>7</td></tr><tr><td>Max shareholders</td><td>149</td><td>No limit</td></tr><tr><td>Shares traded publicly?</td><td>No</td><td>Yes</td></tr><tr><td>Min share capital</td><td>No minimum</td><td>€25,000</td></tr></tbody></table>' },
            ]
          },
          {
            id: '9.1.2', title: 'Sources of Finance',
            keyTerms: [
              { term: 'Authorised Share Capital', definition: 'Maximum amount of share capital a company is authorised to issue.' },
              { term: 'Issued Share Capital', definition: 'Amount of share capital actually issued to shareholders.' },
              { term: 'Ordinary Shares', definition: 'Voting rights, variable dividend, highest risk but potentially highest return.' },
              { term: 'Preference Shares', definition: 'Fixed dividend rate, paid before ordinary shareholders, no voting rights.' },
              { term: 'Debentures', definition: 'Long-term loans. Holders are creditors, not owners. Interest must be paid regardless of profit.' },
              { term: 'Share Premium', definition: 'Amount received for shares above their nominal value — a capital reserve.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Source</th><th>Description</th><th>Risk/Return</th></tr></thead><tbody><tr><td><strong>Ordinary shares</strong></td><td>Voting rights, variable dividend, last repaid on liquidation</td><td>Highest risk, highest potential return</td></tr><tr><td><strong>Preference shares</strong></td><td>Fixed dividend, paid before ordinary, no voting rights</td><td>Lower risk, limited return</td></tr><tr><td><strong>Debentures</strong></td><td>Long-term loans, fixed interest, holders are creditors</td><td>Lowest risk, tax-deductible interest</td></tr><tr><td><strong>Retained profits</strong></td><td>Profits not distributed as dividends</td><td>Cheapest source</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '9.2', title: 'Company P&L & Appropriation Account',
        subTopics: [
          {
            id: '9.2.1', title: 'Company P&L Structure',
            keyTerms: [
              { term: 'Appropriation Account', definition: 'Shows how net profit is distributed — dividends paid and retained profits.' },
              { term: 'Dividend', definition: 'A distribution of profit to shareholders. Interim dividends are paid during the year; final dividends are proposed at year end.' },
              { term: 'Corporation Tax', definition: 'Tax on company profits — shown in the P&L and as a current liability if not yet paid.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Company P&L Format', html: '<p>Sales − Cost of Sales = <strong>Gross Profit</strong></p><p>− Distribution Costs − Administrative Expenses = <strong>Operating Profit</strong></p><p>+ Investment Income − Debenture Interest = <strong>Net Profit before Tax</strong></p><p>− Corporation Tax = <strong>Net Profit after Tax</strong></p><p>Then the <strong>Appropriation Account</strong>:</p><p>− Preference Dividend − Interim Ordinary Dividend − Final Ordinary Dividend = <strong>Retained Profit for Year</strong></p><p>+ Opening P&L Balance = <strong>Closing P&L Balance</strong></p>' },
              { type: 'watchout', title: 'Debenture Interest', html: '<p>Debenture interest is an <strong>expense</strong> — it goes ABOVE Net Profit, not in the appropriation account. It must be paid regardless of profit.</p><p>Dividends go in the <strong>appropriation account</strong> — they are a distribution of profit, not an expense.</p>' },
            ]
          },
          {
            id: '9.2.2', title: 'Dividends — Interim & Final',
            body: [
              { type: 'concept', variant: 'green', title: 'Types of Dividend', html: '<p><strong>Interim dividend:</strong> Paid part-way through the year. Already paid by year end → no balance sheet effect.</p><p><strong>Final (proposed) dividend:</strong> Proposed at year end but not yet paid → shown as a <strong>current liability</strong> on the Balance Sheet.</p><p>Dividend calculation: Number of shares × Dividend rate (e.g. 10c per share).</p>' },
            ]
          },
        ]
      },
      {
        id: '9.3', title: 'Company Balance Sheet',
        subTopics: [
          {
            id: '9.3.1', title: 'Company Balance Sheet Structure',
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Differences from Sole Trader', html: '<p>The company Balance Sheet has:</p><p>1. <strong>Authorised and Issued Share Capital</strong> instead of owner\'s capital.</p><p>2. <strong>Revenue Reserves</strong> (P&L balance, general reserve).</p><p>3. <strong>Capital Reserves</strong> (share premium, revaluation reserve).</p><p>4. <strong>Long-term liabilities</strong> include debentures.</p><p>5. <strong>Current liabilities</strong> include corporation tax due, proposed dividends.</p>' },
              { type: 'concept', variant: 'green', title: 'Capital & Reserves Section', html: '<p><strong>Issued Share Capital:</strong><br/>Ordinary shares × nominal value<br/>Preference shares × nominal value</p><p><strong>Capital Reserves:</strong><br/>Share premium, Revaluation reserve, Capital redemption reserve</p><p><strong>Revenue Reserves:</strong><br/>General reserve, P&L balance</p><p><strong>= Shareholders\' Funds (= Total Net Assets)</strong></p>' },
            ]
          },
          {
            id: '9.3.2', title: 'Capital vs Revenue Reserves',
            keyTerms: [
              { term: 'Capital Reserve', definition: 'Not distributable as dividends — share premium, revaluation reserve.' },
              { term: 'Revenue Reserve', definition: 'Can be distributed as dividends — P&L balance, general reserve.' },
              { term: 'General Reserve', definition: 'Profits set aside by the directors for future use — a revenue reserve.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Capital Reserves (NOT distributable)</th><th>Revenue Reserves (distributable)</th></tr></thead><tbody><tr><td>Share Premium</td><td>P&L Balance (retained profits)</td></tr><tr><td>Revaluation Reserve</td><td>General Reserve</td></tr><tr><td>Capital Redemption Reserve</td><td></td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key Rule', html: '<p>Capital reserves <strong>cannot</strong> be used to pay dividends. Only revenue reserves are distributable.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 10, block: 'B',
    title: 'Published Accounts',
    description: 'Directors\' report, published P&L and Balance Sheet templates, explanatory notes, FRS 102.',
    estimatedMinutes: 22,
    related: [8, 9, 18],
    sections: [
      {
        id: '10.1', title: 'Published Financial Statements',
        subTopics: [
          {
            id: '10.1.1', title: 'Components of Published Accounts',
            keyTerms: [
              { term: 'Directors\' Report', definition: 'A report by directors giving an overview of the company\'s performance, activities, and future prospects.' },
              { term: 'FRS 102', definition: 'The Financial Reporting Standard applicable in the UK and Republic of Ireland — sets out the rules for financial reporting.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'What Must Be Published?', html: '<p>1. <strong>Directors\' Report</strong> — overview of activities, dividends, future developments.</p><p>2. <strong>Income Statement (P&L)</strong> — published format (less detail than internal).</p><p>3. <strong>Balance Sheet</strong> — published format.</p><p>4. <strong>Cash Flow Statement</strong> — shows where cash came from and went.</p><p>5. <strong>Notes to the Accounts</strong> — accounting policies, detailed breakdowns.</p><p>6. <strong>Auditor\'s Report</strong> — independent opinion on whether accounts are true and fair.</p>' },
            ]
          },
          {
            id: '10.1.2', title: 'Published P&L vs Internal P&L',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Internal P&L (Ch 9)</th><th>Published P&L</th></tr></thead><tbody><tr><td>Shows individual expenses</td><td>Groups expenses into Distribution Costs & Admin</td></tr><tr><td>Shows detailed workings</td><td>Summary figures only — detail in notes</td></tr><tr><td>For managers and directors</td><td>For shareholders, creditors, public</td></tr><tr><td>No prescribed format</td><td>Must follow FRS 102 / Companies Act</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '10.2', title: 'Notes to the Financial Statements',
        subTopics: [
          {
            id: '10.2.1', title: 'What the Notes Disclose',
            body: [
              { type: 'concept', variant: 'green', title: 'Required Notes', html: '<p>1. <strong>Accounting policies</strong> — depreciation methods, stock valuation, revenue recognition.</p><p>2. <strong>Fixed asset schedule</strong> — cost, additions, disposals, accumulated depreciation for each class.</p><p>3. <strong>Debtors breakdown</strong> — trade debtors, prepayments, other debtors.</p><p>4. <strong>Creditors breakdown</strong> — trade creditors, accruals, taxation, proposed dividends.</p><p>5. <strong>Share capital</strong> — authorised vs issued, movements during the year.</p><p>6. <strong>Reserves movements</strong> — opening balance, transfers, closing balance.</p><p>7. <strong>Contingent liabilities</strong> — possible obligations depending on future events.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 11 — EXPANDED ──
  {
    id: 11, block: 'B',
    title: 'Manufacturing Accounts',
    description: 'Prime cost, factory overhead, cost of manufacture, work in progress, apportionment.',
    estimatedMinutes: 35,
    related: [6, 9, 22],
    sections: [
      {
        id: '11.1', title: 'Manufacturing Account Structure',
        subTopics: [
          {
            id: '11.1.1', title: 'Three Stages of Cost',
            keyTerms: [
              { term: 'Prime Cost', definition: 'Direct Materials + Direct Labour + Direct Expenses. The total of all costs directly traceable to production.' },
              { term: 'Factory Overhead', definition: 'Indirect manufacturing costs — factory rent, factory insurance, factory depreciation, indirect wages.' },
              { term: 'Cost of Manufacture', definition: 'Prime Cost + Factory Overhead ± Work in Progress adjustment.' },
              { term: 'Work in Progress (WIP)', definition: 'Goods partially completed at the accounting date. Opening WIP is added; closing WIP is deducted.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Manufacturing Account Format', html: '<p><strong>Direct Materials:</strong><br/>Opening stock of raw materials<br/>+ Purchases of raw materials<br/>+ Carriage inwards on raw materials<br/>− Closing stock of raw materials<br/>= <strong>Raw Materials Consumed</strong></p><p><strong>+ Direct Labour</strong> (factory wages directly on production)<br/>+ Direct Expenses (royalties, special tools)<br/>= <strong>PRIME COST</strong></p><p>+ Factory Overhead (indirect costs)<br/>+ Opening WIP<br/>− Closing WIP<br/>= <strong>COST OF MANUFACTURE</strong></p>' },
              { type: 'watchout', title: 'Common Q1 Error', html: '<p>Students often confuse raw materials stock (belongs in Manufacturing Account) with finished goods stock (belongs in Trading Account). The Manufacturing Account uses raw materials stock. The Trading Account uses finished goods stock.</p>' },
            ]
          },
          {
            id: '11.1.2', title: 'Factory Overhead & Apportionment',
            body: [
              { type: 'concept', variant: 'green', title: 'Factory Overhead Items', html: '<p><strong>Factory-specific costs:</strong> Factory rent, factory rates, factory insurance, factory light & heat, factory supervisor\'s salary, factory depreciation, indirect factory materials, indirect factory labour.</p><p><strong>Apportioned costs:</strong> When a cost is shared between factory and office (e.g. rent for the whole building), it must be split on a fair basis — usually floor area, value of assets, or number of employees.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Common Basis</th><th>Used For</th></tr></thead><tbody><tr><td>Floor area</td><td>Rent, rates, insurance, light & heat</td></tr><tr><td>Book value of assets</td><td>Depreciation, insurance on assets</td></tr><tr><td>Number of employees</td><td>Canteen costs, welfare</td></tr><tr><td>Direct labour hours</td><td>Supervisory salaries, factory overhead rate</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>In Q1, if the question says "factory occupies 60% of premises", then 60% of rent, rates, insurance, and light & heat go to the Manufacturing Account and 40% to the P&L.</p>' },
            ]
          },
        ]
      },
      {
        id: '11.2', title: 'Work in Progress',
        subTopics: [
          {
            id: '11.2.1', title: 'WIP Adjustment',
            body: [
              { type: 'concept', variant: 'blue', title: 'Opening & Closing WIP', html: '<p>Work in Progress represents goods that are <strong>partially completed</strong> at the accounting date.</p><p><strong>Opening WIP</strong> is <strong>added</strong> to factory costs (these goods need to be finished).</p><p><strong>Closing WIP</strong> is <strong>deducted</strong> (these goods are not yet finished, so their cost should not be included in cost of manufacture).</p><p>Cost of Manufacture = Prime Cost + Factory Overhead + Opening WIP − Closing WIP</p>' },
            ]
          },
        ]
      },
      {
        id: '11.3', title: 'Manufacturing P&L & Balance Sheet',
        subTopics: [
          {
            id: '11.3.1', title: 'From Manufacturing to Trading Account',
            body: [
              { type: 'concept', variant: 'green', title: 'The Flow', html: '<p>The <strong>Cost of Manufacture</strong> from the Manufacturing Account replaces "Purchases" in the Trading Account:</p><p>Sales<br/>Less: Cost of Sales:<br/>Opening stock of <strong>finished goods</strong><br/>+ <strong>Cost of Manufacture</strong><br/>− Closing stock of finished goods<br/>= Cost of Sales<br/>= <strong>Gross Profit</strong></p><p>Then the P&L continues as normal with expenses and other income.</p>' },
              { type: 'watchout', title: 'Three Types of Stock', html: '<p>1. <strong>Raw materials stock</strong> → Manufacturing Account (opening and closing).</p><p>2. <strong>Work in Progress</strong> → Manufacturing Account (opening and closing).</p><p>3. <strong>Finished goods stock</strong> → Trading Account (opening and closing).</p><p>On the Balance Sheet, all three appear as separate lines in Current Assets.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 12, block: 'B',
    title: 'Departmental Accounts',
    description: 'Allocation and apportionment of income and expenses across departments.',
    estimatedMinutes: 18,
    related: [6, 11, 22],
    sections: [
      {
        id: '12.1', title: 'Departmental Accounts',
        subTopics: [
          {
            id: '12.1.1', title: 'Purpose & Structure',
            keyTerms: [
              { term: 'Allocation', definition: 'Assigning an expense directly to a specific department.' },
              { term: 'Apportionment', definition: 'Sharing a common expense between departments on a fair basis.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Departmental Accounts?', html: '<p>1. Identify the <strong>profit or loss</strong> of each department.</p><p>2. Assess <strong>performance</strong> of each department.</p><p>3. Make decisions about <strong>expanding or closing</strong> departments.</p><p>4. Determine the <strong>contribution</strong> of each department to overheads.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Expense</th><th>Basis of Apportionment</th></tr></thead><tbody><tr><td>Rent, rates, insurance</td><td>Floor area</td></tr><tr><td>Advertising</td><td>Sales ratio</td></tr><tr><td>Canteen expenses</td><td>Number of employees</td></tr><tr><td>Depreciation</td><td>Value of assets</td></tr><tr><td>General admin</td><td>Sales ratio or equally</td></tr></tbody></table>' },
            ]
          },
          {
            id: '12.1.2', title: 'Closing a Department',
            body: [
              { type: 'concept', variant: 'amber', title: 'Should a Loss-Making Department Close?', html: '<p>A department making a <strong>net loss</strong> should NOT necessarily be closed. If it makes a <strong>positive contribution</strong> (revenue exceeds directly identifiable costs), it helps cover shared overheads.</p><p>Closing it would mean its contribution is lost — remaining departments would have to cover more overheads, potentially reducing overall profit.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Always calculate the <strong>contribution</strong> (revenue minus directly identifiable costs). If positive, closing would reduce overall profit.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK C — OTHER ENTITIES & INTERPRETATION (Ch 13-19)
  // ──────────────────────────────────────────────────
  {
    id: 13, block: 'C',
    title: 'Club Accounts',
    description: 'Receipts & payments account, income & expenditure account, accumulated fund, bar trading.',
    estimatedMinutes: 30,
    related: [6, 14],
    sections: [
      {
        id: '13.1', title: 'Club Accounts Structure',
        subTopics: [
          {
            id: '13.1.1', title: 'Receipts & Payments vs Income & Expenditure',
            keyTerms: [
              { term: 'Receipts & Payments Account', definition: 'A summary of cash transactions — similar to a cash book.' },
              { term: 'Income & Expenditure Account', definition: 'The club equivalent of a P&L — shows surplus or deficit based on accruals.' },
              { term: 'Accumulated Fund', definition: 'The club equivalent of capital — net assets at the start of the period.' },
              { term: 'Surplus', definition: 'When income exceeds expenditure (equivalent to net profit).' },
              { term: 'Deficit', definition: 'When expenditure exceeds income (equivalent to net loss).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Two Types of Account', html: '<p><strong>Receipts & Payments:</strong> Cash basis. Records ALL cash received and paid. Shows opening and closing bank balances.</p><p><strong>Income & Expenditure:</strong> Accruals basis. Only includes income earned and expenses incurred. Shows a surplus or deficit.</p>' },
              { type: 'watchout', title: 'Key Difference', html: '<p>Capital items (purchase of equipment) appear in R&P but NOT in I&E. Depreciation appears in I&E but NOT in R&P.</p>' },
            ]
          },
          {
            id: '13.1.2', title: 'The Accumulated Fund',
            body: [
              { type: 'concept', variant: 'green', title: 'Calculating the Accumulated Fund', html: '<p><strong>Opening Assets − Opening Liabilities = Accumulated Fund</strong></p><p>At year end: Accumulated Fund + Surplus (or − Deficit) = Closing Accumulated Fund.</p>' },
            ]
          },
        ]
      },
      {
        id: '13.2', title: 'Subscriptions & Special Income',
        subTopics: [
          {
            id: '13.2.1', title: 'Subscriptions Account',
            keyTerms: [
              { term: 'Subscriptions', definition: 'Annual membership fees — the main income source for most clubs.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Subscriptions T-Account', html: '<p>Prepare a T-account to calculate subscription <strong>income</strong> for the I&E:</p><p><strong>Dr:</strong> Arrears at start, Cash received (from R&P), Prepaid at end.</p><p><strong>Cr:</strong> Prepaid at start, <strong>Income (balancing figure)</strong>, Arrears at end.</p>' },
              { type: 'watchout', title: 'Balance Sheet Treatment', html: '<p>Arrears at year end = <strong>current asset</strong> (debtor).</p><p>Prepaid at year end = <strong>current liability</strong>.</p>' },
            ]
          },
          {
            id: '13.2.2', title: 'Special Receipts',
            keyTerms: [
              { term: 'Life Membership', definition: 'A one-off payment for permanent membership — spread over expected years.' },
              { term: 'Entrance Fees', definition: 'One-off fees for new members — usually income in year received.' },
              { term: 'Government Grant', definition: 'Capital grants spread over asset life; revenue grants as immediate income.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Receipt</th><th>Treatment</th></tr></thead><tbody><tr><td>Entrance fees</td><td>Income in year received (unless capitalised by policy)</td></tr><tr><td>Life membership</td><td>Spread over expected years. Current year portion = income. Balance = liability.</td></tr><tr><td>Government grant (capital)</td><td>Spread over asset life. Annual portion = income.</td></tr><tr><td>Donations</td><td>Recurring = income. Large one-off = may go to accumulated fund.</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '13.3', title: 'Bar Trading Account',
        subTopics: [
          {
            id: '13.3.1', title: 'Preparing the Bar Account',
            body: [
              { type: 'concept', variant: 'green', title: 'Bar Trading Account', html: '<p>Bar Sales (adjusted for debtors)<br/>Less: Opening bar stock + Bar purchases (adjusted for creditors) − Closing bar stock<br/>= <strong>Bar Gross Profit</strong><br/>Less: Bar wages, bar expenses<br/>= <strong>Bar Net Profit</strong> → transferred to I&E Account.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Bar purchases come from the R&P and need adjusting for opening/closing bar creditors. Bar sales need adjusting for any bar debtors.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 14, block: 'C',
    title: 'Service Firms\' Accounts',
    description: 'Fee income, work in progress for service firms, HL adjustments.',
    estimatedMinutes: 18,
    related: [6, 13],
    sections: [
      {
        id: '14.1', title: 'Service Firm Accounts',
        subTopics: [
          {
            id: '14.1.1', title: 'Structure & Key Differences',
            keyTerms: [
              { term: 'Service Firm', definition: 'A business that provides services — e.g. solicitors, accountants, architects.' },
              { term: 'Fee Income', definition: 'The main revenue source — fees for professional services.' },
              { term: 'WIP (Service)', definition: 'Work done but not yet billed — treated as a current asset.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Differences from Trading Firms', html: '<p>1. <strong>No Trading Account</strong> — no stock, no purchases, no cost of sales.</p><p>2. Main income is <strong>fees</strong>.</p><p>3. P&L starts with <strong>Fee Income</strong> and deducts expenses.</p><p>4. <strong>Work in Progress</strong> = work done but not yet billed — current asset.</p>' },
            ]
          },
          {
            id: '14.1.2', title: 'Fee Income Calculation',
            body: [
              { type: 'concept', variant: 'green', title: 'Fee Income Formula', html: '<p>Fees received (cash) + Fees accrued at end − Fees accrued at start + Fees prepaid at start − Fees prepaid at end = <strong>Fee Income for P&L</strong></p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 15, block: 'C',
    title: 'Farm Accounts',
    description: 'Enterprise analysis, stock valuation, terms associated with farm accounting.',
    estimatedMinutes: 16,
    related: [6, 21],
    sections: [
      {
        id: '15.1', title: 'Farm Accounts',
        subTopics: [
          {
            id: '15.1.1', title: 'Structure & Special Features',
            keyTerms: [
              { term: 'Enterprise Analysis', definition: 'Analysing the profit/loss of each farming enterprise separately.' },
              { term: 'Headage', definition: 'The number of livestock on the farm.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Farm Accounts Overview', html: '<p>1. <strong>Multiple enterprises</strong> — dairy, beef, tillage, sheep.</p><p>2. <strong>Livestock valuation</strong> — at market value or deemed cost.</p><p>3. <strong>Stock changes</strong> affect profit.</p><p>4. <strong>Government grants</strong> — EU and national schemes.</p>' },
              { type: 'concept', variant: 'green', title: 'Farm P&L', html: '<p><strong>Farm Income:</strong> Sales of livestock, crops, milk + increase in stock values + grants.</p><p><strong>Less Expenses:</strong> Feed, fertiliser, vet fees, contractor charges, depreciation, wages.</p><p>= <strong>Farm Profit/Loss</strong></p>' },
            ]
          },
          {
            id: '15.1.2', title: 'Stock Valuation on Farms',
            body: [
              { type: 'concept', variant: 'amber', title: 'Livestock Valuation', html: '<p><strong>Purchased stock:</strong> Lower of cost or NRV.</p><p><strong>Home-bred stock:</strong> Deemed cost.</p><p>Increase in livestock value = income. Decrease = expense.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 16 — EXPANDED ──
  {
    id: 16, block: 'C',
    title: 'Incomplete Records',
    description: 'Control account method, net worth/balance sheet method, mark-up and margin calculations.',
    estimatedMinutes: 28,
    related: [2, 5, 6],
    sections: [
      {
        id: '16.1', title: 'The Problem of Incomplete Records',
        subTopics: [
          {
            id: '16.1.1', title: 'When Records Are Missing',
            keyTerms: [
              { term: 'Incomplete Records', definition: 'When a business has not maintained a full double-entry system.' },
              { term: 'Single Entry', definition: 'An informal system where not all transactions have both debit and credit.' },
            ],
            body: [
              { type: 'prose', html: '<p>Many small businesses do not keep full double-entry records. The accountant must <strong>reconstruct</strong> the accounts using whatever information is available.</p>' },
            ]
          },
        ]
      },
      {
        id: '16.2', title: 'Method 1: Control Account / Cash Method',
        subTopics: [
          {
            id: '16.2.1', title: 'Using Control Accounts',
            body: [
              { type: 'concept', variant: 'blue', title: 'Finding Credit Sales', html: '<p>Prepare a <strong>Debtors Control Account</strong>:</p><p><strong>Dr:</strong> Opening debtors, Credit sales (balancing figure).<br/><strong>Cr:</strong> Cash received, Sales returns, Bad debts, Discount allowed, Closing debtors.</p><p>The balancing figure = Credit Sales.</p>' },
              { type: 'concept', variant: 'green', title: 'Finding Credit Purchases', html: '<p>Prepare a <strong>Creditors Control Account</strong>:</p><p><strong>Dr:</strong> Cash paid, Purchase returns, Discount received, Closing creditors.<br/><strong>Cr:</strong> Opening creditors, Credit purchases (balancing figure).</p>' },
              { type: 'concept', variant: 'amber', title: 'Cash/Bank Summary', html: '<p>List all known receipts and payments. The balancing figure may represent cash sales or unrecorded drawings.</p>' },
            ]
          },
        ]
      },
      {
        id: '16.3', title: 'Method 2: Net Worth / Balance Sheet Method',
        subTopics: [
          {
            id: '16.3.1', title: 'Calculating Profit from Net Worth',
            keyTerms: [
              { term: 'Net Worth Method', definition: 'Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced.' },
              { term: 'Statement of Affairs', definition: 'A balance sheet prepared from incomplete records.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Net Worth Formula', html: '<p><strong>Net Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced</strong></p><p>1. Prepare opening statement of affairs → Opening Capital.</p><p>2. Prepare closing statement of affairs → Closing Capital.</p><p>3. Apply the formula.</p>' },
            ]
          },
          {
            id: '16.3.2', title: 'Mark-Up vs Margin',
            keyTerms: [
              { term: 'Mark-Up', definition: 'Profit expressed as a percentage of cost price. If mark-up is 25%: SP = Cost × 1.25.' },
              { term: 'Margin', definition: 'Profit expressed as a percentage of selling price. If margin is 20%: Cost = SP × 0.80.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Mark-Up vs Margin Formulas', html: '<p><strong>Mark-Up = Profit / Cost × 100</strong></p><p><strong>Margin = Profit / Sales × 100</strong></p><p>If cost is €100 and selling price is €125:</p><p>Mark-up = 25/100 = <strong>25%</strong></p><p>Margin = 25/125 = <strong>20%</strong></p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Mark-Up</th><th>Equivalent Margin</th></tr></thead><tbody><tr><td>25%</td><td>20%</td></tr><tr><td>33⅓%</td><td>25%</td></tr><tr><td>50%</td><td>33⅓%</td></tr><tr><td>100%</td><td>50%</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Finding Missing Figures', html: '<p>If you know the mark-up/margin and one of (sales, cost, profit), you can find the others. This is essential for incomplete records questions where the accountant must reconstruct the trading account.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 17 — EXPANDED ──
  {
    id: 17, block: 'C',
    title: 'Cash Flow Statements',
    description: 'FRS 1 Revised format, reconciliation notes, operating activities, investing, financing.',
    estimatedMinutes: 35,
    related: [9, 10, 18],
    sections: [
      {
        id: '17.1', title: 'Purpose & Structure',
        subTopics: [
          {
            id: '17.1.1', title: 'Why Cash Flow Statements?',
            keyTerms: [
              { term: 'Cash Flow Statement', definition: 'Shows the sources and uses of cash during the accounting period — explains the change in the cash/bank balance.' },
              { term: 'Operating Activities', definition: 'Cash flows from the main revenue-producing activities of the business.' },
              { term: 'Investing Activities', definition: 'Cash flows from buying/selling fixed assets and investments.' },
              { term: 'Financing Activities', definition: 'Cash flows from changes in the capital structure — share issues, loans, dividends.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Prepare a Cash Flow Statement?', html: '<p>Profit ≠ Cash. A profitable business can still run out of cash.</p><p>The cash flow statement shows where cash came from and where it went, helping users assess:</p><p>1. The company\'s ability to <strong>generate cash</strong> from operations.</p><p>2. The company\'s ability to <strong>pay dividends</strong> and <strong>repay loans</strong>.</p><p>3. The reasons for <strong>differences between profit and cash</strong>.</p><p>4. The impact of <strong>investing and financing</strong> decisions on cash.</p>' },
              { type: 'watchout', title: 'Profit vs Cash', html: '<p>Common reasons profit ≠ cash: depreciation (expense but no cash flow), credit sales (income but no cash yet), stock increases (cash spent but not yet in cost of sales), capital expenditure (cash out but only depreciation hits P&L).</p>' },
            ]
          },
        ]
      },
      {
        id: '17.2', title: 'Operating Activities',
        subTopics: [
          {
            id: '17.2.1', title: 'Indirect Method',
            body: [
              { type: 'concept', variant: 'blue', title: 'From Operating Profit to Cash', html: '<p><strong>Operating Profit</strong> (from P&L)<br/>+ Depreciation (add back — not a cash item)<br/>+ Loss on disposal (add back) or − Profit on disposal (deduct)<br/>+ Decrease in stock or − Increase in stock<br/>+ Decrease in debtors or − Increase in debtors<br/>+ Increase in creditors or − Decrease in creditors<br/>= <strong>Cash generated from operations</strong></p><p>− Interest paid<br/>− Tax paid<br/>= <strong>Net cash from operating activities</strong></p>' },
              { type: 'examtip', title: 'Memory Aid', html: '<p><strong>Assets going UP = cash going DOWN</strong> (you spent cash to acquire them).</p><p><strong>Liabilities going UP = cash staying IN</strong> (you haven\'t paid yet).</p><p>This is why increases in debtors/stock are deducted, and increases in creditors are added.</p>' },
            ]
          },
        ]
      },
      {
        id: '17.3', title: 'Investing & Financing Activities',
        subTopics: [
          {
            id: '17.3.1', title: 'Investing Activities',
            body: [
              { type: 'concept', variant: 'green', title: 'Investing Activities', html: '<p><strong>Cash outflows:</strong> Purchase of fixed assets (tangible and intangible), purchase of investments.</p><p><strong>Cash inflows:</strong> Proceeds from sale of fixed assets, proceeds from sale of investments, investment income received.</p><p>Use the fixed asset accounts to calculate amounts: Closing cost − Opening cost + Disposals at cost = Purchases.</p>' },
            ]
          },
          {
            id: '17.3.2', title: 'Financing Activities',
            body: [
              { type: 'concept', variant: 'amber', title: 'Financing Activities', html: '<p><strong>Cash inflows:</strong> Issue of shares, new loans/debentures received.</p><p><strong>Cash outflows:</strong> Repayment of loans/debentures, dividends paid (or if treated under operating).</p><p>The net of all three sections should equal the <strong>change in cash/bank</strong> from the opening to closing Balance Sheet.</p>' },
            ]
          },
        ]
      },
      {
        id: '17.4', title: 'Reconciliation Notes',
        subTopics: [
          {
            id: '17.4.1', title: 'When Operating Profit Is Not Given',
            body: [
              { type: 'concept', variant: 'blue', title: 'Calculating Operating Profit', html: '<p>If the question does not give operating profit directly, calculate it:</p><p><strong>Operating Profit = Net Profit + Interest paid + Tax charged − Investment income</strong></p><p>This strips out the financing and investing items to get back to the operating level.</p>' },
              { type: 'concept', variant: 'green', title: 'Working Out Cash Paid', html: '<p>For interest paid, tax paid, or dividends paid, use a T-account:</p><p><strong>Opening liability + P&L charge − Cash paid = Closing liability</strong></p><p>Therefore: <strong>Cash paid = Opening + Charge − Closing</strong></p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 18 — EXPANDED ──
  {
    id: 18, block: 'C',
    title: 'Ratio Analysis & Interpretation',
    description: 'Profitability, liquidity, activity, gearing, and investment ratios with interpretation.',
    estimatedMinutes: 40,
    related: [9, 10, 17],
    sections: [
      {
        id: '18.1', title: 'Part A: Ratio Formulas',
        subTopics: [
          {
            id: '18.1.1', title: 'Profitability Ratios',
            keyTerms: [
              { term: 'Gross Profit %', definition: 'Gross Profit / Sales × 100. Measures efficiency of trading.' },
              { term: 'Net Profit %', definition: 'Net Profit / Sales × 100. Measures overall profitability after all expenses.' },
              { term: 'Return on Capital Employed (ROCE)', definition: 'Net Profit / Capital Employed × 100. The "master" ratio — measures return on investment.' },
              { term: 'Mark-Up', definition: 'Gross Profit / Cost of Sales × 100.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>What It Measures</th></tr></thead><tbody><tr><td>Gross Profit %</td><td>GP / Sales × 100</td><td>Efficiency of trading/buying</td></tr><tr><td>Net Profit %</td><td>NP / Sales × 100</td><td>Overall profitability</td></tr><tr><td>ROCE</td><td>NP / Capital Employed × 100</td><td>Return on total investment</td></tr><tr><td>Mark-Up</td><td>GP / COS × 100</td><td>Profit added to cost</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.1.2', title: 'Liquidity Ratios',
            keyTerms: [
              { term: 'Current Ratio', definition: 'Current Assets / Current Liabilities. Ideal: 2:1.' },
              { term: 'Acid Test (Quick Ratio)', definition: '(Current Assets − Stock) / Current Liabilities. Ideal: 1:1.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>Ideal</th></tr></thead><tbody><tr><td>Current Ratio</td><td>CA / CL</td><td>2:1</td></tr><tr><td>Acid Test</td><td>(CA − Stock) / CL</td><td>1:1</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Too High is Bad Too', html: '<p>A current ratio of 5:1 means the business has too much idle cash or stock — capital is not being used efficiently.</p>' },
            ]
          },
          {
            id: '18.1.3', title: 'Activity (Efficiency) Ratios',
            keyTerms: [
              { term: 'Stock Turnover', definition: 'Cost of Sales / Average Stock. How many times stock is sold and replaced per year.' },
              { term: 'Debtors Collection Period', definition: 'Debtors / Credit Sales × 365. Days to collect from customers.' },
              { term: 'Creditors Payment Period', definition: 'Creditors / Credit Purchases × 365. Days to pay suppliers.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>Better When</th></tr></thead><tbody><tr><td>Stock Turnover</td><td>COS / Average Stock</td><td>Higher (selling stock faster)</td></tr><tr><td>Debtors Days</td><td>Debtors / Credit Sales × 365</td><td>Lower (collecting faster)</td></tr><tr><td>Creditors Days</td><td>Creditors / Credit Purchases × 365</td><td>Higher (taking longer to pay — but not too long)</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.1.4', title: 'Gearing & Investment Ratios',
            keyTerms: [
              { term: 'Gearing Ratio', definition: 'Long-term Debt / Capital Employed × 100. Measures financial risk.' },
              { term: 'Interest Cover', definition: 'Operating Profit / Interest payable. Times interest is covered by profit.' },
              { term: 'Earnings Per Share (EPS)', definition: 'Profit after tax and pref dividends / Number of ordinary shares.' },
              { term: 'Dividend Cover', definition: 'EPS / Dividend per share. Times dividends are covered by earnings.' },
              { term: 'Price/Earnings (P/E) Ratio', definition: 'Market price per share / EPS. Market confidence indicator.' },
              { term: 'Dividend Yield', definition: 'Dividend per share / Market price × 100. Actual return to shareholders.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th></tr></thead><tbody><tr><td>Gearing</td><td>Long-term Debt / Capital Employed × 100</td></tr><tr><td>Interest Cover</td><td>Operating Profit / Interest payable</td></tr><tr><td>EPS</td><td>(PAT − Pref Div) / No. of Ordinary Shares</td></tr><tr><td>Dividend Cover</td><td>EPS / DPS</td></tr><tr><td>P/E Ratio</td><td>Market Price / EPS</td></tr><tr><td>Dividend Yield</td><td>DPS / Market Price × 100</td></tr></tbody></table>' },
              { type: 'watchout', title: 'High vs Low Gearing', html: '<p><strong>High gearing (>50%):</strong> More debt relative to equity → higher financial risk but interest is tax-deductible.</p><p><strong>Low gearing (<25%):</strong> Less debt → lower risk but potentially lower returns for shareholders.</p>' },
            ]
          },
        ]
      },
      {
        id: '18.2', title: 'Part B: Interpretation & Stakeholder Analysis',
        subTopics: [
          {
            id: '18.2.1', title: 'How to Interpret Ratios',
            body: [
              { type: 'concept', variant: 'blue', title: 'Interpretation Steps', html: '<p>1. <strong>Calculate</strong> the ratio for both years.</p><p>2. <strong>State the trend</strong> — has it improved or worsened?</p><p>3. <strong>Give a reason</strong> — what caused the change?</p><p>4. <strong>Suggest a remedy</strong> — what can management do?</p>' },
              { type: 'concept', variant: 'green', title: 'Compare Against', html: '<p>1. <strong>Previous years</strong> — is the trend improving?</p><p>2. <strong>Industry averages</strong> — is the business performing above or below average?</p><p>3. <strong>Competitors</strong> — how does it compare with rivals?</p><p>4. <strong>Benchmarks</strong> — ideal ratios (current ratio 2:1, acid test 1:1).</p>' },
            ]
          },
          {
            id: '18.2.2', title: 'Stakeholder Perspective',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Stakeholder</th><th>Most Interested In</th></tr></thead><tbody><tr><td>Shareholders</td><td>EPS, dividend yield, P/E ratio, ROCE</td></tr><tr><td>Banks/Lenders</td><td>Gearing, interest cover, current ratio, acid test</td></tr><tr><td>Suppliers</td><td>Current ratio, creditors days, acid test</td></tr><tr><td>Employees</td><td>Profitability, liquidity (job security)</td></tr><tr><td>Management</td><td>All ratios — for planning and control</td></tr><tr><td>Revenue</td><td>Profitability (tax base)</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.2.3', title: 'Limitations of Ratio Analysis',
            body: [
              { type: 'concept', variant: 'amber', title: 'Limitations', html: '<p>1. Based on <strong>historical data</strong> — past performance may not predict the future.</p><p>2. <strong>Different accounting policies</strong> make comparison between companies difficult.</p><p>3. <strong>Window dressing</strong> — companies may manipulate year-end figures.</p><p>4. <strong>Inflation</strong> distorts comparisons over time.</p><p>5. <strong>Non-financial factors</strong> are ignored (staff morale, brand value, innovation).</p><p>6. Ratios are <strong>interrelated</strong> — improving one may worsen another.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 19, block: 'C',
    title: 'Tabular Statements',
    description: 'Effects of transactions on the balance sheet — assets, liabilities, and capital.',
    estimatedMinutes: 15,
    related: [1, 2, 6],
    sections: [
      {
        id: '19.1', title: 'Tabular Statements',
        subTopics: [
          {
            id: '19.1.1', title: 'The Accounting Equation',
            keyTerms: [
              { term: 'Accounting Equation', definition: 'Assets = Liabilities + Capital. Every transaction maintains this equality.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'How Tabular Statements Work', html: '<p>A tabular statement shows the effect of each transaction on the <strong>balance sheet</strong>. After each transaction, the accounting equation must still balance.</p><p><strong>Assets = Liabilities + Capital</strong></p><p>Each transaction affects at least two items. Show + and − for each affected item and verify the equation still balances.</p>' },
              { type: 'example', title: 'Example Transactions', html: '<p><strong>Owner invests €10,000:</strong> Assets (Bank) +€10,000, Capital +€10,000.</p><p><strong>Buy equipment for €3,000 cash:</strong> Assets (Equipment) +€3,000, Assets (Bank) −€3,000. No net change.</p><p><strong>Buy stock on credit €2,000:</strong> Assets (Stock) +€2,000, Liabilities (Creditors) +€2,000.</p><p><strong>Pay wages €500:</strong> Assets (Bank) −€500, Capital −€500 (expense reduces capital).</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK D — MANAGEMENT ACCOUNTING (Ch 20-24)
  // ──────────────────────────────────────────────────
  {
    id: 20, block: 'D',
    title: 'Nature & Scope of Management Accounting',
    description: 'Role of the management accountant, relationship between management and financial accounting.',
    estimatedMinutes: 14,
    related: [1, 21, 22, 23, 24],
    sections: [
      {
        id: '20.1', title: 'Management Accounting Overview',
        subTopics: [
          {
            id: '20.1.1', title: 'Role & Functions',
            keyTerms: [
              { term: 'Management Accountant', definition: 'Provides financial information for internal decision-making — planning, controlling, and decision-making.' },
              { term: 'Planning', definition: 'Setting objectives and determining how to achieve them — budgets and forecasts.' },
              { term: 'Controlling', definition: 'Monitoring actual vs planned performance — variance analysis.' },
              { term: 'Decision-Making', definition: 'Using financial data to choose between alternatives.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Functions', html: '<p>1. <strong>Planning:</strong> Budgets, forecasting, strategic planning.</p><p>2. <strong>Controlling:</strong> Actual vs budget, investigating variances, corrective action.</p><p>3. <strong>Decision-making:</strong> Make or buy, pricing, discontinuation, special orders.</p><p>4. <strong>Performance evaluation:</strong> Assessing departments and managers.</p>' },
            ]
          },
          {
            id: '20.1.2', title: 'Management vs Financial Accounting',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Financial Accounting</th><th>Management Accounting</th></tr></thead><tbody><tr><td>Focus</td><td>Past events</td><td>Future decisions + past</td></tr><tr><td>Users</td><td>External</td><td>Internal</td></tr><tr><td>Legal requirement</td><td>Mandatory</td><td>Optional</td></tr><tr><td>Format</td><td>Prescribed by law</td><td>Flexible</td></tr><tr><td>Time period</td><td>Usually annual</td><td>Any period</td></tr><tr><td>Verification</td><td>Audited</td><td>Not audited</td></tr></tbody></table>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 21, block: 'D',
    title: 'Cost Classification',
    description: 'Fixed vs variable costs, mixed cost separation, direct vs indirect, cost behaviour.',
    estimatedMinutes: 20,
    related: [20, 22, 23, 24],
    sections: [
      {
        id: '21.1', title: 'Types of Costs',
        subTopics: [
          {
            id: '21.1.1', title: 'Fixed, Variable & Semi-Variable',
            keyTerms: [
              { term: 'Fixed Costs', definition: 'Constant in total regardless of output. Per unit cost decreases as output increases.' },
              { term: 'Variable Costs', definition: 'Change in direct proportion to output. Per unit cost remains constant.' },
              { term: 'Semi-Variable', definition: 'Both fixed and variable elements. E.g. telephone (fixed rental + variable calls).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Fixed Costs', html: '<p><strong>Fixed costs</strong> remain <strong>constant in total</strong> regardless of output. However, fixed cost <strong>per unit decreases</strong> as output increases.</p><p>Examples: rent, insurance, depreciation (straight-line), salaries.</p>' },
              { type: 'concept', variant: 'green', title: 'Variable Costs', html: '<p><strong>Variable costs</strong> change in <strong>direct proportion</strong> to output. Variable cost <strong>per unit remains constant</strong>.</p><p>Examples: raw materials, direct wages (piece rate), packaging.</p>' },
              { type: 'concept', variant: 'amber', title: 'Semi-Variable', html: '<p>Both fixed and variable elements. E.g. electricity (standing charge + usage), salesperson (salary + commission).</p><p><strong>Step fixed:</strong> Fixed within a range then steps up. E.g. supervisors, premises.</p>' },
            ]
          },
          {
            id: '21.1.2', title: 'Direct vs Indirect Costs',
            keyTerms: [
              { term: 'Direct Costs', definition: 'Can be directly traced to a specific product or cost centre.' },
              { term: 'Indirect Costs', definition: 'Cannot be directly traced — must be allocated or apportioned.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Direct Costs</th><th>Indirect Costs (Overheads)</th></tr></thead><tbody><tr><td>Direct materials</td><td>Factory rent & rates</td></tr><tr><td>Direct labour</td><td>Supervisor\'s salary</td></tr><tr><td>Direct expenses (royalties)</td><td>Depreciation of factory equipment</td></tr><tr><td></td><td>Indirect materials (cleaning supplies)</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '21.2', title: 'Separation of Mixed Costs (HL)',
        subTopics: [
          {
            id: '21.2.1', title: 'The High-Low Method',
            keyTerms: [
              { term: 'High-Low Method', definition: 'Separates mixed costs into fixed and variable components using the highest and lowest activity levels.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Steps', html: '<p>1. Identify highest and lowest activity levels and total costs.</p><p>2. <strong>Variable cost per unit</strong> = (Highest cost − Lowest cost) / (Highest activity − Lowest activity)</p><p>3. <strong>Fixed cost</strong> = Total cost − (Variable per unit × Activity)</p>' },
              { type: 'example', title: 'Example', html: '<p>High: 300 units, €2,500. Low: 100 units, €1,500.</p><p>Variable = (€2,500 − €1,500) / (300 − 100) = <strong>€5/unit</strong></p><p>Fixed = €2,500 − (€5 × 300) = <strong>€1,000</strong></p><p>Cost equation: TC = €1,000 + €5x</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 22, block: 'D',
    title: 'Product Costing',
    description: 'Stock valuation (FIFO, LIFO, weighted average), absorption costing, apportionment.',
    estimatedMinutes: 30,
    related: [11, 21, 23],
    sections: [
      {
        id: '22.1', title: 'Part A: Stock Valuation',
        subTopics: [
          {
            id: '22.1.1', title: 'FIFO, LIFO & Weighted Average',
            keyTerms: [
              { term: 'FIFO', definition: 'First In, First Out — oldest stock sold first. Closing stock at most recent prices.' },
              { term: 'LIFO', definition: 'Last In, First Out — newest stock sold first. Closing stock at oldest prices.' },
              { term: 'Weighted Average', definition: 'Average cost recalculated after each purchase.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'FIFO', html: '<p>Issues oldest stock first. Closing stock at most recent prices.</p><p>Rising prices: <strong>higher closing stock → higher GP</strong>. Accepted under FRS 102.</p>' },
              { type: 'concept', variant: 'green', title: 'LIFO', html: '<p>Issues newest stock first. Closing stock at oldest prices.</p><p>Rising prices: <strong>lower closing stock → lower GP</strong>. NOT accepted under FRS 102 for published accounts.</p>' },
              { type: 'concept', variant: 'amber', title: 'Weighted Average', html: '<p>New average after each purchase. Smooths price fluctuations. Results between FIFO and LIFO.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Method</th><th>Closing Stock</th><th>COS</th><th>GP</th></tr></thead><tbody><tr><td>FIFO (rising prices)</td><td>Highest</td><td>Lowest</td><td>Highest</td></tr><tr><td>LIFO (rising prices)</td><td>Lowest</td><td>Highest</td><td>Lowest</td></tr><tr><td>Weighted Average</td><td>Middle</td><td>Middle</td><td>Middle</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '22.2', title: 'Part B: Absorption Costing',
        subTopics: [
          {
            id: '22.2.1', title: 'Full Costing Method',
            keyTerms: [
              { term: 'Absorption Costing', definition: 'All production costs (fixed and variable) are included in product cost.' },
              { term: 'OAR', definition: 'Overhead Absorption Rate = Budgeted Overheads / Budgeted Activity.' },
              { term: 'Over-absorption', definition: 'Overheads absorbed > actual — added back to profit.' },
              { term: 'Under-absorption', definition: 'Overheads absorbed < actual — deducted from profit.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Absorption Costing', html: '<p><strong>Direct Materials + Direct Labour + Direct Expenses + Absorbed Overhead = Total Cost per Unit</strong></p>' },
              { type: 'concept', variant: 'blue', title: 'OAR Calculation', html: '<p><strong>OAR = Budgeted Overheads / Budgeted Activity</strong></p><p>Applied to actual activity to calculate absorbed overheads.</p>' },
              { type: 'concept', variant: 'amber', title: 'Steps in Overhead Recovery', html: '<p>1. <strong>Allocation</strong> — assign directly to departments.</p><p>2. <strong>Apportionment</strong> — share common costs.</p><p>3. <strong>Reapportionment</strong> — transfer service dept costs to production.</p><p>4. <strong>Absorption</strong> — charge to products using OAR.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 23, block: 'D',
    title: 'CVP Analysis / Marginal Costing',
    description: 'Break-even analysis, contribution, marginal vs absorption comparison, special decisions.',
    estimatedMinutes: 28,
    related: [21, 22, 24],
    sections: [
      {
        id: '23.1', title: 'Marginal Costing',
        subTopics: [
          {
            id: '23.1.1', title: 'Key Concepts',
            keyTerms: [
              { term: 'Marginal Costing', definition: 'Only variable costs charged to products. Fixed costs are period costs.' },
              { term: 'Contribution', definition: 'Sales − Variable Costs. Amount available to cover fixed costs and profit.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Marginal Costing', html: '<p>Only <strong>variable costs</strong> are charged to products. Fixed costs are period costs.</p><p><strong>Contribution = Sales − Variable Costs</strong></p><p><strong>Profit = Total Contribution − Fixed Costs</strong></p>' },
              { type: 'concept', variant: 'green', title: 'Income Statement', html: '<p>Sales<br/>Less: Variable Costs<br/>= <strong>Contribution</strong><br/>Less: Fixed Costs<br/>= <strong>Profit/Loss</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '23.2', title: 'Break-Even Analysis',
        subTopics: [
          {
            id: '23.2.1', title: 'Break-Even Formulas',
            keyTerms: [
              { term: 'BEP', definition: 'Break-Even Point — where total revenue equals total costs. Contribution = Fixed costs.' },
              { term: 'Margin of Safety', definition: 'Actual sales minus BEP sales. Amount sales can fall before a loss.' },
              { term: 'C/S Ratio', definition: 'Contribution / Sales × 100.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Formulas', html: '<p><strong>BEP (units)</strong> = Fixed Costs / Contribution per unit</p><p><strong>BEP (sales)</strong> = Fixed Costs / C/S Ratio</p><p><strong>C/S Ratio</strong> = Contribution per unit / SP × 100</p><p><strong>Margin of Safety</strong> = Actual sales − BEP sales</p><p><strong>Target Profit (units)</strong> = (FC + Target Profit) / Contribution per unit</p>' },
              { type: 'example', title: 'Example', html: '<p>SP €50, VC €30, FC €100,000.</p><p>Contribution = €20. BEP = €100,000 / €20 = <strong>5,000 units</strong></p><p>BEP sales = 5,000 × €50 = <strong>€250,000</strong></p><p>If actual = 7,000: MoS = 2,000 units (28.6%)</p>' },
            ]
          },
        ]
      },
      {
        id: '23.3', title: 'Marginal vs Absorption & Special Decisions',
        subTopics: [
          {
            id: '23.3.1', title: 'Profit Differences',
            body: [
              { type: 'concept', variant: 'amber', title: 'When Profits Differ', html: '<p><strong>Production > Sales (stock increases):</strong> Absorption profit > Marginal profit.</p><p><strong>Production < Sales (stock decreases):</strong> Marginal profit > Absorption profit.</p><p><strong>Production = Sales:</strong> Same profit.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Situation</th><th>Higher Profit</th><th>Reason</th></tr></thead><tbody><tr><td>Stock increases</td><td>Absorption</td><td>Fixed costs deferred in closing stock</td></tr><tr><td>Stock decreases</td><td>Marginal</td><td>Fixed costs from last year released</td></tr><tr><td>No stock change</td><td>Same</td><td>Same fixed costs charged</td></tr></tbody></table>' },
            ]
          },
          {
            id: '23.3.2', title: 'Special Decisions',
            body: [
              { type: 'concept', variant: 'blue', title: 'Decision-Making Uses', html: '<p>1. <strong>Special order:</strong> Accept if price > variable cost (positive contribution) and spare capacity exists.</p><p>2. <strong>Make or buy:</strong> Compare variable cost of making with purchase price.</p><p>3. <strong>Continue or close:</strong> Continue if positive contribution to fixed costs.</p><p>4. <strong>Limiting factor:</strong> Rank by contribution per unit of scarce resource.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 24, block: 'D',
    title: 'Budgeting & Budgetary Control',
    description: 'Manufacturing budgets, cash budgets, flexible budgets, variance analysis.',
    estimatedMinutes: 30,
    related: [20, 21, 22, 23],
    sections: [
      {
        id: '24.1', title: 'Part A: Manufacturing Budgets',
        subTopics: [
          {
            id: '24.1.1', title: 'Budget Types & Preparation',
            keyTerms: [
              { term: 'Budget', definition: 'A financial plan for a future period expressed in monetary terms.' },
              { term: 'Master Budget', definition: 'The overall budget comprising all functional budgets — culminates in budgeted P&L and Balance Sheet.' },
              { term: 'Production Budget', definition: 'Expected sales ± desired change in finished goods stock = Units to produce.' },
              { term: 'Materials Budget', definition: 'Production needs ± desired change in raw materials stock = Materials to purchase.' },
              { term: 'Labour Budget', definition: 'Production units × labour hours per unit × wage rate.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Budget Hierarchy', html: '<p>1. <strong>Sales Budget</strong> — starting point (all other budgets derive from expected sales).</p><p>2. <strong>Production Budget</strong> = Sales + Closing stock − Opening stock.</p><p>3. <strong>Materials Budget</strong> = Production needs + Closing stock − Opening stock.</p><p>4. <strong>Labour Budget</strong> = Production × hours × rate.</p><p>5. <strong>Overhead Budget</strong> = Fixed + variable overheads.</p><p>6. <strong>Cash Budget</strong> — timing of cash receipts and payments.</p>' },
            ]
          },
        ]
      },
      {
        id: '24.2', title: 'Part B: Cash Budgets',
        subTopics: [
          {
            id: '24.2.1', title: 'Cash Budget Preparation',
            keyTerms: [
              { term: 'Cash Budget', definition: 'A forecast of cash inflows and outflows over a future period — shows expected cash surplus or deficit each month.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Cash Budget Format', html: '<p><strong>Opening balance</strong><br/>+ Cash receipts (cash sales, debtor collections, other income)<br/>− Cash payments (purchases, wages, overheads, capital expenditure, loan repayments)<br/>= <strong>Closing balance</strong></p><p>The closing balance of one month becomes the opening balance of the next.</p>' },
              { type: 'watchout', title: 'Cash vs Profit', html: '<p>The cash budget does NOT include depreciation (not a cash flow) but DOES include capital expenditure, loan repayments, and VAT payments. Credit terms affect timing — sales on 30-day credit mean cash arrives the following month.</p>' },
            ]
          },
        ]
      },
      {
        id: '24.3', title: 'Part C: Flexible Budgets & Variance Analysis (HL)',
        subTopics: [
          {
            id: '24.3.1', title: 'Flexible Budgets',
            keyTerms: [
              { term: 'Fixed Budget', definition: 'Prepared for one level of activity — does not change when actual activity differs.' },
              { term: 'Flexible Budget', definition: 'Adjusts for the actual level of activity achieved — allows meaningful comparison with actual results.' },
              { term: 'Variance', definition: 'The difference between budgeted and actual figures. Favourable = actual better than budget. Adverse = actual worse.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Fixed vs Flexible', html: '<p>A <strong>fixed budget</strong> is based on one level of output. If actual output differs, comparison is meaningless.</p><p>A <strong>flexible budget</strong> adjusts the budget to actual output: fixed costs stay the same, variable costs are flexed to actual volume.</p><p>This gives a meaningful <strong>like-for-like comparison</strong> with actual results.</p>' },
              { type: 'concept', variant: 'green', title: 'Variance Types', html: '<p><strong>Favourable (F):</strong> Actual result is better than budget — higher revenue or lower cost.</p><p><strong>Adverse (A):</strong> Actual result is worse — lower revenue or higher cost.</p><p>Significant variances should be <strong>investigated</strong> and explained.</p>' },
            ]
          },
          {
            id: '24.3.2', title: 'Sensitivity Analysis',
            keyTerms: [
              { term: 'Sensitivity Analysis', definition: '"What if" analysis — shows the effect on profit from changes in key variables.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Investigating Variances', html: '<p>Not all variances need investigation. Focus on variances that are:</p><p>1. <strong>Significant</strong> — large in absolute or percentage terms.</p><p>2. <strong>Controllable</strong> — the manager can take action.</p><p>3. <strong>Recurring</strong> — happening repeatedly.</p>' },
              { type: 'concept', variant: 'blue', title: 'Sensitivity Analysis', html: '<p>Examines how changes in key variables affect profit:</p><p>1. What if selling price decreases by 10%?</p><p>2. What if sales volume falls by 15%?</p><p>3. What if variable costs increase by 5%?</p><p>4. What if fixed costs increase by €20,000?</p><p>The variable with the <strong>biggest impact</strong> on profit is the most <strong>sensitive</strong> factor.</p>' },
            ]
          },
        ]
      },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════
// SEARCH INDEX
// ═══════════════════════════════════════════════════════════════════

export interface SearchableItem {
  type: 'chapter' | 'section' | 'subtopic' | 'keyterm';
  title: string;
  body: string;
  breadcrumb: string;
  chapterId: number;
  sectionId: string | null;
  subTopicId: string | null;
}

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  for (const ch of CHAPTERS) {
    items.push({
      type: 'chapter',
      title: ch.title,
      body: ch.description,
      breadcrumb: `Block ${ch.block} — Ch ${ch.id}`,
      chapterId: ch.id,
      sectionId: null,
      subTopicId: null,
    });

    for (const sec of ch.sections) {
      items.push({
        type: 'section',
        title: sec.title,
        body: '',
        breadcrumb: `Ch ${ch.id} ${ch.title} → ${sec.id}`,
        chapterId: ch.id,
        sectionId: sec.id,
        subTopicId: null,
      });

      for (const sub of sec.subTopics) {
        const bodyText = sub.body.map(b => b.html.replace(/<[^>]+>/g, '')).join(' ').slice(0, 300);
        items.push({
          type: 'subtopic',
          title: sub.title,
          body: bodyText,
          breadcrumb: `Ch ${ch.id} → ${sec.id} ${sec.title}`,
          chapterId: ch.id,
          sectionId: sec.id,
          subTopicId: sub.id,
        });

        if (sub.keyTerms) {
          for (const kt of sub.keyTerms) {
            items.push({
              type: 'keyterm',
              title: kt.term,
              body: kt.definition,
              breadcrumb: `Ch ${ch.id} → ${sec.id} → ${sub.title}`,
              chapterId: ch.id,
              sectionId: sec.id,
              subTopicId: sub.id,
            });
          }
        }
      }
    }
  }

  return items;
}
