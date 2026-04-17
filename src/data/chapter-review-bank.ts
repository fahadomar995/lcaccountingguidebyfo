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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r1-13', chapterId: 1, sectionId: '1.2', type: 'match',
      prompt: 'Match each accounting concept to its meaning:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Business Entity', definition: 'The business is treated as separate from its owner' },
        { term: 'Money Measurement', definition: 'Only items expressible in money are recorded' },
        { term: 'Materiality', definition: 'Only items significant enough to influence decisions are disclosed separately' },
        { term: 'Dual Aspect', definition: 'Every transaction has two equal and opposite effects' },
        { term: 'Realisation', definition: 'Revenue is recognised when earned, not when cash is received' },
      ] } },
      explanation: 'These five concepts plus going concern, accruals, prudence and consistency form the David Wilson framework for the 10-mark Q9 concepts question.',
      sectionLink: '1.2.1',
    },
    {
      id: 'r1-14', chapterId: 1, sectionId: '1.1', type: 'sort',
      prompt: 'Which of the four qualities of useful financial information does each statement describe?',
      itemData: { type: 'sort', data: { buckets: ['Relevant', 'Reliable', 'Comparable', 'Understandable'], items: [
        { label: 'Information meets the user’s decision-making needs', correctBucket: 'Relevant' },
        { label: 'Information is certified by an auditor', correctBucket: 'Reliable' },
        { label: 'Same accounting policies used year on year', correctBucket: 'Comparable' },
        { label: 'Information is clear, concise and free of jargon', correctBucket: 'Understandable' },
      ] } },
      explanation: 'These are the four qualitative characteristics typically tested in Q9 (a) — David Wilson 2019.',
      sectionLink: '1.1.2',
    },
    {
      id: 'r1-15', chapterId: 1, sectionId: '1.1', type: 'mcq',
      prompt: 'Which of the following is the BEST distinction between financial and management accounting?',
      itemData: { type: 'mcq', data: { options: [
        'Financial accounting is for tax; management accounting is for VAT',
        'Financial accounting reports on past events; management accounting also informs future decisions',
        'Financial accounting is optional; management accounting is statutory',
        'Financial accounting is internal only; management accounting is external only',
      ], correctIndex: 1 } },
      explanation: 'Financial accounting is historical and externally focused; management accounting is forward-looking and primarily for internal decision-making, planning and control.',
      sectionLink: '1.1.1',
    },
    {
      id: 'r1-16', chapterId: 1, sectionId: '1.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'The prudence concept allows a business to anticipate profits before they are earned in order to attract investors.', isTrue: false, followUp: { prompt: 'What does prudence actually require?', chips: ['Recognise losses as soon as foreseen; recognise profits only when earned', 'Always overstate profits', 'Defer all expenses to next year'], correctChip: 'Recognise losses as soon as foreseen; recognise profits only when earned' } } },
      explanation: 'Prudence (conservatism) does the opposite: anticipate losses, never anticipate profits. This is a high-frequency Q9 trap.',
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
    {
      id: 'r7-13',
      chapterId: 7,
      sectionId: '7.4',
      type: 'mcq',
      prompt: 'Which statement best explains why a trial balance that balances does NOT prove the books are correct?',
      itemData: {
        type: 'mcq',
        data: {
          options: [
            'It only checks that the totals match \u2014 six error types still slip through',
            'Trial balances always have errors',
            'It does not include the bank account',
            'It only checks debtor balances',
          ],
          correctIndex: 0,
        },
      },
      explanation: 'Errors of omission, commission, principle, original entry, compensating and complete reversal all leave the trial balance balanced. This is a key Q7 theory question.',
      sectionLink: '7.4.1',
    },
    {
      id: 'r7-14',
      chapterId: 7,
      sectionId: '7.4',
      type: 'true-false',
      prompt: 'True or false?',
      itemData: {
        type: 'true-false',
        data: {
          statement: 'A suspense account allows final accounts to be prepared while errors are still being investigated.',
          isTrue: true,
        },
      },
      explanation: 'The suspense account temporarily holds the trial-balance difference so that final accounts are not delayed. It must clear to zero once all errors are corrected.',
      sectionLink: '7.4.2',
    },
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r7-15', chapterId: 7, sectionId: '7.1', type: 'sort',
      prompt: 'Sort each error: does it affect the trial balance, or is it hidden from it?',
      itemData: { type: 'sort', data: { buckets: ['Affects TB', 'Hidden from TB'], items: [
        { label: 'Sale of €450 omitted entirely from the books', correctBucket: 'Hidden from TB' },
        { label: 'Wages €800 debited as €80 only', correctBucket: 'Affects TB' },
        { label: 'Insurance posted to motor expenses (same side)', correctBucket: 'Hidden from TB' },
        { label: 'Discount allowed posted to credit side of discount account', correctBucket: 'Affects TB' },
        { label: 'Two errors that cancel each other out', correctBucket: 'Hidden from TB' },
      ] } },
      explanation: 'Errors of omission, commission, principle, original entry, compensating and reversal of entries are all hidden from the TB. Only single-sided or unequal postings disturb the balance.',
      sectionLink: '7.1.1',
    },
    {
      id: 'r7-16', chapterId: 7, sectionId: '7.4', type: 'mcq',
      prompt: 'Why is a Suspense Account opened?',
      itemData: { type: 'mcq', data: { options: [
        'To record cash transactions before they are posted',
        'To temporarily hold the difference on the trial balance until errors are located',
        'To record provisions for future bad debts',
        'To track unpaid creditors at year end',
      ], correctIndex: 1 } },
      explanation: 'A suspense account is a temporary holding account. It is debited or credited with the TB difference so the books balance and final accounts can be prepared while errors are investigated.',
      sectionLink: '7.4.1',
    },
    {
      id: 'r7-17', chapterId: 7, sectionId: '7.1', type: 'match',
      prompt: 'Match each error type to its example:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Error of omission', definition: 'A credit sale of €600 not entered in the books at all' },
        { term: 'Error of commission', definition: 'A payment to J. Murphy posted to the account of P. Murphy' },
        { term: 'Error of principle', definition: 'Purchase of a delivery van debited to motor expenses' },
        { term: 'Compensating error', definition: 'Sales overstated by €100 and purchases also overstated by €100' },
      ] } },
      explanation: 'These four are the most-tested error types under the David Wilson framework — none of them affect the trial balance.',
      sectionLink: '7.1.2',
    },
    {
      id: 'r7-18', chapterId: 7, sectionId: '7.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'Once all errors are corrected, the suspense account should have a zero balance.', isTrue: true, followUp: { prompt: 'What does it mean if a balance remains?', chips: ['Errors are still outstanding', 'The accounts are correct', 'Profit must be increased'], correctChip: 'Errors are still outstanding' } } },
      explanation: 'A residual suspense balance signals undetected errors. The account must clear before the final accounts can be considered reliable.',
      sectionLink: '7.2.1',
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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r2-14', chapterId: 2, sectionId: '2.1', type: 'match',
      prompt: 'Match each book of first entry to its purpose:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Sales Day Book', definition: 'Records all credit sales of goods' },
        { term: 'Purchases Day Book', definition: 'Records all credit purchases of goods for resale' },
        { term: 'Sales Returns Day Book', definition: 'Records goods returned by customers' },
        { term: 'Cash Book', definition: 'Records all cash and bank receipts and payments' },
        { term: 'General Journal', definition: 'Records non-routine transactions and corrections of errors' },
      ] } },
      explanation: 'Each daybook is a specialised first record. Posting to the ledger then follows. The David Wilson 2015 Q9 (a) tested name + purpose of each.',
      sectionLink: '2.1.2',
    },
    {
      id: 'r2-15', chapterId: 2, sectionId: '2.3', type: 'sort',
      prompt: 'Sort each item: is it CAPITAL expenditure or REVENUE expenditure?',
      itemData: { type: 'sort', data: { buckets: ['Capital', 'Revenue'], items: [
        { label: 'Purchase of a new delivery van', correctBucket: 'Capital' },
        { label: 'Petrol for the delivery van', correctBucket: 'Revenue' },
        { label: 'Extension built onto the warehouse', correctBucket: 'Capital' },
        { label: 'Repainting the existing warehouse', correctBucket: 'Revenue' },
        { label: 'Legal fees for purchasing premises', correctBucket: 'Capital' },
        { label: 'Annual insurance premium', correctBucket: 'Revenue' },
      ] } },
      explanation: 'Capital = acquiring or improving a fixed asset (long-term benefit). Revenue = day-to-day running costs (current period). Mis-classification distorts profit AND the balance sheet.',
      sectionLink: '2.3.1',
    },
    {
      id: 'r2-16', chapterId: 2, sectionId: '2.2', type: 'mcq',
      prompt: 'A business has output VAT of €18,400 and input VAT of €11,200. What is owed to (or from) Revenue?',
      itemData: { type: 'mcq', data: { options: [
        '€7,200 owed TO Revenue',
        '€7,200 refund FROM Revenue',
        '€29,600 owed TO Revenue',
        'Nothing — VAT is not an expense',
      ], correctIndex: 0 } },
      explanation: 'Net VAT due = Output VAT − Input VAT = €18,400 − €11,200 = €7,200 owed to Revenue. If input exceeds output, a refund is due.',
      sectionLink: '2.2.1',
    },
    {
      id: 'r2-17', chapterId: 2, sectionId: '2.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'A trial balance that balances proves there are no errors in the books.', isTrue: false, followUp: { prompt: 'Why not?', chips: ['Errors of omission, commission, principle and compensating errors all hide from the TB', 'The TB only checks the cash book', 'It only proves errors of addition exist'], correctChip: 'Errors of omission, commission, principle and compensating errors all hide from the TB' } } },
      explanation: 'A balanced TB only proves arithmetic equality of debits and credits. It misses errors that are equal on both sides — a classic David Wilson 2018 Q9 (b) point.',
      sectionLink: '2.2.2',
    },
  ],

  // Ch 3 review items are at end of file

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
      sectionLink: '4.3.3',
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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r4-14', chapterId: 4, sectionId: '4.3', type: 'sort',
      prompt: 'Sort each item: is it a CAUSE of depreciation or a REASON to provide for it?',
      itemData: { type: 'sort', data: { buckets: ['Cause', 'Reason to provide'], items: [
        { label: 'Physical wear and tear from use', correctBucket: 'Cause' },
        { label: 'Obsolescence — newer technology available', correctBucket: 'Cause' },
        { label: 'Passage of time (e.g. lease expiring)', correctBucket: 'Cause' },
        { label: 'Depletion of a natural resource (e.g. quarry)', correctBucket: 'Cause' },
        { label: 'To match expense with revenue earned (matching concept)', correctBucket: 'Reason to provide' },
        { label: 'To show a true and fair view of the asset’s NBV', correctBucket: 'Reason to provide' },
        { label: 'To build up funds for replacement (indirectly)', correctBucket: 'Reason to provide' },
      ] } },
      explanation: 'David Wilson 2024 Q9 (a) tested CAUSES; 2016 Q9 (a) tested REASONS. Students often confuse them — keep the lists separate.',
      sectionLink: '4.3.1',
    },
    {
      id: 'r4-15', chapterId: 4, sectionId: '4.3', type: 'match',
      prompt: 'Match each asset type to the MORE appropriate depreciation method:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Premises (long, even useful life)', definition: 'Straight Line — equal use each year' },
        { term: 'Motor vehicles (heavy early loss in value)', definition: 'Reducing Balance — front-loaded depreciation matches the value drop' },
        { term: 'Computers (rapid obsolescence)', definition: 'Reducing Balance — bigger expense early when most useful' },
        { term: 'Office furniture (steady use)', definition: 'Straight Line — predictable, even wear' },
      ] } },
      explanation: 'Choice of method should reflect HOW the asset loses value. Reducing balance front-loads the expense; straight line spreads it evenly.',
      sectionLink: '4.3.2',
    },
    {
      id: 'r4-16', chapterId: 4, sectionId: '4.3', type: 'mcq',
      prompt: 'Which accounting concept is the PRIMARY justification for charging depreciation?',
      itemData: { type: 'mcq', data: { options: [
        'Going concern',
        'Matching (accruals)',
        'Realisation',
        'Money measurement',
      ], correctIndex: 1 } },
      explanation: 'Depreciation matches part of the asset’s cost against the revenue it helps generate each year — directly applying the matching concept (David Wilson 2011 Q9 (b)).',
      sectionLink: '4.3.1',
    },
    {
      id: 'r4-17', chapterId: 4, sectionId: '4.3', type: 'define',
      prompt: 'Define depreciation:',
      itemData: { type: 'define', data: { term: 'Depreciation', modelDefinition: 'The systematic allocation of the cost (or revalued amount) of a fixed asset, less any residual value, over its estimated useful life — recognising the part of the asset consumed in earning revenue during the period.' } },
      explanation: 'Note the key elements: SYSTEMATIC, COST less RESIDUAL, USEFUL LIFE. Markers reward all three — David Wilson model answer.',
      sectionLink: '4.3.1',
    },
  ],

  // Ch 5 review items are at end of file

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
      id: 'r6-04', chapterId: 6, sectionId: '6.2', type: 'true-false',
      prompt: 'In Q1, partial marks are awarded for correct workings even if the final figure is wrong.',
      itemData: { type: 'true-false', data: { statement: 'In Q1, partial marks are awarded for correct workings even if the final figure is wrong.', isTrue: true } },
      explanation: 'A large proportion of Q1 marks are for individual workings. A student who shows correct workings but makes a casting error will score significantly higher than one who writes only final statements with no workings.',
      sectionLink: '6.2.2',
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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r6-14', chapterId: 6, sectionId: '6.4', type: 'sort',
      prompt: 'Sort each item: is it CAPITAL or REVENUE in nature?',
      itemData: { type: 'sort', data: { buckets: ['Capital', 'Revenue'], items: [
        { label: 'Wages of factory staff', correctBucket: 'Revenue' },
        { label: 'Cost of installing new machinery', correctBucket: 'Capital' },
        { label: 'Repair to a leaking roof', correctBucket: 'Revenue' },
        { label: 'Purchase of patent rights for 10 years', correctBucket: 'Capital' },
        { label: 'Insurance on stock for the year', correctBucket: 'Revenue' },
        { label: 'Solicitor’s fees on purchase of premises', correctBucket: 'Capital' },
      ] } },
      explanation: 'Capital expenditure = lasting benefit (asset). Revenue = consumed in the period (expense). Mistakes here distort BOTH profit AND the balance sheet — common Q1 trap.',
      sectionLink: '6.4.2',
    },
    {
      id: 'r6-15', chapterId: 6, sectionId: '6.4', type: 'mcq',
      prompt: 'What is the PRIMARY purpose of preparing final accounts for a sole trader?',
      itemData: { type: 'mcq', data: { options: [
        'To calculate VAT due',
        'To determine the profit/loss for the period and the financial position at the year end',
        'To replace the bank statement',
        'To set sales prices',
      ], correctIndex: 1 } },
      explanation: 'Final accounts measure performance (P&L) and position (balance sheet). They support stewardship, decision-making, lending and tax. (David Wilson 2018 Q9 (b))',
      sectionLink: '6.4.1',
    },
    {
      id: 'r6-16', chapterId: 6, sectionId: '6.2', type: 'order',
      prompt: 'Put the 5-step Q1 method in order:',
      itemData: { type: 'order', data: { steps: [
        'Read the question and notes — annotate the trial balance',
        'Number each working (W1, W2…) and complete adjustments',
        'Prepare the Trading and Profit & Loss Account',
        'Prepare the Balance Sheet',
        'Cross-check that the balance sheet balances and tie back to the workings',
      ] } },
      explanation: 'Following the 5-step method protects method marks even when arithmetic is wrong. Skipping numbering of workings is the most common mark-loss in Q1.',
      sectionLink: '6.2.1',
    },
    {
      id: 'r6-17', chapterId: 6, sectionId: '6.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'When an asset is disposed of, the profit or loss on disposal is calculated as proceeds minus net book value (cost − accumulated depreciation).', isTrue: true, followUp: { prompt: 'Where does the profit/loss on disposal go?', chips: ['Profit & Loss Account', 'Trading Account', 'Capital section of the Balance Sheet'], correctChip: 'Profit & Loss Account' } } },
      explanation: 'Disposal: Proceeds − NBV = profit (gain) or loss. The figure goes to the P&L. The asset and its accumulated depreciation are then removed from the balance sheet.',
      sectionLink: '6.3.5',
    },
  ],

  

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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r9-14', chapterId: 9, sectionId: '9.1', type: 'match',
      prompt: 'Match each company-finance term to its definition:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Authorised Share Capital', definition: 'Maximum value of shares the company may issue under its constitution' },
        { term: 'Issued Share Capital', definition: 'Value of shares actually allotted to shareholders' },
        { term: 'Ordinary Shares', definition: 'Carry voting rights and a variable dividend after preference shareholders' },
        { term: 'Preference Shares', definition: 'Fixed dividend, paid before ordinary, usually no voting rights' },
        { term: 'Debentures', definition: 'Long-term loans to the company; interest is a charge against profit' },
      ] } },
      explanation: 'These five terms are tested every couple of years in Q9 (b). Note the key contrast: ordinary = risk + reward; preference = fixed; debentures = lender, not owner.',
      sectionLink: '9.1.2',
    },
    {
      id: 'r9-15', chapterId: 9, sectionId: '9.3', type: 'sort',
      prompt: 'Sort each reserve: CAPITAL reserve or REVENUE reserve?',
      itemData: { type: 'sort', data: { buckets: ['Capital reserve', 'Revenue reserve'], items: [
        { label: 'Share premium account', correctBucket: 'Capital reserve' },
        { label: 'Revaluation reserve', correctBucket: 'Capital reserve' },
        { label: 'General reserve', correctBucket: 'Revenue reserve' },
        { label: 'Retained earnings (P&L balance)', correctBucket: 'Revenue reserve' },
        { label: 'Capital redemption reserve', correctBucket: 'Capital reserve' },
      ] } },
      explanation: 'Capital reserves arise from non-trading events (share issues at premium, revaluations) and CANNOT be used for cash dividends. Revenue reserves come from trading profits and CAN.',
      sectionLink: '9.3.2',
    },
    {
      id: 'r9-16', chapterId: 9, sectionId: '9.1', type: 'sort',
      prompt: 'Sort each statement: ADVANTAGE or DISADVANTAGE of incorporation?',
      itemData: { type: 'sort', data: { buckets: ['Advantage', 'Disadvantage'], items: [
        { label: 'Limited liability for shareholders', correctBucket: 'Advantage' },
        { label: 'Continuity of existence beyond the original owners', correctBucket: 'Advantage' },
        { label: 'Easier to raise large amounts of capital', correctBucket: 'Advantage' },
        { label: 'Statutory audit and disclosure requirements', correctBucket: 'Disadvantage' },
        { label: 'Profits subject to corporation tax PLUS dividend tax for shareholders', correctBucket: 'Disadvantage' },
        { label: 'Loss of privacy — accounts are filed publicly', correctBucket: 'Disadvantage' },
      ] } },
      explanation: 'David Wilson 2014 Q9 (b) — students must give 3 advantages and 3 disadvantages with brief explanations.',
      sectionLink: '9.1.1',
    },
    {
      id: 'r9-17', chapterId: 9, sectionId: '9.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'A reserve is the same thing as a provision.', isTrue: false, followUp: { prompt: 'What is the key difference?', chips: ['A reserve is an appropriation of profit; a provision is a charge against profit for a known/likely liability', 'A reserve must be in cash; a provision must not', 'A reserve is short-term; a provision is long-term'], correctChip: 'A reserve is an appropriation of profit; a provision is a charge against profit for a known/likely liability' } } },
      explanation: 'Reserves = profit set aside (appropriation, after profit). Provisions = expense for a probable liability (charged before profit). David Wilson 2016 Q9 (a).',
      sectionLink: '9.3.2',
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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r10-13', chapterId: 10, sectionId: '10.5', type: 'match',
      prompt: 'Match each user of published accounts to the information they need MOST:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Existing shareholders', definition: 'Profitability, dividends and growth in net worth' },
        { term: 'Lenders / banks', definition: 'Liquidity, gearing and ability to meet repayments' },
        { term: 'Employees / trade unions', definition: 'Job security, wage capacity and future plans' },
        { term: 'Suppliers', definition: 'Short-term liquidity to pay invoices on time' },
        { term: 'Revenue Commissioners', definition: 'Profit figures for corporation tax assessment' },
      ] } },
      explanation: 'Different users focus on different sections of the accounts — David Wilson 2023 Q9 (b) tested four user groups + their needs.',
      sectionLink: '10.5.1',
    },
    {
      id: 'r10-14', chapterId: 10, sectionId: '10.5', type: 'sort',
      prompt: 'Match each FRS 102 qualitative characteristic to its description:',
      itemData: { type: 'sort', data: { buckets: ['Relevance', 'Faithful representation', 'Comparability', 'Understandability'], items: [
        { label: 'Information has predictive or confirmatory value for users', correctBucket: 'Relevance' },
        { label: 'Information is complete, neutral and free from material error', correctBucket: 'Faithful representation' },
        { label: 'Same accounting policies applied consistently year on year', correctBucket: 'Comparability' },
        { label: 'Presented clearly so a user with reasonable knowledge can understand it', correctBucket: 'Understandability' },
      ] } },
      explanation: 'These are the four primary qualitative characteristics under FRS 102 — David Wilson 2019 Q9 (a).',
      sectionLink: '10.5.1',
    },
    {
      id: 'r10-15', chapterId: 10, sectionId: '10.5', type: 'mcq',
      prompt: 'Why are INTERNAL management accounts NOT published?',
      itemData: { type: 'mcq', data: { options: [
        'They contain commercially sensitive information (e.g. detailed margins, salaries) that competitors could exploit',
        'They are illegal to share',
        'They contain too few figures',
        'Shareholders have no interest in them',
      ], correctIndex: 0 } },
      explanation: 'Published accounts follow a prescribed minimum disclosure that protects competitive information while still informing users (David Wilson 2012 Q9 (b)).',
      sectionLink: '10.5.2',
    },
    {
      id: 'r10-16', chapterId: 10, sectionId: '10.4', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'The Directors’ Report is a separate document from the financial statements that must accompany the published accounts.', isTrue: true, followUp: { prompt: 'Which of the following must it contain?', chips: ['Principal activities, dividends recommended, and a review of the business', 'A list of every supplier', 'Each employee’s salary'], correctChip: 'Principal activities, dividends recommended, and a review of the business' } } },
      explanation: 'The Directors’ Report sits alongside the audited accounts. Its required contents are set out in the Companies Act — David Wilson 2012 Q9 (b).',
      sectionLink: '10.4.1',
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
      sectionLink: '11.4.3',
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
      prompt: 'Which of the following is a DIRECT cost of production?',
      itemData: { type: 'mcq', data: { options: ['Factory rent', 'Royalties paid per unit produced', 'Factory supervisor\u2019s salary', 'Depreciation of factory machinery'], correctIndex: 1 } },
      explanation: 'Royalties paid per unit are a direct expense \u2014 they vary with production and can be traced to each unit. The other three are indirect (factory overhead).',
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
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r11-14', chapterId: 11, sectionId: '11.4', type: 'sort',
      prompt: 'Sort each cost: DIRECT or INDIRECT for a furniture manufacturer?',
      itemData: { type: 'sort', data: { buckets: ['Direct', 'Indirect'], items: [
        { label: 'Timber used in tables', correctBucket: 'Direct' },
        { label: 'Wages of the carpenter assembling tables', correctBucket: 'Direct' },
        { label: 'Royalty paid per table produced', correctBucket: 'Direct' },
        { label: 'Factory supervisor’s salary', correctBucket: 'Indirect' },
        { label: 'Factory rent and rates', correctBucket: 'Indirect' },
        { label: 'Depreciation of factory machinery', correctBucket: 'Indirect' },
      ] } },
      explanation: 'Direct costs can be traced to a specific product (RM, direct labour, direct expenses → PRIME COST). Indirect costs are factory overheads that must be apportioned. David Wilson 2021 Q9 (a).',
      sectionLink: '11.4.1',
    },
    {
      id: 'r11-15', chapterId: 11, sectionId: '11.4', type: 'match',
      prompt: 'Match each type of stock held by a manufacturer to its description:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Raw materials', definition: 'Inputs not yet processed (e.g. timber, steel, fabric)' },
        { term: 'Work in progress', definition: 'Partially finished goods still on the production line' },
        { term: 'Finished goods', definition: 'Completed items ready for sale to customers' },
      ] } },
      explanation: 'A manufacturer values all three stock types at year-end. They appear separately as current assets in the balance sheet (David Wilson 2017 Q9 (b)).',
      sectionLink: '11.4.2',
    },
    {
      id: 'r11-16', chapterId: 11, sectionId: '11.1', type: 'order',
      prompt: 'Put the cost build-up in the correct order for a Manufacturing Account:',
      itemData: { type: 'order', data: { steps: [
        'Direct materials consumed (Opening RM + Purchases − Closing RM)',
        'Add: Direct labour and direct expenses → PRIME COST',
        'Add: Factory overheads (indirect labour, factory rent, depreciation, etc.)',
        'Adjust for movement in Work in Progress (+ Opening WIP − Closing WIP)',
        'Result: COST OF MANUFACTURING / COST OF GOODS COMPLETED',
      ] } },
      explanation: 'Prime cost + factory overheads + WIP adjustment = cost of finished goods, which then enters the Trading Account (David Wilson 2013 Q9 (a)).',
      sectionLink: '11.1.1',
    },
    {
      id: 'r11-17', chapterId: 11, sectionId: '11.1', type: 'mcq',
      prompt: 'Which of the following is the BEST definition of PRIME COST?',
      itemData: { type: 'mcq', data: { options: [
        'Total of all factory costs including overheads',
        'Direct materials + direct labour + direct expenses',
        'Cost of finished goods only',
        'Cost of raw materials purchased',
      ], correctIndex: 1 } },
      explanation: 'Prime cost = the sum of all DIRECT costs of production. Adding factory overheads gives factory cost; adjusting for WIP gives cost of goods manufactured.',
      sectionLink: '11.1.1',
    },
  ],

  
  // ────────────────────────────────────────────
  // Chapter 13 — Club Accounts (13 items)
  // ────────────────────────────────────────────
  13: [
    {
      id: 'r13-01', chapterId: 13, sectionId: '13.1', type: 'sort',
      prompt: 'Sort these items by whether they appear in the R&P Account or I&E Account.',
      itemData: { type: 'sort', data: { buckets: ['R&P Account', 'I&E Account', 'Both'], items: [
        { label: 'Purchase of equipment', correctBucket: 'R&P Account' },
        { label: 'Depreciation', correctBucket: 'I&E Account' },
        { label: 'Insurance paid', correctBucket: 'Both' },
        { label: 'Subscriptions received', correctBucket: 'R&P Account' },
        { label: 'Subscription income (accruals-adjusted)', correctBucket: 'I&E Account' },
        { label: 'Bar net profit', correctBucket: 'I&E Account' },
      ] } },
      explanation: 'Capital items (equipment purchase) only appear in R&P. Depreciation only appears in I&E. Cash payments like insurance appear in R&P; the accruals-adjusted amount appears in I&E.',
      sectionLink: '13.1.1',
    },
    {
      id: 'r13-02', chapterId: 13, sectionId: '13.1', type: 'match',
      prompt: 'Match each club term with its business equivalent.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Accumulated Fund', definition: 'Capital' },
        { term: 'Surplus', definition: 'Net Profit' },
        { term: 'Deficit', definition: 'Net Loss' },
        { term: 'Income & Expenditure Account', definition: 'Profit & Loss Account' },
      ] } },
      explanation: 'Club accounts use different terminology but follow the same accounting principles.',
      sectionLink: '13.1.1',
    },
    {
      id: 'r13-03', chapterId: 13, sectionId: '13.1', type: 'fill-chip',
      prompt: 'Complete the accumulated fund calculation.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Accumulated Fund = Opening Assets minus Opening ___.',
        chips: ['Income', 'Liabilities', 'Subscriptions', 'Surplus'],
        correctChip: 'Liabilities',
      } },
      explanation: 'The accumulated fund is calculated from the opening statement of affairs: Assets − Liabilities = Accumulated Fund.',
      sectionLink: '13.1.2',
    },
    {
      id: 'r13-04', chapterId: 13, sectionId: '13.2', type: 'sort',
      prompt: 'In the subscriptions T-account, sort these to the correct side.',
      itemData: { type: 'sort', data: { buckets: ['Debit Side', 'Credit Side'], items: [
        { label: 'Arrears at start', correctBucket: 'Debit Side' },
        { label: 'Cash received', correctBucket: 'Debit Side' },
        { label: 'Prepaid at start', correctBucket: 'Credit Side' },
        { label: 'I&E income (balancing figure)', correctBucket: 'Credit Side' },
        { label: 'Prepaid at end', correctBucket: 'Debit Side' },
        { label: 'Arrears at end', correctBucket: 'Credit Side' },
      ] } },
      explanation: 'The subscriptions T-account has arrears b/d, cash, and prepaid c/d on the debit side. Prepaid b/d, I&E income (balancing figure), and arrears c/d on the credit side.',
      sectionLink: '13.2.1',
    },
    {
      id: 'r13-05', chapterId: 13, sectionId: '13.2', type: 'mcq',
      prompt: 'Subscriptions received €24,000. Arrears: start €1,200, end €1,800. Prepaid: start €400, end €600. What is subscription income for I&E?',
      itemData: { type: 'mcq', data: { options: ['€24,000', '€24,800', '€23,200', '€25,000'], correctIndex: 1 } },
      explanation: 'Income = Cash + Arrears end − Arrears start − Prepaid end + Prepaid start = €24,000 + €1,800 − €1,200 − €600 + €400 = €24,800 (or use the T-account balancing figure).',
      sectionLink: '13.2.1',
    },
    {
      id: 'r13-06', chapterId: 13, sectionId: '13.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Subscription arrears at year end are shown as a current liability on the Balance Sheet.',
        isTrue: false,
        followUp: {
          prompt: 'What are subscription arrears?',
          chips: ['Current asset (debtor)', 'Fixed asset', 'Long-term liability'],
          correctChip: 'Current asset (debtor)',
        },
      } },
      explanation: 'Arrears = money owed TO the club by members. This is a debtor (current asset). Prepaid subscriptions (paid in advance) are a current liability.',
      sectionLink: '13.2.1',
    },
    {
      id: 'r13-07', chapterId: 13, sectionId: '13.2', type: 'mcq',
      prompt: 'Life membership €9,000 received. Expected membership: 15 years. What goes to I&E in year 1?',
      itemData: { type: 'mcq', data: { options: ['€9,000', '€600', '€900', '€1,500'], correctIndex: 1 } },
      explanation: '€9,000 ÷ 15 years = €600 per year. The balance (€8,400) is a liability (deferred income).',
      sectionLink: '13.2.2',
    },
    {
      id: 'r13-08', chapterId: 13, sectionId: '13.3', type: 'order',
      prompt: 'Put the bar trading account steps in order.',
      itemData: { type: 'order', data: { steps: [
        'Calculate bar sales (adjust R&P cash for debtors)',
        'Calculate bar purchases (adjust R&P cash for creditors)',
        'Cost of bar sales = Opening stock + Purchases − Closing stock',
        'Bar Gross Profit = Sales − Cost of Sales',
        'Deduct bar wages to get Bar Net Profit → I&E',
      ] } },
      explanation: 'The bar trading account follows the same structure as a normal trading account but uses R&P cash figures adjusted for debtors and creditors.',
      sectionLink: '13.3.1',
    },
    {
      id: 'r13-09', chapterId: 13, sectionId: '13.3', type: 'fill-chip',
      prompt: 'Complete the statement about bar purchases.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Bar purchases for the trading account = R&P cash paid + closing bar creditors minus ___.',
        chips: ['closing debtors', 'opening bar creditors', 'bar wages', 'depreciation'],
        correctChip: 'opening bar creditors',
      } },
      explanation: 'Cash paid + closing creditors − opening creditors gives the accruals-based purchases figure.',
      sectionLink: '13.3.1',
    },
    {
      id: 'r13-10', chapterId: 13, sectionId: '13.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Receipts & Payments Account',
        modelDefinition: 'A summary of all cash received and paid during the year on a cash basis — showing opening and closing bank balances. The club equivalent of a summarised cash book.',
      } },
      explanation: 'Unlike the I&E Account, the R&P includes capital items and does not adjust for accruals.',
      sectionLink: '13.1.1',
    },
    {
      id: 'r13-11', chapterId: 13, sectionId: '13.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'The purchase of new equipment for the club appears in the Income & Expenditure Account.',
        isTrue: false,
        followUp: {
          prompt: 'Where does equipment purchase appear?',
          chips: ['R&P Account only (as a payment)', 'I&E as an expense', 'Neither — it is ignored'],
          correctChip: 'R&P Account only (as a payment)',
        },
      } },
      explanation: 'Capital expenditure goes in R&P (cash payment) but NOT in I&E. Only depreciation on the equipment goes in I&E.',
      sectionLink: '13.1.1',
    },
    {
      id: 'r13-12', chapterId: 13, sectionId: '13.2', type: 'match',
      prompt: 'Match each special receipt with its correct treatment.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Entrance fees', definition: 'Income in I&E in year received' },
        { term: 'Life membership', definition: 'Spread over expected years; balance is a liability' },
        { term: 'Government grant (capital)', definition: 'Spread over asset life; balance is a liability' },
        { term: 'Recurring donations', definition: 'Income in I&E in year received' },
      ] } },
      explanation: 'Life membership and capital grants are deferred — only the annual portion is income. Entrance fees and regular donations are immediate income.',
      sectionLink: '13.2.2',
    },
    {
      id: 'r13-13', chapterId: 13, sectionId: '13.4', type: 'sort',
      prompt: 'Sort these items into their correct Balance Sheet location for a club.',
      itemData: { type: 'sort', data: { buckets: ['Current Assets', 'Current Liabilities'], items: [
        { label: 'Subscription arrears', correctBucket: 'Current Assets' },
        { label: 'Subscription prepaid', correctBucket: 'Current Liabilities' },
        { label: 'Bar stock', correctBucket: 'Current Assets' },
        { label: 'Bar creditors', correctBucket: 'Current Liabilities' },
        { label: 'Deferred life membership (current year)', correctBucket: 'Current Liabilities' },
        { label: 'Prepaid insurance', correctBucket: 'Current Assets' },
      ] } },
      explanation: 'Arrears and bar stock are current assets. Prepaid subs, bar creditors, and deferred income portions are current liabilities.',
      sectionLink: '13.4.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 14 — Service Firms (12 items)
  // ────────────────────────────────────────────
  14: [
    {
      id: 'r14-01', chapterId: 14, sectionId: '14.1', type: 'sort',
      prompt: 'Sort these features by whether they apply to a Service Firm or Trading Firm.',
      itemData: { type: 'sort', data: { buckets: ['Service Firm', 'Trading Firm'], items: [
        { label: 'Fee income as main revenue', correctBucket: 'Service Firm' },
        { label: 'Trading Account', correctBucket: 'Trading Firm' },
        { label: 'Fees due as a current asset', correctBucket: 'Service Firm' },
        { label: 'Opening and closing stock of goods', correctBucket: 'Trading Firm' },
        { label: 'Cost of Sales calculation', correctBucket: 'Trading Firm' },
        { label: 'No gross profit figure', correctBucket: 'Service Firm' },
      ] } },
      explanation: 'Service firms have no Trading Account, no stock of goods, and no cost of sales. Their revenue is fee income, and unpaid fees become "fees due" (a debtor).',
      sectionLink: '14.1.1',
    },
    {
      id: 'r14-02', chapterId: 14, sectionId: '14.1', type: 'fill-chip',
      prompt: 'Complete the statement about service firms.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'In a service firm, the Income Statement starts with ___ rather than Sales.',
        chips: ['Cost of Sales', 'Fee Income', 'Gross Profit', 'Capital'],
        correctChip: 'Fee Income',
      } },
      explanation: 'Service firms earn revenue from professional fees, not sales of goods.',
      sectionLink: '14.1.1',
    },
    {
      id: 'r14-03', chapterId: 14, sectionId: '14.1', type: 'mcq',
      prompt: 'Fees received €185,000. Fees due: start €4,200, end €6,800. Fees prepaid: start €1,000, end €1,500. What is fee income for the I/S?',
      itemData: { type: 'mcq', data: { options: ['€185,000', '€187,100', '€182,900', '€186,600'], correctIndex: 1 } },
      explanation: 'Fee income = €185,000 + €6,800 − €4,200 + €1,000 − €1,500 = €187,100.',
      sectionLink: '14.1.2',
    },
    {
      id: 'r14-04', chapterId: 14, sectionId: '14.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Fees due at the year-end (work completed but not yet received in cash) are shown as a current asset.',
        isTrue: true,
        followUp: {
          prompt: 'Where on the Balance Sheet?',
          chips: ['Current Assets (with debtors)', 'Fixed Assets', 'Long-term Liabilities'],
          correctChip: 'Current Assets (with debtors)',
        },
      } },
      explanation: 'Fees due are essentially debtors — the firm has earned the income but is still owed the cash.',
      sectionLink: '14.2.2',
    },
    {
      id: 'r14-05', chapterId: 14, sectionId: '14.1', type: 'fill-chip',
      prompt: 'Complete the fee income formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Fee Income = Cash received + Fees due at end − Fees due at start + ___ at start − Fees prepaid at end.',
        chips: ['Fees prepaid', 'Drawings', 'Bad debts', 'Closing stock'],
        correctChip: 'Fees prepaid',
      } },
      explanation: 'Add prior-year prepayments (now earned) and subtract end-of-year prepayments (not yet earned).',
      sectionLink: '14.1.2',
    },
    {
      id: 'r14-06', chapterId: 14, sectionId: '14.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Fees Prepaid (Service Firm)',
        modelDefinition: 'Fees received in cash from clients before the work has been performed — treated as a current liability at the year-end because the firm still owes the service.',
      } },
      explanation: 'Fees prepaid mirror "income received in advance" in any other business — a liability until the service is delivered.',
      sectionLink: '14.1.2',
    },
    {
      id: 'r14-07', chapterId: 14, sectionId: '14.1', type: 'match',
      prompt: 'Match each service firm term with its trading firm equivalent.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Fee income', definition: 'Sales' },
        { term: 'Fees due', definition: 'Trade debtors' },
        { term: 'Fees prepaid', definition: 'Income received in advance' },
        { term: 'Net Profit (directly from fees)', definition: 'Gross Profit then Net Profit' },
      ] } },
      explanation: 'The concepts are identical — only the terminology differs because service firms sell services, not goods.',
      sectionLink: '14.1.1',
    },
    {
      id: 'r14-08', chapterId: 14, sectionId: '14.2', type: 'mcq',
      prompt: "Which of these expenses would NOT appear in a service firm's Income Statement?",
      itemData: { type: 'mcq', data: { options: ['Depreciation', 'Cost of Sales', 'Bad debts', 'Insurance'], correctIndex: 1 } },
      explanation: 'Service firms have no cost of sales because they do not buy and sell goods. All other expenses (depreciation, bad debts, insurance) apply as normal.',
      sectionLink: '14.2.1',
    },
    {
      id: 'r14-09', chapterId: 14, sectionId: '14.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'All Q1-style adjustments (accruals, prepayments, depreciation, bad debts) apply to service firms.',
        isTrue: true,
      } },
      explanation: 'The only difference is the absence of a Trading Account. All other adjustments from Q1 apply exactly the same way.',
      sectionLink: '14.1.1',
    },
    {
      id: 'r14-10', chapterId: 14, sectionId: '14.1', type: 'mcq',
      prompt: 'Which of these is an example of a service firm?',
      itemData: { type: 'mcq', data: { options: ['Supermarket', "Solicitor's practice", 'Manufacturing company', 'Clothing retailer'], correctIndex: 1 } },
      explanation: 'Solicitors, accountants, architects, and vets are all service firms — they sell professional services, not goods.',
      sectionLink: '14.1.1',
    },
    {
      id: 'r14-11', chapterId: 14, sectionId: '14.2', type: 'order',
      prompt: 'Put the service firm Income Statement in the correct order.',
      itemData: { type: 'order', data: { steps: [
        'Fee Income (adjusted for fees due & fees prepaid)',
        'Add other operating income (interest received, rent received)',
        'Deduct all expenses (wages, rent, depreciation, bad debts, etc.)',
        'Net Profit',
      ] } },
      explanation: 'The service firm I/S starts with adjusted fee income, adds other income, deducts expenses, and arrives directly at Net Profit — no Trading Account step.',
      sectionLink: '14.2.1',
    },
    {
      id: 'r14-12', chapterId: 14, sectionId: '14.2', type: 'mcq',
      prompt: 'A solicitor’s firm has Fees Received €120,000, Fees Due at year-end €8,000, Fees Prepaid at year-end €3,000. What is Fee Income for the I/S (no opening balances)?',
      itemData: { type: 'mcq', data: { options: ['€120,000', '€125,000', '€131,000', '€115,000'], correctIndex: 1 } },
      explanation: 'Fee Income = €120,000 + €8,000 (earned but unpaid) − €3,000 (received but not yet earned) = €125,000.',
      sectionLink: '14.1.2',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 15 — Farm Accounts (10 items)
  // ────────────────────────────────────────────
  15: [
    {
      id: 'r15-01', chapterId: 15, sectionId: '15.1', type: 'match',
      prompt: 'Match each farm term with its accounting equivalent.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Farm produce used in house', definition: 'Drawings (at market value)' },
        { term: 'Closing valuation of livestock', definition: 'Closing stock' },
        { term: 'REPS payments / EU subsidies', definition: 'Other income' },
        { term: 'Breeding stock (herd basis)', definition: 'Fixed asset' },
      ] } },
      explanation: 'Farm accounting uses specific terminology but maps to standard accounting concepts.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-02', chapterId: 15, sectionId: '15.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Farm produce used in the house is valued at cost price.',
        isTrue: false,
        followUp: {
          prompt: 'At what value?',
          chips: ['Market value', 'Original cost', 'Net book value'],
          correctChip: 'Market value',
        },
      } },
      explanation: 'Farm produce used in the house is treated as drawings at market value, not cost.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-03', chapterId: 15, sectionId: '15.1', type: 'fill-chip',
      prompt: 'Complete the statement.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Farm produce used in the house is treated as ___ and reduces farm sales.',
        chips: ['an expense', 'drawings', 'other income', 'a fixed asset'],
        correctChip: 'drawings',
      } },
      explanation: 'When the farmer takes farm produce for personal use, it is drawings at market value.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-04', chapterId: 15, sectionId: '15.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Enterprise Analysis',
        modelDefinition: 'The separation of farm activities into distinct enterprises (e.g. dairy, tillage, beef) to assess the profitability of each individually.',
      } },
      explanation: 'Enterprise analysis helps farmers identify which activities are profitable and which should be expanded or discontinued.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-05', chapterId: 15, sectionId: '15.1', type: 'mcq',
      prompt: 'Where do EU subsidies and REPS payments appear in farm accounts?',
      itemData: { type: 'mcq', data: { options: ['Trading Account', 'Other income in P&L', 'Balance Sheet only', 'They are ignored'], correctIndex: 1 } },
      explanation: 'EU subsidies and REPS payments are government support — shown as other income below gross profit.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-06', chapterId: 15, sectionId: '15.1', type: 'sort',
      prompt: 'Sort these into farm stock types or farm expenses.',
      itemData: { type: 'sort', data: { buckets: ['Farm Stock', 'Farm Expenses'], items: [
        { label: 'Livestock', correctBucket: 'Farm Stock' },
        { label: 'Vet fees', correctBucket: 'Farm Expenses' },
        { label: 'Fodder', correctBucket: 'Farm Stock' },
        { label: 'Machinery repairs', correctBucket: 'Farm Expenses' },
        { label: 'Seeds', correctBucket: 'Farm Stock' },
        { label: 'Farm insurance', correctBucket: 'Farm Expenses' },
      ] } },
      explanation: 'Livestock, fodder, seeds, fertiliser, and crops are stock items. Vet fees, machinery costs, and insurance are expenses.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-07', chapterId: 15, sectionId: '15.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Farm accounts have appeared as a full SEC HL exam question.',
        isTrue: false,
      } },
      explanation: 'Farm accounts are on the syllabus but have NEVER been set as a full exam question — making them a wildcard prediction topic.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-08', chapterId: 15, sectionId: '15.1', type: 'mcq',
      prompt: 'Under the herd basis, breeding stock is treated as:',
      itemData: { type: 'mcq', data: { options: ['Current asset (stock)', 'Fixed asset', 'An expense', 'Other income'], correctIndex: 1 } },
      explanation: 'The herd basis treats production livestock (dairy cows, breeding ewes) as fixed assets rather than stock, as they are kept long-term.',
      sectionLink: '15.1.1',
    },
    {
      id: 'r15-09', chapterId: 15, sectionId: '15.1', type: 'fill-chip',
      prompt: 'Complete the statement about enterprise analysis.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Enterprise analysis uses a ___ format to show each farm activity in its own column.',
        chips: ['tabular', 'columnar', 'vertical', 'horizontal'],
        correctChip: 'columnar',
      } },
      explanation: 'The columnar format shows dairy, tillage, beef etc. side by side for comparison.',
      sectionLink: '15.1.2',
    },
    {
      id: 'r15-10', chapterId: 15, sectionId: '15.2', type: 'order',
      prompt: 'Put the farm Trading Account items in order.',
      itemData: { type: 'order', data: { steps: [
        'Farm sales (milk, livestock, crops)',
        'Less: Farm produce used in house',
        'Less: Opening stock + Purchases − Closing stock = Cost of Sales',
        'Gross Farm Profit',
      ] } },
      explanation: 'Farm produce used in house reduces sales. Then cost of sales is calculated as normal to arrive at gross farm profit.',
      sectionLink: '15.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 16 — Incomplete Records (13 items)
  // ────────────────────────────────────────────
  16: [
    {
      id: 'r16-01', chapterId: 16, sectionId: '16.1', type: 'mcq',
      prompt: 'Which TWO methods are used to reconstruct accounts from incomplete records?',
      itemData: { type: 'mcq', data: { options: [
        'Control Account method and Net Worth method',
        'Cash basis and accruals basis',
        'FIFO and LIFO',
        'Straight-line and reducing balance',
      ], correctIndex: 0 } },
      explanation: 'The two methods are: (1) Control Account / Cash Method — reconstructs individual figures, and (2) Net Worth / Balance Sheet Method — calculates profit from capital changes.',
      sectionLink: '16.1.1',
    },
    {
      id: 'r16-02', chapterId: 16, sectionId: '16.3', type: 'fill-chip',
      prompt: 'Complete the Net Worth formula.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Net Profit = Closing Capital − Opening Capital + Drawings minus ___.',
        chips: ['Bad debts', 'Capital Introduced', 'Depreciation', 'Sales'],
        correctChip: 'Capital Introduced',
      } },
      explanation: 'Net Profit = Closing Capital − Opening Capital + Drawings − Capital Introduced. Any capital introduced inflates closing capital and must be deducted.',
      sectionLink: '16.3.1',
    },
    {
      id: 'r16-03', chapterId: 16, sectionId: '16.3', type: 'mcq',
      prompt: 'Opening capital €45,000. Closing capital €62,000. Drawings €18,000. Capital introduced €5,000. Net Profit?',
      itemData: { type: 'mcq', data: { options: ['€17,000', '€30,000', '€35,000', '€40,000'], correctIndex: 1 } },
      explanation: 'NP = €62,000 − €45,000 + €18,000 − €5,000 = €30,000.',
      sectionLink: '16.3.1',
    },
    {
      id: 'r16-04', chapterId: 16, sectionId: '16.2', type: 'sort',
      prompt: 'In a Debtors Control Account, sort these to the correct side.',
      itemData: { type: 'sort', data: { buckets: ['Debit Side', 'Credit Side'], items: [
        { label: 'Opening debtors', correctBucket: 'Debit Side' },
        { label: 'Credit sales (balancing figure)', correctBucket: 'Debit Side' },
        { label: 'Cash received from debtors', correctBucket: 'Credit Side' },
        { label: 'Bad debts written off', correctBucket: 'Credit Side' },
        { label: 'Discount allowed', correctBucket: 'Credit Side' },
        { label: 'Closing debtors', correctBucket: 'Credit Side' },
      ] } },
      explanation: 'Debtors control: Dr side has opening debtors and credit sales. Cr side has cash received, bad debts, discount, returns, and closing debtors.',
      sectionLink: '16.2.1',
    },
    {
      id: 'r16-05', chapterId: 16, sectionId: '16.3', type: 'match',
      prompt: 'Match each mark-up with its equivalent margin.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Mark-up 25%', definition: 'Margin 20%' },
        { term: 'Mark-up 33⅓%', definition: 'Margin 25%' },
        { term: 'Mark-up 50%', definition: 'Margin 33⅓%' },
        { term: 'Mark-up 100%', definition: 'Margin 50%' },
      ] } },
      explanation: 'Mark-up is % of cost; margin is % of sales. Mark-up 25% on €100 cost = €125 SP. Margin = €25/€125 = 20%.',
      sectionLink: '16.3.2',
    },
    {
      id: 'r16-06', chapterId: 16, sectionId: '16.3', type: 'mcq',
      prompt: 'Mark-up is 33⅓%. Sales are €160,000. What is the cost of sales?',
      itemData: { type: 'mcq', data: { options: ['€106,667', '€120,000', '€128,000', '€133,333'], correctIndex: 1 } },
      explanation: 'Mark-up 33⅓% means SP = Cost × 1.3333. Cost = €160,000 ÷ 1.3333 = €120,000.',
      sectionLink: '16.3.2',
    },
    {
      id: 'r16-07', chapterId: 16, sectionId: '16.3', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'Mark-up and margin always give the same percentage for a given transaction.',
        isTrue: false,
        followUp: {
          prompt: 'What is the difference?',
          chips: [
            'Mark-up is % of cost; margin is % of selling price',
            'They are calculated the same way',
            'Mark-up is always higher than margin',
          ],
          correctChip: 'Mark-up is % of cost; margin is % of selling price',
        },
      } },
      explanation: 'Mark-up uses cost as the base; margin uses selling price. The same profit gives different percentages depending on the base used.',
      sectionLink: '16.3.2',
    },
    {
      id: 'r16-08', chapterId: 16, sectionId: '16.2', type: 'mcq',
      prompt: 'Opening debtors €8,500. Cash received €74,200. Bad debts €1,200. Discount €800. Closing debtors €9,300. Credit sales?',
      itemData: { type: 'mcq', data: { options: ['€74,200', '€77,000', '€85,500', '€76,200'], correctIndex: 1 } },
      explanation: 'Credit sales = Cash + Bad debts + Discount + Closing debtors − Opening debtors = €74,200 + €1,200 + €800 + €9,300 − €8,500 = €77,000.',
      sectionLink: '16.2.1',
    },
    {
      id: 'r16-09', chapterId: 16, sectionId: '16.1', type: 'define',
      prompt: 'Define the following term.',
      itemData: { type: 'define', data: {
        term: 'Statement of Affairs',
        modelDefinition: 'A balance sheet prepared from incomplete records to establish the capital (net worth) at a given date — lists known assets and liabilities.',
      } },
      explanation: 'The statement of affairs is prepared at both the start and end of the period to enable the net worth calculation.',
      sectionLink: '16.1.1',
    },
    {
      id: 'r16-10', chapterId: 16, sectionId: '16.3', type: 'fill-chip',
      prompt: 'Complete the statement.',
      itemData: { type: 'fill-chip', data: {
        sentence: 'Margin is profit expressed as a percentage of ___.',
        chips: ['cost price', 'selling price', 'opening stock', 'net assets'],
        correctChip: 'selling price',
      } },
      explanation: 'Margin = Profit / Sales × 100. Mark-up = Profit / Cost × 100.',
      sectionLink: '16.3.2',
    },
    {
      id: 'r16-11', chapterId: 16, sectionId: '16.2', type: 'order',
      prompt: 'Put the incomplete records reconstruction steps in order.',
      itemData: { type: 'order', data: { steps: [
        'Prepare opening statement of affairs',
        'Summarise the cash/bank account',
        'Prepare debtors and creditors control accounts',
        'Reconstruct the Trading, P&L Account',
        'Prepare closing Balance Sheet',
      ] } },
      explanation: 'Start with what you know (opening position), then use control accounts to find missing figures, and finally prepare the full set of accounts.',
      sectionLink: '16.2.1',
    },
    {
      id: 'r16-12', chapterId: 16, sectionId: '16.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: {
        statement: 'In a cash/bank summary, the balancing figure on the payments side could represent unrecorded drawings.',
        isTrue: true,
      } },
      explanation: 'If all known receipts exceed all known payments + closing balance, the difference may be unrecorded drawings or theft.',
      sectionLink: '16.2.1',
    },
    {
      id: 'r16-13', chapterId: 16, sectionId: '16.3', type: 'mcq',
      prompt: 'Margin is 20%. Cost of sales is €96,000. What are the sales?',
      itemData: { type: 'mcq', data: { options: ['€115,200', '€120,000', '€100,800', '€128,000'], correctIndex: 1 } },
      explanation: 'Margin 20% means cost = 80% of sales. Sales = €96,000 ÷ 0.80 = €120,000.',
      sectionLink: '16.3.2',
    },
  ],

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

  // ────────────────────────────────────────────
  // Chapter 3 — Bank Reconciliation
  // ────────────────────────────────────────────
  3: [
    {
      id: 'r3-01', chapterId: 3, sectionId: '3.1', type: 'sort',
      prompt: 'Sort each item: does it adjust the Bank Account or the Bank Reconciliation Statement?',
      itemData: { type: 'sort', data: { buckets: ['Adjust Bank Account', 'Bank Reconciliation Statement'], items: [
        { label: 'Standing order not in cash book', correctBucket: 'Adjust Bank Account' },
        { label: 'Unpresented cheques', correctBucket: 'Bank Reconciliation Statement' },
        { label: 'Direct debit not recorded', correctBucket: 'Adjust Bank Account' },
        { label: 'Lodgements not yet credited', correctBucket: 'Bank Reconciliation Statement' },
        { label: 'Bank charges not in cash book', correctBucket: 'Adjust Bank Account' },
        { label: 'Cheques written but not cashed', correctBucket: 'Bank Reconciliation Statement' },
      ] } },
      explanation: 'Items unknown to the business (standing orders, direct debits, bank charges, interest) adjust the Bank Account. Timing differences (unpresented cheques, uncredited lodgements) go in the Bank Reconciliation Statement.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-02', chapterId: 3, sectionId: '3.1', type: 'mcq',
      prompt: 'A cheque written by the business has not yet been cashed by the supplier. This is called:',
      itemData: { type: 'mcq', data: { options: ['An unpresented cheque', 'A dishonoured cheque', 'A stale cheque', 'A standing order'], correctIndex: 0 } },
      explanation: 'An unpresented cheque has been issued but not yet presented to the bank for payment. It appears in the cash book but not on the bank statement.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-03', chapterId: 3, sectionId: '3.1', type: 'fill-chip',
      prompt: 'A lodgement made on the last day of the month but not yet showing on the bank statement is called a ___ lodgement.',
      itemData: { type: 'fill-chip', data: { sentence: 'A lodgement made on the last day of the month but not yet showing on the bank statement is called a ___ lodgement.', chips: ['uncredited', 'dishonoured', 'standing', 'reconciled'], correctChip: 'uncredited' } },
      explanation: 'An uncredited lodgement (or lodgement not yet credited) is money deposited by the business that has not yet appeared on the bank statement due to processing time.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-04', chapterId: 3, sectionId: '3.1', type: 'order',
      prompt: 'Order the steps for preparing a Bank Reconciliation Statement.',
      itemData: { type: 'order', data: { steps: ['Compare cash book with bank statement and tick matching items', 'Identify items in bank statement not in cash book', 'Adjust the Bank Account for unknown items', 'Calculate adjusted bank balance', 'Prepare the Bank Reconciliation Statement starting with the adjusted balance'] } },
      explanation: 'Start by ticking off matching items, then adjust the cash book for items the business did not know about, then reconcile the remaining differences.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-05', chapterId: 3, sectionId: '3.1', type: 'true-false',
      prompt: 'If the bank statement shows a credit balance, the business has money in the bank.',
      itemData: { type: 'true-false', data: { statement: 'If the bank statement shows a credit balance, the business has money in the bank.', isTrue: true, followUp: { prompt: 'Why is it a credit on the statement?', chips: ['The bank owes the business — it is a liability of the bank', 'The business owes the bank', 'Credits always mean the business has cash'], correctChip: 'The bank owes the business — it is a liability of the bank' } } },
      explanation: 'A credit on the bank statement means the bank owes the business money (a liability of the bank). This is the opposite of the cash book where a debit balance means money in the bank.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-06', chapterId: 3, sectionId: '3.1', type: 'mcq',
      prompt: 'A direct debit of €150 for insurance appears on the bank statement but not in the cash book. What adjustment is needed?',
      itemData: { type: 'mcq', data: { options: ['Credit the Bank Account €150', 'Debit the Bank Account €150', 'Add €150 to the BRS', 'Deduct €150 in the BRS'], correctIndex: 0 } },
      explanation: 'The direct debit is a payment out — credit the bank account (reduces the balance). This is an adjustment to the cash book because it was unknown to the business.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-07', chapterId: 3, sectionId: '3.1', type: 'match',
      prompt: 'Match each reconciliation item to its treatment.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Standing order not in cash book', definition: 'Adjust Bank Account — credit side' },
        { term: 'Uncredited lodgement', definition: 'Add in BRS' },
        { term: 'Unpresented cheque', definition: 'Deduct in BRS' },
        { term: 'Interest earned not in cash book', definition: 'Adjust Bank Account — debit side' },
      ] } },
      explanation: 'Items unknown to the business adjust the bank account. Timing differences (unpresented cheques and uncredited lodgements) appear in the Bank Reconciliation Statement.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-08', chapterId: 3, sectionId: '3.1', type: 'mcq',
      prompt: 'A cheque for €500 was returned by the bank marked "refer to drawer". This means:',
      itemData: { type: 'mcq', data: { options: ['The cheque has been dishonoured', 'The cheque was cashed twice', 'The bank lost the cheque', 'The payee cancelled it'], correctIndex: 0 } },
      explanation: 'A dishonoured cheque means the drawer (payer) did not have sufficient funds. The amount must be reversed — debit debtors, credit bank.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-09', chapterId: 3, sectionId: '3.1', type: 'define',
      prompt: 'Define: Bank Reconciliation Statement',
      itemData: { type: 'define', data: { term: 'Bank Reconciliation Statement', modelDefinition: 'A statement that explains the difference between the adjusted balance in the business\'s bank account and the balance shown on the bank statement at the same date.' } },
      explanation: 'The BRS accounts for timing differences — items recorded by one party but not yet by the other.',
      sectionLink: '3.1.1',
    },
    {
      id: 'r3-10', chapterId: 3, sectionId: '3.1', type: 'true-false',
      prompt: 'Unpresented cheques are added in the Bank Reconciliation Statement.',
      itemData: { type: 'true-false', data: { statement: 'Unpresented cheques are added in the Bank Reconciliation Statement.', isTrue: false, followUp: { prompt: 'What happens?', chips: ['They are deducted', 'They are ignored', 'They adjust the bank account'], correctChip: 'They are deducted' } } },
      explanation: 'Unpresented cheques are payments already recorded in the cash book but not yet on the bank statement. They are DEDUCTED from the bank statement balance in the BRS.',
      sectionLink: '3.1.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 5 — Control Accounts
  // ────────────────────────────────────────────
  5: [
    {
      id: 'r5-01', chapterId: 5, sectionId: '5.1', type: 'mcq',
      prompt: 'What is the main purpose of a control account?',
      itemData: { type: 'mcq', data: { options: ['To verify the accuracy of the subsidiary ledger', 'To replace the general ledger', 'To calculate profit', 'To prepare the bank reconciliation'], correctIndex: 0 } },
      explanation: 'A control account is a summary account in the general ledger. Its balance should agree with the total of all individual accounts in the subsidiary ledger, providing a check on accuracy.',
      sectionLink: '5.1.1',
    },
    {
      id: 'r5-02', chapterId: 5, sectionId: '5.1', type: 'sort',
      prompt: 'Sort each item: Debit or Credit side of the Debtors Control Account.',
      itemData: { type: 'sort', data: { buckets: ['Debit side', 'Credit side'], items: [
        { label: 'Credit sales', correctBucket: 'Debit side' },
        { label: 'Cash received from debtors', correctBucket: 'Credit side' },
        { label: 'Sales returns', correctBucket: 'Credit side' },
        { label: 'Dishonoured cheque', correctBucket: 'Debit side' },
        { label: 'Bad debts written off', correctBucket: 'Credit side' },
        { label: 'Discount allowed', correctBucket: 'Credit side' },
      ] } },
      explanation: 'The Debtors Control Account has a debit balance. Credit sales and dishonoured cheques increase it (debit). Receipts, returns, bad debts, and discounts reduce it (credit).',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-03', chapterId: 5, sectionId: '5.1', type: 'fill-chip',
      prompt: 'A ___ entry arises when a person is both a debtor and a creditor of the business.',
      itemData: { type: 'fill-chip', data: { sentence: 'A ___ entry arises when a person is both a debtor and a creditor of the business.', chips: ['contra', 'suspense', 'journal', 'closing'], correctChip: 'contra' } },
      explanation: 'A contra entry sets off the smaller balance. The entry is Dr Creditors Control, Cr Debtors Control for the amount of the set-off.',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-04', chapterId: 5, sectionId: '5.1', type: 'match',
      prompt: 'Match each item to whether it appears in the Debtors or Creditors Control Account.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Credit purchases', definition: 'Creditors Control — Credit side' },
        { term: 'Discount received', definition: 'Creditors Control — Debit side' },
        { term: 'Interest charged on overdue debts', definition: 'Debtors Control — Debit side' },
        { term: 'Purchase returns', definition: 'Creditors Control — Debit side' },
      ] } },
      explanation: 'Credit purchases increase creditors (credit side). Discount received and purchase returns reduce creditors (debit side). Interest charged increases debtors (debit side).',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-05', chapterId: 5, sectionId: '5.1', type: 'true-false',
      prompt: 'The Creditors Control Account normally has a debit balance.',
      itemData: { type: 'true-false', data: { statement: 'The Creditors Control Account normally has a debit balance.', isTrue: false, followUp: { prompt: 'What balance does it have?', chips: ['Credit balance', 'No balance', 'Either side'], correctChip: 'Credit balance' } } },
      explanation: 'The Creditors Control Account normally has a credit balance, representing the total amount owed to suppliers.',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-06', chapterId: 5, sectionId: '5.1', type: 'mcq',
      prompt: 'If the Debtors Control Account shows €24,000 but the list of debtors totals €23,700, what should be investigated?',
      itemData: { type: 'mcq', data: { options: ['An error in the subsidiary ledger or control account', 'The bank reconciliation', 'The P&L account', 'The closing stock figure'], correctIndex: 0 } },
      explanation: 'When the control account and subsidiary ledger disagree, there is an error somewhere — either in the individual debtor accounts or in the control account itself. Common causes include unrecorded items or posting errors.',
      sectionLink: '5.1.1',
    },
    {
      id: 'r5-07', chapterId: 5, sectionId: '5.1', type: 'order',
      prompt: 'Order the items that appear on the CREDIT side of the Debtors Control Account.',
      itemData: { type: 'order', data: { steps: ['Cash/cheques received from debtors', 'Discount allowed', 'Sales returns', 'Bad debts written off', 'Contra (set-off)'] } },
      explanation: 'All of these items reduce the amount owed by debtors, so they appear on the credit side of the Debtors Control Account.',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-08', chapterId: 5, sectionId: '5.1', type: 'define',
      prompt: 'Define: Control Account',
      itemData: { type: 'define', data: { term: 'Control Account', modelDefinition: 'A summary account in the general ledger that records the total of all individual debtor or creditor accounts. It provides a check on the accuracy of the subsidiary ledger.' } },
      explanation: 'The closing balance of the control account should equal the total of all individual balances in the subsidiary (personal) ledger.',
      sectionLink: '5.1.1',
    },
    {
      id: 'r5-09', chapterId: 5, sectionId: '5.2', type: 'mcq',
      prompt: 'Which of the following is NOT an advantage of using control accounts?',
      itemData: { type: 'mcq', data: { options: ['Locating errors quickly', 'Internal check on staff', 'Eliminating the need for personal accounts', 'Speeding up the trial balance'], correctIndex: 2 } },
      explanation: 'Personal accounts are still needed for individual debtors and creditors. Control accounts summarise them \u2014 they do not replace them.',
      sectionLink: '5.2.1',
    },
    {
      id: 'r5-10', chapterId: 5, sectionId: '5.2', type: 'sort',
      prompt: 'Sort each issue: would it cause a difference between the Debtors Control Account and the list of debtors?',
      itemData: { type: 'sort', data: { buckets: ['Causes a difference', 'No difference'], items: [
        { label: 'Sales day book undercast', correctBucket: 'Causes a difference' },
        { label: 'Bad debt written off in personal account only', correctBucket: 'Causes a difference' },
        { label: 'Cash sale recorded in cash book', correctBucket: 'No difference' },
        { label: 'Different amount posted to control vs personal account', correctBucket: 'Causes a difference' },
      ] } },
      explanation: 'Cash sales bypass debtors entirely. Errors in either the day-book casting, the personal account or the control account will cause the two figures to disagree.',
      sectionLink: '5.2.2',
    },
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r5-15', chapterId: 5, sectionId: '5.1', type: 'sort',
      prompt: 'Which of these are advantages of preparing control accounts?',
      itemData: { type: 'sort', data: { buckets: ['Advantage', 'Not an advantage'], items: [
        { label: 'Provides an arithmetical check on the ledger', correctBucket: 'Advantage' },
        { label: 'Helps locate errors quickly to a specific ledger', correctBucket: 'Advantage' },
        { label: 'Acts as a deterrent to fraud (separation of duties)', correctBucket: 'Advantage' },
        { label: 'Total debtors and creditors figures available immediately', correctBucket: 'Advantage' },
        { label: 'Replaces the need for individual personal accounts', correctBucket: 'Not an advantage' },
        { label: 'Eliminates all errors from the ledger', correctBucket: 'Not an advantage' },
      ] } },
      explanation: 'Control accounts give an internal check, locate errors, deter fraud and provide instant totals — but they do NOT replace personal accounts and do not catch every error (e.g. errors of omission).',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-16', chapterId: 5, sectionId: '5.1', type: 'mcq',
      prompt: 'A debtors control account total is €48,500 but the personal accounts add to €48,200. Which is the MOST likely reason?',
      itemData: { type: 'mcq', data: { options: [
        'A discount allowed entered only in the personal account',
        'Cash sales not recorded',
        'A provision for bad debts created',
        'Stock figure overstated',
      ], correctIndex: 0 } },
      explanation: 'A discount allowed entered ONLY in the personal account but not in the discount allowed/control entries causes the two totals to diverge. Cash sales and stock issues do not pass through debtors.',
      sectionLink: '5.2.2',
    },
    {
      id: 'r5-17', chapterId: 5, sectionId: '5.1', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'Control accounts allow the work of the sales/purchases ledger to be separated from the work of writing up the control account, helping prevent fraud.', isTrue: true, followUp: { prompt: 'Which principle does this support?', chips: ['Internal control / separation of duties', 'Going concern', 'Realisation'], correctChip: 'Internal control / separation of duties' } } },
      explanation: 'Separation of duties is a fundamental internal-control principle. Different staff handle the personal accounts vs. the control account, making collusion necessary for fraud.',
      sectionLink: '5.1.2',
    },
    {
      id: 'r5-18', chapterId: 5, sectionId: '5.2', type: 'order',
      prompt: 'Put the steps in order to RECONCILE a control account that disagrees with the ledger:',
      itemData: { type: 'order', data: { steps: [
        'Recast the day-books to verify their totals',
        'Re-add the list of personal account balances',
        'Compare each personal balance against postings to identify omissions or errors',
        'Make corrections in the relevant ledger or control account',
        'Re-extract the totals and confirm they agree',
      ] } },
      explanation: 'Reconciliation works from the casting of the day-books down to individual postings. Always finish by re-extracting both totals to confirm agreement.',
      sectionLink: '5.2.2',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 20 — Costing
  // ────────────────────────────────────────────
  20: [
    {
      id: 'r20-01', chapterId: 20, sectionId: '20.1', type: 'sort',
      prompt: 'Sort each cost into Fixed or Variable.',
      itemData: { type: 'sort', data: { buckets: ['Fixed Cost', 'Variable Cost'], items: [
        { label: 'Factory rent', correctBucket: 'Fixed Cost' },
        { label: 'Direct materials', correctBucket: 'Variable Cost' },
        { label: 'Insurance on factory', correctBucket: 'Fixed Cost' },
        { label: 'Direct labour (piece rate)', correctBucket: 'Variable Cost' },
        { label: 'Depreciation (straight line)', correctBucket: 'Fixed Cost' },
        { label: 'Packaging per unit', correctBucket: 'Variable Cost' },
      ] } },
      explanation: 'Fixed costs remain constant regardless of output level. Variable costs change in direct proportion to the number of units produced.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-02', chapterId: 20, sectionId: '20.1', type: 'mcq',
      prompt: 'What is the Contribution per unit if selling price is €25, variable cost is €15, and fixed costs are €50,000?',
      itemData: { type: 'mcq', data: { options: ['€10', '€15', '€25', '€35'], correctIndex: 0 } },
      explanation: 'Contribution per unit = Selling Price - Variable Cost per unit = €25 - €15 = €10. Fixed costs are not included in the contribution calculation.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-03', chapterId: 20, sectionId: '20.1', type: 'fill-chip',
      prompt: 'Break-even point (units) = Fixed Costs / ___ per unit.',
      itemData: { type: 'fill-chip', data: { sentence: 'Break-even point (units) = Fixed Costs / ___ per unit.', chips: ['Contribution', 'Profit', 'Variable cost', 'Sales'], correctChip: 'Contribution' } },
      explanation: 'BEP = Fixed Costs / Contribution per unit. At break-even, total contribution exactly covers fixed costs, so profit = zero.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-04', chapterId: 20, sectionId: '20.1', type: 'match',
      prompt: 'Match each costing term to its formula.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Contribution', definition: 'Sales - Variable Costs' },
        { term: 'Break-even (units)', definition: 'Fixed Costs / Contribution per unit' },
        { term: 'Margin of Safety', definition: 'Actual Sales - Break-even Sales' },
        { term: 'Target Profit (units)', definition: '(Fixed Costs + Target Profit) / Contribution per unit' },
      ] } },
      explanation: 'These four formulas are the core of marginal costing and appear in nearly every Q8 on the SEC paper.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-05', chapterId: 20, sectionId: '20.1', type: 'mcq',
      prompt: 'In absorption costing, fixed production overheads are:',
      itemData: { type: 'mcq', data: { options: ['Included in the cost per unit', 'Treated as a period cost', 'Ignored entirely', 'Only included if the factory is at full capacity'], correctIndex: 0 } },
      explanation: 'Absorption costing absorbs ALL production costs (fixed and variable) into each unit. This contrasts with marginal costing where fixed costs are treated as period costs.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-06', chapterId: 20, sectionId: '20.1', type: 'true-false',
      prompt: 'Under marginal costing, closing stock is valued at total production cost per unit.',
      itemData: { type: 'true-false', data: { statement: 'Under marginal costing, closing stock is valued at total production cost per unit.', isTrue: false, followUp: { prompt: 'How is it valued?', chips: ['Variable cost per unit only', 'Selling price per unit', 'Fixed cost per unit only'], correctChip: 'Variable cost per unit only' } } },
      explanation: 'Under marginal costing, stock is valued at variable (marginal) cost only. Fixed overheads are written off as period costs in the period they are incurred.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-07', chapterId: 20, sectionId: '20.1', type: 'mcq',
      prompt: 'The overhead absorption rate (OAR) is calculated as:',
      itemData: { type: 'mcq', data: { options: ['Budgeted overheads / Budgeted activity level', 'Actual overheads / Actual activity level', 'Fixed costs / Variable costs', 'Sales / Total costs'], correctIndex: 0 } },
      explanation: 'The OAR uses BUDGETED figures because actual figures are not known until the end of the period. This allows costs to be absorbed throughout the year.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-08', chapterId: 20, sectionId: '20.1', type: 'fill-chip',
      prompt: 'When actual overheads EXCEED absorbed overheads, the difference is called ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'When actual overheads EXCEED absorbed overheads, the difference is called ___.', chips: ['under-absorption', 'over-absorption', 'variance', 'contribution'], correctChip: 'under-absorption' } },
      explanation: 'Under-absorption means not enough overhead was charged to production. This is added to cost of sales in the P&L. Over-absorption (too much charged) is deducted.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-09', chapterId: 20, sectionId: '20.1', type: 'order',
      prompt: 'Order the steps for preparing a Job Cost Sheet.',
      itemData: { type: 'order', data: { steps: ['Record direct materials used', 'Record direct labour hours/cost', 'Calculate overhead absorbed (OAR x activity)', 'Total production cost of the job', 'Add profit mark-up for selling price'] } },
      explanation: 'A job cost sheet accumulates all costs for a specific job. Overheads are absorbed using a predetermined rate based on labour hours, machine hours, or another base.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-10', chapterId: 20, sectionId: '20.1', type: 'mcq',
      prompt: 'FIFO stock valuation means:',
      itemData: { type: 'mcq', data: { options: ['First units purchased are first units sold', 'Last units purchased are first units sold', 'Average cost of all units is used', 'Most expensive units are sold first'], correctIndex: 0 } },
      explanation: 'FIFO (First In, First Out) assumes the oldest stock is sold first. Closing stock is valued at the most recent purchase prices.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-11', chapterId: 20, sectionId: '20.1', type: 'define',
      prompt: 'Define: Margin of Safety',
      itemData: { type: 'define', data: { term: 'Margin of Safety', modelDefinition: 'The difference between actual (or budgeted) sales and break-even sales. It represents how much sales can fall before the business starts making a loss.' } },
      explanation: 'Margin of Safety can be expressed in units, euro, or as a percentage of actual sales.',
      sectionLink: '20.1.1',
    },
    {
      id: 'r20-12', chapterId: 20, sectionId: '20.1', type: 'true-false',
      prompt: 'If production exceeds sales, absorption costing will show a HIGHER profit than marginal costing.',
      itemData: { type: 'true-false', data: { statement: 'If production exceeds sales, absorption costing will show a HIGHER profit than marginal costing.', isTrue: true } },
      explanation: 'When production > sales, closing stock increases. Under absorption costing, some fixed overheads are carried forward in stock (deferred). Under marginal costing, all fixed costs are expensed immediately. So absorption shows higher profit.',
      sectionLink: '20.1.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 21 — Budgeting
  // ────────────────────────────────────────────
  21: [
    {
      id: 'r21-01', chapterId: 21, sectionId: '21.1', type: 'sort',
      prompt: 'Sort each item into Cash Budget Receipt or Cash Budget Payment.',
      itemData: { type: 'sort', data: { buckets: ['Receipt', 'Payment'], items: [
        { label: 'Cash sales', correctBucket: 'Receipt' },
        { label: 'Wages paid', correctBucket: 'Payment' },
        { label: 'Debtors paying outstanding balances', correctBucket: 'Receipt' },
        { label: 'Purchase of new machinery', correctBucket: 'Payment' },
        { label: 'Bank loan received', correctBucket: 'Receipt' },
        { label: 'Payment to creditors', correctBucket: 'Payment' },
      ] } },
      explanation: 'Cash budgets only include CASH items. Non-cash items like depreciation and bad debts written off are excluded.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-02', chapterId: 21, sectionId: '21.1', type: 'mcq',
      prompt: 'Which of the following is NOT included in a Cash Budget?',
      itemData: { type: 'mcq', data: { options: ['Depreciation', 'Loan repayments', 'Cash sales', 'Creditor payments'], correctIndex: 0 } },
      explanation: 'Depreciation is a non-cash expense. It reduces profit but does not involve any cash movement. The Cash Budget only includes actual cash inflows and outflows.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-03', chapterId: 21, sectionId: '21.1', type: 'fill-chip',
      prompt: 'Production Budget (units) = Budgeted Sales + Closing Stock - ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'Production Budget (units) = Budgeted Sales + Closing Stock - ___.', chips: ['Opening Stock', 'Purchases', 'Variable Costs', 'Fixed Costs'], correctChip: 'Opening Stock' } },
      explanation: 'Units to produce = what you need to sell + what you want left over - what you already have. This ensures sufficient stock levels.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-04', chapterId: 21, sectionId: '21.1', type: 'match',
      prompt: 'Match each budget type to what it calculates.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Cash Budget', definition: 'Expected cash inflows and outflows each month' },
        { term: 'Production Budget', definition: 'Number of units to manufacture' },
        { term: 'Materials Budget', definition: 'Quantity and cost of raw materials needed' },
        { term: 'Flexible Budget', definition: 'Costs at different activity levels' },
      ] } },
      explanation: 'Each budget serves a different planning purpose. The Cash Budget is the most commonly examined on the SEC paper.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-05', chapterId: 21, sectionId: '21.1', type: 'true-false',
      prompt: 'A favourable variance means actual costs were higher than budgeted.',
      itemData: { type: 'true-false', data: { statement: 'A favourable variance means actual costs were higher than budgeted.', isTrue: false, followUp: { prompt: 'What does favourable mean?', chips: ['Actual costs were lower than budgeted', 'Budget was not prepared', 'Actual and budgeted are equal'], correctChip: 'Actual costs were lower than budgeted' } } },
      explanation: 'A favourable variance occurs when actual performance is BETTER than budget — lower costs or higher revenue. An adverse variance is the opposite.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-06', chapterId: 21, sectionId: '21.1', type: 'mcq',
      prompt: 'In a cash budget, if 60% of credit sales are collected in the month of sale and 40% the following month, credit sales of €10,000 in January would result in January cash receipts of:',
      itemData: { type: 'mcq', data: { options: ['€6,000', '€4,000', '€10,000', '€0'], correctIndex: 0 } },
      explanation: '60% of €10,000 = €6,000 collected in January. The remaining €4,000 would be collected in February.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-07', chapterId: 21, sectionId: '21.1', type: 'order',
      prompt: 'Order the steps for preparing a Cash Budget.',
      itemData: { type: 'order', data: { steps: ['Calculate opening cash/bank balance', 'List all expected cash receipts for each month', 'List all expected cash payments for each month', 'Calculate net cash flow (receipts minus payments)', 'Calculate closing balance (opening + net cash flow)'] } },
      explanation: 'The closing balance of one month becomes the opening balance of the next. A negative closing balance indicates the business needs additional financing.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-08', chapterId: 21, sectionId: '21.1', type: 'fill-chip',
      prompt: 'A flexible budget adjusts for different levels of ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'A flexible budget adjusts for different levels of ___.', chips: ['activity/output', 'profit', 'depreciation', 'taxation'], correctChip: 'activity/output' } },
      explanation: 'A flexible budget recalculates variable costs at different activity levels while keeping fixed costs constant. This allows meaningful comparison with actual results.',
      sectionLink: '21.2.1',
    },
    {
      id: 'r21-09', chapterId: 21, sectionId: '21.2', type: 'mcq',
      prompt: 'Materials needed for production = Units to produce x material per unit. If 5,000 units need 3kg each and opening material stock is 2,000kg with desired closing stock of 3,000kg, total material to purchase is:',
      itemData: { type: 'mcq', data: { options: ['16,000 kg', '15,000 kg', '14,000 kg', '18,000 kg'], correctIndex: 0 } },
      explanation: 'Material needed = 5,000 x 3 = 15,000kg. Purchases = 15,000 + 3,000 (closing) - 2,000 (opening) = 16,000kg.',
      sectionLink: '21.2.1',
    },
    {
      id: 'r21-10', chapterId: 21, sectionId: '21.1', type: 'true-false',
      prompt: 'The purchase of a fixed asset should be included in the cash budget.',
      itemData: { type: 'true-false', data: { statement: 'The purchase of a fixed asset should be included in the cash budget.', isTrue: true } },
      explanation: 'Yes! Buying a fixed asset involves a cash outflow. While depreciation is excluded (non-cash), the actual purchase payment must appear in the payments section of the cash budget.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-11', chapterId: 21, sectionId: '21.1', type: 'define',
      prompt: 'Define: Cash Budget',
      itemData: { type: 'define', data: { term: 'Cash Budget', modelDefinition: 'A financial plan showing expected cash receipts and cash payments over a future period, used to forecast the cash/bank balance at the end of each month and identify potential cash shortages.' } },
      explanation: 'The Cash Budget is a planning tool, not a record of past transactions. It helps businesses plan financing and avoid running out of cash.',
      sectionLink: '21.1.1',
    },
    {
      id: 'r21-12', chapterId: 21, sectionId: '21.2', type: 'mcq',
      prompt: 'In a production budget, why is opening stock subtracted?',
      itemData: { type: 'mcq', data: { options: ['Because those units are already available and do not need to be produced', 'Because opening stock is always defective', 'Because it represents a cost saving', 'Because the examiner requires it'], correctIndex: 0 } },
      explanation: 'Production = Sales demand + Desired closing stock - Opening stock. Opening stock is subtracted because those units already exist and can be sold without producing them.',
      sectionLink: '21.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 8 — Regulatory Framework (12 items)
  // ────────────────────────────────────────────
  8: [
    {
      id: 'r8-01', chapterId: 8, sectionId: '8.1', type: 'mcq',
      prompt: 'Under the Companies Act 2014, who is responsible for preparing the financial statements?',
      itemData: { type: 'mcq', data: { options: ['The auditor', 'The directors', 'Revenue Commissioners', 'The CRO'], correctIndex: 1 } },
      explanation: 'It is the directors\' responsibility to prepare accounts. The auditor examines and reports on them.',
      sectionLink: '8.1.1',
    },
    {
      id: 'r8-02', chapterId: 8, sectionId: '8.1', type: 'true-false',
      prompt: 'True or false: Directors who fail to keep proper books may be personally liable for company debts.',
      itemData: { type: 'true-false', data: { statement: 'Directors who fail to keep proper books may be personally liable for company debts.', isTrue: true } },
      explanation: 'Under the Companies Act 2014, directors can face personal liability, fines, imprisonment, and disqualification.',
      sectionLink: '8.1.1',
    },
    {
      id: 'r8-03', chapterId: 8, sectionId: '8.1', type: 'order',
      prompt: 'Put these Companies Act obligations in logical order:',
      itemData: { type: 'order', data: { steps: ['Keep proper books of account', 'Prepare annual financial statements', 'Ensure accounts give a true and fair view', 'Have accounts audited', 'File accounts with the CRO'] } },
      explanation: 'Books must be kept first, then statements prepared, verified for true and fair view, audited, and finally filed with the CRO.',
      sectionLink: '8.1.1',
    },
    {
      id: 'r8-04', chapterId: 8, sectionId: '8.2', type: 'match',
      prompt: 'Match each regulatory body to its role:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'CRO', definition: 'Companies Registration Office — files company returns and accounts' },
        { term: 'Revenue Commissioners', definition: 'Tax collection and enforcement' },
        { term: 'IAASA', definition: 'Irish Auditing & Accounting Supervisory Authority — oversees the profession' },
        { term: 'CPA Ireland / ACCA / Chartered Accountants Ireland', definition: 'Professional accounting bodies — set standards for members' },
      ] } },
      explanation: 'Each body has a distinct role in the regulatory framework.',
      sectionLink: '8.2.1',
    },
    {
      id: 'r8-05', chapterId: 8, sectionId: '8.3', type: 'sort',
      prompt: 'Sort each audit report type as either positive or negative for the company:',
      itemData: { type: 'sort', data: { buckets: ['Positive', 'Negative'], items: [
        { label: 'Unqualified (clean) report', correctBucket: 'Positive' },
        { label: 'Qualified report ("except for...")', correctBucket: 'Negative' },
        { label: 'Adverse report', correctBucket: 'Negative' },
        { label: 'Disclaimer of opinion', correctBucket: 'Negative' },
      ] } },
      explanation: 'Only an unqualified report is positive. Qualified, adverse, and disclaimer all indicate problems.',
      sectionLink: '8.3.1',
    },
    {
      id: 'r8-06', chapterId: 8, sectionId: '8.3', type: 'mcq',
      prompt: 'An auditor who says the accounts do NOT give a true and fair view issues which type of report?',
      itemData: { type: 'mcq', data: { options: ['Unqualified', 'Qualified', 'Adverse', 'Disclaimer'], correctIndex: 2 } },
      explanation: 'An adverse report means the accounts do NOT give a true and fair view. A disclaimer means insufficient evidence to form any opinion.',
      sectionLink: '8.3.1',
    },
    {
      id: 'r8-07', chapterId: 8, sectionId: '8.3', type: 'fill-chip',
      prompt: 'Complete: A ___ report means the auditor has reservations about specific items.',
      itemData: { type: 'fill-chip', data: { sentence: 'A ___ report means the auditor has reservations about specific items.', chips: ['Unqualified', 'Qualified', 'Adverse', 'Disclaimer'], correctChip: 'Qualified' } },
      explanation: 'A qualified report uses "except for..." wording to flag specific reservations while acknowledging the rest is fair.',
      sectionLink: '8.3.1',
    },
    {
      id: 'r8-08', chapterId: 8, sectionId: '8.3', type: 'define',
      prompt: 'Define the ethical principle of "Objectivity" for accountants.',
      itemData: { type: 'define', data: { term: 'Objectivity', modelDefinition: 'Not influenced by bias, conflict of interest, or undue influence of others when making professional judgements.' } },
      explanation: 'Objectivity is one of the five ethical principles. It ensures accountants make independent, unbiased judgements.',
      sectionLink: '8.3.2',
    },
    {
      id: 'r8-09', chapterId: 8, sectionId: '8.3', type: 'match',
      prompt: 'Match each ethical principle to its meaning:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Integrity', definition: 'Honest and straightforward in professional relationships' },
        { term: 'Confidentiality', definition: 'Do not disclose information without proper authority' },
        { term: 'Professional competence', definition: 'Maintain adequate knowledge and skills' },
        { term: 'Professional behaviour', definition: 'Comply with relevant laws and standards' },
      ] } },
      explanation: 'The five ethical principles (including Objectivity) form the foundation of professional conduct for accountants.',
      sectionLink: '8.3.2',
    },
    {
      id: 'r8-10', chapterId: 8, sectionId: '8.3', type: 'true-false',
      prompt: 'True or false: The auditor is responsible for preparing the company accounts.',
      itemData: { type: 'true-false', data: { statement: 'The auditor is responsible for preparing the company accounts.', isTrue: false, followUp: { prompt: 'Who is responsible?', chips: ['The directors', 'The auditor', 'Revenue', 'The CRO'], correctChip: 'The directors' } } },
      explanation: 'Directors prepare the accounts. The auditor only examines and reports on them — a key exam distinction.',
      sectionLink: '8.3.1',
    },
    {
      id: 'r8-11', chapterId: 8, sectionId: '8.1', type: 'mcq',
      prompt: 'Which of the following is NOT a consequence of failing to keep proper books under the Companies Act?',
      itemData: { type: 'mcq', data: { options: ['Personal liability for debts', 'Fines and imprisonment', 'Automatic company liquidation', 'Restriction as a director'], correctIndex: 2 } },
      explanation: 'Consequences include personal liability, fines/imprisonment, and director restriction — but NOT automatic liquidation.',
      sectionLink: '8.1.1',
    },
    {
      id: 'r8-12', chapterId: 8, sectionId: '8.1', type: 'fill-chip',
      prompt: 'Companies must file accounts with the ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'Companies must file accounts with the ___.', chips: ['Revenue Commissioners', 'CRO', 'IAASA', 'Central Bank'], correctChip: 'CRO' } },
      explanation: 'The Companies Registration Office (CRO) is where companies file their annual returns and accounts.',
      sectionLink: '8.1.1',
    },
    {
      id: 'r8-13', chapterId: 8, sectionId: '8.4', type: 'match',
      prompt: 'Match each feature to External or Internal audit.',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Required by Companies Act', definition: 'External audit' },
        { term: 'Performed by employees of the company', definition: 'Internal audit' },
        { term: 'Reports to shareholders at the AGM', definition: 'External audit' },
        { term: 'Focuses on internal controls and efficiency', definition: 'Internal audit' },
      ] } },
      explanation: 'External audit is statutory and reports to shareholders; internal audit is voluntary and reports to management on systems and controls.',
      sectionLink: '8.4.1',
    },
    {
      id: 'r8-14', chapterId: 8, sectionId: '8.4', type: 'mcq',
      prompt: 'Which of the following is NOT a quality of a good auditor?',
      itemData: { type: 'mcq', data: { options: ['Independence', 'Professional competence', 'Loyalty to the directors', 'Due care and diligence'], correctIndex: 2 } },
      explanation: 'An auditor must NOT be loyal to directors \u2014 they must be independent and willing to challenge management.',
      sectionLink: '8.4.2',
    },
    {
      id: 'r8-15', chapterId: 8, sectionId: '8.4', type: 'sort',
      prompt: 'Sort each scenario as a threat or NOT a threat to auditor independence.',
      itemData: { type: 'sort', data: { buckets: ['Threat to independence', 'NOT a threat'], items: [
        { label: 'Auditor owns shares in the client company', correctBucket: 'Threat to independence' },
        { label: 'Audit firm prepared the accounts they are now auditing', correctBucket: 'Threat to independence' },
        { label: 'Auditor uses sampling to check transactions', correctBucket: 'NOT a threat' },
        { label: 'Auditor has been close personal friends with the FD for 20 years', correctBucket: 'Threat to independence' },
      ] } },
      explanation: 'Self-interest, self-review and familiarity are all threats to independence. Sampling is a normal audit technique, not a threat.',
      sectionLink: '8.4.3',
    },
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r8-15', chapterId: 8, sectionId: '8.4', type: 'match',
      prompt: 'Match each threat to auditor independence with the correct example:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Self-interest threat', definition: 'Audit firm holds a significant shareholding in the client' },
        { term: 'Self-review threat', definition: 'Audit firm prepared the financial statements they are now auditing' },
        { term: 'Familiarity threat', definition: 'Lead auditor has been on the same engagement for 12 years' },
        { term: 'Intimidation threat', definition: 'Client threatens to dismiss the auditor unless a clean opinion is given' },
      ] } },
      explanation: 'These are the four classic threats identified in the auditor’s ethical framework. Safeguards include rotation, separation of duties and independent review.',
      sectionLink: '8.4.3',
    },
    {
      id: 'r8-16', chapterId: 8, sectionId: '8.3', type: 'sort',
      prompt: 'Sort each feature: is it a feature of an INTERNAL or EXTERNAL audit?',
      itemData: { type: 'sort', data: { buckets: ['Internal', 'External'], items: [
        { label: 'Carried out by an employee of the company', correctBucket: 'Internal' },
        { label: 'Required by the Companies Act for most companies', correctBucket: 'External' },
        { label: 'Reports primarily to management/audit committee', correctBucket: 'Internal' },
        { label: 'Reports to the shareholders', correctBucket: 'External' },
        { label: 'Focus is on operational efficiency and internal controls', correctBucket: 'Internal' },
        { label: 'Focus is on the truth & fairness of the financial statements', correctBucket: 'External' },
      ] } },
      explanation: 'The internal auditor is an employee focused on controls and efficiency; the external auditor is independent, statutory, and reports to shareholders on the financial statements.',
      sectionLink: '8.3.1',
    },
    {
      id: 'r8-17', chapterId: 8, sectionId: '8.4', type: 'mcq',
      prompt: 'Which of the following is NOT a quality required of an external auditor?',
      itemData: { type: 'mcq', data: { options: [
        'Independence',
        'Integrity',
        'Professional competence',
        'Long personal friendship with the directors',
      ], correctIndex: 3 } },
      explanation: 'Independence, integrity and competence are core qualities. A long personal friendship with the directors creates a familiarity threat — the opposite of what is required.',
      sectionLink: '8.4.1',
    },
    {
      id: 'r8-18', chapterId: 8, sectionId: '8.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'The external auditor’s primary duty is to detect every fraud and error in the company’s books.', isTrue: false, followUp: { prompt: 'What is the auditor’s actual primary duty?', chips: ['To express an opinion on whether the accounts give a true and fair view', 'To prepare the accounts', 'To advise on tax planning'], correctChip: 'To express an opinion on whether the accounts give a true and fair view' } } },
      explanation: 'The auditor expresses an OPINION on the truth and fairness of the accounts — they are not a fraud-detection service. Detection is a by-product, not the primary objective.',
      sectionLink: '8.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 12 — Departmental Accounts (12 items)
  // ────────────────────────────────────────────
  12: [
    {
      id: 'r12-01', chapterId: 12, sectionId: '12.1', type: 'mcq',
      prompt: 'What is the primary purpose of departmental accounts?',
      itemData: { type: 'mcq', data: { options: ['To calculate total company profit only', 'To identify the profit or loss of each department', 'To prepare the cash flow statement', 'To calculate depreciation per department'], correctIndex: 1 } },
      explanation: 'Departmental accounts allow management to assess individual department performance and make informed decisions.',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-02', chapterId: 12, sectionId: '12.1', type: 'true-false',
      prompt: 'True or false: A department making a net loss should always be closed immediately.',
      itemData: { type: 'true-false', data: { statement: 'A department making a net loss should always be closed immediately.', isTrue: false, followUp: { prompt: 'What should you check first?', chips: ['Tax liability', 'Whether it makes a positive contribution', 'Staff numbers', 'Opening stock'], correctChip: 'Whether it makes a positive contribution' } } },
      explanation: 'If a loss-making department has a positive contribution (revenue exceeds directly identifiable costs), closing it would reduce overall profit.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-03', chapterId: 12, sectionId: '12.1', type: 'define',
      prompt: 'Define "contribution" in the context of departmental accounts.',
      itemData: { type: 'define', data: { term: 'Contribution', modelDefinition: 'Revenue minus directly identifiable costs. If positive, the department helps cover shared overheads even if it makes a net loss.' } },
      explanation: 'Contribution is the key measure for closure decisions. A positive contribution means the department is covering some overheads.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-04', chapterId: 12, sectionId: '12.1', type: 'sort',
      prompt: 'Sort these costs as either directly identifiable to a department or shared (apportioned):',
      itemData: { type: 'sort', data: { buckets: ['Directly Identifiable', 'Shared (Apportioned)'], items: [
        { label: 'Staff wages in Dept A', correctBucket: 'Directly Identifiable' },
        { label: 'Rent of shared building', correctBucket: 'Shared (Apportioned)' },
        { label: 'Cost of goods sold in Dept B', correctBucket: 'Directly Identifiable' },
        { label: 'General administration salary', correctBucket: 'Shared (Apportioned)' },
        { label: 'Insurance of shared premises', correctBucket: 'Shared (Apportioned)' },
        { label: 'Advertising for Dept A only', correctBucket: 'Directly Identifiable' },
      ] } },
      explanation: 'Directly identifiable costs can be traced to one department. Shared costs must be apportioned using a suitable basis (floor area, turnover, etc.).',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-05', chapterId: 12, sectionId: '12.1', type: 'mcq',
      prompt: 'If a department with positive contribution is closed, what happens to overall company profit?',
      itemData: { type: 'mcq', data: { options: ['It increases', 'It stays the same', 'It decreases', 'It depends on depreciation'], correctIndex: 2 } },
      explanation: 'Closing a department with positive contribution means its contribution towards shared overheads is lost, reducing overall profit.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-06', chapterId: 12, sectionId: '12.1', type: 'fill-chip',
      prompt: 'Rent is typically apportioned between departments based on ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'Rent is typically apportioned between departments based on ___.', chips: ['Turnover', 'Floor area', 'Number of staff', 'Profit'], correctChip: 'Floor area' } },
      explanation: 'Rent is a property-related cost so it is apportioned based on floor area occupied by each department.',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-07', chapterId: 12, sectionId: '12.1', type: 'match',
      prompt: 'Match each shared cost to its most appropriate apportionment basis:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Rent and rates', definition: 'Floor area' },
        { term: 'Insurance of stock', definition: 'Stock value' },
        { term: 'Canteen costs', definition: 'Number of employees' },
        { term: 'General advertising', definition: 'Turnover ratio' },
      ] } },
      explanation: 'The apportionment basis should reflect the benefit each department receives from the shared cost.',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-08', chapterId: 12, sectionId: '12.1', type: 'mcq',
      prompt: 'Department X has revenue of 180,000, directly identifiable costs of 140,000, and apportioned overheads of 60,000. What is the contribution?',
      itemData: { type: 'mcq', data: { options: ['180,000', '40,000', '-20,000', '60,000'], correctIndex: 1 } },
      explanation: 'Contribution = Revenue (180,000) - Directly identifiable costs (140,000) = 40,000. Despite a net loss of -20,000, the positive contribution means the department helps cover overheads.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-09', chapterId: 12, sectionId: '12.1', type: 'true-false',
      prompt: 'True or false: If a department has a positive contribution but a net loss, closing it would increase overall profit.',
      itemData: { type: 'true-false', data: { statement: 'If a department has a positive contribution but a net loss, closing it would increase overall profit.', isTrue: false } },
      explanation: 'False. Closing a department with positive contribution means the remaining departments must cover more overheads, reducing overall profit.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-10', chapterId: 12, sectionId: '12.1', type: 'order',
      prompt: 'Put these steps in order when preparing departmental accounts:',
      itemData: { type: 'order', data: { steps: ['Calculate revenue for each department', 'Deduct directly identifiable costs', 'Calculate departmental contribution', 'Apportion shared overheads', 'Calculate net profit/loss per department'] } },
      explanation: 'Start with revenue, subtract direct costs for contribution, then apportion shared costs to get net profit/loss.',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-11', chapterId: 12, sectionId: '12.1', type: 'fill-chip',
      prompt: 'A department should NOT be closed if it makes a positive ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'A department should NOT be closed if it makes a positive ___.', chips: ['Net profit', 'Contribution', 'Turnover', 'Gross profit'], correctChip: 'Contribution' } },
      explanation: 'Even if net profit is negative, a positive contribution means the department helps cover shared overheads.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-12', chapterId: 12, sectionId: '12.1', type: 'mcq',
      prompt: 'Which of the following is NOT a reason for preparing departmental accounts?',
      itemData: { type: 'mcq', data: { options: ['Assess department performance', 'Decide on expanding or closing departments', 'Calculate corporation tax', 'Determine departmental contribution'], correctIndex: 2 } },
      explanation: 'Corporation tax is calculated on total company profit, not departmental profit. Departmental accounts aid internal management decisions.',
      sectionLink: '12.1.1',
    },
    {
      id: 'r12-13', chapterId: 12, sectionId: '12.2', type: 'mcq',
      prompt: 'Which of the following is a DISADVANTAGE of preparing departmental accounts?',
      itemData: { type: 'mcq', data: { options: ['Performance can be measured per department', 'Apportionment of shared costs is subjective', 'Loss-making departments can be identified', 'Managers can be set targets'], correctIndex: 1 } },
      explanation: 'Apportionment relies on a chosen basis (floor area, turnover etc.) which is inherently subjective and can distort the result.',
      sectionLink: '12.2.1',
    },
    {
      id: 'r12-14', chapterId: 12, sectionId: '12.2', type: 'true-false',
      prompt: 'True or false?',
      itemData: { type: 'true-false', data: { statement: 'Advertising spent only on Department A should be apportioned across all departments using the turnover ratio.', isTrue: false, followUp: { prompt: 'How should it be treated?', chips: ['Allocated 100% to Department A', 'Spread across all departments equally', 'Treated as a fixed asset'], correctChip: 'Allocated 100% to Department A' } } },
      explanation: 'A cost that benefits only one department is a DIRECT cost — allocate it 100% to that department. Apportionment is only used for shared costs.',
      sectionLink: '12.2.2',
    },
    // ── New theory-reinforcement items (David Wilson PDF) ──
    {
      id: 'r12-15', chapterId: 12, sectionId: '12.2', type: 'match',
      prompt: 'Match each shared overhead to the MOST appropriate apportionment basis:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Rent and rates', definition: 'Floor area occupied' },
        { term: 'Light and heat', definition: 'Floor area or volume (m³)' },
        { term: 'Insurance of stock', definition: 'Average value of stock held' },
        { term: 'Canteen costs', definition: 'Number of employees per department' },
        { term: 'Depreciation of equipment', definition: 'Value of equipment in each department' },
      ] } },
      explanation: 'The apportionment basis must reflect WHAT CAUSES the cost. Floor area drives rent; headcount drives canteen; stock value drives stock insurance.',
      sectionLink: '12.2.2',
    },
    {
      id: 'r12-16', chapterId: 12, sectionId: '12.1', type: 'sort',
      prompt: 'Identify whether each statement is an ADVANTAGE or DISADVANTAGE of departmental accounts:',
      itemData: { type: 'sort', data: { buckets: ['Advantage', 'Disadvantage'], items: [
        { label: 'Identifies the most and least profitable departments', correctBucket: 'Advantage' },
        { label: 'Helps decide whether to expand, contract or close a department', correctBucket: 'Advantage' },
        { label: 'Provides a basis for departmental staff bonuses', correctBucket: 'Advantage' },
        { label: 'Apportionment of overheads is partly subjective', correctBucket: 'Disadvantage' },
        { label: 'Extra time and cost involved in record-keeping', correctBucket: 'Disadvantage' },
        { label: 'Can demoralise staff in less profitable departments', correctBucket: 'Disadvantage' },
      ] } },
      explanation: 'Departmental accounts aid decision-making but require subjective apportionment and additional cost. The David Wilson PDF emphasises both sides for the 10-mark theory part.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-17', chapterId: 12, sectionId: '12.1', type: 'mcq',
      prompt: 'A department shows a NEGATIVE net profit but a POSITIVE contribution. What is the MOST appropriate decision?',
      itemData: { type: 'mcq', data: { options: [
        'Close the department immediately',
        'Keep the department open — it still covers its variable costs and contributes to fixed overheads',
        'Double the department’s prices',
        'Move all overheads to other departments to make it look profitable',
      ], correctIndex: 1 } },
      explanation: 'If a department covers its variable costs (positive contribution), closing it would mean losing that contribution to total fixed overheads — overall profit would FALL.',
      sectionLink: '12.1.2',
    },
    {
      id: 'r12-18', chapterId: 12, sectionId: '12.2', type: 'fill-chip',
      prompt: 'Complete the principle:',
      itemData: { type: 'fill-chip', data: { sentence: 'Costs that benefit ONLY one department are ___; costs that benefit SEVERAL departments are apportioned.', chips: ['allocated', 'depreciated', 'capitalised', 'reversed'], correctChip: 'allocated' } },
      explanation: 'Allocation = whole cost to one department (it is a direct cost). Apportionment = sharing a common cost across departments using a fair basis.',
      sectionLink: '12.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 22 — Product Costing (12 items)
  // ────────────────────────────────────────────
  22: [
    {
      id: 'r22-01', chapterId: 22, sectionId: '22.1', type: 'mcq',
      prompt: 'Under FIFO, which stock is issued first?',
      itemData: { type: 'mcq', data: { options: ['Newest stock', 'Oldest stock', 'Cheapest stock', 'Average-priced stock'], correctIndex: 1 } },
      explanation: 'FIFO = First In, First Out. Oldest stock is issued first, leaving closing stock at the most recent prices.',
      sectionLink: '22.1.1',
    },
    {
      id: 'r22-02', chapterId: 22, sectionId: '22.1', type: 'true-false',
      prompt: 'True or false: LIFO is accepted under FRS 102 for published accounts.',
      itemData: { type: 'true-false', data: { statement: 'LIFO is accepted under FRS 102 for published accounts.', isTrue: false } },
      explanation: 'LIFO is NOT accepted under FRS 102. Only FIFO and weighted average are permitted for published accounts.',
      sectionLink: '22.1.1',
    },
    {
      id: 'r22-03', chapterId: 22, sectionId: '22.1', type: 'sort',
      prompt: 'In a period of rising prices, sort these methods from highest to lowest closing stock value:',
      itemData: { type: 'sort', data: { buckets: ['Highest Closing Stock', 'Middle', 'Lowest Closing Stock'], items: [
        { label: 'FIFO', correctBucket: 'Highest Closing Stock' },
        { label: 'Weighted Average', correctBucket: 'Middle' },
        { label: 'LIFO', correctBucket: 'Lowest Closing Stock' },
      ] } },
      explanation: 'Rising prices: FIFO closing stock uses newest (highest) prices. LIFO uses oldest (lowest). Average is in between.',
      sectionLink: '22.1.1',
    },
    {
      id: 'r22-04', chapterId: 22, sectionId: '22.2', type: 'fill-chip',
      prompt: 'OAR = Budgeted Overheads / Budgeted ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'OAR = Budgeted Overheads / Budgeted ___.', chips: ['Profit', 'Activity', 'Sales', 'Materials'], correctChip: 'Activity' } },
      explanation: 'The Overhead Absorption Rate uses budgeted activity (labour hours, machine hours, or units) as the denominator.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-05', chapterId: 22, sectionId: '22.2', type: 'order',
      prompt: 'Put the overhead recovery steps in correct order:',
      itemData: { type: 'order', data: { steps: ['Allocation — assign directly to departments', 'Apportionment — share common costs', 'Reapportionment — transfer service dept costs to production', 'Absorption — charge to products using OAR'] } },
      explanation: 'The four-step process ensures all overheads are ultimately charged to production departments and then to products.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-06', chapterId: 22, sectionId: '22.2', type: 'define',
      prompt: 'Define "Overhead Absorption Rate (OAR)".',
      itemData: { type: 'define', data: { term: 'Overhead Absorption Rate (OAR)', modelDefinition: 'The rate at which production overheads are charged to products. OAR = Budgeted Overheads / Budgeted Activity Level.' } },
      explanation: 'The OAR is applied to actual activity to calculate absorbed overheads. If absorbed differs from actual, there is over- or under-absorption.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-07', chapterId: 22, sectionId: '22.2', type: 'mcq',
      prompt: 'If budgeted overheads are 120,000 and budgeted labour hours are 8,000, what is the OAR per labour hour?',
      itemData: { type: 'mcq', data: { options: ['12 per hour', '15 per hour', '10 per hour', '8 per hour'], correctIndex: 1 } },
      explanation: '120,000 / 8,000 = 15 per labour hour.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-08', chapterId: 22, sectionId: '22.2', type: 'match',
      prompt: 'Match each overhead recovery term to its meaning:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Allocation', definition: 'Assigning a cost directly to a specific department' },
        { term: 'Apportionment', definition: 'Sharing common costs using a suitable basis' },
        { term: 'Reapportionment', definition: 'Transferring service department costs to production departments' },
        { term: 'Absorption', definition: 'Charging overheads to products using OAR' },
      ] } },
      explanation: 'These four steps ensure all overheads end up in product costs.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-09', chapterId: 22, sectionId: '22.2', type: 'true-false',
      prompt: 'True or false: Under absorption costing, fixed overheads are included in the cost per unit.',
      itemData: { type: 'true-false', data: { statement: 'Under absorption costing, fixed overheads are included in the cost per unit.', isTrue: true } },
      explanation: 'Absorption costing includes ALL costs (direct materials + direct labour + direct expenses + absorbed overheads) in the unit cost.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-10', chapterId: 22, sectionId: '22.1', type: 'mcq',
      prompt: 'Which stock valuation method smooths out price fluctuations?',
      itemData: { type: 'mcq', data: { options: ['FIFO', 'LIFO', 'Weighted Average', 'Specific identification'], correctIndex: 2 } },
      explanation: 'Weighted Average recalculates the average cost after each purchase, smoothing out price fluctuations.',
      sectionLink: '22.1.1',
    },
    {
      id: 'r22-11', chapterId: 22, sectionId: '22.2', type: 'fill-chip',
      prompt: 'Total cost per unit = Direct Materials + Direct Labour + Direct Expenses + Absorbed ___.',
      itemData: { type: 'fill-chip', data: { sentence: 'Total cost per unit = Direct Materials + Direct Labour + Direct Expenses + Absorbed ___.', chips: ['Profit', 'Overheads', 'Sales', 'Contribution'], correctChip: 'Overheads' } },
      explanation: 'Absorption costing charges all production costs including absorbed overheads to each unit.',
      sectionLink: '22.2.1',
    },
    {
      id: 'r22-12', chapterId: 22, sectionId: '22.1', type: 'mcq',
      prompt: 'In a period of rising prices, which method gives the HIGHEST gross profit?',
      itemData: { type: 'mcq', data: { options: ['LIFO', 'FIFO', 'Weighted Average', 'All give the same'], correctIndex: 1 } },
      explanation: 'FIFO gives highest closing stock (newest prices) which means lowest cost of sales and therefore highest gross profit.',
      sectionLink: '22.1.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 23 — CVP Analysis / Marginal Costing (12 items)
  // ────────────────────────────────────────────
  23: [
    {
      id: 'r23-01', chapterId: 23, sectionId: '23.1', type: 'fill-chip',
      prompt: 'Contribution = Sales minus ___ Costs.',
      itemData: { type: 'fill-chip', data: { sentence: 'Contribution = Sales minus ___ Costs.', chips: ['Fixed', 'Variable', 'Total', 'Direct'], correctChip: 'Variable' } },
      explanation: 'Under marginal costing, Contribution = Sales - Variable Costs. Fixed costs are treated as period costs.',
      sectionLink: '23.1.1',
    },
    {
      id: 'r23-02', chapterId: 23, sectionId: '23.2', type: 'mcq',
      prompt: 'SP = 50, VC = 30, FC = 100,000. What is the break-even point in units?',
      itemData: { type: 'mcq', data: { options: ['2,000', '3,333', '5,000', '10,000'], correctIndex: 2 } },
      explanation: 'Contribution per unit = 50 - 30 = 20. BEP = FC / Contribution = 100,000 / 20 = 5,000 units.',
      sectionLink: '23.2.1',
    },
    {
      id: 'r23-03', chapterId: 23, sectionId: '23.2', type: 'define',
      prompt: 'Define "Margin of Safety".',
      itemData: { type: 'define', data: { term: 'Margin of Safety', modelDefinition: 'The difference between actual (or budgeted) sales and break-even sales. It shows how much sales can fall before the business starts making a loss.' } },
      explanation: 'Margin of Safety = Actual Sales - BEP Sales. Can be expressed in units, euro, or as a percentage.',
      sectionLink: '23.2.1',
    },
    {
      id: 'r23-04', chapterId: 23, sectionId: '23.2', type: 'mcq',
      prompt: 'The C/S Ratio formula is:',
      itemData: { type: 'mcq', data: { options: ['FC / SP x 100', 'Contribution per unit / SP x 100', 'VC / SP x 100', 'Profit / Sales x 100'], correctIndex: 1 } },
      explanation: 'C/S Ratio = Contribution per unit / Selling Price x 100. It shows the % of each euro of sales that contributes to covering fixed costs.',
      sectionLink: '23.2.1',
    },
    {
      id: 'r23-05', chapterId: 23, sectionId: '23.3', type: 'true-false',
      prompt: 'True or false: When production exceeds sales (stock builds up), absorption costing gives a HIGHER profit than marginal costing.',
      itemData: { type: 'true-false', data: { statement: 'When production exceeds sales, absorption costing gives a higher profit than marginal costing.', isTrue: true } },
      explanation: 'When stock increases, absorption costing defers fixed overheads in closing stock, resulting in higher reported profit.',
      sectionLink: '23.3.1',
    },
    {
      id: 'r23-06', chapterId: 23, sectionId: '23.3', type: 'sort',
      prompt: 'Sort these decision types into "Use marginal costing" or "Use absorption costing":',
      itemData: { type: 'sort', data: { buckets: ['Marginal Costing', 'Absorption Costing'], items: [
        { label: 'Accept a special order?', correctBucket: 'Marginal Costing' },
        { label: 'Calculate full product cost for pricing', correctBucket: 'Absorption Costing' },
        { label: 'Make or buy decision', correctBucket: 'Marginal Costing' },
        { label: 'Continue or close a department', correctBucket: 'Marginal Costing' },
        { label: 'External reporting (published accounts)', correctBucket: 'Absorption Costing' },
      ] } },
      explanation: 'Marginal costing is used for short-term decisions (special order, make/buy, closure). Absorption costing for pricing and external reporting.',
      sectionLink: '23.3.2',
    },
    {
      id: 'r23-07', chapterId: 23, sectionId: '23.3', type: 'mcq',
      prompt: 'A special order should be accepted if:',
      itemData: { type: 'mcq', data: { options: ['Price > total cost per unit', 'Price > variable cost per unit and spare capacity exists', 'Price > fixed cost per unit', 'Price > average selling price'], correctIndex: 1 } },
      explanation: 'Accept if the price exceeds variable cost (positive contribution) and there is spare capacity. Fixed costs are already covered by normal sales.',
      sectionLink: '23.3.2',
    },
    {
      id: 'r23-08', chapterId: 23, sectionId: '23.2', type: 'fill-chip',
      prompt: 'Target profit units = (Fixed Costs + Target Profit) / ___ per unit.',
      itemData: { type: 'fill-chip', data: { sentence: 'Target profit units = (Fixed Costs + Target Profit) / ___ per unit.', chips: ['Sales', 'Contribution', 'Variable cost', 'Profit'], correctChip: 'Contribution' } },
      explanation: 'The formula extends BEP by adding the target profit to fixed costs in the numerator.',
      sectionLink: '23.2.1',
    },
    {
      id: 'r23-09', chapterId: 23, sectionId: '23.3', type: 'true-false',
      prompt: 'True or false: When production equals sales, marginal and absorption costing give the same profit.',
      itemData: { type: 'true-false', data: { statement: 'When production equals sales, marginal and absorption costing give the same profit.', isTrue: true } },
      explanation: 'When there is no stock change, no fixed overheads are deferred or released from stock, so both methods give identical profit.',
      sectionLink: '23.3.1',
    },
    {
      id: 'r23-10', chapterId: 23, sectionId: '23.3', type: 'mcq',
      prompt: 'When a limiting factor exists, products should be ranked by:',
      itemData: { type: 'mcq', data: { options: ['Total contribution', 'Contribution per unit of scarce resource', 'Selling price', 'Profit margin'], correctIndex: 1 } },
      explanation: 'With limited resources, maximise total contribution by prioritising products with highest contribution per unit of the scarce factor.',
      sectionLink: '23.3.2',
    },
    {
      id: 'r23-11', chapterId: 23, sectionId: '23.1', type: 'order',
      prompt: 'Put the marginal costing income statement lines in order:',
      itemData: { type: 'order', data: { steps: ['Sales', 'Less: Variable Costs', 'Contribution', 'Less: Fixed Costs', 'Profit/Loss'] } },
      explanation: 'The marginal income statement separates variable from fixed costs, with contribution as the key intermediate figure.',
      sectionLink: '23.1.1',
    },
    {
      id: 'r23-12', chapterId: 23, sectionId: '23.2', type: 'mcq',
      prompt: 'SP = 50, VC = 30, FC = 100,000, Actual sales = 7,000 units. What is the margin of safety in units?',
      itemData: { type: 'mcq', data: { options: ['5,000', '2,000', '7,000', '3,000'], correctIndex: 1 } },
      explanation: 'BEP = 100,000 / 20 = 5,000 units. MoS = 7,000 - 5,000 = 2,000 units.',
      sectionLink: '23.2.1',
    },
  ],

  // ────────────────────────────────────────────
  // Chapter 24 — Budgeting & Budgetary Control (12 items)
  // ────────────────────────────────────────────
  24: [
    {
      id: 'r24-01', chapterId: 24, sectionId: '24.1', type: 'mcq',
      prompt: 'Which budget is the starting point for all other budgets?',
      itemData: { type: 'mcq', data: { options: ['Production budget', 'Sales budget', 'Cash budget', 'Materials budget'], correctIndex: 1 } },
      explanation: 'The sales budget drives all other budgets — production depends on expected sales, materials depend on production, etc.',
      sectionLink: '24.1.1',
    },
    {
      id: 'r24-02', chapterId: 24, sectionId: '24.1', type: 'fill-chip',
      prompt: 'Production Budget = Sales + Closing Stock minus ___ Stock.',
      itemData: { type: 'fill-chip', data: { sentence: 'Production Budget = Sales + Closing Stock minus ___ Stock.', chips: ['Opening', 'Safety', 'Buffer', 'Raw'], correctChip: 'Opening' } },
      explanation: 'Production = what you need to sell + what you want in closing stock - what you already have in opening stock.',
      sectionLink: '24.1.1',
    },
    {
      id: 'r24-03', chapterId: 24, sectionId: '24.1', type: 'order',
      prompt: 'Put these budgets in preparation order:',
      itemData: { type: 'order', data: { steps: ['Sales Budget', 'Production Budget', 'Materials Budget', 'Labour Budget', 'Cash Budget'] } },
      explanation: 'Each budget cascades from sales. Production depends on sales, materials depend on production, and cash timing wraps everything up.',
      sectionLink: '24.1.1',
    },
    {
      id: 'r24-04', chapterId: 24, sectionId: '24.2', type: 'true-false',
      prompt: 'True or false: Depreciation is included in the cash budget.',
      itemData: { type: 'true-false', data: { statement: 'Depreciation is included in the cash budget.', isTrue: false } },
      explanation: 'Depreciation is a non-cash expense. The cash budget only includes actual cash inflows and outflows.',
      sectionLink: '24.2.1',
    },
    {
      id: 'r24-05', chapterId: 24, sectionId: '24.2', type: 'sort',
      prompt: 'Sort these items into Cash Receipts or Cash Payments in a cash budget:',
      itemData: { type: 'sort', data: { buckets: ['Cash Receipts', 'Cash Payments'], items: [
        { label: 'Cash sales', correctBucket: 'Cash Receipts' },
        { label: 'Debtor collections', correctBucket: 'Cash Receipts' },
        { label: 'Creditor payments', correctBucket: 'Cash Payments' },
        { label: 'Wages', correctBucket: 'Cash Payments' },
        { label: 'Capital expenditure', correctBucket: 'Cash Payments' },
        { label: 'Loan received', correctBucket: 'Cash Receipts' },
      ] } },
      explanation: 'Cash receipts include sales, debtor collections, and loans received. Cash payments include purchases, wages, overheads, and capital expenditure.',
      sectionLink: '24.2.1',
    },
    {
      id: 'r24-06', chapterId: 24, sectionId: '24.2', type: 'mcq',
      prompt: 'The closing balance of one month in the cash budget becomes the:',
      itemData: { type: 'mcq', data: { options: ['Closing balance of the next month', 'Opening balance of the next month', 'Total receipts of the next month', 'Net cash flow'], correctIndex: 1 } },
      explanation: 'The cash budget rolls forward — each closing balance becomes the next month\'s opening balance.',
      sectionLink: '24.2.1',
    },
    {
      id: 'r24-07', chapterId: 24, sectionId: '24.3', type: 'define',
      prompt: 'Define "Flexible Budget".',
      itemData: { type: 'define', data: { term: 'Flexible Budget', modelDefinition: 'A budget that adjusts to actual output levels. Fixed costs remain unchanged while variable costs are flexed to actual volume, enabling a meaningful comparison with actual results.' } },
      explanation: 'A fixed budget is set for one output level. A flexible budget adjusts variable costs to actual activity for meaningful variance analysis.',
      sectionLink: '24.3.1',
    },
    {
      id: 'r24-08', chapterId: 24, sectionId: '24.3', type: 'match',
      prompt: 'Match each variance type to its meaning:',
      itemData: { type: 'match', data: { pairs: [
        { term: 'Favourable (F)', definition: 'Actual result is better than budget — higher revenue or lower cost' },
        { term: 'Adverse (A)', definition: 'Actual result is worse than budget — lower revenue or higher cost' },
        { term: 'Fixed budget', definition: 'Budget based on one level of output only' },
        { term: 'Flexible budget', definition: 'Budget adjusted to actual output level' },
      ] } },
      explanation: 'Favourable variances improve profit. Adverse variances reduce it. Flexible budgets give more meaningful comparisons.',
      sectionLink: '24.3.1',
    },
    {
      id: 'r24-09', chapterId: 24, sectionId: '24.3', type: 'true-false',
      prompt: 'True or false: In a flexible budget, fixed costs change when output changes.',
      itemData: { type: 'true-false', data: { statement: 'In a flexible budget, fixed costs change when output changes.', isTrue: false } },
      explanation: 'Fixed costs remain constant regardless of output level. Only variable costs are "flexed" to actual activity.',
      sectionLink: '24.3.1',
    },
    {
      id: 'r24-10', chapterId: 24, sectionId: '24.3', type: 'mcq',
      prompt: 'Which variances should be investigated first?',
      itemData: { type: 'mcq', data: { options: ['All variances equally', 'Only favourable variances', 'Significant, controllable, and recurring variances', 'Only adverse variances'], correctIndex: 2 } },
      explanation: 'Focus investigation on variances that are significant in size, controllable by management, and recurring over time.',
      sectionLink: '24.3.2',
    },
    {
      id: 'r24-11', chapterId: 24, sectionId: '24.2', type: 'fill-chip',
      prompt: 'Sales on 30-day credit terms mean cash arrives in the ___ month.',
      itemData: { type: 'fill-chip', data: { sentence: 'Sales on 30-day credit terms mean cash arrives in the ___ month.', chips: ['Same', 'Following', 'Third', 'Previous'], correctChip: 'Following' } },
      explanation: 'Credit terms affect cash timing. 30-day credit means payment is received one month after the sale.',
      sectionLink: '24.2.1',
    },
    {
      id: 'r24-12', chapterId: 24, sectionId: '24.3', type: 'mcq',
      prompt: 'Sensitivity analysis examines:',
      itemData: { type: 'mcq', data: { options: ['Past budget performance', 'How changes in key variables affect profit', 'Credit terms of debtors', 'Break-even only'], correctIndex: 1 } },
      explanation: 'Sensitivity analysis tests "what if" scenarios — changing selling price, volume, variable costs, or fixed costs to see the impact on profit.',
      sectionLink: '24.3.2',
    },
  ],
};
