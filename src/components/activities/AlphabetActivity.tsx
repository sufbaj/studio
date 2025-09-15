
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
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeLetterIndex, setActiveLetterIndex] = useState<number | null>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  const alphabet = (language && grade && data[language][grade].alphabet) || [];
  const alphabetWords = (language && data[language]['1-3'].alphabetWords) || [];

  const storageKey = language && grade ? `alphabetImages-${language}-${grade}` : null;

  useEffect(() => {
    const loadImages = async () => {
      if (!storageKey) return;
      const storedImages = await db.get(storageKey);
      if (storedImages) {
        setImages(storedImages);
      }
    };
    loadImages();
  }, [storageKey]);

  if (!language || !grade) {
    return null;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && activeLetterIndex !== null && storageKey) {
      const letterKey = Array.isArray(alphabet[activeLetterIndex].letter) ? alphabet[activeLetterIndex].letter[0] : alphabet[activeLetterIndex].letter as string;
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const result = reader.result as string;
        const newImages = {
          ...images,
          [letterKey]: result
        };
        setImages(newImages);
        try {
          await db.set(storageKey, newImages);
        } catch (error) {
            console.error("Failed to save images to IndexedDB", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceholderClick = (index: number) => {
    setActiveLetterIndex(index);
    fileInputRef.current?.click();
  };

  return (
    <div>
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
        <p className="text-muted-foreground mb-6">
          {s.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {alphabet.map(({ letter, exampleWord }, index) => {
            const letterKey = Array.isArray(letter) ? letter[0] : letter as string;
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

                  <Button
                    variant="ghost"
                    className="w-24 h-24 bg-muted rounded-lg my-2 flex items-center justify-center p-0 overflow-hidden"
                    onClick={() => handlePlaceholderClick(index)}
                  >
                    {images[letterKey] ? (
                      <Image src={images[letterKey]} alt={exampleWord} width={96} height={96} className="object-cover w-full h-full" />
                    ) : (
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    )}
                  </Button>

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
