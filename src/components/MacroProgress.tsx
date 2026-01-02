import React from 'react';
import type { Settings } from '../types';
import { calculateMacroProgress, getMacroProgressColor } from '../utils/calculations';

interface Props {
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  settings: Settings;
}

export const MacroProgress: React.FC<Props> = ({ totalProtein, totalCarbs, totalFat, settings }) => {
  const proteinProgress = calculateMacroProgress(totalProtein, settings.proteinTarget);
  const carbsProgress = calculateMacroProgress(totalCarbs, settings.carbsTarget);
  const fatProgress = calculateMacroProgress(totalFat, settings.fatTarget);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Macro Targets</h3>

      <div className="space-y-3">
        <MacroBar
          label="Protein"
          current={totalProtein}
          target={settings.proteinTarget}
          progress={proteinProgress}
          color="blue"
        />
        <MacroBar
          label="Carbs"
          current={totalCarbs}
          target={settings.carbsTarget}
          progress={carbsProgress}
          color="yellow"
        />
        <MacroBar
          label="Fat"
          current={totalFat}
          target={settings.fatTarget}
          progress={fatProgress}
          color="purple"
        />
      </div>
    </div>
  );
};

const MacroBar: React.FC<{
  label: string;
  current: number;
  target: number;
  progress: number;
  color: string;
}> = ({ label, current, target, progress }) => {
  const progressColor = getMacroProgressColor(progress);
  const bgColorClass = progressColor === 'green' ? 'bg-green-500' : progressColor === 'yellow' ? 'bg-yellow-500' : 'bg-red-500';
  const textColorClass = progressColor === 'green' ? 'text-green-700' : progressColor === 'yellow' ? 'text-yellow-700' : 'text-red-700';

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className={textColorClass}>
          <strong>{current}g</strong> / {target}g ({progress}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${bgColorClass} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
