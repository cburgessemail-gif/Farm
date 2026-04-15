import React, { useState } from "react";

type Lang = "en" | "es" | "tl";
type SectionId = "grow" | "shop" | "story" | "workforce" | "community" | "events";

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle: "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    intro:
      "Bronson Family Farm is more than a farm. It is a community-centered ecosystem connecting fresh food, workforce development, health, education, and long-term renewal.",
    enter: "Enter the Ecosystem",
    ecosystem: "Farm Ecosystem",
    explore: "Explore first. Activate a role when ready.",
    activateRole: "Activate My Role",
    roleActions: "Role Actions",
    back: "← Back to Ecosystem",
    open: "Open",
    enterSection: "Enter section",
    communityTitle: "Join the Ecosystem",
  },
  es: {
    title: "Bronson Family Farm",
    subtitle: "Un ecosistema vivo con raíces en la comida, la familia, la tierra, el aprendizaje y la oportunidad.",
    intro:
      "Bronson Family Farm es más que una granja. Es un ecosistema centrado en la comunidad que conecta alimentos frescos, desarrollo laboral, salud y educación.",
    enter: "Entrar al Ecosistema",
    ecosystem: "Ecosistema de la Granja",
    explore: "Explore primero. Active un rol cuando esté listo.",
    activateRole: "Activar mi rol",
    roleActions: "Acciones del rol",
    back: "← Volver al Ecosistema",
    open: "Abrir",
    enterSection: "Entrar a la sección",
    communityTitle: "Únase al Ecosistema",
  },
  tl: {
    title: "Bronson Family Farm",
    subtitle: "Isang buhay na ecosystem na nakaugat sa pagkain, pamilya, lupa, pagkatuto, at oportunidad.",
    intro:
      "Ang Bronson Family Farm ay higit pa sa isang bukid. Isa itong ecosystem na nag-uugnay sa pagkain, trabaho, kalusugan, at pagkatuto.",
    enter: "Pumasok sa Ecosystem",
    ecosystem: "Farm Ecosystem",
    explore: "Mag-explore muna. Pumili ng role kapag handa na.",
    activateRole: "Piliin ang Aking Role",
    roleActions: "Mga Aksiyon ng Role",
    back: "← Bumalik sa Ecosystem",
    open: "Buksan",
    enterSection: "Buksan ang seksyon",
    communityTitle: "Sumali sa Ecosystem",
  },
};

const sectionData = {
  grow: {
    icon: "🌱",
    title: "Grow",
    desc: "Crop planning, planting, production, and farm systems.",
    detail:
      "Explore crop planning, field readiness, seasonal growing, irrigation thinking, infrastructure, and the systems that support Bronson Family Farm’s production capacity.",
  },
  shop: {
    icon: "🛒",
    title: "Shop",
    desc: "Buy fresh produce and farm goods.",
    detail:
      "Browse products, build a sample cart, and connect to the live GrownBy store in a new tab.",
  },
  story: {
    icon: "📖",
    title: "Story & Ecosystem",
    desc: "History, place, purpose, and how the ecosystem works.",
    detail:
      "Learn the history of Bronson Family Farm, the family legacy behind it, the Lansdowne airport context, and how food, health, learning, workforce, and commerce connect.",
  },
  workforce: {
    icon: "👩🏽‍🌾",
    title: "Workforce",
    desc: "Youth training and job pathways.",
    detail:
      "Follow the youth workforce pathway from participation to training, responsibility, skill-building, and future opportunity.",
  },
  community: {
    icon: "🤝",
    title: "Community",
    desc: "Volunteers, families, and partnerships.",
    detail:
      "See how volunteers, supporters, families, and partners enter the ecosystem and strengthen the work together.",
  },
  events: {
    icon: "📅",
    title: "Events",
    desc: "Markets, tours, demonstrations, and community days.",
    detail:
      "Experience how markets, tours, and seasonal gatherings activate the full farm ecosystem.",
  },
};

const roles = ["Guest", "Customer", "Grower", "Volunteer", "Youth Worker", "Supervisor", "Admin"];

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
  const [showRoles, setShowRoles] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState("Welcome to the Bronson Family Farm ecosystem.");
  const [cart, setCart] = useState<Record<string, number>>({});

  const ui = labels[lang];

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = shopItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

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

  const openGrownBy = () => {
    window.open(
      "https://grownby.com/farms/bronson-family-farm/shop",
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("Opened GrownBy in a new tab.");
  };

  const roleActionLabel = (selectedRole: string | null) => {
    if (!selectedRole) return ui.roleActions;
    return `${ui.roleActions}: ${selectedRole}`;
  };

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
      <button style={styles.primaryButton} onClick={() => setShowRoles(true)}>
        {role ? `Role: ${role}` : ui.activateRole}
      </button>
    </div>
  );

  const renderRolePanel = () =>
    role ? (
      <div style={styles.rolePanel}>
        <div style={styles.roleEyebrow}>{roleActionLabel(role)}</div>
        <h3 style={styles.roleTitle}>{role}</h3>
        <p style={styles.roleText}>The main screen is where you go. This side panel is what you can do as this role.</p>
        <button style={styles.primaryButton} onClick={() => setStatus(`${role} action opened.`)}>
          Open Main Action
        </button>
        <button style={styles.secondaryButton} onClick={() => setShowRoles(true)}>
          Switch Role
        </button>
        <button
          style={styles.secondaryButton}
          onClick={() => {
            setRole(null);
            setStatus("Role exited.");
          }}
        >
          Exit Role
        </button>
      </div>
    ) : null;

  const renderRoleModal = () =>
    showRoles ? (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h3 style={styles.modalTitle}>Select Your Role</h3>
          <p style={styles.modalText}>Choose a role without losing access to the full ecosystem.</p>
          <div style={styles.roleGrid}>
            {roles.map((r) => (
              <button
                key={r}
                style={styles.roleCard}
                onClick={() => {
                  setRole(r);
                  setShowRoles(false);
                  setStatus(`${r} role activated.`);
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <button style={styles.secondaryButton} onClick={() => setShowRoles(false)}>
            Cancel
          </button>
        </div>
      </div>
    ) : null;

  if (!entered) {
    return (
      <div style={styles.pageCenter}>
        <div style={styles.entryCard}>
          <div style={styles.eyebrow}>Bronson Family Farm Ecosystem Demo</div>
          <div style={styles.topControlsEntry}>
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
          <h1 style={styles.entryTitle}>{ui.title}</h1>
          <p style={styles.entrySubtitle}>{ui.subtitle}</p>
          <p style={styles.entryText}>{ui.intro}</p>
          <button
            style={styles.primaryButton}
            onClick={() => {
              setEntered(true);
              setStatus("Entered the farm ecosystem.");
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
      <div style={styles.page}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div>
              <h2 style={styles.pageTitle}>{ui.ecosystem}</h2>
              <p style={styles.pageSubtitle}>{ui.explore}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.statusBar}>{status}</div>

          <div style={styles.infoBox}>
            <div style={styles.infoEyebrow}>{ui.infoEyebrow}</div>
            <h3 style={styles.infoTitle}>{ui.infoTitle}</h3>
            <p style={styles.infoBody}>{ui.infoBody}</p>
          </div>

          <div style={styles.cardGrid}>
            {(Object.keys(sectionData) as SectionId[]).map((id) => {
              const item = sectionData[id];
              return (
                <button
                  key={id}
                  style={styles.sectionCard}
                  onClick={() => {
                    setSection(id);
                    setStatus(`${item.title} opened.`);
                  }}
                >
                  <div style={styles.cardAccent} />
                  <div style={styles.cardHeader}>
                    <div style={styles.cardIconTitle}>
                      <span style={styles.cardIcon}>{item.icon}</span>
                      <span style={styles.cardTitle}>{item.title}</span>
                    </div>
                    <span style={styles.openBadge}>{ui.open}</span>
                  </div>
                  <div style={styles.cardDesc}>{item.desc}</div>
                  <div style={styles.cardFooter}>
                    <span style={styles.enterLink}>{ui.enterSection}</span>
                    <span style={styles.arrow}>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {renderRolePanel()}
        {renderRoleModal()}
      </div>
    );
  }

  if (section === "shop") {
    return (
      <div style={styles.page}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div>
              <button style={styles.backButton} onClick={() => setSection(null)}>
                {ui.back}
              </button>
              <h2 style={styles.pageTitle}>🛒 Shop</h2>
              <p style={styles.pageSubtitle}>{sectionData.shop.desc}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.statusBar}>{status}</div>

          <div style={styles.twoCol}>
            <div style={styles.panel}>
              <div style={styles.cardAccentLarge} />
              <h3 style={styles.panelTitle}>Marketplace Overview</h3>
              <p style={styles.panelText}>{sectionData.shop.detail}</p>

              <div style={styles.shopGrid}>
                {shopItems.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div key={item.id} style={styles.productCard}>
                      <div style={styles.productCategory}>Product</div>
                      <h4 style={styles.productTitle}>{item.name}</h4>
                      <div style={styles.productPriceRow}>
                        <strong>${item.price.toFixed(2)}</strong>
                        <div style={styles.qtyControls}>
                          <button style={styles.smallButton} onClick={() => removeFromCart(item.id)}>
                            −
                          </button>
                          <span>{qty}</span>
                          <button style={styles.smallButton} onClick={() => addToCart(item.id)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.sideColumnPanel}>
              <h3 style={styles.panelTitle}>Current Cart</h3>
              <p style={styles.panelText}>Items: {cartCount}</p>
              <p style={styles.panelText}>Total: ${cartTotal.toFixed(2)}</p>
              <button style={styles.primaryButton} onClick={openGrownBy}>
                Shop Live on GrownBy →
              </button>
              <button style={styles.secondaryButton} onClick={() => setSection(null)}>
                Return to Farm Experience
              </button>
              <button
                style={styles.secondaryButton}
                onClick={() => setStatus("Pickup Information opened.")}
              >
                Pickup Information
              </button>
            </div>
          </div>
        </div>

        {renderRolePanel()}
        {renderRoleModal()}
      </div>
    );
  }

  if (section === "story") {
    return (
      <div style={styles.page}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div>
              <button style={styles.backButton} onClick={() => setSection(null)}>
                {ui.back}
              </button>
              <h2 style={styles.pageTitle}>📖 Story & Ecosystem</h2>
              <p style={styles.pageSubtitle}>{sectionData.story.desc}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.statusBar}>{status}</div>

          <div style={styles.twoCol}>
            <div style={styles.panel}>
              <div style={styles.cardAccentLarge} />
              <h3 style={styles.panelTitle}>Story Overview</h3>
              <p style={styles.panelText}>
                Bronson Family Farm is rooted in family legacy, community restoration,
                and the belief that land can do more than produce crops. Here, food,
                health, learning, workforce development, and community participation
                come together in one living ecosystem—shaped by the unique Lansdowne
                airport setting and built for future generations.
              </p>

              <div style={styles.storyGrid}>
                {storyModules.map((module) => (
                  <button
                    key={module.id}
                    style={styles.storyCard}
                    onClick={() => {
                      setSelectedStoryModule(module.id);
                      setStatus(`${module.title} opened.`);
                    }}
                  >
                    <div style={styles.productCategory}>{module.audience}</div>
                    <h4 style={styles.storyCardTitle}>{module.title}</h4>
                    <p style={styles.storyCardText}>{module.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.sideColumnPanel}>
              <h3 style={styles.panelTitle}>Story Focus</h3>
              {selectedStoryModule ? (
                <>
                  <p style={styles.panelText}>
                    {
                      storyModules.find((m) => m.id === selectedStoryModule)
                        ?.description
                    }
                  </p>
                  <button
                    style={styles.primaryButton}
                    onClick={() => setStatus("Story pathway opened.")}
                  >
                    View Story Pathway
                  </button>
                </>
              ) : (
                <p style={styles.panelText}>
                  Select a story module to preview the history and ecosystem narrative.
                </p>
              )}
            </div>
          </div>
        </div>

        {renderRolePanel()}
        {renderRoleModal()}
      </div>
    );
  }

  if (section === "workforce") {
    return (
      <div style={styles.page}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div>
              <button style={styles.backButton} onClick={() => setSection(null)}>
                {ui.back}
              </button>
              <h2 style={styles.pageTitle}>👩🏽‍🌾 Workforce</h2>
              <p style={styles.pageSubtitle}>{sectionData.workforce.desc}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.statusBar}>{status}</div>

          <div style={styles.twoCol}>
            <div style={styles.panel}>
              <div style={styles.cardAccentLarge} />
              <h3 style={styles.panelTitle}>Workforce Overview</h3>
              <p style={styles.panelText}>{sectionData.workforce.detail}</p>

              <div style={styles.storyGrid}>
                {workforceTracks.map((track) => (
                  <button
                    key={track.id}
                    style={styles.storyCard}
                    onClick={() => {
                      setSelectedWorkforceTrack(track.id);
                      setStatus(`${track.title} opened.`);
                    }}
                  >
                    <div style={styles.productCategory}>Workforce Track</div>
                    <h4 style={styles.storyCardTitle}>{track.title}</h4>
                    <p style={styles.storyCardText}>{track.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.sideColumnPanel}>
              <h3 style={styles.panelTitle}>Track Focus</h3>
              {selectedWorkforceTrack ? (
                <>
                  <p style={styles.panelText}>
                    {
                      workforceTracks.find((t) => t.id === selectedWorkforceTrack)
                        ?.description
                    }
                  </p>
                  <button
                    style={styles.primaryButton}
                    onClick={() => setStatus("Workforce pathway opened.")}
                  >
                    Open Workforce Pathway
                  </button>
                </>
              ) : (
                <p style={styles.panelText}>
                  Select a workforce track to preview the pathway.
                </p>
              )}
            </div>
          </div>
        </div>

        {renderRolePanel()}
        {renderRoleModal()}
      </div>
    );
  }

  if (section === "community") {
    return (
      <div style={styles.page}>
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <div>
              <button style={styles.backButton} onClick={() => setSection(null)}>
                {ui.back}
              </button>
              <h2 style={styles.pageTitle}>🤝 Community</h2>
              <p style={styles.pageSubtitle}>{sectionData.community.desc}</p>
            </div>
            {renderTopControls()}
          </div>

          <div style={styles.statusBar}>{status}</div>

          <div style={styles.panel}>
            <div style={styles.cardAccentLarge} />
            <h3 style={styles.panelTitle}>{ui.communityTitle}</h3>
            <p style={styles.panelText}>{ui.communityBody}</p>

            <div style={styles.storyGrid}>
              {communityPaths.map((path) => (
                <div key={path.id} style={styles.storyCardStatic}>
                  <div style={styles.productCategory}>Join</div>
                  <h4 style={styles.storyCardTitle}>{path.title}</h4>
                  <p style={styles.storyCardText}>{path.description}</p>
                  <button
                    style={{ ...styles.primaryButton, marginTop: 12 }}
                    onClick={() => setStatus(`${path.action} opened.`)}
                  >
                    {path.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {renderRolePanel()}
        {renderRoleModal()}
      </div>
    );
  }

  const active = sectionData[section];

  return (
    <div style={styles.page}>
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div>
            <button style={styles.backButton} onClick={() => setSection(null)}>
              {ui.back}
            </button>
            <h2 style={styles.pageTitle}>
              {active.icon} {active.title}
            </h2>
            <p style={styles.pageSubtitle}>{active.desc}</p>
          </div>
          {renderTopControls()}
        </div>

        <div style={styles.statusBar}>{status}</div>

        <div style={styles.panel}>
          <div style={styles.cardAccentLarge} />
          <h3 style={styles.panelTitle}>Section Overview</h3>
          <p style={styles.panelText}>{active.detail}</p>
        </div>

        <div style={styles.sectionGrid}>
          <div style={styles.sectionBox}>
            <strong>Highlights</strong>
            <ul style={styles.list}>
              {active.highlights.map((item) => (
                <li key={item} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.sectionBox}>
            <strong>What this becomes next</strong>
            <p style={styles.infoBody}>
              This area can become a true destination with tools, workflows,
              dashboards, and role-based actions tailored to the visitor.
            </p>
          </div>
        </div>

        <div style={styles.sectionActions}>
          <button
            style={styles.secondaryButton}
            onClick={() => {
              setSection(null);
              setStatus("Returned to ecosystem.");
            }}
          >
            {ui.returnToEcosystem}
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => setStatus(`${active.title} action opened.`)}
          >
            {ui.openSectionAction}
          </button>
        </div>
      </div>

      {renderRolePanel()}
      {renderRoleModal()}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#eaf5ee",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  pageCenter: {
    minHeight: "100vh",
    background: "#eaf5ee",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  entryCard: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    border: "2px solid #2f6b3c",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "760px",
    width: "100%",
    textAlign: "center",
  },
  eyebrow: {
    marginBottom: "12px",
    color: "#2f6b3c",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  topControlsEntry: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "18px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  topControls: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cfe0d2",
    background: "#fff",
    fontSize: "14px",
  },
  entryTitle: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "40px",
  },
  entrySubtitle: {
    margin: "16px 0 14px 0",
    fontSize: "18px",
    color: "#3f5f4a",
  },
  entryText: {
    margin: "0 0 24px 0",
    color: "#4e6657",
    lineHeight: 1.6,
  },
  pageTitle: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "32px",
  },
  pageSubtitle: {
    margin: "8px 0 0 0",
    color: "#486452",
  },
  primaryButton: {
    padding: "12px 20px",
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  secondaryButton: {
    padding: "12px 20px",
    background: "#fff",
    color: "#1f3d2b",
    border: "1px solid #cfe0d2",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  backButton: {
    background: "transparent",
    border: "none",
    color: "#2f6b3c",
    cursor: "pointer",
    padding: 0,
    marginBottom: "12px",
    fontSize: "15px",
    fontWeight: 700,
  },
  statusBar: {
    background: "#f8fcf9",
    border: "1px solid #dbe8dd",
    borderRadius: "12px",
    padding: "14px 16px",
    marginBottom: "20px",
    color: "#2f6b3c",
    fontWeight: 700,
  },
  infoBox: {
    background: "#fff",
    padding: "24px",
    borderRadius: "14px",
    border: "1px solid #cfe0d2",
    marginBottom: "24px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },
  infoEyebrow: {
    color: "#2f6b3c",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  infoTitle: {
    margin: "0 0 10px 0",
    color: "#1f3d2b",
    fontSize: "28px",
  },
  infoBody: {
    margin: 0,
    color: "#486452",
    lineHeight: 1.5,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  sectionCard: {
    background: "transparent",
    border: "none",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
  },
  cardAccent: {
    height: "10px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "14px",
  },
  cardAccentLarge: {
    height: "14px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "18px",
  },
  sectionCardInner: {},
  sectionCardContent: {},
  sectionCardWrap: {},
  sectionCardBox: {},
  tileIconWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },
  cardIconTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  cardIcon: {
    fontSize: "26px",
    lineHeight: 1,
  },
  cardTitle: {
    color: "#1f3d2b",
    fontSize: "22px",
    fontWeight: 700,
  },
  openBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#eef8f0",
    color: "#2f6b3c",
    fontSize: "12px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  cardDesc: {
    marginTop: "10px",
    color: "#4e6657",
    lineHeight: 1.5,
  },
  cardFooter: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  enterLink: {
    color: "#2f6b3c",
    fontWeight: 700,
    fontSize: "14px",
  },
  arrow: {
    color: "#2f6b3c",
    fontWeight: 700,
    fontSize: "18px",
  },
  tile: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "190px",
    display: "flex",
    flexDirection: "column",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
    gap: "20px",
    alignItems: "start",
  },
  panel: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
  },
  sideColumnPanel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    position: "sticky",
    top: "20px",
  },
  panelTitle: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "24px",
  },
  panelText: {
    color: "#486452",
    lineHeight: 1.6,
    marginTop: "12px",
  },
  shopGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "20px",
  },
  productCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },
  productCategory: {
    display: "inline-block",
    marginBottom: "10px",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#eef8f0",
    color: "#2f6b3c",
    fontSize: "12px",
    fontWeight: 700,
  },
  productTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
    fontSize: "20px",
  },
  productPriceRow: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  smallButton: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #cfe0d2",
    background: "#fff",
    color: "#1f3d2b",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
  },
  cartPanel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    position: "sticky",
    top: "20px",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "12px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    paddingBottom: "12px",
    borderBottom: "1px solid #e5efe7",
  },
  cartMeta: {
    margin: "6px 0 0 0",
    color: "#486452",
    fontSize: "14px",
  },
  cartFooter: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cartTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#1f3d2b",
    fontSize: "18px",
  },
  learnLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
    gap: "20px",
    alignItems: "start",
  },
  learnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  learnCardButton: {
    background: "transparent",
    border: "none",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
  },
  learnCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "190px",
  },
  storyCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "190px",
    cursor: "pointer",
    textAlign: "left",
  },
  storyCardStatic: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "190px",
    textAlign: "left",
  },
  storyCardTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
    fontSize: "20px",
  },
  storyCardText: {
    margin: 0,
    color: "#4e6657",
    lineHeight: 1.5,
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  sectionBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
  },
  list: {
    margin: "12px 0 0 18px",
    padding: 0,
    color: "#486452",
  },
  listItem: {
    marginBottom: "8px",
  },
  sectionActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  returnBanner: {
    background: "#fff7e6",
    border: "1px solid #f0d9a6",
    borderRadius: "12px",
    padding: "18px",
    marginBottom: "20px",
  },
  returnBannerText: {
    margin: "8px 0 0 0",
    color: "#6a5830",
    lineHeight: 1.5,
  },
  returnBannerActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "14px",
  },
  rolePanel: {
    width: "320px",
    maxWidth: "90vw",
    background: "#fff",
    boxShadow: "-8px 0 24px rgba(0,0,0,0.08)",
    padding: "24px",
    boxSizing: "border-box",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    position: "sticky",
    top: "24px",
  },
  sideEyebrow: {
    color: "#2f6b3c",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  roleTitle: {
    marginTop: "8px",
    color: "#1f3d2b",
  },
  roleText: {
    color: "#4e6657",
    lineHeight: 1.5,
    marginBottom: "12px",
  },
  sideActionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "12px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 20,
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "860px",
    width: "100%",
    boxShadow: "0 18px 40px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    marginTop: 0,
    color: "#1f3d2b",
  },
  modalText: {
    color: "#4e6657",
    marginBottom: "18px",
    lineHeight: 1.5,
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    marginBottom: "18px",
  },
  roleCard: {
    background: "#eef8f0",
    border: "1px solid #cfe0d2",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
    color: "#1f3d2b",
    fontSize: "15px",
    textAlign: "left",
  },
};
