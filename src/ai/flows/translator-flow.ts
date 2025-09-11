'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateTextInputSchema = z.object({
  text: z.string(),
  sourceLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
  targetLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']),
  gender: z.enum(['male', 'female']).optional(),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

export type TranslateTextOutput = string;

const translatePrompt = ai.definePrompt({
    name: 'translatePrompt',
    input: { schema: TranslateTextInputSchema },
    output: { schema: z.string() },
    prompt: `Prevedi sljedeći tekst sa {{sourceLanguage}} na {{targetLanguage}}.
    {{#if gender}}
    Prilagodi prijevod za gramatički rod: {{gender}}.
    {{/if}}
    Tekst za prijevod:
    '''
    {{{text}}}
    '''
    Vrati samo prevedeni tekst, bez ikakvih dodatnih objašnjenja.
    `,
});

const translateFlow = ai.defineFlow(
  {
    name: 'translateFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { output } = await translatePrompt(input);
     if (!output) {
      throw new Error('AI nije uspio generirati odgovor.');
    }
    return output;
  }
);

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
    return translateFlow(input);
}
