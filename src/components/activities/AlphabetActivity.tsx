'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();

  const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';
    return {
      title: isSerbian ? 'Azbuka i reči' : 'Abeceda i riječi',
      description: isSerbian ? 'Pregled slova azbuke sa primerima reči.' : 'Pregled slova abecede s primjerima riječi.',
    };
  };

  const s = getStrings(language);
  const alphabetWords = (language && grade && data[language]?.[grade]?.alphabetWords) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
        <p className="text-muted-foreground mb-6">{s.description}</p>
        <ScrollArea className="h-[70vh] pr-4">
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
