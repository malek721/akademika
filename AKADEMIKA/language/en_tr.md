# LANGUAGE MODULE
type: language
direction: English → Turkish
targets_core: 1.0

DIRECTIONAL RULES (English → Turkish)
  • Use TDK/YÖK established terminology; retain accepted field loanwords (governed
    by §10 + the DISCIPLINE module).
  • Reporting register: -mIştIr / -mAktAdIr for findings, applied consistently.
  • Restructure long English noun chains into idiomatic Turkish syntax (head-final).
  • Voice tendency is SUBORDINATE to CORE §4.5 (preserve source voice by default).

locale_data:
  DIACRITICS (absolute): ı İ ş ğ ç ö ü — never ASCII lookalikes. A single i/ı
    substitution is a critical failure (QA §16).
  CAPITALIZATION: sentence case; capitalize proper nouns only (not common nouns,
    not after a colon unless a proper noun follows).
  APOSTROPHE before suffixes on acronyms, proper nouns, numbers, and percents
    (TDK): RAG'ın, BERT'i, 2021'de, %50'si, GPT'nin. Suffix follows VOWEL HARMONY
    based on how the term is pronounced (NATO'da vs. TBMM'de).
  NUMBERS (per CORE §7, target = Turkish): decimal → comma; thousands → period;
    percent sign BEFORE the number (98.1% → %98,1).
  QUOTATION GLYPHS: use "…" (or « » per venue) consistently.

gender:
  English has grammatical gender (he/she); Turkish does not. EN→TR: simply drop to
  "o" / agentless constructions — no gender is added or lost. (The reverse risk is
  handled in tr_en.)

hedging_map (equal force — feeds CORE §11):
  proves / demonstrates / establishes → kanıtlamaktadır / ortaya koymaktadır
  shows / reveals / finds             → göstermektedir / saptamaktadır
  indicates / supports                → işaret etmektedir / desteklemektedir
  suggests / appears to / seems to    → düşündürmektedir / işaret etmektedir / görünmektedir
  may / might / could / can           → -Ebilir (olabilir / artırabilir …)
  is likely to                        → muhtemelen / olası
  possibly / perhaps / arguably       → muhtemelen / belki / tartışmalı olarak
  RULE: never upgrade "suggests"→"kanıtlamaktadır" or downgrade "demonstrates".

calque_guard (common EN→TR pitfalls):
  • Do not calque English passive chains wholesale; recast head-final.
  • "in order to" → "-mek için"; avoid redundant "amacıyla … için".
  • Keep one canonical Turkish term per concept across the document (§10.2).
