'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiReviewInputSchema = z.object({
  text: z.string().describe('Tekst koji treba pregledati.'),
  language: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']).describe('Ciljni jezik za prijevod i analizu.'),
});
export type AiReviewInput = z.infer<typeof AiReviewInputSchema>;

const AiReviewOutputSchema = z.object({
  translation: z.string().describe('Prijevod originalnog teksta. Ako je originalni tekst na švedskom, prevedi ga na ciljni jezik (bosanski, hrvatski ili srpski). Ako je originalni tekst na jednom od BHS jezika, prevedi ga na švedski.'),
  correctedText: z.string().describe('Ispravljena verzija originalnog teksta, s ispravljenim gramatičkim i pravopisnim greškama.'),
  feedback: z.string().describe('Detaljne povratne informacije o greškama u originalnom tekstu, s objašnjenjima zašto su ispravke napravljene.'),
});
export type AiReviewOutput = z.infer<typeof AiReviewOutputSchema>;

const reviewPrompt = ai.definePrompt({
    name: 'reviewPrompt',
    input: { schema: AiReviewInputSchema },
    output: { schema: AiReviewOutputSchema },
    prompt: `Ti si stručnjak za jezike, specijaliziran za bosanski, hrvatski, srpski i švedski.
    Tvoj zadatak je da analiziraš tekst koji ti korisnik pošalje.

    Analiza treba sadržavati tri dijela:
    1.  Prijevod:
        - Ako je originalni tekst na švedskom, prevedi ga na ciljni jezik: {{language}}.
        - Ako je originalni tekst na jednom od BHS jezika (bosanski, hrvatski, srpski), prevedi ga na švedski.
    2.  Ispravljeni tekst:
        - Pažljivo pregledaj originalni tekst i ispravi sve gramatičke i pravopisne greške.
        - Ako nema grešaka, vrati originalni tekst.
    3.  Povratne informacije:
        - Pruži detaljno, ali lako razumljivo objašnjenje za svaku ispravku koju si napravio/la.
        - Objasni zašto je originalni dio bio netačan i koje gramatičko ili pravopisno pravilo se primjenjuje.
        - Ako nema grešaka, napiši "Tekst je ispravan."

    Originalni tekst:
    '''
    {{{text}}}
    '''
    `,
});

const reviewFlow = ai.defineFlow(
  {
    name: 'reviewFlow',
    inputSchema: AiReviewInputSchema,
    outputSchema: AiReviewOutputSchema,
  },
  async (input) => {
    const { output } = await reviewPrompt(input);
    if (!output) {
      throw new Error('AI nije uspio generirati odgovor.');
    }
    return output;
  }
);


export async function reviewText(input: AiReviewInput): Promise<AiReviewOutput> {
    return reviewFlow(input);
}
