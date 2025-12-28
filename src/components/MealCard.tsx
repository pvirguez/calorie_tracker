import React from 'react';
import type { Meal } from '../types';
import { formatTime } from '../utils/dateUtils';

interface Props {
  meal: Meal;
  onDelete: (id: string) => void;
}

export const MealCard: React.FC<Props> = ({ meal, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-3">
      {meal.imageUrl && (
        <img
          src={meal.imageUrl}
          alt="Meal"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-500">
            {formatTime(meal.timestamp)}
          </span>
          <button
            onClick={() => onDelete(meal.id)}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>

        {meal.userNotes && (
          <p className="text-sm text-gray-700 mb-3 italic">"{meal.userNotes}"</p>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-orange-50 p-2 rounded border border-orange-200">
            <span className="text-gray-600">Calories: </span>
            <strong className="text-orange-700">{meal.calories}</strong>
          </div>
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <span className="text-gray-600">Protein: </span>
            <strong className="text-blue-700">{meal.protein}g</strong>
          </div>
          <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
            <span className="text-gray-600">Carbs: </span>
            <strong className="text-yellow-700">{meal.carbs}g</strong>
          </div>
          <div className="bg-purple-50 p-2 rounded border border-purple-200">
            <span className="text-gray-600">Fat: </span>
            <strong className="text-purple-700">{meal.fat}g</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
