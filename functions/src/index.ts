import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { analyzeMeal as analyzeMealLogic, openaiApiKey } from './analyzeMeal.js';

initializeApp(); // v2

export const analyzeMeal = onCall(
  {
    secrets: [openaiApiKey],
  },
  async (request) => {
    // Verify user is authenticated
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

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
  }
);
