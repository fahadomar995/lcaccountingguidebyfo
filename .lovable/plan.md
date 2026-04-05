

# Rebuild Q5 Ratios Hub + Fix Layouts Page

## Overview
Two major changes matching the original Netlify site blueprint:
1. **Q5 Ratios Hub** — Complete rebuild with 6 tabs: Learn Ratios, Q5 Practice, Formula Quiz, Part (b) Guide, Sector Notes, Part (c)
2. **Layouts Page** — Replace current system with original site's skeleton (11 tabs) plus keep MCS, Cash Budget, Job Cost (14 tabs total)

---

## Part 1: Q5 Ratios Hub Rebuild

### Data (studyContent.ts)

**Add `RATIO_LEARN_DATA`** — 19 ratios with full 3-step content extracted from original site:
- Categories: Profitability (6), Investment (6), Liquidity (5), Gearing (2)
- Each ratio: name, category, step1 (Definition + Ideal + Marking scheme language), step2 (Formula + Components + Example), step3 (Interpretation)
- All 19: ROCE, ROSF, GP Margin, NP Margin, Mark-Up, Total Expenses/Sales%, EPS, P/E, DPS, Dividend Cover, Dividend Yield, Period to Recoup, Current Ratio, Acid Test, Stock Turnover, Debtors Days, Creditors Days, Gearing Ratio, Interest Cover

**Add `Q5_PRACTICE_EXAMS`** — 7 past papers:
- 2025 Technik plc, 2024 Kelly plc, 2023 O'Malley Ltd, 2022 Watson plc, 2022 Deferred Ash Ltd, 2025 Mock Murphy Ltd, 2023 Mock Adare plc
- Each: company name, year, P&L data table, Balance Sheet data table, prior year ratios, ratio questions to calculate

**Add `SECTOR_NOTES`** — 12 sectors with short-term and long-term analysis

**Add `PART_C_QUESTIONS`** — 6+ past Part (c) questions with answers

**Add `PART_B_GUIDE`** — Full LIPGLOSS guide with report layout template, stakeholder-specific guides with mark allocations and sample paragraphs

### UI (RatiosPage.tsx) — Complete rebuild with 6 tabs

1. **Learn Ratios** — Category filter pills. Left sidebar list of 19 ratios. Click → 3-step card with Back/Next navigation and progress bar.
2. **Q5 Practice** — Year selector pills (7 papers). P&L and BS tables. Prior year ratios. Ratio input fields for self-checking.
3. **Formula Quiz** — Typing-based. Type formula, Check to verify, Show Me fallback. Score counter. Rough Work toggle.
4. **Part (b) Guide** — Report layout template. LIPGLOSS mnemonic. Three stakeholder sub-tabs with mark allocations and sample paragraphs.
5. **Sector Notes** — Grid of 12 sector cards.
6. **Part (c)** — Clickable question cards that expand to show answers.

---

## Part 2: Layouts Page Rebuild

### 14 tabs
Original site's 11 (ST P&L, ST Bal Sheet, Co. Approp., Co. Bal Sheet, Mfg Account, Mfg Bal Sheet, Published, Cash Flow, Club, Service, Errors) + MCS, Cash Budget, Job Cost

### Accounting table format matching original site
- Label column, 2-3 value columns, N-workings column (N1, N2, etc.)
- Proper bold sections, subtotal borders, total double-underlines, caption with company name template

### Practice mode — In-place (replaces current flashcard system)
- Same table but non-header labels become input fields
- Section headings and totals stay visible as clues
- Numbers remain visible, student types item names

### Classification Reference section at bottom
- Cards for Cost of Sales (Working A), Distribution Costs (Working B), Administration Expenses (Working C), Other Operating Income (Working D), Current Assets, Current Liabilities

---

## Files Modified

| File | Change |
|------|--------|
| `src/data/studyContent.ts` | Add all new data arrays. Replace LAYOUT_FORMATS with 14 templates. |
| `src/pages/RatiosPage.tsx` | Complete rebuild — 6 tabs |
| `src/pages/LayoutsPage.tsx` | Complete rebuild — 14 tabs, in-place practice, classification reference |
| `src/index.css` | Add `.acct` table styles |

## Implementation Order
1. studyContent.ts — All new data
2. RatiosPage.tsx — 6-tab rebuild
3. LayoutsPage.tsx — 14-tab rebuild
4. index.css — Accounting table styles

