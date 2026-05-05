import { questionIndex, type ExamQuestion } from "@/data/questionIndex";

export interface HistoryEntry {
  id: string;
  year: number;
  topic: string;
  subtopic: string;
  marks: number;
  targetMinutes: number;
  actualSeconds: number;
  completedAt: string;
  withinTarget: boolean;
  marksEarned?: number;
  percentage?: number;
}

export interface Suggestion {
  q: ExamQuestion;
  reason: string;
  daysSince: number | null;
  lastPct: number | null;
  priority: number;
}

export const SIM_HISTORY_KEY = "lca_simulator_history";

/** Heavier mark allocations (120m/100m) are weighted higher. */
const MARK_WEIGHT: Record<number, number> = { 60: 0.7, 80: 1.0, 100: 1.4, 120: 1.7 };
/** Target review interval per mark allocation, in days. */
const REVIEW_INTERVAL_DAYS: Record<number, number> = { 60: 21, 80: 14, 100: 7, 120: 5 };

/**
 * Build prioritised exam-simulator suggestions from session history.
 * Combines mark weight, recency vs. per-marks review interval, and past
 * accuracy. Returns up to `limit` diverse suggestions across topics.
 */
export function buildSuggestions(
  history: HistoryEntry[],
  pool: ExamQuestion[] = questionIndex,
  limit = 3,
): Suggestion[] {
  const now = Date.now();
  const lastById = new Map<string, HistoryEntry>();
  const lastByBucket = new Map<string, HistoryEntry>();
  for (const h of history) {
    const t = new Date(h.completedAt).getTime();
    const prev = lastById.get(h.id);
    if (!prev || new Date(prev.completedAt).getTime() < t) lastById.set(h.id, h);
    const bk = `${h.topic}|${h.marks}`;
    const pb = lastByBucket.get(bk);
    if (!pb || new Date(pb.completedAt).getTime() < t) lastByBucket.set(bk, h);
  }

  const items: Suggestion[] = [];
  for (const q of pool) {
    const own = lastById.get(q.id);
    const bucket = lastByBucket.get(`${q.topic}|${q.marks}`);
    const ref = own ?? bucket;
    const daysSince = ref ? Math.floor((now - new Date(ref.completedAt).getTime()) / 86400000) : null;
    const lastPct = ref && typeof ref.marksEarned === "number"
      ? Math.round((ref.marksEarned / ref.marks) * 100)
      : null;
    const weight = MARK_WEIGHT[q.marks] ?? 1;
    const interval = REVIEW_INTERVAL_DAYS[q.marks] ?? 14;
    const recency = daysSince === null ? 2.0 : Math.min(daysSince / interval, 4);
    const mastery = lastPct === null ? 1.1 : Math.max(0.4, (100 - lastPct) / 60);
    const priority = weight * (0.5 + recency) * mastery;

    let reason: string;
    if (daysSince === null) {
      reason = q.marks >= 100
        ? `Heavy ${q.marks}-marker you haven't tried — high impact for the exam.`
        : `New ${q.marks}-marker on this topic.`;
    } else if (lastPct !== null && lastPct < 55) {
      reason = `Last ${q.marks}m ${q.topic} attempt was ${lastPct}% — worth a re-run.`;
    } else if (daysSince > interval * 1.5) {
      reason = `It's been ${daysSince} days since a ${q.marks}-mark ${q.topic.toLowerCase()} — overdue for review.`;
    } else if (daysSince > interval) {
      reason = `Due for review: ${daysSince} days since your last ${q.marks}m ${q.topic.toLowerCase()}.`;
    } else if (q.marks >= 100) {
      reason = `Keep ${q.marks}-markers fresh — the bulk of your exam marks live here.`;
    } else {
      reason = `Quick ${q.marks}m ${q.topic.toLowerCase()} refresh.`;
    }
    items.push({ q, reason, daysSince, lastPct, priority });
  }

  items.sort((a, b) => b.priority - a.priority);
  const out: Suggestion[] = [];
  const topicCount: Record<string, number> = {};
  for (const s of items) {
    if ((topicCount[s.q.topic] ?? 0) >= 1 && out.length < limit) continue;
    out.push(s);
    topicCount[s.q.topic] = (topicCount[s.q.topic] ?? 0) + 1;
    if (out.length >= limit) break;
  }
  if (out.length < limit) {
    for (const s of items) {
      if (out.includes(s)) continue;
      out.push(s);
      if (out.length >= limit) break;
    }
  }
  return out;
}