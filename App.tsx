import { useMemo, useState } from "react";

type Role =
  | "guest"
  | "customer"
  | "grower"
  | "volunteer"
  | "youth"
  | "supervisor"
  | "admin";

type Screen = "home" | Role;

type InventoryItem = {
  name: string;
  category: "Seedling" | "Produce" | "Herb";
  quantity: number;
  unit: string;
  status: "Ready" | "Growing" | "Low Stock";
  price: number;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      name: "Collards",
      category: "Seedling",
      quantity: 120,
      unit: "seedlings",
      status: "Ready",
      price: 10,
    },
    {
      name: "Broccoli",
      category: "Seedling",
      quantity: 45,
      unit: "seedlings",
      status: "Low Stock",
      price: 5,
    },
    {
      name: "Cilantro",
      category: "Herb",
      quantity: 80,
      unit: "seedlings",
      status: "Ready",
      price: 3,
    },
    {
      name: "Tomatoes",
      category: "Seedling",
      quantity: 150,
      unit: "seedlings",
      status: "Growing",
      price: 5,
    },
    {
      name: "Mustards",
      category: "Produce",
      quantity: 32,
      unit: "bundles",
      status: "Ready",
      price: 4,
    },
    {
      name: "Spinach",
      category: "Produce",
      quantity: 18,
      unit: "bags",
      status: "Low Stock",
      price: 4,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "Seedling" as InventoryItem["category"],
    quantity: "",
    unit: "seedlings",
    status: "Growing" as InventoryItem["status"],
    price: "",
  });

  const roles: Role[] = [
    "guest",
    "customer",
    "grower",
    "volunteer",
    "youth",
    "supervisor",
    "admin",
  ];

  const shellStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f6f1e8",
    fontFamily: "Arial, sans-serif",
    color: "#1f2a1f",
  };

  const wrapStyle: React.CSSProperties = {
    maxWidth: 1240,
    margin: "0 auto",
    padding: 32,
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid #d9d9d9",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 18px",
    background: "#2f6b3c",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  };

  const mutedButtonStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #b8b8b8",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  };

  const roleTitles: Record<Role, string> = {
    guest: "Welcome Center",
    customer: "Customer Marketplace",
    grower: "Grower Dashboard",
    volunteer: "Volunteer Hub",
    youth: "Youth Workforce Program",
    supervisor: "Supervisor Console",
    admin: "Admin Control Panel",
  };

  const readyCount = useMemo(
    () => inventory.filter((item) => item.status === "Ready").length,
    [inventory]
  );

  const lowStockCount = useMemo(
    () => inventory.filter((item) => item.status === "Low Stock").length,
    [inventory]
  );

  const totalUnits = useMemo(
    () => inventory.reduce((sum, item) => sum + item.quantity, 0),
    [inventory]
  );

  function addInventoryItem() {
    if (!newItem.name || !newItem.quantity || !newItem.price) return;

    setInventory((prev) => [
      {
        name: newItem.name,
        category: newItem.category,
        quantity: Number(newItem.quantity),
        unit: newItem.unit,
        status: newItem.status,
        price: Number(newItem.price),
      },
      ...prev,
    ]);

    setNewItem({
      name: "",
      category: "Seedling",
      quantity: "",
      unit: "seedlings",
      status: "Growing",
      price: "",
    });
  }

  function statusColor(status: InventoryItem["status"]) {
    if (status === "Ready") return "#dff0d8";
    if (status === "Low Stock") return "#f8d7da";
    return "#fff3cd";
  }

  function HomeScreen() {
    return (
      <div>
        <h1 style={{ marginBottom: 8 }}>Bronson Family Farm Demo</h1>
        <p style={{ marginTop: 0, color: "#4b5b4b", maxWidth: 760 }}>
          Live ecosystem prototype for farm operations, community access,
          workforce pathways, grower coordination, and community commerce.
        </p>

        <div
          style={{
            ...cardStyle,
            marginTop: 24,
            background: "linear-gradient(135deg, #fffdf8 0%, #eef6ea 100%)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Enter the Ecosystem</h2>
          <p>Choose a role to step into a dedicated experience for that user.</p>

          <div
            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}
          >
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setScreen(role)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #b8b8b8",
                  background: "#ffffff",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: 600,
                }}
              >
                Open {role}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 24,
          }}
        >
          <div style={cardStyle}>
            <h3>Grower Ecosystem</h3>
            <p>Inventory, crop planning, pricing, and shared marketplace flow.</p>
          </div>
          <div style={cardStyle}>
            <h3>Workforce Pathways</h3>
            <p>Youth learning, supervision, attendance, and development tracking.</p>
          </div>
          <div style={cardStyle}>
            <h3>Customer Access</h3>
            <p>Shopping, pickup, SNAP-ready expansion, and community engagement.</p>
          </div>
        </div>
      </div>
    );
  }

  function GrowerScreen() {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setScreen("home")} style={mutedButtonStyle}>
            ← Back to Home
          </button>
        </div>

        <div
          style={{
            background: "#2f6b3c",
            color: "white",
            padding: "14px 18px",
            borderRadius: 12,
            display: "inline-block",
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Grower Dashboard
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Inventory Lines</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{inventory.length}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Ready Items</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{readyCount}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Low Stock</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{lowStockCount}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Total Units</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{totalUnits}</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1.4fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Add Inventory Item</h3>

            <div style={{ display: "grid", gap: 10 }}>
              <input
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Item name"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />

              <select
                value={newItem.category}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    category: e.target.value as InventoryItem["category"],
                  }))
                }
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="Seedling">Seedling</option>
                <option value="Produce">Produce</option>
                <option value="Herb">Herb</option>
              </select>

              <input
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, quantity: e.target.value }))
                }
                placeholder="Quantity"
                type="number"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />

              <input
                value={newItem.unit}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, unit: e.target.value }))
                }
                placeholder="Unit"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />

              <select
                value={newItem.status}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    status: e.target.value as InventoryItem["status"],
                  }))
                }
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="Growing">Growing</option>
                <option value="Ready">Ready</option>
                <option value="Low Stock">Low Stock</option>
              </select>

              <input
                value={newItem.price}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="Price"
                type="number"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />

              <button onClick={addInventoryItem} style={buttonStyle}>
                Add Item
              </button>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Live Inventory</h3>

            <div style={{ display: "grid", gap: 12 }}>
              {inventory.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: 14,
                    background: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{item.name}</div>
                      <div style={{ color: "#5d6b57" }}>
                        {item.category} • {item.quantity} {item.unit}
                      </div>
                    </div>

                    <div
                      style={{
                        background: statusColor(item.status),
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div style={{ marginTop: 10, color: "#2f6b3c", fontWeight: 700 }}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 20,
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Crop Planning</h3>
            <p>Spring priorities: collards, tomatoes, broccoli, cilantro, spinach.</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Harvest Status</h3>
            <p>Ready this week: mustards, cilantro, select seedlings, spinach.</p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Pricing Logic</h3>
            <p>Seedlings and produce can now be displayed with live pricing cards.</p>
          </div>
        </div>
      </div>
    );
  }

  function BasicRoleScreen({ role }: { role: Exclude<Role, "grower"> }) {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setScreen("home")} style={mutedButtonStyle}>
            ← Back to Home
          </button>
        </div>

        <div
          style={{
            background: "#2f6b3c",
            color: "white",
            padding: "14px 18px",
            borderRadius: 12,
            display: "inline-block",
            fontWeight: 700,
            marginBottom: 20,
            textTransform: "capitalize",
          }}
        >
          {roleTitles[role]}
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>{roleTitles[role]}</h2>
          <p>This screen is ready for the next buildout.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={shellStyle}>
      <div style={wrapStyle}>
        {screen === "home" && <HomeScreen />}
        {screen === "grower" && <GrowerScreen />}
        {screen !== "home" && screen !== "grower" && (
          <BasicRoleScreen role={screen} />
        )}
      </div>
    </div>
  );
}
