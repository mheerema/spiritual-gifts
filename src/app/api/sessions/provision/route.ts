import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

interface SessionQuestion {
  question_id: string;
  category_id: string;
}

/**
 * POST /api/sessions/provision
 * Trellis provisioning endpoint. Creates a pre-configured session
 * with callback fields for posting results back to Trellis.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      participant_name,
      participant_email,
      callback_url,
      callback_token,
      external_id,
    } = body;

    // Validate required fields
    if (!callback_url || !callback_token || !external_id) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: callback_url, callback_token, external_id",
        },
        { status: 400 }
      );
    }

    // Select 12 random active questions per active category
    const questionsResult = await query<SessionQuestion>(
      `SELECT q.id AS question_id, q.category_id
       FROM sg_questions q
       JOIN sg_categories c ON c.id = q.category_id
       WHERE q.is_active = TRUE AND c.is_active = TRUE
       ORDER BY q.category_id, random()`
    );

    // Group by category and take 12 per category
    const byCategory = new Map<string, SessionQuestion[]>();
    for (const row of questionsResult.rows) {
      const list = byCategory.get(row.category_id) || [];
      list.push(row);
      byCategory.set(row.category_id, list);
    }

    const selected: SessionQuestion[] = [];
    for (const questions of byCategory.values()) {
      selected.push(...questions.slice(0, 12));
    }

    if (selected.length === 0) {
      return NextResponse.json(
        { error: "No active questions found" },
        { status: 500 }
      );
    }

    // Fisher-Yates shuffle
    for (let i = selected.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    // Create session with Trellis callback fields
    const session = await queryOne<{ id: string }>(
      `INSERT INTO sg_sessions (
        participant_name, participant_email,
        callback_url, callback_token, external_id
      )
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        participant_name || null,
        participant_email || null,
        callback_url,
        callback_token,
        external_id,
      ]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    // Bulk insert session_questions
    const values: unknown[] = [];
    const placeholders: string[] = [];
    selected.forEach((q, i) => {
      const offset = i * 4;
      placeholders.push(
        `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`
      );
      values.push(session.id, q.question_id, q.category_id, i);
    });

    await query(
      `INSERT INTO sg_session_questions (session_id, question_id, category_id, display_order)
       VALUES ${placeholders.join(", ")}`,
      values
    );

    // Build absolute URL so external callers (e.g. Trellis) redirect correctly
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

    return NextResponse.json({
      session_url: `${baseUrl}/assessment/${session.id}`,
    });
  } catch (error) {
    console.error("POST /api/sessions/provision error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
