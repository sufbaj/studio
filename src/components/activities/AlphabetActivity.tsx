'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();

  const s = {
    alphabetTitle: language === 'serbian' ? 'Azbuka' : 'Abeceda',
    alphabetDescription: language === 'serbian' ? 'Pregled slova azbuke i primera.' : 'Pregled slova abecede i primjera.',
    wordsTitle: language === 'serbian' ? 'Primeri reči' : 'Primjeri riječi',
    wordsDescription: language === 'serbian' ? 'Pregled reči za svako slovo.' : 'Pregled riječi za svako slovo.',
  };
  
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {alphabet.map(({ letter, exampleWord }, index) => {
              const letterKey = Array.isArray(letter) ? letter[0] : letter;
              const placeholderKey = letterKey as keyof typeof placeholderImages.alphabet;
              const imageSrc = placeholderImages.alphabet[placeholderKey]?.url;
              const hint = placeholderImages.alphabet[placeholderKey]?.hint;

              return (
              <Card key={`${letterKey}-${index}`} className="flex flex-col items-center justify-center text-center">
                  <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-5xl font-headline font-bold text-primary">
                        {Array.isArray(letter) ? letter[0] : letter}
                      </CardTitle>
                      <p className="text-3xl text-muted-foreground">
                        {Array.isArray(letter) ? letter[1] : ''}
                      </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 w-full flex flex-col items-center gap-2">
                      <div className="w-full aspect-square rounded-md border-2 border-dashed flex items-center justify-center bg-muted/50 relative overflow-hidden">
                          {imageSrc && (
                              <Image
                                  src={imageSrc}
                                  alt={`Slika za slovo ${letterKey}`}
                                  width={600}
                                  height={400}
                                  className="object-cover w-full h-full"
                                  data-ai-hint={hint}
                              />
                          )}
                      </div>
                      <p className="font-semibold text-lg text-foreground mt-2">{exampleWord}</p>
                  </CardContent>
              </Card>
            )})}
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
