import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageCode = "en" | "es" | "tl" | "it" | "pat" | "he";
type ViewMode = "entrance" | "ecosystem";

const copy = {
  en: {
    eyebrow: "Bronson Family Farm",
    title: "Experience something different.",
    subtitle:
      "Step into a living ecosystem of regenerative farming, community wellness, workforce development, and local food access.",
    enter: "Enter the Ecosystem",
    tour: "Start Guided Tour",
    language: "Language",
    back: "Back to Entrance",
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
    guideText:
      "Welcome to Bronson Family Farm. Step into a living ecosystem of regenerative farming, workforce development, family wellness, and local food access.",
  },
  es: {
    eyebrow: "Bronson Family Farm",
    title: "Vive algo diferente.",
    subtitle:
      "Entra en un ecosistema vivo de agricultura regenerativa, bienestar comunitario, desarrollo laboral y acceso a alimentos locales.",
    enter: "Entrar al Ecosistema",
    tour: "Iniciar Recorrido Guiado",
    language: "Idioma",
    back: "Volver a la Entrada",
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
    guideText:
      "Bienvenido a Bronson Family Farm. Entra en un ecosistema vivo de agricultura regenerativa, desarrollo laboral, bienestar familiar y acceso a alimentos locales.",
  },
  tl: {
    eyebrow: "Bronson Family Farm",
    title: "Makaranas ng kakaiba.",
    subtitle:
      "Pumasok sa isang buhay na ekosistema ng regenerative farming, community wellness, workforce development, at local food access.",
    enter: "Pumasok sa Ecosystem",
    tour: "Simulan ang Guided Tour",
    language: "Wika",
    back: "Bumalik sa Entrance",
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
    guideText:
      "Maligayang pagdating sa Bronson Family Farm. Pumasok sa isang buhay na ekosistema ng regenerative farming, workforce development, family wellness, at local food access.",
  },
  it: {
    eyebrow: "Bronson Family Farm",
    title: "Vivi qualcosa di diverso.",
    subtitle:
      "Entra in un ecosistema vivo di agricoltura rigenerativa, benessere della comunità, sviluppo della forza lavoro e accesso al cibo locale.",
    enter: "Entra nell’Ecosistema",
    tour: "Avvia Tour Guidato",
    language: "Lingua",
    back: "Torna all’Ingresso",
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
    guideText:
      "Benvenuti a Bronson Family Farm. Entra in un ecosistema vivo di agricoltura rigenerativa, sviluppo della forza lavoro, benessere familiare e accesso al cibo locale.",
  },
  pat: {
    eyebrow: "Bronson Family Farm",
    title: "Step ina someting different.",
    subtitle:
      "Come eena one livin ecosystem a regenerative farming, community wellness, workforce development, an local food access.",
    enter: "Enter di Ecosystem",
    tour: "Start Guided Tour",
    language: "Language",
    back: "Go Back to Entrance",
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
    guideText:
      "Welcome to Bronson Family Farm. Step eena one livin ecosystem a regenerative farming, workforce development, family wellness, an local food access.",
  },
  he: {
    eyebrow: "Bronson Family Farm",
    title: "לחוות משהו שונה.",
    subtitle:
      "היכנסו למערכת חיה של חקלאות רגנרטיבית, רווחת קהילה, פיתוח כוח עבודה וגישה למזון מקומי.",
    enter: "כניסה לאקוסיסטם",
    tour: "התחל סיור מודרך",
    language: "שפה",
    back: "חזרה לכניסה",
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
    guideText:
      "ברוכים הבאים ל-Bronson Family Farm. היכנסו למערכת חיה של חקלאות רגנרטיבית, פיתוח כוח עבודה, רווחת משפחה וגישה למזון מקומי.",
  },
} as const;

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

        .select, .ghost-btn {
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.22);
          color: white;
          padding: 10px 16px;
          font-size: 14px;
          backdrop-filter: blur(10px);
        }

        .ghost-btn {
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

        .ecosystem {
          min-height: 100vh;
          padding: 36px 24px 50px;
          background:
            linear-gradient(to bottom, rgba(8,12,8,0.88), rgba(12,18,12,0.96)),
            url("/GrowArea2.jpg") center/cover no-repeat;
        }

        .ecosystem-wrap {
          max-width: 1200px;
          margin: 0 auto;
        }

        .ecosystem-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }

        .ecosystem-title {
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

        .role-card {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 28px;
          padding: 22px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 14px 40px rgba(0,0,0,0.18);
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
        }

        @media (max-width: 720px) {
          .topbar,
          .ecosystem-head {
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
                <div className="eyebrow">Step Into the Farm</div>
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
        ) : (
          <section className="ecosystem">
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
                    {t.back}
                  </button>
                </div>
              </div>

              <div className="role-grid">
                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.guest}</h3>
                    <p className="role-text">{t.guestText}</p>
                  </div>
                  <a className="role-link" href="#">Enter Role</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.customer}</h3>
                    <p className="role-text">{t.customerText}</p>
                  </div>
                  <a className="role-link" href="#">Enter Role</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.grower}</h3>
                    <p className="role-text">{t.growerText}</p>
                  </div>
                  <a className="role-link" href="#">Enter Role</a>
                </div>

                <div className="role-card">
                  <div>
                    <h3 className="role-name">{t.youth}</h3>
                    <p className="role-text">{t.youthText}</p>
                  </div>
                  <a className="role-link" href="#">Enter Role</a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
