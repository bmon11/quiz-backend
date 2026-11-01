import type { SeedBundle } from '../types';
import { godsFamily } from './gods-family';

// Greek & Roman gods — mainstream facts only (Hesiod's Theogony, Homer and
// standard handbooks). Where ancient versions disagree, the text says so.

const T = 'gods';

export const gods: SeedBundle = {
  topic: {
    slug: T,
    order: 1,
    color: '#7C4DFF',
    icon: 'solar:crown-star-bold-duotone',
    title: { en: 'Greek & Roman Gods', mn: 'Грек, Ромын бурхад' },
    tagline: { en: 'Titans, thunderbolts and heroes', mn: 'Титанууд, аянга, баатрууд' },
    description: {
      en: 'Meet the gods of Mount Olympus, the Titans before them and the heroes of the old stories. See how their names still live in our planets, months and words.',
      mn: 'Олимп уулын бурхад, тэдний өмнөх Титанууд, эртний домгийн баатруудтай танилц. Тэдний нэр өнөөг хүртэл гариг, сар, үгэнд хэрхэн үлдсэнийг хараарай.',
    },
  },

  lessons: [
    // 1 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.origins',
      order: 1,
      title: { en: 'How It All Began', mn: 'Бүх юм хэрхэн эхэлсэн бэ' },
      summary: {
        en: 'From empty Chaos to the rule of Zeus: the Greek story of creation.',
        mn: 'Хоосон Хаосоос Зевсийн засаглал хүртэл: Грекчүүдийн ертөнц үүссэн тухай домог.',
      },
      body: {
        en: 'The poet Hesiod told how the world began. First came Chaos, then Gaia, the Earth. Gaia gave birth to Uranus, the Sky, and their children were the Titans. The youngest Titan, Cronus, became king, but his own son Zeus later took his place.',
        mn: 'Яруу найрагч Гесиод ертөнц хэрхэн үүссэнийг өгүүлжээ. Хамгийн эхэнд Хаос байсан, дараа нь Газар дэлхий болох Гая бий болжээ. Гая Тэнгэр болох Ураныг төрүүлж, тэдний хүүхдүүд нь Титанууд байв. Хамгийн бага Титан Кронос хаан болсон ч хожим өөрийн хүү Зевст суудлаа алджээ.',
      },
      visual: {
        kind: 'timeline',
        items: [
          {
            when: { en: 'The very beginning', mn: 'Хамгийн эхэнд' },
            title: { en: 'Chaos', mn: 'Хаос' },
            body: {
              en: 'According to Hesiod, first there was Chaos: a vast, dark, empty gap.',
              mn: 'Гесиодын хэлснээр хамгийн эхэнд Хаос буюу асар том, харанхуй, хоосон орон зай байжээ.',
            },
          },
          {
            when: { en: 'Next', mn: 'Дараа нь' },
            title: { en: 'Gaia and Uranus', mn: 'Гая ба Уран' },
            body: {
              en: 'Gaia, the Earth, appeared. She gave birth to Uranus, the starry Sky, and he became her husband.',
              mn: 'Газар дэлхий болох Гая бий болов. Тэр одот Тэнгэр болох Ураныг төрүүлж, Уран түүний нөхөр болжээ.',
            },
          },
          {
            when: { en: 'The first children', mn: 'Анхны хүүхдүүд' },
            title: { en: 'The Titans', mn: 'Титанууд' },
            body: {
              en: 'Gaia and Uranus had twelve Titans, plus the one-eyed Cyclopes and the Hundred-Handed giants. Uranus hated his children and hid them away inside the Earth.',
              mn: 'Гая, Уран хоёр арван хоёр Титан, мөн нэг нүдтэй Циклопууд, зуун гартай аваргуудыг төрүүлжээ. Уран хүүхдүүдээ үзэн ядаж, газрын гүнд нуужээ.',
            },
          },
          {
            when: { en: 'A new king', mn: 'Шинэ хаан' },
            title: { en: 'Cronus takes the throne', mn: 'Кронос хаан ширээнд суув' },
            body: {
              en: 'Gaia gave her youngest son Cronus a great sickle. He attacked Uranus and became king of the Titans.',
              mn: 'Гая хамгийн бага хүү Кроностоо том хадуур өгчээ. Кронос Уран руу дайрч, Титануудын хаан болов.',
            },
          },
          {
            when: { en: 'A dark fear', mn: 'Аймшигт айдас' },
            title: { en: 'Cronus swallows his children', mn: 'Кронос хүүхдүүдээ залгив' },
            body: {
              en: 'Cronus heard that one of his children would overthrow him. So each time his wife Rhea had a baby, he swallowed it whole.',
              mn: 'Кронос өөрийн нэг хүүхэд нь түүнийг түлхэн унагана гэж сонсжээ. Тиймээс эхнэр Рея нь хүүхэд төрүүлэх бүрт тэр нялх хүүхдийг бүтнээр нь залгидаг байв.',
            },
          },
          {
            when: { en: 'A clever trick', mn: 'Ухаалаг заль' },
            title: { en: 'Rhea saves Zeus', mn: 'Рея Зевсийг аварлаа' },
            body: {
              en: 'When Zeus was born, Rhea hid him on the island of Crete. She gave Cronus a stone wrapped in baby blankets, and he swallowed the stone instead.',
              mn: 'Зевс төрөхөд Рея түүнийг Крит арал дээр нуужээ. Тэр Кроност нялхсын өлгийд ороосон чулуу өгөхөд Кронос хүүхдийн оронд чулууг залгижээ.',
            },
          },
          {
            when: { en: 'Ten years of war', mn: 'Арван жилийн дайн' },
            title: { en: 'The Titanomachy', mn: 'Титаномахи буюу Титануудын дайн' },
            body: {
              en: 'Grown-up Zeus made Cronus spit out his brothers and sisters. Together they fought the Titans for ten years. The Cyclopes gave Zeus his thunderbolt, and the gods won.',
              mn: 'Том болсон Зевс Кроносыг ах, эгч нарыг нь бөөлжүүлэхэд хүргэжээ. Тэд хамтдаа Титануудтай арван жил тулалдав. Циклопууд Зевст аянга бэлэглэж, бурхад ялжээ.',
            },
          },
          {
            when: { en: 'A new age', mn: 'Шинэ эрин' },
            title: { en: 'The Olympians rule', mn: 'Олимпийн бурхад засаглав' },
            body: {
              en: 'The defeated Titans were locked in Tartarus, deep below the earth. Zeus took the sky, Poseidon the sea, and Hades the underworld. The gods made their home on Mount Olympus.',
              mn: 'Ялагдсан Титануудыг газрын гүн дэх Тартарт хорьжээ. Зевс тэнгэрийг, Посейдон далайг, Гадес үхэгсдийн оронг авчээ. Бурхад Олимп ууланд суурьшжээ.',
            },
          },
        ],
      },
      funFacts: [
        {
          en: 'Rhea hid baby Zeus on the island of Crete, in a cave on a mountain.',
          mn: 'Рея нялх Зевсийг Крит арлын уулын агуйд нуусан гэдэг.',
        },
        {
          en: 'The Titan Atlas was punished after the war: he had to hold up the sky forever.',
          mn: 'Дайны дараа Титан Атласыг шийтгэж, тэнгэрийг үүрд өргөж байхыг тушаажээ.',
        },
        {
          en: 'In Homer, Zeus, Poseidon and Hades divided the world by drawing lots.',
          mn: 'Гомерын бичсэнээр Зевс, Посейдон, Гадес гурав ертөнцийг шавга татаж хуваажээ.',
        },
      ],
    },

    // 2 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.family-tree',
      order: 2,
      title: { en: 'The Family Tree of the Gods', mn: 'Бурхдын угийн бичиг' },
      summary: {
        en: 'Almost every Greek god belongs to one big, complicated family.',
        mn: 'Грекийн бараг бүх бурхан нэг том, ээдрээтэй гэр бүлд багтдаг.',
      },
      body: {
        en: 'The Greek gods were one family. Cronus and Rhea had six children: Hestia, Demeter, Hera, Hades, Poseidon and Zeus. Zeus then had many children with different mothers. Many of them became the great gods of Olympus.',
        mn: 'Грекийн бурхад нэг гэр бүл байжээ. Кронос, Рея хоёр Гестиа, Деметра, Хера, Гадес, Посейдон, Зевс гэсэн зургаан хүүхэдтэй байв. Зевс өөр өөр эхээс олон хүүхэдтэй болжээ. Тэдний олонх нь Олимпийн агуу бурхад болсон.',
      },
      visual: godsFamily,
      funFacts: [
        {
          en: 'Hestia was the first child Cronus swallowed, and the last one he spat out.',
          mn: 'Гестиа бол Кроносын хамгийн түрүүнд залгиж, хамгийн сүүлд бөөлжсөн хүүхэд.',
        },
        {
          en: 'Hera was both the sister and the wife of Zeus.',
          mn: 'Хера бол Зевсийн эгч дүү бөгөөд эхнэр нь байжээ.',
        },
        {
          en: 'Ancient poets disagree about Hephaestus: Homer calls him the son of Zeus and Hera, but Hesiod says Hera had him alone.',
          mn: 'Эртний яруу найрагчид Хефестийн талаар зөрдөг: Гомер түүнийг Зевс, Хера хоёрын хүү гэдэг бол Гесиод ганц Хера төрүүлсэн гэжээ.',
        },
      ],
    },

    // 3 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.olympians',
      order: 3,
      title: { en: 'The Twelve Olympians', mn: 'Олимпийн арван хоёр бурхан' },
      summary: {
        en: 'Twelve great gods lived on Mount Olympus, each with a job and a symbol.',
        mn: 'Олимп ууланд арван хоёр агуу бурхан амьдардаг байсан бөгөөд тус бүр өөрийн үүрэг, бэлгэ тэмдэгтэй.',
      },
      body: {
        en: 'The Greeks believed their most important gods lived on Mount Olympus, the highest mountain in Greece. There were twelve of them, led by Zeus. Each god looked after part of the world, like the sea, war or the harvest. Lists differ a little: some include Hestia, others include Dionysus.',
        mn: 'Грекчүүд хамгийн чухал бурхад нь Грекийн хамгийн өндөр уул болох Олимп ууланд амьдардаг гэж итгэдэг байв. Тэд Зевсээр тэргүүлсэн арван хоёр бурхан байжээ. Бурхан бүр далай, дайн, ургац гэх мэт ертөнцийн нэг хэсгийг хариуцдаг. Жагсаалтууд бага зэрэг ялгаатай: заримд нь Гестиа, заримд нь Дионис ордог.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Zeus', mn: 'Зевс' },
            subtitle: { en: 'King of the gods, sky and thunder', mn: 'Бурхдын хаан, тэнгэр ба аянга' },
            icon: '⚡',
            color: '#F9A825',
            facts: [
              { en: 'Symbol: the thunderbolt.', mn: 'Бэлгэ тэмдэг: аянга.' },
              { en: 'Sacred animal: the eagle.', mn: 'Ариун амьтан: бүргэд.' },
              { en: 'He led the gods to victory over the Titans.', mn: 'Тэр бурхдыг удирдан Титануудыг ялсан.' },
            ],
          },
          {
            title: { en: 'Hera', mn: 'Хера' },
            subtitle: { en: 'Queen of the gods, marriage and family', mn: 'Бурхдын хатан, гэрлэлт ба гэр бүл' },
            icon: '👑',
            color: '#AD1457',
            facts: [
              { en: 'Symbols: the crown and the pomegranate.', mn: 'Бэлгэ тэмдэг: титэм, анар.' },
              { en: 'Sacred animal: the peacock.', mn: 'Ариун амьтан: тогос.' },
              { en: "A story says she put the hundred eyes of the giant Argus on the peacock's tail.", mn: 'Домогт өгүүлснээр тэр зуун нүдтэй аварга Аргусын нүдийг тогосны сүүлэнд байршуулжээ.' },
            ],
          },
          {
            title: { en: 'Poseidon', mn: 'Посейдон' },
            subtitle: { en: 'God of the sea, earthquakes and horses', mn: 'Далай, газар хөдлөлт, морины бурхан' },
            icon: '🔱',
            color: '#0277BD',
            facts: [
              { en: 'Symbol: the trident, a three-pronged spear.', mn: 'Бэлгэ тэмдэг: гурван салаат сэрээ.' },
              { en: 'Sacred animals: the horse and the dolphin.', mn: 'Ариун амьтан: морь, далайн гахай.' },
              { en: 'He lost a contest with Athena to become the patron of Athens.', mn: 'Афин хотын ивээн тэтгэгч болох төлөө Афинатай өрсөлдөөд ялагдсан.' },
            ],
          },
          {
            title: { en: 'Demeter', mn: 'Деметра' },
            subtitle: { en: 'Goddess of the harvest and grain', mn: 'Ургац, тариа будааны дарь эх' },
            icon: '🌾',
            color: '#9E9D24',
            facts: [
              { en: 'Symbols: a sheaf of wheat and a torch.', mn: 'Бэлгэ тэмдэг: улаан буудайн баглаа, бамбар.' },
              { en: 'She is the mother of Persephone.', mn: 'Тэр Персефонагийн ээж.' },
              { en: 'Her sadness over her lost daughter explains winter in the old myth.', mn: 'Домогт өгүүлснээр алдсан охиныхоо төлөөх гуниг нь өвөл болдог.' },
            ],
          },
          {
            title: { en: 'Athena', mn: 'Афина' },
            subtitle: { en: 'Goddess of wisdom, crafts and battle strategy', mn: 'Мэргэн ухаан, гар урлал, байлдааны ухааны дарь эх' },
            icon: '🦉',
            color: '#546E7A',
            facts: [
              { en: 'Sacred animal: the owl.', mn: 'Ариун амьтан: шар шувуу.' },
              { en: "She was born fully armoured from Zeus's head.", mn: 'Тэр Зевсийн толгойноос бүрэн хуягтайгаар төрсөн.' },
              { en: 'She gave Athens the olive tree, and the city took her name.', mn: 'Тэр Афинд чидун мод бэлэглэж, хот түүний нэрээр нэрлэгдсэн.' },
            ],
          },
          {
            title: { en: 'Apollo', mn: 'Аполлон' },
            subtitle: { en: 'God of music, light, prophecy and healing', mn: 'Хөгжим, гэрэл, зөн билиг, эмчилгээний бурхан' },
            icon: '🎵',
            color: '#FFB300',
            facts: [
              { en: 'Symbols: the lyre and the laurel wreath.', mn: 'Бэлгэ тэмдэг: лир хөгжим, лаврын титэм.' },
              { en: 'He is the twin brother of Artemis.', mn: 'Тэр Артемисын ихэр ах дүү.' },
              { en: 'His famous oracle was at Delphi.', mn: 'Түүний алдарт мэргэ төлөгч Дельфид байжээ.' },
            ],
          },
          {
            title: { en: 'Artemis', mn: 'Артемис' },
            subtitle: { en: 'Goddess of the hunt, wild animals and the moon', mn: 'Ан агнуур, зэрлэг амьтад, сарны дарь эх' },
            icon: '🏹',
            color: '#6A1B9A',
            facts: [
              { en: 'Symbol: the silver bow and arrows.', mn: 'Бэлгэ тэмдэг: мөнгөн нум сум.' },
              { en: 'Sacred animal: the deer.', mn: 'Ариун амьтан: буга.' },
              { en: 'She and Apollo were born on the island of Delos.', mn: 'Тэр Аполлонтой хамт Делос арал дээр төрсөн.' },
            ],
          },
          {
            title: { en: 'Ares', mn: 'Арес' },
            subtitle: { en: 'God of war', mn: 'Дайны бурхан' },
            icon: '⚔️',
            color: '#C62828',
            facts: [
              { en: 'Symbols: the spear and the helmet.', mn: 'Бэлгэ тэмдэг: жад, дуулга.' },
              { en: 'Sacred animals: the dog and the vulture.', mn: 'Ариун амьтан: нохой, тас шувуу.' },
              { en: 'His sons Phobos (Fear) and Deimos (Terror) went with him into battle.', mn: 'Түүний хөвгүүд Фобос (Айдас), Деймос (Аймшиг) түүнийг дагаж тулалддаг байв.' },
            ],
          },
          {
            title: { en: 'Aphrodite', mn: 'Афродита' },
            subtitle: { en: 'Goddess of love and beauty', mn: 'Хайр, гоо үзэсгэлэнгийн дарь эх' },
            icon: '🕊️',
            color: '#EC407A',
            facts: [
              { en: 'Symbols: the rose and the dove.', mn: 'Бэлгэ тэмдэг: сарнай, тагтаа.' },
              { en: 'Hesiod says she rose from the sea foam.', mn: 'Гесиодын хэлснээр тэр далайн хөөснөөс мэндэлсэн.' },
              { en: 'Paris gave her the golden apple "for the fairest".', mn: 'Парис түүнд «хамгийн гоо үзэсгэлэнтэйд» гэсэн алтан алим өгсөн.' },
            ],
          },
          {
            title: { en: 'Hephaestus', mn: 'Хефест' },
            subtitle: { en: 'God of fire, metalwork and the forge', mn: 'Гал, төмөрлөг, дарханы бурхан' },
            icon: '🔨',
            color: '#6D4C41',
            facts: [
              { en: 'Symbols: the hammer and the anvil.', mn: 'Бэлгэ тэмдэг: алх, дөш.' },
              { en: 'He was the blacksmith of the gods.', mn: 'Тэр бурхдын дархан байв.' },
              { en: 'He made new armour for the hero Achilles.', mn: 'Тэр баатар Ахиллест шинэ хуяг дуулга хийж өгсөн.' },
            ],
          },
          {
            title: { en: 'Hermes', mn: 'Гермес' },
            subtitle: { en: 'Messenger of the gods, travellers and thieves', mn: 'Бурхдын элч, аялагч ба хулгайчдын бурхан' },
            icon: '🪽',
            color: '#00897B',
            facts: [
              { en: 'Symbols: winged sandals and a herald\'s staff.', mn: 'Бэлгэ тэмдэг: далавчтай шаахай, элчийн таяг.' },
              { en: "As a baby, he stole Apollo's cattle.", mn: 'Нялх байхдаа Аполлоны үхрийг хулгайлсан.' },
              { en: 'He made the first lyre from a tortoise shell.', mn: 'Тэр яст мэлхийн хуягаар анхны лир хөгжмийг хийсэн.' },
            ],
          },
          {
            title: { en: 'Dionysus', mn: 'Дионис' },
            subtitle: { en: 'God of wine, festivals and theatre', mn: 'Дарс, баяр наадам, театрын бурхан' },
            icon: '🍇',
            color: '#7B1FA2',
            facts: [
              { en: 'Symbols: the grapevine and a pine-tipped staff.', mn: 'Бэлгэ тэмдэг: усан үзмийн мөчир, үзүүрт нарсны боргоцойтой таяг.' },
              { en: 'His mother Semele was a mortal princess.', mn: 'Түүний ээж Семела бол мөнх бус гүнж байв.' },
              { en: "He was born from Zeus's thigh.", mn: 'Тэр Зевсийн гуянаас төрсөн.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'Hestia, goddess of the hearth, is sometimes counted among the Twelve instead of Dionysus.',
          mn: 'Гал голомтын дарь эх Гестиаг заримдаа Дионисын оронд арван хоёрт тооцдог.',
        },
        {
          en: 'Mount Olympus is a real mountain, the highest in Greece at about 2,900 metres.',
          mn: 'Олимп бол Грекийн хамгийн өндөр, 2900 орчим метр өндөр жинхэнэ уул юм.',
        },
        {
          en: 'Hades is a brother of Zeus, but he lived in the underworld, not on Olympus.',
          mn: 'Гадес Зевсийн ах дүү боловч Олимпод биш, үхэгсдийн оронд амьдардаг байв.',
        },
      ],
    },

    // 4 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.greek-roman',
      order: 4,
      title: { en: 'Greek and Roman Names', mn: 'Грек ба Ромын нэрс' },
      summary: {
        en: 'The Romans took over the Greek gods and gave most of them new names.',
        mn: 'Ромчууд Грекийн бурхдыг өөрсдийн болгож, ихэнхэд нь шинэ нэр өгчээ.',
      },
      body: {
        en: 'The Romans had their own gods, but over time they matched them with the Greek gods. Zeus became Jupiter, and Aphrodite became Venus. The stories stayed mostly the same, but the names changed. Only Apollo kept his Greek name.',
        mn: 'Ромчууд өөрсдийн бурхадтай байсан ч цаг хугацааны явцад тэднийгээ Грекийн бурхадтай адилтгажээ. Зевс Юпитер, Афродита Венера болсон. Домгууд нь ихэвчлэн хэвээр үлдсэн ч нэрс нь өөрчлөгджээ. Зөвхөн Аполлон л Грек нэрээ хадгалсан.',
      },
      visual: {
        kind: 'pairs',
        left: { en: 'Greek', mn: 'Грек' },
        right: { en: 'Roman', mn: 'Ром' },
        items: [
          { left: { en: 'Zeus', mn: 'Зевс' }, right: { en: 'Jupiter', mn: 'Юпитер' }, note: { en: 'King of the gods, sky', mn: 'Бурхдын хаан, тэнгэр' }, icon: '⚡' },
          { left: { en: 'Hera', mn: 'Хера' }, right: { en: 'Juno', mn: 'Юнона' }, note: { en: 'Queen of the gods, marriage', mn: 'Бурхдын хатан, гэрлэлт' }, icon: '👑' },
          { left: { en: 'Poseidon', mn: 'Посейдон' }, right: { en: 'Neptune', mn: 'Нептун' }, note: { en: 'Sea', mn: 'Далай' }, icon: '🔱' },
          { left: { en: 'Hades', mn: 'Гадес' }, right: { en: 'Pluto', mn: 'Плутон' }, note: { en: 'Underworld', mn: 'Үхэгсдийн орон' }, icon: '💀' },
          { left: { en: 'Athena', mn: 'Афина' }, right: { en: 'Minerva', mn: 'Минерва' }, note: { en: 'Wisdom, crafts', mn: 'Мэргэн ухаан, гар урлал' }, icon: '🦉' },
          { left: { en: 'Apollo', mn: 'Аполлон' }, right: { en: 'Apollo', mn: 'Аполлон' }, note: { en: 'Music, light, prophecy', mn: 'Хөгжим, гэрэл, зөн билиг' }, icon: '🎵' },
          { left: { en: 'Artemis', mn: 'Артемис' }, right: { en: 'Diana', mn: 'Диана' }, note: { en: 'Hunt, moon', mn: 'Ан агнуур, сар' }, icon: '🏹' },
          { left: { en: 'Ares', mn: 'Арес' }, right: { en: 'Mars', mn: 'Марс' }, note: { en: 'War', mn: 'Дайн' }, icon: '⚔️' },
          { left: { en: 'Aphrodite', mn: 'Афродита' }, right: { en: 'Venus', mn: 'Венера' }, note: { en: 'Love, beauty', mn: 'Хайр, гоо үзэсгэлэн' }, icon: '🕊️' },
          { left: { en: 'Hermes', mn: 'Гермес' }, right: { en: 'Mercury', mn: 'Меркури' }, note: { en: 'Messenger, travellers', mn: 'Элч, аялагчид' }, icon: '🪽' },
          { left: { en: 'Hephaestus', mn: 'Хефест' }, right: { en: 'Vulcan', mn: 'Вулкан' }, note: { en: 'Fire, forge', mn: 'Гал, дархан' }, icon: '🔨' },
          { left: { en: 'Demeter', mn: 'Деметра' }, right: { en: 'Ceres', mn: 'Церера' }, note: { en: 'Harvest, grain', mn: 'Ургац, тариа' }, icon: '🌾' },
          { left: { en: 'Dionysus', mn: 'Дионис' }, right: { en: 'Bacchus', mn: 'Бахус' }, note: { en: 'Wine, festivals', mn: 'Дарс, баяр наадам' }, icon: '🍇' },
          { left: { en: 'Hestia', mn: 'Гестиа' }, right: { en: 'Vesta', mn: 'Веста' }, note: { en: 'Hearth, home', mn: 'Гал голомт, гэр' }, icon: '🔥' },
          { left: { en: 'Persephone', mn: 'Персефона' }, right: { en: 'Proserpina', mn: 'Прозерпина' }, note: { en: 'Queen of the underworld, spring', mn: 'Үхэгсдийн орны хатан, хавар' }, icon: '🌸' },
          { left: { en: 'Cronus', mn: 'Кронос' }, right: { en: 'Saturn', mn: 'Сатурн' }, note: { en: 'King of the Titans', mn: 'Титануудын хаан' }, icon: '⏳' },
        ],
      },
      funFacts: [
        {
          en: 'Apollo is the only major Olympian whose name stayed the same in Rome.',
          mn: 'Аполлон бол Ромд нэрээ өөрчлөөгүй цорын ганц томоохон Олимпийн бурхан.',
        },
        {
          en: 'The word "volcano" comes from Vulcan, the Roman god of fire.',
          mn: 'Англи хэлний «volcano» (галт уул) гэдэг үг Ромын галын бурхан Вулканаас гаралтай.',
        },
        {
          en: 'In Rome, the Vestal Virgins kept the sacred fire of Vesta burning.',
          mn: 'Ромд Вестагийн шивэгчин бүсгүйчүүд Вестагийн ариун галыг унтраалгүй сахидаг байв.',
        },
      ],
    },

    // 5 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.underworld',
      order: 5,
      title: { en: 'The Underworld', mn: 'Үхэгсдийн орон' },
      summary: {
        en: 'Where the Greeks believed souls went after death, ruled by Hades.',
        mn: 'Грекчүүдийн итгэснээр нас барагсдын сүнс очдог, Гадесийн захирдаг орон.',
      },
      body: {
        en: 'The Greeks believed that the souls of the dead went to a land under the earth. Hades ruled it with his queen, Persephone. A ferryman took souls across a dark river, and a three-headed dog guarded the gate. The story of Persephone also explained why we have seasons.',
        mn: 'Грекчүүд нас барагсдын сүнс газар доорх оронд очдог гэж итгэдэг байв. Тэр орныг Гадес хатан Персефонатайгаа хамт захирдаг. Сүнснүүдийг завьчин харанхуй голыг гатлуулж, гурван толгойтой нохой үүдийг нь манадаг байв. Персефонагийн домог мөн улирал яагаад солигддогийг тайлбарладаг.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Hades', mn: 'Гадес' },
            subtitle: { en: 'King of the underworld (Roman: Pluto)', mn: 'Үхэгсдийн орны хаан (Ромоор: Плутон)' },
            icon: '💀',
            color: '#37474F',
            facts: [
              { en: 'He is a brother of Zeus and Poseidon.', mn: 'Тэр Зевс, Посейдон нарын ах дүү.' },
              { en: 'He had a helmet that made him invisible.', mn: 'Түүнд үл үзэгдэх болгодог дуулга байсан.' },
              { en: 'He was strict but fair, not an evil devil.', mn: 'Тэр хатуу ч шударга байсан, хорон муу чөтгөр биш.' },
            ],
          },
          {
            title: { en: 'Persephone', mn: 'Персефона' },
            subtitle: { en: 'Queen of the underworld, goddess of spring', mn: 'Үхэгсдийн орны хатан, хаврын дарь эх' },
            icon: '🌸',
            color: '#8E24AA',
            facts: [
              { en: 'Hades carried her off to be his wife.', mn: 'Гадес түүнийг эхнэрээ болгохоор хулгайлан авч одсон.' },
              { en: 'She ate pomegranate seeds there, so she had to return every year.', mn: 'Тэнд анарын үр идсэн тул жил бүр буцаж очих болжээ.' },
              { en: 'While she is below, Demeter grieves and it is winter; when she returns, spring comes.', mn: 'Түүнийг газар доор байхад Деметра гашуудаж, өвөл болдог; буцаж ирэхэд хавар ирдэг.' },
            ],
          },
          {
            title: { en: 'Cerberus', mn: 'Цербер' },
            subtitle: { en: 'Guard dog of the underworld', mn: 'Үхэгсдийн орны манаач нохой' },
            icon: '🐕',
            color: '#B71C1C',
            facts: [
              { en: 'He is usually shown with three heads.', mn: 'Түүнийг ихэвчлэн гурван толгойтой дүрсэлдэг.' },
              { en: 'He let souls in but never let them out.', mn: 'Тэр сүнснүүдийг оруулдаг ч хэзээ ч гаргадаггүй байв.' },
              { en: 'Heracles dragged him up to the surface as his last labour.', mn: 'Геракл сүүлчийн гавьяагаа хийхдээ түүнийг газрын гадаргад чирч гаргасан.' },
            ],
          },
          {
            title: { en: 'The River Styx', mn: 'Стикс гол' },
            subtitle: { en: 'The river of unbreakable oaths', mn: 'Зөрчиж болохгүй тангаргийн гол' },
            icon: '🌊',
            color: '#283593',
            facts: [
              { en: 'It was one of the rivers of the underworld.', mn: 'Энэ бол үхэгсдийн орны голуудын нэг байв.' },
              { en: 'Even gods could not break a promise sworn by the Styx.', mn: 'Стиксээр тангарагласан амлалтыг бурхад ч зөрчиж чаддаггүй байв.' },
              { en: 'Another river, Lethe, made souls forget their past lives.', mn: 'Өөр нэг гол болох Лета сүнснүүдэд өмнөх амьдралаа мартуулдаг байв.' },
            ],
          },
          {
            title: { en: 'Charon', mn: 'Харон' },
            subtitle: { en: 'The ferryman of the dead', mn: 'Нас барагсдын завьчин' },
            icon: '🛶',
            color: '#455A64',
            facts: [
              { en: 'He rowed souls across the river into the underworld.', mn: 'Тэр сүнснүүдийг завиар голыг гатлуулж үхэгсдийн оронд хүргэдэг байв.' },
              { en: "Greeks put a coin with the dead to pay Charon's fare.", mn: 'Грекчүүд Хароны хөлсийг төлүүлэхээр нас барагсадтай хамт зоос тавьдаг байв.' },
              { en: 'Souls who could not pay had to wander on the shore.', mn: 'Хөлсөө төлж чадаагүй сүнснүүд эрэг дээр тэнүүчлэх ёстой байв.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'The Greeks avoided saying "Hades" and often called him Plouton, "the rich one", because riches come from under the ground.',
          mn: 'Грекчүүд «Гадес» гэж хэлэхээс зайлсхийж, газар доороос эрдэнэс гардаг тул түүнийг «баян» гэсэн утгатай Плутон гэж нэрлэдэг байв.',
        },
        {
          en: 'The dwarf planet Pluto has a moon named Charon.',
          mn: 'Одой гариг Плутон Харон гэдэг дагуултай.',
        },
      ],
    },

    // 6 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.heroes-monsters',
      order: 6,
      title: { en: 'Heroes and Monsters', mn: 'Баатрууд ба мангасууд' },
      summary: {
        en: 'Brave heroes, clever tricks and terrible monsters from the Greek myths.',
        mn: 'Грек домгийн зоригт баатрууд, ухаалаг заль мэх, аймшигт мангасууд.',
      },
      body: {
        en: 'Greek myths are full of heroes. Many were half-human and half-god, often children of Zeus. They fought monsters, went on long journeys and faced impossible tasks. Their stories are still told in books and films today.',
        mn: 'Грек домог баатруудаар дүүрэн. Тэдний олонх нь хагас хүн, хагас бурхан бөгөөд ихэвчлэн Зевсийн хүүхдүүд байв. Тэд мангасуудтай тулалдаж, урт аян замд гарч, боломжгүй мэт даалгавруудыг даван туулжээ. Тэдний түүхийг өнөөдөр ч ном, кинонд өгүүлсээр байна.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Heracles', mn: 'Геракл' },
            subtitle: { en: 'Strongest hero (Roman: Hercules)', mn: 'Хамгийн хүчтэй баатар (Ромоор: Геркулес)' },
            icon: '🦁',
            color: '#E65100',
            facts: [
              { en: 'He was a son of Zeus and a mortal woman.', mn: 'Тэр Зевс ба мөнх бус эмэгтэйн хүү байв.' },
              { en: 'He completed twelve famous labours.', mn: 'Тэр алдарт арван хоёр гавьяа байгуулсан.' },
              { en: 'He defeated the Nemean lion and the many-headed Hydra.', mn: 'Тэр Немейн арслан, олон толгойт Гидрыг ялсан.' },
            ],
          },
          {
            title: { en: 'Perseus and Medusa', mn: 'Персей ба Медуза' },
            subtitle: { en: 'The hero who beat the snake-haired monster', mn: 'Могой үстэй мангасыг ялсан баатар' },
            icon: '🐍',
            color: '#2E7D32',
            facts: [
              { en: 'Anyone who looked at Medusa turned to stone.', mn: 'Медуза руу харсан хэн боловч чулуу болдог байв.' },
              { en: 'Perseus watched her reflection in a shiny shield to avoid her gaze.', mn: 'Персей түүний харцнаас зайлсхийхийн тулд гялгар бамбай дахь тусгалыг нь харсан.' },
              { en: 'The winged horse Pegasus sprang from Medusa when she died.', mn: 'Медузаг үхэхэд түүнээс далавчит морь Пегас гарч ирсэн.' },
            ],
          },
          {
            title: { en: 'Theseus and the Minotaur', mn: 'Тесей ба Минотавр' },
            subtitle: { en: 'The hero of Athens in the Labyrinth', mn: 'Лабиринт дахь Афины баатар' },
            icon: '🐂',
            color: '#5D4037',
            facts: [
              { en: 'The Minotaur was half man, half bull.', mn: 'Минотавр хагас хүн, хагас бух байв.' },
              { en: 'It lived in the Labyrinth, a giant maze on Crete.', mn: 'Тэр Крит арал дээрх асар том төөрдөг байшин болох Лабиринтэд амьдардаг байв.' },
              { en: 'Princess Ariadne gave Theseus a ball of thread to find his way out.', mn: 'Гүнж Ариадна Тесейд гарах замаа олуулахаар бөөн утас өгсөн.' },
            ],
          },
          {
            title: { en: 'Achilles', mn: 'Ахиллес' },
            subtitle: { en: 'Greatest warrior of the Trojan War', mn: 'Тройн дайны хамгийн агуу дайчин' },
            icon: '🛡️',
            color: '#1565C0',
            facts: [
              { en: 'His mother was the sea nymph Thetis.', mn: 'Түүний ээж бол далайн дагина Фетида.' },
              { en: 'He defeated the Trojan hero Hector.', mn: 'Тэр Тройн баатар Гекторыг ялсан.' },
              { en: 'A later story says his only weak spot was his heel.', mn: 'Хожмын домогт өгүүлснээр түүний ганц сул тал нь өсгий байжээ.' },
            ],
          },
          {
            title: { en: 'Odysseus', mn: 'Одиссей' },
            subtitle: { en: 'The clever king of Ithaca', mn: 'Итакийн ухаалаг хаан' },
            icon: '⛵',
            color: '#00838F',
            facts: [
              { en: 'He came up with the idea of the wooden Trojan Horse.', mn: 'Тэр Тройн модон морины санааг гаргасан.' },
              { en: 'His journey home took ten years, told in Homer\'s "Odyssey".', mn: 'Түүний гэртээ буцах аян зам арван жил үргэлжилсэн бөгөөд үүнийг Гомерын «Одиссей»-д өгүүлдэг.' },
              { en: 'He tricked the one-eyed Cyclops Polyphemus to escape his cave.', mn: 'Тэр нэг нүдтэй Циклоп Полифемийг хуурч, агуйгаас нь зугтсан.' },
            ],
          },
          {
            title: { en: "Pandora's Jar", mn: 'Пандорагийн сав' },
            subtitle: { en: 'The first woman, in Hesiod', mn: 'Гесиодын өгүүлснээр анхны эмэгтэй' },
            icon: '🏺',
            color: '#F57F17',
            facts: [
              { en: 'The gods made Pandora and gave her a sealed jar.', mn: 'Бурхад Пандораг бүтээж, түүнд битүүмжилсэн сав өгсөн.' },
              { en: 'When she opened it, troubles flew out into the world.', mn: 'Түүнийг нээхэд зовлон гамшиг ертөнц даяар тархсан.' },
              { en: 'Only Hope stayed inside. Later retellings changed the jar into a "box".', mn: 'Дотор нь зөвхөн Итгэл найдвар үлджээ. Хожмын хүүрнэлүүдэд савыг «хайрцаг» болгон өөрчилсөн.' },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'The Trojan War, in the stories, lasted ten years.',
          mn: 'Домогт өгүүлснээр Тройн дайн арван жил үргэлжилсэн.',
        },
        {
          en: 'The Labyrinth was built by the inventor Daedalus for King Minos.',
          mn: 'Лабиринтыг зохион бүтээгч Дедал хаан Миносын захиалгаар барьсан.',
        },
        {
          en: 'The tendon above your heel is called the "Achilles tendon".',
          mn: 'Өсгийн дээрх шөрмөсийг «Ахиллесийн шөрмөс» гэж нэрлэдэг.',
        },
      ],
    },

    // 7 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'gods.in-our-world',
      order: 7,
      title: { en: 'Gods in Our World', mn: 'Бидний ертөнц дэх бурхад' },
      summary: {
        en: 'Planets, months, brands and everyday words still carry the names of ancient gods.',
        mn: 'Гариг, сар, брэнд, өдөр тутмын үгс эртний бурхдын нэрийг одоо ч тээсээр байна.',
      },
      body: {
        en: 'The old gods are all around us. In English and many other languages, the planets are named after Roman gods. Some months and words come from myths too. Even the Olympic Games began as a festival for Zeus.',
        mn: 'Эртний бурхад бидний эргэн тойронд байсаар байна. Англи болон бусад олон хэлэнд гаригуудыг Ромын бурхдын нэрээр нэрлэдэг. Зарим сар, үг ч мөн домгоос гаралтай. Олимпийн наадам хүртэл Зевсэд зориулсан баяр наадмаас эхэлсэн.',
      },
      visual: {
        kind: 'pairs',
        left: { en: 'Today', mn: 'Өнөөдөр' },
        right: { en: 'From the myths', mn: 'Домгоос' },
        items: [
          { left: { en: 'Planet Mercury', mn: 'Буд гариг (Mercury)' }, right: { en: 'Mercury', mn: 'Меркури' }, note: { en: 'The fastest planet, named after the swift messenger god', mn: 'Хамгийн хурдан гариг, хурдан элч бурхны нэрээр' }, icon: '🪐' },
          { left: { en: 'Planet Venus', mn: 'Сугар гариг (Venus)' }, right: { en: 'Venus', mn: 'Венера' }, note: { en: 'The brightest planet, named after the goddess of beauty', mn: 'Хамгийн тод гэрэлтэй гариг, гоо үзэсгэлэнгийн дарь эхийн нэрээр' }, icon: '✨' },
          { left: { en: 'Planet Mars', mn: 'Ангараг гариг (Mars)' }, right: { en: 'Mars', mn: 'Марс' }, note: { en: 'The red planet, named after the god of war', mn: 'Улаан гариг, дайны бурхны нэрээр' }, icon: '🔴' },
          { left: { en: 'Planet Jupiter', mn: 'Бархасбадь гариг (Jupiter)' }, right: { en: 'Jupiter', mn: 'Юпитер' }, note: { en: 'The biggest planet, named after the king of the gods', mn: 'Хамгийн том гариг, бурхдын хааны нэрээр' }, icon: '🟠' },
          { left: { en: 'Planet Saturn', mn: 'Санчир гариг (Saturn)' }, right: { en: 'Saturn', mn: 'Сатурн' }, note: { en: "Named after the Roman Cronus, Jupiter's father", mn: 'Юпитерийн эцэг, Ромын Кроносын нэрээр' }, icon: '🪐' },
          { left: { en: 'Planet Neptune', mn: 'Далай ван гариг (Neptune)' }, right: { en: 'Neptune', mn: 'Нептун' }, note: { en: 'The blue planet, named after the sea god', mn: 'Цэнхэр гариг, далайн бурхны нэрээр' }, icon: '🔵' },
          { left: { en: 'Dwarf planet Pluto', mn: 'Одой гариг Плутон' }, right: { en: 'Pluto', mn: 'Плутон' }, note: { en: 'Far and dark, named after the ruler of the underworld', mn: 'Алс хол, харанхуй, үхэгсдийн орны захирагчийн нэрээр' }, icon: '⚫' },
          { left: { en: 'January', mn: 'Нэгдүгээр сар (January)' }, right: { en: 'Janus', mn: 'Янус' }, note: { en: 'Two-faced Roman god of doors and beginnings', mn: 'Хаалга, эхлэлийн хоёр нүүртэй Ромын бурхан' }, icon: '🚪' },
          { left: { en: 'March', mn: 'Гуравдугаар сар (March)' }, right: { en: 'Mars', mn: 'Марс' }, note: { en: 'The month of the war god', mn: 'Дайны бурхны сар' }, icon: '📅' },
          { left: { en: 'Saturday', mn: 'Бямба гараг (Saturday)' }, right: { en: 'Saturn', mn: 'Сатурн' }, note: { en: "Saturn's day", mn: 'Сатурны өдөр' }, icon: '🗓️' },
          { left: { en: 'Nike', mn: 'Nike брэнд' }, right: { en: 'Nike', mn: 'Нике' }, note: { en: 'Greek goddess of victory', mn: 'Грекийн ялалтын дарь эх' }, icon: '👟' },
          { left: { en: 'Olympic Games', mn: 'Олимпийн наадам' }, right: { en: 'Zeus at Olympia', mn: 'Олимпиа дахь Зевс' }, note: { en: 'The ancient games honoured Zeus at Olympia', mn: 'Эртний наадмыг Олимпиад Зевсийг хүндэтгэн зохиодог байв' }, icon: '🏅' },
          { left: { en: 'panic', mn: '«panic» (сандрал)' }, right: { en: 'Pan', mn: 'Пан' }, note: { en: 'God of the wild, said to cause sudden fear', mn: 'Гэнэтийн айдас төрүүлдэг гэх зэрлэг байгалийн бурхан' }, icon: '😱' },
          { left: { en: 'cereal', mn: '«cereal» (үр тариа)' }, right: { en: 'Ceres', mn: 'Церера' }, note: { en: 'Roman goddess of grain', mn: 'Ромын тариа будааны дарь эх' }, icon: '🥣' },
          { left: { en: 'echo', mn: '«echo» (цуурай)' }, right: { en: 'Echo', mn: 'Эхо' }, note: { en: 'A nymph who could only repeat what others said', mn: 'Бусдын хэлснийг л давтаж чаддаг байсан дагина' }, icon: '🔊' },
          { left: { en: 'atlas (book of maps)', mn: 'атлас (газрын зургийн ном)' }, right: { en: 'Atlas', mn: 'Атлас' }, note: { en: 'The Titan who holds up the sky', mn: 'Тэнгэрийг өргөж буй Титан' }, icon: '🗺️' },
        ],
      },
      funFacts: [
        {
          en: "Mars's two moons, Phobos and Deimos, are named after the sons of Ares.",
          mn: 'Ангараг гаригийн хоёр дагуул Фобос, Деймос нь Аресийн хөвгүүдийн нэрээр нэрлэгдсэн.',
        },
        {
          en: "NASA's missions to the Moon were called Apollo.",
          mn: 'НАСА-гийн Сар руу нисэх хөтөлбөрийг Аполлон гэж нэрлэсэн.',
        },
        {
          en: 'Uranus is the only planet named after a Greek god, not a Roman one.',
          mn: 'Уран бол Ромын биш, Грекийн бурхны нэрээр нэрлэгдсэн цорын ганц гариг.',
        },
      ],
    },
  ],

  questions: [
    // ── gods.origins ───────────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q1', difficulty: 1,
      prompt: { en: 'According to Hesiod, what existed first of all?', mn: 'Гесиодын хэлснээр хамгийн түрүүнд юу байсан бэ?' },
      choices: [
        { en: 'Gaia', mn: 'Гая' },
        { en: 'Zeus', mn: 'Зевс' },
        { en: 'Chaos', mn: 'Хаос' },
        { en: 'Mount Olympus', mn: 'Олимп уул' },
      ],
      answer: 2,
      explanation: { en: 'Hesiod says Chaos, a vast empty gap, came first. Gaia, the Earth, came after it.', mn: 'Гесиодын хэлснээр хамгийн эхэнд асар том хоосон орон зай болох Хаос байсан. Газар дэлхий Гая түүний дараа бий болсон.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q2', difficulty: 1,
      prompt: { en: 'Who was Gaia?', mn: 'Гая хэн байсан бэ?' },
      choices: [
        { en: 'The Earth', mn: 'Газар дэлхий' },
        { en: 'The Sea', mn: 'Далай' },
        { en: 'The Moon', mn: 'Сар' },
        { en: 'The Sun', mn: 'Нар' },
      ],
      answer: 0,
      explanation: { en: 'Gaia was the Earth itself. She was the mother of Uranus and the Titans.', mn: 'Гая бол Газар дэлхий өөрөө. Тэр Уран болон Титануудын эх байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q3', difficulty: 1,
      prompt: { en: 'Why did Cronus swallow his children?', mn: 'Кронос яагаад хүүхдүүдээ залгисан бэ?' },
      choices: [
        { en: 'He was very hungry', mn: 'Маш их өлссөн байсан' },
        { en: 'He feared one of them would take his throne', mn: 'Тэдний нэг нь хаан ширээг нь булаана гэж айсан' },
        { en: 'Zeus told him to', mn: 'Зевс тэгэхийг тушаасан' },
        { en: 'To hide them from Uranus', mn: 'Тэднийг Уранаас нуухын тулд' },
      ],
      answer: 1,
      explanation: { en: 'Cronus was warned that one of his children would overthrow him, so he swallowed each baby.', mn: 'Кроност хүүхдүүдийнх нь нэг нь түүнийг түлхэн унагана гэж сануулсан тул тэр нялх хүүхэд бүрээ залгижээ.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q4', difficulty: 1,
      prompt: { en: 'What did Rhea give Cronus to swallow instead of baby Zeus?', mn: 'Рея Кроност нялх Зевсийн оронд юу залгиулсан бэ?' },
      choices: [
        { en: 'A goat', mn: 'Ямаа' },
        { en: 'A loaf of bread', mn: 'Талх' },
        { en: 'A wooden log', mn: 'Модон гуалин' },
        { en: 'A stone wrapped in blankets', mn: 'Өлгийд ороосон чулуу' },
      ],
      answer: 3,
      explanation: { en: 'Rhea wrapped a stone in baby blankets. Cronus swallowed it, and Zeus was saved.', mn: 'Рея чулууг нялхсын өлгийд ороожээ. Кронос түүнийг залгиж, Зевс аврагдсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q5', difficulty: 2,
      prompt: { en: 'On which island was baby Zeus hidden?', mn: 'Нялх Зевсийг аль арал дээр нуусан бэ?' },
      choices: [
        { en: 'Sicily', mn: 'Сицили' },
        { en: 'Crete', mn: 'Крит' },
        { en: 'Delos', mn: 'Делос' },
        { en: 'Ithaca', mn: 'Итака' },
      ],
      answer: 1,
      explanation: { en: 'Rhea hid Zeus on Crete, where he grew up in secret until he was strong enough to face Cronus.', mn: 'Рея Зевсийг Крит арал дээр нуусан бөгөөд тэр Кроностой тулах хүчтэй болтлоо нууцаар өссөн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q6', difficulty: 2,
      prompt: { en: 'What is the war between the Olympian gods and the Titans called?', mn: 'Олимпийн бурхад ба Титануудын хоорондох дайныг юу гэж нэрлэдэг вэ?' },
      choices: [
        { en: 'The Trojan War', mn: 'Тройн дайн' },
        { en: 'The Odyssey', mn: 'Одиссей' },
        { en: 'The Titanomachy', mn: 'Титаномахи' },
        { en: 'The Olympic Games', mn: 'Олимпийн наадам' },
      ],
      answer: 2,
      explanation: { en: 'The Titanomachy means "the Titan war". It lasted ten years and ended with the Olympians winning.', mn: 'Титаномахи гэдэг нь «Титануудын дайн» гэсэн утгатай. Арван жил үргэлжилж, Олимпийн бурхдын ялалтаар төгссөн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q7', difficulty: 2,
      prompt: { en: 'After the war, which part of the world did Poseidon get?', mn: 'Дайны дараа Посейдон ертөнцийн аль хэсгийг авсан бэ?' },
      choices: [
        { en: 'The sky', mn: 'Тэнгэр' },
        { en: 'The underworld', mn: 'Үхэгсдийн орон' },
        { en: 'The sun', mn: 'Нар' },
        { en: 'The sea', mn: 'Далай' },
      ],
      answer: 3,
      explanation: { en: 'Zeus took the sky, Poseidon the sea and Hades the underworld.', mn: 'Зевс тэнгэрийг, Посейдон далайг, Гадес үхэгсдийн оронг авсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.origins', key: 'gods.origins.q8', difficulty: 3,
      prompt: { en: 'Who gave Zeus his thunderbolt?', mn: 'Зевст аянгыг хэн өгсөн бэ?' },
      choices: [
        { en: 'The Cyclopes', mn: 'Циклопууд' },
        { en: 'The Muses', mn: 'Музууд' },
        { en: 'Cronus', mn: 'Кронос' },
        { en: 'Athena', mn: 'Афина' },
      ],
      answer: 0,
      explanation: { en: 'Zeus freed the one-eyed Cyclopes, and they thanked him with thunder and lightning.', mn: 'Зевс нэг нүдтэй Циклопуудыг суллахад тэд талархалдаа түүнд аянга цахилгаан бэлэглэсэн.' },
    },

    // ── gods.family-tree ───────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q1', difficulty: 1,
      prompt: { en: 'Who were the parents of Zeus?', mn: 'Зевсийн эцэг эх хэн бэ?' },
      choices: [
        { en: 'Uranus and Gaia', mn: 'Уран ба Гая' },
        { en: 'Hades and Persephone', mn: 'Гадес ба Персефона' },
        { en: 'Cronus and Rhea', mn: 'Кронос ба Рея' },
        { en: 'Apollo and Artemis', mn: 'Аполлон ба Артемис' },
      ],
      answer: 2,
      explanation: { en: 'Zeus was the youngest child of the Titans Cronus and Rhea.', mn: 'Зевс бол Титан Кронос, Рея хоёрын хамгийн бага хүүхэд.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q2', difficulty: 1,
      prompt: { en: 'Who was the wife of Zeus and queen of the gods?', mn: 'Зевсийн эхнэр, бурхдын хатан хэн бэ?' },
      choices: [
        { en: 'Athena', mn: 'Афина' },
        { en: 'Hera', mn: 'Хера' },
        { en: 'Demeter', mn: 'Деметра' },
        { en: 'Artemis', mn: 'Артемис' },
      ],
      answer: 1,
      explanation: { en: 'Hera was the queen of the gods. She was also Zeus\'s sister.', mn: 'Хера бол бурхдын хатан. Тэр мөн Зевсийн эгч дүү байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q3', difficulty: 1,
      prompt: { en: 'Which two gods were twins?', mn: 'Аль хоёр бурхан ихэр байсан бэ?' },
      choices: [
        { en: 'Apollo and Artemis', mn: 'Аполлон ба Артемис' },
        { en: 'Ares and Hephaestus', mn: 'Арес ба Хефест' },
        { en: 'Hermes and Dionysus', mn: 'Гермес ба Дионис' },
        { en: 'Athena and Hera', mn: 'Афина ба Хера' },
      ],
      answer: 0,
      explanation: { en: 'Apollo and Artemis were twins, the children of Zeus and Leto.', mn: 'Аполлон, Артемис хоёр бол Зевс, Лето хоёрын ихэр хүүхдүүд.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q4', difficulty: 2,
      prompt: { en: 'Which of these gods is a brother of Zeus?', mn: 'Эдгээрийн аль нь Зевсийн ах дүү вэ?' },
      choices: [
        { en: 'Apollo', mn: 'Аполлон' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Poseidon', mn: 'Посейдон' },
      ],
      answer: 3,
      explanation: { en: 'Poseidon and Hades are the brothers of Zeus. Apollo, Hermes and Ares are his sons.', mn: 'Посейдон, Гадес хоёр Зевсийн ах дүүс. Аполлон, Гермес, Арес нар түүний хөвгүүд.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q5', difficulty: 2,
      prompt: { en: 'Who was the mother of Persephone?', mn: 'Персефонагийн ээж хэн бэ?' },
      choices: [
        { en: 'Hera', mn: 'Хера' },
        { en: 'Demeter', mn: 'Деметра' },
        { en: 'Aphrodite', mn: 'Афродита' },
        { en: 'Gaia', mn: 'Гая' },
      ],
      answer: 1,
      explanation: { en: 'Persephone was the daughter of Demeter and Zeus.', mn: 'Персефона бол Деметра, Зевс хоёрын охин.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q6', difficulty: 2,
      prompt: { en: 'How was Athena born?', mn: 'Афина хэрхэн төрсөн бэ?' },
      choices: [
        { en: 'From the sea foam', mn: 'Далайн хөөснөөс' },
        { en: 'From a golden egg', mn: 'Алтан өндөгнөөс' },
        { en: "From Zeus's head", mn: 'Зевсийн толгойноос' },
        { en: 'From a tree', mn: 'Модноос' },
      ],
      answer: 2,
      explanation: { en: "Athena sprang out of Zeus's head, already grown up and wearing armour.", mn: 'Афина Зевсийн толгойноос аль хэдийн том болж, хуяг өмссөн байдалтай гарч ирсэн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.family-tree', key: 'gods.family-tree.q7', difficulty: 3,
      prompt: { en: 'Who was the mortal mother of Dionysus?', mn: 'Дионисын мөнх бус ээж хэн бэ?' },
      choices: [
        { en: 'Leto', mn: 'Лето' },
        { en: 'Maia', mn: 'Майя' },
        { en: 'Hera', mn: 'Хера' },
        { en: 'Semele', mn: 'Семела' },
      ],
      answer: 3,
      explanation: { en: 'Dionysus was the son of Zeus and Semele, a mortal princess of Thebes.', mn: 'Дионис бол Зевс ба Тебийн мөнх бус гүнж Семелагийн хүү.' },
    },

    // ── gods.olympians ─────────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q1', difficulty: 1,
      prompt: { en: 'Which god is the king of the gods and throws thunderbolts?', mn: 'Аль бурхан бурхдын хаан бөгөөд аянга шиддэг вэ?' },
      choices: [
        { en: 'Poseidon', mn: 'Посейдон' },
        { en: 'Hades', mn: 'Гадес' },
        { en: 'Zeus', mn: 'Зевс' },
        { en: 'Apollo', mn: 'Аполлон' },
      ],
      answer: 2,
      explanation: { en: 'Zeus ruled the sky and the gods. His weapon was the thunderbolt.', mn: 'Зевс тэнгэр болон бурхдыг захирдаг. Түүний зэвсэг нь аянга.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q2', difficulty: 1,
      prompt: { en: 'Which god carries a trident?', mn: 'Аль бурхан гурван салаат сэрээ барьдаг вэ?' },
      choices: [
        { en: 'Poseidon', mn: 'Посейдон' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Hephaestus', mn: 'Хефест' },
      ],
      answer: 0,
      explanation: { en: 'Poseidon, god of the sea, carries a trident. He could use it to stir up storms and earthquakes.', mn: 'Далайн бурхан Посейдон гурван салаат сэрээ барьдаг. Түүгээр шуурга, газар хөдлөлт үүсгэж чаддаг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q3', difficulty: 1,
      prompt: { en: "What is Athena's sacred bird?", mn: 'Афинагийн ариун шувуу юу вэ?' },
      choices: [
        { en: 'Eagle', mn: 'Бүргэд' },
        { en: 'Peacock', mn: 'Тогос' },
        { en: 'Dove', mn: 'Тагтаа' },
        { en: 'Owl', mn: 'Шар шувуу' },
      ],
      answer: 3,
      explanation: { en: 'The owl, a symbol of wisdom, belongs to Athena. The eagle is Zeus\'s and the peacock is Hera\'s.', mn: 'Мэргэн ухааны бэлгэдэл болох шар шувуу Афинагийнх. Бүргэд Зевсийнх, тогос Херагийнх.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q4', difficulty: 1,
      prompt: { en: 'Which god was the messenger with winged sandals?', mn: 'Далавчтай шаахайтай элч бурхан хэн бэ?' },
      choices: [
        { en: 'Apollo', mn: 'Аполлон' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Dionysus', mn: 'Дионис' },
      ],
      answer: 1,
      explanation: { en: 'Hermes carried messages for the gods. His winged sandals made him very fast.', mn: 'Гермес бурхдын захиасыг хүргэдэг байв. Далавчтай шаахай нь түүнийг маш хурдан болгодог.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q5', difficulty: 2,
      prompt: { en: 'Who is the goddess of the harvest and grain?', mn: 'Ургац, тариа будааны дарь эх хэн бэ?' },
      choices: [
        { en: 'Hestia', mn: 'Гестиа' },
        { en: 'Hera', mn: 'Хера' },
        { en: 'Artemis', mn: 'Артемис' },
        { en: 'Demeter', mn: 'Деметра' },
      ],
      answer: 3,
      explanation: { en: 'Demeter made the crops grow. Her Roman name, Ceres, gives us the word "cereal".', mn: 'Деметра тариаг ургуулдаг. Түүний Ром нэр Церерагаас англи хэлний «cereal» үг гаралтай.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q6', difficulty: 2,
      prompt: { en: 'Which god was the blacksmith of the gods?', mn: 'Аль бурхан бурхдын дархан байсан бэ?' },
      choices: [
        { en: 'Hephaestus', mn: 'Хефест' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Apollo', mn: 'Аполлон' },
        { en: 'Hermes', mn: 'Гермес' },
      ],
      answer: 0,
      explanation: { en: 'Hephaestus worked at his forge with hammer and fire, making weapons and treasures for the gods.', mn: 'Хефест алх, галаар дархны газартаа ажиллаж, бурхдад зэвсэг, эрдэнэс урладаг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q7', difficulty: 2,
      prompt: { en: 'Who is the goddess of love and beauty?', mn: 'Хайр, гоо үзэсгэлэнгийн дарь эх хэн бэ?' },
      choices: [
        { en: 'Athena', mn: 'Афина' },
        { en: 'Artemis', mn: 'Артемис' },
        { en: 'Aphrodite', mn: 'Афродита' },
        { en: 'Hera', mn: 'Хера' },
      ],
      answer: 2,
      explanation: { en: 'Aphrodite was the goddess of love and beauty. The Romans called her Venus.', mn: 'Афродита бол хайр, гоо үзэсгэлэнгийн дарь эх. Ромчууд түүнийг Венера гэдэг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q8', difficulty: 2,
      prompt: { en: "Where was Apollo's most famous oracle?", mn: 'Аполлоны хамгийн алдартай мэргэ төлөгч хаана байсан бэ?' },
      choices: [
        { en: 'Sparta', mn: 'Спарта' },
        { en: 'Troy', mn: 'Трой' },
        { en: 'Crete', mn: 'Крит' },
        { en: 'Delphi', mn: 'Дельфи' },
      ],
      answer: 3,
      explanation: { en: "At Delphi, Apollo's priestess gave answers about the future to people who came to ask.", mn: 'Дельфид Аполлоны тахилч бүсгүй асуухаар ирсэн хүмүүст ирээдүйн талаар хариулт өгдөг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.olympians', key: 'gods.olympians.q9', difficulty: 3,
      prompt: { en: 'What gift did Athena give Athens to win the city?', mn: 'Афина Афин хотыг авахын тулд ямар бэлэг өгсөн бэ?' },
      choices: [
        { en: 'An oak tree', mn: 'Царс мод' },
        { en: 'An olive tree', mn: 'Чидун мод' },
        { en: 'A golden horse', mn: 'Алтан морь' },
        { en: 'A spring of water', mn: 'Булаг шанд' },
      ],
      answer: 1,
      explanation: { en: 'Poseidon offered a salt-water spring, but Athena gave an olive tree. The people chose her gift.', mn: 'Посейдон давстай усны булаг санал болгосон ч Афина чидун мод өгчээ. Хотын иргэд түүний бэлгийг сонгосон.' },
    },

    // ── gods.greek-roman ───────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q1', difficulty: 1,
      prompt: { en: 'What did the Romans call Zeus?', mn: 'Ромчууд Зевсийг юу гэж нэрлэдэг байсан бэ?' },
      choices: [
        { en: 'Mars', mn: 'Марс' },
        { en: 'Neptune', mn: 'Нептун' },
        { en: 'Jupiter', mn: 'Юпитер' },
        { en: 'Pluto', mn: 'Плутон' },
      ],
      answer: 2,
      explanation: { en: 'Zeus was Jupiter to the Romans. The biggest planet is named after him.', mn: 'Ромчууд Зевсийг Юпитер гэдэг байв. Хамгийн том гаригийг түүний нэрээр нэрлэсэн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q2', difficulty: 1,
      prompt: { en: 'What is the Roman name for Aphrodite?', mn: 'Афродитагийн Ром нэр юу вэ?' },
      choices: [
        { en: 'Venus', mn: 'Венера' },
        { en: 'Diana', mn: 'Диана' },
        { en: 'Juno', mn: 'Юнона' },
        { en: 'Minerva', mn: 'Минерва' },
      ],
      answer: 0,
      explanation: { en: 'Aphrodite, goddess of love, was called Venus in Rome.', mn: 'Хайрын дарь эх Афродитаг Ромд Венера гэдэг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q3', difficulty: 1,
      prompt: { en: 'The Roman god Mars is the same as which Greek god?', mn: 'Ромын Марс бурхан Грекийн аль бурхантай адил вэ?' },
      choices: [
        { en: 'Apollo', mn: 'Аполлон' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Hades', mn: 'Гадес' },
      ],
      answer: 1,
      explanation: { en: 'Mars and Ares are both gods of war.', mn: 'Марс, Арес хоёр хоёулаа дайны бурхан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q4', difficulty: 2,
      prompt: { en: 'Neptune is the Roman name for which Greek god?', mn: 'Нептун бол Грекийн аль бурхны Ром нэр вэ?' },
      choices: [
        { en: 'Hades', mn: 'Гадес' },
        { en: 'Zeus', mn: 'Зевс' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Poseidon', mn: 'Посейдон' },
      ],
      answer: 3,
      explanation: { en: 'Neptune, like Poseidon, was the god of the sea.', mn: 'Нептун нь Посейдоны нэгэн адил далайн бурхан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q5', difficulty: 2,
      prompt: { en: 'Which Greek goddess did the Romans call Minerva?', mn: 'Ромчууд Грекийн аль дарь эхийг Минерва гэдэг байсан бэ?' },
      choices: [
        { en: 'Hera', mn: 'Хера' },
        { en: 'Artemis', mn: 'Артемис' },
        { en: 'Athena', mn: 'Афина' },
        { en: 'Demeter', mn: 'Деметра' },
      ],
      answer: 2,
      explanation: { en: 'Minerva was the Roman goddess of wisdom, matched with Athena.', mn: 'Минерва бол Афинатай адилтгагдсан Ромын мэргэн ухааны дарь эх.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q6', difficulty: 2,
      prompt: { en: 'Which god kept the same name in both Greece and Rome?', mn: 'Аль бурхан Грек, Ромд ижил нэртэй үлдсэн бэ?' },
      choices: [
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Ares', mn: 'Арес' },
        { en: 'Hephaestus', mn: 'Хефест' },
        { en: 'Apollo', mn: 'Аполлон' },
      ],
      answer: 3,
      explanation: { en: 'Apollo was Apollo in both places. Hermes became Mercury, Ares became Mars and Hephaestus became Vulcan.', mn: 'Аполлон хоёр газар хоёуланд нь Аполлон байв. Гермес Меркури, Арес Марс, Хефест Вулкан болсон.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q7', difficulty: 2,
      prompt: { en: 'What did the Romans call Hermes?', mn: 'Ромчууд Гермесийг юу гэж нэрлэдэг байсан бэ?' },
      choices: [
        { en: 'Vulcan', mn: 'Вулкан' },
        { en: 'Mercury', mn: 'Меркури' },
        { en: 'Bacchus', mn: 'Бахус' },
        { en: 'Saturn', mn: 'Сатурн' },
      ],
      answer: 1,
      explanation: { en: 'Hermes, the fast messenger, was Mercury in Rome. The fastest planet carries his name.', mn: 'Хурдан элч Гермесийг Ромд Меркури гэдэг байв. Хамгийн хурдан гариг түүний нэрийг авсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.greek-roman', key: 'gods.greek-roman.q8', difficulty: 3,
      prompt: { en: 'What is the Roman name for Hestia, goddess of the hearth?', mn: 'Гал голомтын дарь эх Гестиагийн Ром нэр юу вэ?' },
      choices: [
        { en: 'Ceres', mn: 'Церера' },
        { en: 'Diana', mn: 'Диана' },
        { en: 'Vesta', mn: 'Веста' },
        { en: 'Juno', mn: 'Юнона' },
      ],
      answer: 2,
      explanation: { en: 'Hestia was Vesta in Rome, where priestesses kept her sacred fire always burning.', mn: 'Ромд Гестиаг Веста гэдэг байсан бөгөөд тахилч бүсгүйчүүд түүний ариун галыг үргэлж асаалттай байлгадаг байв.' },
    },

    // ── gods.underworld ────────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q1', difficulty: 1,
      prompt: { en: 'Who ruled the underworld?', mn: 'Үхэгсдийн оронг хэн захирдаг байсан бэ?' },
      choices: [
        { en: 'Ares', mn: 'Арес' },
        { en: 'Cronus', mn: 'Кронос' },
        { en: 'Hades', mn: 'Гадес' },
        { en: 'Hermes', mn: 'Гермес' },
      ],
      answer: 2,
      explanation: { en: 'Hades, a brother of Zeus, ruled the land of the dead with his queen Persephone.', mn: 'Зевсийн ах дүү Гадес хатан Персефонатайгаа хамт нас барагсдын оронг захирдаг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q2', difficulty: 1,
      prompt: { en: 'How many heads does Cerberus usually have?', mn: 'Цербер ихэвчлэн хэдэн толгойтой байдаг вэ?' },
      choices: [
        { en: 'Two', mn: 'Хоёр' },
        { en: 'Three', mn: 'Гурав' },
        { en: 'Seven', mn: 'Долоо' },
        { en: 'One hundred', mn: 'Зуу' },
      ],
      answer: 1,
      explanation: { en: 'Cerberus is usually shown as a three-headed dog guarding the gate of the underworld.', mn: 'Церберийг ихэвчлэн үхэгсдийн орны үүдийг манадаг гурван толгойтой нохой гэж дүрсэлдэг.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q3', difficulty: 1,
      prompt: { en: 'Who rowed the souls of the dead across the river?', mn: 'Нас барагсдын сүнсийг хэн завиар голыг гатлуулдаг байсан бэ?' },
      choices: [
        { en: 'Charon', mn: 'Харон' },
        { en: 'Cerberus', mn: 'Цербер' },
        { en: 'Poseidon', mn: 'Посейдон' },
        { en: 'Odysseus', mn: 'Одиссей' },
      ],
      answer: 0,
      explanation: { en: 'Charon was the ferryman of the dead. He rowed souls across into the underworld.', mn: 'Харон бол нас барагсдын завьчин. Тэр сүнснүүдийг завиар үхэгсдийн оронд гатлуулдаг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q4', difficulty: 2,
      prompt: { en: 'In the myth of Persephone, why is there winter?', mn: 'Персефонагийн домогт өвөл яагаад болдог вэ?' },
      choices: [
        { en: 'Zeus is angry', mn: 'Зевс уурласан' },
        { en: 'Poseidon sends storms', mn: 'Посейдон шуурга илгээдэг' },
        { en: 'Demeter is sad while Persephone is away', mn: 'Персефонаг байхгүй үед Деметра гунигладаг' },
        { en: 'Apollo stops driving the sun', mn: 'Аполлон нарыг жолоодохоо больдог' },
      ],
      answer: 2,
      explanation: { en: 'While Persephone stays in the underworld, her mother Demeter grieves and nothing grows. When she returns, spring comes.', mn: 'Персефонаг үхэгсдийн оронд байх үед ээж Деметра нь гашуудаж, юу ч ургадаггүй. Түүнийг буцаж ирэхэд хавар болдог.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q5', difficulty: 2,
      prompt: { en: 'Which fruit did Persephone eat in the underworld?', mn: 'Персефона үхэгсдийн оронд ямар жимс идсэн бэ?' },
      choices: [
        { en: 'An apple', mn: 'Алим' },
        { en: 'Grapes', mn: 'Усан үзэм' },
        { en: 'A fig', mn: 'Инжир' },
        { en: 'Pomegranate seeds', mn: 'Анарын үр' },
      ],
      answer: 3,
      explanation: { en: 'Persephone ate pomegranate seeds. Anyone who ate food of the underworld had to return there.', mn: 'Персефона анарын үр идсэн. Үхэгсдийн орны хоол идсэн хэн боловч тийшээ буцаж очих ёстой байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q6', difficulty: 2,
      prompt: { en: 'The gods swore their most serious oaths by which river?', mn: 'Бурхад хамгийн чухал тангаргаа аль голоор өргөдөг байсан бэ?' },
      choices: [
        { en: 'The Nile', mn: 'Нил' },
        { en: 'The Styx', mn: 'Стикс' },
        { en: 'The Tiber', mn: 'Тибр' },
        { en: 'The Danube', mn: 'Дунай' },
      ],
      answer: 1,
      explanation: { en: 'An oath sworn by the river Styx could not be broken, even by a god.', mn: 'Стикс голоор өргөсөн тангаргийг бурхан ч зөрчиж чаддаггүй байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q7', difficulty: 3,
      prompt: { en: 'Why did Greeks put a coin with the dead?', mn: 'Грекчүүд яагаад нас барагсадтай хамт зоос тавьдаг байсан бэ?' },
      choices: [
        { en: 'To pay Charon the ferryman', mn: 'Завьчин Харонд төлөхийн тулд' },
        { en: 'To buy food in the underworld', mn: 'Үхэгсдийн оронд хоол худалдаж авахын тулд' },
        { en: 'To bribe Cerberus', mn: 'Церберт хахууль өгөхийн тулд' },
        { en: 'As a gift for Zeus', mn: 'Зевсэд бэлэг болгож' },
      ],
      answer: 0,
      explanation: { en: "The coin paid Charon's fare to cross the river. Without it, a soul might wander on the shore.", mn: 'Зоос нь голыг гатлах Хароны хөлс байв. Зоосгүй сүнс эрэг дээр тэнүүчилж болзошгүй.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.underworld', key: 'gods.underworld.q8', difficulty: 3,
      prompt: { en: 'What did the underworld river Lethe make souls do?', mn: 'Үхэгсдийн орны Лета гол сүнснүүдэд юу хийлгэдэг байсан бэ?' },
      choices: [
        { en: 'Sing', mn: 'Дуулах' },
        { en: 'Become young again', mn: 'Дахин залуу болох' },
        { en: 'Turn to stone', mn: 'Чулуу болох' },
        { en: 'Forget their past', mn: 'Өнгөрснөө мартах' },
      ],
      answer: 3,
      explanation: { en: 'Lethe was the river of forgetting. Souls who drank from it forgot their earlier lives.', mn: 'Лета бол мартуулах гол. Түүнээс уусан сүнснүүд өмнөх амьдралаа мартдаг байв.' },
    },

    // ── gods.heroes-monsters ───────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q1', difficulty: 1,
      prompt: { en: 'Which hero is famous for his twelve labours?', mn: 'Аль баатар арван хоёр гавьяагаараа алдартай вэ?' },
      choices: [
        { en: 'Perseus', mn: 'Персей' },
        { en: 'Heracles', mn: 'Геракл' },
        { en: 'Odysseus', mn: 'Одиссей' },
        { en: 'Theseus', mn: 'Тесей' },
      ],
      answer: 1,
      explanation: { en: 'Heracles (Hercules to the Romans) completed twelve hard labours, like beating the Nemean lion.', mn: 'Геракл (Ромоор Геркулес) Немейн арсланг ялах зэрэг арван хоёр хүнд гавьяа байгуулсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q2', difficulty: 1,
      prompt: { en: 'What happened to anyone who looked at Medusa?', mn: 'Медуза руу харсан хүнд юу тохиолддог байсан бэ?' },
      choices: [
        { en: 'They turned to ice', mn: 'Мөс болдог' },
        { en: 'They fell asleep', mn: 'Унтдаг' },
        { en: 'They turned to stone', mn: 'Чулуу болдог' },
        { en: 'They became invisible', mn: 'Үл үзэгдэх болдог' },
      ],
      answer: 2,
      explanation: { en: "Medusa's gaze turned people to stone, so Perseus looked only at her reflection.", mn: 'Медузагийн харц хүнийг чулуу болгодог тул Персей зөвхөн түүний тусгалыг харсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q3', difficulty: 1,
      prompt: { en: 'Which monster did Theseus fight in the Labyrinth?', mn: 'Тесей Лабиринтэд ямар мангастай тулалдсан бэ?' },
      choices: [
        { en: 'The Hydra', mn: 'Гидра' },
        { en: 'The Cyclops', mn: 'Циклоп' },
        { en: 'Medusa', mn: 'Медуза' },
        { en: 'The Minotaur', mn: 'Минотавр' },
      ],
      answer: 3,
      explanation: { en: 'The Minotaur, half man and half bull, lived in the Labyrinth on Crete until Theseus defeated it.', mn: 'Хагас хүн, хагас бух Минотавр Тесей ялах хүртэл Крит арлын Лабиринтэд амьдарч байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q4', difficulty: 2,
      prompt: { en: 'How did Theseus find his way out of the Labyrinth?', mn: 'Тесей Лабиринтаас гарах замаа хэрхэн олсон бэ?' },
      choices: [
        { en: 'He followed a ball of thread', mn: 'Бөөн утсыг даган гарсан' },
        { en: 'He used a map', mn: 'Газрын зураг ашигласан' },
        { en: 'A bird showed him', mn: 'Шувуу замыг нь заасан' },
        { en: 'He broke through the walls', mn: 'Ханыг нурааж гарсан' },
      ],
      answer: 0,
      explanation: { en: 'Princess Ariadne gave him thread. He unrolled it on the way in and followed it back out.', mn: 'Гүнж Ариадна түүнд утас өгчээ. Тэр орохдоо утсаа задалж, түүнийгээ даган буцаж гарсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q5', difficulty: 2,
      prompt: { en: 'In the famous story, where was Achilles\'s only weak spot?', mn: 'Алдарт домогт Ахиллесийн ганц сул тал хаана байсан бэ?' },
      choices: [
        { en: 'His hand', mn: 'Гар' },
        { en: 'His eye', mn: 'Нүд' },
        { en: 'His heel', mn: 'Өсгий' },
        { en: 'His neck', mn: 'Хүзүү' },
      ],
      answer: 2,
      explanation: { en: 'A later story says his mother dipped him in the Styx, holding him by the heel. That is why we say "Achilles heel".', mn: 'Хожмын домогт ээж нь түүнийг өсгийнөөс нь барин Стикс голд дүрсэн гэдэг. Тиймээс «Ахиллесийн өсгий» гэсэн хэллэг бий.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q6', difficulty: 2,
      prompt: { en: 'Whose idea was the wooden Trojan Horse?', mn: 'Тройн модон морь хэний санаа байсан бэ?' },
      choices: [
        { en: 'Achilles', mn: 'Ахиллес' },
        { en: 'Hector', mn: 'Гектор' },
        { en: 'Paris', mn: 'Парис' },
        { en: 'Odysseus', mn: 'Одиссей' },
      ],
      answer: 3,
      explanation: { en: 'Clever Odysseus thought of hiding soldiers inside a giant wooden horse to get into Troy.', mn: 'Ухаалаг Одиссей Тройд нэвтрэхийн тулд аварга модон морины дотор цэргүүдийг нуух санааг гаргасан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q7', difficulty: 2,
      prompt: { en: "What stayed inside Pandora's jar?", mn: 'Пандорагийн саванд юу үлдсэн бэ?' },
      choices: [
        { en: 'Gold', mn: 'Алт' },
        { en: 'Hope', mn: 'Итгэл найдвар' },
        { en: 'A snake', mn: 'Могой' },
        { en: 'Fire', mn: 'Гал' },
      ],
      answer: 1,
      explanation: { en: 'Troubles escaped into the world, but Hope stayed inside the jar.', mn: 'Зовлон гамшиг ертөнцөд тархсан ч Итгэл найдвар саван дотроо үлджээ.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q8', difficulty: 3,
      prompt: { en: 'Which winged horse sprang from Medusa?', mn: 'Медузагаас ямар далавчит морь гарч ирсэн бэ?' },
      choices: [
        { en: 'Pegasus', mn: 'Пегас' },
        { en: 'Cerberus', mn: 'Цербер' },
        { en: 'Chiron', mn: 'Хирон' },
        { en: 'Bucephalus', mn: 'Буцефал' },
      ],
      answer: 0,
      explanation: { en: 'When Perseus cut off Medusa\'s head, the winged horse Pegasus sprang out.', mn: 'Персей Медузагийн толгойг тайрахад далавчит морь Пегас гарч ирсэн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.heroes-monsters', key: 'gods.heroes-monsters.q9', difficulty: 3,
      prompt: { en: 'How long did Odysseus take to get home after the Trojan War?', mn: 'Тройн дайны дараа Одиссей гэртээ хэдэн жилийн дараа хүрсэн бэ?' },
      choices: [
        { en: 'One year', mn: 'Нэг жил' },
        { en: 'Three years', mn: 'Гурван жил' },
        { en: 'Ten years', mn: 'Арван жил' },
        { en: 'Fifty years', mn: 'Тавин жил' },
      ],
      answer: 2,
      explanation: { en: "Odysseus's journey home to Ithaca took ten years, as told in Homer's Odyssey.", mn: 'Гомерын «Одиссей»-д өгүүлснээр Одиссейн Итака руу буцах аян зам арван жил үргэлжилсэн.' },
    },

    // ── gods.in-our-world ──────────────────────────────────────────
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q1', difficulty: 1,
      prompt: { en: 'The red planet is named after the Roman god of war. Which planet is it?', mn: 'Улаан гаригийг Ромын дайны бурхны нэрээр нэрлэсэн. Аль гариг вэ?' },
      choices: [
        { en: 'Jupiter', mn: 'Бархасбадь (Jupiter)' },
        { en: 'Mars', mn: 'Ангараг (Mars)' },
        { en: 'Venus', mn: 'Сугар (Venus)' },
        { en: 'Saturn', mn: 'Санчир (Saturn)' },
      ],
      answer: 1,
      explanation: { en: 'Mars looks red, like blood and war, so it was named after Mars, the god of war.', mn: 'Ангараг гариг цус, дайн мэт улаан харагддаг тул дайны бурхан Марсын нэрээр нэрлэгдсэн.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q2', difficulty: 1,
      prompt: { en: 'The biggest planet is named after the king of the gods. Which one?', mn: 'Хамгийн том гаригийг бурхдын хааны нэрээр нэрлэсэн. Аль нь вэ?' },
      choices: [
        { en: 'Saturn', mn: 'Санчир (Saturn)' },
        { en: 'Neptune', mn: 'Далай ван (Neptune)' },
        { en: 'Jupiter', mn: 'Бархасбадь (Jupiter)' },
        { en: 'Mars', mn: 'Ангараг (Mars)' },
      ],
      answer: 2,
      explanation: { en: 'Jupiter, the largest planet, carries the Roman name of Zeus, king of the gods.', mn: 'Хамгийн том гариг Бархасбадь нь бурхдын хаан Зевсийн Ром нэр Юпитерийг авсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q3', difficulty: 1,
      prompt: { en: 'The sports brand Nike is named after…', mn: 'Nike спорт брэнд … нэрээр нэрлэгдсэн.' },
      choices: [
        { en: 'The Greek goddess of victory', mn: 'Грекийн ялалтын дарь эх' },
        { en: 'A river in Greece', mn: 'Грекийн нэгэн гол' },
        { en: 'A famous runner', mn: 'Алдартай гүйгч' },
        { en: 'A Greek mountain', mn: 'Грекийн нэгэн уул' },
      ],
      answer: 0,
      explanation: { en: 'Nike was the winged Greek goddess of victory. The Romans called her Victoria.', mn: 'Нике бол Грекийн далавчит ялалтын дарь эх. Ромчууд түүнийг Виктория гэдэг байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q4', difficulty: 2,
      prompt: { en: 'The month January is named after which Roman god?', mn: 'Нэгдүгээр сарын англи нэр January Ромын аль бурхны нэрээс гаралтай вэ?' },
      choices: [
        { en: 'Juno', mn: 'Юнона' },
        { en: 'Jupiter', mn: 'Юпитер' },
        { en: 'Mars', mn: 'Марс' },
        { en: 'Janus', mn: 'Янус' },
      ],
      answer: 3,
      explanation: { en: 'Janus was the two-faced god of doors and beginnings. He looks back at the old year and forward to the new one.', mn: 'Янус бол хаалга, эхлэлийн хоёр нүүртэй бурхан. Тэр хуучин он руу эргэн харж, шинэ он руу урагш хардаг.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q5', difficulty: 2,
      prompt: { en: 'The word "cereal" comes from which Roman goddess?', mn: 'Англи хэлний «cereal» (үр тариа) гэдэг үг Ромын аль дарь эхээс гаралтай вэ?' },
      choices: [
        { en: 'Vesta', mn: 'Веста' },
        { en: 'Venus', mn: 'Венера' },
        { en: 'Ceres', mn: 'Церера' },
        { en: 'Diana', mn: 'Диана' },
      ],
      answer: 2,
      explanation: { en: 'Ceres, the Roman Demeter, was the goddess of grain, so grain foods are called "cereal".', mn: 'Ромын Деметра болох Церера бол тариа будааны дарь эх тул үр тарианы хүнсийг «cereal» гэдэг.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q6', difficulty: 2,
      prompt: { en: 'Which planet is named after the Roman god of the sea?', mn: 'Аль гаригийг Ромын далайн бурхны нэрээр нэрлэсэн бэ?' },
      choices: [
        { en: 'Uranus', mn: 'Тэнгэрийн ван (Uranus)' },
        { en: 'Neptune', mn: 'Далай ван (Neptune)' },
        { en: 'Saturn', mn: 'Санчир (Saturn)' },
        { en: 'Mercury', mn: 'Буд (Mercury)' },
      ],
      answer: 1,
      explanation: { en: 'Neptune, the blue planet, is named after the Roman sea god, who was Poseidon to the Greeks.', mn: 'Цэнхэр гариг Далай ван нь Грекчүүдийн Посейдон болох Ромын далайн бурхан Нептуны нэрийг авсан.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q7', difficulty: 2,
      prompt: { en: 'The ancient Olympic Games were held in honour of which god?', mn: 'Эртний Олимпийн наадмыг аль бурхныг хүндэтгэн зохиодог байсан бэ?' },
      choices: [
        { en: 'Apollo', mn: 'Аполлон' },
        { en: 'Zeus', mn: 'Зевс' },
        { en: 'Athena', mn: 'Афина' },
        { en: 'Poseidon', mn: 'Посейдон' },
      ],
      answer: 1,
      explanation: { en: 'The ancient games took place at Olympia, home of a great temple of Zeus.', mn: 'Эртний наадам Зевсийн агуу сүм бүхий Олимпиа хотод болдог байв.' },
    },
    {
      topicSlug: T, lessonKey: 'gods.in-our-world', key: 'gods.in-our-world.q8', difficulty: 3,
      prompt: { en: 'The English word "panic" comes from which god?', mn: 'Англи хэлний «panic» (сандрал) гэдэг үг аль бурхнаас гаралтай вэ?' },
      choices: [
        { en: 'Ares', mn: 'Арес' },
        { en: 'Hades', mn: 'Гадес' },
        { en: 'Hermes', mn: 'Гермес' },
        { en: 'Pan', mn: 'Пан' },
      ],
      answer: 3,
      explanation: { en: 'Pan, the goat-legged god of the wild, was said to fill people with sudden fear. That fear was called "panic".', mn: 'Ямааны хөлтэй зэрлэг байгалийн бурхан Пан хүмүүст гэнэтийн айдас төрүүлдэг гэдэг. Тэр айдсыг «panic» гэж нэрлэжээ.' },
    },
  ],
};
