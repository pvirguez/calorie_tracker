import React from 'react';
import { MealCard } from './MealCard';
import type { Meal } from '../types';

interface Props {
  meals: Meal[];
  onDeleteMeal: (id: string) => void;
}

export const MealList: React.FC<Props> = ({ meals, onDeleteMeal }) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No meals logged today.</p>
        <p className="text-sm mt-1">Add your first meal above!</p>
      </div>
    );
  }

  return (
    <div>
      {meals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          onDelete={onDeleteMeal}
        />
      ))}
    </div>
  );
};
