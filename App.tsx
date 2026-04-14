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
    headline: "Cultivando alimentos, propósito y posibilidades desde la tierra.",
    description:
      "Esta plataforma introduce un ecosistema basado en la tierra para fortalecer el acceso a alimentos y la comunidad.",
    start: "Comenzar la Experiencia",
    partner: "Apoyar la Misión",
  },
  Italian: {
    headline: "Coltivare cibo, scopo e possibilità dalla terra.",
    description:
      "Questa piattaforma crea un ecosistema per nutrire comunità e futuro.",
    start: "Inizia l'Esperienza",
    partner: "Sostieni la Missione",
  },
  Patwa: {
    headline: "Wi a grow food, purpose, an possibility fram di ground up.",
    description:
      "Dis platform a build fi help di community grow strong an healthy.",
    start: "Start di Experience",
    partner: "Support di Mission",
  },
  Hebrew: {
    headline: "מגדלים מזון, משמעות ואפשרויות מהאדמה.",
    description:
      "פלטפורמה זו יוצרת מערכת אקולוגית לחיזוק הקהילה והעתיד.",
    start: "התחל את החוויה",
    partner: "תמוך במשימה",
  },
};

export default function App() {
  const [language, setLanguage] = useState("English");
  const t = translations[language];

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      
      {/* LANGUAGE SELECTOR */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        >
          {Object.keys(translations).map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* HEADLINE */}
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        {t.headline}
      </h1>

      {/* DESCRIPTION */}
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        {t.description}
      </p>

      {/* BUTTONS */}
      <div style={{ marginTop: "30px" }}>
        <button style={{ marginRight: "10px", padding: "10px 20px" }}>
          {t.start}
        </button>

        <button style={{ padding: "10px 20px" }}>
          {t.partner}
        </button>
      </div>
    </div>
  );
}
