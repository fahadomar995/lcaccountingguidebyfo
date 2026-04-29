import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { tryConsume, getRemaining, AI_DAILY_LIMIT } from "@/lib/aiRateLimit";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-tutor`;

interface Props {
  variant?: "floating" | "panel";
  onClose?: () => void;
}

export function AITutor({ variant = "panel", onClose }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(getRemaining());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!tryConsume()) {
      toast.error(`Daily AI limit reached (${AI_DAILY_LIMIT}/day). Resets at midnight.`);
      return;
    }
    setRemaining(getRemaining());
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: acc } : m);
        return [...prev, { role: "assistant", content: acc }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });
      if (resp.status === 429) { toast.error("AI rate limit — try again shortly."); setLoading(false); return; }
      if (resp.status === 402) { toast.error("AI credits exhausted."); setLoading(false); return; }
      if (!resp.ok || !resp.body) throw new Error("Failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("AI tutor error");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={cn(
      "flex flex-col bg-card border border-border rounded-lg shadow-xl overflow-hidden",
      variant === "floating" ? "w-[380px] h-[560px] max-h-[80vh]" : "w-full h-[calc(100vh-8rem)]",
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <div>
            <h3 className="font-display text-sm font-semibold">Accounting AI Tutor</h3>
            <p className="text-[10px] text-muted-foreground">{remaining}/{AI_DAILY_LIMIT} messages left today</p>
          </div>
        </div>
        {onClose && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}><X className="h-4 w-4" /></Button>}
      </div>

      <ScrollArea className="flex-1" ref={scrollRef as any}>
        <div className="p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary/40" />
              <p>Ask me anything about LC Accounting.</p>
              <p className="text-xs mt-1">e.g. "Explain the published accounts contingent liability note"</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={cn("text-sm", m.role === "user" ? "text-right" : "text-left")}>
              <div className={cn(
                "inline-block px-3 py-2 rounded-lg max-w-[88%] text-left",
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
              )}>
                {m.role === "assistant"
                  ? <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"><ReactMarkdown>{m.content}</ReactMarkdown></div>
                  : <span className="whitespace-pre-wrap">{m.content}</span>}
              </div>
            </div>
          ))}
          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="text-left"><div className="inline-block px-3 py-2 rounded-lg bg-muted"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div></div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3 bg-background">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={remaining > 0 ? "Ask the tutor… (Enter to send)" : "Daily limit reached — back tomorrow"}
            disabled={remaining <= 0 || loading}
            className="min-h-[44px] max-h-32 resize-none text-sm"
            rows={1}
          />
          <Button onClick={send} disabled={loading || !input.trim() || remaining <= 0} size="icon" className="shrink-0">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}