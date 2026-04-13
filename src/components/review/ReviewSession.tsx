import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useChapterReview } from '@/hooks/useChapterReview';
import { REVIEW_BANK } from '@/data/chapter-review-bank';
import QuestionRenderer from './QuestionRenderer';
import ReviewResults from './ReviewResults';

interface Props {
  chapterId: number;
  chapterTitle: string;
  onBack: () => void;
  onNavigateToSection: (sectionLink: string) => void;
}

export default function ReviewSession({ chapterId, chapterTitle, onBack, onNavigateToSection }: Props) {
  const { session, startSession, resumeSession, recordAnswer, advanceQuestion, clearSession, getItem, hasItems } = useChapterReview(chapterId);

  const [activeSession, setActiveSession] = useState(() => {
    const resumed = resumeSession();
    if (resumed) return resumed;
    return startSession();
  });

  const totalQuestions = activeSession?.itemIds.length ?? 0;
  const currentIdx = activeSession?.currentIndex ?? 0;
  const isComplete = activeSession ? currentIdx >= totalQuestions : false;

  const currentItem = activeSession && !isComplete ? getItem(activeSession.itemIds[currentIdx]) : undefined;

  const results = useMemo(() => {
    if (!isComplete || !activeSession) return [];
    return activeSession.itemIds.map(id => {
      const item = getItem(id);
      return {
        item: item!,
        result: activeSession.answers[id] || 'wrong' as const,
      };
    }).filter(r => r.item);
  }, [isComplete, activeSession, getItem]);

  const score = results.filter(r => r.result === 'correct' || r.result === 'got-it').length;

  if (!activeSession || !hasItems) {
    return null;
  }

  const handleAnswer = (result: 'correct' | 'wrong' | 'got-it' | 'close' | 'missed') => {
    if (currentItem) {
      recordAnswer(currentItem.id, result);
    }
  };

  const handleAdvance = () => {
    advanceQuestion();
    setActiveSession(prev => prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : prev);
  };

  const handleTryAnother = () => {
    const justSeen = activeSession.itemIds;
    clearSession();
    const newSession = startSession(justSeen);
    if (newSession) {
      setActiveSession(newSession);
    }
  };

  const handleBackToChapter = () => {
    clearSession();
    onBack();
  };

  return (
    <div className="space-y-4">
      {/* Back */}
      <button
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
        onClick={handleBackToChapter}
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to chapter
      </button>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2">
        {activeSession.itemIds.map((id, i) => {
          const answered = activeSession.answers[id];
          let dotClass = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ';
          if (i < currentIdx) {
            if (answered === 'correct' || answered === 'got-it') {
              dotClass += 'bg-accent';
            } else if (answered === 'close') {
              dotClass += 'bg-accent/50';
            } else {
              dotClass += 'bg-muted-foreground/40';
            }
          } else if (i === currentIdx && !isComplete) {
            dotClass += 'bg-accent ring-2 ring-accent/30 ring-offset-1 ring-offset-background';
          } else {
            dotClass += 'bg-muted-foreground/20';
          }
          return <div key={id} className={dotClass} />;
        })}
      </div>

      {/* Question or Results */}
      {isComplete ? (
        <ReviewResults
          score={score}
          total={totalQuestions}
          results={results}
          onTryAnother={handleTryAnother}
          onBackToChapter={handleBackToChapter}
          onNavigateToSection={onNavigateToSection}
        />
      ) : currentItem ? (
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-mono text-muted-foreground">
              Question {currentIdx + 1} of {totalQuestions}
            </span>
          </div>
          <QuestionRenderer
            key={currentItem.id}
            item={currentItem}
            onAnswer={handleAnswer}
            onAdvance={handleAdvance}
          />
        </div>
      ) : null}
    </div>
  );
}
