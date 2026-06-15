import { useState } from 'react';
import type { ExplainData } from '@/data/chapter-review-bank';

interface Props {
  data: ExplainData;
  submitted: boolean;
  onSubmit: (result: 'got-it' | 'close' | 'missed') => void;
}

/**
 * Explain-then-reveal. The student is asked to mentally rehearse the answer
 * (and optionally jot key points), then taps Reveal to compare with the model
 * and self-rate. Backed by retrieval-practice evidence.
 */
export default function ExplainRenderer({ data, submitted, onSubmit }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [notes, setNotes] = useState('');
  const [confident, setConfident] = useState<boolean | null>(null);

  return (
    <div>
      <div className="p-3 rounded-lg bg-muted/30 border border-border mb-3 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Step 1 — explain it aloud</p>
        <p className="text-[11px] text-foreground/80 leading-relaxed">
          Try to explain the answer out loud (or jot the headline points below) before revealing the model.
        </p>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          disabled={revealed}
          placeholder="Optional — jot key points"
          rows={2}
          className="w-full text-xs px-2.5 py-1.5 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent placeholder:text-muted-foreground/50 disabled:opacity-60 resize-none"
        />

        {!revealed && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</span>
            <button
              type="button"
              onClick={() => setConfident(true)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all ${
                confident === true
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted-foreground hover:border-accent/40'
              }`}
            >
              I could explain this
            </button>
            <button
              type="button"
              onClick={() => setConfident(false)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all ${
                confident === false
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-600'
                  : 'border-border text-muted-foreground hover:border-amber-500/40'
              }`}
            >
              Unsure
            </button>
          </div>
        )}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Reveal model answer
        </button>
      ) : (
        <div className="space-y-3">
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="p-3 rounded-lg border border-border bg-card">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Key points to mention</p>
              <ul className="space-y-0.5">
                {data.keyPoints.map((p, i) => (
                  <li key={i} className="text-[11px] text-foreground/85 leading-relaxed">• {p}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Model answer</p>
            <p className="text-xs leading-relaxed text-foreground">{data.modelAnswer}</p>
          </div>

          {!submitted && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">How close were you?</p>
              <div className="flex gap-2">
                {([
                  { label: 'Nailed it', value: 'got-it' as const, classes: 'border-accent hover:bg-accent/10 text-accent' },
                  { label: 'Partial', value: 'close' as const, classes: 'border-amber-500/40 hover:bg-amber-500/5 text-amber-600' },
                  { label: 'Missed', value: 'missed' as const, classes: 'border-destructive/40 hover:bg-destructive/5 text-destructive/70' },
                ]).map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => onSubmit(opt.value)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${opt.classes}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}