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
    '4-6': {
        school: {
            title: 'Škola',
            description: 'Riječi vezane za školu i pribor.',
            swedish: 'Skola',
            items: [
                { id: 1101, word: 'učionica', translation: 'klassrum' },
                { id: 1102, word: 'tabla', translation: 'tavla' },
                { id: 1103, word: 'sveska', translation: 'skrivbok' },
                { id: 1104, word: 'pernica', translation: 'pennskrin' },
                { id: 1105, word: 'odmor', translation: 'rast' },
                { id: 1106, word: 'domaća zadaća', translation: 'läxa' },
                { id: 1107, word: 'historija', translation: 'historia' },
                { id: 1108, word: 'geografija', translation: 'geografi' },
                { id: 1109, word: 'matematika', translation: 'matematik' },
                { id: 1110, word: 'lenjir', translation: 'linjal' },
            ]
        },
        food: {
            title: 'Hrana i piće',
            description: 'Nazivi za obroke, namirnice i pića.',
            swedish: 'Mat och dryck',
            items: [
                { id: 1111, word: 'doručak', translation: 'frukost' },
                { id: 1112, word: 'ručak', translation: 'lunch' },
                { id: 1113, word: 'večera', translation: 'middag' },
                { id: 1114, word: 'hljeb', translation: 'bröd' },
                { id: 1115, word: 'mlijeko', translation: 'mjölk' },
                { id: 1116, word: 'voda', translation: 'vatten' },
                { id: 1117, word: 'sok', translation: 'juice' },
                { id: 1118, word: 'meso', translation: 'kött' },
                { id: 1119, word: 'povrće', translation: 'grönsaker' },
                { id: 1120, word: 'voće', translation: 'frukt' },
            ]
        }
    },
    '7-9': {
        body: {
            title: 'Ljudsko tijelo',
            description: 'Dijelovi ljudskog tijela.',
            swedish: 'Människokroppen',
            items: [
                { id: 1201, word: 'glava', translation: 'huvud' },
                { id: 1202, word: 'srce', translation: 'hjärta' },
                { id: 1203, word: 'pluća', translation: 'lungor' },
                { id: 1204, word: 'mozak', translation: 'hjärna' },
                { id: 1205, word: 'stomak', translation: 'mage' },
                { id: 1206, word: 'kosti', translation: 'ben (skelett)' },
                { id: 1207, word: 'mišić', translation: 'muskel' },
                { id: 1208, word: 'koža', translation: 'hud' },
                { id: 1209, word: 'krv', translation: 'blod' },
                { id: 1210, word: 'koljeno', translation: 'knä' },
            ]
        },
        technology: {
            title: 'Tehnologija',
            description: 'Riječi iz svijeta tehnologije.',
            swedish: 'Teknologi',
            items: [
                { id: 1211, word: 'računar', translation: 'dator' },
                { id: 1212, word: 'mobitel', translation: 'mobiltelefon' },
                { id: 1213, word: 'internet', translation: 'internet' },
                { id: 1214, word: 'aplikacija', translation: 'applikation' },
                { id: 1215, word: 'lozinka', translation: 'lösenord' },
                { id: 1216, word: 'ekran', translation: 'skärm' },
                { id: 1217, word: 'tastatura', translation: 'tangentbord' },
                { id: 1218, word: 'miš', translation: 'mus' },
                { id: 1219, word: 'poruka', translation: 'meddelande' },
                { id: 1220, word: 'punjač', translation: 'laddare' },
            ]
        }
    },
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
    '4-6': {
        school: {
            title: 'Škola',
            description: 'Riječi vezane za školu i pribor.',
            swedish: 'Skola',
            items: [
                { id: 2101, word: 'učionica', translation: 'klassrum' },
                { id: 2102, word: 'ploča', translation: 'tavla' },
                { id: 2103, word: 'bilježnica', translation: 'skrivbok' },
                { id: 2104, word: 'pernica', translation: 'pennskrin' },
                { id: 2105, word: 'odmor', translation: 'rast' },
                { id: 2106, word: 'domaća zadaća', translation: 'läxa' },
                { id: 2107, word: 'povijest', translation: 'historia' },
                { id: 2108, word: 'zemljopis', translation: 'geografi' },
                { id: 2109, word: 'matematika', translation: 'matematik' },
                { id: 2110, word: 'ravnalo', translation: 'linjal' },
            ]
        },
        food: {
            title: 'Hrana i piće',
            description: 'Nazivi za obroke, namirnice i pića.',
            swedish: 'Mat och dryck',
            items: [
                { id: 2111, word: 'doručak', translation: 'frukost' },
                { id: 2112, word: 'ručak', translation: 'lunch' },
                { id: 2113, word: 'večera', translation: 'middag' },
                { id: 2114, word: 'kruh', translation: 'bröd' },
                { id: 2115, word: 'mlijeko', translation: 'mjölk' },
                { id: 2116, word: 'voda', translation: 'vatten' },
                { id: 2117, word: 'sok', translation: 'juice' },
                { id: 2118, word: 'meso', translation: 'kött' },
                { id: 2119, word: 'povrće', translation: 'grönsaker' },
                { id: 2120, word: 'voće', translation: 'frukt' },
            ]
        }
    },
    '7-9': {
        body: {
            title: 'Ljudsko tijelo',
            description: 'Dijelovi ljudskog tijela.',
            swedish: 'Människokroppen',
            items: [
                { id: 2201, word: 'glava', translation: 'huvud' },
                { id: 2202, word: 'srce', translation: 'hjärta' },
                { id: 2203, word: 'pluća', translation: 'lungor' },
                { id: 2204, word: 'mozak', translation: 'hjärna' },
                { id: 2205, word: 'želudac', translation: 'mage' },
                { id: 2206, word: 'kost', translation: 'ben (skelett)' },
                { id: 2207, word: 'mišić', translation: 'muskel' },
                { id: 2208, word: 'koža', translation: 'hud' },
                { id: 2209, word: 'krv', translation: 'blod' },
                { id: 2210, word: 'koljeno', translation: 'knä' },
            ]
        },
        technology: {
            title: 'Tehnologija',
            description: 'Riječi iz svijeta tehnologije.',
            swedish: 'Teknologi',
            items: [
                { id: 2211, word: 'računalo', translation: 'dator' },
                { id: 2212, word: 'mobitel', translation: 'mobiltelefon' },
                { id: 2213, word: 'internet', translation: 'internet' },
                { id: 2214, word: 'aplikacija', translation: 'applikation' },
                { id: 2215, word: 'lozinka', translation: 'lösenord' },
                { id: 2216, word: 'zaslon', translation: 'skärm' },
                { id: 2217, word: 'tipkovnica', translation: 'tangentbord' },
                { id: 2218, word: 'miš', translation: 'mus' },
                { id: 2219, word: 'poruka', translation: 'meddelande' },
                { id: 2220, word: 'punjač', translation: 'laddare' },
            ]
        }
    },
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
    '4-6': {
        school: {
            title: 'Škola',
            description: 'Reči vezane za školu i pribor.',
            swedish: 'Skola',
            items: [
                { id: 3101, word: 'učionica', translation: 'klassrum' },
                { id: 3102, word: 'tabla', translation: 'tavla' },
                { id: 3103, word: 'sveska', translation: 'skrivbok' },
                { id: 3104, word: 'pernica', translation: 'pennskrin' },
                { id: 3105, word: 'odmor', translation: 'rast' },
                { id: 3106, word: 'domaći zadatak', translation: 'läxa' },
                { id: 3107, word: 'istorija', translation: 'historia' },
                { id: 3108, word: 'geografija', translation: 'geografi' },
                { id: 3109, word: 'matematika', translation: 'matematik' },
                { id: 3110, word: 'lenjir', translation: 'linjal' },
            ]
        },
        food: {
            title: 'Hrana i piće',
            description: 'Nazivi za obroke, namirnice i pića.',
            swedish: 'Mat och dryck',
            items: [
                { id: 3111, word: 'doručak', translation: 'frukost' },
                { id: 3112, word: 'ručak', translation: 'lunch' },
                { id: 3113, word: 'večera', translation: 'middag' },
                { id: 3114, word: 'hleb', translation: 'bröd' },
                { id: 3115, word: 'mleko', translation: 'mjölk' },
                { id: 3116, word: 'voda', translation: 'vatten' },
                { id: 3117, word: 'sok', translation: 'juice' },
                { id: 3118, word: 'meso', translation: 'kött' },
                { id: 3119, word: 'povrće', translation: 'grönsaker' },
                { id: 3120, word: 'voće', translation: 'frukt' },
            ]
        }
    },
    '7-9': {
        body: {
            title: 'Ljudsko telo',
            description: 'Delovi ljudskog tela.',
            swedish: 'Människokroppen',
            items: [
                { id: 3201, word: 'glava', translation: 'huvud' },
                { id: 3202, word: 'srce', translation: 'hjärta' },
                { id: 3203, word: 'pluća', translation: 'lungor' },
                { id: 3204, word: 'mozak', translation: 'hjärna' },
                { id: 3205, word: 'stomak', translation: 'mage' },
                { id: 3206, word: 'kost', translation: 'ben (skelett)' },
                { id: 3207, word: 'mišić', translation: 'muskel' },
                { id: 3208, word: 'koža', translation: 'hud' },
                { id: 3209, word: 'krv', translation: 'blod' },
                { id_1: 3210, word: 'koleno', translation: 'knä' },
            ]
        },
        technology: {
            title: 'Tehnologija',
            description: 'Reči iz sveta tehnologije.',
            swedish: 'Teknologi',
            items: [
                { id: 3211, word: 'računar', translation: 'dator' },
                { id: 3212, word: 'mobilni telefon', translation: 'mobiltelefon' },
                { id: 3213, word: 'internet', translation: 'internet' },
                { id: 3214, word: 'aplikacija', translation: 'applikation' },
                { id: 3215, word: 'lozinka', translation: 'lösenord' },
                { id: 3216, word: 'ekran', translation: 'skärm' },
                { id: 3217, word: 'tastatura', translation: 'tangentbord' },
                { id: 3218, word: 'miš', translation: 'mus' },
                { id: 3219, word: 'poruka', translation: 'meddelande' },
                { id: 3220, word: 'punjač', translation: 'laddare' },
            ]
        }
    },
};


export const vocabularyData: VocabularyData = {
  bosnian: bosnianVocabularyData,
  croatian: croatianVocabularyData,
  serbian: serbianVocabularyData
};
