'use client';

import { useState, useEffect, useCallback, useMemo, useRef }
from 'react';
import { motion }
from 'framer-motion';
import { useAppContext }
from '@/contexts/AppContext';
import { data }
from '@/lib/data';
import type { SentenceItem }
from '@/lib/types';
import { Button }
from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle }
from '@/components/ui/card';
import { RefreshCw, CheckCircle, XCircle, Volume2, Loader2 }
from 'lucide-react';
import { useToast }
from '@/hooks/use-toast';
import { Progress }
from '@/components/ui/progress';
import { cn }
from '@/lib/utils';
import { generateSpeechAction }
from '@/app/learn/actions';

const shuffleArray = < T, > (array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const EMPTY_SOUND_DATA_URI = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";


export function SentencesActivity() {
  const { language, grade, updateScore, setMaxScore, resetScore }
  = useAppContext();
  const { toast }
  = useToast();

  const [exercises, setExercises] = useState < SentenceItem[] > ([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [wordBank, setWordBank] = useState < string[] > ([]);
  const [answerWords, setAnswerWords] = useState < string[] > ([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState < boolean | null > (null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [playingText, setPlayingText] = useState < string | null > (null);
  const audioRef = useRef < HTMLAudioElement | null > (null);

  const currentExercise = useMemo(() => exercises[currentExerciseIndex], [exercises, currentExerciseIndex]);

  const handlePlaySound = useCallback(async (text: string) => {
    if (playingText) return;

    if (audioRef.current) {
      audioRef.current.src = EMPTY_SOUND_DATA_URI;
      audioRef.current.play().catch(() => {});
    }

    setPlayingText(text);

    try {
      const result = await generateSpeechAction({ text });
      if (result.error) {
        toast({ title: 'Greška', description: result.error, variant: 'destructive' });
      } else if (result.audioData) {
        if (audioRef.current) {
          audioRef.current.src = result.audioData;
          audioRef.current.play();
        }
      }
    } catch (error) {
      toast({ title: 'Greška pri reprodukciji', description: 'Nije uspjelo generiranje zvuka.', variant: 'destructive' });
    }
  }, [playingText, toast]);

  const handleAudioEnded = () => {
    setPlayingText(null);
  };

  const generateExercises = useCallback(() => {
    if (!language || !grade) return;
    resetScore();
    const sentenceList = data[language][grade].sentences;
    const shuffled = shuffleArray(sentenceList);
    const selectedExercises = shuffled.slice(0, Math.min(5, shuffled.length));
    setExercises(selectedExercises);
    setMaxScore(selectedExercises.length * 20);
    setCurrentExerciseIndex(0);
    setCorrectAnswers(0);
  }, [language, grade, setMaxScore, resetScore]);

  useEffect(() => {
    generateExercises();
  }, [generateExercises]);

  useEffect(() => {
    if (currentExercise) {
      setWordBank(shuffleArray(currentExercise.sentence.split(' ')));
      setAnswerWords([]);
      setIsAnswered(false);
      setIsCorrect(null);
    }
  }, [currentExercise]);

  const handleWordClick = (word: string, from: 'bank' | 'answer') => {
    if (isAnswered) return;
    if (from === 'bank') {
      setWordBank(wordBank.filter((w, i) => `${w}-${i}` !== `${word}-${wordBank.indexOf(word)}`));
      setAnswerWords([...answerWords, word]);
    } else {
      setAnswerWords(answerWords.filter((w, i) => `${w}-${i}` !== `${word}-${answerWords.indexOf(word)}`));
      setWordBank([...wordBank, word]);
    }
  };

  const checkAnswer = () => {
    if (isAnswered) return;
    const constructedSentence = answerWords.join(' ');
    const correct = constructedSentence === currentExercise.sentence;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      updateScore(20);
      setCorrectAnswers(prev => prev + 1);
      toast({ title: "Tačno!", description: "Sjajno! +20 poena." });
      handlePlaySound(currentExercise.sentence);
    } else {
      toast({ title: "Netačno!", description: `Pravilan odgovor je: "${currentExercise.sentence}"`, variant: "destructive" });
    }
  };

  const nextQuestion = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      setCurrentExerciseIndex(exercises.length);
    }
  };

  const isQuizFinished = currentExerciseIndex >= exercises.length;

  if (!language || !grade || exercises.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-headline mb-4">Sastavljanje rečenica</h2>
        <p>Nema dostupnih vježbi.</p>
      </div>
    );
  }

  const progress = (currentExerciseIndex / exercises.length) * 100;

  return (
    <div>
      <audio ref={audioRef} onEnded={handleAudioEnded} onPause={() => setPlayingText(null)} />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-headline font-bold">Sastavi rečenicu</h2>
        {!isQuizFinished && (
           <div className="text-lg font-semibold text-muted-foreground">
             {currentExerciseIndex + 1} / {exercises.length}
           </div>
         )}
        <Button onClick={generateExercises} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          {language === 'serbian' ? 'Nove vežbe' : 'Nove vježbe'}
        </Button>
      </div>
      
      <Progress value={isQuizFinished ? 100 : progress} className="mb-6" />

      {!isQuizFinished && currentExercise ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg md:text-xl text-muted-foreground">
              {language === 'serbian' ? 'Poredaj reči u ispravan redosled.' : 'Poredaj riječi u ispravan redoslijed.'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8 items-center">
            <div className="min-h-[6rem] w-full bg-secondary rounded-lg p-4 flex flex-wrap items-center justify-center gap-2">
              {answerWords.map((word, index) => (
                 <motion.div key={`${word}-${index}`} layoutId={`word-${word}-${index}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleWordClick(word, 'answer')}
                      className={cn(
                        "text-lg cursor-pointer bg-background",
                        isAnswered && "cursor-default",
                        isAnswered && isCorrect && "border-green-500 text-green-700",
                        isAnswered && !isCorrect && "border-red-500 text-red-700"
                      )}
                    >
                      {word}
                    </Button>
                 </motion.div>
              ))}
               {answerWords.length === 0 && (
                <p className="text-muted-foreground">{language === 'serbian' ? 'Ovde poredaj reči' : 'Ovdje poredaj riječi'}</p>
               )}
            </div>
            
            <div className="min-h-[6rem] w-full p-4 flex flex-wrap items-center justify-center gap-2">
                {wordBank.map((word, index) => (
                    <motion.div key={`${word}-${index}`} layoutId={`word-${word}-${index}`}>
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => handleWordClick(word, 'bank')}
                        className="text-lg cursor-pointer"
                        disabled={isAnswered}
                      >
                        {word}
                      </Button>
                    </motion.div>
                ))}
            </div>

          </CardContent>
          <CardFooter className="justify-center mt-6 flex-col gap-4">
            {!isAnswered ? (
              <Button onClick={checkAnswer} disabled={wordBank.length > 0} size="lg">{language === 'serbian' ? 'Proveri' : 'Provjeri'}</Button>
            ) : (
              <>
                 {isCorrect ? (
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-green-600 text-xl font-bold"><CheckCircle /> Tačno!</p>
                         <Button variant="ghost" size="icon" onClick={() => handlePlaySound(currentExercise.sentence)} disabled={!!playingText}>
                            {playingText === currentExercise.sentence ? <Loader2 className="w-5 h-5 animate-spin" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                    </div>
                 ) : (
                    <div className="text-center">
                        <p className="flex items-center justify-center gap-2 text-red-600 text-xl font-bold"><XCircle /> Netačno!</p>
                        <p className="text-muted-foreground mt-1">{language === 'serbian' ? 'Ispravna rečenica je:' : 'Ispravna rečenica je:'} "{currentExercise.sentence}"</p>
                    </div>
                 )}
                <Button onClick={nextQuestion} size="lg">
                    {currentExerciseIndex < exercises.length - 1 ? (language === 'serbian' ? 'Sledeća rečenica' : 'Sljedeća rečenica') : 'Vidi rezultate'}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card className="text-center p-8">
            <h3 className="text-2xl font-headline mb-4">Vježba završena!</h3>
            <p className="text-lg mb-6">Tačno si sastavio/la {correctAnswers} od {exercises.length} rečenica.</p>
            <Button onClick={generateExercises}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sastavljaj ponovo
            </Button>
        </Card>
      )}
    </div>
  );
}
