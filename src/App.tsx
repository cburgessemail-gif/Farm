import React, { useEffect, useMemo, useRef, useState } from "react";

type LangKey = "en" | "es" | "tl" | "it" | "he" | "pat";

type RoleKey =
  | "guest"
  | "customer"
  | "grower"
  | "volunteer"
  | "youth"
  | "supervisor";

type TourStep = {
  role: RoleKey;
  moduleId: string;
};

const images = {
  hero: "/GrowArea.jpg",
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/GrowArea3.jpg",
  volunteer: "/GrowArea4.jpg",
  youth: "/GrowArea5.jpg",
  supervisor: "/GrowArea6.jpg",
  market: "/GrowArea2.jpg",
  learning: "/GrowArea4.jpg",
  workforce: "/GrowArea5.jpg",
  operations: "/GrowArea6.jpg",
};

const brand = {
  bg: "#f5efe3",
  card: "rgba(255,255,255,0.88)",
  deep: "#1f4d36",
  forest: "#2e6a4a",
  moss: "#6d8b63",
  sun: "#d9a441",
  earth: "#8e684a",
  text: "#173126",
  soft: "#edf3ee",
};

const translations: Record<
  LangKey,
  {
    appTitle: string;
    tagline: string;
    intro: string;
    startDemo: string;
    guidedTour: string;
    stopTour: string;
    chooseRole: string;
    ecosystem: string;
    weather: string;
    calendar: string;
    marketplace: string;
    education: string;
    workforce: string;
    operations: string;
    nutrition: string;
    recipes: string;
    roleLabel: string;
    enterRole: string;
    backHome: string;
    guestTitle: string;
    customerTitle: string;
    growerTitle: string;
    volunteerTitle: string;
    youthTitle: string;
    supervisorTitle: string;
    guestIntro: string;
    customerIntro: string;
    growerIntro: string;
    volunteerIntro: string;
    youthIntro: string;
    supervisorIntro: string;
    marketCta: string;
    learnMore: string;
    viewCalendar: string;
    voiceNarration: string;
    next: string;
    previous: string;
    pause: string;
    resume: string;
    demoRestored: string;
  }
> = {
  en: {
    appTitle: "Bronson Family Farm Ecosystem Demo",
    tagline:
      "A welcoming grower ecosystem for learning, growing, buying, working, and returning.",
    intro:
      "This demo restores the platform vision as a living farm ecosystem — not a presentation. Each role enters the same world with a different purpose, pathway, and support system.",
    startDemo: "Enter Live Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Choose Your Role",
    ecosystem: "Ecosystem",
    weather: "Weather",
    calendar: "Calendar",
    marketplace: "Marketplace",
    education: "Education",
    workforce: "Youth Workforce",
    operations: "Operations",
    nutrition: "Nutrition",
    recipes: "Recipes",
    roleLabel: "Role",
    enterRole: "Enter Experience",
    backHome: "Back to Home",
    guestTitle: "Guest",
    customerTitle: "Customer",
    growerTitle: "Grower",
    volunteerTitle: "Volunteer",
    youthTitle: "Youth Participant",
    supervisorTitle: "Supervisor",
    guestIntro:
      "Guests discover the farm, events, seasonal learning, and the spirit of regenerative community.",
    customerIntro:
      "Customers move quickly into the marketplace, track buying habits, discover recipes, and receive nutrition guidance.",
    growerIntro:
      "Growers access crop planning, supply opportunities, seasonal tasks, workshops, and peer support.",
    volunteerIntro:
      "Volunteers find service pathways, event roles, sign-up needs, and meaningful ways to contribute.",
    youthIntro:
      "Youth participants see guided learning, practical tasks, wellness support, and career pathways.",
    supervisorIntro:
      "Supervisors coordinate youth support, workforce observation, wellness resources, safety, and progress.",
    marketCta: "Go to Marketplace",
    learnMore: "Explore Learning",
    viewCalendar: "Open Calendar",
    voiceNarration: "Voice Narration",
    next: "Next",
    previous: "Previous",
    pause: "Pause",
    resume: "Resume",
    demoRestored: "Demo restored",
  },
  es: {
    appTitle: "Demostración del Ecosistema de Bronson Family Farm",
    tagline:
      "Un ecosistema acogedor para aprender, cultivar, comprar, trabajar y regresar.",
    intro:
      "Esta demostración restaura la visión de la plataforma como un ecosistema agrícola vivo, no como una presentación. Cada rol entra al mismo mundo con un propósito y una ruta diferente.",
    startDemo: "Entrar a la Demostración",
    guidedTour: "Iniciar Recorrido Guiado",
    stopTour: "Detener Recorrido",
    chooseRole: "Elige Tu Rol",
    ecosystem: "Ecosistema",
    weather: "Clima",
    calendar: "Calendario",
    marketplace: "Mercado",
    education: "Educación",
    workforce: "Programa Juvenil",
    operations: "Operaciones",
    nutrition: "Nutrición",
    recipes: "Recetas",
    roleLabel: "Rol",
    enterRole: "Entrar",
    backHome: "Volver al Inicio",
    guestTitle: "Invitado",
    customerTitle: "Cliente",
    growerTitle: "Productor",
    volunteerTitle: "Voluntario",
    youthTitle: "Joven Participante",
    supervisorTitle: "Supervisor",
    guestIntro:
      "Los invitados descubren la granja, los eventos, el aprendizaje estacional y el espíritu de la comunidad regenerativa.",
    customerIntro:
      "Los clientes entran rápidamente al mercado, siguen sus hábitos de compra y reciben recetas y orientación nutricional.",
    growerIntro:
      "Los productores acceden a planificación de cultivos, oportunidades de suministros, tareas estacionales y talleres.",
    volunteerIntro:
      "Los voluntarios encuentran funciones de servicio, tareas de eventos y formas significativas de contribuir.",
    youthIntro:
      "Los jóvenes ven aprendizaje guiado, tareas prácticas, apoyo al bienestar y caminos profesionales.",
    supervisorIntro:
      "Los supervisores coordinan apoyo juvenil, observación laboral, seguridad y progreso.",
    marketCta: "Ir al Mercado",
    learnMore: "Explorar Aprendizaje",
    viewCalendar: "Abrir Calendario",
    voiceNarration: "Narración",
    next: "Siguiente",
    previous: "Anterior",
    pause: "Pausar",
    resume: "Continuar",
    demoRestored: "Demostración restaurada",
  },
  tl: {
    appTitle: "Bronson Family Farm Ecosystem Demo",
    tagline:
      "Isang magiliw na ecosystem para matuto, magtanim, mamili, magtrabaho, at bumalik.",
    intro:
      "Ibinabalik ng demo na ito ang platform bilang buhay na ecosystem ng bukid — hindi presentasyon. Ang bawat papel ay pumapasok sa iisang mundo na may iba’t ibang layunin at daan.",
    startDemo: "Pumasok sa Demo",
    guidedTour: "Simulan ang Guided Tour",
    stopTour: "Itigil ang Tour",
    chooseRole: "Piliin ang Iyong Papel",
    ecosystem: "Ecosystem",
    weather: "Panahon",
    calendar: "Kalendaryo",
    marketplace: "Pamilihan",
    education: "Edukasyon",
    workforce: "Kabataang Workforce",
    operations: "Operasyon",
    nutrition: "Nutrisyon",
    recipes: "Mga Resipe",
    roleLabel: "Papel",
    enterRole: "Pumasok",
    backHome: "Bumalik sa Home",
    guestTitle: "Bisita",
    customerTitle: "Mamimili",
    growerTitle: "Magtatanim",
    volunteerTitle: "Boluntaryo",
    youthTitle: "Kabataang Kalahok",
    supervisorTitle: "Supervisor",
    guestIntro:
      "Natutuklasan ng mga bisita ang bukid, mga kaganapan, pana-panahong pagkatuto, at diwa ng regenerative community.",
    customerIntro:
      "Madaling nakakarating ang mamimili sa marketplace, nakikita ang buying habits, at may gabay sa nutrisyon at resipe.",
    growerIntro:
      "Nakakakuha ang grower ng crop planning, supply opportunities, seasonal tasks, workshops, at support.",
    volunteerIntro:
      "Nakikita ng volunteer ang service pathways, event roles, at makabuluhang ambag.",
    youthIntro:
      "Nakikita ng kabataan ang guided learning, practical tasks, wellness support, at career pathways.",
    supervisorIntro:
      "Pinamamahalaan ng supervisor ang youth support, safety, wellness resources, at progress.",
    marketCta: "Pumunta sa Marketplace",
    learnMore: "Tingnan ang Learning",
    viewCalendar: "Buksan ang Kalendaryo",
    voiceNarration: "Boses na Gabay",
    next: "Susunod",
    previous: "Nakaraan",
    pause: "Pause",
    resume: "Magpatuloy",
    demoRestored: "Naibalik ang demo",
  },
  it: {
    appTitle: "Demo Ecosistema Bronson Family Farm",
    tagline:
      "Un ecosistema accogliente per imparare, coltivare, acquistare, lavorare e tornare.",
    intro:
      "Questa demo ripristina la visione della piattaforma come ecosistema agricolo vivo, non come presentazione.",
    startDemo: "Entra nella Demo",
    guidedTour: "Avvia Tour Guidato",
    stopTour: "Ferma Tour",
    chooseRole: "Scegli il Tuo Ruolo",
    ecosystem: "Ecosistema",
    weather: "Meteo",
    calendar: "Calendario",
    marketplace: "Mercato",
    education: "Educazione",
    workforce: "Programma Giovani",
    operations: "Operazioni",
    nutrition: "Nutrizione",
    recipes: "Ricette",
    roleLabel: "Ruolo",
    enterRole: "Entra",
    backHome: "Torna alla Home",
    guestTitle: "Ospite",
    customerTitle: "Cliente",
    growerTitle: "Coltivatore",
    volunteerTitle: "Volontario",
    youthTitle: "Partecipante Giovane",
    supervisorTitle: "Supervisore",
    guestIntro:
      "Gli ospiti scoprono la fattoria, gli eventi e lo spirito della comunità rigenerativa.",
    customerIntro:
      "I clienti entrano rapidamente nel mercato, seguono gli acquisti e ricevono ricette e guida nutrizionale.",
    growerIntro:
      "I coltivatori accedono a pianificazione delle colture, forniture, attività stagionali e laboratori.",
    volunteerIntro:
      "I volontari trovano ruoli di servizio, attività evento e modi significativi per contribuire.",
    youthIntro:
      "I giovani vedono apprendimento guidato, attività pratiche, supporto al benessere e percorsi professionali.",
    supervisorIntro:
      "I supervisori coordinano supporto ai giovani, sicurezza, benessere e progressi.",
    marketCta: "Vai al Mercato",
    learnMore: "Esplora Formazione",
    viewCalendar: "Apri Calendario",
    voiceNarration: "Narrazione",
    next: "Avanti",
    previous: "Indietro",
    pause: "Pausa",
    resume: "Riprendi",
    demoRestored: "Demo ripristinata",
  },
  he: {
    appTitle: "הדגמת המערכת של Bronson Family Farm",
    tagline:
      "מערכת מזמינה ללמידה, גידול, קנייה, עבודה וחזרה.",
    intro:
      "הדגמה זו מחזירה את חזון הפלטפורמה כמערכת חיה של חווה — לא מצגת.",
    startDemo: "כניסה להדגמה",
    guidedTour: "התחלת סיור מודרך",
    stopTour: "עצירת סיור",
    chooseRole: "בחרי/בחר תפקיד",
    ecosystem: "מערכת",
    weather: "מזג אוויר",
    calendar: "לוח שנה",
    marketplace: "שוק",
    education: "חינוך",
    workforce: "תכנית נוער",
    operations: "תפעול",
    nutrition: "תזונה",
    recipes: "מתכונים",
    roleLabel: "תפקיד",
    enterRole: "כניסה",
    backHome: "חזרה לדף הבית",
    guestTitle: "אורח/ת",
    customerTitle: "לקוח/ה",
    growerTitle: "מגדל/ת",
    volunteerTitle: "מתנדב/ת",
    youthTitle: "משתתף/ת נוער",
    supervisorTitle: "מפקח/ת",
    guestIntro:
      "האורחים מגלים את החווה, האירועים, הלמידה העונתית ורוח הקהילה המתחדשת.",
    customerIntro:
      "לקוחות נכנסים במהירות לשוק, עוקבים אחר הרגלי קנייה ומקבלים מתכונים והדרכה תזונתית.",
    growerIntro:
      "מגדלים מקבלים תכנון גידולים, הזדמנויות אספקה, משימות עונתיות וסדנאות.",
    volunteerIntro:
      "מתנדבים מוצאים מסלולי שירות, תפקידי אירועים ודרכים משמעותיות לתרום.",
    youthIntro:
      "בני נוער רואים למידה מודרכת, משימות מעשיות, תמיכה ברווחה ומסלולי קריירה.",
    supervisorIntro:
      "מפקחים מתאמים תמיכה לנוער, בטיחות, משאבי רווחה והתקדמות.",
    marketCta: "לשוק",
    learnMore: "ללמידה",
    viewCalendar: "פתח לוח שנה",
    voiceNarration: "קריינות",
    next: "הבא",
    previous: "הקודם",
    pause: "השהיה",
    resume: "המשך",
    demoRestored: "ההדגמה שוחזרה",
  },
  pat: {
    appTitle: "Bronson Family Farm Ecosystem Demo",
    tagline:
      "A warm, welcoming place fi learn, grow, buy, work, an come back.",
    intro:
      "Dis demo bring back di platform vision like a real living farm ecosystem — not no slideshow ting.",
    startDemo: "Enter Di Demo",
    guidedTour: "Start Guided Tour",
    stopTour: "Stop Tour",
    chooseRole: "Choose Yuh Role",
    ecosystem: "Ecosystem",
    weather: "Weather",
    calendar: "Calendar",
    marketplace: "Marketplace",
    education: "Education",
    workforce: "Youth Workforce",
    operations: "Operations",
    nutrition: "Nutrition",
    recipes: "Recipes",
    roleLabel: "Role",
    enterRole: "Enter",
    backHome: "Back Home",
    guestTitle: "Guest",
    customerTitle: "Customer",
    growerTitle: "Grower",
    volunteerTitle: "Volunteer",
    youthTitle: "Youth",
    supervisorTitle: "Supervisor",
    guestIntro:
      "Guest discover di farm, di events, di seasonal learning, an di spirit a regenerative community.",
    customerIntro:
      "Customer move quick into di marketplace, keep track a buying habits, an get recipe an nutrition guidance.",
    growerIntro:
      "Grower get crop planning, supply chances, seasonal tasks, workshop, an support.",
    volunteerIntro:
      "Volunteer find service pathways, event roles, an real ways fi help.",
    youthIntro:
      "Youth see guided learning, practical work, wellness support, an career pathways.",
    supervisorIntro:
      "Supervisor coordinate youth support, safety, wellness resources, an progress.",
    marketCta: "Go A Marketplace",
    learnMore: "Explore Learning",
    viewCalendar: "Open Calendar",
    voiceNarration: "Voice Guide",
    next: "Next",
    previous: "Previous",
    pause: "Pause",
    resume: "Resume",
    demoRestored: "Demo come back",
  },
};

const roleOrder: RoleKey[] = [
  "guest",
  "customer",
  "grower",
  "volunteer",
  "youth",
  "supervisor",
];

const roleModules: Record<RoleKey, string[]> = {
  guest: ["ecosystem", "calendar", "education"],
  customer: ["marketplace", "nutrition", "recipes"],
  grower: ["ecosystem", "calendar", "operations"],
  volunteer: ["calendar", "education", "operations"],
  youth: ["workforce", "education", "calendar"],
  supervisor: ["workforce", "operations", "calendar"],
};

const guidedTourSteps: TourStep[] = [
  { role: "guest", moduleId: "ecosystem" },
  { role: "customer", moduleId: "marketplace" },
  { role: "grower", moduleId: "operations" },
  { role: "volunteer", moduleId: "calendar" },
  { role: "youth", moduleId: "workforce" },
  { role: "supervisor", moduleId: "operations" },
];

function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return displayed;
}

function roleTitle(role: RoleKey, t: (typeof translations)["en"]) {
  switch (role) {
    case "guest":
      return t.guestTitle;
    case "customer":
      return t.customerTitle;
    case "grower":
      return t.growerTitle;
    case "volunteer":
      return t.volunteerTitle;
    case "youth":
      return t.youthTitle;
    case "supervisor":
      return t.supervisorTitle;
  }
}

function roleIntro(role: RoleKey, t: (typeof translations)["en"]) {
  switch (role) {
    case "guest":
      return t.guestIntro;
    case "customer":
      return t.customerIntro;
    case "grower":
      return t.growerIntro;
    case "volunteer":
      return t.volunteerIntro;
    case "youth":
      return t.youthIntro;
    case "supervisor":
      return t.supervisorIntro;
  }
}

function roleImage(role: RoleKey) {
  switch (role) {
    case "guest":
      return images.guest;
    case "customer":
      return images.customer;
    case "grower":
      return images.grower;
    case "volunteer":
      return images.volunteer;
    case "youth":
      return images.youth;
    case "supervisor":
      return images.supervisor;
  }
}

function moduleLabel(
  moduleId: string,
  t: (typeof translations)["en"]
): string {
  switch (moduleId) {
    case "ecosystem":
      return t.ecosystem;
    case "weather":
      return t.weather;
    case "calendar":
      return t.calendar;
    case "marketplace":
      return t.marketplace;
    case "education":
      return t.education;
    case "workforce":
      return t.workforce;
    case "operations":
      return t.operations;
    case "nutrition":
      return t.nutrition;
    case "recipes":
      return t.recipes;
    default:
      return moduleId;
  }
}

function App() {
  const [lang, setLang] = useState<LangKey>("en");
  const [selectedRole, setSelectedRole] = useState<RoleKey>("guest");
  const [tourRunning, setTourRunning] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [homeMode, setHomeMode] = useState(true);
  const [currentModule, setCurrentModule] = useState<string>("ecosystem");
  const [buyingHistory] = useState([
    "Tomatoes",
    "Collards",
    "Peppers",
    "Spinach",
    "Cabbage",
  ]);
  const [seasonalMessage, setSeasonalMessage] = useState("");
  const narrationRef = useRef<HTMLDivElement | null>(null);

  const t = translations[lang];
  const rtl = lang === "he";

  useEffect(() => {
    const month = new Date().getMonth();
    if ([11, 0, 1].includes(month)) {
      setSeasonalMessage(
        "Winter planning, seed starting, greenhouse prep, and infrastructure strategy."
      );
    } else if ([2, 3, 4].includes(month)) {
      setSeasonalMessage(
        "Spring planting, seedling care, soil preparation, education, and market readiness."
      );
    } else if ([5, 6, 7].includes(month)) {
      setSeasonalMessage(
        "Summer growth, harvest prep, youth workforce activity, marketplace energy, and irrigation focus."
      );
    } else {
      setSeasonalMessage(
        "Fall harvest, preservation, soil renewal, community learning, and seasonal transition."
      );
    }
  }, []);

  useEffect(() => {
    if (!tourRunning) return;
    const step = guidedTourSteps[tourIndex];
    setSelectedRole(step.role);
    setHomeMode(false);
    setCurrentModule(step.moduleId);

    const id = window.setTimeout(() => {
      setTourIndex((prev) => {
        if (prev >= guidedTourSteps.length - 1) {
          setTourRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 5000);

    return () => window.clearTimeout(id);
  }, [tourRunning, tourIndex]);

  useEffect(() => {
    if (!voiceOn || !("speechSynthesis" in window)) return;

    const text = getNarration(selectedRole, currentModule, t);
    if (!text) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = lang === "pat" ? 0.88 : 0.95;
    utter.pitch = 1;
    utter.lang =
      lang === "es"
        ? "es-ES"
        : lang === "tl"
        ? "fil-PH"
        : lang === "it"
        ? "it-IT"
        : lang === "he"
        ? "he-IL"
        : "en-US";
    window.speechSynthesis.speak(utter);

    return () => window.speechSynthesis.cancel();
  }, [selectedRole, currentModule, voiceOn, lang, t]);

  const narration = useMemo(
    () => getNarration(selectedRole, currentModule, t),
    [selectedRole, currentModule, t]
  );

  const typedNarration = useTypewriter(narration, 15);

  function openRole(role: RoleKey) {
    setSelectedRole(role);
    setCurrentModule(roleModules[role][0]);
    setHomeMode(false);
    setTourRunning(false);
    setTourIndex(0);
  }

  function startTour() {
    setTourIndex(0);
    setTourRunning(true);
    setHomeMode(false);
  }

  function stopTour() {
    setTourRunning(false);
    setTourIndex(0);
    window.speechSynthesis?.cancel();
  }

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(245,239,227,1) 0%, rgba(232,241,233,1) 100%)",
        color: brand.text,
        fontFamily:
          "'Segoe UI', Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(245,239,227,0.86)",
          borderBottom: "1px solid rgba(31,77,54,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: brand.deep,
              }}
            >
              {t.appTitle}
            </div>
            <div style={{ fontSize: 13, opacity: 0.82 }}>{t.demoRestored}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
            }}
          >
            {(["en", "es", "tl", "it", "he", "pat"] as LangKey[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                style={{
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 14px",
                  background: lang === code ? brand.deep : "white",
                  color: lang === code ? "white" : brand.deep,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
                }}
              >
                {code.toUpperCase()}
              </button>
            ))}

            <button
              onClick={() => setVoiceOn((v) => !v)}
              style={pillButton(voiceOn)}
            >
              {t.voiceNarration}: {voiceOn ? "ON" : "OFF"}
            </button>

            {!homeMode && (
              <button
                onClick={() => {
                  setHomeMode(true);
                  setTourRunning(false);
                  window.speechSynthesis?.cancel();
                }}
                style={pillButton(false)}
              >
                {t.backHome}
              </button>
            )}
          </div>
        </div>
      </header>

      {homeMode ? (
        <main>
          <section
            style={{
              position: "relative",
              minHeight: 560,
              display: "grid",
              alignItems: "stretch",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(90deg, rgba(15,44,30,0.72), rgba(15,44,30,0.34)), url(${images.hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              style={{
                position: "relative",
                maxWidth: 1320,
                width: "100%",
                margin: "0 auto",
                padding: "64px 20px 72px",
                display: "grid",
                gridTemplateColumns: "1.25fr 0.9fr",
                gap: 24,
              }}
            >
              <div style={{ color: "white", alignSelf: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "8px 14px",
                    borderRadius: 999,
                    marginBottom: 18,
                    fontWeight: 700,
                  }}
                >
                  Bronson Family Farm • Farm & Family Alliance
                </div>
                <h1
                  style={{
                    fontSize: "clamp(40px, 6vw, 72px)",
                    lineHeight: 1.02,
                    margin: "0 0 18px",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {t.tagline}
                </h1>
                <p
                  style={{
                    fontSize: 20,
                    lineHeight: 1.6,
                    maxWidth: 800,
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  {t.intro}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 14,
                    marginTop: 26,
                  }}
                >
                  <button onClick={() => openRole("guest")} style={heroButton()}>
                    {t.startDemo}
                  </button>
                  <button onClick={startTour} style={heroButton(true)}>
                    {t.guidedTour}
                  </button>
                </div>
              </div>

              <div
                style={{
                  alignSelf: "end",
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: 28,
                  padding: 22,
                  color: "white",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12 }}>
                  Seasonal Focus
                </div>
                <div style={{ lineHeight: 1.7, opacity: 0.96 }}>
                  {seasonalMessage}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <MiniStat title="Roles" value="6" />
                  <MiniStat title="Modules" value="9" />
                  <MiniStat title="Languages" value="6" />
                  <MiniStat title="Mode" value="Live Demo" />
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              padding: "28px 20px 56px",
            }}
          >
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: brand.deep,
                marginBottom: 18,
                letterSpacing: "-0.03em",
              }}
            >
              {t.chooseRole}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                gap: 20,
              }}
            >
              {roleOrder.map((role) => (
                <RoleCard
                  key={role}
                  title={roleTitle(role, t)}
                  intro={roleIntro(role, t)}
                  image={roleImage(role)}
                  onOpen={() => openRole(role)}
                  buttonText={t.enterRole}
                />
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "22px 20px 40px",
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 22,
          }}
        >
          <aside
            style={{
              background: brand.card,
              borderRadius: 28,
              padding: 18,
              boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
              border: "1px solid rgba(31,77,54,0.09)",
              height: "fit-content",
              position: "sticky",
              top: 94,
            }}
          >
            <div
              style={{
                borderRadius: 22,
                overflow: "hidden",
                height: 180,
                backgroundImage: `url(${roleImage(selectedRole)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: 16,
              }}
            />
            <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.6 }}>
              {t.roleLabel}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: brand.deep,
                letterSpacing: "-0.04em",
                margin: "4px 0 10px",
              }}
            >
              {roleTitle(selectedRole, t)}
            </div>
            <div style={{ lineHeight: 1.7, marginBottom: 18 }}>
              {roleIntro(selectedRole, t)}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {roleOrder.map((role) => (
                <button
                  key={role}
                  onClick={() => openRole(role)}
                  style={{
                    textAlign: rtl ? "right" : "left",
                    padding: "12px 14px",
                    borderRadius: 16,
                    border: "1px solid rgba(31,77,54,0.1)",
                    background:
                      role === selectedRole ? "rgba(31,77,54,0.12)" : "white",
                    color: brand.deep,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {roleTitle(role, t)}
                </button>
              ))}
            </div>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {!tourRunning ? (
                <button onClick={startTour} style={pillButton(true)}>
                  {t.guidedTour}
                </button>
              ) : (
                <button onClick={stopTour} style={pillButton(true)}>
                  {t.stopTour}
                </button>
              )}
            </div>
          </aside>

          <section style={{ display: "grid", gap: 22 }}>
            <section
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: 300,
                borderRadius: 30,
                backgroundImage: `linear-gradient(90deg, rgba(16,40,28,0.78), rgba(16,40,28,0.28)), url(${roleImage(
                  selectedRole
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 18px 48px rgba(19,31,24,0.15)",
              }}
            >
              <div style={{ padding: 30, color: "white", maxWidth: 860 }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  {roleTitle(selectedRole, t)}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(30px,4vw,52px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {roleIntro(selectedRole, t)}
                </h2>

                <div
                  style={{
                    marginTop: 22,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  {roleModules[selectedRole].map((m) => (
                    <button
                      key={m}
                      onClick={() => setCurrentModule(m)}
                      style={{
                        border: "none",
                        borderRadius: 999,
                        padding: "12px 16px",
                        cursor: "pointer",
                        fontWeight: 800,
                        background:
                          currentModule === m
                            ? "white"
                            : "rgba(255,255,255,0.16)",
                        color:
                          currentModule === m ? brand.deep : "white",
                      }}
                    >
                      {moduleLabel(m, t)}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 0.85fr",
                gap: 22,
              }}
            >
              <div
                style={{
                  background: brand.card,
                  borderRadius: 28,
                  padding: 24,
                  boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
                  border: "1px solid rgba(31,77,54,0.09)",
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: brand.deep,
                    letterSpacing: "-0.04em",
                    marginBottom: 16,
                  }}
                >
                  {moduleLabel(currentModule, t)}
                </div>
                {renderModule({
                  role: selectedRole,
                  moduleId: currentModule,
                  t,
                  buyingHistory,
                  setCurrentModule,
                })}
              </div>

              <div style={{ display: "grid", gap: 22 }}>
                <div
                  ref={narrationRef}
                  style={{
                    background: "#173126",
                    color: "white",
                    borderRadius: 28,
                    padding: 22,
                    boxShadow: "0 18px 42px rgba(22,37,29,0.14)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      opacity: 0.75,
                      textTransform: "uppercase",
                    }}
                  >
                    Guided Narration
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      minHeight: 120,
                      fontSize: 18,
                      lineHeight: 1.75,
                    }}
                  >
                    {typedNarration}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => setVoiceOn((v) => !v)}
                      style={smallDarkButton()}
                    >
                      {voiceOn ? t.pause : t.resume}
                    </button>
                    <button
                      onClick={() =>
                        setTourIndex((i) =>
                          i > 0 ? i - 1 : 0
                        )
                      }
                      style={smallDarkButton()}
                    >
                      {t.previous}
                    </button>
                    <button
                      onClick={() =>
                        setTourIndex((i) =>
                          i < guidedTourSteps.length - 1 ? i + 1 : i
                        )
                      }
                      style={smallDarkButton()}
                    >
                      {t.next}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: brand.card,
                    borderRadius: 28,
                    padding: 22,
                    boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
                    border: "1px solid rgba(31,77,54,0.09)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: brand.deep,
                      marginBottom: 12,
                    }}
                  >
                    {t.weather}
                  </div>
                  <div style={{ lineHeight: 1.75 }}>
                    Youngstown seasonal outlook:
                    <br />
                    <strong>Farm-ready conditions dashboard</strong>
                    <br />
                    Soil attention, planting rhythm, hydration, event comfort,
                    and learning readiness are surfaced here for growers,
                    visitors, youth, and supervisors.
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    <MetricCard label="Conditions" value="Active" />
                    <MetricCard label="Farm Mode" value="Seasonal" />
                    <MetricCard label="Visitor Readiness" value="Open" />
                    <MetricCard label="Field Notes" value="Updated" />
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      )}
    </div>
  );
}

function renderModule({
  role,
  moduleId,
  t,
  buyingHistory,
  setCurrentModule,
}: {
  role: RoleKey;
  moduleId: string;
  t: (typeof translations)["en"];
  buyingHistory: string[];
  setCurrentModule: (moduleId: string) => void;
}) {
  if (moduleId === "ecosystem") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.learning} />
        <p style={bodyText()}>
          The ecosystem connects farm life, education, agritourism, food access,
          youth development, growers, and returning community participation. It
          is meant to feel alive, warm, and useful.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Regenerative Land",
              text: "Restoring land, building soil, and reconnecting people to natural food systems.",
            },
            {
              title: "Community Pathways",
              text: "Guests, growers, customers, volunteers, and youth enter the same ecosystem differently.",
            },
            {
              title: "Return Experience",
              text: "The design encourages people to come back for learning, buying, events, and participation.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "marketplace") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.market} />
        <p style={bodyText()}>
          Customers can move quickly into the marketplace, see what is in
          season, review buying history, and connect purchases to recipes and
          nutrition guidance.
        </p>
        <button
          onClick={() => setCurrentModule("nutrition")}
          style={primaryButton()}
        >
          {t.marketCta}
        </button>

        <div style={sectionTitle()}>Buying History</div>
        <div style={chipWrap()}>
          {buyingHistory.map((item) => (
            <span key={item} style={chip()}>
              {item}
            </span>
          ))}
        </div>

        <ThreeColCards
          items={[
            {
              title: "Fresh Access",
              text: "Find produce, seedlings, and farm-connected goods in one place.",
            },
            {
              title: "Smart Guidance",
              text: "Shopping habits can connect to health goals, budget decisions, and family needs.",
            },
            {
              title: "Quick Movement",
              text: "Marketplace access is intentionally fast because many customers come to buy first.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "nutrition") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Nutrition education helps people compare natural food with heavily
          processed food, understand how rising costs influence food choices,
          and learn how healthier habits support work, play, rest, and Type II
          diabetes management.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Food & Energy",
              text: "Natural foods can support stable energy, focus, and long-term health.",
            },
            {
              title: "Processed Food Reality",
              text: "Rising food costs can push families toward overprocessed substitutes that slowly harm health.",
            },
            {
              title: "Practical Support",
              text: "Guidance is built for real life, limited budgets, and household decision-making.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "recipes") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <div style={sectionTitle()}>Recipe Pathways</div>
        <ThreeColCards
          items={[
            {
              title: "Tomato & Pepper Skillet",
              text: "Simple fresh vegetables for a quick family meal.",
            },
            {
              title: "Collard & Cabbage Bowl",
              text: "A hearty meal that supports fiber, minerals, and fullness.",
            },
            {
              title: "Spinach Add-In Guide",
              text: "Easy ways to work greens into breakfast, lunch, and dinner.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "calendar") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          The calendar connects seasonal activity, workshops, volunteer shifts,
          youth workforce schedules, demonstrations, and marketplace readiness.
        </p>
        <ScheduleList
          items={[
            "Growers Supply Market preparation window",
            "Seasonal planting and crop check blocks",
            "Youth workforce training and support",
            "Community learning sessions and demonstrations",
            "Volunteer setup, check-in, and cleanup paths",
          ]}
        />
      </div>
    );
  }

  if (moduleId === "education") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.learning} />
        <p style={bodyText()}>
          Learning is woven throughout the platform. Guests can explore. Youth
          can build skills. Customers can learn recipes and nutrition. Growers
          can deepen knowledge. Volunteers can understand purpose before action.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Food & Health",
              text: "Nutrition, processed food awareness, recipes, and practical guidance.",
            },
            {
              title: "Farm Learning",
              text: "Growing systems, seasonal tasks, stewardship, and environmental awareness.",
            },
            {
              title: "Life Skills",
              text: "Responsibility, teamwork, time management, confidence, and pathway awareness.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "workforce") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.workforce} />
        <p style={bodyText()}>
          The youth workforce area is designed to feel guided, supportive, and
          real. It includes responsibilities, safety, wellness support, skill
          building, and clear next steps.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Guided Participation",
              text: "Young people see where they are, what they do next, and why the work matters.",
            },
            {
              title: "Wellness Support",
              text: "Supervisor support includes observation, encouragement, and access to support resources.",
            },
            {
              title: "Career Pathways",
              text: "Farm work becomes a bridge to leadership, confidence, and broader workforce readiness.",
            },
          ]}
        />
      </div>
    );
  }

  if (moduleId === "operations") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.operations} />
        <p style={bodyText()}>
          Operations brings together event flow, staff support, seasonal tasks,
          supply movement, field readiness, youth oversight, and practical
          coordination.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Field & Event Readiness",
              text: "Track setup, task timing, weather awareness, and movement across the site.",
            },
            {
              title: "Role-Based Visibility",
              text: "Different people see different things, but everything remains connected.",
            },
            {
              title: "Supportive Oversight",
              text: "Supervisors can coordinate people, progress, and support without making the platform feel cold.",
            },
          ]}
        />
      </div>
    );
  }

  return (
    <div style={bodyText()}>
      {roleTitle(role, t)} • {moduleLabel(moduleId, t)}
    </div>
  );
}

function getNarration(
  role: RoleKey,
  moduleId: string,
  t: (typeof translations)["en"]
) {
  const roleName = roleTitle(role, t);
  const moduleName = moduleLabel(moduleId, t);

  const map: Record<string, string> = {
    "guest-ecosystem": `${roleName}: You are entering the living ecosystem of Bronson Family Farm. This is a place for discovery, restoration, and returning connection.`,
    "guest-calendar": `${roleName}: The calendar shows events, seasonal rhythms, and ways to join the farm experience.`,
    "guest-education": `${roleName}: Learning begins before work. Visitors can understand the land, the purpose, and the community vision.`,
    "customer-marketplace": `${roleName}: Customers can move directly into the marketplace, review what is available, and make healthy buying decisions more easily.`,
    "customer-nutrition": `${roleName}: Nutrition guidance helps families compare natural food with overprocessed substitutes and connect food choices to long-term health.`,
    "customer-recipes": `${roleName}: Recipes help customers turn purchases into practical meals people can actually make and enjoy.`,
    "grower-ecosystem": `${roleName}: Growers enter a connected system of land, learning, timing, and community support.`,
    "grower-calendar": `${roleName}: Seasonal planning and timing matter. The calendar keeps growers aligned with activity and opportunity.`,
    "grower-operations": `${roleName}: Operations supports field readiness, supply movement, and the practical pace of the growing cycle.`,
    "volunteer-calendar": `${roleName}: Volunteers can quickly see where help is needed and how they fit into the movement of the day.`,
    "volunteer-education": `${roleName}: Service is stronger when people understand the purpose behind the work.`,
    "volunteer-operations": `${roleName}: Operational visibility gives volunteers clarity, confidence, and direction.`,
    "youth-workforce": `${roleName}: Youth participants experience structured learning, responsibility, wellness support, and growth.`,
    "youth-education": `${roleName}: Education connects farm work to confidence, identity, teamwork, and future opportunity.`,
    "youth-calendar": `${roleName}: A visible calendar helps youth understand time, expectations, and momentum.`,
    "supervisor-workforce": `${roleName}: Supervisors support youth progress, observe growth, and strengthen the learning environment.`,
    "supervisor-operations": `${roleName}: Supervisors coordinate people, safety, tasks, support resources, and daily flow.`,
    "supervisor-calendar": `${roleName}: The calendar helps align coverage, readiness, and structured support.`,
  };

  return map[`${role}-${moduleId}`] ?? `${roleName}: ${moduleName}`;
}

function RoleCard({
  title,
  intro,
  image,
  onOpen,
  buttonText,
}: {
  title: string;
  intro: string;
  image: string;
  onOpen: () => void;
  buttonText: string;
}) {
  return (
    <div
      style={{
        background: brand.card,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
        border: "1px solid rgba(31,77,54,0.09)",
      }}
    >
      <div
        style={{
          height: 220,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: 20 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: brand.deep,
            letterSpacing: "-0.04em",
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div style={{ lineHeight: 1.7, minHeight: 92 }}>{intro}</div>
        <button onClick={onOpen} style={{ ...primaryButton(), marginTop: 16 }}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function MiniStat({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.12)",
        borderRadius: 18,
        padding: 14,
        border: "1px solid rgba(255,255,255,0.16)",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>{value}</div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        padding: 14,
        border: "1px solid rgba(31,77,54,0.08)",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.68, fontWeight: 700 }}>{label}</div>
      <div
        style={{
          marginTop: 6,
          fontSize: 20,
          fontWeight: 900,
          color: brand.deep,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function LargeImageBanner({ image }: { image: string }) {
  return (
    <div
      style={{
        height: 220,
        borderRadius: 24,
        backgroundImage: `linear-gradient(90deg, rgba(18,40,28,0.22), rgba(18,40,28,0.08)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

function ScheduleList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((item) => (
        <div
          key={item}
          style={{
            background: "white",
            borderRadius: 18,
            padding: "14px 16px",
            border: "1px solid rgba(31,77,54,0.08)",
            lineHeight: 1.6,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function ThreeColCards({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 14,
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 18,
            border: "1px solid rgba(31,77,54,0.08)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: brand.deep,
              marginBottom: 8,
            }}
          >
            {item.title}
          </div>
          <div style={{ lineHeight: 1.65 }}>{item.text}</div>
        </div>
      ))}
    </div>
  );
}

function bodyText(): React.CSSProperties {
  return {
    fontSize: 17,
    lineHeight: 1.8,
    margin: 0,
  };
}

function sectionTitle(): React.CSSProperties {
  return {
    fontSize: 22,
    fontWeight: 900,
    color: brand.deep,
  };
}

function chipWrap(): React.CSSProperties {
  return {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  };
}

function chip(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(31,77,54,0.1)",
    color: brand.deep,
    fontWeight: 800,
  };
}

function primaryButton(): React.CSSProperties {
  return {
    border: "none",
    borderRadius: 999,
    padding: "14px 18px",
    background: brand.deep,
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(31,77,54,0.18)",
  };
}

function heroButton(ghost = false): React.CSSProperties {
  return {
    border: ghost ? "1px solid rgba(255,255,255,0.35)" : "none",
    borderRadius: 999,
    padding: "14px 20px",
    background: ghost ? "rgba(255,255,255,0.12)" : "white",
    color: ghost ? "white" : brand.deep,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: ghost ? "none" : "0 10px 24px rgba(0,0,0,0.12)",
  };
}

function pillButton(active: boolean): React.CSSProperties {
  return {
    border: "none",
    borderRadius: 999,
    padding: "10px 14px",
    background: active ? brand.deep : "white",
    color: active ? "white" : brand.deep,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
  };
}

function smallDarkButton(): React.CSSProperties {
  return {
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    padding: "10px 14px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  };
}

export default App;
