// Hybrid topic taxonomy: chapters as canonical topics, tagged with the exam
// section(s) they feed into. Used by topic preferences + (later) recommendations.

import { CHAPTERS, BLOCK_LABELS, type Block } from "@/data/theoryChapters";

export type ExamSection =
  | "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6" | "Q7" | "Q8" | "Q9";

export interface Topic {
  /** Stable id used as DB key, e.g. "ch-10". */
  id: string;
  chapterId: number;
  block: Block;
  blockLabel: string;
  title: string;
  /** Exam questions where this chapter typically appears. */
  examSections: ExamSection[];
}

/** Map chapter id → exam sections it feeds. */
const CHAPTER_TO_SECTIONS: Record<number, ExamSection[]> = {
  1: [],                  // Intro / concepts (mainly short Qs)
  2: ["Q1"],              // Records → Q1
  3: ["Q1"],              // Bank rec
  4: ["Q1", "Q6"],        // Depreciation
  5: ["Q1"],              // Control accounts
  6: ["Q1"],              // Sole trader final accs
  7: ["Q2"],              // Suspense / errors
  8: [],                  // Regulatory framework (theory)
  9: ["Q1"],              // Company internal
  10: ["Q1"],             // Published accounts
  11: ["Q1"],             // Manufacturing
  12: ["Q5"],             // Departmental
  13: ["Q3"],             // Club
  14: ["Q4"],             // Service firms
  15: ["Q5"],             // Farm
  16: ["Q4"],             // Incomplete records
  17: ["Q6"],             // Cash flow
  18: ["Q5"],             // Ratios / interpretation
  19: ["Q7"],             // Tabular statements
  20: [],                 // Mgmt accounting nature
  21: ["Q8"],             // Cost classification
  22: ["Q8"],             // Product costing
  23: ["Q8"],             // CVP / marginal
  24: ["Q9"],             // Budgeting
};

export const TOPICS: Topic[] = CHAPTERS.map((c) => ({
  id: `ch-${c.id}`,
  chapterId: c.id,
  block: c.block,
  blockLabel: BLOCK_LABELS[c.block],
  title: c.title,
  examSections: CHAPTER_TO_SECTIONS[c.id] ?? [],
}));

export const TOPICS_BY_ID: Record<string, Topic> =
  Object.fromEntries(TOPICS.map((t) => [t.id, t]));

/** Group topics by their block label, preserving chapter order. */
export function groupTopicsByBlock(): { label: string; topics: Topic[] }[] {
  const order: Block[] = ["A", "B", "C", "D"];
  return order.map((b) => ({
    label: BLOCK_LABELS[b],
    topics: TOPICS.filter((t) => t.block === b),
  }));
}