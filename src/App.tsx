import React, { useEffect, useMemo, useState } from "react";

type Panel = "dashboard" | "grow" | "calendar" | "shop" | "story" | "community";

const HERO_IMAGE = "/GrowArea.jpg";

type WeatherState = {
  loading: boolean;
  temperature: string;
  wind: string;
  label: string;
  city: string;
};

const weatherCodeMap: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Heavy showers",
  82: "Violent showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail",
};

export default function App() {
  const [panel, setPanel] = useState<Panel>("dashboard");
  const [timeText, setTimeText] = useState("");
  const [weather, setWeather] = useState<WeatherState>({
    loading: true,
    temperature: "--°F",
    wind: "-- mph",
    label: "Loading weather",
    city: "Local",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeText(
        now.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const setFallback = () => {
      if (cancelled) return;
      setWeather({
        loading: false,
        temperature: "--°F",
        wind: "-- mph",
        label: "Weather unavailable",
        city: "Youngstown area",
      });
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Weather request failed");

        const data = await response.json();
        const current = data?.current;
        if (!current) throw new Error("Missing weather data");

        const code = Number(current.weather_code ?? -1);
        const label = weatherCodeMap[code] ?? "Current conditions";

        if (!cancelled) {
          setWeather({
            loading: false,
            temperature: `${Math.round(Number(current.temperature_2m))}°F`,
            wind: `${Math.round(Number(current.wind_speed_10m))} mph`,
            label,
            city: "Local weather",
          });
        }
      } catch {
        setFallback();
      }
    };

    if (!navigator.geolocation) {
      fetchWeather(41.0998, -80.6495);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        fetchWeather(41.0998, -80.6495);
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 600000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const dashboardCards = useMemo(
    () => [
      {
        title: "GROW",
        text: "Crop flow, irrigation, and production status.",
        onClick: () => setPanel("grow"),
      },
      {
        title: "SHOP",
        text: "Live store access and market readiness.",
        onClick: () => setPanel("shop"),
      },
      {
        title: "CALENDAR",
        text: "Tasks, timing, and daily farm rhythm.",
        onClick: () => setPanel("calendar"),
      },
      {
        title: "STORY",
        text: "Legacy, land, place, and future.",
        onClick: () => setPanel("story"),
      },
      {
        title: "COMMUNITY",
        text: "Volunteers, families, and partners.",
        onClick: () => setPanel("community"),
      },
    ],
    []
  );

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Bronson Farm</h2>

        <div style={styles.sidebarLabel}>Demo Navigation</div>

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

        <div style={styles.sideInfoCard}>
          <h3 style={styles.sideInfoTitle}>Live Demo</h3>
          <p style={styles.sideInfoText}>
            Stable build with visible language, system identity, live status feel,
            and store access.
          </p>
        </div>
      </aside>

      <main style={styles.main}>
        {panel === "dashboard" && (
          <>
            <div style={styles.topUtilityBar}>
              <div style={styles.utilityCard}>
                <div style={styles.utilityLabel}>System Time</div>
                <div style={styles.utilityValue}>{timeText || "--:--:--"}</div>
              </div>

              <div style={styles.utilityCard}>
                <div style={styles.utilityLabel}>Weather</div>
                <div style={styles.utilityValue}>{weather.temperature}</div>
                <div style={styles.utilitySub}>
                  {weather.label} • Wind {weather.wind}
                </div>
              </div>
            </div>

            <div style={styles.heroPanel}>
              <img src={HERO_IMAGE} alt="Bronson Family Farm" style={styles.heroImage} />

              <div style={styles.heroOverlay}>
                <div style={styles.liveBadge}>● LIVE SYSTEM</div>
                <div style={styles.clockBadge}>{timeText || "--:--:--"}</div>
              </div>

              <div style={styles.heroTextWrap}>
                <h1 style={styles.title}>Live Ecosystem</h1>
                <p style={styles.text}>
                  This is not a presentation. This is a working system with live
                  weather, timing, store access, and operating pathways.
                </p>
              </div>
            </div>

            <div style={styles.grid}>
              {dashboardCards.map((card) => (
                <Card
                  key={card.title}
                  title={card.title}
                  text={card.text}
                  onClick={card.onClick}
                />
              ))}
            </div>
          </>
        )}

        {panel === "grow" && (
          <>
            <h2 style={styles.sectionTitle}>Grower System</h2>
            <div style={styles.grid2}>
              <div style={styles.cardStatic}>
                <h3 style={styles.cardHeading}>Production Status</h3>
                <ProgressRow label="Collards" value={88} color="#2f7d3d" status="Ready" />
                <ProgressRow label="Peppers" value={64} color="#6fb56d" status="Growing" />
                <ProgressRow label="Tomatoes" value={72} color="#d2b347" status="Transplanting" />
                <ProgressRow label="Cabbage" value={79} color="#88b97e" status="Strong" />
              </div>

              <div style={styles.cardStatic}>
                <h3 style={styles.cardHeading}>Next Actions</h3>
                <ActionItem number={1} text="Watering cycle and moisture check" />
                <ActionItem number={2} text="Harvest prep for greens and herbs" />
                <ActionItem number={3} text="Market packaging and labeling" />
              </div>
            </div>
          </>
        )}

        {panel === "calendar" && (
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
                  <td style={styles.td}>Water plants and moisture check</td>
                </tr>
                <tr>
                  <td style={styles.td}>9:00 AM</td>
                  <td style={styles.td}>Harvest greens and herbs</td>
                </tr>
                <tr>
                  <td style={styles.td}>12:00 PM</td>
                  <td style={styles.td}>Prep market inventory</td>
                </tr>
                <tr>
                  <td style={styles.td}>4:00 PM</td>
                  <td style={styles.td}>Community market flow</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {panel === "shop" && (
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
        )}

        {panel === "story" && (
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
        )}

        {panel === "community" && (
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
        )}
      </main>
    </div>
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
  sidebarLabel: {
    marginBottom: 12,
    color: "#3d6048",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  navBtn: {
    display: "block",
    width: "100%",
    padding: "14px 12px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "1px solid #b8c7b9",
    borderRadius: "16px",
    background: "#f8fbf8",
    color: "#214431",
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
  sideInfoCard: {
    marginTop: 26,
    background: "#f7faf7",
    border: "1px solid #c8d5c9",
    borderRadius: "18px",
    padding: 16,
    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
  },
  sideInfoTitle: {
    margin: "0 0 8px 0",
    fontSize: 18,
    color: "#214431",
    fontWeight: 600,
  },
  sideInfoText: {
    margin: 0,
    lineHeight: 1.6,
    color: "#587260",
    fontSize: 15,
    fontWeight: 400,
  },
  main: {
    padding: "20px",
    overflow: "auto",
  },
  topUtilityBar: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 20,
  },
  utilityCard: {
    background: "#f7faf7",
    border: "1px solid #c8d5c9",
    borderRadius: "20px",
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
  heroPanel: {
    position: "relative",
    marginBottom: 22,
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
  },
  heroImage: {
    width: "100%",
    height: 340,
    objectFit: "cover",
    display: "block",
    filter: "brightness(0.72)",
  },
  heroOverlay: {
    position: "absolute",
    top: 22,
    left: 28,
    right: 28,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveBadge: {
    background: "rgba(89, 121, 84, 0.82)",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    backdropFilter: "blur(6px)",
  },
  clockBadge: {
    background: "rgba(120, 124, 82, 0.82)",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 700,
    backdropFilter: "blur(6px)",
  },
  heroTextWrap: {
    position: "absolute",
    left: 28,
    bottom: 28,
    maxWidth: 820,
  },
  title: {
    fontSize: 64,
    margin: "0 0 10px 0",
    color: "#ffffff",
    fontWeight: 600,
    letterSpacing: "-1px",
    lineHeight: 1.02,
  },
  text: {
    fontSize: 18,
    margin: 0,
    color: "rgba(255,255,255,0.92)",
    lineHeight: 1.6,
    fontWeight: 400,
    maxWidth: 760,
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
    borderRadius: "22px",
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
    borderRadius: "22px",
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
    color: "#214431",
    fontWeight: 600,
  },
  td: {
    padding: 14,
    border: "1px solid #d5e0d6",
    color: "#4a6b57",
    fontWeight: 400,
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
