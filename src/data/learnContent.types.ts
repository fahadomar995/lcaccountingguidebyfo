// Shared types for Learn modules
export type LearnCategory = "exam-skills" | "final-accounts" | "interpretation" | "management";

export interface LearnModuleDef {
  id: string;
  name: string;
  icon: string;
  category?: LearnCategory;
  /** Optional one-line tagline shown on the module card */
  tagline?: string;
  lessons: { t: string; steps: string[] }[];
}
