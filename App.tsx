function HomeScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3eee3",
        padding: 32,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          minHeight: 420,
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 24,
          backgroundImage:
            "linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.35)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ padding: 32, color: "white", maxWidth: 700 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              opacity: 0.85,
              marginBottom: 10,
            }}
          >
            Youngstown, Ohio • Appalachian Region
          </div>

          <h1 style={{ fontSize: 42, margin: 0 }}>
            Bronson Family Farm Ecosystem
          </h1>

          <p style={{ opacity: 0.9, marginTop: 12, marginBottom: 16 }}>
            A living model for food, workforce, and community-powered growth.
          </p>

          <button
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "#2e7d32",
              color: "white",
              fontWeight: 700,
            }}
          >
            Enter the Ecosystem
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#eef3ec",
          padding: 20,
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        <h2>Enter the Ecosystem</h2>
        <p>Choose a role to explore the platform:</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button>Guest</button>
          <button>Customer</button>
          <button>Grower</button>
          <button>Volunteer</button>
          <button>Youth</button>
          <button>Supervisor</button>
          <button>Admin</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div
          style={{
            flex: 1,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <h3>Grower Ecosystem</h3>
          <p>Inventory, crop planning, pricing, and marketplace.</p>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <h3>Workforce Pathways</h3>
          <p>Youth development, supervision, and tracking.</p>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <h3>Customer Access</h3>
          <p>Shopping, SNAP expansion, and engagement.</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <HomeScreen />;
}
