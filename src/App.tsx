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
type CustomerView = "produce" | "nutrition" | "recipes" | "ordering";
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

const pathwaySummaries: Record<Screen, string> = {
  home: "Enter the ecosystem and discover how land becomes food, food becomes wellness, and wellness becomes opportunity.",
  guest: "Welcome, story, mission, events, and partnership pathways.",
  customer: "Fresh food, healthier choices, recipes, and ordering access.",
  grower: "Weather, crop planning, field awareness, and seasonal decision support.",
  producer: "Products, events, storytelling, collaboration, and value-added visibility.",
  youth: "Training, support, parent connection, supervisor structure, and daily growth.",
  admin: "Whole-system visibility across participation, operations, planning, and growth.",
  market: "Products, GrownBy, education, community, and ordering flow.",
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
    note: "Protect if evening temperatures dip.",
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

const todayItems = [
  "Fresh produce visibility, education, and ordering pathways remain active.",
  "Youth workforce structure supports confidence, responsibility, and growth.",
  "Grower timing stays linked to weather, crop planning, and continuity.",
  "Marketplace activity connects products, GrownBy, education, and community.",
  "The ecosystem is designed so every visitor finds resources and a next step.",
];

const impactStats = [
  { label: "118+ Acres Visioned", value: 118, suffix: "+" },
  { label: "100+ Positive Community Responses", value: 100, suffix: "+" },
  { label: "10+ Crop Families", value: 10, suffix: "+" },
  { label: "Youth Workforce Pathway", value: 1, suffix: " Active" },
];

const resourceGroups = [
  "Fresh food and healthier choices",
  "Youth workforce and family support",
  "Grower tools and crop planning",
  "Value-added product pathways",
  "Marketplace access through GrownBy",
  "Leadership visibility and growth planning",
];

const partnerLabels = [
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
      return "linear-gradient(135deg, #10261a 0%, #214a36 46%, #8f7d47 100%)";
    case "guest":
      return "linear-gradient(135deg, #173225 0%, #3e5c47 48%, #a28a57 100%)";
    case "customer":
      return "linear-gradient(135deg, #103429 0%, #1b6c55 48%, #cf9d43 100%)";
    case "grower":
      return "linear-gradient(135deg, #112a18 0%, #2f6c3e 48%, #7fae5a 100%)";
    case "producer":
      return "linear-gradient(135deg, #2a1e15 0%, #6b523a 50%, #c39867 100%)";
    case "youth":
      return "linear-gradient(135deg, #152639 0%, #2f667c 50%, #78aa6b 100%)";
    case "admin":
      return "linear-gradient(135deg, #211627 0%, #45406a 50%, #8778b8 100%)";
    case "market":
      return "linear-gradient(135deg, #22170f 0%, #684923 50%, #c49231 100%)";
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

function overlayFor(screen: Screen) {
  switch (screen) {
    case "home":
      return "linear-gradient(135deg, rgba(10,18,14,0.18), rgba(10,18,14,0.44))";
    case "guest":
      return "linear-gradient(135deg, rgba(40,25,10,0.16), rgba(24,16,8,0.42))";
    case "customer":
      return "linear-gradient(135deg, rgba(4,34,24,0.14), rgba(22,20,8,0.40))";
    case "grower":
      return "linear-gradient(135deg, rgba(6,32,16,0.16), rgba(8,18,8,0.42))";
    case "producer":
      return "linear-gradient(135deg, rgba(50,24,10,0.14), rgba(18,14,10,0.40))";
    case "youth":
      return "linear-gradient(135deg, rgba(8,18,40,0.14), rgba(10,16,22,0.42))";
    case "admin":
      return "linear-gradient(135deg, rgba(26,18,42,0.18), rgba(12,12,22,0.42))";
    case "market":
      return "linear-gradient(135deg, rgba(40,24,10,0.14), rgba(18,14,8,0.42))";
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

  const speak = (text: string, onComplete?: () => void) => {
    if (!("speechSynthesis" in window)) {
      onComplete?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => onComplete?.();
    utterance.onerror = () => onComplete?.();
    window.speechSynthesis.speak(utterance);
  };

  return { enabled, setEnabled, stop, speak };
}

function seasonPulseForMonth(month: number) {
  if ([12, 1, 2].includes(month)) return "Planning and protected growth";
  if ([3, 4, 5].includes(month)) return "Seedtime and expansion";
  if ([6, 7, 8].includes(month)) return "Peak growth and market activity";
  return "Harvest, storage, and next-cycle planning";
}

function useAnimatedCount(target: number, duration = 1200) {
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
  minHeight,
}: {
  title?: string;
  children: React.ReactNode;
  minHeight?: number;
}) {
  return (
    <div
      style={{
        background: "rgba(8, 12, 10, 0.52)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 26,
        backdropFilter: "blur(14px)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
        overflow: "hidden",
        minHeight,
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
          ? "1px solid rgba(213,255,194,0.84)"
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
        transition: "transform 160ms ease, box-shadow 160ms ease",
        boxShadow: primary ? "0 8px 22px rgba(187,237,148,0.18)" : "none",
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
  tint,
  onClick,
}: {
  title: string;
  subtitle: string;
  image: string;
  tint: string;
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
      <div style={{ position: "relative", height: 182 }}>
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
              background: tint,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: tint,
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.84), rgba(0,0,0,0.30), rgba(0,0,0,0.08))",
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
      <div style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>
        {count}
        {suffix}
      </div>
    </SoftBlock>
  );
}

function DestinationFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
      <ActionButton label="Back" onClick={onBack} />
      <ActionButton label={nextLabel} onClick={onNext} primary />
    </div>
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
            background: overlayFor(screen),
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 18%, rgba(189,239,154,0.12), transparent 32%), radial-gradient(circle at 82% 28%, rgba(255,210,120,0.10), transparent 30%)",
            animation: "bffGlow 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(3,8,6,0.32), rgba(3,8,6,0.60), rgba(3,8,6,0.90))",
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
            <div style={{ flex: "1 1 680px", minWidth: 280 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                <Pill text={screen.toUpperCase()} />
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  maxWidth: 940,
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
                  maxWidth: 920,
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
  const [growerView, setGrowerView] = useState<GrowerView>("weather");
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
      setFarmPulseIndex((prev) => (prev + 1) % todayItems.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const guidedTour = [
    {
      screen: "home" as Screen,
      text:
        "Welcome to Bronson Family Farm. This is a place-based ecosystem where land becomes food, food becomes wellness, and wellness becomes opportunity.",
      setup: () => {},
    },
    {
      screen: "guest" as Screen,
      text:
        "Guests begin with story, mission, events, and partnership pathways, so they understand why this place matters.",
      setup: () => setGuestView("story"),
    },
    {
      screen: "customer" as Screen,
      text:
        "Customers move from produce to nutrition to recipes to ordering, so discovery becomes action.",
      setup: () => setCustomerView("produce"),
    },
    {
      screen: "grower" as Screen,
      text:
        "Growers use weather, crop planning, field notes, and seasonal priorities to support real agricultural decisions.",
      setup: () => setGrowerView("weather"),
    },
    {
      screen: "youth" as Screen,
      text:
        "Youth workforce participants, families, and supervisors each have a clear destination with support and structure.",
      setup: () => setYouthView("overview"),
    },
    {
      screen: "market" as Screen,
      text:
        "The marketplace brings products, education, community, GrownBy, and ordering together in one place.",
      setup: () => setMarketView("products"),
    },
  ];

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!speech.enabled) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    const step = guidedTour[tourIndex];
    step.setup();
    navigate(step.screen);

    speech.speak(step.text, () => {
      timeoutRef.current = window.setTimeout(() => {
        setTourIndex((prev) => (prev + 1) % guidedTour.length);
      }, 1100);
    });

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [speech.enabled, tourIndex]);

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

  const goNext = () => {
    if (screen === "guest") {
      if (guestView === "story") setGuestView("mission");
      else if (guestView === "mission") setGuestView("events");
      else if (guestView === "events") setGuestView("partners");
      else navigate("customer");
    }

    if (screen === "customer") {
      if (customerView === "produce") setCustomerView("nutrition");
      else if (customerView === "nutrition") setCustomerView("recipes");
      else if (customerView === "recipes") setCustomerView("ordering");
      else navigate("market");
    }

    if (screen === "grower") {
      if (growerView === "weather") setGrowerView("planner");
      else if (growerView === "planner") setGrowerView("notes");
      else if (growerView === "notes") setGrowerView("season");
      else navigate("admin");
    }

    if (screen === "producer") {
      if (producerView === "products") setProducerView("events");
      else if (producerView === "events") setProducerView("storytelling");
      else if (producerView === "storytelling") setProducerView("collaboration");
      else navigate("market");
    }

    if (screen === "youth") {
      if (youthView === "overview") setYouthView("parent");
      else if (youthView === "parent") setYouthView("supervisor");
      else if (youthView === "supervisor") setYouthView("daily");
      else navigate("admin");
    }

    if (screen === "admin") {
      if (adminView === "participation") setAdminView("operations");
      else if (adminView === "operations") setAdminView("planning");
      else if (adminView === "planning") setAdminView("growth");
      else navigate("market");
    }

    if (screen === "market") {
      if (marketView === "products") setMarketView("grownby");
      else if (marketView === "grownby") setMarketView("education");
      else if (marketView === "education") setMarketView("community");
      else if (marketView === "community") setMarketView("ordering");
      else navigate("home");
    }
  };

  const goBack = () => {
    if (screen === "guest") {
      if (guestView === "partners") setGuestView("events");
      else if (guestView === "events") setGuestView("mission");
      else if (guestView === "mission") setGuestView("story");
      else navigate("home");
    }

    if (screen === "customer") {
      if (customerView === "ordering") setCustomerView("recipes");
      else if (customerView === "recipes") setCustomerView("nutrition");
      else if (customerView === "nutrition") setCustomerView("produce");
      else navigate("guest");
    }

    if (screen === "grower") {
      if (growerView === "season") setGrowerView("notes");
      else if (growerView === "notes") setGrowerView("planner");
      else if (growerView === "planner") setGrowerView("weather");
      else navigate("customer");
    }

    if (screen === "producer") {
      if (producerView === "collaboration") setProducerView("storytelling");
      else if (producerView === "storytelling") setProducerView("events");
      else if (producerView === "events") setProducerView("products");
      else navigate("home");
    }

    if (screen === "youth") {
      if (youthView === "daily") setYouthView("supervisor");
      else if (youthView === "supervisor") setYouthView("parent");
      else if (youthView === "parent") setYouthView("overview");
      else navigate("home");
    }

    if (screen === "admin") {
      if (adminView === "growth") setAdminView("planning");
      else if (adminView === "planning") setAdminView("operations");
      else if (adminView === "operations") setAdminView("participation");
      else navigate("grower");
    }

    if (screen === "market") {
      if (marketView === "ordering") setMarketView("community");
      else if (marketView === "community") setMarketView("education");
      else if (marketView === "education") setMarketView("grownby");
      else if (marketView === "grownby") setMarketView("products");
      else navigate("customer");
    }
  };

  if (screen === "home") {
    return (
      <ScreenShell
        screen="home"
        title="Bronson Family Farm Ecosystem"
        subtitle="A welcoming, place-based platform where visitors, customers, growers, youth, partners, and leaders all find resources, relationships, and opportunity."
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
                  <Pill text="Come back again and again" />
                </div>

                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  Bronson Family Farm is a resource ecosystem people can return to again and again.
                </div>

                <div style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.88)", fontSize: 17 }}>
                  Every pathway should help someone find resources, take a next step, and see why this place matters.
                </div>
              </Card>

              <Card title="What’s New Today">
                <SoftBlock title="Live Pulse">{todayItems[farmPulseIndex]}</SoftBlock>
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
                    subtitle={pathwaySummaries.guest}
                    image={imageFor("guest")}
                    tint={overlayFor("guest")}
                    onClick={() => navigate("guest")}
                  />
                  <PortalTile
                    title="Customer"
                    subtitle={pathwaySummaries.customer}
                    image={imageFor("customer")}
                    tint={overlayFor("customer")}
                    onClick={() => navigate("customer")}
                  />
                  <PortalTile
                    title="Grower"
                    subtitle={pathwaySummaries.grower}
                    image={imageFor("grower")}
                    tint={overlayFor("grower")}
                    onClick={() => navigate("grower")}
                  />
                  <PortalTile
                    title="Value-Added Producer"
                    subtitle={pathwaySummaries.producer}
                    image={imageFor("producer")}
                    tint={overlayFor("producer")}
                    onClick={() => navigate("producer")}
                  />
                  <PortalTile
                    title="Youth Workforce"
                    subtitle={pathwaySummaries.youth}
                    image={imageFor("youth")}
                    tint={overlayFor("youth")}
                    onClick={() => navigate("youth")}
                  />
                  <PortalTile
                    title="Leadership"
                    subtitle={pathwaySummaries.admin}
                    image={imageFor("admin")}
                    tint={overlayFor("admin")}
                    onClick={() => navigate("admin")}
                  />
                </div>
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

              <Card title="Resources Across the Ecosystem">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {resourceGroups.map((group) => (
                    <SoftBlock key={group}>{group}</SoftBlock>
                  ))}
                </div>
              </Card>

              <Card title="Partners and Platform Connections">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {partnerLabels.map((logo) => (
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
            Bronson Family Farm is more than a growing site. It is a place where people can encounter food, family, learning, healing, and future possibility.
          </SoftBlock>
          <SoftBlock>
            The guest pathway exists so a first-time visitor understands the heart of the ecosystem before moving deeper.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (guestView === "mission") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Mission">
            The mission is to grow food, strengthen families, restore land, develop people, and create lasting community value.
          </SoftBlock>
          <SoftBlock>
            Guests should leave this destination knowing that the farm carries both practical value and deeper purpose.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (guestView === "events") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Events">
            Tours, demonstrations, growers gatherings, youth activity, and market participation help move people from curiosity into involvement.
          </SoftBlock>
          <SoftBlock>
            Events are one of the main reasons people return again and again.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Partners">
            Growers, educators, vendors, wellness supporters, youth partners, and mission-aligned collaborators all have a place in this ecosystem.
          </SoftBlock>
          <SoftBlock>
            From here, continue into Customer to see how welcome becomes practical value.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Customer" />
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.guest} />
        <Card title="Pathway Support">
          <div style={{ display: "grid", gap: 10 }}>
            <SoftBlock>Welcoming entry point</SoftBlock>
            <SoftBlock>Story and mission clarity</SoftBlock>
            <SoftBlock>Events and participation paths</SoftBlock>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Guest Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
        <ActionButton label="Ordering" onClick={() => setCustomerView("ordering")} active={customerView === "ordering"} />
      </div>
    );

    let content: React.ReactNode = null;
    if (customerView === "produce") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Produce">
            Fresh produce visibility should lead customers toward confidence, selection, and real family use.
          </SoftBlock>
          <SoftBlock>
            Tomatoes, collards, cabbage, lettuce, broccoli, peppers, greens, and seedlings are all part of a practical food-access experience.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (customerView === "nutrition") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Nutrition">
            Healthy food should be understandable, accessible, and tied to better daily choices for families.
          </SoftBlock>
          <SoftBlock>
            This destination helps customers connect produce to wellness and not just to purchase.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (customerView === "recipes") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Recipes">
            Garden greens bowls, fresh tomato salads, pepper and cabbage skillet ideas, and simple household meals help people imagine using what they buy.
          </SoftBlock>
          <SoftBlock>
            Recipes are a return reason. They make the platform useful again tomorrow.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Ordering">
            This destination turns discovery into action and guides the customer toward the marketplace and GrownBy.
          </SoftBlock>
          <SoftBlock>
            The message here is simple: you can learn, choose, and then actually order.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Marketplace" />
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.customer} />
        <Card title="Customer Resources">
          <div style={{ display: "grid", gap: 10 }}>
            <SoftBlock>Food visibility</SoftBlock>
            <SoftBlock>Nutrition guidance</SoftBlock>
            <SoftBlock>Recipes and ordering path</SoftBlock>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Customer Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
            The grower pathway should feel practical and active, not decorative.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (growerView === "planner") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <CropPlannerPanel />
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (growerView === "notes") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Field Notes">
            Clay-heavy areas require careful moisture management, access planning, and timing sensitivity.
          </SoftBlock>
          <SoftBlock>
            Field notes help a grower move from observation to action.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Seasonal Priorities">
            Transplant review, succession planting, irrigation planning, and market continuity belong here.
          </SoftBlock>
          <SoftBlock>
            From here, continue into Leadership for the wider coordinating view.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Leadership" />
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.grower} />
        <Card title="Grower Resources">
          <div style={{ display: "grid", gap: 10 }}>
            <SoftBlock>Weather visibility</SoftBlock>
            <SoftBlock>Crop timing support</SoftBlock>
            <SoftBlock>Field-awareness decisions</SoftBlock>
          </div>
        </Card>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Grower Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
            Bubble Babies™, seedlings, educational kits, seasonal bundles, and event-ready offerings create visible value.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (producerView === "events") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Events">
            Markets, demonstrations, booths, and public experiences extend products into community presence.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (producerView === "storytelling") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Storytelling">
            Products gain power when they carry place, identity, and a visible mission story.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Collaboration">
            This destination connects vendors, educators, events, and partners into a wider value chain.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Marketplace" />
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.producer} />
        <Card title="Producer Resources">
          <div style={{ display: "grid", gap: 10 }}>
            <SoftBlock>Products</SoftBlock>
            <SoftBlock>Visibility</SoftBlock>
            <SoftBlock>Events and collaboration</SoftBlock>
          </div>
        </Card>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Producer Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
            Hands-on work, visible contribution, confidence-building, responsibility, and exposure to real opportunity belong here.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (youthView === "parent") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Parent Portal">
            Family visibility into expectations, progress, communication, and the purpose of participation.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (youthView === "supervisor") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Supervisor View">
            Daily oversight, progress awareness, intervention planning, and support coordination make the pathway stable.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Daily Focus">
            Garden preparation, professional habits, teamwork, responsibility, and visible contribution define the day.
          </SoftBlock>
          <SoftBlock>
            From here, continue into Leadership to see the wider coordinating view.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Leadership" />
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Youth Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
            Guests, customers, youth, growers, partners, and marketplace users all move through visible pathways that should be coordinated together.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (adminView === "operations") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Operations">
            Crop timing, marketplace readiness, event coordination, and pathway continuity belong here.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else if (adminView === "planning") {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Planning">
            This destination keeps leadership focused on what happens next and how the ecosystem grows with purpose.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} />
        </div>
      );
    } else {
      content = (
        <div style={{ display: "grid", gap: 12 }}>
          <SoftBlock title="Growth">
            High ecosystem interest, pathway expansion, and long-term place-based value building should remain visible.
          </SoftBlock>
          <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Continue to Marketplace" />
        </div>
      );
    }

    const aside = (
      <>
        <WeatherPanel data={weatherByScreen.admin} />
        <Card title="Leadership Resources">
          <div style={{ display: "grid", gap: 10 }}>
            <SoftBlock>System visibility</SoftBlock>
            <SoftBlock>Operational awareness</SoftBlock>
            <SoftBlock>Growth and planning</SoftBlock>
          </div>
        </Card>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr) 320px",
              gap: 18,
            }}
          >
            <Card title="Leadership Destinations">{menu}</Card>
            <Card title="Destination" minHeight={420}>{content}</Card>
            <div style={{ display: "grid", gap: 18 }}>{aside}</div>
          </div>
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
        <DestinationFooter onBack={goBack} onNext={goNext} />
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
        <DestinationFooter onBack={goBack} onNext={goNext} />
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
        <DestinationFooter onBack={goBack} onNext={goNext} />
      </div>
    );
  } else if (marketView === "community") {
    marketContent = (
      <div style={{ display: "grid", gap: 12 }}>
        <SoftBlock title="Community">
          Pickup days, demonstrations, and ecosystem participation extend the market beyond buying alone.
        </SoftBlock>
        <SoftBlock>
          This destination connects the market to events, family learning, grower visibility, and return visits.
        </SoftBlock>
        <DestinationFooter onBack={goBack} onNext={goNext} />
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
        <DestinationFooter onBack={goBack} onNext={goNext} nextLabel="Return Home" />
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px minmax(0, 1fr) 320px",
            gap: 18,
          }}
        >
          <Card title="Marketplace Destinations">{marketMenu}</Card>
          <Card title="Destination" minHeight={420}>{marketContent}</Card>
          <div style={{ display: "grid", gap: 18 }}>{marketAside}</div>
        </div>
      </div>
    </ScreenShell>
  );
}
