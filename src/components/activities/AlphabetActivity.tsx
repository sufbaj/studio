
'use client';

import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AlphabetActivity() {
  const { language, grade } = useAppContext();
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const s_map = {
    bosnian: {
      alphabetTitle: 'Abeceda',
      alphabetDescription: 'Klikni na slovo da čuješ izgovor i vidiš primjer.',
      wordsTitle: 'Primjeri riječi',
      wordsDescription: 'Pregled riječi za svako slovo.',
    },
    croatian: {
      alphabetTitle: 'Abeceda',
      alphabetDescription: 'Klikni na slovo da čuješ izgovor i vidiš primjer.',
      wordsTitle: 'Primjeri riječi',
      wordsDescription: 'Pregled riječi za svako slovo.',
    },
    serbian: {
      alphabetTitle: 'Azbuka',
      alphabetDescription: 'Klikni na slovo da čuješ izgovor i vidiš primer.',
      wordsTitle: 'Primeri reči',
      wordsDescription: 'Pregled reči za svako slovo.',
    },
  };

  const s = (language && s_map[language]) || s_map.bosnian;

  const alphabet = (language && grade && data[language]?.[grade]?.alphabet) || [];
  const alphabetWords = (language && grade && data[language]?.[grade]?.alphabetWords) || [];

  if (!language || !grade) {
    return null;
  }

  const handleLetterClick = (letter: [string, string] | string) => {
    const letterToSpeak = Array.isArray(letter) ? letter[0] : letter;
    setActiveLetter(letterToSpeak);
    try {
      const utterance = new SpeechSynthesisUtterance(letterToSpeak);
      utterance.lang = language === 'bosnian' ? 'bs' : language === 'croatian' ? 'hr' : 'sr-Latn';
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis not supported or failed.", error);
    }
    setTimeout(() => setActiveLetter(null), 500);
  };

  const cardVariants = {
    initial: { scale: 1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
    hover: { scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  };

  const gradientClasses = [
    'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50',
    'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50',
    'from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50',
    'from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50',
    'from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50',
    'from-pink-100 to-pink-200 dark:from-pink-900/50 dark:to-pink-800/50',
    'from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50',
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-3xl font-headline font-bold mb-2">{s.alphabetTitle}</h2>
        <p className="text-muted-foreground mb-6">{s.alphabetDescription}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {alphabet.map(({ letter, exampleWord }, index) => {
            const letterKey = Array.isArray(letter) ? letter[0] : letter;
            return (
              <motion.div
                key={`${letterKey}-${index}`}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleLetterClick(letter)}
              >
                <Card className={cn(
                  "flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-300 relative bg-gradient-to-br",
                  gradientClasses[index % gradientClasses.length],
                  activeLetter === letterKey && 'ring-4 ring-primary ring-offset-2 dark:ring-offset-background'
                )}>
                  <CardHeader className="p-4 pb-2 w-full">
                    <div className="flex justify-around items-baseline w-full">
                      <p className="text-5xl font-headline font-bold text-gray-800 dark:text-gray-100">
                        {Array.isArray(letter) ? letter[0] : letter}
                      </p>
                      <p className="text-3xl text-gray-600 dark:text-gray-300">
                        {Array.isArray(letter) ? letter[1] : ''}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 w-full flex flex-col items-center gap-2">
                    <p className="font-semibold text-lg text-foreground mt-2">{exampleWord}</p>
                  </CardContent>
                  <div className="absolute bottom-2 right-2 text-muted-foreground/50">
                    <Volume2 size={16} />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-3xl font-headline font-bold mb-2">{s.wordsTitle}</h2>
        <p className="text-muted-foreground mb-6">{s.wordsDescription}</p>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {alphabetWords.map(({ letter, words }, index) => (
              <Card key={`${letter}-${index}`} className="flex flex-col bg-card/50">
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
