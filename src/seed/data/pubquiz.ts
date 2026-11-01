import type { L, SeedBundle, SeedLesson, SeedQuestion } from '../types';

// General trivia — pub-quiz-style knowledge across every field. The first
// lessons are the categories Mongolian pub quizzes keep coming back to (see quiz-backend/QUIZ-LEAGUE-ANALYSIS.md —
// the analysis of the games). Questions marked source: 'show' were asked at real games (photos
// of the answer sheets and the game slides), rewritten as 4-choice.
// More general-trivia lessons live in extra/trivia-*.json.
// Gemini-written "predicted" questions live in generated/pubquiz.json.

const T = 'pubquiz';

type Choice = [en: string, mn: string];

const lesson = (
  key: string,
  order: number,
  title: L,
  summary: L,
  body: L,
  cards: { icon: string; title: L; facts: L[] }[],
  funFacts: L[]
): SeedLesson => ({
  topicSlug: T,
  key: `${T}.${key}`,
  order,
  title,
  summary,
  body,
  visual: { kind: 'cards', items: cards },
  funFacts,
});

const counter: Record<string, number> = {};
const q = (
  lessonKey: string,
  difficulty: 1 | 2 | 3,
  prompt: L,
  choices: Choice[],
  answer: number,
  explanation: L,
  source: 'show' | 'predicted' = 'show'
): SeedQuestion => {
  counter[lessonKey] = (counter[lessonKey] ?? 0) + 1;
  return {
    topicSlug: T,
    lessonKey: `${T}.${lessonKey}`,
    key: `${T}.${lessonKey}.s${counter[lessonKey]}`,
    difficulty,
    prompt,
    choices: choices.map(([en, mn]) => ({ en, mn })),
    answer,
    explanation,
    source,
  };
};

const lessons: SeedLesson[] = [
  lesson(
    'cinema',
    1,
    { en: 'Cinema: Awards & Classics', mn: 'Кино: шагнал ба сонгодог' },
    {
      en: 'The biggest trivia category — Oscars, festivals, Soviet classics and horror.',
      mn: 'Ерөнхий мэдлэгийн хамгийн том сэдэв — Оскар, кино наадам, Зөвлөлтийн сонгодог, аймшгийн кино.',
    },
    {
      en: 'Roughly a third of pub-quiz questions are about film. Question writers love "the only film that…" records (festival winners that also took Best Picture), Soviet classics everyone in Mongolia has seen, horror trivia and picture rounds with posters or stills.',
      mn: 'Паб квизийн асуултын бараг гуравны нэг нь кино. Асуулт бэлтгэгчид «… цорын ганц кино» гэх мэт рекорд (наадмын шагнал болон Оскарын шилдэг киног хамт авсан), Монголд бүгд үзсэн Зөвлөлтийн сонгодог, аймшгийн киноны сонин баримт, постер, кадраар таах асуултад дуртай.',
    },
    [
      {
        icon: '🏆',
        title: { en: 'Festival + Best Picture', mn: 'Наадам + Шилдэг кино' },
        facts: [
          { en: 'Cannes Palme d’Or + Oscar: The Lost Weekend, Marty, Parasite', mn: 'Канн + Оскар: «The Lost Weekend», «Marty», «Паразит»' },
          { en: 'Berlin Golden Bear + Oscar: only Rain Man (1988)', mn: 'Берлиний Алтан баавгай + Оскар: зөвхөн «Rain Man» (1988)' },
          { en: 'Venice Golden Lion + Oscar: Hamlet (1948), The Shape of Water, Nomadland', mn: 'Венецийн Алтан арслан + Оскар: «Гамлет» (1948), «The Shape of Water», «Nomadland»' },
        ],
      },
      {
        icon: '🎞️',
        title: { en: 'Soviet classics', mn: 'Зөвлөлтийн сонгодог' },
        facts: [
          { en: 'Moscow Does Not Believe in Tears — Oscar for Best Foreign Film, 1981', mn: '«Амьдрал нулимсанд дургүй» — 1981 онд Оскарын гадаад хэлний шилдэг кино' },
          { en: 'Directors to know: Menshov, Ryazanov, Gaidai, Tarkovsky', mn: 'Мэдэх ёстой найруулагчид: Меньшов, Рязанов, Гайдай, Тарковский' },
        ],
      },
      {
        icon: '🔪',
        title: { en: 'Horror', mn: 'Аймшгийн кино' },
        facts: [
          { en: 'Carrie (1976): the bucket held pig’s blood', mn: '«Carrie» (1976): хувинд гахайн цус байсан' },
          { en: 'Johnny Depp’s first film: A Nightmare on Elm Street (1984)', mn: 'Жонни Деппийн анхны кино: «A Nightmare on Elm Street» (1984)' },
          { en: 'Friday the 13th (1980): the killer is Pamela Voorhees, not Jason', mn: '«Friday the 13th» (1980): алуурчин нь Жейсон биш, ээж Памела Ворхис' },
        ],
      },
    ],
    [
      { en: 'Rotten Tomatoes calls a film "Rotten" when under 60% of critics like it.', mn: 'Шүүмжлэгчдийн 60%-иас цөөн нь таалсан киног Rotten Tomatoes «Rotten» гэж тэмдэглэдэг.' },
      { en: 'In The Green Mile (1999) the gentle giant on death row is John Coffey.', mn: '«Ногоон миль» (1999) кинонд цаазаар авахуулахаар хоригдож буй номхон аварга бол Жон Коффи.' },
    ]
  ),
  lesson(
    'literature',
    2,
    { en: 'Literature: Stories Behind Books', mn: 'Уран зохиол: номын ард түүх' },
    { en: 'Russian and European classics, told through the author’s life.', mn: 'Орос, Европын сонгодог зохиолыг зохиолчийн амьдралаар нь асуудаг.' },
    {
      en: 'Literature questions are rarely "who wrote X". They tell a story about how a book was made — a deadline, a debt, a prison sentence — and ask you to name it. Russian classics (Dostoevsky, Pushkin, Tolstoy, Chekhov) and Dumas come up most.',
      mn: 'Уран зохиолын асуулт «X-г хэн бичсэн бэ» гэж бараг асуудаггүй. Харин ном хэрхэн бичигдсэн түүхийг — хугацаа, өр, шорон — ярьж өгөөд нэрийг нь таалгадаг. Орос сонгодог (Достоевский, Пушкин, Толстой, Чехов) болон Дюма хамгийн их гардаг.',
    },
    [
      {
        icon: '🎲',
        title: { en: 'The Gambler (1866)', mn: '«Мөрийч» (1866)' },
        facts: [
          { en: 'Dostoevsky dictated it in 26 days to beat a publisher’s deadline', mn: 'Достоевский хэвлэлийн гэрээний хугацаанд амжихын тулд 26 хоногт бичүүлжээ' },
          { en: 'The stenographer, Anna Snitkina, became his wife', mn: 'Бичээч Анна Сниткина хожим түүний эхнэр болсон' },
        ],
      },
      {
        icon: '⛓️',
        title: { en: 'The Count of Monte Cristo', mn: '«Монте-Кристо гүн»' },
        facts: [{ en: 'Edmond Dantès spends 14 years in the Château d’If', mn: 'Эдмон Дантес Иф цайзад 14 жил хоригдсон' }],
      },
      {
        icon: '🐟',
        title: { en: 'Pushkin’s Golden Fish', mn: 'Пушкины «Алтан загас»' },
        facts: [
          { en: 'The old woman asks for: a trough, a house, to be a noblewoman, a tsaritsa, ruler of the sea', mn: 'Эмгэн: тэвш, байшин, язгууртан, хатан, далайн эзэн болохыг гуйсан' },
        ],
      },
    ],
    [
      { en: 'Gadsby (1939) by Ernest Vincent Wright is a 50,000-word novel without the letter E.', mn: 'Эрнест Винсент Райтын «Gadsby» (1939) роман 50,000 үгтэй ч «E» үсэг огт ороогүй.' },
    ]
  ),
  lesson(
    'history',
    3,
    { en: 'History: 20th Century & Firsts', mn: 'Түүх: 20-р зуун ба анхдагчид' },
    { en: 'WWII, independence firsts, flags and famous ships.', mn: 'Дэлхийн II дайн, анхны тусгаар тогтнол, далбаа, алдартай хөлөг.' },
    {
      en: 'History rounds favour "first" and "last" facts (the first independent Latin American country, the last day of the century), leaders of WWII, and objects with a story such as flags and the Titanic.',
      mn: 'Түүхийн асуултад «анхны», «сүүлчийн» баримт (Латин Америкийн анхны тусгаар улс, зууны сүүлчийн өдөр), Дэлхийн II дайны удирдагчид, далбаа, Титаник шиг түүхтэй зүйлс давамгайлдаг.',
    },
    [
      {
        icon: '🗓️',
        title: { en: 'Trick dates', mn: 'Заль бүхий огноо' },
        facts: [
          { en: 'The 20th century ended on 31 December 2000, not 1999', mn: '20-р зуун 1999 биш, 2000 оны 12-р сарын 31-нд дууссан' },
          { en: 'Haiti (1804) was the first independent Latin American country', mn: 'Гаити (1804) Латин Америкийн анхны тусгаар тогтносон улс' },
        ],
      },
      {
        icon: '🚢',
        title: { en: 'RMS Titanic', mn: 'RMS Titanic' },
        facts: [{ en: 'RMS = Royal Mail Ship (or Steamer): it carried the mail', mn: 'RMS = Royal Mail Ship — шуудан тээдэг хөлөг' }],
      },
      {
        icon: '🚩',
        title: { en: 'Flags', mn: 'Далбаа' },
        facts: [
          { en: 'East Germany’s flag = West Germany’s plus a hammer-and-compass emblem; in 1989 protesters cut the emblem out', mn: 'Зүүн Германы далбаа = Баруун Германых + алх, циркультай сүлд; 1989 онд жагсагчид сүлдийг нь хайчилж авдаг байв' },
        ],
      },
    ],
    [{ en: 'Chiang Kai-shek led the Kuomintang and Republic of China during WWII.', mn: 'Чан Кайши Дэлхийн II дайны үед Гоминдан намыг, Бүгд Найрамдах Хятад Улсыг удирдаж байв.' }]
  ),
  lesson(
    'world',
    4,
    { en: 'World & Mongolia: Places', mn: 'Дэлхий ба Монгол: газар орон' },
    { en: 'Capitals, mottos, look-alike city names and Mongolian aimag borders.', mn: 'Нийслэл, уриа, төстэй нэртэй хотууд, аймгуудын хил.' },
    {
      en: 'Geography comes as "which one is NOT" lists (Edinburgh, Hamburg, Pittsburgh, Salzburg), less-known capitals, national mottos and Mongolian aimag neighbours.',
      mn: 'Газарзүйн асуулт ихэвчлэн «аль нь … биш вэ» хэлбэртэй (Эдинбург, Хамбург, Питтсбург, Зальцбург), бага мэддэг нийслэл, улсын уриа, Монголын аймгуудын хөрш зэргээр ирдэг.',
    },
    [
      {
        icon: '🗺️',
        title: { en: 'Arkhangai’s neighbours', mn: 'Архангайн хөршүүд' },
        facts: [{ en: 'Khövsgöl, Bulgan, Övörkhangai, Bayankhongor, Zavkhan — not Töv', mn: 'Хөвсгөл, Булган, Өвөрхангай, Баянхонгор, Завхан — Төв биш' }],
      },
      {
        icon: '🌧️',
        title: { en: 'Mottos', mn: 'Улсын уриа' },
        facts: [
          { en: 'Botswana: "Pula" = rain', mn: 'Ботсвана: «Pula» = бороо' },
          { en: 'Lesotho: "Peace, Rain, Prosperity"', mn: 'Лесото: «Энх тайван, бороо, хөгжил цэцэглэлт»' },
        ],
      },
      {
        icon: '🏙️',
        title: { en: 'Capitals', mn: 'Нийслэл' },
        facts: [{ en: 'Cameroon → Yaoundé (Douala is the biggest city)', mn: 'Камерун → Яунде (хамгийн том хот нь Дуала)' }],
      },
    ],
    [{ en: 'Pittsburgh is in Pennsylvania, USA — the odd one out among European "-burg" cities.', mn: 'Питтсбург АНУ-ын Пенсильвани мужид байдаг — Европын «-бург» хотуудын дунд илүүц нь.' }]
  ),
  lesson(
    'nature',
    5,
    { en: 'Animals & Nature', mn: 'Амьтан, байгаль' },
    { en: 'Dog and cat breeds, strange defences, ancestors of farm animals.', mn: 'Нохой, муурны үүлдэр, хачин хамгаалалт, гэрийн амьтдын өвөг.' },
    {
      en: 'Animal questions test breeds and where they come from, scientific words (thanatosis), what an animal eats and which wild bird or beast a farm animal descends from.',
      mn: 'Амьтны асуулт үүлдэр, гарал, шинжлэх ухааны нэр томьёо (танатоз), юу иддэг, гэрийн амьтан ямар зэрлэг амьтнаас гаралтайг шалгадаг.',
    },
    [
      {
        icon: '🐕',
        title: { en: 'Breeds', mn: 'Үүлдэр' },
        facts: [
          { en: 'Malinois — Belgian shepherd dog, from Mechelen (Malines)', mn: 'Малинуа — Бельгийн хоньчны нохой, Мехелен (Малин) хотоос' },
          { en: 'Bombay cat — always jet-black', mn: 'Бомбей муур — үргэлж хав хар' },
        ],
      },
      {
        icon: '🐔',
        title: { en: 'Wild ancestors', mn: 'Зэрлэг өвөг' },
        facts: [{ en: 'Red junglefowl → the chicken', mn: 'Улаан ширэнгийн тахиа → гэрийн тахиа' }],
      },
      {
        icon: '🦆',
        title: { en: 'Strange facts', mn: 'Сонин баримт' },
        facts: [
          { en: 'Thanatosis = playing dead', mn: 'Танатоз = үхсэн дүр эсгэх' },
          { en: 'Platypus — carnivore: worms, shrimp, insect larvae', mn: 'Нугасан хошуут — махан идэшт: хорхой, сам хорхой, авгалдай' },
        ],
      },
    ],
    [{ en: 'Wolves returning to Wisconsin cut deer–vehicle collisions by about 24%.', mn: 'Висконсинд чоно нэмэгдсэнээр буга машинд мөргүүлэх осол 24 орчим хувиар буурчээ.' }]
  ),
  lesson(
    'brainteaser',
    6,
    { en: 'Brainteasers: Work It Out', mn: 'Brainteaser: бодож ол' },
    { en: 'A long story with one hidden word — X — that you deduce.', mn: 'Урт түүх, нэг нууц үг — X — логикоор олно.' },
    {
      en: 'Brainteasers retell a surprising true fact (often from QI or "Today I learned") with the key word hidden. Read for the clues: who benefits, what is unusual, what the word must be in another language. You can often work it out without knowing the fact.',
      mn: 'Brainteaser бол гайхалтай бодит баримтыг (ихэвчлэн QI, «Today I learned») гол үгийг нь нууж ярьдаг асуулт. Хэнд ашигтай, юу нь хачин, өөр хэлэнд юу гэсэн үг байх ёстойг ажигла. Баримтыг мэдэхгүй ч ихэвчлэн логикоор олж болно.',
    },
    [
      {
        icon: '🛶',
        title: { en: 'Venice', mn: 'Венец' },
        facts: [{ en: 'Libreria Acqua Alta keeps books in bathtubs and a gondola, safe from floods', mn: 'Libreria Acqua Alta ном дэлгүүр усны үерээс хамгаалж номоо ванн, гондолд хадгалдаг' }],
      },
      {
        icon: '🥢',
        title: { en: 'Kattobashi', mn: 'Каттобаши' },
        facts: [{ en: 'Chopsticks made from broken baseball bats', mn: 'Хугарсан бэйсболын цохиураар хийсэн савх' }],
      },
      {
        icon: '💍',
        title: { en: 'Solomon’s ring', mn: 'Соломоны бөгж' },
        facts: [{ en: '"This too shall pass" — makes the happy sad and the sad happy', mn: '«Энэ ч бас өнгөрнө» — баяртайг гунигтай, гунигтайг баяртай болгоно' }],
      },
    ],
    [
      { en: 'In British bingo, 88 is "two fat ladies".', mn: 'Британийн бинго тоглоомд 88-ыг «хоёр тарган эмэгтэй» гэдэг.' },
      { en: 'In 2012 James Cameron re-did Titanic’s night sky after Neil deGrasse Tyson said the stars were wrong.', mn: '2012 онд Жеймс Камерон Нил деГрасс Тайсоны шүүмжийн дараа «Титаник»-ийн шөнийн тэнгэрийн оддыг засжээ.' },
    ]
  ),
  lesson(
    'culture',
    7,
    { en: 'Pop Culture, Music & Words', mn: 'Поп соёл, хөгжим, үг' },
    { en: 'K-pop, brands, prizes, sports stars and words from other languages.', mn: 'K-pop, брэнд, шагнал, спортын од, гадаад хэлний үг.' },
    {
      en: 'A grab-bag of K-pop groups, celebrity brand deals, Nobel and Miss World records, Netflix shows, sports legends and what a word means in Japanese or Tagalog.',
      mn: 'K-pop хамтлаг, алдартнуудын брэнд, Нобель, Мисс Ворлдын рекорд, Netflix шоу, спортын домогт тамирчид, япон, тагалог үгийн утга зэргийг багтаадаг холимог ангилал.',
    },
    [
      {
        icon: '🎤',
        title: { en: 'K-pop & stars', mn: 'K-pop ба одод' },
        facts: [
          { en: 'Jay Park debuted as leader of 2PM', mn: 'Жэй Пак 2PM хамтлагийн ахлагчаар гарч ирсэн' },
          { en: 'Dua Lipa is a face of YSL Beauty (Libre)', mn: 'Дуа Липа YSL Beauty (Libre)-ийн нүүр царай' },
        ],
      },
      {
        icon: '🏅',
        title: { en: 'Prizes', mn: 'Шагнал' },
        facts: [
          { en: 'Gandhi never won the Nobel Peace Prize', mn: 'Ганди Нобелийн энх тайвны шагнал хэзээ ч аваагүй' },
          { en: 'Miss World: India and Venezuela have 6 wins each', mn: 'Мисс Ворлд: Энэтхэг, Венесуэл тус бүр 6 удаа түрүүлсэн' },
        ],
      },
      {
        icon: '🗣️',
        title: { en: 'Words', mn: 'Үг' },
        facts: [
          { en: 'Tagalog "mga" marks a plural', mn: 'Тагалог хэлний «mga» олон тооны тэмдэг' },
          { en: 'Japanese "kattobase!" = "hit it far!" (baseball chant)', mn: 'Япон «kattobase!» = «хол цохи!» (бэйсболын уриа)' },
        ],
      },
    ],
    [{ en: 'Tony Hawk’s Pro Skater (1999) started a 20-plus-game series named after him.', mn: '«Tony Hawk’s Pro Skater» (1999) түүний нэрээр 20 гаруй тоглоомын цуврал эхлүүлжээ.' }]
  ),
  lesson(
    'mongolian',
    8,
    { en: 'Mongolian Language & Customs', mn: 'Монгол хэл, ёс заншил' },
    { en: 'Rare words, the twelve-animal hours and local celebrities.', mn: 'Ховор үг, арван хоёр жилийн цаг, нутгийн алдартнууд.' },
    {
      en: 'Every Mongolian quiz has a few Mongolia-only questions: an old word to pick from look-alikes, the traditional hour names (each two-hour block is an animal), Mongolian actors and directors.',
      mn: 'Монгол квиз бүрт Монголд л хамаарах цөөн асуулт байдаг: төстэй үгсээс зөв ховор үгийг сонгох, уламжлалт цагийн нэр (хоёр цаг тутам нэг амьтан), Монгол жүжигчид, найруулагчид.',
    },
    [
      {
        icon: '❄️',
        title: { en: 'Words', mn: 'Үг' },
        facts: [{ en: 'Лавс — big, fluffy snowflakes', mn: 'Лавс — том, сэвсгэр ширхэгтэй цас' }],
      },
      {
        icon: '🐓',
        title: { en: 'Animal hours', mn: 'Цагийн амьтад' },
        facts: [
          { en: 'Mouse 23–01, Ox 01–03, Tiger 03–05, Rabbit 05–07', mn: 'Хулгана 23–01, Үхэр 01–03, Бар 03–05, Туулай 05–07' },
          { en: 'Dragon 07–09, Snake 09–11, Horse 11–13, Sheep 13–15', mn: 'Луу 07–09, Могой 09–11, Морь 11–13, Хонь 13–15' },
          { en: 'Monkey 15–17, Rooster 17–19, Dog 19–21, Pig 21–23', mn: 'Бич 15–17, Тахиа 17–19, Нохой 19–21, Гахай 21–23' },
        ],
      },
    ],
    [{ en: 'The Horse hour (11–13) is why noon is called "морин цаг".', mn: 'Морин цаг (11–13) учраас үд дундыг «морин цаг» гэдэг.' }]
  ),
  lesson(
    'science',
    9,
    { en: 'Science & Medicine', mn: 'Шинжлэх ухаан, анагаах' },
    { en: 'Everyday medicines, the body and lab facts.', mn: 'Өдөр тутмын эм, хүний бие, шинжлэх ухааны баримт.' },
    {
      en: 'Science questions use things people know from the pharmacy shelf: which brand-name drug is for blood pressure and which is for something else entirely.',
      mn: 'Шинжлэх ухааны асуулт эмийн сангийн тавиур дээрх мэддэг зүйлсийг ашигладаг: ямар нэртэй эм даралтынх, аль нь огт өөр зориулалттай вэ гэх мэт.',
    },
    [
      {
        icon: '💊',
        title: { en: 'Blood pressure drugs', mn: 'Даралтын эм' },
        facts: [
          { en: 'Diroton — lisinopril (ACE inhibitor)', mn: 'Диротон — лизиноприл (ААФ саатуулагч)' },
          { en: 'Enap — enalapril (ACE inhibitor)', mn: 'Энап — эналаприл (ААФ саатуулагч)' },
          { en: 'Amlodenk — amlodipine (calcium-channel blocker)', mn: 'Амлоденк — амлодипин (кальцийн суваг хаагч)' },
        ],
      },
      {
        icon: '🫧',
        title: { en: 'Not for pressure', mn: 'Даралтынх биш' },
        facts: [{ en: 'Espumisan — simethicone, against gas and bloating', mn: 'Эспумизан — симетикон, гэдэс дүүрэхийн эсрэг' }],
      },
    ],
    [{ en: '"-pril" drugs are ACE inhibitors; "-dipine" drugs block calcium channels.', mn: '«-прил»-ээр төгссөн эм ААФ саатуулагч, «-дипин»-ээр төгссөн нь кальцийн суваг хаагч.' }]
  ),
];

const questions: SeedQuestion[] = [
  // ── cinema ──────────────────────────────────────────────────────
  q('cinema', 3,
    { en: 'Only one film has won both Berlin’s Golden Bear and the Best Picture Oscar. Which?', mn: 'Берлиний Алтан баавгай болон Оскарын шилдэг киноны шагналыг хамт авсан цорын ганц кино аль нь вэ?' },
    [['Rain Man', 'Rain Man'], ['Schindler’s List', 'Шиндлерийн жагсаалт'], ['The English Patient', 'Англи өвчтөн'], ['Forrest Gump', 'Форрест Гамп']], 0,
    { en: 'Rain Man won the Golden Bear in 1989 and Best Picture for 1988.', mn: '«Rain Man» 1989 онд Алтан баавгай, 1988 оны шилдэг киноны Оскар авсан.' }),
  q('cinema', 2,
    { en: '"If you want to be a general’s wife, first marry a lieutenant" — which film?', mn: '«Хэрэв чи генералтай хамт амьдрахыг хүсвэл эхлээд дэслэгчтэй гэрлэ» гэх үг ямар кинонд гардаг вэ?' },
    [['Moscow Does Not Believe in Tears', 'Амьдрал нулимсанд дургүй'], ['The Irony of Fate', 'Хувь заяаны егөөдөл'], ['Office Romance', 'Албан тасалгааны роман'], ['Gentlemen of Fortune', 'Азын ноёд']], 0,
    { en: 'Menshov’s 1980 film won the Oscar for Best Foreign Language Film in 1981.', mn: 'Меньшовын 1980 оны кино 1981 онд Оскарын гадаад хэлний шилдэг киноны шагнал авсан.' }),
  q('cinema', 2,
    { en: 'In Carrie (1976), what is dumped on Carrie at the prom?', mn: '«Carrie» (1976) кинонд төгсөлтийн үдэшлэг дээр Кэрри дээр юу асгадаг вэ?' },
    [['Pig’s blood', 'Гахайн цус'], ['Red paint', 'Улаан будаг'], ['Cow’s blood', 'Үхрийн цус'], ['Tomato juice', 'Улаан лоолийн шүүс']], 0,
    { en: 'A bucket of pig’s blood — the most famous scene of the film.', mn: 'Нэг хувин гахайн цус — киноны хамгийн алдартай хэсэг.' }),
  q('cinema', 2,
    { en: 'Johnny Depp’s first film was a horror film. Which one?', mn: 'Жонни Деппийн анхны кино нь аймшгийн кино байсан. Аль нь вэ?' },
    [['A Nightmare on Elm Street', 'A Nightmare on Elm Street'], ['Sleepy Hollow', 'Sleepy Hollow'], ['The Evil Dead', 'The Evil Dead'], ['Halloween', 'Halloween']], 0,
    { en: 'He played Glen in Wes Craven’s A Nightmare on Elm Street (1984).', mn: 'Тэр Уэс Крейвены «A Nightmare on Elm Street» (1984)-д Гленийн дүрд тоглосон.' }),
  q('cinema', 3,
    { en: 'Who is the killer in the original Friday the 13th (1980)?', mn: 'Анхны «Friday the 13th» (1980) кинонд алуурчин нь хэн бэ?' },
    [['Pamela Voorhees', 'Памела Ворхис'], ['Jason Voorhees', 'Жейсон Ворхис'], ['Michael Myers', 'Майкл Майерс'], ['Freddy Krueger', 'Фредди Крюгер']], 0,
    { en: 'A classic trap: Jason’s mother Pamela is the killer; Jason takes over from the sequel.', mn: 'Сонгодог заль: алуурчин нь Жейсоны ээж Памела; Жейсон дараагийн ангиас л алуурчин болдог.' }),
  q('cinema', 2,
    { en: 'In Once Upon a Time in the West, what is the harmonica-playing hero called?', mn: '«Нэгэн цагт Баруунд» кинонд аман хуур тоглодог баатрыг юу гэж нэрлэдэг вэ?' },
    [['Harmonica', 'Аман хуур (Harmonica)'], ['Cheyenne', 'Шайенн'], ['Frank', 'Фрэнк'], ['Blondie', 'Блонди']], 0,
    { en: 'Charles Bronson’s character has no other name than "Harmonica".', mn: 'Чарльз Бронсоны дүр «Harmonica»-аас өөр нэргүй.' }),
  q('cinema', 1,
    { en: 'Below what Tomatometer score is a film marked "Rotten"?', mn: 'Rotten Tomatoes дээр хэдээс доош оноотой кино «Rotten» болдог вэ?' },
    [['60%', '60%'], ['50%', '50%'], ['70%', '70%'], ['40%', '40%']], 0,
    { en: 'At 60% or above it is "Fresh"; below 60% it is "Rotten".', mn: '60% ба түүнээс дээш бол «Fresh», 60%-иас доош бол «Rotten».' }),
  q('cinema', 2,
    { en: 'What is the name of the gentle giant on death row in The Green Mile (1999)?', mn: '«Ногоон миль» (1999) кинонд цаазын ялтай номхон аварга эрийн нэр хэн бэ?' },
    [['John Coffey', 'Жон Коффи'], ['Paul Edgecomb', 'Пол Эджкомб'], ['Percy Wetmore', 'Перси Уэтмор'], ['Red Redding', 'Рэд Реддинг']], 0,
    { en: 'Michael Clarke Duncan played John Coffey — "like the drink, only not spelled the same".', mn: 'Жон Коффигийн дүрд Майкл Кларк Дункан тоглосон.' }),
  q('cinema', 2,
    { en: 'Who directed Sinners (2025)?', mn: '«Sinners» (2025) киног хэн найруулсан бэ?' },
    [['Ryan Coogler', 'Райан Куглер'], ['Jordan Peele', 'Жордан Пил'], ['Ari Aster', 'Ари Астер'], ['Robert Eggers', 'Роберт Эггерс']], 0,
    { en: 'Ryan Coogler (Black Panther) wrote and directed it, with Michael B. Jordan in two roles.', mn: 'Райан Куглер («Хар ирвэс») бичиж найруулсан, Майкл Б. Жордан хоёр дүрд тоглосон.' }),
  q('cinema', 3,
    { en: 'Why did James Cameron re-edit one shot of Titanic for the 2012 re-release?', mn: 'Жеймс Камерон 2012 онд «Титаник»-ийн нэг хэсгийг юуны тулд засварласан бэ?' },
    [['The stars in the night sky were wrong', 'Шөнийн тэнгэрийн одод буруу байсан'], ['The iceberg was the wrong size', 'Мөсөн уул буруу хэмжээтэй байсан'], ['The ship sank too fast', 'Хөлөг хэт хурдан живсэн'], ['The moon was missing', 'Сар байхгүй байсан']], 0,
    { en: 'Neil deGrasse Tyson pointed out the star field Rose sees could not have been that sky on 15 April 1912.', mn: 'Нил деГрасс Тайсон Роузын харсан оддын байрлал 1912 оны 4-р сарын 15-ны тэнгэр байж боломжгүйг шүүмжилжээ.' }),

  // ── literature ──────────────────────────────────────────────────
  q('literature', 2,
    { en: 'A writer in debt signed a harsh deal with a publisher and dictated a novel to a stenographer in under a month — later marrying her. Which novel?', mn: 'Өрөнд орсон зохиолч хэвлэлийн газартай «боолын» гэрээ хийж, нэг сар хүрэхгүй хугацаанд романаа бичээчид ярьж бичүүлээд хожим түүнтэй гэрлэсэн. Ямар роман бэ?' },
    [['The Gambler', 'Мөрийч'], ['Crime and Punishment', 'Гэмт хэрэг ба шийтгэл'], ['The Idiot', 'Мангар'], ['Anna Karenina', 'Анна Каренина']], 0,
    { en: 'Dostoevsky dictated The Gambler (1866) in 26 days to Anna Snitkina, who became his wife.', mn: 'Достоевский «Мөрийч» (1866)-ийг 26 хоногт Анна Сниткинад бичүүлж, тэр хожим эхнэр нь болсон.' }),
  q('literature', 2,
    { en: 'Which letter does the novel Gadsby (1939) never use?', mn: '«Gadsby» (1939) романд англи цагаан толгойн аль үсэг огт ороогүй вэ?' },
    [['E', 'E'], ['A', 'A'], ['T', 'T'], ['S', 'S']], 0,
    { en: 'Ernest Vincent Wright wrote 50,000 words without "e" — the most common English letter.', mn: 'Эрнест Винсент Райт англи хэлний хамгийн түгээмэл «e» үсэггүйгээр 50,000 үг бичжээ.' }),
  q('literature', 2,
    { en: 'How many years is Edmond Dantès imprisoned in The Count of Monte Cristo?', mn: '«Монте-Кристо гүн» зохиолд Эдмон Дантес хэдэн жил шоронд суусан бэ?' },
    [['14', '14'], ['7', '7'], ['10', '10'], ['20', '20']], 0,
    { en: 'He spends 14 years in the Château d’If before escaping.', mn: 'Тэр Иф цайзад 14 жил хоригдоод оргодог.' }),
  q('literature', 2,
    { en: 'In Pushkin’s Tale of the Fisherman and the Fish, what does the old woman ask for second?', mn: 'Пушкины «Загасчин ба загасны үлгэр»-т эмгэн хоёр дахь удаагаа юу гуйсан бэ?' },
    [['A new house', 'Шинэ байшин'], ['A new trough', 'Шинэ тэвш'], ['To be a tsaritsa', 'Хатан болохыг'], ['To rule the sea', 'Далайн эзэн болохыг']], 0,
    { en: 'First a trough, then a house (izba), then noblewoman, tsaritsa, and finally ruler of the sea.', mn: 'Эхлээд тэвш, дараа нь байшин, язгууртан, хатан, эцэст нь далайн эзэн болохыг гуйсан.' }),

  // ── history ─────────────────────────────────────────────────────
  q('history', 2,
    { en: 'Which became the first independent country in Latin America, in 1804?', mn: '1804 онд тусгаар тогтносон Латин Америкийн анхны тусгаар улс аль нь вэ?' },
    [['Haiti', 'Гаити'], ['Cuba', 'Куба'], ['Colombia', 'Колумб'], ['Chile', 'Чили']], 0,
    { en: 'Haiti won independence from France after the only successful large slave revolt in history.', mn: 'Гаити түүхэн дэх цорын ганц амжилттай боолын бослогын дараа Францаас тусгаар тогтносон.' }),
  q('history', 1,
    { en: 'Who led the Kuomintang and China during WWII?', mn: 'Дэлхийн II дайны үед Гоминданы тэргүүн байсан Хятадын удирдагч хэн бэ?' },
    [['Chiang Kai-shek', 'Чан Кайши'], ['Mao Zedong', 'Мао Зэдун'], ['Sun Yat-sen', 'Сунь Ятсен'], ['Zhou Enlai', 'Жоу Эньлай']], 0,
    { en: 'Chiang Kai-shek led the Republic of China; Sun Yat-sen had died in 1925.', mn: 'Чан Кайши Бүгд Найрамдах Хятадыг удирдаж байв; Сунь Ятсен 1925 онд нас барсан.' }),
  q('history', 2,
    { en: 'What was the last day of the 20th century?', mn: '20-р зууны хамгийн сүүлийн өдөр хэзээ байсан бэ?' },
    [['31 December 2000', '2000 оны 12-р сарын 31'], ['31 December 1999', '1999 оны 12-р сарын 31'], ['1 January 2000', '2000 оны 1-р сарын 1'], ['1 January 2001', '2001 оны 1-р сарын 1']], 0,
    { en: 'There was no year 0, so the century ran 1901–2000.', mn: '0 он гэж байгаагүй тул зуун 1901–2000 он хүртэл үргэлжилсэн.' }),
  q('history', 1,
    { en: 'What does RMS stand for in RMS Titanic?', mn: 'RMS Titanic-ийн RMS юуны товчлол вэ?' },
    [['Royal Mail Ship', 'Royal Mail Ship (Хааны шуудангийн хөлөг)'], ['Royal Maritime Service', 'Royal Maritime Service'], ['Registered Merchant Steamer', 'Registered Merchant Steamer'], ['Royal Marine Squadron', 'Royal Marine Squadron']], 0,
    { en: 'Titanic carried British mail under contract, so she was a Royal Mail Ship (or Steamer).', mn: 'Титаник Их Британийн шууданг гэрээгээр тээдэг байсан тул Royal Mail Ship гэж нэрлэгджээ.' }),
  q('history', 3,
    { en: 'During the 1989 protests, what did East Germans cut out of their flag?', mn: '1989 оны жагсаалын үеэр Зүүн Германчууд далбаанаасаа юуг хайчилж хаясан бэ?' },
    [['The hammer-and-compass emblem', 'Алх, циркультай сүлд'], ['The red stripe', 'Улаан судал'], ['A star', 'Од'], ['The eagle', 'Бүргэд']], 0,
    { en: 'Without the emblem the flag was simply the black-red-gold flag of a united Germany.', mn: 'Сүлдгүй бол далбаа нь нэгдсэн Германы хар-улаан-алтан далбаа болдог.' }),

  // ── world ───────────────────────────────────────────────────────
  q('world', 2,
    { en: 'Which aimag does NOT border Arkhangai?', mn: 'Архангайтай хил залгадаггүй аймаг аль нь вэ?' },
    [['Töv', 'Төв'], ['Zavkhan', 'Завхан'], ['Khövsgöl', 'Хөвсгөл'], ['Bayankhongor', 'Баянхонгор']], 0,
    { en: 'Arkhangai borders Khövsgöl, Bulgan, Övörkhangai, Bayankhongor and Zavkhan.', mn: 'Архангай Хөвсгөл, Булган, Өвөрхангай, Баянхонгор, Завхантай хиллэдэг.' }),
  q('world', 1,
    { en: 'Which city is NOT in Europe?', mn: 'Аль хот Европ тивд биш вэ?' },
    [['Pittsburgh', 'Питтсбург'], ['Edinburgh', 'Эдинбург'], ['Hamburg', 'Хамбург'], ['Salzburg', 'Зальцбург']], 0,
    { en: 'Pittsburgh is in Pennsylvania, USA.', mn: 'Питтсбург АНУ-ын Пенсильвани мужид байдаг.' }),
  q('world', 3,
    { en: 'Botswana’s motto is one word, X. Lesotho’s is "Peace, X, Prosperity". What is X?', mn: 'Ботсвана улсын уриа «X», Лесотогийнх «Энх тайван, X, хөгжил цэцэглэлт». X юу вэ?' },
    [['Rain', 'Бороо'], ['Freedom', 'Эрх чөлөө'], ['Unity', 'Эв нэгдэл'], ['Water', 'Ус']], 0,
    { en: '"Pula" means rain — precious in dry southern Africa; it is also Botswana’s currency.', mn: '«Pula» нь бороо гэсэн утгатай — хуурай Өмнөд Африкт үнэ цэнэтэй; Ботсванын мөнгөн тэмдэгт ч мөн.' }),
  q('world', 2,
    { en: 'What is the capital of Cameroon?', mn: 'Камерун улсын нийслэл аль вэ?' },
    [['Yaoundé', 'Яунде'], ['Douala', 'Дуала'], ['Abuja', 'Абужа'], ['Libreville', 'Либревиль']], 0,
    { en: 'Yaoundé is the capital; Douala is the largest city and port.', mn: 'Нийслэл нь Яунде; хамгийн том хот, боомт нь Дуала.' }),

  // ── nature ──────────────────────────────────────────────────────
  q('nature', 1,
    { en: 'Where does the Malinois dog breed come from?', mn: 'Малинуа үүлдрийн нохой аль улсаас гаралтай вэ?' },
    [['Belgium', 'Бельги'], ['France', 'Франц'], ['Spain', 'Испани'], ['Italy', 'Итали']], 0,
    { en: 'The Belgian Malinois is named after Malines (Mechelen) in Belgium.', mn: 'Бельгийн Малинуа нь Бельгийн Малин (Мехелен) хотын нэрээр нэрлэгдсэн.' }),
  q('nature', 1,
    { en: 'What colour is a Bombay cat?', mn: 'Бомбей үүлдрийн муур ямар өнгөтэй вэ?' },
    [['Black', 'Хар'], ['White', 'Цагаан'], ['Grey-blue', 'Хөх саарал'], ['Ginger', 'Шар']], 0,
    { en: 'Bred to look like a mini black panther: glossy black coat, copper eyes.', mn: 'Жижиг хар ирвэс шиг харагдуулах зорилгоор гаргасан: гялгар хар үс, зэс өнгийн нүд.' }),
  q('nature', 2,
    { en: 'Thanatosis is an animal defence. What is it?', mn: 'Танатоз бол амьтны биеэ хамгаалах арга. Юу вэ?' },
    [['Playing dead', 'Үхсэн дүр эсгэх'], ['Changing colour', 'Арьсны өнгө өөрчлөх'], ['Copying another animal’s call', 'Өөр амьтны дуу дуурайх'], ['Spraying poison', 'Хор цацах']], 0,
    { en: 'From Greek thanatos, death — opossums and some snakes are famous for it.', mn: 'Грекийн thanatos буюу үхэл гэсэн үгнээс — опоссум, зарим могой үүгээрээ алдартай.' }),
  q('nature', 2,
    { en: 'What does a platypus eat?', mn: 'Нугасан хошуут ямар идэштэн бэ?' },
    [['It is a carnivore', 'Махан идэштэн'], ['It is a herbivore', 'Өвсөн идэштэн'], ['It is an omnivore', 'Холимог идэштэн'], ['Only fish', 'Зөвхөн загас']], 0,
    { en: 'Platypuses eat worms, freshwater shrimp and insect larvae dug from riverbeds.', mn: 'Нугасан хошуут голын ёроолоос хорхой, цэнгэг усны сам хорхой, шавжны авгалдай иддэг.' }),
  q('nature', 1,
    { en: 'The red junglefowl is the wild ancestor of which bird?', mn: 'Улаан ширэнгийн тахиа ямар шувууны өвөг вэ?' },
    [['Chicken', 'Тахиа'], ['Quail', 'Бөднө'], ['Peacock', 'Тогос'], ['Goose', 'Галуу']], 0,
    { en: 'Chickens were domesticated from the red junglefowl of South and Southeast Asia.', mn: 'Гэрийн тахиаг Өмнөд, Зүүн өмнөд Азийн улаан ширэнгийн тахиагаас гаршуулсан.' }),

  // ── brainteaser ─────────────────────────────────────────────────
  q('brainteaser', 3,
    { en: 'A bookshop in a European city keeps rare books in something not meant for books, but very common in that city, to protect them from a natural disaster. What?', mn: 'Европын нэгэн хотын номын дэлгүүр байгалийн гамшгаас хамгаалах зорилгоор үнэтэй номоо ном хадгалах зориулалтгүй ч тухайн хотод өргөн хэрэглэгддэг зүйлд хадгалдаг. Юунд вэ?' },
    [['A gondola (Venice)', 'Гондол завь (Венец)'], ['A wine barrel (Bordeaux)', 'Дарсны торх (Бордо)'], ['A tram car (Lisbon)', 'Трамвай (Лиссабон)'], ['A beer crate (Munich)', 'Шар айрагны хайрцаг (Мюнхен)']], 0,
    { en: 'Libreria Acqua Alta in Venice stores books in a gondola and bathtubs so floods don’t ruin them.', mn: 'Венецийн Libreria Acqua Alta үерээс хамгаалж номоо гондол, ваннд хадгалдаг.' }),
  q('brainteaser', 3,
    { en: '"Kattobase!" is a Japanese baseball cheer. Chopsticks made from recycled X are called "kattobashi". What is X?', mn: '«Kattobase!» бол Японы бэйсболын хөгжөөн дэмжигчдийн уриа. Дахин боловсруулсан X-ээр хийсэн савхыг «kattobashi» гэдэг. X юу вэ?' },
    [['Broken baseball bats', 'Хугарсан бэйсболын цохиур'], ['Old baseballs', 'Хуучин бөмбөг'], ['Stadium seats', 'Цэнгэлдхийн суудал'], ['Bamboo fences', 'Хулсан хашаа']], 0,
    { en: 'Bats are made of the same trees as chopsticks; the sales help replant them.', mn: 'Цохиур, савх хоёр ижил модоор хийгддэг; борлуулалтын орлогоор мод тарьдаг.' }),
  q('brainteaser', 2,
    { en: 'King Solomon asked for a ring that makes a happy man sad and a sad man happy. What was engraved on it?', mn: 'Соломон хаан баяртай хүнийг гунигтай, гунигтай хүнийг баяртай болгодог бөгж хийлгэжээ. Бөгжин дээр юу гэж сийлсэн бэ?' },
    [['This too shall pass', 'Энэ ч бас өнгөрнө'], ['Know thyself', 'Өөрийгөө мэд'], ['Love conquers all', 'Хайр бүхнийг ялна'], ['Nothing lasts', 'Юу ч мөнх биш']], 0,
    { en: 'The legend’s ring reads "Gam zeh ya’avor" — this too shall pass.', mn: 'Домгийн бөгжинд «Gam zeh ya’avor» — энэ ч бас өнгөрнө гэж бичжээ.' }),
  q('brainteaser', 1,
    { en: 'In British bingo, which number is "two fat ladies"?', mn: 'Их Британийн бинго тоглоомд ямар тоог «хоёр тарган эмэгтэй» гэдэг вэ?' },
    [['88', '88'], ['22', '22'], ['66', '66'], ['11', '11']], 0,
    { en: 'Each 8 looks like a plump figure — so 88 is two of them.', mn: '8 бүр бүдүүн биетэй хүн шиг харагддаг тул 88 нь хоёр.' }),
  q('brainteaser', 3,
    { en: 'In 2021 researchers found Wisconsin’s wolves cut X by about 25%, saving lives and money. What is X?', mn: '2021 онд судлаачид Висконсины чононууд X-ийг 25 орчим хувиар бууруулж, олон хүний амь аварсан гэжээ. X юу вэ?' },
    [['Deer–vehicle collisions', 'Буга машинд мөргүүлэх осол'], ['Livestock losses', 'Малын хорогдол'], ['Forest fires', 'Ойн түймэр'], ['Lyme disease', 'Хачигт халдвар']], 0,
    { en: 'Wolves keep deer away from roads, so fewer cars hit them.', mn: 'Чоно бугыг замаас холдуулдаг тул машин мөргөх нь цөөрсөн.' }),
  q('brainteaser', 3,
    { en: 'Love Is Blind is known for its gold cups. Besides looks, what is their real job?', mn: 'Netflix-ийн «Love Is Blind» шоу алтан хундагаараа алдартай. Гоёлоос гадна жинхэнэ үүрэг нь юу вэ?' },
    [['Hide how much and what the cast drink', 'Оролцогчид юу, хэр их ууж байгааг нуух'], ['Keep drinks cold', 'Ундааг хүйтэн байлгах'], ['Hide microphones', 'Микрофон нуух'], ['Advertise a sponsor', 'Ивээн тэтгэгчийг сурталчлах']], 0,
    { en: 'Opaque cups hide drink levels, so editors can cut scenes in any order without continuity errors.', mn: 'Тунгалаг бус хундага дотор нь үлдсэн хэмжээг нууж, засварлагчид кадрыг ямар ч дарааллаар тайрах боломж олгодог.' }),
  q('brainteaser', 2,
    { en: 'A 58-year-old American at the Tokyo 2020 Olympics has had 20+ products named after him since 1999. Who?', mn: 'Токио 2020 олимпод оролцсон 58 настай Америк хүний нэрээр 1999 оноос хойш 20 гаруй бүтээгдэхүүн гарсан. Хэн бэ?' },
    [['Tony Hawk', 'Тони Хок'], ['Michael Jordan', 'Майкл Жордан'], ['Shaun White', 'Шон Уайт'], ['Tiger Woods', 'Тайгер Вудс']], 0,
    { en: 'Skateboarding debuted at Tokyo 2020; the Tony Hawk’s Pro Skater games began in 1999.', mn: 'Скейтборд Токио 2020-д анх орсон; «Tony Hawk’s Pro Skater» тоглоомууд 1999 оноос эхэлсэн.' }),

  // ── culture ─────────────────────────────────────────────────────
  q('culture', 1,
    { en: 'Jay Park was the leader of which K-pop group?', mn: 'Жэй Пак ямар хамтлагийн гишүүн байсан бэ?' },
    [['2PM', '2PM'], ['2AM', '2AM'], ['SHINee', 'SHINee'], ['CNBlue', 'CNBlue']], 0,
    { en: 'He debuted as 2PM’s leader in 2008 and left in 2009.', mn: 'Тэр 2008 онд 2PM-ийн ахлагчаар гарч, 2009 онд гарсан.' }),
  q('culture', 2,
    { en: 'Which beauty brand does Dua Lipa front?', mn: 'Дуа Липа ямар гоо сайхны брэндтэй хамтардаг вэ?' },
    [['YSL Beauty', 'YSL Beauty'], ['Maybelline', 'Maybelline'], ['Dior Beauty', 'Dior Beauty'], ['MAC', 'MAC']], 0,
    { en: 'She has been the face of YSL Beauty’s Libre fragrance since 2019.', mn: 'Тэр 2019 оноос YSL Beauty-ийн Libre үнэртний нүүр царай.' }),
  q('culture', 2,
    { en: 'Who never won the Nobel Peace Prize?', mn: 'Нобелийн энх тайвны шагнал аваагүй нь хэн бэ?' },
    [['Mahatma Gandhi', 'Махатма Ганди'], ['Mother Teresa', 'Тереза эх'], ['Nelson Mandela', 'Нельсон Мандела'], ['Martin Luther King', 'Мартин Лютер Кинг']], 0,
    { en: 'Gandhi was nominated five times but never won; the Nobel Committee later called it an omission.', mn: 'Ганди таван удаа нэр дэвшсэн ч шагнал аваагүй; хожим Нобелийн хороо үүнийг алдаа гэж хүлээсэн.' }),
  q('culture', 3,
    { en: 'Which two countries have won Miss World six times each?', mn: 'Мисс Ворлдод 6 удаа түрүүлсэн 2 улс аль вэ?' },
    [['India and Venezuela', 'Энэтхэг, Венесуэл'], ['UK and USA', 'Их Британи, АНУ'], ['Brazil and Philippines', 'Бразил, Филиппин'], ['Russia and South Africa', 'Орос, Өмнөд Африк']], 0,
    { en: 'India and Venezuela share the record with six titles each.', mn: 'Энэтхэг, Венесуэл тус бүр 6 титэмтэйгээр рекордыг хуваалцдаг.' }),
  q('culture', 2,
    { en: 'In Tagalog, what does "mga" do?', mn: 'Тагалог хэлэнд «mga» гэж юу гэсэн утгатай үг вэ?' },
    [['Makes a noun plural', 'Нэр үгийг олон тоо болгоно'], ['Means "yes"', '«Тийм» гэсэн үг'], ['Means "thank you"', '«Баярлалаа» гэсэн үг'], ['Marks the past tense', 'Өнгөрсөн цагийг заана']], 0,
    { en: '"Bata" is child, "mga bata" is children.', mn: '«Bata» — хүүхэд, «mga bata» — хүүхдүүд.' }),

  // ── mongolian ───────────────────────────────────────────────────
  q('mongolian', 2,
    { en: 'Which word means big, fluffy snowflakes falling softly?', mn: 'Малгайлан орсон цасны сэвсгэр том ширхгийг юу гэдэг вэ?' },
    [['Лавс', 'Лавс'], ['Нэвс', 'Нэвс'], ['Цавс', 'Цавс'], ['Салс', 'Салс']], 0,
    { en: '"Лавс" (also "лавсаа цас") is soft, large-flaked snow.', mn: '«Лавс» буюу «лавсаа цас» — зөөлөн, том ширхэгтэй цас.' }),
  q('mongolian', 2,
    { en: 'What time is the Rooster hour (тахиа цаг)?', mn: 'Тахиа цаг хэдэн цагаас хэдэн цаг хүртэл вэ?' },
    [['17:00–19:00', '17–19 цаг'], ['05:00–07:00', '05–07 цаг'], ['11:00–13:00', '11–13 цаг'], ['21:00–23:00', '21–23 цаг']], 0,
    { en: 'The day is split into twelve two-hour animal blocks starting with Mouse at 23:00; Rooster is the tenth.', mn: 'Хоногийг 23 цагаас Хулганаар эхлэн хоёр цаг тутам 12 амьтанд хуваадаг; Тахиа нь арав дахь.' }),

  // ── science ─────────────────────────────────────────────────────
  q('science', 2,
    { en: 'Which of these medicines is NOT for high blood pressure?', mn: 'Дараах эмийн аль нь даралт ихсэх үед хэрэглэх зориулалтгүй вэ?' },
    [['Espumisan', 'Эспумизан'], ['Diroton', 'Диротон'], ['Enap', 'Энап'], ['Amlodenk', 'Амлоденк']], 0,
    { en: 'Espumisan (simethicone) relieves gas; the other three are lisinopril, enalapril and amlodipine.', mn: 'Эспумизан (симетикон) гэдэс дүүрэхэд хэрэглэдэг; бусад гурав нь лизиноприл, эналаприл, амлодипин.' }),
];

// Shuffle choices deterministically so the right answer isn't always A.
const shuffled = questions.map((question, i) => {
  const order = [0, 1, 2, 3].sort((a, b) => ((a * 7 + i * 3) % 5) - ((b * 7 + i * 3) % 5));
  return { ...question, choices: order.map((o) => question.choices[o]), answer: order.indexOf(question.answer) };
});

export const pubquiz: SeedBundle = {
  topic: {
    slug: T,
    order: 3,
    color: '#FF6B35',
    icon: 'solar:cup-star-bold-duotone',
    title: { en: 'General Trivia', mn: 'Ерөнхий мэдлэг' },
    tagline: { en: 'Film, history, science, sport and everything in between', mn: 'Кино, түүх, шинжлэх ухаан, спорт — бүх зүйлээс' },
    description: {
      en: 'Pub-quiz-style questions from every field — cinema, literature, history, science, sport, music, food, technology, brainteasers and more.',
      mn: 'Бүх салбарын паб квиз маягийн асуултууд — кино, уран зохиол, түүх, шинжлэх ухаан, спорт, хөгжим, хоол, технологи, оньсого болон бусад.',
    },
  },
  lessons,
  questions: shuffled,
};
