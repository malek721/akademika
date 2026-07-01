-- ============================================================
-- Migration 005: Lock the profiles.plan column
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================
--
-- SECURITY FIX. The "profiles: update own" RLS policy (migration 002) allows a
-- logged-in user to UPDATE their own profile row but does NOT restrict which
-- columns — so any user could set plan='researcher' from the browser and bypass
-- their word limit / self-escalate their tier.
--
-- RLS cannot express column-level rules (a WITH CHECK can't compare old vs new
-- `plan`). Column privileges are the correct tool: they are enforced BENEATH RLS,
-- so the row policy still applies, but the user simply has no privilege to write
-- `plan`. The service_role (Edge Functions / future billing) bypasses these
-- grants and retains full control of `plan`.

-- 1. Remove the broad table-level UPDATE from the client roles.
REVOKE UPDATE ON public.profiles FROM authenticated, anon;

-- 2. Grant UPDATE back ONLY on the columns users are allowed to edit.
--    `plan`, `id`, `created_at`, `updated_at` are intentionally omitted.
GRANT UPDATE (full_name, university, academic_level) ON public.profiles TO authenticated;

-- anon gets no UPDATE at all (unauthenticated users must never write profiles).
-- service_role is unaffected — it bypasses column grants and still sets `plan`.
