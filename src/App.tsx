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
import { PredOverview, PredCharts, PredInterp, PredQ1, PredSection3, PredSimulate, PredModel, PredStats, PredTopicGrid } from "./pages/PredictionPages";
import ContactPage from "./pages/ContactPage";
import PastPapersPage from "./pages/PastPapersPage";
import SectionPage from "./pages/SectionPage";
import { COSTING_ARCHETYPES, COSTING_CATEGORIES, BUDGETING_ARCHETYPES, BUDGETING_CATEGORIES } from "./data/archetypes";
import { COSTING_INTRO, COSTING_FORMULAS, COSTING_APPORTIONMENT_NOTE, COSTING_THEORY } from "./data/costingData";
import { BUDGETING_INTRO, BUDGETING_FORMULAS, BUDGETING_THEORY } from "./data/budgetingData";
import WorkingsListPage from "./pages/WorkingsListPage";
import WalkthroughMode from "./components/WalkthroughMode";
import { Q1_ARCHETYPES, Q1_CATEGORIES } from "./data/q1Workings";
import { S2_ARCHETYPES, S2_CATEGORIES } from "./data/s2Workings";
import { WALKTHROUGHS } from "./data/walkthroughData";
import { BANK_REC_ARCHETYPES, BANK_REC_CATEGORIES } from "./data/bankRecWorkings";
import { IR_ARCHETYPES, IR_CATEGORIES } from "./data/incompleteRecordsWorkings";
import { FARM_DEPT_ARCHETYPES, FARM_DEPT_CATEGORIES } from "./data/farmDeptWorkings";
import TabularStatementsPage from "./pages/TabularStatementsPage";
import SimulatorPage from "./pages/SimulatorPage";

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
              <SectionPage
                sectionLabel="Section 3 — Question 8"
                title="Q8 Costing"
                subtitle="Q8 is worth 80 marks and always chains multiple workings together. Walk through real past paper questions step by step."
                introBlocks={COSTING_INTRO}
                formulaSections={COSTING_FORMULAS}
                apportionmentNote={COSTING_APPORTIONMENT_NOTE}
                theoryBank={COSTING_THEORY}
                archetypes={COSTING_ARCHETYPES}
                categories={COSTING_CATEGORIES}
                accentColor="hsl(217, 91%, 60%)"
              />
            } />
            <Route path="/q9-budgeting" element={
              <SectionPage
                sectionLabel="Section 3 — Question 9"
                title="Q9 Budgeting"
                subtitle="Q9 is worth 80 marks. Master Cash Budgets and Flexible Budgets with real SEC data."
                introBlocks={BUDGETING_INTRO}
                formulaSections={BUDGETING_FORMULAS}
                theoryBank={BUDGETING_THEORY}
                archetypes={BUDGETING_ARCHETYPES}
                categories={BUDGETING_CATEGORIES}
                accentColor="hsl(38, 92%, 50%)"
              />
            } />
            <Route path="/walkthroughs" element={<WalkthroughMode walkthroughs={WALKTHROUGHS} />} />
            <Route path="/bank-rec" element={
              <WorkingsPage
                title="Bank Reconciliation Walkthroughs"
                subtitle="Adjusted cash book, reconciliation statement, error hunts and overdrawn balances — covering SEC §8.3.2."
                sectionLabel="Section 1 / 2 — Bank Reconciliation"
                accentColor="hsl(217, 91%, 60%)"
                archetypes={BANK_REC_ARCHETYPES}
                categories={BANK_REC_CATEGORIES}
                categoryColors={{ standard: "#1d4ed8", advanced: "#7c3aed" }}
              />
            } />
            <Route path="/incomplete-records" element={
              <WorkingsPage
                title="Incomplete Records Walkthroughs"
                subtitle="Net worth method, control accounts for missing sales / purchases, and a full conversion to double-entry — SEC §8.7."
                sectionLabel="Section 2 — Question 4"
                accentColor="hsl(280, 60%, 50%)"
                archetypes={IR_ARCHETYPES}
                categories={IR_CATEGORIES}
                categoryColors={{ networth: "#7c3aed", control: "#0891b2", conversion: "#dc2626" }}
              />
            } />
            <Route path="/farm-departmental" element={
              <WorkingsPage
                title="Farm & Departmental Accounts"
                subtitle="Enterprise analysis, analysed receipts & payments, departmental trading, and the close-a-department decision — SEC §8.6.4–8.6.5."
                sectionLabel="Section 2 — Q5"
                accentColor="hsl(142, 72%, 29%)"
                archetypes={FARM_DEPT_ARCHETYPES}
                categories={FARM_DEPT_CATEGORIES}
                categoryColors={{ farm: "#2d6a4f", dept: "#d97706" }}
              />
            } />
            <Route path="/tabular-statements" element={<TabularStatementsPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/study-tools" element={<StudyToolsPage />} />
            <Route path="/ratios" element={<RatiosPage />} />
            <Route path="/past-papers" element={<PastPapersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/predictions" element={<PredOverview />} />
            <Route path="/predictions/charts" element={<PredCharts />} />
            <Route path="/predictions/interp" element={<PredInterp />} />
            <Route path="/predictions/q1" element={<PredQ1 />} />
            <Route path="/predictions/section3" element={<PredSection3 />} />
            <Route path="/predictions/simulate" element={<PredSimulate />} />
            <Route path="/predictions/model" element={<PredModel />} />
            <Route path="/predictions/stats" element={<PredStats />} />
            <Route path="/predictions/topicgrid" element={<PredTopicGrid />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
