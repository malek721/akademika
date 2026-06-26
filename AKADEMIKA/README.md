# AKADEMIKA — Academic Translation Framework

A modular "specification engine" for academic translation with LLMs. Instead of
one giant prompt, a small stable **CORE** (rules only) is combined with
**swappable modules** (language, discipline, project, glossary, examples). A tiny
assembler builds a **compiled prompt** from only the modules you need — so a
Turkish-NLP-thesis job never loads medical or legal rules.

```
AKADEMIKA/
├── core.md                 # RULES ONLY — universal; rarely changes
├── config.yaml             # single source of truth; drives the assembler
├── assemble.py             # zero-dependency compiler (CORE + modules → prompt)
├── language/
│   ├── en_tr.md            # English → Turkish rules, hedging map, locale data
│   └── tr_en.md            # Turkish → English (pro-drop, de-calquing, gender)
├── discipline/
│   ├── nlp.md              # DATA only: metrics, retained terms, acronyms
│   └── medicine.md         # template/stub showing swappability
├── project/
│   └── thesis_q1.md        # venue/university rules + binding term choices
├── glossary/
│   └── ai_tr.tsv           # standalone bilingual glossary (edit freely)
├── examples/
│   ├── en_tr.md            # few-shot — compiled in only for EN→TR
│   └── tr_en.md            # few-shot — compiled in only for TR→EN
├── tests/
│   └── numbers_en_tr.tsv   # golden tests (input → expected) for regression
└── source.txt              # paste the text to translate here
```

## How to use

1. **Set the job** in `config.yaml` (source, target, discipline, document_type,
   and which modules to load).
2. **Put your text** in `source.txt`.
3. **Compile**:
   ```
   python3 assemble.py config.yaml
   ```
   → writes `compiled_prompt.md`.
4. **Run it**: send `compiled_prompt.md` as the system/user prompt to your model.
   - *API path*: feed the compiled file directly.
   - *Chat-paste path*: open `compiled_prompt.md` and paste it. (You can skip the
     script entirely and concatenate by hand in this order: CORE → LANGUAGE →
     DISCIPLINE → PROJECT → GLOSSARY → EXAMPLES → SOURCE.)

Switching direction = change two lines in `config.yaml`
(`language: language/tr_en.md`, `examples: examples/tr_en.md`). Switching field =
swap the `discipline:` line. Nothing in CORE is touched.

## The rule that keeps modules conflict-free

CORE §2 owns ALL precedence. Modules plug into fixed tiers and never collide:

```
PROJECT (incl. GLOSSARY)  >  DISCIPLINE  >  LANGUAGE  >  CORE defaults
No module may override Tiers 1–3 (integrity, fidelity, protected elements/markup).
```

So a project glossary entry beats a discipline default, which beats a language
convention — deterministically.

## Adding a module (the interface)

Every module starts with `type:` and `targets_core:` (must equal `core_version`
in `core.md`). Required fields per type:

- **language**: directional rules, `hedging_map` (source→target equal-force pairs),
  `locale_data` (variant, capitalization, punctuation, suffix/apostrophe rules),
  `gender`.
- **discipline** (DATA only — no rules): `never_translate`, `retained_terms`,
  `acronym_expansions`, `register_notes`.
- **project**: `glossary` reference, `preferred_terms`, `forbidden_terms`,
  `venue_requirements`, `config_overrides`.

Copy `discipline/medicine.md` as a template for a new field, or `language/tr_en.md`
for a new pair.

## Evaluating changes (why modularity pays off)

Each behavior you care about gets a small **golden test** file under `tests/`
(input → expected output), e.g. `numbers_en_tr.tsv`. After editing any module,
run the compiled prompt on those inputs and diff against the expected column.
This turns "I hope this is better" into a measurable regression check — change a
module in isolation, test it in isolation.

## Versioning

`core_version` is the contract. Modules pin `targets_core:`. If you bump CORE in a
breaking way, raise `core_version` and update modules' pins; the assembler/model
flags a mismatch so nothing breaks silently.
