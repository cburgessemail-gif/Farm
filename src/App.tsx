import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey = "entrance" | "role" | "marketplace" | "tour";
type RoleKey = "guest" | "customer" | "grower" | "producer" | "youth" | "admin";
type YouthView = "overview" | "parent" | "supervisor";

type RoleCard = {
  key: RoleKey;
  image: string;
  fallbackIcon: string;
};

type LangPack = {
  languageName: string;
  dir: "ltr" | "rtl";
  appTitle: string;
  appSubtitle: string;
  heroKicker: string;
  enterDemo: string;
  guidedDemo: string;
  stopGuidedDemo: string;
  exploreRoles: string;
  backToEntrance: string;
  openMarketplace: string;
  returnToRoles: string;
  localTime: string;
  seasonPulse: string;
  placeBased: string;
  welcomeHeadline: string;
  welcomeBody: string;
  missionLabel: string;
  missionText: string;
  chooseLanguage: string;
  choosePathway: string;
  pathwayHint: string;
  livePanelTitle: string;
  livePanelText: string;
  impactTitle: string;
  impactCards: string[];
  roleTitle: string;
  roleIntroLabel: string;
  roleActionsLabel: string;
  roleOutcomesLabel: string;
  customerMarketplaceHint: string;
  youthModesLabel: string;
  youthOverview: string;
  youthParent: string;
  youthSupervisor: string;
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  marketplaceBlocks: { title: string; body: string }[];
  storyTitle: string;
  storyBody: string;
  footerLine: string;
  guidedSteps: string[];
  roleContent: Record<
    RoleKey,
    {
      title: string;
      intro: string;
      actions: string[];
      outcomes: string[];
      cta: string;
    }
  >;
  youthContent: {
    overview: {
      title: string;
      body: string;
      bullets: string[];
    };
    parent: {
      title: string;
      body: string;
      bullets: string[];
    };
    supervisor: {
      title: string;
      body: string;
      bullets: string[];
    };
  };
};

const roleCards: RoleCard[] = [
  { key: "guest", image: "/FarmEntrance.jpg", fallbackIcon: "🌿" },
  { key: "customer", image: "/FreshFood.jpg", fallbackIcon: "🥬" },
  { key: "grower", image: "/GrowArea.jpg", fallbackIcon: "🌱" },
  { key: "producer", image: "/CommunityGathering.jpg", fallbackIcon: "🧺" },
  { key: "youth", image: "/YouthWorkforce.jpg", fallbackIcon: "🚜" },
  { key: "admin", image: "/Marketplace.jpg", fallbackIcon: "📊" },
];

const fallbackGradients = [
  "from-emerald-950 via-emerald-800 to-lime-700",
  "from-slate-950 via-emerald-900 to-teal-700",
  "from-zinc-950 via-stone-800 to-amber-700",
  "from-green-950 via-green-800 to-emerald-600",
  "from-sky-950 via-teal-900 to-green-700",
  "from-neutral-950 via-emerald-900 to-yellow-700",
];

const translations: Record<LanguageKey, LangPack> = {
  en: {
    languageName: "English",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "A place-based family, food, wellness, and opportunity system",
    heroKicker: "A living demo experience",
    enterDemo: "Enter Live Demo",
    guidedDemo: "Start Guided Tour",
    stopGuidedDemo: "Stop Guided Tour",
    exploreRoles: "Explore Pathways",
    backToEntrance: "Back to Entrance",
    openMarketplace: "Enter Marketplace",
    returnToRoles: "Back to Roles",
    localTime: "Local Time",
    seasonPulse: "Season Pulse",
    placeBased: "Place-Based System",
    welcomeHeadline: "More than a farm. A living system rooted in land, family, food, and future.",
    welcomeBody:
      "Bronson Family Farm brings together visitors, customers, growers, youth, producers, and partners in one place where relationships create outcomes.",
    missionLabel: "What this place does",
    missionText:
      "It grows food, develops people, strengthens families, restores land, creates opportunity, and shows how one location can activate an entire ecosystem.",
    chooseLanguage: "Choose language",
    choosePathway: "Choose a pathway",
    pathwayHint: "Each pathway reveals a different experience inside the ecosystem.",
    livePanelTitle: "Today on the Farm",
    livePanelText:
      "Explore role-based pathways, guided narration, seasonal planning, marketplace access, and youth workforce features in one continuous experience.",
    impactTitle: "What Bronson Family Farm produces",
    impactCards: [
      "Fresh food and healthier choices",
      "Youth workforce pathways",
      "Family connection and wellness",
      "Grower and vendor opportunity",
    ],
    roleTitle: "Role Experience",
    roleIntroLabel: "Purpose",
    roleActionsLabel: "What this role can do",
    roleOutcomesLabel: "What this role gains",
    customerMarketplaceHint: "Customers can move directly into the marketplace for produce, education, recipes, and purchasing pathways.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Youth Experience",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    marketplaceTitle: "Marketplace Experience",
    marketplaceSubtitle: "Food access, education, discovery, and purchasing pathways meet here.",
    marketplaceBlocks: [
      {
        title: "Shop & Reserve",
        body: "Browse fresh produce, seedlings, and value-added goods with pathways for pickup, events, and future digital ordering.",
      },
      {
        title: "Food Education",
        body: "Move from buying food to understanding it through nutrition guidance, recipe ideas, and seasonal use inspiration.",
      },
      {
        title: "Grow with Us",
        body: "Customers can become volunteers, supporters, event participants, or future growers inside the wider ecosystem.",
      },
    ],
    storyTitle: "Why this matters",
    storyBody:
      "The farm is the platform. The place itself creates food, belonging, visibility, skill-building, healing, and long-term community value.",
    footerLine: "Bronson Family Farm is not simply growing crops. It is growing community.",
    guidedSteps: [
      "Welcome to Bronson Family Farm, a place-based system where land, relationships, food, and opportunity work together.",
      "Guests experience the story, atmosphere, and mission of the farm as an entry point into the ecosystem.",
      "Customers move from interest to access through fresh food, nutrition education, recipes, and marketplace pathways.",
      "Growers use the ecosystem for planning, production, learning, and shared opportunity.",
      "Youth workforce participants engage hands-on learning, skill-building, and support structures connected to real work.",
      "The marketplace connects products, education, and community participation in one continuous experience.",
    ],
    roleContent: {
      guest: {
        title: "Guest Pathway",
        intro:
          "The guest pathway welcomes visitors into the story, place, and purpose of Bronson Family Farm.",
        actions: [
          "Discover the mission and legacy of the farm",
          "Explore events, story points, and seasonal experiences",
          "Move from curiosity into deeper engagement",
        ],
        outcomes: [
          "A clear understanding of the farm’s purpose",
          "Emotional connection to the land and vision",
          "A simple next step into another pathway",
        ],
        cta: "Enter as Guest",
      },
      customer: {
        title: "Customer Pathway",
        intro:
          "The customer pathway turns food access into a richer experience of nourishment, education, and ongoing participation.",
        actions: [
          "View produce, seedlings, and market offerings",
          "Learn about food, recipes, and nutrition",
          "Move directly into the marketplace",
        ],
        outcomes: [
          "Healthier food choices",
          "Stronger trust and buying habits",
          "A clear route to repeat engagement",
        ],
        cta: "Open Customer Experience",
      },
      grower: {
        title: "Grower Pathway",
        intro:
          "The grower pathway supports planning, production, learning, and connection inside a shared agricultural ecosystem.",
        actions: [
          "Review growing priorities and seasonal rhythm",
          "Access role-based planning and production ideas",
          "Connect with the wider farm ecosystem",
        ],
        outcomes: [
          "Clearer growing direction",
          "Stronger connection to opportunity",
          "Shared knowledge and confidence",
        ],
        cta: "Open Grower Experience",
      },
      producer: {
        title: "Value-Added Producer Pathway",
        intro:
          "This pathway supports makers, vendors, and processors who help turn farm products into broader community value.",
        actions: [
          "Explore event and market participation",
          "Connect products to storytelling and visibility",
          "Engage opportunities for collaboration",
        ],
        outcomes: [
          "Expanded visibility",
          "Market connection",
          "A stronger role inside the ecosystem",
        ],
        cta: "Open Producer Experience",
      },
      youth: {
        title: "Youth Workforce Pathway",
        intro:
          "This pathway connects young people to work, skill-building, mentorship, and support through hands-on farm experience.",
        actions: [
          "View youth learning experiences",
          "See parent support features",
          "See supervisor-only support structures",
        ],
        outcomes: [
          "Confidence and work readiness",
          "Family engagement",
          "A supported pathway into responsibility",
        ],
        cta: "Open Youth Workforce",
      },
      admin: {
        title: "Administrator Pathway",
        intro:
          "This pathway reflects the leadership view of operations, partnerships, engagement, and place-based impact.",
        actions: [
          "Track ecosystem activity and visibility",
          "See pathways across roles and experiences",
          "Support continuity, stewardship, and growth",
        ],
        outcomes: [
          "Operational clarity",
          "Stronger coordination",
          "A clearer picture of whole-system impact",
        ],
        cta: "Open Leadership View",
      },
    },
    youthContent: {
      overview: {
        title: "Youth Experience",
        body:
          "Young people experience structured, real-world learning in a setting that connects work, nature, discipline, creativity, and community.",
        bullets: [
          "Hands-on learning and farm responsibility",
          "Confidence building through visible contribution",
          "Exposure to teamwork, markets, and opportunity",
        ],
      },
      parent: {
        title: "Parent Portal",
        body:
          "Parents can understand the pathway, see the value of participation, and connect with support structures surrounding youth growth.",
        bullets: [
          "Clear communication about expectations",
          "Family connection to progress and opportunity",
          "A stronger bridge between home and program",
        ],
      },
      supervisor: {
        title: "Supervisor View",
        body:
          "The supervisor view exists only inside the youth workforce experience and supports staffing, accountability, and resource alignment.",
        bullets: [
          "Role-based oversight and support",
          "Progress awareness and intervention planning",
          "Coordination with support resources as needed",
        ],
      },
    },
  },
  es: {
    languageName: "Español",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Un sistema basado en lugar para familia, alimentos, bienestar y oportunidad",
    heroKicker: "Una experiencia demo viva",
    enterDemo: "Entrar al Demo",
    guidedDemo: "Iniciar Recorrido Guiado",
    stopGuidedDemo: "Detener Recorrido Guiado",
    exploreRoles: "Explorar Rutas",
    backToEntrance: "Volver a la Entrada",
    openMarketplace: "Entrar al Mercado",
    returnToRoles: "Volver a Roles",
    localTime: "Hora Local",
    seasonPulse: "Pulso de la Temporada",
    placeBased: "Sistema Basado en Lugar",
    welcomeHeadline: "Más que una finca. Un sistema vivo arraigado en tierra, familia, comida y futuro.",
    welcomeBody:
      "Bronson Family Farm une visitantes, clientes, productores, jóvenes, elaboradores y aliados en un solo lugar donde las relaciones producen resultados.",
    missionLabel: "Lo que hace este lugar",
    missionText:
      "Cultiva alimentos, desarrolla personas, fortalece familias, restaura tierra, crea oportunidad y demuestra cómo un solo lugar puede activar todo un ecosistema.",
    chooseLanguage: "Elegir idioma",
    choosePathway: "Elegir una ruta",
    pathwayHint: "Cada ruta revela una experiencia diferente dentro del ecosistema.",
    livePanelTitle: "Hoy en la Finca",
    livePanelText:
      "Explora rutas por rol, narración guiada, planificación estacional, acceso al mercado y funciones para la fuerza laboral juvenil.",
    impactTitle: "Lo que produce Bronson Family Farm",
    impactCards: [
      "Alimentos frescos y opciones más sanas",
      "Rutas laborales para jóvenes",
      "Conexión familiar y bienestar",
      "Oportunidad para productores y vendedores",
    ],
    roleTitle: "Experiencia por Rol",
    roleIntroLabel: "Propósito",
    roleActionsLabel: "Lo que este rol puede hacer",
    roleOutcomesLabel: "Lo que este rol obtiene",
    customerMarketplaceHint: "Los clientes pueden entrar directamente al mercado para productos, educación, recetas y compra.",
    youthModesLabel: "Vistas de Fuerza Laboral Juvenil",
    youthOverview: "Experiencia Juvenil",
    youthParent: "Portal para Padres",
    youthSupervisor: "Vista del Supervisor",
    marketplaceTitle: "Experiencia del Mercado",
    marketplaceSubtitle: "Acceso a alimentos, educación, descubrimiento y compra se unen aquí.",
    marketplaceBlocks: [
      {
        title: "Comprar y Reservar",
        body: "Explora productos frescos, plántulas y bienes elaborados con rutas para recoger, eventos y futuros pedidos digitales.",
      },
      {
        title: "Educación Alimentaria",
        body: "Pasa de comprar comida a comprenderla con guía nutricional, recetas e ideas de temporada.",
      },
      {
        title: "Crece con Nosotros",
        body: "Los clientes pueden convertirse en voluntarios, aliados, asistentes a eventos o futuros productores.",
      },
    ],
    storyTitle: "Por qué importa",
    storyBody:
      "La finca es la plataforma. El lugar mismo crea alimento, pertenencia, visibilidad, desarrollo de habilidades, sanación y valor comunitario duradero.",
    footerLine: "Bronson Family Farm no solo cultiva cosechas. Cultiva comunidad.",
    guidedSteps: [
      "Bienvenido a Bronson Family Farm, un sistema basado en lugar donde tierra, relaciones, alimentos y oportunidad trabajan juntos.",
      "Los visitantes conocen la historia, el ambiente y la misión de la finca como puerta de entrada al ecosistema.",
      "Los clientes pasan del interés al acceso mediante alimentos frescos, educación nutricional, recetas y rutas al mercado.",
      "Los productores usan el ecosistema para planificación, producción, aprendizaje y oportunidad compartida.",
      "La fuerza laboral juvenil participa en aprendizaje práctico, desarrollo de habilidades y apoyos conectados al trabajo real.",
      "El mercado conecta productos, educación y participación comunitaria en una experiencia continua.",
    ],
    roleContent: {
      guest: {
        title: "Ruta del Visitante",
        intro: "Da la bienvenida a los visitantes a la historia, el lugar y el propósito de Bronson Family Farm.",
        actions: [
          "Descubrir la misión y el legado de la finca",
          "Explorar eventos y experiencias estacionales",
          "Pasar de la curiosidad a una relación más profunda",
        ],
        outcomes: [
          "Comprensión clara del propósito de la finca",
          "Conexión emocional con la tierra y la visión",
          "Un siguiente paso simple hacia otra ruta",
        ],
        cta: "Entrar como Visitante",
      },
      customer: {
        title: "Ruta del Cliente",
        intro: "Convierte el acceso a alimentos en una experiencia más rica de nutrición, educación y participación continua.",
        actions: [
          "Ver productos, plántulas y ofertas del mercado",
          "Aprender sobre alimentos, recetas y nutrición",
          "Entrar directamente al mercado",
        ],
        outcomes: [
          "Opciones alimentarias más saludables",
          "Más confianza y hábitos de compra",
          "Ruta clara para regresar",
        ],
        cta: "Abrir Experiencia del Cliente",
      },
      grower: {
        title: "Ruta del Productor Agrícola",
        intro: "Apoya planificación, producción, aprendizaje y conexión dentro de un ecosistema agrícola compartido.",
        actions: [
          "Revisar prioridades de cultivo y ritmo estacional",
          "Acceder a ideas por rol para producción",
          "Conectarse con el ecosistema completo",
        ],
        outcomes: [
          "Dirección de cultivo más clara",
          "Conexión más fuerte con oportunidad",
          "Conocimiento compartido y confianza",
        ],
        cta: "Abrir Experiencia del Productor",
      },
      producer: {
        title: "Ruta del Productor de Valor Agregado",
        intro: "Apoya a creadores, vendedores y procesadores que transforman productos agrícolas en valor comunitario.",
        actions: [
          "Explorar participación en eventos y mercado",
          "Conectar productos con narrativa y visibilidad",
          "Activar oportunidades de colaboración",
        ],
        outcomes: [
          "Mayor visibilidad",
          "Conexión con mercado",
          "Papel más fuerte dentro del ecosistema",
        ],
        cta: "Abrir Experiencia de Valor Agregado",
      },
      youth: {
        title: "Ruta de Fuerza Laboral Juvenil",
        intro: "Conecta a jóvenes con trabajo, habilidades, mentoría y apoyo mediante experiencia práctica en la finca.",
        actions: [
          "Ver experiencias de aprendizaje juvenil",
          "Ver funciones de apoyo para padres",
          "Ver estructuras de apoyo solo para supervisores",
        ],
        outcomes: [
          "Confianza y preparación laboral",
          "Participación familiar",
          "Ruta apoyada hacia la responsabilidad",
        ],
        cta: "Abrir Fuerza Laboral Juvenil",
      },
      admin: {
        title: "Ruta Administrativa",
        intro: "Refleja la visión de liderazgo sobre operaciones, alianzas, participación e impacto basado en lugar.",
        actions: [
          "Seguir actividad y visibilidad del ecosistema",
          "Ver rutas entre roles y experiencias",
          "Apoyar continuidad, administración y crecimiento",
        ],
        outcomes: [
          "Claridad operativa",
          "Coordinación más fuerte",
          "Imagen más clara del impacto total",
        ],
        cta: "Abrir Vista de Liderazgo",
      },
    },
    youthContent: {
      overview: {
        title: "Experiencia Juvenil",
        body: "Los jóvenes viven aprendizaje estructurado y real conectado con trabajo, naturaleza, disciplina, creatividad y comunidad.",
        bullets: [
          "Aprendizaje práctico y responsabilidad en la finca",
          "Confianza a través de contribución visible",
          "Exposición a trabajo en equipo, mercados y oportunidad",
        ],
      },
      parent: {
        title: "Portal para Padres",
        body: "Los padres pueden entender la ruta, ver el valor de la participación y conectarse con estructuras de apoyo.",
        bullets: [
          "Comunicación clara sobre expectativas",
          "Conexión familiar con progreso y oportunidad",
          "Puente más fuerte entre hogar y programa",
        ],
      },
      supervisor: {
        title: "Vista del Supervisor",
        body: "Existe solo dentro de la experiencia juvenil y apoya personal, responsabilidad y alineación de recursos.",
        bullets: [
          "Supervisión y apoyo por rol",
          "Conciencia del progreso y planificación de intervención",
          "Coordinación con recursos de apoyo cuando sea necesario",
        ],
      },
    },
  },
  tl: {
    languageName: "Filipino",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Isang place-based system para sa pamilya, pagkain, kalusugan, at oportunidad",
    heroKicker: "Isang buhay na demo",
    enterDemo: "Pumasok sa Demo",
    guidedDemo: "Simulan ang Guided Tour",
    stopGuidedDemo: "Ihinto ang Guided Tour",
    exploreRoles: "Tingnan ang Mga Pathway",
    backToEntrance: "Bumalik sa Pasukan",
    openMarketplace: "Pumasok sa Marketplace",
    returnToRoles: "Bumalik sa Mga Role",
    localTime: "Lokal na Oras",
    seasonPulse: "Galaw ng Panahon",
    placeBased: "Place-Based System",
    welcomeHeadline: "Higit pa sa isang farm. Isang buhay na sistemang nakaugat sa lupa, pamilya, pagkain, at hinaharap.",
    welcomeBody:
      "Pinagsasama ng Bronson Family Farm ang bisita, customer, grower, kabataan, producer, at partner sa iisang lugar kung saan ang ugnayan ay lumilikha ng resulta.",
    missionLabel: "Ano ang ginagawa ng lugar na ito",
    missionText:
      "Nagpapalago ito ng pagkain, tao, pamilya, lupa, oportunidad, at nagpapakita kung paano ang isang lugar ay makapagpapakilos ng isang buong ecosystem.",
    chooseLanguage: "Pumili ng wika",
    choosePathway: "Pumili ng pathway",
    pathwayHint: "Bawat pathway ay nagpapakita ng ibang karanasan sa loob ng ecosystem.",
    livePanelTitle: "Ngayong Araw sa Farm",
    livePanelText:
      "Tuklasin ang role-based pathways, guided narration, seasonal planning, marketplace access, at youth workforce features sa iisang karanasan.",
    impactTitle: "Ano ang nalilikha ng Bronson Family Farm",
    impactCards: [
      "Sariwang pagkain at mas malusog na pagpili",
      "Pathway sa trabaho para sa kabataan",
      "Pagkakaugnay ng pamilya at wellness",
      "Oportunidad para sa grower at vendor",
    ],
    roleTitle: "Karanasan ayon sa Role",
    roleIntroLabel: "Layunin",
    roleActionsLabel: "Ano ang magagawa ng role na ito",
    roleOutcomesLabel: "Ano ang nakukuha ng role na ito",
    customerMarketplaceHint: "Maaaring dumiretso ang customer sa marketplace para sa ani, edukasyon, recipes, at pagbili.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Karanasan ng Kabataan",
    youthParent: "Portal ng Magulang",
    youthSupervisor: "View ng Supervisor",
    marketplaceTitle: "Karanasan sa Marketplace",
    marketplaceSubtitle: "Dito nagtatagpo ang access sa pagkain, edukasyon, tuklas, at pagbili.",
    marketplaceBlocks: [
      {
        title: "Mamili at Magpareserba",
        body: "Tingnan ang sariwang ani, seedlings, at value-added goods para sa pickup, events, at susunod na digital ordering.",
      },
      {
        title: "Edukasyon sa Pagkain",
        body: "Mula sa pagbili ng pagkain tungo sa pag-unawa dito sa pamamagitan ng nutrition guidance, recipes, at seasonal ideas.",
      },
      {
        title: "Lumago Kasama Namin",
        body: "Ang customer ay maaaring maging volunteer, supporter, event participant, o future grower sa mas malawak na ecosystem.",
      },
    ],
    storyTitle: "Bakit ito mahalaga",
    storyBody:
      "Ang farm ang platform. Ang mismong lugar ang lumilikha ng pagkain, pag-aari, visibility, skill-building, paghilom, at pangmatagalang halaga sa komunidad.",
    footerLine: "Hindi lang pananim ang pinalalago ng Bronson Family Farm. Komunidad ang pinalalago nito.",
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm, isang place-based system kung saan magkasamang gumagana ang lupa, ugnayan, pagkain, at oportunidad.",
      "Nararanasan ng mga bisita ang kuwento, kapaligiran, at layunin ng farm bilang pagpasok sa ecosystem.",
      "Ang mga customer ay lumilipat mula interes tungo sa access sa pamamagitan ng sariwang pagkain, nutrition education, recipes, at marketplace pathways.",
      "Ginagamit ng mga grower ang ecosystem para sa pagpaplano, produksyon, pagkatuto, at pinagsasaluhang oportunidad.",
      "Ang youth workforce ay sumasali sa hands-on learning, skill-building, at support structures na konektado sa tunay na trabaho.",
      "Pinagdurugtong ng marketplace ang produkto, edukasyon, at partisipasyon ng komunidad sa iisang tuloy-tuloy na karanasan.",
    ],
    roleContent: {
      guest: {
        title: "Pathway ng Bisita",
        intro: "Inaanyayahan nito ang mga bisita sa kuwento, lugar, at layunin ng Bronson Family Farm.",
        actions: [
          "Tuklasin ang misyon at legacy ng farm",
          "Tingnan ang events at seasonal experiences",
          "Lumipat mula sa curiosity tungo sa mas malalim na engagement",
        ],
        outcomes: [
          "Malinaw na pag-unawa sa layunin ng farm",
          "Emosyonal na koneksyon sa lupa at vision",
          "Simpleng susunod na hakbang tungo sa ibang pathway",
        ],
        cta: "Pumasok bilang Bisita",
      },
      customer: {
        title: "Pathway ng Customer",
        intro: "Ginagawang mas mayaman ang food access sa pamamagitan ng nourishment, education, at tuloy-tuloy na pakikilahok.",
        actions: [
          "Tingnan ang produce, seedlings, at market offerings",
          "Matuto tungkol sa pagkain, recipes, at nutrition",
          "Dumiretso sa marketplace",
        ],
        outcomes: [
          "Mas malusog na food choices",
          "Mas matibay na tiwala at buying habits",
          "Malinaw na ruta para sa muling pakikilahok",
        ],
        cta: "Buksan ang Customer Experience",
      },
      grower: {
        title: "Pathway ng Grower",
        intro: "Sumusuporta sa planning, production, learning, at connection sa loob ng pinagsasaluhang agricultural ecosystem.",
        actions: [
          "Suriin ang growing priorities at seasonal rhythm",
          "I-access ang role-based planning ideas",
          "Kumonekta sa mas malawak na ecosystem ng farm",
        ],
        outcomes: [
          "Mas malinaw na direksiyon sa pagtatanim",
          "Mas matibay na koneksyon sa oportunidad",
          "Pinagsasaluhang kaalaman at kumpiyansa",
        ],
        cta: "Buksan ang Grower Experience",
      },
      producer: {
        title: "Pathway ng Value-Added Producer",
        intro: "Sumusuporta sa makers, vendors, at processors na nagpapalawak ng halaga ng farm products para sa komunidad.",
        actions: [
          "Tuklasin ang event at market participation",
          "Ikonekta ang produkto sa storytelling at visibility",
          "Makilahok sa collaboration opportunities",
        ],
        outcomes: [
          "Mas malawak na visibility",
          "Koneksyon sa merkado",
          "Mas matibay na papel sa loob ng ecosystem",
        ],
        cta: "Buksan ang Producer Experience",
      },
      youth: {
        title: "Pathway ng Youth Workforce",
        intro: "Ikinokonekta ang kabataan sa trabaho, skills, mentorship, at support sa pamamagitan ng hands-on farm experience.",
        actions: [
          "Tingnan ang youth learning experiences",
          "Tingnan ang parent support features",
          "Tingnan ang supervisor-only support structures",
        ],
        outcomes: [
          "Kumpiyansa at kahandaan sa trabaho",
          "Pakikilahok ng pamilya",
          "Suportadong daan tungo sa responsibilidad",
        ],
        cta: "Buksan ang Youth Workforce",
      },
      admin: {
        title: "Pathway ng Administrator",
        intro: "Ipinapakita nito ang leadership view ng operations, partnerships, engagement, at place-based impact.",
        actions: [
          "Subaybayan ang activity at visibility ng ecosystem",
          "Tingnan ang mga pathway sa iba’t ibang role",
          "Suportahan ang continuity, stewardship, at growth",
        ],
        outcomes: [
          "Operational clarity",
          "Mas malakas na coordination",
          "Mas malinaw na larawan ng whole-system impact",
        ],
        cta: "Buksan ang Leadership View",
      },
    },
    youthContent: {
      overview: {
        title: "Karanasan ng Kabataan",
        body: "Nakakaranas ang kabataan ng structured at real-world learning na nagdurugtong sa trabaho, kalikasan, disiplina, creativity, at komunidad.",
        bullets: [
          "Hands-on learning at responsibilidad sa farm",
          "Pagbuo ng kumpiyansa sa pamamagitan ng visible contribution",
          "Exposure sa teamwork, markets, at opportunity",
        ],
      },
      parent: {
        title: "Portal ng Magulang",
        body: "Nauunawaan ng mga magulang ang pathway at nakakakonekta sila sa support structures sa paligid ng paglago ng kabataan.",
        bullets: [
          "Malinaw na komunikasyon tungkol sa expectations",
          "Koneksyon ng pamilya sa progreso at oportunidad",
          "Mas matibay na tulay sa pagitan ng tahanan at programa",
        ],
      },
      supervisor: {
        title: "View ng Supervisor",
        body: "Ang supervisor view ay nasa loob lamang ng youth workforce experience at sumusuporta sa staffing, accountability, at resource alignment.",
        bullets: [
          "Role-based oversight at support",
          "Awareness sa progreso at intervention planning",
          "Coordination sa support resources kung kailangan",
        ],
      },
    },
  },
  it: {
    languageName: "Italiano",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "Un sistema territoriale per famiglia, cibo, benessere e opportunità",
    heroKicker: "Un’esperienza demo viva",
    enterDemo: "Entra nel Demo",
    guidedDemo: "Avvia Tour Guidato",
    stopGuidedDemo: "Ferma Tour Guidato",
    exploreRoles: "Esplora Percorsi",
    backToEntrance: "Torna all’Ingresso",
    openMarketplace: "Entra nel Marketplace",
    returnToRoles: "Torna ai Ruoli",
    localTime: "Ora Locale",
    seasonPulse: "Ritmo Stagionale",
    placeBased: "Sistema Territoriale",
    welcomeHeadline: "Più di una fattoria. Un sistema vivo radicato nella terra, nella famiglia, nel cibo e nel futuro.",
    welcomeBody:
      "Bronson Family Farm riunisce visitatori, clienti, coltivatori, giovani, produttori e partner in un unico luogo dove le relazioni generano risultati.",
    missionLabel: "Cosa fa questo luogo",
    missionText:
      "Coltiva cibo, sviluppa persone, rafforza famiglie, rigenera la terra, crea opportunità e dimostra come un solo luogo possa attivare un intero ecosistema.",
    chooseLanguage: "Scegli lingua",
    choosePathway: "Scegli un percorso",
    pathwayHint: "Ogni percorso rivela un’esperienza diversa dentro l’ecosistema.",
    livePanelTitle: "Oggi nella Fattoria",
    livePanelText:
      "Esplora percorsi per ruolo, narrazione guidata, pianificazione stagionale, accesso al marketplace e funzioni per la forza lavoro giovanile.",
    impactTitle: "Cosa produce Bronson Family Farm",
    impactCards: [
      "Cibo fresco e scelte più sane",
      "Percorsi di lavoro per i giovani",
      "Connessione familiare e benessere",
      "Opportunità per coltivatori e venditori",
    ],
    roleTitle: "Esperienza per Ruolo",
    roleIntroLabel: "Scopo",
    roleActionsLabel: "Cosa può fare questo ruolo",
    roleOutcomesLabel: "Cosa ottiene questo ruolo",
    customerMarketplaceHint: "I clienti possono entrare direttamente nel marketplace per prodotti, educazione, ricette e percorsi di acquisto.",
    youthModesLabel: "Viste della Forza Lavoro Giovanile",
    youthOverview: "Esperienza Giovani",
    youthParent: "Portale Genitori",
    youthSupervisor: "Vista Supervisore",
    marketplaceTitle: "Esperienza Marketplace",
    marketplaceSubtitle: "Accesso al cibo, educazione, scoperta e acquisto si incontrano qui.",
    marketplaceBlocks: [
      {
        title: "Acquista e Prenota",
        body: "Esplora prodotti freschi, piantine e beni trasformati con percorsi per ritiro, eventi e futuri ordini digitali.",
      },
      {
        title: "Educazione Alimentare",
        body: "Passa dall’acquisto del cibo alla sua comprensione con guida nutrizionale, idee ricette e ispirazione stagionale.",
      },
      {
        title: "Cresci con Noi",
        body: "I clienti possono diventare volontari, sostenitori, partecipanti agli eventi o futuri coltivatori nell’ecosistema.",
      },
    ],
    storyTitle: "Perché conta",
    storyBody:
      "La fattoria è la piattaforma. Il luogo stesso crea cibo, appartenenza, visibilità, sviluppo di competenze, guarigione e valore comunitario duraturo.",
    footerLine: "Bronson Family Farm non sta semplicemente coltivando raccolti. Sta coltivando comunità.",
    guidedSteps: [
      "Benvenuti a Bronson Family Farm, un sistema territoriale dove terra, relazioni, cibo e opportunità lavorano insieme.",
      "Gli ospiti vivono la storia, l’atmosfera e la missione della fattoria come ingresso nell’ecosistema.",
      "I clienti passano dall’interesse all’accesso attraverso cibo fresco, educazione nutrizionale, ricette e percorsi di mercato.",
      "I coltivatori usano l’ecosistema per pianificazione, produzione, apprendimento e opportunità condivisa.",
      "La forza lavoro giovanile partecipa ad apprendimento pratico, sviluppo di competenze e strutture di supporto collegate al lavoro reale.",
      "Il marketplace collega prodotti, educazione e partecipazione della comunità in un’unica esperienza continua.",
    ],
    roleContent: {
      guest: {
        title: "Percorso Ospite",
        intro: "Accoglie i visitatori nella storia, nel luogo e nello scopo di Bronson Family Farm.",
        actions: [
          "Scoprire missione e eredità della fattoria",
          "Esplorare eventi ed esperienze stagionali",
          "Passare dalla curiosità a un coinvolgimento più profondo",
        ],
        outcomes: [
          "Comprensione chiara dello scopo della fattoria",
          "Connessione emotiva con la terra e la visione",
          "Un semplice passo successivo verso un altro percorso",
        ],
        cta: "Entra come Ospite",
      },
      customer: {
        title: "Percorso Cliente",
        intro: "Trasforma l’accesso al cibo in un’esperienza più ricca di nutrimento, educazione e partecipazione continua.",
        actions: [
          "Vedere prodotti, piantine e offerte di mercato",
          "Imparare su cibo, ricette e nutrizione",
          "Entrare direttamente nel marketplace",
        ],
        outcomes: [
          "Scelte alimentari più sane",
          "Maggiore fiducia e abitudini di acquisto",
          "Un percorso chiaro per il ritorno",
        ],
        cta: "Apri Esperienza Cliente",
      },
      grower: {
        title: "Percorso Coltivatore",
        intro: "Supporta pianificazione, produzione, apprendimento e connessione dentro un ecosistema agricolo condiviso.",
        actions: [
          "Rivedere priorità di coltivazione e ritmo stagionale",
          "Accedere a idee di pianificazione basate sul ruolo",
          "Connettersi con l’intero ecosistema della fattoria",
        ],
        outcomes: [
          "Direzione di coltivazione più chiara",
          "Connessione più forte con l’opportunità",
          "Conoscenza condivisa e fiducia",
        ],
        cta: "Apri Esperienza Coltivatore",
      },
      producer: {
        title: "Percorso Produttore a Valore Aggiunto",
        intro: "Supporta creatori, venditori e trasformatori che ampliano il valore dei prodotti agricoli per la comunità.",
        actions: [
          "Esplorare partecipazione a eventi e mercato",
          "Collegare prodotti a narrazione e visibilità",
          "Attivare opportunità di collaborazione",
        ],
        outcomes: [
          "Maggiore visibilità",
          "Connessione di mercato",
          "Ruolo più forte nell’ecosistema",
        ],
        cta: "Apri Esperienza Produttore",
      },
      youth: {
        title: "Percorso Forza Lavoro Giovanile",
        intro: "Collega i giovani a lavoro, competenze, tutoraggio e supporto attraverso esperienza pratica in fattoria.",
        actions: [
          "Vedere esperienze di apprendimento giovanile",
          "Vedere funzioni di supporto per i genitori",
          "Vedere strutture di supporto solo supervisore",
        ],
        outcomes: [
          "Fiducia e preparazione al lavoro",
          "Coinvolgimento familiare",
          "Percorso supportato verso la responsabilità",
        ],
        cta: "Apri Forza Lavoro Giovanile",
      },
      admin: {
        title: "Percorso Amministratore",
        intro: "Riflette la vista di leadership su operazioni, partnership, coinvolgimento e impatto territoriale.",
        actions: [
          "Monitorare attività e visibilità dell’ecosistema",
          "Vedere i percorsi tra ruoli ed esperienze",
          "Sostenere continuità, stewardship e crescita",
        ],
        outcomes: [
          "Chiarezza operativa",
          "Coordinamento più forte",
          "Visione più chiara dell’impatto complessivo",
        ],
        cta: "Apri Vista Leadership",
      },
    },
    youthContent: {
      overview: {
        title: "Esperienza Giovani",
        body: "I giovani vivono un apprendimento strutturato e reale che collega lavoro, natura, disciplina, creatività e comunità.",
        bullets: [
          "Apprendimento pratico e responsabilità in fattoria",
          "Costruzione della fiducia attraverso contributo visibile",
          "Esposizione a teamwork, mercati e opportunità",
        ],
      },
      parent: {
        title: "Portale Genitori",
        body: "I genitori possono capire il percorso, vedere il valore della partecipazione e connettersi alle strutture di supporto.",
        bullets: [
          "Comunicazione chiara sulle aspettative",
          "Connessione familiare con progresso e opportunità",
          "Ponte più forte tra casa e programma",
        ],
      },
      supervisor: {
        title: "Vista Supervisore",
        body: "Esiste solo dentro l’esperienza giovanile e supporta personale, responsabilità e allineamento delle risorse.",
        bullets: [
          "Supervisione e supporto basati sul ruolo",
          "Consapevolezza del progresso e pianificazione dell’intervento",
          "Coordinamento con risorse di supporto quando necessario",
        ],
      },
    },
  },
  patwa: {
    languageName: "Patwa",
    dir: "ltr",
    appTitle: "Bronson Family Farm",
    appSubtitle: "A one place system fi family, food, wellness, an opportunity",
    heroKicker: "A live demo experience",
    enterDemo: "Go Ina Di Demo",
    guidedDemo: "Start Guided Tour",
    stopGuidedDemo: "Stop Guided Tour",
    exploreRoles: "Explore Di Pathways",
    backToEntrance: "Back To Entrance",
    openMarketplace: "Go Ina Marketplace",
    returnToRoles: "Back To Roles",
    localTime: "Local Time",
    seasonPulse: "Season Pulse",
    placeBased: "Place-Based System",
    welcomeHeadline: "Dis more than farm. A living system weh root inna land, family, food, an future.",
    welcomeBody:
      "Bronson Family Farm bring together guest, customer, grower, youth, producer, an partner inna one place weh relationship create result.",
    missionLabel: "Wah dis place do",
    missionText:
      "It grow food, build people, strengthen family, restore land, create opportunity, an show how one place can activate one whole ecosystem.",
    chooseLanguage: "Choose language",
    choosePathway: "Choose pathway",
    pathwayHint: "Every pathway show yuh a different part a di ecosystem.",
    livePanelTitle: "Pon Di Farm Today",
    livePanelText:
      "Explore role pathways, guided voice, seasonal planning, marketplace access, an youth workforce features inna one smooth experience.",
    impactTitle: "Wah Bronson Family Farm produce",
    impactCards: [
      "Fresh food an healthier choice",
      "Youth workforce pathways",
      "Family connection an wellness",
      "Grower an vendor opportunity",
    ],
    roleTitle: "Role Experience",
    roleIntroLabel: "Purpose",
    roleActionsLabel: "Wah dis role can do",
    roleOutcomesLabel: "Wah dis role gain",
    customerMarketplaceHint: "Customer can move straight ina di marketplace fi produce, education, recipe, an buying pathway.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Youth Experience",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    marketplaceTitle: "Marketplace Experience",
    marketplaceSubtitle: "Food access, education, discovery, an buying pathway link up yah so.",
    marketplaceBlocks: [
      {
        title: "Shop an Reserve",
        body: "Browse fresh produce, seedlings, an value-added goods fi pickup, event, an future digital ordering.",
      },
      {
        title: "Food Education",
        body: "Move from buy food to understand food through nutrition guidance, recipe ideas, an seasonal inspiration.",
      },
      {
        title: "Grow Wid We",
        body: "Customer can become volunteer, supporter, event participant, or future grower ina di wider ecosystem.",
      },
    ],
    storyTitle: "Why dis matter",
    storyBody:
      "Di farm a di platform. Di place itself create food, belonging, visibility, skills, healing, an long-term community value.",
    footerLine: "Bronson Family Farm nah just grow crop. It a grow community.",
    guidedSteps: [
      "Welcome to Bronson Family Farm, a place-based system weh bring land, relationship, food, an opportunity together.",
      "Guest get di story, di atmosphere, an di mission as di front door to di ecosystem.",
      "Customer move from interest to access through fresh food, nutrition education, recipe, an marketplace pathway.",
      "Grower use di ecosystem fi planning, production, learning, an shared opportunity.",
      "Youth workforce participants get hands-on learning, skill-building, an support connected to real work.",
      "Di marketplace connect product, education, an community participation inna one continuous experience.",
    ],
    roleContent: {
      guest: {
        title: "Guest Pathway",
        intro: "Dis pathway welcome visitor into di story, place, an purpose a Bronson Family Farm.",
        actions: [
          "Discover di mission an legacy a di farm",
          "Explore event an seasonal experience",
          "Move from curiosity to deeper engagement",
        ],
        outcomes: [
          "Clear understanding a di farm purpose",
          "Emotional connection to di land an vision",
          "Simple next step into another pathway",
        ],
        cta: "Enter As Guest",
      },
      customer: {
        title: "Customer Pathway",
        intro: "Dis pathway turn food access into a richer experience a nourishment, education, an ongoing participation.",
        actions: [
          "View produce, seedlings, an market offerings",
          "Learn bout food, recipe, an nutrition",
          "Move straight ina di marketplace",
        ],
        outcomes: [
          "Healthier food choice",
          "Stronger trust an buying habit",
          "Clear route fi return engagement",
        ],
        cta: "Open Customer Experience",
      },
      grower: {
        title: "Grower Pathway",
        intro: "Dis pathway support planning, production, learning, an connection ina one shared agricultural ecosystem.",
        actions: [
          "Review growing priorities an seasonal rhythm",
          "Access role-based planning ideas",
          "Connect wid di wider farm ecosystem",
        ],
        outcomes: [
          "Clearer growing direction",
          "Stronger connection to opportunity",
          "Shared knowledge an confidence",
        ],
        cta: "Open Grower Experience",
      },
      producer: {
        title: "Value-Added Producer Pathway",
        intro: "Dis pathway support maker, vendor, an processor weh help turn farm product into wider community value.",
        actions: [
          "Explore event an market participation",
          "Connect product to storytelling an visibility",
          "Engage collaboration opportunity",
        ],
        outcomes: [
          "Expanded visibility",
          "Market connection",
          "Stronger role ina di ecosystem",
        ],
        cta: "Open Producer Experience",
      },
      youth: {
        title: "Youth Workforce Pathway",
        intro: "Dis pathway link young people to work, skills, mentorship, an support through hands-on farm experience.",
        actions: [
          "View youth learning experience",
          "See parent support features",
          "See supervisor-only structures",
        ],
        outcomes: [
          "Confidence an work readiness",
          "Family engagement",
          "Supported path into responsibility",
        ],
        cta: "Open Youth Workforce",
      },
      admin: {
        title: "Administrator Pathway",
        intro: "Dis pathway show di leadership view a operations, partnership, engagement, an place-based impact.",
        actions: [
          "Track ecosystem activity an visibility",
          "See pathways across roles an experiences",
          "Support continuity, stewardship, an growth",
        ],
        outcomes: [
          "Operational clarity",
          "Stronger coordination",
          "Clearer picture a whole-system impact",
        ],
        cta: "Open Leadership View",
      },
    },
    youthContent: {
      overview: {
        title: "Youth Experience",
        body: "Young people get structured real-world learning weh connect work, nature, discipline, creativity, an community.",
        bullets: [
          "Hands-on learning an farm responsibility",
          "Confidence through visible contribution",
          "Exposure to teamwork, market, an opportunity",
        ],
      },
      parent: {
        title: "Parent Portal",
        body: "Parent can understand di pathway, see di value, an connect wid support around youth growth.",
        bullets: [
          "Clear communication bout expectation",
          "Family connection to progress an opportunity",
          "Stronger bridge between home an program",
        ],
      },
      supervisor: {
        title: "Supervisor View",
        body: "Dis only live inside di youth workforce experience an support staffing, accountability, an resource alignment.",
        bullets: [
          "Role-based oversight an support",
          "Progress awareness an intervention planning",
          "Coordination wid support resources when needed",
        ],
      },
    },
  },
  he: {
    languageName: "עברית",
    dir: "rtl",
    appTitle: "Bronson Family Farm",
    appSubtitle: "מערכת מבוססת מקום למשפחה, מזון, רווחה והזדמנות",
    heroKicker: "חוויית דמו חיה",
    enterDemo: "כניסה לדמו",
    guidedDemo: "התחל סיור מודרך",
    stopGuidedDemo: "עצור סיור מודרך",
    exploreRoles: "חקור מסלולים",
    backToEntrance: "חזרה לכניסה",
    openMarketplace: "כניסה לשוק",
    returnToRoles: "חזרה לתפקידים",
    localTime: "שעה מקומית",
    seasonPulse: "דופק עונתי",
    placeBased: "מערכת מבוססת מקום",
    welcomeHeadline: "יותר מחווה. מערכת חיה המושרשת באדמה, במשפחה, במזון ובעתיד.",
    welcomeBody:
      "Bronson Family Farm מחברת מבקרים, לקוחות, מגדלים, צעירים, יצרנים ושותפים במקום אחד שבו יחסים יוצרים תוצאות.",
    missionLabel: "מה המקום הזה עושה",
    missionText:
      "הוא מגדל מזון, מפתח אנשים, מחזק משפחות, משקם אדמה, יוצר הזדמנות ומראה כיצד מקום אחד יכול להפעיל מערכת שלמה.",
    chooseLanguage: "בחר שפה",
    choosePathway: "בחר מסלול",
    pathwayHint: "כל מסלול חושף חוויה אחרת בתוך המערכת.",
    livePanelTitle: "היום בחווה",
    livePanelText:
      "גלה מסלולים לפי תפקיד, קריינות מודרכת, תכנון עונתי, גישה לשוק ותכונות של כוח עבודה לנוער.",
    impactTitle: "מה Bronson Family Farm מייצרת",
    impactCards: [
      "מזון טרי ובחירות בריאות יותר",
      "מסלולי עבודה לנוער",
      "חיבור משפחתי ורווחה",
      "הזדמנות למגדלים ולספקים",
    ],
    roleTitle: "חוויית תפקיד",
    roleIntroLabel: "מטרה",
    roleActionsLabel: "מה התפקיד הזה יכול לעשות",
    roleOutcomesLabel: "מה התפקיד הזה מקבל",
    customerMarketplaceHint: "לקוחות יכולים לעבור ישירות לשוק לתוצרת, חינוך, מתכונים ונתיבי רכישה.",
    youthModesLabel: "תצוגות כוח עבודה לנוער",
    youthOverview: "חוויית נוער",
    youthParent: "פורטל הורים",
    youthSupervisor: "תצוגת מפקח",
    marketplaceTitle: "חוויית שוק",
    marketplaceSubtitle: "גישה למזון, חינוך, גילוי ורכישה נפגשים כאן.",
    marketplaceBlocks: [
      {
        title: "קנייה והזמנה",
        body: "עיין בתוצרת טרייה, שתילים ומוצרים מעובדים למסלולי איסוף, אירועים והזמנות דיגיטליות בעתיד.",
      },
      {
        title: "חינוך למזון",
        body: "עבור מקניית מזון להבנתו דרך הנחיית תזונה, רעיונות למתכונים והשראה עונתית.",
      },
      {
        title: "צמחו איתנו",
        body: "לקוחות יכולים להפוך למתנדבים, תומכים, משתתפי אירועים או מגדלים עתידיים במערכת הרחבה יותר.",
      },
    ],
    storyTitle: "למה זה חשוב",
    storyBody:
      "החווה היא הפלטפורמה. המקום עצמו יוצר מזון, שייכות, נראות, פיתוח מיומנויות, ריפוי וערך קהילתי ארוך טווח.",
    footerLine: "Bronson Family Farm לא רק מגדלת יבולים. היא מגדלת קהילה.",
    guidedSteps: [
      "ברוכים הבאים לBronson Family Farm, מערכת מבוססת מקום שבה אדמה, יחסים, מזון והזדמנות פועלים יחד.",
      "אורחים חווים את הסיפור, האווירה והשליחות של החווה ככניסה למערכת.",
      "לקוחות עוברים מעניין לגישה דרך מזון טרי, חינוך תזונתי, מתכונים ונתיבי שוק.",
      "מגדלים משתמשים במערכת לתכנון, ייצור, למידה והזדמנות משותפת.",
      "משתתפי כוח העבודה לנוער מקבלים למידה מעשית, פיתוח מיומנויות ומבני תמיכה המחוברים לעבודה אמיתית.",
      "השוק מחבר מוצרים, חינוך והשתתפות קהילתית לחוויה אחת רציפה.",
    ],
    roleContent: {
      guest: {
        title: "מסלול אורח",
        intro: "מסלול זה מקבל את פני המבקרים לסיפור, למקום ולמטרה של Bronson Family Farm.",
        actions: [
          "לגלות את השליחות והמורשת של החווה",
          "לחקור אירועים וחוויות עונתיות",
          "לעבור מסקרנות למעורבות עמוקה יותר",
        ],
        outcomes: [
          "הבנה ברורה של מטרת החווה",
          "חיבור רגשי לאדמה ולחזון",
          "צעד פשוט הבא למסלול אחר",
        ],
        cta: "כניסה כאורח",
      },
      customer: {
        title: "מסלול לקוח",
        intro: "מסלול זה הופך גישה למזון לחוויה עשירה יותר של הזנה, חינוך והשתתפות מתמשכת.",
        actions: [
          "לראות תוצרת, שתילים והיצע שוק",
          "ללמוד על מזון, מתכונים ותזונה",
          "לעבור ישירות לשוק",
        ],
        outcomes: [
          "בחירות מזון בריאות יותר",
          "אמון והרגלי רכישה חזקים יותר",
          "מסלול ברור לחזרה",
        ],
        cta: "פתח חוויית לקוח",
      },
      grower: {
        title: "מסלול מגדל",
        intro: "מסלול זה תומך בתכנון, ייצור, למידה וחיבור בתוך מערכת חקלאית משותפת.",
        actions: [
          "לסקור עדיפויות גידול וקצב עונתי",
          "לקבל רעיונות תכנון לפי תפקיד",
          "להתחבר למערכת הרחבה של החווה",
        ],
        outcomes: [
          "כיוון גידול ברור יותר",
          "חיבור חזק יותר להזדמנות",
          "ידע וביטחון משותפים",
        ],
        cta: "פתח חוויית מגדל",
      },
      producer: {
        title: "מסלול יצרן בעל ערך מוסף",
        intro: "מסלול זה תומך ביצרנים, ספקים ומעבדים שמרחיבים את ערך מוצרי החווה לקהילה.",
        actions: [
          "לחקור השתתפות באירועים ובשוק",
          "לחבר מוצרים לסיפור ולנראות",
          "להפעיל הזדמנויות לשיתוף פעולה",
        ],
        outcomes: [
          "נראות מורחבת",
          "חיבור לשוק",
          "תפקיד חזק יותר בתוך המערכת",
        ],
        cta: "פתח חוויית יצרן",
      },
      youth: {
        title: "מסלול כוח עבודה לנוער",
        intro: "מסלול זה מחבר צעירים לעבודה, מיומנויות, חונכות ותמיכה דרך חוויית חווה מעשית.",
        actions: [
          "לראות חוויות למידה לנוער",
          "לראות תכונות תמיכה להורים",
          "לראות מבני תמיכה למפקח בלבד",
        ],
        outcomes: [
          "ביטחון ומוכנות לעבודה",
          "מעורבות משפחתית",
          "מסלול נתמך לאחריות",
        ],
        cta: "פתח כוח עבודה לנוער",
      },
      admin: {
        title: "מסלול מנהל",
        intro: "מסלול זה משקף את מבט ההנהגה על תפעול, שותפויות, מעורבות והשפעה מבוססת מקום.",
        actions: [
          "לעקוב אחר פעילות ונראות המערכת",
          "לראות מסלולים בין תפקידים וחוויות",
          "לתמוך ברציפות, אחריות וצמיחה",
        ],
        outcomes: [
          "בהירות תפעולית",
          "תיאום חזק יותר",
          "תמונה ברורה יותר של ההשפעה הכוללת",
        ],
        cta: "פתח תצוגת הנהגה",
      },
    },
    youthContent: {
      overview: {
        title: "חוויית נוער",
        body: "צעירים חווים למידה מובנית ומציאותית המחברת עבודה, טבע, משמעת, יצירתיות וקהילה.",
        bullets: [
          "למידה מעשית ואחריות בחווה",
          "בניית ביטחון דרך תרומה נראית לעין",
          "חשיפה לעבודת צוות, שווקים והזדמנות",
        ],
      },
      parent: {
        title: "פורטל הורים",
        body: "הורים יכולים להבין את המסלול, לראות את ערך ההשתתפות ולהתחבר למבני התמיכה סביב צמיחת הנוער.",
        bullets: [
          "תקשורת ברורה לגבי ציפיות",
          "חיבור משפחתי להתקדמות ולהזדמנות",
          "גשר חזק יותר בין הבית לתוכנית",
        ],
      },
      supervisor: {
        title: "תצוגת מפקח",
        body: "תצוגה זו קיימת רק בתוך חוויית כוח העבודה לנוער ותומכת בכוח אדם, אחריות ויישור משאבים.",
        bullets: [
          "פיקוח ותמיכה לפי תפקיד",
          "מודעות להתקדמות ותכנון התערבות",
          "תיאום עם משאבי תמיכה בעת הצורך",
        ],
      },
    },
  },
};

const roleOrder: RoleKey[] = ["guest", "customer", "grower", "producer", "youth", "admin"];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useLocalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function getSeasonPulse(date: Date) {
  const month = date.getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "Planning, visioning, protected growth";
  if ([3, 4, 5].includes(month)) return "Seedtime, preparation, early expansion";
  if ([6, 7, 8].includes(month)) return "Peak growth, learning, markets, activity";
  return "Harvest rhythm, transition, storage, next-cycle design";
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);
  const speak = (text: string, lang: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.96;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };
  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setEnabled(false);
  };
  return { enabled, setEnabled, speak, stop };
}

const speechCodes: Record<LanguageKey, string> = {
  en: "en-US",
  es: "es-US",
  tl: "fil-PH",
  it: "it-IT",
  patwa: "en-JM",
  he: "he-IL",
};

function BackgroundVisual({
  src,
  alt,
  gradientClass,
  icon,
}: {
  src: string;
  alt: string;
  gradientClass: string;
  icon: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!errored ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover scale-[1.02] opacity-55"
        />
      ) : (
        <div className={classNames("h-full w-full bg-gradient-to-br", gradientClass)}>
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="absolute inset-0 flex items-center justify-center text-[140px] md:text-[220px] opacity-20">
            {icon}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs md:text-sm tracking-wide text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl", className)}>
      <div className="border-b border-white/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
        {title}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const t = translations[language];

  const [screen, setScreen] = useState<ScreenKey>("entrance");
  const [selectedRole, setSelectedRole] = useState<RoleKey>("guest");
  const [youthView, setYouthView] = useState<YouthView>("overview");
  const [tourIndex, setTourIndex] = useState(0);
  const [roleGridOpen, setRoleGridOpen] = useState(true);

  const clock = useLocalClock();
  const { enabled, setEnabled, speak, stop } = useSpeech();
  const tourTimer = useRef<number | null>(null);

  const currentRoleContent = t.roleContent[selectedRole];
  const roleCard = roleCards.find((r) => r.key === selectedRole) ?? roleCards[0];
  const entranceVisual = roleCards[0];

  const localTimeDisplay = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(clock);
    } catch {
      return clock.toLocaleTimeString();
    }
  }, [clock, language]);

  const seasonPulse = getSeasonPulse(clock);

  useEffect(() => {
    if (!enabled) {
      if (tourTimer.current) window.clearInterval(tourTimer.current);
      return;
    }

    const steps = t.guidedSteps;
    speak(steps[tourIndex], speechCodes[language]);

    tourTimer.current = window.setInterval(() => {
      setTourIndex((prev) => {
        const next = (prev + 1) % steps.length;
        return next;
      });
    }, 7000);

    return () => {
      if (tourTimer.current) window.clearInterval(tourTimer.current);
    };
  }, [enabled, language]); // intentionally not including tourIndex here

  useEffect(() => {
    if (!enabled) return;
    const steps = t.guidedSteps;
    speak(steps[tourIndex], speechCodes[language]);

    if (tourIndex === 0) {
      setScreen("entrance");
    } else if (tourIndex >= 1 && tourIndex <= 4) {
      setScreen("role");
      setSelectedRole(roleOrder[tourIndex - 1]);
      if (roleOrder[tourIndex - 1] === "youth") setYouthView("overview");
    } else {
      setScreen("marketplace");
    }
  }, [tourIndex, enabled, language, t.guidedSteps]);

  useEffect(() => {
    return () => stop();
  }, []);

  const startGuidedTour = () => {
    setEnabled(true);
    setTourIndex(0);
    setScreen("entrance");
  };

  const stopGuidedTour = () => {
    stop();
    if (tourTimer.current) window.clearInterval(tourTimer.current);
  };

  const openRole = (role: RoleKey) => {
    setScreen("role");
    setSelectedRole(role);
    if (role === "youth") setYouthView("overview");
    setRoleGridOpen(false);
    if (enabled) {
      const idx = roleOrder.indexOf(role);
      if (idx >= 0) setTourIndex(idx + 1);
    }
  };

  const openMarketplace = () => {
    setScreen("marketplace");
    if (enabled) setTourIndex(5);
  };

  const youthPanel = t.youthContent[youthView];

  const navButtonBase =
    "rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20 active:scale-[0.99]";

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-black text-white selection:bg-emerald-300 selection:text-black"
    >
      <div className="relative min-h-screen">
        <BackgroundVisual
          src={screen === "entrance" ? entranceVisual.image : screen === "marketplace" ? "/Marketplace.jpg" : roleCard.image}
          alt={screen === "entrance" ? "Bronson Family Farm entrance" : screen === "marketplace" ? "Marketplace" : currentRoleContent.title}
          gradientClass={fallbackGradients[(screen === "entrance" ? 0 : screen === "marketplace" ? 5 : roleOrder.indexOf(selectedRole)) % fallbackGradients.length]}
          icon={screen === "entrance" ? "🌲" : screen === "marketplace" ? "🧺" : roleCard.fallbackIcon}
        />

        <div className="relative z-10 min-h-screen px-4 py-4 md:px-8 md:py-6">
          <header className="mx-auto mb-6 max-w-7xl rounded-[28px] border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Pill>{t.heroKicker}</Pill>
                  <Pill>{t.placeBased}</Pill>
                  <Pill>{t.seasonPulse}: {seasonPulse}</Pill>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">{t.appTitle}</h1>
                <p className="mt-1 max-w-3xl text-sm text-white/80 md:text-base">{t.appSubtitle}</p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end">
                <button className={navButtonBase} onClick={() => setScreen("entrance")}>
                  {t.backToEntrance}
                </button>
                <button className={navButtonBase} onClick={() => setRoleGridOpen((v) => !v)}>
                  {t.exploreRoles}
                </button>
                <button className={navButtonBase} onClick={openMarketplace}>
                  {t.openMarketplace}
                </button>
                {!enabled ? (
                  <button
                    className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400 active:scale-[0.99]"
                    onClick={startGuidedTour}
                  >
                    {t.guidedDemo}
                  </button>
                ) : (
                  <button
                    className="rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 active:scale-[0.99]"
                    onClick={stopGuidedTour}
                  >
                    {t.stopGuidedDemo}
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12">
            <section className="lg:col-span-8">
              {screen === "entrance" && (
                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Pill>{t.localTime}: {localTimeDisplay}</Pill>
                      <Pill>{t.chooseLanguage}</Pill>
                    </div>

                    <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-6xl">
                      {t.welcomeHeadline}
                    </h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
                      {t.welcomeBody}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {(Object.keys(translations) as LanguageKey[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={classNames(
                            "rounded-2xl border px-4 py-3 text-left transition",
                            language === lang
                              ? "border-emerald-300 bg-emerald-300 text-black"
                              : "border-white/15 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          <div className="text-sm font-semibold">{translations[lang].languageName}</div>
                          <div className="text-xs opacity-80">{lang.toUpperCase()}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setScreen("role");
                          setSelectedRole("guest");
                          setRoleGridOpen(false);
                        }}
                        className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-emerald-200"
                      >
                        {t.enterDemo}
                      </button>
                      <button
                        onClick={startGuidedTour}
                        className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        {t.guidedDemo}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <SectionCard title={t.missionLabel}>
                      <p className="text-base leading-7 text-white/85">{t.missionText}</p>
                    </SectionCard>

                    <SectionCard title={t.livePanelTitle}>
                      <p className="text-base leading-7 text-white/85">{t.livePanelText}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-[0.16em] text-white/60">{t.localTime}</div>
                          <div className="mt-2 text-lg font-semibold">{localTimeDisplay}</div>
                        </div>
                        <div className="rounded-2xl bg-black/20 p-4">
                          <div className="text-xs uppercase tracking-[0.16em] text-white/60">{t.seasonPulse}</div>
                          <div className="mt-2 text-lg font-semibold">{seasonPulse}</div>
                        </div>
                      </div>
                    </SectionCard>
                  </div>
                </div>
              )}

              {screen === "role" && (
                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Pill>{t.roleTitle}</Pill>
                      <Pill>{currentRoleContent.title}</Pill>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                          {currentRoleContent.title}
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
                          {currentRoleContent.intro}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <button
                            onClick={() => setScreen("entrance")}
                            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                          >
                            {t.backToEntrance}
                          </button>
                          {selectedRole === "customer" && (
                            <button
                              onClick={openMarketplace}
                              className="rounded-2xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                            >
                              {t.openMarketplace}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                        <div className="text-xs uppercase tracking-[0.16em] text-white/60">
                          {t.roleIntroLabel}
                        </div>
                        <p className="mt-3 text-base leading-7 text-white/85">{currentRoleContent.intro}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <SectionCard title={t.roleActionsLabel}>
                      <ul className="space-y-3">
                        {currentRoleContent.actions.map((item) => (
                          <li key={item} className="rounded-2xl bg-black/20 p-4 text-white/90">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </SectionCard>

                    <SectionCard title={t.roleOutcomesLabel}>
                      <ul className="space-y-3">
                        {currentRoleContent.outcomes.map((item) => (
                          <li key={item} className="rounded-2xl bg-black/20 p-4 text-white/90">
                            {item}
                          </li>
                        ))}
                      </ul>
                      {selectedRole === "customer" && (
                        <p className="mt-4 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                          {t.customerMarketplaceHint}
                        </p>
                      )}
                    </SectionCard>
                  </div>

                  {selectedRole === "youth" && (
                    <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                          {t.youthModesLabel}
                        </div>
                        <button
                          onClick={() => setYouthView("overview")}
                          className={classNames(
                            "rounded-2xl px-4 py-2 text-sm transition",
                            youthView === "overview"
                              ? "bg-white text-black"
                              : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {t.youthOverview}
                        </button>
                        <button
                          onClick={() => setYouthView("parent")}
                          className={classNames(
                            "rounded-2xl px-4 py-2 text-sm transition",
                            youthView === "parent"
                              ? "bg-white text-black"
                              : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {t.youthParent}
                        </button>
                        <button
                          onClick={() => setYouthView("supervisor")}
                          className={classNames(
                            "rounded-2xl px-4 py-2 text-sm transition",
                            youthView === "supervisor"
                              ? "bg-amber-300 text-black"
                              : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {t.youthSupervisor}
                        </button>
                      </div>

                      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            {youthPanel.title}
                          </h3>
                          <p className="mt-4 text-base leading-7 text-white/85">{youthPanel.body}</p>
                        </div>
                        <div className="space-y-3">
                          {youthPanel.bullets.map((item) => (
                            <div key={item} className="rounded-2xl bg-white/10 p-4 text-white/90">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {screen === "marketplace" && (
                <div className="space-y-6">
                  <div className="rounded-[32px] border border-white/10 bg-black/25 p-6 shadow-2xl backdrop-blur-xl md:p-8">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Pill>{t.marketplaceTitle}</Pill>
                      <Pill>{t.placeBased}</Pill>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.marketplaceTitle}</h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
                      {t.marketplaceSubtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setScreen("role");
                          setSelectedRole("customer");
                        }}
                        className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                      >
                        {t.returnToRoles}
                      </button>
                      <button
                        onClick={() => setScreen("entrance")}
                        className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-200"
                      >
                        {t.backToEntrance}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {t.marketplaceBlocks.map((block) => (
                      <SectionCard key={block.title} title={block.title}>
                        <p className="text-base leading-7 text-white/85">{block.body}</p>
                      </SectionCard>
                    ))}
                  </div>

                  <SectionCard title={t.storyTitle}>
                    <p className="text-base leading-7 text-white/85">{t.storyBody}</p>
                  </SectionCard>
                </div>
              )}
            </section>

            <aside className="space-y-6 lg:col-span-4">
              <SectionCard title={t.choosePathway} className="sticky top-4">
                <p className="mb-4 text-sm leading-6 text-white/75">{t.pathwayHint}</p>
                <div className={classNames("grid gap-3", roleGridOpen ? "grid-cols-1" : "grid-cols-1")}>
                  {roleCards.map((role, index) => {
                    const content = t.roleContent[role.key];
                    const active = selectedRole === role.key && screen === "role";
                    return (
                      <button
                        key={role.key}
                        onClick={() => openRole(role.key)}
                        className={classNames(
                          "group relative overflow-hidden rounded-3xl border text-left transition",
                          active
                            ? "border-emerald-300 bg-emerald-300/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        <div className="relative h-28">
                          <BackgroundVisual
                            src={role.image}
                            alt={content.title}
                            gradientClass={fallbackGradients[index % fallbackGradients.length]}
                            icon={role.fallbackIcon}
                          />
                          <div className="relative z-10 flex h-full flex-col justify-end p-4">
                            <div className="text-lg font-semibold text-white">{content.title}</div>
                            <div className="mt-1 line-clamp-2 text-xs text-white/75">{content.intro}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard title={t.impactTitle}>
                <div className="grid gap-3">
                  {t.impactCards.map((item) => (
                    <div key={item} className="rounded-2xl bg-black/20 p-4 text-sm text-white/90">
                      {item}
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5 text-sm leading-6 text-white/85 backdrop-blur-md shadow-2xl">
                {t.footerLine}
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}
