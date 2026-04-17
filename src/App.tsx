import { useEffect, useMemo, useState } from "react"

type Role = "guest" | "customer" | "grower" | "youth" | "supervisor"
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

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
      "Welcome. This is more than a farm. It is a living ecosystem where food, family, land, learning, and opportunity come together.",
    roles: {
      guest: {
        title: "Guest",
        text: "The guest pathway is the front door. It introduces the vision, the land, the community, and the larger purpose of the ecosystem.",
        bullets: [
          "See the farm vision clearly",
          "Understand the larger ecosystem",
          "Explore before choosing a pathway",
        ],
      },
      customer: {
        title: "Customer",
        text: "The customer pathway should move quickly into marketplace access, recipes, nutrition, and healthier food choices.",
        bullets: [
          "Marketplace entry",
          "Nutrition guidance",
          "Recipes and healthy food support",
        ],
      },
      grower: {
        title: "Grower",
        text: "The grower pathway supports crop planning, seasonal timing, weather awareness, and harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "The youth pathway is about workforce development, teamwork, structure, confidence, and growth.",
        bullets: [
          "Workforce development",
          "Safety and teamwork",
          "Responsibility and growth",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "The supervisor pathway supports oversight, observation, progress tracking, and daily readiness.",
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
        text: "Customers should move easily into produce, seedlings, healthy choices, and repeat buying habits.",
      },
      nutrition: {
        title: "Nutrition & Recipes",
        text: "Fresh food should connect to everyday life through practical nutrition guidance and simple recipe support.",
      },
      calendar: {
        title: "Crop Calendar",
        text: "The crop calendar should connect planting, weather, seasonal timing, and harvest planning.",
      },
    },
    guidedSteps: [
      "Welcome to Bronson Family Farm. This is more than a farm. It is a living ecosystem of food, family, learning, and future.",
      "The guest pathway introduces the land, the mission, and the larger community vision.",
      "The customer pathway leads into marketplace access, nutrition guidance, recipes, and healthier food choices.",
      "The grower pathway supports crop planning, weather awareness, seasonal timing, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, confidence, and visible growth.",
      "The supervisor pathway supports observation, structure, readiness, and daily support.",
      "Together, these pathways form a connected role-based platform.",
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
      "Bienvenido. Esto es más que una granja. Es un ecosistema vivo donde se unen alimentos, familia, tierra, aprendizaje y oportunidad.",
    roles: {
      guest: {
        title: "Invitado",
        text: "El camino del invitado presenta la visión, la tierra, la comunidad y el propósito general del ecosistema.",
        bullets: [
          "Ver claramente la visión de la finca",
          "Comprender el ecosistema más amplio",
          "Explorar antes de elegir",
        ],
      },
      customer: {
        title: "Cliente",
        text: "El camino del cliente debe llevar rápidamente al mercado, las recetas, la nutrición y decisiones más saludables.",
        bullets: [
          "Entrada al mercado",
          "Guía nutricional",
          "Recetas y apoyo alimentario",
        ],
      },
      grower: {
        title: "Productor",
        text: "El camino del productor apoya la planificación de cultivos, el clima, la temporada y la cosecha.",
        bullets: [
          "Planificación de cultivos",
          "Preparación estacional",
          "Coordinación de cosecha",
        ],
      },
      youth: {
        title: "Joven",
        text: "El camino juvenil trata de desarrollo laboral, trabajo en equipo, estructura, confianza y crecimiento.",
        bullets: [
          "Desarrollo laboral",
          "Seguridad y trabajo en equipo",
          "Responsabilidad y crecimiento",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "El camino del supervisor apoya observación, seguimiento y preparación diaria.",
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
        text: "Los clientes deben entrar fácilmente a productos, plántulas y elecciones saludables.",
      },
      nutrition: {
        title: "Nutrición y Recetas",
        text: "La comida fresca debe conectarse con la vida diaria mediante nutrición práctica y recetas simples.",
      },
      calendar: {
        title: "Calendario de Cultivo",
        text: "El calendario debe conectar siembra, clima, tiempo estacional y cosecha.",
      },
    },
    guidedSteps: [
      "Bienvenido a Bronson Family Farm. Esto es más que una granja. Es un ecosistema vivo de comida, familia, aprendizaje y futuro.",
      "El camino del invitado presenta la tierra, la misión y la visión comunitaria.",
      "El camino del cliente lleva al mercado, la nutrición, las recetas y decisiones más saludables.",
      "El camino del productor apoya planificación, clima, temporada y cosecha.",
      "El camino juvenil destaca desarrollo laboral, trabajo en equipo, seguridad y crecimiento.",
      "El camino del supervisor apoya observación, estructura, preparación y apoyo diario.",
      "Juntos, estos caminos forman una plataforma conectada por roles.",
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
      "Maligayang pagdating. Higit ito sa isang farm. Isa itong buhay na ecosystem ng pagkain, pamilya, lupa, pagkatuto, at oportunidad.",
    roles: {
      guest: {
        title: "Bisita",
        text: "Ipinapakilala ng guest pathway ang vision, lupa, komunidad, at mas malaking layunin ng ecosystem.",
        bullets: [
          "Makita ang vision ng farm",
          "Maunawaan ang mas malaking ecosystem",
          "Mag-explore bago pumili",
        ],
      },
      customer: {
        title: "Customer",
        text: "Dapat mabilis na dalhin ng customer pathway ang tao sa marketplace, recipes, nutrition, at healthier choices.",
        bullets: [
          "Marketplace entry",
          "Nutrition guidance",
          "Recipes at food support",
        ],
      },
      grower: {
        title: "Grower",
        text: "Sinusuportahan ng grower pathway ang crop planning, weather awareness, seasonal timing, at harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Harvest coordination",
        ],
      },
      youth: {
        title: "Kabataan",
        text: "Ang youth pathway ay tungkol sa workforce development, teamwork, structure, confidence, at growth.",
        bullets: [
          "Workforce development",
          "Safety at teamwork",
          "Responsibility at growth",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Sinusuportahan ng supervisor pathway ang observation, tracking, at daily readiness.",
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
        text: "Dapat madaling makapasok ang customer sa produce, seedlings, at healthy choices.",
      },
      nutrition: {
        title: "Nutrisyon at Mga Recipe",
        text: "Dapat konektado ang fresh food sa araw-araw sa pamamagitan ng practical nutrition at simple recipes.",
      },
      calendar: {
        title: "Kalendaryo ng Pananim",
        text: "Dapat pinagdurugtong ng calendar ang planting, weather, seasonal timing, at harvest planning.",
      },
    },
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Higit ito sa isang farm. Isa itong buhay na ecosystem ng pagkain, pamilya, pagkatuto, at kinabukasan.",
      "Ipinapakilala ng guest pathway ang lupa, mission, at mas malaking community vision.",
      "Dinadala ng customer pathway ang tao sa marketplace, nutrition, recipes, at healthier food choices.",
      "Sinusuportahan ng grower pathway ang crop planning, weather awareness, seasonal timing, at harvest coordination.",
      "Ipinapakita ng youth pathway ang workforce development, teamwork, safety, confidence, at growth.",
      "Sinusuportahan ng supervisor pathway ang observation, structure, readiness, at daily support.",
      "Magkasama, bumubuo ang mga path na ito ng isang connected role-based platform.",
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
      "Benvenuto. Questo è più di una fattoria. È un ecosistema vivo dove si incontrano cibo, famiglia, terra, apprendimento e opportunità.",
    roles: {
      guest: {
        title: "Ospite",
        text: "Il percorso ospite introduce la visione, la terra, la comunità e il grande scopo dell’ecosistema.",
        bullets: [
          "Vedere chiaramente la visione della fattoria",
          "Capire l’ecosistema più ampio",
          "Esplorare prima di scegliere",
        ],
      },
      customer: {
        title: "Cliente",
        text: "Il percorso cliente dovrebbe portare rapidamente a mercato, ricette, nutrizione e scelte migliori.",
        bullets: [
          "Ingresso al mercato",
          "Guida nutrizionale",
          "Ricette e supporto alimentare",
        ],
      },
      grower: {
        title: "Coltivatore",
        text: "Il percorso coltivatore supporta pianificazione, meteo, tempi stagionali e raccolto.",
        bullets: [
          "Pianificazione colture",
          "Preparazione stagionale",
          "Coordinamento raccolto",
        ],
      },
      youth: {
        title: "Giovani",
        text: "Il percorso giovani riguarda sviluppo del lavoro, collaborazione, struttura, fiducia e crescita.",
        bullets: [
          "Sviluppo del lavoro",
          "Sicurezza e collaborazione",
          "Responsabilità e crescita",
        ],
      },
      supervisor: {
        title: "Supervisore",
        text: "Il percorso supervisore supporta osservazione, monitoraggio e preparazione quotidiana.",
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
        text: "I clienti dovrebbero entrare facilmente in prodotti, piantine e scelte salutari.",
      },
      nutrition: {
        title: "Nutrizione e Ricette",
        text: "Il cibo fresco dovrebbe collegarsi alla vita quotidiana attraverso nutrizione pratica e ricette semplici.",
      },
      calendar: {
        title: "Calendario delle Colture",
        text: "Il calendario dovrebbe collegare semina, meteo, tempi stagionali e raccolto.",
      },
    },
    guidedSteps: [
      "Benvenuto a Bronson Family Farm. Questo è più di una fattoria. È un ecosistema vivo di cibo, famiglia, apprendimento e futuro.",
      "Il percorso ospite presenta la terra, la missione e la visione della comunità.",
      "Il percorso cliente porta a mercato, nutrizione, ricette e scelte salutari.",
      "Il percorso coltivatore supporta pianificazione, meteo, tempi stagionali e raccolto.",
      "Il percorso giovani evidenzia sviluppo del lavoro, collaborazione, sicurezza e crescita.",
      "Il percorso supervisore supporta osservazione, struttura, preparazione e supporto quotidiano.",
      "Insieme, questi percorsi formano una piattaforma connessa per ruoli.",
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
      "ברוכים הבאים. זה יותר מחווה. זוהי מערכת חיה שבה נפגשים מזון, משפחה, אדמה, למידה והזדמנות.",
    roles: {
      guest: {
        title: "אורח",
        text: "מסלול האורח מציג את החזון, האדמה, הקהילה והמטרה הרחבה של המערכת.",
        bullets: [
          "לראות בבירור את חזון החווה",
          "להבין את המערכת הרחבה יותר",
          "לחקור לפני בחירה",
        ],
      },
      customer: {
        title: "לקוח",
        text: "מסלול הלקוח צריך להוביל במהירות לשוק, למתכונים, לתזונה ולבחירות טובות יותר.",
        bullets: [
          "כניסה לשוק",
          "הכוונה תזונתית",
          "מתכונים ותמיכה במזון",
        ],
      },
      grower: {
        title: "מגדל",
        text: "מסלול המגדל תומך בתכנון, מזג אוויר, עונה וקציר.",
        bullets: [
          "תכנון גידולים",
          "מוכנות עונתית",
          "תיאום קציר",
        ],
      },
      youth: {
        title: "נוער",
        text: "מסלול הנוער עוסק בפיתוח כוח עבודה, עבודת צוות, מבנה, ביטחון וצמיחה.",
        bullets: [
          "פיתוח כוח עבודה",
          "בטיחות ועבודת צוות",
          "אחריות וצמיחה",
        ],
      },
      supervisor: {
        title: "מפקח",
        text: "מסלול המפקח תומך בתצפית, מעקב ומוכנות יומית.",
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
        text: "לקוחות צריכים להיכנס בקלות לתוצרת, שתילים ובחירות בריאות.",
      },
      nutrition: {
        title: "תזונה ומתכונים",
        text: "מזון טרי צריך להתחבר לחיי היומיום דרך תזונה מעשית ומתכונים פשוטים.",
      },
      calendar: {
        title: "לוח גידולים",
        text: "הלוח צריך לחבר בין שתילה, מזג אוויר, תזמון עונתי ותכנון קציר.",
      },
    },
    guidedSteps: [
      "ברוכים הבאים ל־Bronson Family Farm. זה יותר מחווה. זוהי מערכת חיה של מזון, משפחה, למידה ועתיד.",
      "מסלול האורח מציג את האדמה, המשימה וחזון הקהילה הרחב.",
      "מסלול הלקוח מוביל לשוק, לתזונה, למתכונים ולבחירות בריאות יותר.",
      "מסלול המגדל תומך בתכנון גידולים, מודעות למזג אוויר, תזמון עונתי וקציר.",
      "מסלול הנוער מדגיש פיתוח כוח עבודה, עבודת צוות, בטיחות, ביטחון וצמיחה.",
      "מסלול המפקח תומך בתצפית, מבנה, מוכנות ותמיכה יומית.",
      "יחד, המסלולים האלה יוצרים פלטפורמה מחוברת לפי תפקידים.",
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
      "Welcome. Yuh a step into something bigger than a farm. A yah so food, family, land, learning, an opportunity come together.",
    roles: {
      guest: {
        title: "Guest",
        text: "Di guest pathway a di front door. It introduce di vision, di land, di community, an di bigger purpose a di ecosystem.",
        bullets: [
          "See di farm vision clear",
          "Understand di bigger ecosystem",
          "Explore before yuh choose",
        ],
      },
      customer: {
        title: "Customer",
        text: "Di customer pathway fi carry people quick into marketplace access, recipes, nutrition, an healthier food choices.",
        bullets: [
          "Marketplace entry",
          "Nutrition guidance",
          "Recipes an healthy food support",
        ],
      },
      grower: {
        title: "Grower",
        text: "Di grower pathway support crop planning, seasonal timing, weather awareness, an harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "Di youth pathway about workforce development, teamwork, structure, confidence, an growth.",
        bullets: [
          "Workforce development",
          "Safety an teamwork",
          "Responsibility an growth",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Di supervisor pathway support oversight, observation, progress tracking, an daily readiness.",
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
        text: "Customers fi move easy into produce, seedlings, healthy food choices, an repeat buying habits.",
      },
      nutrition: {
        title: "Nutrition an Recipes",
        text: "Fresh food fi connect to everyday life through practical nutrition guidance an simple recipe support.",
      },
      calendar: {
        title: "Crop Calendar",
        text: "Di crop calendar fi connect planting, weather, seasonal timing, an harvest planning.",
      },
    },
    guidedSteps: [
      "Welcome. Yuh a step into something bigger than a farm. A yah so food, family, land, learning, an opportunity come together.",
      "Di guest pathway introduce di land, di mission, an di bigger community vision.",
      "Di customer pathway carry people into marketplace access, nutrition guidance, recipes, an healthier food choices.",
      "Di grower pathway support crop planning, weather awareness, seasonal timing, an harvest coordination.",
      "Di youth pathway highlight workforce development, teamwork, safety, confidence, an growth.",
      "Di supervisor pathway support observation, structure, readiness, an daily support.",
      "Together, dem pathways build one connected role-based platform.",
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
  const [activeTab, setActiveTab] = useState<"overview" | "marketplace" | "nutrition" | "calendar">("overview")

  const t = content[lang]
  const isRTL = lang === "he"
  const currentRole = t.roles[role]
  const guidedScript = useMemo(() => t.guidedSteps, [t])

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
    utter.rate = 0.84
    utter.pitch = 0.96
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
      }, 500)
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
                prev < guidedScript.length - 1 ? prev + 1 : prev
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
            {guidedScript[tourStep]}
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
