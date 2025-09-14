import type { VocabularyData } from './types';

export const vocabularyData: VocabularyData = {
  bosnian: {
    '1-3': {
      family: {
        title: 'Porodica',
        description: 'Nauči riječi za članove porodice.',
        swedish: 'Familj',
        items: [
          { id: 1001, word: 'majka', translation: 'mamma' },
          { id: 1002, word: 'otac', translation: 'pappa' },
          { id: 1003, word: 'sestra', translation: 'syster' },
          { id: 1004, word: 'brat', translation: 'bror' },
          { id: 1005, word: 'nana', translation: 'farmor/mormor' },
          { id: 1006, word: 'djed', translation: 'farfar/morfar' },
        ],
      },
      colors: {
        title: 'Boje',
        description: 'Otkrij nazive za različite boje.',
        swedish: 'Färger',
        items: [
          { id: 1007, word: 'crvena', translation: 'röd' },
          { id: 1008, word: 'plava', translation: 'blå' },
          { id: 1009, word: 'zelena', translation: 'grön' },
          { id: 1010, word: 'žuta', translation: 'gul' },
          { id: 1011, word: 'crna', translation: 'svart' },
          { id: 1012, word: 'bijela', translation: 'vit' },
        ],
      },
      food: {
        title: 'Hrana i Piće',
        description: 'Istraži riječi vezane za hranu i piće.',
        swedish: 'Mat och Dryck',
        items: [
          { id: 21, word: 'hljeb', translation: 'bröd' },
          { id: 22, word: 'mlijeko', translation: 'mjölk' },
          { id: 5, word: 'jabuka', translation: 'äpple' },
          { id: 11, word: 'voda', translation: 'vatten' },
          { id: 1, word: 'kafa', translation: 'kaffe' },
        ],
      },
      animals: {
        title: 'Životinje',
        description: 'Upoznaj se sa nazivima životinja.',
        swedish: 'Djur',
        items: [
          { id: 7, word: 'mačka', translation: 'katt' },
          { id: 8, word: 'pas', translation: 'hund' },
          { id: 62, word: 'riba', translation: 'fisk' },
          { id: 15, word: 'ptica', translation: 'fågel' },
          { id: 34, word: 'medvjed', translation: 'björn' },
        ],
      },
    },
    '4-6': {
      // Add categories for grade 4-6 if needed
    },
    '7-9': {
      // Add categories for grade 7-9 if needed
    },
  },
  croatian: {
    '1-3': {
        family: {
            title: 'Obitelj',
            description: 'Nauči riječi za članove obitelji.',
            swedish: 'Familj',
            items: [
              { id: 1001, word: 'majka', translation: 'mamma' },
              { id: 1002, word: 'otac', translation: 'pappa' },
              { id: 1003, word: 'sestra', translation: 'syster' },
              { id: 1004, word: 'brat', translation: 'bror' },
              { id: 1005, word: 'baka', translation: 'farmor/mormor' },
              { id: 1006, word: 'djed', translation: 'farfar/morfar' },
            ],
          },
          colors: {
            title: 'Boje',
            description: 'Otkrij nazive za različite boje.',
            swedish: 'Färger',
            items: [
              { id: 1007, word: 'crvena', translation: 'röd' },
              { id: 1008, word: 'plava', translation: 'blå' },
              { id: 1009, word: 'zelena', translation: 'grön' },
              { id: 1010, word: 'žuta', translation: 'gul' },
              { id: 1011, word: 'crna', translation: 'svart' },
              { id: 1012, word: 'bijela', translation: 'vit' },
            ],
          },
          food: {
            title: 'Hrana i Piće',
            description: 'Istraži riječi vezane za hranu i piće.',
            swedish: 'Mat och Dryck',
            items: [
                { id: 2, word: 'kruh', translation: 'bröd' },
                { id: 22, word: 'mlijeko', translation: 'mjölk' },
                { id: 6, word: 'jabuka', translation: 'äpple' },
                { id: 12, word: 'voda', translation: 'vatten' },
                { id: 1, word: 'kava', translation: 'kaffe' },
            ],
          },
          animals: {
            title: 'Životinje',
            description: 'Upoznaj se s nazivima životinja.',
            swedish: 'Djur',
            items: [
                { id: 8, word: 'mačka', translation: 'katt' },
                { id: 9, word: 'pas', translation: 'hund' },
                { id: 51, word: 'riba', translation: 'fisk' },
                { id: 52, word: 'ptica', translation: 'fågel' },
                { id: 53, word: 'medvjed', translation: 'björn' },
            ],
          },
    },
    '4-6': {},
    '7-9': {},
  },
  serbian: {
    '1-3': {
        family: {
            title: 'Porodica',
            description: 'Nauči reči za članove porodice.',
            swedish: 'Familj',
            items: [
              { id: 1001, word: 'majka', translation: 'mamma' },
              { id: 1002, word: 'otac', translation: 'pappa' },
              { id: 1003, word: 'sestra', translation: 'syster' },
              { id: 1004, word: 'brat', translation: 'bror' },
              { id: 1005, word: 'baka', translation: 'farmor/mormor' },
              { id: 1006, word: 'deka', translation: 'farfar/morfar' },
            ],
          },
          colors: {
            title: 'Boje',
            description: 'Otkrij nazive za različite boje.',
            swedish: 'Färger',
            items: [
              { id: 1007, word: 'crvena', translation: 'röd' },
              { id: 1008, word: 'plava', translation: 'blå' },
              { id: 1009, word: 'zelena', translation: 'grön' },
              { id: 1010, word: 'žuta', translation: 'gul' },
              { id: 1011, word: 'crna', translation: 'svart' },
              { id: 1012, word: 'bela', translation: 'vit' },
            ],
          },
          food: {
            title: 'Hrana i Piće',
            description: 'Istraži reči vezane za hranu i piće.',
            swedish: 'Mat och Dryck',
            items: [
                { id: 2, word: 'hleb', translation: 'bröd' },
                { id: 22, word: 'mleko', translation: 'mjölk' },
                { id: 6, word: 'jabuka', translation: 'äpple' },
                { id: 12, word: 'voda', translation: 'vatten' },
                { id: 1, word: 'kafa', translation: 'kaffe' },
            ],
          },
          animals: {
            title: 'Životinje',
            description: 'Upoznaj se sa nazivima životinja.',
            swedish: 'Djur',
            items: [
                { id: 8, word: 'mačka', translation: 'katt' },
                { id: 9, word: 'pas', translation: 'hund' },
                { id: 16, word: 'riba', translation: 'fisk' },
                { id: 15, word: 'ptica', translation: 'fågel' },
                { id: 30, word: 'medved', translation: 'björn' },
            ],
          },
    },
    '4-6': {},
    '7-9': {},
  },
};
