import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FORMULAS } from "@/data/studyContent";
import { Search } from "lucide-react";

export default function FormulasPage() {
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All");

  const sections = useMemo(() => {
    const s = new Set(FORMULAS.map(f => f.section));
    return ["All", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    return FORMULAS.filter(f => {
      const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.formula.toLowerCase().includes(search.toLowerCase());
      const matchSection = sectionFilter === "All" || f.section === sectionFilter;
      return matchSearch && matchSection;
    });
  }, [search, sectionFilter]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof FORMULAS> = {};
    filtered.forEach(f => {
      if (!g[f.section]) g[f.section] = [];
      g[f.section].push(f);
    });
    return g;
  }, [filtered]);

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Formula Cheat Sheet</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        {FORMULAS.length} key formulas in one searchable reference. Covers ratios, costing, and depreciation.
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search formulas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Section filter */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {sections.map(s => (
          <Button key={s} variant={sectionFilter === s ? "default" : "outline"} size="sm" className="text-xs h-7 px-3" onClick={() => setSectionFilter(s)}>
            {s}
          </Button>
        ))}
      </div>

      {/* Formulas grouped */}
      {Object.entries(grouped).map(([section, formulas]) => (
        <div key={section} className="mb-6">
          <h2 className="font-display text-sm font-bold mb-3 pb-1 border-b border-border">{section}</h2>
          <div className="space-y-2">
            {formulas.map(f => (
              <Card key={f.name} className="border-border">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-0.5">{f.name}</p>
                    <p className="font-mono text-xs text-primary">{f.formula}</p>
                  </div>
                  {f.notes && <Badge variant="outline" className="text-[9px] shrink-0">{f.notes}</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No formulas match your search.</p>
      )}
    </div>
  );
}
