if (screen === "grower") {
  return (
    <div style={{ padding: 32, fontFamily: "Arial" }}>
      <button onClick={() => setScreen("home")}>
        ← Back
      </button>

      <h1>Grower Dashboard</h1>
      <p>Inventory, production readiness, and market preparation</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 20,
        }}
      >
        {[
          { name: "Collard Greens", status: "Ready", qty: "40 rolls" },
          { name: "Broccoli", status: "Ready", qty: "18 rolls" },
          { name: "Cilantro", status: "Ready", qty: "24 rolls" },
          { name: "Tomatoes", status: "Growing", qty: "60 rolls" },
          { name: "Spinach", status: "Ready", qty: "22 bundles" },
          { name: "Mustards", status: "Growing", qty: "20 bundles" },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 16,
              background: "white",
            }}
          >
            <h3 style={{ marginTop: 0 }}>{item.name}</h3>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Quantity:</strong> {item.qty}</p>
            <button>View Crop</button>
          </div>
        ))}
      </div>
    </div>
  );
}
