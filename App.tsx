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

const HERO_IMAGE =
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea.jpg";
const SECOND_IMAGE =
  "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea2.jpg";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const cardStyle: React.CSSProperties = {
    background: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: 240,
    position: "relative",
    overflow: "hidden",
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

  function HeroImage({
    image,
    title,
    children,
    tall = false,
  }: {
    image: string;
    title: string;
    children?: React.ReactNode;
    tall?: boolean;
  }) {
    return (
      <div
        style={{
          position: "relative",
          minHeight: tall ? 460 : 260,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "#9aa39a",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.30))",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "white",
            padding: 32,
            minHeight: tall ? 460 : 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            maxWidth: 780,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

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
        <div style={{ marginBottom: 24 }}>
          <HeroImage image={HERO_IMAGE} title="Bronson Family Farm" tall>
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
          </HeroImage>
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
            <button style={roleButtonStyle} onClick={() => setScreen("customer")}>
              Customer
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("grower")}>
              Grower
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("volunteer")}>
              Volunteer
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("youth")}>
              Youth
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("supervisor")}>
              Supervisor
            </button>
            <button style={roleButtonStyle} onClick={() => setScreen("admin")}>
              Admin
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={cardStyle}>
            <img
              src={SECOND_IMAGE}
              alt="Grower"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.92))",
              }}
            />
            <div style={{ position: "relative" }}>
              <h3>Grower Ecosystem</h3>
              <p>Inventory, crop planning, pricing, and marketplace readiness.</p>
            </div>
          </div>

          <div style={cardStyle}>
            <img
              src={HERO_IMAGE}
              alt="Workforce"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.92))",
              }}
            />
            <div style={{ position: "relative" }}>
              <h3>Workforce Pathways</h3>
              <p>Youth development, supervision, and real-world skill building.</p>
            </div>
          </div>

          <div style={cardStyle}>
            <img
              src={SECOND_IMAGE}
              alt="Customer"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.92))",
              }}
            />
            <div style={{ position: "relative" }}>
              <h3>Customer Access</h3>
              <p>Shopping, pickup flow, SNAP expansion, and community engagement.</p>
            </div>
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

        <div style={{ marginBottom: 20 }}>
          <HeroImage image={image} title={title}>
            <h1 style={{ margin: 0 }}>{title}</h1>
          </HeroImage>
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
            <button style={actionButtonStyle} onClick={() => setScreen("home")}>
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
        image={SECOND_IMAGE}
      />
    );
  }

  if (screen === "customer") {
    return (
      <RoleLayout
        title="Customer Marketplace"
        description="This is how the community accesses food. Customers can shop, reserve pickups, and eventually use SNAP—ensuring equitable food access."
        image={HERO_IMAGE}
      />
    );
  }

  if (screen === "admin") {
    return (
      <RoleLayout
        title="Admin Control Panel"
        description="This is the command center. Leadership can track operations, workforce progress, and community impact in real time."
        image={SECOND_IMAGE}
      />
    );
  }

  if (screen === "guest") {
    return (
      <RoleLayout
        title="Guest Experience"
        description="This is the front door to the vision. Guests encounter the story, the land, and the opportunity to become part of a larger community transformation."
        image={HERO_IMAGE}
      />
    );
  }

  if (screen === "volunteer") {
    return (
      <RoleLayout
        title="Volunteer Hub"
        description="This is where community support becomes action. Volunteers can help power events, daily farm activity, and public engagement."
        image={SECOND_IMAGE}
      />
    );
  }

  if (screen === "youth") {
    return (
      <RoleLayout
        title="Youth Workforce"
        description="This is where workforce begins. Youth learn responsibility, gain real skills, and build pathways into agriculture, business, and community leadership."
        image={HERO_IMAGE}
      />
    );
  }

  if (screen === "supervisor") {
    return (
      <RoleLayout
        title="Supervisor Console"
        description="This is where accountability and development meet. Supervisors guide progress, support growth, and help ensure work is completed with excellence."
        image={SECOND_IMAGE}
      />
    );
  }

  return <HomeScreen />;
}
