import { Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Star, Minus, ChevronsDown, Ban } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { groupTopicsByBlock } from "@/data/topicTaxonomy";
import { useTopicPreferences, type TopicPriority } from "@/hooks/useTopicPreferences";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const OPTIONS: { value: TopicPriority; label: string; icon: any; cls: string }[] = [
  { value: "high",     label: "High",     icon: Star,         cls: "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary" },
  { value: "normal",   label: "Normal",   icon: Minus,        cls: "data-[active=true]:bg-muted data-[active=true]:text-foreground data-[active=true]:border-foreground/30" },
  { value: "low",      label: "Low",      icon: ChevronsDown, cls: "data-[active=true]:bg-amber-500/15 data-[active=true]:text-amber-700 dark:data-[active=true]:text-amber-300 data-[active=true]:border-amber-500/40" },
  { value: "excluded", label: "Excluded", icon: Ban,          cls: "data-[active=true]:bg-destructive/15 data-[active=true]:text-destructive data-[active=true]:border-destructive/40" },
];

export default function PreferencesPage() {
  const { user } = useAuth();
  const { get, setPriority, loading } = useTopicPreferences();
  const groups = groupTopicsByBlock();

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3">
        <ArrowLeft className="h-3 w-3" /> Back to dashboard
      </Link>

      <div className="flex items-start gap-3 mb-6">
        <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <SlidersHorizontal className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight">Topic preferences</h1>
          <p className="text-sm text-muted-foreground font-light mt-0.5 max-w-prose">
            Bias the revision engine toward the topics that matter to you. <strong>High</strong> topics
            get prioritised in flashcards and AI suggestions; <strong>Low</strong> are pushed down;
            <strong> Excluded</strong> topics are hidden from recommendations entirely.
          </p>
        </div>
      </div>

      {!user && (
        <Card className="mb-5 border-l-4 border-l-amber-500/60 bg-amber-500/5">
          <CardContent className="p-3 text-xs flex items-center justify-between gap-3">
            <span>Saved on this device only. <Link to="/auth" className="text-primary font-semibold underline underline-offset-2">Sign in</Link> to sync preferences across devices.</span>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-6">
          {groups.map((g) => (
            <section key={g.label}>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{g.label}</h2>
              <Card>
                <CardContent className="p-0 divide-y divide-border">
                  {g.topics.map((t) => {
                    const pref = get(t.id);
                    return (
                      <div key={t.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] text-muted-foreground">Ch {t.chapterId}</span>
                            <span className="text-sm font-semibold truncate">{t.title}</span>
                            {t.examSections.map((s) => (
                              <Badge key={s} variant="outline" className="text-[9px] px-1.5 py-0 font-mono">{s}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {OPTIONS.map((opt) => {
                            const Icon = opt.icon;
                            const active = pref.priority === opt.value;
                            return (
                              <Button
                                key={opt.value}
                                size="sm"
                                variant="outline"
                                data-active={active}
                                onClick={() => setPriority(t.id, opt.value)}
                                className={cn("h-7 px-2 text-[11px] gap-1 transition-colors", opt.cls)}
                                aria-pressed={active}
                              >
                                <Icon className="h-3 w-3" />
                                <span className="hidden sm:inline">{opt.label}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}