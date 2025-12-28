import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getExerciseForDate, setExerciseForDate } from '../services/firestore';

export const useExercise = (date: string) => {
  const [exercise, setExercise] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize exercise data
    getExerciseForDate(date).then(calories => {
      setExercise(calories);
      setLoading(false);
    });

    // Real-time listener
    const unsubscribe = onSnapshot(doc(db, 'exercise', date), (doc) => {
      if (doc.exists()) {
        setExercise(doc.data().calories || 0);
      } else {
        setExercise(0);
      }
    });

    return () => unsubscribe();
  }, [date]);

  const update = async (calories: number) => {
    await setExerciseForDate(date, calories);
    setExercise(calories);
  };

  return { exercise, loading, update };
};
