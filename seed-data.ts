/**
 * Seed script for Spiritual Gifts Assessment
 *
 * Usage:
 *   DATABASE_URL="..." npx ts-node --skip-project seed-data.ts
 *
 * Creates 10 categories and 200 questions (20 per category).
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
      "I tend to think carefully about the precise meaning of words and phrases in Scripture.",
      "When someone is struggling, I tend to point them to a principle or truth that applies.",
      "I can usually tell when a teaching is biblically solid versus when something feels off.",
      "I enjoy helping newer believers understand foundational truths of the faith.",
      "I'm more interested in understanding why something is true than simply knowing that it is.",
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
      "I'm more interested in how someone is really doing than in surface-level updates.",
      "I find it natural to provide accountability in a way that feels supportive, not judgmental.",
      "When I think about ministry, I picture long-term relationships more than events or programs.",
      "I take it seriously when someone confides in me, and I guard their trust carefully.",
      "I often think about the spiritual condition of people I care about, even when I'm not with them.",
      "I can tell the difference between someone who needs advice and someone who just needs to be heard.",
      "I feel a deep sense of purpose when I see someone I've walked with grow in their faith.",
      "I instinctively protect the people I care about — emotionally, spiritually, and relationally.",
    ],
  },
  {
    internal_name: "service_helps",
    public_name: "Service & Helps",
    description: "You have a God-given drive to see practical needs and meet them — reliably, humbly, and without waiting to be asked. You are drawn to hands-on work that makes things function, whether it's setting up chairs, delivering meals, fixing what's broken, or quietly filling gaps that others walk past. This gift shows up as a bias toward action, a willingness to do unglamorous work, and deep satisfaction when your effort enables others to thrive.",
    strengths: "You are the reason things actually happen. While others talk, you act. Your reliability gives people confidence, and your willingness to serve without recognition creates a culture of humility. You often notice needs before anyone else does, and you meet them without fanfare. The body of Christ simply would not function without people like you.",
    cautions: "You may become resentful if your work goes unnoticed or if others seem to coast while you carry the load. Guard against measuring your worth by your productivity — rest is not laziness. Be careful not to serve out of compulsion or guilt rather than joy. Say no when you need to, and let others serve too.",
    ministry_fit: "Facilities and setup teams, meal ministry, practical care for the sick or elderly, event logistics, hospitality preparation, maintenance and repair, transportation ministry, nursery and childcare support",
    display_order: 3,
    questions: [
      "When I walk into a room and see something out of place, I fix it before anyone asks.",
      "I would rather set up the chairs than give the talk.",
      "I feel restless when I see a tangible need that no one is addressing.",
      "People have told me I'm one of the most reliable people they know.",
      "I get deep satisfaction from completing a hands-on task well, even if no one notices.",
      "I tend to volunteer for the unglamorous work that keeps things running.",
      "When someone is going through a hard time, my first instinct is to do something practical for them.",
      "I notice physical or logistical needs that others walk right past.",
      "I find it more fulfilling to serve practically than to teach or lead publicly.",
      "I take ownership of tasks I've committed to, even when they become tedious.",
      "When something breaks, I want to fix it — not just report it.",
      "I feel a sense of purpose when my behind-the-scenes effort enables someone else to succeed.",
      "I would rather do the work myself than spend time delegating it to others.",
      "I'm energized by a clear task list with tangible results at the end.",
      "I tend to show love through actions more than through words.",
      "I often stay late to clean up or finish what needs to be done after others have left.",
      "I find joy in repetitive, faithful work that others might find boring.",
      "When I hear about a need, I think in terms of what I can do, not what I can say.",
      "I'm drawn to roles where I can make an immediate, practical difference.",
      "I feel uncomfortable when I'm being served but have nothing to contribute in return.",
    ],
  },
  {
    internal_name: "leadership",
    public_name: "Leadership",
    description: "You have a God-given capacity to see where a group needs to go and to move people toward that destination. You are drawn to setting direction, making decisions, and taking initiative when others are uncertain. This gift shows up as a combination of vision, conviction, and the ability to inspire others to follow — not through position or title, but through clarity and courage.",
    strengths: "You bring direction when there is none. In moments of confusion or inertia, you step forward with a clear sense of what should happen next. People trust your judgment and are willing to follow your lead because you communicate with conviction and act with integrity. You raise the ambition and focus of every group you're part of.",
    cautions: "Leadership without humility becomes domination. Be careful not to confuse your vision with God's will or to steamroll people who process differently than you. Listen before you lead. Surround yourself with people who will tell you the truth. Remember that leading well means developing other leaders, not accumulating followers.",
    ministry_fit: "Ministry team leadership, elder/deacon service, church planting, small group multiplication, strategic initiative leadership, vision casting, mentoring emerging leaders, organizational development",
    display_order: 4,
    questions: [
      "When a group is stuck, I feel a strong pull to step in and set a direction.",
      "I naturally think about where things should be headed, not just where they are now.",
      "People tend to look to me for decisions when the path forward is unclear.",
      "I'm more energized by casting vision for something new than by maintaining something existing.",
      "I'm comfortable making decisions with incomplete information when the situation requires it.",
      "I feel responsible for the outcomes of groups I'm part of, even when I'm not officially in charge.",
      "I tend to think in terms of the big picture rather than the immediate task.",
      "I would rather take a risk on a new direction than stay with a safe but stagnant status quo.",
      "I naturally identify and develop the potential in other people.",
      "When I see an opportunity that others haven't noticed, I feel compelled to rally people toward it.",
      "I'm drawn to situations that require initiative and courage, not just competence.",
      "I find it easier to motivate a team than to manage the details of their work.",
      "People have described me as someone who influences the direction of conversations and groups.",
      "I'm willing to take the first step even when no one else is ready to move.",
      "I think about how to develop and empower others, not just how to get things done.",
      "When I disagree with the direction a group is heading, I say so — respectfully but clearly.",
      "I tend to see what a team or ministry could become, not just what it currently is.",
      "I'm more motivated by purpose and mission than by routine or stability.",
      "I feel energized when I can help a group move from confusion to clarity.",
      "I often end up leading even when I didn't intend to, simply because I spoke up first.",
    ],
  },
  {
    internal_name: "administration",
    public_name: "Administration",
    description: "You have a God-given ability to take a vision or plan and organize the people, resources, and processes needed to carry it out. You are drawn to building systems, coordinating logistics, and ensuring that things run smoothly and efficiently. This gift shows up as a keen eye for operational detail, a love of structure, and a deep satisfaction in seeing a well-run operation.",
    strengths: "You turn ideas into reality. Where leaders set the direction, you build the infrastructure to get there. You bring order to chaos, anticipate problems before they happen, and keep complex efforts on track. People trust that when you coordinate something, nothing falls through the cracks. You multiply the effectiveness of everyone around you.",
    cautions: "Don't let efficiency become an idol — sometimes the messy, relational path is the right one. Be careful not to control outcomes so tightly that you crowd out others' contributions or the Spirit's leading. Remember that the system exists to serve people, not the other way around. Resist the temptation to criticize those who are less organized than you.",
    ministry_fit: "Event coordination, volunteer scheduling, project management, financial administration, team operations, database and systems management, ministry logistics, facilities coordination, communication workflows",
    display_order: 5,
    questions: [
      "When I see a disorganized process, I instinctively start thinking about how to improve it.",
      "I enjoy creating systems, checklists, or workflows that help a team run smoothly.",
      "When a group has a great idea, I'm already thinking about the steps needed to execute it.",
      "I can manage multiple responsibilities without losing track of details.",
      "I notice logistical problems — scheduling conflicts, resource gaps, unclear roles — before others do.",
      "I get frustrated when good plans fall apart due to poor coordination.",
      "I'm naturally drawn to roles that involve planning, scheduling, or organizing people.",
      "I prefer clear expectations and defined responsibilities over ambiguity.",
      "I often see inefficiencies that others accept as normal.",
      "I enjoy coordinating people's contributions so that the whole effort works together.",
      "I find it satisfying to build a process that runs well even when I'm not involved.",
      "I'm comfortable delegating tasks and following up to make sure they're completed.",
      "I tend to think in terms of timelines, dependencies, and resource allocation.",
      "When an event or project goes smoothly, I feel more satisfaction than the audience probably realizes.",
      "I'm the kind of person who creates the spreadsheet, the signup sheet, or the shared calendar.",
      "I get energized by bringing order to something that was previously chaotic.",
      "I would rather build a system that prevents problems than heroically solve them after the fact.",
      "I naturally break big goals into manageable steps with clear owners.",
      "People ask me to organize things because they know nothing will fall through the cracks.",
      "I see my organizational ability as a way to serve others, not as a personal preference.",
    ],
  },
  {
    internal_name: "evangelistic_missional",
    public_name: "Evangelistic & Missional",
    description: "You have a God-given burden for people who don't yet know Christ and a natural ability to build bridges between the gospel and their world. You are drawn to conversations with unbelievers, to crossing cultural boundaries, and to finding creative ways to make the faith accessible. This gift shows up as relational boldness and genuine curiosity about people far from God.",
    strengths: "You keep the church outward-focused. You build relationships with people others might avoid and naturally bring conversations toward matters of faith without being pushy. You remind believers that the mission extends beyond the walls of the church, and you model what it looks like to live sent.",
    cautions: "You may grow impatient with internal church life or dismiss the value of deep discipleship and theological precision. Remember that evangelism and edification go hand in hand. Be careful not to water down the message in an effort to make it palatable. Guard against measuring success by conversions alone.",
    ministry_fit: "Outreach events, neighborhood engagement, cross-cultural ministry, international missions, community partnerships, new visitor welcome teams, campus ministry, mercy and justice initiatives",
    display_order: 6,
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
      "I feel most alive when I'm involved in efforts that bring the gospel to new audiences.",
      "I'm comfortable being in settings where I'm the only believer in the room.",
      "When I hear someone's story of coming to faith, it deeply moves and motivates me.",
      "I often think about how the church can better serve and engage its neighbors.",
      "I feel called to go where the gospel hasn't been clearly shared yet.",
      "I'm patient with people who are skeptical or hostile toward Christianity.",
    ],
  },
  {
    internal_name: "prophetic_discernment",
    public_name: "Prophetic & Discernment",
    description: "You have a God-given sensitivity to truth, integrity, and alignment with God's Word. You can often sense when something is off — in a teaching, a decision, or a group dynamic — before others see it. This gift shows up as a commitment to honesty, a willingness to speak hard truths, and an instinct for identifying what is and isn't consistent with Scripture.",
    strengths: "You help the church stay honest and aligned with God's Word. You're willing to raise concerns others are thinking but won't say. You protect groups from drifting into error or complacency, and you bring moral clarity in confusing situations. Your courage to speak up is valuable even when it's uncomfortable.",
    cautions: "Truth without love can wound. Be careful that your desire for integrity doesn't become harshness or self-righteousness. Not every impression you have is from God — test your instincts against Scripture and the counsel of wise believers. Practice gentleness and humility alongside honesty.",
    ministry_fit: "Elder/leadership accountability, teaching evaluation, doctrinal review, conflict mediation, counseling discernment, prayer ministry, leadership advisory roles, theological education",
    display_order: 7,
    questions: [
      "I often sense when something is wrong in a situation before I can fully articulate why.",
      "I care deeply about honesty and integrity, even when the truth is inconvenient.",
      "When I hear a teaching or idea, I instinctively evaluate it against Scripture.",
      "I'm willing to raise a concern even if it makes me unpopular.",
      "I can usually tell when someone is being genuine versus performing.",
      "I feel a strong internal tension when I see people compromising on important principles.",
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
      "I feel a responsibility to guard the integrity of what is taught and practiced in the church.",
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
    display_order: 8,
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
      "When a church or ministry faces a major decision, I believe the first step should be prayer.",
      "I feel a deep conviction that many things remain undone because they haven't been prayed for.",
      "I'm more inclined to wait on God than to forge ahead on my own plan.",
      "I often sense when the right response to a situation is to pray rather than to act.",
      "I get energized when I'm part of a group that prioritizes prayer together.",
      "I'm comfortable with long seasons of praying without seeing immediate results.",
      "People have described me as someone with unusual trust in God.",
      "I feel that intercessory prayer — praying on behalf of others — is one of the most important things I do.",
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
    display_order: 9,
    questions: [
      "When I hear about a financial need, I immediately start thinking about how I can help.",
      "I get more joy from giving money away than from spending it on myself.",
      "I naturally think about how to use my resources — time, money, space — for others.",
      "I enjoy hosting people in my home, even when it requires significant effort.",
      "I often give above and beyond what's expected or required.",
      "I think of my possessions as tools to be used, not treasures to be protected.",
      "People have described me as generous, sometimes to a fault.",
      "I feel energized when I can connect a resource to a need in a meaningful way.",
      "I look for strategic giving opportunities — places where generosity will have lasting impact.",
      "I'm comfortable giving sacrificially, even when it costs me something significant.",
      "I enjoy preparing meals, opening my home, or providing for others without being asked.",
      "I pay attention to how money is used in the church and care that it's stewarded well.",
      "I've experienced deep joy from anonymous giving or behind-the-scenes generosity.",
      "I often notice material needs that others walk right past.",
      "I believe hospitality is one of the most practical ways to show God's love.",
      "I'm drawn to supporting missionaries, church plants, or ministries financially.",
      "I think about how to live simply so that I can give more generously.",
      "I feel that how I manage my finances is a direct reflection of my trust in God.",
      "I enjoy making sure visitors or newcomers feel welcomed and provided for.",
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
    display_order: 10,
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
      "When I read Scripture, I sometimes think about how to express its themes artistically.",
      "I tend to process my experiences and emotions through creative outlets.",
      "I'm drawn to the intersection of beauty and truth — I believe they belong together.",
      "I can often envision the final product before it exists and work backward to create it.",
      "I've been told that my creative work has helped someone understand or experience God more deeply.",
      "I pay attention to details — colors, fonts, phrasing, composition — that others might overlook.",
      "I feel a sense of calling to use my creativity for God's purposes, not just personal fulfillment.",
      "I'm interested in how the church can communicate more effectively to a broader audience.",
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
    console.log("\nSeed complete: 10 categories, 200 questions");
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
