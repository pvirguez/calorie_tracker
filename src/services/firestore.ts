import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import type { Meal, Settings } from '../types';

// Meals operations
export const addMeal = async (meal: Omit<Meal, 'id'>): Promise<string> => {
  const mealRef = doc(collection(db, 'meals'));
  await setDoc(mealRef, {
    ...meal,
    timestamp: meal.timestamp || Date.now()
  });
  return mealRef.id;
};

export const updateMeal = async (mealId: string, updates: Partial<Meal>): Promise<void> => {
  const mealRef = doc(db, 'meals', mealId);
  await updateDoc(mealRef, updates);
};

export const getMealsByDate = async (date: string): Promise<Meal[]> => {
  const q = query(
    collection(db, 'meals'),
    where('date', '==', date),
    orderBy('timestamp', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Meal));
};

export const deleteMeal = async (mealId: string): Promise<void> => {
  await deleteDoc(doc(db, 'meals', mealId));
};

// Settings operations
export const getSettings = async (): Promise<Settings> => {
  const docRef = doc(db, 'settings', 'user');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Settings;
  }

  // Default settings
  const defaults: Settings = {
    targetCalories: 1800,
    dailyBurn: 2200,
    proteinTarget: 135,
    carbsTarget: 180,
    fatTarget: 60
  };
  await setDoc(docRef, defaults);
  return defaults;
};

export const updateSettings = async (settings: Partial<Settings>): Promise<void> => {
  const docRef = doc(db, 'settings', 'user');
  await setDoc(docRef, settings, { merge: true });
};

// Exercise operations
export const getExerciseForDate = async (date: string): Promise<number> => {
  const docRef = doc(db, 'exercise', date);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().calories : 0;
};

export const setExerciseForDate = async (date: string, calories: number): Promise<void> => {
  const docRef = doc(db, 'exercise', date);
  await setDoc(docRef, { date, calories });
};
