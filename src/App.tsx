const roleData = useMemo(() => {
  switch (selectedRole) {
    case "guest":
      return {
        title: "Guest Experience",
        image: IMAGES.guest,
        position: "center 68%",
        intro:
          "A welcoming path into the farm, its purpose, its visible activity, and the ways people can participate.",
        bullets: [
          "See the farm as a living place",
          "Understand what is active now",
          "Explore food, events, and pathways",
          "Move into deeper participation when ready",
        ],
        sections: [
          {
            title: "What a guest sees",
            text: "A clear introduction to the farm, the purpose behind it, and the ways the ecosystem is already moving.",
          },
          {
            title: "What matters here",
            text: "The experience should feel welcoming, grounded, and easy to understand without losing the depth of the vision.",
          },
        ],
      };
    case "customer":
      return {
        title: "Customer Experience",
        image: IMAGES.customer,
        position: "center 52%",
        intro:
          "A direct path to fresh food, access, ordering, pickup, and the visible connection between food and place.",
        bullets: [
          "See what is available now",
          "Move toward shopping and pickup",
          "Connect food with the farm story",
          "Support the ecosystem through purchase",
        ],
        sections: [
          {
            title: "Food access",
            text: "The customer path should feel simple, real, and directly connected to the farm rather than detached from it.",
          },
          {
            title: "What makes it different",
            text: "Customers are not just buying food. They are entering a local ecosystem built around access, learning, and community.",
          },
        ],
      };
    case "grower":
      return {
        title: "Grower Experience",
        image: IMAGES.grower,
        position: "center 62%",
        intro:
          "A view into crops, production rhythm, practical workflow, and the systems that support successful growing.",
        bullets: [
          "Visible growing activity",
          "Crop priorities and workflow",
          "Tools, timing, and support",
          "Connection to the broader ecosystem",
        ],
        sections: [
          {
            title: "Production",
            text: "This path reflects active growing, practical needs, and the work of supporting healthy crops and visible output.",
          },
          {
            title: "Connected work",
            text: "Growing is not separate from the rest of the system. It supports food access, learning, events, and long-term development.",
          },
        ],
      };
    case "youth":
      return {
        title: "Youth Experience",
        image: IMAGES.youth,
        position: "center 56%",
        intro:
          "A structured pathway for work, learning, responsibility, growth, and belonging through real farm activity.",
        bullets: [
          "Learn by doing",
          "Build skills through participation",
          "Experience responsibility and progress",
          "Connect work with future opportunity",
        ],
        sections: [
          {
            title: "Learning through work",
            text: "The youth path should show real structure, participation, and growth rather than a generic training screen.",
          },
          {
            title: "Future pathway",
            text: "This role makes visible how the farm can support confidence, responsibility, and broader opportunity.",
          },
        ],
      };
    case "volunteer":
      return {
        title: "Volunteer Experience",
        image: IMAGES.volunteer,
        position: "center 58%",
        intro:
          "A clear path into contribution, visible needs, meaningful service, and community-powered support.",
        bullets: [
          "See where help is needed",
          "Join events and farm tasks",
          "Support visible momentum",
          "Belong through service and contribution",
        ],
        sections: [
          {
            title: "Where volunteers fit",
            text: "Volunteers should quickly understand how their time and effort support the movement of the farm.",
          },
          {
            title: "Community in motion",
            text: "This path should feel active, useful, and connected to the larger purpose of the ecosystem.",
          },
        ],
      };
    case "supervisor":
      return {
        title: "Supervisor Experience",
        image: IMAGES.supervisor,
        position: "center 58%",
        intro:
          "A view into coordination, oversight, support, and the practical flow behind daily movement on the farm.",
        bullets: [
          "See who is active",
          "Support daily movement",
          "Guide youth and teams",
          "Hold the visible system together",
        ],
        sections: [
          {
            title: "Oversight",
            text: "This path reflects the practical side of coordination, support, visibility, and keeping the system coherent.",
          },
          {
            title: "Stewardship",
            text: "A supervisor is not just managing tasks. This role helps hold people, timing, and movement together.",
          },
        ],
      };
    default:
      return null;
  }
}, [selectedRole]);
