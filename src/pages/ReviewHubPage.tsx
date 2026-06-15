import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles, BookOpen, CheckCircle2, Layers } from "lucide-react";
import { CHAPTERS, BLOCK_LABELS, type Block } from "@/data/theoryChapters";
import { REVIEW_BANK } from "@/data/chapter-review-bank";
import ReviewSession from "@/components/review/ReviewSession";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TimestampMap { [itemId: string]: number }

export default function ReviewHubPage() {
  const [timestamps] = useLocalStorage<TimestampMap>("lc-review-timestamps", {});
  const [activeChapter, setActiveChapter] = useState<{ id: number; title: string } | null>(null);

  const chapterStats = useMemo(() => {
    return CHAPTERS.map((c) => {
      const bank = REVIEW_BANK[c.id] || [];
      const total = bank.length;
      const seen = bank.filter((i) => (timestamps[i.id] ?? 0) > 0).length;
      const typeBreakdown = bank.reduce<Record<string, number>>((acc, i) => {
        acc[i.type] = (acc[i.type] || 0) + 1;
        return acc;
      }, {});
      return { chapter: c, total, seen, typeBreakdown };
    });
  }, [timestamps]);

  const totalsByBlock = useMemo(() => {
    const grouped = new Map<Block, typeof chapterStats>();
    for (const row of chapterStats) {
      if (!grouped.has(row.chapter.block)) grouped.set(row.chapter.block, []);
      grouped.get(row.chapter.block)!.push(row);
    }
    return grouped;
  }, [chapterStats]);

  const overall = useMemo(() => {
    const total = chapterStats.reduce((s, r) => s + r.total, 0);
    const seen = chapterStats.reduce((s, r) => s + r.seen, 0);
    const chaptersWithBank = chapterStats.filter((r) => r.total > 0).length;
    const chaptersStarted = chapterStats.filter((r) => r.seen > 0).length;
    return { total, seen, chaptersWithBank, chaptersStarted };
  }, [chapterStats]);

  if (activeChapter) {
    return (
      <div className="max-w-[1100px] mx-auto px-4 py-4">
        <ReviewSession
          chapterId={activeChapter.id}
          chapterTitle={activeChapter.title}
          onBack={() => setActiveChapter(null)}
          onNavigateToSection={() => setActiveChapter(null)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          Quick Practice
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
          Chapter Review
        </h1>
        <p className="text-sm text-muted-foreground max-w-[680px]">
          Jump straight into a mixed-format review session for any chapter — MCQs, cloze, explain &amp; reveal,
          and exam-style mini cases. Progress is tracked across sessions.
        </p>
      </header>

      {/* Overall stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <StatTile icon={<BookOpen className="h-3.5 w-3.5" />} label="Chapters with bank" value={`${overall.chaptersWithBank}`} />
        <StatTile icon={<Layers className="h-3.5 w-3.5" />} label="Total items" value={`${overall.total}`} />
        <StatTile icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Items seen" value={`${overall.seen}`} />
        <StatTile
          icon={<Sparkles className="h-3.5 w-3.5" />}
          label="Coverage"
          value={overall.total > 0 ? `${Math.round((overall.seen / overall.total) * 100)}%` : "—"}
        />
      </div>

      {/* Chapter grid grouped by block */}
      <div className="space-y-5">
        {(Object.keys(BLOCK_LABELS) as Block[]).map((block) => {
          const rows = totalsByBlock.get(block) || [];
          if (rows.length === 0) return null;
          return (
            <section key={block} className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                  Block {block}
                </span>
                <span className="text-xs text-muted-foreground">{BLOCK_LABELS[block]}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {rows.map(({ chapter, total, seen, typeBreakdown }) => {
                  const pct = total > 0 ? Math.round((seen / total) * 100) : 0;
                  const disabled = total === 0;
                  return (
                    <button
                      key={chapter.id}
                      disabled={disabled}
                      onClick={() => setActiveChapter({ id: chapter.id, title: chapter.title })}
                      className={`group text-left rounded-lg border border-border bg-card px-3 py-2.5 transition-all ${
                        disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:border-primary hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                            <span className="font-bold text-primary">
                              Ch {String(chapter.id).padStart(2, "0")}
                            </span>
                            <span>·</span>
                            <span>{total} items</span>
                          </div>
                          <div className="font-body text-sm font-semibold leading-snug text-foreground truncate">
                            {chapter.title}
                          </div>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-accent shrink-0">
                          {disabled ? "—" : `${pct}%`}
                        </span>
                      </div>

                      {/* Coverage bar */}
                      <div className="h-1 w-full rounded-full bg-muted overflow-hidden mb-2">
                        <div
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      {/* Type chips */}
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(typeBreakdown).map(([type, n]) => (
                          <span
                            key={type}
                            className="text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {type} {n}
                          </span>
                        ))}
                        {disabled && (
                          <span className="text-[9px] font-mono uppercase tracking-wide text-muted-foreground">
                            no bank yet
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="font-mono text-lg font-bold text-foreground leading-tight mt-0.5">{value}</div>
    </div>
  );
}