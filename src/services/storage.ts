import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const uploadMealImage = async (
  imageBase64: string,
  mealId: string
): Promise<string> => {
  const storageRef = ref(storage, `meal-images/${mealId}.jpg`);

  // Upload base64 string
  await uploadString(storageRef, imageBase64, 'data_url');

  // Get download URL
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
