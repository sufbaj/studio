'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();

  const alphabet = (language && grade && data[language][grade].alphabet) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">Alfabet (latinskt)</h2>
      <p className="text-muted-foreground mb-6">
        Se en översikt över alfabetets bokstäver, tillsammans med exempelord och bilder.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {alphabet.map(({ letter, exampleWord, exampleImage }, index) => {
          return (
            <Card
              key={index}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center justify-start p-4 aspect-square">
                <div className="flex items-baseline">
                   <span className="text-4xl md:text-5xl font-bold font-headline">
                    {Array.isArray(letter) ? letter[0] : letter}
                   </span>
                   <span className="text-3xl md:text-4xl font-headline text-muted-foreground">
                    {Array.isArray(letter) ? letter[1] : ''}
                   </span>
                </div>
                 <div className="relative w-full h-24 mt-2 rounded-md overflow-hidden">
                    <Image 
                        src={exampleImage} 
                        alt={exampleWord} 
                        width={200}
                        height={200}
                        className="object-cover"
                        data-ai-hint={exampleWord.toLowerCase()}
                    />
                 </div>
                <p className="mt-3 font-semibold">{exampleWord}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
