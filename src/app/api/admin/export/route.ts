import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface ExportRow {
  session_id: string;
  participant_name: string | null;
  participant_email: string | null;
  church_name: string | null;
  group_name: string | null;
  submitted_at: string;
  category_name: string;
  raw_score: number;
  average_score: string;
  rank: number;
}

/**
 * GET /api/admin/export
 * CSV export of all completed sessions with full scores.
 */
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const result = await query<ExportRow>(
      `SELECT s.id AS session_id,
              s.participant_name, s.participant_email,
              s.church_name, s.group_name,
              s.submitted_at,
              c.public_name AS category_name,
              sc.raw_score, sc.average_score, sc.rank
       FROM sg_sessions s
       JOIN sg_scores sc ON sc.session_id = s.id
       JOIN sg_categories c ON c.id = sc.category_id
       WHERE s.status = 'submitted'
       ORDER BY s.submitted_at DESC, sc.rank ASC`
    );

    // Build CSV
    const headers = [
      "Session ID",
      "Name",
      "Email",
      "Church",
      "Group",
      "Submitted",
      "Category",
      "Raw Score",
      "Average Score",
      "Rank",
    ];

    const csvRows = [headers.join(",")];

    for (const row of result.rows) {
      csvRows.push(
        [
          row.session_id,
          csvEscape(row.participant_name || ""),
          csvEscape(row.participant_email || ""),
          csvEscape(row.church_name || ""),
          csvEscape(row.group_name || ""),
          row.submitted_at ? new Date(row.submitted_at).toISOString() : "",
          csvEscape(row.category_name),
          row.raw_score,
          row.average_score,
          row.rank,
        ].join(",")
      );
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="charismata-export-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function csvEscape(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
