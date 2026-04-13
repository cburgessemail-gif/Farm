import { useState } from "react";

type Role =
  | "guest"
  | "customer"
  | "grower"
  | "volunteer"
  | "youth"
  | "supervisor"
  | "admin";

export default function App() {
  const [role, setRole] = useState<Role>("guest");

  const roles: Role[] = [
    "guest",
    "customer",
    "grower",
    "volunteer",
    "youth",
    "supervisor",
    "admin",
  ];

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #d9d9d9",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const panelTitle: Record<Role, string> = {
    guest: "Welcome Center",
    customer: "Customer Marketplace",
    grower: "Grower Dashboard",
    volunteer: "Volunteer Hub",
    youth: "Youth Workforce Program",
    supervisor: "Supervisor Console",
    admin: "Admin Control Panel",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f1e8",
        fontFamily: "Arial, sans-serif",
        color: "#1f2a1f",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: 32,
        }}
      >
        <h1 style={{ marginBottom: 8 }}>Bronson Family Farm Demo</h1>
        <p style={{ marginTop: 0, color: "#4b5b4b" }}>
          Live ecosystem prototype for farm operations, community access, and workforce pathways.
        </p>

        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <h2 style={{ marginBottom: 12 }}>Select Role</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #b8b8b8",
                  background: role === r ? "#dff0d8" : "#ffffff",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: role === r ? 700 : 500,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              background: "#2f6b3c",
              color: "white",
              padding: "12px 16px",
              borderRadius: 10,
              display: "inline-block",
              fontWeight: 700,
            }}
          >
            Current Role: {role}
          </div>
        </div>

        <div style={{ ...cardStyle, marginBottom: 20 }}>
          <h2 style={{ marginTop: 0 }}>{panelTitle[role]}</h2>

          {role === "guest" && (
            <div>
              <p>Public-facing introduction to the farm, events, and mission.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>About the Farm</h3>
                  <p>Learn about the vision, land, and community purpose.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Upcoming Events</h3>
                  <p>Growers Supply Market, tours, and community days.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Get Involved</h3>
                  <p>Volunteer, shop, partner, or support the work.</p>
                </div>
              </div>
            </div>
          )}

          {role === "customer" && (
            <div>
              <p>Customer-facing shopping and pickup experience.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Shop Produce</h3>
                  <p>Seedlings, produce, and featured items.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Pickup Window</h3>
                  <p>Reserve pickup times and order fulfillment flow.</p>
                </div>
                <div style={cardStyle}>
                  <h3>SNAP Access</h3>
                  <p>Future SNAP-ready item flow and eligibility view.</p>
                </div>
              </div>
            </div>
          )}

          {role === "grower" && (
            <div>
              <p>Grower operations, crop planning, and inventory coordination.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Inventory</h3>
                  <p>Track seedlings, harvest quantities, and availability.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Crop Planning</h3>
                  <p>View planting, timing, and production priorities.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Pricing</h3>
                  <p>Compare market, retail, and internal pricing logic.</p>
                </div>
              </div>
            </div>
          )}

          {role === "volunteer" && (
            <div>
              <p>Volunteer engagement and event support space.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Shift Sign-Up</h3>
                  <p>Choose tasks and participation windows.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Check-In</h3>
                  <p>Arrival flow and on-site role coordination.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Task Board</h3>
                  <p>See what needs to be done today.</p>
                </div>
              </div>
            </div>
          )}

          {role === "youth" && (
            <div>
              <p>Youth workforce learning and participation area.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Daily Assignments</h3>
                  <p>View tasks, lessons, and hands-on farm work.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Progress</h3>
                  <p>Track attendance, growth, and milestones.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Career Pathways</h3>
                  <p>Connect farm skills to broader workforce development.</p>
                </div>
              </div>
            </div>
          )}

          {role === "supervisor" && (
            <div>
              <p>Supervisor oversight for team activity and development.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Attendance</h3>
                  <p>Monitor who is present and assigned.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Observations</h3>
                  <p>Track strengths, needs, and progress notes.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Task Oversight</h3>
                  <p>Guide work completion and accountability.</p>
                </div>
              </div>
            </div>
          )}

          {role === "admin" && (
            <div>
              <p>Top-level platform and operations view.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div style={cardStyle}>
                  <h3>Operations</h3>
                  <p>See ecosystem activity across roles.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Approvals</h3>
                  <p>Manage requests, permissions, and workflows.</p>
                </div>
                <div style={cardStyle}>
                  <h3>Reports</h3>
                  <p>Future reporting for inventory, participation, and sales.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => alert(`${role} panel opened`)}
          style={{
            padding: "12px 18px",
            background: "#2f6b3c",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Open {role.charAt(0).toUpperCase() + role.slice(1)} Panel
        </button>
      </div>
    </div>
  );
}
