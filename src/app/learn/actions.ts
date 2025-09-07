'use server';

import { aiContentReview } from '@/ai/flows/ai-content-review';
import type { AiContentReviewInput } from '@/ai/flows/ai-content-review';
import { translateText } from '@/ai/flows/translator-flow';
import type { TranslatorInput } from '@/ai/flows/translator-flow';
import { z } from 'zod';

const AiContentReviewInputSchema = z.object({
  text: z.string().min(2, "Texten måste vara minst 2 tecken lång."),
  language: z
    .enum(['Bosnian', 'Croatian', 'Serbian'])
    .describe('The language of the text. The student can write in Swedish or the selected BHS language.'),
  gradeLevel: z
    .enum(['1-3', '4-6', '7-9'])
    .describe('The grade level of the student.'),
});

const TranslatorInputSchema = z.object({
    text: z.string().min(1, "Texten kan inte vara tom."),
    sourceLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
    targetLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
});


export async function reviewTextAction(input: AiContentReviewInput) {
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

export async function translateTextAction(input: TranslatorInput) {
    const validatedInput = TranslatorInputSchema.safeParse(input);

    if (!validatedInput.success) {
        return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }

    if (validatedInput.data.sourceLanguage === validatedInput.data.targetLanguage) {
        return { translation: validatedInput.data.text };
    }

    try {
        const result = await translateText(validatedInput.data);
        return { translation: result.translation };
    } catch (error) {
        console.error("AI translation failed:", error);
        return { error: "Kunde inte ansluta till AI-tjänsten." };
    }
}
