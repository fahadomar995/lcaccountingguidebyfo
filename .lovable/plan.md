## Goal

Two coordinated updates:

1. **Question Bank revamp** — Replace `THEORY_BANK` in `src/data/theory.ts` with every Q&A pair from the David Wilson 2024 Theory PDF (50 pages, ~150 entries spanning 2001–2023), each tagged with the correct year and topic so it lines up with the SEC marking scheme it was lifted from.
2. **Theory notes integration** — Fold the definitions, advantages/disadvantages lists, and exam-advice paragraphs from `Accounting Theory.pdf` and `Accounting Theory 2.pdf` into the chapter reading content (`src/data/theoryLearnContent.ts` / per-chapter learn modules) so the same material appears in the read-through view, not only as exam Q&A.

## Scope (topics covered)

David Wilson PDF order — Budgeting, Cash Flow, Club Accounts, Correction of Errors, Costing, Depreciation, Final Accounts/Concepts (Prudence, Consistency, Accruals, Entity), Incomplete Records, Published Accounts, Service Firms, Tabular Statements, Manufacturing, Farm. Interpretation is excluded (noted as separate in the PDF).

Accounting Theory notes — Budgeting, Solvency/Gearing, Club, Regulation of Accounts, Directors' duties, Trial Balance/Suspense, Cash vs Profit, Debtors/Creditors control, Incomplete Records, Concepts, Depreciation/Revaluation, Capital vs Revenue expenditure.

## Approach

**Step 1 — Extract.** Read all 50 pages of the David Wilson PDF (pages 26–50 still need parsing — first parse was capped at 50 pages but only returned through ~Costing). Use `document--parse_document` again on the later page range if needed, or read the cached tool-result file directly.

**Step 2 — Rebuild `THEORY_BANK`.** Generate a fresh array where each entry is `{topic, year, marks, tags, q, a}`. `q` and `a` come directly from the David Wilson PDF (questions verbatim from the SEC paper as shown; answers verbatim from the official marking-scheme text shown in the Solutions half of the PDF). Existing hand-written entries that don't exist in the PDF are dropped to keep the bank aligned with one source of truth — the marking scheme.

**Step 3 — Merge theory notes into chapter reading content.** For each topic above, add a "Key definitions & exam points" subsection to the corresponding chapter in `theoryLearnContent.ts` using the content from the two Accounting Theory PDFs. No layout changes — just additional content blocks in the existing format.

**Step 4 — Verify.** Build, spot-check the Theory page, Theory Bank/Review flow, and chapter reading view for a handful of topics (Budgeting 2023, Cash Flow 2019, Club 2020, Costing 2022).

## Technical notes

- Only `src/data/theory.ts` and `src/data/theoryLearnContent.ts` (plus possibly `src/data/learn/*.ts` modules) change. No schema, route, or component changes.
- `REVIEW_BANK` / chapter quiz hashes key off content; replacing entries will reshuffle quiz ordering on existing devices but won't break anything (localStorage keys are stable).
- Marking-scheme mark allocations (e.g. ⑦, ③) in the PDF become the `marks` field on each entry.

## Confirm before I start

- **Destructive replace OK?** The current `THEORY_BANK` has 175 hand-curated entries. The David Wilson PDF will likely yield ~120–140. Confirming you want the bank fully replaced with PDF content (single source of truth) rather than merged on top.
- **Interpretation topic** — leave existing 12 entries untouched (PDF explicitly excludes it). OK?
