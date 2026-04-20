// Aggregates every Learn module into a single ordered array.
// Add new modules by importing here and appending to LEARN_MODULES_DATA.
import type { LearnModuleDef, LearnCategory } from "../learnContent.types";

import { MODULE as ExamTechnique } from "./exam-technique";
import { MODULE as ApproachQ1 } from "./approach-q1";
import { MODULE as ApproachQ5 } from "./approach-q5";
import { MODULE as ApproachQ4 } from "./approach-q4";
import { MODULE as Errors } from "./errors";
import { MODULE as Club } from "./club";
import { MODULE as Service } from "./service";
import { MODULE as Published } from "./published";
import { MODULE as Cashflow } from "./cashflow";

export const LEARN_MODULES_DATA: LearnModuleDef[] = [
  // Stage 1 — Exam skills (always first)
  ExamTechnique,
  // Stage 2 — Approaching the big three
  ApproachQ1,
  ApproachQ5,
  ApproachQ4,
  // Existing final-accounts modules
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
