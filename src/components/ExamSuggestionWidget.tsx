import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  buildSuggestions,
  SIM_HISTORY_KEY,
  type HistoryEntry,
} from "@/lib/simulatorSuggestions";

/**
 * Dashboard widget that mirrors the Exam Simulator's "Suggested for you"
 * reminder. Uses the same prioritisation (mark weight × recency × accuracy)
 * and links straight into the simulator so the user can start the question.
 */
export default function ExamSuggestionWidget() {
  const [history] = useLocalStorage<HistoryEntry[]>(SIM_HISTORY_KEY, []);
  const suggestions = useMemo(() => buildSuggestions(history, undefined, 2), [history]);

  if (suggestions.length === 0) return null;
  const top = suggestions[0];

  return (
    <Link to="/simulator" className="block mb-6 group">
      <Card className="border-l-4 border-l-primary bg-primary/5 hover:bg-primary/10 transition-colors">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-4">
            <span className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Lightbulb className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Exam reminder
                </span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                    top.q.marks >= 100
                      ? "border-primary/40 text-primary bg-primary/5"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {top.q.marks}m
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {top.q.isMock ? "MOCK" : top.q.year} · Q{top.q.questionNumber}
                </span>
              </div>
              <div className="font-display text-sm font-bold text-foreground truncate">
                {top.q.subtopic}
              </div>
              <div className="text-xs text-muted-foreground font-light mt-0.5 line-clamp-2">
                {top.reason}
              </div>
            </div>
            <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
              Open simulator <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
          {suggestions.length > 1 && (
            <div className="mt-3 pt-3 border-t border-border/60 flex flex-wrap gap-2">
              {suggestions.slice(1).map((s) => (
                <span
                  key={s.q.id}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground"
                >
                  <span className="text-foreground">{s.q.marks}m</span>
                  <span>·</span>
                  <span>{s.q.subtopic}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}