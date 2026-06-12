"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DAYS, generatePlan, loadFavourites } from "../utils";
import { FEEDING_PREFS } from "../data/meals";

export default function OnboardingClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [servings, setServings] = useState(2);

  useEffect(() => {
    setMounted(true);
    // Load previously selected preferences or servings if any exist
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      const srvRaw = localStorage.getItem("mealplanner_servings");
      if (selRaw) {
        const parsed = JSON.parse(selRaw);
        if (Array.isArray(parsed)) {
          setSelected(new Set(parsed));
        }
      }
      if (srvRaw) {
        setServings(parseInt(srvRaw, 10) || 2);
      }
    } catch (e) {}
  }, []);

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleGenerate() {
    if (selected.size === 0) return;
    const prefList = Array.from(selected);
    const favs = loadFavourites();
    const newPlan = generatePlan(prefList, favs);

    try {
      localStorage.setItem("mealplanner_selected", JSON.stringify(prefList));
      localStorage.setItem("mealplanner_servings", servings.toString());
      localStorage.setItem("mealplanner_plan", JSON.stringify(newPlan));
    } catch (e) {}

    router.push("/planner");
  }

  if (!mounted) {
    return (
      <div style={{ background: "#F5EFE6", minHeight: "100vh", padding: "1.5rem 1rem" }} />
    );
  }

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", padding: "1.5rem 1rem 6rem" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#8A7968", fontSize: 12, marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Step 1 of 1</p>
        <h2 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 26, fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>What does your family love to eat?</h2>
        <p style={{ color: "#3D4A30", fontSize: 14 }}>Pick one or more categories to plan your weekly timetable.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {FEEDING_PREFS.map(c => {
          const isOn = selected.has(c.id);
          return (
            <div key={c.id} onClick={() => toggle(c.id)} style={{
              background: isOn ? "#EAF3DE" : "#FFFFFF",
              border: isOn ? "1.5px solid #2D5016" : "1px solid #E8DDD0",
              borderRadius: 16, padding: "14px 12px", cursor: "pointer", transition: "all 0.15s"
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: "#1A2E0A", fontWeight: 600, fontSize: 14 }}>{c.label}</div>
              <div style={{ color: "#8A7968", fontSize: 11, marginTop: 3 }}>{c.sub}</div>
              {isOn && <div style={{ marginTop: 8, fontSize: 11, color: "#2D5016", fontWeight: 600 }}>✓ Selected</div>}
            </div>
          );
        })}
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 16, padding: "16px 14px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 500 }}>Servings per meal</span>
          <span style={{ color: "#C4622D", fontWeight: 700, fontSize: 16 }}>{servings} {servings === 1 ? "person" : "people"}</span>
        </div>
        <input type="range" min={1} max={8} value={servings} onChange={e => setServings(+e.target.value)} style={{ width: "100%", accentColor: "#C4622D" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ color: "#8A7968", fontSize: 11 }}>1</span>
          <span style={{ color: "#8A7968", fontSize: 11 }}>8</span>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        style={{
          width: "100%", padding: "15px", borderRadius: 100,
          background: selected.size > 0 ? "#C4622D" : "#F5EFE6",
          color: selected.size > 0 ? "#FFF8F0" : "#8A7968",
          border: selected.size > 0 ? "none" : "1px solid #E8DDD0",
          fontSize: 15, fontWeight: 600, cursor: selected.size > 0 ? "pointer" : "default",
          transition: "all 0.2s",
          fontFamily: "'Figtree', sans-serif"
        }}>
        {selected.size === 0 ? "Pick at least one category" : `Generate my ${DAYS.length}-day plan →`}
      </button>
    </div>
  );
}
