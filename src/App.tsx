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

type YouthTab = "overview" | "parent" | "supervisor";

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
    note: "Comfortable weather for marketplace traffic, food demonstrations, and pickups.",
  },
  grower: {
    condition: "Field-Friendly",
    temp: "61°F",
    high: "68°F",
    low: "48°F",
    note: "Suitable for transplant review, soil checks, irrigation planning, and crop decisions.",
  },
  producer: {
    condition: "Clear Windows",
    temp: "66°F",
    high: "72°F",
    low: "53°F",
    note: "Good conditions for vendor setup, product photos, and event preparation.",
  },
  youth: {
    condition: "Comfortable Outdoor Session",
    temp: "62°F",
    high: "68°F",
    low: "49°F",
    note: "Strong weather for hands-on learning, movement, and guided youth activities.",
  },
  admin: {
    condition: "Stable Outlook",
    temp: "63°F",
    high: "69°F",
    low: "50°F",
    note: "Favorable day for operations review, coordination, and planning.",
  },
  market: {
    condition: "Visitor-Friendly",
    temp: "67°F",
    high: "73°F",
    low: "54°F",
    note: "Good foot-traffic conditions for selling, education, and community engagement.",
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
    note: "Watch uniformity, pressure, and growth consistency.",
  },
  {
    crop: "Peppers",
    stage: "Warmth-sensitive development",
    timing: "Next several days",
    note: "Protect if evening temperatures drop.",
  },
  {
    crop: "Greens and Lettuce",
    stage: "Succession planning",
    timing: "Next wave",
    note: "Keep continuity for market and family food access.",
  },
  {
    crop: "Melons",
    stage: "Season preparation",
    timing: "Upcoming phase",
    note: "Align with heat, spacing, and irrigation needs.",
  },
];

const topNavOrder: { key: Screen; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "guest", label: "Guest" },
  { key: "customer", label: "Customer" },
  { key: "grower", label: "Grower" },
  { key: "producer", label: "Value-Added Producer" },
  { key: "youth", label: "Youth Workforce" },
  { key: "admin", label: "Leadership" },
  { key: "market", label: "Marketplace" },
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

  const speakSequence = (text: string, lang = "en-US", onComplete?: () => void) => {
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
      utterance.lang = lang;
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

function SoftBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 14,
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.92)",
      }}
    >
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
              background: "linear-gradient(135deg, #19341f 0%, #3c6f4e 55%, #9e8c58 100%)",
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
          <SoftBlock key={item.crop}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{item.crop}</div>
            <div>{item.stage}</div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{item.timing}</div>
            <div style={{ marginTop: 4 }}>{item.note}</div>
          </SoftBlock>
        ))}
      </div>
    </Card>
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
              transform: "scale(1.03)",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(3,8,6,0.36), rgba(3,8,6,0.62), rgba(3,8,6,0.88))",
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
  const [youthTab, setYouthTab] = useState<YouthTab>("overview");
  const [tourIndex, setTourIndex] = useState(0);

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

  const guidedSteps = [
    "Welcome to Bronson Family Farm. This is a living ecosystem rooted in land, family, food, and future.",
    "Guests begin with story, atmosphere, and mission.",
    "Customers discover fresh food, nutrition, recipes, and marketplace pathways.",
    "Growers use weather, crop timing, and planning tools to guide field decisions.",
    "Youth workforce participants experience learning, responsibility, and support, with parent portal and supervisor views inside the pathway.",
    "The marketplace brings food, education, and community participation together.",
  ];

  const tourScreens: Screen[] = ["home", "guest", "customer", "grower", "youth", "market"];

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!speech.enabled) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    speech.speakSequence(guidedSteps[tourIndex], "en-US", () => {
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
        {topNavOrder.map((item) => (
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
                  grower operations, market access, and long-term community opportunity in one place.
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
                    subtitle="Discover the story, mission, atmosphere, and identity of the farm."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("guest")}
                  />
                  <PortalTile
                    title="Customer"
                    subtitle="Explore produce, recipes, nutrition, food access, and marketplace pathways."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("customer")}
                  />
                  <PortalTile
                    title="Grower"
                    subtitle="Use weather, crop planner, timing, and field notes to support decisions."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("grower")}
                  />
                  <PortalTile
                    title="Value-Added Producer"
                    subtitle="Connect products, events, storytelling, and broader community value."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("producer")}
                  />
                  <PortalTile
                    title="Youth Workforce"
                    subtitle="Experience youth learning, parent portal, supervisor view, and support."
                    image="/GrowArea.jpg"
                    onClick={() => navigate("youth")}
                  />
                  <PortalTile
                    title="Leadership"
                    subtitle="See the whole ecosystem through participation, operations, and planning."
                    image="/GrowArea2.jpg"
                    onClick={() => navigate("admin")}
                  />
                </div>
              </Card>

              <Card title="Live Ecosystem Snapshot">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  <SoftBlock>
                    <strong>Visitors</strong>
                    <br />
                    Guests discover story, purpose, and next steps.
                  </SoftBlock>
                  <SoftBlock>
                    <strong>Customers</strong>
                    <br />
                    Fresh food meets recipes, nutrition, and market access.
                  </SoftBlock>
                  <SoftBlock>
                    <strong>Growers</strong>
                    <br />
                    Weather and crop timing shape real field decisions.
                  </SoftBlock>
                  <SoftBlock>
                    <strong>Youth Workforce</strong>
                    <br />
                    Learning, family connection, support, and responsibility.
                  </SoftBlock>
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
    return (
      <ScreenShell
        screen="guest"
        title="Guest Portal"
        subtitle="A warm and welcoming entry into the story, mission, and living atmosphere of Bronson Family Farm."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.55fr) minmax(320px, 0.95fr)",
              gap: 18,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <Card title="Why This Place Matters">
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    Bronson Family Farm is designed to feel open, welcoming, and restorative.
                    It invites people into a different relationship with food, land, and family.
                  </SoftBlock>
                  <SoftBlock>
                    Guests begin by understanding that this farm is also a living ecosystem:
                    a place where agriculture, opportunity, wellness, and belonging meet.
                  </SoftBlock>
                  <SoftBlock>
                    The guest experience is the front door into everything else: customer engagement,
                    grower pathways, youth workforce learning, and market participation.
                  </SoftBlock>
                </div>
              </Card>

              <Card title="What Guests Can Discover">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 12,
                  }}
                >
                  <SoftBlock>Story, mission, and place-based identity</SoftBlock>
                  <SoftBlock>Legacy, land restoration, and community meaning</SoftBlock>
                  <SoftBlock>Events, tours, and ecosystem entry points</SoftBlock>
                  <SoftBlock>Pathways into customer, grower, youth, and market experiences</SoftBlock>
                </div>
              </Card>

              <Card title="Next Step">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <ActionButton label="Become a Customer" onClick={() => navigate("customer")} primary />
                  <ActionButton label="Visit Marketplace" onClick={() => navigate("market")} />
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <WeatherPanel data={weatherByScreen.guest} />
              <Card title="Visitor Experience">
                <SoftBlock>
                  This screen should feel like an invitation:
                  welcoming language, open pathways, and a clear sense that people belong here.
                </SoftBlock>
              </Card>
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "customer") {
    return (
      <ScreenShell
        screen="customer"
        title="Customer Portal"
        subtitle="Fresh food, healthier choices, recipes, nutrition learning, and direct pathways into marketplace activity."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.5fr) minmax(320px, 0.95fr)",
              gap: 18,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <Card title="Fresh Availability">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    "Tomatoes",
                    "Collards",
                    "Cabbage",
                    "Lettuce",
                    "Broccoli",
                    "Peppers",
                    "Spinach",
                    "Mustards",
                  ].map((item) => (
                    <SoftBlock key={item}>{item}</SoftBlock>
                  ))}
                </div>
              </Card>

              <Card title="Nutrition and Food Education">
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    Natural food supports healthier households and reduces reliance on overprocessed options.
                  </SoftBlock>
                  <SoftBlock>
                    The customer experience can connect food access to recipes, meal ideas, and stronger daily nutrition habits.
                  </SoftBlock>
                  <SoftBlock>
                    This area should feel useful, not decorative: food visibility, education, and next-step action in one place.
                  </SoftBlock>
                </div>
              </Card>

              <Card title="Recipes and Everyday Use">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  <SoftBlock>Garden greens bowl</SoftBlock>
                  <SoftBlock>Fresh tomato salad</SoftBlock>
                  <SoftBlock>Pepper and cabbage skillet</SoftBlock>
                  <SoftBlock>Market-day meal planning</SoftBlock>
                </div>
              </Card>

              <Card title="Action">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <ActionButton label="Go to Marketplace" onClick={() => navigate("market")} primary />
                  <ActionButton label="See Grower Side" onClick={() => navigate("grower")} />
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <WeatherPanel data={weatherByScreen.customer} />
              <Card title="Customer Value">
                <SoftBlock>
                  Customers should feel guided toward healthier food, trusted relationships, and a reason to return.
                </SoftBlock>
              </Card>
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "grower") {
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
              gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.95fr)",
              gap: 18,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <CropPlannerPanel />

              <Card title="Grower Field Notes">
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>Clay-heavy areas require careful moisture and access planning.</SoftBlock>
                  <SoftBlock>Irrigation, spacing, and seasonal timing should be visible on this screen.</SoftBlock>
                  <SoftBlock>This is where weather and crop timing become useful, not just descriptive.</SoftBlock>
                </div>
              </Card>

              <Card title="Operational Priorities">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 12,
                  }}
                >
                  <SoftBlock>Transplant review</SoftBlock>
                  <SoftBlock>Irrigation planning</SoftBlock>
                  <SoftBlock>Succession planting</SoftBlock>
                  <SoftBlock>Seasonal market continuity</SoftBlock>
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <WeatherPanel data={weatherByScreen.grower} />
              <Card title="Grower Outlook">
                <SoftBlock>
                  This screen should feel operational and alive: current field conditions, timing, and visible next steps.
                </SoftBlock>
              </Card>
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "producer") {
    return (
      <ScreenShell
        screen="producer"
        title="Value-Added Producer Portal"
        subtitle="Products, storytelling, event visibility, vendor pathways, and the wider value created around farm activity."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            <Card title="Product Pathways">
              <div style={{ display: "grid", gap: 12 }}>
                <SoftBlock>Bubble Babies™</SoftBlock>
                <SoftBlock>Seedlings and garden starts</SoftBlock>
                <SoftBlock>Educational kits and themed bundles</SoftBlock>
                <SoftBlock>Event-ready products and displays</SoftBlock>
              </div>
            </Card>

            <Card title="Visibility and Growth">
              <div style={{ display: "grid", gap: 12 }}>
                <SoftBlock>Farmers market presence</SoftBlock>
                <SoftBlock>Event storytelling and demonstrations</SoftBlock>
                <SoftBlock>Product identity and brand visibility</SoftBlock>
                <SoftBlock>Collaboration pathways into broader community value</SoftBlock>
              </div>
            </Card>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "youth") {
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
              gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.95fr)",
              gap: 18,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <Card title="Youth Workforce">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                  <ActionButton
                    label="Overview"
                    onClick={() => setYouthTab("overview")}
                    active={youthTab === "overview"}
                  />
                  <ActionButton
                    label="Parent Portal"
                    onClick={() => setYouthTab("parent")}
                    active={youthTab === "parent"}
                  />
                  <ActionButton
                    label="Supervisor View"
                    onClick={() => setYouthTab("supervisor")}
                    active={youthTab === "supervisor"}
                  />
                </div>

                {youthTab === "overview" && (
                  <div style={{ display: "grid", gap: 12 }}>
                    <SoftBlock>Hands-on work, visible contribution, and confidence-building</SoftBlock>
                    <SoftBlock>Exposure to teamwork, responsibility, and work readiness</SoftBlock>
                    <SoftBlock>Learning that feels real, useful, and connected to community impact</SoftBlock>
                    <SoftBlock>Support structures that help young people move toward stability and purpose</SoftBlock>
                  </div>
                )}

                {youthTab === "parent" && (
                  <div style={{ display: "grid", gap: 12 }}>
                    <SoftBlock>Family visibility into expectations and program structure</SoftBlock>
                    <SoftBlock>Awareness of progress, growth, and opportunity</SoftBlock>
                    <SoftBlock>Communication that helps bridge home and youth participation</SoftBlock>
                    <SoftBlock>A place where the program feels connected to the family, not separate from it</SoftBlock>
                  </div>
                )}

                {youthTab === "supervisor" && (
                  <div style={{ display: "grid", gap: 12 }}>
                    <SoftBlock>Daily oversight and support planning</SoftBlock>
                    <SoftBlock>Progress visibility and accountability</SoftBlock>
                    <SoftBlock>Intervention awareness and support coordination</SoftBlock>
                    <SoftBlock>Structure that keeps the youth pathway stable and meaningful</SoftBlock>
                  </div>
                )}
              </Card>

              <Card title="Today’s Focus">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                  }}
                >
                  <SoftBlock>Garden preparation</SoftBlock>
                  <SoftBlock>Professional habits</SoftBlock>
                  <SoftBlock>Teamwork and responsibility</SoftBlock>
                  <SoftBlock>Visible contribution and reflection</SoftBlock>
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <WeatherPanel data={weatherByScreen.youth} />
              <CropPlannerPanel />
            </div>
          </div>
        </div>
      </ScreenShell>
    );
  }

  if (screen === "admin") {
    return (
      <ScreenShell
        screen="admin"
        title="Leadership Dashboard"
        subtitle="A whole-system view of participation, operations, planning, learning, and long-term ecosystem coordination."
        topActions={commonTopActions}
      >
        <div style={{ display: "grid", gap: 18 }}>
          {navBar}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 18,
            }}
          >
            <Card title="Participation">
              <div style={{ display: "grid", gap: 12 }}>
                <SoftBlock>Guests exploring pathways</SoftBlock>
                <SoftBlock>Customers engaging food and market activity</SoftBlock>
                <SoftBlock>Youth workforce in active learning cycle</SoftBlock>
              </div>
            </Card>

            <Card title="Operations">
              <div style={{ display: "grid", gap: 12 }}>
                <SoftBlock>Crop timing and irrigation review</SoftBlock>
                <SoftBlock>Marketplace readiness and event coordination</SoftBlock>
                <SoftBlock>Field planning and continuity needs</SoftBlock>
              </div>
            </Card>

            <Card title="Growth Outlook">
              <div style={{ display: "grid", gap: 12 }}>
                <SoftBlock>High ecosystem interest</SoftBlock>
                <SoftBlock>Visible pathway expansion potential</SoftBlock>
                <SoftBlock>Long-term place-based value building</SoftBlock>
              </div>
            </Card>
          </div>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      screen="market"
      title="Marketplace"
      subtitle="Where produce, education, visibility, and community buying activity come together."
      topActions={commonTopActions}
    >
      <div style={{ display: "grid", gap: 18 }}>
        {navBar}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <Card title="Products">
            <div style={{ display: "grid", gap: 12 }}>
              <SoftBlock>Produce and seasonal availability</SoftBlock>
              <SoftBlock>Seedlings and starts</SoftBlock>
              <SoftBlock>Garden-focused offerings</SoftBlock>
            </div>
          </Card>

          <Card title="Education">
            <div style={{ display: "grid", gap: 12 }}>
              <SoftBlock>Recipes and meal ideas</SoftBlock>
              <SoftBlock>Nutrition support and healthier food habits</SoftBlock>
              <SoftBlock>Learning that supports long-term family wellness</SoftBlock>
            </div>
          </Card>

          <Card title="Community">
            <div style={{ display: "grid", gap: 12 }}>
              <SoftBlock>Pickup days and market participation</SoftBlock>
              <SoftBlock>Demonstrations and ecosystem entry points</SoftBlock>
              <SoftBlock>A bridge back into the larger platform</SoftBlock>
            </div>
          </Card>
        </div>
      </div>
    </ScreenShell>
  );
}
