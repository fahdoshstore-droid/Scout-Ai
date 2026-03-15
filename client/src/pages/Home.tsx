import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Brain, Zap, Users, BarChart3, MapPin, Play,
  ChevronRight, ArrowRight, CheckCircle2, Star,
  Activity, Trophy, Target, Shield, Globe, Cpu,
  Dumbbell, Waves, Bike, PersonStanding, Swords, Timer
} from "lucide-react";
import Ada2aiNavbar from "@/components/Ada2aiNavbar";

// ── Scroll Reveal Hook ─────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// ── Particle Background ────────────────────────────────────────────────────────
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.3 + 0.05,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 220, 200, ${p.opacity})`; ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 220, 200, ${0.06 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.5 }} />;
}

// ── Sports Sectors Data ────────────────────────────────────────────────────────
const sportsSectors = [
  { icon: <PersonStanding size={22} />, name: "Football", ar: "كرة القدم", color: "#00DCC8" },
  { icon: <Dumbbell size={22} />, name: "Athletics", ar: "ألعاب القوى", color: "#007ABA" },
  { icon: <Waves size={22} />, name: "Swimming", ar: "السباحة", color: "#00DCC8" },
  { icon: <Bike size={22} />, name: "Cycling", ar: "الدراجات", color: "#007ABA" },
  { icon: <Swords size={22} />, name: "Combat Sports", ar: "الفنون القتالية", color: "#00DCC8" },
  { icon: <Timer size={22} />, name: "Basketball", ar: "كرة السلة", color: "#007ABA" },
  { icon: <Activity size={22} />, name: "Tennis", ar: "التنس", color: "#00DCC8" },
  { icon: <Trophy size={22} />, name: "Volleyball", ar: "الكرة الطائرة", color: "#007ABA" },
];

// ── 6 Platform Modules ─────────────────────────────────────────────────────────
const modules = [
  {
    num: "01",
    icon: <Brain size={24} />,
    title: "AI Analysis",
    badge: "CORE",
    badgeColor: "#00DCC8",
    desc: "Upload image or video → Claude Vision processes 18 metrics → delivers a 25-field FIFA/SAFF scout report in 8 seconds. No equipment required. Works across all sports.",
    link: "/demo",
    cta: "Try Now",
  },
  {
    num: "02",
    icon: <Shield size={24} />,
    title: "SportID",
    badge: "PASSPORT",
    badgeColor: "#007ABA",
    desc: "Digital athlete passport with QR code, radar chart, certifications, and verifiable performance history. The athlete's career record, always accessible.",
    link: "/demo",
    cta: "View Demo",
  },
  {
    num: "03",
    icon: <Users size={24} />,
    title: "Scouts Dashboard",
    badge: "DISCOVERY",
    badgeColor: "#00DCC8",
    desc: "Search, filter, and rank athletes by 18 metrics across all Saudi regions. Discover talent from Riyadh to Abha from a single interface.",
    link: "/scouts",
    cta: "Explore",
  },
  {
    num: "04",
    icon: <BarChart3 size={24} />,
    title: "Compare Engine",
    badge: "ANALYTICS",
    badgeColor: "#FFA500",
    desc: "Side-by-side dual-athlete analysis with radar chart overlay and AI-generated recommendations. Objective comparison at scale.",
    link: "/compare",
    cta: "Compare",
  },
  {
    num: "05",
    icon: <MapPin size={24} />,
    title: "Academies Directory",
    badge: "NETWORK",
    badgeColor: "#007ABA",
    desc: "Google Maps integration with 500+ academies across KSA. Filter by city, sport, age group, and accreditation status. Connecting athletes to pathways.",
    link: "/academies",
    cta: "Find Academy",
  },
  {
    num: "06",
    icon: <Play size={24} />,
    title: "Demo Module",
    badge: "FREE ACCESS",
    badgeColor: "#00DCC8",
    desc: "Zero-friction onboarding with an interactive AI analysis preview. Athletes experience the full platform value before signing up — driving conversion.",
    link: "/demo",
    cta: "Start Free",
  },
];

// ── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: "8s", label: "Analysis Time", sub: "Per athlete" },
  { value: "25", label: "Scout Metrics", sub: "FIFA/SAFF Standard" },
  { value: "500+", label: "Academies", sub: "Across KSA" },
  { value: "8+", label: "Sports", sub: "Covered" },
];

// ── Benefits ───────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Target size={20} />,
    title: "For Athletes",
    points: [
      "Professional AI scout report in 8 seconds",
      "Digital passport with verifiable history",
      "Position-specific performance benchmarking",
      "Pathway to academies and clubs",
    ],
  },
  {
    icon: <Users size={20} />,
    title: "For Academies & Clubs",
    points: [
      "Discover regional talent at scale",
      "Objective multi-metric comparison",
      "Reduce scouting cost by 80%",
      "Data-driven recruitment decisions",
    ],
  },
  {
    icon: <Globe size={20} />,
    title: "For Saudi Arabia",
    points: [
      "Supports Vision 2030 sports agenda",
      "Democratizes talent discovery nationwide",
      "Builds national sports data infrastructure",
      "Enables grassroots-to-pro pipeline",
    ],
  },
];

// ── How It Works ───────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Upload Media", desc: "Upload a photo or video of the athlete in action. Any sport, any device." },
  { n: "02", title: "AI Processing", desc: "Claude Vision analyzes 18 performance metrics using FIFA/SAFF standards in real time." },
  { n: "03", title: "Scout Report", desc: "Receive a 25-field professional report with scores, Sport DNA, and recommendations." },
  { n: "04", title: "Build Profile", desc: "Save to SportID passport, compare with peers, and connect to academies." },
];

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#000A0F] text-[#EEEFEE] overflow-x-hidden">
      <ParticleBackground />
      <Ada2aiNavbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,220,200,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 ada-grid-bg opacity-60 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(0,220,200,0.08)", border: "1px solid rgba(0,220,200,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DCC8] animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#00DCC8]"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Powered by Claude Vision AI
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-orbitron font-black leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}>
            <span className="text-[#EEEFEE]">The AI Platform for</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00DCC8 0%, #007ABA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Sports Talent Discovery
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg mb-4 max-w-2xl mx-auto"
            style={{ color: "rgba(238,239,238,0.7)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>
            Upload an athlete video or photo → Get a professional scout report in 8 seconds.
            <br />
            Football, Athletics, Swimming, Basketball & more — across all Saudi Arabia.
          </p>

          {/* Sports tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {sportsSectors.map((s) => (
              <span key={s.name}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: "rgba(0,220,200,0.06)",
                  border: "1px solid rgba(0,220,200,0.15)",
                  color: "rgba(238,239,238,0.6)",
                  fontFamily: "'Cairo', sans-serif",
                }}>
                {s.name}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/demo">
              <button className="btn-ada-primary text-sm px-8 py-3.5 flex items-center gap-2">
                <Zap size={16} />
                Analyze Athlete Now
              </button>
            </Link>
            <Link href="/product">
              <button className="btn-ada-outline text-sm px-8 py-3.5 flex items-center gap-2">
                Explore Platform
                <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs" style={{ color: "rgba(238,239,238,0.35)", fontFamily: "'Cairo', sans-serif" }}>
            Arabic-First Platform · FIFA/SAFF Standards · Vision 2030 Aligned
          </p>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-12"
        style={{ background: "rgba(0,220,200,0.04)", borderTop: "1px solid rgba(0,220,200,0.1)", borderBottom: "1px solid rgba(0,220,200,0.1)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center reveal">
                <div className="ada-stat-number text-4xl lg:text-5xl mb-1">{s.value}</div>
                <div className="font-semibold text-sm text-[#EEEFEE] mb-0.5"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.label}</div>
                <div className="text-xs" style={{ color: "rgba(238,239,238,0.45)", fontFamily: "'Cairo', sans-serif" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 reveal">
            <span className="badge-verified mb-4 inline-block">The Problem</span>
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl mb-5 text-[#EEEFEE]">
              Talent is Everywhere.<br />
              <span style={{ color: "#00DCC8" }}>Discovery is Broken.</span>
            </h2>
            <p className="text-base" style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
              Across Saudi Arabia and the broader MENA region, thousands of talented athletes go undiscovered every year — not because they lack ability, but because the infrastructure to find them doesn't exist at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "⚡", title: "No Standardized Metrics", desc: "Scouting relies on subjective human judgment with no consistent measurement framework across sports." },
              { icon: "💰", title: "High Cost Barrier", desc: "Professional scouting costs SAR 50,000–200,000/year — inaccessible to grassroots athletes and small academies." },
              { icon: "🗺️", title: "Geographic Blindspot", desc: "Talent outside major cities (Riyadh, Jeddah) is virtually invisible to clubs and national federations." },
              { icon: "📊", title: "No Data Infrastructure", desc: "No unified platform tracks athlete development, performance history, or cross-sport potential in the Kingdom." },
            ].map((p, i) => (
              <div key={i} className="ada-card p-6 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-semibold text-sm mb-2 text-[#00DCC8]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>{p.title}</h3>
                <p className="text-sm" style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION — 6 MODULES ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-24" style={{ background: "rgba(0,10,15,0.6)" }}>
        <div className="absolute inset-0 ada-grid-bg opacity-40 pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <span className="badge-pro mb-4 inline-block">The Solution</span>
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl mb-5 text-[#EEEFEE]">
              ada2ai: One Platform.<br />
              <span style={{ color: "#00DCC8" }}>Six Powerful Modules. Zero Barriers.</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto"
              style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
              From grassroots to professional — a complete AI-powered talent discovery ecosystem covering all sports sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div key={i}
                className="ada-card p-6 flex flex-col gap-4 reveal"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="ada-icon-box">{m.icon}</div>
                    <div>
                      <div className="text-xs font-bold" style={{ fontFamily: "'Orbitron', sans-serif", color: "rgba(238,239,238,0.4)" }}>{m.num}</div>
                      <div className="font-bold text-base text-[#EEEFEE]"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}>{m.title}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: `${m.badgeColor}18`,
                      color: m.badgeColor,
                      border: `1px solid ${m.badgeColor}40`,
                      fontFamily: "'Orbitron', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                    }}>
                    {m.badge}
                  </span>
                </div>
                <p className="text-sm flex-1"
                  style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>
                  {m.desc}
                </p>
                <Link href={m.link}>
                  <button className="flex items-center gap-1.5 text-xs font-semibold transition-all"
                    style={{ color: "#00DCC8", fontFamily: "'Orbitron', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}>
                    {m.cta} <ArrowRight size={13} />
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <p className="text-sm italic"
              style={{ color: "rgba(238,239,238,0.4)", fontFamily: "'Cairo', sans-serif" }}>
              From grassroots to pro — ada2ai{" "}
              <span style={{ color: "#00DCC8" }}>democratizes talent discovery</span>{" "}
              across the entire Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <span className="badge-verified mb-4 inline-block">How It Works</span>
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl mb-5 text-[#EEEFEE]">
              From Upload to<br />
              <span style={{ color: "#00DCC8" }}>Professional Report in 8 Seconds</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,220,200,0.3), rgba(0,220,200,0.3), transparent)" }} />

            {steps.map((s, i) => (
              <div key={i} className="text-center reveal" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 mx-auto"
                  style={{
                    background: "rgba(0,220,200,0.08)",
                    border: "2px solid rgba(0,220,200,0.3)",
                    boxShadow: "0 0 30px rgba(0,220,200,0.12)",
                  }}>
                  <span className="ada-stat-number text-xl">{s.n}</span>
                </div>
                <h3 className="font-bold text-base mb-2 text-[#EEEFEE]"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.title}</h3>
                <p className="text-sm" style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORTS SECTORS ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20"
        style={{ background: "rgba(0,122,186,0.04)", borderTop: "1px solid rgba(0,122,186,0.1)", borderBottom: "1px solid rgba(0,122,186,0.1)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="badge-pro mb-4 inline-block">Multi-Sport Platform</span>
            <h2 className="font-orbitron font-bold text-2xl lg:text-3xl mb-4 text-[#EEEFEE]">
              Not Just Football.<br />
              <span style={{ color: "#007ABA" }}>Every Sport. Every Athlete.</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto"
              style={{ color: "rgba(238,239,238,0.6)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
              ada2ai's AI analysis engine adapts to the biomechanics and performance metrics of each sport — delivering sport-specific insights for every athlete.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {sportsSectors.map((s, i) => (
              <div key={i}
                className="ada-card p-4 text-center flex flex-col items-center gap-2 reveal cursor-pointer"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="ada-icon-box" style={{ color: s.color }}>{s.icon}</div>
                <div className="text-xs font-semibold text-[#EEEFEE]"
                  style={{ fontFamily: "'Cairo', sans-serif" }}>{s.name}</div>
                <div className="text-xs" style={{ color: "rgba(238,239,238,0.4)", fontFamily: "'Cairo', sans-serif" }}>{s.ar}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUSINESS BENEFITS ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <span className="badge-top mb-4 inline-block">Business Benefits</span>
            <h2 className="font-orbitron font-bold text-3xl lg:text-4xl mb-5 text-[#EEEFEE]">
              Value for Every<br />
              <span style={{ color: "#FFA500" }}>Stakeholder</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="ada-card p-7 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="ada-icon-box">{b.icon}</div>
                  <h3 className="font-bold text-base text-[#EEEFEE]"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>{b.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {b.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#00DCC8" }} />
                      <span className="text-sm" style={{ color: "rgba(238,239,238,0.7)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.6 }}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION 2030 ALIGNMENT ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-20"
        style={{ background: "rgba(0,220,200,0.03)", borderTop: "1px solid rgba(0,220,200,0.08)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto ada-card p-10 text-center reveal"
            style={{ background: "rgba(0,220,200,0.04)", border: "1px solid rgba(0,220,200,0.15)" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
              style={{ background: "rgba(0,220,200,0.1)", border: "1px solid rgba(0,220,200,0.25)" }}>
              <Star size={28} style={{ color: "#00DCC8" }} />
            </div>
            <h2 className="font-orbitron font-bold text-2xl lg:text-3xl mb-4 text-[#EEEFEE]">
              Aligned with Saudi Vision 2030
            </h2>
            <p className="text-base mb-6"
              style={{ color: "rgba(238,239,238,0.7)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
              ada2ai directly supports the Kingdom's ambition to become a global sports hub. By building the data infrastructure for talent discovery, we accelerate the grassroots-to-professional pipeline across all sports sectors — contributing to the SAR 27.5 billion sports economy target.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                { v: "SAR 27.5B", l: "Sports Economy Target" },
                { v: "1.5M+", l: "Athletes to Reach" },
                { v: "2030", l: "National Sports Goal" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="ada-stat-number text-3xl mb-1">{s.v}</div>
                  <div className="text-xs" style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,220,200,0.06) 0%, transparent 70%)" }} />
        <div className="relative container mx-auto px-4 text-center reveal">
          <h2 className="font-orbitron font-black text-3xl lg:text-5xl mb-6 text-[#EEEFEE]">
            Ready to Discover<br />
            <span style={{ color: "#00DCC8" }}>the Next Champion?</span>
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(238,239,238,0.65)", fontFamily: "'Cairo', sans-serif", lineHeight: 1.8 }}>
            Upload a player video or photo and get a professional AI scout report in 8 seconds. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <button className="btn-ada-primary text-sm px-10 py-4 flex items-center gap-2">
                <Zap size={16} />
                Analyze Player Now — Free
              </button>
            </Link>
            <Link href="/scouts">
              <button className="btn-ada-outline text-sm px-10 py-4 flex items-center gap-2">
                <Users size={16} />
                For Scouts & Academies
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-12"
        style={{ borderTop: "1px solid rgba(0,220,200,0.1)", background: "rgba(0,10,15,0.8)" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: "#00DCC8" }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: "14px", color: "#000A0F" }}>A</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: "14px" }}>
                  <span style={{ color: "#EEEFEE" }}>ada</span>
                  <span style={{ color: "#00DCC8" }}>2</span>
                  <span style={{ color: "#EEEFEE" }}>ai</span>
                </div>
                <div className="text-xs" style={{ color: "rgba(238,239,238,0.4)", fontFamily: "'Cairo', sans-serif" }}>
                  AI Sports Talent Discovery
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm"
              style={{ color: "rgba(238,239,238,0.5)", fontFamily: "'Cairo', sans-serif" }}>
              <Link href="/product" className="hover:text-[#00DCC8] transition-colors">Product</Link>
              <Link href="/demo" className="hover:text-[#00DCC8] transition-colors">AI Demo</Link>
              <Link href="/academies" className="hover:text-[#00DCC8] transition-colors">Academies</Link>
              <Link href="/scouts" className="hover:text-[#00DCC8] transition-colors">Scouts</Link>
              <Link href="/players" className="hover:text-[#00DCC8] transition-colors">Player Database</Link>
              <Link href="/compare" className="hover:text-[#00DCC8] transition-colors">Compare</Link>
            </div>
            <div className="text-xs text-center" style={{ color: "rgba(238,239,238,0.3)", fontFamily: "'Cairo', sans-serif" }}>
              © 2026 ada2ai · Vision 2030 Aligned · Arabic-First Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
