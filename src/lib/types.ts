export type Language = 'bosnian' | 'croatian' | 'serbian';
export type Grade = '1-3' | '4-6' | '7-9';
export type Activity =
  | 'vocabulary'
  | 'sentences'
  | 'grammar'
  | 'spelling'
  | 'reading'
  | 'translation'
  | 'alphabet'
  | 'numbers'
  | 'translator'
  | 'ai-review';

export interface VocabularyItem {
  id: number;
  word: string;
  translation: string;
}

export interface SpellingItem {
  id: number;
  sentence: string;
  blank: string;
  options: string[];
}

export interface GrammarItem {
  id: number;
  sentence: string;
  blank: string;
  options: string[];
  explanation: string;
}

export interface SentenceItem {
  id: number;
  sentence: string;
}

export interface ReadingQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface ReadingItem {
  id: number;
  title: string;
  text: string;
  questions: ReadingQuestion[];
}

export interface TranslationItem {
  id: number;
  type: 'word' | 'sentence';
  source: string; // Swedish
  target: string; // Target language
}

export interface AlphabetItem {
  letter: [string, string] | string; // Uppercase, Lowercase or just one
  exampleWord: string;
  exampleImage: string;
}

export interface NumberItem {
  number: number;
  word: string;
}

export interface Content {
  vocabulary: VocabularyItem[];
  spelling: SpellingItem[];
  sentences: SentenceItem[];
  grammar: GrammarItem[];
  reading: ReadingItem[];
  translations: TranslationItem[];
  alphabet: AlphabetItem[];
  numbers: NumberItem[];
}

export type LanguageData = Record<Language, Record<Grade, Content>>;
