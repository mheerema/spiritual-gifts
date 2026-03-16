import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface QuestionRow {
  id: string;
  category_id: string;
  category_name: string;
  question_text: string;
  is_active: boolean;
  version: number;
  created_at: string;
}

/**
 * GET /api/admin/questions
 * List questions with optional category filter.
 */
export async function GET(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category_id");

    let sql = `SELECT q.id, q.category_id, c.public_name AS category_name,
                      q.question_text, q.is_active, q.version, q.created_at
               FROM sg_questions q
               JOIN sg_categories c ON c.id = q.category_id`;
    const params: unknown[] = [];

    if (categoryId) {
      sql += ` WHERE q.category_id = $1`;
      params.push(categoryId);
    }

    sql += ` ORDER BY c.display_order, q.created_at`;

    const result = await query<QuestionRow>(sql, params);

    return NextResponse.json({ questions: result.rows });
  } catch (error) {
    console.error("GET /api/admin/questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/questions
 * Create a new question.
 */
export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { category_id, question_text } = body as {
      category_id?: string;
      question_text?: string;
    };

    if (!category_id || !question_text?.trim()) {
      return NextResponse.json(
        { error: "category_id and question_text are required" },
        { status: 400 }
      );
    }

    const result = await queryOne<{ id: string }>(
      `INSERT INTO sg_questions (category_id, question_text)
       VALUES ($1, $2)
       RETURNING id`,
      [category_id, question_text.trim()]
    );

    if (!result) {
      return NextResponse.json(
        { error: "Failed to create question" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
