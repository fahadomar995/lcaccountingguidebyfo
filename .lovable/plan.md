
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

**Add `SECTOR_NOTES`** — 12 sectors:
- Pharmaceuticals, Sportswear Retailer, Tourism, Health Food, Construction, Renewable Energy, Food Processing, Soft Drinks, Computer/Software, IT/Technology, Confectionery, Fast Food
- Each: short-term and long-term analysis

**Add `PART_C_QUESTIONS`** — 6+ past Part (c) questions with answers

**Add `PART_B_GUIDE`** — Full LIPGLOSS guide with:
- Report layout template (2 marks)
- LIPGLOSS mnemonic breakdown
- Stakeholder-specific guides (Shareholders, Debenture Holders, Bank Manager)
- Mark allocations per section
- Sample report paragraphs for each section

### UI (RatiosPage.tsx) — Complete rebuild

**6 tabs** matching original site:

1. **Learn Ratios** — Category filter pills (All 19, Profitability 6, Investment 6, Liquidity 5, Gearing 2). Left sidebar list of 19 ratios. Click a ratio → 3-step card on right with Back/Next navigation and progress bar.

2. **Q5 Practice** — Year selector pills (7 papers). Shows P&L and Balance Sheet tables. Prior year ratios listed. Ratio questions with input fields for self-checking.

3. **Formula Quiz** — Typing-based (not reveal). Shows ratio name + category, student types formula, Check button to verify, Show Me fallback. Score counter (correct/incorrect/total). Rough Work toggle.

4. **Part (b) Guide** — "40 marks" header. Report layout template. LIPGLOSS mnemonic. Three stakeholder sub-tabs (Shareholders, Debenture Holders, Bank Manager) with mark allocations and sample report paragraphs for each section (Profitability, Liquidity, Gearing, Investment, Other Info, Sector, Conclusion).

5. **Sector Notes** — "Worth 4-5 marks" instruction. Grid of 12 sector cards with short-term and long-term analysis.

6. **Part (c)** — "10 marks" instruction. Clickable question cards that expand to show answers.

---

## Part 2: Layouts Page Rebuild

### Tabs (14 total)
Keep original site's 11 tabs + user's requested 3:
ST P&L, ST Bal Sheet, Co. Approp., Co. Bal Sheet, Mfg Account, Mfg Bal Sheet, Published, Cash Flow, Club, Service, Errors, **MCS**, **Cash Budget**, **Job Cost**

### Table format — Match original site
- Proper accounting table with label column, 2-3 value columns, and N-workings column (N1, N2, etc.)
- CSS classes: `.l` (label), `.n` (number), `.nc` (note column), `.i` (indent), `.b` (bold), `.s` (subtotal), `.t` (total), `.bl` (blank row)
- Section headers bold, subtotal rows with top border, total rows with double-underline
- Caption with company name template

### Practice mode — In-place (replace current flashcard system)
- Same table layout but non-header labels become `<input>` fields
- Section headings and totals stay visible as structure clues
- Numbers remain visible
- Student types item names into blank rows
- Check button to verify all answers at once

### Classification Reference — Bottom section
- Cards for: Cost of Sales (Working A), Distribution Costs (Working B), Administration Expenses (Working C), Other Operating Income (Working D), Current Assets, Current Liabilities
- Each with bullet list of items that belong there

### Layout data
Replace `LAYOUT_FORMATS` with new data matching original site. Each layout has:
- id, badge, badgeText, title
- Note/instruction text
- Row data with: label, values array, flags (indent, bold, subtotal, total, blank)
- N-workings references
- Classification tip text at bottom

---

## Files Modified

| File | Change |
|------|--------|
| `src/data/studyContent.ts` | Add RATIO_LEARN_DATA (19 ratios × 3 steps), Q5_PRACTICE_EXAMS (7 papers), PART_B_GUIDE, SECTOR_NOTES (12), PART_C_QUESTIONS. Replace LAYOUT_FORMATS with 14 layout templates matching original site format. |
| `src/pages/RatiosPage.tsx` | Complete rebuild with 6 tabs matching original site |
| `src/pages/LayoutsPage.tsx` | Complete rebuild: 14 tabs, in-place practice mode, classification reference section |
| `src/index.css` | Add `.acct` table styles for layout page accounting format |

## Implementation Order
1. studyContent.ts — All new data arrays
2. RatiosPage.tsx — 6-tab rebuild
3. LayoutsPage.tsx — 14-tab rebuild with practice mode
4. index.css — Accounting table styles
