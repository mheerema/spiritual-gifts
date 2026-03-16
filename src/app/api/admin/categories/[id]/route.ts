import { NextResponse } from "next/server";
import { queryOne } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

interface CategoryRow {
  id: string;
  public_name: string;
}

/**
 * PATCH /api/admin/categories/[id]
 * Update category fields.
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
    const { public_name, description, strengths, cautions, ministry_fit, is_active } = body as {
      public_name?: string;
      description?: string;
      strengths?: string;
      cautions?: string;
      ministry_fit?: string;
      is_active?: boolean;
    };

    // Build dynamic SET clause
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIdx = 1;

    if (public_name !== undefined) {
      updates.push(`public_name = $${paramIdx++}`);
      values.push(public_name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIdx++}`);
      values.push(description);
    }
    if (strengths !== undefined) {
      updates.push(`strengths = $${paramIdx++}`);
      values.push(strengths);
    }
    if (cautions !== undefined) {
      updates.push(`cautions = $${paramIdx++}`);
      values.push(cautions);
    }
    if (ministry_fit !== undefined) {
      updates.push(`ministry_fit = $${paramIdx++}`);
      values.push(ministry_fit);
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
    const result = await queryOne<CategoryRow>(
      `UPDATE sg_categories SET ${updates.join(", ")} WHERE id = $${paramIdx} RETURNING id, public_name`,
      values
    );

    if (!result) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: result });
  } catch (error) {
    console.error("PATCH /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
