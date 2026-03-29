'use client';
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import {
  Brain, Shield, Users, BarChart3, Building2, Trophy,
  ArrowRight, Zap, Globe, Cpu, Target,
  Star, Activity, IdCard, Upload, Search, Link2,
  CheckCircle2, BarChart2
} from "lucide-react";
import Ada2aiNavbar from "@/components/Ada2aiNavbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

/* ── SVG System Icons (from SportID design) ── */
function SysIcon({ type, size = 16 }: { type: string; size?: number }) {
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

export default function Product() {
  const { isRTL, t } = useLanguage();
  const [, navigate] = useLocation();
  const [showNafath, setShowNafath] = useState(false);
  const [nafathId, setNafathId] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Waitlist form state
  const [wlName, setWlName] = useState('');
  const [wlEmail, setWlEmail] = useState('');
  const [wlRole, setWlRole] = useState<'athlete'|'scout'|'coach'|'academy'|'federation'|'other'>('athlete');
  const [wlSport, setWlSport] = useState('');
  const [wlSubmitted, setWlSubmitted] = useState(false);
  const joinWaitlist = trpc.waitlist.join.useMutation({
    onSuccess: () => setWlSubmitted(true),
    onError: (err) => toast.error(isRTL ? `خطأ: ${err.message}` : `Error: ${err.message}`),
  });

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wlName || !wlEmail) return;
    joinWaitlist.mutate({ name: wlName, email: wlEmail, role: wlRole, sport: wlSport || undefined });
  }

  async function handleNafathVerify() {
    setVerifying(true);
    await new Promise(r => setTimeout(r, 2200));
    setVerifying(false);
    setShowNafath(false);
  }

  const metrics = [
    { label: isRTL ? 'السرعة' : 'Speed', val: 88, color: '#00DCC8' },
    { label: isRTL ? 'القوة' : 'Strength', val: 82, color: '#007ABA' },
    { label: isRTL ? 'التقنية' : 'Technique', val: 92, color: '#00DCC8' },
    { label: isRTL ? 'التحمل' : 'Endurance', val: 79, color: '#007ABA' },
  ];

  const modules = [
    {
      num: "01",
      iconType: "USER_TRACK",
      title: t("module.scouts.title"),
      badge: isRTL ? "اكتشاف المواهب" : "TALENT DISCOVERY",
      color: "#FFA500",
      headline: isRTL ? "اكتشف المواهب الإقليمية على نطاق واسع" : "Discover Regional Talent at Scale",
      desc: t("module.scouts.desc"),
      features: isRTL
        ? ["بحث متعدد المعايير", "تغطية جميع مناطق المملكة", "تصفية حسب الرياضة والعمر", "تصدير تقارير احترافية"]
        : ["Multi-metric filter search", "Coverage across all KSA regions", "Sport & age category filtering", "Export professional reports"],
      link: "/modules/scouts",
    },
    {
      num: "02",
      iconType: "USER_TRACK",
      title: t("module.sportId.title"),
      badge: isRTL ? "الهوية الرقمية" : "DIGITAL IDENTITY",
      color: "#00DCC8",
      headline: isRTL ? "الهوية الرياضية الرقمية الموثقة للرياضي" : "The Athlete's Verifiable Digital Identity",
      desc: t("module.sportId.desc"),
      features: isRTL
        ? ["هوية رياضية موثقة عبر نفاذ", "تسجيل حضور QR فوري في المنشآت", "نقاط رياضية وتتبع الأداء", "تقارير وتحليلات مباشرة للوزارة"]
        : ["Nafath-verified sport identity", "Instant QR check-in at facilities", "Sport Points & performance tracking", "Live ministry reporting & analytics"],      link: "/modules/sport-id",
    },
    {
      num: "03",
      iconType: "AI_ANALYTICS",
      title: t("module.aiEngine.title"),
      badge: isRTL ? "الوحدة الأساسية" : "CORE MODULE",
      color: "#007ABA",
      headline: isRTL ? "تقرير رياضي احترافي في ثوانٍ" : "Professional Athlete Report in Seconds",
      desc: t("module.aiEngine.desc"),
      features: isRTL
        ? ["تحليل متعدد المقاييس", "تقرير احترافي موحد", "يعمل مع أي رياضة وأي جهاز", "دعم ثنائي اللغة"]
        : ["Multi-metric performance analysis", "Standardized professional report", "Works with any sport, any device", "Bilingual Arabic/English output"],
      link: "/modules/ai-engine",
    },
    {
      num: "04",
      iconType: "TRAINING",
      title: t("module.training.title"),
      badge: isRTL ? "مركز التدريب" : "TRAINING HUB",
      color: "#FFA500",
      headline: isRTL ? "منصة تدريب ذكية للمدربين والأندية" : "AI-Powered Training Platform for Coaches & Clubs",
      desc: t("module.training.desc"),
      features: isRTL
        ? ["خطط تدريب مخصصة بالذكاء الاصطناعي", "تتبع تقدم الرياضيين", "إدارة المباريات والجلسات", "مساعد تدريب فوري بالدردشة"]
        : ["AI-generated personalized training plans", "Athlete progress tracking", "Match & session management", "Real-time AI coaching assistant"],
      link: "/modules/training",
    },
    {
      num: "05",
      iconType: "CHART",
      title: t("module.compare.title"),
      badge: isRTL ? "التحليلات" : "ANALYTICS",
      color: "#00DCC8",
      headline: isRTL ? "مقارنة موضوعية جنباً إلى جنب بين الرياضيين" : "Objective Side-by-Side Athlete Comparison",
      desc: t("module.compare.desc"),
      features: isRTL
        ? ["تراكب مزدوج لمخطط الرادار", "مقارنة مقياس بمقياس", "توصيات مولدة بالذكاء الاصطناعي", "تقارير مقارنة قابلة للمشاركة"]
        : ["Dual radar chart overlay", "Side-by-side metric comparison", "AI-generated recommendations", "Shareable comparison reports"],
      link: "/modules/compare",
    },
    {
      num: "06",
      iconType: "MINISTRY",
      title: t("module.institutes.title"),
      badge: isRTL ? "الاحتراف" : "PRO CAREER",
      color: "#007ABA",
      headline: isRTL ? "ربط الرياضيين بمساراتهم" : "Connect Athletes to Their Pathways",
      desc: t("module.institutes.desc"),
      features: isRTL
        ? ["أكثر من 500 معهد مرسوم على الخريطة", "تصفية متعددة الرياضات والفئات العمرية", "التحقق من حالة الاعتماد", "التواصل المباشر والتسجيل"]
        : ["500+ institutes mapped across KSA", "Multi-sport & age group filtering", "Accreditation status verification", "Direct contact & enrollment"],
      link: "/modules/institutes",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#000A0F] text-[#EEEFEE] overflow-x-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Ada2aiNavbar />

      {/* ══════════════════════════════════════════════════════════════
          HERO — Cinematic Athlete Card + Marketing Content
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-10 lg:py-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 ada-grid-bg opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,122,186,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

            {/* LEFT — Cinematic Athlete Card */}
            <div
              className={`relative rounded-2xl overflow-hidden order-2 lg:order-1 ${isRTL ? "lg:order-2" : "lg:order-1"}`}
              style={{
                height: '520px',
                background: 'linear-gradient(155deg, #071828 0%, #050e18 50%, #000e10 100%)',
                boxShadow: '0 0 80px rgba(0,122,186,0.18), 0 0 160px rgba(0,220,200,0.08)',
                border: '1px solid rgba(0,220,200,0.12)',
                animation: 'border-glow-pulse 3s ease-in-out infinite',
              }}
            >
              {/* Athlete photo */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/115062705/gJEX8KKv2DgTKGvafGwXZn/saudi-athlete_a8a3434a.jpg"
                alt="Athlete"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: 0.82, mixBlendMode: 'luminosity' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />

              {/* Depth gradient overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(180deg, rgba(0,10,15,0.28) 0%, rgba(0,10,15,0.05) 30%, rgba(0,10,15,0.5) 65%, rgba(0,10,15,0.97) 100%)',
              }} />
              {/* Side vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(90deg, rgba(0,10,15,0.5) 0%, transparent 25%, transparent 75%, rgba(0,10,15,0.5) 100%)',
              }} />
              {/* Tech grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                opacity: 0.05,
                backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(0,220,200,1) 47px,rgba(0,220,200,1) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,rgba(0,220,200,1) 47px,rgba(0,220,200,1) 48px)',
              }} />

              {/* Animated scan line */}
              <div className="absolute left-0 right-0 pointer-events-none z-20" style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,220,200,0.0) 10%, rgba(0,220,200,0.6) 50%, rgba(0,220,200,0.0) 90%, transparent 100%)',
                animation: 'card-scan-line 4s ease-in-out infinite',
                boxShadow: '0 0 12px rgba(0,220,200,0.5)',
              }} />

              {/* Data stream particles */}
              {[{left:'15%',delay:'0s',dur:'3s'},{left:'35%',delay:'1.2s',dur:'2.5s'},{left:'60%',delay:'0.6s',dur:'3.5s'},{left:'80%',delay:'1.8s',dur:'2.8s'}].map((p,i)=>(
                <div key={i} className="absolute bottom-0 pointer-events-none z-10" style={{
                  left: p.left, width: '1px', height: '40px',
                  background: 'linear-gradient(0deg, transparent, rgba(0,220,200,0.4), transparent)',
                  animation: `data-stream ${p.dur} ease-in-out infinite`,
                  animationDelay: p.delay,
                }} />
              ))}

              {/* Corner brackets */}
              {(['top-4 left-4 border-t-2 border-l-2','top-4 right-4 border-t-2 border-r-2','bottom-20 left-4 border-b-2 border-l-2','bottom-20 right-4 border-b-2 border-r-2'] as const).map((cls, i) => (
                <div key={i} className={`absolute w-7 h-7 ${cls}`} style={{ borderColor: 'rgba(0,220,200,0.5)' }} />
              ))}

              {/* LIVE TRACKING badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border" style={{ background: 'rgba(0,10,15,0.75)', borderColor: 'rgba(0,220,200,0.3)' }}>
                  <span className="w-2 h-2 rounded-full bg-[#00DCC8] animate-pulse" />
                  <span className="text-[#00DCC8] text-[10px] font-orbitron tracking-widest font-bold">
                    {isRTL ? 'تتبع مباشر' : 'LIVE TRACKING'}
                  </span>
                </div>
              </div>

              {/* Overall score */}
              <div className="absolute top-14 left-5 z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center backdrop-blur-md border"
                  style={{ background: 'rgba(0,10,15,0.75)', borderColor: 'rgba(0,220,200,0.25)' }}
                >
                  <span className="text-[#00DCC8] text-2xl font-black font-orbitron leading-none">92</span>
                  <span className="text-white/30 text-[9px] font-cairo mt-0.5">/100</span>
                </div>
              </div>

              {/* Metric bars */}
              <div className="absolute top-14 right-5 z-10 space-y-2 w-32">
                {metrics.map(m => (
                  <div key={m.label} className="rounded-xl px-3 py-2 backdrop-blur-md border" style={{ background: 'rgba(0,10,15,0.7)', borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-white/45 text-[9px] font-cairo">{m.label}</span>
                      <span className="text-[9px] font-orbitron font-bold" style={{ color: m.color }}>{m.val}</span>
                    </div>
                    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className="h-full rounded-full" style={{ width: `${m.val}%`, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom info panel */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="px-5 pt-4 pb-5" style={{ background: 'linear-gradient(0deg, rgba(0,10,15,1) 0%, rgba(0,10,15,0.9) 80%, transparent 100%)' }}>
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="text-white font-black text-xl font-orbitron leading-tight">Ahmed Al-Shamri</div>
                      <div className="text-white/40 text-xs font-cairo mt-1">
                        {isRTL ? 'عداء · ألعاب القوى' : 'Sprinter · Athletics'}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border" style={{ background: 'rgba(34,197,94,0.1)', borderColor: 'rgba(34,197,94,0.25)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[9px] font-orbitron font-bold">
                        {isRTL ? 'موثق' : 'VERIFIED'}
                      </span>
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {metrics.map(m => (
                      <div key={m.label} className="text-center">
                        <div className="text-sm font-black font-orbitron" style={{ color: m.color }}>{m.val}</div>
                        <div className="text-white/30 text-[8px] font-cairo mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* ID strip + QR */}
                  <div className="pt-3 border-t flex items-center justify-between gap-2.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)' }}>
                        <span className="text-white text-[10px] font-black font-orbitron">A</span>
                      </div>
                      <span className="text-white/20 text-[9px] font-orbitron tracking-widest">
                        ADA2AI · SPORT PASSPORT ID · ATH-9841
                      </span>
                    </div>
                    {/* QR Code SVG */}
                    <div className="relative flex-shrink-0" style={{ width: 44, height: 44 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* QR border glow */}
                        <rect x="0.5" y="0.5" width="43" height="43" rx="3.5" stroke="#00DCC8" strokeOpacity="0.4" fill="rgba(0,10,15,0.85)"/>
                        {/* Top-left finder */}
                        <rect x="4" y="4" width="13" height="13" rx="1" fill="none" stroke="#00DCC8" strokeWidth="1.5"/>
                        <rect x="6.5" y="6.5" width="8" height="8" rx="0.5" fill="#00DCC8" fillOpacity="0.9"/>
                        {/* Top-right finder */}
                        <rect x="27" y="4" width="13" height="13" rx="1" fill="none" stroke="#00DCC8" strokeWidth="1.5"/>
                        <rect x="29.5" y="6.5" width="8" height="8" rx="0.5" fill="#00DCC8" fillOpacity="0.9"/>
                        {/* Bottom-left finder */}
                        <rect x="4" y="27" width="13" height="13" rx="1" fill="none" stroke="#00DCC8" strokeWidth="1.5"/>
                        <rect x="6.5" y="29.5" width="8" height="8" rx="0.5" fill="#00DCC8" fillOpacity="0.9"/>
                        {/* Data modules - row 1 */}
                        <rect x="20" y="4" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="24" y="4" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        {/* Data modules - row 2 */}
                        <rect x="20" y="8" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="24" y="8" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        {/* Data modules - row 3 */}
                        <rect x="20" y="12" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        {/* Data modules - bottom right area */}
                        <rect x="20" y="20" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="24" y="20" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="28" y="20" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="32" y="20" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="36" y="20" width="4" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="20" y="24" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="28" y="24" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="36" y="24" width="4" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="20" y="28" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="24" y="28" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="32" y="28" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="20" y="32" width="3" height="3" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="28" y="32" width="3" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="36" y="32" width="4" height="3" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="20" y="36" width="3" height="4" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        <rect x="24" y="36" width="3" height="4" rx="0.3" fill="#007ABA" fillOpacity="0.7"/>
                        <rect x="32" y="36" width="3" height="4" rx="0.3" fill="#00DCC8" fillOpacity="0.7"/>
                        {/* Scan line animation */}
                        <rect x="2" y="22" width="40" height="1" rx="0.5" fill="#00DCC8" fillOpacity="0.35"
                          style={{animation:'qr-scan 2s ease-in-out infinite'}} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Marketing Content */}
            <div className={`flex flex-col gap-6 order-1 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border" style={{ background: 'rgba(0,122,186,0.1)', borderColor: 'rgba(0,122,186,0.3)' }}>
                <span className="w-2 h-2 rounded-full bg-[#00DCC8] animate-pulse" />
                <span className="text-[#00DCC8] text-[11px] font-orbitron font-bold tracking-widest">
                  {isRTL ? 'الهوية الرياضية الرقمية' : 'SPORT DIGITAL ID'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-[50px] font-black text-white leading-[1.05] font-orbitron">
                {isRTL ? (
                  <>
                    كل رياضي
                    <br />يستحق
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      هوية رقمية
                    </span>
                  </>
                ) : (
                  <>
                    Every Athlete
                    <br />Deserves a
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Digital Identity
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-white/50 text-base leading-relaxed font-cairo max-w-[440px]">
                {isRTL
                  ? 'ada2ai تمنح كل رياضي سعودي هوية رقمية موحدة — موثقة، مرتبطة ببيانات الأداء الحقيقية، ومعترف بها رسمياً.'
                  : 'ada2ai gives every Saudi athlete a unified digital identity — verified, linked to real performance data, and officially recognized.'}
              </p>

              {/* Feature cards — creative expanded design */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    num: '01',
                    icon: 'USER_TRACK',
                    en: 'Nafath-Verified Identity',
                    ar: 'هوية موثقة عبر نفاذ',
                    descEn: 'Every athlete gets an official digital passport linked to the national Nafath system.',
                    descAr: 'جواز رياضي رسمي مرتبط بمنظومة نفاذ الوطنية لكل رياضي.',
                    accent: '#007ABA',
                    route: '/features/nafath',
                  },
                  {
                    num: '02',
                    icon: 'QR_VERIFY',
                    en: 'Instant QR Check-In',
                    ar: 'تسجيل حضور QR فوري',
                    descEn: 'Scan once to enter any facility — no paperwork, no delays, under 3 seconds.',
                    descAr: 'مسح واحد للدخول لأي منشأة — بدون أوراق، بدون تأخير، في أقل من 3 ثواني.',
                    accent: '#00DCC8',
                    route: '/features/qr-checkin',
                  },
                  {
                    num: '03',
                    icon: 'POWER_STAT',
                    en: 'Sport Points & Performance',
                    ar: 'نقاط رياضية وتتبع الأداء',
                    descEn: 'AI-powered scoring tracks 12+ performance metrics in real time across all sports.',
                    descAr: 'نظام تسجيل مدعوم بالذكاء الاصطناعي يتتبع أكثر من 12 مقياساً فورياً.',
                    accent: '#007ABA',
                    route: '/features/sport-points',
                  },
                  {
                    num: '04',
                    icon: 'MINISTRY',
                    en: 'Ministry Live Analytics',
                    ar: 'تحليلات مباشرة للوزارة',
                    descEn: 'Real-time dashboards give sports authorities instant visibility across all athletes.',
                    descAr: 'لوحات تحكم فورية تمنح الجهات الرسمية رؤية شاملة لجميع الرياضيين.',
                    accent: '#00DCC8',
                    route: '/features/ministry-report',
                  },
                ].map((f, idx) => (
                  <div key={f.num}
                    className="group relative flex items-stretch gap-0 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      borderColor: 'rgba(255,255,255,0.06)',
                    }}
                    onClick={() => navigate(f.route)}
                  >
                    {/* Left accent strip with number */}
                    <div
                      className="flex flex-col items-center justify-center px-4 py-4 shrink-0 relative"
                      style={{
                        background: `linear-gradient(180deg, ${f.accent}22 0%, ${f.accent}08 100%)`,
                        borderRight: `1px solid ${f.accent}30`,
                        minWidth: '56px',
                      }}
                    >
                      {/* Glowing dot */}
                      <div className="w-1.5 h-1.5 rounded-full mb-2" style={{ background: f.accent, boxShadow: `0 0 8px ${f.accent}` }} />
                      <span
                        className="font-orbitron font-black text-xs tracking-widest"
                        style={{ color: f.accent, writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.15em' }}
                      >{f.num}</span>
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: f.accent, opacity: 0.3 }} />
                    </div>

                    {/* Main content */}
                    <div className="flex items-center gap-3 px-4 py-3.5 flex-1">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                          background: `${f.accent}18`,
                          border: `1px solid ${f.accent}35`,
                          boxShadow: `0 0 16px ${f.accent}15`,
                        }}
                      >
                        <SysIcon type={f.icon} size={18} />
                      </div>

                      {/* Text */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white/90 text-sm font-bold font-cairo leading-tight">
                          {isRTL ? f.ar : f.en}
                        </span>
                        <span className="text-white/35 text-xs font-cairo leading-relaxed">
                          {isRTL ? f.descAr : f.descEn}
                        </span>
                      </div>
                    </div>

                    {/* Right glow on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: `linear-gradient(90deg, transparent 60%, ${f.accent}08 100%)`, border: `1px solid ${f.accent}20` }}
                    />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => { setNafathId(''); setShowNafath(true); }}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl font-black text-[#000A0F] font-orbitron tracking-wide text-base transition-all hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #007ABA 0%, #00DCC8 100%)',
                    boxShadow: '0 0 40px rgba(0,220,200,0.2)',
                  }}
                >
                  <span className="text-lg">✦</span>
                  <span>{isRTL ? 'جرّب الآن' : 'TRY IT NOW'}</span>
                </button>
                <Link href="/scouts">
                  <button className="flex items-center gap-2 px-6 py-4 rounded-xl border text-white/55 hover:text-white/80 hover:bg-white/5 transition-all text-sm font-cairo"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    {isRTL ? 'عرض لوحة التحكم' : 'View Dashboard'}
                  </button>
                </Link>
              </div>

              {/* Trust line */}
              <p className="text-white/20 text-xs font-cairo">
                {isRTL
                  ? '🔐 متوافق مع رؤية 2030 · سيادة البيانات السعودية'
                  : '🔐 Vision 2030 aligned · Saudi data sovereignty'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6 MODULES — Detailed cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ borderBottom: '1px solid rgba(0,220,200,0.06)' }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="badge-verified mb-4 inline-block">
              {isRTL ? "وحدات المنصة" : "Platform Modules"}
            </span>
            <h2 className="font-orbitron font-bold text-2xl lg:text-3xl text-[#EEEFEE] mb-4">
              {isRTL ? "6 منتجات، منصة واحدة" : "6 Products. One Platform."}
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(238,239,238,0.45)', fontFamily: "'Cairo', sans-serif", lineHeight: 1.9 }}>
              {isRTL
                ? 'من الاكتشاف إلى الاحتراف — وللرياضيين والكشافة والمدربين.'
                : 'From discovery to professionalism — for athletes, scouts, and coaches.'}
            </p>
          </div>
          {/* منظومة Ada2ai — Pipeline Flow */}
          <motion.div
            className="mt-8 mb-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#00DCC8", fontFamily: "'Space Grotesk', sans-serif" }}>
                {isRTL ? "مسار الرياضي من الاكتشاف إلى الاحتراف" : "Athlete Journey: Discovery to Pro"}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-0" dir="rtl">
              {[
                { label: isRTL ? "تحليل اللاعب" : "Scout AI",        color: "#00DCC8", num: "01" },
                { label: isRTL ? "هوية رياضية" : "Sport ID",         color: "#007ABA", num: "02" },
                { label: isRTL ? "لوحة المدرب" : "Coach Dashboard",  color: "#00DCC8", num: "03" },
                { label: isRTL ? "مركز التدريب" : "Training Hub",     color: "#007ABA", num: "04" },
                { label: isRTL ? "لوحة الكشاف" : "Scout Dashboard",  color: "#00DCC8", num: "05" },
                { label: isRTL ? "الاحتراف" : "Pro Career",         color: "#FFD700", num: "★" },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-black text-sm"
                      style={{
                        background: `${step.color}15`,
                        border: `2px solid ${step.color}50`,
                        color: step.color,
                        fontFamily: "'Space Grotesk', sans-serif",
                        boxShadow: `0 0 18px ${step.color}20`,
                      }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="text-xs font-semibold text-center leading-tight"
                      style={{ color: "rgba(238,239,238,0.75)", fontFamily: "'Cairo', sans-serif", maxWidth: 72 }}
                    >
                      {step.label}
                    </div>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center mx-2 pb-5">
                      <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${step.color}50, ${arr[i+1].color}50)` }} />
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5h6M5 2l3 3-3 3" stroke={arr[i+1].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {modules.map((m, i) => (
              <Link key={i} href={m.link}>
                <div
                  className="group cursor-pointer rounded-2xl border transition-all duration-300 hover:border-[#00DCC8]/30 hover:scale-[1.02] overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  {/* Accent top bar */}
                  <div style={{ height: '3px', background: `linear-gradient(90deg, ${m.color}, transparent)` }} />

                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${m.color}15`, border: `1px solid ${m.color}30` }}
                      >
                        <SysIcon type={m.iconType} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold font-orbitron" style={{ color: m.color }}>
                            {m.num}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-orbitron font-bold"
                            style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}40` }}>
                            {m.badge}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[#EEEFEE] font-orbitron"
                          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Orbitron', sans-serif" }}>
                          {m.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs mb-4 leading-relaxed"
                      style={{ color: 'rgba(238,239,238,0.45)', fontFamily: "'Cairo', sans-serif" }}>
                      {m.desc}
                    </p>

                    <ul className="flex flex-col gap-1.5 mb-4">
                      {m.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: m.color }} />
                          <span className="text-xs font-cairo" style={{ color: 'rgba(238,239,238,0.55)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                      style={{ color: m.color }}>
                      <span style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "inherit" }}>
                        {isRTL ? 'استكشف' : 'Explore'}
                      </span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          WAITLIST SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ borderBottom: '1px solid rgba(0,220,200,0.06)', background: 'linear-gradient(180deg, rgba(0,122,186,0.04) 0%, transparent 100%)' }}>
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4" style={{ background: 'rgba(0,220,200,0.06)', borderColor: 'rgba(0,220,200,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-[#00DCC8] animate-pulse" />
              <span className="text-[#00DCC8] text-[10px] font-orbitron tracking-widest">
                {isRTL ? 'قائمة الانتظار' : 'EARLY ACCESS'}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white font-orbitron mb-3">
              {isRTL ? 'انضم إلى قائمة الانتظار' : 'Join the Waitlist'}
            </h2>
            <p className="text-white/40 text-sm font-cairo max-w-md mx-auto leading-relaxed">
              {isRTL
                ? 'كن من أوائل المستفيدين من منصة ada2ai — سجّل اهتمامك الآن وسنتواصل معك عند الإطلاق.'
                : 'Be among the first to access ada2ai — register your interest now and we\'ll reach out at launch.'}
            </p>
          </div>

          {wlSubmitted ? (
            <div className="text-center py-12 rounded-2xl border" style={{ background: 'rgba(0,220,200,0.04)', borderColor: 'rgba(0,220,200,0.2)' }}>
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-black text-[#00DCC8] font-orbitron mb-2">
                {isRTL ? 'تم التسجيل بنجاح!' : 'You\'re on the list!'}
              </h3>
              <p className="text-white/40 text-sm font-cairo">
                {isRTL ? 'سنتواصل معك قريباً عند الإطلاق الرسمي.' : 'We\'ll reach out when we officially launch.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="rounded-2xl border p-8 flex flex-col gap-5" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-xs font-cairo">{isRTL ? 'الاسم الكامل' : 'Full Name'} *</label>
                  <input
                    type="text" required value={wlName} onChange={e => setWlName(e.target.value)}
                    placeholder={isRTL ? 'أدخل اسمك' : 'Your name'}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm outline-none font-cairo transition-colors focus:border-[#00DCC8]/50"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-xs font-cairo">{isRTL ? 'البريد الإلكتروني' : 'Email'} *</label>
                  <input
                    type="email" required value={wlEmail} onChange={e => setWlEmail(e.target.value)}
                    placeholder={isRTL ? 'بريدك الإلكتروني' : 'your@email.com'}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm outline-none font-cairo transition-colors focus:border-[#00DCC8]/50"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-xs font-cairo">{isRTL ? 'دورك' : 'Your Role'} *</label>
                  <select
                    value={wlRole} onChange={e => setWlRole(e.target.value as typeof wlRole)}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm outline-none font-cairo transition-colors focus:border-[#00DCC8]/50"
                    style={{ background: 'rgba(10,20,30,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    {[
                      { val: 'athlete', en: 'Athlete', ar: 'رياضي' },
                      { val: 'scout', en: 'Scout', ar: 'كشاف' },
                      { val: 'coach', en: 'Coach', ar: 'مدرب' },
                      { val: 'academy', en: 'Academy / Club', ar: 'أكاديمية / نادي' },
                      { val: 'federation', en: 'Federation', ar: 'اتحاد' },
                      { val: 'other', en: 'Other', ar: 'أخرى' },
                    ].map(r => (
                      <option key={r.val} value={r.val}>{isRTL ? r.ar : r.en}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-xs font-cairo">{isRTL ? 'الرياضة (اختياري)' : 'Sport (optional)'}</label>
                  <input
                    type="text" value={wlSport} onChange={e => setWlSport(e.target.value)}
                    placeholder={isRTL ? 'مثال: كرة القدم' : 'e.g. Football'}
                    className="w-full border rounded-xl px-4 py-3 text-white text-sm outline-none font-cairo transition-colors focus:border-[#00DCC8]/50"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              <button
                type="submit" disabled={joinWaitlist.isPending}
                className="w-full py-4 rounded-xl font-black text-[#000A0F] font-orbitron tracking-wide text-sm transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #007ABA 0%, #00DCC8 100%)', boxShadow: '0 0 40px rgba(0,220,200,0.15)' }}
              >
                {joinWaitlist.isPending
                  ? (isRTL ? 'جارٍ التسجيل...' : 'Submitting...')
                  : (isRTL ? 'سجّل اهتمامك الآن ✦' : 'Register My Interest ✦')}
              </button>

              <p className="text-center text-white/20 text-xs font-cairo">
                {isRTL ? '🔐 لن نشارك بياناتك مع أي طرف ثالث.' : '🔐 We will never share your data with third parties.'}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BRAND STRIP
      ══════════════════════════════════════════════════════════════ */}
      <div className="py-4 px-6 flex items-center justify-center gap-8 overflow-hidden border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {['ATHLETIC AI', 'VISION 2030', 'NAFATH READY', 'ISO 27001', 'SAUDI DATA LAW', 'SPORT PASSPORT ID'].map(item => (
          <span key={item} className="whitespace-nowrap text-[10px] font-orbitron tracking-widest" style={{ color: 'rgba(255,255,255,0.12)' }}>{item}</span>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAFATH MODAL
      ══════════════════════════════════════════════════════════════ */}
      {showNafath && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl p-8 max-w-md w-full border" style={{ background: 'rgba(5,18,30,0.97)', borderColor: 'rgba(0,122,186,0.25)' }}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: 'rgba(0,122,186,0.15)', border: '1px solid rgba(0,220,200,0.2)' }}>🔐</div>
              <h3 className="text-xl font-black text-white font-orbitron">
                {isRTL ? 'التحقق عبر نفاذ' : 'Nafath Verification'}
              </h3>
              <p className="text-white/40 text-sm mt-1 font-cairo">
                {isRTL ? 'أدخل رقمك الوطني للمتابعة' : 'Enter your national ID to continue'}
              </p>
            </div>

            <div className="rounded-xl p-3 mb-5 border flex items-center gap-3" style={{ background: 'rgba(0,122,186,0.1)', borderColor: 'rgba(0,220,200,0.15)' }}>
              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)' }}>
                <span className="text-white text-sm font-black font-orbitron">A</span>
              </div>
              <div>
                <div className="text-sm font-bold text-[#00DCC8] font-orbitron">Sport Passport ID</div>
                <div className="text-white/30 text-xs font-cairo">{isRTL ? 'الجواز الرياضي الرقمي' : 'Digital Athletic Identity'}</div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-white/55 text-sm mb-2 block font-cairo">
                {isRTL ? 'رقم الهوية الوطنية' : 'National ID Number'}
              </label>
              <input
                type="text"
                value={nafathId}
                onChange={e => setNafathId(e.target.value)}
                placeholder={isRTL ? '10 أرقام' : '10 digits'}
                maxLength={10}
                className="w-full border rounded-xl px-4 py-3 text-white outline-none transition-colors font-cairo"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}
              />
            </div>

            {verifying ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-12 h-12 rounded-full border-4 animate-spin" style={{ borderColor: 'rgba(0,122,186,0.2)', borderTopColor: '#00DCC8' }} />
                <p className="text-[#00DCC8] text-sm font-orbitron">
                  {isRTL ? 'جارٍ التحقق...' : 'Verifying...'}
                </p>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setShowNafath(false)}
                  className="flex-1 py-3 rounded-xl border text-white/55 hover:bg-white/5 transition-colors font-cairo"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
                <button onClick={handleNafathVerify}
                  className="flex-1 py-3 rounded-xl font-black text-[#000A0F] transition-opacity hover:opacity-90 font-orbitron tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #007ABA, #00DCC8)' }}>
                  {isRTL ? 'تحقق وادخل' : 'Verify & Enter'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
