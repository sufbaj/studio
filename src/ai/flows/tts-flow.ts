'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) flow.
 *
 * - generateSpeech - A function that converts text to speech.
 * - TtsInput - The input type for the generateSpeech function.
 * - TtsOutput - The return type for the generateSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const TtsInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type TtsInput = z.infer<typeof TtsInputSchema>;

const TtsOutputSchema = z.object({
  audioData: z.string().describe("The generated audio as a base64-encoded WAV data URI."),
});
export type TtsOutput = z.infer<typeof TtsOutputSchema>;

export async function generateSpeech(input: TtsInput): Promise<TtsOutput> {
  return ttsFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const ttsFlow = ai.defineFlow(
  {
    name: 'ttsFlow',
    inputSchema: TtsInputSchema,
    outputSchema: TtsOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Hyperion' }, // A suitable voice for the region
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio media returned from TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioData: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
