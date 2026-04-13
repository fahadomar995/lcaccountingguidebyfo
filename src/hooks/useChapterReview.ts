import { useState, useCallback, useEffect, useRef } from 'react';
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

export function useChapterReview(chapterId: number) {
  const [timestamps, setTimestamps] = useLocalStorage<TimestampMap>('lc-review-timestamps', {});
  const [savedSession, setSavedSession] = useLocalStorage<SessionState | null>('lc-review-session', null);

  const pickItems = useCallback(
    (excludeIds: string[] = []): ReviewItem[] => {
      const bank = REVIEW_BANK[chapterId] || [];
      if (bank.length === 0) return [];

      const available = bank.filter(item => !excludeIds.includes(item.id));
      const pool = available.length >= 5 ? available : bank;

      // Sort by last-seen timestamp (oldest first / never-seen first)
      const sorted = [...pool].sort((a, b) => {
        const tA = timestamps[a.id] || 0;
        const tB = timestamps[b.id] || 0;
        return tA - tB;
      });

      // Pick 5, ensuring at most 1 define type and variety in types
      const picked: ReviewItem[] = [];
      const usedTypes = new Set<string>();
      let hasDefine = false;

      for (const item of sorted) {
        if (picked.length >= 5) break;
        if (item.type === 'define' && hasDefine) continue;
        // Allow same type only if we've exhausted variety
        if (usedTypes.has(item.type) && picked.length < Math.min(sorted.length, 5) - 1) {
          // Skip if we have other type options
          const remaining = sorted.filter(
            s => !picked.includes(s) && !usedTypes.has(s.type) && !(s.type === 'define' && hasDefine)
          );
          if (remaining.length > 0) continue;
        }
        picked.push(item);
        usedTypes.add(item.type);
        if (item.type === 'define') hasDefine = true;
      }

      // If we still need more, fill from sorted
      if (picked.length < 5) {
        for (const item of sorted) {
          if (picked.length >= 5) break;
          if (!picked.includes(item)) {
            if (item.type === 'define' && hasDefine) continue;
            picked.push(item);
            if (item.type === 'define') hasDefine = true;
          }
        }
      }

      // Shuffle the picked items
      for (let i = picked.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [picked[i], picked[j]] = [picked[j], picked[i]];
      }

      return picked.slice(0, 5);
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

  return {
    hasItems,
    startSession,
    resumeSession,
    recordAnswer,
    advanceQuestion,
    clearSession,
    getItem,
    session: savedSession?.chapterId === chapterId ? savedSession : null,
  };
}
