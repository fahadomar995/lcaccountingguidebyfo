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
    estimatedMinutes: 18,
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
              { type: 'prose', html: '<p>Many different groups are interested in the financial affairs of a company for different reasons.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Users</th><th>Users\' Interests</th></tr></thead><tbody><tr><td><strong>Banks & lending institutions</strong></td><td>Can interest payments be met? Can loans be repaid? Should new loans be granted? What security is available?</td></tr><tr><td><strong>Trade creditors</strong></td><td>Is there enough working/liquid capital? Will credit terms be met?</td></tr><tr><td><strong>Ordinary shareholders</strong></td><td>Is the company profitable and viable/liquid? What dividend will be paid? What is the value of shares?</td></tr><tr><td><strong>Potential shareholders</strong></td><td>Good investment opportunity? Share price? Dividend policy and yield?</td></tr><tr><td><strong>Directors & senior management</strong></td><td>Profitability? Liquidity? Solvency? Manager performance?</td></tr><tr><td><strong>Employees & trade unions</strong></td><td>Can wage levels be maintained? Can increases be afforded?</td></tr><tr><td><strong>Competitors</strong></td><td>To compare performance. To assess takeover possibilities.</td></tr><tr><td><strong>Revenue Commissioners / Government</strong></td><td>To charge correct taxation. To allocate grants. To offer contracts.</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>When asked to name users, always give the <strong>reason</strong> for their interest — marks are awarded for the explanation, not just the name.</p>' },
            ]
          },
        ]
      },
      {
        id: '1.2', title: 'Accounting Concepts',
        subTopics: [
          {
            id: '1.2.1', title: 'The Four Fundamental Concepts',
            keyTerms: [
              { term: 'Going Concern', definition: 'The assumption that the business will continue to operate for the foreseeable future — no intention or need to close down or liquidate.' },
              { term: 'Accruals (Matching)', definition: 'All items of income and expenditure belonging to a given period must be included in the financial statements for that period, regardless of whether they are paid/received.' },
              { term: 'Consistency', definition: 'Accounting items must be treated in exactly the same way from one accounting period to the next, enabling comparison of like with like.' },
              { term: 'Prudence (Conservatism)', definition: 'Caution should be exercised — losses can be anticipated but gains cannot. Profits should not be overstated and losses should not be understated.' },
            ],
            body: [
              { type: 'prose', html: '<p>There are four main accounting concepts which must apply to all financial information. There is a presumption that accounts are prepared with these concepts in mind.</p>' },
              { type: 'concept', variant: 'blue', title: 'Going Concern', html: '<p>When preparing accounts it must be assumed that the business will continue in its present form for the <strong>foreseeable future</strong> — i.e. there is no intention or need for the business to close down or go into liquidation. Assets are valued at cost, not at what they would fetch if the business were to close.</p>' },
              { type: 'concept', variant: 'green', title: 'Accruals (Matching)', html: '<p>All items of income and expenditure that <strong>belong</strong> to a given accounting period must be included in the financial statements for that period regardless of whether they are paid/received or not. Items sold on credit must be treated as income immediately, not when money is received.</p>' },
              { type: 'concept', variant: 'red', title: 'Consistency', html: '<p>Accounting items must be treated in exactly the <strong>same way</strong> from one accounting period to the next. This enables the business to compare like with like.</p>' },
              { type: 'concept', variant: 'amber', title: 'Prudence (Conservatism)', html: '<p>When preparing accounts, caution should be exercised. Losses can be <strong>anticipated</strong> but gains <strong>cannot</strong>. This ensures profits will not be overstated and losses will not be understated. The prudence concept <strong>overrides</strong> the accruals concept in cases where they may clash.</p>' },
            ]
          },
          {
            id: '1.2.2', title: 'Other Concepts & Principles',
            keyTerms: [
              { term: 'Entity Concept', definition: 'The business exists in its own right, separate from its owners. A clear distinction is made between business and private affairs.' },
              { term: 'Money Measurement', definition: 'Only items that have a monetary value can be included in financial accounts.' },
              { term: 'Materiality', definition: 'Some items may be too small to be regarded as materially significant. Generally material if greater than 5% of overall profit.' },
              { term: 'Realisation Principle', definition: 'Profit is earned at the time goods or services pass to the customer, not when they are paid for.' },
              { term: 'Objectivity', definition: 'Accounts are prepared without personal bias, backed up by documents such as invoices and receipts.' },
              { term: 'Period of Account', definition: 'The length of one accounting period should be consistent with the next, usually annual.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Entity Concept', html: '<p>The business exists in its own right, <strong>separate from its owners</strong>. A clear distinction is made between the owners\' business and their private affairs. The capital of a business is owed to the owners.</p>' },
              { type: 'concept', variant: 'green', title: 'Money Measurement', html: '<p>Only items that can be expressed in <strong>monetary terms</strong> are recorded. Items such as staff morale, management quality, or market reputation are not included.</p>' },
              { type: 'concept', variant: 'amber', title: 'Materiality', html: '<p>Some items may be too small to be regarded as materially significant. The size of the expense or gain is considered relative to profits. As a general rule, an item is material if it is <strong>greater than 5%</strong> of overall profit.</p>' },
              { type: 'concept', variant: 'blue', title: 'Realisation Principle', html: '<p>Revenue is only recognised when it is <strong>realised</strong> (earned), not when cash is received. A rise in the value of an asset is not recorded as profit until the asset is actually sold.</p>' },
              { type: 'concept', variant: 'green', title: 'Double Entry Principle', html: '<p>The basic principle that for every <strong>debit</strong> there is a corresponding <strong>credit</strong>. If a business purchases a delivery van on credit, the asset is increased (debit) and a liability is created (credit).</p>' },
              { type: 'concept', variant: 'amber', title: 'Period of Account & Objectivity', html: '<p><strong>Period of account:</strong> The length of one accounting period should be consistent with the next. Most businesses prepare accounts annually.</p><p><strong>Objectivity:</strong> Accounts are prepared without any personal bias — all figures should be independently backed up with documents.</p>' },
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
              { term: 'Accounting Base', definition: 'The different ways in which items can be treated — the methods available for applying a concept.' },
              { term: 'Accounting Policy', definition: 'The specific base/method a business decides to use — explained in the notes to the accounts.' },
            ],
            body: [
              { type: 'prose', html: '<p>There are a number of different procedures for preparing accounts. These vary from firm to firm.</p>' },
              { type: 'concept', variant: 'blue', title: 'Accounting Bases', html: '<p>The different ways in which items can be treated are known as <strong>accounting bases</strong>. For example, a company may depreciate fixed assets by either the straight line method or the reducing balance method — these are both accounting bases.</p>' },
              { type: 'concept', variant: 'green', title: 'Accounting Policies', html: '<p>When a business decides which base to use, this becomes the <strong>accounting policy</strong> of the firm. These are usually explained in the notes to the accounts. These explanations should be clear, fair and as brief as possible.</p><p>Other areas where an accounting policy must be chosen include: the method of stock valuation, and the use of historical cost convention.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Term</th><th>Definition</th><th>Example</th></tr></thead><tbody><tr><td><strong>Concept</strong></td><td>Fundamental assumption</td><td>Going Concern</td></tr><tr><td><strong>Base</strong></td><td>Method of applying a concept</td><td>Straight-line depreciation</td></tr><tr><td><strong>Policy</strong></td><td>Specific rule adopted by a firm</td><td>"We use reducing balance at 20%"</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Theory is becoming more important in the Accounting exam. Theory needs to be learnt well, revised and applied throughout the syllabus.</p>' },
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
        id: '2.1', title: 'Part A: Basic Record-Keeping',
        subTopics: [
          {
            id: '2.1.1', title: 'Double-Entry Bookkeeping',
            keyTerms: [
              { term: 'Double-Entry', definition: 'For every debit entry there must be a corresponding credit entry — there must always be a receiver and a giver.' },
              { term: 'Asset', definition: 'An item that the business owns.' },
              { term: 'Liability', definition: 'An item that the business owes.' },
              { term: 'Capital', definition: 'The amount invested by the owner(s) and therefore owed to them.' },
              { term: 'Debtor', definition: 'Someone to whom the business has sold goods on credit.' },
              { term: 'Creditor', definition: 'Someone from whom the business has bought goods on credit.' },
            ],
            body: [
              { type: 'prose', html: '<p>The basic principle of double-entry bookkeeping is that for every <strong>debit</strong> entry there must be a corresponding <strong>credit</strong> entry. In other words, there must always be a <strong>receiver</strong> and a <strong>giver</strong>.</p>' },
              { type: 'concept', variant: 'green', title: 'The Golden Rule', html: '<p><strong>Debit the receiver, Credit the giver</strong></p><p>When all recording is completed, the total of all debits must equal the total of all credits.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Account Type</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr></thead><tbody><tr><td>Assets</td><td>Increase ↑</td><td>Decrease ↓</td></tr><tr><td>Liabilities</td><td>Decrease ↓</td><td>Increase ↑</td></tr><tr><td>Capital</td><td>Decrease ↓</td><td>Increase ↑</td></tr><tr><td>Expenses</td><td>Increase ↑</td><td>Decrease ↓</td></tr><tr><td>Income/Revenue</td><td>Decrease ↓</td><td>Increase ↑</td></tr></tbody></table>' },
              { type: 'concept', variant: 'amber', title: 'Memory Aid — DEAD CLIC', html: '<p><strong>D</strong>ebits: <strong>E</strong>xpenses, <strong>A</strong>ssets, <strong>D</strong>rawings.<br/><strong>C</strong>redits: <strong>L</strong>iabilities, <strong>I</strong>ncome, <strong>C</strong>apital.</p>' },
            ]
          },
          {
            id: '2.1.2', title: 'Books of First Entry & Ledgers',
            keyTerms: [
              { term: 'Books of First Entry (Day Books)', definition: 'The books where credit transactions are first recorded before being posted to the ledgers.' },
              { term: 'General Journal', definition: 'The book of first entry for unusual transactions which require an explanation.' },
              { term: 'Imprest System', definition: 'The petty cash system where the petty cashier begins each period with the same amount (float) and the amount spent is reimbursed.' },
            ],
            body: [
              { type: 'prose', html: '<p>There are four main books of first entry used for <strong>credit</strong> transactions:</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Book</th><th>Contents</th><th>Source Document</th><th>Posting Rules</th></tr></thead><tbody><tr><td><strong>Purchases Book (PDB)</strong></td><td>Goods for resale bought on credit</td><td>Invoices received</td><td>Dr Purchases, Cr Supplier</td></tr><tr><td><strong>Purchases Returns (PRDB)</strong></td><td>Goods returned to suppliers</td><td>Credit notes received</td><td>Dr Supplier, Cr Purch. Returns</td></tr><tr><td><strong>Sales Book (SDB)</strong></td><td>Goods sold on credit</td><td>Copies of invoices sent</td><td>Dr Customer, Cr Sales</td></tr><tr><td><strong>Sales Returns (SRDB)</strong></td><td>Goods returned by customers</td><td>Copies of credit notes sent</td><td>Dr Sales Returns, Cr Customer</td></tr></tbody></table>' },
              { type: 'concept', variant: 'blue', title: 'The Three Ledgers', html: '<p><strong>Debtors Ledger (DL)</strong> — personal accounts for each debtor/customer.</p><p><strong>Creditors Ledger (CL)</strong> — personal accounts for each creditor/supplier.</p><p><strong>General Ledger (GL)</strong> — records about things (purchases, sales, expenses, assets) rather than people.</p>' },
              { type: 'concept', variant: 'green', title: 'The General Journal', html: '<p>Used for unusual transactions requiring an explanation: opening entries, correction of errors, drawings of stock, purchase/sale of fixed assets on credit, and other items that cannot be entered in other books of first entry.</p>' },
              { type: 'concept', variant: 'amber', title: 'Petty Cash — Imprest System', html: '<p>The petty cash book records small day-to-day expenses on a cash-only basis. Under the <strong>imprest system</strong>, the petty cashier begins each week/month with the same float. The amount spent is reimbursed at the end of the period.</p>' },
            ]
          },
          {
            id: '2.1.3', title: 'VAT (Value Added Tax)',
            keyTerms: [
              { term: 'VAT', definition: 'A tax on the supply of goods and services collected at each stage of production and distribution, eventually borne by the final consumer.' },
              { term: 'Output VAT', definition: 'VAT charged on sales.' },
              { term: 'Input VAT', definition: 'VAT paid on purchases.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'How VAT Works', html: '<p>Under SSAP 5, VAT is a tax on the supply of goods and services collected at each stage of the production and distribution chain but eventually borne by the final consumer. VAT is <strong>not</strong> an expense or income to the business.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Organisation</th><th>Treatment of VAT</th></tr></thead><tbody><tr><td><strong>Taxable companies</strong></td><td>Add VAT onto sales, pay VAT on purchases. Difference sent to Collector General.</td></tr><tr><td><strong>Exempt companies</strong></td><td>Do not charge VAT on sales. Do not receive refund on purchases.</td></tr><tr><td><strong>Zero-rated companies</strong></td><td>Do not charge VAT to customers. Can reclaim VAT on purchases.</td></tr></tbody></table>' },
              { type: 'concept', variant: 'amber', title: 'VAT in the Accounts', html: '<p>If VAT is paid and <strong>reclaimable</strong> — items shown <strong>net</strong> of VAT.</p><p>If VAT is paid and <strong>not reclaimable</strong> — items shown <strong>inclusive</strong> of VAT.</p><p>The VAT account appears as a current liability (credit balance) or current asset (debit balance) on the Balance Sheet.</p>' },
            ]
          },
          {
            id: '2.1.4', title: 'The Trial Balance & Final Accounts',
            body: [
              { type: 'concept', variant: 'blue', title: 'The Trial Balance', html: '<p>The trial balance is <strong>not</strong> part of the double-entry system. It is a check on the accuracy of the system. It is a list of all ledger account balances (debit and credit) at a given moment. If total debits do not equal total credits, an error has been made.</p>' },
              { type: 'watchout', title: 'Not All Errors Revealed', html: '<p>A trial balance that balances does NOT prove that no errors exist. Errors of omission, commission, principle, original entry, compensating errors, and complete reversal will NOT be detected.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Final Account</th><th>Purpose</th></tr></thead><tbody><tr><td><strong>Trading, Profit & Loss Account</strong></td><td>Shows profit or loss for the period. Contains all revenue receipts and expenditure.</td></tr><tr><td><strong>Balance Sheet</strong></td><td>Sets out the balances in ledger accounts at the end of the accounting period.</td></tr><tr><td><strong>Cash Flow Statement</strong></td><td>Sets out cash inflows and outflows. Cash is not always equal to profit.</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '2.2', title: 'Part B: Capital & Revenue',
        subTopics: [
          {
            id: '2.2.1', title: 'Capital vs Revenue Expenditure',
            keyTerms: [
              { term: 'Capital Expenditure', definition: 'Money spent on acquiring or improving fixed assets. Recorded on the Balance Sheet.' },
              { term: 'Revenue Expenditure', definition: 'Day-to-day running costs. Recorded in the Profit and Loss Account.' },
              { term: 'Capital Receipts', definition: 'Money received from selling fixed assets or from the introduction of new capital.' },
              { term: 'Revenue Receipts', definition: 'Money received from the day-to-day trading activities of the business (sales, fees, commissions).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Capital vs Revenue Expenditure', html: '<p><strong>Capital expenditure</strong> is money spent on acquiring, improving, or adding to fixed assets. It gives benefit over <strong>several accounting periods</strong> and appears on the <strong>Balance Sheet</strong>.</p><p><strong>Revenue expenditure</strong> is money spent on the day-to-day running of the business. It gives benefit in the <strong>current period only</strong> and is recorded in the <strong>Profit and Loss Account</strong>.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Capital Expenditure</th><th>Revenue Expenditure</th></tr></thead><tbody><tr><td>Purchase of premises</td><td>Rent of premises</td></tr><tr><td>Purchase of delivery van</td><td>Petrol & maintenance for van</td></tr><tr><td>Installation costs of machinery</td><td>Repairs to machinery</td></tr><tr><td>Extension to building</td><td>Painting & redecorating</td></tr><tr><td>Legal fees on property purchase</td><td>Legal fees for debt recovery</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Important Distinction', html: '<p>If capital expenditure is <strong>incorrectly</strong> treated as revenue expenditure: profits will be <strong>understated</strong> and fixed assets will be <strong>understated</strong>.</p><p>If revenue expenditure is incorrectly treated as capital expenditure: profits will be <strong>overstated</strong> and fixed assets will be <strong>overstated</strong>.</p>' },
            ]
          },
        ]
      },
      {
        id: '2.3', title: 'Part C: Statutory Deductions',
        subTopics: [
          {
            id: '2.3.1', title: 'PAYE, PRSI & USC',
            keyTerms: [
              { term: 'PAYE', definition: 'Pay As You Earn — income tax deducted from employees\' wages/salaries by the employer and paid to Revenue.' },
              { term: 'PRSI', definition: 'Pay Related Social Insurance — a social insurance contribution deducted from employees and also contributed by employers.' },
              { term: 'USC', definition: 'Universal Social Charge — an additional tax on gross income.' },
              { term: 'Gross Pay', definition: 'Total pay before any deductions.' },
              { term: 'Net Pay', definition: 'The amount the employee actually receives after all deductions.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Wage Deductions', html: '<p>When an employer pays wages, they must deduct <strong>PAYE</strong>, <strong>PRSI</strong> (employee\'s share), and <strong>USC</strong> from the employee\'s gross pay. These are paid to Revenue on behalf of the employee.</p><p>The employer also pays <strong>employer\'s PRSI</strong> — this is an additional business expense.</p>' },
              { type: 'concept', variant: 'green', title: 'Accounting Treatment', html: '<p><strong>Gross wages/salaries</strong> — charged as an expense in the P&L Account.</p><p><strong>Employer\'s PRSI</strong> — a separate expense in the P&L Account.</p><p><strong>PAYE/PRSI/USC owed</strong> — if not yet paid to Revenue at year end, shown as a <strong>current liability</strong> on the Balance Sheet.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Deduction</th><th>Paid By</th><th>To Whom</th></tr></thead><tbody><tr><td>PAYE</td><td>Employee (via employer)</td><td>Revenue Commissioners</td></tr><tr><td>Employee PRSI</td><td>Employee (via employer)</td><td>Revenue Commissioners</td></tr><tr><td>Employer PRSI</td><td>Employer</td><td>Revenue Commissioners</td></tr><tr><td>USC</td><td>Employee (via employer)</td><td>Revenue Commissioners</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '2.4', title: 'Part D: Accruals & Prepayments',
        subTopics: [
          {
            id: '2.4.1', title: 'Accruals & Prepayments',
            keyTerms: [
              { term: 'Accrual (Accrued Expense)', definition: 'An expense that has been incurred but not yet paid at the end of the accounting period.' },
              { term: 'Prepayment (Prepaid Expense)', definition: 'An expense that has been paid in advance — part of the payment relates to the next accounting period.' },
              { term: 'Income Accrued', definition: 'Income that has been earned but not yet received.' },
              { term: 'Income Prepaid (Deferred Income)', definition: 'Income received in advance for services not yet provided.' },
            ],
            body: [
              { type: 'prose', html: '<p>Under the <strong>accruals/matching concept</strong>, all income earned and expenses incurred during the period must be included in the accounts — regardless of whether they have been received/paid.</p>' },
              { type: 'concept', variant: 'blue', title: 'Accrued Expenses', html: '<p>An expense has been <strong>incurred</strong> but not yet <strong>paid</strong>. The expense in the P&L must be <strong>increased</strong>. The accrual appears as a <strong>current liability</strong> on the Balance Sheet.</p><p>Example: Electricity bill for December arrives in January — the December charge must be accrued.</p>' },
              { type: 'concept', variant: 'green', title: 'Prepaid Expenses', html: '<p>An expense has been <strong>paid</strong> but part of it relates to the <strong>next</strong> period. The expense in the P&L must be <strong>reduced</strong>. The prepayment appears as a <strong>current asset</strong> on the Balance Sheet.</p><p>Example: Insurance paid for 15 months — 3 months\' worth is prepaid.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Type</th><th>P&L Effect</th><th>Balance Sheet</th></tr></thead><tbody><tr><td>Accrued expense</td><td>Add to expense</td><td>Current liability</td></tr><tr><td>Prepaid expense</td><td>Deduct from expense</td><td>Current asset</td></tr><tr><td>Income accrued</td><td>Add to income</td><td>Current asset (debtor)</td></tr><tr><td>Income prepaid</td><td>Deduct from income</td><td>Current liability</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>In Q1, always check if expenses given in the trial balance need to be adjusted for accruals or prepayments. Read the additional information carefully.</p>' },
            ]
          },
        ]
      },
      {
        id: '2.5', title: 'Part E: Bad Debts & Provision for Bad Debts',
        subTopics: [
          {
            id: '2.5.1', title: 'Bad Debts & Provisions',
            keyTerms: [
              { term: 'Bad Debt', definition: 'An expense/cost to a business when a credit customer fails to pay the amount due. Written off as an expense in the P&L.' },
              { term: 'Provision for Bad Debts', definition: 'An estimated amount set aside (under the prudence concept) for debts that may become bad. Usually a percentage of debtors.' },
              { term: 'Bad Debts Recovered', definition: 'When a debtor previously written off as bad subsequently pays. Treated as income in the P&L.' },
            ],
            body: [
              { type: 'concept', variant: 'red', title: 'Bad Debts', html: '<p>A debt that is definitely <strong>not recoverable</strong>. Written off as an <strong>expense</strong> (selling and distribution) in the P&L Account. The debtor\'s balance is reduced.</p>' },
              { type: 'concept', variant: 'amber', title: 'Provision for Bad Debts', html: '<p>Under the <strong>prudence concept</strong>, a business may create a provision for debts that <strong>may</strong> become bad. Usually calculated as a percentage of debtors (after writing off actual bad debts).</p><p><strong>Only the increase or decrease</strong> in the provision affects the P&L:</p><p>Increase → expense in P&L (selling & distribution)<br/>Decrease → income in P&L (other income)</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Situation</th><th>P&L Treatment</th><th>Balance Sheet</th></tr></thead><tbody><tr><td>Actual bad debt (in TB)</td><td>Selling & distribution expense</td><td>No entry</td></tr><tr><td>Actual bad debt (additional info)</td><td>Selling & distribution expense</td><td>Reduce debtors</td></tr><tr><td>New provision created</td><td>Selling & distribution expense</td><td>Deduct from debtors</td></tr><tr><td>Increase in provision</td><td>Expense (increase only)</td><td>Deduct new provision</td></tr><tr><td>Decrease in provision</td><td>Other income (decrease only)</td><td>Deduct new provision</td></tr><tr><td>No change</td><td>No effect</td><td>Deduct existing provision</td></tr></tbody></table>' },
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
    estimatedMinutes: 15,
    related: [2, 5],
    sections: [
      {
        id: '3.1', title: 'Purpose & Reasons for Differences',
        subTopics: [
          {
            id: '3.1.1', title: 'Purpose of Bank Reconciliation',
            keyTerms: [
              { term: 'Bank Reconciliation Statement', definition: 'A statement that reconciles the different balances in the bank statement and the business\'s bank account.' },
              { term: 'Bank Statement', definition: 'A statement sent by the bank showing all transactions recorded in the current account.' },
            ],
            body: [
              { type: 'prose', html: '<p>When a bank statement arrives it should be compared with the business\'s own bank account. Both balances should agree if the same transactions are recorded in both. However, they are usually different — hence the need for a <strong>bank reconciliation statement</strong>.</p>' },
              { type: 'concept', variant: 'blue', title: 'Reasons for Differences', html: '<p><strong>1. Time delays (lags):</strong> Lodgements not yet credited, cheques not yet presented, direct payments not yet recorded by the business.</p><p><strong>2. Unknown entries:</strong> Dishonoured cheques, bank charges, bank interest, standing orders, direct debits, credit transfers.</p><p><strong>3. Errors:</strong> Calculation errors, incorrect amounts, entries on wrong side or in wrong account.</p>' },
            ]
          },
          {
            id: '3.1.2', title: 'Procedure for Preparation',
            body: [
              { type: 'concept', variant: 'green', title: 'Steps', html: '<p>1. Compare Dr side of bank account with Cr side of bank statement. Tick common items.</p><p>2. Compare Cr side of bank account with Dr side of bank statement. Tick common items.</p><p>3. Prepare <strong>Adjusted Bank Account</strong> — enter unticked items from the statement.</p><p>4. Correct any errors made by the business.</p><p>5. Prepare the <strong>Bank Reconciliation Statement</strong>.</p>' },
              { type: 'concept', variant: 'amber', title: 'Reconciliation Format', html: '<p>Balance as per bank statement<br/><strong>Add:</strong> Lodgements not yet credited, bank debit errors<br/><strong>Less:</strong> Cheques not yet presented, bank credit errors<br/>= Balance as per adjusted bank account</p>' },
              { type: 'watchout', title: 'Important', html: '<p>Errors made by the <strong>bank</strong> (even though unticked) should NOT be entered in the adjusted bank account — they go in the reconciliation statement only.</p>' },
            ]
          },
        ]
      },
      {
        id: '3.2', title: 'Adjusted Bank Account',
        subTopics: [
          {
            id: '3.2.1', title: 'Preparing the Adjusted Bank Account',
            body: [
              { type: 'concept', variant: 'blue', title: 'What Goes in the Adjusted Bank Account?', html: '<p>The adjusted bank account records items from the <strong>bank statement</strong> that have <strong>not yet</strong> been recorded in the business\'s bank account. These are items the business didn\'t know about until the statement arrived:</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Debit Side (Receipts)</th><th>Credit Side (Payments)</th></tr></thead><tbody><tr><td>Credit transfers received</td><td>Standing orders</td></tr><tr><td>Direct credits</td><td>Direct debits</td></tr><tr><td>Interest received</td><td>Bank charges</td></tr><tr><td>Correction of business errors (if originally overcredited)</td><td>Dishonoured cheques</td></tr><tr><td></td><td>Interest charged</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Credit vs Debit Balance', html: '<p>If the adjusted bank account shows a <strong>debit balance</strong> — the business has money in the bank (current asset).</p><p>If it shows a <strong>credit balance</strong> — the business has a bank <strong>overdraft</strong> (current liability).</p>' },
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
    estimatedMinutes: 22,
    related: [2, 6, 9, 11],
    sections: [
      {
        id: '4.1', title: 'Part A: Depreciation Methods',
        subTopics: [
          {
            id: '4.1.1', title: 'Why Depreciate & Methods',
            keyTerms: [
              { term: 'Depreciation', definition: 'The systematic allocation of the cost of a fixed asset over its useful economic life.' },
              { term: 'Straight-Line Method', definition: 'Annual Depreciation = (Cost − Residual Value) ÷ Useful Life. Same amount each year.' },
              { term: 'Reducing Balance Method', definition: 'Annual Depreciation = Net Book Value × Rate%. Charge reduces each year.' },
              { term: 'Net Book Value (NBV)', definition: 'Cost minus accumulated depreciation to date.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Depreciate?', html: '<p>Fixed assets lose value over time due to <strong>wear and tear</strong>, <strong>passage of time</strong>, and <strong>obsolescence</strong>. Depreciation spreads the cost of an asset over its useful life (the <strong>matching/accruals concept</strong>).</p>' },
              { type: 'concept', variant: 'green', title: 'Straight-Line Method', html: '<p><strong>Annual Depreciation = (Cost − Residual Value) ÷ Useful Life</strong></p><p>Or: Cost × Rate%</p><p>The same amount is charged each year. Simple to calculate.</p>' },
              { type: 'concept', variant: 'amber', title: 'Reducing Balance Method', html: '<p><strong>Annual Depreciation = Net Book Value × Rate%</strong></p><p>NBV = Cost − Accumulated Depreciation to date.</p><p>The charge reduces each year as the NBV falls. More realistic for assets that lose value quickly early on (e.g. vehicles).</p>' },
              { type: 'example', title: 'Reducing Balance @ 20%', html: '<table class="learn-table"><thead><tr><th>Year</th><th>NBV Start</th><th>Depreciation</th><th>NBV End</th></tr></thead><tbody><tr><td>1</td><td>40,000</td><td>8,000</td><td>32,000</td></tr><tr><td>2</td><td>32,000</td><td>6,400</td><td>25,600</td></tr><tr><td>3</td><td>25,600</td><td>5,120</td><td>20,480</td></tr></tbody></table>' },
            ]
          },
          {
            id: '4.1.2', title: 'The Accounts & Scrap Value',
            keyTerms: [
              { term: 'Scrap Value (Residual Value)', definition: 'The estimated value of the asset at the end of its useful life.' },
              { term: 'Provision for Depreciation Account', definition: 'A separate account that accumulates depreciation charged over the life of the asset.' },
            ],
            body: [
              { type: 'prose', html: '<p>When recording depreciation, we keep the asset at <strong>cost</strong> in the asset account and record accumulated depreciation in a separate <strong>Provision for Depreciation</strong> account.</p>' },
              { type: 'concept', variant: 'green', title: 'Journal Entry for Depreciation', html: '<p><strong>Dr</strong> Profit and Loss Account (expense)<br/><strong>Cr</strong> Provision for Depreciation Account</p><p>On the Balance Sheet: Cost − Accumulated Depreciation = Net Book Value.</p>' },
            ]
          },
        ]
      },
      {
        id: '4.2', title: 'Part B: Disposal & Revaluation',
        subTopics: [
          {
            id: '4.2.1', title: 'Disposal of Fixed Assets',
            body: [
              { type: 'concept', variant: 'green', title: 'Steps for Disposal', html: '<p>1. Remove the asset from the <strong>Asset Account</strong> (credit cost)<br/>2. Remove accumulated depreciation from the <strong>Provision for Depreciation Account</strong> (debit)<br/>3. Record sale proceeds in the <strong>Disposal Account</strong><br/>4. Calculate profit/loss: <strong>Proceeds − Net Book Value</strong></p>' },
              { type: 'example', title: 'Disposal Example', html: '<p>Vehicle cost €20,000, accumulated depreciation €12,500, sold for €7,000:</p><p>NBV = €20,000 − €12,500 = €7,500. Sold for €7,000. <strong>Loss = €500</strong>.</p>' },
              { type: 'watchout', title: 'Part-Year Depreciation', html: '<p>If an asset is bought or sold <strong>during the year</strong>, depreciation is calculated proportionally. E.g. asset bought 1/4 = 9/12 of a full year\'s depreciation.</p>' },
            ]
          },
          {
            id: '4.2.2', title: 'Revaluation of Fixed Assets',
            keyTerms: [
              { term: 'Revaluation', definition: 'When a fixed asset is revalued (usually upwards) to reflect its current market value.' },
              { term: 'Revaluation Reserve', definition: 'The credit entry when an asset is revalued upwards — shown in the Capital & Reserves section of the Balance Sheet.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Revaluation Upwards', html: '<p>When an asset increases in value: <strong>Dr</strong> Asset Account (with the increase), <strong>Cr</strong> Revaluation Reserve.</p><p>The revaluation reserve is shown in the Capital & Reserves section of the Balance Sheet. Future depreciation is based on the <strong>new revalued amount</strong>.</p>' },
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
    estimatedMinutes: 14,
    related: [2, 3, 7],
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
              { type: 'concept', variant: 'blue', title: 'What is a Control Account?', html: '<p>A control account is a <strong>summary account</strong> in the general ledger. It records totals from the day books and cash book. The balance should equal the total of all individual account balances in the relevant personal ledger.</p>' },
              { type: 'concept', variant: 'green', title: 'Debtors Control Account', html: '<p><strong>Debit side:</strong> Opening balance, Credit sales, Dishonoured cheques, Interest charged.</p><p><strong>Credit side:</strong> Cash/cheques received, Sales returns, Bad debts written off, Discount allowed, Closing balance.</p>' },
              { type: 'concept', variant: 'amber', title: 'Creditors Control Account', html: '<p><strong>Debit side:</strong> Cash/cheques paid, Purchase returns, Discount received, Closing balance.</p><p><strong>Credit side:</strong> Opening balance, Credit purchases.</p>' },
              { type: 'examtip', title: 'HL Requirement', html: '<p>At Higher Level, you must also be able to prepare a <strong>schedule (list) of debtors/creditors</strong> — a list showing each individual balance that adds up to the control account total.</p>' },
            ]
          },
        ]
      },
      {
        id: '5.2', title: 'Contra Entries & Set-Offs',
        subTopics: [
          {
            id: '5.2.1', title: 'Set-Off (Contra Entry)',
            keyTerms: [
              { term: 'Contra Entry (Set-Off)', definition: 'When a person is both a debtor and a creditor, the smaller balance is set off against the larger, leaving only the net amount.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Contra Entries', html: '<p>If a person is both a <strong>debtor</strong> and a <strong>creditor</strong> of the business, a set-off (contra) can be made. The smaller balance is cancelled against the larger balance.</p><p><strong>Journal entry:</strong> Dr Creditors Control Account, Cr Debtors Control Account (with the smaller balance).</p>' },
              { type: 'example', title: 'Example', html: '<p>Murphy owes the business €500 (debtor) but the business owes Murphy €200 (creditor). Set off €200:</p><p>Dr Creditors Control €200, Cr Debtors Control €200. Murphy now owes only €300.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK B — FINAL ACCOUNTS & ERRORS (Chapters 6-12)
  // ──────────────────────────────────────────────────
  {
    id: 6, block: 'B',
    title: 'Final Accounts — Sole Trader',
    description: 'Trading, Profit & Loss Account, Balance Sheet, basic and advanced adjustments.',
    estimatedMinutes: 35,
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
              { type: 'concept', variant: 'blue', title: 'Profit and Loss Account — Net Profit', html: '<p>Gross Profit + Other Income (discount received, reduction in provision, profit on disposal, rent receivable) − Expenses = <strong>Net Profit</strong></p><p>Expenses are usually classified into: <strong>selling & distribution</strong> (advertising, bad debts, carriage outwards, increase in provision), and <strong>administration</strong> (wages, rent, insurance, depreciation, light & heat).</p>' },
              { type: 'concept', variant: 'amber', title: 'Balance Sheet Structure', html: '<p><strong>Fixed Assets</strong> (at cost less accumulated depreciation = NBV)<br/>+ <strong>Current Assets</strong> (closing stock, debtors less provision, prepayments, bank, cash)<br/>− <strong>Current Liabilities</strong> (creditors, accruals, bank overdraft, PAYE/PRSI due)<br/>= <strong>Net Current Assets (Working Capital)</strong><br/>= <strong>Total Net Assets</strong></p><p>Financed by: Opening Capital + Net Profit − Drawings = <strong>Closing Capital</strong></p>' },
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
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Investment Income', html: '<p>Investment income (dividends received, interest on government stock) is treated as <strong>other income</strong> in the P&L Account. The investment itself is a <strong>fixed asset</strong> (if long-term) or <strong>current asset</strong> (if short-term) on the Balance Sheet.</p>' },
              { type: 'concept', variant: 'green', title: 'Interest on Investments', html: '<p>If the exam says interest was received "net of DIRT at 33%", you must <strong>gross up</strong> the interest:</p><p>Gross Interest = Net Interest / (1 − DIRT rate) = Net / 0.67</p><p>The gross amount goes to the P&L. The DIRT portion is treated as an expense or added to the tax liability.</p>' },
            ]
          },
          {
            id: '6.3.2', title: 'Goods on Sale or Return',
            keyTerms: [
              { term: 'Sale or Return', definition: 'Goods sent to a customer on a trial basis — they remain the property of the seller until accepted by the customer.' },
            ],
            body: [
              { type: 'concept', variant: 'amber', title: 'Sale or Return Treatment', html: '<p>If goods are sent on <strong>sale or return</strong> and have NOT been accepted by the customer at the year end:</p><p>1. <strong>Reduce sales</strong> by the selling price of the unsold goods.</p><p>2. <strong>Reduce debtors</strong> by the selling price.</p><p>3. <strong>Add the cost price</strong> to closing stock.</p><p>The goods still belong to the business until accepted.</p>' },
              { type: 'watchout', title: 'Finding Cost Price', html: '<p>If selling price is given and mark-up is known: Cost = Selling Price / (1 + Mark-up rate).</p><p>If margin is known: Cost = Selling Price × (1 − Margin rate).</p>' },
            ]
          },
          {
            id: '6.3.3', title: 'Debenture Interest & Loan Interest',
            body: [
              { type: 'concept', variant: 'blue', title: 'Debenture Interest', html: '<p>Debenture interest is an <strong>expense</strong> charged in the P&L (not in the appropriation account). It must be paid regardless of profit.</p><p>If the full year\'s interest has not been paid: accrue the balance owed as a <strong>current liability</strong>.</p><p>If more than a year\'s interest has been paid: the overpayment is a <strong>prepayment</strong> (current asset).</p>' },
            ]
          },
          {
            id: '6.3.4', title: 'Patents, Goodwill & Intangible Assets',
            keyTerms: [
              { term: 'Patent', definition: 'An exclusive right granted for an invention — gives the holder the sole right to manufacture/sell for a set period.' },
              { term: 'Goodwill', definition: 'The value of the reputation, customer loyalty, and trading connections of a business — an intangible fixed asset.' },
              { term: 'Amortisation', definition: 'The process of writing off the cost of an intangible asset over its useful life — similar to depreciation for tangible assets.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Intangible Assets', html: '<p>Intangible assets include <strong>patents</strong>, <strong>goodwill</strong>, <strong>trademarks</strong>, and <strong>development costs</strong>. They are shown as fixed assets on the Balance Sheet and are <strong>amortised</strong> (written off) over their useful economic life.</p>' },
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
              { type: 'concept', variant: 'red', title: 'Six Errors NOT Revealed by the Trial Balance', html: '<table class="learn-table"><tbody><tr><td><strong>Omission</strong></td><td>Transaction completely left out — not recorded at all. Both debit and credit missing.</td></tr><tr><td><strong>Commission</strong></td><td>Right amount, right type of account, wrong person. E.g. posted to Murphy\'s account instead of Moran\'s.</td></tr><tr><td><strong>Principle</strong></td><td>Wrong class of account. E.g. purchase of van (asset) recorded as motor expenses (expense).</td></tr><tr><td><strong>Original Entry</strong></td><td>Wrong amount on both sides. E.g. €560 recorded as €650 on both debit and credit.</td></tr><tr><td><strong>Compensating</strong></td><td>Two errors of equal amount cancel each other out. E.g. sales overstated by €100, purchases overstated by €100.</td></tr><tr><td><strong>Complete Reversal</strong></td><td>Correct accounts, correct amount, but debit and credit are swapped.</td></tr></tbody></table>' },
              { type: 'watchout', title: 'Key Point', html: '<p>These six errors do <strong>NOT</strong> create a suspense account because total debits still equal total credits. They do NOT affect the trial balance.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'When is a Suspense Account Used?', html: '<p>When the trial balance does not balance, the difference is placed in a <strong>Suspense Account</strong>. As each error is found and corrected via journal entries, the suspense account balance is reduced until it reaches <strong>zero</strong>.</p>' },
              { type: 'concept', variant: 'green', title: 'Four-Step Correction Method', html: '<p>For each error:</p><p>1. <strong>What was done?</strong> — Write the incorrect entry.</p><p>2. <strong>What should have been done?</strong> — Write the correct entry.</p><p>3. <strong>Write the correcting journal entry</strong> — to fix the error.</p><p>4. <strong>Does it involve the Suspense Account?</strong> — Only if the trial balance was affected.</p>' },
            ]
          },
          {
            id: '7.2.2', title: 'Journal Entry Examples',
            body: [
              { type: 'example', title: 'Error of Principle', html: '<p>Purchase of equipment (€2,000) recorded as purchases.</p><p><strong>Wrong:</strong> Dr Purchases €2,000, Cr Bank €2,000</p><p><strong>Should be:</strong> Dr Equipment €2,000, Cr Bank €2,000</p><p><strong>Correction:</strong> Dr Equipment €2,000, Cr Purchases €2,000</p><p>No suspense involved — TB still balanced.</p>' },
              { type: 'example', title: 'Single-Sided Entry', html: '<p>Sales of €500 credited to Sales but not debited to the customer.</p><p><strong>Wrong:</strong> Cr Sales €500 only</p><p><strong>Should be:</strong> Dr Debtor €500, Cr Sales €500</p><p><strong>Correction:</strong> Dr Debtor €500, Cr Suspense €500</p>' },
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
              { type: 'concept', variant: 'green', title: 'Statement of Revised Profit', html: '<p>After correcting errors, some corrections affect the <strong>Profit and Loss Account</strong>. A statement must be prepared showing:</p><p>Original Net Profit<br/>Add: Items that <strong>increase</strong> profit (overcharged expenses, understated income)<br/>Less: Items that <strong>decrease</strong> profit (undercharged expenses, overstated income)<br/>= <strong>Revised Net Profit</strong></p>' },
              { type: 'watchout', title: 'Which Corrections Affect Profit?', html: '<p>Only corrections that change a <strong>P&L item</strong> (income or expense) affect the revised profit.</p><p>Corrections involving only <strong>Balance Sheet items</strong> (e.g. debtor posted to wrong debtor) do NOT affect profit.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>After the Statement of Revised Profit, you may also need to prepare a <strong>Corrected Balance Sheet</strong>. Remember to use the revised profit figure in the capital section.</p>' },
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
    estimatedMinutes: 15,
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
              { type: 'concept', variant: 'amber', title: 'Consequences of Non-Compliance', html: '<p>Directors who fail to keep proper books of account may be:</p><p>1. <strong>Personally liable</strong> for company debts.</p><p>2. Subject to <strong>fines</strong> and <strong>imprisonment</strong>.</p><p>3. <strong>Restricted or disqualified</strong> from acting as directors.</p>' },
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
              { term: 'CRO', definition: 'Companies Registration Office — registers companies and receives annual returns and financial statements.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Body</th><th>Role</th></tr></thead><tbody><tr><td><strong>Financial Reporting Council (FRC)</strong></td><td>Sets accounting standards (FRS 102) and auditing standards for UK and Ireland.</td></tr><tr><td><strong>IAASA</strong></td><td>Oversees the regulation of auditors and accountants in Ireland. Supervises professional bodies.</td></tr><tr><td><strong>Chartered Accountants Ireland (CAI)</strong></td><td>Professional body — sets ethical and professional standards for chartered accountants.</td></tr><tr><td><strong>CPA Ireland</strong></td><td>Professional body for certified public accountants.</td></tr><tr><td><strong>Revenue Commissioners</strong></td><td>Collects taxes. Companies must file tax returns based on financial statements.</td></tr><tr><td><strong>CRO</strong></td><td>Companies must file annual returns and financial statements.</td></tr></tbody></table>' },
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
              { term: 'Auditor', definition: 'An independent, qualified accountant appointed to examine and report on the financial statements.' },
              { term: 'Unqualified Audit Report', definition: 'A clean report — the auditor is satisfied the accounts give a true and fair view.' },
              { term: 'Qualified Audit Report', definition: 'The auditor has reservations about certain aspects of the accounts.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'What is an Audit?', html: '<p>An <strong>audit</strong> is an independent examination of financial statements by a qualified auditor. The auditor forms an opinion on whether the accounts give a <strong>true and fair view</strong> and comply with the Companies Act and applicable accounting standards.</p>' },
              { type: 'concept', variant: 'green', title: 'Auditor\'s Responsibilities', html: '<p>The auditor must:</p><p>1. Be <strong>independent</strong> — not an employee or director.</p><p>2. Examine accounting records, internal controls, and financial statements.</p><p>3. Obtain <strong>sufficient evidence</strong> to support their opinion.</p><p>4. Issue an <strong>audit report</strong> to the shareholders.</p>' },
              { type: 'concept', variant: 'amber', title: 'Types of Audit Report', html: '<p><strong>Unqualified (clean):</strong> The auditor is satisfied the accounts are true and fair.</p><p><strong>Qualified:</strong> The auditor has reservations about specific items (e.g. "except for..."). </p><p><strong>Adverse:</strong> The accounts do NOT give a true and fair view.</p><p><strong>Disclaimer:</strong> The auditor cannot form an opinion due to insufficient evidence.</p>' },
              { type: 'watchout', title: 'Audit vs Accounting', html: '<p>It is the <strong>directors\' responsibility</strong> to prepare the accounts. The <strong>auditor\'s responsibility</strong> is to examine and report on them. The auditor does NOT prepare the accounts.</p>' },
            ]
          },
          {
            id: '8.3.2', title: 'Ethical Standards',
            keyTerms: [
              { term: 'Independence', definition: 'The auditor must be free from any influence that could compromise their objectivity.' },
              { term: 'Confidentiality', definition: 'Auditors must not disclose information obtained during the audit without proper authority.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Ethical Principles for Accountants', html: '<p>Professional accountants must adhere to:</p><p><strong>Integrity</strong> — honest and straightforward in professional work.</p><p><strong>Objectivity</strong> — not influenced by bias or conflict of interest.</p><p><strong>Professional competence</strong> — maintain knowledge and skills.</p><p><strong>Confidentiality</strong> — do not disclose information without authority.</p><p><strong>Professional behaviour</strong> — comply with relevant laws and avoid discrediting the profession.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 9, block: 'B',
    title: 'Company Accounts — Internal Use',
    description: 'Limited companies, sources of finance, appropriation account, difficult adjustments.',
    estimatedMinutes: 40,
    related: [6, 10, 17, 18],
    sections: [
      {
        id: '9.1', title: 'Limited Companies',
        subTopics: [
          {
            id: '9.1.1', title: 'Features of Limited Companies',
            keyTerms: [
              { term: 'Limited Company', definition: 'A separate legal entity from its owners (shareholders). Shareholders have limited liability.' },
              { term: 'Limited Liability', definition: 'Shareholders can only lose the amount they have invested or agreed to invest — personal assets are protected.' },
              { term: 'Separate Legal Entity', definition: 'The company exists in its own right — it can own property, sue, and be sued in its own name.' },
              { term: 'Private Limited Company (Ltd)', definition: 'Shares cannot be offered to the general public. Minimum 1 shareholder, maximum 149.' },
              { term: 'Public Limited Company (PLC)', definition: 'Shares can be offered to the general public and traded on a stock exchange. Minimum 7 shareholders.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Features', html: '<p>A limited company is a <strong>separate legal entity</strong> from its owners. Key features:</p><p>1. <strong>Limited liability</strong> — shareholders can only lose the amount invested.</p><p>2. <strong>Separate legal entity</strong> — the company can own property, sue, and be sued.</p><p>3. <strong>Perpetual succession</strong> — the company continues to exist even if shareholders change.</p><p>4. <strong>Transferability of shares</strong> — shares can be bought and sold.</p><p>5. <strong>Common seal</strong> — the company\'s official signature.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Private Ltd</th><th>Public PLC</th></tr></thead><tbody><tr><td>Minimum shareholders</td><td>1</td><td>7</td></tr><tr><td>Maximum shareholders</td><td>149</td><td>No limit</td></tr><tr><td>Shares traded publicly?</td><td>No</td><td>Yes (stock exchange)</td></tr><tr><td>Prospectus required?</td><td>No</td><td>Yes</td></tr><tr><td>Minimum share capital</td><td>No minimum</td><td>€25,000</td></tr></tbody></table>' },
            ]
          },
          {
            id: '9.1.2', title: 'Sources of Finance',
            keyTerms: [
              { term: 'Authorised Share Capital', definition: 'The maximum amount of share capital a company is authorised to issue as stated in the Memorandum of Association.' },
              { term: 'Issued Share Capital', definition: 'The amount of share capital actually issued to shareholders.' },
              { term: 'Called-Up Share Capital', definition: 'The amount of issued share capital that shareholders have been asked to pay.' },
              { term: 'Ordinary Shares', definition: 'Shares that carry voting rights and receive dividends after preference shareholders. Higher risk but potentially higher return.' },
              { term: 'Preference Shares', definition: 'Shares that receive a fixed rate dividend before ordinary shareholders. Lower risk but limited return. No voting rights.' },
              { term: 'Debentures', definition: 'Long-term loans to the company. Debenture holders are creditors, not owners. Interest must be paid regardless of profit.' },
              { term: 'Share Premium', definition: 'The amount received for shares above their nominal/par value. Shown as a capital reserve.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Source</th><th>Description</th><th>Risk/Return</th></tr></thead><tbody><tr><td><strong>Ordinary shares</strong></td><td>Voting rights, variable dividend, last to be repaid on liquidation</td><td>Highest risk, highest potential return</td></tr><tr><td><strong>Preference shares</strong></td><td>Fixed dividend rate, paid before ordinary, no voting rights</td><td>Lower risk, limited return</td></tr><tr><td><strong>Debentures</strong></td><td>Long-term loans, fixed interest, must be repaid, holders are creditors</td><td>Lowest risk, tax-deductible interest</td></tr><tr><td><strong>Retained profits</strong></td><td>Profits not distributed as dividends</td><td>Cheapest source — no interest or dividends</td></tr><tr><td><strong>Bank loans</strong></td><td>Medium to long-term borrowing</td><td>Interest is an expense</td></tr></tbody></table>' },
              { type: 'concept', variant: 'green', title: 'Share Premium', html: '<p>When shares are issued <strong>above par value</strong> (e.g. €1 shares issued at €1.50), the excess (€0.50) is called <strong>share premium</strong>. It is a <strong>capital reserve</strong> — it cannot be distributed as dividends.</p>' },
              { type: 'concept', variant: 'amber', title: 'Cumulative Preference Shares', html: '<p>If preference shares are <strong>cumulative</strong>, any unpaid dividends from previous years must be paid before ordinary shareholders receive anything. <strong>Arrears</strong> of preference dividends are a note to the accounts, not a liability, until declared.</p>' },
            ]
          },
        ]
      },
      {
        id: '9.2', title: 'The Accounts',
        subTopics: [
          {
            id: '9.2.1', title: 'Appropriation Account',
            keyTerms: [
              { term: 'Appropriation Account', definition: 'Shows how the net profit of a company is distributed — corporation tax, dividends, transfers to reserves, retained profit.' },
              { term: 'Corporation Tax', definition: 'Tax on the profits of a company. An expense in the P&L, and if unpaid, a current liability.' },
              { term: 'Interim Dividend', definition: 'A dividend paid during the financial year (already paid — not a liability at year end).' },
              { term: 'Final Dividend', definition: 'A dividend declared at the end of the financial year (proposed — shown as a current liability).' },
              { term: 'General Reserve', definition: 'A revenue reserve created by transferring retained profits. Can be used for future dividends if needed.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Appropriation Account Layout', html: '<p>Net Profit (from P&L)<br/>Less: Corporation Tax<br/>= <strong>Profit after Tax</strong><br/>Less: Preference Dividend (interim + final)<br/>Less: Ordinary Dividend (interim + final)<br/>Less: Transfer to General Reserve<br/>= <strong>Retained Profit for Year</strong><br/>Add: Balance from last year<br/>= <strong>Balance carried forward</strong> (to Balance Sheet)</p>' },
              { type: 'watchout', title: 'Interim vs Final Dividends', html: '<p><strong>Interim dividends</strong> have already been <strong>paid</strong> during the year — they are NOT current liabilities.</p><p><strong>Final dividends</strong> are <strong>proposed</strong> at year end — they ARE current liabilities (creditors due within one year).</p>' },
            ]
          },
          {
            id: '9.2.2', title: 'Company Balance Sheet — Capital Section',
            body: [
              { type: 'concept', variant: 'blue', title: 'Capital & Reserves', html: '<p><strong>Authorised Share Capital</strong> (for information only — not added)<br/><strong>Issued Share Capital:</strong><br/>Ordinary shares at par value<br/>Preference shares at par value<br/><strong>Capital Reserves:</strong><br/>Share Premium<br/>Revaluation Reserve<br/><strong>Revenue Reserves:</strong><br/>General Reserve<br/>Profit and Loss Balance<br/>= <strong>Total Shareholders\' Funds (Equity)</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'Capital vs Revenue Reserves', html: '<p><strong>Capital reserves</strong> (share premium, revaluation reserve) — arise from capital transactions, NOT available for distribution as dividends.</p><p><strong>Revenue reserves</strong> (general reserve, P&L balance) — arise from trading profits, available for distribution as dividends.</p>' },
            ]
          },
          {
            id: '9.2.3', title: 'Creditors in Company Accounts',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Creditors Due Within 1 Year</th><th>Creditors Due After 1 Year</th></tr></thead><tbody><tr><td>Trade creditors</td><td>Debentures</td></tr><tr><td>Accruals</td><td>Long-term bank loans</td></tr><tr><td>Bank overdraft</td><td>Mortgage</td></tr><tr><td>Final dividends proposed</td><td></td></tr><tr><td>Corporation tax due</td><td></td></tr><tr><td>PAYE/PRSI due</td><td></td></tr><tr><td>VAT due</td><td></td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '9.3', title: 'Difficult Adjustments',
        subTopics: [
          {
            id: '9.3.1', title: 'Company-Specific Adjustments',
            body: [
              { type: 'concept', variant: 'blue', title: 'Bonus Issue (Capitalisation Issue)', html: '<p>Free shares given to existing shareholders from reserves. No cash changes hands.</p><p><strong>Dr</strong> Revenue/Capital Reserve, <strong>Cr</strong> Ordinary Share Capital.</p><p>Total shareholders\' funds remain unchanged — it is simply a transfer within equity.</p>' },
              { type: 'concept', variant: 'green', title: 'Rights Issue', html: '<p>New shares offered to <strong>existing shareholders</strong> at a price below market value, in proportion to their existing holdings. Cash is received.</p><p><strong>Dr</strong> Bank (proceeds), <strong>Cr</strong> Ordinary Share Capital (par value), <strong>Cr</strong> Share Premium (excess over par).</p>' },
              { type: 'concept', variant: 'amber', title: 'Provision for Corporation Tax', html: '<p>Corporation tax is based on <strong>profits</strong>. If not yet paid at year end:</p><p>P&L: Charge as expense (after net profit, in appropriation section).</p><p>Balance Sheet: Show as <strong>creditors due within one year</strong>.</p>' },
              { type: 'concept', variant: 'red', title: 'Directors\' Fees/Remuneration', html: '<p>Directors\' fees are an <strong>administration expense</strong> in the P&L Account. If not yet paid, show as a <strong>current liability</strong> (accrual).</p>' },
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
    estimatedMinutes: 25,
    related: [8, 9, 17, 18],
    sections: [
      {
        id: '10.1', title: 'Published Financial Statements',
        subTopics: [
          {
            id: '10.1.1', title: 'What Must Be Published?',
            keyTerms: [
              { term: 'Directors\' Report', definition: 'A report by the directors covering the state of affairs, principal activities, dividends, post-balance sheet events, and future plans.' },
              { term: 'FRS 102', definition: 'The Financial Reporting Standard applicable in the UK and Republic of Ireland — the main standard for preparing financial statements.' },
              { term: 'Explanatory Notes', definition: 'Notes to the accounts providing additional detail on items in the financial statements.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Components of Published Accounts', html: '<p>Limited companies must prepare published accounts in a <strong>prescribed format</strong> under the Companies Act and FRS 102. These include:</p><p>1. <strong>Directors\' Report</strong><br/>2. <strong>Income Statement</strong> (Profit and Loss Account)<br/>3. <strong>Statement of Financial Position</strong> (Balance Sheet)<br/>4. <strong>Statement of Cash Flows</strong><br/>5. <strong>Notes to the Financial Statements</strong></p>' },
            ]
          },
          {
            id: '10.1.2', title: 'Directors\' Report Contents',
            body: [
              { type: 'concept', variant: 'green', title: 'Directors\' Report Must Include', html: '<p>1. <strong>State of affairs</strong> — general review of business performance.</p><p>2. <strong>Principal activities</strong> — what the company does.</p><p>3. <strong>Results</strong> — profit/loss for the year.</p><p>4. <strong>Dividends</strong> — recommended dividends.</p><p>5. <strong>Post-balance sheet events</strong> — significant events after year end.</p><p>6. <strong>Future developments</strong> — plans for the future.</p><p>7. <strong>Research and development</strong> activities.</p><p>8. <strong>Directors\' interests</strong> — shares and debentures held by directors.</p>' },
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
              { type: 'concept', variant: 'blue', title: 'Published Income Statement', html: '<p><strong>Turnover</strong> (revenue/sales)<br/>Less: <strong>Cost of Sales</strong><br/>= <strong>Gross Profit</strong><br/>Less: <strong>Distribution Costs</strong><br/>Less: <strong>Administration Expenses</strong><br/>+ <strong>Other Operating Income</strong><br/>= <strong>Operating Profit</strong><br/>+ Income from investments<br/>− Interest payable (debenture interest)<br/>= <strong>Profit on Ordinary Activities Before Tax</strong><br/>Less: Corporation Tax<br/>= <strong>Profit on Ordinary Activities After Tax</strong><br/>Less: Dividends (preference + ordinary)<br/>= <strong>Retained Profit for Year</strong><br/>+ P&L balance brought forward<br/>= <strong>P&L balance carried forward</strong></p>' },
              { type: 'watchout', title: 'Published vs Internal Format', html: '<p>The published format groups expenses into <strong>Cost of Sales</strong>, <strong>Distribution Costs</strong>, and <strong>Administration Expenses</strong> using workings — individual expense lines are NOT shown on the face of the published P&L.</p>' },
            ]
          },
          {
            id: '10.2.2', title: 'Cost Classification Workings',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Cost of Sales</th><th>Distribution Costs</th><th>Administration Expenses</th></tr></thead><tbody><tr><td>Opening stock</td><td>Carriage outwards</td><td>General expenses</td></tr><tr><td>+ Purchases</td><td>Advertising</td><td>Office wages & salaries</td></tr><tr><td>− Closing stock</td><td>Sales staff wages</td><td>Rent & rates</td></tr><tr><td>Factory wages</td><td>Bad debts</td><td>Insurance</td></tr><tr><td>Carriage inwards</td><td>Increase in provision</td><td>Light & heat</td></tr><tr><td>Depreciation (factory)</td><td>Depreciation (delivery vans)</td><td>Depreciation (office equipment)</td></tr><tr><td></td><td>Packaging</td><td>Audit fee</td></tr><tr><td></td><td></td><td>Directors\' remuneration</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '10.3', title: 'Notes to the Accounts',
        subTopics: [
          {
            id: '10.3.1', title: 'Key Explanatory Notes',
            body: [
              { type: 'concept', variant: 'green', title: 'Required Notes', html: '<p><strong>Note 1 — Accounting Policies:</strong> Depreciation methods and rates, stock valuation method, revenue recognition policy.</p><p><strong>Note 2 — Operating Profit:</strong> Items deducted: depreciation, audit fee, directors\' remuneration, loss on disposal. Items added: profit on disposal.</p><p><strong>Note 3 — Tangible Fixed Assets:</strong> Schedule showing: cost at start, additions, disposals, cost at end; accumulated depreciation at start, charge for year, disposals, depreciation at end; NBV at start and end.</p><p><strong>Note 4 — Debtors:</strong> Trade debtors, prepayments, other debtors.</p><p><strong>Note 5 — Creditors (amounts due within one year):</strong> Trade creditors, accruals, tax due, proposed dividends, bank overdraft.</p><p><strong>Note 6 — Creditors (amounts due after one year):</strong> Debentures, long-term loans.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>The tangible fixed assets note (Note 3) is frequently examined. Learn the format and be able to complete it with additions, disposals, and depreciation figures.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 11, block: 'B',
    title: 'Manufacturing Accounts',
    description: 'Prime cost, factory overhead, cost of manufacture, work in progress, apportionment.',
    estimatedMinutes: 30,
    related: [6, 9, 21, 22],
    sections: [
      {
        id: '11.1', title: 'Manufacturing Account Structure',
        subTopics: [
          {
            id: '11.1.1', title: 'Layout & Cost Components',
            keyTerms: [
              { term: 'Prime Cost', definition: 'Direct Materials + Direct Labour + Direct Expenses — the directly attributable costs of production.' },
              { term: 'Factory Overhead', definition: 'Indirect costs of manufacturing — factory rent, light & heat, factory insurance, indirect materials and labour.' },
              { term: 'Cost of Manufacture (Production Cost)', definition: 'Prime Cost + Factory Overhead, adjusted for Work in Progress.' },
              { term: 'Work in Progress (WIP)', definition: 'Goods that have been started but not yet completed at the end of the period.' },
              { term: 'Direct Materials', definition: 'Raw materials that form part of the finished product and can be directly traced to it.' },
              { term: 'Direct Labour', definition: 'Wages paid to workers directly involved in manufacturing the product.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Manufacturing Account Layout', html: '<p><strong>Direct Materials:</strong><br/>Opening stock of raw materials<br/>+ Purchases of raw materials<br/>+ Carriage inwards on raw materials<br/>− Closing stock of raw materials<br/>= <strong>Materials Consumed</strong></p><p><strong>+ Direct Labour</strong> (factory wages directly on product)<br/><strong>+ Direct Expenses</strong> (royalties, special tooling)<br/>= <strong>PRIME COST</strong></p>' },
              { type: 'concept', variant: 'green', title: 'Factory Overhead', html: '<p>Prime Cost<br/>+ <strong>Factory Overhead:</strong><br/>Factory rent & rates<br/>Factory light & heat<br/>Factory insurance<br/>Depreciation of factory equipment/plant<br/>Indirect factory wages<br/>Indirect factory materials<br/>Factory supervisor\'s salary<br/>= <strong>Factory Cost of Production</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'Work in Progress Adjustment', html: '<p>Factory Cost of Production<br/>+ Opening Work in Progress<br/>− Closing Work in Progress<br/>= <strong>Cost of Manufacture</strong></p><p>This figure is <strong>transferred to the Trading Account</strong> in place of purchases.</p>' },
            ]
          },
        ]
      },
      {
        id: '11.2', title: 'Apportionment of Expenses',
        subTopics: [
          {
            id: '11.2.1', title: 'Splitting Shared Costs',
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Apportion?', html: '<p>Some expenses benefit both the <strong>factory</strong> and the <strong>office</strong>. These must be split on a fair basis. Only the factory portion goes in the Manufacturing Account; the office portion goes in the P&L.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Expense</th><th>Typical Basis</th><th>Factory → Manufacturing A/C</th><th>Office → P&L</th></tr></thead><tbody><tr><td>Rent & rates</td><td>Floor area</td><td>Factory floor area share</td><td>Office floor area share</td></tr><tr><td>Light & heat</td><td>Floor area or usage</td><td>Factory share</td><td>Office share</td></tr><tr><td>Insurance</td><td>Value of assets / floor area</td><td>Factory share</td><td>Office share</td></tr><tr><td>Depreciation</td><td>By specific asset</td><td>Factory plant/equipment</td><td>Office equipment</td></tr><tr><td>Wages</td><td>Direct = factory; indirect split</td><td>Direct + indirect factory</td><td>Office wages</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Always read the question carefully for the apportionment basis. Common splits: 3/4 factory, 1/4 office (based on floor area). Some questions give exact amounts for factory and office.</p>' },
            ]
          },
        ]
      },
      {
        id: '11.3', title: 'Manufacturing P&L & Balance Sheet',
        subTopics: [
          {
            id: '11.3.1', title: 'Trading Account for a Manufacturer',
            body: [
              { type: 'concept', variant: 'green', title: 'Trading Account', html: '<p>Sales<br/>Less: <strong>Cost of Sales:</strong><br/>Opening stock of <strong>finished goods</strong><br/>+ <strong>Cost of Manufacture</strong> (from Manufacturing A/C)<br/>− Closing stock of finished goods<br/>= Cost of Sales<br/>= <strong>Gross Profit</strong></p><p>Note: A manufacturer has <strong>three types of stock:</strong> raw materials, work in progress, and finished goods.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Stock Type</th><th>Where It Appears</th></tr></thead><tbody><tr><td>Raw materials (opening/closing)</td><td>Manufacturing Account</td></tr><tr><td>Work in progress (opening/closing)</td><td>Manufacturing Account</td></tr><tr><td>Finished goods (opening/closing)</td><td>Trading Account</td></tr><tr><td>All three closing stocks</td><td>Balance Sheet — Current Assets</td></tr></tbody></table>' },
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
              { term: 'Allocation', definition: 'Assigning an expense directly to a specific department when it can be identified as belonging to that department.' },
              { term: 'Apportionment', definition: 'Sharing a common expense between departments on a fair basis (floor area, sales ratio, number of employees).' },
              { term: 'Departmental Trading Account', definition: 'A separate trading account for each department showing individual gross profit.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Why Prepare Departmental Accounts?', html: '<p>When a business has multiple departments, departmental accounts help:</p><p>1. Identify the <strong>profit or loss</strong> of each department.</p><p>2. Assess the <strong>performance</strong> of each department manager.</p><p>3. Make decisions about <strong>expanding or closing</strong> departments.</p><p>4. Determine the <strong>contribution</strong> of each department to overheads.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Expense</th><th>Basis of Apportionment</th></tr></thead><tbody><tr><td>Rent, rates, insurance, light & heat</td><td>Floor area</td></tr><tr><td>Advertising</td><td>Sales ratio</td></tr><tr><td>Canteen expenses</td><td>Number of employees</td></tr><tr><td>Depreciation</td><td>Value of assets in each department</td></tr><tr><td>Delivery expenses</td><td>Sales ratio or number of deliveries</td></tr><tr><td>General administration</td><td>Sales ratio or equally</td></tr></tbody></table>' },
            ]
          },
          {
            id: '12.1.2', title: 'Closing a Department',
            body: [
              { type: 'concept', variant: 'amber', title: 'Should a Loss-Making Department Close?', html: '<p>A department making a <strong>net loss</strong> should NOT necessarily be closed. If the department makes a <strong>positive contribution</strong> (i.e. its revenue exceeds its directly identifiable costs), it is helping to cover shared overheads.</p><p>Closing the department would mean its contribution is lost — shared overheads would have to be covered by remaining departments, potentially reducing overall profit.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>When asked whether to close a department, always calculate the <strong>contribution</strong> (revenue minus directly identifiable costs). If contribution is positive, closing would reduce overall profit.</p>' },
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
    estimatedMinutes: 28,
    related: [6, 14],
    sections: [
      {
        id: '13.1', title: 'Club Accounts Structure',
        subTopics: [
          {
            id: '13.1.1', title: 'Receipts & Payments vs Income & Expenditure',
            keyTerms: [
              { term: 'Receipts & Payments Account', definition: 'A summary of cash transactions — similar to a cash book. Shows opening and closing bank balance.' },
              { term: 'Income & Expenditure Account', definition: 'The club equivalent of a P&L account. Shows surplus or deficit for the period based on accruals concept.' },
              { term: 'Accumulated Fund', definition: 'The club equivalent of capital — the net assets of the club at the start of the period.' },
              { term: 'Surplus', definition: 'When income exceeds expenditure in a club (equivalent to net profit).' },
              { term: 'Deficit', definition: 'When expenditure exceeds income in a club (equivalent to net loss).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Two Types of Account', html: '<p><strong>Receipts & Payments Account:</strong> A simple cash summary. Records ALL cash received and paid during the period, regardless of which period it relates to. Similar to a summarised cash book. Shows <strong>opening and closing bank/cash balances</strong>.</p><p><strong>Income & Expenditure Account:</strong> Prepared on the <strong>accruals basis</strong>. Only includes income <strong>earned</strong> and expenses <strong>incurred</strong> during the period. Shows a <strong>surplus</strong> or <strong>deficit</strong>.</p>' },
              { type: 'watchout', title: 'Key Difference', html: '<p>Receipts & Payments = <strong>cash basis</strong> (like a cashbook).<br/>Income & Expenditure = <strong>accruals basis</strong> (like a P&L).</p><p>Capital items (purchase of equipment) appear in R&P but NOT in I&E. Depreciation appears in I&E but NOT in R&P.</p>' },
            ]
          },
          {
            id: '13.1.2', title: 'The Accumulated Fund',
            body: [
              { type: 'concept', variant: 'green', title: 'Calculating the Accumulated Fund', html: '<p>The accumulated fund is the club\'s <strong>net worth</strong> at the start of the period. It is calculated from the opening balance sheet:</p><p><strong>Opening Assets − Opening Liabilities = Accumulated Fund</strong></p><p>At the end of the year: Accumulated Fund + Surplus (or − Deficit) = Closing Accumulated Fund.</p>' },
            ]
          },
        ]
      },
      {
        id: '13.2', title: 'Special Club Income',
        subTopics: [
          {
            id: '13.2.1', title: 'Subscriptions',
            keyTerms: [
              { term: 'Subscriptions', definition: 'Annual membership fees — the main source of income for most clubs.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Subscriptions Account', html: '<p>Subscriptions must be adjusted for amounts <strong>prepaid</strong> and <strong>accrued</strong> at the start and end of the year.</p><p>To calculate subscription <strong>income</strong> for the I&E Account, prepare a Subscriptions Account (T-account):</p><p><strong>Debit side:</strong> Subscriptions in arrears at start, Receipts & Payments (total cash received), Subscriptions prepaid at end.</p><p><strong>Credit side:</strong> Subscriptions prepaid at start, <strong>Income & Expenditure (balancing figure)</strong>, Subscriptions in arrears at end.</p>' },
              { type: 'watchout', title: 'Subscriptions in Arrears', html: '<p>Members who have not paid their subscription owe the club money. Subscriptions in arrears at year end = <strong>current asset (debtor)</strong>.</p><p>Subscriptions prepaid at year end = <strong>current liability</strong>.</p>' },
            ]
          },
          {
            id: '13.2.2', title: 'Other Special Receipts',
            keyTerms: [
              { term: 'Life Membership', definition: 'A one-off payment for permanent membership. Income should be spread over the expected membership years.' },
              { term: 'Entrance Fees', definition: 'One-off fees charged to new members. Usually treated as income in the year received.' },
              { term: 'Government Grant', definition: 'Funding received from the government. Capital grants may be spread over the life of the asset.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Receipt</th><th>Treatment</th></tr></thead><tbody><tr><td><strong>Entrance fees</strong></td><td>Usually treated as income in the year received. If policy states otherwise, may be capitalised.</td></tr><tr><td><strong>Life membership</strong></td><td>Spread over expected membership years. Only current year\'s portion = income. Balance = liability.</td></tr><tr><td><strong>Government grant (revenue)</strong></td><td>Income in I&E in the year received.</td></tr><tr><td><strong>Government grant (capital)</strong></td><td>Spread over the life of the asset purchased. Annual portion = income in I&E.</td></tr><tr><td><strong>Donations</strong></td><td>If recurring/expected = income. If once-off/large = may go to accumulated fund.</td></tr><tr><td><strong>Fundraising events</strong></td><td>Income in I&E (net of direct costs if applicable).</td></tr></tbody></table>' },
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
              { type: 'concept', variant: 'green', title: 'Bar Trading Account', html: '<p>Many clubs operate a <strong>bar</strong> or <strong>shop</strong>. A separate trading account is prepared:</p><p>Bar Sales (from R&P, adjusted for debtors)<br/>Less: Cost of Bar Sales:<br/>Opening bar stock<br/>+ Bar purchases (from R&P, adjusted for creditors)<br/>− Closing bar stock<br/>= <strong>Bar Gross Profit</strong><br/>Less: Bar wages, bar expenses<br/>= <strong>Bar Net Profit</strong></p><p>Only the <strong>net profit/loss</strong> from the bar is transferred to the I&E Account.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Bar purchases should be taken from the R&P account and adjusted for opening/closing bar creditors. Bar sales should be adjusted for any bar debtors.</p>' },
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
              { term: 'Service Firm', definition: 'A business that provides services rather than selling goods — e.g. solicitors, accountants, architects, doctors.' },
              { term: 'Fee Income', definition: 'The main revenue source for service firms — fees charged for professional services rendered.' },
              { term: 'WIP (Service Firms)', definition: 'Work done for clients but not yet billed at year end — treated as a current asset.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Key Differences from Trading Firms', html: '<p>1. <strong>No Trading Account</strong> — service firms do not sell goods, so there is no cost of sales, no stock, no purchases.</p><p>2. Main income is <strong>fees</strong> (professional charges for services).</p><p>3. The P&L starts with <strong>Fee Income</strong> and deducts expenses.</p><p>4. <strong>Work in Progress</strong> = work done but not yet billed — a current asset.</p>' },
            ]
          },
          {
            id: '14.1.2', title: 'Fee Income Calculation',
            body: [
              { type: 'concept', variant: 'green', title: 'Calculating Fee Income', html: '<p>Fees received (from bank/cash records) may need adjustment:</p><p>Fees received (cash)<br/>+ Fees accrued at end (fee debtors at end)<br/>− Fees accrued at start (fee debtors at start)<br/>+ Fees prepaid at start<br/>− Fees prepaid at end<br/>= <strong>Fee Income for I&E/P&L</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'HL Adjustments', html: '<p>At Higher Level, service firm questions may include:</p><p>1. <strong>Provision for bad debts</strong> on fee debtors.</p><p>2. <strong>Work in progress</strong> adjustment.</p><p>3. <strong>Partners</strong> — some service firms are partnerships (salaries, interest on capital, profit-sharing ratios).</p>' },
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
              { term: 'Enterprise Analysis', definition: 'Analysing the profit/loss of each farming enterprise (e.g. dairy, tillage, sheep) separately.' },
              { term: 'Headage', definition: 'The number of livestock on the farm.' },
              { term: 'REPS/GLAS', definition: 'Government environmental schemes that provide income to farmers.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Farm Accounts Overview', html: '<p>Farm accounts follow similar principles to other sole traders but have special features:</p><p>1. <strong>Multiple enterprises</strong> — dairy, beef, tillage, sheep, etc. Each can be analysed separately.</p><p>2. <strong>Livestock valuation</strong> — animals are valued at market value or cost (farm-bred stock at deemed cost).</p><p>3. <strong>Stock changes</strong> — increases/decreases in livestock and crop values affect profit.</p><p>4. <strong>Government grants</strong> — various EU and national schemes (REPS, GLAS, Single Payment).</p>' },
              { type: 'concept', variant: 'green', title: 'Farm P&L Structure', html: '<p><strong>Farm Income:</strong><br/>Sales of livestock + crops + milk + other produce<br/>+ Increase in stock values (or − decrease)<br/>+ Government grants and subsidies<br/>= <strong>Total Farm Income</strong></p><p><strong>Less Farm Expenses:</strong><br/>Feed, fertiliser, seeds, vet fees, contractor charges, machinery running costs, depreciation, wages, insurance, etc.<br/>= <strong>Farm Profit/Loss</strong></p>' },
            ]
          },
          {
            id: '15.1.2', title: 'Stock Valuation on Farms',
            body: [
              { type: 'concept', variant: 'amber', title: 'Livestock Valuation', html: '<p><strong>Purchased stock:</strong> Valued at cost or net realisable value, whichever is lower.</p><p><strong>Home-bred stock:</strong> Valued at a deemed cost (estimated cost of rearing).</p><p><strong>Crops:</strong> Valued at cost of production or NRV, whichever is lower.</p><p>An increase in the value of livestock from opening to closing stock is treated as <strong>income</strong>. A decrease is an <strong>expense</strong>.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 16, block: 'C',
    title: 'Incomplete Records',
    description: 'Control account method, net worth/balance sheet method, mark-up and margin calculations.',
    estimatedMinutes: 25,
    related: [2, 5, 6],
    sections: [
      {
        id: '16.1', title: 'The Problem of Incomplete Records',
        subTopics: [
          {
            id: '16.1.1', title: 'When Records Are Missing',
            keyTerms: [
              { term: 'Incomplete Records', definition: 'When a business has not maintained a full double-entry system and the accountant must reconstruct the accounts.' },
              { term: 'Single Entry', definition: 'An informal record-keeping system where not all transactions are recorded with both debit and credit.' },
            ],
            body: [
              { type: 'prose', html: '<p>Many small businesses do not keep a full set of double-entry records. The accountant must <strong>reconstruct</strong> the accounts using whatever information is available. There are two main methods.</p>' },
            ]
          },
        ]
      },
      {
        id: '16.2', title: 'Method 1: Control Account / Cash Method',
        subTopics: [
          {
            id: '16.2.1', title: 'Using Control Accounts to Find Missing Figures',
            body: [
              { type: 'concept', variant: 'blue', title: 'Finding Credit Sales', html: '<p>Prepare a <strong>Debtors Control Account</strong>:</p><p><strong>Dr:</strong> Opening debtors, Credit sales (balancing figure)<br/><strong>Cr:</strong> Cash received from debtors, Sales returns, Bad debts, Discount allowed, Closing debtors</p><p>The <strong>balancing figure</strong> = Credit Sales.</p>' },
              { type: 'concept', variant: 'green', title: 'Finding Credit Purchases', html: '<p>Prepare a <strong>Creditors Control Account</strong>:</p><p><strong>Dr:</strong> Cash paid to creditors, Purchase returns, Discount received, Closing creditors<br/><strong>Cr:</strong> Opening creditors, Credit purchases (balancing figure)</p><p>The <strong>balancing figure</strong> = Credit Purchases.</p>' },
              { type: 'concept', variant: 'amber', title: 'Finding Cash Sales/Purchases', html: '<p>Prepare a <strong>Cash/Bank Summary</strong>:</p><p>List all known cash receipts and payments. The balancing figure may represent cash sales (if on the receipt side) or drawings/payments (if on the payment side).</p>' },
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
              { term: 'Statement of Affairs', definition: 'A balance sheet prepared from incomplete records — lists assets and liabilities to find capital.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Net Worth Formula', html: '<p><strong>Net Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced</strong></p><p>1. Prepare an <strong>opening statement of affairs</strong> (balance sheet at start) → Opening Capital.</p><p>2. Prepare a <strong>closing statement of affairs</strong> (balance sheet at end) → Closing Capital.</p><p>3. Apply the formula.</p>' },
              { type: 'watchout', title: 'Limitation', html: '<p>The net worth method gives the <strong>total profit</strong> but does NOT provide a breakdown (no gross profit, no individual expenses). For a full P&L, use the control account method.</p>' },
            ]
          },
          {
            id: '16.3.2', title: 'Mark-Up vs Margin',
            keyTerms: [
              { term: 'Mark-Up', definition: 'Profit expressed as a percentage of COST. Mark-up = Profit / Cost × 100.' },
              { term: 'Margin', definition: 'Profit expressed as a percentage of SELLING PRICE. Margin = Profit / Sales × 100.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Mark-Up vs Margin', html: '<p><strong>Mark-up</strong> = Gross Profit / Cost of Sales × 100</p><p><strong>Margin</strong> = Gross Profit / Sales × 100</p><p>If mark-up is 1/3 (33⅓%): Cost = 3, Profit = 1, Sales = 4. So margin = 1/4 (25%).</p><p>If margin is 20%: Sales = 100, Profit = 20, Cost = 80. So mark-up = 20/80 = 25%.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Mark-Up</th><th>Equivalent Margin</th></tr></thead><tbody><tr><td>1/4 (25%)</td><td>1/5 (20%)</td></tr><tr><td>1/3 (33⅓%)</td><td>1/4 (25%)</td></tr><tr><td>1/2 (50%)</td><td>1/3 (33⅓%)</td></tr><tr><td>2/3 (66⅔%)</td><td>2/5 (40%)</td></tr><tr><td>1/1 (100%)</td><td>1/2 (50%)</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Mark-up is on <strong>cost</strong>. Margin is on <strong>sales</strong>. Remember: Mark-up = fraction of cost; Margin = fraction of selling price. Convert between them using the table above.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 17, block: 'C',
    title: 'Cash Flow Statements',
    description: 'FRS 1 Revised format, reconciliation notes, operating activities, investing, financing.',
    estimatedMinutes: 30,
    related: [9, 10, 18],
    sections: [
      {
        id: '17.1', title: 'Purpose & Format',
        subTopics: [
          {
            id: '17.1.1', title: 'Why Prepare a Cash Flow Statement?',
            keyTerms: [
              { term: 'Cash Flow Statement', definition: 'Shows how cash moved in and out of a business during the period — where cash came from and how it was used.' },
              { term: 'Operating Activities', definition: 'Cash flows from the main revenue-producing activities of the business.' },
              { term: 'Investing Activities', definition: 'Cash flows from the purchase and sale of long-term assets.' },
              { term: 'Financing Activities', definition: 'Cash flows from changes in equity capital and borrowings.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Purpose', html: '<p>The cash flow statement shows how <strong>cash</strong> moved during the period. It answers: Where did cash come from? How was it used?</p><p><strong>Cash ≠ Profit.</strong> A profitable business can still run out of cash. The cash flow statement bridges the gap between profit (P&L) and cash (bank balance).</p><p>Reasons profit ≠ cash: depreciation (non-cash expense), credit sales (income but no cash yet), stock increases (cash spent but not yet expensed), capital expenditure (cash out but not a P&L expense).</p>' },
            ]
          },
          {
            id: '17.1.2', title: 'Cash Flow Statement Format (FRS 102)',
            body: [
              { type: 'concept', variant: 'green', title: 'Three-Section Format', html: '<p><strong>1. Cash Flows from Operating Activities</strong><br/>Operating Profit (from P&L)<br/>Adjustments: + Depreciation, + Loss on disposal (or − Profit), + Increase in provisions<br/>Working capital changes: − Increase in stock (or + Decrease), − Increase in debtors (or + Decrease), + Increase in creditors (or − Decrease)<br/>= <strong>Cash Generated from Operations</strong><br/>− Interest paid<br/>− Tax paid<br/>= <strong>Net Cash from Operating Activities</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'Sections 2 & 3', html: '<p><strong>2. Cash Flows from Investing Activities</strong><br/>− Purchase of fixed assets<br/>+ Proceeds from sale of fixed assets<br/>+ Investment income received<br/>= <strong>Net Cash from Investing Activities</strong></p><p><strong>3. Cash Flows from Financing Activities</strong><br/>+ Issue of shares (proceeds)<br/>+ New loans/debentures received<br/>− Repayment of loans/debentures<br/>− Dividends paid<br/>= <strong>Net Cash from Financing Activities</strong></p><p><strong>Net Increase/Decrease in Cash</strong> = 1 + 2 + 3<br/>+ Opening cash/bank balance<br/>= <strong>Closing cash/bank balance</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '17.2', title: 'Reconciliation Notes',
        subTopics: [
          {
            id: '17.2.1', title: 'Key Reconciliation Workings',
            body: [
              { type: 'concept', variant: 'blue', title: 'Finding Cash Paid for Fixed Assets', html: '<p>Use the fixed asset account:</p><p>Opening cost + Additions (balancing figure) − Disposals at cost = Closing cost</p><p>The <strong>additions</strong> figure = cash paid for new fixed assets (for investing section).</p>' },
              { type: 'concept', variant: 'green', title: 'Finding Tax Paid', html: '<p>Opening tax liability + Tax charge for year (from P&L) − Closing tax liability = <strong>Tax Paid</strong> (for operating section).</p>' },
              { type: 'concept', variant: 'amber', title: 'Finding Dividends Paid', html: '<p>Opening dividends due + Dividends declared this year − Closing dividends due = <strong>Dividends Paid</strong> (for financing section).</p><p>Remember: interim dividends are already paid. Only final dividends may be unpaid at year end.</p>' },
              { type: 'concept', variant: 'red', title: 'Finding Proceeds from Sale of Asset', html: '<p><strong>Proceeds = NBV of asset sold ± Profit/Loss on disposal</strong></p><p>NBV of asset sold = Cost − Accumulated depreciation on that asset.</p><p>Profit on disposal → Proceeds = NBV + Profit.<br/>Loss on disposal → Proceeds = NBV − Loss.</p>' },
            ]
          },
        ]
      },
      {
        id: '17.3', title: 'When Operating Profit Is Not Given',
        subTopics: [
          {
            id: '17.3.1', title: 'Deriving Operating Profit',
            body: [
              { type: 'concept', variant: 'blue', title: 'Working Back to Operating Profit', html: '<p>If the question gives <strong>Profit before Tax</strong> or <strong>Profit after Tax</strong>, you need to work back:</p><p>Profit before Tax<br/>+ Interest paid (debenture interest)<br/>− Investment income<br/>± Exceptional items<br/>= <strong>Operating Profit</strong></p><p>Then proceed with the normal operating activities section.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Cash flow statements are examined in Q4. Always show your workings for finding figures like tax paid, dividends paid, and fixed asset purchases. These workings carry marks even if your final figure is wrong.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 18, block: 'C',
    title: 'Ratio Analysis & Interpretation',
    description: 'Profitability, liquidity, activity, gearing, and investment ratios with interpretation.',
    estimatedMinutes: 35,
    related: [9, 10, 17],
    sections: [
      {
        id: '18.1', title: 'Part A: Profitability Ratios',
        subTopics: [
          {
            id: '18.1.1', title: 'Profitability & Efficiency',
            keyTerms: [
              { term: 'Gross Profit Percentage', definition: 'Gross Profit / Sales × 100. Measures profitability of trading activities.' },
              { term: 'Net Profit Percentage', definition: 'Net Profit / Sales × 100. Measures overall profitability after all expenses.' },
              { term: 'Return on Capital Employed (ROCE)', definition: 'Net Profit / Capital Employed × 100. Measures return generated on total capital invested.' },
              { term: 'Return on Shareholders\' Funds (ROSF)', definition: 'Profit after tax / Shareholders\' Funds × 100. Return for equity investors.' },
              { term: 'Mark-Up', definition: 'Gross Profit / Cost of Sales × 100. Profit as percentage of cost.' },
              { term: 'Total Expenses/Sales %', definition: 'Total Expenses / Sales × 100. Measures expense control.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Profitability Ratios', html: '<p><strong>Gross Profit %</strong> = (Gross Profit / Sales) × 100</p><p><strong>Net Profit %</strong> = (Net Profit / Sales) × 100</p><p><strong>ROCE</strong> = (Net Profit / Capital Employed) × 100</p><p><strong>ROSF</strong> = (Profit after tax / Shareholders\' Funds) × 100</p><p><strong>Mark-up</strong> = (Gross Profit / Cost of Sales) × 100</p><p><strong>Total Expenses/Sales %</strong> = (Total Expenses / Sales) × 100</p>' },
              { type: 'concept', variant: 'amber', title: 'Interpreting Profitability', html: '<p><strong>GP% falling:</strong> Selling prices may have been reduced, cost of goods may have risen, stock theft, or change in sales mix.</p><p><strong>NP% falling:</strong> Expenses may have increased (wages, rent, advertising), poor expense control.</p><p><strong>ROCE falling:</strong> Profits declining relative to capital invested. Compare to bank interest rate — if ROCE is less than what the bank offers, the investment is underperforming.</p>' },
            ]
          },
        ]
      },
      {
        id: '18.2', title: 'Part A: Liquidity & Activity Ratios',
        subTopics: [
          {
            id: '18.2.1', title: 'Liquidity Ratios',
            keyTerms: [
              { term: 'Current Ratio', definition: 'Current Assets / Current Liabilities. Ideal: 2:1. Measures short-term ability to pay debts.' },
              { term: 'Acid Test (Quick Ratio)', definition: '(Current Assets − Stock) / Current Liabilities. Ideal: 1:1. Excludes stock as it may not be quickly convertible.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Liquidity Ratios', html: '<p><strong>Current Ratio</strong> = Current Assets / Current Liabilities</p><p>Ideal: <strong>2:1</strong>. Below 2:1 may indicate difficulty paying short-term debts. Too high may mean idle assets.</p><p><strong>Acid Test (Quick Ratio)</strong> = (Current Assets − Stock) / Current Liabilities</p><p>Ideal: <strong>1:1</strong>. More stringent — excludes stock because it may take time to sell.</p>' },
              { type: 'concept', variant: 'amber', title: 'Improving Liquidity', html: '<p>If liquidity is low: collect debts faster, negotiate longer credit from suppliers, sell unused assets, introduce new capital, reduce drawings/dividends, factor debts.</p>' },
            ]
          },
          {
            id: '18.2.2', title: 'Activity (Efficiency) Ratios',
            keyTerms: [
              { term: 'Stock Turnover', definition: 'Cost of Sales / Average Stock. How many times stock is sold and replaced per year.' },
              { term: 'Debtors\' Collection Period', definition: '(Debtors / Credit Sales) × 365. Number of days debtors take to pay.' },
              { term: 'Creditors\' Payment Period', definition: '(Creditors / Credit Purchases) × 365. Number of days the business takes to pay suppliers.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Activity Ratios', html: '<p><strong>Stock Turnover</strong> = Cost of Sales / Average Stock (times per year)</p><p>Or: 365 / Stock Turnover = days to sell stock. Higher = better (stock sells quickly).</p><p><strong>Debtors\' Days</strong> = (Debtors / Credit Sales) × 365</p><p>Lower = better (customers paying quickly).</p><p><strong>Creditors\' Days</strong> = (Creditors / Credit Purchases) × 365</p><p>Higher = better for cash flow (but don\'t damage supplier relationships).</p>' },
            ]
          },
        ]
      },
      {
        id: '18.3', title: 'Part A: Gearing & Investment Ratios',
        subTopics: [
          {
            id: '18.3.1', title: 'Gearing',
            keyTerms: [
              { term: 'Gearing Ratio', definition: 'Long-term Liabilities / Capital Employed × 100. Measures reliance on borrowed funds.' },
              { term: 'Interest Cover', definition: 'Operating Profit / Interest Payable. How many times interest can be covered by profits.' },
            ],
            body: [
              { type: 'concept', variant: 'red', title: 'Gearing Ratio', html: '<p><strong>Gearing</strong> = Long-term Liabilities / Capital Employed × 100</p><p><strong>High gearing (>50%):</strong> Heavy reliance on borrowed funds. Higher risk — interest must be paid regardless of profit. But interest is tax-deductible.</p><p><strong>Low gearing (<50%):</strong> More equity-funded. Lower risk but potentially lower returns for shareholders.</p>' },
              { type: 'concept', variant: 'amber', title: 'Interest Cover', html: '<p><strong>Interest Cover</strong> = Operating Profit / Interest Payable</p><p>Shows how many times the company can pay its interest from profits. Higher = safer. Below 2 times is concerning.</p>' },
            ]
          },
          {
            id: '18.3.2', title: 'Investment Ratios',
            keyTerms: [
              { term: 'Earnings Per Share (EPS)', definition: 'Profit after tax and preference dividends / Number of ordinary shares.' },
              { term: 'Dividend Per Share (DPS)', definition: 'Total ordinary dividends / Number of ordinary shares.' },
              { term: 'Dividend Cover', definition: 'Profit after tax / Total dividends. How many times dividends are covered by earnings.' },
              { term: 'Dividend Yield', definition: '(Dividend per share / Market price per share) × 100. Income return for investors.' },
              { term: 'Price Earnings Ratio (P/E)', definition: 'Market price per share / EPS. Measures market confidence in the company.' },
              { term: 'Period to Recoup Investment', definition: 'Market price per share / Dividend per share. Years to recover investment through dividends.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Investment Ratios', html: '<p><strong>EPS</strong> = (Profit after tax − Pref dividends) / No. of ordinary shares</p><p><strong>DPS</strong> = Total ordinary dividends / No. of ordinary shares</p><p><strong>Dividend Cover</strong> = Profit after tax / Total dividends</p><p><strong>Dividend Yield</strong> = (DPS / Market price) × 100</p><p><strong>P/E Ratio</strong> = Market price / EPS</p><p><strong>Period to Recoup</strong> = Market price / DPS</p>' },
              { type: 'concept', variant: 'blue', title: 'Interpreting Investment Ratios', html: '<p><strong>High P/E:</strong> Market expects strong future growth. Investors are willing to pay more per euro of earnings.</p><p><strong>Low P/E:</strong> Market has lower expectations. Could be undervalued.</p><p><strong>High Dividend Yield:</strong> Good income return but may indicate limited growth (company paying out most profits).</p><p><strong>High Dividend Cover:</strong> Dividends are well-protected — company retains most earnings for growth.</p>' },
            ]
          },
        ]
      },
      {
        id: '18.4', title: 'Part B: Interpretation & Stakeholder Analysis',
        subTopics: [
          {
            id: '18.4.1', title: 'How to Interpret Ratios',
            body: [
              { type: 'concept', variant: 'blue', title: 'Interpretation Framework', html: '<p>Always follow this structure:</p><p>1. <strong>State the ratio</strong> and its value for both years.</p><p>2. <strong>Identify the trend</strong> — improved, declined, or stable.</p><p>3. <strong>Explain the reason</strong> for the change (refer to the financial statements).</p><p>4. <strong>Comment on implications</strong> for the stakeholder.</p><p>5. <strong>Compare</strong> to industry averages or ideal ratios where possible.</p>' },
            ]
          },
          {
            id: '18.4.2', title: 'Stakeholder-Specific Analysis',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Stakeholder</th><th>Key Ratios</th><th>Main Concerns</th></tr></thead><tbody><tr><td><strong>Shareholders</strong></td><td>EPS, DPS, P/E, Dividend Yield, ROSF</td><td>Return on investment, dividend income, capital growth</td></tr><tr><td><strong>Banks/Lenders</strong></td><td>Gearing, Interest Cover, Current Ratio, Acid Test</td><td>Ability to repay loans, security, liquidity</td></tr><tr><td><strong>Trade Creditors</strong></td><td>Current Ratio, Acid Test, Creditors\' Days</td><td>Will they be paid on time?</td></tr><tr><td><strong>Employees</strong></td><td>NP%, ROCE, Gearing</td><td>Job security, ability to pay wages</td></tr><tr><td><strong>Management</strong></td><td>All ratios</td><td>Overall performance, areas for improvement</td></tr></tbody></table>' },
            ]
          },
          {
            id: '18.4.3', title: 'Limitations of Ratio Analysis',
            body: [
              { type: 'concept', variant: 'amber', title: 'Limitations', html: '<p>1. Based on <strong>historical data</strong> — may not reflect current or future position.</p><p>2. <strong>Different accounting policies</strong> make comparison between firms difficult.</p><p>3. <strong>Inflation</strong> distorts figures over time.</p><p>4. <strong>Seasonal variations</strong> affect snapshot ratios (balance sheet date matters).</p><p>5. Ratios don\'t consider <strong>non-financial factors</strong> (staff morale, management quality, market conditions).</p><p>6. <strong>Window dressing</strong> — companies may manipulate year-end figures to improve ratios.</p><p>7. Ratios are <strong>inter-dependent</strong> — one ratio alone does not tell the full story.</p>' },
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
    estimatedMinutes: 12,
    related: [1, 2, 6],
    sections: [
      {
        id: '19.1', title: 'Tabular Statements',
        subTopics: [
          {
            id: '19.1.1', title: 'The Accounting Equation',
            keyTerms: [
              { term: 'Accounting Equation', definition: 'Assets = Capital + Liabilities. Must balance after every transaction.' },
              { term: 'Tabular Statement', definition: 'A table showing how each transaction affects assets, liabilities, and capital — maintaining the accounting equation.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'The Accounting Equation', html: '<p><strong>Assets = Capital + Liabilities</strong></p><p>Every transaction affects at least two items but the equation must always balance. This is the foundation of double-entry bookkeeping.</p>' },
              { type: 'concept', variant: 'green', title: 'Procedure', html: '<p>1. Set up columns for each asset, liability, and capital item.</p><p>2. Enter the opening balances.</p><p>3. For each transaction, show the increase (+) or decrease (−) in the affected columns.</p><p>4. Calculate running totals — Assets must always equal Capital + Liabilities.</p>' },
            ]
          },
          {
            id: '19.1.2', title: 'Common Transactions',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Transaction</th><th>Effect</th></tr></thead><tbody><tr><td>Owner invests cash</td><td>Bank ↑, Capital ↑</td></tr><tr><td>Buy goods for cash</td><td>Stock ↑, Bank ↓</td></tr><tr><td>Buy goods on credit</td><td>Stock ↑, Creditors ↑</td></tr><tr><td>Sell goods for cash (at profit)</td><td>Bank ↑, Stock ↓, Capital ↑ (by profit)</td></tr><tr><td>Sell goods on credit</td><td>Debtors ↑, Stock ↓, Capital ↑ (by profit)</td></tr><tr><td>Pay creditor</td><td>Bank ↓, Creditors ↓</td></tr><tr><td>Receive from debtor</td><td>Bank ↑, Debtors ↓</td></tr><tr><td>Owner takes drawings</td><td>Bank ↓, Capital ↓</td></tr><tr><td>Pay expense</td><td>Bank ↓, Capital ↓ (reduces profit)</td></tr><tr><td>Buy fixed asset for cash</td><td>Fixed Asset ↑, Bank ↓</td></tr><tr><td>Depreciation</td><td>Fixed Asset ↓, Capital ↓</td></tr></tbody></table>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>Always check that your totals balance after EVERY transaction. If they don\'t balance, go back and find the error before moving on.</p>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK D — MANAGEMENT ACCOUNTING (Chapters 20-24)
  // ──────────────────────────────────────────────────
  {
    id: 20, block: 'D',
    title: 'Nature & Scope of Management Accounting',
    description: 'Role of the management accountant, relationship between management and financial accounting.',
    estimatedMinutes: 12,
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
              { term: 'Controlling', definition: 'Monitoring actual performance against plans and taking corrective action — variance analysis.' },
              { term: 'Decision-Making', definition: 'Using financial data to choose between alternative courses of action — make or buy, accept special orders.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Functions of Management Accounting', html: '<p>1. <strong>Planning:</strong> Setting budgets, forecasting sales and costs, strategic planning.</p><p>2. <strong>Controlling:</strong> Comparing actual vs budgeted results, investigating variances, taking corrective action.</p><p>3. <strong>Decision-making:</strong> Providing relevant information for specific decisions (make or buy, pricing, discontinuation).</p><p>4. <strong>Performance evaluation:</strong> Assessing departmental and managerial performance.</p>' },
            ]
          },
          {
            id: '20.1.2', title: 'Management vs Financial Accounting',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Financial Accounting</th><th>Management Accounting</th></tr></thead><tbody><tr><td>Focus</td><td>Past events</td><td>Future decisions + past</td></tr><tr><td>Users</td><td>External (shareholders, creditors, Revenue)</td><td>Internal (managers, directors)</td></tr><tr><td>Legal requirement</td><td>Mandatory (Companies Act)</td><td>Optional — prepared if useful</td></tr><tr><td>Format</td><td>Prescribed by law/standards</td><td>Flexible, tailored to needs</td></tr><tr><td>Time period</td><td>Usually annual</td><td>Any period (daily, weekly, monthly)</td></tr><tr><td>Detail</td><td>Summarised totals</td><td>Detailed by department/product/cost centre</td></tr><tr><td>Verification</td><td>Audited</td><td>Not audited</td></tr><tr><td>Standards</td><td>Must follow FRS/IFRS</td><td>No mandatory standards</td></tr></tbody></table>' },
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
    estimatedMinutes: 18,
    related: [20, 22, 23, 24],
    sections: [
      {
        id: '21.1', title: 'Types of Costs',
        subTopics: [
          {
            id: '21.1.1', title: 'Fixed, Variable & Semi-Variable',
            keyTerms: [
              { term: 'Fixed Costs', definition: 'Costs that remain constant regardless of the level of output. Examples: rent, insurance, salaries.' },
              { term: 'Variable Costs', definition: 'Costs that change in direct proportion to the level of output. Examples: raw materials, direct labour.' },
              { term: 'Semi-Variable (Mixed) Costs', definition: 'Costs with both a fixed and variable element. Example: telephone (fixed line rental + variable call charges).' },
              { term: 'Step Fixed Costs', definition: 'Fixed within a range but increase (step up) when activity exceeds that range.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Fixed Costs', html: '<p><strong>Fixed costs</strong> remain <strong>constant in total</strong> regardless of changes in output within the relevant range. However, fixed cost <strong>per unit decreases</strong> as output increases (spread over more units).</p><p>Examples: rent, insurance, depreciation (straight-line), salaries, rates.</p>' },
              { type: 'concept', variant: 'green', title: 'Variable Costs', html: '<p><strong>Variable costs</strong> change in <strong>direct proportion</strong> to output. Total variable costs increase as output increases. Variable cost <strong>per unit remains constant</strong>.</p><p>Examples: raw materials, direct wages (piece rate), packaging, carriage outwards.</p>' },
              { type: 'concept', variant: 'amber', title: 'Semi-Variable & Step Fixed', html: '<p><strong>Semi-variable:</strong> Both fixed and variable elements. E.g. telephone (fixed rental + variable calls), electricity (standing charge + usage), salesperson (basic salary + commission).</p><p><strong>Step fixed:</strong> Fixed within a range then steps up. E.g. one supervisor per 20 workers — need 3 supervisors for 41-60 workers; rent increases when bigger premises needed.</p>' },
            ]
          },
          {
            id: '21.1.2', title: 'Direct vs Indirect Costs',
            keyTerms: [
              { term: 'Direct Costs', definition: 'Costs that can be directly traced to a specific product, department, or cost centre.' },
              { term: 'Indirect Costs (Overheads)', definition: 'Costs that cannot be directly traced — must be allocated or apportioned.' },
              { term: 'Cost Centre', definition: 'A department, section, or area of the business for which costs are collected.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Direct Costs</th><th>Indirect Costs (Overheads)</th></tr></thead><tbody><tr><td>Direct materials (raw materials in the product)</td><td>Factory rent & rates</td></tr><tr><td>Direct labour (workers making the product)</td><td>Factory supervisor\'s salary</td></tr><tr><td>Direct expenses (royalties, special tools)</td><td>Depreciation of factory equipment</td></tr><tr><td></td><td>Factory insurance</td></tr><tr><td></td><td>Indirect materials (cleaning supplies, lubricants)</td></tr><tr><td></td><td>Indirect labour (maintenance workers)</td></tr></tbody></table>' },
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
              { term: 'High-Low Method', definition: 'A technique for separating mixed costs into fixed and variable components using the highest and lowest activity levels.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'High-Low Method Steps', html: '<p>1. Identify the <strong>highest</strong> and <strong>lowest</strong> activity levels and their total costs.</p><p>2. <strong>Variable cost per unit</strong> = (Highest total cost − Lowest total cost) / (Highest activity − Lowest activity)</p><p>3. <strong>Fixed cost</strong> = Total cost − (Variable cost per unit × Activity level)</p><p>Use either the high or low point to calculate fixed cost — both should give the same answer.</p>' },
              { type: 'example', title: 'Example', html: '<table class="learn-table"><thead><tr><th>Month</th><th>Units</th><th>Total Cost</th></tr></thead><tbody><tr><td>January</td><td>100</td><td>€1,500</td></tr><tr><td>February</td><td>200</td><td>€2,000</td></tr><tr><td>March</td><td>300</td><td>€2,500</td></tr></tbody></table><p>Variable cost per unit = (€2,500 − €1,500) / (300 − 100) = €1,000 / 200 = <strong>€5 per unit</strong></p><p>Fixed cost = €2,500 − (€5 × 300) = €2,500 − €1,500 = <strong>€1,000</strong></p><p>Cost equation: Total Cost = €1,000 + €5 per unit</p>' },
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
    estimatedMinutes: 28,
    related: [11, 21, 23],
    sections: [
      {
        id: '22.1', title: 'Part A: Stock Valuation',
        subTopics: [
          {
            id: '22.1.1', title: 'FIFO, LIFO & Weighted Average',
            keyTerms: [
              { term: 'FIFO', definition: 'First In, First Out — oldest stock is assumed to be sold/used first. Closing stock valued at most recent prices.' },
              { term: 'LIFO', definition: 'Last In, First Out — newest stock is assumed to be sold/used first. Closing stock valued at oldest prices.' },
              { term: 'Weighted Average', definition: 'Average cost is recalculated after each purchase. Smooths price fluctuations.' },
              { term: 'SSAP 9', definition: 'Stock should be valued at the lower of cost or net realisable value.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'FIFO', html: '<p>Issues the <strong>oldest</strong> stock first. Closing stock reflects the most <strong>recent</strong> purchase prices.</p><p>In times of rising prices: <strong>higher closing stock value → higher gross profit</strong>.</p><p>FIFO is accepted under SSAP 9 and FRS 102.</p>' },
              { type: 'concept', variant: 'green', title: 'LIFO', html: '<p>Issues the <strong>newest</strong> stock first. Closing stock reflects the <strong>oldest</strong> prices.</p><p>In times of rising prices: <strong>lower closing stock value → lower gross profit</strong> (but better cash flow as tax is lower).</p><p>LIFO is <strong>NOT</strong> acceptable under SSAP 9 / FRS 102 for published accounts, but may be used internally.</p>' },
              { type: 'concept', variant: 'amber', title: 'Weighted Average', html: '<p>A new average cost per unit is calculated after <strong>each purchase</strong>.</p><p>Weighted Average = Total cost of stock available / Total units available</p><p>Smooths out price fluctuations. Gives profit and stock values between FIFO and LIFO.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Method</th><th>Closing Stock Value</th><th>Cost of Sales</th><th>Gross Profit</th></tr></thead><tbody><tr><td>FIFO (rising prices)</td><td>Highest</td><td>Lowest</td><td>Highest</td></tr><tr><td>LIFO (rising prices)</td><td>Lowest</td><td>Highest</td><td>Lowest</td></tr><tr><td>Weighted Average</td><td>Middle</td><td>Middle</td><td>Middle</td></tr></tbody></table>' },
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
              { term: 'Absorption Costing', definition: 'All production costs (fixed and variable) are included in the cost of a product.' },
              { term: 'Overhead Absorption Rate (OAR)', definition: 'The rate at which overheads are charged to production units. OAR = Budgeted Overheads / Budgeted Activity.' },
              { term: 'Over-absorption', definition: 'Overheads charged to production exceed actual overheads — profit increases.' },
              { term: 'Under-absorption', definition: 'Overheads charged to production are less than actual overheads — profit decreases.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Absorption Costing', html: '<p>ALL production costs (fixed AND variable) are included in the cost of each unit:</p><p><strong>Direct Materials + Direct Labour + Direct Expenses + Absorbed Factory Overhead = Total Production Cost per Unit</strong></p>' },
              { type: 'concept', variant: 'blue', title: 'Overhead Absorption Rate', html: '<p><strong>OAR = Budgeted Overheads / Budgeted Activity Level</strong></p><p>Activity level can be: labour hours, machine hours, or units of production.</p><p>The OAR is applied to actual activity to calculate overheads <strong>absorbed</strong>.</p>' },
              { type: 'concept', variant: 'amber', title: 'Over/Under Absorption', html: '<p><strong>Over-absorption:</strong> Overheads absorbed > Actual overheads. Too much charged to products — the excess is <strong>added back to profit</strong>.</p><p><strong>Under-absorption:</strong> Overheads absorbed < Actual overheads. Not enough charged — the shortfall is <strong>deducted from profit</strong>.</p>' },
            ]
          },
          {
            id: '22.2.2', title: 'Overhead Apportionment & Allocation',
            body: [
              { type: 'concept', variant: 'blue', title: 'Steps in Overhead Recovery', html: '<p>1. <strong>Allocation:</strong> Assign overheads directly to departments where possible.</p><p>2. <strong>Apportionment:</strong> Share common overheads using a fair basis (floor area, asset values, headcount).</p><p>3. <strong>Reapportionment:</strong> Transfer service department costs to production departments.</p><p>4. <strong>Absorption:</strong> Charge production department overheads to products using the OAR.</p>' },
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
    estimatedMinutes: 25,
    related: [21, 22, 24],
    sections: [
      {
        id: '23.1', title: 'Marginal Costing',
        subTopics: [
          {
            id: '23.1.1', title: 'Key Concepts',
            keyTerms: [
              { term: 'Marginal Costing', definition: 'Only variable costs are charged to products. Fixed costs are treated as period costs — charged in full to the P&L.' },
              { term: 'Contribution', definition: 'Sales Revenue − Variable Costs. The amount available to contribute towards fixed costs and then profit.' },
              { term: 'Marginal Cost', definition: 'The cost of producing one additional unit — equals the variable cost per unit.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Marginal Costing Approach', html: '<p>Only <strong>variable costs</strong> are charged to products. Fixed costs are <strong>period costs</strong> — charged in full to the P&L for the period, not to individual products.</p><p><strong>Contribution = Sales − Variable Costs</strong></p><p><strong>Profit = Total Contribution − Fixed Costs</strong></p>' },
              { type: 'concept', variant: 'green', title: 'Marginal Costing Income Statement', html: '<p>Sales Revenue<br/>Less: Variable Costs (materials, labour, variable overheads)<br/>= <strong>Contribution</strong><br/>Less: Fixed Costs<br/>= <strong>Profit/Loss</strong></p>' },
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
              { term: 'Break-Even Point (BEP)', definition: 'The level of output/sales where total revenue equals total costs. No profit, no loss. Contribution = Fixed costs.' },
              { term: 'Margin of Safety', definition: 'Actual/budgeted sales minus break-even sales. The amount by which sales can fall before a loss is made.' },
              { term: 'C/S Ratio', definition: 'Contribution / Sales × 100. The percentage of each euro of sales that goes towards contribution.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Break-Even Formulas', html: '<p><strong>BEP (units)</strong> = Fixed Costs / Contribution per unit</p><p><strong>BEP (sales value)</strong> = Fixed Costs / C/S Ratio</p><p><strong>C/S Ratio</strong> = (Contribution per unit / Selling price) × 100</p><p><strong>Margin of Safety (units)</strong> = Actual sales − Break-even sales</p><p><strong>Margin of Safety (%)</strong> = (Margin of Safety / Actual sales) × 100</p><p><strong>Target Profit (units)</strong> = (Fixed Costs + Target Profit) / Contribution per unit</p>' },
              { type: 'example', title: 'Break-Even Example', html: '<p>Selling price: €50. Variable cost: €30. Fixed costs: €100,000.</p><p>Contribution per unit = €50 − €30 = €20</p><p>BEP = €100,000 / €20 = <strong>5,000 units</strong></p><p>BEP (sales) = 5,000 × €50 = <strong>€250,000</strong></p><p>If actual sales = 7,000 units, Margin of Safety = 7,000 − 5,000 = <strong>2,000 units (28.6%)</strong></p>' },
            ]
          },
        ]
      },
      {
        id: '23.3', title: 'Marginal vs Absorption Costing',
        subTopics: [
          {
            id: '23.3.1', title: 'Profit Differences',
            body: [
              { type: 'concept', variant: 'amber', title: 'When Do Profits Differ?', html: '<p>Profits differ when <strong>production ≠ sales</strong> (i.e. stock levels change):</p><p><strong>Production > Sales (stock increases):</strong> Absorption profit > Marginal profit. (Fixed costs deferred in closing stock under absorption.)</p><p><strong>Production < Sales (stock decreases):</strong> Marginal profit > Absorption profit. (Fixed costs released from opening stock under absorption.)</p><p><strong>Production = Sales (no stock change):</strong> Both give the <strong>same profit</strong>.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Situation</th><th>Higher Profit Under</th><th>Reason</th></tr></thead><tbody><tr><td>Stock increases</td><td>Absorption</td><td>Fixed costs "hidden" in closing stock</td></tr><tr><td>Stock decreases</td><td>Marginal</td><td>Fixed costs from last year released</td></tr><tr><td>No stock change</td><td>Same</td><td>Same fixed costs charged to P&L</td></tr></tbody></table>' },
            ]
          },
          {
            id: '23.3.2', title: 'Special Decision-Making',
            body: [
              { type: 'concept', variant: 'blue', title: 'When to Use Marginal Costing', html: '<p>Marginal costing is useful for short-term decisions:</p><p>1. <strong>Accept or reject a special order</strong> — accept if the price exceeds variable cost (positive contribution) and there is spare capacity.</p><p>2. <strong>Make or buy</strong> — compare variable cost of making with purchase price.</p><p>3. <strong>Continue or discontinue a product/department</strong> — continue if it makes a positive contribution to fixed costs.</p><p>4. <strong>Limiting factor decisions</strong> — rank products by contribution per unit of the scarce resource.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 24, block: 'D',
    title: 'Budgeting & Budgetary Control',
    description: 'Manufacturing budgets, cash budgets, flexible budgets, variances, sensitivity analysis.',
    estimatedMinutes: 35,
    related: [20, 21, 23],
    sections: [
      {
        id: '24.1', title: 'Part A: Manufacturing Budgets',
        subTopics: [
          {
            id: '24.1.1', title: 'Budget Preparation',
            keyTerms: [
              { term: 'Budget', definition: 'A financial plan or forecast for a future period, expressed in quantitative terms.' },
              { term: 'Master Budget', definition: 'A summary of all individual budgets — includes budgeted manufacturing, trading, P&L, and balance sheet.' },
              { term: 'Principal Budget Factor', definition: 'The limiting factor that restricts output. Usually sales demand, but could be materials, labour, or capacity.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Advantages of Budgeting', html: '<p>1. <strong>Planning</strong> — forces managers to plan ahead.</p><p>2. <strong>Co-ordination</strong> — ensures all departments work towards common goals.</p><p>3. <strong>Communication</strong> — targets communicated to all staff.</p><p>4. <strong>Motivation</strong> — gives staff targets to achieve.</p><p>5. <strong>Control</strong> — enables comparison of actual vs budgeted performance.</p><p>6. <strong>Evaluation</strong> — provides a basis for performance assessment.</p>' },
              { type: 'concept', variant: 'green', title: 'Budget Sequence', html: '<p><strong>Sales Budget</strong> (start with the principal budget factor)<br/>→ <strong>Production Budget</strong> (units to produce)<br/>→ <strong>Materials Budget</strong> (raw materials needed)<br/>→ <strong>Labour Budget</strong> (labour hours and cost)<br/>→ <strong>Overhead Budget</strong> (fixed and variable overheads)<br/>→ <strong>Master Budget</strong> (budgeted P&L and Balance Sheet)</p><p><strong>Production required = Budgeted sales + Desired closing stock − Opening stock</strong></p>' },
            ]
          },
          {
            id: '24.1.2', title: 'Types of Budgets',
            keyTerms: [
              { term: 'Fixed Budget', definition: 'A budget prepared for one level of activity only. Does not adjust for actual output.' },
              { term: 'Flexible Budget', definition: 'A budget adjusted to the actual level of activity for meaningful comparison.' },
              { term: 'Zero-Based Budget', definition: 'Every item must be justified from scratch each period — no automatic carry-forward of previous budgets.' },
              { term: 'Incremental Budget', definition: 'Based on previous year\'s figures with adjustments for expected changes.' },
            ],
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Type</th><th>Description</th><th>Advantage</th><th>Disadvantage</th></tr></thead><tbody><tr><td><strong>Fixed</strong></td><td>One level of activity</td><td>Simple to prepare</td><td>Unfair comparison if activity differs</td></tr><tr><td><strong>Flexible</strong></td><td>Adjusted to actual activity</td><td>Fair comparison, meaningful variances</td><td>More complex to prepare</td></tr><tr><td><strong>Zero-based</strong></td><td>Justify every item from zero</td><td>Eliminates waste, challenges assumptions</td><td>Time-consuming, costly</td></tr><tr><td><strong>Incremental</strong></td><td>Last year + adjustments</td><td>Quick and easy</td><td>May perpetuate inefficiencies</td></tr></tbody></table>' },
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
              { term: 'Cash Budget', definition: 'A forecast of cash inflows and outflows over a period, showing expected cash surpluses or deficits.' },
              { term: 'Capital Budget', definition: 'Deals with planned capital expenditure and capital receipts — responsibility of board of directors.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Cash Budget Format', html: '<p><strong>Receipts:</strong><br/>Cash sales<br/>Receipts from debtors (allowing for credit period)<br/>Other income (rent received, interest)<br/>Sale of assets<br/>= <strong>Total Receipts</strong></p><p><strong>Payments:</strong><br/>Cash purchases<br/>Payments to creditors (allowing for credit period)<br/>Wages & salaries<br/>Overheads<br/>Capital expenditure<br/>Tax payments<br/>Loan repayments<br/>Dividends<br/>= <strong>Total Payments</strong></p><p><strong>Net Cash Flow</strong> = Total Receipts − Total Payments<br/>+ Opening Balance<br/>= <strong>Closing Balance</strong></p>' },
              { type: 'watchout', title: 'Cash vs Profit', html: '<p>Cash budgets deal with <strong>cash movements only</strong>. Items that do NOT appear: depreciation, bad debts, provisions, accruals. Items that DO appear: capital expenditure, loan repayments, dividends (when paid).</p>' },
            ]
          },
          {
            id: '24.2.2', title: 'Dealing with Credit Periods',
            body: [
              { type: 'concept', variant: 'green', title: 'Credit Period Adjustments', html: '<p>If customers take <strong>2 months credit</strong>: January\'s sales are received as cash in <strong>March</strong>.</p><p>If we take <strong>1 month credit</strong> from suppliers: January\'s purchases are paid in <strong>February</strong>.</p><p>These timing differences are critical in cash budgets.</p>' },
              { type: 'concept', variant: 'amber', title: 'Advice from Cash Budgets', html: '<p><strong>Cash surplus:</strong> Invest short-term, pay off loans early, purchase fixed assets, increase dividends.</p><p><strong>Cash deficit:</strong> Arrange overdraft facility, encourage faster debtor payment (offer discounts), negotiate longer credit from suppliers, lease instead of buying, delay non-essential purchases, factor debts.</p>' },
            ]
          },
        ]
      },
      {
        id: '24.3', title: 'Part C: Flexible Budgets & Variances (HL)',
        subTopics: [
          {
            id: '24.3.1', title: 'Flexible Budgets',
            keyTerms: [
              { term: 'Flexible Budget', definition: 'A budget prepared at the SAME level of activity as actual results, allowing valid comparison and meaningful variance identification.' },
              { term: 'Adverse Variance', definition: 'When actual costs exceed budgeted costs or actual revenue falls below budgeted revenue.' },
              { term: 'Favourable Variance', definition: 'When actual costs are less than budgeted costs or actual revenue exceeds budgeted revenue.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Why Flexible Budgets?', html: '<p>It is <strong>misleading</strong> to compare budgeted costs at one level of activity with actual costs at a different level. Variable costs naturally change with output — this is expected, not an inefficiency.</p><p>Flexible budgets allow comparison at the <strong>same level of activity</strong>, making variances meaningful and actionable.</p>' },
              { type: 'example', title: 'Flexible Budget Example', html: '<table class="learn-table"><thead><tr><th></th><th>Fixed Budget (1,000 units)</th><th>Flexible Budget (800 units)</th><th>Actual (800 units)</th><th>Variance</th></tr></thead><tbody><tr><td>Sales</td><td>50,000</td><td>40,000</td><td>38,000</td><td>2,000 (A)</td></tr><tr><td>Materials</td><td>20,000</td><td>16,000</td><td>17,500</td><td>1,500 (A)</td></tr><tr><td>Labour</td><td>10,000</td><td>8,000</td><td>7,800</td><td>200 (F)</td></tr><tr><td>Fixed O/H</td><td>10,000</td><td>10,000</td><td>10,200</td><td>200 (A)</td></tr></tbody></table><p>(A) = Adverse, (F) = Favourable. Note: fixed costs stay the same in the flexible budget.</p>' },
            ]
          },
          {
            id: '24.3.2', title: 'Variance Analysis & Sensitivity',
            keyTerms: [
              { term: 'Controllable Costs', definition: 'Costs that can be influenced by the manager of a cost centre.' },
              { term: 'Uncontrollable Costs', definition: 'Costs over which the manager has no control — e.g. rent set by head office.' },
              { term: 'Sensitivity Analysis', definition: 'Also known as "what if" analysis — shows the effect on profit from changes in selling price, volume, variable costs, or fixed costs.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Investigating Variances', html: '<p>Not all variances need investigation. Focus on variances that are:</p><p>1. <strong>Significant</strong> — large in absolute or percentage terms.</p><p>2. <strong>Controllable</strong> — the manager can take action.</p><p>3. <strong>Recurring</strong> — happening repeatedly, not a one-off.</p>' },
              { type: 'concept', variant: 'amber', title: 'Sensitivity Analysis (What-If)', html: '<p>Sensitivity analysis examines how changes in key variables affect profit:</p><p>1. What if selling price decreases by 10%?</p><p>2. What if sales volume falls by 15%?</p><p>3. What if variable costs increase by 5%?</p><p>4. What if fixed costs increase by €20,000?</p><p>The variable with the <strong>biggest impact</strong> on profit is the most <strong>sensitive</strong> factor — this is where management should focus attention.</p>' },
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
