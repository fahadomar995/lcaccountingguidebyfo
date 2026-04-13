import { BookOpen, ArrowRight } from 'lucide-react';

interface Props {
  chapterTitle: string;
  hasItems: boolean;
  onStart: () => void;
}

export default function ReviewEntryCard({ chapterTitle, hasItems, onStart }: Props) {
  if (!hasItems) return null;

  return (
    <div className="mt-6 border border-accent/30 rounded-lg p-4 bg-accent/5">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
          <span className="font-display text-sm font-bold text-accent">R</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-sm font-semibold text-foreground">Quick Review</h4>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            A 2-minute check on {chapterTitle}
          </p>
        </div>
        <button
          onClick={onStart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent/15 text-accent hover:bg-accent/25 transition-colors shrink-0"
        >
          Start <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
