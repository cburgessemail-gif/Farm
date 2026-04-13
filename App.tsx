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

  const roles: Role[] = [
    "guest",
    "customer",
    "grower",
    "volunteer",
    "youth",
    "supervisor",
    "admin",
  ];

  const shellStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f6f1e8",
    fontFamily: "Arial, sans-serif",
    color: "#1f2a1f",
  };

  const wrapStyle: React.CSSProperties = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 32,
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #d9d9d9",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 18px",
    background: "#2f6b3c",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  };

  const roleTitles: Record<Role, string> = {
    guest: "Welcome Center",
    customer: "Customer Marketplace",
    grower: "Grower Dashboard",
    volunteer: "Volunteer Hub",
    youth: "Youth Workforce Program",
    supervisor: "Supervisor Console",
    admin: "Admin Control Panel",
  };

  function HomeScreen() {
    return (
      <div>
        <h1 style={{ marginBottom: 8 }}>Bronson Family Farm Demo</h1>
        <p style={{ marginTop: 0, color: "#4b5b4b", maxWidth: 760 }}>
          Live ecosystem prototype for farm operations, community access,
          workforce pathways, grower coordination, and community commerce.
        </p>

        <div
          style={{
            ...cardStyle,
            marginTop: 24,
            background:
              "linear-gradient(135deg, #fffdf8 0%, #eef6ea 100%)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Enter the Ecosystem</h2>
          <p>
            Choose a role to step into a dedicated experience for that user.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setScreen(role)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #b8b8b8",
                  background: "#ffffff",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                Open {role}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 24,
          }}
        >
          <div style={cardStyle}>
            <h3>Grower Ecosystem</h3>
            <p>Inventory, crop planning, pricing, and shared marketplace flow.</p>
          </div>
          <div style={cardStyle}>
            <h3>Workforce Pathways</h3>
            <p>Youth learning, supervision, attendance, and development tracking.</p>
          </div>
          <div style={cardStyle}>
            <h3>Customer Access</h3>
            <p>Shopping, pickup, SNAP-ready expansion, and community engagement.</p>
          </div>
        </div>
      </div>
    );
  }

  function RoleScreen({ role }: { role: Role }) {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={() => setScreen("home")}
            style={{
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
        </div>

        <div
          style={{
            background: "#2f6b3c",
            color: "white",
            padding: "14px 18px",
            borderRadius: 12,
            display: "inline-block",
            fontWeight: 700,
            marginBottom: 20,
            textTransform: "capitalize",
          }}
        >
          {roleTitles[role]}
        </div>

        {role === "guest" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>About the Farm</h3>
              <p>Mission, land story, and community purpose.</p>
            </div>
            <div style={cardStyle}>
              <h3>Events</h3>
              <p>Growers Supply Market, tours, and public activities.</p>
            </div>
            <div style={cardStyle}>
              <h3>Get Involved</h3>
              <p>Shop, volunteer, partner, or support the work.</p>
            </div>
          </div>
        )}

        {role === "customer" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Shop Produce</h3>
              <p>Seedlings, produce, and featured farm items.</p>
            </div>
            <div style={cardStyle}>
              <h3>Pickup Scheduling</h3>
              <p>Reserve pickup windows and manage orders.</p>
            </div>
            <div style={cardStyle}>
              <h3>SNAP Access</h3>
              <p>Future EBT-eligible product flow and checkout logic.</p>
            </div>
          </div>
        )}

        {role === "grower" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Inventory</h3>
              <p>Available seedlings, produce, and ready-to-sell stock.</p>
            </div>
            <div style={cardStyle}>
              <h3>Crop Planning</h3>
              <p>Production schedule, varieties, and field priorities.</p>
            </div>
            <div style={cardStyle}>
              <h3>Pricing Engine</h3>
              <p>Consumer, institutional, and marketplace comparison logic.</p>
            </div>
          </div>
        )}

        {role === "volunteer" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Shift Sign-Up</h3>
              <p>Choose a time, task, and event support role.</p>
            </div>
            <div style={cardStyle}>
              <h3>Check-In</h3>
              <p>Arrival flow and on-site role coordination.</p>
            </div>
            <div style={cardStyle}>
              <h3>Task Board</h3>
              <p>See what needs attention today.</p>
            </div>
          </div>
        )}

        {role === "youth" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Daily Assignments</h3>
              <p>Hands-on activities, lessons, and work tasks.</p>
            </div>
            <div style={cardStyle}>
              <h3>Progress</h3>
              <p>Attendance, growth, and milestone tracking.</p>
            </div>
            <div style={cardStyle}>
              <h3>Career Pathways</h3>
              <p>Connection from farm work to future opportunities.</p>
            </div>
          </div>
        )}

        {role === "supervisor" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Attendance</h3>
              <p>Monitor who is present and where they are assigned.</p>
            </div>
            <div style={cardStyle}>
              <h3>Observations</h3>
              <p>Track strengths, needs, and progress notes.</p>
            </div>
            <div style={cardStyle}>
              <h3>Task Oversight</h3>
              <p>Guide work completion and team accountability.</p>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={cardStyle}>
              <h3>Operations</h3>
              <p>View ecosystem activity across roles and functions.</p>
            </div>
            <div style={cardStyle}>
              <h3>Approvals</h3>
              <p>Manage requests, permissions, and workflow actions.</p>
            </div>
            <div style={cardStyle}>
              <h3>Reports</h3>
              <p>Future reporting for inventory, participation, and sales.</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <button
            onClick={() => alert(`${roleTitles[role]} opened`)}
            style={buttonStyle}
          >
            Launch {roleTitles[role]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <div style={wrapStyle}>
        {screen === "home" ? <HomeScreen /> : <RoleScreen role={screen} />}
      </div>
    </div>
  );
}
