-- ============================================================
-- Migration 002: Row Level Security
-- Run AFTER migration 001.
-- ============================================================


-- ── 1. ENABLE RLS ON ALL TABLES ──────────────────────────────

alter table public.profiles     enable row level security;
alter table public.translations enable row level security;
alter table public.usage        enable row level security;


-- ── 2. PROFILES POLICIES ─────────────────────────────────────

-- Users can read their own profile only
create policy "profiles: select own"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Users can update their own profile only
create policy "profiles: update own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Insert is handled by trigger only — no direct client insert allowed


-- ── 3. TRANSLATIONS POLICIES ─────────────────────────────────

-- Users can read their own translations only
create policy "translations: select own"
  on public.translations
  for select
  using (auth.uid() = user_id);

-- Users can insert translations only for themselves
create policy "translations: insert own"
  on public.translations
  for insert
  with check (auth.uid() = user_id);

-- No client-side update or delete — Edge Functions handle status updates


-- ── 4. USAGE POLICIES ────────────────────────────────────────

-- Users can read their own usage only
create policy "usage: select own"
  on public.usage
  for select
  using (auth.uid() = user_id);

-- No client-side insert or update — Edge Functions handle usage tracking
