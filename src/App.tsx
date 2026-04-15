import React, { useMemo, useState } from "react";

type SectionId =
  | "grow"
  | "shop"
  | "story"
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
      "See how customers browse products, build a cart, connect to the live GrownBy store, and return to the broader farm experience.",
    highlights: [
      "Marketplace and preorder flow",
      "Pickup and customer access",
      "Farm goods and produce pathways",
    ],
  },
  {
    id: "story",
    title: "📖 Story & Ecosystem",
    desc: "History, place, purpose, and how the ecosystem works.",
    detail:
      "This section explains the history of Bronson Family Farm, the family legacy behind it, the Lansdowne airport context, and how food, health, learning, workforce, and commerce connect into one living ecosystem.",
    highlights: [
      "Bronson Family Farm history and family legacy",
      "Lansdowne airport and land context",
      "The full ecosystem: food, health, learning, workforce, and commerce",
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
      "Partner and supporter pathways",
      "Community-centered engagement",
    ],
  },
  {
    id: "events",
    title: "📅 Events",
    desc: "Markets, tours, demonstrations, and community days.",
    detail:
      "Experience how markets, tours, workshops, and seasonal gathering points activate the full farm ecosystem and bring people into the work.",
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

const storyModules = [
  {
    id: "history",
    title: "The Bronson Family Farm Story",
    audience: "History and legacy",
    description:
      "How family legacy, community purpose, and the move to Youngstown shaped Bronson Family Farm.",
  },
  {
    id: "ecosystem",
    title: "Why the Ecosystem Matters",
    audience: "How it all connects",
    description:
      "How food, health, workforce, learning, commerce, and community support one another inside a single living system.",
  },
  {
    id: "airport",
    title: "The Lansdowne Airport Context",
    audience: "Land and airport setting",
    description:
      "Why the airport setting matters, what makes the site unique, and how the farm vision grows within that landscape.",
  },
  {
    id: "health",
    title: "Health, Food, and Learning",
    audience: "Wellness and education",
    description:
      "How nutrition, natural food, wellness, and practical education fit inside the larger farm mission.",
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

const communityPaths = [
  {
    id: "volunteer",
    title: "Volunteer",
    description:
      "Support planting, events, setup, logistics, and hands-on community activity.",
    action: "Volunteer Interest",
  },
  {
    id: "partner",
    title: "Partner",
    description:
      "Bring your organization into a growing ecosystem for food, workforce, health, and regional renewal.",
    action: "Partner Interest",
  },
  {
    id: "supporter",
    title: "Support",
    description:
      "Help expand food access, workforce training, and community impact through financial or in-kind support.",
    action: "Support Interest",
  },
  {
    id: "family",
    title: "Families",
    description:
      "Join the learning, events, nutrition, and community-building experience.",
    action: "Family Interest",
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
  onAction,
}: {
  activeRole: string;
  onExit: () => void;
  onSwitch: () => void;
  onAction: (action: string) => void;
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
            onClick={() => onAction(action)}
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

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [cart, setCart] = useState<Record<string, number>>({});
  const [showReturnNotice, setShowReturnNotice] = useState(false);
  const [selectedStoryModule, setSelectedStoryModule] = useState<string | null>(
    null
  );
  const [selectedWorkforceTrack, setSelectedWorkforceTrack] = useState<
    string | null
  >(null);
  const [statusMessage, setStatusMessage] = useState<string>(
    "Welcome to the Bronson Family Farm ecosystem."
  );

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      shopItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0),
    [cart]
  );

  const activeStoryModule =
    storyModules.find((module) => module.id === selectedStoryModule) ?? null;

  const activeWorkforceTrack =
    workforceTracks.find((track) => track.id === selectedWorkforceTrack) ?? null;

  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setStatusMessage("Item added to cart.");
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
    setStatusMessage("Item updated in cart.");
  };

  const openGrownBy = () => {
    setShowReturnNotice(true);
    setStatusMessage("Opened GrownBy in a new tab.");
    window.open(
      "https://grownby.com/farms/bronson-family-farm/shop",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleRoleAction = (action: string) => {
    setStatusMessage(`${action} opened.`);
  };

  const renderRoleUI = () => (
    <>
      {showRoles && (
        <RoleModal
          onClose={() => setShowRoles(false)}
          onSelect={(role) => {
            setActiveRole(role);
            setShowRoles(false);
            setStatusMessage(`${role} role activated.`);
          }}
        />
      )}

      {activeRole && (
        <RolePanel
          activeRole={activeRole}
          onExit={() => {
            setActiveRole(null);
            setStatusMessage("Role exited.");
          }}
          onSwitch={() => setShowRoles(true)}
          onAction={handleRoleAction}
        />
      )}
    </>
  );

  if (!entered) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <div style={styles.eyebrow}>Bronson Family Farm Ecosystem Demo</div>
          <h1 style={styles.title}>Bronson Family Farm</h1>
          <p style={styles.subtitle}>
            A living ecosystem rooted in food, family, land, learning, and opportunity.
          </p>
          <p style={styles.entryText}>
            Bronson Family Farm is more than a farm. It is a community-centered
            ecosystem growing from the Lansdowne area of Youngstown—connecting
            fresh food, workforce development, health, education, and long-term
            family and regional renewal.
          </p>
          <button
            style={styles.button}
            onClick={() => {
              setEntered(true);
              setStatusMessage("Entered the farm ecosystem.");
            }}
          >
            Enter the Ecosystem
          </button>
        </div>
      </div>
    );
  }

  if (!selectedSection) {
    return (
      <>
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

          <div style={styles.statusBar}>{statusMessage}</div>

          <div style={styles.infoBox}>
            <div style={styles.infoEyebrow}>Explore the Full System</div>
            <h3 style={styles.infoTitle}>One ecosystem. Multiple entry points.</h3>
            <p style={styles.infoText}>
              Bronson Family Farm connects food, story, workforce, commerce, community,
              and events into one living system. Begin anywhere. Roles unlock added
              actions without limiting exploration.
            </p>
          </div>

          <div style={styles.grid}>
            {sections.map((section) => (
              <button
                key={section.id}
                style={styles.tileButton}
                onClick={() => {
                  setSelectedSection(section);
                  setStatusMessage(`${section.title} opened.`);
                }}
              >
                <div style={styles.tile}>
                  <div style={styles.sectionAccent} />
                  <div style={styles.tileTopRow}>
                    <h3 style={styles.tileTitle}>{section.title}</h3>
                    <span style={styles.tileBadge}>Open</span>
                  </div>
                  <p style={styles.tileText}>{section.desc}</p>
                  <div style={styles.tileFooter}>
                    <span style={styles.openText}>Enter section</span>
                    <span style={styles.arrow}>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
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
                onClick={() => {
                  setSelectedSection(null);
                  setStatusMessage("Returned to ecosystem.");
                }}
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

          <div style={styles.statusBar}>{statusMessage}</div>

          {showReturnNotice && (
            <div style={styles.returnBanner}>
              <strong>Live shop opened in a new tab.</strong>
              <p style={styles.returnBannerText}>
                When you finish on GrownBy, come back to this Bronson Family Farm tab to continue the experience.
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
                  onClick={() => {
                    setSelectedSection(null);
                    setStatusMessage("Returned to ecosystem.");
                  }}
                >
                  Return to Ecosystem
                </button>
              </div>
            </div>
          )}

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <div style={styles.sectionAccentLarge} />
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
                  onClick={() => {
                    setSelectedSection(null);
                    setStatusMessage("Returned to farm experience.");
                  }}
                >
                  Return to Farm Experience
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => setStatusMessage("Pickup Information opened.")}
                >
                  Pickup Information
                </button>

                <div style={styles.pickupBox}>
                  <strong>Pickup Flow</strong>
                  <p style={styles.infoText}>
                    Customers shop live on GrownBy, then return here to continue exploring pickup, story, events, and the broader Bronson Family Farm ecosystem.
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

  if (selectedSection.id === "story") {
    return (
      <>
        <div style={styles.page}>
          <div style={styles.header}>
            <div>
              <button
                style={styles.backLink}
                onClick={() => {
                  setSelectedSection(null);
                  setStatusMessage("Returned to ecosystem.");
                }}
              >
                ← Back to Ecosystem
              </button>
              <h2 style={styles.sectionTitle}>📖 Story & Ecosystem</h2>
              <p style={styles.headerText}>
                History, place, purpose, and how the ecosystem works.
              </p>
            </div>

            <button style={styles.button} onClick={() => setShowRoles(true)}>
              {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
            </button>
          </div>

          <div style={styles.statusBar}>{statusMessage}</div>

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <div style={styles.sectionAccentLarge} />
              <h3 style={styles.pageHeading}>Story Overview</h3>
              <p style={styles.pageBody}>
                Bronson Family Farm is rooted in family legacy, community restoration,
                and the belief that land can do more than produce crops. Here, food,
                health, learning, workforce development, and community participation
                come together in one living ecosystem—shaped by the unique Lansdowne
                airport setting and built for future generations.
              </p>
            </div>

            <div style={styles.pageHeroSide}>
              <strong>Current role context</strong>
              <p style={styles.infoText}>
                {activeRole
                  ? `You are exploring as ${activeRole}. Story stays open while your role unlocks added actions.`
                  : "You are exploring without an active role selected."}
              </p>
            </div>
          </div>

          <div style={styles.learnLayout}>
            <div>
              <div style={styles.learnGrid}>
                {storyModules.map((module) => (
                  <button
                    key={module.id}
                    style={styles.learnCardButton}
                    onClick={() => {
                      setSelectedStoryModule(module.id);
                      setStatusMessage(`${module.title} opened.`);
                    }}
                  >
                    <div style={styles.learnCard}>
                      <div style={styles.productCategory}>{module.audience}</div>
                      <h3 style={styles.tileTitle}>{module.title}</h3>
                      <p style={styles.tileText}>{module.description}</p>
                      <div style={styles.openText}>Open story module →</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.learnPanel}>
              <h3 style={styles.pageHeading}>Story Focus</h3>

              {!activeStoryModule ? (
                <p style={styles.infoText}>
                  Select a story module to preview how the history and ecosystem
                  are explained.
                </p>
              ) : (
                <div>
                  <div style={styles.pickupBox}>
                    <strong>{activeStoryModule.title}</strong>
                    <p style={styles.infoText}>
                      {activeStoryModule.description}
                    </p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>Why it matters</strong>
                    <p style={styles.infoText}>
                      This demo is not just showing farm activity. It shows how
                      Bronson Family Farm can become a model for community-centered
                      renewal through food access, education, youth opportunity,
                      wellness, and shared economic participation.
                    </p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>What this can become</strong>
                    <p style={styles.infoText}>
                      This can expand into timelines, family legacy visuals,
                      airport context, site maps, and narrated ecosystem storytelling.
                    </p>
                  </div>
                </div>
              )}

              <div style={styles.cartFooter}>
                <button
                  style={styles.button}
                  onClick={() => setStatusMessage("Story pathway opened.")}
                >
                  View Story Pathway
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    setSelectedStoryModule(null);
                    setStatusMessage("Story selection cleared.");
                  }}
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
                onClick={() => {
                  setSelectedSection(null);
                  setStatusMessage("Returned to ecosystem.");
                }}
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

          <div style={styles.statusBar}>{statusMessage}</div>

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <div style={styles.sectionAccentLarge} />
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
                    onClick={() => {
                      setSelectedWorkforceTrack(track.id);
                      setStatusMessage(`${track.title} opened.`);
                    }}
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
                  Select a workforce track to preview how youth move through the experience.
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
                      This track reinforces work habits, responsibility, confidence, and a real sense of contribution.
                    </p>
                  </div>

                  <div style={styles.pickupBox}>
                    <strong>What this can become</strong>
                    <p style={styles.infoText}>
                      This can expand into attendance, progress tracking, supervisor observations, badges, and pathway documentation.
                    </p>
                  </div>
                </div>
              )}

              <div style={styles.cartFooter}>
                <button
                  style={styles.button}
                  onClick={() => setStatusMessage("Workforce pathway opened.")}
                >
                  Open Workforce Pathway
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => {
                    setSelectedWorkforceTrack(null);
                    setStatusMessage("Workforce selection cleared.");
                  }}
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

  if (selectedSection.id === "community") {
    return (
      <>
        <div style={styles.page}>
          <div style={styles.header}>
            <div>
              <button
                style={styles.backLink}
                onClick={() => {
                  setSelectedSection(null);
                  setStatusMessage("Returned to ecosystem.");
                }}
              >
                ← Back to Ecosystem
              </button>
              <h2 style={styles.sectionTitle}>🤝 Community</h2>
              <p style={styles.headerText}>
                Volunteers, families, supporters, and partners.
              </p>
            </div>

            <button style={styles.button} onClick={() => setShowRoles(true)}>
              {activeRole ? `Role: ${activeRole}` : "Activate My Role"}
            </button>
          </div>

          <div style={styles.statusBar}>{statusMessage}</div>

          <div style={styles.pageHero}>
            <div style={styles.pageHeroMain}>
              <div style={styles.sectionAccentLarge} />
              <h3 style={styles.pageHeading}>Join the Ecosystem</h3>
              <p style={styles.pageBody}>
                Whether you are a grower, volunteer, partner, or supporter,
                there is a place for you at Bronson Family Farm. This ecosystem
                grows through participation, shared knowledge, and community action.
              </p>
            </div>

            <div style={styles.pageHeroSide}>
              <strong>Community Focus</strong>
              <p style={styles.infoText}>
                This section helps people see how they can step into the farm
                ecosystem in a practical and immediate way.
              </p>
            </div>
          </div>

          <div style={styles.learnGrid}>
            {communityPaths.map((path) => (
              <div key={path.id} style={styles.learnCard}>
                <div style={styles.productCategory}>Join</div>
                <h3 style={styles.tileTitle}>{path.title}</h3>
                <p style={styles.tileText}>{path.description}</p>
                <button
                  style={{ ...styles.button, marginTop: "14px" }}
                  onClick={() => setStatusMessage(`${path.action} opened.`)}
                >
                  {path.action}
                </button>
              </div>
            ))}
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
              onClick={() => {
                setSelectedSection(null);
                setStatusMessage("Returned to ecosystem.");
              }}
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

        <div style={styles.statusBar}>{statusMessage}</div>

        <div style={styles.pageHero}>
          <div style={styles.pageHeroMain}>
            <div style={styles.sectionAccentLarge} />
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
              Shop, Story, Workforce, and Community now carry the strongest parts of the demo.
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
            onClick={() => {
              setSelectedSection(null);
              setStatusMessage("Returned to ecosystem.");
            }}
          >
            Return to Ecosystem
          </button>
          <button
            style={styles.secondaryButton}
            onClick={() => setStatusMessage(`${selectedSection.title} action opened.`)}
          >
            Open Section Action
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
    margin: "0",
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
    borderRadius: "14px",
    border: "1px solid #cfe0d2",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
    minHeight: "190px",
    display: "flex",
    flexDirection: "column",
  },
  sectionAccent: {
    height: "10px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "14px",
  },
  sectionAccentLarge: {
    height: "14px",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #2f6b3c 0%, #7fb685 100%)",
    marginBottom: "18px",
  },
  tileTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },
  tileTitle: {
    margin: "0 0 8px 0",
    color: "#1f3d2b",
    fontSize: "22px",
  },
  tileBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "999px",
    background: "#eef8f0",
    color: "#2f6b3c",
    fontSize: "12px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  tileText: {
    margin: 0,
    color: "#4e6657",
    lineHeight: 1.5,
  },
  tileFooter: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  openText: {
    color: "#2f6b3c",
    fontWeight: 700,
    fontSize: "14px",
  },
  arrow: {
    color: "#2f6b3c",
    fontWeight: 700,
    fontSize: "18px",
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
    marginTop: "0",
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
