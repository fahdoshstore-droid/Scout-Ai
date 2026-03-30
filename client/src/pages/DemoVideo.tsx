import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Brain, Play, CheckCircle2, Video, Loader2, ArrowRight
} from "lucide-react";
import { Link } from "wouter";

const demoResult = {
  playerName: "لاعب فريق U14",
  ageGroup: "14 سنة",
  date: "30 مارس 2026",
  overallRating: 82,
  metrics: {
    technical: { score: 85, label: "التقنية" },
    speed: { score: 78, label: "السرعة" },
    agility: { score: 88, label: "المرونة" },
    tactical: { score: 75, label: "الوعي التكتيكي" },
    strength: { score: 72, label: "القوة" },
    endurance: { score: 80, label: "التحمل" },
  },
  strengths: [
    "التحكم الممتاز بالكرة في المسافات الضيقة",
    "السرعة في تغيير الاتجاه",
    "التنسيق مع زملاء الفريق",
  ],
  areasForImprovement: [
    "تقوية القدم الضعيفة",
    "زيادة القوة الجسدية",
  ],
  recommendation: "مستوى جيد جداً للفئة العمرية."
};

export default function DemoVideo() {
  const { isRTL, lang } = useLanguage();
  const [showReport, setShowReport] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsAnalyzing(false);
    setShowReport(true);
  };

  return (
    <div className="min-h-screen bg-[#000A0F] text-[#EEEFEE]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#000A0F]/90 border-b border-[#00DCC8]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="font-bold text-xl text-[#00DCC8]">ada2ai</div>
          </Link>
          <Link href="/">
            <button className="text-sm px-4 py-2 bg-white/5 rounded-lg">العودة</button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="pt-32 pb-16 px-4 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-[#00DCC8]/10 text-[#00DCC8] text-sm">
          DEMO
        </div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-[#00DCC8] to-[#007ABA] bg-clip-text text-transparent">
            {lang === "ar" ? "عرض توضيحي" : "Live Demo"}
          </span>
        </h1>
        <p className="text-gray-400 mb-8">تحليل فيديو حقيقي لفئة U14</p>

        {/* Video */}
        <div className="max-w-3xl mx-auto mb-8 rounded-2xl overflow-hidden border border-[#00DCC8]/20">
          <div className="aspect-video bg-black relative">
            <img src="/images/frame_0.png" alt="U14 Training" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#00DCC8]/20 border-2 border-[#00DCC8] flex items-center justify-center cursor-pointer">
                <Play size={32} fill="#00DCC8" color="#00DCC8" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <span className="flex items-center gap-2 text-sm">
                <Video size={16} color="#00DCC8" />
                IMG_3365.mp4
              </span>
              <span className="px-2 py-1 bg-[#00DCC8]/20 text-[#00DCC8] text-xs rounded">U14 • Football</span>
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        {!showReport && (
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-12 py-4 bg-[#00DCC8] text-black font-bold rounded-xl flex items-center gap-3 mx-auto hover:bg-[#00DCC8]/90 transition"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Brain size={20} />
                تحليل الفيديو
              </>
            )}
          </button>
        )}
      </div>

      {/* Report */}
      {showReport && (
        <div className="px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00DCC8]/10 text-[#00DCC8] mb-4">
                <CheckCircle2 size={18} />
                اكتمل التحليل
              </div>
              <h2 className="text-3xl font-bold mb-2">تقرير اللاعب</h2>
              <p className="text-gray-500">{demoResult.playerName} • {demoResult.ageGroup}</p>
            </div>

            {/* Rating */}
            <div className="bg-[#0A1520] rounded-2xl p-8 text-center mb-8 border border-[#00DCC8]/10">
              <div className="text-gray-500 text-sm mb-2">التقييم العام</div>
              <div className="text-7xl font-black text-[#00DCC8] font-mono">{demoResult.overallRating}</div>
              <div className="text-gray-500 text-sm">SAFF + FIFA Standard</div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {Object.values(demoResult.metrics).map((m: any, i: number) => (
                <div key={i} className="bg-[#0A1520] rounded-xl p-5 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">{m.label}</span>
                    <span className="font-bold text-xl text-[#00DCC8]">{m.score}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00DCC8] rounded-full" style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0A1520] rounded-xl p-6 border border-[#00DCC8]/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#00DCC8]/15 rounded-lg flex items-center justify-center text-[#00DCC8]">↑</span>
                  نقاط القوة
                </h3>
                <ul className="space-y-2">
                  {demoResult.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={14} className="mt-0.5 text-[#00DCC8]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0A1520] rounded-xl p-6 border border-[#FFA500]/10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#FFA500]/15 rounded-lg flex items-center justify-center text-[#FFA500]">◎</span>
                  نقاط التحسين
                </h3>
                <ul className="space-y-2">
                  {demoResult.areasForImprovement.map((a: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full mt-1.5" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/scouts">
                <button className="px-8 py-3 bg-[#00DCC8] text-black font-bold rounded-xl flex items-center gap-2 mx-auto">
                  اكتشف المزيد من اللاعبين
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
