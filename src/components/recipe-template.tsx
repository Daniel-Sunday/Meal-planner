"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export interface RecipeTemplateProps {
  title: string;
  description: string;
  prepTime: string; // e.g. "15M"
  cookTime: string; // e.g. "45M"
  servings: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  slug: string;
}

export default function RecipeTemplate({
  title,
  description,
  prepTime,
  cookTime,
  servings,
  cuisine,
  ingredients,
  instructions,
  tips,
  slug,
}: RecipeTemplateProps) {
  const router = useRouter();

  // Convert "15M" to "15 Min" for display
  const formatTime = (time: string) => {
    return time.replace("M", " mins").replace("H", " hrs");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": title,
    "description": description,
    "recipeCuisine": cuisine,
    "prepTime": `PT${prepTime}`,
    "cookTime": `PT${cookTime}`,
    "recipeYield": `${servings} servings`,
    "recipeIngredient": ingredients,
    "recipeInstructions": instructions.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step,
    })),
  };

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6",
        position: "relative",
      }}>
        <Link href="/recipes" style={{
          color: "#9FE1CB",
          fontSize: 12,
          textDecoration: "none",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 8,
        }}>
          ← Back to Recipes
        </Link>
        <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {cuisine} Cuisine
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          {description}
        </p>

        {/* Stats Row */}
        <div style={{
          display: "flex",
          gap: 10,
          marginBottom: 24,
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "12px 14px",
          textAlign: "center",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#8A7968", fontSize: 11 }}>Prep Time</div>
            <div style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 700, marginTop: 2 }}>{formatTime(prepTime)}</div>
          </div>
          <div style={{ flex: 1, borderLeft: "1px solid #E8DDD0" }}>
            <div style={{ color: "#8A7968", fontSize: 11 }}>Cook Time</div>
            <div style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 700, marginTop: 2 }}>{formatTime(cookTime)}</div>
          </div>
          <div style={{ flex: 1, borderLeft: "1px solid #E8DDD0" }}>
            <div style={{ color: "#8A7968", fontSize: 11 }}>Servings</div>
            <div style={{ color: "#C4622D", fontSize: 14, fontWeight: 700, marginTop: 2 }}>{servings}</div>
          </div>
        </div>

        {/* Ingredients */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "16px 18px",
          marginBottom: 24,
        }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Ingredients Checklist
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ingredients.map((ing, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ color: "#2D5016", fontSize: 14 }}>•</span>
                <span style={{ color: "#3D4A30", fontSize: 13, lineHeight: 1.5 }}>{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "16px 18px",
          marginBottom: 24,
        }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Preparation Steps
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {instructions.map((step, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12 }}>
                <span style={{
                  background: "#EAF3DE",
                  color: "#2D5016",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}>
                  {idx + 1}
                </span>
                <p style={{ color: "#3D4A30", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        {tips.length > 0 && (
          <div style={{
            background: "#FFF8F0",
            borderLeft: "4px solid #E8A838",
            borderRadius: "0 16px 16px 0",
            padding: "14px 16px",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>💡</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 14, fontWeight: 700, color: "#1A2E0A" }}>
                Chop Chop Tip
              </span>
            </div>
            {tips.map((tip, idx) => (
              <p key={idx} style={{ color: "#3D4A30", fontSize: 13, lineHeight: 1.5, fontStyle: "italic", margin: 0, marginTop: idx > 0 ? 8 : 0 }}>
                {tip}
              </p>
            ))}
          </div>
        )}

        {/* CTA Planner Box */}
        <div style={{
          background: "#2D5016",
          borderRadius: 16,
          padding: "20px 18px",
          textAlign: "center",
          color: "#F5EFE6",
        }}>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 8 }}>
            Add {title} to your week?
          </h4>
          <p style={{ color: "#9FE1CB", fontSize: 12, lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
            Generate a personalized weekly plan that includes {title} and auto-creates your custom shopping list.
          </p>
          <button
            onClick={() => router.push("/onboarding")}
            style={{
              background: "#C4622D",
              color: "#FFF8F0",
              border: "none",
              borderRadius: 100,
              padding: "10px 24px",
              fontFamily: "'Figtree', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Start Planning →
          </button>
        </div>
      </div>
    </div>
  );
}
