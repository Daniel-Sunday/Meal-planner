"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const TABS = [
  { id: "planner",  label: "Planner",  icon: "📅", path: "/planner" },
  { id: "shopping", label: "Shopping", icon: "🛒", path: "/shopping" },
  { id: "recipes",  label: "Recipes",  icon: "📖", path: "/recipes" },
  { id: "blog",     label: "Blog",     icon: "📰", path: "/blog" },
  { id: "insights", label: "Insights", icon: "📊", path: "/insights" },
];

const SHOW_NAV_PATHS = ["/planner", "/shopping", "/recipes", "/blog", "/insights", "/pantry", "/kids", "/school-lunch"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh", background: "#F5EFE6" }}>
        {children}
      </div>
    );
  }

  const showNav = SHOW_NAV_PATHS.some(path => pathname === path || pathname.startsWith(path + "/"));

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F5EFE6", position: "relative" }}>
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>

      {showNav && (
        <div style={{
          display: "flex",
          gap: 4,
          padding: "8px 6px 10px",
          background: "#F5EFE6",
          borderTop: "1px solid #E8DDD0",
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
        }}>
          {TABS.map(t => {
            const isActive = pathname.startsWith(t.path);
            return (
              <button
                key={t.id}
                onClick={() => router.push(t.path)}
                style={{
                  flex: 1,
                  padding: "8px 2px",
                  borderRadius: 12,
                  background: isActive ? "#2D5016" : "#FFFFFF",
                  border: isActive ? "none" : "1px solid #E8DDD0",
                  color: isActive ? "#EAF3DE" : "#8A7968",
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  fontFamily: "'Figtree', sans-serif"
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
