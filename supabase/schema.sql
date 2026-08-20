-- Habitus — initial schema
-- Run this in the Supabase SQL editor (or via the CLI) against a fresh project.
-- Assumes Supabase Auth is enabled (auth.users already exists) and pgcrypto's
-- gen_random_uuid() is available, which is the default on new Supabase projects.

-- =========================================================================
-- profiles — one row per user, created automatically on signup.
-- Matches the Profile screen (app/(app)/profile/page.tsx): display name +
-- avatar for now; add columns here as that screen grows.
-- =========================================================================

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'New User',
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', 'New User')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- habits — the habit definitions. Matches lib/habits-context.tsx's Habit
-- type and components/habit-form.tsx's fields (title/note/icon/color/days).
-- icon_id / color_id are the fixed option ids from icon-picker.tsx /
-- color-picker.tsx, constrained with a check rather than a Postgres enum so
-- adding a new icon or color option later is a one-line ALTER, not a
-- migration of an enum type.
-- =========================================================================

create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  note text not null default '',
  icon_id text not null check (
    icon_id in ('dumbbell', 'droplet', 'flower', 'book', 'cookie', 'moon', 'sun', 'target')
  ),
  color_id text not null check (
    color_id in ('accent-from', 'accent-via', 'accent-to', 'success', 'streak')
  ),
  -- 0 = Sunday .. 6 = Saturday, matching components/day-selector.tsx
  days smallint[] not null default '{0,1,2,3,4,5,6}',
  created_at timestamptz not null default now()
);

create index habits_user_id_idx on public.habits (user_id);

alter table public.habits enable row level security;

create policy "Users can view their own habits"
  on public.habits for select
  using (auth.uid() = user_id);

create policy "Users can insert their own habits"
  on public.habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own habits"
  on public.habits for update
  using (auth.uid() = user_id);

create policy "Users can delete their own habits"
  on public.habits for delete
  using (auth.uid() = user_id);

-- =========================================================================
-- habit_completions — one row per habit per day it was completed.
--
-- Design choice: a row's EXISTENCE means "done" — there is no `completed`
-- boolean column. Marking a habit done = insert a row; un-marking it =
-- delete the row. This differs from the current in-memory dummy data
-- (lib/dummy-history.ts), which stores an explicit true/false for every
-- habit on every day — that shape was convenient for generating demo data,
-- but a real log table only needs to record when something *did* happen.
-- "Not completed" is just the absence of a row, which is both simpler and
-- far cheaper than writing a row for every habit on every day regardless.
-- =========================================================================

create table public.habit_completions (
  id uuid primary key default gen_random_uuid(),
  habit_id uuid not null references public.habits (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  completed_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique (habit_id, completed_on)
);

create index habit_completions_user_date_idx
  on public.habit_completions (user_id, completed_on);

alter table public.habit_completions enable row level security;

create policy "Users can view their own completions"
  on public.habit_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own completions"
  on public.habit_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own completions"
  on public.habit_completions for delete
  using (auth.uid() = user_id);
