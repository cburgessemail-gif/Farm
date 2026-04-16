import React, { useState } from "react";

const languages = ["English", "Spanish", "Tagalog", "Patwa", "Italian", "Hebrew"];

const roles = [
  {
    id: "guest",
    title: "Guest",
    subtitle: "See the vision, land story, and ecosystem.",
    image: "/GrowArea.jpg",
    color: "#9BE564",
  },
  {
    id: "customer",
    title: "Customer",
    subtitle: "Reserve food, understand pickup, and nutrition.",
    image: "/GrowArea2.jpg",
    color: "#6EC5FF",
  },
  {
    id: "grower",
    title: "Grower",
    subtitle: "Track crops, irrigation, and production.",
    image: "/GrowArea.jpg",
    color: "#F7B267",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    subtitle: "Monitor youth, safety, and attendance.",
    image: "/GrowArea2.jpg",
    color: "#FF6B6B",
  },
  {
    id: "youth",
    title: "Youth Workforce",
    subtitle: "Build skills, confidence, and pathways.",
    image: "/GrowArea.jpg",
    color: "#C77DFF",
  },
  {
    id: "admin",
    title: "Operations",
    subtitle: "Coordinate events, staffing, and flow.",
    image: "/GrowArea2.jpg",
    color: "#FFD93D",
  },
];

function panel(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(0,0,0,0.35)",
    borderRadius: "20px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.15)",
    ...extra,
  };
}

export default function App() {
  const [screen, setScreen] = useState<"welcome" | "demo">("welcome");
  const [role, setRole] = useState("guest");
  const [lang, setLang] = useState("English");

  const current = roles.find((r) => r.id === role)!;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(10,30,20,0.9), rgba(20,60,40,0.9)), url(/GrowArea.jpg)",
        backgroundSize: "cover",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ ...panel(), marginBottom: "20px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "36px", fontWeight: 800 }}>Bronson Family Farm</div>
            <div style={{ opacity: 0.8 }}>
              {screen === "welcome" ? "Grower Ecosystem Demo" : "Live Dashboard"}
            </div>
          </div>

          <div>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  margin: "4px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "1px solid white",
                  background: l === lang ? "#d7ff73" : "transparent",
                  color: l === lang ? "#173116" : "white",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* WELCOME */}
        {screen === "welcome" ? (
          <div style={panel()}>
            <h1 style={{ fontSize: "48px" }}>
              A real working ecosystem — not a presentation
            </h1>

            <p style={{ fontSize: "20px" }}>
              Bronson Family Farm, Farm & Family Alliance, Parker Farms, and the
              historic Lansdowne Airport working as one system.
            </p>

            <button
              onClick={() => setScreen("demo")}
              style={{
                marginTop: "20px",
                padding: "12px 20px",
                background: "#d7ff73",
                color: "#173116",
                borderRadius: "25px",
                fontWeight: 700,
              }}
            >
              Enter Live Demo →
            </button>
          </div>
        ) : (
          <>
            {/* ROLE GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              {roles.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  style={{
                    cursor: "pointer",
                    padding: "15px",
                    borderRadius: "20px",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${r.image})`,
                    backgroundSize: "cover",
                    border:
                      role === r.id
                        ? `3px solid ${r.color}`
                        : "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <h2>{r.title}</h2>
                  <p>{r.subtitle}</p>
                </div>
              ))}
            </div>

            {/* ROLE CONTENT */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
              <div style={panel()}>
                <h2 style={{ color: current.color }}>{current.title} Dashboard</h2>

                {role === "guest" && (
                  <p>Explore the story, land history, and community vision.</p>
                )}

                {role === "customer" && (
                  <p>Reserve produce, plan pickup, learn nutrition.</p>
                )}

                {role === "grower" && (
                  <ul>
                    <li>Watering schedule</li>
                    <li>Transplant tracking</li>
                    <li>Crop readiness</li>
                  </ul>
                )}

                {role === "supervisor" && (
                  <ul>
                    <li>Attendance: 94%</li>
                    <li>Safety: 100%</li>
                    <li>Team readiness: High</li>
                  </ul>
                )}

                {role === "youth" && (
                  <ul>
                    <li>Clock in</li>
                    <li>Learn skills</li>
                    <li>Work with team</li>
                  </ul>
                )}

                {role === "admin" && (
                  <ul>
                    <li>Event coordination</li>
                    <li>Inventory tracking</li>
                    <li>Volunteer scheduling</li>
                  </ul>
                )}
              </div>

              {/* SIDE PANEL */}
              <div style={panel()}>
                <h3>Marketplace</h3>
                <p>Tomatoes · Collards · Cabbage · Peppers</p>

                <h3 style={{ marginTop: "15px" }}>Weather</h3>
                <p>68° · Overcast · Wind 8 mph</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
