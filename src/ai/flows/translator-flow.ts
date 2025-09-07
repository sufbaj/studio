'use server';
/**
 * @fileOverview An AI translator flow for translating text between Swedish and BHS languages.
 *
 * - translateText - A function that handles the translation.
 * - TranslatorInput - The input type for the translateText function.
 * - TranslatorOutput - The return type for the translateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslatorInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  sourceLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']).describe('The source language of the text.'),
  targetLanguage: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']).describe('The language to translate the text to.'),
  gender: z.enum(['male', 'female']).optional().describe('The grammatical gender to use for the translation, if applicable.'),
});
export type TranslatorInput = z.infer<typeof TranslatorInputSchema>;

const TranslatorOutputSchema = z.object({
  translation: z.string().describe('The translated text.'),
});
export type TranslatorOutput = z.infer<typeof TranslatorOutputSchema>;


export async function translateText(input: TranslatorInput): Promise<TranslatorOutput> {
  return translatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatorPrompt',
  input: {schema: TranslatorInputSchema},
  output: {schema: TranslatorOutputSchema},
  prompt: `You are an expert translator. Translate the given text from {{sourceLanguage}} to {{targetLanguage}}.
Provide only the translated text, without any additional explanations or context.

If the user specifies a gender, ensure the translation uses the correct grammatical gender (e.g., for past tense verbs in BHS languages like bio/bila).
If translating to Serbian, use the Ekavian dialect.

Gender: {{#if gender}}{{gender}}{{else}}Not specified{{/if}}
Text to translate: {{{text}}}
`,
});

const translatorFlow = ai.defineFlow(
  {
    name: 'translatorFlow',
    inputSchema: TranslatorInputSchema,
    outputSchema: TranslatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
