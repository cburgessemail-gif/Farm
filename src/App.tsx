import React, { useState } from "react";

const languages = ["English", "Spanish", "Tagalog", "Patwa", "Italian", "Hebrew"];

export default function App() {
  const [lang, setLang] = useState("English");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#0f2f1b, #1f5a36)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Bronson Family Farm
      </h1>
      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
        Grower Ecosystem Demo
      </h2>

      <div style={{ marginBottom: "20px" }}>
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              marginRight: "8px",
              marginBottom: "8px",
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid white",
              background: lang === l ? "#d7ff73" : "transparent",
              color: lang === l ? "#173116" : "white",
              cursor: "pointer"
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        A welcoming, visual, role-based farm platform built for community use.
      </p>

      <p style={{ maxWidth: "800px", lineHeight: "1.6" }}>
        This demo shows how Bronson Family Farm, Farm & Family Alliance,
        Parker Farms, and the historic Lansdowne Airport site work together
        as one connected ecosystem.
      </p>

      <button
        style={{
          marginTop: "30px",
          padding: "12px 18px",
          borderRadius: "25px",
          background: "#d7ff73",
          color: "#173116",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Enter Live Demo →
      </button>

      <div style={{ marginTop: "40px" }}>
        <h3>Current Language:</h3>
        <strong>{lang}</strong>
      </div>
    </div>
  );
}
