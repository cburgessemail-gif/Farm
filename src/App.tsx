import React, { useState } from "react";

export default function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h1 style={styles.title}>Bronson Family Farm</h1>
          <p style={styles.subtitle}>
            A Living Ecosystem for Growing, Learning, and Community
          </p>
          <button style={styles.button} onClick={() => setEntered(true)}>
            Enter the Farm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.sectionTitle}>Farm Ecosystem</h2>

      <div style={styles.grid}>
        {sections.map((section) => (
          <div key={section.title} style={styles.tile}>
            <h3 style={styles.tileTitle}>{section.title}</h3>
            <p style={styles.tileText}>{section.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const sections = [
  { title: "🌱 Grow", desc: "Crop planning, planting, and production." },
  { title: "🛒 Shop", desc: "Buy fresh produce and farm goods." },
  { title: "📚 Learn", desc: "Workshops, guides, and knowledge hub." },
  { title: "👩🏽‍🌾 Workforce", desc: "Youth training and job pathways." },
  { title: "🤝 Community", desc: "Volunteers, families, and partnerships." },
  { title: "📅 Events", desc: "Markets, tours, and community days." },
];

const styles: any = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaf5ee",
    fontFamily: "Arial",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    border: "2px solid #2f6b3c",
    textAlign: "center",
  },
  title: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "40px",
  },
  subtitle: {
    margin: "16px 0",
    fontSize: "18px",
    color: "#3f5f4a",
  },
  button: {
    padding: "12px 20px",
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  page: {
    padding: "40px",
    background: "#eaf5ee",
    minHeight: "100vh",
    fontFamily: "Arial",
  },
  sectionTitle: {
    fontSize: "32px",
    marginBottom: "24px",
    color: "#1f3d2b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  tile: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
  },
  tileTitle: {
    margin: "0 0 8px 0",
  },
  tileText: {
    margin: 0,
  },
};
