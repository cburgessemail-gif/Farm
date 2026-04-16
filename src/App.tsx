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

const labels = {
  en: {
    appTitle: "Bronson Family Farm",
    navTitle: "Navigate",
    quickTitle: "Quick Actions",
    dashboardTitle: "Live Ecosystem Workspace",
    heroTitle: "Bronson Family Farm Live Demo",
    heroText:
      "A living ecosystem where food, land, family, youth opportunity, wellness, and community renewal work together in one place.",
    openShop: "Open GrownBy Shop",
    supportNow: "Support the Ecosystem",
    today: "Today",
    sections: {
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
    stats: {
      title: "Live Snapshot",
      acres: "Active acres",
      languages: "Languages",
      pathways: "Pathways",
      market: "Market path",
    },
    calendar: {
      title: "Grower Calendar",
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    workspaceTitles: {
      dashboard: "Operations Dashboard",
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop + Market Flow",
      story: "Story + Place",
      workforce: "Workforce Pathway",
      community: "Community Participation",
      events: "Events + Activation",
      partner: "Partner Opportunity",
    },
    workspaceText: {
      dashboard:
        "This workspace keeps the ecosystem visible as a working system instead of a slideshow. Operations, scheduling, shopping, support, and participation stay connected.",
      grow:
        "Grower operations include crop flow, irrigation rhythm, field readiness, and daily production priorities.",
      calendar:
        "The calendar makes the ecosystem feel alive by showing timing, task flow, labor rhythm, and site movement.",
      shop:
        "The shop pathway connects the ecosystem to actual purchasing, customer visibility, and live selling.",
      story:
        "Bronson Family Farm is more than a farm. It is a place-based vision shaped by legacy, land, service, and renewal.",
      workforce:
        "The workforce pathway connects youth opportunity, responsibility, practical learning, and future readiness.",
      community:
        "The community pathway shows how volunteers, families, institutions, and supporters participate meaningfully.",
      events:
        "Events, tours, demonstrations, and market days make the ecosystem public, visible, and welcoming.",
      partner:
        "The partner pathway presents the opportunity to support infrastructure, irrigation, equipment, systems, programming, and long-term activation.",
    },
    support: {
      title: "Why This Matters",
      text:
        "This is not simply about crops. It is about food access, land stewardship, youth opportunity, wellness, family legacy, and community renewal growing together.",
    },
    modulesTitle: "Active Modules",
    moduleCards: {
      grow: "Crop flow, irrigation, and field readiness.",
      calendar: "Schedule, milestones, and production rhythm.",
      shop: "Live purchase path and customer visibility.",
      story: "Vision, place, legacy, and ecosystem context.",
      workforce: "Youth pathway, roles, skills, and learning.",
      community: "Volunteers, partners, families, and support.",
      events: "Markets, tours, demonstrations, and check-in.",
      partner: "Infrastructure, systems, and activation support.",
    },
    actions: {
      viewCalendar: "Open Calendar",
      viewGrow: "Open Grow",
      openStore: "Open Live Store",
      support: "Support the Ecosystem",
    },
    mini: {
      production: "Production Status",
      nextActions: "Next Actions",
      inventory: "Market Readiness",
      story: "Legacy + Place",
      workforce: "Youth + Skills",
      community: "Community + Partners",
      events: "Public Activation",
      partner: "Support Priorities",
    },
  },

  es: {
    appTitle: "Bronson Family Farm",
    navTitle: "Navegar",
    quickTitle: "Acciones Rápidas",
    dashboardTitle: "Espacio Vivo del Ecosistema",
    heroTitle: "Demostración en Vivo de Bronson Family Farm",
    heroText:
      "Un ecosistema vivo donde comida, tierra, familia, oportunidad juvenil, bienestar y renovación comunitaria trabajan juntos en un solo lugar.",
    openShop: "Abrir tienda GrownBy",
    supportNow: "Apoyar el Ecosistema",
    today: "Hoy",
    sections: {
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
    stats: {
      title: "Resumen en Vivo",
      acres: "Acres activos",
      languages: "Idiomas",
      pathways: "Rutas",
      market: "Ruta de mercado",
    },
    calendar: {
      title: "Calendario del Productor",
      time: "Hora",
      task: "Tarea",
      owner: "Responsable",
      status: "Estado",
      ready: "Listo",
      active: "Activo",
      pending: "Pendiente",
    },
    workspaceTitles: {
      dashboard: "Panel de Operaciones",
      grow: "Operaciones del Cultivo",
      calendar: "Calendario del Productor",
      shop: "Tienda y Flujo de Mercado",
      story: "Historia y Lugar",
      workforce: "Ruta Laboral",
      community: "Participación Comunitaria",
      events: "Eventos y Activación",
      partner: "Oportunidad de Alianza",
    },
    workspaceText: {
      dashboard:
        "Este espacio mantiene visible el ecosistema como un sistema de trabajo y no como una presentación. Operaciones, calendario, compras, apoyo y participación permanecen conectados.",
      grow:
        "Las operaciones del cultivo incluyen flujo de siembra, ritmo de riego, preparación del terreno y prioridades diarias.",
      calendar:
        "El calendario hace que el ecosistema se sienta vivo al mostrar tiempos, tareas, ritmo laboral y movimiento del sitio.",
      shop:
        "La ruta de tienda conecta el ecosistema con compras reales, visibilidad del cliente y ventas en vivo.",
      story:
        "Bronson Family Farm es más que una granja. Es una visión arraigada en el lugar, el legado, la tierra, el servicio y la renovación.",
      workforce:
        "La ruta laboral conecta oportunidad juvenil, responsabilidad, aprendizaje práctico y preparación futura.",
      community:
        "La ruta comunitaria muestra cómo voluntarios, familias, instituciones y aliados participan de forma significativa.",
      events:
        "Eventos, recorridos, demostraciones y días de mercado hacen que el ecosistema sea público, visible y acogedor.",
      partner:
        "La ruta de alianza presenta la oportunidad de apoyar infraestructura, riego, equipos, sistemas, programación y activación a largo plazo.",
    },
    support: {
      title: "Por Qué Importa",
      text:
        "No se trata solo de cultivos. Se trata de acceso a alimentos, cuidado de la tierra, oportunidad juvenil, bienestar, legado familiar y renovación comunitaria creciendo juntos.",
    },
    modulesTitle: "Módulos Activos",
    moduleCards: {
      grow: "Flujo de cultivos, riego y preparación del terreno.",
      calendar: "Horario, hitos y ritmo de producción.",
      shop: "Ruta de compra en vivo y visibilidad del cliente.",
      story: "Visión, lugar, legado y contexto del ecosistema.",
      workforce: "Ruta juvenil, roles, habilidades y aprendizaje.",
      community: "Voluntarios, aliados, familias y apoyo.",
      events: "Mercados, recorridos, demostraciones y registro.",
      partner: "Infraestructura, sistemas y apoyo de activación.",
    },
    actions: {
      viewCalendar: "Abrir Calendario",
      viewGrow: "Abrir Cultivar",
      openStore: "Abrir Tienda",
      support: "Apoyar el Ecosistema",
    },
    mini: {
      production: "Estado de Producción",
      nextActions: "Próximas Acciones",
      inventory: "Preparación de Mercado",
      story: "Legado y Lugar",
      workforce: "Juventud y Habilidades",
      community: "Comunidad y Aliados",
      events: "Activación Pública",
      partner: "Prioridades de Apoyo",
    },
  },

  tl: {
    appTitle: "Bronson Family Farm",
    navTitle: "Nabigasyon",
    quickTitle: "Mabilis na Gawain",
    dashboardTitle: "Live Ecosystem Workspace",
    heroTitle: "Bronson Family Farm Live Demo",
    heroText:
      "Isang buhay na ecosystem kung saan nagtutulungan ang pagkain, lupa, pamilya, oportunidad para sa kabataan, kalusugan, at pagbangon ng komunidad.",
    openShop: "Buksan ang GrownBy Shop",
    supportNow: "Suportahan ang Ecosystem",
    today: "Ngayon",
    sections: {
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
    stats: {
      title: "Live Snapshot",
      acres: "Aktibong acres",
      languages: "Mga wika",
      pathways: "Mga daan",
      market: "Market path",
    },
    calendar: {
      title: "Grower Calendar",
      time: "Oras",
      task: "Gawain",
      owner: "May hawak",
      status: "Estado",
      ready: "Handa",
      active: "Aktibo",
      pending: "Nakahintay",
    },
    workspaceTitles: {
      dashboard: "Operations Dashboard",
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop at Market Flow",
      story: "Kuwento at Lugar",
      workforce: "Workforce Pathway",
      community: "Pakikilahok ng Komunidad",
      events: "Mga Kaganapan at Aktibasyon",
      partner: "Partner Opportunity",
    },
    workspaceText: {
      dashboard:
        "Ipinapakita ng workspace na ito ang ecosystem bilang isang gumaganang sistema at hindi simpleng presentation. Magkakaugnay ang operations, calendar, shopping, support, at participation.",
      grow:
        "Kasama sa grower operations ang daloy ng tanim, ritmo ng irigasyon, kahandaan ng bukid, at araw-araw na prayoridad sa produksyon.",
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
    support: {
      title: "Bakit Ito Mahalaga",
      text:
        "Hindi lang ito tungkol sa pananim. Ito ay tungkol sa access sa pagkain, pangangalaga sa lupa, oportunidad para sa kabataan, kalusugan, pamana ng pamilya, at pagbangon ng komunidad.",
    },
    modulesTitle: "Active Modules",
    moduleCards: {
      grow: "Daloy ng tanim, irigasyon, at kahandaan ng bukid.",
      calendar: "Iskedyul, milestones, at ritmo ng produksyon.",
      shop: "Live purchase path at customer visibility.",
      story: "Bisyon, lugar, pamana, at konteksto ng ecosystem.",
      workforce: "Youth pathway, roles, skills, at learning.",
      community: "Mga boluntaryo, partner, pamilya, at suporta.",
      events: "Market, tours, demonstrations, at check-in.",
      partner: "Imprastraktura, systems, at activation support.",
    },
    actions: {
      viewCalendar: "Buksan ang Kalendaryo",
      viewGrow: "Buksan ang Grow",
      openStore: "Buksan ang Store",
      support: "Suportahan ang Ecosystem",
    },
    mini: {
      production: "Production Status",
      nextActions: "Next Actions",
      inventory: "Market Readiness",
      story: "Legacy at Lugar",
      workforce: "Kabataan at Skills",
      community: "Komunidad at Partners",
      events: "Public Activation",
      partner: "Support Priorities",
    },
  },

  it: {
    appTitle: "Bronson Family Farm",
    navTitle: "Navigazione",
    quickTitle: "Azioni Rapide",
    dashboardTitle: "Spazio Vivo dell’Ecosistema",
    heroTitle: "Demo Live di Bronson Family Farm",
    heroText:
      "Un ecosistema vivo in cui cibo, terra, famiglia, opportunità giovanili, benessere e rinnovamento della comunità lavorano insieme.",
    openShop: "Apri il negozio GrownBy",
    supportNow: "Sostieni l’Ecosistema",
    today: "Oggi",
    sections: {
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
    stats: {
      title: "Panoramica Live",
      acres: "Acres attivi",
      languages: "Lingue",
      pathways: "Percorsi",
      market: "Percorso mercato",
    },
    calendar: {
      title: "Calendario del Coltivatore",
      time: "Ora",
      task: "Attività",
      owner: "Responsabile",
      status: "Stato",
      ready: "Pronto",
      active: "Attivo",
      pending: "In attesa",
    },
    workspaceTitles: {
      dashboard: "Dashboard Operativa",
      grow: "Operazioni Agricole",
      calendar: "Calendario del Coltivatore",
      shop: "Flusso Negozio e Mercato",
      story: "Storia e Luogo",
      workforce: "Percorso Lavorativo",
      community: "Partecipazione della Comunità",
      events: "Eventi e Attivazione",
      partner: "Opportunità di Collaborazione",
    },
    workspaceText: {
      dashboard:
        "Questo spazio mostra l’ecosistema come sistema di lavoro e non come presentazione. Operazioni, calendario, acquisti, supporto e partecipazione restano collegati.",
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
    support: {
      title: "Perché è Importante",
      text:
        "Non si tratta solo di colture. Si tratta di accesso al cibo, cura della terra, opportunità per i giovani, benessere, eredità familiare e rinnovamento della comunità.",
    },
    modulesTitle: "Moduli Attivi",
    moduleCards: {
      grow: "Flusso delle colture, irrigazione e preparazione del campo.",
      calendar: "Programma, tappe e ritmo di produzione.",
      shop: "Percorso di acquisto live e visibilità cliente.",
      story: "Visione, luogo, eredità e contesto dell’ecosistema.",
      workforce: "Percorso giovanile, ruoli, competenze e apprendimento.",
      community: "Volontari, partner, famiglie e supporto.",
      events: "Mercati, visite, dimostrazioni e check-in.",
      partner: "Infrastrutture, sistemi e supporto di attivazione.",
    },
    actions: {
      viewCalendar: "Apri Calendario",
      viewGrow: "Apri Grow",
      openStore: "Apri Store",
      support: "Sostieni l’Ecosistema",
    },
    mini: {
      production: "Stato Produzione",
      nextActions: "Prossime Azioni",
      inventory: "Prontezza Mercato",
      story: "Eredità e Luogo",
      workforce: "Giovani e Competenze",
      community: "Comunità e Partner",
      events: "Attivazione Pubblica",
      partner: "Priorità di Supporto",
    },
  },

  patwa: {
    appTitle: "Bronson Family Farm",
    navTitle: "Navigate",
    quickTitle: "Quick Action Dem",
    dashboardTitle: "Live Ecosystem Workspace",
    heroTitle: "Bronson Family Farm Live Demo",
    heroText:
      "A wan livin ecosystem weh food, land, family, youth opportunity, wellness, an community renewal a work together inna one place.",
    openShop: "Open di GrownBy Shop",
    supportNow: "Support di Ecosystem",
    today: "Today",
    sections: {
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
    stats: {
      title: "Live Snapshot",
      acres: "Active acres",
      languages: "Language dem",
      pathways: "Pathway dem",
      market: "Market path",
    },
    calendar: {
      title: "Grower Calendar",
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    workspaceTitles: {
      dashboard: "Operations Dashboard",
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop an Market Flow",
      story: "Story an Place",
      workforce: "Workforce Pathway",
      community: "Community Participation",
      events: "Events an Activation",
      partner: "Partner Opportunity",
    },
    workspaceText: {
      dashboard:
        "Dis workspace show di ecosystem like a workin system an not no presentation. Operations, calendar, shopping, support, an participation stay connected.",
      grow:
        "Grower operations include crop flow, irrigation rhythm, field readiness, an daily production priority dem.",
      calendar:
        "Di calendar mek di ecosystem feel live by showin timing, task flow, labor rhythm, an site movement.",
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
    support: {
      title: "Why Dis Matter",
      text:
        "Dis no just bout crop. It bout food access, land care, youth opportunity, wellness, family legacy, an community renewal a grow together.",
    },
    modulesTitle: "Active Module Dem",
    moduleCards: {
      grow: "Crop flow, irrigation, an field readiness.",
      calendar: "Schedule, milestone dem, an production rhythm.",
      shop: "Live purchase path an customer visibility.",
      story: "Vision, place, legacy, an ecosystem context.",
      workforce: "Youth pathway, role dem, skill dem, an learning.",
      community: "Volunteer, partner, family, an support.",
      events: "Market, tour, demonstration, an check-in.",
      partner: "Infrastructure, systems, an activation support.",
    },
    actions: {
      viewCalendar: "Open Calendar",
      viewGrow: "Open Grow",
      openStore: "Open Store",
      support: "Support di Ecosystem",
    },
    mini: {
      production: "Production Status",
      nextActions: "Next Action Dem",
      inventory: "Market Readiness",
      story: "Legacy an Place",
      workforce: "Youth an Skill Dem",
      community: "Community an Partner Dem",
      events: "Public Activation",
      partner: "Support Priority Dem",
    },
  },

  he: {
    appTitle: "Bronson Family Farm",
    navTitle: "ניווט",
    quickTitle: "פעולות מהירות",
    dashboardTitle: "סביבת עבודה חיה של המערכת האקולוגית",
    heroTitle: "הדגמה חיה של Bronson Family Farm",
    heroText:
      "מערכת אקולוגית חיה שבה מזון, אדמה, משפחה, הזדמנות לנוער, בריאות והתחדשות קהילתית פועלים יחד במקום אחד.",
    openShop: "פתחו את חנות GrownBy",
    supportNow: "תמכו במערכת האקולוגית",
    today: "היום",
    sections: {
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
    stats: {
      title: "תמונת מצב חיה",
      acres: "אקרים פעילים",
      languages: "שפות",
      pathways: "מסלולים",
      market: "מסלול שוק",
    },
    calendar: {
      title: "לוח מגדלים",
      time: "שעה",
      task: "משימה",
      owner: "אחראי",
      status: "סטטוס",
      ready: "מוכן",
      active: "פעיל",
      pending: "ממתין",
    },
    workspaceTitles: {
      dashboard: "לוח תפעול",
      grow: "תפעול גידול",
      calendar: "לוח מגדלים",
      shop: "חנות וזרימת שוק",
      story: "סיפור ומקום",
      workforce: "מסלול כוח עבודה",
      community: "השתתפות קהילתית",
      events: "אירועים והפעלה",
      partner: "הזדמנות לשותפות",
    },
    workspaceText: {
      dashboard:
        "המרחב הזה מציג את המערכת האקולוגית כמערכת עבודה ולא כמצגת. תפעול, לוח שנה, קניות, תמיכה והשתתפות נשארים מחוברים.",
      grow:
        "תפעול הגידול כולל זרימת גידולים, קצב השקיה, מוכנות השטח וסדרי עדיפויות יומיים.",
      calendar:
        "לוח השנה גורם למערכת האקולוגית להרגיש חיה על ידי הצגת זמנים, זרימת משימות, קצב העבודה ותנועת האתר.",
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
    support: {
      title: "למה זה חשוב",
      text:
        "זה לא רק על גידולים. זה על גישה למזון, שמירה על אדמה, הזדמנות לנוער, בריאות, מורשת משפחתית והתחדשות קהילתית שצומחים יחד.",
    },
    modulesTitle: "מודולים פעילים",
    moduleCards: {
      grow: "זרימת גידולים, השקיה ומוכנות השטח.",
      calendar: "לוח זמנים, אבני דרך וקצב ייצור.",
      shop: "מסלול רכישה חי וחשיפת לקוחות.",
      story: "חזון, מקום, מורשת והקשר אקולוגי.",
      workforce: "מסלול נוער, תפקידים, מיומנויות ולמידה.",
      community: "מתנדבים, שותפים, משפחות ותמיכה.",
      events: "שווקים, סיורים, הדגמות ורישום.",
      partner: "תשתיות, מערכות ותמיכת הפעלה.",
    },
    actions: {
      viewCalendar: "פתחו לוח שנה",
      viewGrow: "פתחו גידול",
      openStore: "פתחו חנות",
      support: "תמכו במערכת האקולוגית",
    },
    mini: {
      production: "סטטוס ייצור",
      nextActions: "הפעולות הבאות",
      inventory: "מוכנות לשוק",
      story: "מורשת ומקום",
      workforce: "נוער ומיומנויות",
      community: "קהילה ושותפים",
      events: "הפעלה ציבורית",
      partner: "עדיפויות תמיכה",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [panel, setPanel] = useState<Panel>("dashboard");

  const t = labels[lang];
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
      status: t.calendar.ready,
    },
    {
      time: "9:00 AM",
      task: "Harvest greens",
      owner: "Workforce",
      status: t.calendar.active,
    },
    {
      time: "12:00 PM",
      task: "Market prep",
      owner: "Shop Team",
      status: t.calendar.pending,
    },
    {
      time: "4:00 PM",
      task: "Community market",
      owner: "Events",
      status: t.calendar.active,
    },
  ];

  const sidebarItems: { key: Panel; label: string }[] = [
    { key: "dashboard", label: t.sections.dashboard },
    { key: "grow", label: t.sections.grow },
    { key: "calendar", label: t.sections.calendar },
    { key: "shop", label: t.sections.shop },
    { key: "story", label: t.sections.story },
    { key: "workforce", label: t.sections.workforce },
    { key: "community", label: t.sections.community },
    { key: "events", label: t.sections.events },
    { key: "partner", label: t.sections.partner },
  ];

  function renderPanel() {
    if (panel === "dashboard") {
      return (
        <>
          <section style={styles.heroCard}>
            <img src={HERO_IMAGE} alt={t.appTitle} style={styles.heroImage} />
            <div style={styles.heroContent}>
              <div>
                <div style={styles.eyebrow}>{t.appTitle}</div>
                <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
                <p style={styles.heroText}>{t.heroText}</p>
              </div>
              <div style={styles.heroActions}>
                <button style={styles.primaryButton} onClick={() => setPanel("shop")}>
                  {t.openShop}
                </button>
                <button style={styles.secondaryButton} onClick={() => setPanel("partner")}>
                  {t.supportNow}
                </button>
              </div>
            </div>
          </section>

          <section style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.stats.title}</div>
              <div style={styles.statValue}>3</div>
              <div style={styles.statSub}>{t.stats.acres}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.stats.title}</div>
              <div style={styles.statValue}>6</div>
              <div style={styles.statSub}>{t.stats.languages}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.stats.title}</div>
              <div style={styles.statValue}>8</div>
              <div style={styles.statSub}>{t.stats.pathways}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>{t.stats.title}</div>
              <div style={styles.statValue}>Live</div>
              <div style={styles.statSub}>{t.stats.market}</div>
            </div>
          </section>

          <section style={styles.workspaceGrid}>
            <div style={styles.largePanel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>{t.calendar.title}</h2>
                <div style={styles.panelMeta}>
                  {t.today}: {today}
                </div>
              </div>

              <div style={styles.table}>
                <div style={styles.tableHead}>
                  <div>{t.calendar.time}</div>
                  <div>{t.calendar.task}</div>
                  <div>{t.calendar.owner}</div>
                  <div>{t.calendar.status}</div>
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
                  {t.actions.viewCalendar}
                </button>
                <button style={styles.secondaryButton} onClick={() => setPanel("grow")}>
                  {t.actions.viewGrow}
                </button>
              </div>
            </div>

            <div style={styles.sideColumn}>
              <div style={styles.smallPanel}>
                <h3 style={styles.panelTitle}>{t.support.title}</h3>
                <p style={styles.panelBody}>{t.support.text}</p>
                <button style={styles.primaryButton} onClick={() => setPanel("partner")}>
                  {t.supportNow}
                </button>
              </div>

              <div style={styles.smallPanel}>
                <h3 style={styles.panelTitle}>{t.modulesTitle}</h3>
                <div style={styles.pathwayGrid}>
                  {(["grow", "shop", "story", "workforce", "community", "events"] as const).map(
                    (key) => (
                      <button
                        key={key}
                        style={styles.pathwayButton}
                        onClick={() => setPanel(key)}
                      >
                        {t.sections[key]}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>

          <section style={styles.modulesBlock}>
            <h3 style={styles.modulesTitle}>{t.modulesTitle}</h3>
            <div style={styles.modulesGrid}>
              {(["grow", "shop", "story", "workforce", "community", "events", "partner"] as const).map(
                (key) => (
                  <button key={key} style={styles.moduleCard} onClick={() => setPanel(key)}>
                    <div style={styles.moduleCardTitle}>
                      {key === "partner" ? t.sections.partner : t.sections[key]}
                    </div>
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
            <h2 style={styles.panelTitle}>{t.workspaceTitles.grow}</h2>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.grow}</p>
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
            <h2 style={styles.panelTitle}>{t.workspaceTitles.calendar}</h2>
            <div style={styles.panelMeta}>
              {t.today}: {today}
            </div>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.calendar}</p>
          <div style={styles.table}>
            <div style={styles.tableHead}>
              <div>{t.calendar.time}</div>
              <div>{t.calendar.task}</div>
              <div>{t.calendar.owner}</div>
              <div>{t.calendar.status}</div>
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
            <h2 style={styles.panelTitle}>{t.workspaceTitles.shop}</h2>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.shop}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.inventory}</h4>
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
              <h4 style={styles.infoTitle}>{t.support.title}</h4>
              <p style={styles.infoText}>{t.support.text}</p>
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
              <h2 style={styles.panelTitle}>{t.workspaceTitles.story}</h2>
              <p style={styles.panelBody}>{t.workspaceText.story}</p>
            </div>
            <img src={STORY_IMAGE} alt={t.sections.story} style={styles.storyImage} />
          </div>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.story}</h4>
              <p style={styles.infoText}>{t.moduleCards.story}</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.support.title}</h4>
              <p style={styles.infoText}>{t.support.text}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "workforce") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.workspaceTitles.workforce}</h2>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.workforce}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.workforce}</h4>
              <p style={styles.infoText}>Youth roles: Active</p>
              <p style={styles.infoText}>Skills focus: Responsibility, teamwork, task completion</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.support.title}</h4>
              <p style={styles.infoText}>{t.support.text}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "community") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.workspaceTitles.community}</h2>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.community}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.community}</h4>
              <p style={styles.infoText}>Volunteers: Open</p>
              <p style={styles.infoText}>Families: Welcome</p>
              <p style={styles.infoText}>Institutions: Partnership-ready</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.support.title}</h4>
              <p style={styles.infoText}>{t.support.text}</p>
            </div>
          </div>
        </>
      );
    }

    if (panel === "events") {
      return (
        <>
          <div style={styles.sectionHeader}>
            <h2 style={styles.panelTitle}>{t.workspaceTitles.events}</h2>
          </div>
          <p style={styles.panelBody}>{t.workspaceText.events}</p>
          <div style={styles.infoGrid}>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.mini.events}</h4>
              <p style={styles.infoText}>Growers Supply Market</p>
              <p style={styles.infoText}>Tours and demonstrations</p>
              <p style={styles.infoText}>Community activation</p>
            </div>
            <div style={styles.infoCard}>
              <h4 style={styles.infoTitle}>{t.support.title}</h4>
              <p style={styles.infoText}>{t.support.text}</p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div style={styles.sectionHeader}>
          <h2 style={styles.panelTitle}>{t.workspaceTitles.partner}</h2>
        </div>
        <p style={styles.panelBody}>{t.workspaceText.partner}</p>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>{t.mini.partner}</h4>
            <p style={styles.infoText}>Infrastructure</p>
            <p style={styles.infoText}>Irrigation</p>
            <p style={styles.infoText}>Equipment + systems</p>
            <p style={styles.infoText}>Programming + activation</p>
            <button style={styles.primaryButton}>{t.actions.support}</button>
          </div>
          <div style={styles.infoCard}>
            <h4 style={styles.infoTitle}>{t.support.title}</h4>
            <p style={styles.infoText}>{t.support.text}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ ...styles.app, direction: isRTL ? "rtl" : "ltr" }}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarBrand}>{t.appTitle}</div>
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

        <div style={styles.sidebarLabel}>{t.navTitle}</div>
        <div style={styles.sidebarNav}>
          {sidebarItems.map((item) => (
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

        <div style={styles.sidebarLabel}>{t.quickTitle}</div>
        <div style={styles.sidebarNav}>
          <button style={styles.quickButton} onClick={() => setPanel("shop")}>
            {t.openShop}
          </button>
          <button style={styles.quickButton} onClick={() => setPanel("partner")}>
            {t.supportNow}
          </button>
          <button style={styles.quickButton} onClick={() => setPanel("calendar")}>
            {t.calendar.title}
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
