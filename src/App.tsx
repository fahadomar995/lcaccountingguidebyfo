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
import { COSTING_ARCHETYPES, COSTING_CATEGORIES, BUDGETING_ARCHETYPES, BUDGETING_CATEGORIES } from "./data/archetypes";

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
            <Route path="/learn" element={<PlaceholderPage title="Learn Mode" description="5 interactive modules with 33 lessons and 75 steps." />} />
            <Route path="/classify" element={<PlaceholderPage title="Where Does This Go?" description="141-item classification quiz for debit/credit practice." />} />
            <Route path="/layouts" element={<PlaceholderPage title="Layout Practice" description="11 exam layout formats to practise." />} />
            <Route path="/formulas" element={<PlaceholderPage title="Formula Cheat Sheet" description="All key formulas in one searchable reference." />} />
            <Route path="/q1-guide" element={<PlaceholderPage title="Q1 Adjustment Guide" description="Complete reference for every Q1 adjustment type." />} />
            <Route path="/q1-workings" element={<PlaceholderPage title="Q1 Step-by-Step Workings" description="37 workings with real SEC marking scheme data." />} />
            <Route path="/s2-workings" element={<PlaceholderPage title="Section 2 Workings" description="37 topic workings with exam tips." />} />
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
            <Route path="/study-tools" element={<PlaceholderPage title="Study Tools" description="Study planner, exam timing, and revision checklists." />} />
            <Route path="/ratios" element={<PlaceholderPage title="Q5 Ratios Hub" description="Practice papers, formula quiz, report guide, and sector analysis." />} />
            <Route path="/predictions" element={<PlaceholderPage title="Prediction Engine" description="Full statistical analysis and model transparency." />} />
            <Route path="/predictions/*" element={<PlaceholderPage title="Prediction Engine" description="Full statistical analysis and model transparency." />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
