import type { Lang } from "@/i18n/LangContext";

type ScienceStat = {
  value: string;
  label: string;
};

type ScienceStudy = {
  tag: string;
  title: string;
  kpiValue: string;
  kpiLabel: string;
  text: string;
  reference: string;
};

type ScienceMechanism = {
  name: string;
  description: string;
};

export type ScienceContent = {
  heroLabel: string;
  heroTitle: string;
  heroIntro: string;
  stats: ScienceStat[];
  studiesLabel: string;
  studies: ScienceStudy[];
  mechanismsLabel: string;
  mechanisms: ScienceMechanism[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

const nl: ScienceContent = {
  heroLabel: "Wetenschappelijke onderbouwing",
  heroTitle: "EECP-therapie: meer dan 35 jaar klinisch bewijs in de cardiologie",
  heroIntro:
    "EECP-therapie is uitgebreid onderzocht en als enige niet-medicamenteuze therapie opgenomen in richtlijnen voor refractaire angina pectoris. Op deze pagina vind je de onderliggende literatuur.",
  stats: [
    { value: "68–74%", label: "verbetering angina (Sinvhal, 2003)" },
    { value: "78%", label: "terugkeer naar werk bij long COVID (Fox, 2024)" },
    {
      value: "63%",
      label: "minder borstkastklachten na traject (Sathyamoorthy et al., 2022)",
    },
  ],
  studiesLabel: "Klinische studies per indicatie",
  studies: [
    {
      tag: "Angina pectoris",
      title: "EECP bij refractaire stabiele angina",
      kpiValue: "68–74%",
      kpiLabel: "verbetering van ≥1 CCS-klasse",
      text: "68 tot 74% van de patiënten rapporteerde een afname van minstens één CCS-anginaklasse. De tijd tot myocardischemie nam significant toe; het aantal aanvallen daalde aantoonbaar.",
      reference:
        "Sinvhal, R.M. (2003). Enhanced external counterpulsation for refractory angina pectoris. Heart, 89(8), 830–833.",
    },
    {
      tag: "Angina zonder obstructies (ANOCA)",
      title: "Serie onder 101 patiënten",
      kpiValue: "3,4 → 2,4",
      kpiLabel: "gemiddelde CCS-klasse na traject",
      text: "Daling van de gemiddelde CCS-klasse van 3,4 naar 2,4, gecombineerd met verbeterde inspanningstolerantie na een volledig EECP-traject.",
      reference: "D. Ashokprabhu et al. (2024). ANOCA-serie, n=101.",
    },
    {
      tag: "Long COVID",
      title: "Vermoeidheid en inspanningstolerantie (n=231)",
      kpiValue: "78%",
      kpiLabel: "terug aan het werk na traject",
      text: "Significante verbeteringen in vermoeidheidsscores en inspanningstolerantie. Van degenen die vóór het traject niet konden werken, keerde 78% terug in loondienst.",
      reference:
        "Fox, J. (2024). Enhanced External Counterpulsation Improves Dyspnea, Fatigue, and Functional Capacity in Patients with Long COVID. MDPI. doi:10.3390/covid4090098",
    },
    {
      tag: "Long COVID — meerdere centra",
      title: "Retrospectieve studie, 7 behandelcentra",
      kpiValue: "63%",
      kpiLabel: "minder borstkastklachten",
      text: "Verbeterde vermoeidheidsscores, grotere loopafstand (6-minutenwandeltest) en hoger activiteitsniveau. 63% van de deelnemers rapporteerde minder borstkastklachten.",
      reference:
        "Sathyamoorthy et al. (2022). Enhanced external counterpulsation for management of symptoms associated with long COVID. American Heart Journal Plus, 100105. doi:10.1016/j.ahjo.2022.100105",
    },
    {
      tag: "Vaatfunctie",
      title: "Endotheelfunctie — meta-analyse van RCT's",
      kpiValue: "Significant",
      kpiLabel: "verbetering endotheel bij coronaire patiënten",
      text: "Meta-analyse van gerandomiseerde studies toont significante verbetering van de endotheelfunctie bij coronaire patiënten na EECP.",
      reference: "Yin et al. (2023). Meta-analyse endotheelfunctie na EECP bij coronaire patiënten.",
    },
    {
      tag: "Richtlijnen",
      title: "Erkenning in internationale richtlijnen",
      kpiValue: "35+ jaar",
      kpiLabel: "klinische toepassing en onderzoek",
      text: "EECP is de enige niet-medicamenteuze therapie die in internationale richtlijnen wordt aanbevolen bij refractaire stabiele angina pectoris.",
      reference: "Overzicht richtlijnen, samengevat in Fox (2024) en Sinvhal (2003).",
    },
  ],
  mechanismsLabel: "Werkingsmechanismen",
  mechanisms: [
    {
      name: "Endotheelfunctie",
      description:
        "Verbetering van de binnenwand van bloedvaten, bevestigd in meerdere klinische studies.",
    },
    {
      name: "Microcirculatie",
      description:
        "Ondersteuning van de kleine bloedvaatjes die zuurstof en voedingsstoffen naar weefsels transporteren.",
    },
    {
      name: "Mitochondriale functie",
      description:
        "Mogelijk positief effect op cellulair energiemetabolisme, relevant bij long COVID-gerelateerde vermoeidheid.",
    },
    {
      name: "Coronaire doorbloeding",
      description:
        "Ritmische drukondersteuning vergroot de bloedstroom tijdens de diastolische fase van de hartcyclus.",
    },
  ],
  ctaTitle: "Vragen over de wetenschappelijke onderbouwing?",
  ctaText: "Onze cardioloog bespreekt de relevantie voor jouw situatie tijdens de intake.",
  ctaButton: "Plan je intake →",
};

const en: ScienceContent = {
  heroLabel: "Scientific evidence",
  heroTitle: "EECP therapy: more than 35 years of clinical evidence in cardiology",
  heroIntro:
    "EECP therapy has been studied extensively and is the only non-pharmaceutical therapy included in guidelines for refractory angina pectoris. On this page you will find the underlying literature.",
  stats: [
    { value: "68–74%", label: "angina improvement (Sinvhal, 2003)" },
    { value: "78%", label: "return to work after long COVID (Fox, 2024)" },
    {
      value: "63%",
      label: "fewer chest complaints after a programme (Sathyamoorthy et al., 2022)",
    },
  ],
  studiesLabel: "Clinical studies by indication",
  studies: [
    {
      tag: "Angina pectoris",
      title: "EECP for refractory stable angina",
      kpiValue: "68–74%",
      kpiLabel: "improvement of ≥1 CCS class",
      text: "68 to 74% of patients reported a reduction of at least one CCS angina class. Time to myocardial ischemia increased significantly; the number of attacks demonstrably decreased.",
      reference:
        "Sinvhal, R.M. (2003). Enhanced external counterpulsation for refractory angina pectoris. Heart, 89(8), 830–833.",
    },
    {
      tag: "Angina without obstructions (ANOCA)",
      title: "Series of 101 patients",
      kpiValue: "3.4 → 2.4",
      kpiLabel: "average CCS class after a programme",
      text: "A decrease of the average CCS class from 3.4 to 2.4, combined with improved exercise tolerance after a full EECP programme.",
      reference: "D. Ashokprabhu et al. (2024). ANOCA series, n=101.",
    },
    {
      tag: "Long COVID",
      title: "Fatigue and exercise tolerance (n=231)",
      kpiValue: "78%",
      kpiLabel: "back at work after a programme",
      text: "Significant improvements in fatigue scores and exercise tolerance. Of those unable to work before the programme, 78% returned to employment.",
      reference:
        "Fox, J. (2024). Enhanced External Counterpulsation Improves Dyspnea, Fatigue, and Functional Capacity in Patients with Long COVID. MDPI. doi:10.3390/covid4090098",
    },
    {
      tag: "Long COVID — multiple centres",
      title: "Retrospective study, 7 treatment centres",
      kpiValue: "63%",
      kpiLabel: "fewer chest complaints",
      text: "Improved fatigue scores, greater walking distance (6-minute walk test) and higher activity levels. 63% of participants reported fewer chest complaints.",
      reference:
        "Sathyamoorthy et al. (2022). Enhanced external counterpulsation for management of symptoms associated with long COVID. American Heart Journal Plus, 100105. doi:10.1016/j.ahjo.2022.100105",
    },
    {
      tag: "Vascular function",
      title: "Endothelial function — meta-analysis of RCTs",
      kpiValue: "Significant",
      kpiLabel: "endothelial improvement in coronary patients",
      text: "A meta-analysis of randomized studies shows significant improvement of endothelial function in coronary patients after EECP.",
      reference: "Yin et al. (2023). Meta-analysis of endothelial function after EECP in coronary patients.",
    },
    {
      tag: "Guidelines",
      title: "Recognition in international guidelines",
      kpiValue: "35+ years",
      kpiLabel: "of clinical use and research",
      text: "EECP is the only non-pharmaceutical therapy recommended in international guidelines for refractory stable angina pectoris.",
      reference: "Guideline overview, summarized in Fox (2024) and Sinvhal (2003).",
    },
  ],
  mechanismsLabel: "Mechanisms of action",
  mechanisms: [
    {
      name: "Endothelial function",
      description:
        "Improvement of the inner lining of blood vessels, confirmed in multiple clinical studies.",
    },
    {
      name: "Microcirculation",
      description:
        "Support for the small blood vessels that transport oxygen and nutrients to tissues.",
    },
    {
      name: "Mitochondrial function",
      description:
        "Possible positive effect on cellular energy metabolism, relevant to long COVID-related fatigue.",
    },
    {
      name: "Coronary blood flow",
      description:
        "Rhythmic pressure support increases blood flow during the diastolic phase of the cardiac cycle.",
    },
  ],
  ctaTitle: "Questions about the scientific evidence?",
  ctaText: "Our cardiologist discusses the relevance to your situation during the intake.",
  ctaButton: "Plan your intake →",
};

export const scienceContent: Record<Lang, ScienceContent> = { nl, en };
