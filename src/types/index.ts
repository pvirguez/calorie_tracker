export interface Meal {
  id: string;
  date: string; // YYYY-MM-DD format
  timestamp: number; // Unix timestamp
  imageUrl: string; // Firebase Storage URL
  userNotes?: string; // Optional text clarification
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  analyzing?: boolean; // UI state for loading
}

export interface Settings {
  targetCalories: number; // Default: 1800
  dailyBurn: number; // Default: 2200 (basal metabolic rate)
  proteinTarget: number; // grams, default: 135
  carbsTarget: number; // grams, default: 180
  fatTarget: number; // grams, default: 60
}

export interface DailyExercise {
  date: string; // YYYY-MM-DD (document ID)
  calories: number;
}

export interface DailySummary {
  date: string;
  targetCalories: number;
  consumedCalories: number;
  caloriesLeft: number;
  dailyBurn: number;
  exercise: number;
  netDeficit: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
}

export interface GPT4VisionResponse {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: string; // Optional: "high", "medium", "low"
  reasoning?: string; // Optional: Explanation from GPT-4
}

export interface AnalyzeMealRequest {
  imageBase64: string;
  userNotes?: string;
}
