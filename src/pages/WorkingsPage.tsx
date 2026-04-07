import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle, Plus } from "lucide-react";
import type { Archetype } from "@/data/archetypes";
import { TAccountPanel, getMaxOrderForStep } from "@/components/TAccount";
import { T_ACCOUNT_DEFS } from "@/data/tAccountDefs";

interface WorkingsPageProps {
  title: string;
  subtitle: string;
  sectionLabel: string;
  accentColor?: string;
  archetypes: Archetype[];
  categories: { key: string; label: string }[];
  categoryColors?: Record<string, string>;
  embedded?: boolean;
}

const DEFAULT_CATEGORY_COLORS: Record<string, string> = {};

export default function WorkingsPage({ title, subtitle, sectionLabel, accentColor, archetypes, categories, categoryColors = DEFAULT_CATEGORY_COLORS }: WorkingsPageProps) {
  const [filter, setFilter] = useState("all");
  const [activeArch, setActiveArch] = useState<Archetype | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedInStep, setRevealedInStep] = useState(0);

  const filtered = filter === "all" ? archetypes : archetypes.filter(a => a.category === filter);
  const getCatColor = (category: string) => categoryColors[category] || accentColor;

  // T-account data for the active archetype
  const tAccounts = activeArch ? T_ACCOUNT_DEFS[activeArch.id] : undefined;
  const maxOrderInStep = useMemo(() => {
    if (!tAccounts) return 0;
    return getMaxOrderForStep(tAccounts, currentStep);
  }, [tAccounts, currentStep]);

  const hasMoreEntries = tAccounts && revealedInStep < maxOrderInStep;

  const goToStep = (step: number) => {
    // Auto-reveal all remaining entries for current step before advancing
    setCurrentStep(step);
    setRevealedInStep(0);
  };

  if (activeArch) {
    const step = activeArch.steps[currentStep];
    const progress = ((currentStep + 1) / activeArch.steps.length) * 100;
    const archColor = getCatColor(activeArch.category);

    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-6 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => { setActiveArch(null); setCurrentStep(0); setRevealedInStep(0); }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="font-display text-lg font-bold">{activeArch.name}</h2>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ background: archColor }}>
                {activeArch.type}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{activeArch.source} · {activeArch.totalMarks} marks</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden mb-5">
          <div className="h-full rounded-full transition-all duration-400" style={{ width: `${progress}%`, background: archColor }} />
        </div>

        {/* Question panel */}
        <Card className="mb-5 border-border">
          <CardContent className="p-5">
            <h3 className="font-display text-sm font-bold mb-2 text-muted-foreground">Question</h3>
            <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: activeArch.question }} />
          </CardContent>
        </Card>

        {/* T-Account Panel (persistent, builds up) */}
        {tAccounts && (
          <Card className="mb-5 border-border overflow-hidden">
            <div className="bg-muted/50 border-b border-border px-5 py-2 flex items-center justify-between">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">T-Accounts</h4>
              {hasMoreEntries && (
                <Button
                  size="sm"
                  className="text-xs gap-1 h-7"
                  style={{ background: archColor }}
                  onClick={() => setRevealedInStep(revealedInStep + 1)}
                >
                  <Plus className="h-3 w-3" /> Show Next Entry
                </Button>
              )}
              {!hasMoreEntries && maxOrderInStep > 0 && (
                <span className="text-[10px] text-muted-foreground font-medium">All entries shown ✓</span>
              )}
            </div>
            <CardContent className="p-4">
              <TAccountPanel accounts={tAccounts} currentStep={currentStep} revealedInStep={revealedInStep} />
            </CardContent>
          </Card>
        )}

        {/* Step dots */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {activeArch.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                i === currentStep
                  ? "text-white border-primary"
                  : i < currentStep
                  ? "bg-green-600 text-white border-green-600"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
              style={i === currentStep ? { background: archColor, borderColor: archColor } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Step panel */}
        <Card className="mb-4 border-border overflow-hidden">
          <div className="bg-muted/50 border-b border-border px-5 py-3 flex justify-between items-center">
            <h4 className="font-display text-sm font-bold">{step.title}</h4>
            <Badge variant="outline" className="font-mono text-xs" style={{ color: archColor, borderColor: archColor + "44" }}>
              {typeof step.marks === "number" ? `${step.marks} marks` : step.marks}
            </Badge>
          </div>
          <CardContent className="p-5">
            {/* Explanation */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-4 text-sm leading-relaxed">
              {step.explain}
            </div>

            {/* Content (HTML tables / fallback for workings without T-accounts) */}
            <div className="prose prose-sm max-w-none dark:prose-invert overflow-x-auto t-accounts-container" dangerouslySetInnerHTML={{ __html: step.content }} />

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
          <Button variant="outline" size="sm" className="text-xs gap-1" disabled={currentStep === 0} onClick={() => goToStep(currentStep - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" /> Previous
          </Button>
          <span className="text-xs text-muted-foreground font-mono">Step {currentStep + 1} of {activeArch.steps.length}</span>
          <Button size="sm" className="text-xs gap-1" style={{ background: archColor }} onClick={() => {
            if (currentStep < activeArch.steps.length - 1) {
              goToStep(currentStep + 1);
            } else {
              setActiveArch(null);
              setCurrentStep(0);
              setRevealedInStep(0);
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
            Each walkthrough uses real SEC data with mark allocations from the official marking scheme. T-account entries appear sequentially — click "Show Next Entry" to build each account step by step.
          </p>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            <Badge variant="outline" className="text-[9px]">Real SEC Data</Badge>
            <Badge variant="outline" className="text-[9px]">Mark Allocations</Badge>
            <Badge variant="outline" className="text-[9px]">Sequential T-Accounts</Badge>
            <Badge variant="outline" className="text-[9px]">Step by Step</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Filter bar */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {categories.map(cat => {
          const catColor = cat.key === "all" ? accentColor : getCatColor(cat.key);
          return (
            <Button
              key={cat.key}
              variant={filter === cat.key ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 px-3"
              onClick={() => setFilter(cat.key)}
              style={filter === cat.key ? { background: catColor } : {}}
            >
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* Archetype grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(arch => {
          const cardColor = getCatColor(arch.category);
          const hasTAccounts = !!T_ACCOUNT_DEFS[arch.id];
          return (
            <Card
              key={arch.id}
              className="cursor-pointer border-t-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ borderTopColor: cardColor }}
              onClick={() => { setActiveArch(arch); setCurrentStep(0); setRevealedInStep(0); }}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white" style={{ background: cardColor }}>
                    {arch.type}
                  </span>
                  {hasTAccounts && (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      T-Accounts
                    </span>
                  )}
                </div>
                <h3 className="font-display text-sm font-bold mb-1">{arch.name}</h3>
                <p className="font-mono text-[11px] mb-2" style={{ color: cardColor }}>{arch.source} · {arch.totalMarks} marks</p>
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
          );
        })}
      </div>
    </div>
  );
}
