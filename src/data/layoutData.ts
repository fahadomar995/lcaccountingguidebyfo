// ═══════════════════════════════════════════════════
// LAYOUT DATA — 14 templates (11 original + MCS, Cash Budget, Job Cost)
// Each layout produces HTML tables using a row-builder pattern
// ═══════════════════════════════════════════════════

export interface LayoutRow {
  label: string;
  c1?: string;
  c2?: string;
  c3?: string;
  cls?: string; // 'h'=header, 'b'=bold, 'i'=indent, 'i2'=double indent, 's'=subtotal, 't'=total, 'bl'=blank, 'bs'=bold subtotal, 'bt'=bold total
  nc?: string;  // N-workings reference
}

export interface LayoutTable {
  caption: string;
  headerRow?: string[]; // optional column headers
  rows: LayoutRow[];
}

export interface LayoutTemplate {
  id: string;
  badge: string;
  badgeText: string;
  title: string;
  tabLabel: string;
  note: string;
  tables: LayoutTable[];
  warn?: string;
}

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  // ═══ 1. ST P&L ═══
  {
    id: 'st-pnl', badge: 'st', badgeText: 'Sole Trader', title: 'Trading, Profit & Loss Account', tabLabel: 'ST P&L',
    note: '<strong>Q1A format.</strong> Trading Account (Gross Profit), then P&L with expenses split into <em>Selling & Distribution</em> and <em>Administration</em>, then interest, then income. N-workings column is where your marks come from.',
    tables: [{
      caption: 'Trading, Profit and Loss Account of [Name] for year ended 31/12/20XX',
      rows: [
        { label: 'Sales', c2: 'XXX' },
        { label: 'Less Cost of Goods Sold:', cls: 'b' },
        { label: 'Opening stock', c1: 'XXX', cls: 'i' },
        { label: 'Purchases (adjusted)', c1: 'XXX', cls: 'i' },
        { label: 'Less Closing stock', c1: '(XXX)', c2: '(XXX)', cls: 'i' },
        { label: 'Gross Profit', c2: 'XXX', cls: 'bs' },
        { label: '', cls: 'bl' },
        { label: 'Less Expenses:', cls: 'b' },
        { label: 'Selling & Distribution', cls: 'b' },
        { label: 'Depreciation — Delivery Vans', c1: 'XXX', cls: 'i' },
        { label: 'Loss on disposal of van', c1: 'XXX', cls: 'i' },
        { label: 'Advertising', c1: 'XXX', cls: 'i' },
        { label: 'Bad debts written off', c1: 'XXX', cls: 'i' },
        { label: 'Increase in prov. for bad debts', c1: 'XXX', cls: 'i' },
        { label: 'Carriage outwards', c1: 'XXX', cls: 'i' },
        { label: 'Discount allowed', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: '', cls: 'bl' },
        { label: 'Administration', cls: 'b' },
        { label: 'Depreciation — Buildings', c1: 'XXX', cls: 'i' },
        { label: 'Insurance', c1: 'XXX', cls: 'i' },
        { label: 'Rent payable', c1: 'XXX', cls: 'i' },
        { label: 'Light & Heat', c1: 'XXX', cls: 'i' },
        { label: 'General expenses', c1: 'XXX', cls: 'i' },
        { label: 'Patent written off', c1: 'XXX', cls: 'i' },
        { label: '[Other admin expenses]', c1: 'XXX', c2: '(XXX)', cls: 'i' },
        { label: '', cls: 'bl' },
        { label: 'Mortgage / Debenture interest', c2: '(XXX)', cls: 'b' },
        { label: '', cls: 'bl' },
        { label: 'Add Income:', cls: 'b' },
        { label: 'Discount received', c1: 'XXX', cls: 'i' },
        { label: 'Rent received', c1: 'XXX', cls: 'i' },
        { label: 'Bad debt recovered', c1: 'XXX', cls: 'i' },
        { label: 'Investment income', c1: 'XXX', cls: 'i' },
        { label: 'Profit on disposal', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Net Profit', c2: 'XXX', cls: 'bt' },
      ]
    }],
    warn: '<strong>Selling & Distribution:</strong> Van depreciation, loss on van disposal, advertising, bad debts w/o, increase in prov. for bad debts, carriage out, discount allowed, commission paid. <strong>Administration:</strong> Building depreciation, insurance, rent, light & heat, general expenses, patent w/o. <strong>Interest</strong> is shown as a separate line (not part of S&D or Admin). <strong>Income</strong> is added last.',
  },

  // ═══ 2. ST Balance Sheet ═══
  {
    id: 'st-bs', badge: 'st', badgeText: 'Sole Trader', title: 'Sole Trader Balance Sheet', tabLabel: 'ST Bal Sheet',
    note: '<strong>Q1A Balance Sheet.</strong> Fixed Assets at Cost/Acc Dep/NBV. Current Assets less Current Liabilities = Net Assets. Financed By: Capital + Net Profit − Drawings + Mortgage + Revaluation Reserve.',
    tables: [{
      caption: 'Balance Sheet of [Name] as at 31/12/20XX',
      rows: [
        { label: 'Fixed Assets', c1: 'Cost', c2: 'Acc Dep', c3: 'NBV', cls: 'h' },
        { label: 'Land & Buildings', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Delivery Vans', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Patents', c3: 'XXX', cls: 'i' },
        { label: 'Investments', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 's' },
        { label: 'Current Assets', cls: 'h' },
        { label: 'Closing stock', c1: 'XXX', cls: 'i' },
        { label: 'Debtors less provision', c1: 'XXX', cls: 'i' },
        { label: 'Prepaid expenses', c1: 'XXX', cls: 'i' },
        { label: 'Investment income due', c1: 'XXX', cls: 'i' },
        { label: 'Bank (if debit balance)', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Less Current Liabilities', cls: 'h' },
        { label: 'Creditors', c1: 'XXX', cls: 'i' },
        { label: 'Bank overdraft', c1: 'XXX', cls: 'i' },
        { label: 'VAT', c1: 'XXX', cls: 'i' },
        { label: 'Mortgage interest due', c1: 'XXX', cls: 'i' },
        { label: 'Expenses due (rent, insurance etc.)', c1: 'XXX', c2: '(XXX)', c3: 'XXX', cls: 'i' },
        { label: 'Net Assets', c3: 'XXX', cls: 'bt' },
        { label: '', cls: 'bl' },
        { label: 'Financed By', cls: 'h' },
        { label: 'Capital', c3: 'XXX', cls: 'i' },
        { label: 'Add Net Profit', c3: 'XXX', cls: 'i' },
        { label: 'Less Drawings', c3: '(XXX)', cls: 'i' },
        { label: 'Mortgage / Long-term loan', c3: 'XXX', cls: 'i' },
        { label: 'Revaluation Reserve', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 't' },
      ]
    }],
  },

  // ═══ 3. Co. Approp. ═══
  {
    id: 'co', badge: 'co', badgeText: 'Company', title: 'Company P&L + Appropriation', tabLabel: 'Co. Approp.',
    note: '<strong>Q1B format.</strong> Same P&L structure as Sole Trader but debenture interest is a charge ABOVE Net Profit. Appropriation section (Corp Tax, Dividends, Reserves) comes BELOW Net Profit.',
    tables: [{
      caption: 'Appropriation Section (below Net Profit)',
      rows: [
        { label: 'Net Profit (after interest)', c2: 'XXX' },
        { label: 'Less Corporation Tax', c2: '(XXX)' },
        { label: 'Profit After Tax', c2: 'XXX', cls: 'bs' },
        { label: 'Less Dividends paid:' },
        { label: 'Preference dividend', c1: 'XXX', cls: 'i2' },
        { label: 'Ordinary dividend', c1: 'XXX', c2: '(XXX)', cls: 'i2' },
        { label: 'Less Transfer to capital reserve', c2: '(XXX)' },
        { label: 'Retained profit for year', c2: 'XXX' },
        { label: 'P&L balance 01/01', c2: 'XXX' },
        { label: 'P&L balance 31/12', c2: 'XXX', cls: 'bt' },
      ]
    }],
    warn: '<strong>Order is rigid:</strong> Net Profit → less Corp Tax → Profit After Tax → less Dividends (Pref then Ord) → less Transfer to Reserve → Retained Profit → add/subtract P&L b/f → P&L c/f. An opening P&L LOSS (debit balance) is subtracted.',
  },

  // ═══ 4. Co. Bal Sheet ═══
  {
    id: 'co-bs', badge: 'co', badgeText: 'Company', title: 'Company Balance Sheet', tabLabel: 'Co. Bal Sheet',
    note: '<strong>Q1B Balance Sheet.</strong> Same structure as Sole Trader but "Financed By" shows Debentures, Share Capital, Reserves, and P&L Balance. No Capital account or Drawings.',
    tables: [{
      caption: 'Balance Sheet of [Name] Ltd as at 31/12/20XX',
      rows: [
        { label: 'Fixed Assets', c1: 'Cost', c2: 'Acc Dep', c3: 'NBV', cls: 'h' },
        { label: 'Land & Buildings', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Equipment / Vans', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Patents / Goodwill', c3: 'XXX', cls: 'i' },
        { label: 'Investments', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 's' },
        { label: 'Current Assets', cls: 'h' },
        { label: 'Closing stock', c1: 'XXX', cls: 'i' },
        { label: 'Debtors less provision', c1: 'XXX', cls: 'i' },
        { label: 'Prepaid expenses', c1: 'XXX', cls: 'i' },
        { label: 'Investment income due', c1: 'XXX', cls: 'i' },
        { label: 'Bank (if debit balance)', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Less Current Liabilities', cls: 'h' },
        { label: 'Trade creditors', c1: 'XXX', cls: 'i' },
        { label: 'Bank overdraft', c1: 'XXX', cls: 'i' },
        { label: 'VAT', c1: 'XXX', cls: 'i' },
        { label: 'PAYE / PRSI', c1: 'XXX', cls: 'i' },
        { label: 'Debenture interest due', c1: 'XXX', cls: 'i' },
        { label: 'Corporation tax provision', c1: 'XXX', cls: 'i' },
        { label: 'Proposed dividends (if stated)', c1: 'XXX', cls: 'i' },
        { label: 'Expenses due', c1: 'XXX', c2: '(XXX)', c3: 'XXX', cls: 'i' },
        { label: 'Net Assets / Capital Employed', c3: 'XXX', cls: 'bt' },
        { label: '', cls: 'bl' },
        { label: 'Financed By', cls: 'h' },
        { label: 'Debentures (long-term)', c3: 'XXX', cls: 'i' },
        { label: 'Capital and Reserves', cls: 'h' },
        { label: 'Ordinary shares @ €1', c2: 'XXX', cls: 'i' },
        { label: 'Preference shares @ €1', c2: 'XXX', cls: 'i' },
        { label: 'Capital reserve', c2: 'XXX', cls: 'i' },
        { label: 'Revaluation reserve', c2: 'XXX', cls: 'i' },
        { label: 'Profit and loss balance', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 't' },
      ]
    }],
    warn: '<strong>Key differences from Sole Trader:</strong> No Capital account (replaced by share capital). No Drawings. Debentures in "Financed By" (long-term). Corp tax provision, debenture interest due, proposed dividends, and PAYE/PRSI are Current Liabilities.',
  },

  // ═══ 5. Manufacturing Account ═══
  {
    id: 'mfg', badge: 'mfg', badgeText: 'Manufacturing', title: 'Manufacturing Account', tabLabel: 'Mfg Account',
    note: '<strong>Q1A variant.</strong> Calculates <em>Cost of Goods Manufactured</em> which replaces Purchases in the Trading Account. Three stocks: RM, WIP, FG.',
    tables: [{
      caption: 'Manufacturing Account of [Name] Ltd for year ended 31/12/20XX',
      rows: [
        { label: 'Raw Materials Consumed', cls: 'h' },
        { label: 'Opening stock of RM', c1: 'XXX', cls: 'i' },
        { label: 'Purchases of RM (adjusted)', c1: 'XXX', cls: 'i' },
        { label: 'Less Closing stock of RM', c1: '(XXX)', cls: 'i' },
        { label: 'Cost of RM Consumed', c2: 'XXX', cls: 'bs' },
        { label: '', cls: 'bl' },
        { label: 'Direct Labour', cls: 'h' },
        { label: 'Factory wages (adjusted)', c2: 'XXX', cls: 'i' },
        { label: 'Prime Cost', c2: 'XXX', cls: 'bs' },
        { label: '', cls: 'bl' },
        { label: 'Factory Overheads', cls: 'h' },
        { label: 'Light, heat & power (factory %)', c1: 'XXX', cls: 'i' },
        { label: 'Factory insurance', c1: 'XXX', cls: 'i' },
        { label: 'Depreciation — machinery', c1: 'XXX', cls: 'i' },
        { label: 'Depreciation — buildings (factory %)', c1: 'XXX', cls: 'i' },
        { label: 'Patent amortisation', c1: 'XXX', cls: 'i' },
        { label: 'Loss on machine disposal', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Total Factory Cost', c2: 'XXX', cls: 'bs' },
        { label: '', cls: 'bl' },
        { label: 'Add Opening WIP', c2: 'XXX', cls: 'i' },
        { label: 'Less Closing WIP', c2: '(XXX)', cls: 'i' },
        { label: 'Less Sale of Scrap', c2: '(XXX)', cls: 'i' },
        { label: 'Cost of Goods Manufactured → Trading A/C', c2: 'XXX', cls: 'bt' },
      ]
    }],
    warn: '<strong>Patent amortisation</strong> = always factory overhead. <strong>Machine disposal loss</strong> = factory overhead. <strong>Van disposal loss</strong> = P&L. If a split is stated (e.g. "80% factory"), apply to shared expenses like building dep, insurance.',
  },

  // ═══ 6. Mfg Balance Sheet ═══
  {
    id: 'mfg-bs', badge: 'mfg', badgeText: 'Manufacturing', title: 'Manufacturing Balance Sheet', tabLabel: 'Mfg Bal Sheet',
    note: '<strong>Q1A Manufacturing Balance Sheet.</strong> Key difference: THREE separate stock lines (Raw Materials, Work in Progress, Finished Goods). Machinery has its own Cost/Acc Dep/NBV line.',
    tables: [{
      caption: 'Balance Sheet of [Name] Ltd as at 31/12/20XX',
      rows: [
        { label: 'Fixed Assets', c1: 'Cost', c2: 'Acc Dep', c3: 'NBV', cls: 'h' },
        { label: 'Land & Buildings', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Machinery', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Delivery Vans', c1: 'XXX', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: 'Patents', c3: 'XXX', cls: 'i' },
        { label: 'Investments', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 's' },
        { label: 'Current Assets', cls: 'h' },
        { label: 'Stock of raw materials', c1: 'XXX', cls: 'i' },
        { label: 'Stock of work in progress', c1: 'XXX', cls: 'i' },
        { label: 'Stock of finished goods', c1: 'XXX', cls: 'i' },
        { label: 'Debtors less provision', c1: 'XXX', cls: 'i' },
        { label: 'Prepaid expenses', c1: 'XXX', cls: 'i' },
        { label: 'Bank (if debit balance)', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Less Current Liabilities', cls: 'h' },
        { label: 'Trade creditors', c1: 'XXX', cls: 'i' },
        { label: 'Bank overdraft', c1: 'XXX', cls: 'i' },
        { label: 'VAT', c1: 'XXX', cls: 'i' },
        { label: 'PAYE / PRSI', c1: 'XXX', cls: 'i' },
        { label: 'Debenture interest due', c1: 'XXX', cls: 'i' },
        { label: 'Corporation tax provision', c1: 'XXX', cls: 'i' },
        { label: 'Expenses due', c1: 'XXX', c2: '(XXX)', c3: 'XXX', cls: 'i' },
        { label: 'Net Assets / Capital Employed', c3: 'XXX', cls: 'bt' },
        { label: '', cls: 'bl' },
        { label: 'Financed By', cls: 'h' },
        { label: 'Debentures (long-term)', c3: 'XXX', cls: 'i' },
        { label: 'Capital and Reserves', cls: 'h' },
        { label: 'Ordinary shares @ €1', c2: 'XXX', cls: 'i' },
        { label: 'Preference shares @ €1', c2: 'XXX', cls: 'i' },
        { label: 'Capital reserve', c2: 'XXX', cls: 'i' },
        { label: 'Revaluation reserve', c2: 'XXX', cls: 'i' },
        { label: 'Profit and loss balance', c2: 'XXX', c3: 'XXX', cls: 'i' },
        { label: '', c3: 'XXX', cls: 't' },
      ]
    }],
    warn: '<strong>THREE stock lines:</strong> Raw Materials (closing), Work in Progress (closing), and Finished Goods (closing). Never lump them together. Machinery gets its own line in Fixed Assets.',
  },

  // ═══ 7. Published P&L + BS ═══
  {
    id: 'published', badge: 'co', badgeText: 'Published', title: 'Published P&L and Balance Sheet', tabLabel: 'Published',
    note: '<strong>Q3 / Q6 format.</strong> Prescribed Companies Act layout. Uses Cost of Sales, Distribution Costs, and Administration Expenses instead of individual expense lines.',
    tables: [
      {
        caption: 'Published Profit and Loss Account of [Name] plc for year ended 31/12/20XX',
        rows: [
          { label: 'Turnover', c2: 'XXX' },
          { label: 'Cost of Sales', c2: '(XXX)' },
          { label: 'Gross Profit', c2: 'XXX', cls: 'bs' },
          { label: 'Distribution Costs', c2: '(XXX)' },
          { label: 'Administration Expenses', c2: '(XXX)' },
          { label: 'Other Operating Income', c2: 'XXX' },
          { label: 'Operating Profit', c2: 'XXX', cls: 'bs' },
          { label: 'Exceptional Item (profit on sale of land)', c2: 'XXX' },
          { label: 'Income from financial investments', c2: 'XXX' },
          { label: 'Interest Payable', c2: '(XXX)' },
          { label: 'Profit Before Taxation', c2: 'XXX', cls: 'bs' },
          { label: 'Tax on Profit', c2: '(XXX)' },
          { label: 'Profit After Taxation', c2: 'XXX' },
          { label: 'Dividends Paid', c2: '(XXX)' },
          { label: 'Dividends Proposed', c2: '(XXX)' },
          { label: 'Retained Profit', c2: 'XXX' },
          { label: 'P&L balance b/f', c2: 'XXX' },
          { label: 'P&L balance c/f', c2: 'XXX', cls: 'bt' },
        ]
      },
      {
        caption: 'Published Balance Sheet of [Name] plc as at 31/12/20XX',
        rows: [
          { label: 'Fixed Assets', cls: 'h' },
          { label: 'Intangible Fixed Assets', c3: 'XXX', cls: 'i' },
          { label: 'Tangible Fixed Assets', c3: 'XXX', cls: 'i' },
          { label: 'Financial Assets', c3: 'XXX', cls: 'i' },
          { label: '', c3: 'XXX', cls: 's' },
          { label: 'Current Assets', cls: 'h' },
          { label: 'Closing stock', c1: 'XXX', cls: 'i' },
          { label: 'Debtors', c1: 'XXX', cls: 'i' },
          { label: 'Bank', c1: 'XXX', cls: 'i' },
          { label: '', c2: 'XXX' },
          { label: 'Creditors: amounts falling due within 1 year', cls: 'h' },
          { label: 'Trade creditors', c1: 'XXX', cls: 'i' },
          { label: 'Taxation due', c1: 'XXX', cls: 'i' },
          { label: 'Dividends proposed', c1: 'XXX', cls: 'i' },
          { label: 'Other creditors', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Net Current Assets', c3: 'XXX' },
          { label: 'Total Assets less Current Liabilities', c3: 'XXX', cls: 'bs' },
          { label: 'Financed by', cls: 'h' },
          { label: 'Creditors: amounts falling due after 1 year', cls: 'h' },
          { label: 'Debentures', c3: 'XXX', cls: 'i' },
          { label: 'Capital and Reserves', cls: 'h' },
          { label: 'Called up share capital', c2: 'XXX', cls: 'i' },
          { label: 'Revaluation reserve', c2: 'XXX', cls: 'i' },
          { label: 'Profit and loss balance', c2: 'XXX', c3: 'XXX', cls: 'i' },
          { label: 'Capital Employed', c3: 'XXX', cls: 'bt' },
        ]
      },
    ],
  },

  // ═══ 8. Cash Flow ═══
  {
    id: 'cashflow', badge: 'other', badgeText: 'Cash Flow', title: 'Cash Flow Statement (FRS 1)', tabLabel: 'Cash Flow',
    note: '<strong>Q4 format.</strong> Five prescribed sections. Start with Operating Profit, adjust for non-cash items, then work through the 5 sections.',
    tables: [{
      caption: 'Cash Flow Statement of [Name] plc for year ended 31/12/20XX',
      rows: [
        { label: '1. Operating Activities', cls: 'h' },
        { label: 'Operating profit', c2: 'XXX', cls: 'i' },
        { label: 'Add Depreciation', c1: 'XXX', cls: 'i' },
        { label: 'Add Loss on disposal', c1: 'XXX', cls: 'i' },
        { label: 'Add/Less change in Debtors', c1: 'XXX', cls: 'i' },
        { label: 'Add/Less change in Creditors', c1: 'XXX', cls: 'i' },
        { label: 'Add/Less change in Stock', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Net cash from operations', c2: 'XXX', cls: 'bs' },
        { label: '', cls: 'bl' },
        { label: '2. Returns on Investments & Servicing of Finance', cls: 'h' },
        { label: 'Interest paid', c1: '(XXX)', cls: 'i' },
        { label: 'Dividends paid', c1: '(XXX)', cls: 'i' },
        { label: 'Investment income received', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: '', cls: 'bl' },
        { label: '3. Taxation', cls: 'h' },
        { label: 'Corporation tax paid', c2: '(XXX)', cls: 'i' },
        { label: '', cls: 'bl' },
        { label: '4. Capital Expenditure', cls: 'h' },
        { label: 'Purchase of fixed assets', c1: '(XXX)', cls: 'i' },
        { label: 'Sale of fixed assets (proceeds)', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: '', cls: 'bl' },
        { label: '5. Financing', cls: 'h' },
        { label: 'Issue of shares', c1: 'XXX', cls: 'i' },
        { label: 'Issue/Repayment of debentures', c1: 'XXX', c2: 'XXX', cls: 'i' },
        { label: 'Increase / (Decrease) in cash', c2: 'XXX', cls: 'bt' },
      ]
    }],
    warn: '<strong>Working capital rules:</strong> Debtors UP = cash OUT (−). Creditors UP = cash IN (+). Stock UP = cash OUT (−). Tax paid = OPENING liability. Depreciation added back (non-cash).',
  },

  // ═══ 9. Club ═══
  {
    id: 'club', badge: 'other', badgeText: 'Club', title: 'Club Accounts (3 Statements)', tabLabel: 'Club',
    note: '<strong>Q6/Q7 format.</strong> Three statements: Accumulated Fund, Subscriptions T-Account, Income & Expenditure.',
    tables: [
      {
        caption: 'Accumulated Fund as at 01/01/20XX (Opening BS)',
        rows: [
          { label: 'Fixed Assets', c2: 'XXX' },
          { label: 'Current Assets:', cls: 'b' },
          { label: 'Stock of bar supplies', c1: 'XXX', cls: 'i' },
          { label: 'Subscriptions due', c1: 'XXX', cls: 'i' },
          { label: 'Bank', c1: 'XXX', c2: 'XXX', cls: 'i' },
          { label: 'Less Current Liabilities:', cls: 'b' },
          { label: 'Creditors', c1: 'XXX', cls: 'i' },
          { label: 'Subscriptions in advance', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Accumulated Fund', c2: 'XXX', cls: 'bt' },
        ]
      },
      {
        caption: 'Subscriptions Account',
        headerRow: ['Debit', '€', 'Credit', '€'],
        rows: [
          { label: 'Subs due 01/01', c1: 'XXX', c2: 'Subs in advance 01/01', c3: 'XXX' },
          { label: 'I&E A/C (balancing figure)', c1: 'XXX', c2: 'Bank (received)', c3: 'XXX' },
          { label: 'Subs in advance 31/12', c1: 'XXX', c2: 'Subs due 31/12', c3: 'XXX' },
          { label: '', c1: 'XXX', c2: '', c3: 'XXX', cls: 't' },
        ]
      },
      {
        caption: 'Income and Expenditure Account for year ended 31/12/20XX',
        rows: [
          { label: 'Income', cls: 'h' },
          { label: 'Subscriptions (from T-account)', c2: 'XXX', cls: 'i' },
          { label: 'Bar profit', c2: 'XXX', cls: 'i' },
          { label: 'Other income', c2: 'XXX', cls: 'i' },
          { label: 'Less Expenditure', cls: 'h' },
          { label: 'Depreciation', c1: 'XXX', cls: 'i' },
          { label: 'Insurance, repairs, etc.', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Surplus / (Deficit)', c2: 'XXX', cls: 'bt' },
        ]
      },
      {
        caption: 'Bar Trading Account',
        rows: [
          { label: 'Opening stock of bar supplies', c1: 'XXX', cls: 'i' },
          { label: 'Bar purchases (adjusted)', c1: 'XXX', cls: 'i' },
          { label: 'Less Closing stock of bar supplies', c1: '(XXX)', cls: 'i' },
          { label: 'Cost of bar sales', c2: '(XXX)', cls: 'bs' },
          { label: 'Bar sales', c2: 'XXX', cls: 'i' },
          { label: 'Bar Profit → I&E Account', c2: 'XXX', cls: 'bt' },
        ]
      },
    ],
    warn: '<strong>Subscriptions T-account:</strong> The I&E figure is the BALANCING FIGURE. Bank receipts go CREDIT side. Due/advance swap sides between opening and closing.',
  },

  // ═══ 10. Service ═══
  {
    id: 'service', badge: 'other', badgeText: 'Service', title: 'Service Firm', tabLabel: 'Service',
    note: '<strong>Q6/Q7 format.</strong> No Trading Account (no stock for resale). Four statements: Statement of Capital, I&E Account, Statement of Reserves, Balance Sheet.',
    tables: [
      {
        caption: 'Statement of Capital as at 01/01/20XX (Opening BS)',
        rows: [
          { label: 'Assets', cls: 'h' },
          { label: 'Surgery / Premises', c3: 'XXX', cls: 'i' },
          { label: 'Equipment', c3: 'XXX', cls: 'i' },
          { label: 'Furniture', c3: 'XXX', cls: 'i' },
          { label: 'Investments', c3: 'XXX', cls: 'i' },
          { label: 'Stock of supplies', c3: 'XXX', cls: 'i' },
          { label: 'Fees due', c3: 'XXX', cls: 'i' },
          { label: 'Insurance prepaid', c3: 'XXX', cls: 'i' },
          { label: 'Bank', c3: 'XXX', cls: 'i' },
          { label: 'Less Liabilities', cls: 'h' },
          { label: 'Creditors for supplies', c1: 'XXX', cls: 'i' },
          { label: 'Wages due', c1: 'XXX', cls: 'i' },
          { label: 'Loan', c1: 'XXX', cls: 'i' },
          { label: 'Loan interest due', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Opening Capital', c3: 'XXX', cls: 'bt' },
        ]
      },
      {
        caption: 'Income and Expenditure Account for year ended 31/12/20XX',
        rows: [
          { label: 'Income', cls: 'h' },
          { label: 'Fees — private patients', c1: 'XXX', cls: 'i' },
          { label: 'Fees — medical card scheme', c1: 'XXX', cls: 'i' },
          { label: 'Investment income', c1: 'XXX', c2: 'XXX', cls: 'i' },
          { label: 'Less Expenditure', cls: 'h' },
          { label: 'Supplies consumed (open+purch−close)', c1: 'XXX', cls: 'i' },
          { label: 'Wages & salaries (adjusted)', c1: 'XXX', cls: 'i' },
          { label: 'Light & heat (business % only)', c1: 'XXX', cls: 'i' },
          { label: 'Telephone (business % only)', c1: 'XXX', cls: 'i' },
          { label: 'Insurance', c1: 'XXX', cls: 'i' },
          { label: 'Depreciation — equipment', c1: 'XXX', cls: 'i' },
          { label: 'Depreciation — surgery', c1: 'XXX', cls: 'i' },
          { label: 'Loan interest', c1: 'XXX', cls: 'i' },
          { label: 'Cleaning', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Surplus / (Deficit)', c2: 'XXX', cls: 'bt' },
        ]
      },
      {
        caption: 'Statement of Reserves',
        rows: [
          { label: 'Opening Capital', c2: 'XXX' },
          { label: 'Add Surplus / Less Deficit', c2: 'XXX' },
          { label: 'Less Drawings', c2: '(XXX)' },
          { label: 'Closing Capital', c2: 'XXX', cls: 'bt' },
        ]
      },
    ],
    warn: '<strong>Key rules:</strong> (1) Supplies consumed = Opening stock + Purchases − Closing stock. (2) Private use (e.g. 30% light & heat) goes to Drawings, NOT expenses. (3) No Gross Profit line — all income and expenses go directly into I&E.',
  },

  // ═══ 11. Errors ═══
  {
    id: 'errors', badge: 'other', badgeText: 'Errors', title: 'Correction of Errors', tabLabel: 'Errors',
    note: '<strong>Q6/Q7 format.</strong> Four statements: Journal, Suspense Account, Corrected Net Profit, Corrected Balance Sheet. Use the <em>DID / SHOULD / FIX</em> method.',
    tables: [
      {
        caption: 'Journal Entries',
        headerRow: ['Details', 'Debit €', 'Credit €'],
        rows: [
          { label: 'Account to be debited', c1: 'XXX' },
          { label: 'Account to be credited', c2: 'XXX', cls: 'i' },
          { label: '(Being correction of error — description)', cls: 'i' },
        ]
      },
      {
        caption: 'Suspense Account',
        headerRow: ['Debit', '€', 'Credit', '€'],
        rows: [
          { label: 'Balance b/d', c1: 'XXX', c2: 'Error correction', c3: 'XXX' },
          { label: 'Error correction', c1: 'XXX', c2: 'Balance b/d', c3: 'XXX' },
          { label: '', c1: 'XXX', c2: '', c3: 'XXX', cls: 't' },
        ]
      },
      {
        caption: 'Corrected Net Profit',
        rows: [
          { label: 'Net profit per accounts', c2: 'XXX' },
          { label: 'Add: items that INCREASE profit' },
          { label: '(expense overstated, income understated)', c1: 'XXX', c2: 'XXX', cls: 'i' },
          { label: 'Less: items that DECREASE profit' },
          { label: '(expense understated, income overstated)', c1: 'XXX', c2: '(XXX)', cls: 'i' },
          { label: 'Corrected Net Profit', c2: 'XXX', cls: 'bt' },
        ]
      },
    ],
    warn: '<strong>DID / SHOULD / FIX:</strong> What WAS done, what SHOULD have been done, the CORRECTION (SHOULD minus DID). Only errors affecting P&L accounts change the corrected profit.',
  },

  // ═══ 12. MCS (kept from original) ═══
  {
    id: 'mcs', badge: 'other', badgeText: 'Costing', title: 'Marginal Costing Statement', tabLabel: 'MCS',
    note: '<strong>Q8 format.</strong> Separate variable and fixed costs. Contribution = Sales − Variable Costs. BEP = Fixed Costs ÷ Unit Contribution.',
    tables: [{
      caption: 'Marginal Costing Statement',
      headerRow: ['', 'Per Unit €', 'Total €'],
      rows: [
        { label: 'Sales', c1: 'X', c2: 'X' },
        { label: 'Less: Variable Costs' },
        { label: 'Materials', c1: '(X)', c2: '(X)', cls: 'i' },
        { label: 'Direct Labour', c1: '(X)', c2: '(X)', cls: 'i' },
        { label: 'Variable O/H', c1: '(X)', c2: '(X)', cls: 'i' },
        { label: 'Total Variable Costs', c1: '(X)', c2: '(X)', cls: 'bs' },
        { label: 'Contribution', c1: 'X', c2: 'X', cls: 'bs' },
        { label: 'Less: Fixed Costs', c2: '(X)' },
        { label: 'Profit/Loss', c2: 'X', cls: 'bt' },
      ]
    }],
    warn: 'Contribution = Sales − Variable Costs ONLY. BEP = Fixed Costs ÷ Unit Contribution. MoS = Actual Sales − BEP.',
  },

  // ═══ 13. Cash Budget ═══
  {
    id: 'cash-budget', badge: 'other', badgeText: 'Budget', title: 'Cash Budget (6 months)', tabLabel: 'Cash Budget',
    note: '<strong>Q9 format.</strong> Monthly receipts less payments. Opening balance of month 2 = closing balance of month 1.',
    tables: [{
      caption: 'Cash Budget for 6 months ending 30/06/20XX',
      headerRow: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      rows: [
        { label: 'Opening Balance', c1: 'X' },
        { label: 'Add: Receipts', cls: 'b' },
        { label: 'Cash Sales', c1: 'X', cls: 'i' },
        { label: 'Credit Receipts', c1: 'X', cls: 'i' },
        { label: 'Total Receipts', c1: 'X', cls: 'bs' },
        { label: 'Less: Payments', cls: 'b' },
        { label: 'Purchases', c1: '(X)', cls: 'i' },
        { label: 'Wages', c1: '(X)', cls: 'i' },
        { label: 'Overheads', c1: '(X)', cls: 'i' },
        { label: 'Total Payments', c1: '(X)', cls: 'bs' },
        { label: 'Closing Balance', c1: 'X', cls: 'bt' },
      ]
    }],
    warn: 'Depreciation is NEVER in a cash budget — it\'s a non-cash item. Opening balance of one month = Closing balance of previous month.',
  },

  // ═══ 14. Job Cost ═══
  {
    id: 'job-cost', badge: 'other', badgeText: 'Costing', title: 'Job Cost Sheet', tabLabel: 'Job Cost',
    note: '<strong>Q8 format.</strong> Calculates total cost and selling price for a specific job/contract.',
    tables: [{
      caption: 'Job Cost Sheet',
      rows: [
        { label: 'Direct Materials', c1: 'X' },
        { label: 'Direct Labour', c1: 'X' },
        { label: 'Prime Cost', c1: 'X', cls: 'bs' },
        { label: 'Production Overheads Absorbed', c1: 'X' },
        { label: 'Total Production Cost', c1: 'X', cls: 'bs' },
        { label: 'Admin & Selling O/H', c1: 'X' },
        { label: 'Total Cost', c1: 'X', cls: 'bs' },
        { label: 'Profit (X% mark-up)', c1: 'X' },
        { label: 'Selling Price', c1: 'X', cls: 'bt' },
      ]
    }],
    warn: 'Overheads = Hours worked × OAR per hour. Mark-up is on COST, Margin is on SALES.',
  },
];

// ═══ Classification Reference ═══
export const CLASSIFICATION_REF = [
  {
    title: 'Cost of Sales (Working A)',
    cls: 'cos',
    items: 'Opening stock\n+ Purchases\n+ Carriage inwards\n+ Patent amortisation (Published only)\n− Closing stock\n**Note:** In Manufacturing, replace Purchases with Cost of Goods Manufactured + Opening FG − Closing FG',
  },
  {
    title: 'Distribution Costs (Working B)',
    cls: 'dist',
    items: 'Distribution / Selling expenses (TB)\nDepreciation on delivery vans\nBad debts written off\nIncrease in provision for bad debts\nCommission earned by salespeople\nCarriage outwards\nAdvertising\nSalesforce salaries\nRent of showroom\nVan insurance\nBuilding depreciation (distribution %)\n**Note:** If "included in distribution costs is €X for commission earned" — SUBTRACT it (it\'s income, not a cost)',
  },
  {
    title: 'Administration Expenses (Working C)',
    cls: 'admin',
    items: 'Administration expenses (TB)\nDepreciation on buildings (admin %)\nDepreciation on equipment/furniture\nDirectors\' remuneration (fees)\nAuditors\' remuneration (fees)\nLegal fees\nGoodwill written off / amortised\nInsurance (admin portion)\nGeneral expenses\nProvision for damages / contingent liability\nRent & rates (admin portion)\nLight & heat (admin portion)\n**Note:** If split stated (e.g. "80% admin, 20% distribution"), apply to shared expenses',
  },
  {
    title: 'Other Operating Income (Working D)',
    cls: 'oi',
    items: 'Rental income\nProfit on sale of investments\nCommission received\nBad debts recovered\nDecrease in provision for bad debts\nGovernment grants (revenue)\nDiscount received\n**Note:** Profit on sale of LAND is shown separately as an Exceptional Item (below Operating Profit)',
  },
  {
    title: 'Current Assets',
    cls: 'ca',
    items: 'Closing stock (lower of cost and NRV)\nTrade debtors (less provision for bad debts)\nPrepaid expenses (insurance, rent, etc.)\nInvestment income due\nBank (if debit balance / positive)\nCash in hand\nVAT refundable (if debit balance)',
  },
  {
    title: 'Current Liabilities',
    cls: 'cl',
    items: 'Trade creditors\nBank overdraft\nVAT payable (if credit balance)\nPAYE / PRSI due\nExpenses accrued / due (rent, interest, wages)\nMortgage interest due\nDebenture interest due\nCorporation tax provision\nProposed dividends (if "proposed" stated)\nProvision for damages / legal claim\n**Note:** Dividends already PAID are not a current liability. Only PROPOSED dividends appear here.',
  },
];
