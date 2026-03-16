/**
 * Migration: Split Service & Administration into 3 categories
 *
 * This migration:
 * 1. Deactivates the old "service_administration" category (preserving historical data)
 * 2. Creates 3 new categories: service_helps, leadership, administration
 * 3. Inserts 20 questions per new category
 * 4. Deactivates removed questions from the other 7 categories (trimmed from 24 → 20)
 * 5. Updates display_order for all active categories
 *
 * Usage:
 *   DATABASE_URL="..." npx ts-node --skip-project migrate-categories.ts
 *
 * Safe to run multiple times — checks for existing categories before inserting.
 */

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ─── NEW CATEGORIES ──────────────────────────────────────

interface NewCategory {
  internal_name: string;
  public_name: string;
  description: string;
  strengths: string;
  cautions: string;
  ministry_fit: string;
  display_order: number;
  questions: string[];
}

const NEW_CATEGORIES: NewCategory[] = [
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
];

// ─── QUESTIONS TO DEACTIVATE ──────────────────────────────
// These are the 4 questions removed from each of the 7 remaining categories
// (trimmed from 24 → 20 per category). Matched by exact question text.

const QUESTIONS_TO_DEACTIVATE: string[] = [
  // word_wisdom (removed 4)
  "I've been told I have a way of making difficult topics understandable.",
  "I would rather prepare thoroughly than speak off the cuff.",
  "People have said that conversations with me helped them see something in a new way.",
  "I would describe my approach to faith as thoughtful and study-oriented.",
  // shepherding_care (removed 4)
  "I would describe myself as patient and present with people, even when progress is slow.",
  "I'm drawn to roles that involve ongoing relational investment rather than one-time interactions.",
  "I tend to be the person people call when they're in crisis.",
  "I would rather go deep with a few people than spread thin across many.",
  // evangelistic_missional (removed 4)
  "I'm more interested in reaching new people than in maintaining existing programs.",
  "I tend to invite people to church or spiritual conversations more than most people I know.",
  "I'm drawn to justice and mercy work because I see it as an extension of God's mission.",
  "I often look for ways to demonstrate God's love through action, not just words.",
  // prophetic_discernment (removed 4)
  "People sometimes describe me as discerning or perceptive.",
  "I'm drawn to clarity and uncomfortable with ambiguity when it comes to moral or doctrinal questions.",
  "I tend to be cautious about new ideas until I've had time to evaluate them carefully.",
  "I'm not afraid of disagreement if it's in pursuit of truth.",
  // faith_intercession (removed 4)
  "I've experienced seasons where I felt strongly prompted to pray for something specific.",
  "I'm drawn to stories of God's faithfulness and answered prayer in the lives of others.",
  "I've learned to pay attention to promptings that I believe come from the Holy Spirit.",
  "I've stepped out in faith on something that didn't make sense on paper, and God came through.",
  // stewardship_generosity (removed 4)
  "I pay attention to practical needs — groceries, bills, transportation — and try to meet them.",
  "When I see someone in need, I feel a strong pull to act rather than just empathize.",
  "I don't wait to be asked — when I see a need, I act.",
  "I have a hard time ignoring a practical need when I have the ability to meet it.",
  // creative_communication (removed 4)
  "I enjoy brainstorming creative approaches to problems or projects.",
  "I enjoy collaborating with others to create something greater than what any of us could do alone.",
  "I naturally think about visual or narrative elements when planning an event or service.",
  "I often have ideas for creative projects that could serve the church or community.",
];

// ─── DISPLAY ORDER UPDATES ──────────────────────────────

const DISPLAY_ORDER_UPDATES: Record<string, number> = {
  word_wisdom: 1,
  shepherding_care: 2,
  // service_helps: 3 (new)
  // leadership: 4 (new)
  // administration: 5 (new)
  evangelistic_missional: 6,
  prophetic_discernment: 7,
  faith_intercession: 8,
  stewardship_generosity: 9,
  creative_communication: 10,
};

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Check if new categories already exist
    const existingCheck = await client.query(
      `SELECT internal_name FROM sg_categories WHERE internal_name IN ('service_helps', 'leadership', 'administration')`
    );
    if (existingCheck.rows.length > 0) {
      console.log("New categories already exist. Skipping migration.");
      await client.query("ROLLBACK");
      return;
    }

    // 2. Deactivate old service_administration category
    const deactivated = await client.query(
      `UPDATE sg_categories SET is_active = FALSE WHERE internal_name = 'service_administration' RETURNING id`
    );
    if (deactivated.rows.length > 0) {
      const oldCatId = deactivated.rows[0].id;
      // Deactivate all questions in the old category
      const qResult = await client.query(
        `UPDATE sg_questions SET is_active = FALSE WHERE category_id = $1`,
        [oldCatId]
      );
      console.log(`Deactivated service_administration category and ${qResult.rowCount} questions`);
    } else {
      console.log("service_administration category not found (may already be deactivated)");
    }

    // 3. Insert new categories and their questions
    for (const cat of NEW_CATEGORIES) {
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

      console.log(`  Created ${cat.internal_name}: ${cat.questions.length} questions`);
    }

    // 4. Deactivate removed questions from other categories
    let deactivatedCount = 0;
    for (const questionText of QUESTIONS_TO_DEACTIVATE) {
      const result = await client.query(
        `UPDATE sg_questions SET is_active = FALSE WHERE question_text = $1 AND is_active = TRUE`,
        [questionText]
      );
      if (result.rowCount && result.rowCount > 0) {
        deactivatedCount += result.rowCount;
      }
    }
    console.log(`\nDeactivated ${deactivatedCount} questions from existing categories (expected: ${QUESTIONS_TO_DEACTIVATE.length})`);

    // 5. Update display_order for existing categories
    for (const [internalName, order] of Object.entries(DISPLAY_ORDER_UPDATES)) {
      await client.query(
        `UPDATE sg_categories SET display_order = $1 WHERE internal_name = $2`,
        [order, internalName]
      );
    }
    console.log("Updated display_order for all categories");

    await client.query("COMMIT");

    // 6. Verify final state
    const finalState = await client.query(
      `SELECT c.internal_name, c.public_name, c.display_order, c.is_active,
              (SELECT COUNT(*) FROM sg_questions q WHERE q.category_id = c.id AND q.is_active = TRUE) AS active_questions
       FROM sg_categories c
       ORDER BY c.display_order`
    );
    console.log("\n=== Final category state ===");
    for (const row of finalState.rows) {
      const status = row.is_active ? "✅" : "❌";
      console.log(`  ${status} ${row.display_order}. ${row.public_name} (${row.internal_name}) — ${row.active_questions} active questions`);
    }

    console.log("\nMigration complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

migrate()
  .then(() => { pool.end(); process.exit(0); })
  .catch((err) => { console.error("Migration failed:", err); pool.end(); process.exit(1); });
