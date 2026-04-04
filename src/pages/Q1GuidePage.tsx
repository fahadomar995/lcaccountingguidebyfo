import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Q1_ADJUSTMENTS } from "@/data/studyContent";
import { Search, Filter } from "lucide-react";

export default function Q1GuidePage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const accountTypes = ["All", "Sole Trader", "Company", "Manufacturing"];

  const filtered = useMemo(() => {
    return Q1_ADJUSTMENTS.filter(adj => {
      const matchSearch = !search || adj.name.toLowerCase().includes(search.toLowerCase()) || adj.effect.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || adj.accountTypes.includes(typeFilter);
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">Q1 Adjustment Guide</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
        Complete reference for every Q1 adjustment type. Filter by account type to see only what's relevant.
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search adjustments..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Filter by account type */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {accountTypes.map(t => (
          <Button key={t} variant={typeFilter === t ? "default" : "outline"} size="sm" className="text-xs h-7 px-3" onClick={() => setTypeFilter(t)}>
            {t}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-4">{filtered.length} adjustment{filtered.length !== 1 ? "s" : ""}</p>

      <div className="space-y-3">
        {filtered.map(adj => (
          <Card key={adj.name} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h3 className="text-sm font-bold">{adj.name}</h3>
                <Badge variant="outline" className="text-[9px]">{adj.type}</Badge>
                {adj.accountTypes.map(t => (
                  <Badge key={t} variant="outline" className="text-[8px] bg-muted">{t}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-2.5">
                  <p className="text-[9px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-0.5">Debit</p>
                  <p className="text-xs font-medium">{adj.debit}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/20 rounded-lg p-2.5">
                  <p className="text-[9px] font-bold uppercase text-rose-600 dark:text-rose-400 mb-0.5">Credit</p>
                  <p className="text-xs font-medium">{adj.credit}</p>
                </div>
                <div className="bg-muted rounded-lg p-2.5">
                  <p className="text-[9px] font-bold uppercase text-muted-foreground mb-0.5">Effect</p>
                  <p className="text-xs">{adj.effect}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic">Example: {adj.example}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
