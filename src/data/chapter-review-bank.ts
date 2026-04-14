// ═══════════════════════════════════════════════════════════════════
// Chapter Review Bank — lightweight, interactive review items
// Separate from SEC past-paper question bank.
// ═══════════════════════════════════════════════════════════════════

// ── Type Definitions ──

export interface MCQData {
  options: string[];
  correctIndex: number;
}

export interface MatchData {
  pairs: { term: string; definition: string }[];
}

export interface SortData {
  buckets: string[];
  items: { label: string; correctBucket: string }[];
}

export interface FillChipData {
  sentence: string;           // Use ___ for the blank
  chips: string[];
  correctChip: string;
}

export interface TrueFalseData {
  statement: string;
  isTrue: boolean;
  followUp?: {
    prompt: string;
    chips: string[];
    correctChip: string;
  };
}

export interface OrderData {
  steps: string[];            // correct order
}

export interface DefineData {
  term: string;
  modelDefinition: string;
}

export type ReviewItemData =
  | { type: 'mcq'; data: MCQData }
  | { type: 'match'; data: MatchData }
  | { type: 'sort'; data: SortData }
  | { type: 'fill-chip'; data: FillChipData }
  | { type: 'true-false'; data: TrueFalseData }
  | { type: 'order'; data: OrderData }
  | { type: 'define'; data: DefineData };

export interface ReviewItem {
  id: string;
  chapterId: number;
  sectionId?: string;
  type: 'mcq' | 'match' | 'sort' | 'fill-chip' | 'true-false' | 'order' | 'define';
  prompt: string;
  itemData: ReviewItemData;
  explanation: string;
  sectionLink?: string;
}

// ── Per-chapter banks ──

export const REVIEW_BANK: Record<number, ReviewItem[]> = {
  // ────────────────────────────────────────────
  // Chapter 1 — Introduction to Accounting (12 items)
  // ────────────────────────────────────────────
  1: [
    {
      id: 'r1-01',
      chapterId: 1,
      sectionId: '1.1',
      type: 'mcq',
      prompt: 'Which type of accounting is primarily concerned with future financial decisions as well as past transactions?',
      itemData: {
        type: 'mcq',
        data: {
          options: [
            'Financial accounting',
            'Management accounting',
            'Forensic accounting',
            'Tax accounting',
          ],
          correctIndex: 1,
        },
      },
      explanation: 'Management accounting provides information for planning, control and decision-making, focusing on the future as well as the past.',
      sectionLink: '1.1.1',
    },
    {
      id: 'r1-02',
      chapterId: 1,
      sectionId: '1.1',
      type: 'match',
      prompt: 'Match each quality of financial information with its description.',
      itemData: {
        type: 'match',
        data: {
          pairs: [
            { term: 'Relevant', definition: 'Meets exactly the requirements of the user(s)' },
            { term: 'Reliable', definition: 'Certified by either a director or an auditor' },
            { term: 'Comparable', definition: 'Prepared on a consistent basis from period to period' },
            { term: 'Understandable', definition: 'Clear, concise and easily interpreted by the user(s)' },
          ],
        },
      },
      explanation: 'The four qualities — relevant, reliable, comparable, understandable — ensure financial information is useful to its intended audience.',
      sectionLink: '1.1.2',
    },
    {
      id: 'r1-03',
      chapterId: 1,
      sectionId: '1.1',
      type: 'sort',
      prompt: 'Sort these users by whether they are internal or external users of financial information.',
      itemData: {
        type: 'sort',
        data: {
          buckets: ['Internal Users', 'External Users'],
          items: [
            { label: 'Managers', correctBucket: 'Internal Users' },
            { label: 'Revenue Commissioners', correctBucket: 'External Users' },
            { label: 'Employees', correctBucket: 'Internal Users' },
            { label: 'Banks / Lenders', correctBucket: 'External Users' },
            { label: 'Potential Investors', correctBucket: 'External Users' },
            { label: 'Owners (sole trader)', correctBucket: 'Internal Users' },
          ],
        },
      },
      explanation: 'Managers, employees and owner-operators are internal users. Banks, Revenue, and potential investors are external — they rely on published financial statements.',
      sectionLink: '1.1.3',
    },
    {
      id: 'r1-04',
      chapterId: 1,
      sectionId: '1.2',
      type: 'fill-chip',
      prompt: 'Complete the sentence about the going concern concept.',
      itemData: {
        type: 'fill-chip',
        data: {
          sentence: 'The going concern concept assumes the business will continue operating indefinitely, so assets are valued at ___ rather than net realisable value.',
          chips: ['market value', 'historical cost', 'replacement cost', 'scrap value'],
          correctChip: 'historical cost',
        },
      },
      explanation: 'Under the going concern concept, assets are valued at historical cost because there is no expectation of a forced sale.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-05',
      chapterId: 1,
      sectionId: '1.2',
      type: 'true-false',
      prompt: 'True or false?',
      itemData: {
        type: 'true-false',
        data: {
          statement: 'The prudence concept requires a business to anticipate future profits and record them immediately.',
          isTrue: false,
          followUp: {
            prompt: 'What does prudence actually require?',
            chips: [
              'Never anticipate profits; provide for all foreseeable losses',
              'Record all profits when cash is received',
              'Only record profits approved by the auditor',
            ],
            correctChip: 'Never anticipate profits; provide for all foreseeable losses',
          },
        },
      },
      explanation: 'Prudence says the opposite: never anticipate profits, but always provide for all foreseeable losses. Revenue is only recognised when earned.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-06',
      chapterId: 1,
      sectionId: '1.2',
      type: 'mcq',
      prompt: 'A small waste paper bin costing a few euro is expensed immediately rather than being capitalised and depreciated. Which accounting concept justifies this treatment?',
      itemData: {
        type: 'mcq',
        data: {
          options: ['Prudence', 'Materiality', 'Consistency', 'Realisation'],
          correctIndex: 1,
        },
      },
      explanation: 'The materiality concept says items of insignificant value need not be precisely accounted for — they can be expensed immediately.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-07',
      chapterId: 1,
      sectionId: '1.2',
      type: 'match',
      prompt: 'Match each accounting concept with its practical example.',
      itemData: {
        type: 'match',
        data: {
          pairs: [
            { term: 'Business Entity', definition: 'Owner\u2019s personal car is not recorded in business books' },
            { term: 'Accruals', definition: 'Insurance paid in advance is shown as a prepayment' },
            { term: 'Dual Aspect', definition: 'Every transaction has a debit and a credit of equal value' },
            { term: 'Realisation', definition: 'Revenue is only recognised when goods are delivered' },
          ],
        },
      },
      explanation: 'Each concept has a clear practical application. Business entity separates owner from business. Accruals matches income/expenses to the correct period. Dual aspect is the basis of double-entry. Realisation governs when revenue is recognised.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-08',
      chapterId: 1,
      sectionId: '1.2',
      type: 'order',
      prompt: 'Put these accounting concepts in the order they would typically be applied when preparing final accounts.',
      itemData: {
        type: 'order',
        data: {
          steps: [
            'Going Concern — confirm the business will continue',
            'Business Entity — separate owner transactions',
            'Accruals — match income and expenses to the period',
            'Prudence — provide for losses, don\u2019t anticipate profits',
            'Consistency — apply the same methods as prior year',
          ],
        },
      },
      explanation: 'First confirm going concern (affects all valuations), then separate business from owner, match items to the period, apply prudent valuations, and ensure consistency with prior years.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-09',
      chapterId: 1,
      sectionId: '1.3',
      type: 'fill-chip',
      prompt: 'Complete the distinction between accounting bases and policies.',
      itemData: {
        type: 'fill-chip',
        data: {
          sentence: 'Accounting bases are the various methods available, while accounting ___ are the specific bases chosen by a particular organisation.',
          chips: ['standards', 'policies', 'regulations', 'principles'],
          correctChip: 'policies',
        },
      },
      explanation: 'Bases are the menu of options. Policies are what the business actually chose from that menu and must disclose in the notes to the accounts.',
      sectionLink: '1.3.1',
    },
    {
      id: 'r1-10',
      chapterId: 1,
      sectionId: '1.2',
      type: 'sort',
      prompt: 'Classify each item as either a fundamental accounting concept or a quality of financial information.',
      itemData: {
        type: 'sort',
        data: {
          buckets: ['Accounting Concept', 'Quality of Information'],
          items: [
            { label: 'Going Concern', correctBucket: 'Accounting Concept' },
            { label: 'Relevant', correctBucket: 'Quality of Information' },
            { label: 'Prudence', correctBucket: 'Accounting Concept' },
            { label: 'Comparable', correctBucket: 'Quality of Information' },
            { label: 'Consistency', correctBucket: 'Accounting Concept' },
            { label: 'Reliable', correctBucket: 'Quality of Information' },
          ],
        },
      },
      explanation: 'Concepts (going concern, prudence, consistency) are rules for preparing accounts. Qualities (relevant, comparable, reliable) describe what good financial information looks like.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-11',
      chapterId: 1,
      sectionId: '1.1',
      type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: {
        type: 'define',
        data: {
          term: 'Financial Accounting',
          modelDefinition: 'The area of accounting that focuses on past events — collecting and recording financial transactions to show the performance and financial position of an organisation.',
        },
      },
      explanation: 'Financial accounting produces the Trading, Profit and Loss Account and Balance Sheet, showing past performance for external users.',
      sectionLink: '1.1.1',
    },
    {
      id: 'r1-12',
      chapterId: 1,
      sectionId: '1.2',
      type: 'true-false',
      prompt: 'True or false?',
      itemData: {
        type: 'true-false',
        data: {
          statement: 'The consistency concept means that a business must use the same accounting methods from year to year.',
          isTrue: true,
        },
      },
      explanation: 'Consistency ensures financial statements are comparable over time. If a change is made, it must be disclosed and justified in the notes.',
      sectionLink: '1.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 7 — Correction of Errors & Suspense (12 items)
  // ────────────────────────────────────────────
  7: [
    {
      id: 'r7-01',
      chapterId: 7,
      sectionId: '7.1',
      type: 'sort',
      prompt: 'Sort these errors by whether they affect the trial balance or not.',
      itemData: {
        type: 'sort',
        data: {
          buckets: ['Does NOT Affect TB', 'DOES Affect TB'],
          items: [
            { label: 'Error of Omission', correctBucket: 'Does NOT Affect TB' },
            { label: 'Single-sided entry', correctBucket: 'DOES Affect TB' },
            { label: 'Error of Principle', correctBucket: 'Does NOT Affect TB' },
            { label: 'Incorrect casting', correctBucket: 'DOES Affect TB' },
            { label: 'Complete Reversal', correctBucket: 'Does NOT Affect TB' },
            { label: 'Two debits instead of debit and credit', correctBucket: 'DOES Affect TB' },
          ],
        },
      },
      explanation: 'Six error types (omission, commission, principle, original entry, compensating, complete reversal) do NOT affect the trial balance because total debits still equal total credits. Errors like single-sided entries, incorrect casting, and posting to the wrong side DO create a suspense account.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-02',
      chapterId: 7,
      sectionId: '7.1',
      type: 'match',
      prompt: 'Match each error type with its description.',
      itemData: {
        type: 'match',
        data: {
          pairs: [
            { term: 'Error of Omission', definition: 'Transaction completely left out of the books' },
            { term: 'Error of Commission', definition: 'Right amount, right type of account, wrong person' },
            { term: 'Error of Principle', definition: 'Entry in the wrong class of account' },
            { term: 'Compensating Error', definition: 'Two errors of equal amount cancel each other out' },
          ],
        },
      },
      explanation: 'These four error types, along with error of original entry and complete reversal, are the six errors NOT revealed by the trial balance.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-03',
      chapterId: 7,
      sectionId: '7.1',
      type: 'mcq',
      prompt: 'A motor van costing \u20ac5,000 was debited to the motor expenses account. What type of error is this?',
      itemData: {
        type: 'mcq',
        data: {
          options: [
            'Error of Commission',
            'Error of Principle',
            'Error of Original Entry',
            'Compensating Error',
          ],
          correctIndex: 1,
        },
      },
      explanation: 'This is an error of principle — the entry was made in the wrong CLASS of account (expense instead of asset). Both are on the debit side, so the trial balance still balances.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-04',
      chapterId: 7,
      sectionId: '7.2',
      type: 'fill-chip',
      prompt: 'Complete the statement about the suspense account.',
      itemData: {
        type: 'fill-chip',
        data: {
          sentence: 'A suspense account is a ___ account used to record the difference in the trial balance until errors are found and corrected.',
          chips: ['permanent', 'temporary', 'nominal', 'personal'],
          correctChip: 'temporary',
        },
      },
      explanation: 'The suspense account is temporary — it exists only until all errors causing the trial balance difference have been identified and corrected, at which point it should clear to zero.',
      sectionLink: '7.2.1',
    },
    {
      id: 'r7-05',
      chapterId: 7,
      sectionId: '7.2',
      type: 'order',
      prompt: 'Put the four steps for correcting an error in the correct order.',
      itemData: {
        type: 'order',
        data: {
          steps: [
            'Identify what was done (the incorrect entry)',
            'Determine what should have been done (the correct entry)',
            'Write the correcting journal entry',
            'Decide if the suspense account is involved',
          ],
        },
      },
      explanation: 'The four-step method: (1) What was done wrong? (2) What should have been done? (3) Write the correction. (4) Does it involve suspense? Only errors that affected the trial balance use the suspense account.',
      sectionLink: '7.2.1',
    },
    {
      id: 'r7-06',
      chapterId: 7,
      sectionId: '7.1',
      type: 'true-false',
      prompt: 'True or false?',
      itemData: {
        type: 'true-false',
        data: {
          statement: 'An error of original entry affects the trial balance because the wrong amount is recorded.',
          isTrue: false,
          followUp: {
            prompt: 'Why does this error NOT affect the trial balance?',
            chips: [
              'The wrong amount is used for BOTH the debit and the credit',
              'The error is too small to notice',
              'Original entry errors are always corrected automatically',
            ],
            correctChip: 'The wrong amount is used for BOTH the debit and the credit',
          },
        },
      },
      explanation: 'An error of original entry uses the wrong amount on BOTH sides of the double entry. Since both sides are equally wrong, total debits still equal total credits and the trial balance still balances.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-07',
      chapterId: 7,
      sectionId: '7.2',
      type: 'mcq',
      prompt: 'Sales of \u20ac500 were credited to Sales but the debit to the customer\u2019s account was omitted. What is the correcting entry?',
      itemData: {
        type: 'mcq',
        data: {
          options: [
            'Dr Sales \u20ac500, Cr Suspense \u20ac500',
            'Dr Debtor \u20ac500, Cr Suspense \u20ac500',
            'Dr Suspense \u20ac500, Cr Debtor \u20ac500',
            'Dr Debtor \u20ac500, Cr Sales \u20ac500',
          ],
          correctIndex: 1,
        },
      },
      explanation: 'The credit to Sales was correct but the debit was missing. The correction is Dr Debtor (the missing entry) and Cr Suspense (to clear the suspense account that arose from the single-sided entry).',
      sectionLink: '7.2.2',
    },
    {
      id: 'r7-08',
      chapterId: 7,
      sectionId: '7.2',
      type: 'fill-chip',
      prompt: 'Complete the correcting entry for a complete reversal of entries.',
      itemData: {
        type: 'fill-chip',
        data: {
          sentence: 'To correct a complete reversal, you must enter ___ the original amount on each side to fully reverse and re-record the transaction.',
          chips: ['half', 'double', 'triple', 'the same as'],
          correctChip: 'double',
        },
      },
      explanation: 'A complete reversal means both debit and credit are on the wrong sides. You need to double the amount: once to reverse the wrong entry, once to make the correct entry. No suspense is involved because both sides were equally wrong.',
      sectionLink: '7.2.2',
    },
    {
      id: 'r7-09',
      chapterId: 7,
      sectionId: '7.3',
      type: 'sort',
      prompt: 'Sort these corrections by whether they affect the revised net profit or not.',
      itemData: {
        type: 'sort',
        data: {
          buckets: ['Affects Revised Profit', 'Does NOT Affect Profit'],
          items: [
            { label: 'Equipment wrongly recorded as purchases', correctBucket: 'Affects Revised Profit' },
            { label: 'Debtor Murphy recorded as debtor Murray', correctBucket: 'Does NOT Affect Profit' },
            { label: 'Sales returns omitted from the books', correctBucket: 'Affects Revised Profit' },
            { label: 'Bank lodgement credited to wrong bank account', correctBucket: 'Does NOT Affect Profit' },
          ],
        },
      },
      explanation: 'Only corrections that change a P&L item (income or expense) affect the revised profit. Corrections between two Balance Sheet items (debtor names, bank accounts) have no profit impact.',
      sectionLink: '7.3.1',
    },
    {
      id: 'r7-10',
      chapterId: 7,
      sectionId: '7.3',
      type: 'true-false',
      prompt: 'True or false?',
      itemData: {
        type: 'true-false',
        data: {
          statement: 'The statement of revised profit starts with the original net profit and adjusts it for errors that affect P&L items.',
          isTrue: true,
        },
      },
      explanation: 'The statement starts with original net profit, adds items that increase profit (overcharged expenses, understated income), and deducts items that decrease profit (undercharged expenses, overstated income).',
      sectionLink: '7.3.1',
    },
    {
      id: 'r7-11',
      chapterId: 7,
      sectionId: '7.1',
      type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: {
        type: 'define',
        data: {
          term: 'Error of Commission',
          modelDefinition: 'An error where the correct amount is posted to the correct type of account, but to the wrong person or individual account within that type.',
        },
      },
      explanation: 'Example: A payment to creditor Murphy is posted to the account of creditor Murray. The amount is right, both are creditor accounts, but it\u2019s the wrong person.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-12',
      chapterId: 7,
      sectionId: '7.2',
      type: 'match',
      prompt: 'Match each error scenario with the correct type of correcting entry.',
      itemData: {
        type: 'match',
        data: {
          pairs: [
            { term: 'Credit entry omitted', definition: 'Dr Suspense, Cr correct account' },
            { term: 'Error of principle (van as expense)', definition: 'Dr Asset, Cr Expense (no suspense)' },
            { term: 'Debit entry posted twice', definition: 'Cr the account, Dr Suspense' },
            { term: 'Complete reversal of entries', definition: 'Double the amount on correct sides (no suspense)' },
          ],
        },
      },
      explanation: 'Errors that affect the trial balance involve the suspense account. Errors that don\u2019t affect the trial balance (principle, complete reversal) are corrected without suspense.',
      sectionLink: '7.2.2',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 2 — Accounting Records (13 items)
  // ────────────────────────────────────────────
  2: [
    {
      id: 'r2-01', chapterId: 2, sectionId: '2.1', type: 'mcq',
      prompt: 'Which book of first entry records all credit purchases of goods for resale?',
      itemData: { type: 'mcq', data: { options: ['Sales Day Book', 'Purchases Day Book', 'General Journal', 'Cash Book'], correctIndex: 1 } },
      explanation: 'The Purchases Day Book records all credit purchases of goods for resale. Cash purchases go through the Cash Book.',
      sectionLink: '2.1.2',
    },
    {
      id: 'r2-02', chapterId: 2, sectionId: '2.1', type: 'match',
      prompt: 'Match each account type with the side it increases on.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Assets', definition: 'Debit side' },
        { term: 'Liabilities', definition: 'Credit side' },
        { term: 'Expenses', definition: 'Debit side' },
        { term: 'Income', definition: 'Credit side' },
      ] } },
      explanation: 'DEAD (Debit: Expenses, Assets, Drawings) and CLIC (Credit: Capital, Liabilities, Income, Creditors).',
      sectionLink: '2.1.1',
    },
    {
      id: 'r2-03', chapterId: 2, sectionId: '2.2', type: 'sort',
      prompt: 'Sort these items into Debit or Credit side of the Trial Balance.',
      itemData: { type: 'sort', data: { buckets: ['Debit Side', 'Credit Side'], items: [
        { label: 'Drawings', correctBucket: 'Debit Side' },
        { label: 'Capital', correctBucket: 'Credit Side' },
        { label: 'Purchases', correctBucket: 'Debit Side' },
        { label: 'Sales', correctBucket: 'Credit Side' },
        { label: 'Creditors', correctBucket: 'Credit Side' },
        { label: 'Equipment', correctBucket: 'Debit Side' },
      ] } },
      explanation: 'DEAL items (Drawings, Expenses, Assets, Losses) go on the debit side. CLIP items (Capital, Liabilities, Income, Provisions) go on the credit side.',
      sectionLink: '2.2.2',
    },
    {
      id: 'r2-04', chapterId: 2, sectionId: '2.2', type: 'fill-chip',
      prompt: 'Complete the VAT calculation.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'VAT due to Revenue is calculated as Output VAT ___ Input VAT.',
        chips: ['plus', 'minus', 'multiplied by', 'divided by'],
        correctChip: 'minus',
      } },
      explanation: 'VAT due to Revenue = Output VAT (charged on sales) minus Input VAT (paid on purchases). If Input > Output, Revenue owes the business a refund.',
      sectionLink: '2.2.1',
    },
    {
      id: 'r2-05', chapterId: 2, sectionId: '2.3', type: 'sort',
      prompt: 'Classify each item as Capital Expenditure or Revenue Expenditure.',
      itemData: { type: 'sort', data: { buckets: ['Capital Expenditure', 'Revenue Expenditure'], items: [
        { label: 'Purchase of premises', correctBucket: 'Capital Expenditure' },
        { label: 'Repairs to machinery', correctBucket: 'Revenue Expenditure' },
        { label: 'Installation of new equipment', correctBucket: 'Capital Expenditure' },
        { label: 'Electricity bill', correctBucket: 'Revenue Expenditure' },
        { label: 'Extension to building', correctBucket: 'Capital Expenditure' },
        { label: 'Motor running costs', correctBucket: 'Revenue Expenditure' },
      ] } },
      explanation: 'Capital expenditure acquires or improves fixed assets (benefit > 1 year). Revenue expenditure covers day-to-day running costs (benefit for 1 period).',
      sectionLink: '2.3.1',
    },
    {
      id: 'r2-06', chapterId: 2, sectionId: '2.5', type: 'mcq',
      prompt: 'Insurance paid \u20ac8,400. Prepaid at start \u20ac600, prepaid at end \u20ac900. What is the P&L charge?',
      itemData: { type: 'mcq', data: { options: ['\u20ac8,400', '\u20ac8,100', '\u20ac8,700', '\u20ac7,500'], correctIndex: 1 } },
      explanation: 'P&L = TB figure + Opening prepayment \u2212 Closing prepayment = \u20ac8,400 + \u20ac600 \u2212 \u20ac900 = \u20ac8,100.',
      sectionLink: '2.5.2',
    },
    {
      id: 'r2-07', chapterId: 2, sectionId: '2.5', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'An expense accrued at year end is shown as a current asset on the Balance Sheet.',
        isTrue: false,
        followUp: {
          prompt: 'Where does an expense accrual appear?',
          chips: ['Current liability', 'Fixed asset', 'Capital reserve'],
          correctChip: 'Current liability',
        },
      } },
      explanation: 'An accrued expense is an amount owed but not yet paid \u2014 it is a current liability. A prepaid expense is a current asset.',
      sectionLink: '2.5.1',
    },
    {
      id: 'r2-08', chapterId: 2, sectionId: '2.6', type: 'order',
      prompt: 'Put the steps for handling bad debts in Q1 in the correct order.',
      itemData: { type: 'order', data: { steps: [
        'Write off the named bad debt \u2014 reduce debtors',
        'Calculate remaining debtors after write-off',
        'Calculate new provision as % of remaining debtors',
        'Find increase or decrease: New provision \u2212 Old provision',
      ] } },
      explanation: 'Always deduct the bad debt from debtors FIRST, then calculate the provision on the remaining figure. The change in provision is a separate P&L item.',
      sectionLink: '2.6.2',
    },
    {
      id: 'r2-09', chapterId: 2, sectionId: '2.6', type: 'mcq',
      prompt: 'Debtors \u20ac50,000. Bad debt \u20ac2,000. New provision 5%. What is the new provision amount?',
      itemData: { type: 'mcq', data: { options: ['\u20ac2,500', '\u20ac2,400', '\u20ac2,600', '\u20ac2,300'], correctIndex: 1 } },
      explanation: 'Remaining debtors = \u20ac50,000 \u2212 \u20ac2,000 = \u20ac48,000. New provision = 5% \u00d7 \u20ac48,000 = \u20ac2,400.',
      sectionLink: '2.6.1',
    },
    {
      id: 'r2-10', chapterId: 2, sectionId: '2.6', type: 'fill-chip',
      prompt: 'Complete the statement about provisions.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'A decrease in the provision for bad debts is treated as ___ in the Profit & Loss Account.',
        chips: ['an expense', 'other income', 'a fixed asset', 'drawings'],
        correctChip: 'other income',
      } },
      explanation: 'A decrease in provision means less money is set aside for potential bad debts \u2014 this releases the excess as other income in the P&L.',
      sectionLink: '2.6.1',
    },
    {
      id: 'r2-11', chapterId: 2, sectionId: '2.4', type: 'match',
      prompt: 'Match each payroll term with its description.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'PAYE', definition: 'Income tax deducted from wages at source' },
        { term: 'PRSI', definition: 'Social insurance contributions by employee and employer' },
        { term: 'USC', definition: 'Universal Social Charge on gross income' },
        { term: 'Net Pay', definition: 'Take-home pay after all deductions' },
      ] } },
      explanation: 'PAYE, PRSI, and USC are statutory deductions. The employer also pays Employer PRSI which is an additional business expense.',
      sectionLink: '2.4.1',
    },
    {
      id: 'r2-12', chapterId: 2, sectionId: '2.5', type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: { type: 'define', data: {
        term: 'Accrual',
        modelDefinition: 'An expense that has been incurred but not yet paid by the year end \u2014 shown as a current liability on the Balance Sheet.',
      } },
      explanation: 'Accruals ensure expenses are matched to the period they relate to, even if cash has not yet been paid.',
      sectionLink: '2.5.1',
    },
    {
      id: 'r2-13', chapterId: 2, sectionId: '2.6', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'The provision for discount allowed is calculated on the original debtors figure before deducting bad debts.',
        isTrue: false,
        followUp: {
          prompt: 'What is the correct base for the discount provision?',
          chips: [
            'Debtors after deducting bad debts AND provision for bad debts',
            'Total sales for the year',
            'Cash received from debtors',
          ],
          correctChip: 'Debtors after deducting bad debts AND provision for bad debts',
        },
      } },
      explanation: 'You would not offer discount on debts that are bad or likely to be bad, so deduct both first.',
      sectionLink: '2.6.3',
    },
  ],

  3: [],

  // ────────────────────────────────────────────
  // Chapter 4 — Depreciation & Revaluation (13 items)
  // ────────────────────────────────────────────
  4: [
    {
      id: 'r4-01', chapterId: 4, sectionId: '4.1', type: 'mcq',
      prompt: 'Machine costs \u20ac60,000, scrap value \u20ac6,000, useful life 9 years. What is the annual straight-line depreciation?',
      itemData: { type: 'mcq', data: { options: ['\u20ac6,000', '\u20ac6,667', '\u20ac5,400', '\u20ac7,200'], correctIndex: 0 } },
      explanation: 'Straight-line = (Cost \u2212 Scrap) / Life = (\u20ac60,000 \u2212 \u20ac6,000) / 9 = \u20ac6,000 per year.',
      sectionLink: '4.1.1',
    },
    {
      id: 'r4-02', chapterId: 4, sectionId: '4.1', type: 'match',
      prompt: 'Match each depreciation feature with the correct method.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Equal charge each year', definition: 'Straight-line method' },
        { term: 'Higher charge in early years', definition: 'Reducing balance method' },
        { term: 'Suitable for buildings and furniture', definition: 'Straight-line method' },
        { term: 'NBV never quite reaches zero', definition: 'Reducing balance method' },
      ] } },
      explanation: 'Straight-line gives equal annual charges. Reducing balance gives decreasing charges \u2014 higher in early years, suitable for assets that lose value quickly initially.',
      sectionLink: '4.1.2',
    },
    {
      id: 'r4-03', chapterId: 4, sectionId: '4.1', type: 'fill-chip',
      prompt: 'Complete the reducing balance formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Under the reducing balance method, depreciation each year is calculated as a fixed percentage of the ___ at the start of the year.',
        chips: ['original cost', 'net book value', 'scrap value', 'replacement cost'],
        correctChip: 'net book value',
      } },
      explanation: 'Reducing balance applies the rate to the NBV (cost minus accumulated depreciation), not the original cost.',
      sectionLink: '4.1.2',
    },
    {
      id: 'r4-04', chapterId: 4, sectionId: '4.2', type: 'mcq',
      prompt: 'Van cost \u20ac30,000. Accumulated depreciation \u20ac23,500. Trade-in \u20ac14,000. What is the result?',
      itemData: { type: 'mcq', data: { options: ['Loss \u20ac7,500', 'Profit \u20ac7,500', 'Loss \u20ac9,500', 'Profit \u20ac14,000'], correctIndex: 1 } },
      explanation: 'NBV = \u20ac30,000 \u2212 \u20ac23,500 = \u20ac6,500. Proceeds \u20ac14,000. Profit = \u20ac14,000 \u2212 \u20ac6,500 = \u20ac7,500.',
      sectionLink: '4.2.1',
    },
    {
      id: 'r4-05', chapterId: 4, sectionId: '4.2', type: 'order',
      prompt: 'Put the disposal account steps in the correct order.',
      itemData: { type: 'order', data: { steps: [
        'Debit Disposal with the cost of the asset',
        'Credit Disposal with accumulated depreciation',
        'Credit Disposal with the proceeds or trade-in value',
        'Calculate the balancing figure as profit or loss',
      ] } },
      explanation: 'The disposal account collects cost (Dr), removes accumulated depreciation (Cr), and records proceeds (Cr). The balance = profit or loss.',
      sectionLink: '4.2.1',
    },
    {
      id: 'r4-06', chapterId: 4, sectionId: '4.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'A revaluation reserve is treated as profit in the Profit & Loss Account.',
        isTrue: false,
        followUp: {
          prompt: 'Where does the revaluation reserve appear?',
          chips: ['Capital section of the Balance Sheet', 'Current liabilities', 'Trading Account'],
          correctChip: 'Capital section of the Balance Sheet',
        },
      } },
      explanation: 'The revaluation reserve is an unrealised gain \u2014 the asset has not been sold. It goes in the capital section of the Balance Sheet, NOT in the P&L.',
      sectionLink: '4.2.2',
    },
    {
      id: 'r4-07', chapterId: 4, sectionId: '4.2', type: 'mcq',
      prompt: 'Building NBV \u20ac312,425 revalued to \u20ac550,000. What is the revaluation reserve?',
      itemData: { type: 'mcq', data: { options: ['\u20ac312,425', '\u20ac550,000', '\u20ac237,575', '\u20ac862,425'], correctIndex: 2 } },
      explanation: 'Revaluation reserve = New value \u2212 Old NBV = \u20ac550,000 \u2212 \u20ac312,425 = \u20ac237,575.',
      sectionLink: '4.2.2',
    },
    {
      id: 'r4-08', chapterId: 4, sectionId: '4.3', type: 'sort',
      prompt: 'Sort these items by where they appear in Q1 final accounts.',
      itemData: { type: 'sort', data: { buckets: ['P&L Account', 'Balance Sheet'], items: [
        { label: 'Depreciation charge for the year', correctBucket: 'P&L Account' },
        { label: 'Accumulated depreciation', correctBucket: 'Balance Sheet' },
        { label: 'Loss on disposal', correctBucket: 'P&L Account' },
        { label: 'Revaluation reserve', correctBucket: 'Balance Sheet' },
        { label: 'Profit on disposal', correctBucket: 'P&L Account' },
        { label: 'Net book value of assets', correctBucket: 'Balance Sheet' },
      ] } },
      explanation: 'The annual charge and disposal results go to the P&L. Accumulated depreciation, NBV, and revaluation reserve are Balance Sheet items.',
      sectionLink: '4.3.1',
    },
    {
      id: 'r4-09', chapterId: 4, sectionId: '4.3', type: 'fill-chip',
      prompt: 'Complete the common Q1 trap.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'In Q1, the cheque for a new asset is often wrongly recorded in ___, which must be reversed.',
        chips: ['Sales', 'Purchases', 'Drawings', 'Capital'],
        correctChip: 'Purchases',
      } },
      explanation: 'The most common Q1 error: the cheque for a new asset is recorded as a stock purchase. Reverse it from Purchases and add the asset to Fixed Assets.',
      sectionLink: '4.3.1',
    },
    {
      id: 'r4-10', chapterId: 4, sectionId: '4.1', type: 'mcq',
      prompt: 'Asset purchased 01/04 for \u20ac24,000. Depreciation 10% SL. Year end 31/12. What is the first year charge?',
      itemData: { type: 'mcq', data: { options: ['\u20ac2,400', '\u20ac1,800', '\u20ac2,000', '\u20ac600'], correctIndex: 1 } },
      explanation: 'Time apportionment: 9 months out of 12. \u20ac24,000 \u00d7 10% \u00d7 9/12 = \u20ac1,800.',
      sectionLink: '4.1.1',
    },
    {
      id: 'r4-11', chapterId: 4, sectionId: '4.1', type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: { type: 'define', data: {
        term: 'Net Book Value',
        modelDefinition: 'The value of an asset in the books, calculated as Cost minus Accumulated Depreciation.',
      } },
      explanation: 'NBV represents what the asset is "worth" in accounting terms, not its market value.',
      sectionLink: '4.1.1',
    },
    {
      id: 'r4-12', chapterId: 4, sectionId: '4.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'After revaluation, accumulated depreciation is reset to zero and future depreciation is based on the new value.',
        isTrue: true,
      } },
      explanation: 'When an asset is revalued, old accumulated depreciation is wiped out. Depreciation going forward uses the new value and remaining useful life.',
      sectionLink: '4.3.2',
    },
    {
      id: 'r4-13', chapterId: 4, sectionId: '4.2', type: 'match',
      prompt: 'Match each term with its correct treatment.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Profit on disposal', definition: 'Other Income in P&L' },
        { term: 'Loss on disposal', definition: 'Expense in P&L' },
        { term: 'Revaluation reserve', definition: 'Capital section of Balance Sheet' },
        { term: 'Accumulated depreciation', definition: 'Deducted from cost on Balance Sheet' },
      ] } },
      explanation: 'Disposal results go to P&L. Revaluation reserve is a capital reserve. Accumulated depreciation reduces the asset\u2019s carrying value.',
      sectionLink: '4.2.1',
    },
  ],

  5: [],

  // ────────────────────────────────────────────
  // Chapter 6 — Final Accounts: Sole Trader (13 items)
  // ────────────────────────────────────────────
  6: [
    {
      id: 'r6-01', chapterId: 6, sectionId: '6.1', type: 'order',
      prompt: 'Put the three financial statements in the order they are prepared.',
      itemData: { type: 'order', data: { steps: [
        'Trading Account \u2014 calculates Gross Profit',
        'Profit & Loss Account \u2014 calculates Net Profit',
        'Balance Sheet \u2014 shows financial position',
      ] } },
      explanation: 'The Trading Account feeds Gross Profit into the P&L, which feeds Net Profit into the Balance Sheet\u2019s capital section.',
      sectionLink: '6.1.1',
    },
    {
      id: 'r6-02', chapterId: 6, sectionId: '6.1', type: 'fill-chip',
      prompt: 'Complete the Cost of Sales formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Cost of Sales = Opening Stock + Purchases \u2212 ___',
        chips: ['Creditors', 'Closing Stock', 'Sales Returns', 'Debtors'],
        correctChip: 'Closing Stock',
      } },
      explanation: 'Cost of Sales = Opening Stock + Net Purchases \u2212 Closing Stock. This gives the cost of goods actually sold during the period.',
      sectionLink: '6.1.1',
    },
    {
      id: 'r6-03', chapterId: 6, sectionId: '6.1', type: 'sort',
      prompt: 'Sort these items into the correct financial statement.',
      itemData: { type: 'sort', data: { buckets: ['Trading Account', 'P&L Account', 'Balance Sheet'], items: [
        { label: 'Opening Stock', correctBucket: 'Trading Account' },
        { label: 'Insurance', correctBucket: 'P&L Account' },
        { label: 'Creditors', correctBucket: 'Balance Sheet' },
        { label: 'Carriage Inwards', correctBucket: 'Trading Account' },
        { label: 'Depreciation', correctBucket: 'P&L Account' },
        { label: 'Prepayments', correctBucket: 'Balance Sheet' },
      ] } },
      explanation: 'Stock and carriage inwards go in the Trading Account. Expenses like insurance and depreciation go in the P&L. Assets and liabilities go on the Balance Sheet.',
      sectionLink: '6.1.1',
    },
    {
      id: 'r6-04', chapterId: 6, sectionId: '6.2', type: 'mcq',
      prompt: 'Q1 is worth how many marks on the LC HL Accounting paper?',
      itemData: { type: 'mcq', data: { options: ['80 marks', '100 marks', '120 marks', '60 marks'], correctIndex: 2 } },
      explanation: 'Q1 is the biggest question on the paper at 120 marks. Students should spend approximately 45\u201350 minutes on it.',
      sectionLink: '6.2.1',
    },
    {
      id: 'r6-05', chapterId: 6, sectionId: '6.3', type: 'mcq',
      prompt: 'The owner takes stock costing \u20ac2,000 for personal use. How is this recorded?',
      itemData: { type: 'mcq', data: { options: [
        'Dr Drawings, Cr Sales \u20ac2,000',
        'Dr Drawings, Cr Purchases \u20ac2,000',
        'Dr Purchases, Cr Drawings \u20ac2,000',
        'Dr Sales, Cr Drawings \u20ac2,000',
      ], correctIndex: 1 } },
      explanation: 'Goods for own use: reduce Purchases at cost price and increase Drawings. Never use selling price for drawings of stock.',
      sectionLink: '6.3.3',
    },
    {
      id: 'r6-06', chapterId: 6, sectionId: '6.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Discount received is an expense in the Profit & Loss Account.',
        isTrue: false,
        followUp: {
          prompt: 'What is discount received?',
          chips: ['Other income in P&L', 'A fixed asset', 'A current liability'],
          correctChip: 'Other income in P&L',
        },
      } },
      explanation: 'Discount received (from suppliers for early payment) is other income. Discount allowed (to customers) is an expense.',
      sectionLink: '6.3.1',
    },
    {
      id: 'r6-07', chapterId: 6, sectionId: '6.3', type: 'match',
      prompt: 'Match each adjustment with where it appears.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Bad debts written off', definition: 'Expense in P&L' },
        { term: 'Decrease in provision for bad debts', definition: 'Other income in P&L' },
        { term: 'Closing stock', definition: 'Trading Account and Balance Sheet' },
        { term: 'Profit on disposal', definition: 'Other income in P&L' },
      ] } },
      explanation: 'Bad debts and increases in provision are expenses. Decreases in provision and profits on disposal are other income. Closing stock appears in both the Trading Account and as a current asset.',
      sectionLink: '6.3.5',
    },
    {
      id: 'r6-08', chapterId: 6, sectionId: '6.3', type: 'fill-chip',
      prompt: 'Complete the statement about sale or return goods.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Goods on sale or return that have NOT been accepted at year end must be removed from sales and added to closing stock at ___.',
        chips: ['selling price', 'cost price', 'market value', 'trade-in value'],
        correctChip: 'cost price',
      } },
      explanation: 'Unsold sale-or-return goods are still owned by the business. Remove from sales at SP, add to stock at cost.',
      sectionLink: '6.3.2',
    },
    {
      id: 'r6-09', chapterId: 6, sectionId: '6.2', type: 'mcq',
      prompt: 'In the SEC marking scheme, what system is used to label individual workings?',
      itemData: { type: 'mcq', data: { options: ['A1, A2, A3...', 'W1, W2, W3...', 'Note 1, Note 2...', 'Step 1, Step 2...'], correctIndex: 1 } },
      explanation: 'The SEC marking scheme numbers workings W1 through W23+. Adopting this system earns method marks even if final figures are wrong.',
      sectionLink: '6.2.2',
    },
    {
      id: 'r6-10', chapterId: 6, sectionId: '6.3', type: 'sort',
      prompt: 'Classify these as Other Income or Expenses in the P&L.',
      itemData: { type: 'sort', data: { buckets: ['Other Income', 'Expenses'], items: [
        { label: 'Rent received', correctBucket: 'Other Income' },
        { label: 'Discount allowed', correctBucket: 'Expenses' },
        { label: 'Bad debts recovered', correctBucket: 'Other Income' },
        { label: 'Loss on disposal', correctBucket: 'Expenses' },
        { label: 'Discount received', correctBucket: 'Other Income' },
        { label: 'Increase in provision', correctBucket: 'Expenses' },
      ] } },
      explanation: 'Other Income includes rent/discount received, bad debts recovered, decrease in provision, profit on disposal. Expenses include all running costs plus loss on disposal, increase in provision, discount allowed.',
      sectionLink: '6.3.1',
    },
    {
      id: 'r6-11', chapterId: 6, sectionId: '6.1', type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: { type: 'define', data: {
        term: 'Balance Sheet',
        modelDefinition: 'A statement showing the financial position of a business at a specific date \u2014 listing its assets, liabilities, and capital.',
      } },
      explanation: 'The Balance Sheet is a snapshot, not a period statement. It shows what the business owns (assets), owes (liabilities), and the owner\u2019s stake (capital).',
      sectionLink: '6.1.1',
    },
    {
      id: 'r6-12', chapterId: 6, sectionId: '6.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Investment income received net of DIRT should be recorded at the net amount in the P&L.',
        isTrue: false,
        followUp: {
          prompt: 'How should it be recorded?',
          chips: ['At the gross amount (net \u00f7 0.67)', 'At double the net amount', 'Only if cash is received'],
          correctChip: 'At the gross amount (net \u00f7 0.67)',
        },
      } },
      explanation: 'Investment income goes to P&L at its gross amount. If received net of 33% DIRT: Gross = Net \u00f7 0.67.',
      sectionLink: '6.3.1',
    },
    {
      id: 'r6-13', chapterId: 6, sectionId: '6.3', type: 'mcq',
      prompt: 'Mark-up is 25%. Selling price is \u20ac500. What is the cost price?',
      itemData: { type: 'mcq', data: { options: ['\u20ac375', '\u20ac400', '\u20ac425', '\u20ac475'], correctIndex: 1 } },
      explanation: 'Mark-up 25% means SP = Cost \u00d7 1.25. So Cost = \u20ac500 \u00f7 1.25 = \u20ac400.',
      sectionLink: '6.3.2',
    },
  ],

  8: [],

  // ────────────────────────────────────────────
  // Chapter 9 — Company Accounts: Internal Use (13 items)
  // ────────────────────────────────────────────
  9: [
    {
      id: 'r9-01', chapterId: 9, sectionId: '9.1', type: 'sort',
      prompt: 'Sort these features by company type.',
      itemData: { type: 'sort', data: { buckets: ['Private Ltd', 'Public PLC'], items: [
        { label: 'Max 149 shareholders', correctBucket: 'Private Ltd' },
        { label: 'Shares traded on stock exchange', correctBucket: 'Public PLC' },
        { label: 'Min 7 shareholders', correctBucket: 'Public PLC' },
        { label: 'Cannot offer shares to the public', correctBucket: 'Private Ltd' },
        { label: 'Min share capital \u20ac25,000', correctBucket: 'Public PLC' },
        { label: 'Min 1 shareholder', correctBucket: 'Private Ltd' },
      ] } },
      explanation: 'Private companies are smaller with restricted share transfer. PLCs can trade shares publicly and have minimum capital requirements.',
      sectionLink: '9.1.1',
    },
    {
      id: 'r9-02', chapterId: 9, sectionId: '9.1', type: 'match',
      prompt: 'Match each source of finance with its description.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Ordinary Shares', definition: 'Voting rights, variable dividend, highest risk' },
        { term: 'Preference Shares', definition: 'Fixed dividend, paid first, no voting rights' },
        { term: 'Debentures', definition: 'Long-term loans, holders are creditors not owners' },
        { term: 'Retained Profits', definition: 'Cheapest source, profits not distributed' },
      ] } },
      explanation: 'Ordinary shareholders bear the most risk but have voting rights. Preference shareholders get priority dividends. Debenture holders are creditors.',
      sectionLink: '9.1.2',
    },
    {
      id: 'r9-03', chapterId: 9, sectionId: '9.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Debenture interest is shown in the appropriation account because it is a distribution of profit.',
        isTrue: false,
        followUp: {
          prompt: 'Where does debenture interest go?',
          chips: ['Above Net Profit as an expense', 'In the Balance Sheet only', 'In the Trading Account'],
          correctChip: 'Above Net Profit as an expense',
        },
      } },
      explanation: 'Debenture interest is an EXPENSE (must be paid regardless of profit). It goes above Net Profit. Dividends are distributions and go in the appropriation account.',
      sectionLink: '9.2.1',
    },
    {
      id: 'r9-04', chapterId: 9, sectionId: '9.2', type: 'mcq',
      prompt: '8% Debentures \u20ac200,000. TB shows \u20ac8,000 paid. What is the accrued interest at year end?',
      itemData: { type: 'mcq', data: { options: ['\u20ac8,000', '\u20ac16,000', '\u20ac4,000', '\u20ac12,000'], correctIndex: 0 } },
      explanation: 'Full year = 8% \u00d7 \u20ac200,000 = \u20ac16,000. Paid \u20ac8,000. Accrued = \u20ac16,000 \u2212 \u20ac8,000 = \u20ac8,000.',
      sectionLink: '9.4.2',
    },
    {
      id: 'r9-05', chapterId: 9, sectionId: '9.4', type: 'sort',
      prompt: 'Classify these expenses as Distribution Costs or Administrative Expenses.',
      itemData: { type: 'sort', data: { buckets: ['Distribution Costs', 'Administrative Expenses'], items: [
        { label: 'Advertising', correctBucket: 'Distribution Costs' },
        { label: 'Audit fees', correctBucket: 'Administrative Expenses' },
        { label: 'Carriage outwards', correctBucket: 'Distribution Costs' },
        { label: 'Office wages', correctBucket: 'Administrative Expenses' },
        { label: 'Bad debts', correctBucket: 'Distribution Costs' },
        { label: 'Rent & rates', correctBucket: 'Administrative Expenses' },
      ] } },
      explanation: 'Distribution costs relate to selling and delivering goods. Administrative expenses relate to running the office.',
      sectionLink: '9.4.1',
    },
    {
      id: 'r9-06', chapterId: 9, sectionId: '9.3', type: 'sort',
      prompt: 'Classify these reserves as Capital or Revenue.',
      itemData: { type: 'sort', data: { buckets: ['Capital Reserve', 'Revenue Reserve'], items: [
        { label: 'Share Premium', correctBucket: 'Capital Reserve' },
        { label: 'General Reserve', correctBucket: 'Revenue Reserve' },
        { label: 'Revaluation Reserve', correctBucket: 'Capital Reserve' },
        { label: 'P&L Balance', correctBucket: 'Revenue Reserve' },
      ] } },
      explanation: 'Capital reserves (share premium, revaluation) cannot be used for dividends. Revenue reserves (general reserve, P&L balance) are distributable.',
      sectionLink: '9.3.2',
    },
    {
      id: 'r9-07', chapterId: 9, sectionId: '9.4', type: 'mcq',
      prompt: '400,000 ordinary shares. Final dividend proposed: 5c per share. What current liability is shown?',
      itemData: { type: 'mcq', data: { options: ['\u20ac2,000', '\u20ac20,000', '\u20ac200,000', '\u20ac5,000'], correctIndex: 1 } },
      explanation: '400,000 \u00d7 \u20ac0.05 = \u20ac20,000. The proposed final dividend is a current liability on the Balance Sheet.',
      sectionLink: '9.4.4',
    },
    {
      id: 'r9-08', chapterId: 9, sectionId: '9.4', type: 'fill-chip',
      prompt: 'Complete the share issue entry.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'When shares are issued above nominal value, the excess is credited to the ___ account.',
        chips: ['General Reserve', 'Share Premium', 'Revaluation Reserve', 'P&L'],
        correctChip: 'Share Premium',
      } },
      explanation: 'Share premium = (Issue price \u2212 Nominal value) \u00d7 Number of shares. It is a capital reserve.',
      sectionLink: '9.4.3',
    },
    {
      id: 'r9-09', chapterId: 9, sectionId: '9.2', type: 'order',
      prompt: 'Put the company P&L sections in the correct order.',
      itemData: { type: 'order', data: { steps: [
        'Gross Profit',
        'Operating Profit (after Distribution and Admin)',
        'Net Profit before Tax (after investment income and debenture interest)',
        'Net Profit after Tax',
        'Appropriation (dividends and retained profit)',
      ] } },
      explanation: 'The company P&L flows from Gross Profit through Operating Profit, then adjusts for financing items, deducts tax, and finally appropriates the after-tax profit.',
      sectionLink: '9.2.1',
    },
    {
      id: 'r9-10', chapterId: 9, sectionId: '9.1', type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: { type: 'define', data: {
        term: 'Limited Liability',
        modelDefinition: 'Shareholders can only lose the amount they have invested or agreed to invest \u2014 their personal assets are protected from company debts.',
      } },
      explanation: 'This is a key advantage of incorporation. The company is a separate legal entity, so shareholders\u2019 personal wealth is not at risk.',
      sectionLink: '9.1.1',
    },
    {
      id: 'r9-11', chapterId: 9, sectionId: '9.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'An interim dividend that has already been paid appears as a current liability on the Balance Sheet.',
        isTrue: false,
        followUp: {
          prompt: 'Which dividend type is a current liability?',
          chips: ['Final (proposed) dividend', 'Last year\u2019s dividend', 'Preference dividend always'],
          correctChip: 'Final (proposed) dividend',
        },
      } },
      explanation: 'Interim dividends are already paid \u2014 no balance sheet liability. Only proposed (final) dividends are current liabilities.',
      sectionLink: '9.2.2',
    },
    {
      id: 'r9-12', chapterId: 9, sectionId: '9.4', type: 'mcq',
      prompt: 'Company issues 50,000 shares (\u20ac1 nominal) at \u20ac1.40 each. What is the share premium?',
      itemData: { type: 'mcq', data: { options: ['\u20ac50,000', '\u20ac70,000', '\u20ac20,000', '\u20ac1.40'], correctIndex: 2 } },
      explanation: 'Share premium = 50,000 \u00d7 (\u20ac1.40 \u2212 \u20ac1.00) = 50,000 \u00d7 \u20ac0.40 = \u20ac20,000.',
      sectionLink: '9.4.3',
    },
    {
      id: 'r9-13', chapterId: 9, sectionId: '9.3', type: 'match',
      prompt: 'Match each Balance Sheet item with its location.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Corporation tax due', definition: 'Current liabilities' },
        { term: 'Share premium', definition: 'Capital reserves' },
        { term: 'Proposed dividend', definition: 'Current liabilities' },
        { term: 'General reserve', definition: 'Revenue reserves' },
      ] } },
      explanation: 'Tax and proposed dividends are current liabilities (owed but unpaid). Share premium is a capital reserve. General reserve is a revenue reserve.',
      sectionLink: '9.3.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 10 — Published Accounts (12 items)
  // ────────────────────────────────────────────
  10: [
    {
      id: 'r10-01', chapterId: 10, sectionId: '10.1', type: 'mcq',
      prompt: 'Which of the following is NOT one of the components that must be published?',
      itemData: { type: 'mcq', data: { options: ['Directors\u2019 Report', 'Auditor\u2019s Report', 'Management accounts', 'Notes to the Accounts'], correctIndex: 2 } },
      explanation: 'Management accounts are internal documents and are not published. Published accounts include the directors\u2019 report, financial statements, notes, and auditor\u2019s report.',
      sectionLink: '10.1.1',
    },
    {
      id: 'r10-02', chapterId: 10, sectionId: '10.1', type: 'match',
      prompt: 'Match the published accounts feature with its description.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Internal P&L', definition: 'Shows individual expenses in detail' },
        { term: 'Published P&L', definition: 'Groups expenses into Distribution Costs and Admin' },
        { term: 'Notes to Accounts', definition: 'Provides detailed breakdowns of summary figures' },
        { term: 'Directors\u2019 Report', definition: 'Overview of activities and future developments' },
      ] } },
      explanation: 'Published accounts show summary figures with detail in the notes. Internal accounts show all individual expense items.',
      sectionLink: '10.1.2',
    },
    {
      id: 'r10-03', chapterId: 10, sectionId: '10.2', type: 'sort',
      prompt: 'Sort these items by whether they appear in the Notes to the Accounts.',
      itemData: { type: 'sort', data: { buckets: ['Required in Notes', 'Not in Notes'], items: [
        { label: 'Fixed asset schedule', correctBucket: 'Required in Notes' },
        { label: 'Managing director\u2019s salary', correctBucket: 'Not in Notes' },
        { label: 'Accounting policies', correctBucket: 'Required in Notes' },
        { label: 'Creditors breakdown', correctBucket: 'Required in Notes' },
        { label: 'Individual expense amounts', correctBucket: 'Not in Notes' },
        { label: 'Share capital movements', correctBucket: 'Required in Notes' },
      ] } },
      explanation: 'The notes disclose policies, fixed assets, debtors/creditors breakdown, share capital, and reserves. Individual expense figures are internal detail.',
      sectionLink: '10.2.1',
    },
    {
      id: 'r10-04', chapterId: 10, sectionId: '10.1', type: 'fill-chip',
      prompt: 'Complete the regulatory requirement.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Published accounts must follow the requirements of ___ in Ireland.',
        chips: ['GAAP only', 'FRS 102 and the Companies Act', 'EU directives only', 'Revenue guidelines'],
        correctChip: 'FRS 102 and the Companies Act',
      } },
      explanation: 'FRS 102 is the Financial Reporting Standard for the UK and Ireland. The Companies Act 2014 sets out legal requirements for Irish companies.',
      sectionLink: '10.1.1',
    },
    {
      id: 'r10-05', chapterId: 10, sectionId: '10.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'The published P&L shows the same level of detail as the internal P&L.',
        isTrue: false,
        followUp: {
          prompt: 'How does the published P&L differ?',
          chips: [
            'It groups expenses into Distribution Costs and Admin only',
            'It shows more detail than the internal version',
            'It does not include gross profit',
          ],
          correctChip: 'It groups expenses into Distribution Costs and Admin only',
        },
      } },
      explanation: 'The published P&L is a summary. Individual expenses are not shown \u2014 they are grouped and the detail is in the notes.',
      sectionLink: '10.1.2',
    },
    {
      id: 'r10-06', chapterId: 10, sectionId: '10.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'True and Fair View',
        modelDefinition: 'Financial statements must present an accurate and unbiased picture of the company\u2019s financial position and performance.',
      } },
      explanation: 'The auditor expresses an opinion on whether the accounts give a true and fair view. This is the central requirement of financial reporting.',
      sectionLink: '10.1.1',
    },
    {
      id: 'r10-07', chapterId: 10, sectionId: '10.2', type: 'order',
      prompt: 'Put these published account components in a logical order.',
      itemData: { type: 'order', data: { steps: [
        'Directors\u2019 Report',
        'Income Statement (P&L)',
        'Balance Sheet',
        'Cash Flow Statement',
        'Notes to the Accounts',
        'Auditor\u2019s Report',
      ] } },
      explanation: 'The directors\u2019 report sets context, then the three financial statements, then the supporting notes, and finally the auditor\u2019s opinion.',
      sectionLink: '10.1.1',
    },
    {
      id: 'r10-08', chapterId: 10, sectionId: '10.2', type: 'mcq',
      prompt: 'Which note discloses depreciation methods and stock valuation approaches?',
      itemData: { type: 'mcq', data: { options: ['Fixed asset schedule', 'Accounting policies note', 'Creditors breakdown', 'Share capital note'], correctIndex: 1 } },
      explanation: 'The accounting policies note is typically Note 1, disclosing the methods chosen for depreciation, stock valuation, revenue recognition, etc.',
      sectionLink: '10.2.1',
    },
    {
      id: 'r10-09', chapterId: 10, sectionId: '10.2', type: 'match',
      prompt: 'Match each note type with what it discloses.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Fixed asset schedule', definition: 'Cost, additions, disposals, accumulated depreciation by class' },
        { term: 'Debtors note', definition: 'Trade debtors, prepayments, other debtors' },
        { term: 'Creditors note', definition: 'Trade creditors, accruals, taxation, proposed dividends' },
        { term: 'Reserves note', definition: 'Opening balance, transfers, closing balance' },
      ] } },
      explanation: 'Each note provides the detail behind a summary Balance Sheet figure, allowing users to understand the composition of each item.',
      sectionLink: '10.2.1',
    },
    {
      id: 'r10-10', chapterId: 10, sectionId: '10.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Contingent liabilities must be disclosed in the notes to the accounts even though they may never materialise.',
        isTrue: true,
      } },
      explanation: 'A contingent liability is a possible obligation depending on future events. It must be disclosed so users are aware of the potential risk.',
      sectionLink: '10.2.1',
    },
    {
      id: 'r10-11', chapterId: 10, sectionId: '10.1', type: 'fill-chip',
      prompt: 'Complete the statement about published accounts.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Published accounts must be filed with the ___ in Ireland.',
        chips: ['Revenue Commissioners', 'Companies Registration Office (CRO)', 'Central Bank', 'IAASA'],
        correctChip: 'Companies Registration Office (CRO)',
      } },
      explanation: 'Companies must file their annual return and financial statements with the CRO. Revenue receives tax returns separately.',
      sectionLink: '10.1.1',
    },
    {
      id: 'r10-12', chapterId: 10, sectionId: '10.1', type: 'mcq',
      prompt: 'The fixed asset schedule in the notes shows which of the following?',
      itemData: { type: 'mcq', data: { options: [
        'Only the NBV of each asset class',
        'Cost, additions, disposals, and accumulated depreciation',
        'Only assets purchased this year',
        'Market values of all assets',
      ], correctIndex: 1 } },
      explanation: 'The fixed asset note shows the full movement: opening cost, additions, disposals, and the breakdown of accumulated depreciation.',
      sectionLink: '10.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 11 — Manufacturing Accounts (13 items)
  // ────────────────────────────────────────────
  11: [
    {
      id: 'r11-01', chapterId: 11, sectionId: '11.1', type: 'order',
      prompt: 'Put the three stages of manufacturing cost in the correct order.',
      itemData: { type: 'order', data: { steps: [
        'Prime Cost (direct materials + direct labour + direct expenses)',
        'Add Factory Overhead (indirect manufacturing costs)',
        'Adjust for WIP to give Cost of Manufacture',
      ] } },
      explanation: 'Manufacturing costs flow: direct costs form Prime Cost, add factory overhead, then adjust for opening and closing WIP to get Cost of Manufacture.',
      sectionLink: '11.1.1',
    },
    {
      id: 'r11-02', chapterId: 11, sectionId: '11.1', type: 'fill-chip',
      prompt: 'Complete the Prime Cost formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Prime Cost = Direct Materials + Direct Labour + Direct ___',
        chips: ['Overhead', 'Expenses', 'Profit', 'Sales'],
        correctChip: 'Expenses',
      } },
      explanation: 'Prime Cost consists of all DIRECT costs: materials, labour, and expenses (e.g. royalties). Indirect costs are factory overhead.',
      sectionLink: '11.1.1',
    },
    {
      id: 'r11-03', chapterId: 11, sectionId: '11.1', type: 'sort',
      prompt: 'Sort these costs into Direct or Indirect (Factory Overhead).',
      itemData: { type: 'sort', data: { buckets: ['Direct Cost', 'Indirect Cost (Overhead)'], items: [
        { label: 'Raw materials used in production', correctBucket: 'Direct Cost' },
        { label: 'Factory rent', correctBucket: 'Indirect Cost (Overhead)' },
        { label: 'Production workers\u2019 wages', correctBucket: 'Direct Cost' },
        { label: 'Factory supervisor salary', correctBucket: 'Indirect Cost (Overhead)' },
        { label: 'Royalties per unit', correctBucket: 'Direct Cost' },
        { label: 'Factory depreciation', correctBucket: 'Indirect Cost (Overhead)' },
      ] } },
      explanation: 'Direct costs can be traced to specific products. Indirect costs (overheads) cannot be traced directly and must be shared.',
      sectionLink: '11.1.2',
    },
    {
      id: 'r11-04', chapterId: 11, sectionId: '11.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Closing WIP is added to factory costs in the Manufacturing Account.',
        isTrue: false,
        followUp: {
          prompt: 'How is closing WIP treated?',
          chips: ['Deducted from factory costs', 'Added to sales', 'Ignored'],
          correctChip: 'Deducted from factory costs',
        },
      } },
      explanation: 'Opening WIP is added (needs to be finished). Closing WIP is deducted (not yet complete, so its cost should not be in cost of manufacture).',
      sectionLink: '11.2.1',
    },
    {
      id: 'r11-05', chapterId: 11, sectionId: '11.3', type: 'sort',
      prompt: 'Sort these stock types by which account they appear in.',
      itemData: { type: 'sort', data: { buckets: ['Manufacturing Account', 'Trading Account', 'Balance Sheet (Current Assets)'], items: [
        { label: 'Raw materials stock', correctBucket: 'Manufacturing Account' },
        { label: 'Finished goods stock', correctBucket: 'Trading Account' },
        { label: 'Work in progress', correctBucket: 'Manufacturing Account' },
        { label: 'All three stock types (closing)', correctBucket: 'Balance Sheet (Current Assets)' },
      ] } },
      explanation: 'Raw materials and WIP belong in the Manufacturing Account. Finished goods stock goes in the Trading Account. All three closing stocks appear as current assets on the Balance Sheet.',
      sectionLink: '11.3.1',
    },
    {
      id: 'r11-06', chapterId: 11, sectionId: '11.1', type: 'match',
      prompt: 'Match each apportionment basis with the cost it applies to.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Floor area', definition: 'Rent, rates, insurance' },
        { term: 'Book value of assets', definition: 'Depreciation, asset insurance' },
        { term: 'Number of employees', definition: 'Canteen costs, welfare' },
        { term: 'Direct labour hours', definition: 'Factory overhead rate' },
      ] } },
      explanation: 'Each shared cost is apportioned using the most logical basis. Floor area for space-related costs, asset values for asset-related costs.',
      sectionLink: '11.1.2',
    },
    {
      id: 'r11-07', chapterId: 11, sectionId: '11.4', type: 'mcq',
      prompt: 'Total rent \u20ac30,000. Factory occupies 70% of floor area. What goes to the Manufacturing Account?',
      itemData: { type: 'mcq', data: { options: ['\u20ac9,000', '\u20ac21,000', '\u20ac30,000', '\u20ac15,000'], correctIndex: 1 } },
      explanation: '70% \u00d7 \u20ac30,000 = \u20ac21,000 to factory. The remaining \u20ac9,000 goes to expenses in the P&L.',
      sectionLink: '11.4.2',
    },
    {
      id: 'r11-08', chapterId: 11, sectionId: '11.3', type: 'fill-chip',
      prompt: 'Complete the statement about the Trading Account.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'In a manufacturing business, the ___ replaces Purchases in the Trading Account.',
        chips: ['Prime Cost', 'Cost of Manufacture', 'Factory Overhead', 'Raw Materials Consumed'],
        correctChip: 'Cost of Manufacture',
      } },
      explanation: 'The Cost of Manufacture from the Manufacturing Account flows into the Trading Account in place of Purchases.',
      sectionLink: '11.3.1',
    },
    {
      id: 'r11-09', chapterId: 11, sectionId: '11.1', type: 'define',
      prompt: 'Define the following accounting term.',
      itemData: { type: 'define', data: {
        term: 'Prime Cost',
        modelDefinition: 'The total of all costs directly traceable to production: Direct Materials + Direct Labour + Direct Expenses.',
      } },
      explanation: 'Prime Cost represents the costs that can be identified with specific products. Factory overhead (indirect costs) is added separately.',
      sectionLink: '11.1.1',
    },
    {
      id: 'r11-10', chapterId: 11, sectionId: '11.1', type: 'mcq',
      prompt: 'Opening raw materials \u20ac18,000. Purchases \u20ac92,000. Carriage in \u20ac3,500. Closing raw materials \u20ac15,000. What is raw materials consumed?',
      itemData: { type: 'mcq', data: { options: ['\u20ac98,500', '\u20ac96,500', '\u20ac110,000', '\u20ac95,500'], correctIndex: 0 } },
      explanation: 'Raw materials consumed = \u20ac18,000 + \u20ac92,000 + \u20ac3,500 \u2212 \u20ac15,000 = \u20ac98,500.',
      sectionLink: '11.4.1',
    },
    {
      id: 'r11-11', chapterId: 11, sectionId: '11.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Carriage inwards on raw materials is included in the Manufacturing Account, not the Trading Account.',
        isTrue: true,
      } },
      explanation: 'Carriage inwards on raw materials is a direct cost of getting materials to the factory. It goes in the Manufacturing Account as part of raw materials consumed.',
      sectionLink: '11.1.1',
    },
    {
      id: 'r11-12', chapterId: 11, sectionId: '11.4', type: 'mcq',
      prompt: 'Prime Cost \u20ac168,500 + Factory Overhead \u20ac35,800 + Opening WIP \u20ac7,500 \u2212 Closing WIP \u20ac9,200. Cost of Manufacture?',
      itemData: { type: 'mcq', data: { options: ['\u20ac204,300', '\u20ac202,600', '\u20ac211,800', '\u20ac195,100'], correctIndex: 1 } },
      explanation: '\u20ac168,500 + \u20ac35,800 + \u20ac7,500 \u2212 \u20ac9,200 = \u20ac202,600.',
      sectionLink: '11.4.1',
    },
    {
      id: 'r11-13', chapterId: 11, sectionId: '11.1', type: 'match',
      prompt: 'Match each stock type with its description.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Raw materials', definition: 'Unprocessed inputs waiting to be used in production' },
        { term: 'Work in progress', definition: 'Partially completed goods at the accounting date' },
        { term: 'Finished goods', definition: 'Completed products ready for sale' },
        { term: 'Direct expenses', definition: 'Non-material costs traceable to specific products (e.g. royalties)' },
      ] } },
      explanation: 'A manufacturing business has three types of stock plus direct expenses like royalties that are traceable to production.',
      sectionLink: '11.1.1',
    },
  ],

  12: [],
  13: [],
  14: [],
  15: [],
  16: [],

  // ────────────────────────────────────────────
  // Chapter 17 — Cash Flow Statements (13 items)
  // ────────────────────────────────────────────
  17: [
    {
      id: 'r17-01', chapterId: 17, sectionId: '17.1', type: 'mcq',
      prompt: 'Why can a profitable business still run out of cash?',
      itemData: { type: 'mcq', data: { options: [
        'Because profit always equals cash',
        'Because depreciation, credit sales, and stock changes create timing differences',
        'Because the bank always takes all profits',
        'Because expenses are never paid in cash',
      ], correctIndex: 1 } },
      explanation: 'Profit \u2260 Cash. Depreciation is a non-cash expense, credit sales generate income but not immediate cash, and stock purchases use cash before goods are sold.',
      sectionLink: '17.1.1',
    },
    {
      id: 'r17-02', chapterId: 17, sectionId: '17.2', type: 'sort',
      prompt: 'Sort these adjustments by whether they are added or deducted when converting Operating Profit to Cash.',
      itemData: { type: 'sort', data: { buckets: ['Add Back', 'Deduct'], items: [
        { label: 'Depreciation', correctBucket: 'Add Back' },
        { label: 'Increase in stock', correctBucket: 'Deduct' },
        { label: 'Decrease in debtors', correctBucket: 'Add Back' },
        { label: 'Increase in debtors', correctBucket: 'Deduct' },
        { label: 'Increase in creditors', correctBucket: 'Add Back' },
        { label: 'Loss on disposal', correctBucket: 'Add Back' },
      ] } },
      explanation: 'Assets up = cash down (deduct). Liabilities up = cash in (add). Non-cash expenses like depreciation and loss on disposal are added back.',
      sectionLink: '17.2.1',
    },
    {
      id: 'r17-03', chapterId: 17, sectionId: '17.3', type: 'sort',
      prompt: 'Classify each item as Operating, Investing, or Financing activity.',
      itemData: { type: 'sort', data: { buckets: ['Operating', 'Investing', 'Financing'], items: [
        { label: 'Cash received from customers', correctBucket: 'Operating' },
        { label: 'Purchase of equipment', correctBucket: 'Investing' },
        { label: 'Issue of shares', correctBucket: 'Financing' },
        { label: 'Tax paid', correctBucket: 'Operating' },
        { label: 'Proceeds from sale of building', correctBucket: 'Investing' },
        { label: 'Repayment of debentures', correctBucket: 'Financing' },
      ] } },
      explanation: 'Operating = main business activities. Investing = buying/selling fixed assets. Financing = changes in capital structure (shares, loans, dividends).',
      sectionLink: '17.3.1',
    },
    {
      id: 'r17-04', chapterId: 17, sectionId: '17.2', type: 'fill-chip',
      prompt: 'Complete the memory aid for cash flow adjustments.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Assets going UP means cash going ___.',
        chips: ['UP', 'DOWN', 'SIDEWAYS', 'NOWHERE'],
        correctChip: 'DOWN',
      } },
      explanation: 'When assets increase (e.g. more stock or debtors), cash has been used up. So increases in current assets are deducted from operating profit.',
      sectionLink: '17.2.1',
    },
    {
      id: 'r17-05', chapterId: 17, sectionId: '17.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Depreciation is deducted from Operating Profit in the cash flow statement because it is a cash payment.',
        isTrue: false,
        followUp: {
          prompt: 'Why is depreciation added back?',
          chips: [
            'It was deducted in the P&L but involves no cash outflow',
            'It is always refunded by the bank',
            'It only applies to investing activities',
          ],
          correctChip: 'It was deducted in the P&L but involves no cash outflow',
        },
      } },
      explanation: 'Depreciation is a non-cash expense \u2014 it reduces profit but no cash leaves the business. It is added back to convert profit to cash.',
      sectionLink: '17.2.1',
    },
    {
      id: 'r17-06', chapterId: 17, sectionId: '17.3', type: 'mcq',
      prompt: 'Opening equipment cost \u20ac120,000. Closing cost \u20ac155,000. Equipment disposed had cost \u20ac25,000. What were purchases?',
      itemData: { type: 'mcq', data: { options: ['\u20ac35,000', '\u20ac60,000', '\u20ac50,000', '\u20ac25,000'], correctIndex: 1 } },
      explanation: 'Purchases = Closing \u2212 Opening + Disposals at cost = \u20ac155,000 \u2212 \u20ac120,000 + \u20ac25,000 = \u20ac60,000.',
      sectionLink: '17.3.1',
    },
    {
      id: 'r17-07', chapterId: 17, sectionId: '17.4', type: 'mcq',
      prompt: 'Opening tax liability \u20ac45,000. Tax charge \u20ac52,000. Closing tax liability \u20ac48,000. Cash tax paid?',
      itemData: { type: 'mcq', data: { options: ['\u20ac52,000', '\u20ac49,000', '\u20ac45,000', '\u20ac48,000'], correctIndex: 1 } },
      explanation: 'Cash paid = Opening + Charge \u2212 Closing = \u20ac45,000 + \u20ac52,000 \u2212 \u20ac48,000 = \u20ac49,000.',
      sectionLink: '17.4.1',
    },
    {
      id: 'r17-08', chapterId: 17, sectionId: '17.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Cash Flow Statement',
        modelDefinition: 'A financial statement that shows the sources and uses of cash during the accounting period \u2014 explaining the change in the cash/bank balance.',
      } },
      explanation: 'The cash flow statement bridges the gap between profit and cash by categorising all cash movements into operating, investing, and financing.',
      sectionLink: '17.1.1',
    },
    {
      id: 'r17-09', chapterId: 17, sectionId: '17.3', type: 'match',
      prompt: 'Match each activity type with its example.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Operating', definition: 'Interest paid on loans' },
        { term: 'Investing', definition: 'Purchase of new machinery' },
        { term: 'Financing', definition: 'Proceeds from issuing shares' },
        { term: 'Operating', definition: 'Dividends received from investments' },
      ] } },
      explanation: 'Interest and dividends received are typically operating. Purchase/sale of assets is investing. Share issues and loan changes are financing.',
      sectionLink: '17.3.2',
    },
    {
      id: 'r17-10', chapterId: 17, sectionId: '17.2', type: 'order',
      prompt: 'Put the indirect method steps in order.',
      itemData: { type: 'order', data: { steps: [
        'Start with Operating Profit',
        'Add back depreciation and loss on disposal',
        'Adjust for changes in working capital (stock, debtors, creditors)',
        'Deduct interest paid and tax paid',
        'Arrive at Net Cash from Operating Activities',
      ] } },
      explanation: 'The indirect method converts accrual-based Operating Profit to cash by adjusting for non-cash items and working capital changes.',
      sectionLink: '17.2.1',
    },
    {
      id: 'r17-11', chapterId: 17, sectionId: '17.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'A decrease in stock is added to operating profit in the cash flow statement.',
        isTrue: true,
      } },
      explanation: 'When stock decreases, less cash is tied up in inventory. The cash released is added back. Conversely, an increase in stock means cash was spent, so it\u2019s deducted.',
      sectionLink: '17.2.1',
    },
    {
      id: 'r17-12', chapterId: 17, sectionId: '17.4', type: 'fill-chip',
      prompt: 'Complete the formula for calculating cash paid.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Cash paid = Opening liability + P&L charge \u2212 ___',
        chips: ['Closing asset', 'Closing liability', 'Opening asset', 'Depreciation'],
        correctChip: 'Closing liability',
      } },
      explanation: 'Using a T-account: Opening balance + Charge \u2212 Cash paid = Closing balance. Rearranged: Cash paid = Opening + Charge \u2212 Closing.',
      sectionLink: '17.4.1',
    },
    {
      id: 'r17-13', chapterId: 17, sectionId: '17.1', type: 'mcq',
      prompt: 'The net of all three sections of the cash flow statement should equal what?',
      itemData: { type: 'mcq', data: { options: [
        'Net Profit for the year',
        'The change in cash/bank balance',
        'Total assets',
        'Operating profit',
      ], correctIndex: 1 } },
      explanation: 'Operating + Investing + Financing = Change in cash/bank from opening to closing Balance Sheet.',
      sectionLink: '17.3.2',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 18 — Ratio Analysis & Interpretation (14 items)
  // ────────────────────────────────────────────
  18: [
    {
      id: 'r18-01', chapterId: 18, sectionId: '18.1', type: 'match',
      prompt: 'Match each profitability ratio with its formula.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Gross Profit %', definition: 'GP / Sales \u00d7 100' },
        { term: 'Net Profit %', definition: 'NP / Sales \u00d7 100' },
        { term: 'ROCE', definition: 'NP / Capital Employed \u00d7 100' },
        { term: 'Mark-Up', definition: 'GP / Cost of Sales \u00d7 100' },
      ] } },
      explanation: 'Profitability ratios measure different levels of profit relative to sales or capital.',
      sectionLink: '18.1.1',
    },
    {
      id: 'r18-02', chapterId: 18, sectionId: '18.1', type: 'mcq',
      prompt: 'Current assets \u20ac60,000. Stock \u20ac20,000. Current liabilities \u20ac30,000. What is the acid test ratio?',
      itemData: { type: 'mcq', data: { options: ['2:1', '1.33:1', '3:1', '0.67:1'], correctIndex: 1 } },
      explanation: 'Acid test = (CA \u2212 Stock) / CL = (\u20ac60,000 \u2212 \u20ac20,000) / \u20ac30,000 = \u20ac40,000 / \u20ac30,000 = 1.33:1.',
      sectionLink: '18.1.2',
    },
    {
      id: 'r18-03', chapterId: 18, sectionId: '18.1', type: 'fill-chip',
      prompt: 'Complete the ideal ratio benchmark.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'The ideal current ratio is ___.',
        chips: ['1:1', '2:1', '3:1', '0.5:1'],
        correctChip: '2:1',
      } },
      explanation: 'The ideal current ratio is 2:1 \u2014 \u20ac2 of current assets for every \u20ac1 of current liabilities. The ideal acid test is 1:1.',
      sectionLink: '18.1.2',
    },
    {
      id: 'r18-04', chapterId: 18, sectionId: '18.1', type: 'sort',
      prompt: 'Classify these ratios by category.',
      itemData: { type: 'sort', data: { buckets: ['Profitability', 'Liquidity', 'Activity'], items: [
        { label: 'Gross Profit %', correctBucket: 'Profitability' },
        { label: 'Current Ratio', correctBucket: 'Liquidity' },
        { label: 'Stock Turnover', correctBucket: 'Activity' },
        { label: 'Acid Test', correctBucket: 'Liquidity' },
        { label: 'ROCE', correctBucket: 'Profitability' },
        { label: 'Debtors Collection Period', correctBucket: 'Activity' },
      ] } },
      explanation: 'Profitability measures profit levels, liquidity measures ability to pay debts, activity measures efficiency of asset use.',
      sectionLink: '18.1.1',
    },
    {
      id: 'r18-05', chapterId: 18, sectionId: '18.1', type: 'match',
      prompt: 'Match each investment ratio with its formula.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'EPS', definition: '(PAT \u2212 Pref Div) / No. of Ordinary Shares' },
        { term: 'Dividend Yield', definition: 'DPS / Market Price \u00d7 100' },
        { term: 'P/E Ratio', definition: 'Market Price / EPS' },
        { term: 'Interest Cover', definition: 'Operating Profit / Interest payable' },
      ] } },
      explanation: 'Investment ratios help shareholders and analysts assess the return and risk of investing in a company.',
      sectionLink: '18.1.4',
    },
    {
      id: 'r18-06', chapterId: 18, sectionId: '18.2', type: 'order',
      prompt: 'Put the ratio interpretation steps in order.',
      itemData: { type: 'order', data: { steps: [
        'Calculate the ratio for both years',
        'State the trend \u2014 improved or worsened',
        'Give a reason for the change',
        'Suggest a remedy or action',
      ] } },
      explanation: 'A full interpretation requires calculation, trend analysis, explanation, and recommendation. The SEC awards marks for each step.',
      sectionLink: '18.2.1',
    },
    {
      id: 'r18-07', chapterId: 18, sectionId: '18.2', type: 'sort',
      prompt: 'Match each stakeholder with the ratios most relevant to them.',
      itemData: { type: 'sort', data: { buckets: ['Shareholders', 'Banks/Lenders'], items: [
        { label: 'EPS', correctBucket: 'Shareholders' },
        { label: 'Current Ratio', correctBucket: 'Banks/Lenders' },
        { label: 'Dividend Yield', correctBucket: 'Shareholders' },
        { label: 'Gearing Ratio', correctBucket: 'Banks/Lenders' },
        { label: 'P/E Ratio', correctBucket: 'Shareholders' },
        { label: 'Interest Cover', correctBucket: 'Banks/Lenders' },
      ] } },
      explanation: 'Shareholders focus on returns (EPS, dividends, P/E). Banks focus on ability to repay (liquidity, gearing, interest cover).',
      sectionLink: '18.2.2',
    },
    {
      id: 'r18-08', chapterId: 18, sectionId: '18.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'A current ratio of 5:1 is always better than 2:1.',
        isTrue: false,
        followUp: {
          prompt: 'Why can a very high current ratio be bad?',
          chips: [
            'Too much idle cash or stock \u2014 capital not used efficiently',
            'It means the business is bankrupt',
            'It indicates too many employees',
          ],
          correctChip: 'Too much idle cash or stock \u2014 capital not used efficiently',
        },
      } },
      explanation: 'A very high current ratio suggests excessive stock or cash sitting idle when it could be invested. The ideal is around 2:1.',
      sectionLink: '18.1.2',
    },
    {
      id: 'r18-09', chapterId: 18, sectionId: '18.1', type: 'mcq',
      prompt: 'Gearing ratio is 60%. What does this mean?',
      itemData: { type: 'mcq', data: { options: [
        'Low gearing \u2014 low financial risk',
        'High gearing \u2014 more debt than equity, higher risk',
        'The company has no debt',
        'The company is very profitable',
      ], correctIndex: 1 } },
      explanation: 'Gearing above 50% = high gearing. The company relies heavily on borrowed funds, increasing financial risk but interest is tax-deductible.',
      sectionLink: '18.1.4',
    },
    {
      id: 'r18-10', chapterId: 18, sectionId: '18.2', type: 'mcq',
      prompt: 'Which is NOT a limitation of ratio analysis?',
      itemData: { type: 'mcq', data: { options: [
        'Based on historical data',
        'Different accounting policies make comparison difficult',
        'Ratios are calculated using exact formulas',
        'Non-financial factors are ignored',
      ], correctIndex: 2 } },
      explanation: 'Using exact formulas is a feature, not a limitation. The real limitations include historical bias, policy differences, window dressing, and ignoring non-financial factors.',
      sectionLink: '18.2.3',
    },
    {
      id: 'r18-11', chapterId: 18, sectionId: '18.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Return on Capital Employed (ROCE)',
        modelDefinition: 'Net Profit divided by Capital Employed, multiplied by 100. Known as the "master ratio" \u2014 measures the return generated on the total investment in the business.',
      } },
      explanation: 'ROCE shows how efficiently the total capital (equity + long-term debt) is being used to generate profit.',
      sectionLink: '18.1.1',
    },
    {
      id: 'r18-12', chapterId: 18, sectionId: '18.1', type: 'fill-chip',
      prompt: 'Complete the stock turnover formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Stock Turnover = Cost of Sales / ___',
        chips: ['Total Sales', 'Average Stock', 'Closing Stock', 'Opening Stock'],
        correctChip: 'Average Stock',
      } },
      explanation: 'Stock Turnover = COS / Average Stock. Average Stock = (Opening + Closing) / 2. A higher turnover means stock is sold and replaced faster.',
      sectionLink: '18.1.3',
    },
    {
      id: 'r18-13', chapterId: 18, sectionId: '18.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Window dressing refers to companies manipulating year-end figures to make ratios look better.',
        isTrue: true,
      } },
      explanation: 'Window dressing is a recognised limitation of ratio analysis. Companies may delay payments or accelerate receipts around year end to improve liquidity ratios.',
      sectionLink: '18.2.3',
    },
    {
      id: 'r18-14', chapterId: 18, sectionId: '18.1', type: 'mcq',
      prompt: 'Debtors \u20ac36,500. Credit sales \u20ac365,000. What is the debtors collection period?',
      itemData: { type: 'mcq', data: { options: ['10 days', '36.5 days', '30 days', '52 days'], correctIndex: 1 } },
      explanation: 'Debtors days = Debtors / Credit Sales \u00d7 365 = \u20ac36,500 / \u20ac365,000 \u00d7 365 = 36.5 days.',
      sectionLink: '18.1.3',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 19 — Tabular Statements (12 items)
  // ────────────────────────────────────────────
  19: [
    {
      id: 'r19-01', chapterId: 19, sectionId: '19.1', type: 'fill-chip',
      prompt: 'Complete the accounting equation.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Assets = Liabilities + ___',
        chips: ['Profit', 'Capital', 'Revenue', 'Drawings'],
        correctChip: 'Capital',
      } },
      explanation: 'The accounting equation is the foundation of all bookkeeping. Every transaction must maintain this equality.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-02', chapterId: 19, sectionId: '19.1', type: 'mcq',
      prompt: 'Owner invests \u20ac10,000 cash. What is the effect on the equation?',
      itemData: { type: 'mcq', data: { options: [
        'Assets +\u20ac10,000, Capital +\u20ac10,000',
        'Assets +\u20ac10,000, Liabilities +\u20ac10,000',
        'Capital +\u20ac10,000, Liabilities +\u20ac10,000',
        'Assets +\u20ac10,000, Assets \u2212\u20ac10,000',
      ], correctIndex: 0 } },
      explanation: 'Cash (asset) increases and Capital increases by the same amount. The equation stays balanced.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-03', chapterId: 19, sectionId: '19.1', type: 'sort',
      prompt: 'Sort these transactions by their effect on total assets.',
      itemData: { type: 'sort', data: { buckets: ['Total Assets Increase', 'Total Assets Stay Same', 'Total Assets Decrease'], items: [
        { label: 'Owner invests cash', correctBucket: 'Total Assets Increase' },
        { label: 'Buy equipment for cash', correctBucket: 'Total Assets Stay Same' },
        { label: 'Pay wages by cheque', correctBucket: 'Total Assets Decrease' },
        { label: 'Buy stock on credit', correctBucket: 'Total Assets Increase' },
      ] } },
      explanation: 'Capital investment and credit purchases increase total assets. Swapping one asset for another (cash for equipment) keeps total the same. Expenses reduce assets and capital.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-04', chapterId: 19, sectionId: '19.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Paying an expense reduces both assets and capital in the accounting equation.',
        isTrue: true,
      } },
      explanation: 'Expenses reduce capital (via profit). Cash (asset) also decreases when the expense is paid. Both sides decrease equally.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-05', chapterId: 19, sectionId: '19.1', type: 'mcq',
      prompt: 'A business buys stock on credit for \u20ac2,000. Effect on the equation?',
      itemData: { type: 'mcq', data: { options: [
        'Assets +\u20ac2,000, Capital +\u20ac2,000',
        'Assets +\u20ac2,000, Liabilities +\u20ac2,000',
        'Assets +\u20ac2,000, Assets \u2212\u20ac2,000',
        'Liabilities +\u20ac2,000, Capital \u2212\u20ac2,000',
      ], correctIndex: 1 } },
      explanation: 'Stock (asset) increases by \u20ac2,000 and Creditors (liability) increases by \u20ac2,000.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-06', chapterId: 19, sectionId: '19.1', type: 'match',
      prompt: 'Match each transaction with its dual effect.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Cash sale \u20ac500', definition: 'Assets (Bank) +\u20ac500, Capital +\u20ac500' },
        { term: 'Pay creditor \u20ac300', definition: 'Assets (Bank) \u2212\u20ac300, Liabilities \u2212\u20ac300' },
        { term: 'Owner withdraws \u20ac1,000', definition: 'Assets (Bank) \u2212\u20ac1,000, Capital \u2212\u20ac1,000' },
        { term: 'Receive loan \u20ac5,000', definition: 'Assets (Bank) +\u20ac5,000, Liabilities +\u20ac5,000' },
      ] } },
      explanation: 'Every transaction affects at least two elements. Sales increase capital (via profit). Paying creditors reduces both assets and liabilities. Drawings reduce both assets and capital.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-07', chapterId: 19, sectionId: '19.1', type: 'mcq',
      prompt: 'After recording depreciation of \u20ac3,000, what happens to the equation?',
      itemData: { type: 'mcq', data: { options: [
        'Assets \u2212\u20ac3,000, Capital \u2212\u20ac3,000',
        'Assets \u2212\u20ac3,000, Liabilities \u2212\u20ac3,000',
        'No change to the equation',
        'Capital +\u20ac3,000, Assets +\u20ac3,000',
      ], correctIndex: 0 } },
      explanation: 'Depreciation reduces the fixed asset value (assets decrease) and reduces profit, which reduces capital. Both sides fall equally.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-08', chapterId: 19, sectionId: '19.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Accounting Equation',
        modelDefinition: 'Assets = Liabilities + Capital. Every financial transaction maintains this equality, forming the basis of double-entry bookkeeping.',
      } },
      explanation: 'The accounting equation is the fundamental principle of bookkeeping. Tabular statements demonstrate how each transaction preserves this balance.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-09', chapterId: 19, sectionId: '19.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'If a business receives a bank loan, only assets increase \u2014 there is no effect on liabilities.',
        isTrue: false,
        followUp: {
          prompt: 'What is the correct effect?',
          chips: [
            'Assets (Bank) increase AND Liabilities (Loan) increase',
            'Only Capital increases',
            'Assets decrease and liabilities decrease',
          ],
          correctChip: 'Assets (Bank) increase AND Liabilities (Loan) increase',
        },
      } },
      explanation: 'A loan increases both the bank balance (asset) and the loan obligation (liability) by the same amount.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-10', chapterId: 19, sectionId: '19.1', type: 'mcq',
      prompt: 'A business makes a credit sale for \u20ac800. Which elements change?',
      itemData: { type: 'mcq', data: { options: [
        'Assets (Debtors) +\u20ac800, Capital +\u20ac800',
        'Assets (Bank) +\u20ac800, Capital +\u20ac800',
        'Liabilities +\u20ac800, Capital +\u20ac800',
        'Assets +\u20ac800, Liabilities +\u20ac800',
      ], correctIndex: 0 } },
      explanation: 'A credit sale creates a debtor (asset increases) and revenue increases capital (via profit). No cash changes hands yet.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-11', chapterId: 19, sectionId: '19.1', type: 'order',
      prompt: 'Put these transactions in order of their effect on the bank balance (most positive first).',
      itemData: { type: 'order', data: { steps: [
        'Receive bank loan \u20ac50,000',
        'Owner invests \u20ac10,000',
        'Cash sale \u20ac500',
        'Pay creditor \u20ac300 (bank decreases)',
        'Buy equipment \u20ac8,000 (bank decreases)',
      ] } },
      explanation: 'The loan adds most to bank, then owner investment, then cash sale. Payments to creditors and equipment purchases reduce the bank balance.',
      sectionLink: '19.1.1',
    },
    {
      id: 'r19-12', chapterId: 19, sectionId: '19.1', type: 'fill-chip',
      prompt: 'Complete the statement about expenses.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'In the accounting equation, expenses reduce ___ because they decrease profit.',
        chips: ['Assets', 'Capital', 'Liabilities', 'Revenue'],
        correctChip: 'Capital',
      } },
      explanation: 'Expenses reduce profit, which in turn reduces capital. The corresponding asset (usually bank/cash) also decreases.',
      sectionLink: '19.1.1',
    },
  ],

  20: [],
  21: [],
  22: [],
  23: [],
  24: [],
};
