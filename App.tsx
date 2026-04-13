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
        <div
          style={{
            position: "relative",
            minHeight: 420,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 24,
            backgroundImage:
              "linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.35)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')",
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
    children,
  }: {
    title: string;
    description: string;
    children?: React.ReactNode;
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
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ marginTop: 0 }}>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
      </div>
    );
  }

  if (screen === "guest") {
    return (
      <RoleLayout
        title="Guest Experience"
        description="Public introduction to Bronson Family Farm, the mission, and upcoming opportunities."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>About the Farm</h3>
            <p>Learn about the land, purpose, and community vision.</p>
          </div>
          <div style={cardStyle}>
            <h3>Upcoming Events</h3>
            <p>See Growers Supply Market and public event information.</p>
          </div>
          <div style={cardStyle}>
            <h3>Get Involved</h3>
            <p>Volunteer, visit, partner, or support the mission.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "customer") {
    return (
      <RoleLayout
        title="Customer Marketplace"
        description="A simple customer-facing space for shopping, pickup, and future SNAP-ready expansion."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Shop Produce</h3>
            <p>Browse seedlings, produce, and featured farm offerings.</p>
          </div>
          <div style={cardStyle}>
            <h3>Pickup Flow</h3>
            <p>Reserve pickup windows and manage orders.</p>
          </div>
          <div style={cardStyle}>
            <h3>Community Access</h3>
            <p>Prepare for market participation and SNAP expansion.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "grower") {
    return (
      <RoleLayout
        title="Grower Dashboard"
        description="The grower experience for inventory, crop planning, pricing, and operations."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Inventory</h3>
            <p>Track seedlings, produce, and items ready for market.</p>
          </div>
          <div style={cardStyle}>
            <h3>Crop Planning</h3>
            <p>View planting priorities and production timing.</p>
          </div>
          <div style={cardStyle}>
            <h3>Pricing</h3>
            <p>Manage retail, market, and future institutional pricing.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "volunteer") {
    return (
      <RoleLayout
        title="Volunteer Hub"
        description="A volunteer coordination space for shifts, assignments, and community participation."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Shift Sign-Up</h3>
            <p>Choose event roles and volunteer support windows.</p>
          </div>
          <div style={cardStyle}>
            <h3>Check-In</h3>
            <p>Prepare for on-site arrival and coordination.</p>
          </div>
          <div style={cardStyle}>
            <h3>Task Board</h3>
            <p>See daily assignments and support needs.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "youth") {
    return (
      <RoleLayout
        title="Youth Workforce Program"
        description="A youth-focused space for assignments, growth, learning, and pathway development."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Daily Work</h3>
            <p>Review youth assignments and responsibilities.</p>
          </div>
          <div style={cardStyle}>
            <h3>Progress</h3>
            <p>Track milestones, attendance, and development.</p>
          </div>
          <div style={cardStyle}>
            <h3>Career Pathways</h3>
            <p>Connect agricultural skills to broader workforce futures.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "supervisor") {
    return (
      <RoleLayout
        title="Supervisor Console"
        description="A supervisor-facing space for assignments, oversight, and development tracking."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Assignments</h3>
            <p>See who is assigned where and what is due today.</p>
          </div>
          <div style={cardStyle}>
            <h3>Observation Notes</h3>
            <p>Track participation, growth, and support needs.</p>
          </div>
          <div style={cardStyle}>
            <h3>Status Review</h3>
            <p>Monitor work in progress and completed tasks.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  if (screen === "admin") {
    return (
      <RoleLayout
        title="Admin Control Panel"
        description="A high-level command view for operations, marketplace activity, and workforce oversight."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <h3>Operations</h3>
            <p>Monitor inventory, markets, and workflow activity.</p>
          </div>
          <div style={cardStyle}>
            <h3>Community System</h3>
            <p>View participation across roles and ecosystem functions.</p>
          </div>
          <div style={cardStyle}>
            <h3>Reports</h3>
            <p>Prepare future reporting for outcomes, inventory, and workforce.</p>
          </div>
        </div>
      </RoleLayout>
    );
  }

  return <HomeScreen />;
}
