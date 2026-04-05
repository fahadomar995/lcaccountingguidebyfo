import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Bug, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("feedback");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thanks for reaching out! We'll get back to you soon." });
    setName(""); setEmail(""); setMessage("");
  };

  const TYPES = [
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "bug", label: "Bug Report", icon: Bug },
    { id: "suggestion", label: "Suggestion", icon: Lightbulb },
    { id: "other", label: "Other", icon: Mail },
  ];

  return (
    <div className="max-w-[700px] mx-auto px-4 sm:px-7 py-8 pb-16">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">
        Contact & Feedback
      </h1>
      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
        Found a bug, have a suggestion, or want to request a feature? Let us know.
      </p>

      <Card className="border-border mb-8">
        <CardContent className="p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Type</label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
                      type === t.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <t.icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">Message</label>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Describe the issue, suggestion, or feedback..." rows={5} required />
            </div>

            <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-1">Report Errors</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              If you spot an incorrect figure, wrong marking scheme answer, or calculation error in any working, please report it so we can fix it immediately.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-1">Request Features</h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Want a specific past paper worked through, a new module added, or a tool improved? We prioritise requests from active users.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
