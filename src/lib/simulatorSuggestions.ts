import { questionIndex, type ExamQuestion } from "@/data/questionIndex";
import { chaptersForExamTopic } from "@/lib/examTopicChapters";

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

export type PrefPriority = "high" | "normal" | "low" | "excluded";
export interface PrefLike { priority: PrefPriority; is_excluded?: boolean }
const PREF_MULT: Record<PrefPriority, number> = { high: 1.7, normal: 1.0, low: 0.45, excluded: 0 };

export interface BuildOptions {
  /** topic_id ("ch-N") -> preference. Excluded topics are dropped. */
  prefs?: Record<string, PrefLike>;
  now?: number;
}

/** Best preference multiplier across the chapters a topic feeds. */
function prefMultiplier(topic: string, prefs?: Record<string, PrefLike>): number {
  if (!prefs) return 1;
  const chapters = chaptersForExamTopic(topic);
  if (chapters.length === 0) return 1;
  let best = 0;
  let any = false;
  for (const ch of chapters) {
    const p = prefs[`ch-${ch}`];
    if (!p) { best = Math.max(best, 1); any = true; continue; }
    if (p.is_excluded || p.priority === "excluded") continue;
    best = Math.max(best, PREF_MULT[p.priority] ?? 1);
    any = true;
  }
  return any ? best : 1;
}

function isExcludedByPrefs(topic: string, prefs?: Record<string, PrefLike>): boolean {
  if (!prefs) return false;
  const chapters = chaptersForExamTopic(topic);
  if (chapters.length === 0) return false;
  // Exclude only when every mapped chapter is excluded
  return chapters.every((ch) => {
    const p = prefs[`ch-${ch}`];
    return !!p && (p.is_excluded || p.priority === "excluded");
  });
}

/**
 * Build prioritised exam-simulator suggestions.
 *
 * Signals (multiplicative):
 *  - Mark weight: 120/100 markers carry the exam, so weighted heaviest.
 *  - Recency vs per-mark review interval (exponential decay; brand-new items get a strong boost).
 *  - Mastery gap: lower past % → higher priority (with floor so mastered items don't vanish).
 *  - User topic preference (high/normal/low; excluded → filtered out).
 *  - Anti-repeat momentum: an attempt in the last ~45 min strongly de-prioritises the
 *    same question, the same topic+marks bucket, and slightly favours variety in the
 *    next mark band so a 120-marker is followed by a complementary suggestion.
 *  - Weakness boost: topics with the lowest average % bubble up.
 */
export function buildSuggestions(
  history: HistoryEntry[],
  pool: ExamQuestion[] = questionIndex,
  limit = 3,
  options: BuildOptions = {},
): Suggestion[] {
  const now = options.now ?? Date.now();
  const prefs = options.prefs;

  const lastById = new Map<string, HistoryEntry>();
  const lastByBucket = new Map<string, HistoryEntry>();
  const topicStats = new Map<string, { sum: number; n: number }>();
  let mostRecent: HistoryEntry | null = null;

  for (const h of history) {
    const t = new Date(h.completedAt).getTime();
    const prev = lastById.get(h.id);
    if (!prev || new Date(prev.completedAt).getTime() < t) lastById.set(h.id, h);
    const bk = `${h.topic}|${h.marks}`;
    const pb = lastByBucket.get(bk);
    if (!pb || new Date(pb.completedAt).getTime() < t) lastByBucket.set(bk, h);
    if (typeof h.marksEarned === "number" && h.marks > 0) {
      const pct = (h.marksEarned / h.marks) * 100;
      const ts = topicStats.get(h.topic) ?? { sum: 0, n: 0 };
      ts.sum += pct; ts.n += 1; topicStats.set(h.topic, ts);
    }
    if (!mostRecent || new Date(mostRecent.completedAt).getTime() < t) mostRecent = h;
  }

  const minutesSinceLast = mostRecent
    ? (now - new Date(mostRecent.completedAt).getTime()) / 60000
    : Infinity;
  const justAttempted = minutesSinceLast < 45;

  const items: Suggestion[] = [];
  for (const q of pool) {
    if (isExcludedByPrefs(q.topic, prefs)) continue;

    const own = lastById.get(q.id);
    const bucket = lastByBucket.get(`${q.topic}|${q.marks}`);
    const ref = own ?? bucket;
    const daysSince = ref ? Math.floor((now - new Date(ref.completedAt).getTime()) / 86400000) : null;
    const lastPct = ref && typeof ref.marksEarned === "number"
      ? Math.round((ref.marksEarned / ref.marks) * 100)
      : null;

    const weight = MARK_WEIGHT[q.marks] ?? 1;
    const interval = REVIEW_INTERVAL_DAYS[q.marks] ?? 14;

    // Exponential recency: never-attempted → strong boost; just-done → near zero.
    const recency = daysSince === null
      ? 2.5
      : 0.3 + 2.2 * (1 - Math.exp(-daysSince / interval));

    const mastery = lastPct === null ? 1.15 : Math.max(0.45, (100 - lastPct) / 55);

    // Topic-level weakness: avg % across all attempts on that topic.
    const tStat = topicStats.get(q.topic);
    const topicWeak = tStat && tStat.n > 0
      ? Math.max(0.7, Math.min(1.6, (100 - tStat.sum / tStat.n) / 50))
      : 1;

    const prefMul = prefMultiplier(q.topic, prefs);

    // Anti-repeat after a fresh attempt: don't suggest the exact item or the
    // same topic+marks bucket, and reward switching to a different mark band.
    let antiRepeat = 1;
    if (justAttempted && mostRecent) {
      if (q.id === mostRecent.id) antiRepeat *= 0.05;
      if (q.topic === mostRecent.topic && q.marks === mostRecent.marks) antiRepeat *= 0.35;
      if (q.topic === mostRecent.topic) antiRepeat *= 0.7;
      if (q.marks !== mostRecent.marks) antiRepeat *= 1.15;
    }

    // Fatigue / stamina: after a heavy marker, strongly prefer lighter
    // questions for the next sitting. A 120-marker takes 50+ minutes and
    // most students won't sit back-to-back heavyweights — bias toward
    // 60/80/100 so the next suggestion is genuinely doable.
    let fatigue = 1;
    if (justAttempted && mostRecent) {
      const lastM = mostRecent.marks;
      const m = q.marks;
      if (lastM >= 120) {
        if (m >= 120) fatigue *= 0.25;       // avoid another 120
        else if (m === 100) fatigue *= 1.25; // sweet-spot follow-up
        else if (m === 80) fatigue *= 1.45;  // ideal cool-down
        else if (m === 60) fatigue *= 1.35;  // quick win
      } else if (lastM === 100) {
        if (m >= 120) fatigue *= 0.55;
        else if (m === 100) fatigue *= 0.7;
        else if (m === 80) fatigue *= 1.3;
        else if (m === 60) fatigue *= 1.25;
      } else if (lastM === 80) {
        if (m === 80) fatigue *= 0.75;
        else if (m === 60) fatigue *= 1.15;
        else if (m >= 100) fatigue *= 1.1;   // ready for a step up
      } else if (lastM === 60) {
        if (m === 60) fatigue *= 0.8;
        else if (m >= 80) fatigue *= 1.15;
      }
    }

    // Preferences carry more weight in ranking than raw mark size, so a
    // "high priority" topic genuinely surfaces above an off-preference 120.
    const prefBoost = Math.pow(prefMul, 1.35);

    const priority = weight * (0.5 + recency) * mastery * topicWeak * prefBoost * antiRepeat * fatigue;

    let reason: string;
    if (justAttempted && mostRecent && mostRecent.marks >= 120 && q.marks < 120) {
      reason = `You just sat a 120-marker — a ${q.marks}m ${q.topic.toLowerCase()} is a smarter next rep.`;
    } else if (justAttempted && mostRecent && mostRecent.marks >= 100 && q.marks < mostRecent.marks) {
      reason = `After that ${mostRecent.marks}m, step down to a ${q.marks}m ${q.topic.toLowerCase()} to keep momentum.`;
    } else if (justAttempted && mostRecent && q.topic !== mostRecent.topic) {
      reason = `Switch focus after that ${mostRecent.marks}m ${mostRecent.topic.toLowerCase()} — try a ${q.marks}m ${q.topic.toLowerCase()}.`;
    } else if (daysSince === null) {
      reason = q.marks >= 100
        ? `Heavy ${q.marks}-marker you haven't tried — high impact for the exam.`
        : `New ${q.marks}-marker on this topic.`;
    } else if (lastPct !== null && lastPct < 55) {
      reason = `Last ${q.marks}m ${q.topic} attempt was ${lastPct}% — worth a re-run.`;
    } else if (tStat && tStat.n >= 2 && tStat.sum / tStat.n < 60) {
      reason = `${q.topic} average is ${Math.round(tStat.sum / tStat.n)}% — target this weak spot.`;
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

  // Diversify across topics AND mark bands so suggestions feel complementary.
  const out: Suggestion[] = [];
  const topicCount: Record<string, number> = {};
  const markCount: Record<number, number> = {};
  for (const s of items) {
    if ((topicCount[s.q.topic] ?? 0) >= 1) continue;
    if ((markCount[s.q.marks] ?? 0) >= 2) continue;
    out.push(s);
    topicCount[s.q.topic] = 1;
    markCount[s.q.marks] = (markCount[s.q.marks] ?? 0) + 1;
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
