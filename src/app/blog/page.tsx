import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nigerian Family Feeding Blog | Chop Chop 🇳🇬",
  description: "Get helpful advice on weekly dinner planning, budget shopping, school lunchboxes, and cooking healthy meals for West African families.",
  openGraph: {
    title: "Nigerian Family Feeding Blog | Chop Chop 🇳🇬",
    description: "Get helpful advice on weekly dinner planning, budget shopping, and school lunchboxes.",
    url: "https://chopchop-mealplanner.vercel.app/blog",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Family Feeding Blog | Chop Chop 🇳🇬",
    description: "Get helpful advice on weekly dinner planning, budget shopping, and school lunchboxes."
  }
};

const ARTICLES = [
  {
    slug: "what-should-i-cook-this-week",
    title: "What Should I Cook This Week?",
    icon: "🥘",
    date: "June 12, 2026",
    readTime: "4 min read",
    desc: "Overcome the daily decision fatigue with our practical guide to structuring a balanced weekly dinner rotation."
  },
  {
    slug: "nigerian-weekly-meal-timetable",
    title: "Nigerian Weekly Meal Timetable",
    icon: "📅",
    date: "June 10, 2026",
    readTime: "5 min read",
    desc: "Learn how to build a classic, stress-free 7-day meal plan that keeps your family excited for breakfast, lunch, and dinner."
  },
  {
    slug: "school-lunch-ideas-for-nigerian-kids",
    title: "School Lunch Ideas For Nigerian Kids",
    icon: "🎒",
    date: "June 8, 2026",
    readTime: "3 min read",
    desc: "Spill-proof, room-temperature stable lunchbox ideas that will make your kids look forward to their lunch break."
  },
  {
    slug: "healthy-nigerian-family-meals",
    title: "Healthy Nigerian Family Meals",
    icon: "🥗",
    date: "June 5, 2026",
    readTime: "4 min read",
    desc: "Nutrient-packed modifications to traditional Nigerian staples, lowering oil levels while keeping authentic flavor."
  },
  {
    slug: "budget-friendly-nigerian-meals",
    title: "Budget-Friendly Nigerian Meals",
    icon: "₦",
    date: "June 2, 2026",
    readTime: "5 min read",
    desc: "How to shop smart, utilize dry goods, and structure portion sizes to feed a family of 4 or more on a budget."
  }
];

export default function Page() {
  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Feeding Advice
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          Family Feeding Blog
        </h2>
      </div>

      {/* List Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Read helpful articles written by Nigerian mothers, nutritionists, and home cooks to optimize your family's nutrition and budget.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ARTICLES.map(a => (
            <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid #E8DDD0",
                borderRadius: 16,
                padding: "14px",
                display: "flex",
                gap: 12,
                cursor: "pointer",
                transition: "transform 0.15s ease",
              }}>
                <div style={{
                  fontSize: 32,
                  background: "#FBF7F2",
                  borderRadius: 12,
                  width: 54,
                  height: 54,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ margin: 0, color: "#1A2E0A", fontSize: 15, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>
                      {a.title}
                    </h3>
                  </div>
                  <div style={{ fontSize: 11, color: "#8A7968", marginTop: 2 }}>
                    {a.date} · {a.readTime}
                  </div>
                  <p style={{ margin: 0, color: "#8A7968", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                    {a.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
