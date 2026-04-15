import React, { useState } from "react";

type Lang = "en" | "es";
type Section = "home" | "grow" | "shop" | "story" | "workforce" | "community" | "events";

/* ✅ IMAGE PATHS (from /public) */
const imagePaths: Record<string, string> = {
  hero: "/GrowArea.jpg",
  grow: "/GrowArea2.jpg",
  shop: "/GrowArea2.jpg",
  story: "/SAM_0220.JPG",
  workforce: "/SAM_0221.JPG",
  community: "/SAM_0221.JPG",
  events: "/SAM_0220.JPG",
};

/* ✅ TEXT */
const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle: "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    enter: "Enter the Ecosystem",
    back: "← Back",
    sections: {
      grow: "Grow",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
    },
  },
  es: {
    title: "Bronson Family Farm",
    subtitle: "Un ecosistema vivo con raíces en la comida, la familia y la tierra.",
    enter: "Entrar al Ecosistema",
    back: "← Volver",
    sections: {
      grow: "Cultivar",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
    },
  },
};

export default function App() {
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<Section>("home");
  const [lang, setLang] = useState<Lang>("en");

  const t = labels[lang];

  /* LANDING */
  if (!entered) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>

          <img src={imagePaths.hero} style={styles.hero} />

          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>

          <button onClick={() => setEntered(true)}>{t.enter}</button>
        </div>
      </div>
    );
  }

  /* HOME GRID */
  if (section === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.grid}>
          {Object.entries(t.sections).map(([key, label]) => (
            <div key={key} style={styles.tile} onClick={() => setSection(key as Section)}>
              <img src={imagePaths[key]} style={styles.image} />
              <h3>{label}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* SECTION VIEW */
  return (
    <div style={styles.page}>
      <button onClick={() => setSection("home")}>{t.back}</button>

      <h2>{t.sections[section]}</h2>

      <img src={imagePaths[section]} style={styles.sectionImage} />

      <p style={{ maxWidth: 600 }}>
        This section represents the {section} part of the Bronson Family Farm ecosystem.
        This is where the real experience, partnerships, and opportunities come to life.
      </p>
    </div>
  );
}

/* ✅ SIMPLE STYLES */
const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#eef3ef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontFamily: "Arial",
  },
  card: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    textAlign: "center",
    width: 500,
  },
  hero: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 200px)",
    gap: 20,
  },
  tile: {
    background: "white",
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
  },
  sectionImage: {
    width: 400,
    height: 250,
    objectFit: "cover",
    borderRadius: 10,
    margin: "20px 0",
  },
};
