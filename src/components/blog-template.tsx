"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export interface BlogSection {
  heading?: string;
  paragraph?: string;
  bullets?: string[];
}

export interface BlogTemplateProps {
  title: string;
  description: string;
  author: string;
  publishDate: string; // e.g. "June 12, 2026"
  readTime: string; // e.g. "5 min read"
  sections: BlogSection[];
  slug: string;
}

export default function BlogTemplate({
  title,
  description,
  author,
  publishDate,
  readTime,
  sections,
  slug,
}: BlogTemplateProps) {
  const router = useRouter();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": publishDate,
    "author": {
      "@type": "Person",
      "name": author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chop Chop Meal Planner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chopchop-mealplanner.vercel.app/favicon.svg",
      },
    },
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
        <Link href="/blog" style={{
          color: "#9FE1CB",
          fontSize: 12,
          textDecoration: "none",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 8,
        }}>
          ← Back to Blog
        </Link>
        <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Feeding Insights
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
          {title}
        </h2>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        {/* Meta Info */}
        <div style={{
          display: "flex",
          gap: 12,
          fontSize: 12,
          color: "#8A7968",
          marginBottom: 20,
          fontFamily: "'Figtree', sans-serif",
        }}>
          <span>By <strong>{author}</strong></span>
          <span>•</span>
          <span>{publishDate}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        <p style={{ color: "#1A2E0A", fontSize: 15, fontWeight: 500, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>
          {description}
        </p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 36 }}>
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.heading && (
                <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
                  {section.heading}
                </h3>
              )}
              {section.paragraph && (
                <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7, margin: 0, marginBottom: section.bullets ? 10 : 0 }}>
                  {section.paragraph}
                </p>
              )}
              {section.bullets && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 6 }}>
                  {section.bullets.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span style={{ color: "#C4622D", fontSize: 14 }}>•</span>
                      <span style={{ color: "#3D4A30", fontSize: 13, lineHeight: 1.5 }}>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Planner Box */}
        <div style={{
          background: "#2D5016",
          borderRadius: 16,
          padding: "20px 18px",
          textAlign: "center",
          color: "#F5EFE6",
        }}>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 8 }}>
            Dread the "what will I cook" stress?
          </h4>
          <p style={{ color: "#9FE1CB", fontSize: 12, lineHeight: 1.5, margin: 0, marginBottom: 16 }}>
            Generate your personalized weekly meal planner in 2 minutes. Auto-build your shopping lists and favorites.
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
            Create Meal Timetable →
          </button>
        </div>
      </div>
    </div>
  );
}
