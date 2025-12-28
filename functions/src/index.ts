import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { analyzeMeal as analyzeMealLogic } from './analyzeMeal.js';

initializeApp();

export const analyzeMeal = onCall(async (request) => {
  const { imageBase64, userNotes } = request.data;

  if (!imageBase64) {
    throw new HttpsError('invalid-argument', 'Image is required');
  }

  try {
    return await analyzeMealLogic(imageBase64, userNotes);
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new HttpsError('internal', 'Failed to analyze meal');
  }
});
