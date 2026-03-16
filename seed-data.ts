/**
 * Seed script for Spiritual Gifts Assessment
 *
 * Usage:
 *   DATABASE_URL="..." npx ts-node --skip-project seed-data.ts
 *
 * Creates 8 categories and 192 questions (24 per category).
 * Questions are "veiled behavioral" — they describe tendencies without
 * naming the spiritual gift, so users can't easily game the assessment.
 */

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface Category {
  internal_name: string;
  public_name: string;
  description: string;
  strengths: string;
  cautions: string;
  ministry_fit: string;
  display_order: number;
  questions: string[];
}

const CATEGORIES: Category[] = [
  {
    internal_name: "word_wisdom",
    public_name: "Word & Wisdom",
    description: "You have a God-given capacity to study, understand, and communicate biblical truth in ways that help others grasp and apply it. You are drawn to careful study, clear explanation, and helping people connect Scripture to life. This gift often shows up as a love of learning paired with a compulsion to share what you've learned.",
    strengths: "You bring clarity to complex ideas. People trust you to handle Scripture carefully and to present truth in an accessible way. You elevate the intellectual and spiritual depth of any group you're part of, and you help others move from confusion to conviction.",
    cautions: "Knowledge without love can become arrogance. Be careful not to value being right over being kind, or to treat people as projects to be corrected. Make sure your teaching serves people, not just ideas. Stay connected to community so your study doesn't become isolated.",
    ministry_fit: "Teaching (adult classes, small groups, new believers), curriculum development, writing, mentoring, apologetics, leading Bible studies, theological training",
    display_order: 1,
    questions: [
      "When I read a passage of Scripture, I naturally start thinking about how to explain it to someone else.",
      "I enjoy tracing an idea through multiple books of the Bible to see the full picture.",
      "People often come to me when they have questions about what the Bible says on a topic.",
      "I get energized by preparing to teach or present material to a group.",
      "When someone shares a wrong idea, I feel a strong pull to gently offer a correction.",
      "I'm drawn to books, podcasts, or courses that deepen my understanding of theology.",
      "I find it satisfying to take a complex concept and make it simple enough for anyone to understand.",
      "I often notice when a speaker or writer takes a verse out of context.",
      "I naturally organize information into outlines or frameworks that help others learn.",
      "When I learn something new about God or Scripture, my first instinct is to share it.",
      "I spend more time studying than most people I know, and it doesn't feel like a chore.",
      "I've been told I have a way of making difficult topics understandable.",
      "I tend to think carefully about the precise meaning of words and phrases in Scripture.",
      "When someone is struggling, I tend to point them to a principle or truth that applies.",
      "I would rather prepare thoroughly than speak off the cuff.",
      "I can usually tell when a teaching is biblically solid versus when something feels off.",
      "I enjoy helping newer believers understand foundational truths of the faith.",
      "People have said that conversations with me helped them see something in a new way.",
      "I'm more interested in understanding why something is true than simply knowing that it is.",
      "I would describe my approach to faith as thoughtful and study-oriented.",
      "I often connect dots between different parts of Scripture that others haven't noticed.",
      "I feel a responsibility to handle God's Word accurately, not casually.",
      "I enjoy creating resources — notes, outlines, summaries — that help others learn.",
      "When I hear a sermon, I evaluate it not just for how it made me feel but for its accuracy.",
    ],
  },
  {
    internal_name: "shepherding_care",
    public_name: "Shepherding & Care",
    description: "You have a God-given heart for the long-term spiritual wellbeing of individuals. You are drawn to walking with people through life's highs and lows, providing counsel, encouragement, and steady presence. This gift shows up as deep relational investment and a willingness to carry burdens with others over time.",
    strengths: "You build trust naturally. People feel safe with you and know you won't disappear when things get hard. You help people process their experiences in light of the gospel, and you notice when someone is drifting before others do. Your presence provides stability in volatile seasons.",
    cautions: "You may take on too many people and burn out. Set boundaries so you can care well for a few rather than poorly for many. Be careful not to create dependency — your goal is to help people grow toward maturity, not toward needing you. Don't neglect your own soul while tending to others.",
    ministry_fit: "Small group leadership, pastoral care, counseling, mentoring, hospital and homebound visitation, support group facilitation, new member integration, crisis response teams",
    display_order: 2,
    questions: [
      "When someone I know is going through a hard time, I feel compelled to check in on them regularly.",
      "I naturally notice when someone seems withdrawn or discouraged, even in a group.",
      "I tend to remember details about people's lives — their struggles, their family situations, their fears.",
      "I'm comfortable sitting with someone in their pain without trying to fix it immediately.",
      "I would rather have a deep conversation with one person than make small talk with ten.",
      "People have told me they feel safe talking to me about personal things.",
      "I feel a sense of responsibility for the spiritual growth of people I'm close to.",
      "I tend to follow up with people days or weeks after a conversation to see how they're doing.",
      "When someone makes a poor decision, my first response is concern for them, not frustration.",
      "I enjoy walking with someone through a long process, not just offering a quick word.",
      "I naturally gravitate toward people who seem to be on the margins of a group.",
      "I find it meaningful to help someone process a difficult experience rather than just distract from it.",
      "I would describe myself as patient and present with people, even when progress is slow.",
      "I'm more interested in how someone is really doing than in surface-level updates.",
      "I find it natural to provide accountability in a way that feels supportive, not judgmental.",
      "When I think about ministry, I picture long-term relationships more than events or programs.",
      "I tend to be the person people call when they're in crisis.",
      "I take it seriously when someone confides in me, and I guard their trust carefully.",
      "I often think about the spiritual condition of people I care about, even when I'm not with them.",
      "I'm drawn to roles that involve ongoing relational investment rather than one-time interactions.",
      "I can tell the difference between someone who needs advice and someone who just needs to be heard.",
      "I feel a deep sense of purpose when I see someone I've walked with grow in their faith.",
      "I would rather go deep with a few people than spread thin across many.",
      "I instinctively protect the people I care about — emotionally, spiritually, and relationally.",
    ],
  },
  {
    internal_name: "service_administration",
    public_name: "Service & Administration",
    description: "You have a God-given ability to see what needs to be done and to organize people and resources to make it happen. You are drawn to behind-the-scenes work, practical problem-solving, and creating systems that help others succeed. This gift shows up as a bias toward action, reliability, and a keen eye for operational details.",
    strengths: "You are the person who makes things actually work. While others cast vision, you build the infrastructure to carry it out. You bring order to chaos, anticipate logistical needs, and follow through reliably. People trust that if you say you'll do it, it will get done — and done well.",
    cautions: "You may become resentful if your work goes unnoticed or if others are less detail-oriented. Don't let efficiency become an idol — sometimes the messy, relational path is the right one. Be careful not to control outcomes so tightly that you crowd out others' contributions or the Spirit's leading.",
    ministry_fit: "Event coordination, facilities management, team operations, volunteer scheduling, project management, hospitality logistics, financial administration, database and systems management",
    display_order: 3,
    questions: [
      "When I see a disorganized process, I instinctively start thinking about how to improve it.",
      "I get satisfaction from completing tasks and checking things off a list.",
      "I'd rather do practical work behind the scenes than be up front leading a meeting.",
      "People often ask me to organize things because they know I'll follow through.",
      "I notice logistical details that others overlook — seating, supplies, timing, flow.",
      "I enjoy creating systems, checklists, or workflows that help a team run smoothly.",
      "When a group has a great idea, I'm already thinking about how to execute it.",
      "I feel restless when I see a need that no one is addressing.",
      "I find it more fulfilling to serve practically than to teach or lead publicly.",
      "I tend to volunteer for the unglamorous tasks that keep things running.",
      "I'm energized by getting things done efficiently and on time.",
      "When I walk into a room before an event, I mentally assess what still needs to happen.",
      "I can manage multiple tasks or responsibilities without losing track of details.",
      "People have told me I'm one of the most reliable people they know.",
      "I take ownership of tasks I've committed to, even when they're tedious.",
      "I get frustrated when plans fall apart due to poor coordination.",
      "I'm naturally drawn to roles that involve planning, scheduling, or logistics.",
      "I prefer clear expectations and defined responsibilities over ambiguity.",
      "I often see inefficiencies that others accept as normal.",
      "I feel a sense of purpose when my behind-the-scenes work enables someone else to succeed.",
      "I would describe myself as dependable, organized, and action-oriented.",
      "When something breaks or goes wrong, I want to fix it — not just talk about it.",
      "I'm comfortable delegating tasks and coordinating other people's contributions.",
      "I find joy in serving others practically, even if no one notices.",
    ],
  },
  {
    internal_name: "evangelistic_missional",
    public_name: "Evangelistic & Missional",
    description: "You have a God-given burden for people who don't yet know Christ and a natural ability to build bridges between the gospel and their world. You are drawn to conversations with unbelievers, to crossing cultural boundaries, and to finding creative ways to make the faith accessible. This gift shows up as relational boldness and genuine curiosity about people far from God.",
    strengths: "You keep the church outward-focused. You build relationships with people others might avoid and naturally bring conversations toward matters of faith without being pushy. You remind believers that the mission extends beyond the walls of the church, and you model what it looks like to live sent.",
    cautions: "You may grow impatient with internal church life or dismiss the value of deep discipleship and theological precision. Remember that evangelism and edification go hand in hand. Be careful not to water down the message in an effort to make it palatable. Guard against measuring success by conversions alone.",
    ministry_fit: "Outreach events, neighborhood engagement, cross-cultural ministry, international missions, community partnerships, new visitor welcome teams, campus ministry, mercy and justice initiatives",
    display_order: 4,
    questions: [
      "I feel genuine concern for people who don't have a relationship with God.",
      "I find it natural to build friendships with people who aren't part of any church.",
      "When I meet someone new, I'm curious about their story and their spiritual background.",
      "I feel comfortable bringing up matters of faith in everyday conversations.",
      "I think a lot about how to explain the gospel in ways that connect with different people.",
      "I'm drawn to places and settings where I'll encounter people far from God.",
      "I get frustrated when the church focuses only on its own members and ignores the surrounding community.",
      "I'm more energized by outreach activities than by internal church programs.",
      "I naturally look for common ground with people whose beliefs are different from mine.",
      "I feel a sense of urgency about people hearing and understanding the gospel.",
      "I enjoy learning about other cultures, worldviews, or backgrounds to better connect with people.",
      "I'm willing to go to uncomfortable places or situations if it means building relationships.",
      "People have told me I have a gift for making spiritual conversations feel natural.",
      "I tend to pray specifically for people I know who aren't believers.",
      "I'm more interested in reaching new people than in maintaining existing programs.",
      "I feel most alive when I'm involved in efforts that bring the gospel to new audiences.",
      "I'm comfortable being in settings where I'm the only believer in the room.",
      "When I hear someone's story of coming to faith, it deeply moves and motivates me.",
      "I tend to invite people to church or spiritual conversations more than most people I know.",
      "I often think about how the church can better serve and engage its neighbors.",
      "I'm drawn to justice and mercy work because I see it as an extension of God's mission.",
      "I feel called to go where the gospel hasn't been clearly shared yet.",
      "I'm patient with people who are skeptical or hostile toward Christianity.",
      "I often look for ways to demonstrate God's love through action, not just words.",
    ],
  },
  {
    internal_name: "prophetic_discernment",
    public_name: "Prophetic & Discernment",
    description: "You have a God-given sensitivity to truth, integrity, and alignment with God's Word. You can often sense when something is off — in a teaching, a decision, or a group dynamic — before others see it. This gift shows up as a commitment to honesty, a willingness to speak hard truths, and an instinct for identifying what is and isn't consistent with Scripture.",
    strengths: "You help the church stay honest and aligned with God's Word. You're willing to raise concerns others are thinking but won't say. You protect groups from drifting into error or complacency, and you bring moral clarity in confusing situations. Your courage to speak up is valuable even when it's uncomfortable.",
    cautions: "Truth without love can wound. Be careful that your desire for integrity doesn't become harshness or self-righteousness. Not every impression you have is from God — test your instincts against Scripture and the counsel of wise believers. Practice gentleness and humility alongside honesty.",
    ministry_fit: "Elder/leadership accountability, teaching evaluation, doctrinal review, conflict mediation, counseling discernment, prayer ministry, leadership advisory roles, theological education",
    display_order: 5,
    questions: [
      "I often sense when something is wrong in a situation before I can fully articulate why.",
      "I care deeply about honesty and integrity, even when the truth is inconvenient.",
      "When I hear a teaching or idea, I instinctively evaluate it against Scripture.",
      "I'm willing to raise a concern even if it makes me unpopular.",
      "I can usually tell when someone is being genuine versus performing.",
      "I feel a strong internal tension when I see people compromising on important principles.",
      "People sometimes describe me as discerning or perceptive.",
      "I'm drawn to clarity and uncomfortable with ambiguity when it comes to moral or doctrinal questions.",
      "I tend to see patterns and root causes where others only see surface issues.",
      "I feel compelled to speak up when I see something that contradicts God's Word.",
      "I'm not easily swayed by emotional arguments or popular opinion.",
      "I sometimes feel burdened by an awareness of problems that others don't seem to notice.",
      "I take the purity of the church — its doctrine and its conduct — very seriously.",
      "I'm more likely to ask hard questions than to go along with the group.",
      "When a decision feels wrong, I struggle to stay silent even when it would be easier.",
      "I can often identify the real issue in a conflict, beneath the presenting symptoms.",
      "I value alignment between what someone says and how they live.",
      "People have come to me for a honest assessment when they need unvarnished truth.",
      "I tend to be cautious about new ideas until I've had time to evaluate them carefully.",
      "I feel a responsibility to guard the integrity of what is taught and practiced in the church.",
      "I'm not afraid of disagreement if it's in pursuit of truth.",
      "I often pray for wisdom to see clearly and to know when to speak and when to wait.",
      "I can usually sense the spiritual temperature of a room or a group.",
      "When I share concerns, I try to do so constructively, but I won't stay silent to keep the peace.",
    ],
  },
  {
    internal_name: "faith_intercession",
    public_name: "Faith & Intercession",
    description: "You have a God-given capacity to trust God in situations where others hesitate and to sustain a life of persistent prayer. You are drawn to bringing needs before God with confidence and patience, and you often sense a call to pray for specific people or situations. This gift shows up as unusual spiritual stamina, a posture of dependence on God, and a conviction that prayer genuinely changes things.",
    strengths: "You anchor the people around you in dependence on God rather than human effort. Your prayers carry weight because they are persistent, specific, and faith-filled. You remind the church that its first response to any situation should be prayer, and your trust in God's faithfulness encourages others to take risks for His kingdom.",
    cautions: "Faith is not the same as presumption. Be careful not to treat your convictions as guarantees or to dismiss practical wisdom as a lack of faith. Avoid shaming others who process doubt differently than you. Stay grounded in Scripture so your faith is anchored in God's character, not in your own feelings.",
    ministry_fit: "Prayer teams, intercessory prayer ministry, prayer room coordination, fasting initiatives, pastoral prayer support, missions prayer partnerships, prayer mentoring, crisis prayer response",
    display_order: 6,
    questions: [
      "When I hear about a need, my instinctive first response is to pray about it.",
      "I often spend extended time in prayer and find it energizing rather than draining.",
      "I tend to trust God's provision even when the circumstances look uncertain.",
      "I keep a list — mental or written — of people and situations I'm praying for regularly.",
      "People have asked me to pray for them because they sense I take prayer seriously.",
      "I believe prayer genuinely changes situations, not just my attitude toward them.",
      "I feel a specific burden to pray for certain people or situations, sometimes unexpectedly.",
      "When others are anxious about a situation, I often feel a calm trust that God is in control.",
      "I'm willing to take steps of faith that seem risky because I trust God's leading.",
      "I find myself praying throughout the day, not just at designated times.",
      "I've experienced seasons where I felt strongly prompted to pray for something specific.",
      "I'm drawn to stories of God's faithfulness and answered prayer in the lives of others.",
      "When a church or ministry faces a major decision, I believe the first step should be prayer.",
      "I feel a deep conviction that many things remain undone because they haven't been prayed for.",
      "I'm more inclined to wait on God than to forge ahead on my own plan.",
      "I often sense when the right response to a situation is to pray rather than to act.",
      "I get energized when I'm part of a group that prioritizes prayer together.",
      "I've learned to pay attention to promptings that I believe come from the Holy Spirit.",
      "I'm comfortable with long seasons of praying without seeing immediate results.",
      "People have described me as someone with unusual trust in God.",
      "I feel that intercessory prayer — praying on behalf of others — is one of the most important things I do.",
      "I've stepped out in faith on something that didn't make sense on paper, and God came through.",
      "I naturally encourage others to pray rather than worry.",
      "When I consider the needs of the world, my response is less despair and more prayerful hope.",
    ],
  },
  {
    internal_name: "stewardship_generosity",
    public_name: "Stewardship & Generosity",
    description: "You have a God-given impulse to give — your money, your time, your resources, your home — for the sake of others and the advance of God's kingdom. You see what you have as entrusted, not owned, and you look for strategic ways to deploy resources for maximum kingdom impact. This gift shows up as an open hand, a hospitable heart, and a keen sense of where generosity can make the biggest difference.",
    strengths: "You model what it looks like to hold things loosely and give freely. Your generosity funds ministry, blesses the marginalized, and inspires others to be generous. You often see needs before others do and act quickly. Your hospitality makes people feel welcomed, valued, and cared for.",
    cautions: "Be careful not to give in ways that create dependency or to use generosity as a means of control or recognition. Stewardship includes wise financial management, not just giving — don't neglect your own household's needs. Avoid judging others who give differently than you do.",
    ministry_fit: "Benevolence ministry, hospitality teams, missions funding, facilities hosting, meal ministry, financial planning support, resource drives, community aid coordination",
    display_order: 7,
    questions: [
      "When I hear about a financial need, I immediately start thinking about how I can help.",
      "I get more joy from giving money away than from spending it on myself.",
      "I naturally think about how to use my resources — time, money, space — for others.",
      "I enjoy hosting people in my home, even when it requires significant effort.",
      "I often give above and beyond what's expected or required.",
      "I pay attention to practical needs — groceries, bills, transportation — and try to meet them.",
      "I think of my possessions as tools to be used, not treasures to be protected.",
      "People have described me as generous, sometimes to a fault.",
      "I feel energized when I can connect a resource to a need in a meaningful way.",
      "I look for strategic giving opportunities — places where generosity will have lasting impact.",
      "I'm comfortable giving sacrificially, even when it costs me something significant.",
      "I enjoy preparing meals, opening my home, or providing for others without being asked.",
      "When I see someone in need, I feel a strong pull to act rather than just empathize.",
      "I pay attention to how money is used in the church and care that it's stewarded well.",
      "I've experienced deep joy from anonymous giving or behind-the-scenes generosity.",
      "I often notice material needs that others walk right past.",
      "I believe hospitality is one of the most practical ways to show God's love.",
      "I'm drawn to supporting missionaries, church plants, or ministries financially.",
      "I don't wait to be asked — when I see a need, I act.",
      "I think about how to live simply so that I can give more generously.",
      "I feel that how I manage my finances is a direct reflection of my trust in God.",
      "I enjoy making sure visitors or newcomers feel welcomed and provided for.",
      "I have a hard time ignoring a practical need when I have the ability to meet it.",
      "When I think about legacy, I think about what I gave away, not what I accumulated.",
    ],
  },
  {
    internal_name: "creative_communication",
    public_name: "Creative & Communication",
    description: "You have a God-given ability to express truth, beauty, and the reality of God through creative means — writing, visual art, music, design, storytelling, or other forms of expression. You are drawn to shaping how people experience and encounter God's truth, and you instinctively look for fresh ways to communicate what matters most. This gift shows up as artistic sensibility paired with spiritual purpose.",
    strengths: "You help people encounter God in ways that transcend mere information. Your creativity makes truth accessible, memorable, and emotionally resonant. You bring beauty into spaces that might otherwise feel dry or routine, and you help the church communicate its message more effectively to the broader world.",
    cautions: "Creative work can become self-expression rather than service if unchecked. Stay open to feedback and collaboration — your art serves the body, not just your vision. Avoid the trap of perfectionism, which can delay obedience. Remember that substance matters more than style.",
    ministry_fit: "Worship arts (music, visual art, media), graphic design, writing and content creation, video production, stage and environment design, social media ministry, drama and storytelling, communications strategy",
    display_order: 8,
    questions: [
      "I often think about how to present an idea in a way that's not just accurate but compelling.",
      "I'm drawn to creative expression — writing, music, art, design, or storytelling.",
      "I notice the aesthetic quality of environments and feel motivated to improve them.",
      "I tend to see connections and metaphors that help communicate abstract truths vividly.",
      "I feel energized when I'm creating something — a piece of writing, a design, a presentation.",
      "I instinctively look for fresh ways to communicate rather than repeating the same approach.",
      "People have told me I have a way with words — spoken or written.",
      "I care about how things look, sound, or feel, not just whether they're functional.",
      "I find worship through creative expression — making something beautiful feels like an offering to God.",
      "I get frustrated when good content is undermined by poor communication or presentation.",
      "I enjoy brainstorming creative approaches to problems or projects.",
      "When I read Scripture, I sometimes think about how to express its themes artistically.",
      "I tend to process my experiences and emotions through creative outlets.",
      "I'm drawn to the intersection of beauty and truth — I believe they belong together.",
      "I can often envision the final product before it exists and work backward to create it.",
      "I enjoy collaborating with others to create something greater than what any of us could do alone.",
      "I've been told that my creative work has helped someone understand or experience God more deeply.",
      "I pay attention to details — colors, fonts, phrasing, composition — that others might overlook.",
      "I feel a sense of calling to use my creativity for God's purposes, not just personal fulfillment.",
      "I'm interested in how the church can communicate more effectively to a broader audience.",
      "I naturally think about visual or narrative elements when planning an event or service.",
      "I often have ideas for creative projects that could serve the church or community.",
      "I believe that how something is communicated matters as much as what is communicated.",
      "When I see something beautiful or well-crafted, I'm inspired to create something that glorifies God.",
    ],
  },
];

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check if categories already exist
    const existing = await client.query("SELECT COUNT(*) as cnt FROM sg_categories");
    if (parseInt(existing.rows[0].cnt) > 0) {
      console.log("Categories already exist. Skipping seed.");
      await client.query("ROLLBACK");
      return;
    }

    for (const cat of CATEGORIES) {
      const catResult = await client.query(
        `INSERT INTO sg_categories (internal_name, public_name, description, strengths, cautions, ministry_fit, display_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [cat.internal_name, cat.public_name, cat.description, cat.strengths, cat.cautions, cat.ministry_fit, cat.display_order]
      );
      const categoryId = catResult.rows[0].id;

      for (const questionText of cat.questions) {
        await client.query(
          `INSERT INTO sg_questions (category_id, question_text) VALUES ($1, $2)`,
          [categoryId, questionText]
        );
      }

      console.log(`  Seeded ${cat.internal_name}: ${cat.questions.length} questions`);
    }

    await client.query("COMMIT");
    console.log("\nSeed complete: 8 categories, 192 questions");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

seed()
  .then(() => { pool.end(); process.exit(0); })
  .catch((err) => { console.error(err); pool.end(); process.exit(1); });
