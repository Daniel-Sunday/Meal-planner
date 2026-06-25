"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  DAYS, MEAL_TYPES, MEAL_TIMES, MEAL_ICONS,
  loadFavourites, saveFavourites, toggleFavourite, isFavourited,
  pickWithBias, generatePlan, isValidPlan, getCuisineLabel, getCuisineIcon,
  MealItem, Plan, DayMeals
} from "../utils";
import { NIGERIAN_MEALS, FEEDING_PREFS } from "../data/meals";
import { mealMatchesPreference } from "../engines/planning";
import { calculateDailyNutrition, calculateWeeklyNutrition } from "../engines/nutrition";

// ─── TOAST ───────────────────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  visible: boolean;
}

function Toast({ message, visible }: ToastProps) {
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      background: "#1A2E0A", border: "1px solid #E8DDD0", borderRadius: 100,
      padding: "10px 20px", fontSize: 13, color: "#F5EFE6", fontWeight: 500,
      opacity: visible ? 1 : 0, transition: "all 0.25s ease", pointerEvents: "none",
      zIndex: 1000, whiteSpace: "nowrap", boxShadow: "0 4px 24px rgba(0,0,0,0.15)"
    }}>
      {message}
    </div>
  );
}

// ─── NUTRITION CARD ───────────────────────────────────────────────────────────

interface NutritionCardProps {
  summary: ReturnType<typeof calculateDailyNutrition>;
}

function NutritionCard({ summary }: NutritionCardProps) {
  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #E8DDD0",
      borderRadius: 16,
      padding: "14px",
      marginBottom: 16,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: "#1A2E0A", margin: 0 }}>
          🥑 Nutrition Summary
        </h4>
        <span style={{
          background: "#EAF3DE",
          color: "#2D5016",
          fontSize: 11,
          fontWeight: 600,
          borderRadius: 100,
          padding: "2px 8px"
        }}>
          Score: {summary.healthScore}/10
        </span>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 10, textAlign: "center" }}>
        <div style={{ background: "#FBF7F2", borderRadius: 8, padding: "6px 4px" }}>
          <div style={{ color: "#8A7968", fontSize: 10 }}>Cal</div>
          <div style={{ color: "#1A2E0A", fontSize: 12, fontWeight: 600 }}>{summary.calories}</div>
        </div>
        <div style={{ background: "#FBF7F2", borderRadius: 8, padding: "6px 4px" }}>
          <div style={{ color: "#8A7968", fontSize: 10 }}>Prot</div>
          <div style={{ color: "#1A2E0A", fontSize: 12, fontWeight: 600 }}>{summary.protein}g</div>
        </div>
        <div style={{ background: "#FBF7F2", borderRadius: 8, padding: "6px 4px" }}>
          <div style={{ color: "#8A7968", fontSize: 10 }}>Carb</div>
          <div style={{ color: "#1A2E0A", fontSize: 12, fontWeight: 600 }}>{summary.carbs}g</div>
        </div>
        <div style={{ background: "#FBF7F2", borderRadius: 8, padding: "6px 4px" }}>
          <div style={{ color: "#8A7968", fontSize: 10 }}>Fat</div>
          <div style={{ color: "#1A2E0A", fontSize: 12, fontWeight: 600 }}>{summary.fats}g</div>
        </div>
        <div style={{ background: "#FBF7F2", borderRadius: 8, padding: "6px 4px" }}>
          <div style={{ color: "#8A7968", fontSize: 10 }}>Fibre</div>
          <div style={{ color: "#1A2E0A", fontSize: 12, fontWeight: 600 }}>{summary.fibre}g</div>
        </div>
      </div>

      {summary.flags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {summary.flags.map((flag: string) => (
            <span key={flag} style={{
              background: "#EAF3DE",
              border: "1px solid #2D501633",
              color: "#2D5016",
              fontSize: 10,
              fontWeight: 600,
              borderRadius: 100,
              padding: "2px 8px"
            }}>
              {flag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MEAL CARD WITH LONG-PRESS ────────────────────────────────────────────────

interface MealCardProps {
  type: string;
  meal: string;
  favs: MealItem[];
  onToggleFav: (meal: string, type: string) => void;
  onSwapMeal: (type: string) => void;
}

function MealCard({ type, meal, favs, onToggleFav, onSwapMeal }: MealCardProps) {
  const [pressing, setPressing] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [rotation, setRotation] = useState(0); // 0 or 90
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef(0);
  const hasFiredLongPressRef = useRef(false);
  const isTouchRef = useRef(false);
  const saved = isFavourited(favs, meal);
  const mealObj = NIGERIAN_MEALS.find(m => m.name === meal);

  const startPress = useCallback(() => {
    pressStartTimeRef.current = Date.now();
    hasFiredLongPressRef.current = false;
    setPressing(true);

    timerRef.current = setTimeout(() => {
      hasFiredLongPressRef.current = true;
      setPulsing(true);
      onToggleFav(meal, type);
      setTimeout(() => setPulsing(false), 300);
      setPressing(false);
    }, 500);
  }, [meal, type, onToggleFav]);

  const triggerSwap = useCallback(() => {
    if (!onSwapMeal) return;
    setFlipping(true);
    setRotation(90);
    setTimeout(() => {
      onSwapMeal(type);
      setRotation(0);
      setTimeout(() => {
        setFlipping(false);
      }, 75);
    }, 75);
  }, [type, onSwapMeal]);

  const endPress = useCallback(() => {
    const duration = Date.now() - pressStartTimeRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPressing(false);

    if (!hasFiredLongPressRef.current && duration < 500 && duration >= 0) {
      triggerSwap();
    }
  }, [triggerSwap]);

  const cancelPress = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPressing(false);
  }, []);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
    startPress();
  }, [startPress]);

  const handleTouchEnd = useCallback(() => {
    endPress();
  }, [endPress]);

  const handleMouseDown = useCallback(() => {
    if (isTouchRef.current) return;
    startPress();
  }, [startPress]);

  const handleMouseUp = useCallback(() => {
    if (isTouchRef.current) {
      isTouchRef.current = false; // Reset for next tap
      return;
    }
    endPress();
  }, [endPress]);

  const handleMouseLeave = useCallback(() => {
    if (Date.now() - pressStartTimeRef.current < 150) return;
    cancelPress();
  }, [cancelPress]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${saved ? "#C8432A33" : "#E8DDD0"}`,
        borderRadius: 16,
        padding: "14px",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        transform: `scale(${pulsing ? 1.04 : pressing ? 0.98 : 1}) rotateY(${rotation}deg)`,
        transition: flipping 
          ? "transform 75ms ease-in, border-color 0.2s ease" 
          : "transform 150ms ease-out, border-color 0.2s ease",
        position: "relative",
      }}
    >
      {/* Heart badge */}
      {saved && (
        <div style={{
          position: "absolute", top: 10, right: 12,
          fontSize: 13, lineHeight: 1,
          animation: pulsing ? "heartPop 0.3s ease" : "none",
        }}>❤️</div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 16 }}>{MEAL_ICONS[type]}</span>
        <span style={{ color: "#8A7968", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{type}</span>
        <span style={{ marginLeft: "auto", color: "#8A7968", fontSize: 11 }}>{MEAL_TIMES[type]}</span>
      </div>
      <div style={{ color: "#1A2E0A", fontSize: 15, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>{meal}</div>
      <div style={{ color: "#8A7968", fontSize: 12, marginTop: 3 }}>{getCuisineLabel(meal)}</div>

      {mealObj && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {mealObj.suitableForKids && (
            <span style={{ background: "#EAF3DE", color: "#2D5016", fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px" }}>
              👶 Kid-Friendly
            </span>
          )}
          <span style={{
            background: mealObj.budgetLevel === "Low" ? "#EAF3DE" : mealObj.budgetLevel === "Medium" ? "#F5E6DC" : "#FBF7F2",
            color: mealObj.budgetLevel === "Low" ? "#2D5016" : mealObj.budgetLevel === "Medium" ? "#C4622D" : "#8A7968",
            fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px", border: "1px solid #E8DDD0"
          }}>
            {mealObj.budgetLevel === "Low" ? "₦ Low Budget" : mealObj.budgetLevel === "Medium" ? "₦₦ Mid Budget" : "₦₦₦ High Budget"}
          </span>
          {mealObj.region.filter(r => r !== "General").map(r => (
            <span key={r} style={{ background: "#FBF7F2", color: "#8A7968", fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px", border: "1px solid #E8DDD0" }}>
              🇳🇬 {r}
            </span>
          ))}
        </div>
      )}

      {/* Long-press progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "#E8DDD0", borderRadius: "0 0 16px 16px", overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          background: saved ? "#C8432A" : "#C4622D",
          width: pressing ? "100%" : "0%",
          transition: pressing ? "width 0.5s linear" : "width 0s",
          borderRadius: "0 0 16px 16px",
        }} />
      </div>
    </div>
  );
}

// ─── DAILY VIEW ──────────────────────────────────────────────────────────────

interface DailyViewProps {
  plan: Plan;
  setLocalPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  selected: string[];
  servings: number;
  favs: MealItem[];
  onToggleFav: (meal: string, type: string) => void;
  activeDay: number;
  setActiveDay: (idx: number) => void;
  showToast: (msg: string) => void;
  onCustomizeMeal: (type: string) => void;
}

function DailyView({ plan, setLocalPlan, selected, servings, favs, onToggleFav, activeDay, setActiveDay, showToast, onCustomizeMeal }: DailyViewProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  function regenDay() {
    const day = DAYS[activeDay];
    const newPlan = { ...plan };
    newPlan[day] = { breakfast: "—", lunch: "—", dinner: "—" };

    MEAL_TYPES.forEach(type => {
      const typeMeals = NIGERIAN_MEALS.filter(m => m.mealType === type);
      let pool = typeMeals.filter(m => selected.some(prefId => mealMatchesPreference(m, prefId)));
      if (pool.length === 0) {
        pool = typeMeals;
      }
      const poolMealNames = pool.map(m => m.name);

      // Get previous day's meal for consecutive check
      let previousMeal: string | undefined;
      const dayIdx = DAYS.indexOf(day);
      if (dayIdx > 0) {
        const prevDayName = DAYS[dayIdx - 1];
        previousMeal = newPlan[prevDayName]?.[type as keyof DayMeals];
      }

      newPlan[day][type as keyof typeof newPlan[typeof day]] = poolMealNames.length 
        ? pickWithBias(poolMealNames, type, favs, previousMeal) 
        : "—";
    });

    setLocalPlan(newPlan);
  }

  function handleSwapMeal(type: string) {
    onCustomizeMeal(type);
  }

  const day = DAYS[activeDay];
  const meals = plan[day];
  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const handleShare = async () => {
    const title = "Today's meal plan 🍽️";
    const shareText = `☀️ Breakfast: ${meals.breakfast}
🌤️ Lunch: ${meals.lunch}
🌙 Dinner: ${meals.dinner}

Planned with Chop Chop 🇳🇬`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText
        });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast("📋 Copied to clipboard");
      } catch (err) {}
    }
  };

  const dayNutrition = calculateDailyNutrition(meals);

  return (
    <div>
      <div ref={scrollRef} style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none", marginBottom: 20 }}>
        {DAYS.map((d, i) => {
          const isToday = d === todayName;
          const isActive = i === activeDay;
          return (
            <div key={d} onClick={() => setActiveDay(i)} style={{
              flexShrink: 0, padding: "7px 14px", borderRadius: 100,
              background: isActive ? (isToday ? "#E8A838" : "#2D5016") : "#FFFFFF",
              color: isActive ? (isToday ? "#1A2E0A" : "#EAF3DE") : (isToday ? "#E8A838" : "#8A7968"),
              border: isActive ? "none" : (isToday ? "1.5px solid #E8A838" : "1px solid #E8DDD0"),
              fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap"
            }}>{d.slice(0, 3)}</div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>{day}</h3>
        <span style={{ color: "#8A7968", fontSize: 12 }}>{servings} {servings === 1 ? "serving" : "servings"}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {MEAL_TYPES.map(type => (
          <MealCard
            key={type}
            type={type}
            meal={meals[type as keyof typeof meals]}
            favs={favs}
            onToggleFav={onToggleFav}
            onSwapMeal={handleSwapMeal}
          />
        ))}
      </div>

      <NutritionCard summary={dayNutrition} />

      <p style={{ color: "#8A7968", fontSize: 12, textAlign: "center", marginBottom: 12 }}>
        Hold any meal to save it as a favourite ❤️
      </p>

      <button onClick={regenDay} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>
        🔀 Shuffle {day}'s meals
      </button>

      <button onClick={handleShare} style={{ width: "100%", padding: "13px", borderRadius: 100, background: "transparent", border: "1px solid #E8DDD0", color: "#8A7968", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Figtree', sans-serif", fontWeight: 500, marginTop: 12 }}>
        💬 Share today's menu
      </button>
    </div>
  );
}

// ─── WEEKLY VIEW ─────────────────────────────────────────────────────────────

interface WeeklyViewProps {
  plan: Plan;
  setLocalPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  selected: string[];
  favs: MealItem[];
  onSelectDay: (idx: number) => void;
}

function WeeklyView({ plan, setLocalPlan, selected, favs, onSelectDay }: WeeklyViewProps) {
  function regenAll() { setLocalPlan(generatePlan(selected, favs)); }

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayIdx = DAYS.indexOf(todayName);

  const weeklyNutrition = calculateWeeklyNutrition(plan);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>Full week</h3>
        <button onClick={regenAll} style={{ background: "transparent", border: "1px solid #E8DDD0", borderRadius: 100, padding: "7px 14px", color: "#888", fontSize: 12, cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>🔀 Regenerate</button>
      </div>

      <NutritionCard summary={weeklyNutrition} />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DAYS.map((day, idx) => {
          const isToday = day === todayName;
          const isPast = todayIdx !== -1 && idx < todayIdx;

          return (
            <div
              key={day}
              onClick={() => onSelectDay && onSelectDay(idx)}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8DDD0",
                borderLeft: isToday ? "3px solid #E8A838" : "1px solid #E8DDD0",
                borderRadius: 16,
                overflow: "hidden",
                opacity: isPast ? 0.45 : 1,
                cursor: "pointer",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ padding: "10px 14px", borderBottom: "1px solid #E8DDD0", background: "#FBF7F2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#2D5016", fontSize: 13, fontWeight: 700 }}>{day}</span>
                {isToday && (
                  <span style={{
                    background: "#E8A838",
                    color: "#4A2C00",
                    fontSize: 10,
                    fontWeight: 600,
                    borderRadius: 100,
                    padding: "2px 8px"
                  }}>
                    Today
                  </span>
                )}
              </div>
              {MEAL_TYPES.map((type, i) => {
                const meal = plan[day][type as keyof DayMeals];
                const saved = isFavourited(favs, meal);
                const mealObj = NIGERIAN_MEALS.find(m => m.name === meal);
                return (
                  <div key={type} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < 2 ? "1px solid #FBF7F2" : "none" }}>
                    <span style={{ fontSize: 14 }}>{MEAL_ICONS[type]}</span>
                    <span style={{ color: "#8A7968", fontSize: 11, minWidth: 52 }}>{MEAL_TIMES[type]}</span>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ color: "#1A2E0A", fontSize: 13, fontFamily: "'Figtree', sans-serif", fontWeight: 500 }}>{meal}</span>
                      {mealObj && (
                        <div style={{ display: "flex", gap: 4, marginTop: 2, flexWrap: "wrap" }}>
                          {mealObj.suitableForKids && <span style={{ color: "#2D5016", fontSize: 9, fontWeight: 500 }}>👶 Kids</span>}
                          <span style={{ color: "#C4622D", fontSize: 9, fontWeight: 500 }}>
                            {mealObj.budgetLevel === "Low" ? "₦" : mealObj.budgetLevel === "Medium" ? "₦₦" : "₦₦₦"}
                          </span>
                        </div>
                      )}
                    </div>
                    {saved && <span style={{ fontSize: 12 }}>❤️</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── FAVOURITES VIEW ──────────────────────────────────────────────────────────

interface FavouritesViewProps {
  favs: MealItem[];
  onRemove: (meal: string) => void;
}

function FavouritesView({ favs, onRemove }: FavouritesViewProps) {
  const grouped = MEAL_TYPES.reduce<{ [key: string]: MealItem[] }>((acc, type) => {
    acc[type] = favs.filter(f => f.type === type);
    return acc;
  }, {});

  const total = favs.length;

  if (total === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340, textAlign: "center", padding: "0 2rem" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🤍</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>No favourites yet</h3>
        <p style={{ color: "#3D4A30", fontSize: 14, lineHeight: 1.7 }}>
          Go to Today's meals and hold any meal card for half a second to save it here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 20, fontWeight: 700 }}>Your favourites</h3>
        <span style={{ color: "#8A7968", fontSize: 12 }}>{total} saved</span>
      </div>

      <p style={{ color: "#8A7968", fontSize: 12, marginBottom: 20, lineHeight: 1.6 }}>
        These meals have a 60% chance of appearing in your generated plans.
      </p>

      {MEAL_TYPES.map(type => {
        const items = grouped[type] || [];
        if (items.length === 0) return null;
        return (
          <div key={type} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>{MEAL_ICONS[type]}</span>
              <span style={{ color: "#8A7968", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{type}</span>
              <span style={{ background: "#FFFFFF", border: "1px solid #E8DDD0", borderRadius: 100, padding: "1px 8px", color: "#8A7968", fontSize: 11, fontWeight: 600 }}>{items.length}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map((fav, i) => (
                <div key={i} style={{
                  background: "#FFFFFF", border: "1px solid #E8DDD0",
                  borderRadius: 14, padding: "12px 14px",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 18 }}>{getCuisineIcon(fav.cuisine)}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#1A2E0A", fontSize: 14, fontWeight: 500, fontFamily: "'Figtree', sans-serif" }}>{fav.meal}</div>
                    <div style={{ color: "#8A7968", fontSize: 12, marginTop: 2 }}>{fav.cuisine}</div>
                  </div>
                  <button
                    onClick={() => onRemove(fav.meal)}
                    style={{
                      background: "transparent", border: "1px solid #E8DDD0",
                      borderRadius: "50%", width: 28, height: 28,
                      color: "#8A7968", fontSize: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C8432A"; e.currentTarget.style.color = "#C8432A"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8DDD0"; e.currentTarget.style.color = "#8A7968"; }}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MEAL CUSTOMIZER VIEW ───────────────────────────────────────────────────

interface MealCustomizerViewProps {
  day: string;
  type: string;
  currentMeal: string;
  favs: MealItem[];
  selectedPreferences: string[];
  onSelectMeal: (mealName: string) => void;
  onCancel: () => void;
}

function MealCustomizerView({
  day,
  type,
  currentMeal,
  favs,
  selectedPreferences,
  onSelectMeal,
  onCancel,
}: MealCustomizerViewProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "favourites" | "kids" | "low" | "medium" | "high">("all");
  const [customCombo, setCustomCombo] = useState("");

  const typeMeals = NIGERIAN_MEALS.filter((m) => m.mealType === type);

  // Filter logic
  let filtered = typeMeals;

  if (search.trim()) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(term) ||
        m.category.toLowerCase().includes(term) ||
        m.ingredients.some((ing) => ing.toLowerCase().includes(term))
    );
  }

  if (categoryFilter === "favourites") {
    filtered = filtered.filter((m) => isFavourited(favs, m.name));
  } else if (categoryFilter === "kids") {
    filtered = filtered.filter((m) => m.suitableForKids);
  } else if (categoryFilter === "low") {
    filtered = filtered.filter((m) => m.budgetLevel === "Low");
  } else if (categoryFilter === "medium") {
    filtered = filtered.filter((m) => m.budgetLevel === "Medium");
  } else if (categoryFilter === "high") {
    filtered = filtered.filter((m) => m.budgetLevel === "High");
  }

  const handleCustomComboSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCombo.trim()) {
      onSelectMeal(customCombo.trim());
    }
  };

  const filterOptions = [
    { id: "all", label: "All Options" },
    { id: "favourites", label: "❤️ Saved" },
    { id: "kids", label: "👶 Kids" },
    { id: "low", label: "₦ Low" },
    { id: "medium", label: "₦₦ Mid" },
    { id: "high", label: "₦₦₦ High" },
  ];

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Premium Sub-screen Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button 
            onClick={onCancel}
            style={{
              background: "transparent",
              border: "1px solid #E8DDD033",
              borderRadius: "50%",
              width: 36,
              height: 36,
              color: "#F5EFE6",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Figtree', sans-serif"
            }}
          >
            ←
          </button>
          <div>
            <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Customizing {day}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 2 }}>
              Choose {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, padding: "1.5rem 1rem 5rem" }}>
        
        {/* Search Input */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type="text"
            placeholder={`🔍 Search ${type} (e.g. Rice, Beans, Eggs)`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              borderRadius: 100,
              border: "1px solid #E8DDD0",
              background: "#FFFFFF",
              fontFamily: "'Figtree', sans-serif",
              fontSize: 14,
              color: "#1A2E0A",
              outline: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#8A7968",
                fontSize: 14,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none", marginBottom: 16 }}>
          {filterOptions.map((opt) => {
            const isActive = categoryFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setCategoryFilter(opt.id as any)}
                style={{
                  flexShrink: 0,
                  padding: "7px 14px",
                  borderRadius: 100,
                  background: isActive ? "#2D5016" : "#FFFFFF",
                  color: isActive ? "#EAF3DE" : "#8A7968",
                  border: isActive ? "none" : "1px solid #E8DDD0",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "'Figtree', sans-serif"
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Custom Combo Card */}
        <div style={{
          background: "#FBF7F2",
          border: "1px dashed #C4622D",
          borderRadius: 16,
          padding: "14px",
          marginBottom: 20,
        }}>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 700, color: "#1A2E0A", margin: "0 0 6px 0" }}>
            💡 Build a Custom Combo
          </h4>
          <p style={{ color: "#3D4A30", fontSize: 12, margin: "0 0 12px 0", lineHeight: 1.4 }}>
            Moms often pair foods! Enter any custom combination (e.g. "Akara, Bread & Pap").
          </p>
          <form onSubmit={handleCustomComboSubmit} style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="e.g. Yam, Plantain & Egg Sauce"
              value={customCombo}
              onChange={(e) => setCustomCombo(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 100,
                border: "1px solid #E8DDD0",
                background: "#FFFFFF",
                fontFamily: "'Figtree', sans-serif",
                fontSize: 13,
                outline: "none"
              }}
            />
            <button
              type="submit"
              disabled={!customCombo.trim()}
              style={{
                background: customCombo.trim() ? "#C4622D" : "#F5EFE6",
                color: customCombo.trim() ? "#FFF8F0" : "#8A7968",
                border: customCombo.trim() ? "none" : "1px solid #E8DDD0",
                borderRadius: 100,
                padding: "10px 20px",
                fontFamily: "'Figtree', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: customCombo.trim() ? "pointer" : "default"
              }}
            >
              Add
            </button>
          </form>
        </div>

        {/* List Title */}
        <h3 style={{ fontFamily: "'Fraunces', serif", color: "#1A2E0A", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
          Select from {type} options
        </h3>

        {/* Options Grid/List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#8A7968", fontSize: 14 }}>
              No matches found. Try searching something else or write a custom combo above!
            </div>
          ) : (
            filtered.map((meal) => {
              const isCurrent = meal.name === currentMeal;
              const matchesProfile = selectedPreferences.some(prefId => mealMatchesPreference(meal, prefId));
              const saved = isFavourited(favs, meal.name);

              return (
                <div
                  key={meal.id}
                  onClick={() => onSelectMeal(meal.name)}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${isCurrent ? "#2D5016" : "#E8DDD0"}`,
                    borderRadius: 16,
                    padding: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isCurrent ? "#2D5016" : "#D9C9B4";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isCurrent ? "#2D5016" : "#E8DDD0";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 16 }}>{getCuisineIcon(meal.category)}</span>
                      <span style={{ color: "#8A7968", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {meal.category}
                      </span>
                    </div>
                    {isCurrent && (
                      <span style={{
                        background: "#EAF3DE",
                        color: "#2D5016",
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 100,
                        padding: "2px 8px"
                      }}>
                        ✓ Active
                      </span>
                    )}
                  </div>

                  <div style={{ color: "#1A2E0A", fontSize: 15, fontWeight: 600, fontFamily: "'Figtree', sans-serif" }}>
                    {meal.name}
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {matchesProfile && (
                      <span style={{ background: "#EAF3DE", color: "#2D5016", fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px" }}>
                        ✨ Matches Profile
                      </span>
                    )}
                    {saved && (
                      <span style={{ background: "#FBF7F2", border: "1px solid #C8432A33", color: "#C8432A", fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px" }}>
                        ❤️ Saved
                      </span>
                    )}
                    {meal.suitableForKids && (
                      <span style={{ background: "#FBF7F2", color: "#8A7968", fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px", border: "1px solid #E8DDD0" }}>
                        👶 Kids
                      </span>
                    )}
                    <span style={{
                      background: meal.budgetLevel === "Low" ? "#EAF3DE" : meal.budgetLevel === "Medium" ? "#F5E6DC" : "#FBF7F2",
                      color: meal.budgetLevel === "Low" ? "#2D5016" : meal.budgetLevel === "Medium" ? "#C4622D" : "#8A7968",
                      fontSize: 10, fontWeight: 600, borderRadius: 100, padding: "2px 6px", border: "1px solid #E8DDD0"
                    }}>
                      {meal.budgetLevel === "Low" ? "₦ Low" : meal.budgetLevel === "Medium" ? "₦₦ Mid" : "₦₦₦ High"}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PLANNER CLIENT ──────────────────────────────────────────────────────

export default function PlannerClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("daily");
  const [activeDay, setActiveDay] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [servings, setServings] = useState(2);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [favs, setFavs] = useState<MealItem[]>([]);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef<NodeJS.Timeout | null>(null);
  const [activeCustomizeSlot, setActiveCustomizeSlot] = useState<{ day: string; type: string } | null>(null);

  // Initialize client state
  useEffect(() => {
    setMounted(true);
    try {
      const selRaw = localStorage.getItem("mealplanner_selected");
      const planRaw = localStorage.getItem("mealplanner_plan");
      const srvRaw = localStorage.getItem("mealplanner_servings");
      
      if (selRaw && planRaw) {
        const parsedSel = JSON.parse(selRaw);
        const parsedPlan = JSON.parse(planRaw);
        
        if (Array.isArray(parsedSel) && parsedSel.length > 0 && isValidPlan(parsedPlan)) {
          setSelected(parsedSel);
          setPlan(parsedPlan);
          setServings(srvRaw ? parseInt(srvRaw, 10) : 2);
          
          const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
          const idx = DAYS.indexOf(todayName);
          setActiveDay(idx !== -1 ? idx : 0);
        } else {
          router.replace("/onboarding");
        }
      } else {
        router.replace("/onboarding");
      }
      setFavs(loadFavourites());
    } catch (e) {
      router.replace("/onboarding");
    }
  }, [router]);

  // Persist plan when it changes locally
  useEffect(() => {
    if (plan) {
      try {
        localStorage.setItem("mealplanner_plan", JSON.stringify(plan));
      } catch (e) {}
    }
  }, [plan]);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message: msg });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2000);
  }

  function handleToggleFav(meal: string, type: string) {
    setFavs(prev => {
      const next = toggleFavourite(prev, meal, type);
      saveFavourites(next);
      const wasAdded = next.length > prev.length;
      showToast(wasAdded ? "❤️ Added to favourites" : "Removed from favourites");
      return next;
    });
  }

  function handleRemoveFav(meal: string) {
    setFavs(prev => {
      const next = prev.filter(f => f.meal !== meal);
      saveFavourites(next);
      showToast("Removed from favourites");
      return next;
    });
  }

  const favCount = favs.length;

  const PLANNER_TABS = [
    { id: "daily",      label: "Today",    icon: "☀️" },
    { id: "weekly",     label: "Week",     icon: "📅" },
    { id: "favourites", label: "Saved",    icon: "❤️", badge: favCount > 0 ? favCount : null },
  ];

  function handleSelectMeal(mealName: string) {
    if (activeCustomizeSlot && plan) {
      const { day, type } = activeCustomizeSlot;
      const newPlan = { ...plan };
      newPlan[day] = {
        ...newPlan[day],
        [type]: mealName
      };
      setPlan(newPlan);
      setActiveCustomizeSlot(null);
      showToast("🍽️ Meal updated!");
    }
  }

  if (!mounted || !plan) {
    return (
      <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }} />
    );
  }

  if (activeCustomizeSlot) {
    const currentMeal = plan[activeCustomizeSlot.day][activeCustomizeSlot.type as keyof DayMeals];
    return (
      <MealCustomizerView
        day={activeCustomizeSlot.day}
        type={activeCustomizeSlot.type}
        currentMeal={currentMeal}
        favs={favs}
        selectedPreferences={selected}
        onSelectMeal={handleSelectMeal}
        onCancel={() => setActiveCustomizeSlot(null)}
      />
    );
  }

  return (
    <div style={{ background: "#F5EFE6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Keyframes */}
      <style>{`
        @keyframes heartPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#2D5016",
        padding: "1.25rem 1rem 1.25rem",
        color: "#F5EFE6"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#9FE1CB", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {tab === "daily" ? "Today's Plan" : tab === "weekly" ? "Weekly Plan" : "Saved Meals"}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#F5EFE6", margin: 0, marginTop: 4 }}>
              {tab === "daily" ? DAYS[activeDay] : tab === "weekly" ? "Full Week" : "Favourites"}
            </h2>
            <div style={{ color: "#9FE1CB", fontSize: 11, marginTop: 4, fontWeight: 500 }}>
              {selected.map(id => FEEDING_PREFS.find(p => p.id === id)?.icon).join(" ")}
              {" · "}{servings} {servings === 1 ? "serving" : "servings"}
            </div>
          </div>
          <button onClick={() => router.push("/onboarding")} style={{
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
            ✏️ Edit
          </button>
        </div>
      </div>

      {/* Tab bar (sub-tabs within planner route) */}
      <div style={{ display: "flex", gap: 6, padding: "8px 1rem 10px", background: "#F5EFE6", borderBottom: "1px solid #E8DDD0" }}>
        {PLANNER_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 12,
            background: tab === t.id ? "#2D5016" : "#FFFFFF",
            border: tab === t.id ? "none" : "1px solid #E8DDD0",
            color: tab === t.id ? "#EAF3DE" : "#8A7968",
            fontSize: 11, fontWeight: 700, cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            position: "relative",
            fontFamily: "'Figtree', sans-serif"
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
            {t.badge && (
              <span style={{
                position: "absolute", top: 4, right: 6,
                background: "#C8432A", color: "#fff",
                fontSize: 9, fontWeight: 700,
                borderRadius: 100, minWidth: 16, height: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 4px"
              }}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1rem 5rem" }}>
        {tab === "daily"      && (
          <DailyView
            plan={plan}
            setLocalPlan={setPlan}
            selected={selected}
            servings={servings}
            favs={favs}
            onToggleFav={handleToggleFav}
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            showToast={showToast}
            onCustomizeMeal={(type) => setActiveCustomizeSlot({ day: DAYS[activeDay], type })}
          />
        )}
        {tab === "weekly"     && (
          <WeeklyView
            plan={plan}
            setLocalPlan={setPlan}
            selected={selected}
            favs={favs}
            onSelectDay={(dayIdx) => {
              setActiveDay(dayIdx);
              setTab("daily");
            }}
          />
        )}
        {tab === "favourites" && (
          <FavouritesView
            favs={favs}
            onRemove={handleRemoveFav}
          />
        )}
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
