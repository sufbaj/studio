export type Language = 'bosnian' | 'croatian' | 'serbian';
export type Grade = '1-3' | '4-6' | '7-9';
export type Activity =
  | 'vocabulary'
  | 'sentences'
  | 'grammar'
  | 'spelling'
  | 'reading'
  | 'translation'
  | 'translator';

export interface VocabularyItem {
  id: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
  'data-ai-hint': string;
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

export interface Content {
  vocabulary: VocabularyItem[];
  spelling: SpellingItem[];
  sentences: SentenceItem[];
  grammar: GrammarItem[];
  reading: ReadingItem[];
  translations: TranslationItem[];
}

export type LanguageData = Record<Language, Record<Grade, Content>>;
