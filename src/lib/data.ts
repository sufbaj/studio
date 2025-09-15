import type { LanguageData } from './types';

const bosnianAlphabet = [
    { letter: ['A', 'a'], exampleWord: 'Avion' },
    { letter: ['B', 'b'], exampleWord: 'Bicikl' },
    { letter: ['C', 'c'], exampleWord: 'Cipele' },
    { letter: ['Č', 'č'], exampleWord: 'Čaša' },
    { letter: ['Ć', 'ć'], exampleWord: 'Ćevapi' },
    { letter: ['D', 'd'], exampleWord: 'Drvo' },
    { letter: ['Dž', 'dž'], exampleWord: 'Džep' },
    { letter: ['Đ', 'đ'], exampleWord: 'Đak' },
    { letter: ['E', 'e'], exampleWord: 'Ekran' },
    { letter: ['F', 'f'], exampleWord: 'Fudbal' },
    { letter: ['G', 'g'], exampleWord: 'Gitara' },
    { letter: ['H', 'h'], exampleWord: 'Haljina' },
    { letter: ['I', 'i'], exampleWord: 'Igla' },
    { letter: ['J', 'j'], exampleWord: 'Jabuka' },
    { letter: ['K', 'k'], exampleWord: 'Knjiga' },
    { letter: ['L', 'l'], exampleWord: 'Lopta' },
    { letter: ['Lj', 'lj'], exampleWord: 'Ljubav' },
    { letter: ['M', 'm'], exampleWord: 'Mačka' },
    { letter: ['N', 'n'], exampleWord: 'Noga' },
    { letter: ['Nj', 'nj'], exampleWord: 'Njiva' },
    { letter: ['O', 'o'], exampleWord: 'Oblak' },
    { letter: ['P', 'p'], exampleWord: 'Pas' },
    { letter: ['R', 'r'], exampleWord: 'Riba' },
    { letter: ['S', 's'], exampleWord: 'Sunce' },
    { letter: ['Š', 'š'], exampleWord: 'Šuma' },
    { letter: ['T', 't'], exampleWord: 'Trava' },
    { letter: ['U', 'u'], exampleWord: 'Uho' },
    { letter: ['V', 'v'], exampleWord: 'Voda' },
    { letter: ['Z', 'z'], exampleWord: 'Zebra' },
    { letter: ['Ž', 'ž'], exampleWord: 'Žaba' },
];

const croatianAlphabet = [
    { letter: ['A', 'a'], exampleWord: 'Auto' },
    { letter: ['B', 'b'], exampleWord: 'Bicikl' },
    { letter: ['C', 'c'], exampleWord: 'Cipele' },
    { letter: ['Č', 'č'], exampleWord: 'Čaša' },
    { letter: ['Ć', 'ć'], exampleWord: 'Ćuk' },
    { letter: ['D', 'd'], exampleWord: 'Drvo' },
    { letter: ['Dž', 'dž'], exampleWord: 'Džep' },
    { letter: ['Đ', 'đ'], exampleWord: 'Đak' },
    { letter: ['E', 'e'], exampleWord: 'Ekran' },
    { letter: ['F', 'f'], exampleWord: 'Fotografija' },
    { letter: ['G', 'g'], exampleWord: 'Gitara' },
    { letter: ['H', 'h'], exampleWord: 'Haljina' },
    { letter: ['I', 'i'], exampleWord: 'Igla' },
    { letter: ['J', 'j'], exampleWord: 'Jabuka' },
    { letter: ['K', 'k'], exampleWord: 'Knjiga' },
    { letter: ['L', 'l'], exampleWord: 'Lopta' },
    { letter: ['Lj', 'lj'], exampleWord: 'Ljubav' },
    { letter: ['M', 'm'], exampleWord: 'Mačka' },
    { letter: ['N', 'n'], exampleWord: 'Noga' },
    { letter: ['Nj', 'nj'], exampleWord: 'Njiva' },
    { letter: ['O', 'o'], exampleWord: 'Oblak' },
    { letter: ['P', 'p'], exampleWord: 'Pas' },
    { letter: ['R', 'r'], exampleWord: 'Riba' },
    { letter: ['S', 's'], exampleWord: 'Sunce' },
    { letter: ['Š', 'š'], exampleWord: 'Šuma' },
    { letter: ['T', 't'], exampleWord: 'Trava' },
    { letter: ['U', 'u'], exampleWord: 'Uho' },
    { letter: ['V', 'v'], exampleWord: 'Voda' },
    { letter: ['Z', 'z'], exampleWord: 'Zebra' },
    { letter: ['Ž', 'ž'], exampleWord: 'Žaba' },
];

const serbianAlphabet = [
    { letter: ['А', 'а'], exampleWord: 'Авион' },
    { letter: ['Б', 'б'], exampleWord: 'Бицикл' },
    { letter: ['В', 'в'], exampleWord: 'Вода' },
    { letter: ['Г', 'г'], exampleWord: 'Гитара' },
    { letter: ['Д', 'д'], exampleWord: 'Дрво' },
    { letter: ['Ђ', 'ђ'], exampleWord: 'Ђак' },
    { letter: ['Е', 'е'], exampleWord: 'Екран' },
    { letter: ['Ж', 'ж'], exampleWord: 'Жаба' },
    { letter: ['З', 'з'], exampleWord: 'Зебра' },
    { letter: ['И', 'и'], exampleWord: 'Игла' },
    { letter: ['Ј', 'ј'], exampleWord: 'Јабука' },
    { letter: ['К', 'к'], exampleWord: 'Књига' },
    { letter: ['Л', 'л'], exampleWord: 'Лопта' },
    { letter: ['Љ', 'љ'], exampleWord: 'Љубав' },
    { letter: ['М', 'м'], exampleWord: 'Мачка' },
    { letter: ['Н', 'н'], exampleWord: 'Нога' },
    { letter: ['Њ', 'њ'], exampleWord: 'Њива' },
    { letter: ['О', 'о'], exampleWord: 'Облак' },
    { letter: ['П', 'п'], exampleWord: 'Пас' },
    { letter: ['Р', 'р'], exampleWord: 'Риба' },
    { letter: ['С', 'с'], exampleWord: 'Сунце' },
    { letter: ['Т', 'т'], exampleWord: 'Трава' },
    { letter: ['Ћ', 'ћ'], exampleWord: 'Ћевапи' },
    { letter: ['У', 'у'], exampleWord: 'Уво' },
    { letter: ['Ф', 'ф'], exampleWord: 'Фудбал' },
    { letter: ['Х', 'х'], exampleWord: 'Хаљина' },
    { letter: ['Ц', 'ц'], exampleWord: 'Ципеле' },
    { letter: ['Ч', 'ч'], exampleWord: 'Чаша' },
    { letter: ['Џ', 'џ'], exampleWord: 'Џеп' },
    { letter: ['Ш', 'ш'], exampleWord: 'Шума' },
];

const numbers = [
    { number: 0, word: "nula", ordinal: "nulti" },
    { number: 1, word: "jedan", ordinal: "prvi" },
    { number: 2, word: "dva", ordinal: "drugi" },
    { number: 3, word: "tri", ordinal: "treći" },
    { number: 4, word: "četiri", ordinal: "četvrti" },
    { number: 5, word: "pet", ordinal: "peti" },
    { number: 6, word: "šest", ordinal: "šesti" },
    { number: 7, word: "sedam", ordinal: "sedmi" },
    { number: 8, word: "osam", ordinal: "osmi" },
    { number: 9, word: "devet", ordinal: "deveti" },
    { number: 10, word: "deset", ordinal: "deseti" },
    { number: 11, word: "jedanaest", ordinal: "jedanaesti" },
    { number: 12, word: "dvanaest", ordinal: "dvanaesti" },
    { number: 13, word: "trinaest", ordinal: "trinaesti" },
    { number: 14, word: "četrnaest", ordinal: "četrnaesti" },
    { number: 15, word: "petnaest", ordinal: "petnaesti" },
    { number: 16, word: "šesnaest", ordinal: "šesnaesti" },
    { number: 17, word: "sedamnaest", ordinal: "sedamnaesti" },
    { number: 18, word: "osamnaest", ordinal: "osamnaesti" },
    { number: 19, word: "devetnaest", ordinal: "devetnaesti" },
    { number: 20, word: "dvadeset", ordinal: "dvadeseti" },
    { number: 21, word: "dvadeset jedan", ordinal: "dvadeset prvi" },
    { number: 22, word: "dvadeset dva", ordinal: "dvadeset drugi" },
    { number: 23, word: "dvadeset tri", ordinal: "dvadeset treći" },
    { number: 24, word: "dvadeset četiri", ordinal: "dvadeset četvrti" },
    { number: 25, word: "dvadeset pet", ordinal: "dvadeset peti" },
    { number: 26, word: "dvadeset šest", ordinal: "dvadeset šesti" },
    { number: 27, word: "dvadeset sedam", ordinal: "dvadeset sedmi" },
    { number: 28, word: "dvadeset osam", ordinal: "dvadeset osmi" },
    { number: 29, word: "dvadeset devet", ordinal: "dvadeset deveti" },
    { number: 30, word: "trideset", ordinal: "trideseti" },
    { number: 40, word: "četrdeset", ordinal: "četrdeseti" },
    { number: 50, word: "pedeset", ordinal: "pedeseti" },
    { number: 60, word: "šezdeset", ordinal: "šezdeseti" },
    { number: 70, word: "sedamdeset", ordinal: "sedamdeseti" },
    { number: 80, word: "osamdeset", ordinal: "osamdeseti" },
    { number: 90, word: "devedeset", ordinal: "devedeseti" },
    { number: 100, word: "sto", ordinal: "stoti" },
];

const croatianNumbers = numbers.map(n => {
    if (n.word === "hiljada") return {...n, word: "tisuća", ordinal: "tisućiti" };
    return n;
});

const serbianNumbers = numbers.map(n => {
    if (n.word === "kafa") return {...n, word: "kava"};
    if (n.word === "hvala") return {...n, word: "hvala"};
    return n;
});


const alphabetWordsBosnian = [
  { letter: "A", words: ["auto", "avion", "apoteka", "ananas", "april", "adresa", "alat", "arhitekta", "Afrika", "Amerika"] },
  { letter: "B", words: ["brod", "banana", "beba", "bicikl", "bijela", "balon", "bombon", "brat", "baka", "bazen"] },
  { letter: "C", words: ["cipela", "cesta", "crvena", "cvijet", "cirkus", "car", "crtani", "cijena", "centar", "cimet"] },
  { letter: "Č", words: ["čaša", "čekić", "čokolada", "čarapa", "četka", "čamac", "čovjek", "čelo", "čitati", "četvrtak"] },
  { letter: "Ć", words: ["ćevap", "ćilim", "ćup", "ćelija", "ćumez", "ćud", "ćošak", "ćerka", "ćirilica", "ćuskija"] },
  { letter: "D", words: ["dan", "drvo", "dijete", "djed", "doručak", "delfin", "dugme", "daska", "deset", "dimnjak"] },
  { letter: "Dž", words: ["džezva", "džungla", "džemper", "džudo", "džip", "džamija", "džak", "džumbir", "džin", "džep"] },
  { letter: "Đ", words: ["đak", "đon", "đubrivo", "đevrek", "đumbir", "đerdan", "đubre", "đurina", "đuveč", "đurđica"] },
  { letter: "E", words: ["ekran", "efekat", "energija", "Evropa", "e-mail", "ekonomija", "element", "ekser", "etiketa", "epizoda"] },
  { letter: "F", words: ["film", "fudbal", "fabrika", "flomaster", "fenjer", "fotelja", "fotografija", "farmerke", "februar", "frižider"] },
  { letter: "G", words: ["grad", "gitara", "glava", "golub", "godina", "gumica", "grožđe", "grah", "gost", "gljiva"] },
  { letter: "H", words: ["hljeb", "hlače", "haljina", "historija", "heroj", "hobi", "hotel", "hrana", "hodnik", "hemija"] },
  { letter: "I", words: ["igra", "igla", "ideja", "istorija", "ime", "internet", "inžinjer", "istina", "izvor", "ikona"] },
  { letter: "J", words: ["jabuka", "jaje", "jakna", "jastuk", "jezik", "jezero", "jug", "juni", "juli", "jastreb"] },
  { letter: "K", words: ["knjiga", "kuća", "kapa", "kolač", "krava", "krevet", "kino", "kuhinja", "krompir", "krov"] },
  { letter: "L", words: ["lopta", "lampa", "lice", "limun", "lijek", "livada", "list", "leptir", "lonac", "lasta"] },
  { letter: "Lj", words: ["ljudi", "ljiljan", "ljuljačka", "ljubičica", "ljut", "ljestve", "ljuska", "ljepota", "ljekovit", "ljubomora"] },
  { letter: "M", words: ["majka", "mačka", "miš", "more", "most", "mjesec", "muzika", "med", "mlijeko", "mrkva"] },
  { letter: "N", words: ["noga", "nos", "nebo", "noć", "novac", "naočale", "narandža", "nana", "notes", "novine"] },
  { letter: "Nj", words: ["njiva", "njegov", "njuška", "njegovati", "mišljenje", "putovanje", "pitanje", "sanjati", "gunđati", "njorka"] },
  { letter: "O", words: ["oko", "oblak", "olovka", "otac", "odmor", "orao", "ogledalo", "oktobar", "osam", "orah"] },
  { letter: "P", words: ["pas", "ptica", "prozor", "prst", "pismo", "poklon", "pita", "prijatelj", "ponedjeljak", "petak"] },
  { letter: "R", words: ["ruka", "riba", "rijeka", "robot", "ruža", "raketa", "ručak", "radost", "rep", "rat"] },
  { letter: "S", words: ["sunce", "stolica", "soba", "selo", "sestra", "sat", "sir", "sok", "san", "snijeg"] },
  { letter: "Š", words: ["škola", "šešir", "šator", "šljiva", "šal", "šporet", "šaka", "šah", "šapat", "šuma"] },
  { letter: "T", words: ["trava", "tanjir", "telefon", "tigar", "toplo", "tuš", "torba", "tata", "tramvaj", "torta"] },
  { letter: "U", words: ["uho", "ulica", "učitelj", "učenik", "ulje", "unuk", "ujak", "utorak", "usta", "umjetnik"] },
  { letter: "V", words: ["voda", "voz", "vjetar", "voće", "vuk", "večera", "vatra", "vrata", "visibaba", "vaza"] },
  { letter: "Z", words: ["zec", "zub", "zvijezda", "zgrada", "zima", "zlato", "zelena", "zemlja", "zastava", "zadatak"] },
  { letter: "Ž", words: ["žaba", "žirafa", "žito", "žuta", "žena", "život", "želja", "životinja", "žalost", "žurba"] }
];

const alphabetWordsCroatian = alphabetWordsBosnian.map(item => {
    const newWords = item.words.map(word => {
        return word.replace(/historija/g, 'povijest')
                   .replace(/hljeb/g, 'kruh')
                   .replace(/kafa/g, 'kava')
                   .replace(/mrkva/g, 'mrkva')
                   .replace(/pasulj/g, 'grah')
                   .replace(/fudbal/g, 'nogomet')
                   .replace(/fabrika/g, 'tvornica')
                   .replace(/učenik/g, 'učenik')
                   .replace(/čas/g, 'sat');
    });
    return { ...item, words: newWords };
});

const alphabetWordsSerbian = alphabetWordsBosnian.map(item => {
    const newWords = item.words.map(word => {
        return word.replace(/historija/g, 'istorija')
                   .replace(/hljeb/g, 'hleb')
                   .replace(/kafa/g, 'kafa')
                   .replace(/pasulj/g, 'pasulj')
                   .replace(/fudbal/g, 'fudbal')
                   .replace(/učenik/g, 'učenik')
                   .replace(/čas/g, 'čas')
                   .replace(/mrkva/g, 'šargarepa')
                   .replace(/[Dd]jeca/g, 'deca');
    });
    return { ...item, words: newWords };
});

const bosnianData = {
    alphabet: bosnianAlphabet,
    numbers: numbers,
    alphabetWords: alphabetWordsBosnian,
    vocabulary: [],
    spelling: [
      { id: 1, sentence: 'Moja mama pije ___.', blank: 'kafu', options: ['stolicu', 'kafu', 'lopatom'] },
      { id: 2, sentence: 'Idem u ___.', blank: 'školu', options: ['školu', 'oblak', 'drvetom'] },
      { id: 3, sentence: 'Ovo je moja ___.', blank: 'kuća', options: ['nebo', 'sreća', 'kuća'] },
      { id: 4, sentence: 'Čitam ___.', blank: 'knjigu', options: ['knjigu', 'staklo', 'zidom'] },
      { id: 5, sentence: 'Jedem ___.', blank: 'jabuku', options: ['kamen', 'jabuku', 'cipelom'] },
      { id: 6, sentence: 'Učiteljica nosi ___.', blank: 'naočale', options: ['naočale', 'naočare', 'naoćale'] },
      { id: 7, sentence: 'Na tanjiru je ___.', blank: 'voće', options: ['voće', 'voče', 'voce'] },
      { id: 8, sentence: 'Djed nosi smeđi ___.', blank: 'šešir', options: ['šešir', 'šećir', 'šesir'] },
      { id: 9, sentence: 'Idem u ___ spavati.', blank: 'krevet', options: ['krevet', 'krevit', 'krevat'] },
      { id: 10, sentence: 'Imam novu ___.', blank: 'kuću', options: ['kuću', 'kuču', 'kucu'] },
      { id: 11, sentence: 'U bašči raste crveni ___.', blank: 'cvijet', options: ['cvijet', 'cvjet', 'cvit'] },
      { id: 12, sentence: 'To je moj najbolji ___.', blank: 'prijatelj', options: ['prijatelj', 'prijatel', 'priatelj'] },
      { id: 13, sentence: 'Djevojčica ima dugu ___.', blank: 'kosu', options: ['kosu', 'košu', 'koso'] },
      { id: 14, sentence: 'Baka pravi ukusan ___.', blank: 'kolač', options: ['kolač', 'kolać', 'kolac'] },
      { id: 15, sentence: '___ je zeleno.', blank: 'Lišće', options: ['Lišće', 'Lishche', 'Lisce'] },
      { id: 16, sentence: '___ se igra s loptom.', blank: 'Dječak', options: ['Dječak', 'Dečak', 'Djećak'] },
      { id: 17, sentence: 'U ___ ima puno knjiga.', blank: 'biblioteci', options: ['biblioteci', 'knjižnici', 'knjižnjici'] },
      { id: 18, sentence: 'Danas je lijep dan u ___.', blank: 'Sarajevu', options: ['Sarajevu', 'Sarejevu', 'Sarajvu'] },
      { id: 19, sentence: 'U džezvi se pravi ___.', blank: 'kafa', options: ['kafa', 'ćevap', 'džem'] },
      { id: 20, sentence: 'Volim jesti pitu u ___.', blank: 'buregdžinici', options: ['buregdžinici', 'burekčinici', 'burekcinicu'] },
      { id: 21, sentence: 'Djevojčica sjedi u ___.', blank: 'sjenici', options: ['sjenici', 'śenici', 'sijenici'] },
      { id: 22, sentence: 'On je moj ___.', blank: 'đak', options: ['đak', 'djak', 'džak'] },
      { id: 23, sentence: 'Vani je prava ___.', blank: 'mećava', options: ['mećava', 'mečava', 'mećeva'] },
      { id: 24, sentence: 'Obukao je smeđi ___.', blank: 'džemper', options: ['džemper', 'đemper', 'demper'] },
      { id: 25, sentence: 'Ovo je ___ škola.', blank: 'dječja', options: ['dječja', 'diječja', 'dečja'] },
      { id: 26, sentence: 'U sobi je upaljena ___.', blank: 'svijeća', options: ['svijeća', 'sviječa', 'sveća'] },
      { id: 27, sentence: 'Boli me desno ___.', blank: 'rame', options: ['rame', 'ramje', 'ranje'] },
      { id: 28, sentence: 'Mačka prede u ___.', blank: 'krilu', options: ['krilu', 'krinju', 'krillu'] },
      { id: 29, sentence: 'Žaba je ___ boje.', blank: 'zelene', options: ['zelene', 'zeljene', 'zelene'] },
      { id: 30, sentence: 'Jedem ___ sa medom.', blank: 'kruh/hljeb', options: ['kruh', 'hljeb', 'kruh/hljeb'] },
      { id: 31, sentence: 'Voz ide po ___.', blank: 'šinama', options: ['šinama', 'šjinama', 'sinama'] },
      { id: 32, sentence: 'Moja ___ se zove Ana.', blank: 'sestra', options: ['sestra', 'seka', 'sestrična'] },
      { id: 33, sentence: 'Imam pet ___ na ruci.', blank: 'prstiju', options: ['prstiju', 'prsta', 'prstova'] },
      { id: 34, sentence: 'U šumi živi ___.', blank: 'medvjed', options: ['medvjed', 'medvijed', 'medved'] },
      { id: 35, sentence: '___ je slatko.', blank: 'Grožđe', options: ['Grožđe', 'Grozđe', 'Grožde'] },
      { id: 36, sentence: 'U ___ se peče pita.', blank: 'tepsiji', options: ['tepsiji', 'tefsiji', 'tesiji'] },
      { id: 37, sentence: 'Vidio sam ___ na nebu.', blank: 'dugu', options: ['dugu', 'duhu', 'dugu'] },
      { id: 38, sentence: 'Danas je moj ___.', blank: 'rođendan', options: ['rođendan', 'rođendan', 'rodjendan'] },
      { id: 39, sentence: 'Ovo ___ auto.', blank: 'nije', options: ['nije', 'nie', 'nje'] },
      { id: 40, sentence: 'Ona ne ___ da dođe.', blank: 'želi', options: ['želi', 'želie', 'želji'] },
      { id: 41, sentence: 'Vidio sam ___ na nebu.', blank: 'zvijezde', options: ['zvjezde', 'zvijezde', 'zvezde'] },
      { id: 42, sentence: 'Učiteljica je ocijenila moju ___.', blank: 'zadaću', options: ['zadaću', 'zadaču', 'zadacu'] },
      { id: 43, sentence: 'Posjetili smo glavni grad ___.', blank: 'Bosne i Hercegovine', options: ['bosne', 'Bosne i Hercegovine', 'bosne i hercegovine'] },
      { id: 44, sentence: 'Voz za Tuzlu kreće sa glavne ___.', blank: 'stanice', options: ['stanice', 'stanice', 'stanice'] },
      { id: 45, sentence: 'U ___ ima puno zanimljivih knjiga.', blank: 'biblioteci', options: ['knjižnici', 'biblioteci', 'biblioteki'] },
    ],
    sentences: [
      { id: 1, sentence: 'Dječak čita knjigu.' },
      { id: 2, sentence: 'Djevojčica jede jabuku.' },
      { id: 3, sentence: 'Pas trči brzo.' },
      { id: 4, sentence: 'Mačka spava na suncu.' },
      { id: 5, sentence: 'Mi idemo u školu.' },
      { id: 6, sentence: 'Učiteljica piše na tabli.' },
      { id: 7, sentence: 'Djeca se igraju u parku.' },
      { id: 8, sentence: 'Sunce sija svaki dan.' },
      { id: 9, sentence: 'Ja volim jesti sladoled.' },
      { id: 10, sentence: 'Moj tata vozi auto.' },
      { id: 11, sentence: 'Moja sestra ima lutku.' },
      { id: 12, sentence: 'Oni gledaju crtani film.' },
      { id: 13, sentence: 'Baka plete topli džemper.' },
      { id: 14, sentence: 'Djed čita novine.' },
      { id: 15, sentence: 'Ptica leti visoko na nebu.' },
      { id: 16, sentence: 'Riba pliva u vodi.' },
      { id: 17, sentence: 'Danas je lijep dan.' },
      { id: 18, sentence: 'Snijeg pada zimi.' },
      { id: 19, sentence: 'Volim crtati cvijeće.' },
      { id: 20, sentence: 'Moja lopta je crvena.' },
      { id: 21, sentence: 'Pijemo hladnu limunadu.' },
      { id: 22, sentence: 'Voz putuje brzo.' },
      { id: 23, sentence: 'On ima novu igračku.' },
      { id: 24, sentence: 'Ona pjeva lijepu pjesmu.' },
      { id: 25, sentence: 'Idemo na izlet sutra.' },
      { id: 26, sentence: 'Mama kuha ukusan ručak.' },
      { id: 27, sentence: 'Ja živim u velikoj kući.' },
      { id: 28, sentence: 'Moj bicikl je plave boje.' },
      { id: 29, sentence: 'U moru plivaju ribe.' },
      { id: 30, sentence: 'Medvjed spava zimski san.' },
      { id: 31, sentence: 'Zimi nosimo tople kape.' },
      { id: 32, sentence: 'Volim piti topli čaj.' },
      { id: 33, sentence: 'U zoološkom vrtu živi lav.' },
      { id: 34, sentence: 'Učimo slova u školi.' },
      { id: 35, sentence: 'Jabuka je zdravo voće.' },
      { id: 36, sentence: 'Adnan je moj najbolji drug.' },
      { id: 37, sentence: 'Emina ima dugu plavu kosu.' },
      { id: 38, sentence: 'Idemo u avliju da se igramo.' },
      { id: 39, sentence: 'Nana pravi pitu u tepsiji.' },
      { id: 40, sentence: 'Naša mačka voli da se mazi.' },
      { id: 41, sentence: 'Otac i sin idu u ribolov.' },
      { id: 42, sentence: 'Volim crtati šarene leptire.' },
      { id: 43, sentence: 'Vani pada jaka kiša.' },
      { id: 44, sentence: 'Danas učimo pisati nova slova.' },
      { id: 45, sentence: 'Moj djed ima veliki vrt.' },
      { id: 46, sentence: 'Uskoro će ljetni raspust.' },
      { id: 47, sentence: 'Idemo u kino gledati novi film.' },
      { id: 48, sentence: 'Na stolu je svježe voće.' },
      { id: 49, sentence: 'Zajedno pravimo Snješka Bijelića.' },
      { id: 50, sentence: 'Olovka je na stolu.' },
    ],
    grammar: [
      { id: 1, sentence: 'Dječak ___ loptu.', blank: 'ima', options: ['ima', 'imaju', 'imamo'], explanation: 'Subjekt u jednini (dječak) zahtijeva glagol u trećem licu jednine (ima).' },
      { id: 2, sentence: 'Djevojčice se ___.', blank: 'igraju', options: ['igra', 'igraš', 'igraju'], explanation: 'Subjekt u množini (djevojčice) zahtijeva glagol u trećem licu množine (igraju).' },
      { id: 3, sentence: 'Ovo je ___ kuća.', blank: 'moja', options: ['moj', 'moja', 'moje'], explanation: 'Imenica "kuća" je ženskog roda, pa prisvojna zamjenica mora biti u ženskom rodu (moja).' },
      { id: 4, sentence: 'Idem u ___ grad.', blank: 'veliki', options: ['veliki', 'velika', 'veliko'], explanation: 'Imenica "grad" je muškog roda, pa pridjev mora biti u muškom rodu (veliki).' },
      { id: 5, sentence: 'Jedem ___ jabuku.', blank: 'crvenu', options: ['crveni', 'crvena', 'crvenu'], explanation: 'U akuzativu jednine ženskog roda, pridjev "crven" ima oblik "crvenu".' },
      { id: 6, sentence: 'Mi ___ u parku.', blank: 'smo', options: ['sam', 'si', 'smo'], explanation: 'Glagol "biti" u prezentu za 1. lice množine (mi) glasi "smo".' },
      { id: 7, sentence: 'Oni ___ iz Sarajeva.', blank: 'su', options: ['je', 'smo', 'su'], explanation: 'Glagol "biti" u prezentu za 3. lice množine (oni) glasi "su".' },
      { id: 8, sentence: 'Ovo je ___ auto.', blank: 'tatino', options: ['tatin', 'tatina', 'tatino'], explanation: 'Imenica "auto" je srednjeg roda, pa prisvojni pridjev mora biti u srednjem rodu (tatino).' },
      { id: 9, sentence: 'Mačka spava na ___.', blank: 'krovu', options: ['krov', 'krova', 'krovu'], explanation: 'Lokativ (gdje spava?) zahtijeva nastavak -u za imenice muškog roda.' },
      { id: 10, sentence: 'Idem u školu ___ autobusom.', blank: 'sa', options: ['s', 'sa', 'za'], explanation: 'Prijedlog "sa" se koristi ispred suglasničkih skupina koje je teško izgovoriti s "s".' },
      { id: 11, sentence: 'Amina je ___ od Emine.', blank: 'viša', options: ['visoka', 'viša', 'najviša'], explanation: 'Komparativ (poređenje) od pridjeva "visok" glasi "viša".' },
      { id: 12, sentence: 'Učim ___ bosanski jezik.', blank: 'da govorim', options: ['govoriti', 'da govorim', 'govoreći'], explanation: 'Konstrukcija "učiti da" se često koristi za izražavanje učenja vještine.' },
      { id: 13, sentence: 'Vidio sam ___ psa.', blank: 'velikog', options: ['velik', 'velikog', 'velikom'], explanation: 'Akuzativ (koga/šta vidim?) zahtijeva pridjev u akuzativu muškog roda (velikog).' },
      { id: 14, sentence: 'Sjedim na ___ stolici.', blank: 'maloj', options: ['mala', 'malu', 'maloj'], explanation: 'Lokativ (na čemu sjedim?) zahtijeva pridjev u lokativu ženskog roda (maloj).' },
      { id: 15, sentence: 'Danas ___ padati kiša.', blank: 'će', options: ['će', 'ću', 'ćemo'], explanation: 'Futur I (buduće vrijeme) za 3. lice jednine tvori se s pomoćnim glagolom "će".' },
      { id: 16, sentence: 'Gdje si ___?', blank: 'bio', options: ['bio', 'bila', 'bilo'], explanation: 'Ako je pitanje upućeno muškoj osobi, koristi se glagolski pridjev radni "bio".' },
      { id: 17, sentence: 'Šta ___ radili jučer?', blank: 'ste', options: ['si', 'ste', 'smo'], explanation: 'Glagol "biti" u perfektu za 2. lice množine (vi) glasi "ste".' },
      { id: 18, sentence: 'Ovo je cvijet ___ lijepo miriše.', blank: 'koji', options: ['koji', 'koja', 'koje'], explanation: 'Odnosna zamjenica "koji" se odnosi na imenicu "cvijet" (muški rod).' },
      { id: 19, sentence: 'Ne ___ to uraditi.', blank: 'mogu', options: ['mogu', 'možeš', 'može'], explanation: 'Glagol "moći" u prezentu za 1. lice jednine (ja) glasi "mogu".' },
      { id: 20, sentence: 'Da ___ novca, kupio bih auto.', blank: 'imam', options: ['imam', 'imaš', 'ima'], explanation: 'Uvjetne (kondicionalne) rečenice često koriste prezent u zavisnoj rečenici.' },
      { id: 21, sentence: 'Ja ___ pismo.', blank: 'pišem', options: ['pišem', 'pišeš', 'piše'], explanation: 'Glagol "pisati" u prezentu za 1. lice jednine (ja) glasi "pišem".' },
      { id: 22, sentence: 'Ti ___ lijepo.', blank: 'pjevaš', options: ['pjevam', 'pjevaš', 'pjeva'], explanation: 'Glagol "pjevati" u prezentu za 2. lice jednine (ti) glasi "pjevaš".' },
      { id: 23, sentence: 'Ona ___ na moru.', blank: 'je', options: ['sam', 'si', 'je'], explanation: 'Glagol "biti" u prezentu za 3. lice jednine (ona) glasi "je".' },
      { id: 24, sentence: 'Lejla ima ___ oči.', blank: 'plave', options: ['plav', 'plava', 'plave'], explanation: 'Imenica "oči" je u množini ženskog roda, pa pridjev mora biti u množini (plave).' },
      { id: 25, sentence: 'Dao sam knjigu ___.', blank: 'prijatelju', options: ['prijatelj', 'prijatelja', 'prijatelju'], explanation: 'Dativ (kome/čemu dajem?) zahtijeva nastavak -u za imenice muškog roda.' },
      { id: 26, sentence: 'Ovo je poklon za ___.', blank: 'tebe', options: ['ti', 'tebe', 'tobom'], explanation: 'Prijedlog "za" zahtijeva akuzativ lične zamjenice, što je "tebe".' },
      { id: 27, sentence: 'Nemam ___ vremena.', blank: 'puno', options: ['puno', 'pun', 'puna'], explanation: 'Uz genitiv (nemam čega?), koristi se prilog za količinu "puno".' },
      { id: 28, sentence: 'Djeca su ___ dvorištu.', blank: 'u', options: ['u', 'na', 'sa'], explanation: 'Prijedlog "u" se koristi za označavanje mjesta unutar nečega (u dvorištu).' },
      { id: 29, sentence: 'Jučer sam ___ u kino.', blank: 'išao', options: ['išao', 'idem', 'ići'], explanation: 'Perfekt (prošlo vrijeme) za 1. lice jednine muškog roda glasi "sam išao".' },
      { id: 30, sentence: 'Sutra ___ na izlet.', blank: 'idemo', options: ['idem', 'ideš', 'idemo'], explanation: 'Prezent se može koristiti za izražavanje bliske budućnosti. Za "mi" oblik je "idemo".' },
      { id: 31, sentence: '___ je najviša planina u BiH.', blank: 'Maglić', options: ['Bjelašnica', 'Maglić', 'Igman'], explanation: 'Činjenično znanje o geografiji.' },
      { id: 32, sentence: 'S kim ___ u šetnju?', blank: 'ideš', options: ['idem', 'ideš', 'ide'], explanation: 'Pitanje upućeno drugoj osobi ("ti") zahtijeva glagol u 2. licu jednine.' },
      { id: 33, sentence: 'Pas je ___ od mačke.', blank: 'veći', options: ['veći', 'velik', 'najveći'], explanation: 'Komparativ (poređenje) pridjeva "velik" je "veći".' },
      { id: 34, sentence: 'Volim jesti ___ pitu.', blank: 'naninu', options: ['nanin', 'nanina', 'naninu'], explanation: 'Akuzativ jednine ženskog roda (pitu) zahtijeva pridjev u istom padežu (naninu).' },
      { id: 35, sentence: 'U ___ ima sedam dana.', blank: 'sedmici', options: ['danu', 'mjesecu', 'sedmici'], explanation: 'Logičko i činjenično znanje.' },
    ],
    reading: [
      {
        id: 1,
        title: "Izlet u šumu",
        text: "Jednog sunčanog dana, Amina i njen brat Adnan su otišli na izlet u šumu sa roditeljima. Ponijeli su korpu punu hrane. U šumi su vidjeli mnogo drveća i čuli cvrkut ptica. Adnan je vidio vjevericu kako se penje uz drvo. Amina je brala šareno cvijeće. Nakon šetnje, sjeli su na deku i ručali. Bio je to divan dan.",
        questions: [
          { id: 1, question: "Ko je otišao na izlet?", options: ["Samo Amina", "Amina i Adnan sa roditeljima", "Samo Adnan"], answer: "Amina i Adnan sa roditeljima" },
          { id: 2, question: "Šta je Adnan vidio u šumi?", options: ["Zeca", "Medvjeda", "Vjevericu"], answer: "Vjevericu" },
          { id: 3, question: "Šta je Amina radila?", options: ["Pela se na drvo", "Brala cvijeće", "Spavala"], answer: "Brala cvijeće" },
          { id: 4, question: "Kakav je bio dan?", options: ["Kišovit", "Divan", "Hladan"], answer: "Divan" }
        ]
      },
      {
        id: 2,
        title: "Pas Medo",
        text: "Dječak po imenu Amar ima psa koji se zove Medo. Medo je veliki žuti pas sa dugim repom. Svaki dan, Amar i Medo idu u park. Amar baca lopticu, a Medo je donosi nazad. Medo voli da se igra i da laje na mačke. Navečer, Medo spava u svojoj kućici u dvorištu. Amar mnogo voli svog psa.",
        questions: [
          { id: 1, question: "Kako se zove Amarov pas?", options: ["Žućo", "Lajko", "Medo"], answer: "Medo" },
          { id: 2, question: "Gdje se Amar i Medo igraju?", options: ["U kući", "U parku", "U školi"], answer: "U parku" },
          { id: 3, question: "Šta Amar baca Medi?", options: ["Kamen", "Granu", "Lopticu"], answer: "Lopticu" },
          { id: 4, question: "Gdje Medo spava?", options: ["U Amarovom krevetu", "U svojoj kućici", "Na drvetu"], answer: "U svojoj kućici" }
        ]
      },
      {
        id: 3,
        title: "Rođendan",
        text: "Danas je Lejlin rođendan. Ona puni sedam godina. Mama joj je ispekla veliku čokoladnu tortu. Lejla je pozvala svoje prijatelje na proslavu. Dobila je mnogo poklona. Najviše joj se svidjela nova lutka i slikovnica. Svi su zajedno pjevali rođendansku pjesmu i igrali se. Lejla je bila veoma sretna.",
        questions: [
          { id: 1, question: "Čiji je rođendan?", options: ["Mamin", "Lejlin", "Prijatelja"], answer: "Lejlin" },
          { id: 2, question: "Koliko godina Lejla puni?", options: ["Šest", "Sedam", "Osam"], answer: "Sedam" },
          { id: 3, question: "Šta joj je mama ispekla?", options: ["Kolače", "Pitu", "Tortu"], answer: "Tortu" },
          { id: 4, question: "Koji poklon joj se najviše svidio?", options: ["Lopta", "Lutka i slikovnica", "Bicikl"], answer: "Lutka i slikovnica" },
          { id: 5, question: "Kako se Lejla osjećala?", options: ["Tužno", "Ljutito", "Sretno"], answer: "Sretno" }
        ]
      },
      {
          id: 4,
          title: "Zima na selu",
          text: "Došla je zima. Snijeg je prekrio cijelo selo. Tarik i njegova sestra Ema su se obradovali snijegu. Obukli su tople jakne, kape i rukavice. Izašli su u avliju i pravili Snješka Bijelića. Oči su mu napravili od dva ugljena, a nos od mrkve. Poslije su se grudvali i smijali. Bilo im je jako zabavno.",
          questions: [
            { id: 1, question: "Koje godišnje doba je došlo?", options: ["Ljeto", "Jesen", "Zima"], answer: "Zima" },
            { id: 2, question: "Šta su Tarik i Ema pravili?", options: ["Kuću od snijega", "Anđela u snijegu", "Snješka Bijelića"], answer: "Snješka Bijelića" },
            { id: 3, question: "Od čega su napravili nos Snješku?", options: ["Od kamena", "Od mrkve", "Od dugmeta"], answer: "Od mrkve" },
            { id: 4, question: "Šta su radili poslije pravljenja Snješka?", options: ["Pili čaj", "Grudvali se", "Gledali TV"], answer: "Grudvali se" }
          ]
      },
      {
        id: 5,
        title: "U biblioteci",
        text: "Emina voli čitati. Svake subote ide u gradsku biblioteku. Biblioteka je velika zgrada puna polica s knjigama. Emina najviše voli čitati bajke i priče o životinjama. Prošle subote je posudila knjigu o malom medvjedu koji je tražio prijatelje. Knjiga je bila vrlo zanimljiva i poučna. Naučila je da je prijateljstvo važno. Emina jedva čeka sljedeću subotu da posudi novu knjigu.",
        questions: [
          { id: 1, question: "Kada Emina ide u biblioteku?", options: ["Svaki dan", "Svake subote", "Svakog mjeseca"], answer: "Svake subote" },
          { id: 2, question: "Kakve knjige Emina najviše voli čitati?", options: ["Naučne knjige", "Pjesme", "Bajke i priče o životinjama"], answer: "Bajke i priče o životinjama" },
          { id: 3, question: "O čemu je bila knjiga koju je posudila?", options: ["O malom medvjedu", "O svemirskom brodu", "O dinosaurima"], answer: "O malom medvjedu" },
          { id: 4, question: "Šta je Emina naučila iz knjige?", options: ["Da je važno biti brz", "Da je prijateljstvo važno", "Kako se pravi kolač"], answer: "Da je prijateljstvo važno" }
        ]
      },
    ],
    translations: [
      { id: 1, type: 'word', source: 'kaffe', target: 'kafa' },
      { id: 2, type: 'word', source: 'skola', target: 'škola' },
      { id: 3, type: 'word', source: 'hus', target: 'kuća' },
      { id: 4, type: 'word', source: 'bok', target: 'knjiga' },
      { id: 5, type: 'word', source: 'äpple', target: 'jabuka' },
      { id: 6, type: 'word', source: 'bil', target: 'auto' },
      { id: 7, type: 'word', source: 'katt', target: 'mačka' },
      { id: 8, type: 'word', source: 'hund', target: 'pas' },
      { id: 9, type: 'word', source: 'boll', target: 'lopta' },
      { id: 10, type: 'word', source: 'sol', target: 'sunce' },
      { id: 11, type: 'sentence', source: 'Pojken läser en bok.', target: 'Dječak čita knjigu.' },
      { id: 12, type: 'sentence', source: 'Flickan äter ett äpple.', target: 'Djevojčica jede jabuku.' },
      { id: 13, type: 'sentence', source: 'Hunden springer snabbt.', target: 'Pas trči brzo.' },
      { id: 14, type: 'sentence', source: 'Vi går till skolan.', target: 'Mi idemo u školu.' },
      { id: 15, type: 'sentence', source: 'Min pappa kör bilen.', target: 'Moj tata vozi auto.' },
      { id: 16, type: 'word', source: 'lärare', target: 'učitelj' },
      { id: 17, type: 'word', source: 'blomma', target: 'cvijet' },
      { id: 18, type: 'word', source: 'vatten', target: 'voda' },
      { id: 19, type: 'word', source: 'vän', target: 'prijatelj' },
      { id: 20, type: 'word', source: 'fönster', target: 'prozor' },
      { id: 21, type: 'sentence', source: 'Jag bor i ett stort hus.', target: 'Živim u velikoj kući.' },
      { id: 22, type: 'sentence', source: 'Katten sover på stolen.', target: 'Mačka spava na stolici.' },
      { id: 23, type: 'sentence', source: 'Min syster är glad.', target: 'Moja sestra je sretna.' },
      { id: 24, type: 'sentence', source: 'Idag är en vacker dag.', target: 'Danas je lijep dan.' },
      { id: 25, type: 'sentence', source: 'Jag älskar att äta glass.', target: 'Volim jesti sladoled.' },
      { id: 26, type: 'word', source: 'bröd', target: 'kruh/hljeb' },
      { id: 27, type: 'word', source: 'mjölk', target: 'mlijeko' },
      { id: 28, type: 'sentence', source: 'Jag dricker mjölk varje morgon.', target: 'Pijem mlijeko svako jutro.' },
      { id: 29, type: 'word', source: 'glädje', target: 'radost' },
      { id: 30, type: 'sentence', source: 'Barnen leker med glädje.', target: 'Djeca se igraju s radošću.' },
    ]
};

const croatianData = {
    ...bosnianData,
    alphabet: croatianAlphabet,
    numbers: croatianNumbers,
    alphabetWords: alphabetWordsCroatian,
    spelling: bosnianData.spelling.map(item => ({
        ...item,
        sentence: item.sentence.replace(/hljeb/g, 'kruh').replace(/kafu/g, 'kavu').replace(/pasulj/g, 'grah'),
        blank: item.blank.replace(/hljeb/g, 'kruh').replace(/kafu/g, 'kavu').replace(/pasulj/g, 'grah'),
        options: item.options.map(o => o.replace(/hljeb/g, 'kruh').replace(/kafu/g, 'kavu').replace(/pasulj/g, 'grah'))
    })),
    sentences: bosnianData.sentences.map(item => ({
        ...item,
        sentence: item.sentence.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah')
    })),
    grammar: bosnianData.grammar.map(item => ({
        ...item,
        sentence: item.sentence.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
        blank: item.blank.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
        options: item.options.map(o => o.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah')),
        explanation: item.explanation.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
    })),
    reading: bosnianData.reading.map(item => ({
        ...item,
        title: item.title.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
        text: item.text.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
        questions: item.questions.map(q => ({
            ...q,
            question: q.question.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah'),
            options: q.options.map(o => o.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah')),
            answer: q.answer.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah')
        }))
    })),
    translations: bosnianData.translations.map(item => ({
        ...item,
        target: item.target.replace(/hljeb/g, 'kruh').replace(/kafa/g, 'kava').replace(/pasulj/g, 'grah')
    }))
};

const serbianData = {
    ...bosnianData,
    alphabet: serbianAlphabet,
    numbers: serbianNumbers,
    alphabetWords: alphabetWordsSerbian,
    spelling: bosnianData.spelling.map(item => ({
        ...item,
        sentence: item.sentence.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        blank: item.blank.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        options: item.options.map(o => o.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'))
    })),
    sentences: bosnianData.sentences.map(item => ({
        ...item,
        sentence: item.sentence.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca')
    })),
    grammar: bosnianData.grammar.map(item => ({
        ...item,
        sentence: item.sentence.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        blank: item.blank.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        options: item.options.map(o => o.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca')),
        explanation: item.explanation.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
    })),
    reading: bosnianData.reading.map(item => ({
        ...item,
        title: item.title.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        text: item.text.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
        questions: item.questions.map(q => ({
            ...q,
            question: q.question.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca'),
            options: q.options.map(o => o.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca')),
            answer: q.answer.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca')
        }))
    })),
    translations: bosnianData.translations.map(item => ({
        ...item,
        target: item.target.replace(/historija/g, 'istorija').replace(/[Dd]jeca/g, 'deca')
    }))
};

// Deep copy and specific changes
const createGradeData = (data) => {
    return {
        alphabet: data.alphabet,
        numbers: data.numbers,
        alphabetWords: data.alphabetWords,
        vocabulary: [],
        spelling: JSON.parse(JSON.stringify(data.spelling)),
        sentences: JSON.parse(JSON.stringify(data.sentences)),
        grammar: JSON.parse(JSON.stringify(data.grammar)),
        reading: JSON.parse(JSON.stringify(data.reading)),
        translations: JSON.parse(JSON.stringify(data.translations)),
    };
}

export const data: LanguageData = {
  bosnian: {
    '1-3': createGradeData(bosnianData),
    '4-6': createGradeData(bosnianData),
    '7-9': createGradeData(bosnianData),
  },
  croatian: {
    '1-3': createGradeData(croatianData),
    '4-6': createGradeData(croatianData),
    '7-9': createGradeData(croatianData),
  },
  serbian: {
    '1-3': createGradeData(serbianData),
    '4-6': createGradeData(serbianData),
    '7-9': createGradeData(serbianData),
  },
};
