import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import type { Archetype } from "@/data/archetypes";

interface WorkingsPageProps {
  title: string;
  subtitle: string;
  sectionLabel: string;
  accentColor: string;
  archetypes: Archetype[];
  categories: { key: string; label: string }[];
}

export default function WorkingsPage({ title, subtitle, sectionLabel, accentColor, archetypes, categories }: WorkingsPageProps) {
  const [filter, setFilter] = useState("all");
  const [activeArch, setActiveArch] = useState<Archetype | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const filtered = filter === "all" ? archetypes : archetypes.filter(a => a.category === filter);

  if (activeArch) {
    const step = activeArch.steps[currentStep];
    const progress = ((currentStep + 1) / activeArch.steps.length) * 100;

    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-6 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => { setActiveArch(null); setCurrentStep(0); }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <div>
            <h2 className="font-display text-lg font-bold">{activeArch.name}</h2>
            <p className="text-xs text-muted-foreground">{activeArch.source} · {activeArch.totalMarks} marks</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden mb-5">
          <div className="h-full rounded-full transition-all duration-400" style={{ width: `${progress}%`, background: accentColor }} />
        </div>

        {/* Question panel */}
        <Card className="mb-5 border-border">
          <CardContent className="p-5">
            <h3 className="font-display text-sm font-bold mb-2 text-muted-foreground">Question</h3>
            <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: activeArch.question }} />
          </CardContent>
        </Card>

        {/* Step dots */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {activeArch.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                i === currentStep
                  ? "text-white border-primary"
                  : i < currentStep
                  ? "bg-green-600 text-white border-green-600"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
              style={i === currentStep ? { background: accentColor, borderColor: accentColor } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Step panel */}
        <Card className="mb-4 border-border overflow-hidden">
          <div className="bg-muted/50 border-b border-border px-5 py-3 flex justify-between items-center">
            <h4 className="font-display text-sm font-bold">{step.title}</h4>
            <Badge variant="outline" className="font-mono text-xs" style={{ color: accentColor, borderColor: accentColor + "44" }}>
              {typeof step.marks === "number" ? `${step.marks} marks` : step.marks}
            </Badge>
          </div>
          <CardContent className="p-5">
            {/* Explanation */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4 text-sm leading-relaxed">
              {step.explain}
            </div>

            {/* Content (HTML tables etc.) */}
            <div className="prose prose-sm max-w-none dark:prose-invert overflow-x-auto" dangerouslySetInnerHTML={{ __html: step.content }} />

            {/* Common mistakes */}
            {step.mistakes.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
                <h5 className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-3.5 w-3.5" /> Common Mistakes
                </h5>
                <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                  {step.mistakes.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step navigation */}
        <div className="flex justify-between items-center pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="text-xs gap-1" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </Button>
          <span className="text-xs text-muted-foreground font-mono">Step {currentStep + 1} of {activeArch.steps.length}</span>
          <Button size="sm" className="text-xs gap-1" style={{ background: accentColor }} onClick={() => {
            if (currentStep < activeArch.steps.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              setActiveArch(null);
              setCurrentStep(0);
            }
          }}>
            {currentStep < activeArch.steps.length - 1 ? "Next" : "Finish"} <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{sectionLabel}</div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">{subtitle}</p>

      {/* Intro banner */}
      <Card className="mb-6 border-border" style={{ borderTopWidth: 4, borderTopColor: accentColor }}>
        <CardContent className="p-5">
          <h2 className="font-display text-base font-bold mb-1.5">Learn by Doing Full Exam Questions</h2>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            Each walkthrough uses real SEC data with mark allocations from the official marking scheme. Click any question type below to start.
          </p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            <Badge variant="outline" className="text-[9px]">Real SEC Data</Badge>
            <Badge variant="outline" className="text-[9px]">Mark Allocations</Badge>
            <Badge variant="outline" className="text-[9px]">Step by Step</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filter bar */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {categories.map(cat => (
          <Button
            key={cat.key}
            variant={filter === cat.key ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-3"
            onClick={() => setFilter(cat.key)}
            style={filter === cat.key ? { background: accentColor } : {}}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Archetype grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(arch => (
          <Card
            key={arch.id}
            className="cursor-pointer border-t-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ borderTopColor: accentColor }}
            onClick={() => { setActiveArch(arch); setCurrentStep(0); }}
          >
            <CardContent className="p-5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{arch.type}</div>
              <h3 className="font-display text-sm font-bold mb-1">{arch.name}</h3>
              <p className="font-mono text-[11px] mb-2" style={{ color: accentColor }}>{arch.source} · {arch.totalMarks} marks</p>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3">{arch.desc}</p>
              <div className="flex gap-1.5 flex-wrap">
                {arch.partSummary.slice(0, 3).map(p => (
                  <span key={p} className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">{p}</span>
                ))}
                {arch.partSummary.length > 3 && (
                  <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">+{arch.partSummary.length - 3} more</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
