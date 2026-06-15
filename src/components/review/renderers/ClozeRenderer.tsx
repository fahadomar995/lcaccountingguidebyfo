import { useMemo, useState } from 'react';
import type { ClozeData } from '@/data/chapter-review-bank';

interface Props {
  data: ClozeData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong' | 'close') => void;
}

function normalise(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function fuzzyMatch(input: string, accepts: string[]): boolean {
  const a = normalise(input);
  if (!a) return false;
  return accepts.some(target => {
    const t = normalise(target);
    if (!t) return false;
    if (a === t) return true;
    // Allow plurals / trailing 's' tolerance and one-character typos for words ≥ 5 chars.
    if (a.replace(/s$/, '') === t.replace(/s$/, '')) return true;
    if (t.length >= 5 && Math.abs(a.length - t.length) <= 1) {
      let diff = 0;
      for (let i = 0, j = 0; i < a.length && j < t.length; ) {
        if (a[i] === t[j]) { i++; j++; continue; }
        diff++;
        if (diff > 1) return false;
        if (a.length > t.length) i++;
        else if (a.length < t.length) j++;
        else { i++; j++; }
      }
      return diff + Math.abs(a.length - t.length) <= 1;
    }
    return false;
  });
}

export default function ClozeRenderer({ data, submitted, onSubmit }: Props) {
  const [inputs, setInputs] = useState<string[]>(() => data.blanks.map(() => ''));

  // Split sentence into segments around {{n}} placeholders.
  const segments = useMemo(() => {
    const parts: { kind: 'text' | 'blank'; value: string; index?: number }[] = [];
    const re = /\{\{(\d+)\}\}/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(data.sentence)) !== null) {
      if (m.index > last) parts.push({ kind: 'text', value: data.sentence.slice(last, m.index) });
      parts.push({ kind: 'blank', value: '', index: Number(m[1]) });
      last = m.index + m[0].length;
    }
    if (last < data.sentence.length) parts.push({ kind: 'text', value: data.sentence.slice(last) });
    return parts;
  }, [data.sentence]);

  const allFilled = inputs.every(v => v.trim().length > 0);

  const correctness = data.blanks.map((b, i) => fuzzyMatch(inputs[i] ?? '', b.accepts));
  const numCorrect = correctness.filter(Boolean).length;

  const handleSubmit = () => {
    if (submitted) return;
    const ratio = numCorrect / data.blanks.length;
    if (ratio === 1) onSubmit('correct');
    else if (ratio >= 0.5) onSubmit('close');
    else onSubmit('wrong');
  };

  return (
    <div>
      <p className="text-[13px] sm:text-sm leading-relaxed text-foreground mb-4">
        {segments.map((seg, i) => {
          if (seg.kind === 'text') return <span key={i}>{seg.value}</span>;
          const idx = seg.index!;
          const ok = correctness[idx];
          let cls = 'inline-block min-w-[90px] mx-1 px-2 py-0.5 rounded border-b-2 text-center font-medium bg-background text-xs ';
          if (submitted) {
            cls += ok
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-destructive/50 bg-destructive/5 text-destructive';
          } else {
            cls += 'border-muted-foreground/30 text-foreground focus-within:border-accent';
          }
          return (
            <span key={i} className={cls}>
              <input
                type="text"
                value={inputs[idx] ?? ''}
                onChange={e => {
                  if (submitted) return;
                  const next = [...inputs];
                  next[idx] = e.target.value;
                  setInputs(next);
                }}
                placeholder={data.blanks[idx]?.hint ?? '\u2026'}
                disabled={submitted}
                className="w-[110px] bg-transparent outline-none text-center"
              />
            </span>
          );
        })}
      </p>

      {submitted && (
        <div className="text-[11px] text-muted-foreground mb-2 space-y-0.5">
          {data.blanks.map((b, i) =>
            correctness[i] ? null : (
              <p key={i}>
                Blank {i + 1}: <strong className="text-accent">{b.accepts[0]}</strong>
              </p>
            )
          )}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          className="mt-2 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      )}
    </div>
  );
}