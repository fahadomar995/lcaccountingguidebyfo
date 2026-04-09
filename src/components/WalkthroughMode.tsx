import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronDown, ChevronRight, ChevronUp, BookOpen, Wrench, FileText, Columns } from "lucide-react";
import { TAccountPanel } from "@/components/TAccount";
import type { Walkthrough, WalkthroughNote, BuilderStep } from "@/data/walkthroughData";

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
              <Card
                key={w.id}
                className="cursor-pointer border-t-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ borderTopColor: color }}
                onClick={() => { setActive(w); setTab(0); }}
              >
                <CardContent className="p-5">
                  <Badge className="text-[9px] mb-2 text-white" style={{ background: color }}>{TYPE_LABELS[w.type]}</Badge>
                  <h3 className="font-display text-sm font-bold mb-1">{w.title}</h3>
                  <p className="text-xs text-muted-foreground font-light">{w.subtitle}</p>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">120 marks</span>
                    <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">T-Accounts</span>
                    <span className="text-[9px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground font-medium">Step by Step</span>
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
      {/* Header */}
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

      {/* Tabs */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <Button
              key={i}
              variant={tab === i ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 h-8"
              style={tab === i ? { background: color } : {}}
              onClick={() => setTab(i)}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </Button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === 0 && <IntroTab introHtml={active.introHtml} />}
      {tab === 1 && <NotesTab notes={active.notes} color={color} />}
      {tab === 2 && <BuilderTab steps={active.tplSteps} marks={active.tplMarks} complete={active.tplComplete} color={color} label={active.tplTabLabel} />}
      {tab === 3 && <BuilderTab steps={active.bsSteps} marks={active.bsMarks} complete={active.bsComplete} color={color} label="Balance Sheet" />}
    </div>
  );
}

// ─── Introduction Tab ───
function IntroTab({ introHtml }: { introHtml: string }) {
  return (
    <div className="wt-intro-content" dangerouslySetInnerHTML={{ __html: introHtml }} />
  );
}

// ─── Notes & Workings Tab ───
function NotesTab({ notes, color }: { notes: WalkthroughNote[]; color: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {notes.map(note => {
        const isOpen = expanded === note.num;
        return (
          <Card key={note.num} className="border-border overflow-hidden">
            <button
              className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-muted/50 transition-colors"
              onClick={() => setExpanded(isOpen ? null : note.num)}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: color }}
              >
                {note.num}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-bold">{note.title}</div>
                <div className="text-[10px] text-muted-foreground">{note.marks} marks</div>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>

            {isOpen && (
              <CardContent className="px-5 pb-5 pt-0 space-y-4">
                {/* Note text */}
                <div className="bg-muted/50 rounded-lg p-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: note.noteText }} />

                {/* TB Look */}
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">📋 What to look for in the TB</h5>
                  <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert overflow-x-auto" dangerouslySetInnerHTML={{ __html: note.tbLook }} />
                </div>

                {/* Task */}
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">🎯 What to do</h5>
                  <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: note.task }} />
                </div>

                {/* Workings */}
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">🔧 Workings</h5>
                  <div className="space-y-3">
                    {note.workings.map((w, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-3">
                        <div className="font-mono text-xs font-bold mb-2" style={{ color }}>{w.title}</div>
                        {w.content && <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: w.content }} />}
                        {w.below && <div className="text-sm leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: w.below }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* T-Account Panel (formal ledger format) */}
                {note.tAccountDefs && note.tAccountDefs.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">📊 T-Accounts</h5>
                    <TAccountPanel accounts={note.tAccountDefs} currentStep={0} revealedInStep={999} />
                  </div>
                )}

                {/* Destinations */}
                <div>
                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">📍 Where each figure goes</h5>
                  <div className="space-y-1.5">
                    {note.destinations.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span className="font-bold shrink-0 mt-0.5" style={{ color }}>{d.arrow}</span>
                        <span className="font-bold">{d.name}</span>
                        <span className="font-mono font-bold">{d.amt}</span>
                        <span className="text-muted-foreground">→ {d.where}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                {note.tip && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: note.tip }} />
                )}

                {/* Watch out */}
                {note.watchOut && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: note.watchOut }} />
                )}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ─── Builder Tab (TPL / BS) ───
function BuilderTab({ steps, marks, complete, color, label }: { steps: BuilderStep[]; marks: string; complete: string; color: string; label: string }) {
  const [revealed, setRevealed] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-sm font-bold">{label}</h3>
        <Badge variant="outline" className="text-xs font-mono" style={{ color, borderColor: color + '44' }}>{marks}</Badge>
      </div>

      {/* Progress */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${steps.length === 0 ? 100 : (revealed / steps.length) * 100}%`, background: color }} />
      </div>

      {/* Revealed steps */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <table className="wt-builder-table w-full">
            <tbody>
              {steps.slice(0, revealed).map((step, i) => (
                <tr key={i} className="wt-builder-rows" dangerouslySetInnerHTML={{ __html: step.rows.join('') }} />
              )).flatMap((el, i) => {
                const step = steps[i];
                return [
                  <tbody key={`rows-${i}`} dangerouslySetInnerHTML={{ __html: step.rows.join('') }} />,
                ];
              })}
            </tbody>
          </table>

          {/* Actually render rows properly */}
          <div className="wt-builder-content overflow-x-auto">
            <table className="w-full text-sm">
              {steps.slice(0, revealed).map((step, i) => (
                <tbody key={i} dangerouslySetInnerHTML={{ __html: step.rows.join('') }} />
              ))}
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Current step explanation */}
      {revealed < steps.length && (
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="font-display text-sm font-bold mb-2" style={{ color }}>
              Step {revealed + 1}: {steps[revealed].title}
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: steps[revealed].source }} />
            {steps[revealed].reason && (
              <div className="text-xs leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: steps[revealed].reason }} />
            )}
            {steps[revealed].tip && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-2 text-xs leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: steps[revealed].tip }} />
            )}
            {steps[revealed].watch && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-2 text-xs leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: steps[revealed].watch }} />
            )}
            <Button
              size="sm"
              className="text-xs gap-1 mt-1"
              style={{ background: color }}
              onClick={() => setRevealed(revealed + 1)}
            >
              Add to {label} <ChevronRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All done */}
      {revealed >= steps.length && steps.length > 0 && (
        <div className="text-center py-4">
          <div className="text-sm font-bold" style={{ color }}>{complete}</div>
          <Button variant="outline" size="sm" className="text-xs mt-2" onClick={() => setRevealed(0)}>Reset</Button>
        </div>
      )}
    </div>
  );
}
