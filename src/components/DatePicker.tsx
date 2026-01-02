import React from 'react';
import { formatDisplayDate, getYesterdayString, getTomorrowString, isToday } from '../utils/dateUtils';

interface Props {
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<Props> = ({ currentDate, onDateChange }) => {
  const handlePrevious = () => {
    onDateChange(getYesterdayString(currentDate));
  };

  const handleNext = () => {
    onDateChange(getTomorrowString(currentDate));
  };

  const handleToday = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
      <button
        onClick={handlePrevious}
        className="px-3 py-1 text-gray-600 hover:text-gray-900 transition"
      >
        ←
      </button>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold">
          {formatDisplayDate(currentDate)}
        </h2>
        {!isToday(currentDate) && (
          <button
            onClick={handleToday}
            className="text-xs text-primary hover:underline mt-1"
          >
            Go to Today
          </button>
        )}
      </div>

      <button
        onClick={handleNext}
        className="px-3 py-1 text-gray-600 hover:text-gray-900 transition"
      >
        →
      </button>
    </div>
  );
};
