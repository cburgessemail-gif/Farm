import React, { useState } from "react";
import heroImg from "./GrowArea.jpg";
import growImg from "./GrowArea2.jpg";
import storyImg from "./SAM_0220.JPG";
import communityImg from "./SAM_0221.JPG";

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
    communityTitle: "Join the Ecosystem",
  },
  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia, la tierra y el aprendizaje.",
    intro:
      "Bronson Family Farm es más que una granja. Es un ecosistema comunitario centrado en alimentos, trabajo, salud y educación.",
    enter: "Entrar al Ecosistema",
    ecosystem: "Ecosistema de la Granja",
    explore: "Explore primero. Active un rol cuando esté listo.",
    activateRole: "Activar rol",
    back: "← Regresar",
    communityTitle: "Únase al Ecosistema",
  },
  tl: {
    title: "Bronson Family Farm",
    subtitle:
      "Isang buhay na ecosystem na nakaugat sa pagkain, pamilya, lupa, at pagkatuto.",
    intro:
      "Ang Bronson Family Farm ay higit pa sa isang bukid. Isa itong ecosystem para sa komunidad na nag-uugnay sa pagkain, trabaho, kalusugan, at edukasyon.",
    enter: "Pumasok",
    ecosystem: "Farm Ecosystem",
    explore: "Mag-explore muna. Pumili ng role kapag handa na.",
    activateRole: "Piliin ang Role",
    back: "← Bumalik",
    communityTitle: "Sumali sa Ecosystem",
  },
};

const sectionData = {
  grow: {
    icon: "🌱",
    title: "Grow",
    desc: "Crop planning and production.",
    detail:
      "Explore crop planning, planting, production flow, irrigation thinking, and the systems that support Bronson Family Farm’s growing capacity.",
  },
  shop: {
    icon: "🛒",
    title: "Shop",
    desc: "Buy farm goods.",
    detail:
      "Browse sample items here, then use the live GrownBy button to shop in a new tab.",
  },
  story: {
    icon: "📖",
    title: "Story",
    desc: "Farm history and purpose.",
    detail:
      "Bronson Family Farm is rooted in family legacy, community restoration, and the belief that land can do more than produce crops.",
  },
  workforce: {
    icon: "👩🏽‍🌾",
    title: "Workforce",
    desc: "Youth programs.",
    detail:
      "This section introduces youth workforce pathways, responsibility, training, hands-on participation, and long-term opportunity.",
  },
  community: {
    icon: "🤝",
    title: "Community",
    desc: "Volunteers and partners.",
    detail:
      "This section shows how volunteers, families, supporters, and partners can step into the farm ecosystem in practical ways.",
  },
  events: {
    icon: "📅",
    title: "Events",
    desc: "Markets and gatherings.",
    detail:
      "This section highlights markets, tours, demonstrations, and community gathering points that activate the full ecosystem.",
  },
};

const imagePaths = {
  hero: heroImg,
  grow: growImg,
  shop: growImg,
  story: storyImg,
  workforce: communityImg,
  community: communityImg,
  events: storyImg,
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
  const [heroFailed, setHeroFailed] = useState(false);
  const [sectionImageFailed, setSectionImageFailed] = useState<Record<string, boolean>>({});

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
        onClick={() =>
          setStatus(role ? `Role active: ${role}` : "Use the Role Actions panel on the right.")
        }
      >
        {role ? `Role: ${role}` : ui.activateRole}
      </button>
    </div>
  );

  const renderRolePanel = () => (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarInner}>
        <div style={styles.sidebarEyebrow}>Toolbox</div>
        <h3 style={styles.sidebarTitle}>Role Actions</h3>
        <p style={styles.sidebarText}>
          The center shows where to go. This panel shows what you can do.
        </p>

        <button
          style={styles.sidebarButton}
          onClick={() => {
            setRole("Grower Tools");
            setSection("grow");
            setStatus("Grow opened from Grower Tools.");
          }}
        >
          Grower Tools
        </button>

        <button
          style={styles.sidebarButton}
          onClick={() => {
            setRole("Sales Tools");
            setSection("shop");
            setStatus("Shop opened from Sales Tools.");
          }}
        >
          Sales Tools
        </button>

        <button
          style={styles.sidebarButton}
          onClick={() => {
            setRole("Volunteer Tools");
            setSection("community");
            setStatus("Community opened from Volunteer Tools.");
          }}
        >
          Volunteer Tools
        </button>

        <button
          style={styles.sidebarButton}
          onClick={() => {
            setRole("Youth Tools");
            setSection("workforce");
            setStatus("Workforce opened from Youth Tools.");
          }}
        >
          Youth Tools
        </button>

        {role && (
          <div style={styles.activeToolbox}>
            <strong>Active toolbox:</strong> {role}
          </div>
        )}
      </div>
    </aside>
  );

  const renderSectionImage = (key: keyof typeof imagePaths) => {
    if (sectionImageFailed[key]) {
      return <div style={styles.sectionImageFallback} />;
    }

    return (
      <img
        src={imagePaths[key]}
        alt={key}
        style={styles.sectionImage}
        onError={() =>
          setSectionImageFailed((prev) => ({
            ...prev,
            [key]: true,
          }))
        }
      />
    );
  };

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.heroCard}>
          <div style={styles.heroEyebrow}>Bronson Family Farm Demo</div>

          <div style={styles.heroControls}>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={styles.select}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="tl">Tagalog</option>
            </select>
          </div>

          {!heroFailed ? (
            <img
              src={imagePaths.hero}
              alt="Bronson Family Farm"
              style={styles.heroImage}
              onError={() => setHeroFailed(true)}
            />
          ) : (
            <div style={styles.heroImageFallback} />
          )}

          <h1 style={styles.heroTitle}>{ui.title}</h1>
          <p style={styles.heroSubtitle}>{ui.subtitle}</p>
          <p style={styles.heroText}>{ui.intro}</p>

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
        <main style={styles.main}>
          <div style={styles.headerBlock}>
            <div>
              <h2 style={styles.pageTitle}>{ui.ecosystem}</h2>
              <p style={styles.pageSubtitle}>{ui.explore}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.status}>{status}</div>

          <div style={styles.sectionGrid}>
            {(Object.keys(sectionData) as SectionId[]).map((id) => {
              const item = sectionData[id];
              return (
                <button
                  key={id}
                  style={styles.sectionCard}
                  onClick={() => {
                    if (id === "shop") {
                      setSection("shop");
                      setStatus("Shop opened.");
                    } else {
                      setSection(id);
                      setStatus(`${item.title} opened.`);
                    }
                  }}
                >
                  <div style={styles.sectionCardAccent} />
                  <div style={styles.sectionIcon}>{item.icon}</div>
                  <h4 style={styles.sectionCardTitle}>{item.title}</h4>
                  <p style={styles.sectionCardText}>{item.desc}</p>
                </button>
              );
            })}
          </div>
        </main>

        {renderRolePanel()}
      </div>
    );
  }

  return (
    <div style={styles.layout}>
      <main style={styles.main}>
        <button
          style={styles.backButton}
          onClick={() => {
            setSection(null);
            setStatus("Returned to ecosystem.");
          }}
        >
          {ui.back}
        </button>

        <div style={styles.headerBlock}>
          <div>
            <h2 style={styles.pageTitle}>
              {sectionData[section].icon} {sectionData[section].title}
            </h2>
            <p style={styles.pageSubtitle}>{sectionData[section].desc}</p>
          </div>
          {renderTopControls()}
        </div>

        <div style={styles.status}>{status}</div>

        <section style={styles.content}>
          {section === "grow" && renderSectionImage("grow")}
          {section === "shop" && renderSectionImage("shop")}
          {section === "story" && renderSectionImage("story")}
          {section === "workforce" && renderSectionImage("workforce")}
          {section === "community" && renderSectionImage("community")}
          {section === "events" && renderSectionImage("events")}

          <div style={styles.contentAccent} />
          <h3 style={styles.contentTitle}>
            {sectionData[section].icon} {sectionData[section].title}
          </h3>

          {section === "grow" && (
            <p style={styles.contentText}>{sectionData.grow.detail}</p>
          )}

          {section === "story" && (
            <>
              <p style={styles.contentText}>{sectionData.story.detail}</p>

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
              <p style={styles.contentText}>{sectionData.workforce.detail}</p>

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
                    {workforceTracks.find((t) => t.id === selectedWorkforce)?.description}
                  </p>
                </div>
              )}
            </>
          )}

          {section === "community" && (
            <>
              <p style={styles.contentText}>{sectionData.community.detail}</p>

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
            <p style={styles.contentText}>{sectionData.events.detail}</p>
          )}

          {section === "shop" && (
            <>
              <p style={styles.contentText}>{sectionData.shop.detail}</p>

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
                        <span style={styles.qtyValue}>{qty}</span>
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
        </section>
      </main>

      {renderRolePanel()}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#dfeae2",
    padding: "32px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },
  heroCard: {
    width: "100%",
    maxWidth: "980px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "48px 40px",
    boxSizing: "border-box",
    boxShadow: "0 10px 30px rgba(31,61,43,0.08)",
    border: "1px solid #d6e4d9",
    textAlign: "center",
  },
  heroEyebrow: {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
    marginBottom: "18px",
  },
  heroControls: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  heroImage: {
    width: "100%",
    maxWidth: "820px",
    height: "320px",
    objectFit: "cover",
    borderRadius: "16px",
    display: "block",
    margin: "0 auto 24px auto",
    border: "1px solid #d6e4d9",
  },
  heroImageFallback: {
    width: "100%",
    maxWidth: "820px",
    height: "320px",
    borderRadius: "16px",
    display: "block",
    margin: "0 auto 24px auto",
    border: "1px solid #d6e4d9",
    background: "linear-gradient(135deg, #e8f1ea 0%, #dfeae2 100%)",
  },
  heroTitle: {
    margin: "0 0 16px 0",
    fontSize: "56px",
    lineHeight: 1.05,
    color: "#1f3d2b",
  },
  heroSubtitle: {
    margin: "0 auto 18px auto",
    maxWidth: "760px",
    fontSize: "28px",
    lineHeight: 1.2,
    color: "#355743",
  },
  heroText: {
    margin: "0 auto 28px auto",
    maxWidth: "860px",
    fontSize: "20px",
    lineHeight: 1.6,
    color: "#486452",
  },
  layout: {
    minHeight: "100vh",
    display: "flex",
    background: "#dfeae2",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    flex: 1,
    padding: "32px",
    boxSizing: "border-box",
  },
  sidebar: {
    width: "320px",
    minWidth: "320px",
    background: "#edf4ee",
    borderLeft: "1px solid #d6e4d9",
    padding: "24px",
    boxSizing: "border-box",
  },
  sidebarInner: {
    position: "sticky",
    top: "24px",
  },
  sidebarEyebrow: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
    marginBottom: "10px",
  },
  sidebarTitle: {
    margin: "0 0 10px 0",
    fontSize: "28px",
    color: "#1f3d2b",
  },
  sidebarText: {
    margin: "0 0 18px 0",
    fontSize: "15px",
    lineHeight: 1.5,
    color: "#486452",
  },
  sidebarButton: {
    width: "100%",
    display: "block",
    marginBottom: "10px",
    padding: "12px 14px",
    background: "#ffffff",
    color: "#1f3d2b",
    border: "1px solid #cfe0d2",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
    fontWeight: 600,
  },
  activeToolbox: {
    marginTop: "18px",
    padding: "14px",
    background: "#ffffff",
    border: "1px solid #d6e4d9",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#1f3d2b",
  },
  headerBlock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  topControls: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfe0d2",
    background: "#ffffff",
    fontSize: "15px",
    color: "#1f3d2b",
  },
  primaryButton: {
    padding: "12px 18px",
    background: "#2f6b3c",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
  },
  backButton: {
    marginBottom: "14px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cfe0d2",
    background: "#ffffff",
    color: "#1f3d2b",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
  },
  pageTitle: {
    margin: 0,
    fontSize: "48px",
    color: "#1f3d2b",
    lineHeight: 1.1,
  },
  pageSubtitle: {
    margin: "8px 0 0 0",
    fontSize: "20px",
    color: "#486452",
    lineHeight: 1.4,
  },
  status: {
    margin: "18px 0 24px 0",
    padding: "14px 16px",
    background: "#f8fcf9",
    color: "#2f6b3c",
    border: "1px solid #dbe8dd",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "15px",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  sectionCard: {
    background: "#ffffff",
    border: "1px solid #d6e4d9",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(31,61,43,0.05)",
  },
  sectionCardAccent: {
    height: "10px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "16px",
  },
  sectionIcon: {
    fontSize: "30px",
    marginBottom: "10px",
  },
  sectionCardTitle: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    color: "#1f3d2b",
  },
  sectionCardText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#486452",
  },
  content: {
    marginTop: "12px",
    background: "#ffffff",
    padding: "28px",
    borderRadius: "18px",
    border: "1px solid #d6e4d9",
    boxShadow: "0 6px 18px rgba(31,61,43,0.06)",
  },
  sectionImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderRadius: "16px",
    display: "block",
    marginBottom: "22px",
    border: "1px solid #d6e4d9",
  },
  sectionImageFallback: {
    width: "100%",
    height: "280px",
    borderRadius: "16px",
    display: "block",
    marginBottom: "22px",
    border: "1px solid #d6e4d9",
    background: "linear-gradient(135deg, #e8f1ea 0%, #dfeae2 100%)",
  },
  contentAccent: {
    height: "12px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "18px",
  },
  contentTitle: {
    margin: "0 0 14px 0",
    color: "#1f3d2b",
    fontSize: "34px",
  },
  contentText: {
    margin: "0 0 16px 0",
    color: "#486452",
    lineHeight: 1.7,
    fontSize: "17px",
  },
  innerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  innerCard: {
    background: "#ffffff",
    border: "1px solid #d6e4d9",
    borderRadius: "14px",
    padding: "18px",
    cursor: "pointer",
    textAlign: "left",
    boxShadow: "0 4px 10px rgba(31,61,43,0.04)",
  },
  innerCardStatic: {
    background: "#ffffff",
    border: "1px solid #d6e4d9",
    borderRadius: "14px",
    padding: "18px",
    textAlign: "left",
    boxShadow: "0 4px 10px rgba(31,61,43,0.04)",
  },
  innerCardTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
    fontSize: "20px",
  },
  innerCardText: {
    margin: "0 0 12px 0",
    color: "#486452",
    lineHeight: 1.5,
    fontSize: "15px",
  },
  focusBox: {
    marginTop: "22px",
    padding: "18px",
    background: "#f8fcf9",
    border: "1px solid #dbe8dd",
    borderRadius: "14px",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
  },
  smallButton: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1px solid #cfe0d2",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
    color: "#1f3d2b",
  },
  qtyValue: {
    minWidth: "24px",
    textAlign: "center",
    fontWeight: 700,
    color: "#1f3d2b",
  },
};
