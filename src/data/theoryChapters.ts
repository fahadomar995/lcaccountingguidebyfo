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
              { type: 'concept', variant: 'blue', title: 'Capital Expenditure', html: '<p>Money spent on acquiring or improving <strong>fixed assets</strong>. Recorded in the <strong>Balance Sheet</strong>. Examples: purchase of premises, machinery, delivery vans, extensions to buildings.</p>' },
              { type: 'concept', variant: 'green', title: 'Revenue Expenditure', html: '<p>Day-to-day running costs of the business. Recorded in the <strong>Profit and Loss Account</strong>. Examples: wages, rent, insurance, advertising, repairs, electricity.</p>' },
              { type: 'watchout', title: 'Common Trap', html: '<p>An <strong>extension</strong> to premises is capital expenditure (improves the asset). <strong>Repairs</strong> to premises is revenue expenditure (maintains the asset). If the wrong classification is used, this is an <strong>error of principle</strong>.</p>' },
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
              { term: 'PAYE', definition: 'Pay As You Earn — income tax deducted from employees\' wages as they are paid.' },
              { term: 'PRSI', definition: 'Pay Related Social Insurance — amounts payable by employees and employers to cover state pension entitlements.' },
              { term: 'USC', definition: 'Universal Social Charge — a tax paid by employees, deducted at source by the employer.' },
            ],
            body: [
              { type: 'prose', html: '<p>Statutory deductions are the <strong>compulsory deductions</strong> that must be made by employers when paying employees\' wages.</p>' },
              { type: 'concept', variant: 'blue', title: 'PAYE', html: '<p>A system of deducting income tax from employees\' wages as they are paid. The employer uses tax certificates to deduct the correct amount after applying tax credits. Treatment: Dr Wages, Cr PAYE Account.</p>' },
              { type: 'concept', variant: 'green', title: 'PRSI & USC', html: '<p>PRSI is payable by <strong>both</strong> employee and employer. Employee PRSI is deducted from wages. <strong>Employer\'s PRSI is an additional cost</strong> to the employer — NOT deducted from the employee\'s pay. USC is deducted at source.</p><p>Treatment: Dr Wages, Cr PRSI/USC Account.</p>' },
              { type: 'example', title: 'Wages Calculation', html: '<table class="learn-table"><thead><tr><th>Item</th><th>Amount</th></tr></thead><tbody><tr><td>Gross Wages</td><td>46,000</td></tr><tr><td>Less PAYE</td><td>(12,000)</td></tr><tr><td>Less PRSI (Employee)</td><td>(4,000)</td></tr><tr><td>Less Pension</td><td>(5,000)</td></tr><tr class="total-row"><td><strong>Net Wages (paid to employee)</strong></td><td><strong>25,000</strong></td></tr><tr><td>Add Employer\'s PRSI</td><td>2,500</td></tr><tr class="total-row"><td><strong>Total Cost to Employer</strong></td><td><strong>48,500</strong></td></tr></tbody></table>' },
              { type: 'watchout', title: 'Balance Sheet Treatment', html: '<p>PAYE and PRSI/USC due at year end are shown as a <strong>current liability</strong> (Creditors: amounts falling due within one year).</p>' },
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
              { term: 'Accrual', definition: 'An expense incurred but not yet paid at year end. Added to expense in P&L, shown as current liability.' },
              { term: 'Prepayment', definition: 'An expense paid but not yet incurred — relates to next period. Deducted from expense in P&L, shown as current asset.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Accruals (Amounts Due)', html: '<p>An expense that has been <strong>incurred but not yet paid</strong> at the year end. It must be added to the expense in the P&L and shown as a <strong>current liability</strong> in the Balance Sheet.</p>' },
              { type: 'concept', variant: 'green', title: 'Prepayments (Amounts Paid in Advance)', html: '<p>An expense that has been <strong>paid but not yet incurred</strong>. It must be deducted from the expense in the P&L and shown as a <strong>current asset</strong> in the Balance Sheet.</p>' },
              { type: 'examtip', title: 'Exam Tip', html: '<p>When calculating adjustments, always be careful with accruals and prepayments. Count the number of months that belong to <strong>this</strong> year vs the <strong>next</strong> year.</p>' },
            ]
          },
        ]
      },
      {
        id: '2.5', title: 'Part E: Bad Debts & Provisions',
        subTopics: [
          {
            id: '2.5.1', title: 'Bad Debts & Provision for Bad Debts',
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
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK B — FINAL ACCOUNTS & ERRORS (Chapters 6-12)
  // ──────────────────────────────────────────────────
  {
    id: 6, block: 'B',
    title: 'Final Accounts — Sole Trader',
    description: 'Trading, Profit & Loss Account, Balance Sheet, basic and advanced adjustments.',
    estimatedMinutes: 30,
    related: [2, 4, 7, 9],
    sections: [
      {
        id: '6.1', title: 'The Sole Trader & Final Accounts',
        subTopics: [
          {
            id: '6.1.1', title: 'Structure of Final Accounts',
            keyTerms: [
              { term: 'Sole Trader', definition: 'A business owned by one person. The owner has unlimited liability.' },
              { term: 'Trading Account', definition: 'Calculates gross profit by matching sales revenue against cost of goods sold.' },
              { term: 'Gross Profit', definition: 'Sales minus Cost of Sales.' },
              { term: 'Net Profit', definition: 'Gross Profit plus other income minus expenses.' },
            ],
            body: [
              { type: 'prose', html: '<p>A sole trader is a business owned by one person. The final accounts consist of a Trading, Profit and Loss Account and a Balance Sheet.</p>' },
              { type: 'concept', variant: 'green', title: 'Trading Account — Gross Profit', html: '<p><strong>Gross Profit = Sales − Cost of Sales</strong></p><p>Cost of Sales = Opening Stock + Purchases − Closing Stock</p><p>Carriage inwards and customs duties are added to purchases. Carriage outwards is a P&L expense.</p>' },
              { type: 'concept', variant: 'blue', title: 'Profit and Loss Account — Net Profit', html: '<p>Gross Profit + Other Income (discount received, reduction in provision) − Expenses (wages, rent, insurance, depreciation, bad debts, increase in provision) = <strong>Net Profit</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'Balance Sheet Structure', html: '<p><strong>Fixed Assets</strong> (at cost less depreciation)<br/>+ <strong>Current Assets</strong> (stock, debtors, prepayments, bank, cash)<br/>− <strong>Current Liabilities</strong> (creditors, accruals, bank overdraft)<br/>= <strong>Net Assets</strong></p><p>Financed by: Capital + Net Profit − Drawings</p>' },
            ]
          },
        ]
      },
      {
        id: '6.2', title: 'Adjustments to Final Accounts',
        subTopics: [
          {
            id: '6.2.1', title: 'Basic Adjustments',
            body: [
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Adjustment</th><th>P&L Effect</th><th>Balance Sheet Effect</th></tr></thead><tbody><tr><td>Closing stock</td><td>Deducted in Trading A/C</td><td>Current asset</td></tr><tr><td>Accrual (expense due)</td><td>Add to expense</td><td>Current liability</td></tr><tr><td>Prepayment (paid in advance)</td><td>Deduct from expense</td><td>Current asset</td></tr><tr><td>Depreciation</td><td>Expense in P&L</td><td>Deducted from fixed asset</td></tr><tr><td>Bad debt write-off</td><td>Expense in P&L</td><td>Reduce debtors</td></tr><tr><td>Increase in provision</td><td>Expense in P&L</td><td>Deduct new provision from debtors</td></tr><tr><td>Decrease in provision</td><td>Other income</td><td>Deduct new provision from debtors</td></tr><tr><td>Drawings of stock</td><td>Deduct from purchases</td><td>Add to drawings</td></tr></tbody></table>' },
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
    estimatedMinutes: 25,
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
              { type: 'concept', variant: 'red', title: 'Six Errors Not Revealed by TB', html: '<table class="learn-table"><tbody><tr><td><strong>Omission</strong></td><td>Transaction completely left out</td></tr><tr><td><strong>Commission</strong></td><td>Right amount, right type, wrong person</td></tr><tr><td><strong>Principle</strong></td><td>Wrong class of account</td></tr><tr><td><strong>Original Entry</strong></td><td>Wrong amount on both sides</td></tr><tr><td><strong>Compensating</strong></td><td>Two errors cancel out</td></tr><tr><td><strong>Complete Reversal</strong></td><td>Debit and credit swapped</td></tr></tbody></table>' },
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
              { type: 'concept', variant: 'blue', title: 'When is a Suspense Account Used?', html: '<p>When the trial balance does not balance, the difference is placed in a <strong>Suspense Account</strong>. As each error is found and corrected, the suspense account balance is reduced until it reaches zero.</p>' },
              { type: 'concept', variant: 'green', title: 'Correction Steps', html: '<p>1. Identify what was done <strong>wrong</strong><br/>2. Determine what <strong>should</strong> have been done<br/>3. Write the journal entry to <strong>correct</strong> it<br/>4. If the TB was affected, involve the <strong>Suspense Account</strong></p>' },
              { type: 'concept', variant: 'amber', title: 'After Corrections', html: '<p>A <strong>Statement of Revised Profit</strong> adjusts the original net profit for corrections that affect the P&L Account.</p><p>A <strong>Corrected Balance Sheet</strong> is then prepared with all corrections applied.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 8, block: 'B',
    title: 'Regulatory Framework of Accounting',
    description: 'Accounting obligations, regulatory agencies, the audit process.',
    estimatedMinutes: 12,
    related: [1, 10],
    sections: [
      {
        id: '8.1', title: 'Accounting Obligations & Regulation',
        subTopics: [
          {
            id: '8.1.1', title: 'Obligations, Agencies & Audit',
            keyTerms: [
              { term: 'Companies Act', definition: 'Legislation requiring companies to keep proper books of account and prepare annual financial statements.' },
              { term: 'Audit', definition: 'An independent examination of financial statements to verify they give a true and fair view.' },
              { term: 'Financial Reporting Standards (FRS)', definition: 'Rules issued by accounting standard-setting bodies that prescribe how items should be treated in financial statements.' },
              { term: 'IAASA', definition: 'Irish Auditing and Accounting Supervisory Authority — oversees the regulation of auditors and accountants in Ireland.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Accounting Obligations', html: '<p>Under the <strong>Companies Act</strong>, every company must keep proper books of account and prepare annual financial statements that give a <strong>true and fair view</strong> of the company\'s financial position.</p>' },
              { type: 'concept', variant: 'green', title: 'Regulatory Agencies', html: '<p><strong>Financial Reporting Council (FRC)</strong> — sets accounting and auditing standards in the UK and Ireland.</p><p><strong>IAASA</strong> — oversees the regulation of auditors and accountants in Ireland.</p><p><strong>Chartered Accountants Ireland (CAI)</strong> and other professional bodies — set ethical and professional standards for members.</p>' },
              { type: 'concept', variant: 'amber', title: 'The Audit', html: '<p>An <strong>audit</strong> is an independent examination of financial statements by a qualified auditor. The auditor verifies that the accounts give a true and fair view and are prepared in accordance with the Companies Act and applicable accounting standards.</p><p>The auditor issues an <strong>audit report</strong> expressing an opinion on the financial statements.</p>' },
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
    estimatedMinutes: 35,
    related: [6, 10, 17, 18],
    sections: [
      {
        id: '9.1', title: 'Limited Companies',
        subTopics: [
          {
            id: '9.1.1', title: 'Features & Sources of Finance',
            keyTerms: [
              { term: 'Limited Company', definition: 'A separate legal entity from its owners (shareholders). Shareholders have limited liability.' },
              { term: 'Authorised Share Capital', definition: 'The maximum amount of share capital a company is authorised to issue.' },
              { term: 'Issued Share Capital', definition: 'The amount of share capital actually issued to shareholders.' },
              { term: 'Ordinary Shares', definition: 'Shares that carry voting rights and receive dividends after preference shareholders. Higher risk but potentially higher return.' },
              { term: 'Preference Shares', definition: 'Shares that receive a fixed rate dividend before ordinary shareholders. Lower risk but limited return.' },
              { term: 'Debentures', definition: 'Long-term loans to the company. Debenture holders are creditors, not owners. Interest must be paid regardless of profit.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Limited Company Features', html: '<p>A limited company is a <strong>separate legal entity</strong> from its owners. Shareholders have <strong>limited liability</strong> — they can only lose the amount they invested. The company can sue and be sued in its own name.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Source of Finance</th><th>Description</th></tr></thead><tbody><tr><td><strong>Ordinary shares</strong></td><td>Voting rights, variable dividend, highest risk</td></tr><tr><td><strong>Preference shares</strong></td><td>Fixed dividend, paid before ordinary, no voting rights</td></tr><tr><td><strong>Debentures</strong></td><td>Long-term loans, fixed interest, must be repaid, holders are creditors</td></tr><tr><td><strong>Retained profits</strong></td><td>Profits not distributed as dividends, cheapest source of finance</td></tr></tbody></table>' },
            ]
          },
        ]
      },
      {
        id: '9.2', title: 'The Accounts',
        subTopics: [
          {
            id: '9.2.1', title: 'Appropriation Account & Balance Sheet',
            keyTerms: [
              { term: 'Appropriation Account', definition: 'Shows how the net profit of a company is distributed — corporation tax, dividends, transfers to reserves, retained profit.' },
              { term: 'Corporation Tax', definition: 'Tax on the profits of a company.' },
              { term: 'Interim Dividend', definition: 'A dividend paid during the financial year.' },
              { term: 'Final Dividend', definition: 'A dividend declared at the end of the financial year.' },
            ],
            body: [
              { type: 'concept', variant: 'green', title: 'Appropriation Account Structure', html: '<p>Net Profit (from P&L)<br/>Less: Corporation Tax<br/>= Profit after Tax<br/>Less: Preference Dividend (interim + final)<br/>Less: Ordinary Dividend (interim + final)<br/>Less: Transfer to General Reserve<br/>= <strong>Retained Profit for Year</strong><br/>Add: Balance from last year<br/>= <strong>Balance carried forward</strong></p>' },
              { type: 'concept', variant: 'blue', title: 'Company Balance Sheet — Capital Section', html: '<p><strong>Authorised Share Capital</strong> (shown for information)<br/><strong>Issued Share Capital</strong> (ordinary + preference at par)<br/>+ <strong>Share Premium</strong> (amount received above par value)<br/>+ <strong>Revaluation Reserve</strong><br/>+ <strong>General Reserve</strong><br/>+ <strong>Profit and Loss Balance</strong><br/>= <strong>Total Shareholders\' Funds</strong></p>' },
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
    estimatedMinutes: 20,
    related: [8, 9, 17, 18],
    sections: [
      {
        id: '10.1', title: 'Published Financial Statements',
        subTopics: [
          {
            id: '10.1.1', title: 'Directors, Templates & Notes',
            keyTerms: [
              { term: 'Directors\' Report', definition: 'A report by the directors covering the state of affairs, principal activities, dividends, and future plans.' },
              { term: 'FRS 102', definition: 'The Financial Reporting Standard applicable in the UK and Republic of Ireland — the main standard for preparing financial statements.' },
              { term: 'Explanatory Notes', definition: 'Notes to the accounts providing additional detail on items in the financial statements.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Published Accounts', html: '<p>Limited companies must prepare published accounts in a prescribed format. These include: a Directors\' Report, a Profit and Loss Account, a Balance Sheet, a Cash Flow Statement, and Notes to the Accounts.</p>' },
              { type: 'concept', variant: 'green', title: 'Key Notes Required', html: '<p><strong>Note 1:</strong> Accounting policies (depreciation method, stock valuation method).<br/><strong>Note 2:</strong> Operating profit (showing items deducted: depreciation, audit fee, directors\' remuneration).<br/><strong>Note 3:</strong> Fixed assets schedule (cost, depreciation, NBV).<br/><strong>Note 4:</strong> Debtors breakdown.<br/><strong>Note 5:</strong> Creditors breakdown.</p>' },
            ]
          },
        ]
      },
    ]
  },

  {
    id: 11, block: 'B',
    title: 'Manufacturing Accounts',
    description: 'Prime cost, factory overhead, cost of manufacture, work in progress.',
    estimatedMinutes: 25,
    related: [6, 9, 21, 22],
    sections: [
      {
        id: '11.1', title: 'Manufacturing Account Structure',
        subTopics: [
          {
            id: '11.1.1', title: 'Costs of Manufacture',
            keyTerms: [
              { term: 'Prime Cost', definition: 'Direct Materials + Direct Labour + Direct Expenses — the directly attributable costs of production.' },
              { term: 'Factory Overhead', definition: 'Indirect costs of manufacturing — factory rent, light & heat, factory insurance, indirect materials and labour.' },
              { term: 'Cost of Manufacture (Production Cost)', definition: 'Prime Cost + Factory Overhead, adjusted for Work in Progress.' },
              { term: 'Work in Progress (WIP)', definition: 'Goods that have been started but not yet completed at the end of the period.' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Manufacturing Account Layout', html: '<p><strong>Direct Materials:</strong><br/>Opening stock of raw materials<br/>+ Purchases of raw materials<br/>− Closing stock of raw materials<br/>= Materials consumed</p><p><strong>+ Direct Labour</strong> (factory wages)<br/><strong>+ Direct Expenses</strong> (royalties, etc.)<br/>= <strong>Prime Cost</strong></p><p><strong>+ Factory Overhead:</strong><br/>Factory rent, light & heat, insurance, depreciation of factory equipment, indirect materials & labour<br/>= <strong>Factory Cost of Production</strong></p><p><strong>+ Opening WIP</strong><br/><strong>− Closing WIP</strong><br/>= <strong>Cost of Manufacture</strong> (transferred to Trading Account)</p>' },
              { type: 'watchout', title: 'Apportionment', html: '<p>Some expenses (rent, insurance, light & heat) must be <strong>apportioned</strong> between factory and office based on floor area, usage, or another fair basis. Only the factory portion goes in the Manufacturing Account.</p>' },
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
    estimatedMinutes: 14,
    related: [6, 11, 22],
    sections: [
      {
        id: '12.1', title: 'Departmental Accounts',
        subTopics: [
          {
            id: '12.1.1', title: 'Allocation & Apportionment',
            keyTerms: [
              { term: 'Allocation', definition: 'Assigning an expense directly to a specific department when it can be identified as belonging to that department.' },
              { term: 'Apportionment', definition: 'Sharing a common expense between departments on a fair basis (floor area, sales ratio, number of employees).' },
            ],
            body: [
              { type: 'concept', variant: 'blue', title: 'Departmental Accounts', html: '<p>When a business has multiple departments, it may wish to calculate the profit/loss of each department separately. This requires <strong>allocating</strong> directly identifiable costs and <strong>apportioning</strong> shared costs.</p>' },
              { type: 'table', html: '<table class="learn-table"><thead><tr><th>Expense</th><th>Basis of Apportionment</th></tr></thead><tbody><tr><td>Rent, rates, insurance, light & heat</td><td>Floor area</td></tr><tr><td>Advertising</td><td>Sales ratio</td></tr><tr><td>Canteen expenses</td><td>Number of employees</td></tr><tr><td>Depreciation</td><td>Value of assets in each department</td></tr></tbody></table>' },
            ]
          },
        ]
      },
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK C — OTHER ENTITIES & INTERPRETATION (Chapters 13-19)
  // ──────────────────────────────────────────────────
  {
    id: 13, block: 'C',
    title: 'Club Accounts',
    description: 'Receipts & payments account, income & expenditure account, accumulated fund, bar trading.',
    estimatedMinutes: 22,
    related: [6, 14],
    sections: [
      { id: '13.1', title: 'Club Accounts Structure', subTopics: [
        { id: '13.1.1', title: 'Receipts & Payments vs Income & Expenditure', keyTerms: [
          { term: 'Receipts & Payments Account', definition: 'A summary of cash transactions — similar to a cash book. Shows opening and closing bank balance.' },
          { term: 'Income & Expenditure Account', definition: 'The club equivalent of a P&L account. Shows surplus or deficit for the period based on accruals concept.' },
          { term: 'Accumulated Fund', definition: 'The club equivalent of capital — the net assets of the club at the start of the period.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Two Types of Account', html: '<p><strong>Receipts & Payments Account:</strong> A simple cash summary. Records all cash received and paid regardless of which period it belongs to.</p><p><strong>Income & Expenditure Account:</strong> Prepared on the <strong>accruals basis</strong>. Only includes income earned and expenses incurred during the period. Shows a <strong>surplus</strong> (income > expenditure) or <strong>deficit</strong> (expenditure > income).</p>' },
          { type: 'concept', variant: 'green', title: 'Special Club Income', html: '<p><strong>Subscriptions:</strong> Main source of income. Must be adjusted for prepaid and accrued amounts.<br/><strong>Life membership:</strong> Spread over expected membership years.<br/><strong>Entrance fees:</strong> Usually treated as income in year received.<br/><strong>Government grants:</strong> May need to be spread over years.<br/><strong>Bar/shop trading account:</strong> Separate trading account prepared; only the profit/loss is transferred to I&E.</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 14, block: 'C',
    title: 'Service Firms\' Accounts',
    description: 'Fee income, work in progress for service firms, HL adjustments.',
    estimatedMinutes: 16,
    related: [6, 13],
    sections: [
      { id: '14.1', title: 'Service Firm Accounts', subTopics: [
        { id: '14.1.1', title: 'Structure & Adjustments', keyTerms: [
          { term: 'Service Firm', definition: 'A business that provides services rather than selling goods — e.g. solicitors, accountants, architects.' },
          { term: 'Fee Income', definition: 'The main revenue source for service firms — fees charged for services rendered.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Key Differences', html: '<p>Service firms do <strong>not</strong> have a Trading Account (no cost of sales). Their main income is <strong>fees</strong>. The P&L starts with fee income and deducts expenses to calculate net profit.</p><p>At HL, adjustments include: fees accrued/prepaid, work in progress for services, provision for bad debts on fee debtors.</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 15, block: 'C',
    title: 'Farm Accounts',
    description: 'Enterprise analysis, stock valuation, terms associated with farm accounting.',
    estimatedMinutes: 14,
    related: [6, 21],
    sections: [
      { id: '15.1', title: 'Farm Accounts', subTopics: [
        { id: '15.1.1', title: 'Structure & Terminology', keyTerms: [
          { term: 'Enterprise Analysis', definition: 'Preparing separate accounts for each farm enterprise (cattle, crops, etc.) to assess profitability.' },
          { term: 'Appreciation', definition: 'The natural increase in the value of livestock as they grow older/heavier.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Farm Accounts', html: '<p>Farm accounts follow the same principles as sole trader accounts but include specific items: livestock valuation (based on market value), appreciation of stock, enterprise analysis for different farming activities (cattle, crops, dairy).</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 16, block: 'C',
    title: 'Incomplete Records',
    description: 'Control account/cash method, net worth/balance sheet method, mark-up and margin.',
    estimatedMinutes: 22,
    related: [2, 5, 6],
    sections: [
      { id: '16.1', title: 'Methods of Incomplete Records', subTopics: [
        { id: '16.1.1', title: 'Control Account Method & Net Worth Method', keyTerms: [
          { term: 'Incomplete Records', definition: 'When a business does not keep a complete set of accounting records. Missing figures must be reconstructed.' },
          { term: 'Mark-up', definition: 'Profit as a percentage of cost price. Mark-up of 25% on cost of €100 = selling price of €125.' },
          { term: 'Margin', definition: 'Profit as a percentage of selling price. Margin of 20% on sales of €125 = profit of €25.' },
          { term: 'Net Worth Method', definition: 'Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Method 1: Control Account / Cash Method', html: '<p>Use control accounts to reconstruct missing figures. For example, if total sales are unknown, prepare a <strong>debtors control account</strong> with known opening/closing balances and cash received to calculate credit sales.</p>' },
          { type: 'concept', variant: 'green', title: 'Method 2: Net Worth / Balance Sheet Method', html: '<p><strong>Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced</strong></p><p>Opening Capital = Opening Assets − Opening Liabilities.</p>' },
          { type: 'concept', variant: 'amber', title: 'Mark-up vs Margin', html: '<p><strong>Mark-up</strong> = Profit / Cost Price × 100<br/><strong>Margin</strong> = Profit / Selling Price × 100</p><p>If mark-up is 1/3 on cost: Cost = 3 parts, Profit = 1 part, Sales = 4 parts.</p><p>If margin is 1/4 on sales: Sales = 4 parts, Profit = 1 part, Cost = 3 parts.</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 17, block: 'C',
    title: 'Cash Flow Statements',
    description: 'FRS 1 (Revised), operating activities, reconciliation notes, indirect method.',
    estimatedMinutes: 25,
    related: [9, 10, 18],
    sections: [
      { id: '17.1', title: 'Cash Flow Statement Structure', subTopics: [
        { id: '17.1.1', title: 'FRS 1 Format & Preparation', keyTerms: [
          { term: 'Cash Flow Statement', definition: 'A financial statement showing the cash inflows and outflows of a business, classified by operating, investing, and financing activities.' },
          { term: 'Operating Activities', definition: 'Cash flows from the main revenue-producing activities of the business.' },
          { term: 'Investing Activities', definition: 'Cash flows from the purchase and sale of fixed assets and investments.' },
          { term: 'Financing Activities', definition: 'Cash flows from changes in share capital and long-term borrowings.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Cash Flow Statement Layout (FRS 1)', html: '<p><strong>Operating Activities:</strong><br/>Net cash flow from operating activities (see reconciliation note)</p><p><strong>Returns on Investment & Servicing of Finance:</strong><br/>Interest received / Interest paid / Dividends paid</p><p><strong>Taxation:</strong><br/>Corporation tax paid</p><p><strong>Capital Expenditure:</strong><br/>Purchase/sale of fixed assets</p><p><strong>Financing:</strong><br/>Issue of shares / Repayment of debentures / New loans</p><p>= <strong>Increase/Decrease in Cash</strong></p>' },
          { type: 'concept', variant: 'green', title: 'Reconciliation of Operating Profit to Net Cash Flow', html: '<p>Operating Profit<br/>+ Depreciation (non-cash expense)<br/>+ Loss on disposal / − Profit on disposal<br/>− Increase in stock / + Decrease in stock<br/>− Increase in debtors / + Decrease in debtors<br/>+ Increase in creditors / − Decrease in creditors<br/>= <strong>Net Cash Flow from Operating Activities</strong></p>' },
          { type: 'watchout', title: 'When Operating Profit Not Given', html: '<p>If operating profit is not given directly, calculate it: Net Profit + Interest Paid + Corporation Tax = Operating Profit (before interest and tax).</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 18, block: 'C',
    title: 'Ratio Analysis & Interpretation',
    description: 'Profitability, liquidity, activity, gearing, investment ratios, stakeholder analysis.',
    estimatedMinutes: 35,
    related: [9, 10, 17],
    sections: [
      { id: '18.1', title: 'Part A: The Ratios', subTopics: [
        { id: '18.1.1', title: 'Profitability & Efficiency Ratios', keyTerms: [
          { term: 'Gross Profit Percentage', definition: 'Gross Profit / Sales × 100. Measures profitability of trading activities.' },
          { term: 'Net Profit Percentage', definition: 'Net Profit / Sales × 100. Measures overall profitability after all expenses.' },
          { term: 'Return on Capital Employed (ROCE)', definition: 'Net Profit / Capital Employed × 100. Measures return generated on total capital invested.' },
        ], body: [
          { type: 'concept', variant: 'green', title: 'Profitability Ratios', html: '<p><strong>Gross Profit %</strong> = (Gross Profit / Sales) × 100<br/><strong>Net Profit %</strong> = (Net Profit / Sales) × 100<br/><strong>ROCE</strong> = (Net Profit / Capital Employed) × 100<br/><strong>Mark-up</strong> = (Gross Profit / Cost of Sales) × 100</p>' },
        ]},
        { id: '18.1.2', title: 'Liquidity, Activity & Gearing Ratios', keyTerms: [
          { term: 'Current Ratio', definition: 'Current Assets / Current Liabilities. Ideal: 2:1. Measures short-term ability to pay debts.' },
          { term: 'Acid Test (Quick Ratio)', definition: '(Current Assets − Stock) / Current Liabilities. Ideal: 1:1. Excludes stock as it may not be quickly convertible.' },
          { term: 'Debtors\' Collection Period', definition: '(Debtors / Credit Sales) × 365. Number of days debtors take to pay.' },
          { term: 'Gearing Ratio', definition: 'Long-term Liabilities / Total Capital Employed × 100. Measures reliance on borrowed funds.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Liquidity Ratios', html: '<p><strong>Current Ratio</strong> = Current Assets / Current Liabilities (ideal 2:1)<br/><strong>Acid Test</strong> = (Current Assets − Stock) / Current Liabilities (ideal 1:1)</p>' },
          { type: 'concept', variant: 'amber', title: 'Activity Ratios', html: '<p><strong>Stock Turnover</strong> = Cost of Sales / Average Stock (times per year)<br/><strong>Debtors\' Days</strong> = (Debtors / Credit Sales) × 365<br/><strong>Creditors\' Days</strong> = (Creditors / Credit Purchases) × 365</p>' },
          { type: 'concept', variant: 'red', title: 'Gearing Ratio', html: '<p><strong>Gearing</strong> = Long-term Liabilities / Capital Employed × 100</p><p>High gearing (>50%) means the company relies heavily on borrowed funds — higher risk but tax-efficient. Low gearing means more equity funding — lower risk.</p>' },
        ]},
        { id: '18.1.3', title: 'Investment Ratios', keyTerms: [
          { term: 'Earnings Per Share (EPS)', definition: 'Profit after tax and preference dividends / Number of ordinary shares.' },
          { term: 'Dividend Per Share', definition: 'Total ordinary dividends / Number of ordinary shares.' },
          { term: 'Dividend Cover', definition: 'Profit after tax / Total dividends. How many times dividends are covered by earnings.' },
          { term: 'Price Earnings Ratio (P/E)', definition: 'Market price per share / EPS. Measures market confidence in the company.' },
        ], body: [
          { type: 'concept', variant: 'green', title: 'Investment Ratios', html: '<p><strong>EPS</strong> = (Profit after tax − Pref dividends) / No. of ordinary shares<br/><strong>Dividend per share</strong> = Total ordinary dividends / No. of ordinary shares<br/><strong>Dividend cover</strong> = Profit after tax / Total dividends<br/><strong>Dividend yield</strong> = (Dividend per share / Market price) × 100<br/><strong>P/E Ratio</strong> = Market price per share / EPS</p>' },
        ]},
      ]},
      { id: '18.2', title: 'Part B: Interpretation', subTopics: [
        { id: '18.2.1', title: 'Interpreting Ratios & Stakeholder Analysis', body: [
          { type: 'concept', variant: 'blue', title: 'How to Interpret', html: '<p>Always compare ratios: <strong>year on year</strong> (trend analysis) and <strong>against industry averages</strong>. State the ratio, compare it, and give a <strong>reason</strong> for any change.</p>' },
          { type: 'concept', variant: 'amber', title: 'Limitations of Ratio Analysis', html: '<p>Ratios are based on <strong>historical data</strong>. Different accounting policies make comparison difficult. Inflation distorts figures. Seasonal variations affect snapshot ratios. Ratios don\'t consider non-financial factors (staff morale, management quality).</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 19, block: 'C',
    title: 'Tabular Statements',
    description: 'Effects of transactions on the balance sheet — assets, liabilities, and capital.',
    estimatedMinutes: 10,
    related: [1, 2, 6],
    sections: [
      { id: '19.1', title: 'Tabular Statements', subTopics: [
        { id: '19.1.1', title: 'Effects of Transactions', keyTerms: [
          { term: 'Tabular Statement', definition: 'A table showing how each transaction affects assets, liabilities, and capital — maintaining the accounting equation.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Procedure', html: '<p>Set up columns for each asset, liability, and capital item. For each transaction, show the increase (+) or decrease (−) in the affected columns. The accounting equation <strong>Assets = Capital + Liabilities</strong> must balance after every transaction.</p>' },
          { type: 'examtip', title: 'Exam Tip', html: '<p>Common transactions tested: purchase of goods for cash/credit, sale of goods, payment to creditors, receipt from debtors, introduction of capital, drawings, payment of expenses.</p>' },
        ]}
      ]}
    ]
  },

  // ──────────────────────────────────────────────────
  // BLOCK D — MANAGEMENT ACCOUNTING (Chapters 20-24)
  // ──────────────────────────────────────────────────
  {
    id: 20, block: 'D',
    title: 'Nature & Scope of Management Accounting',
    description: 'Role of the management accountant, relationship between management and financial accounting.',
    estimatedMinutes: 10,
    related: [1, 21, 22, 23, 24],
    sections: [
      { id: '20.1', title: 'Management Accounting', subTopics: [
        { id: '20.1.1', title: 'Role & Relationship', keyTerms: [
          { term: 'Management Accountant', definition: 'Provides financial information for internal decision-making — planning, controlling, and decision-making.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Management vs Financial Accounting', html: '<table class="learn-table"><thead><tr><th>Feature</th><th>Financial Accounting</th><th>Management Accounting</th></tr></thead><tbody><tr><td>Focus</td><td>Past events</td><td>Future decisions</td></tr><tr><td>Users</td><td>External (shareholders, creditors)</td><td>Internal (managers)</td></tr><tr><td>Legal requirement</td><td>Mandatory</td><td>Optional</td></tr><tr><td>Format</td><td>Prescribed by law/standards</td><td>Flexible, tailored to needs</td></tr><tr><td>Time period</td><td>Usually annual</td><td>Any period (weekly, monthly)</td></tr><tr><td>Detail</td><td>Summarised</td><td>Detailed by department/product</td></tr></tbody></table>' },
        ]}
      ]}
    ]
  },

  {
    id: 21, block: 'D',
    title: 'Cost Classification',
    description: 'Fixed vs variable costs, mixed cost separation, graphical presentation.',
    estimatedMinutes: 14,
    related: [20, 22, 23, 24],
    sections: [
      { id: '21.1', title: 'Cost Classification', subTopics: [
        { id: '21.1.1', title: 'Types of Costs', keyTerms: [
          { term: 'Fixed Costs', definition: 'Costs that remain constant regardless of the level of output. Examples: rent, insurance, salaries.' },
          { term: 'Variable Costs', definition: 'Costs that change in direct proportion to the level of output. Examples: raw materials, direct labour.' },
          { term: 'Semi-Variable (Mixed) Costs', definition: 'Costs with both a fixed and variable element. Example: telephone (fixed line rental + variable call charges).' },
          { term: 'Step Fixed Costs', definition: 'Fixed within a range but increase (step up) when activity exceeds that range.' },
          { term: 'Direct Costs', definition: 'Costs that can be directly traced to a specific product or cost centre.' },
          { term: 'Indirect Costs (Overheads)', definition: 'Costs that cannot be directly traced — must be apportioned.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Fixed vs Variable', html: '<p><strong>Fixed costs</strong> remain constant regardless of output: rent, insurance, depreciation, salaries.</p><p><strong>Variable costs</strong> change in proportion to output: raw materials, direct wages, packaging.</p>' },
          { type: 'concept', variant: 'amber', title: 'Semi-Variable & Step Fixed', html: '<p><strong>Semi-variable:</strong> Both fixed and variable elements. E.g. telephone (fixed rental + variable calls), electricity (standing charge + usage).</p><p><strong>Step fixed:</strong> Fixed within a range then steps up. E.g. one supervisor per 20 workers; rent increases if bigger factory needed.</p>' },
          { type: 'concept', variant: 'green', title: 'HL: Separation of Mixed Costs', html: '<p>Use the <strong>high-low method</strong>: Variable cost per unit = (Highest cost − Lowest cost) / (Highest activity − Lowest activity). Fixed cost = Total cost − (Variable cost per unit × Activity level).</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 22, block: 'D',
    title: 'Product Costing',
    description: 'Stock valuation (FIFO, LIFO, weighted average), absorption costing, apportionment.',
    estimatedMinutes: 25,
    related: [11, 21, 23],
    sections: [
      { id: '22.1', title: 'Part A: Stock Valuation', subTopics: [
        { id: '22.1.1', title: 'FIFO, LIFO & Weighted Average', keyTerms: [
          { term: 'FIFO', definition: 'First In, First Out — oldest stock is assumed to be sold/used first.' },
          { term: 'LIFO', definition: 'Last In, First Out — newest stock is assumed to be sold/used first.' },
          { term: 'Weighted Average', definition: 'Average cost is recalculated after each purchase.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Stock Valuation Methods', html: '<p><strong>FIFO:</strong> Issues oldest stock first. Closing stock valued at most recent prices. Higher closing stock value in times of rising prices.</p><p><strong>LIFO:</strong> Issues newest stock first. Closing stock valued at oldest prices. Lower closing stock value in times of rising prices.</p><p><strong>Weighted Average:</strong> Recalculates average cost after each purchase. Smooths out price fluctuations.</p>' },
        ]}
      ]},
      { id: '22.2', title: 'Part B: Absorption Costing', subTopics: [
        { id: '22.2.1', title: 'Absorption, Apportionment & Allocation', keyTerms: [
          { term: 'Absorption Costing', definition: 'All production costs (fixed and variable) are included in the cost of a product.' },
          { term: 'Overhead Absorption Rate (OAR)', definition: 'The rate at which overheads are charged to production units. OAR = Budgeted Overheads / Budgeted Activity.' },
          { term: 'Over-absorption', definition: 'Overheads charged to production exceed actual overheads — credited to P&L.' },
          { term: 'Under-absorption', definition: 'Overheads charged to production are less than actual overheads — debited to P&L.' },
        ], body: [
          { type: 'concept', variant: 'green', title: 'Absorption Costing', html: '<p>ALL production costs are included in the cost of each unit:</p><p>Direct Materials + Direct Labour + Direct Expenses + <strong>Absorbed Factory Overhead</strong> = Total Production Cost per Unit</p><p><strong>OAR</strong> = Budgeted Overheads / Budgeted Activity (labour hours, machine hours, or units)</p>' },
          { type: 'concept', variant: 'amber', title: 'Over/Under Absorption', html: '<p><strong>Over-absorption:</strong> Overheads charged > Actual overheads. Too much recovered — deduct from costs (credit P&L).</p><p><strong>Under-absorption:</strong> Overheads charged < Actual overheads. Not enough recovered — add to costs (debit P&L).</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 23, block: 'D',
    title: 'CVP Analysis / Marginal Costing',
    description: 'Break-even analysis, contribution, marginal vs absorption comparison.',
    estimatedMinutes: 22,
    related: [21, 22, 24],
    sections: [
      { id: '23.1', title: 'Marginal Costing & Break-Even', subTopics: [
        { id: '23.1.1', title: 'Key Concepts', keyTerms: [
          { term: 'Marginal Costing', definition: 'Only variable costs are charged to products. Fixed costs are treated as period costs.' },
          { term: 'Contribution', definition: 'Sales Revenue − Variable Costs. Goes towards paying off fixed costs, then becomes profit.' },
          { term: 'Break-Even Point', definition: 'The level of output/sales where total revenue equals total costs. No profit, no loss.' },
          { term: 'Margin of Safety', definition: 'Actual/budgeted sales minus break-even sales. The amount by which sales can fall before a loss is made.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Marginal Costing', html: '<p>Only <strong>variable costs</strong> are charged to products. Fixed costs are treated as <strong>period costs</strong> — charged in full to the P&L for the period, not to individual products.</p>' },
          { type: 'concept', variant: 'green', title: 'Break-Even Formulas', html: '<p><strong>Contribution per unit</strong> = Selling Price − Variable Cost per unit</p><p><strong>BEP (units)</strong> = Fixed Costs / Contribution per unit</p><p><strong>BEP (sales)</strong> = Fixed Costs / C/S Ratio</p><p><strong>C/S Ratio</strong> = Contribution / Sales × 100</p><p><strong>Margin of Safety</strong> = Actual Sales − Break-Even Sales</p><p><strong>Target profit units</strong> = (Fixed Costs + Target Profit) / Contribution per unit</p>' },
          { type: 'concept', variant: 'amber', title: 'Marginal vs Absorption — Effect on Profit', html: '<p>When production > sales (stock increases): Absorption profit > Marginal profit.</p><p>When production < sales (stock decreases): Marginal profit > Absorption profit.</p><p>When production = sales: Both give the same profit.</p>' },
        ]}
      ]}
    ]
  },

  {
    id: 24, block: 'D',
    title: 'Budgeting & Budgetary Control',
    description: 'Manufacturing budgets, cash budgets, flexible budgets, variances.',
    estimatedMinutes: 30,
    related: [20, 21, 23],
    sections: [
      { id: '24.1', title: 'Part A: Manufacturing Budgets', subTopics: [
        { id: '24.1.1', title: 'Budget Preparation', keyTerms: [
          { term: 'Budget', definition: 'A financial plan or forecast for a future period, expressed in quantitative terms.' },
          { term: 'Master Budget', definition: 'A summary of all individual budgets — includes budgeted manufacturing, trading, P&L, and balance sheet.' },
          { term: 'Principal Budget Factor', definition: 'The limiting factor that restricts output. Usually sales demand, but could be materials, labour, or capacity.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Why Budget?', html: '<p>Budgeting is part of the planning process — a financial road map. It helps: define areas of responsibility, motivate staff, ensure efficient use of resources, compare budgeted vs actual performance, identify and investigate variances.</p>' },
          { type: 'concept', variant: 'green', title: 'Manufacturing Budget Components', html: '<p><strong>Sales Budget</strong> → <strong>Production Budget</strong> → <strong>Materials Budget</strong> → <strong>Labour Budget</strong> → <strong>Overhead Budget</strong> → <strong>Master Budget</strong></p><p>Production required = Budgeted sales + Desired closing stock − Opening stock</p>' },
        ]}
      ]},
      { id: '24.2', title: 'Part B: Cash Budgets', subTopics: [
        { id: '24.2.1', title: 'Cash Budget Preparation', keyTerms: [
          { term: 'Cash Budget', definition: 'A forecast of cash inflows and outflows over a period, showing expected cash surpluses or deficits.' },
          { term: 'Capital Budget', definition: 'Deals with planned capital expenditure and capital receipts — responsibility of board of directors.' },
        ], body: [
          { type: 'concept', variant: 'blue', title: 'Cash Budget Format', html: '<p><strong>Receipts:</strong> Cash sales, receipts from debtors, other income<br/><strong>Less Payments:</strong> Purchases, wages, overheads, capital expenditure<br/>= <strong>Net Cash Flow</strong><br/>+ Opening Balance<br/>= <strong>Closing Balance</strong></p>' },
          { type: 'concept', variant: 'amber', title: 'Advice from Cash Budgets', html: '<p><strong>Cash surplus:</strong> Invest short-term, pay off loans, purchase fixed assets.</p><p><strong>Cash deficit:</strong> Arrange overdraft, encourage faster debtor payment, negotiate longer credit terms, lease instead of buying, delay purchases.</p>' },
        ]}
      ]},
      { id: '24.3', title: 'Part C: Flexible Budgets (HL)', subTopics: [
        { id: '24.3.1', title: 'Flexible Budgets & Variances', keyTerms: [
          { term: 'Flexible Budget', definition: 'A budget prepared at the SAME level of activity as actual results, allowing valid comparison and variance identification.' },
          { term: 'Adverse Variance', definition: 'When actual costs exceed budgeted costs.' },
          { term: 'Favourable Variance', definition: 'When actual costs are less than budgeted costs.' },
          { term: 'Controllable Costs', definition: 'Costs that can be controlled by the manager of a cost centre.' },
          { term: 'Uncontrollable Costs', definition: 'Costs over which the manager has no control.' },
          { term: 'Sensitivity Analysis', definition: 'Also known as "what if" analysis — shows the effect on profit from changes in selling price, sales volume, variable costs, or fixed costs.' },
        ], body: [
          { type: 'concept', variant: 'green', title: 'Why Flexible Budgets?', html: '<p>It is <strong>misleading</strong> to compare budgeted costs at one level of activity with actual costs at a different level. Flexible budgets allow comparison at the <strong>same</strong> level, making variances meaningful.</p>' },
          { type: 'concept', variant: 'amber', title: 'Variances', html: '<p><strong>Adverse variance:</strong> Actual costs exceed budgeted costs. May arise from: higher material prices, increased quantities used, higher wage rates, lower productivity.</p><p><strong>Favourable variance:</strong> Actual costs are less than budgeted. May arise from: lower material prices, better productivity, lower wastage.</p>' },
          { type: 'concept', variant: 'blue', title: 'Controllable vs Uncontrollable', html: '<p><strong>Controllable:</strong> Costs the manager can influence and be held responsible for. E.g. variable costs, commission.</p><p><strong>Uncontrollable:</strong> Costs the manager cannot influence. E.g. rates, government levies.</p>' },
        ]}
      ]}
    ]
  },
];

// Helper: get chapters by block
export function getChaptersByBlock(block: Block): Chapter[] {
  return CHAPTERS.filter(c => c.block === block);
}

// Helper: flatten all searchable content
export interface SearchableItem {
  chapterId: number;
  sectionId: string;
  subTopicId: string;
  type: 'chapter' | 'section' | 'subtopic' | 'keyterm';
  title: string;
  body: string;
  breadcrumb: string;
}

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];
  for (const ch of CHAPTERS) {
    items.push({ chapterId: ch.id, sectionId: '', subTopicId: '', type: 'chapter', title: ch.title, body: ch.description, breadcrumb: `Chapter ${ch.id}` });
    for (const sec of ch.sections) {
      items.push({ chapterId: ch.id, sectionId: sec.id, subTopicId: '', type: 'section', title: sec.title, body: '', breadcrumb: `Ch ${ch.id} → ${sec.title}` });
      for (const sub of sec.subTopics) {
        const bodyText = sub.body.map(b => b.html.replace(/<[^>]+>/g, '')).join(' ');
        items.push({ chapterId: ch.id, sectionId: sec.id, subTopicId: sub.id, type: 'subtopic', title: sub.title, body: bodyText.slice(0, 300), breadcrumb: `Ch ${ch.id} → ${sec.title} → ${sub.title}` });
        if (sub.keyTerms) {
          for (const kt of sub.keyTerms) {
            items.push({ chapterId: ch.id, sectionId: sec.id, subTopicId: sub.id, type: 'keyterm', title: kt.term, body: kt.definition, breadcrumb: `Ch ${ch.id} → ${sec.title} → ${sub.title}` });
          }
        }
      }
    }
  }
  return items;
}
