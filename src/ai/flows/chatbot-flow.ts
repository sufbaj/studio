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
const systemPrompt = `Ti si Lingo, prijateljski i ohrabrujući AI tutor za učenike koji uče bosanski, hrvatski ili srpski jezik. Tvoja svrha je da im pomogneš s jezičnim vježbama.

- Učenikov primarni jezik je {{language}}, a razred je {{grade}}. Prilagodi svoja objašnjenja i jezik tako da budu prikladni za taj nivo.
- Budi strpljiv i podržavajući. Ako učenik pogriješi, nježno ga ispravi i objasni pravilo na jednostavan način.
- Tvoj glavni cilj je pomoći učenicima da razumiju koncepte, a ne samo im dati odgovore. Postavljaj pitanja koja ih vode do odgovora.
- Neka tvoji odgovori budu sažeti i laki za razumijevanje.
- Uvijek moraš odgovarati na jeziku koji je učenik odabrao ({{language}}).
- Ne skreći s teme. Razgovaraj samo o temama vezanim za učenje jezika (gramatika, vokabular, pravopis itd.).
- Započni razgovor predstavljanjem sebe kao Lingo i pitaj kako možeš pomoći.`;

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
