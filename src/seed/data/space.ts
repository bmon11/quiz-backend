import type { SeedBundle } from '../types';

// Solar System — the Sun, the planets, moons, small bodies and space
// exploration. Figures are rounded, well-established NASA values (moon counts
// as of 2025). Keys are stable: never rename them.

const T = 'space';

export const space: SeedBundle = {
  topic: {
    slug: T,
    order: 4,
    color: '#7C4DFF',
    icon: 'solar:planet-bold-duotone',
    effect: 'stars',
    title: { en: 'Solar System', mn: 'Нарны аймаг' },
    tagline: { en: 'The Sun, its planets and everything in between', mn: 'Нар, гарагууд болон тэдний хоорондох бүх зүйл' },
    description: {
      en: 'Tour the Sun, the eight planets, their moons, comets and dwarf planets — and meet the people and spacecraft that explored them.',
      mn: 'Нар, найман гараг, тэдгээрийн дагуул, сүүлт од, одой гарагуудаар аялж, тэднийг судалсан хүмүүс, сансрын аппаратуудтай танилцана.',
    },
  },

  lessons: [
    // 1 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.overview',
      order: 1,
      title: { en: 'Our solar system', mn: 'Манай Нарны аймаг' },
      summary: {
        en: 'Eight planets circle the Sun: four small rocky ones close in and four giants far out.',
        mn: 'Нарыг найман гараг тойрдог: ойрхон дөрвөн жижиг чулуулаг гараг, алсад дөрвөн аварга гараг.',
      },
      body: {
        en: 'Our solar system formed about 4.6 billion years ago from a spinning cloud of gas and dust. The Sun sits at the centre, and eight planets circle it: Mercury, Venus, Earth and Mars are small and rocky, while Jupiter, Saturn, Uranus and Neptune are giants. Far beyond them lies the dwarf planet Pluto. Tap any body to see its numbers.',
        mn: 'Манай Нарны аймаг 4.6 орчим тэрбум жилийн өмнө эргэлдэж буй хий, тоосны үүлнээс үүссэн. Төвд нь Нар оршиж, түүнийг найман гараг тойрдог: Буд, Сугар, Дэлхий, Ангараг жижиг, чулуулаг гарагууд бол Бархасбадь, Санчир, Тэнгэрийн ван, Далайн ван аварга гарагууд юм. Тэдний цаана одой гараг Плутон оршдог. Аль нэг биет дээр дарж тоо баримтыг нь хараарай.',
      },
      visual: {
        kind: 'orbit',
        star: {
          name: { en: 'The Sun', mn: 'Нар' },
          color: '#FDB813',
          stats: [
            { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '1.39 million km (109 Earths)', mn: '1.39 сая км (109 Дэлхий)' } },
            { label: { en: 'Surface', mn: 'Гадаргуу' }, value: { en: '≈ 5,500 °C', mn: '≈ 5,500 °C' } },
            { label: { en: 'Core', mn: 'Цөм' }, value: { en: '≈ 15 million °C', mn: '≈ 15 сая °C' } },
            { label: { en: 'Age', mn: 'Нас' }, value: { en: '4.6 billion years', mn: '4.6 тэрбум жил' } },
            { label: { en: 'Share of the mass', mn: 'Массын хувь' }, value: { en: '99.86% of the solar system', mn: 'Нарны аймгийн 99.86%' } },
          ],
          facts: [
            {
              en: 'The Sun holds 99.86% of all the mass in the solar system — everything else together is a tiny remainder.',
              mn: 'Нарны аймгийн нийт массын 99.86 хувь нь Наранд ногддог — бусад бүх зүйл нийлээд өчүүхэн үлдэгдэл л болно.',
            },
            { en: 'About 1.3 million Earths could fit inside the Sun.', mn: 'Нарны дотор 1.3 сая орчим Дэлхий багтана.' },
            {
              en: 'Sunlight takes about 8 minutes 20 seconds to reach Earth.',
              mn: 'Нарны гэрэл Дэлхийд 8 минут 20 секунд орчимд хүрдэг.',
            },
            {
              en: 'The Sun is a yellow dwarf star (type G) and is roughly halfway through its life.',
              mn: 'Нар бол G ангиллын шар одой од бөгөөд амьдралынхаа бараг талыг туулжээ.',
            },
            {
              en: 'Its core fuses about 600 million tonnes of hydrogen into helium every second.',
              mn: 'Цөм нь секунд тутамд 600 орчим сая тонн устөрөгчийг гели болгон нийлэгжүүлдэг.',
            },
          ],
        },
        bodies: [
          {
            id: 'mercury',
            name: { en: 'Mercury', mn: 'Буд' },
            kind: { en: 'Rocky planet', mn: 'Чулуулаг гараг' },
            color: '#9E9E9E',
            color2: '#6D6D6D',
            size: 2,
            distanceAu: 0.39,
            periodDays: 88,
            moons: 0,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '4,879 km', mn: '4,879 км' } },
              { label: { en: 'Day (sunrise to sunrise)', mn: 'Хоног (нар мандахаас мандах хүртэл)' }, value: { en: '176 Earth days', mn: '176 хоног' } },
              { label: { en: 'Temperature', mn: 'Температур' }, value: { en: '−180 to 430 °C', mn: '−180-аас 430 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '0.38 × Earth', mn: 'Дэлхийн 0.38' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '57.9 million km', mn: '57.9 сая км' } },
            ],
            facts: [
              { en: 'The smallest planet and the closest to the Sun.', mn: 'Хамгийн жижиг бөгөөд Нарт хамгийн ойр гараг.' },
              {
                en: 'A year lasts only 88 days, but one day from sunrise to sunrise lasts 176 Earth days — two of its years.',
                mn: 'Нэг жил нь ердөө 88 хоног, харин нар мандахаас дараагийн мандах хүртэлх нэг өдөр нь 176 хоног буюу хоёр жил үргэлжилдэг.',
              },
              {
                en: 'With almost no atmosphere, days scorch at 430 °C and nights freeze at −180 °C.',
                mn: 'Агаар мандал бараг байхгүй тул өдөр 430 °C хүртэл халж, шөнө −180 °C хүртэл хөрдөг.',
              },
              { en: 'Its surface is covered in craters, much like our Moon.', mn: 'Гадаргуу нь манай Сар шиг тогоогоор хучигдсан.' },
              { en: 'It is the fastest planet, racing around the Sun at about 47 km per second.', mn: 'Нарыг секундэд 47 орчим км хурдтай тойрдог хамгийн хурдан гараг.' },
            ],
          },
          {
            id: 'venus',
            name: { en: 'Venus', mn: 'Сугар' },
            kind: { en: 'Rocky planet', mn: 'Чулуулаг гараг' },
            color: '#E8CDA0',
            color2: '#C9A66B',
            size: 3.5,
            distanceAu: 0.72,
            periodDays: 225,
            moons: 0,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '12,104 km', mn: '12,104 км' } },
              { label: { en: 'One spin', mn: 'Тэнхлэгээ нэг эргэх' }, value: { en: '243 Earth days', mn: '243 хоног' } },
              { label: { en: 'Surface', mn: 'Гадаргуу' }, value: { en: '≈ 465 °C', mn: '≈ 465 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '0.91 × Earth', mn: 'Дэлхийн 0.91' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '108.2 million km', mn: '108.2 сая км' } },
            ],
            facts: [
              {
                en: 'The hottest planet: its thick carbon dioxide air traps heat, keeping the surface at about 465 °C — hot enough to melt lead.',
                mn: 'Хамгийн халуун гараг: нүүрсхүчлийн хийн өтгөн агаар мандал дулааныг барьж, гадаргууг 465 орчим °C-т байлгадаг — хар тугалга хайлах хэмжээний халуун.',
              },
              {
                en: 'It spins backwards compared with most planets, so the Sun rises in the west.',
                mn: 'Ихэнх гарагаас эсрэг чиглэлд эргэдэг тул тэнд нар баруунаас мандана.',
              },
              {
                en: 'One spin takes 243 Earth days — longer than its 225-day year.',
                mn: 'Тэнхлэгээ нэг тойроход 243 хоног зарцуулдаг нь 225 хоногийн жилээсээ урт.',
              },
              {
                en: 'Its clouds are made of sulphuric acid, and the air pressure at the surface is about 90 times Earth’s.',
                mn: 'Үүл нь хүхрийн хүчлээс тогтох бөгөөд гадаргын агаарын даралт Дэлхийнхээс 90 орчим дахин их.',
              },
              {
                en: 'After the Moon it is the brightest natural object in the night sky, often called the Morning or Evening Star.',
                mn: 'Шөнийн тэнгэрт Сарын дараа хамгийн тод гэрэлтдэг тул Цолмон од гэж нэрлэгддэг.',
              },
            ],
          },
          {
            id: 'earth',
            name: { en: 'Earth', mn: 'Дэлхий' },
            kind: { en: 'Rocky planet', mn: 'Чулуулаг гараг' },
            color: '#2E7DD7',
            color2: '#3FA34D',
            size: 3.5,
            distanceAu: 1,
            periodDays: 365.25,
            moons: 1,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '12,756 km', mn: '12,756 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '24 hours', mn: '24 цаг' } },
              { label: { en: 'Average temperature', mn: 'Дундаж температур' }, value: { en: '≈ 15 °C', mn: '≈ 15 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '1 g', mn: '1 g' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '149.6 million km (1 AU)', mn: '149.6 сая км (1 о.о.н)' } },
            ],
            facts: [
              { en: 'The only place in the universe known to have life.', mn: 'Орчлонд амьдралтай гэж мэдэгдэж буй цорын ганц газар.' },
              { en: 'About 71% of its surface is covered by liquid water.', mn: 'Гадаргын 71 орчим хувийг шингэн ус эзэлдэг.' },
              { en: 'It is the densest planet in the solar system.', mn: 'Нарны аймгийн хамгийн нягт гараг.' },
              {
                en: 'Its axis is tilted about 23.4°, which is why we have seasons.',
                mn: 'Тэнхлэг нь 23.4 орчим градус хазайсан нь улирал солигдох шалтгаан юм.',
              },
              {
                en: 'Its magnetic field shields us from the solar wind and lights up auroras near the poles.',
                mn: 'Соронзон орон нь биднийг нарны салхинаас хамгаалж, туйлын ойролцоо туйлын туяа үүсгэдэг.',
              },
            ],
          },
          {
            id: 'mars',
            name: { en: 'Mars', mn: 'Ангараг' },
            kind: { en: 'Rocky planet', mn: 'Чулуулаг гараг' },
            color: '#C1440E',
            color2: '#8B3A1A',
            size: 2.5,
            distanceAu: 1.52,
            periodDays: 687,
            moons: 2,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '6,792 km', mn: '6,792 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '24 h 37 min', mn: '24 цаг 37 мин' } },
              { label: { en: 'Average temperature', mn: 'Дундаж температур' }, value: { en: '≈ −65 °C', mn: '≈ −65 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '0.38 × Earth', mn: 'Дэлхийн 0.38' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '227.9 million km', mn: '227.9 сая км' } },
            ],
            facts: [
              { en: 'Its red colour comes from iron oxide — rust — in its dust.', mn: 'Улаан өнгө нь тоосонд нь буй төмрийн исэл буюу зэвнээс үүдэлтэй.' },
              {
                en: 'It has Olympus Mons, the tallest volcano in the solar system at about 22 km.',
                mn: 'Нарны аймгийн хамгийн өндөр галт уул болох 22 орчим км өндөр Олимп уул энд бий.',
              },
              { en: 'Two small, lumpy moons circle it: Phobos and Deimos.', mn: 'Фобос, Деймос гэсэн хоёр жижиг, овгор дагуултай.' },
              { en: 'A Martian day is only about 37 minutes longer than ours.', mn: 'Ангарагийн нэг хоног манайхаас ердөө 37 орчим минутаар урт.' },
              {
                en: 'Dry riverbeds and lakebeds show that water once flowed on its surface.',
                mn: 'Ширгэсэн голын хөндий, нуурын ёроол нь эрт цагт гадаргуу дээр нь ус урсаж байсныг харуулдаг.',
              },
            ],
          },
          {
            id: 'jupiter',
            name: { en: 'Jupiter', mn: 'Бархасбадь' },
            kind: { en: 'Gas giant', mn: 'Хийн аварга' },
            color: '#D8B48A',
            color2: '#B07A4F',
            size: 10,
            distanceAu: 5.2,
            periodDays: 4333,
            moons: 95,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '142,984 km', mn: '142,984 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '9 h 56 min', mn: '9 цаг 56 мин' } },
              { label: { en: 'Cloud tops', mn: 'Үүлний орой' }, value: { en: '≈ −110 °C', mn: '≈ −110 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '2.4 × Earth', mn: 'Дэлхийн 2.4' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '778.5 million km', mn: '778.5 сая км' } },
            ],
            facts: [
              {
                en: 'The largest planet — more than twice as massive as all the other planets combined.',
                mn: 'Хамгийн том гараг — бусад бүх гарагийг нийлүүлснээс хоёр дахин илүү масстай.',
              },
              { en: 'About 1,300 Earths could fit inside it.', mn: 'Дотор нь 1,300 орчим Дэлхий багтана.' },
              {
                en: 'The Great Red Spot is a storm wider than Earth that has raged for at least 150 years.',
                mn: 'Их улаан толбо бол Дэлхийгээс өргөн, дор хаяж 150 жил үргэлжилж буй шуурга.',
              },
              { en: 'It spins the fastest: a day lasts less than 10 hours.', mn: 'Хамгийн хурдан эргэдэг: нэг хоног нь 10 цаг хүрэхгүй.' },
              {
                en: 'Its four big moons — Io, Europa, Ganymede and Callisto — were found by Galileo in 1610.',
                mn: 'Ио, Европа, Ганимед, Каллисто гэсэн дөрвөн том дагуулыг нь 1610 онд Галилей нээсэн.',
              },
            ],
          },
          {
            id: 'saturn',
            name: { en: 'Saturn', mn: 'Санчир' },
            kind: { en: 'Gas giant', mn: 'Хийн аварга' },
            color: '#E3C16F',
            color2: '#B8955A',
            size: 9,
            distanceAu: 9.54,
            periodDays: 10759,
            ring: true,
            moons: 274,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '120,536 km', mn: '120,536 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '10 h 34 min', mn: '10 цаг 34 мин' } },
              { label: { en: 'Cloud tops', mn: 'Үүлний орой' }, value: { en: '≈ −140 °C', mn: '≈ −140 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '1.07 × Earth', mn: 'Дэлхийн 1.07' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '1.43 billion km', mn: '1.43 тэрбум км' } },
            ],
            facts: [
              {
                en: 'Its famous rings are made of countless pieces of ice and rock, from dust grains to house-sized chunks.',
                mn: 'Алдарт цагираг нь тоосны ширхгээс эхлээд байшин хэрийн хэмжээтэй тоолж баршгүй олон мөс, чулууны хэлтэрхийнээс тогтдог.',
              },
              {
                en: 'The rings reach about 280,000 km from the planet, yet the main rings are mostly only about 10 metres thick.',
                mn: 'Цагираг нь гарагаас 280,000 орчим км хүртэл үргэлжилдэг ч гол цагирагууд нь ихэнхдээ ердөө 10 орчим метр зузаан.',
              },
              {
                en: 'On average it is less dense than water — it would float in a giant bathtub.',
                mn: 'Дундаж нягт нь уснаас бага тул аварга том ваннд хөвөх байсан.',
              },
              { en: 'With 274 known moons it has more than any other planet.', mn: '274 мэдэгдэж буй дагуултай нь бусад бүх гарагаас олон.' },
              {
                en: 'Its largest moon, Titan, has a thick atmosphere and lakes of liquid methane.',
                mn: 'Хамгийн том дагуул Титан нь өтгөн агаар мандал, шингэн метаны нууртай.',
              },
            ],
          },
          {
            id: 'uranus',
            name: { en: 'Uranus', mn: 'Тэнгэрийн ван' },
            kind: { en: 'Ice giant', mn: 'Мөсөн аварга' },
            color: '#9FE3E8',
            color2: '#5BC0C9',
            size: 6,
            distanceAu: 19.2,
            periodDays: 30687,
            ring: true,
            moons: 29,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '51,118 km', mn: '51,118 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '17 h 14 min', mn: '17 цаг 14 мин' } },
              { label: { en: 'Coldest', mn: 'Хамгийн хүйтэн' }, value: { en: '≈ −224 °C', mn: '≈ −224 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '0.89 × Earth', mn: 'Дэлхийн 0.89' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '2.87 billion km', mn: '2.87 тэрбум км' } },
            ],
            facts: [
              { en: 'It spins on its side, tilted about 98°, rolling around the Sun like a ball.', mn: 'Тэнхлэг нь 98 орчим градус хазайсан тул Нарыг бөмбөг шиг өнхрөн тойрдог.' },
              {
                en: 'Because of that tilt, each pole gets about 42 years of sunlight followed by 42 years of darkness.',
                mn: 'Ийм хазайлтаас болж туйл бүр нь 42 орчим жил нартай, дараа нь 42 жил харанхуй байдаг.',
              },
              { en: 'It has the coldest atmosphere of any planet, down to about −224 °C.', mn: 'Гарагуудаас хамгийн хүйтэн агаар мандалтай — −224 °C хүртэл хүйтэрдэг.' },
              {
                en: 'It was the first planet found with a telescope, by William Herschel in 1781.',
                mn: 'Дурангаар нээгдсэн анхны гараг — 1781 онд Уильям Гершель нээжээ.',
              },
              { en: 'Methane gas in its air gives it a blue-green colour.', mn: 'Агаар мандал дахь метан хий нь түүнд хөх ногоон өнгө өгдөг.' },
            ],
          },
          {
            id: 'neptune',
            name: { en: 'Neptune', mn: 'Далайн ван' },
            kind: { en: 'Ice giant', mn: 'Мөсөн аварга' },
            color: '#3E66F9',
            color2: '#1B3A9E',
            size: 6,
            distanceAu: 30.1,
            periodDays: 60190,
            moons: 16,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '49,528 km', mn: '49,528 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '16 h 6 min', mn: '16 цаг 6 мин' } },
              { label: { en: 'Temperature', mn: 'Температур' }, value: { en: '≈ −200 °C', mn: '≈ −200 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '1.14 × Earth', mn: 'Дэлхийн 1.14' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '4.5 billion km', mn: '4.5 тэрбум км' } },
            ],
            facts: [
              { en: 'The farthest planet: one trip around the Sun takes about 165 Earth years.', mn: 'Хамгийн алс гараг: Нарыг нэг тойроход 165 орчим жил зарцуулдаг.' },
              { en: 'It has the fastest winds in the solar system — up to about 2,100 km/h.', mn: 'Нарны аймгийн хамгийн хүчтэй салхитай — цагт 2,100 орчим км хүрдэг.' },
              {
                en: 'It was found in 1846 by mathematics: astronomers predicted where it must be before anyone saw it.',
                mn: '1846 онд математикаар олдсон: хэн нэгэн харахаас өмнө одон орон судлаачид хаана байх ёстойг нь тооцоолжээ.',
              },
              {
                en: 'It completed its first full orbit since its discovery only in 2011.',
                mn: 'Нээгдсэнээсээ хойш Нарыг анх удаа бүтэн тойрсон нь ердөө 2011 он байлаа.',
              },
              { en: 'Its largest moon, Triton, orbits backwards.', mn: 'Хамгийн том дагуул Тритон нь урвуу чиглэлд тойрдог.' },
            ],
          },
          {
            id: 'pluto',
            name: { en: 'Pluto', mn: 'Плутон' },
            kind: { en: 'Dwarf planet', mn: 'Одой гараг' },
            color: '#D9C2A3',
            color2: '#A88B6A',
            size: 1.5,
            distanceAu: 39.5,
            periodDays: 90560,
            moons: 5,
            stats: [
              { label: { en: 'Diameter', mn: 'Голч' }, value: { en: '2,377 km', mn: '2,377 км' } },
              { label: { en: 'Day', mn: 'Хоног' }, value: { en: '6.4 Earth days', mn: '6.4 хоног' } },
              { label: { en: 'Temperature', mn: 'Температур' }, value: { en: '≈ −230 °C', mn: '≈ −230 °C' } },
              { label: { en: 'Gravity', mn: 'Таталцал' }, value: { en: '0.06 × Earth', mn: 'Дэлхийн 0.06' } },
              { label: { en: 'From the Sun', mn: 'Нарнаас' }, value: { en: '5.9 billion km (average)', mn: '5.9 тэрбум км (дундаж)' } },
            ],
            facts: [
              {
                en: 'Discovered in 1930 by Clyde Tombaugh, it was reclassified as a dwarf planet in 2006.',
                mn: '1930 онд Клайд Томбо нээсэн бөгөөд 2006 онд одой гараг гэж дахин ангилсан.',
              },
              { en: 'It is smaller than our own Moon.', mn: 'Манай Сараас ч жижиг.' },
              {
                en: 'A huge heart-shaped plain of nitrogen ice, Tombaugh Regio, covers part of its surface.',
                mn: 'Гадаргуу дээр нь азотын мөсөөр бүрхэгдсэн зүрх хэлбэрийн асар том тал — Томбогийн муж бий.',
              },
              { en: 'One trip around the Sun takes about 248 Earth years.', mn: 'Нарыг нэг тойроход 248 орчим жил зарцуулдаг.' },
              {
                en: 'Its moon Charon is about half its size, and the two always show each other the same face.',
                mn: 'Дагуул Харон нь Плутоны хагас орчим хэмжээтэй бөгөөд хоёулаа бие бие рүүгээ үргэлж нэг талаараа хандсан байдаг.',
              },
            ],
          },
        ],
      },
      funFacts: [
        {
          en: 'One astronomical unit (AU) — the Earth–Sun distance — is about 150 million km.',
          mn: 'Нэг одон орны нэгж (о.о.н) буюу Дэлхий–Нарны зай нь 150 орчим сая км.',
        },
        {
          en: 'All eight planets orbit in the same direction and in almost the same flat plane.',
          mn: 'Найман гараг бүгд нэг чиглэлд, бараг нэг хавтгайд Нарыг тойрдог.',
        },
        {
          en: 'The whole solar system circles the centre of the Milky Way once every 230 million years or so.',
          mn: 'Нарны аймаг бүхэлдээ Сүүн замын төвийг 230 орчим сая жилд нэг тойрдог.',
        },
        {
          en: 'Jupiter and Saturn are mostly hydrogen and helium; Uranus and Neptune hold more water, ammonia and methane ice.',
          mn: 'Бархасбадь, Санчир голдуу устөрөгч, гелиэс тогтдог бол Тэнгэрийн ван, Далайн ван илүү их ус, аммиак, метаны мөстэй.',
        },
      ],
    },

    // 2 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.sizes',
      order: 2,
      title: { en: 'Planet sizes', mn: 'Гарагуудын хэмжээ' },
      summary: {
        en: 'Jupiter is about 11 times wider than Earth, while Mercury is not much bigger than our Moon.',
        mn: 'Бархасбадь Дэлхийгээс 11 орчим дахин өргөн бол Буд манай Сараас нэг их том биш.',
      },
      body: {
        en: 'The planets come in two very different sizes. Jupiter is about 11 times wider than Earth, and Saturn is nearly as big. Uranus and Neptune are about four times wider than Earth. The four rocky planets are tiny by comparison, and Venus is almost exactly Earth’s size.',
        mn: 'Гарагууд хэмжээгээрээ эрс ялгаатай хоёр бүлэгт хуваагддаг. Бархасбадь Дэлхийгээс 11 орчим дахин өргөн, Санчир бараг түүнтэй адил том. Тэнгэрийн ван, Далайн ван Дэлхийгээс 4 орчим дахин өргөн. Дөрвөн чулуулаг гараг тэдэнтэй харьцуулахад өчүүхэн бөгөөд Сугар бараг яг Дэлхийн хэмжээтэй.',
      },
      visual: {
        kind: 'bar',
        horizontal: true,
        unit: { en: 'km across (diameter)', mn: 'км (голч)' },
        items: [
          { label: { en: 'Jupiter', mn: 'Бархасбадь' }, value: 142984, note: { en: 'About 11 Earths across', mn: 'Хөндлөнгөөрөө 11 орчим Дэлхий' } },
          { label: { en: 'Saturn', mn: 'Санчир' }, value: 120536, note: { en: 'Not counting its rings', mn: 'Цагиргийг тооцохгүйгээр' } },
          { label: { en: 'Uranus', mn: 'Тэнгэрийн ван' }, value: 51118 },
          { label: { en: 'Neptune', mn: 'Далайн ван' }, value: 49528 },
          { label: { en: 'Earth', mn: 'Дэлхий' }, value: 12756 },
          { label: { en: 'Venus', mn: 'Сугар' }, value: 12104, note: { en: 'About 95% of Earth’s width', mn: 'Дэлхийн өргөний 95 орчим хувь' } },
          { label: { en: 'Mars', mn: 'Ангараг' }, value: 6792, note: { en: 'About half of Earth’s width', mn: 'Дэлхийн өргөний тал орчим' } },
          { label: { en: 'Mercury', mn: 'Буд' }, value: 4879 },
          { label: { en: 'The Moon', mn: 'Сар' }, value: 3475, note: { en: 'Earth’s Moon, for comparison', mn: 'Харьцуулах зорилгоор — Дэлхийн дагуул' } },
          { label: { en: 'Pluto', mn: 'Плутон' }, value: 2377, note: { en: 'Dwarf planet', mn: 'Одой гараг' } },
        ],
      },
      funFacts: [
        { en: 'The Sun is about 109 times wider than Earth.', mn: 'Нар Дэлхийгээс 109 орчим дахин өргөн.' },
        { en: 'About 1,300 Earths could fit inside Jupiter.', mn: 'Бархасбадийн дотор 1,300 орчим Дэлхий багтана.' },
        {
          en: 'Two moons — Jupiter’s Ganymede and Saturn’s Titan — are wider than the planet Mercury.',
          mn: 'Бархасбадийн Ганимед, Санчирын Титан гэсэн хоёр дагуул Буд гарагаас ч өргөн.',
        },
        {
          en: 'Jupiter bulges at the middle: its fast spin makes it about 7% wider at the equator than pole to pole.',
          mn: 'Бархасбадь хурдан эргэдэг тул экваторын орчим 7 орчим хувиар илүү өргөн, хавтгайвтар хэлбэртэй.',
        },
      ],
    },

    // 3 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.distances',
      order: 3,
      title: { en: 'Distances from the Sun', mn: 'Нарнаас холдох зай' },
      summary: {
        en: 'Light from the Sun reaches Earth in 8 minutes 20 seconds, but needs over 4 hours to reach Neptune.',
        mn: 'Нарны гэрэл Дэлхийд 8 минут 20 секундэд хүрдэг ч Далайн ванд хүрэхэд 4 цаг гаруй хэрэгтэй.',
      },
      body: {
        en: 'Space is mostly empty, and the gaps grow quickly as you move outward. The four rocky planets huddle close to the Sun, while the giants are spread far apart — Neptune is about 30 times farther from the Sun than Earth. Light travels about 300,000 km every second, so astronomers often measure these gaps in light-minutes and light-hours.',
        mn: 'Сансар ихэнхдээ хоосон бөгөөд гадагшлах тусам зай хурдан нэмэгддэг. Дөрвөн чулуулаг гараг Нартаа ойрхон шавааралдсан бол аварга гарагууд хол хол тархсан — Далайн ван Нарнаас Дэлхийгээс 30 орчим дахин хол оршдог. Гэрэл секундэд 300,000 орчим км явдаг тул одон орон судлаачид эдгээр зайг ихэвчлэн гэрлийн минут, гэрлийн цагаар хэмждэг.',
      },
      visual: {
        kind: 'bar',
        horizontal: true,
        unit: { en: 'million km from the Sun', mn: 'Нарнаас, сая км' },
        items: [
          { label: { en: 'Mercury', mn: 'Буд' }, value: 57.9, note: { en: 'Sunlight: about 3 min', mn: 'Нарны гэрэл: 3 орчим мин' } },
          { label: { en: 'Venus', mn: 'Сугар' }, value: 108.2, note: { en: 'Sunlight: about 6 min', mn: 'Нарны гэрэл: 6 орчим мин' } },
          { label: { en: 'Earth', mn: 'Дэлхий' }, value: 149.6, note: { en: 'Sunlight: 8 min 20 s', mn: 'Нарны гэрэл: 8 мин 20 сек' } },
          { label: { en: 'Mars', mn: 'Ангараг' }, value: 227.9, note: { en: 'Sunlight: about 13 min', mn: 'Нарны гэрэл: 13 орчим мин' } },
          { label: { en: 'Jupiter', mn: 'Бархасбадь' }, value: 778.5, note: { en: 'Sunlight: about 43 min', mn: 'Нарны гэрэл: 43 орчим мин' } },
          { label: { en: 'Saturn', mn: 'Санчир' }, value: 1432, note: { en: 'Sunlight: about 1 h 20 min', mn: 'Нарны гэрэл: 1 цаг 20 орчим мин' } },
          { label: { en: 'Uranus', mn: 'Тэнгэрийн ван' }, value: 2867, note: { en: 'Sunlight: about 2 h 40 min', mn: 'Нарны гэрэл: 2 цаг 40 орчим мин' } },
          { label: { en: 'Neptune', mn: 'Далайн ван' }, value: 4515, note: { en: 'Sunlight: about 4 h 10 min', mn: 'Нарны гэрэл: 4 цаг 10 орчим мин' } },
          { label: { en: 'Pluto', mn: 'Плутон' }, value: 5906, note: { en: 'Sunlight: about 5.5 h (average distance)', mn: 'Нарны гэрэл: 5.5 орчим цаг (дундаж зай)' } },
        ],
      },
      funFacts: [
        {
          en: 'Because light takes 8 minutes 20 seconds to arrive, you always see the Sun as it was a few minutes ago.',
          mn: 'Гэрэл 8 минут 20 секундэд ирдэг тул бид Нарыг үргэлж хэдэн минутын өмнөх байдлаар нь хардаг.',
        },
        {
          en: 'Driving a car non-stop at 100 km/h, you would need about 170 years to reach the Sun.',
          mn: 'Цагт 100 км хурдтай машинаар зогсолтгүй явбал Нарт хүрэхэд 170 орчим жил шаардлагатай.',
        },
        {
          en: 'The distance between Earth and Mars changes from about 55 million km to about 400 million km as both circle the Sun.',
          mn: 'Дэлхий, Ангараг хоёр Нарыг тойрох явцад хоорондын зай нь 55 орчим сая км-ээс 400 орчим сая км хүртэл өөрчлөгддөг.',
        },
        {
          en: 'The nearest star after the Sun, Proxima Centauri, is about 4.2 light-years away — light needs over four years to cross that gap.',
          mn: 'Нарны дараах хамгийн ойр од Проксима Кентавр 4.2 орчим гэрлийн жилийн зайтай — гэрэл тэр зайг дөрвөн жил гаруйд туулдаг.',
        },
      ],
    },

    // 4 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.sun',
      order: 4,
      title: { en: 'The Sun, our star', mn: 'Нар — бидний од' },
      summary: {
        en: 'The Sun is a giant ball of hot plasma that makes its energy by fusing hydrogen into helium.',
        mn: 'Нар бол устөрөгчийг гели болгон нийлэгжүүлж энерги гаргадаг халуун плазмын аварга бөмбөлөг.',
      },
      body: {
        en: 'The Sun is a star made mostly of hydrogen (about 73%) and helium (about 25%). Deep in its core, nuclear fusion releases enormous energy, which slowly works its way out through several layers before escaping as light. The Sun is about 4.6 billion years old; in roughly 5 billion years it will swell into a red giant and finally shrink into a white dwarf.',
        mn: 'Нар бол голдуу устөрөгч (73 орчим хувь), гели (25 орчим хувь)-ээс тогтох од юм. Гүн цөмд нь цөмийн нийлэгжилт асар их энерги ялгаруулж, энэ энерги хэд хэдэн давхаргыг удаан нэвтэрсний эцэст гэрэл болон гарна. Нар 4.6 орчим тэрбум настай; 5 орчим тэрбум жилийн дараа улаан аварга од болон томорч, эцэст нь агшиж цагаан одой болно.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Core', mn: 'Цөм' },
            subtitle: { en: 'About 15 million °C', mn: '15 орчим сая °C' },
            facts: [
              { en: 'Hydrogen nuclei fuse into helium, releasing the energy that powers the Sun', mn: 'Устөрөгчийн цөмүүд нийлж гели болох үед Нарны энерги ялгардаг' },
              { en: 'About 600 million tonnes of hydrogen are fused every second', mn: 'Секунд тутамд 600 орчим сая тонн устөрөгч нийлэгждэг' },
            ],
            icon: '🔥',
            color: '#FF6B35',
          },
          {
            title: { en: 'Radiative zone', mn: 'Цацрагийн бүс' },
            subtitle: { en: 'Light takes a long, zigzag path', mn: 'Гэрэл удаан, зигзаг замаар явна' },
            facts: [
              { en: 'Energy bounces from particle to particle as light', mn: 'Энерги гэрэл хэлбэрээр бөөмсөөс бөөмс рүү ойж явдаг' },
              { en: 'Crossing this zone can take over 100,000 years', mn: 'Энэ бүсийг туулахад 100,000 гаруй жил шаардагдаж болно' },
            ],
            icon: '🌀',
            color: '#FF8C42',
          },
          {
            title: { en: 'Convective zone', mn: 'Конвекцийн бүс' },
            subtitle: { en: 'Boiling like a pot of soup', mn: 'Буцалж буй шөл шиг' },
            facts: [
              { en: 'Hot plasma rises, cools at the top and sinks again', mn: 'Халуун плазм дээш хөөрч, оройд хөрөөд буцан живдэг' },
              { en: 'It makes the grainy “granulation” pattern on the surface', mn: 'Гадаргуу дээр мөхлөг шиг хээ (грануляци) үүсгэдэг' },
            ],
            icon: '♨️',
            color: '#FFA62B',
          },
          {
            title: { en: 'Photosphere', mn: 'Фотосфер' },
            subtitle: { en: 'The visible surface, about 5,500 °C', mn: 'Харагдах гадаргуу, 5,500 орчим °C' },
            facts: [
              { en: 'This is the layer we see; the light leaving it reaches Earth in 8 min 20 s', mn: 'Бидний хардаг давхарга; эндээс гарсан гэрэл Дэлхийд 8 мин 20 секундэд хүрдэг' },
              { en: 'Never look at it directly — it damages eyes', mn: 'Шууд бүү хар — нүдийг гэмтээдэг' },
            ],
            icon: '☀️',
            color: '#FDB813',
          },
          {
            title: { en: 'Corona', mn: 'Нарны титэм' },
            subtitle: { en: 'Over 1 million °C', mn: '1 сая гаруй °C' },
            facts: [
              { en: 'The thin outer atmosphere is far hotter than the surface — still a puzzle for scientists', mn: 'Нимгэн гадна агаар мандал нь гадаргуугаас хамаагүй халуун — эрдэмтдийн хувьд одоо ч оньсого' },
              { en: 'We can see it with the naked eye only during a total solar eclipse', mn: 'Энгийн нүдээр зөвхөн нар бүтэн хиртэх үед харагддаг' },
            ],
            icon: '👑',
            color: '#FFE08A',
          },
          {
            title: { en: 'Solar wind', mn: 'Нарны салхи' },
            subtitle: { en: 'About 400 km per second', mn: 'Секундэд 400 орчим км' },
            facts: [
              { en: 'A constant stream of charged particles flowing out from the corona', mn: 'Титмээс тасралтгүй урсах цэнэгтэй бөөмсийн урсгал' },
              { en: 'When it hits Earth’s magnetic field, it lights up auroras', mn: 'Дэлхийн соронзон оронд тулахдаа туйлын туяа үүсгэдэг' },
            ],
            icon: '💨',
            color: '#7FC8F8',
          },
          {
            title: { en: 'Sunspots and flares', mn: 'Нарны толбо ба дэлбэрэлт' },
            subtitle: { en: 'An 11-year cycle', mn: '11 жилийн мөчлөг' },
            facts: [
              { en: 'Sunspots are cooler (about 3,500 °C) areas, so they look dark', mn: 'Нарны толбо харьцангуй хүйтэн (3,500 орчим °C) тул бараан харагддаг' },
              { en: 'Big flares can disturb satellites, radio and power grids', mn: 'Хүчтэй дэлбэрэлт хиймэл дагуул, радио холбоо, цахилгаан сүлжээг саатуулж болно' },
            ],
            icon: '⚡',
            color: '#E85D04',
          },
        ],
      },
      funFacts: [
        {
          en: 'The Sun is not burning like a fire — it shines because of nuclear fusion, which needs no oxygen.',
          mn: 'Нар гал шиг шатдаггүй — хүчилтөрөгч шаарддаггүй цөмийн нийлэгжилтийн ачаар гэрэлтдэг.',
        },
        {
          en: 'The Sun spins faster at its equator (about 25 days) than near its poles (about 35 days).',
          mn: 'Нар экватор дээрээ (25 орчим хоног) туйлынхаа ойролцоохоос (35 орчим хоног) хурдан эргэдэг.',
        },
        {
          en: 'NASA’s Parker Solar Probe flew within about 6 million km of the Sun’s surface in 2024 — the closest any spacecraft has come.',
          mn: 'NASA-гийн «Паркер» сансрын аппарат 2024 онд Нарны гадаргуугаас 6 орчим сая км-т ойртсон нь сансрын аппаратын хүрсэн хамгийн ойр зай.',
        },
        {
          en: 'The Sun is too small to explode as a supernova; it will end as a white dwarf about the size of Earth.',
          mn: 'Нар супернова болж дэлбэрэхэд хэтэрхий жижиг; эцэст нь Дэлхий хэрийн хэмжээтэй цагаан одой болно.',
        },
      ],
    },

    // 5 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.moon',
      order: 5,
      title: { en: 'Earth’s Moon', mn: 'Дэлхийн дагуул Сар' },
      summary: {
        en: 'The Moon is about 384,400 km away, always shows us the same face and drives the ocean tides.',
        mn: 'Сар 384,400 орчим км-ийн зайтай, бидэнд үргэлж нэг талаараа харагдах бөгөөд далайн түрлэгийг үүсгэдэг.',
      },
      body: {
        en: 'The Moon is Earth’s only natural satellite. It probably formed about 4.5 billion years ago from debris thrown out when a Mars-sized body crashed into the young Earth. It is about a quarter of Earth’s width, has no air, and is the only other world people have walked on.',
        mn: 'Сар бол Дэлхийн цорын ганц байгалийн дагуул. Ангарагийн хэмжээтэй биет залуу Дэлхийтэй мөргөлдөхөд цацагдсан хэлтэрхийнээс 4.5 орчим тэрбум жилийн өмнө үүссэн байх магадлалтай. Дэлхийн өргөний дөрөвний нэг орчим хэмжээтэй, агааргүй бөгөөд хүн хөл тавьсан цорын ганц өөр ертөнц юм.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Distance', mn: 'Зай' },
            subtitle: { en: 'About 384,400 km', mn: '384,400 орчим км' },
            facts: [
              { en: 'Light covers it in about 1.3 seconds', mn: 'Гэрэл энэ зайг 1.3 орчим секундэд туулдаг' },
              { en: 'The Moon drifts away from Earth by about 3.8 cm a year', mn: 'Сар жил бүр Дэлхийгээс 3.8 орчим см холдож байна' },
            ],
            icon: '📏',
            color: '#B0BEC5',
          },
          {
            title: { en: 'Size and gravity', mn: 'Хэмжээ ба таталцал' },
            subtitle: { en: '3,475 km across', mn: 'Голч 3,475 км' },
            facts: [
              { en: 'About a quarter of Earth’s width', mn: 'Дэлхийн өргөний дөрөвний нэг орчим' },
              { en: 'Gravity is about 1/6 of Earth’s — you could jump six times higher', mn: 'Таталцал нь Дэлхийнхийн 1/6 орчим — зургаа дахин өндөр үсэрч чадна' },
            ],
            icon: '🌕',
            color: '#CFD8DC',
          },
          {
            title: { en: 'Phases', mn: 'Сарны хувирал' },
            subtitle: { en: 'A 29.5-day cycle', mn: '29.5 хоногийн мөчлөг' },
            facts: [
              { en: 'New moon → crescent → first quarter → full moon → last quarter', mn: 'Шинэ сар → хавирган сар → эхний хагас → тэргэл сар → сүүлчийн хагас' },
              { en: 'The Moon makes no light; it reflects sunlight', mn: 'Сар өөрөө гэрэл гаргадаггүй, нарны гэрлийг ойлгодог' },
            ],
            icon: '🌓',
            color: '#90A4AE',
          },
          {
            title: { en: 'Same face', mn: 'Үргэлж нэг тал' },
            subtitle: { en: 'Tidally locked', mn: 'Түрлэгийн түгжрэл' },
            facts: [
              { en: 'It spins exactly once per orbit (about 27.3 days), so one side always faces us', mn: 'Нэг тойрох хугацаандаа (27.3 орчим хоног) яг нэг эргэдэг тул нэг тал нь үргэлж бидэн рүү хандана' },
              { en: 'The far side is not dark — it gets sunlight too; we just never see it from Earth', mn: 'Ар тал нь харанхуй биш — нарны гэрэл тусдаг, зүгээр л Дэлхийгээс харагддаггүй' },
            ],
            icon: '🌗',
            color: '#78909C',
          },
          {
            title: { en: 'Tides', mn: 'Далайн түрлэг' },
            subtitle: { en: 'The Moon’s pull on the oceans', mn: 'Сарны таталцал далайг татна' },
            facts: [
              { en: 'Moon gravity raises bulges of water, giving most coasts two high tides a day', mn: 'Сарны таталцал усыг товойлгож, ихэнх эрэгт өдөрт хоёр удаа түрлэг үүсгэдэг' },
              { en: 'The Sun adds a smaller pull, making extra-high “spring tides” at new and full moon', mn: 'Нар бага зэрэг нэмж татдаг тул шинэ болон тэргэл сарын үеэр түрлэг илүү өндөр байдаг' },
            ],
            icon: '🌊',
            color: '#4FC3F7',
          },
          {
            title: { en: 'Eclipses', mn: 'Хиртэлт' },
            subtitle: { en: 'Sun, Moon and Earth in a line', mn: 'Нар, Сар, Дэлхий нэг шугамд' },
            facts: [
              { en: 'Solar eclipse: the Moon passes between the Sun and Earth', mn: 'Нар хиртэлт: Сар Нар, Дэлхий хоёрын дундуур өнгөрнө' },
              { en: 'Lunar eclipse: Earth’s shadow covers the Moon, often turning it coppery red', mn: 'Сар хиртэлт: Дэлхийн сүүдэр Сарыг халхалж, ихэвчлэн зэс улаан өнгөтэй болгоно' },
            ],
            icon: '🌑',
            color: '#5C6BC0',
          },
          {
            title: { en: 'Apollo', mn: 'Аполлон' },
            subtitle: { en: 'Apollo 11, 20 July 1969', mn: '«Аполлон-11», 1969 оны 7-р сарын 20' },
            facts: [
              { en: 'Neil Armstrong and Buzz Aldrin were the first people to walk on the Moon', mn: 'Нил Армстронг, Базз Олдрин нар Сар дээр хөл тавьсан анхны хүмүүс' },
              { en: '12 astronauts walked on the Moon between 1969 and 1972', mn: '1969–1972 онд нийт 12 сансрын нисэгч Сар дээр алхсан' },
            ],
            icon: '👨‍🚀',
            color: '#FFFFFF',
          },
          {
            title: { en: 'Artemis', mn: 'Артемис' },
            subtitle: { en: 'Going back to the Moon', mn: 'Сар руу эргэн очих' },
            facts: [
              { en: 'Artemis I flew an uncrewed Orion capsule around the Moon in 2022', mn: '«Артемис I» 2022 онд нисгэгчгүй «Орион» хөлгийг Сарыг тойруулан нисгэсэн' },
              { en: 'Artemis II carries four astronauts around the Moon; later missions aim to land near the south pole', mn: '«Артемис II» дөрвөн сансрын нисэгчийг Сарыг тойруулна; дараагийн нислэгүүд өмнөд туйлын ойролцоо газардахаар төлөвлөж байна' },
            ],
            icon: '🚀',
            color: '#7C4DFF',
          },
        ],
      },
      funFacts: [
        {
          en: 'The Sun is about 400 times wider than the Moon but also about 400 times farther away, so both look the same size in our sky.',
          mn: 'Нар Сараас 400 орчим дахин өргөн ч 400 орчим дахин хол байдаг тул тэнгэрт хоёулаа ижил хэмжээтэй харагддаг.',
        },
        {
          en: 'With no wind or rain, the astronauts’ footprints on the Moon can last for millions of years.',
          mn: 'Салхи, бороо байхгүй тул сансрын нисэгчдийн Сар дээрх мөр сая сая жил хадгалагдаж болно.',
        },
        {
          en: 'Apollo astronauts brought back about 382 kg of Moon rock and soil.',
          mn: '«Аполлон»-ы сансрын нисэгчид 382 орчим кг Сарны чулуу, хөрс авчирсан.',
        },
        {
          en: 'China’s Chang’e 4 made the first ever landing on the Moon’s far side in 2019.',
          mn: 'Хятадын «Чанъэ-4» 2019 онд Сарын ар талд анх удаа газардсан.',
        },
      ],
    },

    // 6 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.moons',
      order: 6,
      title: { en: 'Famous moons', mn: 'Алдартай дагуулууд' },
      summary: {
        en: 'From Io’s volcanoes to Europa’s hidden ocean, the moons of the giant planets are worlds of their own.',
        mn: 'Иогийн галт уулаас Европагийн нууц далай хүртэл аварга гарагуудын дагуулууд тус бүрдээ өвөрмөц ертөнц.',
      },
      body: {
        en: 'More than 400 moons circle the planets of our solar system, and most belong to the giants. Some are bigger than Mercury, some hide oceans under thick ice, and one has rain and lakes — of methane. Scientists think a few of these icy moons are among the best places to search for life beyond Earth.',
        mn: 'Манай Нарны аймгийн гарагуудыг 400 гаруй дагуул тойрдог бөгөөд ихэнх нь аварга гарагуудынх. Зарим нь Будаас том, зарим нь зузаан мөсөн доор далай нуудаг, нэгд нь бороо орж нуур тогтдог — гэхдээ метанаас. Эрдэмтэд эдгээр мөсөн дагуулын заримыг Дэлхийн гадна амьдрал хайх хамгийн тохиромжтой газрын тоонд оруулдаг.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Io', mn: 'Ио' },
            subtitle: { en: 'Jupiter · the volcano moon', mn: 'Бархасбадь · галт уулын дагуул' },
            facts: [
              { en: 'The most volcanically active body in the solar system, with hundreds of active volcanoes', mn: 'Нарны аймгийн хамгийн идэвхтэй галт уулын биет — хэдэн зуун идэвхтэй галт уултай' },
              { en: 'Jupiter’s gravity squeezes and heats its insides', mn: 'Бархасбадийн таталцал дотор талыг нь шахаж, халаадаг' },
            ],
            icon: '🌋',
            color: '#E8C547',
          },
          {
            title: { en: 'Europa', mn: 'Европа' },
            subtitle: { en: 'Jupiter · the ocean moon', mn: 'Бархасбадь · далайт дагуул' },
            facts: [
              { en: 'A salty ocean under its ice shell may hold about twice as much water as all Earth’s oceans', mn: 'Мөсөн бүрхүүлийн доорх давстай далайд нь Дэлхийн бүх далайгаас хоёр дахин их ус байж магадгүй' },
              { en: 'NASA’s Europa Clipper, launched in 2024, will study it from 2030', mn: '2024 онд хөөрсөн NASA-гийн «Европа Клиппер» 2030 оноос судална' },
            ],
            icon: '🧊',
            color: '#C9B79C',
          },
          {
            title: { en: 'Ganymede', mn: 'Ганимед' },
            subtitle: { en: 'Jupiter · the largest moon', mn: 'Бархасбадь · хамгийн том дагуул' },
            facts: [
              { en: 'At 5,268 km across it is bigger than the planet Mercury', mn: '5,268 км голчтой нь Буд гарагаас том' },
              { en: 'The only moon known to have its own magnetic field', mn: 'Өөрийн соронзон оронтой гэж мэдэгдэж буй цорын ганц дагуул' },
            ],
            icon: '🥇',
            color: '#8C8478',
          },
          {
            title: { en: 'Titan', mn: 'Титан' },
            subtitle: { en: 'Saturn · the hazy moon', mn: 'Санчир · манантай дагуул' },
            facts: [
              { en: 'Its thick nitrogen atmosphere is denser than Earth’s', mn: 'Азотын өтгөн агаар мандал нь Дэлхийнхээс нягт' },
              { en: 'Rain, rivers and lakes of liquid methane and ethane; ESA’s Huygens probe landed there in 2005', mn: 'Шингэн метан, этаны бороо, гол, нууртай; ESA-гийн «Гюйгенс» 2005 онд газардсан' },
            ],
            icon: '🌫️',
            color: '#E0A040',
          },
          {
            title: { en: 'Enceladus', mn: 'Энцелад' },
            subtitle: { en: 'Saturn · the geyser moon', mn: 'Санчир · гейзерт дагуул' },
            facts: [
              { en: 'Only about 500 km across, yet it shoots jets of water from its south pole', mn: 'Ердөө 500 орчим км голчтой ч өмнөд туйлаасаа усны оргилуур цацдаг' },
              { en: 'The ice it sprays forms Saturn’s faint E ring', mn: 'Цацсан мөс нь Санчирын бүдэг E цагирагийг бүрдүүлдэг' },
            ],
            icon: '⛲',
            color: '#E8F1F5',
          },
          {
            title: { en: 'Triton', mn: 'Тритон' },
            subtitle: { en: 'Neptune · the backwards moon', mn: 'Далайн ван · урвуу эргэдэг дагуул' },
            facts: [
              { en: 'It orbits opposite to Neptune’s spin — probably a captured Kuiper belt object', mn: 'Далайн вангийн эргэлтийн эсрэг тойрдог — баригдсан Койперын бүсийн биет байх магадлалтай' },
              { en: 'At about −235 °C it is one of the coldest places known, with nitrogen geysers', mn: '−235 орчим °C-тай мэдэгдэж буй хамгийн хүйтэн газруудын нэг, азотын гейзертэй' },
            ],
            icon: '❄️',
            color: '#C7D6E0',
          },
          {
            title: { en: 'Phobos', mn: 'Фобос' },
            subtitle: { en: 'Mars · the doomed moon', mn: 'Ангараг · сүйрэх хувьтай дагуул' },
            facts: [
              { en: 'A potato-shaped moon only about 22 km across', mn: 'Ердөө 22 орчим км хэмжээтэй төмс хэлбэрийн дагуул' },
              { en: 'It creeps closer to Mars and will break apart in about 50 million years', mn: 'Ангарагт улам ойртож, 50 орчим сая жилийн дараа бутарна' },
            ],
            icon: '🥔',
            color: '#7A6A5A',
          },
        ],
      },
      funFacts: [
        {
          en: 'Galileo discovered Jupiter’s four largest moons in 1610 — the first moons found circling another planet.',
          mn: 'Галилей 1610 онд Бархасбадийн дөрвөн том дагуулыг нээсэн нь өөр гарагийг тойрдог анхны нээгдсэн дагуулууд юм.',
        },
        { en: 'Mercury and Venus are the only planets with no moons at all.', mn: 'Буд, Сугар хоёр л огт дагуулгүй гарагууд.' },
        {
          en: 'Most of Uranus’s moons are named after characters from Shakespeare’s plays, such as Miranda and Oberon.',
          mn: 'Тэнгэрийн вангийн ихэнх дагуулыг Миранда, Оберон зэрэг Шекспирийн жүжгийн баатруудаар нэрлэсэн.',
        },
        {
          en: 'Even some asteroids have moons: tiny Dactyl orbits the asteroid Ida.',
          mn: 'Зарим астероид хүртэл дагуултай: жижигхэн Дактил Ида астероидыг тойрдог.',
        },
      ],
    },

    // 7 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.small-bodies',
      order: 7,
      title: { en: 'Asteroids, comets and dwarf planets', mn: 'Астероид, сүүлт од, одой гараг' },
      summary: {
        en: 'Millions of rocky and icy bodies fill the belts and clouds between and beyond the planets.',
        mn: 'Гарагуудын хооронд болон цаана сая сая чулуулаг, мөсөн биет бүс, үүл болон оршдог.',
      },
      body: {
        en: 'Besides the planets, the solar system holds countless smaller bodies left over from its birth. To count as a planet, a world must orbit the Sun, be round, and have cleared its path of other objects. Dwarf planets such as Pluto pass the first two tests but not the third.',
        mn: 'Гарагуудаас гадна Нарны аймагт үүсэх үеэс нь үлдсэн тоо томшгүй олон жижиг биет бий. Гараг гэж тооцогдохын тулд биет Нарыг тойрох, бөөрөнхий хэлбэртэй байх, мөн тойрог замаа бусад биетээс цэвэрлэсэн байх ёстой. Плутон зэрэг одой гарагууд эхний хоёр шалгуурыг хангадаг ч гуравдахийг хангадаггүй.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Asteroid belt', mn: 'Астероидын бүс' },
            subtitle: { en: 'Between Mars and Jupiter', mn: 'Ангараг, Бархасбадийн хооронд' },
            facts: [
              { en: 'Millions of rocky bodies, but so spread out that spacecraft cross it safely', mn: 'Сая сая чулуулаг биеттэй ч маш сийрэг тул сансрын аппарат аюулгүй дайран өнгөрдөг' },
              { en: 'All of it together has only about 3% of our Moon’s mass', mn: 'Бүгдийг нийлүүлэхэд манай Сарны массын 3 орчим хувьтай л тэнцэнэ' },
            ],
            icon: '🪨',
            color: '#8D6E63',
          },
          {
            title: { en: 'Ceres', mn: 'Церера' },
            subtitle: { en: 'Largest body in the asteroid belt', mn: 'Астероидын бүсийн хамгийн том биет' },
            facts: [
              { en: 'About 940 km across; the first asteroid ever found, in 1801', mn: '940 орчим км голчтой; 1801 онд нээгдсэн анхны астероид' },
              { en: 'Now a dwarf planet; NASA’s Dawn found bright salt spots on it', mn: 'Одоо одой гараг; NASA-гийн «Доун» дээрээс нь гялалзсан давсны толбо илрүүлсэн' },
            ],
            icon: '⚪',
            color: '#9E9E9E',
          },
          {
            title: { en: 'Kuiper belt', mn: 'Койперын бүс' },
            subtitle: { en: 'Beyond Neptune, about 30–50 AU', mn: 'Далайн вангийн цаана, 30–50 орчим о.о.н' },
            facts: [
              { en: 'A wide ring of icy bodies; home of Pluto, Haumea and Makemake', mn: 'Мөсөн биетүүдийн өргөн цагираг; Плутон, Хаумеа, Макемаке энд оршдог' },
              { en: 'New Horizons flew past Arrokoth here in 2019 — the most distant object ever visited', mn: '«Шинэ давхрага» 2019 онд эндэх Аррокотын хажуугаар нисэв — судлагдсан хамгийн алс биет' },
            ],
            icon: '🧊',
            color: '#80DEEA',
          },
          {
            title: { en: 'Oort cloud', mn: 'Оортын үүл' },
            subtitle: { en: 'The far edge of the solar system', mn: 'Нарны аймгийн алс зах' },
            facts: [
              { en: 'A vast shell of icy bodies thousands of AU away that has never been seen directly', mn: 'Хэдэн мянган о.о.н зайд орших мөсөн биетүүдийн асар том бүрхүүл, шууд хэзээ ч харагдаж байгаагүй' },
              { en: 'Long-period comets come from here; Voyager 1 needs about 300 years to reach its inner edge', mn: 'Урт хугацааны сүүлт одод эндээс ирдэг; «Вояжер-1» дотоод захад нь хүрэхэд 300 орчим жил хэрэгтэй' },
            ],
            icon: '☁️',
            color: '#B39DDB',
          },
          {
            title: { en: 'Comets', mn: 'Сүүлт од' },
            subtitle: { en: '“Dirty snowballs”', mn: '«Бохир цасан бөмбөг»' },
            facts: [
              { en: 'Near the Sun their ice turns to gas, growing tails that always point away from the Sun', mn: 'Нарт ойртоход мөс нь хий болж, Нарнаас үргэлж эсрэг тийш чиглэсэн сүүл ургадаг' },
              { en: 'Halley’s Comet returns about every 76 years — next in 2061', mn: 'Галлейн сүүлт од 76 орчим жил тутамд эргэж ирдэг — дараагийнх нь 2061 онд' },
            ],
            icon: '☄️',
            color: '#4DD0E1',
          },
          {
            title: { en: 'Meteors and meteorites', mn: 'Солир ба солирын чулуу' },
            subtitle: { en: '“Shooting stars”', mn: '«Унаж буй од»' },
            facts: [
              { en: 'A meteor is the streak of light when a space pebble burns up in our air', mn: 'Солир бол сансрын жижиг чулуу агаар мандалд шатах үеийн гэрлийн зурвас' },
              { en: 'A meteorite is a piece that survives and lands on the ground', mn: 'Солирын чулуу (метеорит) бол шатаж дуусалгүй газарт унасан хэсэг' },
            ],
            icon: '🌠',
            color: '#FFB74D',
          },
          {
            title: { en: 'Dwarf planets', mn: 'Одой гарагууд' },
            subtitle: { en: 'Ceres, Pluto, Eris, Haumea, Makemake', mn: 'Церера, Плутон, Эрида, Хаумеа, Макемаке' },
            facts: [
              { en: 'Eris is almost as wide as Pluto but heavier; its discovery in 2005 led to Pluto’s reclassification', mn: 'Эрида бараг Плутоны хэмжээтэй ч илүү хүнд; 2005 онд нээгдсэн нь Плутоныг дахин ангилахад хүргэсэн' },
              { en: 'Haumea is egg-shaped, spins in about 4 hours and has a ring', mn: 'Хаумеа өндөг хэлбэртэй, 4 орчим цагт нэг эргэдэг бөгөөд цагирагтай' },
            ],
            icon: '🪐',
            color: '#D9C2A3',
          },
        ],
      },
      funFacts: [
        {
          en: 'The asteroid that wiped out the dinosaurs 66 million years ago was about 10 km wide.',
          mn: '66 сая жилийн өмнө үлэг гүрвэлүүдийг устгасан астероид 10 орчим км өргөн байжээ.',
        },
        {
          en: 'In 2022 NASA’s DART spacecraft crashed into the asteroid Dimorphos and changed its orbit — the first test of planetary defence.',
          mn: '2022 онд NASA-гийн DART аппарат Диморфос астероидыг мөргөж, тойрог замыг нь өөрчилсөн нь гарагийг хамгаалах анхны туршилт байв.',
        },
        {
          en: 'Most shooting stars are made by specks no bigger than a grain of sand.',
          mn: 'Ихэнх «унаж буй од» элсний ширхгээс том биш тоосонцроос үүсдэг.',
        },
        {
          en: 'Dozens of tonnes of space dust and tiny meteorites fall on Earth every day.',
          mn: 'Дэлхий дээр өдөр бүр хэдэн арван тонн сансрын тоос, жижиг солирын чулуу унадаг.',
        },
      ],
    },

    // 8 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.exploration',
      order: 8,
      title: { en: 'Exploring space', mn: 'Сансрын судалгаа' },
      summary: {
        en: 'From Sputnik in 1957 to the James Webb telescope, humans and robots have reached across the solar system.',
        mn: '1957 оны Спутникаас Жеймс Уэббийн дуран хүртэл хүн, робот Нарны аймгийг хөндлөн гулд судалсаар ирлээ.',
      },
      body: {
        en: 'The space age began in 1957 with the first artificial satellite. Within twelve years people had walked on the Moon. Since then robot explorers have visited every planet, landed on Mars and flown past Pluto, while space telescopes look back to the early universe. In 1981 Jügderdemidiin Gürragchaa became the first Mongolian in space.',
        mn: 'Сансрын эрин 1957 онд анхны хиймэл дагуулаар эхэлсэн. Арван хоёр жилийн дотор хүн Сар дээр алхжээ. Түүнээс хойш робот аппаратууд бүх гараг дээр очиж, Ангараг дээр газардаж, Плутоны хажуугаар нисэж, сансрын дурангууд орчлонгийн эхэн үеийг харж байна. 1981 онд Жүгдэрдэмидийн Гүррагчаа сансарт ниссэн анхны монгол хүн болов.',
      },
      visual: {
        kind: 'timeline',
        items: [
          {
            when: { en: '1957', mn: '1957' },
            title: { en: 'Sputnik 1', mn: 'Спутник-1' },
            body: {
              en: 'On 4 October the Soviet Union launched the first artificial satellite, a beeping metal ball about 58 cm wide. A month later the dog Laika became the first animal to orbit Earth.',
              mn: '10-р сарын 4-нд ЗХУ 58 орчим см голчтой, дохио цацдаг төмөр бөмбөг буюу анхны хиймэл дагуулыг хөөргөв. Сарын дараа Лайка нохой Дэлхийг тойрсон анхны амьтан болсон.',
            },
          },
          {
            when: { en: '1961', mn: '1961' },
            title: { en: 'Yuri Gagarin', mn: 'Юрий Гагарин' },
            body: {
              en: 'On 12 April Gagarin flew Vostok 1 once around Earth in 108 minutes — the first human in space.',
              mn: '4-р сарын 12-нд Гагарин «Восток-1» хөлгөөр Дэлхийг 108 минутад нэг тойрч, сансарт ниссэн анхны хүн болов.',
            },
          },
          {
            when: { en: '1963', mn: '1963' },
            title: { en: 'Valentina Tereshkova', mn: 'Валентина Терешкова' },
            body: {
              en: 'Tereshkova became the first woman in space, orbiting Earth 48 times in nearly three days.',
              mn: 'Терешкова бараг гурван хоногт Дэлхийг 48 удаа тойрч, сансарт ниссэн анхны эмэгтэй болов.',
            },
          },
          {
            when: { en: '1969', mn: '1969' },
            title: { en: 'Apollo 11', mn: '«Аполлон-11»' },
            body: {
              en: 'On 20 July Neil Armstrong and Buzz Aldrin landed on the Moon. “That’s one small step for a man, one giant leap for mankind.”',
              mn: '7-р сарын 20-нд Нил Армстронг, Базз Олдрин нар Сар дээр газардав. «Энэ бол хүний хувьд жижиг алхам ч хүн төрөлхтний хувьд аварга үсрэлт».',
            },
          },
          {
            when: { en: '1977', mn: '1977' },
            title: { en: 'Voyager 1 and 2', mn: '«Вояжер-1», «Вояжер-2»' },
            body: {
              en: 'The twin probes toured the giant planets; Voyager 2 is still the only craft to visit Uranus and Neptune. In 2012 Voyager 1 became the first human-made object to enter interstellar space.',
              mn: 'Ихэр аппаратууд аварга гарагуудаар аялсан; «Вояжер-2» одоо ч Тэнгэрийн ван, Далайн ванд очсон цорын ганц аппарат. 2012 онд «Вояжер-1» одод хоорондын орон зайд орсон хүний бүтээсэн анхны биет болов.',
            },
          },
          {
            when: { en: '1981', mn: '1981' },
            title: { en: 'Jügderdemidiin Gürragchaa', mn: 'Ж.Гүррагчаа' },
            body: {
              en: 'On 22 March Gürragchaa launched on Soyuz 39 with Vladimir Dzhanibekov and spent about 8 days in space, visiting the Salyut 6 station. Mongolia became the 10th country to send a person into space.',
              mn: '3-р сарын 22-нд Гүррагчаа В.Жанибековын хамт «Союз-39» хөлгөөр хөөрч, «Салют-6» станцад зочлон сансарт 8 орчим хоног байв. Монгол Улс сансарт хүн илгээсэн 10 дахь орон болсон.',
            },
          },
          {
            when: { en: '1990', mn: '1990' },
            title: { en: 'Hubble Space Telescope', mn: '«Хаббл» сансрын дуран' },
            body: {
              en: 'Hubble has made more than 1.5 million observations from above the atmosphere and helped pin down the age of the universe at about 13.8 billion years.',
              mn: '«Хаббл» агаар мандлын дээрээс 1.5 саяас олон ажиглалт хийж, орчлон 13.8 орчим тэрбум настайг тогтооход тусалсан.',
            },
          },
          {
            when: { en: '2000', mn: '2000' },
            title: { en: 'International Space Station', mn: 'Олон улсын сансрын станц' },
            body: {
              en: 'The first crew moved in in November 2000; people have lived on board ever since, circling Earth about every 90 minutes.',
              mn: '2000 оны 11-р сард анхны баг нүүж орсноос хойш хүмүүс тасралтгүй амьдарч байгаа бөгөөд станц Дэлхийг 90 орчим минутад нэг тойрдог.',
            },
          },
          {
            when: { en: '2012', mn: '2012' },
            title: { en: 'Curiosity on Mars', mn: '«Кюриосити» Ангараг дээр' },
            body: {
              en: 'The car-sized rover landed in Gale Crater and found that ancient Mars once had conditions that could have supported microbes.',
              mn: 'Машины хэмжээтэй ровер Гейлийн тогоонд газардаж, эртний Ангараг бичил биетэн амьдрах нөхцөлтэй байсныг тогтоосон.',
            },
          },
          {
            when: { en: '2015', mn: '2015' },
            title: { en: 'New Horizons at Pluto', mn: '«Шинэ давхрага» Плутонд' },
            body: {
              en: 'On 14 July the probe flew past Pluto after a nine-year journey, revealing its giant icy “heart”.',
              mn: '7-р сарын 14-нд есөн жил аялсан аппарат Плутоны хажуугаар нисч, мөсөн аварга «зүрх»-ийг нь харуулсан.',
            },
          },
          {
            when: { en: '2021', mn: '2021' },
            title: { en: 'Perseverance and Ingenuity', mn: '«Персевиранс» ба «Инженьюити»' },
            body: {
              en: 'Perseverance landed in Jezero Crater to collect rock samples, and its little helicopter Ingenuity made the first powered flight on another planet.',
              mn: '«Персевиранс» чулуулгийн дээж цуглуулахаар Езеро тогоонд газардаж, жижигхэн нисдэг тэрэг «Инженьюити» өөр гараг дээр хөдөлгүүртэй анхны нислэг хийв.',
            },
          },
          {
            when: { en: '2021–2022', mn: '2021–2022' },
            title: { en: 'James Webb Space Telescope', mn: 'Жеймс Уэббийн сансрын дуран' },
            body: {
              en: 'Launched on 25 December 2021, Webb’s 6.5-metre gold mirror works 1.5 million km from Earth; its first images came out in July 2022.',
              mn: '2021 оны 12-р сарын 25-нд хөөрсөн Уэббийн 6.5 метрийн алтадмал толь Дэлхийгээс 1.5 сая км-т ажилладаг; анхны зургууд нь 2022 оны 7-р сард гарсан.',
            },
          },
          {
            when: { en: '2022 →', mn: '2022 →' },
            title: { en: 'Artemis', mn: '«Артемис»' },
            body: {
              en: 'NASA’s Artemis programme is taking people back to the Moon: Artemis I flew uncrewed in 2022, and Artemis II carries a crew of four around the Moon.',
              mn: 'NASA-гийн «Артемис» хөтөлбөр хүнийг Сар руу эргүүлэн хүргэх зорилготой: «Артемис I» 2022 онд нисгэгчгүй ниссэн, «Артемис II» дөрвөн хүнтэй багийг Сарыг тойруулна.',
            },
          },
        ],
      },
      funFacts: [
        {
          en: 'Gürragchaa was later named a Hero of the Mongolian People’s Republic and a Hero of the Soviet Union.',
          mn: 'Ж.Гүррагчаа БНМАУ-ын баатар, ЗХУ-ын баатар цол хүртсэн.',
        },
        {
          en: 'Voyager 1 is the farthest human-made object — more than 24 billion km from Earth.',
          mn: '«Вояжер-1» бол хүний бүтээсэн хамгийн алс биет — Дэлхийгээс 24 тэрбум гаруй км зайтай.',
        },
        {
          en: 'Astronauts on the space station see about 16 sunrises and 16 sunsets every day.',
          mn: 'Сансрын станцын нисэгчид өдөр бүр 16 орчим удаа нар мандах, жаргахыг хардаг.',
        },
        {
          en: 'Each Voyager carries a Golden Record with sounds and pictures of Earth, in case anyone ever finds it.',
          mn: '«Вояжер» бүр хэн нэгэн олох вий гэж Дэлхийн дуу авиа, зургийг багтаасан Алтан пянз авч явдаг.',
        },
      ],
    },

    // 9 ─────────────────────────────────────────────────────────────
    {
      topicSlug: T,
      key: 'space.records',
      order: 9,
      title: { en: 'Solar system records', mn: 'Нарны аймгийн дээд амжилтууд' },
      summary: {
        en: 'The hottest, coldest, tallest and windiest places in the solar system.',
        mn: 'Нарны аймгийн хамгийн халуун, хүйтэн, өндөр, салхитай газрууд.',
      },
      body: {
        en: 'The solar system is full of extremes. Venus is hotter than Mercury even though it is twice as far from the Sun, Mars has a volcano about two and a half times the height of Everest, and Neptune’s winds blow faster than the speed of sound on Earth.',
        mn: 'Нарны аймаг туйлын онцгой зүйлсээр дүүрэн. Сугар Нарнаас Будаас хоёр дахин хол байсаар атлаа түүнээс халуун, Ангараг дээр Эверестээс хоёр хагас дахин өндөр галт уул бий, Далайн вангийн салхи Дэлхий дээрх дууны хурднаас ч хурдан үлээдэг.',
      },
      visual: {
        kind: 'cards',
        items: [
          {
            title: { en: 'Hottest planet', mn: 'Хамгийн халуун гараг' },
            subtitle: { en: 'Venus · about 465 °C', mn: 'Сугар · 465 орчим °C' },
            facts: [
              { en: 'Its thick carbon dioxide air traps heat in a runaway greenhouse effect', mn: 'Нүүрсхүчлийн хийн өтгөн агаар мандал хүлэмжийн хэт хүчтэй нөлөөгөөр дулааныг барьдаг' },
              { en: 'It is just as hot by night as by day', mn: 'Шөнө ч өдөр шиг халуун' },
            ],
            icon: '🔥',
            color: '#E8CDA0',
          },
          {
            title: { en: 'Coldest planet', mn: 'Хамгийн хүйтэн гараг' },
            subtitle: { en: 'Uranus · about −224 °C', mn: 'Тэнгэрийн ван · −224 орчим °C' },
            facts: [
              { en: 'Colder than Neptune even though it is closer to the Sun', mn: 'Нарт ойр байсаар атлаа Далайн вангаас хүйтэн' },
              { en: 'It gives off very little heat from inside', mn: 'Дотроосоо маш бага дулаан ялгаруулдаг' },
            ],
            icon: '🥶',
            color: '#9FE3E8',
          },
          {
            title: { en: 'Tallest volcano', mn: 'Хамгийн өндөр галт уул' },
            subtitle: { en: 'Olympus Mons, Mars · about 22 km', mn: 'Олимп уул, Ангараг · 22 орчим км' },
            facts: [
              { en: 'About 2.5 times the height of Mount Everest', mn: 'Эверест уулаас 2.5 орчим дахин өндөр' },
              { en: 'About 600 km wide at its base', mn: 'Суурь нь 600 орчим км өргөн' },
            ],
            icon: '🌋',
            color: '#C1440E',
          },
          {
            title: { en: 'Biggest canyon', mn: 'Хамгийн том хавцал' },
            subtitle: { en: 'Valles Marineris, Mars · about 4,000 km', mn: 'Маринерын хөндий, Ангараг · 4,000 орчим км' },
            facts: [
              { en: 'Up to about 7 km deep', mn: '7 орчим км хүртэл гүн' },
              { en: 'It would stretch across the whole United States', mn: 'АНУ-ыг бүхэлд нь хөндлөн гулд хэмжээтэй' },
            ],
            icon: '🏜️',
            color: '#A0522D',
          },
          {
            title: { en: 'Biggest storm', mn: 'Хамгийн том шуурга' },
            subtitle: { en: 'Great Red Spot, Jupiter', mn: 'Их улаан толбо, Бархасбадь' },
            facts: [
              { en: 'Wider than the whole Earth', mn: 'Дэлхийг бүхэлд нь багтаах өргөн' },
              { en: 'It has been watched for at least 150 years and is slowly shrinking', mn: 'Дор хаяж 150 жил ажиглагдаж байгаа бөгөөд аажмаар багасаж байна' },
            ],
            icon: '🌪️',
            color: '#C0573E',
          },
          {
            title: { en: 'Shortest day', mn: 'Хамгийн богино хоног' },
            subtitle: { en: 'Jupiter · about 10 hours', mn: 'Бархасбадь · 10 орчим цаг' },
            facts: [
              { en: 'The biggest planet spins the fastest: once every 9 h 56 min', mn: 'Хамгийн том гараг хамгийн хурдан эргэдэг: 9 цаг 56 минутад нэг удаа' },
              { en: 'Its clouds at the equator move at about 45,000 km/h', mn: 'Экваторын үүл нь цагт 45,000 орчим км хурдтай хөдөлдөг' },
            ],
            icon: '⏱️',
            color: '#D8B48A',
          },
          {
            title: { en: 'Longest day', mn: 'Хамгийн урт хоног' },
            subtitle: { en: 'Venus · 243 Earth days per spin', mn: 'Сугар · нэг эргэлт 243 хоног' },
            facts: [
              { en: 'One spin takes longer than one trip around the Sun (225 days)', mn: 'Тэнхлэгээ нэг эргэх нь Нарыг нэг тойрохоос (225 хоног) урт' },
              { en: 'It also spins backwards', mn: 'Мөн эсрэг чиглэлд эргэдэг' },
            ],
            icon: '🐢',
            color: '#C9A66B',
          },
          {
            title: { en: 'Fastest winds', mn: 'Хамгийн хүчтэй салхи' },
            subtitle: { en: 'Neptune · up to about 2,100 km/h', mn: 'Далайн ван · цагт 2,100 орчим км хүртэл' },
            facts: [
              { en: 'Faster than the speed of sound on Earth', mn: 'Дэлхий дээрх дууны хурднаас хурдан' },
              { en: 'Surprising for the planet farthest from the Sun’s warmth', mn: 'Нарны дулаанаас хамгийн алс гарагийн хувьд гайхмаар' },
            ],
            icon: '💨',
            color: '#3E66F9',
          },
        ],
      },
      funFacts: [
        {
          en: 'Saturn is so light for its size that, on average, it is less dense than water.',
          mn: 'Санчир хэмжээндээ харьцуулахад маш хөнгөн тул дундаж нягт нь уснаас бага.',
        },
        {
          en: 'Mercury has the biggest temperature swing of any planet — about 600 °C between day and night.',
          mn: 'Буд гарагийн өдөр, шөнийн температурын зөрүү 600 орчим °C буюу гарагуудаас хамгийн их.',
        },
        {
          en: 'Scientists think it may “rain” diamonds deep inside Uranus and Neptune.',
          mn: 'Тэнгэрийн ван, Далайн вангийн гүнд алмаазан «бороо» орж байж магадгүй гэж эрдэмтэд үздэг.',
        },
        {
          en: 'Mercury is the fastest planet, orbiting the Sun at about 47 km per second.',
          mn: 'Буд бол Нарыг секундэд 47 орчим км хурдтай тойрдог хамгийн хурдан гараг.',
        },
      ],
    },
  ],

  questions: [
    // ── overview ────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q1',
      difficulty: 1,
      prompt: { en: 'Which planet is closest to the Sun?', mn: 'Нарт хамгийн ойр гараг аль нь вэ?' },
      choices: [
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Mercury', mn: 'Буд' },
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Earth', mn: 'Дэлхий' },
      ],
      answer: 1,
      explanation: {
        en: 'Mercury orbits closest to the Sun, at about 57.9 million km, and goes around it in just 88 days.',
        mn: 'Буд Нарнаас 57.9 орчим сая км-т хамгийн ойр тойрдог бөгөөд ердөө 88 хоногт нэг тойрно.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q2',
      difficulty: 1,
      prompt: { en: 'How many planets are in our solar system?', mn: 'Манай Нарны аймагт хэдэн гараг байдаг вэ?' },
      choices: [
        { en: '7', mn: '7' },
        { en: '9', mn: '9' },
        { en: '8', mn: '8' },
        { en: '10', mn: '10' },
      ],
      answer: 2,
      explanation: {
        en: 'There are eight planets. Pluto was counted as the ninth until 2006, when it was reclassified as a dwarf planet.',
        mn: 'Найман гараг бий. Плутоныг 2006 он хүртэл ес дэх гараг гэж тоолж байгаад одой гараг гэж дахин ангилсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q3',
      difficulty: 2,
      prompt: { en: 'Which planet has the most known moons?', mn: 'Аль гараг хамгийн олон мэдэгдэж буй дагуултай вэ?' },
      choices: [
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Uranus', mn: 'Тэнгэрийн ван' },
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Saturn', mn: 'Санчир' },
      ],
      answer: 3,
      explanation: {
        en: 'Saturn has 274 known moons as of 2025 — far ahead of Jupiter, which has 95.',
        mn: '2025 оны байдлаар Санчир 274 мэдэгдэж буй дагуултай нь 95 дагуултай Бархасбадиас хол давж байна.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q4',
      difficulty: 2,
      prompt: { en: 'About how long does Mars take to go once around the Sun?', mn: 'Ангараг Нарыг нэг тойроход ойролцоогоор хэр удаан хугацаа зарцуулдаг вэ?' },
      choices: [
        { en: '687 days', mn: '687 хоног' },
        { en: '365 days', mn: '365 хоног' },
        { en: '225 days', mn: '225 хоног' },
        { en: '12 years', mn: '12 жил' },
      ],
      answer: 0,
      explanation: {
        en: 'A Martian year lasts about 687 Earth days — almost two of our years. 225 days is Venus, and 12 years is Jupiter.',
        mn: 'Ангарагийн нэг жил 687 орчим хоног буюу манай бараг хоёр жил. 225 хоног нь Сугарын, 12 жил нь Бархасбадийн жил.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q5',
      difficulty: 2,
      prompt: {
        en: 'About how much of the solar system’s total mass is in the Sun?',
        mn: 'Нарны аймгийн нийт массын хэдэн хувь нь Наранд ногддог вэ?',
      },
      choices: [
        { en: 'About half', mn: 'Тал орчим' },
        { en: 'About 75%', mn: '75 орчим хувь' },
        { en: 'About 90%', mn: '90 орчим хувь' },
        { en: 'More than 99%', mn: '99-өөс дээш хувь' },
      ],
      answer: 3,
      explanation: {
        en: 'The Sun holds about 99.86% of all the mass in the solar system. Most of the rest is in Jupiter.',
        mn: 'Нарны аймгийн нийт массын 99.86 орчим хувь Наранд ногддог. Үлдсэний ихэнх нь Бархасбадьд бий.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q6',
      difficulty: 3,
      prompt: { en: 'In which year was Pluto reclassified as a dwarf planet?', mn: 'Плутоныг аль онд одой гараг гэж дахин ангилсан бэ?' },
      choices: [
        { en: '1930', mn: '1930' },
        { en: '1989', mn: '1989' },
        { en: '2006', mn: '2006' },
        { en: '2015', mn: '2015' },
      ],
      answer: 2,
      explanation: {
        en: 'The International Astronomical Union reclassified Pluto in 2006. It had been discovered in 1930 and was visited by New Horizons in 2015.',
        mn: 'Олон улсын одон орны холбоо Плутоныг 2006 онд дахин ангилсан. Плутоныг 1930 онд нээж, 2015 онд «Шинэ давхрага» аппарат очиж судалсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.overview',
      key: 'space.overview.q7',
      difficulty: 3,
      prompt: {
        en: 'Which planet was found in 1846 by mathematical prediction before anyone saw it?',
        mn: 'Аль гарагийг 1846 онд хэн нэгэн харахаас өмнө математик тооцоогоор олсон бэ?',
      },
      choices: [
        { en: 'Uranus', mn: 'Тэнгэрийн ван' },
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Mars', mn: 'Ангараг' },
      ],
      answer: 1,
      explanation: {
        en: 'Small wobbles in Uranus’s orbit let astronomers calculate where an unseen planet must be — and Neptune was found right there in 1846.',
        mn: 'Тэнгэрийн вангийн тойрог замын үл ялиг хазайлтаар одон орон судлаачид үл харагдах гараг хаана байхыг тооцоолж, 1846 онд яг тэнд нь Далайн ванг олжээ.',
      },
    },

    // ── sizes ───────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest planet?', mn: 'Хамгийн том гараг аль нь вэ?' },
      choices: [
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Earth', mn: 'Дэлхий' },
      ],
      answer: 0,
      explanation: {
        en: 'Jupiter is about 143,000 km across — roughly 11 times wider than Earth. Saturn is second.',
        mn: 'Бархасбадь 143,000 орчим км голчтой — Дэлхийгээс 11 орчим дахин өргөн. Санчир хоёрдугаарт орно.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q2',
      difficulty: 1,
      prompt: { en: 'Which is the smallest of the eight planets?', mn: 'Найман гарагаас хамгийн жижиг нь аль вэ?' },
      choices: [
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Earth', mn: 'Дэлхий' },
        { en: 'Mercury', mn: 'Буд' },
      ],
      answer: 3,
      explanation: {
        en: 'Mercury is the smallest planet, about 4,879 km across — only a little wider than our Moon.',
        mn: 'Буд 4,879 орчим км голчтой хамгийн жижиг гараг — манай Сараас бага зэрэг л өргөн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q3',
      difficulty: 2,
      prompt: { en: 'Which planet is almost the same size as Earth?', mn: 'Аль гараг Дэлхийтэй бараг ижил хэмжээтэй вэ?' },
      choices: [
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Mercury', mn: 'Буд' },
      ],
      answer: 2,
      explanation: {
        en: 'Venus is about 12,104 km across, roughly 95% of Earth’s width, so it is often called Earth’s twin.',
        mn: 'Сугар 12,104 орчим км голчтой буюу Дэлхийн өргөний 95 орчим хувь тул түүнийг Дэлхийн ихэр гэж нэрлэдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q4',
      difficulty: 2,
      prompt: {
        en: 'About how many Earths would fit side by side across Jupiter?',
        mn: 'Бархасбадийн голчийн дагуу хэдэн Дэлхийг зэрэгцүүлэн тавьж болох вэ?',
      },
      choices: [
        { en: 'About 3', mn: '3 орчим' },
        { en: 'About 11', mn: '11 орчим' },
        { en: 'About 50', mn: '50 орчим' },
        { en: 'About 109', mn: '109 орчим' },
      ],
      answer: 1,
      explanation: {
        en: 'About 11 Earths would line up across Jupiter. It takes about 109 Earths to span the Sun.',
        mn: 'Бархасбадийн голчид 11 орчим Дэлхий багтана. Нарны голчийг хамрахад 109 орчим Дэлхий хэрэгтэй.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q5',
      difficulty: 3,
      prompt: { en: 'Which of these moons is bigger than the planet Mercury?', mn: 'Эдгээр дагуулын аль нь Буд гарагаас том вэ?' },
      choices: [
        { en: 'Ganymede', mn: 'Ганимед' },
        { en: 'Europa', mn: 'Европа' },
        { en: 'Io', mn: 'Ио' },
        { en: 'Phobos', mn: 'Фобос' },
      ],
      answer: 0,
      explanation: {
        en: 'Jupiter’s Ganymede is about 5,268 km across, wider than Mercury (4,879 km). Saturn’s Titan is also slightly wider than Mercury.',
        mn: 'Бархасбадийн Ганимед 5,268 орчим км голчтой нь Будаас (4,879 км) өргөн. Санчирын Титан ч Будаас бага зэрэг өргөн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sizes',
      key: 'space.sizes.q6',
      difficulty: 3,
      prompt: { en: 'Which is the third-largest planet?', mn: 'Хэмжээгээрээ гуравдугаарт орох гараг аль нь вэ?' },
      choices: [
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Earth', mn: 'Дэлхий' },
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Uranus', mn: 'Тэнгэрийн ван' },
      ],
      answer: 3,
      explanation: {
        en: 'Uranus (about 51,100 km) is just a little wider than Neptune (about 49,500 km), so it ranks third after Jupiter and Saturn.',
        mn: 'Тэнгэрийн ван (51,100 орчим км) Далайн вангаас (49,500 орчим км) бага зэрэг өргөн тул Бархасбадь, Санчирын дараа гуравдугаарт орно.',
      },
    },

    // ── distances ───────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q1',
      difficulty: 1,
      prompt: { en: 'About how long does sunlight take to reach Earth?', mn: 'Нарны гэрэл Дэлхийд ойролцоогоор хэдэн хугацаанд хүрдэг вэ?' },
      choices: [
        { en: '1 second', mn: '1 секунд' },
        { en: '1 hour', mn: '1 цаг' },
        { en: '8 minutes 20 seconds', mn: '8 минут 20 секунд' },
        { en: '1 day', mn: '1 хоног' },
      ],
      answer: 2,
      explanation: {
        en: 'Light travels about 300,000 km per second and covers the 150 million km to Earth in about 8 minutes 20 seconds.',
        mn: 'Гэрэл секундэд 300,000 орчим км явдаг тул Дэлхий хүртэлх 150 сая км-ийг 8 минут 20 секунд орчимд туулдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q2',
      difficulty: 1,
      prompt: { en: 'What is one astronomical unit (AU)?', mn: 'Нэг одон орны нэгж (о.о.н) гэж юу вэ?' },
      choices: [
        { en: 'The Earth–Moon distance', mn: 'Дэлхий–Сарны зай' },
        { en: 'The Earth–Sun distance', mn: 'Дэлхий–Нарны зай' },
        { en: 'One light-year', mn: 'Нэг гэрлийн жил' },
        { en: 'The width of the Sun', mn: 'Нарны голч' },
      ],
      answer: 1,
      explanation: {
        en: 'One AU is the average distance from Earth to the Sun, about 150 million km. Neptune is about 30 AU from the Sun.',
        mn: 'Нэг о.о.н нь Дэлхийгээс Нар хүртэлх дундаж зай буюу 150 орчим сая км. Далайн ван Нарнаас 30 орчим о.о.н зайтай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q3',
      difficulty: 1,
      prompt: { en: 'Which planet is farthest from the Sun?', mn: 'Нарнаас хамгийн алс гараг аль нь вэ?' },
      choices: [
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Uranus', mn: 'Тэнгэрийн ван' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Neptune', mn: 'Далайн ван' },
      ],
      answer: 3,
      explanation: {
        en: 'Neptune is the farthest planet, about 4.5 billion km from the Sun. Dwarf planet Pluto is farther still on average.',
        mn: 'Далайн ван Нарнаас 4.5 орчим тэрбум км-т орших хамгийн алс гараг. Одой гараг Плутон дунджаар түүнээс ч хол.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q4',
      difficulty: 2,
      prompt: { en: 'About how far is Earth from the Sun?', mn: 'Дэлхий Нарнаас ойролцоогоор хэр хол вэ?' },
      choices: [
        { en: '15 million km', mn: '15 сая км' },
        { en: '1.5 billion km', mn: '1.5 тэрбум км' },
        { en: '384,400 km', mn: '384,400 км' },
        { en: '150 million km', mn: '150 сая км' },
      ],
      answer: 3,
      explanation: {
        en: 'Earth is about 149.6 million km from the Sun. 384,400 km is the distance to the Moon, and about 1.4 billion km is Saturn’s distance.',
        mn: 'Дэлхий Нарнаас 149.6 орчим сая км зайтай. 384,400 км бол Сар хүртэлх зай, 1.4 орчим тэрбум км бол Санчирын зай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q5',
      difficulty: 3,
      prompt: { en: 'About how long does sunlight take to reach Neptune?', mn: 'Нарны гэрэл Далайн ванд ойролцоогоор хэдэн хугацаанд хүрдэг вэ?' },
      choices: [
        { en: 'About 43 minutes', mn: '43 орчим минут' },
        { en: 'About 1 hour 20 minutes', mn: '1 цаг 20 орчим минут' },
        { en: 'About 4 hours', mn: '4 орчим цаг' },
        { en: 'About 1 day', mn: '1 орчим хоног' },
      ],
      answer: 2,
      explanation: {
        en: 'Neptune is about 4.5 billion km away, so sunlight needs a little over 4 hours. It reaches Jupiter in about 43 minutes and Saturn in about 1 hour 20 minutes.',
        mn: 'Далайн ван 4.5 орчим тэрбум км зайтай тул нарны гэрэлд 4 цаг гаруй хэрэгтэй. Бархасбадьд 43 орчим минутад, Санчирт 1 цаг 20 орчим минутад хүрдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.distances',
      key: 'space.distances.q6',
      difficulty: 2,
      prompt: {
        en: 'Driving non-stop at 100 km/h, about how long would it take to reach the Sun?',
        mn: 'Цагт 100 км хурдтай зогсолтгүй явбал Нарт хүрэхэд ойролцоогоор хэр удах вэ?',
      },
      choices: [
        { en: 'About 170 years', mn: '170 орчим жил' },
        { en: 'About 17 years', mn: '17 орчим жил' },
        { en: 'About 1,700 years', mn: '1,700 орчим жил' },
        { en: 'About 2 years', mn: '2 орчим жил' },
      ],
      answer: 0,
      explanation: {
        en: '150 million km at 100 km/h is 1.5 million hours — about 170 years of non-stop driving.',
        mn: '150 сая км-ийг цагт 100 км хурдтай явахад 1.5 сая цаг буюу 170 орчим жил зогсолтгүй явах шаардлагатай.',
      },
    },

    // ── sun ─────────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q1',
      difficulty: 1,
      prompt: { en: 'What kind of object is the Sun?', mn: 'Нар ямар төрлийн биет вэ?' },
      choices: [
        { en: 'A planet', mn: 'Гараг' },
        { en: 'A comet', mn: 'Сүүлт од' },
        { en: 'A moon', mn: 'Дагуул' },
        { en: 'A star', mn: 'Од' },
      ],
      answer: 3,
      explanation: {
        en: 'The Sun is a star — a yellow dwarf. The stars we see at night are other suns, much farther away.',
        mn: 'Нар бол од — шар одой од. Шөнө харагддаг одод бол хамаагүй хол орших өөр нарнууд.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q2',
      difficulty: 1,
      prompt: { en: 'In which part of the Sun is its energy made?', mn: 'Нарны энерги аль хэсэгт нь үүсдэг вэ?' },
      choices: [
        { en: 'The corona', mn: 'Титэм' },
        { en: 'The core', mn: 'Цөм' },
        { en: 'The photosphere', mn: 'Фотосфер' },
        { en: 'Sunspots', mn: 'Нарны толбо' },
      ],
      answer: 1,
      explanation: {
        en: 'Energy is made in the core, at about 15 million °C, where hydrogen fuses into helium.',
        mn: 'Энерги 15 орчим сая °C-тай цөмд, устөрөгч гели болон нийлэгжих үед үүсдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q3',
      difficulty: 2,
      prompt: { en: 'About how hot is the Sun’s visible surface?', mn: 'Нарны харагдах гадаргуу ойролцоогоор хэр халуун бэ?' },
      choices: [
        { en: '15 million °C', mn: '15 сая °C' },
        { en: '550 °C', mn: '550 °C' },
        { en: '5,500 °C', mn: '5,500 °C' },
        { en: '55,000 °C', mn: '55,000 °C' },
      ],
      answer: 2,
      explanation: {
        en: 'The photosphere is about 5,500 °C. The core, at about 15 million °C, is far hotter.',
        mn: 'Фотосфер 5,500 орчим °C. 15 орчим сая °C-тай цөм нь хамаагүй халуун.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q4',
      difficulty: 2,
      prompt: { en: 'What happens in the Sun’s core?', mn: 'Нарны цөмд юу болдог вэ?' },
      choices: [
        { en: 'Hydrogen fuses into helium', mn: 'Устөрөгч нийлж гели болдог' },
        { en: 'Coal burns with oxygen', mn: 'Нүүрс хүчилтөрөгчтэй шатдаг' },
        { en: 'Iron melts into lava', mn: 'Төмөр хайлж лаав болдог' },
        { en: 'Water boils into steam', mn: 'Ус буцалж уур болдог' },
      ],
      answer: 0,
      explanation: {
        en: 'Nuclear fusion joins hydrogen nuclei into helium, turning a little mass into a huge amount of energy. No oxygen or burning is involved.',
        mn: 'Цөмийн нийлэгжилт устөрөгчийн цөмүүдийг нийлүүлж гели болгон, багахан массыг асар их энерги болгодог. Хүчилтөрөгч, шаталт огт оролцдоггүй.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q5',
      difficulty: 2,
      prompt: { en: 'About how long is the sunspot cycle?', mn: 'Нарны толбоны мөчлөг ойролцоогоор хэдэн жил үргэлжилдэг вэ?' },
      choices: [
        { en: '1 year', mn: '1 жил' },
        { en: '100 years', mn: '100 жил' },
        { en: '11 years', mn: '11 жил' },
        { en: '1 month', mn: '1 сар' },
      ],
      answer: 2,
      explanation: {
        en: 'Sunspots and flares rise and fall over a cycle of about 11 years.',
        mn: 'Нарны толбо, дэлбэрэлт 11 орчим жилийн мөчлөгөөр ихсэж, багасдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q6',
      difficulty: 3,
      prompt: { en: 'How does the Sun’s corona compare with its surface?', mn: 'Нарны титэм гадаргуутайгаа харьцуулахад ямар вэ?' },
      choices: [
        { en: 'It is much cooler', mn: 'Хамаагүй хүйтэн' },
        { en: 'It is about the same', mn: 'Бараг ижил' },
        { en: 'It is colder than Earth', mn: 'Дэлхийгээс ч хүйтэн' },
        { en: 'It is over a million °C — far hotter', mn: 'Сая гаруй °C — хамаагүй халуун' },
      ],
      answer: 3,
      explanation: {
        en: 'The corona is over 1 million °C, while the surface is about 5,500 °C. Why the outer layer is so much hotter is still being studied.',
        mn: 'Титэм 1 сая гаруй °C байхад гадаргуу 5,500 орчим °C. Гадна давхарга яагаад ийм халуун байдгийг одоо ч судалж байна.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.sun',
      key: 'space.sun.q7',
      difficulty: 3,
      prompt: { en: 'What will the Sun finally become at the end of its life?', mn: 'Нар амьдралынхаа төгсгөлд эцэст нь юу болох вэ?' },
      choices: [
        { en: 'A black hole', mn: 'Хар нүх' },
        { en: 'A white dwarf', mn: 'Цагаан одой' },
        { en: 'A neutron star', mn: 'Нейтрон од' },
        { en: 'A new planet', mn: 'Шинэ гараг' },
      ],
      answer: 1,
      explanation: {
        en: 'In about 5 billion years the Sun will swell into a red giant, shed its outer layers and leave behind a small, hot white dwarf. It is too light to become a black hole.',
        mn: '5 орчим тэрбум жилийн дараа Нар улаан аварга од болж томорч, гадна давхаргаа хаяад жижиг, халуун цагаан одой үлдээнэ. Хар нүх болоход хэт хөнгөн.',
      },
    },

    // ── moon ────────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q1',
      difficulty: 1,
      prompt: { en: 'About how long does the Moon take to go through all its phases?', mn: 'Сар бүх хувирлаа ойролцоогоор хэдэн хоногт гүйцээдэг вэ?' },
      choices: [
        { en: 'About 29.5 days', mn: '29.5 орчим хоног' },
        { en: 'About 7 days', mn: '7 орчим хоног' },
        { en: 'About 365 days', mn: '365 орчим хоног' },
        { en: '24 hours', mn: '24 цаг' },
      ],
      answer: 0,
      explanation: {
        en: 'From one new moon to the next takes about 29.5 days — the origin of our “month”.',
        mn: 'Нэг шинэ сараас дараагийн шинэ сар хүртэл 29.5 орчим хоног болдог — «сар» гэдэг хугацааны нэгж үүнээс гаралтай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q2',
      difficulty: 1,
      prompt: { en: 'In which year did people first walk on the Moon?', mn: 'Хүн Сар дээр анх аль онд алхсан бэ?' },
      choices: [
        { en: '1957', mn: '1957' },
        { en: '1961', mn: '1961' },
        { en: '1969', mn: '1969' },
        { en: '1981', mn: '1981' },
      ],
      answer: 2,
      explanation: {
        en: 'Neil Armstrong and Buzz Aldrin of Apollo 11 walked on the Moon on 20 July 1969.',
        mn: '«Аполлон-11»-ийн Нил Армстронг, Базз Олдрин нар 1969 оны 7-р сарын 20-нд Сар дээр алхсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q3',
      difficulty: 2,
      prompt: { en: 'Why do we always see the same side of the Moon?', mn: 'Бид яагаад Сарны үргэлж нэг талыг хардаг вэ?' },
      choices: [
        { en: 'It does not spin at all', mn: 'Огт эргэдэггүй' },
        { en: 'Earth’s shadow hides the other side', mn: 'Дэлхийн сүүдэр нөгөө талыг нь нуудаг' },
        { en: 'The far side is always dark', mn: 'Ар тал нь үргэлж харанхуй' },
        { en: 'It spins exactly once per orbit', mn: 'Нэг тойрох хугацаандаа яг нэг эргэдэг' },
      ],
      answer: 3,
      explanation: {
        en: 'The Moon is tidally locked: it turns once on its axis in the same 27.3 days it takes to circle Earth, so one face always points at us.',
        mn: 'Сар түрлэгийн түгжрэлтэй: Дэлхийг тойрох 27.3 хоногтоо тэнхлэгээ яг нэг эргэдэг тул нэг тал нь үргэлж бидэн рүү хандана.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q4',
      difficulty: 2,
      prompt: { en: 'About how far is the Moon from Earth?', mn: 'Сар Дэлхийгээс ойролцоогоор хэр хол вэ?' },
      choices: [
        { en: '384,400 km', mn: '384,400 км' },
        { en: '38,440 km', mn: '38,440 км' },
        { en: '3.8 million km', mn: '3.8 сая км' },
        { en: '150 million km', mn: '150 сая км' },
      ],
      answer: 0,
      explanation: {
        en: 'The Moon is on average about 384,400 km away — light covers it in about 1.3 seconds.',
        mn: 'Сар дунджаар 384,400 орчим км зайтай — гэрэл энэ зайг 1.3 орчим секундэд туулдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q5',
      difficulty: 2,
      prompt: { en: 'What mainly causes ocean tides on Earth?', mn: 'Дэлхий дээрх далайн түрлэгийг голчлон юу үүсгэдэг вэ?' },
      choices: [
        { en: 'Strong winds', mn: 'Хүчтэй салхи' },
        { en: 'The Moon’s gravity', mn: 'Сарны таталцал' },
        { en: 'Earthquakes', mn: 'Газар хөдлөлт' },
        { en: 'Rivers flowing into the sea', mn: 'Далайд цутгах гол мөрөн' },
      ],
      answer: 1,
      explanation: {
        en: 'The Moon’s gravity pulls on the oceans, raising bulges of water. The Sun adds a smaller pull.',
        mn: 'Сарны таталцал далайг татаж, усыг товойлгодог. Нар үүн дээр арай бага таталцал нэмдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q6',
      difficulty: 3,
      prompt: { en: 'How fast is the Moon drifting away from Earth?', mn: 'Сар Дэлхийгээс ямар хурдтай холдож байна вэ?' },
      choices: [
        { en: 'About 3.8 m a year', mn: 'Жилд 3.8 орчим м' },
        { en: 'About 3.8 mm a year', mn: 'Жилд 3.8 орчим мм' },
        { en: 'About 38 cm a year', mn: 'Жилд 38 орчим см' },
        { en: 'About 3.8 cm a year', mn: 'Жилд 3.8 орчим см' },
      ],
      answer: 3,
      explanation: {
        en: 'Laser beams bounced off mirrors left by Apollo astronauts show the Moon moves about 3.8 cm farther away each year — about as fast as fingernails grow.',
        mn: '«Аполлон»-ы нисэгчдийн үлдээсэн толинд лазер ойлгож хэмжихэд Сар жил бүр 3.8 орчим см холдож байгаа нь хумс ургах хурдтай ойролцоо.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moon',
      key: 'space.moon.q7',
      difficulty: 3,
      prompt: { en: 'During a total lunar eclipse the Moon often looks…', mn: 'Сар бүтэн хиртэх үед Сар ихэвчлэн ямар харагддаг вэ?' },
      choices: [
        { en: 'Bright green', mn: 'Тод ногоон' },
        { en: 'Deep blue', mn: 'Тод хөх' },
        { en: 'Coppery red', mn: 'Зэс улаан' },
        { en: 'Brighter than usual', mn: 'Ердийнхөөсөө илүү тод' },
      ],
      answer: 2,
      explanation: {
        en: 'Earth’s atmosphere bends red sunlight into its shadow, so the eclipsed Moon glows coppery red — a “blood moon”.',
        mn: 'Дэлхийн агаар мандал нарны улаан гэрлийг сүүдэр рүүгээ хазайлгадаг тул хиртсэн Сар зэс улаан туяатай болдог — «цуст сар» гэдэг.',
      },
    },

    // ── moons ───────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q1',
      difficulty: 1,
      prompt: { en: 'Which is the largest moon in the solar system?', mn: 'Нарны аймгийн хамгийн том дагуул аль нь вэ?' },
      choices: [
        { en: 'Titan', mn: 'Титан' },
        { en: 'Earth’s Moon', mn: 'Сар' },
        { en: 'Ganymede', mn: 'Ганимед' },
        { en: 'Europa', mn: 'Европа' },
      ],
      answer: 2,
      explanation: {
        en: 'Jupiter’s Ganymede, about 5,268 km across, is the largest moon. Saturn’s Titan is a close second.',
        mn: 'Бархасбадийн 5,268 орчим км голчтой Ганимед бол хамгийн том дагуул. Санчирын Титан бараг адилхан хоёрдугаарт орно.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q2',
      difficulty: 2,
      prompt: { en: 'Which moon is the most volcanically active place in the solar system?', mn: 'Аль дагуул Нарны аймгийн хамгийн идэвхтэй галт уулын газар вэ?' },
      choices: [
        { en: 'Europa', mn: 'Европа' },
        { en: 'Io', mn: 'Ио' },
        { en: 'Titan', mn: 'Титан' },
        { en: 'Triton', mn: 'Тритон' },
      ],
      answer: 1,
      explanation: {
        en: 'Jupiter’s moon Io has hundreds of active volcanoes, heated by Jupiter’s gravity squeezing its interior.',
        mn: 'Бархасбадийн дагуул Ио нь хэдэн зуун идэвхтэй галт уултай бөгөөд Бархасбадийн таталцал дотор талыг нь шахаж халаадаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q3',
      difficulty: 2,
      prompt: {
        en: 'Which moon has a thick atmosphere and lakes of liquid methane?',
        mn: 'Аль дагуул өтгөн агаар мандал, шингэн метаны нууртай вэ?',
      },
      choices: [
        { en: 'Titan', mn: 'Титан' },
        { en: 'Ganymede', mn: 'Ганимед' },
        { en: 'Phobos', mn: 'Фобос' },
        { en: 'Callisto', mn: 'Каллисто' },
      ],
      answer: 0,
      explanation: {
        en: 'Saturn’s Titan has a nitrogen atmosphere denser than Earth’s, with methane rain, rivers and lakes.',
        mn: 'Санчирын Титан Дэлхийнхээс нягт азотын агаар мандалтай бөгөөд метаны бороо, гол, нууртай.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q4',
      difficulty: 2,
      prompt: {
        en: 'Which small moon sprays jets of water that feed one of Saturn’s rings?',
        mn: 'Аль жижиг дагуул усны оргилуур цацаж, Санчирын нэг цагирагийг тэжээдэг вэ?',
      },
      choices: [
        { en: 'Io', mn: 'Ио' },
        { en: 'Triton', mn: 'Тритон' },
        { en: 'Europa', mn: 'Европа' },
        { en: 'Enceladus', mn: 'Энцелад' },
      ],
      answer: 3,
      explanation: {
        en: 'Enceladus, only about 500 km across, shoots water from its south pole; the ice forms Saturn’s E ring.',
        mn: 'Ердөө 500 орчим км голчтой Энцелад өмнөд туйлаасаа ус цацдаг бөгөөд тэр мөс нь Санчирын E цагирагийг бүрдүүлдэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q5',
      difficulty: 3,
      prompt: { en: 'What makes Neptune’s moon Triton unusual?', mn: 'Далайн вангийн дагуул Тритон юугаараа онцлог вэ?' },
      choices: [
        { en: 'It is the largest moon', mn: 'Хамгийн том дагуул' },
        { en: 'It is covered in lava lakes', mn: 'Лаавын нуураар бүрхэгдсэн' },
        { en: 'It orbits backwards', mn: 'Урвуу чиглэлд тойрдог' },
        { en: 'It has no gravity', mn: 'Таталцалгүй' },
      ],
      answer: 2,
      explanation: {
        en: 'Triton circles Neptune opposite to the planet’s spin, a sign that it was probably captured from the Kuiper belt.',
        mn: 'Тритон Далайн вангийн эргэлтийн эсрэг чиглэлд тойрдог нь Койперын бүсээс баригдсан байх магадлалтайг харуулдаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.moons',
      key: 'space.moons.q6',
      difficulty: 3,
      prompt: { en: 'Which NASA mission launched in 2024 to study Jupiter’s ocean moon?', mn: '2024 онд Бархасбадийн далайт дагуулыг судлахаар хөөрсөн NASA-гийн нислэг аль вэ?' },
      choices: [
        { en: 'New Horizons', mn: '«Шинэ давхрага»' },
        { en: 'Europa Clipper', mn: '«Европа Клиппер»' },
        { en: 'Hubble', mn: '«Хаббл»' },
        { en: 'Curiosity', mn: '«Кюриосити»' },
      ],
      answer: 1,
      explanation: {
        en: 'Europa Clipper launched in October 2024 and will reach Jupiter in 2030 to study Europa’s ice shell and hidden ocean.',
        mn: '«Европа Клиппер» 2024 оны 10-р сард хөөрсөн бөгөөд 2030 онд Бархасбадьд хүрч, Европагийн мөсөн бүрхүүл, нууц далайг судална.',
      },
    },

    // ── small bodies ────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q1',
      difficulty: 1,
      prompt: { en: 'Where is the main asteroid belt?', mn: 'Астероидын гол бүс хаана оршдог вэ?' },
      choices: [
        { en: 'Between Earth and Mars', mn: 'Дэлхий, Ангарагийн хооронд' },
        { en: 'Between Mars and Jupiter', mn: 'Ангараг, Бархасбадийн хооронд' },
        { en: 'Beyond Neptune', mn: 'Далайн вангийн цаана' },
        { en: 'Around the Sun’s core', mn: 'Нарны цөмийг тойрон' },
      ],
      answer: 1,
      explanation: {
        en: 'The asteroid belt lies between Mars and Jupiter. The icy Kuiper belt is the one beyond Neptune.',
        mn: 'Астероидын бүс Ангараг, Бархасбадийн хооронд оршдог. Далайн вангийн цаана байдаг нь мөсөн Койперын бүс.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q2',
      difficulty: 1,
      prompt: { en: 'What is a meteorite?', mn: 'Солирын чулуу (метеорит) гэж юу вэ?' },
      choices: [
        { en: 'A streak of light in the sky', mn: 'Тэнгэрт гарах гэрлийн зурвас' },
        { en: 'A small moon', mn: 'Жижиг дагуул' },
        { en: 'A comet’s tail', mn: 'Сүүлт одны сүүл' },
        { en: 'A space rock that lands on Earth', mn: 'Дэлхий дээр унасан сансрын чулуу' },
      ],
      answer: 3,
      explanation: {
        en: 'A meteor is the streak of light; a meteorite is the piece that survives the fall and reaches the ground.',
        mn: 'Солир бол гэрлийн зурвас; солирын чулуу бол шатаж дуусалгүй газарт хүрсэн хэсэг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q3',
      difficulty: 2,
      prompt: { en: 'Which way does a comet’s tail point?', mn: 'Сүүлт одны сүүл аль зүг рүү чиглэдэг вэ?' },
      choices: [
        { en: 'Away from the Sun', mn: 'Нарнаас эсрэг тийш' },
        { en: 'Toward the Sun', mn: 'Нар руу' },
        { en: 'Always behind it along its path', mn: 'Үргэлж замынхаа ард' },
        { en: 'Toward Earth', mn: 'Дэлхий рүү' },
      ],
      answer: 0,
      explanation: {
        en: 'Sunlight and the solar wind push the gas and dust outward, so the tail points away from the Sun — even when the comet is heading away.',
        mn: 'Нарны гэрэл, нарны салхи хий, тоосыг гадагш түлхдэг тул сүүл нь сүүлт од холдож явахад ч Нарнаас эсрэг тийш чиглэнэ.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q4',
      difficulty: 2,
      prompt: { en: 'What is the largest object in the asteroid belt?', mn: 'Астероидын бүсийн хамгийн том биет юу вэ?' },
      choices: [
        { en: 'Vesta', mn: 'Веста' },
        { en: 'Ceres', mn: 'Церера' },
        { en: 'Eris', mn: 'Эрида' },
        { en: 'Haumea', mn: 'Хаумеа' },
      ],
      answer: 1,
      explanation: {
        en: 'Ceres, about 940 km across, is the largest body in the belt and is classed as a dwarf planet. Eris and Haumea are far out in the Kuiper belt region.',
        mn: '940 орчим км голчтой Церера бол бүсийн хамгийн том биет бөгөөд одой гарагт тооцогддог. Эрида, Хаумеа хоёр Койперын бүсийн орчим алсад оршдог.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q5',
      difficulty: 2,
      prompt: { en: 'When is Halley’s Comet next expected to return?', mn: 'Галлейн сүүлт од дараагийн удаа хэдэн онд эргэж ирэх вэ?' },
      choices: [
        { en: '2026', mn: '2026' },
        { en: '2041', mn: '2041' },
        { en: '2061', mn: '2061' },
        { en: '2099', mn: '2099' },
      ],
      answer: 2,
      explanation: {
        en: 'Halley’s Comet comes back about every 76 years. It last passed in 1986, so it returns in 2061.',
        mn: 'Галлейн сүүлт од 76 орчим жил тутамд эргэж ирдэг. Хамгийн сүүлд 1986 онд өнгөрсөн тул 2061 онд дахин ирнэ.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q6',
      difficulty: 3,
      prompt: {
        en: 'Which discovery in 2005 led astronomers to reclassify Pluto?',
        mn: '2005 оны аль нээлт одон орон судлаачдыг Плутоныг дахин ангилахад хүргэсэн бэ?',
      },
      choices: [
        { en: 'Makemake', mn: 'Макемаке' },
        { en: 'Ceres', mn: 'Церера' },
        { en: 'Haumea', mn: 'Хаумеа' },
        { en: 'Eris', mn: 'Эрида' },
      ],
      answer: 3,
      explanation: {
        en: 'Eris is almost as wide as Pluto and even more massive. Finding it raised the question “what is a planet?”, and in 2006 Pluto became a dwarf planet.',
        mn: 'Эрида бараг Плутоны хэмжээтэй бөгөөд түүнээс ч илүү масстай. Үүнийг нээснээр «гараг гэж юу вэ?» гэсэн асуулт гарч, 2006 онд Плутон одой гараг болсон.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.small-bodies',
      key: 'space.small-bodies.q7',
      difficulty: 3,
      prompt: { en: 'Which planet rule does a dwarf planet fail?', mn: 'Одой гараг гарагийн аль шалгуурыг хангадаггүй вэ?' },
      choices: [
        { en: 'It must orbit the Sun', mn: 'Нарыг тойрох' },
        { en: 'It must be round', mn: 'Бөөрөнхий байх' },
        { en: 'It must clear its orbit of other objects', mn: 'Тойрог замаа бусад биетээс цэвэрлэсэн байх' },
        { en: 'It must have a moon', mn: 'Дагуултай байх' },
      ],
      answer: 2,
      explanation: {
        en: 'Dwarf planets orbit the Sun and are round, but they share their path with many other bodies — Pluto, for example, moves among Kuiper belt objects.',
        mn: 'Одой гарагууд Нарыг тойрдог, бөөрөнхий боловч замаа олон биеттэй хуваалцдаг — жишээ нь Плутон Койперын бүсийн биетүүдийн дунд хөдөлдөг.',
      },
    },

    // ── exploration ─────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q1',
      difficulty: 1,
      prompt: { en: 'Who was the first person in space?', mn: 'Сансарт ниссэн анхны хүн хэн бэ?' },
      choices: [
        { en: 'Yuri Gagarin', mn: 'Юрий Гагарин' },
        { en: 'Neil Armstrong', mn: 'Нил Армстронг' },
        { en: 'Valentina Tereshkova', mn: 'Валентина Терешкова' },
        { en: 'Buzz Aldrin', mn: 'Базз Олдрин' },
      ],
      answer: 0,
      explanation: {
        en: 'Yuri Gagarin orbited Earth in Vostok 1 on 12 April 1961. Armstrong walked on the Moon eight years later.',
        mn: 'Юрий Гагарин 1961 оны 4-р сарын 12-нд «Восток-1» хөлгөөр Дэлхийг тойрсон. Армстронг найман жилийн дараа Сар дээр алхсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q2',
      difficulty: 1,
      prompt: { en: 'Who was Mongolia’s first cosmonaut?', mn: 'Монголын анхны сансрын нисэгч хэн бэ?' },
      choices: [
        { en: 'Yuri Gagarin', mn: 'Ю.Гагарин' },
        { en: 'Vladimir Dzhanibekov', mn: 'В.Жанибеков' },
        { en: 'Jügderdemidiin Gürragchaa', mn: 'Ж.Гүррагчаа' },
        { en: 'Valentina Tereshkova', mn: 'В.Терешкова' },
      ],
      answer: 2,
      explanation: {
        en: 'Jügderdemidiin Gürragchaa flew to space in 1981 on Soyuz 39. Vladimir Dzhanibekov was his Soviet crewmate.',
        mn: 'Ж.Гүррагчаа 1981 онд «Союз-39» хөлгөөр сансарт ниссэн. В.Жанибеков түүний Зөвлөлтийн багийн анд байв.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q3',
      difficulty: 2,
      prompt: { en: 'In which year did Gürragchaa fly into space?', mn: 'Ж.Гүррагчаа аль онд сансарт ниссэн бэ?' },
      choices: [
        { en: '1961', mn: '1961' },
        { en: '1969', mn: '1969' },
        { en: '1975', mn: '1975' },
        { en: '1981', mn: '1981' },
      ],
      answer: 3,
      explanation: {
        en: 'Gürragchaa launched on 22 March 1981 and spent about 8 days in space, visiting the Salyut 6 space station.',
        mn: 'Ж.Гүррагчаа 1981 оны 3-р сарын 22-нд хөөрч, «Салют-6» станцад зочлон сансарт 8 орчим хоног байсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q4',
      difficulty: 2,
      prompt: { en: 'What was the first artificial satellite?', mn: 'Анхны хиймэл дагуул юу байсан бэ?' },
      choices: [
        { en: 'Sputnik 1', mn: '«Спутник-1»' },
        { en: 'Vostok 1', mn: '«Восток-1»' },
        { en: 'Hubble', mn: '«Хаббл»' },
        { en: 'Apollo 11', mn: '«Аполлон-11»' },
      ],
      answer: 0,
      explanation: {
        en: 'The Soviet Union launched Sputnik 1 on 4 October 1957, starting the space age. Vostok 1 carried Gagarin in 1961.',
        mn: 'ЗХУ 1957 оны 10-р сарын 4-нд «Спутник-1»-ийг хөөргөж, сансрын эрин эхэлсэн. «Восток-1» 1961 онд Гагариныг тээсэн.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q5',
      difficulty: 2,
      prompt: { en: 'Which spacecraft flew past Pluto in 2015?', mn: '2015 онд Плутоны хажуугаар ниссэн сансрын аппарат аль вэ?' },
      choices: [
        { en: 'Cassini', mn: '«Кассини»' },
        { en: 'New Horizons', mn: '«Шинэ давхрага»' },
        { en: 'Voyager 2', mn: '«Вояжер-2»' },
        { en: 'Juno', mn: '«Жюно»' },
      ],
      answer: 1,
      explanation: {
        en: 'New Horizons reached Pluto on 14 July 2015 after a nine-year trip and photographed its icy heart.',
        mn: '«Шинэ давхрага» есөн жил аялсны эцэст 2015 оны 7-р сарын 14-нд Плутонд хүрч, мөсөн зүрхийг нь зургаа авсан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q6',
      difficulty: 3,
      prompt: { en: 'Which was the first spacecraft to enter interstellar space?', mn: 'Одод хоорондын орон зайд анх орсон сансрын аппарат аль вэ?' },
      choices: [
        { en: 'New Horizons', mn: '«Шинэ давхрага»' },
        { en: 'Pioneer 10', mn: '«Пионер-10»' },
        { en: 'Voyager 1', mn: '«Вояжер-1»' },
        { en: 'Hubble', mn: '«Хаббл»' },
      ],
      answer: 2,
      explanation: {
        en: 'Voyager 1, launched in 1977, crossed the edge of the Sun’s bubble (the heliosphere) in 2012. Voyager 2 followed in 2018.',
        mn: '1977 онд хөөрсөн «Вояжер-1» 2012 онд Нарны хөөсөн бүрхүүл (гелиосфер)-ийн хилийг давсан. «Вояжер-2» 2018 онд дагасан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.exploration',
      key: 'space.exploration.q7',
      difficulty: 3,
      prompt: {
        en: 'Mongolia was which country in the world to send a person into space?',
        mn: 'Монгол Улс сансарт хүн илгээсэн дэлхийн хэд дэх орон бэ?',
      },
      choices: [
        { en: '5th', mn: '5 дахь' },
        { en: '10th', mn: '10 дахь' },
        { en: '15th', mn: '15 дахь' },
        { en: '20th', mn: '20 дахь' },
      ],
      answer: 1,
      explanation: {
        en: 'With Gürragchaa’s Soyuz 39 flight in 1981, Mongolia became the 10th country to send a citizen into space.',
        mn: '1981 онд Ж.Гүррагчаа «Союз-39»-өөр ниссэнээр Монгол Улс сансарт иргэнээ илгээсэн 10 дахь орон болсон.',
      },
    },

    // ── records ─────────────────────────────────────────────────────
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q1',
      difficulty: 1,
      prompt: { en: 'Which is the hottest planet?', mn: 'Хамгийн халуун гараг аль нь вэ?' },
      choices: [
        { en: 'Mercury', mn: 'Буд' },
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Venus', mn: 'Сугар' },
      ],
      answer: 3,
      explanation: {
        en: 'Venus is the hottest planet at about 465 °C, even though Mercury is closer to the Sun.',
        mn: 'Буд Нарт ойр байсаар атлаа хамгийн халуун нь 465 орчим °C-тай Сугар гараг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q2',
      difficulty: 1,
      prompt: { en: 'Where is the tallest volcano in the solar system?', mn: 'Нарны аймгийн хамгийн өндөр галт уул хаана байдаг вэ?' },
      choices: [
        { en: 'Earth', mn: 'Дэлхий' },
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Io', mn: 'Ио' },
      ],
      answer: 1,
      explanation: {
        en: 'Olympus Mons on Mars rises about 22 km — roughly two and a half times the height of Everest.',
        mn: 'Ангараг дээрх Олимп уул 22 орчим км өндөр — Эверестээс хоёр хагас орчим дахин өндөр.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q3',
      difficulty: 2,
      prompt: { en: 'Which planet has the fastest winds?', mn: 'Аль гараг хамгийн хүчтэй салхитай вэ?' },
      choices: [
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Neptune', mn: 'Далайн ван' },
        { en: 'Earth', mn: 'Дэлхий' },
      ],
      answer: 2,
      explanation: {
        en: 'Neptune’s winds reach about 2,100 km/h — faster than the speed of sound on Earth.',
        mn: 'Далайн вангийн салхи цагт 2,100 орчим км хүрдэг нь Дэлхий дээрх дууны хурднаас хурдан.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q4',
      difficulty: 2,
      prompt: {
        en: 'Which planet takes longer to spin once than to go once around the Sun?',
        mn: 'Аль гараг Нарыг нэг тойрохоосоо илүү удаан хугацаанд тэнхлэгээ нэг эргэдэг вэ?',
      },
      choices: [
        { en: 'Venus', mn: 'Сугар' },
        { en: 'Mars', mn: 'Ангараг' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Uranus', mn: 'Тэнгэрийн ван' },
      ],
      answer: 0,
      explanation: {
        en: 'Venus needs 243 Earth days to spin once but only 225 days to orbit the Sun — its day is longer than its year.',
        mn: 'Сугар тэнхлэгээ нэг эргэхэд 243 хоног, Нарыг тойроход ердөө 225 хоног зарцуулдаг — өдөр нь жилээсээ урт.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q5',
      difficulty: 2,
      prompt: { en: 'Which planet has the shortest day?', mn: 'Аль гараг хамгийн богино хоногтой вэ?' },
      choices: [
        { en: 'Saturn', mn: 'Санчир' },
        { en: 'Jupiter', mn: 'Бархасбадь' },
        { en: 'Earth', mn: 'Дэлхий' },
        { en: 'Neptune', mn: 'Далайн ван' },
      ],
      answer: 1,
      explanation: {
        en: 'Jupiter spins once every 9 hours 56 minutes. Saturn is close behind at about 10 hours 34 minutes.',
        mn: 'Бархасбадь 9 цаг 56 минутад нэг эргэдэг. Санчир 10 цаг 34 орчим минутаар түүний дараа орно.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q6',
      difficulty: 3,
      prompt: {
        en: 'Why is Venus hotter than Mercury, which is closer to the Sun?',
        mn: 'Нарт ойр Будаас Сугар яагаад халуун байдаг вэ?',
      },
      choices: [
        { en: 'It is actually closer to the Sun', mn: 'Үнэндээ Нарт илүү ойр' },
        { en: 'Its volcanoes heat the air', mn: 'Галт уул нь агаарыг халаадаг' },
        { en: 'It is bigger than Mercury', mn: 'Будаас том' },
        { en: 'Its thick carbon dioxide atmosphere traps heat', mn: 'Нүүрсхүчлийн хийн өтгөн агаар мандал дулааныг барьдаг' },
      ],
      answer: 3,
      explanation: {
        en: 'Venus’s dense carbon dioxide atmosphere creates a runaway greenhouse effect. Mercury has almost no air, so its heat escapes at night.',
        mn: 'Сугарын нүүрсхүчлийн хийн нягт агаар мандал хүлэмжийн хэт хүчтэй нөлөө үүсгэдэг. Буд бараг агааргүй тул шөнө дулаан нь алдагддаг.',
      },
    },
    {
      topicSlug: T,
      lessonKey: 'space.records',
      key: 'space.records.q7',
      difficulty: 3,
      prompt: { en: 'About how tall is Olympus Mons?', mn: 'Олимп уул ойролцоогоор хэр өндөр вэ?' },
      choices: [
        { en: 'About 9 km', mn: '9 орчим км' },
        { en: 'About 50 km', mn: '50 орчим км' },
        { en: 'About 22 km', mn: '22 орчим км' },
        { en: 'About 100 km', mn: '100 орчим км' },
      ],
      answer: 2,
      explanation: {
        en: 'Olympus Mons stands about 22 km above the surrounding plains. Everest is about 8.8 km tall.',
        mn: 'Олимп уул орчны тэгш талаасаа 22 орчим км өндөрт өргөгддөг. Эверест 8.8 орчим км өндөр.',
      },
    },
  ],
};
