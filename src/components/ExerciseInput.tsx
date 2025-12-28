import React, { useState } from 'react';

interface Props {
  initialValue: number;
  onSave: (calories: number) => void;
}

export const ExerciseInput: React.FC<Props> = ({ initialValue, onSave }) => {
  const [calories, setCalories] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(calories);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCalories(initialValue);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between bg-indigo-50 p-3 rounded-lg mb-4">
        <span className="text-sm">
          Exercise Today: <strong className="text-indigo-700">{initialValue} cal</strong>
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 p-3 rounded-lg mb-4">
      <div className="flex gap-2">
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          className="flex-1 px-3 py-2 border border-indigo-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Exercise calories"
          min="0"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
