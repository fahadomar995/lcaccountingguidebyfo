import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STUDY_TOOLS_DATA } from "@/data/studyContent";
import { useState } from "react";

export default function StudyToolsPage() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Study Tools</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        Study planner, exam timing, mark allocation, and revision checklists.
      </p>

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
                  <div className="mt-4 pt-4 border-t border-border">
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
    </div>
  );
}
