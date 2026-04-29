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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) return new Response(JSON.stringify({ error: "Rate limit reached. Try again shortly." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (resp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up in Lovable Cloud." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(resp.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("ai-tutor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});