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

  // ── Chapters 2-6, 8-24: empty scaffolds ──
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: [],
  15: [],
  16: [],
  17: [],
  18: [],
  19: [],
  20: [],
  21: [],
  22: [],
  23: [],
  24: [],
};
