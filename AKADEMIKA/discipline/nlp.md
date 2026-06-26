# DISCIPLINE MODULE
type: discipline
name: NLP / Machine Learning
targets_core: 1.0
# DATA ONLY. No translation rules (those live in CORE). Plugs into Tier 5.

never_translate:        # evaluation metrics — keep English in any target
  Recall, Recall@K, Precision, Precision@K, F1, MRR, NDCG, MAP, AUC, ROC, BLEU,
  ROUGE, METEOR, accuracy, baseline, benchmark, loss, perplexity, throughput,
  latency
  # NEVER "Geri çağırma" — always "Recall".
  # EXCEPTION: "accuracy" as a percentage RESULT is not the metric name →
  #   ✓ "%98,1 doğruluk oranıyla"   ✗ "%98,1 accuracy oranıyla".
  #   As a bare metric/column name, keep "accuracy".

retained_terms:         # loanwords/acronyms kept as-is (not translated)
  RAG, LLM, NLP, NLU, NER, API, GPU, CPU, RAM, SQuAD, BERT, GPT, BGE-M3,
  transformer, embedding, token, chunk, fine-tuning, prompt, pipeline, encoder,
  decoder, attention
  # Non-acronym loanwords (embedding, token, chunk) are kept as-is, NOT expanded —
  # unless the GLOSSARY binds a target rendering (Tier 4 overrides).

acronym_expansions:     # first-use only, per CORE §10.4 (target = Turkish shown)
  RAG → Geri Getirim Destekli Üretim
  LLM → Büyük Dil Modeli
  NLP → Doğal Dil İşleme
  NER → Adlandırılmış Varlık Tanıma
  # Established international acronyms with no useful expansion (API, GPU, CPU,
  # RAM, GPT, BERT) stay bare on first use.

register_notes:
  • Methods/results sections favor concise, procedural phrasing.
  • Report metric values with localized number formatting (CORE §7) but the metric
    NAME stays English.
  • Model/dataset names are proper nouns (verbatim, CORE §5).
