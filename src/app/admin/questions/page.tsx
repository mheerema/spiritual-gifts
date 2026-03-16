"use client";

import { useState, useEffect, useCallback } from "react";

interface Category {
  id: string;
  public_name: string;
}

interface Question {
  id: string;
  category_id: string;
  category_name: string;
  question_text: string;
  is_active: boolean;
  version: number;
  created_at: string;
}

export default function QuestionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // New question form
  const [showAdd, setShowAdd] = useState(false);
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(
        (data.categories || []).map((c: Category & { internal_name?: string }) => ({
          id: c.id,
          public_name: c.public_name,
        }))
      );
    } catch {
      // error
    }
  }, []);

  const loadQuestions = useCallback(async () => {
    try {
      const url = selectedCategory
        ? `/api/admin/questions?category_id=${selectedCategory}`
        : "/api/admin/questions";
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    setLoading(true);
    loadQuestions();
  }, [loadQuestions]);

  const handleCreate = async () => {
    if (!newCategoryId || !newQuestionText.trim()) return;
    setCreating(true);

    try {
      const res = await fetch("/api/admin/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_id: newCategoryId,
          question_text: newQuestionText.trim(),
        }),
      });

      if (res.ok) {
        setNewQuestionText("");
        setShowAdd(false);
        await loadQuestions();
      }
    } catch {
      // error
    } finally {
      setCreating(false);
    }
  };

  const handleToggleActive = async (q: Question) => {
    try {
      await fetch(`/api/admin/questions/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !q.is_active }),
      });
      await loadQuestions();
    } catch {
      // error
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editText.trim()) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/questions/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_text: editText.trim() }),
      });

      if (res.ok) {
        setEditingId(null);
        await loadQuestions();
      }
    } catch {
      // error
    } finally {
      setSaving(false);
    }
  };

  // Group questions by category for display
  const activeCount = questions.filter((q) => q.is_active).length;
  const inactiveCount = questions.length - activeCount;

  if (loading && questions.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-900">Questions</h1>
          <p className="text-sm text-stone-500 mt-0.5">
            {activeCount} active, {inactiveCount} inactive
            {selectedCategory ? " (filtered)" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors"
        >
          {showAdd ? "Cancel" : "Add Question"}
        </button>
      </div>

      {/* Add question form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6 space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
              Category
            </label>
            <select
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.public_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">
              Question Text
            </label>
            <textarea
              rows={3}
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="Enter the question statement..."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCreate}
              disabled={creating || !newCategoryId || !newQuestionText.trim()}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
            >
              {creating ? "Creating..." : "Create Question"}
            </button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.public_name}
            </option>
          ))}
        </select>
      </div>

      {/* Questions list */}
      <div className="space-y-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`bg-white rounded-xl border border-stone-200 overflow-hidden ${
              !q.is_active ? "opacity-60" : ""
            }`}
          >
            <div className="px-5 py-3.5 flex items-start gap-3">
              <button
                onClick={() => handleToggleActive(q)}
                className={`mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                  q.is_active ? "bg-green-500" : "bg-stone-300"
                }`}
                title={q.is_active ? "Active — click to deactivate" : "Inactive — click to activate"}
              />
              <div className="flex-1 min-w-0">
                {editingId === q.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={saving}
                        className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 text-stone-500 hover:text-stone-700 text-xs font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-stone-800 leading-relaxed">
                      {q.question_text}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      {q.category_name}
                      {!q.is_active && " (inactive)"}
                    </p>
                  </>
                )}
              </div>
              {editingId !== q.id && (
                <button
                  onClick={() => {
                    setEditingId(q.id);
                    setEditText(q.question_text);
                  }}
                  className="flex-shrink-0 text-xs text-stone-400 hover:text-stone-600 px-2 py-1 rounded hover:bg-stone-50 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <p className="text-stone-400 text-sm text-center py-10">
            No questions found.
          </p>
        )}
      </div>
    </div>
  );
}
