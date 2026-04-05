import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LAYOUT_TEMPLATES, CLASSIFICATION_REF } from "@/data/layoutData";

export default function LayoutsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const active = LAYOUT_TEMPLATES[activeIdx];

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">Layout Practice</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
        Master every accounting format. Toggle between the filled reference and practice mode — where you type item names into each row from memory. Classification reference at the bottom.
      </p>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {LAYOUT_TEMPLATES.map((l, i) => (
          <button
            key={l.id}
            onClick={() => { setActiveIdx(i); setPracticeMode(false); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              i === activeIdx
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {l.tabLabel}
          </button>
        ))}
      </div>

      {/* Mode toggle */}
      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-6">
        <button
          onClick={() => setPracticeMode(false)}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${!practiceMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
        >
          Reference
        </button>
        <button
          onClick={() => setPracticeMode(true)}
          className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${practiceMode ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
        >
          Practice
        </button>
      </div>

      {/* Layout card */}
      <Card className="border-border overflow-hidden mb-6">
        <div className="bg-muted/50 border-b border-border px-5 py-3 flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">{active.badgeText}</Badge>
          <h2 className="font-display text-sm font-bold">{active.title}{practiceMode ? " — Practice" : ""}</h2>
        </div>

        <CardContent className="p-0">
          {/* Note */}
          <div className="px-5 py-3 border-b border-border bg-amber-50/50 dark:bg-amber-950/10">
            <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: active.note }} />
          </div>

          {practiceMode && (
            <div className="px-5 py-2 border-b border-border bg-rose-50/50 dark:bg-rose-950/10">
              <p className="text-xs"><strong>Practice mode.</strong> Section headings and totals are visible. Item names are replaced with input fields — type what you think goes in each row.</p>
            </div>
          )}

          {/* Tables */}
          <div className="overflow-x-auto p-4 space-y-6">
            {active.tables.map((table, ti) => (
              <table key={ti} className="acct w-full">
                <caption>{table.caption}</caption>
                {table.headerRow && (
                  <thead>
                    <tr>
                      {table.headerRow.map((h, hi) => (
                        <th key={hi}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {table.rows.map((row, ri) => {
                    const cls = row.cls || "";
                    const isHeader = cls.includes("h") || cls.includes("b");
                    const isTotal = cls.includes("t") || cls.includes("s");
                    const isBlank = cls === "bl";
                    const isIndent = cls.includes("i2") ? "i2" : cls.includes("i") ? "i" : "";
                    const isBold = cls.includes("b");
                    const showLabel = !practiceMode || isHeader || isTotal || isBlank || row.label === "";

                    const trClass = cls.includes("bt") || cls === "t" ? "t" : cls.includes("bs") || cls === "s" ? "s" : isBlank ? "bl" : "";

                    const labelCellClass = [
                      "l",
                      isIndent,
                      isBold ? "b" : "",
                      cls.includes("h") ? "h" : "",
                      !showLabel ? "blank" : "",
                    ].filter(Boolean).join(" ");

                    return (
                      <tr key={ri} className={trClass}>
                        <td className={labelCellClass}>
                          {showLabel ? row.label : (
                            <input type="text" placeholder="What goes here?" className="acct-input" />
                          )}
                        </td>
                        {row.c1 !== undefined && <td className="n">{row.c1}</td>}
                        {row.c2 !== undefined && <td className="n">{row.c2}</td>}
                        {row.c3 !== undefined && <td className="n">{row.c3}</td>}
                        {row.nc && <td className="nc">{practiceMode ? "" : row.nc}</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ))}
          </div>

          {/* Warn */}
          {active.warn && (
            <div className="px-5 py-3 border-t border-border bg-muted/30">
              <div className="text-xs leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: active.warn }} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Classification Reference */}
      <div className="mb-8">
        <h2 className="font-display text-lg font-bold mb-4">Classification Reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLASSIFICATION_REF.map((c, i) => (
            <Card key={i} className="border-border">
              <CardContent className="p-4">
                <h4 className="text-xs font-bold mb-2 text-primary">{c.title}</h4>
                <div className="text-[11px] leading-relaxed text-muted-foreground whitespace-pre-line">
                  {c.items.replace(/\*\*(.*?)\*\*/g, "⟨$1⟩").split("\n").map((line, li) => (
                    <div key={li}>
                      {line.includes("⟨") ? (
                        <span dangerouslySetInnerHTML={{ __html: line.replace(/⟨(.*?)⟩/g, "<strong>$1</strong>") }} />
                      ) : line}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
