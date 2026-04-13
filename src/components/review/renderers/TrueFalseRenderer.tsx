import { useState } from 'react';
import type { TrueFalseData } from '@/data/chapter-review-bank';

interface Props {
  data: TrueFalseData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

export default function TrueFalseRenderer({ data, submitted, onSubmit }: Props) {
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [tfSubmitted, setTfSubmitted] = useState(false);
  const [followUpSelected, setFollowUpSelected] = useState<string | null>(null);
  const needsFollowUp = !data.isTrue && data.followUp;

  const handleTF = (val: boolean) => {
    if (tfSubmitted || submitted) return;
    setAnswer(val);
  };

  const handleSubmitTF = () => {
    if (answer === null || tfSubmitted) return;
    setTfSubmitted(true);

    // If correct True or correct False without follow-up, done
    if (answer === data.isTrue) {
      if (!needsFollowUp || answer === true) {
        onSubmit('correct');
      }
      // If false and has follow-up, wait for follow-up
    } else {
      onSubmit('wrong');
    }
  };

  const handleFollowUpSubmit = () => {
    if (!followUpSelected || !data.followUp) return;
    onSubmit(followUpSelected === data.followUp.correctChip ? 'correct' : 'wrong');
  };

  const tfCorrect = tfSubmitted && answer === data.isTrue;
  const tfWrong = tfSubmitted && answer !== data.isTrue;
  const showFollowUp = tfCorrect && needsFollowUp && !submitted;

  return (
    <div>
      {/* Statement */}
      <div className="p-3 rounded-lg bg-muted/30 border border-border mb-4">
        <p className="text-xs leading-relaxed text-foreground">{data.statement}</p>
      </div>

      {/* True / False buttons */}
      <fieldset className="flex gap-3 mb-3">
        <legend className="sr-only">Is this statement true or false?</legend>
        {[true, false].map(val => {
          const label = val ? 'True' : 'False';
          let classes = 'flex-1 py-2.5 rounded-lg text-xs font-medium border transition-all ';

          if (tfSubmitted) {
            if (val === data.isTrue) {
              classes += 'border-accent bg-accent/10 text-accent';
            } else if (val === answer) {
              classes += 'border-destructive/50 bg-destructive/5 text-destructive';
            } else {
              classes += 'border-border text-muted-foreground opacity-40';
            }
          } else if (val === answer) {
            classes += 'border-accent bg-accent/10 text-accent';
          } else {
            classes += 'border-border hover:border-accent/40 text-foreground cursor-pointer';
          }

          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={answer === val}
              className={classes}
              onClick={() => handleTF(val)}
              disabled={tfSubmitted}
            >
              {label}
            </button>
          );
        })}
      </fieldset>

      {!tfSubmitted && (
        <button
          onClick={handleSubmitTF}
          disabled={answer === null}
          className="px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      )}

      {/* Follow-up chip picker (only if answered False correctly and there is a follow-up) */}
      {showFollowUp && data.followUp && (
        <div className="mt-4 pt-3 border-t border-border space-y-3">
          <p className="text-xs font-medium text-foreground">{data.followUp.prompt}</p>
          <div className="flex flex-col gap-2">
            {data.followUp.chips.map(chip => {
              let classes = 'text-left px-3 py-2 rounded-lg text-xs border transition-all ';

              if (submitted) {
                if (chip === data.followUp!.correctChip) {
                  classes += 'border-accent bg-accent/10 text-accent';
                } else if (chip === followUpSelected) {
                  classes += 'border-destructive/50 bg-destructive/5 text-destructive/70';
                } else {
                  classes += 'border-border text-muted-foreground opacity-40';
                }
              } else if (chip === followUpSelected) {
                classes += 'border-accent bg-accent/10 text-accent';
              } else {
                classes += 'border-border hover:border-accent/40 text-foreground cursor-pointer';
              }

              return (
                <button
                  key={chip}
                  type="button"
                  className={classes}
                  onClick={() => !submitted && setFollowUpSelected(chip)}
                  disabled={submitted}
                >
                  {chip}
                </button>
              );
            })}
          </div>
          {!submitted && (
            <button
              onClick={handleFollowUpSubmit}
              disabled={!followUpSelected}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
