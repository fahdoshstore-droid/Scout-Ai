import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Ada2aiNavbar from "@/components/Ada2aiNavbar";
import { Home, ArrowRight, Search, Compass } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();
  const { isRTL, lang } = useLanguage();

  const quickLinks = [
    {
      href: "/",
      labelAr: "الرئيسية",
      labelEn: "Home",
      icon: <Home size={16} />,
      color: "#00DCC8",
    },
    {
      href: "/scouts",
      labelAr: "لوحة الكشافين",
      labelEn: "Scout Dashboard",
      icon: <Search size={16} />,
      color: "#007ABA",
    },
    {
      href: "/upload",
      labelAr: "تحليل رياضي",
      labelEn: "Analyze Athlete",
      icon: <Compass size={16} />,
      color: "#FFA500",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#000A0F] text-[#EEEFEE]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Ada2aiNavbar />

      {/* Grid background */}
      <div className="absolute inset-0 ada-grid-bg opacity-20 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,220,200,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* 404 number */}
        <div
          className="font-black mb-2 select-none leading-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            fontFamily: "'Orbitron', sans-serif",
            background:
              "linear-gradient(135deg, rgba(0,220,200,0.15) 0%, rgba(0,122,186,0.08) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(0,220,200,0.12))",
          }}
        >
          404
        </div>

        {/* Divider */}
        <div
          className="w-16 h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00DCC8, transparent)",
          }}
        />

        {/* Title */}
        <h1
          className="font-black text-2xl md:text-3xl mb-4 text-[#EEEFEE]"
          style={{
            fontFamily:
              lang === "ar" ? "'Cairo', sans-serif" : "'Orbitron', sans-serif",
          }}
        >
          {lang === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h1>

        {/* Subtitle */}
        <p
          className="text-base mb-10 max-w-md"
          style={{
            color: "rgba(238,239,238,0.5)",
            fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "inherit",
            lineHeight: 1.8,
          }}
        >
          {lang === "ar"
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تحقق من الرابط أو عد للرئيسية."
            : "The page you're looking for doesn't exist or has been moved. Check the URL or head back home."}
        </p>

        {/* Primary CTA */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm mb-8 transition-all duration-200 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #00DCC8, #007ABA)",
            color: "#000A0F",
            fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "'Orbitron', sans-serif",
            boxShadow: "0 8px 24px rgba(0,220,200,0.25)",
          }}
        >
          <Home size={16} />
          {lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
          {!isRTL && <ArrowRight size={14} />}
        </button>

        {/* Quick links */}
        <div
          className="text-xs mb-5"
          style={{
            color: "rgba(238,239,238,0.3)",
            fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "inherit",
          }}
        >
          {lang === "ar" ? "أو اذهب مباشرة إلى:" : "Or jump directly to:"}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: `${link.color}10`,
                  color: link.color,
                  border: `1px solid ${link.color}30`,
                  fontFamily: lang === "ar" ? "'Cairo', sans-serif" : "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${link.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${link.color}10`;
                }}
              >
                {link.icon}
                {lang === "ar" ? link.labelAr : link.labelEn}
              </button>
            </Link>
          ))}
        </div>

        {/* Error code */}
        <div
          className="absolute bottom-8 text-xs"
          style={{
            color: "rgba(238,239,238,0.15)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          ERROR_CODE: 404 · ada2ai Platform · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
