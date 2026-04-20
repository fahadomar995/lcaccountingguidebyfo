import type { LearnModuleDef } from "../learnContent.types";

export const MODULE: LearnModuleDef = {
  id: "approach-q1",
  name: "Approaching Q1 — Sole Trader",
  icon: "BookOpen",
  category: "final-accounts",
  tagline: "How to read the trial balance, mark the adjustments, and sequence the answer.",
  lessons: [
    {
      t: "Reading the Trial Balance",
      steps: [
        `<div class="concept-box cb-blue"><strong>The Q1 trial balance is the heart of the question.</strong> Before you write a single figure, you must read it from top to bottom and decide what each line will become. Most students start writing immediately and get lost — the disciplined ones spend 4–5 minutes reading first.</div>
<div class="concept-box cb-green"><strong>The 4-pass technique:</strong><br>
<strong>Pass 1 — Tick the obvious.</strong> Mark Sales (T), Purchases (T), Stock (T), Returns (T), Carriage Inwards (T) — these go directly to Trading.<br>
<strong>Pass 2 — Mark P&amp;L items.</strong> Wages (P), Rent (P), Insurance (P), Light &amp; Heat (P), Carriage Outwards (P), Discount allowed/received (P), Bad debts (P).<br>
<strong>Pass 3 — Mark BS items.</strong> Premises (BS), Vehicles (BS), Debtors (BS), Creditors (BS), Bank (BS), Capital (BS), Drawings (BS via Capital).<br>
<strong>Pass 4 — Read the adjustments.</strong> THESE OVERRIDE everything. Each adjustment usually affects 2 places.</div>`,
        `<div class="concept-box cb-amber"><strong>Sample TB excerpt — try the 4-pass:</strong></div>
<table style="width:100%;border-collapse:collapse;font-size:11px">
<tr style="background:hsl(var(--muted))"><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Item</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:right">Dr</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:right">Cr</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:center">Goes to</th></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Sales</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">280,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>T</strong> (income)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Purchases</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">160,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>T</strong> (cost)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Stock 01/01</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">22,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>T</strong> (opening)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Carriage inwards</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">1,500</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>T</strong> (+ purchases)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Carriage outwards</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">800</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>P</strong> (expense)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Wages</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">28,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>P</strong> (expense)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Premises</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">200,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>BS</strong> (FA)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Debtors</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">14,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>BS</strong> (CA)</td></tr>
<tr><td style="padding:5px;border:1px solid hsl(var(--border))">Capital</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right"></td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:right">150,000</td><td style="padding:5px;border:1px solid hsl(var(--border));text-align:center"><strong>BS</strong> (financed by)</td></tr>
</table>
<div class="concept-box cb-blue" style="margin-top:8px"><strong>Now you know exactly where every TB line goes BEFORE looking at adjustments.</strong> When the adjustments come in, you'll modify these allocations rather than getting lost.</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">"Carriage inwards €1,500" goes in:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Trading account — added to purchases</div><div class="quiz-opt" data-correct="false">P&amp;L expense</div><div class="quiz-opt" data-correct="false">Balance sheet</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Drawings appear in the trial balance as a Dr balance. They go in:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">P&amp;L as an expense</div><div class="quiz-opt" data-correct="true">BS — DEDUCTED from Capital in the Financed By section</div><div class="quiz-opt" data-correct="false">Trading account</div></div></div>`,
      ],
    },
    {
      t: "Adjustments-First Method",
      steps: [
        `<div class="concept-box cb-blue"><strong>The single biggest mistake in Q1:</strong> writing out the Trading Account and P&amp;L immediately, then trying to "patch in" the adjustments. You will miss something.<br><br>
<strong>The disciplined order:</strong><br>
1. Read TB (4-pass, 4 min)<br>
2. Number EACH adjustment 1, 2, 3… and write the journal/effect for each on scratchpad (10 min)<br>
3. ONLY THEN write Trading + P&amp;L + Appropriation + BS (35 min)<br>
4. Cross-tick each adjustment as you incorporate it (last 5 min)</div>`,
        `<div class="concept-box cb-green"><strong>The 8 standard sole-trader adjustments — memorise the effect of each:</strong><br><br>
<strong>(1) Closing Stock €X</strong> → Cr in Trading (deduct from cost) + Dr in BS Current Assets<br>
<strong>(2) Wages due €X</strong> → ADD to wages in P&amp;L + Current Liability in BS<br>
<strong>(3) Insurance prepaid €X</strong> → DEDUCT from insurance in P&amp;L + Current Asset in BS<br>
<strong>(4) Depreciation X% on cost / NBV</strong> → P&amp;L expense + ADD to Acc Dep in BS<br>
<strong>(5) Bad debts written off €X</strong> → P&amp;L expense + DEDUCT from debtors in BS<br>
<strong>(6) Provision for bad debts X% of debtors</strong> → P&amp;L expense (or change in provision) + DEDUCT from debtors in BS<br>
<strong>(7) Goods taken by owner €X</strong> → DEDUCT from purchases in Trading + ADD to drawings in BS<br>
<strong>(8) Capital expenditure mixed in repairs €X</strong> → DEDUCT from repairs in P&amp;L + ADD to relevant FA in BS</div>`,
        `<div class="concept-box cb-amber"><strong>Worked example:</strong> "Insurance €4,800 was paid for 16 months from 01/01."<br><br>
12 months belong to this year, 4 months are prepaid for next year.<br>
Monthly = 4,800 ÷ 16 = €300<br>
Prepaid = 300 × 4 = €1,200<br>
P&amp;L charge = 4,800 − 1,200 = <strong>€3,600</strong><br>
BS Current Asset (prepayment) = <strong>€1,200</strong></div>
<button class="practice-btn" data-target="q1-prep">▸ Practice This</button>
<div class="practice-panel" id="q1-prep">
<div class="fill-row"><span class="fl">Monthly insurance: 4,800 ÷ 16</span><span class="fa"><input class="fill-input" data-answer="300" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Prepaid (4 months × 300)</span><span class="fa"><input class="fill-input" data-answer="1200" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">P&amp;L insurance charge</span><span class="fa"><input class="fill-input" data-answer="3600" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">"Wages owed at year end €600." This affects:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Wages in P&amp;L only</div><div class="quiz-opt" data-correct="true">Add €600 to wages in P&amp;L AND show €600 as a current liability in BS</div><div class="quiz-opt" data-correct="false">Capital section of BS only</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">"Goods taken by the owner for personal use €450." Effect:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Add to sales</div><div class="quiz-opt" data-correct="true">Reduce purchases by €450 AND add €450 to drawings</div><div class="quiz-opt" data-correct="false">No effect — owner can take stock freely</div></div></div>`,
      ],
    },
    {
      t: "Sequencing the Answer",
      steps: [
        `<div class="concept-box cb-blue"><strong>The standard Q1 layout — write in this order, never skip ahead:</strong></div>
<div class="learn-t"><div class="learn-t-title">Q1 sequence (sole trader)</div><div class="learn-t-body">
<div class="learn-t-side"><div class="learn-t-label">Statement (left page)</div>
<div class="learn-t-row"><span class="d">1. Trading Account</span><span class="a">→ Gross Profit</span></div>
<div class="learn-t-row"><span class="d">2. Profit &amp; Loss Account</span><span class="a">→ Net Profit</span></div>
<div class="learn-t-row"><span class="d">3. Balance Sheet — Fixed Assets</span><span class="a">Cost / Dep / NBV</span></div>
<div class="learn-t-row"><span class="d">4. BS — Current Assets</span><span class="a">Stock, Debtors, Bank, Prepayments</span></div>
<div class="learn-t-row"><span class="d">5. BS — Current Liabilities</span><span class="a">Creditors, Accruals, Bank OD</span></div>
<div class="learn-t-row"><span class="d">6. BS — Financed By</span><span class="a">Capital + NP − Drawings + LT Liab</span></div>
</div>
<div class="learn-t-side"><div class="learn-t-label">Workings (right page)</div>
<div class="learn-t-row"><span class="d">W1 — Depreciation</span><span class="a"></span></div>
<div class="learn-t-row"><span class="d">W2 — Bad debts &amp; provision</span><span class="a"></span></div>
<div class="learn-t-row"><span class="d">W3 — Prepayments / accruals</span><span class="a"></span></div>
<div class="learn-t-row"><span class="d">W4 — Mixed cap/revenue split</span><span class="a"></span></div>
</div>
</div></div>`,
        `<div class="concept-box cb-amber"><strong>The Trading Account skeleton:</strong></div>
<div class="fill-section"><div class="fill-section-title">Trading A/c for year ended 31/12</div>
<div class="fill-row"><span class="fl">Sales</span><span class="fa">280,000</span></div>
<div class="fill-row hl-r"><span class="fl">Less Sales Returns</span><span class="fa">(2,000)</span></div>
<div class="fill-row"><span class="fl"><strong>Net Sales</strong></span><span class="fa"><strong>278,000</strong></span></div>
<div class="fill-row fr-head"><span class="fl"><strong>Less Cost of Sales:</strong></span><span class="fa"></span></div>
<div class="fill-row"><span class="fl">&nbsp;&nbsp;Opening Stock</span><span class="fa">22,000</span></div>
<div class="fill-row"><span class="fl">&nbsp;&nbsp;Purchases</span><span class="fa">160,000</span></div>
<div class="fill-row"><span class="fl">&nbsp;&nbsp;+ Carriage inwards</span><span class="fa">1,500</span></div>
<div class="fill-row hl-r"><span class="fl">&nbsp;&nbsp;− Goods for own use</span><span class="fa">(450)</span></div>
<div class="fill-row hl-r"><span class="fl">&nbsp;&nbsp;− Purchases returns</span><span class="fa">(800)</span></div>
<div class="fill-row hl-r"><span class="fl">&nbsp;&nbsp;− Closing stock</span><span class="fa">(28,000)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Cost of Sales</strong></span><span class="fa"><strong>(154,250)</strong></span></div>
<div class="fill-row fr-total"><span class="fl"><strong>GROSS PROFIT</strong></span><span class="fa"><strong>123,750</strong></span></div>
</div>
<div class="concept-box cb-green" style="margin-top:8px"><strong>Discipline:</strong> always show net sales separately, always sub-total cost of sales, always double-underline GP. Markers reward layout.</div>`,
        `<div class="concept-box cb-amber"><strong>The Balance Sheet "Financed By" skeleton — most-failed section:</strong></div>
<div class="fill-section"><div class="fill-section-title">Financed By</div>
<div class="fill-row"><span class="fl">Capital at 01/01</span><span class="fa">150,000</span></div>
<div class="fill-row hl-g"><span class="fl">+ Net Profit</span><span class="fa">+ 51,200</span></div>
<div class="fill-row hl-r"><span class="fl">− Drawings (incl. goods for own use)</span><span class="fa">(18,450)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Capital at 31/12</strong></span><span class="fa"><strong>182,750</strong></span></div>
<div class="fill-row"><span class="fl">+ Long-Term Loan</span><span class="fa">25,000</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>CAPITAL EMPLOYED</strong></span><span class="fa"><strong>207,750</strong></span></div>
</div>
<div class="concept-box cb-red"><strong>Capital Employed MUST equal: Total FA + Working Capital.</strong> If your BS doesn't balance, the error is almost always one of:<br>
1. Forgot to add closing stock in CA<br>
2. Forgot to add accruals in CL<br>
3. Used opening stock instead of closing<br>
4. Drawings not deducted from capital<br>
5. NP wrong (re-check P&amp;L)</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">In what order should you write Q1?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Balance Sheet first, then Trading + P&amp;L</div><div class="quiz-opt" data-correct="true">Trading → P&amp;L → Balance Sheet (top to bottom)</div><div class="quiz-opt" data-correct="false">P&amp;L first, then Trading, then BS</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Capital Employed should equal:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Total Assets only</div><div class="quiz-opt" data-correct="true">Total Fixed Assets + Working Capital (CA − CL)</div><div class="quiz-opt" data-correct="false">Net Profit only</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">If your BS doesn't balance and you've checked all the obvious items, the next thing to recheck is:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Net Profit (re-do the P&amp;L addition)</div><div class="quiz-opt" data-correct="false">Just add a "balancing figure" line</div><div class="quiz-opt" data-correct="false">Skip to the next question</div></div></div>`,
      ],
    },
  ],
};
