"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [church, setChurch] = useState("");
  const [group, setGroup] = useState("");
  const [starting, setStarting] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleStart = async () => {
    setStarting(true);
    try {
      const res = await fetch("/api/sessions/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participant_name: name.trim() || null,
          participant_email: email.trim() || null,
          church_name: church.trim() || null,
          group_name: group.trim() || null,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/assessment/${data.sessionId}`);
      }
    } catch {
      // error
    } finally {
      setStarting(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-12 sm:py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Charismata
        </h1>
        <p className="text-stone-400 text-sm mt-1 tracking-wide uppercase">Spiritual Gifts Assessment</p>
        <p className="text-stone-500 mt-3 text-base sm:text-lg">
          Discover how God has equipped you for service in His church
        </p>
      </div>

      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            This assessment contains <strong>96 statements</strong> about behaviors, tendencies, and
            preferences. For each one, indicate how strongly you agree or disagree based on{" "}
            <em>what is typically true of you</em> — not what you wish were true or think should be true.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            There are no right or wrong answers. This tool offers{" "}
            <strong>directional insight</strong> — your results should be considered alongside
            community affirmation and the observable fruit in your life and ministry.
          </p>
          <p className="text-sm text-stone-500">
            Approximately <strong>15–20 minutes</strong>. Your progress saves automatically.
          </p>
        </div>

        {/* Scale */}
        <div className="bg-stone-100/60 rounded-2xl border border-stone-200 p-5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
            Response Scale
          </p>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {["Strongly\nDisagree", "Disagree", "Neutral", "Agree", "Strongly\nAgree"].map(
              (label, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center mx-auto font-semibold text-stone-500">
                    {i + 1}
                  </div>
                  <p className="text-stone-500 whitespace-pre-line leading-tight">{label}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Optional info */}
        <div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showInfo ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            Optional: Add your name and info
          </button>

          {showInfo && (
            <div className="mt-3 bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Church</label>
                  <input
                    type="text"
                    value={church}
                    onChange={(e) => setChurch(e.target.value)}
                    placeholder="Church name"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Group</label>
                  <input
                    type="text"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    placeholder="Small group, team, etc."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={starting}
          className="w-full py-4 bg-stone-900 text-white rounded-2xl text-base font-semibold hover:bg-stone-800 disabled:opacity-50 transition-colors"
        >
          {starting ? "Preparing your assessment..." : "Begin Assessment"}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-stone-400 text-center leading-relaxed">
          This assessment is descriptive, not definitive. Spiritual maturity, character, and local
          church affirmation matter more than self-perception alone.
        </p>

        {/* Resources link */}
        <div className="text-center">
          <a
            href="/resources"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Glossary, Bibliography &amp; Theological Framework &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
