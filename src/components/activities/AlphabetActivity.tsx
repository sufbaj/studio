'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { setImage, getAllImages } from '@/lib/db';
import placeholderImages from '@/lib/placeholder-images.json';

type AlphabetImages = Record<string, string>;

const getStorageKey = (language: string | null, grade: string | null, letterKey: string): string | null => {
  if (!language || !grade) return null;
  return `alphabet-${language}-${grade}-${letterKey}`;
};

export function AlphabetActivity() {
  const { language, grade, viewMode } = useAppContext();
  const [images, setImages] = useState<AlphabetImages>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadImagesFromDB = useCallback(async () => {
    if (!language || !grade) return;
    try {
      const allImages = await getAllImages();
      const loadedImages: AlphabetImages = {};
      allImages.forEach(img => {
        loadedImages[img.id] = img.dataUrl;
      });
      setImages(loadedImages);
    } catch (error) {
      console.error("Failed to load images from DB", error);
    }
  }, [language, grade]);

  useEffect(() => {
    loadImagesFromDB();
  }, [loadImagesFromDB]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, letterKey: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result as string;
      const storageKey = getStorageKey(language, grade, letterKey);
      if (storageKey) {
        try {
          await setImage(storageKey, dataUrl);
          setImages(prev => ({ ...prev, [storageKey]: dataUrl }));
        } catch (error) {
          console.error("Failed to save image to DB", error);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (letterKey: string) => {
    if (viewMode === 'teacher') {
      fileInputRefs.current[letterKey]?.click();
    }
  };

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
              const storageKey = getStorageKey(language, grade, letterKey);
              const placeholderKey = letterKey as keyof typeof placeholderImages.alphabet;
              const imageSrc = (storageKey && images[storageKey]) || placeholderImages.alphabet[placeholderKey]?.url;
              const hint = placeholderImages.alphabet[placeholderKey]?.hint;

              return (
              <Card key={`${letterKey}-${index}`} className="flex flex-col items-center justify-center text-center">
                  <CardHeader className="p-0 pt-4">
                      <CardTitle className="text-5xl font-headline font-bold text-primary">
                        {Array.isArray(letter) ? letter[0] : letter}
                      </CardTitle>
                      <p className="text-3xl text-muted-foreground">
                        {Array.isArray(letter) ? letter[1] : ''}
                      </p>
                  </CardHeader>
                  <CardContent className="p-4 w-full aspect-square">
                      <div
                          className={cn(
                              "w-full h-full rounded-md border-2 border-dashed flex items-center justify-center bg-muted/50 relative overflow-hidden",
                              viewMode === 'teacher' && "cursor-pointer hover:border-primary hover:bg-muted"
                          )}
                          onClick={() => handleImageClick(letterKey)}
                      >
                          {imageSrc ? (
                              <Image
                                  src={imageSrc}
                                  alt={`Slika za slovo ${letterKey}: ${exampleWord}`}
                                  fill
                                  sizes="200px"
                                  className="object-cover"
                                  data-ai-hint={hint}
                              />
                          ) : (
                              viewMode === 'teacher' && <PlusCircle className="w-10 h-10 text-muted-foreground" />
                          )}
                          {viewMode === 'teacher' && (
                              <input
                                  type="file"
                                  ref={el => fileInputRefs.current[letterKey] = el}
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(e, letterKey)}
                              />
                          )}
                      </div>
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
