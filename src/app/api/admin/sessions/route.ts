import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface SessionRow {
  id: string;
  participant_name: string | null;
  participant_email: string | null;
  church_name: string | null;
  group_name: string | null;
  status: string;
  started_at: string;
  submitted_at: string | null;
  top_gifts: string | null;
}

/**
 * GET /api/admin/sessions
 * List completed sessions with top 2 gifts summary.
 */
export async function GET(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const statusFilter = searchParams.get("status");

    let sql = `SELECT s.id, s.participant_name, s.participant_email,
                      s.church_name, s.group_name, s.status,
                      s.started_at, s.submitted_at,
                      (SELECT string_agg(c.public_name, ', ' ORDER BY sc.rank)
                       FROM sg_scores sc
                       JOIN sg_categories c ON c.id = sc.category_id
                       WHERE sc.session_id = s.id AND sc.rank <= 2
                      ) AS top_gifts
               FROM sg_sessions s`;

    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIdx = 1;

    if (statusFilter) {
      conditions.push(`s.status = $${paramIdx++}`);
      params.push(statusFilter);
    }

    if (search) {
      conditions.push(`(
        s.participant_name ILIKE $${paramIdx} OR
        s.participant_email ILIKE $${paramIdx} OR
        s.church_name ILIKE $${paramIdx} OR
        s.group_name ILIKE $${paramIdx}
      )`);
      params.push(`%${search}%`);
      paramIdx++;
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(" AND ")}`;
    }

    sql += ` ORDER BY s.started_at DESC LIMIT 200`;

    const result = await query<SessionRow>(sql, params);

    return NextResponse.json({ sessions: result.rows });
  } catch (error) {
    console.error("GET /api/admin/sessions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
