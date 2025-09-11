'use server';

import type { AiReviewInput, AiReviewOutput } from '@/ai/flows/ai-content-review';
import { reviewText } from '@/ai/flows/ai-content-review';
import type { TranslateTextInput, TranslateTextOutput } from '@/ai/flows/translator-flow';
import { translateText } from '@/ai/flows/translator-flow';


export async function translateTextAction(
    input: TranslateTextInput
  ): Promise<{ translation?: TranslateTextOutput; error?: string }> {
    try {
      const translation = await translateText(input);
      return { translation };
    } catch (e: any) {
      console.error(e);
      return { error: e.message || 'Nepoznata greška.' };
    }
  }

  export async function reviewTextAction(
    input: AiReviewInput
  ): Promise<{ review?: AiReviewOutput; error?: string }> {
    try {
      const review = await reviewText(input);
      return { review };
    } catch (e: any) {
      console.error(e);
      return { error: e.message || 'Nepoznata greška.' };
    }
  }
  