import React, { useState } from "react";

const languages = ["English", "Spanish", "Tagalog", "Patwa", "Italian", "Hebrew"];

const roles = [
  {
    id: "guest",
    title: "Guest",
    subtitle: "See the vision, land story, event flow, and community purpose.",
    image: "/GrowArea.jpg",
  },
  {
    id: "customer",
    title: "Customer",
    subtitle: "Reserve produce, understand pickup, and explore healthy food choices.",
    image: "/GrowArea2.jpg",
  },
  {
    id: "grower",
    title: "Grower",
    subtitle: "Track crops, tasks, growing conditions, and daily priorities.",
    image: "/GrowArea3.jpg",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    subtitle: "Monitor youth assignments, safety, attendance, and progress.",
    image: "/GrowArea4.jpg",
  },
  {
    id: "youth",
    title: "Youth Workforce",
    subtitle: "Build confidence, work skills, responsibility, and pathway readiness.",
    image: "/GrowArea5.jpg",
  },
  {
    id: "admin",
    title: "Operations",
    subtitle: "Coordinate events, produce flow, staffing, and check-in systems.",
    image: "/GrowArea6.jpg",
  },
];

function btnStyle(active = false): React.CSSProperties {
  return {
    marginRight: "8px",
    marginBottom: "8px",
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: active ? "#d7ff73" : "rgba(255,255,255,0.08)",
    color: active ? "#173116" : "white",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "14px",
  };
}

function panel(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    ...extra,
  };
}

function card(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    padding: "16px",
    ...extra,
  };
}

export default function App() {
  const [lang, setLang] = useState("English");
  const [screen, setScreen] = useState<"welcome" | "demo">("welcome");
  const [role, setRole] = useState("guest");

  const selectedRole = roles.find((r) => r.id === role) || roles[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          screen === "welcome"
            ? "linear-gradient(rgba(15,47,27,0.88), rgba(21,70,40,0.88)), url(/GrowArea.jpg)"
            : "linear-gradient(rgba(8,28,18,0.90), rgba(18,62,38,0.90)), url(/GrowArea2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            ...panel({
              background: "rgba(0,0,0,0.22)",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }),
          }}
        >
          <div>
            <div style={{ fontSize: "42px", fontWeight: 800 }}>Bronson Family Farm</div>
            <div style={{ fontSize: "22px", opacity: 0.95 }}>
              {screen === "welcome" ? "Grower Ecosystem Demo" : "Live Demo Dashboard"}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {languages.map((l) => (
              <button key={l} onClick={() => setLang(l)} style={btnStyle(lang === l)}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {screen === "welcome" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
              gap: "20px",
            }}
          >
            <div style={panel({ background: "rgba(0,0,0,0.22)", minHeight: "560px" })}>
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "rgba(215,255,115,0.18)",
                  color: "#e7ffc5",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                Live Now
              </div>

              <h1 style={{ fontSize: "56px", lineHeight: 1.05, margin: "0 0 18px 0" }}>
                A welcoming, visual, role-based farm platform built for community use.
              </h1>

              <p style={{ fontSize: "24px", lineHeight: 1.5, maxWidth: "980px" }}>
                This demo shows how Bronson Family Farm, Farm &amp; Family Alliance,
                Parker Farms, and the historic Lansdowne Airport site work together
                as one connected ecosystem.
              </p>

              <p style={{ fontSize: "18px", lineHeight: 1.6, maxWidth: "980px", opacity: 0.95 }}>
                Agriculture, workforce, family wellness, and community infrastructure
                in one living ecosystem.
              </p>

              <div style={{ display: "grid", gap: "12px", marginTop: "22px" }}>
                <div style={card()}>
                  <strong>Bronson Family Farm</strong> operates as a regenerative, off-grid
                  agritourism and food system hub on the historic Lansdowne Airport grounds
                  in Youngstown, Ohio.
                </div>

                <div style={card()}>
                  <strong>Farm &amp; Family Alliance</strong> serves as the nonprofit partner,
                  focused on workforce training, youth development, volunteer coordination,
                  education, and community impact.
                </div>

                <div style={card()}>
                  <strong>Parker Farms</strong> represents a regional growing partner and
                  marketplace model, supporting distribution, SNAP access, and grower
                  collaboration across the Mahoning Valley.
                </div>

                <div style={card()}>
                  <strong>Lansdowne Airport (Historic Site)</strong> provides the land
                  foundation for this work. Once an active aviation site, it is now being
                  reimagined as a place where land, food, learning, and community reconnect.
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button
                  type="button"
                  onClick={() => setScreen("demo")}
                  style={{
                    ...btnStyle(true),
                    padding: "14px 20px",
                    fontSize: "18px",
                  }}
                >
                  Enter Live Demo →
                </button>
              </div>

              <div style={{ marginTop: "18px", fontSize: "16px", opacity: 0.9 }}>
                Current Language: <strong>{lang}</strong>
              </div>
            </div>

            <div style={{ display: "grid", gap: "20px" }}>
              <div style={panel({ background: "rgba(0,0,0,0.22)" })}>
                <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>
                  Growers Supply Market
                </div>
                <div style={{ display: "grid", gap: "10px" }}>
                  <div style={card()}>Saturday, May 16 · 9:00 AM–2:00 PM</div>
                  <div style={card()}>Bronson Family Farm · Youngstown, Ohio</div>
                  <div style={card()}>
                    Tools, growers, produce, wellness, workshops, workforce pathways,
                    and community check-in.
                  </div>
                </div>
              </div>

              <div style={panel({ background: "rgba(0,0,0,0.22)" })}>
                <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>
                  Multilingual Access
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {languages.map((name) => (
                    <div key={name} style={card()}>
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            <div
              style={{
                ...panel({
                  background: "rgba(0,0,0,0.30)",
                  textAlign: "center",
                }),
              }}
            >
              <div style={{ fontSize: "14px", letterSpacing: "0.18em", opacity: 0.72 }}>
                DEMO IS ACTIVE
              </div>
              <div style={{ fontSize: "52px", fontWeight: 900, marginTop: "8px" }}>
                LIVE ROLE DASHBOARD
              </div>
              <div style={{ fontSize: "20px", opacity: 0.92, marginTop: "8px" }}>
                Current role: <strong>{selectedRole.title}</strong>
              </div>
              <div style={{ marginTop: "16px" }}>
                <button type="button" onClick={() => setScreen("welcome")} style={btnStyle(false)}>
                  Back to Welcome
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(240px, 1fr))",
                gap: "14px",
              }}
            >
              {roles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  style={{
                    cursor: "pointer",
                    minHeight: "180px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    padding: "16px",
                    border:
                      role === item.id
                        ? "2px solid rgba(215,255,115,0.9)"
                        : "1px solid rgba(255,255,255,0.14)",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.58)), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div style={{ fontSize: "24px", fontWeight: 800, marginBottom: "10px" }}>
                    {item.title}
                  </div>
                  <div style={{ lineHeight: 1.5, fontSize: "15px" }}>{item.subtitle}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: "20px",
              }}
            >
              <div style={{ display: "grid", gap: "20px" }}>
                <div style={panel({ background: "rgba(0,0,0,0.26)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Role Overview
                  </div>
                  <div style={card()}>
                    <div style={{ opacity: 0.72, marginBottom: "8px" }}>Active Role</div>
                    <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "10px" }}>
                      {selectedRole.title}
                    </div>
                    <div style={{ lineHeight: 1.6, opacity: 0.92 }}>{selectedRole.subtitle}</div>
                  </div>
                </div>

                <div style={panel({ background: "rgba(0,0,0,0.26)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Youngstown Farm Weather
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "12px",
                    }}
                  >
                    {[
                      { day: "Thu", temp: "62°", note: "Transplant prep" },
                      { day: "Fri", temp: "66°", note: "Watering window" },
                      { day: "Sat", temp: "69°", note: "Event-friendly" },
                      { day: "Sun", temp: "64°", note: "Mulch and check beds" },
                    ].map((item) => (
                      <div key={item.day} style={card()}>
                        <div style={{ opacity: 0.72 }}>{item.day}</div>
                        <div style={{ fontSize: "36px", fontWeight: 900 }}>{item.temp}</div>
                        <div style={{ opacity: 0.9 }}>{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "20px" }}>
                <div style={panel({ background: "rgba(0,0,0,0.26)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Marketplace
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {[
                      "Tomato Seedlings · 24",
                      "Collard Greens · 40",
                      "Cabbage · 100",
                      "Peppers · 24",
                      "Bubble Babies · 18",
                      "Lettuce · 30",
                    ].map((item) => (
                      <div key={item} style={card()}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={panel({ background: "rgba(0,0,0,0.26)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Workforce Pathways
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {[
                      "Clock-in and PPE check",
                      "Watering team rotation",
                      "Transplant assistance",
                      "Produce washing and sorting",
                      "Customer greeting practice",
                      "Reflection and skill journal",
                    ].map((item) => (
                      <div key={item} style={card()}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
