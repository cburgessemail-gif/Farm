import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  GraduationCap,
  HeartPulse,
  Home,
  Info,
  Languages,
  Leaf,
  Mic,
  Play,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Tractor,
  Trees,
  UserRound,
  Users,
  X,
} from "lucide-react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey =
  | "home"
  | "story"
  | "guest"
  | "customer"
  | "marketplace"
  | "grower"
  | "valueAdded"
  | "youth"
  | "volunteers"
  | "planner"
  | "events"
  | "wellness";

type YouthViewKey = "overview" | "parent" | "supervisor";

type RecipeCard = {
  title: string;
  text: string;
  details: string;
};

type Destination =
  | { type: "screen"; value: ScreenKey }
  | { type: "url"; value: string }
  | { type: "image"; value: string }
  | { type: "recipe"; value: string }
  | { type: "youth"; value: YouthViewKey };

const IMAGES = {
  entrance: "/GrowArea.jpg",
  story: "/large (10).jpg",
  guest: "/Samaeera1.jpg",
  customer: "/Samerra4.jpg",
  marketplace: "/SAM_0223.JPG",
  grower: "/SAM_0313.JPG",
  valueAdded: "/culinary_mushrooms.jpeg",
  youth: "/large (11).jpg",
  volunteers: "/SAM_0290.JPG",
  community: "/WolfSpider.jpg",
  education: "/SAM_0275.JPG",
  wellness: "/culinary_edibleflowers.jpeg",
  events: "/SAM_0282.JPG",
  planning: "/GrowArea2.jpg",
  family: "/large (1).jpg",
  logistics: "/SAM_0309.JPG",
  airport: "/SAM_0311.JPG",
  produce: "/SAM_0223.JPG",
  training: "/SAM_0249.JPG",
  recipes: "/culinary_mushrooms.jpeg",
  nutrition: "/culinary_edibleflowers.jpeg",
  future: "/SAM_0310.JPG",
  legacy: "/SAM_0311.JPG",
  growArea: "/GrowArea.jpg",
};

const SCREEN_ORDER: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "grower",
  "valueAdded",
  "youth",
  "volunteers",
  "planner",
  "events",
  "wellness",
];

const TOUR_ROUTE: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "wellness",
  "grower",
  "planner",
  "youth",
  "volunteers",
  "events",
];

const SCREEN_IMAGES: Record<ScreenKey, string> = {
  home: IMAGES.entrance,
  story: IMAGES.story,
  guest: IMAGES.entrance,
  customer: IMAGES.entrance,
  marketplace: IMAGES.entrance,
  grower: IMAGES.growArea,
  valueAdded: IMAGES.growArea,
  youth: IMAGES.growArea,
  volunteers: IMAGES.growArea,
  planner: IMAGES.planning,
  events: IMAGES.entrance,
  wellness: IMAGES.entrance,
};

const RECIPES: RecipeCard[] = [
  {
    title: "Collard Greens Bowl",
    text: "A simple bowl using collards, onions, peppers, and beans with a light seasoning approach.",
    details:
      "Use collards as the anchor, add onions and peppers for flavor, then pair with beans or another simple protein. This supports a low-cost, fiber-rich meal that connects fresh greens with everyday cooking.",
  },
  {
    title: "Fresh Tomato & Cucumber Salad",
    text: "A quick fresh-food option that helps people compare natural ingredients with processed alternatives.",
    details:
      "Slice tomatoes and cucumbers, add a light vinaigrette or lemon, and season gently. This recipe makes fresh food feel easy, visible, and approachable.",
  },
  {
    title: "Broccoli & Cabbage Stir-Fry",
    text: "A practical meal idea built around vegetables, color, fiber, and low-cost family cooking.",
    details:
      "Use broccoli, cabbage, garlic, and a small amount of oil with basic seasonings. This supports the idea that healthy meals can be made with simple ingredients and flexible portions.",
  },
  {
    title: "Pepper and Greens Skillet",
    text: "A flexible stove-top recipe using greens, peppers, garlic, and simple pantry ingredients.",
    details:
      "This is a practical everyday recipe that works with what the farm grows. It supports the message that fresh produce can fit work, play, and everyday home life.",
  },
  {
    title: "Lettuce Wrap Meal Prep",
    text: "A lighter meal-prep option that connects fresh produce with healthier everyday habits.",
    details:
      "Use lettuce as the wrap and fill with chopped vegetables, beans, or lean protein. This is good for portion awareness, freshness, and lighter meal choices.",
  },
  {
    title: "Diabetes-Friendly Produce Plate",
    text: "A visual way to connect vegetables, portion awareness, and practical food choices for everyday wellness.",
    details:
      "Arrange non-starchy vegetables, fresh greens, and a balanced protein portion in a simple plate model. This supports diabetes awareness without making the experience feel clinical.",
  },
];

const DESTINATIONS: Record<string, Destination> = {
  Entrance: { type: "screen", value: "home" },
  "Our Story": { type: "screen", value: "story" },
  "Role Pathways": { type: "screen", value: "guest" },
  "View Events": { type: "screen", value: "events" },
  "Health & Nutrition": { type: "screen", value: "wellness" },
  "Go to Marketplace": { type: "screen", value: "marketplace" },
  "Open Crop Planner": { type: "screen", value: "planner" },

  Story: { type: "screen", value: "story" },
  Events: { type: "screen", value: "events" },
  Gallery: { type: "image", value: IMAGES.community },

  Marketplace: { type: "screen", value: "marketplace" },
  Recipes: { type: "screen", value: "wellness" },
  Nutrition: { type: "screen", value: "wellness" },
  "Fresh Food": { type: "screen", value: "marketplace" },
  Seedlings: { type: "screen", value: "marketplace" },
  "Bubble Babies": { type: "screen", value: "marketplace" },

  Planner: { type: "screen", value: "planner" },
  "Seasonal Guidance": { type: "screen", value: "planner" },
  Coordination: { type: "image", value: IMAGES.training },
  "Grower Path": { type: "screen", value: "grower" },
  "Inventory to Market": { type: "screen", value: "marketplace" },
  "Event Readiness": { type: "screen", value: "events" },
  "Seasonal Events": { type: "screen", value: "events" },

  Branding: { type: "screen", value: "valueAdded" },
  Packaging: { type: "screen", value: "valueAdded" },
  "Market Access": { type: "screen", value: "marketplace" },
  Demonstrations: { type: "screen", value: "events" },
  "Product Presentation": { type: "image", value: IMAGES.produce },

  Learning: { type: "screen", value: "youth" },
  "Parent Portal": { type: "youth", value: "parent" },
  Support: { type: "youth", value: "supervisor" },
  "Program Overview": { type: "youth", value: "overview" },
  "Supervisor Support": { type: "youth", value: "supervisor" },
  "STEAM & Training": { type: "image", value: IMAGES.training },
  "Learning Schedule": { type: "screen", value: "planner" },

  Service: { type: "screen", value: "volunteers" },
  Community: { type: "screen", value: "wellness" },
  "Event Support": { type: "screen", value: "events" },
  "Youth Connection": { type: "screen", value: "youth" },
  "Community Care": { type: "screen", value: "wellness" },

  GrownBy: {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Shop Now": {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Open Full GrownBy Store": {
    type: "url",
    value: "https://grownby.com/farms/bronson-family-farm/shop",
  },
  "Shop Fresh Food": { type: "screen", value: "marketplace" },
  Preorders: { type: "screen", value: "marketplace" },
  "Return Visits": { type: "screen", value: "customer" },
  "Back to Customer Path": { type: "screen", value: "customer" },
  "Recipes & Nutrition": { type: "screen", value: "wellness" },
  "Food Guidance": { type: "screen", value: "wellness" },

  "Nutrition View": { type: "image", value: IMAGES.nutrition },
  "Fresh Choices": { type: "screen", value: "customer" },
  "Diabetes Awareness": { type: "screen", value: "wellness" },
  "Healthier at Home": { type: "screen", value: "wellness" },

  "Collard Greens Bowl": { type: "recipe", value: "Collard Greens Bowl" },
  "Fresh Tomato & Cucumber Salad": {
    type: "recipe",
    value: "Fresh Tomato & Cucumber Salad",
  },
  "Broccoli & Cabbage Stir-Fry": {
    type: "recipe",
    value: "Broccoli & Cabbage Stir-Fry",
  },
  "Pepper and Greens Skillet": {
    type: "recipe",
    value: "Pepper and Greens Skillet",
  },
  "Lettuce Wrap Meal Prep": {
    type: "recipe",
    value: "Lettuce Wrap Meal Prep",
  },
  "Diabetes-Friendly Produce Plate": {
    type: "recipe",
    value: "Diabetes-Friendly Produce Plate",
  },

  "Guest Experiences": { type: "screen", value: "guest" },
  "Health Education": { type: "screen", value: "wellness" },
  "Enter as Guest": { type: "screen", value: "guest" },
  "Community Experiences": { type: "screen", value: "events" },
  "Legacy View": { type: "image", value: IMAGES.legacy },
  "Coordination View": { type: "image", value: IMAGES.training },
  Customer: { type: "screen", value: "customer" },
};

const PATHWAY_STEPS: Record<
  ScreenKey,
  { title: string; text: string; goTo: ScreenKey }[]
> = {
  home: [
    {
      title: "Start here",
      text: "Enter the ecosystem and choose a pathway.",
      goTo: "guest",
    },
    {
      title: "Explore food access",
      text: "Move toward customer and marketplace experiences.",
      goTo: "customer",
    },
    {
      title: "See the working farm",
      text: "Open planning, events, and grower pathways.",
      goTo: "planner",
    },
  ],
  story: [
    {
      title: "See the vision",
      text: "Understand the farm’s legacy and purpose.",
      goTo: "guest",
    },
    {
      title: "Experience the land",
      text: "Move into the guest pathway.",
      goTo: "guest",
    },
    {
      title: "Join a live experience",
      text: "Continue into events.",
      goTo: "events",
    },
  ],
  guest: [
    {
      title: "Understand the place",
      text: "Start with the farm story.",
      goTo: "story",
    },
    {
      title: "See events",
      text: "Discover what brings people back.",
      goTo: "events",
    },
    {
      title: "Move toward participation",
      text: "Continue into customer, volunteer, or youth pathways.",
      goTo: "customer",
    },
  ],
  customer: [
    {
      title: "See food access",
      text: "Start with fresh food, seedlings, and guidance.",
      goTo: "marketplace",
    },
    {
      title: "Get recipes",
      text: "Move into wellness and practical food use.",
      goTo: "wellness",
    },
    {
      title: "Return to shop",
      text: "Come back to marketplace action.",
      goTo: "marketplace",
    },
  ],
  marketplace: [
    {
      title: "Shop through GrownBy",
      text: "Move directly into the store.",
      goTo: "marketplace",
    },
    {
      title: "Connect food to guidance",
      text: "Continue into wellness and nutrition.",
      goTo: "wellness",
    },
    {
      title: "Return to customer path",
      text: "Move back into the broader customer journey.",
      goTo: "customer",
    },
  ],
  grower: [
    {
      title: "Open planning",
      text: "Begin with season, timing, and readiness.",
      goTo: "planner",
    },
    {
      title: "See event flow",
      text: "Connect production to events.",
      goTo: "events",
    },
    {
      title: "Move toward market timing",
      text: "Follow inventory toward destination.",
      goTo: "marketplace",
    },
  ],
  valueAdded: [
    {
      title: "See presentation opportunities",
      text: "Start with demonstrations and product visibility.",
      goTo: "events",
    },
    {
      title: "Connect to market access",
      text: "Move toward marketplace presence.",
      goTo: "marketplace",
    },
    {
      title: "Return to production context",
      text: "Reconnect with grower planning.",
      goTo: "grower",
    },
  ],
  youth: [
    {
      title: "Understand the program",
      text: "Start with the Youth Workforce overview.",
      goTo: "youth",
    },
    {
      title: "View learning schedule",
      text: "Continue into planning and timing.",
      goTo: "planner",
    },
    {
      title: "See family and support structure",
      text: "Move into Parent Portal and supervisor support within the program.",
      goTo: "wellness",
    },
  ],
  volunteers: [
    {
      title: "Join through service",
      text: "Start with volunteer participation.",
      goTo: "volunteers",
    },
    {
      title: "Support events",
      text: "Move into community experiences.",
      goTo: "events",
    },
    {
      title: "Reconnect to the mission",
      text: "Continue into wellness and community care.",
      goTo: "wellness",
    },
  ],
  planner: [
    {
      title: "Read the season",
      text: "Start with readiness and timing.",
      goTo: "planner",
    },
    {
      title: "Connect to growers",
      text: "Move toward grower operations.",
      goTo: "grower",
    },
    {
      title: "Follow flow to market",
      text: "Continue into marketplace timing.",
      goTo: "marketplace",
    },
  ],
  events: [
    {
      title: "See what is happening",
      text: "Start with the live event experience.",
      goTo: "events",
    },
    {
      title: "Move toward participation",
      text: "Continue into volunteer or guest experiences.",
      goTo: "volunteers",
    },
    {
      title: "Connect to food and learning",
      text: "Continue into wellness or marketplace.",
      goTo: "wellness",
    },
  ],
  wellness: [
    {
      title: "Start with practical food use",
      text: "Open recipes and nutrition guidance.",
      goTo: "wellness",
    },
    {
      title: "Move toward shopping",
      text: "Continue into marketplace action.",
      goTo: "marketplace",
    },
    {
      title: "Return to customer support",
      text: "Reconnect food access with family habits.",
      goTo: "customer",
    },
  ],
};

const COPY: Record<
  LanguageKey,
  {
    brand: string;
    subbrand: string;
    titles: Record<ScreenKey, string>;
    bodies: Record<ScreenKey, string>;
    nav: {
      entrance: string;
      story: string;
      roles: string;
      events: string;
      wellness: string;
      marketplace: string;
      voiceOn: string;
      voiceOff: string;
      startTour: string;
      stopTour: string;
      cropPlanner: string;
      backHome: string;
      previous: string;
      next: string;
    };
  }
> = {
  en: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    titles: {
      home: "Welcome to the ecosystem",
      story: "The story behind the farm",
      guest: "Guest pathway",
      customer: "Customer pathway",
      marketplace: "Marketplace pathway",
      grower: "Grower pathway",
      valueAdded: "Value-Added Producer pathway",
      youth: "Youth Workforce pathway",
      volunteers: "Volunteer pathway",
      planner: "Crop Planning Center",
      events: "Events and community experiences",
      wellness: "Health, nutrition, and food education",
    },
    bodies: {
      home: "You are entering a regenerative farm and community ecosystem where land becomes opportunity, food becomes wellness, learning becomes workforce development, and visitors become participants in something larger.",
      story: "Inspired by family farming traditions and shaped for Youngstown's future, this farm brings together legacy, land restoration, food access, agritourism, and practical community opportunity.",
      guest: "Guests explore the vision, experience the land, attend events, and discover how this farm is restoring place, purpose, and possibility.",
      customer: "Customers access fresh food, seedlings, wellness education, and practical tools that help families move toward healthier and more self-sufficient living.",
      marketplace:
        "The marketplace helps people move from interest to action by connecting food access, local purchasing, and the larger journey toward self-sufficiency and community resilience.",
      grower:
        "Growers use planning, timing, collaboration, and market access tools that support real production, stronger operations, and income generation.",
      valueAdded:
        "Value-added producers can turn raw products into stronger brands, packaged goods, demonstrations, and expanded local market opportunities.",
      youth:
        "Enter a structured living classroom where agriculture, teamwork, responsibility, and entrepreneurship prepare young people for future success, with Parent Portal access and supervisor support built into the program.",
      volunteers:
        "Volunteers enter a welcoming service pathway where community members can support food growing, events, hospitality, setup, and shared learning while contributing to something larger than themselves.",
      planner:
        "This planning center helps transform land, labor, seeds, weather, and timing into real food production, income opportunities, training experiences, and reliable community supply.",
      events:
        "Events bring people back for learning, shopping, demonstrations, relationship-building, and shared community experience.",
      wellness:
        "This pathway helps people connect fresh food with practical wellness, healthier choices, recipes, diabetes awareness, and everyday life.",
    },
    nav: {
      entrance: "Entrance",
      story: "Our Story",
      roles: "Role Pathways",
      events: "View Events",
      wellness: "Health & Nutrition",
      marketplace: "Go to Marketplace",
      voiceOn: "Voice narration on",
      voiceOff: "Voice narration off",
      startTour: "Start Guided Tour",
      stopTour: "Stop Guided Tour",
      cropPlanner: "Open Crop Planner",
      backHome: "Back to entrance",
      previous: "Previous",
      next: "Next",
    },
  },
  es: {
    brand: "Bronson Family Farm",
    subbrand: "Demostración del Ecosistema de Farm & Family Alliance",
    titles: {
      home: "Bienvenido al ecosistema",
      story: "La historia detrás de la granja",
      guest: "Ruta del visitante",
      customer: "Ruta del cliente",
      marketplace: "Ruta del mercado",
      grower: "Ruta del productor",
      valueAdded: "Ruta del productor con valor agregado",
      youth: "Ruta de la fuerza laboral juvenil",
      volunteers: "Ruta de voluntariado",
      planner: "Centro de planificación de cultivos",
      events: "Eventos y experiencias comunitarias",
      wellness: "Salud, nutrición y educación alimentaria",
    },
    bodies: {
      home: "Está entrando en un ecosistema agrícola y comunitario regenerativo donde la tierra se convierte en oportunidad, la comida en bienestar y el aprendizaje en desarrollo de la fuerza laboral.",
      story:
        "Inspirada en tradiciones familiares de cultivo y diseñada para el futuro de Youngstown, esta granja une legado, restauración de la tierra, acceso a los alimentos y oportunidad comunitaria.",
      guest:
        "Los visitantes exploran la visión, experimentan la tierra, asisten a eventos y descubren cómo esta granja está restaurando lugar, propósito y posibilidad.",
      customer:
        "Los clientes acceden a alimentos frescos, plántulas, educación para el bienestar y herramientas prácticas que ayudan a las familias a vivir de manera más saludable y autosuficiente.",
      marketplace:
        "El mercado ayuda a las personas a pasar del interés a la acción conectando acceso a alimentos, compras locales y el camino hacia la autosuficiencia.",
      grower:
        "Los productores utilizan planificación, tiempos, colaboración y acceso al mercado para apoyar producción real, operaciones más fuertes e ingresos.",
      valueAdded:
        "Los productores con valor agregado pueden transformar productos crudos en marcas más fuertes, productos empacados, demostraciones y mayores oportunidades locales.",
      youth:
        "Entre en un aula viva y estructurada donde la agricultura, el trabajo en equipo, la responsabilidad y el emprendimiento preparan a los jóvenes para el futuro, con Portal para Padres y apoyo de supervisión integrados.",
      volunteers:
        "Los voluntarios entran en una ruta acogedora de servicio donde pueden apoyar el cultivo, los eventos, la hospitalidad y el aprendizaje compartido.",
      planner:
        "Este
