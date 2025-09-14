export type Language = 'bosnian' | 'croatian' | 'serbian';
export type Grade = '1-3' | '4-6' | '7-9';
export type Activity =
  | 'vocabulary'
  | 'sentences'
  | 'grammar'
  | 'spelling'
  | 'reading'
  | 'svenska-till-modersmal'
  | 'alphabet'
  | 'numbers';

export interface VocabularyItem {
  id: number;
  word: string;
  translation: string;
}

export interface VocabularyCategory {
    title: string;
    description: string;
    swedish: string;
    items: VocabularyItem[];
}

export type VocabularyData = Record<Language, Record<Grade, Record<string, VocabularyCategory>>>;


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
}

export interface AlphabetWordsItem {
  letter: string;
  words: string[];
}

export interface NumberItem {
  number: number;
  word: string;
  ordinal: string;
}

export interface Content {
  vocabulary: VocabularyItem[];
  spelling: SpellingItem[];
  sentences: SentenceItem[];
  grammar: GrammarItem[];
  reading: ReadingItem[];
  translations: TranslationItem[];
  alphabet: AlphabetItem[];
  alphabetWords: AlphabetWordsItem[];
  numbers: NumberItem[];
}

export type LanguageData = Record<Language, Record<Grade, Content>>;
