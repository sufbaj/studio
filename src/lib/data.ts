import type { LanguageData } from './types';

export const data: LanguageData = {
  bosnian: {
    '1-3': {
      vocabulary: [
        { id: 1, word: 'kahva', translation: 'kaffe', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'coffee cup' },
        { id: 2, word: 'škola', translation: 'skola', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'school building' },
        { id: 3, word: 'kuća', translation: 'hus', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'house exterior' },
        { id: 4, word: 'knjiga', translation: 'bok', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'open book' },
        { id: 5, word: 'jabuka', translation: 'äpple', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'red apple' },
        { id: 6, word: 'auto', translation: 'bil', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'modern car' },
        { id: 7, word: 'mačka', translation: 'katt', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'cute cat' },
        { id: 8, word: 'pas', translation: 'hund', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'happy dog' },
        { id: 9, word: 'lopta', translation: 'boll', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'soccer ball' },
        { id: 10, word: 'sunce', translation: 'sol', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'bright sun' },
      ],
      spelling: [
        { id: 1, sentence: 'Moja mama pije ___.', blank: 'kahvu', options: ['sok', 'kahvu', 'vodu'] },
        { id: 2, sentence: 'Idem u ___.', blank: 'školu', options: ['školu', 'park', 'kino'] },
        { id: 3, sentence: 'Ovo je moja ___.', blank: 'kuća', options: ['knjiga', 'lopta', 'kuća'] },
        { id: 4, sentence: 'Čitam ___.', blank: 'knjigu', options: ['knjigu', 'pismo', 'novine'] },
        { id: 5, sentence: 'Jedem ___.', blank: 'jabuku', options: ['bananu', 'jabuku', 'krušku'] },
      ],
    },
    '4-6': { vocabulary: [], spelling: [] },
    '7-9': { vocabulary: [], spelling: [] },
  },
  croatian: {
    '1-3': {
      vocabulary: [
        { id: 1, word: 'kruh', translation: 'bröd', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'sliced bread' },
        { id: 2, word: 'tisuća', translation: 'tusen', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'number blocks' },
        { id: 3, word: 'obitelj', translation: 'familj', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'happy family' },
        { id: 4, word: 'more', translation: 'hav', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'ocean waves' },
        { id: 5, word: 'grad', translation: 'stad', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'city skyline' },
      ],
      spelling: [
        { id: 1, sentence: 'Jedem svježi ___.', blank: 'kruh', options: ['sir', 'kruh', 'meso'] },
        { id: 2, sentence: 'Brojimo do ___.', blank: 'tisuću', options: ['sto', 'tisuću', 'milijun'] },
      ],
    },
    '4-6': { vocabulary: [], spelling: [] },
    '7-9': { vocabulary: [], spelling: [] },
  },
  serbian: {
    '1-3': {
      vocabulary: [
        { id: 1, word: 'hleb', translation: 'bröd', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'loaf bread' },
        { id: 2, word: 'hiljada', translation: 'tusen', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'counting money' },
        { id: 3, word: 'porodica', translation: 'familj', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'family portrait' },
        { id: 4, word: 'reka', translation: 'flod', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'calm river' },
        { id: 5, word: 'selo', translation: 'by', image: 'https://picsum.photos/300/200', audio: '', 'data-ai-hint': 'small village' },
      ],
      spelling: [
        { id: 1, sentence: 'Kupio sam ___.', blank: 'hleb', options: ['mleko', 'hleb', 'šećer'] },
        { id: 2, sentence: 'Imam ___ dinara.', blank: 'hiljadu', options: ['sto', 'hiljadu', 'milion'] },
      ],
    },
    '4-6': { vocabulary: [], spelling: [] },
    '7-9': { vocabulary: [], spelling: [] },
  },
};
