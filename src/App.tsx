import React, { useState } from "react";

const roles = [
  "Guest",
  "Customer",
  "Grower",
  "Volunteer",
  "Youth Worker",
  "Supervisor",
  "Admin",
];

const sections = [
  {
    title: "Grow",
    desc: "Production, crops, soil, irrigation, and farm systems.",
  },
  {
    title: "Shop",
    desc: "Marketplace, preorders, SNAP access, and pickup.",
  },
  {
    title: "Learn",
    desc: "Nutrition, growing education, and wellness.",
  },
  {
    title: "Participate",
    desc: "Volunteer, workforce, and youth pathways.",
  },
  {
    title: "Community Impact",
    desc: "Food access, health, and regional impact.",
  },
  {
    title: "Events",
    desc: "Growers Market, workshops, and tours.",
  },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [showRoles, setShowRoles] = useState(false);

  if (!entered) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#eef8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          color: "#16351f",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "700px",
            width: "100%",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "48px", margin: "0 0 16px 0" }}>
            Bronson Family Farm
          </h1>
          <p style={{ fontSize: "24px", margin: "0 0 24px 0", color: "#3d5c45" }}>
            A Living Ecosystem for Growing, Learning, and Community
          </p>
          <button
            onClick={() => setEntered(true)}
            style={{
              background: "#2f6b3c",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "14px 24px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Enter the Farm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef8f0",
        fontFamily: "Arial, sans-serif",
        color: "#16351f",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "36px" }}>Farm Ecosystem Explorer</h2>
            <p style={{ margin: "8px 0 0 0", color: "#4d6a53", fontSize: "18px" }}>
              Explore first. Activate a role when ready.
            </p>
          </div>

          <button
            onClick={() => setShowRoles(true)}
            style={{
              background: "#2f6b3c",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 18px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
          </button>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: "28px" }}>
            Shared Exploration Layer
          </h3>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#4d6a53" }}>
            Customers, volunteers, youth workers, growers, and partners can all
            explore the ecosystem. Roles unlock actions without blocking access
            to the broader experience.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {sections.map((section) => (
            <div
              key={section.title}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "22px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "24px" }}>{section.title}</h3>
              <p style={{ marginBottom: 0, fontSize: "16px", color: "#4d6a53", lineHeight: 1.5 }}>
                {section.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showRoles && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              width: "100%",
              maxWidth: "650px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: "28px" }}>Select Your Role</h3>
            <p style={{ color: "#4d6a53", fontSize: "16px" }}>
              Choose a role without losing access to the full ecosystem.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                marginTop: "18px",
              }}
            >
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    setShowRoles(false);
                  }}
                  style={{
                    background: "#e8f3ea",
                    color: "#16351f",
                    border: "1px solid #cddfcf",
                    borderRadius: "12px",
                    padding: "14px",
                    fontSize: "15px",
                    cursor: "pointer",
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "18px" }}>
              <button
                onClick={() => setShowRoles(false)}
                style={{
                  background: "transparent",
                  color: "#6b7280",
                  border: "none",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeRole && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "320px",
            maxWidth: "90vw",
            height: "100vh",
            background: "#ffffff",
            boxShadow: "-8px 0 24px rgba(0,0,0,0.12)",
            padding: "24px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ marginTop: 0, fontSize: "28px" }}>{activeRole}</h3>
          <p style={{ color: "#4d6a53", lineHeight: 1.6 }}>
            Role activated. You can still explore the full ecosystem while using
            role-specific actions.
          </p>

          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                width: "100%",
                background: "#2f6b3c",
                color: "#ffffff",
                border: "none",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "16px",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              Open Role Actions
            </button>

            <button
              onClick={() => setActiveRole(null)}
              style={{
                width: "100%",
                background: "#ffffff",
                color: "#16351f",
                border: "1px solid #cddfcf",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Exit Role
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
