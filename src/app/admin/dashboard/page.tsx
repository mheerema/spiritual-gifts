"use client";

import { useState, useEffect } from "react";

interface Stats {
  total_sessions: number;
  completed_sessions: number;
  in_progress_sessions: number;
  total_questions: number;
  active_questions: number;
  total_categories: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full" />
      </div>
    );
  }

  if (!stats) {
    return (
      <p className="text-stone-500 text-center py-20">
        Failed to load dashboard data.
      </p>
    );
  }

  const cards = [
    {
      label: "Total Sessions",
      value: stats.total_sessions,
      sub: null,
    },
    {
      label: "Completed",
      value: stats.completed_sessions,
      sub: stats.total_sessions > 0
        ? `${Math.round((stats.completed_sessions / stats.total_sessions) * 100)}% completion rate`
        : null,
    },
    {
      label: "In Progress",
      value: stats.in_progress_sessions,
      sub: null,
    },
    {
      label: "Questions",
      value: stats.active_questions,
      sub: stats.total_questions !== stats.active_questions
        ? `${stats.total_questions} total (${stats.total_questions - stats.active_questions} inactive)`
        : `${stats.total_questions} total`,
    },
    {
      label: "Categories",
      value: stats.total_categories,
      sub: null,
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-stone-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-stone-200 p-5"
          >
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              {card.label}
            </p>
            <p className="text-2xl font-bold text-stone-900 mt-1">
              {card.value}
            </p>
            {card.sub && (
              <p className="text-xs text-stone-400 mt-1">{card.sub}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
