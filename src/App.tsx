import React, { useState } from "react";

type Lang = "en" | "es" | "tl";
type SectionId = "grow" | "shop" | "story" | "workforce" | "community" | "events";

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle:
      "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    intro:
      "Bronson Family Farm is more than a farm. It is a community-centered ecosystem connecting fresh food, workforce development, health, education, and long-term renewal.",
    enter: "Enter the Ecosystem",
    ecosystem: "Farm Ecosystem",
    explore: "Explore first. Activate a role when ready.",
    activateRole: "Activate My Role",
    back: "← Back to Ecosystem",
    open: "Open",
    enterSection: "Enter section",
    communityTitle: "Join the Ecosystem",
  },
  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia, la tierra y el aprendizaje.",
    intro:
      "Bronson Family Farm es más que una granja. Es un ecosistema comunitario.",
    enter: "Entrar al Ecosistema",
    ecosystem: "Ecosistema de la Granja",
    explore: "Explore primero.",
    activateRole: "Activar rol",
    back: "← Regresar",
    open: "Abrir",
    enterSection: "Entrar",
    communityTitle: "Únase al Ecosistema",
  },
  tl: {
    title: "Bronson Family Farm",
    subtitle: "Isang buhay na ecosystem.",
    intro: "Higit pa sa isang bukid.",
    enter: "Pumasok",
    ecosystem: "Ecosystem",
    explore: "Mag-explore muna.",
    activateRole: "Piliin ang Role",
    back: "← Bumalik",
    open: "Buksan",
    enterSection: "Buksan",
    communityTitle: "Sumali sa Ecosystem",
  },
};

const sectionData = {
  grow: { icon: "🌱", title: "Grow", desc: "Crop planning and production." },
  shop: { icon: "🛒", title: "Shop", desc: "Buy farm goods." },
  story: { icon: "📖", title: "Story", desc: "Farm history and purpose." },
  workforce: { icon: "👩🏽‍🌾", title: "Workforce", desc: "Youth programs." },
  community: { icon: "🤝", title: "Community", desc: "Volunteers and partners." },
  events: { icon: "📅", title: "Events", desc: "Markets and gatherings." },
};

const storyModules = [
  {
    id: "history",
    title: "The Bronson Family Farm Story",
    description:
      "How family legacy, community purpose, and the move to Youngstown shaped Bronson Family Farm.",
  },
  {
    id: "ecosystem",
    title: "Why the Ecosystem Matters",
    description:
      "How food, health, workforce, learning, commerce, and community support one another inside a single living system.",
  },
  {
    id: "airport",
    title: "The Lansdowne Airport Context",
    description:
      "Why the airport setting matters, what makes the site unique, and how the farm vision grows within that landscape.",
  },
];

const workforceTracks = [
  {
    id: "orientation",
    title: "Orientation",
    description:
      "Introduces safety, expectations, accountability, and how the farm ecosystem works.",
  },
  {
    id: "fieldwork",
    title: "Field Work",
    description:
      "Hands-on learning in planting, maintenance, harvest support, teamwork, and daily task completion.",
  },
  {
    id: "pathways",
    title: "Future Pathways",
    description:
      "Connects youth to long-term opportunity through confidence, experience, and practical career exposure.",
  },
];

const communityPaths = [
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Support planting, events, setup, logistics, and hands-on community activity.",
    action: "Volunteer Interest",
  },
  {
    id: "partner",
    title: "Partner",
    description:
      "Bring your organization into a growing ecosystem for food, workforce, health, and renewal.",
    action: "Partner Interest",
  },
  {
    id: "support",
    title: "Support",
    description:
      "Help expand food access, workforce training, and community impact.",
    action: "Support Interest",
  },
];

const shopItems = [
  { id: "bubble", name: "Bubble Babies Starter Roll", price: 5 },
  { id: "lettuce", name: "Lettuce Seedling Bundle", price: 5 },
  { id: "collards", name: "Collard Green Bundle", price: 10 },
  { id: "pepper", name: "Pepper Seedling Pack", price: 5 },
];

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<SectionId | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState("Welcome to the ecosystem.");
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [selectedWorkforce, setSelectedWorkforce] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});

  const ui = labels[lang];

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setStatus("Item added to cart.");
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
    setStatus("Item updated in cart.");
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = shopItems.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * item.price,
    0
  );

  const renderTopControls = () => (
    <div style={styles.topControls}>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        style={styles.select}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="tl">Tagalog</option>
      </select>
      <button
        style={styles.primaryButton}
        onClick={() => setStatus(role ? `Role: ${role}` : "Activate a role from the toolbox.")}
      >
        {role ? `Role: ${role}` : ui.activateRole}
      </button>
    </div>
  );

  const renderRolePanel = () => (
    <div style={styles.sidebar}>
      <h4>Role Actions</h4>
      <p style={{ fontSize: 14, color: "#486452", lineHeight: 1.4 }}>
        The center shows where to go. This panel shows what you can do.
      </p>

      <button style={styles.sidebarButton} onClick={() => setRole("Grower Tools")}>
        Grower Tools
      </button>
      <button style={styles.sidebarButton} onClick={() => setRole("Sales Tools")}>
        Sales Tools
      </button>
      <button style={styles.sidebarButton} onClick={() => setRole("Volunteer Tools")}>
        Volunteer Tools
      </button>
      <button style={styles.sidebarButton} onClick={() => setRole("Youth Tools")}>
        Youth Tools
      </button>

      {role && (
        <div style={{ marginTop: 20, fontSize: 14, color: "#1f3d2b" }}>
          <strong>Active toolbox:</strong> {role}
        </div>
      )}
    </div>
  );

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h4>BRONSON FAMILY FARM DEMO</h4>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="tl">Tagalog</option>
          </select>

          <h1>{ui.title}</h1>
          <p>{ui.subtitle}</p>
          <p>{ui.intro}</p>

          <button
            style={styles.primaryButton}
            onClick={() => {
              setEntered(true);
              setStatus("Entered the ecosystem.");
            }}
          >
            {ui.enter}
          </button>
        </div>
      </div>
    );
  }

  if (section === null) {
    return (
      <div style={styles.layout}>
        <div style={styles.main}>
          <h2>{ui.ecosystem}</h2>
          <p>{ui.explore}</p>

          {renderTopControls()}

          <div style={styles.status}>{status}</div>

          <div style={styles.grid}>
            {(Object.keys(sectionData) as SectionId[]).map((id) => {
              const item = sectionData[id];
              return (
                <div
                  key={id}
                  style={styles.cardItem}
                  onClick={() => {
                    if (id === "shop") {
                      window.open(
                        "https://grownby.com/farms/bronson-family-farm/shop",
                        "_blank"
                      );
                      setStatus("Opened GrownBy in a new tab.");
                    } else {
                      setSection(id);
                      setStatus(`${item.title} opened.`);
                    }
                  }}
                >
                  <div style={styles.icon}>{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {renderRolePanel()}
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      <div style={styles.main}>
        <button
          style={styles.back}
          onClick={() => {
            setSection(null);
            setStatus("Returned to ecosystem.");
          }}
        >
          {ui.back}
        </button>

        <h2>
          {sectionData[section].icon} {sectionData[section].title}
        </h2>

        {renderTopControls()}

        <div style={styles.status}>{status}</div>

        {section && (
          <div style={styles.content}>
            <div style={styles.contentAccent} />
            <h3 style={styles.contentTitle}>
              {sectionData[section].icon} {sectionData[section].title}
            </h3>

            {section === "grow" && (
              <p style={styles.contentText}>
                Explore crop planning, planting, production flow, irrigation thinking,
                and the systems that support Bronson Family Farm’s growing capacity.
              </p>
            )}

            {section === "story" && (
              <>
                <p style={styles.contentText}>
                  Bronson Family Farm is rooted in family legacy, community restoration,
                  and the belief that land can do more than produce crops. This section
                  explains the story, the ecosystem, and the Lansdowne context.
                </p>

                <div style={styles.innerGrid}>
                  {storyModules.map((module) => (
                    <button
                      key={module.id}
                      style={styles.innerCard}
                      onClick={() => {
                        setSelectedStory(module.id);
                        setStatus(`${module.title} opened.`);
                      }}
                    >
                      <h4 style={styles.innerCardTitle}>{module.title}</h4>
                      <p style={styles.innerCardText}>{module.description}</p>
                    </button>
                  ))}
                </div>

                {selectedStory && (
                  <div style={styles.focusBox}>
                    <strong>Story Focus</strong>
                    <p style={styles.contentText}>
                      {storyModules.find((m) => m.id === selectedStory)?.description}
                    </p>
                  </div>
                )}
              </>
            )}

            {section === "workforce" && (
              <>
                <p style={styles.contentText}>
                  This section introduces youth workforce pathways, responsibility,
                  training, hands-on participation, and long-term opportunity.
                </p>

                <div style={styles.innerGrid}>
                  {workforceTracks.map((track) => (
                    <button
                      key={track.id}
                      style={styles.innerCard}
                      onClick={() => {
                        setSelectedWorkforce(track.id);
                        setStatus(`${track.title} opened.`);
                      }}
                    >
                      <h4 style={styles.innerCardTitle}>{track.title}</h4>
                      <p style={styles.innerCardText}>{track.description}</p>
                    </button>
                  ))}
                </div>

                {selectedWorkforce && (
                  <div style={styles.focusBox}>
                    <strong>Track Focus</strong>
                    <p style={styles.contentText}>
                      {
                        workforceTracks.find((t) => t.id === selectedWorkforce)
                          ?.description
                      }
                    </p>
                  </div>
                )}
              </>
            )}

            {section === "community" && (
              <>
                <p style={styles.contentText}>
                  This section shows how volunteers, families, supporters, and partners
                  can step into the farm ecosystem in practical ways.
                </p>

                <div style={styles.innerGrid}>
                  {communityPaths.map((path) => (
                    <div key={path.id} style={styles.innerCardStatic}>
                      <h4 style={styles.innerCardTitle}>{path.title}</h4>
                      <p style={styles.innerCardText}>{path.description}</p>
                      <button
                        style={styles.primaryButton}
                        onClick={() => setStatus(`${path.action} opened.`)}
                      >
                        {path.action}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {section === "events" && (
              <p style={styles.contentText}>
                This section highlights markets, tours, demonstrations, and community
                gathering points that activate the full ecosystem.
              </p>
            )}

            {section === "shop" && (
              <>
                <p style={styles.contentText}>
                  Browse sample items here, then use the live GrownBy button to shop in a new tab.
                </p>

                <div style={styles.innerGrid}>
                  {shopItems.map((item) => {
                    const qty = cart[item.id] || 0;
                    return (
                      <div key={item.id} style={styles.innerCardStatic}>
                        <h4 style={styles.innerCardTitle}>{item.name}</h4>
                        <p style={styles.innerCardText}>${item.price.toFixed(2)}</p>
                        <div style={styles.qtyRow}>
                          <button style={styles.smallButton} onClick={() => removeFromCart(item.id)}>
                            −
                          </button>
                          <span>{qty}</span>
                          <button style={styles.smallButton} onClick={() => addToCart(item.id)}>
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={styles.focusBox}>
                  <strong>Current Cart</strong>
                  <p style={styles.contentText}>Items: {cartCount}</p>
                  <p style={styles.contentText}>Total: ${cartTotal.toFixed(2)}</p>
                  <button
                    style={styles.primaryButton}
                    onClick={() => {
                      window.open(
                        "https://grownby.com/farms/bronson-family-farm/shop",
                        "_blank"
                      );
                      setStatus("Opened GrownBy in a new tab.");
                    }}
                  >
                    Shop Live on GrownBy →
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {renderRolePanel()}
    </div>
  );
}

const styles: any = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#eaf5ee",
  },
  card: {
    background: "white",
    padding: 40,
    borderRadius: 12,
    textAlign: "center",
    maxWidth: 900,
    width: "100%",
    boxSizing: "border-box",
  },
  primaryButton: {
    marginTop: 20,
    padding: "10px 20px",
    background: "#2f6b3c",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  sidebarButton: {
    marginTop: 10,
    padding: "10px 14px",
    background: "white",
    color: "#1f3d2b",
    border: "1px solid #cfe0d2",
    borderRadius: 6,
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#eaf5ee",
  },
  main: {
    flex: 3,
    padding: 30,
  },
  sidebar: {
    flex: 1,
    background: "#eef4ef",
    padding: 20,
    borderLeft: "1px solid #ccc",
    minWidth: 260,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
  },
  cardItem: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    cursor: "pointer",
    border: "1px solid #ddd",
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  content: {
    marginTop: 20,
    background: "white",
    padding: 24,
    borderRadius: 12,
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },
  contentAccent: {
    height: "10px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "16px",
  },
  contentTitle: {
    margin: "0 0 12px 0",
    color: "#1f3d2b",
    fontSize: "28px",
  },
  contentText: {
    margin: "0 0 16px 0",
    color: "#486452",
    lineHeight: 1.7,
    fontSize: "16px",
  },
  innerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 20,
  },
  innerCard: {
    background: "#fff",
    border: "1px solid #cfe0d2",
    borderRadius: 10,
    padding: 16,
    cursor: "pointer",
    textAlign: "left",
  },
  innerCardStatic: {
    background: "#fff",
    border: "1px solid #cfe0d2",
    borderRadius: 10,
    padding: 16,
    textAlign: "left",
  },
  innerCardTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
    fontSize: "18px",
  },
  innerCardText: {
    margin: 0,
    color: "#486452",
    lineHeight: 1.5,
    fontSize: "14px",
  },
  focusBox: {
    marginTop: 20,
    background: "#f8fcf9",
    border: "1px solid #dbe8dd",
    borderRadius: 10,
    padding: 16,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  smallButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "1px solid #cfe0d2",
    background: "#fff",
    cursor: "pointer",
    fontSize: 18,
  },
  back: {
    marginBottom: 10,
    background: "transparent",
    border: "none",
    color: "#2f6b3c",
    cursor: "pointer",
    fontWeight: "bold",
  },
  status: {
    marginTop: 10,
    color: "#2f6b3c",
    fontWeight: "bold",
  },
  select: {
    marginBottom: 10,
    padding: "8px 10px",
  },
  topControls: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    margin: "12px 0 16px 0",
    flexWrap: "wrap",
  },
};
