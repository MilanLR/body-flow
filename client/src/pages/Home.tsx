/**
 * BodyFlow Amsterdam — Home Page
 * Design: "Deep Ocean Flow" — Clinical Luxury
 * Sections: Nav, Hero, Wat is EECP, Voordelen, Traject, Pakketten, Prijslijst, Contact, Footer
 * Languages: NL / EN
 */

import { useState, useEffect, useRef } from "react";

// Image CDN URLs
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/hero-bg-HmsnhVnUjSPEVQXo3Pti9u.webp";
const EECP_THERAPY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/eecp-therapy-VpfLnvTXXmi5yzsMDsHJVL.webp";
const HEART_HEALTH = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/heart-health-Nt5b8X49SrKsB9JXQBQCVS.webp";
const VITALITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298280686/Sf6ssfRDLMCQonDWzyrzh7/vitality-39GcfBFreDwU2fSGSd7ZuQ.webp";

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ---- TRANSLATIONS ----
type Lang = "nl" | "en";

const t = {
  nl: {
    nav: {
      eecp: "Wat is EECP",
      voordelen: "Voordelen",
      traject: "Het Traject",
      pakketten: "Pakketten",
      tarieven: "Tarieven",
      contact: "Contact",
      boek: "Boek een sessie",
    },
    hero: {
      title: "Herdefinieer uw vitaliteit",
      subtitle: "Ervaar de kracht van EECP-therapie, een passieve marathon voor uw cellen, hart en geest",
      cta: "Ontdek de mogelijkheden",
      scroll: "Scroll",
      stat: "35+",
      statLabel: "jaar klinisch bewijs in de cardiologie",
      statNote: "* klinisch bewezen effectief in peer-reviewed medische studies",
    },
    eecp: {
      sectionLabel: "Herstel uw circulatie",
      h2: "Herstel uw natuurlijke circulatie met EECP-therapie",
      intro: "Een klinisch bewezen, niet-invasieve methode voor cardiovasculaire optimalisatie en vitaal herstel.",
      whatTitle: "Wat is EECP?",
      whatText: "Bij BodyFlow Amsterdam benaderen we gezondheid vanuit de kern: een ongehinderde doorstroming van uw vaatstelsel. Enhanced External Counterpulsation (EECP) is een geavanceerde technologie die fungeert als een 'natuurlijke bypass'. Zonder operatie of medicatie stimuleren we uw lichaam om de bloedcirculatie te verbeteren en nieuwe haarvaten aan te maken.",
      howTitle: "Hoe werkt het? De kracht van synchronisatie",
      howText: "EECP-therapie maakt gebruik van nauwkeurig afgestelde drukmanchetten rond de kuiten, bovenbenen en heupen. De behandeling wordt volledig gesynchroniseerd met uw eigen hartritme via een EKG-monitor:",
      howLi1: "Tijdens de restfase blazen de manchetten razendsnel op. Dit stuwt zuurstofrijk bloed terug naar het hart en de hersenen op het moment dat de bloedvaten daar het meest ontvankelijk voor zijn.",
      howLi1Bold: "rustfase",
      howLi2: "Tijdens de contractiefase lopen de manchetten direct leeg. Hierdoor ontstaat er ruimte in de vaten, waardoor het hart met aanzienlijk minder weerstand bloed door het hele lichaam kan pompen.",
      howLi2Bold: "contractiefase",
      physTitle: "De fysiologische voordelen",
      physText: "Deze ritmische 'pulsatie' doet meer dan alleen bloed verplaatsen. Het zet actieve processen in gang in uw lichaam:",
      physLi1Bold: "Angiogenese:",
      physLi1: "De vorming van nieuwe micro-vaten voor een betere doorbloeding op de lange termijn.",
      physLi2Bold: "Stikstofmonoxide-afgifte:",
      physLi2: "Helpt de bloedvaten te ontspannen en de vaatwanden gezond te houden.",
      physLi3Bold: "Ontstekingsremmend:",
      physLi3: "Ondersteunt het lichaam bij het afvoeren van afvalstoffen en het verminderen van systemische ontstekingen.",
    },
    voordelen: {
      sectionLabel: "De voordelen",
      h2: "Wat EECP voor u kan betekenen",
      benefits: [
        {
          number: "01",
          subtitle: "Cardiovascular Strength",
          title: "Versterking van het Hart- en Vaatstelsel",
          text: "EECP werkt als een 'passieve marathon'. De ritmische tegendruk stimuleert de aanmaak van nieuwe micro-vaten (angiogenese) en verbetert de conditie van uw vaatwanden. Dit ontlast het hart en zorgt voor een efficiëntere bloedsomloop, zelfs in rust.",
        },
        {
          number: "02",
          subtitle: "Energy & Vitality Restoration",
          title: "Herstel van Energie en Vitaliteit",
          text: "Door de bloedstroom naar uw organen en weefsels te optimaliseren, krijgen uw cellen weer de zuurstof die ze nodig hebben. Dit helpt bij het verminderen van chronische vermoeidheid, zoals we vaak zien bij Long-COVID of na een burn-out, en geeft een duurzame boost aan uw dagelijkse energie.",
        },
        {
          number: "03",
          subtitle: "Mental Clarity Focus",
          title: "Mentale Helderheid en Focus",
          text: "Vitaliteit stopt niet bij het lichaam. Een verbeterde doorbloeding naar de hersenen helpt bij het verminderen van 'brain fog' (hersenmist). Cliënten ervaren vaak dat ze scherper kunnen denken, zich beter kunnen concentreren en mentaal weerbaarder worden.",
        },
        {
          number: "04",
          subtitle: "Physical Recovery Accelerated",
          title: "Versneld Fysiek Herstel",
          text: "De pulserende werking helpt het lichaam om metabolische afvalstoffen sneller af te voeren en systemische ontstekingen te verminderen. Dit is cruciaal voor zowel topsporters als patiënten die herstellen van langdurige ziekte of fysieke uitputting.",
        },
      ],
    },
    vitality: {
      quote: '"Rustig liggen. Krachtig herstellen."',
      by: "— BodyFlow Amsterdam",
    },
    traject: {
      sectionLabel: "Het proces",
      h2: "Het BodyFlow Traject",
      subtitle: "Een nauwkeurig samengesteld pad naar cardiovasculaire excellentie.",
      steps: [
        {
          number: "01",
          title: "KLINISCH CONSULT",
          text: "Uw traject start met een diepgaande intake uitgevoerd door onze gespecialiseerde cardioloog. Dit is geen standaard controle, maar een uitgebreide medische beoordeling van uw hart- en vaatstelsel, medische voorgeschiedenis en persoonlijke vitaliteitsdoelen. Wij waarborgen dat EECP-therapie de veiligste en meest effectieve methode is voor uw unieke fysiologie.",
        },
        {
          number: "02",
          title: "GEPERSONALISEERD PROTOCOL",
          text: "Op basis van de klinische intake ontwerpen wij een behandelplan op maat. Of u nu herstelt van Long-COVID, kampt met Angina Pectoris of streeft naar fysieke optimalisatie op topniveau: uw 'Flow Protocol' wordt nauwkeurig afgestemd op de specifieke behoeften van uw lichaam, inclusief de frequentie en intensiteit van de sessies.",
        },
        {
          number: "03",
          title: "DE EECP-SESSIE",
          text: "U ondergaat de therapie in de professionele setting van onze studio in Amsterdam. Terwijl u rust, start onze gesynchroniseerde technologie de ritmische drukverhoging via nauwkeurig afgestelde drukmanchetten. Voor u is dit een moment van fysieke rust, terwijl uw vasculair systeem een vitale 'passieve marathon' aflegt voor een verbeterde doorbloeding.",
        },
        {
          number: "04",
          title: "MONITORING & OPTIMALISATIE",
          text: "Gezondheidsoptimalisatie is een continu proces. Gedurende uw sessies monitoren we uw progressie en passen we het protocol indien nodig in real-time aan. We bieden diepgaand inzicht in uw cardiovasculaire herstel en ondersteunen u bij het vertalen van deze verbeterde energie naar uw dagelijkse prestaties.",
        },
      ],
    },
    pakketten: {
      sectionLabel: "Behandelopties",
      h2: "Bodyflow Pakketten",
      intakeText: "Elk traject begint met een medische intake om uw geschiktheid en de optimale behandelroute vast te stellen. Dit uitgebreide onderzoek door onze cardioloog omvat een ECG, echocardiografie en een inspanningstest op de fiets. Zo garanderen wij een behandelplan dat exact is afgestemd op uw persoonlijke cardiovasculaire status.",
      ecg: "ECG",
      echo: "Echocardiografie",
      bike: "Inspanningstest",
      intakePrice: "De eenmalige klinische intake kost",
      mostChosen: "Meest gekozen",
      perSession: "per sessie",
      fromSessions3: "Vanaf 3 sessies",
      fromSessions10: "Vanaf 10 sessies",
      book: "Boek",
      packages: [
        {
          name: "Flow Essential",
          tagline: "De fundering voor een vitaal hart- en vaatstelsel.",
          price: "€159",
          features: [
            "Sessies EECP-therapie (de 'passieve marathon')",
            "Stimulatie van angiogenese (aanmaak nieuwe haarvaten)",
            "Verbetering van de algehele cardiovasculaire conditie",
            "Herstel bij (chronische) vermoeidheid of Long-COVID",
            "Verhoging van mentale helderheid en 'brain fog' reductie",
            "Versneld fysiek herstel na intensieve inspanning",
          ],
        },
        {
          name: "Flow Advanced",
          tagline: "Maximale synergie tussen therapie en voeding.",
          price: "€179",
          featured: true,
          minSessions: "Vanaf 3 sessies",
          features: [
            "Alles uit het Flow Essential pakket",
            "Hoogwaardig pakket met klinische supplementen",
            "Optimale ondersteuning van het celvernieuwingsproces",
            "Snellere afvoer van metabole afvalstoffen en toxines",
            "Effectieve aanpak van systemische ontstekingen",
          ],
        },
        {
          name: "Flow Precision",
          tagline: "Gezondheid op basis van jouw unieke biometrische data.",
          price: "€199",
          minSessions: "Vanaf 10 sessies",
          features: [
            "Alles uit het Flow Advanced pakket",
            "Uitgebreid diagnostisch bloedonderzoek bij aanvang",
            "Supplementen 100% afgestemd op jouw tekorten en waarden",
            "Gepersonaliseerd behandelplan op basis van data-analyse",
            "Diepgaand inzicht in jouw vitale markers en biologische leeftijd",
            "Exclusieve monitoring van voortgang en fysiologische optimalisatie",
          ],
        },
      ],
    },
    prijslijst: {
      sectionLabel: "Transparante tarieven",
      h2: "Prijslijst",
      book: "Boek",
      prices: [
        { item: "Intake", price: "€95" },
        { item: "Losse EECP-therapie", price: "€159" },
        { item: "Supplementpakket Advanced", price: "€75" },
        { item: "Supplementpakket Precision", price: "€100" },
        { item: "Bloedonderzoek (2 keer)", price: "€300" },
        { item: "Advanced pakket (3 sessies)", price: "€552" },
        { item: "Precision pakket (10 sessies)", price: "€1.990,00" },
        { item: "EECP-therapie Essential (32 sessies)", price: "€5.088,00" },
        { item: "EECP-therapie Advanced (32 sessies)", price: "€5.238,00" },
        { item: "EECP-therapie Precision (32 sessies)", price: "€5.588,00" },
      ],
    },
    contact: {
      sectionLabel: "Neem contact op",
      h2: "Contact",
      openingsLabel: "Openingstijden",
      days: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
      times: ["09:00 – 21:00", "18:00 – 21:00", "18:00 – 21:00", "09:00 – 18:00", "Gesloten", "Gesloten", "09:00 – 21:00"],
      closed: "Gesloten",
      formTitle: "Boek een sessie",
      firstName: "Voornaam*",
      lastName: "Achternaam*",
      phone: "Telefoonnummer",
      email: "E-mailadres*",
      contactPref: "Wat is uw voorkeursmethode voor contact?*",
      phoneOpt: "Telefoon",
      emailOpt: "E-mail",
      remarks: "Aanvullende opmerkingen",
      submit: "Verstuur",
      thankYou: "Bedankt!",
      thankYouMsg: "Uw aanvraag is ontvangen. Wij nemen spoedig contact met u op.",
    },
    footer: {
      tagline: "EECP-therapie voor cardiovasculaire optimalisatie en vitaal herstel in Amsterdam.",
      nav: "Navigatie",
      contactLabel: "Contact",
      copyright: "© 2026 BodyFlow Amsterdam. Alle rechten voorbehouden.",
      location: "EECP-therapie — Gevestigd in Amstelveen",
      navLinks: [["Wat is EECP", "#eecp"], ["Voordelen", "#voordelen"], ["Het Traject", "#traject"], ["Pakketten", "#pakketten"], ["Tarieven", "#prijslijst"], ["Contact", "#contact"]],
    },
  },
  en: {
    nav: {
      eecp: "What is EECP",
      voordelen: "Benefits",
      traject: "The Journey",
      pakketten: "Packages",
      tarieven: "Pricing",
      contact: "Contact",
      boek: "Book a session",
    },
    hero: {
      title: "Redefine your vitality",
      subtitle: "Experience the power of EECP therapy — a passive marathon for your cells, heart and mind",
      cta: "Discover the possibilities",
      scroll: "Scroll",
      stat: "35+",
      statLabel: "years of clinical evidence in cardiology",
      statNote: "* clinically proven effective in peer-reviewed medical studies",
    },
    eecp: {
      sectionLabel: "Restore your circulation",
      h2: "Restore your natural circulation with EECP therapy",
      intro: "A clinically proven, non-invasive method for cardiovascular optimisation and vital recovery.",
      whatTitle: "What is EECP?",
      whatText: "At BodyFlow Amsterdam we approach health at its core: unobstructed flow through your vascular system. Enhanced External Counterpulsation (EECP) is an advanced technology that acts as a 'natural bypass'. Without surgery or medication, we stimulate your body to improve blood circulation and form new capillaries.",
      howTitle: "How does it work? The power of synchronisation",
      howText: "EECP therapy uses precisely calibrated pressure cuffs around the calves, thighs and hips. The treatment is fully synchronised with your own heart rhythm via an ECG monitor:",
      howLi1: "During the rest phase the cuffs inflate rapidly. This pushes oxygen-rich blood back to the heart and brain at the moment the blood vessels are most receptive.",
      howLi1Bold: "rest phase",
      howLi2: "During the contraction phase the cuffs deflate immediately. This creates space in the vessels, allowing the heart to pump blood throughout the body with significantly less resistance.",
      howLi2Bold: "contraction phase",
      physTitle: "The physiological benefits",
      physText: "This rhythmic 'pulsation' does more than move blood. It activates processes in your body:",
      physLi1Bold: "Angiogenesis:",
      physLi1: "The formation of new micro-vessels for improved long-term circulation.",
      physLi2Bold: "Nitric oxide release:",
      physLi2: "Helps relax blood vessels and keep vessel walls healthy.",
      physLi3Bold: "Anti-inflammatory:",
      physLi3: "Supports the body in removing waste products and reducing systemic inflammation.",
    },
    voordelen: {
      sectionLabel: "The benefits",
      h2: "What EECP can do for you",
      benefits: [
        {
          number: "01",
          subtitle: "Cardiovascular Strength",
          title: "Strengthening the Cardiovascular System",
          text: "EECP works like a 'passive marathon'. The rhythmic counter-pressure stimulates the formation of new micro-vessels (angiogenesis) and improves the condition of your vessel walls. This relieves the heart and ensures a more efficient circulation, even at rest.",
        },
        {
          number: "02",
          subtitle: "Energy & Vitality Restoration",
          title: "Restoring Energy and Vitality",
          text: "By optimising blood flow to your organs and tissues, your cells receive the oxygen they need again. This helps reduce chronic fatigue — as often seen with Long-COVID or after burnout — and provides a lasting boost to your daily energy.",
        },
        {
          number: "03",
          subtitle: "Mental Clarity Focus",
          title: "Mental Clarity and Focus",
          text: "Vitality does not stop at the body. Improved circulation to the brain helps reduce 'brain fog'. Clients often report sharper thinking, better concentration and greater mental resilience.",
        },
        {
          number: "04",
          subtitle: "Physical Recovery Accelerated",
          title: "Accelerated Physical Recovery",
          text: "The pulsating action helps the body remove metabolic waste products more quickly and reduce systemic inflammation. This is crucial for both elite athletes and patients recovering from prolonged illness or physical exhaustion.",
        },
      ],
    },
    vitality: {
      quote: '"Rest quietly. Recover powerfully."',
      by: "— BodyFlow Amsterdam",
    },
    traject: {
      sectionLabel: "The process",
      h2: "The BodyFlow Journey",
      subtitle: "A carefully composed path towards cardiovascular excellence.",
      steps: [
        {
          number: "01",
          title: "CLINICAL CONSULTATION",
          text: "Your journey begins with an in-depth intake conducted by our specialist cardiologist. This is not a standard check-up, but a comprehensive medical assessment of your cardiovascular system, medical history and personal vitality goals. We ensure that EECP therapy is the safest and most effective method for your unique physiology.",
        },
        {
          number: "02",
          title: "PERSONALISED PROTOCOL",
          text: "Based on the clinical intake, we design a tailor-made treatment plan. Whether you are recovering from Long-COVID, dealing with Angina Pectoris or striving for top-level physical optimisation: your 'Flow Protocol' is precisely calibrated to the specific needs of your body, including the frequency and intensity of the sessions.",
        },
        {
          number: "03",
          title: "THE EECP SESSION",
          text: "You undergo the therapy in the professional setting of our studio in Amsterdam. While you rest, our synchronised technology initiates the rhythmic pressure increase via precisely calibrated pressure cuffs. For you this is a moment of physical rest, while your vascular system completes a vital 'passive marathon' for improved circulation.",
        },
        {
          number: "04",
          title: "MONITORING & OPTIMISATION",
          text: "Health optimisation is a continuous process. During your sessions we monitor your progress and adjust the protocol in real-time if necessary. We provide deep insight into your cardiovascular recovery and support you in translating this improved energy into your daily performance.",
        },
      ],
    },
    pakketten: {
      sectionLabel: "Treatment options",
      h2: "BodyFlow Packages",
      intakeText: "Every journey begins with a medical intake to establish your suitability and the optimal treatment route. This comprehensive examination by our cardiologist includes an ECG, echocardiography and a bicycle stress test. This guarantees a treatment plan precisely tailored to your personal cardiovascular status.",
      ecg: "ECG",
      echo: "Echocardiography",
      bike: "Stress test",
      intakePrice: "A one-time clinical intake costs",
      mostChosen: "Most popular",
      perSession: "per session",
      fromSessions3: "From 3 sessions",
      fromSessions10: "From 10 sessions",
      book: "Book",
      packages: [
        {
          name: "Flow Essential",
          tagline: "The foundation for a vital cardiovascular system.",
          price: "€159",
          features: [
            "EECP therapy sessions (the 'passive marathon')",
            "Stimulation of angiogenesis (formation of new capillaries)",
            "Improvement of overall cardiovascular condition",
            "Recovery from (chronic) fatigue or Long-COVID",
            "Increased mental clarity and brain fog reduction",
            "Accelerated physical recovery after intensive exertion",
          ],
        },
        {
          name: "Flow Advanced",
          tagline: "Maximum synergy between therapy and nutrition.",
          price: "€179",
          featured: true,
          minSessions: "From 3 sessions",
          features: [
            "Everything in the Flow Essential package",
            "High-quality package with clinical supplements",
            "Optimal support of the cell renewal process",
            "Faster elimination of metabolic waste and toxins",
            "Effective approach to systemic inflammation",
          ],
        },
        {
          name: "Flow Precision",
          tagline: "Health based on your unique biometric data.",
          price: "€199",
          minSessions: "From 10 sessions",
          features: [
            "Everything in the Flow Advanced package",
            "Comprehensive diagnostic blood test at the start",
            "Supplements 100% tailored to your deficiencies and values",
            "Personalised treatment plan based on data analysis",
            "Deep insight into your vital markers and biological age",
            "Exclusive monitoring of progress and physiological optimisation",
          ],
        },
      ],
    },
    prijslijst: {
      sectionLabel: "Transparent pricing",
      h2: "Price list",
      book: "Book",
      prices: [
        { item: "Intake", price: "€95" },
        { item: "Single EECP therapy session", price: "€159" },
        { item: "Supplement package Advanced", price: "€75" },
        { item: "Supplement package Precision", price: "€100" },
        { item: "Blood test (2 times)", price: "€300" },
        { item: "Advanced package (3 sessions)", price: "€552" },
        { item: "Precision package (10 sessions)", price: "€1,990.00" },
        { item: "EECP therapy Essential (32 sessions)", price: "€5,088.00" },
        { item: "EECP therapy Advanced (32 sessions)", price: "€5,238.00" },
        { item: "EECP therapy Precision (32 sessions)", price: "€5,588.00" },
      ],
    },
    contact: {
      sectionLabel: "Get in touch",
      h2: "Contact",
      openingsLabel: "Opening hours",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      times: ["09:00 – 21:00", "18:00 – 21:00", "18:00 – 21:00", "09:00 – 18:00", "Closed", "Closed", "09:00 – 21:00"],
      closed: "Closed",
      formTitle: "Book a session",
      firstName: "First name*",
      lastName: "Last name*",
      phone: "Phone number",
      email: "Email address*",
      contactPref: "What is your preferred contact method?*",
      phoneOpt: "Phone",
      emailOpt: "Email",
      remarks: "Additional remarks",
      submit: "Send",
      thankYou: "Thank you!",
      thankYouMsg: "Your request has been received. We will contact you shortly.",
    },
    footer: {
      tagline: "EECP therapy for cardiovascular optimisation and vital recovery in Amsterdam.",
      nav: "Navigation",
      contactLabel: "Contact",
      copyright: "© 2026 BodyFlow Amsterdam. All rights reserved.",
      location: "EECP therapy — Located in Amstelveen",
      navLinks: [["What is EECP", "#eecp"], ["Benefits", "#voordelen"], ["The Journey", "#traject"], ["Packages", "#pakketten"], ["Pricing", "#prijslijst"], ["Contact", "#contact"]],
    },
  },
};

// BodyFlow Logo SVG
function BodyFlowLogo({ white = false }: { white?: boolean }) {
  const color = white ? "#ffffff" : "#1a2e4a";
  const subColor = white ? "rgba(255,255,255,0.85)" : "#2a5580";
  return (
    <div className="flex flex-col items-center gap-0">
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color, letterSpacing: "0.02em", lineHeight: 1 }}>
        BodyFlow
      </span>
      <svg width="72" height="10" viewBox="0 0 72 10" fill="none" style={{ marginTop: "-2px" }}>
        <path d="M2 6 Q12 1 22 6 Q32 11 42 6 Q52 1 62 6 Q67 8.5 70 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.9"/>
      </svg>
      <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.25em", color: subColor, marginTop: "1px" }}>
        AMSTERDAM
      </span>
    </div>
  );
}

// Language Switcher
function LangSwitcher({ lang, setLang, scrolled }: { lang: Lang; setLang: (l: Lang) => void; scrolled: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.1rem", border: `1px solid ${scrolled ? "oklch(0.75 0.04 230)" : "rgba(255,255,255,0.4)"}`, borderRadius: "20px", padding: "0.15rem 0.25rem" }}>
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? (scrolled ? "oklch(0.22 0.05 240)" : "rgba(255,255,255,0.2)") : "transparent",
            color: lang === l ? "white" : (scrolled ? "oklch(0.40 0.05 235)" : "rgba(255,255,255,0.7)"),
            border: "none",
            borderRadius: "16px",
            padding: "0.2rem 0.55rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.2s",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// Navigation
function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tx = t[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: tx.eecp, href: "#eecp" },
    { label: tx.voordelen, href: "#voordelen" },
    { label: tx.traject, href: "#traject" },
    { label: tx.pakketten, href: "#pakketten" },
    { label: tx.tarieven, href: "#prijslijst" },
    { label: tx.contact, href: "#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(26,46,74,0.08)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ textDecoration: "none" }}>
          <BodyFlowLogo white={!scrolled} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: "1.5rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: scrolled ? "oklch(0.22 0.05 240)" : "rgba(255,255,255,0.9)",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#boek"
            className="btn-pill"
            style={{
              color: scrolled ? "oklch(0.22 0.05 240)" : "white",
              borderColor: scrolled ? "oklch(0.22 0.05 240)" : "rgba(255,255,255,0.7)",
              fontSize: "0.7rem",
              padding: "0.6rem 1.5rem",
            }}
          >
            {tx.boek}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: "24px", height: "2px", background: scrolled ? "oklch(0.22 0.05 240)" : "white", borderRadius: "2px", transition: "all 0.3s" }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "white", padding: "1rem 0", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", color: "oklch(0.22 0.05 240)", textDecoration: "none", fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
            <a href="#boek" onClick={() => setMenuOpen(false)} className="btn-pill btn-pill-navy" style={{ alignSelf: "flex-start" }}>
              {tx.boek}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection({ lang }: { lang: Lang }) {
  const tx = t[lang].hero;
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,30,55,0.55) 0%, rgba(10,25,50,0.65) 100%)" }} />

      <div className="hero-content" style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: "900px" }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2rem, 8vw, 5.5rem)",
            fontWeight: 300,
            color: "white",
            letterSpacing: "0.08em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}
          className="animate-fade-in-up"
        >
          {tx.title}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.88)",
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: "3rem",
            maxWidth: "580px",
            margin: "0 auto 3rem",
          }}
          className="animate-fade-in-up animate-delay-200 hero-subtitle"
        >
          {tx.subtitle}
        </p>
        <div className="animate-fade-in-up animate-delay-400">
          <a href="#pakketten" className="btn-pill btn-pill-white">
            {tx.cta}
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.6,
        }}
      >
        <span style={{ fontFamily: "'DM Sans'", fontSize: "0.65rem", letterSpacing: "0.15em", color: "white", textTransform: "uppercase" }}>{tx.scroll}</span>
        <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.5)", animation: "pulse 2s infinite" }} />
      </div>
    </section>
  );
}

// EECP Explanation Section
function EECPSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].eecp;
  const hero = t[lang].hero;
  return (
    <section id="eecp" className="mobile-padding" style={{ background: "white", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="responsive-grid eecp-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div className="vertical-rule" style={{ height: "3rem" }} />
              <span className="section-label">{tx.sectionLabel}</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
              {tx.h2}
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", color: "oklch(0.35 0.04 235)", lineHeight: 1.8, marginBottom: "1rem" }}>
              {tx.intro}
            </p>

            <div style={{ marginTop: "2rem" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "0.75rem" }}>
                {tx.whatTitle}
              </h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                {tx.whatText}
              </p>

              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "0.75rem" }}>
                {tx.howTitle}
              </h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, marginBottom: "1rem" }}>
                {tx.howText}
              </p>
              <ul style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
                <li style={{ marginBottom: "0.5rem" }}>Tijdens de <strong>{tx.howLi1Bold}</strong> {tx.howLi1}</li>
                <li>Tijdens de <strong>{tx.howLi2Bold}</strong> {tx.howLi2}</li>
              </ul>

              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "0.75rem" }}>
                {tx.physTitle}
              </h3>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                {tx.physText}
              </p>
              <ul style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, paddingLeft: "1.2rem" }}>
                <li style={{ marginBottom: "0.4rem" }}><strong>{tx.physLi1Bold}</strong> {tx.physLi1}</li>
                <li style={{ marginBottom: "0.4rem" }}><strong>{tx.physLi2Bold}</strong> {tx.physLi2}</li>
                <li><strong>{tx.physLi3Bold}</strong> {tx.physLi3}</li>
              </ul>
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.2s", position: "relative" }}>
            <div className="eecp-image-wrapper" style={{ borderRadius: "2px", overflow: "hidden", aspectRatio: "3/4", position: "relative" }}>
              <img src={EECP_THERAPY} alt="EECP therapy session at BodyFlow Amsterdam" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.3)", borderRadius: "2px", pointerEvents: "none" }} />
            </div>
            <div className="mobile-stat-card" style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "-1.5rem",
              background: "oklch(0.22 0.05 240)",
              color: "white",
              padding: "1.5rem",
              borderRadius: "2px",
              maxWidth: "200px",
              boxShadow: "0 8px 32px rgba(26,46,74,0.3)",
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.5rem", fontWeight: 600, lineHeight: 1 }}>{hero.stat}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: "0.75rem", opacity: 0.8, marginTop: "0.65rem", lineHeight: 1.4 }}>{hero.statLabel}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: "0.6rem", opacity: 0.55, marginTop: "0.6rem", lineHeight: 1.4 }}>{hero.statNote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function VoordelenSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].voordelen;

  const icons = [
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1"/>
      <path d="M28 38 C28 38 18 30 18 23 C18 19.5 20.5 17 24 17 C26 17 27.5 18 28 19.5 C28.5 18 30 17 32 17 C35.5 17 38 19.5 38 23 C38 30 28 38 28 38Z" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none"/>
      <polyline points="20,28 24,32 36,20" stroke="oklch(0.45 0.10 230)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1"/>
      <circle cx="28" cy="22" r="5" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none"/>
      <path d="M20 38 C20 33 23.5 30 28 30 C32.5 30 36 33 36 38" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M24 22 L20 18 M32 22 L36 18" stroke="oklch(0.45 0.10 230)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M28 17 L28 13" stroke="oklch(0.45 0.10 230)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>,
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1"/>
      <circle cx="28" cy="24" r="9" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none"/>
      <path d="M22 21 C22 21 24 18 28 18 C32 18 34 21 34 24" stroke="oklch(0.45 0.10 230)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <circle cx="25" cy="24" r="1" fill="oklch(0.45 0.10 230)"/>
      <circle cx="31" cy="24" r="1" fill="oklch(0.45 0.10 230)"/>
      <path d="M28 33 L28 40" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 40 L32 40" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>,
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="27" stroke="oklch(0.45 0.10 230)" strokeWidth="1"/>
      <path d="M28 18 C28 18 20 22 20 30 C20 35 23.5 38 28 38 C32.5 38 36 35 36 30 C36 22 28 18 28 18Z" stroke="oklch(0.35 0.07 240)" strokeWidth="1.5" fill="none"/>
      <path d="M24 30 L27 33 L33 25" stroke="oklch(0.45 0.10 230)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ];

  return (
    <section id="voordelen" className="mobile-padding" style={{ background: "oklch(0.97 0.01 230)", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.8s ease", textAlign: "center", marginBottom: "4rem" }}>
          <span className="section-label">{tx.sectionLabel}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", marginTop: "0.75rem", lineHeight: 1.2 }}>
            {tx.h2}
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
          {tx.benefits.map((b, i) => (
            <div
              key={b.number}
              style={{
                background: "white",
                padding: "2.5rem 2rem",
                borderRadius: "2px",
                boxShadow: "0 2px 20px rgba(26,46,74,0.06)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ease ${i * 0.1}s`,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>{icons[i]}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: "0.6rem", letterSpacing: "0.2em", color: "oklch(0.55 0.07 230)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{b.subtitle}</div>
              </div>
              <div style={{ borderTop: "1px solid oklch(0.90 0.02 230)", paddingTop: "1rem" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: "0.7rem", fontWeight: 600, color: "oklch(0.45 0.10 230)", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  {b.number} |
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "oklch(0.22 0.05 240)", marginBottom: "0.75rem" }}>
                  {b.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "oklch(0.42 0.04 235)", lineHeight: 1.75 }}>
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Vitality Image Banner
function VitalityBanner({ lang }: { lang: Lang }) {
  const tx = t[lang].vitality;
  return (
    <section style={{ position: "relative", height: "400px", overflow: "hidden" }}>
      <img src={VITALITY} alt="Vitaal leven in Amsterdam" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(15,30,55,0.75) 0%, rgba(15,30,55,0.3) 60%, transparent 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
        <div className="container">
          <blockquote style={{ maxWidth: "480px" }}>
            <p className="vitality-quote" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, fontStyle: "italic", color: "white", lineHeight: 1.4, marginBottom: "1rem" }}>
              {tx.quote}
            </p>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.05em" }}>
              {tx.by}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// Traject Section
function TrajectSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].traject;

  return (
    <section id="traject" className="mobile-padding" style={{ background: "white", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", marginTop: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {tx.h2}
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem", fontStyle: "italic", color: "oklch(0.45 0.07 235)", marginTop: "0.75rem" }}>
              {tx.subtitle}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {tx.steps.map((step, i) => (
              <div
                key={step.number}
                className="traject-step"
                style={{
                  display: "flex",
                  gap: "2rem",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.7s ease ${i * 0.15}s`,
                  paddingBottom: i < tx.steps.length - 1 ? "2.5rem" : "0",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "3px" }}>
                  <div style={{ width: "3px", background: "oklch(0.45 0.10 230)", flex: 1, minHeight: "100%" }} />
                </div>
                <div style={{ paddingBottom: "0.5rem" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: "0.7rem", fontWeight: 600, color: "oklch(0.45 0.10 230)", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    {step.number} | {step.title}
                  </div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8 }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Pakketten Section
function PakkettenSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].pakketten;

  return (
    <section id="pakketten" className="mobile-padding" style={{ background: "oklch(0.97 0.01 230)", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", marginTop: "0.75rem" }}>
              {tx.h2}
            </h2>
          </div>

          <div className="intake-card" style={{ background: "white", borderRadius: "2px", padding: "2rem 2.5rem", marginBottom: "3rem", boxShadow: "0 2px 20px rgba(26,46,74,0.06)" }}>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              {tx.intakeText}
            </p>
            <div className="intake-icons-grid">
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <polyline points="4,24 10,24 14,12 18,36 22,18 26,30 30,24 44,24" stroke="oklch(0.35 0.07 240)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.ecg}</span>
              </div>
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="10" width="32" height="28" rx="2" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" fill="none"/>
                    <circle cx="24" cy="24" r="8" stroke="oklch(0.45 0.10 230)" strokeWidth="1.8" fill="none"/>
                    <path d="M18 30 Q12 36 10 40" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.echo}</span>
              </div>
              <div className="intake-icon-item">
                <div className="intake-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <circle cx="14" cy="34" r="8" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" fill="none"/>
                    <circle cx="34" cy="34" r="8" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" fill="none"/>
                    <path d="M14 34 L24 18 L34 34" stroke="oklch(0.45 0.10 230)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <path d="M24 18 L28 12" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M26 12 L32 12" stroke="oklch(0.35 0.07 240)" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="intake-icon-label">{tx.bike}</span>
              </div>
            </div>
            <p className="intake-price-text">
              {tx.intakePrice} <strong>€95</strong>.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {tx.packages.map((pkg, i) => (
              <div
                key={pkg.name}
                style={{
                  background: "white",
                  borderRadius: "2px",
                  border: pkg.featured ? "2px solid oklch(0.35 0.07 240)" : "1px solid oklch(0.88 0.02 230)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.7s ease ${i * 0.1}s`,
                  boxShadow: pkg.featured ? "0 8px 40px rgba(26,46,74,0.12)" : "0 2px 20px rgba(26,46,74,0.05)",
                }}
              >
                {pkg.featured && (
                  <div style={{ background: "oklch(0.22 0.05 240)", color: "white", textAlign: "center", padding: "0.5rem", fontFamily: "'DM Sans'", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {tx.mostChosen}
                  </div>
                )}
                <div style={{ padding: "2rem", flex: 1 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "0.25rem" }}>
                    {pkg.name}
                  </h3>
                  {pkg.minSessions && (
                    <div style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", fontWeight: 600, color: "oklch(0.35 0.07 240)", marginBottom: "0.25rem" }}>
                      {pkg.minSessions}
                    </div>
                  )}
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: "oklch(0.50 0.05 235)", marginBottom: "1.5rem" }}>
                    {pkg.tagline}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <circle cx="8" cy="8" r="7" stroke="oklch(0.45 0.10 230)" strokeWidth="1"/>
                          <polyline points="5,8 7,10 11,6" stroke="oklch(0.45 0.10 230)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "oklch(0.40 0.04 235)", lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid oklch(0.90 0.02 230)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 600, color: "oklch(0.22 0.05 240)" }}>{pkg.price}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.50 0.05 235)", marginLeft: "0.5rem" }}>{tx.perSession}</span>
                  </div>
                  <a href="#boek" className="btn-pill btn-pill-navy" style={{ fontSize: "0.7rem", padding: "0.6rem 1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {tx.book}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7 L11 7 M8 4 L11 7 L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing Table Section
function PrijslijstSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].prijslijst;

  return (
    <section id="prijslijst" className="mobile-padding" style={{ background: "white", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ maxWidth: "700px", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease" }}>
          <span className="section-label">{tx.sectionLabel}</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", marginTop: "0.75rem", marginBottom: "2.5rem" }}>
            {tx.h2}
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {tx.prices.map((row, i) => (
              <div
                key={row.item}
                className="price-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.9rem 0",
                  borderBottom: "1px solid oklch(0.92 0.02 230)",
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 0.05}s`,
                }}
              >
                <span style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.35 0.04 235)" }}>{row.item}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 500, color: "oklch(0.22 0.05 240)" }}>{row.price}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
            <a href="#boek" className="btn-pill btn-pill-navy" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {tx.book}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7 L11 7 M8 4 L11 7 L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact & Booking Section
function ContactSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView();
  const tx = t[lang].contact;
  const [formData, setFormData] = useState({
    voornaam: "", achternaam: "", telefoon: "", email: "", contactvoorkeur: "", opmerkingen: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="mobile-padding" style={{ background: "oklch(0.97 0.01 230)", padding: "6rem 0" }}>
      <div className="container">
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="responsive-grid contact-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease" }}>
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "oklch(0.18 0.04 240)", marginTop: "0.75rem", marginBottom: "2rem" }}>
              {tx.h2}
            </h2>

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M9 1C6.24 1 4 3.24 4 6C4 9.75 9 17 9 17C9 17 14 9.75 14 6C14 3.24 11.76 1 9 1Z" stroke="oklch(0.45 0.10 230)" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="6" r="2" stroke="oklch(0.45 0.10 230)" strokeWidth="1.2" fill="none"/>
                </svg>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.35 0.04 235)", lineHeight: 1.6 }}>
                  Amsterdamseweg 487<br />1181 BR Amstelveen
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3H7L9 8L6.5 9.5C7.57 11.69 9.31 13.43 11.5 14.5L13 12L18 14V18C18 18 15 19 9 13C3 7 4 4 4 4L3 3Z" stroke="oklch(0.45 0.10 230)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="mailto:info@bodyflow.nl" style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.35 0.07 240)", textDecoration: "none" }}>
                  info@bodyflow.nl
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "1rem" }}>
                {tx.openingsLabel}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {tx.days.map((dag, idx) => (
                  <div key={dag} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid oklch(0.90 0.02 230)" }}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "oklch(0.40 0.04 235)" }}>{dag}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: tx.times[idx] === tx.closed ? "oklch(0.60 0.04 235)" : "oklch(0.35 0.07 240)", fontWeight: 500 }}>{tx.times[idx]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="boek"
            className="contact-form-card"
            style={{
              background: "white",
              padding: "2.5rem",
              borderRadius: "2px",
              boxShadow: "0 4px 30px rgba(26,46,74,0.08)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 500, color: "oklch(0.22 0.05 240)", marginBottom: "1.75rem" }}>
              {tx.formTitle}
            </h3>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 1rem" }}>
                  <circle cx="24" cy="24" r="22" stroke="oklch(0.45 0.10 230)" strokeWidth="2" fill="none"/>
                  <polyline points="14,24 21,31 34,17" stroke="oklch(0.45 0.10 230)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", color: "oklch(0.22 0.05 240)", marginBottom: "0.5rem" }}>{tx.thankYou}</h4>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "oklch(0.50 0.05 235)" }}>{tx.thankYouMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="mobile-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { label: tx.firstName, key: "voornaam" },
                    { label: tx.lastName, key: "achternaam" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.40 0.04 235)", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                      <input
                        type="text"
                        required
                        value={formData[key as keyof typeof formData]}
                        onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                        style={{ width: "100%", borderBottom: "1.5px solid oklch(0.75 0.04 230)", padding: "0.4rem 0", fontFamily: "'DM Sans'", fontSize: "0.9rem", background: "transparent", outline: "none", color: "oklch(0.22 0.05 240)", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.40 0.04 235)", display: "block", marginBottom: "0.4rem" }}>{tx.phone}</label>
                  <input
                    type="tel"
                    value={formData.telefoon}
                    onChange={e => setFormData(p => ({ ...p, telefoon: e.target.value }))}
                    style={{ width: "100%", borderBottom: "1.5px solid oklch(0.75 0.04 230)", padding: "0.4rem 0", fontFamily: "'DM Sans'", fontSize: "0.9rem", background: "transparent", outline: "none", color: "oklch(0.22 0.05 240)" }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.40 0.04 235)", display: "block", marginBottom: "0.4rem" }}>{tx.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    style={{ width: "100%", borderBottom: "1.5px solid oklch(0.75 0.04 230)", padding: "0.4rem 0", fontFamily: "'DM Sans'", fontSize: "0.9rem", background: "transparent", outline: "none", color: "oklch(0.22 0.05 240)" }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.40 0.04 235)", display: "block", marginBottom: "0.75rem" }}>{tx.contactPref}</label>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    {[tx.phoneOpt, tx.emailOpt].map(opt => (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="contactvoorkeur"
                          value={opt}
                          checked={formData.contactvoorkeur === opt}
                          onChange={e => setFormData(p => ({ ...p, contactvoorkeur: e.target.value }))}
                          style={{ accentColor: "oklch(0.35 0.07 240)" }}
                        />
                        <span style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "oklch(0.40 0.04 235)" }}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "oklch(0.40 0.04 235)", display: "block", marginBottom: "0.4rem" }}>{tx.remarks}</label>
                  <textarea
                    value={formData.opmerkingen}
                    onChange={e => setFormData(p => ({ ...p, opmerkingen: e.target.value }))}
                    rows={3}
                    style={{ width: "100%", borderBottom: "1.5px solid oklch(0.75 0.04 230)", padding: "0.4rem 0", fontFamily: "'DM Sans'", fontSize: "0.9rem", background: "transparent", outline: "none", color: "oklch(0.22 0.05 240)", resize: "none" }}
                  />
                </div>

                <div style={{ paddingTop: "0.5rem" }}>
                  <button type="submit" className="btn-pill btn-pill-navy">
                    {tx.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ lang }: { lang: Lang }) {
  const tx = t[lang].footer;
  return (
    <footer style={{ background: "oklch(0.18 0.04 240)", color: "white", padding: "3rem 0 2rem" }}>
      <div className="container">
        <div className="mobile-footer-stack" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem", marginBottom: "2.5rem" }}>
          <div>
            <BodyFlowLogo white />
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: "240px", lineHeight: 1.7 }}>
              {tx.tagline}
            </p>
          </div>
          <div className="mobile-footer-nav" style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            <div>
              <h4 style={{ fontFamily: "'DM Sans'", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>{tx.nav}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {tx.navLinks.map(([label, href]) => (
                  <a key={href} href={href} style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'DM Sans'", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>{tx.contactLabel}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Amsterdamseweg 487<br />1181 BR Amstelveen</p>
                <a href="mailto:info@bodyflow.nl" style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>info@bodyflow.nl</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'DM Sans'", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            {tx.copyright}
          </p>
          <p style={{ fontFamily: "'DM Sans'", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            {tx.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Section theme map: which sections have dark backgrounds
const DARK_SECTIONS = new Set(["hero", "pakketten", "contact"]);

// Floating Language Switcher — uses IntersectionObserver to track visible section
function FloatingLangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sectionIds = ["hero", "eecp", "voordelen", "traject", "pakketten", "prijslijst", "contact"];
    // Track which sections are currently intersecting
    const visible = new Map<string, number>(); // id -> intersectionRatio

    const updateDark = () => {
      // Find the section with the highest intersection ratio
      let bestId = "hero";
      let bestRatio = -1;
      visible.forEach((ratio, id) => {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      });
      setIsDark(DARK_SECTIONS.has(bestId));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        });
        updateDark();
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const borderColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(26,46,74,0.35)";
  const activeBg = isDark ? "rgba(255,255,255,0.18)" : "rgba(26,46,74,0.1)";
  const activeColor = isDark ? "rgba(255,255,255,0.95)" : "oklch(0.22 0.05 240)";
  const inactiveColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(26,46,74,0.4)";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "0.1rem",
        background: "transparent",
        border: `1px solid ${borderColor}`,
        borderRadius: "24px",
        padding: "0.25rem 0.35rem",
        boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.2)" : "0 2px 12px rgba(26,46,74,0.12)",
        backdropFilter: "blur(6px)",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {(["nl", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? activeBg : "transparent",
            color: lang === l ? activeColor : inactiveColor,
            border: "none",
            borderRadius: "18px",
            padding: "0.3rem 0.7rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// Main Home component
export default function Home() {
  const [lang, setLang] = useState<Lang>("nl");

  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hidden.md\\:flex {
            display: none !important;
          }
          .mobile-stack {
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .mobile-full {
            width: 100% !important;
            max-width: 100% !important;
          }
          .mobile-center {
            text-align: center !important;
            align-items: center !important;
          }
          .mobile-hide {
            display: none !important;
          }
          .mobile-padding {
            padding: 3rem 0 !important;
          }
          .mobile-form-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-price-row {
            flex-wrap: wrap !important;
            gap: 0.25rem !important;
          }
          .mobile-intake-icons {
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
          }
          .mobile-intake-price {
            margin-left: 0 !important;
            width: 100% !important;
          }
          .mobile-footer-stack {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .mobile-footer-nav {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .mobile-stat-card {
            position: static !important;
            margin-top: 1.5rem !important;
            max-width: 100% !important;
          }
          .price-row {
            flex-wrap: wrap !important;
            gap: 0.25rem !important;
          }
          .vitality-quote {
            font-size: 1.3rem !important;
          }
          .intake-card {
            padding: 1.5rem !important;
          }
          .contact-form-card {
            padding: 1.5rem !important;
          }
          .traject-step {
            gap: 1rem !important;
          }
          .hero-subtitle {
            font-size: 0.95rem !important;
          }
          .hero-content {
            padding: 0 1rem !important;
          }
          .eecp-image-wrapper {
            aspect-ratio: 4/3 !important;
            max-height: 280px !important;
          }
        }
        @media (min-width: 769px) {
          .md\\:hidden {
            display: none !important;
          }
          .hidden.md\\:flex {
            display: flex !important;
          }
        }
        /* Intake icons grid */
        .intake-icons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .intake-icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-align: center;
        }
        .intake-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: oklch(0.96 0.015 230);
          border: 1px solid oklch(0.88 0.03 230);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .intake-icon-circle:hover {
          background: oklch(0.92 0.025 230);
        }
        .intake-icon-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: oklch(0.45 0.06 235);
          letter-spacing: 0.03em;
          line-height: 1.4;
        }
        .intake-price-text {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem;
          color: oklch(0.40 0.04 235);
          margin: 0;
          padding-top: 1rem;
          border-top: 1px solid oklch(0.92 0.02 230);
        }
        @media (max-width: 768px) {
          .intake-icons-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          .intake-icon-circle {
            width: 58px;
            height: 58px;
          }
          .intake-icon-label {
            font-size: 0.65rem;
          }
          .intake-price-text {
            font-size: 0.8rem;
            text-align: center;
          }
        }
        /* Hide Made with Manus badge */
        a[href*="manus"][style*="position: fixed"],
        div[style*="position: fixed"][style*="z-index: 9999"],
        div[style*="position:fixed"][style*="z-index:9999"] {
          display: none !important;
        }
      `}</style>
      <FloatingLangSwitcher lang={lang} setLang={setLang} />
      <Navbar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <EECPSection lang={lang} />
      <VoordelenSection lang={lang} />
      <VitalityBanner lang={lang} />
      <TrajectSection lang={lang} />
      <PakkettenSection lang={lang} />
      <PrijslijstSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
