import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface StreakState {
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
}

const LS_KEY = "lc-streak-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

function readLocal(): StreakState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current_streak: 0, longest_streak: 0, last_active_date: null };
}
function writeLocal(s: StreakState) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch {}
}
function bumpLocal(): StreakState {
  const cur = readLocal();
  const today = todayISO();
  if (cur.last_active_date === today) return cur;
  let next = 1;
  if (cur.last_active_date) {
    const diff = Math.round((Date.parse(today) - Date.parse(cur.last_active_date)) / 86400000);
    next = diff === 1 ? cur.current_streak + 1 : 1;
  }
  const out: StreakState = {
    current_streak: next,
    longest_streak: Math.max(next, cur.longest_streak),
    last_active_date: today,
  };
  writeLocal(out);
  return out;
}

/** Read-only hook that returns the current streak (for widgets). */
export function useStreak(): StreakState {
  const { user } = useAuth();
  const [state, setState] = useState<StreakState>(() => readLocal());

  useEffect(() => {
    if (!user) { setState(readLocal()); return; }
    supabase
      .from("user_streaks")
      .select("current_streak, longest_streak, last_active_date")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setState(data as StreakState);
      });
  }, [user]);

  return state;
}

/** Call once per page mount on study pages — bumps the streak at most once per day. */
export function usePingStreak() {
  const { user } = useAuth();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    // Always bump local immediately so signed-out users still get a streak
    bumpLocal();

    if (user) {
      supabase.rpc("streak_ping", { _user_id: user.id }).then(({ data, error }) => {
        if (!error && data) {
          // sync local cache to server truth
          writeLocal(data as StreakState);
        }
      });
    }
  }, [user]);
}