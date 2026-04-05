import type { TAccountDef } from "@/components/TAccount";

// T-account definitions keyed by archetype ID
// Each entry has: side (dr/cr), label, amount, step (archetype step index), order (sequence within step), cls (optional styling)

export const T_ACCOUNT_DEFS: Record<string, TAccountDef[]> = {
  // ═══ Q1 WORKINGS ═══

  'q1-van-disposal': [
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '622,400', step: 0, order: 0 },
        { side: 'cr', label: 'Delivery Vans (error reversal)', amount: '24,800', step: 1, order: 0 },
        { side: 'dr', label: 'Adjusted balance', amount: '597,600', step: 1, order: 1, cls: 'balance' },
      ]
    },
    {
      title: 'Delivery Vans A/C (Cost)',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '132,000', step: 0, order: 1 },
        { side: 'dr', label: 'New van (cost)', amount: '48,000', step: 2, order: 0 },
        { side: 'dr', label: 'Error reversal', amount: '24,800', step: 2, order: 1 },
        { side: 'cr', label: 'Old van removed (cost)', amount: '35,000', step: 2, order: 2 },
        { side: 'dr', label: 'Adjusted balance', amount: '169,800', step: 2, order: 3, cls: 'balance' },
      ]
    },
    {
      title: 'Disposal of Old Van A/C',
      entries: [
        { side: 'dr', label: 'Cost of old van', amount: '35,000', step: 4, order: 0 },
        { side: 'cr', label: 'Acc. Depreciation', amount: '9,625', step: 4, order: 1 },
        { side: 'cr', label: 'Trade-in allowance', amount: '23,200', step: 4, order: 2 },
        { side: 'cr', label: 'Loss on disposal', amount: '2,175', step: 4, order: 3, cls: 'loss' },
        { side: 'dr', label: 'Total', amount: '35,000', step: 4, order: 4, cls: 'total' },
        { side: 'cr', label: 'Total', amount: '35,000', step: 4, order: 4, cls: 'total' },
      ]
    },
  ],

  'q1-mortgage-interest': [
    {
      title: 'Mortgage Interest A/C',
      entries: [
        { side: 'dr', label: 'Paid (per TB)', amount: '5,400', step: 0, order: 0 },
        { side: 'dr', label: 'Accrual (amount due)', amount: '1,800', step: 1, order: 0 },
        { side: 'dr', label: 'P&L charge (full year)', amount: '7,200', step: 1, order: 1, cls: 'total' },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'dr', label: 'Per TB (difference)', amount: '1,800', step: 0, order: 1 },
        { side: 'cr', label: 'Mortgage Interest', amount: '1,800', step: 2, order: 0 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 1, cls: 'balance' },
      ]
    },
  ],

  'q1-revaluation-eoy': [
    {
      title: 'Buildings A/C',
      entries: [
        { side: 'dr', label: 'Cost (per TB)', amount: '300,000', step: 0, order: 0 },
        { side: 'cr', label: 'Old cost removed', amount: '300,000', step: 2, order: 0 },
        { side: 'dr', label: 'New valuation', amount: '320,000', step: 2, order: 1 },
      ]
    },
    {
      title: 'Acc. Depreciation — Buildings',
      entries: [
        { side: 'cr', label: 'Per TB', amount: '45,000', step: 0, order: 1 },
        { side: 'dr', label: 'Cleared on revaluation', amount: '45,000', step: 2, order: 2 },
      ]
    },
    {
      title: 'Revaluation Reserve',
      entries: [
        { side: 'cr', label: 'Surplus (320k − 255k)', amount: '65,000', step: 2, order: 3 },
      ]
    },
  ],

  'q1-bad-debt-recovery': [
    {
      title: 'Bank A/C',
      entries: [
        { side: 'dr', label: 'Recovery received', amount: '1,500', step: 1, order: 0 },
      ]
    },
    {
      title: 'Bad Debts Recovered A/C',
      entries: [
        { side: 'cr', label: 'Partial recovery (P&L income)', amount: '1,500', step: 1, order: 1 },
      ]
    },
  ],

  'q1-goods-own-use': [
    {
      title: 'Drawings A/C',
      entries: [
        { side: 'dr', label: 'Goods at cost', amount: '3,200', step: 0, order: 0 },
      ]
    },
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'cr', label: 'Goods for own use', amount: '3,200', step: 0, order: 1 },
      ]
    },
  ],

  'q1-prov-bad-debts': [
    {
      title: 'Provision for Bad Debts A/C',
      entries: [
        { side: 'cr', label: 'Old provision', amount: '2,000', step: 0, order: 0 },
        { side: 'cr', label: 'Increase (P&L charge)', amount: '360', step: 0, order: 1 },
        { side: 'cr', label: 'New provision (5% × 47,200)', amount: '2,360', step: 0, order: 2, cls: 'total' },
      ]
    },
  ],

  'q1-patent-writeoff': [
    {
      title: 'Patent A/C',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '12,000', step: 0, order: 0 },
        { side: 'cr', label: 'Written off (25%)', amount: '3,000', step: 0, order: 1 },
        { side: 'dr', label: 'Adjusted balance', amount: '9,000', step: 0, order: 2, cls: 'balance' },
      ]
    },
    {
      title: 'Investment Income A/C',
      entries: [
        { side: 'cr', label: 'Income due (P&L)', amount: '1,800', step: 1, order: 0 },
      ]
    },
    {
      title: 'Investment Income Due A/C',
      entries: [
        { side: 'dr', label: 'Accrual (BS — CA)', amount: '1,800', step: 1, order: 1 },
      ]
    },
  ],

  'q1-credit-sale-vat': [
    {
      title: 'Debtors A/C',
      entries: [
        { side: 'dr', label: 'Credit sale (VAT incl.)', amount: '9,840', step: 1, order: 0 },
      ]
    },
    {
      title: 'Sales A/C',
      entries: [
        { side: 'cr', label: 'Net sale', amount: '8,000', step: 1, order: 1 },
      ]
    },
    {
      title: 'VAT A/C',
      entries: [
        { side: 'cr', label: 'Output VAT (23/123)', amount: '1,840', step: 1, order: 2 },
      ]
    },
  ],

  'q1-debenture-interest-midyear': [
    {
      title: 'Debenture Interest A/C',
      entries: [
        { side: 'dr', label: 'Interest (9 months)', amount: '12,000', step: 0, order: 0 },
      ]
    },
    {
      title: 'Debenture Interest Due A/C',
      entries: [
        { side: 'cr', label: 'Accrual (BS — CL)', amount: '12,000', step: 1, order: 0 },
      ]
    },
  ],

  'q1-scrap-disposal': [
    {
      title: 'Disposal of Machine A/C',
      entries: [
        { side: 'dr', label: 'Cost', amount: '40,000', step: 1, order: 0 },
        { side: 'cr', label: 'Acc. Depreciation', amount: '28,000', step: 1, order: 1 },
        { side: 'cr', label: 'Bank (proceeds)', amount: '15,000', step: 1, order: 2 },
        { side: 'dr', label: 'Profit on disposal', amount: '3,000', step: 1, order: 3, cls: 'profit' },
      ]
    },
  ],

  'q1-dishonoured-cheque': [
    {
      title: 'Debtors A/C (T. Ryan)',
      entries: [
        { side: 'dr', label: 'Cheque dishonoured', amount: '3,600', step: 0, order: 0 },
        { side: 'cr', label: 'Bad debt written off', amount: '3,600', step: 1, order: 0 },
        { side: 'dr', label: 'Net effect', amount: 'NIL', step: 2, order: 0, cls: 'balance' },
      ]
    },
    {
      title: 'Bank A/C',
      entries: [
        { side: 'cr', label: 'Cheque dishonoured', amount: '3,600', step: 0, order: 1 },
      ]
    },
    {
      title: 'Bad Debts A/C (P&L)',
      entries: [
        { side: 'dr', label: 'T. Ryan written off', amount: '3,600', step: 1, order: 1 },
      ]
    },
  ],

  'q1-equipment-debt-settlement': [
    {
      title: 'Disposal of Equipment A/C',
      entries: [
        { side: 'dr', label: 'Cost', amount: '8,000', step: 0, order: 0 },
        { side: 'cr', label: 'Acc. Depreciation', amount: '5,000', step: 0, order: 1 },
        { side: 'cr', label: 'Creditors (settlement)', amount: '4,000', step: 0, order: 2 },
        { side: 'dr', label: 'Profit on disposal', amount: '1,000', step: 0, order: 3, cls: 'profit' },
      ]
    },
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'dr', label: 'Equipment settlement', amount: '4,000', step: 1, order: 0 },
      ]
    },
  ],

  'q1-accruals': [
    {
      title: 'Light & Heat A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Per TB', amount: 'XXX', step: 0, order: 0 },
        { side: 'dr', label: 'Accrual (Dec)', amount: '450', step: 0, order: 1 },
      ]
    },
    {
      title: 'Accruals A/C (BS — CL)',
      entries: [
        { side: 'cr', label: 'Light & Heat due', amount: '450', step: 0, order: 2 },
      ]
    },
  ],

  'q1-prepayments': [
    {
      title: 'Insurance A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '6,200', step: 0, order: 0 },
        { side: 'cr', label: 'Prepaid (9 months)', amount: '3,600', step: 0, order: 1 },
        { side: 'dr', label: 'P&L charge', amount: '2,600', step: 0, order: 2, cls: 'balance' },
      ]
    },
    {
      title: 'Prepaid Insurance A/C (BS — CA)',
      entries: [
        { side: 'dr', label: 'Prepayment', amount: '3,600', step: 0, order: 3 },
      ]
    },
  ],

  'q1-private-expense': [
    {
      title: 'Drawings A/C',
      entries: [
        { side: 'dr', label: 'Private car insurance', amount: '800', step: 0, order: 0 },
      ]
    },
    {
      title: 'Insurance A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '6,200', step: 0, order: 1 },
        { side: 'cr', label: 'Private use', amount: '800', step: 0, order: 2 },
        { side: 'dr', label: 'Business insurance', amount: '5,400', step: 0, order: 3, cls: 'balance' },
      ]
    },
  ],

  'q1-goods-in-transit': [
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'dr', label: 'Goods in transit', amount: '6,000', step: 0, order: 0 },
      ]
    },
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'cr', label: 'Goods in transit', amount: '6,000', step: 0, order: 1 },
      ]
    },
  ],

  'q1-sale-or-return': [
    {
      title: 'Sales A/C',
      entries: [
        { side: 'dr', label: 'Reverse (not accepted)', amount: '4,500', step: 0, order: 0 },
      ]
    },
    {
      title: 'Debtors A/C',
      entries: [
        { side: 'cr', label: 'Reverse (not accepted)', amount: '4,500', step: 0, order: 1 },
      ]
    },
  ],

  'q1-vat-fixed-asset': [
    {
      title: 'VAT A/C',
      entries: [
        { side: 'dr', label: 'Reclaimable VAT', amount: '2,300', step: 1, order: 0 },
      ]
    },
    {
      title: 'Equipment A/C',
      entries: [
        { side: 'dr', label: 'Per TB (incl VAT)', amount: '12,300', step: 0, order: 0 },
        { side: 'cr', label: 'VAT removed', amount: '2,300', step: 1, order: 1 },
        { side: 'dr', label: 'Correct cost', amount: '10,000', step: 1, order: 2, cls: 'balance' },
      ]
    },
  ],

  'q1-creditor-discount': [
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'dr', label: 'Settlement', amount: '5,000', step: 0, order: 0 },
      ]
    },
    {
      title: 'Bank A/C',
      entries: [
        { side: 'cr', label: 'Payment', amount: '4,600', step: 0, order: 1 },
      ]
    },
    {
      title: 'Discount Received A/C (P&L)',
      entries: [
        { side: 'cr', label: 'Discount (income)', amount: '400', step: 0, order: 2 },
      ]
    },
  ],

  'q1-bank-recon': [
    {
      title: 'Insurance A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Standing order (3 mths)', amount: '750', step: 1, order: 0 },
      ]
    },
    {
      title: 'Bank A/C',
      entries: [
        { side: 'cr', label: 'Standing order', amount: '750', step: 1, order: 1 },
      ]
    },
  ],

  'q1-bonus-commission': [
    {
      title: 'Commission A/C (P&L — S&D)',
      entries: [
        { side: 'dr', label: 'Already paid', amount: '20,000', step: 0, order: 0 },
        { side: 'dr', label: 'Accrual due', amount: '5,500', step: 1, order: 0 },
        { side: 'dr', label: 'Total P&L charge', amount: '25,500', step: 1, order: 1, cls: 'total' },
      ]
    },
    {
      title: 'Accruals A/C (BS — CL)',
      entries: [
        { side: 'cr', label: 'Commission due', amount: '5,500', step: 1, order: 2 },
      ]
    },
  ],

  'q1-rent-prepaid-miscalc': [
    {
      title: 'Rent A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Per TB', amount: '30,000', step: 0, order: 0 },
        { side: 'cr', label: 'Correct prepaid', amount: '6,000', step: 1, order: 0 },
        { side: 'dr', label: 'P&L charge', amount: '24,000', step: 2, order: 0, cls: 'balance' },
      ]
    },
    {
      title: 'Prepaid Rent A/C (BS — CA)',
      entries: [
        { side: 'dr', label: 'Prepayment', amount: '6,000', step: 1, order: 1 },
      ]
    },
  ],

  'q1-stock-fire': [
    {
      title: 'Insurance Claim Due A/C (BS — CA)',
      entries: [
        { side: 'dr', label: 'Compensation due', amount: '10,000', step: 1, order: 0 },
      ]
    },
    {
      title: 'Loss by Fire A/C (P&L)',
      entries: [
        { side: 'dr', label: 'Uninsured loss', amount: '2,000', step: 1, order: 1 },
      ]
    },
  ],

  // ═══ S2 WORKINGS (SUSPENSE) ═══

  's2-bad-debt-recovered-reinstated': [
    {
      title: 'Bank A/C',
      entries: [
        { side: 'dr', label: 'V. Mullen (received)', amount: '900', step: 1, order: 0 },
      ]
    },
    {
      title: 'Debtors A/C (V. Mullen)',
      entries: [
        { side: 'dr', label: 'Balance still owed (20%)', amount: '225', step: 1, order: 1 },
      ]
    },
    {
      title: 'Bad Debts Recovered A/C (P&L)',
      entries: [
        { side: 'cr', label: 'Full debt reinstated', amount: '1,125', step: 1, order: 2 },
      ]
    },
  ],

  's2-van-disposal-cash-sale': [
    {
      title: 'Sales A/C',
      entries: [
        { side: 'dr', label: 'Reverse incorrect credit', amount: '8,500', step: 0, order: 0 },
      ]
    },
    {
      title: 'Disposal of Van A/C',
      entries: [
        { side: 'dr', label: 'Cost', amount: '28,000', step: 1, order: 0 },
        { side: 'cr', label: 'Acc. Depreciation', amount: '18,000', step: 1, order: 1 },
        { side: 'cr', label: 'Bank (proceeds)', amount: '8,500', step: 1, order: 2 },
        { side: 'cr', label: 'Loss on disposal', amount: '1,500', step: 1, order: 3, cls: 'loss' },
      ]
    },
  ],

  's2-private-debt-offset-s2': [
    {
      title: 'Creditors A/C (Walsh)',
      entries: [
        { side: 'dr', label: 'Private debt offset', amount: '1,800', step: 0, order: 0 },
      ]
    },
    {
      title: 'Capital A/C',
      entries: [
        { side: 'cr', label: 'Private debt settled', amount: '1,800', step: 1, order: 0 },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'cr', label: 'Missing credit', amount: '1,800', step: 0, order: 1 },
        { side: 'dr', label: 'Capital (corrected)', amount: '1,800', step: 1, order: 1 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 0, cls: 'balance' },
      ]
    },
  ],

  's2-vat-credit-purchase': [
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'dr', label: 'Correction (reverse + re-enter)', amount: '10,000', step: 2, order: 0 },
      ]
    },
    {
      title: 'VAT A/C',
      entries: [
        { side: 'dr', label: 'Correction (reverse + re-enter)', amount: '2,300', step: 2, order: 1 },
      ]
    },
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'cr', label: 'Correction (reverse + re-enter)', amount: '12,300', step: 2, order: 2 },
      ]
    },
  ],

  's2-equipment-credit-wrong': [
    {
      title: 'Equipment A/C',
      entries: [
        { side: 'dr', label: 'Correct account', amount: '4,800', step: 1, order: 0 },
      ]
    },
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'cr', label: 'Remove wrong debit', amount: '4,800', step: 1, order: 1 },
      ]
    },
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'cr', label: 'Reverse Dr + correct Cr', amount: '9,600', step: 1, order: 2 },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'cr', label: 'Opening balance', amount: '9,600', step: 0, order: 0 },
        { side: 'dr', label: 'Correction', amount: '9,600', step: 1, order: 3 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 0, cls: 'balance' },
      ]
    },
  ],

  's2-creditor-equipment-settlement': [
    {
      title: 'Disposal of Equipment A/C',
      entries: [
        { side: 'dr', label: 'Cost', amount: '12,000', step: 1, order: 0 },
        { side: 'cr', label: 'Acc. Depreciation', amount: '8,000', step: 1, order: 1 },
        { side: 'cr', label: 'Creditors (settlement value)', amount: '5,500', step: 1, order: 2 },
        { side: 'dr', label: 'Profit on disposal', amount: '1,500', step: 1, order: 3, cls: 'profit' },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'cr', label: 'Opening (from Creditors Dr)', amount: '5,500', step: 0, order: 0 },
        { side: 'dr', label: 'Correction', amount: '5,500', step: 1, order: 4 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 0, cls: 'balance' },
      ]
    },
  ],

  's2-goods-returned-credit': [
    {
      title: 'Returns Inwards A/C',
      entries: [
        { side: 'dr', label: 'Missing entry', amount: '3,400', step: 1, order: 0 },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'dr', label: 'Opening balance', amount: '3,400', step: 0, order: 0 },
        { side: 'cr', label: 'Returns Inwards correction', amount: '3,400', step: 1, order: 1 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 0, cls: 'balance' },
      ]
    },
  ],

  's2-rent-prepaid-incorrect': [
    {
      title: 'Prepayments A/C (BS — CA)',
      entries: [
        { side: 'dr', label: 'Additional prepaid', amount: '1,500', step: 1, order: 0 },
      ]
    },
    {
      title: 'Rent A/C (P&L)',
      entries: [
        { side: 'cr', label: 'Reduce expense', amount: '1,500', step: 1, order: 1 },
      ]
    },
  ],

  's2-equipment-purchases-wrong-side': [
    {
      title: 'Equipment A/C',
      entries: [
        { side: 'dr', label: 'Correct account', amount: '7,200', step: 1, order: 0 },
      ]
    },
    {
      title: 'Purchases A/C',
      entries: [
        { side: 'cr', label: 'Remove wrong debit', amount: '7,200', step: 1, order: 1 },
      ]
    },
    {
      title: 'Bank A/C',
      entries: [
        { side: 'dr', label: 'Reverse wrong credit', amount: '7,200', step: 1, order: 2 },
      ]
    },
    {
      title: 'Creditors A/C',
      entries: [
        { side: 'cr', label: 'Correct credit', amount: '7,200', step: 1, order: 3 },
      ]
    },
  ],

  's2-repairs-insurance-wrong': [
    {
      title: 'Insurance A/C',
      entries: [
        { side: 'dr', label: 'Reverse wrong credit', amount: '2,600', step: 1, order: 0 },
      ]
    },
    {
      title: 'Bank A/C',
      entries: [
        { side: 'cr', label: 'Correct credit', amount: '2,600', step: 1, order: 1 },
      ]
    },
  ],

  's2-dishonoured-personal': [
    {
      title: 'Capital A/C',
      entries: [
        { side: 'cr', label: 'Owner introduced (personal payment)', amount: '2,800', step: 1, order: 0 },
      ]
    },
    {
      title: 'Debtors A/C (K. Byrne)',
      entries: [
        { side: 'dr', label: 'Dishonour (already done)', amount: '2,800', step: 0, order: 0 },
        { side: 'cr', label: 'Cleared by owner', amount: '2,800', step: 1, order: 1 },
      ]
    },
    {
      title: 'Suspense A/C',
      entries: [
        { side: 'cr', label: 'Missing credit', amount: '2,800', step: 0, order: 1 },
        { side: 'dr', label: 'Capital introduced', amount: '2,800', step: 1, order: 2 },
        { side: 'dr', label: 'Balance: NIL ✓', amount: '—', step: 2, order: 0, cls: 'balance' },
      ]
    },
  ],
};
