'use server';

import { translateText } from '@/ai/flows/translator-flow';
import type { TranslatorInput } from '@/ai/flows/translator-flow';
import { z } from 'zod';

const TranslatorInputSchema = z.object({
    text: z.string().min(1, "Texten kan inte vara tom."),
    sourceLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
    targetLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
    gender: z.enum(['male', 'female']).optional(),
});


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
