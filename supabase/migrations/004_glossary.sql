-- ============================================================
-- Migration 004: Academic Glossary (TÜBA)
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Trigram extension (needed for GIN text index on term_source)
create extension if not exists pg_trgm;


-- ── Table ────────────────────────────────────────────────────

create table public.glossary (
  id           bigint primary key generated always as identity,
  term_source  text not null,
  term_target  text not null,
  field        text not null default '',
  direction    text not null check (direction in ('tr2en', 'en2tr')),
  dictionary   text not null default ''
);

comment on table public.glossary is
  'TÜBA academic bilingual glossary. direction: tr2en or en2tr.';


-- ── Indexes ──────────────────────────────────────────────────

-- Primary filter in every Edge Function query
create index glossary_direction_field_idx
  on public.glossary (direction, field);

-- Trigram index for word-boundary / ILIKE search on term_source
create index glossary_term_source_trgm_idx
  on public.glossary using gin (term_source gin_trgm_ops);

-- Exact btree lookup (useful for dedup checks)
create index glossary_term_source_btree_idx
  on public.glossary (term_source);


-- ── Row Level Security ───────────────────────────────────────

alter table public.glossary enable row level security;

-- Glossary is not secret: anyone (including anonymous visitors) may read it.
create policy "glossary_read_all"
  on public.glossary
  for select
  using (true);

-- Only service_role (Edge Functions) may write.
-- No insert/update/delete policy → clients cannot modify the glossary.
