

# Phase 1: Non-Prediction Pages Upgrade

Upgrading all study tool pages to match the original HTML platform. Prediction pages are excluded (done last).

---

## What's Changing

### 1. Theory Bank — Expand Data (theory.ts)
**Current**: ~40 questions, ~34 flashcards
**Target**: 109+ questions, 75+ flashcards across all 11 topics

Add missing questions for: Budgeting (remaining years), Costing (all missing years through 2023), Cash Flow (remaining), Correction of Errors (remaining), Club Accounts (remaining), Published Accounts (remaining), Service Firms (remaining), Depreciation, Manufacturing, Company Appropriation, Incomplete Records, Tabular Statements, Farm Accounts, Interpretation.

Add missing flashcards for all topics to reach 75+.

### 2. Classify Page — 10 Categories
**Current**: Debit/Credit binary quiz
**Target**: 10-category classification quiz matching original

Categories: Trading Account, P&L (Administration), P&L (Selling & Distribution), BS Fixed Assets, BS Current Assets, BS Creditors < 1 Year, BS Creditors > 1 Year, BS Capital & Reserves, Manufacturing Account, Items NOT in any account.

- Update `ClassifyItem` interface: change `answer` from `"debit"|"credit"` to the 10 category strings
- Update `CLASSIFY_ITEMS` data in studyContent.ts with correct category for all 141 items
- Rebuild ClassifyPage.tsx: show item name, 10 category buttons, track best score per category in `lc-classify-best`

### 3. Layouts Page — 11 Templates + Practice Mode
**Current**: 6 templates, reference-only mode
**Target**: 11 templates with Reference + Practice modes

Add 5 missing templates:
- Trading P&L (Sole Trader)
- Balance Sheet (Sole Trader)
- Balance Sheet (Company) — *already exists*
- Manufacturing Account
- Published Balance Sheet — *already exists*
- Club I&E Account
- Club Balance Sheet
- Service Firm I&E

Add Practice Mode: blank rows where students type item names from memory, check against correct answers.

### 4. Study Tools Page — Interactive Tools
**Current**: Static expandable cards with text content
**Target**: 3 interactive tools

- **Exam Timing Calculator**: Input marks per question → see time allocation (marks/400 × 175 + 5 min reading)
- **Practice Tracker**: Grid of years (2015-2025) × questions (Q1-Q9), click cells to mark complete, saved to `lc-practice-tracker` in localStorage
- Keep existing revision checklist and planner as expandable cards

### 5. Dashboard (Index.tsx) — Connect Real Progress
**Current**: All stats hardcoded to "0"
**Target**: Live stats from localStorage

Read from:
- `lc-theory-scores` → count attempted/got-it
- `lc-flash-known` → count known flashcards
- `lc-classify-best` → best score percentage
- `lc-learn-progress` → modules completed (count moduleIds with all steps done)
- `lc-practice-tracker` → past papers completed count

### 6. Scratchpad Enhancements
**Current**: Basic drawing canvas
**Target**: Add keyboard shortcuts, paper styles, pressure sensitivity

- Keyboard shortcuts: P=pen, E=eraser, G=grid toggle, 1-4=colours, Ctrl+Z=undo, Esc=close
- Paper styles toggle: Blank / Grid (24px) / Ruled (32px) drawn as CSS overlay
- Pressure sensitivity via `event.pressure` mapping to line width

---

## Files Modified

| File | Change |
|------|--------|
| `src/data/theory.ts` | Add ~70 theory questions + ~40 flashcards |
| `src/data/studyContent.ts` | Expand ClassifyItem to 10 categories, add 5 layout templates, add interactive tool data |
| `src/pages/ClassifyPage.tsx` | Rebuild for 10-category quiz |
| `src/pages/LayoutsPage.tsx` | Add missing templates + Practice mode |
| `src/pages/StudyToolsPage.tsx` | Add Exam Timing Calculator + Practice Tracker grid |
| `src/pages/Index.tsx` | Connect dashboard stats to localStorage |
| `src/components/Scratchpad.tsx` | Add keyboard shortcuts, paper styles, pressure sensitivity |

---

## Implementation Order

1. **theory.ts** — Expand data (largest data-entry task)
2. **studyContent.ts** — Update Classify items + add layouts
3. **ClassifyPage.tsx** — Rebuild with 10 categories
4. **LayoutsPage.tsx** — Add templates + practice mode
5. **StudyToolsPage.tsx** — Interactive tools
6. **Index.tsx** — Live dashboard stats
7. **Scratchpad.tsx** — Enhanced drawing features

