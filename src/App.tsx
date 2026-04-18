import React, { useEffect, useMemo, useState } from "react";

type RoleKey = "guest" | "customer" | "grower" | "volunteer" | "youth";
type YouthViewKey =
  | "youthHome"
  | "parentPortal"
  | "supervisor"
  | "progress"
  | "attendance"
  | "support";

type WeatherState = {
  loading: boolean;
  city: string;
  temp?: number;
  high?: number;
  low?: number;
  wind?: number;
  description?: string;
  error?: string;
};

const brand = {
  bg: "linear-gradient(180deg, #f5efe3 0%, #e8f2e9 100%)",
  deep: "#1f4d36",
  forest: "#2e6a4a",
  moss: "#6d8b63",
  text: "#173126",
  card: "rgba(255,255,255,0.92)",
  line: "rgba(31,77,54,0.10)",
  soft: "#edf4ee",
};

const images = {
  hero: "/GrowArea.jpg",
  guest: "/SAM_0220.JPG",
  customer: "/SAM_0221.JPG",
  grower: "/SAM_0222.JPG",
  volunteer: "/SAM_0223.JPG",
  youth: "/SAM_0225.JPG",
  learning: "/SAM_0222.JPG",
  workforce: "/SAM_0225.JPG",
  operations: "/SAM_0237.JPG",
  market: "/GrowArea2.jpg",
};

const roles: RoleKey[] = ["guest", "customer", "grower", "volunteer", "youth"];

const announcements = [
  "Growers Supply Market preparation is active across the ecosystem.",
  "Fresh food, learning, and workforce development are connected in one place.",
  "Customers can move from marketplace to nutrition and recipes without leaving the platform.",
  "Youth Workforce includes youth, parents, supervisors, attendance, and support visibility.",
];

const buyingHistory = [
  "Tomatoes",
  "Collards",
  "Peppers",
  "Spinach",
  "Cabbage",
];

const weatherDescriptions: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy showers",
  95: "Thunderstorm",
};

function App() {
  const [homeMode, setHomeMode] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RoleKey>("guest");
  const [currentModule, setCurrentModule] = useState<string>("overview");
  const [youthView, setYouthView] = useState<YouthViewKey>("youthHome");
  const [voiceOn, setVoiceOn] = useState(false);
  const [now, setNow] = useState(new Date());
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [weather, setWeather] = useState<WeatherState>({
    loading: true,
    city: "Youngstown, OH",
  });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        setWeather((prev) => ({ ...prev, loading: true, error: undefined }));

        const geoRes = await fetch(
          "https://geocoding-api.open-meteo.com/v1/search?name=Youngstown&count=1&language=en&format=json"
        );
        const geoJson = await geoRes.json();
        const first = geoJson?.results?.[0];

        if (!first) throw new Error("Could not find location");

        const forecastRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${first.latitude}&longitude=${first.longitude}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
        );
        const forecastJson = await forecastRes.json();

        if (cancelled) return;

        setWeather({
          loading: false,
          city: `${first.name}, ${first.admin1 ?? "OH"}`,
          temp: Math.round(forecastJson?.current?.temperature_2m ?? 0),
          wind: Math.round(forecastJson?.current?.wind_speed_10m ?? 0),
          high: Math.round(forecastJson?.daily?.temperature_2m_max?.[0] ?? 0),
          low: Math.round(forecastJson?.daily?.temperature_2m_min?.[0] ?? 0),
          description:
            weatherDescriptions[forecastJson?.current?.weather_code] ??
            "Current conditions",
        });
      } catch (error) {
        if (cancelled) return;
        setWeather({
          loading: false,
          city: "Youngstown, OH",
          error: "Weather unavailable right now",
        });
      }
    }

    loadWeather();
    const timer = window.setInterval(loadWeather, 1000 * 60 * 15);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!voiceOn || !("speechSynthesis" in window)) return;

    const text = getNarration(selectedRole, currentModule, youthView);
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.93;
    utter.pitch = 1;
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);

    return () => window.speechSynthesis.cancel();
  }, [voiceOn, selectedRole, currentModule, youthView]);

  const narration = useMemo(
    () => getNarration(selectedRole, currentModule, youthView),
    [selectedRole, currentModule, youthView]
  );

  function openRole(role: RoleKey) {
    setSelectedRole(role);
    setHomeMode(false);

    if (role === "guest") setCurrentModule("overview");
    if (role === "customer") setCurrentModule("market");
    if (role === "grower") setCurrentModule("planning");
    if (role === "volunteer") setCurrentModule("events");
    if (role === "youth") {
      setCurrentModule("youth");
      setYouthView("youthHome");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: brand.bg,
        color: brand.text,
        fontFamily:
          "'Segoe UI', Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(245,239,227,0.86)",
          borderBottom: `1px solid ${brand.line}`,
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: brand.deep,
              }}
            >
              Bronson Family Farm Ecosystem Demo
            </div>
            <div style={{ fontSize: 13, opacity: 0.76 }}>
              Interactive live prototype
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <LivePill label={formatDate(now)} />
            <LivePill label={formatTime(now)} />
            <button onClick={() => setVoiceOn((v) => !v)} style={pillButton(voiceOn)}>
              Voice Narration: {voiceOn ? "ON" : "OFF"}
            </button>
            {!homeMode && (
              <button onClick={() => setHomeMode(true)} style={pillButton(false)}>
                Back to Home
              </button>
            )}
          </div>
        </div>
      </header>

      {homeMode ? (
        <main>
          <section
            style={{
              position: "relative",
              minHeight: 620,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(90deg, rgba(15,44,30,0.76), rgba(15,44,30,0.38)), url(${images.hero})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div
              style={{
                position: "relative",
                maxWidth: 1440,
                margin: "0 auto",
                padding: "68px 20px 72px",
                display: "grid",
                gridTemplateColumns: "1.2fr 0.85fr",
                gap: 24,
              }}
            >
              <div style={{ color: "white", alignSelf: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.16)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    padding: "8px 14px",
                    borderRadius: 999,
                    marginBottom: 18,
                    fontWeight: 700,
                  }}
                >
                  Bronson Family Farm • Farm & Family Alliance
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(42px, 6vw, 74px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                    maxWidth: 900,
                  }}
                >
                  A living ecosystem for growing, learning, buying, working, and
                  returning.
                </h1>

                <p
                  style={{
                    fontSize: 20,
                    lineHeight: 1.7,
                    maxWidth: 820,
                    color: "rgba(255,255,255,0.96)",
                    marginTop: 18,
                  }}
                >
                  This version feels more like a platform: live weather, live time,
                  rotating updates, role dashboards, and a dedicated Youth Workforce
                  system with youth, parent, supervisor, attendance, and support layers.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    flexWrap: "wrap",
                    marginTop: 26,
                  }}
                >
                  <button onClick={() => openRole("guest")} style={heroButton()}>
                    Enter Live Demo
                  </button>
                  <button onClick={() => openRole("youth")} style={heroButton(true)}>
                    Open Youth Workforce
                  </button>
                </div>
              </div>

              <div
                style={{
                  alignSelf: "end",
                  display: "grid",
                  gap: 16,
                }}
              >
                <GlassCard>
                  <div style={eyebrowLight()}>LIVE UPDATES</div>
                  <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.45 }}>
                    {announcements[announcementIndex]}
                  </div>
                </GlassCard>

                <GlassCard>
                  <div style={eyebrowLight()}>YOUNGSTOWN WEATHER</div>
                  {weather.loading ? (
                    <div style={{ fontSize: 20, fontWeight: 700 }}>
                      Loading weather…
                    </div>
                  ) : weather.error ? (
                    <div style={{ fontSize: 18 }}>{weather.error}</div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        alignItems: "end",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 18, opacity: 0.9 }}>{weather.city}</div>
                        <div style={{ fontSize: 42, fontWeight: 900 }}>
                          {weather.temp}°F
                        </div>
                        <div style={{ fontSize: 18 }}>{weather.description}</div>
                      </div>
                      <div style={{ fontSize: 16, lineHeight: 1.8 }}>
                        <div>High: {weather.high}°F</div>
                        <div>Low: {weather.low}°F</div>
                        <div>Wind: {weather.wind} mph</div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          </section>

          <section
            style={{
              maxWidth: 1440,
              margin: "0 auto",
              padding: "28px 20px 56px",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: brand.deep,
                marginBottom: 18,
                letterSpacing: "-0.04em",
              }}
            >
              Choose Your Role
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                gap: 20,
              }}
            >
              {roles.map((role) => (
                <RoleCard
                  key={role}
                  title={roleTitle(role)}
                  intro={roleIntro(role)}
                  image={roleImage(role)}
                  onOpen={() => openRole(role)}
                />
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "22px 20px 40px",
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 22,
          }}
        >
          <aside
            style={{
              background: brand.card,
              borderRadius: 28,
              padding: 18,
              border: `1px solid ${brand.line}`,
              boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
              height: "fit-content",
              position: "sticky",
              top: 94,
            }}
          >
            <div
              style={{
                borderRadius: 22,
                overflow: "hidden",
                height: 188,
                backgroundImage: `url(${roleImage(selectedRole)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                marginBottom: 16,
              }}
            />

            <div style={{ fontSize: 12, fontWeight: 800, opacity: 0.6 }}>ROLE</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: brand.deep,
                letterSpacing: "-0.04em",
                margin: "4px 0 10px",
              }}
            >
              {roleTitle(selectedRole)}
            </div>
            <div style={{ lineHeight: 1.7, marginBottom: 18 }}>
              {roleIntro(selectedRole)}
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => openRole(role)}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 16,
                    border: `1px solid ${brand.line}`,
                    background:
                      role === selectedRole ? "rgba(31,77,54,0.12)" : "white",
                    color: brand.deep,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {roleTitle(role)}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  opacity: 0.6,
                  marginBottom: 8,
                }}
              >
                LIVE ANNOUNCEMENT
              </div>
              <div
                style={{
                  background: brand.soft,
                  borderRadius: 16,
                  padding: 14,
                  lineHeight: 1.6,
                }}
              >
                {announcements[announcementIndex]}
              </div>
            </div>
          </aside>

          <section style={{ display: "grid", gap: 22 }}>
            <section
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: 320,
                borderRadius: 30,
                backgroundImage: `linear-gradient(90deg, rgba(16,40,28,0.78), rgba(16,40,28,0.28)), url(${roleImage(
                  selectedRole
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "0 18px 48px rgba(19,31,24,0.15)",
              }}
            >
              <div style={{ padding: 30, color: "white", maxWidth: 930 }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  {roleTitle(selectedRole)}
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(30px,4vw,56px)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {roleIntro(selectedRole)}
                </h2>

                <div
                  style={{
                    marginTop: 22,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {selectedRole !== "youth" ? (
                    getStandardTabs(selectedRole as Exclude<RoleKey, "youth">).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setCurrentModule(m.id)}
                        style={heroTab(currentModule === m.id)}
                      >
                        {m.label}
                      </button>
                    ))
                  ) : (
                    getYouthTabs().map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setYouthView(m.id)}
                        style={heroTab(youthView === m.id)}
                      >
                        {m.label}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "1.28fr 0.82fr",
                gap: 22,
              }}
            >
              <div
                style={{
                  background: brand.card,
                  borderRadius: 28,
                  padding: 24,
                  border: `1px solid ${brand.line}`,
                  boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: brand.deep,
                    letterSpacing: "-0.04em",
                    marginBottom: 16,
                  }}
                >
                  {selectedRole === "youth"
                    ? getYouthTabs().find((x) => x.id === youthView)?.label
                    : getStandardTabs(selectedRole as Exclude<RoleKey, "youth">).find(
                        (x) => x.id === currentModule
                      )?.label}
                </div>

                {selectedRole === "youth"
                  ? renderYouthView(youthView)
                  : renderStandardModule(
                      selectedRole as Exclude<RoleKey, "youth">,
                      currentModule
                    )}
              </div>

              <div style={{ display: "grid", gap: 22 }}>
                <div
                  style={{
                    background: "#173126",
                    color: "white",
                    borderRadius: 28,
                    padding: 22,
                    boxShadow: "0 18px 42px rgba(22,37,29,0.14)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      opacity: 0.75,
                      textTransform: "uppercase",
                    }}
                  >
                    Guided Narration
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      minHeight: 126,
                      fontSize: 18,
                      lineHeight: 1.75,
                    }}
                  >
                    {narration}
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <button onClick={() => setVoiceOn((v) => !v)} style={smallDarkButton()}>
                      {voiceOn ? "Pause Voice" : "Resume Voice"}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: brand.card,
                    borderRadius: 28,
                    padding: 22,
                    border: `1px solid ${brand.line}`,
                    boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: brand.deep,
                      marginBottom: 12,
                    }}
                  >
                    Live Conditions
                  </div>

                  {weather.loading ? (
                    <div style={{ lineHeight: 1.7 }}>Loading weather…</div>
                  ) : weather.error ? (
                    <div style={{ lineHeight: 1.7 }}>{weather.error}</div>
                  ) : (
                    <>
                      <div style={{ lineHeight: 1.7 }}>
                        <strong>{weather.city}</strong>
                        <br />
                        {weather.description}
                      </div>

                      <div
                        style={{
                          marginTop: 14,
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 10,
                        }}
                      >
                        <MetricCard label="Temp" value={`${weather.temp}°F`} />
                        <MetricCard label="Wind" value={`${weather.wind} mph`} />
                        <MetricCard label="High" value={`${weather.high}°F`} />
                        <MetricCard label="Low" value={`${weather.low}°F`} />
                      </div>
                    </>
                  )}

                  <div
                    style={{
                      marginTop: 16,
                      fontSize: 12,
                      opacity: 0.68,
                      lineHeight: 1.5,
                    }}
                  >
                    Weather data powered by Open-Meteo.
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      )}
    </div>
  );
}

function roleTitle(role: RoleKey) {
  switch (role) {
    case "guest":
      return "Guest";
    case "customer":
      return "Customer";
    case "grower":
      return "Grower";
    case "volunteer":
      return "Volunteer";
    case "youth":
      return "Youth Workforce";
  }
}

function roleIntro(role: RoleKey) {
  switch (role) {
    case "guest":
      return "Discover the farm, events, seasonal learning, and the spirit of regenerative community.";
    case "customer":
      return "Move quickly into marketplace pathways, nutrition guidance, and recipe support.";
    case "grower":
      return "Access crop planning, weather awareness, seasonal tasks, and operations visibility.";
    case "volunteer":
      return "See service pathways, events, support needs, and practical ways to contribute.";
    case "youth":
      return "Enter the Youth Workforce system with youth, parent, supervisor, attendance, and support views.";
  }
}

function roleImage(role: RoleKey) {
  switch (role) {
    case "guest":
      return images.guest;
    case "customer":
      return images.customer;
    case "grower":
      return images.grower;
    case "volunteer":
      return images.volunteer;
    case "youth":
      return images.youth;
  }
}

function getStandardTabs(role: Exclude<RoleKey, "youth">) {
  switch (role) {
    case "guest":
      return [
        { id: "overview", label: "Overview" },
        { id: "events", label: "Events" },
        { id: "learn", label: "Learning" },
      ];
    case "customer":
      return [
        { id: "market", label: "Marketplace" },
        { id: "nutrition", label: "Nutrition" },
        { id: "recipes", label: "Recipes" },
      ];
    case "grower":
      return [
        { id: "planning", label: "Crop Planning" },
        { id: "weather", label: "Weather" },
        { id: "operations", label: "Operations" },
      ];
    case "volunteer":
      return [
        { id: "events", label: "Events" },
        { id: "learn", label: "Learning" },
        { id: "operations", label: "Operations" },
      ];
  }
}

function getYouthTabs() {
  return [
    { id: "youthHome" as YouthViewKey, label: "Youth Dashboard" },
    { id: "parentPortal" as YouthViewKey, label: "Parent Portal" },
    { id: "supervisor" as YouthViewKey, label: "Supervisor Dashboard" },
    { id: "progress" as YouthViewKey, label: "Progress" },
    { id: "attendance" as YouthViewKey, label: "Attendance" },
    { id: "support" as YouthViewKey, label: "Support" },
  ];
}

function renderStandardModule(
  role: Exclude<RoleKey, "youth">,
  moduleId: string
) {
  if (role === "guest" && moduleId === "overview") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.learning} />
        <p style={bodyText()}>
          The ecosystem connects farm life, food access, education, agritourism,
          community participation, and workforce development. It should feel alive,
          useful, and welcoming.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Regenerative Land",
              text: "Restoring land, building soil, and reconnecting people to natural food systems.",
            },
            {
              title: "Community Pathways",
              text: "Guests, customers, growers, volunteers, and workforce participants all enter differently.",
            },
            {
              title: "Return Experience",
              text: "The design encourages people to come back for learning, events, buying, and participation.",
            },
          ]}
        />
      </div>
    );
  }

  if ((role === "guest" || role === "volunteer") && moduleId === "events") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          The event layer connects community activity, demonstrations, volunteer
          pathways, and seasonal visibility.
        </p>
        <ScheduleList
          items={[
            "Growers Supply Market preparation and event setup",
            "Demonstrations, workshops, and family learning sessions",
            "Volunteer check-in, support stations, and role assignments",
            "Seasonal tours, community outreach, and event follow-up",
          ]}
        />
      </div>
    );
  }

  if ((role === "guest" || role === "volunteer") && moduleId === "learn") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.learning} />
        <p style={bodyText()}>
          Learning is woven throughout the farm experience. It gives context,
          purpose, and practical tools before people act.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Food & Health",
              text: "Nutrition, processed food awareness, recipes, and practical wellness guidance.",
            },
            {
              title: "Farm Learning",
              text: "Growing systems, seasonal tasks, stewardship, and environmental awareness.",
            },
            {
              title: "Life Skills",
              text: "Responsibility, teamwork, confidence, and pathway awareness.",
            },
          ]}
        />
      </div>
    );
  }

  if (role === "customer" && moduleId === "market") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.market} />
        <p style={bodyText()}>
          Customers move directly into marketplace pathways, discover what is
          available, and connect purchases to nutrition and recipe support.
        </p>
        <div style={sectionTitle()}>Recent Interest</div>
        <div style={chipWrap()}>
          {buyingHistory.map((item) => (
            <span key={item} style={chip()}>
              {item}
            </span>
          ))}
        </div>
        <ThreeColCards
          items={[
            {
              title: "Fresh Access",
              text: "Find produce, seedlings, and farm-connected goods in one place.",
            },
            {
              title: "Smart Guidance",
              text: "Shopping can connect to health goals, household priorities, and food education.",
            },
            {
              title: "Quick Movement",
              text: "The customer pathway is intentionally fast because many people come to buy first.",
            },
          ]}
        />
      </div>
    );
  }

  if (role === "customer" && moduleId === "nutrition") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Nutrition guidance helps compare natural food with heavily processed
          food and shows how rising costs can push families toward substitutes
          that slowly harm health.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Food & Energy",
              text: "Natural foods can support stable energy, focus, and long-term health.",
            },
            {
              title: "Processed Food Reality",
              text: "Families often choose overprocessed substitutes under economic pressure.",
            },
            {
              title: "Practical Support",
              text: "This guidance is framed for real life, limited budgets, and household decision-making.",
            },
          ]}
        />
      </div>
    );
  }

  if (role === "customer" && moduleId === "recipes") {
    return (
      <ThreeColCards
        items={[
          {
            title: "Tomato & Pepper Skillet",
            text: "Simple fresh vegetables for a quick family meal.",
          },
          {
            title: "Collard & Cabbage Bowl",
            text: "A hearty meal that supports fiber, minerals, and fullness.",
          },
          {
            title: "Spinach Add-In Guide",
            text: "Easy ways to work greens into breakfast, lunch, and dinner.",
          },
        ]}
      />
    );
  }

  if (role === "grower" && moduleId === "planning") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.learning} />
        <p style={bodyText()}>
          Crop planning helps growers align timing, land readiness, weather,
          and work sequence.
        </p>
        <ScheduleList
          items={[
            "Seed starting and transplant timing",
            "Field preparation and seasonal sequencing",
            "Water, weather, and growth attention points",
            "Harvest readiness and operations planning",
          ]}
        />
      </div>
    );
  }

  if (role === "grower" && moduleId === "weather") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Weather visibility supports timing, watering, event comfort, and daily field decisions.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Field Rhythm",
              text: "Use weather to shape timing and readiness across the site.",
            },
            {
              title: "Watering Awareness",
              text: "Heat, wind, and temperature all influence irrigation attention.",
            },
            {
              title: "Workday Comfort",
              text: "Conditions affect youth, volunteers, visitors, and supervisors too.",
            },
          ]}
        />
      </div>
    );
  }

  if ((role === "grower" || role === "volunteer") && moduleId === "operations") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.operations} />
        <p style={bodyText()}>
          Operations brings together field readiness, daily movement, support needs,
          and practical coordination across the farm.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Field & Event Readiness",
              text: "Track setup, task timing, weather awareness, and movement across the site.",
            },
            {
              title: "Role-Based Visibility",
              text: "Different people see different layers, but everything remains connected.",
            },
            {
              title: "Supportive Oversight",
              text: "The system is meant to guide people without feeling cold or corporate.",
            },
          ]}
        />
      </div>
    );
  }

  return <div style={bodyText()}>Module loading…</div>;
}

function renderYouthView(view: YouthViewKey) {
  if (view === "youthHome") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <LargeImageBanner image={images.workforce} />
        <p style={bodyText()}>
          The Youth Workforce dashboard gives participants a clear entry point into
          tasks, learning, wellness, timing, and progress.
        </p>
        <ThreeColCards
          items={[
            {
              title: "Today’s Focus",
              text: "Orientation, field support, teamwork, and practical responsibility.",
            },
            {
              title: "Learning Path",
              text: "Youth can connect farm work to confidence, skill building, and future pathways.",
            },
            {
              title: "Wellness Awareness",
              text: "Support structures are visible so participation feels guided, not confusing.",
            },
          ]}
        />
      </div>
    );
  }

  if (view === "parentPortal") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          The Parent Portal gives families visibility into participation,
          schedule, attendance, progress, and support communication.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <MetricCard label="Youth Status" value="Active" />
          <MetricCard label="Attendance" value="Present" />
          <MetricCard label="Next Shift" value="Tue 8:00 AM" />
          <MetricCard label="Support Flag" value="Stable" />
        </div>
        <ThreeColCards
          items={[
            {
              title: "Family Visibility",
              text: "Parents can see if youth are present, progressing, and supported.",
            },
            {
              title: "Communication",
              text: "A parent view should reduce confusion and strengthen trust.",
            },
            {
              title: "Program Confidence",
              text: "Families understand what the workforce experience is building over time.",
            },
          ]}
        />
      </div>
    );
  }

  if (view === "supervisor") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Supervisor belongs inside Youth Workforce as a support function for youth,
          not as a separate ecosystem role.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <MetricCard label="Youth On Site" value="12" />
          <MetricCard label="Needs Review" value="2" />
          <MetricCard label="Wellness Checks" value="4" />
          <MetricCard label="Task Groups" value="3" />
        </div>
        <ThreeColCards
          items={[
            {
              title: "Observation",
              text: "Track youth presence, engagement, and general support needs.",
            },
            {
              title: "Structure",
              text: "Supervisors coordinate timing, task groups, and safety awareness.",
            },
            {
              title: "Support Resources",
              text: "The dashboard should help support staff respond with clarity and consistency.",
            },
          ]}
        />
      </div>
    );
  }

  if (view === "progress") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Progress shows growth in responsibility, teamwork, practical skills,
          consistency, and confidence.
        </p>
        <ProgressBars
          items={[
            { label: "Attendance Consistency", value: 82 },
            { label: "Teamwork", value: 76 },
            { label: "Task Completion", value: 84 },
            { label: "Leadership Readiness", value: 63 },
          ]}
        />
      </div>
    );
  }

  if (view === "attendance") {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p style={bodyText()}>
          Attendance helps youth, families, and supervisors stay aligned about
          presence, timing, and reliability.
        </p>
        <ScheduleList
          items={[
            "Mon • Present • Orientation & planning",
            "Tue • Present • Field activity and team tasks",
            "Wed • Present • Learning and support check",
            "Thu • Present • Production and cleanup",
            "Fri • Scheduled • Workforce pathway session",
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <p style={bodyText()}>
        Support keeps the Youth Workforce system humane. It includes wellness attention,
        encouragement, resources, and practical response.
      </p>
      <ThreeColCards
        items={[
          {
            title: "Wellness",
            text: "Track visible support needs and appropriate response pathways.",
          },
          {
            title: "Encouragement",
            text: "The system should reinforce growth, not only problems or gaps.",
          },
          {
            title: "Resource Visibility",
            text: "Support staff resources can be surfaced where they are actually needed.",
          },
        ]}
      />
    </div>
  );
}

function getNarration(
  role: RoleKey,
  currentModule: string,
  youthView: YouthViewKey
) {
  if (role === "guest" && currentModule === "overview") {
    return "Welcome into the living ecosystem of Bronson Family Farm. This area introduces the land, the mission, and the community pathway.";
  }
  if (role === "guest" && currentModule === "events") {
    return "This area shows how visitors connect with farm activities, demonstrations, and seasonal gatherings.";
  }
  if (role === "guest" && currentModule === "learn") {
    return "Here, visitors can understand the farm’s purpose, values, and practical learning opportunities.";
  }

  if (role === "customer" && currentModule === "market") {
    return "This pathway moves directly into shopping, fresh food access, and practical buying choices.";
  }
  if (role === "customer" && currentModule === "nutrition") {
    return "This section connects food choices to wellness, energy, and the realities of rising food costs.";
  }
  if (role === "customer" && currentModule === "recipes") {
    return "Here, fresh purchases are turned into practical meals families can actually prepare and enjoy.";
  }

  if (role === "grower" && currentModule === "planning") {
    return "This area focuses on timing, crop sequencing, field readiness, and the rhythm of growing.";
  }
  if (role === "grower" && currentModule === "weather") {
    return "This section helps shape decisions around planting, watering, field work, and overall conditions.";
  }
  if (role === "grower" && currentModule === "operations") {
    return "Here, field readiness, supply movement, and daily coordination come together.";
  }

  if (role === "volunteer" && currentModule === "events") {
    return "This view helps volunteers see where support is needed and how they fit into the day.";
  }
  if (role === "volunteer" && currentModule === "learn") {
    return "This section gives volunteers context so service connects to purpose.";
  }
  if (role === "volunteer" && currentModule === "operations") {
    return "This view supports clarity, timing, and practical contribution across the site.";
  }

  if (role === "youth" && youthView === "youthHome") {
    return "This dashboard introduces the youth experience through learning, responsibility, wellness, and growth.";
  }
  if (role === "youth" && youthView === "parentPortal") {
    return "This portal gives families visibility into attendance, schedule, progress, and support confidence.";
  }
  if (role === "youth" && youthView === "supervisor") {
    return "This dashboard supports staff oversight, youth coordination, structure, and response.";
  }
  if (role === "youth" && youthView === "progress") {
    return "This area tracks growth in teamwork, consistency, confidence, and readiness.";
  }
  if (role === "youth" && youthView === "attendance") {
    return "This section keeps youth, families, and staff aligned around participation and reliability.";
  }
  if (role === "youth" && youthView === "support") {
    return "This area surfaces wellness attention, encouragement, and practical support resources.";
  }

  return "Explore the next part of the ecosystem.";
}

function RoleCard({
  title,
  intro,
  image,
  onOpen,
}: {
  title: string;
  intro: string;
  image: string;
  onOpen: () => void;
}) {
  return (
    <div
      style={{
        background: brand.card,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 18px 42px rgba(22,37,29,0.08)",
        border: `1px solid ${brand.line}`,
      }}
    >
      <div
        style={{
          height: 220,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div style={{ padding: 20 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: brand.deep,
            letterSpacing: "-0.04em",
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div style={{ lineHeight: 1.7, minHeight: 92 }}>{intro}</div>
        <button onClick={onOpen} style={{ ...primaryButton(), marginTop: 16 }}>
          Enter Experience
        </button>
      </div>
    </div>
  );
}

function LivePill({ label }: { label: string }) {
  return (
    <div
      style={{
        borderRadius: 999,
        padding: "10px 14px",
        background: "white",
        color: brand.deep,
        fontWeight: 800,
        boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
      }}
    >
      {label}
    </div>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.14)",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: 28,
        padding: 22,
        color: "white",
        backdropFilter: "blur(8px)",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </div>
  );
}

function LargeImageBanner({ image }: { image: string }) {
  return (
    <div
      style={{
        height: 220,
        borderRadius: 24,
        backgroundImage: `linear-gradient(90deg, rgba(18,40,28,0.22), rgba(18,40,28,0.08)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        padding: 14,
        border: `1px solid ${brand.line}`,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.68, fontWeight: 700 }}>{label}</div>
      <div
        style={{
          marginTop: 6,
          fontSize: 20,
          fontWeight: 900,
          color: brand.deep,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ThreeColCards({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 14,
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          style={{
            background: "white",
            borderRadius: 20,
            padding: 18,
            border: `1px solid ${brand.line}`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: brand.deep,
              marginBottom: 8,
            }}
          >
            {item.title}
          </div>
          <div style={{ lineHeight: 1.65 }}>{item.text}</div>
        </div>
      ))}
    </div>
  );
}

function ScheduleList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((item) => (
        <div
          key={item}
          style={{
            background: "white",
            borderRadius: 18,
            padding: "14px 16px",
            border: `1px solid ${brand.line}`,
            lineHeight: 1.6,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function ProgressBars({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {items.map((item) => (
        <div key={item.label}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div
            style={{
              height: 12,
              background: "#e4ede5",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${item.value}%`,
                background: brand.deep,
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function bodyText(): React.CSSProperties {
  return {
    fontSize: 17,
    lineHeight: 1.8,
    margin: 0,
  };
}

function sectionTitle(): React.CSSProperties {
  return {
    fontSize: 22,
    fontWeight: 900,
    color: brand.deep,
  };
}

function chipWrap(): React.CSSProperties {
  return {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  };
}

function chip(): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(31,77,54,0.1)",
    color: brand.deep,
    fontWeight: 800,
  };
}

function primaryButton(): React.CSSProperties {
  return {
    border: "none",
    borderRadius: 999,
    padding: "14px 18px",
    background: brand.deep,
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(31,77,54,0.18)",
  };
}

function heroButton(ghost = false): React.CSSProperties {
  return {
    border: ghost ? "1px solid rgba(255,255,255,0.35)" : "none",
    borderRadius: 999,
    padding: "14px 20px",
    background: ghost ? "rgba(255,255,255,0.12)" : "white",
    color: ghost ? "white" : brand.deep,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: ghost ? "none" : "0 10px 24px rgba(0,0,0,0.12)",
  };
}

function heroTab(active: boolean): React.CSSProperties {
  return {
    border: "none",
    borderRadius: 999,
    padding: "12px 16px",
    cursor: "pointer",
    fontWeight: 800,
    background: active ? "white" : "rgba(255,255,255,0.16)",
    color: active ? brand.deep : "white",
  };
}

function pillButton(active: boolean): React.CSSProperties {
  return {
    border: "none",
    borderRadius: 999,
    padding: "10px 14px",
    background: active ? brand.deep : "white",
    color: active ? "white" : brand.deep,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
  };
}

function smallDarkButton(): React.CSSProperties {
  return {
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 999,
    padding: "10px 14px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: 800,
    cursor: "pointer",
  };
}

function eyebrowLight(): React.CSSProperties {
  return {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.08em",
    opacity: 0.75,
    textTransform: "uppercase",
    marginBottom: 10,
  };
}

export default App;
