import React, { useMemo, useState } from "react";
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

function Btn({
  children,
  onClick,
  style = {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        color: "#fff",
        borderRadius: 999,
        padding: "10px 14px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 14,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function Card({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
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
    ecosystem:
      "This demo shows how Bronson Family Farm, Farm & Family Alliance, Parker Farms, and the historic Lansdowne Airport site work together as one connected ecosystem.",
    multilingual: "Multilingual Access",
    liveNow: "Live Now",
    eventName: "Growers Supply Market",
    eventDate: "Saturday, May 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
    roleOverview: "Role Overview",
    todaysFocus: "Today's Focus",
    nextSteps: "Next Steps",
    farmWeather: "Youngstown Farm Weather",
    calendar: "Grower Calendar",
    alerts: "Alerts",
    marketplace: "Marketplace",
    aiGuide: "Farm & Family Guide",
    checkIn: "Check-In",
    reservePickup: "Reserve Pickup",
    scanIn: "Scan to Check In",
    workforce: "Workforce Pathways",
    wellness: "Wellness & Nutrition",
    produceOps: "Produce & Inventory",
    events: "Events",
    learnMore: "Learn More",
    askPlaceholder:
      "Ask about planting, volunteers, pickup, safety, recipes, or events…",
    welcomeLine:
      "A welcoming, visual, role-based farm platform built for community use.",
  },
  Spanish: {
    appTitle: "Bronson Family Farm",
    appSub: "Demostración del Ecosistema de Cultivo",
    enterDemo: "Entrar a la Demostración",
    returnHome: "Volver al Inicio",
    chooseExperience: "Elija una Experiencia",
    whyItMatters:
      "Agricultura, fuerza laboral, bienestar familiar e infraestructura comunitaria en un ecosistema vivo.",
    ecosystem:
      "Esta demostración muestra cómo Bronson Family Farm, Farm & Family Alliance, Parker Farms y el histórico sitio del aeropuerto Lansdowne trabajan juntos como un ecosistema conectado.",
    multilingual: "Acceso Multilingüe",
    liveNow: "En Vivo",
    eventName: "Growers Supply Market",
    eventDate: "Sábado, 16 de mayo · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "Modo Calma",
    standardMode: "Modo Estándar",
    roleOverview: "Resumen del Rol",
    todaysFocus: "Enfoque de Hoy",
    nextSteps: "Próximos Pasos",
    farmWeather: "Clima de la Granja",
    calendar: "Calendario",
    alerts: "Alertas",
    marketplace: "Mercado",
    aiGuide: "Guía de Farm & Family",
    checkIn: "Registro",
    reservePickup: "Reservar Recogida",
    scanIn: "Escanear para Ingresar",
    workforce: "Trayectorias Laborales",
    wellness: "Bienestar y Nutrición",
    produceOps: "Producción e Inventario",
    events: "Eventos",
    learnMore: "Más Información",
    askPlaceholder:
      "Pregunte sobre siembra, voluntarios, recogida, seguridad, recetas o eventos…",
    welcomeLine:
      "Una plataforma agrícola acogedora, visual y basada en roles para la comunidad.",
  },
  Tagalog: {
    appTitle: "Bronson Family Farm",
    appSub: "Demo ng Grower Ecosystem",
    enterDemo: "Buksan ang Demo",
    returnHome: "Bumalik",
    chooseExperience: "Pumili ng Karanasan",
    whyItMatters:
      "Pagsasaka, kabuhayan, kalusugan ng pamilya, at imprastraktura ng komunidad sa iisang buhay na ecosystem.",
    ecosystem:
      "Ipinapakita ng demo na ito kung paano nagtutulungan ang Bronson Family Farm, Farm & Family Alliance, Parker Farms, at ang makasaysayang Lansdowne Airport site bilang isang konektadong ecosystem.",
    multilingual: "Maraming Wika",
    liveNow: "Live Now",
    eventName: "Growers Supply Market",
    eventDate: "Sabado, Mayo 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
    roleOverview: "Buod ng Role",
    todaysFocus: "Pokús Ngayon",
    nextSteps: "Mga Susunod na Hakbang",
    farmWeather: "Panahon sa Bukid",
    calendar: "Kalendaryo",
    alerts: "Mga Alerto",
    marketplace: "Pamilihan",
    aiGuide: "Farm & Family Guide",
    checkIn: "Check-In",
    reservePickup: "Magpareserba ng Pickup",
    scanIn: "I-scan para Mag-check In",
    workforce: "Landas sa Trabaho",
    wellness: "Kalusugan at Nutrisyon",
    produceOps: "Ani at Imbentaryo",
    events: "Mga Kaganapan",
    learnMore: "Alamin Pa",
    askPlaceholder:
      "Magtanong tungkol sa pagtatanim, volunteers, pickup, safety, recipes, o events…",
    welcomeLine:
      "Isang magiliw, biswal, at role-based na farm platform para sa komunidad.",
  },
  Patwa: {
    appTitle: "Bronson Family Farm",
    appSub: "Growa Ecosystem Demo",
    enterDemo: "Go Ina Di Demo",
    returnHome: "Back A Start",
    chooseExperience: "Pick Yuh Experience",
    whyItMatters:
      "Farmin, work pathway, family wellness, an community build-up all inna one live ecosystem.",
    ecosystem:
      "Dis demo show how Bronson Family Farm, Farm & Family Alliance, Parker Farms, an di historic Lansdowne Airport site a work together as one connected ecosystem.",
    multilingual: "Plenty Language",
    liveNow: "Live Now",
    eventName: "Growers Supply Market",
    eventDate: "Saturday, May 16 · 9:00 AM–2:00 PM",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "Calm Mode",
    standardMode: "Standard Mode",
    roleOverview: "Role Overview",
    todaysFocus: "Today Focus",
    nextSteps: "Wha Next",
    farmWeather: "Youngstown Farm Weather",
    calendar: "Calendar",
    alerts: "Alerts",
    marketplace: "Market",
    aiGuide: "Farm & Family Guide",
    checkIn: "Check-In",
    reservePickup: "Reserve Pickup",
    scanIn: "Scan Fi Check In",
    workforce: "Work Pathway",
    wellness: "Wellness & Food",
    produceOps: "Produce Ops",
    events: "Events",
    learnMore: "Learn More",
    askPlaceholder:
      "Ask bout planting, volunteer, pickup, safety, recipe, or event…",
    welcomeLine:
      "A warm, visual, role-based farm platform fi di community.",
  },
  Italian: {
    appTitle: "Bronson Family Farm",
    appSub: "Demo dell'Ecosistema dei Coltivatori",
    enterDemo: "Entra nella Demo",
    returnHome: "Torna all'Inizio",
    chooseExperience: "Scegli un'Esperienza",
    whyItMatters:
      "Agricoltura, lavoro, benessere familiare e infrastruttura comunitaria in un unico ecosistema vivo.",
    ecosystem:
      "Questa demo mostra come Bronson Family Farm, Farm & Family Alliance, Parker Farms e lo storico sito dell'aeroporto Lansdowne lavorino insieme come un ecosistema connesso.",
    multilingual: "Accesso Multilingue",
    liveNow: "In Diretta",
    eventName: "Growers Supply Market",
    eventDate: "Sabato 16 maggio · 9:00–14:00",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "Modalità Calma",
    standardMode: "Modalità Standard",
    roleOverview: "Panoramica del Ruolo",
    todaysFocus: "Focus di Oggi",
    nextSteps: "Passi Successivi",
    farmWeather: "Meteo della Fattoria",
    calendar: "Calendario",
    alerts: "Avvisi",
    marketplace: "Mercato",
    aiGuide: "Guida Farm & Family",
    checkIn: "Check-In",
    reservePickup: "Prenota Ritiro",
    scanIn: "Scansiona per Entrare",
    workforce: "Percorsi di Lavoro",
    wellness: "Benessere e Nutrizione",
    produceOps: "Prodotti e Inventario",
    events: "Eventi",
    learnMore: "Scopri di Più",
    askPlaceholder:
      "Chiedi informazioni su semina, volontari, ritiro, sicurezza, ricette o eventi…",
    welcomeLine:
      "Una piattaforma agricola accogliente, visiva e basata sui ruoli per la comunità.",
  },
  Hebrew: {
    appTitle: "Bronson Family Farm",
    appSub: "הדגמת מערכת המגדלים",
    enterDemo: "כניסה להדגמה",
    returnHome: "חזרה להתחלה",
    chooseExperience: "בחרו חוויה",
    whyItMatters:
      "חקלאות, תעסוקה, רווחת המשפחה ותשתית קהילתית במערכת חיה אחת.",
    ecosystem:
      "הדגמה זו מראה כיצד Bronson Family Farm, Farm & Family Alliance, Parker Farms ואתר שדה התעופה ההיסטורי Lansdowne פועלים יחד כמערכת אקולוגית מחוברת אחת.",
    multilingual: "גישה רב-לשונית",
    liveNow: "בשידור חי",
    eventName: "Growers Supply Market",
    eventDate: "שבת, 16 במאי · 9:00–14:00",
    eventPlace: "Bronson Family Farm · Youngstown, Ohio",
    calmMode: "מצב רגוע",
    standardMode: "מצב רגיל",
    roleOverview: "סקירת תפקיד",
    todaysFocus: "המיקוד להיום",
    nextSteps: "הצעדים הבאים",
    farmWeather: "מזג האוויר בחווה",
    calendar: "לוח שנה",
    alerts: "התראות",
    marketplace: "שוק",
    aiGuide: "מדריך Farm & Family",
    checkIn: "צ'ק-אין",
    reservePickup: "שריינו איסוף",
    scanIn: "סרקו לצ'ק-אין",
    workforce: "מסלולי תעסוקה",
    wellness: "בריאות ותזונה",
    produceOps: "תוצרת ומלאי",
    events: "אירועים",
    learnMore: "למידע נוסף",
    askPlaceholder:
      "שאלו על שתילה, מתנדבים, איסוף, בטיחות, מתכונים או אירועים…",
    welcomeLine:
      "פלטפורמת חווה ידידותית, חזותית ומבוססת תפקידים עבור הקהילה.",
  },
};

const roleCards = [
  {
    id: "guest",
    icon: Globe2,
    image: "/GrowArea.jpg",
    title: "Guest Experience",
    subtitle: "See the land, the mission, the market, and the learning pathways.",
  },
  {
    id: "customer",
    icon: ShoppingBasket,
    image: "/GrowArea2.jpg",
    title: "Customer Experience",
    subtitle: "Reserve produce, browse wellness education, and prepare for pickup.",
  },
  {
    id: "grower",
    icon: Sprout,
    image: "/GrowArea.jpg",
    title: "Grower Experience",
    subtitle: "Plan crops, watch tasks, check weather, and coordinate harvest.",
  },
  {
    id: "supervisor",
    icon: ShieldCheck,
    image: "/GrowArea2.jpg",
    title: "Supervisor Experience",
    subtitle: "Track youth progress, assignments, safety, and life-skill growth.",
  },
  {
    id: "youth",
    icon: GraduationCap,
    image: "/GrowArea.jpg",
    title: "Youth Workforce",
    subtitle: "Build confidence, responsibility, employability, and real-world skills.",
  },
  {
    id: "admin",
    icon: ClipboardList,
    image: "/GrowArea2.jpg",
    title: "Operations Experience",
    subtitle: "Coordinate events, check-in, produce flow, staffing, and community engagement.",
  },
];

const weatherCards = [
  { day: "Thu", temp: "62°", note: "Transplant prep" },
  { day: "Fri", temp: "66°", note: "Watering window" },
  { day: "Sat", temp: "69°", note: "Event-friendly" },
  { day: "Sun", temp: "64°", note: "Mulch and check beds" },
];

const calendarItems = [
  { time: "8:00 AM", task: "Youth orientation and safety check", zone: "Welcome Tent" },
  { time: "9:30 AM", task: "Seedling care and irrigation review", zone: "Grow Area" },
  { time: "11:00 AM", task: "Nutrition and diabetes-friendly food talk", zone: "Learning Station" },
  { time: "1:00 PM", task: "Inventory sorting and pickup prep", zone: "Produce Command" },
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

function sectionTitle(icon: React.ReactNode, title: string) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div
        style={{
          background: "rgba(255,255,255,0.12)",
          borderRadius: 14,
          padding: 8,
          display: "flex",
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<keyof typeof languages>("English");
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("guest");
  const [calmMode, setCalmMode] = useState(false);

  const t = languages[lang];
  const currentRole = useMemo(
    () => roleCards.find((r) => r.id === role) ?? roleCards[0],
    [role]
  );

  const bg = currentRole.image;
  const pageBg = calmMode
    ? "linear-gradient(rgba(10,24,14,0.78), rgba(10,24,14,0.78)), "
    : "linear-gradient(rgba(10,24,14,0.58), rgba(10,24,14,0.58)), ";

  const roleFocus: Record<string, string> = {
    guest: "Explore the farm, event flow, and community mission.",
    customer: "Reserve seedlings, pickup times, and healthy food guidance.",
    grower: "Track beds, tasks, weather, and crop readiness.",
    supervisor: "Monitor youth teams, safety, and progress.",
    youth: "Learn, work, grow confidence, and build your pathway.",
    admin: "Coordinate inventory, events, check-in, and staffing.",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#fff",
        backgroundImage: `${pageBg}url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: 20 }}>
        <Card
          style={{
            marginBottom: 18,
            background: "rgba(0,0,0,0.24)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.10)",
              }}
            >
              <Trees size={28} color="#d9ff9e" />
            </div>
            <div>
              <div style={{ fontSize: 34, fontWeight: 800 }}>{t.appTitle}</div>
              <div style={{ fontSize: 18, opacity: 0.9 }}>{t.appSub}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.keys(languages).map((label) => (
              <Btn
                key={label}
                onClick={() => setLang(label as keyof typeof languages)}
                style={
                  lang === label
                    ? { background: "#d7ff73", color: "#173116", fontWeight: 700 }
                    : {}
                }
              >
                <Globe2 size={16} />
                {label}
              </Btn>
            ))}
            <Btn onClick={() => setCalmMode((v) => !v)}>
              {calmMode ? <Sun size={16} /> : <MoonStar size={16} />}
              {calmMode ? t.standardMode : t.calmMode}
            </Btn>
          </div>
        </Card>

        {!started ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.3fr) minmax(320px, 0.7fr)",
              gap: 20,
            }}
          >
            <Card style={{ minHeight: 620, background: "rgba(0,0,0,0.22)" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(215,255,115,0.18)",
                  color: "#e7ffc5",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                {t.liveNow}
              </div>

              <div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.05, marginBottom: 18 }}>
                {t.welcomeLine}
              </div>

              <div style={{ fontSize: 24, lineHeight: 1.45, opacity: 0.95, marginBottom: 14 }}>
                {t.ecosystem}
              </div>

              <div style={{ fontSize: 19, lineHeight: 1.55, opacity: 0.9, marginBottom: 24 }}>
                {t.whyItMatters}
              </div>

              <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                <Card>
                  <strong>Bronson Family Farm</strong> operates as a regenerative,
                  off-grid agritourism and food system hub on the historic
                  Lansdowne Airport grounds in Youngstown, Ohio.
                </Card>
                <Card>
                  <strong>Farm &amp; Family Alliance</strong> serves as the nonprofit
                  partner, focused on workforce training, youth development,
                  volunteer coordination, education, and community impact.
                </Card>
                <Card>
                  <strong>Parker Farms</strong> represents a regional growing partner
                  and marketplace model, supporting distribution, SNAP access, and
                  grower collaboration across the Mahoning Valley.
                </Card>
                <Card>
                  <strong>Lansdowne Airport (Historic Site)</strong> provides the land
                  foundation for this work. Once an active aviation site, it is now
                  being reimagined as a place where land, food, learning, and
                  community reconnect.
                </Card>
                <Card>
                  Together, these partners form a <strong>Grower Ecosystem</strong> —
                  where individuals can enter as guests, become customers, learn as
                  growers, develop through workforce pathways, and contribute to a
                  sustainable local economy.
                </Card>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Btn
                  onClick={() => setStarted(true)}
                  style={{
                    background: "#d7ff73",
                    color: "#173116",
                    fontWeight: 800,
                    padding: "14px 20px",
                  }}
                >
                  {t.enterDemo}
                  <ArrowRight size={18} />
                </Btn>
                <Btn style={{ padding: "14px 20px" }}>
                  <MapPin size={18} />
                  {t.eventPlace}
                </Btn>
              </div>
            </Card>

            <div style={{ display: "grid", gap: 20 }}>
              <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                {sectionTitle(<Calendar size={20} color="#fff" />, t.eventName)}
                <div style={{ display: "grid", gap: 10 }}>
                  <Card>{t.eventDate}</Card>
                  <Card>{t.eventPlace}</Card>
                  <Card>
                    Tools, growers, produce, wellness, workshops, workforce
                    pathways, and community check-in.
                  </Card>
                </div>
              </Card>

              <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                {sectionTitle(<Globe2 size={20} color="#fff" />, t.multilingual)}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                  }}
                >
                  {Object.keys(languages).map((name) => (
                    <Card key={name}>{name}</Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 20 }}>
            <Card
              style={{
                background: "rgba(0,0,0,0.22)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    opacity: 0.75,
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {t.chooseExperience}
                </div>
                <div style={{ fontSize: 34, fontWeight: 800 }}>{currentRole.title}</div>
                <div style={{ opacity: 0.9, fontSize: 18 }}>{currentRole.subtitle}</div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn onClick={() => setStarted(false)}>{t.returnHome}</Btn>
                <Btn
                  style={{ background: "#d7ff73", color: "#173116", fontWeight: 800 }}
                >
                  {t.scanIn}
                  <ScanLine size={16} />
                </Btn>
              </div>
            </Card>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(180px, 1fr))",
                gap: 14,
              }}
            >
              {roleCards.map((card) => {
                const Icon = card.icon;
                const active = role === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setRole(card.id)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 24,
                      overflow: "hidden",
                      minHeight: 220,
                      border: active
                        ? "2px solid rgba(215,255,115,0.85)"
                        : "1px solid rgba(255,255,255,0.14)",
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.58)), url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: 16,
                      boxShadow: active ? "0 0 0 3px rgba(215,255,115,0.18)" : undefined,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 14,
                        background: "rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 30,
                      }}
                    >
                      <Icon size={20} color="#fff" />
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.94 }}>
                      {card.subtitle}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1.1fr) minmax(360px,0.9fr)",
                gap: 20,
              }}
            >
              <div style={{ display: "grid", gap: 20 }}>
                <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                  {sectionTitle(
                    React.createElement(currentRole.icon, { size: 20, color: "#fff" }),
                    t.roleOverview
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Card>
                      <div style={{ opacity: 0.7, marginBottom: 8 }}>{t.todaysFocus}</div>
                      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                        {roleFocus[role]}
                      </div>
                      <div style={{ opacity: 0.9, lineHeight: 1.6 }}>
                        This experience is designed to feel useful, welcoming, and
                        alive.
                      </div>
                    </Card>
                    <Card>
                      <div style={{ opacity: 0.7, marginBottom: 8 }}>{t.nextSteps}</div>
                      <div style={{ display: "grid", gap: 10 }}>
                        {[
                          "Role-specific dashboards",
                          "Calendar-aware scheduling",
                          "QR check-in and engagement",
                          "Education, wellness, and produce operations",
                        ].map((x) => (
                          <div key={x} style={{ display: "flex", gap: 8, alignItems: "start" }}>
                            <CheckCircle2 size={16} color="#d7ff73" style={{ marginTop: 3 }} />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </Card>

                <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                  {sectionTitle(<CloudSun size={20} color="#fff" />, t.farmWeather)}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                    }}
                  >
                    {weatherCards.map((item) => (
                      <Card key={item.day}>
                        <div style={{ opacity: 0.75 }}>{item.day}</div>
                        <div style={{ fontSize: 38, fontWeight: 900 }}>{item.temp}</div>
                        <div style={{ opacity: 0.9 }}>{item.note}</div>
                      </Card>
                    ))}
                  </div>
                </Card>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                    {sectionTitle(<Calendar size={20} color="#fff" />, t.calendar)}
                    <div style={{ display: "grid", gap: 12 }}>
                      {calendarItems.map((item) => (
                        <Card key={item.time + item.task}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <div>
                              <div style={{ opacity: 0.7 }}>{item.time}</div>
                              <div style={{ fontWeight: 700, marginTop: 4 }}>{item.task}</div>
                            </div>
                            <div
                              style={{
                                background: "rgba(255,255,255,0.10)",
                                borderRadius: 999,
                                padding: "6px 10px",
                                height: "fit-content",
                              }}
                            >
                              {item.zone}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>

                  <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                    {sectionTitle(<Bell size={20} color="#fff" />, t.alerts)}
                    <div style={{ display: "grid", gap: 12 }}>
                      {[
                        "Rain buffer available for outdoor learning rotation.",
                        "Inventory reservation active for seedlings and Bubble Babies.",
                        "Check-in flow ready for role-based arrival and volunteer routing.",
                        "Wellness programming can be paired with nutrition education and movement activities.",
                      ].map((x) => (
                        <Card key={x}>{x}</Card>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>

              <div style={{ display: "grid", gap: 20 }}>
                <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                  {sectionTitle(<ShoppingBasket size={20} color="#fff" />, t.marketplace)}
                  <div style={{ display: "grid", gap: 12 }}>
                    {produceCards.map((item) => (
                      <Card key={item.name}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.name}</div>
                            <div style={{ opacity: 0.75, marginTop: 4 }}>{item.note}</div>
                          </div>
                          <div
                            style={{
                              background: "rgba(215,255,115,0.18)",
                              color: "#e7ffc5",
                              borderRadius: 999,
                              padding: "6px 10px",
                              height: "fit-content",
                              fontWeight: 800,
                            }}
                          >
                            {item.count}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <Btn
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        background: "#d7ff73",
                        color: "#173116",
                        fontWeight: 800,
                      }}
                    >
                      {t.reservePickup}
                    </Btn>
                  </div>
                </Card>

                <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                  {sectionTitle(<BookOpen size={20} color="#fff" />, t.aiGuide)}
                  <input
                    placeholder={t.askPlaceholder}
                    style={{
                      width: "100%",
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(255,255,255,0.08)",
                      color: "#fff",
                      padding: 14,
                      fontSize: 15,
                      outline: "none",
                      marginBottom: 12,
                    }}
                  />
                  <Card>
                    Suggested topics: planting times, food safety basics, volunteer
                    check-in, diabetes-friendly recipes, youth roles, and event
                    navigation.
                  </Card>
                </Card>

                <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                  {sectionTitle(<QrCode size={20} color="#fff" />, t.checkIn)}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Card>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Visitor Arrival</div>
                      QR scan, ticket validation, role tagging, and welcome flow.
                    </Card>
                    <Card>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Volunteer Routing</div>
                      Assign roles, handwashing stations, support zones, and safety reminders.
                    </Card>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <Btn style={{ width: "100%", justifyContent: "center" }}>
                      {t.scanIn}
                    </Btn>
                  </div>
                </Card>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
              <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                {sectionTitle(<Users size={20} color="#fff" />, t.workforce)}
                <div style={{ display: "grid", gap: 10 }}>
                  {youthTasks.map((task) => (
                    <Card key={task} style={{ display: "flex", gap: 8, alignItems: "start" }}>
                      <ChevronRight size={16} color="#d7ff73" style={{ marginTop: 2 }} />
                      <span>{task}</span>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                {sectionTitle(<HeartPulse size={20} color="#fff" />, t.wellness)}
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    "Blood pressure and BMI screenings",
                    "Healthy food vs. processed food education",
                    "Type II diabetes support and nutrition strategies",
                    "Movement, family wellness, and healthier-at-home learning",
                  ].map((x) => (
                    <Card key={x}>{x}</Card>
                  ))}
                </div>
              </Card>

              <Card style={{ background: "rgba(0,0,0,0.22)" }}>
                {sectionTitle(<ClipboardList size={20} color="#fff" />, t.produceOps)}
                <div style={{ display: "grid", gap: 10 }}>
                  {(role === "supervisor"
                    ? supervisorNotes
                    : [
                        { name: "Wash/Sort Queue", value: "Open" },
                        { name: "Reserved Orders", value: "14" },
                        { name: "Volunteer Stations", value: "6" },
                        { name: "Pickup Windows", value: "Active" },
                      ]
                  ).map((item) => (
                    <Card key={item.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <span>{item.name}</span>
                        <strong>{item.value}</strong>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
