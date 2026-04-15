import React, { useState } from "react";

const sections = [
  {
    id: "grow",
    title: "🌱 Grow",
    desc: "Crop planning, planting, and production.",
    detail:
      "Explore crop planning, field readiness, growing cycles, irrigation thinking, and the systems needed to support farm production.",
    highlights: [
      "Seasonal crop planning",
      "Field readiness and infrastructure",
      "Production systems and workflow",
    ],
  },
  {
    id: "shop",
    title: "🛒 Shop",
    desc: "Buy fresh produce and farm goods.",
    detail:
      "See how customers will preorder, shop farm goods, access pickup pathways, and connect to a community-centered marketplace.",
    highlights: [
      "Marketplace and preorder flow",
      "Pickup and customer access",
      "Farm goods and produce pathways",
    ],
  },
  {
    id: "learn",
    title: "📚 Learn",
    desc: "Workshops, guides, and knowledge hub.",
    detail:
      "Discover education, wellness, food knowledge, practical growing guidance, and future learning tools for families and growers.",
    highlights: [
      "Workshops and guides",
      "Food knowledge and wellness",
      "Knowledge hub and practical learning",
    ],
  },
  {
    id: "workforce",
    title: "👩🏽‍🌾 Workforce",
    desc: "Youth training and job pathways.",
    detail:
      "Follow the youth workforce pathway from participation to training, responsibility, and future career readiness.",
    highlights: [
      "Youth training pathway",
      "Responsibility and growth",
      "Career readiness and transition",
    ],
  },
  {
    id: "community",
    title: "🤝 Community",
    desc: "Volunteers, families, and partnerships.",
    detail:
      "See how volunteers, families, supporters, and partners enter the ecosystem and strengthen the work together.",
    highlights: [
      "Volunteer and family participation",
      "Partnership and support pathways",
      "Community-centered engagement",
    ],
  },
  {
    id: "events",
    title: "📅 Events",
    desc: "Markets, tours, and community days.",
    detail:
      "Experience how markets, tours, workshops, and community gathering points activate the full farm ecosystem.",
    highlights: [
      "Markets and tours",
      "Community gathering points",
      "Program and event activation",
    ],
  },
];

const roles = [
  "Guest",
  "Customer",
  "Grower",
  "Volunteer",
  "Youth Worker",
  "Supervisor",
  "Admin",
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<null | (typeof sections)[0]>(null);

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h1 style={styles.title}>Bronson Family Farm</h1>
          <p style={styles.subtitle}>
            A Living Ecosystem for Growing, Learning, and Community
          </p>
          <button style={styles.button} onClick={() => setEntered(true)}>
            Enter the Farm
          </button>
        </div>
      </div>
    );
  }

  if (selectedSection) {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <button
              style={styles.backLink}
              onClick={() => setSelectedSection(null)}
            >
              ← Back to Ecosystem
            </button>
            <h2 style={styles.sectionTitle}>{selectedSection.title}</h2>
            <p style={styles.headerText}>{selectedSection.desc}</p>
          </div>

          <button style={styles.button} onClick={() => setShowRoles(true)}>
            {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
          </button>
        </div>

        <div style={styles.pageHero}>
          <div style={styles.pageHeroMain}>
            <h3 style={styles.pageHeading}>Section Overview</h3>
            <p style={styles.pageBody}>{selectedSection.detail}</p>
          </div>

          <div style={styles.pageHeroSide}>
            <strong>Current role context</strong>
            <p style={styles.infoText}>
              {activeRole
                ? `You are exploring as ${activeRole}. This section stays open while your role unlocks added actions.`
                : "You are exploring without an active role selected."}
            </p>
          </div>
        </div>

        <div style={styles.sectionGrid}>
          <div style={styles.sectionBox}>
            <strong>Highlights</strong>
            <ul style={styles.list}>
              {selectedSection.highlights.map((item) => (
                <li key={item} style={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.sectionBox}>
            <strong>What this becomes next</strong>
            <p style={styles.infoText}>
              This area can become a true destination with tools, workflows,
              dashboards, and role-based actions tailored to the visitor.
            </p>
          </div>

          <div style={styles.sectionBox}>
            <strong>Suggested next action</strong>
            <p style={styles.infoText}>
              Use this page to demonstrate how one part of the ecosystem can be
              explored deeply without leaving the larger system vision.
            </p>
          </div>
        </div>

        <div style={styles.sectionActions}>
          {!activeRole && (
            <button style={styles.button} onClick={() => setShowRoles(true)}>
              Activate Role
            </button>
          )}
          <button
            style={styles.secondaryButton}
            onClick={() => setSelectedSection(null)}
          >
            Return to Ecosystem
          </button>
        </div>

        {showRoles && (
          <div style={styles.overlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Select Your Role</h3>
              <p style={styles.modalText}>
                Choose a role without losing access to the full ecosystem.
              </p>

              <div style={styles.roleGrid}>
                {roles.map((role) => (
                  <button
                    key={role}
                    style={styles.roleButton}
                    onClick={() => {
                      setActiveRole(role);
                      setShowRoles(false);
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <button
                style={styles.cancelButton}
                onClick={() => setShowRoles(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {activeRole && (
          <div style={styles.sidePanel}>
            <h3 style={styles.sideTitle}>{activeRole}</h3>
            <p style={styles.sideText}>
              Role activated. You can still explore the full ecosystem.
            </p>

            <button style={styles.sidePrimary}>Open Role Actions</button>
            <button
              style={styles.sideSecondary}
              onClick={() => setActiveRole(null)}
            >
              Exit Role
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.sectionTitle}>Farm Ecosystem</h2>
          <p style={styles.headerText}>
            Explore first. Activate a role when ready.
          </p>
        </div>

        <button style={styles.button} onClick={() => setShowRoles(true)}>
          {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
        </button>
      </div>

      <div style={styles.infoBox}>
        <strong>Shared Exploration Layer</strong>
        <p style={styles.infoText}>
          Customers, volunteers, youth workers, growers, and partners can all
          explore the ecosystem. Roles unlock actions without blocking access.
        </p>
      </div>

      <div style={styles.grid}>
        {sections.map((section) => (
          <button
            key={section.id}
            style={styles.tileButton}
            onClick={() => setSelectedSection(section)}
          >
            <div style={styles.tile}>
              <h3 style={styles.tileTitle}>{section.title}</h3>
              <p style={styles.tileText}>{section.desc}</p>
              <div style={styles.openText}>Open section →</div>
            </div>
          </button>
        ))}
      </div>

      {showRoles && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Select Your Role</h3>
            <p style={styles.modalText}>
              Choose a role without losing access to the full ecosystem.
            </p>

            <div style={styles.roleGrid}>
              {roles.map((role) => (
                <button
                  key={role}
                  style={styles.roleButton}
                  onClick={() => {
                    setActiveRole(role);
                    setShowRoles(false);
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            <button
              style={styles.cancelButton}
              onClick={() => setShowRoles(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {activeRole && (
        <div style={styles.sidePanel}>
          <h3 style={styles.sideTitle}>{activeRole}</h3>
          <p style={styles.sideText}>
            Role activated. You can still explore the full ecosystem.
          </p>

          <button style={styles.sidePrimary}>Open Role Actions</button>
          <button
            style={styles.sideSecondary}
            onClick={() => setActiveRole(null)}
          >
            Exit Role
          </button>
        </div>
      )}
    </div>
  );
}

const styles: any = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eaf5ee",
    fontFamily: "Arial, sans-serif",
    padding: "24px",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    border: "2px solid #2f6b3c",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    maxWidth: "720px",
    width: "100%",
  },
  title: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "40px",
  },
  subtitle: {
    margin: "16px 0 24px 0",
    fontSize: "18px",
    color: "#3f5f4a",
  },
  button: {
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
  backLink: {
    background: "transparent",
    border: "none",
    color: "#2f6b3c",
    cursor: "pointer",
    padding: 0,
    marginBottom: "12px",
    fontSize: "15px",
    fontWeight: 700,
  },
  page: {
    padding: "40px",
    background: "#eaf5ee",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "32px",
    margin: 0,
    color: "#1f3d2b",
  },
  headerText: {
    margin: "8px 0 0 0",
    color: "#486452",
  },
  infoBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    marginBottom: "24px",
  },
  infoText: {
    margin: "10px 0 0 0",
    color: "#486452",
    lineHeight: 1.5,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
  },
  tileButton: {
    background: "transparent",
    border: "none",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
  },
  tile: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "150px",
  },
  tileTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
  },
  tileText: {
    margin: 0,
    color: "#4e6657",
    lineHeight: 1.5,
  },
  openText: {
    marginTop: "16px",
    color: "#2f6b3c",
    fontWeight: 700,
    fontSize: "14px",
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
    maxWidth: "700px",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  roleButton: {
    background: "#eef8f0",
    border: "1px solid #cfe0d2",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
    color: "#1f3d2b",
    fontSize: "15px",
  },
  cancelButton: {
    marginTop: "18px",
    background: "transparent",
    border: "none",
    color: "#666",
    cursor: "pointer",
    fontSize: "15px",
  },
  pageHero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  pageHeroMain: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
  },
  pageHeroSide: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
  },
  pageHeading: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#1f3d2b",
  },
  pageBody: {
    margin: 0,
    color: "#486452",
    lineHeight: 1.6,
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
  sidePanel: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "320px",
    maxWidth: "90vw",
    height: "100vh",
    background: "#fff",
    boxShadow: "-8px 0 24px rgba(0,0,0,0.12)",
    padding: "24px",
    boxSizing: "border-box",
    zIndex: 10,
  },
  sideTitle: {
    marginTop: 0,
    color: "#1f3d2b",
  },
  sideText: {
    color: "#4e6657",
    lineHeight: 1.5,
    marginBottom: "20px",
  },
  sidePrimary: {
    width: "100%",
    padding: "12px",
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  sideSecondary: {
    width: "100%",
    padding: "12px",
    background: "#fff",
    color: "#1f3d2b",
    border: "1px solid #cfe0d2",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
