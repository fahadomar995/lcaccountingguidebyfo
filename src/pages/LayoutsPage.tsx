import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_FORMATS } from "@/data/studyContent";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LayoutsPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = LAYOUT_FORMATS.find(l => l.id === activeId);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Layout Practice</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        {LAYOUT_FORMATS.length} exam layout formats. Learn the exact structure the SEC expects. Click any format to see the full template.
      </p>

      {active ? (
        <div>
          <Button variant="outline" size="sm" className="text-xs mb-4" onClick={() => setActiveId(null)}>← Back to All Layouts</Button>

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
