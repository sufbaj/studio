'use server';

import { aiContentReview } from '@/ai/flows/ai-content-review';
import type { AiContentReviewInput } from '@/ai/flows/ai-content-review';
import { z } from 'zod';

// This schema should match the one in the AI flow.
const AiContentReviewInputSchema = z.object({
  text: z.string().min(2, "Texten måste vara minst 2 tecken lång."),
  language: z.enum(['Bosnian', 'Croatian', 'Serbian', 'Swedish']),
  gradeLevel: z.enum(['1-3', '4-6', '7-9']),
});

export async function reviewTextAction(input: AiContentReviewInput) {
    // The language field from the client is the BHS language selected.
    // The AI flow needs to know which BHS language is the target if the user writes in Swedish.
    const validatedInput = AiContentReviewInputSchema.safeParse(input);

    if (!validatedInput.success) {
        return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }
    
  try {
    const result = await aiContentReview(validatedInput.data);
    return { feedback: result.feedback };
  } catch (error) {
    console.error("AI content review failed:", error);
    return { error: "Kunde inte ansluta till AI-tjänsten." };
  }
}
