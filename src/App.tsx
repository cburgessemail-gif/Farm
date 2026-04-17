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
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    voice: "Voice",
    weather: "Weather",
    chooseRole: "Choose a pathway",
    intro:
      "A living platform connecting land, food, family, learning, workforce development, and community commerce.",
    roles: {
      guest: {
        title: "Guest",
        text: "An introduction to the ecosystem, the community, and the larger vision.",
        bullets: [
          "Understand the farm vision",
          "See how family, food, and learning connect",
          "Explore before choosing a pathway",
        ],
      },
      customer: {
        title: "Customer",
        text: "A guided pathway into marketplace access, nutrition, recipes, and healthy choices.",
        bullets: [
          "Go directly to the marketplace",
          "See nutrition and recipe support",
          "Build habits around healthy food choices",
        ],
      },
      grower: {
        title: "Grower",
        text: "A role for crop planning, season readiness, weather awareness, and harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "A workforce pathway focused on teamwork, safety, structure, confidence, and growth.",
        bullets: [
          "Workforce development",
          "Safety and teamwork",
          "Growth and responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Oversight, support, progress tracking, and guidance for the work environment.",
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
        text: "Customers need a quick and clear path into produce, seedlings, recipes, and nutrition guidance.",
      },
      nutrition: {
        title: "Nutrition & Recipes",
        text: "Fresh food should connect to everyday eating, healthy choices, and simple preparation guidance.",
      },
      calendar: {
        title: "Crop Calendar",
        text: "The platform should connect weather, timing, planting, and seasonal planning in one place.",
      },
      youth: {
        title: "Youth Workforce",
        text: "The youth path should show learning, teamwork, work readiness, and visible growth over time.",
      },
      supervisor: {
        title: "Supervisor Support",
        text: "Supervisors need structure for oversight, progress tracking, and support across the day.",
      },
    },
    guidedSteps: [
      "Welcome to the Bronson Family Farm guided ecosystem demo.",
      "This platform is designed to feel like a real working system, not a presentation.",
      "The guest pathway introduces the vision, the land, the community, and the role of the farm in family and regional growth.",
      "The customer pathway should move quickly into the marketplace, nutrition guidance, recipes, and healthy food choices.",
      "The grower pathway supports crop planning, weather awareness, seasonal readiness, and harvest coordination.",
      "The youth pathway highlights workforce development, teamwork, safety, responsibility, and visible growth.",
      "The supervisor pathway supports observation, progress tracking, structure, and daily readiness.",
      "This demo is meant to grow into a world-class role-based farm platform.",
    ],
  },

  es: {
    appTitle: "Bronson Family Farm",
    subtitle: "Demostración Guiada del Ecosistema",
    startTour: "Iniciar demostración guiada",
    stopTour: "Detener demostración guiada",
    nextStep: "Siguiente paso",
    voice: "Voz",
    weather: "Clima",
    chooseRole: "Elige un camino",
    intro:
      "Una plataforma viva que conecta tierra, alimentos, familia, aprendizaje, desarrollo laboral y comercio comunitario.",
    roles: {
      guest: {
        title: "Invitado",
        text: "Una introducción al ecosistema, la comunidad y la visión general.",
        bullets: [
          "Comprender la visión de la finca",
          "Ver cómo se conectan familia, comida y aprendizaje",
          "Explorar antes de elegir un camino",
        ],
      },
      customer: {
        title: "Cliente",
        text: "Un camino guiado hacia el mercado, la nutrición, las recetas y las decisiones saludables.",
        bullets: [
          "Ir directamente al mercado",
          "Ver apoyo nutricional y recetas",
          "Construir hábitos saludables",
        ],
      },
      grower: {
        title: "Productor",
        text: "Un rol para la planificación de cultivos, preparación de temporada, clima y cosecha.",
        bullets: [
          "Planificación de cultivos",
          "Preparación de temporada",
          "Coordinación poscosecha",
        ],
      },
      youth: {
        title: "Joven",
        text: "Un camino laboral enfocado en equipo, seguridad, estructura, confianza y crecimiento.",
        bullets: [
          "Desarrollo laboral",
          "Seguridad y trabajo en equipo",
          "Crecimiento y responsabilidad",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Supervisión, apoyo, seguimiento del progreso y orientación para el entorno de trabajo.",
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
        text: "Los clientes necesitan una entrada rápida y clara hacia productos, plántulas, recetas y nutrición.",
      },
      nutrition: {
        title: "Nutrición y Recetas",
        text: "La comida fresca debe conectarse con la alimentación diaria, elecciones saludables y preparación simple.",
      },
      calendar: {
        title: "Calendario de Cultivo",
        text: "La plataforma debe conectar clima, tiempo, siembra y planificación estacional en un solo lugar.",
      },
      youth: {
        title: "Trabajo Juvenil",
        text: "El camino juvenil debe mostrar aprendizaje, trabajo en equipo, preparación laboral y crecimiento visible.",
      },
      supervisor: {
        title: "Apoyo al Supervisor",
        text: "Los supervisores necesitan estructura para supervisión, seguimiento y apoyo a lo largo del día.",
      },
    },
    guidedSteps: [
      "Bienvenido a la demostración guiada del ecosistema de Bronson Family Farm.",
      "Esta plataforma está diseñada para sentirse como un sistema real y no como una presentación.",
      "El camino del invitado presenta la visión, la tierra, la comunidad y el papel de la finca.",
      "El camino del cliente debe llevar rápidamente al mercado, la nutrición, las recetas y las decisiones saludables.",
      "El camino del productor apoya la planificación de cultivos, el clima, la temporada y la cosecha.",
      "El camino juvenil destaca desarrollo laboral, equipo, seguridad, responsabilidad y crecimiento.",
      "El camino del supervisor apoya observación, seguimiento, estructura y preparación diaria.",
      "Esta demostración está diseñada para crecer hasta convertirse en una plataforma agrícola de clase mundial.",
    ],
  },

  tl: {
    appTitle: "Bronson Family Farm",
    subtitle: "Gabay na Demo ng Ecosystem",
    startTour: "Simulan ang gabay na demo",
    stopTour: "Itigil ang gabay na demo",
    nextStep: "Susunod",
    voice: "Boses",
    weather: "Panahon",
    chooseRole: "Pumili ng landas",
    intro:
      "Isang buhay na platform na nagdurugtong sa lupa, pagkain, pamilya, pagkatuto, workforce development, at community commerce.",
    roles: {
      guest: {
        title: "Bisita",
        text: "Panimula sa ecosystem, komunidad, at mas malaking bisyon.",
        bullets: [
          "Unawain ang vision ng farm",
          "Makita ang koneksyon ng pamilya, pagkain, at pagkatuto",
          "Mag-explore bago pumili ng landas",
        ],
      },
      customer: {
        title: "Customer",
        text: "Isang gabay na landas papunta sa marketplace, nutrition, recipes, at healthy choices.",
        bullets: [
          "Direktang pumasok sa marketplace",
          "Makita ang nutrition at recipes",
          "Bumuo ng healthy food habits",
        ],
      },
      grower: {
        title: "Grower",
        text: "Isang papel para sa crop planning, season readiness, weather awareness, at harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Kabataan",
        text: "Isang workforce path na nakatuon sa teamwork, safety, structure, confidence, at growth.",
        bullets: [
          "Workforce development",
          "Safety at teamwork",
          "Growth at responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Oversight, support, progress tracking, at guidance para sa work environment.",
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
        text: "Kailangan ng customer ng mabilis at malinaw na daan papunta sa produce, seedlings, recipes, at nutrition guidance.",
      },
      nutrition: {
        title: "Nutrition at Recipes",
        text: "Ang fresh food ay dapat nakaugnay sa araw-araw na pagkain at mas mabuting pagpili.",
      },
      calendar: {
        title: "Crop Calendar",
        text: "Dapat pag-isahin ng platform ang weather, timing, planting, at seasonal planning.",
      },
      youth: {
        title: "Youth Workforce",
        text: "Dapat ipakita ng youth path ang pagkatuto, teamwork, work readiness, at visible growth.",
      },
      supervisor: {
        title: "Supervisor Support",
        text: "Kailangan ng supervisor ng structure para sa oversight, tracking, at support sa buong araw.",
      },
    },
    guidedSteps: [
      "Maligayang pagdating sa guided ecosystem demo ng Bronson Family Farm.",
      "Ang platform na ito ay ginawa upang magmukhang totoong working system at hindi presentation.",
      "Ang guest pathway ay nagpapakilala sa vision, lupa, komunidad, at papel ng farm sa paglago.",
      "Ang customer pathway ay dapat mabilis na humantong sa marketplace, nutrition, recipes, at healthy choices.",
      "Ang grower pathway ay sumusuporta sa crop planning, weather awareness, season readiness, at harvest coordination.",
      "Ang youth pathway ay nagpapakita ng workforce development, teamwork, safety, responsibility, at growth.",
      "Ang supervisor pathway ay sumusuporta sa observation, tracking, structure, at daily readiness.",
      "Ang demo na ito ay para sa isang world-class role-based farm platform.",
    ],
  },

  it: {
    appTitle: "Bronson Family Farm",
    subtitle: "Demo Guidata dell’Ecosistema",
    startTour: "Avvia demo guidata",
    stopTour: "Ferma demo guidata",
    nextStep: "Passo successivo",
    voice: "Voce",
    weather: "Meteo",
    chooseRole: "Scegli un percorso",
    intro:
      "Una piattaforma viva che collega terra, cibo, famiglia, apprendimento, sviluppo del lavoro e commercio comunitario.",
    roles: {
      guest: {
        title: "Ospite",
        text: "Un’introduzione all’ecosistema, alla comunità e alla visione generale.",
        bullets: [
          "Comprendere la visione della fattoria",
          "Vedere il legame tra famiglia, cibo e apprendimento",
          "Esplorare prima di scegliere",
        ],
      },
      customer: {
        title: "Cliente",
        text: "Un percorso guidato verso mercato, nutrizione, ricette e scelte salutari.",
        bullets: [
          "Entrare rapidamente nel mercato",
          "Vedere nutrizione e ricette",
          "Costruire abitudini alimentari sane",
        ],
      },
      grower: {
        title: "Coltivatore",
        text: "Un ruolo per pianificazione delle colture, stagione, meteo e coordinamento del raccolto.",
        bullets: [
          "Pianificazione colture",
          "Preparazione stagionale",
          "Coordinamento post-raccolta",
        ],
      },
      youth: {
        title: "Giovani",
        text: "Un percorso lavorativo centrato su squadra, sicurezza, struttura, fiducia e crescita.",
        bullets: [
          "Sviluppo del lavoro",
          "Sicurezza e collaborazione",
          "Crescita e responsabilità",
        ],
      },
      supervisor: {
        title: "Supervisore",
        text: "Supervisione, supporto, monitoraggio e guida per l’ambiente di lavoro.",
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
        text: "I clienti hanno bisogno di un accesso rapido e chiaro a prodotti, piantine, ricette e nutrizione.",
      },
      nutrition: {
        title: "Nutrizione e Ricette",
        text: "Il cibo fresco dovrebbe collegarsi all’alimentazione quotidiana e a scelte migliori.",
      },
      calendar: {
        title: "Calendario delle Colture",
        text: "La piattaforma dovrebbe collegare meteo, tempi, semina e pianificazione stagionale.",
      },
      youth: {
        title: "Lavoro Giovanile",
        text: "Il percorso giovani dovrebbe mostrare apprendimento, squadra, preparazione al lavoro e crescita visibile.",
      },
      supervisor: {
        title: "Supporto Supervisore",
        text: "I supervisori hanno bisogno di struttura per osservazione, monitoraggio e supporto.",
      },
    },
    guidedSteps: [
      "Benvenuto alla demo guidata dell’ecosistema di Bronson Family Farm.",
      "Questa piattaforma è progettata per sembrare un sistema reale e non una presentazione.",
      "Il percorso ospite introduce la visione, la terra, la comunità e il ruolo della fattoria.",
      "Il percorso cliente deve portare rapidamente a mercato, nutrizione, ricette e scelte sane.",
      "Il percorso coltivatore supporta pianificazione colture, meteo, stagione e raccolto.",
      "Il percorso giovani evidenzia sviluppo del lavoro, squadra, sicurezza, responsabilità e crescita.",
      "Il percorso supervisore supporta osservazione, monitoraggio, struttura e preparazione quotidiana.",
      "Questa demo è pensata per diventare una piattaforma agricola di livello mondiale.",
    ],
  },

  he: {
    appTitle: "Bronson Family Farm",
    subtitle: "הדגמה מודרכת של המערכת",
    startTour: "התחל הדגמה מודרכת",
    stopTour: "עצור הדגמה מודרכת",
    nextStep: "השלב הבא",
    voice: "קול",
    weather: "מזג אוויר",
    chooseRole: "בחר מסלול",
    intro:
      "פלטפורמה חיה המחברת אדמה, מזון, משפחה, למידה, פיתוח כוח עבודה ומסחר קהילתי.",
    roles: {
      guest: {
        title: "אורח",
        text: "היכרות עם המערכת, הקהילה והחזון הרחב.",
        bullets: [
          "להבין את חזון החווה",
          "לראות איך משפחה, מזון ולמידה מתחברים",
          "לחקור לפני בחירת מסלול",
        ],
      },
      customer: {
        title: "לקוח",
        text: "מסלול מודרך לשוק, תזונה, מתכונים ובחירות בריאות.",
        bullets: [
          "להיכנס במהירות לשוק",
          "לראות תזונה ומתכונים",
          "לבנות הרגלים בריאים",
        ],
      },
      grower: {
        title: "מגדל",
        text: "תפקיד לתכנון גידולים, מוכנות עונתית, מזג אוויר ותיאום קציר.",
        bullets: [
          "תכנון גידולים",
          "מוכנות עונתית",
          "תיאום לאחר הקציר",
        ],
      },
      youth: {
        title: "נוער",
        text: "מסלול כוח עבודה המתמקד בצוות, בטיחות, מבנה, ביטחון וצמיחה.",
        bullets: [
          "פיתוח כוח עבודה",
          "בטיחות ועבודת צוות",
          "צמיחה ואחריות",
        ],
      },
      supervisor: {
        title: "מפקח",
        text: "פיקוח, תמיכה, מעקב והכוונה לסביבת העבודה.",
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
        text: "לקוחות צריכים גישה מהירה וברורה לתוצרת, שתילים, מתכונים והכוונה תזונתית.",
      },
      nutrition: {
        title: "תזונה ומתכונים",
        text: "מזון טרי צריך להתחבר לאכילה יומיומית ולבחירות טובות יותר.",
      },
      calendar: {
        title: "לוח גידולים",
        text: "הפלטפורמה צריכה לחבר מזג אוויר, תזמון, שתילה ותכנון עונתי.",
      },
      youth: {
        title: "כוח עבודה לנוער",
        text: "מסלול הנוער צריך להראות למידה, עבודת צוות, מוכנות לעבודה וצמיחה נראית לעין.",
      },
      supervisor: {
        title: "תמיכת מפקח",
        text: "מפקחים צריכים מבנה לפיקוח, מעקב ותמיכה לאורך היום.",
      },
    },
    guidedSteps: [
      "ברוכים הבאים להדגמה המודרכת של Bronson Family Farm.",
      "הפלטפורמה הזאת נועדה להרגיש כמו מערכת אמיתית ולא כמו מצגת.",
      "מסלול האורח מציג את החזון, האדמה, הקהילה ותפקיד החווה.",
      "מסלול הלקוח צריך להוביל במהירות לשוק, תזונה, מתכונים ובחירות בריאות.",
      "מסלול המגדל תומך בתכנון גידולים, מזג אוויר, עונה וקציר.",
      "מסלול הנוער מדגיש פיתוח כוח עבודה, עבודת צוות, בטיחות, אחריות וצמיחה.",
      "מסלול המפקח תומך בתצפית, מעקב, מבנה ומוכנות יומית.",
      "הדגמה זו נועדה להפוך לפלטפורמה חקלאית ברמה עולמית.",
    ],
  },

  patwa: {
    appTitle: "Bronson Family Farm",
    subtitle: "Guided Ecosystem Demo",
    startTour: "Start Guided Demo",
    stopTour: "Stop Guided Demo",
    nextStep: "Next Step",
    voice: "Voice",
    weather: "Weather",
    chooseRole: "Pick a pathway",
    intro:
      "A living platform weh connect land, food, family, learning, workforce development, an community commerce.",
    roles: {
      guest: {
        title: "Guest",
        text: "Introduction to di ecosystem, di community, an di bigger vision.",
        bullets: [
          "Understand di farm vision",
          "See how family, food, an learning connect",
          "Explore before yuh choose",
        ],
      },
      customer: {
        title: "Customer",
        text: "A guided pathway into marketplace access, nutrition, recipes, an healthy choices.",
        bullets: [
          "Go straight to di marketplace",
          "See nutrition an recipe support",
          "Build healthy food habits",
        ],
      },
      grower: {
        title: "Grower",
        text: "A role fi crop planning, season readiness, weather awareness, an harvest coordination.",
        bullets: [
          "Crop planning",
          "Season readiness",
          "Post-harvest coordination",
        ],
      },
      youth: {
        title: "Youth",
        text: "A workforce path focused pon teamwork, safety, structure, confidence, an growth.",
        bullets: [
          "Workforce development",
          "Safety an teamwork",
          "Growth an responsibility",
        ],
      },
      supervisor: {
        title: "Supervisor",
        text: "Oversight, support, progress tracking, an guidance fi di work environment.",
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
        text: "Customers need a quick clear path to produce, seedlings, recipes, an nutrition guidance.",
      },
      nutrition: {
        title: "Nutrition an Recipes",
        text: "Fresh food fi connect to everyday eating, healthy choices, an simple preparation.",
      },
      calendar: {
        title: "Crop Calendar",
        text: "Di platform fi connect weather, timing, planting, an seasonal planning inna one place.",
      },
      youth: {
        title: "Youth Workforce",
        text: "Di youth path fi show learning, teamwork, work readiness, an visible growth.",
      },
      supervisor: {
        title: "Supervisor Support",
        text: "Supervisors need structure fi oversight, tracking, an support all day.",
      },
    },
    guidedSteps: [
      "Welcome to di Bronson Family Farm guided ecosystem demo.",
      "Dis platform build fi feel like a real working system, not a presentation.",
      "Di guest pathway introduce di vision, di land, di community, an di role a di farm.",
      "Di customer pathway should move quick to di marketplace, nutrition, recipes, an healthy choices.",
      "Di grower pathway support crop planning, weather awareness, season readiness, an harvest coordination.",
      "Di youth pathway highlight workforce development, teamwork, safety, responsibility, an growth.",
      "Di supervisor pathway support observation, progress tracking, structure, an daily readiness.",
      "Dis demo meant fi grow into a world-class role-based farm platform.",
    ],
  },
} as const

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [lang, setLang] = useState<LangKey>("en")
  const [temp, setTemp] = useState<number | null>(null)
  const [tourOn, setTourOn] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [voiceOn, setVoiceOn] = useState(true)

  const t = content[lang]
  const isRTL = lang === "he"
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) => setTemp(data.current.temperature_2m))
      .catch(() => setTemp(null))
  }, [])

  const guidedScript = useMemo(() => {
    return t.guidedSteps
  }, [t])

  useEffect(() => {
    if (!tourOn || !voiceOn || !("speechSynthesis" in window)) return

    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(guidedScript[tourStep] || "")
    utter.rate = 0.95
    utter.pitch = 1
    utter.volume = 1

    const voiceLangMap: Record<LangKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      he: "he-IL",
      patwa: "en-JM",
    }

    utter.lang = voiceLangMap[lang]

    utter.onend = () => {
      setTimeout(() => {
        setTourStep((prev) => {
          if (prev >= guidedScript.length - 1) {
            setTourOn(false)
            return 0
          }
          return prev + 1
        })
      }, 400)
    }

    utteranceRef.current = utter
    window.speechSynthesis.speak(utter)

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [tourOn, tourStep, guidedScript, lang, voiceOn])

  useEffect(() => {
    if (!tourOn) {
      setTourStep(0)
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [tourOn])

  const currentRole = t.roles[role]

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
        <h1
          style={{
            fontSize: "58px",
            margin: "0 0 10px 0",
            fontWeight: 800,
          }}
        >
          {t.appTitle}
        </h1>

        <p
          style={{
            fontSize: "22px",
            margin: "0 0 22px 0",
            color: "#4f5e51",
          }}
        >
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
            {t.voice}: {voiceOn ? "On" : "Off"}
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
            <h3 style={{ fontSize: "30px", marginTop: 0 }}>
              {currentRole.title}
            </h3>
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {Object.values(t.sections).map((section) => (
            <div
              key={section.title}
              style={{
                background: "#ffffff",
                padding: "22px",
                borderRadius: "14px",
                boxShadow: "0 5px 14px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ fontSize: "26px", marginTop: 0 }}>{section.title}</h3>
              <p style={{ fontSize: "20px", lineHeight: 1.6, marginBottom: 0 }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
