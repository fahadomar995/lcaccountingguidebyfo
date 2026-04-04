import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Placeholder page for Q1 Workings and S2 Workings — same structure
interface WorkingsListPageProps {
  title: string;
  subtitle: string;
  sectionLabel: string;
  count: number;
  topics: { name: string; count: number; desc: string }[];
}

export default function WorkingsListPage({ title, subtitle, sectionLabel, count, topics }: WorkingsListPageProps) {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{sectionLabel}</div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">{subtitle}</p>

      <Card className="mb-6 border-border bg-sage-bg">
        <CardContent className="p-4 text-center">
          <span className="font-mono text-3xl font-bold text-primary">{count}</span>
          <p className="text-xs text-muted-foreground mt-1">Step-by-step workings with real SEC marking scheme data</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {topics.map(topic => (
          <Card key={topic.name} className="border-border hover:shadow-sm transition-all cursor-pointer">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-bold mb-0.5">{topic.name}</h3>
                <p className="text-xs text-muted-foreground font-light">{topic.desc}</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono shrink-0">{topic.count} workings</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8 italic">
        Full step-by-step walkthroughs with reveal-to-check figures coming in the next update.
      </p>
    </div>
  );
}
