import React, { useMemo, useState } from "react";

type Lang = "en" | "es" | "tl" | "it" | "patwa" | "he";
type View =
  | "dashboard"
  | "grow"
  | "calendar"
  | "shop"
  | "story"
  | "workforce"
  | "community"
  | "events"
  | "partner";

const heroImage = "/GrowArea.jpg";

const labels = {
  en: {
    appTitle: "Bronson Family Farm",
    heroTitle: "A Living Farm Ecosystem",
    heroSubtitle:
      "Food, land, family, workforce, and community renewal working together in one place.",
    dashboard: "Ecosystem Dashboard",
    enterShop: "Open GrownBy Shop",
    partnerNow: "Partner Now",
    back: "← Back to Dashboard",
    today: "Today",
    growerCalendar: "Grower Calendar",
    operations: "Operations",
    livePathways: "Live Pathways",
    support: "Support",
    modulesTitle: "Core Ecosystem Modules",
    modules: {
      grow: "Grow",
      calendar: "Calendar",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
      partner: "Partner",
    },
    dashboardCards: {
      grow: {
        title: "Grower Operations",
        text: "Crop flow, field readiness, irrigation thinking, and seasonal production priorities.",
      },
      calendar: {
        title: "Grower Calendar",
        text: "Tasks, pickups, workforce rhythm, market prep, and site activity in one place.",
      },
      shop: {
        title: "Shop + Market Pathway",
        text: "Move from ecosystem visibility into actual purchasing and customer engagement.",
      },
      workforce: {
        title: "Workforce Pathway",
        text: "Youth opportunity, responsibility, skill-building, and practical learning.",
      },
      community: {
        title: "Community Participation",
        text: "Volunteers, families, institutions, and partners stepping into the ecosystem.",
      },
      partner: {
        title: "The Opportunity to Partner",
        text: "Infrastructure, irrigation, equipment, systems, and long-term ecosystem activation.",
      },
    },
    sectionTitles: {
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop + Market Pathway",
      story: "Story + Place",
      workforce: "Workforce Pathway",
      community: "Community Participation",
      events: "Events + Activation",
      partner: "Partner with Bronson Family Farm",
    },
    sectionText: {
      grow:
        "This area reflects how the ecosystem actually works: crop planning, planting flow, seasonal priorities, irrigation needs, and the systems required to sustain production.",
      calendar:
        "The grower calendar makes the ecosystem feel alive. It shows tasks, milestones, preparation windows, and the rhythm of real farm activity.",
      shop:
        "The shop pathway connects the story of the farm to actual transactions, visibility, and customer engagement through live purchasing.",
      story:
        "Bronson Family Farm is more than a farm. It is a community-rooted vision shaped by legacy, land, service, and the belief that renewal can grow from place.",
      workforce:
        "The workforce pathway connects youth opportunity, hands-on learning, responsibility, confidence-building, and practical steps toward future leadership.",
      community:
        "The community pathway shows how volunteers, families, institutions, and local supporters can participate meaningfully in the ecosystem.",
      events:
        "Markets, tours, demonstrations, and community days make the ecosystem visible, active, and welcoming.",
      partner:
        "Bronson Family Farm is seeking aligned support to expand infrastructure, irrigation, equipment, systems, programming, and the physical capacity needed to activate this ecosystem at scale.",
    },
    supportPanelTitle: "Why this matters",
    supportPanelText:
      "This is not simply about crops. It is about food access, land stewardship, youth opportunity, wellness, family legacy, and community renewal growing together.",
    calendarCols: {
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
    },
    statuses: {
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    quickStats: {
      title: "Live Snapshot",
      acres: "Active acres",
      pathways: "Pathways visible",
      languages: "Languages available",
      market: "Market path",
    },
    openModule: "Open module",
  },

  es: {
    appTitle: "Bronson Family Farm",
    heroTitle: "Un Ecosistema Agrícola Vivo",
    heroSubtitle:
      "Comida, tierra, familia, trabajo y renovación comunitaria funcionando juntos en un solo lugar.",
    dashboard: "Panel del Ecosistema",
    enterShop: "Abrir tienda GrownBy",
    partnerNow: "Asociarse ahora",
    back: "← Volver al Panel",
    today: "Hoy",
    growerCalendar: "Calendario del Productor",
    operations: "Operaciones",
    livePathways: "Rutas Vivas",
    support: "Apoyo",
    modulesTitle: "Módulos Principales del Ecosistema",
    modules: {
      grow: "Cultivar",
      calendar: "Calendario",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
      partner: "Alianza",
    },
    dashboardCards: {
      grow: {
        title: "Operaciones del Cultivo",
        text: "Flujo de cultivos, preparación del terreno, riego y prioridades estacionales de producción.",
      },
      calendar: {
        title: "Calendario del Productor",
        text: "Tareas, recogidas, ritmo laboral, preparación de mercado y actividad del sitio.",
      },
      shop: {
        title: "Ruta de Tienda y Mercado",
        text: "Pasar de la visibilidad del ecosistema a la compra real y la participación del cliente.",
      },
      workforce: {
        title: "Ruta Laboral",
        text: "Oportunidad juvenil, responsabilidad, desarrollo de habilidades y aprendizaje práctico.",
      },
      community: {
        title: "Participación Comunitaria",
        text: "Voluntarios, familias, instituciones y aliados entrando al ecosistema.",
      },
      partner: {
        title: "La Oportunidad de Asociarse",
        text: "Infraestructura, riego, equipos, sistemas y activación del ecosistema a largo plazo.",
      },
    },
    sectionTitles: {
      grow: "Operaciones del Cultivo",
      calendar: "Calendario del Productor",
      shop: "Ruta de Tienda y Mercado",
      story: "Historia y Lugar",
      workforce: "Ruta Laboral",
      community: "Participación Comunitaria",
      events: "Eventos y Activación",
      partner: "Asóciese con Bronson Family Farm",
    },
    sectionText: {
      grow:
        "Esta área refleja cómo funciona realmente el ecosistema: planificación de cultivos, flujo de siembra, prioridades estacionales, necesidades de riego y sistemas de producción.",
      calendar:
        "El calendario del productor hace que el ecosistema se sienta vivo. Muestra tareas, hitos, ventanas de preparación y el ritmo real de la actividad agrícola.",
      shop:
        "La ruta de tienda conecta la historia de la granja con transacciones reales, visibilidad y participación del cliente.",
      story:
        "Bronson Family Farm es más que una granja. Es una visión comunitaria formada por legado, tierra, servicio y la creencia de que la renovación puede crecer desde el lugar.",
      workforce:
        "La ruta laboral conecta oportunidad juvenil, aprendizaje práctico, responsabilidad, confianza y pasos concretos hacia el liderazgo futuro.",
      community:
        "La ruta comunitaria muestra cómo voluntarios, familias, instituciones y aliados locales pueden participar de manera significativa.",
      events:
        "Mercados, recorridos, demostraciones y días comunitarios hacen visible, activa y acogedora la vida del ecosistema.",
      partner:
        "Bronson Family Farm busca apoyo alineado para ampliar infraestructura, riego, equipos, sistemas, programación y capacidad física a escala.",
    },
    supportPanelTitle: "Por qué importa",
    supportPanelText:
      "No se trata solo de cultivos. Se trata de acceso a alimentos, cuidado de la tierra, oportunidad juvenil, bienestar, legado familiar y renovación comunitaria creciendo juntos.",
    calendarCols: {
      time: "Hora",
      task: "Tarea",
      owner: "Responsable",
      status: "Estado",
    },
    statuses: {
      ready: "Listo",
      active: "Activo",
      pending: "Pendiente",
    },
    quickStats: {
      title: "Resumen en Vivo",
      acres: "Acres activos",
      pathways: "Rutas visibles",
      languages: "Idiomas disponibles",
      market: "Ruta de mercado",
    },
    openModule: "Abrir módulo",
  },

  tl: {
    appTitle: "Bronson Family Farm",
    heroTitle: "Isang Buhay na Ecosystem ng Bukid",
    heroSubtitle:
      "Pagkain, lupa, pamilya, hanapbuhay, at pagbangon ng komunidad sa iisang lugar.",
    dashboard: "Ecosystem Dashboard",
    enterShop: "Buksan ang GrownBy Shop",
    partnerNow: "Makipagpartner Ngayon",
    back: "← Bumalik sa Dashboard",
    today: "Ngayon",
    growerCalendar: "Grower Calendar",
    operations: "Operasyon",
    livePathways: "Buhay na Daan",
    support: "Suporta",
    modulesTitle: "Pangunahing Mga Module ng Ecosystem",
    modules: {
      grow: "Pagtatanim",
      calendar: "Kalendaryo",
      shop: "Pamimili",
      story: "Kuwento",
      workforce: "Hanapbuhay",
      community: "Komunidad",
      events: "Mga Kaganapan",
      partner: "Partner",
    },
    dashboardCards: {
      grow: {
        title: "Grower Operations",
        text: "Daloy ng tanim, kahandaan ng bukid, irigasyon, at pana-panahong prayoridad.",
      },
      calendar: {
        title: "Grower Calendar",
        text: "Mga gawain, pickups, ritmo ng trabaho, paghahanda sa market, at aktibidad sa site.",
      },
      shop: {
        title: "Shop at Market Pathway",
        text: "Mula sa pagkakakilala sa ecosystem patungo sa aktuwal na pagbili at ugnayan sa customer.",
      },
      workforce: {
        title: "Workforce Pathway",
        text: "Oportunidad para sa kabataan, pananagutan, kasanayan, at praktikal na pagkatuto.",
      },
      community: {
        title: "Pakikilahok ng Komunidad",
        text: "Mga boluntaryo, pamilya, institusyon, at katuwang na pumapasok sa ecosystem.",
      },
      partner: {
        title: "Oportunidad na Makipagpartner",
        text: "Imprastraktura, irigasyon, kagamitan, sistema, at pangmatagalang pag-activate ng ecosystem.",
      },
    },
    sectionTitles: {
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop at Market Pathway",
      story: "Kuwento at Lugar",
      workforce: "Workforce Pathway",
      community: "Pakikilahok ng Komunidad",
      events: "Mga Kaganapan at Aktibasyon",
      partner: "Makipagpartner sa Bronson Family Farm",
    },
    sectionText: {
      grow:
        "Ipinapakita ng bahaging ito kung paano talaga gumagana ang ecosystem: pagpaplano ng tanim, daloy ng pagtatanim, pana-panahong prayoridad, pangangailangan sa irigasyon, at mga sistemang pang-produksyon.",
      calendar:
        "Ang grower calendar ang nagbibigay-buhay sa ecosystem. Ipinapakita nito ang mga gawain, milestones, paghahanda, at tunay na ritmo ng bukid.",
      shop:
        "Ikinokonekta ng shop pathway ang kuwento ng bukid sa tunay na transaksyon, visibility, at pakikilahok ng customer.",
      story:
        "Ang Bronson Family Farm ay higit pa sa isang bukid. Isa itong pananaw na nakaugat sa komunidad, pamana, lupa, paglilingkod, at pagbangon.",
      workforce:
        "Ikinokonekta ng workforce pathway ang oportunidad para sa kabataan, hands-on na pagkatuto, pananagutan, kumpiyansa, at daan tungo sa pamumuno.",
      community:
        "Ipinapakita ng community pathway kung paano makakalahok nang makabuluhan ang mga boluntaryo, pamilya, institusyon, at lokal na tagasuporta.",
      events:
        "Ang mga market, tour, demonstration, at community day ang nagpapakitang buhay, aktibo, at bukas ang ecosystem.",
      partner:
        "Ang Bronson Family Farm ay naghahanap ng suportang naaayon upang mapalawak ang imprastraktura, irigasyon, kagamitan, sistema, programming, at kapasidad ng site.",
    },
    supportPanelTitle: "Bakit ito mahalaga",
    supportPanelText:
      "Hindi lang ito tungkol sa pananim. Ito ay tungkol sa access sa pagkain, pangangalaga sa lupa, oportunidad para sa kabataan, kalusugan, pamana ng pamilya, at pagbangon ng komunidad.",
    calendarCols: {
      time: "Oras",
      task: "Gawain",
      owner: "May hawak",
      status: "Estado",
    },
    statuses: {
      ready: "Handa",
      active: "Aktibo",
      pending: "Nakahintay",
    },
    quickStats: {
      title: "Live Snapshot",
      acres: "Aktibong acres",
      pathways: "Nakikitang daan",
      languages: "Wikang available",
      market: "Market path",
    },
    openModule: "Buksan ang module",
  },

  it: {
    appTitle: "Bronson Family Farm",
    heroTitle: "Un Ecosistema Agricolo Vivo",
    heroSubtitle:
      "Cibo, terra, famiglia, lavoro e rinnovamento della comunità in un unico luogo.",
    dashboard: "Dashboard dell’Ecosistema",
    enterShop: "Apri il negozio GrownBy",
    partnerNow: "Collabora Ora",
    back: "← Torna alla Dashboard",
    today: "Oggi",
    growerCalendar: "Calendario del Coltivatore",
    operations: "Operazioni",
    livePathways: "Percorsi Vivi",
    support: "Supporto",
    modulesTitle: "Moduli Principali dell’Ecosistema",
    modules: {
      grow: "Coltivare",
      calendar: "Calendario",
      shop: "Acquistare",
      story: "Storia",
      workforce: "Lavoro",
      community: "Comunità",
      events: "Eventi",
      partner: "Partner",
    },
    dashboardCards: {
      grow: {
        title: "Operazioni Agricole",
        text: "Flusso delle colture, preparazione del campo, irrigazione e priorità stagionali.",
      },
      calendar: {
        title: "Calendario del Coltivatore",
        text: "Attività, ritiri, ritmo del lavoro, preparazione del mercato e attività del sito.",
      },
      shop: {
        title: "Percorso Negozio e Mercato",
        text: "Dalla visibilità dell’ecosistema all’acquisto reale e al coinvolgimento del cliente.",
      },
      workforce: {
        title: "Percorso Lavorativo",
        text: "Opportunità per i giovani, responsabilità, competenze e apprendimento pratico.",
      },
      community: {
        title: "Partecipazione della Comunità",
        text: "Volontari, famiglie, istituzioni e partner che entrano nell’ecosistema.",
      },
      partner: {
        title: "Opportunità di Collaborazione",
        text: "Infrastrutture, irrigazione, attrezzature, sistemi e attivazione dell’ecosistema nel lungo periodo.",
      },
    },
    sectionTitles: {
      grow: "Operazioni Agricole",
      calendar: "Calendario del Coltivatore",
      shop: "Percorso Negozio e Mercato",
      story: "Storia e Luogo",
      workforce: "Percorso Lavorativo",
      community: "Partecipazione della Comunità",
      events: "Eventi e Attivazione",
      partner: "Collabora con Bronson Family Farm",
    },
    sectionText: {
      grow:
        "Questa area riflette il funzionamento reale dell’ecosistema: pianificazione, semina, priorità stagionali, bisogni di irrigazione e sistemi di produzione.",
      calendar:
        "Il calendario del coltivatore rende l’ecosistema vivo. Mostra attività, tappe, finestre di preparazione e il ritmo reale della fattoria.",
      shop:
        "Il percorso del negozio collega la storia della fattoria a transazioni reali, visibilità e coinvolgimento del cliente.",
      story:
        "Bronson Family Farm è più di una fattoria. È una visione radicata nella comunità, nel lascito, nella terra, nel servizio e nel rinnovamento.",
      workforce:
        "Il percorso lavorativo collega opportunità per i giovani, apprendimento pratico, responsabilità, fiducia e passi concreti verso la leadership futura.",
      community:
        "Il percorso comunitario mostra come volontari, famiglie, istituzioni e sostenitori locali possano partecipare in modo significativo.",
      events:
        "Mercati, visite, dimostrazioni e giornate comunitarie rendono l’ecosistema visibile, attivo e accogliente.",
      partner:
        "Bronson Family Farm cerca supporto allineato per ampliare infrastrutture, irrigazione, attrezzature, sistemi, programmazione e capacità del sito.",
    },
    supportPanelTitle: "Perché è importante",
    supportPanelText:
      "Non si tratta solo di colture. Si tratta di accesso al cibo, cura della terra, opportunità per i giovani, benessere, eredità familiare e rinnovamento della comunità.",
    calendarCols: {
      time: "Ora",
      task: "Attività",
      owner: "Responsabile",
      status: "Stato",
    },
    statuses: {
      ready: "Pronto",
      active: "Attivo",
      pending: "In attesa",
    },
    quickStats: {
      title: "Panoramica Live",
      acres: "Acres attivi",
      pathways: "Percorsi visibili",
      languages: "Lingue disponibili",
      market: "Percorso mercato",
    },
    openModule: "Apri modulo",
  },

  patwa: {
    appTitle: "Bronson Family Farm",
    heroTitle: "A Livin Farm Ecosystem",
    heroSubtitle:
      "Food, land, family, workforce, an community renewal a work together inna one place.",
    dashboard: "Ecosystem Dashboard",
    enterShop: "Open di GrownBy Shop",
    partnerNow: "Partner Now",
    back: "← Back to di Dashboard",
    today: "Today",
    growerCalendar: "Grower Calendar",
    operations: "Operations",
    livePathways: "Live Pathway Dem",
    support: "Support",
    modulesTitle: "Core Ecosystem Module Dem",
    modules: {
      grow: "Grow",
      calendar: "Calendar",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
      partner: "Partner",
    },
    dashboardCards: {
      grow: {
        title: "Grower Operations",
        text: "Crop flow, field readiness, irrigation thinking, an seasonal production priority dem.",
      },
      calendar: {
        title: "Grower Calendar",
        text: "Task dem, pickup dem, workforce rhythm, market prep, an site activity inna one place.",
      },
      shop: {
        title: "Shop an Market Pathway",
        text: "Move from ecosystem visibility to real purchasing an customer engagement.",
      },
      workforce: {
        title: "Workforce Pathway",
        text: "Youth opportunity, responsibility, skill-building, an practical learning.",
      },
      community: {
        title: "Community Participation",
        text: "Volunteer, family, institution, an partner dem step inna di ecosystem.",
      },
      partner: {
        title: "Di Opportunity fi Partner",
        text: "Infrastructure, irrigation, equipment, systems, an long-term ecosystem activation.",
      },
    },
    sectionTitles: {
      grow: "Grower Operations",
      calendar: "Grower Calendar",
      shop: "Shop an Market Pathway",
      story: "Story an Place",
      workforce: "Workforce Pathway",
      community: "Community Participation",
      events: "Events an Activation",
      partner: "Partner wid Bronson Family Farm",
    },
    sectionText: {
      grow:
        "Dis area show how di ecosystem really work: crop planning, planting flow, seasonal priority dem, irrigation needs, an production systems.",
      calendar:
        "Di grower calendar mek di ecosystem feel live. It show task dem, milestone dem, prep window dem, an di real rhythm a farm activity.",
      shop:
        "Di shop pathway connect di farm story to real transaction, visibility, an customer engagement.",
      story:
        "Bronson Family Farm more than a farm. It a one community-rooted vision shape by legacy, land, service, an renewal.",
      workforce:
        "Di workforce pathway connect youth opportunity, hands-on learning, responsibility, confidence, an real step dem toward future leadership.",
      community:
        "Di community pathway show how volunteer, family, institution, an local supporter dem can take part inna meaningful ways.",
      events:
        "Market, tour, demonstration, an community day mek di ecosystem visible, active, an welcoming.",
      partner:
        "Bronson Family Farm a seek aligned support fi expand infrastructure, irrigation, equipment, systems, programming, an site capacity.",
    },
    supportPanelTitle: "Why dis matter",
    supportPanelText:
      "Dis no just bout crop. It bout food access, land care, youth opportunity, wellness, family legacy, an community renewal a grow together.",
    calendarCols: {
      time: "Time",
      task: "Task",
      owner: "Owner",
      status: "Status",
    },
    statuses: {
      ready: "Ready",
      active: "Active",
      pending: "Pending",
    },
    quickStats: {
      title: "Live Snapshot",
      acres: "Active acres",
      pathways: "Visible pathway dem",
      languages: "Language dem",
      market: "Market path",
    },
    openModule: "Open module",
  },

  he: {
    appTitle: "Bronson Family Farm",
    heroTitle: "מערכת אקולוגית חיה של חווה",
    heroSubtitle:
      "מזון, אדמה, משפחה, עבודה והתחדשות קהילתית פועלים יחד במקום אחד.",
    dashboard: "לוח הבקרה של המערכת האקולוגית",
    enterShop: "פתחו את חנות GrownBy",
    partnerNow: "הצטרפו עכשיו",
    back: "← חזרה ללוח הבקרה",
    today: "היום",
    growerCalendar: "לוח מגדלים",
    operations: "תפעול",
    livePathways: "מסלולים חיים",
    support: "תמיכה",
    modulesTitle: "מודולים מרכזיים של המערכת האקולוגית",
    modules: {
      grow: "גידול",
      calendar: "לוח שנה",
      shop: "קנייה",
      story: "סיפור",
      workforce: "כוח עבודה",
      community: "קהילה",
      events: "אירועים",
      partner: "שותפות",
    },
    dashboardCards: {
      grow: {
        title: "תפעול גידול",
        text: "זרימת גידולים, מוכנות השטח, חשיבה על השקיה וסדרי עדיפויות עונתיים.",
      },
      calendar: {
        title: "לוח מגדלים",
        text: "משימות, איסופים, קצב עבודה, הכנות לשוק ופעילות האתר במקום אחד.",
      },
      shop: {
        title: "מסלול חנות ושוק",
        text: "מעבר מחשיפה במערכת האקולוגית לרכישה אמיתית ומעורבות לקוחות.",
      },
      workforce: {
        title: "מסלול כוח עבודה",
        text: "הזדמנות לנוער, אחריות, בניית מיומנויות ולמידה מעשית.",
      },
      community: {
        title: "השתתפות קהילתית",
        text: "מתנדבים, משפחות, מוסדות ושותפים שנכנסים למערכת האקולוגית.",
      },
      partner: {
        title: "הזדמנות לשותפות",
        text: "תשתיות, השקיה, ציוד, מערכות והפעלה ארוכת טווח של המערכת האקולוגית.",
      },
    },
    sectionTitles: {
      grow: "תפעול גידול",
      calendar: "לוח מגדלים",
      shop: "מסלול חנות ושוק",
      story: "סיפור ומקום",
      workforce: "מסלול כוח עבודה",
      community: "השתתפות קהילתית",
      events: "אירועים והפעלה",
      partner: "שתפו פעולה עם Bronson Family Farm",
    },
    sectionText: {
      grow:
        "אזור זה משקף כיצד המערכת האקולוגית באמת פועלת: תכנון גידולים, זרימת שתילה, סדרי עדיפויות עונתיים, צרכי השקיה ומערכות ייצור.",
      calendar:
        "לוח המגדלים גורם למערכת האקולוגית להרגיש חיה. הוא מציג משימות, אבני דרך, חלונות הכנה וקצב אמיתי של פעילות החווה.",
      shop:
        "מסלול החנות מחבר את סיפור החווה לעסקאות אמיתיות, לחשיפה ולמעורבות לקוחות.",
      story:
        "Bronson Family Farm היא יותר מחווה. זהו חזון קהילתי שמבוסס על מורשת, אדמה, שירות והתחדשות.",
      workforce:
        "מסלול כוח העבודה מחבר בין הזדמנות לנוער, למידה מעשית, אחריות, ביטחון עצמי וצעדים אמיתיים לעבר הנהגה עתידית.",
      community:
        "המסלול הקהילתי מראה כיצד מתנדבים, משפחות, מוסדות ותומכים מקומיים יכולים להשתתף בדרכים משמעותיות.",
      events:
        "שווקים, סיורים, הדגמות וימי קהילה הופכים את המערכת האקולוגית לנראית, פעילה ומזמינה.",
      partner:
        "Bronson Family Farm מחפשת תמיכה מתאימה להרחבת תשתיות, השקיה, ציוד, מערכות, תוכניות ויכולת האתר.",
    },
    supportPanelTitle: "למה זה חשוב",
    supportPanelText:
      "זה לא רק על יבולים. זה על גישה למזון, שמירה על אדמה, הזדמנות לנוער, בריאות, מורשת משפחתית והתחדשות קהילתית שצומחים יחד.",
    calendarCols: {
      time: "שעה",
      task: "משימה",
      owner: "אחראי",
      status: "סטטוס",
    },
    statuses: {
      ready: "מוכן",
      active: "פעיל",
      pending: "ממתין",
    },
    quickStats: {
      title: "תמונת מצב חיה",
      acres: "אקרים פעילים",
      pathways: "מסלולים נראים",
      languages: "שפות זמינות",
      market: "מסלול שוק",
    },
    openModule: "פתחו מודול",
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [view, setView] = useState<View>("dashboard");

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
      time: "7:30 AM",
      task: t.modules.grow,
      owner: t.modules.workforce,
      status: t.statuses.ready,
    },
    {
      time: "9:00 AM",
      task: t.modules.shop,
      owner: t.modules.community,
      status: t.statuses.active,
    },
    {
      time: "11:00 AM",
      task: t.modules.events,
      owner: t.modules.partner,
      status: t.statuses.pending,
    },
  ];

  const dashboardView = (
    <div style={{ ...styles.shell, direction: isRTL ? "rtl" : "ltr" }}>
      <div style={styles.topBar}>
        <div>
          <div style={styles.eyebrow}>{t.appTitle}</div>
          <h1 style={styles.dashboardTitle}>{t.dashboard}</h1>
        </div>
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

      <img src={heroImage} alt="Bronson Family Farm" style={styles.heroImage} />

      <div style={styles.heroBand}>
        <div>
          <h2 style={styles.title}>{t.heroTitle}</h2>
          <p style={styles.subtitle}>{t.heroSubtitle}</p>
        </div>
        <div style={styles.heroButtons}>
          <button style={styles.primaryButton} onClick={() => setView("shop")}>
            {t.enterShop}
          </button>
          <button style={styles.secondaryButton} onClick={() => setView("partner")}>
            {t.partnerNow}
          </button>
        </div>
      </div>

      <div style={styles.snapshotGrid}>
        <div style={styles.snapshotCard}>
          <div style={styles.snapshotLabel}>{t.quickStats.title}</div>
          <div style={styles.snapshotValue}>3</div>
          <div style={styles.snapshotSmall}>{t.quickStats.acres}</div>
        </div>
        <div style={styles.snapshotCard}>
          <div style={styles.snapshotLabel}>{t.quickStats.title}</div>
          <div style={styles.snapshotValue}>8</div>
          <div style={styles.snapshotSmall}>{t.quickStats.pathways}</div>
        </div>
        <div style={styles.snapshotCard}>
          <div style={styles.snapshotLabel}>{t.quickStats.title}</div>
          <div style={styles.snapshotValue}>6</div>
          <div style={styles.snapshotSmall}>{t.quickStats.languages}</div>
        </div>
        <div style={styles.snapshotCard}>
          <div style={styles.snapshotLabel}>{t.quickStats.title}</div>
          <div style={styles.snapshotValue}>Live</div>
          <div style={styles.snapshotSmall}>{t.quickStats.market}</div>
        </div>
      </div>

      <div style={styles.liveGrid}>
        <div style={styles.panelLarge}>
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>{t.growerCalendar}</h3>
            <span style={styles.panelDate}>
              {t.today}: {today}
            </span>
          </div>
          <div style={styles.tableWrap}>
            <div style={styles.tableHeader}>
              <div>{t.calendarCols.time}</div>
              <div>{t.calendarCols.task}</div>
              <div>{t.calendarCols.owner}</div>
              <div>{t.calendarCols.status}</div>
            </div>
            {calendarRows.map((row, idx) => (
              <div key={idx} style={styles.tableRow}>
                <div>{row.time}</div>
                <div>{row.task}</div>
                <div>{row.owner}</div>
                <div>{row.status}</div>
              </div>
            ))}
          </div>
          <div style={styles.panelButtons}>
            <button style={styles.secondaryButton} onClick={() => setView("calendar")}>
              {t.openModule}
            </button>
            <button style={styles.secondaryButton} onClick={() => setView("grow")}>
              {t.modules.grow}
            </button>
          </div>
        </div>

        <div style={styles.sideStack}>
          <div style={styles.panelSmall}>
            <h3 style={styles.panelTitle}>{t.operations}</h3>
            <p style={styles.panelText}>{t.dashboardCards.grow.text}</p>
            <button style={styles.secondaryButton} onClick={() => setView("grow")}>
              {t.openModule}
            </button>
          </div>

          <div style={styles.panelSmall}>
            <h3 style={styles.panelTitle}>{t.livePathways}</h3>
            <div style={styles.pathwaysList}>
              {(["grow", "shop", "story", "workforce", "community", "events"] as const).map(
                (key) => (
                  <button
                    key={key}
                    style={styles.pathwayBtn}
                    onClick={() => setView(key)}
                  >
                    {t.modules[key]}
                  </button>
                )
              )}
            </div>
          </div>

          <div style={styles.panelSmall}>
            <h3 style={styles.panelTitle}>{t.support}</h3>
            <p style={styles.panelText}>{t.supportPanelText}</p>
            <button style={styles.primaryButton} onClick={() => setView("partner")}>
              {t.partnerNow}
            </button>
          </div>
        </div>
      </div>

      <h3 style={styles.modulesHeading}>{t.modulesTitle}</h3>
      <div style={styles.moduleGrid}>
        {(
          [
            ["grow", t.dashboardCards.grow],
            ["shop", t.dashboardCards.shop],
            ["story", t.dashboardCards.story],
            ["workforce", t.dashboardCards.workforce],
            ["community", t.dashboardCards.community],
            ["partner", t.dashboardCards.partner],
          ] as const
        ).map(([key, card]) => (
          <button key={key} style={styles.moduleCard} onClick={() => setView(key as View)}>
            <h4 style={styles.moduleTitle}>{card.title}</h4>
            <p style={styles.moduleText}>{card.text}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const detailView = (key: Exclude<View, "dashboard">) => (
    <div style={{ ...styles.sectionShell, direction: isRTL ? "rtl" : "ltr" }}>
      <div style={styles.topBar}>
        <button style={styles.backButton} onClick={() => setView("dashboard")}>
          {t.back}
        </button>
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

      <img src={heroImage} alt={t.appTitle} style={styles.sectionImage} />

      <h2 style={styles.sectionTitle}>
        {key === "calendar"
          ? t.growerCalendar
          : key === "partner"
          ? t.support
          : t.sectionTitles[key as keyof typeof t.sectionTitles]}
      </h2>

      {key === "calendar" ? (
        <>
          <p style={styles.sectionText}>{t.sectionText.calendar}</p>
          <div style={styles.tableWrap}>
            <div style={styles.tableHeader}>
              <div>{t.calendarCols.time}</div>
              <div>{t.calendarCols.task}</div>
              <div>{t.calendarCols.owner}</div>
              <div>{t.calendarCols.status}</div>
            </div>
            {calendarRows.map((row, idx) => (
              <div key={idx} style={styles.tableRow}>
                <div>{row.time}</div>
                <div>{row.task}</div>
                <div>{row.owner}</div>
                <div>{row.status}</div>
              </div>
            ))}
          </div>
        </>
      ) : key === "partner" ? (
        <>
          <div style={styles.supportPanel}>
            <h3 style={styles.askTitle}>{t.supportPanelTitle}</h3>
            <p style={styles.askText}>{t.supportPanelText}</p>
          </div>
          <p style={styles.sectionText}>{t.sectionText.partner}</p>
        </>
      ) : (
        <>
          <p style={styles.sectionText}>
            {t.sectionText[key as keyof typeof t.sectionText]}
          </p>
          <div style={styles.supportPanel}>
            <h3 style={styles.askTitle}>{t.supportPanelTitle}</h3>
            <p style={styles.askText}>{t.supportPanelText}</p>
          </div>
        </>
      )}

      <div style={styles.ctaRow}>
        <button style={styles.primaryButton} onClick={() => setView("shop")}>
          {t.enterShop}
        </button>
        <button style={styles.secondaryButton} onClick={() => setView("partner")}>
          {t.partnerNow}
        </button>
      </div>

      <div style={styles.sectionGrid}>
        {(["grow", "calendar", "shop", "story", "workforce", "community", "events", "partner"] as const)
          .filter((item) => item !== key)
          .map((item) => (
            <button key={item} style={styles.miniTile} onClick={() => setView(item)}>
              <div style={styles.miniTileTitle}>
                {item === "calendar"
                  ? t.growerCalendar
                  : item === "partner"
                  ? t.support
                  : t.modules[item as keyof typeof t.modules]}
              </div>
            </button>
          ))}
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      {view === "dashboard" ? dashboardView : detailView(view)}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#dfe8e0",
    padding: "28px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  shell: {
    width: "100%",
    maxWidth: "1240px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  sectionShell: {
    width: "100%",
    maxWidth: "1040px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
  },
  dashboardTitle: {
    margin: "6px 0 0 0",
    fontSize: "38px",
    color: "#173b24",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    fontSize: "15px",
  },
  heroImage: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "20px",
  },
  heroBand: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "46px",
    lineHeight: 1.05,
    color: "#173b24",
  },
  subtitle: {
    margin: 0,
    maxWidth: "760px",
    fontSize: "22px",
    lineHeight: 1.4,
    color: "#2d4f38",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "14px 24px",
    background: "#2f6b3c",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  secondaryButton: {
    padding: "14px 24px",
    background: "#ffffff",
    color: "#173b24",
    border: "1px solid #cfd9d1",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  snapshotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "22px",
  },
  snapshotCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "16px",
    padding: "16px",
  },
  snapshotLabel: {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#2f6b3c",
    marginBottom: "8px",
  },
  snapshotValue: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#173b24",
  },
  snapshotSmall: {
    fontSize: "14px",
    color: "#486452",
  },
  liveGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.6fr) minmax(300px, 0.9fr)",
    gap: "18px",
    marginBottom: "24px",
  },
  panelLarge: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
  },
  sideStack: {
    display: "grid",
    gap: "18px",
  },
  panelSmall: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
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
  panelTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#173b24",
  },
  panelDate: {
    fontSize: "14px",
    color: "#486452",
    fontWeight: 700,
  },
  panelText: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#486452",
    margin: "0 0 14px 0",
  },
  tableWrap: {
    border: "1px solid #dbe4dd",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "14px",
  },
  tableHeader: {
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
  panelButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  pathwaysList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
  },
  pathwayBtn: {
    padding: "12px",
    background: "#f8faf8",
    color: "#173b24",
    border: "1px solid #d2ddd4",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
  },
  modulesHeading: {
    fontSize: "24px",
    color: "#173b24",
    margin: "0 0 14px 0",
  },
  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  moduleCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "left",
    cursor: "pointer",
  },
  moduleTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#173b24",
  },
  moduleText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#486452",
  },
  backButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
    color: "#173b24",
  },
  sectionImage: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "22px",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "42px",
    color: "#173b24",
  },
  sectionText: {
    margin: "0 0 22px 0",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#486452",
    maxWidth: "780px",
  },
  supportPanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "22px",
  },
  askTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#173b24",
  },
  askText: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.6,
    color: "#486452",
  },
  ctaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  miniTile: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "12px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "center",
  },
  miniTileTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#173b24",
  },
};
