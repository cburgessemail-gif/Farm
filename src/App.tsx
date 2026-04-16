import React, { useState } from "react";

const translations: Record<string, any> = {
  English: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Grower Ecosystem Demo",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "A real working ecosystem — not a presentation",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms, and the historic Lansdowne Airport working as one system.",
    whyText:
      "Agriculture, workforce, family wellness, and community infrastructure working together in one living ecosystem.",
    enterDemo: "Enter Live Demo →",
    back: "Back to Welcome",
    marketplace: "Marketplace",
    weather: "Weather",
    guestDash: "Guest Dashboard",
    customerDash: "Customer Dashboard",
    growerDash: "Grower Dashboard",
    supervisorDash: "Supervisor Dashboard",
    youthDash: "Youth Workforce Dashboard",
    adminDash: "Operations Dashboard",
    guestBody: "Explore the story, land history, and community vision.",
    customerBody: "Reserve produce, plan pickup, and learn nutrition.",
    grower1: "Watering schedule",
    grower2: "Transplant tracking",
    grower3: "Crop readiness",
    sup1: "Attendance: 94%",
    sup2: "Safety: 100%",
    sup3: "Team readiness: High",
    youth1: "Clock in",
    youth2: "Learn skills",
    youth3: "Work with team",
    admin1: "Event coordination",
    admin2: "Inventory tracking",
    admin3: "Volunteer scheduling",
    marketItems: "Tomatoes · Collards · Cabbage · Peppers",
    weatherItems: "68° · Overcast · Wind 8 mph",
    guest: "Guest",
    guestSub: "See the vision, land story, and ecosystem.",
    customer: "Customer",
    customerSub: "Reserve food, understand pickup, and nutrition.",
    grower: "Grower",
    growerSub: "Track crops, irrigation, and production.",
    supervisor: "Supervisor",
    supervisorSub: "Monitor youth, safety, and attendance.",
    youth: "Youth Workforce",
    youthSub: "Build skills, confidence, and pathways.",
    admin: "Operations",
    adminSub: "Coordinate events, staffing, and flow.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "A regenerative, off-grid agritourism and food system hub growing food, learning, and opportunity on the historic Lansdowne Airport grounds.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "The nonprofit partner advancing workforce development, youth engagement, education, volunteer coordination, and community impact.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "A regional grower and marketplace partner supporting collaboration, distribution, and stronger local food pathways.",
    airportTitle: "Lansdowne Airport",
    airportBody:
      "A historic site being reimagined as living community infrastructure — where land, food, learning, and belonging reconnect.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "Tools, growers, produce, wellness, workshops, workforce pathways, and community check-in.",
  },
  Spanish: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demostración del Ecosistema de Cultivo",
    subtitleDemo: "Panel en Vivo",
    welcomeHeading: "Un ecosistema real en funcionamiento — no una presentación",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms y el histórico aeropuerto Lansdowne trabajando como un solo sistema.",
    whyText:
      "Agricultura, fuerza laboral, bienestar familiar e infraestructura comunitaria trabajando juntos en un ecosistema vivo.",
    enterDemo: "Entrar a la Demostración →",
    back: "Volver",
    marketplace: "Mercado",
    weather: "Clima",
    guestDash: "Panel de Invitado",
    customerDash: "Panel de Cliente",
    growerDash: "Panel de Productor",
    supervisorDash: "Panel de Supervisor",
    youthDash: "Panel de Jóvenes",
    adminDash: "Panel de Operaciones",
    guestBody: "Explore la historia, la tierra y la visión comunitaria.",
    customerBody: "Reserve productos, planifique recogida y aprenda nutrición.",
    grower1: "Horario de riego",
    grower2: "Seguimiento de trasplantes",
    grower3: "Estado del cultivo",
    sup1: "Asistencia: 94%",
    sup2: "Seguridad: 100%",
    sup3: "Preparación del equipo: Alta",
    youth1: "Registrar entrada",
    youth2: "Aprender habilidades",
    youth3: "Trabajar en equipo",
    admin1: "Coordinación de eventos",
    admin2: "Seguimiento de inventario",
    admin3: "Programación de voluntarios",
    marketItems: "Tomates · Berza · Repollo · Pimientos",
    weatherItems: "68° · Nublado · Viento 8 mph",
    guest: "Invitado",
    guestSub: "Vea la visión, la historia de la tierra y el ecosistema.",
    customer: "Cliente",
    customerSub: "Reserve comida, entienda la recogida y la nutrición.",
    grower: "Productor",
    growerSub: "Supervise cultivos, riego y producción.",
    supervisor: "Supervisor",
    supervisorSub: "Supervise jóvenes, seguridad y asistencia.",
    youth: "Jóvenes",
    youthSub: "Desarrolle habilidades, confianza y trayectorias.",
    admin: "Operaciones",
    adminSub: "Coordine eventos, personal y flujo.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "Un centro regenerativo, fuera de la red, de agroturismo y sistema alimentario que cultiva comida, aprendizaje y oportunidades en el histórico aeropuerto Lansdowne.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "La organización sin fines de lucro que impulsa desarrollo laboral, participación juvenil, educación, coordinación de voluntarios e impacto comunitario.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "Un socio regional de cultivo y mercado que apoya la colaboración, la distribución y rutas alimentarias locales más fuertes.",
    airportTitle: "Aeropuerto Lansdowne",
    airportBody:
      "Un sitio histórico reinventado como infraestructura comunitaria viva, donde tierra, comida, aprendizaje y pertenencia vuelven a conectarse.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "Herramientas, productores, productos frescos, bienestar, talleres, trayectorias laborales y registro comunitario.",
  },
  Tagalog: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demo ng Grower Ecosystem",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "Isang totoong gumaganang ecosystem — hindi presentasyon",
    welcomeText:
      "Ang Bronson Family Farm, Farm & Family Alliance, Parker Farms, at makasaysayang Lansdowne Airport ay gumagana bilang isang sistema.",
    whyText:
      "Pagsasaka, kabuhayan, kalusugan ng pamilya, at imprastraktura ng komunidad na magkakaugnay sa iisang buhay na ecosystem.",
    enterDemo: "Pumasok sa Demo →",
    back: "Bumalik",
    marketplace: "Pamilihan",
    weather: "Panahon",
    guestDash: "Guest Dashboard",
    customerDash: "Customer Dashboard",
    growerDash: "Grower Dashboard",
    supervisorDash: "Supervisor Dashboard",
    youthDash: "Youth Workforce Dashboard",
    adminDash: "Operations Dashboard",
    guestBody: "Tuklasin ang kuwento, kasaysayan ng lupa, at bisyon ng komunidad.",
    customerBody: "Magpareserba ng ani, planuhin ang pickup, at alamin ang nutrisyon.",
    grower1: "Iskedyul ng pagdidilig",
    grower2: "Pagsubaybay sa transplant",
    grower3: "Kahandaan ng ani",
    sup1: "Attendance: 94%",
    sup2: "Kaligtasan: 100%",
    sup3: "Kahandaan ng koponan: Mataas",
    youth1: "Mag-clock in",
    youth2: "Matuto ng kasanayan",
    youth3: "Makipagtulungan sa grupo",
    admin1: "Koordinasyon ng event",
    admin2: "Pagsubaybay ng imbentaryo",
    admin3: "Pag-iskedyul ng boluntaryo",
    marketItems: "Kamatis · Collards · Repolyo · Sili",
    weatherItems: "68° · Maulap · Hangin 8 mph",
    guest: "Bisita",
    guestSub: "Tingnan ang bisyon, kasaysayan ng lupa, at ecosystem.",
    customer: "Mamimili",
    customerSub: "Magpareserba ng pagkain, unawain ang pickup, at nutrisyon.",
    grower: "Grower",
    growerSub: "Subaybayan ang pananim, irigasyon, at produksyon.",
    supervisor: "Supervisor",
    supervisorSub: "Subaybayan ang kabataan, kaligtasan, at attendance.",
    youth: "Youth Workforce",
    youthSub: "Bumuo ng kasanayan, kumpiyansa, at landas.",
    admin: "Operations",
    adminSub: "Isaayos ang event, staffing, at flow.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "Isang regenerative, off-grid agritourism at food system hub na nagpapalago ng pagkain, pagkatuto, at oportunidad sa makasaysayang Lansdowne Airport grounds.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "Ang nonprofit partner na nagtataguyod ng workforce development, youth engagement, education, volunteer coordination, at community impact.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "Isang regional grower at marketplace partner na sumusuporta sa collaboration, distribution, at mas matibay na local food pathways.",
    airportTitle: "Lansdowne Airport",
    airportBody:
      "Isang makasaysayang lugar na muling binibigyang-buhay bilang living community infrastructure kung saan muling nagtatagpo ang lupa, pagkain, pagkatuto, at pakikibahagi.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "Mga kagamitan, growers, produce, wellness, workshops, workforce pathways, at community check-in.",
  },
  Patwa: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Growa Ecosystem Demo",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "A real workin ecosystem — not a presentation",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms, an di historic Lansdowne Airport a work as one system.",
    whyText:
      "Farmin, work pathway, family wellness, an community infrastructure all tied up inna one livin ecosystem.",
    enterDemo: "Go Ina Di Demo →",
    back: "Back",
    marketplace: "Market",
    weather: "Weather",
    guestDash: "Guest Dashboard",
    customerDash: "Customer Dashboard",
    growerDash: "Growa Dashboard",
    supervisorDash: "Supervisor Dashboard",
    youthDash: "Youth Workforce Dashboard",
    adminDash: "Operations Dashboard",
    guestBody: "Explore di story, di land history, an di community vision.",
    customerBody: "Reserve produce, plan pickup, an learn nutrition.",
    grower1: "Watering schedule",
    grower2: "Transplant tracking",
    grower3: "Crop readiness",
    sup1: "Attendance: 94%",
    sup2: "Safety: 100%",
    sup3: "Team readiness: High",
    youth1: "Clock in",
    youth2: "Learn skills",
    youth3: "Work wid team",
    admin1: "Event coordination",
    admin2: "Inventory tracking",
    admin3: "Volunteer scheduling",
    marketItems: "Tomato · Collards · Cabbage · Peppers",
    weatherItems: "68° · Overcast · Wind 8 mph",
    guest: "Guest",
    guestSub: "See di vision, land story, an ecosystem.",
    customer: "Customer",
    customerSub: "Reserve food, understand pickup, an nutrition.",
    grower: "Growa",
    growerSub: "Track crop, irrigation, an production.",
    supervisor: "Supervisor",
    supervisorSub: "Monitor youth, safety, an attendance.",
    youth: "Youth Workforce",
    youthSub: "Build skills, confidence, an pathway.",
    admin: "Operations",
    adminSub: "Coordinate events, staffing, an flow.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "A regenerative, off-grid agritourism an food system hub weh a grow food, learning, an opportunity pon di historic Lansdowne Airport grounds.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "Di nonprofit partner weh a push workforce development, youth engagement, education, volunteer coordination, an community impact.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "A regional growa an marketplace partner supportin collaboration, distribution, an stronger local food pathway.",
    airportTitle: "Lansdowne Airport",
    airportBody:
      "A historic site a get reimagined as living community infrastructure weh land, food, learning, an belonging connect back again.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "Tools, growas, produce, wellness, workshop, workforce pathway, an community check-in.",
  },
  Italian: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demo dell'Ecosistema dei Coltivatori",
    subtitleDemo: "Cruscotto Live",
    welcomeHeading: "Un ecosistema reale e funzionante — non una presentazione",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms e lo storico aeroporto Lansdowne lavorano come un unico sistema.",
    whyText:
      "Agricoltura, lavoro, benessere familiare e infrastruttura comunitaria che operano insieme in un ecosistema vivo.",
    enterDemo: "Entra nella Demo →",
    back: "Indietro",
    marketplace: "Mercato",
    weather: "Meteo",
    guestDash: "Dashboard Ospite",
    customerDash: "Dashboard Cliente",
    growerDash: "Dashboard Coltivatore",
    supervisorDash: "Dashboard Supervisore",
    youthDash: "Dashboard Giovani",
    adminDash: "Dashboard Operazioni",
    guestBody: "Esplora la storia, il terreno e la visione della comunità.",
    customerBody: "Prenota prodotti, pianifica il ritiro e scopri la nutrizione.",
    grower1: "Programma di irrigazione",
    grower2: "Monitoraggio trapianti",
    grower3: "Prontezza del raccolto",
    sup1: "Presenza: 94%",
    sup2: "Sicurezza: 100%",
    sup3: "Prontezza del team: Alta",
    youth1: "Registrati",
    youth2: "Impara competenze",
    youth3: "Lavora con il team",
    admin1: "Coordinamento eventi",
    admin2: "Monitoraggio inventario",
    admin3: "Programmazione volontari",
    marketItems: "Pomodori · Cavolo verde · Cavolo · Peperoni",
    weatherItems: "68° · Nuvoloso · Vento 8 mph",
    guest: "Ospite",
    guestSub: "Scopri la visione, la storia del terreno e l'ecosistema.",
    customer: "Cliente",
    customerSub: "Prenota cibo, comprendi il ritiro e la nutrizione.",
    grower: "Coltivatore",
    growerSub: "Controlla colture, irrigazione e produzione.",
    supervisor: "Supervisore",
    supervisorSub: "Monitora giovani, sicurezza e presenza.",
    youth: "Giovani",
    youthSub: "Sviluppa competenze, fiducia e percorsi.",
    admin: "Operazioni",
    adminSub: "Coordina eventi, personale e flusso.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "Un centro rigenerativo, fuori rete, di agriturismo e sistema alimentare che coltiva cibo, apprendimento e opportunità nei terreni storici dell'aeroporto Lansdowne.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "Il partner nonprofit che promuove sviluppo del lavoro, coinvolgimento dei giovani, educazione, coordinamento dei volontari e impatto comunitario.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "Un partner regionale di coltivazione e mercato che sostiene collaborazione, distribuzione e filiere alimentari locali più forti.",
    airportTitle: "Lansdowne Airport",
    airportBody:
      "Un sito storico reinterpretato come infrastruttura comunitaria viva dove terra, cibo, apprendimento e appartenenza si riconnettono.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "Strumenti, coltivatori, prodotti freschi, benessere, workshop, percorsi di lavoro e check-in comunitario.",
  },
  Hebrew: {
    title: "Bronson Family Farm",
    subtitleWelcome: "הדגמת מערכת המגדלים",
    subtitleDemo: "לוח מחוונים חי",
    welcomeHeading: "מערכת אקולוגית פעילה אמיתית — לא מצגת",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms ושדה התעופה ההיסטורי Lansdowne פועלים כמערכת אחת.",
    whyText:
      "חקלאות, תעסוקה, רווחת המשפחה ותשתית קהילתית פועלים יחד בתוך מערכת אקולוגית חיה אחת.",
    enterDemo: "כניסה להדגמה ←",
    back: "חזרה",
    marketplace: "שוק",
    weather: "מזג אוויר",
    guestDash: "לוח אורח",
    customerDash: "לוח לקוח",
    growerDash: "לוח מגדל",
    supervisorDash: "לוח מפקח",
    youthDash: "לוח כוח עבודה צעיר",
    adminDash: "לוח תפעול",
    guestBody: "גלו את הסיפור, היסטוריית הקרקע וחזון הקהילה.",
    customerBody: "שמרו תוצרת, תכננו איסוף ולמדו על תזונה.",
    grower1: "לוח השקיה",
    grower2: "מעקב השתלות",
    grower3: "מוכנות יבול",
    sup1: "נוכחות: 94%",
    sup2: "בטיחות: 100%",
    sup3: "מוכנות צוות: גבוהה",
    youth1: "כניסה לעבודה",
    youth2: "ללמוד מיומנויות",
    youth3: "לעבוד עם הצוות",
    admin1: "תיאום אירועים",
    admin2: "מעקב מלאי",
    admin3: "תזמון מתנדבים",
    marketItems: "עגבניות · קולארד · כרוב · פלפלים",
    weatherItems: "68° · מעונן · רוח 8 mph",
    guest: "אורח",
    guestSub: "ראו את החזון, סיפור הקרקע והמערכת.",
    customer: "לקוח",
    customerSub: "שמרו מזון, הבינו איסוף ותזונה.",
    grower: "מגדל",
    growerSub: "עקבו אחר גידולים, השקיה וייצור.",
    supervisor: "מפקח",
    supervisorSub: "פקחו על נוער, בטיחות ונוכחות.",
    youth: "כוח עבודה צעיר",
    youthSub: "בנו מיומנויות, ביטחון ומסלולים.",
    admin: "תפעול",
    adminSub: "תאמו אירועים, כוח אדם וזרימה.",
    bronsonTitle: "Bronson Family Farm",
    bronsonBody:
      "מרכז אגריטוריזם ומערכת מזון מתחדשת, שאינו תלוי ברשת, המגדל מזון, למידה והזדמנות בשטחי שדה התעופה ההיסטורי Lansdowne.",
    allianceTitle: "Farm & Family Alliance",
    allianceBody:
      "השותף ללא מטרות רווח המקדם פיתוח תעסוקה, מעורבות צעירים, חינוך, תיאום מתנדבים והשפעה קהילתית.",
    parkerTitle: "Parker Farms",
    parkerBody:
      "שותף אזורי לגידול ולשוק התומך בשיתוף פעולה, הפצה ונתיבי מזון מקומיים חזקים יותר.",
    airportTitle: "Lansdowne Airport",
    airportBody:
      "אתר היסטורי המדומיין מחדש כתשתית קהילתית חיה שבה אדמה, מזון, למידה ושייכות מתחברים מחדש.",
    marketTitle: "Growers Supply Market",
    marketBody:
      "כלים, מגדלים, תוצרת, בריאות, סדנאות, מסלולי תעסוקה וצ'ק-אין קהילתי.",
  },
};

const roleMeta = [
  { id: "guest", image: "/GrowArea.jpg", color: "#9BE564" },
  { id: "customer", image: "/GrowArea2.jpg", color: "#6EC5FF" },
  { id: "grower", image: "/GrowArea.jpg", color: "#F7B267" },
  { id: "supervisor", image: "/GrowArea2.jpg", color: "#FF6B6B" },
  { id: "youth", image: "/GrowArea.jpg", color: "#C77DFF" },
  { id: "admin", image: "/GrowArea2.jpg", color: "#FFD93D" },
];

function panel(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(0,0,0,0.35)",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.15)",
    ...extra,
  };
}

function infoCard(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    ...extra,
  };
}

export default function App() {
  const [screen, setScreen] = useState<"welcome" | "demo">("welcome");
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("English");

  const t = translations[lang];
  const currentMeta = roleMeta.find((r) => r.id === role)!;

  const roleCards = [
    { id: "guest", title: t.guest, subtitle: t.guestSub },
    { id: "customer", title: t.customer, subtitle: t.customerSub },
    { id: "grower", title: t.grower, subtitle: t.growerSub },
    { id: "supervisor", title: t.supervisor, subtitle: t.supervisorSub },
    { id: "youth", title: t.youth, subtitle: t.youthSub },
    { id: "admin", title: t.admin, subtitle: t.adminSub },
  ];

  const selectedRole = roleCards.find((r) => r.id === role)!;

  const dashboardTitle =
    role === "guest"
      ? t.guestDash
      : role === "customer"
      ? t.customerDash
      : role === "grower"
      ? t.growerDash
      : role === "supervisor"
      ? t.supervisorDash
      : role === "youth"
      ? t.youthDash
      : t.adminDash;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(10,30,20,0.9), rgba(20,60,40,0.9)), url(/GrowArea.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            ...panel(),
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ fontSize: "36px", fontWeight: 800 }}>{t.title}</div>
            <div style={{ opacity: 0.8 }}>
              {screen === "welcome" ? t.subtitleWelcome : t.subtitleDemo}
            </div>
          </div>

          <div>
            {Object.keys(translations).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  margin: "4px",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid white",
                  background: l === lang ? "#d7ff73" : "transparent",
                  color: l === lang ? "#173116" : "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {screen === "welcome" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "20px" }}>
            <div style={panel()}>
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(215,255,115,0.18)",
                  color: "#e7ffc5",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                Live Now
              </div>

              <h1 style={{ fontSize: "56px", lineHeight: 1.05, margin: "0 0 18px 0" }}>
                {t.welcomeHeading}
              </h1>

              <p style={{ fontSize: "24px", lineHeight: 1.5, maxWidth: "980px" }}>
                {t.welcomeText}
              </p>

              <p style={{ fontSize: "18px", lineHeight: 1.6, maxWidth: "980px", opacity: 0.95 }}>
                {t.whyText}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginTop: "22px",
                }}
              >
                <div style={infoCard()}>
                  <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
                    {t.bronsonTitle}
                  </div>
                  <div style={{ lineHeight: 1.55 }}>{t.bronsonBody}</div>
                </div>

                <div style={infoCard()}>
                  <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
                    {t.allianceTitle}
                  </div>
                  <div style={{ lineHeight: 1.55 }}>{t.allianceBody}</div>
                </div>

                <div style={infoCard()}>
                  <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
                    {t.parkerTitle}
                  </div>
                  <div style={{ lineHeight: 1.55 }}>{t.parkerBody}</div>
                </div>

                <div style={infoCard()}>
                  <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "8px" }}>
                    {t.airportTitle}
                  </div>
                  <div style={{ lineHeight: 1.55 }}>{t.airportBody}</div>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button
                  onClick={() => setScreen("demo")}
                  style={{
                    padding: "12px 20px",
                    background: "#d7ff73",
                    color: "#173116",
                    borderRadius: "25px",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {t.enterDemo}
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gap: "20px" }}>
              <div style={panel()}>
                <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>
                  {t.marketTitle}
                </div>
                <div style={{ lineHeight: 1.6 }}>{t.marketBody}</div>
              </div>

              <div style={panel()}>
                <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "12px" }}>
                  {t.marketplace}
                </div>
                <div style={infoCard()}>{t.marketItems}</div>

                <div style={{ fontSize: "24px", fontWeight: 800, margin: "18px 0 12px" }}>
                  {t.weather}
                </div>
                <div style={infoCard()}>{t.weatherItems}</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              {roleCards.map((r) => {
                const meta = roleMeta.find((m) => m.id === r.id)!;
                return (
                  <div
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    style={{
                      cursor: "pointer",
                      padding: "15px",
                      borderRadius: "20px",
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${meta.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border:
                        role === r.id
                          ? `3px solid ${meta.color}`
                          : "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <h2>{r.title}</h2>
                    <p>{r.subtitle}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
              <div style={panel()}>
                <h2 style={{ color: currentMeta.color }}>{dashboardTitle}</h2>

                {role === "guest" && <p>{t.guestBody}</p>}
                {role === "customer" && <p>{t.customerBody}</p>}

                {role === "grower" && (
                  <ul>
                    <li>{t.grower1}</li>
                    <li>{t.grower2}</li>
                    <li>{t.grower3}</li>
                  </ul>
                )}

                {role === "supervisor" && (
                  <ul>
                    <li>{t.sup1}</li>
                    <li>{t.sup2}</li>
                    <li>{t.sup3}</li>
                  </ul>
                )}

                {role === "youth" && (
                  <ul>
                    <li>{t.youth1}</li>
                    <li>{t.youth2}</li>
                    <li>{t.youth3}</li>
                  </ul>
                )}

                {role === "admin" && (
                  <ul>
                    <li>{t.admin1}</li>
                    <li>{t.admin2}</li>
                    <li>{t.admin3}</li>
                  </ul>
                )}

                <button
                  onClick={() => setScreen("welcome")}
                  style={{
                    marginTop: "20px",
                    padding: "10px 16px",
                    borderRadius: "20px",
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {t.back}
                </button>
              </div>

              <div style={panel()}>
                <h3>{t.marketplace}</h3>
                <p>{t.marketItems}</p>

                <h3 style={{ marginTop: "15px" }}>{t.weather}</h3>
                <p>{t.weatherItems}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
