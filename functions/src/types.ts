export interface GPT4VisionResponse {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence?: string;
  reasoning?: string;
}

export interface AnalyzeMealRequest {
  imageBase64: string;
  userNotes?: string;
}
