// ═══════════════════════════════════════════════════════════
// SINGLE SOURCE OF TRUTH — استخدم هذا الملف في كل الصفحات
// Import: import { allPlayers, type Player } from "@/data/players"
// ═══════════════════════════════════════════════════════════

export type PlayerLevel = "نشط" | "موهبة ناشئة" | "Active" | "Rising Talent";

export interface Player {
  id: number;
  nameAr: string;
  nameEn: string;
  age: number;
  positionAr: string;
  positionEn: string;
  cityAr: string;
  cityEn: string;
  sport: "Football" | "Basketball" | "Boxing" | "Swimming";
  score: number;
  potential: number;
  speed: number;
  skill: number;
  tactical: number;
  fitness: number;
  passing: number;
  shooting: number;
  goals: number;
  assists: number;
  matches: number;
  rating: number;
  statusAr: string;
  statusEn: string;
  flag: string;
  academy: string;
  strengths: string[];
  improvements: string[];
}

export const allPlayers: Player[] = [
  {
    id: 1,
    nameAr: "محمد العمري", nameEn: "Mohammed Al-Omari",
    age: 16, positionAr: "مهاجم", positionEn: "Forward",
    cityAr: "الدمام", cityEn: "Dammam",
    sport: "Football",
    score: 87, potential: 94, speed: 92, skill: 88,
    tactical: 78, fitness: 85, passing: 82, shooting: 90,
    goals: 23, assists: 12, matches: 31, rating: 8.4,
    statusAr: "نشط", statusEn: "Active", flag: "⭐",
    academy: "أكاديمية كابتن",
    strengths: ["سرعة استثنائية", "تسديد قوي", "حركة بدون كرة"],
    improvements: ["التكتيك الدفاعي", "الرأسيات"],
  },
  {
    id: 2,
    nameAr: "عبدالله الشهري", nameEn: "Abdullah Al-Shahri",
    age: 14, positionAr: "وسط", positionEn: "Midfielder",
    cityAr: "الخبر", cityEn: "Khobar",
    sport: "Football",
    score: 82, potential: 91, speed: 78, skill: 85,
    tactical: 90, fitness: 80, passing: 93, shooting: 76,
    goals: 8, assists: 27, matches: 28, rating: 8.1,
    statusAr: "نشط", statusEn: "Active", flag: "🔥",
    academy: "أكاديمية الموهبة الكروية",
    strengths: ["رؤية الملعب", "تمرير دقيق", "ذكاء تكتيكي"],
    improvements: ["السرعة", "التسديد من بعيد"],
  },
  {
    id: 3,
    nameAr: "فيصل القحطاني", nameEn: "Faisal Al-Qahtani",
    age: 17, positionAr: "حارس مرمى", positionEn: "Goalkeeper",
    cityAr: "الظهران", cityEn: "Dhahran",
    sport: "Football",
    score: 85, potential: 89, speed: 74, skill: 87,
    tactical: 88, fitness: 84, passing: 83, shooting: 40,
    goals: 0, assists: 3, matches: 25, rating: 7.9,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية الظهران الرياضية",
    strengths: ["ردود فعل فائقة", "قيادة الدفاع", "شجاعة"],
    improvements: ["التوزيع بالقدم", "الكرات الثابتة"],
  },
  {
    id: 4,
    nameAr: "خالد المطيري", nameEn: "Khalid Al-Mutairi",
    age: 15, positionAr: "مدافع", positionEn: "Defender",
    cityAr: "الدمام", cityEn: "Dammam",
    sport: "Football",
    score: 79, potential: 86, speed: 80, skill: 76,
    tactical: 82, fitness: 83, passing: 74, shooting: 55,
    goals: 4, assists: 8, matches: 22, rating: 7.6,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "مدرسة الأبطال الرياضية",
    strengths: ["تدخلات قوية", "تمركز جيد", "قوة بدنية"],
    improvements: ["التمرير الأمامي", "البناء من الخلف"],
  },
  {
    id: 5,
    nameAr: "سلطان الغامدي", nameEn: "Sultan Al-Ghamdi",
    age: 18, positionAr: "مهاجم", positionEn: "Forward",
    cityAr: "الخبر", cityEn: "Khobar",
    sport: "Basketball",
    score: 83, potential: 85, speed: 88, skill: 82,
    tactical: 75, fitness: 86, passing: 78, shooting: 87,
    goals: 19, assists: 7, matches: 30, rating: 7.8,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية النجوم الصاعدة",
    strengths: ["سرعة عالية", "تسديد قوي", "لياقة ممتازة"],
    improvements: ["التكتيك", "التمرير الأخير"],
  },
  {
    id: 6,
    nameAr: "عمر الدوسري", nameEn: "Omar Al-Dosari",
    age: 13, positionAr: "وسط", positionEn: "Midfielder",
    cityAr: "الظهران", cityEn: "Dhahran",
    sport: "Football",
    score: 76, potential: 93, speed: 72, skill: 79,
    tactical: 85, fitness: 74, passing: 88, shooting: 68,
    goals: 5, assists: 14, matches: 18, rating: 7.4,
    statusAr: "موهبة ناشئة", statusEn: "Rising Talent", flag: "🌟",
    academy: "أكاديمية الخليج للرياضة",
    strengths: ["إمكانية عالية جداً", "ذكاء تكتيكي", "تمرير"],
    improvements: ["السرعة", "اللياقة البدنية"],
  },
  {
    id: 7,
    nameAr: "يوسف العتيبي", nameEn: "Yousuf Al-Otaibi",
    age: 16, positionAr: "جناح", positionEn: "Winger",
    cityAr: "الدمام", cityEn: "Dammam",
    sport: "Football",
    score: 81, potential: 88, speed: 90, skill: 80,
    tactical: 74, fitness: 82, passing: 79, shooting: 78,
    goals: 14, assists: 18, matches: 27, rating: 7.7,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية كابتن",
    strengths: ["سرعة فائقة", "مراوغة", "عرضيات دقيقة"],
    improvements: ["التسديد", "العمل الدفاعي"],
  },
  {
    id: 8,
    nameAr: "تركي الزهراني", nameEn: "Turki Al-Zahrani",
    age: 17, positionAr: "مدافع", positionEn: "Defender",
    cityAr: "الخبر", cityEn: "Khobar",
    sport: "Swimming",
    score: 78, potential: 82, speed: 76, skill: 74,
    tactical: 80, fitness: 81, passing: 72, shooting: 50,
    goals: 2, assists: 5, matches: 24, rating: 7.3,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية الشرقية للكرة",
    strengths: ["تمركز دفاعي", "قراءة اللعب", "ثبات"],
    improvements: ["السرعة", "الكرات الهوائية"],
  },
  {
    id: 9,
    nameAr: "بدر الحربي", nameEn: "Badr Al-Harbi",
    age: 15, positionAr: "مهاجم", positionEn: "Forward",
    cityAr: "الظهران", cityEn: "Dhahran",
    sport: "Boxing",
    score: 80, potential: 90, speed: 85, skill: 78,
    tactical: 73, fitness: 83, passing: 75, shooting: 84,
    goals: 16, assists: 6, matches: 26, rating: 7.5,
    statusAr: "نشط", statusEn: "Active", flag: "🔥",
    academy: "أكاديمية الرياضة والتميز",
    strengths: ["تسديد قوي", "سرعة", "إمكانية عالية"],
    improvements: ["التكتيك", "التمرير"],
  },
  {
    id: 10,
    nameAr: "ماجد السبيعي", nameEn: "Majed Al-Subaie",
    age: 14, positionAr: "وسط", positionEn: "Midfielder",
    cityAr: "الدمام", cityEn: "Dammam",
    sport: "Football",
    score: 77, potential: 89, speed: 74, skill: 81,
    tactical: 83, fitness: 76, passing: 86, shooting: 65,
    goals: 6, assists: 19, matches: 21, rating: 7.6,
    statusAr: "موهبة ناشئة", statusEn: "Rising Talent", flag: "🌟",
    academy: "نادي الاتحاد الرياضي",
    strengths: ["تمرير دقيق", "رؤية الملعب", "إمكانية"],
    improvements: ["السرعة", "التسديد"],
  },
  {
    id: 11,
    nameAr: "راشد العنزي", nameEn: "Rashed Al-Anzi",
    age: 18, positionAr: "جناح", positionEn: "Winger",
    cityAr: "الخبر", cityEn: "Khobar",
    sport: "Basketball",
    score: 84, potential: 84, speed: 91, skill: 83,
    tactical: 76, fitness: 85, passing: 80, shooting: 79,
    goals: 21, assists: 11, matches: 32, rating: 8.0,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية النجوم الصاعدة",
    strengths: ["سرعة استثنائية", "مراوغة", "تسديد"],
    improvements: ["التكتيك الدفاعي", "التمرير"],
  },
  {
    id: 12,
    nameAr: "حمد البقمي", nameEn: "Hamad Al-Baqami",
    age: 16, positionAr: "حارس مرمى", positionEn: "Goalkeeper",
    cityAr: "الظهران", cityEn: "Dhahran",
    sport: "Football",
    score: 80, potential: 86, speed: 70, skill: 82,
    tactical: 84, fitness: 80, passing: 78, shooting: 35,
    goals: 0, assists: 2, matches: 20, rating: 7.5,
    statusAr: "نشط", statusEn: "Active", flag: "",
    academy: "أكاديمية الخليج للرياضة",
    strengths: ["تمركز جيد", "ردود فعل", "قيادة"],
    improvements: ["التوزيع", "الخروج"],
  },
];

// ── Helper functions ──────────────────────────────────────
export function getPlayerById(id: number): Player | undefined {
  return allPlayers.find((p) => p.id === id);
}

export function getPlayersByCity(city: string): Player[] {
  return allPlayers.filter((p) => p.cityEn === city || p.cityAr === city);
}

export function getPlayersBySport(sport: string): Player[] {
  return allPlayers.filter((p) => p.sport === sport);
}

export function getTopPlayers(n = 5): Player[] {
  return [...allPlayers].sort((a, b) => b.score - a.score).slice(0, n);
}

export function getPlayerName(p: Player, lang: "ar" | "en"): string {
  return lang === "ar" ? p.nameAr : p.nameEn;
}

export function getPlayerPosition(p: Player, lang: "ar" | "en"): string {
  return lang === "ar" ? p.positionAr : p.positionEn;
}

export function getPlayerCity(p: Player, lang: "ar" | "en"): string {
  return lang === "ar" ? p.cityAr : p.cityEn;
}
