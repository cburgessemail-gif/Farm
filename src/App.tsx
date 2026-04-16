import React, { useState } from "react";

type Lang = "en" | "es" | "tl" | "it" | "patwa" | "he";
type Section = "home" | "grow" | "shop" | "story" | "workforce" | "community" | "events";

const imagePaths: Record<string, string> = {
  hero: "/GrowArea.jpg",
  grow: "/GrowArea.jpg",
  shop: "/GrowArea.jpg",
  story: "/GrowArea2.jpg",
  workforce: "/GrowArea2.jpg",
  community: "/GrowArea2.jpg",
  events: "/GrowArea2.jpg",
};

const labels = {
  en: {
    title: "Bronson Family Farm",
    subtitle:
      "A living ecosystem rooted in food, family, land, learning, and opportunity.",
    intro:
      "Bronson Family Farm connects food, family, workforce, wellness, and community participation through a living land-based system.",
    enter: "Enter the Ecosystem",
    back: "← Back to Ecosystem",
    preview: "Explore the ecosystem",
    askTitle: "Why this matters",
    askText:
      "Bronson Family Farm is building a working ecosystem where land, learning, food access, workforce development, and community renewal grow together.",
    askButton: "View the Opportunity",
    openShop: "Open GrownBy Shop",
    returnHome: "Return to Ecosystem",
    supportButton: "Support the Ecosystem",
    modulesTitle: "Core Ecosystem Modules",
    modules: {
      why: {
        title: "Why This Matters",
        text:
          "Food access, land stewardship, youth opportunity, and community renewal are being developed together instead of separately.",
      },
      build: {
        title: "What We Are Building",
        text:
          "A living ecosystem in Youngstown that connects production, education, family engagement, workforce pathways, commerce, and public activation.",
      },
      partner: {
        title: "Opportunity to Partner",
        text:
          "Aligned support can expand infrastructure, irrigation, equipment, programming, and the physical capacity needed to activate this ecosystem at scale.",
      },
      pathways: {
        title: "Live Pathways",
        text:
          "Grow, Shop, Story, Workforce, Community, and Events all connect to one unified experience instead of functioning as separate pieces.",
      },
    },
    sections: {
      grow: "Grow",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
    },
    sectionText: {
      grow: "Crop planning, production, and stewardship.",
      shop: "Fresh goods and live purchasing pathways.",
      story: "History, vision, place, and purpose.",
      workforce: "Youth opportunity and practical learning.",
      community: "Volunteers, families, and partners.",
      events: "Markets, tours, and activation.",
    },
    details: {
      grow:
        "Explore crop planning, planting flow, growing capacity, irrigation thinking, and the systems needed to sustain real farm production.",
      shop:
        "This area represents fresh goods, value-added offerings, and the path from ecosystem visibility to real purchasing through Bronson Family Farm.",
      story:
        "Bronson Family Farm is more than a farm. It is a community-rooted vision shaped by legacy, land, service, and the belief that renewal can grow from place.",
      workforce:
        "This area highlights youth opportunity, hands-on learning, responsibility, confidence-building, and practical pathways into future work and leadership.",
      community:
        "This section shows how volunteers, families, supporters, institutions, and local partners can step into the ecosystem in meaningful ways.",
      events:
        "This area highlights markets, tours, public demonstrations, educational gatherings, and the visible activation of the full ecosystem.",
    },
    supportTitle: "Partner with Bronson Family Farm",
    supportText:
      "Support can help expand infrastructure, irrigation, equipment, programming, and the long-term operating capacity needed to activate this ecosystem at scale.",
    moduleButtons: {
      grow: "Open Grow",
      shop: "Open Shop",
      story: "Open Story",
      workforce: "Open Workforce",
      community: "Open Community",
      events: "Open Events",
    },
  },

  es: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo con raíces en la comida, la familia, la tierra y la oportunidad.",
    intro:
      "Bronson Family Farm conecta alimentos, familia, trabajo, bienestar y participación comunitaria a través de un sistema vivo basado en la tierra.",
    enter: "Entrar al Ecosistema",
    back: "← Volver al Ecosistema",
    preview: "Explorar el ecosistema",
    askTitle: "Por qué importa",
    askText:
      "Bronson Family Farm está construyendo un ecosistema vivo donde la tierra, el aprendizaje, el acceso a alimentos, el desarrollo laboral y la renovación comunitaria crecen juntos.",
    askButton: "Ver la Oportunidad",
    openShop: "Abrir tienda GrownBy",
    returnHome: "Volver al Ecosistema",
    supportButton: "Apoyar el Ecosistema",
    modulesTitle: "Módulos Principales del Ecosistema",
    modules: {
      why: {
        title: "Por Qué Importa",
        text:
          "El acceso a alimentos, el cuidado de la tierra, la oportunidad juvenil y la renovación comunitaria se desarrollan juntos, no por separado.",
      },
      build: {
        title: "Lo Que Estamos Construyendo",
        text:
          "Un ecosistema vivo en Youngstown que conecta producción, educación, participación familiar, rutas laborales, comercio y activación pública.",
      },
      partner: {
        title: "Oportunidad de Colaborar",
        text:
          "El apoyo alineado puede ampliar infraestructura, riego, equipos, programación y la capacidad física necesaria para activar este ecosistema a gran escala.",
      },
      pathways: {
        title: "Rutas Vivas",
        text:
          "Cultivar, Comprar, Historia, Trabajo, Comunidad y Eventos se conectan en una sola experiencia unificada.",
      },
    },
    sections: {
      grow: "Cultivar",
      shop: "Comprar",
      story: "Historia",
      workforce: "Trabajo",
      community: "Comunidad",
      events: "Eventos",
    },
    sectionText: {
      grow: "Planificación de cultivos, producción y cuidado.",
      shop: "Productos frescos y rutas reales de compra.",
      story: "Historia, visión, lugar y propósito.",
      workforce: "Oportunidad juvenil y aprendizaje práctico.",
      community: "Voluntarios, familias y aliados.",
      events: "Mercados, recorridos y activación.",
    },
    details: {
      grow:
        "Explore la planificación de cultivos, el flujo de siembra, la capacidad de producción y los sistemas necesarios para sostener una granja real.",
      shop:
        "Esta área representa productos frescos, ofertas con valor agregado y el camino desde la visibilidad del ecosistema hasta la compra real.",
      story:
        "Bronson Family Farm es más que una granja. Es una visión comunitaria formada por legado, tierra, servicio y la creencia de que la renovación puede crecer desde el lugar.",
      workforce:
        "Esta área destaca la oportunidad juvenil, el aprendizaje práctico, la responsabilidad y las rutas hacia el trabajo y el liderazgo futuros.",
      community:
        "Esta sección muestra cómo voluntarios, familias, instituciones y aliados locales pueden entrar al ecosistema de manera significativa.",
      events:
        "Esta área destaca mercados, recorridos, demostraciones públicas, encuentros educativos y la activación visible del ecosistema completo.",
    },
    supportTitle: "Asóciese con Bronson Family Farm",
    supportText:
      "El apoyo puede ayudar a ampliar infraestructura, riego, equipos, programación y la capacidad operativa a largo plazo necesaria para activar este ecosistema a escala.",
    moduleButtons: {
      grow: "Abrir Cultivar",
      shop: "Abrir Comprar",
      story: "Abrir Historia",
      workforce: "Abrir Trabajo",
      community: "Abrir Comunidad",
      events: "Abrir Eventos",
    },
  },

  tl: {
    title: "Bronson Family Farm",
    subtitle:
      "Isang buhay na ecosystem na nakaugat sa pagkain, pamilya, lupa, pagkatuto, at oportunidad.",
    intro:
      "Pinagdurugtong ng Bronson Family Farm ang pagkain, pamilya, trabaho, kalusugan, at pakikilahok ng komunidad sa pamamagitan ng isang buhay na sistemang nakabatay sa lupa.",
    enter: "Pumasok sa Ecosystem",
    back: "← Bumalik sa Ecosystem",
    preview: "Tuklasin ang ecosystem",
    askTitle: "Bakit ito mahalaga",
    askText:
      "Ang Bronson Family Farm ay bumubuo ng isang gumaganang ecosystem kung saan sabay-sabay na lumalago ang lupa, pagkatuto, access sa pagkain, pag-unlad sa trabaho, at pagbangon ng komunidad.",
    askButton: "Tingnan ang Oportunidad",
    openShop: "Buksan ang GrownBy Shop",
    returnHome: "Bumalik sa Ecosystem",
    supportButton: "Suportahan ang Ecosystem",
    modulesTitle: "Pangunahing Mga Module ng Ecosystem",
    modules: {
      why: {
        title: "Bakit Mahalaga Ito",
        text:
          "Ang access sa pagkain, pangangalaga sa lupa, oportunidad para sa kabataan, at pagbangon ng komunidad ay pinauunlad nang magkakasama.",
      },
      build: {
        title: "Ano ang Binubuo Namin",
        text:
          "Isang buhay na ecosystem sa Youngstown na nag-uugnay sa produksyon, edukasyon, pamilya, hanapbuhay, kalakalan, at pampublikong aktibasyon.",
      },
      partner: {
        title: "Oportunidad na Makipagpartner",
        text:
          "Ang suportang naaayon sa layunin ay makakatulong sa imprastraktura, irigasyon, kagamitan, programming, at kapasidad na kailangan upang mapalago ang ecosystem na ito.",
      },
      pathways: {
        title: "Buhay na mga Daan",
        text:
          "Ang Pagtatanim, Pamimili, Kuwento, Hanapbuhay, Komunidad, at Mga Kaganapan ay bahagi ng iisang nagkakaisang karanasan.",
      },
    },
    sections: {
      grow: "Pagtatanim",
      shop: "Pamimili",
      story: "Kuwento",
      workforce: "Hanapbuhay",
      community: "Komunidad",
      events: "Mga Kaganapan",
    },
    sectionText: {
      grow: "Pagpaplano ng tanim, produksyon, at pangangalaga.",
      shop: "Sariwang produkto at tunay na daan sa pagbili.",
      story: "Kasaysayan, bisyon, lugar, at layunin.",
      workforce: "Oportunidad para sa kabataan at praktikal na pagkatuto.",
      community: "Mga boluntaryo, pamilya, at mga katuwang.",
      events: "Mga pamilihan, pagbisita, at aktibasyon.",
    },
    details: {
      grow:
        "Tuklasin ang pagpaplano ng tanim, daloy ng pagtatanim, kapasidad ng produksyon, pag-iisip sa irigasyon, at mga sistemang kailangan upang mapanatili ang tunay na produksyon sa bukid.",
      shop:
        "Kinakatawan ng bahaging ito ang sariwang produkto, value-added offerings, at ang daan mula sa pagkakakilala sa ecosystem hanggang sa aktuwal na pagbili sa Bronson Family Farm.",
      story:
        "Ang Bronson Family Farm ay higit pa sa isang bukid. Isa itong pananaw na nakaugat sa komunidad na hinubog ng pamana, lupa, paglilingkod, at paniniwalang ang pagbangon ay maaaring lumago mula sa lugar.",
      workforce:
        "Itinatampok ng bahaging ito ang oportunidad para sa kabataan, hands-on na pagkatuto, pananagutan, pagbuo ng kumpiyansa, at praktikal na landas tungo sa trabaho at pamumuno sa hinaharap.",
      community:
        "Ipinapakita ng bahaging ito kung paano makakapasok nang makabuluhan sa ecosystem ang mga boluntaryo, pamilya, tagasuporta, institusyon, at lokal na katuwang.",
      events:
        "Itinatampok ng bahaging ito ang mga pamilihan, pagbisita, pampublikong demonstrasyon, pang-edukasyong pagtitipon, at ang nakikitang pag-activate ng buong ecosystem.",
    },
    supportTitle: "Makipagpartner sa Bronson Family Farm",
    supportText:
      "Makakatulong ang suporta sa pagpapalawak ng imprastraktura, irigasyon, kagamitan, programming, at pangmatagalang kapasidad na kailangan upang mapatakbo ang ecosystem na ito sa mas malaking saklaw.",
    moduleButtons: {
      grow: "Buksan ang Pagtatanim",
      shop: "Buksan ang Pamimili",
      story: "Buksan ang Kuwento",
      workforce: "Buksan ang Hanapbuhay",
      community: "Buksan ang Komunidad",
      events: "Buksan ang Mga Kaganapan",
    },
  },

  it: {
    title: "Bronson Family Farm",
    subtitle:
      "Un ecosistema vivo radicato nel cibo, nella famiglia, nella terra, nell’apprendimento e nelle opportunità.",
    intro:
      "Bronson Family Farm unisce cibo, famiglia, lavoro, benessere e partecipazione della comunità attraverso un sistema vivo basato sulla terra.",
    enter: "Entra nell’Ecosistema",
    back: "← Torna all’Ecosistema",
    preview: "Esplora l’ecosistema",
    askTitle: "Perché è importante",
    askText:
      "Bronson Family Farm sta costruendo un ecosistema funzionante in cui terra, apprendimento, accesso al cibo, sviluppo del lavoro e rinnovamento della comunità crescono insieme.",
    askButton: "Vedi l’Opportunità",
    openShop: "Apri il negozio GrownBy",
    returnHome: "Torna all’Ecosistema",
    supportButton: "Sostieni l’Ecosistema",
    modulesTitle: "Moduli Principali dell’Ecosistema",
    modules: {
      why: {
        title: "Perché è Importante",
        text:
          "Accesso al cibo, cura della terra, opportunità giovanili e rinnovamento della comunità si sviluppano insieme.",
      },
      build: {
        title: "Cosa Stiamo Costruendo",
        text:
          "Un ecosistema vivo a Youngstown che connette produzione, educazione, famiglie, percorsi di lavoro, commercio e attivazione pubblica.",
      },
      partner: {
        title: "Opportunità di Collaborazione",
        text:
          "Un sostegno allineato può espandere infrastrutture, irrigazione, attrezzature, programmazione e la capacità necessaria per attivare questo ecosistema su larga scala.",
      },
      pathways: {
        title: "Percorsi Vivi",
        text:
          "Coltivare, Acquistare, Storia, Lavoro, Comunità ed Eventi sono parte di un’unica esperienza connessa.",
      },
    },
    sections: {
      grow: "Coltivare",
      shop: "Acquistare",
      story: "Storia",
      workforce: "Lavoro",
      community: "Comunità",
      events: "Eventi",
    },
    sectionText: {
      grow: "Pianificazione delle colture, produzione e cura.",
      shop: "Prodotti freschi e percorsi reali di acquisto.",
      story: "Storia, visione, luogo e scopo.",
      workforce: "Opportunità giovanili e apprendimento pratico.",
      community: "Volontari, famiglie e partner.",
      events: "Mercati, visite e attivazione.",
    },
    details: {
      grow:
        "Esplora la pianificazione delle colture, il flusso di semina, la capacità produttiva, l’irrigazione e i sistemi necessari per sostenere una produzione agricola reale.",
      shop:
        "Questa area rappresenta prodotti freschi, offerte a valore aggiunto e il percorso dalla visibilità dell’ecosistema all’acquisto reale attraverso Bronson Family Farm.",
      story:
        "Bronson Family Farm è più di una fattoria. È una visione radicata nella comunità, plasmata da eredità, terra, servizio e dalla convinzione che il rinnovamento possa crescere da un luogo.",
      workforce:
        "Questa area mette in evidenza opportunità per i giovani, apprendimento pratico, responsabilità, crescita della fiducia e percorsi concreti verso il lavoro e la leadership futuri.",
      community:
        "Questa sezione mostra come volontari, famiglie, sostenitori, istituzioni e partner locali possano entrare nell’ecosistema in modi significativi.",
      events:
        "Questa area evidenzia mercati, visite, dimostrazioni pubbliche, incontri educativi e l’attivazione visibile dell’intero ecosistema.",
    },
    supportTitle: "Collabora con Bronson Family Farm",
    supportText:
      "Il sostegno può aiutare ad ampliare infrastrutture, irrigazione, attrezzature, programmazione e la capacità operativa a lungo termine necessaria per attivare questo ecosistema su larga scala.",
    moduleButtons: {
      grow: "Apri Coltivare",
      shop: "Apri Acquistare",
      story: "Apri Storia",
      workforce: "Apri Lavoro",
      community: "Apri Comunità",
      events: "Apri Eventi",
    },
  },

  patwa: {
    title: "Bronson Family Farm",
    subtitle:
      "A wan livin ecosystem weh root inna food, family, land, learning, an opportunity.",
    intro:
      "Bronson Family Farm join up food, family, work, wellness, an community participation through a livin land-based system.",
    enter: "Go Inna di Ecosystem",
    back: "← Go Back to di Ecosystem",
    preview: "Explore di ecosystem",
    askTitle: "Why dis matter",
    askText:
      "Bronson Family Farm a build a workin ecosystem weh land, learning, food access, workforce development, an community renewal a grow together.",
    askButton: "See di Opportunity",
    openShop: "Open di GrownBy Shop",
    returnHome: "Go Back to di Ecosystem",
    supportButton: "Support di Ecosystem",
    sections: {
      grow: "Grow",
      shop: "Shop",
      story: "Story",
      workforce: "Workforce",
      community: "Community",
      events: "Events",
    },
    sectionText: {
      grow: "Crop planning, production, an care.",
      shop: "Fresh goods an real buying pathway.",
      story: "History, vision, place, an purpose.",
      workforce: "Youth opportunity an practical learning.",
      community: "Volunteer, family, an partner dem.",
      events: "Market, tour, an activation.",
    },
    details: {
      grow:
        "Explore crop planning, planting flow, growing capacity, irrigation thinking, an di systems needed fi keep up real farm production.",
      shop:
        "Dis area show fresh goods, value-added offerings, an di path from ecosystem visibility to real purchasing through Bronson Family Farm.",
      story:
        "Bronson Family Farm more than a farm. It a one community-rooted vision shape by legacy, land, service, an di belief seh renewal can grow from place.",
      workforce:
        "Dis area highlight youth opportunity, hands-on learning, responsibility, confidence-building, an practical pathway into future work an leadership.",
      community:
        "Dis section show how volunteer, family, supporter, institution, an local partner can step inna di ecosystem in meaningful ways.",
      events:
        "Dis area highlight market, tour, public demonstration, educational gathering, an di visible activation a di whole ecosystem.",
    },
    supportTitle: "Partner wid Bronson Family Farm",
    supportText:
      "Support can help expand infrastructure, irrigation, equipment, programming, an di long-term operating capacity needed fi activate dis ecosystem pon a bigger scale.",
    moduleButtons: {
      grow: "Open Grow",
      shop: "Open Shop",
      story: "Open Story",
      workforce: "Open Workforce",
      community: "Open Community",
      events: "Open Events",
    },
  },

  he: {
    title: "Bronson Family Farm",
    subtitle:
      "מערכת אקולוגית חיה שמבוססת על מזון, משפחה, אדמה, למידה והזדמנות.",
    intro:
      "Bronson Family Farm מחברת בין מזון, משפחה, עבודה, בריאות והשתתפות קהילתית דרך מערכת חיה המבוססת על אדמה.",
    enter: "כניסה למערכת האקולוגית",
    back: "← חזרה למערכת האקולוגית",
    preview: "גלו את המערכת האקולוגית",
    askTitle: "למה זה חשוב",
    askText:
      "Bronson Family Farm בונה מערכת אקולוגית פעילה שבה אדמה, למידה, גישה למזון, פיתוח תעסוקתי והתחדשות קהילתית צומחים יחד.",
    askButton: "צפו בהזדמנות",
    openShop: "פתחו את חנות GrownBy",
    returnHome: "חזרה למערכת האקולוגית",
    supportButton: "תמכו במערכת האקולוגית",
    sections: {
      grow: "גידול",
      shop: "קנייה",
      story: "סיפור",
      workforce: "כוח עבודה",
      community: "קהילה",
      events: "אירועים",
    },
    sectionText: {
      grow: "תכנון גידולים, ייצור וטיפוח.",
      shop: "מוצרים טריים ומסלולי רכישה חיים.",
      story: "היסטוריה, חזון, מקום ומשמעות.",
      workforce: "הזדמנות לנוער ולמידה מעשית.",
      community: "מתנדבים, משפחות ושותפים.",
      events: "שווקים, סיורים והפעלה.",
    },
    details: {
      grow:
        "גלו תכנון גידולים, זרימת שתילה, יכולת ייצור, חשיבה על השקיה והמערכות הדרושות כדי לקיים חקלאות אמיתית.",
      shop:
        "אזור זה מייצג מוצרים טריים, הצעות בעלות ערך מוסף והדרך מחשיפה במערכת האקולוגית לרכישה אמיתית דרך Bronson Family Farm.",
      story:
        "Bronson Family Farm היא יותר מחווה. זהו חזון קהילתי שמבוסס על מורשת, אדמה, שירות והאמונה שהתחדשות יכולה לצמוח ממקום.",
      workforce:
        "אזור זה מדגיש הזדמנויות לנוער, למידה מעשית, אחריות, בניית ביטחון עצמי ומסלולים מעשיים לעבודה ולהנהגה בעתיד.",
      community:
        "חלק זה מראה כיצד מתנדבים, משפחות, תומכים, מוסדות ושותפים מקומיים יכולים להיכנס למערכת האקולוגית בדרכים משמעותיות.",
      events:
        "אזור זה מדגיש שווקים, סיורים, הדגמות ציבוריות, מפגשים חינוכיים והפעלה נראית לעין של כל המערכת האקולוגית.",
    },
    supportTitle: "שתפו פעולה עם Bronson Family Farm",
    supportText:
      "תמיכה יכולה לסייע בהרחבת תשתיות, השקיה, ציוד, תוכניות והיכולת התפעולית ארוכת הטווח הדרושה להפעלת המערכת האקולוגית הזו בקנה מידה רחב.",
    moduleButtons: {
      grow: "פתחו גידול",
      shop: "פתחו קנייה",
      story: "פתחו סיפור",
      workforce: "פתחו כוח עבודה",
      community: "פתחו קהילה",
      events: "פתחו אירועים",
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [section, setSection] = useState<Section>("home");

  const t = labels[lang];
  const isRTL = lang === "he";

  const shellStyle = {
    ...styles.shell,
    direction: isRTL ? ("rtl" as const) : ("ltr" as const),
  };

  const sectionShellStyle = {
    ...styles.sectionShell,
    direction: isRTL ? ("rtl" as const) : ("ltr" as const),
  };

  const moduleCards = [
    { key: "why", open: "story" as Section },
    { key: "build", open: "grow" as Section },
    { key: "partner", open: "community" as Section },
    { key: "pathways", open: "events" as Section },
  ] as const;

  if (section === "home") {
    return (
      <div style={styles.page}>
        <div style={shellStyle}>
          <div style={styles.topBar}>
            <div style={styles.eyebrow}>Bronson Family Farm Demo</div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              style={styles.select}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="tl">Tagalog</option>
              <option value="it">Italiano</option>
              <option value="patwa">Patwa</option>
              <option value="he">עברית</option>
            </select>
          </div>

          <img src={imagePaths.hero} alt="Bronson Family Farm" style={styles.heroImage} />

          <h1 style={styles.title}>BRONSON FAMILY FARM LIVE TEST</h1>
          <p style={styles.subtitle}>{t.subtitle}</p>
          <p style={styles.intro}>{t.intro}</p>

          <div style={styles.heroButtons}>
            <button style={styles.primaryButton} onClick={() => setSection("grow")}>
              {t.enter}
            </button>
            <button style={styles.secondaryButton} onClick={() => setSection("story")}>
              {t.askButton}
            </button>
          </div>

          <div style={styles.askPanel}>
            <h3 style={styles.askTitle}>{t.askTitle}</h3>
            <p style={styles.askText}>{t.askText}</p>
          </div>

          <div style={styles.previewHeader}>{t.modulesTitle}</div>

          <div style={styles.moduleGrid}>
            {moduleCards.map((module) => (
              <button
                key={module.key}
                style={styles.moduleCard}
                onClick={() => setSection(module.open)}
              >
                <h3 style={styles.moduleTitle}>{t.modules[module.key].title}</h3>
                <p style={styles.moduleText}>{t.modules[module.key].text}</p>
              </button>
            ))}
          </div>

          <div style={styles.previewHeader}>{t.preview}</div>

          <div style={styles.grid}>
            {(Object.keys(t.sections) as Array<keyof typeof t.sections>).map((key) => (
              <button key={key} style={styles.tile} onClick={() => setSection(key as Section)}>
                <img src={imagePaths[key]} alt={t.sections[key]} style={styles.tileImage} />
                <div style={styles.tileTitle}>{t.sections[key]}</div>
                <div style={styles.tileText}>{t.sectionText[key]}</div>
                <div style={styles.tileAction}>{t.moduleButtons[key]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={sectionShellStyle}>
        <div style={styles.topBar}>
          <button style={styles.backButton} onClick={() => setSection("home")}>
            {t.back}
          </button>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="tl">Tagalog</option>
            <option value="it">Italiano</option>
            <option value="patwa">Patwa</option>
            <option value="he">עברית</option>
          </select>
        </div>

        <img
          src={imagePaths[section]}
          alt={t.sections[section]}
          style={styles.sectionImage}
        />

        <h2 style={styles.sectionTitle}>{t.sections[section]}</h2>
        <p style={styles.sectionText}>{t.details[section]}</p>

        <div style={styles.supportPanel}>
          <h3 style={styles.askTitle}>{t.supportTitle}</h3>
          <p style={styles.askText}>{t.supportText}</p>
        </div>

        {section === "shop" && (
          <div style={styles.ctaRow}>
            <button
              style={styles.primaryButton}
              onClick={() =>
                window.open(
                  "https://grownby.com/farms/bronson-family-farm/shop",
                  "_blank"
                )
              }
            >
              {t.openShop}
            </button>
            <button style={styles.secondaryButton} onClick={() => setSection("home")}>
              {t.returnHome}
            </button>
          </div>
        )}

        {section !== "shop" && (
          <div style={styles.ctaRow}>
            <button style={styles.primaryButton} onClick={() => setSection("shop")}>
              {t.openShop}
            </button>
            <button style={styles.secondaryButton} onClick={() => setSection("home")}>
              {t.returnHome}
            </button>
          </div>
        )}

        <div style={styles.sectionGrid}>
          {(Object.keys(t.sections) as Array<keyof typeof t.sections>)
            .filter((key) => key !== section)
            .map((key) => (
              <button key={key} style={styles.miniTile} onClick={() => setSection(key as Section)}>
                <div style={styles.miniTileTitle}>{t.sections[key]}</div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#dfe8e0",
    padding: "28px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  shell: {
    width: "100%",
    maxWidth: "1180px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  sectionShell: {
    width: "100%",
    maxWidth: "980px",
    background: "#f8faf8",
    borderRadius: "24px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 34px rgba(25, 55, 35, 0.08)",
    border: "1px solid #d2ddd4",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2f6b3c",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    fontSize: "15px",
  },
  heroImage: {
    width: "100%",
    height: "340px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "22px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "56px",
    lineHeight: 1.05,
    textAlign: "center",
    color: "#173b24",
  },
  subtitle: {
    margin: "0 auto 12px auto",
    maxWidth: "850px",
    textAlign: "center",
    fontSize: "28px",
    lineHeight: 1.2,
    color: "#2d4f38",
  },
  intro: {
    margin: "0 auto 22px auto",
    maxWidth: "860px",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#486452",
  },
  heroButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  primaryButton: {
    padding: "14px 24px",
    background: "#2f6b3c",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  secondaryButton: {
    padding: "14px 24px",
    background: "#ffffff",
    color: "#173b24",
    border: "1px solid #cfd9d1",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 700,
  },
  askPanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "24px",
  },
  supportPanel: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "22px",
  },
  askTitle: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    color: "#173b24",
  },
  askText: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.6,
    color: "#486452",
  },
  previewHeader: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1f3d2b",
    marginBottom: "16px",
  },
  moduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  moduleCard: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "18px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(25, 55, 35, 0.05)",
  },
  moduleTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#173b24",
    margin: "0 0 8px 0",
  },
  moduleText: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#486452",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  tile: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "18px",
    padding: "14px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(25, 55, 35, 0.05)",
  },
  tileImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "14px",
    display: "block",
    marginBottom: "12px",
  },
  tileTitle: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#173b24",
    marginBottom: "6px",
  },
  tileText: {
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#486452",
  },
  tileAction: {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: 700,
    color: "#2f6b3c",
  },
  backButton: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cfd9d1",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 700,
    color: "#173b24",
  },
  sectionImage: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    borderRadius: "18px",
    display: "block",
    marginBottom: "22px",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "42px",
    color: "#173b24",
  },
  sectionText: {
    margin: "0 0 22px 0",
    fontSize: "18px",
    lineHeight: 1.7,
    color: "#486452",
    maxWidth: "780px",
  },
  ctaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  miniTile: {
    background: "#ffffff",
    border: "1px solid #d2ddd4",
    borderRadius: "12px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "center",
  },
  miniTileTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#173b24",
  },
};
