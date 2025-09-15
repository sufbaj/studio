'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();

  const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';
    return {
      title: isSerbian ? 'Azbuka i reči' : 'Abeceda i riječi',
      alphabetTitle: isSerbian ? 'Azbuka' : 'Abeceda',
      alphabetDescription: isSerbian ? 'Pregled slova azbuke.' : 'Pregled slova abecede.',
      wordsTitle: isSerbian ? 'Primeri reči' : 'Primjeri riječi',
      wordsDescription: isSerbian ? 'Pregled reči za svako slovo.' : 'Pregled riječi za svako slovo.',
    };
  };

  const s = getStrings(language);
  const alphabet = (language && grade && data[language]?.[grade]?.alphabet) || [];
  const alphabetWords = (language && grade && data[language]?.[grade]?.alphabetWords) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-3xl font-headline font-bold mb-2">{s.alphabetTitle}</h2>
        <p className="text-muted-foreground mb-6">{s.alphabetDescription}</p>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
            {alphabet.map(({ letter }, index) => (
              <Card key={`${letter}-${index}`} className="flex flex-col items-center justify-center aspect-square">
                  <CardTitle className="text-3xl sm:text-4xl font-headline font-bold text-primary text-center">
                    {Array.isArray(letter) ? letter[0] : letter}
                  </CardTitle>
                  <p className="text-xl sm:text-2xl text-muted-foreground">
                    {Array.isArray(letter) ? letter[1] : ''}
                  </p>
              </Card>
            ))}
        </div>
      </div>
      
      <Separator />

      <div>
        <h2 className="text-3xl font-headline font-bold mb-2">{s.wordsTitle}</h2>
        <p className="text-muted-foreground mb-6">{s.wordsDescription}</p>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {alphabetWords.map(({ letter, words }, index) => (
              <Card key={`${letter}-${index}`} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-5xl font-headline font-bold text-primary">
                    {letter}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {words.map((word, wordIndex) => (
                      <li key={wordIndex} className="text-lg">{word}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
