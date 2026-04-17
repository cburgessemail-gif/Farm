import React, { useEffect, useMemo, useRef, useState } from "react";

import growArea from "../GrowArea.jpg";
import growArea2 from "../GrowArea2.jpg";
import sam0220 from "../SAM_0220.JPG";
import sam0221 from "../SAM_0221.JPG";
import sam0222 from "../SAM_0222.JPG";
import sam0223 from "../SAM_0223.JPG";
import sam0225 from "../SAM_0225.JPG";
import sam0237 from "../SAM_0237.JPG";
import sam0238 from "../SAM_0238.JPG";
import sam0249 from "../SAM_0249.JPG";
import sam0266 from "../SAM_0266.JPG";

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor";
type Lang = "en" | "es" | "tl" | "it" | "he" | "jam";

type WeatherState = {
  temp?: number;
  wind?: number;
  code?: number;
  city?: string;
  loading: boolean;
  error?: string;
};

const APP_TITLE = "Bronson Family Farm";
const APP_SUBTITLE = "Bronson Family Farm & Farm & Family Alliance Ecosystem";

const imageMap = {
  hero: growArea,
  guest: sam0220,
  customer: growArea2,
  grower: sam0221,
  youth: sam0223,
  supervisor: sam0225,
  market: sam0237,
  nutrition: sam0238,
  calendar: sam0249,
  story: sam0266,
  extra: sam0222,
};

const translations = {
  en: {
    languageName: "English",
    demo: "Guided Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Choose your pathway",
    introTitle: "A living farm ecosystem, not a presentation",
    introBody:
      "This platform connects land, learning, food, growers, youth workforce development, volunteers, and community commerce in one welcoming experience.",
    enterMarketplace: "Go to Marketplace",
    nutrition: "Nutrition & Recipes",
    cropCalendar: "Crop Planning Calendar",
    weather: "Local Weather",
    quickActions: "Quick Actions",
    roleOverview: "Role Overview",
    story: "Why this matters",
    modules: "Platform Modules",
    voice: "Voice",
    on: "On",
    off: "Off",
    weatherLoading: "Loading local weather...",
    marketplaceTitle: "Marketplace & Customer Pathway",
    nutritionTitle: "Food, Nutrition, and Recipe Guidance",
    calendarTitle: "Crop Calendar & Seasonal Planning",
    weatherTitle: "Farm Weather Snapshot",
    guestLabel: "Guest",
    customerLabel: "Customer",
    growerLabel: "Grower",
    youthLabel: "Youth",
    supervisorLabel: "Supervisor",
    guestIntro:
      "A simple entry point for community visitors, funders, families, and first-time learners to understand the ecosystem and explore the farm’s impact.",
    customerIntro:
      "Customers can move quickly into the marketplace, discover what is fresh, review nutrition guidance, save buying habits, and find recipe ideas tied to real food.",
    growerIntro:
      "Growers can coordinate supply, seasonality, crop planning, post-harvest learning, and participation in the shared ecosystem.",
    youthIntro:
      "Youth experience agriculture as workforce preparation through hands-on learning, safety, teamwork, accountability, food knowledge, and career pathways.",
    supervisorIntro:
      "Supervisors support youth progress, monitor readiness, track observations, support safety, and strengthen the connection between work and long-term growth.",
    storyBody:
      "Bronson Family Farm is designed as an off-grid, regenerative, welcoming environment that combines food access, workforce development, agritourism, community learning, and long-term family legacy.",
    modulesList: [
      "Marketplace with easy customer access",
      "Nutrition guidance and recipe learning",
      "Crop planning and seasonal task flow",
      "Local weather awareness",
      "Youth workforce pathway support",
      "Supervisor tracking and guidance",
      "Volunteer and community engagement",
      "Multilingual guided experience",
    ],
    marketplaceCards: [
      {
        title: "Shop Fresh Food",
        body: "Move directly into produce, seedlings, and seasonal offerings with a cleaner path for customers.",
      },
      {
        title: "Track Buying Habits",
        body: "Support repeat customers with saved interests like greens, tomatoes, seedlings, and family favorites.",
      },
      {
        title: "Healthy Choices",
        body: "Pair food availability with simple education about nutrition, Type II diabetes awareness, and food quality.",
      },
    ],
    nutritionCards: [
      {
        title: "Food Compared to Processed Food",
        body: "Help families understand the value of fresh food, color, fiber, water, minerals, and preparation at home.",
      },
      {
        title: "Recipes That Fit Real Life",
        body: "Simple ideas for collards, spinach, cabbage, peppers, herbs, tomatoes, and seasonal harvest boxes.",
      },
      {
        title: "Work, Play, and Rest Nutrition",
        body: "Guidance for energy, hydration, movement, and better everyday choices for all ages.",
      },
    ],
    calendarCards: [
      {
        title: "Seasonal Timeline",
        body: "Seed starting, transplanting, watering, protection, harvest windows, and community grow days.",
      },
      {
        title: "Grower Reminders",
        body: "Plan ahead for soil prep, pest awareness, trellising, mulch, and seasonal transitions.",
      },
      {
        title: "Community Learning",
        body: "Connect workshops, events, volunteer dates, and family learning to the farm calendar.",
      },
    ],
    labels: {
      currentRole: "Current role",
      currentLanguage: "Language",
      marketplace: "Marketplace",
      recipes: "Recipes",
      calendar: "Calendar",
      weather: "Weather",
      youthPathway: "Youth Pathway",
      supervisorTools: "Supervisor Tools",
    },
  },
  es: {
    languageName: "Español",
    demo: "Demostración Guiada",
    guidedTour: "Iniciar recorrido guiado",
    stopTour: "Detener recorrido",
    chooseRole: "Elige tu camino",
    introTitle: "Un ecosistema agrícola vivo, no una presentación",
    introBody:
      "Esta plataforma conecta tierra, aprendizaje, alimentos, productores, desarrollo laboral juvenil, voluntariado y comercio comunitario en una sola experiencia acogedora.",
    enterMarketplace: "Ir al Mercado",
    nutrition: "Nutrición y Recetas",
    cropCalendar: "Calendario de Cultivo",
    weather: "Clima Local",
    quickActions: "Acciones rápidas",
    roleOverview: "Resumen del rol",
    story: "Por qué importa",
    modules: "Módulos de la plataforma",
    voice: "Voz",
    on: "Activada",
    off: "Desactivada",
    weatherLoading: "Cargando el clima local...",
    marketplaceTitle: "Mercado y recorrido del cliente",
    nutritionTitle: "Guía de alimentos, nutrición y recetas",
    calendarTitle: "Calendario de cultivo y planificación estacional",
    weatherTitle: "Resumen del clima de la finca",
    guestLabel: "Invitado",
    customerLabel: "Cliente",
    growerLabel: "Productor",
    youthLabel: "Joven",
    supervisorLabel: "Supervisor",
    guestIntro:
      "Un punto de entrada sencillo para visitantes, financiadores, familias y personas que aprenden por primera vez.",
    customerIntro:
      "Los clientes pueden entrar rápidamente al mercado, descubrir lo fresco, revisar orientación nutricional y guardar hábitos de compra.",
    growerIntro:
      "Los productores pueden coordinar oferta, estacionalidad, planificación de cultivos y aprendizaje poscosecha.",
    youthIntro:
      "Los jóvenes viven la agricultura como preparación laboral mediante aprendizaje práctico, seguridad, trabajo en equipo y responsabilidad.",
    supervisorIntro:
      "Los supervisores apoyan el progreso juvenil, la preparación, la seguridad y el crecimiento a largo plazo.",
    storyBody:
      "Bronson Family Farm está diseñada como un entorno regenerativo, fuera de la red, acogedor y orientado a alimentos, comunidad y legado.",
    modulesList: [
      "Mercado con acceso sencillo",
      "Guía de nutrición y recetas",
      "Planificación de cultivos",
      "Conciencia del clima local",
      "Ruta laboral juvenil",
      "Herramientas para supervisores",
      "Participación comunitaria",
      "Experiencia multilingüe guiada",
    ],
    marketplaceCards: [
      { title: "Comprar comida fresca", body: "Acceso más claro a productos, plántulas y ofertas estacionales." },
      { title: "Seguir hábitos de compra", body: "Apoyo a clientes frecuentes con intereses guardados." },
      { title: "Opciones saludables", body: "Unir disponibilidad de alimentos con educación nutricional simple." },
    ],
    nutritionCards: [
      { title: "Comida real vs procesada", body: "Ayudar a las familias a comprender el valor de la comida fresca." },
      { title: "Recetas para la vida real", body: "Ideas sencillas para verduras, hierbas y cosechas de temporada." },
      { title: "Nutrición para trabajo y descanso", body: "Orientación para energía, hidratación y mejores decisiones diarias." },
    ],
    calendarCards: [
      { title: "Línea del tiempo estacional", body: "Siembra, trasplante, riego, protección y cosecha." },
      { title: "Recordatorios para productores", body: "Preparación del suelo, plagas, soporte y transición estacional." },
      { title: "Aprendizaje comunitario", body: "Conectar talleres, eventos y voluntariado al calendario." },
    ],
    labels: {
      currentRole: "Rol actual",
      currentLanguage: "Idioma",
      marketplace: "Mercado",
      recipes: "Recetas",
      calendar: "Calendario",
      weather: "Clima",
      youthPathway: "Ruta juvenil",
      supervisorTools: "Herramientas del supervisor",
    },
  },
  tl: {
    languageName: "Tagalog",
    demo: "Gabay na Demo",
    guidedTour: "Simulan ang gabay na tour",
    stopTour: "Ihinto ang tour",
    chooseRole: "Piliin ang iyong landas",
    introTitle: "Isang buhay na ecosystem ng bukid, hindi presentasyon",
    introBody:
      "Pinagdurugtong ng platapormang ito ang lupa, pagkatuto, pagkain, mga grower, youth workforce, boluntaryo, at pangkomunidad na kalakalan.",
    enterMarketplace: "Pumunta sa Marketplace",
    nutrition: "Nutrisyon at Mga Recipe",
    cropCalendar: "Kalendaryo ng Pagtatanim",
    weather: "Lokal na Panahon",
    quickActions: "Mabilis na gawain",
    roleOverview: "Pangkalahatang-ideya ng papel",
    story: "Bakit ito mahalaga",
    modules: "Mga module ng plataporma",
    voice: "Boses",
    on: "Bukas",
    off: "Patay",
    weatherLoading: "Kinukuha ang lokal na panahon...",
    marketplaceTitle: "Marketplace at landas ng customer",
    nutritionTitle: "Gabay sa pagkain, nutrisyon, at recipe",
    calendarTitle: "Kalendaryo ng pananim at pana-panahong pagpaplano",
    weatherTitle: "Buod ng panahon sa bukid",
    guestLabel: "Bisita",
    customerLabel: "Customer",
    growerLabel: "Grower",
    youthLabel: "Kabataan",
    supervisorLabel: "Supervisor",
    guestIntro:
      "Madaling pasukan para sa mga bisita, funder, pamilya, at mga unang beses pa lang natututo.",
    customerIntro:
      "Madaling makakapasok ang customer sa marketplace, makakakita ng sariwang pagkain, at makakakuha ng gabay sa nutrisyon.",
    growerIntro:
      "Makapag-uugnay ang grower ng supply, panahon ng tanim, crop planning, at pagkatuto pagkatapos ng ani.",
    youthIntro:
      "Natututo ang kabataan ng trabaho, kaligtasan, teamwork, at pananagutan sa pamamagitan ng agrikultura.",
    supervisorIntro:
      "Sinusuportahan ng supervisor ang progreso ng kabataan, kaligtasan, at pangmatagalang paglago.",
    storyBody:
      "Ang Bronson Family Farm ay dinisenyo bilang isang off-grid, regenerative, at welcoming na espasyo para sa pagkain, pag-aaral, at pamana.",
    modulesList: [
      "Marketplace na madaling puntahan",
      "Gabay sa nutrisyon at recipe",
      "Crop planning",
      "Lokal na panahon",
      "Youth workforce support",
      "Supervisor tools",
      "Community engagement",
      "Multilingual guided experience",
    ],
    marketplaceCards: [
      { title: "Mamili ng sariwang pagkain", body: "Direktang daan sa produce, seedlings, at seasonal offerings." },
      { title: "Subaybayan ang binibili", body: "Suporta para sa paulit-ulit na customer at mga paboritong produkto." },
      { title: "Mas malusog na pagpili", body: "Pagdugtungin ang pagkain at simpleng education sa kalusugan." },
    ],
    nutritionCards: [
      { title: "Tunay na pagkain vs processed", body: "Tulungan ang pamilya na maintindihan ang halaga ng sariwang pagkain." },
      { title: "Recipe para sa totoong buhay", body: "Madadaling ideya para sa gulay at seasonal harvest." },
      { title: "Nutrisyon sa araw-araw", body: "Gabay sa enerhiya, tubig, galaw, at mas mabuting pagpili." },
    ],
    calendarCards: [
      { title: "Pana-panahong timeline", body: "Pagsisimula ng binhi, transplanting, pagdidilig, at pag-aani." },
      { title: "Mga paalala sa grower", body: "Soil prep, pests, support, at seasonal transitions." },
      { title: "Pagkatutong pangkomunidad", body: "Iugnay ang workshops, events, at volunteer days sa kalendaryo." },
    ],
    labels: {
      currentRole: "Kasalukuyang papel",
      currentLanguage: "Wika",
      marketplace: "Marketplace",
      recipes: "Mga Recipe",
      calendar: "Kalendaryo",
      weather: "Panahon",
      youthPathway: "Landas ng Kabataan",
      supervisorTools: "Tools ng Supervisor",
    },
  },
  it: {
    languageName: "Italiano",
    demo: "Demo Guidata",
    guidedTour: "Avvia tour guidato",
    stopTour: "Ferma tour",
    chooseRole: "Scegli il tuo percorso",
    introTitle: "Un ecosistema agricolo vivo, non una presentazione",
    introBody:
      "Questa piattaforma collega terra, apprendimento, cibo, coltivatori, sviluppo giovanile, volontariato e commercio comunitario.",
    enterMarketplace: "Vai al Marketplace",
    nutrition: "Nutrizione e Ricette",
    cropCalendar: "Calendario Colturale",
    weather: "Meteo Locale",
    quickActions: "Azioni rapide",
    roleOverview: "Panoramica del ruolo",
    story: "Perché conta",
    modules: "Moduli della piattaforma",
    voice: "Voce",
    on: "Attiva",
    off: "Disattiva",
    weatherLoading: "Caricamento meteo locale...",
    marketplaceTitle: "Marketplace e percorso cliente",
    nutritionTitle: "Guida a cibo, nutrizione e ricette",
    calendarTitle: "Calendario delle colture e pianificazione stagionale",
    weatherTitle: "Meteo della fattoria",
    guestLabel: "Ospite",
    customerLabel: "Cliente",
    growerLabel: "Coltivatore",
    youthLabel: "Giovani",
    supervisorLabel: "Supervisore",
    guestIntro:
      "Un ingresso semplice per visitatori, finanziatori, famiglie e nuovi apprendenti.",
    customerIntro:
      "I clienti possono entrare velocemente nel marketplace, vedere il fresco e ricevere guida nutrizionale.",
    growerIntro:
      "I coltivatori possono coordinare offerta, stagionalità, pianificazione e apprendimento post-raccolta.",
    youthIntro:
      "I giovani imparano lavoro, sicurezza, collaborazione e responsabilità attraverso l’agricoltura.",
    supervisorIntro:
      "I supervisori sostengono il progresso dei giovani, la sicurezza e la crescita a lungo termine.",
    storyBody:
      "Bronson Family Farm è progettata come uno spazio rigenerativo, off-grid e accogliente per cibo, apprendimento e comunità.",
    modulesList: [
      "Marketplace facile da raggiungere",
      "Guida nutrizionale e ricette",
      "Pianificazione delle colture",
      "Consapevolezza meteo locale",
      "Percorso lavoro giovanile",
      "Strumenti per supervisori",
      "Coinvolgimento comunitario",
      "Esperienza guidata multilingue",
    ],
    marketplaceCards: [
      { title: "Compra cibo fresco", body: "Accesso diretto a prodotti, piantine e offerte stagionali." },
      { title: "Traccia le abitudini", body: "Supporto ai clienti abituali e ai preferiti della famiglia." },
      { title: "Scelte salutari", body: "Unire disponibilità del cibo ed educazione nutrizionale semplice." },
    ],
    nutritionCards: [
      { title: "Cibo vero vs processato", body: "Aiutare le famiglie a capire il valore del cibo fresco." },
      { title: "Ricette per la vita reale", body: "Idee semplici per verdure ed erbe stagionali." },
      { title: "Nutrizione quotidiana", body: "Guida per energia, idratazione, movimento e scelte migliori." },
    ],
    calendarCards: [
      { title: "Cronologia stagionale", body: "Semina, trapianto, irrigazione, protezione e raccolta." },
      { title: "Promemoria per coltivatori", body: "Suolo, parassiti, sostegni e cambi di stagione." },
      { title: "Apprendimento comunitario", body: "Collegare workshop, eventi e volontariato al calendario." },
    ],
    labels: {
      currentRole: "Ruolo attuale",
      currentLanguage: "Lingua",
      marketplace: "Marketplace",
      recipes: "Ricette",
      calendar: "Calendario",
      weather: "Meteo",
      youthPathway: "Percorso Giovani",
      supervisorTools: "Strumenti Supervisore",
    },
  },
  he: {
    languageName: "עברית",
    demo: "הדגמה מודרכת",
    guidedTour: "התחל סיור מודרך",
    stopTour: "עצור סיור",
    chooseRole: "בחרי או בחר מסלול",
    introTitle: "מערכת חקלאית חיה, לא מצגת",
    introBody:
      "הפלטפורמה מחברת אדמה, למידה, מזון, מגדלים, פיתוח נוער, מתנדבים ומסחר קהילתי לחוויה אחת מזמינה.",
    enterMarketplace: "כניסה לשוק",
    nutrition: "תזונה ומתכונים",
    cropCalendar: "לוח גידול",
    weather: "מזג אוויר מקומי",
    quickActions: "פעולות מהירות",
    roleOverview: "סקירת תפקיד",
    story: "למה זה חשוב",
    modules: "מודולי הפלטפורמה",
    voice: "קול",
    on: "פועל",
    off: "כבוי",
    weatherLoading: "טוען מזג אוויר מקומי...",
    marketplaceTitle: "מסלול לקוח ושוק",
    nutritionTitle: "הדרכת מזון, תזונה ומתכונים",
    calendarTitle: "לוח גידול ותכנון עונתי",
    weatherTitle: "תמונת מזג האוויר בחווה",
    guestLabel: "אורח",
    customerLabel: "לקוח",
    growerLabel: "מגדל",
    youthLabel: "נוער",
    supervisorLabel: "מפקח",
    guestIntro:
      "נקודת כניסה פשוטה למבקרים, תורמים, משפחות ולומדים חדשים.",
    customerIntro:
      "לקוחות יכולים להגיע במהירות לשוק, לראות מה טרי ולקבל הדרכה תזונתית.",
    growerIntro:
      "מגדלים יכולים לתאם היצע, עונתיות, תכנון גידול ולמידה לאחר הקטיף.",
    youthIntro:
      "נוער לומד עבודה, בטיחות, שיתוף פעולה ואחריות דרך חקלאות.",
    supervisorIntro:
      "מפקחים תומכים בהתקדמות הנוער, בבטיחות ובצמיחה ארוכת טווח.",
    storyBody:
      "Bronson Family Farm נבנתה כסביבה מתחדשת, מחוץ לרשת, מזמינה ומבוססת על מזון, למידה ומורשת.",
    modulesList: [
      "שוק עם גישה קלה",
      "הדרכת תזונה ומתכונים",
      "תכנון גידולים",
      "מודעות למזג אוויר",
      "מסלול תעסוקה לנוער",
      "כלי פיקוח",
      "מעורבות קהילתית",
      "חוויה רב־לשונית מודרכת",
    ],
    marketplaceCards: [
      { title: "קניית מזון טרי", body: "גישה ישירה לתוצרת, שתילים והצעות עונתיות." },
      { title: "מעקב אחר הרגלי קנייה", body: "תמיכה בלקוחות חוזרים ובהעדפות משפחתיות." },
      { title: "בחירות בריאות", body: "חיבור בין זמינות מזון להדרכה תזונתית פשוטה." },
    ],
    nutritionCards: [
      { title: "מזון אמיתי מול מעובד", body: "לעזור למשפחות להבין את ערך המזון הטרי." },
      { title: "מתכונים לחיים האמיתיים", body: "רעיונות פשוטים לירקות, עשבים ותוצרת עונתית." },
      { title: "תזונה יומיומית", body: "הכוונה לאנרגיה, שתייה, תנועה ובחירות טובות יותר." },
    ],
    calendarCards: [
      { title: "ציר זמן עונתי", body: "זריעה, העברה, השקיה, הגנה וקציר." },
      { title: "תזכורות למגדלים", body: "אדמה, מזיקים, תמיכה ומעברי עונות." },
      { title: "למידה קהילתית", body: "חיבור סדנאות, אירועים וימי התנדבות ללוח השנה." },
    ],
    labels: {
      currentRole: "תפקיד נוכחי",
      currentLanguage: "שפה",
      marketplace: "שוק",
      recipes: "מתכונים",
      calendar: "לוח שנה",
      weather: "מזג אוויר",
      youthPathway: "מסלול נוער",
      supervisorTools: "כלי פיקוח",
    },
  },
  jam: {
    languageName: "Patwa",
    demo: "Guided Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Pick yuh pathway",
    introTitle: "Dis a real farm ecosystem, not no slideshow",
    introBody:
      "Dis platform tie together land, learning, food, growers, youth workforce, volunteers, an community business inna one warm space.",
    enterMarketplace: "Go A Marketplace",
    nutrition: "Nutrition An Recipes",
    cropCalendar: "Crop Planning Calendar",
    weather: "Local Weather",
    quickActions: "Quick Moves",
    roleOverview: "Role Overview",
    story: "Why dis matter",
    modules: "Platform Modules",
    voice: "Voice",
    on: "On",
    off: "Off",
    weatherLoading: "Local weather a load...",
    marketplaceTitle: "Marketplace An Customer Pathway",
    nutritionTitle: "Food, Nutrition, An Recipe Guidance",
    calendarTitle: "Crop Calendar An Seasonal Planning",
    weatherTitle: "Farm Weather Snapshot",
    guestLabel: "Guest",
    customerLabel: "Customer",
    growerLabel: "Grower",
    youthLabel: "Youth",
    supervisorLabel: "Supervisor",
    guestIntro:
      "Easy entry fi community visitors, funders, family, an first-time learners fi understand di ecosystem.",
    customerIntro:
      "Customer can move fast to di marketplace, find fresh food, get nutrition help, an save buying habits.",
    growerIntro:
      "Growers can line up supply, season planning, crop flow, an post-harvest learning.",
    youthIntro:
      "Youth learn work habits through farming: safety, teamwork, discipline, food knowledge, an growth.",
    supervisorIntro:
      "Supervisor support youth progress, readiness, safety, observation, an long-term development.",
    storyBody:
      "Bronson Family Farm build fi be off-grid, regenerative, welcoming, an centered pon food, community, learning, an legacy.",
    modulesList: [
      "Marketplace wid easy customer access",
      "Nutrition guidance an recipe learning",
      "Crop planning an seasonal tasks",
      "Local weather awareness",
      "Youth workforce support",
      "Supervisor tools",
      "Volunteer an community engagement",
      "Multilingual guided experience",
    ],
    marketplaceCards: [
      { title: "Shop Fresh Food", body: "Move straight to produce, seedlings, an seasonal offerings." },
      { title: "Track Buying Habits", body: "Help returning customers save dem favorite items." },
      { title: "Healthy Choices", body: "Tie food access to simple health education." },
    ],
    nutritionCards: [
      { title: "Real Food vs Processed", body: "Help family understand di value a fresh food." },
      { title: "Recipes Fi Real Life", body: "Simple ideas fi greens, herbs, peppers, cabbage, an more." },
      { title: "Everyday Nutrition", body: "Guidance fi energy, water, movement, an better choices." },
    ],
    calendarCards: [
      { title: "Season Timeline", body: "Seed start, transplant, water, protect, an harvest." },
      { title: "Grower Reminders", body: "Soil prep, pest watch, support systems, an season shifts." },
      { title: "Community Learning", body: "Tie workshops, events, an volunteer days to di farm calendar." },
    ],
    labels: {
      currentRole: "Current role",
      currentLanguage: "Language",
      marketplace: "Marketplace",
      recipes: "Recipes",
      calendar: "Calendar",
      weather: "Weather",
      youthPathway: "Youth Pathway",
      supervisorTools: "Supervisor Tools",
    },
  },
} as const;

const languageOptions: { value: Lang; label: string }[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "tl", label: "Tagalog" },
  { value: "it", label: "Italiano" },
  { value: "he", label: "עברית" },
  { value: "jam", label: "Patwa" },
];

function weatherText(code?: number) {
  if (code === undefined) return "—";
  if ([0].includes(code)) return "Clear";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Current conditions";
}

function App() {
  const [role, setRole] = useState<Role>("guest");
  const [lang, setLang] = useState<Lang>("en");
  const [voiceOn, setVoiceOn] = useState(true);
  const [tourOn, setTourOn] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [weather, setWeather] = useState<WeatherState>({ loading: true });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const t = translations[lang];
  const isRTL = lang === "he";

  const roleTitle = useMemo(() => {
    if (role === "guest") return t.guestLabel;
    if (role === "customer") return t.customerLabel;
    if (role === "grower") return t.growerLabel;
    if (role === "youth") return t.youthLabel;
    return t.supervisorLabel;
  }, [role, t]);

  const roleIntro = useMemo(() => {
    if (role === "guest") return t.guestIntro;
    if (role === "customer") return t.customerIntro;
    if (role === "grower") return t.growerIntro;
    if (role === "youth") return t.youthIntro;
    return t.supervisorIntro;
  }, [role, t]);

  const heroImage = useMemo(() => {
    if (role === "guest") return imageMap.guest;
    if (role === "customer") return imageMap.customer;
    if (role === "grower") return imageMap.grower;
    if (role === "youth") return imageMap.youth;
    return imageMap.supervisor;
  }, [role]);

  const guidedScript = useMemo(() => {
    return [
      `${APP_SUBTITLE}. ${t.introTitle}. ${t.introBody}`,
      `${t.roleOverview}. ${roleTitle}. ${roleIntro}`,
      `${t.marketplaceTitle}. ${t.marketplaceCards[0].title}. ${t.marketplaceCards[0].body}`,
      `${t.nutritionTitle}. ${t.nutritionCards[0].title}. ${t.nutritionCards[0].body}`,
      `${t.calendarTitle}. ${t.calendarCards[0].title}. ${t.calendarCards[0].body}`,
      `${t.story}. ${t.storyBody}`,
    ];
  }, [t, roleTitle, roleIntro]);

  useEffect(() => {
    let isMounted = true;

    async function loadWeatherByCoords(lat: number, lon: number) {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`
        );
        const weatherJson = await weatherRes.json();

        let city = "Youngstown area";
        try {
          const geoRes = await fetch(
            `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
          );
          const geoJson = await geoRes.json();
          city =
            geoJson?.address?.city ||
            geoJson?.address?.town ||
            geoJson?.address?.village ||
            geoJson?.address?.county ||
            "Youngstown area";
        } catch {
          city = "Youngstown area";
        }

        if (!isMounted) return;
        setWeather({
          loading: false,
          temp: weatherJson?.current?.temperature_2m,
          wind: weatherJson?.current?.wind_speed_10m,
          code: weatherJson?.current?.weather_code,
          city,
        });
      } catch {
        if (!isMounted) return;
        setWeather({
          loading: false,
          error: "Unable to load weather",
          city: "Youngstown area",
        });
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => loadWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        () => loadWeatherByCoords(41.0998, -80.6495)
      );
    } else {
      loadWeatherByCoords(41.0998, -80.6495);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!tourOn) return;
    if (!voiceOn || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(guidedScript[tourStep] || "");
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.volume = 1;

    const langMap: Record<Lang, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      he: "he-IL",
      jam: "en-JM",
    };
    utter.lang = langMap[lang];

    utter.onend = () => {
      setTimeout(() => {
        setTourStep((prev) => {
          if (prev >= guidedScript.length - 1) {
            setTourOn(false);
            return 0;
          }
          return prev + 1;
        });
      }, 400);
    };

    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [tourOn, tourStep, guidedScript, voiceOn, lang]);

  useEffect(() => {
    if (!tourOn) setTourStep(0);
  }, [tourOn]);

  const roleButtons = [
    { key: "guest" as Role, label: t.guestLabel },
    { key: "customer" as Role, label: t.customerLabel },
    { key: "grower" as Role, label: t.growerLabel },
    { key: "youth" as Role, label: t.youthLabel },
    { key: "supervisor" as Role, label: t.supervisorLabel },
  ];

  const primaryCards =
    role === "customer"
      ? t.marketplaceCards
      : role === "grower"
      ? t.calendarCards
      : role === "youth"
      ? [
          {
            title: t.labels.youthPathway,
            body: "Attendance, safety, teamwork, food systems learning, and visible growth over an 8-week pathway.",
          },
          {
            title: "Skills to Opportunity",
            body: "Agriculture becomes a bridge to employability, confidence, routines, leadership, and career awareness.",
          },
          {
            title: "Belonging and Purpose",
            body: "Youth are not treated as observers. They are contributors inside a meaningful ecosystem.",
          },
        ]
      : role === "supervisor"
      ? [
          {
            title: t.labels.supervisorTools,
            body: "Track readiness, safety, observation notes, strengths, progress, and support needs.",
          },
          {
            title: "Daily Oversight",
            body: "Supervisors can help guide work habits, communication, and follow-through in real time.",
          },
          {
            title: "Growth Support",
            body: "The role is not just enforcement. It is mentoring, documentation, encouragement, and structure.",
          },
        ]
      : [
          {
            title: "Discover the Ecosystem",
            body: "See how agriculture, learning, food access, and family legacy are connected in one living experience.",
          },
          {
            title: "Explore with Confidence",
            body: "The guest experience makes the platform understandable even for first-time visitors and funders.",
          },
          {
            title: "Move into the Right Pathway",
            body: "Guests can quickly shift into customer, grower, youth, or supervisor views.",
          },
        ];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #eff7ef 0%, #f7f2e8 45%, #fcfbf7 100%)",
        color: "#1f2a1f",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; min-height: 100%; }
        button, select { font: inherit; }
        .bff-shell { width: 100%; }
        .bff-topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(10px);
          background: rgba(246, 243, 235, 0.88);
          border-bottom: 1px solid rgba(76, 98, 78, 0.14);
        }
        .bff-wrap {
          width: min(1280px, calc(100% - 32px));
          margin: 0 auto;
        }
        .bff-top-inner {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          flex-wrap: wrap;
        }
        .bff-brand {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .bff-brand h1 {
          margin: 0;
          font-size: clamp(1.6rem, 2vw, 2.3rem);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #16311d;
        }
        .bff-brand p {
          margin: 0;
          color: #516252;
          font-size: 0.95rem;
        }
        .bff-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }
        .bff-select, .bff-btn, .bff-chip {
          border-radius: 999px;
          border: 1px solid rgba(58, 84, 63, 0.16);
          background: white;
          padding: 10px 14px;
          color: #233323;
        }
        .bff-btn {
          cursor: pointer;
          font-weight: 700;
          transition: 0.2s ease;
        }
        .bff-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(22, 49, 29, 0.08);
        }
        .bff-btn-primary {
          background: #214b2d;
          color: #fff;
          border-color: #214b2d;
        }
        .bff-btn-soft {
          background: #eef4ea;
        }
        .bff-hero {
          padding: 26px 0 22px;
        }
        .bff-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 18px;
        }
        .bff-panel {
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(58, 84, 63, 0.12);
          border-radius: 28px;
          box-shadow: 0 10px 30px rgba(30, 50, 32, 0.07);
          overflow: hidden;
        }
        .bff-image-panel {
          min-height: 510px;
          position: relative;
          background-size: cover;
          background-position: center;
        }
        .bff-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(20,28,18,0.08) 0%, rgba(20,28,18,0.25) 55%, rgba(20,28,18,0.58) 100%);
        }
        .bff-hero-copy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 28px;
          color: white;
          z-index: 2;
        }
        .bff-kicker {
          display: inline-block;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
          border: 1px solid rgba(255,255,255,0.24);
          margin-bottom: 12px;
          font-size: 0.84rem;
          font-weight: 700;
        }
        .bff-hero-copy h2 {
          margin: 0 0 10px;
          font-size: clamp(1.8rem, 3vw, 3rem);
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        .bff-hero-copy p {
          margin: 0;
          max-width: 780px;
          font-size: 1rem;
          line-height: 1.55;
          color: rgba(255,255,255,0.93);
        }
        .bff-side {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bff-side h3, .bff-section-title {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.15;
          font-weight: 800;
          color: #17321d;
        }
        .bff-muted {
          color: #617061;
          line-height: 1.6;
        }
        .bff-role-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
        }
        .bff-role-btn {
          border-radius: 18px;
          border: 1px solid rgba(58, 84, 63, 0.12);
          padding: 14px 10px;
          background: #fff;
          cursor: pointer;
          font-weight: 700;
          color: #243324;
        }
        .bff-role-btn.active {
          background: #214b2d;
          color: #fff;
          border-color: #214b2d;
          box-shadow: 0 10px 24px rgba(33, 75, 45, 0.22);
        }
        .bff-weather {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 20px;
          background: #f4f7f0;
          border: 1px solid rgba(58, 84, 63, 0.09);
          flex-wrap: wrap;
        }
        .bff-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .bff-metric {
          padding: 16px;
          border-radius: 22px;
          background: white;
          border: 1px solid rgba(58, 84, 63, 0.10);
        }
        .bff-metric small {
          display: block;
          color: #667666;
          margin-bottom: 8px;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }
        .bff-metric strong {
          font-size: 1.06rem;
          line-height: 1.3;
          color: #203020;
        }
        .bff-sections {
          padding: 6px 0 40px;
        }
        .bff-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .bff-card {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(58, 84, 63, 0.12);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(30, 50, 32, 0.06);
        }
        .bff-card-image {
          height: 190px;
          background-size: cover;
          background-position: center;
        }
        .bff-card-body {
          padding: 18px;
        }
        .bff-card-body h4 {
          margin: 0 0 8px;
          font-size: 1.08rem;
          color: #18311e;
        }
        .bff-card-body p {
          margin: 0;
          color: #617061;
          line-height: 1.6;
        }
        .bff-section {
          margin-top: 22px;
        }
        .bff-section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .bff-module-list {
          margin: 0;
          padding-left: 18px;
          color: #4f5f4f;
          line-height: 1.7;
        }
        .bff-footer-space {
          height: 30px;
        }

        @media (max-width: 1050px) {
          .bff-hero-grid {
            grid-template-columns: 1fr;
          }
          .bff-role-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .bff-grid-3, .bff-metrics {
            grid-template-columns: 1fr;
          }
          .bff-image-panel {
            min-height: 430px;
          }
        }

        @media (max-width: 640px) {
          .bff-wrap {
            width: min(100% - 20px, 1280px);
          }
          .bff-role-grid {
            grid-template-columns: 1fr;
          }
          .bff-hero-copy {
            padding: 18px;
          }
          .bff-image-panel {
            min-height: 360px;
          }
        }
      `}</style>

      <div className="bff-shell">
        <div className="bff-topbar">
          <div className="bff-wrap bff-top-inner">
            <div className="bff-brand">
              <h1>{APP_TITLE}</h1>
              <p>{APP_SUBTITLE}</p>
            </div>

            <div className="bff-controls">
              <select
                className="bff-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                aria-label="Language"
              >
                {languageOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                className="bff-btn bff-btn-soft"
                onClick={() => setVoiceOn((v) => !v)}
              >
                {t.voice}: {voiceOn ? t.on : t.off}
              </button>

              <button
                className="bff-btn bff-btn-primary"
                onClick={() => setTourOn((v) => !v)}
              >
                {tourOn ? t.stopTour : t.guidedTour}
              </button>
            </div>
          </div>
        </div>

        <div className="bff-wrap">
          <section className="bff-hero">
            <div className="bff-hero-grid">
              <div
                className="bff-panel bff-image-panel"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="bff-overlay" />
                <div className="bff-hero-copy">
                  <div className="bff-kicker">
                    {t.demo} • {t.labels.currentRole}: {roleTitle}
                  </div>
                  <h2>{t.introTitle}</h2>
                  <p>{t.introBody}</p>
                </div>
              </div>

              <div className="bff-panel bff-side">
                <div>
                  <h3>{t.chooseRole}</h3>
                  <p className="bff-muted" style={{ marginTop: 8 }}>
                    {roleIntro}
                  </p>
                </div>

                <div className="bff-role-grid">
                  {roleButtons.map((btn) => (
                    <button
                      key={btn.key}
                      className={`bff-role-btn ${role === btn.key ? "active" : ""}`}
                      onClick={() => setRole(btn.key)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="bff-section-title">{t.quickActions}</div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 12,
                    }}
                  >
                    <button
                      className="bff-btn bff-btn-primary"
                      onClick={() => setRole("customer")}
                    >
                      {t.enterMarketplace}
                    </button>
                    <button
                      className="bff-btn"
                      onClick={() => window.scrollTo({ top: 980, behavior: "smooth" })}
                    >
                      {t.nutrition}
                    </button>
                    <button
                      className="bff-btn"
                      onClick={() => window.scrollTo({ top: 1550, behavior: "smooth" })}
                    >
                      {t.cropCalendar}
                    </button>
                  </div>
                </div>

                <div className="bff-weather">
                  <div>
                    <div className="bff-section-title">{t.weatherTitle}</div>
                    <div className="bff-muted" style={{ marginTop: 6 }}>
                      {weather.loading
                        ? t.weatherLoading
                        : `${weather.city || "Youngstown area"} • ${weatherText(
                            weather.code
                          )}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <div className="bff-chip">
                      {weather.loading ? "—" : `${weather.temp ?? "—"}°`}
                    </div>
                    <div className="bff-chip">
                      {weather.loading ? "—" : `${weather.wind ?? "—"} km/h`}
                    </div>
                  </div>
                </div>

                <div className="bff-metrics">
                  <div className="bff-metric">
                    <small>{t.labels.currentLanguage}</small>
                    <strong>{t.languageName}</strong>
                  </div>
                  <div className="bff-metric">
                    <small>{t.labels.currentRole}</small>
                    <strong>{roleTitle}</strong>
                  </div>
                  <div className="bff-metric">
                    <small>{t.demo}</small>
                    <strong>{tourOn ? "Running" : "Ready"}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bff-sections">
            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.roleOverview}</h3>
                  <p className="bff-muted" style={{ margin: "6px 0 0" }}>
                    {roleIntro}
                  </p>
                </div>
              </div>

              <div className="bff-grid-3">
                {primaryCards.map((card, idx) => (
                  <div className="bff-card" key={`${card.title}-${idx}`}>
                    <div
                      className="bff-card-image"
                      style={{
                        backgroundImage: `url(${
                          idx === 0
                            ? imageMap.market
                            : idx === 1
                            ? imageMap.nutrition
                            : imageMap.extra
                        })`,
                      }}
                    />
                    <div className="bff-card-body">
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.marketplaceTitle}</h3>
                  <p className="bff-muted" style={{ margin: "6px 0 0" }}>
                    {t.customerIntro}
                  </p>
                </div>
              </div>

              <div className="bff-grid-3">
                {t.marketplaceCards.map((card, idx) => (
                  <div className="bff-card" key={`${card.title}-${idx}`}>
                    <div
                      className="bff-card-image"
                      style={{
                        backgroundImage: `url(${
                          idx === 0
                            ? imageMap.customer
                            : idx === 1
                            ? imageMap.market
                            : imageMap.nutrition
                        })`,
                      }}
                    />
                    <div className="bff-card-body">
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.nutritionTitle}</h3>
                  <p className="bff-muted" style={{ margin: "6px 0 0" }}>
                    Fresh food learning tied to daily life, families, health, and better choices.
                  </p>
                </div>
              </div>

              <div className="bff-grid-3">
                {t.nutritionCards.map((card, idx) => (
                  <div className="bff-card" key={`${card.title}-${idx}`}>
                    <div
                      className="bff-card-image"
                      style={{
                        backgroundImage: `url(${
                          idx === 0
                            ? imageMap.nutrition
                            : idx === 1
                            ? imageMap.story
                            : imageMap.market
                        })`,
                      }}
                    />
                    <div className="bff-card-body">
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.calendarTitle}</h3>
                  <p className="bff-muted" style={{ margin: "6px 0 0" }}>
                    Seasonal rhythm, crop planning, timing, and community learning tied to the land.
                  </p>
                </div>
              </div>

              <div className="bff-grid-3">
                {t.calendarCards.map((card, idx) => (
                  <div className="bff-card" key={`${card.title}-${idx}`}>
                    <div
                      className="bff-card-image"
                      style={{
                        backgroundImage: `url(${
                          idx === 0
                            ? imageMap.calendar
                            : idx === 1
                            ? imageMap.grower
                            : imageMap.hero
                        })`,
                      }}
                    />
                    <div className="bff-card-body">
                      <h4>{card.title}</h4>
                      <p>{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.modules}</h3>
                  <p className="bff-muted" style={{ margin: "6px 0 0" }}>
                    The structure is meant to feel intuitive, welcoming, visual, and role-based.
                  </p>
                </div>
              </div>

              <div className="bff-panel" style={{ padding: 22 }}>
                <ul className="bff-module-list">
                  {t.modulesList.map((item, idx) => (
                    <li key={`${item}-${idx}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bff-section">
              <div className="bff-section-head">
                <div>
                  <h3 className="bff-section-title">{t.story}</h3>
                </div>
              </div>

              <div className="bff-card">
                <div
                  className="bff-card-image"
                  style={{ height: 260, backgroundImage: `url(${imageMap.story})` }}
                />
                <div className="bff-card-body" style={{ padding: 22 }}>
                  <h4>{APP_SUBTITLE}</h4>
                  <p>{t.storyBody}</p>
                </div>
              </div>
            </div>

            <div className="bff-footer-space" />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
