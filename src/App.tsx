import React, { useState } from "react";

const sections = [
  { title: "🌱 Grow", desc: "Crop planning, planting, and production." },
  { title: "🛒 Shop", desc: "Buy fresh produce and farm goods." },
  { title: "📚 Learn", desc: "Workshops, guides, and knowledge hub." },
  { title: "👩🏽‍🌾 Workforce", desc: "Youth training and job pathways." },
  { title: "🤝 Community", desc: "Volunteers, families, and partnerships." },
  { title: "📅 Events", desc: "Markets, tours, and community days." },
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
          <div key={section.title} style={styles.tile}>
            <h3 style={styles.tileTitle}>{section.title}</h3>
            <p style={styles.tileText}>{section.desc}</p>
          </div>
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
  tile: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
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
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
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
