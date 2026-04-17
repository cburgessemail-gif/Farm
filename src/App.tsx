import { useEffect, useState } from "react"

const images = {
  guest: "/guest.jpg",
  customer: "/market.jpg",
  grower: "/grow.jpg",
  youth: "/youth.jpg",
  supervisor: "/supervisor.jpg",
}

const languages = {
  en: {
    name: "English",
    voice: "en-US",
    text: {
      guest: "Welcome to Bronson Family Farm. This is where your journey begins.",
      customer:
        "As a customer, you can explore the marketplace, track buying habits, access recipes, and receive food and nutrition education that supports healthier choices for you and your family.",
      grower: "Growers manage crops, plan seasons, and contribute to the food system.",
      youth: "Youth workforce participants learn responsibility, agriculture, and life skills.",
      supervisor: "Supervisors guide, evaluate, and support workforce development.",
    },
    labels: {
      marketplace: "Enter Marketplace",
      history: "Buying History",
      recipes: "Recipes",
      nutrition: "Nutrition Education",
      guidance: "Food Guidance",
      weather: "Current Weather",
      startTour: "Start Guided Tour",
      stopTour: "Stop Tour",
    },
  },
  es: {
    name: "Español",
    voice: "es-ES",
    text: {
      guest: "Bienvenido a Bronson Family Farm. Aquí comienza su viaje.",
      customer:
        "Como cliente, puede explorar el mercado, seguir sus compras, acceder a recetas y recibir educación nutricional para apoyar opciones más saludables.",
      grower: "Los agricultores gestionan cultivos y temporadas.",
      youth: "Los jóvenes aprenden habilidades de vida y agricultura.",
      supervisor: "Los supervisores guían y apoyan el desarrollo.",
    },
    labels: {
      marketplace: "Entrar al Mercado",
      history: "Historial de Compras",
      recipes: "Recetas",
      nutrition: "Educación Nutricional",
      guidance: "Guía de Alimentos",
      weather: "Clima Actual",
      startTour: "Iniciar Recorrido",
      stopTour: "Detener Recorrido",
    },
  },
  tl: {
    name: "Tagalog",
    voice: "tl-PH",
    text: {
      guest: "Maligayang pagdating sa Bronson Family Farm.",
      customer:
        "Bilang customer, maaari kang mamili, tingnan ang buying history, kumuha ng recipes, at matuto tungkol sa nutrition at mas masustansiyang pagkain.",
      grower: "Pinamamahalaan ang pananim at ani.",
      youth: "Natuto ang kabataan ng kasanayan sa buhay.",
      supervisor: "Gumagabay ang mga supervisor.",
    },
    labels: {
      marketplace: "Pumasok sa Marketplace",
      history: "Kasaysayan ng Binili",
      recipes: "Mga Recipe",
      nutrition: "Edukasyon sa Nutrisyon",
      guidance: "Gabay sa Pagkain",
      weather: "Kasalukuyang Panahon",
      startTour: "Simulan ang Guided Tour",
      stopTour: "Itigil ang Tour",
    },
  },
  it: {
    name: "Italiano",
    voice: "it-IT",
    text: {
      guest: "Benvenuti alla Bronson Family Farm.",
      customer:
        "Come cliente, puoi esplorare il mercato, monitorare gli acquisti, accedere a ricette e ricevere educazione alimentare e nutrizionale.",
      grower: "Gestisci colture e stagioni.",
      youth: "I giovani imparano competenze importanti.",
      supervisor: "I supervisori guidano il progresso.",
    },
    labels: {
      marketplace: "Entra nel Mercato",
      history: "Cronologia Acquisti",
      recipes: "Ricette",
      nutrition: "Educazione Nutrizionale",
      guidance: "Guida Alimentare",
      weather: "Meteo Attuale",
      startTour: "Avvia Tour Guidato",
      stopTour: "Ferma Tour",
    },
  },
  he: {
    name: "Hebrew",
    voice: "he-IL",
    text: {
      guest: "ברוכים הבאים לחוות ברונסון.",
      customer:
        "כלקוח, ניתן להיכנס לשוק, לעקוב אחר קניות, לקבל מתכונים וללמוד על תזונה ומזון בריא יותר.",
      grower: "חקלאים מנהלים גידולים.",
      youth: "צעירים לומדים כישורי חיים.",
      supervisor: "מפקחים תומכים ומדריכים.",
    },
    labels: {
      marketplace: "כניסה לשוק",
      history: "היסטוריית קניות",
      recipes: "מתכונים",
      nutrition: "חינוך תזונתי",
      guidance: "הדרכת מזון",
      weather: "מזג אוויר נוכחי",
      startTour: "התחל סיור מודרך",
      stopTour: "עצור סיור",
    },
  },
  patwa: {
    name: "Patwa",
    voice: "en-JM",
    text: {
      guest: "Welcome to di farm, yuh journey start yah.",
      customer:
        "As a customer, yuh can shop di marketplace, check wah yuh buy before, get recipe ideas, and learn bout better food an nutrition fi yuh family.",
      grower: "Grower dem a plant an build di system.",
      youth: "Di youth learn life skill an farming.",
      supervisor: "Supervisor guide an support di team.",
    },
    labels: {
      marketplace: "Go A Di Marketplace",
      history: "Wah Yuh Buy Before",
      recipes: "Recipe Dem",
      nutrition: "Food Nutrition",
      guidance: "Food Guidance",
      weather: "Weather Right Now",
      startTour: "Start Guided Tour",
      stopTour: "Stop Tour",
    },
  },
}

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]
type LangKey = keyof typeof languages

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [lang, setLang] = useState<LangKey>("en")
  const [auto, setAuto] = useState(false)
  const [weather, setWeather] = useState("Loading weather...")

  const role: Role = roles[roleIndex]
  const currentLang = languages[lang]

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeather("Weather unavailable")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`
        )
          .then((r) => r.json())
          .then((d) => {
            if (d?.current_weather?.temperature !== undefined) {
              setWeather(`${d.current_weather.temperature}°`)
            } else {
              setWeather("Weather unavailable")
            }
          })
          .catch(() => setWeather("Weather unavailable"))
      },
      () => setWeather("Weather unavailable")
    )
  }, [])

  useEffect(() => {
    const text = currentLang.text[role]
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = currentLang.voice
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)

    return () => speechSynthesis.cancel()
  }, [role, lang])

  useEffect(() => {
    if (!auto) return
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [auto])

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      <img
        src={images[role]}
        alt={role}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex items-center justify-between p-4">
        <h1 className="text-2xl font-light tracking-wide">Bronson Family Farm</h1>

        <div className="flex gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LangKey)}
            className="rounded bg-white px-2 py-1 text-black"
          >
            {Object.entries(languages).map(([key, value]) => (
              <option key={key} value={key}>
                {value.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setAuto(!auto)}
            className="rounded bg-green-600 px-4 py-2 text-sm font-medium"
          >
            {auto ? currentLang.labels.stopTour : currentLang.labels.startTour}
          </button>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
        <h2 className="mb-4 text-4xl font-light capitalize">{role}</h2>

        <p className="max-w-3xl text-lg font-light leading-8">
          {currentLang.text[role]}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {roles.map((r, i) => (
            <button
              key={r}
              onClick={() => setRoleIndex(i)}
              className={`rounded px-4 py-2 capitalize transition ${
                role === r ? "bg-green-600" : "bg-white/20 hover:bg-white/30"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {role === "customer" && (
          <div className="mt-8 w-full max-w-6xl">
            <button className="mb-6 rounded bg-yellow-400 px-6 py-3 text-base font-semibold text-black shadow-lg">
              {currentLang.labels.marketplace}
            </button>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white/15 p-5 text-left backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">
                  {currentLang.labels.history}
                </h3>
                <p className="text-sm leading-6 text-white/90">
                  Track what customers buy most often, support repeat purchasing,
                  and help families build healthier habits over time.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-5 text-left backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">
                  {currentLang.labels.recipes}
                </h3>
                <p className="text-sm leading-6 text-white/90">
                  Offer simple recipes using fresh farm products like greens,
                  tomatoes, peppers, herbs, cabbage, and other seasonal foods.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-5 text-left backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">
                  {currentLang.labels.nutrition}
                </h3>
                <p className="text-sm leading-6 text-white/90">
                  Teach the value of whole foods, fresh vegetables, fiber,
                  hydration, and balanced meals compared to heavily processed food.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 p-5 text-left backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-medium">
                  {currentLang.labels.guidance}
                </h3>
                <p className="text-sm leading-6 text-white/90">
                  Help families understand shopping choices, portion awareness,
                  diabetes-friendly eating, and everyday nutrition for work,
                  play, and home.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm font-light text-white/85">
          🌤 {currentLang.labels.weather}: {weather}
        </div>
      </div>
    </div>
  )
}
