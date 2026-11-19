import type { BlogPost } from "../types";

const SOURCES = [
  "Mielniczuk L, Beck da Silva L, Haddad H. Enhanced external counterpulsation in ischemic heart disease and congestive heart failure. CMAJ. 2004;170(8):1223-1224. https://pmc.ncbi.nlm.nih.gov/articles/PMC385349",
  "Akhtar M, Wu GF, Du ZM, Zheng ZS, Michaels AD. Effect of external counterpulsation on plasma nitric oxide and endothelin-1 levels. Am J Cardiol. 2006;98(1):28-30. https://pubmed.ncbi.nlm.nih.gov/16784915/",
  "Braith RW, Conti CR, Nichols WW, et al. Enhanced external counterpulsation improves peripheral artery flow-mediated dilation in patients with chronic angina: a randomized sham-controlled study. Circulation. 2010;122(16):1612-1620. https://pubmed.ncbi.nlm.nih.gov/20921442/",
  "Bonetti PO, Holmes DR Jr, Lerman A, Barsness GW. Enhanced external counterpulsation for ischemic heart disease: what's behind the curtain? J Am Coll Cardiol. 2003;41(11):1918-1925. https://pubmed.ncbi.nlm.nih.gov/12798558/",
  "van der Zwaard S, de Ruiter CJ, Noordhof DA, et al. Maximal oxygen uptake is proportional to muscle fiber oxidative capacity, from chronic heart failure patients to professional cyclists. J Appl Physiol. 2016;121(3):636-645. https://doi.org/10.1152/japplphysiol.00355.2016",
  "Nisoli E, Clementi E, Paolucci C, et al. Mitochondrial biogenesis in mammals: the role of endogenous nitric oxide. Science. 2003;299(5608):896-899. https://doi.org/10.1126/science.1079368",
  "Roberts LA, Caia J, James LP, Scott TJ, Kelly VG. Effects of external counterpulsation on postexercise recovery in elite rugby league players. Int J Sports Physiol Perform. 2019;14(10):1350-1356. https://pubmed.ncbi.nlm.nih.gov/30958058/",
  "Russell S, Evans AG, Jenkins DG, Kelly VG. Effect of external counterpulsation on running performance and perceived recovery. Int J Sports Physiol Perform. 2020;15(7):920-926. https://pubmed.ncbi.nlm.nih.gov/32106075/",
  "Zhao M, Huang Y, Li L, et al. Enhanced external counterpulsation efficacy on exercise endurance in COPD patients and healthy subjects: a pilot randomized clinical trial. Int J Chron Obstruct Pulmon Dis. 2020;15:25-31. https://pubmed.ncbi.nlm.nih.gov/32021141/",
  "Valenzuela PL, Sánchez-Martínez G, Torrontegi E, et al. Enhanced external counterpulsation and short-term recovery from high-intensity interval training. Int J Sports Physiol Perform. 2018;13(8):1100-1106. https://pubmed.ncbi.nlm.nih.gov/29466090/",
  "Valenzuela PL, Montalvo Z, Torrontegi E, et al. Enhanced external counterpulsation and recovery from a plyometric exercise bout. Clin J Sport Med. 2020;30(4):416-419. https://pubmed.ncbi.nlm.nih.gov/29952839/",
  "Gloekler S, Meier P, de Marchi SF, et al. Coronary collateral growth by external counterpulsation: a randomised controlled trial. Heart. 2010;96(3):202-207. https://pubmed.ncbi.nlm.nih.gov/19897461/",
  "Martin JS, Beck DT, Aranda JM Jr, Braith RW. Enhanced external counterpulsation improves peripheral artery function and glucose tolerance in subjects with abnormal glucose tolerance. J Appl Physiol. 2012;112(5):868-876. https://doi.org/10.1152/japplphysiol.01336.2011",
];

export const eecpEnTopsport: BlogPost = {
  key: "eecp-en-topsport",
  datePublished: "2026-11-19",
  image: {
    src: "/images/blog-eecp-en-topsport.webp",
    alt: {
      nl: "Een sporter staat bij zonsondergang op een atletiekbaan",
      en: "An athlete stands on a running track at sunset",
    },
  },
  locales: {
    nl: {
      slug: "eecp-en-topsport",
      seoTitle: "EECP en topsport: herstel en doorbloeding | BodyFlow",
      seoDescription:
        "EECP en topsport: wat zegt het onderzoek over herstel en doorbloeding bij sporters? Lees wat studies laten zien en waar ze nog tekortschieten.",
      title: "EECP en topsport: hoe betere doorbloeding het herstel kan ondersteunen",
      intro:
        "Op topniveau bepalen niet alleen de trainingsuren hoe ver een sporter komt. Minstens zo belangrijk is wat daarna gebeurt, wanneer het lichaam herstelt en zich aanpast aan wat het heeft gedaan. Juist daar ligt de waarde van EECP, een therapie die de bloedcirculatie op een passieve manier stimuleert. De eerste onderzoeken bij sporters geven reden voor optimisme: bij professionele rugbyspelers lag het vermogen vijf uur na een zware training hoger na behandeling en recreatieve hardlopers hielden na een zware inspanning meer over voor een tweede test. Tegelijk zijn de studies klein en lopen de uitkomsten uiteen. In dit artikel leggen we uit hoe de therapie werkt, wat het onderzoek laat zien en waar de studies nog tekortschieten.",
      sections: [
        {
          title: "Kort samengevat",
          callout: true,
          paragraphs: [],
          bullets: [
            "EECP stimuleert de bloedcirculatie op een passieve manier.",
            "Bij professionele rugbyspelers lag het vermogen na behandeling hoger en hardlopers hielden meer energie over voor een tweede test.",
            "Niet elke studie zag een effect. Bij deze studies was de gehanteerde behandelduur van het hele traject 30 tot 60 minuten.",
          ],
        },
        {
          title: "Wat EECP in het lichaam doet",
          paragraphs: [
            "EECP staat voor enhanced external counterpulsation. Bij deze therapie worden manchetten om de benen op het ritme van het hart opgeblazen: tijdens de rustfase van het hart lopen ze vol en net voor het aanspannen van het hart laten ze snel los.[1] Het opblazen duwt bloed uit de benen terug naar het hart en verhoogt de druk in de rustfase. Hierdoor worden de vaten van het hart beter doorbloed. Het snelle loslaten verlaagt vervolgens de weerstand waartegen het hart pompt. Het hart krijgt zo meer bloed aangeleverd en hoeft minder kracht te zetten om het rond te pompen.[1]",
            "Daarnaast verandert er iets in de bloedvaten zelf: door de snellere bloedstroom nemen de krachten op de vaatwand toe en wordt de aanmaak van stikstofmonoxide, een stof die vaten laat verwijden, gestimuleerd. Bij patiënten met een hartaandoening nam de aanmaak van deze vaatverwijdende stof toe en die van een vaatvernauwende stof af.[2] Ook de werking van de bloedvaten zelf verbeterde. In een studie met 42 patiënten kreeg een deel van de groep echte EECP-therapie en een deel een placebo-behandeling. Bij de patiënten met echte EECP-therapie werkten de bloedvaten daarna duidelijk beter dan bij de patiënten met de placebo-behandeling.[3] Onderzoekers veronderstellen dat deze effecten lijken op die van lichaamsbeweging.[4]",
            "Stikstofmonoxide heeft niet alleen invloed op de bloedvaten. Het speelt ook een rol in de mitochondriën, de kleine energiecentrales in de spiercellen die zuurstof omzetten in brandstof. Hoe beter de mitochondriën werken, hoe meer zuurstof de spieren tijdens inspanning kunnen benutten.[5]",
            "Uit onderzoek met cellen en muizen blijkt dat stikstofmonoxide het lichaam aanzet tot het maken van nieuwe mitochondriën. De stof activeert daarvoor een eiwit (PGC-1α) dat als hoofdschakelaar werkt. Muizen zonder het enzym eNOS, dat stikstofmonoxide aanmaakt, kregen na blootstelling aan kou duidelijk minder nieuwe mitochondriën in hun bruine vetweefsel.[6]",
          ],
        },
        {
          title: "Wat het onderzoek bij sporters laat zien",
          paragraphs: [
            "Bij sporters zijn tot nu toe vooral twee vragen onderzocht: Kan EECP het herstel na een inspanning ondersteunen? En: Verbetert het uithoudingsvermogen na een heel traject? De resultaten van deze vraagstukken belichten niet zozeer de onderliggende mechanismen van EECP-therapie, maar geven wel inzicht in de positieve effecten die hieruit kunnen ontstaan.",
            "Voor de eerste vraag zagen twee studies een gunstig effect. Bij zeven professionele rugbyspelers uit de National Rugby League gaf 30 minuten behandeling na een training vijf uur later 11% hoger piekvermogen en 14% hoger opgebouwd vermogen op een fietstest dan de placebo-groep. Ook veranderden markers voor stress en ontsteking in gunstige richting.[7] In een tweede studie liepen 13 recreatief actieve mannen na een zware inspanning in de middag een tweede shuttlerun. Na 20 minuten behandeling nam hun prestatie minder af dan na stilliggen en ze ervoeren hun herstel ook als beter.[8]",
            "De tweede vraag, over het uithoudingsvermogen, is onderzocht in een pilotstudie met 72 vrijwilligers. Na een traject van drie weken, waarin zij vijf dagen per week een uur per dag werden behandeld, nam de maximale zuurstofopname sterker toe dan in de onbehandelde groep.[9]",
          ],
        },
        {
          title: "Waarom niet elke studie hetzelfde zag",
          paragraphs: [
            "Niet elke studie zag een effect. Bij 12 elite jeugdtriatleten had één sessie van 30 minuten na een intervaltraining geen invloed op prestatie, lactaat of beleving vergeleken met een placebo-behandeling.[10] Ook bij 10 gezonde, actieve volwassenen verbeterde het herstel van spierschade na springtraining niet na twee sessies van 30 minuten.[11] Opvallend is hoe kort het traject was: 30 en 60 minuten in totaal.",
            "Twee zaken kunnen een rol spelen bij het wegblijven van resultaat. De eerste is de behandelduur. Veel gunstige effecten op de bloedvaten treden pas op na meerdere sessies.[2,3,12] Daar staat tegenover dat twee studies al na één sessie een beter herstel zagen.[7,8] Dat ging om herstel op korte termijn en niet om blijvende aanpassingen van het lichaam.",
            "De tweede is de druk waarmee de manchetten worden opgeblazen. Beide studies zonder effect gebruikten een lage druk, terwijl de studie met een positief resultaat een hogere druk gebruikte.[9,10,11]",
          ],
        },
        {
          title: "Wat dit voor topsporters en coaches kan betekenen",
          paragraphs: [
            "EECP is een passieve manier om de bloedcirculatie te stimuleren en het kan helpen bij het herstel tussen trainingen of wedstrijden, zeker in een druk schema. Alhoewel er op onderzoeksgebied nog veel te winnen valt, biedt de therapie nu al interessante mogelijkheden voor topsporters.",
            "Het lichaam benut de voordelen van een verhoogde bloedcirculatie zonder dat de spieren en de gewrichten extra worden belast. In de studies bij sporters bleef het vermogen na één sessie beter behouden en ervoeren de sporters hun herstel als beter,[7,8] terwijl in een pilotstudie met 72 deelnemers geen enkele bijwerking werd gemeld.[9]",
            "Op de langere termijn laat EECP daarnaast mooie resultaten zien. In onderzoek bij mensen groeiden bijvaten rond vernauwingen (arteriogenese)[12] en kwamen er haarvaten bij (angiogenese).[13] Een betere doorbloeding is precies wat het lichaam nodig heeft om te herstellen en zich aan te passen aan training. Vanuit fysiologisch perspectief kan EECP een zinvolle methode zijn om het herstel en de trainingsadaptatie van (top)sporters te ondersteunen. Verder onderzoek bij sporters uit uiteenlopende disciplines kan meer inzicht geven in de onderliggende werkingsmechanismen en de omvang van de effecten, zodat de fysiologische en sportieve meerwaarde van EECP nauwkeuriger kan worden vastgesteld.",
          ],
        },
      ],
      internalLinks: [
        { label: "Bekijk de wetenschappelijke onderbouwing", page: "science" },
        { label: "Lees meer over EECP-therapie", page: "treatment" },
        { label: "Voor wie is EECP geschikt?", page: "whoItsFor" },
      ],
      sources: SOURCES,
    },
    en: {
      slug: "eecp-therapy-for-athletes",
      seoTitle: "EECP and elite sport: recovery and circulation | BodyFlow",
      seoDescription:
        "EECP and elite sport: what does research say about recovery and circulation in athletes? Read what studies show and where they still fall short.",
      title: "EECP and elite sport: how better circulation can support recovery",
      intro:
        "At the top level, training hours are not the only thing that determines how far an athlete gets. What happens afterwards is at least as important, when the body recovers and adapts to what it has done. That is exactly where the value of EECP lies, a therapy that stimulates blood circulation in a passive way. The first studies in athletes give reason for optimism: in professional rugby players, power output five hours after a hard training session was higher after treatment, and recreational runners had more left for a second test after a hard effort. At the same time, the studies are small and the results vary. In this article we explain how the therapy works, what the research shows and where the studies still fall short.",
      sections: [
        {
          title: "In short",
          callout: true,
          paragraphs: [],
          bullets: [
            "EECP stimulates blood circulation in a passive way.",
            "In professional rugby players, power output was higher after treatment, and runners had more energy left for a second test.",
            "Not every study found an effect. In these studies, the total treatment time of the whole programme was 30 to 60 minutes.",
          ],
        },
        {
          title: "What EECP does in the body",
          paragraphs: [
            "EECP stands for enhanced external counterpulsation. In this therapy, cuffs around the legs are inflated in time with the heartbeat: they fill during the heart's resting phase and release quickly just before the heart contracts.[1] The inflation pushes blood from the legs back towards the heart and raises the pressure during the resting phase. As a result, the vessels of the heart receive more blood. The rapid release then lowers the resistance the heart pumps against. The heart is thus supplied with more blood and has to exert less force to pump it around.[1]",
            "In addition, something changes in the blood vessels themselves: because of the faster blood flow, the forces on the vessel wall increase and the production of nitric oxide, a substance that makes vessels widen, is stimulated. In patients with heart disease, the production of this vessel-widening substance increased and that of a vessel-narrowing substance decreased.[2] The function of the blood vessels also improved. In a study of 42 patients, part of the group received real EECP therapy and part a placebo treatment. In the patients who received real EECP therapy, the blood vessels subsequently worked clearly better than in the patients who received the placebo treatment.[3] Researchers assume that these effects resemble those of physical exercise.[4]",
            "Nitric oxide does not only affect the blood vessels. It also plays a role in the mitochondria, the tiny power plants in muscle cells that convert oxygen into fuel. The better the mitochondria work, the more oxygen the muscles can use during exercise.[5]",
            "Research in cells and mice shows that nitric oxide prompts the body to make new mitochondria. The substance activates a protein (PGC-1α) that acts as a master switch. Mice lacking the enzyme eNOS, which produces nitric oxide, made clearly fewer new mitochondria in their brown fat after exposure to cold.[6]",
          ],
        },
        {
          title: "What research in athletes shows",
          paragraphs: [
            "In athletes, two main questions have been studied so far: Can EECP support recovery after exertion? And: Does endurance improve after a full programme? The results on these questions do not so much shed light on the underlying mechanisms of EECP therapy, but they do give insight into the positive effects that can arise from it.",
            "For the first question, two studies saw a favourable effect. In seven professional rugby players from the National Rugby League, 30 minutes of treatment after a training session gave 11% higher peak power and 14% higher accumulated power on a cycling test five hours later than in the placebo group. Markers of stress and inflammation also moved in a favourable direction.[7] In a second study, 13 recreationally active men ran a second shuttle run in the afternoon after a hard effort. After 20 minutes of treatment their performance declined less than after lying still, and they also experienced their recovery as better.[8]",
            "The second question, about endurance, was studied in a pilot study with 72 volunteers. After a programme of three weeks, in which they were treated one hour a day, five days a week, maximal oxygen uptake increased more than in the untreated group.[9]",
          ],
        },
        {
          title: "Why not every study saw the same",
          paragraphs: [
            "Not every study saw an effect. In 12 elite junior triathletes, a single 30-minute session after interval training had no effect on performance, lactate or how the athletes felt compared with a placebo treatment.[10] In 10 healthy, active adults, recovery from muscle damage after jump training also did not improve after two sessions of 30 minutes.[11] What stands out is how short the programme was: 30 to 60 minutes in total.",
            "Two things may play a role in the absence of results. The first is treatment duration. Many beneficial effects on the blood vessels are only seen after multiple sessions.[2,3,12] On the other hand, two studies saw better recovery after just one session.[7,8] That concerned short-term recovery and not lasting adaptations of the body.",
            "The second is the pressure with which the cuffs are inflated. Both studies without an effect used a low pressure, whereas the study with a positive result used a higher pressure.[9,10,11]",
          ],
        },
        {
          title: "What this can mean for elite athletes and coaches",
          paragraphs: [
            "EECP is a passive way to stimulate blood circulation and it can help with recovery between training sessions or matches, especially in a busy schedule. Although there is still a lot to gain in terms of research, the therapy already offers interesting possibilities for elite athletes.",
            "The body benefits from the advantages of increased blood circulation without additional strain on the muscles and joints. In the studies in athletes, power was better maintained after one session and the athletes experienced their recovery as better,[7,8] while in a pilot study with 72 participants no adverse events at all were reported.[9]",
            "In the longer term, EECP also shows promising results. In research in people, collateral vessels grew around narrowings (arteriogenesis)[12] and capillaries were added (angiogenesis).[13] Better circulation is exactly what the body needs to recover and adapt to training. From a physiological perspective, EECP can be a worthwhile method to support the recovery and training adaptation of (elite) athletes. Further research in athletes from a range of disciplines can provide more insight into the underlying mechanisms and the size of the effects, so that the physiological and athletic added value of EECP can be determined more precisely.",
          ],
        },
      ],
      internalLinks: [
        { label: "View the scientific evidence", page: "science" },
        { label: "Read more about EECP therapy", page: "treatment" },
        { label: "Who is EECP suitable for?", page: "whoItsFor" },
      ],
      sources: SOURCES,
    },
  },
};
