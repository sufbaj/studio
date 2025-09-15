'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import type { Grade } from '@/lib/types';

const grades: { id: Grade; label: string }[] = [
  { id: '1-3', label: '1. - 3. razred' },
  { id: '4-6', label: '4. - 6. razred' },
  { id: '7-9', label: '7. - 9. razred' },
];

export function HomePage() {
  const router = useRouter();

  const handleGradeSelect = (grade: Grade) => {
    router.push(`/learn?grade=${grade}&lang=bosnian`);
  };
  
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
          <h1 className="text-5xl font-headline font-bold tracking-tight text-gray-800 dark:text-gray-100">LinguaBos</h1>
        </div>
        <p className="text-xl text-muted-foreground">Platforma za učenje bosanskog jezika.</p>
      </div>

      <div className="w-full max-w-4xl">
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
      </div>

    </main>
  );
}
