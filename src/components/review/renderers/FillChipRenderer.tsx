import { useState } from 'react';
import type { FillChipData } from '@/data/chapter-review-bank';

interface Props {
  data: FillChipData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

export default function FillChipRenderer({ data, submitted, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (chip: string) => {
    if (submitted) return;
    setSelected(chip);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    onSubmit(selected === data.correctChip ? 'correct' : 'wrong');
  };

  // Render sentence with blank
  const parts = data.sentence.split('___');

  return (
    <div>
      {/* Sentence with blank */}
      <p className="text-xs leading-relaxed text-foreground mb-4">
        {parts[0]}
        <span className={`inline-block min-w-[80px] px-2 py-0.5 mx-1 rounded border-b-2 text-center font-medium ${
          submitted
            ? selected === data.correctChip
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-destructive/50 bg-destructive/5 text-destructive'
            : selected
              ? 'border-accent bg-accent/5 text-accent'
              : 'border-muted-foreground/30 text-muted-foreground'
        }`}>
          {selected || '\u00A0\u2014\u00A0'}
        </span>
        {parts[1]}
      </p>

      {/* Show correct answer if wrong */}
      {submitted && selected !== data.correctChip && (
        <p className="text-[11px] text-accent mb-3">
          Correct answer: <strong>{data.correctChip}</strong>
        </p>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {data.chips.map(chip => {
          let classes = 'px-3 py-1.5 rounded-full text-xs font-medium border transition-all ';

          if (submitted) {
            if (chip === data.correctChip) {
              classes += 'border-accent bg-accent/10 text-accent';
            } else if (chip === selected) {
              classes += 'border-destructive/50 bg-destructive/5 text-destructive/70';
            } else {
              classes += 'border-border text-muted-foreground opacity-40';
            }
          } else if (chip === selected) {
            classes += 'border-accent bg-accent/10 text-accent';
          } else {
            classes += 'border-border hover:border-accent/40 text-foreground cursor-pointer';
          }

          return (
            <button
              key={chip}
              type="button"
              className={classes}
              onClick={() => handleSelect(chip)}
              disabled={submitted}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      )}
    </div>
  );
}
