import { useEffect, useState } from "react"

const roles = ["guest", "customer", "grower", "youth", "supervisor"] as const
type Role = (typeof roles)[number]
type LangKey = "en" | "es" | "tl" | "it" | "he" | "patwa"

const images: Record<Role, string> = {
  guest: "/SAM_0220.JPG",
  customer: "/GrowArea2.jpg",
  grower: "/SAM_0221.JPG",
  youth: "/SAM_0223.JPG",
  supervisor: "/SAM_0225.JPG",
}

const languages = {
  en: {
    name: "English",
    intro: "Welcome to Bronson Family Farm. Let’s explore your experience.",
    roleTitle: {
      guest: "Guest",
      customer: "Customer",
      grower: "Grower",
      youth: "Youth",
      supervisor: "Supervisor",
    },
    roleText: {
      guest: "Introduction to the ecosystem and community.",
      customer: "Access marketplace, recipes, and nutrition.",
      grower: "Plan crops, monitor weather, manage harvest.",
      youth: "Learn teamwork, safety, and growth.",
      supervisor: "Track progress and support the system.",
    },
    weather: "Weather",
    changeLanguage: "Language",
  },
} as const

function App() {
  const [role, setRole] = useState<Role>("guest")
  const [weather, setWeather] = useState<any>({ loading: true })

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=41.0998&longitude=-80.6495&current=temperature_2m"
    )
      .then((res) => res.json())
      .then((data) =>
        setWeather({
          temp: data.current.temperature_2m,
          loading: false,
        })
      )
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Bronson Family Farm</h1>

      <div>
        {roles.map((r) => (
          <button key={r} onClick={() => setRole(r)}>
            {r}
          </button>
        ))}
      </div>

      <div>
        <img src={images[role]} style={{ width: "100%", maxHeight: 400 }} />
      </div>

      <h2>{role}</h2>
      <p>{languages.en.roleText[role]}</p>

      <div>
        {weather.loading
          ? "Loading weather..."
          : `Temperature: ${weather.temp}°`}
      </div>
    </div>
  )
}

export default App
