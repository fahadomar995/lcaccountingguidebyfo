import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STUDY_TOOLS_DATA } from "@/data/studyContent";

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const QUESTIONS = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9"];

const TIMING_SECTIONS = [
  { label: "Section 1 — Q1", marks: 120, minutes: 54, color: "hsl(142, 72%, 29%)" },
  { label: "Section 2 — Question A", marks: 100, minutes: 46, color: "hsl(217, 91%, 60%)" },
  { label: "Section 2 — Question B", marks: 100, minutes: 46, color: "hsl(217, 91%, 60%)" },
  { label: "Section 3 — Q8 or Q9", marks: 80, minutes: 34, color: "hsl(38, 92%, 50%)" },
];

export default function StudyToolsPage() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));
  const [activeTab, setActiveTab] = useState<"tools" | "timing" | "tracker">("tools");

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Study Tools</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        Study planner, exam timing, mark allocation, practice tracker, and revision checklists.
      </p>

      <div className="flex gap-2 mb-6">
        {[
          { id: "tools" as const, label: "Guides" },
          { id: "timing" as const, label: "Exam Timer" },
          { id: "tracker" as const, label: "Practice Tracker" },
        ].map(tab => (
          <Button key={tab.id} variant={activeTab === tab.id ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === "tools" && (
        <div className="space-y-4">
          {STUDY_TOOLS_DATA.map((tool, i) => {
            const isOpen = expanded.has(i);
            return (
              <Card
                key={i}
                className="border-border cursor-pointer transition-all hover:shadow-sm"
                onClick={() => setExpanded(prev => {
                  const next = new Set(prev);
                  next.has(i) ? next.delete(i) : next.add(i);
                  return next;
                })}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <tool.icon className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-display text-sm font-bold">{tool.title}</h3>
                      <p className="text-xs text-muted-foreground">{tool.desc}</p>
                    </div>
                    <span className={`text-muted-foreground transition-transform text-sm ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </div>
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-border" onClick={e => e.stopPropagation()}>
                      <ul className="space-y-2">
                        {tool.content.map((line, j) => (
                          <li key={j} className="text-xs leading-relaxed">
                            {line.startsWith("TIP:") ? (
                              <span className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded px-2 py-1 block">
                                <strong className="text-amber-700 dark:text-amber-400">TIP:</strong> {line.replace("TIP: ", "")}
                              </span>
                            ) : line.startsWith("□") ? (
                              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                                <input type="checkbox" className="accent-primary w-3.5 h-3.5" />
                                <span>{line.replace("□ ", "")}</span>
                              </label>
                            ) : (
                              <span>{line}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === "timing" && <ExamTimingDisplay />}
      {activeTab === "tracker" && <PracticeTracker />}
    </div>
  );
}

function ExamTimingDisplay() {
  const totalMinutes = 180;

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <h3 className="font-display text-base font-bold mb-1">Exam Timing — 3 Hours (180 Minutes)</h3>
        <p className="text-xs text-muted-foreground mb-5">
          Fixed recommended time allocations based on mark weighting. Stick to these and you'll finish with time to check.
        </p>

        <div className="space-y-3 mb-5">
          {TIMING_SECTIONS.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-medium w-44 shrink-0">{s.label}</span>
              <div className="flex-1 bg-muted rounded-full h-7 overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                  style={{ width: `${(s.minutes / totalMinutes) * 100}%`, background: s.color }}
                >
                  <span className="text-[10px] font-mono font-bold text-white">{s.minutes} min</span>
                </div>
              </div>
              <Badge variant="outline" className="font-mono text-xs shrink-0">{s.marks} marks</Badge>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Total</span>
            <div className="flex gap-3">
              <Badge className="font-mono text-xs">180 min</Badge>
              <Badge variant="outline" className="font-mono text-xs">400 marks</Badge>
            </div>
          </div>
        </div>

        {/* Visual timeline */}
        <div className="mt-5 flex rounded-lg overflow-hidden h-8">
          {TIMING_SECTIONS.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-[9px] font-bold text-white"
              style={{ width: `${(s.minutes / totalMinutes) * 100}%`, background: s.color }}
            >
              {s.minutes}m
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-muted-foreground">0 min</span>
          <span className="text-[9px] text-muted-foreground">180 min</span>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
          <strong className="text-amber-700 dark:text-amber-400">TIP:</strong> Don't spend more than 54 minutes on Q1. Move on even if not finished — marks per minute drop sharply after the main workings.
        </div>
      </CardContent>
    </Card>
  );
}

function PracticeTracker() {
  const [tracker, setTracker] = useLocalStorage<Record<string, boolean>>("lc-practice-tracker", {});

  const toggle = (year: number, q: string) => {
    const key = `${year}-${q}`;
    setTracker(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(tracker).filter(Boolean).length;
  const totalCells = YEARS.length * QUESTIONS.length;

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-bold mb-1">Practice Tracker</h3>
            <p className="text-xs text-muted-foreground">Click cells to mark questions as completed.</p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {completedCount}/{totalCells}
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="text-xs border-collapse w-full min-w-[500px]">
            <thead>
              <tr>
                <th className="p-1.5 border border-border text-left font-bold bg-muted">Year</th>
                {QUESTIONS.map(q => (
                  <th key={q} className="p-1.5 border border-border text-center font-bold bg-muted w-10">{q}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {YEARS.map(year => (
                <tr key={year}>
                  <td className="p-1.5 border border-border font-mono font-bold">{year}</td>
                  {QUESTIONS.map(q => {
                    const key = `${year}-${q}`;
                    const done = tracker[key];
                    return (
                      <td
                        key={q}
                        className={`p-1.5 border border-border text-center cursor-pointer transition-colors ${done ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400" : "hover:bg-muted/50"}`}
                        onClick={() => toggle(year, q)}
                      >
                        {done ? "✓" : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => setTracker({})}
          >
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
