if (screen === "guest") {
  return (
    <ScreenShell
      screen="guest"
      title="Guest Portal"
      subtitle="A warm and welcoming entry into the story, mission, and living atmosphere of Bronson Family Farm."
      topActions={commonTopActions}
    >
      <div style={{ display: "grid", gap: 18 }}>
        {navBar}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.45fr) minmax(320px, 0.95fr)",
            gap: 18,
          }}
        >
          <div style={{ display: "grid", gap: 18 }}>
            <Card title="Discover">
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <ActionButton
                  label="Story"
                  onClick={() => setGuestView("story")}
                  active={guestView === "story"}
                />
                <ActionButton
                  label="Mission"
                  onClick={() => setGuestView("mission")}
                  active={guestView === "mission"}
                />
                <ActionButton
                  label="Events"
                  onClick={() => setGuestView("events")}
                  active={guestView === "events"}
                />
                <ActionButton
                  label="Partners"
                  onClick={() => setGuestView("partners")}
                  active={guestView === "partners"}
                />
              </div>

              {guestView === "story" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    Bronson Family Farm is more than a growing site. It is a place-based ecosystem
                    where food, family, wellness, youth opportunity, and long-term community value
                    come together.
                  </SoftBlock>
                  <SoftBlock>
                    The farm carries legacy, restoration, and future possibility. Guests begin here
                    by understanding that this land is meant to welcome people into a larger vision.
                  </SoftBlock>
                  <SoftBlock>
                    From this point, a guest can continue into customer, grower, youth workforce,
                    leadership, or marketplace experiences.
                  </SoftBlock>
                </div>
              )}

              {guestView === "mission" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    The mission is to grow food, strengthen families, develop people, restore land,
                    and create pathways into learning, work, and wellness.
                  </SoftBlock>
                  <SoftBlock>
                    This is a living demonstration of how one place can support multiple forms of
                    community growth at the same time.
                  </SoftBlock>
                  <SoftBlock>
                    The guest experience should help people quickly understand that the farm is both
                    welcoming and useful.
                  </SoftBlock>
                </div>
              )}

              {guestView === "events" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    Guests can explore tours, demonstrations, market days, youth activities, and
                    community-centered experiences connected to the farm.
                  </SoftBlock>
                  <SoftBlock>
                    Events are part of how people move from curiosity into participation.
                  </SoftBlock>
                  <SoftBlock>
                    This section should feel like a real entry point into activity, not just a note
                    that events exist.
                  </SoftBlock>
                </div>
              )}

              {guestView === "partners" && (
                <div style={{ display: "grid", gap: 12 }}>
                  <SoftBlock>
                    The ecosystem grows through partnership: growers, educators, vendors, youth
                    support, and community collaborators all have a place here.
                  </SoftBlock>
                  <SoftBlock>
                    Bronson Family Farm is designed to connect with other people and organizations,
                    not operate in isolation.
                  </SoftBlock>
                  <SoftBlock>
                    This pathway shows guests that there are many ways to belong and contribute.
                  </SoftBlock>
                </div>
              )}
            </Card>

            <Card title="Where Guests Can Go Next">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 12,
                }}
              >
                <SoftBlock>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Customer</div>
                  Explore produce, nutrition, recipes, and food access.
                  <div style={{ marginTop: 12 }}>
                    <ActionButton label="Open Customer" onClick={() => navigate("customer")} primary />
                  </div>
                </SoftBlock>

                <SoftBlock>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Grower</div>
                  See weather, crop planner, and field decision tools.
                  <div style={{ marginTop: 12 }}>
                    <ActionButton label="Open Grower" onClick={() => navigate("grower")} primary />
                  </div>
                </SoftBlock>

                <SoftBlock>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Youth Workforce</div>
                  Enter youth learning, parent portal, and supervisor view.
                  <div style={{ marginTop: 12 }}>
                    <ActionButton label="Open Youth" onClick={() => navigate("youth")} primary />
                  </div>
                </SoftBlock>

                <SoftBlock>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Marketplace</div>
                  Move into products, education, and community engagement.
                  <div style={{ marginTop: 12 }}>
                    <ActionButton label="Open Marketplace" onClick={() => navigate("market")} primary />
                  </div>
                </SoftBlock>
              </div>
            </Card>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <WeatherPanel data={weatherByScreen.guest} />
            <Card title="Guest Experience">
              <SoftBlock>
                This area now has real internal destinations: Story, Mission, Events, and Partners.
                Guests can also move directly into the next pathway instead of stopping at a label.
              </SoftBlock>
            </Card>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
