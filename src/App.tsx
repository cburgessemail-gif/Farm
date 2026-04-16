import React, { useMemo, useState } from "react";

type Lang = "en" | "es" | "tl" | "it" | "patwa" | "he";
type Panel =
  | "dashboard"
  | "grow"
  | "calendar"
  | "shop"
  | "story"
  | "workforce"
  | "community"
  | "events"
  | "partner";

const HERO_IMAGE = "/GrowArea.jpg";
const STORY_IMAGE = "/GrowArea2.jpg";

const copy = {
  en: {
    brand: "Bronson Family Farm",
    nav: "Navigate",
    quick: "Quick Actions",
    dashboard: "Dashboard",
    panels: {
      dashboard: "Dashboard",
      grow: "Grow",
      calendar: "Calendar",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
      partner: "Partner",
    },
    heroTitle: "Live Ecosystem Workspace",
    heroText:
      "A living ecosystem where food, family, land, learning, wellness, and community renewal work together in one place.",
    openShop: "Open GrownBy Shop",
    support: "Support the Ecosystem",
    today: "Today",
    snapshot: "Live Snapshot",
    activeAcres: "Active acres",
    languages: "Languages",
    pathways: "Pathways",
    marketPath: "Market path",
    calendarTitle: "Grower Calendar",
    table: {
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    sections: {
      dashboard:
        "This is a workspace, not a slideshow. Calendar, operations, shop access, support, and participation stay connected.",
      grow:
        "Grower operations include crop flow, irrigation rhythm, field readiness, and daily production priorities.",
      calendar:
        "The calendar makes the ecosystem feel active by showing timing, tasks, labor rhythm, and site movement.",
      shop:
        "The shop pathway connects the ecosystem to actual purchasing, customer visibility, and live selling.",
      story:
        "Bronson Family Farm is more than a farm. It is a place-based vision shaped by legacy, land, service, and renewal.",
      workforce:
        "The workforce pathway connects youth opportunity, responsibility, practical learning, and future readiness.",
      community:
        "The community pathway shows how volunteers, families, institutions, and supporters can participate meaningfully.",
      events:
        "Events, tours, demonstrations, and market days make the ecosystem public, visible, and welcoming.",
      partner:
        "The partner pathway presents the opportunity to support infrastructure, irrigation, equipment, systems, programming, and long-term activation.",
    },
    whyTitle: "Why This Matters",
    whyText:
      "This is not simply about crops. It is about food access, land stewardship, youth opportunity, wellness, family legacy, and community renewal growing together.",
    modules: "Active Modules",
    mini: {
      production: "Production Status",
      nextActions: "Next Actions",
      marketReadiness: "Market Readiness",
      legacy: "Legacy + Place",
      youth: "Youth + Skills",
      community: "Community + Partners",
      events: "Public Activation",
      priorities: "Support Priorities",
    },
    actions: {
      openCalendar: "Open Calendar",
      openGrow: "Open Grow",
      openStore: "Open Live Store",
      support: "Support the Ecosystem",
    },
  },

  es: {
    brand: "Bronson Family Farm",
    nav: "Navegar",
    quick: "Acciones Rápidas",
    dashboard: "Panel",
    panels: {
      dashboard: "Panel",
      grow: "Cultivar",
      calendar: "Calendario",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
      partner: "Alianza",
    },
    heroTitle: "Espacio Vivo del Ecosistema",
    heroText:
      "Un ecosistema vivo donde comida, familia, tierra, aprendizaje, bienestar y renovación comunitaria trabajan juntos en un solo lugar.",
    openShop: "Abrir tienda GrownBy",
    support: "Apoyar el Ecosistema",
    today: "Hoy",
    snapshot: "Resumen en Vivo",
    activeAcres: "Acres activos",
    languages: "Idiomas",
    pathways: "Rutas",
    marketPath: "Ruta de mercado",
    calendarTitle: "Calendario del Productor",
    table: {
      time: "Hora",
      task: "Tarea",
      owner: "Responsable",
      status: "Estado",
      ready: "Listo",
      active: "Activo",
      pending: "Pendiente",
    },
    sections: {
      dashboard:
        "Este es un espacio de trabajo, no una presentación. Calendario, operaciones, tienda, apoyo y participación permanecen conectados.",
      grow:
        "Las operaciones del cultivo incluyen flujo de siembra, ritmo de riego, preparación del terreno y prioridades diarias.",
      calendar:
        "El calendario hace que el ecosistema se sienta activo al mostrar tiempos, tareas, ritmo laboral y movimiento del sitio.",
      shop:
        "La ruta de tienda conecta el ecosistema con compras reales, visibilidad del cliente y ventas en vivo.",
      story:
        "Bronson Family Farm es más que una granja. Es una visión basada en el lugar, el legado, la tierra, el servicio y la renovación.",
      workforce:
        "La ruta laboral conecta oportunidad juvenil, responsabilidad, aprendizaje práctico y preparación futura.",
      community:
        "La ruta comunitaria muestra cómo voluntarios, familias, instituciones y aliados pueden participar de forma significativa.",
      events:
        "Eventos, recorridos, demostraciones y días de mercado hacen que el ecosistema sea público, visible y acogedor.",
      partner:
        "La ruta de alianza presenta la oportunidad de apoyar infraestructura, riego, equipos, sistemas, programación y activación a largo plazo.",
    },
    whyTitle: "Por Qué Importa",
    whyText:
      "No se trata solo de cultivos. Se trata de acceso a alimentos, cuidado de la tierra, oportunidad juvenil, bienestar, legado familiar y renovación comunitaria creciendo juntos.",
    modules: "Módulos Activos",
    mini: {
      production: "Estado de Producción",
      nextActions: "Próximas Acciones",
      marketReadiness: "Preparación de Mercado",
      legacy: "Legado y Lugar",
      youth: "Juventud y Habilidades",
      community: "Comunidad y Aliados",
      events: "Activación Pública",
      priorities: "Prioridades de Apoyo",
    },
    actions: {
      openCalendar: "Abrir Calendario",
      openGrow: "Abrir Cultivar",
      openStore: "Abrir Tienda",
      support: "Apoyar el Ecosistema",
    },
  },

  tl: {
    brand: "Bronson Family Farm",
    nav: "Nabigasyon",
    quick: "Mabilis na Gawain",
    dashboard: "Dashboard",
    panels: {
      dashboard: "Dashboard",
      grow: "Pagtatanim",
      calendar: "Kalendaryo",
      shop: "Pamimili",
      story: "Kuwento",
      workforce: "Hanapbuhay",
      community: "Komunidad",
      events: "Mga Kaganapan",
      partner: "Partner",
    },
    heroTitle: "Live Ecosystem Workspace",
    heroText:
      "Isang buhay na ecosystem kung saan nagtutulungan ang pagkain, pamilya, lupa, pagkatuto, kalusugan, at pagbangon ng komunidad.",
    openShop: "Buksan ang GrownBy Shop",
    support: "Suportahan ang Ecosystem",
    today: "Ngayon",
    snapshot: "Live Snapshot",
    activeAcres: "Aktibong acres",
    languages: "Mga wika",
    pathways: "Mga daan",
    marketPath: "Market path",
    calendarTitle: "Grower Calendar",
    table: {
      time: "Oras",
      task: "Gawain",
      owner: "May hawak",
      status: "Estado",
      ready: "Handa",
      active: "Aktibo",
      pending: "Nakahintay",
    },
    sections: {
      dashboard:
        "Ito ay workspace, hindi slideshow. Ang calendar, operations, shop access, support, at participation ay magkakaugnay.",
      grow:
        "Kasama sa grower operations ang daloy ng tanim, ritmo ng irigasyon, kahandaan ng bukid, at araw-araw na prayoridad.",
      calendar:
        "Ang kalendaryo ang nagbibigay-buhay sa ecosystem sa pamamagitan ng timing, task flow, labor rhythm, at galaw sa site.",
      shop:
        "Ikinokonekta ng shop pathway ang ecosystem sa aktuwal na pagbili, customer visibility, at live selling.",
      story:
        "Ang Bronson Family Farm ay higit pa sa isang bukid. Isa itong place-based vision na binuo ng pamana, lupa, serbisyo, at pagbangon.",
      workforce:
        "Ikinokonekta ng workforce pathway ang oportunidad para sa kabataan, pananagutan, praktikal na pagkatuto, at paghahanda sa hinaharap.",
      community:
        "Ipinapakita ng community pathway kung paano makikilahok nang makabuluhan ang mga boluntaryo, pamilya, institusyon, at tagasuporta.",
      events:
        "Ang mga event, tour, demonstration, at market day ang nagpapakitang bukas, buhay, at nakikitang aktibo ang ecosystem.",
      partner:
        "Ipinapakita ng partner pathway ang oportunidad na suportahan ang imprastraktura, irigasyon, kagamitan, systems, programming, at pangmatagalang activation.",
    },
    whyTitle: "Bakit Ito Mahalaga",
    whyText:
      "Hindi lang ito tungkol sa pananim. Ito ay tungkol sa access sa pagkain, pangangalaga sa lupa, oportunidad para sa kabataan, kalusugan, pamana ng pamilya, at pagbangon ng komunidad.",
    modules: "Active Modules",
    mini: {
      production: "Production Status",
      nextActions: "Next Actions",
      marketReadiness: "Market Readiness",
      legacy: "Legacy at Lugar",
      youth: "Kabataan at Skills",
      community: "Komunidad at Partners",
      events: "Public Activation",
      priorities: "Support Priorities",
    },
    actions: {
      openCalendar: "Buksan ang Kalendaryo",
      openGrow: "Buksan ang Grow",
      openStore: "Buksan ang Store",
      support: "Suportahan ang Ecosystem",
    },
  },

  it: {
    brand: "Bronson Family Farm",
    nav: "Navigazione",
    quick: "Azioni Rapide",
    dashboard: "Dashboard",
    panels: {
      dashboard: "Dashboard",
      grow: "Coltivare",
      calendar: "Calendario",
      shop: "Acquistare",
      story: "Storia",
      workforce: "Lavoro",
      community: "Comunità",
      events: "Eventi",
      partner: "Partner",
    },
    heroTitle: "Spazio Vivo dell’Ecosistema",
    heroText:
      "Un ecosistema vivo in cui cibo, famiglia, terra, apprendimento, benessere e rinnovamento della comunità lavorano insieme.",
    openShop: "Apri il negozio GrownBy",
    support: "Sostieni l’Ecosistema",
    today: "Oggi",
    snapshot: "Panoramica Live",
    activeAcres: "Acres attivi",
    languages: "Lingue",
    pathways: "Percorsi",
    marketPath: "Percorso mercato",
    calendarTitle: "Calendario del Coltivatore",
    table: {
      time: "Ora",
      task: "Attività",
      owner: "Responsabile",
      status: "Stato",
      ready: "Pronto",
      active: "Attivo",
      pending: "In attesa",
    },
    sections: {
      dashboard:
        "Questo è uno spazio di lavoro, non una presentazione. Calendario, operazioni, negozio, supporto e partecipazione restano collegati.",
      grow:
        "Le operazioni agricole includono flusso delle colture, ritmo dell’irrigazione, preparazione del campo e priorità quotidiane.",
      calendar:
        "Il calendario rende vivo l’ecosistema mostrando tempi, flusso di attività, ritmo del lavoro e movimento del sito.",
      shop:
        "Il percorso del negozio collega l’ecosistema agli acquisti reali, alla visibilità del cliente e alla vendita live.",
      story:
        "Bronson Family Farm è più di una fattoria. È una visione legata al luogo, al lascito, alla terra, al servizio e al rinnovamento.",
      workforce:
        "Il percorso lavorativo collega opportunità per i giovani, responsabilità, apprendimento pratico e preparazione futura.",
      community:
        "Il percorso della comunità mostra come volontari, famiglie, istituzioni e sostenitori possano partecipare in modo significativo.",
      events:
        "Eventi, visite, dimostrazioni e giornate di mercato rendono l’ecosistema pubblico, visibile e accogliente.",
      partner:
        "Il percorso partner presenta l’opportunità di sostenere infrastrutture, irrigazione, attrezzature, sistemi, programmazione e attivazione a lungo termine.",
    },
    whyTitle: "Perché è Importante",
    whyText:
      "Non si tratta solo di colture. Si tratta di accesso al cibo, cura della terra, opportunità per i giovani, benessere, eredità familiare e rinnovamento della comunità.",
    modules: "Moduli Attivi",
    mini: {
      production: "Stato Produzione",
      nextActions: "Prossime Azioni",
      marketReadiness: "Prontezza Mercato",
      legacy: "Eredità e Luogo",
      youth: "Giovani e Competenze",
      community: "Comunità e Partner",
      events: "Attivazione Pubblica",
      priorities: "Priorità di Supporto",
    },
    actions: {
      openCalendar: "Apri Calendario",
      openGrow: "Apri Grow",
      openStore: "Apri Store",
      support: "Sostieni l’Ecosistema",
    },
  },

  patwa: {
    brand: "Bronson Family Farm",
    nav: "Navigate",
    quick: "Quick Action Dem",
    dashboard: "Dashboard",
    panels: {
      dashboard: "Dashboard",
      grow: "Grow",
      calendar: "Calendar",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
      partner: "Partner",
    },
    heroTitle: "Live Ecosystem Workspace",
    heroText:
      "A wan livin ecosystem weh food, family, land, learning, wellness, an community renewal a work together inna one place.",
    openShop: "Open di GrownBy Shop",
    support: "Support di Ecosystem",
    today: "Today",
    snapshot: "Live Snapshot",
    activeAcres: "Active acres",
    languages: "Language dem",
    pathways: "Pathway dem",
    marketPath: "Market path",
    calendarTitle: "Grower Calendar",
    table: {
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    sections: {
      dashboard:
        "Dis a workspace, not no slideshow. Calendar, operations, shop access, support, an participation stay connected.",
      grow:
        "Grower operations include crop flow, irrigation rhythm, field readiness, an daily production priority dem.",
      calendar:
        "Di calendar mek di ecosystem feel active by showin timing, task flow, labor rhythm, an site movement.",
      shop:
        "Di shop pathway connect di ecosystem to real buying, customer visibility, an live selling.",
      story:
        "Bronson Family Farm more than a farm. It a one place-based vision shape by legacy, land, service, an renewal.",
      workforce:
        "Di workforce pathway link youth opportunity, responsibility, practical learning, an future readiness.",
      community:
        "Di community pathway show how volunteer, family, institution, an supporter dem participate inna meaningful ways.",
      events:
        "Events, tour, demonstration, an market day mek di ecosystem public, visible, an welcoming.",
      partner:
        "Di partner pathway present di opportunity fi support infrastructure, irrigation, equipment, systems, programming, an long-term activation.",
    },
    whyTitle: "Why Dis Matter",
    whyText:
      "Dis no just bout crop. It bout food access, land care, youth opportunity, wellness, family legacy, an community renewal a grow together.",
    modules: "Active Module Dem",
    mini: {
      production: "Production Status",
      nextActions: "Next Action Dem",
      marketReadiness: "Market Readiness",
      legacy: "Legacy an Place",
      youth: "Youth an Skill Dem",
      community: "Community an Partner Dem",
      events: "Public Activation",
      priorities: "Support Priority Dem",
    },
    actions: {
      openCalendar: "Open Calendar",
      openGrow: "Open Grow",
      openStore: "Open Store",
      support: "Support di Ecosystem",
    },
  },

  he: {
    brand: "Bronson Family Farm",
    nav: "ניווט",
    quick: "פעולות מהירות",
    dashboard: "לוח בקרה",
    panels: {
      dashboard: "לוח בקרה",
      grow: "גידול",
      calendar: "לוח שנה",
      shop: "קנייה",
      story: "סיפור",
      workforce: "כוח עבודה",
      community: "קהילה",
      events: "אירועים",
      partner: "שותפות",
    },
    heroTitle: "סביבת עבודה חיה של המערכת האקולוגית",
    heroText:
      "מערכת אקולוגית חיה שבה מזון, משפחה, אדמה, למידה, בריאות והתחדשות קהילתית פועלים יחד במקום אחד.",
    openShop: "פתחו את חנות GrownBy",
    support: "תמכו במערכת האקולוגית",
    today: "היום",
    snapshot: "תמונת מצב חיה",
    activeAcres: "אקרים פעילים",
    languages: "שפות",
    pathways: "מסלולים",
    marketPath: "מסלול שוק",
    calendarTitle: "לוח מגדלים",
    table: {
      time: "שעה",
      task: "משימה",
      owner: "אחראי",
      status: "סטטוס",
      ready: "מוכן",
      active: "פעיל",
      pending: "ממתין",
    },
    sections: {
      dashboard:
        "זהו מרחב עבודה, לא מצגת. לוח שנה, תפעול, חנות, תמיכה והשתתפות נשארים מחוברים.",
      grow:
        "תפעול הגידול כולל זרימת גידולים, קצב השקיה, מוכנות השטח וסדרי עדיפויות יומיים.",
      calendar:
        "לוח השנה גורם למערכת האקולוגית להרגיש פעילה על ידי הצגת זמנים, זרימת משימות, קצב העבודה ותנועת האתר.",
      shop:
        "מסלול החנות מחבר את המערכת האקולוגית לרכישות אמיתיות, לחשיפת לקוחות ולמכירה חיה.",
      story:
        "Bronson Family Farm היא יותר מחווה. זהו חזון מבוסס מקום שנוצר מתוך מורשת, אדמה, שירות והתחדשות.",
      workforce:
        "מסלול כוח העבודה מחבר הזדמנות לנוער, אחריות, למידה מעשית ומוכנות לעתיד.",
      community:
        "המסלול הקהילתי מראה כיצד מתנדבים, משפחות, מוסדות ותומכים משתתפים בדרכים משמעותיות.",
      events:
        "אירועים, סיורים, הדגמות וימי שוק הופכים את המערכת האקולוגית לציבורית, נראית ומזמינה.",
      partner:
        "מסלול השותפות מציג את ההזדמנות לתמוך בתשתיות, השקיה, ציוד, מערכות, תוכניות והפעלה ארוכת טווח.",
    },
    whyTitle: "למה זה חשוב",
    whyText:
      "זה לא רק על גידולים. זה על גישה למזון, שמירה על אדמה, הזדמנות לנוער, בריאות, מורשת משפחתית והתחדשות קהילתית שצומחים יחד.",
    modules: "מודולים פעילים",
    mini: {
      production: "סטטוס ייצור",
      nextActions: "הפעולות הבאות",
      marketReadiness: "מוכנות לשוק",
      legacy: "מורשת ומקום",
      youth: "נוער ומיומנויות",
      community: "קהילה ושותפים",
      events: "הפעלה ציבורית",
      priorities: "עדיפויות תמיכה",
    },
    actions: {
      openCalendar: "פתחו לוח שנה",
      openGrow: "פתחו גידול",
      openStore: "פתחו חנות",
      support: "תמכו במערכת האקולוגית",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [panel, setPanel] = useState<Panel>("dashboard");

  const t = copy[lang];
  const isRTL = lang === "he";

  const today = useMemo(
    () =>
      new Date().toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [lang]
  );

  const calendarRows = [
    {
      time: "7:00 AM",
      task: "Watering cycle",
      owner: "Grow Team",
      status: t.table.ready,
    },
    {
      time: "9:00 AM",
      task: "Harvest greens",
      owner: "Workforce",
      status: t.table.active,
    },
    {
      time: "12:00 PM",
      task: "Market prep",
      owner: "Shop Team",
      status: t.table.pending,
    },
    {
      time: "4:00 PM",
      task: "Community market",
      owner: "Events",
      status: t.table.active,
    },
  ];

  const navItems: { key: Panel; label: string }[] = [
    { key: "dashboard", label: t.panels.dashboard },
    { key: "grow", label: t.panels.grow },
    { key: "calendar", label: t.panels.calendar },
    { key: "shop", label: t.panels.shop },
    { key: "story", label: t.panels.story },
    { key: "workforce", label: t.panels.workforce },
    { key: "community", label: t.panels.community },
    { key: "events", label: t.panels.events },
    { key: "partner", label: t.panels.partner },
  ];

  function renderPanel() {
    if (panel === "dashboard") {
      return (
        <>
          <section style={styles.heroCard}>
            <img src={HERO_IMAGE} alt={t.brand} style={styles.heroImage} />
            <div style={styles.heroContent}>
              <div>
                <div style={styles.eyebrow}>{t.brand}</div>
                <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
                <p style={styles.heroText}>{t.heroText}</p>
              </div>
              <div style={styles.heroActions}>
                <button style={styles.primaryButton} onClick={() => setPanel("shop")}>
                  {t.openShop}
                </button>
                <button style={styles.secondaryButton} onClick={() => setPanel("partner")}>
                  {t.support}
                </button>
              </div>
            </div>
          </section>

          <section style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.snapshot}</div>
              <div style={styles.statValue}>3</div>
              <div style={styles.statSub}>{t.activeAcres}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.snapshot}</div>
              <div style={styles.statValue}>6</div>
              <div style={styles.statSub}>{t.languages}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.snapshot}</div>
              <div style={styles.statValue}>8</div>
              <div style={styles.statSub}>{t.pathways}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.snapshot}</div>
              <div style={styles.statValue}>Live</div>
              <div style={styles.statSub}>{t.marketPath}</div>
            </div>
          </section>

          <section style={styles.workspaceGrid}>
            <div style={styles.largePanel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>{t.calendarTitle}</h2>
                <div style={styles.panelMeta}>
                  {t.today}: {today}
                </div>
              </div>

              <div style={styles.table}>
                <div style={styles.tableHead}>
                  <div>{t.table.time}</div>
                  <div>{t.table.task}</div>
                  <div>{t.table.owner}</div>
                  <div>{t.table.status}</div>
                </div>
                {calendarRows.map((row, index) => (
                  <div key={index} style={styles.tableRow}>
                    <div>{row.time}</div>
                    <div>{row.task}</div>
                    <div>{row.owner}</div>
                    <div>{row.status}</div>
                  </div>
                ))}
              </div>

              <div style={styles.rowButtons}>
                <button style={styles.secondaryButton} onClick={() => setPanel("calendar")}>
                  {t.actions.openCalendar}
                </button>
                <button style={styles.secondaryButton} onClick={() => setPanel("grow")}>
                  {t.actions.openGrow}
                </button>
              </div>
            </div>

            <div style={styles.sideColumn}>
              <div style={styles.smallPanel}>
                <h3 style={styles.panelTitle}>{t.whyTitle}</h3>
                <p style={styles.panelBody}>{t.whyText}</p>
                <button style={styles.primaryButton} onClick={() => setPanel("partner")}>
                  {t.support}
                </button>
              </div>

              <div style={styles.smallPanel}>
                <h3 style={styles.panelTitle}>{t.modules}</h3>
                <div style={styles.pathwayGrid}>
                  {(["grow", "shop", "story", "workforce", "community", "events"] as const).map(
                    (key) => (
                      <button
                        key={key}
                        style={styles.pathwayButton}
                        onClick={() => setPanel(key)}
                      >
                        {t.panels[key]}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section style={styles.modulesBlock}>
            <h3 style={styles.modulesTitle}>{t.modules}</h3>
            <div style={styles.modulesGrid}>
              {(["grow", "shop", "story", "workforce", "community", "events", "partner"] as const).map(
                (key) => (
                  <button key={key} style={styles.moduleCard} onClick={() => setPanel(key)}>
                    <div style={styles.moduleCardTitle}>{t.panels[key]}</div>
                    <div style={styles.moduleCardText}>{t.moduleCards[key]}</div>
                  </button>
                )
              )}
            </div>
          </section>
        </>
      );
    }

    if (panel === "grow") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.panels.grow}</h2>
          </div>
          <p style={styles.panelBody}>{t.sections.grow}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.production}</h4>
              <p style={styles.infoText}>Collards: Ready</p>
              <p style={styles.infoText}>Peppers: Growing</p>
              <p style={styles.infoText}>Tomatoes: Transplanting</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.nextActions}</h4>
              <p style={styles.infoText}>• Watering cycle</p>
              <p style={styles.infoText}>• Harvest prep</p>
              <p style={styles.infoText}>• Market packaging</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "calendar") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.calendarTitle}</h2>
            <div style={styles.panelMeta}>
              {t.today}: {today}
            </div>
          </div>
          <p style={styles.panelBody}>{t.sections.calendar}</p>
          <div style={styles.table}>
            <div style={styles.tableHead}>
              <div>{t.table.time}</div>
              <div>{t.table.task}</div>
              <div>{t.table.owner}</div>
              <div>{t.table.status}</div>
            </div>
            {calendarRows.map((row, index) => (
              <div key={index} style={styles.tableRow}>
                <div>{row.time}</div>
                <div>{row.task}</div>
                <div>{row.owner}</div>
                <div>{row.status}</div>
              </div>
            ))}
          </div>
        </>
      );
    }

    if (panel === "shop") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.panels.shop}</h2>
          </div>
          <p style={styles.panelBody}>{t.sections.shop}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.marketReadiness}</h4>
              <p style={styles.infoText}>Bubble Babies: Available</p>
              <p style={styles.infoText}>Seedlings: In season</p>
              <p style={styles.infoText}>Fresh produce: Market-based</p>
              <button
                style={styles.primaryButton}
                onClick={() =>
                  window.open(
                    "https://grownby.com/farms/bronson-family-farm/shop",
                    "_blank"
                  )
                }
              >
                {t.actions.openStore}
              </button>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
              <p style={styles.infoText}>{t.whyText}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "story") {
      return (
        <>
          <div style={styles.storyTop}>
            <div>
              <h2 style={styles.panelTitle}>{t.panels.story}</h2>
              <p style={styles.panelBody}>{t.sections.story}</p>
            </div>
            <img src={STORY_IMAGE} alt={t.panels.story} style={styles.storyImage} />
          </div>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.legacy}</h4>
              <p style={styles.infoText}>{t.moduleCards.story}</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
              <p style={styles.infoText}>{t.whyText}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "workforce") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.panels.workforce}</h2>
          </div>
          <p style={styles.panelBody}>{t.sections.workforce}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.youth}</h4>
              <p style={styles.infoText}>Youth roles: Active</p>
              <p style={styles.infoText}>Skills: teamwork, responsibility, task completion</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
              <p style={styles.infoText}>{t.whyText}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "community") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.panels.community}</h2>
          </div>
          <p style={styles.panelBody}>{t.sections.community}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.community}</h4>
              <p style={styles.infoText}>Volunteers: Open</p>
              <p style={styles.infoText}>Families: Welcome</p>
              <p style={styles.infoText}>Institutions: Partnership-ready</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
              <p style={styles.infoText}>{t.whyText}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "events") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.panels.events}</h2>
          </div>
          <p style={styles.panelBody}>{t.sections.events}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.events}</h4>
              <p style={styles.infoText}>Growers Supply Market</p>
              <p style={styles.infoText}>Tours and demonstrations</p>
              <p style={styles.infoText}>Community activation</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
              <p style={styles.infoText}>{t.whyText}</p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div style={styles.sectionHeader}>
          <h2 style={styles.panelTitle}>{t.panels.partner}</h2>
        </div>
        <p style={styles.panelBody}>{t.sections.partner}</p>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>{t.mini.priorities}</h4>
            <p style={styles.infoText}>Infrastructure</p>
            <p style={styles.infoText}>Irrigation</p>
            <p style={styles.infoText}>Equipment + systems</p>
            <p style={styles.infoText}>Programming + activation</p>
            <button style={styles.primaryButton}>{t.actions.support}</button>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>{t.whyTitle}</h4>
            <p style={styles.infoText}>{t.whyText}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ ...styles.app, direction: isRTL ? ("rtl" as const) : ("ltr" as const) }}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarBrand}>{t.brand}</div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="tl">Tagalog</option>
            <option value="it">Italiano</option>
            <option value="patwa">Patwa</option>
            <option value="he">עברית</option>
          </select>
        </div>

        <div style={styles.sidebarLabel}>{t.nav}</div>
        <div style={styles.sidebarNav}>
          {navItems.map((item) => (
            <button
              key={item.key}
              style={{
                ...styles.navButton,
                ...(panel === item.key ? styles.navButtonActive : {}),
              }}
              onClick={() => setPanel(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={styles.sidebarLabel}>{t.quick}</div>
        <div style={styles.sidebarNav}>
          <button style={styles.quickButton} onClick={() => setPanel("shop")}>
            {t.openShop}
          </button>
          <button style={styles.quickButton} onClick={() => setPanel("partner")}>
            {t.support}
          </button>
          <button style={styles.quickButton} onClick={() => setPanel("calendar")}>
            {t.calendarTitle}
          </button>
        </div>
      </aside>

      <main style={styles.main}>{renderPanel()}</main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#dfe8e0",
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    background: "#eef4ef",
    borderRight: "1px solid #d2ddd4",
    padding: "20px",
    boxSizing: "border-box",
  },
  sidebarTop: {
    display: "grid",
    gap: "12px",
    marginBottom: "20px",
  },
  sidebarBrand: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#173b24",
    lineHeight: 1.2,
  },
  sidebarLabel: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
    margin: "16px 0 10px 0",
  },
  sidebarNav: {
    display: "grid",
    gap: "10px",
  },
  navButton: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d2ddd4",
    background: "#ffffff",
    color: "#173b24",
    fontSize: "15px",
    fontWeight: 700,
    textAlign: "left",
    cursor: "pointer",
  },
  navButtonActive: {
    background: "#2f6b3c",
    color: "#ffffff",
    border: "1px solid #2f6b3c",
  },
  quickButton: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #d2ddd4",
    background: "#f8faf8",
    color: "#173b24",
    fontSize: "14px",
    fontWeight: 700,
    textAlign: "left",
    cursor: "pointer",
  },
  main: {
    padding: "24px",
    boxSizing: "border-box",
  },
  heroCard: {
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "20px",
    border: "1px solid #d2ddd4",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    marginBottom: "20px",
  },
  heroImage: {
    width: "100%",
    height: "260px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "18px",
  },
  heroContent: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
    marginBottom: "6px",
  },
  heroTitle: {
    margin: "0 0 8px 0",
    fontSize: "42px",
    color: "#173b24",
    lineHeight: 1.1,
  },
  heroText: {
    margin: 0,
    maxWidth: "760px",
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#486452",
  },
  heroActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
    marginBottom: "20px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "16px",
    padding: "16px",
  },
  statLabel: {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#2f6b3c",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#173b24",
  },
  statSub: {
    fontSize: "14px",
    color: "#486452",
  },
  workspaceGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.5fr) minmax(300px, 0.9fr)",
    gap: "18px",
    marginBottom: "20px",
  },
  largePanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "20px",
    padding: "18px",
  },
  sideColumn: {
    display: "grid",
    gap: "18px",
  },
  smallPanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "20px",
    padding: "18px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  sectionHeader: {
    marginBottom: "12px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "28px",
    color: "#173b24",
  },
  panelMeta: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#486452",
  },
  panelBody: {
    fontSize: "17px",
    lineHeight: 1.7,
    color: "#486452",
    margin: "0 0 18px 0",
  },
  table: {
    border: "1px solid #dbe4dd",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "14px",
  },
  tableHead: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1fr 1fr",
    gap: "8px",
    padding: "12px 14px",
    background: "#eef4ef",
    fontWeight: 700,
    color: "#173b24",
    fontSize: "14px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr 1fr 1fr",
    gap: "8px",
    padding: "12px 14px",
    borderTop: "1px solid #edf2ee",
    fontSize: "14px",
    color: "#486452",
    background: "#ffffff",
  },
  rowButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  pathwayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },
  pathwayButton: {
    padding: "12px",
    background: "#f8faf8",
    color: "#173b24",
    border: "1px solid #d2ddd4",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  modulesBlock: {
    background: "#f8faf8",
    border: "1px solid #d2ddd4",
    borderRadius: "20px",
    padding: "18px",
  },
  modulesTitle: {
    margin: "0 0 14px 0",
    fontSize: "24px",
    color: "#173b24",
  },
  modulesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  moduleCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "left",
    cursor: "pointer",
  },
  moduleCardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#173b24",
    marginBottom: "6px",
  },
  moduleCardText: {
    fontSize: "15px",
    lineHeight: 1.5,
    color: "#486452",
  },
  storyTop: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 320px",
    gap: "20px",
    alignItems: "start",
    marginBottom: "20px",
  },
  storyImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  infoCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
  },
  infoTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#173b24",
  },
  infoText: {
    margin: "0 0 6px 0",
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#486452",
  },
  primaryButton: {
    padding: "14px 22px",
    background: "#2f6b3c",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
  },
  secondaryButton: {
    padding: "14px 22px",
    background: "#ffffff",
    color: "#173b24",
    border: "1px solid #cfd9d1",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    fontSize: "15px",
  },
};
