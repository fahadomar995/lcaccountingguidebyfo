import { useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { REVIEW_BANK, type ReviewItem } from '@/data/chapter-review-bank';

interface SessionState {
  chapterId: number;
  itemIds: string[];
  currentIndex: number;
  answers: Record<string, 'correct' | 'wrong' | 'got-it' | 'close' | 'missed'>;
}

interface TimestampMap {
  [itemId: string]: number;
}

const SESSION_SIZE = 8;
const MAX_PER_TYPE = 4; // allow up to 4 of the same type (e.g. MCQ) per session

export function useChapterReview(chapterId: number) {
  const [timestamps, setTimestamps] = useLocalStorage<TimestampMap>('lc-review-timestamps', {});
  const [savedSession, setSavedSession] = useLocalStorage<SessionState | null>('lc-review-session', null);

  const pickItems = useCallback(
    (excludeIds: string[] = []): ReviewItem[] => {
      const bank = REVIEW_BANK[chapterId] || [];
      if (bank.length === 0) return [];

      const target = Math.min(SESSION_SIZE, bank.length);
      const available = bank.filter(item => !excludeIds.includes(item.id));
      const pool = available.length >= target ? available : bank;

      // Bucket by type so we can guarantee variety per session.
      const byType = new Map<string, ReviewItem[]>();
      for (const item of pool) {
        const list = byType.get(item.type) ?? [];
        list.push(item);
        byType.set(item.type, list);
      }
      // Within each bucket, oldest-seen / never-seen first, with a small random jitter
      // to avoid identical rotations across sessions.
      for (const list of byType.values()) {
        list.sort((a, b) => {
          const tA = timestamps[a.id] || 0;
          const tB = timestamps[b.id] || 0;
          if (tA === tB) return Math.random() - 0.5;
          return tA - tB;
        });
      }

      const picked: ReviewItem[] = [];
      const typeCount = new Map<string, number>();
      const typeOrder = Array.from(byType.keys());

      // Round-robin pick from each type until we hit SESSION_SIZE or buckets dry up.
      // Cap MCQs (and any other type) at MAX_PER_TYPE so a session always mixes
      // formats but still pulls plenty of the deepened MCQ pool.
      let rrIdx = 0;
      let safety = 0;
      while (picked.length < target && safety++ < 200) {
        let advanced = false;
        for (let i = 0; i < typeOrder.length && picked.length < target; i++) {
          const t = typeOrder[(rrIdx + i) % typeOrder.length];
          const cap = t === 'define' ? 1 : MAX_PER_TYPE;
          if ((typeCount.get(t) ?? 0) >= cap) continue;
          const bucket = byType.get(t)!;
          const next = bucket.shift();
          if (!next) continue;
          picked.push(next);
          typeCount.set(t, (typeCount.get(t) ?? 0) + 1);
          advanced = true;
        }
        rrIdx = (rrIdx + 1) % Math.max(typeOrder.length, 1);
        if (!advanced) break;
      }

      // Top up from whatever remains (e.g. only MCQs left in a chapter), ignoring cap.
      if (picked.length < target) {
        for (const list of byType.values()) {
          for (const item of list) {
            if (picked.length >= target) break;
            if (!picked.includes(item)) picked.push(item);
          }
        }
      }

      // Shuffle the final order so the same type doesn't appear consecutively.
      for (let i = picked.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [picked[i], picked[j]] = [picked[j], picked[i]];
      }

      return picked.slice(0, target);
    },
    [chapterId, timestamps]
  );

  const startSession = useCallback(
    (excludeIds: string[] = []): SessionState | null => {
      const items = pickItems(excludeIds);
      if (items.length === 0) return null;

      const session: SessionState = {
        chapterId,
        itemIds: items.map(i => i.id),
        currentIndex: 0,
        answers: {},
      };
      setSavedSession(session);
      return session;
    },
    [chapterId, pickItems, setSavedSession]
  );

  const recordAnswer = useCallback(
    (itemId: string, result: 'correct' | 'wrong' | 'got-it' | 'close' | 'missed') => {
      setTimestamps(prev => ({ ...prev, [itemId]: Date.now() }));
      setSavedSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          answers: { ...prev.answers, [itemId]: result },
        };
      });
    },
    [setTimestamps, setSavedSession]
  );

  const advanceQuestion = useCallback(() => {
    setSavedSession(prev => {
      if (!prev) return prev;
      return { ...prev, currentIndex: prev.currentIndex + 1 };
    });
  }, [setSavedSession]);

  const clearSession = useCallback(() => {
    setSavedSession(null);
  }, [setSavedSession]);

  const resumeSession = useCallback((): SessionState | null => {
    if (savedSession && savedSession.chapterId === chapterId) {
      return savedSession;
    }
    return null;
  }, [savedSession, chapterId]);

  const getItem = useCallback(
    (id: string): ReviewItem | undefined => {
      return (REVIEW_BANK[chapterId] || []).find(item => item.id === id);
    },
    [chapterId]
  );

  const hasItems = (REVIEW_BANK[chapterId] || []).length > 0;

  const bank = REVIEW_BANK[chapterId] || [];
  const totalItems = bank.length;
  const seenItems = bank.filter(i => (timestamps[i.id] ?? 0) > 0).length;

  return {
    hasItems,
    totalItems,
    seenItems,
    startSession,
    resumeSession,
    recordAnswer,
    advanceQuestion,
    clearSession,
    getItem,
    session: savedSession?.chapterId === chapterId ? savedSession : null,
  };
}
