
Aşağıda, bir UI tasarımcısına veya tasarım ajansına doğrudan verebileceğin tam kapsamlı Markdown brifi yer alıyor. Onayladıktan sonra bunu `BRIEF.md` olarak proje köküne kaydedebilirim. İstersen aynı brifi temel alarak gerçek web sitesini (TanStack Start + Tailwind + Lovable AI) inşa etmeye de geçebiliriz.

---

# AkademikÇeviri — Ürün & UI/UX Brifi

> **Tek cümlelik tanım:** Üniversite ve lisansüstü öğrencileri için, akademik bağlamı, terminolojiyi ve atıf stilini koruyan, "aptal çeviri araçlarından" net biçimde ayrışan yapay zekâ destekli akademik çeviri platformu.

**Birincil dil:** Türkçe (arayüz)
**Birincil pazar:** Türkiye'deki üniversiteler — Türk ve uluslararası (Arap, Afrikalı, Orta Asyalı, Avrupalı) öğrenciler
**Uzun vade:** Global akademik çeviri platformu

---

## 1. Marka & Konumlandırma

### 1.1 İsim önerileri (tasarımcı seçsin / müşteri karar versin)
- **Akademia AI**
- **Tercüme Akademi**
- **Lingua Scholar**
- **Tezçevir** (yerel, Türkçe odaklı)
- **Scribe.ai**

### 1.2 Tagline (Türkçe)
- Ana: **"Akademik metinleriniz, akademisyen gibi çevrilir."**
- Alternatif: *"Google Translate değil. Akademik çeviri."*
- Alternatif: *"Tezinizi anlayan yapay zekâ."*

### 1.3 Marka Kişiliği
- **Profesyonel** ama soğuk değil
- **Akademik** ama elitist değil
- **Modern teknoloji** ama "tech-bro" değil
- **Güvenilir** — bir akademisyenin tezini emanet edebileceği his

### 1.4 Rakiplerden farkımız (bunu UI'da net hissettir)
| Rakip | Onların yaptığı | Bizim yaptığımız |
|---|---|---|
| Google Translate | Kelime kelime | Bağlam + disiplin |
| DeepL | İyi genel çeviri | Akademik terminoloji veritabanı |
| ChatGPT (ham) | Tutarsız, kaynaksız | Atıf stilini koruyor, terim sözlüğü çıkarıyor |
| İnsan çevirmen | 200–500 TL/sayfa, 1 hafta | Dakikalar içinde, 1/10 fiyat |

---

## 2. Hedef Kitle & Persona'lar

### Persona 1 — "Mehmet, Yüksek Lisans Öğrencisi"
- 26, İTÜ, Makine Mühendisliği YL
- Tez literatürü için İngilizce makaleleri Türkçeye çeviriyor
- Acı noktası: Google Translate "stress concentration factor"u "stres konsantrasyon faktörü" yerine "vurgu yoğunluk etkeni" diye çeviriyor
- **İhtiyacı:** Disipline özgü terminoloji + glossary

### Persona 2 — "Ahmad, Suriyeli Tıp Öğrencisi"
- 22, Ankara Üniversitesi Tıp
- Türkçe ders notlarını Arapça'ya çeviriyor
- Acı noktası: Tıbbi Türkçe terimleri (örn. "miyokard enfarktüsü") çeviri araçları bozuyor
- **İhtiyacı:** Türkçe → Arapça tıbbi çeviri, terim açıklamaları

### Persona 3 — "Zeynep, Doktora Öğrencisi"
- 31, Boğaziçi, Sosyoloji Doktora
- Türkçe yazdığı makaleyi İngilizce dergiye gönderecek
- Acı noktası: APA atıf stilini koruyan, akademik dil tonunu yakalayan çeviri
- **İhtiyacı:** Yüksek kaliteli TR→EN + atıf koruma + dergi formatı

### Persona 4 — "Amir, Uluslararası Lisans"
- 20, İranlı, Türkiye'de İşletme
- Türkçe ödevlerini anlamak için çeviriyor
- **İhtiyacı:** Ucuz / ücretsiz katman, hızlı, mobil

---

## 3. Çekirdek Ürün Özellikleri

### 3.1 Çeviri Modları (UI'da sekme olarak)
1. **Hızlı Çeviri** — Yapıştır & çevir (5000 karaktere kadar, ücretsiz)
2. **Belge Çeviri** — PDF / DOCX / LaTeX yükle, format korunarak çevir
3. **Akademik Makale Modu** — Atıf, dipnot, referans listesi, tablo başlıkları korunur
4. **Tez Modu** — Bölüm bölüm çeviri, terim sözlüğü oluşturma, tutarlılık kontrolü
5. **Özet & Parafraze** — Makalenin akademik özetini çıkar, intihal riski olmayan parafraze

### 3.2 Disiplin Seçimi (Çeviri kalitesinin sırrı)
Çeviri başlamadan önce kullanıcı disiplini seçer:
- Mühendislik (alt: makine, elektrik, inşaat, bilgisayar, kimya…)
- Tıp & Sağlık (alt: dahiliye, cerrahi, eczacılık, hemşirelik…)
- Sosyal Bilimler (alt: sosyoloji, psikoloji, eğitim…)
- Hukuk
- İktisat & İşletme
- Fen Bilimleri
- İlahiyat
- Edebiyat & Dilbilim

Her disiplin AI'nın system prompt'unu ve terim sözlüğünü değiştirir.

### 3.3 Yardımcı Akademik Araçlar (cross-sell)
- **Atıf üretici** (APA, MLA, Chicago, IEEE, Vancouver)
- **Özet (abstract) yazıcı**
- **Akademik dil iyileştirici** (proofreading)
- **İntihal kontrolü için parafraze**
- **Tez başlığı önerisi**
- **Kaynakça çeviri** (referans listesi)

### 3.4 Desteklenen Dil Çiftleri (Faz 1)
- TR ⇄ EN (birincil)
- TR ⇄ AR
- TR ⇄ FA (Farsça)
- TR ⇄ RU
- TR ⇄ FR / DE
- EN ⇄ AR (ikincil pazar için)

---

## 4. Sayfa Mimarisi (Sitemap)

```
/                            Ana sayfa (landing)
/ceviri                      Hızlı çeviri arayüzü
/belge-ceviri                Belge yükleme & çeviri
/tez-modu                    Tez projesi yönetimi
/araclar
  /atif-uretici
  /ozet-yazici
  /parafraze
  /dil-iyilestirici
/fiyatlandirma               Planlar
/kurumsal                    Üniversite / bölüm lisansları
/hakkimizda
/blog                        SEO + akademik içerik
  /blog/[slug]
/yardim                      Yardım merkezi / SSS
/iletisim
/giris                       Auth
/kayit
/panel                       Kullanıcı paneli (login sonrası)
  /panel/projelerim
  /panel/sozlugum            Kişisel terim sözlüğü
  /panel/gecmis
  /panel/abonelik
  /panel/ayarlar
```

---

## 5. Sayfa Sayfa UI Spesifikasyonu

### 5.1 Ana Sayfa (`/`)

**Amaç:** Ziyaretçiyi 10 saniye içinde ikna et — "bu, sıradan bir çeviri aracı değil."

#### Bölüm 1 — Hero
- **Sol:** Büyük başlık (H1):
  > "Akademik metinleriniz hak ettiği gibi çevrilsin."

  Alt başlık:
  > "Yapay zekâ destekli, disipline özel terminoloji ile makale, tez ve ödevlerinizi saniyeler içinde çevirin."

  CTA butonları:
  - **[Ücretsiz Dene]** (birincil, dolu)
  - **[Belge Yükle]** (ikincil, outline)

  Mikro-güven satırı (CTA altında):
  > "✓ Kredi kartı gerekmez   ✓ İlk 5.000 karakter ücretsiz   ✓ Verileriniz silinir"

- **Sağ:** Canlı çeviri demo widget'ı (animasyonlu, kullanıcı etkileşimine açık değil ama görsel olarak yazılıyor gibi)
  - Üstte: kötü çeviri (Google) — kırmızı altı çizili hatalarla
  - Altta: bizim çeviri — yeşil onay işaretli, terim açıklamalı

#### Bölüm 2 — "Neden farklıyız?" (3 kart)
1. **🎓 Akademik bağlam** — "Tıp metnini doktor gibi, hukuk metnini hukukçu gibi çeviriyoruz."
2. **📚 Terim sözlüğü** — "Her çeviride özel terimlerinizi öğreniyor, sonrakinde tutarlı kullanıyoruz."
3. **📄 Format koruma** — "PDF, Word, LaTeX — kaynaklar, tablolar, atıflar olduğu gibi kalır."

#### Bölüm 3 — Karşılaştırma tablosu (önemli!)
Üç sütun: "Google Translate", "ChatGPT", "AkademikÇeviri"
Satırlar: Disiplin tanıma / Terim tutarlılığı / Atıf koruma / PDF format / Glossary / Akademik ton

#### Bölüm 4 — Disiplinler grid'i
16+ disiplin ikonu — üzerine gelince o disipline özel örnek çeviri açılır

#### Bölüm 5 — Sosyal kanıt
- "12.000+ Türkiye üniversitesi öğrencisi tarafından kullanıldı"
- 4–6 öğrenci yorumu (gerçekçi, abartısız) — üniversite + bölüm bilgisiyle
- Üniversite logoları (lisanslı kullanım — başlangıçta "Şu üniversitelerden öğrenciler kullanıyor" diye konumlandır)

#### Bölüm 6 — Nasıl çalışır? (3 adım)
1. Metni yapıştır veya belge yükle
2. Disiplinini seç
3. Akademik çevirini indir

#### Bölüm 7 — Fiyatlandırma teaser
3 plan kartı (özet) → "Tüm planları gör" linki

#### Bölüm 8 — SSS (kısa, 5 soru)

#### Bölüm 9 — Final CTA
> "İlk çevirini bugün ücretsiz yap."
> [Hemen Başla]

#### Footer
- Sütun 1: Ürün (Çeviri, Belge, Tez Modu, Araçlar)
- Sütun 2: Çözümler (Lisans öğrencisi, Yüksek lisans, Doktora, Kurumsal)
- Sütun 3: Şirket (Hakkımızda, Blog, Kariyer, İletişim)
- Sütun 4: Yasal (KVKK, Gizlilik, Kullanım Şartları)
- Alt: Logo + dil seçici (TR / EN / AR) + sosyal medya

---

### 5.2 Çeviri Arayüzü (`/ceviri`)

İki sütunlu klasik çeviri layout'u, ama akademik katmanlarla zenginleştirilmiş:

**Üst bar:**
- Sol: Kaynak dil dropdown + ⇄ değiştir + Hedef dil dropdown
- Orta: **Disiplin seçici** (büyük, dikkat çekici) — "Disiplin seçin: [Mühendislik ▾]"
- Sağ: **Akademik seviye:** Lisans / YL / Doktora (ton ayarı)

**Sol panel (kaynak):**
- Geniş textarea (min 400px yükseklik)
- Alt sol: karakter sayacı `1234 / 5000`
- Alt sağ: 🎤 sesli giriş, 📎 dosya yükle, 🗑 temizle

**Sağ panel (çeviri sonucu):**
- Çeviri metni
- **Alt panel — Terim Sözlüğü (akordeon):**
  - Tespit edilen terimler tablo halinde: `kaynak terim | çeviri | açıklama | alternatif`
  - "Bu sözlüğü projeme kaydet" butonu
- **Alt panel — Notlar:**
  - "Bu metinde X belirsiz, Y'yi şu anlamda çevirdik" gibi AI'dan açıklamalar
- Üst sağ: 📋 kopyala, ⬇ indir (TXT/DOCX), 🔄 yeniden çevir, 👍/👎 geri bildirim

**Sağ kenar çubuğu (opsiyonel, geniş ekranda):**
- Geçmiş çeviriler listesi (giriş yapmışsa)

---

### 5.3 Belge Çeviri (`/belge-ceviri`)

**Adım göstergesi (üstte):** 1. Yükle → 2. Ayarla → 3. Önizle → 4. İndir

**Adım 1 — Yükleme:**
- Büyük drag-and-drop alanı
- Desteklenen: PDF, DOCX, TXT, LaTeX (.tex), Markdown
- Maks 50 MB / 200 sayfa (plana göre)

**Adım 2 — Ayarlar paneli:**
- Kaynak/hedef dil
- Disiplin
- ☑ Atıfları koruma (APA/MLA/IEEE)
- ☑ Tablo & şekil başlıklarını çevir
- ☑ Kaynakça'yı çevir (önerilmez — uyarı göster)
- ☑ LaTeX komutlarını koru
- Tahmini süre & maliyet: "~2 dakika, 3 kredi"

**Adım 3 — Önizleme:**
- Sol: orijinal PDF render
- Sağ: çevrilmiş hali (aynı sayfa düzeni)
- Üst: sayfa sayfa gezinme, "Tümünü onayla / sayfa düzenle"

**Adım 4 — İndirme:**
- Format seçenekleri: PDF (orijinal layout), DOCX, sadece metin
- "Çift dilli sürüm" seçeneği (yan yana orijinal + çeviri)

---

### 5.4 Tez Modu (`/tez-modu`)

**Proje tabanlı arayüz** (Notion-vari sol kenar çubuğu):

**Sol kenar çubuğu:**
- Tez projeleri listesi
- Her proje altında: bölümler (Giriş, Literatür Taraması, Yöntem, Bulgular, Tartışma, Sonuç)
- + Yeni bölüm

**Ana alan:**
- Bölüm bölüm çeviri editörü (Google Docs benzeri)
- Sağ kenarda **Tez Sözlüğü** — proje boyunca tutarlı kullanılan terimler
- Üstte **Tutarlılık Kontrolü** butonu: "Bu bölümde 'methodology'yi 3 farklı şekilde çevirmişsiniz — birleştirmek ister misiniz?"

**Sağ üst:**
- Tüm tezi tek PDF olarak indir
- Versiyon geçmişi
- Paylaş (danışmanla)

---

### 5.5 Fiyatlandırma (`/fiyatlandirma`)

4 plan kartı:

| | **Ücretsiz** | **Öğrenci** | **Araştırmacı** | **Kurumsal** |
|---|---|---|---|---|
| Aylık | 0 ₺ | 99 ₺ | 299 ₺ | Teklif al |
| Hızlı çeviri | 5.000 krk/gün | Sınırsız | Sınırsız | Sınırsız |
| Belge çeviri | — | 50 sayfa/ay | 500 sayfa/ay | Özel |
| Tez modu | — | 1 proje | 5 proje | Sınırsız |
| Disiplin sözlüğü | Genel | Özel | Özel + paylaşımlı | Kurumsal |
| Öncelikli destek | — | Email | Email + WhatsApp | Özel temsilci |
| API erişimi | — | — | ✓ | ✓ |

- Yıllık ödemede %20 indirim toggle'ı
- **Öğrenci kimliği ile %50 indirim** rozeti (büyük, dikkat çekici)
- Türkiye için iyzico / Papara / havale; uluslararası için Stripe

---

### 5.6 Kullanıcı Paneli (`/panel`)

**Üst:** Hoşgeldin + kalan kontör/karakter göstergesi (ilerleme çubuğu)

**Dashboard kartları:**
- Bu ay yapılan çeviri sayısı
- Tasarruf edilen süre tahmini ("Bu ay 14 saat kazandın")
- Aktif tez projeleri
- Kalan kontör

**Hızlı erişim:** Son 5 çeviri, en çok kullanılan diller

**Sol kenar menü:** Projelerim, Sözlüğüm, Geçmiş, Abonelik, Ayarlar, Çıkış

---

## 6. Tasarım Sistemi

### 6.1 Renk Paleti — "Akademik Güven" (önerilen)

```
--background:        #FAFAF7   (kağıt beyazı, sıcak)
--foreground:        #1A2332   (gece mavisi, neredeyse siyah)
--primary:           #1E40AF   (derin akademik mavi)
--primary-hover:     #1E3A8A
--accent:            #B8860B   (eski altın — diploma rengi)
--accent-soft:       #F5E6C8
--success:           #15803D
--warning:           #B45309
--error:             #B91C1C
--muted:             #6B7280
--border:            #E5E0D6   (kağıt kenarı tonu)
--card:              #FFFFFF
```

**Dark mode:**
```
--background:        #0F1419
--foreground:        #F5F5F0
--primary:           #60A5FA
--accent:            #D4A93C
--card:              #1A2028
```

**Neden bu palet:**
- Mavi → güven, akademi, kurumsal ciddiyet
- Sıcak altın → diploma, parşömen, prestij
- Kağıt beyazı (saf beyaz değil) → uzun okumalarda göz yormaz, "doküman" hissi

### 6.2 Tipografi

- **Başlıklar:** `Fraunces` (modern serif — akademik + çağdaş) veya `Crimson Pro`
- **Gövde:** `Inter` veya `IBM Plex Sans` (Türkçe karakter desteği mükemmel)
- **Mono (kod/terim):** `JetBrains Mono`
- **Arapça desteği:** `IBM Plex Sans Arabic` (Ahmad personası için)

Boyut ölçeği (1.25 oran):
- H1: 48px / 56px line-height
- H2: 36px
- H3: 24px
- Body: 16px / 26px line-height (uzun okuma için bol satır arası)
- Small: 14px

### 6.3 Bileşen Stili
- **Border radius:** 8px (kartlar), 6px (butonlar), 4px (input)
- **Gölge:** çok hafif, sıcak — `0 2px 8px rgba(26, 35, 50, 0.06)`
- **Spacing:** 4px grid (4, 8, 12, 16, 24, 32, 48, 64, 96)
- **Maks içerik genişliği:** 1200px (landing), 1440px (uygulama)

### 6.4 İkonografi
- Lucide icon set (tutarlı, açık)
- Disiplin ikonları için custom illustration seti (mühendislik için dişli, tıp için stetoskop vb. — minimal, tek renk)

### 6.5 Mikro-animasyonlar (Motion / Framer Motion)
- Çeviri sonucu yazılıyor gibi gelir (typewriter, 30ms/karakter)
- Disiplin seçilince hero örneği yumuşak fade ile değişir
- Buton hover: 200ms ease-out, hafif yukarı (1px translateY)
- Sayfa geçişi: 150ms fade
- **Aşırıya kaçma — abartılı kaydırma animasyonları YOK.** Akademik tonda sakin kal.

---

## 7. İçerik Tonu (Türkçe)

- **Sen değil, siz** — akademik saygı
- Kısa, net cümleler — pazarlama klişesi yok
- "Devrim niteliğinde", "oyun değiştirici" gibi ifadeler **YASAK**
- Sayılarla konuş: "5.000 karakter", "12 disiplin", "47 dil çifti"
- Türkçe doğal olsun — birebir İngilizce çeviri kokmasın

**Örnek mikro-kopya:**
- Boş durum: "Henüz çevirin yok. İlk akademik çevirini yapmak için bir metin yapıştır."
- Hata: "Çeviri tamamlanamadı. Lütfen birkaç saniye sonra tekrar dene." (suçlayıcı değil)
- Yükleniyor: "Akademik bağlam analiz ediliyor…" (sadece "Yükleniyor" yerine)

---

## 8. Teknik Çerçeve (geliştirici için not)

- **Frontend:** TanStack Start + React 19 + Tailwind CSS v4
- **Backend:** Lovable Cloud (Supabase) — auth, DB, storage
- **AI:** Lovable AI Gateway — `google/gemini-3-flash-preview` (hızlı), `google/gemini-3-pro` (tez modu)
- **Belge işleme:** pdf-parse + mammoth (DOCX) + LaTeX parser
- **Ödeme:** iyzico (TR), Stripe (global)
- **Dil dosyaları:** i18next — TR, EN, AR başlangıçta
- **Analitik:** Plausible (KVKK dostu)

---

## 9. KVKK / Yasal

- Çevrilen metinler **varsayılan olarak 24 saat sonra silinir** (ücretsiz plan)
- Premium: kullanıcı isterse "geçmişi sakla" açar
- Tez modunda dosyalar şifrelenmiş depolanır
- AI eğitiminde **kullanıcı verisi kullanılmaz** — bunu UI'da net belirt (güven inşası)
- Cookie banner, KVKK aydınlatma metni, açık rıza akışı

---

## 10. Lansman Stratejisi (UI'yı buna göre kur)

**Faz 1 (0-3 ay):** Türkiye üniversiteleri — TR↔EN, TR↔AR odaklı, ücretsiz katman geniş tut
**Faz 2 (3-6 ay):** Uluslararası öğrenciler — Farsça, Rusça eklenir
**Faz 3 (6-12 ay):** Kurumsal — üniversite kütüphaneleri, akademik yayıncılar
**Faz 4 (12 ay+):** Global akademik pazar — Avrupa üniversiteleri

---

## 11. Tasarımcı için Kabul Kriterleri

Tasarımı teslim ederken şunlar **mutlaka** olmalı:
- [ ] Mobile (375px), tablet (768px), desktop (1440px) — her sayfa için 3 ekran
- [ ] Hem light hem dark mode
- [ ] LTR (Türkçe/İngilizce) **ve** RTL (Arapça/Farsça) versiyon — özellikle çeviri arayüzü
- [ ] Boş durumlar, yükleniyor durumları, hata durumları
- [ ] Auth ekranları (giriş, kayıt, şifre sıfırlama, Google ile giriş)
- [ ] En az 3 disiplin için örnek çeviri ekran görüntüsü
- [ ] Figma component library (buton, input, kart, modal varyantları)
- [ ] Animasyon prototip (Hero demo + sayfa geçişleri)

---

## 12. İlham Referansları (mood board için)

- **Notion** — temizlik, doküman hissi
- **Linear** — modern UI keskinliği, dark mode
- **DeepL** — çeviri arayüzü pattern'i (ama daha akademik)
- **Stripe Docs** — tipografi ve okunabilirlik
- **JSTOR / Google Scholar** — akademik güven tonu
- **Are.na** — sıcak beyaz + serif başlık karışımı

---

**Brifin sonu.**
İmza: AkademikÇeviri ürün ekibi — v1.0

---

### Sıradaki adım

Onayla, ben de bunu `BRIEF.md` olarak proje köküne kaydedeyim. İstersen aynı anda:
1. Sadece `BRIEF.md` dosyasını ekleyebilirim (en hızlı yol).
2. `BRIEF.md` + landing sayfasının ilk Türkçe versiyonunu birlikte inşa edebilirim.
3. Önce 3 farklı görsel tasarım yönü (design directions) üretip seçtiklerinden biriyle siteyi kurabilirim.

Hangisini istersin?
