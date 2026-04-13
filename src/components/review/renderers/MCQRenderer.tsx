import { useState } from 'react';
import type { MCQData } from '@/data/chapter-review-bank';

interface Props {
  data: MCQData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

export default function MCQRenderer({ data, submitted, onSubmit }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    onSubmit(selected === data.correctIndex ? 'correct' : 'wrong');
  };

  return (
    <div>
      <fieldset>
        <legend className="sr-only">Choose the correct answer</legend>
        <div className="space-y-2">
          {data.options.map((opt, i) => {
            let classes = 'w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ';

            if (submitted) {
              if (i === data.correctIndex) {
                classes += 'border-accent bg-accent/10 text-accent font-medium';
              } else if (i === selected) {
                classes += 'border-destructive/50 bg-destructive/5 text-destructive/70';
              } else {
                classes += 'border-border text-muted-foreground opacity-50';
              }
            } else if (i === selected) {
              classes += 'border-accent bg-accent/10 text-foreground font-medium';
            } else {
              classes += 'border-border hover:border-accent/40 text-foreground cursor-pointer';
            }

            return (
              <label key={i} className="block">
                <button
                  type="button"
                  className={classes}
                  onClick={() => handleSelect(i)}
                  disabled={submitted}
                  role="radio"
                  aria-checked={selected === i}
                >
                  <span className="font-mono text-[10px] text-muted-foreground mr-2">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              </label>
            );
          })}
        </div>
      </fieldset>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      )}
    </div>
  );
}
