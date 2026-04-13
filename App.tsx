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

const ROLE_IMAGES = {
  home: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea.jpg",
  guest: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0220.JPG",
  customer: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0221.JPG",
  grower: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/GrowArea2.jpg",
  volunteer: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0222.JPG",
  youth: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0223.JPG",
  supervisor: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0225.JPG",
  admin: "https://raw.githubusercontent.com/cburgessemail-gif/Farm/main/SAM_0237.JPG",
};

const MARKET_ITEMS = [
  {
    name: "Collard Greens",
    price: "$10",
    unit: "5-seedling roll",
    description: "Healthy starter bundle ready for transplanting.",
  },
  {
    name: "Broccoli",
    price: "$5",
    unit: "3-seedling roll",
    description: "Strong young broccoli starts for spring planting.",
  },
  {
    name: "Cilantro",
    price: "$3",
    unit: "5-seedling roll",
    description: "Fresh herb starts for home cooks and growers.",
  },
  {
    name: "Tomatoes",
    price: "$5",
    unit: "3-seedling roll",
    description: "Seasonal tomato starts prepared for garden growth.",
  },
  {
    name: "Mustards",
    price: "$4",
    unit: "bundle",
    description: "Fresh market greens for community food access.",
  },
  {
    name: "Spinach",
    price: "$4",
    unit: "bag",
    description: "Nutritious leafy greens prepared for market pickup.",
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const baseCard: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const roleButtonStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #b8b8b8",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  };

  function getRoleTheme(role: Role) {
    switch (role) {
      case "guest":
        return {
          color: "#4f6d4f",
          subtitle: "Story • Land • Invitation",
          image: ROLE_IMAGES.guest,
          cards: [
            { title: "Discover the Vision", text: "See how Bronson Family Farm connects land, people, and purpose." },
            { title: "Visit the Farm", text: "Preview how guests, partners, and supporters encounter the project." },
            { title: "Get Involved", text: "Explore pathways to support, partner, volunteer, or invest." },
          ],
        };
      case "customer":
        return {
          color: "#2f7a4a",
          subtitle: "Shopping • Pickup • Food Access",
          image: ROLE_IMAGES.customer,
          cards: [
            { title: "Fresh Food", text: "See produce, seedlings, and farm-grown offerings." },
            { title: "Reserve Pickup", text: "Choose convenient community pickup options." },
            { title: "Food Access", text: "Support a model built for equitable access and SNAP growth." },
          ],
        };
      case "grower":
        return {
          color: "#7a5c2f",
          subtitle: "Food Production • Crop Planning • Market Readiness",
          image: ROLE_IMAGES.grower,
          cards: [
            { title: "Manage Inventory", text: "Track production, harvest readiness, and items moving toward market." },
            { title: "Plan the Season", text: "Organize crop timing, planting priorities, and workflow." },
            { title: "Prepare for Market", text: "Move crops from production into customer and community channels." },
          ],
        };
      case "volunteer":
        return {
          color: "#6a4f8f",
          subtitle: "Service • Events • Community Support",
          image: ROLE_IMAGES.volunteer,
          cards: [
            { title: "See Opportunities", text: "Coordinate event support, farm assistance, and community service." },
            { title: "Join the Day", text: "Help power public experiences and daily operations." },
            { title: "Strengthen the Mission", text: "Turn community goodwill into visible progress on the ground." },
          ],
        };
      case "youth":
        return {
          color: "#c26a1b",
          subtitle: "Learning • Responsibility • Pathways",
          image: ROLE_IMAGES.youth,
          cards: [
            { title: "Learn by Doing", text: "Gain real-world experience through structured farm-based work." },
            { title: "Build Skills", text: "Develop responsibility, teamwork, and leadership." },
            { title: "Create Pathways", text: "Connect agricultural work to workforce and future opportunities." },
          ],
        };
      case "supervisor":
        return {
          color: "#355c8c",
          subtitle: "Guidance • Accountability • Growth",
          image: ROLE_IMAGES.supervisor,
          cards: [
            { title: "Guide the Team", text: "Support youth and volunteers with clarity, structure, and coaching." },
            { title: "Track Progress", text: "Monitor tasks, development, and completion." },
            { title: "Strengthen Outcomes", text: "Help turn activity into measurable growth and readiness." },
          ],
        };
      case "admin":
        return {
          color: "#1f4d4d",
          subtitle: "Operations • Oversight • Impact",
          image: ROLE_IMAGES.admin,
          cards: [
            { title: "Oversee the System", text: "See the full ecosystem across production, programs, and engagement." },
            { title: "Support Decisions", text: "Use a clear executive view to guide operations and growth." },
            { title: "Show Impact", text: "Present outcomes to funders, partners, and community stakeholders." },
          ],
        };
    }
  }

  function ActionButton({
    label,
    color,
    onClick,
  }: {
    label: string;
    color: string;
    onClick: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          border: "none",
          background: color,
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {label}
      </button>
    );
  }

  function HeroImage({
    image,
    title,
    subtitle,
    children,
    tall = false,
  }: {
    image: string;
    title: string;
    subtitle?: string;
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
            maxWidth: 820,
          }}
        >
          {subtitle && (
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                opacity: 0.9,
                marginBottom: 10,
              }}
            >
              {subtitle}
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  function StatCard({
    label,
    value,
    text,
  }: {
    label: string;
    value: string;
    text: string;
  }) {
    return (
      <div style={baseCard}>
        <div style={{ fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>
          {label}
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>{value}</div>
        <div>{text}</div>
      </div>
    );
  }

  function OverlayInfoCard({
    title,
    text,
    image,
  }: {
    title: string;
    text: string;
    image: string;
  }) {
    return (
      <div
        style={{
          ...baseCard,
          minHeight: 220,
          position: "relative",
          overflow: "hidden",
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
              "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.92))",
          }}
        />
        <div style={{ position: "relative" }}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    );
  }

  function RoleDemoPage({
    role,
    title,
    description,
  }: {
    role: Role;
    title: string;
    description: string;
  }) {
    const theme = getRoleTheme(role);

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
          <HeroImage image={theme.image} title={title} subtitle={theme.subtitle}>
            <h1 style={{ margin: 0, fontSize: 38 }}>{title}</h1>
          </HeroImage>
        </div>

        <div
          style={{
            ...baseCard,
            borderTop: `6px solid ${theme.color}`,
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 0 }}>{description}</p>

          <div style={{ marginTop: 20 }}>
            <ActionButton
              label="Return to Overview"
              color={theme.color}
              onClick={() => setScreen("home")}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {theme.cards.map((card) => (
            <div
              key={card.title}
              style={{
                ...baseCard,
                borderLeft: `6px solid ${theme.color}`,
              }}
            >
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function CustomerMarketplace() {
    const theme = getRoleTheme("customer");

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
          <HeroImage
            image={theme.image}
            title="Customer Marketplace"
            subtitle={theme.subtitle}
          >
            <h1 style={{ margin: 0, fontSize: 38 }}>Customer Marketplace</h1>
          </HeroImage>
        </div>

        <div
          style={{
            ...baseCard,
            borderTop: `6px solid ${theme.color}`,
            marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 18, lineHeight: 1.6, marginTop: 0 }}>
            Fresh food should be visible here. This marketplace now shows sample
            Bronson Family Farm offerings, including seedlings and produce.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {MARKET_ITEMS.map((item) => (
            <div
              key={item.name}
              style={{
                ...baseCard,
                borderTop: `6px solid ${theme.color}`,
              }}
            >
              <h3 style={{ marginTop: 0 }}>{item.name}</h3>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{item.price}</div>
              <div style={{ opacity: 0.8, marginBottom: 8 }}>{item.unit}</div>
              <p>{item.description}</p>
              <ActionButton
                label="Reserve Item"
                color={theme.color}
                onClick={() => alert(`${item.name} added to demo reservation list`)}
              />
            </div>
          ))}
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
          <HeroImage
            image={ROLE_IMAGES.home}
            title="Bronson Family Farm Ecosystem"
            subtitle="118+ Acres • Youngstown, Ohio • Appalachian Region"
            tall
          >
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

            <ActionButton
              label="Start Guided Demo"
              color="#2e7d32"
              onClick={() => setScreen("grower")}
            />
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
          <StatCard label="Land Base" value="118+" text="Acres positioned for long-term agricultural growth" />
          <StatCard label="Workforce Model" value="8" text="Weeks of youth workforce development programming" />
          <StatCard label="Production Focus" value="3+" text="Acres actively moving toward growing and demonstration use" />
          <StatCard label="Community Vision" value="1,000" text="People envisioned for future impact through expansion" />
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
            <button style={roleButtonStyle} onClick={() => setScreen("guest")}>Guest</button>
            <button style={roleButtonStyle} onClick={() => setScreen("customer")}>Customer</button>
            <button style={roleButtonStyle} onClick={() => setScreen("grower")}>Grower</button>
            <button style={roleButtonStyle} onClick={() => setScreen("volunteer")}>Volunteer</button>
            <button style={roleButtonStyle} onClick={() => setScreen("youth")}>Youth</button>
            <button style={roleButtonStyle} onClick={() => setScreen("supervisor")}>Supervisor</button>
            <button style={roleButtonStyle} onClick={() => setScreen("admin")}>Admin</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <OverlayInfoCard
            title="Grower Ecosystem"
            text="Inventory, crop planning, pricing, and marketplace readiness."
            image={ROLE_IMAGES.grower}
          />
          <OverlayInfoCard
            title="Workforce Pathways"
            text="Youth development, supervision, and real-world skill building."
            image={ROLE_IMAGES.youth}
          />
          <OverlayInfoCard
            title="Customer Access"
            text="Shopping, pickup flow, SNAP expansion, and community engagement."
            image={ROLE_IMAGES.customer}
          />
        </div>
      </div>
    );
  }

  if (screen === "guest") {
    return (
      <RoleDemoPage
        role="guest"
        title="Guest Experience"
        description="This is the front door to the vision. Guests encounter the story, the land, and the opportunity to become part of a larger community transformation."
      />
    );
  }

  if (screen === "customer") {
    return <CustomerMarketplace />;
  }

  if (screen === "grower") {
    return (
      <RoleDemoPage
        role="grower"
        title="Grower Dashboard"
        description="This is where food begins. Growers track production, manage crops, and prepare inventory for market—creating a sustainable local food system."
      />
    );
  }

  if (screen === "volunteer") {
    return (
      <RoleDemoPage
        role="volunteer"
        title="Volunteer Hub"
        description="This is where community support becomes action. Volunteers can help power events, daily farm activity, and public engagement."
      />
    );
  }

  if (screen === "youth") {
    return (
      <RoleDemoPage
        role="youth"
        title="Youth Workforce"
        description="This is where workforce begins. Youth learn responsibility, gain real skills, and build pathways into agriculture, business, and community leadership."
      />
    );
  }

  if (screen === "supervisor") {
    return (
      <RoleDemoPage
        role="supervisor"
        title="Supervisor Console"
        description="This is where accountability and development meet. Supervisors guide progress, support growth, and help ensure work is completed with excellence."
      />
    );
  }

  if (screen === "admin") {
    return (
      <RoleDemoPage
        role="admin"
        title="Admin Control Panel"
        description="This is the command center. Leadership can track operations, workforce progress, and community impact in real time."
      />
    );
  }

  return <HomeScreen />;
}
