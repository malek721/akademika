# PROJECT MODULE
type: project
name: MSc Thesis / Q1 Journal (NLP, EN→TR)
targets_core: 1.0
# Plugs into Tier 4 (glossary + binding term choices) and overrides CONFIG params.

config_overrides:
  citation_style: verbatim          # do not reformat citations
  reference_title_policy: keep       # keep reference titles in original language
  intext_citation_locale: localize   # "et al." → "vd."
  tn_mode: off
  target_variant: TR-TDK

glossary: glossary/ai_tr.tsv          # binding terminology for THIS project (Tier 4)

preferred_terms:                       # project-level binding choices (override module defaults)
  retrieval → Geri Getirim             # this project prefers "Geri Getirim" over "Bilgi Erişimi"
  hallucination → halüsinasyon

forbidden_terms:                       # never use these renderings
  retrieval ↛ geri çağırma             # reserved sense; avoid
  embedding ↛ gömme                    # keep "embedding" per project decision

venue_requirements:
  • Thesis (YÖK): sentence-case headings; figures/tables captioned in Turkish.
  • Reference list unchanged (keep policy); in-text uses "vd." per Turkish venue.
  • Abstract must mirror source structure exactly; no added sections (CORE §4.3).
  • Statistical reporting: localized numbers (CORE §7); metric names English (NLP module).
