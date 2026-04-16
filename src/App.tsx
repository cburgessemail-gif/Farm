import React, { useEffect, useState } from "react";

import heroImg from "./GrowArea.jpg";
import growImg from "./GrowArea.jpg";
import shopImg from "./GrowArea2.jpg";
import storyImg from "./SAM_0220.JPG";
import communityImg from "./SAM_0221.JPG";
import eventsImg from "./SAM_0222.JPG";

type Panel =
  | "dashboard"
  | "grow"
  | "calendar"
  | "shop"
  | "story"
  | "community"
  | "events";

export default function App() {
  const [panel, setPanel] = useState<Panel>("dashboard");
  const [timeText, setTimeText] = useState("");
  const [weather, setWeather] = useState({
    temperature: "--°F",
    label: "Loading weather",
    wind: "-- mph",
  });

  // LIVE CLOCK
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeText(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  // WEATHER
  useEffect(() => {
    const weatherMap: Record<number, string> = {
      0: "Clear",
      1: "Mostly clear",
      2: "Partly cloudy",
      3: "Overcast",
      61: "Rain",
      63: "Rain",
      80: "Showers",
      95: "Storm",
    };

    async function loadWeather(lat: number, lon: number) {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`
        );
        const data = await res.json();
        const c = data.current;

        setWeather({
          temperature: `${Math.round(c.temperature_2m)}°F`,
          label: weatherMap[c.weather_code] || "Conditions",
          wind: `${Math.round(c.wind_speed_10m)} mph`,
        });
      } catch {
        setWeather({
          temperature: "--°F",
          label: "Unavailable",
          wind: "-- mph",
        });
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => loadWeather(pos.coords.latitude, pos.coords.longitude),
      () => loadWeather(41.0998, -80.6495)
    );
  }, []);

  const renderPanel = () => {
    if (panel === "dashboard") {
      return (
        <>
          <img src={heroImg} style={styles.hero} />

          <h1 style={styles.title}>Live Ecosystem</h1>
          <p style={styles.subtitle}>
            This is not a presentation. This is a working system.
          </p>

          <div style={styles.utilityRow}>
            <div style={styles.card}>
              <div style={styles.label}>Time</div>
              <div style={styles.value}>{timeText}</div>
            </div>

            <div style={styles.card}>
              <div style={styles.label}>Weather</div>
              <div style={styles.value}>{weather.temperature}</div>
              <div style={styles.sub}>
                {weather.label} • {weather.wind}
              </div>
            </div>
          </div>

          <div style={styles.grid}>
            <Card img={growImg} title="Grow" onClick={() => setPanel("grow")} />
            <Card img={shopImg} title="Shop" onClick={() => setPanel("shop")} />
            <Card img={storyImg} title="Story" onClick={() => setPanel("story")} />
            <Card img={communityImg} title="Community" onClick={() => setPanel("community")} />
            <Card img={eventsImg} title="Events" onClick={() => setPanel("events")} />
            <Card img={growImg} title="Calendar" onClick={() => setPanel("calendar")} />
          </div>
        </>
      );
    }

    if (panel === "grow") {
      return (
        <>
          <img src={growImg} style={styles.hero} />
          <h1 style={styles.title}>Grower System</h1>

          <div style={styles.row}>
            <div style={styles.card}>
              <h3>Production Status</h3>
              <p>Collards: Ready</p>
              <p>Peppers: Growing</p>
              <p>Tomatoes: Transplanting</p>
            </div>

            <div style={styles.card}>
              <h3>Next Actions</h3>
              <p>Watering cycle</p>
              <p>Harvest prep</p>
              <p>Market packaging</p>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <img src={heroImg} style={styles.hero} />
        <h1 style={styles.title}>{panel.toUpperCase()}</h1>
      </>
    );
  };

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={styles.brand}>Bronson Farm</h2>

        <Nav label="Dashboard" active={panel === "dashboard"} onClick={() => setPanel("dashboard")} />
        <Nav label="Grow" active={panel === "grow"} onClick={() => setPanel("grow")} />
        <Nav label="Calendar" active={panel === "calendar"} onClick={() => setPanel("calendar")} />
        <Nav label="Shop" active={panel === "shop"} onClick={() => setPanel("shop")} />
        <Nav label="Story" active={panel === "story"} onClick={() => setPanel("story")} />
        <Nav label="Community" active={panel === "community"} onClick={() => setPanel("community")} />
        <Nav label="Events" active={panel === "events"} onClick={() => setPanel("events")} />
      </aside>

      <main style={styles.main}>{renderPanel()}</main>
    </div>
  );
}

function Card({ img, title, onClick }: any) {
  return (
    <div style={styles.card} onClick={onClick}>
      <img src={img} style={styles.cardImg} />
      <h3>{title}</h3>
    </div>
  );
}

function Nav({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.nav,
        background: active ? "#2f6b3b" : "#ffffff",
        color: active ? "#fff" : "#2f6b3b",
      }}
    >
      {label}
    </button>
  );
}

const styles: any = {
  app: {
    display: "flex",
    fontFamily: "system-ui",
    background: "#eef3ef",
  },
  sidebar: {
    width: 220,
    padding: 20,
    background: "#f7faf7",
    borderRight: "1px solid #d6e2d8",
  },
  brand: {
    fontWeight: 600,
    marginBottom: 20,
    color: "#2f6b3b",
  },
  nav: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #c8d5c9",
    cursor: "pointer",
    fontWeight: 500,
  },
  main: {
    flex: 1,
    padding: 30,
  },
  hero: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    color: "#1f3d2b",
  },
  subtitle: {
    marginBottom: 20,
    color: "#587260",
  },
  utilityRow: {
    display: "flex",
    gap: 20,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
  },
  row: {
    display: "flex",
    gap: 20,
  },
  card: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    cursor: "pointer",
  },
  cardImg: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#587260",
  },
  value: {
    fontSize: 24,
    fontWeight: 600,
  },
  sub: {
    fontSize: 14,
    color: "#587260",
  },
};
