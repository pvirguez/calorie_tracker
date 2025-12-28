import React from 'react';
import type { DailySummary as DailySummaryType } from '../types';

interface Props {
  summary: DailySummaryType;
}

export const DailySummary: React.FC<Props> = ({ summary }) => {
  const isDeficit = summary.netDeficit > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">Daily Summary</h2>

      {/* Calorie Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <StatCard
          label="Target"
          value={summary.targetCalories}
          unit="cal"
          color="blue"
        />
        <StatCard
          label="Consumed"
          value={summary.consumedCalories}
          unit="cal"
          color="orange"
        />
        <StatCard
          label="Calories Left"
          value={summary.caloriesLeft}
          unit="cal"
          color={summary.caloriesLeft >= 0 ? 'green' : 'red'}
        />
        <StatCard
          label="Daily Burn"
          value={summary.dailyBurn}
          unit="cal"
          color="purple"
        />
        <StatCard
          label="Exercise"
          value={summary.exercise}
          unit="cal"
          color="indigo"
        />
        <StatCard
          label="Net Deficit"
          value={Math.abs(summary.netDeficit)}
          unit="cal"
          color={isDeficit ? 'green' : 'red'}
          prefix={isDeficit ? '-' : '+'}
        />
      </div>

      {/* Macros Summary */}
      <div className="border-t pt-3">
        <h3 className="font-semibold mb-2 text-sm text-gray-700">Total Macronutrients</h3>
        <div className="flex justify-between text-sm">
          <span>
            Protein: <strong className="text-blue-600">{summary.totalProtein}g</strong>
          </span>
          <span>
            Carbs: <strong className="text-yellow-600">{summary.totalCarbs}g</strong>
          </span>
          <span>
            Fat: <strong className="text-purple-600">{summary.totalFat}g</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

// Helper component for stat cards
const StatCard: React.FC<{
  label: string;
  value: number;
  unit: string;
  color: string;
  prefix?: string;
}> = ({ label, value, unit, color, prefix = '' }) => {
  const bgColorClass = `bg-${color}-50`;
  const borderColorClass = `border-${color}-200`;
  const textColorClass = `text-${color}-700`;

  return (
    <div className={`${bgColorClass} p-3 rounded border ${borderColorClass}`}>
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className={`text-lg font-bold ${textColorClass}`}>
        {prefix}{value} <span className="text-sm font-normal">{unit}</span>
      </div>
    </div>
  );
};
