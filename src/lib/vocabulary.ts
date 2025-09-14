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
      everydayObjects: {
        title: 'Svakodnevni predmeti',
        description: 'Nazivi za stvari koje koristimo svaki dan.',
        swedish: 'Vardagliga föremål',
        items: [
          { id: 1101, word: 'stolica', translation: 'stol' },
          { id: 1102, word: 'sto', translation: 'bord' },
          { id: 1103, word: 'krevet', translation: 'säng' },
          { id: 1104, word: 'čaša', translation: 'glas' },
          { id: 1105, word: 'tanjir', translation: 'tallrik' },
          { id: 1106, word: 'kašika', translation: 'sked' },
          { id: 1107, word: 'viljuška', translation: 'gaffel' },
          { id: 1108, word: 'sveska', translation: 'anteckningsbok' },
          { id: 1109, word: 'olovka', translation: 'penna' },
        ]
      },
      cityAndVillage: {
        title: 'Grad i selo',
        description: 'Riječi za opis urbanih i ruralnih mjesta.',
        swedish: 'Stad och landsbygd',
        items: [
            { id: 1110, word: 'grad', translation: 'stad' },
            { id: 1111, word: 'selo', translation: 'by' },
            { id: 1112, word: 'ulica', translation: 'gata' },
            { id: 1113, word: 'zgrada', translation: 'byggnad' },
            { id: 1114, word: 'kuća', translation: 'hus' },
            { id: 1115, word: 'park', translation: 'park' },
            { id: 1116, word: 'rijeka', translation: 'flod' },
            { id: 1117, word: 'most', translation: 'bro' },
            { id: 1118, word: 'čaršija', translation: 'basar/marknad' },
        ]
      },
    },
    '4-6': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 2101, word: 'računar', translation: 'dator' },
              { id: 2102, word: 'telefon', translation: 'telefon' },
              { id: 2103, word: 'televizor', translation: 'TV' },
              { id: 2104, word: 'ključ', translation: 'nyckel' },
              { id: 2105, word: 'novčanik', translation: 'plånbok' },
              { id: 2106, word: 'kišobran', translation: 'paraply' },
              { id: 2107, word: 'ruksak', translation: 'ryggsäck' },
              { id: 2108, word: 'lampa', translation: 'lampa' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Riječi za opis urbanih i ruralnih mjesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 2109, word: 'trg', translation: 'torg' },
                { id: 2110, word: 'općina', translation: 'kommun' },
                { id: 2111, word: 'bolnica', translation: 'sjukhus' },
                { id: 2112, word: 'biblioteka', translation: 'bibliotek' },
                { id: 2113, word: 'pozorište', translation: 'teater' },
                { id: 2114, word: 'prodavnica', translation: 'affär' },
                { id: 2115, word: 'njiva', translation: 'åker' },
                { id: 2116, word: 'livada', translation: 'äng' },
            ]
        },
    },
    '7-9': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 3101, word: 'punjač', translation: 'laddare' },
              { id: 3102, word: 'slušalice', translation: 'hörlurar' },
              { id: 3103, word: 'dokument', translation: 'dokument' },
              { id: 3104, word: 'ugovor', translation: 'avtal' },
              { id: 3105, word: 'račun', translation: 'faktura/kvitto' },
              { id: 3106, word: 'pernica', translation: 'pennskrin' },
              { id: 3107, word: 'kalendar', translation: 'kalender' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Riječi za opis urbanih i ruralnih mjesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 3108, word: 'saobraćaj', translation: 'trafik' },
                { id: 3109, word: 'industrija', translation: 'industri' },
                { id: 3110, word: 'stanovništvo', translation: 'befolkning' },
                { id: 3111, word: 'infrastruktura', translation: 'infrastruktur' },
                { id: 3112, word: 'poljoprivreda', translation: 'jordbruk' },
                { id: 3113, word: 'znamenitost', translation: 'sevärdhet' },
                { id: 3114, word: 'predgrađe', translation: 'förort' },
            ]
        },
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
          everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 1201, word: 'stolac', translation: 'stol' },
              { id: 1202, word: 'stol', translation: 'bord' },
              { id: 1203, word: 'krevet', translation: 'säng' },
              { id: 1204, word: 'čaša', translation: 'glas' },
              { id: 1205, word: 'tanjur', translation: 'tallrik' },
              { id: 1206, word: 'žlica', translation: 'sked' },
              { id: 1207, word: 'vilica', translation: 'gaffel' },
              { id: 1208, word: 'bilježnica', translation: 'anteckningsbok' },
              { id: 1209, word: 'olovka', translation: 'penna' },
            ]
          },
          cityAndVillage: {
            title: 'Grad i selo',
            description: 'Riječi za opis urbanih i ruralnih mjesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 1210, word: 'grad', translation: 'stad' },
                { id: 1211, word: 'selo', translation: 'by' },
                { id: 1212, word: 'ulica', translation: 'gata' },
                { id: 1213, word: 'zgrada', translation: 'byggnad' },
                { id: 1214, word: 'kuća', translation: 'hus' },
                { id: 1215, word: 'park', translation: 'park' },
                { id: 1216, word: 'rijeka', translation: 'flod' },
                { id: 1217, word: 'most', translation: 'bro' },
                { id: 1218, word: 'tržnica', translation: 'marknad' },
            ]
          },
    },
    '4-6': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 2201, word: 'računalo', translation: 'dator' },
              { id: 2202, word: 'mobitel', translation: 'mobiltelefon' },
              { id: 2203, word: 'televizor', translation: 'TV' },
              { id: 2204, word: 'ključ', translation: 'nyckel' },
              { id: 2205, word: 'novčanik', translation: 'plånbok' },
              { id: 2206, word: 'kišobran', translation: 'paraply' },
              { id: 2207, word: 'ruksak', translation: 'ryggsäck' },
              { id: 2208, word: 'svjetiljka', translation: 'lampa' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Riječi za opis urbanih i ruralnih mjesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 2209, word: 'trg', translation: 'torg' },
                { id: 2210, word: 'općina', translation: 'kommun' },
                { id: 2211, word: 'bolnica', translation: 'sjukhus' },
                { id: 2212, word: 'knjižnica', translation: 'bibliotek' },
                { id: 2213, word: 'kazalište', translation: 'teater' },
                { id: 2214, word: 'trgovina', translation: 'affär' },
                { id: 2215, word: 'polje', translation: 'fält' },
                { id: 2216, word: 'livada', translation: 'äng' },
            ]
        },
    },
    '7-9': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 3201, word: 'punjač', translation: 'laddare' },
              { id: 3202, word: 'slušalice', translation: 'hörlurar' },
              { id: 3203, word: 'dokument', translation: 'dokument' },
              { id: 3204, word: 'ugovor', translation: 'avtal' },
              { id: 3205, word: 'račun', translation: 'faktura/kvitto' },
              { id: 3206, word: 'pernica', translation: 'pennskrin' },
              { id: 3207, word: 'kalendar', translation: 'kalender' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Riječi za opis urbanih i ruralnih mjesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 3208, word: 'promet', translation: 'trafik' },
                { id: 3209, word: 'industrija', translation: 'industri' },
                { id: 3210, word: 'stanovništvo', translation: 'befolkning' },
                { id: 3211, word: 'infrastruktura', translation: 'infrastruktur' },
                { id: 3212, word: 'poljoprivreda', translation: 'jordbruk' },
                { id: 3213, word: 'znamenitost', translation: 'sevärdhet' },
                { id: 3214, word: 'predgrađe', translation: 'förort' },
            ]
        },
    },
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
          everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 1301, word: 'stolica', translation: 'stol' },
              { id: 1302, word: 'sto', translation: 'bord' },
              { id: 1303, word: 'krevet', translation: 'säng' },
              { id: 1304, word: 'čaša', translation: 'glas' },
              { id: 1305, word: 'tanjir', translation: 'tallrik' },
              { id: 1306, word: 'kašika', translation: 'sked' },
              { id: 1307, word: 'viljuška', translation: 'gaffel' },
              { id: 1308, word: 'sveska', translation: 'anteckningsbok' },
              { id: 1309, word: 'olovka', translation: 'penna' },
            ]
          },
          cityAndVillage: {
            title: 'Grad i selo',
            description: 'Reči za opis urbanih i ruralnih mesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 1310, word: 'grad', translation: 'stad' },
                { id: 1311, word: 'selo', translation: 'by' },
                { id: 1312, word: 'ulica', translation: 'gata' },
                { id: 1313, word: 'zgrada', translation: 'byggnad' },
                { id: 1314, word: 'kuća', translation: 'hus' },
                { id: 1315, word: 'park', translation: 'park' },
                { id: 1316, word: 'reka', translation: 'flod' },
                { id: 1317, word: 'most', translation: 'bro' },
                { id: 1318, word: 'pijaca', translation: 'marknad' },
            ]
          },
    },
    '4-6': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 2301, word: 'računar', translation: 'dator' },
              { id: 2302, word: 'mobilni telefon', translation: 'mobiltelefon' },
              { id: 2303, word: 'televizor', translation: 'TV' },
              { id: 2304, word: 'ključ', translation: 'nyckel' },
              { id: 2305, word: 'novčanik', translation: 'plånbok' },
              { id: 2306, word: 'kišobran', translation: 'paraply' },
              { id: 2307, word: 'ranac', translation: 'ryggsäck' },
              { id: 2308, word: 'lampa', translation: 'lampa' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Reči za opis urbanih i ruralnih mesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 2309, word: 'trg', translation: 'torg' },
                { id: 2310, word: 'opština', translation: 'kommun' },
                { id: 2311, word: 'bolnica', translation: 'sjukhus' },
                { id: 2312, word: 'biblioteka', translation: 'bibliotek' },
                { id: 2313, word: 'pozorište', translation: 'teater' },
                { id: 2314, word: 'prodavnica', translation: 'affär' },
                { id: 2315, word: 'njiva', translation: 'åker' },
                { id: 2316, word: 'livada', translation: 'äng' },
            ]
        },
    },
    '7-9': {
        everydayObjects: {
            title: 'Svakodnevni predmeti',
            description: 'Nazivi za stvari koje koristimo svaki dan.',
            swedish: 'Vardagliga föremål',
            items: [
              { id: 3301, word: 'punjač', translation: 'laddare' },
              { id: 3302, word: 'slušalice', translation: 'hörlurar' },
              { id: 3303, word: 'dokument', translation: 'dokument' },
              { id: 3304, word: 'ugovor', translation: 'avtal' },
              { id: 3305, word: 'račun', translation: 'faktura/kvitto' },
              { id: 3306, word: 'pernica', translation: 'pennskrin' },
              { id: 3307, word: 'kalendar', translation: 'kalender' },
            ]
        },
        cityAndVillage: {
            title: 'Grad i selo',
            description: 'Reči za opis urbanih i ruralnih mesta.',
            swedish: 'Stad och landsbygd',
            items: [
                { id: 3308, word: 'saobraćaj', translation: 'trafik' },
                { id: 3309, word: 'industrija', translation: 'industri' },
                { id: 3310, word: 'stanovništvo', translation: 'befolkning' },
                { id: 3311, word: 'infrastruktura', translation: 'infrastruktur' },
                { id: 3312, word: 'poljoprivreda', translation: 'jordbruk' },
                { id: 3313, word: 'znamenitost', translation: 'sevärdhet' },
                { id: 3314, word: 'predgrađe', translation: 'förort' },
            ]
        },
    },
  },
};

    