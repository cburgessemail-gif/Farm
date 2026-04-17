import { useEffect, useMemo, useRef, useState } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

const roles: Role[] = ["guest", "customer", "grower", "youth", "supervisor"]

const imageMap: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/SAM_0220.JPG",
  youth: "/SAM_0221.JPG",
  supervisor: "/SAM_0222.JPG",
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
    subtitle: "Guided Ecosystem Demo",
    chooseRole: "Choose a pathway",
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    voice: "Voice",
    on: "On",
    off: "Off",
    weather: "Weather",
    overview: "Overview",
    marketplace: "Marketplace",
    nutrition: "Nutrition & Recipes",
    calendar: "Crop Calendar",
    intro:
      "Welcome. You are stepping into something bigger than a farm. This is where food, family, land, and future come together.",
    roles: {
      guest: {
        title: "Guest",
        text: "Start as a guest. Look around. Feel the place. This is the front door into a living ecosystem.",
        bullets: [
          "Understand the farm vision",
          "See the connection between land, food, and family legacy",
          "Explore before choosing a pathway",
        ],
      },
      customer: {
        title: "Customer",
        text: "Customers should move quickly into the marketplace, healthy choices, recipes, and a stronger connection to fresh food.",
        bullets: [
          "Go directly to the marketplace",
          "See nutrition and recipe guidance",
          "Build habits around healthy food choices",
        ],
      },
      grower: {
        title: "Grower",
        text: "Growers need crop planning, weather awareness, season readiness, and harvest coordination in one place.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "This pathway is about workforce development, teamwork, safety, responsibility, and confidence.",
        bullets: [
          "Workforce development",
          "Safety and teamwork",
          "Growth and responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Supervisors need structure for oversight, observation, progress tracking, and daily support.",
        bullets: [
          "Observation and support",
          "Progress tracking",
          "Daily readiness",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "Marketplace Path",
        text: "Customers should be able to move quickly into produce, seedlings, food access, and repeat buying habits.",
        bullets: ["Fresh produce", "Seedlings", "Repeat customer flow"],
      },
      nutrition: {
        title: "Nutrition & Recipes",
        text: "Fresh food should connect to everyday life through simple recipes, practical nutrition, and healthier choices.",
        bullets: ["Nutrition guidance", "Simple recipes", "Healthy food choices"],
      },
      calendar: {
        title: "Crop Calendar",
        text: "The platform should connect weather, planting, seasonal timing, and harvest planning in one clear view.",
        bullets: ["Planting timing", "Seasonal planning", "Harvest readiness"],
      },
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. This is more than a farm. It is a living ecosystem of food, family, learning, and future.",
      "The guest pathway introduces the land, the mission, and the broader vision for the farm and the community.",
      "The customer pathway should lead quickly into the marketplace, nutrition guidance, recipes, and healthy food choices.",
      "The grower pathway supports crop planning, weather awareness, seasonal timing, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, confidence, and visible growth.",
      "The supervisor pathway supports observation, structure, readiness, and daily support across the work environment.",
      "Together, these pathways create a role-based platform that feels welcoming, practical, and alive.",
    ],
    spokenSteps: [
      "Welcome to Bronson Family Farm. This is more than a farm. It is a living ecosystem of food, family, learning, and future.",
      "The guest pathway introduces the land, the mission, and the broader vision for the farm and the community.",
      "The customer pathway leads into the marketplace, nutrition guidance, recipes, and healthier food choices.",
      "The grower pathway supports crop planning, weather awareness, seasonal timing, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, confidence, and visible growth.",
      "The supervisor pathway supports observation, structure, readiness, and daily support.",
      "Together, these pathways create a role-based platform that feels welcoming, practical, and alive.",
    ],
  },

  es: {
    appTitle: "Bronson Family Farm",
    subtitle: "Demostración Guiada del Ecosistema",
    chooseRole: "Elige un camino",
    startTour: "Iniciar demostración guiada",
    stopTour: "Detener demostración guiada",
    nextStep: "Siguiente paso",
    voice: "Voz",
    on: "Activada",
    off: "Desactivada",
    weather: "Clima",
    overview: "Resumen",
    marketplace: "Mercado",
    nutrition: "Nutrición y Recetas",
    calendar: "Calendario de Cultivo",
    intro:
      "Bienvenido. Estás entrando en algo más grande que una granja. Aquí se unen alimentos, familia, tierra y futuro.",
    roles: {
      guest: {
        title: "Invitado",
        text: "Comienza como invitado. Observa el lugar. Siente la tierra. Esta es la entrada a un ecosistema vivo.",
        bullets: [
          "Comprender la visión de la finca",
          "Ver la conexión entre tierra, comida y legado familiar",
          "Explorar antes de elegir",
        ],
      },
      customer: {
        title: "Cliente",
        text: "Los clientes deben llegar rápidamente al mercado, a las elecciones saludables y a las recetas.",
        bullets: [
          "Ir directamente al mercado",
          "Ver nutrición y recetas",
          "Crear hábitos alimentarios saludables",
        ],
      },
      grower: {
        title: "Productor",
        text: "Los productores necesitan planificación, clima, temporada y cosecha en un mismo lugar.",
        bullets: [
          "Planificación de cultivos",
          "Preparación estacional",
          "Coordinación poscosecha",
        ],
      },
      youth: {
        title: "Joven",
        text: "Este camino trata de desarrollo laboral, trabajo en equipo, seguridad y confianza.",
        bullets: [
          "Desarrollo laboral",
          "Seguridad y trabajo en equipo",
          "Crecimiento y responsabilidad",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Los supervisores necesitan estructura para observación, seguimiento y apoyo diario.",
        bullets: [
          "Observación y apoyo",
          "Seguimiento del progreso",
          "Preparación diaria",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "Camino del Mercado",
        text: "Los clientes deben entrar rápidamente a productos, plántulas y hábitos de compra.",
        bullets: ["Productos frescos", "Plántulas", "Flujo de clientes"],
      },
      nutrition: {
        title: "Nutrición y Recetas",
        text: "La comida fresca debe conectarse con la vida diaria a través de recetas simples y mejores elecciones.",
        bullets: ["Guía nutricional", "Recetas simples", "Decisiones saludables"],
      },
      calendar: {
        title: "Calendario de Cultivo",
        text: "La plataforma debe conectar clima, siembra, temporada y cosecha.",
        bullets: ["Tiempo de siembra", "Planificación estacional", "Preparación de cosecha"],
      },
    },
    guidedSteps: [
      "Bienvenido a Bronson Family Farm. Esto es más que una granja. Es un ecosistema vivo de comida, familia, aprendizaje y futuro.",
      "El camino del invitado presenta la tierra, la misión y la visión general.",
      "El camino del cliente debe llevar rápidamente al mercado, la nutrición, las recetas y las decisiones saludables.",
      "El camino del productor apoya planificación, clima, temporada y cosecha.",
      "El camino juvenil destaca desarrollo laboral, trabajo en equipo, seguridad y crecimiento.",
      "El camino del supervisor apoya observación, estructura, preparación y apoyo diario.",
      "Juntos, estos caminos crean una plataforma viva, práctica y acogedora.",
    ],
    spokenSteps: [
      "Bienvenido a Bronson Family Farm. Esto es más que una granja. Es un ecosistema vivo de comida, familia, aprendizaje y futuro.",
      "El camino del invitado presenta la tierra, la misión y la visión general.",
      "El camino del cliente lleva al mercado, la nutrición, las recetas y las decisiones saludables.",
      "El camino del productor apoya planificación, clima, temporada y cosecha.",
      "El camino juvenil destaca desarrollo laboral, trabajo en equipo, seguridad y crecimiento.",
      "El camino del supervisor apoya observación, estructura, preparación y apoyo diario.",
      "Juntos, estos caminos crean una plataforma viva, práctica y acogedora.",
    ],
  },

  tl: {
    appTitle: "Bronson Family Farm",
    subtitle: "Gabay na Demo ng Ecosystem",
    chooseRole: "Pumili ng landas",
    startTour: "Simulan ang gabay na demo",
    stopTour: "Itigil ang gabay na demo",
    nextStep: "Susunod",
    voice: "Boses",
    on: "Bukas",
    off: "Patay",
    weather: "Panahon",
    overview: "Buod",
    marketplace: "Marketplace",
    nutrition: "Nutrisyon at Mga Recipe",
    calendar: "Kalendaryo ng Pananim",
    intro:
      "Maligayang pagdating. Mas malaki ito kaysa sa isang farm. Dito nagtatagpo ang pagkain, pamilya, lupa, at kinabukasan.",
    roles: {
      guest: {
        title: "Bisita",
        text: "Magsimula bilang bisita. Tumingin sa paligid. Damhin ang lugar. Ito ang pasukan sa isang buhay na ecosystem.",
        bullets: [
          "Unawain ang vision ng farm",
          "Makita ang koneksyon ng lupa, pagkain, at family legacy",
          "Mag-explore bago pumili",
        ],
      },
      customer: {
        title: "Customer",
        text: "Dapat mabilis na makarating ang customer sa marketplace, healthy choices, at recipes.",
        bullets: [
          "Direktang pumunta sa marketplace",
          "Makita ang nutrition at recipe guidance",
          "Bumuo ng healthy food habits",
        ],
      },
      grower: {
        title: "Grower",
        text: "Kailangan ng grower ng crop planning, weather awareness, season readiness, at harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Kabataan",
        text: "Tungkol ito sa workforce development, teamwork, safety, responsibility, at confidence.",
        bullets: [
          "Workforce development",
          "Safety at teamwork",
          "Growth at responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Kailangan ng supervisor ng structure para sa oversight, observation, at support.",
        bullets: [
          "Observation at support",
          "Progress tracking",
          "Daily readiness",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "Marketplace Path",
        text: "Dapat mabilis na makapasok ang customer sa produce, seedlings, at repeat buying habits.",
        bullets: ["Fresh produce", "Seedlings", "Customer flow"],
      },
      nutrition: {
        title: "Nutrisyon at Mga Recipe",
        text: "Dapat konektado ang fresh food sa araw-araw sa pamamagitan ng simple recipes at healthier choices.",
        bullets: ["Nutrition guidance", "Simple recipes", "Healthy choices"],
      },
      calendar: {
        title: "Kalendaryo ng Pananim",
        text: "Dapat pinag-uugnay ng platform ang weather, planting, seasonal timing, at harvest planning.",
        bullets: ["Planting timing", "Seasonal planning", "Harvest readiness"],
      },
    },
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Ito ay higit pa sa isang farm. Isa itong buhay na ecosystem ng pagkain, pamilya, pagkatuto, at kinabukasan.",
      "Ipinapakilala ng guest pathway ang lupa, ang mission, at ang mas malaking vision.",
      "Dapat mabilis na dalhin ng customer pathway ang tao sa marketplace, nutrition, recipes, at healthy choices.",
      "Sinusuportahan ng grower pathway ang crop planning, weather awareness, seasonal timing, at harvest coordination.",
      "Ipinapakita ng youth pathway ang workforce development, teamwork, safety, confidence, at growth.",
      "Sinusuportahan ng supervisor pathway ang observation, structure, readiness, at daily support.",
      "Magkasama, bumubuo ang mga path na ito ng isang welcoming at practical na platform.",
    ],
    spokenSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Ito ay higit pa sa isang farm.",
      "Ipinapakilala ng guest pathway ang lupa, ang mission, at ang mas malaking vision.",
      "Dinadala ng customer pathway ang tao sa marketplace, nutrition, recipes, at healthy choices.",
      "Sinusuportahan ng grower pathway ang crop planning, weather awareness, seasonal timing, at harvest coordination.",
      "Ipinapakita ng youth pathway ang workforce development, teamwork, safety, confidence, at growth.",
      "Sinusuportahan ng supervisor pathway ang observation, structure, readiness, at daily support.",
      "Magkasama, bumubuo ang mga path na ito ng isang welcoming at practical na platform.",
    ],
  },

  it: {
    appTitle: "Bronson Family Farm",
    subtitle: "Demo Guidata dell’Ecosistema",
    chooseRole: "Scegli un percorso",
    startTour: "Avvia demo guidata",
    stopTour: "Ferma demo guidata",
    nextStep: "Passo successivo",
    voice: "Voce",
    on: "Attiva",
    off: "Disattiva",
    weather: "Meteo",
    overview: "Panoramica",
    marketplace: "Mercato",
    nutrition: "Nutrizione e Ricette",
    calendar: "Calendario delle Colture",
    intro:
      "Benvenuto. Questo è qualcosa di più grande di una fattoria. Qui si incontrano cibo, famiglia, terra e futuro.",
    roles: {
      guest: {
        title: "Ospite",
        text: "Inizia come ospite. Guarda intorno. Senti il luogo. Questa è la porta d’ingresso a un ecosistema vivo.",
        bullets: [
          "Capire la visione della fattoria",
          "Vedere il legame tra terra, cibo e eredità familiare",
          "Esplorare prima di scegliere",
        ],
      },
      customer: {
        title: "Cliente",
        text: "I clienti dovrebbero entrare rapidamente nel mercato, nelle scelte salutari e nelle ricette.",
        bullets: [
          "Entrare direttamente nel mercato",
          "Vedere nutrizione e ricette",
          "Costruire abitudini sane",
        ],
      },
      grower: {
        title: "Coltivatore",
        text: "I coltivatori hanno bisogno di pianificazione, meteo, stagione e raccolto in un unico luogo.",
        bullets: [
          "Pianificazione colture",
          "Preparazione stagionale",
          "Coordinamento post-raccolta",
        ],
      },
      youth: {
        title: "Giovani",
        text: "Questo percorso riguarda sviluppo del lavoro, squadra, sicurezza, responsabilità e fiducia.",
        bullets: [
          "Sviluppo del lavoro",
          "Sicurezza e collaborazione",
          "Crescita e responsabilità",
        ],
      },
      supervisor: {
        title: "Supervisore",
        text: "I supervisori hanno bisogno di struttura per osservazione, monitoraggio e supporto quotidiano.",
        bullets: [
          "Osservazione e supporto",
          "Monitoraggio del progresso",
          "Preparazione quotidiana",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "Percorso Mercato",
        text: "I clienti dovrebbero entrare rapidamente in prodotti, piantine e abitudini di acquisto ripetute.",
        bullets: ["Prodotti freschi", "Piantine", "Flusso clienti"],
      },
      nutrition: {
        title: "Nutrizione e Ricette",
        text: "Il cibo fresco dovrebbe collegarsi alla vita quotidiana attraverso ricette semplici e scelte migliori.",
        bullets: ["Guida nutrizionale", "Ricette semplici", "Scelte sane"],
      },
      calendar: {
        title: "Calendario delle Colture",
        text: "La piattaforma dovrebbe collegare meteo, semina, tempi stagionali e raccolto.",
        bullets: ["Tempi di semina", "Pianificazione stagionale", "Preparazione raccolto"],
      },
    },
    guidedSteps: [
      "Benvenuto a Bronson Family Farm. Questo è più di una fattoria. È un ecosistema vivo di cibo, famiglia, apprendimento e futuro.",
      "Il percorso ospite presenta la terra, la missione e la visione più ampia.",
      "Il percorso cliente dovrebbe portare rapidamente a mercato, nutrizione, ricette e scelte salutari.",
      "Il percorso coltivatore supporta pianificazione colture, meteo, tempi stagionali e raccolto.",
      "Il percorso giovani evidenzia sviluppo del lavoro, collaborazione, sicurezza e crescita.",
      "Il percorso supervisore supporta osservazione, struttura, preparazione e supporto quotidiano.",
      "Insieme, questi percorsi creano una piattaforma viva, pratica e accogliente.",
    ],
    spokenSteps: [
      "Benvenuto a Bronson Family Farm. Questo è più di una fattoria.",
      "Il percorso ospite presenta la terra, la missione e la visione più ampia.",
      "Il percorso cliente porta rapidamente a mercato, nutrizione, ricette e scelte salutari.",
      "Il percorso coltivatore supporta pianificazione colture, meteo, tempi stagionali e raccolto.",
      "Il percorso giovani evidenzia sviluppo del lavoro, collaborazione, sicurezza e crescita.",
      "Il percorso supervisore supporta osservazione, struttura, preparazione e supporto quotidiano.",
      "Insieme, questi percorsi creano una piattaforma viva, pratica e accogliente.",
    ],
  },

  he: {
    appTitle: "Bronson Family Farm",
    subtitle: "הדגמה מודרכת של המערכת",
    chooseRole: "בחר מסלול",
    startTour: "התחל הדגמה מודרכת",
    stopTour: "עצור הדגמה מודרכת",
    nextStep: "השלב הבא",
    voice: "קול",
    on: "פועל",
    off: "כבוי",
    weather: "מזג אוויר",
    overview: "סקירה",
    marketplace: "שוק",
    nutrition: "תזונה ומתכונים",
    calendar: "לוח גידולים",
    intro:
      "ברוכים הבאים. זה גדול יותר מחווה. כאן נפגשים מזון, משפחה, אדמה ועתיד.",
    roles: {
      guest: {
        title: "אורח",
        text: "התחל כאורח. הסתכל סביב. הרגש את המקום. זו הכניסה למערכת חיה.",
        bullets: [
          "להבין את חזון החווה",
          "לראות את הקשר בין אדמה, מזון ומורשת משפחתית",
          "לחקור לפני בחירה",
        ],
      },
      customer: {
        title: "לקוח",
        text: "לקוחות צריכים להגיע במהירות לשוק, לבחירות בריאות ולמתכונים.",
        bullets: [
          "להיכנס ישר לשוק",
          "לראות תזונה ומתכונים",
          "לבנות הרגלים בריאים",
        ],
      },
      grower: {
        title: "מגדל",
        text: "מגדלים צריכים תכנון, מזג אוויר, עונה וקציר במקום אחד.",
        bullets: [
          "תכנון גידולים",
          "מוכנות עונתית",
          "תיאום לאחר הקציר",
        ],
      },
      youth: {
        title: "נוער",
        text: "המסלול הזה עוסק בפיתוח כוח עבודה, עבודת צוות, בטיחות, אחריות וביטחון.",
        bullets: [
          "פיתוח כוח עבודה",
          "בטיחות ועבודת צוות",
          "צמיחה ואחריות",
        ],
      },
      supervisor: {
        title: "מפקח",
        text: "מפקחים צריכים מבנה לתצפית, מעקב ותמיכה יומית.",
        bullets: [
          "תצפית ותמיכה",
          "מעקב אחר התקדמות",
          "מוכנות יומית",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "מסלול שוק",
        text: "לקוחות צריכים להיכנס במהירות לתוצרת, שתילים והרגלי קנייה חוזרים.",
        bullets: ["תוצרת טרייה", "שתילים", "זרימת לקוחות"],
      },
      nutrition: {
        title: "תזונה ומתכונים",
        text: "מזון טרי צריך להתחבר לחיי היומיום דרך מתכונים פשוטים ובחירות טובות יותר.",
        bullets: ["הכוונה תזונתית", "מתכונים פשוטים", "בחירות בריאות"],
      },
      calendar: {
        title: "לוח גידולים",
        text: "הפלטפורמה צריכה לחבר מזג אוויר, שתילה, תזמון עונתי ותכנון קציר.",
        bullets: ["תזמון שתילה", "תכנון עונתי", "מוכנות לקציר"],
      },
    },
    guidedSteps: [
      "ברוכים הבאים ל־Bronson Family Farm. זה יותר מחווה. זוהי מערכת חיה של מזון, משפחה, למידה ועתיד.",
      "מסלול האורח מציג את האדמה, המשימה והחזון הרחב.",
      "מסלול הלקוח צריך להוביל במהירות לשוק, לתזונה, למתכונים ולבחירות בריאות.",
      "מסלול המגדל תומך בתכנון גידולים, מודעות למזג אוויר, תזמון עונתי וקציר.",
      "מסלול הנוער מדגיש פיתוח כוח עבודה, עבודת צוות, בטיחות, ביטחון וצמיחה.",
      "מסלול המפקח תומך בתצפית, מבנה, מוכנות ותמיכה יומית.",
      "יחד, המסלולים האלה יוצרים פלטפורמה חיה, מעשית ומזמינה.",
    ],
    spokenSteps: [
      "ברוכים הבאים ל־Bronson Family Farm. זה יותר מחווה.",
      "מסלול האורח מציג את האדמה, המשימה והחזון הרחב.",
      "מסלול הלקוח מוביל במהירות לשוק, לתזונה, למתכונים ולבחירות בריאות.",
      "מסלול המגדל תומך בתכנון גידולים, מודעות למזג אוויר, תזמון עונתי וקציר.",
      "מסלול הנוער מדגיש פיתוח כוח עבודה, עבודת צוות, בטיחות, ביטחון וצמיחה.",
      "מסלול המפקח תומך בתצפית, מבנה, מוכנות ותמיכה יומית.",
      "יחד, המסלולים האלה יוצרים פלטפורמה חיה, מעשית ומזמינה.",
    ],
  },

  patwa: {
    appTitle: "Bronson Family Farm",
    subtitle: "Guided Ecosystem Demo",
    chooseRole: "Pick a pathway",
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    voice: "Voice",
    on: "On",
    off: "Off",
    weather: "Weather",
    overview: "Overview",
    marketplace: "Marketplace",
    nutrition: "Nutrition an Recipes",
    calendar: "Crop Calendar",
    intro:
      "Welcome. Yuh a step into something bigger than a farm. A yah so food, family, land, an future come together.",
    roles: {
      guest: {
        title: "Guest",
        text: "Start as a guest. Tek a look round. Feel di place. Dis a di front door into a living ecosystem.",
        bullets: [
          "Understand di farm vision",
          "See di link between land, food, an family legacy",
          "Explore before yuh choose",
        ],
      },
      customer: {
        title: "Customer",
        text: "Customers fi move quick into di marketplace, healthy choices, recipes, an better food connection.",
        bullets: [
          "Go straight to di marketplace",
          "See nutrition an recipe guidance",
          "Build healthy food habits",
        ],
      },
      grower: {
        title: "Grower",
        text: "Growers need crop planning, weather awareness, season readiness, an harvest coordination inna one place.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "Dis pathway about workforce development, teamwork, safety, responsibility, an confidence.",
        bullets: [
          "Workforce development",
          "Safety an teamwork",
          "Growth an responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Supervisors need structure fi oversight, observation, progress tracking, an daily support.",
        bullets: [
          "Observation an support",
          "Progress tracking",
          "Daily readiness",
        ],
      },
    },
    sections: {
      marketplace: {
        title: "Marketplace Path",
        text: "Customers fi move quick into produce, seedlings, food access, an repeat buying habits.",
        bullets: ["Fresh produce", "Seedlings", "Customer flow"],
      },
      nutrition: {
        title: "Nutrition an Recipes",
        text: "Fresh food fi connect to everyday life through simple recipes, practical nutrition, an healthier choices.",
        bullets: ["Nutrition guidance", "Simple recipes", "Healthy choices"],
      },
      calendar: {
        title: "Crop Calendar",
        text: "Di platform fi connect weather, planting, seasonal timing, an harvest planning inna one clear view.",
        bullets: ["Planting timing", "Season planning", "Harvest readiness"],
      },
    },
    guidedSteps: [
      "Welcome. Yuh a step into something bigger than a farm. A yah so food, family, land, an future come together.",
      "Di guest pathway introduce di land, di mission, an di bigger vision fi di farm an di community.",
      "Di customer pathway fi carry people quick into di marketplace, nutrition guidance, recipes, an healthy food choices.",
      "Di grower pathway support crop planning, weather awareness, seasonal timing, an harvest coordination.",
      "Di youth pathway highlight workforce development, teamwork, safety, confidence, an visible growth.",
      "Di supervisor pathway support observation, structure, readiness, an daily support cross di work environment.",
      "Together, dem pathways build a platform weh feel practical, welcoming, an alive.",
    ],
    spokenSteps: [
      "Welcome. You are stepping into something bigger than a farm. This is where food, family, land, and future come together.",
      "The guest pathway introduces the land, the mission, and the broader vision for the farm and the community.",
      "The customer pathway leads people into the marketplace, nutrition guidance, recipes, and healthier food choices.",
      "The grower pathway supports crop planning, weather awareness, seasonal timing, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, confidence, and visible growth.",
      "The supervisor pathway supports observation, structure, readiness, and daily support across the work environment.",
      "Together, these pathways build a platform that feels practical, welcoming, and alive.",
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
  const [voiceOn, setVoiceOn] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "marketplace" | "nutrition" | "calendar">("overview")

  const t = content[lang]
  const isRTL = lang === "he"
  const currentRole = t.roles[role]

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

  const visibleGuidedScript = useMemo(() => t.guidedSteps, [t])
  const spokenGuidedScript = useMemo(() => t.spokenSteps, [t])

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

    const utter = new SpeechSynthesisUtterance(spokenGuidedScript[tourStep] || "")
    utter.lang = langMap[lang]
    utter.rate = lang === "patwa" ? 0.86 : 0.9
    utter.pitch = lang === "patwa" ? 0.98 : 1.05
    utter.volume = 1

    const preferredVoice = pickVoice(langMap[lang])
    if (preferredVoice) utter.voice = preferredVoice

    utter.onend = () => {
      setTimeout(() => {
        setTourStep((prev) => {
          if (prev >= spokenGuidedScript.length - 1) {
            setTourOn(false)
            return 0
          }
          return prev + 1
        })
      }, 500)
    }

    window.speechSynthesis.speak(utter)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [tourOn, voiceOn, tourStep, spokenGuidedScript, lang])

  useEffect(() => {
    if (!tourOn) {
      setTourStep(0)
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [tourOn])

  const renderTabContent = () => {
    if (activeTab === "overview") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "18px", color: "#5b6d5d", fontWeight: 700, marginBottom: 10 }}>
              {t.overview}
            </div>
            <h2 style={{ fontSize: "38px", marginTop: 0 }}>{currentRole.title}</h2>
            <p style={{ fontSize: "22px", lineHeight: 1.5 }}>{t.intro}</p>
            <p style={{ fontSize: "21px", lineHeight: 1.6 }}>{currentRole.text}</p>
          </div>

          <div
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ fontSize: "30px", marginTop: 0 }}>{currentRole.title}</h3>
            <ul style={{ fontSize: "21px", lineHeight: 1.7, marginBottom: "20px" }}>
              {currentRole.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div
              style={{
                background: "#edf4ec",
                padding: "16px",
                borderRadius: "10px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#23452d",
              }}
            >
              {t.weather}: {temp === null ? "Loading..." : `${temp}°`}
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "marketplace") {
      return (
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "14px",
            boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "34px", marginTop: 0 }}>{t.sections.marketplace.title}</h2>
          <p style={{ fontSize: "22px", lineHeight: 1.6 }}>{t.sections.marketplace.text}</p>
          <ul style={{ fontSize: "21px", lineHeight: 1.8 }}>
            {t.sections.marketplace.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }

    if (activeTab === "nutrition") {
      return (
        <div
          style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "14px",
            boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ fontSize: "34px", marginTop: 0 }}>{t.sections.nutrition.title}</h2>
          <p style={{ fontSize: "22px", lineHeight: 1.6 }}>{t.sections.nutrition.text}</p>
          <ul style={{ fontSize: "21px", lineHeight: 1.8 }}>
            {t.sections.nutrition.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }

    return (
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: "34px", marginTop: 0 }}>{t.sections.calendar.title}</h2>
        <p style={{ fontSize: "22px", lineHeight: 1.6 }}>{t.sections.calendar.text}</p>
        <ul style={{ fontSize: "21px", lineHeight: 1.8 }}>
          {t.sections.calendar.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f1ea",
        minHeight: "100vh",
        padding: "30px",
        color: "#1e2a1f",
      }}
    >
      <div style={{ maxWidth: "1450px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "58px", margin: "0 0 10px 0", fontWeight: 800 }}>
          {t.appTitle}
        </h1>

        <p style={{ fontSize: "22px", margin: "0 0 22px 0", color: "#4f5e51" }}>
          {t.subtitle}
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: "#38503d" }}>{t.chooseRole}</div>

          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: "12px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                backgroundColor: role === r ? "#2f6b49" : "#d3d3d3",
                color: role === r ? "#fff" : "#000",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {t.roles[r].title}
            </button>
          ))}

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LangKey)}
            style={{
              marginLeft: isRTL ? 0 : "auto",
              marginRight: isRTL ? "auto" : 0,
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "17px",
              border: "1px solid #c9c9c9",
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
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              background: voiceOn ? "#385f90" : "#a9a9a9",
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
              padding: "12px 18px",
              borderRadius: "8px",
              border: "none",
              background: tourOn ? "#8a3d3d" : "#244a72",
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
                prev < visibleGuidedScript.length - 1 ? prev + 1 : prev
              )
            }
            style={{
              padding: "12px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#7d6a2d",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {t.nextStep}
          </button>
        </div>

        <div
          style={{
            width: "100%",
            height: "430px",
            overflow: "hidden",
            borderRadius: "14px",
            marginBottom: "24px",
            backgroundColor: "#d9dfd7",
          }}
        >
          <img
            src={imageMap[role]}
            alt={currentRole.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {tourOn && (
          <div
            style={{
              background: "#fff7da",
              borderLeft: "8px solid #c29a17",
              borderRadius: "10px",
              padding: "18px 20px",
              marginBottom: "24px",
              fontSize: "22px",
              lineHeight: 1.5,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {visibleGuidedScript[tourStep]}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          {[
            { key: "overview", label: t.overview },
            { key: "marketplace", label: t.marketplace },
            { key: "nutrition", label: t.nutrition },
            { key: "calendar", label: t.calendar },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as "overview" | "marketplace" | "nutrition" | "calendar")
              }
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: activeTab === tab.key ? "#234a72" : "#d8d8d8",
                color: activeTab === tab.key ? "#fff" : "#000",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </div>
  )
}
