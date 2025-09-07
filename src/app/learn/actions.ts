'use server';

import { aiContentReview } from '@/ai/flows/ai-content-review';
import type { AiContentReviewInput } from '@/ai/flows/ai-content-review';
import { z } from 'zod';

const AiContentReviewInputSchema = z.object({
  text: z.string().min(2, "Texten måste vara minst 2 tecken lång."),
  // This is the BHS language the user has selected.
  // The user can *write* in this language or in Swedish.
  language: z.enum(['Bosnian', 'Croatian', 'Serbian']),
  gradeLevel: z.enum(['1-3', '4-6', '7-9']),
});

export async function reviewTextAction(input: Omit<AiContentReviewInput, 'language'> & { language: AiContentReviewInput['language'] | 'Swedish' }) {
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
