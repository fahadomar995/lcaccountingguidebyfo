import type { ReviewItem } from '@/data/chapter-review-bank';
import { ArrowRight, RotateCcw, BookOpen } from 'lucide-react';

interface ResultEntry {
  item: ReviewItem;
  result: 'correct' | 'wrong' | 'got-it' | 'close' | 'missed';
}

interface Props {
  score: number;
  total: number;
  results: ResultEntry[];
  onTryAnother: () => void;
  onBackToChapter: () => void;
  onNavigateToSection: (sectionLink: string) => void;
}

function getSummary(score: number, total: number): string {
  const ratio = score / total;
  if (ratio >= 0.8) return 'Nice \u2014 most of the chapter has stuck.';
  if (ratio >= 0.6) return 'Good progress \u2014 one or two to revisit.';
  return 'Worth a second read through the chapter.';
}

export default function ReviewResults({ score, total, results, onTryAnother, onBackToChapter, onNavigateToSection }: Props) {
  const missed = results.filter(r => r.result === 'wrong' || r.result === 'missed');

  return (
    <div className="max-w-[720px] mx-auto">
      <div className="border border-border rounded-lg bg-card p-6 space-y-5">
        {/* Score */}
        <div className="text-center">
          <p className="font-display text-3xl font-bold text-foreground">
            <span className="font-mono">{score}</span>
            <span className="text-muted-foreground text-lg mx-1">/</span>
            <span className="font-mono">{total}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">{getSummary(score, total)}</p>
        </div>

        {/* Missed items */}
        {missed.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Worth revisiting</p>
            {missed.map(({ item }) => (
              <div key={item.id} className="flex items-start gap-2 p-2.5 rounded-md bg-muted/30 border border-border">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{item.prompt}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{item.explanation}</p>
                </div>
                {item.sectionLink && (
                  <button
                    className="flex items-center gap-1 text-[10px] text-accent hover:text-accent/80 transition-colors shrink-0 mt-0.5"
                    onClick={() => onNavigateToSection(item.sectionLink!)}
                  >
                    <BookOpen className="h-3 w-3" /> Revisit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={onTryAnother}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Try another 5
          </button>
          <button
            onClick={onBackToChapter}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-accent/15 text-accent hover:bg-accent/25 transition-colors"
          >
            Back to chapter <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
