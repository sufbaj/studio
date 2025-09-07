'use server';

/**
 * @fileOverview An AI content review flow for providing feedback on student translations and free text productions.
 *
 * - aiContentReview - A function that handles the content review process.
 * - AiContentReviewInput - The input type for the aiContentReview function.
 * - AiContentReviewOutput - The return type for the aiContentReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiContentReviewInputSchema = z.object({
  text: z.string().min(2, "Texten måste vara minst 2 tecken lång.").describe('The text submitted by the student for review.'),
  language: z
    .enum(['Bosnian', 'Croatian', 'Serbian'])
    .describe('The language of the text. The student can write in Swedish or the selected BHS language.'),
  gradeLevel: z
    .enum(['1-3', '4-6', '7-9'])
    .describe('The grade level of the student.'),
});
export type AiContentReviewInput = z.infer<typeof AiContentReviewInputSchema>;

const AiContentReviewOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the submitted text.'),
});
export type AiContentReviewOutput = z.infer<typeof AiContentReviewOutputSchema>;

export async function aiContentReview(input: AiContentReviewInput): Promise<AiContentReviewOutput> {
  return aiContentReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiContentReviewPrompt',
  input: {schema: AiContentReviewInputSchema},
  output: {schema: AiContentReviewOutputSchema},
  prompt: `You are an AI content reviewer and language tutor specializing in helping students learning Bosnian, Croatian, and Serbian (BHS).

The student will submit a text for review. Your task is to provide helpful feedback. Consider the student's grade level.

- If the student writes in their selected BHS language, you must provide feedback and translations IN SWEDISH. Give the Swedish translation of the text, and then provide feedback on grammar, spelling, and style.
- If the student writes in Swedish, you must provide feedback and translations IN THE SELECTED BHS LANGUAGE (Bosnian, Croatian, or Serbian). Give the translation of the text, and then provide feedback.

Your feedback should be encouraging and easy to understand for the specified grade level.

Selected BHS Language: {{{language}}}
Grade Level: {{{gradeLevel}}}
Text to review: {{{text}}}

Feedback:
`,
});

const aiContentReviewFlow = ai.defineFlow(
  {
    name: 'aiContentReviewFlow',
    inputSchema: AiContentReviewInputSchema,
    outputSchema: AiContentReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
