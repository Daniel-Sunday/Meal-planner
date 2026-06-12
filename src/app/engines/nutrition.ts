import { Meal, NIGERIAN_MEALS } from "../data/meals";
import { DayMeals, Plan, DAYS, MEAL_TYPES } from "../utils";

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fibre: number;
  healthScore: number;
  flags: string[];
}

// Compute macros and score for a single day (breakfast + lunch + dinner)
export function calculateDailyNutrition(dayMeals: DayMeals): NutritionSummary {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;
  let fibre = 0;
  let totalHealthScore = 0;
  let count = 0;

  MEAL_TYPES.forEach(type => {
    const mealName = dayMeals[type as keyof DayMeals];
    const meal = NIGERIAN_MEALS.find(m => m.name === mealName);
    if (meal) {
      calories += meal.calories;
      protein += meal.protein;
      carbs += meal.carbs;
      fats += meal.fats;
      fibre += meal.fibre;
      totalHealthScore += meal.healthScore;
      count++;
    }
  });

  const healthScore = count > 0 ? Math.round((totalHealthScore / count) * 10) / 10 : 0;

  const flags: string[] = [];
  if (protein >= 65) {
    flags.push("💪 High Protein");
  }
  if (fibre >= 15) {
    flags.push("🌾 Rich in Fiber");
  }
  if (healthScore >= 7.5) {
    flags.push("🥗 Super Healthy");
  } else if (healthScore >= 6.5) {
    flags.push("🏡 Balanced Meals");
  }

  return { calories, protein, carbs, fats, fibre, healthScore, flags };
}

// Compute average daily macros and overall score for the week
export function calculateWeeklyNutrition(plan: Plan): NutritionSummary {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFibre = 0;
  let totalHealthScore = 0;
  let totalCount = 0;

  DAYS.forEach(day => {
    const dayMeals = plan[day];
    if (dayMeals) {
      MEAL_TYPES.forEach(type => {
        const mealName = dayMeals[type as keyof DayMeals];
        const meal = NIGERIAN_MEALS.find(m => m.name === mealName);
        if (meal) {
          totalCalories += meal.calories;
          totalProtein += meal.protein;
          totalCarbs += meal.carbs;
          totalFats += meal.fats;
          totalFibre += meal.fibre;
          totalHealthScore += meal.healthScore;
          totalCount++;
        }
      });
    }
  });

  const daysCount = DAYS.length;
  const avgCalories = Math.round(totalCalories / daysCount);
  const avgProtein = Math.round(totalProtein / daysCount);
  const avgCarbs = Math.round(totalCarbs / daysCount);
  const avgFats = Math.round(totalFats / daysCount);
  const avgFibre = Math.round(totalFibre / daysCount);
  const healthScore = totalCount > 0 ? Math.round((totalHealthScore / totalCount) * 10) / 10 : 0;

  const flags: string[] = [];
  if (avgProtein >= 65) {
    flags.push("💪 High Protein");
  }
  if (avgFibre >= 15) {
    flags.push("🌾 Rich in Fiber");
  }
  if (healthScore >= 7.5) {
    flags.push("🥗 Super Healthy Week");
  } else if (healthScore >= 6.5) {
    flags.push("🏡 Highly Balanced Week");
  }

  return {
    calories: avgCalories,
    protein: avgProtein,
    carbs: avgCarbs,
    fats: avgFats,
    fibre: avgFibre,
    healthScore,
    flags
  };
}
