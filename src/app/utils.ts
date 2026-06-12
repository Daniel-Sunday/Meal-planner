import { Meal, NIGERIAN_MEALS, FEEDING_PREFS } from "./data/meals";
import { generatePlan, isValidPlan, pickWithBias } from "./engines/planning";

export interface MealItem {
  meal: string;
  type: string;
  cuisine: string; // Mapped to the Nigerian meal's category label
}

export interface DayMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Plan {
  [day: string]: DayMeals;
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MEAL_TYPES = ["breakfast", "lunch", "dinner"];
export const MEAL_TIMES: { [key: string]: string } = {
  breakfast: "7:00 AM",
  lunch: "1:00 PM",
  dinner: "7:00 PM",
};
export const MEAL_ICONS: { [key: string]: string } = {
  breakfast: "☀️",
  lunch: "🌤️",
  dinner: "🌙",
};

// ─── FAVOURITES STORAGE ───────────────────────────────────────────────────────

const FAV_KEY = "mealplanner_favourites";

export function loadFavourites(): MealItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavourites(favs: MealItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  } catch {}
}

export function isFavourited(favs: MealItem[], meal: string): boolean {
  return favs.some(f => f.meal === meal);
}

export function toggleFavourite(favs: MealItem[], meal: string, type: string): MealItem[] {
  const cuisine = getCuisineLabel(meal);
  if (isFavourited(favs, meal)) {
    return favs.filter(f => f.meal !== meal);
  }
  return [...favs, { meal, type, cuisine }];
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function getCuisineLabel(mealName: string): string {
  const meal = NIGERIAN_MEALS.find(m => m.name === mealName);
  return meal ? meal.category : "";
}

export function getCuisineIcon(categoryLabel: string): string {
  const pref = FEEDING_PREFS.find(p => p.label === categoryLabel);
  return pref ? pref.icon : "🍽️";
}

// Re-exports
export { generatePlan, isValidPlan, pickWithBias };
