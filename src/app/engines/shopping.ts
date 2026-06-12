import { Plan, DayMeals } from "../utils";
import { NIGERIAN_MEALS } from "../data/meals";

// Extract required ingredients from the 7-day meal plan
export function getRequiredIngredients(plan: Plan): Set<string> {
  const required = new Set<string>();
  
  const mealNames = Object.values(plan).flatMap(dayMeals => 
    Object.values(dayMeals || {})
  );

  mealNames.forEach(mealName => {
    const meal = NIGERIAN_MEALS.find(m => m.name === mealName);
    if (meal) {
      meal.ingredients.forEach(ing => required.add(ing));
    }
  });

  return required;
}

// Scale quantity according to servings count (base servings = 2)
export function scaleQuantity(qty: string, servings: number): string {
  const match = qty.match(/^([\d.]+)\s*(.*)$/);
  if (!match) return qty;
  const num = parseFloat(match[1]) * (servings / 2);
  const unit = match[2];
  const rounded = Number.isInteger(num) ? num : parseFloat(num.toFixed(1));
  return `${rounded} ${unit}`;
}
