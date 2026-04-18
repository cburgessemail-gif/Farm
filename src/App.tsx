import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
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
  | "supervisor"
  | "planner"
  | "events"
  | "wellness";

const SCREEN_ORDER: ScreenKey[] = [
  "home",
  "story",
  "guest",
  "customer",
  "marketplace",
  "grower",
  "valueAdded",
  "youth",
  "supervisor",
  "planner",
  "events",
  "wellness",
];

const CANDIDATES = {
  entrance: ["SAM_0220.JPG", "GrowArea.jpg", "large (1).jpg"],
  story: ["SAM_0221.JPG", "GrowArea2.jpg", "large (10).jpg"],
  guest: ["SAM_0222.JPG", "Samaeera1.jpg", "large (11).jpg"],
  customer: ["SAM_0223.JPG", "Samaeera2.jpg", "culinary_edibleflowers.jpeg"],
  marketplace: ["SAM_0225.JPG", "Samaeera3.jpg", "culinary_edibleflowers2.jpeg"],
  grower: ["SAM_0237.JPG", "Samerra4.jpg", "GrowArea.jpg"],
  valueAdded: ["SAM_0238.JPG", "Samerra5.jpg", "culinary_mushrooms.jpeg"],
  youth: ["SAM_0249.JPG", "WolfSpider.jpg", "GrowArea2.jpg"],
  supervisor: ["SAM_0266.JPG", "large (1).jpg", "GrowArea.jpg"],
  planner: ["SAM_0286.JPG", "large (10).jpg", "GrowArea2.jpg"],
  events: ["SAM_0282.JPG", "large (11).jpg", "Samaeera1.jpg"],
  wellness: ["SAM_0281.JPG", "culinary_edibleflowers.jpeg", "Samaeera2.jpg"],
  community: ["SAM_0274.JPG", "Samaeera1.jpg", "GrowArea.jpg"],
  education: ["SAM_0275.JPG", "Samaeera3.jpg", "GrowArea2.jpg"],
  weather: ["SAM_0288.JPG", "large (1).jpg", "GrowArea.jpg"],
  family: ["SAM_0289.JPG", "large (10).jpg", "GrowArea2.jpg"],
  logistics: ["SAM_0290.JPG", "large (11).jpg", "Samerra4.jpg"],
  airport: ["SAM_0291.JPG", "GrowArea.jpg", "WolfSpider.jpg"],
  produce: ["SAM_0293.JPG", "culinary_edibleflowers2.jpeg", "Samaeera2.jpg"],
  volunteers: ["SAM_0305.JPG", "Samaeera1.jpg", "large (1).jpg"],
  training: ["SAM_0307.JPG", "Samerra5.jpg", "large (10).jpg"],
  recipes: ["SAM_0309.JPG", "culinary_mushrooms.jpeg", "Samaeera3.jpg"],
  nutrition: ["SAM_0310.JPG", "culinary_edibleflowers.jpeg", "Samaeera2.jpg"],
  future: ["SAM_0311.JPG", "GrowArea2.jpg", "large (11).jpg"],
  legacy: ["SAM_0313.JPG", "GrowArea.jpg", "Samerra4.jpg"],
};

const tryPaths = (filename: string) => [`/${filename}`, `/public/${filename}`];

type CopyShape = {
  brand: string;
  subbrand: string;
  labels: {
    entrance: string;
    story: string;
    rolePathways: string;
    viewEvents: string;
    healthNutrition: string;
    goMarketplace: string;
    voiceOn: string;
    voiceOff: string;
    guidedTourStart: string;
    guidedTourStop: string;
    cropPlanner: string;
    seasonalConditions: string;
    warmSeasonPlanning: string;
    seasonalBlurb: string;
    farmCalendar: string;
    livingSchedule: string;
    calendarBlurb: string;
    chooseLanguage: string;
    ecosystemOverview: string;
    overviewLead: string;
    rolePathwaysHeading: string;
    rolePathwaysBody: string;
    pathwayDetails: string;
    nextStrongestMoves: string;
    imageGallery: string;
    galleryBlurb: string;
    exploreModules: string;
    designedDestination: string;
    previous: string;
    backToEntrance: string;
    next: string;
    openGallery: string;
    recipesNutrition: string;
    customerPathPriority: string;
    wellnessCluster: string;
    guestExperiences: string;
    vendorMarketFlow: string;
    healthEducation: string;
    enterAsGuest: string;
    communityExperiences: string;
    legacyView: string;
    growerPath: string;
    eventReadiness: string;
    inventoryToMarket: string;
    marketAccess: string;
    demonstrations: string;
    productPresentation: string;
    supervisorSupport: string;
    learningSchedule: string;
    steamTraining: string;
    backToYouth: string;
    scheduling: string;
    supportResources: string;
    foodGuidance: string;
    backToCustomer: string;
    openStore: string;
    coordinationView: string;
    shopFreshFood: string;
    nutritionView: string;
  };
  titles: Record<ScreenKey, string>;
  bodies: Record<ScreenKey, string>;
  sideIntroTitle: string;
  sideIntroBody: string;
  modules: string[];
  roleTiles: {
    guest: { title: string; text: string; next: string[] };
    customer: { title: string; text: string; next: string[] };
    grower: { title: string; text: string; next: string[] };
    valueAdded: { title: string; text: string; next: string[] };
    youth: { title: string; text: string; next: string[] };
    supervisor: { title: string; text: string; next: string[] };
  };
  detailBlocks: Record<ScreenKey, { title: string; text: string }[]>;
};

const COPY: Record<LanguageKey, CopyShape> = {
  en: {
    brand: "Bronson Family Farm",
    subbrand: "Farm & Family Alliance Ecosystem Demo",
    labels: {
      entrance: "Entrance",
      story: "Our Story",
      rolePathways: "Role Pathways",
      viewEvents: "View Events",
      healthNutrition: "Health & Nutrition",
      goMarketplace: "Go to Marketplace",
      voiceOn: "Voice narration on",
      voiceOff: "Voice narration off",
      guidedTourStart: "Start Guided Tour",
      guidedTourStop: "Stop Guided Tour",
      cropPlanner: "Open Crop Planner",
      seasonalConditions: "Seasonal conditions",
      warmSeasonPlanning: "Warm season planning active",
      seasonalBlurb:
        "Field prep, seedling movement, event readiness, and seasonal coordination are active.",
      farmCalendar: "Farm calendar",
      livingSchedule: "Living schedule",
      calendarBlurb:
        "Seedlings, events, education, youth activities, and harvest pathways connect here.",
      chooseLanguage: "Choose language",
      ecosystemOverview: "Living ecosystem overview",
      overviewLead:
        "This living farm ecosystem is designed to help guests, customers, growers, youth, partners, and families move toward food self-sufficiency, economic opportunity, practical wellness, and stronger community connection.",
      rolePathwaysHeading: "Role pathways",
      rolePathwaysBody:
        "Each role should feel welcomed, informed, and able to move forward. These pathways are built to create return visits, not one-time clicks.",
      pathwayDetails: "Pathway details",
      nextStrongestMoves: "Next strongest moves",
      imageGallery: "Image gallery",
      galleryBlurb: "Using the available farm photos and fallbacks.",
      exploreModules: "Explore modules",
      designedDestination: "Designed to feel like a living destination",
      previous: "Previous",
      backToEntrance: "Back to entrance",
      next: "Next",
      openGallery: "Open Gallery",
      recipesNutrition: "Recipes & Nutrition",
      customerPathPriority: "Customer path priority",
      wellnessCluster: "Wellness cluster",
      guestExperiences: "Guest Experiences",
      vendorMarketFlow: "Vendor & Market Flow",
      healthEducation: "Health Education",
      enterAsGuest: "Enter as Guest",
      communityExperiences: "Community Experiences",
      legacyView: "Legacy View",
      growerPath: "Grower Path",
      eventReadiness: "Event Readiness",
      inventoryToMarket: "Inventory to Market",
      marketAccess: "Market Access",
      demonstrations: "Demonstrations",
      productPresentation: "Product Presentation",
      supervisorSupport: "Supervisor Support",
      learningSchedule: "Learning Schedule",
      steamTraining: "STEAM & Training",
      backToYouth: "Back to Youth Workforce",
      scheduling: "Scheduling",
      supportResources: "Support Resources",
      foodGuidance: "Food Guidance",
      backToCustomer: "Back to Customer Path",
      openStore: "Open GrownBy Store",
      coordinationView: "Coordination View",
      shopFreshFood: "Shop Fresh Food",
      nutritionView: "Nutrition View",
    },
    titles: {
      home: "Welcome to the ecosystem",
      story: "The story behind the farm",
      guest: "Guest pathway",
      customer: "Customer pathway",
      marketplace: "Marketplace pathway",
      grower: "Grower pathway",
      valueAdded: "Value-Added Producer pathway",
      youth: "Youth Workforce pathway",
      supervisor: "Supervisor pathway",
      planner: "Crop Planning Center",
      events: "Events and community experiences",
      wellness: "Health, nutrition, and food education",
    },
    bodies: {
      home:
        "You are entering a regenerative farm and community ecosystem where land becomes opportunity, food becomes wellness, learning becomes workforce development, and visitors become participants in something larger.",
      story:
        "Inspired by family farming traditions and shaped for Youngstown’s future, this farm brings together legacy, land restoration, food access, agritourism, and practical community opportunity.",
      guest:
        "Guests explore the vision, experience the land, attend events, and discover how this farm is restoring place, purpose, and possibility.",
      customer:
        "Customers access fresh food, seedlings, wellness education, and practical tools that help families move toward healthier and more self-sufficient living.",
      marketplace:
        "The marketplace helps people move from interest to action by connecting food access, local purchasing, and the larger journey toward self-sufficiency and community resilience.",
      grower:
        "Growers use planning, timing, collaboration, and market access tools that support real production, stronger operations, and income generation.",
      valueAdded:
        "Value-added producers can turn raw products into stronger brands, packaged goods, demonstrations, and expanded local market opportunities.",
      youth:
        "Youth workforce opens a living classroom where agriculture, technology, teamwork, and entrepreneurship prepare young people for future success.",
      supervisor:
        "Supervisor supports youth development through structure, accountability, logistics, wellness guidance, and leadership.",
      planner:
        "This planning center helps transform land, labor, seeds, weather, and timing into real food production, income opportunities, training experiences, and reliable community supply.",
      events:
        "Events bring people back for learning, shopping, demonstrations, relationship-building, and shared community experience.",
      wellness:
        "This pathway helps people connect fresh food with practical wellness, healthier choices, recipes, diabetes awareness, and everyday life.",
    },
    sideIntroTitle: "A place people want to return to",
    sideIntroBody:
      "This living farm ecosystem is designed to help guests, customers, growers, youth, partners, and families move toward food self-sufficiency, economic opportunity, practical wellness, and stronger community connection.",
    modules: [
      "Marketplace through GrownBy",
      "Events and reservation pathways",
      "Crop planning and seasonal guidance",
      "Youth workforce and supervisor support",
      "Nutrition, recipes, and wellness education",
      "Family legacy, agritourism, and community partnerships",
    ],
    roleTiles: {
      guest: {
        title: "Guest",
        text: "Explore the vision, experience the land, attend events, and discover how this farm is restoring place and possibility.",
        next: ["Story", "Events", "Gallery"],
      },
      customer: {
        title: "Customer",
        text: "Access fresh food, seedlings, wellness education, and tools that help families move toward healthier and more self-sufficient living.",
        next: ["Marketplace", "Recipes", "Nutrition"],
      },
      grower: {
        title: "Grower",
        text: "Use planning, timing, collaboration, and market access tools that support real production and income generation.",
        next: ["Planner", "Seasonal Guidance", "Coordination"],
      },
      valueAdded: {
        title: "Value-Added Producer",
        text: "Turn raw products into stronger brands, packaged goods, demonstrations, and expanded market opportunities.",
        next: ["Branding", "Packaging", "Market Access"],
      },
      youth: {
        title: "Youth Workforce",
        text: "Enter a living classroom where agriculture, technology, teamwork, and entrepreneurship prepare young people for future success.",
        next: ["Learning", "STEAM", "Responsibilities"],
      },
      supervisor: {
        title: "Supervisor",
        text: "Support youth development through structure, accountability, logistics, wellness guidance, and leadership.",
        next: ["Scheduling", "Check-In", "Support"],
      },
    },
    detailBlocks: {
      home: [
        {
          title: "Families belong here",
          text: "This ecosystem is designed to feel welcoming, useful, and worth returning to.",
        },
        {
          title: "Marketplace through GrownBy",
          text: "Customers should feel that food access is close by, not hidden.",
        },
        {
          title: "Living ecosystem",
          text: "Growers, youth, supervisors, guests, and producers each have a real pathway.",
        },
      ],
      story: [
        {
          title: "Family legacy",
          text: "The farm carries Bronson and Lorenzana legacy into a future-focused Youngstown vision.",
        },
        {
          title: "Land restoration",
          text: "The project restores land while creating food, education, and agritourism opportunity.",
        },
        {
          title: "Community future",
          text: "This is about more than a site. It is an ecosystem for long-term return and growth.",
        },
      ],
      guest: [
        {
          title: "Clear welcome",
          text: "Guests learn what this place is, why it matters, and where they can go next.",
        },
        {
          title: "Airport relationship",
          text: "Visitors should understand the story of the FAA-approved grow areas and support for the vision.",
        },
        {
          title: "Return value",
          text: "Events, demonstrations, and seasonal change keep people coming back.",
        },
      ],
      customer: [
        {
          title: "Fresh food first",
          text: "Customers should see produce, seedlings, and Bubble Babies with clarity, warmth, and a direct path to purchase.",
        },
        {
          title: "Recipes and nutrition",
          text: "Food guidance, recipe ideas, and healthier living support help customers return for more than shopping.",
        },
        {
          title: "Fast route to GrownBy",
          text: "Many users will want a direct move from interest to marketplace, so this pathway should feel simple and immediate.",
        },
      ],
      marketplace: [
        {
          title: "GrownBy centered",
          text: "The marketplace is a core part of the ecosystem and should feel close at hand.",
        },
        {
          title: "Product pathways",
          text: "Seedlings, produce, and future offerings can be surfaced with strong visual clarity.",
        },
        {
          title: "Return behavior",
          text: "This area can grow into reminders, favorites, and preorder patterns over time.",
        },
      ],
      grower: [
        {
          title: "Planning tools",
          text: "Growers need seasonal timing, inventory awareness, and readiness support.",
        },
        {
          title: "Collaboration",
          text: "The grower pathway should feel connected to a broader ecosystem, not isolated.",
        },
        {
          title: "Practical value",
          text: "This pathway should be useful enough that growers want to revisit it regularly.",
        },
      ],
      valueAdded: [
        {
          title: "From product to presentation",
          text: "This pathway supports stronger local product visibility through branding and experience.",
        },
        {
          title: "Demonstrations",
          text: "Events and market experiences can increase value and customer connection.",
        },
        {
          title: "Shared network",
          text: "The goal is participation in a broader ecosystem of visibility and opportunity.",
        },
      ],
      youth: [
        {
          title: "Living classroom",
          text: "Youth experience agriculture, STEAM, teamwork, and responsibility in real time.",
        },
        {
          title: "Family confidence",
          text: "Families and partners should feel that youth are entering a structured, meaningful environment.",
        },
        {
          title: "Career-connected",
          text: "This pathway supports future roles in farming, media, logistics, business, and entrepreneurship.",
        },
      ],
      supervisor: [
        {
          title: "Inside youth workforce only",
          text: "Supervisor is not separate from youth workforce. It exists to support it.",
        },
        {
          title: "Support resources",
          text: "This can reflect staffing, wellness, and supportive oversight for youth participants.",
        },
        {
          title: "Logistics and accountability",
          text: "Scheduling, check-ins, responsibilities, and day-of support belong here.",
        },
      ],
      planner: [
        {
          title: "Season status",
          text: "Warm season planning is active, with field prep, seedling movement, irrigation thinking, and event readiness underway.",
        },
        {
          title: "Next planting window",
          text: "Upcoming planting windows help align production timing, volunteer coordination, grower activity, and community-facing supply.",
        },
        {
          title: "Harvest and event readiness",
          text: "The planner helps connect crops, staffing, weather, inventory, and event preparation so the ecosystem feels alive and practical.",
        },
      ],
      events: [
        {
          title: "Return engine",
          text: "Events create repeated entry into the ecosystem for learning, shopping, demonstrations, and community connection.",
        },
        {
          title: "Reservations and check-in",
          text: "This space can preview RSVP, organized arrival, and role-based guest flow for future event experiences.",
        },
        {
          title: "Partners and demos",
          text: "Educational partners, sponsor-led demonstrations, and guided experiences help make the farm feel active and worth revisiting.",
        },
      ],
      wellness: [
        {
          title: "Food and health connection",
          text: "Fresh food connects to energy, family habits, diabetes awareness, movement, and overall quality of life.",
        },
        {
          title: "Natural vs processed",
          text: "This section helps explain why food choices matter, especially when rising costs push families toward harmful substitutes.",
        },
        {
          title: "Practical support",
          text: "Nutrition education, recipe ideas, and healthier-at-home guidance should feel useful, simple, and close at hand.",
        },
      ],
    },
  },

  es: {
    brand: "Bronson Family Farm",
    subbrand: "Demostración del Ecosistema de Farm & Family Alliance",
    labels: {
      entrance: "Entrada",
      story: "Nuestra historia",
      rolePathways: "Rutas",
      viewEvents: "Ver eventos",
      healthNutrition: "Salud y nutrición",
      goMarketplace: "Ir al mercado",
      voiceOn: "Narración activada",
      voiceOff: "Narración desactivada",
      guidedTourStart: "Iniciar recorrido guiado",
      guidedTourStop: "Detener recorrido guiado",
      cropPlanner: "Abrir planificador",
      seasonalConditions: "Condiciones estacionales",
      warmSeasonPlanning: "Planificación activa de temporada cálida",
      seasonalBlurb:
        "La preparación del terreno, el movimiento de plántulas y la preparación de eventos están activos.",
      farmCalendar: "Calendario de la finca",
      livingSchedule: "Calendario vivo",
      calendarBlurb:
        "Plántulas, eventos, educación, actividades juveniles y cosecha se conectan aquí.",
      chooseLanguage: "Elegir idioma",
      ecosystemOverview: "Resumen del ecosistema",
      overviewLead:
        "Este ecosistema agrícola vivo está diseñado para ayudar a visitantes, clientes, productores, jóvenes, aliados y familias a avanzar hacia autosuficiencia alimentaria, oportunidad económica, bienestar práctico y conexión comunitaria.",
      rolePathwaysHeading: "Rutas",
      rolePathwaysBody:
        "Cada rol debe sentirse bienvenido, informado y capaz de avanzar. Estas rutas están hechas para que la gente vuelva.",
      pathwayDetails: "Detalles de la ruta",
      nextStrongestMoves: "Siguientes pasos",
      imageGallery: "Galería",
      galleryBlurb: "Usando las fotos disponibles de la finca.",
      exploreModules: "Explorar módulos",
      designedDestination: "Diseñado como un destino vivo",
      previous: "Anterior",
      backToEntrance: "Volver a la entrada",
      next: "Siguiente",
      openGallery: "Abrir galería",
      recipesNutrition: "Recetas y nutrición",
      customerPathPriority: "Prioridad del cliente",
      wellnessCluster: "Grupo de bienestar",
      guestExperiences: "Experiencias del visitante",
      vendorMarketFlow: "Flujo de mercado",
      healthEducation: "Educación en salud",
      enterAsGuest: "Entrar como visitante",
      communityExperiences: "Experiencias comunitarias",
      legacyView: "Vista del legado",
      growerPath: "Ruta del productor",
      eventReadiness: "Preparación para eventos",
      inventoryToMarket: "Inventario al mercado",
      marketAccess: "Acceso al mercado",
      demonstrations: "Demostraciones",
      productPresentation: "Presentación del producto",
      supervisorSupport: "Apoyo del supervisor",
      learningSchedule: "Horario de aprendizaje",
      steamTraining: "STEAM y formación",
      backToYouth: "Volver a juventud",
      scheduling: "Programación",
      supportResources: "Recursos de apoyo",
      foodGuidance: "Guía alimentaria",
      backToCustomer: "Volver al cliente",
      openStore: "Abrir tienda GrownBy",
      coordinationView: "Vista de coordinación",
      shopFreshFood: "Comprar alimentos frescos",
      nutritionView: "Vista de nutrición",
    },
    titles: {
      home: "Bienvenido al ecosistema",
      story: "La historia detrás de la granja",
      guest: "Ruta del visitante",
      customer: "Ruta del cliente",
      marketplace: "Ruta del mercado",
      grower: "Ruta del productor",
      valueAdded: "Ruta del productor con valor agregado",
      youth: "Ruta de fuerza laboral juvenil",
      supervisor: "Ruta del supervisor",
      planner: "Centro de planificación de cultivos",
      events: "Eventos y experiencias comunitarias",
      wellness: "Salud, nutrición y educación alimentaria",
    },
    bodies: {
      home:
        "Está entrando en un ecosistema agrícola y comunitario regenerativo donde la tierra se convierte en oportunidad, la comida en bienestar y el aprendizaje en desarrollo de la fuerza laboral.",
      story:
        "Inspirada en tradiciones familiares de cultivo y diseñada para el futuro de Youngstown, esta granja une legado, restauración de la tierra, acceso a los alimentos y oportunidad comunitaria.",
      guest:
        "Los visitantes exploran la visión, experimentan la tierra, asisten a eventos y descubren cómo esta granja está restaurando lugar, propósito y posibilidad.",
      customer:
        "Los clientes acceden a alimentos frescos, plántulas, educación para el bienestar y herramientas prácticas que ayudan a las familias a vivir de manera más saludable y autosuficiente.",
      marketplace:
        "El mercado ayuda a pasar del interés a la acción conectando acceso a alimentos, compras locales y el camino hacia la autosuficiencia.",
      grower:
        "Los productores utilizan planificación, tiempos, colaboración y acceso al mercado para apoyar producción real, operaciones más fuertes e ingresos.",
      valueAdded:
        "Los productores con valor agregado pueden transformar productos crudos en marcas más fuertes, productos empacados, demostraciones y mayores oportunidades locales.",
      youth:
        "La fuerza laboral juvenil abre un aula viva donde la agricultura, la tecnología, el trabajo en equipo y el emprendimiento preparan a los jóvenes para el éxito futuro.",
      supervisor:
        "El supervisor apoya el desarrollo juvenil mediante estructura, responsabilidad, logística, orientación de bienestar y liderazgo.",
      planner:
        "Este centro de planificación ayuda a transformar tierra, trabajo, semillas, clima y tiempo en producción real de alimentos, oportunidades de ingresos y suministro comunitario confiable.",
      events:
        "Los eventos hacen que las personas regresen para aprender, comprar, ver demostraciones y vivir experiencias comunitarias compartidas.",
      wellness:
        "Esta ruta ayuda a conectar alimentos frescos con bienestar práctico, mejores decisiones, recetas, conciencia sobre la diabetes y la vida cotidiana.",
    },
    sideIntroTitle: "Un lugar al que vale la pena volver",
    sideIntroBody:
      "Este ecosistema agrícola vivo está diseñado para ayudar a visitantes, clientes, productores, jóvenes, aliados y familias a avanzar hacia autosuficiencia alimentaria, oportunidad económica, bienestar práctico y conexión comunitaria.",
    modules: [
      "Mercado a través de GrownBy",
      "Eventos y rutas de reserva",
      "Planificación de cultivos y guía estacional",
      "Juventud y apoyo del supervisor",
      "Nutrición, recetas y bienestar",
      "Legado familiar, agriturismo y alianzas",
    ],
    roleTiles: {
      guest: {
        title: "Visitante",
        text: "Explore la visión, experimente la tierra y descubra cómo la granja está restaurando lugar y posibilidad.",
        next: ["Historia", "Eventos", "Galería"],
      },
      customer: {
        title: "Cliente",
        text: "Acceda a alimentos frescos, plántulas y herramientas que ayudan a las familias a vivir de manera más saludable y autosuficiente.",
        next: ["Mercado", "Recetas", "Nutrición"],
      },
      grower: {
        title: "Productor",
        text: "Use planificación, tiempos, colaboración y acceso al mercado para apoyar producción real e ingresos.",
        next: ["Planificador", "Temporada", "Coordinación"],
      },
      valueAdded: {
        title: "Valor agregado",
        text: "Convierta productos crudos en marcas más fuertes, bienes empacados, demostraciones y mayor oportunidad.",
        next: ["Marca", "Empaque", "Mercado"],
      },
      youth: {
        title: "Juventud",
        text: "Entre a un aula viva donde agricultura, tecnología, trabajo en equipo y emprendimiento preparan a los jóvenes.",
        next: ["Aprendizaje", "STEAM", "Responsabilidades"],
      },
      supervisor: {
        title: "Supervisor",
        text: "Apoye el desarrollo juvenil mediante estructura, responsabilidad, logística y liderazgo.",
        next: ["Horario", "Registro", "Apoyo"],
      },
    },
    detailBlocks: {
      home: [
        { title: "Las familias pertenecen aquí", text: "Este ecosistema está diseñado para sentirse acogedor y útil." },
        { title: "Mercado con GrownBy", text: "El acceso a los alimentos debe sentirse cercano." },
        { title: "Ecosistema vivo", text: "Cada rol tiene una ruta real dentro del sistema." },
      ],
      story: [
        { title: "Legado familiar", text: "La finca lleva el legado Bronson y Lorenzana hacia el futuro." },
        { title: "Restauración de la tierra", text: "La tierra se restaura mientras crea comida, educación y oportunidad." },
        { title: "Futuro comunitario", text: "Esto es más que un sitio; es una visión de crecimiento." },
      ],
      guest: [
        { title: "Bienvenida clara", text: "Los visitantes aprenden qué es este lugar, por qué importa y qué sigue." },
        { title: "Relación con el aeropuerto", text: "La historia de las áreas aprobadas de cultivo forma parte del recorrido." },
        { title: "Razones para volver", text: "Eventos, demostraciones y cambios estacionales invitan al regreso." },
      ],
      customer: [
        { title: "Primero alimentos frescos", text: "Los clientes deben ver productos, plántulas y Bubble Babies con claridad." },
        { title: "Recetas y nutrición", text: "Las ideas prácticas de comida ayudan a volver más allá de la compra." },
        { title: "Ruta rápida a GrownBy", text: "La transición del interés a la compra debe sentirse inmediata." },
      ],
      marketplace: [
        { title: "Centrado en GrownBy", text: "El mercado es una parte central del ecosistema." },
        { title: "Rutas de producto", text: "Plántulas, productos y futuras ofertas pueden verse claramente." },
        { title: "Regreso del cliente", text: "Con el tiempo puede apoyar favoritos y pedidos repetidos." },
      ],
      grower: [
        { title: "Herramientas de planificación", text: "Los productores necesitan tiempos estacionales y preparación." },
        { title: "Colaboración", text: "Esta ruta debe sentirse conectada a un ecosistema más amplio." },
        { title: "Valor práctico", text: "Debe ser lo bastante útil como para querer regresar." },
      ],
      valueAdded: [
        { title: "Del producto a la presentación", text: "La visibilidad local mejora con marca y experiencia." },
        { title: "Demostraciones", text: "Las experiencias de mercado pueden aumentar el valor." },
        { title: "Red compartida", text: "La meta es participar en una red mayor de oportunidad." },
      ],
      youth: [
        { title: "Aula viva", text: "Los jóvenes viven agricultura, STEAM, trabajo en equipo y responsabilidad." },
        { title: "Confianza familiar", text: "Las familias deben sentir una estructura clara y significativa." },
        { title: "Conexión profesional", text: "Apoya futuros roles en agricultura, medios, logística y negocios." },
      ],
      supervisor: [
        { title: "Dentro de juventud", text: "Supervisor no es una ruta separada; existe para apoyar juventud." },
        { title: "Recursos de apoyo", text: "Puede reflejar personal, bienestar y supervisión positiva." },
        { title: "Logística y responsabilidad", text: "Horario, registro y apoyo diario pertenecen aquí." },
      ],
      planner: [
        { title: "Estado de la temporada", text: "La planificación de temporada cálida está activa." },
        { title: "Próxima ventana de siembra", text: "Las próximas ventanas ayudan a alinear producción y coordinación." },
        { title: "Cosecha y eventos", text: "El planificador conecta cultivos, personal, clima e inventario." },
      ],
      events: [
        { title: "Motor de retorno", text: "Los eventos generan entradas repetidas al ecosistema." },
        { title: "Reservas y registro", text: "Puede mostrar RSVP, llegada organizada y flujo de visitantes." },
        { title: "Aliados y demos", text: "Las alianzas y demostraciones hacen sentir viva la granja." },
      ],
      wellness: [
        { title: "Comida y salud", text: "La comida fresca se conecta con energía, hábitos y calidad de vida." },
        { title: "Natural vs procesado", text: "Ayuda a explicar por qué importan las decisiones alimentarias." },
        { title: "Apoyo práctico", text: "Nutrición, recetas y orientación deben sentirse cercanas y simples." },
      ],
    },
  },

  tl: {} as CopyShape,
  it: {} as CopyShape,
  patwa: {} as CopyShape,
  he: {} as CopyShape,
};

// Reuse English structure for remaining languages until their full copy is expanded.
// This still changes visible text for the main screen title/body and labels.
COPY.tl = {
  ...COPY.en,
  subbrand: "Farm & Family Alliance Ecosystem Demo",
  titles: {
    ...COPY.en.titles,
    home: "Maligayang pagdating sa ecosystem",
    story: "Ang kuwento ng bukid",
    guest: "Landas ng bisita",
    customer: "Landas ng customer",
    marketplace: "Landas ng marketplace",
    grower: "Landas ng grower",
    valueAdded: "Landas ng value-added producer",
    youth: "Landas ng youth workforce",
    supervisor: "Landas ng supervisor",
    planner: "Sentro ng crop planning",
    events: "Mga event at karanasang pangkomunidad",
    wellness: "Kalusugan, nutrisyon, at edukasyon sa pagkain",
  },
  bodies: {
    ...COPY.en.bodies,
    home:
      "Pumapasok ka sa isang regenerative farm at community ecosystem kung saan ang lupa ay nagiging oportunidad, ang pagkain ay nagiging wellness, at ang pagkatuto ay nagiging workforce development.",
    story:
      "Hinubog ng tradisyon ng pagsasaka ng pamilya at ng hinaharap ng Youngstown, pinagsasama ng bukid na ito ang pamana, pagpapanumbalik ng lupa, access sa pagkain, at oportunidad sa komunidad.",
    guest:
      "Tinutuklas ng mga bisita ang bisyon, nararanasan ang lupa, dumadalo sa mga event, at nakikita kung paano ibinabalik ng bukid na ito ang lugar, layunin, at posibilidad.",
    customer:
      "Nakakakuha ang mga customer ng sariwang pagkain, seedlings, wellness education, at praktikal na gabay tungo sa mas malusog at mas self-sufficient na pamumuhay.",
    marketplace:
      "Tinutulungan ng marketplace ang mga tao na kumilos mula sa interes tungo sa pagbili habang nakakabit pa rin sa mas malaking ecosystem.",
    grower:
      "Ginagamit ng mga grower ang planning, timing, collaboration, at market access para sa totoong production, mas matatag na operasyon, at income generation.",
    valueAdded:
      "Maaaring gawing mas malalakas na brand, packaged goods, demonstrations, at mas malaking local market opportunity ang mga raw product.",
    youth:
      "Binubuksan ng youth workforce ang isang buhay na classroom kung saan ang agrikultura, teknolohiya, teamwork, at entrepreneurship ay naghahanda sa kabataan para sa tagumpay.",
    supervisor:
      "Sinusuportahan ng supervisor ang youth development sa pamamagitan ng istruktura, accountability, logistics, wellness guidance, at leadership.",
    planner:
      "Tinutulungan ng planning center na ito na gawing totoong food production, income opportunity, training experience, at maaasahang community supply ang lupa, paggawa, buto, panahon, at timing.",
    events:
      "Nagbabalik ang mga tao dahil sa mga event para sa pagkatuto, pamimili, demonstrations, relationship-building, at shared community experience.",
    wellness:
      "Tinutulungan ng pathway na ito ang mga tao na ikonekta ang sariwang pagkain sa praktikal na wellness, mas mabubuting pagpili, recipes, diabetes awareness, at araw-araw na buhay.",
  },
  labels: {
    ...COPY.en.labels,
    entrance: "Pasukan",
    story: "Ating kuwento",
    rolePathways: "Mga landas",
    viewEvents: "Tingnan ang events",
    healthNutrition: "Kalusugan at nutrisyon",
    goMarketplace: "Pumunta sa marketplace",
    voiceOn: "Naka-on ang boses",
    voiceOff: "Naka-off ang boses",
    guidedTourStart: "Simulan ang gabay",
    guidedTourStop: "Itigil ang gabay",
    cropPlanner: "Buksan ang planner",
    chooseLanguage: "Pumili ng wika",
    previous: "Nakaraan",
    backToEntrance: "Bumalik sa pasukan",
    next: "Susunod",
  },
};

COPY.it = {
  ...COPY.en,
  subbrand: "Demo Ecosistema Farm & Family Alliance",
  titles: {
    ...COPY.en.titles,
    home: "Benvenuto nell’ecosistema",
    story: "La storia della fattoria",
    guest: "Percorso ospite",
    customer: "Percorso cliente",
    marketplace: "Percorso marketplace",
    grower: "Percorso coltivatore",
    valueAdded: "Percorso produttore a valore aggiunto",
    youth: "Percorso forza lavoro giovanile",
    supervisor: "Percorso supervisore",
    planner: "Centro di pianificazione delle colture",
    events: "Eventi ed esperienze della comunità",
    wellness: "Salute, nutrizione ed educazione alimentare",
  },
  bodies: {
    ...COPY.en.bodies,
    home:
      "Stai entrando in un ecosistema agricolo e comunitario rigenerativo dove la terra diventa opportunità, il cibo diventa benessere e l'apprendimento diventa sviluppo della forza lavoro.",
    story:
      "Ispirata dalle tradizioni agricole familiari e plasmata per il futuro di Youngstown, questa fattoria unisce eredità, ripristino della terra, accesso al cibo e opportunità comunitarie.",
    guest:
      "Gli ospiti esplorano la visione, vivono la terra, partecipano agli eventi e scoprono come questa fattoria stia restaurando luogo, scopo e possibilità.",
    customer:
      "I clienti accedono a cibo fresco, piantine, educazione al benessere e strumenti pratici che aiutano le famiglie a vivere in modo più sano e autosufficiente.",
    marketplace:
      "Il marketplace aiuta le persone a passare dall'interesse all'azione collegando accesso al cibo, acquisti locali e il percorso verso l'autosufficienza.",
    grower:
      "I coltivatori usano pianificazione, tempi, collaborazione e accesso al mercato per sostenere produzione reale, operazioni più forti e generazione di reddito.",
    valueAdded:
      "I produttori a valore aggiunto possono trasformare prodotti grezzi in marchi più forti, prodotti confezionati, dimostrazioni e maggiori opportunità locali.",
    youth:
      "La forza lavoro giovanile apre una classe viva dove agricoltura, tecnologia, lavoro di squadra e imprenditorialità preparano i giovani al successo futuro.",
    supervisor:
      "Il supervisore sostiene lo sviluppo dei giovani attraverso struttura, responsabilità, logistica, orientamento al benessere e leadership.",
    planner:
      "Questo centro di pianificazione aiuta a trasformare terra, lavoro, semi, meteo e tempi in vera produzione alimentare, opportunità di reddito, esperienze formative e fornitura affidabile alla comunità.",
    events:
      "Gli eventi riportano le persone per imparare, acquistare, vedere dimostrazioni, costruire relazioni e condividere esperienze comunitarie.",
    wellness:
      "Questo percorso aiuta le persone a collegare il cibo fresco al benessere pratico, a scelte migliori, ricette, consapevolezza del diabete e vita quotidiana.",
  },
  labels: {
    ...COPY.en.labels,
    entrance: "Ingresso",
    story: "La nostra storia",
    rolePathways: "Percorsi",
    viewEvents: "Vedi eventi",
    healthNutrition: "Salute e nutrizione",
    goMarketplace: "Vai al marketplace",
    voiceOn: "Voce attiva",
    voiceOff: "Voce disattivata",
    guidedTourStart: "Avvia tour guidato",
    guidedTourStop: "Ferma tour guidato",
    cropPlanner: "Apri pianificatore",
    chooseLanguage: "Scegli lingua",
    previous: "Precedente",
    backToEntrance: "Torna all’ingresso",
    next: "Successivo",
  },
};

COPY.patwa = {
  ...COPY.en,
  titles: {
    ...COPY.en.titles,
    home: "Welcome to di ecosystem",
    story: "Di story behind di farm",
    guest: "Guest pathway",
    customer: "Customer pathway",
    marketplace: "Marketplace pathway",
    grower: "Grower pathway",
    valueAdded: "Value-added producer pathway",
    youth: "Youth workforce pathway",
    supervisor: "Supervisor pathway",
    planner: "Crop planning center",
    events: "Events an community experiences",
    wellness: "Health, nutrition, an food education",
  },
  bodies: {
    ...COPY.en.bodies,
    home:
      "Yuh a step into a regenerative farm an community ecosystem weh turn land into opportunity, food into wellness, an learning into workforce development.",
    story:
      "Inspired by family farming tradition an shaped fi Youngstown future, dis farm bring together legacy, land restoration, food access, an community opportunity.",
    guest:
      "Guests explore di vision, experience di land, join events, an see how dis farm a restore place, purpose, an possibility.",
    customer:
      "Customers get fresh food, seedlings, wellness education, an practical tools fi help families move toward healthier an more self-sufficient living.",
    marketplace:
      "Di marketplace help people move from interest to action by connecting food access, local buying, an di bigger journey toward self-sufficiency.",
    grower:
      "Growers use planning, timing, collaboration, an market access fi support real production, stronger operation, an income generation.",
    valueAdded:
      "Value-added producers can turn raw product into stronger brand, packaged goods, demonstrations, an bigger local market opportunity.",
    youth:
      "Youth workforce open up a living classroom weh agriculture, technology, teamwork, an entrepreneurship prepare young people fi future success.",
    supervisor:
      "Supervisor support youth development through structure, accountability, logistics, wellness guidance, an leadership.",
    planner:
      "Dis planning center help turn land, labor, seeds, weather, an timing into real food production, income opportunity, training experience, an reliable community supply.",
    events:
      "Events bring people back fi learning, shopping, demonstrations, relationship-building, an shared community experience.",
    wellness:
      "Dis pathway help people connect fresh food wid practical wellness, better choices, recipes, diabetes awareness, an everyday life.",
  },
  labels: {
    ...COPY.en.labels,
    entrance: "Entrance",
    story: "Wi Story",
    rolePathways: "Pathways",
    viewEvents: "View Events",
    healthNutrition: "Health an Nutrition",
    goMarketplace: "Go a Marketplace",
    voiceOn: "Voice deh pon",
    voiceOff: "Voice off",
    guidedTourStart: "Start Guided Tour",
    guidedTourStop: "Stop Guided Tour",
    cropPlanner: "Open Crop Planner",
    chooseLanguage: "Choose Language",
    previous: "Previous",
    backToEntrance: "Back a Entrance",
    next: "Next",
  },
};

COPY.he = {
  ...COPY.en,
  subbrand: "הדגמת מערכת Farm & Family Alliance",
  titles: {
    ...COPY.en.titles,
    home: "ברוכים הבאים למערכת",
    story: "הסיפור מאחורי החווה",
    guest: "מסלול אורח",
    customer: "מסלול לקוח",
    marketplace: "מסלול שוק",
    grower: "מסלול מגדל",
    valueAdded: "מסלול יצרן בעל ערך מוסף",
    youth: "מסלול כוח עבודה לנוער",
    supervisor: "מסלול מפקח",
    planner: "מרכז תכנון גידולים",
    events: "אירועים וחוויות קהילתיות",
    wellness: "בריאות, תזונה וחינוך למזון",
  },
  bodies: {
    ...COPY.en.bodies,
    home:
      "אתם נכנסים למערכת חקלאית וקהילתית רגנרטיבית שבה האדמה הופכת להזדמנות, המזון הופך לרווחה והלמידה הופכת לפיתוח כוח עבודה.",
    story:
      "בהשראת מסורות חקלאיות משפחתיות ובעיצוב לעתידה של יאנגסטאון, החווה הזאת מחברת בין מורשת, שיקום הקרקע, גישה למזון והזדמנות קהילתית.",
    guest:
      "אורחים חוקרים את החזון, חווים את האדמה, משתתפים באירועים ומגלים כיצד החווה הזו מחזירה מקום, מטרה ואפשרות.",
    customer:
      "לקוחות מקבלים מזון טרי, שתילים, חינוך לרווחה וכלים מעשיים שעוזרים למשפחות לחיות בצורה בריאה ועצמאית יותר.",
    marketplace:
      "השוק עוזר לאנשים לעבור מעניין לפעולה על ידי חיבור בין גישה למזון, רכישה מקומית והדרך לעצמאות.",
    grower:
      "מגדלים משתמשים בתכנון, תזמון, שיתוף פעולה וגישה לשוק כדי לתמוך בייצור אמיתי, בפעילות חזקה יותר ובהכנסה.",
    valueAdded:
      "יצרנים בעלי ערך מוסף יכולים להפוך מוצרים גולמיים למותגים חזקים יותר, מוצרים ארוזים, הדגמות והזדמנויות מקומיות רחבות יותר.",
    youth:
      "כוח העבודה לנוער פותח כיתה חיה שבה חקלאות, טכנולוגיה, עבודת צוות ויזמות מכינות צעירים להצלחה עתידית.",
    supervisor:
      "המפקח תומך בפיתוח הנוער באמצעות מבנה, אחריות, לוגיסטיקה, הכוונת רווחה ומנהיגות.",
    planner:
      "מרכז התכנון הזה מסייע להפוך אדמה, עבודה, זרעים, מזג אוויר ותזמון לייצור מזון אמיתי, להזדמנויות הכנסה, להכשרה ולאספקה קהילתית אמינה.",
    events:
      "אירועים מחזירים אנשים ללמידה, קניות, הדגמות, בניית קשרים וחוויה קהילתית משותפת.",
    wellness:
      "המסלול הזה עוזר לאנשים לחבר בין מזון טרי לרווחה מעשית, לבחירות טובות יותר, למתכונים, למודעות לסוכרת ולחיי היומיום.",
  },
  labels: {
    ...COPY.en.labels,
    entrance: "כניסה",
    story: "הסיפור שלנו",
    rolePathways: "מסלולים",
    viewEvents: "צפו באירועים",
    healthNutrition: "בריאות ותזונה",
    goMarketplace: "לשוק",
    voiceOn: "קריינות פועלת",
    voiceOff: "קריינות כבויה",
    guidedTourStart: "התחל סיור מודרך",
    guidedTourStop: "עצור סיור מודרך",
    cropPlanner: "פתח תכנון",
    chooseLanguage: "בחר שפה",
    previous: "קודם",
    backToEntrance: "חזרה לכניסה",
    next: "הבא",
  },
};

function useSpeech() {
  const synthRef = useRef<SpeechSynthesis | null>(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const timeoutRef = useRef<number | null>(null);

  const loadVoices = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
    const voices = window.speechSynthesis.getVoices();
    voicesRef.current = voices;
    return voices;
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    loadVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const pickVoice = (lang: LanguageKey) => {
    const voices = voicesRef.current.length ? voicesRef.current : loadVoices();
    const preferred: Record<LanguageKey, string[]> = {
      en: ["en-US", "en"],
      es: ["es-ES", "es-US", "es"],
      tl: ["fil-PH", "tl-PH", "fil", "tl", "en-US"],
      it: ["it-IT", "it"],
      patwa: ["en-JM", "en-US", "en-GB", "en"],
      he: ["he-IL", "he"],
    };
    const wanted = preferred[lang];
    for (const code of wanted) {
      const exact = voices.find((v) => v.lang?.toLowerCase() === code.toLowerCase());
      if (exact) return exact;
    }
    for (const code of wanted) {
      const partial = voices.find((v) =>
        v.lang?.toLowerCase().startsWith(code.slice(0, 2).toLowerCase())
      );
      if (partial) return partial;
    }
    return voices.find((v) => v.lang?.toLowerCase().startsWith("en")) || voices[0] || null;
  };

  const stop = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text: string, lang: LanguageKey) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    stop();
    const utter = new SpeechSynthesisUtterance(text);
    const map: Record<LanguageKey, string> = {
      en: "en-US",
      es: "es-ES",
      tl: "fil-PH",
      it: "it-IT",
      patwa: "en-JM",
      he: "he-IL",
    };
    utter.lang = map[lang];
    utter.rate = 0.95;
    utter.pitch = 1;
    const voice = pickVoice(lang);
    if (voice) utter.voice = voice;

    timeoutRef.current = window.setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }, 180);
  };

  return { speak, stop };
}

function ResilientImage({
  candidates,
  alt,
  style,
}: {
  candidates: string[];
  alt: string;
  style?: React.CSSProperties;
}) {
  const allPaths = useMemo(
    () => candidates.flatMap((f) => tryPaths(f)),
    [candidates]
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [candidates]);

  return (
    <img
      src={allPaths[index]}
      alt={alt}
      style={style}
      onError={() => {
        if (index < allPaths.length - 1) setIndex(index + 1);
      }}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: "100vh",
    background: "#08110d",
    color: "#fff",
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
  hero: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },
  bgImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(0,0,0,0.78), rgba(3,28,18,0.40), rgba(0,0,0,0.84))",
  },
  shell: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1320,
    margin: "0 auto",
    padding: "24px 24px 60px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 30,
  },
  subbrand: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "rgba(255,255,255,0.68)",
  },
  brand: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1.1,
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.28)",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 14,
    backdropFilter: "blur(8px)",
  },
  activePill: {
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.38)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.75fr",
    gap: 26,
    alignItems: "start",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    marginBottom: 16,
  },
  title: {
    fontSize: 62,
    fontWeight: 800,
    lineHeight: 1.04,
    margin: 0,
    maxWidth: 840,
    textShadow: "0 3px 18px rgba(0,0,0,0.25)",
  },
  body: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.9)",
    maxWidth: 860,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 26,
  },
  whiteBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    color: "#0b1712",
    border: "none",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    textDecoration: "none",
  },
  ghostBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(0,0,0,0.25)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "14px 18px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
    marginTop: 28,
  },
  card: {
    borderRadius: 28,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.13)",
    padding: 22,
    backdropFilter: "blur(12px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  sideCard: {
    borderRadius: 32,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.13)",
    padding: 20,
    backdropFilter: "blur(14px)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  miniLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "rgba(255,255,255,0.62)",
    marginBottom: 10,
  },
  section: {
    marginTop: 34,
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 18,
    marginTop: 20,
  },
  roleTile: {
    position: "relative",
    minHeight: 280,
    borderRadius: 30,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.16)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    background: "#0f1714",
  },
  roleImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  roleOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.86), rgba(0,0,0,0.24))",
  },
  roleContent: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.05fr",
    gap: 18,
    marginTop: 20,
  },
  infoBox: {
    borderRadius: 22,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.09)",
    padding: 18,
  },
  detailGrid: {
    display: "grid",
    gap: 14,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  galleryItem: {
    borderRadius: 22,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    background: "#101815",
  },
  galleryImage: {
    width: "100%",
    height: 155,
    objectFit: "cover",
    display: "block",
  },
  footerModuleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
    marginTop: 16,
  },
  moduleBox: {
    borderRadius: 18,
    background: "rgba(0,0,0,0.22)",
    border: "1px solid rgba(255,255,255,0.09)",
    padding: 16,
    lineHeight: 1.55,
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.88)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 24,
  },
  modalImage: {
    maxWidth: "95vw",
    maxHeight: "90vh",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.3)",
  },
  closeBtn: {
    position: "fixed",
    top: 18,
    right: 18,
    width: 44,
    height: 44,
    borderRadius: 999,
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
};

const ICONS = {
  users: <Users size={20} />,
  store: <Store size={20} />,
  leaf: <Leaf size={20} />,
  trees: <Trees size={20} />,
  tractor: <Tractor size={20} />,
  check: <CheckCircle2 size={20} />,
  user: <UserRound size={20} />,
  info: <Info size={20} />,
  basket: <ShoppingBasket size={20} />,
  book: <BookOpen size={20} />,
  calendar: <CalendarDays size={20} />,
  sprout: <Sprout size={20} />,
  briefcase: <Briefcase size={20} />,
  grad: <GraduationCap size={20} />,
  shield: <ShieldCheck size={20} />,
  heart: <HeartPulse size={20} />,
  cloud: <CloudSun size={20} />,
};

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [voiceOn, setVoiceOn] = useState(true);
  const [tourOn, setTourOn] = useState(false);
  const [imageModal, setImageModal] = useState<string[] | null>(null);
  const { speak, stop } = useSpeech();

  const copy = COPY[language] || COPY.en;

  const screenCandidates: Record<ScreenKey, string[]> = {
    home: CANDIDATES.entrance,
    story: CANDIDATES.story,
    guest: CANDIDATES.guest,
    customer: CANDIDATES.customer,
    marketplace: CANDIDATES.marketplace,
    grower: CANDIDATES.grower,
    valueAdded: CANDIDATES.valueAdded,
    youth: CANDIDATES.youth,
    supervisor: CANDIDATES.supervisor,
    planner: CANDIDATES.planner,
    events: CANDIDATES.events,
    wellness: CANDIDATES.wellness,
  };

  const currentIndex = SCREEN_ORDER.indexOf(screen);

  const gallery = useMemo(
    () => [
      CANDIDATES.community,
      CANDIDATES.education,
      CANDIDATES.nutrition,
      CANDIDATES.recipes,
      CANDIDATES.volunteers,
      CANDIDATES.training,
      CANDIDATES.produce,
      CANDIDATES.family,
      CANDIDATES.airport,
      CANDIDATES.future,
      CANDIDATES.legacy,
      CANDIDATES.logistics,
    ],
    []
  );

  useEffect(() => {
    stop();
    if (!voiceOn) return;
    speak(copy.bodies[screen], language);
    return () => stop();
  }, [screen, language, voiceOn]);

  useEffect(() => {
    if (!tourOn) return;
    const id = setInterval(() => {
      setScreen((prev) => {
        const i = SCREEN_ORDER.indexOf(prev);
        return SCREEN_ORDER[(i + 1) % SCREEN_ORDER.length];
      });
    }, 9000);
    return () => clearInterval(id);
  }, [tourOn]);

  const goto = (next: ScreenKey) => {
    setTourOn(false);
    setScreen(next);
  };

  const nextScreen = () =>
    goto(SCREEN_ORDER[(currentIndex + 1) % SCREEN_ORDER.length]);
  const prevScreen = () =>
    goto(SCREEN_ORDER[(currentIndex - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length]);

  const roleTiles = [
    { key: "guest" as ScreenKey, image: CANDIDATES.guest, data: copy.roleTiles.guest },
    { key: "customer" as ScreenKey, image: CANDIDATES.customer, data: copy.roleTiles.customer },
    { key: "grower" as ScreenKey, image: CANDIDATES.grower, data: copy.roleTiles.grower },
    { key: "valueAdded" as ScreenKey, image: CANDIDATES.valueAdded, data: copy.roleTiles.valueAdded },
    { key: "youth" as ScreenKey, image: CANDIDATES.youth, data: copy.roleTiles.youth },
    { key: "supervisor" as ScreenKey, image: CANDIDATES.supervisor, data: copy.roleTiles.supervisor },
  ];

  const detailIcons: Record<ScreenKey, React.ReactNode[]> = {
    home: [ICONS.users, ICONS.store, ICONS.leaf],
    story: [ICONS.trees, ICONS.tractor, ICONS.check],
    guest: [ICONS.user, ICONS.info, ICONS.check],
    customer: [ICONS.basket, ICONS.book, ICONS.store],
    marketplace: [ICONS.store, ICONS.leaf, ICONS.heart],
    grower: [ICONS.calendar, ICONS.sprout, ICONS.check],
    valueAdded: [ICONS.briefcase, ICONS.store, ICONS.users],
    youth: [ICONS.grad, ICONS.users, ICONS.check],
    supervisor: [ICONS.shield, ICONS.heart, ICONS.check],
    planner: [ICONS.calendar, ICONS.sprout, ICONS.cloud],
    events: [ICONS.users, ICONS.calendar, ICONS.check],
    wellness: [ICONS.heart, ICONS.leaf, ICONS.book],
  };

  return (
    <div style={styles.app} dir={language === "he" ? "rtl" : "ltr"}>
      <div style={styles.hero}>
        <ResilientImage
          candidates={screenCandidates[screen]}
          alt={copy.titles[screen]}
          style={styles.bgImage}
        />
        <div style={styles.bgOverlay} />

        <div style={styles.shell}>
          <div style={styles.topbar}>
            <div>
              <div style={styles.subbrand}>{copy.subbrand}</div>
              <div style={styles.brand}>{copy.brand}</div>
            </div>

            <div style={styles.nav}>
              {[
                ["home", <Home size={16} />, copy.labels.entrance],
                ["story", <Info size={16} />, copy.labels.story],
                ["guest", <Users size={16} />, copy.labels.rolePathways],
                ["events", <CalendarDays size={16} />, copy.labels.viewEvents],
                ["wellness", <HeartPulse size={16} />, copy.labels.healthNutrition],
                ["marketplace", <Store size={16} />, copy.labels.goMarketplace],
              ].map(([key, icon, label]) => (
                <button
                  key={String(key)}
                  onClick={() => goto(key as ScreenKey)}
                  style={{
                    ...styles.pill,
                    ...(screen === key ? styles.activePill : {}),
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}

              <button
                onClick={() => {
                  stop();
                  setVoiceOn((v) => !v);
                }}
                style={styles.pill}
              >
                <Mic size={16} />
                {voiceOn ? copy.labels.voiceOn : copy.labels.voiceOff}
              </button>
            </div>
          </div>

          <div style={styles.layout}>
            <div>
              <div style={styles.badge}>
                <Leaf size={16} /> {copy.titles[screen]}
              </div>

              <h1 style={styles.title}>{copy.titles[screen]}</h1>
              <div style={styles.body}>{copy.bodies[screen]}</div>

              <div style={styles.actions}>
                <button
                  style={styles.whiteBtn}
                  onClick={() => {
                    stop();
                    setTourOn((v) => !v);
                  }}
                >
                  <Play size={16} />
                  {tourOn ? copy.labels.guidedTourStop : copy.labels.guidedTourStart}
                </button>

                <button
                  style={styles.ghostBtn}
                  onClick={() => goto("marketplace")}
                >
                  <Store size={16} />
                  {copy.labels.goMarketplace}
                </button>

                <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                  <CalendarDays size={16} />
                  {copy.labels.cropPlanner}
                </button>
              </div>

              <div style={styles.statGrid}>
                <div style={styles.card}>
                  <div style={styles.miniLabel}>{copy.labels.seasonalConditions}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CloudSun size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    {copy.labels.warmSeasonPlanning}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                    {copy.labels.seasonalBlurb}
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>{copy.labels.farmCalendar}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    <CalendarDays size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    {copy.labels.livingSchedule}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                    {copy.labels.calendarBlurb}
                  </div>
                </div>

                <div style={styles.card}>
                  <div style={styles.miniLabel}>{copy.labels.chooseLanguage}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                    <Languages size={18} style={{ verticalAlign: "middle", marginRight: 8 }} />
                    {{
                      en: "English",
                      es: "Español",
                      tl: "Tagalog",
                      it: "Italiano",
                      patwa: "Patwa",
                      he: "Hebrew",
                    }[language]}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(["en", "es", "tl", "it", "patwa", "he"] as LanguageKey[]).map(
                      (lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            stop();
                            setLanguage(lang);
                          }}
                          style={{
                            ...styles.pill,
                            padding: "8px 12px",
                            fontSize: 13,
                            ...(language === lang ? styles.activePill : {}),
                          }}
                        >
                          {{
                            en: "English",
                            es: "Español",
                            tl: "Tagalog",
                            it: "Italiano",
                            patwa: "Patwa",
                            he: "Hebrew",
                          }[lang]}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sideCard}>
              <div style={styles.miniLabel}>{copy.sideIntroTitle}</div>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                {copy.labels.ecosystemOverview}
              </div>
              <div
                style={{
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.88)",
                  marginBottom: 18,
                }}
              >
                {copy.sideIntroBody}
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {copy.detailBlocks[screen].map((item, idx) => (
                  <div key={item.title} style={styles.infoBox}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      {detailIcons[screen][idx]}
                      {item.title}
                    </div>
                    <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.84)" }}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {screen === "home" && (
            <div style={styles.section}>
              <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>
                {copy.labels.rolePathwaysHeading}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.7,
                  maxWidth: 900,
                  marginBottom: 18,
                }}
              >
                {copy.labels.rolePathwaysBody}
              </div>

              <div style={styles.roleGrid}>
                {roleTiles.map((role) => (
                  <button
                    key={role.data.title}
                    onClick={() => goto(role.key)}
                    style={styles.roleTile}
                  >
                    <ResilientImage
                      candidates={role.image}
                      alt={role.data.title}
                      style={styles.roleImage}
                    />
                    <div style={styles.roleOverlay} />
                    <div style={styles.roleContent}>
                      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
                        {role.data.title}
                      </div>
                      <div
                        style={{
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.9)",
                          marginBottom: 12,
                        }}
                      >
                        {role.data.text}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {role.data.next.map((item) => (
                          <span
                            key={item}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "7px 11px",
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.14)",
                              border: "1px solid rgba(255,255,255,0.16)",
                              fontSize: 12,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen !== "home" && (
            <div style={styles.section}>
              <div style={styles.twoCol}>
                <div style={styles.sideCard}>
                  <div style={styles.miniLabel}>{copy.labels.pathwayDetails}</div>
                  <div style={styles.detailGrid}>
                    {copy.detailBlocks[screen].map((item, idx) => (
                      <div key={item.title} style={styles.infoBox}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 8,
                          }}
                        >
                          {detailIcons[screen][idx]}
                          {item.title}
                        </div>
                        <div style={{ lineHeight: 1.65, color: "rgba(255,255,255,0.84)" }}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.sideCard}>
                  <div style={styles.miniLabel}>{copy.labels.nextStrongestMoves}</div>
                  <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                    {screen === "guest" && (
                      <>
                        <button style={styles.ghostBtn} onClick={() => goto("story")}>
                          {copy.labels.story}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          {copy.labels.viewEvents}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.community)}
                        >
                          {copy.labels.openGallery}
                        </button>
                      </>
                    )}

                    {screen === "customer" && (
                      <>
                        <button
                          style={{ ...styles.whiteBtn, justifyContent: "center" }}
                          onClick={() => goto("marketplace")}
                        >
                          {copy.labels.goMarketplace}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          {copy.labels.recipesNutrition}
                        </button>
                        <div style={styles.infoBox}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            {copy.labels.customerPathPriority}
                          </div>
                          <div
                            style={{
                              lineHeight: 1.65,
                              color: "rgba(255,255,255,0.84)",
                              marginBottom: 10,
                            }}
                          >
                            {language === "es"
                              ? "Esta ruta está diseñada para llevar a las personas rápidamente a GrownBy y luego traerlas de vuelta a orientación sobre alimentos frescos, mejores decisiones y visitas repetidas."
                              : language === "tl"
                              ? "Ang landas na ito ay dinisenyo upang mabilis na dalhin ang mga tao sa GrownBy at ibalik sila para sa gabay sa sariwang pagkain, mas mabubuting pagpili, at paulit-ulit na pagbisita."
                              : language === "it"
                              ? "Questo percorso è progettato per portare rapidamente le persone a GrownBy e poi riportarle per guida sul cibo fresco, scelte migliori e visite ripetute."
                              : language === "patwa"
                              ? "Dis pathway build fi move people quick to GrownBy, den bring dem back fi fresh food guidance, better choices, an return visits."
                              : language === "he"
                              ? "המסלול הזה בנוי כדי להעביר אנשים במהירות אל GrownBy ואז להחזיר אותם להכוונה על מזון טרי, בחירות טובות יותר וביקורים חוזרים."
                              : "This pathway is designed to move people quickly toward GrownBy, then bring them back for fresh food guidance, healthier choices, and repeat visits."}
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {(language === "es"
                              ? ["Comida fresca", "Plántulas", "Bubble Babies", "Recetas", "Nutrición"]
                              : language === "tl"
                              ? ["Sariwang Pagkain", "Seedlings", "Bubble Babies", "Recipes", "Nutrition"]
                              : language === "it"
                              ? ["Cibo Fresco", "Piantine", "Bubble Babies", "Ricette", "Nutrizione"]
                              : language === "patwa"
                              ? ["Fresh Food", "Seedlings", "Bubble Babies", "Recipes", "Nutrition"]
                              : language === "he"
                              ? ["מזון טרי", "שתילים", "Bubble Babies", "מתכונים", "תזונה"]
                              : ["Fresh Food", "Seedlings", "Bubble Babies", "Recipes", "Nutrition"]
                            ).map((item) => (
                              <span
                                key={item}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "7px 11px",
                                  borderRadius: 999,
                                  background: "rgba(255,255,255,0.14)",
                                  border: "1px solid rgba(255,255,255,0.16)",
                                  fontSize: 12,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {screen === "marketplace" && (
                      <>
                        <a
                          href="https://grownby.com/farms/bronson-family-farm/shop"
                          target="_blank"
                          rel="noreferrer"
                          style={{ ...styles.whiteBtn, justifyContent: "center" }}
                        >
                          {copy.labels.openStore}
                        </a>
                        <button style={styles.ghostBtn} onClick={() => goto("customer")}>
                          {copy.labels.backToCustomer}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          {copy.labels.foodGuidance}
                        </button>
                      </>
                    )}

                    {screen === "grower" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("planner")}>
                          {copy.labels.cropPlanner}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          {copy.labels.viewEvents}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.training)}
                        >
                          {copy.labels.coordinationView}
                        </button>
                      </>
                    )}

                    {screen === "valueAdded" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("events")}>
                          {copy.labels.demonstrations}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          {copy.labels.marketAccess}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.produce)}
                        >
                          {copy.labels.productPresentation}
                        </button>
                      </>
                    )}

                    {screen === "youth" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("supervisor")}>
                          {copy.labels.supervisorSupport}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                          {copy.labels.learningSchedule}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.training)}
                        >
                          {copy.labels.steamTraining}
                        </button>
                      </>
                    )}

                    {screen === "supervisor" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("youth")}>
                          {copy.labels.backToYouth}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("planner")}>
                          {copy.labels.scheduling}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          {copy.labels.supportResources}
                        </button>
                      </>
                    )}

                    {screen === "story" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>
                          {copy.labels.enterAsGuest}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          {copy.labels.communityExperiences}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.legacy)}
                        >
                          {copy.labels.legacyView}
                        </button>
                      </>
                    )}

                    {screen === "planner" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("grower")}>
                          {copy.labels.growerPath}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("events")}>
                          {copy.labels.eventReadiness}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          {copy.labels.inventoryToMarket}
                        </button>
                      </>
                    )}

                    {screen === "events" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("guest")}>
                          {copy.labels.guestExperiences}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          {copy.labels.vendorMarketFlow}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("wellness")}>
                          {copy.labels.healthEducation}
                        </button>
                      </>
                    )}

                    {screen === "wellness" && (
                      <>
                        <button style={styles.whiteBtn} onClick={() => goto("customer")}>
                          {language === "es"
                            ? "Ruta de comida del cliente"
                            : language === "tl"
                            ? "Landas ng pagkain ng customer"
                            : language === "it"
                            ? "Percorso cibo cliente"
                            : language === "patwa"
                            ? "Customer food path"
                            : language === "he"
                            ? "מסלול מזון ללקוח"
                            : "Customer Food Path"}
                        </button>
                        <button style={styles.ghostBtn} onClick={() => goto("marketplace")}>
                          {copy.labels.shopFreshFood}
                        </button>
                        <button
                          style={styles.ghostBtn}
                          onClick={() => setImageModal(CANDIDATES.nutrition)}
                        >
                          {copy.labels.nutritionView}
                        </button>
                        <div style={styles.infoBox}>
                          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                            {copy.labels.wellnessCluster}
                          </div>
                          <div
                            style={{
                              lineHeight: 1.65,
                              color: "rgba(255,255,255,0.84)",
                              marginBottom: 10,
                            }}
                          >
                            {language === "es"
                              ? "Esta área ayuda a conectar el acceso a alimentos con recetas simples, conciencia sobre la diabetes, mejores decisiones y bienestar diario."
                              : language === "tl"
                              ? "Tinutulungan ng bahaging ito na ikonekta ang food access sa simpleng recipes, diabetes awareness, mas mabubuting pagpili, at araw-araw na wellness."
                              : language === "it"
                              ? "Quest’area aiuta a collegare l’accesso al cibo con ricette semplici, consapevolezza del diabete, scelte migliori e benessere quotidiano."
                              : language === "patwa"
                              ? "Dis area help people connect food access wid simple recipes, diabetes awareness, better choices, an everyday wellness."
                              : language === "he"
                              ? "האזור הזה עוזר לחבר בין גישה למזון לבין מתכונים פשוטים, מודעות לסוכרת, בחירות טובות יותר ורווחה יומיומית."
                              : "This area should help people connect food access with simple recipes, diabetes awareness, better choices, and everyday wellness."}
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {(language === "es"
                              ? ["Opciones frescas", "Recetas", "Nutrición", "Diabetes", "Más sano en casa"]
                              : language === "tl"
                              ? ["Fresh Choices", "Recipes", "Nutrition", "Diabetes Awareness", "Healthier at Home"]
                              : language === "it"
                              ? ["Scelte Fresche", "Ricette", "Nutrizione", "Diabete", "Più Sani a Casa"]
                              : language === "patwa"
                              ? ["Fresh Choices", "Recipes", "Nutrition", "Diabetes Awareness", "Healthier at Home"]
                              : language === "he"
                              ? ["בחירות טריות", "מתכונים", "תזונה", "מודעות לסוכרת", "בריא יותר בבית"]
                              : ["Fresh Choices", "Recipes", "Nutrition", "Diabetes Awareness", "Healthier at Home"]
                            ).map((item) => (
                              <span
                                key={item}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  padding: "7px 11px",
                                  borderRadius: 999,
                                  background: "rgba(255,255,255,0.14)",
                                  border: "1px solid rgba(255,255,255,0.16)",
                                  fontSize: 12,
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={styles.miniLabel}>{copy.labels.imageGallery}</div>
                  <div style={{ marginBottom: 14, color: "rgba(255,255,255,0.82)" }}>
                    {copy.labels.galleryBlurb}
                  </div>
                  <div style={styles.galleryGrid}>
                    {gallery.map((item, idx) => (
                      <button
                        key={idx}
                        style={styles.galleryItem}
                        onClick={() => setImageModal(item)}
                      >
                        <ResilientImage
                          candidates={item}
                          alt={`Farm ${idx + 1}`}
                          style={styles.galleryImage}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sideCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={styles.miniLabel}>{copy.labels.exploreModules}</div>
                  <div style={{ fontSize: 28, fontWeight: 800 }}>
                    {copy.labels.designedDestination}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button style={styles.ghostBtn} onClick={prevScreen}>
                    <ArrowLeft size={16} />
                    {copy.labels.previous}
                  </button>
                  <button style={styles.ghostBtn} onClick={() => goto("home")}>
                    <Home size={16} />
                    {copy.labels.backToEntrance}
                  </button>
                  <button style={styles.whiteBtn} onClick={nextScreen}>
                    <ArrowRight size={16} />
                    {copy.labels.next}
                  </button>
                </div>
              </div>

              <div style={styles.footerModuleGrid}>
                {copy.modules.map((item) => (
                  <div key={item} style={styles.moduleBox}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageModal && (
        <div style={styles.modal}>
          <button style={styles.closeBtn} onClick={() => setImageModal(null)}>
            <X size={20} />
          </button>
          <ResilientImage
            candidates={imageModal}
            alt="Expanded farm view"
            style={styles.modalImage}
          />
        </div>
      )}
    </div>
  );
}
