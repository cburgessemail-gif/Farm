function HomeScreen() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          minHeight: 420,
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 24,
          backgroundImage:
            "linear-gradient(rgba(20,40,20,0.45), rgba(20,40,20,0.35)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            padding: 32,
            color: "white",
            maxWidth: 760,
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 10,
              opacity: 0.95,
            }}
          >
            Bronson Family Farm • Live Ecosystem Demo
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              lineHeight: 1.05,
            }}
          >
            Growing food, workforce pathways, and community wealth.
          </h1>

          <p
            style={{
              marginTop: 16,
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 680,
            }}
          >
            Explore a live prototype connecting growers, customers, youth,
            supervisors, volunteers, and administrators through one shared farm
            ecosystem.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setScreen(role)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.45)",
                  background: "rgba(255,255,255,0.14)",
                  color: "white",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  backdropFilter: "blur(4px)",
                }}
              >
                Open {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            ...cardStyle,
            minHeight: 220,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.78), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3>Grower Ecosystem</h3>
          <p>
            Inventory, crop planning, pricing, and shared marketplace flow.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            minHeight: 220,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3>Workforce Pathways</h3>
          <p>
            Youth learning, supervision, attendance, and development tracking.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            minHeight: 220,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.9)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3>Customer Access</h3>
          <p>
            Shopping, pickup, SNAP-ready expansion, and community engagement.
          </p>
        </div>
      </div>

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Enter the Ecosystem</h2>
        <p>
          This live demo now combines visual storytelling with connected system
          logic across farm operations, customer purchasing, workforce
          development, and administrative oversight.
          // force redeploy
        </p>
      </div>
    </div>
  );
}
