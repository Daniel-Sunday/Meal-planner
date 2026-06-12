"use client";

import { useRouter } from "next/navigation";

export default function InsightsClient() {
  const router = useRouter();

  const TOOLS = [
    { path: "/pantry",       title: "Pantry Tracker",    icon: "🍎", desc: "Track cupboard stock, spices, and oil to auto-deduct from shopping lists." },
    { path: "/kids",         title: "Kids' Corner",      icon: "🍔", desc: "Kid-friendly West African recipes and children's nutritional guides." },
    { path: "/school-lunch", title: "School Lunchbox",    icon: "🎒", desc: "Balanced lunch ideas that stay fresh and mess-free at school." }
  ];

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Habits & Hub
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          Insights & Tools
        </h2>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        
        {/* Insights Section */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "20px 18px",
          textAlign: "center",
          marginBottom: 28
        }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>📊</div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#C4622D", fontSize: 16, fontWeight: 400, margin: 0, marginBottom: 8 }}>
            Kitchen Habits & Budgets
          </h3>
          <p style={{ color: "#3D4A30", fontSize: 13, lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
            Learn about your cooking variety, budget trends, and kitchen habits. Discover how much you spend and how to cook with more diverse African staples.
          </p>
          <span style={{
            background: "#F5EFE6",
            borderRadius: 100,
            padding: "4px 12px",
            color: "#8A7968",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-block"
          }}>
            ⚙️ Feature Coming Soon
          </span>
        </div>

        {/* Tools Section */}
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
          More Kitchen Tools
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TOOLS.map(t => (
            <div
              key={t.path}
              onClick={() => router.push(t.path)}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8DDD0",
                borderRadius: 16,
                padding: "14px",
                display: "flex",
                gap: 12,
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                fontSize: 28,
                background: "#FBF7F2",
                borderRadius: 12,
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, color: "#1A2E0A", fontSize: 14, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>
                  {t.title}
                </h4>
                <p style={{ margin: 0, color: "#8A7968", fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
