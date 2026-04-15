import React, { useMemo, useState } from "react";

type SectionId =
  | "grow"
  | "shop"
  | "learn"
  | "workforce"
  | "community"
  | "events";

type Section = {
  id: SectionId;
  title: string;
  desc: string;
  detail: string;
  highlights: string[];
};

const sections: Section[] = [
  {
    id: "grow",
    title: "🌱 Grow",
    desc: "Crop planning, planting, production, and farm systems.",
    detail:
      "Explore crop planning, field readiness, seasonal growing, irrigation thinking, infrastructure, and the systems that support Bronson Family Farm’s production capacity.",
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
      "See how customers browse products, build a cart, connect to the live GrownBy store, and return to the broader Bronson Family Farm ecosystem.",
    highlights: [
      "Marketplace and preorder flow",
      "Pickup and customer access",
      "Farm goods and produce pathways",
    ],
  },
  {
    id: "learn",
    title: "📚 Learn",
    desc: "Workshops, guides, wellness, and knowledge hub.",
    detail:
      "Discover education, nutrition, wellness, growing guidance, and practical learning modules designed for families, new growers, and community members.",
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
      "Follow the youth workforce pathway from participation to training, responsibility, skill-building, and future career readiness.",
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
      "See how volunteers, families, supporters, funders, and partners enter the ecosystem and strengthen the work together.",
    highlights: [
      "Volunteer and family participation",
      "Partnership and support pathways",
      "Community-centered engagement",
    ],
  },
  {
    id: "events",
    title: "📅 Events",
    desc: "Markets, tours, demonstrations, and community days.",
    detail:
      "Experience how markets, workshops, tours, and seasonal gathering points activate the full farm ecosystem and bring people into the work.",
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

const shopItems = [
  {
    id: "bubble-babies",
    name: "Bubble Babies Starter Roll",
    price: 5,
    category: "Seedlings",
    note: "Great for early growing and transplant readiness.",
  },
  {
    id: "lettuce-bundle",
    name: "Lettuce Seedling Bundle",
    price: 5,
    category: "Seedlings",
    note: "Tender young seedlings ready for planting.",
  },
  {
    id: "collard-bundle",
    name: "Collard Green Bundle",
    price: 10,
    category: "Greens",
    note: "A strong community favorite with good volume.",
  },
  {
    id: "pepper-pack",
    name: "Pepper Seedling Pack",
    price: 5,
    category: "Seedlings",
    note: "Mixed pepper varieties for kitchen and garden.",
  },
  {
    id: "spinach-pack",
    name: "Spinach Seedling Pack",
    price: 3,
    category: "Greens",
    note: "Easy entry point for home growers and families.",
  },
  {
    id: "market-box",
    name: "Bronson Market Box",
    price: 20,
    category: "Produce",
    note: "A simple mixed farm box for pickup.",
  },
];

const learnModules = [
  {
    id: "nutrition",
    title: "Nutrition & Natural Food",
    audience: "Families and community members",
    description:
      "Learn the difference between natural food and processed food, and how nutrition choices affect everyday health and energy.",
  },
  {
    id: "growing",
    title: "Growing Basics",
    audience: "New and aspiring growers",
    description:
      "Simple entry points for planting, seedling care, seasonal growing, and building confidence in local food production.",
  },
  {
    id: "wellness",
    title: "Health & Wellness",
    audience: "Growers, workers, and families",
    description:
      "Explore how diet, movement, and practical wellness habits support healthier living for work, play, and daily life.",
  },
  {
    id: "diabetes",
    title: "Type II Diabetes Support",
    audience: "Adults and caregivers",
    description:
      "Understand food choices, healthier habits, and practical strategies that support diabetes maintenance and daily decision-making.",
  },
];

const workforceTracks = [
  {
    id: "orientation",
    title: "Orientation",
    description:
      "Introduces safety, expectations, time awareness, accountability, and how the farm ecosystem works.",
  },
  {
    id: "fieldwork",
    title: "Field Work",
    description:
      "Hands-on learning in planting, maintenance, harvest support, teamwork, and daily task completion.",
  },
  {
    id: "life-skills",
    title: "Life & Work Skills",
    description:
      "Builds communication, responsibility, problem-solving, follow-through, and workplace readiness.",
  },
  {
    id: "pathways",
    title: "Future Pathways",
    description:
      "Connects youth to long-term opportunity through confidence, experience, and practical career exposure.",
  },
];

function roleDescription(role: string) {
  switch (role) {
    case "Guest":
      return "Explore the ecosystem, learn the story, and view public experiences.";
    case "Customer":
      return "Explore freely while unlocking shopping, preorder, and order-related actions.";
    case "Grower":
      return "Explore the ecosystem while accessing crop, inventory, and fulfillment tools.";
    case "Volunteer":
      return "Explore the full ecosystem while accessing service opportunities, shifts, and support pathways.";
    case "Youth Worker":
      return "Explore the ecosystem while accessing training, progress, and assigned work pathways.";
    case "Supervisor":
      return "Explore everything while unlocking oversight, coordination, and evaluation tools.";
    case "Admin":
      return "Explore the ecosystem with full operational visibility and platform control.";
    default:
      return "Explore the ecosystem.";
  }
}

function roleActions(role: string): string[] {
  switch (role) {
    case "Guest":
      return ["Explore the Farm", "View Public Events", "Learn the Mission"];
    case "Customer":
      return ["Shop Products", "View Pickup Flow", "Review Orders"];
    case "Grower":
      return ["Manage Crops", "Update Inventory", "View Fulfillment"];
    case "Volunteer":
      return ["Sign Up for Shift", "View Orientation", "Track Service"];
    case "Youth Worker":
      return ["Open Training Track", "View Progress", "See Assignments"];
    case "Supervisor":
      return ["View Team Dashboard", "Assign Tasks", "Review Progress"];
    case "Admin":
      return ["Open Operations", "View Reports", "Manage Platform"];
    default:
      return ["Explore"];
  }
}

function RoleModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (role: string) => void;
}) {
  return (
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
              onClick={() => onSelect(role)}
            >
              <div style={styles.roleButtonTitle}>{role}</div>
              <div style={styles.roleButtonText}>{roleDescription(role)}</div>
            </button>
          ))}
        </div>

        <button style={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function RolePanel({
  activeRole,
  onExit,
  onSwitch,
}: {
  activeRole: string;
  onExit: () => void;
  onSwitch: () => void;
}) {
  return (
    <div style={styles.sidePanel}>
      <h3 style={styles.sideTitle}>{activeRole}</h3>
      <p style={styles.sideText}>{roleDescription(activeRole)}</p>

      <div style={styles.sideActionGroup}>
        {roleActions(activeRole).map((action, index) => (
          <button
            key={action}
            style={index === 0 ? styles.sidePrimary : styles.sideSecondary}
          >
            {action}
          </button>
        ))}
      </div>

      <button style={styles.sideSecondary} onClick={onSwitch}>
        Switch Role
      </button>
      <button style={styles.sideSecondary} onClick={onExit}>
        Exit Role
      </button>
    </div>
  );
}

function EntryScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <div style={styles.eyebrow}>Bronson Family Farm Ecosystem Demo</div>
        <h1 style={styles.title}>Bronson Family Farm</h1>
        <p style={styles.subtitle}>
          A Living Ecosystem for Growing, Learning, and Community
        </p>
        <p style={styles.entryText}>
          Explore first. Activate a role when ready. Move from inspiration to
          commerce, learning, workforce opportunity, and community engagement.
        </p>
        <button style={styles.button} onClick={onEnter}>
          Enter the Farm
        </button>
      </div>
    </div>
  );
}

function EcosystemHome({
  activeRole,
  onOpenRoles,
  onSelectSection,
}: {
  activeRole: string | null;
  onOpenRoles: () => void;
  onSelectSection: (section: Section) => void;
}) {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.sectionTitle}>Farm Ecosystem</h2>
          <p style={styles.headerText}>
            Explore first. Activate a role when ready.
          </p>
        </div>

        <button style={styles.button} onClick={onOpenRoles}>
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
            onClick={() => onSelectSection(section)}
          >
            <div style={styles.tile}>
              <h3 style={styles.tileTitle}>{section.title}</h3>
              <p style={styles.tileText}>{section.desc}</p>
              <div style={styles.openText}>Open section →</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [showReturnNotice, setShowReturnNotice] = useState(false);
  const [selectedLearnModule, setSelectedLearnModule] = useState<string | null>(
    null
  );
  const [selectedWorkforceTrack, setSelectedWorkforceTrack] = useState<
    string | null
  >(null);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      shopItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0),
    [cart]
  );

  const activeLearnModule =
    learnModules.find((module) => module.id === selectedLearnModule) ?? null;

  const activeWorkforceTrack =
    workforceTracks.find((track) => track.id === selectedWorkforceTrack) ?? null;

  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: current - 1,
      };
    });
  };

  const openGrownBy = () => {
    setShowReturnNotice(true);
    window.open(
      "https://grownby.com/farms/bronson-family-farm/shop",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const renderRoleUI = () => (
    <>
      {showRoles && (
        <RoleModal
          onClose={() => setShowRoles(false)}
          onSelect={(role) => {
            setActiveRole(role);
            setShowRoles(false);
          }}
        />
      )}

      {activeRole && (
        <RolePanel
          activeRole={activeRole}
          onExit={() => setActiveRole(null)}
          onSwitch={() => setShowRoles(true)}
        />
      )}
    </>
  );

  if (!entered) {
    return <EntryScreen onEnter={() => setEntered(true)} />;
  }

  if (!selectedSection) {
    return (
      <>
        <EcosystemHome
          activeRole={activeRole}
          onOpenRoles={() => setShowRoles(true)}
          onSelectSection={(section) => setSelectedSection(section)}
        />
        {renderRoleUI()}
      </>
    );
  }

  if (selectedSection.id === "shop") {
    return (
      <>
        <div style={styles.page}>
          <div style={styles.header}>
            <div>
              <button
                style={styles.backLink}
                onClick={() => setSelectedSection(null)}
              >
                ← Back to Ecosystem
              </button>
              <h2 style={styles.sectionTitle}>🛒 Shop</h2>
              <p style={styles.headerText}>
                A working marketplace demo for Bronson Family Farm.
              </p>
            </div>

            <button style={styles.button} onClick={() => setShowRoles(true)}>
              {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
            </button>
          </div>

          {showReturnNotice && (
            <div style={styles.returnBanner}>
              <strong>Live shop opened in a new tab.</strong>
              <p style={styles.returnBannerText}>
                When you finish on GrownBy, come back to this Bronson Family
                Farm tab to continue the experience.
              </p>
              <div style={styles.returnBannerActions}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => setShowReturnNotice(false)}
                >
                  Continue Here
                </button>
                <button
                  style={styles.button}
                  onClick={() => setSelectedSection(null)}
                >
                  Return to Ecosystem
                </button>
              </div>
            </div>
          )}

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <h3 style={styles.pageHeading}>Marketplace Overview</h3>
              <p style={styles.pageBody}>
                This is the first live section of the ecosystem. It shows how
                customers can browse products, build a cart, connect to the live
                GrownBy store, and return to the broader farm experience.
              </p>
            </div>

            <div style={styles.pageHeroSide}>
              <strong>Cart Summary</strong>
              <p style={styles.infoText}>Items: {cartCount}</p>
              <p style={styles.infoText}>Total: ${cartTotal.toFixed(2)}</p>
            </div>
          </div>

          <div style={styles.shopLayout}>
            <div>
              <div style={styles.productGrid}>
                {shopItems.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div key={item.id} style={styles.productCard}>
                      <div style={styles.productCategory}>{item.category}</div>
                      <h3 style={styles.tileTitle}>{item.name}</h3>
                      <p style={styles.tileText}>{item.note}</p>
                      <div style={styles.priceRow}>
                        <strong style={styles.priceText}>
                          ${item.price.toFixed(2)}
                        </strong>
                        <div style={styles.qtyControls}>
                          <button
                            style={styles.smallButton}
                            onClick={() => removeFromCart(item.id)}
                          >
                            −
                          </button>
                          <span style={styles.qtyText}>{qty}</span>
                          <button
                            style={styles.smallButton}
                            onClick={() => addToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.cartPanel}>
              <h3 style={styles.pageHeading}>Current Cart</h3>

              {cartCount === 0 ? (
                <p style={styles.infoText}>No items added yet.</p>
              ) : (
                <div style={styles.cartList}>
                  {shopItems
                    .filter((item) => cart[item.id])
                    .map((item) => (
                      <div key={item.id} style={styles.cartItem}>
                        <div>
                          <strong>{item.name}</strong>
                          <p style={styles.cartMeta}>
                            Qty: {cart[item.id]} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <strong>
                          ${((cart[item.id] || 0) * item.price).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                </div>
              )}

              <div style={styles.cartFooter}>
                <div style={styles.cartTotalRow}>
                  <span>Total</span>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>

                <button style={styles.button} onClick={openGrownBy}>
                  Shop Live on GrownBy →
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => setSelectedSection(null)}
                >
                  Return to Farm Experience
                </button>

                <div style={styles.pickupBox}>
                  <strong>Pickup Flow</strong>
                  <p style={styles.infoText}>
                    Customers shop live on GrownBy, then return here to
                    continue exploring pickup, education, events, and the
                    broader Bronson Family Farm ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderRoleUI()}
      </>
    );
  }

  if (selectedSection.id === "learn") {
    return (
      <>
        <div style={styles.page}>
          <div style={styles.header}>
            <div>
              <button
                style={styles.backLink}
                onClick={() => setSelectedSection(null)}
              >
                ← Back to Ecosystem
              </button>
              <h2 style={styles.sectionTitle}>📚 Learn</h2>
              <p style={styles.headerText}>
                Education, wellness, and practical community learning.
              </p>
            </div>

            <button style={styles.button} onClick={() => setShowRoles(true)}>
              {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
            </button>
          </div>

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <h3 style={styles.pageHeading}>Learning Overview</h3>
              <p style={styles.pageBody}>
                This section shows how Bronson Family Farm can teach nutrition,
                growing, wellness, and healthier living through simple,
                welcoming learning pathways.
              </p>
            </div>

            <div style={styles.pageHeroSide}>
              <strong>Current role context</strong>
              <p style={styles.infoText}>
                {activeRole
                  ? `You are exploring as ${activeRole}. Learning stays open while your role unlocks added actions.`
                  : "You are exploring without an active role selected."}
              </p>
            </div>
          </div>

          <div style={styles.learnLayout}>
            <div>
              <div style={styles.learnGrid}>
                {learnModules.map((module) => (
                  <button
                    key={module.id}
                    style={styles.learnCardButton}
                    onClick={() => setSelectedLearnModule(module.id)}
                  >
                    <div style={styles.learnCard}>
                      <div style={styles.productCategory}>{module.audience}</div>
                      <h3 style={styles.tileTitle}>{module.title}</h3>
                      <p style={styles.tileText}>{module.description}</p>
                      <div style={styles.openText}>Open learning module →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.learnPanel}>
              <h3 style={styles.pageHeading}>Learning Focus</h3>

              {!activeLearnModule ? (
                <p style={styles.infoText}>
                  Select a learning module to preview how the education
                  experience works.
                </p>
              ) : (
                <div>
                  <div style={styles.pickupBox}>
                    <strong>{activeLearnModule.title}</strong>
                    <p style={styles.infoText}>{activeLearnModule.description}</p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>Audience</strong>
                    <p style={styles.infoText}>{activeLearnModule.audience}</p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>What this module can become</strong>
                    <p style={styles.infoText}>
                      This can expand into guided lessons, videos, printable
                      handouts, workshop registration, and community health
                      education.
                    </p>
                  </div>
                </div>
              )}

              <div style={styles.cartFooter}>
                <button style={styles.button}>View Workshop Pathway</button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => setSelectedLearnModule(null)}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
        {renderRoleUI()}
      </>
    );
  }

  if (selectedSection.id === "workforce") {
    return (
      <>
        <div style={styles.page}>
          <div style={styles.header}>
            <div>
              <button
                style={styles.backLink}
                onClick={() => setSelectedSection(null)}
              >
                ← Back to Ecosystem
              </button>
              <h2 style={styles.sectionTitle}>👩🏽‍🌾 Workforce</h2>
              <p style={styles.headerText}>
                Youth opportunity, responsibility, and pathway-building.
              </p>
            </div>

            <button style={styles.button} onClick={() => setShowRoles(true)}>
              {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
            </button>
          </div>

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <h3 style={styles.pageHeading}>Workforce Overview</h3>
              <p style={styles.pageBody}>
                This section demonstrates how Bronson Family Farm can serve as a
                living classroom for youth workforce development, responsibility,
                confidence, and future opportunity.
              </p>
            </div>

            <div style={styles.pageHeroSide}>
              <strong>Current role context</strong>
              <p style={styles.infoText}>
                {activeRole
                  ? `You are exploring as ${activeRole}. Workforce stays open while your role unlocks added actions.`
                  : "You are exploring without an active role selected."}
              </p>
            </div>
          </div>

          <div style={styles.learnLayout}>
            <div>
              <div style={styles.learnGrid}>
                {workforceTracks.map((track) => (
                  <button
                    key={track.id}
                    style={styles.learnCardButton}
                    onClick={() => setSelectedWorkforceTrack(track.id)}
                  >
                    <div style={styles.learnCard}>
                      <div style={styles.productCategory}>Workforce Track</div>
                      <h3 style={styles.tileTitle}>{track.title}</h3>
                      <p style={styles.tileText}>{track.description}</p>
                      <div style={styles.openText}>Open track →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.learnPanel}>
              <h3 style={styles.pageHeading}>Track Focus</h3>

              {!activeWorkforceTrack ? (
                <p style={styles.infoText}>
                  Select a workforce track to preview how youth move through the
                  experience.
                </p>
              ) : (
                <div>
                  <div style={styles.pickupBox}>
                    <strong>{activeWorkforceTrack.title}</strong>
                    <p style={styles.infoText}>
                      {activeWorkforceTrack.description}
                    </p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>Program Value</strong>
                    <p style={styles.infoText}>
                      This track reinforces work habits, responsibility,
                      confidence, and a real sense of contribution.
                    </p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>What this can become</strong>
                    <p style={styles.infoText}>
                      This can expand into attendance, progress tracking,
                      supervisor observations, badges, and pathway documentation.
                    </p>
                  </div>
                </div>
              )}

              <div style={styles.cartFooter}>
                <button style={styles.button}>Open Workforce Pathway</button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => setSelectedWorkforceTrack(null)}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
        {renderRoleUI()}
      </>
    );
  }

  return (
    <>
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
              Shop, Learn, and Workforce now serve as the strongest real
              sections in the demo.
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
      </div>
      {renderRoleUI()}
    </>
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
    maxWidth: "760px",
    width: "100%",
  },
  eyebrow: {
    marginBottom: "12px",
    color: "#2f6b3c",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    color: "#1f3d2b",
    fontSize: "40px",
  },
  subtitle: {
    margin: "16px 0 14px 0",
    fontSize: "18px",
    color: "#3f5f4a",
  },
  entryText: {
    margin: "0 0 24px 0",
    color: "#4e6657",
    lineHeight: 1.6,
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
  },
  roleButton: {
    background: "#eef8f0",
    border: "1px solid #cfe0d2",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
    color: "#1f3d2b",
    fontSize: "15px",
    textAlign: "left",
  },
  roleButtonTitle: {
    fontWeight: 700,
    marginBottom: "6px",
  },
  roleButtonText: {
    color: "#486452",
    lineHeight: 1.4,
    fontSize: "13px",
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
  shopLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
    gap: "20px",
    alignItems: "start",
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
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
  priceRow: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  priceText: {
    color: "#1f3d2b",
    fontSize: "18px",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  qtyText: {
    minWidth: "18px",
    textAlign: "center",
    fontWeight: 700,
    color: "#1f3d2b",
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
  pickupBox: {
    background: "#f8fcf9",
    border: "1px solid #dbe8dd",
    borderRadius: "12px",
    padding: "16px",
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
  learnPanel: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #cfe0d2",
    position: "sticky",
    top: "20px",
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
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sideTitle: {
    marginTop: 0,
    color: "#1f3d2b",
  },
  sideText: {
    color: "#4e6657",
    lineHeight: 1.5,
    marginBottom: "8px",
  },
  sideActionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidePrimary: {
    width: "100%",
    padding: "12px",
    background: "#2f6b3c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
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
