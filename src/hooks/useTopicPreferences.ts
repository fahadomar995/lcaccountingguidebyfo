import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type TopicPriority = "high" | "normal" | "low" | "excluded";

export interface TopicPreference {
  topic_id: string;
  priority: TopicPriority;
  priority_weight: number;
  is_excluded: boolean;
}

const LS_KEY = "lc-topic-preferences-v1";
const WEIGHT: Record<TopicPriority, number> = { high: 2, normal: 1, low: 0.4, excluded: 0 };

function readLocal(): Record<string, TopicPreference> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function writeLocal(map: Record<string, TopicPreference>) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(map)); } catch {}
}

export function useTopicPreferences() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState<Record<string, TopicPreference>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (!user) {
      setPrefs(readLocal());
      setLoading(false);
      return;
    }
    supabase
      .from("user_topic_preferences")
      .select("topic_id, priority, priority_weight, is_excluded")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (cancelled) return;
        const map: Record<string, TopicPreference> = {};
        (data || []).forEach((r: any) => {
          map[r.topic_id] = {
            topic_id: r.topic_id,
            priority: r.priority as TopicPriority,
            priority_weight: Number(r.priority_weight),
            is_excluded: !!r.is_excluded,
          };
        });
        // Merge any local-only preferences set before sign-in
        const local = readLocal();
        Object.values(local).forEach((p) => { if (!map[p.topic_id]) map[p.topic_id] = p; });
        setPrefs(map);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [user]);

  const setPriority = useCallback(async (topicId: string, priority: TopicPriority) => {
    const next: TopicPreference = {
      topic_id: topicId,
      priority,
      priority_weight: WEIGHT[priority],
      is_excluded: priority === "excluded",
    };
    setPrefs((prev) => ({ ...prev, [topicId]: next }));
    if (user) {
      await supabase.from("user_topic_preferences").upsert({
        user_id: user.id,
        topic_id: topicId,
        priority,
        priority_weight: WEIGHT[priority],
        is_excluded: priority === "excluded",
      }, { onConflict: "user_id,topic_id" });
    } else {
      const map = readLocal();
      map[topicId] = next;
      writeLocal(map);
    }
  }, [user]);

  const get = useCallback((topicId: string): TopicPreference => {
    return prefs[topicId] || {
      topic_id: topicId, priority: "normal", priority_weight: 1, is_excluded: false,
    };
  }, [prefs]);

  return { prefs, get, setPriority, loading };
}