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
  /** Past-paper pointers, e.g. ["2019 Q7 (a)", "2014 Q9 (b) — short Qs"] */
  examPointers?: string[];
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
    examPointers: [
      '2023 Q9 (b) — Accounting concepts (matching, prudence, going concern)',
      '2019 Q7 (a) — Qualities of useful financial information',
      '2017 Q9 (a) — Distinguish financial vs management accounting',
      '2014 Q9 (a) — Users of financial information & their needs',
    ],
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
              { term: 'Accounting Concept', definition: 'A fundamental rule or assumption underlying the preparation of financial statements — accepted as a basic principle by the accounting profession.' },
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
              { type: 'prose', html: '<p>An <strong>accounting concept</strong> is a fundamental rule or assumption that underpins how financial statements are prepared. Concepts are accepted as basic principles by the accounting profession and ensure accounts are meaningful, comparable and prudent. The four most often examined are <strong>going concern, accruals, prudence and consistency</strong>.</p>' },
              { type: 'concept', variant: 'blue', title: 'Going Concern', html: '<p>The <strong>going concern</strong> concept assumes the business will continue operating indefinitely. This means assets are valued at <strong>historical cost</strong> (what they cost), not at what they could be sold for in a fire sale.</p><p>If the business is NOT a going concern (i.e. closing down), assets must be valued at <strong>net realisable value</strong> (break-up basis).</p>' },
              { type: 'concept', variant: 'green', title: 'Accruals / Matching', html: '<p>Income earned during the period must be matched with the expenses incurred in earning that income, regardless of when cash was received or paid. The accruals concept is fundamental because without it profit could be manipulated by simply delaying or accelerating cash payments.</p><p><em>Illustration:</em> insurance paid in advance is deducted from the expense as a prepayment; wages owed at year end are added as an accrual.</p>' },
              { type: 'concept', variant: 'amber', title: 'Prudence', html: '<p>Never anticipate profits — only recognise them when realised. Always provide for ALL foreseeable losses, even if they haven\'t crystallised yet.</p><p><em>Illustration:</em> value closing stock at the <strong>lower</strong> of cost or net realisable value; create a provision for bad debts even if the debt has not yet been proven bad. Without prudence, profits would be overstated and losses understated.</p>' },
              { type: 'concept', variant: 'red', title: 'Consistency', html: '<p>Once an accounting method is chosen (e.g. straight-line depreciation for machinery), it should be applied consistently from year to year.</p><p>This ensures financial statements are <strong>comparable</strong> over time. If a change is made, it must be disclosed and justified.</p>' },
              { type: 'concept', variant: 'blue', title: 'Business Entity', html: '<p>The business is treated as <strong>separate</strong> from its owner(s). Only transactions of the business itself are recorded; the owner\'s private affairs are kept out of the books.</p><p><em>Illustration:</em> if the owner uses business cash to pay a personal bill, the entry is to <strong>Drawings</strong>, not to expenses.</p>' },
              { type: 'concept', variant: 'green', title: 'Money Measurement', html: '<p>Only items that can be expressed in monetary terms are recorded in the accounts. Important non-monetary factors — staff morale, customer loyalty, the skill of the management team — are not shown even though they affect the future of the business.</p>' },
              { type: 'concept', variant: 'amber', title: 'Materiality', html: '<p>Items of <strong>insignificant value</strong> need not be precisely accounted for. The cost of careful tracking would outweigh the benefit.</p><p><em>Illustration:</em> a small waste-paper bin or stapler is expensed immediately rather than capitalised and depreciated over its useful life.</p>' },
              { type: 'concept', variant: 'red', title: 'Dual Aspect', html: '<p>Every transaction has <strong>two equal and opposite effects</strong> — a debit in one account and a credit in another of equal value. This is the foundation of double-entry bookkeeping and the reason a trial balance should always balance.</p>' },
              { type: 'concept', variant: 'blue', title: 'Realisation', html: '<p>Revenue is recognised <strong>when it is earned</strong> — when goods or services have been delivered — not when cash is received.</p><p><em>Illustration:</em> credit sales of €5,000 are recorded as sales income immediately even though the cash will not arrive for 30 days.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Questions on accounting concepts often ask you to identify which concept applies to a given scenario, or to <strong>explain a concept and give an example</strong>. Know the definition of each and a one-line illustration.</p>' },
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

  // ── Chapter 2 — EXPANDED ──
  {
    id: 2, block: 'A',
    title: 'Accounting Records',
    description: 'Double-entry, books of first entry, VAT, trial balance, final accounts, capital vs revenue, statutory deductions, accruals, prepayments, bad debts.',
    estimatedMinutes: 55,
    related: [1, 3, 5, 6],
    examPointers: [
      '2022 Q9 (a) — Errors NOT revealed by the trial balance (list six)',
      '2018 Q9 (b) — Purpose of the trial balance and its limitations',
      '2015 Q9 (a) — Books of first entry: name and purpose of each daybook',
      '2013 Q9 (b) — VAT explanation: input, output, and net VAT due',
    ],
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
              { type: 'concept', variant: 'blue', title: 'How VAT Works', html: '<p><strong>Output VAT</strong> = VAT charged on sales to customers \u2192 <strong>liability</strong> (owed to Revenue).</p><p><strong>Input VAT</strong> = VAT paid on purchases/expenses \u2192 can be <strong>reclaimed</strong> from Revenue.</p><p><strong>VAT due to Revenue</strong> = Output VAT \u2212 Input VAT</p><p>If Input VAT > Output VAT, Revenue owes the business a refund.</p>' },
              { type: 'watchout', title: 'VAT on Capital Purchases', html: '<p>VAT paid on the purchase of a fixed asset (e.g. machinery, vehicles, buildings) is <strong>reclaimable</strong>. When a question says "purchased a building including VAT", you must separate the VAT from the cost.</p><p>Cost excluding VAT = Total \u00f7 (1 + VAT rate). The VAT portion reduces the VAT liability.</p>' },
            ]
          },
          {
            id: '2.2.2', title: 'The Trial Balance',
            keyTerms: [
              { term: 'Trial Balance', definition: 'A list of all ledger account balances at a given date. Total debits must equal total credits. Used as the starting point for preparing final accounts.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Purpose of the Trial Balance', html: '<p>1. To check the <strong>arithmetical accuracy</strong> of the double-entry system (debits should equal credits).</p><p>2. To provide a <strong>starting point</strong> for preparing the final accounts (Trading, P&L, Balance Sheet).</p><p>3. To help locate <strong>errors</strong> — though not all errors are revealed by the TB.</p>' },
              { type: 'concept', variant: 'amber', title: 'DEAL / CLIP Classification', html: '<p>Use this to classify trial balance items:</p><p><strong>Debit side (DEAL):</strong> Drawings, Expenses, Assets, Losses</p><p><strong>Credit side (CLIP):</strong> Capital, Liabilities, Income, Profits (provisions)</p>' },
              { type: 'concept', variant: 'red', title: 'Errors NOT Revealed by the Trial Balance', html: '<p>The TB only proves that total debits = total credits. It will <strong>still balance</strong> even if any of these errors are present:</p><ol><li><strong>Error of omission</strong> — a transaction is left out of the books entirely.</li><li><strong>Error of commission</strong> — correct amount, correct side, but wrong account of the same class (e.g. debited to John O\'Brien instead of Pat O\'Brien).</li><li><strong>Error of principle</strong> — entry posted to the wrong class of account (e.g. a vehicle posted to Purchases).</li><li><strong>Error of original entry</strong> — wrong figure used in a day book and posted accordingly to both sides.</li><li><strong>Compensating errors</strong> — two errors of equal value cancel each other out.</li><li><strong>Complete reversal of entries</strong> — the debit and credit are on the wrong sides.</li></ol>' },
              { type: 'concept', variant: 'blue', title: 'Errors That DO Affect the Trial Balance', html: '<p>These errors break the equality of debits and credits and require a <strong>suspense account</strong> until corrected:</p><ul><li>Posting only one side of a double entry.</li><li>Entering one figure on one side and a different figure on the other.</li><li>Entering both sides on the same side of two ledger accounts.</li><li>Mathematical errors in casting, subtraction or balancing off.</li></ul>' },
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
              { term: 'Capital Expenditure', definition: 'Spending on acquiring or improving fixed assets \u2014 gives benefit for more than one year. Appears on the Balance Sheet.' },
              { term: 'Revenue Expenditure', definition: 'Day-to-day running costs of the business \u2014 gives benefit for one accounting period only. Appears in the P&L.' },
              { term: 'Capital Income', definition: 'Income from the sale of a fixed asset or capital introduced by the owner \u2014 appears on the Balance Sheet.' },
              { term: 'Revenue Income', definition: 'Income earned from normal trading activities \u2014 appears in the P&L account.' },
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
              { term: 'PAYE', definition: 'Pay As You Earn \u2014 income tax deducted from employees\' wages at source by the employer and remitted to Revenue.' },
              { term: 'PRSI', definition: 'Pay Related Social Insurance \u2014 contributions by employees and employers for social welfare benefits.' },
              { term: 'USC', definition: 'Universal Social Charge \u2014 a tax on gross income payable by individuals.' },
              { term: 'Gross Pay', definition: 'Total pay before any deductions.' },
              { term: 'Net Pay', definition: 'Take-home pay after all deductions (PAYE, PRSI, USC, pension, etc.).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Employer vs Employee Contributions', html: '<p><strong>Employee deductions</strong> (deducted FROM wages): PAYE, employee PRSI, USC \u2192 reduce net pay.</p><p><strong>Employer\'s PRSI</strong>: An additional cost to the employer, NOT deducted from employee pay. It is an expense in the P&L.</p><p>Total wages expense in P&L = Gross wages + Employer\'s PRSI.</p>' },
              { type: 'concept', variant: 'green', title: 'Double Entry for Wages', html: '<p>Dr Wages (gross amount + employer PRSI) \u2192 P&L expense<br/>Cr Bank (net pay to employees)<br/>Cr PAYE/PRSI/USC (amount owed to Revenue) \u2192 current liability until paid</p>' },
            ]
          },
        ]
      },
      // ── Part D: Accruals & Prepayments — EXPANDED ──
      {
        id: '2.5', title: 'Part D: Accruals & Prepayments',
        subTopics: [
          {
            id: '2.5.1', title: 'Accruals and Prepayments',
            keyTerms: [
              { term: 'Accrual', definition: 'An expense that has been incurred but not yet paid by the year end \u2014 shown as a current liability.' },
              { term: 'Prepayment', definition: 'An expense that has been paid in advance \u2014 shown as a current asset.' },
              { term: 'Income Accrued (Due)', definition: 'Income earned but not yet received \u2014 shown as a current asset (debtor).' },
              { term: 'Income Prepaid (In Advance)', definition: 'Income received but not yet earned \u2014 shown as a current liability.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Expense Accruals', html: '<p>If an expense has been incurred but not yet paid at year end:</p><p>P&L: <strong>Add</strong> the accrual to the amount paid (increase the expense).</p><p>Balance Sheet: Show as a <strong>current liability</strong> (creditor/accrual).</p><p>Example: Electricity bill for December arrives in January \u2192 accrue the December charge.</p>' },
              { type: 'concept', variant: 'green', title: 'Expense Prepayments', html: '<p>If an expense has been paid in advance:</p><p>P&L: <strong>Deduct</strong> the prepayment from the amount paid (reduce the expense).</p><p>Balance Sheet: Show as a <strong>current asset</strong> (prepayment).</p><p>Example: Insurance paid for 15 months \u2192 3 months relate to next year \u2192 prepayment of 3 months.</p>' },
              { type: 'examtip', title: 'Exam Formula', html: '<p><strong>P&L expense = Amount paid + Closing accrual \u2212 Opening accrual \u2212 Closing prepayment + Opening prepayment</strong></p>' },
            ]
          },
          {
            id: '2.5.2', title: 'Worked Example \u2014 Insurance Adjustment',
            body: [
              { type: 'example', title: 'Insurance Adjustment', html: '<p>Trial balance shows Insurance \u20ac8,400. Notes state:</p><p>\u2022 Insurance prepaid at start of year: \u20ac600</p><p>\u2022 Insurance prepaid at end of year: \u20ac900</p><p>Calculate the P&L charge for insurance.</p>' },
              { type: 'solution', title: 'Solution', html: '<p>P&L charge = Amount in TB \u2212 Opening prepayment \u2212 Closing prepayment</p><p>Wait \u2014 use the full formula:</p><p><strong>P&L = TB figure + Opening prepayment (reverse last year\u2019s adjustment) \u2212 Closing prepayment</strong></p><p>P&L Insurance = \u20ac8,400 + \u20ac600 \u2212 \u20ac900 = <strong>\u20ac8,100</strong></p><p>The TB figure of \u20ac8,400 includes cash paid this year. The opening prepayment of \u20ac600 (from last year) must be added back as an expense this year. The closing prepayment of \u20ac900 is deducted because it relates to next year.</p>' },
              { type: 'watchout', title: 'Opening vs Closing Adjustments', html: '<p>Opening accrual: the TB figure already includes cash paid this year for last year\u2019s accrual. So the opening accrual is <strong>deducted</strong> (it was last year\u2019s expense, not this year\u2019s).</p><p>Opening prepayment: the TB figure does NOT include last year\u2019s prepaid portion as this year\u2019s payment. So the opening prepayment is <strong>added</strong> (it is this year\u2019s expense).</p>' },
            ]
          },
          {
            id: '2.5.3', title: 'Worked Example \u2014 Rent with Accrual',
            body: [
              { type: 'example', title: 'Rent with Opening and Closing Accrual', html: '<p>Trial balance shows Rent \u20ac18,000. Notes:</p><p>\u2022 Rent accrued at start of year: \u20ac1,500</p><p>\u2022 Rent accrued at end of year: \u20ac2,000</p>' },
              { type: 'solution', title: 'Solution', html: '<p>P&L Rent = TB figure \u2212 Opening accrual + Closing accrual</p><p>= \u20ac18,000 \u2212 \u20ac1,500 + \u20ac2,000 = <strong>\u20ac18,500</strong></p><p>The TB cash paid of \u20ac18,000 includes \u20ac1,500 that was last year\u2019s accrual (deduct it). This year\u2019s closing accrual of \u20ac2,000 is owed but unpaid (add it).</p><p><strong>Balance Sheet:</strong> Accrual of \u20ac2,000 appears as a current liability.</p>' },
            ]
          },
          {
            id: '2.5.4', title: 'Income Accruals & Prepayments',
            body: [
              { type: 'concept', variant: 'amber', title: 'Income Adjustments', html: '<p>Income works the <strong>opposite way</strong> to expenses:</p><p><strong>Income accrued (due):</strong> Income earned but not yet received \u2192 <strong>add</strong> to P&L income, show as a <strong>current asset</strong> (debtor).</p><p><strong>Income prepaid (in advance):</strong> Income received but not yet earned \u2192 <strong>deduct</strong> from P&L income, show as a <strong>current liability</strong>.</p>' },
              { type: 'example', title: 'Rent Receivable Example', html: '<p>Rent receivable per TB: \u20ac12,000. Rent due but not received at year end: \u20ac1,000.</p><p>P&L: Rent receivable = \u20ac12,000 + \u20ac1,000 = <strong>\u20ac13,000</strong></p><p>Balance Sheet: Rent due \u20ac1,000 \u2192 current asset.</p>' },
              { type: 'examtip', title: 'Q1 Exam Technique', html: '<p>In Q1, accruals and prepayments are the most common adjustments. Read each note carefully \u2014 identify whether it is an expense or income, and whether it is accrued or prepaid. Label each working clearly (e.g. W3: Insurance) and show the calculation.</p>' },
            ]
          },
        ]
      },
      // ── Part E: Bad Debts & Provisions — EXPANDED ──
      {
        id: '2.6', title: 'Part E: Bad Debts & Provisions',
        subTopics: [
          {
            id: '2.6.1', title: 'Bad Debts and Provision for Bad Debts',
            keyTerms: [
              { term: 'Bad Debt', definition: 'A debt that is definitely unrecoverable \u2014 written off as an expense in the P&L.' },
              { term: 'Provision for Bad Debts', definition: 'An estimate of the amount of debts that may not be collected \u2014 deducted from debtors on the Balance Sheet.' },
              { term: 'Increase in Provision', definition: 'When the new provision is higher than the old one \u2014 the increase is an expense in the P&L.' },
              { term: 'Decrease in Provision', definition: 'When the new provision is lower than the old one \u2014 the decrease is income (other income) in the P&L.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Bad Debt Write-Off', html: '<p>When a debt is definitely irrecoverable:</p><p>Dr Bad Debts (expense in P&L)<br/>Cr Debtors (reduce the debtor)</p><p>If a previously written-off bad debt is later recovered:</p><p>Dr Bank<br/>Cr Bad Debts Recovered (income in P&L)</p>' },
              { type: 'concept', variant: 'green', title: 'Provision for Bad Debts', html: '<p>The provision is calculated as a percentage of <strong>remaining debtors</strong> (after writing off bad debts).</p><p><strong>New provision > Old provision:</strong> The increase is an <strong>expense</strong> in P&L.</p><p><strong>New provision < Old provision:</strong> The decrease is <strong>other income</strong> in P&L.</p><p>On the Balance Sheet: Debtors (net of bad debts) <strong>less</strong> Provision = Net Debtors.</p>' },
              { type: 'example', title: 'Worked Example', html: '<p>Debtors per TB: \u20ac50,000. Bad debt to write off: \u20ac2,000. New provision: 5% of remaining debtors.</p><p>Remaining debtors: \u20ac50,000 \u2212 \u20ac2,000 = \u20ac48,000</p><p>New provision: 5% \u00d7 \u20ac48,000 = <strong>\u20ac2,400</strong></p><p>If old provision was \u20ac2,000: Increase = \u20ac400 \u2192 expense in P&L.</p><p>Balance Sheet: Debtors \u20ac48,000 less provision \u20ac2,400 = <strong>\u20ac45,600</strong></p>' },
            ]
          },
          {
            id: '2.6.2', title: 'Step-by-Step Procedure for Bad Debts in Q1',
            body: [
              { type: 'concept', variant: 'red', title: 'The Four Steps', html: '<p><strong>Step 1:</strong> Write off the named bad debt \u2014 reduce debtors by the amount.</p><p><strong>Step 2:</strong> Calculate remaining debtors = TB debtors \u2212 bad debt written off.</p><p><strong>Step 3:</strong> Calculate new provision = Remaining debtors \u00d7 provision rate.</p><p><strong>Step 4:</strong> Find the change: Increase (expense) or Decrease (income) = New provision \u2212 Old provision.</p>' },
              { type: 'example', title: 'Full Q1-Style Example', html: '<p>TB shows: Debtors \u20ac64,000. Provision for bad debts \u20ac3,000 (Cr).</p><p>Notes: Write off Grealish as bad debt \u20ac1,200. Create a new provision of 4% on remaining debtors.</p><p><strong>Step 1:</strong> New debtors = \u20ac64,000 \u2212 \u20ac1,200 = \u20ac62,800</p><p><strong>Step 2:</strong> New provision = 4% \u00d7 \u20ac62,800 = \u20ac2,512</p><p><strong>Step 3:</strong> Old provision was \u20ac3,000. New provision \u20ac2,512. Decrease = \u20ac488</p><p><strong>P&L:</strong> Bad debts written off: \u20ac1,200 (expense). Decrease in provision: \u20ac488 (other income).</p><p><strong>Balance Sheet:</strong> Debtors \u20ac62,800 less provision \u20ac2,512 = \u20ac60,288</p>' },
              { type: 'watchout', title: 'Common Errors', html: '<p>1. Calculating the provision on the <strong>original</strong> debtors figure before writing off the bad debt \u2014 always deduct the bad debt first.</p><p>2. Putting the decrease in provision as an expense instead of <strong>other income</strong>.</p><p>3. Forgetting that bad debts written off and the change in provision are <strong>two separate items</strong> in the P&L.</p>' },
            ]
          },
          {
            id: '2.6.3', title: 'Provision for Discount Allowed',
            keyTerms: [
              { term: 'Provision for Discount Allowed', definition: 'An estimate of cash discounts likely to be taken by debtors who pay promptly. Calculated on debtors after bad debt provision.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Provision for Discount', html: '<p>Some debtors will take the cash discount offered for early payment. The provision estimates this:</p><p><strong>Provision for discount = (Debtors \u2212 Bad debts \u2212 Provision for bad debts) \u00d7 Discount rate</strong></p><p>The increase or decrease in provision for discount is treated the same way as the bad debt provision \u2014 increase = expense, decrease = income.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>The provision for discount is calculated <strong>after</strong> deducting both the bad debt write-off AND the provision for bad debts. This is because you would not offer discount on debts that are bad or likely to be bad.</p>' },
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
    examPointers: [
      '2021 Q9 (b) — Reasons for differences between bank statement and cash book',
      '2017 Q9 (b) — Purpose & advantages of bank reconciliation',
      '2012 Q9 (a) — Treatment of unpresented cheques and lodgements not credited',
    ],
    sections: [
      {
        id: '3.1', title: 'Bank Reconciliation',
        subTopics: [
          {
            id: '3.1.1', title: 'Purpose & Reasons for Difference',
            keyTerms: [
              { term: 'Bank Reconciliation Statement', definition: 'A statement that explains the difference between the bank balance in the cash book and the balance on the bank statement.' },
              { term: 'Unpresented Cheques', definition: 'Cheques issued by the business but not yet cashed by the payee \u2014 appear in the cash book but not on the bank statement.' },
              { term: 'Lodgements Not Yet Credited', definition: 'Deposits made by the business but not yet processed by the bank.' },
              { term: 'Standing Orders / Direct Debits', definition: 'Payments made automatically by the bank \u2014 may not yet be recorded in the cash book.' },
              { term: 'Bank Charges / Interest', definition: 'Fees charged by the bank that the business may not know about until the statement arrives.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why the Balances Differ', html: '<p>The balance in the business\'s cash book rarely agrees with the bank statement because:</p><p>1. <strong>Timing differences:</strong> Unpresented cheques and lodgements not yet credited.</p><p>2. <strong>Items in bank statement but not in cash book:</strong> Bank charges, interest, direct debits, standing orders, dishonoured cheques, dividends received.</p><p>3. <strong>Errors:</strong> In the cash book or by the bank.</p>' },
              { type: 'concept', variant: 'green', title: 'Two-Step Process', html: '<p><strong>Step 1 \u2014 Adjust the Cash Book:</strong> Update the cash book for items appearing on the bank statement but not in the cash book (bank charges, interest, direct debits, dishonoured cheques).</p><p><strong>Step 2 \u2014 Prepare the Reconciliation Statement:</strong> Start with the adjusted bank statement balance and reconcile to the adjusted cash book balance using timing differences (unpresented cheques, lodgements not credited).</p>' },
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

  // ── Chapter 4 — EXPANDED ──
  {
    id: 4, block: 'A',
    title: 'Depreciation & Revaluation of Fixed Assets',
    description: 'Straight-line and reducing balance methods, scrap value, disposal accounts, and revaluation.',
    estimatedMinutes: 35,
    related: [2, 6, 9],
    examPointers: [
      '2024 Q9 (a) — Causes of depreciation (physical wear, obsolescence, depletion, time)',
      '2020 Q9 (b) — Justify Straight Line vs Reducing Balance method',
      '2016 Q9 (a) — Reasons for providing depreciation in the accounts',
      '2011 Q9 (b) — Definition of depreciation and which concept it satisfies (matching)',
    ],
    sections: [
      {
        id: '4.1', title: 'Part A: Depreciation Methods',
        subTopics: [
          {
            id: '4.1.1', title: 'Straight-Line Method',
            keyTerms: [
              { term: 'Depreciation', definition: 'The reduction in the value of a fixed asset over time due to wear and tear, obsolescence, or the passage of time.' },
              { term: 'Straight-Line Depreciation', definition: 'An equal amount of depreciation is charged each year. Formula: (Cost \u2212 Scrap Value) / Useful Life.' },
              { term: 'Net Book Value (NBV)', definition: 'The value of an asset in the books = Cost \u2212 Accumulated Depreciation.' },
              { term: 'Scrap Value (Residual Value)', definition: 'The estimated value of the asset at the end of its useful life.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Straight-Line Formula', html: '<p><strong>Annual Depreciation = (Cost \u2212 Scrap Value) / Useful Life</strong></p><p>Or if given as a percentage: <strong>Cost \u00d7 Rate %</strong> (scrap value is ignored when percentage is given).</p><p>Example: Machine costs \u20ac50,000, scrap value \u20ac5,000, useful life 10 years.<br/>Annual depreciation = (\u20ac50,000 \u2212 \u20ac5,000) / 10 = <strong>\u20ac4,500 per year</strong></p>' },
              { type: 'examtip', title: 'Time Apportionment', html: '<p>If an asset is purchased part-way through the year, depreciation is charged <strong>from the date of purchase</strong>. E.g. purchased 01/04, year end 31/12 = 9/12 of a year\'s depreciation.</p><p>Similarly, an asset disposed of mid-year gets depreciation <strong>to the date of disposal</strong>.</p>' },
            ]
          },
          {
            id: '4.1.2', title: 'Reducing Balance Method',
            keyTerms: [
              { term: 'Reducing Balance', definition: 'Depreciation is calculated as a fixed percentage of the Net Book Value at the start of each year. Gives higher depreciation in early years.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Reducing Balance Formula', html: '<p><strong>Depreciation = NBV at start of year \u00d7 Rate %</strong></p><p>The amount decreases each year because the NBV decreases each year.</p><p>Example: Asset cost \u20ac40,000, rate 25%:<br/>Year 1: \u20ac40,000 \u00d7 25% = \u20ac10,000 (NBV = \u20ac30,000)<br/>Year 2: \u20ac30,000 \u00d7 25% = \u20ac7,500 (NBV = \u20ac22,500)<br/>Year 3: \u20ac22,500 \u00d7 25% = \u20ac5,625 (NBV = \u20ac16,875)</p>' },
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
              { term: 'Profit on Disposal', definition: 'When the proceeds of sale exceed the NBV \u2014 the profit goes to Other Income in the P&L.' },
              { term: 'Loss on Disposal', definition: 'When the NBV exceeds the proceeds of sale \u2014 the loss goes to Expenses in the P&L.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Disposal Account Steps', html: '<p>1. <strong>Debit</strong> Disposal Account with the <strong>cost</strong> of the asset.</p><p>2. <strong>Credit</strong> Disposal Account with the <strong>accumulated depreciation</strong> on the asset.</p><p>3. <strong>Credit</strong> Disposal Account with the <strong>proceeds</strong> (or trade-in value).</p><p>4. The balance = <strong>profit</strong> (credit side bigger) or <strong>loss</strong> (debit side bigger).</p>' },
              { type: 'example', title: 'Disposal Example', html: '<p>Van cost \u20ac30,000. Accumulated depreciation \u20ac23,500. Trade-in allowance \u20ac14,000.</p><p>NBV = \u20ac30,000 \u2212 \u20ac23,500 = \u20ac6,500</p><p>Proceeds = \u20ac14,000</p><p>Profit on disposal = \u20ac14,000 \u2212 \u20ac6,500 = <strong>\u20ac7,500</strong></p>' },
            ]
          },
          {
            id: '4.2.2', title: 'Revaluation of Fixed Assets',
            keyTerms: [
              { term: 'Revaluation', definition: 'Restating a fixed asset at its current market value instead of historical cost.' },
              { term: 'Revaluation Reserve', definition: 'The gain from revaluing an asset. A capital reserve \u2014 shown in the capital section of the Balance Sheet.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Revaluation Process', html: '<p>When a fixed asset is revalued upwards:</p><p>1. The asset cost is replaced with the <strong>new valuation</strong>.</p><p>2. <strong>Accumulated depreciation is wiped out</strong> (reset to zero).</p><p>3. The difference between the new value and the old NBV is a <strong>revaluation reserve</strong>.</p><p>4. Future depreciation is based on the <strong>new value</strong> and the <strong>remaining useful life</strong>.</p>' },
              { type: 'example', title: 'Revaluation Example', html: '<p>Building: cost \u20ac400,000, accumulated depreciation \u20ac87,575. NBV = \u20ac312,425.</p><p>Revalued to \u20ac550,000 on 01/01/2022.</p><p>Revaluation reserve = \u20ac550,000 \u2212 \u20ac312,425 = <strong>\u20ac237,575</strong></p><p>New depreciation = \u20ac550,000 \u00d7 2% = \u20ac11,000 per year (from the new value).</p>' },
              { type: 'watchout', title: 'Revaluation Reserve is NOT Profit', html: '<p>The revaluation reserve goes in the <strong>capital section</strong> of the Balance Sheet, NOT in the P&L. It is an unrealised gain \u2014 the asset has not been sold.</p>' },
            ]
          },
        ]
      },
      // ── Part C: Why Depreciate, Choosing a Method, Revaluation ──
      {
        id: '4.3', title: 'Part C: Choosing a Method & Reasons for Depreciating',
        subTopics: [
          {
            id: '4.3.1', title: 'Why Depreciate? Reasons & Causes',
            body: [
              { type: 'prose', html: '<p>Depreciation is charged because fixed assets <strong>lose value</strong> over time. Recognising this loss in the accounts is required by the <strong>matching</strong> and <strong>prudence</strong> concepts \u2014 the cost of using the asset must be matched against the revenue it helps to earn, and the asset should not be overstated on the Balance Sheet.</p>' },
              { type: 'concept', variant: 'blue', title: 'Causes of Depreciation', html: '<ul><li><strong>Wear and tear</strong> \u2014 physical deterioration through use (machinery, vehicles).</li><li><strong>Obsolescence</strong> \u2014 the asset is overtaken by newer technology (computers, software).</li><li><strong>Effluxion of time</strong> \u2014 leases and patents expire after a fixed period.</li><li><strong>Depletion</strong> \u2014 natural resources (quarries, mines) are physically used up.</li></ul>' },
              { type: 'concept', variant: 'green', title: 'Why Charge Depreciation?', html: '<ol><li>To <strong>match</strong> the cost of using the asset against the income it generates (accruals concept).</li><li>To show fixed assets at a <strong>true and fair</strong> value on the Balance Sheet (prudence).</li><li>To build up a <strong>realistic profit figure</strong> \u2014 not charging depreciation would overstate profit.</li><li>To comply with accounting standards and the <strong>consistency</strong> concept.</li></ol>' },
            ],
          },
          {
            id: '4.3.2', title: 'Choosing Between the Two Methods',
            body: [
              { type: 'concept', variant: 'blue', title: 'Straight-Line \u2014 When to Use', html: '<p>Suitable for assets that <strong>lose value evenly</strong> over a long life and generate revenue evenly each year. Examples: <strong>buildings, fixtures, furniture</strong>. The same charge is written off each year, which suggests the asset is being used up at an even rate.</p>' },
              { type: 'concept', variant: 'amber', title: 'Reducing Balance \u2014 When to Use', html: '<p>Suitable for assets that <strong>lose most of their value in the early years</strong> after purchase \u2014 typically because they become obsolete quickly. Examples: <strong>motor vehicles, computers, technology equipment</strong>. The depreciation charge is high in the early years and tapers off, mirroring the actual fall in market value.</p>' },
              { type: 'concept', variant: 'green', title: 'Why Choose One Method Over Another?', html: '<p>A company chooses a method based on the <strong>type of asset</strong> and its written depreciation <strong>policy</strong>, ensuring the <strong>consistency</strong> concept is applied so accounts can be compared year on year. Once chosen, the method should not be changed without disclosure.</p>' },
              { type: 'examtip', title: 'Exam Tip \u2014 Common Question', html: '<p>Distinguish between the two methods and explain <strong>why one is chosen over another</strong>. Always link the choice back to (a) the type of asset and (b) the consistency concept.</p>' },
            ],
          },
          {
            id: '4.3.3', title: 'Depreciation After Revaluation',
            body: [
              { type: 'concept', variant: 'green', title: 'Post-Revaluation Depreciation', html: '<p>After revaluation, depreciation is based on the <strong>new value</strong> and the <strong>remaining useful life</strong>:</p><p><strong>New annual depreciation = New value \u00f7 Remaining life</strong> &nbsp;or&nbsp; <strong>New value \u00d7 Rate %</strong></p><p><em>Illustration:</em> a building revalued from NBV \u20ac312,425 to \u20ac550,000 with 32 years of useful life remaining gives a new charge of \u20ac550,000 \u00f7 32 = \u20ac17,188 per year.</p>' },
              { type: 'examtip', title: 'Timing Tip', html: '<p>If the revaluation takes place on the first day of the year, charge a full year on the new value. If it happens mid-year, charge the old rate up to the revaluation date and the new rate from that date.</p>' },
            ],
          },
        ],
      },
    ]
  },

  // ── Chapter 5 ──
  {
    id: 5, block: 'A',
    title: 'Control Accounts',
    description: 'Debtors and creditors control accounts, reconciliation of control accounts with subsidiary ledger.',
    estimatedMinutes: 20,
    related: [2, 3, 7],
    examPointers: [
      '2023 Q9 (a) — Advantages of preparing control accounts',
      '2019 Q9 (b) — Reasons for differences between control account and ledger total',
      '2014 Q9 (b) — How control accounts assist in the location of errors',
    ],
    sections: [
      {
        id: '5.1', title: 'Control Accounts',
        subTopics: [
          {
            id: '5.1.1', title: 'Purpose & Structure',
            keyTerms: [
              { term: 'Control Account', definition: 'A summary account in the general ledger that shows the total of all individual debtor or creditor accounts.' },
              { term: 'Debtors Control Account', definition: 'A summary of all individual debtor accounts. Debit balance = total owed by customers.' },
              { term: 'Creditors Control Account', definition: 'A summary of all individual creditor accounts. Credit balance = total owed to suppliers.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Use Control Accounts?', html: '<p>1. To provide a <strong>check on accuracy</strong> \u2014 the control account total should agree with the sum of individual accounts.</p><p>2. To <strong>detect errors</strong> in the subsidiary ledger.</p><p>3. To provide a <strong>quick summary</strong> of total debtors/creditors for management.</p><p>4. To help prepare the <strong>trial balance</strong> more efficiently.</p>' },
            ]
          },
          {
            id: '5.1.2', title: 'Debtors & Creditors Control Accounts',
            body: [
              { type: 'concept', variant: 'green', title: 'Debtors Control Account', html: '<p><strong>Dr side:</strong> Opening balance, Credit sales, Dishonoured cheques, Interest charged.</p><p><strong>Cr side:</strong> Cash/cheques received, Sales returns, Bad debts written off, Discount allowed, Contra (set-off), Closing balance.</p>' },
              { type: 'concept', variant: 'amber', title: 'Creditors Control Account', html: '<p><strong>Dr side:</strong> Cash/cheques paid, Purchase returns, Discount received, Contra (set-off), Closing balance.</p><p><strong>Cr side:</strong> Opening balance, Credit purchases, Carriage inwards charged.</p>' },
              { type: 'watchout', title: 'Contra Entry', html: '<p>A contra entry arises when a person is both a debtor and a creditor. The smaller balance is set off against the larger. The entry is: Dr Creditors Control, Cr Debtors Control.</p>' },
            ]
          },
        ]
      },
      {
        id: '5.2', title: 'Reconciliation & Theory',
        subTopics: [
          {
            id: '5.2.1', title: 'Advantages of Control Accounts',
            body: [
              { type: 'concept', variant: 'green', title: 'Five Key Advantages', html: '<p>1. <strong>Locate errors quickly</strong> \u2014 if the control account total disagrees with the list of personal balances, the error is contained within that ledger.</p><p>2. <strong>Internal check</strong> \u2014 the control account is usually written up by a different person from the subsidiary ledger, deterring fraud.</p><p>3. <strong>Quick totals</strong> \u2014 management can see total debtors/creditors at a glance without adding up every account.</p><p>4. <strong>Speeds up the trial balance</strong> \u2014 only the control account totals are entered, not every individual account.</p><p>5. <strong>Allows division of work</strong> \u2014 different staff can work on the general ledger and subsidiary ledgers simultaneously.</p>' },
            ]
          },
          {
            id: '5.2.2', title: 'Reasons for Differences',
            keyTerms: [
              { term: 'Reconciliation', definition: 'A working that explains the difference between two figures that should agree \u2014 here, the control account balance and the list of subsidiary balances.' },
            ],
            body: [
              { type: 'concept', variant: 'red', title: 'Why Might the Two Disagree?', html: '<p>1. <strong>Casting errors</strong> in the day books before posting to the control account.</p><p>2. <strong>Posting errors</strong> \u2014 entry made in the personal account but not the control account, or vice versa.</p><p>3. <strong>Wrong amounts</strong> \u2014 different figure posted to the control account vs the personal account.</p><p>4. <strong>Sales/purchase day book undercast</strong> \u2014 individual postings done correctly but the day book total wrong.</p><p>5. <strong>Discount, returns or contras</strong> recorded in one but not the other.</p><p>6. <strong>Bad debts</strong> written off in the personal account but not the control account.</p>' },
              { type: 'examtip', title: 'Exam Theory Question', html: '<p>"Outline two reasons why the control account total may not agree with the list of debtors\u2019 balances." Use any two from the list above. Each reason is typically worth 2\u20133 marks.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK B — FINAL ACCOUNTS & ERRORS (Chapters 6-12)
  // ──────────────────────────────────────────────────

  // ── Chapter 6 — EXPANDED ──
  {
    id: 6, block: 'B',
    title: 'Final Accounts \u2014 Sole Trader',
    description: 'Trading, Profit & Loss Account and Balance Sheet preparation from a trial balance with adjustments.',
    estimatedMinutes: 60,
    related: [2, 4, 7, 9],
    examPointers: [
      'Q1 (sole trader final accounts) — appears EVERY year, 120 marks',
      '2022 Q9 (a) — Distinguish capital expenditure vs revenue expenditure (with examples)',
      '2018 Q9 (b) — Purpose of preparing final accounts (stewardship & decision-making)',
      '2010 Q9 (b) — Treatment of accruals and prepayments and the matching concept',
    ],
    sections: [
      {
        id: '6.1', title: 'Structure of Final Accounts',
        subTopics: [
          {
            id: '6.1.1', title: 'The Three Statements',
            keyTerms: [
              { term: 'Trading Account', definition: 'Calculates Gross Profit by matching Sales against Cost of Sales.' },
              { term: 'Profit & Loss Account', definition: 'Calculates Net Profit by deducting expenses from Gross Profit and adding other income.' },
              { term: 'Balance Sheet', definition: 'Shows the financial position at a specific date \u2014 assets, liabilities and capital.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Trading Account', html: '<p>Sales (net of returns)<br/>\u2212 Cost of Sales:<br/>&nbsp;&nbsp;Opening Stock + Purchases (net of returns) + Carriage Inwards \u2212 Closing Stock<br/>= <strong>Gross Profit</strong></p>' },
              { type: 'concept', variant: 'green', title: 'P&L Account', html: '<p>Gross Profit<br/>+ Other Income (rent received, discount received, decrease in provision, profit on disposal, bad debts recovered)<br/>\u2212 Expenses (wages, rent, insurance, depreciation, bad debts, increase in provision, discount allowed, loss on disposal, etc.)<br/>= <strong>Net Profit</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'Balance Sheet', html: '<p><strong>Fixed Assets</strong> (cost less accumulated depreciation)<br/>+ <strong>Current Assets</strong> (closing stock, debtors less provision, prepayments, bank, cash)<br/>\u2212 <strong>Current Liabilities</strong> (creditors, accruals, bank overdraft, VAT due)<br/>= <strong>Net Assets</strong><br/><br/>Financed by: Capital + Net Profit \u2212 Drawings = <strong>Closing Capital</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '6.2', title: 'The Q1 Method',
        subTopics: [
          {
            id: '6.2.1', title: 'Approaching Q1 \u2014 The 5-Step Method',
            body: [
              { type: 'concept', variant: 'green', title: 'The 5-Step Method', html: '<p>1. <strong>Read the trial balance</strong> \u2014 classify every item using DEAL/CLIP.</p><p>2. <strong>Read the notes</strong> \u2014 understand what each note is asking before doing any calculations.</p><p>3. <strong>Work through notes one at a time</strong> \u2014 open T-accounts, calculate adjustments, label destinations.</p><p>4. <strong>Build the TPL line by line</strong> \u2014 tick off each working as you place it.</p><p>5. <strong>Build the Balance Sheet</strong> \u2014 same tick-off approach. The capital section pulls in net profit and drawings.</p>' },
              { type: 'examtip', title: 'Exam Strategy', html: '<p>Q1 is worth <strong>120 marks</strong> \u2014 the biggest question on the paper. Spend <strong>45-50 minutes</strong>. Do the workings FIRST, then build the statements. If you run out of time, write down all your workings \u2014 partial marks are awarded for correct workings even if the final statement is incomplete.</p>' },
            ]
          },
          {
            id: '6.2.2', title: 'Numbering Your Workings (W1\u2013W23)',
            body: [
              { type: 'examtip', title: 'W-Number System', html: '<p>SEC marking schemes number workings W1 through W23 (or more). Adopt this system in your answers:</p><p><strong>W1:</strong> Purchases adjustment (e.g. goods for own use, goods in transit, sale-or-return reversal)</p><p><strong>W2:</strong> Closing stock adjustment</p><p><strong>W3\u2013W8:</strong> Individual expense adjustments (insurance, light & heat, wages, etc.)</p><p><strong>W9:</strong> Bad debts and provision for bad debts</p><p><strong>W10:</strong> Depreciation and disposal</p><p><strong>W11:</strong> Investment income</p><p>Number each working clearly in the margin. The examiner can then trace your calculations through to the final accounts, awarding marks for correct workings even if the final figure is wrong.</p>' },
              { type: 'watchout', title: 'Marks for Workings', html: '<p>In Q1, a large proportion of marks are for <strong>workings</strong>, not for the final figures. A student who shows 15 correct workings but makes a casting error in the P&L will score significantly higher than one who writes only the final statements with no workings shown.</p>' },
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
              { term: 'DIRT', definition: 'Deposit Interest Retention Tax \u2014 tax deducted at source from bank interest in Ireland.' },
              { term: 'Investment Income Due', definition: 'Investment income earned but not yet received \u2014 a current asset on the Balance Sheet.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Investment Income', html: '<p>Investment income (dividends, interest on government stock) is <strong>other income</strong> in the P&L. The investment itself is a <strong>fixed asset</strong> (if long-term) on the Balance Sheet.</p><p><strong>Full year income</strong> goes in the P&L. If only part was received in cash, the balance is <strong>investment income due</strong> \u2014 a current asset.</p>' },
              { type: 'concept', variant: 'green', title: 'Investment Income Trapped in Another Figure', html: '<p>Sometimes investment income is hidden inside another figure (e.g. patents). You must:</p><p>1. <strong>Remove it</strong> from the wrong account.</p><p>2. <strong>Credit it</strong> to investment income in the P&L.</p><p>3. <strong>Calculate the full year\'s income earned</strong> \u2014 even if only part was received.</p><p>4. The unreceived portion = <strong>income due</strong> (current asset).</p>' },
              { type: 'watchout', title: 'DIRT', html: '<p>If interest was received "net of DIRT at 33%": Gross Interest = Net \u00f7 0.67. The gross amount goes to P&L. The DIRT is a tax liability.</p>' },
            ]
          },
          {
            id: '6.3.2', title: 'Goods on Sale or Return',
            keyTerms: [
              { term: 'Sale or Return', definition: 'Goods sent to a customer on a trial basis \u2014 they remain the property of the seller until accepted by the customer.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Sale or Return Treatment', html: '<p>If goods are sent on <strong>sale or return</strong> and have NOT been accepted at year end:</p><p>1. <strong>Reduce purchases</strong> by the cost price (if recorded as a purchase).</p><p>2. <strong>Reduce creditors</strong> by the cost price.</p><p>3. <strong>Remove from closing stock</strong> at cost (they were counted but they\'re not ours to keep).</p><p>OR if recorded as a sale:</p><p>1. Reduce sales by selling price. 2. Reduce debtors by selling price. 3. Add cost to closing stock.</p>' },
              { type: 'watchout', title: 'Finding Cost Price', html: '<p><strong>Mark-up:</strong> Cost = Selling Price \u00f7 (1 + Mark-up rate). E.g. cost plus 25%: Cost = SP \u00f7 1.25</p><p><strong>Margin:</strong> Cost = Selling Price \u00d7 (1 \u2212 Margin rate). E.g. 20% margin: Cost = SP \u00d7 0.80</p>' },
            ]
          },
          {
            id: '6.3.3', title: 'Goods in Transit & Goods for Own Use',
            body: [
              { type: 'concept', variant: 'blue', title: 'Goods in Transit', html: '<p>Goods ordered and invoiced but not yet physically received at year end. They legally belong to the business, so:</p><p>1. <strong>Add to purchases</strong> (at cost).</p><p>2. <strong>Add to closing stock</strong> (at cost).</p><p>3. <strong>Add to creditors</strong> (if not yet paid).</p>' },
              { type: 'concept', variant: 'green', title: 'Goods Taken for Own Use', html: '<p>When the owner takes business stock for personal use:</p><p>1. <strong>Reduce purchases</strong> by the <strong>cost price</strong> (not selling price).</p><p>2. <strong>Add to drawings</strong> by the cost price.</p><p>Never use the selling price for drawings of stock \u2014 always use <strong>cost</strong>.</p>' },
            ]
          },
          {
            id: '6.3.4', title: 'Patents, Goodwill & Intangible Assets',
            keyTerms: [
              { term: 'Patent', definition: 'An exclusive right granted for an invention \u2014 gives the holder the sole right to manufacture/sell for a set period.' },
              { term: 'Goodwill', definition: 'The value of the reputation, customer loyalty, and trading connections of a business.' },
              { term: 'Amortisation', definition: 'Writing off the cost of an intangible asset over its useful life \u2014 similar to depreciation for tangible assets.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Intangible Assets', html: '<p>Intangible assets include <strong>patents</strong>, <strong>goodwill</strong>, <strong>trademarks</strong>, and <strong>development costs</strong>. They are shown on the Balance Sheet above tangible fixed assets and are <strong>amortised</strong> over their useful life.</p><p>Annual write-off = Cost \u00f7 Number of years. The write-off is an expense in the P&L.</p>' },
            ]
          },
          {
            id: '6.3.5', title: 'Asset Disposal \u2014 The Classic Q1 Trap',
            body: [
              { type: 'concept', variant: 'red', title: 'The Five Steps of a Disposal', html: '<p>1. <strong>Calculate depreciation on the old asset</strong> up to the date of disposal.</p><p>2. <strong>Calculate the NBV</strong> at the date of disposal (cost \u2212 total accumulated depreciation).</p><p>3. <strong>Find profit/loss on disposal</strong>: Proceeds (or trade-in allowance) \u2212 NBV.</p><p>4. <strong>Correct any wrong entries</strong> \u2014 the exam often hides the cash payment in a wrong account (e.g. purchases).</p><p>5. <strong>Calculate depreciation on the new asset</strong> from the date of purchase.</p>' },
              { type: 'watchout', title: 'Where Everything Goes', html: '<p><strong>P&L:</strong> Profit on disposal \u2192 Other Income. Loss on disposal \u2192 Expense. Current year depreciation \u2192 Admin or S&D.</p><p><strong>Balance Sheet:</strong> Update cost (+ new \u2212 old), update accumulated depreciation (+ current year \u2212 on disposed asset).</p><p><strong>Common error:</strong> The cheque for the new asset may be wrongly recorded as a stock purchase. You must reverse it from purchases and record the correct asset entry.</p>' },
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
      // ── Section 6.4 — Theory of Final Accounts (David Wilson) ──
      {
        id: '6.4', title: 'Underlying Theory',
        subTopics: [
          {
            id: '6.4.1', title: 'Purpose of Final Accounts',
            keyTerms: [
              { term: 'Stewardship', definition: 'The duty of those running the business to account to the owner(s) for how resources have been used.' },
              { term: 'Profit Measurement', definition: 'Final accounts measure profit by matching income earned with expenses incurred (accruals concept).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Prepare Final Accounts?', html: '<p>1. <strong>Measure profit or loss</strong> for the period (Trading & Profit and Loss Account).</p><p>2. Show the <strong>financial position</strong> at year end (Balance Sheet).</p><p>3. Provide information for <strong>decision-making</strong> by the owner, lenders, Revenue and other users.</p><p>4. Discharge the owner\u2019s duty of <strong>stewardship</strong> over the business assets.</p>' },
              { type: 'concept', variant: 'green', title: 'Concepts Underpinning Final Accounts', html: '<p><strong>Accruals (matching):</strong> Income and expenses are recorded when earned/incurred, not when cash moves. Drives prepayments and accruals.</p><p><strong>Prudence:</strong> Recognise losses as soon as foreseen (e.g. provision for bad debts) but do not anticipate profits.</p><p><strong>Going concern:</strong> Assume the business will continue \u2014 justifies showing fixed assets at cost less depreciation rather than break-up value.</p><p><strong>Consistency:</strong> Use the same depreciation methods, stock valuation policies year on year.</p>' },
            ]
          },
          {
            id: '6.4.2', title: 'Capital vs Revenue (Exam Theory)',
            keyTerms: [
              { term: 'Capital Expenditure', definition: 'Spending on fixed assets and improvements that benefit more than one year. Goes to the Balance Sheet.' },
              { term: 'Revenue Expenditure', definition: 'Spending on day-to-day running of the business consumed within the year. Goes to the P&L.' },
              { term: 'Capital Receipt', definition: 'Cash received from sale of a fixed asset, share issue or long-term loan.' },
              { term: 'Revenue Receipt', definition: 'Income from normal trading \u2014 sales, rent received, commission etc.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Why the Distinction Matters', html: '<p>If capital expenditure is wrongly treated as revenue expenditure, profit is <strong>understated</strong> and fixed assets are <strong>understated</strong>. If revenue expenditure is wrongly treated as capital, profit is <strong>overstated</strong>. This is a classic Q7/Q9 theory question and the basis of the "Error of Principle" tested in Ch 7.</p>' },
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
    examPointers: [
      '2021 Q9 (a) — Limitations of the trial balance (errors not detected)',
      '2017 Q9 (b) — Purpose and use of a Suspense Account',
      '2013 Q9 (a) — Effect of correction of errors on net profit (recalculation)',
    ],
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
              { type: 'concept', variant: 'red', title: 'Six Errors NOT Revealed by the Trial Balance', html: '<table class="learn-table"><tbody><tr><td><strong>Omission</strong></td><td>Transaction completely left out \u2014 not recorded at all.</td></tr><tr><td><strong>Commission</strong></td><td>Right amount, right type of account, wrong person.</td></tr><tr><td><strong>Principle</strong></td><td>Wrong class of account. E.g. purchase of van recorded as motor expenses.</td></tr><tr><td><strong>Original Entry</strong></td><td>Wrong amount on both sides. E.g. \u20ac560 recorded as \u20ac650.</td></tr><tr><td><strong>Compensating</strong></td><td>Two errors of equal amount cancel each other out.</td></tr><tr><td><strong>Complete Reversal</strong></td><td>Correct accounts, correct amount, but debit and credit are swapped.</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key Point', html: '<p>These six errors do <strong>NOT</strong> create a suspense account because total debits still equal total credits.</p>' },
            ]
          },
          {
            id: '7.1.2', title: 'Errors That DO Affect the Trial Balance',
            body: [
              { type: 'concept', variant: 'blue', title: 'Errors Causing a Suspense Account', html: '<p>These errors cause total debits \u2260 total credits, creating a <strong>suspense account</strong>:</p><p><strong>Single-sided entry:</strong> Only one side of a transaction recorded.</p><p><strong>Incorrect casting (addition):</strong> A ledger account added up wrong.</p><p><strong>Wrong amount on one side:</strong> Debit and credit recorded at different amounts.</p><p><strong>Two debits / two credits:</strong> Both sides posted to the same side.</p><p><strong>Transposition error (one side):</strong> Digits reversed on one side only.</p>' },
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
              { type: 'concept', variant: 'green', title: 'Four-Step Correction Method', html: '<p>For each error:</p><p>1. <strong>What was done?</strong> \u2014 Write the incorrect entry.</p><p>2. <strong>What should have been done?</strong> \u2014 Write the correct entry.</p><p>3. <strong>Write the correcting journal entry.</strong></p><p>4. <strong>Does it involve the Suspense Account?</strong> \u2014 Only if the trial balance was affected.</p>' },
            ]
          },
          {
            id: '7.2.2', title: 'Journal Entry Examples',
            body: [
              { type: 'example', title: 'Error of Principle', html: '<p>Purchase of equipment (\u20ac2,000) recorded as purchases.</p><p><strong>Wrong:</strong> Dr Purchases \u20ac2,000, Cr Bank \u20ac2,000</p><p><strong>Should be:</strong> Dr Equipment \u20ac2,000, Cr Bank \u20ac2,000</p><p><strong>Correction:</strong> Dr Equipment \u20ac2,000, Cr Purchases \u20ac2,000</p><p>No suspense involved \u2014 TB still balanced.</p>' },
              { type: 'example', title: 'Single-Sided Entry', html: '<p>Sales of \u20ac500 credited to Sales but not debited to the customer.</p><p><strong>Wrong:</strong> Cr Sales \u20ac500 only</p><p><strong>Should be:</strong> Dr Debtor \u20ac500, Cr Sales \u20ac500</p><p><strong>Correction:</strong> Dr Debtor \u20ac500, Cr Suspense \u20ac500</p>' },
              { type: 'example', title: 'Complete Reversal', html: '<p>Receipt from debtor Murphy \u20ac300 \u2014 debit and credit reversed.</p><p><strong>Wrong:</strong> Dr Murphy \u20ac300, Cr Bank \u20ac300</p><p><strong>Should be:</strong> Dr Bank \u20ac300, Cr Murphy \u20ac300</p><p><strong>Correction:</strong> Dr Bank \u20ac600, Cr Murphy \u20ac600 (double the amount to fully reverse and re-record)</p><p>No suspense involved \u2014 both sides wrong by equal amounts.</p>' },
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
      {
        id: '7.4', title: 'Theory of Errors',
        subTopics: [
          {
            id: '7.4.1', title: 'Effect of Errors on the Final Accounts',
            body: [
              { type: 'concept', variant: 'red', title: 'Why Errors Matter', html: '<p>Even errors that do NOT cause a trial balance imbalance can <strong>materially distort</strong> the final accounts. The most damaging is the <strong>Error of Principle</strong>: capital expenditure recorded as revenue (or vice versa). This causes profit to be misstated AND the Balance Sheet to be wrong.</p><p>Other errors (commission, debtor name swaps, complete reversals between two BS items) do not affect profit but mislead users about who owes what.</p>' },
              { type: 'concept', variant: 'blue', title: 'The Limitation of the Trial Balance', html: '<p>A trial balance that balances does <strong>not</strong> prove the books are correct. Six categories of error remain undetected: omission, commission, principle, original entry, compensating, and complete reversal.</p><p>This is a classic Q7 theory question \u2014 "State two limitations of the trial balance as a check on accuracy".</p>' },
            ]
          },
          {
            id: '7.4.2', title: 'Why a Suspense Account Is Used',
            body: [
              { type: 'concept', variant: 'green', title: 'Purpose of the Suspense Account', html: '<p>1. To allow the books to be <strong>balanced temporarily</strong> while errors are investigated.</p><p>2. So that <strong>final accounts can be prepared</strong> without delay (the suspense balance appears on the Balance Sheet pending investigation).</p><p>3. To <strong>force a systematic search</strong> for errors \u2014 every correction either clears the suspense or proves the error did not affect the trial balance.</p>' },
              { type: 'watchout', title: 'Suspense on the Balance Sheet', html: '<p>If errors have not been fully cleared by the year end, the residual suspense balance appears on the Balance Sheet \u2014 as a current asset (debit balance) or current liability (credit balance). After all errors are corrected, suspense should be zero.</p>' },
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
    examPointers: [
      '2024 Q9 (b) — Distinguish internal vs external auditor (4 points)',
      '2020 Q9 (a) — Qualities required of an auditor (independence, integrity, competence)',
      '2015 Q9 (b) — Threats to auditor independence and safeguards',
      '2009 Q9 (a) — Purpose of an external audit and the auditor’s report',
    ],
    sections: [
      {
        id: '8.1', title: 'Accounting Obligations',
        subTopics: [
          {
            id: '8.1.1', title: 'Legal Requirements',
            keyTerms: [
              { term: 'Companies Act 2014', definition: 'The principal legislation governing companies in Ireland \u2014 requires proper books of account and annual financial statements.' },
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
              { term: 'IAASA', definition: 'Irish Auditing and Accounting Supervisory Authority \u2014 oversees the regulation of auditors and accountants in Ireland.' },
              { term: 'Revenue Commissioners', definition: 'The Irish tax authority responsible for collecting taxes and duties.' },
              { term: 'CRO', definition: 'Companies Registration Office \u2014 registers companies and receives annual returns.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Body</th><th>Role</th></tr></thead><tbody><tr><td><strong>FRC</strong></td><td>Sets accounting standards (FRS 102) and auditing standards.</td></tr><tr><td><strong>IAASA</strong></td><td>Oversees regulation of auditors and accountants in Ireland.</td></tr><tr><td><strong>Chartered Accountants Ireland</strong></td><td>Professional body \u2014 sets ethical and professional standards.</td></tr><tr><td><strong>CPA Ireland</strong></td><td>Professional body for certified public accountants.</td></tr><tr><td><strong>Revenue Commissioners</strong></td><td>Collects taxes based on financial statements.</td></tr><tr><td><strong>CRO</strong></td><td>Companies must file annual returns and financial statements.</td></tr></tbody></table>' },
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
              { term: 'Unqualified Report', definition: 'A clean report \u2014 the auditor is satisfied the accounts are true and fair.' },
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
              { type: 'concept', variant: 'green', title: 'Five Ethical Principles', html: '<p><strong>Integrity</strong> \u2014 honest and straightforward.<br/><strong>Objectivity</strong> \u2014 not influenced by bias.<br/><strong>Professional competence</strong> \u2014 maintain knowledge and skills.<br/><strong>Confidentiality</strong> \u2014 do not disclose without authority.<br/><strong>Professional behaviour</strong> \u2014 comply with laws and standards.</p>' },
            ]
          },
        ]
      },
      {
        id: '8.4', title: 'The Auditor in Depth',
        subTopics: [
          {
            id: '8.4.1', title: 'Purpose of an Audit',
            keyTerms: [
              { term: 'External Audit', definition: 'An independent examination by an auditor from outside the company, required by the Companies Act for non-exempt companies.' },
              { term: 'Internal Audit', definition: 'An ongoing review carried out by employees of the company to monitor systems and controls.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Are Companies Audited?', html: '<p>1. <strong>Statutory requirement</strong> under the Companies Act 2014 (audit-exempt rules apply to small companies).</p><p>2. To give <strong>shareholders</strong> independent assurance the directors\u2019 accounts are true and fair.</p><p>3. To deter and detect <strong>fraud and error</strong>.</p><p>4. To support <strong>lenders, Revenue, suppliers</strong> who rely on the published accounts.</p><p>5. To strengthen the company\u2019s <strong>credibility</strong> with investors and the public.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th></th><th>External Audit</th><th>Internal Audit</th></tr></thead><tbody><tr><td>Performed by</td><td>Independent auditor</td><td>Employees of the company</td></tr><tr><td>Required by</td><td>Companies Act</td><td>Directors\u2019 choice</td></tr><tr><td>Reports to</td><td>Shareholders (AGM)</td><td>Management / audit committee</td></tr><tr><td>Focus</td><td>Truth and fairness of accounts</td><td>Internal controls and efficiency</td></tr><tr><td>Frequency</td><td>Annual</td><td>Continuous</td></tr></tbody></table>' },
            ]
          },
          {
            id: '8.4.2', title: 'Qualities of a Good Auditor',
            body: [
              { type: 'concept', variant: 'green', title: 'Five Qualities', html: '<p><strong>Independence</strong> \u2014 free from any relationship that could compromise judgement.</p><p><strong>Competence</strong> \u2014 professionally qualified (e.g. ACA, ACCA, CPA) and up to date.</p><p><strong>Integrity</strong> \u2014 honest, straightforward, willing to challenge directors.</p><p><strong>Due care and diligence</strong> \u2014 thorough, methodical, well-documented work.</p><p><strong>Confidentiality</strong> \u2014 does not disclose information except where legally required.</p>' },
            ]
          },
          {
            id: '8.4.3', title: 'Why Independence Matters',
            body: [
              { type: 'concept', variant: 'amber', title: 'Threats to Independence', html: '<p>An auditor must avoid:</p><p>1. <strong>Self-interest</strong> \u2014 holding shares in the company.</p><p>2. <strong>Self-review</strong> \u2014 auditing accounts they helped prepare.</p><p>3. <strong>Familiarity</strong> \u2014 long-standing close relationships with directors.</p><p>4. <strong>Intimidation</strong> \u2014 pressure or threats from the client.</p><p>5. <strong>Advocacy</strong> \u2014 acting publicly on behalf of the client.</p>' },
              { type: 'examtip', title: 'Exam Theory', html: '<p>"Why is it important the auditor is independent?" \u2014 expected answers cover: credibility of audit opinion, protection of shareholder interests, public confidence in financial reporting, compliance with ethical standards.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 9 — EXPANDED ──
  {
    id: 9, block: 'B',
    title: 'Company Accounts \u2014 Internal Use',
    description: 'Limited companies, sources of finance, appropriation account, difficult adjustments.',
    estimatedMinutes: 55,
    related: [6, 10, 17, 18],
    examPointers: [
      'Q2 (company final accounts) — appears in most years, 60 marks',
      '2022 Q9 (b) — Authorised vs Issued Share Capital; Ordinary vs Preference shares',
      '2016 Q9 (a) — Distinguish a Reserve from a Provision',
      '2014 Q9 (b) — Advantages and disadvantages of incorporation',
    ],
    sections: [
      {
        id: '9.1', title: 'Limited Companies',
        subTopics: [
          {
            id: '9.1.1', title: 'Features of Limited Companies',
            keyTerms: [
              { term: 'Limited Company', definition: 'A separate legal entity from its owners (shareholders). Shareholders have limited liability.' },
              { term: 'Limited Liability', definition: 'Shareholders can only lose the amount they have invested or agreed to invest.' },
              { term: 'Separate Legal Entity', definition: 'The company exists in its own right \u2014 it can own property, sue, and be sued.' },
              { term: 'Private Ltd', definition: 'Shares cannot be offered to the general public. Min 1, max 149 shareholders.' },
              { term: 'Public PLC', definition: 'Shares can be offered to the public and traded on a stock exchange. Min 7 shareholders.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Features', html: '<p>1. <strong>Limited liability</strong> \u2014 shareholders can only lose the amount invested.</p><p>2. <strong>Separate legal entity</strong> \u2014 the company can own property, sue, and be sued.</p><p>3. <strong>Perpetual succession</strong> \u2014 continues even if shareholders change.</p><p>4. <strong>Transferability of shares</strong> \u2014 can be bought and sold.</p><p>5. <strong>Common seal</strong> \u2014 the company\'s official signature.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Private Ltd</th><th>Public PLC</th></tr></thead><tbody><tr><td>Min shareholders</td><td>1</td><td>7</td></tr><tr><td>Max shareholders</td><td>149</td><td>No limit</td></tr><tr><td>Shares traded publicly?</td><td>No</td><td>Yes</td></tr><tr><td>Min share capital</td><td>No minimum</td><td>\u20ac25,000</td></tr></tbody></table>' },
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
              { term: 'Share Premium', definition: 'Amount received for shares above their nominal value \u2014 a capital reserve.' },
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
              { term: 'Appropriation Account', definition: 'Shows how net profit is distributed \u2014 dividends paid and retained profits.' },
              { term: 'Dividend', definition: 'A distribution of profit to shareholders. Interim dividends are paid during the year; final dividends are proposed at year end.' },
              { term: 'Corporation Tax', definition: 'Tax on company profits \u2014 shown in the P&L and as a current liability if not yet paid.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Company P&L Format', html: '<p>Sales \u2212 Cost of Sales = <strong>Gross Profit</strong></p><p>\u2212 Distribution Costs \u2212 Administrative Expenses = <strong>Operating Profit</strong></p><p>+ Investment Income \u2212 Debenture Interest = <strong>Net Profit before Tax</strong></p><p>\u2212 Corporation Tax = <strong>Net Profit after Tax</strong></p><p>Then the <strong>Appropriation Account</strong>:</p><p>\u2212 Preference Dividend \u2212 Interim Ordinary Dividend \u2212 Final Ordinary Dividend = <strong>Retained Profit for Year</strong></p><p>+ Opening P&L Balance = <strong>Closing P&L Balance</strong></p>' },
              { type: 'watchout', title: 'Debenture Interest', html: '<p>Debenture interest is an <strong>expense</strong> \u2014 it goes ABOVE Net Profit, not in the appropriation account. It must be paid regardless of profit.</p><p>Dividends go in the <strong>appropriation account</strong> \u2014 they are a distribution of profit, not an expense.</p>' },
            ]
          },
          {
            id: '9.2.2', title: 'Dividends \u2014 Interim & Final',
            body: [
              { type: 'concept', variant: 'green', title: 'Types of Dividend', html: '<p><strong>Interim dividend:</strong> Paid part-way through the year. Already paid by year end \u2192 no balance sheet effect.</p><p><strong>Final (proposed) dividend:</strong> Proposed at year end but not yet paid \u2192 shown as a <strong>current liability</strong> on the Balance Sheet.</p><p>Dividend calculation: Number of shares \u00d7 Dividend rate (e.g. 10c per share).</p>' },
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
              { type: 'concept', variant: 'green', title: 'Capital & Reserves Section', html: '<p><strong>Issued Share Capital:</strong><br/>Ordinary shares \u00d7 nominal value<br/>Preference shares \u00d7 nominal value</p><p><strong>Capital Reserves:</strong><br/>Share premium, Revaluation reserve, Capital redemption reserve</p><p><strong>Revenue Reserves:</strong><br/>General reserve, P&L balance</p><p><strong>= Shareholders\' Funds (= Total Net Assets)</strong></p>' },
            ]
          },
          {
            id: '9.3.2', title: 'Capital vs Revenue Reserves',
            keyTerms: [
              { term: 'Capital Reserve', definition: 'Not distributable as dividends \u2014 share premium, revaluation reserve.' },
              { term: 'Revenue Reserve', definition: 'Can be distributed as dividends \u2014 P&L balance, general reserve.' },
              { term: 'General Reserve', definition: 'Profits set aside by the directors for future use \u2014 a revenue reserve.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Capital Reserves (NOT distributable)</th><th>Revenue Reserves (distributable)</th></tr></thead><tbody><tr><td>Share Premium</td><td>P&L Balance (retained profits)</td></tr><tr><td>Revaluation Reserve</td><td>General Reserve</td></tr><tr><td>Capital Redemption Reserve</td><td></td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key Rule', html: '<p>Capital reserves <strong>cannot</strong> be used to pay dividends. Only revenue reserves are distributable.</p>' },
            ]
          },
        ]
      },
      // ── NEW: Section 9.4 — Company-Specific Q1 Adjustments ──
      {
        id: '9.4', title: 'Company-Specific Adjustments',
        subTopics: [
          {
            id: '9.4.1', title: 'Distribution Costs vs Administrative Expenses',
            body: [
              { type: 'concept', variant: 'blue', title: 'Expense Classification', html: '<p>In a company P&L, expenses are split into two categories:</p><p><strong>Distribution Costs</strong> (selling and distribution): advertising, carriage outwards, salespeople\'s wages, delivery van depreciation, bad debts.</p><p><strong>Administrative Expenses:</strong> office wages, rent, insurance, light & heat, office depreciation, audit fees, general expenses.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Distribution Costs</th><th>Administrative Expenses</th></tr></thead><tbody><tr><td>Advertising</td><td>Office wages & salaries</td></tr><tr><td>Carriage outwards</td><td>Rent & rates</td></tr><tr><td>Sales staff wages</td><td>Insurance</td></tr><tr><td>Delivery van depreciation</td><td>Light & heat</td></tr><tr><td>Bad debts written off</td><td>Office equipment depreciation</td></tr><tr><td>Increase in provision for bad debts</td><td>Audit fees</td></tr><tr><td>Commission on sales</td><td>General expenses</td></tr><tr><td>Discount allowed</td><td>Stationery</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>If the question does not specify how to split an expense, use common sense: anything related to selling or getting goods to customers = Distribution. Anything related to running the office = Admin. If an expense must be split (e.g. wages 60% selling, 40% admin), follow the note.</p>' },
            ]
          },
          {
            id: '9.4.2', title: 'Debenture Interest Adjustment',
            body: [
              { type: 'concept', variant: 'green', title: 'Debenture Interest Accrual', html: '<p>Debenture interest is usually paid half-yearly. At year end, check whether the full year\'s interest has been paid:</p><p><strong>Full year interest = Nominal value of debentures \u00d7 Interest rate</strong></p><p>If only half has been paid, accrue the other half:</p><p>P&L: Full year\u2019s interest as an expense.</p><p>Balance Sheet: Accrued interest = current liability.</p>' },
              { type: 'example', title: 'Example', html: '<p>8% Debentures \u20ac200,000. TB shows debenture interest paid \u20ac8,000.</p><p>Full year interest = 8% \u00d7 \u20ac200,000 = \u20ac16,000.</p><p>Already paid: \u20ac8,000. Accrued: \u20ac8,000.</p><p>P&L: Debenture interest \u20ac16,000 (deducted before arriving at Net Profit before Tax).</p><p>Balance Sheet: Accrued interest \u20ac8,000 \u2192 current liability.</p>' },
            ]
          },
          {
            id: '9.4.3', title: 'Share Issues During the Year',
            body: [
              { type: 'concept', variant: 'amber', title: 'Recording a Share Issue', html: '<p>When new shares are issued during the year:</p><p>1. <strong>Issued share capital</strong> increases by: Number of new shares \u00d7 Nominal value.</p><p>2. If issued at a premium: <strong>Share premium</strong> increases by: Number of shares \u00d7 (Issue price \u2212 Nominal value).</p><p>3. Bank increases by the total amount received.</p>' },
              { type: 'example', title: 'Example', html: '<p>Company issues 50,000 ordinary shares (\u20ac1 nominal) at \u20ac1.40 each.</p><p>Bank increases: 50,000 \u00d7 \u20ac1.40 = \u20ac70,000</p><p>Issued share capital increases: 50,000 \u00d7 \u20ac1.00 = \u20ac50,000</p><p>Share premium increases: 50,000 \u00d7 \u20ac0.40 = \u20ac20,000</p>' },
            ]
          },
          {
            id: '9.4.4', title: 'Corporation Tax & Dividends',
            body: [
              { type: 'concept', variant: 'red', title: 'Corporation Tax in the P&L', html: '<p>Corporation tax is charged on profit. In Q1:</p><p>1. The current year\u2019s tax provision is deducted in the P&L to give Net Profit after Tax.</p><p>2. Any tax from last year (if unpaid) appears in the TB as a current liability \u2014 this relates to last year and is NOT the current year\u2019s charge.</p><p>3. The current year\u2019s tax provision = current liability on the Balance Sheet.</p>' },
              { type: 'concept', variant: 'green', title: 'Dividend Calculation', html: '<p><strong>Preference dividend</strong> = Number of pref shares \u00d7 Nominal value \u00d7 Dividend rate</p><p><strong>Ordinary dividend</strong> = Number of ordinary shares \u00d7 Dividend per share</p><p>Interim dividend: already paid (no BS entry). Final dividend: proposed (current liability on BS).</p>' },
              { type: 'example', title: 'Example', html: '<p>400,000 ordinary shares of \u20ac1 each. Interim dividend of 3c per share already paid. Final dividend proposed: 5c per share.</p><p>Interim: 400,000 \u00d7 \u20ac0.03 = \u20ac12,000 (already in TB).</p><p>Final: 400,000 \u00d7 \u20ac0.05 = \u20ac20,000 (current liability).</p><p>Appropriation: Interim \u20ac12,000 + Final \u20ac20,000 = Total ordinary dividends \u20ac32,000.</p>' },
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
    estimatedMinutes: 35,
    related: [8, 9, 18],
    examPointers: [
      '2023 Q9 (b) — Users of published accounts and their information needs',
      '2019 Q9 (a) — Qualitative characteristics of useful financial info (FRS 102)',
      '2012 Q9 (b) — Purpose of the Directors’ Report and items it must contain',
      '2008 Q9 (a) — Companies Act regulatory framework and audit requirement',
    ],
    sections: [
      {
        id: '10.1', title: 'Published Financial Statements',
        subTopics: [
          {
            id: '10.1.1', title: 'Components of Published Accounts',
            keyTerms: [
              { term: 'Directors\' Report', definition: 'A report by directors giving an overview of the company\'s performance, activities, and future prospects.' },
              { term: 'FRS 102', definition: 'The Financial Reporting Standard applicable in the UK and Republic of Ireland — sets out the rules for financial reporting.' },
              { term: 'Published Accounts', definition: 'A condensed version of the internal accounts that must be filed with the CRO and made available to shareholders and the public.' },
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
        id: '10.2', title: 'Published P&L Format',
        subTopics: [
          {
            id: '10.2.1', title: 'Income Statement Layout',
            body: [
              { type: 'concept', variant: 'green', title: 'Published Income Statement Format', html: '<p><strong>Published Income Statement of [Company] plc for year ended 31/12/20XX</strong></p><table class="learn-table"><tbody><tr><td><strong>Turnover</strong> (Note 1)</td><td></td><td>X</td></tr><tr><td>Cost of Sales</td><td></td><td>(X)</td></tr><tr><td><strong>Gross Profit</strong></td><td></td><td><strong>X</strong></td></tr><tr><td>Distribution Costs (Note 2)</td><td>(X)</td><td></td></tr><tr><td>Administrative Expenses (Note 3)</td><td>(X)</td><td></td></tr><tr><td></td><td></td><td><strong>(X)</strong></td></tr><tr><td><strong>Operating Profit</strong></td><td></td><td><strong>X</strong></td></tr><tr><td>Investment Income</td><td>X</td><td></td></tr><tr><td>Interest Payable (Note 4)</td><td>(X)</td><td></td></tr><tr><td><strong>Profit on Ordinary Activities before Tax</strong></td><td></td><td><strong>X</strong></td></tr><tr><td>Corporation Tax</td><td></td><td>(X)</td></tr><tr><td><strong>Profit on Ordinary Activities after Tax</strong></td><td></td><td><strong>X</strong></td></tr><tr><td>Dividends (Note 5)</td><td></td><td>(X)</td></tr><tr><td><strong>Retained Profit for Year</strong></td><td></td><td><strong>X</strong></td></tr></tbody></table>' },
              { type: 'watchout', title: 'Distribution vs Admin — How to Classify', html: '<p><strong>Distribution Costs</strong> = expenses related to SELLING and DELIVERING goods:</p><p>Advertising, carriage outwards, sales reps\' salaries & commission, delivery van costs, depreciation of delivery vehicles, showroom costs, bad debts, provision for bad debts.</p><p><strong>Administrative Expenses</strong> = expenses related to RUNNING the business:</p><p>Office salaries, rent & rates (office), insurance, light & heat (office), audit fees, directors\' fees, office depreciation, general expenses, professional fees.</p><p><strong>Exam trap:</strong> Depreciation must be split — delivery vehicles go to Distribution, office equipment goes to Admin. If not specified, put it in Admin.</p>' },
            ]
          },
          {
            id: '10.2.2', title: 'Key Workings for the Published P&L',
            body: [
              { type: 'concept', variant: 'blue', title: 'Standard Workings Required', html: '<p>The SEC examiner expects specific workings for the Published P&L:</p><p><strong>W1: Cost of Sales</strong><br/>Opening stock + Purchases − Closing stock ± Manufacturing adjustments</p><p><strong>W2: Distribution Costs</strong><br/>List all selling/delivery expenses (each adjusted for accruals/prepayments as needed)</p><p><strong>W3: Administrative Expenses</strong><br/>List all office/admin expenses (adjusted)</p><p><strong>W4: Interest Payable</strong><br/>Debenture interest ± accrual. Remember: if the TB shows 6 months\' interest paid, you must accrue the other 6 months.</p><p><strong>W5: Dividends</strong><br/>Interim (already paid, in TB) + Final (proposed, to be accrued)</p><p><strong>W6: Corporation Tax</strong><br/>The figure given in the notes — this is the provision for the current year.</p>' },
              { type: 'examtip', title: 'Marks Allocation', html: '<p>Published Accounts is worth <strong>80-100 marks</strong> on Section 2. Typical split:</p><p>Published P&L: <strong>30-36 marks</strong> (including workings for Dist & Admin)</p><p>Published Balance Sheet: <strong>30-36 marks</strong></p><p>Notes to the Accounts: <strong>12-20 marks</strong></p><p>Show ALL workings — the examiner awards marks for the Distribution and Admin breakdowns even if the totals are wrong.</p>' },
            ]
          },
        ]
      },
      {
        id: '10.3', title: 'Published Balance Sheet',
        subTopics: [
          {
            id: '10.3.1', title: 'Balance Sheet Format',
            body: [
              { type: 'concept', variant: 'green', title: 'Published Balance Sheet Layout', html: '<p><strong>Balance Sheet of [Company] plc as at 31/12/20XX</strong></p><table class="learn-table"><tbody><tr><td colspan="3"><strong>Fixed Assets</strong> (Note 6)</td></tr><tr><td>Tangible Assets</td><td></td><td>X</td></tr><tr><td>Financial Assets (investments)</td><td></td><td>X</td></tr><tr><td></td><td></td><td><strong>X</strong></td></tr><tr><td colspan="3"><strong>Current Assets</strong></td></tr><tr><td>Stock</td><td>X</td><td></td></tr><tr><td>Debtors (Note 7)</td><td>X</td><td></td></tr><tr><td>Bank</td><td>X</td><td></td></tr><tr><td></td><td><strong>X</strong></td><td></td></tr><tr><td colspan="3"><strong>Creditors: amounts falling due within one year</strong> (Note 8)</td></tr><tr><td>Trade creditors, accruals, tax, proposed dividends, bank OD</td><td><strong>(X)</strong></td><td></td></tr><tr><td><strong>Net Current Assets</strong></td><td></td><td><strong>X</strong></td></tr><tr><td><strong>Total Assets less Current Liabilities</strong></td><td></td><td><strong>X</strong></td></tr><tr><td colspan="3"><strong>Creditors: amounts falling due after more than one year</strong> (Note 9)</td></tr><tr><td>Debentures / Long-term loans</td><td></td><td>(X)</td></tr><tr><td><strong>Net Assets</strong></td><td></td><td><strong>X</strong></td></tr><tr><td colspan="3"><strong>Capital and Reserves</strong> (Note 10)</td></tr><tr><td>Called-up share capital</td><td></td><td>X</td></tr><tr><td>Share premium</td><td></td><td>X</td></tr><tr><td>Revaluation reserve</td><td></td><td>X</td></tr><tr><td>Profit and loss balance</td><td></td><td>X</td></tr><tr><td><strong>Shareholders\' Funds</strong></td><td></td><td><strong>X</strong></td></tr></tbody></table>' },
              { type: 'watchout', title: 'Common BS Errors', html: '<p>1. <strong>Proposed dividends</strong> = Current Liability (creditors < 1 year). NOT deducted from reserves.</p><p>2. <strong>Corporation tax</strong> = Current Liability.</p><p>3. <strong>Debenture interest accrued</strong> = Current Liability (not long-term).</p><p>4. <strong>P&L balance</strong> = Opening P&L balance + Retained profit for year.</p><p>5. <strong>Revaluation reserve</strong> only changes if an asset is revalued during the year. Revaluation surplus = New value − Old NBV.</p>' },
            ]
          },
        ]
      },
      {
        id: '10.4', title: 'Notes to the Accounts',
        subTopics: [
          {
            id: '10.4.1', title: 'Required Notes',
            body: [
              { type: 'concept', variant: 'blue', title: 'Notes Commonly Examined', html: '<p><strong>Note 6: Tangible Fixed Assets</strong></p><table class="learn-table"><thead><tr><th></th><th>Land & Buildings</th><th>Equipment</th><th>Motor Vehicles</th><th>Total</th></tr></thead><tbody><tr><td><strong>Cost/Valuation</strong></td><td></td><td></td><td></td><td></td></tr><tr><td>At 01/01</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>Additions</td><td>X</td><td>X</td><td>-</td><td>X</td></tr><tr><td>Disposals</td><td>-</td><td>-</td><td>(X)</td><td>(X)</td></tr><tr><td>Revaluation</td><td>X</td><td>-</td><td>-</td><td>X</td></tr><tr><td>At 31/12</td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td></tr><tr><td><strong>Depreciation</strong></td><td></td><td></td><td></td><td></td></tr><tr><td>At 01/01</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>Charge for year</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>On disposals</td><td>-</td><td>-</td><td>(X)</td><td>(X)</td></tr><tr><td>Revaluation adj.</td><td>(X)</td><td>-</td><td>-</td><td>(X)</td></tr><tr><td>At 31/12</td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td></tr><tr><td><strong>NBV at 31/12</strong></td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td><td><strong>X</strong></td></tr></tbody></table>' },
              { type: 'concept', variant: 'green', title: 'Other Key Notes', html: '<p><strong>Note 7: Debtors</strong></p><p>Trade debtors: X<br/>Less: Provision for bad debts: (X)<br/>Prepayments: X<br/>Total debtors: <strong>X</strong></p><p><strong>Note 8: Creditors (< 1 year)</strong></p><p>Trade creditors: X<br/>Accruals: X<br/>Corporation tax: X<br/>Proposed dividends: X<br/>PAYE/PRSI: X<br/>VAT: X<br/>Debenture interest accrued: X<br/>Total: <strong>X</strong></p><p><strong>Note 9: Creditors (> 1 year)</strong></p><p>X% Debentures: X</p><p><strong>Note 10: Capital & Reserves</strong></p><p>Authorised share capital: X shares at €X = €X<br/>Issued share capital: X shares at €X = €X<br/>Share premium: X<br/>Revaluation reserve: X<br/>P&L balance: X</p>' },
              { type: 'examtip', title: 'Note 6 is the Highest-Scoring Note', html: '<p>The Fixed Asset Note (Note 6) typically carries <strong>12-16 marks</strong>. Key points:</p><p>1. If an asset is <strong>revalued</strong>, its cost is replaced by the new valuation AND accumulated depreciation is removed. Future depreciation is based on the new value.</p><p>2. On <strong>disposal</strong>, remove both cost and accumulated depreciation. The profit/loss on disposal does NOT appear in the note — it goes to the P&L.</p><p>3. <strong>Additions</strong> include assets purchased during the year (check for any bought on credit that might be in creditors).</p>' },
            ]
          },
        ]
      },
      {
        id: '10.5', title: 'Theory of Published Accounts',
        subTopics: [
          {
            id: '10.5.1', title: 'Users & Purpose',
            keyTerms: [
              { term: 'Users of Published Accounts', definition: 'Shareholders, potential investors, lenders, employees, suppliers, customers, government, the public.' },
              { term: 'Stewardship Function', definition: 'Directors use published accounts to demonstrate to shareholders how they have managed the company\u2019s resources.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Are Accounts Published?', html: '<p>1. <strong>Legal requirement</strong> under the Companies Act 2014 \u2014 plc and Ltd companies must file annual accounts with the CRO.</p><p>2. <strong>Stewardship</strong> \u2014 directors account to shareholders for how the company has been run.</p><p>3. <strong>Information for users</strong> \u2014 investors, lenders, employees and Revenue use the accounts to assess performance, security of loans, job security and tax due.</p><p>4. <strong>Public accountability</strong> \u2014 published accounts are part of the social contract giving limited liability to shareholders.</p>' },
              { type: 'concept', variant: 'green', title: 'Qualitative Characteristics (FRS 102)', html: '<p><strong>Relevance</strong> \u2014 information must influence economic decisions.</p><p><strong>Reliability</strong> \u2014 free from material error and bias.</p><p><strong>Comparability</strong> \u2014 prior-year figures shown alongside current year.</p><p><strong>Understandability</strong> \u2014 presented clearly for users with reasonable knowledge.</p>' },
            ]
          },
          {
            id: '10.5.2', title: 'Why Internal Accounts Are NOT Published',
            body: [
              { type: 'concept', variant: 'amber', title: 'Internal vs Published \u2014 The Theory', html: '<p>Companies prepare detailed <strong>internal</strong> accounts for management plus condensed <strong>published</strong> accounts for outsiders because:</p><p>1. <strong>Confidentiality</strong> \u2014 detailed margins, customers and supplier breakdowns would aid competitors.</p><p>2. <strong>Standardisation</strong> \u2014 published format under FRS 102 lets users compare across companies.</p><p>3. <strong>Materiality</strong> \u2014 outside users need summary figures, not every nominal-ledger account.</p>' },
              { type: 'examtip', title: 'Common Q9 Theory Asks', html: '<p>"State two reasons companies prepare published accounts" \u2014 use legal requirement + stewardship.</p><p>"Identify two qualitative characteristics" \u2014 relevance, reliability, comparability, understandability.</p><p>"Explain the role of the auditor" \u2014 independent examination, expresses opinion on true and fair view (link to Ch 8).</p>' },
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
    estimatedMinutes: 45,
    related: [6, 9, 22],
    examPointers: [
      'Q3 (manufacturing final accounts) — alternates with Q2; ~50% probability',
      '2021 Q9 (a) — Direct vs Indirect costs (with examples for a manufacturer)',
      '2017 Q9 (b) — Three types of stock held by a manufacturer (RM, WIP, FG)',
      '2013 Q9 (a) — Prime cost vs Factory cost: definitions and components',
    ],
    sections: [
      {
        id: '11.1', title: 'Manufacturing Account Structure',
        subTopics: [
          {
            id: '11.1.1', title: 'Three Stages of Cost',
            keyTerms: [
              { term: 'Prime Cost', definition: 'Direct Materials + Direct Labour + Direct Expenses. The total of all costs directly traceable to production.' },
              { term: 'Factory Overhead', definition: 'Indirect manufacturing costs \u2014 factory rent, factory insurance, factory depreciation, indirect wages.' },
              { term: 'Cost of Manufacture', definition: 'Prime Cost + Factory Overhead \u00b1 Work in Progress adjustment.' },
              { term: 'Work in Progress (WIP)', definition: 'Goods partially completed at the accounting date. Opening WIP is added; closing WIP is deducted.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Manufacturing Account Format', html: '<p><strong>Direct Materials:</strong><br/>Opening stock of raw materials<br/>+ Purchases of raw materials<br/>+ Carriage inwards on raw materials<br/>\u2212 Closing stock of raw materials<br/>= <strong>Raw Materials Consumed</strong></p><p><strong>+ Direct Labour</strong> (factory wages directly on production)<br/>+ Direct Expenses (royalties, special tools)<br/>= <strong>PRIME COST</strong></p><p>+ Factory Overhead (indirect costs)<br/>+ Opening WIP<br/>\u2212 Closing WIP<br/>= <strong>COST OF MANUFACTURE</strong></p>' },
              { type: 'watchout', title: 'Common Q1 Error', html: '<p>Students often confuse raw materials stock (belongs in Manufacturing Account) with finished goods stock (belongs in Trading Account). The Manufacturing Account uses raw materials stock. The Trading Account uses finished goods stock.</p>' },
            ]
          },
          {
            id: '11.1.2', title: 'Factory Overhead & Apportionment',
            body: [
              { type: 'concept', variant: 'green', title: 'Factory Overhead Items', html: '<p><strong>Factory-specific costs:</strong> Factory rent, factory rates, factory insurance, factory light & heat, factory supervisor\'s salary, factory depreciation, indirect factory materials, indirect factory labour.</p><p><strong>Apportioned costs:</strong> When a cost is shared between factory and office (e.g. rent for the whole building), it must be split on a fair basis \u2014 usually floor area, value of assets, or number of employees.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'Opening & Closing WIP', html: '<p>Work in Progress represents goods that are <strong>partially completed</strong> at the accounting date.</p><p><strong>Opening WIP</strong> is <strong>added</strong> to factory costs (these goods need to be finished).</p><p><strong>Closing WIP</strong> is <strong>deducted</strong> (these goods are not yet finished, so their cost should not be included in cost of manufacture).</p><p>Cost of Manufacture = Prime Cost + Factory Overhead + Opening WIP \u2212 Closing WIP</p>' },
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
              { type: 'concept', variant: 'green', title: 'The Flow', html: '<p>The <strong>Cost of Manufacture</strong> from the Manufacturing Account replaces "Purchases" in the Trading Account:</p><p>Sales<br/>Less: Cost of Sales:<br/>Opening stock of <strong>finished goods</strong><br/>+ <strong>Cost of Manufacture</strong><br/>\u2212 Closing stock of finished goods<br/>= Cost of Sales<br/>= <strong>Gross Profit</strong></p><p>Then the P&L continues as normal with expenses and other income.</p>' },
              { type: 'watchout', title: 'Three Types of Stock', html: '<p>1. <strong>Raw materials stock</strong> \u2192 Manufacturing Account (opening and closing).</p><p>2. <strong>Work in Progress</strong> \u2192 Manufacturing Account (opening and closing).</p><p>3. <strong>Finished goods stock</strong> \u2192 Trading Account (opening and closing).</p><p>On the Balance Sheet, all three appear as separate lines in Current Assets.</p>' },
            ]
          },
        ]
      },
      // ── Section 11.4 — Manufacturing Theory (David Wilson) ──
      {
        id: '11.4', title: 'Manufacturing Theory',
        subTopics: [
          {
            id: '11.4.1', title: 'Direct vs Indirect Costs',
            keyTerms: [
              { term: 'Direct Cost', definition: 'A cost that can be traced directly to a unit of production \u2014 e.g. raw materials in the product, the machinist\u2019s wages.' },
              { term: 'Indirect Cost (Overhead)', definition: 'A cost that benefits production but cannot be traced to a single unit \u2014 e.g. factory rent, supervisor\u2019s salary.' },
              { term: 'Direct Expenses', definition: 'Direct costs that are not materials or labour \u2014 most commonly royalties payable per unit produced and the hire of special tools.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why the Split Matters', html: '<p>The Manufacturing Account splits costs into <strong>direct</strong> (added together to give Prime Cost) and <strong>indirect</strong> (Factory Overhead). This split is essential because:</p><p>1. <strong>Prime Cost</strong> measures what each unit physically costs to make.</p><p>2. <strong>Cost of Manufacture</strong> includes overheads and is used to value finished-goods stock.</p><p>3. Management uses Prime Cost vs Total Cost to decide pricing and whether to make-or-buy components.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Direct Costs (Prime Cost)</th><th>Indirect Costs (Factory Overhead)</th></tr></thead><tbody><tr><td>Raw materials consumed</td><td>Factory rent and rates</td></tr><tr><td>Direct factory wages</td><td>Factory insurance</td></tr><tr><td>Royalties per unit</td><td>Factory light & heat</td></tr><tr><td>Hire of special tools</td><td>Depreciation of plant & machinery</td></tr><tr><td>&nbsp;</td><td>Indirect wages (foreman, cleaners)</td></tr></tbody></table>' },
            ]
          },
          {
            id: '11.4.2', title: 'Three Types of Stock',
            body: [
              { type: 'concept', variant: 'green', title: 'Raw Materials, WIP, Finished Goods', html: '<p>A manufacturer holds <strong>three</strong> kinds of stock, each appearing on the Balance Sheet as a separate line in current assets:</p><p>1. <strong>Raw materials</strong> \u2014 valued at cost. Opening + Purchases \u2212 Closing = Raw materials consumed (Manufacturing Account).</p><p>2. <strong>Work in Progress</strong> \u2014 partially completed goods. Opening WIP added, Closing WIP deducted to derive Cost of Manufacture.</p><p>3. <strong>Finished goods</strong> \u2014 valued at cost of manufacture (lower of cost and NRV \u2014 prudence). Used in the Trading Account.</p>' },
              { type: 'watchout', title: 'Stock Valuation Rule', html: '<p>Per the <strong>prudence concept</strong>, all three stock types are valued at the <strong>lower of cost and net realisable value (NRV)</strong>. NRV = expected selling price \u2212 costs to complete and sell.</p>' },
            ]
          },
          {
            id: '11.4.3', title: 'Apportionment of Shared Costs',
            body: [
              { type: 'concept', variant: 'amber', title: 'Bases of Apportionment', html: '<p>When a cost (e.g. rent, insurance, light & heat) covers both the factory and the office, it must be split on a <strong>fair basis</strong> reflecting how the cost is incurred:</p><p><strong>Floor area</strong> \u2014 rent, rates, light & heat, insurance of premises.</p><p><strong>Book value of assets</strong> \u2014 depreciation, insurance of assets.</p><p><strong>Number of employees</strong> \u2014 canteen, welfare, supervision.</p><p>Factory portion \u2192 Manufacturing Account (Factory Overhead). Office portion \u2192 P&L expense.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Set up a small apportionment table with columns "Total / Factory / Office" for each shared cost. Marks are awarded for the methodology even if a single arithmetic step is wrong.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 12 ──
  {
    id: 12, block: 'B',
    title: 'Departmental Accounts',
    description: 'Allocation and apportionment of income and expenses across departments.',
    estimatedMinutes: 18,
    related: [6, 11, 22],
    examPointers: [
      '2020 Q9 (a) — Advantages of preparing departmental accounts',
      '2018 Q9 (b) — Bases of apportionment for common overheads (with reasoning)',
      '2011 Q9 (b) — Distinguish between gross profit and contribution by department',
    ],
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
              { type: 'concept', variant: 'amber', title: 'Should a Loss-Making Department Close?', html: '<p>A department making a <strong>net loss</strong> should NOT necessarily be closed. If it makes a <strong>positive contribution</strong> (revenue exceeds directly identifiable costs), it helps cover shared overheads.</p><p>Closing it would mean its contribution is lost \u2014 remaining departments would have to cover more overheads, potentially reducing overall profit.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Always calculate the <strong>contribution</strong> (revenue minus directly identifiable costs). If positive, closing would reduce overall profit.</p>' },
            ]
          },
        ]
      },
      {
        id: '12.2', title: 'Theory of Departmental Accounts',
        subTopics: [
          {
            id: '12.2.1', title: 'Advantages & Disadvantages',
            body: [
              { type: 'concept', variant: 'green', title: 'Advantages', html: '<p>1. <strong>Performance measurement</strong> \u2014 management can see which departments are profitable.</p><p>2. <strong>Comparison</strong> between departments and against prior years.</p><p>3. <strong>Better decision-making</strong> \u2014 expand profitable departments, investigate or close loss-makers (subject to contribution analysis).</p><p>4. <strong>Staff motivation</strong> \u2014 departmental managers can be set targets and rewarded on results.</p><p>5. <strong>Accurate stock control</strong> per department.</p>' },
              { type: 'concept', variant: 'amber', title: 'Disadvantages', html: '<p>1. <strong>Apportionment is subjective</strong> \u2014 the chosen basis can distort the result.</p><p>2. <strong>More book-keeping work</strong> \u2014 increases cost of accounting.</p><p>3. <strong>Inter-departmental disputes</strong> over the share of common costs.</p><p>4. Risk of <strong>wrong closure decisions</strong> if managers focus on net profit instead of contribution.</p>' },
            ]
          },
          {
            id: '12.2.2', title: 'Choice of Apportionment Basis',
            body: [
              { type: 'concept', variant: 'blue', title: 'Picking the Right Basis', html: '<p>The basis must reflect <strong>how the cost is incurred</strong>:</p><p>\u2022 If the cost relates to <strong>space</strong> (rent, rates, light & heat) \u2192 floor area.</p><p>\u2022 If the cost relates to <strong>asset value</strong> (insurance of equipment, depreciation) \u2192 book value of assets.</p><p>\u2022 If the cost relates to <strong>people</strong> (canteen, welfare) \u2192 number of employees.</p><p>\u2022 If the cost relates to <strong>activity</strong> (general advertising, head-office charges) \u2192 turnover ratio.</p>' },
              { type: 'watchout', title: 'Common Trap', html: '<p>Examiners regularly include a cost that <strong>only benefits one department</strong> (e.g. advertising for Dept A only). This is a <strong>direct</strong> cost \u2014 do NOT apportion. Allocate it 100% to that department.</p>' },
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
    // ── Chapter 13 — EXPANDED ──
    id: 13, block: 'C',
    title: 'Club Accounts',
    description: 'Receipts & payments account, income & expenditure account, accumulated fund, bar trading.',
    estimatedMinutes: 35,
    related: [6, 14],
    examPointers: [
      'Q5 (club accounts) — appears periodically; ~30% probability for full question',
      '2022 Q9 (a) — Distinguish Receipts & Payments account vs Income & Expenditure account',
      '2018 Q9 (b) — Treatment of life membership and capital grants in club accounts',
      '2010 Q9 (b) — Calculate accumulated fund and explain its meaning',
    ],
    sections: [
      {
        id: '13.1', title: 'Club Accounts Structure',
        subTopics: [
          {
            id: '13.1.1', title: 'Receipts & Payments vs Income & Expenditure',
            keyTerms: [
              { term: 'Receipts & Payments Account', definition: 'A summary of cash transactions — similar to a cash book. Shows opening and closing bank balances.' },
              { term: 'Income & Expenditure Account', definition: 'The club equivalent of a P&L — shows surplus or deficit based on accruals.' },
              { term: 'Accumulated Fund', definition: 'The club equivalent of capital — net assets at the start of the period.' },
              { term: 'Surplus', definition: 'When income exceeds expenditure (equivalent to net profit).' },
              { term: 'Deficit', definition: 'When expenditure exceeds income (equivalent to net loss).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Two Types of Account', html: '<p><strong>Receipts & Payments (R&P):</strong> Cash basis. Records ALL cash received and paid during the year. Shows opening and closing bank balances. Capital items ARE included.</p><p><strong>Income & Expenditure (I&E):</strong> Accruals basis. Only includes income <em>earned</em> and expenses <em>incurred</em> during the year. Shows a surplus or deficit. Capital items are NOT included (only depreciation).</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>R&P Account</th><th>I&E Account</th></tr></thead><tbody><tr><td>Basis</td><td>Cash basis</td><td>Accruals basis</td></tr><tr><td>Shows</td><td>Opening/closing bank balance</td><td>Surplus or deficit</td></tr><tr><td>Capital items</td><td>Yes (equipment purchased)</td><td>No (depreciation instead)</td></tr><tr><td>Accruals/prepayments</td><td>Not adjusted</td><td>Fully adjusted</td></tr><tr><td>Equivalent to</td><td>Cash book summary</td><td>Profit & Loss Account</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key SEC Exam Trap', html: '<p>Capital items (purchase of equipment, sale of investments) appear in R&P but NOT in I&E. Depreciation appears in I&E but NOT in R&P. This is tested almost every time clubs appear.</p>' },
            ]
          },
          {
            id: '13.1.2', title: 'The Accumulated Fund',
            keyTerms: [
              { term: 'Statement of Affairs', definition: 'A balance sheet prepared at the start to calculate the accumulated fund — lists opening assets and liabilities.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Calculating the Accumulated Fund', html: '<p><strong>Opening Statement of Affairs:</strong></p><p>Opening Assets − Opening Liabilities = <strong>Accumulated Fund</strong></p><p>This is always the first working in a club accounts question. The examiner expects a neat statement listing every opening asset and liability.</p>' },
              { type: 'example', title: 'Worked Example — Opening Accumulated Fund', html: '<table class="learn-table"><thead><tr><th>Opening Assets</th><th>€</th></tr></thead><tbody><tr><td>Premises</td><td>120,000</td></tr><tr><td>Equipment</td><td>18,000</td></tr><tr><td>Bar stock</td><td>3,200</td></tr><tr><td>Subscriptions due (arrears)</td><td>600</td></tr><tr><td>Bank</td><td>4,500</td></tr><tr><td><strong>Total Assets</strong></td><td><strong>146,300</strong></td></tr></tbody></table><table class="learn-table"><thead><tr><th>Opening Liabilities</th><th>€</th></tr></thead><tbody><tr><td>Bar creditors</td><td>1,800</td></tr><tr><td>Subscriptions prepaid</td><td>400</td></tr><tr><td><strong>Total Liabilities</strong></td><td><strong>2,200</strong></td></tr></tbody></table><p><strong>Accumulated Fund = €146,300 − €2,200 = €144,100</strong></p>' },
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
              { term: 'Arrears', definition: 'Subscriptions due but not yet received — shown as a current asset (debtor).' },
              { term: 'Prepaid Subscriptions', definition: 'Subscriptions received in advance — shown as a current liability.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Subscriptions T-Account', html: '<p>Prepare a T-account to calculate subscription <strong>income</strong> for the I&E:</p><table class="learn-table"><thead><tr><th>Dr (Debit Side)</th><th>Cr (Credit Side)</th></tr></thead><tbody><tr><td>Arrears at start (b/d)</td><td>Prepaid at start (b/d)</td></tr><tr><td>Cash received (from R&P)</td><td><strong>I&E Income (balancing figure)</strong></td></tr><tr><td>Prepaid at end (c/d)</td><td>Arrears at end (c/d)</td></tr></tbody></table><p>The balancing figure on the <strong>credit side</strong> = Subscription Income for the I&E Account.</p>' },
              { type: 'watchout', title: 'Balances at Year End', html: '<p><strong>Arrears at year end</strong> = Debit balance carried down = Current Asset (debtors).</p><p><strong>Prepaid at year end</strong> = Credit balance carried down = Current Liability.</p><p>Students often get these reversed — remember: arrears = money OWED TO the club.</p>' },
              { type: 'examtip', title: 'SEC Marking Scheme', html: '<p>The subscriptions T-account is worth 8–10 marks in a typical club question. Show EVERY entry clearly — the examiner awards method marks even if the final figure is wrong.</p>' },
            ]
          },
          {
            id: '13.2.2', title: 'Special Receipts',
            keyTerms: [
              { term: 'Life Membership', definition: 'A one-off payment for permanent membership — spread over expected years of membership.' },
              { term: 'Entrance Fees', definition: 'One-off fees for new members — usually income in year received unless capitalised.' },
              { term: 'Government Grant', definition: 'Capital grants are spread over the asset life; revenue grants are immediate income.' },
              { term: 'Fundraising Income', definition: 'Income from events like lotto, race nights — shown separately in I&E.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Receipt</th><th>Treatment</th><th>Balance Sheet</th></tr></thead><tbody><tr><td>Entrance fees</td><td>Income in year received</td><td>None (unless prepaid element)</td></tr><tr><td>Life membership (€6,000 over 10 yrs)</td><td>€600 income p.a.</td><td>Balance = liability (deferred income)</td></tr><tr><td>Government grant (capital, €50,000 for asset with 10-yr life)</td><td>€5,000 income p.a.</td><td>Balance = liability (deferred grant)</td></tr><tr><td>Fundraising (lotto, race night)</td><td>Income in I&E (or net of direct costs)</td><td>None</td></tr><tr><td>Large one-off donation</td><td>May go directly to accumulated fund</td><td>Increases accumulated fund</td></tr></tbody></table>' },
              { type: 'example', title: 'Life Membership Calculation', html: '<p>Life membership received: €6,000. Expected membership: 10 years.</p><p>Annual income = €6,000 ÷ 10 = <strong>€600</strong> to I&E.</p><p>Year 1 Balance Sheet: Liability = €6,000 − €600 = <strong>€5,400</strong> (deferred income).</p>' },
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
              { type: 'concept', variant: 'green', title: 'Bar Trading Account Layout', html: '<p><strong>Bar Sales</strong> (from R&P, adjusted for debtors)<br/>Less: Cost of Bar Sales<br/>&nbsp;&nbsp;Opening bar stock<br/>&nbsp;&nbsp;+ Bar purchases (from R&P, adjusted for creditors)<br/>&nbsp;&nbsp;− Closing bar stock<br/>= <strong>Bar Gross Profit</strong><br/>Less: Bar wages, bar expenses<br/>= <strong>Bar Net Profit</strong> → transferred to I&E Account.</p>' },
              { type: 'example', title: 'Worked Example — Bar Trading Account', html: '<table class="learn-table"><thead><tr><th></th><th>€</th></tr></thead><tbody><tr><td>Bar Sales (R&P €42,000 + closing debtors €800 − opening debtors €500)</td><td>42,300</td></tr><tr><td>Less: Opening bar stock</td><td>3,200</td></tr><tr><td>+ Bar purchases (R&P €28,000 + closing creditors €1,900 − opening creditors €1,800)</td><td>28,100</td></tr><tr><td>− Closing bar stock</td><td>(3,800)</td></tr><tr><td><strong>Cost of Bar Sales</strong></td><td><strong>(27,500)</strong></td></tr><tr><td><strong>Bar Gross Profit</strong></td><td><strong>14,800</strong></td></tr><tr><td>Less: Bar wages</td><td>(5,200)</td></tr><tr><td><strong>Bar Net Profit → I&E</strong></td><td><strong>9,600</strong></td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Bar purchases and sales from the R&P are <em>cash figures</em>. You must adjust for opening AND closing creditors/debtors to get the accruals-based figures for the bar trading account.</p>' },
            ]
          },
        ]
      },
      {
        id: '13.4', title: 'I&E Account & Balance Sheet',
        subTopics: [
          {
            id: '13.4.1', title: 'Full I&E and Balance Sheet Layout',
            body: [
              { type: 'concept', variant: 'blue', title: 'Income & Expenditure Account', html: '<p><strong>Income:</strong></p><p>Subscription income (from T-account) + Bar net profit + Investment income + Entrance fees + Life membership (annual portion) + Government grant (annual portion) + Fundraising income</p><p><strong>Less Expenditure:</strong></p><p>Light & heat + Insurance + Repairs + Depreciation + Printing & stationery + Coaching fees + Wages + Any other expenses</p><p>= <strong>Surplus or Deficit</strong></p>' },
              { type: 'concept', variant: 'green', title: 'Balance Sheet', html: '<p><strong>Fixed Assets:</strong> Premises, equipment, investments (at NBV)</p><p><strong>Current Assets:</strong> Bar stock, subscription arrears, prepayments, bank</p><p><strong>Current Liabilities:</strong> Bar creditors, subscription prepaid, accruals, deferred income (current portion)</p><p><strong>Long-term Liabilities:</strong> Deferred life membership, deferred government grant</p><p><strong>Financed by:</strong> Accumulated fund + Surplus/Deficit = Closing Accumulated Fund</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    // ── Chapter 14 — EXPANDED ──
    id: 14, block: 'C',
    title: 'Service Firms\' Accounts',
    description: 'Fee income, service firm P&L layout, HL adjustments for professional practices.',
    estimatedMinutes: 30,
    related: [6, 13],
    examPointers: [
      '2024 Q9 (a) — Explain Work in Progress and its treatment in a service firm',
      '2019 Q9 (b) — Distinguish a service firm’s P&L from a trading firm’s P&L',
      '2015 Q9 (a) — Why service firms have no Trading Account',
    ],
    sections: [
      {
        id: '14.1', title: 'Service Firm Structure',
        subTopics: [
          {
            id: '14.1.1', title: 'Structure & Key Differences',
            keyTerms: [
              { term: 'Service Firm', definition: 'A business that provides services — e.g. solicitors, accountants, architects, veterinary practices.' },
              { term: 'Fee Income', definition: 'The main revenue source — fees charged for professional services rendered.' },
              
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Differences from Trading Firms', html: '<p>1. <strong>No Trading Account</strong> — no stock, no purchases, no cost of sales.</p><p>2. Main income is <strong>fee income</strong>, not sales.</p><p>3. P&L starts with <strong>Fee Income</strong> and deducts expenses to give Net Profit.</p><p>4. All other adjustments (depreciation, accruals, bad debts) work exactly as for a sole trader.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Trading Firm</th><th>Service Firm</th></tr></thead><tbody><tr><td>Sales</td><td>Fee Income</td></tr><tr><td>Trading Account → Gross Profit</td><td>No Trading Account</td></tr><tr><td>Purchases, Carriage In</td><td>Not applicable</td></tr><tr><td>Cost of Sales</td><td>Not applicable</td></tr></tbody></table>' },
            ]
          },
          {
            id: '14.1.2', title: 'Fee Income Calculation',
            body: [
              { type: 'concept', variant: 'green', title: 'Fee Income T-Account', html: '<p>Use a T-account to find the I&E figure:</p><table class="learn-table"><thead><tr><th>Dr (Debit Side)</th><th>Cr (Credit Side)</th></tr></thead><tbody><tr><td>Fees accrued at start (b/d)</td><td>Fees prepaid at start (b/d)</td></tr><tr><td><strong>Fee income for P&L (balancing fig.)</strong></td><td>Fees received (cash from TB)</td></tr><tr><td>Fees prepaid at end (c/d)</td><td>Fees accrued at end (c/d)</td></tr></tbody></table>' },
              { type: 'example', title: 'Worked Example', html: '<p>Fees received (TB): €185,000. Fees accrued: start €4,200, end €6,800. Fees prepaid: start €1,000, end €1,500.</p><p>Fee Income = €185,000 + €6,800 − €4,200 + €1,000 − €1,500 = <strong>€187,100</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '14.3', title: 'Full Service Firm P&L & BS',
        subTopics: [
          {
            id: '14.3.1', title: 'Complete P&L Layout',
            body: [
              { type: 'concept', variant: 'blue', title: 'Service Firm P&L Format', html: '<p><strong>Income Statement of [Firm Name] for year ended 31/12/20XX</strong></p><p><strong>Fee Income</strong> (adjusted for accruals & prepayments)</p><p><strong>Less Expenses:</strong><br/>Salaries & wages (adjusted)<br/>Rent (adjusted)<br/>Insurance (adjusted)<br/>Light & heat (adjusted)<br/>Depreciation<br/>Bad debts written off<br/>Increase/decrease in provision for bad debts<br/>Motor expenses<br/>Professional fees<br/>General expenses<br/>Interest paid<br/>= <strong>Total Expenses</strong></p><p>Fee Income − Total Expenses = <strong>Net Profit</strong></p>' },
              { type: 'examtip', title: 'SEC Marking Scheme Pattern', html: '<p>In SEC questions, service firm marks are typically allocated as:</p><p>1. Fee income calculation (accruals/prepayments): <strong>6-8 marks</strong></p><p>2. Expenses with adjustments: <strong>12-16 marks</strong></p><p>3. Balance Sheet: <strong>20 marks</strong></p>' },
            ]
          },
          {
            id: '14.3.2', title: 'Work-in-Progress (WIP) in a Professional Practice',
            keyTerms: [
              { term: 'Work in Progress (WIP)', definition: 'Services partially completed at year-end but not yet invoiced — valued at the cost of the time/expense already incurred.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why WIP Matters', html: '<p>Professional services (solicitors, accountants, architects, vets) often have jobs that span the year-end. The work has been started but not invoiced.</p><p>To match revenue with the period in which the work was performed (the <strong>matching concept</strong>), an adjustment is made:</p><p><strong>+ Closing WIP</strong> (work done this year, not yet invoiced — to be billed next year)</p><p><strong>− Opening WIP</strong> (work invoiced this year that was actually performed last year)</p><p>The net adjustment is added to fee income.</p>' },
              { type: 'concept', variant: 'green', title: 'Treatment in the Accounts', html: '<p><strong>Income Statement:</strong> Closing WIP added to fee income; Opening WIP deducted.</p><p><strong>Balance Sheet:</strong> Closing WIP shown as a <strong>current asset</strong> (similar to closing stock in a trading firm).</p><p><strong>Valuation rule:</strong> at the lower of cost or net realisable value — the prudence concept applies.</p>' },
              { type: 'examtip', title: 'Common Theory Question', html: '<p>"Explain the term Work in Progress and outline its accounting treatment in the financial statements of a professional firm." (worth ~10 marks in Q9 short questions when service firms appear).</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    // ── Chapter 15 — EXPANDED ──
    id: 15, block: 'C',
    title: 'Farm Accounts',
    description: 'Enterprise analysis, stock valuation, terms associated with farm accounting.',
    estimatedMinutes: 20,
    related: [6, 21],
    examPointers: [
      '2016 Q9 (b) — Define enterprise analysis and outline its benefits to a farmer',
      '2011 Q9 (a) — Treatment of farm produce consumed by the household',
      'Note: Farm accounts have not appeared as a full SEC question — primarily a Q9 short-theory topic',
    ],
    sections: [
      {
        id: '15.1', title: 'Farm Accounts Structure',
        subTopics: [
          {
            id: '15.1.1', title: 'Structure & Special Features',
            keyTerms: [
              { term: 'Enterprise Analysis', definition: 'Separating farm activities into distinct enterprises (dairy, tillage, livestock) to assess profitability of each.' },
              { term: 'Farm Produce Used in the House', definition: 'Farm goods consumed by the farmer — treated as drawings at market value.' },
              { term: 'Herd Basis', definition: 'Livestock kept for production (dairy cows, breeding stock) can be treated as fixed assets under the herd basis.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Farm Account Structure', html: '<p>1. Similar to a sole trader P&L but with farm-specific terminology.</p><p>2. <strong>Farm produce used in house</strong> = drawings at market value (reduces sales, not purchases).</p><p>3. <strong>Enterprise analysis</strong> splits income and expenses by farm activity (e.g. dairy, tillage, beef).</p><p>4. Multiple stock types: livestock, crops, fodder, seeds, and fertiliser.</p><p>5. EU subsidies and REPS payments are other income.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Farm Term</th><th>Accounting Equivalent</th><th>Treatment</th></tr></thead><tbody><tr><td>Farm produce used in house</td><td>Drawings</td><td>At market value; reduces sales</td></tr><tr><td>Closing valuation of livestock</td><td>Closing stock</td><td>Current asset on BS</td></tr><tr><td>Opening valuation of livestock</td><td>Opening stock</td><td>In Trading Account</td></tr><tr><td>REPS payments / EU subsidies</td><td>Other income</td><td>Income in P&L</td></tr><tr><td>Breeding stock (herd basis)</td><td>Fixed asset</td><td>Not depreciated, shown at cost</td></tr><tr><td>Livestock purchases</td><td>Purchases</td><td>In Trading Account</td></tr></tbody></table>' },
            ]
          },
          {
            id: '15.1.2', title: 'Enterprise Analysis',
            body: [
              { type: 'concept', variant: 'green', title: 'Columnar Format', html: '<p>The farm P&L may be presented in <strong>columnar format</strong> showing each enterprise (dairy, tillage, beef, etc.) in its own column.</p><p>Each enterprise shows its own income, direct costs, and contribution to total farm profit. This helps the farmer decide which enterprises are profitable and which should be expanded or discontinued.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th></th><th>Dairy €</th><th>Tillage €</th><th>Beef €</th><th>Total €</th></tr></thead><tbody><tr><td>Income</td><td>85,000</td><td>42,000</td><td>38,000</td><td>165,000</td></tr><tr><td>Direct costs</td><td>(52,000)</td><td>(28,000)</td><td>(30,000)</td><td>(110,000)</td></tr><tr><td><strong>Contribution</strong></td><td><strong>33,000</strong></td><td><strong>14,000</strong></td><td><strong>8,000</strong></td><td><strong>55,000</strong></td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '15.2', title: 'Farm P&L & Balance Sheet',
        subTopics: [
          {
            id: '15.2.1', title: 'Full Farm Final Accounts',
            body: [
              { type: 'concept', variant: 'blue', title: 'Farm Trading & P&L', html: '<p><strong>Trading Account:</strong></p><p>Farm sales (milk, livestock, crops)<br/>Less: Farm produce used in house<br/>= Net Farm Sales</p><p>Less: Opening livestock/crop stock + Livestock purchases + Seeds + Fertiliser + Feeds − Closing livestock/crop stock = Cost of Sales</p><p>= <strong>Gross Farm Profit</strong></p><p><strong>P&L Account:</strong></p><p>Gross Profit + EU subsidies + REPS payments<br/>Less: Farm wages, machinery costs, vet fees, insurance, depreciation, interest, etc.<br/>= <strong>Net Farm Profit</strong></p>' },
              { type: 'watchout', title: 'Key Exam Points', html: '<p>1. Farm produce used in house is deducted from sales (not added to drawings on the P&L).</p><p>2. EU subsidies go below Gross Profit as other income.</p><p>3. Farm accounts have NEVER been set as a full SEC exam question — but the syllabus includes it and it could appear as a theory question or part of a prediction wildcard.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    // ── Chapter 16 — EXPANDED ──
    id: 16, block: 'C',
    title: 'Incomplete Records',
    description: 'Reconstructing accounts when full double-entry records are not available.',
    estimatedMinutes: 30,
    related: [2, 5, 6],
    examPointers: [
      '2020 Q9 (a) — Distinguish mark-up from margin (with worked illustration)',
      '2014 Q9 (b) — Methods of estimating profit when records are incomplete',
      '2009 Q9 (a) — Net Worth method: formula and when it is used',
    ],
    sections: [
      {
        id: '16.1', title: 'Overview',
        subTopics: [
          {
            id: '16.1.1', title: 'What Are Incomplete Records?',
            keyTerms: [
              { term: 'Incomplete Records', definition: 'Situations where a business does not keep full double-entry records — the accountant must reconstruct the accounts.' },
              { term: 'Statement of Affairs', definition: 'A balance sheet prepared from incomplete records to establish the capital/net worth at a given date.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'When Do They Arise?', html: '<p>1. Small businesses that only keep a cash book and bank statements.</p><p>2. Records destroyed by fire, flood, or theft.</p><p>3. Single-entry systems (only some transactions recorded).</p><p>Two methods are used to reconstruct the accounts:</p><p><strong>Method 1:</strong> Control Account / Cash Method — reconstructs individual figures (sales, purchases) using T-accounts.</p><p><strong>Method 2:</strong> Net Worth / Balance Sheet Method — calculates profit by comparing opening and closing capital.</p>' },
              { type: 'examtip', title: 'SEC Context', html: '<p>Incomplete records typically appears as a component within Q1 (sole trader) or as part of a correction of errors question. The mark-up/margin calculation is the most frequently tested element.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'Finding Credit Sales — Debtors Control', html: '<table class="learn-table"><thead><tr><th>Dr (Debit Side)</th><th>Cr (Credit Side)</th></tr></thead><tbody><tr><td>Opening debtors (b/d)</td><td>Cash/cheques received from debtors</td></tr><tr><td><strong>Credit sales (balancing figure)</strong></td><td>Sales returns</td></tr><tr><td></td><td>Bad debts written off</td></tr><tr><td></td><td>Discount allowed</td></tr><tr><td></td><td>Closing debtors (c/d)</td></tr></tbody></table>' },
              { type: 'concept', variant: 'green', title: 'Finding Credit Purchases — Creditors Control', html: '<table class="learn-table"><thead><tr><th>Dr (Debit Side)</th><th>Cr (Credit Side)</th></tr></thead><tbody><tr><td>Cash/cheques paid to creditors</td><td>Opening creditors (b/d)</td></tr><tr><td>Purchase returns</td><td><strong>Credit purchases (balancing figure)</strong></td></tr><tr><td>Discount received</td><td></td></tr><tr><td>Closing creditors (c/d)</td><td></td></tr></tbody></table>' },
              { type: 'concept', variant: 'amber', title: 'Cash/Bank Summary', html: '<p>Prepare a summarised cash/bank account listing all known receipts and payments. The balancing figure may represent:</p><p>— Cash sales (if on the credit/income side)</p><p>— Unrecorded drawings or theft (if on the debit/payment side)</p>' },
            ]
          },
          {
            id: '16.2.2', title: 'Worked Example — Control Accounts',
            body: [
              { type: 'example', title: 'Finding Credit Sales', html: '<p>Opening debtors €8,500. Cash received from debtors €74,200. Bad debts €1,200. Discount allowed €800. Closing debtors €9,300.</p><table class="learn-table"><thead><tr><th>Dr</th><th>€</th><th>Cr</th><th>€</th></tr></thead><tbody><tr><td>Opening debtors</td><td>8,500</td><td>Cash received</td><td>74,200</td></tr><tr><td><strong>Credit sales (bal.)</strong></td><td><strong>77,000</strong></td><td>Bad debts</td><td>1,200</td></tr><tr><td></td><td></td><td>Discount allowed</td><td>800</td></tr><tr><td></td><td></td><td>Closing debtors</td><td>9,300</td></tr><tr><td><strong>Total</strong></td><td><strong>85,500</strong></td><td><strong>Total</strong></td><td><strong>85,500</strong></td></tr></tbody></table>' },
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
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Net Worth Formula', html: '<p><strong>Net Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced</strong></p><p>Steps:</p><p>1. Prepare <strong>opening statement of affairs</strong> → Opening Capital (assets − liabilities).</p><p>2. Prepare <strong>closing statement of affairs</strong> → Closing Capital (assets − liabilities).</p><p>3. Apply the formula.</p>' },
              { type: 'example', title: 'Worked Example', html: '<p>Opening capital €45,000. Closing capital €62,000. Drawings €18,000. Capital introduced €5,000.</p><p>Net Profit = €62,000 − €45,000 + €18,000 − €5,000 = <strong>€30,000</strong></p>' },
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
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Mark-Up</th><th>Equivalent Margin</th><th>Conversion</th></tr></thead><tbody><tr><td>25%</td><td>20%</td><td>25/125</td></tr><tr><td>33⅓%</td><td>25%</td><td>33.33/133.33</td></tr><tr><td>50%</td><td>33⅓%</td><td>50/150</td></tr><tr><td>100%</td><td>50%</td><td>100/200</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Most Common SEC Application', html: '<p>The examiner gives you the mark-up/margin and one known figure (e.g. sales or cost of sales). You must reconstruct the Trading Account. For example:</p><p>"Mark-up is 25%. Sales = €150,000."</p><p>Cost = €150,000 ÷ 1.25 = €120,000. Gross Profit = €30,000.</p>' },
            ]
          },
        ]
      },
    ]
  },


  // ── Chapter 17 — EXPANDED ──
  // ── Chapter 17 \u2014 EXPANDED ──
  {
    id: 17, block: 'C',
    title: 'Cash Flow Statements',
    description: 'FRS 1 Revised format, reconciliation notes, operating activities, investing, financing.',
    estimatedMinutes: 35,
    related: [9, 10, 18],
    examPointers: [
      'Q6 (cash flow statement) — appears in most years, 60 marks',
      '2023 Q9 (a) — Reasons why profit ≠ cash (depreciation, debtors, stock movements)',
      '2018 Q9 (b) — Purpose of a Cash Flow Statement and its three sections',
      '2014 Q9 (a) — Information provided by a Cash Flow Statement that is not in the P&L',
    ],
    sections: [
      {
        id: '17.1', title: 'Purpose & Structure',
        subTopics: [
          {
            id: '17.1.1', title: 'Why Cash Flow Statements?',
            keyTerms: [
              { term: 'Cash Flow Statement', definition: 'Shows the sources and uses of cash during the accounting period \u2014 explains the change in the cash/bank balance.' },
              { term: 'Operating Activities', definition: 'Cash flows from the main revenue-producing activities of the business.' },
              { term: 'Investing Activities', definition: 'Cash flows from buying/selling fixed assets and investments.' },
              { term: 'Financing Activities', definition: 'Cash flows from changes in the capital structure \u2014 share issues, loans, dividends.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Prepare a Cash Flow Statement?', html: '<p>Profit \u2260 Cash. A profitable business can still run out of cash.</p><p>The cash flow statement shows where cash came from and where it went, helping users assess:</p><p>1. The company\'s ability to <strong>generate cash</strong> from operations.</p><p>2. The company\'s ability to <strong>pay dividends</strong> and <strong>repay loans</strong>.</p><p>3. The reasons for <strong>differences between profit and cash</strong>.</p><p>4. The impact of <strong>investing and financing</strong> decisions on cash.</p>' },
              { type: 'watchout', title: 'Profit vs Cash', html: '<p>Common reasons profit \u2260 cash: depreciation (expense but no cash flow), credit sales (income but no cash yet), stock increases (cash spent but not yet in cost of sales), capital expenditure (cash out but only depreciation hits P&L).</p>' },
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
              { type: 'concept', variant: 'blue', title: 'From Operating Profit to Cash', html: '<p><strong>Operating Profit</strong> (from P&L)<br/>+ Depreciation (add back \u2014 not a cash item)<br/>+ Loss on disposal (add back) or \u2212 Profit on disposal (deduct)<br/>+ Decrease in stock or \u2212 Increase in stock<br/>+ Decrease in debtors or \u2212 Increase in debtors<br/>+ Increase in creditors or \u2212 Decrease in creditors<br/>= <strong>Cash generated from operations</strong></p><p>\u2212 Interest paid<br/>\u2212 Tax paid<br/>= <strong>Net cash from operating activities</strong></p>' },
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
              { type: 'concept', variant: 'green', title: 'Investing Activities', html: '<p><strong>Cash outflows:</strong> Purchase of fixed assets (tangible and intangible), purchase of investments.</p><p><strong>Cash inflows:</strong> Proceeds from sale of fixed assets, proceeds from sale of investments, investment income received.</p><p>Use the fixed asset accounts to calculate amounts: Closing cost \u2212 Opening cost + Disposals at cost = Purchases.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'Calculating Operating Profit', html: '<p>If the question does not give operating profit directly, calculate it:</p><p><strong>Operating Profit = Net Profit + Interest paid + Tax charged \u2212 Investment income</strong></p><p>This strips out the financing and investing items to get back to the operating level.</p>' },
              { type: 'concept', variant: 'green', title: 'Working Out Cash Paid', html: '<p>For interest paid, tax paid, or dividends paid, use a T-account:</p><p><strong>Opening liability + P&L charge \u2212 Cash paid = Closing liability</strong></p><p>Therefore: <strong>Cash paid = Opening + Charge \u2212 Closing</strong></p>' },
            ]
          },
        ]
      },
    ]
  },

  // ── Chapter 18 \u2014 EXPANDED ──
  {
    id: 18, block: 'C',
    title: 'Ratio Analysis & Interpretation',
    description: 'Profitability, liquidity, activity, gearing, and investment ratios with interpretation.',
    estimatedMinutes: 40,
    related: [9, 10, 17],
    examPointers: [
      'Q7 (interpretation of accounts) — appears in most years, 100 marks',
      '2024 Q9 (b) — Limitations of ratio analysis (4 points)',
      '2020 Q9 (a) — Define gearing and explain its significance to lenders',
      '2016 Q9 (b) — Stakeholder report: explain ratios to a prospective shareholder',
    ],
    sections: [
      {
        id: '18.1', title: 'Part A: Ratio Formulas',
        subTopics: [
          {
            id: '18.1.1', title: 'Profitability Ratios',
            keyTerms: [
              { term: 'Gross Profit %', definition: 'Gross Profit / Sales \u00d7 100. Measures efficiency of trading.' },
              { term: 'Net Profit %', definition: 'Net Profit / Sales \u00d7 100. Measures overall profitability after all expenses.' },
              { term: 'Return on Capital Employed (ROCE)', definition: 'Net Profit / Capital Employed \u00d7 100. The "master" ratio \u2014 measures return on investment.' },
              { term: 'Mark-Up', definition: 'Gross Profit / Cost of Sales \u00d7 100.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>What It Measures</th></tr></thead><tbody><tr><td>Gross Profit %</td><td>GP / Sales \u00d7 100</td><td>Efficiency of trading/buying</td></tr><tr><td>Net Profit %</td><td>NP / Sales \u00d7 100</td><td>Overall profitability</td></tr><tr><td>ROCE</td><td>NP / Capital Employed \u00d7 100</td><td>Return on total investment</td></tr><tr><td>Mark-Up</td><td>GP / COS \u00d7 100</td><td>Profit added to cost</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.1.2', title: 'Liquidity Ratios',
            keyTerms: [
              { term: 'Current Ratio', definition: 'Current Assets / Current Liabilities. Ideal: 2:1.' },
              { term: 'Acid Test (Quick Ratio)', definition: '(Current Assets \u2212 Stock) / Current Liabilities. Ideal: 1:1.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>Ideal</th></tr></thead><tbody><tr><td>Current Ratio</td><td>CA / CL</td><td>2:1</td></tr><tr><td>Acid Test</td><td>(CA \u2212 Stock) / CL</td><td>1:1</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Too High is Bad Too', html: '<p>A current ratio of 5:1 means the business has too much idle cash or stock \u2014 capital is not being used efficiently.</p>' },
            ]
          },
          {
            id: '18.1.3', title: 'Activity (Efficiency) Ratios',
            keyTerms: [
              { term: 'Stock Turnover', definition: 'Cost of Sales / Average Stock. How many times stock is sold and replaced per year.' },
              { term: 'Debtors Collection Period', definition: 'Debtors / Credit Sales \u00d7 365. Days to collect from customers.' },
              { term: 'Creditors Payment Period', definition: 'Creditors / Credit Purchases \u00d7 365. Days to pay suppliers.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th><th>Better When</th></tr></thead><tbody><tr><td>Stock Turnover</td><td>COS / Average Stock</td><td>Higher (selling stock faster)</td></tr><tr><td>Debtors Days</td><td>Debtors / Credit Sales \u00d7 365</td><td>Lower (collecting faster)</td></tr><tr><td>Creditors Days</td><td>Creditors / Credit Purchases \u00d7 365</td><td>Higher (taking longer to pay \u2014 but not too long)</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.1.4', title: 'Gearing & Investment Ratios',
            keyTerms: [
              { term: 'Gearing Ratio', definition: 'Long-term Debt / Capital Employed \u00d7 100. Measures financial risk.' },
              { term: 'Interest Cover', definition: 'Operating Profit / Interest payable. Times interest is covered by profit.' },
              { term: 'Earnings Per Share (EPS)', definition: 'Profit after tax and pref dividends / Number of ordinary shares.' },
              { term: 'Dividend Cover', definition: 'EPS / Dividend per share. Times dividends are covered by earnings.' },
              { term: 'Price/Earnings (P/E) Ratio', definition: 'Market price per share / EPS. Market confidence indicator.' },
              { term: 'Dividend Yield', definition: 'Dividend per share / Market price \u00d7 100. Actual return to shareholders.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Ratio</th><th>Formula</th></tr></thead><tbody><tr><td>Gearing</td><td>Long-term Debt / Capital Employed \u00d7 100</td></tr><tr><td>Interest Cover</td><td>Operating Profit / Interest payable</td></tr><tr><td>EPS</td><td>(PAT \u2212 Pref Div) / No. of Ordinary Shares</td></tr><tr><td>Dividend Cover</td><td>EPS / DPS</td></tr><tr><td>P/E Ratio</td><td>Market Price / EPS</td></tr><tr><td>Dividend Yield</td><td>DPS / Market Price \u00d7 100</td></tr></tbody></table>' },
              { type: 'watchout', title: 'High vs Low Gearing', html: '<p><strong>High gearing (>50%):</strong> More debt relative to equity \u2192 higher financial risk but interest is tax-deductible.</p><p><strong>Low gearing (<25%):</strong> Less debt \u2192 lower risk but potentially lower returns for shareholders.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'Interpretation Steps', html: '<p>1. <strong>Calculate</strong> the ratio for both years.</p><p>2. <strong>State the trend</strong> \u2014 has it improved or worsened?</p><p>3. <strong>Give a reason</strong> \u2014 what caused the change?</p><p>4. <strong>Suggest a remedy</strong> \u2014 what can management do?</p>' },
              { type: 'concept', variant: 'green', title: 'Compare Against', html: '<p>1. <strong>Previous years</strong> \u2014 is the trend improving?</p><p>2. <strong>Industry averages</strong> \u2014 is the business performing above or below average?</p><p>3. <strong>Competitors</strong> \u2014 how does it compare with rivals?</p><p>4. <strong>Benchmarks</strong> \u2014 ideal ratios (current ratio 2:1, acid test 1:1).</p>' },
            ]
          },
          {
            id: '18.2.2', title: 'Stakeholder Perspective',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Stakeholder</th><th>Most Interested In</th></tr></thead><tbody><tr><td>Shareholders</td><td>EPS, dividend yield, P/E ratio, ROCE</td></tr><tr><td>Banks/Lenders</td><td>Gearing, interest cover, current ratio, acid test</td></tr><tr><td>Suppliers</td><td>Current ratio, creditors days, acid test</td></tr><tr><td>Employees</td><td>Profitability, liquidity (job security)</td></tr><tr><td>Management</td><td>All ratios \u2014 for planning and control</td></tr><tr><td>Revenue</td><td>Profitability (tax base)</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.2.3', title: 'Limitations of Ratio Analysis',
            body: [
              { type: 'concept', variant: 'amber', title: 'Limitations', html: '<p>1. Based on <strong>historical data</strong> \u2014 past performance may not predict the future.</p><p>2. <strong>Different accounting policies</strong> make comparison between companies difficult.</p><p>3. <strong>Window dressing</strong> \u2014 companies may manipulate year-end figures.</p><p>4. <strong>Inflation</strong> distorts comparisons over time.</p><p>5. <strong>Non-financial factors</strong> are ignored (staff morale, brand value, innovation).</p><p>6. Ratios are <strong>interrelated</strong> \u2014 improving one may worsen another.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 19, block: 'C',
    title: 'Tabular Statements',
    description: 'Effects of transactions on the balance sheet \u2014 assets, liabilities, and capital.',
    estimatedMinutes: 15,
    related: [1, 2, 6],
    examPointers: [
      'Tabular statements — frequent component of Q1 and Q4',
      '2019 Q4 — Effect of transactions on assets, liabilities and capital (full tabular)',
      '2013 Q9 (b) — Explain the accounting equation and its application',
    ],
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
              { type: 'concept', variant: 'blue', title: 'How Tabular Statements Work', html: '<p>A tabular statement shows the effect of each transaction on the <strong>balance sheet</strong>. After each transaction, the accounting equation must still balance.</p><p><strong>Assets = Liabilities + Capital</strong></p><p>Each transaction affects at least two items. Show + and \u2212 for each affected item and verify the equation still balances.</p>' },
              { type: 'example', title: 'Example Transactions', html: '<p><strong>Owner invests \u20ac10,000:</strong> Assets (Bank) +\u20ac10,000, Capital +\u20ac10,000.</p><p><strong>Buy equipment for \u20ac3,000 cash:</strong> Assets (Equipment) +\u20ac3,000, Assets (Bank) \u2212\u20ac3,000. No net change.</p><p><strong>Buy stock on credit \u20ac2,000:</strong> Assets (Stock) +\u20ac2,000, Liabilities (Creditors) +\u20ac2,000.</p><p><strong>Pay wages \u20ac500:</strong> Assets (Bank) \u2212\u20ac500, Capital \u2212\u20ac500 (expense reduces capital).</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK D \u2014 MANAGEMENT ACCOUNTING (Ch 20-24)
  // ──────────────────────────────────────────────────
  {
    id: 20, block: 'D',
    title: 'Nature & Scope of Management Accounting',
    description: 'Role of management accounting, planning, control, decision-making.',
    estimatedMinutes: 12,
    related: [1, 21],
    examPointers: [
      '2022 Q9 (a) — Distinguish fixed costs vs variable costs (with examples)',
      '2017 Q9 (b) — Define direct vs indirect costs and product vs period costs',
      '2012 Q9 (a) — Behaviour of semi-variable costs and how they are split',
    ],
    sections: [
      {
        id: '20.1', title: 'Management Accounting',
        subTopics: [
          {
            id: '20.1.1', title: 'Role & Functions',
            keyTerms: [
              { term: 'Management Accounting', definition: 'Provides financial and non-financial information to managers for planning, control and decision-making.' },
              { term: 'Planning', definition: 'Setting objectives and determining how to achieve them \u2014 budgets are the main tool.' },
              { term: 'Control', definition: 'Comparing actual results with budgets and taking corrective action.' },
              { term: 'Decision-Making', definition: 'Using financial data to choose between alternatives \u2014 e.g. make or buy, special orders.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Financial Accounting</th><th>Management Accounting</th></tr></thead><tbody><tr><td>Past-focused</td><td>Future-focused</td></tr><tr><td>For external users</td><td>For internal managers</td></tr><tr><td>Must follow standards (FRS 102)</td><td>No prescribed format</td></tr><tr><td>Annual/periodic</td><td>As needed (daily, weekly, monthly)</td></tr><tr><td>Whole business</td><td>Segments, products, departments</td></tr></tbody></table>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 21, block: 'D',
    title: 'Cost Classification',
    description: 'Fixed, variable, semi-variable, direct, indirect costs; cost behaviour and the high-low method.',
    estimatedMinutes: 22,
    related: [20, 22, 23],
    examPointers: [
      'Q8 (product costing / overhead absorption) — alternates with Q9 marginal costing',
      '2021 Q9 (a) — Bases of overhead absorption (machine-hour vs labour-hour)',
      '2015 Q9 (b) — Define under- and over-absorption of overheads and their treatment',
      '2009 Q9 (a) — Distinguish allocation, apportionment and absorption',
    ],
    sections: [
      {
        id: '21.1', title: 'Types of Cost',
        subTopics: [
          {
            id: '21.1.1', title: 'By Behaviour',
            keyTerms: [
              { term: 'Fixed Cost', definition: 'A cost that stays the same regardless of output \u2014 e.g. rent, insurance, salaries.' },
              { term: 'Variable Cost', definition: 'A cost that changes in proportion to output \u2014 e.g. raw materials, direct labour (piece rate).' },
              { term: 'Semi-Variable Cost', definition: 'Has both fixed and variable elements \u2014 e.g. telephone (fixed line rental + variable usage).' },
              { term: 'Step Fixed Cost', definition: 'Fixed within a range but jumps at certain output levels \u2014 e.g. supervisor salaries.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Type</th><th>Behaviour</th><th>Example</th></tr></thead><tbody><tr><td>Fixed</td><td>Constant total, decreasing per unit</td><td>Rent, insurance, straight-line depreciation</td></tr><tr><td>Variable</td><td>Constant per unit, increasing total</td><td>Raw materials, packaging, piece-rate wages</td></tr><tr><td>Semi-variable</td><td>Fixed element + variable element</td><td>Telephone, electricity, maintenance</td></tr><tr><td>Step fixed</td><td>Fixed in ranges, jumps at thresholds</td><td>Supervisors, machine capacity</td></tr></tbody></table>' },
            ]
          },
          {
            id: '21.1.2', title: 'By Traceability',
            keyTerms: [
              { term: 'Direct Cost', definition: 'Can be traced directly to a product or cost unit \u2014 materials, labour, expenses.' },
              { term: 'Indirect Cost (Overhead)', definition: 'Cannot be traced to a specific product \u2014 must be shared/apportioned.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Direct Costs</th><th>Indirect Costs (Overheads)</th></tr></thead><tbody><tr><td>Raw materials used in production</td><td>Factory rent</td></tr><tr><td>Wages of production workers</td><td>Factory supervisor salary</td></tr><tr><td>Royalties per unit</td><td>Factory insurance</td></tr><tr><td>Specific tools for a job</td><td>Depreciation of factory equipment</td></tr></tbody></table>' },
              { type: 'concept', variant: 'green', title: 'Cost Formula', html: '<p><strong>Prime Cost</strong> = Direct Materials + Direct Labour + Direct Expenses</p><p><strong>Total Cost</strong> = Prime Cost + Production Overheads + Admin Overheads + Selling & Distribution Overheads</p>' },
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
              { type: 'concept', variant: 'green', title: 'Steps', html: '<p>1. Identify highest and lowest activity levels and total costs.</p><p>2. <strong>Variable cost per unit</strong> = (Highest cost \u2212 Lowest cost) / (Highest activity \u2212 Lowest activity)</p><p>3. <strong>Fixed cost</strong> = Total cost \u2212 (Variable per unit \u00d7 Activity)</p>' },
              { type: 'example', title: 'Example', html: '<p>High: 300 units, \u20ac2,500. Low: 100 units, \u20ac1,500.</p><p>Variable = (\u20ac2,500 \u2212 \u20ac1,500) / (300 \u2212 100) = <strong>\u20ac5/unit</strong></p><p>Fixed = \u20ac2,500 \u2212 (\u20ac5 \u00d7 300) = <strong>\u20ac1,000</strong></p><p>Cost equation: TC = \u20ac1,000 + \u20ac5x</p>' },
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
    examPointers: [
      'Q9 (marginal costing / break-even) — alternates with Q8; ~50% probability',
      '2023 Q9 (b) — Limitations of break-even analysis (4 assumptions that may not hold)',
      '2018 Q9 (a) — Define contribution and explain its uses in decision-making',
      '2011 Q9 (b) — Margin of safety: definition and significance',
    ],
    sections: [
      {
        id: '22.1', title: 'Part A: Stock Valuation',
        subTopics: [
          {
            id: '22.1.1', title: 'FIFO, LIFO & Weighted Average',
            keyTerms: [
              { term: 'FIFO', definition: 'First In, First Out \u2014 oldest stock sold first. Closing stock at most recent prices.' },
              { term: 'LIFO', definition: 'Last In, First Out \u2014 newest stock sold first. Closing stock at oldest prices.' },
              { term: 'Weighted Average', definition: 'Average cost recalculated after each purchase.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'FIFO', html: '<p>Issues oldest stock first. Closing stock at most recent prices.</p><p>Rising prices: <strong>higher closing stock \u2192 higher GP</strong>. Accepted under FRS 102.</p>' },
              { type: 'concept', variant: 'green', title: 'LIFO', html: '<p>Issues newest stock first. Closing stock at oldest prices.</p><p>Rising prices: <strong>lower closing stock \u2192 lower GP</strong>. NOT accepted under FRS 102 for published accounts.</p>' },
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
              { term: 'Over-absorption', definition: 'Overheads absorbed > actual \u2014 added back to profit.' },
              { term: 'Under-absorption', definition: 'Overheads absorbed < actual \u2014 deducted from profit.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Absorption Costing', html: '<p><strong>Direct Materials + Direct Labour + Direct Expenses + Absorbed Overhead = Total Cost per Unit</strong></p>' },
              { type: 'concept', variant: 'blue', title: 'OAR Calculation', html: '<p><strong>OAR = Budgeted Overheads / Budgeted Activity</strong></p><p>Applied to actual activity to calculate absorbed overheads.</p>' },
              { type: 'concept', variant: 'amber', title: 'Steps in Overhead Recovery', html: '<p>1. <strong>Allocation</strong> \u2014 assign directly to departments.</p><p>2. <strong>Apportionment</strong> \u2014 share common costs.</p><p>3. <strong>Reapportionment</strong> \u2014 transfer service dept costs to production.</p><p>4. <strong>Absorption</strong> \u2014 charge to products using OAR.</p>' },
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
    examPointers: [
      'Q9 (cash budget) — appears periodically; ~30% probability for full question',
      '2024 Q9 (a) — Advantages of preparing a cash budget',
      '2019 Q9 (b) — Limitations of budgeting and possible behavioural problems',
      '2010 Q9 (a) — Distinguish a fixed budget from a flexible budget',
    ],
    sections: [
      {
        id: '23.1', title: 'Marginal Costing',
        subTopics: [
          {
            id: '23.1.1', title: 'Key Concepts',
            keyTerms: [
              { term: 'Marginal Costing', definition: 'Only variable costs charged to products. Fixed costs are period costs.' },
              { term: 'Contribution', definition: 'Sales \u2212 Variable Costs. Amount available to cover fixed costs and profit.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Marginal Costing', html: '<p>Only <strong>variable costs</strong> are charged to products. Fixed costs are period costs.</p><p><strong>Contribution = Sales \u2212 Variable Costs</strong></p><p><strong>Profit = Total Contribution \u2212 Fixed Costs</strong></p>' },
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
              { term: 'BEP', definition: 'Break-Even Point \u2014 where total revenue equals total costs. Contribution = Fixed costs.' },
              { term: 'Margin of Safety', definition: 'Actual sales minus BEP sales. Amount sales can fall before a loss.' },
              { term: 'C/S Ratio', definition: 'Contribution / Sales \u00d7 100.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Formulas', html: '<p><strong>BEP (units)</strong> = Fixed Costs / Contribution per unit</p><p><strong>BEP (sales)</strong> = Fixed Costs / C/S Ratio</p><p><strong>C/S Ratio</strong> = Contribution per unit / SP \u00d7 100</p><p><strong>Margin of Safety</strong> = Actual sales \u2212 BEP sales</p><p><strong>Target Profit (units)</strong> = (FC + Target Profit) / Contribution per unit</p>' },
              { type: 'example', title: 'Example', html: '<p>SP \u20ac50, VC \u20ac30, FC \u20ac100,000.</p><p>Contribution = \u20ac20. BEP = \u20ac100,000 / \u20ac20 = <strong>5,000 units</strong></p><p>BEP sales = 5,000 \u00d7 \u20ac50 = <strong>\u20ac250,000</strong></p><p>If actual = 7,000: MoS = 2,000 units (28.6%)</p>' },
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
    examPointers: [
      '2022 Q9 (b) — Define standard costing and explain how variances arise',
      '2017 Q9 (a) — Material price vs material usage variance: meaning and causes',
      '2013 Q9 (b) — Benefits of standard costing as a management control tool',
    ],
    sections: [
      {
        id: '24.1', title: 'Part A: Manufacturing Budgets',
        subTopics: [
          {
            id: '24.1.1', title: 'Budget Types & Preparation',
            keyTerms: [
              { term: 'Budget', definition: 'A financial plan for a future period expressed in monetary terms.' },
              { term: 'Master Budget', definition: 'The overall budget comprising all functional budgets \u2014 culminates in budgeted P&L and Balance Sheet.' },
              { term: 'Production Budget', definition: 'Expected sales \u00b1 desired change in finished goods stock = Units to produce.' },
              { term: 'Materials Budget', definition: 'Production needs \u00b1 desired change in raw materials stock = Materials to purchase.' },
              { term: 'Labour Budget', definition: 'Production units \u00d7 labour hours per unit \u00d7 wage rate.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Budget Hierarchy', html: '<p>1. <strong>Sales Budget</strong> \u2014 starting point (all other budgets derive from expected sales).</p><p>2. <strong>Production Budget</strong> = Sales + Closing stock \u2212 Opening stock.</p><p>3. <strong>Materials Budget</strong> = Production needs + Closing stock \u2212 Opening stock.</p><p>4. <strong>Labour Budget</strong> = Production \u00d7 hours \u00d7 rate.</p><p>5. <strong>Overhead Budget</strong> = Fixed + variable overheads.</p><p>6. <strong>Cash Budget</strong> \u2014 timing of cash receipts and payments.</p>' },
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
              { term: 'Cash Budget', definition: 'A forecast of cash inflows and outflows over a future period \u2014 shows expected cash surplus or deficit each month.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Cash Budget Format', html: '<p><strong>Opening balance</strong><br/>+ Cash receipts (cash sales, debtor collections, other income)<br/>\u2212 Cash payments (purchases, wages, overheads, capital expenditure, loan repayments)<br/>= <strong>Closing balance</strong></p><p>The closing balance of one month becomes the opening balance of the next.</p>' },
              { type: 'watchout', title: 'Cash vs Profit', html: '<p>The cash budget does NOT include depreciation (not a cash flow) but DOES include capital expenditure, loan repayments, and VAT payments. Credit terms affect timing \u2014 sales on 30-day credit mean cash arrives the following month.</p>' },
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
              { term: 'Fixed Budget', definition: 'Prepared for one level of activity \u2014 does not change when actual activity differs.' },
              { term: 'Flexible Budget', definition: 'Adjusts for the actual level of activity achieved \u2014 allows meaningful comparison with actual results.' },
              { term: 'Variance', definition: 'The difference between budgeted and actual figures. Favourable = actual better than budget. Adverse = actual worse.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Fixed vs Flexible', html: '<p>A <strong>fixed budget</strong> is based on one level of output. If actual output differs, comparison is meaningless.</p><p>A <strong>flexible budget</strong> adjusts the budget to actual output: fixed costs stay the same, variable costs are flexed to actual volume.</p><p>This gives a meaningful <strong>like-for-like comparison</strong> with actual results.</p>' },
              { type: 'concept', variant: 'green', title: 'Variance Types', html: '<p><strong>Favourable (F):</strong> Actual result is better than budget \u2014 higher revenue or lower cost.</p><p><strong>Adverse (A):</strong> Actual result is worse \u2014 lower revenue or higher cost.</p><p>Significant variances should be <strong>investigated</strong> and explained.</p>' },
            ]
          },
          {
            id: '24.3.2', title: 'Sensitivity Analysis',
            keyTerms: [
              { term: 'Sensitivity Analysis', definition: '"What if" analysis \u2014 shows the effect on profit from changes in key variables.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Investigating Variances', html: '<p>Not all variances need investigation. Focus on variances that are:</p><p>1. <strong>Significant</strong> \u2014 large in absolute or percentage terms.</p><p>2. <strong>Controllable</strong> \u2014 the manager can take action.</p><p>3. <strong>Recurring</strong> \u2014 happening repeatedly.</p>' },
              { type: 'concept', variant: 'blue', title: 'Sensitivity Analysis', html: '<p>Examines how changes in key variables affect profit:</p><p>1. What if selling price decreases by 10%?</p><p>2. What if sales volume falls by 15%?</p><p>3. What if variable costs increase by 5%?</p><p>4. What if fixed costs increase by \u20ac20,000?</p><p>The variable with the <strong>biggest impact</strong> on profit is the most <strong>sensitive</strong> factor.</p>' },
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
      breadcrumb: `Block ${ch.block} \u2014 Ch ${ch.id}`,
      chapterId: ch.id,
      sectionId: null,
      subTopicId: null,
    });

    for (const sec of ch.sections) {
      items.push({
        type: 'section',
        title: sec.title,
        body: '',
        breadcrumb: `Ch ${ch.id} ${ch.title} \u2192 ${sec.id}`,
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
          breadcrumb: `Ch ${ch.id} \u2192 ${sec.id} ${sec.title}`,
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
              breadcrumb: `Ch ${ch.id} \u2192 ${sec.id} \u2192 ${sub.title}`,
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
