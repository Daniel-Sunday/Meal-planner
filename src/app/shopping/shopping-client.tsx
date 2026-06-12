"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "../utils";
import { SHOPPING } from "../data/meals";
import { getRequiredIngredients, scaleQuantity } from "../engines/shopping";

export default function ShoppingClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [servings, setServings] = useState(2);
  const [plan, setPlan] = useState<Plan | null>(null);

  // Initialize state from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      const planRaw = localStorage.getItem("mealplanner_plan");
      const srvRaw = localStorage.getItem("mealplanner_servings");
      
      if (selRaw && planRaw) {
        setPlan(JSON.parse(planRaw));
        setServings(srvRaw ? parseInt(srvRaw, 10) : 2);
      } else {
        router.replace("/onboarding");
      }
    } catch (e) {
      router.replace("/onboarding");
    }
  }, [router]);

  const requiredIngredients = plan ? getRequiredIngredients(plan) : new Set<string>();

  // Count totals based on what is actually shown to the user
  let totalDisplayedItems = 0;
  let doneDisplayedItems = 0;

  SHOPPING.forEach((cat, ci) => {
    const hasMatchedItems = cat.items.some(item => requiredIngredients.has(item.name));
    if (!hasMatchedItems && !showAll) return;

    cat.items.forEach((item, ii) => {
      const isMatched = requiredIngredients.has(item.name);
      if (!isMatched && !showAll) return;

      totalDisplayedItems++;
      if (checked.has(`${ci}-${ii}`)) {
        doneDisplayedItems++;
      }
    });
  });

  const pct = totalDisplayedItems > 0 ? Math.round((doneDisplayedItems / totalDisplayedItems) * 100) : 0;

  function toggleItem(id: string) {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleCat(ci: number) {
    setCollapsed(prev => {
      const next = new Set(prev);
      next.has(ci) ? next.delete(ci) : next.add(ci);
      return next;
    });
  }

  if (!mounted || !plan) {
    return (
      <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }} />
    );
  }

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Shopping List
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
              Ingredients
            </h2>
            <div style={{ color: "#9FE1CB", fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              Based on your plan · {servings} {servings === 1 ? "serving" : "servings"}
            </div>
          </div>
          <button onClick={() => router.push("/planner")} style={{
            background: "transparent",
            border: "1px solid #E8DDD0",
            borderRadius: 100,
            color: "#F5EFE6",
            padding: "8px 16px",
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            cursor: "pointer"
          }}>
            📅 Planner
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "1.25rem 1rem 5rem" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Total items</div>
            <div style={{ color: "#1A2E0A", fontSize: 22, fontWeight: 700 }}>{totalDisplayedItems}</div>
          </div>
          <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Collected</div>
            <div style={{ color: doneDisplayedItems === totalDisplayedItems && totalDisplayedItems > 0 ? "#2D5016" : "#1A2E0A", fontSize: 22, fontWeight: 700 }}>{doneDisplayedItems}/{totalDisplayedItems}</div>
          </div>
          <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ color: "#8A7968", fontSize: 12, marginBottom: 4 }}>Servings</div>
            <div style={{ color: "#C4622D", fontSize: 22, fontWeight: 700 }}>{servings}</div>
          </div>
        </div>

        <div style={{ background: "#E8DDD0", borderRadius: 100, height: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#2D5016", borderRadius: 100, transition: "width 0.3s" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {SHOPPING.map((cat, ci) => {
            const isOpen = !collapsed.has(ci);
            
            // Determine if this category contains any matched items
            const hasMatchedItems = cat.items.some(item => requiredIngredients.has(item.name));
            if (!hasMatchedItems && !showAll) return null;

            // Count items in category that are matched/shown
            const catItems = cat.items.filter(item => requiredIngredients.has(item.name) || showAll);
            const checkedCatItemsCount = cat.items.filter((_, ii) => checked.has(`${ci}-${ii}`) && (requiredIngredients.has(cat.items[ii].name) || showAll)).length;

            return (
              <div key={ci} style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 16, overflow: "hidden" }}>
                <div onClick={() => toggleCat(ci)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }}>
                  <span style={{ fontSize: 18 }}>{cat.icon}</span>
                  <span style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 600, flex: 1 }}>{cat.cat}</span>
                  <span style={{ background: "#F5EFE6", borderRadius: 100, padding: "2px 8px", color: "#8A7968", fontSize: 11, fontWeight: 600 }}>
                    {checkedCatItemsCount}/{catItems.length}
                  </span>
                  <span style={{ color: "#8A7968", fontSize: 18, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>⌄</span>
                </div>
                {isOpen && (
                  <div style={{ borderTop: "1px solid #E8DDD0" }}>
                    {cat.items.map((item, ii) => {
                      const id = `${ci}-${ii}`;
                      const isDone = checked.has(id);
                      const isMatched = requiredIngredients.has(item.name);

                      if (!isMatched && !showAll) return null;

                      return (
                        <div key={ii} onClick={() => toggleItem(id)} style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                          borderBottom: ii < cat.items.length - 1 ? "1px solid #F5EFE6" : "none",
                          cursor: "pointer",
                          opacity: !isMatched ? 0.4 : (isDone ? 0.4 : 1),
                          transition: "opacity 0.2s"
                        }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: "50%",
                            border: isDone ? "none" : "1.5px solid #D9C9B4",
                            background: isDone ? "#2D5016" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                          }}>
                            {isDone && <span style={{ fontSize: 12, color: "#F5EFE6" }}>✓</span>}
                          </div>
                          <span style={{ flex: 1, color: "#1A2E0A", fontSize: 13, textDecoration: isDone ? "line-through" : "none" }}>{item.name}</span>
                          {!isMatched && (
                            <span style={{ color: "#8A7968", fontSize: 11, fontStyle: "italic", marginRight: 8 }}>
                              Not in this week's plan
                            </span>
                          )}
                          <span style={{ color: "#8A7968", fontSize: 12 }}>{scaleQuantity(item.qty, servings)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FFFFFF",
          border: "1px solid #E8DDD0",
          borderRadius: 16,
          padding: "12px 14px",
          marginTop: 12,
          marginBottom: 12,
          cursor: "pointer",
          userSelect: "none"
        }} onClick={() => setShowAll(!showAll)}>
          <span style={{ color: "#1A2E0A", fontSize: 13, fontWeight: 500, fontFamily: "'Figtree', sans-serif" }}>
            👁️ Show all items
          </span>
          <div style={{
            width: 40,
            height: 22,
            borderRadius: 100,
            background: showAll ? "#2D5016" : "#E8DDD0",
            position: "relative",
            transition: "background 0.2s"
          }}>
            <div style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#FFFFFF",
              position: "absolute",
              top: 2,
              left: showAll ? 20 : 2,
              transition: "left 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }} />
          </div>
        </div>

        <button onClick={() => setChecked(new Set())} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>
          ↺ Reset list
        </button>
      </div>
    </div>
  );
}
