import type { VocabularyData } from './types';

// ========= BOSNIAN DATA =========
const bosnianVocabularyData = {
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
                { id: 1013, word: 'tetka', translation: 'moster/faster' },
                { id: 1014, word: 'amidža', translation: 'farbror (paternal)' },
                { id: 1015, word: 'daidža', translation: 'morbror (maternal)' },
                { id: 1016, word: 'beba', translation: 'bebis' },
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
                { id: 1017, word: 'narandžasta', translation: 'orange' },
                { id: 1018, word: 'ljubičasta', translation: 'lila' },
                { id: 1019, word: 'smeđa', translation: 'brun' },
                { id: 1020, word: 'siva', translation: 'grå' },
            ],
        },
    },
    '4-6': {},
    '7-9': {},
};

// ========= CROATIAN DATA =========
const croatianVocabularyData = {
    '1-3': {
        family: {
            title: 'Obitelj',
            description: 'Nauči riječi za članove obitelji.',
            swedish: 'Familj',
            items: [
                { id: 2001, word: 'majka', translation: 'mamma' },
                { id: 2002, word: 'otac', translation: 'pappa' },
                { id: 2003, word: 'sestra', translation: 'syster' },
                { id: 2004, word: 'brat', translation: 'bror' },
                { id: 2005, word: 'baka', translation: 'farmor/mormor' },
                { id: 2006, word: 'djed', translation: 'farfar/morfar' },
                { id: 2007, word: 'teta', translation: 'moster/faster' },
                { id: 2008, word: 'stric', translation: 'farbror' },
                { id: 2009, word: 'ujak', translation: 'morbror' },
                { id: 2010, word: 'beba', translation: 'bebis' },
            ],
        },
        colors: {
            title: 'Boje',
            description: 'Otkrij nazive za različite boje.',
            swedish: 'Färger',
            items: [
                { id: 2011, word: 'crvena', translation: 'röd' },
                { id: 2012, word: 'plava', translation: 'blå' },
                { id: 2013, word: 'zelena', translation: 'grön' },
                { id: 2014, word: 'žuta', translation: 'gul' },
                { id: 2015, word: 'crna', translation: 'svart' },
                { id: 2016, word: 'bijela', translation: 'vit' },
                { id: 2017, word: 'narančasta', translation: 'orange' },
                { id: 2018, word: 'ljubičasta', translation: 'lila' },
                { id: 2019, word: 'smeđa', translation: 'brun' },
                { id: 2020, word: 'siva', translation: 'grå' },
            ],
        },
    },
    '4-6': {},
    '7-9': {},
};

// ========= SERBIAN DATA =========
const serbianVocabularyData = {
    '1-3': {
        family: {
            title: 'Porodica',
            description: 'Nauči reči za članove porodice.',
            swedish: 'Familj',
            items: [
                { id: 3001, word: 'majka', translation: 'mamma' },
                { id: 3002, word: 'otac', translation: 'pappa' },
                { id: 3003, word: 'sestra', translation: 'syster' },
                { id: 3004, word: 'brat', translation: 'bror' },
                { id: 3005, word: 'baka', translation: 'farmor/mormor' },
                { id: 3006, word: 'deda', translation: 'farfar/morfar' },
                { id: 3007, word: 'tetka', translation: 'moster/faster' },
                { id: 3008, word: 'stric', translation: 'farbror' },
                { id: 3009, word: 'ujak', translation: 'morbror' },
                { id: 3010, word: 'beba', translation: 'bebis' },
            ],
        },
        colors: {
            title: 'Boje',
            description: 'Otkrij nazive za različite boje.',
            swedish: 'Färger',
            items: [
                { id: 3011, word: 'crvena', translation: 'röd' },
                { id: 3012, word: 'plava', translation: 'blå' },
                { id: 3013, word: 'zelena', translation: 'grön' },
                { id: 3014, word: 'žuta', translation: 'gul' },
                { id: 3015, word: 'crna', translation: 'svart' },
                { id: 3016, word: 'bela', translation: 'vit' },
                { id: 3017, word: 'narandžasta', translation: 'orange' },
                { id: 3018, word: 'ljubičasta', translation: 'lila' },
                { id: 3019, word: 'braon', translation: 'brun' },
                { id: 3020, word: 'siva', translation: 'grå' },
            ],
        },
    },
    '4-6': {},
    '7-9': {},
};


export const vocabularyData: VocabularyData = {
  bosnian: bosnianVocabularyData,
  croatian: croatianVocabularyData,
  serbian: serbianVocabularyData
};
