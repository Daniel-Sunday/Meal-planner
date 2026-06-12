import { Meal, NIGERIAN_MEALS, FEEDING_PREFS } from "../data/meals";
import { MealItem, Plan, DayMeals, DAYS, MEAL_TYPES } from "../utils";

// Helper to determine if a meal matches a preference category
export function mealMatchesPreference(meal: Meal, prefId: string): boolean {
  switch (prefId) {
    case "rice":
      return meal.category === "Rice Dishes";
    case "swallow":
      return meal.category === "Swallows & Soups";
    case "beans_porridge":
      return meal.category === "Beans & Porridges";
    case "breakfast_snacks":
      return meal.category === "Breakfast & Snacks";
    case "light_meals":
      return meal.category === "Light & Spicy";
    case "yoruba":
      return meal.region.includes("Yoruba");
    case "igbo":
      return meal.region.includes("Igbo");
    case "hausa":
      return meal.region.includes("Hausa");
    default:
      return false;
  }
}

// 60% chance to pick a favourite, 40% random, and avoid consecutive duplicates
export function pickWithBias(
  pool: string[],
  type: string,
  favs: MealItem[] = [],
  previousMeal?: string
): string {
  if (pool.length === 0) return "—";

  // Prevent consecutive duplicates if there are alternative choices
  let adjustedPool = pool;
  if (previousMeal && pool.length > 1) {
    adjustedPool = pool.filter(m => m !== previousMeal);
  }

  const typeFavs = favs.filter(f => f.type === type && adjustedPool.includes(f.meal));
  if (typeFavs.length > 0 && Math.random() < 0.6) {
    const chosenFav = typeFavs[Math.floor(Math.random() * typeFavs.length)].meal;
    return chosenFav;
  }

  return adjustedPool[Math.floor(Math.random() * adjustedPool.length)];
}

// Generate a full 7-day plan from selected preference IDs
export function generatePlan(selectedPrefs: string[], favs: MealItem[] = []): Plan {
  const plan: Plan = {};

  DAYS.forEach((day, dayIdx) => {
    plan[day] = { breakfast: "—", lunch: "—", dinner: "—" };

    MEAL_TYPES.forEach(type => {
      const typeMeals = NIGERIAN_MEALS.filter(m => m.mealType === type);
      let pool = typeMeals.filter(m => selectedPrefs.some(prefId => mealMatchesPreference(m, prefId)));

      if (pool.length === 0) {
        pool = typeMeals;
      }

      const poolMealNames = pool.map(m => m.name);

      // Get previous day's meal for consecutive check
      let previousMeal: string | undefined;
      if (dayIdx > 0) {
        const prevDayName = DAYS[dayIdx - 1];
        previousMeal = plan[prevDayName]?.[type as keyof DayMeals];
      }

      plan[day][type as keyof DayMeals] = pickWithBias(poolMealNames, type, favs, previousMeal);
    });
  });

  return plan;
}

// Validation helper
export function isValidPlan(plan: any): plan is Plan {
  if (!plan || typeof plan !== "object") return false;
  for (const day of DAYS) {
    if (!plan[day] || typeof plan[day] !== "object") return false;
    for (const type of MEAL_TYPES) {
      if (!plan[day][type] || plan[day][type] === "—" || plan[day][type].trim() === "") {
        return false;
      }
    }
  }
  return true;
}
