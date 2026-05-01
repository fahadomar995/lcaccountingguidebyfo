// Ingests the COURSE_DIGEST into the tutor_chunks table with Gemini embeddings.
// Idempotent: clears the table first, then re-ingests. Service-role only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { COURSE_DIGEST } from "./courseDigest.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const EMBED_MODEL = "gemini-embedding-001";
const MAX_CHARS = 1800; // ~450 tokens per chunk

// Map section heading keywords -> exam section tags so retrieval can be filtered.
function tagsFor(heading: string): { topic: string; sections: string[] } {
  const h = heading.toLowerCase();
  const sections: string[] = [];
  let topic = "general";

  const map: Array<[RegExp, string, string[]]> = [
    [/sole trader|q1|final accounts/, "sole-trader", ["Q1"]],
    [/club/, "club", ["Q2"]],
    [/manufactur/, "manufacturing", ["Q2", "Q8"]],
    [/service firm|service business/, "service-firm", ["Q2"]],
    [/tabular/, "tabular", ["Q2"]],
    [/cash ?flow/, "cashflow", ["Q2"]],
    [/published/, "published-accounts", ["Q2"]],
    [/department/, "departmental", ["Q2"]],
    [/farm/, "farm", ["Q2"]],
    [/correction of errors|suspense/, "errors", ["Q2"]],
    [/incomplete/, "incomplete-records", ["Q2"]],
    [/ratio|interpretation/, "ratios", ["Q5", "Q6"]],
    [/marginal|break.?even|costing/, "costing", ["Q8"]],
    [/budget/, "budgeting", ["Q9"]],
    [/conceptual|framework|principle/, "theory-framework", ["theory"]],
    [/exam (structure|technique)/, "exam-technique", ["all"]],
  ];
  for (const [re, t, secs] of map) {
    if (re.test(h)) {
      topic = t;
      sections.push(...secs);
      break;
    }
  }
  if (sections.length === 0) sections.push("all");
  return { topic, sections };
}

// Split digest by `### ` headings, then by paragraph, packing into <=MAX_CHARS chunks.
function chunkDigest(digest: string) {
  const sections = digest.split(/\n(?=### )/g);
  const chunks: Array<{ content: string; topic: string; sections: string[]; ord: number }> = [];
  let ord = 0;
  for (const sec of sections) {
    const firstLine = sec.split("\n")[0] ?? "";
    const heading = firstLine.replace(/^#+\s*/, "").trim();
    if (!heading) continue;
    const { topic, sections: tags } = tagsFor(heading);
    const paras = sec.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    let buf = `[${heading}]\n`;
    for (const p of paras) {
      if ((buf + "\n\n" + p).length > MAX_CHARS && buf.length > heading.length + 4) {
        chunks.push({ content: buf.trim(), topic, sections: tags, ord: ord++ });
        buf = `[${heading}]\n${p}`;
      } else {
        buf += "\n\n" + p;
      }
    }
    if (buf.trim().length > heading.length + 4) {
      chunks.push({ content: buf.trim(), topic, sections: tags, ord: ord++ });
    }
  }
  return chunks;
}

async function embed(text: string, apiKey: string): Promise<number[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent?key=${apiKey}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_DOCUMENT",
        outputDimensionality: 768,
    }),
  });
  if (!r.ok) throw new Error(`embed failed ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return j.embedding?.values ?? [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!apiKey || !url || !serviceKey) throw new Error("missing env");

    // TEMP: open during initial ingestion; will lock down after.

    const supabase = createClient(url, serviceKey);

    const chunks = chunkDigest(COURSE_DIGEST);
    console.log(`Chunked digest into ${chunks.length} chunks`);

    const u = new URL(req.url);
    const from = parseInt(u.searchParams.get("from") ?? "0", 10);
    const limit = Math.min(parseInt(u.searchParams.get("limit") ?? "20", 10), 30);
    const reset = u.searchParams.get("reset") === "1";

    if (reset) {
      const { error: delErr } = await supabase.from("tutor_chunks").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      if (delErr) throw delErr;
      console.log("table cleared");
    }

    const slice = chunks.slice(from, from + limit);

    let inserted = 0;
    for (const c of slice) {
      try {
        const vec = await embed(c.content, apiKey);
        if (vec.length !== 768) {
          console.warn(`unexpected embedding length ${vec.length}, skipping ord ${c.ord}`);
          continue;
        }
        const { error } = await supabase.from("tutor_chunks").insert({
          source: "course_digest",
          topic: c.topic,
          section_tags: c.sections,
          ord: c.ord,
          content: c.content,
          token_estimate: Math.ceil(c.content.length / 4),
          embedding: vec as any,
        });
        if (error) { console.error(`insert ord ${c.ord}:`, error); continue; }
        inserted++;
      } catch (e) {
        console.error(`chunk ${c.ord} failed:`, e);
      }
    }

    const next = from + limit;
    const done = next >= chunks.length;
    return new Response(JSON.stringify({ ok: true, total: chunks.length, from, limit, inserted, next: done ? null : next, done }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ingest error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});