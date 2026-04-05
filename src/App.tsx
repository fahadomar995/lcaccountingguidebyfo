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
import { PredOverview, PredCharts, PredInterp, PredQ1, PredSection3, PredSimulate, PredModel, PredStats } from "./pages/PredictionPages";
import { COSTING_ARCHETYPES, COSTING_CATEGORIES, BUDGETING_ARCHETYPES, BUDGETING_CATEGORIES } from "./data/archetypes";
import { Q1_ARCHETYPES, Q1_CATEGORIES } from "./data/q1Workings";
import { S2_ARCHETYPES, S2_CATEGORIES } from "./data/s2Workings";

const queryClient = new QueryClient();

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
              <WorkingsPage
                title="Q1 Step-by-Step Workings"
                subtitle="Every Q1 adjustment type, broken down with T-accounts. Based on the 2025 HL paper (M McConnell) with verified marking scheme workings."
                sectionLabel="Section 1 — Question 1"
                accentColor="hsl(142, 72%, 29%)"
                archetypes={Q1_ARCHETYPES}
                categories={Q1_CATEGORIES}
                categoryColors={{ universal: "#2d6a4f", company: "#1d4ed8", manufacturing: "#d97706" }}
              />
            } />
            <Route path="/s2-workings" element={
              <WorkingsPage
                title="Section 2 Step-by-Step Workings"
                subtitle="Club Accounts, Service Firms, Cash Flow, Published Accounts, and Correction of Errors — all with real SEC data."
                sectionLabel="Section 2 — Questions 2-7"
                accentColor="hsl(0, 72%, 51%)"
                archetypes={S2_ARCHETYPES}
                categories={S2_CATEGORIES}
                categoryColors={{ suspense: "#dc2626", club: "#2d6a4f", service: "#1d4ed8", published: "#7c3aed", cashflow: "#d97706" }}
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
