import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CloudSun,
  ShoppingBasket,
  Sprout,
  Users,
  ShieldCheck,
  CalendarDays,
  MapPin,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  Volume2,
  Languages,
  BookOpen,
  HeartPulse,
  Tractor,
  Trees,
  Leaf,
  Droplets,
  GraduationCap,
  ClipboardList,
  ScanLine,
  Bell,
  Star,
  Package,
  ChevronRight,
  Home,
  Sun,
  Cloud,
  Wind,
  CloudRain,
} from "lucide-react";

const images = {
  hero: "/GrowArea.jpg",
  guest: "/GrowArea2.jpg",
  customer: "/ProduceDisplay.jpg",
  grower: "/FarmerHands.jpg",
  youth: "/YouthWorkforce.jpg",
  supervisor: "/SupervisorField.jpg",
  volunteer: "/CommunityGrow.jpg",
  market: "/MarketTable.jpg",
  education: "/NutritionLearning.jpg",
  weather: "/SkyField.jpg",
};

type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa";
type RoleKey = "guest" | "customer" | "grower" | "youth" | "supervisor" | "volunteer";

type ForecastDay = {
  date: string;
  tempMax: number;
  tempMin: number;
  code: number;
};

type Translations = {
  appName: string;
  tagline: string;
  subtag: string;
  enterDemo: string;
  guidedTour: string;
  stopTour: string;
  chooseLanguage: string;
  todayAtFarm: string;
  marketplace: string;
  learning: string;
  cropCalendar: string;
  eventCheckIn: string;
  workforce: string;
  weather: string;
  whyMatters: string;
  roleJourney: string;
  quickActions: string;
  stepInto: string;
  restoring: string;
  nourishment: string;
  messageTitle: string;
  messageBody: string;
  navHome: string;
  navRoles: string;
  navMarket: string;
  navEducation: string;
  navCalendar: string;
  navOperations: string;
  navCheckIn: string;
  navStory: string;
  narratorPrefix: string;
};

const text: Record<LangKey, Translations> = {
  en: {
    appName: "Bronson Family Farm",
    tagline: "A living grower ecosystem for food, learning, and legacy.",
    subtag: "Regenerating land. Restoring health. Rebuilding connection.",
    enterDemo: "Enter Live Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Pause Guided Tour",
    chooseLanguage: "Choose language",
    todayAtFarm: "Today at the Farm",
    marketplace: "Marketplace",
    learning: "Food & Nutrition Learning",
    cropCalendar: "Crop Planning Calendar",
    eventCheckIn: "Event Check-In",
    workforce: "Youth Workforce Pathways",
    weather: "Farm Weather",
    whyMatters: "Why this matters",
    roleJourney: "Role journeys",
    quickActions: "Quick actions",
    stepInto: "Step into something different.",
    restoring: "This is a regenerative farm experience, not a typical website.",
    nourishment: "When food costs rise, many families are pushed toward overprocessed substitutes that slowly damage health. This ecosystem reconnects people to fresh food, practical knowledge, and each other.",
    messageTitle: "Food, dignity, and access belong together.",
    messageBody: "Bronson Family Farm and Farm & Family Alliance are building a welcoming ecosystem where growers, families, youth, volunteers, and customers can return again and again for produce, education, workforce experience, and hope.",
    navHome: "Home",
    navRoles: "Roles",
    navMarket: "Market",
    navEducation: "Education",
    navCalendar: "Calendar",
    navOperations: "Operations",
    navCheckIn: "Check-In",
    navStory: "Story",
    narratorPrefix: "Narration",
  },
  es: {
    appName: "Bronson Family Farm",
    tagline: "Un ecosistema vivo para alimentos, aprendizaje y legado.",
    subtag: "Regenerando la tierra. Restaurando la salud. Reconstruyendo la conexión.",
    enterDemo: "Entrar al demo",
    guidedTour: "Iniciar recorrido guiado",
    stopTour: "Pausar recorrido",
    chooseLanguage: "Elegir idioma",
    todayAtFarm: "Hoy en la finca",
    marketplace: "Mercado",
    learning: "Aprendizaje de alimentos y nutrición",
    cropCalendar: "Calendario de cultivos",
    eventCheckIn: "Registro del evento",
    workforce: "Rutas de trabajo juvenil",
    weather: "Clima de la finca",
    whyMatters: "Por qué importa",
    roleJourney: "Recorridos por rol",
    quickActions: "Acciones rápidas",
    stepInto: "Entre en algo diferente.",
    restoring: "Esta es una experiencia agrícola regenerativa, no un sitio típico.",
    nourishment: "Cuando suben los precios de los alimentos, muchas familias recurren a productos ultraprocesados que dañan lentamente la salud. Este ecosistema reconecta a las personas con alimentos frescos, conocimiento práctico y comunidad.",
    messageTitle: "La comida, la dignidad y el acceso van juntos.",
    messageBody: "Bronson Family Farm y Farm & Family Alliance están construyendo un ecosistema acogedor donde productores, familias, jóvenes, voluntarios y clientes regresan por alimentos, educación, experiencia laboral y esperanza.",
    navHome: "Inicio",
    navRoles: "Roles",
    navMarket: "Mercado",
    navEducation: "Educación",
    navCalendar: "Calendario",
    navOperations: "Operaciones",
    navCheckIn: "Registro",
    navStory: "Historia",
    narratorPrefix: "Narración",
  },
  tl: {
    appName: "Bronson Family Farm",
    tagline: "Isang buhay na ecosystem para sa pagkain, pagkatuto, at pamana.",
    subtag: "Binubuhay ang lupa. Ibinabalik ang kalusugan. Pinagdurugtong ang komunidad.",
    enterDemo: "Buksan ang demo",
    guidedTour: "Simulan ang guided tour",
    stopTour: "I-pause ang guided tour",
    chooseLanguage: "Pumili ng wika",
    todayAtFarm: "Ngayon sa bukid",
    marketplace: "Pamilihan",
    learning: "Pagkatuto sa pagkain at nutrisyon",
    cropCalendar: "Kalendaryo ng taniman",
    eventCheckIn: "Event check-in",
    workforce: "Youth workforce pathways",
    weather: "Panahon sa bukid",
    whyMatters: "Bakit mahalaga",
    roleJourney: "Mga paglalakbay ng papel",
    quickActions: "Mabilis na galaw",
    stepInto: "Pumasok sa kakaiba.",
    restoring: "Ito ay regenerative farm experience, hindi karaniwang website.",
    nourishment: "Kapag tumataas ang presyo ng pagkain, maraming pamilya ang napipilitang pumili ng sobrang processed na pagkain na unti-unting sumisira sa kalusugan. Ang ecosystem na ito ay nagbabalik sa sariwang pagkain, praktikal na kaalaman, at ugnayan.",
    messageTitle: "Magkasama ang pagkain, dignidad, at access.",
    messageBody: "Ang Bronson Family Farm at Farm & Family Alliance ay gumagawa ng mainit na ecosystem para sa growers, pamilya, kabataan, volunteers, at customers.",
    navHome: "Home",
    navRoles: "Mga papel",
    navMarket: "Pamilihan",
    navEducation: "Edukasyon",
    navCalendar: "Kalendaryo",
    navOperations: "Operasyon",
    navCheckIn: "Check-In",
    navStory: "Kuwento",
    narratorPrefix: "Salaysay",
  },
  it: {
    appName: "Bronson Family Farm",
    tagline: "Un ecosistema vivo per cibo, apprendimento e eredità.",
    subtag: "Rigenerare la terra. Ripristinare la salute. Ricostruire il legame.",
    enterDemo: "Apri demo",
    guidedTour: "Avvia tour guidato",
    stopTour: "Metti in pausa il tour",
    chooseLanguage: "Scegli la lingua",
    todayAtFarm: "Oggi alla fattoria",
    marketplace: "Mercato",
    learning: "Educazione alimentare e nutrizione",
    cropCalendar: "Calendario colture",
    eventCheckIn: "Check-in evento",
    workforce: "Percorsi per i giovani",
    weather: "Meteo della fattoria",
    whyMatters: "Perché conta",
    roleJourney: "Percorsi dei ruoli",
    quickActions: "Azioni rapide",
    stepInto: "Entra in qualcosa di diverso.",
    restoring: "Questa è un’esperienza agricola rigenerativa, non un sito tipico.",
    nourishment: "Quando i costi del cibo aumentano, molte famiglie scelgono sostituti ultra-processati che danneggiano lentamente la salute. Questo ecosistema riporta le persone verso cibo fresco, conoscenza pratica e comunità.",
    messageTitle: "Cibo, dignità e accesso devono stare insieme.",
    messageBody: "Bronson Family Farm e Farm & Family Alliance stanno costruendo un ecosistema accogliente per coltivatori, famiglie, giovani, volontari e clienti.",
    navHome: "Home",
    navRoles: "Ruoli",
    navMarket: "Mercato",
    navEducation: "Educazione",
    navCalendar: "Calendario",
    navOperations: "Operazioni",
    navCheckIn: "Check-In",
    navStory: "Storia",
    narratorPrefix: "Narrazione",
  },
  he: {
    appName: "Bronson Family Farm",
    tagline: "מערכת חיה של מזון, למידה ומורשת.",
    subtag: "משקמים את האדמה. מחזירים בריאות. בונים מחדש קשר.",
    enterDemo: "כניסה לדמו",
    guidedTour: "התחל סיור מודרך",
    stopTour: "השהה סיור",
    chooseLanguage: "בחר שפה",
    todayAtFarm: "היום בחווה",
    marketplace: "שוק",
    learning: "למידת תזונה ומזון",
    cropCalendar: "לוח גידולים",
    eventCheckIn: "צ'ק-אין לאירוע",
    workforce: "מסלולי תעסוקה לנוער",
    weather: "מזג האוויר בחווה",
    whyMatters: "למה זה חשוב",
    roleJourney: "מסלולי תפקידים",
    quickActions: "פעולות מהירות",
    stepInto: "היכנסו למשהו אחר.",
    restoring: "זו חוויה של חווה רגנרטיבית, לא אתר רגיל.",
    nourishment: "כשמחירי המזון עולים, משפחות רבות נאלצות לבחור במזון מעובד מאוד שפוגע לאט בבריאות. המערכת הזו מחברת מחדש למזון טרי, ידע מעשי וקהילה.",
    messageTitle: "מזון, כבוד וגישה שייכים יחד.",
    messageBody: "Bronson Family Farm ו-Farm & Family Alliance בונות מערכת מזמינה עבור מגדלים, משפחות, צעירים, מתנדבים ולקוחות.",
    navHome: "בית",
    navRoles: "תפקידים",
    navMarket: "שוק",
    navEducation: "חינוך",
    navCalendar: "לוח שנה",
    navOperations: "תפעול",
    navCheckIn: "צ'ק-אין",
    navStory: "סיפור",
    narratorPrefix: "קריינות",
  },
  patwa: {
    appName: "Bronson Family Farm",
    tagline: "A one live ecosystem fi food, learning, an legacy.",
    subtag: "Wi a heal di land. Build back health. Bring people back together.",
    enterDemo: "Go ina di demo",
    guidedTour: "Start guided tour",
    stopTour: "Pause guided tour",
    chooseLanguage: "Choose language",
    todayAtFarm: "Today pon di farm",
    marketplace: "Market",
    learning: "Food an nutrition learning",
    cropCalendar: "Crop planning calendar",
    eventCheckIn: "Event check-in",
    workforce: "Youth workforce pathways",
    weather: "Farm weather",
    whyMatters: "Why dis matter",
    roleJourney: "Role journeys",
    quickActions: "Quick actions",
    stepInto: "Step ina supm different.",
    restoring: "Dis a regenerative farm experience, not no regular website.",
    nourishment: "When food price rise, whole heap a families get push toward overprocessed substitute weh slowly mash up health. Dis ecosystem link people back to fresh food, practical knowledge, an community.",
    messageTitle: "Food, dignity, an access fi go together.",
    messageBody: "Bronson Family Farm an Farm & Family Alliance a build one welcoming ecosystem weh growers, families, youth, volunteers, an customers waan come back to.",
    navHome: "Home",
    navRoles: "Roles",
    navMarket: "Market",
    navEducation: "Education",
    navCalendar: "Calendar",
    navOperations: "Operations",
    navCheckIn: "Check-In",
    navStory: "Story",
    narratorPrefix: "Voice guide",
  },
};

const roleContent: Record<
  RoleKey,
  {
    title: string;
    intro: string;
    image: string;
    accent: string;
    bullets: string[];
    primary: string;
    secondary: string;
    icon: React.ReactNode;
  }
> = {
  guest: {
    title: "Guest",
    intro:
      "A welcoming first step into the ecosystem. Guests discover the farm story, upcoming events, weather, and simple paths into learning, visiting, and growing.",
    image: images.guest,
    accent: "from-amber-200/70 via-emerald-100/50 to-white/70",
    bullets: [
      "Explore the regenerative farm vision",
      "See event invitations and guided stories",
      "Discover community impact before creating an account",
    ],
    primary: "Explore the Farm Story",
    secondary: "See Upcoming Events",
    icon: <Home className="h-5 w-5" />,
  },
  customer: {
    title: "Customer",
    intro:
      "Customers move quickly to produce, pantry support, nutrition guidance, recipes, and buying history that makes healthy repeat ordering easier.",
    image: images.customer,
    accent: "from-green-200/70 via-lime-100/60 to-white/80",
    bullets: [
      "Go directly to the marketplace",
      "Track buying habits and reorder favorites",
      "Get nutrition and recipe guidance tied to purchases",
    ],
    primary: "Open Marketplace",
    secondary: "View Nutrition Support",
    icon: <ShoppingBasket className="h-5 w-5" />,
  },
  grower: {
    title: "Grower",
    intro:
      "Growers use the ecosystem for crop planning, weather, supply coordination, pricing visibility, post-harvest guidance, and seasonal confidence.",
    image: images.grower,
    accent: "from-emerald-200/70 via-teal-100/60 to-white/80",
    bullets: [
      "Review crop plan and field tasks",
      "Check weather and production timing",
      "Access pricing, learning, and marketplace pathways",
    ],
    primary: "Open Grower Hub",
    secondary: "See Crop Calendar",
    icon: <Sprout className="h-5 w-5" />,
  },
  youth: {
    title: "Youth Workforce",
    intro:
      "Youth experience real pathways through agriculture, teamwork, safety, confidence, and career-building—supported by meaningful structure, not just tasks.",
    image: images.youth,
    accent: "from-sky-200/70 via-cyan-100/60 to-white/80",
    bullets: [
      "Daily check-in, goals, and skills tracking",
      "Learning tied to food, business, and responsibility",
      "Career pathways connected to real work experience",
    ],
    primary: "Enter Youth Pathway",
    secondary: "See Skills Journey",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  supervisor: {
    title: "Supervisor",
    intro:
      "Supervisors coordinate youth support, attendance, daily tasks, resource needs, and personal growth observations for a stronger workforce experience.",
    image: images.supervisor,
    accent: "from-violet-200/70 via-fuchsia-100/60 to-white/80",
    bullets: [
      "Oversee progress, attendance, and safety",
      "Coordinate support staff and field needs",
      "Document growth through structured observations",
    ],
    primary: "Open Supervisor Desk",
    secondary: "Review Support Notes",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  volunteer: {
    title: "Volunteer",
    intro:
      "Volunteers are welcomed into a joyful, organized environment where they can sign up, learn the mission, and contribute to food access and restoration.",
    image: images.volunteer,
    accent: "from-rose-200/70 via-orange-100/60 to-white/80",
    bullets: [
      "See volunteer days and event needs",
      "Receive role-specific guidance and orientation",
      "Connect service to food access and community healing",
    ],
    primary: "Join Volunteer Day",
    secondary: "See Service Opportunities",
    icon: <Users className="h-5 w-5" />,
  },
};

const weatherCodeLabel = (code: number) => {
  if ([0].includes(code)) return { label: "Clear", icon: Sun };
  if ([1, 2, 3].includes(code)) return { label: "Cloudy", icon: Cloud };
  if ([45, 48].includes(code)) return { label: "Fog", icon: Wind };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { label: "Rain", icon: CloudRain };
  return { label: "Mixed", icon: CloudSun };
};

function useSpeech(textToSpeak: string, enabled: boolean, lang: LangKey) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const langMap: Record<LangKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      he: "he-IL",
      patwa: "en-JM",
    };
    utterance.lang = langMap[lang] || "en-US";
    utterance.rate = lang === "patwa" ? 0.9 : 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return () => window.speechSynthesis.cancel();
  }, [textToSpeak, enabled, lang]);
}

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function App() {
  const [lang, setLang] = useState<LangKey>("en");
  const [entered, setEntered] = useState(false);
  const [tourOn, setTourOn] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [activeRole, setActiveRole] = useState<RoleKey>("guest");
  const [section, setSection] = useState<
    "home" | "roles" | "market" | "education" | "calendar" | "operations" | "checkin" | "story"
  >("home");
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [weatherLabel, setWeatherLabel] = useState("Loading");
  const [voiceOn, setVoiceOn] = useState(true);
  const [timeNow, setTimeNow] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const t = text[lang];
  const role = roleContent[activeRole];

  const tourStops = useMemo(
    () => [
      { section: "home", role: "guest" },
      { section: "roles", role: "customer" },
      { section: "market", role: "customer" },
      { section: "education", role: "customer" },
      { section: "calendar", role: "grower" },
      { section: "operations", role: "supervisor" },
      { section: "checkin", role: "youth" },
      { section: "story", role: "volunteer" },
    ] as Array<{ section: typeof section; role: RoleKey }>,
    [section]
  );

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeNow(
        now.toLocaleString([], {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=41.10&longitude=-80.65&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data?.current) {
          setCurrentTemp(Math.round(data.current.temperature_2m));
          const currentWeather = weatherCodeLabel(data.current.weather_code || 0);
          setWeatherLabel(currentWeather.label);
        }
        if (data?.daily?.time) {
          const next = data.daily.time.slice(0, 5).map((date: string, i: number) => ({
            date,
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            code: data.daily.weather_code[i],
          }));
          setForecast(next);
        }
      })
      .catch(() => {
        setCurrentTemp(61);
        setWeatherLabel("Local conditions");
        setForecast([
          { date: "Today", tempMax: 65, tempMin: 48, code: 2 },
          { date: "Tomorrow", tempMax: 68, tempMin: 50, code: 1 },
          { date: "Next", tempMax: 62, tempMin: 45, code: 61 },
        ]);
      });
  }, []);

  useEffect(() => {
    if (!tourOn) return;
    const current = tourStops[tourStep % tourStops.length];
    setSection(current.section);
    setActiveRole(current.role);
    const id = setTimeout(() => setTourStep((s) => (s + 1) % tourStops.length), 4500);
    return () => clearTimeout(id);
  }, [tourOn, tourStep, tourStops]);

  const narration = useMemo(() => {
    const sectionLines: Record<typeof section, string> = {
      home: `${t.stepInto} ${t.restoring} ${t.messageBody}`,
      roles: `${role.title}. ${role.intro}`,
      market: `Customers can move directly into the marketplace for produce, seedlings, nutrition guidance, recipes, and repeat ordering support.`,
      education: `Education connects food choices with health, diabetes support, cooking confidence, and practical knowledge for families.`,
      calendar: `Growers can plan crops, track tasks, monitor weather, and align production with the season.`,
      operations: `Supervisors manage support, youth progress, safety, attendance, and daily logistics from one coordinated place.`,
      checkin: `The event check-in experience uses mobile QR scanning, role-based color signals, and welcoming arrival flow.`,
      story: `The story view centers restoration of land, health, legacy, and regional belonging.`,
    };
    return `${t.narratorPrefix}. ${sectionLines[section]}`;
  }, [section, role, t]);

  useSpeech(narration, tourOn && voiceOn, lang);

  const cards = [
    {
      title: t.marketplace,
      desc: "Fresh produce, seedlings, SNAP-aligned pathways, nutrition support, recipes, and habit-aware customer journeys.",
      icon: <ShoppingBasket className="h-5 w-5" />,
      image: images.market,
      action: () => {
        setSection("market");
        setActiveRole("customer");
      },
    },
    {
      title: t.learning,
      desc: "Practical learning around fresh food, overprocessed food risks, diabetes support, gardening, and family wellness.",
      icon: <HeartPulse className="h-5 w-5" />,
      image: images.education,
      action: () => setSection("education"),
    },
    {
      title: t.cropCalendar,
      desc: "Seasonal planning, planting windows, harvest timing, weather awareness, and grower confidence.",
      icon: <CalendarDays className="h-5 w-5" />,
      image: images.grower,
      action: () => {
        setSection("calendar");
        setActiveRole("grower");
      },
    },
    {
      title: t.workforce,
      desc: "A real workforce pathway for youth supported by structure, supervision, skills, and meaningful outcomes.",
      icon: <GraduationCap className="h-5 w-5" />,
      image: images.youth,
      action: () => {
        setSection("operations");
        setActiveRole("supervisor");
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(220,252,231,0.7),rgba(255,255,255,0.92),rgba(240,253,244,0.8))] text-slate-900">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/GrowArea.jpg')] bg-cover bg-center opacity-[0.08]" />
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">{t.appName}</div>
              <div className="text-xs text-slate-600">Developed by Bronson Family Farm</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {[
              ["home", t.navHome],
              ["roles", t.navRoles],
              ["market", t.navMarket],
              ["education", t.navEducation],
              ["calendar", t.navCalendar],
              ["operations", t.navOperations],
              ["checkin", t.navCheckIn],
              ["story", t.navStory],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSection(key as typeof section)}
                className={classNames(
                  "rounded-full px-4 py-2 text-sm transition",
                  section === key ? "bg-emerald-600 text-white shadow" : "bg-white/80 text-slate-700 hover:bg-emerald-50"
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full bg-white/80 px-3 py-2 text-xs text-slate-600 sm:block">
              Youngstown, Ohio · {timeNow}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2">
              <Languages className="h-4 w-4 text-emerald-700" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LangKey)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="tl">Filipino</option>
                <option value="it">Italian</option>
                <option value="he">Hebrew</option>
                <option value="patwa">Patwa</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {!entered ? (
        <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-12">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/55 shadow-2xl shadow-emerald-100 backdrop-blur-xl">
            <div className="absolute inset-0">
              <img src={images.hero} alt="Bronson Family Farm growing area" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/65 via-emerald-900/35 to-amber-700/20" />
            </div>
            <div className="relative flex min-h-[560px] flex-col justify-between p-6 text-white sm:p-8 lg:p-10">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                  <Trees className="h-4 w-4" /> {t.subtag}
                </div>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {t.stepInto}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">{t.tagline}</p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/85">{t.restoring}</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-3xl bg-black/20 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                    <CloudSun className="h-4 w-4" /> {t.weather}
                  </div>
                  <div className="text-3xl font-semibold">{currentTemp ?? "--"}°</div>
                  <div className="text-sm text-white/80">{weatherLabel}</div>
                </div>
                <div className="rounded-3xl bg-black/20 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                    <Sprout className="h-4 w-4" /> {t.cropCalendar}
                  </div>
                  <div className="text-sm text-white/85">Seed starting, transplanting, harvest timing, and grower readiness at a glance.</div>
                </div>
                <div className="rounded-3xl bg-black/20 p-4 backdrop-blur-md">
                  <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
                    <ScanLine className="h-4 w-4" /> {t.eventCheckIn}
                  </div>
                  <div className="text-sm text-white/85">QR-driven arrival, role colors, visitor flow, and a branded welcome experience.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-emerald-100 backdrop-blur-xl">
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">{t.whyMatters}</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t.messageTitle}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{t.nourishment}</p>
              <p className="mt-4 text-base leading-7 text-slate-700">{t.messageBody}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEntered(true);
                    setSection("home");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5"
                >
                  <ArrowRight className="h-4 w-4" /> {t.enterDemo}
                </button>
                <button
                  onClick={() => {
                    setEntered(true);
                    setTourOn(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
                >
                  <PlayCircle className="h-4 w-4" /> {t.guidedTour}
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-xl shadow-amber-100 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Star className="h-4 w-4 text-amber-500" /> {t.quickActions}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cards.map((card) => (
                  <button
                    key={card.title}
                    onClick={() => {
                      setEntered(true);
                      card.action();
                    }}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="h-28 overflow-hidden">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">{card.icon} {card.title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{card.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main ref={scrollerRef} className="mx-auto max-w-7xl space-y-8 px-4 py-6 lg:px-8 lg:py-8">
          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-xl shadow-emerald-100 backdrop-blur-xl">
              <div className="absolute inset-0">
                <img src={role.image} alt={role.title} className="h-full w-full object-cover" />
                <div className={classNames("absolute inset-0 bg-gradient-to-br opacity-90", role.accent)} />
              </div>
              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm">
                    {role.icon} {role.title}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
                    <MapPin className="h-4 w-4" /> Youngstown, Ohio
                  </span>
                  {tourOn && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      <Volume2 className="h-4 w-4" /> {t.narratorPrefix} on
                    </span>
                  )}
                </div>

                <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                  {role.intro}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{t.messageBody}</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {role.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-3xl bg-white/75 p-4 text-sm leading-6 text-slate-700 shadow-sm backdrop-blur">
                      {bullet}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-200">
                    {role.primary}
                  </button>
                  <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">
                    {role.secondary}
                  </button>
                  <button
                    onClick={() => setTourOn((v) => !v)}
                    className="rounded-full bg-white/80 px-5 py-3 text-sm font-medium text-slate-800"
                  >
                    {tourOn ? <PauseCircle className="mr-2 inline h-4 w-4" /> : <PlayCircle className="mr-2 inline h-4 w-4" />}
                    {tourOn ? t.stopTour : t.guidedTour}
                  </button>
                  <button
                    onClick={() => setVoiceOn((v) => !v)}
                    className="rounded-full bg-white/80 px-5 py-3 text-sm font-medium text-slate-800"
                  >
                    <Volume2 className="mr-2 inline h-4 w-4" /> Voice {voiceOn ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-sky-100 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CloudSun className="h-4 w-4 text-sky-600" /> {t.todayAtFarm}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatCard label={t.weather} value={`${currentTemp ?? "--"}°`} sub={weatherLabel} icon={<CloudSun className="h-4 w-4" />} />
                  <StatCard label={t.marketplace} value="Open" sub="Produce · Seedlings · Recipes" icon={<ShoppingBasket className="h-4 w-4" />} />
                  <StatCard label={t.workforce} value="Active" sub="Check-in · Skills · Supervision" icon={<Users className="h-4 w-4" />} />
                  <StatCard label={t.eventCheckIn} value="QR Ready" sub="iPhone scan flow" icon={<ScanLine className="h-4 w-4" />} />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-emerald-100 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users className="h-4 w-4 text-emerald-700" /> {t.roleJourney}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(Object.keys(roleContent) as RoleKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveRole(key);
                        setSection("roles");
                      }}
                      className={classNames(
                        "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
                        activeRole === key ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"
                      )}
                    >
                      <span>
                        <div className="font-medium text-slate-800">{roleContent[key].title}</div>
                        <div className="text-xs text-slate-500">Journey view</div>
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <SectionTabs section={section} setSection={setSection} t={t} />

          {section === "home" && (
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <InfoPanel
                title={t.messageTitle}
                icon={<Leaf className="h-5 w-5" />}
                body={t.nourishment}
                image={images.hero}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                  <ActionCard key={card.title} title={card.title} desc={card.desc} image={card.image} onClick={card.action} icon={card.icon} />
                ))}
              </div>
            </section>
          )}

          {section === "roles" && (
            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <InfoPanel title={role.title} icon={role.icon} body={role.intro} image={role.image} />
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-emerald-100 backdrop-blur-xl">
                <div className="mb-4 text-lg font-semibold text-slate-800">Platform fit for this role</div>
                <div className="space-y-3">
                  {role.bullets.map((item) => (
                    <div key={item} className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-slate-700">{item}</div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {section === "market" && (
            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <InfoPanel
                title="Marketplace-first customer experience"
                icon={<ShoppingBasket className="h-5 w-5" />}
                body="Customers can move immediately into produce and seedling ordering, then continue into recipes, nutrition education, repeat ordering, and buying-history support. The marketplace is the most visible path because that is where many customers naturally want to go first."
                image={images.market}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniFeature icon={<Package className="h-5 w-5" />} title="Fresh produce" body="Produce, seedlings, pantry pathways, and seasonally relevant items." />
                <MiniFeature icon={<BookOpen className="h-5 w-5" />} title="Recipes" body="Simple ideas connected to what the customer buys most often." />
                <MiniFeature icon={<HeartPulse className="h-5 w-5" />} title="Nutrition support" body="Education around diabetes, whole foods, and lower-processed choices." />
                <MiniFeature icon={<Bell className="h-5 w-5" />} title="Buying habits" body="Reorder favorites and receive gentle prompts based on past shopping." />
              </div>
            </section>
          )}

          {section === "education" && (
            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <InfoPanel
                title="Food and nutrition learning"
                icon={<HeartPulse className="h-5 w-5" />}
                body="This ecosystem helps people compare natural food to overprocessed substitutes, understand diet and exercise, support Type II diabetes management, and build confidence around food choices for work, play, and daily life."
                image={images.education}
              />
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-rose-100 backdrop-blur-xl">
                <div className="grid gap-4">
                  <MiniFeature icon={<Leaf className="h-5 w-5" />} title="Fresh food literacy" body="Learn why real food matters and how to choose it on a budget." />
                  <MiniFeature icon={<HeartPulse className="h-5 w-5" />} title="Diabetes-friendly guidance" body="Nutrition patterns that support stability, energy, and informed daily choices." />
                  <MiniFeature icon={<BookOpen className="h-5 w-5" />} title="Recipes and practical use" body="Show customers what to do with the foods they bring home." />
                  <MiniFeature icon={<Users className="h-5 w-5" />} title="Family wellness" body="Support for households, seniors, youth, and community learners." />
                </div>
              </div>
            </section>
          )}

          {section === "calendar" && (
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-emerald-100 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <CalendarDays className="h-5 w-5 text-emerald-700" /> {t.cropCalendar}
                </div>
                <div className="space-y-3">
                  {[
                    ["Seed Starting", "Indoor starts, propagation rhythms, and inventory readiness."],
                    ["Transplant Window", "Field timing tied to conditions, protection, and labor flow."],
                    ["Harvest Planning", "Align expected yields with market days and education events."],
                    ["Season Notes", "Track crop observations, pests, soil, and water needs."],
                  ].map(([title, body]) => (
                    <div key={title} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                      <div className="font-medium text-slate-800">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">{body}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-sky-100 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                  <CloudSun className="h-5 w-5 text-sky-600" /> Local forecast
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {forecast.map((day, idx) => {
                    const weather = weatherCodeLabel(day.code);
                    const Icon = weather.icon;
                    return (
                      <div key={`${day.date}-${idx}`} className="rounded-2xl bg-sky-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-slate-800">
                              {String(day.date).includes("-")
                                ? new Date(day.date).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
                                : day.date}
                            </div>
                            <div className="text-xs text-slate-500">{weather.label}</div>
                          </div>
                          <Icon className="h-5 w-5 text-sky-600" />
                        </div>
                        <div className="mt-3 text-sm text-slate-700">High {day.tempMax}° · Low {day.tempMin}°</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {section === "operations" && (
            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <InfoPanel
                title="Supervisor operations desk"
                icon={<ClipboardList className="h-5 w-5" />}
                body="The supervisor dashboard supports the youth workforce experience through attendance, task assignments, safety tracking, support resource coordination, and growth observation. It reflects the role of the supervisor and support staff resources from New Vision Behavioral Health."
                image={images.supervisor}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <MiniFeature icon={<Users className="h-5 w-5" />} title="Attendance" body="Daily presence, role assignments, and active crew visibility." />
                <MiniFeature icon={<ShieldCheck className="h-5 w-5" />} title="Safety" body="PPE readiness, work zones, and reminders before tasks begin." />
                <MiniFeature icon={<ClipboardList className="h-5 w-5" />} title="Support notes" body="Track needs, interventions, and positive growth observations." />
                <MiniFeature icon={<GraduationCap className="h-5 w-5" />} title="Pathway progress" body="Connect today’s work to confidence, life skills, and career exposure." />
              </div>
            </section>
          )}

          {section === "checkin" && (
            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <InfoPanel
                title="Branded event check-in"
                icon={<ScanLine className="h-5 w-5" />}
                body="A Bronson Family Farm event arrival flow can use iPhone-based QR scanning with role colors, fast lookups, welcome prompts, and engagement paths tied to customer, vendor, volunteer, youth, and guest status."
                image={images.market}
              />
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-amber-100 backdrop-blur-xl">
                <div className="mb-4 text-lg font-semibold text-slate-800">Arrival flow</div>
                <div className="space-y-3">
                  {[
                    ["1", "Scan Eventbrite QR using iPhone organizer flow"],
                    ["2", "Display role color and visitor type instantly"],
                    ["3", "Guide visitor toward market, education, workforce, or welcome station"],
                    ["4", "Support follow-up engagement after the event"],
                  ].map(([num, label]) => (
                    <div key={num} className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 font-semibold text-white">{num}</div>
                      <div className="text-sm leading-6 text-slate-700">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {section === "story" && (
            <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <InfoPanel
                title="A story of restoration"
                icon={<Trees className="h-5 w-5" />}
                body="Bronson Family Farm is restoring land while creating practical pathways for food access, learning, health, and belonging. The platform should feel friendly, visually appealing, and welcoming so people want to return to it again and again."
                image={images.hero}
              />
              <div className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-xl shadow-emerald-100 backdrop-blur-xl">
                <div className="mb-4 text-lg font-semibold text-slate-800">Platform values</div>
                <div className="grid gap-3">
                  <MiniFeature icon={<Trees className="h-5 w-5" />} title="Regeneration" body="Restore the land and build healthier systems." />
                  <MiniFeature icon={<Users className="h-5 w-5" />} title="Belonging" body="Create a return-worthy experience for many kinds of users." />
                  <MiniFeature icon={<Sprout className="h-5 w-5" />} title="Practical growth" body="Help growers, families, and youth take the next step." />
                  <MiniFeature icon={<HeartPulse className="h-5 w-5" />} title="Health" body="Reconnect communities to nourishment and whole-food learning." />
                </div>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

function SectionTabs({
  section,
  setSection,
  t,
}: {
  section: string;
  setSection: (value: any) => void;
  t: Translations;
}) {
  const tabs = [
    ["home", t.navHome, <Home className="h-4 w-4" />],
    ["roles", t.navRoles, <Users className="h-4 w-4" />],
    ["market", t.navMarket, <ShoppingBasket className="h-4 w-4" />],
    ["education", t.navEducation, <BookOpen className="h-4 w-4" />],
    ["calendar", t.navCalendar, <CalendarDays className="h-4 w-4" />],
    ["operations", t.navOperations, <ClipboardList className="h-4 w-4" />],
    ["checkin", t.navCheckIn, <ScanLine className="h-4 w-4" />],
    ["story", t.navStory, <Trees className="h-4 w-4" />],
  ];

  return (
    <section className="overflow-x-auto rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-lg shadow-emerald-100 backdrop-blur-xl">
      <div className="flex min-w-max gap-2">
        {tabs.map(([key, label, icon]) => (
          <button
            key={String(key)}
            onClick={() => setSection(key)}
            className={classNames(
              "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition",
              section === key ? "bg-emerald-600 text-white shadow" : "bg-white text-slate-700 hover:bg-emerald-50"
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {icon} {label}
      </div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600">{sub}</div>
    </div>
  );
}

function InfoPanel({
  title,
  body,
  image,
  icon,
}: {
  title: string;
  body: string;
  image: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 shadow-xl shadow-emerald-100 backdrop-blur-xl">
      <div className="h-72 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
          {icon} {title}
        </div>
        <p className="text-base leading-7 text-slate-700">{body}</p>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  image,
  onClick,
  icon,
}: {
  title: string;
  desc: string;
  image: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="group overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 text-left shadow-xl shadow-emerald-100 transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-700">{icon} {title}</div>
        <div className="text-sm leading-6 text-slate-600">{desc}</div>
      </div>
    </button>
  );
}

function MiniFeature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">{icon} {title}</div>
      <div className="text-sm leading-6 text-slate-600">{body}</div>
    </div>
  );
}
