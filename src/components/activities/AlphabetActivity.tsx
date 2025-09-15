
'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Camera } from 'lucide-react';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [images, setImages] = useState<Record<string, string>>({});

  const isDevelopment = process.env.NODE_ENV === 'development';
  const storageKey = language && grade ? `alphabetImages-${language}-${grade}` : null;

  useEffect(() => {
    if (isDevelopment && storageKey) {
      try {
        const storedImages = localStorage.getItem(storageKey);
        if (storedImages) {
          setImages(JSON.parse(storedImages));
        } else {
          setImages(placeholderImages.alphabet);
        }
      } catch (error) {
        console.error("Failed to load images from localStorage", error);
        setImages(placeholderImages.alphabet);
      }
    } else {
      setImages(placeholderImages.alphabet);
    }
  }, [storageKey, isDevelopment]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    letter: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = { ...images, [letter.toLowerCase()]: reader.result as string };
        setImages(newImages);
        if (isDevelopment && storageKey) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(newImages));
          } catch (error) {
            console.error("Failed to save images to localStorage", error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (letter: string) => {
    if (isDevelopment) {
      fileInputRefs.current[letter.toLowerCase()]?.click();
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
          dictionaryTitle: "Rječnik po slovima",
          dictionaryDescription: "Klikni na slovo da vidiš primjere riječi."
      };
  }
  
  const s = getStrings(language);
  const alphabet = (language && grade && data[language][grade].alphabet) || [];
  
  if (!language || !grade) {
    return null;
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
            const lowerCaseLetter = letterKey.toLowerCase();
            const imageUrl = images[lowerCaseLetter] || `https://picsum.photos/seed/${lowerCaseLetter}/200/200`;

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
                  
                  <div 
                    className="w-24 h-24 bg-muted rounded-lg my-2 flex items-center justify-center p-0 overflow-hidden relative group"
                    onClick={() => handleImageClick(letterKey)}
                    style={{ cursor: isDevelopment ? 'pointer' : 'default' }}
                  >
                    <Image 
                      src={imageUrl} 
                      alt={exampleWord} 
                      width={96} 
                      height={96} 
                      className="object-cover w-full h-full"
                    />
                    {isDevelopment && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    )}
                     <input
                        type="file"
                        ref={(el) => (fileInputRefs.current[lowerCaseLetter] = el)}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, letterKey)}
                      />
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
