'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { Language, Grade } from '@/lib/types';

type ViewMode = 'teacher' | 'student';

interface AppContextType {
  language: Language | null;
  grade: Grade | null;
  score: number;
  maxScore: number;
  viewMode: ViewMode;
  setSettings: (lang: Language, gr: Grade, view?: ViewMode) => void;
  updateScore: (points: number) => void;
  setMaxScore: (max: number) => void;
  resetScore: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('teacher');

  const setSettings = useCallback((lang: Language, gr: Grade, view: ViewMode = 'teacher') => {
    setLanguage(lang);
    setGrade(gr);
    setViewMode(view);
    setScore(0);
    setMaxScore(0);
  }, []);

  const updateScore = useCallback((points: number) => {
    setScore((prevScore) => prevScore + points);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
    setMaxScore(0);
  }, []);

  return (
    <AppContext.Provider value={{ language, grade, score, maxScore, viewMode, setSettings, updateScore, setMaxScore, resetScore }}>
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
