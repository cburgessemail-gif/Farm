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
    title: "Experience something different.",
    subtitle:
      "Step into a living ecosystem of regenerative farming, community wellness, workforce development, and local food access.",
    enter: "Enter the Ecosystem",
    tour: "Start Guided Tour",
    language: "Language",
    back: "Back",
    backToEntrance: "Back to Entrance",
    ecosystemTitle: "Choose Your Path",
    ecosystemText:
      "Explore the farm through role-based experiences designed for community, commerce, learning, and growth.",
    guest: "Guest",
    guestText:
      "Discover the story, events, and public-facing experience of the farm.",
    customer: "Customer",
    customerText:
      "Shop, learn about food and nutrition, and connect to the marketplace.",
    grower: "Grower",
    growerText:
      "View crops, planning, production pathways, and grower opportunities.",
    youth: "Youth Workforce",
    youthText:
      "Explore training, pathways, mentoring, and supportive supervision.",
    supervisor: "Supervisor",
    supervisorText:
      "Support youth workforce operations, guidance, and resource coordination.",
    guideText:
      "Welcome to Bronson Family Farm. Step into a living ecosystem of regenerative farming, workforce development, family wellness, and local food access.",
    enterRole: "Enter Role",
    heroBadge: "Step Into the Farm",
    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",
    openMarketplace: "Open Marketplace",
    viewEvents: "View Events",
    explorePlanning: "Explore Planning",
    openYouthHub: "Open Youth Hub",
    supervisorArea: "Supervisor Area",
    guestTitle: "Guest Experience",
    guestLead:
      "A welcoming public view into the story, events, partnerships, and regenerative vision of Bronson Family Farm.",
    customerTitle: "Customer Experience",
    customerLead:
      "A customer path focused on shopping, food education, nutrition guidance, recipes, and return visits to the marketplace.",
    growerTitle: "Grower Experience",
    growerLead:
      "A production-focused space for crop pathways, seasonal planning, grower coordination, and practical field intelligence.",
    youthTitle: "Youth Workforce Experience",
    youthLead:
      "A pathway for learning, participation, job readiness, mentoring, and supervised growth within the farm ecosystem.",
    supervisorTitle: "Supervisor Support View",
    supervisorLead:
      "A dedicated support view for youth workforce supervision, daily coordination, support resources, and progress monitoring.",
  },
  es: {
    eyebrow: "Bronson Family Farm",
    title: "Vive algo diferente.",
    subtitle:
      "Entra en un ecosistema vivo de agricultura regenerativa, bienestar comunitario, desarrollo laboral y acceso a alimentos locales.",
    enter: "Entrar al Ecosistema",
    tour: "Iniciar Recorrido Guiado",
    language: "Idioma",
    back: "Volver",
    backToEntrance: "Volver a la Entrada",
    ecosystemTitle: "Elige Tu Camino",
    ecosystemText:
      "Explora la finca mediante experiencias por roles diseñadas para comunidad, comercio, aprendizaje y crecimiento.",
    guest: "Invitado",
    guestText:
      "Descubre la historia, los eventos y la experiencia pública de la finca.",
    customer: "Cliente",
    customerText:
      "Compra, aprende sobre alimentos y nutrición, y conéctate al mercado.",
    grower: "Productor",
    growerText:
      "Ve cultivos, planificación, rutas de producción y oportunidades para productores.",
    youth: "Fuerza Laboral Juvenil",
    youthText:
      "Explora formación, trayectorias, mentoría y supervisión de apoyo.",
    supervisor: "Supervisor",
    supervisorText:
      "Apoya las operaciones juveniles, la orientación y la coordinación de recursos.",
    guideText:
      "Bienvenido a Bronson Family Farm. Entra en un ecosistema vivo de agricultura regenerativa, desarrollo laboral, bienestar familiar y acceso a alimentos locales.",
    enterRole: "Entrar al Rol",
    heroBadge: "Entra a la Finca",
    overview: "Resumen",
    highlights: "Aspectos Clave",
    actions: "Acciones",
    openMarketplace: "Abrir Mercado",
    viewEvents: "Ver Eventos",
    explorePlanning: "Explorar Planificación",
    openYouthHub: "Abrir Centro Juvenil",
    supervisorArea: "Área de Supervisor",
    guestTitle: "Experiencia del Invitado",
    guestLead:
      "Una vista pública y acogedora de la historia, los eventos, las alianzas y la visión regenerativa de Bronson Family Farm.",
    customerTitle: "Experiencia del Cliente",
    customerLead:
      "Un recorrido del cliente centrado en compras, educación alimentaria, nutrición, recetas y regreso al mercado.",
    growerTitle: "Experiencia del Productor",
    growerLead:
      "Un espacio centrado en producción para cultivos, planificación estacional, coordinación de productores e inteligencia práctica del campo.",
    youthTitle: "Experiencia de Fuerza Laboral Juvenil",
    youthLead:
      "Una ruta para aprendizaje, participación, preparación laboral, mentoría y crecimiento supervisado dentro del ecosistema agrícola.",
    supervisorTitle: "Vista de Apoyo del Supervisor",
    supervisorLead:
      "Una vista dedicada para supervisión juvenil, coordinación diaria, recursos de apoyo y seguimiento del progreso.",
  },
  tl: {
    eyebrow: "Bronson Family Farm",
    title: "Makaranas ng kakaiba.",
    subtitle:
      "Pumasok sa isang buhay na ekosistema ng regenerative farming, community wellness, workforce development, at local food access.",
    enter: "Pumasok sa Ecosystem",
    tour: "Simulan ang Guided Tour",
    language: "Wika",
    back: "Bumalik",
    backToEntrance: "Bumalik sa Entrance",
    ecosystemTitle: "Piliin ang Iyong Daan",
    ecosystemText:
      "Tuklasin ang farm sa pamamagitan ng role-based experiences para sa komunidad, kalakalan, pagkatuto, at paglago.",
    guest: "Bisita",
    guestText:
      "Tuklasin ang kuwento, mga event, at pampublikong karanasan ng farm.",
    customer: "Customer",
    customerText:
      "Mamili, matuto tungkol sa pagkain at nutrisyon, at kumonekta sa marketplace.",
    grower: "Grower",
    growerText:
      "Tingnan ang mga pananim, pagpaplano, production pathways, at grower opportunities.",
    youth: "Youth Workforce",
    youthText:
      "Tuklasin ang training, pathways, mentoring, at supportive supervision.",
    supervisor: "Supervisor",
    supervisorText:
      "Suporta sa youth workforce operations, guidance, at resource coordination.",
    guideText:
      "Maligayang pagdating sa Bronson Family Farm. Pumasok sa isang buhay na ekosistema ng regenerative farming, workforce development, family wellness, at local food access.",
    enterRole: "Pumasok sa Role",
    heroBadge: "Pumasok sa Farm",
    overview: "Pangkalahatang-ideya",
    highlights: "Mahahalagang Bahagi",
    actions: "Mga Gawain",
    openMarketplace: "Buksan ang Marketplace",
    viewEvents: "Tingnan ang Events",
    explorePlanning: "Tuklasin ang Planning",
    openYouthHub: "Buksan ang Youth Hub",
    supervisorArea: "Supervisor Area",
    guestTitle: "Guest Experience",
    guestLead:
      "Isang pampublikong tanaw sa kuwento, events, partnerships, at regenerative vision ng Bronson Family Farm.",
    customerTitle: "Customer Experience",
    customerLead:
      "Isang customer path para sa shopping, food education, nutrition guidance, recipes, at balik-bisita sa marketplace.",
    growerTitle: "Grower Experience",
    growerLead:
      "Isang production-focused na space para sa crop pathways, seasonal planning, grower coordination, at field intelligence.",
    youthTitle: "Youth Workforce Experience",
    youthLead:
      "Isang daan para sa learning, participation, job readiness, mentoring, at supervised growth sa farm ecosystem.",
    supervisorTitle: "Supervisor Support View",
    supervisorLead:
      "Isang dedicated na view para sa youth workforce supervision, daily coordination, support resources, at progress monitoring.",
  },
  it: {
    eyebrow: "Bronson Family Farm",
    title: "Vivi qualcosa di diverso.",
    subtitle:
      "Entra in un ecosistema vivo di agricoltura rigenerativa, benessere della comunità, sviluppo della forza lavoro e accesso al cibo locale.",
    enter: "Entra nell’Ecosistema",
    tour: "Avvia Tour Guidato",
    language: "Lingua",
    back: "Indietro",
    backToEntrance: "Torna all’Ingresso",
    ecosystemTitle: "Scegli il Tuo Percorso",
    ecosystemText:
      "Esplora la fattoria attraverso esperienze per ruolo pensate per comunità, commercio, apprendimento e crescita.",
    guest: "Ospite",
    guestText:
      "Scopri la storia, gli eventi e l’esperienza pubblica della fattoria.",
    customer: "Cliente",
    customerText:
      "Acquista, impara su cibo e nutrizione, e collegati al marketplace.",
    grower: "Coltivatore",
    growerText:
      "Esplora colture, pianificazione, percorsi produttivi e opportunità per coltivatori.",
    youth: "Forza Lavoro Giovanile",
    youthText:
      "Esplora formazione, percorsi, mentoring e supervisione di supporto.",
    supervisor: "Supervisore",
    supervisorText:
      "Supporta le operazioni giovanili, la guida e il coordinamento delle risorse.",
    guideText:
      "Benvenuti a Bronson Family Farm. Entra in un ecosistema vivo di agricoltura rigenerativa, sviluppo della forza lavoro, benessere familiare e accesso al cibo locale.",
    enterRole: "Entra nel Ruolo",
    heroBadge: "Entra nella Fattoria",
    overview: "Panoramica",
    highlights: "Punti Chiave",
    actions: "Azioni",
    openMarketplace: "Apri Marketplace",
    viewEvents: "Visualizza Eventi",
    explorePlanning: "Esplora Pianificazione",
    openYouthHub: "Apri Hub Giovanile",
    supervisorArea: "Area Supervisore",
    guestTitle: "Esperienza Ospite",
    guestLead:
      "Una vista pubblica e accogliente sulla storia, gli eventi, le partnership e la visione rigenerativa di Bronson Family Farm.",
    customerTitle: "Esperienza Cliente",
    customerLead:
      "Un percorso cliente orientato ad acquisti, educazione alimentare, nutrizione, ricette e ritorno al marketplace.",
    growerTitle: "Esperienza Coltivatore",
    growerLead:
      "Uno spazio orientato alla produzione per colture, pianificazione stagionale, coordinamento coltivatori e intelligenza pratica di campo.",
    youthTitle: "Esperienza Forza Lavoro Giovanile",
    youthLead:
      "Un percorso per apprendimento, partecipazione, preparazione al lavoro, mentoring e crescita supervisionata nell’ecosistema agricolo.",
    supervisorTitle: "Vista di Supporto Supervisore",
    supervisorLead:
      "Una vista dedicata per supervisione giovanile, coordinamento quotidiano, risorse di supporto e monitoraggio dei progressi.",
  },
  pat: {
    eyebrow: "Bronson Family Farm",
    title: "Step ina someting different.",
    subtitle:
      "Come eena one livin ecosystem a regenerative farming, community wellness, workforce development, an local food access.",
    enter: "Enter di Ecosystem",
    tour: "Start Guided Tour",
    language: "Language",
    back: "Go Back",
    backToEntrance: "Go Back to Entrance",
    ecosystemTitle: "Choose Yuh Path",
    ecosystemText:
      "Explore di farm through role-based experiences fi community, commerce, learning, an growth.",
    guest: "Guest",
    guestText:
      "Discover di story, di events, an di public-facing farm experience.",
    customer: "Customer",
    customerText:
      "Shop, learn bout food an nutrition, an connect to di marketplace.",
    grower: "Grower",
    growerText:
      "See crops, planning, production pathways, an grower opportunities.",
    youth: "Youth Workforce",
    youthText:
      "Explore training, pathways, mentoring, an supportive supervision.",
    supervisor: "Supervisor",
    supervisorText:
      "Support youth workforce operation, guidance, an resource coordination.",
    guideText:
      "Welcome to Bronson Family Farm. Step eena one livin ecosystem a regenerative farming, workforce development, family wellness, an local food access.",
    enterRole: "Enter Role",
    heroBadge: "Step Ina di Farm",
    overview: "Overview",
    highlights: "Highlights",
    actions: "Actions",
    openMarketplace: "Open Marketplace",
    viewEvents: "View Events",
    explorePlanning: "Explore Planning",
    openYouthHub: "Open Youth Hub",
    supervisorArea: "Supervisor Area",
    guestTitle: "Guest Experience",
    guestLead:
      "A warm public view ina di story, events, partnerships, an regenerative vision a Bronson Family Farm.",
    customerTitle: "Customer Experience",
    customerLead:
      "A customer path fi shopping, food education, nutrition guidance, recipes, an return visits to di marketplace.",
    growerTitle: "Grower Experience",
    growerLead:
      "A production-focused space fi crop pathways, seasonal planning, grower coordination, an practical field intelligence.",
    youthTitle: "Youth Workforce Experience",
    youthLead:
      "A pathway fi learning, participation, job readiness, mentoring, an supervised growth eena di farm ecosystem.",
    supervisorTitle: "Supervisor Support View",
    supervisorLead:
      "A dedicated support view fi youth workforce supervision, daily coordination, support resources, an progress monitoring.",
  },
  he: {
    eyebrow: "Bronson Family Farm",
    title: "לחוות משהו שונה.",
    subtitle:
      "היכנסו למערכת חיה של חקלאות רגנרטיבית, רווחת קהילה, פיתוח כוח עבודה וגישה למזון מקומי.",
    enter: "כניסה לאקוסיסטם",
    tour: "התחל סיור מודרך",
    language: "שפה",
    back: "חזרה",
    backToEntrance: "חזרה לכניסה",
    ecosystemTitle: "בחרו את המסלול שלכם",
    ecosystemText:
      "גלו את החווה דרך חוויות מבוססות תפקיד לקהילה, מסחר, למידה וצמיחה.",
    guest: "אורח",
    guestText:
      "גלו את הסיפור, האירועים והחוויה הציבורית של החווה.",
    customer: "לקוח",
    customerText:
      "קנו, למדו על מזון ותזונה, והתחברו לשוק.",
    grower: "מגדל",
    growerText:
      "צפו בגידולים, בתכנון, במסלולי ייצור ובהזדמנויות למגדלים.",
    youth: "כוח עבודה לנוער",
    youthText:
      "גלו הכשרה, מסלולים, חונכות ופיקוח תומך.",
    supervisor: "מפקח",
    supervisorText:
      "תמיכה בתפעול נוער, הכוונה ותיאום משאבים.",
    guideText:
      "ברוכים הבאים ל-Bronson Family Farm. היכנסו למערכת חיה של חקלאות רגנרטיבית, פיתוח כוח עבודה, רווחת משפחה וגישה למזון מקומי.",
    enterRole: "כניסה לתפקיד",
    heroBadge: "היכנסו לחווה",
    overview: "סקירה",
    highlights: "נקודות עיקריות",
    actions: "פעולות",
    openMarketplace: "פתחו שוק",
    viewEvents: "צפו באירועים",
    explorePlanning: "גלו תכנון",
    openYouthHub: "פתחו מרכז נוער",
    supervisorArea: "אזור מפקח",
    guestTitle: "חוויית אורח",
    guestLead:
      "מבט ציבורי ומזמין אל הסיפור, האירועים, השותפויות והחזון הרגנרטיבי של Bronson Family Farm.",
    customerTitle: "חוויית לקוח",
    customerLead:
      "מסלול לקוח המתמקד בקניות, חינוך תזונתי, הדרכת תזונה, מתכונים וחזרה לשוק.",
    growerTitle: "חוויית מגדל",
    growerLead:
      "מרחב ממוקד ייצור עבור גידולים, תכנון עונתי, תיאום מגדלים ותובנות מעשיות מהשטח.",
    youthTitle: "חוויית כוח עבודה לנוער",
    youthLead:
      "מסלול ללמידה, השתתפות, מוכנות לעבודה, חונכות וצמיחה בפיקוח בתוך אקוסיסטם החווה.",
    supervisorTitle: "תצוגת תמיכה למפקח",
    supervisorLead:
      "תצוגה ייעודית לפיקוח נוער, תיאום יומי, משאבי תמיכה ומעקב אחר התקדמות.",
  },
} as const;

function InfoPanel({
  title,
  lead,
  bullets,
  actions,
}: {
  title: string;
  lead: string;
  bullets: string[];
  actions: string[];
}) {
  return (
    <div className="detail-grid">
      <div className="detail-main card-glass">
        <div className="section-label">Overview</div>
        <h2 className="detail-title">{title}</h2>
        <p className="detail-lead">{lead}</p>
      </div>

      <div className="detail-side">
        <div className="card-glass">
          <div className="section-label">Highlights</div>
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
          <div className="section-label">Actions</div>
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
        <section className="role-page" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)), url("${pathwayImage}")` }}>
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.guestTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>{t.back}</button>
              </div>
            </div>

            <InfoPanel
              title={t.guestTitle}
              lead={t.guestLead}
              bullets={[
                "Farm story and vision",
                "Community events and visitor pathway",
                "Partner visibility and public welcome",
              ]}
              actions={[t.viewEvents, t.backToEntrance]}
            />
          </div>
        </section>
      );
    }

    if (view === "customer") {
      return (
        <section className="role-page" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)), url("${heroImage}")` }}>
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.customerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>{t.back}</button>
              </div>
            </div>

            <InfoPanel
              title={t.customerTitle}
              lead={t.customerLead}
              bullets={[
                "Easy path to marketplace",
                "Nutrition guidance and recipe discovery",
                "Return-customer relationship building",
              ]}
              actions={[t.openMarketplace, "Nutrition & Recipes", t.backToEntrance]}
            />
          </div>
        </section>
      );
    }

    if (view === "grower") {
      return (
        <section className="role-page" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.90), rgba(12,18,12,0.98)), url("${pathwayImage}")` }}>
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.growerTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>{t.back}</button>
              </div>
            </div>

            <InfoPanel
              title={t.growerTitle}
              lead={t.growerLead}
              bullets={[
                "Crop planning and seasonal timing",
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
        <section className="role-page" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.90), rgba(12,18,12,0.98)), url("${heroImage}")` }}>
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.youthTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("ecosystem")}>{t.back}</button>
              </div>
            </div>

            <InfoPanel
              title={t.youthTitle}
              lead={t.youthLead}
              bullets={[
                "Hands-on learning and job readiness",
                "Mentoring and structured pathway support",
                "Supervisor support connected to this program only",
              ]}
              actions={[t.openYouthHub, t.supervisorArea, t.backToEntrance]}
            />

            <div className="nested-panel card-glass">
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
        <section className="role-page" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.92), rgba(12,18,12,1)), url("${pathwayImage}")` }}>
          <div className="role-wrap">
            <div className="role-header">
              <div>
                <div className="eyebrow">{t.eyebrow}</div>
                <h1 className="role-page-title">{t.supervisorTitle}</h1>
              </div>
              <div className="controls">
                <button className="ghost-btn" onClick={() => setView("youth")}>{t.back}</button>
              </div>
            </div>

            <InfoPanel
              title={t.supervisorTitle}
              lead={t.supervisorLead}
              bullets={[
                "Daily youth support coordination",
                "Mentoring and progress awareness",
                "Support staff and resource visibility",
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
          background: #0d120d;
          font-family: Georgia, "Times New Roman", serif;
        }

        body {
          color: white;
        }

        .page {
          min-height: 100vh;
          width: 100%;
          background: #0d120d;
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
          animation: zoom 20s ease-in-out infinite alternate;
          transform: scale(1.03);
        }

        .bg-path {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.34;
          mix-blend-mode: screen;
          animation: drift 26s ease-in-out infinite alternate;
        }

        .shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom,
              rgba(7,10,7,0.34),
              rgba(7,10,7,0.56),
              rgba(7,10,7,0.84)
            ),
            radial-gradient(circle at center,
              rgba(120,150,90,0.10),
              rgba(0,0,0,0.24) 50%,
              rgba(0,0,0,0.46) 100%);
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
          backdrop-filter: blur(10px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-size: 11px;
          color: rgba(255,255,255,0.92);
        }

        .controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .select, .ghost-btn, .ghost-action {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.22);
          color: white;
          padding: 10px 16px;
          font-size: 14px;
          backdrop-filter: blur(10px);
        }

        .ghost-btn, .ghost-action {
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
          max-width: 1040px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 18px;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.20);
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(8px);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.88);
        }

        h1 {
          margin: 0;
          font-size: clamp(44px, 7vw, 92px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          font-weight: 600;
          text-shadow: 0 4px 16px rgba(0,0,0,0.28);
        }

        .copy {
          margin: 22px auto 0;
          max-width: 850px;
          font-size: clamp(19px, 2vw, 28px);
          line-height: 1.65;
          color: rgba(255,255,255,0.87);
          text-shadow: 0 2px 10px rgba(0,0,0,0.24);
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
          transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;
        }

        button:hover {
          transform: translateY(-2px);
        }

        .primary {
          background: #f4f3ea;
          color: #182018;
          font-weight: 600;
        }

        .secondary {
          background: rgba(255,255,255,0.10);
          color: white;
          border: 1px solid rgba(255,255,255,0.24);
          backdrop-filter: blur(8px);
        }

        .ecosystem, .role-page {
          min-height: 100vh;
          padding: 36px 24px 50px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .ecosystem-wrap, .role-wrap {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ecosystem-head, .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }

        .ecosystem-title, .role-page-title {
          font-size: clamp(34px, 5vw, 62px);
          line-height: 1.02;
          margin: 0;
        }

        .ecosystem-copy {
          max-width: 820px;
          margin-top: 10px;
          font-size: 19px;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
        }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .role-card, .card-glass {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 22px;
          box-shadow: 0 14px 40px rgba(0,0,0,0.18);
        }

        .role-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .role-name {
          font-size: 24px;
          margin: 0 0 12px;
        }

        .role-text {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.78);
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
          opacity: 0.86;
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
          color: rgba(255,255,255,0.62);
          margin-bottom: 14px;
        }

        .detail-title {
          font-size: clamp(28px, 4vw, 50px);
          line-height: 1.05;
          margin: 0 0 12px;
        }

        .detail-lead, .nested-copy {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
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
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          font-size: 16px;
        }

        .bullet-dot {
          width: 10px;
          height: 10px;
          margin-top: 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.85);
          flex: 0 0 auto;
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

        @keyframes zoom {
          0% { transform: scale(1.03); }
          100% { transform: scale(1.09); }
        }

        @keyframes drift {
          0% { transform: scale(1.06) translateY(0px); }
          100% { transform: scale(1.11) translateY(-10px); }
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
        }
      `}</style>

      <div className="page">
        {view === "entrance" ? (
          <section className="entrance">
            <img src={heroImage} alt="Farm entrance" className="bg" />
            <img src={pathwayImage} alt="" className="bg-path" />
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
          <section className="ecosystem" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)), url("${pathwayImage}")` }}>
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
                  <a className="role-link" onClick={() => setView("guest")}>{t.enterRole}</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.customer}</h3>
                    <p className="role-text">{t.customerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("customer")}>{t.enterRole}</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.grower}</h3>
                    <p className="role-text">{t.growerText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("grower")}>{t.enterRole}</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.youth}</h3>
                    <p className="role-text">{t.youthText}</p>
                  </div>
                  <a className="role-link" onClick={() => setView("youth")}>{t.enterRole}</a>
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
