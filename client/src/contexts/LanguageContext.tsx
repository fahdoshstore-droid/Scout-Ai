import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  isRTL: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

// ─── Translations ──────────────────────────────────────────────────────────────

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.product": "Product",
    "nav.partnerships": "Partnerships",
    "nav.governance": "Governance",
    "nav.dashboards": "Dashboards",
    "nav.training": "Training Hub",
    "nav.getStarted": "Get Started",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.subGov": "Sub-Governance",
    "nav.teamMembers": "Team Members",
    "nav.scoutDashboard": "Scout Dashboard",
    "nav.compare": "Compare Athletes",
    "nav.upload": "AI Analysis",
    "nav.sportId": "Sport ID",

    // Hero
    "hero.badge": "AI-POWERED SPORTS PLATFORM",
    "hero.headline1": "The AI Platform for",
    "hero.headline2": "Sport Talent Discovery",
    "hero.sub": "Discover, analyze, and develop athletes across all sports — no equipment, no experts, no barriers.",
    "hero.cta1": "Analyze an Athlete",
    "hero.cta2": "Explore Platform",
    "hero.stat1.val": "12+",
    "hero.stat1.label": "Performance Metrics",
    "hero.stat2.val": "Under 60s",
    "hero.stat2.label": "AI Analysis Time",
    "hero.stat3.val": "6",
    "hero.stat3.label": "Platform Modules",
    "hero.stat4.val": "Pilot",
    "hero.stat4.label": "Phase Active",

    // Sports
    "sports.title": "All Sports. One Platform.",
    "sports.sub": "From football fields to swimming pools, boxing rings to open water — ada2ai covers every sport.",
    "sports.football": "Football",
    "sports.basketball": "Basketball",
    "sports.boxing": "Boxing",
    "sports.swimming": "Swimming",
    "sports.freediving": "Free Diving",
    "sports.other": "Other Sports",

    // Problem
    "problem.badge": "The Challenge",
    "problem.title": "Talent Goes Undiscovered",
    "problem.sub": "Across Saudi Arabia and the MENA region, thousands of talented athletes go undiscovered every year — not because they lack ability, but because the infrastructure to find them doesn't exist at scale.",
    "problem.1.title": "Scouting is Fragmented",
    "problem.1.desc": "Traditional scouting is manual, inconsistent, and limited to scouts who are physically present — missing thousands of talented athletes in underserved regions.",
    "problem.2.title": "Access is Locked by Cost",
    "problem.2.desc": "Professional scouting infrastructure is prohibitively expensive — accessible only to top-tier clubs, leaving grassroots athletes without any discovery pathway.",
    "problem.3.title": "No Digital Identity",
    "problem.3.desc": "Athletes have no standardized digital profile to showcase their abilities — making it impossible to be discovered by scouts, academies, or federations remotely.",
    "problem.4.title": "Data Stays Siloed",
    "problem.4.desc": "Performance data is scattered across coaches, trainers, and clubs with no unified system — preventing evidence-based decisions at scale.",

    // Solution
    "solution.badge": "The Solution",
    "solution.title": "Six Modules. One Mission.",
    "solution.sub": "ada2ai integrates six powerful modules into a single platform — from athlete identification to federation-level governance.",

    // How It Works
    "how.badge": "How It Works",
    "how.title": "From Upload to Insight in 5 Steps",
    "how.1.title": "Submit Athlete Media",
    "how.1.desc": "Upload a photo or video of any athlete. No special equipment needed — a smartphone is enough.",
    "how.2.title": "AI Analyzes Performance",
    "how.2.desc": "Our AI engine analyzes physical attributes, movement patterns, and sport-specific indicators.",
    "how.3.title": "Generate Sport ID",
    "how.3.desc": "Every analyzed athlete receives a verified digital Sport ID — their permanent athletic passport.",
    "how.4.title": "Scout & Compare",
    "how.4.desc": "Scouts access the dashboard to search, filter, and compare athletes across regions and sports.",
    "how.5.title": "Connect & Develop",
    "how.5.desc": "Athletes connect with academies, clubs, and federations through the platform's verified network.",

    // Product modules
    "module.sportId.title": "Sport Digital ID",
    "module.sportId.desc": "Every athlete gets a verified digital identity — a standardized profile with AI-analyzed performance data, QR code, and sport-specific metrics.",
    "module.aiEngine.title": "AI Analysis Engine",
    "module.aiEngine.desc": "Upload a photo or video and receive a comprehensive performance report based on international governance standards.",
    "module.scouts.title": "Scouts Dashboard",
    "module.scouts.desc": "A powerful search and filtering interface for scouts to discover, compare, and track athletes across all sports and regions.",
    "module.compare.title": "Compare Engine",
    "module.compare.desc": "Side-by-side athlete comparison with radar charts, metric breakdowns, and AI-generated scouting recommendations.",
    "module.institutes.title": "Sports Institutes",
    "module.institutes.desc": "A verified directory of sports clubs, academies, and gyms across Saudi Arabia — filterable by sport, city, and age group.",
    "module.training.title": "Training Hub",
    "module.training.desc": "AI-powered training management platform for coaches — generate personalized plans, track progress, manage matches, and get real-time coaching.",

    // Vision 2030
    "vision.badge": "Strategic Alignment",
    "vision.title": "Aligned with Vision 2030",
    "vision.sub": "ada2ai directly supports Saudi Arabia's Vision 2030 goals for sports development, digital transformation, and national talent discovery.",

    // CTA
    "cta.title": "Ready to Discover Tomorrow's Champions?",
    "cta.sub": "Join the ada2ai platform and transform how sports talent is discovered, developed, and connected across Saudi Arabia.",
    "cta.btn1": "Analyze an Athlete",
    "cta.btn2": "Learn More",

    // Footer
    "footer.tagline": "AI Sports Talent Discovery",
    "footer.rights": "© 2026 ada2ai · Saudi Innovation · Arabic-First Platform",

    // Dashboards page
    "dash.title": "Dashboards",
    "dash.sub": "All your analytics and scouting tools in one place.",
    "dash.scout": "Scout Dashboard",
    "dash.scout.desc": "Search, filter, and discover athletes across all sports and regions.",
    "dash.compare": "Compare Athletes",
    "dash.compare.desc": "Side-by-side comparison with radar charts and AI recommendations.",
    "dash.upload": "AI Analysis",
    "dash.upload.desc": "Upload athlete media for instant AI performance analysis.",
    "dash.sportid": "Sport ID",
    "dash.sportid.desc": "Generate and manage verified digital athlete identities.",

    // Common
    "common.openDashboard": "Open Dashboard",
    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.comingSoon": "Coming Soon",
    "common.pilotPhase": "Pilot Phase",
    "common.new": "NEW",
  },

  ar: {
    // Navbar
    "nav.product": "المنتج",
    "nav.partnerships": "الشراكات",
    "nav.governance": "الحوكمة",
    "nav.dashboards": "لوحات التحكم",
    "nav.training": "مركز التدريب",
    "nav.getStarted": "ابدأ الآن",
    "nav.login": "تسجيل الدخول",
    "nav.logout": "تسجيل الخروج",
    "nav.subGov": "الحوكمة الفرعية",
    "nav.teamMembers": "أعضاء الفريق",
    "nav.scoutDashboard": "لوحة الكشافين",
    "nav.compare": "مقارنة الرياضيين",
    "nav.upload": "تحليل الذكاء الاصطناعي",
    "nav.sportId": "الهوية الرياضية",

    // Hero
    "hero.badge": "منصة رياضية بالذكاء الاصطناعي",
    "hero.headline1": "منصة الذكاء الاصطناعي",
    "hero.headline2": "لاكتشاف المواهب الرياضية",
    "hero.sub": "اكتشف وحلل وطور الرياضيين في جميع الرياضات — بدون معدات، بدون خبراء، بدون حواجز.",
    "hero.cta1": "تحليل رياضي",
    "hero.cta2": "استكشف المنصة",
    "hero.stat1.val": "+12",
    "hero.stat1.label": "معيار أداء",
    "hero.stat2.val": "أقل من 60 ثانية",
    "hero.stat2.label": "وقت التحليل",
    "hero.stat3.val": "6",
    "hero.stat3.label": "وحدات المنصة",
    "hero.stat4.val": "تجريبي",
    "hero.stat4.label": "المرحلة الحالية",

    // Sports
    "sports.title": "جميع الرياضات. منصة واحدة.",
    "sports.sub": "من ملاعب كرة القدم إلى حمامات السباحة، من حلبات الملاكمة إلى المياه المفتوحة — ada2ai تغطي كل رياضة.",
    "sports.football": "كرة القدم",
    "sports.basketball": "كرة السلة",
    "sports.boxing": "الملاكمة",
    "sports.swimming": "السباحة",
    "sports.freediving": "الغوص الحر",
    "sports.other": "رياضات أخرى",

    // Problem
    "problem.badge": "التحدي",
    "problem.title": "المواهب تبقى مجهولة",
    "problem.sub": "في جميع أنحاء المملكة العربية السعودية ومنطقة الشرق الأوسط وشمال أفريقيا، يبقى آلاف الرياضيين الموهوبين مجهولين كل عام — ليس لأنهم يفتقرون إلى القدرة، بل لأن البنية التحتية للعثور عليهم لا تتوفر على نطاق واسع.",
    "problem.1.title": "الكشف مجزأ",
    "problem.1.desc": "الكشف التقليدي يدوي وغير متسق ومحدود بالكشافين الموجودين فعلياً — مما يفوّت آلاف الرياضيين الموهوبين في المناطق المحرومة.",
    "problem.2.title": "الوصول مقيّد بالتكلفة",
    "problem.2.desc": "البنية التحتية للكشف الاحترافي باهظة التكلفة — متاحة فقط للأندية الكبرى، تاركةً الرياضيين الشعبيين بدون أي مسار للاكتشاف.",
    "problem.3.title": "لا هوية رقمية",
    "problem.3.desc": "لا يملك الرياضيون ملفاً رقمياً موحداً لعرض قدراتهم — مما يجعل اكتشافهم من قبل الكشافين والأكاديميات والاتحادات عن بُعد أمراً مستحيلاً.",
    "problem.4.title": "البيانات معزولة",
    "problem.4.desc": "بيانات الأداء مبعثرة بين المدربين والأندية بدون نظام موحد — مما يمنع اتخاذ قرارات مبنية على الأدلة على نطاق واسع.",

    // Solution
    "solution.badge": "الحل",
    "solution.title": "ست وحدات. مهمة واحدة.",
    "solution.sub": "تدمج ada2ai ست وحدات قوية في منصة واحدة — من تحديد الرياضيين إلى الحوكمة على مستوى الاتحادات.",

    // How It Works
    "how.badge": "كيف يعمل",
    "how.title": "من الرفع إلى التحليل في 5 خطوات",
    "how.1.title": "رفع وسائط الرياضي",
    "how.1.desc": "ارفع صورة أو فيديو لأي رياضي. لا تحتاج معدات خاصة — الهاتف الذكي كافٍ.",
    "how.2.title": "الذكاء الاصطناعي يحلل الأداء",
    "how.2.desc": "يحلل محرك الذكاء الاصطناعي الخصائص الجسدية وأنماط الحركة والمؤشرات الخاصة بكل رياضة.",
    "how.3.title": "إنشاء الهوية الرياضية",
    "how.3.desc": "يحصل كل رياضي محلَّل على هوية رياضية رقمية موثقة — جواز سفره الرياضي الدائم.",
    "how.4.title": "الكشف والمقارنة",
    "how.4.desc": "يصل الكشافون إلى لوحة التحكم للبحث والتصفية ومقارنة الرياضيين عبر المناطق والرياضات.",
    "how.5.title": "التواصل والتطوير",
    "how.5.desc": "يتواصل الرياضيون مع الأكاديميات والأندية والاتحادات من خلال الشبكة الموثقة للمنصة.",

    // Product modules
    "module.sportId.title": "الهوية الرياضية الرقمية",
    "module.sportId.desc": "يحصل كل رياضي على هوية رقمية موثقة — ملف موحد مع بيانات أداء محللة بالذكاء الاصطناعي ورمز QR ومقاييس خاصة بالرياضة.",
    "module.aiEngine.title": "محرك التحليل بالذكاء الاصطناعي",
    "module.aiEngine.desc": "ارفع صورة أو فيديو واحصل على تقرير أداء شامل بناءً على معايير الحوكمة الدولية.",
    "module.scouts.title": "لوحة الكشافين",
    "module.scouts.desc": "واجهة بحث وتصفية قوية للكشافين لاكتشاف الرياضيين ومقارنتهم وتتبعهم عبر جميع الرياضات والمناطق.",
    "module.compare.title": "محرك المقارنة",
    "module.compare.desc": "مقارنة جنباً إلى جنب بين الرياضيين مع مخططات الرادار وتفاصيل المقاييس وتوصيات الكشف المولدة بالذكاء الاصطناعي.",
    "module.institutes.title": "المعاهد الرياضية",
    "module.institutes.desc": "دليل موثق للأندية الرياضية والأكاديميات والصالات الرياضية في جميع أنحاء المملكة العربية السعودية — قابل للتصفية حسب الرياضة والمدينة والفئة العمرية.",
    "module.training.title": "مركز التدريب",
    "module.training.desc": "منصة إدارة تدريب بالذكاء الاصطناعي للمدربين — إنشاء خطط مخصصة وتتبع التقدم وإدارة المباريات والحصول على تدريب فوري.",

    // Vision 2030
    "vision.badge": "التوافق الاستراتيجي",
    "vision.title": "متوافق مع رؤية 2030",
    "vision.sub": "تدعم ada2ai مباشرةً أهداف رؤية المملكة العربية السعودية 2030 لتطوير الرياضة والتحول الرقمي واكتشاف المواهب الوطنية.",

    // CTA
    "cta.title": "هل أنت مستعد لاكتشاف أبطال الغد؟",
    "cta.sub": "انضم إلى منصة ada2ai وحوّل طريقة اكتشاف المواهب الرياضية وتطويرها وربطها في جميع أنحاء المملكة العربية السعودية.",
    "cta.btn1": "تحليل رياضي",
    "cta.btn2": "اعرف المزيد",

    // Footer
    "footer.tagline": "اكتشاف المواهب الرياضية بالذكاء الاصطناعي",
    "footer.rights": "© 2026 ada2ai · ابتكار سعودي · منصة عربية أولاً",

    // Dashboards page
    "dash.title": "لوحات التحكم",
    "dash.sub": "جميع أدوات التحليل والكشف في مكان واحد.",
    "dash.scout": "لوحة الكشافين",
    "dash.scout.desc": "ابحث وصفّ واكتشف الرياضيين عبر جميع الرياضات والمناطق.",
    "dash.compare": "مقارنة الرياضيين",
    "dash.compare.desc": "مقارنة جنباً إلى جنب مع مخططات الرادار وتوصيات الذكاء الاصطناعي.",
    "dash.upload": "تحليل الذكاء الاصطناعي",
    "dash.upload.desc": "ارفع وسائط الرياضي للحصول على تحليل أداء فوري بالذكاء الاصطناعي.",
    "dash.sportid": "الهوية الرياضية",
    "dash.sportid.desc": "إنشاء وإدارة الهويات الرياضية الرقمية الموثقة للرياضيين.",

    // Common
    "common.openDashboard": "فتح لوحة التحكم",
    "common.learnMore": "اعرف المزيد",
    "common.viewAll": "عرض الكل",
    "common.comingSoon": "قريباً",
    "common.pilotPhase": "مرحلة تجريبية",
    "common.new": "جديد",
  },
};

// ─── Provider ──────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("ada2ai-lang");
    return (stored === "ar" || stored === "en") ? stored : "en";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("ada2ai-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}
