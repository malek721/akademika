# Akademika Çeviri — Project Overview

> A practical reference for understanding and modifying this project without re-reading all the code.
> Last updated: 2026-07.

---

## 1. What This Project Is

**Akademika Çeviri** is a web app for **academic translation between Turkish and English** (both directions). It's aimed at students and researchers translating papers, theses, abstracts, and assignments. Users paste text or upload a `.docx`, pick their **discipline** and **document type**, and get back a publication-grade translation they can copy or download as Word.

**Core value proposition:** unlike Google Translate or raw ChatGPT, it **preserves discipline-specific terminology, protects untranslatable terms (metrics, Latin phrases, acronyms), and keeps citations/numbers/equations intact** — driven by a binding glossary of ~120k academic terms plus a strict translation protocol. The selling line: *"Akademisyen gibi çeviren yapay zekâ"* (AI that translates like an academic).

---

## 2. Tech Stack

| Layer | Tech (version) | Purpose |
|---|---|---|
| Framework | **TanStack Start** `^1.167.50` + **TanStack Router** `^1.168.25` | SSR React framework with file-based routing |
| Language | **TypeScript** `^5.8.3` | Everything except the Edge Function runtime (Deno) and `assemble.py` |
| UI | **React** `^19.2.0` + **Tailwind CSS** `^4.2.1` | Components and styling |
| Build | **Vite** `^8.0.16` + **Nitro** (via `@lovable.dev/vite-tanstack-config` `2.4.0`) | Bundling; Nitro outputs the Vercel SSR function |
| Auth + DB | **Supabase** (`@supabase/supabase-js` `^2.108.1`) | Postgres, Auth (email + Google OAuth), RLS, Edge Functions |
| Server logic | **Supabase Edge Functions** (Deno runtime) | The translation pipeline runs here, not in the frontend |
| AI model | **Google Gemini 2.5 Flash** (REST API) | The translation engine |
| Docs | **mammoth** `^1.12.0` (read .docx), **docx** `^9.7.1` + **file-saver** `^2.0.5` (write .docx) | Upload extraction + download |
| Misc | **motion** `^12.40.0` (animation), **zod** `^3.24.2` (validation) | |
| Hosting | **Vercel** (frontend/SSR) + **Supabase Cloud** (DB/Auth/Functions) | Two separate deploy targets — see §10 |

---

## 3. Architecture Overview

```
                          ┌──────────────── Vercel ────────────────┐
   User (browser)         │  TanStack Start frontend (SSR)         │
        │                 │  src/routes/$lang/_protected/translate │
        │  paste / upload │                                        │
        ▼                 │                                        │
   translate.tsx ─────────┼─► translate-api.ts (translateViaEdgeFunction)
                          └──────────────────┬─────────────────────┘
                                             │  fetch + Bearer JWT
                                             ▼
                  ┌──────────────── Supabase ─────────────────────┐
                  │  Edge Function: functions/translate/index.ts  │
                  │   1. CORS / method gate                       │
                  │   2. Auth: getUser(JWT)  (service-role client)│
                  │   3. Validate body                            │
                  │   4. Word count                               │
                  │   5. Plan + usage limit check ──► 429 if over │
                  │   6. INSERT translations (status=processing)  │
                  │   7. Glossary matching (2 layers) ──► glossary│
                  │   8. buildPrompt() (static prefix + suffix)   │
                  │   9. Gemini 2.5 Flash call ──────► Google API │
                  │  10. UPDATE translations + UPSERT usage       │
                  └──────────────────┬────────────────────────────┘
                                     │  { translated_text, words_remaining }
                                     ▼
                              translate.tsx → show result, copy, download .docx
```

**Why it's structured this way:** all the **trust-sensitive logic lives in the Edge Function, not the frontend** — auth verification, plan/word-limit enforcement, glossary access, the Gemini API key, and translation records. The frontend only holds the anon Supabase key (safe to ship) and a user's own JWT. A user can't bypass word limits or read the Gemini key by tampering with browser code, because the Edge Function re-verifies the JWT with the **service-role** key and does all accounting server-side under RLS-bypassing privileges. The frontend's direct Supabase reads (e.g. the "words remaining" badge) go through **Row Level Security**, so users only ever see their own rows.

---

## 4. The Translation Pipeline (step by step)

All in [`supabase/functions/translate/index.ts`](supabase/functions/translate/index.ts), top to bottom inside `Deno.serve(...)`:

1. **CORS / method handling** — `OPTIONS` → 204 with CORS headers; anything but `POST` → 405.
2. **Auth verification** — requires `Authorization: Bearer <jwt>`. Creates a **service-role** Supabase client (`SUPABASE_SERVICE_ROLE_KEY`) and calls `supabase.auth.getUser(token)`. Invalid → 401.
3. **Input validation** — parses JSON; requires `source_text, source_lang, target_lang, discipline, document_type`. Missing → 400.
4. **Word counting** — `source_text.trim().split(/\s+/)...` → `wordCount`.
5. **Plan / limit checking** — reads `profiles.plan`, maps via `PLAN_LIMITS` (`free` 5k / `student` 50k / `researcher` 500k words/month). Reads `usage.words_used` for the current `YYYY-MM` period. If `used + wordCount > limit` → **429**.
6. **Translation record creation** — `INSERT` into `translations` with `status: "processing"`, returns the row `id`.
7. **Glossary matching** — `matchGlossaryTerms(...)` resolves the glossary direction via `directionFromTurkish(source_lang)` and queries **two DB layers** (see §5):
   - **core glossary** (`field='core'`) — high-frequency academic terms, applied to **every** discipline.
   - **discipline glossary** — the TÜBA field mapped from the user's discipline via `DISCIPLINE_TO_FIELD`.
   Both are fetched (one query each), merged, deduped, matched against the source text with a Turkish-aware Unicode word-boundary regex, and capped at `maxTerms = 150`. (The **never-translate** terms are a separate, code-side layer injected straight into the prompt — see step 8 and §5.)
8. **Prompt building** — `buildPrompt(...)` returns a **byte-identical static prefix + a dynamic per-request suffix** (restructured for prompt caching — see §5):
   - **`STATIC_PREFIX`** (module constant, ~2,596 tokens): the entire AKADEMIKA Master Protocol v1.0 with rule prose *genericized* ("the TARGET language", "the DISCIPLINE") so it never varies — identity, silent ANALYZE/REVIEW pipeline, doctrine, **Section 4 protected elements**, **Section 4B always-protected terms** (`NEVER_TRANSLATE_ALWAYS` = 37 universal + 49 statistics), **Section 4C forced terminology** (`corpus → derlem`, never `bütünce`), language-pair intelligence (TR↔EN, Turkish decimals/diacritics), discipline module, Section 7 glossary rule, integrity/QA, output contract.
   - **Dynamic suffix** (varies per request): REQUEST PARAMETERS (the actual lang/discipline/doc-type values), **DISCIPLINE PROTECTED TERMS** (the discipline's category from `NEVER_TRANSLATE_BY_CATEGORY`, deduped against the always-set), the matched **GLOSSARY** block, and the **SOURCE TEXT**.
9. **Gemini API call** — `callGeminiWithRetry(...)` POSTs to `gemini-2.5-flash:generateContent`. Key config: **`maxOutputTokens: 65536`** and **`thinkingConfig.thinkingBudget: 0`** (thinking disabled — it was eating the old 8192 budget and truncating output). Retries twice on 503/429. Because `STATIC_PREFIX` is byte-identical across requests, Gemini's **implicit prefix cache** discounts it (~90%) on repeat calls within the cache window.
10. **Response handling + usage update** — checks `finishReason` (warns on `MAX_TOKENS`), logs `usageMetadata` token counts including **`cachedContentTokenCount`** (`[translate] tokens — prompt: … cached: … output: … thinking: …`, visible in the Edge logs to confirm the prefix cache is hitting), then `UPDATE translations` (`translated_text`, `status: "completed"`) and **`UPSERT usage`** (`words_used += wordCount`). Returns `{ id, translated_text, word_count, words_remaining }`.

---

## 5. The Glossary System

### Table structure (`public.glossary`)
| Column | Meaning |
|---|---|
| `term_source` | The term in the **source** language for this row's `direction` |
| `term_target` | The term in the **target** language |
| `field` | Category — either `'core'` or a TÜBA discipline name (e.g. `bilişim`, `tip`, `tarım`) |
| `direction` | `'en2tr'` or `'tr2en'` — each term pair is stored once per direction |
| `dictionary` | Provenance tag (e.g. `AKADEMIKA-CORE`, TÜBA source) |

**Direction semantics** (set by [`scripts/import-glossary.ts`](scripts/import-glossary.ts)): for `direction='en2tr'`, `term_source` is English; for `'tr2en'`, `term_source` is Turkish. `matchGlossaryTerms` matches `term_source` against the source text, so the query always filters `.eq("direction", ...)`.

### `DISCIPLINE_TO_FIELD` mapping (in `index.ts`)
The UI offers **26 disciplines** (`DISCIPLINES` in [`translate.tsx`](src/routes/$lang/_protected/translate.tsx)) authored independently of the **38 TÜBA `field` categories** in the glossary, so the names don't line up. `DISCIPLINE_TO_FIELD` bridges them, in five comment-labeled groups:
- **exact** — own TÜBA field (`biyoloji`, `fizik`, `hukuk`, `kimya`, `matematik`, `mühendislik`, `psikoloji`, `siyaset`, `iktisat`, `çevre`)
- **diacritic-only fix** — DB imported without Turkish chars (`eğitim→egitim`, `tıp→tip`)
- **taxonomy rename** — UI name ≠ TÜBA name (`bilgisayar→bilişim`, `ziraat→tarım`)
- **approximate** — no dedicated field, closest domain used (`eczacılık`/`hemşirelik→tip`, `veterinerlik→tarım`, `işletme→mühendislik`, `iletişim`/`sosyoloji→genel`, `mimarlık→i̇nşaat`)
- **null** — no glossary coverage; discipline query skipped, `core` still applies (`arkeoloji`, `coğrafya`, `dilbilim`, `felsefe`, `tarih`)

Without this map, ~16 of 26 disciplines returned **zero** glossary terms.

### The layers

**A. Never-translate (code-side, injected into the prompt — NOT the DB).** The 442-term list in `index.ts` is split by category (generated from `never_translate_MASTER.csv`, union verified === master):

| Set | Const | Where in prompt | Count |
|---|---|---|---|
| **always** | `NEVER_TRANSLATE_ALWAYS` = `NEVER_TRANSLATE_UNIVERSAL` (37) + statistics (49) | **static prefix** (cached) | **86** |
| **discipline-specific** | `NEVER_TRANSLATE_BY_CATEGORY[cat]` selected via `DISCIPLINE_TO_NT_CATEGORY` | dynamic suffix (deduped vs always) | 0–125 per discipline |

`DISCIPLINE_TO_NT_CATEGORY` maps each UI discipline → one NT category (`biology`/`chemistry`/`computer_ai`/`economics`/`engineering`/`law`/`medicine`/`psychology`) or `null`. `null` disciplines (arkeoloji, coğrafya, dilbilim, eğitim, felsefe, iletişim, sosyoloji, tarih, **matematik**) get only the always-set. Statistics is in the always-set because statistical notation (`p`, `ANOVA`, `CI`, `SD`) recurs across nearly all empirical disciplines. The master `NEVER_TRANSLATE_TERMS` (442) is kept for reference (it equals the union of always + all categories) but is no longer read by the prompt.

**B. Glossary (DB-driven, matched per text).**

| Layer | Where | Scope | Count |
|---|---|---|---|
| **core academic** | `glossary` table, `field='core'` | high-frequency academic words, ALL disciplines (`study→çalışma`, `however→ancak`) | **430 rows** = 215 pairs × 2 directions (214 core + the forced `corpus↔derlem` pair) |
| **discipline-specific** | `glossary` table, `field=<TÜBA category>` | the mapped discipline only | bulk of the table |

### Prompt-caching design (static prefix)
`buildPrompt` = **`STATIC_PREFIX`** (constant ~2,596 tokens: genericized rules + the always never-translate set) **+ a dynamic suffix** (request params, discipline NT terms, matched glossary, source text). Because the prefix is byte-identical on every request, Gemini's **implicit prefix cache** discounts it ~90% on repeats — verified: prefix identical across `bilgisayar`/`tıp`/`tarih`, with `cachedContentTokenCount` logged per request (step 10) to confirm hits. The per-request never-translate payload dropped from **1,181 tokens** (the whole list, sent every request) to **0–350** (the discipline's category only; `0` for universal-only disciplines, since their terms are all in the cached prefix).

### Term counts by source (`dictionary` column — live, verified 2026-07)
| Source (`dictionary`) | Rows | Notes |
|---|---|---|
| `Mühendislik` (TÜBA) | 104,339 | largest discipline import |
| `Doğa Bilimleri` (TÜBA) | 11,054 | natural-sciences import |
| `AKADEMIKA` | 2,639 | machine-generated discipline terms |
| `AB Sözlüğü` | 2,262 | EU-terminology import |
| `AKADEMIKA-CORE` | 430 | core academic (Layer 2): 215 pairs × 2 directions |
| **Total glossary rows** | **120,724** | |
| `NEVER_TRANSLATE_TERMS` | 443 | code constant (Layer 1) — **not** in the DB |

> `dictionary` is the **provenance/source** of a row; `field` is its **discipline category**. They're orthogonal — e.g. a row can be `field='bilişim', dictionary='Mühendislik'`. The TÜBA data (`Mühendislik` + `Doğa Bilimleri` = 115,393 rows) is spread across the 38 `field` categories.

---

## 6. The AKADEMIKA Modular Framework (DORMANT)

There is a **second, more sophisticated prompt system that is NOT used in production**:

- **[`AKADEMIKA/`](AKADEMIKA/)** — a modular "specification engine": a rules-only `core.md` plus swappable modules (`language/`, `discipline/`, `project/`, `glossary/`, `examples/`), a `config.yaml`, and a Python compiler `assemble.py`. Precedence: PROJECT > DISCIPLINE > LANGUAGE > CORE.
- **[`scripts/precompile-prompts.ts`](scripts/precompile-prompts.ts)** — a build step (npm `prebuild` hook) that compiles every `direction × discipline × project` combination into **`src/lib/compiled-prompts.generated.ts`** (git-ignored, regenerated each build).
- **[`src/lib/assemble-prompt.server.ts`](src/lib/assemble-prompt.server.ts)** — runtime lookup into that compiled map (no filesystem reads, so it works in serverless).
- **[`src/lib/translate.server.ts`](src/lib/translate.server.ts)** + **[`src/lib/api/translate.functions.ts`](src/lib/api/translate.functions.ts)** — a TanStack `createServerFn` path that calls Gemini with the assembled AKADEMIKA prompt.
- **[`src/components/translation-form.tsx`](src/components/translation-form.tsx)** — a test-harness UI for that path. Marked `// DORMANT` at the top.

**Why it's dormant:** production uses the **inline `buildPrompt()` in the Edge Function** instead. The modular path was built and verified but never wired into the production UI — it has **no auth, no word limits, no translation records, and uses a static precompiled glossary** rather than the live DB glossary. The whole chain (`translation-form → translate.functions → translate.server → assemble-prompt → compiled-prompts.generated`) is a self-contained island; nothing in the active route tree imports it.

**To reactivate:** render `<TranslationForm />` in any route (it was removed from `translate.tsx`). The `prebuild` hook still regenerates the compiled map every build, so it's deploy-ready. To make it production-grade you'd need to fold in the Edge Function's auth/limits/records/DB-glossary — see §9.

---

## 7. Key Files Reference Table

### `supabase/functions/`
| File | Purpose |
|---|---|
| `translate/index.ts` | **The production translation pipeline.** Auth, limits, glossary matching, `buildPrompt` (AKADEMIKA inline protocol), Gemini call, records. Contains `NEVER_TRANSLATE_TERMS`, `DISCIPLINE_TO_FIELD`, `matchGlossaryTerms`, `directionFromTurkish`, `callGeminiWithRetry`, `buildPrompt`. |

### `src/routes/` (file-based routing)
| File | Purpose |
|---|---|
| `__root.tsx` | Root shell, global `<head>` meta (SEO/OG/Twitter), error/404 boundaries |
| `index.tsx`, `login.tsx`, `register.tsx` | Redirect stubs (`/` → `/tr`, etc.) |
| `$lang.tsx` | Validates `:lang` ∈ {tr,en}, else redirects to `/tr` |
| `$lang/index.tsx` | **Landing page** (Nav, Hero, Pricing, FAQ, …) + per-page SEO `head()` with language-aware canonical + hreflang |
| `$lang/login.tsx`, `$lang/register.tsx` | Lazy-load the auth pages; carry `noindex` |
| `$lang/_protected.tsx` | Auth guard — redirects to login if not signed in |
| `$lang/_protected/translate.tsx` | **The main translator UI** (~560 lines): form, direction swap, upload, translate, result, copy, download, `noindex` |

### `src/lib/`
| File | Purpose |
|---|---|
| `supabase.ts` | Browser Supabase client (anon key, localStorage session) |
| `auth.ts` | `signInWithEmail/Google`, `signUpWithEmail`, `signOut` |
| `translate-api.ts` | `translateViaEdgeFunction()` — calls the Edge Function with the user's JWT |
| `constants.ts` | `PLAN_LIMITS` (duplicated in the Edge Function — Deno can't import from `src/`) |
| `database.types.ts` | Hand-authored Supabase schema types |
| `docx-utils.ts` | `extractTextFromDocx`, `buildTranslatedDocx` (RTL-aware) |
| `text-utils.ts` | `countWords` (shared helper) |
| `user-utils.ts` | `displayName(user)` (shared helper) |
| `assemble-prompt.server.ts`, `translate.server.ts`, `api/translate.functions.ts` | **Dormant** AKADEMIKA path (see §6) |
| `compiled-prompts.generated.ts` | Generated, git-ignored AKADEMIKA prompt map |
| `error-capture.ts`, `error-page.ts`, `lovable-error-reporting.ts` | SSR error handling infra |
| `utils.ts` | `cn()` Tailwind class merge |

### `src/` other
| File | Purpose |
|---|---|
| `hooks/use-docx-upload.ts` | Drag/drop + .docx extraction state & handlers |
| `hooks/use-word-balance.ts` | Fetches remaining word balance from `profiles`/`usage` |
| `contexts/auth-context.tsx` | `AuthProvider` / `useAuth()` (session, user, loading) |
| `i18n/{index,tr,en}.ts` | Translation strings for the landing page |
| `components/logo.tsx`, `lang-toggle.tsx` | Brand mark, language switcher |
| `components/ui/{spinner,google-icon}.tsx` | The only two surviving shadcn components (rest were removed as dead code) |
| `pages/login.tsx`, `pages/register.tsx` | Auth page components (lazy-loaded by routes) |
| `server.ts`, `start.ts`, `router.tsx`, `routeTree.gen.ts` | TanStack Start/Router wiring |

### `scripts/`
| File | Purpose |
|---|---|
| `import-glossary.ts` | One-off importer: reads `data/*.xlsx` → inserts into `glossary` (defines direction semantics) |
| `precompile-prompts.ts` | Build hook: compiles `AKADEMIKA/` → `compiled-prompts.generated.ts` |

---

## 8. Database Schema Summary

Migrations in [`supabase/migrations/`](supabase/migrations/). RLS enabled on all user tables (users see/modify only their own rows; the Edge Function uses the service role to bypass it).

| Table | Key columns | Purpose |
|---|---|---|
| **profiles** | `id` (=auth user id), `full_name`, `plan` (`free`/`student`/`researcher`), `university`, `academic_level` | One row per user; `plan` drives word limits. Auto-created by an auth trigger. |
| **usage** | `user_id`, `period` (`YYYY-MM`), `words_used` | Monthly word consumption; upserted after each translation (`onConflict: user_id,period`). |
| **translations** | `id`, `user_id`, `source_lang`, `target_lang`, `discipline`, `document_type`, `source_text`, `translated_text`, `word_count`, `status` (`processing`/`completed`/`failed`), `error_message` | One row per translation request, written by the Edge Function. |
| **glossary** | `term_source`, `term_target`, `field`, `direction`, `dictionary` | The terminology DB (~120k+ rows). Publicly readable (RLS `using(true)`); only service role writes. |

---

## 9. Known Limitations / Future Work

- **5 disciplines have no glossary coverage** (`arkeoloji`, `coğrafya`, `dilbilim`, `felsefe`, `tarih` → `null` in `DISCIPLINE_TO_FIELD`). They get `core` terms only. Fix = add proper TÜBA fields for them.
- **Approximate discipline mappings** — `eczacılık`/`hemşirelik→tip`, `işletme→mühendislik`, `iletişim`/`sosyoloji→genel`, `mimarlık→i̇nşaat`, `veterinerlik→tarım` inject *related*, not exact-domain, terminology. Proper fix = dedicated glossary fields.
- **TOCTOU race in usage limits** — step 5 reads `words_used` then step 10 writes it (read-then-write). Two concurrent requests can both pass the check and double-spend. Fix = an atomic DB function/RPC.
- **✅ RLS privilege-escalation hole (FIXED — migration 005)** — the `profiles` update policy (`auth.uid() = id`) had no column restriction, so a logged-in user could **set their own `plan` to `researcher`** from the browser and bypass word limits. Fixed by [`005_lock_plan_column.sql`](supabase/migrations/005_lock_plan_column.sql): `REVOKE UPDATE ON profiles FROM authenticated, anon` + `GRANT UPDATE (full_name, university, academic_level) TO authenticated`, so `plan` is writable only by the service role. Verified live — an authenticated user's `plan` write is rejected (`permission denied for table profiles`) while `full_name` still updates. (Migration history was also repaired: 001-004 had been applied manually via the SQL Editor and weren't recorded; `supabase migration repair` synced them.)
- **Glossary `maxTerms = 150` cap** — only the first 150 matched terms (longest-first) reach the prompt; very term-dense texts may exceed it.
- **Two prompt systems** — production uses the inline `buildPrompt`; the modular AKADEMIKA framework (§6) is dormant and would need auth/limits/records folded in to go live.
- **`PLAN_LIMITS` duplicated** across `src/lib/constants.ts` and `index.ts` (Deno can't import from `src/`) — keep them in sync manually.
- **`og-image.png`** exists (~2.2 MB) — could be optimized to <500 KB.
- **Soft 1500-word UI warning** (`WORD_SOFT_LIMIT`) is informational only; it doesn't block (and the truncation bug that motivated it is now fixed via `thinkingBudget: 0` + 65536 tokens).

---

## 10. How to Make Common Changes

### Add a new discipline
1. Add it to `DISCIPLINES` in [`src/routes/$lang/_protected/translate.tsx`](src/routes/$lang/_protected/translate.tsx) (`{ value, tr, en }`).
2. Add a mapping in `DISCIPLINE_TO_FIELD` in [`index.ts`](supabase/functions/translate/index.ts) → an existing TÜBA `field`, or `null` if none.
3. Redeploy the Edge Function (below). No glossary rows needed unless you also have terms for it.

### Add / change glossary terms
Insert into the **`glossary`** table. Required fields: `term_source`, `term_target`, `field` (`'core'` for all-discipline, or a TÜBA category), `direction` (`'en2tr'` **and** `'tr2en'` — add both rows for a pair), `dictionary` (a provenance tag). For a forced override that the model resists, **also** add a rule to `buildPrompt`'s Section 4C and redeploy (see the `corpus → derlem` precedent). Bulk import: [`scripts/import-glossary.ts`](scripts/import-glossary.ts).

### Change the Gemini model or token limits
Edit `callGeminiWithRetry` in [`index.ts`](supabase/functions/translate/index.ts): the model is in the fetch URL (`gemini-2.5-flash`), and `generationConfig` holds `maxOutputTokens` (65536) and `thinkingConfig.thinkingBudget` (0 = thinking off). Redeploy the Edge Function.

### Deploy changes — **two separate targets**
- **Frontend (anything in `src/`):** commit and `git push origin main`. **Vercel auto-deploys** from `main` (runs `npm run build`, which fires the `prebuild` hook to regenerate the AKADEMIKA prompt map). No CLI needed.
- **Edge Function (`supabase/functions/translate/index.ts`):** **does NOT deploy via git/Vercel.** Run:
  ```
  npx supabase functions deploy translate --no-verify-jwt
  ```
  (Then commit + push the source too, just to keep the repo in sync — but the deploy is the CLI command, not the push.)
- **DB / glossary changes:** Supabase Dashboard → SQL Editor, or a one-off script using `SUPABASE_SERVICE_ROLE_KEY` (in `.env`). Verify the Edge logs (`Dashboard → Edge Functions → translate → Logs`) show `fields=[core, <discipline>]` and the token counts.

---

*End of overview. Keep this file updated when the architecture changes — especially §9 (limitations) and §5 (glossary counts).*
