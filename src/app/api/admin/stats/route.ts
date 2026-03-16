import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface StatsRow {
  total_sessions: string;
  completed_sessions: string;
  in_progress_sessions: string;
  total_questions: string;
  active_questions: string;
  total_categories: string;
}

/**
 * GET /api/admin/stats
 * Dashboard overview stats.
 */
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const stats = await queryOne<StatsRow>(
      `SELECT
        (SELECT COUNT(*) FROM sg_sessions) AS total_sessions,
        (SELECT COUNT(*) FROM sg_sessions WHERE status = 'submitted') AS completed_sessions,
        (SELECT COUNT(*) FROM sg_sessions WHERE status = 'started') AS in_progress_sessions,
        (SELECT COUNT(*) FROM sg_questions) AS total_questions,
        (SELECT COUNT(*) FROM sg_questions WHERE is_active = TRUE) AS active_questions,
        (SELECT COUNT(*) FROM sg_categories) AS total_categories`
    );

    if (!stats) {
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total_sessions: parseInt(stats.total_sessions),
      completed_sessions: parseInt(stats.completed_sessions),
      in_progress_sessions: parseInt(stats.in_progress_sessions),
      total_questions: parseInt(stats.total_questions),
      active_questions: parseInt(stats.active_questions),
      total_categories: parseInt(stats.total_categories),
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
