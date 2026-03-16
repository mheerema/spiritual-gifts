"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const pathname = usePathname();

  // Hide nav on assessment pages and admin pages
  if (pathname?.startsWith("/assessment") || pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isResources =
    pathname === "/resources" ||
    pathname === "/terms" ||
    pathname === "/privacy";

  return (
    <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-12">
        <Link
          href="/"
          className="text-sm font-semibold text-stone-900 tracking-tight"
        >
          Charismata
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              isHome
                ? "text-stone-900 font-medium"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Assessment
          </Link>
          <Link
            href="/resources"
            className={`text-sm transition-colors ${
              isResources
                ? "text-stone-900 font-medium"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Resources
          </Link>
        </div>
      </div>
    </nav>
  );
}
