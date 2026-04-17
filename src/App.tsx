import React, { useEffect, useMemo, useRef, useState } from "react";

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
  hero: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea.jpg",
  guest: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0220.JPG",
  customer: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea2.jpg",
  grower: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0221.JPG",
  youth: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0223.JPG",
  supervisor: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0225.JPG",
  market: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0237.JPG",
  nutrition: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0238.JPG",
  calendar: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0249.JPG",
  story: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0266.JPG",
  extra: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0222.JPG",
};

const translations = {
  en: {
    languageName: "English",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Choose your pathway",
    introTitle: "A living farm ecosystem, not a presentation",
    introBody:
      "This platform connects land, learning, food, growers, youth workforce development, volunteers, and community commerce in one welcoming experience.",
    enterMarketplace: "Go to Marketplace",
    nutrition: "Nutrition & Recipes",
    cropCalendar: "Crop Planning Calendar",
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
      "A simple entry point for community visitors, funders, families, and first-time learners to understand the ecosystem.",
    customerIntro:
      "Customers can move quickly into the marketplace, discover what is fresh, review nutrition guidance, save buying habits, and find recipe ideas tied to real food.",
    growerIntro:
      "Growers can coordinate supply, seasonality, crop planning, post-harvest learning, and participation in the shared ecosystem.",
    youthIntro:
      "Youth experience agriculture as workforce preparation through hands-on learning, safety, teamwork, accountability, food knowledge, and career pathways.",
    supervisorIntro:
      "Supervisors support youth progress, monitor readiness, track observations, support safety, and strengthen the connection between work and long-term growth.",
    storyTitle: "Why this matters",
    storyBody:
      "Bronson Family Farm is designed as an off-grid, regenerative, welcoming environment that combines food access, workforce development, agritourism, community learning, and long-term family legacy.",
    modulesTitle: "Platform Modules",
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
  },
  es: {
    languageName: "Español",
    guidedTour: "Iniciar recorrido guiado",
    stopTour: "Detener recorrido",
    chooseRole: "Elige tu camino",
    introTitle: "Un ecosistema agrícola vivo, no una presentación",
    introBody:
      "Esta plataforma conecta tierra, aprendizaje, alimentos, productores, desarrollo laboral juvenil, voluntariado y comercio comunitario en una sola experiencia acogedora.",
    enterMarketplace: "Ir al Mercado",
    nutrition: "Nutrición y Recetas",
    cropCalendar: "Calendario de Cultivo",
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
    storyTitle: "Por qué importa",
    storyBody:
      "Bronson Family Farm está diseñada como un entorno regenerativo, fuera de la red, acogedor y orientado a alimentos, comunidad y legado.",
    modulesTitle: "Módulos de la plataforma",
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
  },
  tl: {
    languageName: "Tagalog",
    guidedTour: "Simulan ang gabay na tour",
    stopTour: "Ihinto ang tour",
    chooseRole: "Piliin ang iyong landas",
    introTitle: "Isang buhay na ecosystem ng bukid, hindi presentasyon",
    introBody:
      "Pinagdurugtong ng platapormang ito ang lupa, pagkatuto, pagkain, mga grower, youth workforce, boluntaryo, at pangkomunidad na kalakalan.",
    enterMarketplace: "Pumunta sa Marketplace",
    nutrition: "Nutrisyon at Mga Recipe",
    cropCalendar: "Kalendaryo ng Pagtatanim",
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
    storyTitle: "Bakit ito mahalaga",
    storyBody:
      "Ang Bronson Family Farm ay dinisenyo bilang isang off-grid, regenerative, at welcoming na espasyo para sa pagkain, pag-aaral, at pamana.",
    modulesTitle: "Mga module ng plataporma",
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
  },
  it: {
    languageName: "Italiano",
    guidedTour: "Avvia tour guidato",
    stopTour: "Ferma tour",
    chooseRole: "Scegli il tuo percorso",
    introTitle: "Un ecosistema agricolo vivo, non una presentazione",
    introBody:
      "Questa piattaforma collega terra, apprendimento, cibo, coltivatori, sviluppo giovanile, volontariato e commercio comunitario.",
    enterMarketplace: "Vai al Marketplace",
    nutrition: "Nutrizione e Ricette",
    cropCalendar: "Calendario Colturale",
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
    storyTitle: "Perché conta",
    storyBody:
      "Bronson Family Farm è progettata come uno spazio rigenerativo, off-grid e accogliente per cibo, apprendimento e comunità.",
    modulesTitle: "Moduli della piattaforma",
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
  },
  he: {
    languageName: "עברית",
    guidedTour: "התחל סיור מודרך",
    stopTour: "עצור סיור",
    chooseRole: "בחרי או בחר מסלול",
    introTitle: "מערכת חקלאית חיה, לא מצגת",
    introBody:
      "הפלטפורמה מחברת אדמה, למידה, מזון, מגדלים, פיתוח נוער, מתנדבים ומסחר קהילתי לחוויה אחת מזמינה.",
    enterMarketplace: "כניסה לשוק",
    nutrition: "תזונה ומתכונים",
    cropCalendar: "לוח גידול",
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
    storyTitle: "למה זה חשוב",
    storyBody:
      "Bronson Family Farm נבנתה כסביבה מתחדשת, מחוץ לרשת, מזמינה ומבוססת על מזון, למידה ומורשת.",
    modulesTitle: "מודולי הפלטפורמה",
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
  },
  jam: {
    languageName: "Patwa",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Pick yuh pathway",
    introTitle: "Dis a real farm ecosystem, not no slideshow",
    introBody:
      "Dis platform tie together land, learning, food, growers, youth workforce, volunteers, an community business inna one warm space.",
    enterMarketplace: "Go A Marketplace",
    nutrition: "Nutrition An Recipes",
    cropCalendar: "Crop Planning Calendar",
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
    storyTitle: "Why dis matter",
    storyBody:
      "Bronson Family Farm build fi be off-grid, regenerative, welcoming, an centered pon food, community, learning, an legacy.",
    modulesTitle: "Platform Modules",
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
  },
} as const;

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

export default function App() {
  const [role, setRole] = useState<Role>("guest");
  const [lang, setLang] = useState<Lang>("en");
  const [tourOn, setTourOn] = useState(false);
  const [weather, setWeather] = useState<WeatherState>({ loading: true });
  const speakRef = useRef<number | null>(null);

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

  useEffect(() => {
    async function loadWeather() {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m,wind_speed_10m,weather_code"
        );
        const data = await response.json();
        setWeather({
          loading: false,
          temp: data?.current?.temperature_2m,
          wind: data?.current?.wind_speed_10m,
          code: data?.current?.weather_code,
          city: "Youngstown",
        });
      } catch {
        setWeather({
          loading: false,
          error: "Unable to load weather",
          city: "Youngstown",
        });
      }
    }
    loadWeather();
  }, []);

  useEffect(() => {
    if (!tourOn) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const lines = [
      `${APP_SUBTITLE}. ${t.introTitle}. ${t.introBody}`,
      `${roleTitle}. ${roleIntro}`,
      `${t.marketplaceTitle}. ${t.customerIntro}`,
      `${t.nutritionTitle}. Fresh food, recipes, and healthier choices.`,
      `${t.calendarTitle}. Seasonal planning, seed starting, transplanting, watering, and harvest timing.`,
      `${t.storyTitle}. ${t.storyBody}`,
    ];

    let index = 0;
    const speakNext = () => {
      if (index >= lines.length) {
        setTourOn(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(lines[index]);
      utter.lang =
        lang === "es"
          ? "es-ES"
          : lang === "it"
          ? "it-IT"
          : lang === "he"
          ? "he-IL"
          : lang === "tl"
          ? "fil-PH"
          : "en-US";
      utter.rate = 0.95;
      utter.onend = () => {
        index += 1;
        speakRef.current = window.setTimeout(speakNext, 400);
      };
      window.speechSynthesis.speak(utter);
    };

    speakNext();

    return () => {
      if (speakRef.current) window.clearTimeout(speakRef.current);
      window.speechSynthesis.cancel();
    };
  }, [tourOn, lang, t, roleTitle, roleIntro]);

  const cards =
    role === "customer"
      ? [
          {
            title: "Shop Fresh Food",
            body: "Move directly into produce, seedlings, and seasonal offerings with a cleaner path for customers.",
            image: imageMap.customer,
          },
          {
            title: "Track Buying Habits",
            body: "Support repeat customers with saved interests like greens, tomatoes, seedlings, and family favorites.",
            image: imageMap.market,
          },
          {
            title: "Healthy Choices",
            body: "Pair food availability with simple education about nutrition and food quality.",
            image: imageMap.nutrition,
          },
        ]
      : role === "grower"
      ? [
          {
            title: "Crop Planning",
            body: "Coordinate seasonality, supply, timing, and participation across the ecosystem.",
            image: imageMap.calendar,
          },
          {
            title: "Post-Harvest Learning",
            body: "Support handling, quality, storage, and grower coordination.",
            image: imageMap.grower,
          },
          {
            title: "Season Rhythm",
            body: "Connect weather, timing, protection, and harvest readiness.",
            image: imageMap.hero,
          },
        ]
      : role === "youth"
      ? [
          {
            title: "Youth Workforce Pathway",
            body: "Attendance, safety, teamwork, food systems learning, and visible growth.",
            image: imageMap.youth,
          },
          {
            title: "Skills to Opportunity",
            body: "Agriculture becomes a bridge to employability, routines, confidence, and leadership.",
            image: imageMap.extra,
          },
          {
            title: "Belonging and Purpose",
            body: "Youth are contributors inside a meaningful ecosystem.",
            image: imageMap.story,
          },
        ]
      : role === "supervisor"
      ? [
