'use server';

import { translateText } from '@/ai/flows/translator-flow';
import type { TranslatorInput } from '@/ai/flows/translator-flow';
import { reviewText } from '@/ai/flows/ai-content-review';
import type { AiReviewInput } from '@/ai/flows/ai-content-review';
import { chat } from '@/ai/flows/chatbot-flow';
import { ChatbotInputSchema } from '@/ai/flows/chatbot-schema';
import type { ChatbotInput } from '@/ai/flows/chatbot-schema';
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


const AiReviewInputSchema = z.object({
    text: z.string().min(2, "Texten måste innehålla minst 2 tecken."),
    language: z.enum(['Bosnian', 'Croatian', 'Serbian', 'Swedish']),
});

export async function reviewTextAction(input: AiReviewInput) {
    const validatedInput = AiReviewInputSchema.safeParse(input);

    if (!validatedInput.success) {
        return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }

    try {
        const result = await reviewText(validatedInput.data);
        return { review: result };
    } catch (error) {
        console.error("AI review failed:", error);
        return { error: "Kunde inte ansluta till AI-tjänsten." };
    }
}

export async function chatbotAction(input: ChatbotInput) {
    const validatedInput = ChatbotInputSchema.safeParse(input);

    if (!validatedInput.success) {
        return { error: validatedInput.error.errors.map(e => e.message).join(', ') };
    }

    try {
        const result = await chat(validatedInput.data);
        return { response: result.response };
    } catch (error) {
        console.error("AI chat failed:", error);
        return { error: "Kunde inte ansluta till AI-tjänsten." };
    }
}
