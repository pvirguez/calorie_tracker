import React, { useState } from 'react';
import { DailySummary } from './components/DailySummary';
import { MacroProgress } from './components/MacroProgress';
import { MealList } from './components/MealList';
import { ImageUpload } from './components/ImageUpload';
import { ExerciseInput } from './components/ExerciseInput';
import { SettingsPanel } from './components/SettingsPanel';
import { DatePicker } from './components/DatePicker';
import { useMeals } from './hooks/useMeals';
import { useSettings } from './hooks/useSettings';
import { useExercise } from './hooks/useExercise';
import { analyzeMealImage } from './services/api';
import { addMeal, deleteMeal, updateMeal } from './services/firestore';
import { uploadMealImage } from './services/storage';
import { calculateDailySummary } from './utils/calculations';
import { getTodayString } from './utils/dateUtils';

function App() {
  const [currentDate, setCurrentDate] = useState(getTodayString());
  const [showSettings, setShowSettings] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  const { meals, loading: mealsLoading } = useMeals(currentDate);
  const { settings, loading: settingsLoading, update: updateSettings } = useSettings();
  const { exercise, loading: exerciseLoading, update: updateExercise } = useExercise(currentDate);

  const handleImageSelected = async (imageBase64: string) => {
    setAnalyzing(true);

    try {
      // Call GPT-4 Vision via Cloud Function
      const result = await analyzeMealImage(imageBase64, userNotes);

      // Create meal record with temporary placeholder
      const mealId = await addMeal({
        date: currentDate,
        timestamp: Date.now(),
        imageUrl: '', // Will be updated after upload
        userNotes: userNotes || undefined,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat
      });

      // Upload image to Firebase Storage in parallel
      const imageUrl = await uploadMealImage(imageBase64, mealId);

      // Update meal with image URL
      await updateMeal(mealId, { imageUrl });

      // Reset form
      setUserNotes('');
    } catch (error) {
      console.error('Failed to analyze meal:', error);
      alert('Failed to analyze meal. Please make sure Firebase is configured correctly.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (confirm('Delete this meal?')) {
      await deleteMeal(mealId);
    }
  };

  // Calculate daily summary
  const summary = calculateDailySummary(currentDate, meals, settings, exercise);

  const isLoading = mealsLoading || settingsLoading || exerciseLoading;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">Calorie Tracker</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-green-600 rounded transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-4">
        {/* Settings Modal */}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onUpdate={updateSettings}
            onClose={() => setShowSettings(false)}
          />
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {/* Date Navigator */}
            <DatePicker currentDate={currentDate} onDateChange={setCurrentDate} />

            {/* Daily Summary */}
            <DailySummary summary={summary} />

            {/* Macro Progress */}
            <MacroProgress
              totalProtein={summary.totalProtein}
              totalCarbs={summary.totalCarbs}
              totalFat={summary.totalFat}
              settings={settings}
            />

            {/* Exercise Input */}
            <ExerciseInput initialValue={exercise} onSave={updateExercise} />

            {/* Image Upload */}
            <div className="mt-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Add Meal</h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Add notes about the meal (optional - e.g., 'extra cheese', 'large portion')"
                className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
              <ImageUpload onImageSelected={handleImageSelected} isAnalyzing={analyzing} />
            </div>

            {/* Meals List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Today's Meals</h3>
              <MealList meals={meals} onDeleteMeal={handleDeleteMeal} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
