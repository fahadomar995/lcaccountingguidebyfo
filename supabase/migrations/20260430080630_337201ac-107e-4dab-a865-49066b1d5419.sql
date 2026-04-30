create or replace function public.streak_ping(_user_id uuid)
returns public.user_streaks
language plpgsql
security invoker
set search_path = public
as $$
declare
  row public.user_streaks;
  today date := current_date;
  gap integer;
begin
  -- Defence in depth: also verify caller matches; RLS already enforces this.
  if _user_id is null or _user_id <> auth.uid() then
    raise exception 'not authorised';
  end if;

  select * into row from public.user_streaks where user_id = _user_id;
  if not found then
    insert into public.user_streaks (user_id, current_streak, longest_streak, last_active_date)
    values (_user_id, 1, 1, today)
    returning * into row;
    return row;
  end if;

  if row.last_active_date = today then
    return row;
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