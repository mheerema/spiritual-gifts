import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface CategoryRow {
  id: string;
  internal_name: string;
  public_name: string;
  description: string | null;
  strengths: string | null;
  cautions: string | null;
  ministry_fit: string | null;
  display_order: number;
  is_active: boolean;
  question_count: string;
}

/**
 * GET /api/admin/categories
 * List all categories with question counts.
 */
export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const result = await query<CategoryRow>(
      `SELECT c.id, c.internal_name, c.public_name, c.description,
              c.strengths, c.cautions, c.ministry_fit,
              c.display_order, c.is_active,
              COUNT(q.id)::TEXT AS question_count
       FROM sg_categories c
       LEFT JOIN sg_questions q ON q.category_id = c.id AND q.is_active = TRUE
       GROUP BY c.id
       ORDER BY c.display_order`
    );

    return NextResponse.json({
      categories: result.rows.map((c) => ({
        ...c,
        question_count: parseInt(c.question_count),
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
