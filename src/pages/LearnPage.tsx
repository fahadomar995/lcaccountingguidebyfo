import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LEARN_MODULES } from "@/data/studyContent";
import { ChevronRight, Check, Lock } from "lucide-react";

export default function LearnPage() {
  const [progress, setProgress] = useLocalStorage<Record<string, number>>("lc-learn-progress", {});
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const mod = activeModule !== null ? LEARN_MODULES[activeModule] : null;

  const getModuleProgress = (m: typeof LEARN_MODULES[0]) => {
    const totalSteps = m.lessons.reduce((s, l) => s + l.steps, 0);
    const completed = m.lessons.reduce((s, l, i) => s + (progress[`${m.id}-${i}`] || 0), 0);
    return totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
  };

  const completeStep = () => {
    if (!mod) return;
    const key = `${mod.id}-${activeLesson}`;
    const current = progress[key] || 0;
    const lesson = mod.lessons[activeLesson];
    if (activeStep >= current) {
      setProgress(prev => ({ ...prev, [key]: Math.min(activeStep + 1, lesson.steps) }));
    }
    if (activeStep < lesson.steps - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeLesson < mod.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setActiveStep(0);
    }
  };

  if (mod) {
    const lesson = mod.lessons[activeLesson];
    const lessonProgress = progress[`${mod.id}-${activeLesson}`] || 0;

    return (
      <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
        <Button variant="outline" size="sm" className="text-xs mb-4" onClick={() => { setActiveModule(null); setActiveLesson(0); setActiveStep(0); }}>
          ← Back to Modules
        </Button>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <h1 className="font-display text-xl font-bold">{mod.title}</h1>
            <p className="text-xs text-muted-foreground">{mod.lessons.length} lessons · {mod.lessons.reduce((s, l) => s + l.steps, 0)} steps</p>
          </div>
        </div>

        {/* Lesson sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <div className="space-y-1">
            {mod.lessons.map((l, i) => {
              const lProgress = progress[`${mod.id}-${i}`] || 0;
              const isComplete = lProgress >= l.steps;
              return (
                <button
                  key={i}
                  onClick={() => { setActiveLesson(i); setActiveStep(0); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ${
                    i === activeLesson ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {isComplete ? <Check className="h-3.5 w-3.5 text-green-600 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-current shrink-0 flex items-center justify-center text-[8px]">{i + 1}</span>}
                  <span className="truncate">{l.title}</span>
                </button>
              );
            })}
          </div>

          {/* Lesson content area */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base font-bold">{lesson.title}</h2>
                <Badge variant="outline" className="text-[10px] font-mono">{activeStep + 1} / {lesson.steps}</Badge>
              </div>
              <Progress value={(activeStep / lesson.steps) * 100} className="h-1.5 mb-6" />

              {/* Step content — educational placeholder */}
              <div className="bg-muted/50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Step {activeStep + 1} of {lesson.steps}</p>
                  <p className="font-display text-lg font-bold mb-1">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">Interactive lesson content for {mod.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">Real SEC data from 2022–2024 papers</p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" size="sm" className="text-xs" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
                  ← Previous
                </Button>
                <Button size="sm" className="text-xs" onClick={completeStep}>
                  {activeStep < lesson.steps - 1 ? "Next Step →" : activeLesson < mod.lessons.length - 1 ? "Next Lesson →" : "Complete Module ✓"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Learn Mode</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        5 interactive modules with {LEARN_MODULES.reduce((s, m) => s + m.lessons.length, 0)} lessons and {LEARN_MODULES.reduce((s, m) => s + m.lessons.reduce((ss, l) => ss + l.steps, 0), 0)} steps. Build each account from scratch using real SEC data.
      </p>

      <div className="space-y-4">
        {LEARN_MODULES.map((m, i) => {
          const pct = getModuleProgress(m);
          return (
            <Card key={m.id} className="cursor-pointer hover:shadow-md transition-all border-l-4" style={{ borderLeftColor: m.color }} onClick={() => setActiveModule(i)}>
              <CardContent className="p-5 flex items-center gap-4">
                <span className="text-3xl">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-sm font-bold">{m.title}</h3>
                    {pct === 100 && <Badge className="bg-green-600 text-white text-[9px]">Complete</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{m.lessons.length} lessons · {m.lessons.reduce((s, l) => s + l.steps, 0)} steps</p>
                  <Progress value={pct} className="h-1.5 mt-2" />
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-lg font-bold" style={{ color: m.color }}>{pct}%</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
