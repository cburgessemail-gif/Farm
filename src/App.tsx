import { useEffect, useMemo, useState } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"
type ModuleKey = "overview" | "marketplace" | "nutrition" | "calendar"

const roles: Role[] = ["guest", "customer", "grower", "youth", "supervisor"]

const imageMap: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/SAM_0220.JPG",
  grower: "/SAM_0221.JPG",
  youth: "/SAM_0222.JPG",
  supervisor: "/SAM_0223.JPG",
}

const languageOptions: { key: LangKey; label: string }[] = [
  { key: "en", label: "English" },
  { key: "es", label: "Español" },
  { key: "tl", label: "Tagalog" },
  { key: "it", label: "Italiano" },
  { key: "he", label: "עברית" },
  { key: "patwa", label: "Patwa" },
]

const content = {
  en: {
    appTitle: "Bronson Family Farm",
    subTitle: "Immersive Ecosystem Demo",
    enterText:
      "A role-based ecosystem connecting food, family, land, learning, and opportunity.",
    voice: "Voice",
    on: "On",
    off: "Off",
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    weather: "Weather",
    modules: {
      overview: "Overview",
      marketplace: "Marketplace",
      nutrition: "Nutrition",
      calendar: "Calendar",
    },
    roles: {
      guest: {
        title: "Guest",
        intro:
          "The guest experience introduces the land, the vision, and the larger ecosystem.",
        stats: ["Vision", "Story", "Entry Point"],
      },
      customer: {
        title: "Customer",
        intro:
          "The customer experience should move directly into fresh food, recipes, and healthier choices.",
        stats: ["Marketplace", "Recipes", "Buying Habits"],
      },
      grower: {
        title: "Grower",
        intro:
          "The grower experience supports crop planning, season timing, and harvest coordination.",
        stats: ["Crop Plan", "Season Readiness", "Harvest Flow"],
      },
      youth: {
        title: "Youth",
        intro:
          "The youth experience centers workforce development, teamwork, confidence, and growth.",
        stats: ["Teamwork", "Safety", "Growth"],
      },
      supervisor: {
        title: "Supervisor",
        intro:
          "The supervisor supports the youth workforce program through observation, encouragement, progress tracking, and coordination with support staff resources from New Vision Behavioral Health.",
        stats: ["Oversight", "Tracking", "Support Resources"],
      },
    },
    panels: {
      overview: {
        title: "Platform Overview",
        text: "This experience is designed to feel like entering a live system, not reading a website.",
        cards: [
          {
            title: "Role-Based Entry",
            text: "Each pathway opens a different view of the ecosystem.",
          },
          {
            title: "Guided Experience",
            text: "Narration and interface work together to lead the viewer.",
          },
          {
            title: "Living Platform",
            text: "The goal is a practical system for real people, not static pages.",
          },
        ],
      },
      marketplace: {
        title: "Marketplace Path",
        text: "Customers should move quickly into fresh produce, seedlings, nutrition guidance, and repeat buying habits.",
        cards: [
          { title: "Fresh Food", text: "Produce, seedlings, and customer-ready access." },
          { title: "Return Visits", text: "Make it easy for customers to come back." },
          { title: "Healthy Choices", text: "Pair food access with practical support." },
        ],
      },
      nutrition: {
        title: "Nutrition & Recipes",
        text: "Fresh food should connect to daily life through simple recipes, guidance, and better choices.",
        cards: [
          { title: "Simple Recipes", text: "Make preparation feel easy and realistic." },
          { title: "Food Education", text: "Support healthier everyday decisions." },
          { title: "Practical Guidance", text: "Connect what is grown to what families eat." },
        ],
      },
      calendar: {
        title: "Crop Calendar",
        text: "The system should connect weather, planting windows, seasonal timing, and harvest planning.",
        cards: [
          { title: "Planting Windows", text: "Know when to start and when to move." },
          { title: "Season Timing", text: "Track readiness across the growing cycle." },
          { title: "Harvest Planning", text: "Prepare for flow, storage, and use." },
        ],
      },
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. This is more than a farm. It is a living ecosystem of food, family, learning, and future.",
      "Each role opens a different pathway through the ecosystem, making the experience feel active rather than static.",
      "The customer pathway should move directly into marketplace access, nutrition guidance, recipes, and healthier choices.",
      "The grower pathway supports crop planning, weather awareness, season timing, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, confidence, and visible growth.",
      "The supervisor pathway supports the youth workforce program through encouragement, readiness tracking, and coordination with support staff resources from New Vision Behavioral Health.",
      "Together, these pathways create a platform experience instead of a simple website.",
    ],
  },

  es: {
    appTitle: "Bronson Family Farm",
    subTitle: "Demostración Inmersiva del Ecosistema",
    enterText:
      "Un ecosistema por roles que conecta alimentos, familia, tierra, aprendizaje y oportunidad.",
    voice: "Voz",
    on: "Activada",
    off: "Desactivada",
    startTour: "Iniciar demostración guiada",
    stopTour: "Detener demostración guiada",
    nextStep: "Siguiente paso",
    weather: "Clima",
    modules: {
      overview: "Resumen",
      marketplace: "Mercado",
      nutrition: "Nutrición",
      calendar: "Calendario",
    },
    roles: {
      guest: {
        title: "Invitado",
        intro:
          "La experiencia del invitado presenta la tierra, la visión y el ecosistema general.",
        stats: ["Visión", "Historia", "Entrada"],
      },
      customer: {
        title: "Cliente",
        intro:
          "La experiencia del cliente debe llevar directamente a comida fresca, recetas y mejores decisiones.",
        stats: ["Mercado", "Recetas", "Hábitos"],
      },
      grower: {
        title: "Productor",
        intro:
          "La experiencia del productor apoya planificación, temporada y cosecha.",
        stats: ["Plan de Cultivo", "Temporada", "Cosecha"],
      },
      youth: {
        title: "Joven",
        intro:
          "La experiencia juvenil se centra en trabajo, equipo, confianza y crecimiento.",
        stats: ["Equipo", "Seguridad", "Crecimiento"],
      },
      supervisor: {
        title: "Supervisor",
        intro:
          "El supervisor apoya el programa laboral juvenil mediante observación, acompañamiento, seguimiento y coordinación con New Vision Behavioral Health.",
        stats: ["Supervisión", "Seguimiento", "Recursos"],
      },
    },
    panels: {
      overview: {
        title: "Resumen de la Plataforma",
        text: "Esta experiencia está diseñada para sentirse como un sistema vivo, no como un sitio web.",
        cards: [
          { title: "Entrada por Rol", text: "Cada camino abre una vista diferente del ecosistema." },
          { title: "Experiencia Guiada", text: "La narración y la interfaz guían al visitante." },
          { title: "Plataforma Viva", text: "El objetivo es un sistema práctico para personas reales." },
        ],
      },
      marketplace: {
        title: "Camino del Mercado",
        text: "Los clientes deben moverse rápidamente hacia productos frescos, plántulas, nutrición y hábitos de compra.",
        cards: [
          { title: "Comida Fresca", text: "Productos, plántulas y acceso directo." },
          { title: "Regreso", text: "Hacer fácil que el cliente vuelva." },
          { title: "Opciones Saludables", text: "Unir acceso alimentario y apoyo práctico." },
        ],
      },
      nutrition: {
        title: "Nutrición y Recetas",
        text: "La comida fresca debe conectarse con la vida diaria mediante recetas simples y orientación.",
        cards: [
          { title: "Recetas Simples", text: "Preparación fácil y realista." },
          { title: "Educación Alimentaria", text: "Apoyo para mejores decisiones diarias." },
          { title: "Guía Práctica", text: "Conectar lo cultivado con lo que come la familia." },
        ],
      },
      calendar: {
        title: "Calendario de Cultivo",
        text: "El sistema debe conectar clima, tiempos de siembra, temporada y cosecha.",
        cards: [
          { title: "Siembra", text: "Saber cuándo empezar y mover." },
          { title: "Temporada", text: "Seguir la preparación del ciclo." },
          { title: "Cosecha", text: "Prepararse para flujo, uso y almacenamiento." },
        ],
      },
    },
    guidedSteps: [
      "Bienvenido a Bronson Family Farm. Esto es más que una granja. Es un ecosistema vivo de comida, familia, aprendizaje y futuro.",
      "Cada rol abre un camino diferente dentro del ecosistema.",
      "El camino del cliente debe llevar directamente al mercado, la nutrición, las recetas y decisiones más saludables.",
      "El camino del productor apoya planificación, clima, tiempos de temporada y cosecha.",
      "El camino juvenil destaca desarrollo laboral, trabajo en equipo, seguridad, confianza y crecimiento.",
      "El camino del supervisor apoya el programa juvenil con acompañamiento, seguimiento y coordinación con New Vision Behavioral Health.",
      "Juntos, estos caminos crean una experiencia de plataforma y no solo un sitio web.",
    ],
  },

  tl: {
    appTitle: "Bronson Family Farm",
    subTitle: "Immersive Ecosystem Demo",
    enterText:
      "Isang role-based ecosystem para sa pagkain, pamilya, lupa, pagkatuto, at oportunidad.",
    voice: "Boses",
    on: "Bukas",
    off: "Patay",
    startTour: "Simulan ang gabay na demo",
    stopTour: "Itigil ang gabay na demo",
    nextStep: "Susunod",
    weather: "Panahon",
    modules: {
      overview: "Buod",
      marketplace: "Marketplace",
      nutrition: "Nutrisyon",
      calendar: "Kalendaryo",
    },
    roles: {
      guest: {
        title: "Bisita",
        intro:
          "Ipinapakilala ng guest experience ang lupa, vision, at mas malaking ecosystem.",
        stats: ["Vision", "Kuwento", "Pasok"],
      },
      customer: {
        title: "Customer",
        intro:
          "Dapat dalhin ng customer experience ang tao sa fresh food, recipes, at healthier choices.",
        stats: ["Marketplace", "Recipes", "Habits"],
      },
      grower: {
        title: "Grower",
        intro:
          "Sinusuportahan ng grower experience ang planning, season timing, at harvest coordination.",
        stats: ["Crop Plan", "Season", "Harvest"],
      },
      youth: {
        title: "Kabataan",
        intro:
          "Ang youth experience ay tungkol sa workforce development, teamwork, confidence, at growth.",
        stats: ["Teamwork", "Safety", "Growth"],
      },
      supervisor: {
        title: "Supervisor",
        intro:
          "Sinusuportahan ng supervisor ang youth workforce program sa pamamagitan ng observation, tracking, at coordination kasama ang New Vision Behavioral Health.",
        stats: ["Oversight", "Tracking", "Resources"],
      },
    },
    panels: {
      overview: {
        title: "Platform Overview",
        text: "Ang experience na ito ay parang pagpasok sa live system, hindi website.",
        cards: [
          { title: "Role Entry", text: "Bawat role ay ibang view ng ecosystem." },
          { title: "Guided Experience", text: "Magkasama ang narration at interface." },
          { title: "Living Platform", text: "Practical system ito para sa totoong tao." },
        ],
      },
      marketplace: {
        title: "Marketplace Path",
        text: "Dapat mabilis na makarating ang customer sa fresh food, seedlings, nutrition, at return visits.",
        cards: [
          { title: "Fresh Food", text: "Produce, seedlings, at direct access." },
          { title: "Return Visits", text: "Madaling makabalik ang customer." },
          { title: "Healthy Choices", text: "Food access na may practical support." },
        ],
      },
      nutrition: {
        title: "Nutrisyon at Recipes",
        text: "Dapat konektado ang fresh food sa araw-araw sa pamamagitan ng simple recipes at guidance.",
        cards: [
          { title: "Simple Recipes", text: "Madali at realistic na preparation." },
          { title: "Food Education", text: "Tulong para sa better daily choices." },
          { title: "Practical Guidance", text: "Ikonekta ang tanim sa kinakain." },
        ],
      },
      calendar: {
        title: "Crop Calendar",
        text: "Dapat konektado ang weather, planting windows, season timing, at harvest planning.",
        cards: [
          { title: "Planting Windows", text: "Alamin kung kailan magsisimula." },
          { title: "Season Timing", text: "Subaybayan ang readiness." },
          { title: "Harvest Planning", text: "Maghanda para sa flow at use." },
        ],
      },
    },
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Higit ito sa isang farm. Isa itong buhay na ecosystem ng pagkain, pamilya, pagkatuto, at kinabukasan.",
      "Bawat role ay nagbubukas ng ibang pathway sa ecosystem.",
      "Dapat dalhin ng customer pathway ang tao sa marketplace, nutrition, recipes, at healthier choices.",
      "Sinusuportahan ng grower pathway ang crop planning, weather awareness, season timing, at harvest coordination.",
      "Ipinapakita ng youth pathway ang workforce development, teamwork, safety, confidence, at growth.",
      "Sinusuportahan ng supervisor pathway ang youth workforce program kasama ang New Vision Behavioral Health resources.",
      "Magkasama, nagiging platform experience ito at hindi simpleng website lang.",
    ],
  },

  it: {
    appTitle: "Bronson Family Farm",
    subTitle: "Demo Immersiva dell’Ecosistema",
    enterText:
      "Un ecosistema per ruoli che collega cibo, famiglia, terra, apprendimento e opportunità.",
    voice: "Voce",
    on: "Attiva",
    off: "Disattiva",
    startTour: "Avvia demo guidata",
    stopTour: "Ferma demo guidata",
    nextStep: "Passo successivo",
    weather: "Meteo",
    modules: {
      overview: "Panoramica",
      marketplace: "Mercato",
      nutrition: "Nutrizione",
      calendar: "Calendario",
    },
    roles: {
      guest: {
        title: "Ospite",
        intro:
          "L’esperienza ospite introduce la terra, la visione e il sistema più ampio.",
        stats: ["Visione", "Storia", "Ingresso"],
      },
      customer: {
        title: "Cliente",
        intro:
          "L’esperienza cliente dovrebbe portare rapidamente a cibo fresco, ricette e scelte migliori.",
        stats: ["Mercato", "Ricette", "Abitudini"],
      },
      grower: {
        title: "Coltivatore",
        intro:
          "L’esperienza coltivatore supporta pianificazione, tempi stagionali e raccolto.",
        stats: ["Piano", "Stagione", "Raccolto"],
      },
      youth: {
        title: "Giovani",
        intro:
          "L’esperienza giovani riguarda sviluppo del lavoro, collaborazione, fiducia e crescita.",
        stats: ["Squadra", "Sicurezza", "Crescita"],
      },
      supervisor: {
        title: "Supervisore",
        intro:
          "Il supervisore sostiene il programma giovanile con osservazione, monitoraggio e coordinamento con New Vision Behavioral Health.",
        stats: ["Controllo", "Monitoraggio", "Risorse"],
      },
    },
    panels: {
      overview: {
        title: "Panoramica della Piattaforma",
        text: "Questa esperienza è pensata per sembrare un sistema vivo, non un sito web.",
        cards: [
          { title: "Ingresso per Ruolo", text: "Ogni ruolo apre una vista diversa." },
          { title: "Esperienza Guidata", text: "Voce e interfaccia guidano insieme." },
          { title: "Piattaforma Viva", text: "Un sistema pratico per persone reali." },
        ],
      },
      marketplace: {
        title: "Percorso Mercato",
        text: "I clienti dovrebbero muoversi rapidamente tra prodotti freschi, piantine e abitudini di ritorno.",
        cards: [
          { title: "Cibo Fresco", text: "Prodotti, piantine e accesso diretto." },
          { title: "Ritorno", text: "Rendere facile tornare." },
          { title: "Scelte Salutari", text: "Accesso al cibo con supporto pratico." },
        ],
      },
      nutrition: {
        title: "Nutrizione e Ricette",
        text: "Il cibo fresco dovrebbe collegarsi alla vita quotidiana con ricette semplici e guida pratica.",
        cards: [
          { title: "Ricette Semplici", text: "Preparazione facile e realistica." },
          { title: "Educazione Alimentare", text: "Supporto per decisioni migliori." },
          { title: "Guida Pratica", text: "Collegare ciò che si coltiva con ciò che si mangia." },
        ],
      },
      calendar: {
        title: "Calendario delle Colture",
        text: "Il sistema dovrebbe collegare meteo, tempi di semina, stagione e raccolto.",
        cards: [
          { title: "Semina", text: "Sapere quando iniziare." },
          { title: "Stagione", text: "Seguire la preparazione." },
          { title: "Raccolto", text: "Prepararsi per flusso e utilizzo." },
        ],
      },
    },
    guidedSteps: [
      "Benvenuto a Bronson Family Farm. Questo è più di una fattoria. È un ecosistema vivo di cibo, famiglia, apprendimento e futuro.",
      "Ogni ruolo apre un percorso diverso attraverso l’ecosistema.",
      "Il percorso cliente dovrebbe portare direttamente a mercato, nutrizione, ricette e scelte migliori.",
      "Il percorso coltivatore supporta pianificazione, meteo, tempi stagionali e raccolto.",
      "Il percorso giovani evidenzia sviluppo del lavoro, collaborazione, sicurezza, fiducia e crescita.",
      "Il percorso supervisore sostiene il programma giovani con supporto e coordinamento con New Vision Behavioral Health.",
      "Insieme, questi percorsi creano un’esperienza di piattaforma e non un semplice sito web.",
    ],
  },

  he: {
    appTitle: "Bronson Family Farm",
    subTitle: "הדגמת מערכת סוחפת",
    enterText:
      "מערכת מבוססת תפקידים המחברת מזון, משפחה, אדמה, למידה והזדמנות.",
    voice: "קול",
    on: "פועל",
    off: "כבוי",
    startTour: "התחל הדגמה מודרכת",
    stopTour: "עצור הדגמה מודרכת",
    nextStep: "השלב הבא",
    weather: "מזג אוויר",
    modules: {
      overview: "סקירה",
      marketplace: "שוק",
      nutrition: "תזונה",
      calendar: "לוח שנה",
    },
    roles: {
      guest: {
        title: "אורח",
        intro:
          "חוויית האורח מציגה את האדמה, החזון והמערכת הרחבה.",
        stats: ["חזון", "סיפור", "כניסה"],
      },
      customer: {
        title: "לקוח",
        intro:
          "חוויית הלקוח צריכה להוביל במהירות למזון טרי, מתכונים ובחירות טובות יותר.",
        stats: ["שוק", "מתכונים", "הרגלים"],
      },
      grower: {
        title: "מגדל",
        intro:
          "חוויית המגדל תומכת בתכנון, עונה וקציר.",
        stats: ["תכנון", "עונה", "קציר"],
      },
      youth: {
        title: "נוער",
        intro:
          "חוויית הנוער עוסקת בפיתוח כוח עבודה, עבודת צוות, ביטחון וצמיחה.",
        stats: ["צוות", "בטיחות", "צמיחה"],
      },
      supervisor: {
        title: "מפקח",
        intro:
          "המפקח תומך בתוכנית הנוער באמצעות תצפית, מעקב ותיאום עם New Vision Behavioral Health.",
        stats: ["פיקוח", "מעקב", "משאבים"],
      },
    },
    panels: {
      overview: {
        title: "סקירת המערכת",
        text: "החוויה הזאת נועדה להרגיש כמו כניסה למערכת חיה, לא לאתר.",
        cards: [
          { title: "כניסה לפי תפקיד", text: "כל תפקיד פותח מבט אחר על המערכת." },
          { title: "חוויה מודרכת", text: "קול וממשק עובדים יחד." },
          { title: "פלטפורמה חיה", text: "מערכת מעשית לאנשים אמיתיים." },
        ],
      },
      marketplace: {
        title: "מסלול שוק",
        text: "לקוחות צריכים לעבור במהירות לתוצרת, שתילים והרגלי חזרה.",
        cards: [
          { title: "מזון טרי", text: "תוצרת, שתילים וגישה ישירה." },
          { title: "חזרה", text: "להקל על חזרה של הלקוח." },
          { title: "בחירות בריאות", text: "גישה למזון עם תמיכה מעשית." },
        ],
      },
      nutrition: {
        title: "תזונה ומתכונים",
        text: "מזון טרי צריך להתחבר לחיי היומיום עם מתכונים פשוטים והכוונה מעשית.",
        cards: [
          { title: "מתכונים פשוטים", text: "הכנה קלה ומציאותית." },
          { title: "חינוך תזונתי", text: "תמיכה בהחלטות יומיומיות טובות יותר." },
          { title: "הכוונה מעשית", text: "לחבר בין מה שגדל למה שאוכלים." },
        ],
      },
      calendar: {
        title: "לוח גידולים",
        text: "המערכת צריכה לחבר מזג אוויר, זמני שתילה, עונה וקציר.",
        cards: [
          { title: "זמני שתילה", text: "לדעת מתי להתחיל." },
          { title: "עונה", text: "לעקוב אחר מוכנות." },
          { title: "קציר", text: "להתכונן לזרימה ולשימוש." },
        ],
      },
    },
    guidedSteps: [
      "ברוכים הבאים ל־Bronson Family Farm. זה יותר מחווה. זוהי מערכת חיה של מזון, משפחה, למידה ועתיד.",
      "כל תפקיד פותח מסלול שונה בתוך המערכת.",
      "מסלול הלקוח צריך להוביל ישירות לשוק, תזונה, מתכונים ובחירות טובות יותר.",
      "מסלול המגדל תומך בתכנון, מזג אוויר, עונה וקציר.",
      "מסלול הנוער מדגיש פיתוח כוח עבודה, עבודת צוות, בטיחות, ביטחון וצמיחה.",
      "מסלול המפקח תומך בתוכנית הנוער ובתיאום עם New Vision Behavioral Health.",
      "יחד, המסלולים האלה יוצרים חוויית פלטפורמה ולא אתר רגיל.",
    ],
  },

  patwa: {
    appTitle: "Bronson Family Farm",
    subTitle: "Immersive Ecosystem Demo",
    enterText:
      "One role-based ecosystem fi food, family, land, learning, an opportunity.",
    voice: "Voice",
    on: "On",
    off: "Off",
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    weather: "Weather",
    modules: {
      overview: "Overview",
      marketplace: "Marketplace",
      nutrition: "Nutrition",
      calendar: "Calendar",
    },
    roles: {
      guest: {
        title: "Guest",
        intro:
          "Di guest experience introduce di land, di vision, an di bigger ecosystem.",
        stats: ["Vision", "Story", "Entry"],
      },
      customer: {
        title: "Customer",
        intro:
          "Di customer experience fi carry people straight to fresh food, recipes, an healthier choices.",
        stats: ["Marketplace", "Recipes", "Habits"],
      },
      grower: {
        title: "Grower",
        intro:
          "Di grower experience support planning, season timing, an harvest flow.",
        stats: ["Crop Plan", "Season", "Harvest"],
      },
      youth: {
        title: "Youth",
        intro:
          "Di youth experience center workforce development, teamwork, confidence, an growth.",
        stats: ["Teamwork", "Safety", "Growth"],
      },
      supervisor: {
        title: "Supervisor",
        intro:
          "Di supervisor support di youth workforce program through observation, tracking, encouragement, an coordination wid New Vision Behavioral Health.",
        stats: ["Oversight", "Tracking", "Resources"],
      },
    },
    panels: {
      overview: {
        title: "Platform Overview",
        text: "Dis experience build fi feel like yuh enter a live system, not a website.",
        cards: [
          { title: "Role Entry", text: "Every role open a different view a di ecosystem." },
          { title: "Guided Flow", text: "Voice an interface work together." },
          { title: "Living Platform", text: "A practical system fi real people." },
        ],
      },
      marketplace: {
        title: "Marketplace Path",
        text: "Customers fi move quick to fresh produce, seedlings, an return habits.",
        cards: [
          { title: "Fresh Food", text: "Produce, seedlings, an direct access." },
          { title: "Return Visits", text: "Mek it easy fi people come back." },
          { title: "Healthy Choices", text: "Food access wid practical support." },
        ],
      },
      nutrition: {
        title: "Nutrition an Recipes",
        text: "Fresh food fi connect to everyday life through simple recipes an practical guidance.",
        cards: [
          { title: "Simple Recipes", text: "Easy an realistic preparation." },
          { title: "Food Education", text: "Support better everyday choices." },
          { title: "Practical Guidance", text: "Connect wah grow to wah people eat." },
        ],
      },
      calendar: {
        title: "Crop Calendar",
        text: "Di system fi connect weather, planting windows, season timing, an harvest planning.",
        cards: [
          { title: "Planting Windows", text: "Know when fi start." },
          { title: "Season Timing", text: "Track readiness through di cycle." },
          { title: "Harvest Planning", text: "Prepare fi flow an use." },
        ],
      },
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. Dis more than a farm. Dis a living ecosystem a food, family, learning, an future.",
      "Every role open a different pathway through di ecosystem.",
      "Di customer pathway fi move people straight to marketplace access, nutrition guidance, recipes, an healthier choices.",
      "Di grower pathway support crop planning, weather awareness, season timing, an harvest coordination.",
      "Di youth pathway highlight workforce development, teamwork, safety, confidence, an growth.",
      "Di supervisor pathway support di youth workforce program an coordinate wid New Vision Behavioral Health resources.",
      "Together, dem pathways create a platform experience instead of a regular website.",
    ],
  },
} as const

function pickVoice(targetLang: string) {
  const voices = window.speechSynthesis.getVoices()
  const exact = voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase())
  if (exact) return exact
  const partial = voices.find((v) =>
    v.lang.toLowerCase().startsWith(targetLang.toLowerCase().split("-")[0])
  )
  return partial || null
}

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [lang, setLang] = useState<LangKey>("en")
  const [temp, setTemp] = useState<number | null>(null)
  const [tourOn, setTourOn] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [voiceOn, setVoiceOn] = useState(false)
  const [moduleKey, setModuleKey] = useState<ModuleKey>("overview")

  const t = content[lang]
  const isRTL = lang === "he"

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) => setTemp(data.current.temperature_2m))
      .catch(() => setTemp(null))
  }, [])

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices()
    }
  }, [])

  const guidedScript = useMemo(() => t.guidedSteps, [t])

  useEffect(() => {
    if (!tourOn || !voiceOn || !("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

    const langMap: Record<LangKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      he: "he-IL",
      patwa: "en-US",
    }

    const utter = new SpeechSynthesisUtterance(guidedScript[tourStep] || "")
    utter.lang = langMap[lang]
    utter.rate = 0.82
    utter.pitch = 0.94
    utter.volume = 1

    const preferredVoice = pickVoice(langMap[lang])
    if (preferredVoice) utter.voice = preferredVoice

    utter.onend = () => {
      setTimeout(() => {
        setTourStep((prev) => {
          if (prev >= guidedScript.length - 1) {
            setTourOn(false)
            return 0
          }
          return prev + 1
        })
      }, 450)
    }

    window.speechSynthesis.speak(utter)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [tourOn, voiceOn, tourStep, guidedScript, lang])

  useEffect(() => {
    if (!tourOn) {
      setTourStep(0)
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [tourOn])

  const roleInfo = t.roles[role]
  const panel = t.panels[moduleKey]

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#151914",
        color: "#f4f1ea",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imageMap[role]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(9,10,9,0.20) 0%, rgba(9,10,9,0.55) 45%, rgba(9,10,9,0.92) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "26px 28px 170px",
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 26,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  color: "#c8d2c8",
                  marginBottom: 8,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {t.subTitle}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 62,
                  lineHeight: 0.98,
                  fontWeight: 800,
                }}
              >
                {t.appTitle}
              </h1>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LangKey)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(20,24,20,0.72)",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                {languageOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setVoiceOn((v) => !v)}
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: "none",
                  background: voiceOn ? "#466a9c" : "#666",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t.voice}: {voiceOn ? t.on : t.off}
              </button>

              <button
                onClick={() => setTourOn((v) => !v)}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  background: tourOn ? "#8a4444" : "#204f7c",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {tourOn ? t.stopTour : t.startTour}
              </button>

              <button
                onClick={() =>
                  setTourStep((prev) =>
                    prev < guidedScript.length - 1 ? prev + 1 : prev
                  )
                }
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  background: "#8b7331",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {t.nextStep}
              </button>
            </div>
          </div>

          <div
            style={{
              maxWidth: 760,
              marginTop: 30,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                fontSize: 15,
                marginBottom: 16,
              }}
            >
              {roleInfo.title}
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.35,
                color: "#f3f0e8",
                maxWidth: 720,
              }}
            >
              {t.enterText}
            </div>
          </div>

          {tourOn && (
            <div
              style={{
                width: "min(760px, 100%)",
                background: "rgba(250, 241, 197, 0.16)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderLeft: "8px solid #d8b44a",
                borderRadius: 18,
                padding: "20px 22px",
                fontSize: 24,
                lineHeight: 1.45,
                marginBottom: 26,
                color: "#fff6d6",
              }}
            >
              {guidedScript[tourStep]}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: "rgba(18,22,18,0.68)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#b8c4b8",
                  marginBottom: 8,
                }}
              >
                {roleInfo.title}
              </div>

              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                {roleInfo.title}
              </div>

              <div
                style={{
                  fontSize: 22,
                  lineHeight: 1.55,
                  color: "#e8efe8",
                  marginBottom: 18,
                }}
              >
                {roleInfo.intro}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                  gap: 14,
                }}
              >
                {roleInfo.stats.map((item) => (
                  <div
                    key={item}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16,
                      padding: 16,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "rgba(18,22,18,0.68)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#b8c4b8",
                  marginBottom: 8,
                }}
              >
                Live Status
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 16,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {t.weather}: {temp === null ? "Loading..." : `${temp}°`}
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 16,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Role: {roleInfo.title}
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 16,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  Module: {t.modules[moduleKey]}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              background: "rgba(18,22,18,0.72)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 22,
              padding: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 18,
              }}
            >
              {(
                [
                  { key: "overview", label: t.modules.overview },
                  { key: "marketplace", label: t.modules.marketplace },
                  { key: "nutrition", label: t.modules.nutrition },
                  { key: "calendar", label: t.modules.calendar },
                ] as { key: ModuleKey; label: string }[]
              ).map((item) => (
                <button
                  key={item.key}
                  onClick={() => setModuleKey(item.key)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    background: moduleKey === item.key ? "#295d8b" : "rgba(255,255,255,0.10)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {panel.title}
            </div>

            <div
              style={{
                fontSize: 22,
                lineHeight: 1.55,
                color: "#e8efe8",
                marginBottom: 18,
                maxWidth: 980,
              }}
            >
              {panel.text}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                gap: 16,
              }}
            >
              {panel.cards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 18,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 8,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      lineHeight: 1.55,
                      color: "#d8e0d8",
                    }}
                  >
                    {card.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "fixed",
            left: 20,
            right: 20,
            bottom: 18,
            zIndex: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              background: "rgba(16,20,16,0.84)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              padding: "12px 14px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
            }}
          >
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: role === r ? "#2f6b49" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  minWidth: 110,
                }}
              >
                {t.roles[r].title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
