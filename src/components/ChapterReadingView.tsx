import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Clock, BookOpen, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CHAPTERS, type Chapter, type Section, type SubTopic, type ContentBlock } from "@/data/theoryChapters";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useArrowNav } from "@/hooks/useArrowNav";
import { REVIEW_BANK } from "@/data/chapter-review-bank";
import ReviewEntryCard from "@/components/review/ReviewEntryCard";
import ReviewSession from "@/components/review/ReviewSession";

interface Props {
  chapter: Chapter;
  initialSectionId?: string;
  onBack: () => void;
  onNavigateChapter: (id: number) => void;
}

export default function ChapterReadingView({ chapter, initialSectionId, onBack, onNavigateChapter }: Props) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(() => {
    if (initialSectionId) {
      const idx = chapter.sections.findIndex(s => s.id === initialSectionId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });
  const [completedSections, setCompleted] = useLocalStorage<Record<string, boolean>>('lc-theory-ch-progress', {});
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeH3, setActiveH3] = useState<string | null>(null);

  const section = chapter.sections[activeSectionIdx];
  const sectionKey = `${chapter.id}_${section.id}`;
  const isComplete = completedSections[sectionKey];

  // Track last viewed
  useEffect(() => {
    localStorage.setItem('lc-theory-last', JSON.stringify({ chapterId: chapter.id, sectionId: section.id }));
  }, [chapter.id, section.id]);

  // Scroll to top on section change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveH3(null);
  }, [activeSectionIdx, chapter.id]);

  // Wire quiz elements
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>('.quiz-opt').forEach(opt => {
      opt.onclick = () => {
        if (opt.classList.contains('correct') || opt.classList.contains('wrong')) return;
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          opt.classList.add('correct');
          opt.closest('.quiz-opts')?.querySelectorAll<HTMLElement>('.quiz-opt').forEach(o => { o.style.pointerEvents = 'none'; });
        } else {
          opt.classList.add('wrong');
          setTimeout(() => opt.classList.remove('wrong'), 1200);
        }
      };
    });
  }, [activeSectionIdx, chapter.id]);

  const toggleComplete = () => {
    setCompleted(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const goNext = () => {
    if (activeSectionIdx < chapter.sections.length - 1) {
      setActiveSectionIdx(activeSectionIdx + 1);
    }
  };
  const goPrev = () => {
    if (activeSectionIdx > 0) {
      setActiveSectionIdx(activeSectionIdx - 1);
    }
  };

  // Arrow key navigation between sections
  useArrowNav(
    activeSectionIdx > 0 ? goPrev : null,
    activeSectionIdx < chapter.sections.length - 1 ? goNext : null,
  );


  // Related chapters
  const relatedChapters = useMemo(() => 
    chapter.related.map(id => CHAPTERS.find(c => c.id === id)).filter(Boolean) as Chapter[],
    [chapter.related]
  );

  // Prev/next chapter for navigator
  const chapterIdx = CHAPTERS.findIndex(c => c.id === chapter.id);
  const prevChapter = chapterIdx > 0 ? CHAPTERS[chapterIdx - 1] : null;
  const nextChapter = chapterIdx < CHAPTERS.length - 1 ? CHAPTERS[chapterIdx + 1] : null;

  // Section completion count
  const chapterComplete = chapter.sections.filter(s => completedSections[`${chapter.id}_${s.id}`]).length;

  const estimateSection = Math.max(2, Math.round(chapter.estimatedMinutes / chapter.sections.length));

  const [showReview, setShowReview] = useState(false);
  const hasReviewItems = (REVIEW_BANK[chapter.id] || []).length > 0;

  // Review session mode
  if (showReview) {
    return (
      <ReviewSession
        chapterId={chapter.id}
        chapterTitle={chapter.title}
        onBack={() => setShowReview(false)}
        onNavigateToSection={(sectionLink) => {
          setShowReview(false);
          // Try to find the section containing this sub-topic
          const secIdx = chapter.sections.findIndex(s =>
            s.subTopics.some(st => st.id === sectionLink)
          );
          if (secIdx >= 0) setActiveSectionIdx(secIdx);
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium" onClick={onBack}>
        <ArrowLeft className="h-3.5 w-3.5" /> All Chapters
      </button>

      {/* Chapter navigator bar */}
      <div className="flex items-center justify-between bg-card border border-border rounded-lg px-3 py-2">
        <button
          className="text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-30"
          disabled={!prevChapter}
          onClick={() => prevChapter && onNavigateChapter(prevChapter.id)}
        >
          <ChevronLeft className="h-4 w-4 inline" /> Ch {prevChapter?.id}
        </button>
        <div className="text-center">
          <span className="text-xs font-mono text-primary font-bold">Chapter {String(chapter.id).padStart(2, '0')}</span>
          <span className="text-xs text-muted-foreground mx-2">·</span>
          <span className="text-xs font-medium">{chapter.title}</span>
        </div>
        <button
          className="text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-30"
          disabled={!nextChapter}
          onClick={() => nextChapter && onNavigateChapter(nextChapter.id)}
        >
          Ch {nextChapter?.id} <ChevronRight className="h-4 w-4 inline" />
        </button>
      </div>

      {/* Three-pane layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_220px] gap-3 lg:gap-4">
        {/* LEFT RAIL — Section sidebar */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-bold">{chapterComplete}/{chapter.sections.length} sections</h3>
          </div>
          
          {/* Mobile: dropdown */}
          <div className="md:hidden mb-3">
            <select
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs font-medium"
              value={activeSectionIdx}
              onChange={e => setActiveSectionIdx(Number(e.target.value))}
            >
              {chapter.sections.map((s, i) => (
                <option key={s.id} value={i}>
                  {completedSections[`${chapter.id}_${s.id}`] ? '\u2713 ' : ''}{s.id} {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Tablet+: list */}
          <div className="hidden md:block space-y-0.5">
            {chapter.sections.map((s, i) => {
              const done = completedSections[`${chapter.id}_${s.id}`];
              return (
                <button
                  key={s.id}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-1.5 ${
                    i === activeSectionIdx
                      ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveSectionIdx(i)}
                >
                  {done && <Check className="h-2.5 w-2.5 text-green-500 shrink-0" />}
                  <span className="font-mono text-[9px] text-muted-foreground mr-0.5">{s.id}</span>
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}

            {/* Jump to chapter dropdown */}
            <div className="mt-3 pt-2.5 border-t border-border">
              <label className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Jump to chapter</label>
              <select
                className="w-full bg-card border border-border rounded-lg px-2 py-1.5 text-[11px]"
                value={chapter.id}
                onChange={e => onNavigateChapter(Number(e.target.value))}
              >
                {CHAPTERS.map(c => (
                  <option key={c.id} value={c.id}>Ch {String(c.id).padStart(2, '0')} — {c.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CENTRE — Reading column */}
        <div className="flex-1 min-w-0 overflow-y-auto" ref={contentRef}>
          <Card className="border-border">
            <CardContent className="p-4 sm:p-5 lg:p-8">
              {/* Header */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="outline" className="text-[10px] font-mono">Ch {chapter.id}</Badge>
                <Badge variant="outline" className="text-[10px]">{section.id}</Badge>
                <span className="text-[10px] text-muted-foreground font-mono ml-auto">{activeSectionIdx + 1}/{chapter.sections.length}</span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold mb-1">{chapter.title}</h1>
              <h2 className="font-display text-base sm:text-lg font-semibold text-primary mb-6">{section.title}</h2>

              {/* Content */}
              <div className="theory-learn-content space-y-6">
                {section.subTopics.map(sub => (
                  <div key={sub.id} id={`st-${sub.id}`}>
                    <h3 className="font-display text-sm font-bold mb-3 text-foreground">{sub.title}</h3>
                    
                    {/* Key terms */}
                    {sub.keyTerms && sub.keyTerms.length > 0 && (
                      <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Terms</p>
                        <div className="space-y-1.5">
                          {sub.keyTerms.map(kt => (
                            <div key={kt.term} className="text-xs">
                              <strong className="text-primary">{kt.term}:</strong>{' '}
                              <span className="font-light text-muted-foreground">{kt.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Content blocks */}
                    {sub.body.map((block, bi) => (
                      <ContentBlockRenderer key={bi} block={block} />
                    ))}
                  </div>
                ))}
              </div>

              {/* Mark complete + nav */}
              <div className="mt-8 pt-4 border-t border-border space-y-3">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    isComplete
                      ? 'bg-green-500/10 border-green-500/30 text-green-600'
                      : 'border-border hover:border-primary text-muted-foreground hover:text-primary'
                  }`}
                  onClick={toggleComplete}
                >
                  <Check className="h-3.5 w-3.5" />
                  {isComplete ? 'Section complete' : 'Mark section complete'}
                </button>
                
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-xs" disabled={activeSectionIdx === 0} onClick={goPrev}>
                    <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous section
                  </Button>
                  {activeSectionIdx < chapter.sections.length - 1 ? (
                    <Button size="sm" className="text-xs" onClick={goNext}>
                      Next section <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Button size="sm" className="text-xs" onClick={onBack}>
                      <Check className="h-3.5 w-3.5 mr-1" /> Back to chapters
                    </Button>
                  )}
                </div>

                {/* Chapter Review entry — visible on every section */}
                {hasReviewItems && (
                  <ReviewEntryCard
                    chapterTitle={chapter.title}
                    hasItems={hasReviewItems}
                    onStart={() => setShowReview(true)}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT RAIL — On this page + Related (desktop only) */}
        <div className="hidden xl:block w-[220px] shrink-0">
          {/* On this page */}
          <div className="sticky top-4 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">On this page</p>
              <div className="space-y-1">
                {section.subTopics.map(sub => (
                  <a
                    key={sub.id}
                    href={`#st-${sub.id}`}
                    className={`block text-xs px-2 py-1 rounded hover:bg-muted/50 transition-colors ${
                      activeH3 === sub.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                    }`}
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(`st-${sub.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveH3(sub.id);
                    }}
                  >
                    {sub.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Study time */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>~{estimateSection} min read</span>
            </div>

            {/* Related */}
            {relatedChapters.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Related</p>
                <div className="space-y-1.5">
                  {relatedChapters.slice(0, 3).map(rc => (
                    <button
                      key={rc.id}
                      className="w-full text-left text-xs flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => onNavigateChapter(rc.id)}
                    >
                      <Link2 className="h-3 w-3 shrink-0" />
                      <span className="truncate">Ch {rc.id} — {rc.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  const variantClass = block.variant ? `concept-box ${block.variant === 'blue' ? 'cb-blue' : block.variant === 'green' ? 'cb-green' : block.variant === 'amber' ? 'cb-amber' : 'cb-red'}` : '';

  switch (block.type) {
    case 'concept':
      return (
        <div className={variantClass || 'concept-box cb-blue'}>
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'example':
      return (
        <div className="concept-box cb-green">
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div className="theory-learn-content" dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'solution':
      return (
        <div className="concept-box cb-blue">
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div className="theory-learn-content" dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'watchout':
      return (
        <div className="concept-box cb-amber">
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'examtip':
      return (
        <div className="concept-box cb-green">
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'keyterm':
      return (
        <div className="concept-box cb-blue">
          {block.title && <h4 className="!font-body text-xs font-bold mb-1">{block.title}</h4>}
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case 'table':
      return <div className="theory-learn-content" dangerouslySetInnerHTML={{ __html: block.html }} />;
    case 'tAccount':
      return <div className="theory-learn-content" dangerouslySetInnerHTML={{ __html: block.html }} />;
    default:
      return <div className="theory-learn-content" dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}
