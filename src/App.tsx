import React, { useEffect, useMemo, useRef, useState } from "react";

type Screen =
  | "home"
  | "guest"
  | "customer"
  | "grower"
  | "producer"
  | "youth"
  | "admin"
  | "market";

type GuestView = "story" | "mission" | "events" | "partners";
type CustomerView = "produce" | "nutrition" | "recipes" | "market";
type GrowerView = "weather" | "planner" | "notes" | "season";
type ProducerView = "products" | "events" | "storytelling" | "collaboration";
type YouthView = "overview" | "parent" | "supervisor" | "daily";
type AdminView = "participation" | "operations" | "planning" | "growth";
type MarketView = "products" | "grownby" | "education" | "community" | "ordering";

type WeatherData = {
  condition: string;
  temp: string;
  high: string;
  low: string;
  note: string;
};

const weatherByScreen: Record<Screen, WeatherData> = {
  home: {
    condition: "Partly Cloudy",
    temp: "64°F",
    high: "70°F",
    low: "51°F",
    note: "Strong conditions for welcoming visitors, tours, and light field activity.",
  },
  guest: {
    condition: "Bright Intervals",
    temp: "63°F",
    high: "69°F",
    low: "50°F",
    note: "Good visibility for storytelling, site tours, and visitor engagement.",
  },
  customer: {
    condition: "Mild Breeze",
    temp: "65°F",
    high: "71°F",
    low: "52°F",
    note: "Comfortable weather for market browsing, pickups, and food demonstrations.",
  },
  grower: {
    condition: "Field-Friendly",
    temp: "61°F",
    high: "68°F",
    low: "48°F",
    note: "Suitable for transplant review, irrigation planning, and crop-timing decisions.",
  },
  producer: {
    condition: "Clear Windows",
    temp: "66°F",
    high: "72°F",
    low: "53°F",
    note: "Good for vendor setup, product visibility, and event preparation.",
  },
  youth: {
    condition: "Comfortable Outdoor Session",
    temp: "62°F",
    high: "68°F",
    low: "49°F",
    note: "Strong weather for hands-on learning, movement, and guided youth tasks.",
  },
  admin: {
    condition: "Stable Outlook",
    temp: "63°F",
    high: "69°F",
    low: "50°F",
    note: "Favorable day for coordination, planning, and operations review.",
  },
  market: {
    condition: "Visitor-Friendly",
    temp: "67°F",
    high: "73°F",
    low: "54°F",
    note: "Good foot-traffic conditions for selling, demonstrations, and community participation.",
  },
};

const cropPlanner = [
  {
    crop: "Tomatoes",
    stage: "Transplant monitoring",
    timing: "Now",
    note: "Check vigor, moisture balance, and wind exposure.",
  },
  {
    crop: "Collards",
    stage: "Strong growth window",
    timing: "Current cycle",
    note: "High visibility and strong demand for market education.",
  },
  {
    crop: "Cabbage",
    stage: "Field observation",
    timing: "This week",
    note: "Watch uniformity and pressure.",
  },
  {
    crop: "Peppers",
    stage: "Warmth-sensitive development",
    timing: "Next several days",
    note: "Protect if evening temperatures drop.",
  },
  {
    crop: "Greens & Lettuce",
    stage: "Succession planning",
    timing: "Next wave",
    note: "Keep continuity for food access and market flow.",
  },
  {
    crop: "Melons",
    stage: "Season preparation",
    timing: "Upcoming phase",
    note: "Align with spacing, heat, and irrigation needs.",
  },
];

const navItems: { key: Screen; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "guest", label: "Guest" },
  { key: "customer", label: "Customer" },
  { key: "grower", label: "Grower" },
  { key: "producer", label: "Value-Added Producer" },
  { key: "youth", label: "Youth Workforce" },
  { key: "admin", label: "Leadership" },
  { key: "market", label: "Marketplace" },
];

const rotatingFarmItems = [
  "Seedtime pulse: transplant review and early expansion.",
  "Market readiness: customer education and pickup flow visible.",
  "Youth workforce: confidence, structure, and real responsibility.",
  "Grower ecosystem: weather, timing, and continuity shaping decisions.",
  "Marketplace: GrownBy remains the online bridge for action.",
];

const impactStats = [
  { label: "118+ Acres Visioned", value: 118, suffix: "+" },
  { label: "100+ Positive Responses", value: 100, suffix: "+" },
  { label: "10+ Crop Families", value: 10, suffix: "+" },
  { label: "Youth Workforce Pathway", value: 1, suffix: " Active" },
];

const logos = [
  "Bronson Family Farm",
  "Farm & Family Alliance",
  "Parker Farms",
  "GrownBy",
  "City of Youngstown",
  "Central State University",
  "Home Depot",
  "Petitti Garden Centers",
];

function backgroundFor(screen: Screen) {
  switch (screen) {
    case "home":
      return "linear-gradient(135deg, #0e2418 0%, #224d37 52%, #8d7f49 100%)";
    case "guest":
      return "linear-gradient(135deg, #163124 0%, #355a44 54%, #9a8752 100%)";
    case "customer":
      return "linear-gradient(135deg, #123228 0%, #1e6a54 52%, #c29b44 100%)";
    case "grower":
      return "linear-gradient(135deg, #102817 0%, #2f6b3d 56%, #8db25c 100%)";
    case "producer":
      return "linear-gradient(135deg, #2b1f15 0%, #73543b 56%, #c59b6a 100%)";
    case "youth":
      return "linear-gradient(135deg, #152335 0%, #2c667c 54%, #7cab68 100%)";
    case "admin":
      return "linear-gradient(135deg, #201624 0%, #47436e 54%, #8577b5 100%)";
    case "market":
      return "linear-gradient(135deg, #20170f 0%, #674924 56%, #c2902f 100%)";
  }
}

function imageFor(screen: Screen) {
  switch (screen) {
    case "home":
    case "guest":
    case "grower":
    case "youth":
      return "/GrowArea.jpg";
    case "customer":
    case "producer":
    case "admin":
    case "market":
      return "/GrowArea2.jpg";
  }
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setEnabled(false);
  };

  const speakSequence = (text: string, onComplete?: () => void) => {
    if (!("speechSynthesis" in window)) {
      onComplete?.();
      return;
    }

    window.speechSynthesis.cancel();

    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (!parts.length) {
      onComplete?.();
      return;
    }

    let index = 0;

    const speakNext = () => {
      if (index >= parts.length) {
        onComplete?.();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(parts[index]);
      utterance.lang = "en-US";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = () => {
        index += 1;
        speakNext();
      };
      utterance.onerror = () => {
        index += 1;
        speakNext();
      };
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  return { enabled, setEnabled, stop, speakSequence };
}

function seasonPulseForMonth(month: number) {
  if ([12, 1, 2].includes(month)) return "Planning and protected growth";
  if ([3, 4, 5].includes(month)) return "Seedtime and expansion";
  if ([6, 7, 8].includes(month)) return "Peak growth and market activity";
  return "Harvest, storage, and next-cycle planning";
}

function useAnimatedCount(target: number, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(30, Math.round(duration / 16));
    const id = window.setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress >= 1) {
        window.clearInterval(id);
      }
    }, 16);
    return () => window.clearInterval(id);
  }, [target, duration]);

  return count;
}

function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(8, 12, 10, 0.50)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 26,
        backdropFilter: "blur(14px)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}
    >
      {title ? (
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.82)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}

function SoftBlock({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 14,
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {title ? (
        <div style={{ fontWeight: 800, marginBottom: 8, fontSize: 16 }}>{title}</div>
      ) : null}
      {children}
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  primary = false,
  active = false,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 16px",
        borderRadius: 14,
        border: primary
          ? "1px solid rgba(255,255,255,0)"
          : active
          ? "1px solid rgba(213,255,194,0.82)"
          : "1px solid rgba(255,255,255,0.14)",
        background: primary
          ? "#dff3c7"
          : active
          ? "rgba(171,239,146,0.18)"
          : "rgba(255,255,255,0.10)",
        color: primary ? "#102012" : "#ffffff",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        textAlign: "left",
        transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
        boxShadow: primary ? "0 8px 22px rgba(187, 237, 148, 0.18)" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
    </button>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}

function PortalTile({
  title,
  subtitle,
  image,
  onClick,
}: {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 24,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer",
        textAlign: "left",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.20)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative", height: 180 }}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.92,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, #19341f 0%, #3c6f4e 55%, #9e8c58 100%)",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.84), rgba(0,0,0,0.28), rgba(0,0,0,0.08))",
          }}
        />

        <div style={{ position: "absolute", left: 18, right: 18, bottom: 14 }}>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>{title}</div>
          <div
            style={{
              marginTop: 6,
              color: "rgba(255,255,255,0.88)",
              fontSize: 13,
              lineHeight: 1.45,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </button>
  );
}

function WeatherPanel({ data }: { data: WeatherData }) {
  return (
    <Card title="Weather">
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>{data.temp}</div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.88)" }}>{data.condition}</div>
        <div style={{ color: "rgba(255,255,255,0.72)" }}>
          High {data.high} · Low {data.low}
        </div>
        <SoftBlock>{data.note}</SoftBlock>
      </div>
    </Card>
  );
}

function CropPlannerPanel() {
  return (
    <Card title="Crop Planner">
      <div style={{ display: "grid", gap: 12 }}>
        {cropPlanner.map((item) => (
          <SoftBlock key={item.crop} title={item.crop}>
            <div>{item.stage}</div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{item.timing}</div>
            <div style={{ marginTop: 4 }}>{item.note}</div>
          </SoftBlock>
        ))}
      </div>
    </Card>
  );
}

function DestinationLayout({
  title,
  menu,
  content,
  aside,
}: {
  title: string;
  menu: React.ReactNode;
  content: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px minmax(0, 1fr) 320px",
        gap: 18,
      }}
    >
      <Card title={title}>{menu}</Card>
      <Card title="Destination">{content}</Card>
      <div style={{ display: "grid", gap: 18 }}>{aside}</div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const count = useAnimatedCount(value);

  return (
    <SoftBlock title={label}>
      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{count}{suffix}</div>
    </SoftBlock>
  );
}

function ScreenShell({
  screen,
  title,
  subtitle,
  topActions,
  children,
}: {
  screen: Screen;
  title: string;
  subtitle: string;
  topActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: backgroundFor(screen),
        color: "#ffffff",
        fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
        @keyframes bffFloat {
          0% { transform: translate3d(0,0,0) scale(1.04); }
          50% { transform: translate3d(-10px,-6px,0) scale(1.06); }
          100% { transform: translate3d(0,0,0) scale(1.04); }
        }
        @keyframes bffGlow {
          0% { opacity: .22; }
          50% { opacity: .36; }
          100% { opacity: .22; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        {!imgError ? (
          <img
            src={imageFor(screen)}
            alt={screen}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.34,
              transform: "scale(1.04)",
              animation: "bffFloat 18s ease-in-out infinite",
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(187,237,148,0.12), transparent 30%), radial-gradient(circle at 80% 30%, rgba(255,210,120,0.10), transparent 28%)",
            animation: "bffGlow 8s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(3,8,6,0.34), rgba(3,8,6,0.62), rgba(3,8,6,0.90))",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1450,
          margin: "0 auto",
          padding: "18px 18px 40px",
        }}
      >
        <div
          style={{
            background: "rgba(6,10,8,0.42)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 26,
            padding: 18,
            backdropFilter: "blur(16px)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 640px", minWidth: 280 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <Pill text={screen.toUpperCase()} />
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  maxWidth: 920,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 19,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.86)",
                  maxWidth: 900,
                }}
              >
                {subtitle}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{topActions}</div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [guestView, setGuestView] = useState<GuestView>("story");
  const [customerView, setCustomerView] = useState<CustomerView>("produce");
  const [growerView, setGrowerView] = useState<GrowerView>("planner");
  const [producerView, setProducerView] = useState<ProducerView>("products");
  const [youthView, setYouthView] = useState<YouthView>("overview");
  const [adminView, setAdminView] = useState<AdminView>("participation");
  const [marketView, setMarketView] = useState<MarketView>("products");
  const [tourIndex, setTourIndex] = useState(0);
  const [farmPulseIndex, setFarmPulseIndex] = useState(0);

  const clock = useClock();
  const speech = useSpeech();
  const timeoutRef = useRef<number | null>(null);

  const timeText = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(clock),
    [clock]
  );

  const seasonPulse = seasonPulseForMonth(clock.getMonth() + 1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFarmPulseIndex((prev) => (prev + 1) % rotatingFarmItems.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const guidedSteps = [
    "Welcome to Bronson Family Farm. This is a living ecosystem rooted in land, family, food, and future.",
    "Guests begin with story, mission, events, and partnership pathways.",
    "Customers discover produce, nutrition, recipes, and marketplace action.",
    "Growers use weather, crop planner, field notes, and seasonal priorities.",
    "Youth workforce participants have overview, parent portal, supervisor, and daily focus destinations.",
    "The marketplace includes products, education, community, ordering flow, and a dedicated GrownBy pathway.",
  ];

  const tourScreens: Screen[] = ["home", "guest", "customer", "grower", "youth", "market"];

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!speech.enabled) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    speech.speakSequence(guidedSteps[tourIndex], () => {
      timeoutRef.current = window.setTimeout(() => {
        setTourIndex((prev) => (prev + 1) % guidedSteps.length);
      }, 900);
    });

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [speech.enabled, tourIndex]);

  useEffect(() => {
    if (!speech.enabled) return;
    navigate(tourScreens[tourIndex] ?? "home");
  }, [tourIndex, speech.enabled]);

  useEffect(() => {
    return () => {
      speech.stop();
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const startTour = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setTourIndex(0);
    speech.setEnabled(true);
    navigate("home");
  };

  const stopTour = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    speech.stop();
  };

  const commonTopActions = (
    <>
      <ActionButton label="Back Home" onClick={() => navigate("home")} />
      <ActionButton label="Marketplace" onClick={() => navigate("market")} />
      {!speech.enabled ? (
        <ActionButton label="Start Guided Tour" onClick={startTour} primary />
      ) : (
        <ActionButton label="Stop Guided Tour" onClick={stopTour} primary />
      )}
    </>
  );

  const navBar = (
    <Card>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {navItems.map((item) => (
          <ActionButton
            key={item.key}
            label={item.label}
            onClick={() => navigate(item.key)}
            active={screen === item.key}
          />
        ))}
      </div>
    </Card>
  );

  if (screen === "home") {
    return (
      <ScreenShell
        screen="home"
        title="Bronson Family Farm Ecosystem"
        subtitle="A welcoming, place-based platform connecting land, food, growers, customers, youth workforce, family wellness, and future opportunity."
        topActions={
          <>
            <ActionButton label="Enter Platform" onClick={() => navigate("guest")} primary />
            {!speech.enabled ? (
              <ActionButton label="Start Guided Tour" onClick={startTour} />
            ) : (
              <ActionButton label="Stop Guided Tour" onClick={stopTour} />
            )}
          </>
        }
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
              gap: 18,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <Card title="Welcome">
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                  <Pill text={timeText} />
                  <Pill text={seasonPulse} />
                  <Pill text="Inviting and welcoming" />
                </div>

                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  More than a farm. A living place people can enter, use, and return to.
                </div>

                <div style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.88)", fontSize: 17 }}>
                  Bronson Family Farm brings together visitors, families, fresh food, youth learning,
                  grower operations, market access, wellness, and long-term community opportunity in one place.
                </div>
              </Card>

              <Card title="Enter a Pathway">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 16,
                  }}
                >
                  <PortalTile
                    title="Guest"
                    subtitle="Story, mission, events, and partners."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("guest")}
                  />
                  <PortalTile
                    title="Customer"
                    subtitle="Produce, nutrition, recipes, and marketplace action."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("customer")}
                  />
                  <PortalTile
                    title="Grower"
                    subtitle="Weather, crop planner, notes, and seasonal priorities."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("grower")}
                  />
                  <PortalTile
                    title="Value-Added Producer"
                    subtitle="Products, events, storytelling, and collaboration."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("producer")}
                  />
                  <PortalTile
                    title="Youth Workforce"
                    subtitle="Overview, parent portal, supervisor, and daily focus."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("youth")}
                  />
                  <PortalTile
                    title="Leadership"
                    subtitle="Participation, operations, planning, and growth."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("admin")}
                  />
                </div>
              </Card>

              <Card title="Today on the Farm">
                <SoftBlock title="Live Pulse">{rotatingFarmItems[farmPulseIndex]}</SoftBlock>
              </Card>

              <Card title="Impact Snapshot">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {impactStats.map((item) => (
                    <StatCard key={item.label} label={item.label} value={item.value} suffix={item.suffix} />
                  ))}
                </div>
              </Card>

              <Card title="Partners and Ecosystem">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {logos.map((logo) => (
                    <SoftBlock key={logo}>{logo}</SoftBlock>
                  ))}
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <WeatherPanel data={weatherByScreen.home} />
              <CropPlannerPanel />
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "guest") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Story" onClick={() => setGuestView("story")} active={guestView === "story"} />
        <ActionButton label="Mission" onClick={() => setGuestView("mission")} active={guestView === "mission"} />
        <ActionButton label="Events" onClick={() => setGuestView("events")} active={guestView === "events"} />
        <ActionButton label="Partners" onClick={() => setGuestView("partners")} active={guestView === "partners"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (guestView === "story") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Story">
            Bronson Family Farm is a place-based ecosystem where land, family, food, and future belong together.
          </SoftBlock>
          <SoftBlock>
            Guests begin by understanding that this farm is not only for growing crops. It is also a place for learning, wellness, participation, and hope.
          </SoftBlock>
          <SoftBlock>
            This destination helps people feel welcomed before they move deeper into the platform.
          </SoftBlock>
        </div>
      );
    } else if (guestView === "mission") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Mission">
            The mission is to grow food, strengthen families, restore land, develop people, and create long-term community value.
          </SoftBlock>
          <SoftBlock>
            This destination shows why the farm matters beyond agriculture alone.
          </SoftBlock>
        </div>
      );
    } else if (guestView === "events") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Events">
            Tours, demonstrations, youth activity, market participation, and community experiences help move people from curiosity into belonging.
          </SoftBlock>
          <SoftBlock>
            Events serve as real entry points into the ecosystem.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Partners">
            Growers, educators, vendors, community supporters, youth partners, wellness collaborators, and mission-aligned allies all have a place here.
          </SoftBlock>
          <SoftBlock>
            Bronson Family Farm is built for connection, not isolation.
          </SoftBlock>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.guest} />
        <Card title="Go Next">
          <div style={{ display: "grid", gap: 10 }}>
            <ActionButton label="Open Customer" onClick={() => navigate("customer")} primary />
            <ActionButton label="Open Grower" onClick={() => navigate("grower")} />
            <ActionButton label="Open Youth" onClick={() => navigate("youth")} />
            <ActionButton label="Open Marketplace" onClick={() => navigate("market")} />
          </div>
        </Card>
      </>
    );

    return (
      <ScreenShell
        screen="guest"
        title="Guest Portal"
        subtitle="A warm entry into story, mission, events, and partnership pathways."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Guest Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "customer") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Produce" onClick={() => setCustomerView("produce")} active={customerView === "produce"} />
        <ActionButton label="Nutrition" onClick={() => setCustomerView("nutrition")} active={customerView === "nutrition"} />
        <ActionButton label="Recipes" onClick={() => setCustomerView("recipes")} active={customerView === "recipes"} />
        <ActionButton label="Marketplace Path" onClick={() => setCustomerView("market")} active={customerView === "market"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (customerView === "produce") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Produce">
            Tomatoes, collards, cabbage, lettuce, broccoli, peppers, spinach, and greens move from visibility into real food access.
          </SoftBlock>
          <SoftBlock>
            This destination should make food feel present, useful, and close at hand.
          </SoftBlock>
        </div>
      );
    } else if (customerView === "nutrition") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Nutrition">
            Natural food supports healthier households and reduces dependence on overprocessed substitutes.
          </SoftBlock>
          <SoftBlock>
            This destination connects fresh food to daily family wellness.
          </SoftBlock>
        </div>
      );
    } else if (customerView === "recipes") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Recipes">
            Garden greens bowl, fresh tomato salad, pepper and cabbage skillet, and practical family meal ideas.
          </SoftBlock>
          <SoftBlock>
            This destination helps customers imagine the food already in use.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Marketplace Path">
            This destination turns interest into action.
          </SoftBlock>
          <SoftBlock>
            Customers can move directly into products, education, community activity, GrownBy, and ordering flow.
          </SoftBlock>
          <div>
            <ActionButton label="Open Marketplace" onClick={() => navigate("market")} primary />
          </div>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.customer} />
        <Card title="Learn More">
          <div style={{ display: "grid", gap: 10 }}>
            <ActionButton label="Go to Grower Side" onClick={() => navigate("grower")} />
            <ActionButton label="Go to Marketplace" onClick={() => navigate("market")} primary />
          </div>
        </Card>
      </>
    );

    return (
      <ScreenShell
        screen="customer"
        title="Customer Portal"
        subtitle="Fresh food, healthier choices, recipes, nutrition learning, and direct marketplace pathways."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Customer Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "grower") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Weather" onClick={() => setGrowerView("weather")} active={growerView === "weather"} />
        <ActionButton label="Crop Planner" onClick={() => setGrowerView("planner")} active={growerView === "planner"} />
        <ActionButton label="Field Notes" onClick={() => setGrowerView("notes")} active={growerView === "notes"} />
        <ActionButton label="Seasonal Priorities" onClick={() => setGrowerView("season")} active={growerView === "season"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (growerView === "weather") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Weather Use">
            Weather should support actual decisions: transplant checks, irrigation timing, field movement, and protection needs.
          </SoftBlock>
          <SoftBlock>
            This destination makes the weather panel feel operational rather than decorative.
          </SoftBlock>
        </div>
      );
    } else if (growerView === "planner") {
      content = <CropPlannerPanel />;
    } else if (growerView === "notes") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Field Notes">
            Clay-heavy areas require careful moisture and access planning.
          </SoftBlock>
          <SoftBlock>
            Notes should help a grower move from observation to action.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Seasonal Priorities">
            Transplant review, succession planting, irrigation planning, and market continuity all belong here.
          </SoftBlock>
          <SoftBlock>
            This destination keeps the grower view tied to the rhythm of the season.
          </SoftBlock>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.grower} />
      </>
    );

    return (
      <ScreenShell
        screen="grower"
        title="Grower Operations"
        subtitle="Weather, crop planner, production timing, and field awareness supporting real growing decisions."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Grower Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "producer") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Products" onClick={() => setProducerView("products")} active={producerView === "products"} />
        <ActionButton label="Events" onClick={() => setProducerView("events")} active={producerView === "events"} />
        <ActionButton label="Storytelling" onClick={() => setProducerView("storytelling")} active={producerView === "storytelling"} />
        <ActionButton label="Collaboration" onClick={() => setProducerView("collaboration")} active={producerView === "collaboration"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (producerView === "products") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Products">
            Bubble Babies™, seedlings, educational kits, seasonal bundles, and event-ready offerings.
          </SoftBlock>
        </div>
      );
    } else if (producerView === "events") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Events">
            Market days, demonstrations, booths, and public-facing experiences extend the value of what is produced.
          </SoftBlock>
        </div>
      );
    } else if (producerView === "storytelling") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Storytelling">
            Products gain power when they carry place, purpose, and a visible community story.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Collaboration">
            This destination connects vendors, educators, events, and community partners into a wider value chain.
          </SoftBlock>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.producer} />
      </>
    );

    return (
      <ScreenShell
        screen="producer"
        title="Value-Added Producer Portal"
        subtitle="Products, events, storytelling, and collaboration pathways creating broader community value."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Producer Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "youth") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Overview" onClick={() => setYouthView("overview")} active={youthView === "overview"} />
        <ActionButton label="Parent Portal" onClick={() => setYouthView("parent")} active={youthView === "parent"} />
        <ActionButton label="Supervisor View" onClick={() => setYouthView("supervisor")} active={youthView === "supervisor"} />
        <ActionButton label="Daily Focus" onClick={() => setYouthView("daily")} active={youthView === "daily"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (youthView === "overview") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Overview">
            Hands-on work, visible contribution, confidence-building, responsibility, and exposure to real opportunity.
          </SoftBlock>
        </div>
      );
    } else if (youthView === "parent") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Parent Portal">
            Family visibility into expectations, growth, communication, and the purpose of participation.
          </SoftBlock>
        </div>
      );
    } else if (youthView === "supervisor") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Supervisor View">
            Daily oversight, progress awareness, intervention planning, and support coordination.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Daily Focus">
            Garden preparation, professional habits, teamwork, responsibility, and visible contribution.
          </SoftBlock>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.youth} />
        <CropPlannerPanel />
      </>
    );

    return (
      <ScreenShell
        screen="youth"
        title="Youth Workforce Platform"
        subtitle="Hands-on learning, responsibility, support, and family connection within a welcoming and structured farm environment."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Youth Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  if (screen === "admin") {
    const menu = (
      <div style={{ display: "grid", gap: 10 }}>
        <ActionButton label="Participation" onClick={() => setAdminView("participation")} active={adminView === "participation"} />
        <ActionButton label="Operations" onClick={() => setAdminView("operations")} active={adminView === "operations"} />
        <ActionButton label="Planning" onClick={() => setAdminView("planning")} active={adminView === "planning"} />
        <ActionButton label="Growth" onClick={() => setAdminView("growth")} active={adminView === "growth"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (adminView === "participation") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Participation">
            Guests, customers, youth, growers, and partners all move through visible pathways that should be coordinated together.
          </SoftBlock>
        </div>
      );
    } else if (adminView === "operations") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Operations">
            Crop timing, marketplace readiness, event coordination, and pathway continuity belong here.
          </SoftBlock>
        </div>
      );
    } else if (adminView === "planning") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Planning">
            This destination keeps leadership focused on what happens next, not just what is happening now.
          </SoftBlock>
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Growth">
            High ecosystem interest, pathway expansion, and long-term place-based value building should remain visible.
          </SoftBlock>
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.admin} />
      </>
    );

    return (
      <ScreenShell
        screen="admin"
        title="Leadership Dashboard"
        subtitle="A whole-system view of participation, operations, planning, and long-term growth."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <DestinationLayout title="Leadership Destinations" menu={menu} content={content} aside={aside} />
        </div>
      </ScreenShell>
    );
  }

  const marketMenu = (
    <div style={{ display: "grid", gap: 10 }}>
      <ActionButton label="Products" onClick={() => setMarketView("products")} active={marketView === "products"} />
      <ActionButton label="GrownBy" onClick={() => setMarketView("grownby")} active={marketView === "grownby"} />
      <ActionButton label="Education" onClick={() => setMarketView("education")} active={marketView === "education"} />
      <ActionButton label="Community" onClick={() => setMarketView("community")} active={marketView === "community"} />
      <ActionButton label="Ordering Path" onClick={() => setMarketView("ordering")} active={marketView === "ordering"} />
    </div>
  );

  let marketContent: React.ReactNode = null;
  if (marketView === "products") {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="Products">
          Produce, seedlings, garden-focused offerings, and seasonal visibility belong here.
        </SoftBlock>
        <SoftBlock>
          The marketplace should feel like a real bridge between what is grown and how people actually access it.
        </SoftBlock>
      </div>
    );
  } else if (marketView === "grownby") {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="GrownBy">
          GrownBy is the online bridge between ecosystem discovery and actual product ordering for Bronson Family Farm.
        </SoftBlock>
        <SoftBlock>
          It supports visibility, shopping flow, product access, and repeat engagement without separating the marketplace from the rest of the platform.
        </SoftBlock>
        <SoftBlock title="Why It Matters">
          Customers discover produce, nutrition, and recipes here, then move into GrownBy for practical action and pickup connection.
        </SoftBlock>
        <div>
          <a
            href="https://grownby.com/farms/bronson-family-farm/shop"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 16px",
              borderRadius: 14,
              background: "#dff3c7",
              color: "#102012",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Open GrownBy Store
          </a>
        </div>
      </div>
    );
  } else if (marketView === "education") {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="Education">
          Recipes, nutrition support, healthier food habits, and practical family use should remain close to the products themselves.
        </SoftBlock>
        <SoftBlock>
          Marketplace education helps customers understand what to buy and how to use it.
        </SoftBlock>
      </div>
    );
  } else if (marketView === "community") {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="Community">
          Pickup days, demonstrations, and ecosystem participation extend the market beyond buying alone.
        </SoftBlock>
        <SoftBlock>
          This destination connects the market to events, family learning, grower visibility, and shared experience.
        </SoftBlock>
      </div>
    );
  } else {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="Ordering Path">
          This destination should become the clear route into actual product action and repeat engagement.
        </SoftBlock>
        <SoftBlock>
          It should guide a user from ecosystem discovery to GrownBy ordering to pickup and return.
        </SoftBlock>
      </div>
    );
  }

  const marketAside = (
    <>
      <WeatherPanel data={weatherByScreen.market} />
      <Card title="Marketplace Role">
        <SoftBlock>
          The marketplace is where products, education, community activity, and GrownBy ordering come together.
        </SoftBlock>
      </Card>
    </>
  );

  return (
    <ScreenShell
      screen="market"
      title="Marketplace"
      subtitle="Where products, education, community participation, GrownBy, and ordering flow come together."
      topActions={commonTopActions}
    >
      <div style={{ display: "grid", gap: 18 }}>
        {navBar}
        <DestinationLayout title="Marketplace Destinations" menu={marketMenu} content={marketContent} aside={marketAside} />
      </div>
    </ScreenShell>
  );
}
