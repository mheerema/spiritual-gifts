import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

interface SessionRow {
  id: string;
  status: string;
  callback_url: string | null;
  callback_token: string | null;
  external_id: string | null;
}

interface CategoryScore {
  category_id: string;
  public_name: string;
  description: string;
  strengths: string;
  cautions: string;
  ministry_fit: string;
  raw_score: number;
  question_count: number;
}

/**
 * POST /api/sessions/[sessionId]/submit
 * Validate all questions answered, calculate scores per category,
 * insert into sg_scores, mark session submitted, and optionally
 * POST results to Trellis callback URL.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Fetch session
    const session = await queryOne<SessionRow>(
      `SELECT id, status, callback_url, callback_token, external_id
       FROM sg_sessions WHERE id = $1`,
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
        { error: "Session has already been submitted" },
        { status: 400 }
      );
    }

    // Check all questions are answered
    const countResult = await queryOne<{
      total: string;
      answered: string;
    }>(
      `SELECT
        (SELECT COUNT(*) FROM sg_session_questions WHERE session_id = $1) AS total,
        (SELECT COUNT(*) FROM sg_responses WHERE session_id = $1) AS answered`,
      [sessionId]
    );

    if (!countResult) {
      return NextResponse.json(
        { error: "Failed to verify responses" },
        { status: 500 }
      );
    }

    const total = parseInt(countResult.total);
    const answered = parseInt(countResult.answered);

    if (answered < total) {
      return NextResponse.json(
        {
          error: `Not all questions answered: ${answered}/${total} completed`,
        },
        { status: 400 }
      );
    }

    // Calculate scores per category
    const scoresResult = await query<CategoryScore>(
      `SELECT sq.category_id, c.public_name,
              c.description, c.strengths, c.cautions, c.ministry_fit,
              SUM(r.response_value)::INTEGER AS raw_score,
              COUNT(*)::INTEGER AS question_count
       FROM sg_session_questions sq
       JOIN sg_responses r ON r.session_id = sq.session_id AND r.question_id = sq.question_id
       JOIN sg_categories c ON c.id = sq.category_id
       WHERE sq.session_id = $1
       GROUP BY sq.category_id, c.public_name, c.description, c.strengths, c.cautions, c.ministry_fit
       ORDER BY SUM(r.response_value) DESC`,
      [sessionId]
    );

    // Compute averages and assign ranks
    const rankedScores = scoresResult.rows.map((row, i) => ({
      category_id: row.category_id,
      public_name: row.public_name,
      description: row.description,
      strengths: row.strengths,
      cautions: row.cautions,
      ministry_fit: row.ministry_fit,
      raw_score: row.raw_score,
      average_score: parseFloat(
        (row.raw_score / row.question_count).toFixed(2)
      ),
      rank: i + 1,
    }));

    // Bulk insert scores
    if (rankedScores.length > 0) {
      const values: unknown[] = [];
      const placeholders: string[] = [];
      rankedScores.forEach((s, i) => {
        const offset = i * 5;
        placeholders.push(
          `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`
        );
        values.push(
          sessionId,
          s.category_id,
          s.raw_score,
          s.average_score,
          s.rank
        );
      });

      await query(
        `INSERT INTO sg_scores (session_id, category_id, raw_score, average_score, rank)
         VALUES ${placeholders.join(", ")}`,
        values
      );
    }

    // Mark session as submitted
    await query(
      `UPDATE sg_sessions SET status = 'submitted', submitted_at = now() WHERE id = $1`,
      [sessionId]
    );

    // Fire-and-forget callback to Trellis if configured
    if (session.callback_url && session.callback_token && session.external_id) {
      const completedAt = new Date().toISOString();
      const primaryGifts = rankedScores
        .filter((s) => s.rank <= 2)
        .map((s) => s.public_name);

      const callbackPayload = {
        external_id: session.external_id,
        callback_token: session.callback_token,
        completed_at: completedAt,
        scores: rankedScores.map((s) => ({
          category: s.public_name,
          raw_score: s.raw_score,
          average_score: s.average_score,
          rank: s.rank,
          description: s.description,
          strengths: s.strengths,
          cautions: s.cautions,
          ministry_fit: s.ministry_fit,
        })),
        primary_gifts: primaryGifts,
        session_id: sessionId,
      };

      // Fire-and-forget: don't await, don't block on failure
      const cbController = new AbortController();
      const cbTimeout = setTimeout(() => cbController.abort(), 10000);
      fetch(session.callback_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(callbackPayload),
        signal: cbController.signal,
      })
        .then(() => clearTimeout(cbTimeout))
        .catch((err) => {
          clearTimeout(cbTimeout);
          console.error("Trellis callback failed:", err);
        });
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error("POST /api/sessions/[sessionId]/submit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
