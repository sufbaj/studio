'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';
import { vocabularyData } from '@/lib/vocabulary';
import type { VocabularyItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/types';

type QuizOption = {
  word: string;
  isCorrect: boolean;
};

type QuizItem = {
  item: VocabularyItem;
  options: QuizOption[];
};

const s = {
    title: 'Vježbe riječi',
    subtitle: 'Proširi svoj vokabular kroz tematske kategorije.',
    noExercises: 'Nema dostupnih riječi za odabrane postavke.',
    newExercises: 'Nove vježbe',
    howToSay: 'Kako se kaže na bosanskom:',
    correctToastTitle: 'Tačno!',
    correctToastDescription: '+10 poena',
    incorrectToastTitle: 'Netačno!',
    incorrectToastDescription: 'Više sreće drugi put!',
    next: 'Dalje',
    showResults: 'Prikaži rezultate',
    finished: 'Bravo!',
    correctOutOf: (c: number, t: number) => `Imali ste ${c} od ${t} tačnih odgovora.`,
    playAgain: 'Igraj ponovo',
};

function VocabularyCategorySelection({ onSelectCategory, grade }: { onSelectCategory: (category: string) => void, grade: string }) {
    const { language } = useAppContext();
    
    const categories = useMemo(() => {
        if (!language || !grade || !vocabularyData[language] || !vocabularyData[language][grade]) {
            return [];
        }
        return Object.keys(vocabularyData[language][grade]).map(key => {
            const categoryInfo = vocabularyData[language][grade][key];
            return {
                id: key,
                title: categoryInfo.title,
                description: categoryInfo.description,
                swedish: categoryInfo.swedish,
            };
        });
    }, [language, grade]);

    return (
        <div>
            <h2 className="text-3xl font-headline font-bold mb-2">{s.title} - Razred {grade}</h2>
            <p className="text-muted-foreground mb-8">{s.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                    <Card 
                        key={category.id}
                        className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                        onClick={() => onSelectCategory(category.id)}
                    >
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                                <ArrowRight className="text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-2">{category.description}</p>
                            <p className="text-sm font-medium">Švedski: {category.swedish}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}


function VocabularyQuiz({ categoryId, onBack }: { categoryId: string, onBack: () => void }) {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateQuiz = useCallback(() => {
    if (!language || !grade || !vocabularyData[language]?.[grade]?.[categoryId]) return;

    const allVocabulary = Object.values(vocabularyData[language][grade]).flatMap(c => c.items);
    const categoryItems = vocabularyData[language][grade][categoryId].items;

    if (categoryItems.length < 4) {
      setQuizItems([]);
      return;
    }

    resetScore();

    const shuffled = [...categoryItems].sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, Math.min(10, shuffled.length));

    setMaxScore(selectedItems.length * 10);

    const newQuizItems = selectedItems.map((item) => {
      const distractors = allVocabulary
        .filter((v) => v.id !== item.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((v) => ({ word: v.word, isCorrect: false }));

      const options = [{ word: item.word, isCorrect: true }, ...distractors].sort(() => 0.5 - Math.random());
      return { item, options };
    });

    setQuizItems(newQuizItems);
    setCurrentItemIndex(0);
    setCorrectAnswers(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  }, [language, grade, categoryId, setMaxScore, resetScore]);

  useEffect(() => {
    generateQuiz();
  }, [generateQuiz]);

  const handleAnswer = (option: QuizOption) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(option);

    if (option.isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      updateScore(10);
    }
  };

  const nextQuestion = () => {
    if (currentItemIndex < quizItems.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    } else {
      setCurrentItemIndex(quizItems.length);
    }
  };

  const currentQuizItem = useMemo(() => quizItems[currentItemIndex], [quizItems, currentItemIndex]);
  
  if (!language || !grade || quizItems.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">{s.title}</h2>
        <p>{s.noExercises}</p>
      </div>
    );
  }

  const progress = (currentItemIndex / quizItems.length) * 100;
  const isQuizFinished = currentItemIndex >= quizItems.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
            <Button onClick={onBack} variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-3xl font-headline font-bold">{vocabularyData[language]?.[grade]?.[categoryId]?.title}</h2>
        </div>
         {!isQuizFinished && (
           <div className="text-lg font-semibold text-muted-foreground">
             {currentItemIndex + 1} / {quizItems.length}
           </div>
         )}
        <Button onClick={generateQuiz} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {s.newExercises}
        </Button>
      </div>
      
      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished ? (
        <AnimatePresence mode="wait">
        <motion.div
          key={currentItemIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
             <CardContent className="p-6 flex flex-col justify-center items-center bg-muted/50 min-h-[120px]">
              <div className="text-center">
                <p className="text-muted-foreground">{s.howToSay}</p>
                 <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold font-headline text-foreground">{currentQuizItem.item.translation}</p>
                 </div>
              </div>
            </CardContent>
             <CardContent className="p-6">
                 <div className="grid grid-cols-2 gap-4">
                    {currentQuizItem.options.map((option) => (
                      <Button
                        key={option.word}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        variant="outline"
                        className={`h-14 text-lg relative ${
                          isAnswered && option.isCorrect ? 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-900 dark:text-green-200' : ''
                        } ${
                          isAnswered && !option.isCorrect && selectedAnswer?.word === option.word ? 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-900 dark:text-red-200' : ''
                        }`}
                      >
                        {option.word}
                        {isAnswered && (
                          <span className="absolute top-2 right-2">
                            {option.isCorrect ? <CheckCircle className="text-green-600"/> : (selectedAnswer?.word === option.word && <XCircle className="text-red-600"/>)}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center justify-end mt-6">
                    {isAnswered && (
                      <Button onClick={nextQuestion} size="lg">
                         {currentItemIndex < quizItems.length - 1 ? s.next : s.showResults}
                      </Button>
                    )}
                  </div>
             </CardContent>
          </Card>
        </motion.div>
        </AnimatePresence>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">{s.finished}</h3>
            <p className="text-lg mb-6">{s.correctOutOf(correctAnswers, quizItems.length)}</p>
            <div className="flex gap-4 justify-center">
                <Button onClick={onBack} variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Nazad na kategorije
                </Button>
                <Button onClick={generateQuiz}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {s.playAgain}
                </Button>
            </div>
        </Card>
      )}

    </div>
  );
}

export function VocabularyActivity() {
    const { grade } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    }

    if (!grade) {
        return null; // or a loading state
    }
    
    if (!selectedCategory) {
        return <VocabularyCategorySelection onSelectCategory={setSelectedCategory} grade={grade} />;
    }

    return <VocabularyQuiz categoryId={selectedCategory} onBack={handleBackToCategories} />;
}
