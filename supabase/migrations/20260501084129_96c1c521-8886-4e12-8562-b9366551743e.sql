
grant usage on schema extensions to anon, authenticated, service_role, postgres;
grant execute on all functions in schema extensions to anon, authenticated, service_role, postgres;

-- Ensure the vector type is resolvable as `public.vector` for PostgREST clients
-- by also creating a domain alias in public (zero-cost passthrough).
do $$
begin
  if not exists (select 1 from pg_type where typname = 'vector' and typnamespace = 'public'::regnamespace) then
    execute 'create domain public.vector as extensions.vector';
  end if;
end $$;
