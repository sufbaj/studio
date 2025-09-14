'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {plugin} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI(), plugin()],
  model: 'googleai/gemini-2.5-flash',
});
