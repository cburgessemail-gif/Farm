import React, { useEffect, useMemo, useState } from "react";

type Section = "dashboard" | "grow" | "calendar" | "shop" | "story" | "community";
type Lang = "EN" | "ES" | "TL" | "IT" | "HE" | "PATWA";

const BRAND = {
  bg: "#dfe7de",
  panel: "#eef3ee",
  card: "#ffffff",
  ink: "#173a28",
  muted: "#4d6a59",
  line: "#c5d0c5",
  accent: "#2f7a3f",
  accentSoft: "#6caf77",
  gold: "#d6b85c",
};

const imageMap: Record<Section, string> = {
  dashboard: "/GrowArea.jpg",
  grow: "/GrowArea2.jpg",
  calendar: "/Calendar.jpg",
  shop: "/Food.jpg",
  story: "/Story.jpg",
  community: "/Community.jpg",
};

const translations = {
  EN: {
    farmName: "Bronson Farm",
    dashboard: "Dashboard",
    grow: "Grow",
    calendar: "Calendar",
    shop: "Shop",
    story: "Story",
    community: "Community",
    liveEcosystem: "Live Ecosystem",
    liveSub:
      "This is a working system connecting growing, scheduling, market readiness, and community support.",
    systemNow: "System Now",
    connectedFlow: "Connected Flow",
    openStore: "Open Live Store",
    volunteers: "Volunteers",
    partners: "Partners",
    legacyPlace: "Legacy + Place",
    guestView: "Guest View",
    updated: "Updated",
    phases: "Season Phases",
    growerSystem: "Grower System",
    growerSub:
      "Production, irrigation, crop flow, and next actions presented as a live operating view.",
    productionStatus: "Production Status",
    nextActions: "Next Actions",
    farmCalendar: "Farm Calendar",
    calendarSub:
      "Timing drives readiness. This view shows the daily rhythm behind field work, packing, and market movement.",
    dailySchedule: "Daily Schedule",
    marketplace: "Marketplace",
    marketSub:
      "Production connects to market access. This view shows readiness, inventory posture, and a direct path to the live store.",
    marketReadiness: "Market Readiness",
    storeAccess: "Store Access",
    ourStory: "Our Story",
    storySub:
      "Bronson Family Farm is more than a farm. It is legacy, land, renewal, and the future growing from one place.",
    communityTitle: "Community",
    communitySub:
      "Volunteers, families, growers, and partners help turn the farm into a regional ecosystem for growing and belonging.",
    languages: "Languages",
    demoNavigation: "Demo Navigation",
    liveDemo: "Live Demo",
    liveDemoCopy:
      "Stable build with visible languages, section identity, live status feel, and store access.",
    whyMatters: "Why this matters",
    whyMattersCopy:
      "Funders can see that this is not only a story. It already points to a live market pathway tied to real farm activity.",
    scheduleTime: "Time",
    scheduleTask: "Task",
    scheduleOwner: "Owner",
  },
  ES: {
    farmName: "Granja Bronson",
    dashboard: "Panel",
    grow: "Cultivar",
    calendar: "Calendario",
    shop: "Tienda",
    story: "Historia",
    community: "Comunidad",
    liveEcosystem: "Ecosistema en Vivo",
    liveSub:
      "Este es un sistema activo que conecta cultivo, programación, preparación de mercado y apoyo comunitario.",
    systemNow: "Sistema Ahora",
    connectedFlow: "Flujo Conectado",
    openStore: "Abrir Tienda",
    volunteers: "Voluntarios",
    partners: "Socios",
    legacyPlace: "Legado + Lugar",
    guestView: "Vista Pública",
    updated: "Actualizado",
    phases: "Fases de Temporada",
    growerSystem: "Sistema de Cultivo",
    growerSub:
      "Producción, riego, flujo de cultivo y próximas acciones presentadas como una vista operativa en vivo.",
    productionStatus: "Estado de Producción",
    nextActions: "Próximas Acciones",
    farmCalendar: "Calendario de la Granja",
    calendarSub:
      "El tiempo impulsa la preparación. Esta vista muestra el ritmo diario detrás del trabajo de campo, empaque y mercado.",
    dailySchedule: "Horario Diario",
    marketplace: "Mercado",
    marketSub:
      "La producción se conecta con el acceso al mercado. Esta vista muestra preparación, postura de inventario y un camino directo a la tienda en vivo.",
    marketReadiness: "Preparación del Mercado",
    storeAccess: "Acceso a la Tienda",
    ourStory: "Nuestra Historia",
    storySub:
      "Bronson Family Farm es más que una granja. Es legado, tierra, renovación y el futuro creciendo desde un lugar.",
    communityTitle: "Comunidad",
    communitySub:
      "Voluntarios, familias, cultivadores y socios ayudan a convertir la granja en un ecosistema regional para crecer y pertenecer.",
    languages: "Idiomas",
    demoNavigation: "Navegación",
    liveDemo: "Demo en Vivo",
    liveDemoCopy:
      "Versión estable con idiomas visibles, identidad por sección, sensación en vivo y acceso a la tienda.",
    whyMatters: "Por qué importa",
    whyMattersCopy:
      "Los financiadores pueden ver que esto no es solo una historia. Ya apunta a una vía real de mercado ligada a la actividad de la granja.",
    scheduleTime: "Hora",
    scheduleTask: "Tarea",
    scheduleOwner: "Responsable",
  },
  TL: {
    farmName: "Bronson Farm",
    dashboard: "Dashboard",
    grow: "Tanim",
    calendar: "Kalendaryo",
    shop: "Tindahan",
    story: "Kuwento",
    community: "Komunidad",
    liveEcosystem: "Buhay na Ecosystem",
    liveSub:
      "Ito ay gumaganang sistema na nagdurugtong ng pagtatanim, iskedyul, kahandaan sa pamilihan, at suporta ng komunidad.",
    systemNow: "Sistema Ngayon",
    connectedFlow: "Magkaugnay na Daloy",
    openStore: "Buksan ang Tindahan",
    volunteers: "Mga Volunteer",
    partners: "Mga Kasosyo",
    legacyPlace: "Pamana + Lugar",
    guestView: "Pampublikong Tanaw",
    updated: "Na-update",
    phases: "Yugto ng Panahon",
    growerSystem: "Sistema ng Grower",
    growerSub:
      "Produksiyon, irigasyon, daloy ng pananim, at susunod na gawain na ipinapakita bilang live na operating view.",
    productionStatus: "Katayuan ng Produksiyon",
    nextActions: "Susunod na Gawain",
    farmCalendar: "Kalendaryo ng Bukid",
    calendarSub:
      "Ang tamang oras ang nagtutulak ng kahandaan. Ipinapakita nito ang araw-araw na daloy ng gawain sa bukid, pag-iimpake, at pamilihan.",
    dailySchedule: "Araw-araw na Iskedyul",
    marketplace: "Pamilihan",
    marketSub:
      "Ang produksyon ay konektado sa market access. Ipinapakita rito ang kahandaan, inventory posture, at direktang daan sa live store.",
    marketReadiness: "Kahandaan sa Pamilihan",
    storeAccess: "Access sa Tindahan",
    ourStory: "Ating Kuwento",
    storySub:
      "Ang Bronson Family Farm ay higit pa sa bukid. Ito ay pamana, lupa, pagbabago, at kinabukasang tumutubo mula sa isang lugar.",
    communityTitle: "Komunidad",
    communitySub:
      "Ang mga volunteer, pamilya, grower, at partner ay tumutulong gawing rehiyonal na ecosystem ang bukid para sa paglago at paglahok.",
    languages: "Mga Wika",
    demoNavigation: "Nabigasyon",
    liveDemo: "Live Demo",
    liveDemoCopy:
      "Matatag na build na may nakikitang mga wika, pagkakakilanlan ng bawat seksyon, live na pakiramdam, at access sa tindahan.",
    whyMatters: "Bakit Mahalaga",
    whyMattersCopy:
      "Makikita ng mga funder na hindi lang ito kuwento. Nakaugnay na ito sa totoong market pathway mula sa aktibidad ng bukid.",
    scheduleTime: "Oras",
    scheduleTask: "Gawain",
    scheduleOwner: "May Gawa",
  },
  IT: {
    farmName: "Fattoria Bronson",
    dashboard: "Pannello",
    grow: "Coltiva",
    calendar: "Calendario",
    shop: "Negozio",
    story: "Storia",
    community: "Comunità",
    liveEcosystem: "Ecosistema Vivo",
    liveSub:
      "Questo è un sistema attivo che collega coltivazione, calendario, prontezza al mercato e supporto della comunità.",
    systemNow: "Sistema Ora",
    connectedFlow: "Flusso Connesso",
    openStore: "Apri Negozio",
    volunteers: "Volontari",
    partners: "Partner",
    legacyPlace: "Eredità + Luogo",
    guestView: "Vista Ospite",
    updated: "Aggiornato",
    phases: "Fasi della Stagione",
    growerSystem: "Sistema di Coltivazione",
    growerSub:
      "Produzione, irrigazione, flusso delle colture e prossime azioni presentati come una vista operativa dal vivo.",
    productionStatus: "Stato della Produzione",
    nextActions: "Prossime Azioni",
    farmCalendar: "Calendario della Fattoria",
    calendarSub:
      "Il tempo guida la preparazione. Questa vista mostra il ritmo quotidiano dietro il lavoro nei campi, l'imballaggio e il mercato.",
    dailySchedule: "Programma Giornaliero",
    marketplace: "Mercato",
    marketSub:
      "La produzione si collega all'accesso al mercato. Questa vista mostra prontezza, stato dell'inventario e un percorso diretto verso il negozio live.",
    marketReadiness: "Prontezza del Mercato",
    storeAccess: "Accesso al Negozio",
    ourStory: "La Nostra Storia",
    storySub:
      "Bronson Family Farm è più di una fattoria. È eredità, terra, rinnovamento e futuro che cresce da un unico luogo.",
    communityTitle: "Comunità",
    communitySub:
      "Volontari, famiglie, coltivatori e partner aiutano a trasformare la fattoria in un ecosistema regionale di crescita e appartenenza.",
    languages: "Lingue",
    demoNavigation: "Navigazione Demo",
    liveDemo: "Demo Live",
    liveDemoCopy:
      "Build stabile con lingue visibili, identità di sezione, sensazione di sistema vivo e accesso al negozio.",
    whyMatters: "Perché conta",
    whyMattersCopy:
      "I finanziatori possono vedere che questa non è solo una storia. Indica già un vero percorso di mercato collegato all'attività agricola.",
    scheduleTime: "Ora",
    scheduleTask: "Attività",
    scheduleOwner: "Responsabile",
  },
  HE: {
    farmName: "חוות ברונסון",
    dashboard: "לוח בקרה",
    grow: "גידול",
    calendar: "לוח שנה",
    shop: "חנות",
    story: "סיפור",
    community: "קהילה",
    liveEcosystem: "מערכת חיה",
    liveSub:
      "זוהי מערכת פעילה המחברת בין גידול, תזמון, מוכנות לשוק ותמיכת קהילה.",
    systemNow: "המערכת כעת",
    connectedFlow: "זרימה מחוברת",
    openStore: "פתח חנות",
    volunteers: "מתנדבים",
    partners: "שותפים",
    legacyPlace: "מורשת + מקום",
    guestView: "תצוגת אורח",
    updated: "עודכן",
    phases: "שלבי העונה",
    growerSystem: "מערכת הגידול",
    growerSub:
      "ייצור, השקיה, זרימת גידולים והצעדים הבאים מוצגים כתצוגת תפעול חיה.",
    productionStatus: "סטטוס ייצור",
    nextActions: "הפעולות הבאות",
    farmCalendar: "לוח שנה לחווה",
    calendarSub:
      "התזמון מניע מוכנות. תצוגה זו מראה את הקצב היומי מאחורי עבודת השדה, האריזה והתנועה לשוק.",
    dailySchedule: "לוח זמנים יומי",
    marketplace: "שוק",
    marketSub:
      "הייצור מתחבר לגישה לשוק. תצוגה זו מראה מוכנות, מצב מלאי ודרך ישירה לחנות החיה.",
    marketReadiness: "מוכנות לשוק",
    storeAccess: "גישה לחנות",
    ourStory: "הסיפור שלנו",
    storySub:
      "Bronson Family Farm היא יותר מחווה. היא מורשת, אדמה, התחדשות ועתיד הצומח ממקום אחד.",
    communityTitle: "קהילה",
    communitySub:
      "מתנדבים, משפחות, מגדלים ושותפים מסייעים להפוך את החווה למערכת אזורית של צמיחה ושייכות.",
    languages: "שפות",
    demoNavigation: "ניווט הדגמה",
    liveDemo: "הדגמה חיה",
    liveDemoCopy:
      "גרסה יציבה עם שפות גלויות, זהות לכל אזור, תחושת מערכת חיה וגישה לחנות.",
    whyMatters: "למה זה חשוב",
    whyMattersCopy:
      "מממנים יכולים לראות שזו לא רק סיפור. כבר קיים מסלול שוק חי המחובר לפעילות החווה.",
    scheduleTime: "שעה",
    scheduleTask: "משימה",
    scheduleOwner: "אחראי",
  },
  PATWA: {
    farmName: "Bronson Farm",
    dashboard: "Main Board",
    grow: "Grow",
    calendar: "Calendar",
    shop: "Shop",
    story: "Story",
    community: "Community",
    liveEcosystem: "Live Ecosystem",
    liveSub:
      "Dis a real working system weh join growing, timing, market readiness, an community support.",
    systemNow: "System Now",
    connectedFlow: "Connected Flow",
    openStore: "Open Live Store",
    volunteers: "Volunteers",
    partners: "Partners",
    legacyPlace: "Legacy + Place",
    guestView: "Guest View",
    updated: "Updated",
    phases: "Season Phases",
    growerSystem: "Grower System",
    growerSub:
      "Production, irrigation, crop flow, an next actions show up like a live operating view.",
    productionStatus: "Production Status",
    nextActions: "Next Actions",
    farmCalendar: "Farm Calendar",
    calendarSub:
      "Timing drive readiness. Dis view show di daily rhythm behind field work, packing, an market movement.",
    dailySchedule: "Daily Schedule",
    marketplace: "Marketplace",
    marketSub:
      "Production connect to market access. Dis view show readiness, inventory stance, an straight path to di live store.",
    marketReadiness: "Market Readiness",
    storeAccess: "Store Access",
    ourStory: "Wi Story",
    storySub:
      "Bronson Family Farm more than a farm. It a legacy, land, renewal, an future growing from one place.",
    communityTitle: "Community",
    communitySub:
      "Volunteers, families, growers, an partners help turn di farm into a regional ecosystem fi grow an belong.",
    languages: "Languages",
    demoNavigation: "Demo Navigation",
    liveDemo: "Live Demo",
    liveDemoCopy:
      "Stable build wid visible languages, section identity, live system feel, an store access.",
    whyMatters: "Why dis matter",
    whyMattersCopy:
      "Funders can see seh dis no just story. It already point to a real market pathway tied to farm activity.",
    scheduleTime: "Time",
    scheduleTask: "Task",
    scheduleOwner: "Owner",
  },
} as const;

const cropData = [
  { name: "Collards", percent: 88, status: "Ready", color: BRAND.accent },
  { name: "Peppers", percent: 64, status: "Growing", color: BRAND.accentSoft },
  { name: "Tomatoes", percent: 72, status: "Transplanting", color: BRAND.gold },
  { name: "Cabbage", percent: 79, status: "Strong", color: BRAND.accent },
  { name: "Cilantro", percent: 57, status: "Steady", color: BRAND.accentSoft },
];

const timeline = [
  { time: "7:00 AM", task: "Water plants", owner: "Grow Team" },
  { time: "9:00 AM", task: "Harvest greens", owner: "Field Lead" },
  { time: "12:00 PM", task: "Prep market inventory", owner: "Packing Team" },
  { time: "4:00 PM", task: "Farmers market / pickup", owner: "Market Team" },
];

const readiness = [
  { label: "Bubble Babies", value: "Available", percent: 92 },
  { label: "Seedlings", value: "In season", percent: 81 },
  { label: "Fresh produce", value: "Market-based", percent: 74 },
  { label: "SNAP readiness", value: "Active flow", percent: 89 },
];

const seasonPhases = [
  { title: "Seed", copy: "Indoor starts, germination, planning, labeling." },
  { title: "Grow", copy: "Transplanting, watering, weed control, observation." },
  { title: "Harvest", copy: "Quality checks, packing, routing, market prep." },
  { title: "Community", copy: "Education, volunteers, families, partnerships." },
];

function useClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return now;
}

function SectionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "16px 18px",
        borderRadius: 16,
        border: active ? "1px solid transparent" : `1px solid ${BRAND.line}`,
        background: active ? BRAND.accent : BRAND.card,
        color: active ? "#fff" : BRAND.ink,
        fontSize: 16,
        fontWeight: 800,
        cursor: "pointer",
        transition: "all .2s ease",
        boxShadow: active ? "0 8px 20px rgba(47,122,63,0.18)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function LangButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 12px",
        borderRadius: 999,
        border: `1px solid ${active ? BRAND.accent : BRAND.line}`,
        background: active ? BRAND.accent : BRAND.card,
        color: active ? "#fff" : BRAND.ink,
        fontWeight: 800,
        fontSize: 12,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function Card({
  children,
  minHeight,
}: {
  children: React.ReactNode;
  minHeight?: number;
}) {
  return (
    <div
      style={{
        background: BRAND.card,
        border: `1px solid ${BRAND.line}`,
        borderRadius: 24,
        padding: 22,
        minHeight,
        boxShadow: "0 10px 30px rgba(23,58,40,0.05)",
      }}
    >
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card minHeight={132}>
      <div style={{ fontSize: 13, color: BRAND.muted, fontWeight: 700, marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontSize: 34, color: BRAND.ink, fontWeight: 900, lineHeight: 1.05 }}>
        {value}
      </div>
      {sub ? <div style={{ fontSize: 14, color: BRAND.muted, marginTop: 8 }}>{sub}</div> : null}
    </Card>
  );
}

function ProgressRow({
  name,
  percent,
  status,
  color,
}: {
  name: string;
  percent: number;
  status: string;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 800, color: BRAND.ink }}>{name}</div>
        <div style={{ fontSize: 13, color: BRAND.muted, fontWeight: 700 }}>
          {status} · {percent}%
        </div>
      </div>
      <div
        style={{
          height: 10,
          background: "#edf1ed",
          borderRadius: 999,
          overflow: "hidden",
          border: `1px solid ${BRAND.line}`,
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: 999,
            background: color,
            transition: "width .6s ease",
          }}
        />
      </div>
    </div>
  );
}

function Hero({
  title,
  subtitle,
  image,
  liveTime,
}: {
  title: string;
  subtitle: string;
  image: string;
  liveTime: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 28,
        overflow: "hidden",
        minHeight: 290,
        border: `1px solid ${BRAND.line}`,
        background:
          `linear-gradient(135deg, rgba(13,48,28,0.18), rgba(13,48,28,0.28)),` +
          `url("${image}") center/cover no-repeat,` +
          `linear-gradient(135deg, #a7c5a5 0%, #6d9d74 100%)`,
        boxShadow: "0 16px 40px rgba(23,58,40,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(12,31,18,0.68) 0%, rgba(12,31,18,0.34) 42%, rgba(12,31,18,0.14) 72%, rgba(12,31,18,0.08) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 290,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 13,
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                background: "#59d46b",
                borderRadius: 999,
                display: "inline-block",
                boxShadow: "0 0 0 6px rgba(89,212,107,0.18)",
              }}
            />
            LIVE SYSTEM
          </div>

          <div
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              backdropFilter: "blur(8px)",
            }}
          >
            {liveTime}
          </div>
        </div>

        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              color: "#fff",
              fontSize: "clamp(34px, 5vw, 62px)",
              fontWeight: 900,
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: 18,
              lineHeight: 1.5,
              marginTop: 14,
              maxWidth: 650,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<Section>("dashboard");
  const [lang, setLang] = useState<Lang>("EN");
  const now = useClock();
  const t = translations[lang];

  const liveTime = useMemo(
    () =>
      now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }),
    [now]
  );

  const formattedUpdate = useMemo(
    () =>
      now.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    [now]
  );

  const navItems: { key: Section; label: string }[] = [
    { key: "dashboard", label: t.dashboard },
    { key: "grow", label: t.grow },
    { key: "calendar", label: t.calendar },
    { key: "shop", label: t.shop },
    { key: "story", label: t.story },
    { key: "community", label: t.community },
  ];

  const shellStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: BRAND.bg,
    color: BRAND.ink,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const pageStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    minHeight: "100vh",
  };

  const sidebarStyle: React.CSSProperties = {
    padding: "28px 18px",
    borderRight: `1px solid ${BRAND.line}`,
    background: "rgba(255,255,255,0.18)",
    boxSizing: "border-box",
  };

  const mainStyle: React.CSSProperties = {
    padding: 20,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 900,
    color: BRAND.ink,
    letterSpacing: "-0.03em",
    margin: 0,
  };

  const grid3: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
  };

  const grid2: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  };

  const TopLanguageBar = () => (
    <div
      style={{
        background: BRAND.card,
        border: `1px solid ${BRAND.line}`,
        borderRadius: 22,
        padding: 16,
        marginBottom: 18,
        boxShadow: "0 10px 30px rgba(23,58,40,0.05)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 800,
          color: BRAND.muted,
          marginBottom: 10,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {t.languages}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {(["EN", "ES", "TL", "IT", "HE", "PATWA"] as Lang[]).map((code) => (
          <LangButton key={code} label={code} active={lang === code} onClick={() => setLang(code)} />
        ))}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      <Hero
        title={t.liveEcosystem}
        subtitle={t.liveSub}
        image={imageMap.dashboard}
        liveTime={liveTime}
      />

      <div style={{ height: 18 }} />

      <div style={grid3}>
        <Metric label={t.systemNow} value="ACTIVE" sub={`${t.updated} ${formattedUpdate}`} />
        <Metric label="Modules" value="6" sub="Grow · Calendar · Shop · Story · Community · Guest" />
        <Metric label="Store Link" value="LIVE" sub="Connected to Bronson Family Farm GrownBy shop" />
      </div>

      <div style={{ height: 18 }} />

      <div style={grid2}>
        <Card minHeight={290}>
          <div style={sectionTitleStyle}>{t.connectedFlow}</div>
          <div style={{ height: 14 }} />
          <div style={{ display: "grid", gap: 14 }}>
            {[
              { a: t.calendar, b: t.grow, copy: "Scheduling drives field activity and readiness." },
              { a: t.grow, b: t.shop, copy: "Production feeds inventory and market timing." },
              { a: t.community, b: t.grow, copy: "Volunteers and partners support farm activity." },
              { a: t.story, b: t.community, copy: "Legacy and place invite participation and trust." },
            ].map((row) => (
              <div
                key={`${row.a}-${row.b}`}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  background: BRAND.panel,
                  border: `1px solid ${BRAND.line}`,
                }}
              >
                <div style={{ fontWeight: 900, color: BRAND.ink, marginBottom: 6 }}>
                  {row.a} → {row.b}
                </div>
                <div style={{ color: BRAND.muted }}>{row.copy}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card minHeight={290}>
          <div style={sectionTitleStyle}>{t.phases}</div>
          <div style={{ height: 14 }} />
          <div style={{ display: "grid", gap: 12 }}>
            {seasonPhases.map((phase) => (
              <div
                key={phase.title}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: `1px solid ${BRAND.line}`,
                  background: BRAND.card,
                }}
              >
                <div style={{ fontWeight: 900, marginBottom: 6 }}>{phase.title}</div>
                <div style={{ color: BRAND.muted }}>{phase.copy}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ height: 18 }} />

      <div style={grid3}>
        {[
          { title: t.grow, body: "Crop flow, irrigation, status, and production rhythm." },
          { title: t.shop, body: "Market readiness, store access, SNAP-aligned commerce flow." },
          { title: t.calendar, body: "Daily actions, timing, events, and operational sequence." },
          { title: t.story, body: "Legacy, land, place, and the future growing from one farm." },
          { title: t.community, body: "Families, volunteers, growers, wellness, and partnerships." },
          { title: t.guestView, body: "A welcoming front door that helps visitors understand the vision." },
        ].map((item) => (
          <Card key={item.title} minHeight={170}>
            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 999,
                background: BRAND.accentSoft,
                marginBottom: 18,
              }}
            />
            <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 10 }}>{item.title}</div>
            <div style={{ color: BRAND.muted, lineHeight: 1.55 }}>{item.body}</div>
          </Card>
        ))}
      </div>
    </>
  );

  const renderGrow = () => (
    <>
      <Hero
        title={t.growerSystem}
        subtitle={t.growerSub}
        image={imageMap.grow}
        liveTime={liveTime}
      />
      <div style={{ height: 18 }} />
      <div style={grid2}>
        <Card minHeight={320}>
          <div style={sectionTitleStyle}>{t.productionStatus}</div>
          <div style={{ height: 16 }} />
          {cropData.map((crop) => (
            <ProgressRow key={crop.name} {...crop} />
          ))}
        </Card>
        <Card minHeight={320}>
          <div style={sectionTitleStyle}>{t.nextActions}</div>
          <div style={{ height: 16 }} />
          <div style={{ display: "grid", gap: 14 }}>
            {[
              "Watering cycle and moisture check",
              "Harvest prep for greens and herbs",
              "Market packaging and labeling",
              "Volunteer alignment and task assignment",
              "Observe fencing, access, and safety conditions",
            ].map((task, i) => (
              <div
                key={task}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 14,
                  borderRadius: 18,
                  background: BRAND.panel,
                  border: `1px solid ${BRAND.line}`,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: i < 3 ? BRAND.accent : BRAND.accentSoft,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    fontSize: 13,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ color: BRAND.ink, fontWeight: 700 }}>{task}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );

  const renderCalendar = () => (
    <>
      <Hero
        title={t.farmCalendar}
        subtitle={t.calendarSub}
        image={imageMap.calendar}
        liveTime={liveTime}
      />
      <div style={{ height: 18 }} />
      <Card>
        <div style={sectionTitleStyle}>{t.dailySchedule}</div>
        <div style={{ height: 14 }} />
        <div
          style={{
            overflow: "hidden",
            borderRadius: 18,
            border: `1px solid ${BRAND.line}`,
            background: BRAND.card,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 220px",
              background: BRAND.panel,
              fontWeight: 900,
              color: BRAND.ink,
            }}
          >
            <div style={{ padding: 14, borderRight: `1px solid ${BRAND.line}` }}>{t.scheduleTime}</div>
            <div style={{ padding: 14, borderRight: `1px solid ${BRAND.line}` }}>{t.scheduleTask}</div>
            <div style={{ padding: 14 }}>{t.scheduleOwner}</div>
          </div>

          {timeline.map((row) => (
            <div
              key={row.time}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 220px",
                borderTop: `1px solid ${BRAND.line}`,
              }}
            >
              <div style={{ padding: 14, borderRight: `1px solid ${BRAND.line}`, fontWeight: 800 }}>
                {row.time}
              </div>
              <div style={{ padding: 14, borderRight: `1px solid ${BRAND.line}` }}>{row.task}</div>
              <div style={{ padding: 14, color: BRAND.muted }}>{row.owner}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );

  const renderShop = () => (
    <>
      <Hero
        title={t.marketplace}
        subtitle={t.marketSub}
        image={imageMap.shop}
        liveTime={liveTime}
      />
      <div style={{ height: 18 }} />
      <div style={grid2}>
        <Card minHeight={320}>
          <div style={sectionTitleStyle}>{t.marketReadiness}</div>
          <div style={{ height: 16 }} />
          {readiness.map((item) => (
            <div key={item.label} style={{ marginBottom: 18 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <div style={{ fontWeight: 800 }}>{item.label}</div>
                <div style={{ color: BRAND.muted, fontWeight: 700 }}>
                  {item.value} · {item.percent}%
                </div>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: "#edf1ed",
                  border: `1px solid ${BRAND.line}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${item.percent}%`,
                    height: "100%",
                    background: BRAND.accent,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card minHeight={320}>
          <div style={sectionTitleStyle}>{t.storeAccess}</div>
          <div style={{ height: 16 }} />
          <div style={{ color: BRAND.muted, lineHeight: 1.65, marginBottom: 18 }}>
            Open the live Bronson Family Farm GrownBy store. This keeps the demo connected to a real commerce destination.
          </div>

          <a
            href="https://grownby.com/farms/bronson-family-farm/shop"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "16px 20px",
              background: BRAND.accent,
              color: "#fff",
              borderRadius: 16,
              textDecoration: "none",
              fontWeight: 900,
              boxShadow: "0 10px 22px rgba(47,122,63,0.2)",
            }}
          >
            {t.openStore.toUpperCase()}
          </a>

          <div style={{ height: 18 }} />

          <div
            style={{
              padding: 16,
              borderRadius: 18,
              background: BRAND.panel,
              border: `1px solid ${BRAND.line}`,
              color: BRAND.ink,
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 8 }}>{t.whyMatters}</div>
            <div style={{ color: BRAND.muted, lineHeight: 1.6 }}>{t.whyMattersCopy}</div>
          </div>
        </Card>
      </div>
    </>
  );

  const renderStory = () => (
    <>
      <Hero
        title={t.ourStory}
        subtitle={t.storySub}
        image={imageMap.story}
        liveTime={liveTime}
      />
      <div style={{ height: 18 }} />
      <div style={grid2}>
        <Card minHeight={230}>
          <div style={sectionTitleStyle}>{t.legacyPlace}</div>
          <div style={{ height: 12 }} />
          <div style={{ color: BRAND.muted, lineHeight: 1.75, fontSize: 16 }}>
            This work joins agriculture, family legacy, community development, food access, education,
            and place-based renewal on Youngstown’s East Side.
          </div>
        </Card>
        <Card minHeight={230}>
          <div style={sectionTitleStyle}>{t.whyMatters}</div>
          <div style={{ height: 12 }} />
          <div style={{ color: BRAND.muted, lineHeight: 1.75, fontSize: 16 }}>
            The farm creates a visible bridge between land use, workforce development, wellness,
            local food, and long-term community investment.
          </div>
        </Card>
      </div>
    </>
  );

  const renderCommunity = () => (
    <>
      <Hero
        title={t.communityTitle}
        subtitle={t.communitySub}
        image={imageMap.community}
        liveTime={liveTime}
      />
      <div style={{ height: 18 }} />
      <div style={grid2}>
        <Card minHeight={250}>
          <div style={sectionTitleStyle}>{t.volunteers}</div>
          <div style={{ height: 12 }} />
          <div style={{ color: BRAND.muted, lineHeight: 1.75, fontSize: 16 }}>
            Support planting, setup, logistics, education, market activity, and the welcoming environment
            that helps people return.
          </div>
        </Card>
        <Card minHeight={250}>
          <div style={sectionTitleStyle}>{t.partners}</div>
          <div style={{ height: 12 }} />
          <div style={{ color: BRAND.muted, lineHeight: 1.75, fontSize: 16 }}>
            Join infrastructure, wellness, workforce, food access, environmental, and family-centered
            development efforts connected to one farm ecosystem.
          </div>
        </Card>
      </div>
    </>
  );

  const renderSection = () => {
    switch (active) {
      case "dashboard":
        return renderDashboard();
      case "grow":
        return renderGrow();
      case "calendar":
        return renderCalendar();
      case "shop":
        return renderShop();
      case "story":
        return renderStory();
      case "community":
        return renderCommunity();
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={shellStyle}>
      <div style={pageStyle}>
        <aside style={sidebarStyle}>
          <div style={{ fontSize: 24, fontWeight: 900, color: BRAND.ink, marginBottom: 16 }}>
            {t.farmName}
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: BRAND.muted,
              marginBottom: 16,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {t.demoNavigation}
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {navItems.map((item) => (
              <SectionButton
                key={item.key}
                active={active === item.key}
                onClick={() => setActive(item.key)}
              >
                {item.label.toUpperCase()}
              </SectionButton>
            ))}
          </div>

          <div style={{ height: 22 }} />

          <div
            style={{
              padding: 16,
              borderRadius: 20,
              background: BRAND.card,
              border: `1px solid ${BRAND.line}`,
              color: BRAND.ink,
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 6 }}>{t.liveDemo}</div>
            <div style={{ color: BRAND.muted, lineHeight: 1.55, fontSize: 14 }}>
              {t.liveDemoCopy}
            </div>
          </div>
        </aside>

        <main style={mainStyle}>
          <TopLanguageBar />
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
