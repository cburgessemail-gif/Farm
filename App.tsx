import { useState } from "react";

type Language = "English" | "Spanish" | "Italian" | "Patwa" | "Hebrew";

const copy = {
  English: {
    headline: "Growing food, purpose, and possibility from the ground up.",
    description:
      "This live platform introduces a land-based ecosystem designed to strengthen food access, train youth, support growers, and activate community participation.",
    start: "Start the Farm Experience",
    partner: "Partner With the Mission",
  },
  Spanish: {
    headline:
      "Cultivando alimentos, propósito y posibilidades desde la tierra.",
    description:
      "Esta plataforma fortalece el acceso a alimentos y la comunidad.",
    start: "Comenzar la Experiencia",
    partner: "Apoyar la Misión",
  },
  Italian: {
    headline:
      "Coltivare cibo, scopo e possibilità dalla terra.",
    description:
      "Questa piattaforma crea un ecosistema per il futuro.",
    start: "Inizia l'Esperienza",
    partner: "Sostieni la Missione",
  },
  Patwa: {
    headline:
      "Wi a grow food, purpose, an possibility fram di groun up.",
    description:
      "Dis platform a build community an opportunity.",
    start: "Start di Experience",
    partner: "Support di Mission",
  },
  Hebrew: {
    headline:
      "מגדלים מזון, מטרה ואפשרויות מהיסוד.",
    description:
      "פלטפורמה זו מחזקת גישה למזון וקהילה.",
    start: "התחל את החוויה",
    partner: "תמוך במשימה",
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>("English");

  const t = copy[language];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* TOP BAR */}
      <div
        style={{
          background: "#1f4f2c",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        🌱 Live Demo: Building a community-centered future
      </div>

      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          background: "#f6f8f2",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Farm & Family Alliance</h2>
        </div>

        {/* LANGUAGE SELECTOR (VISIBLE) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Language:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            style={{
              padding: "8px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "2px solid #1f4f2c",
            }}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>Italian</option>
            <option>Patwa</option>
            <option>Hebrew</option>
          </select>
        </div>
      </header>

      {/* HERO */}
      <main
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", color: "#1f4f2c" }}>
          {t.headline}
        </h1>

        <p style={{ maxWidth: "700px", margin: "20px auto" }}>
          {t.description}
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            style={{
              padding: "12px 20px",
              marginRight: "10px",
              background: "#2f6a4d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {t.start}
          </button>

          <button
            style={{
              padding: "12px 20px",
              background: "#e0e6e0",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {t.partner}
          </button>
        </div>
      </main>
    </div>
  );
}
