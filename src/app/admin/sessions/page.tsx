"use client";

import { useState, useEffect, useCallback } from "react";

interface Session {
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

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [exporting, setExporting] = useState(false);

  const loadSessions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      const url = `/api/admin/sessions${params.toString() ? `?${params}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      // error
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(loadSessions, 300);
    return () => clearTimeout(timeout);
  }, [loadSessions]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/admin/export");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `charismata-export-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch {
      // error
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "--";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-stone-900">Sessions</h1>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 disabled:opacity-50 transition-colors"
        >
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, church, or group..."
          className="flex-1 max-w-md px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 bg-white"
        >
          <option value="">All statuses</option>
          <option value="submitted">Completed</option>
          <option value="started">In Progress</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-stone-200 border-t-stone-600 rounded-full" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block bg-white rounded-xl border border-stone-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Church / Group
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Top Gifts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50/50">
                    <td className="px-4 py-3 text-stone-800">
                      {s.participant_name || (
                        <span className="text-stone-300">Anonymous</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {s.participant_email || "--"}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {[s.church_name, s.group_name]
                        .filter(Boolean)
                        .join(" / ") || "--"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.status === "submitted"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {s.status === "submitted" ? "Completed" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-xs">
                      {formatDate(s.submitted_at || s.started_at)}
                    </td>
                    <td className="px-4 py-3 text-stone-600 text-xs">
                      {s.top_gifts || "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-stone-200 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-stone-800">
                    {s.participant_name || "Anonymous"}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      s.status === "submitted"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {s.status === "submitted" ? "Completed" : "In Progress"}
                  </span>
                </div>
                {s.participant_email && (
                  <p className="text-xs text-stone-500">{s.participant_email}</p>
                )}
                {(s.church_name || s.group_name) && (
                  <p className="text-xs text-stone-400 mt-1">
                    {[s.church_name, s.group_name].filter(Boolean).join(" / ")}
                  </p>
                )}
                <p className="text-xs text-stone-400 mt-1">
                  {formatDate(s.submitted_at || s.started_at)}
                </p>
                {s.top_gifts && (
                  <p className="text-xs text-stone-600 mt-2 font-medium">
                    {s.top_gifts}
                  </p>
                )}
              </div>
            ))}
          </div>

          {sessions.length === 0 && (
            <p className="text-stone-400 text-sm text-center py-10">
              No sessions found.
            </p>
          )}
        </>
      )}
    </div>
  );
}
