"use client";

import { useState, useEffect, useCallback } from "react";

interface Category {
  id: string;
  internal_name: string;
  public_name: string;
  description: string | null;
  strengths: string | null;
  cautions: string | null;
  ministry_fit: string | null;
  display_order: number;
  is_active: boolean;
  question_count: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Category>>({});
  const [saving, setSaving] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({
      public_name: cat.public_name,
      description: cat.description || "",
      strengths: cat.strengths || "",
      cautions: cat.cautions || "",
      ministry_fit: cat.ministry_fit || "",
    });
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/categories/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        setEditingId(null);
        await loadCategories();
      }
    } catch {
      // error
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (cat: Category) => {
    try {
      await fetch(`/api/admin/categories/${cat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !cat.is_active }),
      });
      await loadCategories();
    } catch {
      // error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-stone-900 mb-6">Categories</h1>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden"
          >
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleActive(cat)}
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                    cat.is_active ? "bg-green-500" : "bg-stone-300"
                  }`}
                  title={cat.is_active ? "Active — click to deactivate" : "Inactive — click to activate"}
                />
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">
                    {cat.public_name}
                  </h3>
                  <p className="text-xs text-stone-400">
                    {cat.internal_name} &middot; {cat.question_count} active questions &middot;
                    Order: {cat.display_order}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  editingId === cat.id ? setEditingId(null) : handleEdit(cat)
                }
                className="text-xs font-medium text-stone-500 hover:text-stone-700 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-colors"
              >
                {editingId === cat.id ? "Cancel" : "Edit"}
              </button>
            </div>

            {/* Edit panel */}
            {editingId === cat.id && (
              <div className="border-t border-stone-100 px-5 py-4 space-y-3 bg-stone-50/50">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Public Name
                  </label>
                  <input
                    type="text"
                    value={editForm.public_name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, public_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.description || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Strengths
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.strengths || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, strengths: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Cautions
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.cautions || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, cautions: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">
                    Ministry Fit
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.ministry_fit || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, ministry_fit: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
