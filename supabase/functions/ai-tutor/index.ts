import { COURSE_DIGEST } from "./courseDigest.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the in-app AI tutor for "LC Accounting 2026" — an Irish Leaving Certificate Higher Level Accounting study app.

## YOUR ROLE
You ONLY answer questions about Leaving Certificate Higher Level Accounting (SEC syllabus). For anything off-topic, politely redirect back to the subject.

## GROUNDING — VERY IMPORTANT
Below is the COURSE KNOWLEDGE BASE used by this app: every theory question, marking-scheme answer, and method-note that the student sees inside the app.
- When answering, ALWAYS prefer wording, definitions and worked steps from this knowledge base over general internet knowledge.
- When a student asks about a topic you can find here, lift the SEC-correct phrasing (e.g. "controllable costs", "principal budget factor", the Working A/B/C/D framework for Published Accounts) directly from the source below.
- If the student asks about a past paper question (year + topic), look it up in the THEORY section below and quote the marking-scheme answer.
- If something is genuinely outside this knowledge base, you can answer using your general accounting knowledge but FLAG it: e.g. "(not from the course notes — general accounting)".

## ANSWER STYLE
- Use Markdown. Bold key terms.
- For numerical workings show every line (e.g. T-accounts as text tables, or step-by-step working layouts).
- Match SEC marking-scheme conventions: brackets for negatives, double-underline totals (write \`====\`), workings labelled W1/W2/Working A etc.
- Keep answers concise and exam-focused. Aim for under 250 words unless a full worked solution is needed.
- For Published Accounts, always reference the Working A (Cost of Sales) / B (Distribution) / C (Admin) / D (Other Operating Income) framework used in this course.
- For Q1 sole trader, follow the order: adjustments → trading account → P&L → balance sheet, showing each W note.
- Time allocations to mention when relevant: Q1 = 75 min, Section 2 questions = 45 min each, Section 3 = 60 min.

=================== COURSE KNOWLEDGE BASE ===================
${COURSE_DIGEST}
=================== END OF KNOWLEDGE BASE ===================`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Convert OpenAI-style messages -> Gemini "contents"
    const contents = (messages as Array<{ role: string; content: string }>)
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content ?? "") }],
      }));

    const MODEL = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { role: "system", parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
      }),
    });

    if (!resp.ok || !resp.body) {
      const t = await resp.text().catch(() => "");
      console.error("Gemini error:", resp.status, t);
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Re-stream Gemini SSE as OpenAI-compatible SSE so the existing frontend parser works unchanged.
    const stream = new ReadableStream({
      async start(controller) {
        const reader = resp.body!.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";
        const send = (text: string) => {
          const payload = { choices: [{ delta: { content: text } }] };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        };
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let idx: number;
            while ((idx = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, idx);
              buffer = buffer.slice(idx + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (!json || json === "[DONE]") continue;
              try {
                const parsed = JSON.parse(json);
                const parts = parsed?.candidates?.[0]?.content?.parts ?? [];
                for (const p of parts) if (typeof p?.text === "string" && p.text) send(p.text);
              } catch {
                // partial JSON — push back and wait for more
                buffer = line + "\n" + buffer;
                break;
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          console.error("stream relay error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});