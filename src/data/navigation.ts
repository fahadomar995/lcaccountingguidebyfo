import {
  Home, BookOpen, GraduationCap, Layers, FileText, Calculator,
  ClipboardList, BarChart3, PenTool, Grid3X3, HelpCircle,
  Factory, Coins, Wrench, TrendingUp, Mail
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: typeof Home;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Home",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
    ],
  },
  {
    label: "Learn",
    items: [
      { title: "Theory", url: "/theory", icon: BookOpen },
      { title: "Learn Mode", url: "/learn", icon: GraduationCap },
      { title: "Q1 Walkthroughs", url: "/walkthroughs", icon: PenTool },
    ],
  },
  {
    label: "Practice",
    items: [
      { title: "Classify", url: "/classify", icon: HelpCircle },
      { title: "Layouts", url: "/layouts", icon: Layers },
      { title: "Formulas", url: "/formulas", icon: FileText },
    ],
  },
  {
    label: "Workings",
    items: [
      { title: "Q1 Guide", url: "/q1-guide", icon: ClipboardList },
      { title: "Q1 Walkthroughs", url: "/walkthroughs", icon: GraduationCap },
      { title: "Q1 Workings", url: "/q1-workings", icon: PenTool },
      { title: "S2 Workings", url: "/s2-workings", icon: Grid3X3 },
      { title: "Q8 Costing", url: "/q8-costing", icon: Factory },
      { title: "Q9 Budgeting", url: "/q9-budgeting", icon: Coins },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "Study Tools", url: "/study-tools", icon: Wrench },
      { title: "Q5 Ratios", url: "/ratios", icon: BarChart3 },
      { title: "Contact", url: "/contact", icon: Mail },
    ],
  },
];

export const PREDICTION_PAGES = [
  { title: "Overview & Detail", url: "/predictions" },
  { title: "Charts & Timeline", url: "/predictions/charts" },
  { title: "Interpretation Part B", url: "/predictions/interp" },
  { title: "Q1 Predictor", url: "/predictions/q1" },
  { title: "Section 3 Predictor", url: "/predictions/section3" },
  { title: "Monte Carlo & Scenarios", url: "/predictions/simulate" },
  { title: "Model Parameters", url: "/predictions/model" },
  { title: "Stats & Backtesting", url: "/predictions/stats" },
];
