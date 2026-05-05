import { supabase } from "@/integrations/supabase/client";

/**
 * Keys in localStorage that represent user progress and should sync
 * to the cloud once a user signs in.
 */
export const PROGRESS_KEYS = [
  "lc-theory-scores",
  "lc-theory-ch-progress",
  "lc-theory-last",
  "lc-flash-status-v2",
  "lc-flash-known",
  "lc-classify-best",
  "lc-practice-tracker",
  "lc-learn-progress",
  "lc-streak-v1",
  "lc-topic-preferences-v1",
  "lc-chapter-review",
  "lc-flash-srs-v1",
  "lc-flash-stats-v1",
  "lc-flash-goal-settings-v1",
  "lc-flash-goal-progress-v1",
  "lc-flash-goal-presets-v1",
  "lca_simulator_history",
] as const;

const SYNCED_FLAG = "lc-progress-synced-for";

function safeParse(raw: string | null): unknown {
  if (raw == null) return null;
  try { return JSON.parse(raw); } catch { return raw; }
}

/**
 * Merge strategy per key. Default: prefer cloud value if present, else local.
 * For numeric "best" / streak counters we take the max.
 */
function merge(key: string, local: unknown, cloud: unknown): unknown {
  if (cloud == null) return local;
  if (local == null) return cloud;

  if (key === "lc-classify-best") {
    return Math.max(Number(local) || 0, Number(cloud) || 0);
  }
  if (key === "lc-streak-v1" && typeof local === "object" && typeof cloud === "object") {
    const a = local as any, b = cloud as any;
    return {
      current_streak: Math.max(a.current_streak || 0, b.current_streak || 0),
      longest_streak: Math.max(a.longest_streak || 0, b.longest_streak || 0),
      last_active_date: (a.last_active_date || "") > (b.last_active_date || "")
        ? a.last_active_date : b.last_active_date,
    };
  }
  if (typeof local === "object" && typeof cloud === "object" && !Array.isArray(local) && !Array.isArray(cloud)) {
    return { ...(cloud as object), ...(local as object) };
  }
  return cloud;
}

/**
 * On first sign-in for this device, push every local progress key up,
 * then pull merged values back down so the user's prior anonymous progress
 * carries forward.
 */
export async function syncProgressOnSignIn(userId: string): Promise<void> {
  try {
    const flag = localStorage.getItem(SYNCED_FLAG);
    if (flag === userId) return;

    // 1. Read remote
    const { data: remoteRows } = await supabase
      .from("user_progress")
      .select("key, value")
      .eq("user_id", userId);
    const remote = new Map<string, unknown>();
    (remoteRows || []).forEach((r: any) => remote.set(r.key, r.value));

    // 2. For each known key, merge local + remote and write back both stores
    const upserts: { user_id: string; key: string; value: any }[] = [];
    for (const key of PROGRESS_KEYS) {
      const local = safeParse(localStorage.getItem(key));
      const cloud = remote.get(key) ?? null;
      const merged = merge(key, local, cloud);
      if (merged == null) continue;
      try { localStorage.setItem(key, typeof merged === "string" ? merged : JSON.stringify(merged)); } catch {}
      upserts.push({ user_id: userId, key, value: merged as any });
    }
    if (upserts.length) {
      await supabase.from("user_progress").upsert(upserts, { onConflict: "user_id,key" });
    }
    localStorage.setItem(SYNCED_FLAG, userId);
  } catch (err) {
    console.warn("[progressSync] failed", err);
  }
}

/** Push a single key to the cloud (fire-and-forget). */
export async function pushProgress(userId: string, key: string, value: unknown): Promise<void> {
  try {
    await supabase.from("user_progress").upsert(
      { user_id: userId, key, value: value as any },
      { onConflict: "user_id,key" }
    );
  } catch {}
}

/** Wipe local progress (for "reset progress" actions). */
export function clearLocalProgress(): void {
  PROGRESS_KEYS.forEach((k) => { try { localStorage.removeItem(k); } catch {} });
  try { localStorage.removeItem(SYNCED_FLAG); } catch {}
}