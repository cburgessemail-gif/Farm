import { useMemo, useState } from "react";

type Role = "Admin" | "Supervisor" | "Youth" | "Parent" | "Grower" | "Vendor" | "Partner" | "Volunteer";
type SectionKey =
  | "command"
  | "supervisor"
  | "youth"
  | "grower"
  | "inventory"
  | "events"
  | "partners"
  | "reports"
  | "admin";

type AttendanceStatus = "Present" | "Late" | "Absent" | "Left Early";
type Destination = "Marketplace" | "Schools" | "Pantry" | "Donation" | "Value-Added" | "Partner Pickup";

type Youth = {
  id: string;
  name: string;
  age: number;
  team: string;
  supervisor: string;
  attendance: AttendanceStatus;
  badge: string;
  safety: number;
  teamwork: number;
  reliability: number;
  communication: number;
  skillGrowth: number;
  parent: string;
  notes: string;
};

type Task = {
  id: string;
  title: string;
  zone: string;
  type: string;
  assignedTeam: string;
  status: "Not Started" | "In Progress" | "Complete";
  ppe: boolean;
  weatherSensitive: boolean;
};

type InventoryItem = {
  id: string;
  product: string;
  category: string;
  quantity: number;
  unit: string;
  grower: string;
  sourceTeam: string;
  snap: boolean;
  qc: "A" | "B" | "C";
  destination: Destination;
};

type EventRecord = {
  id: string;
  name: string;
  date: string;
  guests: number;
  vendors: number;
  volunteers: number;
  status: "Planning" | "Active" | "Complete";
};

const roles: Role[] = ["Admin", "Supervisor", "Youth", "Parent", "Grower", "Vendor", "Partner", "Volunteer"];

const nav: { key: SectionKey; label: string; subtitle: string }[] = [
  { key: "command", label: "Command Center", subtitle: "Daily operations" },
  { key: "supervisor", label: "Supervisor Mobile", subtitle: "Phone-first workflow" },
  { key: "youth", label: "Youth Workforce", subtitle: "Profiles + progress" },
  { key: "grower", label: "Grower Operations", subtitle: "Tasks + production" },
  { key: "inventory", label: "Inventory & Market", subtitle: "Harvest to destination" },
  { key: "events", label: "Events & QR", subtitle: "Check-in + vendors" },
  { key: "partners", label: "Partners", subtitle: "Relationships" },
  { key: "reports", label: "Reports", subtitle: "Outcomes + exports" },
  { key: "admin", label: "Admin", subtitle: "Users + settings" },
];

const initialYouth: Youth[] = [
  {
    id: "Y-001",
    name: "Youth Team Member 1",
    age: 15,
    team: "Green Team",
    supervisor: "Supervisor A",
    attendance: "Present",
    badge: "Safety Ready",
    safety: 4,
    teamwork: 4,
    reliability: 3,
    communication: 4,
    skillGrowth: 3,
    parent: "Parent/Guardian Contact",
    notes: "Ready for planting and harvest rotation.",
  },
  {
    id: "Y-002",
    name: "Youth Team Member 2",
    age: 16,
    team: "Harvest Team",
    supervisor: "Supervisor A",
    attendance: "Late",
    badge: "Market Prep",
    safety: 3,
    teamwork: 5,
    reliability: 3,
    communication: 4,
    skillGrowth: 4,
    parent: "Parent/Guardian Contact",
    notes: "Strong teamwork; needs punctuality support.",
  },
  {
    id: "Y-003",
    name: "Youth Team Member 3",
    age: 14,
    team: "Compost Team",
    supervisor: "Supervisor B",
    attendance: "Present",
    badge: "Tool Care",
    safety: 4,
    teamwork: 3,
    reliability: 4,
    communication: 3,
    skillGrowth: 4,
    parent: "Parent/Guardian Contact",
    notes: "Learning tool safety and soil health basics.",
  },
];

const initialTasks: Task[] = [
  { id: "T-101", title: "Morning PPE + safety circle", zone: "Gathering Area", type: "Safety", assignedTeam: "All Teams", status: "Complete", ppe: true, weatherSensitive: false },
  { id: "T-102", title: "Irrigation check near growing rows", zone: "Grow Area", type: "Irrigation", assignedTeam: "Green Team", status: "In Progress", ppe: true, weatherSensitive: true },
  { id: "T-103", title: "Harvest greens for marketplace prep", zone: "Harvest Row", type: "Harvest", assignedTeam: "Harvest Team", status: "In Progress", ppe: true, weatherSensitive: true },
  { id: "T-104", title: "Motivational activity: future-builder reflection", zone: "Shade Station", type: "Youth Development", assignedTeam: "All Teams", status: "Not Started", ppe: false, weatherSensitive: false },
];

const initialInventory: InventoryItem[] = [
  { id: "INV-001", product: "Collard Greens", category: "Greens", quantity: 38, unit: "bundles", grower: "Bronson Family Farm", sourceTeam: "Harvest Team", snap: true, qc: "A", destination: "Marketplace" },
  { id: "INV-002", product: "Mustard Greens", category: "Greens", quantity: 24, unit: "bundles", grower: "Bronson Family Farm", sourceTeam: "Green Team", snap: true, qc: "A", destination: "Schools" },
  { id: "INV-003", product: "Bubble Babies™ Seedlings", category: "Seedlings", quantity: 75, unit: "units", grower: "Bronson Family Farm", sourceTeam: "Youth Workforce", snap: true, qc: "B", destination: "Marketplace" },
  { id: "INV-004", product: "Herbs", category: "Herbs", quantity: 42, unit: "bunches", grower: "Partner Grower", sourceTeam: "Grower Partner", snap: true, qc: "A", destination: "Value-Added" },
];

const events: EventRecord[] = [
  { id: "EV-001", name: "Growers Supply Market", date: "2026-05-16", guests: 115, vendors: 12, volunteers: 18, status: "Complete" },
  { id: "EV-002", name: "Youth Workforce Orientation", date: "2026-06-05", guests: 50, vendors: 0, volunteers: 8, status: "Planning" },
  { id: "EV-003", name: "Flash Seed Giveaway", date: "2026-06-06", guests: 100, vendors: 4, volunteers: 10, status: "Planning" },
];

const partners = [
  { name: "Farm & Family Alliance", type: "Nonprofit ecosystem partner", status: "Core" },
  { name: "Parker Farms", type: "Value-added education + marketplace partner", status: "Core" },
  { name: "Jubilee Gardens, Inc.", type: "Seed donation partner", status: "Active" },
  { name: "Central State University", type: "Training + agricultural representation", status: "Active" },
  { name: "Home Depot", type: "Fencing + tools + demonstrations", status: "Active" },
  { name: "City of Youngstown", type: "Community, forestry, parks, and economic development", status: "Active" },
];

function cn(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function scoreAverage(youth: Youth[]) {
  const total = youth.reduce((sum, y) => sum + y.safety + y.teamwork + y.reliability + y.communication + y.skillGrowth, 0);
  return Math.round((total / (youth.length * 5)) * 20);
}

function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "gold" | "red" | "blue" | "neutral" }) {
  return <span className={cn("pill", `pill-${tone}`)}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("card", className)}>{children}</section>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-title">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <Card className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </Card>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<SectionKey>("command");
  const [role, setRole] = useState<Role>("Admin");
  const [youth, setYouth] = useState(initialYouth);
  const [tasks, setTasks] = useState(initialTasks);
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedYouthId, setSelectedYouthId] = useState(initialYouth[0].id);
  const [dailyNote, setDailyNote] = useState("No PPE, no work. Keep youth hydrated, documented, and connected to the purpose of the farm.");

  const selectedYouth = youth.find((item) => item.id === selectedYouthId) || youth[0];

  const metrics = useMemo(() => {
    const present = youth.filter((y) => y.attendance === "Present" || y.attendance === "Late").length;
    const completedTasks = tasks.filter((t) => t.status === "Complete").length;
    const activeInventory = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const snapItems = inventory.filter((item) => item.snap).length;
    return {
      present,
      completedTasks,
      activeInventory,
      snapItems,
      readiness: Math.round(((present / youth.length) * 30 + (completedTasks / tasks.length) * 30 + scoreAverage(youth) * 0.4)),
    };
  }, [youth, tasks, inventory]);

  function updateAttendance(id: string, attendance: AttendanceStatus) {
    setYouth((current) => current.map((item) => (item.id === id ? { ...item, attendance } : item)));
  }

  function updateTask(id: string, status: Task["status"]) {
    setTasks((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function updateAssessment(field: keyof Pick<Youth, "safety" | "teamwork" | "reliability" | "communication" | "skillGrowth">, value: number) {
    setYouth((current) => current.map((item) => (item.id === selectedYouth.id ? { ...item, [field]: value } : item)));
  }

  function addHarvestMovement() {
    const newItem: InventoryItem = {
      id: `INV-${String(inventory.length + 1).padStart(3, "0")}`,
      product: "Youth Harvest Entry",
      category: "Fresh Produce",
      quantity: 12,
      unit: "units",
      grower: "Bronson Family Farm",
      sourceTeam: selectedYouth.team,
      snap: true,
      qc: "A",
      destination: "Marketplace",
    };
    setInventory((current) => [newItem, ...current]);
  }

  return (
    <div className="app-shell">
      <style>{css}</style>

      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">BFF</div>
          <div>
            <h1>Bronson Family Farm</h1>
            <p>Ecosystem Management System</p>
          </div>
        </div>

        <div className="role-block">
          <label>Current role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <nav>
          {nav.map((item) => (
            <button key={item.key} className={cn("nav-button", active === item.key && "active")} onClick={() => setActive(item.key)}>
              <span>{item.label}</span>
              <small>{item.subtitle}</small>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span>System principle</span>
          <strong>Youth → Task → Harvest → Inventory → Marketplace → Report</strong>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">One connected operating hub</div>
            <h2>Management Command Center</h2>
          </div>
          <div className="top-actions">
            <StatusPill tone="green">Live UI model</StatusPill>
            <StatusPill tone="gold">Role: {role}</StatusPill>
          </div>
        </header>

        {active === "command" && (
          <div className="page-grid">
            <section className="hero-card">
              <div className="hero-overlay" />
              <div className="hero-content">
                <div className="eyebrow">Today’s focus</div>
                <h2>Growers, families, youth, partners, inventory, and outcomes — all in one connected system.</h2>
                <p>{dailyNote}</p>
                <div className="hero-actions">
                  <button onClick={() => setActive("supervisor")}>Open Supervisor Flow</button>
                  <button onClick={() => setActive("inventory")}>Review Inventory</button>
                  <button onClick={() => setActive("reports")}>View Outcomes</button>
                </div>
              </div>
            </section>

            <div className="metric-grid">
              <Metric label="Youth present" value={`${metrics.present}/${youth.length}`} detail="Includes late arrivals" />
              <Metric label="Tasks completed" value={`${metrics.completedTasks}/${tasks.length}`} detail="Daily workflow" />
              <Metric label="Inventory units" value={metrics.activeInventory} detail="Available + routed" />
              <Metric label="SNAP eligible" value={metrics.snapItems} detail="Catalog items" />
            </div>

            <Card className="wide-card">
              <SectionTitle eyebrow="Operational readiness" title={`${metrics.readiness}% system readiness`} text="Readiness combines youth attendance, task completion, and current workforce assessment scores." />
              <ProgressBar value={metrics.readiness} />
              <div className="workflow-row">
                {[
                  "Check in youth",
                  "Confirm PPE",
                  "Assign task",
                  "Assess progress",
                  "Log harvest",
                  "Route inventory",
                  "Report outcome",
                ].map((step, index) => (
                  <div className="workflow-step" key={step}>
                    <span>{index + 1}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle eyebrow="Alerts" title="Needs attention" text="Items that keep the farm safe, documented, and ready." />
              <ul className="clean-list">
                <li><StatusPill tone="gold">Weather</StatusPill> Heat and water reminders should appear before field assignments.</li>
                <li><StatusPill tone="green">PPE</StatusPill> Supervisor confirmation required before task start.</li>
                <li><StatusPill tone="blue">Reports</StatusPill> Daily report should generate from attendance, task, assessment, and inventory records.</li>
              </ul>
            </Card>

            <Card>
              <SectionTitle eyebrow="Daily note" title="Supervisor communication" text="This note appears in the supervisor phone view." />
              <textarea value={dailyNote} onChange={(e) => setDailyNote(e.target.value)} />
            </Card>
          </div>
        )}

        {active === "supervisor" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Phone-first workflow" title="Supervisor Mobile Dashboard" text="The supervisor can run the daily program from a phone: attendance, PPE, tasks, assessment, harvest, and report." />

            <Card className="wide-card phone-frame">
              <div className="phone-header">
                <div>
                  <div className="eyebrow">Supervisor A</div>
                  <h3>Today’s roster</h3>
                </div>
                <StatusPill tone="green">Field mode</StatusPill>
              </div>

              <div className="roster-list">
                {youth.map((item) => (
                  <div className="roster-row" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.team} · Age {item.age} · {item.badge}</small>
                    </div>
                    <select value={item.attendance} onChange={(e) => updateAttendance(item.id, e.target.value as AttendanceStatus)}>
                      <option>Present</option>
                      <option>Late</option>
                      <option>Absent</option>
                      <option>Left Early</option>
                    </select>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle eyebrow="Safety" title="PPE confirmation" text="No PPE, no work." />
              <div className="check-grid">
                {['Gloves', 'Closed-toe shoes', 'Water bottle', 'Weather readiness', 'Tool safety reminder', 'Media/permission confirmation'].map((item) => (
                  <label key={item} className="check-card"><input type="checkbox" defaultChecked={item !== 'Media/permission confirmation'} /> {item}</label>
                ))}
              </div>
            </Card>

            <Card>
              <SectionTitle eyebrow="Assessment" title={selectedYouth.name} text="Supervisor rating creates workforce readiness records." />
              <div className="select-strip">
                {youth.map((item) => <button key={item.id} onClick={() => setSelectedYouthId(item.id)} className={selectedYouthId === item.id ? "selected" : ""}>{item.name}</button>)}
              </div>
              {([
                ["safety", "Safety"],
                ["teamwork", "Teamwork"],
                ["reliability", "Reliability"],
                ["communication", "Communication"],
                ["skillGrowth", "Skill growth"],
              ] as const).map(([field, label]) => (
                <label className="range-row" key={field}>{label}<input type="range" min="1" max="5" value={selectedYouth[field]} onChange={(e) => updateAssessment(field, Number(e.target.value))} /><strong>{selectedYouth[field]}</strong></label>
              ))}
            </Card>

            <Card className="wide-card">
              <SectionTitle eyebrow="Daily task board" title="Assign and complete work" text="Each task connects youth labor to production, learning, inventory, and reportable outcomes." />
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Task</th><th>Zone</th><th>Team</th><th>PPE</th><th>Status</th></tr></thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.zone}</td>
                        <td>{task.assignedTeam}</td>
                        <td>{task.ppe ? "Required" : "Not required"}</td>
                        <td>
                          <select value={task.status} onChange={(e) => updateTask(task.id, e.target.value as Task["status"])}>
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Complete</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <SectionTitle eyebrow="Harvest" title="Log harvest to inventory" text="This connects youth work to the marketplace and reports." />
              <button className="primary-wide" onClick={addHarvestMovement}>Add sample youth harvest entry</button>
            </Card>
          </div>
        )}

        {active === "youth" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Youth Workforce" title="Profiles, skills, badges, and progress" text="Each youth profile connects attendance, tasks, supervisor assessments, parent connection, and workforce outcomes." />
            {youth.map((item) => (
              <Card key={item.id}>
                <div className="profile-header">
                  <div className="avatar">{item.name.split(" ").slice(-1)[0]}</div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.team} · Supervisor: {item.supervisor}</p>
                  </div>
                </div>
                <div className="profile-meta">
                  <StatusPill tone={item.attendance === "Present" ? "green" : item.attendance === "Late" ? "gold" : "red"}>{item.attendance}</StatusPill>
                  <StatusPill tone="blue">{item.badge}</StatusPill>
                </div>
                <p className="muted">{item.notes}</p>
                <ProgressBar value={(item.safety + item.teamwork + item.reliability + item.communication + item.skillGrowth) * 4} />
              </Card>
            ))}
          </div>
        )}

        {active === "grower" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Grower Operations" title="Production, zones, tasks, and harvest planning" text="This area keeps crop work connected to workforce development and marketplace needs." />
            <Card className="wide-card">
              <div className="operations-grid">
                {[
                  ["Crop Planning", "Planting calendar, varieties, succession planning"],
                  ["Zones", "Airport grow areas, rows, irrigation points, access routes"],
                  ["Soil + Compost", "Soil tests, amendments, compost inputs, wood ash notes"],
                  ["Equipment", "Tools, tractor, wash station, storage, maintenance"],
                  ["Harvest Plan", "Expected quantity, youth teams, destination routing"],
                  ["Weather", "Heat, storm, wind, and irrigation-sensitive tasks"],
                ].map(([title, text]) => (
                  <div className="operation-tile" key={title}><strong>{title}</strong><p>{text}</p></div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === "inventory" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Inventory & Marketplace" title="Harvest to destination" text="Inventory records must show product, grower, youth team, QC grade, SNAP status, and destination." />
            <Card className="wide-card">
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Product</th><th>Qty</th><th>Grower</th><th>Youth/Source</th><th>SNAP</th><th>QC</th><th>Destination</th></tr></thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product}<small>{item.category}</small></td>
                        <td>{item.quantity} {item.unit}</td>
                        <td>{item.grower}</td>
                        <td>{item.sourceTeam}</td>
                        <td>{item.snap ? "Yes" : "No"}</td>
                        <td>{item.qc}</td>
                        <td><StatusPill tone="blue">{item.destination}</StatusPill></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <Card>
              <SectionTitle eyebrow="Marketplace routing" title="Destination options" text="Products can move to customers, schools, pantries, donations, value-added production, or partner pickup." />
              <div className="tag-cloud">{["Marketplace", "Schools", "Pantry", "Donation", "Value-Added", "Partner Pickup"].map((item) => <span key={item}>{item}</span>)}</div>
            </Card>
          </div>
        )}

        {active === "events" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Events & QR" title="Check-in, vendors, volunteers, and visitors" text="Event records connect registration, QR check-in, role categories, setup needs, and final reports." />
            {events.map((event) => (
              <Card key={event.id}>
                <div className="event-row">
                  <div>
                    <h3>{event.name}</h3>
                    <p>{event.date}</p>
                  </div>
                  <StatusPill tone={event.status === "Complete" ? "green" : "gold"}>{event.status}</StatusPill>
                </div>
                <div className="mini-metrics">
                  <span>{event.guests} guests</span><span>{event.vendors} vendors</span><span>{event.volunteers} volunteers</span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {active === "partners" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Partners" title="Relationship management" text="Partners are tied to donations, training, events, market operations, and reportable community outcomes." />
            {partners.map((partner) => (
              <Card key={partner.name}>
                <h3>{partner.name}</h3>
                <p>{partner.type}</p>
                <StatusPill tone={partner.status === "Core" ? "green" : "blue"}>{partner.status}</StatusPill>
              </Card>
            ))}
          </div>
        )}

        {active === "reports" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Reports & Outcomes" title="Grant, funder, and management reporting" text="Reports are generated from the same data used by supervisors, growers, inventory, marketplace, and events." />
            <Metric label="Attendance rate" value={`${Math.round((metrics.present / youth.length) * 100)}%`} detail="Youth present or late today" />
            <Metric label="Workforce score" value={`${scoreAverage(youth)}%`} detail="Average readiness across assessments" />
            <Metric label="Harvest units" value={metrics.activeInventory} detail="Current inventory quantity" />
            <Metric label="Events tracked" value={events.length} detail="QR/event records" />
            <Card className="wide-card">
              <SectionTitle eyebrow="Export center" title="Available report types" text="These are the reports the system should eventually export to PDF, CSV, Excel, or grant narrative summaries." />
              <div className="operations-grid">
                {[
                  "Daily Supervisor Report",
                  "Youth Progress Report",
                  "Attendance + Hours Report",
                  "Harvest + Inventory Report",
                  "Marketplace Sales Report",
                  "SNAP Eligible Product Report",
                  "Partner Participation Report",
                  "Grant/Funder Outcomes Report",
                ].map((item) => <div className="operation-tile" key={item}><strong>{item}</strong><p>Generated from connected ecosystem records.</p></div>)}
              </div>
            </Card>
          </div>
        )}

        {active === "admin" && (
          <div className="page-grid">
            <SectionTitle eyebrow="Admin" title="Users, roles, settings, and permissions" text="Admin controls protect the system and make sure each person sees the correct tools." />
            <Card className="wide-card">
              <div className="operations-grid">
                {roles.map((item) => (
                  <div className="operation-tile" key={item}>
                    <strong>{item}</strong>
                    <p>{item === "Supervisor" ? "Phone-first daily workflow, youth records, tasks, and assessments." : item === "Admin" ? "Full access to users, reports, inventory, events, and settings." : "Role-specific access to the ecosystem."}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <SectionTitle eyebrow="System settings" title="Next database connection" text="The UI is ready for Supabase tables: users, youth_profiles, attendance, tasks, assessments, inventory, orders, events, partners, and reports." />
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

const css = `
:root {
  --forest-950: #07120d;
  --forest-900: #0b1d13;
  --forest-800: #11331f;
  --forest-700: #1f4a2d;
  --sage: #a8c39a;
  --mint: #d8ead1;
  --cream: #f7f1df;
  --gold: #d8a847;
  --rust: #b8663b;
  --sky: #8cb3a7;
  --danger: #d86c5c;
  --line: rgba(255,255,255,0.14);
  --soft: rgba(255,255,255,0.08);
  --shadow: 0 24px 70px rgba(0,0,0,0.35);
}
* { box-sizing: border-box; }
body { margin: 0; background: radial-gradient(circle at top left, #244d2e 0, var(--forest-950) 42%, #020403 100%); color: var(--cream); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
button, select, textarea, input { font: inherit; }
.app-shell { min-height: 100vh; display: grid; grid-template-columns: 310px minmax(0, 1fr); }
.sidebar { position: sticky; top: 0; height: 100vh; padding: 22px; border-right: 1px solid var(--line); background: linear-gradient(180deg, rgba(8,20,13,0.98), rgba(9,26,16,0.94)); overflow-y: auto; }
.brand-block { display: flex; gap: 14px; align-items: center; padding-bottom: 22px; border-bottom: 1px solid var(--line); }
.brand-mark { width: 54px; height: 54px; border-radius: 18px; display: grid; place-items: center; background: linear-gradient(135deg, var(--gold), var(--rust)); color: #1c1309; font-weight: 900; box-shadow: var(--shadow); }
.brand-block h1 { margin: 0; font-size: 18px; line-height: 1.1; }
.brand-block p { margin: 5px 0 0; color: var(--sage); font-size: 12px; }
.role-block { margin: 18px 0; padding: 14px; border: 1px solid var(--line); border-radius: 20px; background: var(--soft); }
.role-block label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--sage); margin-bottom: 8px; }
select { width: 100%; border: 1px solid var(--line); border-radius: 14px; padding: 10px 12px; color: var(--cream); background: rgba(0,0,0,0.28); outline: none; }
nav { display: grid; gap: 8px; }
.nav-button { width: 100%; text-align: left; padding: 14px; border: 1px solid transparent; border-radius: 18px; background: transparent; color: var(--cream); cursor: pointer; transition: 160ms ease; }
.nav-button:hover, .nav-button.active { background: rgba(216,168,71,0.12); border-color: rgba(216,168,71,0.35); transform: translateX(2px); }
.nav-button span { display: block; font-weight: 800; font-size: 14px; }
.nav-button small { display: block; margin-top: 3px; color: var(--sage); }
.sidebar-footer { margin-top: 22px; padding: 16px; border-radius: 20px; background: rgba(168,195,154,0.10); border: 1px solid var(--line); }
.sidebar-footer span { display: block; color: var(--sage); font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 8px; }
.sidebar-footer strong { font-size: 13px; line-height: 1.45; }
.main-panel { padding: 26px; min-width: 0; }
.topbar { display: flex; justify-content: space-between; align-items: center; gap: 18px; margin-bottom: 22px; }
.topbar h2 { margin: 4px 0 0; font-size: clamp(24px, 4vw, 40px); letter-spacing: -0.04em; }
.top-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.eyebrow { color: var(--gold); font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.16em; }
.page-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 16px; align-items: start; }
.page-grid > .section-title { grid-column: 1 / -1; }
.section-title h2 { margin: 6px 0 6px; font-size: clamp(24px, 3vw, 34px); line-height: 1.05; letter-spacing: -0.035em; }
.section-title p { margin: 0; color: var(--mint); max-width: 880px; line-height: 1.6; }
.hero-card { grid-column: 1 / -1; min-height: 360px; position: relative; overflow: hidden; border-radius: 34px; border: 1px solid rgba(255,255,255,0.18); background: linear-gradient(135deg, rgba(9,34,20,0.96), rgba(75,67,33,0.66)), radial-gradient(circle at 80% 20%, rgba(216,168,71,0.35), transparent 35%), radial-gradient(circle at 18% 82%, rgba(140,179,167,0.24), transparent 30%); box-shadow: var(--shadow); }
.hero-overlay { position: absolute; inset: 0; background-image: linear-gradient(120deg, transparent 0 45%, rgba(255,255,255,0.06) 45% 46%, transparent 46%), radial-gradient(circle at center, transparent 0, rgba(0,0,0,0.25) 100%); }
.hero-content { position: relative; z-index: 1; max-width: 880px; padding: 42px; }
.hero-content h2 { font-size: clamp(34px, 5vw, 64px); line-height: 0.95; letter-spacing: -0.06em; margin: 12px 0 18px; }
.hero-content p { color: var(--mint); font-size: 18px; line-height: 1.55; max-width: 760px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
.hero-actions button, .primary-wide { border: 0; border-radius: 999px; padding: 12px 16px; color: #1c1309; background: linear-gradient(135deg, var(--gold), #f1cf78); font-weight: 900; cursor: pointer; box-shadow: 0 12px 32px rgba(0,0,0,0.22); }
.card { grid-column: span 6; border: 1px solid var(--line); border-radius: 28px; background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.055)); padding: 22px; box-shadow: 0 16px 45px rgba(0,0,0,0.22); backdrop-filter: blur(16px); }
.wide-card { grid-column: 1 / -1; }
.metric-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 16px; }
.metric-card { grid-column: span 1; }
.metric-card span { color: var(--sage); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 800; }
.metric-card strong { display: block; font-size: 38px; line-height: 1; margin: 12px 0 8px; }
.metric-card small { color: var(--mint); }
.pill { display: inline-flex; align-items: center; width: fit-content; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 900; border: 1px solid var(--line); }
.pill-green { background: rgba(168,195,154,0.18); color: #ddf1d4; }
.pill-gold { background: rgba(216,168,71,0.20); color: #ffe1a3; }
.pill-red { background: rgba(216,108,92,0.22); color: #ffd3cd; }
.pill-blue { background: rgba(140,179,167,0.20); color: #d7f4ec; }
.pill-neutral { background: rgba(255,255,255,0.10); color: var(--cream); }
.progress-track { width: 100%; height: 12px; border-radius: 999px; overflow: hidden; background: rgba(0,0,0,0.32); border: 1px solid var(--line); margin: 18px 0; }
.progress-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--rust), var(--gold), var(--sage)); }
.workflow-row { display: grid; grid-template-columns: repeat(7, minmax(0,1fr)); gap: 10px; margin-top: 18px; }
.workflow-step { min-height: 98px; border-radius: 20px; padding: 12px; background: rgba(0,0,0,0.22); border: 1px solid var(--line); }
.workflow-step span { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 999px; background: var(--gold); color: #211407; font-weight: 900; margin-bottom: 10px; }
.workflow-step strong { display: block; font-size: 13px; line-height: 1.25; }
.clean-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.clean-list li { display: flex; gap: 10px; align-items: flex-start; color: var(--mint); line-height: 1.5; }
textarea { width: 100%; min-height: 130px; resize: vertical; border: 1px solid var(--line); border-radius: 18px; padding: 14px; color: var(--cream); background: rgba(0,0,0,0.26); outline: none; line-height: 1.5; }
.phone-frame { max-width: 760px; justify-self: center; border-radius: 36px; border-width: 2px; }
.phone-header, .event-row, .profile-header { display: flex; justify-content: space-between; align-items: center; gap: 14px; }
.roster-list { display: grid; gap: 10px; margin-top: 18px; }
.roster-row { display: grid; grid-template-columns: minmax(0,1fr) 160px; gap: 12px; align-items: center; padding: 14px; border-radius: 20px; background: rgba(0,0,0,0.20); border: 1px solid var(--line); }
.roster-row strong, .profile-header strong { display: block; }
.roster-row small, td small { display: block; color: var(--sage); margin-top: 4px; }
.check-grid { display: grid; gap: 10px; }
.check-card { display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 16px; background: rgba(0,0,0,0.22); border: 1px solid var(--line); color: var(--mint); }
.select-strip { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0; }
.select-strip button { border: 1px solid var(--line); border-radius: 999px; padding: 9px 12px; background: rgba(0,0,0,0.18); color: var(--cream); cursor: pointer; }
.select-strip .selected { background: rgba(216,168,71,0.22); border-color: rgba(216,168,71,0.55); }
.range-row { display: grid; grid-template-columns: 120px 1fr 28px; gap: 12px; align-items: center; color: var(--mint); margin: 12px 0; }
.table-wrap { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 760px; }
th { color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; text-align: left; padding: 12px; border-bottom: 1px solid var(--line); }
td { padding: 13px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); color: var(--mint); vertical-align: top; }
.profile-meta, .mini-metrics, .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0; }
.avatar { width: 50px; height: 50px; border-radius: 18px; display: grid; place-items: center; background: rgba(216,168,71,0.18); color: var(--gold); font-weight: 900; }
.muted { color: var(--mint); line-height: 1.5; }
.operations-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; }
.operation-tile { padding: 16px; border-radius: 20px; background: rgba(0,0,0,0.22); border: 1px solid var(--line); min-height: 116px; }
.operation-tile strong { display: block; margin-bottom: 8px; }
.operation-tile p { margin: 0; color: var(--mint); line-height: 1.45; font-size: 13px; }
.tag-cloud span, .mini-metrics span { border: 1px solid var(--line); border-radius: 999px; padding: 8px 11px; background: rgba(255,255,255,0.08); color: var(--mint); font-weight: 700; }
@media (max-width: 1100px) {
  .app-shell { grid-template-columns: 1fr; }
  .sidebar { position: relative; height: auto; }
  nav { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .metric-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .workflow-row, .operations-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 760px) {
  .main-panel { padding: 16px; }
  nav, .metric-grid, .workflow-row, .operations-grid { grid-template-columns: 1fr; }
  .card, .metric-card { grid-column: 1 / -1; }
  .topbar, .phone-header, .event-row { align-items: flex-start; flex-direction: column; }
  .roster-row { grid-template-columns: 1fr; }
  .hero-content { padding: 26px; }
}
`;
