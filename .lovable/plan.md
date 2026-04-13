

## Past Papers Viewer — Plan

### What we're building
A new "Past Papers" page accessible from the sidebar, giving students a browsable archive of all Higher Level Accounting papers (exam papers + marking schemes) from examinations.ie, plus a section for mock papers you upload.

### Architecture

**Data file**: `src/data/pastPapers.ts`
- A typed array of paper entries, each with: `year`, `type` ('sec' | 'mock'), `source` (e.g. "SEC" or "DEB/EDCO"), `documents` array (each with `label` like "Exam Paper" or "Marking Scheme", `filename` pointing to a file in `public/papers/`)
- Years 2005–2025 scaffolded for SEC papers
- Separate entries for mock papers grouped by provider

**PDF hosting**: Files go in `public/papers/` (e.g. `public/papers/sec-2024-paper.pdf`, `public/papers/sec-2024-ms.pdf`). Since these are static files in `public/`, Vite serves them directly — no backend needed. You'll drop the PDFs into this folder.

**Page**: `src/pages/PastPapersPage.tsx`
- Year filter (horizontal pill buttons or dropdown)
- Type filter: SEC / Mock / All
- Grid of cards, one per year/source, each card showing available documents as View/Download buttons
- "View" opens the PDF in a new browser tab (simple `<a href target="_blank">`)
- "Download" uses the `download` attribute on the link
- Fits the locked design system: Playfair headings, DM Sans body, sage accent, no emojis

**Navigation**: Add "Past Papers" to the Tools section in `src/data/navigation.ts` with the `FileText` icon. Add route in `App.tsx`.

### Page layout (iPad-optimised)
- Cards in a responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Each card shows: year (large, Playfair), source badge (SEC / Mock provider), and document links as compact buttons
- Minimal vertical scrolling — no accordions, everything visible at a glance
- Year filter as a horizontal scrollable row of small buttons at the top

### Deliverables
1. `src/data/pastPapers.ts` — type definitions + scaffolded entries for SEC 2005–2025 + empty mock array
2. `src/pages/PastPapersPage.tsx` — the viewer page
3. `src/data/navigation.ts` — add sidebar entry
4. `src/App.tsx` — add route
5. `public/papers/.gitkeep` — placeholder directory for PDFs

You'll then drop the actual PDF files into `public/papers/` and I'll update the data file to point to them. For mock papers you provide, same process — drop the files and I'll add entries.

### What this does NOT include
- No in-app PDF viewer/embed (browser's native PDF viewer handles this cleanly)
- No Supabase storage (PDFs are static assets in `public/`)
- No search within PDFs
- No authentication or access control

