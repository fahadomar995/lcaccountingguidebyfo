import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STUDY_TOOLS_DATA } from "@/data/studyContent";

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const QUESTIONS = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9"];

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
                    <span className="text-2xl">{tool.icon}</span>
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

      {activeTab === "timing" && <ExamTimingCalculator />}
      {activeTab === "tracker" && <PracticeTracker />}
    </div>
  );
}

function ExamTimingCalculator() {
  const [marks, setMarks] = useState<Record<string, number>>({
    q1: 120, q2: 100, q3: 100, q8: 80,
  });

  const totalMarks = 400;
  const totalMinutes = 150;
  const readingTime = 5;
  const workingMinutes = totalMinutes - readingTime;

  const getTime = (m: number) => Math.round((m / totalMarks) * workingMinutes);

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <h3 className="font-display text-base font-bold mb-1">Exam Timing Calculator</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Total: {totalMinutes} minutes (2h 30m). Reading time: {readingTime} min. Working time: {workingMinutes} min.
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Formula: (marks ÷ {totalMarks}) × {workingMinutes} min
        </p>

        <div className="space-y-3">
          {[
            { key: "q1", label: "Q1 (Section 1)", defaultMarks: 120 },
            { key: "q2", label: "Section 2 — Question A", defaultMarks: 100 },
            { key: "q3", label: "Section 2 — Question B", defaultMarks: 100 },
            { key: "q8", label: "Section 3 (Q8 or Q9)", defaultMarks: 80 },
          ].map(q => (
            <div key={q.key} className="flex items-center gap-3">
              <span className="text-xs font-medium w-40 shrink-0">{q.label}</span>
              <Input
                type="number"
                className="w-20 h-8 text-xs"
                value={marks[q.key]}
                onChange={e => setMarks(prev => ({ ...prev, [q.key]: Number(e.target.value) || 0 }))}
              />
              <span className="text-xs text-muted-foreground">marks →</span>
              <Badge variant="outline" className="font-mono text-xs">
                {getTime(marks[q.key])} min
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold w-40">Total Allocated</span>
            <Badge className="font-mono text-xs">
              {Object.values(marks).reduce((s, m) => s + getTime(m), 0)} min + {readingTime} min reading = {Object.values(marks).reduce((s, m) => s + getTime(m), 0) + readingTime} min
            </Badge>
          </div>
        </div>

        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
          <strong className="text-amber-700 dark:text-amber-400">TIP:</strong> Don't spend more than 45 minutes on Q1. Move on even if not finished — marks per minute drop sharply after the main workings.
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
