import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LEARN_MODULES } from "@/data/studyContent";
import { ChevronRight, Check } from "lucide-react";

// Real lesson content keyed by module id and lesson index
const LESSON_CONTENT: Record<number, Record<number, string[][]>> = {
  1: { // Correction of Errors
    0: [ // Types of Errors
      ["There are **6 types of errors** in accounting. Some affect the trial balance, some don't.", "The trial balance only proves that total debits = total credits. It does NOT prove that entries are correct."],
      ["**Errors that DON'T affect the TB:**\n• Error of omission — transaction completely left out\n• Error of commission — correct amount, wrong personal account\n• Error of principle — correct amount, wrong class of account\n• Error of original entry — wrong amount on both sides\n• Compensating errors — two errors cancel each other out\n• Complete reversal of entries — debit and credit swapped"],
      ["**Errors that DO affect the TB:**\n• One side of entry omitted\n• Wrong amount on one side only\n• Entry made on same side twice\n• Balance incorrectly transferred\n\nThese create a difference → recorded in the Suspense Account."],
      ["**Key exam tip:** When a suspense account exists, always check if the error affects it. If both sides are wrong by the same amount, suspense is NOT affected."],
    ],
    1: [ // Suspense Account
      ["The **Suspense Account** is a temporary holding account created when the trial balance doesn't balance.", "Opening balance of suspense = the original difference in the trial balance."],
      ["**Rules for Suspense:**\n• If a debit was missing → credit Suspense\n• If a credit was missing → debit Suspense\n• If the wrong amount was posted on one side → adjust Suspense for the difference\n\nThe suspense account should have a zero balance after all corrections."],
      ["**Practice tip:** Draw the Suspense T-Account for every Q7. Start with the opening balance, then work through each correction. The closing balance should be zero."],
    ],
    2: [ // Correcting Journal Entries
      ["Every correction requires a **journal entry** showing the debit and credit.", "Format: Date | Account Name | Debit | Credit | Narration"],
      ["**Example:** Insurance €500 was debited to Purchases.\n• Dr Insurance €500 (correct account)\n• Cr Purchases €500 (remove from wrong account)\n• Narration: Correction of insurance wrongly debited to Purchases."],
      ["**Error of omission:** Both sides must be posted.\n**Error of commission:** Transfer between the two personal accounts.\n**Reversal of entries:** Double the amount (reverse + re-post)."],
      ["When writing journal entries in the exam:\n1. State what went wrong\n2. Show the correcting entry\n3. State the effect on profit\n4. State the effect on suspense (if applicable)"],
      ["**Common mistakes:**\n• Forgetting to state the effect on Net Profit\n• Not adjusting the Suspense Account when required\n• Treating errors of principle as errors of commission"],
    ],
    3: [ // Corrected Trial Balance
      ["After all corrections, the trial balance should balance.", "Any remaining difference = more errors to find."],
      ["**Steps:**\n1. Start with the original trial balance figures\n2. Add/subtract each adjustment\n3. Show the corrected figure for each account\n4. Verify total debits = total credits"],
      ["**Tip:** The corrected trial balance is often worth 8-10 marks. Show every adjustment clearly — examiners give marks for the workings, not just the final figure."],
    ],
    4: [ // Corrected P&L & Balance Sheet
      ["The **Corrected Statement of Profit** starts with the original Net Profit and adjusts for each error.", "Format: Original NP ± adjustments = Corrected NP"],
      ["**Rules:**\n• Expense overstated → add back (increases NP)\n• Expense understated → deduct (decreases NP)\n• Income overstated → deduct\n• Income understated → add back\n• Capital items don't affect NP"],
      ["The **Corrected Balance Sheet** shows the effect of each correction on assets, liabilities, and capital.", "Every adjustment that changes NP also changes Capital by the same amount."],
      ["**Exam tip:** Always verify that the corrected BS balances. Total Assets = Capital + Liabilities after all adjustments."],
    ],
    5: [ // Practice Questions
      ["Work through at least 3 past paper Q7s under timed conditions (35 minutes each).", "Key papers: 2024, 2023, 2022, 2019, 2018."],
      ["Focus areas:\n• Bad debt recovered with reinstatement\n• Van disposal entered as cash sale\n• Private debt offset against business creditor\n• Wages paid to owner's family member"],
      ["**Self-assessment:** After each practice, score yourself:\n• Did you identify all errors correctly?\n• Did every journal entry have a narration?\n• Did your suspense account close to zero?"],
    ],
  },
  2: { // Club Accounts
    0: [
      ["The **Accumulated Fund** is the club's equivalent of Capital. It's found by preparing an Opening Statement of Affairs (Balance Sheet).", "Formula: Opening Assets − Opening Liabilities = Accumulated Fund"],
      ["**Common opening items:**\n• Assets: Equipment (NBV), Stock, Subscriptions Due, Bank, Cash\n• Liabilities: Creditors, Subscriptions in Advance, Loans"],
      ["**Exam tip:** The opening balance sheet is usually worth 8-10 marks. Don't skip any items — even small ones like petty cash."],
    ],
    1: [
      ["The **Subscriptions Account** must be prepared on an accruals basis.", "This means recognising subscriptions when they're DUE, not when cash is received."],
      ["**T-Account structure:**\nDebit side: Opening due, I&E (balancing figure)\nCredit side: Bank (actual cash received), Closing in advance, Closing due"],
      ["**Key adjustments:**\n• Subscriptions due = debtors (current asset)\n• Subscriptions in advance = creditors (current liability)\n• Write-off of irrecoverable subs = reduce the debtor"],
      ["**Warning:** Students often get the subscriptions account backwards. Remember:\n• Due at START goes on the debit side\n• In advance at START goes on the credit side\n• The I&E figure is the BALANCING figure"],
    ],
    2: [
      ["Clubs often run special events (draws, concerts, fundraisers). These need their own **Special Purpose P&L**.", "Net profit/loss transfers to the I&E account."],
      ["**Format:**\nIncome from event: X\nLess: Expenses of event: (X)\n= Profit/(Loss) on event: X"],
      ["**Tip:** Keep event items separate from the main I&E. Only the NET result appears in I&E."],
    ],
    3: [
      ["The **Income & Expenditure Account** is the club's equivalent of the P&L.", "Surplus = Income > Expenditure. Deficit = Expenditure > Income."],
      ["**Income side:**\n• Subscriptions (from subs account — accruals basis)\n• Profit on special events\n• Investment income\n• Fundraising income\n• Rent received"],
      ["**Expenditure side:**\n• Wages, rent, insurance, light & heat\n• Repairs, depreciation\n• Printing & stationery\n• Loss on special events\n• Any other running costs"],
      ["**Key rule:** Only revenue items go in I&E. Capital items (purchase of equipment, loans received) go straight to the Balance Sheet."],
      ["**Depreciation:** Always check whether to depreciate newly purchased assets. Calculate from date of purchase if mid-year."],
    ],
    4: [
      ["The **Closing Balance Sheet** shows the club's financial position at year end.", "Format mirrors a sole trader BS but uses different terminology."],
      ["**Key differences from sole trader:**\n• Capital → Accumulated Fund\n• Net Profit → Surplus/Deficit\n• No Drawings in a club\n• May have Levy Fund, Life Membership Fund (long-term liabilities)"],
      ["**Accumulated Fund section:**\nOpening Accumulated Fund: X\nAdd: Surplus for year: X\n= Closing Accumulated Fund: X"],
    ],
    5: [
      ["**Levy Fund:** Money collected from members for a specific purpose (e.g., building fund). It's a long-term liability until spent.", "If the levy is spent during the year, reduce the fund and show the asset purchased."],
      ["**Life Membership:** A one-off payment for lifetime membership. Treated as a long-term liability (capital receipt).", "Some clubs amortise it over 5-10 years — transferring a portion to I&E annually."],
      ["**Exam tip:** Life membership is NOT subscription income. It goes to the Balance Sheet as a separate fund."],
    ],
    6: [
      ["Practice Q2 from these papers: 2024, 2023, 2022, 2019, 2017.", "Focus on getting the subscriptions account right — it's where most marks are lost."],
      ["**Time allocation:** You have 46 minutes for each Section 2 question. Spend:\n• 8 min on opening statement\n• 10 min on subscriptions account\n• 5 min on special event P&L\n• 15 min on I&E\n• 8 min on closing BS"],
    ],
  },
  3: { // Service Firm
    0: [
      ["A **Service Firm** (solicitor, accountant, architect) has no stock — it sells services, not goods.", "The starting point is the Statement of Capital (opening BS)."],
      ["**Statement of Capital:**\nOpening Assets − Opening Liabilities = Opening Capital\nThis is identical to the Accumulated Fund concept in clubs."],
      ["**Key items:** Office equipment, motor vehicles, fees due, prepayments, bank, cash, creditors, accruals, loans."],
    ],
    1: [
      ["**Fee Income** is the main revenue source. It must be adjusted for:\n• Fees due (debtor — earned but not received)\n• Fees in advance (liability — received but not earned)", "The fee income figure in the I&E is on an accruals basis."],
      ["**Fee Income T-Account:**\nDebit: I&E (balancing figure)\nCredit: Bank (cash received), Opening due, Closing in advance"],
      ["**Other income sources:**\n• Commission received\n• Rent from sub-letting\n• Investment income"],
      ["**Exam tip:** The fee income calculation is worth 6-8 marks. Show the T-account clearly."],
    ],
    2: [
      ["The **Income & Expenditure Account** (or Profit & Loss) shows whether the firm made a profit.", "There's NO Trading Account — service firms have no cost of sales."],
      ["**Format:**\nFee Income: X\nLess: Expenses\n  Salaries: (X)\n  Rent: (X)\n  Insurance: (X)\n  Depreciation: (X)\n  etc.\n= Net Profit/(Loss): X"],
      ["All expenses must be on an accruals basis:\n• Prepayments reduce the expense\n• Accruals increase the expense"],
      ["**Bad debts:** If a client doesn't pay their fees, write it off as a bad debt. Also create a provision for doubtful debts if instructed."],
    ],
    3: [
      ["The **Closing Balance Sheet** follows the standard format.", "Total Net Assets must equal Closing Capital."],
      ["**Closing Capital:**\nOpening Capital: X\nAdd: Net Profit: X\nLess: Drawings: (X)\n= Closing Capital: X"],
      ["**Tip:** Don't forget to adjust for any capital introduced during the year."],
    ],
    4: [
      ["**Depreciation** of office equipment and motor vehicles is a common adjustment.", "Methods: Straight Line or Reducing Balance."],
      ["**Other adjustments:**\n• Bad debts write-off\n• Provision for bad debts\n• Prepayments and accruals\n• Disposal of fixed assets"],
      ["**Disposal:** If a car is traded in, you need to calculate the profit/loss on disposal:\nNBV = Cost − Accumulated Depreciation\nProfit/Loss = Sale Proceeds − NBV"],
      ["**Exam tip:** Show all depreciation calculations as workings. Examiners award marks for the method, not just the answer."],
    ],
    5: [
      ["Practice Q2/Q3 from papers where service firms appear: 2024, 2022, 2020, 2018.", "Focus on the fee income calculation and adjustments."],
      ["**Checklist:**\n□ Opening Statement of Capital\n□ Fee Income T-Account\n□ All expenses adjusted (prepayments/accruals)\n□ Depreciation calculated\n□ I&E completed\n□ Closing BS balances"],
    ],
  },
  4: { // Published Accounts
    0: [
      ["**Published Accounts** are prepared by companies (PLCs and Ltd companies) under the Companies Act.", "They follow a prescribed format set out in legislation."],
      ["**Key differences from sole trader accounts:**\n• Must show comparative figures (this year AND last year)\n• Cost of Sales is shown as one figure (not itemised)\n• Expenses grouped into Distribution Costs and Administrative Expenses\n• Notes to the accounts provide detail"],
      ["**Three main statements:**\n1. Published Trading, Profit & Loss Account\n2. Published Balance Sheet\n3. Notes to the Accounts"],
    ],
    1: [
      ["**Published P&L format:**\nTurnover: X\nCost of Sales: (X)\nGross Profit: X\nDistribution Costs: (X)\nAdministrative Expenses: (X)\nOperating Profit: X"],
      ["**Below Operating Profit:**\n• Investment Income: X\n• Interest Payable: (X)\n• Profit Before Tax: X\n• Corporation Tax: (X)\n• Profit After Tax: X"],
      ["**Distribution Costs** include: Carriage out, advertising, sales salaries, delivery costs, sales commission.", "**Administrative Expenses** include: Office salaries, rent, insurance, depreciation, bad debts, audit fee, directors' fees."],
      ["**Appropriation Account:**\nProfit After Tax: X\nLess: Dividends (Interim + Final): (X)\nLess: Transfer to Reserves: (X)\n= Retained Profit: X"],
      ["**Exam tip:** You must classify EVERY expense as either Distribution or Admin. If unsure, it's usually Admin."],
    ],
    2: [
      ["**Published Balance Sheet** must show:\n• Fixed Assets (intangible + tangible + financial)\n• Current Assets\n• Creditors < 1 year\n• Net Current Assets\n• Creditors > 1 year\n• Net Assets\n• Capital & Reserves"],
      ["**Fixed Assets are shown at NBV:**\n• Cost: X\n• Less: Accumulated Depreciation: (X)\n• = NBV: X\n\nThis detail goes in the Notes."],
      ["**Current Assets:** Stock, Debtors, Cash\n**Creditors < 1 year:** Creditors, Bank overdraft, Tax, Proposed dividends\n**Creditors > 1 year:** Debentures, Long-term loans"],
      ["**Capital & Reserves:**\n• Called-up Share Capital (Ordinary + Preference)\n• Share Premium\n• Revaluation Reserve\n• Profit & Loss Account (retained profits)"],
      ["**Golden rule:** Net Assets = Shareholders' Funds. If they don't match, you have an error."],
    ],
    3: [
      ["**Notes to the accounts** provide additional detail required by law.", "Common notes: Fixed assets (cost, dep, NBV), Creditors, Share capital, Reserves."],
      ["**Note on Fixed Assets (N3):**\nShows cost at start, additions, disposals, cost at end.\nShows dep at start, charge for year, disposals, dep at end.\nNBV at start and end."],
      ["**Other notes:**\n• N1: Accounting policies\n• N2: Turnover analysis\n• N4: Debentures (interest rate, redemption date)\n• N5: Share capital (authorised vs issued)"],
      ["**Exam tip:** Notes are worth 8-12 marks. The fixed asset note alone can be worth 6 marks. Don't skip it."],
    ],
    4: [
      ["**Audit Report:** States whether accounts give a 'true and fair view'. Must mention if accounts comply with the Companies Act.", "Types: Unqualified (clean), Qualified (issues found), Adverse (major problems)."],
      ["**Directors' Report** must include:\n• Review of business performance\n• Dividends recommended\n• Directors' names and shareholdings\n• Future outlook"],
      ["**Exam tip:** Theory questions on audit reports and directors' reports appear regularly. Know the key contents of each."],
    ],
    5: [
      ["Practice Q4 from: 2024, 2023, 2022, 2021, 2019, 2018.", "Published accounts appear every year as Q4. Master the format and you're guaranteed marks."],
      ["**Time allocation (46 min):**\n• Published P&L: 15 min\n• Published BS: 15 min\n• Notes: 10 min\n• Theory/Directors Report: 6 min"],
    ],
  },
  5: { // Cash Flow Statement
    0: [
      ["A **Cash Flow Statement** explains WHY the cash/bank balance changed during the year.", "Profit ≠ Cash. A profitable business can still run out of cash."],
      ["**Reasons profit ≠ cash:**\n• Depreciation is a non-cash expense\n• Credit sales increase debtors (not cash)\n• Stock purchases use cash before sales happen\n• Fixed asset purchases use cash but aren't P&L expenses"],
      ["The cash flow statement has **4 sections:**\n1. Operating Activities\n2. Returns on Investments & Servicing of Finance\n3. Capital Expenditure\n4. Financing Activities"],
    ],
    1: [
      ["**Operating Activities** = Cash generated from normal trading.", "Start with Operating Profit, then adjust for non-cash items."],
      ["**Adjustments:**\n• Add back Depreciation (non-cash expense)\n• Add back Loss on Disposal (non-cash)\n• Deduct Profit on Disposal\n• Adjust for changes in Stock, Debtors, Creditors"],
      ["**Working Capital changes:**\n• Stock INCREASE → subtract (used cash to buy stock)\n• Stock DECREASE → add (converted stock to cash)\n• Debtors INCREASE → subtract (cash tied up in debtors)\n• Creditors INCREASE → add (delayed paying = saved cash)"],
      ["**Memory aid:** If an asset increases, it's BAD for cash (subtract). If a liability increases, it's GOOD for cash (add)."],
    ],
    2: [
      ["**Returns on Investments & Servicing of Finance:**\n• Interest received: + cash\n• Interest paid: − cash\n• Dividends received: + cash\n• Dividends paid: − cash"],
      ["**Important:** Use dividends PAID, not dividends proposed. Check if last year's proposed dividend was paid this year."],
      ["**Tip:** Investment income received may differ from the P&L figure if there's income due/in advance."],
    ],
    3: [
      ["**Capital Expenditure:**\n• Purchase of fixed assets: − cash\n• Sale of fixed assets: + cash (use PROCEEDS, not NBV)", "Use the actual cash spent/received, not the P&L figures."],
      ["**Finding the purchase figure:**\nIf not given directly:\nClosing Cost = Opening Cost + Purchases − Disposals\nSo: Purchases = Closing − Opening + Disposals at cost"],
      ["**Financing Activities:**\n• Issue of shares: + cash\n• Repayment of loans: − cash\n• New loans received: + cash\n• Redemption of debentures: − cash"],
      ["**Tip:** Share premium received on issue of shares counts as cash inflow under financing."],
    ],
    4: [
      ["**Reconciliation of Net Cash Flow to Movement in Net Debt:**\nOpening cash/bank: X\nNet cash flow for year: X/(X)\n= Closing cash/bank: X", "This must agree with the Balance Sheet bank figure."],
      ["**Net Debt = Cash − Borrowings.** The reconciliation shows how net debt changed.\nOpening net debt → Cash flow → Closing net debt"],
      ["**Exam tip:** The reconciliation is usually worth 4-6 marks. It's straightforward — don't leave it blank even if you're running out of time."],
    ],
    5: [
      ["Practice Q3 from: 2024, 2023, 2022, 2021, 2019.", "Cash flow statements appear frequently as Q3 in Section 2."],
      ["**Common mistakes to avoid:**\n• Using accruals figures instead of cash figures\n• Getting stock/debtors/creditors adjustments backwards\n• Forgetting to add back depreciation\n• Using NBV instead of sale proceeds for disposals"],
    ],
  },
};

export default function LearnPage() {
  const [progress, setProgress] = useLocalStorage<Record<string, number>>("lc-learn-progress", {});
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const mod = activeModule !== null ? LEARN_MODULES[activeModule] : null;

  const getModuleProgress = (m: typeof LEARN_MODULES[0]) => {
    const totalSteps = m.lessons.reduce((s, l) => s + l.steps, 0);
    const completed = m.lessons.reduce((s, l, i) => s + (progress[`${m.id}-${i}`] || 0), 0);
    return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
  };

  const completeStep = () => {
    if (!mod) return;
    const key = `${mod.id}-${activeLesson}`;
    const current = progress[key] || 0;
    const lesson = mod.lessons[activeLesson];
    if (activeStep >= current) {
      setProgress(prev => ({ ...prev, [key]: Math.min(activeStep + 1, lesson.steps) }));
    }
    if (activeStep < lesson.steps - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeLesson < mod.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setActiveStep(0);
    }
  };

  if (mod) {
    const lesson = mod.lessons[activeLesson];
    const lessonContent = LESSON_CONTENT[mod.id]?.[activeLesson]?.[activeStep];

    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
        <Button variant="outline" size="sm" className="text-xs mb-4" onClick={() => { setActiveModule(null); setActiveLesson(0); setActiveStep(0); }}>
          ← Back to Modules
        </Button>
        <div className="flex items-center gap-3 mb-6">
          <mod.icon className="h-7 w-7 shrink-0" style={{ color: mod.color }} />
          <div>
            <h1 className="font-display text-xl font-bold">{mod.title}</h1>
            <p className="text-xs text-muted-foreground">{mod.lessons.length} lessons · {mod.lessons.reduce((s, l) => s + l.steps, 0)} steps</p>
          </div>
        </div>

        {/* Lesson sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <div className="space-y-1">
            {mod.lessons.map((l, i) => {
              const lProgress = progress[`${mod.id}-${i}`] || 0;
              const isComplete = lProgress >= l.steps;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveLesson(i); setActiveStep(0); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                    i === activeLesson ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {isComplete ? <Check className="h-3.5 w-3.5 text-green-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-current shrink-0 flex items-center justify-center text-[8px]">{i + 1}</span>}
                  <span className="truncate">{l.title}</span>
                </button>
              );
            })}
          </div>

          {/* Lesson content area */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-bold">{lesson.title}</h2>
                <Badge variant="outline" className="text-[10px] font-mono">{activeStep + 1} / {lesson.steps}</Badge>
              </div>
              <Progress value={(activeStep / lesson.steps) * 100} className="h-1.5 mb-6" />

              {/* Step content — real educational content */}
              <div className="bg-muted/30 rounded-lg p-5 mb-6 min-h-[200px]">
                {lessonContent ? (
                  <div className="space-y-3">
                    {lessonContent.map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
                        {paragraph.split(/(\*\*.*?\*\*)/).map((part, j) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-2">Step {activeStep + 1} of {lesson.steps}</p>
                    <p className="font-display text-lg font-bold mb-1">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">Content for {mod.title} · Real SEC data from 2022–2025 papers</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
                  ← Previous
                </Button>
                <Button size="sm" className="text-xs" onClick={completeStep}>
                  {activeStep < lesson.steps - 1 ? "Next Step →" : activeLesson < mod.lessons.length - 1 ? "Next Lesson →" : "Complete Module ✓"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Learn Mode</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        5 interactive modules with {LEARN_MODULES.reduce((s, m) => s + m.lessons.length, 0)} lessons and {LEARN_MODULES.reduce((s, m) => s + m.lessons.reduce((ss, l) => ss + l.steps, 0), 0)} steps. Build each account from scratch using real SEC data.
      </p>

      <div className="space-y-4">
        {LEARN_MODULES.map((m, i) => {
          const pct = getModuleProgress(m);
          return (
            <Card key={m.id} className="cursor-pointer hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: m.color }} onClick={() => setActiveModule(i)}>
              <CardContent className="p-5 flex items-center gap-4">
                <m.icon className="h-7 w-7 shrink-0" style={{ color: m.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-sm font-bold">{m.title}</h3>
                    {pct === 100 && <Badge className="bg-green-600 text-white text-[9px]">Complete</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{m.lessons.length} lessons · {m.lessons.reduce((s, l) => s + l.steps, 0)} steps</p>
                  <Progress value={pct} className="h-1.5 mt-2" />
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-lg font-bold" style={{ color: m.color }}>{pct}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
