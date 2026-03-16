"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "glossary" | "sign-gifts" | "bibliography";

interface GlossaryEntry {
  term: string;
  greek?: string;
  refs?: string;
  definition: string;
}

interface BibliographyEntry {
  author: string;
  title: string;
  publisher: string;
  year: number;
  note: string;
}

// ─── GLOSSARY ──────────────────────────────────────────

const FOUNDATIONAL: GlossaryEntry[] = [
  {
    term: "Spiritual Gift",
    greek: "charisma (χάρισμα), pl. charismata (χαρίσματα)",
    refs: "Rom. 12:6; 1 Cor. 12:4, 9, 28, 30\u201331; 1 Pet. 4:10",
    definition:
      "A grace-gift bestowed by the Holy Spirit on believers for the common good and the building up of Christ\u2019s body. The word derives from charis (\u03c7\u03ac\u03c1\u03b9\u03c2, \u201cgrace\u201d), emphasizing that the gift is unmerited and originates in God\u2019s sovereign generosity, not human effort. As Schreiner notes, \u201cCharismata are not rewards for spiritual achievement but expressions of God\u2019s grace distributed as He wills\u201d (Spiritual Gifts, 21). The NIDNTT observes that charisma in Paul always denotes \u201ca concrete expression of grace\u201d oriented toward the life of the community (vol. 2, 121). Spiritual gifts are distinct from natural talents in their orientation toward ecclesial edification, though they often overlap with and are expressed through a person\u2019s natural abilities, temperament, and experience.",
  },
  {
    term: "Gifts of the Spirit",
    greek: "pneumatika (\u03c0\u03bd\u03b5\u03c5\u03bc\u03b1\u03c4\u03b9\u03ba\u03ac)",
    refs: "1 Cor. 12:1; 14:1",
    definition:
      "Paul uses this term (\u201cspiritual things\u201d or \u201cspiritual gifts\u201d) alongside charismata, sometimes interchangeably. The distinction, where it exists, is one of emphasis: pneumatika stresses the Spirit as the source and empowering agent, while charismata stresses the gracious character of the gift. Fee (God\u2019s Empowering Presence, 32) argues that Paul\u2019s preference for charismata in 1 Corinthians 12:4\u201311 is deliberate \u2014 a corrective to the Corinthians\u2019 overemphasis on the spectacular, redirecting attention to grace rather than power.",
  },
  {
    term: "Body of Christ",
    greek: "s\u014dma Christou (\u03c3\u1ff6\u03bc\u03b1 \u03a7\u03c1\u03b9\u03c3\u03c4\u03bf\u1fe6)",
    refs: "Rom. 12:4\u20135; 1 Cor. 12:12\u201327; Eph. 4:4, 12, 16; Col. 1:18",
    definition:
      "Paul\u2019s central metaphor for the church as a unified organism in which every member has a distinct and necessary function. The body imagery governs his entire theology of gifts: diversity serves unity, no member is dispensable, and each gift exists for the health of the whole rather than the prestige of the individual. As Ridderbos observes in Paul: An Outline of His Theology, \u201cthe body-of-Christ concept is not merely illustrative but constitutive \u2014 it defines what the church is and how it functions\u201d (376). This metaphor is foundational to understanding why spiritual gifts exist: not for individual status, but for communal flourishing.",
  },
  {
    term: "Edification",
    greek: "oikodom\u0113 (\u03bf\u1f30\u03ba\u03bf\u03b4\u03bf\u03bc\u03ae), verb oikodomein (\u03bf\u1f30\u03ba\u03bf\u03b4\u03bf\u03bc\u03b5\u1fd6\u03bd)",
    refs: "1 Cor. 14:3\u20135, 12, 26; Eph. 4:12, 16, 29",
    definition:
      "Literally \u201cbuilding up\u201d \u2014 the constructive strengthening of the church spiritually, relationally, and missionally. In the New Testament, edification is the stated purpose and criterion of spiritual gifts. Paul\u2019s argument in 1 Corinthians 14 hinges on this principle: whatever builds up the assembly is to be preferred over what merely impresses. Thiselton (The First Epistle to the Corinthians, NIGTC, 1062) notes that oikodom\u0113 functions as Paul\u2019s \u201cregulative principle for worship\u201d \u2014 every exercise of a gift must pass the test of whether it builds up the body. A gift exercised without love or apart from the good of the body is misused, regardless of how impressive it may appear.",
  },
  {
    term: "The More Excellent Way",
    greek: "kath\u2019 hyperbol\u0113n hodon (\u03ba\u03b1\u03b8\u2019 \u1f51\u03c0\u03b5\u03c1\u03b2\u03bf\u03bb\u1f74\u03bd \u1f41\u03b4\u03cc\u03bd)",
    refs: "1 Cor. 12:31b\u201313:13",
    definition:
      "Paul\u2019s introduction to the \u201clove chapter\u201d (1 Corinthians 13), which he places deliberately between his discussion of the diversity of gifts (ch. 12) and his instructions for their orderly exercise (ch. 14). The placement is theologically significant: love is not a gift among gifts but the context in which all gifts must operate. Without love, even the most spectacular gifts are \u201cnothing\u201d (13:2). Carson (Showing the Spirit, 61) argues that this passage is not a sentimental interlude but a \u201cdevastating criterion\u201d by which the Corinthians\u2019 gift-obsession is judged. Love is patient, kind, not self-seeking \u2014 the opposite of the competitive, status-driven gift culture Paul is correcting.",
  },
  {
    term: "Common Grace vs. Special Grace",
    refs: "Matt. 5:45; Acts 14:17; James 1:17",
    definition:
      "Common grace refers to God\u2019s general blessings given to all people \u2014 talents, abilities, conscience, beauty, order in creation. Special grace refers to God\u2019s saving and sanctifying work in believers. Spiritual gifts operate in the realm of special grace: they are given to believers for the building up of the church. However, as Bavinck argues (Reformed Dogmatics, vol. 4, 95\u201396), the Spirit\u2019s gifting work often operates through and sanctifies capacities that exist at the level of common grace \u2014 a naturally organized person may be gifted in administration, a naturally empathetic person in shepherding. The gifts are no less \u201cspiritual\u201d for being expressed through natural capacities; the Spirit sovereignly shapes and directs what He has providentially given.",
  },
  {
    term: "Providential Gifting",
    refs: "1 Cor. 12:11, 18; Eph. 4:7",
    definition:
      "The view that the Holy Spirit distributes gifts to believers through God\u2019s providence \u2014 working through natural abilities, personality, life experiences, and circumstances rather than exclusively through sudden supernatural impartation. This does not diminish the Spirit\u2019s role; rather, it affirms that God sovereignly shapes people for service through the full range of means at His disposal. Schreiner (Spiritual Gifts, 152\u2013153) notes that Paul\u2019s language in 1 Corinthians 12:11 (\u201cthe Spirit distributes to each one individually as He wills\u201d) is compatible with both immediate and mediated distribution. The Spirit\u2019s sovereignty, not the mode of delivery, is the point.",
  },
  {
    term: "Sufficiency of Scripture",
    greek: "autarkeia (\u03b1\u1f50\u03c4\u03ac\u03c1\u03ba\u03b5\u03b9\u03b1) of the Word",
    refs: "2 Tim. 3:16\u201317; 2 Pet. 1:3; Heb. 1:1\u20132",
    definition:
      "The doctrine that Scripture contains everything necessary for knowing God, understanding salvation, and living in obedience to Him. In the context of spiritual gifts, this doctrine undergirds the cessationist conviction that new revelation is neither needed nor given \u2014 the Spirit works through the completed Word, not apart from it. As the Westminster Confession states (1.6), \u201cThe whole counsel of God\u2026is either expressly set down in Scripture, or by good and necessary consequence may be deduced from Scripture: unto which nothing at any time is to be added.\u201d This principle means that any assessment tool (including this one) must be subordinate to Scripture, not a replacement for it.",
  },
];

const GIFT_LISTS: GlossaryEntry[] = [
  {
    term: "The Gift Lists",
    refs: "Rom. 12:6\u20138; 1 Cor. 12:8\u201310, 28\u201330; Eph. 4:11; 1 Pet. 4:10\u201311",
    definition:
      "The New Testament contains four primary gift lists, none of which are identical. Romans 12 lists prophecy, service, teaching, exhortation, giving, leadership, and mercy. 1 Corinthians 12:8\u201310 lists wisdom, knowledge, faith, healing, miracles, prophecy, distinguishing spirits, tongues, and interpretation. 1 Corinthians 12:28 lists apostles, prophets, teachers, miracles, healings, helps, administration, and tongues. Ephesians 4:11 lists apostles, prophets, evangelists, and pastor-teachers. 1 Peter 4:10\u201311 broadly categorizes gifts as speaking and serving. The variation across lists indicates that Paul did not intend any single enumeration to be exhaustive. As Carson (Showing the Spirit, 36) observes, \u201cThe lists overlap, diverge, and defy harmonization into a single taxonomy \u2014 which suggests that Paul\u2019s concern was illustrative, not definitional.\u201d",
  },
  {
    term: "Offices vs. Gifts",
    refs: "Eph. 4:11; 1 Tim. 3:1\u201313; Titus 1:5\u20139",
    definition:
      "The New Testament distinguishes between ongoing church offices (elder/overseer and deacon) and Spirit-given gifts. Ephesians 4:11 occupies a middle ground: apostles, prophets, evangelists, and pastor-teachers are described as Christ\u2019s gifts to the church, but they also describe recognized roles or functions. The Pastoral Epistles define qualifications for elders and deacons that involve character, not merely gifting. As Clowney notes (The Church, 209), \u201cGifts equip for service, but offices establish accountability \u2014 the church needs both.\u201d In this assessment, we focus on gifts as capacities for service, not as qualifications for office.",
  },
];

const CONTINUING_GIFTS: GlossaryEntry[] = [
  {
    term: "Teaching",
    greek: "didaskalia (\u03b4\u03b9\u03b4\u03b1\u03c3\u03ba\u03b1\u03bb\u03af\u03b1), didaskalos (\u03b4\u03b9\u03b4\u03ac\u03c3\u03ba\u03b1\u03bb\u03bf\u03c2)",
    refs: "Rom. 12:7; 1 Cor. 12:28\u201329; Eph. 4:11; 1 Tim. 4:13; 2 Tim. 2:2",
    definition:
      "The gift of clearly explaining and applying Scripture so that others understand and grow. The TDNT (vol. 2, 160\u2013162) traces didaskalos from its classical Greek use for an instructor to its New Testament function as one who expounds the apostolic teaching. In cessationist theology, teaching is distinguished from apostolic-era prophecy: the teacher expounds and applies existing revelation (Scripture) rather than delivering new revelation. The teacher\u2019s authority derives from the text, not from a personal revelatory experience. As Schreiner argues (Spiritual Gifts, 118), the continuing gift of teaching is the post-apostolic successor to the revelatory functions \u2014 the Spirit illuminates the written Word through gifted teachers.",
  },
  {
    term: "Word of Wisdom / Word of Knowledge",
    greek: "logos sophias (\u03bb\u03cc\u03b3\u03bf\u03c2 \u03c3\u03bf\u03c6\u03af\u03b1\u03c2) / logos gn\u014dse\u014ds (\u03bb\u03cc\u03b3\u03bf\u03c2 \u03b3\u03bd\u03ce\u03c3\u03b5\u03c9\u03c2)",
    refs: "1 Cor. 12:8",
    definition:
      "Two gifts listed in 1 Corinthians 12:8 whose precise meaning is debated. \u201cWord of wisdom\u201d likely refers to the ability to apply divine truth to specific situations with insight and discernment; \u201cword of knowledge\u201d to the ability to understand and articulate doctrinal truth. Some scholars (e.g., Grudem, Systematic Theology, 1080) connect these to revelatory gifts; others (e.g., Carson, Showing the Spirit, 38\u201339) argue they describe the application of wisdom and knowledge to concrete situations, which would make them expressions of the teaching and discernment gifts. In this assessment, these capacities are reflected in the Word & Wisdom and Prophetic & Discernment categories.",
  },
  {
    term: "Shepherding / Pastoring",
    greek: "poim\u0113n (\u03c0\u03bf\u03b9\u03bc\u03ae\u03bd)",
    refs: "Eph. 4:11; Acts 20:28; 1 Pet. 5:1\u20134; John 10:1\u201318",
    definition:
      "The gift of long-term spiritual care for individuals. The Greek poim\u0113n means \u201cshepherd\u201d and implies guidance, protection, feeding, and sustained relational investment. The NIDNTT (vol. 3, 564) notes that shepherding in the biblical world was not sentimental but involved real danger, self-sacrifice, and constant vigilance. In Ephesians 4:11, \u201cpastors and teachers\u201d (poimen\u0101s kai didaskalous) are linked by a single article (Granville Sharp\u2019s rule), suggesting a single office with dual functions: feeding through teaching and tending through care. This gift is closely related to but distinct from teaching alone \u2014 a shepherd\u2019s primary orientation is toward people, while a teacher\u2019s primary orientation is toward truth.",
  },
  {
    term: "Exhortation / Encouragement",
    greek: "parakl\u0113sis (\u03c0\u03b1\u03c1\u03ac\u03ba\u03bb\u03b7\u03c3\u03b9\u03c2), verb parakalein (\u03c0\u03b1\u03c1\u03b1\u03ba\u03b1\u03bb\u03b5\u1fd6\u03bd)",
    refs: "Rom. 12:8; 1 Thess. 2:11\u201312; Heb. 3:13; 10:24\u201325",
    definition:
      "The gift of coming alongside others to encourage, challenge, comfort, and urge them toward growth in Christ. The Greek parakl\u0113sis carries the rich sense of one who is \u201ccalled alongside\u201d (para + kalein) \u2014 a counselor, advocate, or coach. The same root gives us \u201cParaclete\u201d (parakletos), Jesus\u2019 name for the Holy Spirit in John 14:16, 26. The NIDNTT (vol. 1, 569) observes that the word encompasses comfort, exhortation, and appeal, depending on context. This gift is relational at its core and is often expressed through personal conversations, pastoral care, and small group leadership.",
  },
  {
    term: "Service / Helps",
    greek: "diakonia (\u03b4\u03b9\u03b1\u03ba\u03bf\u03bd\u03af\u03b1) / antil\u0113mpsis (\u1f00\u03bd\u03c4\u03af\u03bb\u03b7\u03bc\u03c8\u03b9\u03c2)",
    refs: "Rom. 12:7; 1 Cor. 12:28; 1 Pet. 4:11; Acts 6:1\u20136",
    definition:
      "The gift of seeing practical needs and meeting them with joy and reliability. Diakonia is Paul\u2019s broadest term for ministry \u2014 it covers everything from table-serving (its literal origin) to the full scope of ministry (2 Cor. 4:1; Eph. 4:12). The more specific antil\u0113mpsis in 1 Corinthians 12:28, translated \u201chelps\u201d or \u201chelpful deeds,\u201d denotes hands-on assistance. The TDNT (vol. 2, 81\u201382) notes that diakonia in the early church was never considered menial: it was patterned after Christ\u2019s own self-description as one who \u201ccame not to be served but to serve\u201d (Mark 10:45). Those with this gift are often the reason ministry actually functions.",
  },
  {
    term: "Administration / Leadership",
    greek: "kubern\u0113sis (\u03ba\u03c5\u03b2\u03ad\u03c1\u03bd\u03b7\u03c3\u03b9\u03c2) / proistamenos (\u03c0\u03c1\u03bf\u03ca\u03c3\u03c4\u03ac\u03bc\u03b5\u03bd\u03bf\u03c2)",
    refs: "1 Cor. 12:28; Rom. 12:8; 1 Thess. 5:12; 1 Tim. 5:17",
    definition:
      "Two related gifts. Kubern\u0113sis (1 Cor. 12:28) refers to the steering of a ship \u2014 the person at the helm who coordinates the crew and navigates the course. The NIDNTT (vol. 1, 197) connects it to strategic direction and organization. Proistamenos (Rom. 12:8) carries the sense of \u201cstanding before\u201d or \u201cpresiding over,\u201d with an emphasis on diligence and care. Both terms point to the Spirit-empowered ability to bring order, clarity, and execution to the work of the church. This is not mere bureaucracy \u2014 it is the organizational wisdom that enables the body to function as a coordinated whole.",
  },
  {
    term: "Evangelism",
    greek: "euangelist\u0113s (\u03b5\u1f50\u03b1\u03b3\u03b3\u03b5\u03bb\u03b9\u03c3\u03c4\u03ae\u03c2)",
    refs: "Eph. 4:11; Acts 21:8; 2 Tim. 4:5",
    definition:
      "The gift of communicating the gospel (euangelion, \u03b5\u1f50\u03b1\u03b3\u03b3\u03ad\u03bb\u03b9\u03bf\u03bd, \u201cgood news\u201d) to unbelievers in ways that are clear, compelling, and culturally accessible. The euangelist\u0113s appears only three times in the New Testament, but the function is pervasive. While all believers are called to bear witness to Christ (1 Pet. 3:15), those with the gift of evangelism do so with unusual effectiveness, boldness, and fruit. Philip is the only individual explicitly called an \u201cevangelist\u201d (Acts 21:8), and his ministry illustrates the gift: crossing cultural boundaries (the Ethiopian eunuch, the Samaritans), making the gospel intelligible, and seeing conversion fruit.",
  },
  {
    term: "Discernment / Distinguishing of Spirits",
    greek: "diakriseis pneumat\u014dn (\u03b4\u03b9\u03b1\u03ba\u03c1\u03af\u03c3\u03b5\u03b9\u03c2 \u03c0\u03bd\u03b5\u03c5\u03bc\u03ac\u03c4\u03c9\u03bd)",
    refs: "1 Cor. 12:10; 1 John 4:1\u20136; 1 Thess. 5:19\u201322; Acts 17:11",
    definition:
      "The gift of distinguishing truth from error, right from wrong, and genuine from counterfeit in spiritual matters. The phrase diakriseis pneumat\u014dn literally means \u201cdistinguishings of spirits\u201d \u2014 the ability to evaluate whether a teaching, practice, or claimed spiritual experience is from God, from human origin, or from a deceiving spirit. In a cessationist framework, this gift is exercised primarily through careful evaluation of teaching, decisions, and character against the standard of Scripture. As Schreiner (Spiritual Gifts, 130) notes, discernment in the post-apostolic church functions as \u201cthe testing of all things by the completed Word,\u201d in line with the Berean model of Acts 17:11.",
  },
  {
    term: "Faith (as a gift)",
    greek: "pistis (\u03c0\u03af\u03c3\u03c4\u03b9\u03c2)",
    refs: "1 Cor. 12:9; Rom. 12:3; Heb. 11",
    definition:
      "While all believers exercise saving faith (Eph. 2:8\u20139), the gift of faith refers to an unusual capacity to trust God in circumstances where others hesitate \u2014 to believe His promises, act on His leading, and wait with confidence for His provision. The TDNT (vol. 6, 213) distinguishes between faith as initial trust in Christ (common to all believers) and faith as a special charismatic endowment (given to some for specific kingdom purposes). Those with this gift often anchor communities in dependence on God rather than human effort. Hebrews 11 provides the paradigmatic examples: Abraham, Moses, and others who acted \u201cas seeing Him who is invisible\u201d (11:27).",
  },
  {
    term: "Giving / Generosity",
    greek: "metadidous (\u03bc\u03b5\u03c4\u03b1\u03b4\u03b9\u03b4\u03bf\u03cd\u03c2)",
    refs: "Rom. 12:8; 2 Cor. 8\u20139; Acts 4:32\u201337",
    definition:
      "The gift of sacrificial, joyful, and strategic generosity with material resources. Paul specifies that this gift should be exercised en haplot\u0113ti (\u1f10\u03bd \u1f01\u03c0\u03bb\u03cc\u03c4\u03b7\u03c4\u03b9, \u201cwith simplicity/generosity\u201d; Rom. 12:8), indicating a straightforward, ungrudging open-handedness. Those with this gift view their possessions as entrusted rather than owned, and they look for high-impact opportunities to deploy resources for the advance of God\u2019s kingdom. The Macedonian churches (2 Cor. 8:1\u20135) exemplify this gift: giving \u201cbeyond their ability\u201d out of \u201ca wealth of generosity.\u201d This gift often includes hospitality (philoxenia, \u03c6\u03b9\u03bb\u03bf\u03be\u03b5\u03bd\u03af\u03b1; Rom. 12:13; 1 Pet. 4:9) \u2014 the generous sharing of one\u2019s home and table.",
  },
  {
    term: "Mercy",
    greek: "ele\u014dn (\u1f10\u03bb\u03b5\u1ff6\u03bd)",
    refs: "Rom. 12:8; Matt. 25:35\u201340; James 2:13",
    definition:
      "The gift of compassionate response to suffering \u2014 feeling with those who hurt and acting to alleviate their pain. Paul says this gift should be exercised en hilaret\u0113ti (\u1f10\u03bd \u1f31\u03bb\u03b1\u03c1\u03cc\u03c4\u03b7\u03c4\u03b9, \u201cwith cheerfulness\u201d; Rom. 12:8), suggesting joyful, willing engagement rather than grudging obligation. Mercy extends to physical, emotional, and spiritual suffering. In this assessment, the mercy instinct is reflected across several categories (Shepherding & Care, Stewardship & Generosity) rather than as a standalone category, recognizing that merciful action often accompanies other gifts.",
  },
];

const SIGN_GIFTS: GlossaryEntry[] = [
  {
    term: "Apostleship",
    greek: "apostolos (\u1f00\u03c0\u03cc\u03c3\u03c4\u03bf\u03bb\u03bf\u03c2)",
    refs: "1 Cor. 12:28\u201329; Eph. 4:11; Eph. 2:20; Acts 1:21\u201326; 2 Cor. 12:12",
    definition:
      "In its technical sense, an apostle was a commissioned eyewitness of the risen Christ with unique authority to lay the foundation of the church (Eph. 2:20). The qualifications in Acts 1:21\u201322 \u2014 having accompanied Jesus during His earthly ministry and having witnessed His resurrection \u2014 are by nature unrepeatable. Paul claims apostleship as \u201cone abnormally born\u201d (1 Cor. 15:8), implying he recognized himself as an exception, not a precedent. The \u201csigns of an apostle\u201d (2 Cor. 12:12) \u2014 signs, wonders, and mighty works \u2014 served to authenticate their unique foundational role. As Schreiner argues (Spiritual Gifts, 158\u2013162), once the apostolic foundation was laid and the New Testament completed, the office fulfilled its purpose. The church is built on the apostolic foundation (Eph. 2:20); it does not perpetually re-lay it.",
  },
  {
    term: "Prophecy (apostolic era)",
    greek: "proph\u0113teia (\u03c0\u03c1\u03bf\u03c6\u03b7\u03c4\u03b5\u03af\u03b1), proph\u0113t\u0113s (\u03c0\u03c1\u03bf\u03c6\u03ae\u03c4\u03b7\u03c2)",
    refs: "1 Cor. 12:10, 28; 14:1\u20135, 29\u201333; Eph. 2:20; 3:5; Rom. 12:6",
    definition:
      "Prophecy in the New Testament is a debated category. The cessationist position (Schreiner, Gaffin) holds that prophets, like apostles, served a foundational role (Eph. 2:20) and that their revelatory function ceased with the completion of the canon. Grudem (The Gift of Prophecy in the New Testament and Today) distinguishes between authoritative apostolic prophecy (which has ceased) and a continuing, non-authoritative form of Spirit-prompted speech subject to evaluation by the congregation (1 Cor. 14:29). Both positions agree that any prophetic utterance must be tested against Scripture (1 Thess. 5:20\u201321) and that no post-canonical speech carries the authority of Scripture. In this assessment, the capacities associated with prophecy \u2014 truth-telling, discernment, moral courage, sensitivity to the Spirit \u2014 are reflected in the Prophetic & Discernment category without requiring a position on the continuation question.",
  },
  {
    term: "Tongues",
    greek: "gl\u014dssa (\u03b3\u03bb\u1ff6\u03c3\u03c3\u03b1), gen\u0113 gl\u014dss\u014dn (\u03b3\u03ad\u03bd\u03b7 \u03b3\u03bb\u03c9\u03c3\u03c3\u1ff6\u03bd, \u201ckinds of tongues\u201d)",
    refs: "Acts 2:1\u201311; 1 Cor. 12:10, 28, 30; 14:1\u201328",
    definition:
      "Speaking in tongues appears in two primary contexts. At Pentecost (Acts 2), the disciples spoke in recognizable foreign languages (dial\u0113ktos, \u03b4\u03b9\u03ac\u03bb\u03b5\u03ba\u03c4\u03bf\u03c2) as a sign of the Spirit\u2019s outpouring on all nations \u2014 a reversal of the Babel judgment (Gen. 11). In 1 Corinthians 12\u201314, Paul addresses tongues in a congregational setting, requiring interpretation (14:27\u201328) and subordinating tongues to prophecy for edification purposes. Whether the Corinthian tongues were human languages (as at Pentecost) or ecstatic utterance is debated. Cessationists (Gaffin, Perspectives on Pentecost, 55\u201360) argue that tongues served as a sign gift authenticating the new covenant\u2019s inauguration (citing Isa. 28:11\u201312 via 1 Cor. 14:21) and ceased when their sign function was fulfilled. Open-but-cautious scholars (Grudem, Carson) allow for continuation but insist on Paul\u2019s regulatory framework: orderly, interpreted, and subject to the body\u2019s evaluation.",
  },
  {
    term: "Interpretation of Tongues",
    greek: "herm\u0113neia gl\u014dss\u014dn (\u1f11\u03c1\u03bc\u03b7\u03bd\u03b5\u03af\u03b1 \u03b3\u03bb\u03c9\u03c3\u03c3\u1ff6\u03bd)",
    refs: "1 Cor. 12:10, 30; 14:5, 13, 27\u201328",
    definition:
      "The companion gift to tongues: the ability to render tongues-speech intelligible to the congregation. Paul is emphatic that without interpretation, tongues-speaking must not occur in the assembly (1 Cor. 14:28), because uninterpreted speech cannot edify. The Greek herm\u0113neia can mean either \u201ctranslation\u201d (if tongues are human languages) or \u201cinterpretation\u201d (if they are not). In cessationist theology, this gift ceased alongside tongues. In open-but-cautious frameworks, it remains the necessary safeguard ensuring that any tongues-speech serves the body\u2019s edification.",
  },
  {
    term: "Healings",
    greek: "charismata iamat\u014dn (\u03c7\u03b1\u03c1\u03af\u03c3\u03bc\u03b1\u03c4\u03b1 \u1f30\u03b1\u03bc\u03ac\u03c4\u03c9\u03bd, \u201cgifts of healings\u201d)",
    refs: "1 Cor. 12:9, 28, 30; Acts 3:1\u201310; 5:15\u201316; James 5:14\u201316",
    definition:
      "Notable for its double plural (\u201cgifts of healings\u201d), suggesting that each healing event was itself a discrete gift rather than a permanent ability possessed by the healer. The NIDNTT (vol. 2, 167) notes this unusual construction and its implication: \u201cNo individual possesses a standing \u2018gift of healing\u2019 that can be deployed at will.\u201d In Acts, healings authenticated the apostolic message and demonstrated the in-breaking of the kingdom. Cessationists hold that while God certainly can and does heal today (in answer to prayer, through medicine, by sovereign intervention), the apostolic sign-gift of healing \u2014 the ability to heal consistently, publicly, and on demand \u2014 was tied to the foundational era. James 5:14\u201316 (elders praying for the sick) represents the continuing practice of believing prayer, not the sign-gift of healing.",
  },
  {
    term: "Miracles / Works of Power",
    greek: "energem\u0101ta dyname\u014dn (\u1f10\u03bd\u03b5\u03c1\u03b3\u03ae\u03bc\u03b1\u03c4\u03b1 \u03b4\u03c5\u03bd\u03ac\u03bc\u03b5\u03c9\u03bd)",
    refs: "1 Cor. 12:10, 28\u201329; 2 Cor. 12:12; Heb. 2:3\u20134; Acts 2:22",
    definition:
      "Literally \u201cworkings of powers\u201d \u2014 acts that display God\u2019s power in ways that transcend ordinary providence. Like healings, this is a double plural suggesting individual mighty acts rather than a permanent endowment. Hebrews 2:3\u20134 is a key cessationist text: the author speaks of signs and wonders as things that \u201cwere attested\u201d (past tense) by \u201cthose who heard\u201d (the apostles), and God bore witness \u201cwith them\u201d through miraculous gifts \u2014 language suggesting these signs accompanied the apostolic testimony specifically. Warfield (Counterfeit Miracles, 25\u201326) argued that miracles in the New Testament clustered around the epochs of new revelation (Moses, Elijah/Elisha, Christ and the apostles), serving as divine authentication, not as a permanent feature of church life.",
  },
];

const THEOLOGICAL_FRAMEWORK: GlossaryEntry[] = [
  {
    term: "Cessationism",
    refs: "Heb. 2:3\u20134; Eph. 2:20; 2 Cor. 12:12; 1 Cor. 13:8\u201312",
    definition:
      "The theological position that certain miraculous or \u201csign\u201d gifts (tongues, prophecy in its revelatory sense, miraculous healing, and miracles) ceased with the closing of the apostolic era and the completion of the New Testament canon. Cessationists affirm that the Holy Spirit remains fully active in the life of the church \u2014 sanctifying believers, illuminating Scripture, and providentially distributing gifts for service \u2014 but hold that the revelatory and attesting sign gifts served a unique, foundational purpose that has been fulfilled. Gaffin (Perspectives on Pentecost, 89\u201396) grounds cessationism in the redemptive-historical argument: just as the foundational events of redemption (incarnation, crucifixion, resurrection, ascension) are unrepeatable, so the gifts that authenticated those events and the apostolic witness to them are tied to that era. This is the primary theological framework behind this assessment.",
  },
  {
    term: "Open but Cautious Continuationism",
    refs: "1 Cor. 13:8\u201312; 1 Thess. 5:19\u201322; 1 John 4:1\u20136",
    definition:
      "A mediating position that acknowledges the possibility that all New Testament gifts could continue today, while exercising significant caution about modern claims to miraculous gifts. Open-but-cautious believers typically affirm the sufficiency and closed nature of the canon, resist building theology on experience alone, and insist that any purported gift be tested rigorously against biblical criteria. Wayne Grudem (Systematic Theology, ch. 52\u201353) and John Piper represent this position. Grudem argues that 1 Corinthians 13:10 (\u201cwhen the perfect comes\u201d) refers to Christ\u2019s return, not the completion of the canon, and that gifts like prophecy may continue in a non-authoritative, fallible form \u2014 Spirit-prompted impressions subject to congregational testing (1 Cor. 14:29). This assessment considers this approach within its acceptable theological range.",
  },
  {
    term: "Full Continuationism / Pentecostalism",
    refs: "Acts 2:1\u20134, 38\u201339; Joel 2:28\u201332",
    definition:
      "The position that all New Testament gifts continue without cessation and that the miraculous gifts (especially tongues) are normative markers of Spirit-filled life. Classical Pentecostalism teaches that tongues are the initial evidence of the baptism of the Holy Spirit. While we respect our Pentecostal brothers and sisters in Christ, this assessment does not operate within this theological framework. The key distinction: Charismata affirms that the Spirit distributes gifts as He wills (1 Cor. 12:11) and that no single gift is the marker of the Spirit\u2019s presence or a believer\u2019s maturity.",
  },
  {
    term: "Anti-Miraculous Rationalism",
    definition:
      "A position that denies or minimizes any supernatural activity of God in the present age \u2014 not merely that sign gifts have ceased, but that God does not intervene supernaturally at all. This position is outside our theological range. While cessationism holds that certain gifts have ceased, it emphatically does not deny God\u2019s ongoing supernatural work: providential governance, answered prayer, regeneration, sanctification, illumination of Scripture, and sovereign intervention are all affirmed as real, supernatural acts of God through His Spirit. As Ferguson (The Holy Spirit, 225) insists, \u201cCessationism is a statement about the mode of the Spirit\u2019s gifting, not a denial of His power.\u201d",
  },
];

const SIGN_GIFTS_ERA: GlossaryEntry[] = [
  {
    term: "The Inauguration of the New Covenant",
    refs: "Heb. 1:1\u20132; 8:6\u201313; Luke 22:20; 2 Cor. 3:4\u201318; Jer. 31:31\u201334",
    definition:
      "The new covenant, prophesied by Jeremiah and inaugurated by Christ\u2019s death and resurrection, represents the climactic fulfillment of God\u2019s redemptive purposes. The period from Christ\u2019s ministry through the apostolic era is the transition from the old covenant to the new \u2014 an \u201cinter-covenantal\u201d or \u201cinaugural\u201d period in which the foundations of the new covenant community were being laid. The book of Hebrews frames this transition explicitly: God, who \u201cat many times and in many ways spoke to our fathers through the prophets, has in these last days spoken to us by His Son\u201d (Heb. 1:1\u20132). The Son\u2019s revelation is final and supreme; the apostolic witness to that revelation is foundational (Eph. 2:20). Sign gifts functioned within this specific redemptive-historical moment.",
  },
  {
    term: "Sign Gifts as Covenant Markers",
    refs: "Exod. 4:1\u20139; 1 Kings 17\u201318; 2 Kings 2\u20136; Acts 2:22; 2 Cor. 12:12; Heb. 2:3\u20134",
    definition:
      "Throughout biblical history, miraculous signs cluster around three major epochs of new revelation and covenant transition: (1) Moses and the Exodus \u2014 the inauguration of the Sinai covenant; (2) Elijah and Elisha \u2014 the crisis of the Sinai covenant during Baal worship; (3) Christ and the Apostles \u2014 the inauguration of the new covenant. Warfield (Counterfeit Miracles, 25\u201326) was the first to identify this pattern systematically, and Gaffin (Perspectives on Pentecost, 89\u201396) developed it into a full redemptive-historical argument. The pattern suggests that sign gifts are not a permanent feature of church life but are concentrated attestation events tied to pivotal moments in salvation history. Between these epochs, God\u2019s people lived by faith in His Word without miraculous confirmation \u2014 and this was not a deficiency but the norm.",
  },
  {
    term: "Pentecost as New Covenant Inauguration",
    refs: "Acts 2:1\u201341; Joel 2:28\u201332; Lev. 23:15\u201321; Exod. 19:1\u201316",
    definition:
      "The outpouring of the Spirit at Pentecost was not merely an isolated event but the eschatological fulfillment of Joel\u2019s prophecy (Acts 2:16\u201321) and a deliberate parallel to the giving of the Law at Sinai (Jewish tradition held that Sinai occurred on the day that became Pentecost). Just as the Sinai theophany \u2014 with fire, sound, and trembling \u2014 inaugurated the old covenant, so the Pentecost theophany \u2014 with tongues of fire, the sound of wind, and speaking in languages \u2014 inaugurated the new covenant community. The tongues at Pentecost were recognizable human languages (Acts 2:6\u201311), signaling that the gospel was for all nations \u2014 a reversal of the Babel judgment (Gen. 11:1\u20139). As Gaffin argues, Pentecost is to the new covenant what Sinai is to the old: a unique, foundational, unrepeatable event.",
  },
  {
    term: "The Apostolic Foundation",
    refs: "Eph. 2:19\u201322; Rev. 21:14; Matt. 16:18; 1 Cor. 3:10\u201311",
    definition:
      "Paul describes the church as \u201cbuilt on the foundation of the apostles and prophets, Christ Jesus himself being the cornerstone\u201d (Eph. 2:20). A foundation is laid once; a building does not perpetually re-lay its foundation. The apostles and prophets of the inaugural era fulfilled a unique, once-for-all role: receiving and transmitting the authoritative revelation that became the New Testament. Their sign gifts authenticated this role (2 Cor. 12:12). As Bavinck (Reformed Dogmatics, vol. 4, 96\u201398) argues, \u201cWhen the extraordinary offices ceased, the extraordinary gifts ceased with them \u2014 not because God\u2019s power diminished, but because the foundational purpose was accomplished.\u201d The continuing life of the church is built on this completed foundation through ordinary gifts: teaching, pastoring, serving, administrating, giving, and discerning.",
  },
  {
    term: "\u201cWhen the Perfect Comes\u201d",
    greek: "hotan elth\u0113 to teleion (\u1f45\u03c4\u03b1\u03bd \u1f14\u03bb\u03b8\u1fc3 \u03c4\u1f78 \u03c4\u03ad\u03bb\u03b5\u03b9\u03bf\u03bd)",
    refs: "1 Cor. 13:8\u201312",
    definition:
      "One of the most debated phrases in the gifts discussion. Paul writes that prophecy, tongues, and knowledge will \u201cpass away\u201d or \u201ccease\u201d when \u201cthe perfect\u201d (to teleion) comes. Three major interpretations: (1) \u201cThe perfect\u201d = the completed New Testament canon (some cessationists); (2) \u201cThe perfect\u201d = the maturity of the church (some patristic writers); (3) \u201cThe perfect\u201d = the return of Christ and the consummation (Grudem, Carson, and many cessationists including Schreiner). Even cessationists who hold view (3) argue that gifts can cease before Christ\u2019s return for other theological reasons \u2014 the foundational argument of Ephesians 2:20 does not depend on the interpretation of 1 Corinthians 13:10. Carson (Showing the Spirit, 70\u201372) is particularly clear: \u201cThe cessationist position does not stand or fall with the interpretation of to teleion.\u201d",
  },
];

const ASSESSMENT_TERMS: GlossaryEntry[] = [
  {
    term: "Likert Scale",
    definition:
      "A psychometric response format commonly used in surveys and assessments, in which respondents indicate their level of agreement with a statement on a symmetric agree-disagree scale. This assessment uses a 5-point Likert scale (Strongly Disagree to Strongly Agree). While widely used and practically useful, Likert-based self-assessments are descriptive tools, not clinical instruments \u2014 results should be interpreted as directional indicators, not definitive measurements.",
  },
  {
    term: "Veiled Behavioral Questions",
    definition:
      "Assessment questions that describe observable behaviors, tendencies, or preferences without naming the underlying category being measured. For example, rather than asking \u201cDo you have the gift of teaching?\u201d, a veiled question might say \u201cWhen I learn something new about Scripture, my first instinct is to share it.\u201d This approach reduces the risk of respondents gaming the assessment by answering toward a desired outcome rather than honestly.",
  },
  {
    term: "Primary Strengths",
    definition:
      "In this assessment, your top two scoring gift categories. These represent areas where your self-reported behaviors and inclinations most strongly align with the characteristics of a particular gift. Primary strengths are not guarantees or assignments \u2014 they are starting points for further exploration, community affirmation, and intentional service.",
  },
  {
    term: "Secondary Strengths",
    definition:
      "Your third and fourth highest scoring categories. These often represent gifts that complement your primary strengths or emerge in specific contexts. Many people find that their secondary strengths become primary in certain seasons or ministry roles.",
  },
  {
    term: "Lower-Energy Areas",
    definition:
      "Your two lowest scoring categories. These are not weaknesses or deficiencies \u2014 they simply indicate areas where your natural tendencies and behaviors don\u2019t strongly align with the described gift. Every believer contributes differently to the body, and lower-energy areas are often covered by the strengths of others around you.",
  },
];

const ALL_SECTIONS = [
  { title: "Foundational Concepts", entries: FOUNDATIONAL },
  { title: "The Gift Lists & Church Structure", entries: GIFT_LISTS },
  { title: "Continuing Gifts", subtitle: "Gifts affirmed across cessationist and continuationist positions", entries: CONTINUING_GIFTS },
  { title: "Theological Positions", entries: THEOLOGICAL_FRAMEWORK },
  { title: "Assessment Methodology", entries: ASSESSMENT_TERMS },
];

const SIGN_SECTIONS = [
  { title: "Sign & Revelatory Gifts", subtitle: "Gifts whose continuation is debated within our theological range", entries: SIGN_GIFTS },
  { title: "The Sign Gifts in Redemptive History", subtitle: "Their function during the inauguration of the new covenant", entries: SIGN_GIFTS_ERA },
];

const BIBLIOGRAPHY: BibliographyEntry[] = [
  {
    author: "Schreiner, Thomas R.",
    title: "Spiritual Gifts: What They Are and Why They Matter",
    publisher: "B&H Academic",
    year: 2018,
    note: "The primary theological framework for this assessment. Schreiner presents a careful, exegetically grounded case for cessationism while affirming the Spirit\u2019s active work in gifting believers for service. His treatment of each gift category is balanced, pastoral, and rooted in the biblical text rather than in polemics. Particularly valuable for its integration of systematic and biblical theology.",
  },
  {
    author: "Gaffin, Richard B., Jr.",
    title: "Perspectives on Pentecost: New Testament Teaching on the Gifts of the Holy Spirit",
    publisher: "P&R Publishing",
    year: 1979,
    note: "The most influential redemptive-historical argument for cessationism. Gaffin situates the sign gifts within the broader pattern of salvation history, arguing that they belong to the foundational, unrepeatable epoch of new covenant inauguration. His treatment of Pentecost as the new covenant counterpart to Sinai is essential reading. Dense but rewarding.",
  },
  {
    author: "Grudem, Wayne",
    title: "Systematic Theology: An Introduction to Biblical Doctrine",
    publisher: "Zondervan",
    year: 1994,
    note: "Grudem\u2019s systematic theology includes an extensive treatment of spiritual gifts from an open-but-cautious continuationist perspective. His careful exegesis and willingness to engage opposing views make this a valuable resource for anyone working through the theological questions surrounding gifts. Chapters 52\u201353 are particularly relevant. His distinction between authoritative apostolic prophecy and a continuing, non-authoritative form of Spirit-prompted speech has been widely influential.",
  },
  {
    author: "Grudem, Wayne",
    title: "The Gift of Prophecy in the New Testament and Today",
    publisher: "Crossway",
    year: 2000,
    note: "The most thorough scholarly defense of the open-but-cautious view of prophecy. Grudem argues that New Testament prophecy functioned at two levels: authoritative apostolic prophecy (which has ceased) and a continuing, fallible form of Spirit-prompted speech subject to congregational evaluation. Whether or not one agrees with his conclusions, the exegetical work is serious and must be engaged.",
  },
  {
    author: "Grudem, Wayne (ed.)",
    title: "Are Miraculous Gifts for Today? Four Views",
    publisher: "Zondervan",
    year: 1996,
    note: "A multi-view volume presenting cessationist (Gaffin), open-but-cautious (Oss), Third Wave (Storms), and Pentecostal/charismatic (Saucy) perspectives. The format allows each position to respond to the others, making it an excellent resource for understanding the range of evangelical positions and the biblical arguments underlying each. Essential for anyone who wants to think honestly about the debate.",
  },
  {
    author: "Carson, D. A.",
    title: "Showing the Spirit: A Theological Exposition of 1 Corinthians 12\u201314",
    publisher: "Baker Academic",
    year: 1987,
    note: "A rigorous exegetical study of the key Pauline passage on spiritual gifts. Carson resists easy categorization, engaging the text with careful attention to context, grammar, and theological implications. His treatment of \u201cwhen the perfect comes\u201d and his insistence that edification is Paul\u2019s governing concern are especially valuable. Essential reading for anyone who wants to understand what Paul actually says (and doesn\u2019t say) about gifts.",
  },
  {
    author: "Fee, Gordon D.",
    title: "God\u2019s Empowering Presence: The Holy Spirit in the Letters of Paul",
    publisher: "Hendrickson",
    year: 1994,
    note: "A massive, magisterial study of every Pauline reference to the Holy Spirit. Fee writes as a Pentecostal scholar with deep exegetical rigor. Even cessationist readers will benefit enormously from his close attention to the text. His treatment of the charismata passages in 1 Corinthians and Romans is among the most detailed in print.",
  },
  {
    author: "Warfield, Benjamin B.",
    title: "Counterfeit Miracles",
    publisher: "Banner of Truth Trust",
    year: 1918,
    note: "The classic statement of the cessationist position from the Princeton tradition. Warfield argues that miraculous gifts were the credentials of the apostles and ceased with the apostolic age. While some of his historical arguments have been debated, his identification of the pattern of miracles clustering around epochs of new revelation remains foundational to cessationist thought.",
  },
  {
    author: "Piper, John",
    title: "The Place of Gifts in the Life of the Church",
    publisher: "Desiring God (online resource)",
    year: 2004,
    note: "Piper represents an open-but-cautious continuationist perspective, emphasizing that spiritual gifts exist for the joy of the giver and the good of the body. His pastoral application of gifts theology \u2014 particularly his insistence that love is the \u201cmore excellent way\u201d \u2014 provides a helpful corrective to both cessationist rigidity and charismatic excess.",
  },
  {
    author: "Bavinck, Herman",
    title: "Reformed Dogmatics, Vol. 4: Holy Spirit, Church, and New Creation",
    publisher: "Baker Academic",
    year: 2008,
    note: "Bavinck provides the historical Reformed perspective on the Spirit\u2019s work in the church, including the cessation of extraordinary gifts and the continuation of ordinary gifts. His distinction between \u201cextraordinary\u201d and \u201cordinary\u201d offices and gifts, rooted in the foundational vs. continuing structure of the church, remains one of the clearest theological articulations of the cessationist position within the broader Reformed tradition.",
  },
  {
    author: "Ferguson, Sinclair B.",
    title: "The Holy Spirit (Contours of Christian Theology)",
    publisher: "IVP Academic",
    year: 1996,
    note: "A comprehensive treatment of the doctrine of the Holy Spirit from a Reformed perspective. Ferguson\u2019s discussion of the Spirit\u2019s role in gifting, sanctification, and the life of the church is both theologically rigorous and devotionally rich. Particularly helpful for understanding how gifts relate to the broader work of the Spirit and why cessationism is not anti-supernatural.",
  },
  {
    author: "Thiselton, Anthony C.",
    title: "The First Epistle to the Corinthians (NIGTC)",
    publisher: "Eerdmans",
    year: 2000,
    note: "The most comprehensive modern commentary on 1 Corinthians. Thiselton\u2019s treatment of chapters 12\u201314 is unparalleled in its depth, engaging the Greek text, the full range of scholarship, and the hermeneutical issues with care and sophistication. Not a quick read, but indispensable for serious study of the gifts passages.",
  },
  {
    author: "Stott, John R. W.",
    title: "The Message of Ephesians (The Bible Speaks Today)",
    publisher: "IVP Academic",
    year: 1979,
    note: "Stott\u2019s exposition of Ephesians 4:1\u201316 \u2014 the passage on Christ giving gifts to the church for the equipping of the saints \u2014 is a masterclass in connecting doctrinal precision with pastoral warmth. His treatment of the relationship between gifting, maturity, and unity in the body is foundational.",
  },
  {
    author: "Ridderbos, Herman",
    title: "Paul: An Outline of His Theology",
    publisher: "Eerdmans",
    year: 1975,
    note: "A landmark work in Pauline theology. Ridderbos\u2019s treatment of the body of Christ, the Spirit\u2019s work, and the structure of the new covenant community provides essential background for understanding how gifts fit into Paul\u2019s broader theological framework. His redemptive-historical method deeply influenced Gaffin and the Reformed cessationist tradition.",
  },
  {
    author: "Clowney, Edmund P.",
    title: "The Church (Contours of Christian Theology)",
    publisher: "IVP Academic",
    year: 1995,
    note: "Clowney\u2019s ecclesiology situates spiritual gifts within the broader biblical theology of the people of God. His discussion of offices, gifts, and the organic life of the church is especially valuable for understanding how gifts relate to church structure and leadership. The distinction between foundational and continuing gifts is clearly drawn.",
  },
  {
    author: "Keller, Timothy",
    title: "Center Church: Doing Balanced, Gospel-Centered Ministry in Your City",
    publisher: "Zondervan",
    year: 2012,
    note: "While not exclusively about spiritual gifts, Keller\u2019s framework for gospel-centered ministry provides important context for how gifts function within the mission of the church. His emphasis on integrating theology, ecclesiology, and cultural engagement informs the practical application sections of this assessment.",
  },
  {
    author: "Volf, Miroslav",
    title: "After Our Likeness: The Church as the Image of the Trinity",
    publisher: "Eerdmans",
    year: 1998,
    note: "Volf\u2019s ecclesiology provides a profound theological framework for understanding why every member\u2019s contribution matters. His Trinitarian vision of the church \u2014 in which diversity of gifts reflects the diversity of persons in the Godhead \u2014 deepens our understanding of the body metaphor and the theological significance of gift-diversity.",
  },
  {
    author: "Bridges, Jerry",
    title: "True Community: The Biblical Practice of Koinonia",
    publisher: "NavPress",
    year: 2012,
    note: "Practical wisdom on the relational context in which gifts are exercised. His emphasis on mutual dependence, humility, and love within the body of Christ underscores the communal purpose of every spiritual gift.",
  },
];

const REFERENCE_WORKS: BibliographyEntry[] = [
  {
    author: "Brown, Colin (ed.)",
    title: "New International Dictionary of New Testament Theology (NIDNTT)",
    publisher: "Zondervan",
    year: 1986,
    note: "Standard evangelical theological dictionary. Articles on charisma, pneuma, diakonia, proph\u0113t\u0113s, gl\u014dssa, and related terms provide essential lexical background for understanding New Testament gift language.",
  },
  {
    author: "Kittel, Gerhard & Friedrich, Gerhard (eds.)",
    title: "Theological Dictionary of the New Testament (TDNT)",
    publisher: "Eerdmans",
    year: 1985,
    note: "The foundational theological word study reference. While its methodology has been critiqued (notably by James Barr), the individual articles on gift-related vocabulary remain invaluable for tracing the semantic range and theological development of key terms.",
  },
  {
    author: "Silva, Mois\u00e9s (ed.)",
    title: "New International Dictionary of New Testament Theology and Exegesis (NIDNTTE), 2nd ed.",
    publisher: "Zondervan Academic",
    year: 2014,
    note: "The updated successor to the NIDNTT, incorporating three decades of additional scholarship. The revised articles on pneumatika, charismata, and related terms reflect the ongoing scholarly conversation about gifts, cessation, and continuation.",
  },
  {
    author: "Elwell, Walter A. (ed.)",
    title: "Evangelical Dictionary of Theology",
    publisher: "Baker Academic",
    year: 2001,
    note: "Accessible one-volume reference with articles on spiritual gifts, cessationism, Pentecostalism, and related theological topics. Useful for quick orientation to the major positions and their proponents.",
  },
];

export default function ResourcesPage() {
  const [tab, setTab] = useState<Tab>("glossary");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const toggleTerm = (key: string) => {
    setExpandedTerms((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const renderEntry = (entry: GlossaryEntry, sectionIdx: number, entryIdx: number) => {
    const key = `${sectionIdx}-${entryIdx}`;
    const isExpanded = expandedTerms.has(key);

    return (
      <div key={key} className="border-b border-stone-100 last:border-b-0">
        <button
          onClick={() => toggleTerm(key)}
          className="w-full py-4 flex items-start justify-between text-left group"
        >
          <div className="pr-4">
            <span className="text-sm font-semibold text-stone-800 group-hover:text-stone-900">
              {entry.term}
            </span>
            {entry.greek && (
              <span className="block text-xs text-stone-400 mt-0.5 italic">
                {entry.greek}
              </span>
            )}
          </div>
          <svg
            className={`w-4 h-4 text-stone-400 flex-shrink-0 mt-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isExpanded && (
          <div className="pb-5 pr-8 space-y-2">
            {entry.refs && (
              <p className="text-xs font-medium text-stone-500">
                {entry.refs}
              </p>
            )}
            <p className="text-sm text-stone-600 leading-relaxed">
              {entry.definition}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-8">
        <Link
          href="/"
          className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
        >
          &larr; Back to Assessment
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mt-4">
          Resources
        </h1>
        <p className="text-stone-500 mt-2 text-base">
          Theological foundations, biblical terminology, and recommended reading
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mb-8">
        <button
          onClick={() => setTab("glossary")}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            tab === "glossary"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Glossary
        </button>
        <button
          onClick={() => setTab("sign-gifts")}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            tab === "sign-gifts"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Sign Gifts
        </button>
        <button
          onClick={() => setTab("bibliography")}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            tab === "bibliography"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Bibliography
        </button>
      </div>

      {/* Glossary Tab */}
      {tab === "glossary" && (
        <div className="space-y-10">
          <div className="bg-stone-100/60 rounded-2xl border border-stone-200 p-5">
            <p className="text-sm text-stone-600 leading-relaxed">
              A comprehensive glossary of biblical and theological terms related to
              spiritual gifts. Greek terms are transliterated and referenced to their
              primary New Testament occurrences. Definitions draw from standard
              evangelical theological dictionaries (NIDNTT, TDNT, NIDNTTE), systematic
              theologies, and the works listed in the bibliography.
            </p>
          </div>

          {ALL_SECTIONS.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-xs text-stone-400 mb-3">{section.subtitle}</p>
              )}
              {!section.subtitle && <div className="mb-3" />}
              <div className="bg-white rounded-2xl border border-stone-200 px-5">
                {section.entries.map((entry, eIdx) =>
                  renderEntry(entry, sIdx, eIdx)
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sign Gifts Tab */}
      {tab === "sign-gifts" && (
        <div className="space-y-10">
          <div className="bg-stone-100/60 rounded-2xl border border-stone-200 p-5 space-y-3">
            <p className="text-sm text-stone-600 leading-relaxed">
              The miraculous or &ldquo;sign&rdquo; gifts occupy a unique place in New Testament
              theology. They functioned during the inaugural period of the new covenant &mdash;
              from Pentecost through the close of the apostolic era &mdash; as divine
              authentication of the apostolic message and the in-breaking of God&apos;s kingdom.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              This assessment operates within a cessationist framework (the sign gifts
              have fulfilled their foundational purpose) while affirming that open-but-cautious
              continuationism falls within acceptable evangelical boundaries. Both positions
              agree on what matters most: all gifts must be tested against Scripture, exercised
              in love, and directed toward the edification of the body.
            </p>
          </div>

          {SIGN_SECTIONS.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-xs text-stone-400 mb-3">{section.subtitle}</p>
              )}
              {!section.subtitle && <div className="mb-3" />}
              <div className="bg-white rounded-2xl border border-stone-200 px-5">
                {section.entries.map((entry, eIdx) =>
                  renderEntry(entry, sIdx + 100, eIdx)
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bibliography Tab */}
      {tab === "bibliography" && (
        <div className="space-y-10">
          <div className="bg-stone-100/60 rounded-2xl border border-stone-200 p-5">
            <p className="text-sm text-stone-600 leading-relaxed">
              The following works have informed the theological framework, assessment
              design, and pastoral application of Charismata. They represent a range of
              evangelical perspectives &mdash; from cessationist to open-but-cautious
              continuationist &mdash; united by a commitment to the authority of Scripture and
              the health of the local church.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Primary Sources
            </h2>
            <div className="space-y-4">
              {BIBLIOGRAPHY.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 p-5"
                >
                  <p className="text-sm text-stone-800">
                    <span className="font-semibold">{entry.author}</span>{" "}
                    <span className="italic">{entry.title}</span>.{" "}
                    <span className="text-stone-500">
                      {entry.publisher}, {entry.year}.
                    </span>
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed mt-2">
                    {entry.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Reference Works & Dictionaries
            </h2>
            <div className="space-y-4">
              {REFERENCE_WORKS.map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 p-5"
                >
                  <p className="text-sm text-stone-800">
                    <span className="font-semibold">{entry.author}</span>{" "}
                    <span className="italic">{entry.title}</span>.{" "}
                    <span className="text-stone-500">
                      {entry.publisher}, {entry.year}.
                    </span>
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed mt-2">
                    {entry.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-12 pt-6 border-t border-stone-200">
        <p className="text-xs text-stone-400 text-center leading-relaxed">
          This assessment operates within a cessationist framework as articulated by
          Thomas Schreiner and Richard Gaffin, while affirming that open-but-cautious
          continuationism (represented by Wayne Grudem and John Piper) falls within
          acceptable evangelical boundaries. We affirm the full activity of the Holy
          Spirit in the life of the church, the sufficiency of Scripture, and the vital
          importance of spiritual gifts for the health of Christ&apos;s body.
        </p>
      </div>
    </main>
  );
}
