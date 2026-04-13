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
          color: "#1f1f1f",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: 460,
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
          <div style={{ padding: 32, color: "white", maxWidth: 760 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.9,
                marginBottom: 10,
              }}
            >
              118+ Acres • Youngstown, Ohio • Appalachian Region
            </div>

            <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: 0 }}>
              Bronson Family Farm Ecosystem
            </h1>

            <p
              style={{
                opacity: 0.95,
                marginTop: 14,
                marginBottom: 18,
                fontSize: 18,
                lineHeight: 1.5,
                maxWidth: 680,
              }}
            >
              A living model built on 118+ acres in Youngstown’s Appalachian
              region—designed to restore food access, create workforce pathways,
              and build a community-powered agricultural economy.
            </p>

            <button
              style={actionButtonStyle}
              onClick={() => setScreen("grower")}
            >
              Start Guided Demo
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
              Land Base
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
              118+
            </div>
            <div>Acres positioned for long-term agricultural growth</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
              Workforce Model
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
              8
            </div>
            <div>Weeks of youth workforce development programming</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
              Production Focus
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
              3+
            </div>
            <div>Acres actively moving toward growing and demonstration use</div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
              Community Vision
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>
              1,000
            </div>
            <div>People envisioned for future impact through expansion</div>
          </div>
        </div>

        <div
          style={{
            background: "#eef3ec",
            padding: 20,
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Enter the Ecosystem</h2>
          <p>Choose a role to explore the platform.</p>

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

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              ...cardStyle,
              minHeight: 220,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.9)), url('/GrowArea2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>Grower Ecosystem</h3>
            <p>Inventory, crop planning, pricing, and marketplace readiness.</p>
          </div>

          <div
            style={{
              ...cardStyle,
              minHeight: 220,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.9)), url('/GrowArea.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>Workforce Pathways</h3>
            <p>Youth development, supervision, and real-world skill building.</p>
          </div>

          <div
            style={{
              ...cardStyle,
              minHeight: 220,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.9)), url('/GrowArea2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3>Customer Access</h3>
            <p>Shopping, pickup flow, SNAP expansion, and community engagement.</p>
          </div>
        </div>
      </div>
    );
  }

  function RoleLayout({
    title,
    description,
    image,
  }: {
    title: string;
    description: string;
    image: string;
  }) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f3eee3",
          padding: 32,
          fontFamily: "Arial, sans-serif",
          color: "#1f1f1f",
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
            minHeight: 240,
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 20,
            backgroundImage:
              `linear-gradient(rgba(20,20,20,0.35), rgba(20,20,20,0.2)), url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div style={{ padding: 24, color: "white" }}>
            <h1 style={{ margin: 0 }}>{title}</h1>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 0 }}>
            {description}
          </p>

          <div style={{ marginTop: 20 }}>
            <button
              style={actionButtonStyle}
              onClick={() => setScreen("home")}
            >
              Return to Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "grower") {
    return (
      <RoleLayout
        title="Grower Dashboard"
        description="This is where food begins. Growers track production, manage crops, and prepare inventory for market—creating a sustainable local food system."
        image="/GrowArea2.jpg"
      />
    );
  }

  if (screen === "customer") {
    return (
      <RoleLayout
        title="Customer Marketplace"
        description="This is how the community accesses food. Customers can shop, reserve pickups, and eventually use SNAP—ensuring equitable food access."
        image="/GrowArea.jpg"
      />
    );
  }

  if (screen === "admin") {
    return (
      <RoleLayout
        title="Admin Control Panel"
        description="This is the command center. Leadership can track operations, workforce progress, and community impact in real time."
        image="/GrowArea2.jpg"
      />
    );
  }

  if (screen === "guest") {
    return (
      <RoleLayout
        title="Guest Experience"
        description="This is the front door to the vision. Guests encounter the story, the land, and the opportunity to become part of a larger community transformation."
        image="/GrowArea.jpg"
      />
    );
  }

  if (screen === "volunteer") {
    return (
      <RoleLayout
        title="Volunteer Hub"
        description="This is where community support becomes action. Volunteers can help power events, daily farm activity, and public engagement."
        image="/GrowArea2.jpg"
      />
    );
  }

  if (screen === "youth") {
    return (
      <RoleLayout
        title="Youth Workforce"
        description="This is where workforce begins. Youth learn responsibility, gain real skills, and build pathways into agriculture, business, and community leadership."
        image="/GrowArea.jpg"
      />
    );
  }

  if (screen === "supervisor") {
    return (
      <RoleLayout
        title="Supervisor Console"
        description="This is where accountability and development meet. Supervisors guide progress, support growth, and help ensure work is completed with excellence."
        image="/GrowArea2.jpg"
      />
    );
  }

  return <HomeScreen />;
}
