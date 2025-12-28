import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
import type { AnalyzeMealRequest, GPT4VisionResponse } from '../types';

const analyzeMealFunction = httpsCallable<AnalyzeMealRequest, GPT4VisionResponse>(
  functions,
  'analyzeMeal'
);

export const analyzeMealImage = async (
  imageBase64: string,
  userNotes?: string
): Promise<GPT4VisionResponse> => {
  const result = await analyzeMealFunction({ imageBase64, userNotes });
  return result.data;
};
