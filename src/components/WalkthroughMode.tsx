import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, BookOpen, Wrench, FileText, Columns, AlertTriangle, Lightbulb, Eye, ClipboardList } from "lucide-react";
import type { Walkthrough, NoteStep, NoteStepAccount } from "@/data/walkthroughData";

const TYPE_COLORS: Record<string, string> = {
  'sole-trader': 'hsl(142, 72%, 29%)',
  'company': 'hsl(217, 91%, 60%)',
  'manufacturing': 'hsl(38, 92%, 50%)',
};

const TYPE_LABELS: Record<string, string> = {
  'sole-trader': 'Sole Trader',
  'company': 'Company',
  'manufacturing': 'Manufacturing',
};

interface WalkthroughModeProps {
  walkthroughs: Walkthrough[];
}

export default function WalkthroughMode({ walkthroughs }: WalkthroughModeProps) {
  const [active, setActive] = useState<Walkthrough | null>(null);
  const [tab, setTab] = useState(0);

  if (!active) {
    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Section 1 — Question 1</div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Final Account Walkthroughs</h1>
        <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
          Complete step-by-step walkthroughs through every adjustment, working, T-account, and final accounts entry for Q1.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {walkthroughs.map(w => {
            const color = TYPE_COLORS[w.type];
            return (
              <Card key={w.id} className="cursor-pointer border-t-4 hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ borderTopColor: color }} onClick={() => { setActive(w); setTab(0); }}>
                <CardContent className="p-5">
                  <Badge className="text-[9px] mb-2 text-white" style={{ background: color }}>{TYPE_LABELS[w.type]}</Badge>
                  <h3 className="font-display text-sm font-bold mb-1">{w.title}</h3>
                  <p className="text-xs text-muted-foreground font-light">{w.subtitle}</p>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">120 marks</span>
                    <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">T-Accounts</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const color = TYPE_COLORS[active.type];
  const tabs = [
    { label: 'Introduction', icon: BookOpen },
    { label: 'Notes & Workings', icon: Wrench },
    { label: active.tplTabLabel, icon: FileText },
    { label: 'Balance Sheet', icon: Columns },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-6 pb-16">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => setActive(null)}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="font-display text-lg font-bold">{active.title}</h2>
            <Badge className="text-[9px] text-white" style={{ background: color }}>{TYPE_LABELS[active.type]}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{active.subtitle}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-5 flex-wrap">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <Button key={i} variant={tab === i ? "default" : "outline"} size="sm" className="text-xs gap-1.5 h-8" style={tab === i ? { background: color } : {}} onClick={() => setTab(i)}>
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </Button>
          );
        })}
      </div>

      {tab === 0 && <IntroTab introHtml={active.introHtml} />}
      {tab === 1 && <NotesTab notes={active.notes} color={color} />}
      {tab === 2 && <BuilderTab steps={active.tplSteps} marks={active.tplMarks} complete={active.tplComplete} color={color} label={active.tplTabLabel} />}
      {tab === 3 && <BuilderTab steps={active.bsSteps} marks={active.bsMarks} complete={active.bsComplete} color={color} label="Balance Sheet" />}
    </div>
  );
}

function IntroTab({ introHtml }: { introHtml: string }) {
  return <div className="wt-intro-content" dangerouslySetInnerHTML={{ __html: introHtml }} />;
}

// ── EXPLANATION TYPE STYLES ──
const EXPL_STYLES: Record<string, string> = {
  info: 'bg-blue-50 dark:bg-blue-950/20 border-l-[3px] border-l-blue-500',
  warning: 'bg-amber-50 dark:bg-amber-950/20 border-l-[3px] border-l-amber-500',
  danger: 'bg-red-50 dark:bg-red-950/20 border-l-[3px] border-l-red-500',
  success: 'bg-green-50 dark:bg-green-950/20 border-l-[3px] border-l-green-500',
};

const DEST_STYLES: Record<string, { bg: string; label: string }> = {
  trading: { bg: 'bg-green-50 dark:bg-green-950/20', label: 'bg-green-600' },
  pnl: { bg: 'bg-blue-50 dark:bg-blue-950/20', label: 'bg-blue-600' },
  bs: { bg: 'bg-amber-50 dark:bg-amber-950/20', label: 'bg-amber-600' },
};

const HL_COLORS: Record<string, string> = {
  g: 'text-green-600 dark:text-green-400',
  r: 'text-red-600 dark:text-red-400',
  a: 'text-amber-600 dark:text-amber-400',
  b: 'text-blue-600 dark:text-blue-400',
};

// ── T-ACCOUNT RENDERER ──
function WkTAccount({ acct }: { acct: NoteStepAccount }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="font-mono text-[11px] font-bold text-center py-1.5 px-3 bg-muted border-b border-border tracking-wide">
        {acct.n}
      </div>
      <div className="grid grid-cols-2 min-h-[36px]">
        <div className="p-2 border-r border-border">
          <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Debit</div>
          {(acct.d || []).map((e, i) => (
            <div key={i} className={`flex justify-between items-baseline py-0.5 text-[11px] gap-1.5 ${e.tot ? 'border-t border-border pt-1 mt-1' : ''} ${e.h ? HL_COLORS[e.h] || '' : ''}`}>
              <span className={`flex-1 ${e.tot ? 'font-bold' : 'font-normal'}`}>{e.x || ''}</span>
              <span className={`font-mono ${e.tot ? 'font-bold' : 'font-semibold'} text-right ml-1`}>{e.v || ''}</span>
            </div>
          ))}
        </div>
        <div className="p-2">
          <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Credit</div>
          {(acct.c || []).map((e, i) => (
            <div key={i} className={`flex justify-between items-baseline py-0.5 text-[11px] gap-1.5 ${e.tot ? 'border-t border-border pt-1 mt-1' : ''} ${e.h ? HL_COLORS[e.h] || '' : ''}`}>
              <span className={`flex-1 ${e.tot ? 'font-bold' : 'font-normal'}`}>{e.x || ''}</span>
              <span className={`font-mono ${e.tot ? 'font-bold' : 'font-semibold'} text-right ml-1`}>{e.v || ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── STEP RENDERER ──
function StepContent({ step }: { step: NoteStep }) {
  return (
    <div className="space-y-3">
      {/* Explanation */}
      {step.expl && (
        <div className={`rounded-lg p-3 text-[13px] leading-relaxed ${EXPL_STYLES[step.expl.t] || EXPL_STYLES.info}`}>
          <span dangerouslySetInnerHTML={{ __html: step.expl.tx }} />
        </div>
      )}

      {/* T-Accounts */}
      {step.accts && step.accts.length > 0 && (
        <div className={`grid gap-3 ${step.accts.length >= 2 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          {step.accts.map((a, i) => <WkTAccount key={i} acct={a} />)}
        </div>
      )}

      {/* Destinations */}
      {step.dests && step.dests.length > 0 && (
        <div className="space-y-1.5">
          {step.dests.map((d, i) => {
            const ds = DEST_STYLES[d.t] || DEST_STYLES.pnl;
            return (
              <div key={i} className={`flex items-center gap-2 p-2.5 rounded-lg text-xs flex-wrap ${ds.bg}`}>
                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-white whitespace-nowrap ${ds.label}`}>{d.l}</span>
                <span className="font-medium flex-1 min-w-[140px]">{d.x}</span>
                <span className="font-mono font-bold ml-auto">€{d.v}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* N-Workings */}
      {step.nw && step.nw.length > 0 && (
        <div className="bg-muted border border-border rounded-lg p-3 font-mono text-[11px] leading-relaxed space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 font-sans">N-Workings</div>
          {step.nw.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}

      {/* Trap */}
      {step.trap && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-[3px] border-l-red-500 rounded-lg p-3 text-xs leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: step.trap }} />
        </div>
      )}
    </div>
  );
}

// ── NOTES TAB ──
function NotesTab({ notes, color }: { notes: import("@/data/walkthroughData").WalkthroughNote[]; color: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [stepIndex, setStepIndex] = useState<Record<number, number>>({});

  return (
    <div className="space-y-3">
      {notes.map(note => {
        const isOpen = expanded === note.num;
        const curStep = stepIndex[note.num] || 0;
        const totalSteps = note.steps?.length || 0;
        const pct = totalSteps > 0 ? Math.round(((curStep + 1) / totalSteps) * 100) : 0;

        return (
          <Card key={note.num} className="border-border overflow-hidden">
            <button className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors" onClick={() => setExpanded(isOpen ? null : note.num)}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: color }}>{note.num}</span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-bold">{note.title}</div>
                <div className="text-[10px] text-muted-foreground">{note.marks} marks</div>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>

            {isOpen && (
              <CardContent className="px-4 pb-4 pt-0 space-y-3">
                {/* Lead-in: 2-col on tablet, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Left col: Note + TB Look */}
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded flex items-center justify-center text-[8px] bg-muted-foreground/60 text-white font-bold">N</span>
                        The note (from the exam paper)
                      </h5>
                      <div className="bg-muted/50 rounded-lg p-2.5 text-[13px] leading-relaxed italic" dangerouslySetInnerHTML={{ __html: note.noteText }} />
                    </div>

                    <div>
                      <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Eye className="h-3 w-3" /> What to look for in the TB
                      </h5>
                      <div className="text-[13px] leading-relaxed prose prose-sm max-w-none dark:prose-invert overflow-x-auto wt-tb-look" dangerouslySetInnerHTML={{ __html: note.tbLook }} />
                    </div>
                  </div>

                  {/* Right col: What to do */}
                  <div>
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <ClipboardList className="h-3 w-3" /> What to do
                    </h5>
                    <div className="text-[13px] leading-relaxed prose prose-sm max-w-none dark:prose-invert wt-task-box" dangerouslySetInnerHTML={{ __html: note.task }} />
                  </div>
                </div>

                {/* Step-based T-account engine */}
                {totalSteps > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Wrench className="h-3 w-3" /> Step-by-step T-account working
                    </h5>

                    <StepContent step={note.steps![curStep]} />

                    {/* Stepper nav */}
                    <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-border flex-wrap">
                      <div className="flex gap-1.5">
                        <Button variant="outline" size="sm" className="text-xs h-7 gap-1" disabled={curStep === 0}
                          onClick={() => setStepIndex(prev => ({ ...prev, [note.num]: curStep - 1 }))}>
                          <ChevronLeft className="h-3 w-3" /> Back
                        </Button>
                        <Button size="sm" className="text-xs h-7 gap-1" style={{ background: color }}
                          disabled={curStep >= totalSteps - 1}
                          onClick={() => setStepIndex(prev => ({ ...prev, [note.num]: curStep + 1 }))}>
                          Next Step <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        Step {curStep + 1} / {totalSteps}
                      </span>
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden min-w-[60px]">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Legacy workings fallback */}
                {totalSteps === 0 && note.workings && note.workings.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Wrench className="h-3 w-3" /> Workings</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {note.workings.map((w, i) => (
                        <div key={i} className="bg-card border border-border rounded-lg p-2.5">
                          <div className="font-mono text-xs font-bold mb-1.5" style={{ color }}>{w.title}</div>
                          {w.content && <div className="text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: w.content }} />}
                          {w.below && <div className="text-[13px] leading-relaxed mt-1.5" dangerouslySetInnerHTML={{ __html: w.below }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Destinations */}
                {totalSteps === 0 && note.destinations && note.destinations.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FileText className="h-3 w-3" /> Where each figure goes</h5>
                    <div className="space-y-1">
                      {note.destinations.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className="font-bold shrink-0 mt-0.5" style={{ color }}>{d.arrow}</span>
                          <span className="font-bold">{d.name}</span>
                          <span className="font-mono font-bold">{d.amt}</span>
                          <span className="text-muted-foreground">{'\u2192'} {d.where}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {totalSteps === 0 && note.tip && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5 text-xs leading-relaxed flex gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div dangerouslySetInnerHTML={{ __html: note.tip }} />
                  </div>
                )}
                {totalSteps === 0 && note.watchOut && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-2.5 text-xs leading-relaxed flex gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                    <div dangerouslySetInnerHTML={{ __html: note.watchOut }} />
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ── BUILDER TAB (TPL / BS) ──
function BuilderTab({ steps, marks, complete, color, label }: { steps: import("@/data/walkthroughData").BuilderStep[]; marks: string; complete: string; color: string; label: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (steps.length === 0) return null;

  const step = steps[currentStep];
  const pct = ((currentStep + 1) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-sm font-bold">{label}</h3>
        <Badge variant="outline" className="text-xs font-mono" style={{ color, borderColor: color + '44' }}>{marks}</Badge>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">Step {currentStep + 1} / {steps.length}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 border-border overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            <table className="wt-builder-table w-full text-sm">
              {steps.slice(0, currentStep + 1).map((s, i) => (
                <tbody key={i} className={i === currentStep ? 'wt-current-step' : ''} dangerouslySetInnerHTML={{ __html: s.rows.join('') }} />
              ))}
            </table>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-3">
          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
              <div className="font-display text-sm font-bold" style={{ color }}>{step.title}</div>

              <div className="text-xs leading-relaxed">
                <span className="font-bold text-muted-foreground">Source: </span>
                <span dangerouslySetInnerHTML={{ __html: step.source }} />
              </div>

              {step.reason && (
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-muted-foreground">Why this section: </span>
                  <span dangerouslySetInnerHTML={{ __html: step.reason }} />
                </div>
              )}

              {step.watch && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-2.5 text-xs leading-relaxed flex gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0 mt-0.5" />
                  <div dangerouslySetInnerHTML={{ __html: step.watch }} />
                </div>
              )}

              {step.tip && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5 text-xs leading-relaxed flex gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div dangerouslySetInnerHTML={{ __html: step.tip }} />
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="text-xs gap-1 h-7" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
                  <ChevronLeft className="h-3 w-3" /> Prev
                </Button>
                {!isLast ? (
                  <Button size="sm" className="text-xs gap-1 h-7 flex-1" style={{ background: color }} onClick={() => setCurrentStep(currentStep + 1)}>
                    Next Line <ChevronRight className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-xs gap-1 h-7 flex-1" onClick={() => setCurrentStep(0)}>
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {isLast && (
            <div className="text-center py-3 rounded-lg border" style={{ borderColor: color + '44', background: color + '0a' }}>
              <div className="text-sm font-bold" style={{ color }}>{complete}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
