import type { SeedBundle } from '../types';

// World geography — easy facts. Figures are rounded, well-established values
// (populations ≈ UN 2024 estimates). Keys are stable: never rename them.

const T = 'geography';

export const geography: SeedBundle = {
  topic: {
    slug: T,
    order: 2,
    color: '#00A76F',
    icon: 'solar:globe-bold-duotone',
    title: { en: 'Geography', mn: 'Газарзүй' },
    tagline: { en: 'Our planet in pictures and numbers', mn: 'Манай гараг зураг, тоогоор' },
    description: {
      en: 'Continents, oceans, rivers, mountains and countries — the big facts about our world, shown as simple charts.',
      mn: 'Тив, далай, гол мөрөн, уул, улс орнууд — дэлхийн тухай гол баримтуудыг энгийн графикаар харуулна.',
    },
  },

  lessons: [
    // 1 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.continents-area',
      order: 1,
      title: { en: 'The seven continents', mn: 'Долоон тив' },
      summary: {
        en: 'Asia is the biggest continent and Australia with Oceania is the smallest.',
        mn: 'Ази бол хамгийн том тив, харин Австрали ба Далайн орнууд хамгийн жижиг нь.',
      },
      body: {
        en: 'Land covers only about 29% of Earth’s surface. Most of that land is split into seven continents. Asia alone is about 44.6 million km² — almost a third of all land. Europe and Australia with Oceania are the smallest.',
        mn: 'Хуурай газар дэлхийн гадаргын ердөө 29 орчим хувийг эзэлдэг. Энэ газрын ихэнх нь долоон тивд хуваагддаг. Зөвхөн Ази л гэхэд ойролцоогоор 44.6 сая км² буюу нийт хуурай газрын бараг гуравны нэг юм. Европ болон Австрали ба Далайн орнууд хамгийн жижиг тивүүд.',
      },
      visual: {
        kind: 'bar',
        horizontal: true,
        unit: { en: 'million km²', mn: 'сая км²' },
        items: [
          { label: { en: 'Asia', mn: 'Ази' }, value: 44.6 },
          { label: { en: 'Africa', mn: 'Африк' }, value: 30.4 },
          { label: { en: 'North America', mn: 'Хойд Америк' }, value: 24.7 },
          { label: { en: 'South America', mn: 'Өмнөд Америк' }, value: 17.8 },
          {
            label: { en: 'Antarctica', mn: 'Антарктид' },
            value: 14.2,
            note: { en: 'Almost all covered by ice', mn: 'Бараг бүхэлдээ мөсөөр бүрхэгдсэн' },
          },
          { label: { en: 'Europe', mn: 'Европ' }, value: 10.2 },
          {
            label: { en: 'Australia & Oceania', mn: 'Австрали ба Далайн орнууд' },
            value: 8.5,
            note: {
              en: 'Australia itself is about 7.7 million km²',
              mn: 'Австрали өөрөө ойролцоогоор 7.7 сая км²',
            },
          },
        ],
      },
      funFacts: [
        {
          en: 'About 71% of Earth’s surface is water, and only about 29% is land.',
          mn: 'Дэлхийн гадаргын 71 орчим хувь нь ус, ердөө 29 орчим хувь нь хуурай газар.',
        },
        {
          en: 'Africa is so big that the USA, China and India together could fit inside it.',
          mn: 'Африк маш том тул АНУ, Хятад, Энэтхэг гурвыг хамтад нь багтааж чадна.',
        },
        {
          en: 'Antarctica is bigger than Europe, but nobody lives there all year.',
          mn: 'Антарктид Европоос том боловч тэнд жилийн турш байнга амьдардаг хүн байхгүй.',
        },
      ],
    },

    // 2 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.continents-people',
      order: 2,
      title: { en: 'Where people live', mn: 'Хүмүүс хаана амьдардаг вэ' },
      summary: {
        en: 'About six in ten people on Earth live in Asia.',
        mn: 'Дэлхийн 10 хүн тутмын 6 орчим нь Азид амьдардаг.',
      },
      body: {
        en: 'In 2024 there were about 8.2 billion people in the world. Asia is home to about 4.75 billion of them. Africa comes second with about 1.5 billion and is growing the fastest. Antarctica has no permanent residents at all.',
        mn: '2024 онд дэлхийд ойролцоогоор 8.2 тэрбум хүн амьдарч байв. Тэдний 4.75 орчим тэрбум нь Азид амьдардаг. Ойролцоогоор 1.5 тэрбум хүнтэй Африк хоёрдугаарт орох бөгөөд хамгийн хурдан өсөж байна. Антарктидад байнга оршин суугч огт байхгүй.',
      },
      visual: {
        kind: 'donut',
        unit: { en: 'million people', mn: 'сая хүн' },
        items: [
          { label: { en: 'Asia', mn: 'Ази' }, value: 4750 },
          { label: { en: 'Africa', mn: 'Африк' }, value: 1500 },
          { label: { en: 'Europe', mn: 'Европ' }, value: 745 },
          {
            label: { en: 'North America', mn: 'Хойд Америк' },
            value: 610,
            note: {
              en: 'Includes Central America and the Caribbean',
              mn: 'Төв Америк, Карибын орнуудыг оруулсан',
            },
          },
          { label: { en: 'South America', mn: 'Өмнөд Америк' }, value: 435 },
          { label: { en: 'Australia & Oceania', mn: 'Австрали ба Далайн орнууд' }, value: 45 },
        ],
      },
      funFacts: [
        {
          en: 'India (about 1.44 billion) passed China (about 1.41 billion) as the most populous country in 2023.',
          mn: 'Энэтхэг (ойролцоогоор 1.44 тэрбум) 2023 онд Хятадыг (ойролцоогоор 1.41 тэрбум) гүйцэж, хамгийн олон хүн амтай улс болсон.',
        },
        {
          en: 'India and China together hold more than a third of all people on Earth.',
          mn: 'Энэтхэг, Хятад хоёр л дэлхийн нийт хүн амын гуравны нэгээс илүүг эзэлдэг.',
        },
        {
          en: 'Antarctica has only visiting scientists — a few thousand in summer, far fewer in winter.',
          mn: 'Антарктидад зөвхөн түр очдог эрдэмтэд байдаг — зундаа хэдэн мянга, өвөлдөө түүнээс хамаагүй цөөн.',
        },
      ],
    },

    // 3 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.oceans',
      order: 3,
      title: { en: 'The five oceans', mn: 'Таван далай' },
      summary: {
        en: 'The Pacific is by far the largest ocean, and the Arctic is the smallest.',
        mn: 'Номхон далай бол хамгийн том далай, Хойд мөсөн далай хамгийн жижиг нь.',
      },
      body: {
        en: 'All the oceans are connected, but we give them five names. The Pacific Ocean covers about 169 million km² — more than all the land on Earth put together. The Atlantic is second. The Southern Ocean circles Antarctica, and the Arctic Ocean lies around the North Pole.',
        mn: 'Бүх далай хоорондоо холбоотой ч бид тэдгээрийг таван нэрээр нэрлэдэг. Номхон далай ойролцоогоор 169 сая км² талбайтай — дэлхийн бүх хуурай газрыг нийлүүлснээс ч том. Атлантын далай хоёрдугаарт орно. Өмнөд далай Антарктидыг тойрдог бол Хойд мөсөн далай Хойд туйлыг тойрон оршдог.',
      },
      visual: {
        kind: 'donut',
        unit: { en: 'million km²', mn: 'сая км²' },
        items: [
          { label: { en: 'Pacific Ocean', mn: 'Номхон далай' }, value: 168.7 },
          { label: { en: 'Atlantic Ocean', mn: 'Атлантын далай' }, value: 85.1 },
          { label: { en: 'Indian Ocean', mn: 'Энэтхэгийн далай' }, value: 70.6 },
          { label: { en: 'Southern Ocean', mn: 'Өмнөд далай' }, value: 22.0 },
          { label: { en: 'Arctic Ocean', mn: 'Хойд мөсөн далай' }, value: 15.6 },
        ],
      },
      funFacts: [
        {
          en: 'The deepest place in the ocean is in the Mariana Trench in the Pacific — about 10,935 m deep.',
          mn: 'Далайн хамгийн гүн цэг нь Номхон далай дахь Марианы сувагт байдаг — ойролцоогоор 10,935 м гүн.',
        },
        {
          en: 'Mount Everest would fit inside the Mariana Trench with more than 2 km of water above its top.',
          mn: 'Эверестийг Марианы сувагт хийвэл оройн дээр нь 2 гаруй км ус үлдэнэ.',
        },
        {
          en: 'The Pacific Ocean is bigger than all of Earth’s land combined.',
          mn: 'Номхон далай дэлхийн бүх хуурай газрыг нийлүүлснээс том.',
        },
      ],
    },

    // 4 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.rivers',
      order: 4,
      title: { en: 'The longest rivers', mn: 'Хамгийн урт гол мөрөн' },
      summary: {
        en: 'The Nile and the Amazon are the two longest rivers in the world.',
        mn: 'Нил мөрөн, Амазон хоёр бол дэлхийн хамгийн урт хоёр гол.',
      },
      body: {
        en: 'The Nile in Africa is about 6,650 km long and is traditionally listed as the longest river. The Amazon in South America is about 6,400 km long and carries far more water than any other river. The Yangtze in China is the longest river in Asia. Measuring a river is hard, because it is not always clear where it begins.',
        mn: 'Африкийн Нил мөрөн ойролцоогоор 6,650 км урт бөгөөд уламжлал ёсоор хамгийн урт гол гэж тооцогддог. Өмнөд Америкийн Амазон ойролцоогоор 6,400 км урт ба бусад бүх голоос хамаагүй их ус урсгадаг. Хятадын Янцзы мөрөн Азийн хамгийн урт гол. Голын эх хаанаас эхэлдэг нь үргэлж тодорхой биш тул голын уртыг хэмжих амаргүй.',
      },
      visual: {
        kind: 'bar',
        unit: { en: 'km', mn: 'км' },
        items: [
          {
            label: { en: 'Nile', mn: 'Нил мөрөн' },
            value: 6650,
            note: { en: 'Africa · traditionally listed as longest', mn: 'Африк · уламжлал ёсоор хамгийн урт' },
          },
          {
            label: { en: 'Amazon', mn: 'Амазон' },
            value: 6400,
            note: {
              en: 'South America · some measurements make it longer than the Nile',
              mn: 'Өмнөд Америк · зарим хэмжилтээр Нилээс урт гардаг',
            },
          },
          { label: { en: 'Yangtze', mn: 'Янцзы' }, value: 6300, note: { en: 'Asia', mn: 'Ази' } },
          {
            label: { en: 'Mississippi–Missouri', mn: 'Миссисипи–Миссури' },
            value: 6275,
            note: { en: 'North America', mn: 'Хойд Америк' },
          },
          {
            label: { en: 'Yenisei–Angara–Selenge', mn: 'Енисей–Ангар–Сэлэнгэ' },
            value: 5539,
            note: { en: 'Asia · starts in Mongolia', mn: 'Ази · Монголоос эх авдаг' },
          },
          { label: { en: 'Yellow River', mn: 'Хуанхэ (Шар мөрөн)' }, value: 5464, note: { en: 'Asia', mn: 'Ази' } },
          { label: { en: 'Ob–Irtysh', mn: 'Обь–Эрчис' }, value: 5410, note: { en: 'Asia', mn: 'Ази' } },
          { label: { en: 'Paraná', mn: 'Парана' }, value: 4880, note: { en: 'South America', mn: 'Өмнөд Америк' } },
        ],
      },
      funFacts: [
        {
          en: 'Some scientists measure the Amazon from a different source and find it slightly longer than the Nile.',
          mn: 'Зарим эрдэмтэн Амазоныг өөр эхээс хэмжиж, Нилээс арай урт гэж үздэг.',
        },
        {
          en: 'About one fifth of all river water that reaches the oceans comes from the Amazon.',
          mn: 'Далайд цутгадаг бүх голын усны тавны нэг орчим нь Амазоноос ирдэг.',
        },
        {
          en: 'Mongolia’s Selenge River flows into Lake Baikal and is part of the Yenisei river system.',
          mn: 'Монголын Сэлэнгэ мөрөн Байгаль нуурт цутгадаг бөгөөд Енисейн голын системийн нэг хэсэг.',
        },
      ],
    },

    // 5 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.mountains',
      order: 5,
      title: { en: 'The highest mountains', mn: 'Хамгийн өндөр уулс' },
      summary: {
        en: 'All of the world’s highest peaks are in the Himalaya and Karakoram ranges of Asia.',
        mn: 'Дэлхийн хамгийн өндөр оргилууд бүгд Азийн Гималай, Каракорумын нуруунд байдаг.',
      },
      body: {
        en: 'Mount Everest is the highest mountain on Earth at about 8,849 m. It stands on the border of Nepal and China. K2 is second at about 8,611 m. There are exactly 14 mountains taller than 8,000 m, and all of them are in Asia.',
        mn: 'Эверест (Жомолунгма) уул ойролцоогоор 8,849 м өндөртэй, дэлхийн хамгийн өндөр уул. Энэ нь Балба, Хятадын хил дээр оршдог. Хоёрдугаарт ойролцоогоор 8,611 м өндөр К2 орно. 8,000 м-ээс өндөр яг 14 уул байдаг бөгөөд бүгд Азид бий.',
      },
      visual: {
        kind: 'bar',
        unit: { en: 'm', mn: 'м' },
        items: [
          {
            label: { en: 'Everest', mn: 'Эверест (Жомолунгма)' },
            value: 8849,
            note: { en: 'Nepal / China', mn: 'Балба / Хятад' },
          },
          { label: { en: 'K2', mn: 'К2 (Чогори)' }, value: 8611, note: { en: 'Pakistan / China', mn: 'Пакистан / Хятад' } },
          { label: { en: 'Kangchenjunga', mn: 'Канченжунга' }, value: 8586, note: { en: 'Nepal / India', mn: 'Балба / Энэтхэг' } },
          { label: { en: 'Lhotse', mn: 'Лхоцзе' }, value: 8516, note: { en: 'Nepal / China', mn: 'Балба / Хятад' } },
          { label: { en: 'Makalu', mn: 'Макалу' }, value: 8485, note: { en: 'Nepal / China', mn: 'Балба / Хятад' } },
          { label: { en: 'Cho Oyu', mn: 'Чо-Ойю' }, value: 8188, note: { en: 'Nepal / China', mn: 'Балба / Хятад' } },
          { label: { en: 'Dhaulagiri', mn: 'Даулагири' }, value: 8167, note: { en: 'Nepal', mn: 'Балба' } },
          { label: { en: 'Manaslu', mn: 'Манаслу' }, value: 8163, note: { en: 'Nepal', mn: 'Балба' } },
        ],
      },
      funFacts: [
        {
          en: 'Highest on each continent: Everest (Asia), Aconcagua 6,961 m (South America), Denali 6,190 m (North America), Kilimanjaro 5,895 m (Africa), Elbrus 5,642 m (Europe), Vinson 4,892 m (Antarctica).',
          mn: 'Тив бүрийн хамгийн өндөр оргил: Эверест (Ази), Аконкагуа 6,961 м (Өмнөд Америк), Денали 6,190 м (Хойд Америк), Килиманжаро 5,895 м (Африк), Эльбрус 5,642 м (Европ), Винсон 4,892 м (Антарктид).',
        },
        {
          en: 'In Oceania the highest peak is Puncak Jaya (about 4,884 m) on New Guinea; on mainland Australia it is Mount Kosciuszko (about 2,228 m).',
          mn: 'Далайн орнуудын хамгийн өндөр оргил нь Шинэ Гвиней арал дээрх Пунчак Жая (ойролцоогоор 4,884 м), харин эх газрын Австралид Костюшко уул (ойролцоогоор 2,228 м).',
        },
        {
          en: 'People first reached the top of Everest in 1953.',
          mn: 'Хүн анх 1953 онд Эверестийн оройд гарсан.',
        },
      ],
    },

    // 6 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.countries',
      order: 6,
      title: { en: 'The largest countries', mn: 'Хамгийн том улсууд' },
      summary: {
        en: 'Russia is the largest country — almost twice the size of the next one, Canada.',
        mn: 'Орос бол хамгийн том улс — дараагийн том улс болох Канадаас бараг хоёр дахин том.',
      },
      body: {
        en: 'Russia covers about 17.1 million km² and spans two continents, Europe and Asia. Canada, the USA and China each have nearly 10 million km². Kazakhstan is the largest country with no coastline on the open ocean, and Mongolia, at about 1.56 million km², is the second largest.',
        mn: 'Орос ойролцоогоор 17.1 сая км² нутагтай бөгөөд Европ, Ази хоёр тивд оршдог. Канад, АНУ, Хятад тус бүр бараг 10 сая км² нутагтай. Далайд гарцгүй хамгийн том улс бол Казахстан, харин ойролцоогоор 1.56 сая км² нутагтай Монгол хоёрдугаарт ордог.',
      },
      visual: {
        kind: 'bar',
        horizontal: true,
        unit: { en: 'million km²', mn: 'сая км²' },
        items: [
          { label: { en: 'Russia', mn: 'Орос' }, value: 17.1 },
          { label: { en: 'Canada', mn: 'Канад' }, value: 10.0 },
          {
            label: { en: 'USA', mn: 'АНУ' },
            value: 9.8,
            note: {
              en: 'USA and China are both about 9.6–9.8 million km²; their order depends on how water is counted',
              mn: 'АНУ, Хятад хоёр аль аль нь 9.6–9.8 сая км² орчим; дараалал нь усан талбайг хэрхэн тооцохоос хамаарна',
            },
          },
          { label: { en: 'China', mn: 'Хятад' }, value: 9.6 },
          { label: { en: 'Brazil', mn: 'Бразил' }, value: 8.5 },
          { label: { en: 'Australia', mn: 'Австрали' }, value: 7.7 },
          { label: { en: 'India', mn: 'Энэтхэг' }, value: 3.3 },
          { label: { en: 'Argentina', mn: 'Аргентин' }, value: 2.8 },
          {
            label: { en: 'Kazakhstan', mn: 'Казахстан' },
            value: 2.7,
            note: { en: 'Largest landlocked country', mn: 'Далайд гарцгүй хамгийн том улс' },
          },
          {
            label: { en: 'Algeria', mn: 'Алжир' },
            value: 2.4,
            note: { en: 'Largest country in Africa', mn: 'Африкийн хамгийн том улс' },
          },
        ],
      },
      funFacts: [
        {
          en: 'Mongolia is about 1.56 million km² — bigger than France, Germany, Spain and Italy put together.',
          mn: 'Монгол ойролцоогоор 1.56 сая км² нутагтай — Франц, Герман, Испани, Итали дөрвийг нийлүүлснээс том.',
        },
        {
          en: 'Russia stretches across 11 time zones.',
          mn: 'Орос 11 цагийн бүсийг хамардаг.',
        },
        {
          en: 'Mongolia borders only two countries: Russia and China.',
          mn: 'Монгол зөвхөн хоёр улстай хиллэдэг: Орос, Хятад.',
        },
      ],
    },

    // 7 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.capitals',
      order: 7,
      title: { en: 'Countries and capitals', mn: 'Улс ба нийслэл' },
      summary: {
        en: 'The biggest city is not always the capital — match each country with its capital.',
        mn: 'Хамгийн том хот нь үргэлж нийслэл байдаггүй — улс бүрийг нийслэлтэй нь тааруулаарай.',
      },
      body: {
        en: 'A capital is the city where a country’s government works. Often it is the largest city, like Tokyo or Cairo. But sometimes it is not: Australia’s capital is Canberra, not Sydney, and Turkey’s is Ankara, not Istanbul. Some countries even built a new capital, like Brazil did with Brasília.',
        mn: 'Нийслэл бол тухайн улсын засгийн газар ажилладаг хот. Ихэнхдээ энэ нь хамгийн том хот байдаг, жишээ нь Токио, Каир. Гэхдээ үргэлж тийм биш: Австралийн нийслэл Сидней биш Канберра, Туркийн нийслэл Истанбул биш Анкара. Зарим улс Бразилын Бразилиа шиг шинэ нийслэл хот барьсан байдаг.',
      },
      visual: {
        kind: 'pairs',
        left: { en: 'Country', mn: 'Улс' },
        right: { en: 'Capital', mn: 'Нийслэл' },
        items: [
          { left: { en: 'Mongolia', mn: 'Монгол' }, right: { en: 'Ulaanbaatar', mn: 'Улаанбаатар' }, icon: '🇲🇳' },
          { left: { en: 'Japan', mn: 'Япон' }, right: { en: 'Tokyo', mn: 'Токио' }, icon: '🇯🇵' },
          { left: { en: 'China', mn: 'Хятад' }, right: { en: 'Beijing', mn: 'Бээжин' }, icon: '🇨🇳' },
          { left: { en: 'South Korea', mn: 'Өмнөд Солонгос' }, right: { en: 'Seoul', mn: 'Сөүл' }, icon: '🇰🇷' },
          { left: { en: 'India', mn: 'Энэтхэг' }, right: { en: 'New Delhi', mn: 'Шинэ Дели' }, icon: '🇮🇳' },
          {
            left: { en: 'Kazakhstan', mn: 'Казахстан' },
            right: { en: 'Astana', mn: 'Астана' },
            icon: '🇰🇿',
            note: { en: 'Not Almaty, the largest city', mn: 'Хамгийн том хот Алматы биш' },
          },
          { left: { en: 'Russia', mn: 'Орос' }, right: { en: 'Moscow', mn: 'Москва' }, icon: '🇷🇺' },
          {
            left: { en: 'Turkey', mn: 'Турк' },
            right: { en: 'Ankara', mn: 'Анкара' },
            icon: '🇹🇷',
            note: { en: 'Not Istanbul', mn: 'Истанбул биш' },
          },
          { left: { en: 'Egypt', mn: 'Египет' }, right: { en: 'Cairo', mn: 'Каир' }, icon: '🇪🇬' },
          { left: { en: 'France', mn: 'Франц' }, right: { en: 'Paris', mn: 'Парис' }, icon: '🇫🇷' },
          { left: { en: 'Germany', mn: 'Герман' }, right: { en: 'Berlin', mn: 'Берлин' }, icon: '🇩🇪' },
          { left: { en: 'United Kingdom', mn: 'Их Британи' }, right: { en: 'London', mn: 'Лондон' }, icon: '🇬🇧' },
          { left: { en: 'Italy', mn: 'Итали' }, right: { en: 'Rome', mn: 'Ром' }, icon: '🇮🇹' },
          {
            left: { en: 'Canada', mn: 'Канад' },
            right: { en: 'Ottawa', mn: 'Оттава' },
            icon: '🇨🇦',
            note: { en: 'Not Toronto', mn: 'Торонто биш' },
          },
          {
            left: { en: 'Brazil', mn: 'Бразил' },
            right: { en: 'Brasília', mn: 'Бразилиа' },
            icon: '🇧🇷',
            note: { en: 'Not Rio de Janeiro', mn: 'Рио-де-Жанейро биш' },
          },
          {
            left: { en: 'Australia', mn: 'Австрали' },
            right: { en: 'Canberra', mn: 'Канберра' },
            icon: '🇦🇺',
            note: { en: 'Not Sydney', mn: 'Сидней биш' },
          },
        ],
      },
      funFacts: [
        {
          en: 'Brasília was built from scratch and became Brazil’s capital in 1960.',
          mn: 'Бразилиа хотыг шинээр барьж, 1960 онд Бразилын нийслэл болгосон.',
        },
        {
          en: 'Canberra was chosen as a compromise between Sydney and Melbourne.',
          mn: 'Канберраг Сидней, Мельбурн хоёрын дундын шийдэл болгон нийслэлээр сонгосон.',
        },
        {
          en: 'Almost half of all people in Mongolia live in Ulaanbaatar.',
          mn: 'Монголын нийт хүн амын бараг тал нь Улаанбаатарт амьдардаг.',
        },
      ],
    },

    // 8 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.records',
      order: 8,
      title: { en: 'World records of nature', mn: 'Байгалийн дэлхийн дээд амжилтууд' },
      summary: {
        en: 'The biggest, deepest, highest and driest places on Earth.',
        mn: 'Дэлхийн хамгийн том, гүн, өндөр, хуурай газрууд.',
      },
      body: {
        en: 'Our planet has some amazing record holders. A desert is any place with very little rain, so icy Antarctica counts as the largest desert of all. Lake Baikal is the deepest lake, and the Caspian Sea is the largest lake by area. These cards show the champions.',
        mn: 'Манай гарагт гайхалтай дээд амжилт эзэмшигчид олон бий. Цөл гэдэг нь маш бага хур тунадастай газар тул мөсөн Антарктид ч хамгийн том цөлд тооцогддог. Байгаль нуур хамгийн гүн нуур, Каспийн тэнгис талбайгаараа хамгийн том нуур. Эдгээр картуудад аваргуудыг харуулав.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Sahara', mn: 'Сахар цөл' },
            subtitle: { en: 'Largest hot desert', mn: 'Хамгийн том халуун цөл' },
            facts: [
              { en: 'About 9.2 million km²', mn: 'Ойролцоогоор 9.2 сая км²' },
              { en: 'Covers much of North Africa', mn: 'Хойд Африкийн ихэнх хэсгийг эзэлдэг' },
            ],
            icon: '🏜️',
            color: '#F4A340',
          },
          {
            title: { en: 'Antarctica', mn: 'Антарктид' },
            subtitle: { en: 'Largest desert overall', mn: 'Хамгийн том цөл' },
            facts: [
              { en: 'About 14 million km²', mn: 'Ойролцоогоор 14 сая км²' },
              { en: 'Very little snow or rain falls each year', mn: 'Жилд маш бага цас, бороо ордог' },
            ],
            icon: '🧊',
            color: '#7FC8F8',
          },
          {
            title: { en: 'Lake Baikal', mn: 'Байгаль нуур' },
            subtitle: { en: 'Deepest lake', mn: 'Хамгийн гүн нуур' },
            facts: [
              { en: 'About 1,642 m deep', mn: 'Ойролцоогоор 1,642 м гүн' },
              {
                en: 'Holds about 20% of the world’s unfrozen fresh surface water',
                mn: 'Дэлхийн хөлдөөгүй гадаргын цэвэр усны 20 орчим хувийг агуулдаг',
              },
            ],
            icon: '💧',
            color: '#1E6FD9',
          },
          {
            title: { en: 'Caspian Sea', mn: 'Каспийн тэнгис' },
            subtitle: { en: 'Largest lake by area', mn: 'Талбайгаараа хамгийн том нуур' },
            facts: [
              { en: 'About 371,000 km²', mn: 'Ойролцоогоор 371,000 км²' },
              { en: 'Called a sea, but it is a salty lake', mn: 'Тэнгис гэж нэрлэдэг ч давстай нуур юм' },
            ],
            icon: '🌊',
            color: '#2BA3B8',
          },
          {
            title: { en: 'Vatican City', mn: 'Ватикан' },
            subtitle: { en: 'Smallest country', mn: 'Хамгийн жижиг улс' },
            facts: [
              { en: 'About 0.44 km²', mn: 'Ойролцоогоор 0.44 км²' },
              { en: 'Located inside the city of Rome', mn: 'Ром хотын дотор оршдог' },
            ],
            icon: '⛪',
            color: '#C9A227',
          },
          {
            title: { en: 'Angel Falls', mn: 'Анхель хүрхрээ' },
            subtitle: { en: 'Highest waterfall', mn: 'Хамгийн өндөр хүрхрээ' },
            facts: [
              { en: 'About 979 m tall', mn: 'Ойролцоогоор 979 м өндөр' },
              { en: 'In Venezuela, South America', mn: 'Өмнөд Америкийн Венесуэлд' },
            ],
            icon: '🏞️',
            color: '#3BAA5C',
          },
          {
            title: { en: 'Greenland', mn: 'Гренланд' },
            subtitle: { en: 'Largest island', mn: 'Хамгийн том арал' },
            facts: [
              { en: 'About 2.17 million km²', mn: 'Ойролцоогоор 2.17 сая км²' },
              { en: 'Mostly covered by a thick ice sheet', mn: 'Ихэнх нь зузаан мөсөн бүрхүүлтэй' },
            ],
            icon: '🏔️',
            color: '#9BB7D4',
          },
          {
            title: { en: 'Tokyo', mn: 'Токио' },
            subtitle: { en: 'One of the biggest city areas', mn: 'Хамгийн том хотын бүсүүдийн нэг' },
            facts: [
              { en: 'About 37 million people in the wider metro area', mn: 'Томоохон хотын бүсэд ойролцоогоор 37 сая хүн' },
              {
                en: 'Rankings change depending on where city borders are drawn',
                mn: 'Хотын хилийг хэрхэн тогтоохоос хамаарч жагсаалт өөрчлөгддөг',
              },
            ],
            icon: '🏙️',
            color: '#E5484D',
          },
          {
            title: { en: 'Atacama Desert', mn: 'Атакама цөл' },
            subtitle: { en: 'Driest non-polar desert', mn: 'Туйлын бус хамгийн хуурай цөл' },
            facts: [
              { en: 'In Chile, South America', mn: 'Өмнөд Америкийн Чилид' },
              {
                en: 'Some weather stations there have almost never recorded rain',
                mn: 'Тэндхийн зарим цаг уурын станц бараг хэзээ ч бороо бүртгээгүй',
              },
            ],
            icon: '☀️',
            color: '#D9822B',
          },
        ],
      },
      funFacts: [
        {
          en: 'Lake Baikal is also the oldest lake on Earth — about 25 million years old.',
          mn: 'Байгаль нуур мөн дэлхийн хамгийн эртний нуур — ойролцоогоор 25 сая жилийн настай.',
        },
        {
          en: 'Water from Angel Falls is so high that much of it turns to mist before reaching the ground.',
          mn: 'Анхель хүрхрээ маш өндөр тул ус нь газарт хүрэхээсээ өмнө ихэвчлэн манан болдог.',
        },
        {
          en: 'Vatican City is so small you could walk across it in about 20 minutes.',
          mn: 'Ватикан маш жижиг тул 20 орчим минутад алхаад туулж болно.',
        },
      ],
    },

    // 9 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'geography.mongolia',
      order: 9,
      title: { en: 'Mongolia on the map', mn: 'Газрын зураг дээрх Монгол' },
      summary: {
        en: 'A huge, high, landlocked country with few people and lots of open space.',
        mn: 'Далайд гарцгүй, өндөрлөг, өргөн уудам нутагтай, хүн ам цөөтэй улс.',
      },
      body: {
        en: 'Mongolia covers about 1.56 million km² but has only about 3.5 million people, so it is one of the least densely populated countries on Earth. It has high mountains in the west, the Gobi in the south and forests and lakes in the north. Its capital, Ulaanbaatar, is the coldest national capital on average.',
        mn: 'Монгол ойролцоогоор 1.56 сая км² нутагтай ч ердөө 3.5 орчим сая хүн амтай тул дэлхийн хамгийн сийрэг суурьшилтай улсуудын нэг. Баруун талаараа өндөр уулс, урдаа Говь, хойгуураа ой мод, нууртай. Нийслэл Улаанбаатар нь дунджаар хамгийн хүйтэн нийслэл хот.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Size', mn: 'Нутаг дэвсгэр' },
            subtitle: { en: 'About 1.56 million km²', mn: 'Ойролцоогоор 1.56 сая км²' },
            facts: [
              { en: 'Second-largest landlocked country after Kazakhstan', mn: 'Казахстаны дараа далайд гарцгүй хоёр дахь том улс' },
              { en: 'Borders only Russia and China', mn: 'Зөвхөн Орос, Хятадтай хиллэдэг' },
            ],
            icon: '🗺️',
            color: '#00A76F',
          },
          {
            title: { en: 'People', mn: 'Хүн ам' },
            subtitle: { en: 'About 3.5 million', mn: 'Ойролцоогоор 3.5 сая' },
            facts: [
              { en: 'About 2 people per km²', mn: '1 км² тутамд 2 орчим хүн' },
              { en: 'Almost half live in Ulaanbaatar', mn: 'Бараг тал нь Улаанбаатарт амьдардаг' },
            ],
            icon: '👨‍👩‍👧',
            color: '#1E6FD9',
          },
          {
            title: { en: 'Khüiten Peak', mn: 'Хүйтэн оргил' },
            subtitle: { en: 'Highest point, about 4,374 m', mn: 'Хамгийн өндөр цэг, ойролцоогоор 4,374 м' },
            facts: [
              { en: 'In the Altai Tavan Bogd mountains', mn: 'Алтай Таван Богд ууланд' },
              { en: 'Covered by glaciers', mn: 'Мөсөн голоор бүрхэгдсэн' },
            ],
            icon: '🏔️',
            color: '#7FC8F8',
          },
          {
            title: { en: 'Lake Khövsgöl', mn: 'Хөвсгөл нуур' },
            subtitle: { en: 'Deepest lake in Mongolia', mn: 'Монголын хамгийн гүн нуур' },
            facts: [
              { en: 'About 262 m deep', mn: 'Ойролцоогоор 262 м гүн' },
              { en: 'Holds about 70% of Mongolia’s fresh surface water', mn: 'Монголын гадаргын цэвэр усны 70 орчим хувийг агуулдаг' },
            ],
            icon: '💧',
            color: '#2BA3B8',
          },
          {
            title: { en: 'Uvs Lake', mn: 'Увс нуур' },
            subtitle: { en: 'Largest lake in Mongolia by area', mn: 'Талбайгаараа Монголын хамгийн том нуур' },
            facts: [
              { en: 'About 3,350 km²', mn: 'Ойролцоогоор 3,350 км²' },
              { en: 'Its water is salty', mn: 'Ус нь давстай' },
            ],
            icon: '🌊',
            color: '#5B8DEF',
          },
          {
            title: { en: 'The Gobi', mn: 'Говь' },
            subtitle: { en: 'One of Asia’s largest deserts', mn: 'Азийн хамгийн том цөлүүдийн нэг' },
            facts: [
              { en: 'Spreads across southern Mongolia and northern China', mn: 'Монголын өмнөд хэсэг, Хятадын хойд хэсгийг хамардаг' },
              { en: 'Famous for dinosaur fossils', mn: 'Үлэг гүрвэлийн олдвороор алдартай' },
            ],
            icon: '🦖',
            color: '#F4A340',
          },
          {
            title: { en: 'Ulaanbaatar', mn: 'Улаанбаатар' },
            subtitle: { en: 'Coldest national capital', mn: 'Хамгийн хүйтэн нийслэл' },
            facts: [
              { en: 'Yearly average temperature is around 0 °C', mn: 'Жилийн дундаж температур 0 °C орчим' },
              { en: 'Winter nights often fall below −30 °C', mn: 'Өвлийн шөнө ихэвчлэн −30 °C-ээс доош хүйтэрдэг' },
            ],
            icon: '❄️',
            color: '#9BB7D4',
          },
        ],
      },
      funFacts: [
        {
          en: 'Mongolia is often called the “Land of the Blue Sky” because it has so many sunny days.',
          mn: 'Нартай өдөр олонтой тул Монголыг «Мөнх хөх тэнгэрийн орон» гэж нэрлэдэг.',
        },
        {
          en: 'The Selenge River carries water from Mongolia into Lake Baikal.',
          mn: 'Сэлэнгэ мөрөн Монголын усыг Байгаль нуурт хүргэдэг.',
        },
        {
          en: 'Mongolia has fewer people than many single cities, such as Tokyo or Beijing.',
          mn: 'Монголын хүн ам Токио, Бээжин зэрэг ганц хотынхоос ч цөөн.',
        },
      ],
    },
  ],

  questions: [
    // ── continents-area ─────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest continent?', mn: 'Хамгийн том тив аль нь вэ?' },
      choices: [
        { en: 'Africa', mn: 'Африк' },
        { en: 'Asia', mn: 'Ази' },
        { en: 'North America', mn: 'Хойд Америк' },
        { en: 'Europe', mn: 'Европ' },
      ],
      answer: 1,
      explanation: {
        en: 'Asia is the largest continent at about 44.6 million km² — almost a third of all land.',
        mn: 'Ази ойролцоогоор 44.6 сая км² буюу нийт хуурай газрын бараг гуравны нэгийг эзэлдэг хамгийн том тив.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q2',
      difficulty: 1,
      prompt: { en: 'Which continent is the smallest?', mn: 'Хамгийн жижиг тив аль нь вэ?' },
      choices: [
        { en: 'Europe', mn: 'Европ' },
        { en: 'Antarctica', mn: 'Антарктид' },
        { en: 'South America', mn: 'Өмнөд Америк' },
        { en: 'Australia & Oceania', mn: 'Австрали ба Далайн орнууд' },
      ],
      answer: 3,
      explanation: {
        en: 'Australia & Oceania is the smallest, at about 8.5 million km². Europe is a little bigger, at about 10.2 million km².',
        mn: 'Австрали ба Далайн орнууд ойролцоогоор 8.5 сая км² талбайтай хамгийн жижиг тив. Европ арай том буюу 10.2 орчим сая км².',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q3',
      difficulty: 2,
      prompt: { en: 'Which is the second-largest continent?', mn: 'Хоёр дахь том тив аль нь вэ?' },
      choices: [
        { en: 'Africa', mn: 'Африк' },
        { en: 'North America', mn: 'Хойд Америк' },
        { en: 'Antarctica', mn: 'Антарктид' },
        { en: 'South America', mn: 'Өмнөд Америк' },
      ],
      answer: 0,
      explanation: {
        en: 'Africa is second, at about 30.4 million km². North America is third, at about 24.7 million km².',
        mn: 'Африк ойролцоогоор 30.4 сая км² талбайгаар хоёрдугаарт ордог. Хойд Америк 24.7 орчим сая км²-аар гуравдугаарт.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q4',
      difficulty: 2,
      prompt: { en: 'About how big is Asia?', mn: 'Ази ойролцоогоор ямар хэмжээтэй вэ?' },
      choices: [
        { en: 'About 10 million km²', mn: 'Ойролцоогоор 10 сая км²' },
        { en: 'About 25 million km²', mn: 'Ойролцоогоор 25 сая км²' },
        { en: 'About 44.6 million km²', mn: 'Ойролцоогоор 44.6 сая км²' },
        { en: 'About 80 million km²', mn: 'Ойролцоогоор 80 сая км²' },
      ],
      answer: 2,
      explanation: {
        en: 'Asia covers about 44.6 million km², more than Africa (about 30.4 million km²).',
        mn: 'Ази ойролцоогоор 44.6 сая км² талбайтай нь Африкаас (ойролцоогоор 30.4 сая км²) том.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q5',
      difficulty: 2,
      prompt: {
        en: 'Antarctica is about 14.2 million km². Which of these continents is smaller than Antarctica?',
        mn: 'Антарктид ойролцоогоор 14.2 сая км². Эдгээрээс аль тив нь Антарктидаас жижиг вэ?',
      },
      choices: [
        { en: 'Africa', mn: 'Африк' },
        { en: 'South America', mn: 'Өмнөд Америк' },
        { en: 'Europe', mn: 'Европ' },
        { en: 'North America', mn: 'Хойд Америк' },
      ],
      answer: 2,
      explanation: {
        en: 'Europe is about 10.2 million km², so it is smaller than Antarctica. South America (about 17.8 million km²) is bigger.',
        mn: 'Европ ойролцоогоор 10.2 сая км² тул Антарктидаас жижиг. Өмнөд Америк (ойролцоогоор 17.8 сая км²) илүү том.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-area',
      key: 'geography.continents-area.q6',
      difficulty: 3,
      prompt: { en: 'About what share of Earth’s surface is land?', mn: 'Дэлхийн гадаргын ойролцоогоор хэдэн хувь нь хуурай газар вэ?' },
      choices: [
        { en: 'About 10%', mn: 'Ойролцоогоор 10%' },
        { en: 'About 50%', mn: 'Ойролцоогоор 50%' },
        { en: 'About 71%', mn: 'Ойролцоогоор 71%' },
        { en: 'About 29%', mn: 'Ойролцоогоор 29%' },
      ],
      answer: 3,
      explanation: {
        en: 'Only about 29% of Earth’s surface is land. The other 71% is covered by water.',
        mn: 'Дэлхийн гадаргын ердөө 29 орчим хувь нь хуурай газар. Үлдсэн 71 хувийг ус бүрхдэг.',
      },
    },

    // ── continents-people ───────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q1',
      difficulty: 1,
      prompt: { en: 'Which continent has the most people?', mn: 'Аль тив хамгийн олон хүн амтай вэ?' },
      choices: [
        { en: 'Africa', mn: 'Африк' },
        { en: 'Europe', mn: 'Европ' },
        { en: 'Asia', mn: 'Ази' },
        { en: 'South America', mn: 'Өмнөд Америк' },
      ],
      answer: 2,
      explanation: {
        en: 'About 4.75 billion people live in Asia — roughly six in every ten people on Earth.',
        mn: 'Азид ойролцоогоор 4.75 тэрбум хүн амьдардаг — энэ нь дэлхийн 10 хүн тутмын 6 орчим нь.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q2',
      difficulty: 1,
      prompt: {
        en: 'Which continent has no permanent residents?',
        mn: 'Аль тивд байнга оршин суугч байдаггүй вэ?',
      },
      choices: [
        { en: 'Australia & Oceania', mn: 'Австрали ба Далайн орнууд' },
        { en: 'Antarctica', mn: 'Антарктид' },
        { en: 'Europe', mn: 'Европ' },
        { en: 'South America', mn: 'Өмнөд Америк' },
      ],
      answer: 1,
      explanation: {
        en: 'Antarctica has no permanent residents. Only scientists stay there for a while — a few thousand in summer.',
        mn: 'Антарктидад байнга оршин суугч байхгүй. Зөвхөн эрдэмтэд түр хугацаагаар байдаг — зундаа хэдэн мянга.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q3',
      difficulty: 2,
      prompt: {
        en: 'About how many people lived in the world in 2024?',
        mn: '2024 онд дэлхийд ойролцоогоор хэдэн хүн амьдарч байсан бэ?',
      },
      choices: [
        { en: 'About 5 billion', mn: 'Ойролцоогоор 5 тэрбум' },
        { en: 'About 7 billion', mn: 'Ойролцоогоор 7 тэрбум' },
        { en: 'About 10 billion', mn: 'Ойролцоогоор 10 тэрбум' },
        { en: 'About 8.2 billion', mn: 'Ойролцоогоор 8.2 тэрбум' },
      ],
      answer: 3,
      explanation: {
        en: 'The UN estimates about 8.2 billion people lived on Earth in 2024.',
        mn: 'НҮБ-ын тооцоогоор 2024 онд дэлхийд ойролцоогоор 8.2 тэрбум хүн амьдарч байв.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q4',
      difficulty: 2,
      prompt: {
        en: 'Which country has the most people, according to the UN (2024)?',
        mn: 'НҮБ-ын мэдээгээр (2024) аль улс хамгийн олон хүн амтай вэ?',
      },
      choices: [
        { en: 'India', mn: 'Энэтхэг' },
        { en: 'China', mn: 'Хятад' },
        { en: 'USA', mn: 'АНУ' },
        { en: 'Indonesia', mn: 'Индонез' },
      ],
      answer: 0,
      explanation: {
        en: 'India has about 1.44 billion people and passed China (about 1.41 billion) in 2023.',
        mn: 'Энэтхэг ойролцоогоор 1.44 тэрбум хүн амтай бөгөөд 2023 онд Хятадыг (ойролцоогоор 1.41 тэрбум) гүйцсэн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q5',
      difficulty: 2,
      prompt: {
        en: 'Which continent has the second-most people?',
        mn: 'Хүн амаараа хоёрдугаарт ордог тив аль нь вэ?',
      },
      choices: [
        { en: 'Europe', mn: 'Европ' },
        { en: 'North America', mn: 'Хойд Америк' },
        { en: 'South America', mn: 'Өмнөд Америк' },
        { en: 'Africa', mn: 'Африк' },
      ],
      answer: 3,
      explanation: {
        en: 'Africa is second with about 1.5 billion people, and its population is growing the fastest.',
        mn: 'Африк ойролцоогоор 1.5 тэрбум хүн амаар хоёрдугаарт ордог бөгөөд хүн ам нь хамгийн хурдан өсөж байна.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.continents-people',
      key: 'geography.continents-people.q6',
      difficulty: 3,
      prompt: {
        en: 'Roughly what share of all people live in Asia?',
        mn: 'Нийт хүн амын ойролцоогоор хэдэн хувь нь Азид амьдардаг вэ?',
      },
      choices: [
        { en: 'About 1 in 10', mn: '10 хүн тутмын 1 орчим' },
        { en: 'About 6 in 10', mn: '10 хүн тутмын 6 орчим' },
        { en: 'About 3 in 10', mn: '10 хүн тутмын 3 орчим' },
        { en: 'About 9 in 10', mn: '10 хүн тутмын 9 орчим' },
      ],
      answer: 1,
      explanation: {
        en: 'About 4.75 billion of the world’s 8.2 billion people live in Asia — close to 6 in 10.',
        mn: 'Дэлхийн 8.2 тэрбум хүний 4.75 орчим тэрбум нь Азид амьдардаг — энэ нь 10 хүн тутмын 6 орчим.',
      },
    },

    // ── oceans ──────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest ocean?', mn: 'Хамгийн том далай аль нь вэ?' },
      choices: [
        { en: 'Atlantic Ocean', mn: 'Атлантын далай' },
        { en: 'Indian Ocean', mn: 'Энэтхэгийн далай' },
        { en: 'Arctic Ocean', mn: 'Хойд мөсөн далай' },
        { en: 'Pacific Ocean', mn: 'Номхон далай' },
      ],
      answer: 3,
      explanation: {
        en: 'The Pacific Ocean is the largest, at about 169 million km² — about twice the size of the Atlantic.',
        mn: 'Номхон далай ойролцоогоор 169 сая км² талбайтай хамгийн том далай — Атлантын далайгаас бараг хоёр дахин том.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q2',
      difficulty: 1,
      prompt: { en: 'Which is the smallest ocean?', mn: 'Хамгийн жижиг далай аль нь вэ?' },
      choices: [
        { en: 'Arctic Ocean', mn: 'Хойд мөсөн далай' },
        { en: 'Southern Ocean', mn: 'Өмнөд далай' },
        { en: 'Indian Ocean', mn: 'Энэтхэгийн далай' },
        { en: 'Atlantic Ocean', mn: 'Атлантын далай' },
      ],
      answer: 0,
      explanation: {
        en: 'The Arctic Ocean, around the North Pole, is the smallest, at about 15.6 million km².',
        mn: 'Хойд туйлыг тойрсон Хойд мөсөн далай ойролцоогоор 15.6 сая км² талбайтай хамгийн жижиг далай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q3',
      difficulty: 2,
      prompt: {
        en: 'Where is the deepest point in the ocean?',
        mn: 'Далайн хамгийн гүн цэг хаана байдаг вэ?',
      },
      choices: [
        { en: 'Puerto Rico Trench', mn: 'Пуэрто-Рикогийн суваг' },
        { en: 'Mariana Trench', mn: 'Марианы суваг' },
        { en: 'Java Trench', mn: 'Явын суваг' },
        { en: 'The middle of the Arctic Ocean', mn: 'Хойд мөсөн далайн төв' },
      ],
      answer: 1,
      explanation: {
        en: 'The Mariana Trench in the Pacific Ocean is about 10,935 m deep at its deepest point.',
        mn: 'Номхон далай дахь Марианы суваг хамгийн гүн цэгтээ ойролцоогоор 10,935 м гүн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q4',
      difficulty: 2,
      prompt: { en: 'Which is the second-largest ocean?', mn: 'Хоёр дахь том далай аль нь вэ?' },
      choices: [
        { en: 'Indian Ocean', mn: 'Энэтхэгийн далай' },
        { en: 'Southern Ocean', mn: 'Өмнөд далай' },
        { en: 'Atlantic Ocean', mn: 'Атлантын далай' },
        { en: 'Arctic Ocean', mn: 'Хойд мөсөн далай' },
      ],
      answer: 2,
      explanation: {
        en: 'The Atlantic Ocean is second, at about 85 million km². The Indian Ocean is third, at about 71 million km².',
        mn: 'Атлантын далай ойролцоогоор 85 сая км²-аар хоёрдугаарт ордог. Энэтхэгийн далай 71 орчим сая км²-аар гуравдугаарт.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q5',
      difficulty: 2,
      prompt: {
        en: 'Which ocean surrounds Antarctica?',
        mn: 'Антарктидыг аль далай тойрдог вэ?',
      },
      choices: [
        { en: 'Arctic Ocean', mn: 'Хойд мөсөн далай' },
        { en: 'Southern Ocean', mn: 'Өмнөд далай' },
        { en: 'Indian Ocean', mn: 'Энэтхэгийн далай' },
        { en: 'Pacific Ocean', mn: 'Номхон далай' },
      ],
      answer: 1,
      explanation: {
        en: 'The Southern Ocean circles Antarctica and covers about 22 million km².',
        mn: 'Өмнөд далай Антарктидыг тойрдог бөгөөд ойролцоогоор 22 сая км² талбайтай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.oceans',
      key: 'geography.oceans.q6',
      difficulty: 3,
      prompt: {
        en: 'How does the Pacific Ocean compare with all the land on Earth put together?',
        mn: 'Номхон далайг дэлхийн бүх хуурай газрыг нийлүүлсэнтэй харьцуулбал ямар вэ?',
      },
      choices: [
        { en: 'The Pacific is bigger', mn: 'Номхон далай нь том' },
        { en: 'The Pacific is about half as big', mn: 'Номхон далай нь хагас орчим' },
        { en: 'The Pacific is about a tenth as big', mn: 'Номхон далай нь аравны нэг орчим' },
        { en: 'They are exactly the same', mn: 'Яг адилхан' },
      ],
      answer: 0,
      explanation: {
        en: 'The Pacific covers about 169 million km², while all land together is about 149 million km² — so the Pacific is bigger.',
        mn: 'Номхон далай ойролцоогоор 169 сая км², харин бүх хуурай газар нийлээд 149 орчим сая км² — тиймээс Номхон далай том.',
      },
    },

    // ── rivers ──────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q1',
      difficulty: 1,
      prompt: {
        en: 'Which river is traditionally listed as the longest in the world?',
        mn: 'Уламжлал ёсоор дэлхийн хамгийн урт гол гэж аль голыг тооцдог вэ?',
      },
      choices: [
        { en: 'Mississippi', mn: 'Миссисипи' },
        { en: 'Nile', mn: 'Нил мөрөн' },
        { en: 'Yangtze', mn: 'Янцзы' },
        { en: 'Yellow River', mn: 'Хуанхэ (Шар мөрөн)' },
      ],
      answer: 1,
      explanation: {
        en: 'The Nile in Africa, about 6,650 km long, is traditionally listed as the longest. Some measurements make the Amazon slightly longer.',
        mn: 'Африкийн ойролцоогоор 6,650 км урт Нил мөрнийг уламжлал ёсоор хамгийн урт гэж тооцдог. Зарим хэмжилтээр Амазон арай урт гардаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q2',
      difficulty: 1,
      prompt: { en: 'Which is the longest river in Asia?', mn: 'Азийн хамгийн урт гол аль нь вэ?' },
      choices: [
        { en: 'Yellow River', mn: 'Хуанхэ (Шар мөрөн)' },
        { en: 'Mekong', mn: 'Меконг' },
        { en: 'Ganges', mn: 'Ганга' },
        { en: 'Yangtze', mn: 'Янцзы' },
      ],
      answer: 3,
      explanation: {
        en: 'The Yangtze in China is about 6,300 km long — the longest river in Asia.',
        mn: 'Хятадын Янцзы мөрөн ойролцоогоор 6,300 км урт — Азийн хамгийн урт гол.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q3',
      difficulty: 1,
      prompt: { en: 'On which continent does the Amazon flow?', mn: 'Амазон мөрөн аль тивд урсдаг вэ?' },
      choices: [
        { en: 'South America', mn: 'Өмнөд Америк' },
        { en: 'Africa', mn: 'Африк' },
        { en: 'Asia', mn: 'Ази' },
        { en: 'North America', mn: 'Хойд Америк' },
      ],
      answer: 0,
      explanation: {
        en: 'The Amazon, about 6,400 km long, flows across South America, mostly through Brazil.',
        mn: 'Ойролцоогоор 6,400 км урт Амазон мөрөн Өмнөд Америкаар, голдуу Бразилаар урсдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q4',
      difficulty: 2,
      prompt: { en: 'About how long is the Nile?', mn: 'Нил мөрөн ойролцоогоор хэр урт вэ?' },
      choices: [
        { en: 'About 3,000 km', mn: 'Ойролцоогоор 3,000 км' },
        { en: 'About 4,500 km', mn: 'Ойролцоогоор 4,500 км' },
        { en: 'About 6,650 km', mn: 'Ойролцоогоор 6,650 км' },
        { en: 'About 9,500 km', mn: 'Ойролцоогоор 9,500 км' },
      ],
      answer: 2,
      explanation: {
        en: 'The Nile is about 6,650 km long and flows north into the Mediterranean Sea.',
        mn: 'Нил мөрөн ойролцоогоор 6,650 км урт бөгөөд хойш урсаж Газар дундын тэнгист цутгадаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q5',
      difficulty: 2,
      prompt: {
        en: 'Mongolia’s Selenge River flows into which lake?',
        mn: 'Монголын Сэлэнгэ мөрөн аль нуурт цутгадаг вэ?',
      },
      choices: [
        { en: 'Lake Khövsgöl', mn: 'Хөвсгөл нуур' },
        { en: 'Uvs Lake', mn: 'Увс нуур' },
        { en: 'Lake Baikal', mn: 'Байгаль нуур' },
        { en: 'Caspian Sea', mn: 'Каспийн тэнгис' },
      ],
      answer: 2,
      explanation: {
        en: 'The Selenge flows into Lake Baikal. Together with the Angara and Yenisei, it forms a river system about 5,539 km long.',
        mn: 'Сэлэнгэ мөрөн Байгаль нуурт цутгадаг. Ангар, Енисейтэй хамт 5,539 орчим км урт голын систем үүсгэдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.rivers',
      key: 'geography.rivers.q6',
      difficulty: 3,
      prompt: {
        en: 'Which river carries the most water into the ocean?',
        mn: 'Аль гол далайд хамгийн их ус урсгадаг вэ?',
      },
      choices: [
        { en: 'Nile', mn: 'Нил мөрөн' },
        { en: 'Yangtze', mn: 'Янцзы' },
        { en: 'Congo', mn: 'Конго' },
        { en: 'Amazon', mn: 'Амазон' },
      ],
      answer: 3,
      explanation: {
        en: 'The Amazon carries about one fifth of all river water that reaches the oceans — far more than any other river.',
        mn: 'Далайд цутгадаг бүх голын усны тавны нэг орчмыг Амазон урсгадаг — бусад бүх голоос хамаагүй их.',
      },
    },

    // ── mountains ───────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q1',
      difficulty: 1,
      prompt: { en: 'Which is the highest mountain on Earth?', mn: 'Дэлхийн хамгийн өндөр уул аль нь вэ?' },
      choices: [
        { en: 'K2', mn: 'К2' },
        { en: 'Kilimanjaro', mn: 'Килиманжаро' },
        { en: 'Elbrus', mn: 'Эльбрус' },
        { en: 'Everest', mn: 'Эверест (Жомолунгма)' },
      ],
      answer: 3,
      explanation: {
        en: 'Mount Everest is the highest mountain, at about 8,849 m above sea level.',
        mn: 'Эверест уул далайн түвшнээс дээш ойролцоогоор 8,849 м өндөртэй хамгийн өндөр уул.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q2',
      difficulty: 1,
      prompt: {
        en: 'In which mountain range is Mount Everest?',
        mn: 'Эверест уул аль нуруунд байдаг вэ?',
      },
      choices: [
        { en: 'Andes', mn: 'Андын нуруу' },
        { en: 'Himalayas', mn: 'Гималайн нуруу' },
        { en: 'Alps', mn: 'Альпийн нуруу' },
        { en: 'Rocky Mountains', mn: 'Хадат уулс' },
      ],
      answer: 1,
      explanation: {
        en: 'Everest (about 8,849 m) is in the Himalayas, on the border of Nepal and China.',
        mn: 'Эверест (ойролцоогоор 8,849 м) Гималайн нуруунд, Балба, Хятадын хил дээр оршдог.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q3',
      difficulty: 2,
      prompt: { en: 'Which is the second-highest mountain?', mn: 'Хоёр дахь өндөр уул аль нь вэ?' },
      choices: [
        { en: 'Kangchenjunga', mn: 'Канченжунга' },
        { en: 'Lhotse', mn: 'Лхоцзе' },
        { en: 'K2', mn: 'К2' },
        { en: 'Makalu', mn: 'Макалу' },
      ],
      answer: 2,
      explanation: {
        en: 'K2 is second at about 8,611 m. Kangchenjunga is third at about 8,586 m.',
        mn: 'К2 ойролцоогоор 8,611 м өндрөөр хоёрдугаарт ордог. Канченжунга 8,586 орчим м-ээр гуравдугаарт.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q4',
      difficulty: 2,
      prompt: { en: 'Which is the highest mountain in Africa?', mn: 'Африкийн хамгийн өндөр уул аль нь вэ?' },
      choices: [
        { en: 'Kilimanjaro', mn: 'Килиманжаро' },
        { en: 'Mount Kenya', mn: 'Кени уул' },
        { en: 'Toubkal', mn: 'Тубкал' },
        { en: 'Mount Cameroon', mn: 'Камерун уул' },
      ],
      answer: 0,
      explanation: {
        en: 'Kilimanjaro in Tanzania is the highest in Africa, at about 5,895 m.',
        mn: 'Танзани дахь Килиманжаро ойролцоогоор 5,895 м өндөртэй, Африкийн хамгийн өндөр уул.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q5',
      difficulty: 2,
      prompt: {
        en: 'Which is the highest mountain in South America?',
        mn: 'Өмнөд Америкийн хамгийн өндөр уул аль нь вэ?',
      },
      choices: [
        { en: 'Denali', mn: 'Денали' },
        { en: 'Chimborazo', mn: 'Чимборасо' },
        { en: 'Huascarán', mn: 'Уаскаран' },
        { en: 'Aconcagua', mn: 'Аконкагуа' },
      ],
      answer: 3,
      explanation: {
        en: 'Aconcagua in Argentina, about 6,961 m, is the highest mountain outside Asia.',
        mn: 'Аргентин дахь Аконкагуа (ойролцоогоор 6,961 м) бол Азиас гадна байх хамгийн өндөр уул.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mountains',
      key: 'geography.mountains.q6',
      difficulty: 3,
      prompt: {
        en: 'How many mountains on Earth are taller than 8,000 m?',
        mn: 'Дэлхий дээр 8,000 м-ээс өндөр хэдэн уул байдаг вэ?',
      },
      choices: [
        { en: '8', mn: '8' },
        { en: '14', mn: '14' },
        { en: '21', mn: '21' },
        { en: '30', mn: '30' },
      ],
      answer: 1,
      explanation: {
        en: 'There are 14 peaks over 8,000 m, all in the Himalaya and Karakoram ranges of Asia.',
        mn: '8,000 м-ээс өндөр 14 оргил байдаг бөгөөд бүгд Азийн Гималай, Каракорумын нуруунд бий.',
      },
    },

    // ── countries ───────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest country by area?', mn: 'Нутаг дэвсгэрээрээ хамгийн том улс аль нь вэ?' },
      choices: [
        { en: 'Canada', mn: 'Канад' },
        { en: 'China', mn: 'Хятад' },
        { en: 'Russia', mn: 'Орос' },
        { en: 'Brazil', mn: 'Бразил' },
      ],
      answer: 2,
      explanation: {
        en: 'Russia is the largest country, at about 17.1 million km² — almost twice the size of Canada.',
        mn: 'Орос ойролцоогоор 17.1 сая км² нутагтай хамгийн том улс — Канадаас бараг хоёр дахин том.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q2',
      difficulty: 2,
      prompt: { en: 'Which is the largest country in Africa?', mn: 'Африкийн хамгийн том улс аль нь вэ?' },
      choices: [
        { en: 'Algeria', mn: 'Алжир' },
        { en: 'Egypt', mn: 'Египет' },
        { en: 'Libya', mn: 'Ливи' },
        { en: 'Nigeria', mn: 'Нигери' },
      ],
      answer: 0,
      explanation: {
        en: 'Algeria is the largest country in Africa, at about 2.4 million km². Much of it is part of the Sahara.',
        mn: 'Алжир ойролцоогоор 2.4 сая км² нутагтай Африкийн хамгийн том улс. Нутгийн ихэнх нь Сахар цөлд хамаарна.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q3',
      difficulty: 2,
      prompt: {
        en: 'Which is the largest landlocked country (no coast on the open ocean)?',
        mn: 'Далайд гарцгүй хамгийн том улс аль нь вэ?',
      },
      choices: [
        { en: 'Mongolia', mn: 'Монгол' },
        { en: 'Kazakhstan', mn: 'Казахстан' },
        { en: 'Chad', mn: 'Чад' },
        { en: 'Bolivia', mn: 'Боливи' },
      ],
      answer: 1,
      explanation: {
        en: 'Kazakhstan, at about 2.7 million km², is the largest landlocked country. Mongolia is second.',
        mn: 'Ойролцоогоор 2.7 сая км² нутагтай Казахстан далайд гарцгүй хамгийн том улс. Монгол хоёрдугаарт ордог.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q4',
      difficulty: 1,
      prompt: { en: 'About how big is Mongolia?', mn: 'Монгол ойролцоогоор ямар хэмжээний нутагтай вэ?' },
      choices: [
        { en: 'About 0.5 million km²', mn: 'Ойролцоогоор 0.5 сая км²' },
        { en: 'About 3 million km²', mn: 'Ойролцоогоор 3 сая км²' },
        { en: 'About 10 million km²', mn: 'Ойролцоогоор 10 сая км²' },
        { en: 'About 1.56 million km²', mn: 'Ойролцоогоор 1.56 сая км²' },
      ],
      answer: 3,
      explanation: {
        en: 'Mongolia covers about 1.56 million km², which makes it one of the largest landlocked countries in the world.',
        mn: 'Монгол ойролцоогоор 1.56 сая км² нутагтай нь дэлхийн далайд гарцгүй хамгийн том улсуудын нэг болгодог.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q5',
      difficulty: 2,
      prompt: {
        en: 'Which country is the second-largest landlocked country, after Kazakhstan?',
        mn: 'Казахстаны дараа далайд гарцгүй хоёр дахь том улс аль нь вэ?',
      },
      choices: [
        { en: 'Chad', mn: 'Чад' },
        { en: 'Niger', mn: 'Нигер' },
        { en: 'Mongolia', mn: 'Монгол' },
        { en: 'Bolivia', mn: 'Боливи' },
      ],
      answer: 2,
      explanation: {
        en: 'Mongolia (about 1.56 million km²) is second after Kazakhstan. Chad and Niger are each about 1.3 million km².',
        mn: 'Монгол (ойролцоогоор 1.56 сая км²) Казахстаны дараа хоёрдугаарт ордог. Чад, Нигер тус бүр 1.3 орчим сая км².',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.countries',
      key: 'geography.countries.q6',
      difficulty: 1,
      prompt: {
        en: 'Which is the largest country in South America?',
        mn: 'Өмнөд Америкийн хамгийн том улс аль нь вэ?',
      },
      choices: [
        { en: 'Brazil', mn: 'Бразил' },
        { en: 'Peru', mn: 'Перу' },
        { en: 'Colombia', mn: 'Колумби' },
        { en: 'Argentina', mn: 'Аргентин' },
      ],
      answer: 0,
      explanation: {
        en: 'Brazil covers about 8.5 million km² — almost half of South America.',
        mn: 'Бразил ойролцоогоор 8.5 сая км² нутагтай — Өмнөд Америкийн бараг тал нь.',
      },
    },

    // ── capitals ────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q1',
      difficulty: 1,
      prompt: { en: 'What is the capital of Mongolia?', mn: 'Монгол Улсын нийслэл юу вэ?' },
      choices: [
        { en: 'Erdenet', mn: 'Эрдэнэт' },
        { en: 'Darkhan', mn: 'Дархан' },
        { en: 'Ulaanbaatar', mn: 'Улаанбаатар' },
        { en: 'Kharkhorin', mn: 'Хархорин' },
      ],
      answer: 2,
      explanation: {
        en: 'Ulaanbaatar is the capital of Mongolia. Almost half of the country’s about 3.5 million people live there.',
        mn: 'Улаанбаатар бол Монгол Улсын нийслэл. Улсын 3.5 орчим сая хүн амын бараг тал нь тэнд амьдардаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q2',
      difficulty: 2,
      prompt: { en: 'What is the capital of Australia?', mn: 'Австралийн нийслэл юу вэ?' },
      choices: [
        { en: 'Sydney', mn: 'Сидней' },
        { en: 'Canberra', mn: 'Канберра' },
        { en: 'Melbourne', mn: 'Мельбурн' },
        { en: 'Perth', mn: 'Перт' },
      ],
      answer: 1,
      explanation: {
        en: 'Canberra is Australia’s capital. Sydney is the biggest city, but it is not the capital.',
        mn: 'Канберра бол Австралийн нийслэл. Сидней хамгийн том хот боловч нийслэл биш.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q3',
      difficulty: 2,
      prompt: { en: 'What is the capital of Canada?', mn: 'Канадын нийслэл юу вэ?' },
      choices: [
        { en: 'Ottawa', mn: 'Оттава' },
        { en: 'Toronto', mn: 'Торонто' },
        { en: 'Vancouver', mn: 'Ванкувер' },
        { en: 'Montreal', mn: 'Монреаль' },
      ],
      answer: 0,
      explanation: {
        en: 'Ottawa is the capital of Canada. Toronto is the largest city.',
        mn: 'Оттава бол Канадын нийслэл. Торонто хамгийн том хот нь.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q4',
      difficulty: 2,
      prompt: { en: 'What is the capital of Turkey?', mn: 'Туркийн нийслэл юу вэ?' },
      choices: [
        { en: 'Istanbul', mn: 'Истанбул' },
        { en: 'Izmir', mn: 'Измир' },
        { en: 'Antalya', mn: 'Анталья' },
        { en: 'Ankara', mn: 'Анкара' },
      ],
      answer: 3,
      explanation: {
        en: 'Ankara is the capital of Turkey. Istanbul is the biggest city, but it is not the capital.',
        mn: 'Анкара бол Туркийн нийслэл. Истанбул хамгийн том хот боловч нийслэл биш.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q5',
      difficulty: 2,
      prompt: { en: 'What is the capital of Brazil?', mn: 'Бразилын нийслэл юу вэ?' },
      choices: [
        { en: 'Rio de Janeiro', mn: 'Рио-де-Жанейро' },
        { en: 'Brasília', mn: 'Бразилиа' },
        { en: 'São Paulo', mn: 'Сан-Паулу' },
        { en: 'Salvador', mn: 'Салвадор' },
      ],
      answer: 1,
      explanation: {
        en: 'Brasília has been Brazil’s capital since 1960. It was built as a brand-new city.',
        mn: 'Бразилиа 1960 оноос хойш Бразилын нийслэл. Энэ хотыг цоо шинээр барьсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.capitals',
      key: 'geography.capitals.q6',
      difficulty: 2,
      prompt: { en: 'What is the capital of Kazakhstan?', mn: 'Казахстаны нийслэл юу вэ?' },
      choices: [
        { en: 'Almaty', mn: 'Алматы' },
        { en: 'Shymkent', mn: 'Шымкент' },
        { en: 'Astana', mn: 'Астана' },
        { en: 'Karaganda', mn: 'Караганда' },
      ],
      answer: 2,
      explanation: {
        en: 'Astana is the capital of Kazakhstan. Almaty is the largest city and was the capital until 1997.',
        mn: 'Астана бол Казахстаны нийслэл. Алматы хамгийн том хот бөгөөд 1997 он хүртэл нийслэл байсан.',
      },
    },

    // ── records ─────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest hot desert?', mn: 'Хамгийн том халуун цөл аль нь вэ?' },
      choices: [
        { en: 'Sahara', mn: 'Сахар цөл' },
        { en: 'Gobi', mn: 'Говь' },
        { en: 'Kalahari', mn: 'Калахари' },
        { en: 'Atacama', mn: 'Атакама' },
      ],
      answer: 0,
      explanation: {
        en: 'The Sahara in North Africa is the largest hot desert, at about 9.2 million km².',
        mn: 'Хойд Африкийн Сахар цөл ойролцоогоор 9.2 сая км² талбайтай хамгийн том халуун цөл.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q2',
      difficulty: 2,
      prompt: {
        en: 'A desert is a place with very little rain or snow. Which is the largest desert of all?',
        mn: 'Цөл гэдэг нь маш бага бороо, цас ордог газар. Хамгийн том цөл аль нь вэ?',
      },
      choices: [
        { en: 'Sahara', mn: 'Сахар цөл' },
        { en: 'Antarctica', mn: 'Антарктид' },
        { en: 'Gobi', mn: 'Говь' },
        { en: 'Arabian Desert', mn: 'Арабын цөл' },
      ],
      answer: 1,
      explanation: {
        en: 'Antarctica gets very little snow each year, so it counts as a desert — the largest one, at about 14 million km².',
        mn: 'Антарктидад жилд маш бага цас ордог тул цөлд тооцогддог — ойролцоогоор 14 сая км² талбайтай хамгийн том цөл.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q3',
      difficulty: 1,
      prompt: { en: 'Which is the deepest lake in the world?', mn: 'Дэлхийн хамгийн гүн нуур аль нь вэ?' },
      choices: [
        { en: 'Caspian Sea', mn: 'Каспийн тэнгис' },
        { en: 'Lake Tanganyika', mn: 'Танганьика нуур' },
        { en: 'Lake Superior', mn: 'Супериор нуур' },
        { en: 'Lake Baikal', mn: 'Байгаль нуур' },
      ],
      answer: 3,
      explanation: {
        en: 'Lake Baikal is about 1,642 m deep and holds about 20% of the world’s unfrozen fresh surface water.',
        mn: 'Байгаль нуур ойролцоогоор 1,642 м гүн бөгөөд дэлхийн хөлдөөгүй гадаргын цэвэр усны 20 орчим хувийг агуулдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q4',
      difficulty: 2,
      prompt: { en: 'Which is the smallest country in the world?', mn: 'Дэлхийн хамгийн жижиг улс аль нь вэ?' },
      choices: [
        { en: 'Monaco', mn: 'Монако' },
        { en: 'San Marino', mn: 'Сан-Марино' },
        { en: 'Vatican City', mn: 'Ватикан' },
        { en: 'Liechtenstein', mn: 'Лихтенштейн' },
      ],
      answer: 2,
      explanation: {
        en: 'Vatican City is the smallest country, at about 0.44 km². It is inside the city of Rome.',
        mn: 'Ватикан ойролцоогоор 0.44 км² нутагтай хамгийн жижиг улс. Энэ нь Ром хотын дотор оршдог.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q5',
      difficulty: 2,
      prompt: { en: 'Which is the largest island in the world?', mn: 'Дэлхийн хамгийн том арал аль нь вэ?' },
      choices: [
        { en: 'New Guinea', mn: 'Шинэ Гвиней' },
        { en: 'Greenland', mn: 'Гренланд' },
        { en: 'Borneo', mn: 'Борнео (Калимантан)' },
        { en: 'Madagascar', mn: 'Мадагаскар' },
      ],
      answer: 1,
      explanation: {
        en: 'Greenland is the largest island, at about 2.17 million km². Most of it is covered by ice.',
        mn: 'Гренланд ойролцоогоор 2.17 сая км² талбайтай хамгийн том арал. Ихэнх хэсэг нь мөсөөр бүрхэгдсэн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.records',
      key: 'geography.records.q6',
      difficulty: 2,
      prompt: { en: 'Which is the highest waterfall in the world?', mn: 'Дэлхийн хамгийн өндөр хүрхрээ аль нь вэ?' },
      choices: [
        { en: 'Angel Falls', mn: 'Анхель хүрхрээ' },
        { en: 'Victoria Falls', mn: 'Виктория хүрхрээ' },
        { en: 'Iguazu Falls', mn: 'Игуасу хүрхрээ' },
        { en: 'Niagara Falls', mn: 'Ниагара хүрхрээ' },
      ],
      answer: 0,
      explanation: {
        en: 'Angel Falls in Venezuela is the highest waterfall, about 979 m tall.',
        mn: 'Венесуэл дэх Анхель хүрхрээ ойролцоогоор 979 м өндөртэй хамгийн өндөр хүрхрээ.',
      },
    },

    // ── mongolia ────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q1',
      difficulty: 1,
      prompt: { en: 'What is the highest point in Mongolia?', mn: 'Монголын хамгийн өндөр цэг юу вэ?' },
      choices: [
        { en: 'Otgontenger', mn: 'Отгонтэнгэр' },
        { en: 'Sutai Khairkhan', mn: 'Сутай хайрхан' },
        { en: 'Kharkhiraa', mn: 'Хархираа' },
        { en: 'Khüiten Peak', mn: 'Хүйтэн оргил' },
      ],
      answer: 3,
      explanation: {
        en: 'Khüiten Peak in the Altai Tavan Bogd mountains is Mongolia’s highest point, at about 4,374 m.',
        mn: 'Алтай Таван Богд уулын Хүйтэн оргил ойролцоогоор 4,374 м өндөртэй, Монголын хамгийн өндөр цэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q2',
      difficulty: 1,
      prompt: { en: 'Which is the deepest lake in Mongolia?', mn: 'Монголын хамгийн гүн нуур аль нь вэ?' },
      choices: [
        { en: 'Uvs Lake', mn: 'Увс нуур' },
        { en: 'Lake Khövsgöl', mn: 'Хөвсгөл нуур' },
        { en: 'Khar-Us Lake', mn: 'Хар-Ус нуур' },
        { en: 'Buir Lake', mn: 'Буйр нуур' },
      ],
      answer: 1,
      explanation: {
        en: 'Lake Khövsgöl is about 262 m deep and holds about 70% of Mongolia’s fresh surface water.',
        mn: 'Хөвсгөл нуур ойролцоогоор 262 м гүн бөгөөд Монголын гадаргын цэвэр усны 70 орчим хувийг агуулдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q3',
      difficulty: 2,
      prompt: { en: 'About how many people live in Mongolia?', mn: 'Монголд ойролцоогоор хэдэн хүн амьдардаг вэ?' },
      choices: [
        { en: 'About 3.5 million', mn: 'Ойролцоогоор 3.5 сая' },
        { en: 'About 1 million', mn: 'Ойролцоогоор 1 сая' },
        { en: 'About 10 million', mn: 'Ойролцоогоор 10 сая' },
        { en: 'About 35 million', mn: 'Ойролцоогоор 35 сая' },
      ],
      answer: 0,
      explanation: {
        en: 'Mongolia has about 3.5 million people on about 1.56 million km² — only about 2 people per km².',
        mn: 'Монгол ойролцоогоор 1.56 сая км² нутагт 3.5 орчим сая хүн амтай — 1 км² тутамд ердөө 2 орчим хүн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q4',
      difficulty: 1,
      prompt: {
        en: 'Which large desert lies in southern Mongolia?',
        mn: 'Монголын өмнөд хэсэгт аль том цөл оршдог вэ?',
      },
      choices: [
        { en: 'Sahara', mn: 'Сахар цөл' },
        { en: 'Kalahari', mn: 'Калахари' },
        { en: 'Gobi', mn: 'Говь' },
        { en: 'Atacama', mn: 'Атакама' },
      ],
      answer: 2,
      explanation: {
        en: 'The Gobi spreads across southern Mongolia and northern China and is famous for dinosaur fossils.',
        mn: 'Говь нь Монголын өмнөд хэсэг, Хятадын хойд хэсгийг хамардаг бөгөөд үлэг гүрвэлийн олдвороор алдартай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q5',
      difficulty: 2,
      prompt: {
        en: 'Ulaanbaatar holds which world record among national capitals?',
        mn: 'Улаанбаатар улсуудын нийслэлүүдийн дунд ямар дээд амжилт эзэмшдэг вэ?',
      },
      choices: [
        { en: 'The coldest on average', mn: 'Дунджаар хамгийн хүйтэн' },
        { en: 'The hottest on average', mn: 'Дунджаар хамгийн халуун' },
        { en: 'The most people', mn: 'Хамгийн олон хүн амтай' },
        { en: 'The rainiest', mn: 'Хамгийн их бороотой' },
      ],
      answer: 0,
      explanation: {
        en: 'Ulaanbaatar is the coldest national capital on average — its yearly average temperature is around 0 °C.',
        mn: 'Улаанбаатар бол дунджаар хамгийн хүйтэн нийслэл — жилийн дундаж температур нь 0 °C орчим.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'geography.mongolia',
      key: 'geography.mongolia.q6',
      difficulty: 3,
      prompt: {
        en: 'Which is Mongolia’s largest lake by area?',
        mn: 'Талбайгаараа Монголын хамгийн том нуур аль нь вэ?',
      },
      choices: [
        { en: 'Lake Khövsgöl', mn: 'Хөвсгөл нуур' },
        { en: 'Khar-Us Lake', mn: 'Хар-Ус нуур' },
        { en: 'Buir Lake', mn: 'Буйр нуур' },
        { en: 'Uvs Lake', mn: 'Увс нуур' },
      ],
      answer: 3,
      explanation: {
        en: 'Uvs Lake is the largest by area, at about 3,350 km², but it is salty. Khövsgöl is the deepest and holds the most fresh water.',
        mn: 'Увс нуур ойролцоогоор 3,350 км² талбайтай хамгийн том нуур боловч давстай. Хөвсгөл хамгийн гүн бөгөөд хамгийн их цэвэр устай.',
      },
    },
  ],
};
