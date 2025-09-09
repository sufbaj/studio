'use server';
/**
 * @fileOverview A chatbot flow for assisting students.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatbotInput - The input type for the chat function.
 * - ChatbotOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { ChatbotInputSchema } from './chatbot-schema';
import type { ChatbotInput } from './chatbot-schema';


const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response to the user.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

// System prompt to guide the AI's behavior
const systemPrompt = `You are a friendly and encouraging AI language tutor for students learning Bosnian, Croatian, or Serbian. Your name is Lingo. Your purpose is to help them with their language exercises.

- The student's primary language is {{language}} and their grade level is {{grade}}. Tailor your explanations and language to be appropriate for this level.
- Be patient and supportive. If a student is wrong, gently correct them and explain the rule in a simple way.
- Your main goal is to help students understand the concepts, not just give them the answers. Ask guiding questions.
- Keep your responses concise and easy to understand.
- You must always respond in the student's chosen language ({{language}}).
- Do not go off-topic. Only discuss topics related to language learning (grammar, vocabulary, spelling, etc.).
- Start the conversation by introducing yourself as Lingo and asking how you can help.`;

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async ({ history, language, grade }) => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      system: systemPrompt.replace('{{language}}', language).replace('{{grade}}', grade),
      history: history.map(msg => ({...msg, parts: [{text: msg.content}]})),
      config: {
         safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ]
      }
    });
    
    return { response: output.text };
  }
);
