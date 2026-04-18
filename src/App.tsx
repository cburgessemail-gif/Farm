import React, { useEffect, useMemo, useRef, useState } from "react";

type LanguageKey = "en" | "es" | "tl" | "it" | "patwa" | "he";
type ScreenKey = "entrance" | "role" | "marketplace";
type RoleKey = "guest" | "customer" | "grower" | "producer" | "youth" | "admin";
type YouthView = "overview" | "parent" | "supervisor";

type RoleCard = {
  key: RoleKey;
  image: string;
  icon: string;
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
    overview: { title: string; body: string; bullets: string[] };
    parent: { title: string; body: string; bullets: string[] };
    supervisor: { title: string; body: string; bullets: string[] };
  };
};

const roleCards: RoleCard[] = [
  { key: "guest", image: "/GrowArea.jpg", icon: "🌿" },
  { key: "customer", image: "/GrowArea2.jpg", icon: "🥬" },
  { key: "grower", image: "/GrowArea.jpg", icon: "🌱" },
  { key: "producer", image: "/GrowArea2.jpg", icon: "🧺" },
  { key: "youth", image: "/GrowArea.jpg", icon: "🚜" },
  { key: "admin", image: "/GrowArea2.jpg", icon: "📊" },
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
    customerMarketplaceHint:
      "Customers can move directly into the marketplace for produce, education, recipes, and purchasing pathways.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Youth Experience",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    marketplaceTitle: "Marketplace Experience",
    marketplaceSubtitle:
      "Food access, education, discovery, and purchasing pathways meet here.",
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
    footerLine:
      "Bronson Family Farm is not simply growing crops. It is growing community.",
    guidedSteps: [
      "Welcome to Bronson Family Farm. This is a place-based system where land, relationships, food, and opportunity work together.",
      "Guests experience the story, atmosphere, and mission of the farm. This is the front door into the ecosystem.",
      "Customers move from interest to access. They explore fresh food, nutrition education, recipes, and marketplace pathways.",
      "Growers use the ecosystem for planning, production, learning, and shared opportunity.",
      "Youth workforce participants engage hands-on learning, skill-building, and support structures connected to real work.",
      "The marketplace connects products, education, and community participation. It brings the full experience together.",
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
    appSubtitle:
      "Un sistema basado en lugar para familia, alimentos, bienestar y oportunidad",
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
    welcomeHeadline:
      "Más que una finca. Un sistema vivo arraigado en tierra, familia, comida y futuro.",
    welcomeBody:
      "Bronson Family Farm une visitantes, clientes, productores, jóvenes, elaboradores y aliados en un solo lugar donde las relaciones producen resultados.",
    missionLabel: "Lo que hace este lugar",
    missionText:
      "Cultiva alimentos, desarrolla personas, fortalece familias, restaura tierra, crea oportunidad y demuestra cómo un solo lugar puede activar todo un ecosistema.",
    chooseLanguage: "Elegir idioma",
    choosePathway: "Elegir una ruta",
    pathwayHint:
      "Cada ruta revela una experiencia diferente dentro del ecosistema.",
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
    customerMarketplaceHint:
      "Los clientes pueden entrar directamente al mercado para productos, educación, recetas y compra.",
    youthModesLabel: "Vistas de Fuerza Laboral Juvenil",
    youthOverview: "Experiencia Juvenil",
    youthParent: "Portal para Padres",
    youthSupervisor: "Vista del Supervisor",
    marketplaceTitle: "Experiencia del Mercado",
    marketplaceSubtitle:
      "Acceso a alimentos, educación, descubrimiento y compra se unen aquí.",
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
    footerLine:
      "Bronson Family Farm no solo cultiva cosechas. Cultiva comunidad.",
    guidedSteps: [
      "Bienvenido a Bronson Family Farm. Este es un sistema basado en lugar donde tierra, relaciones, alimentos y oportunidad trabajan juntos.",
      "Los visitantes conocen la historia, el ambiente y la misión de la finca. Esta es la puerta de entrada al ecosistema.",
      "Los clientes pasan del interés al acceso. Exploran alimentos frescos, educación nutricional, recetas y rutas al mercado.",
      "Los productores usan el ecosistema para planificación, producción, aprendizaje y oportunidad compartida.",
      "La fuerza laboral juvenil participa en aprendizaje práctico, desarrollo de habilidades y apoyos conectados al trabajo real.",
      "El mercado conecta productos, educación y participación comunitaria. Une toda la experiencia.",
    ],
    roleContent: {
      guest: {
        title: "Ruta del Visitante",
        intro:
          "Da la bienvenida a los visitantes a la historia, el lugar y el propósito de Bronson Family Farm.",
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
        intro:
          "Convierte el acceso a alimentos en una experiencia más rica de nutrición, educación y participación continua.",
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
        intro:
          "Apoya planificación, producción, aprendizaje y conexión dentro de un ecosistema agrícola compartido.",
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
        intro:
          "Apoya a creadores, vendedores y procesadores que transforman productos agrícolas en valor comunitario.",
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
        intro:
          "Conecta a jóvenes con trabajo, habilidades, mentoría y apoyo mediante experiencia práctica en la finca.",
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
        intro:
          "Refleja la visión de liderazgo sobre operaciones, alianzas, participación e impacto basado en lugar.",
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
        body:
          "Los jóvenes viven aprendizaje estructurado y real conectado con trabajo, naturaleza, disciplina, creatividad y comunidad.",
        bullets: [
          "Aprendizaje práctico y responsabilidad en la finca",
          "Confianza a través de contribución visible",
          "Exposición a trabajo en equipo, mercados y oportunidad",
        ],
      },
      parent: {
        title: "Portal para Padres",
        body:
          "Los padres pueden entender la ruta, ver el valor de la participación y conectarse con estructuras de apoyo.",
        bullets: [
          "Comunicación clara sobre expectativas",
          "Conexión familiar con progreso y oportunidad",
          "Puente más fuerte entre hogar y programa",
        ],
      },
      supervisor: {
        title: "Vista del Supervisor",
        body:
          "Existe solo dentro de la experiencia juvenil y apoya personal, responsabilidad y alineación de recursos.",
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
    appSubtitle:
      "Isang place-based system para sa pamilya, pagkain, kalusugan, at oportunidad",
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
    welcomeHeadline:
      "Higit pa sa isang farm. Isang buhay na sistemang nakaugat sa lupa, pamilya, pagkain, at hinaharap.",
    welcomeBody:
      "Pinagsasama ng Bronson Family Farm ang bisita, customer, grower, kabataan, producer, at partner sa iisang lugar kung saan ang ugnayan ay lumilikha ng resulta.",
    missionLabel: "Ano ang ginagawa ng lugar na ito",
    missionText:
      "Nagpapalago ito ng pagkain, tao, pamilya, lupa, oportunidad, at nagpapakita kung paano ang isang lugar ay makapagpapakilos ng isang buong ecosystem.",
    chooseLanguage: "Pumili ng wika",
    choosePathway: "Pumili ng pathway",
    pathwayHint:
      "Bawat pathway ay nagpapakita ng ibang karanasan sa loob ng ecosystem.",
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
    customerMarketplaceHint:
      "Maaaring dumiretso ang customer sa marketplace para sa ani, edukasyon, recipes, at pagbili.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Karanasan ng Kabataan",
    youthParent: "Portal ng Magulang",
    youthSupervisor: "View ng Supervisor",
    marketplaceTitle: "Karanasan sa Marketplace",
    marketplaceSubtitle:
      "Dito nagtatagpo ang access sa pagkain, edukasyon, tuklas, at pagbili.",
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
    footerLine:
      "Hindi lang pananim ang pinalalago ng Bronson Family Farm. Komunidad ang pinalalago nito.",
    guidedSteps: [
      "Maligayang pagdating sa Bronson Family Farm. Isa itong place-based system kung saan magkasamang gumagana ang lupa, ugnayan, pagkain, at oportunidad.",
      "Nararanasan ng mga bisita ang kuwento, kapaligiran, at layunin ng farm. Ito ang pagpasok sa ecosystem.",
      "Ang mga customer ay lumilipat mula interes tungo sa access. Tinutuklas nila ang sariwang pagkain, nutrition education, recipes, at marketplace pathways.",
      "Ginagamit ng mga grower ang ecosystem para sa pagpaplano, produksyon, pagkatuto, at pinagsasaluhang oportunidad.",
      "Ang youth workforce ay sumasali sa hands-on learning, skill-building, at support structures na konektado sa tunay na trabaho.",
      "Pinagdurugtong ng marketplace ang produkto, edukasyon, at partisipasyon ng komunidad. Pinagsasama nito ang buong karanasan.",
    ],
    roleContent: {
      guest: {
        title: "Pathway ng Bisita",
        intro:
          "Inaanyayahan nito ang mga bisita sa kuwento, lugar, at layunin ng Bronson Family Farm.",
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
        intro:
          "Ginagawang mas mayaman ang food access sa pamamagitan ng nourishment, education, at tuloy-tuloy na pakikilahok.",
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
        intro:
          "Sumusuporta sa planning, production, learning, at connection sa loob ng pinagsasaluhang agricultural ecosystem.",
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
        intro:
          "Sumusuporta sa makers, vendors, at processors na nagpapalawak ng halaga ng farm products para sa komunidad.",
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
        intro:
          "Ikinokonekta ang kabataan sa trabaho, skills, mentorship, at support sa pamamagitan ng hands-on farm experience.",
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
        intro:
          "Ipinapakita nito ang leadership view ng operations, partnerships, engagement, at place-based impact.",
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
        body:
          "Nakakaranas ang kabataan ng structured at real-world learning na nagdurugtong sa trabaho, kalikasan, disiplina, creativity, at komunidad.",
        bullets: [
          "Hands-on learning at responsibilidad sa farm",
          "Pagbuo ng kumpiyansa sa pamamagitan ng visible contribution",
          "Exposure sa teamwork, markets, at opportunity",
        ],
      },
      parent: {
        title: "Portal ng Magulang",
        body:
          "Nauunawaan ng mga magulang ang pathway at nakakakonekta sila sa support structures sa paligid ng paglago ng kabataan.",
        bullets: [
          "Malinaw na komunikasyon tungkol sa expectations",
          "Koneksyon ng pamilya sa progreso at oportunidad",
          "Mas matibay na tulay sa pagitan ng tahanan at programa",
        ],
      },
      supervisor: {
        title: "View ng Supervisor",
        body:
          "Ang supervisor view ay nasa loob lamang ng youth workforce experience at sumusuporta sa staffing, accountability, at resource alignment.",
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
    appSubtitle:
      "Un sistema territoriale per famiglia, cibo, benessere e opportunità",
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
    welcomeHeadline:
      "Più di una fattoria. Un sistema vivo radicato nella terra, nella famiglia, nel cibo e nel futuro.",
    welcomeBody:
      "Bronson Family Farm riunisce visitatori, clienti, coltivatori, giovani, produttori e partner in un unico luogo dove le relazioni generano risultati.",
    missionLabel: "Cosa fa questo luogo",
    missionText:
      "Coltiva cibo, sviluppa persone, rafforza famiglie, rigenera la terra, crea opportunità e dimostra come un solo luogo possa attivare un intero ecosistema.",
    chooseLanguage: "Scegli lingua",
    choosePathway: "Scegli un percorso",
    pathwayHint:
      "Ogni percorso rivela un’esperienza diversa dentro l’ecosistema.",
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
    customerMarketplaceHint:
      "I clienti possono entrare direttamente nel marketplace per prodotti, educazione, ricette e percorsi di acquisto.",
    youthModesLabel: "Viste della Forza Lavoro Giovanile",
    youthOverview: "Esperienza Giovani",
    youthParent: "Portale Genitori",
    youthSupervisor: "Vista Supervisore",
    marketplaceTitle: "Esperienza Marketplace",
    marketplaceSubtitle:
      "Accesso al cibo, educazione, scoperta e acquisto si incontrano qui.",
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
    footerLine:
      "Bronson Family Farm non sta semplicemente coltivando raccolti. Sta coltivando comunità.",
    guidedSteps: [
      "Benvenuti a Bronson Family Farm. Questo è un sistema territoriale dove terra, relazioni, cibo e opportunità lavorano insieme.",
      "Gli ospiti vivono la storia, l’atmosfera e la missione della fattoria. Questo è l’ingresso nell’ecosistema.",
      "I clienti passano dall’interesse all’accesso. Esplorano cibo fresco, educazione nutrizionale, ricette e percorsi di mercato.",
      "I coltivatori usano l’ecosistema per pianificazione, produzione, apprendimento e opportunità condivisa.",
      "La forza lavoro giovanile partecipa ad apprendimento pratico, sviluppo di competenze e strutture di supporto collegate al lavoro reale.",
      "Il marketplace collega prodotti, educazione e partecipazione della comunità. Riunisce l’intera esperienza.",
    ],
    roleContent: {
      guest: {
        title: "Percorso Ospite",
        intro:
          "Accoglie i visitatori nella storia, nel luogo e nello scopo di Bronson Family Farm.",
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
        intro:
          "Trasforma l’accesso al cibo in un’esperienza più ricca di nutrimento, educazione e partecipazione continua.",
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
        intro:
          "Supporta pianificazione, produzione, apprendimento e connessione dentro un ecosistema agricolo condiviso.",
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
        intro:
          "Supporta creatori, venditori e trasformatori che ampliano il valore dei prodotti agricoli per la comunità.",
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
        intro:
          "Collega i giovani a lavoro, competenze, tutoraggio e supporto attraverso esperienza pratica in fattoria.",
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
        intro:
          "Riflette la vista di leadership su operazioni, partnership, coinvolgimento e impatto territoriale.",
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
        body:
          "I giovani vivono un apprendimento strutturato e reale che collega lavoro, natura, disciplina, creatività e comunità.",
        bullets: [
          "Apprendimento pratico e responsabilità in fattoria",
          "Costruzione della fiducia attraverso contributo visibile",
          "Esposizione a teamwork, mercati e opportunità",
        ],
      },
      parent: {
        title: "Portale Genitori",
        body:
          "I genitori possono capire il percorso, vedere il valore della partecipazione e connettersi alle strutture di supporto.",
        bullets: [
          "Comunicazione chiara sulle aspettative",
          "Connessione familiare con progresso e opportunità",
          "Ponte più forte tra casa e programma",
        ],
      },
      supervisor: {
        title: "Vista Supervisore",
        body:
          "Esiste solo dentro l’esperienza giovanile e supporta personale, responsabilità e allineamento delle risorse.",
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
    appSubtitle:
      "A one place system fi family, food, wellness, an opportunity",
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
    welcomeHeadline:
      "Dis more than farm. A living system weh root inna land, family, food, an future.",
    welcomeBody:
      "Bronson Family Farm bring together guest, customer, grower, youth, producer, an partner inna one place weh relationship create result.",
    missionLabel: "Wah dis place do",
    missionText:
      "It grow food, build people, strengthen family, restore land, create opportunity, an show how one place can activate one whole ecosystem.",
    chooseLanguage: "Choose language",
    choosePathway: "Choose pathway",
    pathwayHint:
      "Every pathway show yuh a different part a di ecosystem.",
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
    customerMarketplaceHint:
      "Customer can move straight ina di marketplace fi produce, education, recipe, an buying pathway.",
    youthModesLabel: "Youth Workforce Views",
    youthOverview: "Youth Experience",
    youthParent: "Parent Portal",
    youthSupervisor: "Supervisor View",
    marketplaceTitle: "Marketplace Experience",
    marketplaceSubtitle:
      "Food access, education, discovery, an buying pathway link up yah so.",
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
    footerLine:
      "Bronson Family Farm nah just grow crop. It a grow community.",
    guidedSteps: [
      "Welcome to Bronson Family Farm. Dis a one place system weh bring land, relationship, food, an opportunity together.",
      "Guest get di story, di atmosphere, an di mission a di farm. Dis a di front door to di ecosystem.",
      "Customer move from interest to access. Dem explore fresh food, nutrition education, recipe, an marketplace pathway.",
      "Grower use di ecosystem fi planning, production, learning, an shared opportunity.",
      "Youth workforce participants get hands-on learning, skill-building, an support connected to real work.",
      "Di marketplace connect product, education, an community participation. It pull di full experience together.",
    ],
    roleContent: {
      guest: {
        title: "Guest Pathway",
        intro:
          "Dis pathway welcome visitor into di story, place, an purpose a Bronson Family Farm.",
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
        intro:
          "Dis pathway turn food access into a richer experience a nourishment, education, an ongoing participation.",
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
        intro:
          "Dis pathway support planning, production, learning, an connection ina one shared agricultural ecosystem.",
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
        intro:
          "Dis pathway support maker, vendor, an processor weh help turn farm product into wider community value.",
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
        intro:
          "Dis pathway link young people to work, skills, mentorship, an support through hands-on farm experience.",
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
        intro:
          "Dis pathway show di leadership view a operations, partnership, engagement, an place-based impact.",
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
        body:
          "Young people get structured real-world learning weh connect work, nature, discipline, creativity, an community.",
        bullets: [
          "Hands-on learning an farm responsibility",
          "Confidence through visible contribution",
          "Exposure to teamwork, market, an opportunity",
        ],
      },
      parent: {
        title: "Parent Portal",
        body:
          "Parent can understand di pathway, see di value, an connect wid support around youth growth.",
        bullets: [
          "Clear communication bout expectation",
          "Family connection to progress an opportunity",
          "Stronger bridge between home an program",
        ],
      },
      supervisor: {
        title: "Supervisor View",
        body:
          "Dis only live inside di youth workforce experience an support staffing, accountability, an resource alignment.",
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
    appSubtitle:
      "מערכת מבוססת מקום למשפחה, מזון, רווחה והזדמנות",
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
    welcomeHeadline:
      "יותר מחווה. מערכת חיה המושרשת באדמה, במשפחה, במזון ובעתיד.",
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
    customerMarketplaceHint:
      "לקוחות יכולים לעבור ישירות לשוק לתוצרת, חינוך, מתכונים ונתיבי רכישה.",
    youthModesLabel: "תצוגות כוח עבודה לנוער",
    youthOverview: "חוויית נוער",
    youthParent: "פורטל הורים",
    youthSupervisor: "תצוגת מפקח",
    marketplaceTitle: "חוויית שוק",
    marketplaceSubtitle:
      "גישה למזון, חינוך, גילוי ורכישה נפגשים כאן.",
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
    footerLine:
      "Bronson Family Farm לא רק מגדלת יבולים. היא מגדלת קהילה.",
    guidedSteps: [
      "ברוכים הבאים ל Bronson Family Farm. זוהי מערכת מבוססת מקום שבה אדמה, יחסים, מזון והזדמנות פועלים יחד.",
      "אורחים חווים את הסיפור, האווירה והשליחות של החווה. זהו שער הכניסה למערכת.",
      "לקוחות עוברים מעניין לגישה. הם מגלים מזון טרי, חינוך תזונתי, מתכונים ונתיבי שוק.",
      "מגדלים משתמשים במערכת לתכנון, ייצור, למידה והזדמנות משותפת.",
      "משתתפי כוח העבודה לנוער מקבלים למידה מעשית, פיתוח מיומנויות ומבני תמיכה המחוברים לעבודה אמיתית.",
      "השוק מחבר מוצרים, חינוך והשתתפות קהילתית. הוא מאחד את כל החוויה.",
    ],
    roleContent: {
      guest: {
        title: "מסלול אורח",
        intro:
          "מסלול זה מקבל את פני המבקרים לסיפור, למקום ולמטרה של Bronson Family Farm.",
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
        intro:
          "מסלול זה הופך גישה למזון לחוויה עשירה יותר של הזנה, חינוך והשתתפות מתמשכת.",
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
        intro:
          "מסלול זה תומך בתכנון, ייצור, למידה וחיבור בתוך מערכת חקלאית משותפת.",
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
        intro:
          "מסלול זה תומך ביצרנים, ספקים ומעבדים שמרחיבים את ערך מוצרי החווה לקהילה.",
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
        intro:
          "מסלול זה מחבר צעירים לעבודה, מיומנויות, חונכות ותמיכה דרך חוויית חווה מעשית.",
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
        intro:
          "מסלול זה משקף את מבט ההנהגה על תפעול, שותפויות, מעורבות והשפעה מבוססת מקום.",
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
        body:
          "צעירים חווים למידה מובנית ומציאותית המחברת עבודה, טבע, משמעת, יצירתיות וקהילה.",
        bullets: [
          "למידה מעשית ואחריות בחווה",
          "בניית ביטחון דרך תרומה נראית לעין",
          "חשיפה לעבודת צוות, שווקים והזדמנות",
        ],
      },
      parent: {
        title: "פורטל הורים",
        body:
          "הורים יכולים להבין את המסלול, לראות את ערך ההשתתפות ולהתחבר למבני התמיכה סביב צמיחת הנוער.",
        bullets: [
          "תקשורת ברורה לגבי ציפיות",
          "חיבור משפחתי להתקדמות ולהזדמנות",
          "גשר חזק יותר בין הבית לתוכנית",
        ],
      },
      supervisor: {
        title: "תצוגת מפקח",
        body:
          "תצוגה זו קיימת רק בתוך חוויית כוח העבודה לנוער ותומכת בכוח אדם, אחריות ויישור משאבים.",
        bullets: [
          "פיקוח ותמיכה לפי תפקיד",
          "מודעות להתקדמות ותכנון התערבות",
          "תיאום עם משאבי תמיכה בעת הצורך",
        ],
      },
    },
  },
};

function useLocalClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);

  const stop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    utterancesRef.current = [];
    setEnabled(false);
  };

  const speakSequence = (
    text: string,
    lang: string,
    onComplete?: () => void
  ) => {
    if (!("speechSynthesis" in window)) {
      onComplete?.();
      return;
    }

    window.speechSynthesis.cancel();
    utterancesRef.current = [];

    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      onComplete?.();
      return;
    }

    let index = 0;

    const speakNext = () => {
      if (index >= parts.length) {
        onComplete?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(parts[index]);
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        index += 1;
        speakNext();
      };

      utterance.onerror = () => {
        index += 1;
        speakNext();
      };

      utterancesRef.current.push(utterance);
      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  return { enabled, setEnabled, speakSequence, stop };
}

const speechCodes: Record<LanguageKey, string> = {
  en: "en-US",
  es: "es-US",
  tl: "fil-PH",
  it: "it-IT",
  patwa: "en-JM",
  he: "he-IL",
};

function getSeasonPulse(date: Date) {
  const month = date.getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "Planning, visioning, protected growth";
  if ([3, 4, 5].includes(month)) return "Seedtime, preparation, early expansion";
  if ([6, 7, 8].includes(month)) return "Peak growth, learning, markets, activity";
  return "Harvest rhythm, transition, storage, next-cycle design";
}

function formatLocalTime(date: Date, language: LanguageKey) {
  try {
    return new Intl.DateTimeFormat(language === "he" ? "he-IL" : "en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

function gradientForRole(role: RoleKey | "entrance" | "marketplace") {
  switch (role) {
    case "entrance":
      return "linear-gradient(135deg, #0b1f16 0%, #224d37 45%, #8e7d42 100%)";
    case "guest":
      return "linear-gradient(135deg, #1e2d1f 0%, #35563d 50%, #9e8c58 100%)";
    case "customer":
      return "linear-gradient(135deg, #14322a 0%, #26704e 50%, #d6a84c 100%)";
    case "grower":
      return "linear-gradient(135deg, #102615 0%, #2f6d3a 55%, #9cb85f 100%)";
    case "producer":
      return "linear-gradient(135deg, #2c1b12 0%, #70523a 50%, #c49b64 100%)";
    case "youth":
      return "linear-gradient(135deg, #142033 0%, #285f74 50%, #79a96d 100%)";
    case "admin":
      return "linear-gradient(135deg, #201625 0%, #3f3d64 50%, #8073a9 100%)";
    case "marketplace":
      return "linear-gradient(135deg, #201710 0%, #5f4625 50%, #b98a38 100%)";
  }
}

function getImageForScreen(screen: ScreenKey, role: RoleKey) {
  if (screen === "entrance") return "/GrowArea.jpg";
  if (screen === "marketplace") return "/GrowArea2.jpg";
  return roleCards.find((r) => r.key === role)?.image || "/GrowArea.jpg";
}

function GlassCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(8, 12, 10, 0.50)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 28,
        backdropFilter: "blur(14px)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
        overflow: "hidden",
      }}
    >
      {title ? (
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.82)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  active = false,
  primary = false,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 18px",
        borderRadius: 16,
        border: primary
          ? "1px solid rgba(255,255,255,0.0)"
          : active
          ? "1px solid rgba(199, 255, 190, 0.8)"
          : "1px solid rgba(255,255,255,0.14)",
        background: primary
          ? "#dff3c7"
          : active
          ? "rgba(171, 239, 146, 0.18)"
          : "rgba(255,255,255,0.10)",
        color: primary ? "#102012" : "#ffffff",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        boxShadow: primary ? "0 10px 22px rgba(171, 239, 146, 0.25)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.92)",
        fontSize: 12,
        fontWeight: 600,
        backdropFilter: "blur(10px)",
      }}
    >
      {text}
    </span>
  );
}

function InfoBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: 16,
        color: "rgba(255,255,255,0.92)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function RoleTile({
  title,
  intro,
  image,
  icon,
  active,
  onClick,
}: {
  title: string;
  intro: string;
  image: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: active
          ? "1px solid rgba(201,255,185,0.82)"
          : "1px solid rgba(255,255,255,0.10)",
        borderRadius: 26,
        overflow: "hidden",
        background: "rgba(255,255,255,0.05)",
        cursor: "pointer",
        textAlign: "left",
        boxShadow: active ? "0 0 0 1px rgba(201,255,185,0.18)" : "none",
      }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {!imgError ? (
          <img
            src={image}
            alt={title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 0.92,
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #19341f 0%, #3c6f4e 55%, #9e8c58 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {icon}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            bottom: 16,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              lineHeight: 1.15,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 8,
              color: "rgba(255,255,255,0.88)",
              fontSize: 14,
              lineHeight: 1.45,
              textShadow: "0 2px 10px rgba(0,0,0,0.45)",
            }}
          >
            {intro}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [screen, setScreen] = useState<ScreenKey>("entrance");
  const [selectedRole, setSelectedRole] = useState<RoleKey>("guest");
  const [youthView, setYouthView] = useState<YouthView>("overview");
  const [tourIndex, setTourIndex] = useState(0);

  const t = translations[language];
  const clock = useLocalClock();
  const speech = useSpeech();
  const tourAdvanceTimeoutRef = useRef<number | null>(null);

  const roleContent = t.roleContent[selectedRole];
  const youthContent = t.youthContent[youthView];
  const currentImage = getImageForScreen(screen, selectedRole);

  const timeText = useMemo(() => formatLocalTime(clock, language), [clock, language]);
  const seasonText = getSeasonPulse(clock);

  useEffect(() => {
    if (!speech.enabled) return;

    if (tourAdvanceTimeoutRef.current) {
      window.clearTimeout(tourAdvanceTimeoutRef.current);
    }

    speech.speakSequence(
      t.guidedSteps[tourIndex],
      speechCodes[language],
      () => {
        tourAdvanceTimeoutRef.current = window.setTimeout(() => {
          setTourIndex((prev) => (prev + 1) % t.guidedSteps.length);
        }, 900);
      }
    );

    return () => {
      if (tourAdvanceTimeoutRef.current) {
        window.clearTimeout(tourAdvanceTimeoutRef.current);
      }
    };
  }, [speech.enabled, tourIndex, language, t.guidedSteps]);

  useEffect(() => {
    if (!speech.enabled) return;

    if (tourIndex === 0) {
      setScreen("entrance");
    } else if (tourIndex === 1) {
      setScreen("role");
      setSelectedRole("guest");
    } else if (tourIndex === 2) {
      setScreen("role");
      setSelectedRole("customer");
    } else if (tourIndex === 3) {
      setScreen("role");
      setSelectedRole("grower");
    } else if (tourIndex === 4) {
      setScreen("role");
      setSelectedRole("youth");
      setYouthView("overview");
    } else {
      setScreen("marketplace");
    }
  }, [tourIndex, speech.enabled]);

  useEffect(() => {
    return () => {
      speech.stop();
      if (tourAdvanceTimeoutRef.current) {
        window.clearTimeout(tourAdvanceTimeoutRef.current);
      }
    };
  }, []);

  const startTour = () => {
    if (tourAdvanceTimeoutRef.current) {
      window.clearTimeout(tourAdvanceTimeoutRef.current);
    }
    setTourIndex(0);
    speech.setEnabled(true);
    setScreen("entrance");
  };

  const stopTour = () => {
    if (tourAdvanceTimeoutRef.current) {
      window.clearTimeout(tourAdvanceTimeoutRef.current);
    }
    speech.stop();
  };

  const openRole = (role: RoleKey) => {
    setSelectedRole(role);
    setScreen("role");
    if (role === "youth") setYouthView("overview");
  };

  const pageBg = gradientForRole(
    screen === "entrance" ? "entrance" : screen === "marketplace" ? "marketplace" : selectedRole
  );

  const [imgError, setImgError] = useState(false);

  return (
    <div
      dir={t.dir}
      style={{
        minHeight: "100vh",
        fontFamily: 'Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#ffffff",
        background: pageBg,
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        {!imgError ? (
          <img
            src={currentImage}
            alt="background"
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.38,
              transform: "scale(1.03)",
            }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(3,8,6,0.40), rgba(3,8,6,0.62), rgba(3,8,6,0.84))",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "22px 18px 40px",
        }}
      >
        <div
          style={{
            background: "rgba(6, 10, 8, 0.40)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 28,
            padding: 22,
            backdropFilter: "blur(16px)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ minWidth: 280, flex: "1 1 520px" }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                <Pill text={t.heroKicker} />
                <Pill text={t.placeBased} />
                <Pill text={`${t.seasonPulse}: ${seasonText}`} />
              </div>

              <div
                style={{
                  fontSize: 46,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                {t.appTitle}
              </div>

              <div
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 760,
                }}
              >
                {t.appSubtitle}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <ActionButton label={t.backToEntrance} onClick={() => setScreen("entrance")} />
              <ActionButton label={t.exploreRoles} onClick={() => setScreen("role")} />
              <ActionButton label={t.openMarketplace} onClick={() => setScreen("marketplace")} />
              {!speech.enabled ? (
                <ActionButton label={t.guidedDemo} onClick={startTour} primary />
              ) : (
                <ActionButton label={t.stopGuidedDemo} onClick={stopTour} primary />
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(320px, 1fr)",
            gap: 22,
            marginTop: 22,
          }}
        >
          <div style={{ minWidth: 0 }}>
            {screen === "entrance" && (
              <>
                <GlassCard>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 16,
                    }}
                  >
                    <Pill text={`${t.localTime}: ${timeText}`} />
                    <Pill text={t.chooseLanguage} />
                  </div>

                  <div
                    style={{
                      fontSize: 58,
                      fontWeight: 900,
                      lineHeight: 1.02,
                      letterSpacing: "-0.04em",
                      maxWidth: 940,
                    }}
                  >
                    {t.welcomeHeadline}
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      maxWidth: 920,
                      fontSize: 20,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.86)",
                    }}
                  >
                    {t.welcomeBody}
                  </div>

                  <div
                    style={{
                      marginTop: 28,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {(Object.keys(translations) as LanguageKey[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        style={{
                          padding: "14px 14px",
                          borderRadius: 18,
                          border:
                            language === lang
                              ? "1px solid rgba(219,255,201,0.9)"
                              : "1px solid rgba(255,255,255,0.14)",
                          background:
                            language === lang
                              ? "#dff3c7"
                              : "rgba(255,255,255,0.10)",
                          color: language === lang ? "#112114" : "#ffffff",
                          cursor: "pointer",
                          fontWeight: 800,
                          textAlign: "center",
                        }}
                      >
                        <div style={{ fontSize: 15 }}>{translations[lang].languageName}</div>
                        <div
                          style={{
                            marginTop: 4,
                            fontSize: 12,
                            opacity: 0.8,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {lang.toUpperCase()}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: 28,
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <ActionButton
                      label={t.enterDemo}
                      onClick={() => {
                        setScreen("role");
                        setSelectedRole("guest");
                      }}
                      primary
                    />
                    <ActionButton label={t.guidedDemo} onClick={startTour} />
                  </div>
                </GlassCard>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: 22,
                    marginTop: 22,
                  }}
                >
                  <GlassCard title={t.missionLabel}>
                    <div style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.88)" }}>
                      {t.missionText}
                    </div>
                  </GlassCard>

                  <GlassCard title={t.livePanelTitle}>
                    <div style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.88)" }}>
                      {t.livePanelText}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginTop: 18,
                      }}
                    >
                      <InfoBlock>
                        <div
                          style={{
                            fontSize: 12,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.62)",
                            marginBottom: 8,
                          }}
                        >
                          {t.localTime}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{timeText}</div>
                      </InfoBlock>

                      <InfoBlock>
                        <div
                          style={{
                            fontSize: 12,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.62)",
                            marginBottom: 8,
                          }}
                        >
                          {t.seasonPulse}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800 }}>{seasonText}</div>
                      </InfoBlock>
                    </div>
                  </GlassCard>
                </div>
              </>
            )}

            {screen === "role" && (
              <>
                <GlassCard>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                    <Pill text={t.roleTitle} />
                    <Pill text={roleContent.title} />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.8fr)",
                      gap: 22,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 52,
                          fontWeight: 900,
                          lineHeight: 1.05,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {roleContent.title}
                      </div>

                      <div
                        style={{
                          marginTop: 18,
                          fontSize: 20,
                          lineHeight: 1.7,
                          color: "rgba(255,255,255,0.86)",
                          maxWidth: 800,
                        }}
                      >
                        {roleContent.intro}
                      </div>

                      <div
                        style={{
                          marginTop: 24,
                          display: "flex",
                          gap: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <ActionButton label={t.backToEntrance} onClick={() => setScreen("entrance")} />
                        {selectedRole === "customer" ? (
                          <ActionButton label={t.openMarketplace} onClick={() => setScreen("marketplace")} primary />
                        ) : null}
                      </div>
                    </div>

                    <InfoBlock>
                      <div
                        style={{
                          fontSize: 12,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.62)",
                          marginBottom: 10,
                        }}
                      >
                        {t.roleIntroLabel}
                      </div>
                      <div style={{ fontSize: 18, lineHeight: 1.75, color: "rgba(255,255,255,0.88)" }}>
                        {roleContent.intro}
                      </div>
                    </InfoBlock>
                  </div>
                </GlassCard>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 22,
                    marginTop: 22,
                  }}
                >
                  <GlassCard title={t.roleActionsLabel}>
                    <div style={{ display: "grid", gap: 12 }}>
                      {roleContent.actions.map((item) => (
                        <InfoBlock key={item}>{item}</InfoBlock>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard title={t.roleOutcomesLabel}>
                    <div style={{ display: "grid", gap: 12 }}>
                      {roleContent.outcomes.map((item) => (
                        <InfoBlock key={item}>{item}</InfoBlock>
                      ))}
                    </div>

                    {selectedRole === "customer" ? (
                      <div
                        style={{
                          marginTop: 16,
                          padding: 16,
                          borderRadius: 20,
                          background: "rgba(184, 231, 143, 0.12)",
                          border: "1px solid rgba(212,255,185,0.28)",
                          color: "#edfbe0",
                          lineHeight: 1.7,
                        }}
                      >
                        {t.customerMarketplaceHint}
                      </div>
                    ) : null}
                  </GlassCard>
                </div>

                {selectedRole === "youth" && (
                  <div style={{ marginTop: 22 }}>
                    <GlassCard title={t.youthModesLabel}>
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          flexWrap: "wrap",
                          marginBottom: 18,
                        }}
                      >
                        <ActionButton
                          label={t.youthOverview}
                          onClick={() => setYouthView("overview")}
                          active={youthView === "overview"}
                        />
                        <ActionButton
                          label={t.youthParent}
                          onClick={() => setYouthView("parent")}
                          active={youthView === "parent"}
                        />
                        <ActionButton
                          label={t.youthSupervisor}
                          onClick={() => setYouthView("supervisor")}
                          active={youthView === "supervisor"}
                        />
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 0.9fr)",
                          gap: 20,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: 34,
                              fontWeight: 900,
                              lineHeight: 1.1,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {youthContent.title}
                          </div>
                          <div
                            style={{
                              marginTop: 14,
                              fontSize: 18,
                              lineHeight: 1.8,
                              color: "rgba(255,255,255,0.86)",
                            }}
                          >
                            {youthContent.body}
                          </div>
                        </div>

                        <div style={{ display: "grid", gap: 12 }}>
                          {youthContent.bullets.map((item) => (
                            <InfoBlock key={item}>{item}</InfoBlock>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                )}
              </>
            )}

            {screen === "marketplace" && (
              <>
                <GlassCard>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                    <Pill text={t.marketplaceTitle} />
                    <Pill text={t.placeBased} />
                  </div>

                  <div
                    style={{
                      fontSize: 52,
                      fontWeight: 900,
                      lineHeight: 1.05,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {t.marketplaceTitle}
                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      maxWidth: 880,
                      fontSize: 20,
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.86)",
                    }}
                  >
                    {t.marketplaceSubtitle}
                  </div>

                  <div
                    style={{
                      marginTop: 24,
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <ActionButton
                      label={t.returnToRoles}
                      onClick={() => {
                        setScreen("role");
                        setSelectedRole("customer");
                      }}
                    />
                    <ActionButton
                      label={t.backToEntrance}
                      onClick={() => setScreen("entrance")}
                      primary
                    />
                  </div>
                </GlassCard>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: 22,
                    marginTop: 22,
                  }}
                >
                  {t.marketplaceBlocks.map((block) => (
                    <GlassCard key={block.title} title={block.title}>
                      <div style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.88)" }}>
                        {block.body}
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div style={{ marginTop: 22 }}>
                  <GlassCard title={t.storyTitle}>
                    <div style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.88)" }}>
                      {t.storyBody}
                    </div>
                  </GlassCard>
                </div>
              </>
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <GlassCard title={t.choosePathway}>
              <div
                style={{
                  color: "rgba(255,255,255,0.74)",
                  fontSize: 15,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {t.pathwayHint}
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {roleCards.map((role) => {
                  const content = t.roleContent[role.key];
                  const active = screen === "role" && selectedRole === role.key;
                  return (
                    <RoleTile
                      key={role.key}
                      title={content.title}
                      intro={content.intro}
                      image={role.image}
                      icon={role.icon}
                      active={active}
                      onClick={() => openRole(role.key)}
                    />
                  );
                })}
              </div>
            </GlassCard>

            <div style={{ marginTop: 22 }}>
              <GlassCard title={t.impactTitle}>
                <div style={{ display: "grid", gap: 12 }}>
                  {t.impactCards.map((item) => (
                    <InfoBlock key={item}>{item}</InfoBlock>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div
              style={{
                marginTop: 22,
                background: "rgba(6, 10, 8, 0.44)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 24,
                padding: 20,
                color: "rgba(255,255,255,0.92)",
                lineHeight: 1.8,
                fontSize: 17,
                fontWeight: 700,
                backdropFilter: "blur(12px)",
              }}
            >
              {t.footerLine}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
