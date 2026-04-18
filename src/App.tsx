import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageCode = "en" | "es" | "tl" | "it" | "pat" | "he";
type ViewMode =
  | "entrance"
  | "ecosystem"
  | "guest"
  | "customer"
  | "grower"
  | "youth"
  | "supervisor";

const copy = {
  en: {
    eyebrow: "Bronson Family Farm",
    title: "Enter the Bronson Family Farm Ecosystem.",
    subtitle:
      "This demo is a guided view into a real ecosystem now being implemented through Bronson Family Farm. It shows how the platform supports customer access, grower coordination, youth workforce pathways, and community connection.",
    credibility:
      "This demo is not a concept board. It is a guided view into a real ecosystem now being actively implemented.",
    enter: "Open the Live Ecosystem",
    tour: "Take the Guided Walkthrough",
    language: "Language",
    back: "Back",
    backToEntrance: "Back to Entrance",
    ecosystemTitle: "Platform Access Points",
    ecosystemText:
      "These role-based entry points show how the Bronson Family Farm ecosystem functions in practice across public engagement, marketplace access, production planning, youth workforce participation, and supervised support.",
    guest: "Guest",
    guestText: "Public information, events, story, and partner-facing access.",
    customer: "Customer",
    customerText:
      "Marketplace access, food education, nutrition guidance, and customer engagement tools.",
    grower: "Grower",
    growerText:
      "Crop planning, production coordination, seasonal tracking, and grower support pathways.",
    youth: "Youth Workforce",
    youthText:
      "Training access, learning pathways, supervised participation, and workforce readiness tools.",
    supervisor: "Supervisor",
    supervisorText:
      "Youth workforce oversight, support coordination, progress visibility, and resource management.",
    guideText:
      "Welcome to Bronson Family Farm. You are entering a real ecosystem now being actively implemented. This platform supports food access, grower coordination, customer engagement, youth workforce pathways, and community connection.",
    enterRole: "Enter Access Point",
    heroBadge: "Active Ecosystem",
    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",
    openMarketplace: "Open Marketplace Access",
    viewEvents: "View Events & Public Access",
    explorePlanning: "Open Grower Planning Tools",
    openYouthHub: "Open Youth Workforce Hub",
    supervisorArea: "Open Supervisor Support",
    guestTitle: "Guest Access Point",
    guestLead:
      "A public-facing entry into Bronson Family Farm, providing story, events, updates, partnerships, and community connection.",
    customerTitle: "Customer Access Point",
    customerLead:
      "A customer-centered path for marketplace activity, healthy food discovery, nutrition education, recipes, and repeat engagement.",
    growerTitle: "Grower Access Point",
    growerLead:
      "An operational space for crop planning, production timing, grower coordination, seasonal readiness, and field decision support.",
    youthTitle: "Youth Workforce Access Point",
    youthLead:
      "A structured pathway for learning, supervised participation, work readiness, mentoring, and practical farm experience.",
    supervisorTitle: "Supervisor Support Access Point",
    supervisorLead:
      "A dedicated management space for youth workforce support, scheduling, oversight, progress tracking, and resource visibility.",
  },
  es: {
    eyebrow: "Bronson Family Farm",
    title: "Entre al Ecosistema de Bronson Family Farm.",
    subtitle:
      "Esta demostración es una vista guiada de un ecosistema real que ya se está implementando a través de Bronson Family Farm. Muestra cómo la plataforma apoya el acceso de clientes, la coordinación de productores, las rutas laborales juveniles y la conexión comunitaria.",
    credibility:
      "Esta demostración no es un tablero conceptual. Es una vista guiada de un ecosistema real que ya está en implementación activa.",
    enter: "Abrir el Ecosistema Activo",
    tour: "Tomar el Recorrido Guiado",
    language: "Idioma",
    back: "Volver",
    backToEntrance: "Volver a la Entrada",
    ecosystemTitle: "Puntos de Acceso de la Plataforma",
    ecosystemText:
      "Estos puntos de entrada por rol muestran cómo funciona en la práctica el ecosistema de Bronson Family Farm en participación pública, acceso al mercado, planificación productiva, participación juvenil y apoyo supervisado.",
    guest: "Invitado",
    guestText: "Información pública, eventos, historia y acceso para socios.",
    customer: "Cliente",
    customerText:
      "Acceso al mercado, educación alimentaria, orientación nutricional y herramientas de participación del cliente.",
    grower: "Productor",
    growerText:
      "Planificación de cultivos, coordinación de producción, seguimiento estacional y rutas de apoyo al productor.",
    youth: "Fuerza Laboral Juvenil",
    youthText:
      "Acceso a capacitación, rutas de aprendizaje, participación supervisada y herramientas de preparación laboral.",
    supervisor: "Supervisor",
    supervisorText:
      "Supervisión juvenil, coordinación de apoyo, visibilidad del progreso y gestión de recursos.",
    guideText:
      "Bienvenido a Bronson Family Farm. Usted está entrando en un ecosistema real que ya se está implementando activamente. Esta plataforma apoya el acceso a alimentos, la coordinación de productores, la participación del cliente, las rutas laborales juveniles y la conexión comunitaria.",
    enterRole: "Entrar al Punto de Acceso",
    heroBadge: "Ecosistema Activo",
    overview: "Resumen",
    highlights: "Aspectos Clave",
    actions: "Acciones",
    openMarketplace: "Abrir Acceso al Mercado",
    viewEvents: "Ver Eventos y Acceso Público",
    explorePlanning: "Abrir Herramientas de Planificación",
    openYouthHub: "Abrir Centro Juvenil",
    supervisorArea: "Abrir Soporte del Supervisor",
    guestTitle: "Punto de Acceso del Invitado",
    guestLead:
      "Una entrada pública a Bronson Family Farm con historia, eventos, actualizaciones, alianzas y conexión comunitaria.",
    customerTitle: "Punto de Acceso del Cliente",
    customerLead:
      "Una ruta centrada en el cliente para actividad de mercado, descubrimiento de alimentos saludables, educación nutricional, recetas y participación continua.",
    growerTitle: "Punto de Acceso del Productor",
    growerLead:
      "Un espacio operativo para planificación de cultivos, tiempos de producción, coordinación de productores, preparación estacional y apoyo práctico en campo.",
    youthTitle: "Punto de Acceso de la Fuerza Laboral Juvenil",
    youthLead:
      "Una ruta estructurada para aprendizaje, participación supervisada, preparación laboral, mentoría y experiencia práctica en la granja.",
    supervisorTitle: "Punto de Acceso de Soporte del Supervisor",
    supervisorLead:
      "Un espacio de gestión dedicado al apoyo juvenil, programación, supervisión, seguimiento del progreso y visibilidad de recursos.",
  },
  tl: {
    eyebrow: "Bronson Family Farm",
    title: "Pumasok sa Bronson Family Farm Ecosystem.",
    subtitle:
      "Ang demo na ito ay guided view ng isang totoong ecosystem na isinasagawa na ngayon sa Bronson Family Farm. Ipinapakita nito kung paano sinusuportahan ng platform ang customer access, grower coordination, youth workforce pathways, at community connection.",
    credibility:
      "Ang demo na ito ay hindi concept board. Isa itong guided view ng totoong ecosystem na aktibong ipinapatupad ngayon.",
    enter: "Buksan ang Live Ecosystem",
    tour: "Simulan ang Guided Walkthrough",
    language: "Wika",
    back: "Bumalik",
    backToEntrance: "Bumalik sa Entrance",
    ecosystemTitle: "Platform Access Points",
    ecosystemText:
      "Ipinapakita ng mga role-based entry points na ito kung paano gumagana ang Bronson Family Farm ecosystem sa public engagement, marketplace access, production planning, youth workforce participation, at supervised support.",
    guest: "Bisita",
    guestText:
      "Pampublikong impormasyon, events, kuwento, at partner-facing access.",
    customer: "Customer",
    customerText:
      "Marketplace access, food education, nutrition guidance, at customer engagement tools.",
    grower: "Grower",
    growerText:
      "Crop planning, production coordination, seasonal tracking, at grower support pathways.",
    youth: "Youth Workforce",
    youthText:
      "Training access, learning pathways, supervised participation, at workforce readiness tools.",
    supervisor: "Supervisor",
    supervisorText:
      "Youth workforce oversight, support coordination, progress visibility, at resource management.",
    guideText:
      "Maligayang pagdating sa Bronson Family Farm. Papasok ka sa isang totoong ecosystem na aktibong ipinapatupad ngayon. Sinusuportahan ng platform na ito ang food access, grower coordination, customer engagement, youth workforce pathways, at community connection.",
    enterRole: "Buksan ang Access Point",
    heroBadge: "Active Ecosystem",
    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",
    openMarketplace: "Buksan ang Marketplace Access",
    viewEvents: "Tingnan ang Events at Public Access",
    explorePlanning: "Buksan ang Grower Planning Tools",
    openYouthHub: "Buksan ang Youth Workforce Hub",
    supervisorArea: "Buksan ang Supervisor Support",
    guestTitle: "Guest Access Point",
    guestLead:
      "Isang public-facing entry sa Bronson Family Farm para sa story, events, updates, partnerships, at community connection.",
    customerTitle: "Customer Access Point",
    customerLead:
      "Isang customer-centered path para sa marketplace activity, healthy food discovery, nutrition education, recipes, at repeat engagement.",
    growerTitle: "Grower Access Point",
    growerLead:
      "Isang operational space para sa crop planning, production timing, grower coordination, seasonal readiness, at field decision support.",
    youthTitle: "Youth Workforce Access Point",
    youthLead:
      "Isang structured pathway para sa learning, supervised participation, work readiness, mentoring, at practical farm experience.",
    supervisorTitle: "Supervisor Support Access Point",
    supervisorLead:
      "Isang dedicated management space para sa youth workforce support, scheduling, oversight, progress tracking, at resource visibility.",
  },
  it: {
    eyebrow: "Bronson Family Farm",
    title: "Entra nell’Ecosistema Bronson Family Farm.",
    subtitle:
      "Questa demo è una vista guidata di un ecosistema reale già in fase di implementazione attraverso Bronson Family Farm. Mostra come la piattaforma supporta accesso clienti, coordinamento dei coltivatori, percorsi di lavoro giovanile e connessione comunitaria.",
    credibility:
      "Questa demo non è una bacheca concettuale. È una vista guidata di un ecosistema reale attivamente in implementazione.",
    enter: "Apri l’Ecosistema Attivo",
    tour: "Avvia la Guida",
    language: "Lingua",
    back: "Indietro",
    backToEntrance: "Torna all’Ingresso",
    ecosystemTitle: "Punti di Accesso della Piattaforma",
    ecosystemText:
      "Questi punti di ingresso basati sui ruoli mostrano come l’ecosistema Bronson Family Farm funziona nella pratica tra coinvolgimento pubblico, accesso al mercato, pianificazione produttiva, partecipazione giovanile e supporto supervisionato.",
    guest: "Ospite",
    guestText: "Informazioni pubbliche, eventi, storia e accesso per partner.",
    customer: "Cliente",
    customerText:
      "Accesso al mercato, educazione alimentare, orientamento nutrizionale e strumenti di coinvolgimento clienti.",
    grower: "Coltivatore",
    growerText:
      "Pianificazione delle colture, coordinamento della produzione, monitoraggio stagionale e percorsi di supporto per coltivatori.",
    youth: "Forza Lavoro Giovanile",
    youthText:
      "Accesso alla formazione, percorsi di apprendimento, partecipazione supervisionata e strumenti di preparazione al lavoro.",
    supervisor: "Supervisore",
    supervisorText:
      "Supervisione del lavoro giovanile, coordinamento del supporto, visibilità dei progressi e gestione delle risorse.",
    guideText:
      "Benvenuti a Bronson Family Farm. State entrando in un ecosistema reale attualmente in fase di implementazione attiva. Questa piattaforma supporta accesso al cibo, coordinamento dei coltivatori, coinvolgimento dei clienti, percorsi di lavoro giovanile e connessione comunitaria.",
    enterRole: "Entra nel Punto di Accesso",
    heroBadge: "Ecosistema Attivo",
    overview: "Panoramica",
    highlights: "Punti Chiave",
    actions: "Azioni",
    openMarketplace: "Apri Accesso Marketplace",
    viewEvents: "Visualizza Eventi e Accesso Pubblico",
    explorePlanning: "Apri Strumenti di Pianificazione",
    openYouthHub: "Apri Hub Giovanile",
    supervisorArea: "Apri Supporto Supervisore",
    guestTitle: "Punto di Accesso Ospite",
    guestLead:
      "Un ingresso pubblico a Bronson Family Farm con storia, eventi, aggiornamenti, partnership e connessione comunitaria.",
    customerTitle: "Punto di Accesso Cliente",
    customerLead:
      "Un percorso centrato sul cliente per attività di marketplace, scoperta di cibo sano, educazione nutrizionale, ricette e coinvolgimento continuativo.",
    growerTitle: "Punto di Accesso Coltivatore",
    growerLead:
      "Uno spazio operativo per pianificazione delle colture, tempi di produzione, coordinamento dei coltivatori, preparazione stagionale e supporto decisionale sul campo.",
    youthTitle: "Punto di Accesso Forza Lavoro Giovanile",
    youthLead:
      "Un percorso strutturato per apprendimento, partecipazione supervisionata, preparazione al lavoro, mentoring ed esperienza pratica in fattoria.",
    supervisorTitle: "Punto di Accesso Supporto Supervisore",
    supervisorLead:
      "Uno spazio gestionale dedicato al supporto della forza lavoro giovanile, programmazione, supervisione, monitoraggio dei progressi e visibilità delle risorse.",
  },
  pat: {
    eyebrow: "Bronson Family Farm",
    title: "Enter di Bronson Family Farm Ecosystem.",
    subtitle:
      "Dis ya demo a one guided view into a real ecosystem weh a get implement right now through Bronson Family Farm. It show how di platform support customer access, grower coordination, youth workforce pathways, an community connection.",
    credibility:
      "Dis demo no be no concept board. A one guided view into a real ecosystem weh a get actively implement right now.",
    enter: "Open di Live Ecosystem",
    tour: "Tek di Guided Walkthrough",
    language: "Language",
    back: "Go Back",
    backToEntrance: "Back to Entrance",
    ecosystemTitle: "Platform Access Points",
    ecosystemText:
      "Dem role-based entry points yah show how di Bronson Family Farm ecosystem function in practice across public engagement, marketplace access, production planning, youth workforce participation, an supervised support.",
    guest: "Guest",
    guestText: "Public information, events, story, an partner-facing access.",
    customer: "Customer",
    customerText:
      "Marketplace access, food education, nutrition guidance, an customer engagement tools.",
    grower: "Grower",
    growerText:
      "Crop planning, production coordination, seasonal tracking, an grower support pathways.",
    youth: "Youth Workforce",
    youthText:
      "Training access, learning pathways, supervised participation, an workforce readiness tools.",
    supervisor: "Supervisor",
    supervisorText:
      "Youth workforce oversight, support coordination, progress visibility, an resource management.",
    guideText:
      "Welcome to Bronson Family Farm. Yuh a enter a real ecosystem weh a get actively implement right now. Dis platform support food access, grower coordination, customer engagement, youth workforce pathways, an community connection.",
    enterRole: "Enter Access Point",
    heroBadge: "Active Ecosystem",
    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",
    openMarketplace: "Open Marketplace Access",
    viewEvents: "View Events an Public Access",
    explorePlanning: "Open Grower Planning Tools",
    openYouthHub: "Open Youth Workforce Hub",
    supervisorArea: "Open Supervisor Support",
    guestTitle: "Guest Access Point",
    guestLead:
      "A public-facing entry into Bronson Family Farm fi story, events, updates, partnerships, an community connection.",
    customerTitle: "Customer Access Point",
    customerLead:
      "A customer-centered path fi marketplace activity, healthy food discovery, nutrition education, recipes, an repeat engagement.",
    growerTitle: "Grower Access Point",
    growerLead:
      "A operational space fi crop planning, production timing, grower coordination, seasonal readiness, an field decision support.",
    youthTitle: "Youth Workforce Access Point",
    youthLead:
      "A structured pathway fi learning, supervised participation, work readiness, mentoring, an practical farm experience.",
    supervisorTitle: "Supervisor Support Access Point",
    supervisorLead:
      "A dedicated management space fi youth workforce support, scheduling, oversight, progress tracking, an resource visibility.",
  },
  he: {
    eyebrow: "Bronson Family Farm",
    title: "היכנסו לאקוסיסטם של Bronson Family Farm.",
    subtitle:
      "הדמו הזה הוא מבט מודרך אל אקוסיסטם אמיתי שכבר מיושם כעת דרך Bronson Family Farm. הוא מראה כיצד הפלטפורמה תומכת בגישת לקוחות, תיאום מגדלים, מסלולי כוח עבודה לנוער וחיבור קהילתי.",
    credibility:
      "הדמו הזה אינו לוח רעיונות. זהו מבט מודרך אל אקוסיסטם אמיתי שנמצא ביישום פעיל כעת.",
    enter: "פתחו את האקוסיסטם הפעיל",
    tour: "התחילו סיור מודרך",
    language: "שפה",
    back: "חזרה",
    backToEntrance: "חזרה לכניסה",
    ecosystemTitle: "נקודות גישה לפלטפורמה",
    ecosystemText:
      "נקודות הכניסה המבוססות-תפקיד הללו מראות כיצד אקוסיסטם Bronson Family Farm פועל בפועל דרך מעורבות ציבורית, גישת שוק, תכנון ייצור, השתתפות נוער ותמיכה בפיקוח.",
    guest: "אורח",
    guestText: "מידע ציבורי, אירועים, סיפור וגישה עבור שותפים.",
    customer: "לקוח",
    customerText:
      "גישת שוק, חינוך תזונתי, הכוונה תזונתית וכלי מעורבות לקוחות.",
    grower: "מגדל",
    growerText:
      "תכנון גידולים, תיאום ייצור, מעקב עונתי ומסלולי תמיכה למגדלים.",
    youth: "כוח עבודה לנוער",
    youthText:
      "גישה להכשרה, מסלולי למידה, השתתפות בפיקוח וכלי מוכנות לעבודה.",
    supervisor: "מפקח",
    supervisorText:
      "פיקוח על כוח עבודה לנוער, תיאום תמיכה, נראות התקדמות וניהול משאבים.",
    guideText:
      "ברוכים הבאים ל-Bronson Family Farm. אתם נכנסים לאקוסיסטם אמיתי שנמצא כעת ביישום פעיל. הפלטפורמה הזו תומכת בגישה למזון, תיאום מגדלים, מעורבות לקוחות, מסלולי כוח עבודה לנוער וחיבור קהילתי.",
    enterRole: "כניסה לנקודת הגישה",
    heroBadge: "אקוסיסטם פעיל",
    overview: "סקירה",
    highlights: "נקודות עיקריות",
    actions: "פעולות",
    openMarketplace: "פתחו גישת שוק",
    viewEvents: "צפו באירועים וגישה ציבורית",
    explorePlanning: "פתחו כלי תכנון למגדלים",
    openYouthHub: "פתחו מרכז נוער",
    supervisorArea: "פתחו תמיכת מפקח",
    guestTitle: "נקודת גישה לאורח",
    guestLead:
      "כניסה ציבורית אל Bronson Family Farm עם סיפור, אירועים, עדכונים, שותפויות וחיבור קהילתי.",
    customerTitle: "נקודת גישה ללקוח",
    customerLead:
      "מסלול ממוקד-לקוח עבור פעילות שוק, גילוי מזון בריא, חינוך תזונתי, מתכונים ומעורבות חוזרת.",
    growerTitle: "נקודת גישה למגדל",
    growerLead:
      "מרחב תפעולי עבור תכנון גידולים, תזמון ייצור, תיאום מגדלים, מוכנות עונתית ותמיכה בהחלטות בשטח.",
    youthTitle: "נקודת גישה לכוח עבודה לנוער",
    youthLead:
      "מסלול מובנה ללמידה, השתתפות בפיקוח, מוכנות לעבודה, חונכות וניסיון מעשי בחווה.",
    supervisorTitle: "נקודת גישה לתמיכת מפקח",
    supervisorLead:
      "מרחב ניהולי ייעודי לתמיכה בכוח העבודה לנוער, תזמון, פיקוח, מעקב התקדמות ונראות משאבים.",
  },
} as const;

function InfoPanel({
  labels,
  title,
  lead,
  bullets,
  actions,
}: {
  labels: { overview: string; highlights: string; actions: string };
  title: string;
  lead: string;
  bullets: string[];
  actions: string[];
}) {
  return (
    <div className="detail-grid">
      <div className="detail-main card-glass">
        <div className="section-label">{labels.overview}</div>
        <h2 className="detail-title">{title}</h2>
        <p className="detail-lead">{lead}</p>
      </div>

      <div className="detail-side">
        <div className="card-glass">
          <div className="section-label">{labels.highlights}</div>
          <div className="bullet-list">
            {bullets.map((item) => (
              <div className="bullet-item" key={item}>
                <span className="bullet-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-glass">
          <div className="section-label">{labels.actions}</div>
          <div className="action-stack">
            {actions.map((action) => (
              <button key={action} className="ghost-action" type="button">
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<ViewMode>("entrance");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const t = useMemo(() => copy[language], [language]);

  const heroImage = "/GrowArea.jpg";
  const pathwayImage = "/GrowArea2.jpg";

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const startGuidedTour = () => {
    const utterance = new SpeechSynthesisUtterance(t.guideText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.lang =
      language === "es"
        ? "es-ES"
        : language === "tl"
        ? "fil-PH"
        : language === "it"
        ? "it-IT"
        : language === "he"
        ? "he-IL"
        : "en-US";

    speechRef.current = utterance;
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
      setView("ecosystem");
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopGuidedTour = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const renderRoleView = () => {
    if (view === "guest") {
      return (
        <section
          className="role-page role-guest"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9,13,10,0.90), rgba(15,18,15,0.97)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.guestTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.back}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={{
                overview: t.overview,
                highlights: t.highlights,
                actions: t.actions,
              }}
              title={t.guestTitle}
              lead={t.guestLead}
              bullets={[
                "Story, updates, and public-facing communication",
                "Events, visits, and partnership visibility",
                "Welcoming entry into the active ecosystem",
              ]}
              actions={[t.viewEvents, t.backToEntrance]}
            />
          </div>
        </section>
      );
    }

    if (view === "customer") {
      return (
        <section
          className="role-page role-customer"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(16,11,7,0.88), rgba(14,16,11,0.96)), url("${heroImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.customerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.back}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={{
                overview: t.overview,
                highlights: t.highlights,
                actions: t.actions,
              }}
              title={t.customerTitle}
              lead={t.customerLead}
              bullets={[
                "Marketplace access and purchase flow",
                "Nutrition education and recipe guidance",
                "Customer relationship and repeat engagement",
              ]}
              actions={[t.openMarketplace, "Nutrition & Recipes", t.backToEntrance]}
            />
          </div>
        </section>
      );
    }

    if (view === "grower") {
      return (
        <section
          className="role-page role-grower"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(8,14,10,0.90), rgba(12,19,12,0.98)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.growerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.back}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={{
                overview: t.overview,
                highlights: t.highlights,
                actions: t.actions,
              }}
              title={t.growerTitle}
              lead={t.growerLead}
              bullets={[
                "Seasonal timing and crop planning",
                "Production flow and grower coordination",
                "Field-based practical decision support",
              ]}
              actions={[t.explorePlanning, "Production Pathways", t.backToEntrance]}
            />
          </div>
        </section>
      );
    }

    if (view === "youth") {
      return (
        <section
          className="role-page role-youth"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(18,10,6,0.88), rgba(14,18,10,0.98)), url("${heroImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.youthTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>
                  {t.back}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={{
                overview: t.overview,
                highlights: t.highlights,
                actions: t.actions,
              }}
              title={t.youthTitle}
              lead={t.youthLead}
              bullets={[
                "Hands-on learning and work readiness",
                "Mentoring, participation, and practical growth",
                "Supervisor support connected only to this program",
              ]}
              actions={[t.openYouthHub, t.supervisorArea, t.backToEntrance]}
            />

            <div className="nested-panel card-glass youth-nested">
              <div className="section-label">{t.supervisor}</div>
              <h3 className="nested-title">{t.supervisorTitle}</h3>
              <p className="nested-copy">{t.supervisorLead}</p>
              <button className="primary nested-btn" onClick={() => setView("supervisor")}>
                {t.supervisorArea}
              </button>
            </div>
          </div>
        </section>
      );
    }

    if (view === "supervisor") {
      return (
        <section
          className="role-page role-supervisor"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(20,10,25,0.90), rgba(12,14,18,1)), url("${pathwayImage}")`,
          }}
        >
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.supervisorTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("youth")}>
                  {t.back}
                </button>
              </div>
            </div>

            <InfoPanel
              labels={{
                overview: t.overview,
                highlights: t.highlights,
                actions: t.actions,
              }}
              title={t.supervisorTitle}
              lead={t.supervisorLead}
              bullets={[
                "Daily youth support coordination",
                "Mentoring, oversight, and progress visibility",
                "Support staff and resource awareness",
              ]}
              actions={["Support Resources", "Daily Coordination", "Return to Youth Workforce"]}
            />
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
          background: #0b0d0b;
          font-family: Georgia, "Times New Roman", serif;
        }

        body {
          color: white;
        }

        .page {
          min-height: 100vh;
          width: 100%;
          background: #0b0d0b;
        }

        .entrance {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoom 22s ease-in-out infinite alternate;
          transform: scale(1.03);
        }

        .bg-path {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.22;
          mix-blend-mode: screen;
          animation: drift 28s ease-in-out infinite alternate;
        }

        .forest-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 246, 214, 0.16), transparent 24%),
            radial-gradient(circle at 78% 22%, rgba(138, 92, 179, 0.16), transparent 28%),
            radial-gradient(circle at 68% 76%, rgba(185, 73, 61, 0.14), transparent 24%),
            radial-gradient(circle at 22% 80%, rgba(226, 159, 63, 0.14), transparent 22%),
            radial-gradient(circle at 50% 55%, rgba(90, 123, 79, 0.16), transparent 30%);
          animation: hueShift 20s ease-in-out infinite alternate;
        }

        .shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(16, 31, 19, 0.70) 0%,
              rgba(74, 56, 30, 0.46) 28%,
              rgba(122, 63, 22, 0.34) 52%,
              rgba(78, 42, 97, 0.30) 74%,
              rgba(11, 15, 12, 0.72) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(7, 10, 7, 0.30),
              rgba(7, 10, 7, 0.56),
              rgba(7, 10, 7, 0.88)
            ),
            radial-gradient(
              circle at center,
              rgba(255, 251, 239, 0.07),
              rgba(0, 0, 0, 0.24) 52%,
              rgba(0, 0, 0, 0.48) 100%
            );
        }

        .topbar {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 24px 28px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 11px;
          color: rgba(255,255,255,0.95);
          box-shadow: 0 8px 24px rgba(0,0,0,0.16);
        }

        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .select,
        .ghost-btn,
        .ghost-action {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(10,10,10,0.28);
          color: white;
          padding: 10px 16px;
          font-size: 14px;
          backdrop-filter: blur(12px);
        }

        .ghost-btn,
        .ghost-action {
          cursor: pointer;
        }

        .content {
          position: relative;
          z-index: 2;
          min-height: calc(100vh - 86px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
        }

        .inner {
          width: 100%;
          max-width: 1080px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.20);
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.90);
          box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        }

        h1 {
          margin: 0;
          font-size: clamp(44px, 7vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          font-weight: 600;
          text-shadow: 0 5px 18px rgba(0,0,0,0.34);
        }

        .copy {
          margin: 22px auto 0;
          max-width: 900px;
          font-size: clamp(19px, 2vw, 28px);
          line-height: 1.7;
          color: rgba(255,255,255,0.90);
          text-shadow: 0 2px 10px rgba(0,0,0,0.24);
        }

        .credibility {
          margin: 20px auto 0;
          max-width: 860px;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.78);
          letter-spacing: 0.01em;
        }

        .buttons {
          margin-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
        }

        button {
          border: none;
          border-radius: 999px;
          padding: 15px 24px;
          font-size: 15px;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease,
            background 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .primary {
          background: linear-gradient(135deg, #fffaf0, #eeddb7);
          color: #201f16;
          font-weight: 700;
          box-shadow: 0 12px 28px rgba(18, 10, 4, 0.24);
        }

        .primary:hover {
          box-shadow: 0 16px 34px rgba(18, 10, 4, 0.30);
        }

        .secondary {
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.24);
          backdrop-filter: blur(10px);
        }

        .secondary:hover,
        .ghost-btn:hover,
        .ghost-action:hover {
          background: rgba(255,255,255,0.16);
        }

        .ecosystem,
        .role-page {
          min-height: 100vh;
          padding: 36px 24px 50px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          position: relative;
          overflow: hidden;
        }

        .ecosystem::before,
        .role-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 20%, rgba(255, 244, 210, 0.10), transparent 24%),
            radial-gradient(circle at 78% 16%, rgba(132, 85, 176, 0.12), transparent 28%),
            radial-gradient(circle at 70% 78%, rgba(190, 78, 58, 0.10), transparent 22%),
            radial-gradient(circle at 20% 82%, rgba(221, 151, 57, 0.10), transparent 22%);
          pointer-events: none;
        }

        .ecosystem-wrap,
        .role-wrap {
          max-width: 1220px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ecosystem-head,
        .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }

        .ecosystem-title,
        .role-page-title {
          font-size: clamp(34px, 5vw, 62px);
          line-height: 1.02;
          margin: 0;
        }

        .ecosystem-copy {
          max-width: 860px;
          margin-top: 10px;
          font-size: 19px;
          line-height: 1.7;
          color: rgba(255,255,255,0.84);
        }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .role-card,
        .card-glass {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(14px);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 16px 42px rgba(0,0,0,0.22);
        }

        .role-card {
          min-height: 270px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .role-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.22);
          box-shadow: 0 22px 48px rgba(0,0,0,0.26);
          background: rgba(255,255,255,0.12);
        }

        .role-card:nth-child(1) {
          box-shadow: 0 16px 42px rgba(216, 216, 216, 0.06), 0 16px 42px rgba(0,0,0,0.20);
        }

        .role-card:nth-child(2) {
          box-shadow: 0 16px 42px rgba(215, 156, 54, 0.09), 0 16px 42px rgba(0,0,0,0.20);
        }

        .role-card:nth-child(3) {
          box-shadow: 0 16px 42px rgba(80, 130, 76, 0.10), 0 16px 42px rgba(0,0,0,0.20);
        }

        .role-card:nth-child(4) {
          box-shadow: 0 16px 42px rgba(191, 96, 42, 0.10), 0 16px 42px rgba(0,0,0,0.20);
        }

        .role-name {
          font-size: 24px;
          margin: 0 0 12px;
        }

        .role-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.80);
          margin: 0;
        }

        .role-link {
          margin-top: 18px;
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.90;
          cursor: pointer;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 18px;
        }

        .detail-side {
          display: grid;
          gap: 18px;
        }

        .section-label {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          color: rgba(255,255,255,0.64);
          margin-bottom: 14px;
        }

        .detail-title {
          font-size: clamp(28px, 4vw, 50px);
          line-height: 1.05;
          margin: 0 0 12px;
        }

        .detail-lead,
        .nested-copy {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.84);
          margin: 0;
        }

        .bullet-list {
          display: grid;
          gap: 14px;
        }

        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(255,255,255,0.84);
          line-height: 1.7;
          font-size: 16px;
        }

        .bullet-dot {
          width: 10px;
          height: 10px;
          margin-top: 9px;
          border-radius: 999px;
          background: linear-gradient(135deg, #fff7d7, #e1983a);
          flex: 0 0 auto;
          box-shadow: 0 0 10px rgba(226, 159, 63, 0.22);
        }

        .action-stack {
          display: grid;
          gap: 12px;
        }

        .ghost-action {
          text-align: left;
          width: 100%;
        }

        .nested-panel {
          margin-top: 18px;
        }

        .nested-title {
          margin: 0 0 10px;
          font-size: 30px;
        }

        .nested-btn {
          margin-top: 18px;
        }

        .youth-nested {
          border-color: rgba(226, 159, 63, 0.20);
          box-shadow: 0 16px 42px rgba(226, 159, 63, 0.08), 0 16px 42px rgba(0,0,0,0.22);
        }

        @keyframes zoom {
          0% { transform: scale(1.03); }
          100% { transform: scale(1.09); }
        }

        @keyframes drift {
          0% { transform: scale(1.05) translateY(0px); }
          100% { transform: scale(1.11) translateY(-10px); }
        }

        @keyframes hueShift {
          0% { opacity: 0.88; filter: saturate(100%); }
          50% { opacity: 1; filter: saturate(112%); }
          100% { opacity: 0.92; filter: saturate(104%); }
        }

        @media (max-width: 1050px) {
          .role-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .topbar,
          .ecosystem-head,
          .role-header {
            flex-direction: column;
            align-items: stretch;
          }

          .buttons {
            flex-direction: column;
          }

          button,
          .select,
          .ghost-btn {
            width: 100%;
          }

          .role-grid {
            grid-template-columns: 1fr;
          }

          .content {
            padding: 18px;
          }

          .credibility {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="page">
        {view === "entrance" ? (
          <section className="entrance">
            <img src={heroImage} alt="Farm entrance" className="bg" />
            <img src={pathwayImage} alt="" className="bg-path" />
            <div className="forest-wash" />
            <div className="shade" />

            <div className="topbar">
              <div className="brand">{t.eyebrow}</div>

              <div className="controls">
                <select
                  className="select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  aria-label={t.language}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="tl">Tagalog</option>
                  <option value="it">Italiano</option>
                  <option value="pat">Patwa</option>
                  <option value="he">עברית</option>
                </select>

                {isSpeaking ? (
                  <button className="ghost-btn" onClick={stopGuidedTour}>
                    Stop Voice
                  </button>
                ) : null}
              </div>
            </div>

            <div className="content">
              <div className="inner">
                <div className="eyebrow">{t.heroBadge}</div>
                <h1>{t.title}</h1>
                <div className="copy">{t.subtitle}</div>
                <div className="credibility">{t.credibility}</div>

                <div className="buttons">
                  <button className="primary" onClick={() => setView("ecosystem")}>
                    {t.enter}
                  </button>
                  <button className="secondary" onClick={startGuidedTour}>
                    {t.tour}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : view === "ecosystem" ? (
          <section
            className="ecosystem"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)), url("${pathwayImage}")`,
            }}
          >
            <div className="ecosystem-wrap">
              <div className="ecosystem-head">
                <div>
                  <div className="eyebrow">{t.eyebrow}</div>
                  <h2 className="ecosystem-title">{t.ecosystemTitle}</h2>
                  <div className="ecosystem-copy">{t.ecosystemText}</div>
                </div>

                <div className="controls">
                  <select
                    className="select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                    aria-label={t.language}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="tl">Tagalog</option>
                    <option value="it">Italiano</option>
                    <option value="pat">Patwa</option>
                    <option value="he">עברית</option>
                  </select>

                  <button className="ghost-btn" onClick={() => setView("entrance")}>
                    {t.backToEntrance}
                  </button>
                </div>
              </div>

              <div className="role-grid">
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.guest}</h3>
                    <p className="role-text">{t.guestText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("guest")}>
                    {t.enterRole}
                  </a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.customer}</h3>
                    <p className="role-text">{t.customerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("customer")}>
                    {t.enterRole}
                  </a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.grower}</h3>
                    <p className="role-text">{t.growerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("grower")}>
                    {t.enterRole}
                  </a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.youth}</h3>
                    <p className="role-text">{t.youthText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("youth")}>
                    {t.enterRole}
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : (
          renderRoleView()
        )}
      </div>
    </>
  );
}
