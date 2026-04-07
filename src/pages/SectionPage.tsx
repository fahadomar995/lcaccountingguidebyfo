import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Archetype } from "@/data/archetypes";
import type { TheoryQuestion, FormulaCard } from "@/data/costingData";
import WorkingsPage from "./WorkingsPage";

interface SectionPageProps {
  sectionLabel: string;
  title: string;
  subtitle: string;
  introBlocks: { title: string; content: string; accent?: boolean }[];
  formulaSections: { section: string; cards: FormulaCard[] }[];
  apportionmentNote?: string;
  theoryBank: TheoryQuestion[];
  archetypes: Archetype[];
  categories: { key: string; label: string }[];
  accentColor?: string;
}

export default function SectionPage({
  sectionLabel, title, subtitle, introBlocks, formulaSections, apportionmentNote,
  theoryBank, archetypes, categories, accentColor,
}: SectionPageProps) {
  const [revealedTheory, setRevealedTheory] = useState<Record<number, boolean>>({});

  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mb-1">{sectionLabel}</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">{subtitle}</p>

      <Tabs defaultValue="intro">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="intro" className="text-xs">Introduction</TabsTrigger>
          <TabsTrigger value="formulas" className="text-xs">Key Formulas</TabsTrigger>
          <TabsTrigger value="practice" className="text-xs">Full Question Practice</TabsTrigger>
          <TabsTrigger value="theory" className="text-xs">Theory Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="intro">
          <div className="space-y-4">
            {introBlocks.map((block, i) => (
              <Card key={i} className={`border-l-4 ${block.accent ? 'border-l-amber-500' : 'border-l-primary'}`}>
                <CardContent className="p-5">
                  <h3 className="font-display text-base font-bold mb-2">{block.title}</h3>
                  <div className="text-[13px] text-muted-foreground font-light leading-relaxed [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:list-disc [&_strong]:text-foreground [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: block.content }} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="formulas">
          <div className="space-y-6">
            {formulaSections.map((sec, si) => (
              <div key={si}>
                <h3 className="font-display text-sm font-bold mb-3">{sec.section}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sec.cards.map((c, ci) => (
                    <Card key={ci} className="border-border hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <p className="font-display text-sm font-bold mb-1.5">{c.name}</p>
                        <p className="font-mono text-xs text-primary bg-primary/5 px-3 py-2 rounded-md mb-2 leading-relaxed">{c.formula}</p>
                        <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{c.note}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            {apportionmentNote && (
              <Card className="border-l-4 border-l-blue-400">
                <CardContent className="p-4">
                  <h3 className="font-display text-sm font-bold mb-2">Apportionment Bases</h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: apportionmentNote }} />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="practice">
          <WorkingsPage
            title=""
            subtitle=""
            sectionLabel=""
            archetypes={archetypes}
            categories={categories}
            accentColor={accentColor}
            embedded
          />
        </TabsContent>

        <TabsContent value="theory">
          <Card className="border-l-4 border-l-blue-400 mb-4">
            <CardContent className="p-4">
              <h3 className="font-display text-sm font-bold mb-1">Theory Questions</h3>
              <p className="text-xs text-muted-foreground font-light">SEC past paper theory with model answers. Click to reveal.</p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {theoryBank.map((t, i) => (
              <Card
                key={i}
                className="border-border cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => setRevealedTheory(p => ({ ...p, [i]: !p[i] }))}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <p className="text-[13px] text-foreground leading-relaxed flex-1">
                      <strong>({t.year}, {t.marks} marks)</strong> {t.question}
                    </p>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      {revealedTheory[i] ? "Hide" : "Reveal"}
                    </Badge>
                  </div>
                  {revealedTheory[i] && (
                    <div className="mt-3 pt-3 border-t border-border text-xs text-primary font-light leading-relaxed whitespace-pre-wrap">
                      {t.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
