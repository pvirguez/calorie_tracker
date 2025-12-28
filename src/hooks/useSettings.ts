import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getSettings, updateSettings } from '../services/firestore';
import type { Settings } from '../types';

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    targetCalories: 1800,
    dailyBurn: 2200,
    proteinTarget: 135,
    carbsTarget: 180,
    fatTarget: 60
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize settings
    getSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });

    // Real-time listener
    const unsubscribe = onSnapshot(doc(db, 'settings', 'user'), (doc) => {
      if (doc.exists()) {
        setSettings(doc.data() as Settings);
      }
    });

    return () => unsubscribe();
  }, []);

  const update = async (newSettings: Partial<Settings>) => {
    await updateSettings(newSettings);
  };

  return { settings, loading, update };
};
