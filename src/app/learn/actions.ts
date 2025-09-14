'use server';

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
