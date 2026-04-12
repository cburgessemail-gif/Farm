"use client";

import { useState } from "react";

type Role =
  | "guest"
  | "customer"
  | "grower"
  | "volunteer"
  | "youth"
  | "supervisor"
  | "admin";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<Role>("guest");

  const roleContent: Record<Role, { title: string; description: string }> = {
    guest: {
      title: "Welcome Guest",
      description:
        "Explore Bronson Family Farm, learn about the mission, and view public event information.",
    },
    customer: {
      title: "Customer Portal",
      description:
        "Browse produce, pre-orders, pickup options, and market offerings.",
    },
    grower: {
      title: "Grower Hub",
      description:
        "View crop planning, inventory coordination, and grower ecosystem tools.",
    },
    volunteer: {
      title: "Volunteer Center",
      description:
        "Review opportunities, check in for events, and support farm activities.",
    },
    youth: {
      title: "Youth Workforce",
      description:
        "Access learning pathways, assignments, and program participation tools.",
    },
    supervisor: {
      title: "Supervisor Dashboard",
      description:
        "Track attendance, observations, task flow, and workforce progress.",
    },
    admin: {
      title: "Admin Control Center",
      description:
        "Manage roles, operations, platform settings, and ecosystem oversight.",
    },
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(rgba(245,240,230,0.88), rgba(245,240,230,0.92)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat",
        padding: "40px 24px",
        color: "#1f2a1f",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          background: "rgba(255,255,255,0.78)",
          borderRadius: 24,
          padding: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              letterSpacing: 2,
              fontSize: 12,
              textTransform: "uppercase",
              color: "#5d6b57",
              marginBottom: 10,
            }}
          >
            Youngstown, Ohio • Appalachian Rising
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Bronson Family Farm Demo
          </h1>
          <p
            style={{
              marginTop: 14,
              maxWidth: 760,
              fontSize: 18,
              lineHeight: 1.6,
              color: "#39463a",
            }}
          >
            A live demonstration of a farm-centered ecosystem connecting food,
            workforce development, growers, volunteers, and community impact.
          </p>
        </div>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ marginBottom: 14 }}>Choose a Role</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {(
              [
                "guest",
                "customer",
                "grower",
                "volunteer",
                "youth",
                "supervisor",
                "admin",
              ] as Role[]
            ).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border:
                    selectedRole === role
                      ? "2px solid #2f6b3c"
                      : "1px solid #cbbfae",
                  background:
                    selectedRole === role ? "#e4f1e5" : "rgba(255,255,255,0.95)",
                  cursor: "pointer",
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 20,
          }}
        >
          <div
            style={{
              background: "#fffdf8",
              border: "1px solid #e2d9cb",
              borderRadius: 18,
              padding: 24,
            }}
          >
            <h3 style={{ marginTop: 0, fontSize: 28 }}>
              {roleContent[selectedRole].title}
            </h3>
            <p style={{ fontSize: 18, lineHeight: 1.7 }}>
              {roleContent[selectedRole].description}
            </p>

            <div style={{ marginTop: 20 }}>
              <button
                onClick={() =>
                  alert(`${selectedRole.toUpperCase()} demo opened successfully.`)
                }
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  border: "none",
                  background: "#2f6b3c",
                  color: "white",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Open {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Demo
              </button>
            </div>
          </div>

          <div
            style={{
              background: "#fffdf8",
              border: "1px solid #e2d9cb",
              borderRadius: 18,
              padding: 24,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Demo Highlights</h3>
            <p>Active role switching</p>
            <p>Live button response</p>
            <p>Stable production deployment</p>
            <p>Clear foundation for next screens</p>
          </div>
        </section>
      </div>
    </main>
  );
}
