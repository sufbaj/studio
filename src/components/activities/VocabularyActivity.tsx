'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { data } from '@/lib/data';
import type { VocabularyItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

type QuizOption = {
  word: string;
  isCorrect: boolean;
};

type QuizItem = {
  item: VocabularyItem;
  options: QuizOption[];
};

export function VocabularyActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore } = useAppContext();
  const { toast } = useToast();
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const generateQuiz = useCallback(() => {
    if (!language || !grade) return;

    const vocabularyList = data[language][grade].vocabulary;
    if (vocabularyList.length < 4) {
      setQuizItems([]);
      return;
    }
    
    resetScore();

    const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, Math.min(10, shuffled.length));
    
    setMaxScore(selectedItems.length * 10);

    const newQuizItems = selectedItems.map((item) => {
      const distractors = vocabularyList
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
  }, [language, grade, setMaxScore, resetScore]);

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
      toast({
        title: 'Rätt svar!',
        description: '+10 poäng',
      });
    } else {
      toast({
        title: 'Fel svar!',
        description: 'Försök igen på nästa!',
        variant: 'destructive',
      });
    }

    setTimeout(() => {
      if (currentItemIndex < quizItems.length - 1) {
        setCurrentItemIndex((prev) => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        // End of quiz
      }
    }, 1500);
  };
  
  const currentQuizItem = useMemo(() => quizItems[currentItemIndex], [quizItems, currentItemIndex]);

  const getLanguageDisplayName = () => {
    if (!language) return '';
    switch (language) {
      case 'bosnian':
        return 'bosanskom';
      case 'croatian':
        return 'hrvatskom';
      case 'serbian':
        return 'srpskom';
      default:
        return '';
    }
  }

  if (!language || !grade || quizItems.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Ordförråd</h2>
        <p>Inget ordförråd tillgängligt för valda inställningar.</p>
      </div>
    );
  }

  const progress = (currentItemIndex / quizItems.length) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Ordförråd</h2>
        <Button onClick={generateQuiz} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === 'serbian' ? 'Nove vežbe' : 'Nove vježbe'}
        </Button>
      </div>
      
      <Progress value={progress} className="mb-6" />

      {currentItemIndex < quizItems.length ? (
        <AnimatePresence mode="wait">
        <motion.div
          key={currentItemIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-6 flex flex-col justify-center items-center bg-muted/50">
                   <Image
                    src={currentQuizItem.item.image}
                    alt={currentQuizItem.item.translation}
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md mb-4"
                    data-ai-hint={currentQuizItem.item['data-ai-hint']}
                  />
                  <div className="text-center">
                    <p className="text-muted-foreground">Kako se ovo zove na {getLanguageDisplayName()}?</p>
                    <p className="text-2xl font-bold font-headline">{currentQuizItem.item.translation}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuizItem.options.map((option) => (
                      <Button
                        key={option.word}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        variant="outline"
                        className={`h-24 text-lg relative ${
                          isAnswered && option.isCorrect ? 'bg-green-200 border-green-500' : ''
                        } ${
                          isAnswered && !option.isCorrect && selectedAnswer?.word === option.word ? 'bg-red-200 border-red-500' : ''
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
                  <Button variant="ghost" size="icon" className="mt-6" disabled>
                    <Volume2 />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        </AnimatePresence>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Bra jobbat!</h3>
            <p className="text-lg mb-6">Du fick {correctAnswers} av {quizItems.length} rätt.</p>
            <Button onClick={generateQuiz}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Spela igen
            </Button>
        </Card>
      )}

    </div>
  );
}
