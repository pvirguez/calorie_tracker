import type { Meal, Settings, DailySummary } from '../types';

export function calculateDailySummary(
  date: string,
  meals: Meal[],
  settings: Settings,
  exercise: number
): DailySummary {
  const consumedCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const caloriesLeft = settings.targetCalories - consumedCalories;
  const netDeficit = (settings.dailyBurn + exercise) - consumedCalories;

  return {
    date,
    targetCalories: settings.targetCalories,
    consumedCalories,
    caloriesLeft,
    dailyBurn: settings.dailyBurn,
    exercise,
    netDeficit,
    totalProtein,
    totalCarbs,
    totalFat,
    meals
  };
}

export function calculateMacroProgress(consumed: number, target: number): number {
  if (target === 0) return 0;
  return Math.round((consumed / target) * 100);
}

export function getMacroProgressColor(percentage: number): string {
  if (percentage >= 90 && percentage <= 110) return 'green';
  if (percentage >= 80 && percentage <= 120) return 'yellow';
  return 'red';
}
