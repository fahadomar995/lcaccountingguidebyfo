import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PROGRESS_KEYS, pushProgress } from "@/lib/progressSync";

/**
 * Watches the tracked localStorage progress keys and pushes any changes
 * to the cloud while a user is signed in. Uses a 5s poll because most
 * writes happen via setItem and don't fire `storage` events in the same tab.
 */
export function useProgressAutoSync() {
  const { user } = useAuth();
  const last = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    // Seed cache with current values so we don't push on first tick
    PROGRESS_KEYS.forEach((k) => { last.current[k] = localStorage.getItem(k) ?? ""; });

    const id = window.setInterval(() => {
      for (const key of PROGRESS_KEYS) {
        const cur = localStorage.getItem(key) ?? "";
        if (cur !== last.current[key]) {
          last.current[key] = cur;
          if (!cur) continue;
          let parsed: any = cur;
          try { parsed = JSON.parse(cur); } catch {}
          pushProgress(user.id, key, parsed);
        }
      }
    }, 5000);

    return () => window.clearInterval(id);
  }, [user]);
}