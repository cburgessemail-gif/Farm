import React, { useState } from "react";

type Panel = "dashboard" | "grow" | "calendar" | "shop" | "story" | "community";

const images = {
  hero: "/GrowArea.jpg",
  grow: "/GrowArea.jpg",
  shop: "/GrowArea2.jpg",
  story: "/GrowArea2.jpg",
};

export default function App() {
  const [panel, setPanel] = useState<Panel>("dashboard");

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Bronson Farm</h2>

        {["dashboard", "grow", "calendar", "shop", "story", "community"].map((item) => (
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
        ))}
      </aside>

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

function Dashboard({ setPanel }: { setPanel: (panel: Panel) => void }) {
  return (
    <>
      <img src={images.hero} alt="Bronson Family Farm" style={styles.hero} />

      <h1 style={styles.title}>LIVE ECOSYSTEM</h1>
      <p style={styles.text}>This is not a presentation. This is a working system.</p>

      <div style={styles.grid}>
        <Card title="GROW" onClick={() => setPanel("grow")} img={images.grow} />
        <Card title="SHOP" onClick={() => setPanel("shop")} img={images.shop} />
        <Card title="CALENDAR" onClick={() => setPanel("calendar")} />
        <Card title="STORY" onClick={() => setPanel("story")} img={images.story} />
        <Card title="COMMUNITY" onClick={() => setPanel("community")} />
      </div>
    </>
  );
}

function Grow() {
  return (
    <>
      <h2>Grower System</h2>
      <img src={images.grow} alt="Grow" style={styles.sectionImg} />
      <div style={styles.grid2}>
        <div style={styles.cardStatic}>
          <h3>Production Status</h3>
          <p>Collards: Ready</p>
          <p>Peppers: Growing</p>
          <p>Tomatoes: Transplanting</p>
        </div>

        <div style={styles.cardStatic}>
          <h3>Next Actions</h3>
          <p>• Watering Cycle</p>
          <p>• Harvest Prep</p>
          <p>• Market Packaging</p>
        </div>
      </div>
    </>
  );
}

function Calendar() {
  return (
    <>
      <h2>Farm Calendar</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Task</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>7:00 AM</td>
            <td style={styles.td}>Water Plants</td>
          </tr>
          <tr>
            <td style={styles.td}>9:00 AM</td>
            <td style={styles.td}>Harvest Greens</td>
          </tr>
          <tr>
            <td style={styles.td}>12:00 PM</td>
            <td style={styles.td}>Prep Market</td>
          </tr>
          <tr>
            <td style={styles.td}>4:00 PM</td>
            <td style={styles.td}>Farmers Market</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Shop() {
  return (
    <>
      <h2>Marketplace</h2>
      <img src={images.shop} alt="Shop" style={styles.sectionImg} />
      <button
        style={styles.button}
        onClick={() =>
          window.open("https://grownby.com/farms/bronson-family-farm/shop", "_blank")
        }
      >
        OPEN LIVE STORE
      </button>
    </>
  );
}

function Story() {
  return (
    <>
      <h2>Our Story</h2>
      <img src={images.story} alt="Story" style={styles.sectionImg} />
      <p>This is legacy, land, and future.</p>
    </>
  );
}

function Community() {
  return (
    <>
      <h2>Community</h2>
      <div style={styles.grid2}>
        <div style={styles.cardStatic}>
          <h3>Volunteers</h3>
          <p>Support planting, setup, logistics, and farm activity.</p>
        </div>
        <div style={styles.cardStatic}>
          <h3>Partners</h3>
          <p>Join infrastructure, workforce, wellness, and food access efforts.</p>
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  onClick,
  img,
}: {
  title: string;
  onClick: () => void;
  img?: string;
}) {
  return (
    <div style={styles.card} onClick={onClick}>
      {img && <img src={img} alt={title} style={styles.cardImg} />}
      <h3>{title}</h3>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#dfe8e0",
  },
  sidebar: {
    background: "#e9f2ea",
    padding: "20px",
    borderRight: "1px solid #cfd9d1",
  },
  logo: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 700,
  },
  navBtn: {
    display: "block",
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "1px solid #9fb09f",
    background: "#ffffff",
    fontSize: 14,
    fontWeight: 700,
  },
  active: {
    background: "#2f6b3c",
    color: "#fff",
  },
  main: {
    padding: "20px",
    overflow: "auto",
  },
  hero: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    marginBottom: "20px",
    border: "1px solid #bfcabf",
  },
  title: {
    fontSize: 42,
    marginBottom: 12,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    padding: 20,
    cursor: "pointer",
    border: "1px solid #d0d0d0",
    minHeight: 140,
  },
  cardStatic: {
    background: "#fff",
    padding: 20,
    border: "1px solid #d0d0d0",
    minHeight: 140,
  },
  cardImg: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    marginBottom: 16,
    border: "1px solid #ddd",
  },
  sectionImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    marginBottom: 20,
    border: "1px solid #ddd",
  },
  button: {
    padding: 15,
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: 12,
  },
  table: {
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
    background: "#fff",
  },
  th: {
    textAlign: "left",
    padding: 12,
    border: "1px solid #d0d0d0",
    background: "#eef4ef",
  },
  td: {
    padding: 12,
    border: "1px solid #d0d0d0",
  },
};
