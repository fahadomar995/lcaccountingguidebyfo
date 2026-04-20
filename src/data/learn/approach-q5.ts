import type { LearnModuleDef } from "../learnContent.types";

export const MODULE: LearnModuleDef = {
  id: "approach-q5",
  name: "Approaching Q5 — Company Final Accounts",
  icon: "Building2",
  category: "final-accounts",
  tagline: "Adjustments-first method, P&L vs Appropriation, and standard W1/W2/W3 layout.",
  lessons: [
    {
      t: "Sole Trader vs Company — what changes",
      steps: [
        `<div class="concept-box cb-blue"><strong>Q5 Company Final Accounts is mechanically similar to Q1 sole trader, but with 5 critical differences.</strong> Get these right and you bank 100 marks reliably.</div>
<table style="width:100%;border-collapse:collapse;font-size:11px">
<tr style="background:hsl(var(--muted))"><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Aspect</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Sole Trader (Q1)</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Company (Q5)</th></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">Net profit</td><td style="padding:6px;border:1px solid hsl(var(--border))">Goes to Capital A/c</td><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Goes to Appropriation A/c</strong></td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">Capital section</td><td style="padding:6px;border:1px solid hsl(var(--border))">Capital + NP − Drawings</td><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Issued share capital + Reserves</strong></td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">Owner withdrawals</td><td style="padding:6px;border:1px solid hsl(var(--border))">Drawings</td><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Dividends (in Appropriation)</strong></td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">Tax</td><td style="padding:6px;border:1px solid hsl(var(--border))">Personal — not in accounts</td><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Corporation tax in Appropriation</strong></td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">Reserves</td><td style="padding:6px;border:1px solid hsl(var(--border))">None</td><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Revaluation, General, P&amp;L b/f &amp; c/f</strong></td></tr>
</table>`,
        `<div class="concept-box cb-green"><strong>The Q5 statement order:</strong><br>
1. <strong>Trading Account</strong> → Gross Profit<br>
2. <strong>P&amp;L Account</strong> → Operating Profit<br>
3. <strong>Profit before tax</strong> (after interest)<br>
4. <strong>Profit after tax</strong><br>
5. <strong>Appropriation Account</strong> → Profit retained<br>
6. <strong>Balance Sheet</strong> with reserves section</div>
<div class="concept-box cb-amber"><strong>Key vocabulary swap:</strong><br>
• "Sales" → still <em>Sales / Revenue</em><br>
• "Drawings" → <em>Ordinary Dividend Paid</em><br>
• "Capital" → <em>Issued Ordinary Share Capital</em><br>
• "Loan interest due" → <em>Debenture Interest accrued</em></div>`,
      ],
    },
    {
      t: "The Appropriation Account",
      steps: [
        `<div class="concept-box cb-blue"><strong>The Appropriation Account shows what happens to profit AFTER tax.</strong> This is uniquely a company concept — sole traders take drawings; companies pay dividends and retain the rest.</div>
<div class="fill-section"><div class="fill-section-title">Appropriation Account skeleton</div>
<div class="fill-row"><span class="fl">Net Profit (from P&amp;L)</span><span class="fa">85,000</span></div>
<div class="fill-row hl-r"><span class="fl">Less Corporation Tax (W3)</span><span class="fa">(12,750)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Profit after Tax</strong></span><span class="fa"><strong>72,250</strong></span></div>
<div class="fill-row hl-r"><span class="fl">Less Dividends:</span><span class="fa"></span></div>
<div class="fill-row"><span class="fl">&nbsp;&nbsp;Preference dividend (paid)</span><span class="fa">(4,000)</span></div>
<div class="fill-row"><span class="fl">&nbsp;&nbsp;Ordinary dividend (proposed)</span><span class="fa">(20,000)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Profit Retained for Year</strong></span><span class="fa"><strong>48,250</strong></span></div>
<div class="fill-row hl-g"><span class="fl">+ P&amp;L Reserve b/f (from prior year)</span><span class="fa">+ 35,000</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>P&amp;L Reserve c/f (goes to BS reserves)</strong></span><span class="fa"><strong>83,250</strong></span></div>
</div>`,
        `<div class="concept-box cb-amber"><strong>Dividend distinction — proposed vs paid:</strong><br><br>
• <strong>"Ordinary dividend paid €X"</strong> → just deduct in Appropriation. Already out of bank.<br>
• <strong>"Ordinary dividend proposed €X"</strong> → deduct in Appropriation AND show as Current Liability in BS (not yet paid).<br>
• <strong>"Final dividend of 5% on issued ordinary shares"</strong> → calculate: issued shares × 5%. Treat as proposed.</div>
<div class="concept-box cb-amber"><strong>Preference dividend rule:</strong><br>
"6% Preference Shares of €1 each €100,000" means preference dividend = 100,000 × 6% = €6,000. ALWAYS calculated on the nominal value, never market value. Usually fully paid by year end.</div>`,
        `<button class="practice-btn" data-target="q5-app">▸ Practice This</button>
<div class="practice-panel" id="q5-app">
<div class="fill-row"><span class="fl">8% Pref dividend on €50,000 prefs</span><span class="fa"><input class="fill-input" data-answer="4000" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">10% ordinary dividend on €200,000 issued shares</span><span class="fa"><input class="fill-input" data-answer="20000" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Profit retained: 72,250 − 4,000 − 20,000</span><span class="fa"><input class="fill-input" data-answer="48250" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
</div>
<div class="quiz-q"><div class="quiz-q-text">"Ordinary dividend proposed of €15,000" appears in:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">P&amp;L only</div><div class="quiz-opt" data-correct="true">Appropriation A/c (deduction) AND BS Current Liabilities</div><div class="quiz-opt" data-correct="false">Reserves only</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">"7% Preference shares €80,000". The preference dividend is:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">€5,600 (80,000 × 7%)</div><div class="quiz-opt" data-correct="false">€80,000 × current market price</div><div class="quiz-opt" data-correct="false">Whatever the directors decide</div></div></div>`,
      ],
    },
    {
      t: "Standard Workings (W1 / W2 / W3)",
      steps: [
        `<div class="concept-box cb-blue"><strong>Q5 has three near-universal workings.</strong> Memorise the layout — they appear in 80%+ of past papers.</div>`,
        `<div class="fill-section"><div class="fill-section-title">W1 — Depreciation (Buildings example)</div>
<div class="fill-row"><span class="fl">Cost of buildings</span><span class="fa">600,000</span></div>
<div class="fill-row hl-r"><span class="fl">Less land (non-depreciable)</span><span class="fa">(150,000)</span></div>
<div class="fill-row"><span class="fl">Depreciable amount</span><span class="fa">450,000</span></div>
<div class="fill-row"><span class="fl">× 2% straight-line</span><span class="fa"></span></div>
<div class="fill-row fr-total"><span class="fl"><strong>P&amp;L charge</strong></span><span class="fa"><strong>9,000</strong></span></div>
</div>
<div class="concept-box cb-amber"><strong>Common Q5 trap:</strong> "Buildings €600,000 (including land €150,000)". Always strip out land — it doesn't depreciate. Depreciation is on buildings only.</div>`,
        `<div class="fill-section"><div class="fill-section-title">W2 — Debtors &amp; Provision (mid-year acquisition)</div>
<div class="fill-row"><span class="fl">Debtors per TB</span><span class="fa">42,000</span></div>
<div class="fill-row hl-r"><span class="fl">Less specific bad debt written off</span><span class="fa">(2,000)</span></div>
<div class="fill-row"><span class="fl">Adjusted debtors</span><span class="fa">40,000</span></div>
<div class="fill-row"><span class="fl">Provision required: 40,000 × 5%</span><span class="fa">2,000</span></div>
<div class="fill-row hl-g"><span class="fl">Existing provision (TB)</span><span class="fa">(1,500)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>P&amp;L charge (increase in provision)</strong></span><span class="fa"><strong>500</strong></span></div>
<div class="fill-row"><span class="fl">+ Bad debt expense</span><span class="fa">2,000</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Total P&amp;L bad debts charge</strong></span><span class="fa"><strong>2,500</strong></span></div>
</div>
<div class="concept-box cb-green"><strong>BS effect:</strong> Debtors shown as 40,000 less new provision 2,000 = €38,000 net.</div>`,
        `<div class="fill-section"><div class="fill-section-title">W3 — Corporation Tax</div>
<div class="fill-row"><span class="fl">Tax for current year (12.5% × profit before tax)</span><span class="fa">12,750</span></div>
<div class="fill-row"><span class="fl">+ Underprovision from last year</span><span class="fa">+ 800</span></div>
<div class="fill-row hl-r"><span class="fl">− Overprovision from last year</span><span class="fa">(N/A)</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>Appropriation A/c charge</strong></span><span class="fa"><strong>13,550</strong></span></div>
</div>
<div class="concept-box cb-amber"><strong>BS effect:</strong> Tax payable = current year charge only (€12,750), shown in Current Liabilities. The €800 was already paid last year — don't put it in CL.</div>
<button class="practice-btn" data-target="q5-w">▸ Practice This</button>
<div class="practice-panel" id="q5-w">
<div class="fill-row"><span class="fl">Buildings dep: (600,000 − 150,000) × 2%</span><span class="fa"><input class="fill-input" data-answer="9000" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Provision charge: (40,000 × 5%) − 1,500</span><span class="fa"><input class="fill-input" data-answer="500" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
<div class="fill-row"><span class="fl">Total bad debts P&amp;L: 2,000 + 500</span><span class="fa"><input class="fill-input" data-answer="2500" placeholder="?"><button class="check-btn">Check</button></span></div>
<div class="fill-feedback"></div>
</div>`,
      ],
    },
    {
      t: "BS Reserves & Capital Section",
      steps: [
        `<div class="concept-box cb-blue"><strong>The Q5 BS "Financed By" section is where most marks are lost.</strong> Sole traders have one capital line; companies have authorised share capital, issued share capital, multiple reserves, AND long-term debt.</div>
<div class="fill-section"><div class="fill-section-title">Capital and Reserves section</div>
<div class="fill-row fr-head"><span class="fl"><strong>Authorised Share Capital (note)</strong></span><span class="fa"></span></div>
<div class="fill-row"><span class="fl">500,000 Ordinary shares @ €1</span><span class="fa">500,000</span></div>
<div class="fill-row"><span class="fl">100,000 8% Preference shares @ €1</span><span class="fa">100,000</span></div>
<div class="fill-row fr-head"><span class="fl"><strong>Issued Share Capital</strong></span><span class="fa"></span></div>
<div class="fill-row"><span class="fl">300,000 Ordinary shares fully paid</span><span class="fa">300,000</span></div>
<div class="fill-row"><span class="fl">50,000 8% Preference shares fully paid</span><span class="fa">50,000</span></div>
<div class="fill-row fr-head"><span class="fl"><strong>Reserves</strong></span><span class="fa"></span></div>
<div class="fill-row"><span class="fl">Revaluation Reserve</span><span class="fa">75,000</span></div>
<div class="fill-row"><span class="fl">General Reserve</span><span class="fa">40,000</span></div>
<div class="fill-row"><span class="fl">P&amp;L Reserve (from Appropriation c/f)</span><span class="fa">83,250</span></div>
<div class="fill-row fr-total"><span class="fl"><strong>SHAREHOLDERS' FUNDS</strong></span><span class="fa"><strong>548,250</strong></span></div>
</div>`,
        `<div class="concept-box cb-amber"><strong>Authorised vs Issued — common confusion:</strong><br>
• <strong>Authorised</strong> = max number of shares the company is allowed to issue (per its constitution). <strong>Note disclosure only — does NOT count in totals.</strong><br>
• <strong>Issued</strong> = shares actually sold to shareholders. <strong>Counts in Shareholders' Funds.</strong></div>
<div class="concept-box cb-amber"><strong>Revaluation Reserve appears when:</strong><br>
"Buildings to be revalued at €750,000" with cost of €600,000 → Revaluation Reserve increases by €150,000 (= 750,000 − 600,000). Buildings on BS now at €750,000 (revalued amount, not cost).</div>
<div class="concept-box cb-green"><strong>Capital Employed in Q5:</strong><br>
Capital Employed = Shareholders' Funds + Long-Term Debt (e.g. 10% Debentures)<br>
This MUST equal Total Net Assets (FA + WC).</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">A company has authorised 1,000,000 ord shares but has only issued 600,000. The BS shows:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">€1,000,000 in Shareholders' Funds</div><div class="quiz-opt" data-correct="true">€600,000 in Shareholders' Funds, with authorised 1m disclosed as a note</div><div class="quiz-opt" data-correct="false">€400,000 (the unissued amount)</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">P&amp;L Reserve c/f from the Appropriation A/c is shown:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">As a current asset</div><div class="quiz-opt" data-correct="true">In Reserves, within Shareholders' Funds</div><div class="quiz-opt" data-correct="false">As a long-term liability</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Capital Employed in a company =</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Shareholders' Funds + Long-Term Debt</div><div class="quiz-opt" data-correct="false">Just Shareholders' Funds</div><div class="quiz-opt" data-correct="false">Authorised Share Capital + Reserves</div></div></div>`,
      ],
    },
  ],
};
