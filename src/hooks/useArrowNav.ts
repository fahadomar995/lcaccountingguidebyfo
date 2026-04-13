import { useEffect } from 'react';

/**
 * Global arrow-key navigation for prev/next actions.
 * Only fires when no input/textarea/select is focused.
 */
export function useArrowNav(
  onPrev: (() => void) | null,
  onNext: (() => void) | null,
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;

      if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPrev, onNext]);
}
