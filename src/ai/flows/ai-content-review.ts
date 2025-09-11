'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AiReviewInputSchema = z.object({
  text: z.string().describe('Tekst koji treba pregledati.'),
  language: z.enum(['Swedish', 'Bosnian', 'Croatian', 'Serbian']).describe('Ciljni jezik za prijevod i analizu.'),
});
export type AiReviewInput = z.infer<typeof AiReviewInputSchema>;

const AiReviewOutputSchema = z.object({
  translation: z.string().describe('Prijevod originalnog teksta. Ako je originalni tekst na švedskom, prevedi ga na ciljni jezik (bosanski, hrvatski ili srpski). Ako je originalni tekst na jednom od BHS jezika, prevedi ga na švedski.'),
  correctedText: z.string().describe('Ispravljena verzija originalnog teksta, s ispravljenim gramatičkim i pravopisnim greškama.'),
  feedback: z.string().describe('Detaljne, ali jasne povratne informacije o greškama u originalnom tekstu. Objasni zašto su ispravke napravljene. Svaku novu rečenicu započni u novom redu.'),
});
export type AiReviewOutput = z.infer<typeof AiReviewOutputSchema>;

const reviewPrompt = ai.definePrompt({
    name: 'reviewPrompt',
    input: { schema: AiReviewInputSchema },
    output: { schema: AiReviewOutputSchema },
    prompt: `Ti si stručnjak za jezike, specijaliziran za bosanski, hrvatski, srpski i švedski.
    Tvoj zadatak je da analiziraš tekst koji ti korisnik pošalje.

    Analiza treba sadržavati tri dijela, ovim redoslijedom:
    1.  Ispravljeni tekst:
        - Pažljivo pregledaj originalni tekst i ispravi sve gramatičke i pravopisne greške.
        - Ako nema grešaka, vrati originalni tekst.
    2.  Povratne informacije:
        - Pruži detaljne, ali jasne i precizne povratne informacije bez suvišnih detalja. Fokusiraj se na najvažnije ispravke (gramatiku, pravopis, stil).
        - Svaku novu rečenicu ili objašnjenje započni u novom redu kako bi tekst bio pregledan.
        - Ako nema grešaka, napiši "Tekst je ispravan."
    3.  Prijevod:
        - Ako je originalni tekst na švedskom, prevedi ga na ciljni jezik: {{language}}.
        - Ako je originalni tekst na jednom od BHS jezika (bosanski, hrvatski, srpski), prevedi ga na švedski.
    
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
