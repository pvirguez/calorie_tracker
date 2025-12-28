import OpenAI from 'openai';
import type { GPT4VisionResponse } from './types.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeMeal(
  imageBase64: string,
  userNotes?: string
): Promise<GPT4VisionResponse> {
  // CRITICAL: Excellent prompt engineering for accurate calorie estimation
  const systemPrompt = `You are a professional nutritionist and calorie estimation expert. Your task is to analyze food images and provide accurate calorie and macronutrient estimates.

GUIDELINES:
1. Analyze portion sizes carefully by comparing to common reference objects (plates, utensils, hands)
2. Identify all visible food items and ingredients
3. Consider cooking methods (fried, grilled, baked) as they affect calories
4. Account for hidden ingredients (oils, butter, sauces, dressings)
5. Be conservative with estimates - round up slightly if uncertain
6. Consider typical restaurant portions vs. home-cooked meals

OUTPUT FORMAT (strict JSON):
{
  "calories": <total calories as integer>,
  "protein": <grams as integer>,
  "carbs": <grams as integer>,
  "fat": <grams as integer>,
  "confidence": "high|medium|low",
  "reasoning": "<brief explanation of your estimate>"
}

EXAMPLES FOR CALIBRATION:
- Small chicken breast (grilled, 4oz): ~165 cal, 31g protein, 0g carbs, 4g fat
- 1 cup white rice: ~200 cal, 4g protein, 45g carbs, 0.5g fat
- 1 medium banana: ~105 cal, 1g protein, 27g carbs, 0.5g fat
- 1 tbsp olive oil: ~120 cal, 0g protein, 0g carbs, 14g fat
- Large burger with fries: ~800-1000 cal, 40g protein, 80g carbs, 45g fat
- Pizza slice (large): ~285 cal, 12g protein, 36g carbs, 10g fat
- Sandwich with meat and cheese: ~400 cal, 25g protein, 40g carbs, 15g fat

CRITICAL: Always return valid JSON only. No additional text.`;

  const userPrompt = userNotes
    ? `Analyze this meal image and provide calorie and macro estimates. User notes: "${userNotes}"`
    : "Analyze this meal image and provide calorie and macro estimates.";

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            image_url: {
              url: imageBase64,
              detail: "high" // CRITICAL: Use high detail for better accuracy
            }
          }
        ]
      }
    ],
    max_tokens: 500,
    temperature: 0.3 // Lower temperature for more consistent results
  });

  const content = response.choices[0].message.content;

  try {
    // Parse JSON response
    const result = JSON.parse(content || '{}');

    return {
      calories: result.calories || 0,
      protein: result.protein || 0,
      carbs: result.carbs || 0,
      fat: result.fat || 0,
      confidence: result.confidence,
      reasoning: result.reasoning
    };
  } catch (error) {
    // Fallback parsing if JSON fails
    console.error('Failed to parse GPT-4 response:', content);
    throw new Error('Invalid response format from GPT-4');
  }
}
