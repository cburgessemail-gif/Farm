import { useState } from "react";

const translations: any = {
  English: {
    headline: "Growing food, purpose, and possibility from the ground up.",
    description:
      "This live platform introduces a land-based ecosystem designed to strengthen food access, train youth, support growers, activate community participation, and create a regenerative future rooted in Youngstown.",
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
      "Questa piattaforma rafforza l’accesso al cibo e la comunità.",
    start: "Inizia l'Esperienza",
    partner: "Sostieni la Missione",
  },
  Patwa: {
    headline:
      "Wi a grow food, purpose, an possibility fram di ground up.",
    description:
      "Dis platform a strengthen food access an di community.",
    start: "Start di Experience",
    partner: "Support di Mission",
  },
  Hebrew: {
    headline:
      "מגדלים מזון, מטרה ואפשרויות מהיסוד.",
    description:
      "הפלטפורמה הזו מחזקת גישה למזון ואת הקהילה.",
    start: "התחל את החוויה",
    partner: "תמוך במשימה",
  },
};

export default function App() {
  const [language, setLanguage] = useState("English");
  const t = translations[language];

  return (
    <div style={{ fontFamily: "Arial", padding: "40px" }}>
      
      {/* LANGUAGE DROPDOWN */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>Italian</option>
          <option>Patwa</option>
          <option>Hebrew</option>
        </select>
      </div>

      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        {t.headline}
      </h1>

      <p style={{ marginTop: "20px", maxWidth: "700px" }}>
        {t.description}
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          style={{
            padding: "12px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        >
          {t.start}
        </button>

        <button
          style={{
            padding: "12px 20px",
            borderRadius: "6px",
          }}
        >
          {t.partner}
        </button>
      </div>
    </div>
  );
}
