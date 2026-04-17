import { useEffect, useState } from "react"

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

const languages = {
  en: {
    name: "English",
    voice: "en-US",
    nav: {
      marketplace: "Marketplace",
      recipes: "Recipes",
      nutrition: "Nutrition",
      history: "Buying History",
    },
    intro: "Welcome to Bronson Family Farm. Let's explore your experience.",
  },
  es: {
    name: "Español",
    voice: "es-ES",
    nav: {
      marketplace: "Mercado",
      recipes: "Recetas",
      nutrition: "Nutrición",
      history: "Historial",
    },
    intro: "Bienvenido. Exploremos su experiencia.",
  },
  tl: {
    name: "Tagalog",
    voice: "tl-PH",
    nav: {
      marketplace: "Pamilihan",
      recipes: "Mga Recipe",
      nutrition: "Nutrisyon",
      history: "Kasaysayan",
    },
    intro: "Maligayang pagdating. Tuklasin natin.",
  },
  it: {
    name: "Italiano",
    voice: "it-IT",
    nav: {
      marketplace: "Mercato",
      recipes: "Ricette",
      nutrition: "Nutrizione",
      history: "Storico",
    },
    intro: "Benvenuto. Esploriamo.",
  },
  he: {
    name: "Hebrew",
    voice: "he-IL",
    nav: {
      marketplace: "שוק",
      recipes: "מתכונים",
      nutrition: "תזונה",
      history: "היסטוריה",
    },
    intro: "ברוכים הבאים. בואו נחקור.",
  },
  patwa: {
    name: "Patwa",
    voice: "en-JM",
    nav: {
      marketplace: "Marketplace",
      recipes: "Recipe Dem",
      nutrition: "Nutrition",
      history: "Wah Yuh Buy",
    },
    intro: "Welcome. Mek we explore di system.",
  },
}

const products = [
  { name: "Collards", benefit: "Supports heart health & fiber intake" },
  { name: "Tomatoes", benefit: "Rich in antioxidants and vitamin C" },
  { name: "Spinach", benefit: "Iron and brain health support" },
  { name: "Peppers", benefit: "Boost immune system" },
]

const recipes = [
  { title: "Fresh Greens Bowl", desc: "Collards + peppers + light seasoning" },
  { title: "Tomato Salad", desc: "Tomatoes + herbs + olive oil" },
]

export default function App() {
  const [role, setRole] = useState<Role>("guest")
  const [lang, setLang] = useState<LangKey>("en")
  const [view, setView] = useState("home")
  const [weather, setWeather] = useState("Loading...")

  // 🌤 Weather
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`)
        .then(r => r.json())
        .then(d => setWeather(`${d.current_weather.temperature}°`))
    })
  }, [])

  // 🔊 Voice intro
  useEffect(() => {
    const utter = new SpeechSynthesisUtterance(languages[lang].intro)
    utter.lang = languages[lang].voice
    speechSynthesis.cancel()
    speechSynthesis.speak(utter)
  }, [lang])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black text-white">

      {/* HEADER */}
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-light">Bronson Family Farm</h1>

        <div className="flex gap-2">
          <select
            onChange={(e) => setLang(e.target.value as LangKey)}
            className="text-black px-2"
          >
            {Object.entries(languages).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ROLE NAV */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {roles.map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className="bg-white/20 px-3 py-2 rounded capitalize"
          >
            {r}
          </button>
        ))}
      </div>

      {/* CUSTOMER EXPERIENCE */}
      {role === "customer" && (
        <div className="px-6">

          {/* NAV */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <button onClick={() => setView("market")} className="bg-yellow-500 px-3 py-2 rounded text-black">
              {languages[lang].nav.marketplace}
            </button>
            <button onClick={() => setView("recipes")} className="bg-white/20 px-3 py-2 rounded">
              {languages[lang].nav.recipes}
            </button>
            <button onClick={() => setView("nutrition")} className="bg-white/20 px-3 py-2 rounded">
              {languages[lang].nav.nutrition}
            </button>
          </div>

          {/* MARKETPLACE */}
          {view === "market" && (
            <div>
              <h2 className="text-2xl mb-4">Fresh Products</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.name} className="bg-white/10 p-4 rounded">
                    <h3 className="text-xl">{p.name}</h3>
                    <p className="text-sm">{p.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECIPES */}
          {view === "recipes" && (
            <div>
              <h2 className="text-2xl mb-4">Recipes</h2>
              {recipes.map(r => (
                <div key={r.title} className="bg-white/10 p-4 rounded mb-3">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* NUTRITION */}
          {view === "nutrition" && (
            <div>
              <h2 className="text-2xl mb-4">Nutrition Education</h2>
              <p className="mb-3">
                Fresh foods improve energy, reduce disease risk, and support long-term health.
              </p>
              <p>
                Processed foods often contain excess sugar, sodium, and preservatives.
              </p>
            </div>
          )}
        </div>
      )}

      {/* WEATHER */}
      <div className="text-center mt-10 text-sm">
        🌤 Weather: {weather}
      </div>

    </div>
  )
}
