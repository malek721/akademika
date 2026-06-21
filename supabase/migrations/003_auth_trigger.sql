-- ============================================================
-- Migration 003: Auto-create profile on user registration
-- Run AFTER migrations 001 and 002.
-- ============================================================

-- This trigger fires after a new user is inserted into auth.users.
-- It creates a matching row in public.profiles automatically,
-- so the app never has a user without a profile.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer                  -- runs with DB owner privileges
set search_path = public          -- prevents search_path injection
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    -- Google OAuth stores name in raw_user_meta_data->>'full_name'
    -- Email signup stores it if passed in options.data
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      ''
    )
  );
  return new;
end;
$$;

-- Drop existing trigger if re-running this migration
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
