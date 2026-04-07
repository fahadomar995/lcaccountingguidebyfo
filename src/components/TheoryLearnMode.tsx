import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { THEORY_LEARN_TOPICS, type TheoryLearnTopic } from "@/data/theoryLearnContent";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ArrowLeft, ChevronRight, Check, BookOpen, BarChart3, Landmark, CalendarDays, TrendingDown, Search, Ruler, Building2, FileSpreadsheet, Banknote, Users, ClipboardList, Calculator, TrendingUp, Factory } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, BarChart3, Landmark, CalendarDays, TrendingDown, Search, Ruler, Building2, FileSpreadsheet, Banknote, Users, ClipboardList, Calculator, TrendingUp, Factory,
};

export default function TheoryLearnMode() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [readSections, setReadSections] = useLocalStorage<Record<string, boolean>>("lc-theory-learn-read", {});
  const contentRef = useRef<HTMLDivElement>(null);

  const topic = activeTopic ? THEORY_LEARN_TOPICS.find(t => t.id === activeTopic) : null;

  const markRead = (topicId: string, sectionIdx: number) => {
    const key = `${topicId}_${sectionIdx}`;
    setReadSections(prev => ({ ...prev, [key]: true }));
  };

  const getTopicProgress = (t: TheoryLearnTopic) => {
    const done = t.sections.filter((_, i) => readSections[`${t.id}_${i}`]).length;
    return Math.round((done / t.sections.length) * 100);
  };

  // Wire up interactive quiz elements
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.querySelectorAll<HTMLElement>(".quiz-opt").forEach(opt => {
      opt.onclick = () => {
        if (opt.classList.contains("correct") || opt.classList.contains("wrong")) return;
        const isCorrect = opt.getAttribute("data-correct") === "true";
        if (isCorrect) {
          opt.classList.add("correct");
          opt.closest(".quiz-opts")?.querySelectorAll<HTMLElement>(".quiz-opt").forEach(o => {
            o.style.pointerEvents = "none";
          });
        } else {
          opt.classList.add("wrong");
          setTimeout(() => opt.classList.remove("wrong"), 1200);
        }
      };
    });
  }, [activeTopic, activeSection]);

  // Scroll to top on section change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  if (topic) {
    const section = topic.sections[activeSection];
    const isLast = activeSection === topic.sections.length - 1;

    return (
      <div className="space-y-4">
        <button
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
          onClick={() => { setActiveTopic(null); setActiveSection(0); }}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Topics
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Section sidebar */}
          <div className="lg:w-52 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              {(() => { const Icon = ICON_MAP[topic.icon]; return Icon ? <Icon className="h-5 w-5 text-primary" /> : null; })()}
              <h3 className="text-sm font-bold">{topic.title}</h3>
            </div>
            <div className="space-y-1">
              {topic.sections.map((s, i) => {
                const isRead = readSections[`${topic.id}_${i}`];
                return (
                  <button
                    key={i}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                      i === activeSection
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => { markRead(topic.id, activeSection); setActiveSection(i); }}
                  >
                    {isRead && <Check className="h-3 w-3 text-green-500 shrink-0" />}
                    <span>{i + 1}. {s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Card className="border-border">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-[10px]">{topic.title}</Badge>
                  <span className="text-xs text-muted-foreground font-mono">{activeSection + 1}/{topic.sections.length}</span>
                </div>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <div
                  ref={contentRef}
                  className="theory-learn-content"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    disabled={activeSection === 0}
                    onClick={() => { markRead(topic.id, activeSection); setActiveSection(activeSection - 1); }}
                  >
                    ← Previous
                  </Button>
                  {isLast ? (
                    <Button
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => {
                        markRead(topic.id, activeSection);
                        setActiveTopic(null);
                        setActiveSection(0);
                      }}
                    >
                      <Check className="h-3 w-3" /> Complete Topic
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => { markRead(topic.id, activeSection); setActiveSection(activeSection + 1); }}
                    >
                      Next <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Topic grid
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {THEORY_LEARN_TOPICS.length} topics covering the full LC Accounting theory syllabus. Select a topic to start learning.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {THEORY_LEARN_TOPICS.map(t => {
          const pct = getTopicProgress(t);
          return (
            <Card
              key={t.id}
              className="border-border cursor-pointer hover:border-primary/40 transition-all group"
              onClick={() => { setActiveTopic(t.id); setActiveSection(0); }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {(() => { const Icon = ICON_MAP[t.icon]; return Icon ? <Icon className="h-6 w-6 text-primary" /> : null; })()}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{t.title}</h4>
                    <p className="text-[11px] text-muted-foreground font-light leading-relaxed mt-0.5">{t.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <BookOpen className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{t.sections.length} sections</span>
                      {pct > 0 && (
                        <Badge variant={pct >= 100 ? "default" : "outline"} className="text-[9px] ml-auto">
                          {pct >= 100 ? "✓ Complete" : `${pct}%`}
                        </Badge>
                      )}
                    </div>
                    <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
