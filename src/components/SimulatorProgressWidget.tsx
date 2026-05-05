import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, ArrowRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SIM_HISTORY_KEY, type HistoryEntry } from "@/lib/simulatorSuggestions";

/**
 * Dashboard widget summarising Exam Simulator activity: attempts, graded
 * average, best topic, and the most recent attempts. Links into /simulator.
 */
export default function SimulatorProgressWidget() {
  const [history] = useLocalStorage<HistoryEntry[]>(SIM_HISTORY_KEY, []);

  const stats = useMemo(() => {
    const scored = history.filter((h) => typeof h.percentage === "number");
    const avg = scored.length
      ? Math.round(scored.reduce((s, h) => s + (h.percentage || 0), 0) / scored.length)
      : null;
    const byTopic: Record<string, { sum: number; n: number }> = {};
    scored.forEach((h) => {
      const t = h.topic || "—";
      byTopic[t] = byTopic[t] || { sum: 0, n: 0 };
      byTopic[t].sum += h.percentage || 0;
      byTopic[t].n += 1;
    });
    const best = Object.entries(byTopic)
      .map(([t, v]) => ({ t, pct: Math.round(v.sum / v.n) }))
      .sort((a, b) => b.pct - a.pct)[0];
    const recent = [...history]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 4);
    return { attempted: history.length, graded: scored.length, avg, best, recent };
  }, [history]);

  if (stats.attempted === 0) return null;

  const avgColor =
    stats.avg == null
      ? "text-muted-foreground"
      : stats.avg >= 70
        ? "text-primary"
        : stats.avg >= 50
          ? "text-amber-600"
          : "text-destructive";

  return (
    <Link to="/simulator" className="block mb-6 group">
      <Card className="border-l-4 border-l-primary/70 hover:bg-muted/40 transition-colors">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">
                Exam simulator
              </div>
              <div className="font-display text-sm font-bold text-foreground">
                Your progress
              </div>
            </div>
            <span className="shrink-0 flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-1.5 transition-all">
              Open <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Attempts</div>
              <div className="font-mono text-lg font-bold">{stats.attempted}</div>
              <div className="text-[10px] text-muted-foreground">{stats.graded} graded</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Average</div>
              <div className={`font-mono text-lg font-bold ${avgColor}`}>
                {stats.avg == null ? "—" : `${stats.avg}%`}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Best topic</div>
              <div className="font-display text-sm font-bold truncate">
                {stats.best ? stats.best.t : "—"}
              </div>
              {stats.best && (
                <div className="text-[10px] font-mono text-muted-foreground">{stats.best.pct}%</div>
              )}
            </div>
          </div>

          {stats.recent.length > 0 && (
            <div className="border-t border-border/60 pt-2 space-y-1">
              {stats.recent.map((h) => (
                <div key={h.id + h.completedAt} className="flex items-center gap-2 text-[11px]">
                  <span className="font-mono text-muted-foreground w-10 shrink-0">{h.marks}m</span>
                  <span className="truncate flex-1 text-foreground">{h.subtopic || h.topic}</span>
                  <span className="font-mono text-muted-foreground shrink-0">
                    {typeof h.percentage === "number" ? `${h.percentage}%` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}