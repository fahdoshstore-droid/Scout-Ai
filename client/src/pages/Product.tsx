import { Link } from "wouter";
import {
  Brain, Shield, Users, BarChart3, Building2, Trophy,
  ArrowRight, CheckCircle2, Zap, Globe, Cpu, Target,
  Star, Activity
} from "lucide-react";
import Ada2aiNavbar from "@/components/Ada2aiNavbar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Product() {
  const { t, lang, isRTL } = useLanguage();

  const modules = [
    {
      num: "01",
      icon: <Shield size={28} />,
      title: t("module.sportId.title"),
      badge: isRTL ? "الهوية الرقمية" : "DIGITAL IDENTITY",
      badgeColor: "#007ABA",
      headline: isRTL ? "الهوية الرياضية الرقمية الموثقة للرياضي" : "The Athlete's Verifiable Digital Identity",
      desc: t("module.sportId.desc"),
      features: isRTL
        ? ["رمز QR فريد للمشاركة الفورية", "تصور أداء بمخطط الرادار", "تاريخ أداء موثق", "جاهز للإرسال للاتحادات"]
        : ["Unique QR code for instant sharing", "Radar chart performance visualization", "Verifiable performance history", "Federation submission ready"],
      link: "/upload", cta: isRTL ? "عرض مثال" : "View Example",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/other-sports_f2223de7.png",
    },
    {
      num: "02",
      icon: <Brain size={28} />,
      title: t("module.aiEngine.title"),
      badge: isRTL ? "الوحدة الأساسية" : "CORE MODULE",
      badgeColor: "#00DCC8",
      headline: isRTL ? "تقرير رياضي احترافي في ثوانٍ" : "Professional Athlete Report in Seconds",
      desc: t("module.aiEngine.desc"),
      features: isRTL
        ? ["تحليل متعدد المقاييس", "تقرير احترافي موحد", "يعمل مع أي رياضة وأي جهاز", "دعم ثنائي اللغة"]
        : ["Multi-metric performance analysis", "Standardized professional report", "Works with any sport, any device", "Bilingual Arabic/English output"],
      link: "/upload", cta: isRTL ? "جرّب مجاناً" : "Try Free Demo",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/football_0d0c7b9e.png",
    },
    {
      num: "03",
      icon: <Users size={28} />,
      title: t("module.scouts.title"),
      badge: isRTL ? "اكتشاف المواهب" : "TALENT DISCOVERY",
      badgeColor: "#00DCC8",
      headline: isRTL ? "اكتشف المواهب الإقليمية على نطاق واسع" : "Discover Regional Talent at Scale",
      desc: t("module.scouts.desc"),
      features: isRTL
        ? ["بحث متعدد المعايير", "تغطية جميع مناطق المملكة", "تصفية حسب الرياضة والعمر", "تصدير تقارير احترافية"]
        : ["Multi-metric filter search", "Coverage across all KSA regions", "Sport & age category filtering", "Export professional reports"],
      link: "/scouts", cta: isRTL ? "استكشف اللوحة" : "Explore Dashboard",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/basketball_0451a053.png",
    },
    {
      num: "04",
      icon: <BarChart3 size={28} />,
      title: t("module.compare.title"),
      badge: isRTL ? "التحليلات" : "ANALYTICS",
      badgeColor: "#FFA500",
      headline: isRTL ? "مقارنة موضوعية جنباً إلى جنب بين الرياضيين" : "Objective Side-by-Side Athlete Comparison",
      desc: t("module.compare.desc"),
      features: isRTL
        ? ["تراكب مزدوج لمخطط الرادار", "مقارنة مقياس بمقياس", "توصيات مولدة بالذكاء الاصطناعي", "تقارير مقارنة قابلة للمشاركة"]
        : ["Dual radar chart overlay", "Side-by-side metric comparison", "AI-generated recommendations", "Shareable comparison reports"],
      link: "/compare", cta: isRTL ? "قارن الرياضيين" : "Compare Athletes",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/boxing_ed80ecdb.png",
    },
    {
      num: "05",
      icon: <Building2 size={28} />,
      title: t("module.institutes.title"),
      badge: isRTL ? "الشبكة" : "NETWORK",
      badgeColor: "#007ABA",
      headline: isRTL ? "ربط الرياضيين بمساراتهم" : "Connect Athletes to Their Pathways",
      desc: t("module.institutes.desc"),
      features: isRTL
        ? ["أكثر من 500 معهد مرسوم على الخريطة", "تصفية متعددة الرياضات والفئات العمرية", "التحقق من حالة الاعتماد", "التواصل المباشر والتسجيل"]
        : ["500+ institutes mapped across KSA", "Multi-sport & age group filtering", "Accreditation status verification", "Direct contact & enrollment"],
      link: "/academies", cta: isRTL ? "ابحث عن شركاء" : "Find Partners",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/swimming_e1ebf2aa.png",
    },
    {
      num: "06",
      icon: <Trophy size={28} />,
      title: t("module.training.title"),
      badge: isRTL ? "جديد" : "NEW",
      badgeColor: "#FFA500",
      headline: isRTL ? "منصة تدريب ذكية للمدربين والأندية" : "AI-Powered Training Platform for Coaches & Clubs",
      desc: t("module.training.desc"),
      features: isRTL
        ? ["خطط تدريب مخصصة بالذكاء الاصطناعي", "تتبع تقدم الرياضيين", "إدارة المباريات والجلسات", "مساعد تدريب فوري بالدردشة"]
        : ["AI-generated personalized training plans", "Athlete progress tracking", "Match & session management", "Real-time AI coaching assistant"],
      link: "/training", cta: isRTL ? "استكشف مركز التدريب" : "Explore Training Hub",
      img: "https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/freediving_a7b6b82b.png",
    },
  ];

  const techStack = [
    { name: isRTL ? "محرك الذكاء الاصطناعي" : "AI Vision Engine", desc: isRTL ? "نموذج ذكاء اصطناعي متقدم لتحليل الرياضيين" : "Advanced AI model for multi-sport athlete analysis", icon: <Brain size={20} />, color: "#00DCC8" },
    { name: isRTL ? "معايير الحوكمة" : "Governance Standards", desc: isRTL ? "متوافق مع معايير الاتحادات الرياضية الوطنية" : "Aligned with national sports federation benchmarks", icon: <Trophy size={20} />, color: "#007ABA" },
    { name: isRTL ? "خرائط جوجل" : "Google Maps API", desc: isRTL ? "تحديد موقع المعاهد في الوقت الفعلي" : "Real-time institute geolocation", icon: <Globe size={20} />, color: "#FFA500" },
    { name: isRTL ? "تخزين سحابي" : "S3 Cloud Storage", desc: isRTL ? "تخزين آمن للوسائط والتقارير" : "Secure media and report storage", icon: <Cpu size={20} />, color: "#00DCC8" },
    { name: isRTL ? "تصميم عربي أولاً" : "Arabic-First Design", desc: isRTL ? "تخطيط RTL ومخرجات عربية" : "RTL layout and Arabic output", icon: <Star size={20} />, color: "#007ABA" },
    { name: isRTL ? "رؤية 2030" : "Vision 2030 Aligned", desc: isRTL ? "تكامل مع الأجندة الرياضية الوطنية" : "National sports agenda integration", icon: <Target size={20} />, color: "#FFA500" },
  ];

  return (
    <div
      className="min-h-screen bg-[#000A0F] text-[#EEEFEE] overflow-x-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Ada2aiNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 ada-grid-bg opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,122,186,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <span className="badge-verified mb-5 inline-block">
            {isRTL ? "نظرة عامة على المنصة" : "Platform Overview"}
          </span>
          <h1 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl mb-6">
            <span style={{ background: "linear-gradient(135deg, #00DCC8 0%, #007ABA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ada2ai
            </span>
            <span className="text-[#EEEFEE]"> {isRTL ? "المنصة" : "Platform"}</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.9 }}
          >
            {isRTL
              ? "ست وحدات متكاملة. منصة موحدة. اكتشاف مواهب رياضية شامل بالذكاء الاصطناعي لكل رياضة وكل رياضي في كل منطقة."
              : "Six integrated modules. One unified platform. Complete AI-powered talent discovery for every sport, every athlete, every region."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/upload">
              <button className="btn-ada-primary text-sm px-8 py-3.5 flex items-center gap-2">
                <Zap size={16} /> {isRTL ? "ابدأ التحليل مجاناً" : "Start Free Analysis"}
              </button>
            </Link>
            <Link href="/scouts">
              <button className="btn-ada-outline text-sm px-8 py-3.5 flex items-center gap-2">
                <Users size={16} /> {isRTL ? "للكشافين" : "For Scouts"}
              </button>
            </Link>
          </div>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10">
            {[
              { val: "6", label: isRTL ? "وحدات متكاملة" : "Integrated Modules", color: "#00DCC8" },
              { val: "12+", label: isRTL ? "معيار أداء" : "Performance Metrics", color: "#007ABA" },
              { val: "6", label: isRTL ? "رياضات مدعومة" : "Sports Supported", color: "#FFA500" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-black text-3xl mb-1" style={{ color: s.color, fontFamily: "'Orbitron', sans-serif" }}>{s.val}</div>
                <div className="text-xs" style={{ color: "rgba(238,239,238,0.45)", fontFamily: "'Cairo', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ──────────────────────────────────────────────────── */}
      <section className="py-16" style={{ borderTop: "1px solid rgba(0,220,200,0.06)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-10 max-w-5xl mx-auto">
            {modules.map((m, i) => (
              <div
                key={i}
                className="ada-card overflow-hidden reveal"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Accent top bar */}
                <div style={{ height: "3px", background: `linear-gradient(90deg, ${m.badgeColor}, transparent)` }} />

                <div className="p-6 lg:p-8">
                  <div className={`flex flex-col lg:flex-row gap-8 items-start ${i % 2 === 1 && !isRTL ? "lg:flex-row-reverse" : ""}`}>
                    {/* Left: icon + number */}
                    <div className="flex-shrink-0 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-3">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: `${m.badgeColor}15`, color: m.badgeColor }}
                      >
                        {m.icon}
                      </div>
                      <div>
                        <div
                          className="font-black text-4xl"
                          style={{ color: m.badgeColor, fontFamily: "'Orbitron', sans-serif", opacity: 0.25, lineHeight: 1 }}
                        >
                          {m.num}
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded mt-1 inline-block"
                          style={{
                            background: `${m.badgeColor}18`,
                            color: m.badgeColor,
                            border: `1px solid ${m.badgeColor}40`,
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.6rem",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {m.badge}
                        </span>
                      </div>
                    </div>

                    {/* Center: main content */}
                    <div className="flex-1">
                      <h2
                        className="font-bold text-xl lg:text-2xl mb-1 text-[#EEEFEE]"
                        style={{ fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "'Orbitron', sans-serif" }}
                      >
                        {m.title}
                      </h2>
                      <h3
                        className="text-sm mb-4 font-semibold"
                        style={{ color: m.badgeColor, fontFamily: "'Cairo', sans-serif" }}
                      >
                        {m.headline}
                      </h3>
                      <p
                        className="text-sm mb-5"
                        style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.9 }}
                      >
                        {m.desc}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {m.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle2 size={13} style={{ color: m.badgeColor, flexShrink: 0 }} />
                            <span
                              className="text-xs"
                              style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif" }}
                            >
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Link href={m.link}>
                        <button
                          className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
                          style={{
                            background: `${m.badgeColor}15`,
                            color: m.badgeColor,
                            border: `1px solid ${m.badgeColor}30`,
                            fontFamily: "'Cairo', sans-serif",
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${m.badgeColor}28`; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${m.badgeColor}15`; }}
                        >
                          {m.cta} <ArrowRight size={13} />
                        </button>
                      </Link>
                    </div>

                    {/* Right: sport logo */}
                    <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                      <div
                        className="w-28 h-28 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${m.badgeColor}07`,
                          border: `1px solid ${m.badgeColor}18`,
                          boxShadow: `0 0 30px ${m.badgeColor}08`,
                        }}
                      >
                        <img
                          src={m.img}
                          alt={m.title}
                          className="w-18 h-18 object-contain"
                          style={{ width: "72px", height: "72px", opacity: 0.85 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "rgba(0,10,15,0.7)", borderTop: "1px solid rgba(0,220,200,0.08)" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge-pro mb-4 inline-block">
              {isRTL ? "التقنية" : "Technology"}
            </span>
            <h2 className="font-orbitron font-bold text-2xl lg:text-3xl mb-4 text-[#EEEFEE]">
              {isRTL ? (
                <>مبني على بنية تحتية<br /><span style={{ color: "#00DCC8" }}>ذكاء اصطناعي عالمية المستوى</span></>
              ) : (
                <>Built on World-Class<br /><span style={{ color: "#00DCC8" }}>AI Infrastructure</span></>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {techStack.map((item, i) => (
              <div key={i} className="ada-card p-5 flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm text-[#EEEFEE] mb-0.5"
                    style={{ fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "'Orbitron', sans-serif", fontSize: "0.75rem" }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-orbitron font-bold text-3xl mb-5 text-[#EEEFEE]">
            {isRTL ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p
            className="text-base mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.9 }}
          >
            {isRTL
              ? "جرّب تحليل الذكاء الاصطناعي مجاناً — لا يلزم التسجيل."
              : "Try the AI analysis demo for free — no registration required."}
          </p>
          <Link href="/upload">
            <button className="btn-ada-primary text-sm px-10 py-4 flex items-center gap-2 mx-auto">
              <Zap size={16} />
              {isRTL ? "تحليل رياضي الآن — مجاناً" : "Analyze Athlete Now — Free"}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#000A0F" }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs" style={{ color: "rgba(238,239,238,0.3)", fontFamily: "'Cairo', sans-serif" }}>
            {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}
