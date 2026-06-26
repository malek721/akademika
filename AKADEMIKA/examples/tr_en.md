# EXAMPLES — Turkish → English (few-shot calibration)
type: examples
direction: Turkish → English
targets_core: 1.0

EX-1 (reverse number conversion / pro-drop / de-calquing)
  SRC: Bu çalışmada önerilen yöntem, %92,5 doğruluk oranına ulaşmış ve temel
       modele kıyasla 1.250 örnekte anlamlı bir iyileşme göstermiştir.
  TGT: The method proposed in this study achieved 92.5% accuracy and showed a
       statistically significant improvement over the baseline across 1,250 samples.
  WHY: pro-drop subject restored; %92,5→92.5% (sign after, comma→period);
       1.250→1,250 (period→comma); "anlamlı"(stats)→"statistically significant";
       "temel model"→"baseline" (metric kept); "göstermiştir"→simple past;
       "doğruluk oranı"→"accuracy".

EX-2 (hedging force preserved)
  SRC: Bulgular, modelin geri getirim performansını artırabileceğini düşündürmektedir.
  TGT: The findings suggest that the model may improve retrieval performance.
  WHY: "düşündürmektedir"→"suggest" (tentative, not "demonstrate");
       "-Ebilir"→"may"; modal stacking preserved; "geri getirim"→"retrieval".
