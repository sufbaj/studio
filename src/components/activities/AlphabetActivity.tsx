
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImages, setImage } from '@/lib/db';
import type { Language, Grade } from '@/lib/types';

function getStorageKey(language: Language | null, grade: Grade | null, letterKey: string) {
  if (!language || !grade) return null;
  return `alphabet-${language}-${grade}-${letterKey}`;
}

export function AlphabetActivity() {
  const { language, grade, viewMode } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLetterKey, setSelectedLetterKey] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const isTeacherMode = viewMode === 'teacher';

  useEffect(() => {
    if (!language || !grade) return;
    
    const alphabet = data[language]?.[grade]?.alphabet || [];
    const keys = alphabet.map(item => {
        const letterKey = (Array.isArray(item.letter) ? item.letter[0] : item) as string;
        return getStorageKey(language, grade, letterKey.toLowerCase()) || '';
    }).filter(Boolean);

    getImages(keys).then(images => {
        setCustomImages(images);
    });

  }, [language, grade]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0 || !selectedLetterKey) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      const storageKey = getStorageKey(language, grade, selectedLetterKey);
      if (storageKey) {
        setImage(storageKey, base64String).then(() => {
          setCustomImages(prev => ({ ...prev, [storageKey]: base64String }));
        });
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleCardClick = (letterKey: string) => {
    if (!isTeacherMode) return;
    setSelectedLetterKey(letterKey.toLowerCase());
    fileInputRef.current?.click();
  };

  const getStrings = (language: 'bosnian' | 'croatian' | 'serbian' | null) => {
    const isSerbian = language === 'serbian';

    let title = 'Abeceda';
    if (isSerbian) title = 'Azbuka';

    return {
      title: title,
      description: isSerbian
        ? 'Pregled slova azbuke sa primerima reči.'
        : 'Pregled slova abecede s primjerima riječi.',
    };
  };

  const s = getStrings(language);
  const alphabet = (language && grade && data[language]?.[grade]?.alphabet) || [];

  if (!language || !grade) {
    return null;
  }

  const getImageForLetter = (letter: string) => {
    const lowerCaseLetter = letter.toLowerCase();
    const storageKey = getStorageKey(language, grade, lowerCaseLetter);
    
    if (storageKey && customImages[storageKey]) {
        return customImages[storageKey];
    }
    
    const images = placeholderImages.alphabet as Record<string, string>;
    return images[lowerCaseLetter] || `https://picsum.photos/seed/${lowerCaseLetter}/200/200`;
  }

  return (
    <div>
      {isTeacherMode && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      )}
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
        <p className="text-muted-foreground mb-6">{s.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {alphabet.map(({ letter, exampleWord }, index) => {
            const letterKey = (Array.isArray(letter) ? letter[0] : letter) as string;
            const imageUrl = getImageForLetter(letterKey);

            return (
              <Card 
                key={index} 
                className={cn("transition-shadow hover:shadow-lg", isTeacherMode && "cursor-pointer")}
                onClick={() => isTeacherMode && handleCardClick(letterKey)}
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

                  <div className="w-24 h-24 bg-muted rounded-lg my-2 flex items-center justify-center p-0 overflow-hidden relative group">
                    <Image
                      src={imageUrl}
                      alt={exampleWord}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                    {isTeacherMode && (
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <PlusCircle className="w-8 h-8 text-white" />
                       </div>
                    )}
                  </div>

                  <p className="font-semibold text-lg text-center">{exampleWord}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
