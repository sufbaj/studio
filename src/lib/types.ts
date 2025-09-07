export type Language = 'bosnian' | 'croatian' | 'serbian';
export type Grade = '1-3' | '4-6' | '7-9';
export type Activity =
  | 'vocabulary'
  | 'sentences'
  | 'grammar'
  | 'spelling'
  | 'reading'
  | 'translation'
  | 'ai-review';

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

export interface SentenceItem {
  id: number;
  sentence: string;
}

export interface Content {
  vocabulary: VocabularyItem[];
  spelling: SpellingItem[];
  sentences: SentenceItem[];
  // Other activity types would be defined here
}

export type LanguageData = Record<Language, Record<Grade, Content>>;
