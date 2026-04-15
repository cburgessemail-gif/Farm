import React, { useState } from "react";

type Lang = "en" | "es";
type Section = "home" | "grow" | "shop" | "story" | "workforce" | "community" | "events";

const imagePaths: Record<string, string> = {
  hero: "/GrowArea.jpg",
  grow: "/GrowArea2.jpg",
  shop: "/GrowArea.jpg",
  story: "/GrowArea2.jpg",
  workforce: "/GrowArea.jpg",
  community: "/GrowArea2.jpg",
  events: "/GrowArea.jpg",
};

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle:
      "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    intro:
      "Bronson Family Farm connects food, family, workforce, wellness, and community participation through a living land-based system.",
    enter: "Enter the Ecosystem",
    back: "← Back to Ecosystem",
    preview: "Explore the ecosystem",
    askTitle: "Why this matters",
    askText:
      "Bronson Family Farm is building a working ecosystem where land, learning, food access, workforce development, and community renewal grow together.",
    askButton: "View the Opportunity",
    sections: {
      grow: "Grow",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
    },
    sectionText: {
      grow: "Crop planning, production, and stewardship.",
      shop: "Fresh goods and live purchasing pathways.",
      story: "History, vision, place, and purpose.",
      workforce: "Youth opportunity and practical learning.",
      community: "Volunteers, families, and partners.",
      events: "Markets, tours, and activation.",
    },
    details: {
      grow:
        "Explore crop planning, planting flow, growing capacity, irrigation thinking, and the systems needed to sustain real farm production.",
      shop:
        "This area represents fresh goods, value-added offerings, and the path from ecosystem visibility to real purchasing through Bronson Family Farm.",
      story:
        "Bronson Family Farm is more than a farm. It is a community-rooted vision shaped by legacy, land, service, and the belief that renewal can grow from place.",
      workforce:
        "This area highlights youth opportunity, hands-on learning, responsibility, confidence-building, and practical pathways into future work and leadership.",
      community:
        "This section shows how volunteers, families, supporters, institutions, and local partners can step into the ecosystem in meaningful ways.",
      events:
        "This area highlights markets, tours, public demonstrations, educational gatherings, and the visible activation of the full ecosystem.",
    },
  },
  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia, la tierra y la oportunidad.",
    intro:
      "Bronson Family Farm conecta alimentos, familia, trabajo, bienestar y participación comunitaria a través de un sistema vivo basado en la tierra.",
    enter: "Entrar al Ecosistema",
    back: "← Volver al Ecosistema",
    preview: "Explorar el ecosistema",
    askTitle: "Por qué importa",
    askText:
      "Bronson Family Farm está construyendo un ecosistema vivo donde la tierra, el aprendizaje, el acceso a alimentos, el desarrollo laboral y la renovación comunitaria crecen juntos.",
    askButton: "Ver la Oportunidad",
    sections: {
      grow: "Cultivar",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
    },
    sectionText: {
      grow: "Planificación de cultivos, producción y cuidado.",
      shop: "Productos frescos y rutas reales de compra.",
      story: "Historia, visión, lugar y propósito.",
      workforce: "Oportunidad juvenil y aprendizaje práctico.",
      community: "Voluntarios, familias y aliados.",
      events: "Mercados, recorridos y activación.",
    },
    details: {
      grow:
        "Explore la planificación de cultivos, el flujo de siembra, la capacidad de producción y los sistemas necesarios para sostener una granja real.",
      shop:
        "Esta área representa productos frescos, ofertas con valor agregado y el camino desde la visibilidad del ecosistema hasta la compra real.",
      story:
        "Bronson Family Farm es más que una granja. Es una visión comunitaria formada por legado, tierra, servicio y la creencia de que la renovación puede crecer desde el lugar.",
      workforce:
        "Esta área destaca la oportunidad juvenil, el aprendizaje práctico, la responsabilidad y las rutas hacia el trabajo y el liderazgo futuros.",
      community:
        "Esta sección muestra cómo voluntarios, familias, instituciones y aliados locales pueden entrar al ecosistema de manera significativa.",
      events:
        "Esta área destaca mercados, recorridos, demostraciones públicas, encuentros educativos y la activación visible del ecosistema completo.",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [section, setSection] = useState<Section>("home");

  const t = labels[lang];

  if (section === "home") {
    return (
      <div style={styles.page}>
        <div style={styles.shell}>
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

          <div style={styles.heroButtons}>
            <button style={styles.primaryButton} onClick={() => setSection("grow")}>
              {t.enter}
            </button>
            <button style={styles.secondaryButton} onClick={() => setSection("story")}>
              {t.askButton}
            </button>
          </div>

          <div style={styles.askPanel}>
            <h3 style={styles.askTitle}>{t.askTitle}</h3>
            <p style={styles.askText}>{t.askText}</p>
          </div>

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
        <p style={styles.sectionText}>{t.details[section]}</p>

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
  shell: {
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
  heroButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  primaryButton: {
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
  askPanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "24px",
  },
  askTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#173b24",
  },
  askText: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.6,
    color: "#486452",
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
