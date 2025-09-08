'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();

  const alphabet = (language && grade && data[language][grade].alphabet) || [];

  if (!language || !grade) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-headline font-bold mb-4">Alfabet</h2>
      <p className="text-muted-foreground mb-6">
        Pregledajte slova abecede.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {alphabet.map(({ letter }, index) => {
          return (
            <Card
              key={index}
              className="transition-colors"
            >
              <CardContent className="flex flex-col items-center justify-center p-4 aspect-square">
                <div className="flex items-baseline">
                   <span className="text-4xl md:text-5xl font-bold font-headline">
                    {Array.isArray(letter) ? letter[0] : letter}
                   </span>
                   <span className="text-3xl md:text-4xl font-headline text-muted-foreground">
                    {Array.isArray(letter) ? letter[1] : ''}
                   </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
