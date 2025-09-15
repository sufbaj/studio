'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { getAllImages, setImage } from '@/lib/db';
import type { Language, Grade } from '@/lib/types';


const getStorageKey = (language: Language, grade: Grade, letterKey: string) => {
    return `alphabet-${language}-${grade}-${letterKey}`;
}

export function AlphabetActivity() {
  const { language, grade, viewMode } = useAppContext();
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLetterKey, setSelectedLetterKey] = useState<string | null>(null);

  const isTeacherMode = viewMode === 'teacher';

  const loadImagesFromDB = useCallback(async () => {
    if (!language || !grade) return;
    const allImages = await getAllImages();
    const newLocalImages: Record<string, string> = {};
    for (const img of allImages) {
        // key is e.g. alphabet-bosnian-1-3-a
        const keyParts = img.id.split('-');
        if (keyParts[0] === 'alphabet' && keyParts[1] === language && keyParts[2] === grade) {
            newLocalImages[keyParts[3]] = img.dataUrl;
        }
    }
    setLocalImages(newLocalImages);
  }, [language, grade]);

  useEffect(() => {
    loadImagesFromDB();
  }, [loadImagesFromDB]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && selectedLetterKey && language && grade) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const storageKey = getStorageKey(language, grade, selectedLetterKey);
        setImage(storageKey, dataUrl).then(() => {
            setLocalImages(prev => ({...prev, [selectedLetterKey]: dataUrl}));
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (letterKey: string) => {
    if (isTeacherMode) {
      setSelectedLetterKey(letterKey);
      fileInputRef.current?.click();
    } else {
        const imageUrl = localImages[letterKey] || (placeholderImages.alphabet as Record<string,string>)[letterKey] || `https://picsum.photos/seed/${letterKey}/200/200`;
         if (imageUrl) {
            const win = window.open("", "_blank");
            if (win) {
                win.document.write(`<img src="${imageUrl}" style="max-width:100%; height:auto;">`);
                win.document.close();
            }
        }
    }
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
    return localImages[lowerCaseLetter] || (placeholderImages.alphabet as Record<string,string>)[lowerCaseLetter] || null;
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <div className="mb-12">
        <h2 className="text-3xl font-headline font-bold mb-4">{s.title}</h2>
        <p className="text-muted-foreground mb-6">{s.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {alphabet.map(({ letter, exampleWord }, index) => {
            const letterKey = (Array.isArray(letter) ? letter[0] : letter).toLowerCase() as string;
            const imageUrl = getImageForLetter(letterKey);

            return (
              <Card 
                key={index} 
                className="transition-shadow hover:shadow-lg overflow-hidden"
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

                  <div 
                    onClick={() => handleImageClick(letterKey)}
                    className={cn(
                        "w-24 h-24 bg-muted rounded-lg my-2 flex items-center justify-center p-0 overflow-hidden relative group",
                        isTeacherMode && "cursor-pointer"
                    )}
                  >
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={exampleWord}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                       isTeacherMode && (
                        <div className="flex flex-col items-center text-muted-foreground">
                            <Plus className="w-8 h-8" />
                            <span className='text-xs'>Dodaj sliku</span>
                        </div>
                       )
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
