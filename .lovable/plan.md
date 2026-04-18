

## Audit summary

**Sources reviewed**
- SEC Leaving Cert Accounting syllabus (the official one) — full read.
- Folens *Accounting Manual* (Kevin O'Riordan) — chapter list + 50 pages of solutions read; matches the SEC syllabus 1:1.
- *Accounting for Senior Cycle* textbook — image-only PDF, would need OCR pass to mine fully (flagged below).

**Coverage today**: 24 chapters in `theoryChapters.ts` map cleanly onto the SEC syllabus sections 8.1–8.11. Block A→D structure is sound. Where the app already does well: Final Accounts, Workings, Predictions, Ratios.

**Gaps found vs the SEC syllabus + manual**

| # | SEC syllabus area | Status in app | Gap |
|---|---|---|---|
| 1 | 8.1 Conceptual framework — SSAP 2, true & fair view, role of auditor, regulatory bodies (Govt, EU, profession, Stock Exchange) | Ch 1 + Ch 8 cover concepts & audit | Thin on EU + Stock Exchange regulation, monitoring procedures, and the explicit SSAP 2 framing |
| 2 | 8.3.2 Bank Reconciliation | Ch 3 present | No interactive 2-step reconciliation walkthrough (only static theory) |
| 3 | 8.6.4 Departmental Accounts | Ch 12 theory only | No walkthrough/practice; HL "advise management on departmental performance" missing |
| 4 | 8.6.5 Farm Accounts — enterprise analysis, stock valuation, analysed receipts/payments | Ch 15 theory only | No walkthrough, no enterprise analysis builder |
| 5 | 8.7 Incomplete Records — net worth method, business vs private expenditure, capital introductions | Ch 16 theory only | No worked walkthrough; Q4-style missing entirely |
| 6 | 8.8 Tabular Statements | Ch 19 theory only | No interactive grid; this is a frequent Q4/Q6 topic |
| 7 | 8.10 CVP — break-even charts, margin of safety, sensitivity (HL) | Ch 23 theory + Q8 Costing | No interactive break-even chart, no sensitivity slider |
| 8 | 8.10 Cost classification — mixed, step-fixed, step-variable, controllable/uncontrollable (HL) | Ch 21 lists them | No classifier drill for these specific HL types |
| 9 | 8.11 IT & spreadsheets in accounting | Not present | Entirely absent — SEC explicitly requires this |
| 10 | 8.4/8.5 Sole Trader | Ch 6 strong | No basic sole-trader walkthrough (jumps straight to advanced Q1 traps) |
| 11 | Manufacturing — transfer at current market value, unit cost, "make management decisions" | Ch 11 covers cost flow | Unit-cost calculator + transfer-pricing walkthrough missing |
| 12 | Cross-cutting: textbook practice questions (Folens has ~150 numbered Qs e.g. 2.1–6.14, 8.1–9.6 visible) | Predictions + past papers exist | No mapping from chapter → matching textbook question numbers |

**Other findings worth a future update**
- The textbook PDF is image-only and the manual is text — running OCR + extraction on both would let us auto-build a "see worked solution" panel beside every walkthrough step.
- "Examiner verbs" (state / explain / discuss / outline) aren't taught anywhere — easy 5–10 mark wins on Section 1 short Qs.
- No ethics / true & fair view / auditor independence quiz despite being listed in 8.1 and §8 chapter.
- No FRS 102 / IFRS naming alignment — manual still references SSAP 2 (which the SEC syllabus uses) so this is a deliberate keep, but worth a "modern names" sidenote.

## Proposed "v3.0 — syllabus-complete" update (modular, ship in waves)

**Wave 1 — Fill the missing interactive modules** (highest exam value)
1. **Tabular Statements builder** — grid component (Asset / Liability / Capital columns) with step-by-step transactions, like the existing T-account stepper.
2. **Incomplete Records walkthroughs** — net-worth method, conversion to double-entry, missing-figure reconstruction (4–6 archetypes).
3. **Bank Rec interactive** — paste/select bank statement vs cash book, app reveals adjusted balance + reconciliation.
4. **Farm Accounts walkthrough** — enterprise analysis split (cattle / tillage / sheep), stock valuation, analysed R&P.
5. **Departmental Accounts walkthrough + close-a-department decision tool**.

**Wave 2 — HL management accounting depth**
6. **Interactive break-even chart** (drag-to-change selling price / fixed cost; live margin-of-safety + BEP).
7. **Sensitivity-analysis slider** for CVP (HL only).
8. **Mixed / step-fixed / step-variable cost classifier** drill — extends the existing Classify game.
9. **Unit-cost & transfer-at-market-value** mini-calculator inside Manufacturing.

**Wave 3 — Theory & exam-skills completeness**
10. **Spreadsheets in Accounting** mini-chapter (Ch 25): formulas, cell refs, why use them — covers SEC §8.11.
11. **Examiner-verbs cheatsheet + drill** (state / explain / discuss / evaluate).
12. **Ethics, true & fair view, auditor independence** quiz pack added to Ch 8.
13. **EU + Stock Exchange + accountancy-profession** regulator cards added to Ch 1/8.
14. Per-chapter **textbook question map** ("Folens Q5.4, Q5.9 cover this section") so users can self-test against a known source.

**Wave 4 — Authoring infrastructure (one-time)**
15. OCR + extract the *Accounting for Senior Cycle* textbook (Tesseract via skills) into a structured JSON of question + solution per chapter. Lets us:
    - Auto-link "see worked solution" beside every walkthrough.
    - Generate flashcards from textbook key terms.
    - Cross-validate every figure in our walkthroughs against an independent source.

## Technical approach

- All new walkthroughs reuse the existing `Archetype` schema in `q1Workings.ts` / `s2Workings.ts` and the `WorkingsPage` stepper — no new framework needed.
- Tabular Statements + Break-even chart are the only two genuinely new components (both are isolated, ~200–400 LOC each).
- Spreadsheets chapter slots into `theoryChapters.ts` as Ch 25 in Block A or a new Block E ("IT & Skills").
- Textbook OCR runs offline via the `pdf` skill — no runtime cost, output is committed JSON.
- All progress keys stay localStorage-compatible with current `lc-theory-ch-progress` etc.

## What I need from you

- Pick which wave(s) to schedule first (Wave 1 is the biggest exam-mark gain).
- Confirm whether to OCR the textbook now (one-off ~10 min job, unlocks Wave 4 features).
- Confirm whether the Spreadsheets chapter belongs in scope (it's syllabus-required but rarely examined heavily — some teachers skip).

