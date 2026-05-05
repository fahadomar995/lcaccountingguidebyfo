create table public.user_progress (
  user_id uuid not null,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.user_progress enable row level security;

create policy "up_select_own" on public.user_progress for select using (auth.uid() = user_id);
create policy "up_insert_own" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "up_update_own" on public.user_progress for update using (auth.uid() = user_id);
create policy "up_delete_own" on public.user_progress for delete using (auth.uid() = user_id);

create trigger user_progress_touch
before update on public.user_progress
for each row execute function public.touch_updated_at();