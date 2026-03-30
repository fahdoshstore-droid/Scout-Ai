import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Brain, Play, ChevronDown, CheckCircle2,
  Video, Users, Target, TrendingUp, Shield,
  BarChart3, Award, Loader2, ArrowRight
} from "lucide-react";
import { Link } from "wouter";

// Demo analysis result from U14 training video
const demoAnalysisResult = {
  playerName: "لاعب فريق U14",
  ageGroup: "14 سنة",
  date: "30 مارس 2026",
  overallRating: 82,
  metrics: {
    technical: { score: 85, label: "التقنية", desc: "لمسات دقيقة، تحكم ممتاز بالكرة" },
    speed: { score: 78, label: "السرعة", desc: "تسارع جيد، سرعة قصوى متوسطة" },
    agility: { score: 88, label: "المرونة", desc: "مناورة ممتازة بين الأقماع" },
    tactical: { score: 75, label: "الوعي التكتيكي", desc: "وعي جيد بالمساحات، يحتاج تطوير" },
    strength: { score: 72, label: "القوة", desc: "قوة جسدية متوسطة للعمر" },
    endurance: { score: 80, label: "التحمل", desc: "تحمل ممتاز خلال الحصة" },
  },
  strengths: [
    "التحكم الممتاز بالكرة في المسافات الضيقة",
    "السرعة في تغيير الاتجاه",
    "التنسيق مع زملاء الفريق",
    "تقنية التمرير الدقيقة"
  ],
  areasForImprovement: [
    "تقوية القدم الضعيفة",
    "زيادة القوة الجسدية",
    "تحسين التسديد من مسافات بعيدة"
  ],
  recommendation: "مستوى جيد جداً للفئة العمرية. ينصح بتطوير القوة الجسدية والتكتيكية."
};

export default function Demo() {
  const { t, isRTL, lang } = useLanguage();
  const [showReport, setShowReport] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(r => setTimeout(r, 2500));
    setIsAnalyzing(false);
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-[#000A0F] text-[#EEEFEE]" dir={isRTL ? "rtl" : "ltr"}>
      <Ada2aiNavbar />

      {/* ── Demo Hero ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 ada-grid-bg opacity-30 pointer-events-none" />
        <Ada2aiNavbarSimple />
        <div className="relative container mx-auto px-4 text-center pt-16">
          <span
            className="badge-verified mb-6 inline-block"
            style={{ background: "rgba(0,220,200,0.15)", color: "#00DCC8", border: "1px solid rgba(0,220,200,0.3)" }}
          >
            🎬 DEMO
          </span>
          <h1 className="font-orbitron font-black text-4xl lg:text-6xl mb-5 leading-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #00DCC8 0%, #007ABA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {lang === "ar" ? "عرض توضيحي" : "Live Demo"}
            </span>
          </h1>
          <p
            className="text-xl mb-3 font-medium"
            style={{ color: "rgba(238,239,238,0.85)", fontFamily: "'Cairo', sans-serif" }}
          >
            {lang === "ar" ? "تحليل فيديو حقيقي لفئة U14" : "Real U14 Training Video Analysis"}
          </p>
          <p
            className="text-base max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.9 }}
          >
            {lang === "ar"
              ? "فيديو تدريبي حقيقي لفئة 14 سنة. اضغط 'تحليل' لمشاهدة تقرير SAFF + FIFA كامل."
              : "Real training video for U14 age group. Click 'Analyze' to see full SAFF + FIFA report."}
          </p>

          {/* Video Player */}
          <div className="max-w-3xl mx-auto mb-8">
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{ border: "1px solid rgba(0,220,200,0.2)", boxShadow: "0 0 40px rgba(0,220,200,0.1)" }}
            >
              {/* Video placeholder with play overlay */}
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <img
                  src="/images/frame_0.png"
                  alt="U14 Training Video"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{ background: "rgba(0,220,200,0.2)", border: "2px solid #00DCC8" }}
                  >
                    <Play size={32} fill="#00DCC8" color="#00DCC8" />
                  </div>
                </div>
                {/* Video info overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video size={16} style={{ color: "#00DCC8" }} />
                    <span className="text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      IMG_3365.mp4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded" style={{ background: "rgba(0,220,200,0.2)", color: "#00DCC8" }}>
                      U14 • Football
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          {!showReport && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-ada-primary text-base px-12 py-4 flex items-center gap-3 mx-auto mb-8"
              style={{ fontSize: "1.1rem" }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  {lang === "ar" ? "جاري التحليل..." : "Analyzing..."}
                </>
              ) : (
                <>
                  <Brain size={20} />
                  {lang === "ar" ? "تحليل الفيديو" : "Analyze Video"}
                </>
              )}
            </button>
          )}
        </div>
      </section>

      {/* ── Analysis Report ── */}
      {showReport && (
        <section className="py-16" style={{ borderTop: "1px solid rgba(0,220,200,0.06)" }}>
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Report Header */}
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ background: "rgba(0,220,200,0.1)", border: "1px solid rgba(0,220,200,0.3)" }}
              >
                <CheckCircle2 size={18} style={{ color: "#00DCC8" }} />
                <span style={{ color: "#00DCC8", fontFamily: "'Cairo', sans-serif" }}>
                  {lang === "ar" ? "اكتمل التحليل" : "Analysis Complete"}
                </span>
              </div>
              <h2 className="font-orbitron font-bold text-3xl mb-2" style={{ color: "#EEEFEE" }}>
                {lang === "ar" ? "تقرير اللاعب" : "Player Report"}
              </h2>
              <p className="text-sm" style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>
                {demoAnalysisResult.playerName} • {demoAnalysisResult.ageGroup} • {demoAnalysisResult.date}
              </p>
            </div>

            {/* Overall Rating */}
            <div className="ada-card p-8 mb-8 text-center">
              <div className="text-xs mb-2 uppercase tracking-widest" style={{ color: "rgba(238,239,238,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>
                {lang === "ar" ? "التقييم العام" : "Overall Rating"}
              </div>
              <div
                className="text-7xl font-black mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif", color: demoAnalysisResult.overallRating >= 80 ? "#00DCC8" : demoAnalysisResult.overallRating >= 60 ? "#FFA500" : "#FF4444" }}
              >
                {demoAnalysisResult.overallRating}
              </div>
              <div className="text-sm" style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>
                SAFF + FIFA Standard
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {Object.values(demoAnalysisResult.metrics).map((metric, i) => (
                <div key={i} className="ada-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs" style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>
                      {metric.label}
                    </span>
                    <span
                      className="font-black text-xl"
                      style={{ fontFamily: "'Orbitron', sans-serif", color: metric.score >= 80 ? "#00DCC8" : metric.score >= 60 ? "#FFA500" : "#FF4444" }}
                    >
                      {metric.score}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${metric.score}%`, background: metric.score >= 80 ? "#00DCC8" : metric.score >= 60 ? "#FFA500" : "#FF4444" }}
                    />
                  </div>
                  <p className="text-xs mt-2" style={{ color: "rgba(238,239,238,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Strengths & Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              <div className="ada-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(0,220,200,0.15)", color: "#00DCC8" }}
                  >
                    <TrendingUp size={16} />
                  </div>
                  <h3 className="font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "نقاط القوة" : "Strengths"}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {demoAnalysisResult.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#00DCC8" }} />
                      <span className="text-sm" style={{ color: "rgba(238,239,238,0.7)", fontFamily: "'Cairo', sans-serif" }}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="ada-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,165,0,0.15)", color: "#FFA500" }}
                  >
                    <Target size={16} />
                  </div>
                  <h3 className="font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {lang === "ar" ? "نقاط التحسين" : "Areas for Improvement"}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {demoAnalysisResult.areasForImprovement.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#FFA500" }} />
                      <span className="text-sm" style={{ color: "rgba(238,239,238,0.7)", fontFamily: "'Cairo', sans-serif" }}>
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div className="ada-card p-6 mb-8" style={{ background: "rgba(0,122,186,0.08)", border: "1px solid rgba(0,122,186,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} style={{ color: "#007ABA" }} />
                <h3 className="font-bold" style={{ fontFamily: "'Cairo', sans-serif", color: "#007ABA" }}>
                  {lang === "ar" ? "التوصية" : "Recommendation"}
                </h3>
              </div>
              <p className="text-sm" style={{ color: "rgba(238,239,238,0.8)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
                {demoAnalysisResult.recommendation}
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/scouts">
                <button className="btn-ada-primary px-8 py-3 flex items-center gap-2 mx-auto">
                  {lang === "ar" ? "اكتشف المزيد من اللاعبين" : "Discover More Athletes"}
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="py-16" style={{ borderTop: "1px solid rgba(0,220,200,0.06)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-orbitron font-bold text-2xl mb-8" style={{ color: "#EEEFEE" }}>
            {lang === "ar" ? "كيف يعمل؟" : "How It Works"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Video size={24} />, title: lang === "ar" ? "ارفع الفيديو" : "Upload Video", desc: lang === "ar" ? "حمّل فيديو التدريب أو المباراة" : "Upload training or match video" },
              { icon: <Brain size={24} />, title: lang === "ar" ? "تحليل AI" : "AI Analysis", desc: lang === "ar" ? "يحلل الأداء وفق معايير SAFF + FIFA" : "Analyzes performance using SAFF + FIFA standards" },
              { icon: <BarChart3 size={24} />, title: lang === "ar" ? "تقرير مفصل" : "Detailed Report", desc: lang === "ar" ? "احصل على تقرير شامل مع توصيات" : "Get comprehensive report with recommendations" },
            ].map((f, i) => (
              <div key={i} className="ada-card p-6 text-center">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(0,220,200,0.1)", color: "#00DCC8" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{f.title}</h3>
                <p className="text-sm" style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Ada2aiNavbarSimple() {
  const { lang } = useLanguage();
  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(0,10,15,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,220,200,0.1)" }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="font-orbitron font-black text-xl" style={{ color: "#00DCC8" }}>
            ada2ai
          </div>
        </Link>
        <Link href="/">
          <button className="text-sm px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(238,239,238,0.7)" }}>
            ← {lang === "ar" ? "العودة" : "Back"}
          </button>
        </Link>
      </div>
    </div>
  );
}
