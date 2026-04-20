import type { LearnModuleDef } from "../learnContent.types";

export const MODULE: LearnModuleDef = {
  id: "exam-technique",
  name: "Exam Technique & Booklet",
  icon: "GraduationCap",
  category: "exam-skills",
  tagline: "Master the answer booklet, method marks, and the order of attack.",
  lessons: [
    {
      t: "Anatomy of the LC Paper",
      steps: [
        `<div class="concept-box cb-blue"><strong>180 minutes. 400 marks. 9 questions across 3 sections.</strong> Knowing the structure is half the battle — students who walk in knowing exactly which questions to attempt save 10–15 minutes of decision time.</div>
<table style="width:100%;border-collapse:collapse;font-size:11px;margin-top:8px">
<tr style="background:hsl(var(--muted))"><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Section</th><th style="padding:6px;border:1px solid hsl(var(--border))">Questions</th><th style="padding:6px;border:1px solid hsl(var(--border))">Marks</th><th style="padding:6px;border:1px solid hsl(var(--border))">Time</th></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Section 1</strong> — Financial Accounting</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">Q1 (compulsory) <em>OR</em> any 2 of Q2–Q4</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">120</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">54 min</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Section 2</strong> — Financial A/c &amp; Reporting</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">Any 2 of Q5, Q6, Q7</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">2 × 100 = 200</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">90 min</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Section 3</strong> — Management Accounting</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">Any 1 of Q8, Q9</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">80</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">36 min</td></tr>
</table>
<div class="concept-box cb-amber" style="margin-top:8px"><strong>Time-per-mark rule:</strong> 180 ÷ 400 = <strong>0.45 minutes per mark</strong>. So a 120-mark Q1 = 54 min, a 100-mark Q5 = 45 min, a 60-mark Q6 part = 27 min. Write these on your scratchpad before starting any question.</div>`,
        `<div class="concept-box cb-blue"><strong>The Q1 vs Q2/3/4 choice</strong> is the single biggest strategic decision you make. Q1 is worth 120 marks (30% of the entire paper) — almost always a sole-trader or company final accounts.</div>
<div class="yes-no-grid">
<div class="yn-box yn-yes"><strong>Choose Q1 if:</strong><br>• You're confident with depreciation, accruals, prepayments, bad debts<br>• You can comfortably draw a Trading + P&amp;L + BS in 50 min<br>• You've drilled at least 5 past Q1s</div>
<div class="yn-box yn-no"><strong>Choose 2 from Q2/Q3/Q4 if:</strong><br>• You're shaky on big set-piece final accounts<br>• You're strong on bookkeeping (Q2), club/service/farm/incomplete records (Q3) or tabular statements (Q4)<br>• You've practiced these alternatives</div>
</div>
<div class="concept-box cb-red" style="margin-top:8px"><strong>Most candidates do Q1.</strong> The marking is generous on layout and presentation, and the topics are highly predictable. Unless your teacher has specifically prepared you for Q2+Q3 or Q3+Q4, default to Q1.</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">How many minutes should you spend on a 100-mark question?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">30 minutes</div><div class="quiz-opt" data-correct="true">45 minutes (100 × 0.45)</div><div class="quiz-opt" data-correct="false">60 minutes</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Section 2 (Q5–Q7) requires you to attempt:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">All three questions</div><div class="quiz-opt" data-correct="true">Any two of the three</div><div class="quiz-opt" data-correct="false">Q5 is compulsory</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">If you do Q1 (120) + 2 × Q5/6/7 (200) + 1 × Q8/9 (80), total marks attempted =</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">400 marks (the full paper)</div><div class="quiz-opt" data-correct="false">300 marks</div><div class="quiz-opt" data-correct="false">320 marks</div></div></div>`,
      ],
    },
    {
      t: "Answering Backwards (the David Wilson method)",
      steps: [
        `<div class="concept-box cb-blue"><strong>Most students attempt the paper in order: Q1 first, then Q5, then Q8.</strong> This is the worst possible strategy. Q1 is the longest, hardest question — and after 50 minutes of it, you are mentally fried for everything else.</div>
<div class="concept-box cb-green"><strong>The David Wilson order of attack:</strong><br>
<strong>1. Q8 or Q9</strong> (Management Accounting — 36 min)<br>
<strong>2. Two of Q5/Q6/Q7</strong> (Section 2 — 90 min)<br>
<strong>3. Q1</strong> (Section 1 — 54 min)<br><br>
<strong>Why this works:</strong><br>
• Q8/Q9 are short, formulaic, low-stakes. Banking 80 marks early gives you confidence.<br>
• Section 2 questions are smaller (100 marks each) — you can pace easily.<br>
• Q1 last means even if you run out of time, you've already secured 280 marks.</div>`,
        `<div class="concept-box cb-amber"><strong>The "running out of time" maths.</strong><br><br>
Suppose you have 15 minutes left and Q1's Balance Sheet still to do.<br><br>
<strong>If you attempted Q1 first:</strong> you have 0 minutes for the BS = lose ~25 marks. Total maybe ~340/400.<br>
<strong>If you attempted Q1 last:</strong> you've already secured 280 marks from earlier, and even a rushed BS gets you 10–15 marks. Total ~310/400.<br><br>
But more importantly — <strong>you'd have spotted the time risk earlier</strong> and rushed strategically (e.g. abandoned the marginal-mark workings on Q7 to bank the BS on Q1).</div>
<div class="concept-box cb-red"><strong>The cardinal rule:</strong> never finish the exam with marks left unattempted. A half-finished BS scores. A blank page scores zero.</div>`,
        `<div class="concept-box cb-blue"><strong>How to actually open the paper:</strong><br><br>
<strong>Minute 0–5:</strong> Read every question header (just the topic, not the detail). Mark the questions you'll attempt.<br>
<strong>Minute 5–8:</strong> Write the time budget on your scratchpad: "Q9: finish by 0:36. Q5: by 1:21. Q7: by 2:06. Q1: by 3:00."<br>
<strong>Minute 8 onwards:</strong> Start with your strongest Section 3 question.</div>
<div class="quiz-q"><div class="quiz-q-text">In the David Wilson order, which question do you attempt LAST?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Q1 (Section 1)</div><div class="quiz-opt" data-correct="false">Q8 or Q9</div><div class="quiz-opt" data-correct="false">Q5</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Why attempt Q8 or Q9 first?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">Short, formulaic — banks 80 marks early and builds confidence</div><div class="quiz-opt" data-correct="false">It's worth the most marks</div><div class="quiz-opt" data-correct="false">It's compulsory</div></div></div>`,
      ],
    },
    {
      t: "Using the Answer Booklet",
      steps: [
        `<div class="concept-box cb-blue"><strong>The answer booklet is a tool — use it correctly and the markers can find every mark you've earned.</strong> Use it badly and method marks slip away because the examiner can't follow your logic.</div>
<div class="concept-box cb-green"><strong>The folio system:</strong><br>
• Every page has a folio number at the top.<br>
• When you reference a working from the main answer, write <em>"see W3 fol. 7"</em>.<br>
• Markers will physically flip to fol. 7 to award the working marks. <strong>If you don't tell them where to look, they don't look.</strong></div>
<div class="concept-box cb-amber"><strong>The right-page rule:</strong> Many candidates spread the main answer across the LEFT page and put workings on the RIGHT page (or vice-versa). Either is fine — the rule is consistency. Pick one and stick to it for the entire paper.</div>`,
        `<div class="learn-t"><div class="learn-t-title">Standard answer-booklet layout for Q1 BS</div><div class="learn-t-body">
<div class="learn-t-side"><div class="learn-t-label">LEFT PAGE — Main answer</div>
<div class="learn-t-row"><span class="d">Premises (W1)</span><span class="a">450,000</span></div>
<div class="learn-t-row"><span class="d">Vans (W2)</span><span class="a">38,000</span></div>
<div class="learn-t-row"><span class="d">Equipment (W3)</span><span class="a">31,920</span></div>
<div class="learn-t-row"><span class="d">Stock</span><span class="a">47,100</span></div>
<div class="learn-t-row hl-b"><span class="d">Debtors (W4)</span><span class="a">3,825</span></div>
</div>
<div class="learn-t-side"><div class="learn-t-label">RIGHT PAGE — Workings</div>
<div class="learn-t-row"><span class="d"><strong>W4 — Debtors</strong></span><span class="a"></span></div>
<div class="learn-t-row"><span class="d">Per TB</span><span class="a">12,600</span></div>
<div class="learn-t-row"><span class="d">Less suspense</span><span class="a">(7,920)</span></div>
<div class="learn-t-row"><span class="d">Less van error</span><span class="a">(2,000)</span></div>
<div class="learn-t-row"><span class="d">Add bad debt</span><span class="a">225</span></div>
<div class="learn-t-row"><span class="d">Add CD Electrical</span><span class="a">920</span></div>
<div class="learn-t-row learn-t-total"><span class="d"><strong>= 3,825</strong></span><span class="a"></span></div>
</div>
</div></div>
<div class="concept-box cb-green"><strong>What earns the marks:</strong><br>
• "(W4)" beside the figure → marker knows there's a working<br>
• Working is clearly numbered and laid out as a list of adjustments<br>
• Final figure is highlighted/double-underlined and matches the main answer</div>`,
        `<div class="concept-box cb-red"><strong>5 booklet sins that lose marks:</strong><br>
1. <strong>Cramming workings into the margin</strong> — markers can't read them, no method marks.<br>
2. <strong>Erasing wrong figures</strong> — single line through, figure beside. Erased figures sometimes had method marks!<br>
3. <strong>Mixing two questions on one page</strong> — start each question on a new page.<br>
4. <strong>Forgetting to label workings (W1, W2…)</strong> — examiner can't link them to the main answer.<br>
5. <strong>Skipping the question number</strong> — "Q1(a)" at the top of every page.</div>
<div class="quiz-q"><div class="quiz-q-text">The "(W3)" notation beside a figure tells the marker:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">There is a numbered working — go find it for method marks</div><div class="quiz-opt" data-correct="false">The figure was added in pencil</div><div class="quiz-opt" data-correct="false">Working 3 was difficult</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">If you write a wrong figure, you should:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Scribble it out completely so it's unreadable</div><div class="quiz-opt" data-correct="true">Single line through, write correct figure beside — old figure may carry method marks</div><div class="quiz-opt" data-correct="false">Tear out the page and start again</div></div></div>`,
      ],
    },
    {
      t: "Method Marks & Show Your Workings",
      steps: [
        `<div class="concept-box cb-blue"><strong>Every Leaving Cert Accounting question is marked using both <em>accuracy marks</em> (right answer) AND <em>method marks</em> (right approach, even if the figure is wrong).</strong> Showing workings is the difference between 0 and 6 on a 7-mark figure.</div>
<div class="concept-box cb-amber"><strong>Worked example — depreciation working:</strong><br><br>
Question gives: Equipment cost €60,000, accumulated dep €15,000, rate 12.5% reducing balance.<br><br>
<strong>Bad answer (0–2 marks):</strong> "Depreciation = €5,625"<br>
<strong>Good answer (full marks even if final figure wrong):</strong><br>
<em>W2 — Equipment Depreciation</em><br>
NBV = 60,000 − 15,000 = 45,000<br>
Charge = 45,000 × 12.5% = €5,625<br><br>
Even if you typed 60,000 × 12.5% = 7,500 (wrong base), you'd still get the method marks for showing the formula.</div>`,
        `<div class="concept-box cb-green"><strong>The "carried-forward error" rule.</strong> If you compute something wrong early on and then USE that wrong figure consistently in later parts, you only lose the marks for that one figure. The marker will award all subsequent figures as long as the arithmetic is internally consistent.<br><br>
<strong>Example:</strong> You compute net profit as €50,000 (correct = €52,000). When you carry €50,000 into the BS Capital section and into the corrected BS, you get FULL marks on the BS — only the €2,000 difference is lost.<br><br>
This is why <strong>showing workings is non-negotiable</strong>: it makes your work "internally consistent" and unlocks carried-forward marks.</div>`,
        `<div class="concept-box cb-red"><strong>The "no working = no mark" topics</strong> where examiners are especially strict:<br>
• Any depreciation figure → must show NBV calculation<br>
• Bad debts provision → must show debtors × rate<br>
• Subscriptions in club accounts → must show full W6 strip-out<br>
• Loan + interest split → must show 1.06 division<br>
• Stock valuation (cost vs NRV) → must show the comparison<br>
• Capital opening figure (incomplete records) → must show A − L</div>
<div class="quiz-q"><div class="quiz-q-text">You compute net profit as €48,000 (correct = €51,000). You carry €48,000 into the BS. The BS balances internally. How are you marked?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">All BS marks lost</div><div class="quiz-opt" data-correct="true">Lose only the €3,000 NP error — full BS marks via carried-forward rule</div><div class="quiz-opt" data-correct="false">No marks unless the BS shows €51,000</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">Best practice when stating a depreciation charge:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Just write the final figure</div><div class="quiz-opt" data-correct="true">Show: NBV = Cost − Acc Dep, then Charge = NBV × rate</div><div class="quiz-opt" data-correct="false">Show only the rate</div></div></div>`,
      ],
    },
    {
      t: "Action Verbs — What the Examiner Wants",
      steps: [
        `<div class="concept-box cb-blue"><strong>Theory questions (Q5b, Q7e, Q8c, Q9b) use a small set of "action verbs" that tell you exactly the depth of answer expected.</strong> Misreading the verb is the #1 reason students under- or over-answer theory parts.</div>
<table style="width:100%;border-collapse:collapse;font-size:11px">
<tr style="background:hsl(var(--muted))"><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Verb</th><th style="padding:6px;border:1px solid hsl(var(--border))">What it asks for</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:center">Length</th></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>State</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Bullet point. No explanation needed.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">1 line</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>List / Name</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Just identify items — no detail.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">1 line each</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Define</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Textbook definition. Often quotable.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">1–2 lines</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Outline / Describe</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Brief explanation of how it works.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">2–3 lines</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Explain</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Define + give the reasoning <em>why</em>.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">3–4 lines</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Distinguish</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Compare two terms point-by-point.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">4–6 lines</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Discuss</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Pros AND cons or multiple angles.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">6–10 lines</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))"><strong>Comment on</strong></td><td style="padding:6px;border:1px solid hsl(var(--border))">Quote the figure, say good/bad, give 1 reason.</td><td style="padding:6px;border:1px solid hsl(var(--border));text-align:center">2–3 lines per point</td></tr>
</table>`,
        `<div class="concept-box cb-green"><strong>The other 8 verbs you'll see:</strong><br><br>
<strong>Calculate</strong> — show the working AND the final figure.<br>
<strong>Show</strong> — present in the requested format (e.g. as a T-account).<br>
<strong>Prepare</strong> — full statement with proper headings, dates, totals.<br>
<strong>Identify</strong> — point out items from a given list/scenario.<br>
<strong>Suggest / Recommend</strong> — give your opinion + justify it.<br>
<strong>Evaluate / Assess</strong> — weigh up + reach a conclusion.<br>
<strong>Justify</strong> — give reasons supporting a decision.<br>
<strong>Advise</strong> — give a recommendation with reasoning ("I would advise X because Y").</div>
<div class="concept-box cb-amber"><strong>The interpretation gold-standard answer template:</strong><br><br>
"<em>The [ratio name]</em> has [increased/decreased] from [last year figure] to [this year figure]. This indicates [what it means in plain English]. This is [favourable/unfavourable] because [business reason]. I would [recommend / not recommend] [action] because [link back to the figure]."<br><br>
Hit all 4 components and you score full marks every time.</div>`,
        `<div class="quiz-q"><div class="quiz-q-text">A 4-mark question says "Outline TWO advantages…". You should write:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">A one-word bullet for each</div><div class="quiz-opt" data-correct="true">Two short paragraphs (2–3 lines each) briefly explaining</div><div class="quiz-opt" data-correct="false">A single full essay covering both</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">"Distinguish between Capital Expenditure and Revenue Expenditure" — the best structure is:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Define each in isolation</div><div class="quiz-opt" data-correct="true">Point-by-point contrast (purpose, balance sheet vs P&amp;L, examples)</div><div class="quiz-opt" data-correct="false">List 3 examples of each only</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">A "Comment on liquidity" answer should always include:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">The current/quick ratio figure + good or bad + reason</div><div class="quiz-opt" data-correct="false">A definition of liquidity only</div><div class="quiz-opt" data-correct="false">All four ratio categories</div></div></div>`,
      ],
    },
    {
      t: "Common SEC Trap Phrases",
      steps: [
        `<div class="concept-box cb-blue"><strong>Examiners use specific phrases to signal exactly what kind of error or adjustment is being tested.</strong> Once you recognise the phrase, the journal entry writes itself.</div>
<table style="width:100%;border-collapse:collapse;font-size:11px">
<tr style="background:hsl(var(--muted))"><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">Phrase in question</th><th style="padding:6px;border:1px solid hsl(var(--border));text-align:left">What it means</th></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"No entry had been made"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Complete omission — record both Dr &amp; Cr</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"This had not been recorded"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Same — complete omission</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">"Posted to the wrong side"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Reversal — fix is 2× the amount</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"Treated as / debited to [wrong account]"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Error of principle (often)</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">"Cheque returned/dishonoured"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Bank rec — Dr Debtors, Cr Bank</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"Standing order / direct debit"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Bank rec adjustment to cash book</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">"On 1 April" (mid-year date)</td><td style="padding:6px;border:1px solid hsl(var(--border))">Pro-rata depreciation — count months</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"Of which / including"</td><td style="padding:6px;border:1px solid hsl(var(--border))">A figure embedded inside another (extract it)</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">"Including suspense"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Suspense balance is buried in debtors/creditors</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"Net of VAT" / "Inclusive of VAT"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Always check — split the figure with VAT formula</td></tr>
<tr style="background:hsl(var(--muted)/0.4)"><td style="padding:6px;border:1px solid hsl(var(--border))">"Authorised / Issued capital"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Note disclosure only — issued goes in BS</td></tr>
<tr><td style="padding:6px;border:1px solid hsl(var(--border))">"Proposed dividend"</td><td style="padding:6px;border:1px solid hsl(var(--border))">Goes in Appropriation A/c &amp; current liabilities</td></tr>
</table>`,
        `<div class="concept-box cb-amber"><strong>The "carriage" trap.</strong> Many candidates miss this:<br>
• <strong>Carriage <em>inwards</em></strong> → goes in <strong>Trading Account</strong> (added to purchases)<br>
• <strong>Carriage <em>outwards</em></strong> → goes in <strong>P&amp;L Account</strong> (selling expense)</div>
<div class="concept-box cb-amber"><strong>The "discount" trap.</strong><br>
• <strong>Discount allowed</strong> → P&amp;L EXPENSE (you allow customers a discount → costs you)<br>
• <strong>Discount received</strong> → P&amp;L INCOME (suppliers give you a discount → benefits you)</div>
<div class="concept-box cb-amber"><strong>The "returns" trap.</strong><br>
• <strong>Sales returns / Returns inwards</strong> → DEDUCT from Sales in Trading A/c<br>
• <strong>Purchases returns / Returns outwards</strong> → DEDUCT from Purchases in Trading A/c</div>`,
        `<div class="concept-box cb-red"><strong>The capital-vs-revenue trap.</strong> The single most common Q1/Q5 trap:<br><br>
"<em>Repairs to premises €8,000 includes €3,500 for an extension to the warehouse.</em>"<br><br>
The €3,500 is <strong>capital</strong> (asset improvement) and must be:<br>
• REMOVED from Repairs (P&amp;L) → reduce by 3,500<br>
• ADDED to Premises (BS) → increase by 3,500<br>
• Often subject to extra depreciation if mid-year</div>
<div class="quiz-q"><div class="quiz-q-text">"Carriage outwards €1,200" goes in:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">Trading Account (added to purchases)</div><div class="quiz-opt" data-correct="true">P&amp;L Account (selling expense)</div><div class="quiz-opt" data-correct="false">Balance Sheet (current liability)</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">"Discount allowed €450" is a:</div><div class="quiz-opts"><div class="quiz-opt" data-correct="true">P&amp;L expense — discount you give customers</div><div class="quiz-opt" data-correct="false">P&amp;L income — discount suppliers give you</div><div class="quiz-opt" data-correct="false">Reduction in sales</div></div></div>
<div class="quiz-q"><div class="quiz-q-text">"Repairs €5,000 includes €2,000 for a new garage extension." Treatment?</div><div class="quiz-opts"><div class="quiz-opt" data-correct="false">All €5,000 goes in P&amp;L repairs</div><div class="quiz-opt" data-correct="true">Reduce repairs to €3,000; add €2,000 to Premises (capital expenditure)</div><div class="quiz-opt" data-correct="false">Ignore the €2,000</div></div></div>`,
      ],
    },
  ],
};
