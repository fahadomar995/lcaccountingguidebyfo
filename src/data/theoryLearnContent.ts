export interface TheoryLearnTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  sections: TheoryLearnSection[];
}

export interface TheoryLearnSection {
  title: string;
  content: string; // HTML
}

export const THEORY_LEARN_TOPICS: TheoryLearnTopic[] = [
  // ═══════════════════════════════════════════════════
  // 1. DOUBLE-ENTRY BOOKKEEPING
  // ═══════════════════════════════════════════════════
  {
    id: "double-entry",
    title: "Double-Entry Bookkeeping",
    icon: "BookOpen",
    description: "The foundation of all accounting — every transaction has two sides.",
    sections: [
      {
        title: "The Basic Principle",
        content: `
          <div class="concept-box blue">
            <h4>Golden Rule of Double-Entry</h4>
            <p>Every financial transaction affects <strong>at least two accounts</strong>. For every <strong>debit</strong> entry, there must be a corresponding <strong>credit</strong> entry of equal value.</p>
          </div>
          <p>The accounting equation underpins everything:</p>
          <div class="concept-box green">
            <h4>Assets = Capital + Liabilities</h4>
            <p>This equation must <strong>always balance</strong>. Every transaction maintains this balance.</p>
          </div>
          <h4>Debit vs Credit Rules</h4>
          <table class="learn-table">
            <thead><tr><th>Account Type</th><th>Debit (Dr)</th><th>Credit (Cr)</th></tr></thead>
            <tbody>
              <tr><td>Assets</td><td>Increase ↑</td><td>Decrease ↓</td></tr>
              <tr><td>Liabilities</td><td>Decrease ↓</td><td>Increase ↑</td></tr>
              <tr><td>Capital</td><td>Decrease ↓</td><td>Increase ↑</td></tr>
              <tr><td>Expenses</td><td>Increase ↑</td><td>Decrease ↓</td></tr>
              <tr><td>Income/Revenue</td><td>Decrease ↓</td><td>Increase ↑</td></tr>
            </tbody>
          </table>
          <div class="concept-box amber">
            <h4>Memory Aid</h4>
            <p><strong>DEAD CLIC</strong> — Debits: Expenses, Assets, Drawings. Credits: Liabilities, Income, Capital.</p>
          </div>
        `
      },
      {
        title: "T-Accounts",
        content: `
          <p>A <strong>T-Account</strong> is the basic format for recording transactions. The left side is the <strong>Debit</strong> side, the right side is the <strong>Credit</strong> side.</p>
          <div class="learn-t">
            <div class="lt-title">Bank Account</div>
            <div class="lt-row">
              <div class="lt-left">
                <div class="lt-entry"><span class="lt-date">Jul 1</span><span class="lt-desc">Capital</span><span class="lt-amt">35,000</span></div>
                <div class="lt-entry"><span class="lt-date">Jul 25</span><span class="lt-desc">Sales</span><span class="lt-amt">4,000</span></div>
              </div>
              <div class="lt-right">
                <div class="lt-entry"><span class="lt-date">Jul 12</span><span class="lt-desc">Creditor</span><span class="lt-amt">10,500</span></div>
                <div class="lt-entry"><span class="lt-date">Jul 15</span><span class="lt-desc">Wages</span><span class="lt-amt">2,000</span></div>
                <div class="lt-entry"><span class="lt-date">Jul 21</span><span class="lt-desc">Advertising</span><span class="lt-amt">1,000</span></div>
                <div class="lt-entry"><span class="lt-date">Jul 28</span><span class="lt-desc">Machinery</span><span class="lt-amt">15,000</span></div>
                <div class="lt-entry"><span class="lt-date">Jul 31</span><span class="lt-desc">Balance c/d</span><span class="lt-amt">10,500</span></div>
              </div>
            </div>
            <div class="lt-totals">
              <span>39,000</span><span>39,000</span>
            </div>
            <div class="lt-row">
              <div class="lt-left">
                <div class="lt-entry"><span class="lt-date">Aug 1</span><span class="lt-desc">Balance b/d</span><span class="lt-amt">10,500</span></div>
              </div>
              <div class="lt-right"></div>
            </div>
          </div>
          <div class="concept-box green">
            <h4>Balancing Off</h4>
            <p>At the end of a period, each account is balanced by inserting a <strong>"Balance c/d"</strong> (carried down) on the smaller side, and a <strong>"Balance b/d"</strong> (brought down) on the opposite side to start the next period.</p>
          </div>
        `
      },
      {
        title: "The Trial Balance",
        content: `
          <p>A <strong>Trial Balance</strong> is a list of all ledger account balances at a specific date. It checks that total debits equal total credits.</p>
          <table class="learn-table">
            <thead><tr><th>Account</th><th>Debit €</th><th>Credit €</th></tr></thead>
            <tbody>
              <tr><td>Bank</td><td>10,500</td><td></td></tr>
              <tr><td>Capital</td><td></td><td>35,000</td></tr>
              <tr><td>Purchases</td><td>20,000</td><td></td></tr>
              <tr><td>Creditors</td><td></td><td>7,000</td></tr>
              <tr><td>Sales</td><td></td><td>21,500</td></tr>
              <tr><td>Debtors</td><td>14,500</td><td></td></tr>
              <tr><td>Wages</td><td>2,000</td><td></td></tr>
              <tr><td>Machinery</td><td>15,000</td><td></td></tr>
              <tr class="total-row"><td><strong>Totals</strong></td><td><strong>66,000</strong></td><td><strong>66,000</strong></td></tr>
            </tbody>
          </table>
          <div class="concept-box amber">
            <h4>⚠️ Limitations</h4>
            <p>A Trial Balance that balances does NOT prove that no errors have been made. Errors of <strong>omission</strong>, <strong>commission</strong>, <strong>principle</strong>, <strong>original entry</strong>, <strong>compensating errors</strong>, and <strong>complete reversal</strong> will NOT be detected.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Which side of the Trial Balance does a Creditors balance appear on?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Debit</div>
              <div class="quiz-opt" data-correct="true">Credit</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 2. PROFIT MEASUREMENT & BALANCE SHEET
  // ═══════════════════════════════════════════════════
  {
    id: "profit-bs",
    title: "Profit & Balance Sheet",
    icon: "BarChart3",
    description: "Trading Account, P&L, and Balance Sheet preparation from a Trial Balance.",
    sections: [
      {
        title: "Revenue vs Capital Expenditure",
        content: `
          <div class="concept-box blue">
            <h4>Revenue Expenditure</h4>
            <p>Day-to-day running costs of the business. Recorded in the <strong>Profit and Loss Account</strong>. Examples: wages, rent, insurance, advertising, repairs.</p>
          </div>
          <div class="concept-box green">
            <h4>Capital Expenditure</h4>
            <p>Money spent on acquiring or improving <strong>fixed assets</strong>. Recorded in the <strong>Balance Sheet</strong>. Examples: purchase of premises, machinery, delivery vans, extensions to buildings.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">A business pays €5,000 to extend its premises. Is this revenue or capital expenditure?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Revenue</div>
              <div class="quiz-opt" data-correct="true">Capital</div>
            </div>
          </div>
        `
      },
      {
        title: "The Trading Account",
        content: `
          <p>The Trading Account calculates <strong>Gross Profit</strong> by matching sales revenue against the cost of goods sold.</p>
          <div class="concept-box green">
            <h4>Formula</h4>
            <p><strong>Gross Profit = Sales − Cost of Sales</strong></p>
            <p>Cost of Sales = Opening Stock + Purchases − Closing Stock</p>
          </div>
          <div class="statement-box">
            <div class="sb-title">Trading Account for year ended 31/12</div>
            <div class="sb-row"><span>Sales</span><span></span><span>89,000</span></div>
            <div class="sb-row indent"><span>Less Cost of Sales</span><span></span><span></span></div>
            <div class="sb-row indent"><span>Opening Stock</span><span>4,000</span><span></span></div>
            <div class="sb-row indent"><span>+ Purchases</span><span>42,000</span><span></span></div>
            <div class="sb-row indent"><span>− Purchases Returns</span><span>(700)</span><span></span></div>
            <div class="sb-row indent"><span></span><span>45,300</span><span></span></div>
            <div class="sb-row indent"><span>− Closing Stock</span><span>(5,000)</span><span></span></div>
            <div class="sb-row indent"><span></span><span></span><span>(40,300)</span></div>
            <div class="sb-row total"><span><strong>Gross Profit</strong></span><span></span><span><strong>48,700</strong></span></div>
          </div>
          <div class="concept-box amber">
            <h4>Items in Cost of Sales</h4>
            <p><strong>Carriage inwards</strong> and <strong>customs duties</strong> are added to purchases (they are part of the cost of getting goods to the business). <strong>Carriage outwards</strong> is an expense in the P&L Account (cost of delivering goods to customers).</p>
          </div>
        `
      },
      {
        title: "P&L Account & Balance Sheet",
        content: `
          <p>The <strong>Profit and Loss Account</strong> takes gross profit, adds other income, and deducts expenses to arrive at <strong>Net Profit</strong>.</p>
          <div class="statement-box">
            <div class="sb-title">Profit and Loss Account (extract)</div>
            <div class="sb-row"><span>Gross Profit</span><span></span><span>48,700</span></div>
            <div class="sb-row"><span>+ Discount Received</span><span></span><span>400</span></div>
            <div class="sb-row"><span></span><span></span><span>49,100</span></div>
            <div class="sb-row"><span>− Expenses (wages, insurance, etc.)</span><span></span><span>(14,800)</span></div>
            <div class="sb-row total"><span><strong>Net Profit</strong></span><span></span><span><strong>34,300</strong></span></div>
          </div>
          <p>The <strong>Balance Sheet</strong> shows the financial position at a point in time:</p>
          <div class="concept-box blue">
            <h4>Balance Sheet Structure</h4>
            <p><strong>Fixed Assets</strong> (premises, equipment, vehicles)<br/>
            + <strong>Current Assets</strong> (stock, debtors, bank, cash)<br/>
            − <strong>Current Liabilities</strong> (creditors, bank overdraft)<br/>
            = <strong>Net Assets</strong><br/><br/>
            Financed by: Capital + Net Profit − Drawings</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Where does "Discount Allowed" appear?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Trading Account</div>
              <div class="quiz-opt" data-correct="true">Profit and Loss Account (as an expense)</div>
              <div class="quiz-opt" data-correct="false">Balance Sheet</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 3. VAT & STATUTORY DEDUCTIONS
  // ═══════════════════════════════════════════════════
  {
    id: "vat",
    title: "VAT & Statutory Deductions",
    icon: "Landmark",
    description: "Value Added Tax calculations, PAYE, PRSI, and USC deductions.",
    sections: [
      {
        title: "How VAT Works",
        content: `
          <div class="concept-box blue">
            <h4>Value Added Tax (VAT)</h4>
            <p>VAT is a tax on the <strong>value added</strong> at each stage of production/sale. Businesses collect VAT on sales (<strong>output VAT</strong>) and pay VAT on purchases (<strong>input VAT</strong>). The difference is paid to/reclaimed from Revenue.</p>
          </div>
          <h4>VAT Calculation</h4>
          <table class="learn-table">
            <thead><tr><th>Item</th><th>Net €</th><th>VAT @10%</th><th>Gross €</th></tr></thead>
            <tbody>
              <tr><td>Sales</td><td>25,000</td><td>2,500</td><td>27,500</td></tr>
              <tr><td>Purchases</td><td>15,000</td><td>1,500</td><td>16,500</td></tr>
            </tbody>
          </table>
          <div class="concept-box green">
            <h4>VAT Payable to Revenue</h4>
            <p>Output VAT (on sales): €2,500<br/>
            Less Input VAT (on purchases): €1,500<br/>
            <strong>Amount due to Revenue: €1,000</strong></p>
          </div>
          <div class="concept-box amber">
            <h4>Key Points</h4>
            <p>• VAT is NOT an expense or income to the business — it's collected on behalf of the government<br/>
            • The VAT account appears as a <strong>current liability</strong> (credit balance) or <strong>current asset</strong> (debit balance) on the Balance Sheet<br/>
            • Purchases and Sales are recorded at their <strong>net</strong> (VAT-exclusive) amounts</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">If a business has output VAT of €3,000 and input VAT of €4,500, what happens?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">The business pays €1,500 to Revenue</div>
              <div class="quiz-opt" data-correct="true">Revenue owes the business €1,500 (VAT refund)</div>
            </div>
          </div>
        `
      },
      {
        title: "Statutory Deductions",
        content: `
          <p>Employers must deduct certain amounts from employee wages before payment:</p>
          <div class="concept-box blue">
            <h4>PAYE (Pay As You Earn)</h4>
            <p>Income tax deducted at source by the employer and paid to Revenue. The amount depends on the employee's tax credits and rate band.</p>
          </div>
          <div class="concept-box green">
            <h4>PRSI (Pay Related Social Insurance)</h4>
            <p>Both the <strong>employee</strong> and <strong>employer</strong> pay PRSI. Employee PRSI is deducted from wages. Employer PRSI is an additional cost to the employer (recorded as an expense).</p>
          </div>
          <div class="concept-box amber">
            <h4>USC (Universal Social Charge)</h4>
            <p>A tax on gross income, deducted at source. Different rates apply to different income bands.</p>
          </div>
          <h4>Wages Calculation Example</h4>
          <table class="learn-table">
            <thead><tr><th>Item</th><th>€</th></tr></thead>
            <tbody>
              <tr><td>Gross Wages</td><td>2,000</td></tr>
              <tr><td>Less PAYE</td><td>(300)</td></tr>
              <tr><td>Less PRSI (Employee)</td><td>(80)</td></tr>
              <tr><td>Less USC</td><td>(40)</td></tr>
              <tr class="total-row"><td><strong>Net Wages (paid to employee)</strong></td><td><strong>1,580</strong></td></tr>
            </tbody>
          </table>
          <div class="concept-box red">
            <h4>Employer's Total Cost</h4>
            <p>Gross Wages €2,000 + Employer's PRSI €215 = <strong>€2,215</strong><br/>
            The employer's PRSI is an additional expense, NOT deducted from the employee's pay.</p>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 4. ACCRUALS, PREPAYMENTS & BAD DEBTS
  // ═══════════════════════════════════════════════════
  {
    id: "accruals",
    title: "Accruals & Bad Debts",
    icon: "CalendarDays",
    description: "Accruals, prepayments, bad debts, provisions for bad debts, and provisions for discount.",
    sections: [
      {
        title: "Accruals & Prepayments",
        content: `
          <div class="concept-box blue">
            <h4>Accruals (Amounts Due)</h4>
            <p>An expense that has been <strong>incurred but not yet paid</strong> at the year end. It must be added to the expense in the P&L and shown as a <strong>current liability</strong> in the Balance Sheet.</p>
            <p>Example: Rent due for December but not paid until January.</p>
          </div>
          <div class="concept-box green">
            <h4>Prepayments (Amounts Paid in Advance)</h4>
            <p>An expense that has been <strong>paid but not yet incurred</strong> — it relates to the next accounting period. It must be deducted from the expense in the P&L and shown as a <strong>current asset</strong> in the Balance Sheet.</p>
            <p>Example: Insurance paid for 12 months in April covers 3 months of the next year.</p>
          </div>
          <h4>Worked Example — Car Tax</h4>
          <div class="learn-t">
            <div class="lt-title">Car Tax Account</div>
            <div class="lt-row">
              <div class="lt-left">
                <div class="lt-entry"><span class="lt-date">1/1</span><span class="lt-desc">Balance b/d</span><span class="lt-amt">72</span></div>
                <div class="lt-entry"><span class="lt-date">1/4</span><span class="lt-desc">Bank</span><span class="lt-amt">168</span></div>
                <div class="lt-entry"><span class="lt-date">1/10</span><span class="lt-desc">Bank</span><span class="lt-amt">168</span></div>
              </div>
              <div class="lt-right">
                <div class="lt-entry"><span class="lt-date">31/12</span><span class="lt-desc">P&L Account</span><span class="lt-amt">324</span></div>
                <div class="lt-entry"><span class="lt-date">31/12</span><span class="lt-desc">Balance c/d <em>(3 months prepaid)</em></span><span class="lt-amt">84</span></div>
              </div>
            </div>
            <div class="lt-totals"><span>408</span><span>408</span></div>
          </div>
          <p>The car tax paid on 1/10 covers Oct–Mar (6 months). Only 3 months (Oct–Dec) belong to this year. The other 3 months (€84) are <strong>prepaid</strong>.</p>
        `
      },
      {
        title: "Bad Debts & Provisions",
        content: `
          <div class="concept-box red">
            <h4>Bad Debts</h4>
            <p>A debt that is definitely <strong>not recoverable</strong>. It is written off as an <strong>expense</strong> in the P&L Account. The debtor's balance is reduced.</p>
          </div>
          <div class="concept-box amber">
            <h4>Provision for Bad Debts</h4>
            <p>An estimated amount set aside for debts that <strong>may</strong> become bad in the future. Usually calculated as a <strong>percentage of debtors</strong> (after writing off actual bad debts).</p>
            <p><strong>Only the increase or decrease</strong> in the provision affects the P&L:</p>
            <p>• Increase → expense in P&L<br/>• Decrease → income in P&L</p>
          </div>
          <h4>Worked Example</h4>
          <table class="learn-table">
            <thead><tr><th>Item</th><th>€</th></tr></thead>
            <tbody>
              <tr><td>Debtors per Trial Balance</td><td>26,000</td></tr>
              <tr><td>Less Bad Debts written off</td><td>(900)</td></tr>
              <tr><td>Adjusted Debtors</td><td>25,100</td></tr>
              <tr><td>New Provision @ 5%</td><td>1,255</td></tr>
              <tr><td>Old Provision</td><td>800</td></tr>
              <tr class="total-row"><td><strong>Increase in Provision (expense)</strong></td><td><strong>455</strong></td></tr>
            </tbody>
          </table>
          <div class="concept-box blue">
            <h4>Balance Sheet Presentation</h4>
            <p>Debtors: €25,100<br/>
            Less Provision for Bad Debts: (€1,255)<br/>
            <strong>Net Debtors: €23,845</strong></p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">If the provision for bad debts decreases from €1,200 to €900, what happens in the P&L?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">€300 is shown as an expense</div>
              <div class="quiz-opt" data-correct="true">€300 is shown as income (reduction in provision)</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 5. DEPRECIATION & REVALUATION
  // ═══════════════════════════════════════════════════
  {
    id: "depreciation",
    title: "Depreciation & Disposal",
    icon: "TrendingDown",
    description: "Straight-line, reducing balance depreciation methods, and disposal of fixed assets.",
    sections: [
      {
        title: "Depreciation Methods",
        content: `
          <div class="concept-box blue">
            <h4>Why Depreciate?</h4>
            <p>Fixed assets lose value over time due to <strong>wear and tear</strong>, <strong>passage of time</strong>, and <strong>obsolescence</strong>. Depreciation spreads the cost of an asset over its useful life (the <strong>matching/accruals concept</strong>).</p>
          </div>
          <h4>Straight-Line Method</h4>
          <div class="concept-box green">
            <p><strong>Annual Depreciation = (Cost − Residual Value) ÷ Useful Life</strong></p>
            <p>Or simply: <strong>Cost × Rate%</strong></p>
            <p>The same amount is charged each year. Simple to calculate.</p>
          </div>
          <h4>Reducing Balance Method</h4>
          <div class="concept-box amber">
            <p><strong>Annual Depreciation = Net Book Value × Rate%</strong></p>
            <p>Net Book Value = Cost − Accumulated Depreciation to date</p>
            <p>The charge reduces each year as the NBV falls. More realistic for assets that lose value quickly early on (e.g. vehicles).</p>
          </div>
          <h4>Example: Reducing Balance @ 20%</h4>
          <table class="learn-table">
            <thead><tr><th>Year</th><th>NBV Start</th><th>Depreciation</th><th>NBV End</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>40,000</td><td>8,000</td><td>32,000</td></tr>
              <tr><td>2</td><td>32,000</td><td>6,400</td><td>25,600</td></tr>
              <tr><td>3</td><td>25,600</td><td>5,120</td><td>20,480</td></tr>
            </tbody>
          </table>
          <div class="quiz-wrap">
            <p class="quiz-q">A machine costs €50,000. Using straight-line depreciation at 10%, what is the annual charge?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="true">€5,000</div>
              <div class="quiz-opt" data-correct="false">€4,500</div>
              <div class="quiz-opt" data-correct="false">€10,000</div>
            </div>
          </div>
        `
      },
      {
        title: "Disposal of Fixed Assets",
        content: `
          <p>When a fixed asset is sold, we need to calculate if there is a <strong>profit or loss on disposal</strong>.</p>
          <div class="concept-box green">
            <h4>Steps</h4>
            <p>1. Remove the asset from the <strong>Asset Account</strong> (credit)<br/>
            2. Remove accumulated depreciation from the <strong>Provision for Depreciation Account</strong> (debit)<br/>
            3. Record the sale proceeds in the <strong>Disposal Account</strong> (credit)<br/>
            4. Calculate profit/loss: <strong>Proceeds − Net Book Value</strong></p>
          </div>
          <h4>Worked Example</h4>
          <p>Bus cost €20,000, accumulated depreciation €12,500, sold for €7,000:</p>
          <div class="learn-t">
            <div class="lt-title">Bus Disposal Account</div>
            <div class="lt-row">
              <div class="lt-left">
                <div class="lt-entry"><span class="lt-date">1/1</span><span class="lt-desc">Bus (cost)</span><span class="lt-amt">20,000</span></div>
              </div>
              <div class="lt-right">
                <div class="lt-entry"><span class="lt-date">1/1</span><span class="lt-desc">Depreciation</span><span class="lt-amt">12,500</span></div>
                <div class="lt-entry"><span class="lt-date">1/1</span><span class="lt-desc">Bank (proceeds)</span><span class="lt-amt">7,000</span></div>
                <div class="lt-entry"><span class="lt-date">31/12</span><span class="lt-desc">Loss on disposal</span><span class="lt-amt">500</span></div>
              </div>
            </div>
            <div class="lt-totals"><span>20,000</span><span>20,000</span></div>
          </div>
          <p>NBV = €20,000 − €12,500 = €7,500. Sold for €7,000. <strong>Loss = €500</strong>.</p>
          <div class="concept-box amber">
            <h4>Part-Year Depreciation</h4>
            <p>If an asset is bought or sold <strong>during the year</strong>, depreciation is calculated proportionally. E.g. asset bought 1/4 = 9/12 of a full year's depreciation.</p>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 6. CORRECTION OF ERRORS & SUSPENSE
  // ═══════════════════════════════════════════════════
  {
    id: "errors",
    title: "Errors & Suspense Account",
    icon: "Search",
    description: "Types of errors, journal entries for correction, and the suspense account.",
    sections: [
      {
        title: "Types of Errors",
        content: `
          <p>Errors in accounting fall into two categories: those that <strong>affect</strong> the Trial Balance and those that <strong>don't</strong>.</p>
          <div class="concept-box red">
            <h4>Errors That DON'T Affect the Trial Balance</h4>
            <p>The Trial Balance still balances even though an error exists:</p>
            <table class="learn-table">
              <tbody>
                <tr><td><strong>Error of Omission</strong></td><td>A transaction is completely left out of the books</td></tr>
                <tr><td><strong>Error of Commission</strong></td><td>Correct amount, correct type of account, but wrong person/account (e.g. wrong debtor)</td></tr>
                <tr><td><strong>Error of Principle</strong></td><td>Entry in the wrong class of account (e.g. expense recorded as an asset)</td></tr>
                <tr><td><strong>Error of Original Entry</strong></td><td>Wrong amount used for both debit and credit</td></tr>
                <tr><td><strong>Compensating Error</strong></td><td>Two errors of equal amount cancel each other out</td></tr>
                <tr><td><strong>Complete Reversal</strong></td><td>Correct accounts, correct amount, but debit and credit are swapped</td></tr>
              </tbody>
            </table>
          </div>
          <div class="concept-box blue">
            <h4>Errors That DO Affect the Trial Balance</h4>
            <p>These cause the Trial Balance to be out of balance. A <strong>Suspense Account</strong> is used to record the difference until the errors are found and corrected.</p>
            <p>Examples: posting only one side of an entry, incorrect addition, posting different amounts to debit and credit.</p>
          </div>
        `
      },
      {
        title: "Journal Entries & Suspense Account",
        content: `
          <p>Errors are corrected using <strong>journal entries</strong>. If an error affected the Trial Balance, the Suspense Account is involved.</p>
          <div class="concept-box green">
            <h4>Correction Steps</h4>
            <p>1. Identify what was done <strong>wrong</strong><br/>
            2. Determine what <strong>should</strong> have been done<br/>
            3. Write the journal entry to <strong>correct</strong> it<br/>
            4. If the TB was affected, involve the <strong>Suspense Account</strong></p>
          </div>
          <h4>Example</h4>
          <p>Repairs of €800 were debited to the Premises Account instead of the Repairs Account, and were posted on the credit side instead of the debit side. The original entry was: Cr Premises €800, Cr Bank €800.</p>
          <div class="concept-box amber">
            <h4>Journal Entry</h4>
            <table class="learn-table">
              <thead><tr><th>Details</th><th>Debit €</th><th>Credit €</th></tr></thead>
              <tbody>
                <tr><td>Repairs</td><td>800</td><td></td></tr>
                <tr><td>Drawings</td><td>630</td><td></td></tr>
                <tr><td>Premises</td><td>1,430</td><td></td></tr>
                <tr><td>&nbsp;&nbsp;&nbsp;Suspense</td><td></td><td>2,860</td></tr>
              </tbody>
            </table>
          </div>
          <h4>After Corrections</h4>
          <p>A <strong>Statement of Revised Profit</strong> adjusts the original net profit for any corrections that affect the P&L Account (expenses or income items).</p>
          <p>A <strong>Corrected Balance Sheet</strong> is then prepared with all corrections applied.</p>
          <div class="quiz-wrap">
            <p class="quiz-q">An error of principle is when...</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">A transaction is completely left out</div>
              <div class="quiz-opt" data-correct="true">An entry is made in the wrong class of account</div>
              <div class="quiz-opt" data-correct="false">The wrong person's account is used</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 7. CONCEPTUAL FRAMEWORK
  // ═══════════════════════════════════════════════════
  {
    id: "concepts",
    title: "Conceptual Framework",
    icon: "Ruler",
    description: "Accounting concepts, bases, policies, and the principles that underpin financial reporting.",
    sections: [
      {
        title: "Accounting Concepts",
        content: `
          <p>Accounting concepts are the <strong>fundamental rules and assumptions</strong> that underpin the preparation of financial statements.</p>
          <div class="concept-box blue">
            <h4>Going Concern</h4>
            <p>The business will continue to operate for the <strong>foreseeable future</strong>. Assets are valued at cost, not at what they would fetch if the business were to close.</p>
          </div>
          <div class="concept-box green">
            <h4>Accruals (Matching)</h4>
            <p>Revenue and expenses are recorded in the period to which they <strong>relate</strong>, not when cash is received or paid. This is why we have accruals and prepayments.</p>
          </div>
          <div class="concept-box amber">
            <h4>Prudence (Conservatism)</h4>
            <p>Do not anticipate profits, but <strong>provide for all known losses</strong>. This is why we create provisions for bad debts. Revenues should not be overstated and expenses should not be understated.</p>
          </div>
          <div class="concept-box red">
            <h4>Consistency</h4>
            <p>The same accounting methods should be used from <strong>year to year</strong>. This allows valid comparisons between periods. E.g. if reducing balance depreciation is used, it should continue to be used.</p>
          </div>
        `
      },
      {
        title: "Other Concepts & Principles",
        content: `
          <div class="concept-box blue">
            <h4>Entity Concept</h4>
            <p>The business is a <strong>separate entity</strong> from its owner. The owner's personal transactions are not recorded in the business books (except drawings).</p>
          </div>
          <div class="concept-box green">
            <h4>Money Measurement</h4>
            <p>Only items that can be expressed in <strong>monetary terms</strong> are recorded. Factors like staff morale, management quality, or market reputation cannot be shown.</p>
          </div>
          <div class="concept-box amber">
            <h4>Realisation Principle</h4>
            <p>Revenue is only recognised when it is <strong>realised</strong> (earned), not when cash is received. A rise in the value of an asset is not recorded as profit until the asset is actually sold.</p>
          </div>
          <div class="concept-box blue">
            <h4>Materiality</h4>
            <p>An item is material if its omission or misstatement would <strong>influence the decisions</strong> of users of the accounts. Immaterial items can be treated in the simplest way possible.</p>
          </div>
          <h4>Concepts vs Bases vs Policies</h4>
          <table class="learn-table">
            <thead><tr><th>Term</th><th>Definition</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Concept</strong></td><td>Fundamental assumption</td><td>Going Concern</td></tr>
              <tr><td><strong>Base</strong></td><td>Method of applying a concept</td><td>Historical Cost</td></tr>
              <tr><td><strong>Policy</strong></td><td>Specific rule adopted by a firm</td><td>Fixed assets valued at cost</td></tr>
            </tbody>
          </table>
          <div class="quiz-wrap">
            <p class="quiz-q">Which concept explains why we maintain a provision for bad debts?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Going Concern</div>
              <div class="quiz-opt" data-correct="true">Prudence</div>
              <div class="quiz-opt" data-correct="false">Consistency</div>
              <div class="quiz-opt" data-correct="false">Entity</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 8. LIMITED COMPANIES
  // ═══════════════════════════════════════════════════
  {
    id: "companies",
    title: "Limited Companies",
    icon: "Building2",
    description: "Share capital, reserves, dividends, debentures, and company final accounts.",
    sections: [
      {
        title: "Share Capital & Reserves",
        content: `
          <div class="concept-box blue">
            <h4>Types of Share Capital</h4>
            <p><strong>Authorised Capital:</strong> Maximum shares the company is allowed to issue.<br/>
            <strong>Issued Capital:</strong> Shares actually issued to shareholders.<br/>
            <strong>Paid-Up Capital:</strong> Amount actually received from shareholders.</p>
          </div>
          <div class="concept-box green">
            <h4>Ordinary vs Preference Shares</h4>
            <p><strong>Ordinary Shares:</strong> Carry voting rights. Dividends vary and are not guaranteed. Higher risk, higher potential return.<br/><br/>
            <strong>Preference Shares:</strong> Fixed rate of dividend (e.g. 8%). Paid before ordinary dividends. No voting rights. Lower risk.</p>
          </div>
          <h4>Reserves</h4>
          <table class="learn-table">
            <thead><tr><th>Reserve</th><th>Type</th><th>Source</th></tr></thead>
            <tbody>
              <tr><td>Share Premium</td><td>Capital</td><td>Shares issued above par value</td></tr>
              <tr><td>General Reserve</td><td>Revenue</td><td>Transferred from P&L — retained profits</td></tr>
              <tr><td>P&L Balance</td><td>Revenue</td><td>Undistributed profits carried forward</td></tr>
              <tr><td>Revaluation Reserve</td><td>Capital</td><td>Increase in asset values</td></tr>
            </tbody>
          </table>
          <div class="concept-box amber">
            <h4>Debentures</h4>
            <p>Long-term loans to the company. Debenture holders are <strong>creditors</strong>, not owners. They receive <strong>interest</strong> (not dividends), which is an expense in the P&L. Interest is paid regardless of profit.</p>
          </div>
        `
      },
      {
        title: "Company P&L & Appropriation",
        content: `
          <div class="statement-box">
            <div class="sb-title">Profit and Loss Appropriation Account</div>
            <div class="sb-row"><span>Net Profit before Taxation</span><span></span><span>120,000</span></div>
            <div class="sb-row"><span>Less Taxation</span><span></span><span>(23,000)</span></div>
            <div class="sb-row"><span>Profit after Taxation</span><span></span><span>97,000</span></div>
            <div class="sb-row"><span>Less Transfer to General Reserve</span><span></span><span>(25,000)</span></div>
            <div class="sb-row"><span></span><span></span><span>72,000</span></div>
            <div class="sb-row"><span>Less Ordinary Dividends (Proposed)</span><span></span><span>(17,500)</span></div>
            <div class="sb-row"><span>Less Preference Dividends</span><span></span><span></span></div>
            <div class="sb-row indent"><span>Paid: 3,000 + Proposed: 3,000</span><span></span><span>(6,000)</span></div>
            <div class="sb-row"><span>Retained Profits for year</span><span></span><span>48,500</span></div>
            <div class="sb-row"><span>+ P&L Balance from last year</span><span></span><span>20,000</span></div>
            <div class="sb-row total"><span><strong>P&L Balance to next year</strong></span><span></span><span><strong>68,500</strong></span></div>
          </div>
          <div class="concept-box green">
            <h4>Balance Sheet — Financed By</h4>
            <p>Share Capital (Authorised / Issued / Paid-Up)<br/>
            + Reserves (Share Premium, General Reserve, P&L Balance)<br/>
            = <strong>Shareholders' Funds</strong><br/>
            + Long-Term Liabilities (Debentures)</p>
          </div>
          <div class="concept-box amber">
            <h4>Current Liabilities Include</h4>
            <p>• Proposed Dividends (ordinary + preference)<br/>
            • Taxation Due<br/>
            • Debenture Interest Due<br/>
            • Creditors, Bank Overdraft</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Preference dividends of 8% on 75,000 €1 shares = ?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="true">€6,000</div>
              <div class="quiz-opt" data-correct="false">€8,000</div>
              <div class="quiz-opt" data-correct="false">€7,500</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 9. PUBLISHED ACCOUNTS
  // ═══════════════════════════════════════════════════
  {
    id: "published",
    title: "Published Accounts (HL)",
    icon: "FileSpreadsheet",
    description: "Income Statement, Statement of Financial Position, and FRS 102 presentation for Higher Level.",
    sections: [
      {
        title: "Published Income Statement",
        content: `
          <div class="concept-box blue">
            <h4>Key Differences from Internal Accounts</h4>
            <p>Published accounts follow <strong>FRS 102</strong> format. Expenses are grouped into <strong>Distribution</strong>, <strong>Administration</strong>, and <strong>Financial</strong> categories rather than listed individually.</p>
          </div>
          <div class="statement-box">
            <div class="sb-title">Published Income Statement (extract)</div>
            <div class="sb-row"><span>Revenue (Turnover)</span><span></span><span>1,020,000</span></div>
            <div class="sb-row"><span>Cost of Sales</span><span></span><span>(718,200)</span></div>
            <div class="sb-row total"><span><strong>Gross Profit</strong></span><span></span><span><strong>301,800</strong></span></div>
            <div class="sb-row"><span>Distribution Costs</span><span></span><span>(17,000)</span></div>
            <div class="sb-row"><span>Administrative Expenses</span><span></span><span>(110,800)</span></div>
            <div class="sb-row"><span>Financial Costs</span><span></span><span>(8,400)</span></div>
            <div class="sb-row total"><span><strong>Profit before Tax</strong></span><span></span><span><strong>178,475</strong></span></div>
          </div>
          <h4>Expense Classification</h4>
          <table class="learn-table">
            <thead><tr><th>Category</th><th>Includes</th></tr></thead>
            <tbody>
              <tr><td><strong>Distribution</strong></td><td>Selling expenses, delivery van depreciation, advertising, carriage outwards</td></tr>
              <tr><td><strong>Administration</strong></td><td>Salaries, directors' fees, building depreciation, bad debts, provisions, rent, audit fees</td></tr>
              <tr><td><strong>Financial</strong></td><td>Debenture interest, bank interest, loan interest</td></tr>
            </tbody>
          </table>
        `
      },
      {
        title: "Statement of Financial Position",
        content: `
          <p>The published Balance Sheet uses <strong>modern terminology</strong>:</p>
          <table class="learn-table">
            <thead><tr><th>Traditional Term</th><th>Published Term</th></tr></thead>
            <tbody>
              <tr><td>Fixed Assets</td><td>Non-Current Assets</td></tr>
              <tr><td>Stock</td><td>Inventories</td></tr>
              <tr><td>Debtors</td><td>Trade Receivables</td></tr>
              <tr><td>Creditors</td><td>Trade Payables</td></tr>
              <tr><td>Long-Term Liabilities</td><td>Non-Current Liabilities</td></tr>
              <tr><td>Net Profit</td><td>Profit for the Financial Year</td></tr>
            </tbody>
          </table>
          <div class="concept-box green">
            <h4>Fixed Assets Presentation</h4>
            <p>Non-Current Assets are shown in three columns:<br/>
            <strong>Cost | Accumulated Depreciation | Net Book Value</strong></p>
          </div>
          <div class="concept-box amber">
            <h4>Intangible Assets</h4>
            <p><strong>Goodwill</strong> and <strong>Patents</strong> are intangible assets. Goodwill is written off over time. Patents have a limited life.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">In published accounts, "Trade Receivables" is the modern term for?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Creditors</div>
              <div class="quiz-opt" data-correct="true">Debtors</div>
              <div class="quiz-opt" data-correct="false">Stock</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 10. CASH FLOW STATEMENTS
  // ═══════════════════════════════════════════════════
  {
    id: "cashflow",
    title: "Cash Flow Statements",
    icon: "Banknote",
    description: "Preparing a Cash Flow Statement and understanding operating, investing, and financing activities.",
    sections: [
      {
        title: "Structure & Purpose",
        content: `
          <div class="concept-box blue">
            <h4>Why Cash Flow?</h4>
            <p>A profitable business can still <strong>run out of cash</strong>. The Cash Flow Statement shows where cash came from and where it went. It reconciles the change in cash between two Balance Sheet dates.</p>
          </div>
          <h4>Three Sections</h4>
          <div class="concept-box green">
            <h4>1. Operating Activities</h4>
            <p>Cash generated from the business's <strong>core trading operations</strong>. Starts with net profit and adjusts for non-cash items (depreciation, provisions) and working capital changes.</p>
          </div>
          <div class="concept-box amber">
            <h4>2. Investing Activities</h4>
            <p>Cash spent on or received from <strong>fixed assets and investments</strong>. Purchase of assets = cash outflow. Sale of assets = cash inflow.</p>
          </div>
          <div class="concept-box red">
            <h4>3. Financing Activities</h4>
            <p>Cash from <strong>shares, loans, debentures, dividends</strong>. Issue of shares = inflow. Repayment of loans = outflow. Dividends paid = outflow.</p>
          </div>
        `
      },
      {
        title: "Operating Activities Calculation",
        content: `
          <div class="statement-box">
            <div class="sb-title">Cash from Operating Activities</div>
            <div class="sb-row"><span>Net Profit before Tax</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Depreciation</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Loss on Disposal (or − Profit)</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Increase in Provision for Bad Debts</span><span></span><span>X</span></div>
            <div class="sb-row"><span>− Investment Income</span><span></span><span>(X)</span></div>
            <div class="sb-row"><span>− Debenture Interest</span><span></span><span>(X)</span></div>
            <div class="sb-row total"><span><strong>Operating Profit before Working Capital</strong></span><span></span><span><strong>X</strong></span></div>
            <div class="sb-row"><span>− Increase in Stock (or + Decrease)</span><span></span><span>(X)</span></div>
            <div class="sb-row"><span>− Increase in Debtors (or + Decrease)</span><span></span><span>(X)</span></div>
            <div class="sb-row"><span>+ Increase in Creditors (or − Decrease)</span><span></span><span>X</span></div>
            <div class="sb-row total"><span><strong>Cash from Operations</strong></span><span></span><span><strong>X</strong></span></div>
          </div>
          <div class="concept-box green">
            <h4>Key Adjustments</h4>
            <p><strong>Add back depreciation</strong> — it's a non-cash expense.<br/>
            <strong>Add back loss on disposal</strong> — the cash received is in investing activities.<br/>
            <strong>Working capital changes</strong> — increases in stock/debtors use cash; increases in creditors save cash.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Why is depreciation added back in the Cash Flow Statement?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Because it's an income item</div>
              <div class="quiz-opt" data-correct="true">Because it was deducted from profit but no cash was actually paid</div>
              <div class="quiz-opt" data-correct="false">Because it increases the value of assets</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 11. CLUB ACCOUNTS
  // ═══════════════════════════════════════════════════
  {
    id: "clubs",
    title: "Club & Service Accounts",
    icon: "Users",
    description: "Income & Expenditure Accounts, Receipts & Payments, and Service Firm accounts.",
    sections: [
      {
        title: "Club Accounts",
        content: `
          <div class="concept-box blue">
            <h4>Key Difference</h4>
            <p>Clubs are <strong>non-profit organisations</strong>. Instead of a P&L Account, they prepare an <strong>Income and Expenditure Account</strong>. Instead of "Net Profit", the result is a <strong>Surplus</strong> or <strong>Deficit</strong>.</p>
          </div>
          <h4>Terminology Changes</h4>
          <table class="learn-table">
            <thead><tr><th>Business Term</th><th>Club Term</th></tr></thead>
            <tbody>
              <tr><td>Capital</td><td>Accumulated Fund</td></tr>
              <tr><td>Net Profit</td><td>Surplus</td></tr>
              <tr><td>Net Loss</td><td>Deficit</td></tr>
              <tr><td>P&L Account</td><td>Income & Expenditure Account</td></tr>
            </tbody>
          </table>
          <div class="concept-box green">
            <h4>Receipts & Payments Account</h4>
            <p>A simple <strong>cash summary</strong> — just like a bank account. Lists all cash/bank receipts and payments. It is NOT the same as an Income & Expenditure Account (which uses the accruals concept).</p>
          </div>
          <div class="concept-box amber">
            <h4>Common Club Items</h4>
            <p>• <strong>Subscriptions</strong> — the main income. Must adjust for prepaid and arrears.<br/>
            • <strong>Bar Trading Account</strong> — if the club has a bar, a separate Trading Account is prepared. Bar profit is income in the I&E Account.<br/>
            • <strong>Life Membership</strong> — spread over the expected membership period.<br/>
            • <strong>Government Grants</strong> — may be capital (for assets) or revenue (for expenses).</p>
          </div>
        `
      },
      {
        title: "Service Firm Accounts",
        content: `
          <div class="concept-box blue">
            <h4>What's Different?</h4>
            <p>A service firm (solicitor, accountant, doctor) does <strong>not sell goods</strong>, so there is <strong>no Trading Account</strong> and <strong>no Cost of Sales</strong>. The Income Statement starts directly with fee income.</p>
          </div>
          <div class="statement-box">
            <div class="sb-title">Income Statement of a Service Firm</div>
            <div class="sb-row"><span>Professional Fees Earned</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Other Income</span><span></span><span>X</span></div>
            <div class="sb-row"><span>− Expenses</span><span></span><span>(X)</span></div>
            <div class="sb-row total"><span><strong>Net Profit</strong></span><span></span><span><strong>X</strong></span></div>
          </div>
          <div class="concept-box amber">
            <h4>Work-in-Progress</h4>
            <p>Service firms may have <strong>work-in-progress</strong> (WIP) — work done but not yet billed. This is treated like closing stock: it increases fees earned. Opening WIP reduces fees earned.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">In a club's accounts, the equivalent of "Capital" is called?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Club Fund</div>
              <div class="quiz-opt" data-correct="true">Accumulated Fund</div>
              <div class="quiz-opt" data-correct="false">Reserve Fund</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 12. BUDGETING
  // ═══════════════════════════════════════════════════
  {
    id: "budgeting",
    title: "Budgeting",
    icon: "ClipboardList",
    description: "Cash budgets, flexible budgets, variances, and budgetary control.",
    sections: [
      {
        title: "Types of Budgets",
        content: `
          <div class="concept-box blue">
            <h4>What is a Budget?</h4>
            <p>A budget is a <strong>financial plan</strong> for a future period. It sets targets and provides a framework for monitoring performance.</p>
          </div>
          <div class="concept-box green">
            <h4>Cash Budget</h4>
            <p>A forecast of cash <strong>inflows and outflows</strong> over a period. Shows when the business will have cash surpluses or deficits. Helps arrange overdrafts or investments in advance.</p>
          </div>
          <div class="concept-box amber">
            <h4>Flexible Budget</h4>
            <p>Prepared to compare budgeted costs and actual costs at the <strong>same level of activity</strong>. It is misleading to compare costs at different activity levels. Helps identify true variances.</p>
          </div>
          <div class="concept-box red">
            <h4>Capital Budget</h4>
            <p>Deals with planned <strong>capital expenditure</strong> (purchase of fixed assets) and capital receipts (sale of fixed assets). Decisions are made by the Board of Directors.</p>
          </div>
          <div class="concept-box blue">
            <h4>Master Budget</h4>
            <p>A summary of all other budgets. For a manufacturing firm it includes: budgeted manufacturing account, budgeted trading and P&L account, and budgeted balance sheet.</p>
          </div>
        `
      },
      {
        title: "Variances & Control",
        content: `
          <div class="concept-box green">
            <h4>Favourable Variance</h4>
            <p>Actual costs are <strong>less than</strong> budgeted costs. Or actual revenue <strong>exceeds</strong> budgeted revenue. This is a positive result.</p>
          </div>
          <div class="concept-box red">
            <h4>Adverse Variance</h4>
            <p>Actual costs <strong>exceed</strong> budgeted costs. May arise in direct materials if prices increase or quantities used are greater than expected.</p>
          </div>
          <h4>Controllable vs Uncontrollable Costs</h4>
          <table class="learn-table">
            <thead><tr><th>Type</th><th>Definition</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Controllable</strong></td><td>Costs the manager can influence and be held responsible for</td><td>All variable costs, sales commission</td></tr>
              <tr><td><strong>Uncontrollable</strong></td><td>Costs the manager cannot control</td><td>Rates to local authority, rent set by landlord</td></tr>
            </tbody>
          </table>
          <div class="concept-box amber">
            <h4>Principal Budget Factor</h4>
            <p>The <strong>limiting factor</strong> that prevents continuous expansion. Usually <strong>sales demand</strong>, but could be: availability of materials, labour, plant capacity, or capital.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">A flexible budget is used to compare costs at...</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Different levels of activity</div>
              <div class="quiz-opt" data-correct="true">The same level of activity</div>
              <div class="quiz-opt" data-correct="false">The maximum level of activity</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 13. COSTING
  // ═══════════════════════════════════════════════════
  {
    id: "costing",
    title: "Costing & Break-Even",
    icon: "Calculator",
    description: "Marginal vs absorption costing, break-even analysis, and cost classification.",
    sections: [
      {
        title: "Cost Classification",
        content: `
          <h4>By Behaviour</h4>
          <div class="concept-box blue">
            <h4>Fixed Costs</h4>
            <p>Costs that remain <strong>constant</strong> regardless of output. E.g. rent, insurance, manager's salary. Total fixed costs stay the same, but fixed cost <strong>per unit decreases</strong> as output rises.</p>
          </div>
          <div class="concept-box green">
            <h4>Variable Costs</h4>
            <p>Costs that change <strong>in direct proportion</strong> to output. E.g. raw materials, direct labour, packaging. Variable cost per unit stays constant.</p>
          </div>
          <div class="concept-box amber">
            <h4>Semi-Variable Costs</h4>
            <p>A cost with both a <strong>fixed element</strong> and a <strong>variable element</strong>. E.g. telephone (line rental + call charges), electricity (standing charge + usage).</p>
          </div>
          <div class="concept-box red">
            <h4>Step Fixed Costs</h4>
            <p>Fixed within a range but <strong>jump</strong> when activity exceeds that range. E.g. one supervisor per 20 workers — hiring a second doubles the cost.</p>
          </div>
        `
      },
      {
        title: "Marginal vs Absorption & Break-Even",
        content: `
          <div class="concept-box blue">
            <h4>Marginal Costing</h4>
            <p>Only <strong>variable costs</strong> are charged to products. Fixed costs are treated as a period cost (charged to P&L in full). Used for decision-making.</p>
          </div>
          <div class="concept-box green">
            <h4>Absorption Costing</h4>
            <p><strong>All costs</strong> (fixed + variable) are included in the cost per unit. Required for financial accounting and stock valuation.</p>
          </div>
          <div class="concept-box amber">
            <h4>Contribution</h4>
            <p><strong>Contribution = Sales − Variable Costs</strong><br/>
            Contribution goes towards paying off fixed costs. Once fixed costs are covered, further contribution = profit.</p>
          </div>
          <h4>Break-Even Point</h4>
          <div class="concept-box green">
            <p><strong>BEP (units) = Fixed Costs ÷ Contribution per Unit</strong><br/>
            <strong>BEP (€) = Fixed Costs ÷ C/S Ratio</strong><br/>
            <strong>Margin of Safety = Actual Sales − Break-Even Sales</strong></p>
          </div>
          <h4>Example</h4>
          <table class="learn-table">
            <tbody>
              <tr><td>Selling Price per unit</td><td>€20</td></tr>
              <tr><td>Variable Cost per unit</td><td>€12</td></tr>
              <tr><td>Contribution per unit</td><td>€8</td></tr>
              <tr><td>Fixed Costs</td><td>€40,000</td></tr>
              <tr class="total-row"><td><strong>BEP</strong></td><td><strong>5,000 units</strong></td></tr>
            </tbody>
          </table>
          <div class="quiz-wrap">
            <p class="quiz-q">If FC = €60,000 and contribution per unit = €15, what is the BEP?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="true">4,000 units</div>
              <div class="quiz-opt" data-correct="false">3,000 units</div>
              <div class="quiz-opt" data-correct="false">5,000 units</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 14. RATIO ANALYSIS
  // ═══════════════════════════════════════════════════
  {
    id: "ratios",
    title: "Ratio Analysis",
    icon: "TrendingUp",
    description: "Profitability, liquidity, and efficiency ratios for interpreting financial statements.",
    sections: [
      {
        title: "Profitability Ratios",
        content: `
          <div class="concept-box blue">
            <h4>Gross Profit Margin</h4>
            <p><strong>(Gross Profit ÷ Sales) × 100</strong><br/>
            Shows the percentage of sales revenue retained after cost of sales. A high GP% indicates good buying or pricing strategies.</p>
          </div>
          <div class="concept-box green">
            <h4>Net Profit Margin</h4>
            <p><strong>(Net Profit ÷ Sales) × 100</strong><br/>
            Shows what percentage of sales is actual profit after all expenses. Measures overall operational efficiency.</p>
          </div>
          <div class="concept-box amber">
            <h4>Return on Capital Employed (ROCE)</h4>
            <p><strong>(Net Profit ÷ Capital Employed) × 100</strong><br/>
            The key measure of overall business performance. Shows the return on the total capital invested. Compare with bank deposit rates.</p>
          </div>
          <div class="concept-box red">
            <h4>Mark-Up vs Margin</h4>
            <p><strong>Mark-up</strong> = Gross Profit ÷ Cost of Sales × 100<br/>
            <strong>Margin</strong> = Gross Profit ÷ Sales × 100<br/>
            If mark-up is 25%, margin is 20% (¼ vs ⅕).</p>
          </div>
        `
      },
      {
        title: "Liquidity & Efficiency Ratios",
        content: `
          <h4>Liquidity Ratios</h4>
          <div class="concept-box blue">
            <h4>Current Ratio</h4>
            <p><strong>Current Assets ÷ Current Liabilities</strong><br/>
            Ideal: approximately <strong>2:1</strong>. Measures the ability to pay short-term debts.</p>
          </div>
          <div class="concept-box green">
            <h4>Quick Ratio (Acid Test)</h4>
            <p><strong>(Current Assets − Stock) ÷ Current Liabilities</strong><br/>
            Ideal: approximately <strong>1:1</strong>. Excludes stock because it may not be quickly convertible to cash.</p>
          </div>
          <h4>Efficiency Ratios</h4>
          <div class="concept-box amber">
            <h4>Stock Turnover</h4>
            <p><strong>Cost of Sales ÷ Average Stock</strong> (in times)<br/>
            Or: <strong>365 ÷ Stock Turnover</strong> (in days)<br/>
            Higher turnover = faster stock movement = more efficient.</p>
          </div>
          <div class="concept-box red">
            <h4>Debtors Collection Period</h4>
            <p><strong>(Debtors ÷ Credit Sales) × 365</strong><br/>
            Shows average days to collect debts. Lower = better cash flow management.</p>
          </div>
          <div class="concept-box blue">
            <h4>Creditors Payment Period</h4>
            <p><strong>(Creditors ÷ Credit Purchases) × 365</strong><br/>
            Shows average days to pay suppliers. Should be balanced — too long damages relationships.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Current Assets = €50,000, Stock = €15,000, Current Liabilities = €25,000. What is the Quick Ratio?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">2:1</div>
              <div class="quiz-opt" data-correct="true">1.4:1</div>
              <div class="quiz-opt" data-correct="false">1:1</div>
            </div>
          </div>
        `
      }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 15. MANUFACTURING ACCOUNTS
  // ═══════════════════════════════════════════════════
  {
    id: "manufacturing",
    title: "Manufacturing Accounts",
    icon: "Factory",
    description: "Prime cost, factory overheads, work-in-progress, and cost of production.",
    sections: [
      {
        title: "Structure of Manufacturing Account",
        content: `
          <div class="concept-box blue">
            <h4>Purpose</h4>
            <p>A manufacturing firm makes its own goods. The Manufacturing Account calculates the <strong>cost of producing</strong> the goods, which then transfers to the Trading Account as the equivalent of "Purchases".</p>
          </div>
          <div class="statement-box">
            <div class="sb-title">Manufacturing Account</div>
            <div class="sb-row"><span><strong>Direct Materials</strong></span><span></span><span></span></div>
            <div class="sb-row indent"><span>Opening Stock of Raw Materials</span><span>X</span><span></span></div>
            <div class="sb-row indent"><span>+ Purchases of Raw Materials</span><span>X</span><span></span></div>
            <div class="sb-row indent"><span>− Closing Stock of Raw Materials</span><span>(X)</span><span></span></div>
            <div class="sb-row indent"><span>= Raw Materials Consumed</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Direct Labour (Factory Wages)</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Direct Expenses</span><span></span><span>X</span></div>
            <div class="sb-row total"><span><strong>= PRIME COST</strong></span><span></span><span><strong>X</strong></span></div>
            <div class="sb-row"><span>+ Factory Overheads</span><span></span><span>X</span></div>
            <div class="sb-row"><span>+ Opening WIP</span><span></span><span>X</span></div>
            <div class="sb-row"><span>− Closing WIP</span><span></span><span>(X)</span></div>
            <div class="sb-row total"><span><strong>= COST OF PRODUCTION</strong></span><span></span><span><strong>X</strong></span></div>
          </div>
          <div class="concept-box green">
            <h4>Key Terms</h4>
            <p><strong>Prime Cost</strong> = Direct Materials + Direct Labour + Direct Expenses<br/>
            <strong>Factory Overheads</strong> = Indirect costs of production (factory rent, light & heat, depreciation of machinery, factory insurance)<br/>
            <strong>WIP</strong> = Work-in-Progress (partly finished goods)</p>
          </div>
        `
      },
      {
        title: "Transfer to Trading Account",
        content: `
          <p>The <strong>Cost of Production</strong> from the Manufacturing Account replaces "Purchases" in the Trading Account.</p>
          <div class="statement-box">
            <div class="sb-title">Trading Account (Manufacturing Firm)</div>
            <div class="sb-row"><span>Sales</span><span></span><span>X</span></div>
            <div class="sb-row"><span>Opening Stock of Finished Goods</span><span>X</span><span></span></div>
            <div class="sb-row"><span>+ Cost of Production (from Mfg A/c)</span><span>X</span><span></span></div>
            <div class="sb-row"><span>− Closing Stock of Finished Goods</span><span>(X)</span><span></span></div>
            <div class="sb-row"><span></span><span></span><span>(X)</span></div>
            <div class="sb-row total"><span><strong>Gross Profit</strong></span><span></span><span><strong>X</strong></span></div>
          </div>
          <div class="concept-box amber">
            <h4>Three Types of Stock</h4>
            <p>1. <strong>Raw Materials</strong> — in the Manufacturing Account<br/>
            2. <strong>Work-in-Progress</strong> — in the Manufacturing Account<br/>
            3. <strong>Finished Goods</strong> — in the Trading Account</p>
          </div>
          <div class="concept-box red">
            <h4>Apportioning Costs</h4>
            <p>Some expenses are shared between factory and office. They must be <strong>apportioned</strong> (split) based on a suitable basis (e.g. floor area, number of employees). Factory portion goes to Manufacturing Account; office portion goes to P&L.</p>
          </div>
          <div class="quiz-wrap">
            <p class="quiz-q">Prime Cost is made up of?</p>
            <div class="quiz-opts">
              <div class="quiz-opt" data-correct="false">Direct Materials + Factory Overheads</div>
              <div class="quiz-opt" data-correct="true">Direct Materials + Direct Labour + Direct Expenses</div>
              <div class="quiz-opt" data-correct="false">All factory costs including overheads</div>
            </div>
          </div>
        `
      }
    ]
  }
];
