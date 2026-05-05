// Maps the free-text `topic` field on exam questions to the chapter id
// used by the topic-preference system (`ch-N`). Used so user preferences set
// in Profile → Preferences can hide/de-prioritise questions in the Exam
// Simulator.

const RULES: { match: RegExp; chapterIds: number[] }[] = [
  { match: /club|tennis club|golf club/i, chapterIds: [13] },
  { match: /service firm/i, chapterIds: [14] },
  { match: /cash flow/i, chapterIds: [17] },
  { match: /published/i, chapterIds: [10] },
  { match: /incomplete records/i, chapterIds: [16] },
  { match: /tabular/i, chapterIds: [19] },
  { match: /interpretation|ratio/i, chapterIds: [18] },
  { match: /suspense|correction of errors/i, chapterIds: [7] },
  { match: /depreciation/i, chapterIds: [4] },
  { match: /control account|debtors control|creditors control/i, chapterIds: [5] },
  { match: /departmental/i, chapterIds: [12] },
  { match: /manufacturing/i, chapterIds: [11] },
  { match: /marginal/i, chapterIds: [23] },
  { match: /budget/i, chapterIds: [24] },
  { match: /cost|stock valuation|overhead/i, chapterIds: [22] },
  // Q1 combo questions — could be sole trader / company / manufacturing
  { match: /sole trader.*company.*manufacturing|sole trader.*manufacturing|manufacturing.*company/i, chapterIds: [6, 9, 11] },
  { match: /sole trader.*company|company.*sole trader/i, chapterIds: [6, 9] },
  { match: /company final|final accounts.*company/i, chapterIds: [9] },
  { match: /sole trader/i, chapterIds: [6] },
];

/** Returns the chapter ids that an exam-question topic maps to. */
export function chaptersForExamTopic(topic: string): number[] {
  for (const r of RULES) if (r.match.test(topic)) return r.chapterIds;
  return [];
}

/** True if every chapter the topic maps to is in the excluded set. */
export function isExamTopicExcluded(
  topic: string,
  excludedChapterIds: Set<number>,
): boolean {
  const chapters = chaptersForExamTopic(topic);
  if (chapters.length === 0) return false;
  return chapters.every((c) => excludedChapterIds.has(c));
}