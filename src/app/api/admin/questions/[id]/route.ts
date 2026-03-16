import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * PATCH /api/admin/questions/[id]
 * Update question text or active status.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const { question_text, is_active } = body as {
      question_text?: string;
      is_active?: boolean;
    };

    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIdx = 1;

    if (question_text !== undefined) {
      updates.push(`question_text = $${paramIdx++}`);
      values.push(question_text.trim());
    }
    if (is_active !== undefined) {
      updates.push(`is_active = $${paramIdx++}`);
      values.push(is_active);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    values.push(id);
    const result = await queryOne<{ id: string }>(
      `UPDATE sg_questions SET ${updates.join(", ")} WHERE id = $${paramIdx} RETURNING id`,
      values
    );

    if (!result) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/admin/questions/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
