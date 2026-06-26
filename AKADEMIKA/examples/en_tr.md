# EXAMPLES — English → Turkish (few-shot calibration)
type: examples
direction: English → Turkish
targets_core: 1.0

EX-1 (metric / acronym / hedging / decimals)
  SRC: The proposed RAG system achieves 98.1% accuracy and a Recall@5 of 0.876,
       which suggests that retrieval quality may improve downstream QA.
  TGT: Önerilen RAG (Geri Getirim Destekli Üretim) sistemi %98,1 doğruluk oranına
       ve 0,876 Recall@5 değerine ulaşmakta olup bu durum, geri getirim
       kalitesinin sonraki QA aşamasını iyileştirebileceğine işaret etmektedir.
  WHY: RAG expanded once; "accuracy" (result) → "doğruluk oranı"; Recall@5 kept;
       98.1%→%98,1, 0.876→0,876; "suggests"→tentative (not "kanıtlamaktadır");
       "may"→-Ebilir; reporting register; diacritics intact.

EX-2 (thousands + decimal together)
  SRC: The corpus contains 1,234,567 tokens with a mean length of 12.5 words.
  TGT: Külliyat, ortalama 12,5 kelimelik uzunluğa sahip 1.234.567 token içermektedir.
  WHY: 1,234,567→1.234.567; 12.5→12,5; "token" retained; value invariant.

EX-3 (source error / illegible / TN_MODE)
  SRC: The results was significant (p = 0.0078) for the [illegible] condition.
  TGT (off): Sonuçlar [illegible] koşulu için istatistiksel olarak anlamlıydı (p = 0,0078).
  TGT (on):  …anlamlıydı (p = 0,0078). [TN: Kaynak metinde okunamayan bölüm.]
  WHY: target grammar correct (source agreement error not carried); "significant"
       (stats)→"istatistiksel olarak anlamlı"; 0.0078→0,0078; [illegible] kept;
       fact unaltered; note only when on.
