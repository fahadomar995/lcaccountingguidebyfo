import { useState } from 'react';
import type { CaseData } from '@/data/chapter-review-bank';

interface Props {
  data: CaseData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong' | 'close') => void;
}

/**
 * Exam-style mini case — a scenario stem with 2-3 linked sub-MCQs.
 * Overall result: correct if all sub-questions right, close if majority, wrong otherwise.
 */
export default function CaseRenderer({ data, submitted, onSubmit }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => data.questions.map(() => null));
  const [revealed, setRevealed] = useState(false);

  const allAnswered = answers.every(a => a !== null);
  const correctness = answers.map((a, i) => a === data.questions[i].correctIndex);
  const numCorrect = correctness.filter(Boolean).length;

  const handleSubmit = () => {
    if (submitted) return;
    setRevealed(true);
    const ratio = numCorrect / data.questions.length;
    if (ratio === 1) onSubmit('correct');
    else if (ratio >= 0.5) onSubmit('close');
    else onSubmit('wrong');
  };

  return (
    <div className="space-y-3">
      {/* Scenario stem */}
      <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Scenario</p>
        <p className="text-[12px] leading-relaxed text-foreground/90 whitespace-pre-line">{data.scenario}</p>
      </div>

      {/* Sub-questions */}
      {data.questions.map((q, qi) => (
        <div key={qi} className="border border-border rounded-lg p-3 bg-card">
          <p className="text-[12px] font-semibold text-foreground mb-2">
            <span className="font-mono text-[10px] text-muted-foreground mr-1.5">Q{qi + 1}.</span>
            {q.prompt}
          </p>
          <div className="space-y-1.5">
            {q.options.map((opt, oi) => {
              const isSel = answers[qi] === oi;
              const isCorrect = oi === q.correctIndex;
              let cls = 'w-full text-left px-3 py-1.5 rounded-md border text-[11px] transition-all ';
              if (revealed) {
                if (isCorrect) cls += 'border-accent bg-accent/10 text-accent font-medium';
                else if (isSel) cls += 'border-destructive/50 bg-destructive/5 text-destructive/70';
                else cls += 'border-border text-muted-foreground opacity-50';
              } else if (isSel) {
                cls += 'border-accent bg-accent/10 text-foreground font-medium';
              } else {
                cls += 'border-border hover:border-accent/40 text-foreground cursor-pointer';
              }
              return (
                <button
                  key={oi}
                  type="button"
                  className={cls}
                  disabled={revealed}
                  onClick={() => {
                    if (revealed) return;
                    const next = [...answers];
                    next[qi] = oi;
                    setAnswers(next);
                  }}
                >
                  <span className="font-mono text-[10px] text-muted-foreground mr-1.5">{String.fromCharCode(65 + oi)}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {revealed && q.explanation && (
            <p className="mt-2 text-[10.5px] text-muted-foreground leading-relaxed">{q.explanation}</p>
          )}
        </div>
      ))}

      {!revealed && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit case ({answers.filter(a => a !== null).length}/{data.questions.length})
        </button>
      )}

      {revealed && (
        <p className="text-[11px] text-muted-foreground">
          Score on this case: <strong className="text-foreground">{numCorrect}/{data.questions.length}</strong>
        </p>
      )}
    </div>
  );
}