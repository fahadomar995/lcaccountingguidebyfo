
create or replace function public.match_tutor_chunks(
  query_embedding extensions.vector,
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
set search_path = public, extensions
as $$
  select
    c.id,
    c.source,
    c.topic,
    c.section_tags,
    c.content,
    1 - (c.embedding operator(extensions.<=>) query_embedding) as similarity
  from public.tutor_chunks c
  where c.embedding is not null
    and (topic_filter is null or c.topic = topic_filter)
    and (section_filter is null or section_filter = any(c.section_tags))
  order by c.embedding operator(extensions.<=>) query_embedding
  limit match_count;
$$;

grant execute on function public.match_tutor_chunks(extensions.vector, int, text, text) to anon, authenticated, service_role;
