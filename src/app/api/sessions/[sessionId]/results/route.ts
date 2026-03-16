import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";

interface SessionRow {
  id: string;
  participant_name: string | null;
  status: string;
  submitted_at: string | null;
}

interface ScoreRow {
  category_id: string;
  public_name: string;
  description: string | null;
  strengths: string | null;
  cautions: string | null;
  ministry_fit: string | null;
  raw_score: number;
  average_score: string;
  rank: number;
}

/**
 * GET /api/sessions/[sessionId]/results
 * Return scores with full category details and session metadata.
 * Only available for submitted sessions.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    // Fetch session
    const session = await queryOne<SessionRow>(
      `SELECT id, participant_name, status, submitted_at
       FROM sg_sessions WHERE id = $1`,
      [sessionId]
    );

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    if (session.status !== "submitted") {
      return NextResponse.json(
        { error: "Assessment has not been submitted yet" },
        { status: 400 }
      );
    }

    // Fetch scores with full category details
    const scoresResult = await query<ScoreRow>(
      `SELECT s.category_id, c.public_name, c.description,
              c.strengths, c.cautions, c.ministry_fit,
              s.raw_score, s.average_score, s.rank
       FROM sg_scores s
       JOIN sg_categories c ON c.id = s.category_id
       WHERE s.session_id = $1
       ORDER BY s.rank`,
      [sessionId]
    );

    return NextResponse.json({
      session: {
        id: session.id,
        participant_name: session.participant_name,
        submitted_at: session.submitted_at,
      },
      scores: scoresResult.rows.map((s) => ({
        category_id: s.category_id,
        public_name: s.public_name,
        description: s.description,
        strengths: s.strengths,
        cautions: s.cautions,
        ministry_fit: s.ministry_fit,
        raw_score: s.raw_score,
        average_score: parseFloat(s.average_score),
        rank: s.rank,
      })),
    });
  } catch (error) {
    console.error("GET /api/sessions/[sessionId]/results error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
