import type { Translations } from "./index";

export const en: Translations = {
  // ── Common ────────────────────────────────────────────
  back_home: "Home",

  // ── Nav ───────────────────────────────────────────────
  nav_features: "Features",
  nav_disciplines: "Disciplines",
  nav_pricing: "Pricing",
  nav_faq: "FAQ",
  nav_login: "Sign In",
  nav_cta: "Try Free",

  // ── Hero ──────────────────────────────────────────────
  hero_badge: "AI-powered academic translation",
  hero_h1_pre: "Your academic texts,",
  hero_h1_em: "translated properly",
  hero_h1_post: ".",
  hero_p: "Translate your papers, assignments, and theses like an academic — not like Google Translate — with discipline-specific terminology, citation preservation, and thesis mode.",
  hero_cta1: "Try Free",
  hero_cta2: "Upload Document",
  hero_trust1: "No credit card required",
  hero_trust2: "First 5,000 characters free",
  hero_trust3: "Your data is deleted",

  // ── Demo ──────────────────────────────────────────────
  demo_dir: "English → Turkish",
  demo_field: "Engineering",
  demo_bad: "Ordinary Translation",
  demo_good: "Akademika Çeviri",
  demo_glossary: "Term Glossary",

  // ── Trust ─────────────────────────────────────────────
  trust_label: "Used by students from Turkey's leading universities",

  // ── Why Different ─────────────────────────────────────
  why_eyebrow: "Why we're different",
  why_title: "Not a translation tool — an academic assistant.",
  why_sub: "Where ordinary tools translate words, we preserve meaning, context, and discipline.",
  why_1_title: "Academic context",
  why_1_body: "We translate medical text like a doctor, legal text like a lawyer. Separate language model settings for each discipline.",
  why_2_title: "Terminology glossary",
  why_2_body: "Learns your specific terms with each translation, uses them consistently in future texts.",
  why_3_title: "Format preservation",
  why_3_body: "PDF, Word, LaTeX — citations, tables, footnotes, and reference lists are preserved as-is.",

  // ── Compare ───────────────────────────────────────────
  cmp_eyebrow: "Comparison",
  cmp_title: "Same text, different results.",
  cmp_sub: "What actually matters for academic translation?",
  cmp_feature_col: "Feature",
  cmp_f1: "Discipline recognition",
  cmp_f2: "Terminology consistency",
  cmp_f3: "Citation & reference preservation",
  cmp_f4: "PDF / DOCX format preservation",
  cmp_f5: "Academic tone & level adjustment",
  cmp_f6: "Thesis mode & project glossary",

  // ── Disciplines ───────────────────────────────────────
  disc_eyebrow: "Disciplines",
  disc_title: "Specialized expertise for every field.",
  disc_sub: "Select your discipline before starting — let AI use the right terminology for you.",
  disc_labels: ["Engineering", "Medicine & Health", "Law", "Economics & Business", "Natural Sciences", "Social Sciences", "Literature & Linguistics", "Theology"],

  // ── How It Works ──────────────────────────────────────
  how_eyebrow: "How it works",
  how_title: "Professional translation in three steps.",
  how_1_title: "Paste or upload",
  how_1_body: "Paste text directly or drag and drop your PDF, Word, or LaTeX file.",
  how_2_title: "Select discipline & language",
  how_2_body: "Specify your field and target language. AI works with the right terminology.",
  how_3_title: "Get your academic translation",
  how_3_body: "Download the translated document with preserved formatting. Terminology glossary and notes included.",

  // ── Testimonials ──────────────────────────────────────
  test_eyebrow: "What students say",
  test_title: "Trusted by 12,000+ students.",
  testimonials: [
    { quote: "I translated my entire thesis literature here. It was the first tool to correctly translate 'stress concentration factor'.", name: "Mehmet K.", meta: "Mechanical Engineering MSc, ITU" },
    { quote: "I use it every day to translate my Turkish lecture notes to Arabic. Medical terms are consistent and accurate.", name: "Ahmad H.", meta: "Medicine Year 4, Ankara University" },
    { quote: "It was amazing to see my APA citations remain intact when submitting my paper to an English journal.", name: "Zeynep A.", meta: "Sociology PhD, Boğaziçi" },
  ],

  // ── Pricing ───────────────────────────────────────────
  pricing_eyebrow: "Pricing",
  pricing_title: "Transparent, student-friendly prices.",
  pricing_sub: "50% discount with student ID. Extra 20% savings with annual payment.",
  pricing_popular: "Most Popular",
  pricing_enterprise_pre: "For institutional licenses,",
  pricing_enterprise_link: "get a quote →",
  plans: [
    { name: "Free",       price: "0",   period: "₺ / mo", desc: "For those who want to try",         features: ["5,000 characters / day", "Quick translation interface", "General glossary", "Community support"],                                  cta: "Get Started",       highlight: false },
    { name: "Student",    price: "99",  period: "₺ / mo", desc: "Most popular choice",               features: ["Unlimited quick translation", "50 pages document translation", "1 thesis project", "Personal glossary", "Email support"],          cta: "Get Student Plan",  highlight: true  },
    { name: "Researcher", price: "299", period: "₺ / mo", desc: "For graduate students & academics", features: ["Unlimited document translation (500 pages)", "5 thesis projects", "Shared glossaries", "API access", "Priority support"],          cta: "Choose Researcher", highlight: false },
  ],

  // ── FAQ ───────────────────────────────────────────────
  faq_eyebrow: "Frequently asked",
  faq_title: "Questions on your mind.",
  faq_items: [
    { q: "Are my translations used as training data?",  a: "No. None of the text you upload is used to train AI models. In the free plan, texts are automatically deleted after 24 hours." },
    { q: "Which file formats do you support?",          a: "We support PDF, DOCX, TXT, Markdown, and LaTeX (.tex) files. Formatting is fully preserved including tables, citations, and footnotes." },
    { q: "Which language pairs are available?",         a: "Turkish ⇄ English, Arabic, Persian, Russian, German, and French. More languages coming soon." },
    { q: "How do I get the student discount?",          a: "When you register with a .edu.tr or valid student email address, the 50% discount is automatically applied to the student plan." },
    { q: "What is thesis mode?",                        a: "Thesis mode translates your thesis chapter by chapter, builds a consistent project glossary, and produces a single PDF you can share with your advisor." },
  ],

  // ── CTA ───────────────────────────────────────────────
  cta_title: "Do your first academic translation today.",
  cta_sub: "Registration takes 30 seconds. No credit card required.",
  cta_btn1: "Create Free Account",
  cta_btn2: "View Plans",
  cta_trust: "GDPR compliant · Your data is not used for training",

  // ── Footer ────────────────────────────────────────────
  footer_desc: "Academic AI translation platform for universities.",
  footer_copyright: "© 2026 Akademika Çeviri. All rights reserved.",
  footer_cols: [
    { title: "Product",   links: ["Quick Translation", "Document Translation", "Thesis Mode", "Citation Generator", "Paraphrase"] },
    { title: "Solutions", links: ["Undergraduate", "Master's", "PhD", "Enterprise", "API"] },
    { title: "Company",   links: ["About Us", "Blog", "Careers", "Contact", "Press"] },
    { title: "Legal",     links: ["GDPR", "Privacy", "Terms of Service", "Cookie Policy"] },
  ],

  // ── Login page ────────────────────────────────────────
  login_back: "Back to home",
  login_h1: "Sign in to your account",
  login_no_account: "Don't have an account?",
  login_register_link: "Sign up free",
  login_panel_h: "Academic translation, done right.",
  login_panel_sub: "Translate your academic texts with confidence — terminology consistency and format preservation guaranteed.",
  login_feat1: "Discipline-specific terminology glossary",
  login_feat2: "PDF & Word format preservation",
  login_feat3: "Thesis mode and citation protection",
  login_quote: "I translated my entire thesis literature here. The terminology consistency was remarkable.",
  login_quote_by: "Mehmet K. — Mechanical Engineering MSc, ITU",
  login_email_label: "Email",
  login_email_ph: "example@university.edu",
  login_pass_label: "Password",
  login_forgot: "Forgot password",
  login_remember: "Remember me",
  login_submit: "Sign In",
  login_or: "or",
  login_google: "Continue with Google",

  // ── Register page ─────────────────────────────────────
  reg_badge: "Start free — no credit card required",
  reg_h1: "Create your free account",
  reg_have_account: "Already have an account?",
  reg_login_link: "Sign in",
  reg_panel_h: "Discover the power of academic translation.",
  reg_panel_sub: "Trusted by thousands of students and researchers to translate texts accurately.",
  reg_panel_features: [
    { title: "5,000 characters free", sub: "Try it immediately without registering" },
    { title: "50% off with .edu email", sub: "Automatic discount with student email" },
    { title: "Your data is protected",  sub: "GDPR compliant, not used for training" },
  ],
  reg_plan_preview: "Popular plan",
  reg_plan_name: "Student Plan",
  reg_plan_desc: "Most popular choice",
  reg_plan_price: "99 ₺",
  reg_plan_period: "/ mo",
  reg_name_label: "Full Name",
  reg_name_ph: "Your Full Name",
  reg_email_label: "Email",
  reg_email_ph: "example@university.edu",
  reg_student_hint: "Student email — 50% discount applied automatically!",
  reg_pass_label: "Password",
  reg_terms_pre: "I agree to the",
  reg_terms_link: "Terms of Service",
  reg_terms_and: "and",
  reg_privacy_link: "Privacy Policy",
  reg_terms_post: ".",
  reg_submit: "Create Account",
  reg_google: "Sign up with Google",
};
