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

type YouthTask = {
  id: number;
  youthName: string;
  task: string;
  area: string;
  status: "Assigned" | "In Progress" | "Complete";
  supervisorNote: string;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    { name: "Collards", category: "Seedling", quantity: 120, unit: "seedlings", status: "Ready", price: 10 },
    { name: "Broccoli", category: "Seedling", quantity: 45, unit: "seedlings", status: "Low Stock", price: 5 },
    { name: "Cilantro", category: "Herb", quantity: 80, unit: "seedlings", status: "Ready", price: 3 },
    { name: "Tomatoes", category: "Seedling", quantity: 150, unit: "seedlings", status: "Growing", price: 5 },
    { name: "Mustards", category: "Produce", quantity: 32, unit: "bundles", status: "Ready", price: 4 },
    { name: "Spinach", category: "Produce", quantity: 18, unit: "bags", status: "Low Stock", price: 4 },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "Seedling" as InventoryItem["category"],
    quantity: "",
    unit: "seedlings",
    status: "Growing" as InventoryItem["status"],
    price: "",
  });

  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerFilter, setCustomerFilter] = useState<"All" | InventoryItem["category"]>("All");

  const [youthTasks, setYouthTasks] = useState<YouthTask[]>([
    {
      id: 1,
      youthName: "Jordan",
      task: "Sort seedling trays",
      area: "Propagation",
      status: "Assigned",
      supervisorNote: "Start with collards and broccoli.",
    },
    {
      id: 2,
      youthName: "Avery",
      task: "Water herb section",
      area: "Herb Zone",
      status: "In Progress",
      supervisorNote: "Check cilantro first.",
    },
    {
      id: 3,
      youthName: "Micah",
      task: "Harvest mustards",
      area: "Field Row B",
      status: "Complete",
      supervisorNote: "Bundle for market display.",
    },
  ]);

  const [newTask, setNewTask] = useState({
    youthName: "",
    task: "",
    area: "",
    status: "Assigned" as YouthTask["status"],
    supervisorNote: "",
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

  const customerItems = useMemo(() => {
    return inventory.filter((item) => {
      if (item.status !== "Ready" && item.status !== "Low Stock") return false;
      if (customerFilter === "All") return true;
      return item.category === customerFilter;
    });
  }, [inventory, customerFilter]);

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [name, qty]) => {
      const item = inventory.find((entry) => entry.name === name);
      if (!item) return sum;
      return sum + item.price * qty;
    }, 0);
  }, [cart, inventory]);

  const taskSummary = useMemo(() => {
    return {
      assigned: youthTasks.filter((t) => t.status === "Assigned").length,
      inProgress: youthTasks.filter((t) => t.status === "In Progress").length,
      complete: youthTasks.filter((t) => t.status === "Complete").length,
    };
  }, [youthTasks]);

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

  function addToCart(item: InventoryItem) {
    if (item.quantity <= 0) return;
    setCart((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
  }

  function removeFromCart(itemName: string) {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[itemName]) return next;
      next[itemName] -= 1;
      if (next[itemName] <= 0) delete next[itemName];
      return next;
    });
  }

  function addYouthTask() {
    if (!newTask.youthName || !newTask.task || !newTask.area) return;

    setYouthTasks((prev) => [
      {
        id: Date.now(),
        youthName: newTask.youthName,
        task: newTask.task,
        area: newTask.area,
        status: newTask.status,
        supervisorNote: newTask.supervisorNote,
      },
      ...prev,
    ]);

    setNewTask({
      youthName: "",
      task: "",
      area: "",
      status: "Assigned",
      supervisorNote: "",
    });
  }

  function updateTaskStatus(id: number, status: YouthTask["status"]) {
    setYouthTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }

  function statusColor(status: InventoryItem["status"]) {
    if (status === "Ready") return "#dff0d8";
    if (status === "Low Stock") return "#f8d7da";
    return "#fff3cd";
  }

  function taskStatusColor(status: YouthTask["status"]) {
    if (status === "Complete") return "#dff0d8";
    if (status === "In Progress") return "#fff3cd";
    return "#e7f1ff";
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

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
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
                onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
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
                onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                placeholder="Quantity"
                type="number"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <input
                value={newItem.unit}
                onChange={(e) => setNewItem((prev) => ({ ...prev, unit: e.target.value }))}
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
                onChange={(e) => setNewItem((prev) => ({ ...prev, price: e.target.value }))}
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
      </div>
    );
  }

  function CustomerScreen() {
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
          Customer Marketplace
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: 0 }}>Available Items</h3>
              <select
                value={customerFilter}
                onChange={(e) =>
                  setCustomerFilter(e.target.value as "All" | InventoryItem["category"])
                }
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="All">All</option>
                <option value="Seedling">Seedling</option>
                <option value="Produce">Produce</option>
                <option value="Herb">Herb</option>
              </select>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {customerItems.map((item, index) => (
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

                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ color: "#2f6b3c", fontWeight: 700 }}>
                      ${item.price.toFixed(2)}
                    </div>
                    <button onClick={() => addToCart(item)} style={buttonStyle}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}

              {customerItems.length === 0 && (
                <div style={{ color: "#5d6b57" }}>
                  No items match this filter right now.
                </div>
              )}
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Cart</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {Object.keys(cart).length === 0 && (
                <div style={{ color: "#5d6b57" }}>Your cart is empty.</div>
              )}

              {Object.entries(cart).map(([name, qty]) => {
                const item = inventory.find((entry) => entry.name === name);
                if (!item) return null;

                return (
                  <div
                    key={name}
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>{name}</div>
                    <div style={{ color: "#5d6b57", marginBottom: 8 }}>
                      {qty} × ${item.price.toFixed(2)}
                    </div>
                    <button onClick={() => removeFromCart(name)} style={mutedButtonStyle}>
                      Remove One
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid #ddd",
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Total: ${cartTotal.toFixed(2)}
            </div>

            <button
              onClick={() => alert(`Checkout started. Total: $${cartTotal.toFixed(2)}`)}
              style={{ ...buttonStyle, marginTop: 16, width: "100%" }}
            >
              Begin Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  function YouthScreen() {
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
          Youth Workforce Program
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {youthTasks.map((task) => (
            <div key={task.id} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{task.youthName}</div>
                  <div style={{ color: "#5d6b57" }}>
                    {task.task} • {task.area}
                  </div>
                </div>
                <div
                  style={{
                    background: taskStatusColor(task.status),
                    borderRadius: 999,
                    padding: "6px 10px",
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {task.status}
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <strong>Supervisor Note:</strong> {task.supervisorNote || "None"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function SupervisorScreen() {
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
          Supervisor Console
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Assigned</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{taskSummary.assigned}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>In Progress</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{taskSummary.inProgress}</div>
          </div>
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Complete</h3>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{taskSummary.complete}</div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Assign Youth Task</h3>

            <div style={{ display: "grid", gap: 10 }}>
              <input
                value={newTask.youthName}
                onChange={(e) => setNewTask((prev) => ({ ...prev, youthName: e.target.value }))}
                placeholder="Youth name"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <input
                value={newTask.task}
                onChange={(e) => setNewTask((prev) => ({ ...prev, task: e.target.value }))}
                placeholder="Task"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <input
                value={newTask.area}
                onChange={(e) => setNewTask((prev) => ({ ...prev, area: e.target.value }))}
                placeholder="Area"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    status: e.target.value as YouthTask["status"],
                  }))
                }
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
              <textarea
                value={newTask.supervisorNote}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, supervisorNote: e.target.value }))
                }
                placeholder="Supervisor note"
                style={{ padding: 10, borderRadius: 8, border: "1px solid #ccc", minHeight: 90 }}
              />
              <button onClick={addYouthTask} style={buttonStyle}>
                Add Task
              </button>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Live Youth Task Board</h3>

            <div style={{ display: "grid", gap: 12 }}>
              {youthTasks.map((task) => (
                <div
                  key={task.id}
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
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{task.youthName}</div>
                      <div style={{ color: "#5d6b57" }}>
                        {task.task} • {task.area}
                      </div>
                    </div>
                    <div
                      style={{
                        background: taskStatusColor(task.status),
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontWeight: 700,
                        fontSize: 12,
                      }}
                    >
                      {task.status}
                    </div>
                  </div>

                  <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <strong>Supervisor Note:</strong> {task.supervisorNote || "None"}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      onClick={() => updateTaskStatus(task.id, "Assigned")}
                      style={mutedButtonStyle}
                    >
                      Mark Assigned
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, "In Progress")}
                      style={mutedButtonStyle}
                    >
                      Mark In Progress
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task.id, "Complete")}
                      style={mutedButtonStyle}
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function BasicRoleScreen({ role }: { role: Exclude<Role, "grower" | "customer" | "youth" | "supervisor"> }) {
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
        {screen === "customer" && <CustomerScreen />}
        {screen === "youth" && <YouthScreen />}
        {screen === "supervisor" && <SupervisorScreen />}
        {screen !== "home" &&
          screen !== "grower" &&
          screen !== "customer" &&
          screen !== "youth" &&
          screen !== "supervisor" && <BasicRoleScreen role={screen} />}
      </div>
    </div>
  );
}
