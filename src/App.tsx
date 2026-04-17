import { useEffect, useState } from "react"

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

const imageMap: Record<Role, string> = {
  guest: "/GrowArea.jpg",
  customer: "/GrowArea2.jpg",
  grower: "/GrowArea.jpg",
  youth: "/GrowArea2.jpg",
  supervisor: "/GrowArea.jpg",
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
    title: "Bronson Family Farm",
    subtitle: "Bronson Family Farm & Farm & Family Alliance Ecosystem",
    intro:
      "A living farm ecosystem connecting growers, families, youth, learning, and community commerce.",
    weather: "Weather",
    chooseRole: "Choose a pathway",
    quickView: "Quick view",
    roleLabel: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      youth: "Youth",
      supervisor: "Supervisor",
    },
    roleText: {
      guest: "Introduction to the ecosystem and community.",
      customer: "Explore marketplace access, nutrition guidance, recipes, and customer pathways.",
      grower: "Manage crops, weather, planning, and harvest coordination.",
      youth: "Learn teamwork, safety, structure, and growth through the youth workforce experience.",
      supervisor: "Track readiness, support progress, and guide the work environment.",
    },
    featureTitle: {
      guest: "What guests discover",
      customer: "Customer journey",
      grower: "Grower tools",
      youth: "Youth workforce path",
      supervisor: "Supervisor dashboard",
    },
    featureBullets: {
      guest: [
        "Understand the farm vision",
        "See how food, learning, and family legacy connect",
        "Explore the ecosystem before choosing a pathway",
      ],
      customer: [
        "Marketplace entry",
        "Nutrition and recipe support",
        "Buying habits and healthy choices",
      ],
      grower: [
        "Crop planning",
        "Season readiness",
        "Post-harvest coordination",
      ],
      youth: [
        "Safety and teamwork",
        "Workforce readiness",
        "Visible growth and responsibility",
      ],
      supervisor: [
        "Observation and support",
        "Progress tracking",
        "Daily readiness and structure",
      ],
    },
  },
  es: {
    title: "Bronson Family Farm",
    subtitle: "Ecosistema de Bronson Family Farm y Farm & Family Alliance",
    intro:
      "Un ecosistema agrícola vivo que conecta productores, familias, jóvenes, aprendizaje y comercio comunitario.",
    weather: "Clima",
    chooseRole: "Elige un camino",
    quickView: "Vista rápida",
    roleLabel: {
      guest: "Invitado",
      customer: "Cliente",
      grower: "Productor",
      youth: "Joven",
      supervisor: "Supervisor",
    },
    roleText: {
      guest: "Introducción al ecosistema y a la comunidad.",
      customer: "Explora acceso al mercado, nutrición, recetas y recorrido del cliente.",
      grower: "Gestiona cultivos, clima, planificación y coordinación de cosecha.",
      youth: "Aprende trabajo en equipo, seguridad, estructura y crecimiento.",
      supervisor: "Supervisa preparación, progreso y entorno de trabajo.",
    },
    featureTitle: {
      guest: "Lo que descubre un invitado",
      customer: "Recorrido del cliente",
      grower: "Herramientas del productor",
      youth: "Ruta juvenil",
      supervisor: "Panel del supervisor",
    },
    featureBullets: {
      guest: [
        "Comprender la visión de la finca",
        "Ver la conexión entre alimentos, aprendizaje y legado",
        "Explorar el ecosistema antes de elegir",
      ],
      customer: [
        "Entrada al mercado",
        "Apoyo en nutrición y recetas",
        "Hábitos de compra y elecciones saludables",
      ],
      grower: [
        "Planificación de cultivos",
        "Preparación de temporada",
        "Coordinación poscosecha",
      ],
      youth: [
        "Seguridad y trabajo en equipo",
        "Preparación laboral",
        "Crecimiento y responsabilidad",
      ],
      supervisor: [
        "Observación y apoyo",
        "Seguimiento del progreso",
        "Preparación diaria y estructura",
      ],
    },
  },
  tl: {
    title: "Bronson Family Farm",
    subtitle: "Bronson Family Farm at Farm & Family Alliance Ecosystem",
    intro:
      "Isang buhay na ecosystem ng bukid na nag-uugnay sa growers, pamilya, kabataan, pagkatuto, at community commerce.",
    weather: "Panahon",
    chooseRole: "Pumili ng landas",
    quickView: "Mabilis na view",
    roleLabel: {
      guest: "Bisita",
      customer: "Customer",
      grower: "Grower",
      youth: "Kabataan",
      supervisor: "Supervisor",
    },
    roleText: {
      guest: "Panimulang pagtingin sa ecosystem at komunidad.",
      customer: "Tingnan ang marketplace, nutrisyon, recipes, at customer pathway.",
      grower: "Pamahalaan ang crops, weather, planning, at harvest coordination.",
      youth: "Matuto ng teamwork, safety, structure, at growth.",
      supervisor: "Subaybayan ang kahandaan at progreso.",
    },
    featureTitle: {
      guest: "Ano ang matutuklasan ng bisita",
      customer: "Landas ng customer",
      grower: "Tools ng grower",
      youth: "Youth workforce path",
      supervisor: "Supervisor dashboard",
    },
    featureBullets: {
      guest: [
        "Unawain ang vision ng farm",
        "Makita ang koneksyon ng food, learning, at legacy",
        "Suriin ang ecosystem bago pumili",
      ],
      customer: [
        "Marketplace entry",
        "Nutrition at recipe support",
        "Buying habits at healthy choices",
      ],
      grower: [
        "Crop planning",
        "Season readiness",
        "Post-harvest coordination",
      ],
      youth: [
        "Safety at teamwork",
        "Workforce readiness",
        "Growth at responsibility",
      ],
      supervisor: [
        "Observation at support",
        "Progress tracking",
        "Daily readiness at structure",
      ],
    },
  },
  it: {
    title: "Bronson Family Farm",
    subtitle: "Ecosistema Bronson Family Farm & Farm & Family Alliance",
    intro:
      "Un ecosistema agricolo vivo che collega coltivatori, famiglie, giovani, apprendimento e commercio comunitario.",
    weather: "Meteo",
    chooseRole: "Scegli un percorso",
    quickView: "Vista rapida",
    roleLabel: {
      guest: "Ospite",
      customer: "Cliente",
      grower: "Coltivatore",
      youth: "Giovani",
      supervisor: "Supervisore",
    },
    roleText: {
      guest: "Introduzione all’ecosistema e alla comunità.",
      customer: "Esplora mercato, nutrizione, ricette e percorso cliente.",
      grower: "Gestisci colture, meteo, pianificazione e coordinamento del raccolto.",
      youth: "Impara collaborazione, sicurezza, struttura e crescita.",
      supervisor: "Monitora preparazione, progresso e ambiente di lavoro.",
    },
    featureTitle: {
      guest: "Cosa scopre l’ospite",
      customer: "Percorso cliente",
      grower: "Strumenti del coltivatore",
      youth: "Percorso giovani",
      supervisor: "Dashboard supervisore",
    },
    featureBullets: {
      guest: [
        "Capire la visione della fattoria",
        "Vedere il legame tra cibo, apprendimento e eredità",
        "Esplorare l’ecosistema prima di scegliere",
      ],
      customer: [
        "Ingresso al mercato",
        "Supporto nutrizionale e ricette",
        "Abitudini di acquisto e scelte salutari",
      ],
      grower: [
        "Pianificazione colture",
        "Preparazione stagionale",
        "Coordinamento post-raccolta",
      ],
      youth: [
        "Sicurezza e collaborazione",
        "Preparazione al lavoro",
        "Crescita e responsabilità",
      ],
      supervisor: [
        "Osservazione e supporto",
        "Monitoraggio del progresso",
        "Preparazione quotidiana e struttura",
      ],
    },
  },
  he: {
    title: "Bronson Family Farm",
    subtitle: "המערכת של Bronson Family Farm ו־Farm & Family Alliance",
    intro:
      "מערכת חקלאית חיה המחברת מגדלים, משפחות, נוער, למידה ומסחר קהילתי.",
    weather: "מזג אוויר",
    chooseRole: "בחר מסלול",
    quickView: "מבט מהיר",
    roleLabel: {
      guest: "אורח",
      customer: "לקוח",
      grower: "מגדל",
      youth: "נוער",
      supervisor: "מפקח",
    },
    roleText: {
      guest: "היכרות עם המערכת והקהילה.",
      customer: "גישה לשוק, תזונה, מתכונים ומסלול הלקוח.",
      grower: "ניהול גידולים, מזג אוויר, תכנון ותיאום קציר.",
      youth: "למידת עבודת צוות, בטיחות, מבנה וצמיחה.",
      supervisor: "מעקב אחר מוכנות, התקדמות וסביבת העבודה.",
    },
    featureTitle: {
      guest: "מה האורח מגלה",
      customer: "מסלול הלקוח",
      grower: "כלי המגדל",
      youth: "מסלול נוער",
      supervisor: "לוח בקרה למפקח",
    },
    featureBullets: {
      guest: [
        "להבין את חזון החווה",
        "לראות את הקשר בין מזון, למידה ומורשת",
        "לחקור את המערכת לפני בחירה",
      ],
      customer: [
        "כניסה לשוק",
        "תמיכה בתזונה ובמתכונים",
        "הרגלי קנייה ובחירות בריאות",
      ],
      grower: [
        "תכנון גידולים",
        "מוכנות עונתית",
        "תיאום לאחר הקציר",
      ],
      youth: [
        "בטיחות ועבודת צוות",
        "מוכנות לעולם העבודה",
        "צמיחה ואחריות",
      ],
      supervisor: [
        "תצפית ותמיכה",
        "מעקב אחר התקדמות",
        "מוכנות יומית ומבנה",
      ],
    },
  },
  patwa: {
    title: "Bronson Family Farm",
    subtitle: "Bronson Family Farm & Farm & Family Alliance Ecosystem",
    intro:
      "A live farm ecosystem weh connect growers, family, youth, learning, an community business.",
    weather: "Weather",
    chooseRole: "Pick a pathway",
    quickView: "Quick view",
    roleLabel: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      youth: "Youth",
      supervisor: "Supervisor",
    },
    roleText: {
      guest: "Introduction to di ecosystem an community.",
      customer: "Explore marketplace access, nutrition, recipes, an customer pathway.",
      grower: "Manage crops, weather, planning, an harvest coordination.",
      youth: "Learn teamwork, safety, structure, an growth.",
      supervisor: "Track readiness, support progress, an guide di work environment.",
    },
    featureTitle: {
      guest: "Wah guests see",
      customer: "Customer journey",
      grower: "Grower tools",
      youth: "Youth workforce path",
      supervisor: "Supervisor dashboard",
    },
    featureBullets: {
      guest: [
        "Understand di farm vision",
        "See how food, learning, an legacy connect",
        "Explore di ecosystem before yuh choose",
      ],
      customer: [
        "Marketplace entry",
        "Nutrition an recipe support",
        "Buying habits an healthy choices",
      ],
      grower: [
        "Crop planning",
        "Season readiness",
        "Post-harvest coordination",
      ],
      youth: [
        "Safety an teamwork",
        "Workforce readiness",
        "Growth an responsibility",
      ],
      supervisor: [
        "Observation an support",
        "Progress tracking",
        "Daily readiness an structure",
      ],
    },
  },
} as const

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [lang, setLang] = useState<LangKey>("en")
  const [temp, setTemp] = useState<number | null>(null)

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

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background: "#f3efe7",
        color: "#1f2a1f",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "24px 28px 40px",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <h1
            style={{
              fontSize: 56,
              lineHeight: 1,
              margin: "0 0 8px 0",
              fontWeight: 800,
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 20,
              color: "#4d5b4f",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#2d4632",
            }}
          >
            {t.chooseRole}
          </div>

          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: "12px 18px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: role === r ? "#2f6b49" : "#d8d8d8",
                color: role === r ? "#ffffff" : "#1c261d",
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {t.roleLabel[r]}
            </button>
          ))}

          <div style={{ marginLeft: isRTL ? 0 : "auto", marginRight: isRTL ? "auto" : 0 }}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangKey)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #c8c8c8",
                background: "#ffffff",
                fontSize: 18,
              }}
            >
              {languageOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 420,
            overflow: "hidden",
            borderRadius: 18,
            marginBottom: 24,
            background: "#d9dfd7",
          }}
        >
          <img
            src={imageMap[role]}
            alt={t.roleLabel[role]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 22,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#55715c",
                marginBottom: 8,
              }}
            >
              {t.quickView}
            </div>

            <h2
              style={{
                fontSize: 42,
                margin: "0 0 16px 0",
                fontWeight: 800,
              }}
            >
              {t.roleLabel[role]}
            </h2>

            <p
              style={{
                fontSize: 24,
                lineHeight: 1.45,
                margin: "0 0 20px 0",
              }}
            >
              {t.intro}
            </p>

            <p
              style={{
                fontSize: 22,
                lineHeight: 1.5,
                margin: 0,
                color: "#2f3d30",
              }}
            >
              {t.roleText[role]}
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 18,
              padding: 24,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              style={{
                fontSize: 30,
                margin: "0 0 18px 0",
                fontWeight: 800,
              }}
            >
              {t.featureTitle[role]}
            </h3>

            <ul
              style={{
                margin: "0 0 24px 22px",
                padding: 0,
                fontSize: 21,
                lineHeight: 1.7,
              }}
            >
              {t.featureBullets[role].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div
              style={{
                background: "#eef4ee",
                borderRadius: 14,
                padding: 18,
                fontSize: 22,
                fontWeight: 700,
                color: "#24452d",
              }}
            >
              {t.weather}: {temp === null ? "Loading..." : `${temp}°`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
