import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAYOUT_FORMATS } from "@/data/studyContent";
import { Check, X } from "lucide-react";

export default function LayoutsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [practiceMode, setPracticeMode] = useState(false);
  const active = LAYOUT_FORMATS.find(l => l.id === activeId);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Layout Practice</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        {LAYOUT_FORMATS.length} exam layout formats. Learn the exact structure the SEC expects. Click any format to see the full template.
      </p>

      {active ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => { setActiveId(null); setPracticeMode(false); }}>← Back to All Layouts</Button>
            <Button
              variant={practiceMode ? "default" : "outline"}
              size="sm"
              className="text-xs ml-auto"
              onClick={() => setPracticeMode(!practiceMode)}
            >
              {practiceMode ? "Reference Mode" : "Practice Mode"}
            </Button>
          </div>

          {practiceMode ? (
            <PracticeLayout layout={active} />
          ) : (
            <>
              <Card className="border-border overflow-hidden">
                <div className="bg-muted/50 border-b border-border px-5 py-3 flex items-center justify-between">
                  <h2 className="font-display text-base font-bold">{active.title}</h2>
                  <Badge variant="outline" className="text-[10px]">{active.section}</Badge>
                </div>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-3 border-b border-border font-bold text-xs w-[200px]"></th>
                          {active.columns.map((c, i) => (
                            <th key={i} className="p-3 border-b border-border text-right font-bold text-xs">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {active.rows.map((row, i) => (
                          <tr key={i} className={`${row.isTotal ? "font-bold border-t-2 border-foreground" : row.isSubtotal ? "font-semibold border-t border-border" : ""}`}>
                            <td className={`p-2.5 border-b border-border text-xs ${row.indent ? "pl-6" : ""}`}>{row.label}</td>
                            {row.values.map((v, j) => (
                              <td key={j} className="p-2.5 border-b border-border text-right text-xs font-mono">{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {active.tips.length > 0 && (
                <Card className="mt-4 border-border bg-amber-50 dark:bg-amber-950/20">
                  <CardContent className="p-4">
                    <h3 className="text-xs font-bold mb-2 text-amber-700 dark:text-amber-400">Exam Tips</h3>
                    <ul className="text-xs space-y-1 text-amber-800 dark:text-amber-300 list-disc list-inside">
                      {active.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAYOUT_FORMATS.map(layout => (
            <Card key={layout.id} className="cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all border-border" onClick={() => setActiveId(layout.id)}>
              <CardContent className="p-5">
                <Badge variant="outline" className="text-[9px] mb-2">{layout.section}</Badge>
                <h3 className="font-display text-sm font-bold mb-1">{layout.title}</h3>
                <p className="text-xs text-muted-foreground">{layout.rows.length} rows · {layout.columns.length} columns</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function PracticeLayout({ layout }: { layout: typeof LAYOUT_FORMATS[0] }) {
  const labelsToGuess = layout.rows.filter(r => r.label.trim() !== "").map(r => r.label);
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const results = labelsToGuess.map((label, i) => {
    const guess = (guesses[i] || "").trim().toLowerCase();
    const correct = label.toLowerCase();
    return guess === correct || correct.includes(guess) && guess.length > 2;
  });

  const correctCount = checked ? results.filter(Boolean).length : 0;

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-base font-bold">{layout.title}</h2>
            <p className="text-xs text-muted-foreground">Type the line item names from memory</p>
          </div>
          {checked && (
            <Badge className="font-mono">{correctCount}/{labelsToGuess.length}</Badge>
          )}
        </div>

        <div className="space-y-2">
          {labelsToGuess.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-muted-foreground w-5 text-right">{i + 1}</span>
              {checked ? (
                <div className="flex items-center gap-2 flex-1">
                  {results[i] ? (
                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                  )}
                  <span className={`text-xs ${results[i] ? "text-green-700 dark:text-green-400" : "text-red-600"}`}>
                    {guesses[i] || "(blank)"}
                  </span>
                  {!results[i] && (
                    <span className="text-xs text-muted-foreground ml-2">→ {label}</span>
                  )}
                </div>
              ) : (
                <Input
                  className="h-7 text-xs flex-1"
                  placeholder={`Line ${i + 1}`}
                  value={guesses[i] || ""}
                  onChange={e => setGuesses(prev => ({ ...prev, [i]: e.target.value }))}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          {!checked ? (
            <Button size="sm" className="text-xs" onClick={() => setChecked(true)}>Check Answers</Button>
          ) : (
            <Button size="sm" variant="outline" className="text-xs" onClick={() => { setChecked(false); setGuesses({}); }}>Try Again</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
