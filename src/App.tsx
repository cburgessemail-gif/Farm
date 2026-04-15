import React, { useState } from "react";

type Lang = "en" | "es" | "tl";
type SectionId = "grow" | "shop" | "story" | "workforce" | "community" | "events";

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle:
      "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    intro:
      "Bronson Family Farm is more than a farm. It is a community-centered ecosystem connecting fresh food, workforce development, health, education, and long-term renewal.",
    enter: "Enter the Ecosystem",
    ecosystem: "Farm Ecosystem",
    explore: "Explore first. Activate a role when ready.",
    activateRole: "Activate My Role",
    back: "← Back to Ecosystem",
    open: "Open",
    enterSection: "Enter section",
  },
  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia, la tierra y el aprendizaje.",
    intro:
      "Bronson Family Farm es más que una granja. Es un ecosistema comunitario.",
    enter: "Entrar al Ecosistema",
    ecosystem: "Ecosistema de la Granja",
    explore: "Explore primero.",
    activateRole: "Activar rol",
    back: "← Regresar",
    open: "Abrir",
    enterSection: "Entrar",
  },
  tl: {
    title: "Bronson Family Farm",
    subtitle: "Isang buhay na ecosystem.",
    intro: "Higit pa sa isang bukid.",
    enter: "Pumasok",
    ecosystem: "Ecosystem",
    explore: "Mag-explore muna.",
    activateRole: "Piliin ang Role",
    back: "← Bumalik",
    open: "Buksan",
    enterSection: "Buksan",
  },
};

const sectionData = {
  grow: { icon: "🌱", title: "Grow", desc: "Crop planning and production." },
  shop: { icon: "🛒", title: "Shop", desc: "Buy farm goods." },
  story: { icon: "📖", title: "Story", desc: "Farm history and purpose." },
  workforce: { icon: "👩🏽‍🌾", title: "Workforce", desc: "Youth programs." },
  community: { icon: "🤝", title: "Community", desc: "Volunteers and partners." },
  events: { icon: "📅", title: "Events", desc: "Markets and gatherings." },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<SectionId | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState("Welcome to the ecosystem.");

  const ui = labels[lang];

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h4>BRONSON FAMILY FARM DEMO</h4>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="tl">Tagalog</option>
          </select>

          <h1>{ui.title}</h1>
          <p>{ui.subtitle}</p>
          <p>{ui.intro}</p>

          <button style={styles.button} onClick={() => setEntered(true)}>
            {ui.enter}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      {/* MAIN */}
      <div style={styles.main}>
        {section && (
          <button style={styles.back} onClick={() => setSection(null)}>
            {ui.back}
          </button>
        )}

        <h2>{ui.ecosystem}</h2>
        <p>{ui.explore}</p>

        <div style={styles.status}>{status}</div>

        {/* CARDS */}
        {!section && (
          <div style={styles.grid}>
            {(Object.keys(sectionData) as SectionId[]).map((id) => {
              const item = sectionData[id];
              return (
                <div
                  key={id}
                  style={styles.cardItem}
                  onClick={() => {
                    if (id === "shop") {
                      window.open(
                        "https://grownby.com/farms/bronson-family-farm/shop",
                        "_blank"
                      );
                    } else {
                      setSection(id);
                      setStatus(`${item.title} opened.`);
                    }
                  }}
                >
                  <div style={styles.icon}>{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* SECTION CONTENT */}
        {section && (
          <div style={styles.content}>
            <h3>{sectionData[section].title}</h3>
            <p>This is the {section} section of the ecosystem.</p>
          </div>
        )}
      </div>

      {/* TOOLBOX PANEL */}
      <div style={styles.sidebar}>
        <h4>Role Actions</h4>
        <p style={{ fontSize: 14 }}>
          The center shows where to go. This panel shows what you can do.
        </p>

        <button onClick={() => setRole("Grower Tools")}>Grower Tools</button>
        <button onClick={() => setRole("Sales Tools")}>Sales Tools</button>
        <button onClick={() => setRole("Volunteer Tools")}>Volunteer Tools</button>
        <button onClick={() => setRole("Youth Tools")}>Youth Tools</button>

        {role && (
          <div style={{ marginTop: 20 }}>
            <strong>Active toolbox:</strong> {role}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#eaf5ee",
  },
  card: {
    background: "white",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#2f6b3c",
    color: "white",
    border: "none",
  },
  layout: {
    display: "flex",
    minHeight: "100vh",
  },
  main: {
    flex: 3,
    padding: 30,
  },
  sidebar: {
    flex: 1,
    background: "#eef4ef",
    padding: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
  },
  cardItem: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    cursor: "pointer",
  },
  icon: {
    fontSize: 24,
  },
  content: {
    marginTop: 20,
    background: "white",
    padding: 20,
  },
  back: {
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    color: "#2f6b3c",
    fontWeight: "bold",
  },
  select: {
    marginBottom: 10,
  },
};
