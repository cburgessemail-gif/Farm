import { useState } from "react";

type Language = "English" | "Spanish" | "Italian" | "Patwa" | "Hebrew";

const copy = {
  English: {
    headline: "Growing food, purpose, and possibility from the ground up.",
  },
  Spanish: {
    headline: "Cultivando alimentos, propósito y posibilidades desde la tierra.",
  },
  Italian: {
    headline: "Coltivare cibo, scopo e possibilità dalla terra.",
  },
  Patwa: {
    headline: "Wi a grow food, purpose, an possibility fram di groun up.",
  },
  Hebrew: {
    headline: "מגדלים מזון, מטרה ואפשרויות מהיסוד.",
  },
};

export default function App() {
  const [language, setLanguage] = useState<Language>("English");

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* 🔥 FIXED LANGUAGE SELECTOR (ALWAYS VISIBLE) */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          background: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <strong>Language:</strong>
        <br />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{
            marginTop: "5px",
            padding: "8px",
            fontSize: "16px",
            borderRadius: "6px",
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

      {/* TOP BAR */}
      <div
        style={{
          background: "#1f4f2c",
          color: "white",
          padding: "10px",
          textAlign: "center",
        }}
      >
        🌱 Live Demo: Building a community-centered future
      </div>

      {/* HERO */}
      <main
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "42px", color: "#1f4f2c" }}>
          {copy[language].headline}
        </h1>
      </main>

    </div>
  );
}
