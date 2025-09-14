'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';
    return {
        title: isSerbian ? 'Alfabet (latinica)' : 'Alfabet (latinsko pismo)',
        description: isSerbian
            ? 'Ovde je pregled slova azbuke, zajedno sa primerima reči.'
            : 'Ovdje je pregled slova abecede, zajedno s primjerima riječi.',
    };
}


export function AlphabetActivity() {
  const { language, grade } = useAppContext();
  const s = getStrings(language);

  const alphabet = (language && grade && data[language][grade].alphabet) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
      <p className="text-muted-foreground mb-6">
        {s.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {alphabet.map(({ letter, exampleWord }, index) => {
          return (
            <Card
              key={index}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center justify-center p-4 aspect-square">
                <div className="flex items-baseline">
                   <span className="text-5xl md:text-6xl font-bold font-headline">
                    {Array.isArray(letter) ? letter[0] : letter}
                   </span>
                   <span className="text-4xl md:text-5xl font-headline text-muted-foreground">
                    {Array.isArray(letter) ? letter[1] : ''}
                   </span>
                </div>
                <p className="mt-3 font-semibold text-lg">{exampleWord}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
