import React, { useState } from "react";

type Lang = "en" | "es";
type Section = "home" | "grow" | "shop" | "story" | "workforce" | "community" | "events";

const imagePaths: Record<string, string> = {
  hero: "/images/GrowArea.jpg",
  grow: "/images/GrowArea2.jpg",
  shop: "/images/GrowArea2.jpg",
  story: "/images/SAM_0220.JPG",
  workforce: "/images/SAM_0221.JPG",
  community: "/images/SAM_0221.JPG",
  events: "/images/SAM_0220.JPG",
};

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle:
      "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    enter: "Enter the Ecosystem",
    back: "← Back",
    preview: "Explore the ecosystem",
    intro:
      "Bronson Family Farm connects food, family, workforce, wellness, and community participation through a living land-based system.",
    sections: {
      grow: "Grow",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
    },
    sectionText: {
      grow: "Crop planning and production.",
      shop: "Fresh goods and pathways to purchase.",
      story: "History, vision, and place.",
      workforce: "Youth opportunity and practical learning.",
      community: "Volunteers, families, and partners.",
      events: "Gatherings, markets, and activation.",
    },
  },
  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia y la tierra.",
    enter: "Entrar al Ecosistema",
    back: "← Volver",
    preview: "Explorar el ecosistema",
    intro:
      "Bronson Family Farm conecta alimentos, familia, trabajo, bienestar y participación comunitaria a través de un sistema vivo basado en la tierra.",
    sections: {
      grow: "Cultivar",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
    },
    sectionText: {
      grow: "Planificación de cultivos y producción.",
      shop: "Productos frescos y rutas de compra.",
      story: "Historia, visión y lugar.",
      workforce: "Oportunidad juvenil y aprendizaje práctico.",
      community: "Voluntarios, familias y aliados.",
      events: "Encuentros, mercados y activación.",
    },
  },
};

const sectionDetails: Record<Exclude<Section, "home">, string> = {
  grow:
    "Explore crop planning, planting flow, irrigation thinking, and the systems that support Bronson Family Farm’s growing capacity.",
  shop:
    "This area represents fresh goods, value-added offerings, and the path from ecosystem visibility to real purchasing.",
  story:
    "This section introduces the farm story, the broader ecosystem vision, and the meaning of place, legacy, and long-term renewal.",
  workforce:
    "This area highlights youth opportunity, hands-on learning, practical responsibility, and pathways toward long-term growth.",
  community:
    "This section shows how volunteers, families, supporters, and partners can step into the ecosystem in practical ways.",
  events:
    "This area highlights markets, tours, demonstrations, and gathering points that activate the ecosystem in public view.",
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [section, setSection] = useState<Section>("home");

  const t = labels[lang];

  if (section === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.heroShell}>
          <div style={styles.topBar}>
            <div style={styles.eyebrow}>Bronson Family Farm Demo</div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={styles.select}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <img src={imagePaths.hero} alt="Bronson Family Farm" style={styles.heroImage} />

          <h1 style={styles.title}>{t.title}</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
          <p style={styles.intro}>{t.intro}</p>

          <button style={styles.primaryButton} onClick={() => setSection("grow")}>
            {t.enter}
          </button>

          <div style={styles.previewHeader}>{t.preview}</div>

          <div style={styles.grid}>
            {(Object.keys(t.sections) as Array<keyof typeof t.sections>).map((key) => (
              <button key={key} style={styles.tile} onClick={() => setSection(key as Section)}>
                <img src={imagePaths[key]} alt={t.sections[key]} style={styles.tileImage} />
                <div style={styles.tileTitle}>{t.sections[key]}</div>
                <div style={styles.tileText}>{t.sectionText[key]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.sectionShell}>
        <div style={styles.topBar}>
          <button style={styles.backButton} onClick={() => setSection("home")}>
            {t.back}
          </button>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <img
          src={imagePaths[section]}
          alt={t.sections[section]}
          style={styles.sectionImage}
        />

        <h2 style={styles.sectionTitle}>{t.sections[section]}</h2>
        <p style={styles.sectionText}>{sectionDetails[section]}</p>

        {section === "shop" && (
          <div style={styles.ctaRow}>
            <button
              style={styles.primaryButton}
              onClick={() =>
                window.open(
                  "https://grownby.com/farms/bronson-family-farm/shop",
                  "_blank"
                )
              }
            >
              Open GrownBy Shop
            </button>
            <button style={styles.secondaryButton} onClick={() => setSection("home")}>
              Return to Ecosystem
            </button>
          </div>
        )}

        <div style={styles.sectionGrid}>
          {(Object.keys(t.sections) as Array<keyof typeof t.sections>)
            .filter((key) => key !== section)
            .map((key) => (
              <button key={key} style={styles.miniTile} onClick={() => setSection(key as Section)}>
                <div style={styles.miniTileTitle}>{t.sections[key]}</div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#dfe8e0",
    padding: "28px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroShell: {
    width: "100%",
    maxWidth: "1180px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  sectionShell: {
    width: "100%",
    maxWidth: "980px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    fontSize: "15px",
  },
  heroImage: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "22px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "56px",
    lineHeight: 1.05,
    textAlign: "center",
    color: "#173b24",
  },
  subtitle: {
    margin: "0 auto 12px auto",
    maxWidth: "850px",
    textAlign: "center",
    fontSize: "28px",
    lineHeight: 1.2,
    color: "#2d4f38",
  },
  intro: {
    margin: "0 auto 22px auto",
    maxWidth: "860px",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#486452",
  },
  primaryButton: {
    display: "block",
    margin: "0 auto 28px auto",
    padding: "14px 24px",
    background: "#2f6b3c",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  secondaryButton: {
    padding: "14px 24px",
    background: "#ffffff",
    color: "#173b24",
    border: "1px solid #cfd9d1",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  previewHeader: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1f3d2b",
    marginBottom: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  tile: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "14px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(25, 55, 35, 0.05)",
  },
  tileImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "14px",
    display: "block",
    marginBottom: "12px",
  },
  tileTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#173b24",
    marginBottom: "6px",
  },
  tileText: {
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#486452",
  },
  backButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
    color: "#173b24",
  },
  sectionImage: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "22px",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "42px",
    color: "#173b24",
  },
  sectionText: {
    margin: "0 0 22px 0",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#486452",
    maxWidth: "780px",
  },
  ctaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  miniTile: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "12px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "center",
  },
  miniTileTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#173b24",
  },
};
