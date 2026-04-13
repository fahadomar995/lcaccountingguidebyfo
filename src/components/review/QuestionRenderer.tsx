import { useState, useCallback } from 'react';
import type { ReviewItem } from '@/data/chapter-review-bank';
import MCQRenderer from './renderers/MCQRenderer';
import FillChipRenderer from './renderers/FillChipRenderer';
import TrueFalseRenderer from './renderers/TrueFalseRenderer';
import DefineRenderer from './renderers/DefineRenderer';
import MatchRenderer from './renderers/MatchRenderer';
import SortRenderer from './renderers/SortRenderer';
import OrderRenderer from './renderers/OrderRenderer';

interface Props {
  item: ReviewItem;
  onAnswer: (result: 'correct' | 'wrong' | 'got-it' | 'close' | 'missed') => void;
  onAdvance: () => void;
}

export default function QuestionRenderer({ item, onAnswer, onAdvance }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleResult = useCallback((result: 'correct' | 'wrong' | 'got-it' | 'close' | 'missed') => {
    setSubmitted(true);
    onAnswer(result);
  }, [onAnswer]);

  const handleAdvance = useCallback(() => {
    setAnswered(true);
    onAdvance();
  }, [onAdvance]);

  const advanceButton = submitted ? (
    <div className="flex justify-end mt-4">
      <button
        onClick={handleAdvance}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === 'ArrowRight') handleAdvance(); }}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-accent/15 text-accent hover:bg-accent/25 transition-colors"
        autoFocus
      >
        Next question
      </button>
    </div>
  ) : null;

  const explanation = submitted ? (
    <div className="mt-3 p-3 rounded-md bg-muted/30 border border-border">
      <p className="text-[11px] text-muted-foreground leading-relaxed">{item.explanation}</p>
    </div>
  ) : null;

  const prompt = (
    <p className="font-display text-sm font-semibold text-foreground mb-4">{item.prompt}</p>
  );

  const wrapCard = (children: React.ReactNode) => (
    <div className="border border-border rounded-lg bg-card p-5">
      {prompt}
      {children}
      {explanation}
      {advanceButton}
    </div>
  );

  switch (item.type) {
    case 'mcq':
      return wrapCard(
        <MCQRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'fill-chip':
      return wrapCard(
        <FillChipRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'true-false':
      return wrapCard(
        <TrueFalseRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'define':
      return wrapCard(
        <DefineRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'match':
      return wrapCard(
        <MatchRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'sort':
      return wrapCard(
        <SortRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    case 'order':
      return wrapCard(
        <OrderRenderer data={item.itemData.data as any} submitted={submitted} onSubmit={handleResult} />
      );
    default:
      return null;
  }
}
