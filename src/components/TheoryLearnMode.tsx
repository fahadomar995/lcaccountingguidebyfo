import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CHAPTERS, BLOCK_LABELS, BLOCK_DESCRIPTIONS, type Block, type Chapter } from "@/data/theoryChapters";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ChevronDown, ChevronRight, BookOpen, ArrowRight, Landmark, FileText, Users, Calculator, HelpCircle } from "lucide-react";
import ChapterReadingView from "@/components/ChapterReadingView";
import TheorySearch from "@/components/TheorySearch";
import { REVIEW_BANK } from "@/data/chapter-review-bank";
import { useSidebar } from "@/components/ui/sidebar";

const BLOCKS: Block[] = ['A', 'B', 'C', 'D'];
const BLOCK_ICONS: Record<Block, typeof Landmark> = { A: Landmark, B: FileText, C: Users, D: Calculator };

interface Props {
  onReadingStateChange?: (isReading: boolean) => void;
}

export default function TheoryLearnMode({ onReadingStateChange }: Props) {
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [initialSectionId, setInitialSectionId] = useState<string | undefined>();
  const [expandedBlocks, setExpandedBlocks] = useState<Set<Block>>(new Set());
  const [completedSections] = useLocalStorage<Record<string, boolean>>('lc-theory-ch-progress', {});

  const activeChapter = activeChapterId ? CHAPTERS.find(c => c.id === activeChapterId) : null;

  const getChapterProgress = (ch: Chapter) => {
    const done = ch.sections.filter(s => completedSections[`${ch.id}_${s.id}`]).length;
    return { done, total: ch.sections.length, pct: Math.round((done / ch.sections.length) * 100) };
  };

  const totalSections = CHAPTERS.reduce((a, c) => a + c.sections.length, 0);
  const totalComplete = Object.values(completedSections).filter(Boolean).length;
  const overallPct = Math.round((totalComplete / totalSections) * 100);

  // Pick up where left off
  const lastViewed = useMemo(() => {
    try {
      const raw = localStorage.getItem('lc-theory-last');
      if (raw) return JSON.parse(raw) as { chapterId: number; sectionId: string };
    } catch {}
    return null;
  }, []);
  const lastChapter = lastViewed ? CHAPTERS.find(c => c.id === lastViewed.chapterId) : null;

  const toggleBlock = (b: Block) => {
    setExpandedBlocks(prev => {
      const next = new Set(prev);
      next.has(b) ? next.delete(b) : next.add(b);
      return next;
    });
  };

  const { setOpen: setSidebarOpen } = useSidebar();

  const openChapter = useCallback((id: number, sectionId?: string) => {
    setActiveChapterId(id);
    setInitialSectionId(sectionId);
    setSidebarOpen(false);
    onReadingStateChange?.(true);
  }, [onReadingStateChange, setSidebarOpen]);

  const handleSearchSelect = (chapterId: number, sectionId?: string) => {
    openChapter(chapterId, sectionId);
  };

  // Reading view
  if (activeChapter) {
    return (
      <ChapterReadingView
        chapter={activeChapter}
        initialSectionId={initialSectionId}
        onBack={() => { setActiveChapterId(null); onReadingStateChange?.(false); }}
        onNavigateChapter={(id) => openChapter(id)}
      />
    );
  }

  // Landing page
  return (
    <div className="space-y-5">
      {/* Search */}
      <TheorySearch onSelect={handleSearchSelect} />

      {/* Progress strip */}
      <div className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold">Your Progress</span>
            <span className="text-[10px] font-mono text-muted-foreground">{totalComplete}/{totalSections} sections · {overallPct}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${overallPct}%` }} />
          </div>
        </div>
        {lastChapter && (
          <button
            className="shrink-0 text-xs text-primary hover:underline font-medium flex items-center gap-1"
            onClick={() => openChapter(lastViewed!.chapterId, lastViewed!.sectionId)}
          >
            Continue Ch {lastChapter.id} <ArrowRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Block cards */}
      {BLOCKS.map(block => {
        const chapters = CHAPTERS.filter(c => c.block === block);
        const expanded = expandedBlocks.has(block);
        const blockDone = chapters.reduce((a, c) => a + getChapterProgress(c).done, 0);
        const blockTotal = chapters.reduce((a, c) => a + c.sections.length, 0);

        return (
          <Card key={block} className="border-border overflow-hidden">
            <button
              className="w-full text-left p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors"
              onClick={() => toggleBlock(block)}
            >
              {(() => { const BlockIcon = BLOCK_ICONS[block]; return (
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <BlockIcon className="h-4 w-4" />
                </span>
              ); })()}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-display">{BLOCK_LABELS[block]}</h3>
                <p className="text-[11px] text-muted-foreground font-light">{BLOCK_DESCRIPTIONS[block]}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground">{blockDone}/{blockTotal}</span>
                {expanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            {expanded && (
              <CardContent className="px-4 pb-4 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {chapters.map(ch => {
                    const prog = getChapterProgress(ch);
                    return (
                      <Card
                        key={ch.id}
                        className="border-border cursor-pointer hover:border-primary/40 transition-all group"
                        onClick={() => openChapter(ch.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {String(ch.id).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold group-hover:text-primary transition-colors font-display leading-tight">{ch.title}</h4>
                              <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                                <span className="text-[10px] text-muted-foreground">{ch.sections.length} sections</span>
                                {(REVIEW_BANK[ch.id] || []).length > 0 && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] text-primary font-medium">
                                    <HelpCircle className="h-2.5 w-2.5" /> Quiz
                                  </span>
                                )}
                                {prog.pct > 0 && (
                                  <Badge variant={prog.pct >= 100 ? "default" : "outline"} className="text-[9px] px-1 py-0">
                                    {prog.pct >= 100 ? '✓' : `${prog.pct}%`}
                                  </Badge>
                                )}
                              </div>
                              <div className="h-1 bg-muted rounded-full mt-1.5 overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${prog.pct}%` }} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

      <p className="text-[10px] text-muted-foreground text-center">
        24 chapters · {totalSections} sections · Based on the LC HL Accounting syllabus
      </p>
    </div>
  );
}
