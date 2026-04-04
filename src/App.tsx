import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import TheoryPage from "./pages/TheoryPage";
import WorkingsPage from "./pages/WorkingsPage";
import LearnPage from "./pages/LearnPage";
import ClassifyPage from "./pages/ClassifyPage";
import LayoutsPage from "./pages/LayoutsPage";
import FormulasPage from "./pages/FormulasPage";
import Q1GuidePage from "./pages/Q1GuidePage";
import RatiosPage from "./pages/RatiosPage";
import StudyToolsPage from "./pages/StudyToolsPage";
import WorkingsListPage from "./pages/WorkingsListPage";
import { PredOverview, PredCharts, PredInterp, PredQ1, PredSection3, PredSimulate, PredModel, PredStats } from "./pages/PredictionPages";
import { COSTING_ARCHETYPES, COSTING_CATEGORIES, BUDGETING_ARCHETYPES, BUDGETING_CATEGORIES } from "./data/archetypes";

const queryClient = new QueryClient();

const Q1_TOPICS = [
  { name: "Closing Stock & Adjustments", count: 8, desc: "Year-end adjustments: closing stock, accruals, prepayments, bad debts." },
  { name: "Depreciation", count: 6, desc: "Straight line and reducing balance methods." },
  { name: "Provision for Bad Debts", count: 5, desc: "Creating, increasing, and decreasing provisions." },
  { name: "Error Corrections in Q1", count: 4, desc: "Suspense account entries and correcting journal entries." },
  { name: "Company Adjustments", count: 7, desc: "Corporation tax, dividends, transfers to reserves." },
  { name: "Manufacturing Adjustments", count: 7, desc: "Factory overheads, WIP, cost of production." },
];

const S2_TOPICS = [
  { name: "Club Accounts", count: 6, desc: "Subscriptions, accumulated fund, I&E account." },
  { name: "Service Firm Accounts", count: 5, desc: "Statement of capital, fee income, I&E." },
  { name: "Cash Flow Statements", count: 6, desc: "Operating activities, capital expenditure, reconciliation." },
  { name: "Correction of Errors", count: 5, desc: "Suspense account, journal entries, corrected TB." },
  { name: "Published Accounts", count: 6, desc: "Published P&L, balance sheet, notes." },
  { name: "Tabular Statements", count: 4, desc: "Columnar format adjustments." },
  { name: "Incomplete Records", count: 5, desc: "Opening capital, mark-up/margin calculations." },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/theory" element={<TheoryPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/classify" element={<ClassifyPage />} />
            <Route path="/layouts" element={<LayoutsPage />} />
            <Route path="/formulas" element={<FormulasPage />} />
            <Route path="/q1-guide" element={<Q1GuidePage />} />
            <Route path="/q1-workings" element={
              <WorkingsListPage
                title="Q1 Step-by-Step Workings"
                subtitle="37 workings with real SEC marking scheme data. Each working shows you exactly how to handle every Q1 adjustment."
                sectionLabel="Section 1 — Question 1"
                count={37}
                topics={Q1_TOPICS}
              />
            } />
            <Route path="/s2-workings" element={
              <WorkingsListPage
                title="Section 2 Workings"
                subtitle="37 topic workings covering every Section 2 question type with exam tips."
                sectionLabel="Section 2 — Questions 2-7"
                count={37}
                topics={S2_TOPICS}
              />
            } />
            <Route path="/q8-costing" element={
              <WorkingsPage
                title="Q8 Costing — Full Question Practice"
                subtitle="Q8 is worth 80 marks and always chains multiple workings together. Walk through real past paper questions step by step."
                sectionLabel="Section 3 — Question 8"
                accentColor="hsl(217, 91%, 60%)"
                archetypes={COSTING_ARCHETYPES}
                categories={COSTING_CATEGORIES}
              />
            } />
            <Route path="/q9-budgeting" element={
              <WorkingsPage
                title="Q9 Budgeting — Full Question Practice"
                subtitle="Q9 is worth 80 marks. Master Cash Budgets and Flexible Budgets with real SEC data."
                sectionLabel="Section 3 — Question 9"
                accentColor="hsl(38, 92%, 50%)"
                archetypes={BUDGETING_ARCHETYPES}
                categories={BUDGETING_CATEGORIES}
              />
            } />
            <Route path="/study-tools" element={<StudyToolsPage />} />
            <Route path="/ratios" element={<RatiosPage />} />
            <Route path="/predictions" element={<PredOverview />} />
            <Route path="/predictions/charts" element={<PredCharts />} />
            <Route path="/predictions/interp" element={<PredInterp />} />
            <Route path="/predictions/q1" element={<PredQ1 />} />
            <Route path="/predictions/section3" element={<PredSection3 />} />
            <Route path="/predictions/simulate" element={<PredSimulate />} />
            <Route path="/predictions/model" element={<PredModel />} />
            <Route path="/predictions/stats" element={<PredStats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
