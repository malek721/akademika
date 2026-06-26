# DISCIPLINE MODULE
type: discipline
name: Medicine / Clinical Research
targets_core: 1.0
# DATA ONLY. Template/stub — extend with your field's terminology.

never_translate:        # keep verbatim
  p, CI, OR, HR, RR, SD, SE, IQR, BMI, ICD-10, in vivo, in vitro, in situ,
  placebo, n
  # statistical/clinical notation and standard Latin terms.

retained_terms:
  PCR, RT-PCR, DNA, RNA, mRNA, ELISA, MRI, CT, ECG, ICU, RCT
  # established international acronyms — verbatim.

acronym_expansions:     # first-use only (target = Turkish examples)
  RCT → Randomize Kontrollü Çalışma
  ICU → Yoğun Bakım Ünitesi
  # MRI, CT, ECG, DNA, RNA stay bare on first use.

register_notes:
  • Use TDK-approved Turkish medical terminology; keep Latin anatomical/clinical
    terms verbatim and italicized.
  • Drug names: INN/generic verbatim; do not translate brand names.
  • Dosages and units never converted (CORE §5/§7).
