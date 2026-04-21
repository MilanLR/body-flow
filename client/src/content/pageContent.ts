import type { Lang } from "@/i18n/LangContext";

type PageNarrativeSection = {
  title: string;
  body: string;
  items?: string[];
};

type FocusedPageContent = {
  title: string;
  intro: string;
  sections: PageNarrativeSection[];
};

type FocusedPageKey = "treatment" | "costs" | "whoItsFor" | "amsterdam" | "contact";

const pageContent: Record<Lang, Record<FocusedPageKey, FocusedPageContent>> = {
  nl: {
    treatment: {
      title: "EECP-therapie bij BodyFlow Amsterdam",
      intro:
        "EECP-therapie is bedoeld voor mensen die hun doorbloeding, belastbaarheid en herstel willen ondersteunen zonder invasieve ingreep. Op deze pagina lees je hoe de behandeling werkt, welke voordelen cliënten zoeken en hoe een traject is opgebouwd.",
      sections: [
        {
          title: "Een behandeling die rust combineert met circulaire activatie",
          body:
            "Tijdens een sessie lig je ontspannen terwijl het systeem via drukmanchetten ritmisch met je hartritme meebeweegt. Daardoor ontstaat extra ondersteuning voor de bloedstroom op momenten waarop je vaatstelsel daar het meest op reageert.",
        },
        {
          title: "Van intake tot behandelritme",
          body:
            "Een traject start altijd met een medische intake. Daarna bepalen we samen welk ritme past bij jouw vraag, hersteldoel en belastbaarheid, zodat therapie, monitoring en evaluatie op elkaar aansluiten.",
        },
      ],
    },
    costs: {
      title: "Kosten van EECP-therapie",
      intro:
        "Wat kost EECP-therapie bij BodyFlow Amsterdam? De totale investering hangt af van de intake, het aantal sessies en de mate van begeleiding die bij jouw traject past. Hieronder zie je zowel de pakketten als de losse tarieven.",
      sections: [
        {
          title: "Heldere opbouw van intake, sessies en aanvullende ondersteuning",
          body:
            "We houden de prijsopbouw bewust overzichtelijk. Je start met een intake en kiest daarna een route die past bij je doelen: losse sessies, een pakket met extra ondersteuning of een uitgebreider klinisch traject.",
        },
        {
          title: "Samen kiezen wat proportioneel is",
          body:
            "Niet iedereen heeft hetzelfde behandelritme nodig. In de intake bespreken we of een korter optimalisatietraject, een meer gestructureerde klinische route of alleen losse sessies logisch is voor jouw situatie.",
        },
      ],
    },
    whoItsFor: {
      title: "Voor wie EECP-therapie geschikt kan zijn",
      intro:
        "EECP-therapie wordt vaak overwogen door mensen die hun cardiovasculaire ondersteuning, energie of herstel serieus willen verbeteren. De behandeling is niet voor iedereen hetzelfde, daarom begint geschiktheid altijd met een medische beoordeling.",
      sections: [
        {
          title: "Vaak passend bij herstel, verminderde belastbaarheid en prestatievraagstukken",
          body:
            "Cliënten melden zich bijvoorbeeld met aanhoudende vermoeidheid, beperkte inspanningstolerantie, behoefte aan herstel na ziekte of de wens om hun fysieke en mentale belastbaarheid te verbeteren.",
        },
        {
          title: "Intake eerst, pas daarna een behandeladvies",
          body:
            "We gebruiken deze pagina niet om algemene medische claims te doen. Het doel is juist om duidelijk te maken dat de intake bepaalt of EECP in jouw situatie zinvol, veilig en proportioneel is.",
          items: [
            "Mensen die herstel en circulatie willen ondersteunen na een intensieve periode.",
            "Cliënten die zoeken naar meer energie, focus of belastbaarheid in het dagelijks leven.",
            "Mensen die behoefte hebben aan een gestructureerd traject met medische intake en monitoring.",
          ],
        },
      ],
    },
    amsterdam: {
      title: "EECP-therapie in Amsterdam en Amstelveen",
      intro:
        "BodyFlow Amsterdam werkt vanuit Amstelveen voor cliënten uit Amsterdam en de regio. Je vindt hier een rustige behandelomgeving, een medische intake als startpunt en een traject dat gericht is op praktische ondersteuning van herstel en vitaliteit.",
      sections: [
        {
          title: "Goed bereikbaar voor Amsterdam en omgeving",
          body:
            "De locatie aan de Amsterdamseweg in Amstelveen is bedoeld als vaste plek voor intake, behandeling en evaluatie. Daardoor hoeft een traject niet versnipperd te raken over meerdere adressen of losse contactmomenten.",
        },
        {
          title: "Een lokale setting met specialistische focus",
          body:
            "Voor veel cliënten is nabijheid belangrijk: je wilt een locatie die bereikbaar is, maar ook voldoende rust biedt om een behandelritme vol te houden. Daarom combineren we een regionale locatie met een duidelijke focus op EECP-therapie en begeleiding.",
        },
      ],
    },
    contact: {
      title: "Contact met BodyFlow Amsterdam",
      intro:
        "Neem contact op met BodyFlow Amsterdam als je vragen hebt over EECP-therapie, een intake wilt plannen of wilt bespreken of een traject bij jouw situatie past. Via het formulier kun je je voorkeur voor telefoon of e-mail doorgeven.",
      sections: [
        {
          title: "Neem contact op met BodyFlow Amsterdam",
          body:
            "Gebruik het formulier voor een intake-aanvraag of een inhoudelijke vraag. We reageren zo snel mogelijk en stemmen het eerste contactmoment af op jouw voorkeursmethode.",
        },
      ],
    },
  },
  en: {
    treatment: {
      title: "EECP therapy at BodyFlow Amsterdam",
      intro:
        "EECP therapy is for people who want to support circulation, resilience and recovery without an invasive intervention. This page explains how the treatment works, which benefits clients often seek, and how a trajectory is structured.",
      sections: [
        {
          title: "A treatment that combines rest with circulatory activation",
          body:
            "During a session you lie down and relax while the system works rhythmically with your heartbeat through calibrated cuffs. That creates extra support for blood flow at the moments your vascular system can respond to it most effectively.",
        },
        {
          title: "From intake to treatment rhythm",
          body:
            "Every trajectory starts with a medical intake. From there we determine the rhythm that fits your question, recovery goal and capacity, so the therapy, monitoring and evaluation stay aligned.",
        },
      ],
    },
    costs: {
      title: "EECP therapy costs",
      intro:
        "What does EECP therapy cost at BodyFlow Amsterdam? The total investment depends on the intake, the number of sessions and the level of support that fits your trajectory. Below you can see both the package options and the individual rates.",
      sections: [
        {
          title: "A clear structure for intake, sessions and added support",
          body:
            "We keep the pricing deliberately transparent. You start with an intake and then choose the route that matches your goals: individual sessions, a package with extra support, or a more structured clinical trajectory.",
        },
        {
          title: "Choosing what is proportionate for your situation",
          body:
            "Not everyone needs the same treatment rhythm. During the intake we discuss whether a shorter optimisation trajectory, a more structured clinical route or only individual sessions makes sense for your situation.",
        },
      ],
    },
    whoItsFor: {
      title: "Who EECP therapy may be for",
      intro:
        "EECP therapy is often considered by people who want to seriously improve cardiovascular support, energy or recovery. Suitability is never assumed, which is why every recommendation starts with a medical assessment.",
      sections: [
        {
          title: "Often relevant for recovery, reduced capacity and performance goals",
          body:
            "Clients often come in with persistent fatigue, limited exercise tolerance, a need for structured recovery after illness, or a wish to improve physical and mental resilience.",
        },
        {
          title: "Intake first, then a treatment recommendation",
          body:
            "This page is not meant to make broad medical claims. Its purpose is to explain that the intake determines whether EECP is useful, safe and proportionate in your situation.",
          items: [
            "People who want to support recovery and circulation after an intense period.",
            "Clients looking for more energy, focus or day-to-day resilience.",
            "People who want a structured trajectory with medical intake and monitoring.",
          ],
        },
      ],
    },
    amsterdam: {
      title: "EECP therapy in Amsterdam and Amstelveen",
      intro:
        "BodyFlow Amsterdam operates from Amstelveen for clients in Amsterdam and the surrounding area. The setting combines a calm treatment environment, a medical intake as the starting point and a trajectory focused on practical support for recovery and vitality.",
      sections: [
        {
          title: "Accessible from Amsterdam and the wider region",
          body:
            "The location on Amsterdamseweg in Amstelveen is designed as one fixed place for intake, treatment and follow-up. That keeps the trajectory coherent instead of spreading it across different addresses or disconnected appointments.",
        },
        {
          title: "A local setting with specialist focus",
          body:
            "For many clients, proximity matters: you want a location that is easy to reach but calm enough to maintain a treatment rhythm. That is why we combine a regional location with a clear focus on EECP therapy and guidance.",
        },
      ],
    },
    contact: {
      title: "Contact BodyFlow Amsterdam",
      intro:
        "Contact BodyFlow Amsterdam if you have questions about EECP therapy, want to schedule an intake or would like to discuss whether a trajectory fits your situation. You can also use the form to share whether you prefer a call or an email.",
      sections: [
        {
          title: "Get in touch with BodyFlow Amsterdam",
          body:
            "Use the form for an intake request or a more detailed question. We will respond as quickly as possible and match the first follow-up to your preferred contact method.",
        },
      ],
    },
  },
};

export function getPageContent(lang: Lang, pageKey: FocusedPageKey) {
  return pageContent[lang][pageKey];
}
