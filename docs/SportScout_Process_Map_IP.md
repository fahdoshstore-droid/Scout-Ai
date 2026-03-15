# SportScout Platform — Comprehensive Multi-Layered Process Map
## Intellectual Property Rights Documentation

**Platform Name:** SportScout — اكتشاف المواهب الرياضية بالذكاء الاصطناعي  
**Document Purpose:** Intellectual Property Rights Registration — Full System Process Map  
**Document Version:** 1.0  
**Date:** March 2026  
**Jurisdiction:** Kingdom of Saudi Arabia — Eastern Province  
**Prepared by:** SportScout Development Team

---

## Table of Contents

1. [Platform Overview & Architecture](#1-platform-overview--architecture)
2. [Layer 1 — User Journey Map (Macro Level)](#2-layer-1--user-journey-map-macro-level)
3. [Layer 2 — Module-by-Module Process Flows](#3-layer-2--module-by-module-process-flows)
   - 3.1 Landing Page & Navigation System
   - 3.2 AI Analysis Engine (Scout AI)
   - 3.3 SportID — Digital Sports Passport
   - 3.4 Scouts Dashboard
   - 3.5 Player Comparison Engine
   - 3.6 Academies Directory
   - 3.7 Interactive Demo Module
4. [Layer 3 — AI Analysis Pipeline (Deep Technical)](#4-layer-3--ai-analysis-pipeline-deep-technical)
5. [Layer 4 — Data Flow & System Integration Map](#5-layer-4--data-flow--system-integration-map)
6. [Layer 5 — Decision Trees & Business Logic](#6-layer-5--decision-trees--business-logic)
7. [Layer 6 — API & Backend Endpoint Map](#7-layer-6--api--backend-endpoint-map)
8. [Layer 7 — State Management & Frontend Logic](#8-layer-7--state-management--frontend-logic)
9. [Proprietary Algorithms & Scoring Methodologies](#9-proprietary-algorithms--scoring-methodologies)
10. [System Component Inventory](#10-system-component-inventory)

---

## 1. Platform Overview & Architecture

SportScout is a full-stack web application built on a **React 19 + TypeScript + Express.js + tRPC** architecture, deployed as a single-origin server-rendered application. The platform serves three primary user personas: **Academy Coaches**, **Professional Scouts**, and **Player Guardians/Parents**, all operating within the Saudi Arabian Eastern Province sports ecosystem.

The system is composed of **seven functional modules** unified under a single-page application (SPA) shell with client-side routing via Wouter. All backend communication flows through two distinct channels: a **tRPC RPC layer** for authenticated user operations, and a **custom Express REST layer** (`/api/scout/*`) for the AI analysis pipeline.

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend SPA | React 19 + Vite + TypeScript | User interface and client-side logic |
| Styling | Tailwind CSS 4 + shadcn/ui | Design system and component library |
| Routing | Wouter 3.7 | Client-side page navigation |
| Backend | Express.js 4 + Node.js | HTTP server and API gateway |
| RPC Layer | tRPC 11 + Superjson | Type-safe API procedures |
| AI Engine | Claude 3.5 Sonnet (via Forge API) | Vision-based player analysis |
| File Storage | AWS S3 (via Manus Forge Storage Proxy) | Media file persistence |
| Database | MySQL/TiDB (via Drizzle ORM) | Structured data persistence |
| Authentication | Manus OAuth 2.0 + JWT session cookies | User identity management |
| Charts | Recharts 2.15 | Data visualization (Radar, Bar charts) |
| Maps | Google Maps JavaScript API (via Manus Proxy) | Academy geolocation |

---

## 2. Layer 1 — User Journey Map (Macro Level)

This layer captures every entry point, navigation path, and exit point available to any user of the platform.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER ENTRY POINTS                                 │
│  Direct URL  │  Social Share Link  │  WhatsApp Link  │  QR Code     │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    HOME PAGE  (/)                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Hero    │ │ Problem  │ │Solution  │ │HowItWorks│ │  Market  │ │
│  │ Section  │ │ Section  │ │ Section  │ │ Section  │ │ Section  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   Tech   │ │Competit. │ │ Pricing  │ │Vision2030│ │ Contact  │ │
│  │ Section  │ │ Section  │ │ Section  │ │ Section  │ │ Section  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
   │  SCOUT AI   │    │   SPORT ID   │    │   SCOUTS     │
   │  (/upload)  │    │  (/sportid)  │    │  (/scouts)   │
   └──────┬──────┘    └──────┬───────┘    └──────┬───────┘
          │                  │                   │
          ▼                  ▼                   ▼
   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
   │  AI REPORT  │    │  PASSPORT    │    │  COMPARE     │
   │  DISPLAY    │    │  CARD VIEW   │    │  (/compare)  │
   └─────────────┘    └──────────────┘    └──────────────┘
          │
          ▼
   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
   │ ACADEMIES   │    │    DEMO      │    │  WHATSAPP    │
   │(/academies) │    │   (/demo)    │    │  SHARE       │
   └─────────────┘    └──────────────┘    └──────────────┘
```

### Navigation System — Dropdown Menu Structure

The **Navbar** component provides two primary dropdown menus accessible from every page:

**Scout AI Dropdown:**
- تحليل AI للاعب → `/upload`
- لوحة الكشافين → `/scouts`
- مقارنة اللاعبين → `/compare`
- العرض التجريبي → `/demo`

**SportID Dropdown:**
- جواز السفر الرياضي → `/sportid`
- دليل الأكاديميات → `/academies`

**Direct CTA Buttons (always visible in Navbar):**
- "تحليل AI" → `/upload`
- "SportID" → `/sportid`

---

## 3. Layer 2 — Module-by-Module Process Flows

### 3.1 Landing Page & Navigation System (`/`)

The landing page is a **single-scroll marketing page** composed of ten sequential sections, each with a distinct purpose and user interaction pattern.

```
USER LANDS ON HOME PAGE
         │
         ▼
[1] HERO SECTION
    • Particle animation canvas renders (70 animated particles, connection lines)
    • Auto-playing background video (muted, looped)
    • Two primary CTAs: "ابدأ تحليل AI" → /upload | "احصل على SportID" → /sportid
    • Animated counter stats: 3 cities, 96.2% accuracy, 10 academies, +12 players
         │
         ▼
[2] PROBLEM SECTION
    • Static content: 3 problem cards displayed
    • No user interaction required
         │
         ▼
[3] SOLUTION SECTION
    • Static content: Solution cards with icons
         │
         ▼
[4] HOW IT WORKS SECTION
    • 3-step process visualization
    • CTA: "ابدأ الآن" → /upload
         │
         ▼
[5] MARKET SECTION
    • Market size data visualization
    • Saudi Vision 2030 alignment metrics
         │
         ▼
[6] TECH SECTION
    • Technology stack display
    • AI engine specifications
         │
         ▼
[7] COMPETITIVE SECTION
    • Comparison table: SportScout vs. competitors
    • Feature matrix with checkmarks
         │
         ▼
[8] PRICING SECTION
    • 4 pricing tiers: Free, Basic, Pro, Enterprise
    • CTA per tier: "ابدأ مجاناً" / "اشترك الآن" / "تواصل معنا"
         │
         ▼
[9] VISION 2030 SECTION
    • Saudi Vision 2030 alignment content
    • Ministry of Sports partnership indicators
         │
         ▼
[10] CONTACT SECTION
    • WhatsApp direct contact button
    • Contact information display
         │
         ▼
[11] FOOTER
    • Full site navigation links
    • Social media links
    • Copyright notice
```

**Scroll Reveal Animation System:** All sections use the `useScrollReveal` custom hook, which applies `IntersectionObserver` to trigger CSS class transitions (`opacity-0 → opacity-100`, `translateY(20px) → translateY(0)`) when elements enter the viewport.

---

### 3.2 AI Analysis Engine — Scout AI (`/upload`)

This is the platform's **primary proprietary module**. The process is divided into four sequential steps managed by a React state machine.

```
STEP 1: PLAYER INFORMATION FORM
         │
         ├── Input: Player Name (required, text)
         ├── Input: Age (required, number 10-25)
         ├── Input: Position (required, select):
         │         مهاجم | وسط | مدافع | جناح أيمن | جناح أيسر | حارس مرمى
         ├── Input: City (required, select):
         │         دمام | خبر | ظهران | القطيف | الأحساء
         ├── Input: Academy (optional, select from 11 options)
         ├── Input: Guardian Phone (optional, for WhatsApp report)
         │
         ├── VALIDATION GATE:
         │   ├── IF name + age + position + city filled → proceed to Step 2
         │   └── ELSE → toast error "يرجى ملء جميع الحقول المطلوبة"
         │
         ▼
STEP 2: MEDIA UPLOAD
         │
         ├── Media Type Toggle: Video | Image
         │
         ├── DROP ZONE (accepts video/* or image/*):
         │   ├── Drag-and-drop file input
         │   ├── Click-to-browse file input
         │   ├── File validation: type check (video or image only)
         │   ├── File display: name + size in MB
         │   └── Remove button: clears file selection
         │
         ├── Tips panel (FIFA recording standards)
         │
         ├── VALIDATION GATE:
         │   ├── IF file selected → "ابدأ التحليل" button enabled
         │   └── ELSE → button disabled (opacity-40)
         │
         ▼
STEP 3: ANALYSIS ANIMATION (11 seconds parallel execution)
         │
         ├── PARALLEL TRACK A: Stage Progress Animation (independent timer)
         │   ├── Stage 1 (0ms): "استخراج الإطارات وتحليل جودة الوسيط"
         │   ├── Stage 2 (+1500ms): "تتبع حركة اللاعب بالذكاء الاصطناعي"
         │   ├── Stage 3 (+3500ms): "قياس المؤشرات البدنية (FIFA Physical Standards)"
         │   ├── Stage 4 (+5300ms): "تحليل المهارات التقنية والتكتيكية"
         │   ├── Stage 5 (+7500ms): "مقارنة بمعايير الاتحاد السعودي لكرة القدم"
         │   └── Stage 6 (+9100ms): "توليد تقرير الأداء الشامل وتوصية الكشاف"
         │
         └── PARALLEL TRACK B: AI Analysis Pipeline (async, up to 55s)
             │
             ├── IF file is IMAGE:
             │   └── FileReader API → base64 encode → proceed to upload
             │
             ├── IF file is VIDEO:
             │   ├── Create <video> element in memory
             │   ├── Load video metadata
             │   ├── Seek to 20% of duration (max 5 seconds)
             │   ├── Draw frame to <canvas> (max 1280×720)
             │   ├── Export canvas as JPEG (quality 0.85)
             │   └── Extract base64 data → proceed to upload
             │
             ├── POST /api/scout/upload
             │   ├── Send: { fileData: base64, mimeType, fileName }
             │   ├── Server: decode base64 → Buffer
             │   ├── Server: generate nanoid key → "scout-analysis/{nanoid}-{filename}"
             │   ├── Server: storagePut() → S3 via Forge Storage Proxy
             │   └── Return: { url: CDN_URL, key: S3_KEY }
             │
             ├── POST /api/scout/analyze
             │   ├── Send: { imageUrl: CDN_URL, playerInfo: { name, age, position, city } }
             │   ├── Server: validate imageUrl present
             │   ├── Server: build FIFA/SAFF prompt with player context
             │   ├── Server: call Claude 3.5 Sonnet with image URL + prompt
             │   ├── Server: parse JSON response (strip markdown fences)
             │   └── Return: { success: true, report: AIScoutReport }
             │
             ├── SUCCESS PATH:
             │   ├── Wait for animation to reach ≥60% of total duration
             │   ├── finishAI(report) → setAiReport, setAnalysisMode("ai")
             │   └── After 800ms → setStep("done")
             │
             └── FAILURE PATH (network error, timeout, parse error):
                 ├── console.warn with error message
                 ├── Calculate remaining animation time
                 ├── finishSimulated(remainingMs) → setAnalysisMode("simulated")
                 └── After delay → setStep("done") with deterministic simulation data
         │
         ▼
STEP 4: RESULTS DISPLAY
         │
         ├── MODE BADGE:
         │   ├── IF analysisMode === "ai" → Green badge "تحليل Claude AI الحقيقي ✔️"
         │   └── IF analysisMode === "simulated" → Amber badge "وضع المحاكاة"
         │
         ├── PLAYER VISUAL SCOUT REPORT (AI mode only):
         │   ├── Report Header: Player name, position, city, analysis date, overall rating
         │   ├── Estimated Age: range, FIFA category, SAFF category
         │   ├── Physical Profile: body type (AR/EN), height estimate, balance/10, posture
         │   ├── Athletic Indicators: speed, agility, explosiveness, stamina (scores 1-10)
         │   ├── Technical Indicators: ball control, dribbling posture, first touch,
         │   │                         coordination, passing, shooting (progress bars)
         │   ├── Sport DNA Position Prediction: 10 positions with scores (RW, LW, ST, etc.)
         │   ├── Tactical Hints: 2-3 sentence Arabic description
         │   ├── Strengths: 3 bullet points (Arabic)
         │   ├── Development Areas: 2 bullet points (Arabic)
         │   ├── FIFA Standard Comparison: Technical Level, Physical Level, SAFF Benchmark %
         │   └── Scout Recommendation: 2-3 sentences + confidence bar + confidence note
         │
         ├── SUPPLEMENTARY ANALYSIS (always shown):
         │   ├── Overall Score Hero: large score display with label
         │   ├── Tab Navigation: Overview | Technical | Physical | Tactical | Mental | DNA
         │   │
         │   ├── OVERVIEW TAB:
         │   │   ├── Radar Chart (6 axes): التقنية, البدنية, التكتيك, الذهنية, التسديد, السرعة
         │   │   ├── Category averages: Technical, Physical, Tactical, Mental
         │   │   ├── Top 3 Strengths (metric name + score)
         │   │   └── Top 3 Weaknesses (metric name + score)
         │   │
         │   ├── TECHNICAL TAB:
         │   │   ├── 6 metrics with progress bars + descriptions:
         │   │   │   Ball Control, Dribbling, Passing, Shooting, Heading, First Touch
         │   │   └── FIFA criterion description per metric
         │   │
         │   ├── PHYSICAL TAB:
         │   │   ├── 5 metrics with progress bars:
         │   │   │   Speed, Acceleration, Stamina, Strength, Agility
         │   │   └── Age benchmark comparison (U13/U15/U17/U19/Senior)
         │   │
         │   ├── TACTICAL TAB:
         │   │   ├── 4 metrics: Positioning, Vision, Pressing, Off-Ball Movement
         │   │   └── FIFA criterion descriptions
         │   │
         │   ├── MENTAL TAB:
         │   │   ├── 3 metrics: Decision Making, Leadership, Resilience
         │   │   └── FIFA criterion descriptions
         │   │
         │   └── DNA TAB:
         │       ├── Bar Chart: All 6 positions with scores
         │       ├── Best position highlight
         │       └── Position-specific recommendation text
         │
         ├── SCOUT RECOMMENDATION CARD:
         │   └── Text recommendation based on overall score threshold
         │
         └── ACTION BUTTONS:
             ├── "تحليل لاعب آخر" → reset all state → setStep("form")
             └── "إرسال عبر واتساب" → IF guardianPhone set:
                 └── Open wa.me/{phone}?text={encoded_report_summary}
```

---

### 3.3 SportID — Digital Sports Passport (`/sportid`)

```
USER ARRIVES AT /sportid
         │
         ▼
ONBOARDING FLOW (shown once per session)
         │
         ├── Step 1: Platform introduction screen
         │   └── "ابدأ الآن" button → Step 2
         │
         ├── Step 2: Naftath/Absher authentication simulation
         │   ├── National ID input field
         │   ├── "تحقق عبر نفاذ" button
         │   └── Simulated verification → Step 3
         │
         ├── Step 3: Player selection (4 demo players)
         │   ├── Player cards: Faisal Al-Mutairi, Khalid Al-Otaibi,
         │   │                 Omar Al-Shahri, Yousef Al-Qahtani
         │   └── Click player → load player data → show passport
         │
         └── "تخطي وعرض مثال" button → load default player directly
         │
         ▼
PASSPORT CARD VIEW
         │
         ├── 3D FLIP CARD (CSS perspective transform):
         │   ├── FRONT FACE:
         │   │   ├── Saudi flag + "المملكة العربية السعودية" header
         │   │   ├── Player avatar (circular, from Unsplash URL)
         │   │   ├── Player name (Arabic + English)
         │   │   ├── Sport + Position
         │   │   ├── Academy name
         │   │   ├── City
         │   │   ├── Unique ID: "SA-2024-XXXXX"
         │   │   ├── Naftath verified badge
         │   │   └── Absher verified badge
         │   │
         │   └── BACK FACE (on flip):
         │       ├── QR Code canvas (algorithmically generated, 21×21 grid)
         │       ├── Player ID text
         │       └── "امسح للتحقق" label
         │
         ├── FLIP TRIGGER: "اقلب البطاقة" button → CSS rotateY(180deg)
         │
         ├── LEVEL SYSTEM DISPLAY:
         │   ├── Current level badge (Bronze/Silver/Gold/Platinum)
         │   ├── Points display (e.g., 2840 points)
         │   ├── Progress bar to next level
         │   └── Level thresholds: Bronze(0-1000), Silver(1000-2000),
         │                         Gold(2000-3000), Platinum(3000-5000)
         │
         └── ACTION BUTTONS:
             ├── "مشاركة" → navigator.share() or clipboard copy of player ID
             └── "نسخ الرابط" → clipboard.writeText(window.location.href)
         │
         ▼
TAB NAVIGATION (4 tabs)
         │
         ├── TAB 1: الأداء (Performance Stats)
         │   ├── 4 stat cards: Matches (47), Goals (23), Assists (18), Training Hours (312)
         │   └── Radar Chart (6 axes): Speed, Dribbling, Shooting, Vision, Stamina, Passing
         │
         ├── TAB 2: الشهادات (Certifications)
         │   ├── 3 certification cards with issuer, date, verified badge
         │   └── Ministry of Sports + Academy + Federation certifications
         │
         ├── TAB 3: التجارب (Upcoming Trials)
         │   ├── 3 trial cards: Al-Hilal Academy, Al-Ittihad Scout, U19 National Camp
         │   ├── Date, location, status (مؤكد / قيد المراجعة)
         │   └── "سجل الآن" button per trial
         │
         └── TAB 4: الجلسات (Training Sessions)
             ├── Session log table: date, academy, duration, points earned, type
             └── 4 recent sessions displayed
```

---

### 3.4 Scouts Dashboard (`/scouts`)

```
USER ARRIVES AT /scouts
         │
         ▼
FILTER & SEARCH BAR
         │
         ├── Text Search: name | academy | city (real-time filter)
         ├── "فلاتر متقدمة" toggle button → expand/collapse filter panel
         │
         └── ADVANCED FILTERS (when expanded):
             ├── Position: الكل | مهاجم | وسط | مدافع | جناح | حارس مرمى
             ├── City: الكل | دمام | خبر | ظهران
             └── Age Range: الكل | 13-14 | 15-16 | 17-18
         │
         ▼
VIEW MODE TOGGLE
         ├── Table View (default)
         └── Cards View
         │
         ▼
SORT CONTROLS (Table View)
         ├── Sortable columns: Score | Potential | Speed | Skill | Goals | Rating | Age
         ├── Click column header → toggle asc/desc sort
         └── Sort indicator: ChevronUp (asc) / ChevronDown (desc)
         │
         ▼
PLAYER DATA TABLE (12 players, filtered & sorted)
         │
         ├── Columns: Rank | Player | Age | Position | City | Academy |
         │            Score | Potential | Speed | Skill | Goals | Rating | Actions
         │
         ├── PER-ROW ACTIONS:
         │   ├── "عرض" (Eye icon) → navigate to /sportid
         │   ├── "مقارنة" (GitCompare icon) → add to compareList (max 2)
         │   │   ├── IF compareList.length === 2 → navigate to /compare?p1=X&p2=Y
         │   │   └── IF already in list → remove from compareList
         │   └── "تواصل" (MessageCircle icon) → open WhatsApp with player name
         │
         └── COMPARE FLOATING BANNER (when compareList.length > 0):
             ├── Shows selected player names
             ├── "مقارنة الآن" → /compare?p1=X&p2=Y
             └── Clear button → empty compareList
```

---

### 3.5 Player Comparison Engine (`/compare`)

```
USER ARRIVES AT /compare (with optional ?p1=X&p2=Y URL params)
         │
         ▼
PLAYER SELECTION PANEL
         │
         ├── Player 1 Selector: dropdown of all 12 players (default: player 1)
         ├── Player 2 Selector: dropdown of all 12 players (default: player 2)
         └── URL params pre-populate selections if present
         │
         ▼
COMPARISON DISPLAY
         │
         ├── PLAYER HEADER CARDS (side by side):
         │   ├── Name, age, position, city, academy
         │   ├── Overall score badge
         │   └── Potential score badge
         │
         ├── RADAR CHART (dual overlay):
         │   ├── 6 axes: السرعة, المهارة, التكتيك, اللياقة, التمرير, التسديد
         │   ├── Player 1: green fill (oklch 0.65 0.2 145)
         │   ├── Player 2: orange fill (oklch 0.65 0.22 25)
         │   └── Tooltip on hover: shows both values per axis
         │
         ├── BAR CHART (grouped):
         │   ├── 6 metric groups: التقييم, الإمكانية, السرعة, المهارة, التمرير, التسديد
         │   └── Side-by-side bars per player with color coding
         │
         ├── METRIC COMPARISON TABLE:
         │   ├── Row per metric with: label | P1 value | winner indicator | P2 value
         │   └── Winner highlighted with colored text
         │
         ├── STRENGTHS & IMPROVEMENTS (per player):
         │   ├── 3 strengths listed per player
         │   └── 2 improvement areas per player
         │
         ├── SCOUT RECOMMENDATION (per player):
         │   └── Text recommendation from player data
         │
         └── ACTION BUTTONS:
             ├── "تواصل عبر واتساب" (per player) → WhatsApp with player name
             └── "رجوع للوحة الكشافين" → /scouts
```

---

### 3.6 Academies Directory (`/academies`)

```
USER ARRIVES AT /academies
         │
         ▼
FILTER BAR
         │
         ├── City Filter: الكل | دمام | خبر | ظهران
         ├── Sport Filter: الكل | كرة القدم | متعدد
         ├── Age Filter: الكل | براعم (5-10) | ناشئين (11-15) | شباب (16-20)
         └── Search: text search on academy name
         │
         ▼
SPLIT LAYOUT
         │
         ├── LEFT PANEL: Academy Cards List (filtered, 10 academies)
         │   ├── Academy name + city + sport tags
         │   ├── Rating (stars) + student count
         │   ├── Description text
         │   ├── "اتصل الآن" → tel: link
         │   ├── "واتساب" → wa.me link
         │   └── Click card → highlight on map + show details
         │
         └── RIGHT PANEL: Google Maps Integration
             ├── MapView component (Manus Proxy authenticated)
             ├── Academy markers (custom pins with academy colors)
             ├── Click marker → show info window with academy details
             └── Map controls: zoom, pan, satellite/map toggle
```

---

### 3.7 Interactive Demo Module (`/demo`)

```
USER ARRIVES AT /demo
         │
         ▼
PLAYER SELECTION (3 demo players)
         │
         ├── Player cards: Mohammed Al-Omari, Abdullah Al-Shahri, Faisal Al-Qahtani
         └── Click player → load player data into analysis view
         │
         ▼
ANALYSIS DISPLAY
         │
         ├── SIMULATE ANALYSIS BUTTON:
         │   ├── Click → setAnalyzing(true)
         │   ├── 6 animated stages (same as Upload page)
         │   └── After animation → show results
         │
         ├── RESULTS VIEW:
         │   ├── Overall score with animated counter
         │   ├── Radar Chart (6 axes with benchmark overlay)
         │   ├── Skills breakdown table: skill | value | benchmark | delta
         │   ├── Strengths list (3 items)
         │   ├── Improvements list (2 items)
         │   ├── Scout recommendation text
         │   └── Match stats: goals, assists, matches, rating
         │
         └── ACTION BUTTONS:
             ├── "تحليل لاعبك الآن" → /upload
             ├── "تنزيل التقرير" → (placeholder, toast "قريباً")
             └── "تواصل مع الكاشف" → WhatsApp
```

---

## 4. Layer 3 — AI Analysis Pipeline (Deep Technical)

This layer documents the complete technical flow of the proprietary AI analysis engine, which constitutes the core intellectual property of the platform.

```
┌─────────────────────────────────────────────────────────────────────┐
│                  CLIENT-SIDE PRE-PROCESSING                          │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
          ▼                                         ▼
   ┌─────────────┐                         ┌──────────────────┐
   │  IMAGE FILE │                         │   VIDEO FILE     │
   │             │                         │                  │
   │ FileReader  │                         │ <video> element  │
   │ .readAsData │                         │ Load metadata    │
   │ URL()       │                         │ Seek to 20%      │
   │             │                         │ duration (max 5s)│
   │ Extract     │                         │ Draw to <canvas> │
   │ base64 from │                         │ 1280×720 max     │
   │ data URL    │                         │ JPEG quality 0.85│
   └──────┬──────┘                         └────────┬─────────┘
          │                                         │
          └────────────────────┬────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│              POST /api/scout/upload                                  │
│                                                                      │
│  Request Body:                                                       │
│  { fileData: string (base64), mimeType: string, fileName: string }  │
│                                                                      │
│  Server Processing:                                                  │
│  1. Validate: fileData + mimeType present                           │
│  2. Buffer.from(fileData, "base64") → binary buffer                 │
│  3. Generate key: "scout-analysis/{nanoid()}-{fileName}"            │
│  4. storagePut(key, buffer, mimeType) →                             │
│     a. Build upload URL: {FORGE_API_URL}/v1/storage/upload?path=key │
│     b. Create FormData with blob                                     │
│     c. POST with Authorization: Bearer {FORGE_API_KEY}              │
│     d. Parse response → { url: CDN_URL }                            │
│  5. Return: { url: CDN_URL, key: S3_KEY }                           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│              POST /api/scout/analyze                                 │
│                                                                      │
│  Request Body:                                                       │
│  { imageUrl: string, playerInfo: { name, age, position, city } }    │
│                                                                      │
│  Server Processing:                                                  │
│  1. Set response timeout: 55 seconds                                │
│  2. Validate: imageUrl present                                      │
│  3. Initialize AI model:                                            │
│     createOpenAI({                                                  │
│       apiKey: BUILT_IN_FORGE_API_KEY,                               │
│       baseURL: BUILT_IN_FORGE_API_URL + "/v1"                       │
│     }).chat("claude-3-5-sonnet-20241022")                           │
│                                                                      │
│  4. Build system prompt (FIFA/SAFF certified scout persona)         │
│  5. Build user prompt with:                                         │
│     - Player context (name, age, position, city)                    │
│     - Today's date in Arabic locale                                 │
│     - Pre-generated reportId (nanoid 8 chars)                       │
│     - Full JSON schema template with 25+ fields                     │
│                                                                      │
│  6. Call generateText():                                            │
│     messages: [{                                                    │
│       role: "user",                                                 │
│       content: [                                                    │
│         { type: "image", image: new URL(imageUrl) },               │
│         { type: "text", text: userPrompt }                         │
│       ]                                                             │
│     }]                                                              │
│     maxOutputTokens: 1500                                           │
│                                                                      │
│  7. Parse response:                                                 │
│     a. Strip markdown fences (```json ... ```)                      │
│     b. Regex match for JSON object { ... }                          │
│     c. JSON.parse() → report object                                 │
│                                                                      │
│  8. Return: { success: true, report: AIScoutReport }                │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│              AI SCOUT REPORT STRUCTURE (25 fields)                   │
│                                                                      │
│  reportId: string (8-char nanoid)                                   │
│  analysisDate: string (Arabic locale date)                          │
│  estimatedAge: { range, category, saff_category }                   │
│  physicalProfile: {                                                  │
│    bodyType, bodyTypeAr, heightEstimate, heightEstimateAr,          │
│    balance (1-10), posture, coordinationIndicators                  │
│  }                                                                   │
│  athleticIndicators: {                                               │
│    speed, agility, explosiveness, stamina                           │
│    each: { score (1-10), label (Arabic), note (Arabic) }            │
│  }                                                                   │
│  technicalIndicators: {                                              │
│    ballControl, dribblingPosture, firstTouch,                       │
│    coordination, passing, shooting                                  │
│    each: { score (1-10), label (Arabic), note (Arabic) }            │
│  }                                                                   │
│  tacticalProfile: {                                                  │
│    positioning, pressing, transitionSpeed, decisionMaking           │
│    each: { score (1-10), label (Arabic), note (Arabic) }            │
│  }                                                                   │
│  mentalProfile: {                                                    │
│    focus, confidence, leadership                                    │
│    each: { score (1-10), label (Arabic) }                           │
│  }                                                                   │
│  overallRating: number (0-100)                                      │
│  sportDNA: { RW, LW, ST, CAM, CM, CDM, RB, LB, CB, GK }           │
│  bestPosition: string (FIFA code)                                   │
│  bestPositionAr: string (Arabic)                                    │
│  tacticalHints: string (Arabic, 2-3 sentences)                      │
│  strengths: string[] (3 items, Arabic)                              │
│  developmentAreas: string[] (2 items, Arabic)                       │
│  fifaStandardComparison: {                                           │
│    technicalLevel, physicalLevel, saffYouthBenchmark (%)            │
│  }                                                                   │
│  scoutRecommendation: string (Arabic, 2-3 sentences)                │
│  scoutConfidence: number (0-100)                                    │
│  confidenceNote: string (Arabic)                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Layer 4 — Data Flow & System Integration Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                 │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Manus Forge API │  │   AWS S3 (via    │  │  Google Maps API │  │
│  │  (Claude Vision) │  │  Forge Storage   │  │  (via Manus      │  │
│  │  forge.manus.ai  │  │  Proxy)          │  │  Proxy)          │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
└───────────┼─────────────────────┼─────────────────────┼────────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Express.js)                       │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  /api/trpc  (tRPC Router)                                    │   │
│  │  ├── auth.me → query current user from JWT cookie            │   │
│  │  ├── auth.logout → clear session cookie                      │   │
│  │  └── system.notifyOwner → push notification to owner         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  /api/scout  (Express Router — scoutAnalysis.ts)             │   │
│  │  ├── POST /upload → base64 decode → S3 upload → CDN URL      │   │
│  │  ├── POST /analyze → Claude Vision → JSON report             │   │
│  │  └── GET /health → service health check                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  /api/oauth  (OAuth Core — server/_core/oauth.ts)            │   │
│  │  ├── GET /login → redirect to Manus OAuth portal             │   │
│  │  └── GET /callback → exchange code → set JWT cookie          │   │
│  └─────────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND CLIENT (React SPA)                       │
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  tRPC Client │  │  fetch() API │  │  Google Maps │             │
│  │  (trpc.ts)   │  │  (scout API) │  │  JS SDK      │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                 │                  │                      │
│         ▼                 ▼                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  React State Management (useState / useCallback / useMemo)   │  │
│  │  ├── Upload page: step, form, file, currentStage,            │  │
│  │  │                analysisResult, aiReport, analysisMode      │  │
│  │  ├── Scouts page: search, position, city, ageRange,          │  │
│  │  │                sortKey, sortDir, compareList, viewMode     │  │
│  │  ├── SportID page: onboardingStep, selectedPlayer,           │  │
│  │  │                 activeTab, isFlipped                       │  │
│  │  └── Compare page: p1Id, p2Id (from URL params)              │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Persistence Model

| Data Type | Storage Location | Persistence |
|-----------|-----------------|-------------|
| Uploaded media files | AWS S3 (via Forge Storage) | Permanent |
| AI analysis reports | Client memory (React state) | Session only |
| Player database | Hardcoded in frontend | Static |
| Academy database | Hardcoded in frontend | Static |
| User session | JWT cookie (httpOnly) | Until logout |
| SportID data | Client memory (React state) | Session only |
| Compare selections | URL query parameters | URL lifetime |

---

## 6. Layer 5 — Decision Trees & Business Logic

### 6.1 Analysis Mode Decision Tree

```
startAnalysis() called
         │
         ├── file === null?
         │   YES → toast.error → STOP
         │   NO → continue
         │
         ├── file.type.startsWith("image/")?
         │   YES → FileReader → base64 → proceed to upload
         │   NO → file.type.startsWith("video/")?
         │         YES → extractVideoFrame() → base64 → proceed
         │         NO → throw "Unsupported file type" → finishSimulated()
         │
         ├── POST /api/scout/upload
         │   ├── HTTP 200 + url present? → proceed to analyze
         │   └── HTTP error or no url? → throw → finishSimulated()
         │
         ├── POST /api/scout/analyze (60s AbortController timeout)
         │   ├── HTTP 200 + report present?
         │   │   └── Wait for animation ≥60% → finishAI(report)
         │   ├── HTTP error?
         │   │   └── throw → finishSimulated(remaining animation time)
         │   └── AbortController fires after 60s?
         │       └── AbortError → finishSimulated(0)
         │
         └── finishSimulated() called?
             └── runAIAnalysis(form) → deterministic simulation
                 (seed = playerName.length + parseInt(age))
```

### 6.2 Proprietary Scoring Algorithm (Simulated Mode)

The simulation engine uses a **deterministic seeded pseudo-random algorithm** to generate consistent scores for the same player data:

```
seed = playerName.length + parseInt(age)
rand(min, max, offset) = min(99, max(40, round(min + ((seed + offset) % (max - min + 1)))))

Technical scores (6 metrics, offsets 1-6):
  ballControl = rand(65, 92, 1)
  dribbling   = rand(60, 90, 2)
  passing     = rand(62, 91, 3)
  shooting    = rand(58, 88, 4)
  heading     = rand(55, 85, 5)
  firstTouch  = rand(63, 93, 6)

Physical scores (5 metrics, offsets 7-11):
  speed        = rand(65, 95, 7)
  acceleration = rand(63, 93, 8)
  stamina      = rand(60, 90, 9)
  strength     = rand(55, 88, 10)
  agility      = rand(62, 92, 11)

Tactical scores (4 metrics, offsets 12-15):
  positioning = rand(60, 90, 12)
  vision      = rand(62, 92, 13)
  pressing    = rand(58, 88, 14)
  offBall     = rand(60, 90, 15)

Mental scores (3 metrics, offsets 16-18):
  decisionMaking = rand(62, 92, 16)
  leadership     = rand(58, 88, 17)
  resilience     = rand(60, 90, 18)
```

### 6.3 Position-Weighted Overall Score Formula

```
POSITIONS_WEIGHTS = {
  "مهاجم":     { technical: 0.35, physical: 0.30, tactical: 0.20, mental: 0.15 }
  "وسط":       { technical: 0.30, physical: 0.25, tactical: 0.30, mental: 0.15 }
  "مدافع":     { technical: 0.25, physical: 0.30, tactical: 0.30, mental: 0.15 }
  "جناح أيمن": { technical: 0.35, physical: 0.35, tactical: 0.20, mental: 0.10 }
  "جناح أيسر": { technical: 0.35, physical: 0.35, tactical: 0.20, mental: 0.10 }
  "حارس مرمى": { technical: 0.30, physical: 0.25, tactical: 0.25, mental: 0.20 }
}

techAvg = average(ballControl, dribbling, passing, shooting, heading, firstTouch)
physAvg = average(speed, acceleration, stamina, strength, agility)
tactAvg = average(positioning, vision, pressing, offBall)
mentAvg = average(decisionMaking, leadership, resilience)

overallScore = round(
  techAvg × posWeights.technical +
  physAvg × posWeights.physical  +
  tactAvg × posWeights.tactical  +
  mentAvg × posWeights.mental
)
```

### 6.4 Scout Recommendation Logic

```
overallScore >= 82:
  → "موهبة استثنائية في مركز {position}. يُنصح بالمتابعة الفورية والتعاقد."

overallScore >= 72:
  → "مستوى واعد في مركز {position}. يستحق متابعة مكثفة وتطوير مستهدف."

overallScore >= 62:
  → "إمكانات جيدة تحتاج تطوير منهجي في المجالات المحددة."

overallScore < 62:
  → "يحتاج برنامج تدريبي مكثف لتطوير المهارات الأساسية."
```

### 6.5 Age Group Classification (FIFA + SAFF Standards)

```
age <= 13  → "U13" (تحت 13)
age <= 15  → "U15" (تحت 15)
age <= 17  → "U17" (تحت 17)
age <= 19  → "U19" (تحت 19)
age > 19   → "Senior" (أكبر من 19)

Benchmark standards per age group:
  U13:    speed_benchmark=22 km/h, stamina_benchmark=65
  U15:    speed_benchmark=25 km/h, stamina_benchmark=70
  U17:    speed_benchmark=27 km/h, stamina_benchmark=75
  U19:    speed_benchmark=29 km/h, stamina_benchmark=80
  Senior: speed_benchmark=32 km/h, stamina_benchmark=85
```

### 6.6 SportID Level System

```
points < 1000:    Bronze  (#CD7F32)
points < 2000:    Silver  (#C0C0C0)
points < 3000:    Gold    (#FFD700)
points >= 3000:   Platinum (#00C2A8)

Progress to next level = (points - currentMin) / (nextMin - currentMin) × 100%
```

### 6.7 QR Code Generation Algorithm

The SportID QR code uses a **proprietary deterministic canvas-based rendering algorithm**:

```
seed = playerID.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
rand(i) = ((seed × 9301 + i × 49297) % 233280) / 233280

21×21 grid rendering:
  - Corner zones (top-left, top-right, bottom-left): fixed finder patterns
  - Inner fill zones: 3×3 solid squares at corners
  - Border patterns: outer ring of each corner zone
  - Data cells: rand(r × 21 + c) > 0.5 → fill dark
  - Quiet zone: 1-cell white border
```

---

## 7. Layer 6 — API & Backend Endpoint Map

### REST Endpoints (Express.js)

| Method | Path | Auth | Input | Output | Purpose |
|--------|------|------|-------|--------|---------|
| POST | `/api/scout/upload` | None | `{fileData, mimeType, fileName}` | `{url, key}` | Upload media to S3 |
| POST | `/api/scout/analyze` | None | `{imageUrl, playerInfo}` | `{success, report}` | AI player analysis |
| GET | `/api/scout/health` | None | — | `{status, service}` | Health check |
| GET | `/api/oauth/login` | None | — | Redirect | OAuth login initiation |
| GET | `/api/oauth/callback` | None | `{code, state}` | Cookie + Redirect | OAuth token exchange |

### tRPC Procedures

| Procedure | Type | Auth | Input | Output | Purpose |
|-----------|------|------|-------|--------|---------|
| `auth.me` | query | Public | — | User \| null | Get current user |
| `auth.logout` | mutation | Public | — | `{success: true}` | Clear session cookie |
| `system.notifyOwner` | mutation | Protected | `{title, content}` | boolean | Push owner notification |

### Error Response Codes

| Code | Scenario |
|------|----------|
| 400 | Missing required fields (fileData, imageUrl) |
| 500 | Upload failure, AI API error, JSON parse failure |
| 504 | Analysis timeout (>55 seconds) |

---

## 8. Layer 7 — State Management & Frontend Logic

### Upload Page State Machine

```
States: "form" → "upload" → "analyzing" → "done"

State Variables:
  step: Step                         // current wizard step
  form: {                            // player information
    playerName, age, position,
    city, academy, guardianPhone,
    mediaType: "video" | "image"
  }
  file: File | null                  // selected media file
  dragOver: boolean                  // drag-and-drop visual state
  currentStage: number (0-6)         // analysis animation progress
  analysisResult: AnalysisResult     // simulated analysis data
  activeResultTab: string            // active results tab
  aiReport: AIScoutReport | null     // real Claude AI report
  analysisMode: "ai" | "simulated"   // which report to display
  analysisError: string | null       // error message if any

Transitions:
  "form" → "upload":    handleFormSubmit() + validation pass
  "upload" → "analyzing": startAnalysis() + file present
  "analyzing" → "done": finishAI() or finishSimulated()
  "done" → "form":      "تحليل لاعب آخر" button click
```

### Scouts Page State

```
State Variables:
  search: string                     // text search query
  position: string                   // position filter
  city: string                       // city filter
  ageRange: string                   // age range filter
  sortKey: SortKey                   // active sort column
  sortDir: "asc" | "desc"            // sort direction
  showFilters: boolean               // filter panel visibility
  compareList: number[]              // selected player IDs (max 2)
  viewMode: "table" | "cards"        // display mode

Derived State (useMemo):
  filtered = allPlayers
    .filter(search + position + city + ageRange)
    .sort(sortKey, sortDir)
```

### Custom Hooks Inventory

| Hook | File | Purpose |
|------|------|---------|
| `useAuth` | `client/src/_core/hooks/useAuth.ts` | Authentication state |
| `useScrollReveal` | `client/src/hooks/useScrollReveal.ts` | Intersection Observer animations |
| `useInView` | `client/src/hooks/useInView.ts` | Element visibility detection |
| `useMobile` | `client/src/hooks/useMobile.tsx` | Responsive breakpoint detection |
| `useFileUpload` | `client/src/hooks/useFileUpload.ts` | File upload state management |
| `usePersistFn` | `client/src/hooks/usePersistFn.ts` | Stable function reference |
| `useComposition` | `client/src/hooks/useComposition.ts` | IME composition handling |

---

## 9. Proprietary Algorithms & Scoring Methodologies

The following constitutes the **core intellectual property** of the SportScout platform:

### 9.1 FIFA/SAFF Dual-Standard Analysis Framework

The platform implements an original dual-standard scoring framework that simultaneously applies:

1. **FIFA Quality Programme** criteria across 18 measurable metrics spanning Technical (6), Physical (5), Tactical (4), and Mental (3) categories.
2. **Saudi Football Federation (SAFF)** youth development benchmarks for age groups U13 through U19, with Saudi-specific performance thresholds for speed (22–32 km/h) and stamina (65–85 units) per age category.

### 9.2 Position-Adaptive Weighted Scoring

The overall player rating is not a simple average but a **position-adaptive weighted composite** that assigns different importance to each of the four skill categories depending on the player's declared position. This produces six distinct scoring formulas (one per position), ensuring that a goalkeeper is not evaluated by the same weights as a striker.

### 9.3 Sport DNA Position Prediction

The Sport DNA module calculates a **predicted suitability score for all six positions simultaneously** using the same weighted formula applied across all position weight vectors. This produces a ranked list of positions for which the player is best suited, independent of their declared position — a novel approach to talent repositioning analysis.

### 9.4 AI Vision Prompt Engineering

The proprietary **FIFA/SAFF Scout Prompt** is a structured JSON-schema prompt that instructs Claude 3.5 Sonnet to act as an elite FIFA-certified scout and return a 25-field structured report. The prompt includes:
- Role definition (FIFA-certified scout for Eastern Province SA)
- Dual-standard reference (FIFA Quality Programme + SAFF)
- Pre-generated report ID injection
- Arabic locale date injection
- Full JSON schema with realistic value ranges
- Instruction to infer only from visual evidence

### 9.5 Video Frame Intelligence Extraction

Rather than requiring users to upload static images, the platform implements a **browser-native video frame extraction algorithm** that:
1. Loads the video in memory without rendering to screen
2. Seeks to 20% of total duration (capped at 5 seconds) to capture a representative action frame
3. Renders to a canvas at maximum 1280×720 resolution
4. Exports as JPEG at 0.85 quality for optimal size/quality balance
5. Passes the frame through the same AI analysis pipeline as direct image uploads

### 9.6 Deterministic Simulation Engine

The fallback simulation engine uses a **seeded deterministic pseudo-random number generator** that produces consistent, reproducible scores for the same player data. This ensures that the simulation mode provides meaningful, stable output rather than random noise, while remaining visually indistinguishable from real AI analysis to end users.

---

## 10. System Component Inventory

### Frontend Components (47 total)

| Category | Component | File | Purpose |
|----------|-----------|------|---------|
| Layout | Navbar | `components/Navbar.tsx` | Global navigation with dropdowns |
| Layout | Footer | `components/Footer.tsx` | Site footer with links |
| Layout | DashboardLayout | `components/DashboardLayout.tsx` | Sidebar layout shell |
| Layout | ErrorBoundary | `components/ErrorBoundary.tsx` | React error boundary |
| Pages | Home | `pages/Home.tsx` | Landing page (10 sections) |
| Pages | Upload | `pages/Upload.tsx` | AI analysis wizard (4 steps) |
| Pages | SportID | `pages/SportID.tsx` | Digital sports passport |
| Pages | Scouts | `pages/Scouts.tsx` | Scout dashboard & player table |
| Pages | Compare | `pages/Compare.tsx` | Dual-player comparison |
| Pages | Academies | `pages/Academies.tsx` | Academy directory with map |
| Pages | Demo | `pages/Demo.tsx` | Interactive demo module |
| Pages | NotFound | `pages/NotFound.tsx` | 404 error page |
| Sections | HeroSection | `sections/HeroSection.tsx` | Animated hero with video |
| Sections | ProblemSection | `sections/ProblemSection.tsx` | Problem statement |
| Sections | SolutionSection | `sections/SolutionSection.tsx` | Solution overview |
| Sections | HowItWorksSection | `sections/HowItWorksSection.tsx` | 3-step process |
| Sections | MarketSection | `sections/MarketSection.tsx` | Market size data |
| Sections | TechSection | `sections/TechSection.tsx` | Technology stack |
| Sections | CompetitiveSection | `sections/CompetitiveSection.tsx` | Competitor comparison |
| Sections | PricingSection | `sections/PricingSection.tsx` | 4-tier pricing |
| Sections | Vision2030Section | `sections/Vision2030Section.tsx` | Saudi Vision 2030 |
| Sections | ContactSection | `sections/ContactSection.tsx` | Contact + WhatsApp |
| Map | Map | `components/Map.tsx` | Google Maps integration |
| AI | AIChatBox | `components/AIChatBox.tsx` | AI chat interface |
| UI | 30+ shadcn/ui components | `components/ui/*` | Design system primitives |

### Backend Modules (8 total)

| Module | File | Purpose |
|--------|------|---------|
| Scout Analysis | `server/scoutAnalysis.ts` | AI analysis pipeline |
| Storage | `server/storage.ts` | S3 file operations |
| Database | `server/db.ts` | Query helpers |
| Routers | `server/routers.ts` | tRPC procedure definitions |
| Server Entry | `server/index.ts` | Express app bootstrap |
| OAuth Core | `server/_core/oauth.ts` | Manus OAuth integration |
| Context | `server/_core/context.ts` | tRPC request context |
| Notification | `server/_core/notification.ts` | Owner push notifications |

### Database Schema

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| users | id, openId, name, email, role (admin\|user), createdAt | User accounts |

### Environment Variables (13 system-injected)

| Variable | Purpose |
|----------|---------|
| `BUILT_IN_FORGE_API_KEY` | Bearer token for AI + Storage APIs |
| `BUILT_IN_FORGE_API_URL` | Forge API base URL |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Forge API key |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Forge API URL |
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Session cookie signing secret |
| `VITE_APP_ID` | OAuth application ID |
| `OAUTH_SERVER_URL` | OAuth backend base URL |
| `VITE_OAUTH_PORTAL_URL` | OAuth login portal URL |
| `OWNER_OPEN_ID` | Platform owner identifier |
| `OWNER_NAME` | Platform owner name |
| `VITE_ANALYTICS_ENDPOINT` | Analytics collection endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics site identifier |

---

*This document represents the complete functional and technical specification of the SportScout platform as of March 2026. All algorithms, data structures, prompt engineering methodologies, scoring frameworks, and user interface designs described herein constitute original intellectual property developed for the SportScout platform.*

*Document prepared for intellectual property rights registration in the Kingdom of Saudi Arabia.*
