import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CloudSun,
  Users,
  ShoppingBasket,
  Sprout,
  ShieldCheck,
  Globe2,
  MapPin,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  BookOpen,
  ClipboardList,
  QrCode,
  Trees,
  Bell,
  ScanLine,
  GraduationCap,
  ChevronRight,
  Sun,
  MoonStar,
} from "lucide-react";

function Button({ className = "", children, ...props }: any) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 transition-all ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({ className = "", children, ...props }: any) {
  return (
    <div {...props} className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }: any) {
  return <input {...props} className={className} />;
}

function Card({ className = "", children, ...props }: any) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

function CardHeader({ className = "", children, ...props }: any) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }: any) {
  return (
    <h3 {...props} className={className}>
      {children}
    </h3>
  );
}

function CardContent({ className = "", children, ...props }: any) {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
}

const languages = {
  English: {
    appTitle: "Bronson Family Farm",
    appSub: "Grower Ecosystem Demo",
    enterDemo: "Enter Live Demo",
    returnHome: "Back to Welcome",
    chooseExperience: "Choose an Experience",
    whyItMatters:
      "Agriculture, workforce, family wellness, and community infrastructure in one living ecosystem.",
    guest: "Guest",
    customer: "Customer",
    grower: "Grower",
    supervisor: "Supervisor",
    youth: "Youth Workforce",
    admin: "Operations",
    weather: "Weather",
    calendar: "Grower Calendar",
    events: "Events",
    marketplace: "Marketplace",
    learning: "Learning",
    story: "Story",
    alerts: "Alerts",
    checkIn: "Check-In",
    liveNow: "Live Now",
    nextSteps: "Next Steps",
    welcomeLine:
      "A welcoming, visual, role-based farm platform built for community use.",
    ecosystem:
      "This demo shows how Bronson Family Farm, Farm & Family Alliance, Parker Farms, and the historic Lansdowne Airport site work together as one connected ecosystem.",
    farmWeather: "Youngstown Farm Weather",
    roleOverview: "Role Overview",
    todaysFocus: "Today's Focus",
    reservePickup: "Reserve Pickup",
    scanIn: "Scan to Check In",
    learnMore: "Learn More",
    workforce: "Workforce Pathways",
    wellness: "Wellness & Nutrition",
    produceOps: "Produce & Inventory",
    multilingual: "Multilingual Access",
    eventName: "Growers Supply Market",
    eventDate: "Saturday, May 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "Farm & Family Guide",
    askPlaceholder:
      "Ask about planting, volunteers, pickup, safety, recipes, or events…",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
  },
  Spanish: {
    appTitle: "Bronson Family Farm",
    appSub: "Demostración del Ecosistema de Cultivo",
    enterDemo: "Entrar a la Demostración",
    returnHome: "Volver al Inicio",
    chooseExperience: "Elija una Experiencia",
    whyItMatters:
      "Agricultura, fuerza laboral, bienestar familiar e infraestructura comunitaria en un ecosistema vivo.",
    guest: "Invitado",
    customer: "Cliente",
    grower: "Productor",
    supervisor: "Supervisor",
    youth: "Jóvenes",
    admin: "Operaciones",
    weather: "Clima",
    calendar: "Calendario",
    events: "Eventos",
    marketplace: "Mercado",
    learning: "Aprendizaje",
    story: "Historia",
    alerts: "Alertas",
    checkIn: "Registro",
    liveNow: "En Vivo",
    nextSteps: "Próximos Pasos",
    welcomeLine:
      "Una plataforma agrícola acogedora, visual y basada en roles para la comunidad.",
    ecosystem:
      "Esta demostración muestra cómo Bronson Family Farm, Farm & Family Alliance, Parker Farms y el histórico sitio del aeropuerto Lansdowne trabajan juntos como un ecosistema conectado.",
    farmWeather: "Clima de la Granja",
    roleOverview: "Resumen del Rol",
    todaysFocus: "Enfoque de Hoy",
    reservePickup: "Reservar Recogida",
    scanIn: "Escanear para Ingresar",
    learnMore: "Más Información",
    workforce: "Trayectorias Laborales",
    wellness: "Bienestar y Nutrición",
    produceOps: "Producción e Inventario",
    multilingual: "Acceso Multilingüe",
    eventName: "Growers Supply Market",
    eventDate: "Sábado, 16 de mayo · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "Guía de Farm & Family",
    askPlaceholder:
      "Pregunte sobre siembra, voluntarios, recogida, seguridad, recetas o eventos…",
    calmMode: "Modo Calma",
    standardMode: "Modo Estándar",
  },
  Tagalog: {
    appTitle: "Bronson Family Farm",
    appSub: "Demo ng Grower Ecosystem",
    enterDemo: "Buksan ang Demo",
    returnHome: "Bumalik",
    chooseExperience: "Pumili ng Karanasan",
    whyItMatters:
      "Pagsasaka, kabuhayan, kalusugan ng pamilya, at imprastraktura ng komunidad sa iisang buhay na ecosystem.",
    guest: "Bisita",
    customer: "Mamimili",
    grower: "Magsasaka",
    supervisor: "Supervisor",
    youth: "Kabataang Manggagawa",
    admin: "Operasyon",
    weather: "Panahon",
    calendar: "Kalendaryo",
    events: "Mga Kaganapan",
    marketplace: "Pamilihan",
    learning: "Pagkatuto",
    story: "Kuwento",
    alerts: "Mga Alerto",
    checkIn: "Check-In",
    liveNow: "Live Now",
    nextSteps: "Mga Susunod na Hakbang",
    welcomeLine:
      "Isang magiliw, biswal, at role-based na farm platform para sa komunidad.",
    ecosystem:
      "Ipinapakita ng demo na ito kung paano nagtutulungan ang Bronson Family Farm, Farm & Family Alliance, Parker Farms, at ang makasaysayang Lansdowne Airport site bilang isang konektadong ecosystem.",
    farmWeather: "Panahon sa Bukid",
    roleOverview: "Buod ng Role",
    todaysFocus: "Pokús Ngayon",
    reservePickup: "Magpareserba ng Pickup",
    scanIn: "I-scan para Mag-check In",
    learnMore: "Alamin Pa",
    workforce: "Landas sa Trabaho",
    wellness: "Kalusugan at Nutrisyon",
    produceOps: "Ani at Imbentaryo",
    multilingual: "Maraming Wika",
    eventName: "Growers Supply Market",
    eventDate: "Sabado, Mayo 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "Farm & Family Guide",
    askPlaceholder:
      "Magtanong tungkol sa pagtatanim, volunteers, pickup, safety, recipes, o events…",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
  },
  Patwa: {
    appTitle: "Bronson Family Farm",
    appSub: "Growa Ecosystem Demo",
    enterDemo: "Go Ina Di Demo",
    returnHome: "Back A Start",
    chooseExperience: "Pick Yuh Experience",
    whyItMatters:
      "Farmin, work pathway, family wellness, an community build-up all inna one live ecosystem.",
    guest: "Guest",
    customer: "Customer",
    grower: "Growa",
    supervisor: "Supervisor",
    youth: "Youth Work",
    admin: "Operations",
    weather: "Weather",
    calendar: "Calendar",
    events: "Events",
    marketplace: "Market",
    learning: "Learning",
    story: "Story",
    alerts: "Alerts",
    checkIn: "Check-In",
    liveNow: "Live Now",
    nextSteps: "Wha Next",
    welcomeLine:
      "A warm, visual, role-based farm platform fi di community.",
    ecosystem:
      "Dis demo show how Bronson Family Farm, Farm & Family Alliance, Parker Farms, an di historic Lansdowne Airport site a work together as one connected ecosystem.",
    farmWeather: "Youngstown Farm Weather",
    roleOverview: "Role Overview",
    todaysFocus: "Today Focus",
    reservePickup: "Reserve Pickup",
    scanIn: "Scan Fi Check In",
    learnMore: "Learn More",
    workforce: "Work Pathway",
    wellness: "Wellness & Food",
    produceOps: "Produce Ops",
    multilingual: "Plenty Language",
    eventName: "Growers Supply Market",
    eventDate: "Saturday, May 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "Farm & Family Guide",
    askPlaceholder:
      "Ask bout planting, volunteer, pickup, safety, recipe, or event…",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
  },
  Italian: {
    appTitle: "Bronson Family Farm",
    appSub: "Demo dell'Ecosistema dei Coltivatori",
    enterDemo: "Entra nella Demo",
    returnHome: "Torna all'Inizio",
    chooseExperience: "Scegli un'Esperienza",
    whyItMatters:
      "Agricoltura, lavoro, benessere familiare e infrastruttura comunitaria in un unico ecosistema vivo.",
    guest: "Ospite",
    customer: "Cliente",
    grower: "Coltivatore",
    supervisor: "Supervisore",
    youth: "Giovani",
    admin: "Operazioni",
    weather: "Meteo",
    calendar: "Calendario",
    events: "Eventi",
    marketplace: "Mercato",
    learning: "Apprendimento",
    story: "Storia",
    alerts: "Avvisi",
    checkIn: "Check-In",
    liveNow: "In Diretta",
    nextSteps: "Passi Successivi",
    welcomeLine:
      "Una piattaforma agricola accogliente, visiva e basata sui ruoli per la comunità.",
    ecosystem:
      "Questa demo mostra come Bronson Family Farm, Farm & Family Alliance, Parker Farms e lo storico sito dell'aeroporto Lansdowne lavorino insieme come un ecosistema connesso.",
    farmWeather: "Meteo della Fattoria",
    roleOverview: "Panoramica del Ruolo",
    todaysFocus: "Focus di Oggi",
    reservePickup: "Prenota Ritiro",
    scanIn: "Scansiona per Entrare",
    learnMore: "Scopri di Più",
    workforce: "Percorsi di Lavoro",
    wellness: "Benessere e Nutrizione",
    produceOps: "Prodotti e Inventario",
    multilingual: "Accesso Multilingue",
    eventName: "Growers Supply Market",
    eventDate: "Sabato 16 maggio · 9:00–14:00",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "Guida Farm & Family",
    askPlaceholder:
      "Chiedi informazioni su semina, volontari, ritiro, sicurezza, ricette o eventi…",
    calmMode: "Modalità Calma",
    standardMode: "Modalità Standard",
  },
  Hebrew: {
    appTitle: "Bronson Family Farm",
    appSub: "הדגמת מערכת המגדלים",
    enterDemo: "כניסה להדגמה",
    returnHome: "חזרה להתחלה",
    chooseExperience: "בחרו חוויה",
    whyItMatters:
      "חקלאות, תעסוקה, רווחת המשפחה ותשתית קהילתית במערכת חיה אחת.",
    guest: "אורח",
    customer: "לקוח",
    grower: "מגדל",
    supervisor: "מפקח",
    youth: "כוח עבודה צעיר",
    admin: "תפעול",
    weather: "מזג אוויר",
    calendar: "לוח שנה",
    events: "אירועים",
    marketplace: "שוק",
    learning: "למידה",
    story: "סיפור",
    alerts: "התראות",
    checkIn: "צ'ק-אין",
    liveNow: "בשידור חי",
    nextSteps: "הצעדים הבאים",
    welcomeLine:
      "פלטפורמת חווה ידידותית, חזותית ומבוססת תפקידים עבור הקהילה.",
    ecosystem:
      "הדגמה זו מראה כיצד Bronson Family Farm, Farm & Family Alliance, Parker Farms ואתר שדה התעופה ההיסטורי Lansdowne פועלים יחד כמערכת אקולוגית מחוברת אחת.",
    farmWeather: "מזג האוויר בחווה",
    roleOverview: "סקירת תפקיד",
    todaysFocus: "המיקוד להיום",
    reservePickup: "שריינו איסוף",
    scanIn: "סרקו לצ'ק-אין",
    learnMore: "למידע נוסף",
    workforce: "מסלולי תעסוקה",
    wellness: "בריאות ותזונה",
    produceOps: "תוצרת ומלאי",
    multilingual: "גישה רב-לשונית",
    eventName: "Growers Supply Market",
    eventDate: "שבת, 16 במאי · 9:00–14:00",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    aiGuide: "מדריך Farm & Family",
    askPlaceholder:
      "שאלו על שתילה, מתנדבים, איסוף, בטיחות, מתכונים או אירועים…",
    calmMode: "מצב רגוע",
    standardMode: "מצב רגיל",
  },
};

const roleCards = [
  {
    id: "guest",
    icon: Globe2,
    image: "/GrowArea.jpg",
    title: "Guest Experience",
    subtitle:
      "See the land, the mission, the market, and the learning pathways.",
    color: "from-emerald-700/80 to-lime-600/60",
  },
  {
    id: "customer",
    icon: ShoppingBasket,
    image: "/GrowArea2.jpg",
    title: "Customer Experience",
    subtitle:
      "Reserve produce, browse wellness education, and prepare for pickup.",
    color: "from-green-700/80 to-amber-500/60",
  },
  {
    id: "grower",
    icon: Sprout,
    image: "/GrowArea.jpg",
    title: "Grower Experience",
    subtitle:
      "Plan crops, watch tasks, check weather, and coordinate harvest.",
    color: "from-teal-700/80 to-green-500/60",
  },
  {
    id: "supervisor",
    icon: ShieldCheck,
    image: "/GrowArea2.jpg",
    title: "Supervisor Experience",
    subtitle:
      "Track youth progress, assignments, safety, and life-skill growth.",
    color: "from-cyan-800/80 to-emerald-500/60",
  },
  {
    id: "youth",
    icon: GraduationCap,
    image: "/GrowArea.jpg",
    title: "Youth Workforce",
    subtitle:
      "Build confidence, responsibility, employability, and real-world skills.",
    color: "from-lime-700/80 to-emerald-400/60",
  },
  {
    id: "admin",
    icon: ClipboardList,
    image: "/GrowArea2.jpg",
    title: "Operations Experience",
    subtitle:
      "Coordinate events, check-in, produce flow, staffing, and community engagement.",
    color: "from-green-900/80 to-teal-600/60",
  },
];

const weatherCards = [
  { day: "Thu", temp: "62°", note: "Transplant prep" },
  { day: "Fri", temp: "66°", note: "Watering window" },
  { day: "Sat", temp: "69°", note: "Event-friendly" },
  { day: "Sun", temp: "64°", note: "Mulch and check beds" },
];

const calendarItems = [
  {
    time: "8:00 AM",
    task: "Youth orientation and safety check",
    zone: "Welcome Tent",
  },
  {
    time: "9:30 AM",
    task: "Seedling care and irrigation review",
    zone: "Grow Area",
  },
  {
    time: "11:00 AM",
    task: "Nutrition and diabetes-friendly food talk",
    zone: "Learning Station",
  },
  {
    time: "1:00 PM",
    task: "Inventory sorting and pickup prep",
    zone: "Produce Command",
  },
];

const eventCards = [
  {
    title: "Growers Supply Market",
    time: "May 16 · 9:00 AM–2:00 PM",
    place: "Bronson Family Farm",
    detail:
      "Regional growers, tools, workshops, produce, wellness, and community learning.",
  },
  {
    title: "Youth Workforce Orientation",
    time: "Summer Cohort",
    place: "Farm Learning Zone",
    detail:
      "Real farm work, leadership, safety, and pathway-building.",
  },
  {
    title: "Wellness at the Farm",
    time: "Community Series",
    place: "Health & Learning Tent",
    detail:
      "Nutrition, movement, screenings, and practical strategies for healthier living.",
  },
];

const produceCards = [
  { name: "Tomato Seedlings", count: 24, note: "Ready for reservation" },
  { name: "Collard Greens", count: 40, note: "High-demand crop" },
  { name: "Cabbage", count: 100, note: "Strong inventory" },
  { name: "Peppers", count: 24, note: "Transplanting cycle" },
  { name: "Bubble Babies", count: 18, note: "Education + starter sales" },
  { name: "Lettuce", count: 30, note: "Fast pickup turnover" },
];

const youthTasks = [
  "Clock-in and PPE check",
  "Watering team rotation",
  "Transplant assistance",
  "Produce washing and sorting",
  "Customer greeting practice",
  "Reflection and skill journal",
];

const supervisorNotes = [
  { name: "Team Readiness", value: "High" },
  { name: "Attendance", value: "94%" },
  { name: "Safety Completion", value: "100%" },
  { name: "Leadership Growth", value: "Strong" },
];

function SectionTitle({ icon: Icon, title, right }: any) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="rounded-2xl bg-white/10 p-2 ring-1 ring-white/10">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white md:text-xl">{title}</h3>
      </div>
      {right}
    </div>
  );
}

function GlassCard({ children, className = "" }: any) {
  return (
    <div
      className={`rounded-3xl border border-white/12 bg-white/8 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<keyof typeof languages>("English");
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("guest");
  const [search, setSearch] = useState("");
  const [calmMode, setCalmMode] = useState(false);

  const t = languages[lang];
  const currentRole = useMemo(
    () => roleCards.find((r) => r.id === role) ?? roleCards[0],
    [role]
  );

  const bgImage = currentRole.image;
  const overlayStrength = calmMode
    ? "bg-[rgba(8,24,12,0.72)]"
    : "bg-[rgba(8,24,12,0.54)]";

  return (
    <div className="min-h-screen overflow-hidden bg-[#07150d] text-white">
      <div
        className="fixed inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className={`fixed inset-0 ${overlayStrength} transition-all duration-700`} />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(112,255,154,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,220,120,0.10),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-white/10 p-3 ring-1 ring-white/10">
              <Trees className="h-7 w-7 text-lime-200" />
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                {t.appTitle}
              </div>
              <div className="text-sm text-emerald-100/80 md:text-base">
                {t.appSub}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {Object.keys(languages).map((label) => (
              <Button
                key={label}
                onClick={() => setLang(label as keyof typeof languages)}
                className={`rounded-full border border-white/15 px-3 py-2 text-sm text-white hover:bg-white/12 ${
                  lang === label ? "bg-lime-300 text-[#153115]" : "bg-white/5"
                }`}
              >
                <Globe2 className="h-4 w-4" />
                {label}
              </Button>
            ))}
            <Button
              onClick={() => setCalmMode((v) => !v)}
              className="rounded-full bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
            >
              {calmMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
              {calmMode ? t.standardMode : t.calmMode}
            </Button>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <GlassCard className="overflow-hidden">
                <div className="relative min-h-[500px] p-6 md:p-8 lg:p-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-300/10" />
                  <div className="relative max-w-3xl">
                    <Badge className="mb-4 rounded-full bg-lime-300/20 px-4 py-2 text-lime-100">
                      {t.liveNow}
                    </Badge>

                    <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                      {t.welcomeLine}
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-50/85 md:text-lg">
                      {t.ecosystem}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-100/80 md:text-base">
                      {t.whyItMatters}
                    </p>

                    <div className="mt-6 space-y-4 text-sm leading-7 text-emerald-50/90 md:text-base">
                      <div className="rounded-2xl bg-white/6 p-4">
                        <span className="font-semibold">Bronson Family Farm</span>{" "}
                        operates as a regenerative, off-grid agritourism and food
                        system hub on the historic Lansdowne Airport grounds in
                        Youngstown, Ohio. The farm blends food production,
                        education, workforce development, and community wellness.
                      </div>

                      <div className="rounded-2xl bg-white/6 p-4">
                        <span className="font-semibold">Farm & Family Alliance</span>{" "}
                        serves as the nonprofit partner, focused on workforce
                        training, youth development, volunteer coordination,
                        education, and community impact.
                      </div>

                      <div className="rounded-2xl bg-white/6 p-4">
                        <span className="font-semibold">Parker Farms</span>{" "}
                        represents a regional growing partner and marketplace
                        model, supporting distribution, SNAP access, and grower
                        collaboration across the Mahoning Valley.
                      </div>

                      <div className="rounded-2xl bg-white/6 p-4">
                        <span className="font-semibold">
                          Lansdowne Airport (Historic Site)
                        </span>{" "}
                        provides the land foundation for this work. Once an active
                        aviation site, it is now being reimagined as a place where
                        land, food, learning, and community reconnect.
                      </div>

                      <div className="rounded-2xl bg-white/6 p-4">
                        Together, these partners form a{" "}
                        <span className="font-semibold">Grower Ecosystem</span> —
                        where individuals can enter as guests, become customers,
                        learn as growers, develop through workforce pathways, and
                        contribute to a sustainable local economy.
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button
                        onClick={() => setStarted(true)}
                        className="rounded-full bg-lime-300 px-6 py-4 text-base font-semibold text-[#153115] hover:bg-lime-200"
                      >
                        {t.enterDemo}
                        <ArrowRight className="h-5 w-5" />
                      </Button>

                      <Button className="rounded-full bg-white/10 px-6 py-4 text-white hover:bg-white/20">
                        <MapPin className="h-5 w-5" />
                        {t.eventPlace}
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-6">
                <GlassCard className="p-5">
                  <SectionTitle icon={Calendar} title={t.eventName} />
                  <div className="mt-4 space-y-3 text-sm text-emerald-50/85">
                    <div className="rounded-2xl bg-white/6 p-4">
                      {t.eventDate}
                    </div>
                    <div className="rounded-2xl bg-white/6 p-4">
                      {t.eventPlace}
                    </div>
                    <div className="rounded-2xl bg-white/6 p-4">
                      Tools, growers, produce, wellness, workshops, workforce
                      pathways, and community check-in.
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <SectionTitle icon={Globe2} title={t.multilingual} />
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    {Object.keys(languages).map((name) => (
                      <div
                        key={name}
                        className="rounded-2xl bg-white/6 p-3 text-emerald-50/90"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <GlassCard className="p-4 md:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.18em] text-emerald-200/70">
                      {t.chooseExperience}
                    </div>
                    <div className="mt-1 text-2xl font-semibold md:text-3xl">
                      {currentRole.title}
                    </div>
                    <div className="mt-1 max-w-2xl text-sm text-emerald-50/80 md:text-base">
                      {currentRole.subtitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => setStarted(false)}
                      className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20"
                    >
                      {t.returnHome}
                    </Button>

                    <Button className="rounded-full bg-lime-300 px-4 py-2 text-[#153115] hover:bg-lime-200">
                      {t.scanIn}
                      <ScanLine className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {roleCards.map((card) => {
                  const Icon = card.icon;
                  const active = card.id === role;

                  return (
                    <motion.button
                      whileHover={{ y: -4 }}
                      key={card.id}
                      onClick={() => setRole(card.id)}
                      className={`group relative overflow-hidden rounded-[1.8rem] border text-left transition-all ${
                        active
                          ? "border-lime-300/70 ring-2 ring-lime-300/50"
                          : "border-white/10"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${card.image})` }}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
                      />
                      <div className="relative min-h-[180px] p-4">
                        <div className="mb-10 inline-flex rounded-2xl bg-black/20 p-2 backdrop-blur-md">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-lg font-semibold">{card.title}</div>
                        <div className="mt-2 text-sm text-white/85">
                          {card.subtitle}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <GlassCard className="p-5 md:p-6">
                    <SectionTitle
                      icon={currentRole.icon}
                      title={t.roleOverview}
                      right={
                        <Badge className="rounded-full bg-lime-300/20 px-3 py-1 text-lime-100">
                          {t.liveNow}
                        </Badge>
                      }
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl bg-white/6 p-5">
                        <div className="text-sm text-emerald-100/70">
                          {t.todaysFocus}
                        </div>
                        <div className="mt-2 text-xl font-semibold">
                          {role === "guest" &&
                            "Explore the farm, event flow, and community mission"}
                          {role === "customer" &&
                            "Reserve seedlings, pickup times, and healthy food guidance"}
                          {role === "grower" &&
                            "Track beds, tasks, weather, and crop readiness"}
                          {role === "supervisor" &&
                            "Monitor youth teams, safety, and progress"}
                          {role === "youth" &&
                            "Learn, work, grow confidence, and build your pathway"}
                          {role === "admin" &&
                            "Coordinate inventory, events, check-in, and staffing"}
                        </div>
                        <div className="mt-3 text-sm leading-7 text-emerald-50/80">
                          This experience is designed to feel useful, friendly,
                          and active.
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white/6 p-5">
                        <div className="text-sm text-emerald-100/70">
                          {t.nextSteps}
                        </div>
                        <div className="mt-3 space-y-3 text-sm text-emerald-50/85">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-lime-300" />
                            Role-specific dashboards
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-lime-300" />
                            Calendar-aware scheduling
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-lime-300" />
                            QR check-in and engagement
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-lime-300" />
                            Education, wellness, and produce operations
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 md:p-6">
                    <SectionTitle icon={CloudSun} title={t.farmWeather} />
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {weatherCards.map((item) => (
                        <div key={item.day} className="rounded-3xl bg-white/6 p-4">
                          <div className="text-sm text-emerald-100/70">
                            {item.day}
                          </div>
                          <div className="mt-2 text-3xl font-semibold">
                            {item.temp}
                          </div>
                          <div className="mt-1 text-sm text-emerald-50/80">
                            {item.note}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <GlassCard className="p-5 md:p-6">
                      <SectionTitle icon={Calendar} title={t.calendar} />
                      <div className="mt-4 space-y-3">
                        {calendarItems.map((item) => (
                          <div
                            key={item.time + item.task}
                            className="rounded-3xl bg-white/6 p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-sm text-emerald-100/70">
                                  {item.time}
                                </div>
                                <div className="mt-1 font-medium">
                                  {item.task}
                                </div>
                              </div>
                              <Badge className="rounded-full bg-white/10 px-3 py-1 text-white">
                                {item.zone}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>

                    <GlassCard className="p-5 md:p-6">
                      <SectionTitle icon={Bell} title={t.alerts} />
                      <div className="mt-4 space-y-3 text-sm text-emerald-50/85">
                        <div className="rounded-3xl bg-white/6 p-4">
                          Rain buffer available for outdoor learning rotation.
                        </div>
                        <div className="rounded-3xl bg-white/6 p-4">
                          Inventory reservation active for seedlings and Bubble Babies.
                        </div>
                        <div className="rounded-3xl bg-white/6 p-4">
                          Check-in flow ready for role-based arrival and volunteer routing.
                        </div>
                        <div className="rounded-3xl bg-white/6 p-4">
                          Wellness programming can be paired with nutrition education and movement activities.
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                <div className="space-y-6">
                  <GlassCard className="p-5 md:p-6">
                    <SectionTitle icon={ShoppingBasket} title={t.marketplace} />
                    <div className="mt-4 grid gap-3">
                      {produceCards.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between rounded-3xl bg-white/6 p-4"
                        >
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-emerald-100/70">
                              {item.note}
                            </div>
                          </div>
                          <Badge className="rounded-full bg-lime-300/20 px-3 py-1 text-lime-100">
                            {item.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4 w-full rounded-full bg-lime-300 px-4 py-3 text-[#153115] hover:bg-lime-200">
                      {t.reservePickup}
                    </Button>
                  </GlassCard>

                  <GlassCard className="p-5 md:p-6">
                    <SectionTitle icon={BookOpen} title={t.aiGuide} />
                    <div className="mt-4 space-y-3">
                      <Input
                        value={search}
                        onChange={(e: any) => setSearch(e.target.value)}
                        placeholder={t.askPlaceholder}
                        className="w-full rounded-2xl border border-white/10 bg-white/8 p-3 text-white placeholder:text-emerald-100/50"
                      />
                      <div className="rounded-3xl bg-white/6 p-4 text-sm leading-7 text-emerald-50/85">
                        Suggested topics: planting times, food safety basics,
                        volunteer check-in, diabetes-friendly recipes, youth roles,
                        and event navigation.
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-5 md:p-6">
                    <SectionTitle icon={QrCode} title={t.checkIn} />
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-emerald-50/85">
                      <div className="rounded-3xl bg-white/6 p-4">
                        <div className="mb-2 font-medium">Visitor Arrival</div>
                        <div>QR scan, ticket validation, role tagging, and welcome flow.</div>
                      </div>
                      <div className="rounded-3xl bg-white/6 p-4">
                        <div className="mb-2 font-medium">Volunteer Routing</div>
                        <div>Assign roles, handwashing stations, support zones, and safety reminders.</div>
                      </div>
                    </div>
                    <Button className="mt-4 w-full rounded-full bg-white/10 px-4 py-3 text-white hover:bg-white/20">
                      {t.scanIn}
                    </Button>
                  </GlassCard>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <GlassCard className="p-5 md:p-6">
                  <SectionTitle icon={Users} title={t.workforce} />
                  <div className="mt-4 space-y-3 text-sm text-emerald-50/85">
                    {youthTasks.map((task) => (
                      <div
                        key={task}
                        className="flex items-start gap-2 rounded-2xl bg-white/6 p-3"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 text-lime-300" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 md:p-6">
                  <SectionTitle icon={HeartPulse} title={t.wellness} />
                  <div className="mt-4 space-y-3 text-sm text-emerald-50/85">
                    <div className="rounded-2xl bg-white/6 p-3">
                      Blood pressure and BMI screenings
                    </div>
                    <div className="rounded-2xl bg-white/6 p-3">
                      Healthy food vs. processed food education
                    </div>
                    <div className="rounded-2xl bg-white/6 p-3">
                      Type II diabetes support and nutrition strategies
                    </div>
                    <div className="rounded-2xl bg-white/6 p-3">
                      Movement, family wellness, and healthier-at-home learning
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 md:p-6">
                  <SectionTitle
                    icon={ClipboardList}
                    title={role === "supervisor" ? "Supervisor Snapshot" : t.produceOps}
                  />
                  <div className="mt-4 space-y-3 text-sm text-emerald-50/85">
                    {(role === "supervisor"
                      ? supervisorNotes
                      : [
                          { name: "Wash/Sort Queue", value: "Open" },
                          { name: "Reserved Orders", value: "14" },
                          { name: "Volunteer Stations", value: "6" },
                          { name: "Pickup Windows", value: "Active" },
                        ]
                    ).map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-2xl bg-white/6 p-3"
                      >
                        <span>{item.name}</span>
                        <Badge className="rounded-full bg-white/10 px-3 py-1 text-white">
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              <GlassCard className="p-5 md:p-6">
                <SectionTitle icon={Calendar} title={t.events} />
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {eventCards.map((event) => (
                    <Card
                      key={event.title}
                      className="rounded-[1.8rem] border border-white/10 bg-white/6 text-white shadow-none"
                    >
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <div className="space-y-2 text-sm text-emerald-50/85">
                          <div>{event.time}</div>
                          <div>{event.place}</div>
                          <div>{event.detail}</div>
                        </div>
                        <Button className="mt-4 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20">
                          {t.learnMore}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
