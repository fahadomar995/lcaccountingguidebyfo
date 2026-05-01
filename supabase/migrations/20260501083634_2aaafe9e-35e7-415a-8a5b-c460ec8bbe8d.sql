
create schema if not exists extensions;
alter extension vector set schema extensions;

revoke all on function public.match_tutor_chunks(extensions.vector, int, text, text) from public;
grant execute on function public.match_tutor_chunks(extensions.vector, int, text, text) to anon, authenticated;
