/**
 * CoachDashboard — Interactive Tactical Board
 * Features:
 *  - Drag-and-drop players on a realistic football pitch
 *  - Formation presets (4-3-3, 4-4-2, 3-5-2, 4-2-3-1)
 *  - Team performance chart (last 5 matches) — Attack / Defense / Possession
 *  - Opponent analysis panel — Strengths, Weaknesses, Playing Style
 *  - Bilingual (Arabic / English)
 */

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Brain, RotateCcw, ChevronDown, ChevronUp,
  TrendingUp, Shield, Swords, Eye, Target,
  AlertTriangle, CheckCircle, Activity
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CoachDashboardProps {
  onNavigate: (page: string, context?: unknown) => void;
  lang?: "ar" | "en";
}

type Formation = "4-3-3" | "4-4-2" | "3-5-2" | "4-2-3-1";
type PlayerRole = "GK" | "DEF" | "MID" | "FWD";

interface Player {
  id: number;
  number: number;
  nameAr: string;
  nameEn: string;
  role: PlayerRole;
  rating: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  hasWarning?: boolean;
}

// ─── Formation Templates ──────────────────────────────────────────────────────
const formationTemplates: Record<Formation, Omit<Player, "id" | "nameAr" | "nameEn" | "rating" | "hasWarning">[]> = {
  "4-3-3": [
    { number: 1,  role: "GK",  x: 50, y: 88 },
    { number: 3,  role: "DEF", x: 15, y: 68 },
    { number: 5,  role: "DEF", x: 35, y: 68 },
    { number: 4,  role: "DEF", x: 65, y: 68 },
    { number: 2,  role: "DEF", x: 85, y: 68 },
    { number: 6,  role: "MID", x: 25, y: 45 },
    { number: 8,  role: "MID", x: 50, y: 42 },
    { number: 10, role: "MID", x: 75, y: 45 },
    { number: 11, role: "FWD", x: 18, y: 18 },
    { number: 9,  role: "FWD", x: 50, y: 12 },
    { number: 7,  role: "FWD", x: 82, y: 18 },
  ],
  "4-4-2": [
    { number: 1,  role: "GK",  x: 50, y: 88 },
    { number: 3,  role: "DEF", x: 15, y: 68 },
    { number: 5,  role: "DEF", x: 35, y: 68 },
    { number: 4,  role: "DEF", x: 65, y: 68 },
    { number: 2,  role: "DEF", x: 85, y: 68 },
    { number: 6,  role: "MID", x: 15, y: 45 },
    { number: 8,  role: "MID", x: 35, y: 45 },
    { number: 10, role: "MID", x: 65, y: 45 },
    { number: 11, role: "MID", x: 85, y: 45 },
    { number: 9,  role: "FWD", x: 35, y: 15 },
    { number: 7,  role: "FWD", x: 65, y: 15 },
  ],
  "3-5-2": [
    { number: 1,  role: "GK",  x: 50, y: 88 },
    { number: 5,  role: "DEF", x: 25, y: 68 },
    { number: 4,  role: "DEF", x: 50, y: 68 },
    { number: 3,  role: "DEF", x: 75, y: 68 },
    { number: 2,  role: "MID", x: 10, y: 45 },
    { number: 6,  role: "MID", x: 30, y: 45 },
    { number: 8,  role: "MID", x: 50, y: 42 },
    { number: 10, role: "MID", x: 70, y: 45 },
    { number: 11, role: "MID", x: 90, y: 45 },
    { number: 9,  role: "FWD", x: 35, y: 15 },
    { number: 7,  role: "FWD", x: 65, y: 15 },
  ],
  "4-2-3-1": [
    { number: 1,  role: "GK",  x: 50, y: 88 },
    { number: 3,  role: "DEF", x: 15, y: 68 },
    { number: 5,  role: "DEF", x: 35, y: 68 },
    { number: 4,  role: "DEF", x: 65, y: 68 },
    { number: 2,  role: "DEF", x: 85, y: 68 },
    { number: 6,  role: "MID", x: 35, y: 52 },
    { number: 8,  role: "MID", x: 65, y: 52 },
    { number: 11, role: "MID", x: 18, y: 32 },
    { number: 10, role: "MID", x: 50, y: 30 },
    { number: 7,  role: "MID", x: 82, y: 32 },
    { number: 9,  role: "FWD", x: 50, y: 12 },
  ],
};

// ─── Player Data ──────────────────────────────────────────────────────────────
const playerData: Record<number, { nameAr: string; nameEn: string; rating: number; hasWarning?: boolean }> = {
  1:  { nameAr: "الحارس",   nameEn: "GK",    rating: 82 },
  2:  { nameAr: "ظهير أ",   nameEn: "RB",    rating: 77 },
  3:  { nameAr: "ظهير ي",   nameEn: "LB",    rating: 75 },
  4:  { nameAr: "قلب دفاع", nameEn: "CB",    rating: 78 },
  5:  { nameAr: "قلب دفاع", nameEn: "CB",    rating: 80 },
  6:  { nameAr: "وسط دف",   nameEn: "CDM",   rating: 81 },
  7:  { nameAr: "جناح أ",   nameEn: "RW",    rating: 83, hasWarning: true },
  8:  { nameAr: "وسط",      nameEn: "CM",    rating: 85 },
  9:  { nameAr: "مهاجم",    nameEn: "ST",    rating: 86 },
  10: { nameAr: "خلاق",     nameEn: "CAM",   rating: 88, hasWarning: true },
  11: { nameAr: "جناح ي",   nameEn: "LW",    rating: 84 },
};

// ─── Role Colors ──────────────────────────────────────────────────────────────
const roleColors: Record<PlayerRole, { bg: string; border: string; label: string; labelAr: string }> = {
  GK:  { bg: "#F59E0B",   border: "#F59E0B",   label: "GK",  labelAr: "حارس" },
  DEF: { bg: "#3B82F6",   border: "#60A5FA",   label: "DEF", labelAr: "مدافع" },
  MID: { bg: "#22C55E",   border: "#4ADE80",   label: "MID", labelAr: "وسط" },
  FWD: { bg: "#EF4444",   border: "#F87171",   label: "FWD", labelAr: "مهاجم" },
};

// ─── Performance Data ─────────────────────────────────────────────────────────
const performanceData = [
  { match: "م1", matchEn: "M1", attack: 62, defense: 58, possession: 48 },
  { match: "م2", matchEn: "M2", attack: 68, defense: 64, possession: 52 },
  { match: "م3", matchEn: "M3", attack: 74, defense: 70, possession: 58 },
  { match: "م4", matchEn: "M4", attack: 71, defense: 75, possession: 61 },
  { match: "م5", matchEn: "M5", attack: 82, defense: 78, possession: 67 },
];

// ─── Opponent Presets ─────────────────────────────────────────────────────────
const opponentPresets = [
  {
    nameAr: "الهلال",
    nameEn: "Al-Hilal",
    formation: "4-2-3-1",
    style: { ar: "ضغط عالٍ، هجوم مرتد سريع", en: "High press, fast counter-attack" },
    strengths: {
      ar: ["الضغط العالي في الملعب", "السرعة على الأجنحة", "الدقة في التمرير"],
      en: ["High press across the pitch", "Speed on the wings", "Passing accuracy"],
    },
    weaknesses: {
      ar: ["الفراغات خلف الدفاع", "ضعف الكرات الثابتة دفاعياً", "الإرهاق في الشوط الثاني"],
      en: ["Space behind the defense", "Defensive set-pieces", "Fatigue in second half"],
    },
    radar: [
      { stat: "هجوم", statEn: "Attack",     value: 88 },
      { stat: "دفاع", statEn: "Defense",    value: 82 },
      { stat: "وسط",  statEn: "Midfield",   value: 85 },
      { stat: "سرعة", statEn: "Speed",      value: 90 },
      { stat: "ثبات", statEn: "Composure",  value: 78 },
    ],
  },
  {
    nameAr: "النصر",
    nameEn: "Al-Nassr",
    formation: "4-3-3",
    style: { ar: "حيازة الكرة، بناء من الخلف", en: "Possession-based, build from back" },
    strengths: {
      ar: ["الحيازة الطويلة للكرة", "الاستحواذ في الوسط", "الدقة في التسديد"],
      en: ["Long ball possession", "Midfield dominance", "Shooting accuracy"],
    },
    weaknesses: {
      ar: ["بطء الانتقال من دفاع لهجوم", "ضعف الكرات العالية", "الاعتماد على لاعب واحد"],
      en: ["Slow transition defense-to-attack", "Aerial weakness", "Over-reliance on one player"],
    },
    radar: [
      { stat: "هجوم", statEn: "Attack",     value: 92 },
      { stat: "دفاع", statEn: "Defense",    value: 75 },
      { stat: "وسط",  statEn: "Midfield",   value: 88 },
      { stat: "سرعة", statEn: "Speed",      value: 85 },
      { stat: "ثبات", statEn: "Composure",  value: 90 },
    ],
  },
  {
    nameAr: "الاتحاد",
    nameEn: "Al-Ittihad",
    formation: "4-4-2",
    style: { ar: "دفاع منظم، هجمات مباشرة", en: "Organized defense, direct attacks" },
    strengths: {
      ar: ["الدفاع المنظم والمتماسك", "الكرات الثابتة الهجومية", "القوة الجسدية"],
      en: ["Organized and compact defense", "Offensive set-pieces", "Physical strength"],
    },
    weaknesses: {
      ar: ["ضعف في بناء اللعب من الخلف", "قلة الإبداع في الوسط", "الفراغات على الأجنحة"],
      en: ["Weak build-up from the back", "Lack of creativity in midfield", "Wing spaces"],
    },
    radar: [
      { stat: "هجوم", statEn: "Attack",     value: 78 },
      { stat: "دفاع", statEn: "Defense",    value: 87 },
      { stat: "وسط",  statEn: "Midfield",   value: 76 },
      { stat: "سرعة", statEn: "Speed",      value: 72 },
      { stat: "ثبات", statEn: "Composure",  value: 83 },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CoachDashboard({ onNavigate, lang = "ar" }: CoachDashboardProps) {
  const isRTL = lang === "ar";
  const [formation, setFormation] = useState<Formation>("4-4-2");
  const [players, setPlayers] = useState<Player[]>(() => buildPlayers("4-4-2"));
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [showOpponent, setShowOpponent] = useState(false);
  const [opponentIdx, setOpponentIdx] = useState(0);
  const [tacticalNotes, setTacticalNotes] = useState("");
  const pitchRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ id: number; startX: number; startY: number } | null>(null);

  function buildPlayers(f: Formation): Player[] {
    return formationTemplates[f].map((t, i) => ({
      id: i,
      ...t,
      ...(playerData[t.number] ?? { nameAr: `لاعب ${t.number}`, nameEn: `Player ${t.number}`, rating: 75 }),
    }));
  }

  const changeFormation = (f: Formation) => {
    setFormation(f);
    setPlayers(buildPlayers(f));
    setSelectedPlayer(null);
  };

  // ── Drag logic (mouse + touch) ──────────────────────────────────────────────
  const startDrag = useCallback((e: React.MouseEvent | React.TouchEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    draggingRef.current = { id, startX: clientX, startY: clientY };
    setSelectedPlayer(id);
  }, []);

  const onMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggingRef.current || !pitchRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const rect = pitchRef.current.getBoundingClientRect();
    const x = Math.min(98, Math.max(2, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(97, Math.max(3, ((clientY - rect.top) / rect.height) * 100));
    const id = draggingRef.current.id;
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, x, y } : p));
  }, []);

  const endDrag = useCallback(() => {
    draggingRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", endDrag);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, [onMove, endDrag]);

  const opponent = opponentPresets[opponentIdx];
  const font = isRTL ? "'Cairo', sans-serif" : "'Space Grotesk', sans-serif";

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#0A0E1A", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="p-4 lg:p-6 space-y-5">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: font }}>
              {isRTL ? "لوحة المدرب" : "Coach Dashboard"}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: font }}>
              {isRTL ? "التكتيكات · أداء الفريق · تحليل الخصم" : "Tactics · Team Performance · Opponent Analysis"}
            </p>
          </div>
          <button
            onClick={() => onNavigate("ai-chat", {
              prompt: isRTL ? "اقترح أفضل تشكيل للمباراة القادمة بناءً على أداء الفريق" : "Suggest the best formation for the next match based on team performance"
            })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "rgba(0,220,200,0.08)", color: "#00DCC8", border: "1px solid rgba(0,220,200,0.2)", fontFamily: font }}
          >
            <Brain size={15} />
            {isRTL ? "استشر AI" : "Ask AI"}
          </button>
        </div>

        {/* ── Main Grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* ── Tactical Pitch ─────────────────────────────────────────────── */}
          <div className="xl:col-span-2 rounded-2xl p-4" style={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.06)" }}>

            {/* Formation selector */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)", fontFamily: font }}>
                {isRTL ? "التشكيل:" : "Formation:"}
              </span>
              {(["4-3-3", "4-4-2", "3-5-2", "4-2-3-1"] as Formation[]).map(f => (
                <button key={f} onClick={() => changeFormation(f)}
                  className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                  style={{
                    background: formation === f ? "rgba(0,220,200,0.15)" : "rgba(255,255,255,0.04)",
                    color: formation === f ? "#00DCC8" : "rgba(255,255,255,0.5)",
                    border: formation === f ? "1px solid rgba(0,220,200,0.3)" : "1px solid transparent",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                  {f}
                </button>
              ))}
              <button onClick={() => { setPlayers(buildPlayers(formation)); setSelectedPlayer(null); }}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all ms-auto"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: font }}>
                <RotateCcw size={11} /> {isRTL ? "إعادة" : "Reset"}
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {(["GK", "DEF", "MID", "FWD"] as PlayerRole[]).map(r => (
                <div key={r} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: roleColors[r].bg }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: font }}>
                    {isRTL ? roleColors[r].labelAr : roleColors[r].label}
                  </span>
                </div>
              ))}
            </div>

            {/* Pitch */}
            <div
              ref={pitchRef}
              className="relative rounded-xl overflow-hidden select-none"
              style={{ paddingTop: "62%", background: "linear-gradient(180deg, #1a4a2e 0%, #1e5233 50%, #1a4a2e 100%)", cursor: "default" }}
            >
              {/* Pitch SVG markings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="1" y="1" width="98" height="98" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
                <line x1="1" y1="50" x2="99" y2="50" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
                <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.4)" />
                {/* Top penalty area */}
                <rect x="22" y="1" width="56" height="17" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
                <rect x="35" y="1" width="30" height="7" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
                <circle cx="50" cy="12" r="7" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" strokeDasharray="2 2" />
                {/* Bottom penalty area */}
                <rect x="22" y="82" width="56" height="17" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
                <rect x="35" y="92" width="30" height="7" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
                <circle cx="50" cy="88" r="7" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" strokeDasharray="2 2" />
                {/* Goals */}
                <rect x="42" y="0" width="16" height="2" fill="rgba(255,255,255,0.15)" />
                <rect x="42" y="98" width="16" height="2" fill="rgba(255,255,255,0.15)" />
                {/* Grass stripes */}
                {[10, 20, 30, 40, 60, 70, 80, 90].map(y => (
                  <rect key={y} x="1" y={y - 5} width="98" height="10" fill="rgba(0,0,0,0.04)" />
                ))}
              </svg>

              {/* Formation label */}
              <div className="absolute bottom-2 start-3 text-xs font-black" style={{ color: "#00DCC8", fontFamily: "'Space Grotesk', sans-serif", zIndex: 10 }}>
                {formation}
              </div>
              <div className="absolute bottom-2 end-3 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: font, zIndex: 10 }}>
                {isRTL ? "اسحب اللاعبين لتحريكهم" : "Drag players to move"}
              </div>

              {/* Players */}
              {players.map(player => {
                const rc = roleColors[player.role];
                const isSelected = selectedPlayer === player.id;
                return (
                  <div
                    key={player.id}
                    className="absolute flex flex-col items-center"
                    style={{
                      left: `${player.x}%`,
                      top: `${player.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isSelected ? 20 : 10,
                      cursor: "grab",
                      userSelect: "none",
                    }}
                    onMouseDown={e => startDrag(e, player.id)}
                    onTouchStart={e => startDrag(e, player.id)}
                  >
                    {/* Warning badge */}
                    {player.hasWarning && (
                      <div className="absolute -top-2 -end-1 text-yellow-400" style={{ fontSize: "9px", zIndex: 21 }}>⚠</div>
                    )}
                    {/* Rating badge */}
                    <div
                      className="absolute -top-2.5 start-1/2 -translate-x-1/2 text-white font-black rounded-full px-1"
                      style={{
                        fontSize: "7px",
                        background: "#0A0E1A",
                        border: `1px solid ${rc.border}`,
                        whiteSpace: "nowrap",
                        zIndex: 21,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {player.rating}
                    </div>
                    {/* Player circle */}
                    <div
                      className="flex items-center justify-center font-black rounded-full border-2 transition-transform"
                      style={{
                        width: isSelected ? "34px" : "30px",
                        height: isSelected ? "34px" : "30px",
                        background: rc.bg,
                        borderColor: isSelected ? "#fff" : rc.border,
                        color: "#fff",
                        fontSize: "11px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        boxShadow: isSelected ? `0 0 12px ${rc.bg}` : `0 2px 8px rgba(0,0,0,0.4)`,
                        transform: isSelected ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {player.number}
                    </div>
                    {/* Name label */}
                    <div
                      className="mt-0.5 px-1 rounded text-white text-center"
                      style={{
                        fontSize: "6.5px",
                        background: "rgba(0,0,0,0.7)",
                        fontFamily: font,
                        whiteSpace: "nowrap",
                        maxWidth: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {isRTL ? player.nameAr : player.nameEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Selected player info */}
            {selectedPlayer !== null && (() => {
              const p = players.find(pl => pl.id === selectedPlayer);
              if (!p) return null;
              const rc = roleColors[p.role];
              return (
                <div className="rounded-2xl p-4" style={{ background: "#0D1220", border: `1px solid ${rc.border}30` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
                      style={{ background: rc.bg, fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif" }}>
                      {p.number}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm" style={{ fontFamily: font }}>
                        {isRTL ? p.nameAr : p.nameEn}
                      </div>
                      <div className="text-xs" style={{ color: rc.border, fontFamily: font }}>
                        {isRTL ? roleColors[p.role].labelAr : roleColors[p.role].label} · {isRTL ? "تقييم" : "Rating"}: {p.rating}
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.rating}%`, background: `linear-gradient(90deg, ${rc.bg}, ${rc.border})` }} />
                  </div>
                  {p.hasWarning && (
                    <div className="flex items-center gap-1.5 mt-2 text-yellow-400 text-xs" style={{ fontFamily: font }}>
                      <AlertTriangle size={11} />
                      {isRTL ? "يحتاج متابعة" : "Needs attention"}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Formation stats */}
            <div className="rounded-2xl p-4" style={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2" style={{ fontFamily: font }}>
                <Activity size={14} style={{ color: "#00DCC8" }} />
                {isRTL ? "إحصائيات التشكيل" : "Formation Stats"}
              </h3>
              {[
                { labelAr: "الهجوم",    labelEn: "Attack",     value: formation === "4-3-3" ? 85 : formation === "4-4-2" ? 78 : formation === "3-5-2" ? 72 : 80, color: "#EF4444" },
                { labelAr: "الدفاع",    labelEn: "Defense",    value: formation === "4-3-3" ? 70 : formation === "4-4-2" ? 80 : formation === "3-5-2" ? 88 : 75, color: "#3B82F6" },
                { labelAr: "الاستحواذ", labelEn: "Possession", value: formation === "4-3-3" ? 75 : formation === "4-4-2" ? 72 : formation === "3-5-2" ? 80 : 87, color: "#22C55E" },
                { labelAr: "الضغط",     labelEn: "Press",      value: formation === "4-3-3" ? 82 : formation === "4-4-2" ? 70 : formation === "3-5-2" ? 76 : 78, color: "#F59E0B" },
              ].map((s, i) => (
                <div key={i} className="mb-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)", fontFamily: font }}>
                      {isRTL ? s.labelAr : s.labelEn}
                    </span>
                    <span className="text-xs font-bold" style={{ color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tactical notes */}
            <div className="rounded-2xl p-4" style={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: font }}>
                {isRTL ? "ملاحظات تكتيكية" : "Tactical Notes"}
              </h3>
              <textarea
                rows={4}
                value={tacticalNotes}
                onChange={e => setTacticalNotes(e.target.value)}
                placeholder={isRTL ? "اكتب ملاحظاتك التكتيكية هنا..." : "Write your tactical notes here..."}
                className="w-full text-sm text-white placeholder-white/25 resize-none focus:outline-none rounded-lg p-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: font,
                  direction: isRTL ? "rtl" : "ltr",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Team Performance Chart ──────────────────────────────────────────── */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} style={{ color: "#00DCC8" }} />
            <h2 className="font-bold text-white text-base" style={{ fontFamily: font }}>
              {isRTL ? "أداء الفريق — آخر 5 مباريات" : "Team Performance — Last 5 Matches"}
            </h2>
          </div>
          <div style={{ height: "200px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey={isRTL ? "match" : "matchEn"}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: font }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[40, 100]}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "'Space Grotesk', sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontFamily: font }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                  itemStyle={{ fontSize: "12px" }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: font, fontSize: "11px", paddingTop: "8px" }}
                  formatter={(value) => {
                    const map: Record<string, { ar: string; en: string }> = {
                      attack:     { ar: "هجوم",      en: "Attack" },
                      defense:    { ar: "دفاع",      en: "Defense" },
                      possession: { ar: "استحواذ",   en: "Possession" },
                    };
                    return isRTL ? (map[value]?.ar ?? value) : (map[value]?.en ?? value);
                  }}
                />
                <Line type="monotone" dataKey="attack"     stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4, fill: "#EF4444" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="defense"    stroke="#60A5FA" strokeWidth={2.5} dot={{ r: 4, fill: "#60A5FA" }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="possession" stroke="#4ADE80" strokeWidth={2.5} dot={{ r: 4, fill: "#4ADE80" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Opponent Analysis ───────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Header toggle */}
          <button
            className="w-full flex items-center justify-between p-5"
            onClick={() => setShowOpponent(!showOpponent)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.12)" }}>
                <Eye size={16} style={{ color: "#EF4444" }} />
              </div>
              <div className="text-start">
                <h2 className="font-bold text-white text-base" style={{ fontFamily: font }}>
                  {isRTL ? "تحليل الفريق الخصم" : "Opponent Analysis"}
                </h2>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: font }}>
                  {isRTL ? "نقاط القوة والضعف وأسلوب اللعب" : "Strengths, weaknesses & playing style"}
                </p>
              </div>
            </div>
            {showOpponent ? <ChevronUp size={18} style={{ color: "rgba(255,255,255,0.4)" }} /> : <ChevronDown size={18} style={{ color: "rgba(255,255,255,0.4)" }} />}
          </button>

          {showOpponent && (
            <div className="px-5 pb-5 space-y-5">
              {/* Opponent selector */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: font }}>
                  {isRTL ? "الخصم:" : "Opponent:"}
                </span>
                {opponentPresets.map((op, i) => (
                  <button key={i} onClick={() => setOpponentIdx(i)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: opponentIdx === i ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.04)",
                      color: opponentIdx === i ? "#EF4444" : "rgba(255,255,255,0.5)",
                      border: opponentIdx === i ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent",
                      fontFamily: font,
                    }}>
                    {isRTL ? op.nameAr : op.nameEn}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Strengths */}
                <div className="rounded-xl p-4" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={14} style={{ color: "#22C55E" }} />
                    <h3 className="font-bold text-sm" style={{ color: "#22C55E", fontFamily: font }}>
                      {isRTL ? "نقاط القوة" : "Strengths"}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(isRTL ? opponent.strengths.ar : opponent.strengths.en).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)", fontFamily: font }}>
                        <span style={{ color: "#22C55E", marginTop: "2px", flexShrink: 0 }}>●</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="rounded-xl p-4" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={14} style={{ color: "#EF4444" }} />
                    <h3 className="font-bold text-sm" style={{ color: "#EF4444", fontFamily: font }}>
                      {isRTL ? "نقاط الضعف" : "Weaknesses"}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(isRTL ? opponent.weaknesses.ar : opponent.weaknesses.en).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "rgba(255,255,255,0.7)", fontFamily: font }}>
                        <span style={{ color: "#EF4444", marginTop: "2px", flexShrink: 0 }}>●</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Playing style + Radar */}
                <div className="space-y-3">
                  <div className="rounded-xl p-4" style={{ background: "rgba(0,122,186,0.06)", border: "1px solid rgba(0,122,186,0.2)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Swords size={14} style={{ color: "#60A5FA" }} />
                      <h3 className="font-bold text-sm" style={{ color: "#60A5FA", fontFamily: font }}>
                        {isRTL ? "أسلوب اللعب" : "Playing Style"}
                      </h3>
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)", fontFamily: font, lineHeight: "1.6" }}>
                      {isRTL ? opponent.style.ar : opponent.style.en}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Shield size={11} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>
                        {opponent.formation}
                      </span>
                    </div>
                  </div>

                  {/* Radar chart */}
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ height: "160px" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={opponent.radar}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis
                            dataKey={isRTL ? "stat" : "statEn"}
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 9, fontFamily: font }}
                          />
                          <Radar
                            name={isRTL ? opponent.nameAr : opponent.nameEn}
                            dataKey="value"
                            stroke="#EF4444"
                            fill="#EF4444"
                            fillOpacity={0.2}
                            strokeWidth={1.5}
                          />
                          <Tooltip
                            contentStyle={{ background: "#0D1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontFamily: font, fontSize: "11px" }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="rounded-xl p-4" style={{ background: "rgba(0,220,200,0.05)", border: "1px solid rgba(0,220,200,0.15)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} style={{ color: "#00DCC8" }} />
                  <h3 className="font-bold text-sm" style={{ color: "#00DCC8", fontFamily: font }}>
                    {isRTL ? "توصية AI للمباراة" : "AI Match Recommendation"}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontFamily: font }}>
                  {isRTL
                    ? `بناءً على تحليل ${opponent.nameAr} (${opponent.formation})، يُنصح باستخدام تشكيل ${formation} مع التركيز على استغلال ${opponent.weaknesses.ar[0].toLowerCase()}. استخدم الضغط العالي في الشوط الأول للاستفادة من ${opponent.weaknesses.ar[2].toLowerCase()}.`
                    : `Based on ${opponent.nameEn}'s analysis (${opponent.formation}), it's recommended to use ${formation} focusing on exploiting ${opponent.weaknesses.en[0].toLowerCase()}. Apply high press in the first half to take advantage of ${opponent.weaknesses.en[2].toLowerCase()}.`
                  }
                </p>
                <button
                  onClick={() => onNavigate("ai-chat", {
                    prompt: isRTL
                      ? `حلل فريق ${opponent.nameAr} وأعطني خطة تكتيكية مفصلة للفوز عليهم باستخدام تشكيل ${formation}`
                      : `Analyze ${opponent.nameEn} and give me a detailed tactical plan to beat them using ${formation} formation`
                  })}
                  className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: "rgba(0,220,200,0.1)", color: "#00DCC8", border: "1px solid rgba(0,220,200,0.2)", fontFamily: font }}
                >
                  <Brain size={12} />
                  {isRTL ? "تحليل AI مفصل" : "Detailed AI Analysis"}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
