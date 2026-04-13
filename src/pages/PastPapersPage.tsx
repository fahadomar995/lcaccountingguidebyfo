import { useState, useMemo } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PAST_PAPERS, type PaperEntry, type PaperDocument } from "@/data/pastPapers";

type FilterType = "all" | "sec" | "mock";

function getDocHref(doc: PaperDocument) {
  return doc.externalUrl ?? `/papers/${doc.filename}`;
}

export default function PastPapersPage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [yearFilter, setYearFilter] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let papers = PAST_PAPERS.filter((p) => p.documents.length > 0);
    if (typeFilter !== "all") papers = papers.filter((p) => p.type === typeFilter);
    if (yearFilter) papers = papers.filter((p) => p.year === yearFilter);
    return papers;
  }, [typeFilter, yearFilter]);

  const years = useMemo(() => {
    const set = new Set(PAST_PAPERS.filter((p) => p.documents.length > 0).map((p) => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
          Past Papers
        </h1>
        <p className="text-sm text-muted-foreground font-body">
          Higher Level Accounting — SEC exam papers and mock papers. View in browser or download.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "sec", "mock"] as FilterType[]).map((t) => (
          <Button
            key={t}
            size="sm"
            variant={typeFilter === t ? "default" : "outline"}
            onClick={() => setTypeFilter(t)}
            className="text-xs capitalize"
          >
            {t === "all" ? "All" : t === "sec" ? "SEC" : "Mock"}
          </Button>
        ))}
        <div className="w-px bg-border mx-1" />
        <div className="flex gap-1 overflow-x-auto pb-1">
          <Button
            size="sm"
            variant={yearFilter === null ? "secondary" : "ghost"}
            onClick={() => setYearFilter(null)}
            className="text-xs shrink-0"
          >
            All Years
          </Button>
          {years.map((y) => (
            <Button
              key={y}
              size="sm"
              variant={yearFilter === y ? "secondary" : "ghost"}
              onClick={() => setYearFilter(y)}
              className="text-xs shrink-0"
            >
              {y}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>No papers match the current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((paper, i) => (
            <PaperCard key={`${paper.year}-${paper.type}-${i}`} paper={paper} />
          ))}
        </div>
      )}

      <p className="text-[11px] text-muted-foreground mt-8 font-body">
        SEC papers linked from examinations.ie. Mock papers provided for study purposes only.
      </p>
    </div>
  );
}

function PaperCard({ paper }: { paper: PaperEntry }) {
  const displayTitle = `${paper.year} ${paper.source}`;
  const isExternal = paper.documents.some((d) => d.externalUrl);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-xl font-bold text-foreground">{displayTitle}</span>
          <Badge variant={paper.type === "sec" ? "default" : "secondary"} className="text-[10px] uppercase">
            {paper.type === "sec" ? "SEC" : "Mock"}
          </Badge>
        </div>
        <div className="flex flex-col gap-1.5">
          {paper.documents.map((doc) => {
            const href = getDocHref(doc);
            return (
              <div key={doc.label} className="flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground font-body truncate">{doc.label}</span>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </a>
                  </Button>
                  {!isExternal && (
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" asChild>
                      <a href={href} download>
                        <Download className="h-3 w-3 mr-1" />
                        Save
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
