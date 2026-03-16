import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

interface SessionRow {
  id: string;
  participant_name: string | null;
  participant_email: string | null;
  church_name: string | null;
  group_name: string | null;
  status: string;
  current_page: number;
  started_at: string;
  submitted_at: string | null;
}

interface QuestionRow {
  session_question_id: string;
  question_id: string;
  category_id: string;
  display_order: number;
  question_text: string;
  category_name: string;
}

interface ResponseRow {
  question_id: string;
  response_value: number;
}

interface ScoreRow {
  category_id: string;
  category_name: string;
  raw_score: number;
  average_score: string;
  rank: number;
}

/**
 * GET /api/sessions/[sessionId]
 * Return session details, questions with text, responses map,
 * and scores (if submitted).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Fetch session
    const session = await queryOne<SessionRow>(
      `SELECT id, participant_name, participant_email, church_name, group_name,
              status, current_page, started_at, submitted_at
       FROM sg_sessions WHERE id = $1`,
      [sessionId]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // Fetch questions with text and category name
    const questionsResult = await query<QuestionRow>(
      `SELECT sq.id AS session_question_id, sq.question_id, sq.category_id,
              sq.display_order, q.question_text, c.public_name AS category_name
       FROM sg_session_questions sq
       JOIN sg_questions q ON q.id = sq.question_id
       JOIN sg_categories c ON c.id = sq.category_id
       WHERE sq.session_id = $1
       ORDER BY sq.display_order`,
      [sessionId]
    );

    // Fetch responses as a map { question_id: response_value }
    const responsesResult = await query<ResponseRow>(
      `SELECT question_id, response_value
       FROM sg_responses WHERE session_id = $1`,
      [sessionId]
    );

    const responses: Record<string, number> = {};
    for (const r of responsesResult.rows) {
      responses[r.question_id] = r.response_value;
    }

    // Fetch scores if submitted
    let scores: ScoreRow[] = [];
    if (session.status === "submitted") {
      const scoresResult = await query<ScoreRow>(
        `SELECT s.category_id, c.public_name AS category_name,
                s.raw_score, s.average_score, s.rank
         FROM sg_scores s
         JOIN sg_categories c ON c.id = s.category_id
         WHERE s.session_id = $1
         ORDER BY s.rank`,
        [sessionId]
      );
      scores = scoresResult.rows;
    }

    return NextResponse.json({
      session: {
        id: session.id,
        participant_name: session.participant_name,
        participant_email: session.participant_email,
        church_name: session.church_name,
        group_name: session.group_name,
        status: session.status,
        current_page: session.current_page,
        started_at: session.started_at,
        submitted_at: session.submitted_at,
      },
      questions: questionsResult.rows,
      responses,
      scores,
    });
  } catch (error) {
    console.error("GET /api/sessions/[sessionId] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/sessions/[sessionId]
 * Save responses (batch upsert) and/or update current_page.
 * Only allowed when session status = 'started'.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = await request.json();

    // Accept both camelCase (frontend) and snake_case
    const rawResponses = body.responses;
    const pageValue = body.currentPage ?? body.current_page;

    // Normalize responses: frontend sends { [question_id]: value } map
    // Also accept array format [{ question_id, response_value }]
    let normalizedResponses: { question_id: string; response_value: number }[] = [];
    if (rawResponses && typeof rawResponses === "object" && !Array.isArray(rawResponses)) {
      // Map format from frontend: { "uuid": 4, "uuid2": 3, ... }
      normalizedResponses = Object.entries(rawResponses).map(([qid, val]) => ({
        question_id: qid,
        response_value: val as number,
      }));
    } else if (Array.isArray(rawResponses)) {
      normalizedResponses = rawResponses;
    }

    // Verify session exists and is started
    const session = await queryOne<{ id: string; status: string }>(
      `SELECT id, status FROM sg_sessions WHERE id = $1`,
      [sessionId]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.status !== "started") {
      return NextResponse.json(
        { error: "Session is no longer active" },
        { status: 400 }
      );
    }

    // Batch upsert responses
    if (normalizedResponses.length > 0) {
      // Validate response values
      for (const r of normalizedResponses) {
        if (
          !r.question_id ||
          typeof r.response_value !== "number" ||
          r.response_value < 1 ||
          r.response_value > 5
        ) {
          return NextResponse.json(
            {
              error:
                "Invalid response: each must have question_id and response_value (1-5)",
            },
            { status: 400 }
          );
        }
      }

      const values: unknown[] = [];
      const placeholders: string[] = [];
      normalizedResponses.forEach((r, i) => {
        const offset = i * 3;
        placeholders.push(
          `($${offset + 1}, $${offset + 2}, $${offset + 3})`
        );
        values.push(sessionId, r.question_id, r.response_value);
      });

      await query(
        `INSERT INTO sg_responses (session_id, question_id, response_value)
         VALUES ${placeholders.join(", ")}
         ON CONFLICT (session_id, question_id)
         DO UPDATE SET response_value = EXCLUDED.response_value, answered_at = now()`,
        values
      );
    }

    // Update current_page if provided
    if (pageValue !== undefined && typeof pageValue === "number") {
      await query(
        `UPDATE sg_sessions SET current_page = $1 WHERE id = $2`,
        [pageValue, sessionId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/sessions/[sessionId] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
