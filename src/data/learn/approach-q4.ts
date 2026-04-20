import type { LearnModuleDef } from "../learnContent.types";

export const MODULE: LearnModuleDef = {
  id: "approach-q4",
  name: "Approaching Q4 — Tabular Statements",
  icon: "Layers",
  category: "final-accounts",
  tagline: "Column setup, cross-totals, and how each transaction flows through every column.",
  lessons: [
    {
      t: "What a Tabular Statement Is",
      steps: [
        `<div class="concept-box cb-blue"><strong>Tabular Statements (Q4) are deceptively simple but technically demanding.</strong> Each transaction is recorded across multiple columns simultaneously — every entry must keep the equation Assets = Liabilities + Capital in balance.</div>
<div class="concept-box cb-green"><strong>The standard column layout (left to right):</strong><br><br>
<strong>Assets columns</strong> — Premises, Vehicles, Stock, Debtors, Bank/Cash<br>
<strong>Liabilities column</strong> — Creditors, Loan, Bank Overdraft<br>
<strong>Capital column</strong> — Capital, Drawings, Net Profit<br><br>
The number of columns depends on the question — read the opening BS first to identify every account that exists.</div>
<div class="concept-box cb-amber"><strong>The golden rule:</strong> for EVERY transaction, the total of the changes across all columns MUST equal zero. If it doesn't, you've recorded a transaction wrongly.</div>`,
        `<div class="concept-box cb-blue"><strong>Reading the question:</strong> Q4 typically gives:<br>
• An opening Balance Sheet at 01/01<br>
• 5–7 transactions during the year<br>
• A closing Balance Sheet at 31/12<br><br>
Your job is to fill the table so that <strong>opening figures + all transactions = closing figures</strong> in every column.</div>
<div class="concept-box cb-amber"><strong>Sample opening row layout:</strong></div>
<table style="width:100%;border-collapse:collapse;font-size:11px">
<tr style="background:hsl(var(--muted))"><th style="padding:5px;border:1px solid hsl(var(--border))">Detail</th><th style="padding:5px;border:1px solid hsl(var(--border))">Premises</th><th style="padding:5px;border:1px solid hsl(var(--border))">Stock</th><th style="padding:5px;border:1px solid hsl(var(--border))">Debtors</th><th style="padding:5px;border:1px solid hsl(var(--border))">Bank</th><th style="padding:5px;border:1px solid hsl(var(--border))">Creditors</th><th style="padding:5px;border:1px solid hsl(var(--border))">Capital</th></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border));font-weight:600">Opening BS</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">200,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">15,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">8,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">4,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">(7,000)</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">(220,000)</td></tr>
</table>
<div class="concept-box cb-green" style="margin-top:8px"><strong>Sign convention:</strong> assets are positive, liabilities and capital are negative (in brackets). The row total is always 0: 200+15+8+4−7−220 = 0. ✓</div>`,
      ],
    },
    {
      t: "Recording Transactions",
      steps: [
        `<div class="concept-box cb-blue"><strong>Every transaction touches at least 2 columns.</strong> Think: "Where does the money come from? Where does it go?"</div>
<div class="concept-box cb-amber"><strong>Worked example — 6 standard transactions:</strong></div>
<table style="width:100%;border-collapse:collapse;font-size:10px">
<tr style="background:hsl(var(--muted))"><th style="padding:4px;border:1px solid hsl(var(--border))">#</th><th style="padding:4px;border:1px solid hsl(var(--border));text-align:left">Transaction</th><th style="padding:4px;border:1px solid hsl(var(--border))">Effect</th></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">1</td><td style="padding:4px;border:1px solid hsl(var(--border))">Cash sale €1,200, cost €800</td><td style="padding:4px;border:1px solid hsl(var(--border))">Bank +1,200; Stock −800; Capital −400 (profit)</td></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">2</td><td style="padding:4px;border:1px solid hsl(var(--border))">Credit purchases €2,500</td><td style="padding:4px;border:1px solid hsl(var(--border))">Stock +2,500; Creditors −2,500</td></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">3</td><td style="padding:4px;border:1px solid hsl(var(--border))">Paid creditor €1,800</td><td style="padding:4px;border:1px solid hsl(var(--border))">Bank −1,800; Creditors +1,800</td></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">4</td><td style="padding:4px;border:1px solid hsl(var(--border))">Debtor paid €5,500 (after 500 discount)</td><td style="padding:4px;border:1px solid hsl(var(--border))">Bank +5,500; Debtors −6,000; Capital −500 (discount = expense)</td></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">5</td><td style="padding:4px;border:1px solid hsl(var(--border))">Owner drew €1,000 cash</td><td style="padding:4px;border:1px solid hsl(var(--border))">Bank −1,000; Capital +1,000 (drawings reduce capital)</td></tr>
<tr><td style="padding:4px;border:1px solid hsl(var(--border));text-align:center">6</td><td style="padding:4px;border:1px solid hsl(var(--border))">Bought van €12,000 — paid €4,000 deposit, balance on credit</td><td style="padding:4px;border:1px solid hsl(var(--border))">Vehicles +12,000; Bank −4,000; Creditors −8,000</td></tr>
</table>`,
        `<div class="concept-box cb-red"><strong>The trickiest part — when profit/loss is implicit.</strong><br><br>
A cash sale of €1,200 with cost €800 generates €400 of profit. You must record this profit by REDUCING the Capital column by €400 (because capital is shown negative, "reducing" it means making it more negative).<br><br>
<strong>The shortcut:</strong> for every sale, immediately work out gross profit (Sales − Cost). That GP figure is the Capital adjustment.</div>
<div class="concept-box cb-amber"><strong>Discount allowed = expense = reduces capital.</strong><br>
A debtor owing €6,000 pays €5,500 (€500 discount). Debtors decrease by the full €6,000 (they owe nothing), but Bank only goes up €5,500. The €500 difference is an expense → Capital is reduced by €500.</div>`,
        `<button class="practice-btn" data-target="q4-trans">▸ Practice This</button>
<div class="practice-panel" id="q4-trans">
<div class="fill-row"><span class="fl">Cash sale €2,000 cost €1,400. Profit recorded in Capital column =</span><span class="fa"><input class="fill-input" data-answer="600" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Debtor paid €3,800 after €200 discount. Bank increase =</span><span class="fa"><input class="fill-input" data-answer="3800" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Same transaction — Debtors decrease =</span><span class="fa"><input class="fill-input" data-answer="4000" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
</div>
<div class="quiz-q"><div class="quiz-q-text">A cash sale of €900 (cost €600) is recorded as:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Bank +900; Stock −900</div><div class="quiz-opt" data-correct="true">Bank +900; Stock −600; Capital −300 (profit)</div><div class="quiz-opt" data-correct="false">Bank +900; Capital −900</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Owner drawings of €500 cash:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Bank −500; Capital −500</div><div class="quiz-opt" data-correct="true">Bank −500; Capital +500 (capital column is negative — drawings reduce capital, making it less negative)</div><div class="quiz-opt" data-correct="false">No effect on tabular statement</div></div></div>`,
      ],
    },
    {
      t: "Cross-Totalling Discipline",
      steps: [
        `<div class="concept-box cb-blue"><strong>Cross-totalling is what catches errors before they snowball.</strong> After each transaction row, sum across the row — it MUST equal zero. If it doesn't, fix that row before moving on.</div>
<div class="concept-box cb-green"><strong>Two checks at the end:</strong><br><br>
<strong>Check 1 — Each row totals zero.</strong> Means every transaction was recorded correctly (double-entry preserved).<br><br>
<strong>Check 2 — Each column totals to the closing BS figure.</strong> Means you haven't missed any transaction or column.</div>
<div class="concept-box cb-amber"><strong>Worked column total:</strong><br>
Stock: Opening 15,000 + Purchases 2,500 − COGS 800 − COGS 600 = closing stock €16,100. If the question's closing BS shows €16,100 → ✓. If it shows anything else, you've missed a transaction or made an arithmetic slip.</div>`,
        `<div class="concept-box cb-red"><strong>The 5 most common Q4 mistakes:</strong><br>
1. <strong>Forgetting to record COGS</strong> for cash/credit sales. Sales recorded but stock not reduced.<br>
2. <strong>Putting profit on the wrong sign</strong> (treating profit as a positive Capital addition rather than a negative reduction).<br>
3. <strong>Drawings recorded as expense</strong> instead of capital reduction.<br>
4. <strong>Discount allowed forgotten</strong> — Bank goes up by the cash received, but Debtors must reduce by the full debt.<br>
5. <strong>Bank overdraft sign error</strong> — bank overdraft is a liability (negative), not a positive bank balance.</div>`,
        `<div class="concept-box cb-amber"><strong>Final step — Construct the closing BS.</strong> Once all transaction rows are in, sum each column. Take that total and present it as the closing Balance Sheet at 31/12. This is usually 10–15 marks of the 100, so don't skip it.</div>
<div class="quiz-q"><div class="quiz-q-text">After recording a transaction, the row totals across columns to +€500. This means:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Error — re-check; total must be zero</div><div class="quiz-opt" data-correct="false">Correct — represents profit</div><div class="quiz-opt" data-correct="false">Correct — represents new capital</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">A bank overdraft of €3,000 in the opening BS is shown as:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Bank column +3,000</div><div class="quiz-opt" data-correct="true">Bank column −3,000 (it's a liability)</div><div class="quiz-opt" data-correct="false">Capital column −3,000</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Stock col: Opening 15k + Purch 2.5k − COGS 1.4k = expected closing</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">€18,900</div><div class="quiz-opt" data-correct="true">€16,100</div><div class="quiz-opt" data-correct="false">€13,500</div></div></div>`,
      ],
    },
  ],
};
