'use client';
import { useParams, Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import Ada2aiNavbar from "@/components/Ada2aiNavbar";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── SVG System Icons ── */
function SysIcon({ type, size = 20 }: { type: string; size?: number }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const, stroke: '#00DCC8', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (type === 'USER_TRACK')   return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
  if (type === 'QR_VERIFY')    return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM18 17h3M17 14v3"/></svg>;
  if (type === 'POWER_STAT')   return <svg {...p}><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>;
  if (type === 'MINISTRY')     return <svg {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>;
  if (type === 'AI_ANALYTICS') return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>;
  if (type === 'SHIELD')       return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (type === 'CHART')        return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (type === 'TRAINING')     return <svg {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
  return <svg {...p}><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>;
}

/* ── Module Data ── */
const moduleData: Record<string, {
  num: string; iconType: string; color: string;
  en: { title: string; badge: string; headline: string; tagline: string; desc: string; features: string[]; useCases: { title: string; desc: string }[]; howItWorks: string[]; cta: string; ctaLink: string };
  ar: { title: string; badge: string; headline: string; tagline: string; desc: string; features: string[]; useCases: { title: string; desc: string }[]; howItWorks: string[]; cta: string; ctaLink: string };
}> = {
  "sport-id": {
    num: "01", iconType: "USER_TRACK", color: "#00DCC8",
    en: {
      title: "Sport Digital ID", badge: "IDENTITY", headline: "Every Athlete Deserves a Digital Identity",
      tagline: "Nafath-verified · QR-enabled · Ministry-linked",
      desc: "The Sport Digital ID is the foundation of the ada2ai ecosystem. Every athlete receives a verified, standardized digital profile that consolidates their achievements, performance metrics, and sport history in one place — linked to national identity via Nafath.",
      features: ["Nafath-verified national sport identity", "QR code for instant facility check-in", "Sport Points accumulation system", "Live ministry reporting & analytics", "Multi-sport profile support", "Official federation recognition"],
      useCases: [
        { title: "Athletes", desc: "Build a verified digital portfolio that scouts and coaches can access anywhere." },
        { title: "Federations", desc: "Track all registered athletes with standardized, comparable data." },
        { title: "Facilities", desc: "Enable instant QR check-in and attendance tracking at any venue." },
      ],
      howItWorks: ["Register via Nafath national ID verification", "Complete your sport profile with personal & performance data", "Receive your unique QR-enabled Sport Passport ID", "Share your profile with scouts, clubs, and federations", "Earn Sport Points as you participate and improve"],
      cta: "Get Your Sport ID", ctaLink: "/sportid",
    },
    ar: {
      title: "الهوية الرياضية الرقمية", badge: "الهوية", headline: "كل رياضي يستحق هوية رقمية",
      tagline: "موثقة عبر نفاذ · مزودة بـ QR · مرتبطة بالوزارة",
      desc: "الهوية الرياضية الرقمية هي أساس منظومة ada2ai. يحصل كل رياضي على ملف رقمي موثق وموحد يجمع إنجازاته ومقاييس أدائه وتاريخه الرياضي في مكان واحد — مرتبط بالهوية الوطنية عبر نفاذ.",
      features: ["هوية رياضية وطنية موثقة عبر نفاذ", "رمز QR للدخول الفوري للمنشآت", "نظام تراكم النقاط الرياضية", "تقارير وتحليلات مباشرة للوزارة", "دعم ملفات متعددة الرياضات", "اعتراف رسمي من الاتحادات"],
      useCases: [
        { title: "الرياضيون", desc: "بناء محفظة رقمية موثقة يمكن للكشافة والمدربين الوصول إليها في أي مكان." },
        { title: "الاتحادات", desc: "تتبع جميع الرياضيين المسجلين ببيانات موحدة وقابلة للمقارنة." },
        { title: "المنشآت", desc: "تفعيل الدخول الفوري بـ QR وتتبع الحضور في أي ملعب أو مركز." },
      ],
      howItWorks: ["التسجيل عبر التحقق بالهوية الوطنية (نفاذ)", "إكمال ملفك الرياضي بالبيانات الشخصية والأداء", "استلام معرّف جواز سفرك الرياضي المزود بـ QR", "مشاركة ملفك مع الكشافة والأندية والاتحادات", "اكسب نقاطاً رياضية مع كل مشاركة وتحسن"],
      cta: "احصل على هويتك الرياضية", ctaLink: "/sportid",
    },
  },
  "ai-engine": {
    num: "02", iconType: "POWER_STAT", color: "#007ABA",
    en: {
      title: "AI Analysis Engine", badge: "AI CORE", headline: "Upload. Analyze. Discover.",
      tagline: "12+ metrics · Seconds · No equipment needed",
      desc: "The AI Analysis Engine is ada2ai's core intelligence layer. Upload a photo or short video of any athlete and receive a comprehensive performance report in seconds — no special equipment, no expert required. Powered by computer vision and sport-specific AI models.",
      features: ["Photo & video upload (smartphone-ready)", "12+ performance metrics analyzed", "Sport-specific AI models", "International governance standards", "Instant PDF report generation", "Historical performance tracking"],
      useCases: [
        { title: "Scouts", desc: "Analyze hundreds of athletes remotely without traveling to every location." },
        { title: "Coaches", desc: "Get objective performance data to complement your coaching instincts." },
        { title: "Athletes", desc: "Understand your strengths and areas for improvement with AI-backed insights." },
      ],
      howItWorks: ["Upload a photo or video from any smartphone", "Select the sport and position", "AI engine analyzes physical attributes and movement", "Receive a detailed performance report in seconds", "Track progress over time with historical comparisons"],
      cta: "Try AI Analysis", ctaLink: "/upload",
    },
    ar: {
      title: "محرك التحليل بالذكاء الاصطناعي", badge: "النواة الذكية", headline: "ارفع. حلّل. اكتشف.",
      tagline: "أكثر من 12 مقياساً · في ثواني · بدون معدات",
      desc: "محرك التحليل بالذكاء الاصطناعي هو طبقة الذكاء الأساسية في ada2ai. ارفع صورة أو فيديو قصير لأي رياضي واحصل على تقرير أداء شامل في ثوانٍ — بدون معدات خاصة، بدون خبير. مدعوم برؤية الحاسوب ونماذج ذكاء اصطناعي متخصصة بكل رياضة.",
      features: ["رفع الصور والفيديو (متوافق مع الهاتف)", "تحليل أكثر من 12 مقياساً للأداء", "نماذج ذكاء اصطناعي متخصصة بكل رياضة", "معايير الحوكمة الدولية", "توليد تقرير PDF فوري", "تتبع الأداء التاريخي"],
      useCases: [
        { title: "الكشافة", desc: "تحليل مئات الرياضيين عن بُعد دون السفر إلى كل موقع." },
        { title: "المدربون", desc: "الحصول على بيانات أداء موضوعية لتكملة حدسك التدريبي." },
        { title: "الرياضيون", desc: "فهم نقاط قوتك ومجالات التحسين برؤى مدعومة بالذكاء الاصطناعي." },
      ],
      howItWorks: ["ارفع صورة أو فيديو من أي هاتف ذكي", "اختر الرياضة والمركز", "يحلل محرك الذكاء الاصطناعي الخصائص الجسدية والحركة", "استلم تقرير أداء تفصيلي في ثوانٍ", "تتبع التقدم عبر الزمن بمقارنات تاريخية"],
      cta: "جرّب التحليل الذكي", ctaLink: "/upload",
    },
  },
  "scouts": {
    num: "03", iconType: "QR_VERIFY", color: "#00DCC8",
    en: {
      title: "Scouts Dashboard", badge: "DISCOVERY", headline: "Find the Next Champion — Anywhere.",
      tagline: "Advanced search · Multi-sport · Real-time data",
      desc: "The Scouts Dashboard gives talent scouts a powerful, data-driven interface to search, filter, and discover athletes across all sports and regions in Saudi Arabia. Replace manual scouting trips with intelligent, remote discovery.",
      features: ["Advanced multi-filter athlete search", "Cross-sport & region discovery", "AI-scored performance rankings", "Athlete profile deep-dives", "Shortlist & comparison tools", "Export & reporting capabilities"],
      useCases: [
        { title: "Club Scouts", desc: "Find talent across the kingdom without leaving your desk." },
        { title: "National Federations", desc: "Build national team pipelines with data-backed selection." },
        { title: "Academies", desc: "Identify promising young athletes for enrollment programs." },
      ],
      howItWorks: ["Log in to the Scouts Dashboard", "Set filters: sport, region, age group, performance score", "Browse AI-ranked athlete profiles", "Deep-dive into individual performance reports", "Add athletes to shortlists and share with your team"],
      cta: "Open Scout Dashboard", ctaLink: "/scouts",
    },
    ar: {
      title: "لوحة تحكم الكشافة", badge: "الاكتشاف", headline: "اكتشف البطل القادم — في أي مكان.",
      tagline: "بحث متقدم · متعدد الرياضات · بيانات فورية",
      desc: "تمنح لوحة تحكم الكشافة المكتشفين واجهة قوية مدعومة بالبيانات للبحث والتصفية واكتشاف الرياضيين في جميع الرياضات والمناطق في المملكة العربية السعودية. استبدل رحلات الكشف اليدوية بالاكتشاف الذكي عن بُعد.",
      features: ["بحث متقدم متعدد الفلاتر", "اكتشاف عبر الرياضات والمناطق", "تصنيفات أداء بالذكاء الاصطناعي", "ملفات رياضيين تفصيلية", "أدوات القوائم المختصرة والمقارنة", "إمكانيات التصدير والتقارير"],
      useCases: [
        { title: "كشافة الأندية", desc: "اكتشف المواهب في أنحاء المملكة دون مغادرة مكتبك." },
        { title: "الاتحادات الوطنية", desc: "بناء خطوط المنتخبات الوطنية باختيار مدعوم بالبيانات." },
        { title: "الأكاديميات", desc: "تحديد الرياضيين الشباب الواعدين لبرامج الالتحاق." },
      ],
      howItWorks: ["تسجيل الدخول إلى لوحة تحكم الكشافة", "ضبط الفلاتر: الرياضة، المنطقة، الفئة العمرية، درجة الأداء", "تصفح ملفات الرياضيين المصنفة بالذكاء الاصطناعي", "التعمق في تقارير الأداء الفردية", "إضافة الرياضيين إلى القوائم المختصرة ومشاركتها مع فريقك"],
      cta: "افتح لوحة الكشافة", ctaLink: "/scouts",
    },
  },
  "compare": {
    num: "04", iconType: "CHART", color: "#007ABA",
    en: {
      title: "Performance Development Engine", badge: "COMPARE", headline: "Data-Driven Decisions. Every Time.",
      tagline: "Side-by-side · Radar charts · AI recommendations",
      desc: "The Performance Development Engine enables objective, side-by-side comparison of any two athletes using standardized metrics. Eliminate bias from talent selection with AI-generated scouting recommendations and visual radar charts.",
      features: ["Side-by-side athlete comparison", "Visual radar chart breakdowns", "AI-generated scouting recommendations", "Standardized metric scoring", "Historical performance trends", "Export comparison reports"],
      useCases: [
        { title: "Selection Committees", desc: "Make fair, data-backed decisions when choosing between athletes." },
        { title: "Coaches", desc: "Identify which athlete better fits a specific position or role." },
        { title: "Athletes", desc: "Benchmark yourself against peers and track your competitive standing." },
      ],
      howItWorks: ["Select two athletes from the database", "View side-by-side metric breakdowns", "Analyze radar charts for visual comparison", "Read AI-generated recommendation report", "Export the comparison for team review"],
      cta: "Compare Athletes", ctaLink: "/compare",
    },
    ar: {
      title: "محرك تطوير الأداء", badge: "المقارنة", headline: "قرارات مبنية على البيانات. في كل مرة.",
      tagline: "مقارنة جنباً إلى جنب · مخططات رادار · توصيات ذكية",
      desc: "يتيح محرك تطوير الأداء مقارنة موضوعية جنباً إلى جنب لأي رياضيين باستخدام مقاييس موحدة. أزل التحيز من اختيار المواهب بتوصيات كشف مولّدة بالذكاء الاصطناعي ومخططات رادار مرئية.",
      features: ["مقارنة الرياضيين جنباً إلى جنب", "تحليلات مخطط الرادار المرئي", "توصيات كشف مولّدة بالذكاء الاصطناعي", "تسجيل المقاييس الموحدة", "اتجاهات الأداء التاريخية", "تصدير تقارير المقارنة"],
      useCases: [
        { title: "لجان الاختيار", desc: "اتخاذ قرارات عادلة مدعومة بالبيانات عند الاختيار بين الرياضيين." },
        { title: "المدربون", desc: "تحديد الرياضي الأنسب لمركز أو دور محدد." },
        { title: "الرياضيون", desc: "قياس نفسك مقارنة بأقرانك وتتبع مكانتك التنافسية." },
      ],
      howItWorks: ["اختر رياضيين من قاعدة البيانات", "عرض تحليلات المقاييس جنباً إلى جنب", "تحليل مخططات الرادار للمقارنة المرئية", "قراءة تقرير التوصية المولّد بالذكاء الاصطناعي", "تصدير المقارنة لمراجعة الفريق"],
      cta: "قارن الرياضيين", ctaLink: "/compare",
    },
  },
  "institutes": {
    num: "05", iconType: "MINISTRY", color: "#007ABA",
    en: {
      title: "Sports Institutes", badge: "NETWORK", headline: "Connect Athletes to Their Pathways.",
      tagline: "500+ institutes · Multi-sport · Verified listings",
      desc: "The Sports Institutes module is a verified directory of sports clubs, academies, and gyms across Saudi Arabia. Athletes can discover, evaluate, and connect with the right institution for their sport, age group, and development goals.",
      features: ["500+ institutes mapped across KSA", "Multi-sport & age group filtering", "Accreditation status verification", "Direct contact & enrollment", "Location-based discovery", "Rating & review system"],
      useCases: [
        { title: "Athletes", desc: "Find the right academy or club to develop your talent in your city." },
        { title: "Parents", desc: "Discover verified, accredited sports programs for your children." },
        { title: "Federations", desc: "Monitor the quality and distribution of sports infrastructure nationwide." },
      ],
      howItWorks: ["Browse the verified institutes directory", "Filter by sport, city, age group, or accreditation", "View detailed institute profiles and facilities", "Contact institutes directly through the platform", "Enroll and track your membership status"],
      cta: "Explore Institutes", ctaLink: "/academies",
    },
    ar: {
      title: "المعاهد الرياضية", badge: "الشبكة", headline: "ربط الرياضيين بمساراتهم.",
      tagline: "أكثر من 500 معهد · متعدد الرياضات · قوائم موثقة",
      desc: "وحدة المعاهد الرياضية هي دليل موثق للأندية والأكاديميات والصالات الرياضية في أنحاء المملكة العربية السعودية. يمكن للرياضيين اكتشاف المؤسسة المناسبة لرياضتهم وفئتهم العمرية وأهداف تطورهم والتواصل معها.",
      features: ["أكثر من 500 معهد مرسوم على الخريطة", "تصفية متعددة الرياضات والفئات العمرية", "التحقق من حالة الاعتماد", "التواصل المباشر والتسجيل", "الاكتشاف القائم على الموقع", "نظام التقييم والمراجعة"],
      useCases: [
        { title: "الرياضيون", desc: "ابحث عن الأكاديمية أو النادي المناسب لتطوير موهبتك في مدينتك." },
        { title: "أولياء الأمور", desc: "اكتشف برامج رياضية موثقة ومعتمدة لأطفالك." },
        { title: "الاتحادات", desc: "مراقبة جودة وتوزيع البنية التحتية الرياضية على المستوى الوطني." },
      ],
      howItWorks: ["تصفح دليل المعاهد الموثقة", "تصفية حسب الرياضة، المدينة، الفئة العمرية، أو الاعتماد", "عرض ملفات المعاهد التفصيلية والمرافق", "التواصل مع المعاهد مباشرة عبر المنصة", "التسجيل وتتبع حالة عضويتك"],
      cta: "استكشف المعاهد", ctaLink: "/academies",
    },
  },
  "training": {
    num: "06", iconType: "TRAINING", color: "#FFA500",
    en: {
      title: "Training Hub", badge: "NEW", headline: "AI-Powered Training for Every Coach.",
      tagline: "Personalized plans · Progress tracking · AI coaching",
      desc: "The Training Hub is an AI-powered training management platform built for coaches, clubs, and academies. Generate personalized training plans, track athlete progress, manage matches and sessions, and get real-time AI coaching assistance — all in one place.",
      features: ["AI-generated personalized training plans", "Athlete progress tracking dashboard", "Match & session management", "Real-time AI coaching assistant", "Team performance analytics", "Integration with Sport Digital ID"],
      useCases: [
        { title: "Coaches", desc: "Generate and manage personalized training programs for every athlete." },
        { title: "Clubs", desc: "Coordinate team training, matches, and performance tracking at scale." },
        { title: "Athletes", desc: "Follow structured AI-designed programs and track your improvement." },
      ],
      howItWorks: ["Set up your coaching profile and team roster", "Input athlete data and performance goals", "AI generates personalized training plans", "Track sessions, matches, and progress in real time", "Get AI coaching suggestions based on performance trends"],
      cta: "Open Training Hub", ctaLink: "/training",
    },
    ar: {
      title: "مركز التدريب", badge: "جديد", headline: "تدريب ذكي لكل مدرب.",
      tagline: "خطط مخصصة · تتبع التقدم · مساعد ذكي",
      desc: "مركز التدريب هو منصة إدارة تدريب مدعومة بالذكاء الاصطناعي مبنية للمدربين والأندية والأكاديميات. أنشئ خطط تدريب مخصصة، تتبع تقدم الرياضيين، أدر المباريات والجلسات، واحصل على مساعدة تدريبية ذكية في الوقت الفعلي — كل ذلك في مكان واحد.",
      features: ["خطط تدريب مخصصة بالذكاء الاصطناعي", "لوحة تتبع تقدم الرياضيين", "إدارة المباريات والجلسات", "مساعد تدريب ذكي في الوقت الفعلي", "تحليلات أداء الفريق", "تكامل مع الهوية الرياضية الرقمية"],
      useCases: [
        { title: "المدربون", desc: "إنشاء وإدارة برامج تدريب مخصصة لكل رياضي." },
        { title: "الأندية", desc: "تنسيق تدريب الفريق والمباريات وتتبع الأداء على نطاق واسع." },
        { title: "الرياضيون", desc: "اتبع برامج منظمة مصممة بالذكاء الاصطناعي وتتبع تحسنك." },
      ],
      howItWorks: ["إعداد ملفك التدريبي وقائمة الفريق", "إدخال بيانات الرياضيين وأهداف الأداء", "الذكاء الاصطناعي يولّد خطط تدريب مخصصة", "تتبع الجلسات والمباريات والتقدم في الوقت الفعلي", "الحصول على اقتراحات تدريبية ذكية بناءً على اتجاهات الأداء"],
      cta: "افتح مركز التدريب", ctaLink: "/training",
    },
  },
};

export default function ModuleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isRTL } = useLanguage();
  const mod = moduleData[slug || ""];

  if (!mod) {
    return (
      <div className="min-h-screen bg-[#000A0F] text-white flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
        <Ada2aiNavbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <div className="text-6xl">🔍</div>
          <h1 className="text-2xl font-black font-orbitron text-white">{isRTL ? 'الوحدة غير موجودة' : 'Module Not Found'}</h1>
          <Link href="/product">
            <button className="px-6 py-3 rounded-xl font-orbitron text-sm text-[#000A0F] font-bold"
              style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)' }}>
              {isRTL ? 'العودة للمنتجات' : 'Back to Products'}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const d = isRTL ? mod.ar : mod.en;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#000A0F] text-[#EEEFEE] overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <Ada2aiNavbar />

      {/* ── HERO ── */}
      <section className="relative py-14 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 ada-grid-bg opacity-8 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${mod.color}10 0%, transparent 70%)` }} />

        <div className="relative container mx-auto max-w-4xl">
          {/* Back link */}
          <Link href="/product">
            <div className="inline-flex items-center gap-2 mb-8 text-white/40 hover:text-white/70 transition-colors cursor-pointer text-sm font-cairo">
              <BackArrow size={14} />
              <span>{isRTL ? 'العودة إلى المنتجات' : 'Back to Products'}</span>
            </div>
          </Link>

          {/* Module number + badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold font-orbitron" style={{ color: mod.color }}>{mod.num}</span>
            <span className="text-[10px] px-3 py-1 rounded font-orbitron font-bold"
              style={{ background: `${mod.color}18`, color: mod.color, border: `1px solid ${mod.color}40` }}>
              {d.badge}
            </span>
          </div>

          {/* Icon + headline */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
              <SysIcon type={mod.iconType} size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-white font-orbitron leading-tight mb-2">
                {d.headline}
              </h1>
              <p className="text-white/35 text-sm font-cairo">{d.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/55 text-base leading-relaxed font-cairo max-w-2xl mb-8">{d.desc}</p>

          {/* CTA */}
          <Link href={d.ctaLink}>
            <button className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-[#000A0F] font-orbitron tracking-wide text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: `linear-gradient(135deg, ${mod.color === '#FFA500' ? '#FFA500, #FFD700' : '#007ABA, #00DCC8'})`, boxShadow: `0 0 40px ${mod.color}25` }}>
              <span>✦</span>
              <span>{d.cta}</span>
            </button>
          </Link>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-14 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
              style={{ background: `${mod.color}08`, borderColor: `${mod.color}25` }}>
              <span className="text-[10px] font-orbitron tracking-widest" style={{ color: mod.color }}>
                {isRTL ? 'المميزات' : 'FEATURES'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white font-orbitron">
              {isRTL ? 'ما يقدمه هذا الوحدة' : 'What This Module Offers'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {d.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <CheckCircle2 size={16} style={{ color: mod.color, flexShrink: 0 }} />
                <span className="text-white/65 text-sm font-cairo">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-14 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
              style={{ background: `${mod.color}08`, borderColor: `${mod.color}25` }}>
              <span className="text-[10px] font-orbitron tracking-widest" style={{ color: mod.color }}>
                {isRTL ? 'حالات الاستخدام' : 'USE CASES'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white font-orbitron">
              {isRTL ? 'من يستفيد من هذه الوحدة؟' : 'Who Benefits?'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {d.useCases.map((uc, i) => (
              <div key={i} className="p-6 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${mod.color}12`, border: `1px solid ${mod.color}25` }}>
                  <SysIcon type={mod.iconType} size={18} />
                </div>
                <h3 className="text-white font-bold font-orbitron text-sm mb-2">{uc.title}</h3>
                <p className="text-white/45 text-xs font-cairo leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-14 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3"
              style={{ background: `${mod.color}08`, borderColor: `${mod.color}25` }}>
              <span className="text-[10px] font-orbitron tracking-widest" style={{ color: mod.color }}>
                {isRTL ? 'طريقة العمل' : 'HOW IT WORKS'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white font-orbitron">
              {isRTL ? 'خطوات بسيطة للبدء' : 'Simple Steps to Get Started'}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {d.howItWorks.map((step, i) => (
              <div key={i} className="flex items-start gap-5 p-5 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black font-orbitron text-sm"
                  style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}30`, color: mod.color }}>
                  {i + 1}
                </div>
                <p className="text-white/65 text-sm font-cairo leading-relaxed pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white font-orbitron mb-4">
            {isRTL ? 'جاهز للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-white/40 text-sm font-cairo mb-8 leading-relaxed">
            {isRTL
              ? `استكشف ${d.title} وكن جزءاً من منظومة ada2ai الرياضية.`
              : `Explore ${d.title} and become part of the ada2ai sports ecosystem.`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={d.ctaLink}>
              <button className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-[#000A0F] font-orbitron tracking-wide text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${mod.color === '#FFA500' ? '#FFA500, #FFD700' : '#007ABA, #00DCC8'})`, boxShadow: `0 0 40px ${mod.color}20` }}>
                <ExternalLink size={16} />
                <span>{d.cta}</span>
              </button>
            </Link>
            <Link href="/product">
              <button className="flex items-center gap-2 px-6 py-4 rounded-xl border text-white/50 hover:text-white/80 hover:bg-white/5 transition-all text-sm font-cairo"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {isRTL ? 'عرض جميع الوحدات' : 'View All Modules'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
