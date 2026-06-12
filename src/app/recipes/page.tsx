import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nigerian Recipes Directory | Chop Chop 🇳🇬",
  description: "Browse authentic West African and Nigerian recipes. Get step-by-step instructions, ingredient checklists, and quick kitchen tips.",
  openGraph: {
    title: "Nigerian Recipes Directory | Chop Chop 🇳🇬",
    description: "Browse authentic West African and Nigerian recipes.",
    url: "https://chopchop-mealplanner.vercel.app/recipes",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Recipes Directory | Chop Chop 🇳🇬",
    description: "Browse authentic West African and Nigerian recipes."
  }
};

const RECIPES = [
  { slug: "jollof-rice",  title: "Jollof Rice",  icon: "🍲", time: "45 mins", desc: "The legendary smoky Nigerian rice cooked in rich tomato and pepper blend." },
  { slug: "egusi-soup",   title: "Egusi Soup",   icon: "🥣", time: "40 mins", desc: "Classic melon seed soup cooked with palm oil, leafy greens, and assorted meats." },
  { slug: "oha-soup",     title: "Oha Soup",     icon: "🥬", time: "35 mins", desc: "Traditional Igbo soup thickened with coco-yam paste and flavored with fresh oha leaves." },
  { slug: "afang-soup",    title: "Afang Soup",    icon: "🍃", time: "40 mins", desc: "Rich and nutritious Calabar soup made from ground afang leaves and waterleaves." },
  { slug: "yam-porridge", title: "Yam Porridge", icon: "🍠", time: "30 mins", desc: "Also known as Asaro, soft yam cubes simmered in spicy tomato and palm oil sauce." },
  { slug: "moi-moi",      title: "Moi Moi",      icon: "🫔", time: "50 mins", desc: "Savory steamed bean pudding made from peeled black-eyed peas, peppers, and onions." },
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
          Authentic Cooking
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          Recipes Directory
        </h2>
      </div>

      {/* Grid Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Explore our collection of classic Nigerian family favorites. Click any card to view detailed ingredients, preparation steps, and kitchen tips.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {RECIPES.map(r => (
            <Link key={r.slug} href={`/recipes/${r.slug}`} style={{ textDecoration: "none" }}>
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
                  {r.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ margin: 0, color: "#1A2E0A", fontSize: 15, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>
                      {r.title}
                    </h3>
                    <span style={{ color: "#8A7968", fontSize: 11 }}>⏱️ {r.time}</span>
                  </div>
                  <p style={{ margin: 0, color: "#8A7968", fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>
                    {r.desc}
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
