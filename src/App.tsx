import React, { useMemo, useState } from "react";

type Role =
  | "home"
  | "guest"
  | "customer"
  | "grower"
  | "producer"
  | "youth"
  | "admin"
  | "market";

type YouthTab = "overview" | "parent" | "supervisor";

export default function App() {
  const [role, setRole] = useState<Role>("home");
  const [youthTab, setYouthTab] = useState<YouthTab>("overview");

  const now = useMemo(() => {
    return new Date().toLocaleString();
  }, [role]);

  const nav = [
    ["Home", "home"],
    ["Guest", "guest"],
    ["Customer", "customer"],
    ["Grower", "grower"],
    ["Producer", "producer"],
    ["Youth", "youth"],
    ["Admin", "admin"],
    ["Market", "market"],
  ] as [string, Role][];

  const bg = {
    home: "#0f2419",
    guest: "#173524",
    customer: "#1b3b2c",
    grower: "#19351c",
    producer: "#3b2b18",
    youth: "#1d2f45",
    admin: "#2a213b",
    market: "#3a2f14",
  }[role];

  const card = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 20,
    padding: 18,
  } as React.CSSProperties;

  const btn = (active: boolean): React.CSSProperties => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: active ? "1px solid #dff3c7" : "1px solid rgba(255,255,255,.14)",
    background: active ? "#dff3c7" : "rgba(255,255,255,.08)",
    color: active ? "#132114" : "#fff",
    cursor: "pointer",
    fontWeight: 700,
  });

  const sectionTitle = (t: string) => (
    <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 14 }}>{t}</div>
  );

  const shell = (title: string, subtitle: string, body: React.ReactNode) => (
    <div
      style={{
        minHeight: "100vh",
        background: bg,
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1450, margin: "0 auto", padding: 18 }}>
        {/* NAV */}
        <div
          style={{
            ...card,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 18,
            position: "sticky",
            top: 10,
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          {nav.map(([label, key]) => (
            <button
              key={key}
              onClick={() => setRole(key)}
              style={btn(role === key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* HEADER */}
        <div style={{ ...card, marginBottom: 18 }}>
          <div style={{ fontSize: 42, fontWeight: 900 }}>{title}</div>
          <div
            style={{
              marginTop: 8,
              fontSize: 18,
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>

        {body}
      </div>
    </div>
  );

  if (role === "home") {
    return shell(
      "Bronson Family Farm Ecosystem",
      "A working platform connecting land, food, growers, customers, youth workforce, family wellness, and future opportunity.",
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 18,
        }}
      >
        <div style={{ ...card }}>
          {sectionTitle("Live Ecosystem Snapshot")}
          <div style={{ lineHeight: 1.8 }}>
            • Visitors exploring pathways<br />
            • Customers browsing produce and nutrition tools<br />
            • Growers using crop planner<br />
            • Youth workforce in session<br />
            • Market events being prepared
          </div>

          <div style={{ marginTop: 18 }}>
            <button style={btn(true)} onClick={() => setRole("guest")}>
              Enter Platform
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <div style={card}>
            {sectionTitle("Weather")}
            64°F Partly Cloudy<br />
            Strong day for field activity
          </div>

          <div style={card}>
            {sectionTitle("Crop Planner")}
            Tomatoes → Active<br />
            Greens → Ready<br />
            Peppers → Monitor warmth
          </div>

          <div style={card}>
            {sectionTitle("Clock")}
            {now}
          </div>
        </div>
      </div>
    );
  }

  if (role === "guest") {
    return shell(
      "Guest Portal",
      "Learn what Bronson Family Farm is, why it matters, and how to participate.",
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 18,
        }}
      >
        <div style={card}>
          {sectionTitle("Discover")}
          • Place-based ecosystem model<br />
          • Land restoration mission<br />
          • Family legacy and agriculture<br />
          • Events and community access<br />
          • Partnerships and future growth
        </div>

        <div style={card}>
          {sectionTitle("Next Steps")}
          <button style={btn(false)} onClick={() => setRole("customer")}>
            Become Customer
          </button>
          <br />
          <br />
          <button style={btn(false)} onClick={() => setRole("market")}>
            Visit Marketplace
          </button>
        </div>
      </div>
    );
  }

  if (role === "customer") {
    return shell(
      "Customer Portal",
      "Healthy food access, recipes, nutrition education, and buying pathways.",
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 18,
        }}
      >
        <div style={card}>
          {sectionTitle("Fresh Availability")}
          • Tomatoes<br />
          • Collards<br />
          • Cabbage<br />
          • Lettuce<br />
          • Broccoli<br />
          • Peppers
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <div style={card}>
            {sectionTitle("Nutrition")}
            Replace overprocessed food with natural options.
          </div>

          <div style={card}>
            {sectionTitle("Recipes")}
            Greens bowls • Salsa • Garden salads
          </div>

          <div style={card}>
            <button style={btn(true)} onClick={() => setRole("market")}>
              Go to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (role === "grower") {
    return shell(
      "Grower Operations",
      "Field decisions, weather, crop timing, and production planning.",
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 18,
        }}
      >
        <div style={card}>
          {sectionTitle("Crop Planner")}
          Tomatoes → transplant check<br />
          Greens → succession planting<br />
          Cabbage → inspect pests<br />
          Melons → prep zone<br />
          Beans → next wave
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <div style={card}>
            {sectionTitle("Weather")}
            64°F · Light wind<br />
            Good irrigation window
          </div>

          <div style={card}>
            {sectionTitle("Field Notes")}
            Clay soil sections need drainage review.
          </div>
        </div>
      </div>
    );
  }

  if (role === "producer") {
    return shell(
      "Value-Added Producer",
      "Products, packaging, storytelling, event sales, and ecosystem visibility.",
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div style={card}>
          {sectionTitle("Product Pathways")}
          • Bubble Babies™<br />
          • Seedlings<br />
          • Educational kits<br />
          • Seasonal bundles
        </div>

        <div style={card}>
          {sectionTitle("Growth Channels")}
          • Farmers Markets<br />
          • Events<br />
          • Online preorders<br />
          • Community partnerships
        </div>
      </div>
    );
  }

  if (role === "youth") {
    return shell(
      "Youth Workforce Platform",
      "Hands-on learning, responsibility, structure, family connection, and future readiness.",
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 18,
        }}
      >
        <div style={card}>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <button
              style={btn(youthTab === "overview")}
              onClick={() => setYouthTab("overview")}
            >
              Overview
            </button>
            <button
              style={btn(youthTab === "parent")}
              onClick={() => setYouthTab("parent")}
            >
              Parent Portal
            </button>
            <button
              style={btn(youthTab === "supervisor")}
              onClick={() => setYouthTab("supervisor")}
            >
              Supervisor
            </button>
          </div>

          {youthTab === "overview" && (
            <>
              {sectionTitle("Youth Dashboard")}
              • Attendance<br />
              • Work teams<br />
              • Skill growth<br />
              • Confidence building<br />
              • Leadership readiness
            </>
          )}

          {youthTab === "parent" && (
            <>
              {sectionTitle("Parent Portal")}
              • Progress visibility<br />
              • Communication updates<br />
              • Schedule awareness<br />
              • Family engagement
            </>
          )}

          {youthTab === "supervisor" && (
            <>
              {sectionTitle("Supervisor Tools")}
              • Team oversight<br />
              • Support interventions<br />
              • Daily assignments<br />
              • Progress tracking
            </>
          )}
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          <div style={card}>
            {sectionTitle("Today's Focus")}
            Garden prep + teamwork + professionalism
          </div>

          <div style={card}>
            {sectionTitle("Support")}
            Wellness and structured guidance available.
          </div>
        </div>
      </div>
    );
  }

  if (role === "admin") {
    return shell(
      "Leadership Dashboard",
      "Whole-system visibility across pathways, participation, operations, and planning.",
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        <div style={card}>
          {sectionTitle("Participation")}
          Guests 24<br />
          Customers 18<br />
          Youth 11
        </div>

        <div style={card}>
          {sectionTitle("Operations")}
          Water planning active<br />
          Vendor calls pending
        </div>

        <div style={card}>
          {sectionTitle("Growth")}
          Strong ecosystem interest
        </div>
      </div>
    );
  }

  return shell(
    "Marketplace",
    "Where produce, education, and community buying activity meet.",
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <div style={card}>
        {sectionTitle("Products")}
        • Produce<br />
        • Seedlings<br />
        • Garden items<br />
        • Event specials
      </div>

      <div style={card}>
        {sectionTitle("Community")}
        • Pickup events<br />
        • Farmers market days<br />
        • Learning demonstrations
      </div>
    </div>
  );
}
