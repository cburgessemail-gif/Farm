import React, { useEffect, useState } from "react";

type Panel = "dashboard" | "grow" | "calendar" | "shop" | "story" | "community";

const HERO_IMAGE = "/GrowArea.jpg";

type WeatherState = {
  temperature: string;
  label: string;
  wind: string;
};

const weatherCodeMap: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Strong showers",
  95: "Thunderstorm",
};

export default function App() {
  const [panel, setPanel] = useState<Panel>("grow");
  const [timeText, setTimeText] = useState("");
  const [weather, setWeather] = useState<WeatherState>({
    temperature: "--°F",
    label: "Loading weather",
    wind: "-- mph",
  });

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
    const timer = window.setInterval(updateClock, 1000 * 30);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather(lat: number, lon: number) {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

        const response = await fetch(url);
        const data = await response.json();
        const current = data?.current;

        if (!current || cancelled) return;

        setWeather({
          temperature: `${Math.round(current.temperature_2m)}°F`,
          label: weatherCodeMap[current.weather_code] ?? "Current conditions",
          wind: `${Math.round(current.wind_speed_10m)} mph`,
        });
      } catch {
        if (!cancelled) {
          setWeather({
            temperature: "--°F",
            label: "Weather unavailable",
            wind: "-- mph",
          });
        }
      }
    }

    if (!navigator.geolocation) {
      loadWeather(41.0998, -80.6495);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        loadWeather(41.0998, -80.6495);
      },
      { timeout: 6000, maximumAge: 600000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

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
        <div style={styles.utilityBar}>
          <div style={styles.utilityCard}>
            <div style={styles.utilityLabel}>System Time</div>
            <div style={styles.utilityValue}>{timeText || "--:--"}</div>
          </div>

          <div style={styles.utilityCard}>
            <div style={styles.utilityLabel}>Weather</div>
            <div style={styles.utilityValue}>{weather.temperature}</div>
            <div style={styles.utilitySub}>
              {weather.label} • Wind {weather.wind}
            </div>
          </div>
        </div>

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

      <h1 style={styles.title}>Live Ecosystem</h1>
      <p style={styles.text}>This is not a presentation. This is a working system.</p>

      <div style={styles.grid}>
        <Card title="Grow" text="Crop flow, irrigation, and production status." onClick={() => setPanel("grow")} />
        <Card title="Shop" text="Live store access and market readiness." onClick={() => setPanel("shop")} />
        <Card title="Calendar" text="Tasks, timing, and daily farm rhythm." onClick={() => setPanel("calendar")} />
        <Card title="Story" text="Legacy, land, place, and future." onClick={() => setPanel("story")} />
        <Card title="Community" text="Volunteers, families, and partners." onClick={() => setPanel("community")} />
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
          <ProgressRow label="Collards" value={88} color="#2f7d3d" status="Ready" />
          <ProgressRow label="Peppers" value={64} color="#6fb56d" status="Growing" />
          <ProgressRow label="Tomatoes" value={72} color="#d2b347" status="Transplanting" />
        </div>

        <div style={styles.cardStatic}>
          <h3 style={styles.cardHeading}>Next Actions</h3>
          <ActionItem number={1} text="Watering cycle" />
          <ActionItem number={2} text="Harvest prep" />
          <ActionItem number={3} text="Market packaging" />
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
            <td style={styles.td}>Water plants</td>
          </tr>
          <tr>
            <td style={styles.td}>9:00 AM</td>
            <td style={styles.td}>Harvest greens</td>
          </tr>
          <tr>
            <td style={styles.td}>12:00 PM</td>
            <td style={styles.td}>Prep market</td>
          </tr>
          <tr>
            <td style={styles.td}>4:00 PM</td>
            <td style={styles.td}>Farmers market</td>
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
          <p style={styles.bodyText}>Join infrastructure, workforce, wellness, and food access efforts.</p>
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

function ActionItem({ number, text }: { number: number; text: string }) {
  return (
    <div style={styles.actionItem}>
      <div style={styles.actionNumber}>{number}</div>
      <div style={styles.actionText}>{text}</div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  color,
  status,
}: {
  label: string;
  value: number;
  color: string;
  status: string;
}) {
  return (
    <div style={styles.progressBlock}>
      <div style={styles.progressHeader}>
        <span style={styles.progressLabel}>{label}</span>
        <span style={styles.progressStatus}>
          {status} • {value}%
        </span>
      </div>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${value}%`, background: color }} />
      </div>
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
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
  },
  active: {
    background: "#3f7d4f",
    color: "#fff",
    border: "1px solid #3f7d4f",
    fontWeight: 600,
  },
  main: {
    padding: "20px",
    overflow: "auto",
  },
  utilityBar: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 20,
  },
  utilityCard: {
    background: "#f7faf7",
    border: "1px solid #c8d5c9",
    borderRadius: "18px",
    padding: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
  },
  utilityLabel: {
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#587260",
    fontWeight: 700,
    marginBottom: 8,
  },
  utilityValue: {
    fontSize: 28,
    color: "#1f3d2b",
    fontWeight: 600,
    letterSpacing: "-0.4px",
  },
  utilitySub: {
    marginTop: 6,
    fontSize: 14,
    color: "#587260",
    fontWeight: 400,
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
    color: "#1f3d2b",
    fontWeight: 600,
    letterSpacing: "-0.5px",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: "#35543f",
    fontWeight: 400,
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
    color: "#244a34",
    fontSize: 18,
    fontWeight: 600,
  },
  cardText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#4a6b57",
    fontSize: 15,
    fontWeight: 400,
  },
  bodyText: {
    margin: "0 0 8px 0",
    lineHeight: 1.6,
    color: "#4a6b57",
    fontSize: 15,
    fontWeight: 400,
  },
  sectionTitle: {
    fontSize: 32,
    marginBottom: 10,
    color: "#1f3d2b",
    fontWeight: 600,
    letterSpacing: "-0.3px",
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
  actionItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#edf3ed",
    border: "1px solid #d6e0d7",
    borderRadius: "18px",
    padding: "12px 14px",
    marginBottom: 14,
  },
  actionNumber: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#2f7d3d",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },
  actionText: {
    color: "#244a34",
    fontSize: 15,
    fontWeight: 600,
  },
  progressBlock: {
    marginBottom: 18,
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  progressLabel: {
    color: "#244a34",
    fontSize: 16,
    fontWeight: 600,
  },
  progressStatus: {
    color: "#587260",
    fontSize: 14,
    fontWeight: 600,
  },
  progressTrack: {
    width: "100%",
    height: 12,
    background: "#e3e9e3",
    borderRadius: 999,
    overflow: "hidden",
    border: "1px solid #d3ddd3",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
};
