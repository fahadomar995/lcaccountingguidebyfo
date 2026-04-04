import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

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
            <Route path="/theory" element={<PlaceholderPage title="Theory Revision" description="Past exam theory questions with marking scheme answers, flashcards, and frequency analysis." />} />
            <Route path="/learn" element={<PlaceholderPage title="Learn Mode" description="5 interactive modules with 33 lessons and 75 steps." />} />
            <Route path="/classify" element={<PlaceholderPage title="Where Does This Go?" description="141-item classification quiz for debit/credit practice." />} />
            <Route path="/layouts" element={<PlaceholderPage title="Layout Practice" description="11 exam layout formats to practise." />} />
            <Route path="/formulas" element={<PlaceholderPage title="Formula Cheat Sheet" description="All key formulas in one searchable reference." />} />
            <Route path="/q1-guide" element={<PlaceholderPage title="Q1 Adjustment Guide" description="Complete reference for every Q1 adjustment type." />} />
            <Route path="/q1-workings" element={<PlaceholderPage title="Q1 Step-by-Step Workings" description="37 workings with real SEC marking scheme data." />} />
            <Route path="/s2-workings" element={<PlaceholderPage title="Section 2 Workings" description="37 topic workings with exam tips." />} />
            <Route path="/q8-costing" element={<PlaceholderPage title="Q8 Costing" description="27 worked examples across 6 costing archetypes." />} />
            <Route path="/q9-budgeting" element={<PlaceholderPage title="Q9 Budgeting" description="24 worked examples across 4 budgeting archetypes." />} />
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
