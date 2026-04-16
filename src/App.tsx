import React, { useMemo, useState } from "react";

const languages = ["English", "Spanish", "Tagalog", "Patwa", "Italian", "Hebrew"];

const roleCards = [
  {
    id: "guest",
    title: "Guest",
    subtitle: "See the vision, land story, event flow, and community purpose.",
  },
  {
    id: "customer",
    title: "Customer",
    subtitle: "Reserve produce, understand pickup, and explore healthy food choices.",
  },
  {
    id: "grower",
    title: "Grower",
    subtitle: "Track crops, tasks, growing conditions, and daily priorities.",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    subtitle: "Monitor youth assignments, safety, attendance, and progress.",
  },
  {
    id: "youth",
    title: "Youth Workforce",
    subtitle: "Build confidence, work skills, responsibility, and pathway readiness.",
  },
  {
    id: "admin",
    title: "Operations",
    subtitle: "Coordinate events, produce flow, staffing, and check-in systems.",
  },
];

const weatherCards = [
  { day: "Thu", temp: "62°", note: "Transplant prep" },
  { day: "Fri", temp: "66°", note: "Watering window" },
  { day: "Sat", temp: "69°", note: "Event-friendly" },
  { day: "Sun", temp: "64°", note: "Mulch and check beds" },
];

const calendarItems = [
  { time: "8:00 AM", task: "Youth orientation and safety check", zone: "Welcome Tent" },
  { time: "9:30 AM", task: "Seedling care and irrigation review", zone: "Grow Area" },
  { time: "11:00 AM", task: "Nutrition and diabetes-friendly food talk", zone: "Learning Station" },
  { time: "1:00 PM", task: "Inventory sorting and pickup prep", zone: "Produce Command" },
];

const produceCards = [
  { name: "Tomato Seedlings", count: 24, note: "Ready for reservation" },
  { name: "Collard Greens", count: 40, note: "High-demand crop" },
  { name: "Cabbage", count: 100, note: "Strong inventory" },
  { name: "Peppers", count: 24, note: "Transplanting cycle" },
  { name: "Bubble Babies", count: 18, note: "Education + starter sales" },
  { name: "Lettuce", count: 30, note: "Fast pickup turnover" },
];

const youthTasks = [
  "Clock-in and PPE check",
  "Watering team rotation",
  "Transplant assistance",
  "Produce washing and sorting",
  "Customer greeting practice",
  "Reflection and skill journal",
];

const supervisorNotes = [
  { name: "Team Readiness", value: "High" },
  { name: "Attendance", value: "94%" },
  { name: "Safety Completion", value: "100%" },
  { name: "Leadership Growth", value: "Strong" },
];

function buttonStyle(active = false): React.CSSProperties {
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
  };
}

function panelStyle(extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    ...extra,
  };
}

function smallCardStyle(extra: React.CSSProperties = {}): React.CSSProperties {
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
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("guest");

  const currentRole = useMemo(
    () => roleCards.find((r) => r.id === role) ?? roleCards[0],
    [role]
  );

  const roleFocus: Record<string, string> = {
    guest: "Explore the farm, event flow, ecosystem story, and community mission.",
    customer: "Reserve seedlings, pickup times, and healthy food guidance.",
    grower: "Track beds, tasks, weather, and crop readiness.",
    supervisor: "Monitor youth teams, safety, attendance, and progress.",
    youth: "Learn, work, grow confidence, and build your pathway.",
    admin: "Coordinate inventory, events, check-in, and staffing.",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(15,47,27,0.88), rgba(21,70,40,0.88)), url(/GrowArea.jpg)",
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
            ...panelStyle({
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
            <div style={{ fontSize: "22px", opacity: 0.95 }}>Grower Ecosystem Demo</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {languages.map((l) => (
              <button key={l} onClick={() => setLang(l)} style={buttonStyle(lang === l)}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {!started ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
              gap: "20px",
            }}
          >
            <div style={panelStyle({ background: "rgba(0,0,0,0.22)", minHeight: "560px" })}>
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

              <h1 style={{ fontSize: "60px", lineHeight: 1.05, margin: "0 0 18px 0" }}>
                A welcoming, visual, role-based farm platform built for community use.
              </h1>

              <p style={{ fontSize: "24px", lineHeight: 1.5, maxWidth: "980px" }}>
                This demo shows how Bronson Family Farm, Farm & Family Alliance, Parker Farms,
                and the historic Lansdowne Airport site work together as one connected ecosystem.
              </p>

              <p style={{ fontSize: "18px", lineHeight: 1.6, maxWidth: "980px", opacity: 0.95 }}>
                Agriculture, workforce, family wellness, and community infrastructure in one
                living ecosystem.
              </p>

              <div style={{ display: "grid", gap: "12px", marginTop: "22px" }}>
                <div style={smallCardStyle()}>
                  <strong>Bronson Family Farm</strong> operates as a regenerative, off-grid
                  agritourism and food system hub on the historic Lansdowne Airport grounds in
                  Youngstown, Ohio.
                </div>

                <div style={smallCardStyle()}>
                  <strong>Farm &amp; Family Alliance</strong> serves as the nonprofit partner,
                  focused on workforce training, youth development, volunteer coordination,
                  education, and community impact.
                </div>

                <div style={smallCardStyle()}>
                  <strong>Parker Farms</strong> represents a regional growing partner and
                  marketplace model, supporting distribution, SNAP access, and grower collaboration
                  across the Mahoning Valley.
                </div>

                <div style={smallCardStyle()}>
                  <strong>Lansdowne Airport (Historic Site)</strong> provides the land foundation
                  for this work. Once an active aviation site, it is now being reimagined as a
                  place where land, food, learning, and community reconnect.
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button
                  onClick={() => setStarted(true)}
                  style={{
                    ...buttonStyle(true),
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
              <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px" }}>
                  Growers Supply Market
                </div>
                <div style={{ display: "grid", gap: "10px" }}>
                  <div style={smallCardStyle()}>Saturday, May 16 · 9:00 AM–2:00 PM</div>
                  <div style={smallCardStyle()}>Bronson Family Farm · Youngstown, Ohio</div>
                  <div style={smallCardStyle()}>
                    Tools, growers, produce, wellness, workshops, workforce pathways, and
                    community check-in.
                  </div>
                </div>
              </div>

              <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
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
                    <div key={name} style={smallCardStyle()}>
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
                ...panelStyle({ background: "rgba(0,0,0,0.22)" }),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontSize: "12px",
                    opacity: 0.72,
                    marginBottom: "8px",
                  }}
                >
                  Choose an Experience
                </div>
                <div style={{ fontSize: "34px", fontWeight: 800 }}>{currentRole.title}</div>
                <div style={{ fontSize: "18px", opacity: 0.92 }}>{currentRole.subtitle}</div>
              </div>

              <div>
                <button onClick={() => setStarted(false)} style={buttonStyle(false)}>
                  Back to Welcome
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(180px, 1fr))",
                gap: "14px",
              }}
            >
              {roleCards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => setRole(card.id)}
                  style={{
                    cursor: "pointer",
                    minHeight: "220px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    padding: "16px",
                    border:
                      role === card.id
                        ? "2px solid rgba(215,255,115,0.9)"
                        : "1px solid rgba(255,255,255,0.14)",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.38), rgba(0,0,0,0.58)), url(${
                      index % 2 === 0 ? "/GrowArea.jpg" : "/GrowArea2.jpg"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow:
                      role === card.id ? "0 0 0 3px rgba(215,255,115,0.16)" : undefined,
                  }}
                >
                  <div style={{ fontSize: "26px", fontWeight: 800, marginBottom: "12px" }}>
                    {card.title}
                  </div>
                  <div style={{ lineHeight: 1.5, fontSize: "15px" }}>{card.subtitle}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.1fr) minmax(360px, 0.9fr)",
                gap: "20px",
              }}
            >
              <div style={{ display: "grid", gap: "20px" }}>
                <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Role Overview
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                    }}
                  >
                    <div style={smallCardStyle()}>
                      <div style={{ opacity: 0.72, marginBottom: "8px" }}>Today's Focus</div>
                      <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "10px" }}>
                        {roleFocus[role]}
                      </div>
                      <div style={{ lineHeight: 1.6, opacity: 0.92 }}>
                        This experience is designed to feel useful, welcoming, and active.
                      </div>
                    </div>

                    <div style={smallCardStyle()}>
                      <div style={{ opacity: 0.72, marginBottom: "8px" }}>Next Steps</div>
                      <div style={{ display: "grid", gap: "10px" }}>
                        {[
                          "Role-specific dashboards",
                          "Calendar-aware scheduling",
                          "QR check-in and engagement",
                          "Education, wellness, and produce operations",
                        ].map((item) => (
                          <div key={item} style={{ display: "flex", gap: "8px" }}>
                            <span style={{ color: "#d7ff73", fontWeight: 900 }}>•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
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
                    {weatherCards.map((item) => (
                      <div key={item.day} style={smallCardStyle()}>
                        <div style={{ opacity: 0.72 }}>{item.day}</div>
                        <div style={{ fontSize: "38px", fontWeight: 900 }}>{item.temp}</div>
                        <div style={{ opacity: 0.9 }}>{item.note}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                    <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                      Grower Calendar
                    </div>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {calendarItems.map((item) => (
                        <div key={item.time + item.task} style={smallCardStyle()}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "10px",
                            }}
                          >
                            <div>
                              <div style={{ opacity: 0.72 }}>{item.time}</div>
                              <div style={{ fontWeight: 700, marginTop: "4px" }}>{item.task}</div>
                            </div>
                            <div
                              style={{
                                background: "rgba(255,255,255,0.10)",
                                borderRadius: "999px",
                                padding: "6px 10px",
                                height: "fit-content",
                              }}
                            >
                              {item.zone}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                    <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                      Alerts
                    </div>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {[
                        "Rain buffer available for outdoor learning rotation.",
                        "Inventory reservation active for seedlings and Bubble Babies.",
                        "Check-in flow ready for role-based arrival and volunteer routing.",
                        "Wellness programming can be paired with nutrition education and movement activities.",
                      ].map((item) => (
                        <div key={item} style={smallCardStyle()}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "20px" }}>
                <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Marketplace
                  </div>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {produceCards.map((item) => (
                      <div key={item.name} style={smallCardStyle()}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700 }}>{item.name}</div>
                            <div style={{ opacity: 0.75, marginTop: "4px" }}>{item.note}</div>
                          </div>
                          <div
                            style={{
                              background: "rgba(215,255,115,0.18)",
                              color: "#e7ffc5",
                              borderRadius: "999px",
                              padding: "6px 10px",
                              height: "fit-content",
                              fontWeight: 800,
                            }}
                          >
                            {item.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <button
                      style={{
                        ...buttonStyle(true),
                        width: "100%",
                        justifyContent: "center",
                        padding: "12px 16px",
                      }}
                    >
                      Reserve Pickup
                    </button>
                  </div>
                </div>

                <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    Workforce Pathways
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {youthTasks.map((task) => (
                      <div key={task} style={smallCardStyle()}>
                        {task}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={panelStyle({ background: "rgba(0,0,0,0.22)" })}>
                  <div style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>
                    {role === "supervisor" ? "Supervisor Snapshot" : "Produce & Inventory"}
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {(role === "supervisor"
                      ? supervisorNotes
                      : [
                          { name: "Wash/Sort Queue", value: "Open" },
                          { name: "Reserved Orders", value: "14" },
                          { name: "Volunteer Stations", value: "6" },
                          { name: "Pickup Windows", value: "Active" },
                        ]
                    ).map((item) => (
                      <div key={item.name} style={smallCardStyle()}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <span>{item.name}</span>
                          <strong>{item.value}</strong>
                        </div>
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
