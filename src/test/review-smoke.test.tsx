/**
 * Smoke test: mount QuestionRenderer for every review item across all 24 chapters.
 * Catches runtime crashes in any renderer (mcq, match, sort, fill-chip, true-false, order, define).
 */
import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import QuestionRenderer from '@/components/review/QuestionRenderer';
import { REVIEW_BANK } from '@/data/chapter-review-bank';

describe('Chapter review smoke test — all 24 chapters', () => {
  for (const [chapIdStr, items] of Object.entries(REVIEW_BANK)) {
    const chapId = Number(chapIdStr);
    describe(`Chapter ${chapId} (${items.length} items)`, () => {
      it(`has at least one review item`, () => {
        expect(items.length).toBeGreaterThan(0);
      });
      for (const item of items) {
        it(`renders ${item.id} (${item.type})`, () => {
          const { container } = render(
            <QuestionRenderer item={item} onAnswer={() => {}} onAdvance={() => {}} />
          );
          // Renderer returns a card with the prompt
          expect(container.textContent).toContain(item.prompt.slice(0, 20));
          cleanup();
        });
      }
    });
  }
});
