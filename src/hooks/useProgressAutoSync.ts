import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PROGRESS_KEYS, pushProgress, pullAndMergeProgress } from "@/lib/progressSync";

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

    const flush = () => {
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
    };

    const pull = async () => {
      const changed = await pullAndMergeProgress(user.id);
      if (changed.length) {
        // Refresh our local cache so the merged value isn't immediately re-pushed,
        // and notify any listeners that progress changed.
        for (const key of changed) {
          last.current[key] = localStorage.getItem(key) ?? "";
        }
        try { window.dispatchEvent(new CustomEvent("lc-progress-pulled", { detail: { keys: changed } })); } catch {}
      }
    };

    // Initial pull so a freshly-loaded tab sees changes from other devices.
    pull();

    const pushId = window.setInterval(flush, 5000);
    const pullId = window.setInterval(pull, 30000);
    const onVis = () => {
      if (document.visibilityState === "hidden") {
        flush();
      } else {
        // Tab became visible again — pull immediately so cross-device edits show up.
        pull();
      }
    };
    window.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", flush);
    window.addEventListener("storage", flush);

    return () => {
      window.clearInterval(pushId);
      window.clearInterval(pullId);
      window.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", flush);
      window.removeEventListener("storage", flush);
      flush();
    };
  }, [user]);
}