import React, { useState } from "react";

const translations: Record<string, any> = {
  English: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Grower Ecosystem Demo",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "A real working ecosystem — not a presentation",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms, and the historic Lansdowne Airport working as one system.",
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
  },
  Spanish: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demostración del Ecosistema de Cultivo",
    subtitleDemo: "Panel en Vivo",
    welcomeHeading: "Un ecosistema real en funcionamiento, no una presentación",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms y el histórico aeropuerto Lansdowne trabajando como un solo sistema.",
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
  },
  Tagalog: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demo ng Grower Ecosystem",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "Isang totoong gumaganang ecosystem — hindi presentasyon",
    welcomeText:
      "Ang Bronson Family Farm, Farm & Family Alliance, Parker Farms, at makasaysayang Lansdowne Airport ay gumagana bilang isang sistema.",
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
  },
  Patwa: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Growa Ecosystem Demo",
    subtitleDemo: "Live Dashboard",
    welcomeHeading: "A real workin ecosystem — not a presentation",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms, an di historic Lansdowne Airport a work as one system.",
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
  },
  Italian: {
    title: "Bronson Family Farm",
    subtitleWelcome: "Demo dell'Ecosistema dei Coltivatori",
    subtitleDemo: "Cruscotto Live",
    welcomeHeading: "Un ecosistema reale e funzionante — non una presentazione",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms e lo storico aeroporto Lansdowne lavorano come un unico sistema.",
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
  },
  Hebrew: {
    title: "Bronson Family Farm",
    subtitleWelcome: "הדגמת מערכת המגדלים",
    subtitleDemo: "לוח מחוונים חי",
    welcomeHeading: "מערכת אקולוגית פעילה אמיתית — לא מצגת",
    welcomeText:
      "Bronson Family Farm, Farm & Family Alliance, Parker Farms ושדה התעופה ההיסטורי Lansdowne פועלים כמערכת אחת.",
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
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "1px solid white",
                  background: l === lang ? "#d7ff73" : "transparent",
                  color: l === lang ? "#173116" : "white",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {screen === "welcome" ? (
          <div style={panel()}>
            <h1 style={{ fontSize: "48px" }}>{t.welcomeHeading}</h1>

            <p style={{ fontSize: "20px" }}>{t.welcomeText}</p>

            <button
              onClick={() => setScreen("demo")}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                background: "#d7ff73",
                color: "#173116",
                borderRadius: "25px",
                fontWeight: 700,
              }}
            >
              {t.enterDemo}
            </button>
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
