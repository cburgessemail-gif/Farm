import React, { useState } from "react";

type Panel =
  | "dashboard"
  | "grow"
  | "calendar"
  | "shop"
  | "story"
  | "community";

const images = {
  hero: "/farm-hero.jpg",
  grow: "/grow.jpg",
  shop: "/market.jpg",
  story: "/story.jpg",
};

export default function App() {
  const [panel, setPanel] = useState<Panel>("dashboard");

  return (
    <div style={styles.app}>
      {/* LEFT NAV */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Bronson Farm</h2>

        {["dashboard", "grow", "calendar", "shop", "story", "community"].map(
          (item) => (
            <button
              key={item}
              style={{
                ...styles.navBtn,
                ...(panel === item ? styles.active : {}),
              }}
              onClick={() => setPanel(item as Panel)}
            >
              {item.toUpperCase()}
            </button>
          )
        )}
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {panel === "dashboard" && <Dashboard setPanel={setPanel} />}
        {panel === "grow" && <Grow />}
        {panel === "calendar" && <Calendar />}
        {panel === "shop" && <Shop />}
        {panel === "story" && <Story />}
        {panel === "community" && <Community />}
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Dashboard({ setPanel }: any) {
  return (
    <>
      <img src="/farm-hero.jpg" style={styles.hero} />

      <h1 style={styles.title}>LIVE ECOSYSTEM</h1>
      <p style={styles.text}>
        This is not a presentation. This is a working system.
      </p>

      <div style={styles.grid}>
        <Card title="GROW" onClick={() => setPanel("grow")} img="/grow.jpg" />
        <Card title="SHOP" onClick={() => setPanel("shop")} img="/market.jpg" />
        <Card title="CALENDAR" onClick={() => setPanel("calendar")} />
        <Card title="STORY" onClick={() => setPanel("story")} img="/story.jpg" />
        <Card title="COMMUNITY" onClick={() => setPanel("community")} />
      </div>
    </>
  );
}

function Grow() {
  return (
    <>
      <h2>Grower System</h2>
      <img src="/grow.jpg" style={styles.sectionImg} />
      <p>Crop flow, irrigation, and production live here.</p>
    </>
  );
}

function Calendar() {
  return (
    <>
      <h2>Live Calendar</h2>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td>7AM</td>
            <td>Water Plants</td>
          </tr>
          <tr>
            <td>9AM</td>
            <td>Harvest Greens</td>
          </tr>
          <tr>
            <td>11AM</td>
            <td>Prep Market</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Shop() {
  return (
    <>
      <h2>Live Shop</h2>
      <img src="/market.jpg" style={styles.sectionImg} />
      <button
        style={styles.button}
        onClick={() =>
          window.open(
            "https://grownby.com/farms/bronson-family-farm/shop",
            "_blank"
          )
        }
      >
        OPEN STORE
      </button>
    </>
  );
}

function Story() {
  return (
    <>
      <h2>Our Story</h2>
      <img src="/story.jpg" style={styles.sectionImg} />
      <p>This is legacy, land, and future.</p>
    </>
  );
}

function Community() {
  return (
    <>
      <h2>Community</h2>
      <p>Volunteers, partners, families.</p>
    </>
  );
}

function Card({ title, onClick, img }: any) {
  return (
    <div style={styles.card} onClick={onClick}>
      {img && <img src={img} style={styles.cardImg} />}
      <h3>{title}</h3>
    </div>
  );
}

/* ================= STYLES ================= */

const styles: any = {
  app: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    height: "100vh",
    fontFamily: "Arial",
  },
  sidebar: {
    background: "#e9f2ea",
    padding: "20px",
  },
  logo: { marginBottom: 20 },
  navBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  active: { background: "#2f6b3c", color: "#fff" },
  main: { padding: "20px", overflow: "auto" },
  hero: { width: "100%", height: 250, objectFit: "cover" },
  title: { fontSize: 40 },
  text: { marginBottom: 20 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    cursor: "pointer",
    border: "1px solid #ddd",
  },
  cardImg: { width: "100%", height: 120, objectFit: "cover" },
  sectionImg: { width: "100%", height: 200, objectFit: "cover" },
  button: {
    padding: 15,
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  table: { width: "100%", marginTop: 20 },
};
