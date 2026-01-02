import React, { useState } from 'react';
import type { Settings } from '../types';

interface Props {
  settings: Settings;
  onUpdate: (settings: Partial<Settings>) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<Props> = ({ settings, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(settings);

  const handleChange = (field: keyof Settings, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Calories
            </label>
            <input
              type="number"
              value={formData.targetCalories}
              onChange={(e) => handleChange('targetCalories', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Burn (BMR)
            </label>
            <input
              type="number"
              value={formData.dailyBurn}
              onChange={(e) => handleChange('dailyBurn', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your basal metabolic rate (calories burned at rest)
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-3">Macro Targets (grams)</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Protein Target
                </label>
                <input
                  type="number"
                  value={formData.proteinTarget}
                  onChange={(e) => handleChange('proteinTarget', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbs Target
                </label>
                <input
                  type="number"
                  value={formData.carbsTarget}
                  onChange={(e) => handleChange('carbsTarget', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fat Target
                </label>
                <input
                  type="number"
                  value={formData.fatTarget}
                  onChange={(e) => handleChange('fatTarget', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
