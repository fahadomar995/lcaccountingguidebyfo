-- Topic preferences (per-user, per-chapter bias)
create table if not exists public.user_topic_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  topic_id text not null,                       -- e.g. "ch-10" (chapter id)
  priority text not null default 'normal'       -- 'high' | 'normal' | 'low' | 'excluded'
    check (priority in ('high','normal','low','excluded')),
  priority_weight numeric not null default 1.0, -- numeric for engine scoring
  is_excluded boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, topic_id)
);

alter table public.user_topic_preferences enable row level security;

create policy "utp_select_own" on public.user_topic_preferences for select using (auth.uid() = user_id);
create policy "utp_insert_own" on public.user_topic_preferences for insert with check (auth.uid() = user_id);
create policy "utp_update_own" on public.user_topic_preferences for update using (auth.uid() = user_id);
create policy "utp_delete_own" on public.user_topic_preferences for delete using (auth.uid() = user_id);

create index if not exists user_topic_preferences_user_idx on public.user_topic_preferences(user_id);

create trigger trg_utp_touch
before update on public.user_topic_preferences
for each row execute function public.touch_updated_at();

-- Streaks (one row per user)
create table if not exists public.user_streaks (
  user_id uuid primary key,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_active_date date,
  updated_at timestamptz not null default now()
);

alter table public.user_streaks enable row level security;

create policy "streaks_select_own" on public.user_streaks for select using (auth.uid() = user_id);
create policy "streaks_insert_own" on public.user_streaks for insert with check (auth.uid() = user_id);
create policy "streaks_update_own" on public.user_streaks for update using (auth.uid() = user_id);

create trigger trg_streaks_touch
before update on public.user_streaks
for each row execute function public.touch_updated_at();

-- Atomic streak ping: bumps streak based on the gap from last_active_date
create or replace function public.streak_ping(_user_id uuid)
returns public.user_streaks
language plpgsql
security definer
set search_path = public
as $$
declare
  row public.user_streaks;
  today date := current_date;
  gap integer;
begin
  select * into row from public.user_streaks where user_id = _user_id;
  if not found then
    insert into public.user_streaks (user_id, current_streak, longest_streak, last_active_date)
    values (_user_id, 1, 1, today)
    returning * into row;
    return row;
  end if;

  if row.last_active_date = today then
    return row; -- already counted today
  end if;

  gap := today - row.last_active_date;
  if gap = 1 then
    row.current_streak := row.current_streak + 1;
  else
    row.current_streak := 1;
  end if;
  if row.current_streak > row.longest_streak then
    row.longest_streak := row.current_streak;
  end if;
  row.last_active_date := today;

  update public.user_streaks
     set current_streak = row.current_streak,
         longest_streak = row.longest_streak,
         last_active_date = row.last_active_date
   where user_id = _user_id
   returning * into row;

  return row;
end;
$$;

revoke all on function public.streak_ping(uuid) from public;
grant execute on function public.streak_ping(uuid) to authenticated;