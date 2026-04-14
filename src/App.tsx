import { useState } from "react";

type Language = "English" | "Spanish" | "Italian" | "Patwa" | "Hebrew";

const text = {
  English: "Growing food, purpose, and possibility from the ground up.",
  Spanish: "Cultivando alimentos, propósito y posibilidades desde la tierra.",
  Italian: "Coltivare cibo, scopo e possibilità dalla terra.",
  Patwa: "Wi a grow food, purpose, an possibility fram di ground up.",
  Hebrew: "מגדלים מזון, מטרה ואפשרויות מהיסוד.",
};

export default function App() {
  const [language, setLanguage] = useState<Language>("English");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f7f7f7" }}>
      <div
        style={{
          background: "red",
          color: "white",
          fontWeight: "bold",
          fontSize: "28px",
          padding: "18px",
          textAlign: "center",
        }}
      >
        TEST - NEW APP IS LOADING
      </div>

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9999,
          background: "white",
          border: "3px solid black",
          padding: "12px",
          borderRadius: "10px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Language</div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={{ fontSize: "18px", padding: "8px" }}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>Italian</option>
          <option>Patwa</option>
          <option>Hebrew</option>
        </select>
      </div>

      <div style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "52px" }}>{text[language]}</h1>
      </div>
    </div>
  );
}
