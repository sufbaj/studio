'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Language, Grade } from '@/lib/types';

interface AppContextType {
  language: Language | null;
  grade: Grade | null;
  score: number;
  setSettings: (lang: Language, gr: Grade) => void;
  updateScore: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [score, setScore] = useState(0);

  const setSettings = useCallback((lang: Language, gr: Grade) => {
    setLanguage(lang);
    setGrade(gr);
    setScore(0); // Reset score when settings change
  }, []);

  const updateScore = useCallback((points: number) => {
    setScore((prevScore) => prevScore + points);
  }, []);

  return (
    <AppContext.Provider value={{ language, grade, score, setSettings, updateScore }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
