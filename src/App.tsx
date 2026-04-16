import { useState } from "react"

const images = {
  hero: "/hero.jpg",
  grow: "/grow.jpg",
  market: "/market.jpg",
  education: "/education.jpg",
  youth: "/youth.jpg",
  operations: "/operations.jpg",
  calendar: "/calendar.jpg",
  story: "/story.jpg"
}

const languages = {
  en: {
    start: "Enter Experience",
    grow: "Grow",
    market: "Market",
    education: "Education",
    youth: "Youth",
    operations: "Operations",
    calendar: "Calendar"
  },
  es: {
    start: "Entrar",
    grow: "Cultivar",
    market: "Mercado",
    education: "Educación",
    youth: "Juventud",
    operations: "Operaciones",
    calendar: "Calendario"
  },
  tl: {
    start: "Pumasok",
    grow: "Palaguin",
    market: "Pamilihan",
    education: "Edukasyon",
    youth: "Kabataan",
    operations: "Operasyon",
    calendar: "Kalendaryo"
  },
  it: {
    start: "Entra",
    grow: "Coltivare",
    market: "Mercato",
    education: "Educazione",
    youth: "Giovani",
    operations: "Operazioni",
    calendar: "Calendario"
  },
  patwa: {
    start: "Come In",
    grow: "Grow",
    market: "Market",
    education: "Learn",
    youth: "Youth",
    operations: "Work",
    calendar: "Time"
  },
  he: {
    start: "היכנס",
    grow: "גידול",
    market: "שוק",
    education: "חינוך",
    youth: "נוער",
    operations: "תפעול",
    calendar: "לוח זמנים"
  }
}

export default function App() {
  const [screen, setScreen] = useState("start")
  const [lang, setLang] = useState("en")

  const t = languages[lang]

  return (
    <div className="w-full h-screen text-white relative overflow-hidden font-sans">

      {/* BACKGROUND IMAGE */}
      <img
        src={images[screen === "start" ? "hero" : screen]}
        className="absolute w-full h-full object-cover opacity-40 transition-all duration-700"
      />

      {/* OVERLAY */}
      <div className="absolute w-full h-full bg-black/50" />

      {/* LANGUAGE SELECTOR */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        {Object.keys(languages).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded ${lang === l ? "bg-green-600" : "bg-white/20"}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* NAV */}
      {screen !== "start" && (
        <div className="absolute top-0 w-full flex justify-center gap-6 p-4 z-40 bg-black/40 backdrop-blur-md">
          <button onClick={() => setScreen("grow")}>{t.grow}</button>
          <button onClick={() => setScreen("market")}>{t.market}</button>
          <button onClick={() => setScreen("education")}>{t.education}</button>
          <button onClick={() => setScreen("youth")}>{t.youth}</button>
          <button onClick={() => setScreen("operations")}>{t.operations}</button>
          <button onClick={() => setScreen("calendar")}>{t.calendar}</button>
        </div>
      )}

      {/* START SCREEN */}
      {screen === "start" && (
        <div className="flex flex-col items-center justify-center h-full z-20 relative">
          <h1 className="text-5xl mb-6 font-bold">Bronson Family Farm</h1>
          <button
            onClick={() => setScreen("grow")}
            className="px-8 py-4 bg-green-600 rounded-xl text-xl hover:bg-green-700"
          >
            {t.start}
          </button>
        </div>
      )}

      {/* MODULES */}
      {screen !== "start" && (
        <div className="flex items-center justify-center h-full text-center px-6 z-20 relative">

          {screen === "grow" && (
            <div>
              <h2 className="text-4xl mb-4">{t.grow}</h2>
              <p>Crop planning, soil tracking, planting cycles, real-time grower insights.</p>
            </div>
          )}

          {screen === "market" && (
            <div>
              <h2 className="text-4xl mb-4">{t.market}</h2>
              <p>Buy produce, SNAP enabled checkout, multi-grower marketplace.</p>
            </div>
          )}

          {screen === "education" && (
            <div>
              <h2 className="text-4xl mb-4">{t.education}</h2>
              <p>Workshops, nutrition, food systems, growing knowledge.</p>
            </div>
          )}

          {screen === "youth" && (
            <div>
              <h2 className="text-4xl mb-4">{t.youth}</h2>
              <p>8-week workforce program, skills, growth, mentorship.</p>
            </div>
          )}

          {screen === "operations" && (
            <div>
              <h2 className="text-4xl mb-4">{t.operations}</h2>
              <p>Inventory, logistics, distribution, farm management system.</p>
            </div>
          )}

          {screen === "calendar" && (
            <div>
              <h2 className="text-4xl mb-4">{t.calendar}</h2>
              <p>Events, volunteer scheduling, planting timelines.</p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
