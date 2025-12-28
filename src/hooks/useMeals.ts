import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Meal } from '../types';

export const useMeals = (date: string) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'meals'),
      where('date', '==', date),
      orderBy('timestamp', 'desc')
    );

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mealsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Meal));
      setMeals(mealsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [date]);

  return { meals, loading };
};
