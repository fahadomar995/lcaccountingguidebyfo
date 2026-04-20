// Re-export the aggregated Learn modules.
// Module content now lives in src/data/learn/*.ts (one file per module).
// Shared types live in src/data/learnContent.types.ts.
export type { LearnModuleDef, LearnCategory } from "./learnContent.types";
export {
  LEARN_MODULES_DATA,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "./learn";
