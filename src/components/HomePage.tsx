'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { Grade, Language } from '@/lib/types';

const grades: { id: Grade; label: string }[] = [
  { id: '1-3', label: '1. - 3. razred' },
  { id: '4-6', label: '4. - 6. razred' },
  { id: '7-9', label: '7. - 9. razred' },
];

const languages: { id: Language; label: string }[] = [
  { id: 'bosnian', label: 'Bosanski' },
  { id: 'croatian', label: 'Hrvatski' },
  { id: 'serbian', label: 'Srpski' },
];

export function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<'grade' | 'language'>('grade');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleGradeSelect = (grade: Grade) => {
    setSelectedGrade(grade);
    setStep('language');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleStart = () => {
    if (selectedGrade && selectedLanguage) {
      router.push(`/learn?grade=${selectedGrade}&lang=${selectedLanguage}`);
    }
  };

  const handleBack = () => {
    setStep('grade');
    setSelectedLanguage(null);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Logo className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-headline font-bold tracking-tight text-gray-800 dark:text-gray-100">LinguaBKS</h1>
        </div>
        <p className="text-xl text-muted-foreground">Platforma za učenje bosanskog, hrvatskog i srpskog jezika.</p>
      </div>

      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 'grade' && (
            <motion.div key="grade" initial="hidden" animate="visible" exit="exit">
              <h2 className="text-3xl font-headline font-semibold text-center mb-8 text-gray-700 dark:text-gray-200">Prvo odaberite svoj razred</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {grades.map((grade, i) => (
                  <motion.div key={grade.id} custom={i} variants={cardVariants}>
                    <Card
                      onClick={() => handleGradeSelect(grade.id)}
                      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary bg-white/50 backdrop-blur-sm"
                    >
                      <CardHeader>
                        <CardTitle className="text-center text-2xl font-semibold">{grade.label}</CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'language' && (
            <motion.div key="language" initial="hidden" animate="visible" exit="exit">
               <h2 className="text-3xl font-headline font-semibold text-center mb-8 text-gray-700 dark:text-gray-200">Koji jezik želite vježbati?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {languages.map((lang, i) => (
                  <motion.div key={lang.id} custom={i} variants={cardVariants}>
                     <Card
                      onClick={() => handleLanguageSelect(lang.id)}
                      className={cn(
                        'cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/50 backdrop-blur-sm',
                        selectedLanguage === lang.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary'
                      )}
                    >
                      <CardHeader>
                        <CardTitle className="text-center text-2xl font-semibold">{lang.label}</CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
      {step === 'language' && (
        <motion.div
            className="flex items-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: 20 }}
        >
          <Button variant="outline" size="lg" onClick={handleBack} className="bg-white/80">
            Nazad
          </Button>
          <Button 
            size="lg"
            onClick={handleStart} 
            disabled={!selectedLanguage}
            className="bg-primary hover:bg-primary/90 shadow-lg"
          >
            Započni vježbe
          </Button>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="absolute bottom-4 text-xs text-muted-foreground">
        by sufjan bajrić
      </div>
    </main>
  );
}
