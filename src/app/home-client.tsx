"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isValidPlan } from "./utils";

export default function HomeClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      const planRaw = localStorage.getItem("mealplanner_plan");
      if (selRaw && planRaw) {
        const sel = JSON.parse(selRaw);
        const plan = JSON.parse(planRaw);
        if (Array.isArray(sel) && sel.length > 0 && isValidPlan(plan)) {
          router.replace("/planner");
          return;
        }
      }
    } catch (e) {}
    setLoading(false);
  }, [router]);

  if (!mounted || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5EFE6" }} />
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", background: "#F5EFE6" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🍽️</div>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: "#1A2E0A", fontWeight: 700, lineHeight: 1.2, marginBottom: 12 }}>
        Your Personal<br />Meal Planner
      </h1>
      <p style={{ color: "#3D4A30", fontSize: 15, lineHeight: 1.7, maxWidth: 280, marginBottom: 40 }}>
        Tell us what you love to eat and we'll plan every meal for the whole week — breakfast, lunch & dinner.
      </p>
      <button onClick={() => router.push("/onboarding")} style={{ background: "#C4622D", color: "#FFF8F0", border: "none", borderRadius: 100, padding: "14px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", fontFamily: "'Figtree', sans-serif" }}>
        Get Started →
      </button>
      <p style={{ color: "#8A7968", fontSize: 12, marginTop: 20 }}>No account needed · Free to use</p>
    </div>
  );
}
