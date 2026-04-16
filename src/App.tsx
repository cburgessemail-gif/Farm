import React, { useState } from "react";

type Panel = "dashboard" | "grow" | "calendar" | "shop" | "story" | "community";

const HERO_IMAGE = "/GrowArea.jpg";

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
      <div style={styles.heroWrap}>
        <img src={HERO_IMAGE} alt="Bronson Family Farm" style={styles.hero} />
      </div>

      <h1 style={styles.title}>LIVE ECOSYSTEM</h1>
      <p style={styles.text}>This is not a presentation. This is a working system.</p>

      <div style={styles.grid}>
        <Card
          title="GROW"
          text="Crop flow, irrigation, and production status."
          onClick={() => setPanel("grow")}
        />
        <Card
          title="SHOP"
          text="Live store access and market readiness."
          onClick={() => setPanel("shop")}
        />
        <Card
          title="CALENDAR"
          text="Tasks, timing, and daily farm rhythm."
          onClick={() => setPanel("calendar")}
        />
        <Card
          title="STORY"
          text="Legacy, land, place, and future."
          onClick={() => setPanel("story")}
        />
        <Card
          title="COMMUNITY"
          text="Volunteers, families, and partners."
          onClick={() => setPanel("community")}
        />
      </div>
    </>
  );
}

function Grow() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Grower System</h2>
      <div style={styles.grid2}>
        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Production Status</h3>
          <p style={styles.bodyText}>Collards: Ready</p>
          <p style={styles.bodyText}>Peppers: Growing</p>
          <p style={styles.bodyText}>Tomatoes: Transplanting</p>
        </div>

        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Next Actions</h3>
          <p style={styles.bodyText}>• Watering cycle</p>
          <p style={styles.bodyText}>• Harvest prep</p>
          <p style={styles.bodyText}>• Market packaging</p>
        </div>
      </div>
    </>
  );
}

function Calendar() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Farm Calendar</h2>
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
      <h2 style={styles.sectionTitle}>Marketplace</h2>
      <div style={styles.grid2}>
        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Market Readiness</h3>
          <p style={styles.bodyText}>Bubble Babies: Available</p>
          <p style={styles.bodyText}>Seedlings: In season</p>
          <p style={styles.bodyText}>Fresh produce: Market-based</p>
        </div>

        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Store Access</h3>
          <p style={styles.bodyText}>Open the live Bronson Family Farm GrownBy store.</p>
          <button
            style={styles.button}
            onClick={() =>
              window.open(
                "https://grownby.com/farms/bronson-family-farm/shop",
                "_blank"
              )
            }
          >
            OPEN LIVE STORE
          </button>
        </div>
      </div>
    </>
  );
}

function Story() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Our Story</h2>
      <div style={styles.cardStatic}>
        <div style={styles.cardAccent} />
        <h3 style={styles.cardHeading}>Legacy + Place</h3>
        <p style={styles.bodyText}>
          Bronson Family Farm is more than a farm. It is legacy, land, renewal,
          and the future growing from one place.
        </p>
        <p style={styles.bodyText}>
          The ecosystem brings together food access, learning, workforce
          development, family participation, and long-term community renewal.
        </p>
      </div>
    </>
  );
}

function Community() {
  return (
    <>
      <h2 style={styles.sectionTitle}>Community</h2>
      <div style={styles.grid2}>
        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Volunteers</h3>
          <p style={styles.bodyText}>Support planting, setup, logistics, and farm activity.</p>
        </div>
        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Partners</h3>
          <p style={styles.bodyText}>
            Join infrastructure, workforce, wellness, and food access efforts.
          </p>
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  onClick,
  text,
}: {
  title: string;
  onClick: () => void;
  text: string;
}) {
  return (
    <button style={styles.card} onClick={onClick}>
      <div style={styles.cardAccent} />
      <h3 style={styles.cardHeading}>{title}</h3>
      <p style={styles.cardText}>{text}</p>
    </button>
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
    color: "#173b24",
  },
  navBtn: {
    display: "block",
    width: "100%",
    padding: "14px 12px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "1px solid #b8c7b9",
    borderRadius: "12px",
    background: "#f8fbf8",
    color: "#173b24",
    fontSize: 14,
    fontWeight: 700,
    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
  },
  active: {
    background: "#2f6b3c",
    color: "#fff",
    border: "1px solid #2f6b3c",
  },
  main: {
    padding: "20px",
    overflow: "auto",
  },
  heroWrap: {
    background: "#f7faf7",
    border: "1px solid #c8d5c9",
    borderRadius: "20px",
    padding: "16px",
    marginBottom: "22px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
  },
  hero: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    borderRadius: "14px",
    display: "block",
  },
  title: {
    fontSize: 42,
    marginBottom: 12,
    color: "#173b24",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: "#35543f",
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
    background: "#f9fbf9",
    padding: 20,
    cursor: "pointer",
    border: "1px solid #cad8cb",
    borderRadius: "18px",
    minHeight: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  },
  cardStatic: {
    background: "#f9fbf9",
    padding: 20,
    border: "1px solid #cad8cb",
    borderRadius: "18px",
    minHeight: 160,
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  },
  cardAccent: {
    height: 10,
    borderRadius: 999,
    background: "#6aa56f",
    marginBottom: 18,
  },
  cardHeading: {
    margin: "0 0 10px 0",
    color: "#173b24",
    fontSize: 20,
  },
  cardText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#35543f",
    fontSize: 16,
  },
  bodyText: {
    margin: "0 0 8px 0",
    lineHeight: 1.6,
    color: "#35543f",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 34,
    marginBottom: 8,
    color: "#173b24",
  },
  button: {
    padding: 15,
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 700,
    marginTop: 12,
  },
  table: {
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
    background: "#f9fbf9",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  },
  th: {
    textAlign: "left",
    padding: 14,
    border: "1px solid #d5e0d6",
    background: "#eef5ee",
    color: "#173b24",
  },
  td: {
    padding: 14,
    border: "1px solid #d5e0d6",
    color: "#35543f",
  },
};
