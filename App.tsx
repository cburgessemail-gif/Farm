import { useState } from "react";

type Role =
  | "guest"
  | "customer"
  | "grower"
  | "volunteer"
  | "youth"
  | "supervisor"
  | "admin";

type Screen = "home" | Role;

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const cardStyle: React.CSSProperties = {
    background: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: 240,
  };

  const roleButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #b8b8b8",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#2e7d32",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  function HomeScreen() {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3eee3",
          padding: 32,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* HERO SECTION WITH YOUR REAL FARM IMAGE */}
        <div
          style={{
            position: "relative",
            minHeight: 420,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 24,
            backgroundImage:
              "linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.35)), url('/GrowArea.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div style={{ padding: 32, color: "white", maxWidth: 700 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.85,
                marginBottom: 10,
              }}
            >
              Youngstown, Ohio • Appalachian Region
            </div>

            <h1 style={{ fontSize: 42, margin: 0 }}>
              Bronson Family Farm Ecosystem
            </h1>

            <p style={{ opacity: 0.92, marginTop: 12, marginBottom: 16 }}>
              A living model for food, workforce, and community-powered growth.
            </p>

            <button
              style={actionButtonStyle}
              onClick={() => setScreen("grower")}
            >
              Enter the Ecosystem
            </button>
          </div>
        </div>

        {/* ROLE ENTRY */}
        <div
          style={{
            background: "#eef3ec",
            padding: 20,
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          <h2>Enter the Ecosystem</h2>
          <p>Choose a role to explore the platform:</p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={roleButtonStyle} onClick={() => setScreen("guest")}>
              Guest
            </button>
            <button
              style={roleButtonStyle}
              onClick={() => setScreen("customer")}
            >
              Customer
            </button>
            <button
              style={roleButtonStyle}
              onClick={() => setScreen("grower")}
            >
              Grower
            </button>
            <button
              style={roleButtonStyle}
              onClick={() => setScreen("volunteer")}
            >
              Volunteer
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("youth")}>
              Youth
            </button>
            <button
              style={roleButtonStyle}
              onClick={() => setScreen("supervisor")}
            >
              Supervisor
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("admin")}>
              Admin
            </button>
          </div>
        </div>

        {/* INFO CARDS */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Grower Ecosystem</h3>
            <p>Inventory, crop planning, pricing, and marketplace.</p>
          </div>

          <div style={cardStyle}>
            <h3>Workforce Pathways</h3>
            <p>Youth development, supervision, and tracking.</p>
          </div>

          <div style={cardStyle}>
            <h3>Customer Access</h3>
            <p>Shopping, SNAP expansion, and engagement.</p>
          </div>
        </div>
      </div>
    );
  }

  function RoleLayout({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3eee3",
          padding: 32,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          onClick={() => setScreen("home")}
          style={{
            marginBottom: 20,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #b8b8b8",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Back to Home
        </button>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    );
  }

  if (screen === "grower") {
    return (
      <RoleLayout
        title="Grower Dashboard"
        description="Manage crops, inventory, and market readiness."
      />
    );
  }

  if (screen === "customer") {
    return (
      <RoleLayout
        title="Customer Marketplace"
        description="Shop produce and manage pickups."
      />
    );
  }

  if (screen === "admin") {
    return (
      <RoleLayout
        title="Admin Control Panel"
        description="Oversee operations and system activity."
      />
    );
  }

  if (screen === "guest") {
    return (
      <RoleLayout
        title="Guest Experience"
        description="Explore the farm and community vision."
      />
    );
  }

  if (screen === "volunteer") {
    return (
      <RoleLayout
        title="Volunteer Hub"
        description="Coordinate support and participation."
      />
    );
  }

  if (screen === "youth") {
    return (
      <RoleLayout
        title="Youth Workforce"
        description="Track learning and development."
      />
    );
  }

  if (screen === "supervisor") {
    return (
      <RoleLayout
        title="Supervisor Console"
        description="Manage teams and assignments."
      />
    );
  }

  return <HomeScreen />;
}
