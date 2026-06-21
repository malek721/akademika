-- ============================================================
-- Migration 001: Initial Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================


-- ── 1. ENUMS ─────────────────────────────────────────────────

create type public.academic_level as enum (
  'lisans',
  'yuksek_lisans',
  'doktora'
);

create type public.plan_type as enum (
  'free',
  'student',
  'researcher'
);

create type public.translation_status as enum (
  'pending',
  'processing',
  'completed',
  'failed'
);


-- ── 2. PROFILES ──────────────────────────────────────────────
-- Extends auth.users with academic profile data.
-- Created automatically via trigger when a user registers.

create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  university      text,
  academic_level  public.academic_level,
  plan            public.plan_type not null default 'free',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.profiles is
  'Academic profile data for each authenticated user.';


-- ── 3. TRANSLATIONS ──────────────────────────────────────────
-- One row per translation request.

create table public.translations (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  source_lang      text not null,
  target_lang      text not null,
  discipline       text not null,
  document_type    text not null,
  source_text      text not null,
  translated_text  text,
  word_count       integer,
  status           public.translation_status not null default 'pending',
  error_message    text,
  created_at       timestamptz not null default now()
);

comment on table public.translations is
  'Each academic translation request and its result.';

-- Index for fast user history queries
create index translations_user_id_created_at_idx
  on public.translations (user_id, created_at desc);


-- ── 4. USAGE ─────────────────────────────────────────────────
-- Monthly word usage per user (for plan limit enforcement).
-- period format: 'YYYY-MM' (e.g. '2026-06')

create table public.usage (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  period      text not null,
  words_used  integer not null default 0,
  updated_at  timestamptz not null default now(),

  unique (user_id, period)
);

comment on table public.usage is
  'Monthly word usage tracking per user for plan limit enforcement.';


-- ── 5. UPDATED_AT TRIGGER ────────────────────────────────────
-- Auto-updates updated_at column on profiles.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger usage_set_updated_at
  before update on public.usage
  for each row execute function public.set_updated_at();
