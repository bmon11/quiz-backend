import type { L, SeedBundle, SeedQuestion } from '../types';

// Horoscopes & astrology — taught as a cultural tradition and folklore, not as
// science. Questions test knowledge of the tradition ("which element is Leo?")
// and never claim that predictions work; the last lesson covers what astronomy
// says. Western sign dates are the usual tropical ones (they shift by a day in
// some years). Keys are stable: never rename them.

const T = 'astrology';

/** Compact question builder: key = `astrology.<lesson>.q<i>`. */
const q = (
  lesson: string,
  i: number,
  difficulty: 1 | 2 | 3,
  prompt: L,
  choices: L[],
  answer: number,
  explanation: L,
): SeedQuestion => ({
  topicSlug: T,
  lessonKey: `${T}.${lesson}`,
  key: `${T}.${lesson}.q${i}`,
  difficulty,
  prompt,
  choices,
  answer,
  explanation,
});

// Reused labels
const FIRE: L = { en: 'Fire', mn: 'Гал' };
const EARTH: L = { en: 'Earth', mn: 'Шороо' };
const AIR: L = { en: 'Air', mn: 'Хий' };
const WATER: L = { en: 'Water', mn: 'Ус' };
const CARDINAL: L = { en: 'Cardinal', mn: 'Эхлэгч (кардинал)' };
const FIXED: L = { en: 'Fixed', mn: 'Тогтвортой' };
const MUTABLE: L = { en: 'Mutable', mn: 'Хувирамтгай' };

export const astrology: SeedBundle = {
  topic: {
    slug: T,
    order: 5,
    color: '#E040A0',
    icon: 'solar:stars-bold-duotone',
    effect: 'stars',
    title: { en: 'Horoscopes & Astrology', mn: 'Зурхай ба орд' },
    tagline: {
      en: 'Star signs, year animals and the stories behind them',
      mn: 'Орд, жилийн амьтад болон тэдгээрийн цаадах домог',
    },
    description: {
      en: 'The twelve Western signs, the Mongolian twelve-animal years and the lunar calendar — a rich cultural tradition, explained honestly, alongside what astronomy actually says.',
      mn: 'Барууны 12 орд, монгол жилийн 12 амьтан, билгийн тоолол — баялаг соёлын уламжлалыг шинжлэх ухаан юу хэлдэгтэй нь хамт шударгаар тайлбарлана.',
    },
  },

  lessons: [
    // 1 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.western-zodiac',
      order: 1,
      title: { en: 'The twelve signs of the zodiac', mn: 'Зурхайн арван хоёр орд' },
      summary: {
        en: 'Twelve signs, each tied to an element, a myth and a set of traditional traits.',
        mn: 'Арван хоёр орд тус бүр нэг махбод, нэг домог, уламжлалт шинж чанартай холбогддог.',
      },
      body: {
        en: 'Western astrology divides the Sun’s yearly path across the sky (the ecliptic) into twelve equal 30° signs, starting with Aries at the spring equinox. Each sign is named after a constellation and carries a Greek myth. Tradition gives every sign an element and a set of personality traits — these are folklore, not scientific findings.',
        mn: 'Барууны зурхай нарны тэнгэрт жил бүр туулах замыг (эклиптик) 30°-ын тэнцүү 12 ордод хуваадаг бөгөөд хаврын тэгшитгэлээс Хонь ордоор эхэлдэг. Орд бүр нэг одны ордны нэрээр нэрлэгдэж, Грекийн домогтой холбогддог. Уламжлал ёсоор орд бүр махбод, зан чанарын шинжтэй гэж үздэг — эдгээр нь шинжлэх ухааны дүгнэлт биш, ардын итгэл үнэмшил юм.',
      },
      visual: {
        kind: 'zodiac',
        groups: [
          {
            id: 'fire',
            name: FIRE,
            color: '#FF5630',
            note: {
              en: 'Traditionally bold, passionate and energetic.',
              mn: 'Уламжлал ёсоор зоримог, халуун сэтгэлтэй, эрч хүчтэй.',
            },
          },
          {
            id: 'earth',
            name: EARTH,
            color: '#22C55E',
            note: {
              en: 'Traditionally practical, patient and grounded.',
              mn: 'Уламжлал ёсоор бодитой, тэвчээртэй, тогтуун.',
            },
          },
          {
            id: 'air',
            name: AIR,
            color: '#00B8D9',
            note: {
              en: 'Traditionally curious, social and full of ideas.',
              mn: 'Уламжлал ёсоор сониуч, нийтэч, санаа бодлоор дүүрэн.',
            },
          },
          {
            id: 'water',
            name: WATER,
            color: '#5B54E8',
            note: {
              en: 'Traditionally emotional, intuitive and caring.',
              mn: 'Уламжлал ёсоор мэдрэмтгий, зөн совинтой, халамжтай.',
            },
          },
        ],
        signs: [
          {
            id: 'aries',
            name: { en: 'Aries', mn: 'Хонь' },
            symbol: '♈',
            group: 'fire',
            dates: { en: 'Mar 21 – Apr 19', mn: '3/21 – 4/19' },
            tags: [CARDINAL, { en: 'Ruler: Mars', mn: 'Эзэн: Ангараг' }, { en: 'Ram', mn: 'Хуц' }],
            description: {
              en: 'The ram with the golden fleece, which carried Phrixus to safety. Its fleece was later the prize Jason and the Argonauts sailed to find. As the first sign, it opens the astrological year at the spring equinox.',
              mn: 'Фриксийг аюулаас аварч зөөсөн алтан ноостой хуц. Түүний алтан ноосыг хожим Язон болон Аргонавтууд эрэн далайд гарсан. Эхний орд тул хаврын тэгшитгэлээс зурхайн жилийг нээдэг.',
            },
            traits: [
              { en: 'Brave', mn: 'Зоригтой' },
              { en: 'Impulsive', mn: 'Түргэн зантай' },
              { en: 'Competitive', mn: 'Өрсөлдөх дуртай' },
              { en: 'Natural leader', mn: 'Манлайлагч' },
            ],
          },
          {
            id: 'taurus',
            name: { en: 'Taurus', mn: 'Үхэр' },
            symbol: '♉',
            group: 'earth',
            dates: { en: 'Apr 20 – May 20', mn: '4/20 – 5/20' },
            tags: [FIXED, { en: 'Ruler: Venus', mn: 'Эзэн: Сугар' }, { en: 'Bull', mn: 'Бух' }],
            description: {
              en: 'Zeus turned himself into a beautiful white bull to carry the princess Europa across the sea to Crete. The constellation holds the bright red star Aldebaran, the “eye of the bull”, and the Pleiades star cluster.',
              mn: 'Зевс гүнж Европыг далай гатлуулан Крит арал руу авч явахын тулд сайхан цагаан бух болон хувилсан. Энэ одны ордонд «бухын нүд» хэмээх улаан тод Альдебаран од болон Мичид бөөгнөрөл оршдог.',
            },
            traits: [
              { en: 'Patient', mn: 'Тэвчээртэй' },
              { en: 'Reliable', mn: 'Найдвартай' },
              { en: 'Stubborn', mn: 'Зөрүүд' },
              { en: 'Loves comfort', mn: 'Тав тух эрхэмлэгч' },
            ],
          },
          {
            id: 'gemini',
            name: { en: 'Gemini', mn: 'Ихэр' },
            symbol: '♊',
            group: 'air',
            dates: { en: 'May 21 – Jun 20', mn: '5/21 – 6/20' },
            tags: [MUTABLE, { en: 'Ruler: Mercury', mn: 'Эзэн: Буд' }, { en: 'Twins', mn: 'Ихрүүд' }],
            description: {
              en: 'The twins Castor and Pollux. When mortal Castor died, immortal Pollux begged Zeus to let them share his immortality, so they spend alternate days on Olympus and in the underworld. Its two brightest stars still carry their names.',
              mn: 'Кастор, Поллукс хэмээх ихрүүд. Мөнх бус Кастор нас бархад үхэшгүй Поллукс мөнх амьдралаа хуваалцахыг Зевсээс гуйсан тул тэд ээлжлэн нэг өдөр Олимпод, нэг өдөр үхэгсдийн оронд байдаг. Тус ордны хамгийн тод хоёр од одоо ч тэдний нэрийг авч явдаг.',
            },
            traits: [
              { en: 'Curious', mn: 'Сониуч' },
              { en: 'Talkative', mn: 'Яриа хөөрөөтэй' },
              { en: 'Adaptable', mn: 'Уян хатан' },
              { en: 'Restless', mn: 'Тогтворгүй' },
            ],
          },
          {
            id: 'cancer',
            name: { en: 'Cancer', mn: 'Хавч' },
            symbol: '♋',
            group: 'water',
            dates: { en: 'Jun 21 – Jul 22', mn: '6/21 – 7/22' },
            tags: [CARDINAL, { en: 'Ruler: Moon', mn: 'Эзэн: Сар' }, { en: 'Crab', mn: 'Хавч' }],
            description: {
              en: 'A crab sent by Hera to bother Heracles while he fought the many-headed Hydra. Heracles crushed it underfoot, and Hera placed it among the stars as a reward. It is the faintest of the twelve zodiac constellations.',
              mn: 'Гераклыг олон толгойт Гидратай тулалдаж байхад нь саад болгохоор Герагийн илгээсэн хавч. Геракл түүнийг гишгэн бяцалсан ч Гера шагнал болгож одны дунд байршуулжээ. Энэ нь зурхайн 12 одны ордноос хамгийн бүдэг нь.',
            },
            traits: [
              { en: 'Caring', mn: 'Халамжтай' },
              { en: 'Home-loving', mn: 'Гэр бүлч' },
              { en: 'Sensitive', mn: 'Мэдрэмтгий' },
              { en: 'Protective', mn: 'Хамгаалагч' },
            ],
          },
          {
            id: 'leo',
            name: { en: 'Leo', mn: 'Арслан' },
            symbol: '♌',
            group: 'fire',
            dates: { en: 'Jul 23 – Aug 22', mn: '7/23 – 8/22' },
            tags: [FIXED, { en: 'Ruler: Sun', mn: 'Эзэн: Нар' }, { en: 'Lion', mn: 'Арслан' }],
            description: {
              en: 'The Nemean lion, whose golden hide no weapon could pierce. Heracles strangled it as the first of his twelve labours and wore its skin as armour. Leo is the only sign ruled by the Sun itself.',
              mn: 'Ямар ч зэвсэг нэвтэлж чаддаггүй алтан арьстай Немейн арслан. Геракл арван хоёр гавьяаныхаа эхнийх болгож түүнийг боомилж алаад арьсыг нь хуяг болгон өмссөн. Арслан бол Нар өөрөө эзэлдэг цорын ганц орд.',
            },
            traits: [
              { en: 'Confident', mn: 'Өөртөө итгэлтэй' },
              { en: 'Generous', mn: 'Өгөөмөр' },
              { en: 'Dramatic', mn: 'Анхаарал татах дуртай' },
              { en: 'Proud', mn: 'Бардам' },
            ],
          },
          {
            id: 'virgo',
            name: { en: 'Virgo', mn: 'Охин' },
            symbol: '♍',
            group: 'earth',
            dates: { en: 'Aug 23 – Sep 22', mn: '8/23 – 9/22' },
            tags: [MUTABLE, { en: 'Ruler: Mercury', mn: 'Эзэн: Буд' }, { en: 'Maiden', mn: 'Бүсгүй' }],
            description: {
              en: 'A maiden holding a sheaf of wheat — often identified with Astraea, goddess of justice, or with the harvest goddess Demeter. Its brightest star Spica means “ear of grain”. It is the largest zodiac constellation.',
              mn: 'Буудайн баглаа барьсан бүсгүй — ихэвчлэн шударга ёсны дарь эх Астрея, эсвэл ургацын дарь эх Деметер гэж үздэг. Хамгийн тод од Спика нь «тарианы түрүү» гэсэн утгатай. Энэ бол зурхайн хамгийн том одны орд.',
            },
            traits: [
              { en: 'Analytical', mn: 'Задлан шинжлэгч' },
              { en: 'Tidy', mn: 'Цэгцтэй' },
              { en: 'Helpful', mn: 'Тусч' },
              { en: 'Perfectionist', mn: 'Төгс байхыг эрмэлзэгч' },
            ],
          },
          {
            id: 'libra',
            name: { en: 'Libra', mn: 'Жинлүүр' },
            symbol: '♎',
            group: 'air',
            dates: { en: 'Sep 23 – Oct 22', mn: '9/23 – 10/22' },
            tags: [CARDINAL, { en: 'Ruler: Venus', mn: 'Эзэн: Сугар' }, { en: 'Scales', mn: 'Жин' }],
            description: {
              en: 'The scales of justice held by Astraea next door in Virgo. The Greeks first saw these stars as the claws of the Scorpion; the Romans made them a separate sign. Libra is the only sign that is an object rather than a living being.',
              mn: 'Хажуудах Охин ордны Астрейгийн барьдаг шударга ёсны жин. Грекчүүд эхэндээ эдгээр одыг Хилэнцийн хумс гэж үздэг байсан бол Ромчууд тусдаа орд болгосон. Жинлүүр бол амьтан, хүн биш эд зүйлээр дүрслэгдсэн цорын ганц орд.',
            },
            traits: [
              { en: 'Fair-minded', mn: 'Шударга' },
              { en: 'Charming', mn: 'Татам' },
              { en: 'Diplomatic', mn: 'Эвлэрүүлэгч' },
              { en: 'Indecisive', mn: 'Шийдвэр гаргахдаа эргэлздэг' },
            ],
          },
          {
            id: 'scorpio',
            name: { en: 'Scorpio', mn: 'Хилэнц' },
            symbol: '♏',
            group: 'water',
            dates: { en: 'Oct 23 – Nov 21', mn: '10/23 – 11/21' },
            tags: [
              FIXED,
              { en: 'Ruler: Mars (modern: Pluto)', mn: 'Эзэн: Ангараг (орчин үед: Плутон)' },
              { en: 'Scorpion', mn: 'Хилэнц' },
            ],
            description: {
              en: 'The scorpion sent by Gaia (or Artemis) that killed the boastful hunter Orion. The two were placed on opposite sides of the sky, so Orion sets as Scorpius rises. Its red heart-star is Antares, “rival of Mars”.',
              mn: 'Онгироо анчин Орионыг хатгаж алсан, Гэа (эсвэл Артемис)-гийн илгээсэн хилэнц. Тэднийг тэнгэрийн эсрэг талд байрлуулсан тул Хилэнц мандахад Орион жаргадаг. Түүний зүрхэн дэх улаан од нь «Ангарагийн өрсөлдөгч» хэмээх Антарес.',
            },
            traits: [
              { en: 'Intense', mn: 'Хүчтэй мэдрэмжтэй' },
              { en: 'Loyal', mn: 'Үнэнч' },
              { en: 'Secretive', mn: 'Нууцлаг' },
              { en: 'Determined', mn: 'Шийдэмгий' },
            ],
          },
          {
            id: 'sagittarius',
            name: { en: 'Sagittarius', mn: 'Нум' },
            symbol: '♐',
            group: 'fire',
            dates: { en: 'Nov 22 – Dec 21', mn: '11/22 – 12/21' },
            tags: [MUTABLE, { en: 'Ruler: Jupiter', mn: 'Эзэн: Бархасбадь' }, { en: 'Archer', mn: 'Харваач' }],
            description: {
              en: 'A centaur archer aiming his arrow at the heart of the Scorpion — often linked to the wise centaur Chiron. The centre of our Milky Way galaxy lies in this direction of the sky. Its brightest stars form the shape of a “teapot”.',
              mn: 'Хилэнцийн зүрх рүү сумаа чиглүүлсэн кентавр харваач — ихэвчлэн мэргэн кентавр Хиронтой холбодог. Манай Сүүн замын төв тэнгэрийн яг энэ зүгт оршдог. Тод одод нь «цайны данх» хэлбэр үүсгэдэг.',
            },
            traits: [
              { en: 'Adventurous', mn: 'Адал явдалд дуртай' },
              { en: 'Optimistic', mn: 'Өөдрөг' },
              { en: 'Honest', mn: 'Шулуун шударга' },
              { en: 'Freedom-loving', mn: 'Эрх чөлөөнд дуртай' },
            ],
          },
          {
            id: 'capricorn',
            name: { en: 'Capricorn', mn: 'Матар' },
            symbol: '♑',
            group: 'earth',
            dates: { en: 'Dec 22 – Jan 19', mn: '12/22 – 1/19' },
            tags: [CARDINAL, { en: 'Ruler: Saturn', mn: 'Эзэн: Санчир' }, { en: 'Sea-goat', mn: 'Далайн ямаа' }],
            description: {
              en: 'A sea-goat: a goat with a fish’s tail. One myth says the god Pan leapt into the Nile to escape the monster Typhon and only half changed into a fish. The figure is far older than the Greeks — it goes back to Babylonian art.',
              mn: 'Далайн ямаа — загасны сүүлтэй ямаа. Нэгэн домогт Пан бурхан мангас Тифоноос зугтаж Нил мөрөнд үсрэхдээ зөвхөн хагас нь загас болон хувирсан гэдэг. Энэ дүрс Грекчүүдээс хамаагүй эртний бөгөөд Вавилоны урлагаас улбаатай.',
            },
            traits: [
              { en: 'Ambitious', mn: 'Тэмүүлэлтэй' },
              { en: 'Disciplined', mn: 'Сахилга баттай' },
              { en: 'Practical', mn: 'Бодитой' },
              { en: 'Reserved', mn: 'Даруу' },
            ],
          },
          {
            id: 'aquarius',
            name: { en: 'Aquarius', mn: 'Хумх' },
            symbol: '♒',
            group: 'air',
            dates: { en: 'Jan 20 – Feb 18', mn: '1/20 – 2/18' },
            tags: [
              FIXED,
              { en: 'Ruler: Saturn (modern: Uranus)', mn: 'Эзэн: Санчир (орчин үед: Тэнгэрийн ван)' },
              { en: 'Water-bearer', mn: 'Ус зөөгч' },
            ],
            description: {
              en: 'The water-bearer pouring from a jar — usually Ganymede, the handsome youth Zeus carried to Olympus to be cupbearer of the gods. Despite the water imagery, Aquarius is an air sign, not a water sign.',
              mn: 'Хумхнаас ус асгаж буй ус зөөгч — ихэвчлэн Зевсийн Олимп руу авч гарч бурхдын аяга барьдаг болгосон царайлаг залуу Ганимед гэж үздэг. Устай дүрслэгддэг ч Хумх бол усны биш, хийн орд.',
            },
            traits: [
              { en: 'Independent', mn: 'Бие даасан' },
              { en: 'Inventive', mn: 'Шинийг санаачлагч' },
              { en: 'Humanitarian', mn: 'Хүмүүнлэг' },
              { en: 'Unconventional', mn: 'Хэвшмэл бус' },
            ],
          },
          {
            id: 'pisces',
            name: { en: 'Pisces', mn: 'Загас' },
            symbol: '♓',
            group: 'water',
            dates: { en: 'Feb 19 – Mar 20', mn: '2/19 – 3/20' },
            tags: [
              MUTABLE,
              { en: 'Ruler: Jupiter (modern: Neptune)', mn: 'Эзэн: Бархасбадь (орчин үед: Далай ван)' },
              { en: 'Two fish', mn: 'Хоёр загас' },
            ],
            description: {
              en: 'Two fish tied together by a cord — Aphrodite and her son Eros, who turned into fish and bound themselves together so they would not lose each other while fleeing Typhon. Pisces is the last sign of the cycle.',
              mn: 'Утсаар холбоотой хоёр загас — Тифоноос зугтахдаа загас болон хувирч, бие биеэ алдахгүйн тулд хоорондоо уяцалдсан Афродита болон түүний хүү Эрос. Загас бол зурхайн мөчлөгийн сүүлчийн орд.',
            },
            traits: [
              { en: 'Imaginative', mn: 'Уран сэтгэмжтэй' },
              { en: 'Compassionate', mn: 'Энэрэнгүй' },
              { en: 'Dreamy', mn: 'Мөрөөдөмтгий' },
              { en: 'Artistic', mn: 'Урлагт дуртай' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'The word “zodiac” comes from the Greek zōidiakos kyklos — “circle of little animals”.',
          mn: '«Зодиак» гэдэг үг грекийн zōidiakos kyklos буюу «жижиг амьтдын тойрог» гэсэн үгнээс гаралтай.',
        },
        {
          en: 'Libra is the only one of the twelve signs that is an object, not a person or animal.',
          mn: 'Арван хоёр ордноос Жинлүүр л хүн, амьтан биш эд зүйлээр дүрслэгддэг.',
        },
        {
          en: 'Aquarius is the “water-bearer”, yet tradition makes it an air sign.',
          mn: 'Хумх бол «ус зөөгч» боловч уламжлал ёсоор хийн орд.',
        },
        {
          en: 'The Tropic of Cancer and Tropic of Capricorn are named after the signs the Sun entered at the June and December solstices about 2,000 years ago.',
          mn: 'Хавчийн болон Матарын халуун бүсийн шугам (тропик) нь 2000 орчим жилийн өмнө 6, 12-р сарын нар буцах үед нарны орж байсан ордын нэрээр нэрлэгдсэн.',
        },
      ],
    },

    // 2 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.elements-modalities',
      order: 2,
      title: { en: 'Elements and modalities', mn: 'Махбод ба хэв шинж' },
      summary: {
        en: 'Four elements × three modalities = twelve signs, each a unique pair.',
        mn: 'Дөрвөн махбод × гурван хэв шинж = арван хоёр орд, орд бүр давтагдашгүй хослол.',
      },
      body: {
        en: 'Astrologers sort the signs two ways. The four classical elements — fire, earth, air and water, from ancient Greek philosophy — each get three signs. The three modalities — cardinal (starting), fixed (holding) and mutable (changing) — each get four. Every sign is one unique combination, e.g. Leo = fixed fire.',
        mn: 'Зурхайчид ордуудыг хоёр янзаар ангилдаг. Эртний Грекийн гүн ухаанаас гаралтай дөрвөн сонгодог махбод — гал, шороо, хий, ус — тус бүр гурван ордтой. Гурван хэв шинж — эхлэгч, тогтвортой, хувирамтгай — тус бүр дөрвөн ордтой. Орд бүр давтагдашгүй нэг хослол: жишээ нь Арслан = тогтвортой гал.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: FIRE,
            subtitle: { en: 'Aries · Leo · Sagittarius', mn: 'Хонь · Арслан · Нум' },
            icon: '🔥',
            color: '#FF5630',
            facts: [
              { en: 'Traditional temperament: bold, warm, enthusiastic.', mn: 'Уламжлалт зан: зоримог, дулаан, урам зоригтой.' },
              { en: 'Linked by the Greeks to the “hot and dry” quality.', mn: 'Грекчүүд «халуун, хуурай» шинжтэй холбодог.' },
            ],
          },
          {
            title: EARTH,
            subtitle: { en: 'Taurus · Virgo · Capricorn', mn: 'Үхэр · Охин · Матар' },
            icon: '🌱',
            color: '#22C55E',
            facts: [
              { en: 'Traditional temperament: practical, steady, hard-working.', mn: 'Уламжлалт зан: бодитой, тогтвортой, хөдөлмөрч.' },
              { en: 'Linked to the “cold and dry” quality.', mn: '«Хүйтэн, хуурай» шинжтэй холбогддог.' },
            ],
          },
          {
            title: AIR,
            subtitle: { en: 'Gemini · Libra · Aquarius', mn: 'Ихэр · Жинлүүр · Хумх' },
            icon: '💨',
            color: '#00B8D9',
            facts: [
              { en: 'Traditional temperament: thoughtful, social, talkative.', mn: 'Уламжлалт зан: сэтгэгч, нийтэч, яриа хөөрөөтэй.' },
              { en: 'Linked to the “hot and wet” quality.', mn: '«Халуун, чийглэг» шинжтэй холбогддог.' },
            ],
          },
          {
            title: WATER,
            subtitle: { en: 'Cancer · Scorpio · Pisces', mn: 'Хавч · Хилэнц · Загас' },
            icon: '💧',
            color: '#5B54E8',
            facts: [
              { en: 'Traditional temperament: emotional, intuitive, sensitive.', mn: 'Уламжлалт зан: мэдрэмжтэй, зөн совинтой, эмзэг.' },
              { en: 'Linked to the “cold and wet” quality.', mn: '«Хүйтэн, чийглэг» шинжтэй холбогддог.' },
            ],
          },
          {
            title: CARDINAL,
            subtitle: { en: 'Aries · Cancer · Libra · Capricorn', mn: 'Хонь · Хавч · Жинлүүр · Матар' },
            icon: '🚀',
            color: '#E040A0',
            facts: [
              { en: 'These signs begin as each season begins — at the equinoxes and solstices.', mn: 'Эдгээр орд улирал бүрийн эхэнд — тэгшитгэл, нар буцах үед эхэлдэг.' },
              { en: 'Traditionally the “starters”: take initiative.', mn: 'Уламжлал ёсоор «эхлүүлэгчид»: санаачлагатай.' },
            ],
          },
          {
            title: FIXED,
            subtitle: { en: 'Taurus · Leo · Scorpio · Aquarius', mn: 'Үхэр · Арслан · Хилэнц · Хумх' },
            icon: '⚓',
            color: '#7A4DD8',
            facts: [
              { en: 'They fall in the middle of each season, when it is most settled.', mn: 'Улирал бүрийн дунд, хамгийн тогтсон үед таардаг.' },
              { en: 'Traditionally steady, loyal and stubborn.', mn: 'Уламжлал ёсоор тогтвортой, үнэнч, зөрүүд.' },
            ],
          },
          {
            title: MUTABLE,
            subtitle: { en: 'Gemini · Virgo · Sagittarius · Pisces', mn: 'Ихэр · Охин · Нум · Загас' },
            icon: '🔄',
            color: '#FFAB00',
            facts: [
              { en: 'They end each season, as it changes into the next.', mn: 'Улирал бүрийг төгсгөж, дараагийнх руу шилжүүлдэг.' },
              { en: 'Traditionally flexible and adaptable.', mn: 'Уламжлал ёсоор уян хатан, дасан зохицогч.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'The four elements come from the Greek philosopher Empedocles, around 450 BCE.',
          mn: 'Дөрвөн махбодын санааг МЭӨ 450 орчим онд Грекийн гүн ухаантан Эмпедокл дэвшүүлсэн.',
        },
        {
          en: 'Going round the zodiac, the elements repeat in order: fire, earth, air, water.',
          mn: 'Зурхайн тойргоор явахад махбод гал, шороо, хий, ус гэсэн дарааллаар давтагддаг.',
        },
        {
          en: 'The four fixed signs — bull, lion, eagle (an old symbol for Scorpio) and man (Aquarius) — echo the four creatures of the biblical Book of Ezekiel.',
          mn: 'Дөрвөн тогтвортой орд — бух, арслан, бүргэд (Хилэнцийн эртний бэлгэдэл), хүн (Хумх) — Библийн Иезекиелийн номын дөрвөн амьтантай таардаг.',
        },
      ],
    },

    // 3 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.planets-houses',
      order: 3,
      title: { en: 'Planets, houses and the big three', mn: 'Гараг, гэр ба «гол гурав»' },
      summary: {
        en: 'In a birth chart, planets are “what”, signs are “how” and houses are “where”.',
        mn: 'Төрөлтийн зурхайд гараг нь «юу», орд нь «яаж», гэр нь «хаана» гэдгийг заадаг.',
      },
      body: {
        en: 'A horoscope (birth chart) is a map of the sky at the moment and place of birth. Each planet stands for one part of life, the sign it sits in colours it, and the twelve houses — slices of the sky measured from the eastern horizon — say which area of life it touches. Astrologers call the Sun, Moon and Rising sign the “big three”.',
        mn: 'Зурхай (төрөлтийн зураг) гэдэг нь төрсөн мөч, газар дахь тэнгэрийн зураглал юм. Гараг бүр амьдралын нэг талыг илэрхийлж, байгаа орд нь түүнийг «будаж», зүүн тэнгэрийн хаяанаас хэмжсэн арван хоёр гэр нь амьдралын аль хүрээнд нөлөөлөхийг заадаг гэж үздэг. Нар, Сар, Мандах ордыг зурхайчид «гол гурав» гэдэг.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Sun', mn: 'Нар' },
            subtitle: { en: 'Identity · rules Leo', mn: 'Өөрийн мөн чанар · Арслан' },
            icon: '☉',
            color: '#FFAB00',
            facts: [
              { en: 'Your “star sign” is simply the sign the Sun was in when you were born.', mn: 'Таны «орд» гэдэг нь төрөх үед Нар байсан орд юм.' },
              { en: 'Stands for the core self and will.', mn: 'Хүний цөм, хүсэл зоригийг илэрхийлнэ.' },
            ],
          },
          {
            title: { en: 'Moon', mn: 'Сар' },
            subtitle: { en: 'Emotions · rules Cancer', mn: 'Сэтгэл хөдлөл · Хавч' },
            icon: '☽',
            color: '#919EAB',
            facts: [
              { en: 'Moves through a sign in about 2½ days — the fastest body in the chart.', mn: 'Нэг ордыг 2.5 орчим хоногт туулдаг — зурхайн хамгийн хурдан бие.' },
              { en: 'Stands for feelings, habits and the inner life.', mn: 'Мэдрэмж, зуршил, дотоод ертөнцийг илэрхийлнэ.' },
            ],
          },
          {
            title: { en: 'Rising sign (Ascendant)', mn: 'Мандах орд (Асцендент)' },
            subtitle: { en: 'Outward manner', mn: 'Гаднах төрх' },
            icon: '🌅',
            color: '#FF5630',
            facts: [
              { en: 'The sign rising on the eastern horizon at the moment of birth.', mn: 'Төрөх мөчид зүүн тэнгэрийн хаяанаас мандаж байсан орд.' },
              { en: 'Changes about every two hours, so it needs an exact birth time.', mn: 'Хоёр цаг орчим тутамд солигддог тул төрсөн яг цаг шаардлагатай.' },
              { en: 'It marks the start of the 1st house.', mn: 'Энэ нь 1-р гэрийн эхлэлийг тэмдэглэдэг.' },
            ],
          },
          {
            title: { en: 'Mercury & Venus', mn: 'Буд ба Сугар' },
            subtitle: { en: 'Mind · love', mn: 'Оюун · хайр' },
            icon: '☿',
            color: '#00B8D9',
            facts: [
              { en: 'Mercury, the messenger god: communication and thinking (rules Gemini and Virgo).', mn: 'Элч бурхан Буд: харилцаа, сэтгэлгээ (Ихэр, Охин ордын эзэн).' },
              { en: 'Venus, goddess of love: love, beauty and pleasure (rules Taurus and Libra).', mn: 'Хайрын дарь эх Сугар: хайр, гоо сайхан, таашаал (Үхэр, Жинлүүрийн эзэн).' },
            ],
          },
          {
            title: { en: 'Mars, Jupiter & Saturn', mn: 'Ангараг, Бархасбадь, Санчир' },
            subtitle: { en: 'Drive · growth · discipline', mn: 'Эрч хүч · өсөлт · сахилга' },
            icon: '♂',
            color: '#B71D18',
            facts: [
              { en: 'Mars, god of war: energy, drive and conflict.', mn: 'Дайны бурхан Ангараг: эрч хүч, тэмүүлэл, зөрчил.' },
              { en: 'Jupiter, king of the gods: luck, growth and optimism — the “greater benefic”.', mn: 'Бурхдын хаан Бархасбадь: аз, өсөлт, өөдрөг үзэл — «их ач тустай» гараг.' },
              { en: 'Saturn: limits, discipline and time — the old “greater malefic”.', mn: 'Санчир: хязгаар, сахилга, цаг хугацаа — эртний «их хортой» гараг.' },
            ],
          },
          {
            title: { en: 'Uranus, Neptune & Pluto', mn: 'Тэнгэрийн ван, Далай ван, Плутон' },
            subtitle: { en: 'The modern additions', mn: 'Орчин үед нэмэгдсэн' },
            icon: '♆',
            color: '#5B54E8',
            facts: [
              { en: 'Discovered in 1781, 1846 and 1930 — unknown to ancient astrology.', mn: '1781, 1846, 1930 онд нээгдсэн тул эртний зурхай мэддэггүй байв.' },
              { en: 'Astrologers gave them change, dreams and transformation.', mn: 'Зурхайчид тэдэнд өөрчлөлт, мөрөөдөл, хувирлын утга өгсөн.' },
            ],
          },
          {
            title: { en: 'The twelve houses', mn: 'Арван хоёр гэр' },
            subtitle: { en: 'Areas of life', mn: 'Амьдралын хүрээ' },
            icon: '🏠',
            color: '#00A76F',
            facts: [
              { en: '1st: self · 2nd: money · 3rd: siblings & talk · 4th: home & family.', mn: '1: өөрөө · 2: мөнгө хөрөнгө · 3: ах дүү, харилцаа · 4: гэр орон, гэр бүл.' },
              { en: '5th: romance & creativity · 6th: work & health · 7th: partnership & marriage · 8th: shared wealth, death & rebirth.', mn: '5: хайр сэтгэл, бүтээлч байдал · 6: ажил, эрүүл мэнд · 7: хамтрагч, гэрлэлт · 8: хамтын хөрөнгө, үхэл ба дахин төрөлт.' },
              { en: '9th: travel & philosophy · 10th: career & reputation · 11th: friends & hopes · 12th: the hidden and the subconscious.', mn: '9: аялал, гүн ухаан · 10: ажил мэргэжил, нэр хүнд · 11: найз нөхөд, итгэл найдвар · 12: нууц, далд ухамсар.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'Mongolian weekday names come from Tibetan names of the seven “planets”: Ням = Sun, Даваа = Moon, Мягмар = Mars, Лхагва = Mercury, Пүрэв = Jupiter, Баасан = Venus, Бямба = Saturn.',
          mn: 'Монгол гарагийн нэрс долоон «гараг»-ийн төвд нэрнээс гаралтай: Ням = Нар, Даваа = Сар, Мягмар = Ангараг, Лхагва = Буд, Пүрэв = Бархасбадь, Баасан = Сугар, Бямба = Санчир.',
        },
        {
          en: 'English does the same: Sunday, Monday and Saturday are named after the Sun, Moon and Saturn.',
          mn: 'Англи хэлэнд ч мөн адил: Sunday, Monday, Saturday нь Нар, Сар, Санчирын нэрээр нэрлэгдсэн.',
        },
        {
          en: 'Ancient astrologers counted seven “planets” (from Greek planētēs, “wanderers”) — including the Sun and Moon.',
          mn: 'Эртний зурхайчид Нар, Сарыг оруулаад долоон «гараг» тоолдог байв (грекээр planētēs — «тэнүүлчид»).',
        },
        {
          en: '“Mercury retrograde” is an optical illusion: Earth overtakes Mercury, so it seems to move backwards for about three weeks, three or four times a year.',
          mn: '«Буд ухрах» нь харагдах хуурмаг үзэгдэл: Дэлхий Будыг гүйцэж түрүүлэхэд тэр жилд 3–4 удаа, гурав орчим долоо хоног ухарч буй мэт харагддаг.',
        },
      ],
    },

    // 4 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.history',
      order: 4,
      title: { en: 'A short history of astrology', mn: 'Зурхайн товч түүх' },
      summary: {
        en: 'From Babylonian omens to newspaper horoscopes in about 3,500 years.',
        mn: 'Вавилоны тэнгэрийн шинжээс сонины орд хүртэл 3500 орчим жил.',
      },
      body: {
        en: 'Astrology began in Mesopotamia as omens for kings, grew into personal horoscopes in Hellenistic Egypt and was written down as a system by Ptolemy. For centuries astrology and astronomy were one subject. They split in the 17th century, but astrology lived on — and in 1930 a British newspaper invented the daily sun-sign column.',
        mn: 'Зурхай Месопотамид хаадад зориулсан тэнгэрийн шинж тэмдгээс эхэлж, Эллинист Египетэд хувь хүний зурхай болон хөгжсөн бөгөөд Птолемей түүнийг тогтолцоо болгон бичсэн. Олон зууны турш зурхай ба одон орон нэг ухаан байв. 17-р зуунд тэд салсан ч зурхай оршсоор — 1930 онд Британийн нэгэн сонин өдөр тутмын ордын буланг бий болгосон.',
      },
      visual: {
        kind: 'timeline',
        items: [
          {
            when: { en: '~1600–1000 BCE', mn: 'МЭӨ 1600–1000 орчим' },
            title: { en: 'Babylonian sky omens', mn: 'Вавилоны тэнгэрийн шинж' },
            body: {
              en: 'Priests recorded thousands of omens in the Enūma Anu Enlil series — eclipses or planets read as signs for the king and kingdom, not for ordinary people.',
              mn: 'Тахилч нар «Энума Ану Энлил» цувралд мянга мянган шинж тэмдэг тэмдэглэсэн — хиртэлт, гарагийг ард түмэнд биш, хаан болон улсад зориулсан дохио гэж уншдаг байв.',
            },
          },
          {
            when: { en: '~5th century BCE', mn: 'МЭӨ 5-р зуун орчим' },
            title: { en: 'Twelve equal signs', mn: 'Арван хоёр тэнцүү орд' },
            body: {
              en: 'Babylonian astronomers divided the Sun’s path into 12 equal signs of 30°. The oldest known personal horoscope, on a clay tablet, dates from about 410 BCE.',
              mn: 'Вавилоны одон орончид нарны замыг 30°-ын 12 тэнцүү ордод хуваасан. Шавар хавтан дээрх хамгийн эртний хувийн зурхай МЭӨ 410 орчим онд хамаарна.',
            },
          },
          {
            when: { en: '~2nd–1st century BCE', mn: 'МЭӨ 2–1-р зуун' },
            title: { en: 'Horoscopic astrology in Egypt', mn: 'Египет дэх хувийн зурхай' },
            body: {
              en: 'In Hellenistic Alexandria, Babylonian signs met Egyptian time-keeping and Greek philosophy. The rising sign and the twelve houses were born here.',
              mn: 'Эллинист Александрид Вавилоны орд, Египетийн цаг тооллын арга, Грекийн гүн ухаан нийлсэн. Мандах орд болон арван хоёр гэр энд үүссэн.',
            },
          },
          {
            when: { en: '2nd century CE', mn: 'МЭ 2-р зуун' },
            title: { en: 'Ptolemy’s Tetrabiblos', mn: 'Птолемейн «Тетрабиблос»' },
            body: {
              en: 'Claudius Ptolemy of Alexandria wrote the Tetrabiblos (“Four Books”), the standard astrology textbook for some 1,500 years — alongside his astronomy work, the Almagest.',
              mn: 'Александрийн Клавдий Птолемей «Тетрабиблос» («Дөрвөн ном»)-ыг бичсэн нь 1500 орчим жилийн турш зурхайн үндсэн сурах бичиг байв. Тэр мөн одон орны «Альмагест» бүтээлийг туурвисан.',
            },
          },
          {
            when: { en: '8th–13th century', mn: '8–13-р зуун' },
            title: { en: 'Islamic golden age', mn: 'Исламын алтан үе' },
            body: {
              en: 'Scholars in Baghdad translated and expanded Greek texts. Abu Ma‘shar (Albumasar, 9th century) became the most famous astrologer in medieval Europe once his books were translated into Latin.',
              mn: 'Багдадын эрдэмтэд Грекийн бичвэрүүдийг орчуулж, хөгжүүлсэн. Абу Машар (Альбумасар, 9-р зуун)-ын номууд латин хэлээр орчуулагдсаны дараа тэр дундад зууны Европын хамгийн алдартай зурхайч болсон.',
            },
          },
          {
            when: { en: '15th–17th century', mn: '15–17-р зуун' },
            title: { en: 'Renaissance court astrologers', mn: 'Сэргэн мандалтын ордны зурхайчид' },
            body: {
              en: 'Kings and popes kept astrologers. Even great astronomers cast horoscopes: Johannes Kepler drew one for the general Wallenstein in 1608 and earned money from yearly almanac predictions.',
              mn: 'Хаад, пап лам нар зурхайч тэжээдэг байв. Агуу одон орончид ч зурхай зурдаг: Иоганн Кеплер 1608 онд жанжин Валленштейнд зурхай зурж, жил бүрийн хуанлийн таамгаар мөнгө олдог байв.',
            },
          },
          {
            when: { en: '17th century', mn: '17-р зуун' },
            title: { en: 'Astronomy and astrology split', mn: 'Одон орон ба зурхай салсан' },
            body: {
              en: 'With Copernicus, Galileo, Kepler and Newton, astronomy became a physical science. Astrology lost its place in universities and became a popular tradition.',
              mn: 'Коперник, Галилей, Кеплер, Ньютоны ачаар одон орон физикийн шинжлэх ухаан болсон. Зурхай их сургуулиудаас гарч, ард түмний уламжлал болон үлдсэн.',
            },
          },
          {
            when: { en: '1930', mn: '1930 он' },
            title: { en: 'The first newspaper horoscope', mn: 'Сонины анхны орд' },
            body: {
              en: 'The Sunday Express printed R. H. Naylor’s reading of the newborn Princess Margaret’s birth chart. It was so popular that Naylor got a regular column — and simplified it to the twelve sun signs we read today.',
              mn: '«Sunday Express» сонин шинэ төрсөн Маргарет гүнжийн зурхайн тухай Р. Х. Нейлорын тайлбарыг нийтэлсэн. Маш их таалагдсан тул Нейлор байнгын булантай болж, өнөөдрийн уншдаг 12 ордын хэлбэрт хялбарчилсан.',
            },
          },
        ],
      },
      funFacts: [
        {
          en: 'For most of history the words “astrologer” and “astronomer” meant almost the same thing.',
          mn: 'Түүхийн ихэнх хугацаанд «зурхайч», «одон орон судлаач» гэсэн үгс бараг ижил утгатай байв.',
        },
        {
          en: 'The Greek astronomer Hipparchus discovered the precession of the equinoxes around 130 BCE — the slow shift that later put signs and constellations out of line.',
          mn: 'Грекийн одон орон судлаач Гиппарх МЭӨ 130 орчим онд хаврын цэгийн шилжилтийг (прецесс) нээсэн — энэ удаан шилжилт хожим орд, одны ордыг зөрүүлсэн.',
        },
        {
          en: 'Newspaper horoscopes only date from 1930 — younger than the radio.',
          mn: 'Сонины орд ердөө 1930 оноос эхэлсэн — радиогоос ч залуу.',
        },
      ],
    },

    // 5 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.mongol-years',
      order: 5,
      title: { en: 'The twelve year animals', mn: 'Жилийн арван хоёр амьтан' },
      summary: {
        en: 'In the Mongolian, Tibetan and Chinese tradition each year belongs to one of twelve animals.',
        mn: 'Монгол, төвд, хятадын уламжлалд жил бүр арван хоёр амьтны аль нэгэнд хамаардаг.',
      },
      body: {
        en: 'The twelve animals repeat every 12 years: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Sheep, Monkey, Rooster, Dog, Pig. 2024 was the Dragon, 2025 the Snake, 2026 is the Horse. The year changes at Tsagaan Sar, not on 1 January, so people born in January or early February often belong to the previous animal. Tradition groups the animals into four “trines” of friendly signs.',
        mn: 'Арван хоёр амьтан 12 жил тутам давтагддаг: Хулгана, Үхэр, Бар, Туулай, Луу, Могой, Морь, Хонь, Бич, Тахиа, Нохой, Гахай. 2024 он Луу, 2025 он Могой, 2026 он Морин жил. Жил 1-р сарын 1-нд биш, Цагаан сараар солигддог тул 1-р сар, 2-р сарын эхээр төрсөн хүн ихэвчлэн өмнөх жилийн амьтанд хамаардаг. Уламжлал ёсоор амьтдыг найрсаг дөрвөн гурвалд хуваадаг.',
      },
      visual: {
        kind: 'zodiac',
        groups: [
          {
            id: 'rat-dragon-monkey',
            name: { en: 'Rat · Dragon · Monkey', mn: 'Хулгана · Луу · Бич' },
            color: '#00B8D9',
            note: {
              en: 'Traditionally the doers: quick, ambitious and full of energy.',
              mn: 'Уламжлал ёсоор хийж бүтээгчид: шаламгай, тэмүүлэлтэй, эрч хүчтэй.',
            },
          },
          {
            id: 'ox-snake-rooster',
            name: { en: 'Ox · Snake · Rooster', mn: 'Үхэр · Могой · Тахиа' },
            color: '#FFAB00',
            note: {
              en: 'Traditionally the thinkers: careful, hard-working and deliberate.',
              mn: 'Уламжлал ёсоор бодлоготой: болгоомжтой, хөдөлмөрч, нягт нямбай.',
            },
          },
          {
            id: 'tiger-horse-dog',
            name: { en: 'Tiger · Horse · Dog', mn: 'Бар · Морь · Нохой' },
            color: '#FF5630',
            note: {
              en: 'Traditionally the free spirits: independent, honest and idealistic.',
              mn: 'Уламжлал ёсоор эрх чөлөөт сэтгэлтэн: бие даасан, шударга, үзэл санаатай.',
            },
          },
          {
            id: 'rabbit-sheep-pig',
            name: { en: 'Rabbit · Sheep · Pig', mn: 'Туулай · Хонь · Гахай' },
            color: '#22C55E',
            note: {
              en: 'Traditionally the peacemakers: gentle, kind and artistic.',
              mn: 'Уламжлал ёсоор эв эеийг эрхэмлэгчид: зөөлөн, нинжин, урлагт дуртай.',
            },
          },
        ],
        signs: [
          {
            id: 'rat',
            name: { en: 'Rat', mn: 'Хулгана' },
            symbol: '🐭',
            group: 'rat-dragon-monkey',
            dates: { en: '1996, 2008, 2020, 2032', mn: '1996, 2008, 2020, 2032' },
            tags: [{ en: '1st animal', mn: '1-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'In the legend of the great race, the clever rat rode on the ox’s back and jumped off just before the finish to come first. That is why the cycle starts with the smallest animal.',
              mn: 'Их уралдааны домогт ухаалаг хулгана үхрийн нуруун дээр суугаад барианд хүрэхийн өмнөхөн үсрэн бууж түрүүлсэн гэдэг. Тиймээс мөчлөг хамгийн жижиг амьтнаас эхэлдэг.',
            },
            traits: [
              { en: 'Clever', mn: 'Овсгоотой' },
              { en: 'Resourceful', mn: 'Арга самбаатай' },
              { en: 'Thrifty', mn: 'Хэмнэлттэй' },
            ],
          },
          {
            id: 'ox',
            name: { en: 'Ox', mn: 'Үхэр' },
            symbol: '🐮',
            group: 'ox-snake-rooster',
            dates: { en: '1997, 2009, 2021, 2033', mn: '1997, 2009, 2021, 2033' },
            tags: [{ en: '2nd animal', mn: '2-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The hard-working ox set off first and would have won the race, but was tricked by the rat riding on its back. It came a patient second.',
              mn: 'Хөдөлмөрч үхэр хамгийн түрүүнд гарсан бөгөөд уралдаанд ялах байсан ч нуруун дээрээ суусан хулганад мэхлэгдэж, тэвчээртэйгээр хоёрдугаар байрт орсон.',
            },
            traits: [
              { en: 'Patient', mn: 'Тэвчээртэй' },
              { en: 'Strong', mn: 'Тэсвэртэй' },
              { en: 'Dependable', mn: 'Найдвартай' },
            ],
          },
          {
            id: 'tiger',
            name: { en: 'Tiger', mn: 'Бар' },
            symbol: '🐯',
            group: 'tiger-horse-dog',
            dates: { en: '1998, 2010, 2022, 2034', mn: '1998, 2010, 2022, 2034' },
            tags: [{ en: '3rd animal', mn: '3-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'The powerful tiger swam hard against the river’s current and came third. In Asian folklore it is the king of beasts and a guardian against evil.',
              mn: 'Хүчирхэг бар голын урсгалыг сөрөн хүчтэй сэлж гуравдугаар байрт орсон. Азийн ардын аман зохиолд бар бол араатны хаан, муу муухайгаас хамгаалагч.',
            },
            traits: [
              { en: 'Brave', mn: 'Зоригтой' },
              { en: 'Passionate', mn: 'Халуун сэтгэлтэй' },
              { en: 'Rebellious', mn: 'Тэрслүү' },
            ],
          },
          {
            id: 'rabbit',
            name: { en: 'Rabbit', mn: 'Туулай' },
            symbol: '🐰',
            group: 'rabbit-sheep-pig',
            dates: { en: '1999, 2011, 2023, 2035', mn: '1999, 2011, 2023, 2035' },
            tags: [{ en: '4th animal', mn: '4-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The rabbit hopped across the river on stepping stones and a floating log to finish fourth. Many Asian tales tell of a rabbit living on the Moon.',
              mn: 'Туулай голыг чулуу, хөвж буй гуалин дээгүүр үсчин гатлаад дөрөвдүгээр байрт орсон. Азийн олон домогт саран дээр туулай амьдардаг гэж ярьдаг.',
            },
            traits: [
              { en: 'Gentle', mn: 'Зөөлөн' },
              { en: 'Elegant', mn: 'Ганган' },
              { en: 'Cautious', mn: 'Болгоомжтой' },
            ],
          },
          {
            id: 'dragon',
            name: { en: 'Dragon', mn: 'Луу' },
            symbol: '🐲',
            group: 'rat-dragon-monkey',
            dates: { en: '2000, 2012, 2024, 2036', mn: '2000, 2012, 2024, 2036' },
            tags: [{ en: '5th animal', mn: '5-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'The only mythical animal of the twelve. The dragon could have flown in first, but stopped to make rain for thirsty people and fields. Mongolian folk belief links the dragon with thunder — the thunder sound is “луу дуугарах”.',
              mn: 'Арван хоёроос цорын ганц домгийн амьтан. Луу нисээд түрүүлж болох байсан ч цангасан хүмүүс, тариан талбайд бороо оруулахаар зогссон гэдэг. Монгол ардын итгэл үнэмшилд аянга цахилгааныг «луу дуугарах» гэдэг.',
            },
            traits: [
              { en: 'Ambitious', mn: 'Тэмүүлэлтэй' },
              { en: 'Charismatic', mn: 'Сэтгэл татам' },
              { en: 'Lucky', mn: 'Азтай' },
            ],
          },
          {
            id: 'snake',
            name: { en: 'Snake', mn: 'Могой' },
            symbol: '🐍',
            group: 'ox-snake-rooster',
            dates: { en: '2001, 2013, 2025, 2037', mn: '2001, 2013, 2025, 2037' },
            tags: [{ en: '6th animal', mn: '6-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The snake hid coiled around the horse’s hoof and slid out at the finish line, frightening the horse and stealing sixth place.',
              mn: 'Могой морины туурайнд ороолдон нуугдаж байгаад барианы шугам дээр гулсан гарч, морийг цочоон зургадугаар байрыг булааж авсан.',
            },
            traits: [
              { en: 'Wise', mn: 'Мэргэн' },
              { en: 'Mysterious', mn: 'Нууцлаг' },
              { en: 'Intuitive', mn: 'Зөн совинтой' },
            ],
          },
          {
            id: 'horse',
            name: { en: 'Horse', mn: 'Морь' },
            symbol: '🐴',
            group: 'tiger-horse-dog',
            dates: { en: '2002, 2014, 2026, 2038', mn: '2002, 2014, 2026, 2038' },
            tags: [{ en: '7th animal', mn: '7-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'Startled by the snake at the finish, the horse came seventh. For Mongols the horse is the most honoured animal of all, and 2026 is the Fire Horse — Улаан морин жил.',
              mn: 'Барианы шугамд могойд цочсон морь долдугаар байрт орсон. Монголчуудын хувьд морь бол хамгийн эрхэмлэдэг амьтан бөгөөд 2026 он бол Улаан морин жил.',
            },
            traits: [
              { en: 'Energetic', mn: 'Эрч хүчтэй' },
              { en: 'Free-spirited', mn: 'Эрх чөлөөт' },
              { en: 'Cheerful', mn: 'Хөгжилтэй' },
            ],
          },
          {
            id: 'sheep',
            name: { en: 'Sheep', mn: 'Хонь' },
            symbol: '🐑',
            group: 'rabbit-sheep-pig',
            dates: { en: '2003, 2015, 2027, 2039', mn: '2003, 2015, 2027, 2039' },
            tags: [{ en: '8th animal', mn: '8-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The sheep, monkey and rooster worked together to build a raft and cross the river. The sheep came eighth. In Chinese the same word can mean sheep or goat.',
              mn: 'Хонь, бич, тахиа гурав хамтран сал хийж голыг гатласан. Хонь наймдугаар байрт орсон. Хятад хэлэнд нэг үг нь хонь ч, ямаа ч гэсэн утгатай байж болдог.',
            },
            traits: [
              { en: 'Kind', mn: 'Нинжин' },
              { en: 'Calm', mn: 'Тайван' },
              { en: 'Creative', mn: 'Бүтээлч' },
            ],
          },
          {
            id: 'monkey',
            name: { en: 'Monkey', mn: 'Бич' },
            symbol: '🐵',
            group: 'rat-dragon-monkey',
            dates: { en: '2004, 2016, 2028, 2040', mn: '2004, 2016, 2028, 2040' },
            tags: [{ en: '9th animal', mn: '9-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'The monkey helped clear weeds from the raft and came ninth. The monkey is famous in Asia as the clever trickster Sun Wukong from “Journey to the West”.',
              mn: 'Бич салын хог ургамлыг цэвэрлэхэд тусалж есдүгээр байрт орсон. Азид бич «Баруун зүгт аялсан тэмдэглэл»-ийн ухаалаг заль мэхтэн Сун Вүкүнээр алдартай.',
            },
            traits: [
              { en: 'Witty', mn: 'Сэргэлэн' },
              { en: 'Playful', mn: 'Шоглоомч' },
              { en: 'Inventive', mn: 'Овсгоотой' },
            ],
          },
          {
            id: 'rooster',
            name: { en: 'Rooster', mn: 'Тахиа' },
            symbol: '🐔',
            group: 'ox-snake-rooster',
            dates: { en: '2005, 2017, 2029, 2041', mn: '2005, 2017, 2029, 2041' },
            tags: [{ en: '10th animal', mn: '10-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The rooster found the raft that carried it, the sheep and the monkey across, and came tenth. It is the only bird among the twelve animals.',
              mn: 'Тахиа өөрийгөө, хонь, бичийг гатлуулсан салыг олсон бөгөөд аравдугаар байрт орсон. Энэ бол арван хоёр амьтны дундах цорын ганц шувуу.',
            },
            traits: [
              { en: 'Punctual', mn: 'Цагтаа нарийн' },
              { en: 'Confident', mn: 'Итгэлтэй' },
              { en: 'Hard-working', mn: 'Хичээнгүй' },
            ],
          },
          {
            id: 'dog',
            name: { en: 'Dog', mn: 'Нохой' },
            symbol: '🐶',
            group: 'tiger-horse-dog',
            dates: { en: '2006, 2018, 2030, 2042', mn: '2006, 2018, 2030, 2042' },
            tags: [{ en: '11th animal', mn: '11-р амьтан' }, { en: 'Yang (male)', mn: 'Эр' }],
            description: {
              en: 'The dog was a strong swimmer, but it stopped to play and bathe in the river, so it arrived only eleventh.',
              mn: 'Нохой сайн сэлдэг байсан ч голд тоглож, усанд орохоор саатсан тул ердөө арван нэгдүгээрт ирсэн.',
            },
            traits: [
              { en: 'Loyal', mn: 'Үнэнч' },
              { en: 'Honest', mn: 'Шударга' },
              { en: 'Protective', mn: 'Хамгаалагч' },
            ],
          },
          {
            id: 'pig',
            name: { en: 'Pig', mn: 'Гахай' },
            symbol: '🐷',
            group: 'rabbit-sheep-pig',
            dates: { en: '2007, 2019, 2031, 2043', mn: '2007, 2019, 2031, 2043' },
            tags: [{ en: '12th animal', mn: '12-р амьтан' }, { en: 'Yin (female)', mn: 'Эм' }],
            description: {
              en: 'The pig stopped for a meal and a nap on the way and came last. Tradition still sees the pig as a sign of plenty and good fortune.',
              mn: 'Гахай замдаа хооллож, унтаж амарсан тул хамгийн сүүлд ирсэн. Гэсэн ч уламжлал ёсоор гахайг элбэг дэлбэг, аз хийморийн бэлгэдэл гэж үздэг.',
            },
            traits: [
              { en: 'Generous', mn: 'Өгөөмөр' },
              { en: 'Easy-going', mn: 'Энгийн зантай' },
              { en: 'Sincere', mn: 'Чин сэтгэлтэй' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'Animals in the same trine sit exactly four places apart in the cycle (Rat 1, Dragon 5, Monkey 9).',
          mn: 'Нэг гурвалын амьтад мөчлөгт яг дөрвөн байрын зайтай байрладаг (Хулгана 1, Луу 5, Бич 9).',
        },
        {
          en: 'A popular tale says the cat missed the race because the rat “forgot” to wake it — and cats have chased rats ever since.',
          mn: 'Хулгана муурыг сэрээхээ «мартсан» тул муур уралдаанд хоцорсон, түүнээс хойш муур хулганыг хөөдөг болсон гэсэн алдартай үлгэр бий.',
        },
        {
          en: 'Vietnam’s cycle has a Cat instead of the Rabbit and a Water Buffalo instead of the Ox.',
          mn: 'Вьетнамын мөчлөгт Туулайн оронд Муур, Үхрийн оронд Усны үхэр байдаг.',
        },
        {
          en: 'Animals also rule the hours: the traditional day is split into twelve two-hour periods, each named after an animal.',
          mn: 'Амьтад цагийг ч захирдаг: уламжлалт хоногийг хоёр цагийн арван хоёр хэсэгт хувааж, тус бүрийг нэг амьтнаар нэрлэдэг.',
        },
      ],
    },

    // 6 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.mongol-calendar',
      order: 6,
      title: { en: 'The Mongolian lunar calendar', mn: 'Монгол билгийн тоолол' },
      summary: {
        en: 'Twelve animals × five elements make a 60-year cycle, the жаран.',
        mn: 'Арван хоёр амьтан × таван махбод = жаран жилийн мөчлөг.',
      },
      body: {
        en: 'The Mongolian lunar calendar (билгийн тоолол) came largely from the Tibetan Buddhist tradition. Each year joins an animal with one of five elements — wood, fire, earth, metal, water — spoken as colours: Хөх, Улаан, Шар, Цагаан, Хар. Each element lasts two years, a male one then a female one (e.g. Улаан, then Улаагчин), so the full cycle takes 60 years. 2026 is Улаан морин жил, the male Fire Horse.',
        mn: 'Монгол билгийн тоолол голдуу Төвдийн буддын уламжлалаас гаралтай. Жил бүр амьтан ба таван махбодын — мод, гал, шороо, төмөр, ус — нэгтэй хослох бөгөөд махбодыг өнгөөр нэрлэдэг: Хөх, Улаан, Шар, Цагаан, Хар. Махбод бүр хоёр жил үргэлжилдэг — эхлээд эр, дараа нь эм (жишээ нь Улаан, дараа нь Улаагчин), тиймээс бүтэн мөчлөг 60 жил болно. 2026 он бол Улаан морин жил.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Five elements as colours', mn: 'Таван махбод — таван өнгө' },
            subtitle: { en: 'Мод · Гал · Шороо · Төмөр · Ус', mn: 'Мод · Гал · Шороо · Төмөр · Ус' },
            icon: '🎨',
            color: '#00A76F',
            facts: [
              { en: 'Wood = Хөх (blue), Fire = Улаан (red), Earth = Шар (yellow), Metal = Цагаан (white), Water = Хар (black).', mn: 'Мод = Хөх, Гал = Улаан, Шороо = Шар, Төмөр = Цагаан, Ус = Хар.' },
              { en: 'Female years add -гчин: Хөхөгчин, Улаагчин, Шарагчин, Цагаагчин, Харагчин.', mn: 'Эм жилд -гчин нөхцөл нэмнэ: Хөхөгчин, Улаагчин, Шарагчин, Цагаагчин, Харагчин.' },
              { en: 'Shortcut: the last digit of the year — 0–1 metal, 2–3 water, 4–5 wood, 6–7 fire, 8–9 earth.', mn: 'Товч арга: оны сүүлийн цифр — 0–1 төмөр, 2–3 ус, 4–5 мод, 6–7 гал, 8–9 шороо.' },
            ],
          },
          {
            title: { en: 'The 60-year жаран', mn: 'Жаран' },
            subtitle: { en: '12 animals × 5 elements', mn: '12 амьтан × 5 махбод' },
            icon: '🔁',
            color: '#5B54E8',
            facts: [
              { en: 'The same animal-and-colour year returns only every 60 years — the last Улаан морин жил before 2026 was 1966.', mn: 'Ижил амьтан, өнгөтэй жил 60 жилд л нэг давтагдана — 2026 оноос өмнөх Улаан морин жил 1966 он байв.' },
              { en: 'Following Tibet, each жаран traditionally starts with a Fire Rabbit year, not with the Rat as in China. The current one began in 1987.', mn: 'Төвдийн уламжлалаар жаран бүр Хятадынх шиг Хулганаас биш, Гал туулай жилээс эхэлдэг. Одоогийн жаран 1987 онд эхэлсэн.' },
              { en: 'Reaching your 60th birthday means completing a full жаран — a much-celebrated event.', mn: '60 нас хүрэх нь нэг жаранг бүтэн туулсан гэсэн үг тул онцгойлон тэмдэглэдэг.' },
            ],
          },
          {
            title: { en: 'Tsagaan Sar', mn: 'Цагаан сар' },
            subtitle: { en: 'Lunar New Year', mn: 'Билгийн тооллын шинэ жил' },
            icon: '🥟',
            color: '#919EAB',
            facts: [
              { en: 'The first day of the first spring month; the evening before is Битүүн.', mn: 'Хаврын тэргүүн сарын шинийн нэгэн; өмнөх орой нь Битүүн.' },
              { en: 'Mongolia calculates it with its own Buddhist calendar system, so it usually matches Chinese New Year but in some years falls a day or even a month apart.', mn: 'Монгол өөрийн буддын зурхайн тооллоор тооцдог тул ихэвчлэн хятадын шинэ жилтэй давхцах боловч зарим жил нэг өдөр, бүр нэг сараар зөрдөг.' },
              { en: 'It often falls on the same day as Tibetan Losar.', mn: 'Ихэвчлэн төвдийн Лосартай нэг өдөр таардаг.' },
            ],
          },
          {
            title: { en: 'The зурхайч', mn: 'Зурхайч' },
            subtitle: { en: 'Calendar-maker and astrologer', mn: 'Тоолол гаргагч' },
            icon: '📜',
            color: '#FFAB00',
            facts: [
              { en: 'Traditionally a monk trained in зурхай at a monastery’s astrology school (Зурхайн дацан).', mn: 'Уламжлал ёсоор хийдийн Зурхайн дацанд суралцсан лам.' },
              { en: 'Calculates the yearly almanac (хуанли) and is consulted for weddings, journeys and naming children.', mn: 'Жил бүрийн хуанлийг тооцоолж, хурим, аян зам, хүүхдэд нэр өгөх зэрэгт зөвлөгөө өгдөг.' },
              { en: 'Mongolian зурхай mixes Indian astronomy (through Tibet’s Kālacakra texts) with Chinese elements.', mn: 'Монгол зурхай Энэтхэгийн одон орны (Төвдийн Цогт Цагийн хүрдээр дамжсан) болон хятадын махбодын ухааныг хослуулсан.' },
            ],
          },
          {
            title: { en: 'Auspicious days', mn: 'Бэлгэдэлтэй өдөр' },
            subtitle: { en: 'Folk customs of the lunar day', mn: 'Билгийн өдрийн ёс заншил' },
            icon: '✂️',
            color: '#E040A0',
            facts: [
              { en: 'Almanacs traditionally mark each lunar day as good or bad for things like a haircut (үс засах өдөр), travel or starting work.', mn: 'Хуанлид билгийн өдөр бүрийг үс засах, аян замд гарах, ажил эхлэх зэрэгт сайн эсвэл муу гэж уламжлал ёсоор тэмдэглэдэг.' },
              { en: 'Each day also has a ruling animal and element, and a lucky direction to set out in (морь гаргах зүг).', mn: 'Өдөр бүр өөрийн амьтан, махбод, морь гаргах зүгтэй байдаг.' },
              { en: 'The 8th, 15th and 30th lunar days are traditionally Buddhist holy days.', mn: 'Билгийн тооллын 8, 15, 30-ны өдрүүд уламжлал ёсоор буддын шашны дээд өдрүүд.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'Because each element lasts two years, 2026 (Улаан морь) and 2027 (Улаагчин хонь) are both fire years.',
          mn: 'Махбод бүр хоёр жил үргэлжилдэг тул 2026 (Улаан морь), 2027 (Улаагчин хонь) хоёулаа галын жил.',
        },
        {
          en: 'Lunar months are about 29½ days long, so a lunar year is ~11 days shorter than a solar one — an extra (leap) month is added every few years to keep up.',
          mn: 'Билгийн сар 29.5 орчим хоног тул билгийн жил нарны жилээс 11 орчим хоногоор богино — үүнийг нөхөхийн тулд хэдэн жил тутамд илүү сар нэмдэг.',
        },
        {
          en: 'Tsagaan Sar (“White Moon”) is named for white foods — milk and dairy — that symbolise purity and a fresh start.',
          mn: 'Цагаан сарыг ариун цэвэр, шинэ эхлэлийн бэлгэдэл болсон цагаан идээний нэрээр нэрлэсэн гэдэг.',
        },
      ],
    },

    // 7 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.chinese-vs-western',
      order: 7,
      title: { en: 'East and West compared', mn: 'Дорно ба өрнийн зурхай' },
      summary: {
        en: 'Western signs follow the month you were born; Eastern animals follow the year.',
        mn: 'Барууны орд төрсөн сараар, дорнын амьтан төрсөн оноор тодорхойлогддог.',
      },
      body: {
        en: 'Western and East Asian astrology grew up separately and work very differently. A third great system, Indian Vedic astrology (Jyotiṣa), looks like the Western one but measures signs against the actual stars (sidereal), so most people’s Vedic sign is one sign earlier than their Western one.',
        mn: 'Барууны болон Зүүн Азийн зурхай тус тусдаа хөгжсөн бөгөөд тэс өөр зарчмаар ажилладаг. Гурав дахь том тогтолцоо болох Энэтхэгийн ведийн зурхай (Жётиш) барууныхтай төстэй боловч ордыг жинхэнэ одтой харьцуулж (сидерал) тооцдог тул ихэнх хүний ведийн орд барууныхаас нэг ордоор өмнө байдаг.',
      },
      visual: {
        kind: 'pairs',
        left: { en: 'Western', mn: 'Өрнө' },
        right: { en: 'East Asian / Mongolian', mn: 'Дорно / Монгол' },
        items: [
          {
            left: { en: 'Sign set by birth month (the Sun)', mn: 'Орд төрсөн сараар (Нар)' },
            right: { en: 'Animal set by birth year', mn: 'Амьтан төрсөн оноор' },
            icon: '📅',
          },
          {
            left: { en: '12 signs, ~30 days each', mn: '12 орд, тус бүр ~30 хоног' },
            right: { en: '12 animals, 1 year each', mn: '12 амьтан, тус бүр 1 жил' },
            icon: '🔢',
          },
          {
            left: { en: '4 elements: fire, earth, air, water', mn: '4 махбод: гал, шороо, хий, ус' },
            right: { en: '5 elements: wood, fire, earth, metal, water', mn: '5 махбод: мод, гал, шороо, төмөр, ус' },
            icon: '⚗️',
          },
          {
            left: { en: 'Element fixed to each sign', mn: 'Махбод орд бүрт тогтмол' },
            right: { en: 'Element changes every 2 years', mn: 'Махбод 2 жил тутам солигдоно' },
            icon: '🔄',
          },
          {
            left: { en: 'Solar calendar; year starts at the spring equinox', mn: 'Нарны тоолол; жил хаврын тэгшитгэлээс эхэлнэ' },
            right: { en: 'Lunar calendar; year starts at Lunar New Year / Tsagaan Sar', mn: 'Билгийн тоолол; жил Цагаан сараар эхэлнэ' },
            icon: '🌙',
          },
          {
            left: { en: 'Greek myths (Heracles, Zeus…)', mn: 'Грекийн домог (Геракл, Зевс…)' },
            right: { en: 'The legend of the great race', mn: 'Их уралдааны домог' },
            icon: '📖',
          },
          {
            left: { en: 'Male/female signs alternate', mn: 'Эр/эм орд ээлжилнэ' },
            right: { en: 'Yin/yang (эр/эм) years alternate', mn: 'Эр/эм жил ээлжилнэ' },
            icon: '☯️',
            note: { en: 'A rare point of similarity', mn: 'Ховор тохиолдох ижил төстэй тал' },
          },
          {
            left: { en: 'Vedic: same 12 signs, but sidereal', mn: 'Ведийн: ижил 12 орд, гэхдээ сидерал' },
            right: { en: 'Vedic: 27 lunar mansions (nakshatras)', mn: 'Ведийн: 27 сарны од (накшатра)' },
            icon: '🪔',
            note: {
              en: 'Vedic astrology also uses the Moon’s nodes, Rahu and Ketu',
              mn: 'Ведийн зурхай мөн сарны зангилаа Раху, Кетуг ашигладаг',
            },
          },
        ],
      },
      funFacts: [
        {
          en: 'Mongolian зурхай took much of its planetary astronomy from India by way of Tibet, so it shares ideas such as Rahu with Vedic astrology.',
          mn: 'Монгол зурхай гарагийн тооллынхоо ихэнхийг Энэтхэгээс Төвдөөр дамжуулан авсан тул Рахү зэрэг ойлголтыг ведийн зурхайтай хуваалцдаг.',
        },
        {
          en: 'In India, matching horoscopes before marriage (kundli milan) is still common.',
          mn: 'Энэтхэгт гэрлэхээс өмнө зурхай тохируулах (кундли милан) заншил одоо ч түгээмэл.',
        },
        {
          en: 'Rahu is the mythical demon who swallows the Sun or Moon to cause an eclipse — Mongolians know him as Рахү.',
          mn: 'Нар, сарыг залгиж хиртэлт үүсгэдэг домгийн мангасыг Энэтхэгт Раху, монголчууд Рахү гэдэг.',
        },
      ],
    },

    // 8 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'astrology.science',
      order: 8,
      title: { en: 'What astronomy says', mn: 'Одон орон юу хэлдэг вэ' },
      summary: {
        en: 'The Sun really crosses 13 unequal constellations, and tests find no astrological effect.',
        mn: 'Нар үнэндээ тэнцүү бус 13 одны ордыг гатлах бөгөөд туршилтууд зурхайн нөлөө илрүүлээгүй.',
      },
      body: {
        en: 'Astrology’s signs are 12 equal 30° slices, but the real constellations are uneven: the Sun spends about 45 days in Virgo and only about 7 in Scorpius, and it also crosses Ophiuchus. Earth’s wobble (precession) has also shifted the signs about 24° from the stars since astrology was set down. Careful tests have found no link between birth charts and personality or fate — astrology is a cultural tradition, not a science.',
        mn: 'Зурхайн орд бол 30°-ын тэнцүү 12 хэсэг, гэвч жинхэнэ одны ордууд тэгш бус: Нар Охин ордонд 45 орчим, Хилэнцэд ердөө 7 орчим хоног байдаг бөгөөд Могойчин ордыг ч гатладаг. Мөн Дэлхийн тэнхлэгийн савлалт (прецесс)-аас болж зурхай тогтсоноос хойш орд одноос 24° орчим зөрсөн. Нарийн туршилтууд төрөлтийн зурхай ба зан чанар, хувь заяаны хооронд холбоо олоогүй — зурхай бол шинжлэх ухаан биш, соёлын уламжлал.',
      },
      visual: {
        kind: 'bar',
        horizontal: true,
        unit: { en: 'days the Sun spends (approx.)', mn: 'Нар байх хоног (ойролцоогоор)' },
        items: [
          { label: { en: 'Virgo', mn: 'Охин' }, value: 45, note: { en: 'The largest', mn: 'Хамгийн том' } },
          { label: { en: 'Pisces', mn: 'Загас' }, value: 38 },
          { label: { en: 'Taurus', mn: 'Үхэр' }, value: 37 },
          { label: { en: 'Leo', mn: 'Арслан' }, value: 37 },
          { label: { en: 'Sagittarius', mn: 'Нум' }, value: 33 },
          { label: { en: 'Gemini', mn: 'Ихэр' }, value: 30 },
          { label: { en: 'Capricornus', mn: 'Матар' }, value: 28 },
          { label: { en: 'Aries', mn: 'Хонь' }, value: 25 },
          { label: { en: 'Aquarius', mn: 'Хумх' }, value: 24 },
          { label: { en: 'Libra', mn: 'Жинлүүр' }, value: 23 },
          { label: { en: 'Cancer', mn: 'Хавч' }, value: 20 },
          {
            label: { en: 'Ophiuchus', mn: 'Могойчин' },
            value: 18,
            note: { en: 'The “13th sign”, Nov 29 – Dec 17', mn: '«13 дахь орд», 11/29 – 12/17' },
          },
          { label: { en: 'Scorpius', mn: 'Хилэнц' }, value: 7, note: { en: 'The shortest', mn: 'Хамгийн богино' } },
        ],
      },
      funFacts: [
        {
          en: 'Precession: Earth’s axis wobbles like a spinning top, once every ~25,800 years, moving the spring equinox about 1° every 72 years.',
          mn: 'Прецесс: Дэлхийн тэнхлэг эргэлдэх оройл шиг ~25,800 жилд нэг удаа савладаг тул хаврын цэг 72 жил тутамд 1° орчим шилждэг.',
        },
        {
          en: 'The spring equinox is now in the constellation Pisces, slowly moving toward Aquarius — the origin of the phrase “Age of Aquarius”.',
          mn: 'Хаврын цэг одоо Загас одны ордонд байгаа бөгөөд аажмаар Хумх руу шилжиж байна — «Хумхын эрин» гэдэг хэллэг үүнээс гаралтай.',
        },
        {
          en: 'In 1985 physicist Shawn Carlson published a double-blind test in Nature: astrologers matched birth charts to personality profiles no better than chance.',
          mn: '1985 онд физикч Шон Карлсон «Nature» сэтгүүлд давхар сохор туршилт нийтэлсэн: зурхайчид төрөлтийн зургийг зан чанарын тодорхойлолттой санамсаргүй таавраас илүү тааруулж чадаагүй.',
        },
        {
          en: 'In 1948 psychologist Bertram Forer gave students the same vague “personal” profile; they rated it about 4.3 out of 5 for accuracy — the Barnum or Forer effect.',
          mn: '1948 онд сэтгэл судлаач Бертрам Форер оюутнуудад бүгдэд нь ижил бүрхэг «хувийн» тодорхойлолт өгөхөд тэд үнэн зөвийг 5-аас 4.3 орчим гэж үнэлсэн — үүнийг Барнум буюу Форерын эффект гэдэг.',
        },
      ],
    },
  ],

  questions: [
    // ── western-zodiac ──────────────────────────────────────────────
    q(
      'western-zodiac',
      1,
      1,
      { en: 'In Western astrology, which element is Leo?', mn: 'Барууны зурхайд Арслан орд аль махбодод хамаардаг вэ?' },
      [WATER, EARTH, FIRE, AIR],
      2,
      {
        en: 'Leo is a fire sign, together with Aries and Sagittarius.',
        mn: 'Арслан бол Хонь, Нум ордын хамт галын орд.',
      },
    ),
    q(
      'western-zodiac',
      2,
      1,
      { en: 'Which sign is the first of the zodiac, starting at the spring equinox?', mn: 'Хаврын тэгшитгэлээс эхэлдэг зурхайн эхний орд аль нь вэ?' },
      [
        { en: 'Aries', mn: 'Хонь' },
        { en: 'Capricorn', mn: 'Матар' },
        { en: 'Pisces', mn: 'Загас' },
        { en: 'Leo', mn: 'Арслан' },
      ],
      0,
      {
        en: 'Aries opens the zodiac on about 21 March, the spring equinox; Pisces is the last sign.',
        mn: 'Хонь орд 3-р сарын 21 орчим буюу хаврын тэгшитгэлээс зурхайг нээдэг; Загас бол сүүлчийн орд.',
      },
    ),
    q(
      'western-zodiac',
      3,
      2,
      { en: 'Which Greek monster does the constellation Cancer represent?', mn: 'Хавч одны орд Грекийн ямар амьтныг дүрсэлдэг вэ?' },
      [
        { en: 'The crab that ate Orion', mn: 'Орионыг идсэн хавч' },
        { en: 'A sea-crab that guarded Poseidon’s palace', mn: 'Посейдоны ордныг хамгаалсан далайн хавч' },
        { en: 'The crab Zeus turned into to hide from Hera', mn: 'Герагаас нуугдах гэж Зевсийн хувилсан хавч' },
        { en: 'The crab Hera sent to bother Heracles as he fought the Hydra', mn: 'Гераклыг Гидратай тулалдахад Герагийн илгээсэн хавч' },
      ],
      3,
      {
        en: 'Hera sent the crab to nip Heracles during his fight with the Hydra; he crushed it and Hera put it in the sky.',
        mn: 'Гера Гераклыг Гидратай тулалдаж байхад нь хазуулахаар хавч илгээсэн; Геракл түүнийг бяцалсан бөгөөд Гера одны дунд байршуулсан.',
      },
    ),
    q(
      'western-zodiac',
      4,
      2,
      { en: 'Aquarius is the “water-bearer”. Which element does tradition give it?', mn: 'Хумх бол «ус зөөгч». Уламжлал ёсоор аль махбодод хамаардаг вэ?' },
      [WATER, AIR, EARTH, FIRE],
      1,
      {
        en: 'Despite its name, Aquarius is an air sign, alongside Gemini and Libra.',
        mn: 'Нэрийг нь үл харгалзан Хумх бол Ихэр, Жинлүүрийн хамт хийн орд.',
      },
    ),
    q(
      'western-zodiac',
      5,
      2,
      { en: 'Which pair of twins does Gemini represent?', mn: 'Ихэр орд аль ихрүүдийг дүрсэлдэг вэ?' },
      [
        { en: 'Romulus and Remus', mn: 'Ромул, Рем' },
        { en: 'Apollo and Artemis', mn: 'Аполлон, Артемис' },
        { en: 'Castor and Pollux', mn: 'Кастор, Поллукс' },
        { en: 'Hypnos and Thanatos', mn: 'Гипнос, Танатос' },
      ],
      2,
      {
        en: 'Gemini is Castor and Pollux (the Dioscuri); the constellation’s two brightest stars bear their names.',
        mn: 'Ихэр бол Кастор, Поллукс (Диоскурууд); ордны хамгийн тод хоёр од тэдний нэрийг авч явдаг.',
      },
    ),
    q(
      'western-zodiac',
      6,
      3,
      { en: 'Which is the only zodiac sign shown as an object rather than a person or animal?', mn: 'Хүн, амьтан биш эд зүйлээр дүрслэгддэг цорын ганц орд аль нь вэ?' },
      [
        { en: 'Aquarius', mn: 'Хумх' },
        { en: 'Sagittarius', mn: 'Нум' },
        { en: 'Virgo', mn: 'Охин' },
        { en: 'Libra', mn: 'Жинлүүр' },
      ],
      3,
      {
        en: 'Libra, the scales of justice. The Greeks once saw these stars as the Scorpion’s claws.',
        mn: 'Жинлүүр буюу шударга ёсны жин. Грекчүүд эдгээр одыг нэгэн цагт Хилэнцийн хумс гэж үздэг байв.',
      },
    ),

    // ── elements-modalities ─────────────────────────────────────────
    q(
      'elements-modalities',
      1,
      1,
      { en: 'How many signs belong to each element?', mn: 'Махбод бүрт хэдэн орд хамаардаг вэ?' },
      [
        { en: 'Two', mn: 'Хоёр' },
        { en: 'Three', mn: 'Гурав' },
        { en: 'Four', mn: 'Дөрөв' },
        { en: 'Six', mn: 'Зургаа' },
      ],
      1,
      {
        en: 'Twelve signs ÷ four elements = three signs each (e.g. fire: Aries, Leo, Sagittarius).',
        mn: 'Арван хоёр орд ÷ дөрвөн махбод = тус бүр гурван орд (жишээ нь гал: Хонь, Арслан, Нум).',
      },
    ),
    q(
      'elements-modalities',
      2,
      1,
      { en: 'Which of these is an earth sign?', mn: 'Эдгээрээс аль нь шорооны орд вэ?' },
      [
        { en: 'Gemini', mn: 'Ихэр' },
        { en: 'Scorpio', mn: 'Хилэнц' },
        { en: 'Aries', mn: 'Хонь' },
        { en: 'Taurus', mn: 'Үхэр' },
      ],
      3,
      {
        en: 'The earth signs are Taurus, Virgo and Capricorn.',
        mn: 'Шорооны ордууд нь Үхэр, Охин, Матар.',
      },
    ),
    q(
      'elements-modalities',
      3,
      2,
      { en: 'What do the four cardinal signs have in common?', mn: 'Дөрвөн эхлэгч ордын нийтлэг зүйл юу вэ?' },
      [
        { en: 'Each begins at the start of a season', mn: 'Тус бүр улирлын эхэнд эхэлдэг' },
        { en: 'They are all water signs', mn: 'Бүгд усны орд' },
        { en: 'They are all ruled by the Sun', mn: 'Бүгдийг Нар захирдаг' },
        { en: 'They are the four largest constellations', mn: 'Хамгийн том дөрвөн одны орд' },
      ],
      0,
      {
        en: 'Aries, Cancer, Libra and Capricorn begin at the equinoxes and solstices — the starts of the seasons.',
        mn: 'Хонь, Хавч, Жинлүүр, Матар нь тэгшитгэл, нар буцах үе буюу улирлын эхэнд эхэлдэг.',
      },
    ),
    q(
      'elements-modalities',
      4,
      2,
      { en: 'Leo is “fixed fire”. Which sign is “fixed water”?', mn: 'Арслан бол «тогтвортой гал». «Тогтвортой ус» аль орд вэ?' },
      [
        { en: 'Cancer', mn: 'Хавч' },
        { en: 'Pisces', mn: 'Загас' },
        { en: 'Scorpio', mn: 'Хилэнц' },
        { en: 'Aquarius', mn: 'Хумх' },
      ],
      2,
      {
        en: 'Scorpio is fixed water; Cancer is cardinal water and Pisces mutable water.',
        mn: 'Хилэнц бол тогтвортой ус; Хавч эхлэгч ус, Загас хувирамтгай ус.',
      },
    ),
    q(
      'elements-modalities',
      5,
      2,
      { en: 'Which group lists the four mutable signs?', mn: 'Аль нь дөрвөн хувирамтгай ордыг жагсаасан бэ?' },
      [
        { en: 'Taurus, Leo, Scorpio, Aquarius', mn: 'Үхэр, Арслан, Хилэнц, Хумх' },
        { en: 'Gemini, Virgo, Sagittarius, Pisces', mn: 'Ихэр, Охин, Нум, Загас' },
        { en: 'Aries, Cancer, Libra, Capricorn', mn: 'Хонь, Хавч, Жинлүүр, Матар' },
        { en: 'Aries, Leo, Virgo, Pisces', mn: 'Хонь, Арслан, Охин, Загас' },
      ],
      1,
      {
        en: 'Gemini, Virgo, Sagittarius and Pisces close each season, so they are called mutable (changeable).',
        mn: 'Ихэр, Охин, Нум, Загас улирал бүрийг хаадаг тул хувирамтгай гэж нэрлэгддэг.',
      },
    ),
    q(
      'elements-modalities',
      6,
      3,
      { en: 'Which Greek philosopher proposed the four elements fire, earth, air and water?', mn: 'Гал, шороо, хий, ус гэсэн дөрвөн махбодыг аль Грекийн гүн ухаантан дэвшүүлсэн бэ?' },
      [
        { en: 'Pythagoras', mn: 'Пифагор' },
        { en: 'Socrates', mn: 'Сократ' },
        { en: 'Thales', mn: 'Фалес' },
        { en: 'Empedocles', mn: 'Эмпедокл' },
      ],
      3,
      {
        en: 'Empedocles, around 450 BCE. Astrologers later attached his four elements to the signs.',
        mn: 'МЭӨ 450 орчим онд Эмпедокл. Хожим зурхайчид түүний дөрвөн махбодыг ордуудтай холбосон.',
      },
    ),

    // ── planets-houses ──────────────────────────────────────────────
    q(
      'planets-houses',
      1,
      1,
      { en: 'Your everyday “star sign” is the sign that which body was in when you were born?', mn: 'Таны энгийн «орд» гэдэг нь төрөх үед аль бие байсан орд вэ?' },
      [
        { en: 'The Moon', mn: 'Сар' },
        { en: 'The Sun', mn: 'Нар' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
      ],
      1,
      {
        en: 'The star sign is the Sun sign — where the Sun appeared against the zodiac at your birth.',
        mn: 'Энгийн орд бол нарны орд — таныг төрөхөд Нар зурхайн аль ордонд харагдаж байсан нь.',
      },
    ),
    q(
      'planets-houses',
      2,
      1,
      { en: 'In astrology, which planet is linked with love and beauty?', mn: 'Зурхайд хайр, гоо сайхантай аль гараг холбогддог вэ?' },
      [
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Mercury', mn: 'Буд' },
      ],
      2,
      {
        en: 'Venus, named after the Roman goddess of love, traditionally stands for love, beauty and pleasure.',
        mn: 'Ромын хайрын дарь эхийн нэрээр нэрлэгдсэн Сугар уламжлал ёсоор хайр, гоо сайхан, таашаалыг илэрхийлдэг.',
      },
    ),
    q(
      'planets-houses',
      3,
      2,
      { en: 'What is the “rising sign” (ascendant)?', mn: '«Мандах орд» (асцендент) гэж юу вэ?' },
      [
        { en: 'The sign on the eastern horizon at the moment of birth', mn: 'Төрөх мөчид зүүн тэнгэрийн хаяанд байсан орд' },
        { en: 'The sign the Moon was in at birth', mn: 'Төрөхөд Сар байсан орд' },
        { en: 'The sign that follows your Sun sign', mn: 'Нарны ордын дараах орд' },
        { en: 'The sign of the year you were born', mn: 'Төрсөн оны орд' },
      ],
      0,
      {
        en: 'The ascendant is the sign rising in the east at birth. It changes about every two hours, so astrologers need the exact birth time.',
        mn: 'Асцендент бол төрөх үед зүүн зүгт мандаж байсан орд. Хоёр цаг орчим тутам солигддог тул зурхайчид төрсөн яг цагийг шаарддаг.',
      },
    ),
    q(
      'planets-houses',
      4,
      2,
      { en: 'Which three make up the astrologer’s “big three”?', mn: 'Зурхайчдын «гол гурав»-т аль гурав ордог вэ?' },
      [
        { en: 'Sun, Mercury, Venus', mn: 'Нар, Буд, Сугар' },
        { en: 'Mars, Jupiter, Saturn', mn: 'Ангараг, Бархасбадь, Санчир' },
        { en: 'Moon, Venus, Mars', mn: 'Сар, Сугар, Ангараг' },
        { en: 'Sun, Moon, Rising sign', mn: 'Нар, Сар, Мандах орд' },
      ],
      3,
      {
        en: 'The Sun (identity), Moon (emotions) and Rising sign (outward manner) are called the big three.',
        mn: 'Нар (мөн чанар), Сар (сэтгэл хөдлөл), Мандах орд (гаднах төрх) гуравыг «гол гурав» гэдэг.',
      },
    ),
    q(
      'planets-houses',
      5,
      2,
      { en: 'Which area of life does tradition give to the 7th house?', mn: 'Уламжлал ёсоор 7-р гэр амьдралын аль хүрээг илэрхийлдэг вэ?' },
      [
        { en: 'Money and possessions', mn: 'Мөнгө хөрөнгө' },
        { en: 'Partnership and marriage', mn: 'Хамтрагч, гэрлэлт' },
        { en: 'Home and family', mn: 'Гэр орон, гэр бүл' },
        { en: 'Career and reputation', mn: 'Ажил мэргэжил, нэр хүнд' },
      ],
      1,
      {
        en: 'The 7th house, opposite the 1st house of the self, is traditionally partnership and marriage.',
        mn: 'Өөрийгөө илэрхийлэх 1-р гэрийн эсрэг талын 7-р гэр уламжлал ёсоор хамтрагч, гэрлэлтийг заадаг.',
      },
    ),
    q(
      'planets-houses',
      6,
      3,
      { en: 'The Mongolian weekday Пүрэв comes from the Tibetan name of which planet?', mn: 'Пүрэв гараг төвдөөр аль гарагийн нэрнээс гаралтай вэ?' },
      [
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Saturn', mn: 'Санчир' },
      ],
      2,
      {
        en: 'Пүрэв is Jupiter. Likewise Мягмар = Mars, Баасан = Venus and Бямба = Saturn.',
        mn: 'Пүрэв бол Бархасбадь. Үүнтэй адил Мягмар = Ангараг, Баасан = Сугар, Бямба = Санчир.',
      },
    ),

    // ── history ─────────────────────────────────────────────────────
    q(
      'history',
      1,
      1,
      { en: 'Where did astrology first develop?', mn: 'Зурхай анх хаана үүссэн бэ?' },
      [
        { en: 'Ancient Rome', mn: 'Эртний Ром' },
        { en: 'Mesopotamia (Babylon)', mn: 'Месопотами (Вавилон)' },
        { en: 'Medieval France', mn: 'Дундад зууны Франц' },
        { en: 'The Inca Empire', mn: 'Инкийн эзэнт гүрэн' },
      ],
      1,
      {
        en: 'Babylonian priests read the sky as omens for the king from the 2nd millennium BCE.',
        mn: 'Вавилоны тахилч нар МЭӨ 2-р мянганаас тэнгэрийг хаанд зориулсан шинж тэмдэг болгон уншдаг байв.',
      },
    ),
    q(
      'history',
      2,
      2,
      { en: 'Which ancient author wrote the Tetrabiblos, the classic astrology textbook?', mn: 'Зурхайн сонгодог сурах бичиг «Тетрабиблос»-ыг хэн бичсэн бэ?' },
      [
        { en: 'Aristotle', mn: 'Аристотель' },
        { en: 'Hipparchus', mn: 'Гиппарх' },
        { en: 'Euclid', mn: 'Евклид' },
        { en: 'Ptolemy', mn: 'Птолемей' },
      ],
      3,
      {
        en: 'Claudius Ptolemy wrote it in Alexandria in the 2nd century CE; it stayed the standard text for about 1,500 years.',
        mn: 'Клавдий Птолемей МЭ 2-р зуунд Александрид бичсэн бөгөөд 1500 орчим жил үндсэн бичиг хэвээр байв.',
      },
    ),
    q(
      'history',
      3,
      2,
      { en: 'Roughly when did Babylonians divide the zodiac into 12 equal signs?', mn: 'Вавилончууд зурхайг 12 тэнцүү ордод ойролцоогоор хэзээ хуваасан бэ?' },
      [
        { en: 'About the 5th century BCE', mn: 'МЭӨ 5-р зуун орчим' },
        { en: 'About 3000 BCE', mn: 'МЭӨ 3000 орчим' },
        { en: 'The 2nd century CE', mn: 'МЭ 2-р зуун' },
        { en: 'The 10th century CE', mn: 'МЭ 10-р зуун' },
      ],
      0,
      {
        en: 'The 12 equal 30° signs appear around the 5th century BCE; the oldest personal horoscope is from about 410 BCE.',
        mn: '30°-ын 12 тэнцүү орд МЭӨ 5-р зуун орчим бий болсон; хамгийн эртний хувийн зурхай МЭӨ 410 орчим онд хамаарна.',
      },
    ),
    q(
      'history',
      4,
      2,
      { en: 'Which famous astronomer also cast horoscopes, including one for the general Wallenstein?', mn: 'Аль алдартай одон орон судлаач жанжин Валленштейнд зурхай зурсан бэ?' },
      [
        { en: 'Edwin Hubble', mn: 'Эдвин Хаббл' },
        { en: 'Johannes Kepler', mn: 'Иоганн Кеплер' },
        { en: 'Carl Sagan', mn: 'Карл Саган' },
        { en: 'Nicolaus Copernicus', mn: 'Николай Коперник' },
      ],
      1,
      {
        en: 'Johannes Kepler, discoverer of the laws of planetary motion, drew Wallenstein’s horoscope in 1608 and wrote yearly almanac predictions.',
        mn: 'Гарагийн хөдөлгөөний хуулиудыг нээсэн Иоганн Кеплер 1608 онд Валленштейнд зурхай зурж, жил бүрийн хуанлийн таамаг бичдэг байв.',
      },
    ),
    q(
      'history',
      5,
      3,
      { en: 'The first newspaper horoscope (1930) was a reading of whose birth chart?', mn: 'Сонины анхны орд (1930) хэний төрөлтийн зурхайн тайлбар байсан бэ?' },
      [
        { en: 'Winston Churchill', mn: 'Уинстон Черчилль' },
        { en: 'Albert Einstein', mn: 'Альберт Эйнштейн' },
        { en: 'Princess Margaret', mn: 'Маргарет гүнж' },
        { en: 'Queen Victoria', mn: 'Хатан хаан Виктория' },
      ],
      2,
      {
        en: 'R. H. Naylor wrote about newborn Princess Margaret in the Sunday Express; readers loved it and the sun-sign column was born.',
        mn: 'Р. Х. Нейлор «Sunday Express» сонинд шинэ төрсөн Маргарет гүнжийн тухай бичсэн нь уншигчдад таалагдаж, ордын булан бий болсон.',
      },
    ),
    q(
      'history',
      6,
      3,
      { en: 'In which century did astronomy and astrology clearly separate?', mn: 'Одон орон ба зурхай аль зуунд тодорхой салсан бэ?' },
      [
        { en: '12th century', mn: '12-р зуун' },
        { en: '14th century', mn: '14-р зуун' },
        { en: '20th century', mn: '20-р зуун' },
        { en: '17th century', mn: '17-р зуун' },
      ],
      3,
      {
        en: 'In the 17th century, the work of Kepler, Galileo and Newton turned astronomy into a physical science, and astrology left the universities.',
        mn: '17-р зуунд Кеплер, Галилей, Ньютоны бүтээл одон оронг физикийн шинжлэх ухаан болгож, зурхай их сургуулиас гарсан.',
      },
    ),

    // ── mongol-years ────────────────────────────────────────────────
    q(
      'mongol-years',
      1,
      1,
      { en: 'Which animal’s year is 2026?', mn: '2026 он аль амьтны жил вэ?' },
      [
        { en: 'Dragon', mn: 'Луу' },
        { en: 'Snake', mn: 'Могой' },
        { en: 'Sheep', mn: 'Хонь' },
        { en: 'Horse', mn: 'Морь' },
      ],
      3,
      {
        en: '2026 is the Horse — Улаан морин жил. 2024 was the Dragon, 2025 the Snake, and 2027 will be the Sheep.',
        mn: '2026 он Улаан морин жил. 2024 он Луу, 2025 он Могой, 2027 он Хонин жил.',
      },
    ),
    q(
      'mongol-years',
      2,
      1,
      { en: 'Which animal comes first in the twelve-year cycle?', mn: 'Арван хоёр жилийн мөчлөгт аль амьтан эхэлдэг вэ?' },
      [
        { en: 'Rat', mn: 'Хулгана' },
        { en: 'Tiger', mn: 'Бар' },
        { en: 'Dragon', mn: 'Луу' },
        { en: 'Horse', mn: 'Морь' },
      ],
      0,
      {
        en: 'The Rat is first — in the legend it rode on the Ox’s back and jumped ahead at the finish.',
        mn: 'Хулгана эхэлдэг — домогт тэр үхрийн нуруун дээр суугаад барианд үсрэн түрүүлсэн.',
      },
    ),
    q(
      'mongol-years',
      3,
      1,
      { en: 'Which is the only mythical creature among the twelve year animals?', mn: 'Жилийн арван хоёр амьтны дундах цорын ганц домгийн амьтан аль нь вэ?' },
      [
        { en: 'Tiger', mn: 'Бар' },
        { en: 'Monkey', mn: 'Бич' },
        { en: 'Dragon', mn: 'Луу' },
        { en: 'Rooster', mn: 'Тахиа' },
      ],
      2,
      {
        en: 'The Dragon (Луу) is the only mythical one; the other eleven are real animals.',
        mn: 'Луу бол цорын ганц домгийн амьтан; бусад арван нэг нь жинхэнэ амьтад.',
      },
    ),
    q(
      'mongol-years',
      4,
      2,
      { en: 'Why may someone born in late January belong to the previous year’s animal?', mn: '1-р сарын сүүлээр төрсөн хүн яагаад өмнөх жилийн амьтанд хамаарч болох вэ?' },
      [
        { en: 'Because the year animal changes at Tsagaan Sar, not on 1 January', mn: 'Жилийн амьтан 1-р сарын 1-нд биш, Цагаан сараар солигддог тул' },
        { en: 'Because the cycle skips January', mn: 'Мөчлөг 1-р сарыг алгасдаг тул' },
        { en: 'Because the animal is set by the month, not the year', mn: 'Амьтан оноор биш, сараар тогтдог тул' },
        { en: 'Because only boys follow the new year', mn: 'Зөвхөн хөвгүүд шинэ жилийг дагадаг тул' },
      ],
      0,
      {
        en: 'The animal year begins at the lunar new year (Tsagaan Sar), usually in late January or February.',
        mn: 'Жилийн амьтан билгийн шинэ жил буюу ихэвчлэн 1-р сарын сүүл, 2-р сард болдог Цагаан сараас эхэлдэг.',
      },
    ),
    q(
      'mongol-years',
      5,
      2,
      { en: 'In the traditional “trines”, which animals are grouped with the Horse?', mn: 'Уламжлалт гурвалд Морьтой аль амьтад нэг бүлэгт ордог вэ?' },
      [
        { en: 'Rat and Monkey', mn: 'Хулгана, Бич' },
        { en: 'Ox and Rooster', mn: 'Үхэр, Тахиа' },
        { en: 'Rabbit and Pig', mn: 'Туулай, Гахай' },
        { en: 'Tiger and Dog', mn: 'Бар, Нохой' },
      ],
      3,
      {
        en: 'Tiger, Horse and Dog form one trine — traditionally the independent, idealistic group.',
        mn: 'Бар, Морь, Нохой нэг гурвал болдог — уламжлал ёсоор бие даасан, үзэл санаатай бүлэг.',
      },
    ),
    q(
      'mongol-years',
      6,
      3,
      { en: 'Which animal does Vietnam’s cycle have instead of the Rabbit?', mn: 'Вьетнамын мөчлөгт Туулайн оронд ямар амьтан байдаг вэ?' },
      [
        { en: 'Deer', mn: 'Буга' },
        { en: 'Cat', mn: 'Муур' },
        { en: 'Fox', mn: 'Үнэг' },
        { en: 'Frog', mn: 'Мэлхий' },
      ],
      1,
      {
        en: 'Vietnam has the Cat instead of the Rabbit (and the Water Buffalo instead of the Ox).',
        mn: 'Вьетнамд Туулайн оронд Муур (мөн Үхрийн оронд Усны үхэр) байдаг.',
      },
    ),

    // ── mongol-calendar ─────────────────────────────────────────────
    q(
      'mongol-calendar',
      1,
      1,
      { en: 'How many years is a full жаран cycle?', mn: 'Бүтэн жаран хэдэн жил вэ?' },
      [
        { en: '12', mn: '12' },
        { en: '30', mn: '30' },
        { en: '60', mn: '60' },
        { en: '100', mn: '100' },
      ],
      2,
      {
        en: '12 animals combine with 5 elements (each for a male and a female year), giving 60 years.',
        mn: '12 амьтан 5 махбодтой (тус бүр эр, эм жилээр) хослож 60 жил болдог.',
      },
    ),
    q(
      'mongol-calendar',
      2,
      1,
      { en: 'In Mongolian year names, which colour stands for the fire element?', mn: 'Монгол жилийн нэрэнд галын махбодыг ямар өнгөөр илэрхийлдэг вэ?' },
      [
        { en: 'Улаан (red)', mn: 'Улаан' },
        { en: 'Шар (yellow)', mn: 'Шар' },
        { en: 'Хөх (blue)', mn: 'Хөх' },
        { en: 'Цагаан (white)', mn: 'Цагаан' },
      ],
      0,
      {
        en: 'Fire is Улаан, so 2026 is Улаан морин жил. Wood is Хөх, earth Шар, metal Цагаан and water Хар.',
        mn: 'Гал бол Улаан, тиймээс 2026 он Улаан морин жил. Мод — Хөх, шороо — Шар, төмөр — Цагаан, ус — Хар.',
      },
    ),
    q(
      'mongol-calendar',
      3,
      2,
      { en: '2024 was a wood Dragon year. What is its Mongolian name?', mn: '2024 он модны махбодтой Луу жил байв. Монголоор юу гэж нэрлэдэг вэ?' },
      [
        { en: 'Шар луу жил', mn: 'Шар луу жил' },
        { en: 'Улаан луу жил', mn: 'Улаан луу жил' },
        { en: 'Цагаан луу жил', mn: 'Цагаан луу жил' },
        { en: 'Хөх луу жил', mn: 'Хөх луу жил' },
      ],
      3,
      {
        en: 'Wood is Хөх (blue), so 2024 was Хөх луу жил. Years ending in 4 or 5 are wood years.',
        mn: 'Мод бол Хөх тул 2024 он Хөх луу жил байв. 4, 5-аар төгсдөг он модны жил.',
      },
    ),
    q(
      'mongol-calendar',
      4,
      2,
      { en: 'What do the female-year forms like Улаагчин or Харагчин show?', mn: 'Улаагчин, Харагчин гэх мэт хэлбэр юуг заадаг вэ?' },
      [
        { en: 'A leap year with an extra month', mn: 'Илүү сартай жил' },
        { en: 'The second (female) year of the same element', mn: 'Нэг махбодын хоёр дахь (эм) жил' },
        { en: 'A year of bad luck', mn: 'Азгүй жил' },
        { en: 'The year a жаран begins', mn: 'Жаран эхлэх жил' },
      ],
      1,
      {
        en: 'Each element covers two years: first male (Улаан), then female (Улаагчин). 2027 is Улаагчин хонь жил.',
        mn: 'Махбод бүр хоёр жил: эхлээд эр (Улаан), дараа нь эм (Улаагчин). 2027 он Улаагчин хонь жил.',
      },
    ),
    q(
      'mongol-calendar',
      5,
      3,
      { en: 'Following the Tibetan tradition, which year traditionally begins a Mongolian жаран?', mn: 'Төвдийн уламжлалаар монгол жаран ямар жилээр эхэлдэг вэ?' },
      [
        { en: 'Wood Rat', mn: 'Хөх хулгана' },
        { en: 'Metal Monkey', mn: 'Цагаан бич' },
        { en: 'Fire Rabbit', mn: 'Гал туулай' },
        { en: 'Earth Dragon', mn: 'Шар луу' },
      ],
      2,
      {
        en: 'The Tibetan-Mongolian жаран starts with a Fire Rabbit year (the current one began in 1987), while the Chinese cycle starts with the Wood Rat.',
        mn: 'Төвд-монгол жаран Гал туулай жилээр эхэлдэг (одоогийнх 1987 онд эхэлсэн), харин хятадын мөчлөг Хөх хулганаас эхэлдэг.',
      },
    ),
    q(
      'mongol-calendar',
      6,
      2,
      { en: 'What is the evening before Tsagaan Sar called?', mn: 'Цагаан сарын өмнөх оройг юу гэдэг вэ?' },
      [
        { en: 'Битүүн', mn: 'Битүүн' },
        { en: 'Шинийн нэгэн', mn: 'Шинийн нэгэн' },
        { en: 'Наадам', mn: 'Наадам' },
        { en: 'Хаврын тэргүүн', mn: 'Хаврын тэргүүн' },
      ],
      0,
      {
        en: 'Битүүн is the last evening of the old year; Tsagaan Sar itself is the first day (шинийн нэгэн) of the first spring month.',
        mn: 'Битүүн бол хуучин оны сүүлчийн орой; Цагаан сар өөрөө хаврын тэргүүн сарын шинийн нэгэнд болдог.',
      },
    ),

    // ── chinese-vs-western ──────────────────────────────────────────
    q(
      'chinese-vs-western',
      1,
      1,
      { en: 'Your Western sign depends on your birth month. What sets your Eastern animal?', mn: 'Барууны орд төрсөн сараас хамаардаг. Дорнын амьтныг юу тодорхойлдог вэ?' },
      [
        { en: 'Your birth year', mn: 'Төрсөн он' },
        { en: 'Your birth hour only', mn: 'Зөвхөн төрсөн цаг' },
        { en: 'Your name', mn: 'Нэр' },
        { en: 'Your birthplace', mn: 'Төрсөн газар' },
      ],
      0,
      {
        en: 'The Eastern animal is set by the (lunar) year of birth; each animal rules a whole year.',
        mn: 'Дорнын амьтныг төрсөн (билгийн) он тодорхойлдог; амьтан бүр бүтэн жилийг захирдаг.',
      },
    ),
    q(
      'chinese-vs-western',
      2,
      1,
      { en: 'Which element is in the East Asian five but not in the Western four?', mn: 'Аль махбод дорнын таван махбодод байдаг ч барууны дөрвөнд байдаггүй вэ?' },
      [
        { en: 'Fire', mn: 'Гал' },
        { en: 'Water', mn: 'Ус' },
        { en: 'Metal', mn: 'Төмөр' },
        { en: 'Earth', mn: 'Шороо' },
      ],
      2,
      {
        en: 'The Eastern five are wood, fire, earth, metal and water — metal and wood replace the Western air.',
        mn: 'Дорнын таван махбод нь мод, гал, шороо, төмөр, ус — төмөр, мод хоёр барууны хийг орлодог.',
      },
    ),
    q(
      'chinese-vs-western',
      3,
      2,
      { en: 'How does Vedic (Indian) astrology measure the signs?', mn: 'Ведийн (Энэтхэгийн) зурхай ордыг яаж хэмждэг вэ?' },
      [
        { en: 'By the seasons (tropical)', mn: 'Улирлаар (тропик)' },
        { en: 'By the birth year', mn: 'Төрсөн оноор' },
        { en: 'By the phases of Venus', mn: 'Сугарын хувьслаар' },
        { en: 'Against the actual stars (sidereal)', mn: 'Жинхэнэ одтой харьцуулж (сидерал)' },
      ],
      3,
      {
        en: 'Vedic astrology is sidereal: it fixes signs to the stars, so they sit about 24° away from the Western, season-based signs.',
        mn: 'Ведийн зурхай сидерал: ордыг одтой уядаг тул улиралд суурилсан барууны ордоос 24° орчим зөрдөг.',
      },
    ),
    q(
      'chinese-vs-western',
      4,
      2,
      { en: 'How many lunar mansions (nakshatras) does Vedic astrology use?', mn: 'Ведийн зурхай хэдэн сарны од (накшатра) хэрэглэдэг вэ?' },
      [
        { en: '7', mn: '7' },
        { en: '27', mn: '27' },
        { en: '12', mn: '12' },
        { en: '60', mn: '60' },
      ],
      1,
      {
        en: 'There are 27 nakshatras — roughly one for each day of the Moon’s ~27-day trip around the sky.',
        mn: '27 накшатра бий — Сар тэнгэрийг ~27 хоногт тойрох замын өдөр бүрт нэг орчим.',
      },
    ),
    q(
      'chinese-vs-western',
      5,
      3,
      { en: 'In Indian and Mongolian tradition, which demon swallows the Sun or Moon to cause an eclipse?', mn: 'Энэтхэг, монголын уламжлалд нар, сарыг залгиж хиртэлт үүсгэдэг мангас хэн бэ?' },
      [
        { en: 'Typhon', mn: 'Тифон' },
        { en: 'Garuda', mn: 'Гаруда' },
        { en: 'Rahu', mn: 'Рахү' },
        { en: 'Ravana', mn: 'Равана' },
      ],
      2,
      {
        en: 'Rahu, a demon whose severed head chases the Sun and Moon. Vedic astrology treats Rahu and Ketu (the Moon’s nodes) as “shadow planets”.',
        mn: 'Рахү — тасархай толгой нь нар, сарыг хөөдөг мангас. Ведийн зурхайд Раху, Кету (сарны зангилаа)-г «сүүдэр гараг» гэж үздэг.',
      },
    ),

    // ── science ─────────────────────────────────────────────────────
    q(
      'science',
      1,
      1,
      { en: 'Which “13th” constellation does the Sun pass through that astrology leaves out?', mn: 'Зурхайд ордоггүй ч Нарны дайран өнгөрдөг «13 дахь» одны орд аль нь вэ?' },
      [
        { en: 'Orion', mn: 'Орион' },
        { en: 'Ophiuchus (the serpent-bearer)', mn: 'Могойчин' },
        { en: 'Ursa Major', mn: 'Их баавгай (Долоон бурхан)' },
        { en: 'Cassiopeia', mn: 'Кассиопея' },
      ],
      1,
      {
        en: 'Ophiuchus, the serpent-bearer. The Sun crosses it for about 18 days, roughly Nov 29 – Dec 17.',
        mn: 'Могойчин орд. Нар түүнийг 11/29 – 12/17 орчим буюу 18 орчим хоног гатладаг.',
      },
    ),
    q(
      'science',
      2,
      2,
      { en: 'In which zodiac constellation does the Sun spend the most days?', mn: 'Нар аль зурхайн одны ордонд хамгийн олон хоног байдаг вэ?' },
      [
        { en: 'Scorpius', mn: 'Хилэнц' },
        { en: 'Aries', mn: 'Хонь' },
        { en: 'Cancer', mn: 'Хавч' },
        { en: 'Virgo', mn: 'Охин' },
      ],
      3,
      {
        en: 'Virgo — about 45 days. Scorpius is the shortest, at only about 7 days.',
        mn: 'Охин — 45 орчим хоног. Хилэнц хамгийн богино, ердөө 7 орчим хоног.',
      },
    ),
    q(
      'science',
      3,
      2,
      { en: 'What slow motion of Earth has shifted the signs away from their constellations?', mn: 'Дэлхийн ямар удаан хөдөлгөөн ордыг одны ордноос нь зөрүүлсэн бэ?' },
      [
        { en: 'The precession (wobble) of its axis', mn: 'Тэнхлэгийн прецесс (савлалт)' },
        { en: 'Continental drift', mn: 'Тивийн шилжилт' },
        { en: 'The Moon’s tides', mn: 'Сарны түрлэг' },
        { en: 'Earth slowly speeding up', mn: 'Дэлхийн аажим хурдсалт' },
      ],
      0,
      {
        en: 'Earth’s axis wobbles once every ~25,800 years, so the signs have drifted about 24° — nearly a whole sign — from the stars.',
        mn: 'Дэлхийн тэнхлэг ~25,800 жилд нэг удаа савладаг тул орд одноос 24° орчим — бараг бүтэн нэг ордоор — зөрсөн.',
      },
    ),
    q(
      'science',
      4,
      2,
      { en: 'What is the Barnum (Forer) effect?', mn: 'Барнум (Форер)-ын эффект гэж юу вэ?' },
      [
        { en: 'Stars look brighter near the horizon', mn: 'Тэнгэрийн хаяанд од тод харагдах' },
        { en: 'Planets seem to move backwards', mn: 'Гараг ухарч буй мэт харагдах' },
        { en: 'People rate vague, general descriptions as personally accurate', mn: 'Хүмүүс бүрхэг, ерөнхий тодорхойлолтыг өөртөө яг тохирсон гэж үнэлэх' },
        { en: 'Twins always share a star sign', mn: 'Ихрүүд үргэлж нэг ордтой байх' },
      ],
      2,
      {
        en: 'In 1948 Bertram Forer gave students one generic profile; they rated it about 4.3/5 as a description of themselves.',
        mn: '1948 онд Бертрам Форер оюутнуудад нэг ерөнхий тодорхойлолт өгөхөд тэд өөрсдөдөө тохирсныг 5-аас 4.3 орчим гэж үнэлсэн.',
      },
    ),
    q(
      'science',
      5,
      3,
      { en: 'What did Shawn Carlson’s 1985 double-blind test in Nature find?', mn: 'Шон Карлсоны 1985 оны «Nature» сэтгүүлд нийтэлсэн давхар сохор туршилт юу илрүүлсэн бэ?' },
      [
        { en: 'Astrologers matched charts correctly about 90% of the time', mn: 'Зурхайчид 90 орчим хувь зөв тааруулсан' },
        { en: 'Only Sun signs had any effect', mn: 'Зөвхөн нарны орд нөлөөтэй байсан' },
        { en: 'Rising signs predicted careers', mn: 'Мандах орд ажил мэргэжлийг зөгнөсөн' },
        { en: 'Astrologers did no better than chance', mn: 'Зурхайчид санамсаргүй таавраас илүү гараагүй' },
      ],
      3,
      {
        en: 'Astrologers tried to match birth charts to personality profiles and did no better than random guessing.',
        mn: 'Зурхайчид төрөлтийн зургийг зан чанарын тодорхойлолттой тааруулахыг оролдсон боловч санамсаргүй таавраас илүү гараагүй.',
      },
    ),
    q(
      'science',
      6,
      3,
      { en: 'The spring equinox now lies in which constellation, moving toward Aquarius?', mn: 'Хаврын цэг одоо аль одны ордонд байгаа бөгөөд Хумх руу шилжиж байна вэ?' },
      [
        { en: 'Aries', mn: 'Хонь' },
        { en: 'Pisces', mn: 'Загас' },
        { en: 'Taurus', mn: 'Үхэр' },
        { en: 'Capricornus', mn: 'Матар' },
      ],
      1,
      {
        en: 'It sits in Pisces; it was in Aries about 2,000 years ago, which is why Aries became the “first” sign.',
        mn: 'Энэ нь Загас ордонд байна; 2000 орчим жилийн өмнө Хонь ордонд байсан тул Хонь «эхний» орд болсон.',
      },
    ),
  ],
};
