
create extension if not exists vector;

create table if not exists public.tutor_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  topic text not null default 'general',
  section_tags text[] not null default '{}',
  ord integer not null default 0,
  content text not null,
  token_estimate integer not null default 0,
  embedding vector(768),
  created_at timestamptz not null default now()
);

create index if not exists tutor_chunks_topic_idx on public.tutor_chunks(topic);
create index if not exists tutor_chunks_section_tags_idx on public.tutor_chunks using gin(section_tags);
create index if not exists tutor_chunks_embedding_idx
  on public.tutor_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

alter table public.tutor_chunks enable row level security;

create policy "tutor_chunks_read_all"
  on public.tutor_chunks for select
  to anon, authenticated
  using (true);

-- No insert/update/delete policies => only service_role (which bypasses RLS) can write.

create or replace function public.match_tutor_chunks(
  query_embedding vector(768),
  match_count int default 5,
  topic_filter text default null,
  section_filter text default null
)
returns table (
  id uuid,
  source text,
  topic text,
  section_tags text[],
  content text,
  similarity float
)
language sql stable
set search_path = public
as $$
  select
    c.id,
    c.source,
    c.topic,
    c.section_tags,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.tutor_chunks c
  where c.embedding is not null
    and (topic_filter is null or c.topic = topic_filter)
    and (section_filter is null or section_filter = any(c.section_tags))
  order by c.embedding <=> query_embedding
  limit match_count;
$$;
