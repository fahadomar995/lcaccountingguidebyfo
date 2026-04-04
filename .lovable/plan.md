

# LC Accounting 2026 — Full Rebuild Plan

## Summary
Rebuild the entire LC Accounting study platform as a React app in Lovable, porting all 21+ pages from static HTML into a modern component architecture with sidebar navigation, floating scratchpad overlay, and visual polish. Integrate costing and budgeting pages into the main navigation. Later phases add spaced repetition, accounts, and AI assistant.

---

## Phase 1: Foundation & Layout Shell

### 1a. Design System
- Port the CSS custom properties from `shared.css` into Tailwind config and `index.css` (the warm earthy palette: sage green accent `#6b8f71`, cream backgrounds `#f2f0ed`, dark mode variants)
- Add Google Fonts: Playfair Display (headings), DM Sans (body), JetBrains Mono (data/mono)
- Define color-coded section tokens: Learn (sage), Practice (blue), Workings (rose), Tools (sand), Predictions (lavender)

### 1b. Sidebar Navigation
- Replace the 13-item horizontal nav with a collapsible sidebar using shadcn `Sidebar` component
- Group into 5 sections:
  - **Home**: Dashboard
  - **Learn**: Theory, Learn Mode
  - **Practice**: Classify, Layouts, Formulas
  - **Workings**: Q1 Guide, Q1 Workings, S2 Workings, Q8 Costing, Q9 Budgeting
  - **Tools**: Study Tools, Q5 Ratios
- Predictions drawer accessible via a button in the header (matching the current `pred-drawer` pattern)
- Dark mode toggle in sidebar footer
- iPad: icon-rail in portrait, expanded in landscape. Mobile: offcanvas with hamburger trigger

### 1c. App Layout Component
- `AppLayout.tsx`: SidebarProvider + Sidebar + main content area + SidebarTrigger in header
- All routes wrapped in this layout
- Smooth page transitions via React Router

---

## Phase 2: Floating Scratchpad Overlay

Port the scratchpad from `scratchpad.html` as a global React component:
- **Floating Action Button** (FAB): fixed bottom-right pen icon, visible on all pages
- **Overlay panel**: slides up from bottom, occupying ~60% of screen height (not full-screen), so the question/content behind remains visible
- **Resizable/draggable** height handle so students can adjust how much of the page is covered
- **Canvas drawing** with: pen tool, eraser, 4 colours, 3 thicknesses, undo/redo, grid/ruled toggle, save-as-image, clear
- **Pressure-sensitive** Apple Pencil support via pointer events
- **localStorage persistence**: drawing auto-saves, green dot indicator on FAB when content exists
- **Keyboard shortcuts**: P=pen, E=eraser, G=grid, 1-4=colours, Ctrl+Z=undo, Esc=close

---

## Phase 3: Core Data Layer

### 3a. Port shared.js Data
- Create `src/data/` directory with TypeScript modules:
  - `predictions.ts`: SEC2_HISTORY, TOPICS, SEC3 data, INTERP_PARTB, PEARSON correlations
  - `algorithms.ts`: Markov chain, weighted frequency, gap scoring, Monte Carlo, backtest, Bayesian posterior, bootstrap, Brier scores, calibration, Shannon entropy, hazard rate functions
  - `theory.ts`: THEORY_BANK (all 113+ questions), THEORY_FLASHCARDS, RATIO_THEORY
  - `studyTools.ts`: study planner, exam timing data

### 3b. Local State Management
- Use localStorage hooks for progress tracking (same keys as current site for data migration compatibility):
  - `lc-theory-scores`, `lc-flash-known`, `lc-classify-progress`, `lc-learn-progress`, `lc-theme`

---

## Phase 4: Page Rebuilds (Priority Order)

### 4a. Homepage Dashboard (`/`)
- Hero with "LC Accounting 2026" branding
- Progress dashboard: Questions Done, Practice Score, Flashcards, Classify Best, Learn Modules (ring charts)
- Tool cards grid (Theory, Study Tools, Q1 Guide, Q5 Ratios) with hover animations
- Section 2 priority rankings with tier badges and probability circles
- Section 3 (Q8/Q9) priority cards
- Q1 pair predictions
- Q5 guaranteed banner
- Patch notes collapsible
- "Coming Soon" section

### 4b. Theory Page (`/theory`)
- Tab interface: All Topics, Practice Mode, Flashcards, Frequency Analysis
- Question cards with reveal answers, marking scheme points
- Practice mode with Got It / Partial / Missed scoring
- Flashcard flip cards with Known/Unknown tracking

### 4c. Q8 Costing (`/q8-costing`) & Q9 Budgeting (`/q9-budgeting`)
- Port the tabbed archetype-based structure from `costing.html` and `budgeting.html`
- Costing: 6 tabs (Intro, Marginal, Absorption, Job Costing, Stock Valuation, Overhead Apportionment) with archetype cards expanding to step-by-step workings
- Budgeting: similar tab structure (Intro, Cash Budget, Production Budget, Flexible Budget) with archetype cards
- Both integrated into sidebar navigation under "Workings" group

### 4d. Remaining Pages
- `/learn` — Module cards with lesson/step tracking
- `/study-tools` — Study planner, exam timing, checklists
- `/q1-guide` — Adjustment reference with account-type filters
- `/q1-workings` — Step-by-step Q1 workings
- `/s2-workings` — Section 2 workings
- `/ratios` — Q5 Ratios Hub (practice papers, formula quiz, report guide)
- `/formulas` — Formula cheat sheet with search
- `/layouts` — Layout practice (11 formats)
- `/classify` — "Where Does This Go?" quiz
- `/predictions/*` — Prediction engine pages (overview, charts, Monte Carlo, model params, backtesting, etc.)

---

## Phase 5: Visual Polish & iPad Optimization

- Card hover lifts with subtle shadows
- Smooth expand/collapse animations for workings steps
- Progress bar fills with CSS transitions
- Flashcard flip animations (CSS 3D transform)
- Touch targets minimum 44px for iPad
- Fluid grid layouts at iPad breakpoints (768px, 1024px, 1194px)
- Sidebar icon-rail mode for iPad portrait
- Swipe gestures for flashcard navigation

---

## Phase 6: Spaced Repetition (Future)
- SM-2 algorithm for flashcards and theory questions
- "Due for review" queue on dashboard
- Difficulty rating (Again/Hard/Good/Easy) after each card
- Review calendar heatmap
- Per-topic mastery scores

## Phase 7: Student Accounts (Future — Supabase)
- Email/password auth
- Progress sync across devices
- User profiles with study stats

## Phase 8: AI Study Assistant (Future)
- Floating chat widget (bottom-left, opposite scratchpad)
- Context-aware (knows current page/topic)
- Suggested prompts per section

---

## Technical Notes

- All prediction algorithms ported as pure TypeScript functions (no external dependencies)
- Data constants as typed objects with interfaces
- React hooks for localStorage state (`useLocalStorage`)
- Scratchpad uses HTML Canvas API with pointer events for pressure sensitivity
- Routes managed via React Router with lazy loading for larger pages
- shadcn components used throughout: Sidebar, Card, Tabs, Accordion, Badge, Button, Sheet, Dialog, Tooltip
- Existing `shared.js` localStorage keys preserved so returning users keep their progress

