import { useState } from "react";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [section, setSection] = useState("home");
  const [lang, setLang] = useState("en");

  const t = {
    en: {
      enter: "Enter the Ecosystem",
      title: "Bronson Family Farm",
      subtitle:
        "A living ecosystem rooted in food, family, land, learning, and opportunity.",
      description:
        "Bronson Family Farm is more than a farm. It is a community-centered ecosystem connecting food, workforce, health, education, and generational renewal.",
      sections: {
        story: "Our Story",
        ecosystem: "The Ecosystem",
        airport: "The Airport",
        workforce: "Workforce",
        shop: "Shop",
        community: "Community",
      },
      roles: "Activate Role",
      actions: {
        grow: "Start Growing Plan",
        sell: "Sell Products",
        volunteer: "Join Volunteer Day",
        youth: "Join Youth Program",
      },
      back: "Back",
    },
    es: {
      enter: "Entrar al Ecosistema",
      title: "Bronson Family Farm",
      subtitle:
        "Un ecosistema vivo con raíces en la comida, la familia, la tierra y el aprendizaje.",
      description:
        "Bronson Family Farm es más que una granja. Es un ecosistema comunitario que conecta alimentos, trabajo, salud y educación.",
      sections: {
        story: "Nuestra Historia",
        ecosystem: "El Ecosistema",
        airport: "El Aeropuerto",
        workforce: "Fuerza Laboral",
        shop: "Tienda",
        community: "Comunidad",
      },
      roles: "Activar Rol",
      actions: {
        grow: "Comenzar Plan de Cultivo",
        sell: "Vender Productos",
        volunteer: "Unirse como Voluntario",
        youth: "Programa Juvenil",
      },
      back: "Regresar",
    },
  };

  const current = t[lang];

  if (!entered) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h4 style={{ letterSpacing: 2 }}>
            BRONSON FAMILY FARM ECOSYSTEM DEMO
          </h4>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>

          <h1>{current.title}</h1>
          <p>{current.subtitle}</p>
          <p style={{ maxWidth: 600 }}>{current.description}</p>

          <button style={styles.primary} onClick={() => setEntered(true)}>
            {current.enter}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <button style={styles.back} onClick={() => setEntered(false)}>
          {current.back}
        </button>

        <h2>{current.title}</h2>

        {/* NAVIGATION CARDS */}
        <div style={styles.grid}>
          {Object.entries(current.sections).map(([key, label]) => (
            <div
              key={key}
              style={styles.cardItem}
              onClick={() => {
                if (key === "shop") {
                  window.open(
                    "https://grownby.com/farms/bronson-family-farm/shop",
                    "_blank"
                  );
                } else {
                  setSection(key);
                }
              }}
            >
              <div style={styles.icon}>🌱</div>
              <h4>{label}</h4>
            </div>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div style={styles.contentBox}>
          {section === "story" && <p>History of Bronson Family Farm...</p>}
          {section === "ecosystem" && <p>The full ecosystem model...</p>}
          {section === "airport" && <p>Lansdowne Airport integration...</p>}
          {section === "workforce" && <p>Youth workforce pipeline...</p>}
          {section === "community" && <p>Community engagement...</p>}
        </div>
      </div>

      {/* TOOLBOX PANEL */}
      <div style={styles.sidebar}>
        <h4>{current.roles}</h4>

        <button onClick={() => setRole("grow")}>
          {current.actions.grow}
        </button>
        <button onClick={() => setRole("sell")}>
          {current.actions.sell}
        </button>
        <button onClick={() => setRole("volunteer")}>
          {current.actions.volunteer}
        </button>
        <button onClick={() => setRole("youth")}>
          {current.actions.youth}
        </button>

        {role && (
          <div style={{ marginTop: 20 }}>
            <strong>Active:</strong> {role}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#dce7df",
  },
  card: {
    background: "white",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
    border: "2px solid #2f5d3a",
  },
  primary: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#2f5d3a",
    color: "white",
    border: "none",
    borderRadius: 6,
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
    borderLeft: "1px solid #ccc",
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
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid #ddd",
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  contentBox: {
    marginTop: 30,
    padding: 20,
    background: "#f5f8f6",
    borderRadius: 10,
  },
  select: {
    marginBottom: 10,
  },
  back: {
    marginBottom: 10,
  },
};
