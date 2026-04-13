import { useState } from 'react';
import type { DefineData } from '@/data/chapter-review-bank';

interface Props {
  data: DefineData;
  submitted: boolean;
  onSubmit: (result: 'got-it' | 'close' | 'missed') => void;
}

export default function DefineRenderer({ data, submitted, onSubmit }: Props) {
  const [input, setInput] = useState('');
  const [showModel, setShowModel] = useState(false);

  const handleReveal = () => {
    setShowModel(true);
  };

  return (
    <div>
      {/* Term to define */}
      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 mb-4 text-center">
        <p className="font-display text-base font-bold text-foreground">{data.term}</p>
      </div>

      {/* Input */}
      <label className="block mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your definition</span>
        <input
          type="text"
          maxLength={200}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a short definition..."
          disabled={showModel}
          className="mt-1 w-full px-3 py-2.5 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent placeholder:text-muted-foreground/50 disabled:opacity-60"
        />
      </label>

      {!showModel && (
        <button
          onClick={handleReveal}
          className="mt-3 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Reveal model answer
        </button>
      )}

      {/* Model answer + self-rating */}
      {showModel && (
        <div className="mt-4 space-y-3">
          <div className="p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Model definition</p>
            <p className="text-xs leading-relaxed text-foreground">{data.modelDefinition}</p>
          </div>

          {!submitted && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">How did you do?</p>
              <div className="flex gap-2">
                {([
                  { label: 'Got it', value: 'got-it' as const, classes: 'border-accent hover:bg-accent/10 text-accent' },
                  { label: 'Close', value: 'close' as const, classes: 'border-amber-500/40 hover:bg-amber-500/5 text-amber-600' },
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
