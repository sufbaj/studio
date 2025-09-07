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
  text: z.string().describe('The text submitted by the student for review.'),
  language: z
    .enum(['Bosnian', 'Croatian', 'Serbian', 'Swedish'])
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
  prompt: `You are an AI content reviewer specializing in providing feedback to students learning Bosnian, Croatian, and Serbian. The student may write in Swedish or their selected BHS language.

You will review the text submitted by the student and provide personalized feedback to help them improve their language skills.

Consider the language, grade level, and the content of the text when providing feedback.

Language: {{{language}}}
Grade Level: {{{gradeLevel}}}
Text: {{{text}}}

Feedback:
`, // Keep the 'Feedback:' tag, the model will append after it
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
