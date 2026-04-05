import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LEARN_MODULES_DATA, type LearnModuleDef } from "@/data/learnContent";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";

export default function LearnPage() {
  const [progress, setProgress] = useLocalStorage<Record<string, number>>("lc-learn-progress-v2", {});
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const mod = activeModule !== null ? LEARN_MODULES_DATA[activeModule] : null;

  const getTotalSteps = (m: LearnModuleDef) => m.lessons.reduce((s, l) => s + l.steps.length, 0);
  const getModDone = (m: LearnModuleDef) => m.lessons.reduce((s, l, i) => s + Math.min(progress[`${m.id}_${i}`] || 0, l.steps.length), 0);
  const getModPct = (m: LearnModuleDef) => { const t = getTotalSteps(m); return t > 0 ? Math.round((getModDone(m) / t) * 100) : 0; };
  const isLessonDone = (modId: string, li: number) => {
    const m = LEARN_MODULES_DATA.find(x => x.id === modId);
    if (!m) return false;
    return (progress[`${modId}_${li}`] || 0) >= m.lessons[li].steps.length;
  };

  const saveProgress = useCallback(() => {
    if (mod === null) return;
    const key = `${mod.id}_${activeLesson}`;
    const prev = progress[key] || 0;
    if (activeStep + 1 > prev) {
      setProgress(p => ({ ...p, [key]: activeStep + 1 }));
    }
  }, [mod, activeLesson, activeStep, progress, setProgress]);

  // Wire up interactive elements after content renders
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Quiz options
    el.querySelectorAll<HTMLElement>(".quiz-opt").forEach(opt => {
      opt.onclick = () => {
        if (opt.classList.contains("correct") || opt.classList.contains("wrong")) return;
        const isCorrect = opt.getAttribute("data-correct") === "true";
        if (isCorrect) {
          opt.classList.add("correct");
          opt.closest(".quiz-opts")?.querySelectorAll<HTMLElement>(".quiz-opt").forEach(o => { o.style.pointerEvents = "none"; });
        } else {
          opt.classList.add("wrong");
          setTimeout(() => opt.classList.remove("wrong"), 1200);
        }
      };
    });

    // Practice toggle buttons
    el.querySelectorAll<HTMLElement>(".practice-btn").forEach(btn => {
      btn.onclick = () => {
        const targetId = btn.getAttribute("data-target");
        if (!targetId) return;
        const panel = el.querySelector<HTMLElement>(`#${targetId}`);
        if (panel) panel.classList.toggle("open");
      };
    });

    // Fill-in check buttons
    el.querySelectorAll<HTMLElement>(".check-btn").forEach(btn => {
      btn.onclick = () => {
        const row = btn.closest(".fill-row");
        if (!row) return;
        const input = row.querySelector<HTMLInputElement>(".fill-input");
        if (!input) return;
        const correct = parseFloat(input.getAttribute("data-answer") || "0");
        const val = parseFloat(input.value.replace(/,/g, "").replace(/[^0-9.\-]/g, ""));
        const fb = row.nextElementSibling as HTMLElement | null;

        if (isNaN(val)) {
          if (fb?.classList.contains("fill-feedback")) { fb.className = "fill-feedback fb-no show"; fb.textContent = "Enter a number"; }
          return;
        }
        if (Math.abs(val - correct) <= 0) {
          input.className = "fill-input fi-correct";
          input.disabled = true;
          if (fb?.classList.contains("fill-feedback")) { fb.className = "fill-feedback fb-ok show"; fb.innerHTML = "✔ Correct!"; }
        } else {
          input.className = "fill-input fi-wrong";
          if (fb?.classList.contains("fill-feedback")) { fb.className = "fill-feedback fb-no show"; fb.innerHTML = "Not quite — try again"; }
          setTimeout(() => { input.className = "fill-input"; if (fb?.classList.contains("fill-feedback")) fb.className = "fill-feedback"; }, 2000);
        }
      };
    });

    // Enter key on fill inputs
    el.querySelectorAll<HTMLInputElement>(".fill-input").forEach(input => {
      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          const btn = input.closest(".fill-row")?.querySelector<HTMLElement>(".check-btn");
          btn?.click();
        }
      };
    });
  }, [activeModule, activeLesson, activeStep]);

  // Keyboard navigation
  useEffect(() => {
    if (activeModule === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); nextStep(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prevStep(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  const nextStep = () => {
    if (!mod) return;
    saveProgress();
    const lesson = mod.lessons[activeLesson];
    if (activeStep < lesson.steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else if (activeLesson < mod.lessons.length - 1) {
      setActiveLesson(activeLesson + 1);
      setActiveStep(0);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const closeModule = () => {
    saveProgress();
    setActiveModule(null);
    setActiveLesson(0);
    setActiveStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Module view
  if (mod) {
    const lesson = mod.lessons[activeLesson];
    const totalSteps = lesson.steps.length;
    const pct = Math.round(((activeStep + 1) / totalSteps) * 100);
    const isLastStep = activeStep === totalSteps - 1;
    const isLastLesson = activeLesson === mod.lessons.length - 1;

    return (
      <div className="max-w-[1020px] mx-auto px-4 sm:px-7 py-8 pb-16 learn-page">
        <button className="back-to-modules" onClick={closeModule}>← All Modules</button>

        <div className="learn-layout">
          {/* Lesson sidebar */}
          <div className="lesson-sidebar">
            {mod.lessons.map((l, i) => {
              const done = isLessonDone(mod.id, i);
              return (
                <div
                  key={i}
                  className={`lesson-item${i === activeLesson ? " active" : ""}${done ? " done" : ""}`}
                  onClick={() => { saveProgress(); setActiveLesson(i); setActiveStep(0); }}
                >
                  <div className="li-title">{i + 1}. {l.t}</div>
                  <div className="li-sub">{l.steps.length} steps</div>
                </div>
              );
            })}
          </div>

          {/* Step card */}
          <div className="step-card">
            <div className="sc-header">
              <span className="sc-mod-badge">Module {(activeModule ?? 0) + 1}</span>
              <span className="sc-title">{activeLesson + 1}. {lesson.t}</span>
            </div>
            <div
              ref={contentRef}
              className="sc-body"
              dangerouslySetInnerHTML={{ __html: lesson.steps[activeStep] }}
            />
            <div className="sc-footer">
              <div className="btn-row">
                <button className="step-btn" disabled={activeStep === 0} onClick={prevStep}>← Back</button>
                {isLastStep && isLastLesson ? (
                  <button className="step-btn" style={{ background: "hsl(0 62% 50%)", color: "#fff", borderColor: "hsl(0 62% 50%)" }} onClick={closeModule}>Finish Module ✔</button>
                ) : isLastStep ? (
                  <button className="step-btn primary" onClick={nextStep}>Next Lesson →</button>
                ) : (
                  <button className="step-btn primary" onClick={nextStep}>Next →</button>
                )}
              </div>
              <span className="step-counter">{activeStep + 1}/{totalSteps}</span>
              <div className="sc-progress"><div className="sc-progress-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Module grid
  return (
    <div className="max-w-[1020px] mx-auto px-4 sm:px-7 py-8 pb-16 learn-page">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Learn Mode</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        Master LC Accounting concepts with real SEC exam data. Select a module to begin.
      </p>

      <div className="mod-grid">
        {LEARN_MODULES_DATA.map((m, i) => {
          const pct = getModPct(m);
          return (
            <div
              key={m.id}
              className={`mod-card${activeModule === i ? " active" : ""}${pct >= 100 ? " completed" : ""}`}
              onClick={() => { setActiveModule(i); setActiveLesson(0); setActiveStep(0); }}
            >
              <span className="mod-icon">{m.icon}</span>
              <div className="mod-num">MODULE {i + 1}</div>
              <div className="mod-name">{m.name}</div>
              <div className="mod-meta">{m.lessons.length} lessons</div>
              <div className="mod-prog"><div className="mod-prog-fill" style={{ width: `${pct}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
