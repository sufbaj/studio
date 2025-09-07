'use server';

import { aiContentReview } from '@/ai/flows/ai-content-review';
import type { AiContentReviewInput } from '@/ai/flows/ai-content-review';
import { z } from 'zod';

const AiContentReviewInputSchema = z.object({
  text: z.string().min(10, "Texten måste vara minst 10 tecken lång."),
  language: z.enum(['Bosnian', 'Croatian', 'Serbian', 'Swedish']),
  gradeLevel: z.enum(['1-3', '4-6', '7-9']),
});

export async function reviewTextAction(input: AiContentReviewInput) {
    const validatedInput = AiContentReviewInputSchema.safeParse({
        ...input,
        language: input.language ? (input.language.charAt(0).toUpperCase() + input.language.slice(1)) as any : undefined,
        gradeLevel: input.grade,
    });

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
