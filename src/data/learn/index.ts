// Aggregates every Learn module into a single ordered array.
// Add new modules by importing here and appending to LEARN_MODULES_DATA.
import type { LearnModuleDef, LearnCategory } from "../learnContent.types";

import { MODULE as Errors } from "./errors";
import { MODULE as Club } from "./club";
import { MODULE as Service } from "./service";
import { MODULE as Published } from "./published";
import { MODULE as Cashflow } from "./cashflow";

export const LEARN_MODULES_DATA: LearnModuleDef[] = [
  // Original final-accounts modules.
  // Stage 1 + Stage 2 modules (exam-technique, approach-q1/q4/q5) are kept
  // in this folder for future re-enable but excluded from the live grid.
  Errors,
  Club,
  Service,
  Published,
  Cashflow,
];

export const CATEGORY_LABELS: Record<LearnCategory, string> = {
  "exam-skills": "Exam Skills",
  "final-accounts": "Final Accounts",
  "interpretation": "Interpretation",
  "management": "Management Accounting",
};

export const CATEGORY_ORDER: LearnCategory[] = [
  "exam-skills",
  "final-accounts",
  "interpretation",
  "management",
];

export type { LearnModuleDef, LearnCategory } from "../learnContent.types";
