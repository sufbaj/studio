
'use client';

import { useState, useRef, type ChangeEvent, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images.json';


const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isBosnian = language === 'bosnian';
    const isSerbian = language === 'serbian';

    let title = 'Abeceda';
    if (isSerbian) title = 'Azbuka';
    
    return {
        title: title,
        description: isSerbian
            ? 'Pregled slova azbuke sa primerima reči.'
            : 'Pregled slova abecede s primjerima riječi.',
        dictionaryTitle: "Rječnik po slovima",
        dictionaryDescription: "Klikni na slovo da vidiš primjere riječi."
    };
}


export function AlphabetActivity() {
  const { language, grade } = useAppContext();
  const s = getStrings(language);

  const alphabet = (language && grade && data[language][grade].alphabet) || [];
  const alphabetWords = (language && data[language]['1-3'].alphabetWords) || [];

  if (!language || !grade) {
    return null;
  }

  const getImageForLetter = (letter: string) => {
    const lowerCaseLetter = letter.toLowerCase();
    const images = placeholderImages.alphabet as Record<string, string>;
    return images[lowerCaseLetter] || `https://picsum.photos/seed/${lowerCaseLetter}/200/200`;
  }

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
        <p className="text-muted-foreground mb-6">
          {s.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {alphabet.map(({ letter, exampleWord }, index) => {
            const letterKey = (Array.isArray(letter) ? letter[0] : letter) as string;
            const imageUrl = getImageForLetter(letterKey);
            
            return (
              <Card
                key={index}
                className="transition-shadow hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-between p-4 aspect-square">
                  <div className="flex items-baseline">
                    <span className="text-5xl md:text-6xl font-bold font-headline">
                      {Array.isArray(letter) ? letter[0] : letter}
                    </span>
                    <span className="text-4xl md:text-5xl font-headline text-muted-foreground">
                      {Array.isArray(letter) ? letter[1] : ''}
                    </span>
                  </div>
                  
                  <div className="w-24 h-24 bg-muted rounded-lg my-2 flex items-center justify-center p-0 overflow-hidden">
                    <Image 
                      src={imageUrl} 
                      alt={exampleWord} 
                      width={96} 
                      height={96} 
                      className="object-cover w-full h-full" 
                      data-ai-hint={exampleWord.toLowerCase()}
                    />
                  </div>

                  <p className="font-semibold text-lg text-center">{exampleWord}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div>
         <h2 className="text-3xl font-headline font-bold mb-4">{s.dictionaryTitle}</h2>
         <p className="text-muted-foreground mb-6">
            {s.dictionaryDescription}
         </p>

         <Accordion type="single" collapsible className="w-full">
            {alphabetWords.map(({letter, words}) => (
                <AccordionItem value={letter} key={letter}>
                    <AccordionTrigger className="text-2xl font-headline font-bold">
                        {letter}
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc pl-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-2">
                           {words.map((word, index) => (
                             <li key={`${word}-${index}`} className="text-base">{word}</li>
                           ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
         </Accordion>
      </div>

    </div>
  );
}
