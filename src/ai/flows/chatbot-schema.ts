import {z} from 'genkit';

// Defines the structure for a single message in the chat history
export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatbotInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The chat history between the user and the model.'),
  language: z.enum(['Bosnian', 'Croatian', 'Serbian']).describe('The primary language context for the student.'),
  grade: z.enum(['1-3', '4-6', '7-9']).describe('The grade level of the student.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;
