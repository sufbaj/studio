'use server';
/**
 * @fileOverview An AI content reviewer for text written in Swedish or BHS languages.
 *
 * - reviewText - A function that handles the content review.
 * - AiReviewInput - The input type for the reviewText function.
 * - AiReviewOutput - The return type for the reviewText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiReviewInputSchema = z.object({
  text: z.string().describe('The text to be reviewed.'),
  language: z.enum(['Bosnian', 'Croatian', 'Serbian', 'Swedish']).describe('The primary language context for the student.'),
});
export type AiReviewInput = z.infer<typeof AiReviewInputSchema>;

const AiReviewOutputSchema = z.object({
    detectedSourceLanguage: z.enum(['Swedish', 'BHS']).describe('The detected language of the input text (Swedish or BHS - Bosnian/Croatian/Serbian).'),
    translation: z.string().describe('The translation of the original text into the other language. If the source was Swedish, translate to Bosnian. If the source was BHS, translate to Swedish.'),
    feedback: z.string().describe('Constructive feedback on grammar, spelling, and style. If the text is perfect, provide a positive confirmation. Feedback should be in the detected source language.'),
    correctedText: z.string().describe('The corrected version of the original text. If no corrections are needed, this should be identical to the original text.'),
});
export type AiReviewOutput = z.infer<typeof AiReviewOutputSchema>;


export async function reviewText(input: AiReviewInput): Promise<AiReviewOutput> {
  return aiContentReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiReviewPrompt',
  input: {schema: AiReviewInputSchema},
  output: {schema: AiReviewOutputSchema},
  prompt: `You are an expert language teacher specializing in Swedish and BHS (Bosnian, Croatian, Serbian) languages. Your task is to analyze a text provided by a student, provide a translation, constructive feedback, and a corrected version. The student's primary language context is {{language}}.

Here is the text to review:
"{{{text}}}"

Follow these steps:
1.  **Detect Language:** Determine if the provided text is written in Swedish or a BHS language (Bosnian, Croatian, or Serbian). Set 'detectedSourceLanguage' to "Swedish" or "BHS".

2.  **Translate:**
    *   If the detected language is Swedish, translate the text to the student's chosen primary language ({{language}}).
    *   If the detected language is BHS, translate the text into Swedish.
    *   When translating to Bosnian or Croatian, always use the Ijekavian dialect (e.g., "lijepo", "mlijeko").
    *   When translating to Serbian, always use the Ekavian dialect (e.g., "lepo", "mleko").
    *   Place the result in the 'translation' field.

3.  **Provide Feedback:**
    *   Analyze the original text for any grammatical errors, spelling mistakes, or awkward phrasing.
    *   Provide clear, constructive feedback. Explain the errors and how to correct them.
    *   The feedback should be written in the same language as the original text (Swedish or BHS).
    *   If the text is perfectly written, provide a positive and encouraging message. For BHS, use the appropriate dialect, for example: "Odlično napisano! Nema grešaka." (ijekavian) or "Odlično napisano! Nema grešaka." (ekavian). For Swedish: "Utmärkt skrivet! Inga fel.".
    *   Place the feedback in the 'feedback' field.

4.  **Correct Text:**
    *   Provide a fully corrected version of the original text.
    *   If there were no errors, this field should contain the original, unchanged text.
    *   Ensure the corrected text respects the correct dialect (Ijekavian for Bosnian/Croatian, Ekavian for Serbian).
    *   Place the result in the 'correctedText' field.

Respond ONLY with the JSON object defined in the output schema.
`,
});

const aiContentReviewFlow = ai.defineFlow(
  {
    name: 'aiContentReviewFlow',
    inputSchema: AiReviewInputSchema,
    outputSchema: AiReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
