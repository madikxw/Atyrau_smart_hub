import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    icon: "🌬️",
    accentColor: "#1A6DB5",
    bgGradient: "linear-gradient(135deg, #EBF4FF 0%, #DCEEFF 100%)",
    borderColor: "#BDD8F5",
    title: "ИИ-анализ загрязнения воздуха",
    desc: "Система ML для прогнозирования PM2.5 и CO₂ по данным 14 датчиков в реальном времени. Предсказывает пики загрязнения за 6 часов.",
    tags: ["AI/ML", "Экология", "Python"],
    tagVariants: ["blue", "teal", "blue"],
    team: "Лаб. интеллектуальных систем АГУ",
    year: "2024",
    stat: "94.1%",
    statLabel: "точность модели",
  },
  {
    icon: "💧",
    accentColor: "#0B9E75",
    bgGradient: "linear-gradient(135deg, #EAFAF4 0%, #D5F5E9 100%)",
    borderColor: "#A8E6CE",
    title: "Мониторинг качества воды р. Урал",
    desc: "IoT-сеть из 8 буёв с датчиками pH, нитратов, тяжёлых металлов. Данные передаются на платформу в реальном времени.",
    tags: ["IoT", "GIS", "Экология"],
    tagVariants: ["amber", "teal", "teal"],
    team: "Кафедра экологии АГУ",
    year: "2024",
    stat: "8 буёв",
    statLabel: "по всему Уралу",
  },
  {
    icon: "🛢️",
    accentColor: "#C47A15",
    bgGradient: "linear-gradient(135deg, #FEF9EE 0%, #FDF0D5 100%)",
    borderColor: "#F5D898",
    title: "Детекция утечек на нефтепроводах",
    desc: "Computer Vision на YOLOv8 для обнаружения разливов нефти по аэрофотосъёмке трубопровода Тенгиз–Атырау.",
    tags: ["Computer Vision", "Oil&Gas", "Дроны"],
    tagVariants: ["amber", "amber", "blue"],
    team: "Инженерный факультет АГУ",
    year: "2023",
    stat: "94.3%",
    statLabel: "точность детекции",
  },
  {
    icon: "☀️",
    accentColor: "#7C3AED",
    bgGradient: "linear-gradient(135deg, #F5F0FF 0%, #EDE4FF 100%)",
    borderColor: "#D4B8FA",
    title: "Атмосферное моделирование Прикаспия",
    desc: "Численное моделирование атмосферных процессов Прикаспийской низменности с учётом влияния Каспийского моря на климат.",
    tags: ["GIS", "Климат", "Python"],
    tagVariants: ["teal", "amber", "blue"],
    team: "Физ-мат факультет АГУ",
    year: "2024",
    stat: "±2.4°C",
    statLabel: "погрешность",
  },
  {
    icon: "🏙️",
    accentColor: "#1A6DB5",
    bgGradient: "linear-gradient(135deg, #EBF4FF 0%, #DCEEFF 100%)",
    borderColor: "#BDD8F5",
    title: "Умный светофор для Атырау",
    desc: "Адаптивная система управления трафиком с использованием компьютерного зрения и IoT-датчиков на 24 перекрёстках.",
    tags: ["AI", "Транспорт", "IoT"],
    tagVariants: ["blue", "teal", "amber"],
    team: "ИТ-факультет АГУ",
    year: "2025",
    stat: "−23%",
    statLabel: "снижение пробок",
  },
  {
    icon: "🌿",
    accentColor: "#0B9E75",
    bgGradient: "linear-gradient(135deg, #EAFAF4 0%, #D5F5E9 100%)",
    borderColor: "#A8E6CE",
    title: "Инвентаризация зелёных насаждений",
    desc: "GIS-картирование деревьев и газонов по снимкам Sentinel-2 и наземным обходам. Покрытие — весь Атырау.",
    tags: ["GIS", "Экология", "Remote Sensing"],
    tagVariants: ["teal", "teal", "blue"],
    team: "Кафедра географии АГУ",
    year: "2023",
    stat: "5,400+",
    statLabel: "объектов занесено",
  },
];

const jobs = [
  {
    emoji: "💻",
    title: "Junior Frontend Developer",
    company: "Tengizchevroil",
    type: "Стажировка",
    typeColor: "blue",
    desc: "Разработка внутренних веб-инструментов для инженерного департамента. Стек: React, TypeScript, REST API.",
    tags: ["React", "TypeScript"],
    tagVariants: ["blue", "blue"],
    salary: "250–350к тг/мес",
  },
  {
    emoji: "📊",
    title: "Data Analyst Intern",
    company: "NCOC",
    type: "Стажировка",
    typeColor: "blue",
    desc: "Анализ производственных данных, дашборды в Power BI, работа с Python/pandas для отчётности.",
    tags: ["Python", "Power BI", "SQL"],
    tagVariants: ["blue", "amber", "teal"],
    salary: "280–380к тг/мес",
  },
  {
    emoji: "🌱",
    title: "Environmental Research Assistant",
    company: "АГУ × КМГ",
    type: "Исследование",
    typeColor: "teal",
    desc: "Участие в проектах мониторинга экологии Атырауской области. Полевые работы, обработка данных датчиков.",
    tags: ["Экология", "GIS", "Python"],
    tagVariants: ["teal", "teal", "blue"],
    salary: "По договору",
  },
  {
    emoji: "🗺️",
    title: "GIS Engineer",
    company: "КазМунайГаз",
    type: "Full-time",
    typeColor: "green",
    desc: "Разработка геоинформационных систем для месторождений Тенгиз и Карашыганак. ArcGIS/QGIS.",
    tags: ["GIS", "ArcGIS", "QGIS"],
    tagVariants: ["teal", "amber", "amber"],
    salary: "600к–900к тг/мес",
  },
  {
    emoji: "🤖",
    title: "ML Engineer (Junior)",
    company: "Tengizchevroil Digital",
    type: "Full-time",
    typeColor: "green",
    desc: "Предиктивное обслуживание оборудования: временные ряды, Python, scikit-learn, production ML pipelines.",
    tags: ["ML", "Python", "scikit-learn"],
    tagVariants: ["blue", "blue", "teal"],
    salary: "500–750к тг/мес",
  },
];

const popData = [
  { yr: "2010", val: 290 },
  { yr: "2015", val: 310 },
  { yr: "2020", val: 340 },
  { yr: "2025", val: 355 },
];

const aguData = [
  { fac: "Нефтегаз", n: 1420, color: "#C47A15" },
  { fac: "ИТ", n: 980, color: "#1A6DB5" },
  { fac: "Педагогика", n: 1100, color: "#7C3AED" },
  { fac: "Экономика", n: 870, color: "#0B9E75" },
  { fac: "Экология", n: 640, color: "#E05A4E" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy: #0C1F3D;
  --blue: #1A6DB5;
  --blue-light: #2D85D0;
  --blue-pale: #EBF4FF;
  --blue-mid: #DCEEFF;
  --teal: #0B9E75;
  --teal-pale: #EAFAF4;
  --amber: #C47A15;
  --amber-pale: #FEF9EE;
  --red: #E05A4E;
  --red-pale: #FEF0EE;
  --purple: #7C3AED;
  --purple-pale: #F5F0FF;
  --bg: #F7FAFF;
  --surface: #FFFFFF;
  --surface2: #F0F6FF;
  --border: #E2EAF4;
  --border-strong: #C8D9ED;
  --text: #0C1F3D;
  --text-secondary: #4A6080;
  --text-muted: #8AA3BF;
  --shadow-sm: 0 1px 3px rgba(12,31,61,.06), 0 1px 2px rgba(12,31,61,.04);
  --shadow-md: 0 4px 12px rgba(12,31,61,.08), 0 2px 4px rgba(12,31,61,.05);
  --shadow-lg: 0 12px 32px rgba(12,31,61,.1), 0 4px 8px rgba(12,31,61,.06);
  --shadow-blue: 0 8px 24px rgba(26,109,181,.18);
}

html, body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.app { min-height: 100vh; display: flex; flex-direction: column; }

/* ── NAV ── */
.nav {
  position: sticky; top: 0; z-index: 200;
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
  display: flex; align-items: center; height: 64px;
  gap: 0;
}
.nav-logo {
  font-family: 'DM Serif Display', serif;
  font-size: 20px; color: var(--navy);
  display: flex; align-items: center; gap: 10px;
  margin-right: auto; text-decoration: none; cursor: default;
}
.nav-logo-mark {
  width: 32px; height: 32px; border-radius: 9px;
  background: linear-gradient(135deg, var(--blue) 0%, #0D5A9E 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; box-shadow: 0 2px 8px rgba(26,109,181,.3);
  flex-shrink: 0;
}
.nav-logo-text { letter-spacing: -0.3px; }
.nav-logo-text em { font-style: normal; color: var(--blue); }
.nav-links { display: flex; gap: 2px; }
.nav-btn {
  background: none; border: none; cursor: pointer;
  padding: 8px 13px; border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13.5px; font-weight: 500;
  color: var(--text-secondary);
  transition: all .18s ease;
  position: relative;
}
.nav-btn::after {
  content: ''; position: absolute;
  bottom: 4px; left: 50%; transform: translateX(-50%);
  width: 0; height: 2px; border-radius: 2px;
  background: var(--blue); transition: width .2s ease;
}
.nav-btn:hover { color: var(--blue); background: var(--blue-pale); }
.nav-btn.active { color: var(--blue); background: var(--blue-pale); font-weight: 600; }
.nav-btn.active::after { width: 18px; }
.nav-badge {
  background: var(--teal); color: #fff;
  font-size: 9px; font-weight: 700; letter-spacing: .06em;
  padding: 2px 5px; border-radius: 4px; margin-left: 4px;
  vertical-align: middle;
}

/* ── PAGE ── */
.page {
  flex: 1; padding: 44px 32px 80px;
  max-width: 960px; margin: 0 auto; width: 100%;
  animation: pageIn .3s cubic-bezier(.4,0,.2,1) both;
}
@keyframes pageIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

/* ── HERO ── */
.hero {
  position: relative; overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--border-strong);
  background: #fff;
  padding: 56px 52px 52px;
  margin-bottom: 28px;
  box-shadow: var(--shadow-md);
}
.hero-mesh {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 70% at 90% -10%, rgba(26,109,181,.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 100% 100%, rgba(11,158,117,.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at -5% 50%, rgba(26,109,181,.06) 0%, transparent 60%);
}
.hero-dots {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(26,109,181,.12) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at 80% 50%, black 0%, transparent 70%);
}
.hero-pill {
  display: inline-flex; align-items: center; gap: 7px;
  background: var(--blue-pale); border: 1px solid #BDD8F5;
  color: var(--blue); font-size: 11.5px; font-weight: 600;
  padding: 5px 13px; border-radius: 20px; margin-bottom: 22px;
  letter-spacing: .05em;
}
.hero-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--teal);
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
.hero h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 46px; line-height: 1.1; letter-spacing: -1px;
  color: var(--navy); margin-bottom: 16px;
  position: relative; z-index: 1;
}
.hero h1 .accent {
  position: relative; display: inline-block;
  background: linear-gradient(135deg, var(--blue) 0%, #1090D0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-desc {
  font-size: 15px; color: var(--text-secondary); line-height: 1.75;
  max-width: 500px; margin-bottom: 32px; position: relative; z-index: 1;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--blue) 0%, #1578C5 100%);
  color: #fff; border: none; border-radius: 11px;
  padding: 13px 24px; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600; cursor: pointer;
  box-shadow: var(--shadow-blue);
  transition: all .2s ease;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(26,109,181,.28); filter: brightness(1.05); }
.btn-primary:active { transform: translateY(0); }
.btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; color: var(--text);
  border: 1.5px solid var(--border-strong); border-radius: 11px;
  padding: 13px 24px; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 500; cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all .2s ease;
}
.btn-secondary:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.hero-float {
  position: absolute; right: 48px; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 10px;
  z-index: 2;
}
.hero-stat {
  background: #fff; border: 1px solid var(--border);
  border-radius: 14px; padding: 14px 18px;
  box-shadow: var(--shadow-md); min-width: 148px;
  text-align: right; transition: transform .2s;
}
.hero-stat:hover { transform: translateY(-2px) scale(1.02); }
.hero-stat-val {
  font-family: 'DM Serif Display', serif;
  font-size: 26px; color: var(--navy); letter-spacing: -0.5px;
}
.hero-stat-lbl { font-size: 11px; color: var(--text-muted); margin-top: 1px; }
.hero-stat-sub { font-size: 11px; font-weight: 600; margin-top: 4px; }
.hero-stat-sub.up { color: var(--teal); }
.hero-stat-sub.warn { color: var(--amber); }

/* ── STATS ROW ── */
.stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 32px; }
.stat-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 16px; padding: 22px 24px;
  box-shadow: var(--shadow-sm);
  transition: all .2s ease; overflow: hidden;
  position: relative;
}
.stat-card::before {
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 3px;
  border-radius: 3px 3px 0 0;
}
.stat-card.c-blue::before { background: linear-gradient(90deg, var(--blue), #4AAAE0); }
.stat-card.c-teal::before { background: linear-gradient(90deg, var(--teal), #21C995); }
.stat-card.c-amber::before { background: linear-gradient(90deg, var(--amber), #E8A020); }
.stat-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--border-strong); }
.stat-val {
  font-family: 'DM Serif Display', serif;
  font-size: 32px; color: var(--navy); letter-spacing: -1px; margin-bottom: 4px;
}
.stat-lbl { font-size: 12.5px; color: var(--text-secondary); }
.stat-change { font-size: 11.5px; font-weight: 600; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
.stat-change.up { color: var(--teal); }
.stat-change.warn { color: var(--amber); }
.stat-icon { font-size: 22px; margin-bottom: 10px; display: block; }

/* ── SECTION HEADER ── */
.sec-hd { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 20px; }
.sec-title {
  font-family: 'DM Serif Display', serif;
  font-size: 22px; color: var(--navy); letter-spacing: -0.4px;
}
.sec-sub { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.sec-link {
  font-size: 13px; color: var(--blue); font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 4px;
  transition: gap .15s;
}
.sec-link:hover { gap: 7px; }

/* ── TAGS ── */
.tags { display: flex; flex-wrap: wrap; gap: 5px; }
.tag {
  font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px;
  letter-spacing: .01em;
}
.tag.blue { background: #E0EEFF; color: #1054A0; border: 1px solid #B8D2F5; }
.tag.teal { background: #E2F7F0; color: #09785A; border: 1px solid #9ADCC7; }
.tag.amber { background: #FDF3E0; color: #9A5C08; border: 1px solid #F0CC86; }
.tag.red { background: #FEEEED; color: #B43B30; border: 1px solid #F2B0AA; }
.tag.purple { background: #F2EDFF; color: #5D24CC; border: 1px solid #CBB5F8; }

/* ── PROJECT CARDS (home 2-col) ── */
.proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 36px; }
.proj-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 22px;
  cursor: pointer; transition: all .22s ease;
  box-shadow: var(--shadow-sm); position: relative; overflow: hidden;
}
.proj-card-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(255,255,255,.6) 100%);
  pointer-events: none;
}
.proj-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
}
.proj-card-arrow {
  position: absolute; right: 18px; top: 18px;
  color: var(--text-muted); font-size: 16px;
  transition: all .2s; opacity: .5;
}
.proj-card:hover .proj-card-arrow { color: var(--blue); opacity: 1; transform: translate(2px,-2px); }
.proj-icon {
  width: 48px; height: 48px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; margin-bottom: 14px;
}
.proj-card h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 15px; color: var(--navy); margin-bottom: 8px;
  padding-right: 24px; letter-spacing: -.2px; line-height: 1.35;
}
.proj-card p { font-size: 12.5px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 14px; }

/* ── FULL PROJECT LIST ── */
.fp-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 22px 24px;
  margin-bottom: 12px; display: flex; gap: 18px;
  box-shadow: var(--shadow-sm); transition: all .22s ease; cursor: pointer;
}
.fp-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--border-strong); }
.fp-icon {
  width: 48px; height: 48px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0; margin-top: 2px;
}
.fp-body { flex: 1; }
.fp-title {
  font-family: 'DM Serif Display', serif;
  font-size: 15.5px; color: var(--navy); margin-bottom: 4px; letter-spacing: -.2px;
}
.fp-meta { font-size: 11.5px; color: var(--text-muted); margin-bottom: 8px; display: flex; gap: 14px; }
.fp-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 12px; }
.fp-stat {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--teal-pale); border: 1px solid #A8E6CE;
  color: #09785A; font-size: 12px; font-weight: 600;
  padding: 5px 12px; border-radius: 8px;
}

/* ── ECO PAGE ── */
.eco-map-wrap {
  background: linear-gradient(160deg, #EBF4FF 0%, #E6F8F3 100%);
  border: 1px solid var(--border); border-radius: 20px;
  position: relative; height: 200px; overflow: hidden;
  margin-bottom: 16px; box-shadow: var(--shadow-sm);
}
.eco-map-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(26,109,181,.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26,109,181,.07) 1px, transparent 1px);
  background-size: 36px 36px;
}
.eco-map-lbl {
  position: absolute; background: rgba(255,255,255,.9);
  border: 1px solid var(--border); border-radius: 8px;
  padding: 5px 10px; font-size: 11px; font-weight: 600;
  color: var(--text); white-space: nowrap;
  backdrop-filter: blur(6px);
  box-shadow: var(--shadow-sm);
}
.eco-pin {
  position: absolute; width: 12px; height: 12px;
  border-radius: 50%; transform: translate(-50%, -50%);
  border: 2.5px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,.2);
}
.eco-pin-pulse {
  position: absolute; width: 26px; height: 26px;
  border-radius: 50%; transform: translate(-50%, -50%);
  border: 2px solid; animation: ripple 2s ease-out infinite;
}
@keyframes ripple {
  0% { opacity: .7; transform: translate(-50%,-50%) scale(.6); }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(2); }
}
.eco-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
.eco-card {
  border-radius: 14px; padding: 18px; border: 1px solid;
  transition: transform .18s;
}
.eco-card:hover { transform: translateY(-2px); }
.eco-card.g { background: #EAFAF4; border-color: #A8E6CE; }
.eco-card.y { background: #FDF3E0; border-color: #F0CC86; }
.eco-card.r { background: #FEEEED; border-color: #F2B0AA; }
.eco-val {
  font-family: 'DM Serif Display', serif;
  font-size: 26px; letter-spacing: -.5px; margin-bottom: 3px;
}
.eco-card.g .eco-val { color: #0B7855; }
.eco-card.y .eco-val { color: #9A5C08; }
.eco-card.r .eco-val { color: #B43B30; }
.eco-lbl { font-size: 11.5px; }
.eco-card.g .eco-lbl { color: #12A87A; }
.eco-card.y .eco-lbl { color: #BA7517; }
.eco-card.r .eco-lbl { color: #D94840; }
.eco-badge { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 5px; margin-top: 6px; display: inline-block; }
.eco-card.g .eco-badge { background: #D5F5E9; color: #09785A; }
.eco-card.y .eco-badge { background: #FDE9B5; color: #9A5C08; }
.eco-card.r .eco-badge { background: #FDD9D7; color: #B43B30; }
.report-btn {
  width: 100%; background: linear-gradient(135deg, var(--teal) 0%, #0C8A68 100%);
  color: #fff; border: none; border-radius: 12px;
  padding: 15px; font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600; cursor: pointer;
  margin-bottom: 20px; transition: all .2s;
  box-shadow: 0 4px 12px rgba(11,158,117,.25);
}
.report-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(11,158,117,.3); }
.chart-panel {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 24px;
  box-shadow: var(--shadow-sm); margin-bottom: 14px;
}
.chart-title {
  font-family: 'DM Serif Display', serif;
  font-size: 16px; color: var(--navy); letter-spacing: -.3px;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.chart-legend { display: flex; gap: 16px; }
.cleg { font-size: 11.5px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }
.cleg-line { width: 18px; height: 2.5px; border-radius: 2px; }

/* ── JOBS ── */
.job-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 22px 24px;
  margin-bottom: 12px; display: flex; gap: 18px; align-items: flex-start;
  box-shadow: var(--shadow-sm); transition: all .22s ease; cursor: pointer;
}
.job-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--border-strong); }
.job-emoji-wrap {
  width: 46px; height: 46px; border-radius: 12px;
  background: var(--blue-pale); border: 1px solid #BDD8F5;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
}
.job-body { flex: 1; }
.job-title {
  font-family: 'DM Serif Display', serif;
  font-size: 15.5px; color: var(--navy); margin-bottom: 5px; letter-spacing: -.2px;
}
.job-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; flex-wrap: wrap; }
.job-company { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.job-type {
  font-size: 10.5px; font-weight: 700; padding: 2px 9px; border-radius: 20px; letter-spacing: .04em;
}
.job-type.blue { background: #E0EEFF; color: #1054A0; border: 1px solid #B8D2F5; }
.job-type.teal { background: #E2F7F0; color: #09785A; border: 1px solid #9ADCC7; }
.job-type.green { background: #EAFAF4; color: #0B7855; border: 1px solid #A8E6CE; }
.job-salary { font-size: 11px; color: var(--text-secondary); font-weight: 500; }
.job-desc { font-size: 12.5px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 11px; }
.apply-btn {
  background: linear-gradient(135deg, var(--blue), #1578C5);
  color: #fff; border: none; border-radius: 10px;
  padding: 11px 20px; font-family: 'DM Sans', sans-serif;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  white-space: nowrap; flex-shrink: 0; align-self: center;
  box-shadow: 0 3px 10px rgba(26,109,181,.22);
  transition: all .18s;
}
.apply-btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-blue); filter: brightness(1.08); }

/* ── DASHBOARD ── */
.dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.dash-panel {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 24px;
  box-shadow: var(--shadow-sm);
}
.dash-panel.wide { grid-column: span 2; }
.dash-title {
  font-family: 'DM Serif Display', serif;
  font-size: 15px; color: var(--navy); margin-bottom: 20px; letter-spacing: -.2px;
}
.bar-chart { display: flex; align-items: flex-end; gap: 20px; height: 130px; }
.bw { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 7px; }
.bval { font-size: 11px; font-weight: 600; color: var(--navy); }
.bar {
  width: 100%; border-radius: 7px 7px 0 0;
  background: linear-gradient(180deg, #2D85D0 0%, var(--blue) 100%);
  transition: all .2s; cursor: pointer;
}
.bar:hover { filter: brightness(1.1); transform: scaleY(1.03); transform-origin: bottom; }
.byr { font-size: 11.5px; color: var(--text-muted); }
.prog-row { margin-bottom: 13px; }
.prog-labels { display: flex; justify-content: space-between; margin-bottom: 5px; }
.prog-name { font-size: 12.5px; color: var(--text-secondary); }
.prog-num { font-size: 12.5px; font-weight: 600; color: var(--navy); }
.prog-track { background: var(--surface2); border-radius: 4px; height: 7px; overflow: hidden; }
.prog-fill { height: 7px; border-radius: 4px; transition: width .7s cubic-bezier(.4,0,.2,1); }
.aqi-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; }
.aqi-item {
  background: var(--surface2); border-radius: 12px;
  padding: 14px 12px; text-align: center; transition: transform .18s;
}
.aqi-item:hover { transform: translateY(-2px); }
.aqi-bar-track { height: 5px; border-radius: 5px; background: var(--border); margin-bottom: 10px; overflow: hidden; }
.aqi-bar-fill { height: 5px; border-radius: 5px; }
.aqi-num {
  font-family: 'DM Serif Display', serif;
  font-size: 22px; margin-bottom: 3px;
}
.aqi-lbl { font-size: 11px; color: var(--text-muted); }

/* ── ABOUT ── */
.about-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: 18px; padding: 24px;
  box-shadow: var(--shadow-sm); margin-bottom: 12px;
}
.about-card h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 17px; color: var(--navy); margin-bottom: 10px; letter-spacing: -.3px;
}
.about-card p { font-size: 13.5px; color: var(--text-secondary); line-height: 1.72; }
.mission-card {
  background: linear-gradient(135deg, var(--navy) 0%, #1A3A6B 100%);
  border-radius: 18px; padding: 32px;
  margin-bottom: 12px; position: relative; overflow: hidden;
}
.mission-card-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 80% 20%, rgba(26,109,181,.3), transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(11,158,117,.2), transparent 50%);
}
.mission-card h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 24px; color: #fff; margin-bottom: 12px;
  position: relative; z-index: 1;
}
.mission-card p { font-size: 14px; color: rgba(255,255,255,.7); line-height: 1.75; position: relative; z-index: 1; }
.partner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px; }
.partner-card {
  background: var(--blue-pale); border: 1px solid #BDD8F5;
  border-radius: 12px; padding: 12px 16px;
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 600; color: var(--blue);
  transition: all .18s;
}
.partner-card:hover { background: #DCF0FF; border-color: var(--blue); transform: translateY(-1px); }
.partner-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); flex-shrink: 0; }
.contact-list { display: flex; flex-direction: column; gap: 10px; margin-top: 4px; }
.contact-row { display: flex; align-items: center; gap: 12px; font-size: 13.5px; color: var(--text-secondary); }
.contact-icon {
  width: 34px; height: 34px; border-radius: 9px;
  background: var(--blue-pale); border: 1px solid #BDD8F5;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.contact-val { color: var(--blue); font-weight: 600; }

/* ── DIVIDER ── */
.divider { height: 1px; background: var(--border); margin: 8px 0 24px; }

/* ── FOOTER ── */
footer {
  background: var(--navy);
  padding: 24px 32px;
  text-align: center; font-size: 12px;
  color: rgba(255,255,255,.4);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  flex-wrap: wrap;
}
footer .f-brand { color: rgba(255,255,255,.75); font-weight: 600; }
footer .f-dot { color: rgba(255,255,255,.2); }
footer a { color: #4AAAE0; text-decoration: none; }

/* ── RESPONSIVE ── */
@media (max-width: 700px) {
  .nav { padding: 0 14px; }
  .nav-btn { padding: 7px 8px; font-size: 12px; }
  .page { padding: 24px 16px 60px; }
  .hero { padding: 32px 24px; }
  .hero h1 { font-size: 30px; }
  .hero-float { display: none; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .proj-grid, .dash-grid { grid-template-columns: 1fr; }
  .dash-panel.wide { grid-column: span 1; }
  .eco-grid { grid-template-columns: 1fr 1fr; }
  .aqi-grid { grid-template-columns: 1fr 1fr; }
  .partner-grid { grid-template-columns: 1fr; }
  .job-card { flex-direction: column; }
  .apply-btn { width: 100%; justify-content: center; }
}
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Tag({ label, variant = "blue" }) {
  return <span className={`tag ${variant}`}>{label}</span>;
}

function SectionHeader({ title, sub, linkLabel, onLink }) {
  return (
    <div className="sec-hd">
      <div>
        <div className="sec-title">{title}</div>
        {sub && <div className="sec-sub">{sub}</div>}
      </div>
      {linkLabel && (
        <div className="sec-link" onClick={onLink}>{linkLabel} →</div>
      )}
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

function HomePage({ goTo }) {
  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">
        <div className="hero-mesh" />
        <div className="hero-dots" />
        <div className="hero-pill">
          <div className="hero-pill-dot" />
          АТЫРАУ · КАЗАХСТАН · 2025
        </div>
        <h1>
          Данные. Наука.<br />
          <span className="accent">Будущее Атырау.</span>
        </h1>
        <p className="hero-desc">
          Открытая платформа научных проектов АГУ — экологический мониторинг,
          городская аналитика и карьерные возможности Атырауского региона.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => goTo("projects")}>
            Смотреть проекты →
          </button>
          <button className="btn-secondary" onClick={() => goTo("eco")}>
            🌍 Эко-дашборд
          </button>
        </div>

        <div className="hero-float">
          <div className="hero-stat">
            <div className="hero-stat-val">355к</div>
            <div className="hero-stat-lbl">Население города</div>
            <div className="hero-stat-sub up">↑ 4.4% за 5 лет</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">AQI 85</div>
            <div className="hero-stat-lbl">Воздух (ср. по городу)</div>
            <div className="hero-stat-sub warn">⚠ Умеренный</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-val">12+</div>
            <div className="hero-stat-lbl">Проектов АГУ</div>
            <div className="hero-stat-sub up">3 новых в 2025</div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card c-blue">
          <span className="stat-icon">👥</span>
          <div className="stat-val">355к</div>
          <div className="stat-lbl">Население Атырау</div>
          <div className="stat-change up">↑ 15к за 5 лет</div>
        </div>
        <div className="stat-card c-amber">
          <span className="stat-icon">🌬️</span>
          <div className="stat-val">AQI 85</div>
          <div className="stat-lbl">Средний индекс воздуха</div>
          <div className="stat-change warn">Умеренный уровень</div>
        </div>
        <div className="stat-card c-teal">
          <span className="stat-icon">🔬</span>
          <div className="stat-val">12+</div>
          <div className="stat-lbl">Активных проектов АГУ</div>
          <div className="stat-change up">3 запущено в 2025</div>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <SectionHeader
        title="Актуальные проекты"
        sub="Исследования Атырауского государственного университета"
        linkLabel="Все проекты"
        onLink={() => goTo("projects")}
      />
      <div className="proj-grid">
        {projects.slice(0, 4).map((p, i) => (
          <div className="proj-card" key={i} onClick={() => goTo("projects")}
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="proj-card-shine" />
            <div className="proj-card-arrow">↗️</div>
            <div className="proj-icon" style={{ background: p.bgGradient, border: `1px solid ${p.borderColor}` }}>
              {p.icon}
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc.slice(0, 100)}…</p>
            <div className="tags">
              {p.tags.map((t, j) => <Tag key={j} label={t} variant={p.tagVariants[j]} />)}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="page">
      <SectionHeader
        title="Проекты АГУ"
        sub={`${projects.length} исследований · Атырауский государственный университет`}
      />
      {projects.map((p, i) => (
        <div className="fp-card" key={i}>
          <div className="fp-icon" style={{ background: p.bgGradient, border: `1px solid ${p.borderColor}` }}>
            {p.icon}
          </div>
          <div className="fp-body">
            <div className="fp-title">{p.title}</div>
            <div className="fp-meta">
              <span>📍 {p.team}</span>
              <span>📅 {p.year}</span>
            </div>
            <p className="fp-desc">{p.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div className="tags">
                {p.tags.map((t, j) => <Tag key={j} label={t} variant={p.tagVariants[j]} />)}
              </div>
              <div className="fp-stat">✦ {p.stat} — {p.statLabel}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EcoPage() {
  const months = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
  const center = [80,75,68,55,62,78,85,90,72,58,65,72];
  const prom   = [115,108,98,82,88,102,118,125,105,88,95,105];
  const W = 500, H = 80, maxV = 135;
  const toPath = (arr) => arr.map((v,i) => `${Math.round(i*(W/11))},${Math.round(H - v/maxV*H)}`).join(" ");
  const toArea = (arr) => `0,${H} ${toPath(arr)} ${W},${H}`;

  return (
    <div className="page">
      <SectionHeader
        title="Экологический дашборд"
        sub="Мониторинг Атырауской области в реальном времени"
      />

      {/* MAP */}
      <div className="eco-map-wrap">
        <div className="eco-map-grid" />
        {/* Red pin - industrial */}
        <div className="eco-pin" style={{ left:"38%", top:"54%", background:"#E05A4E" }} />
        <div className="eco-pin-pulse" style={{ left:"38%", top:"54%", borderColor:"rgba(224,90,78,.35)" }} />
        <div className="eco-map-lbl" style={{ left:"42%", top:"47%" }}>🏭 Пром. зона · AQI 120</div>
        {/* Amber pin - center */}
        <div className="eco-pin" style={{ left:"53%", top:"38%", background:"#C47A15" }} />
        <div className="eco-pin-pulse" style={{ left:"53%", top:"38%", borderColor:"rgba(196,122,21,.35)", animationDelay:".6s" }} />
        <div className="eco-map-lbl" style={{ left:"57%", top:"31%" }}>🏛 Центр · AQI 85</div>
        {/* Teal pin - residential */}
        <div className="eco-pin" style={{ left:"67%", top:"62%", background:"#0B9E75" }} />
        <div className="eco-pin-pulse" style={{ left:"67%", top:"62%", borderColor:"rgba(11,158,117,.35)", animationDelay:"1.2s" }} />
        <div className="eco-map-lbl" style={{ left:"71%", top:"55%" }}>🏘 Жилой · AQI 70</div>
        <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", fontSize:11, color:"var(--text-muted)", fontWeight:500 }}>
          Карта датчиков Атырауской области
        </div>
      </div>

      {/* ECO CARDS */}
      <div className="eco-grid">
        <div className="eco-card y">
          <div className="eco-val">85</div>
          <div className="eco-lbl">Центр · AQI</div>
          <div className="eco-badge">Умеренный</div>
        </div>
        <div className="eco-card r">
          <div className="eco-val">120</div>
          <div className="eco-lbl">Пром. зона · AQI</div>
          <div className="eco-badge">Нездоровый</div>
        </div>
        <div className="eco-card g">
          <div className="eco-val">70</div>
          <div className="eco-lbl">Жилой район · AQI</div>
          <div className="eco-badge">Хороший</div>
        </div>
        <div className="eco-card g">
          <div className="eco-val">7.4</div>
          <div className="eco-lbl">pH воды р. Урал</div>
          <div className="eco-badge">Норма</div>
        </div>
        <div className="eco-card y">
          <div className="eco-val">24°C</div>
          <div className="eco-lbl">Температура Урала</div>
          <div className="eco-badge">Повышена</div>
        </div>
        <div className="eco-card g">
          <div className="eco-val">68%</div>
          <div className="eco-lbl">Влажность воздуха</div>
          <div className="eco-badge">Комфортно</div>
        </div>
      </div>

      <button className="report-btn">⚠ Сообщить об экологической проблеме</button>

      {/* SPARKLINE */}
      <div className="chart-panel">
        <div className="chart-title">
          <span>Динамика AQI · 2024</span>
          <div className="chart-legend">
            <div className="cleg"><div className="cleg-line" style={{ background:"var(--blue)" }} />Центр</div>
            <div className="cleg"><div className="cleg-line" style={{ background:"var(--red)", backgroundImage:"repeating-linear-gradient(90deg,var(--red) 0px,var(--red) 5px,transparent 5px,transparent 9px)", height:2 }} />Пром. зона</div>
          </div>
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H+18}`} preserveAspectRatio="none" style={{ display:"block" }}>
          <defs>
            <linearGradient id="gcenter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A6DB5" stopOpacity=".18" />
              <stop offset="100%" stopColor="#1A6DB5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#gcenter)" points={toArea(center)} />
          <polyline fill="none" stroke="#1A6DB5" strokeWidth="2.5" strokeLinejoin="round" points={toPath(center)} />
          <polyline fill="none" stroke="#E05A4E" strokeWidth="2" strokeDasharray="6 3" strokeLinejoin="round" points={toPath(prom)} />
          {months.map((m, i) => (
            <text key={i} x={Math.round(i*(W/11))} y={H+14} fontSize="9.5" fill="#8AA3BF" textAnchor="middle" fontFamily="DM Sans">{m}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function CareersPage() {
  return (
    <div className="page">
      <SectionHeader
        title="Карьера в Атырауской области"
        sub={`${jobs.length} открытых позиций · Нефтегаз, IT, Экология`}
      />
      {jobs.map((j, i) => (
        <div className="job-card" key={i}>
          <div className="job-emoji-wrap">{j.emoji}</div>
          <div className="job-body">
            <div className="job-title">{j.title}</div>
            <div className="job-meta">
              <span className="job-company">{j.company}</span>
              <span className={`job-type ${j.typeColor}`}>{j.type}</span>
              <span className="job-salary">💰 {j.salary}</span>
            </div>
            <p className="job-desc">{j.desc}</p>
            <div className="tags">
              {j.tags.map((t, k) => <Tag key={k} label={t} variant={j.tagVariants[k]} />)}
            </div>
          </div>
          <button className="apply-btn">Откликнуться →</button>
        </div>
      ))}
    </div>
  );
}

function DashboardPage() {
  const maxPop = Math.max(...popData.map(d => d.val));
  const maxAgu = Math.max(...aguData.map(d => d.n));
  const aqi = [
    { lbl: "Центр", val: 85, color: "#C47A15", bg: "#FDF3E0" },
    { lbl: "Пром.", val: 120, color: "#E05A4E", bg: "#FEEEED" },
    { lbl: "Жилой", val: 70, color: "#0B9E75", bg: "#EAFAF4" },
    { lbl: "Парки", val: 60, color: "#1A6DB5", bg: "#EBF4FF" },
  ];

  return (
    <div className="page">
      <SectionHeader title="Аналитика города" sub="Данные по Атырау и АГУ · 2024–2025" />

      <div className="dash-grid">
        {/* Population bar chart */}
        <div className="dash-panel">
          <div className="dash-title">Рост населения (тыс. чел.)</div>
          <div className="bar-chart">
            {popData.map((d, i) => {
              const h = Math.round((d.val / maxPop) * 110);
              return (
                <div className="bw" key={i}>
                  <div className="bval">{d.val}к</div>
                  <div className="bar" style={{ height: h }} title={`${d.yr}: ${d.val}к чел.`} />
                  <div className="byr">{d.yr}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AQI by district */}
        <div className="dash-panel">
          <div className="dash-title">AQI по районам города</div>
          <div className="aqi-grid">
            {aqi.map((a, i) => (
              <div className="aqi-item" key={i} style={{ background: a.bg }}>
                <div className="aqi-bar-track">
                  <div className="aqi-bar-fill" style={{ background: a.color, width: `${Math.round(a.val/130*100)}%` }} />
                </div>
                <div className="aqi-num" style={{ color: a.color }}>{a.val}</div>
                <div className="aqi-lbl">{a.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty bar chart - wide */}
        <div className="dash-panel wide">
          <div className="dash-title">Студенты АГУ по факультетам · 2024</div>
          {aguData.map((d, i) => (
            <div className="prog-row" key={i}>
              <div className="prog-labels">
                <span className="prog-name">{d.fac}</span>
                <span className="prog-num">{d.n.toLocaleString()}</span>
              </div>
              <div className="prog-track">
                <div className="prog-fill" style={{ width: `${Math.round(d.n/maxAgu*100)}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <SectionHeader title="О платформе" />

      <div className="mission-card">
        <div className="mission-card-bg" />
        <h3>Наша миссия</h3>
        <p>
          Atyrau Smart Hub — открытая платформа, объединяющая научные проекты АГУ,
          экологические данные и карьерные возможности Атырауской области.
          Мы делаем городскую аналитику доступной для каждого жителя и исследователя.
        </p>
      </div>

      <div className="about-card">
        <h3>Партнёры и компании</h3>
        <p>Платформа сотрудничает с ведущими нефтегазовыми компаниями и Атырауским государственным университетом им. Х. Досмухамедова.</p>
        <div className="partner-grid">
          {["Tengizchevroil", "NCOC", "КазМунайГаз", "АГУ им. Х. Досмухамедова"].map((name, i) => (
            <div className="partner-card" key={i}>
              <div className="partner-dot" />
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="about-card">
        <h3>Устойчивое развитие Прикаспия</h3>
        <p>
          Мы верим: данные и образование — ключ к экологической безопасности региона.
          Каждый проект на платформе направлен на решение реальных проблем Атырауской области —
          от мониторинга воздуха до предиктивного обслуживания нефтепроводов.
        </p>
      </div>

      <div className="about-card">
        <h3>Свяжитесь с нами</h3>
        <p style={{ marginBottom: 14 }}>Атырауский государственный университет им. Х. Досмухамедова</p>
        <div className="contact-list">
          <div className="contact-row">
            <div className="contact-icon">📍</div>
            <span>ул. Студенческая, 212, г. Атырау, Казахстан</span>
          </div>
          <div className="contact-row">
            <div className="contact-icon">✉️</div>
            <span className="contact-val">hub@agu.kz</span>
          </div>
          <div className="contact-row">
            <div className="contact-icon">📞</div>
            <span className="contact-val">+7 (7122) 27-25-12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

const PAGES = ["home", "projects", "eco", "careers", "dashboard", "about"];
const LABELS = ["Главная", "Проекты", "Экология", "Карьера", "Аналитика", "О нас"];
const BADGES = { eco: "Live" };

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <style>{css}</style>
      <div className="app">

        <nav className="nav">
          <div className="nav-logo">
            <div className="nav-logo-mark">🏙️</div>
            <div className="nav-logo-text">Atyrau <em>Smart Hub</em></div>
          </div>
          <div className="nav-links">
            {PAGES.map((p, i) => (
              <button
                key={p}
                className={`nav-btn${page === p ? " active" : ""}`}
                onClick={() => setPage(p)}
              >
                {LABELS[i]}
                {BADGES[p] && <span className="nav-badge">{BADGES[p]}</span>}
              </button>
            ))}
          </div>
        </nav>

        {page === "home"      && <HomePage      goTo={setPage} />}
        {page === "projects"  && <ProjectsPage  />}
        {page === "eco"       && <EcoPage       />}
        {page === "careers"   && <CareersPage   />}
        {page === "dashboard" && <DashboardPage />}
        {page === "about"     && <AboutPage     />}

        <footer>
          <span className="f-brand">Atyrau Smart Hub</span>
          <span className="f-dot">·</span>
          Атырауский государственный университет им. Х. Досмухамедова
          <span className="f-dot">·</span>
          ©️ 2025
        </footer>

      </div>
    </>
  );
}