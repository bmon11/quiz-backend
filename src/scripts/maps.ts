/**
 * npm run maps — builds the vector maps the app draws and the place list the
 * seed tags questions with.
 *
 *   maps/mongolia.json   21 aimags + Ulaanbaatar (geoBoundaries MNG ADM1, from
 *                        OpenStreetMap — ODbL, credited under every map)
 *   maps/world.json      countries (Natural Earth 1:50m, public domain)
 *   src/seed/data/places.json   id → English / Mongolian names + aliases
 *
 * Both maps are TopoJSON with one object "regions"; every feature has
 * properties { id, name, mn }. Re-run only to refresh the sources — the output is
 * committed.
 */
import fs from 'node:fs';
import path from 'node:path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mapshaper = require('mapshaper');

const ROOT = path.resolve(__dirname, '../..');
const MAPS = path.join(ROOT, 'maps');
const PLACES = path.join(ROOT, 'src/seed/data/places.json');

const SOURCES = {
  mongolia:
    'https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MNG/ADM1/geoBoundaries-MNG-ADM1_simplified.geojson',
  world: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson',
};

export type Place = { id: string; en: string; mn: string; aliases: string[]; continent?: string };

/** ISO 3166-2 → our id and names. Aliases are spellings found in questions. */
const AIMAGS: Record<string, Omit<Place, 'id'> & { id: string }> = {
  'MN-073': { id: 'arkhangai', en: 'Arkhangai', mn: 'Архангай', aliases: ['Arkhangay', 'Arhangai'] },
  'MN-069': { id: 'bayankhongor', en: 'Bayankhongor', mn: 'Баянхонгор', aliases: ['Bayanhongor'] },
  'MN-071': { id: 'bayan-olgii', en: 'Bayan-Ölgii', mn: 'Баян-Өлгий', aliases: ['Bayan-Olgii', 'Bayan-Ulgii', 'Bayan Ölgii', 'Bayan-Ölgiy'] },
  'MN-067': { id: 'bulgan', en: 'Bulgan', mn: 'Булган', aliases: [] },
  'MN-037': { id: 'darkhan-uul', en: 'Darkhan-Uul', mn: 'Дархан-Уул', aliases: ['Darkhan', 'Darhan'] },
  'MN-061': { id: 'dornod', en: 'Dornod', mn: 'Дорнод', aliases: [] },
  'MN-063': { id: 'dornogovi', en: 'Dornogovi', mn: 'Дорноговь', aliases: ['Dornogobi', 'East Gobi'] },
  'MN-059': { id: 'dundgovi', en: 'Dundgovi', mn: 'Дундговь', aliases: ['Dundgobi', 'Middle Gobi'] },
  'MN-065': { id: 'govi-altai', en: 'Govi-Altai', mn: 'Говь-Алтай', aliases: ['Gobi-Altai', 'Govi Altai'] },
  'MN-064': { id: 'govisumber', en: 'Govisümber', mn: 'Говьсүмбэр', aliases: ['Govisumber', 'Gobisümber'] },
  'MN-039': { id: 'khentii', en: 'Khentii', mn: 'Хэнтий', aliases: ['Hentii', 'Khentiy'] },
  'MN-043': { id: 'khovd', en: 'Khovd', mn: 'Ховд', aliases: ['Hovd'] },
  'MN-041': { id: 'khovsgol', en: 'Khövsgöl', mn: 'Хөвсгөл', aliases: ['Khovsgol', 'Hövsgöl', 'Hovsgol', 'Khuvsgul', 'Huvsgul'] },
  'MN-035': { id: 'orkhon', en: 'Orkhon', mn: 'Орхон', aliases: [] },
  'MN-053': { id: 'omnogovi', en: 'Ömnögovi', mn: 'Өмнөговь', aliases: ['Omnogovi', 'Umnugovi', 'South Gobi'] },
  'MN-055': { id: 'ovorkhangai', en: 'Övörkhangai', mn: 'Өвөрхангай', aliases: ['Ovorkhangai', 'Uvurkhangai'] },
  'MN-049': { id: 'selenge', en: 'Selenge', mn: 'Сэлэнгэ', aliases: [] },
  'MN-051': { id: 'sukhbaatar', en: 'Sükhbaatar', mn: 'Сүхбаатар', aliases: ['Sukhbaatar'] },
  'MN-047': { id: 'tov', en: 'Töv', mn: 'Төв', aliases: ['Tuv'] },
  'MN-046': { id: 'uvs', en: 'Uvs', mn: 'Увс', aliases: [] },
  'MN-057': { id: 'zavkhan', en: 'Zavkhan', mn: 'Завхан', aliases: ['Zavhan'] },
  'MN-1': { id: 'ulaanbaatar', en: 'Ulaanbaatar', mn: 'Улаанбаатар', aliases: ['Ulan Bator', 'Ulaan Baatar'] },
};

/** Common names questions use that Natural Earth spells differently (by ADM0_A3). */
const COUNTRY_ALIASES: Record<string, string[]> = {
  USA: ['United States', 'USA', 'U.S.'],
  GBR: ['UK', 'Britain', 'Great Britain', 'England', 'Scotland', 'Wales'],
  NLD: ['Holland', 'the Netherlands'],
  MMR: ['Burma'],
  CZE: ['Czech Republic', 'Czechia'],
  CIV: ['Ivory Coast', "Côte d'Ivoire"],
  COD: ['DR Congo', 'DRC', 'Democratic Republic of the Congo'],
  COG: ['Republic of the Congo'],
  KOR: ['South Korea'],
  PRK: ['North Korea'],
  RUS: ['Russia', 'Soviet Union', 'USSR'],
  VAT: ['Vatican', 'Vatican City'],
  SWZ: ['Eswatini', 'Swaziland'],
  MKD: ['North Macedonia', 'Macedonia'],
  TLS: ['East Timor', 'Timor-Leste'],
  CPV: ['Cape Verde', 'Cabo Verde'],
  TUR: ['Turkey', 'Türkiye'],
  BIH: ['Bosnia'],
  ARE: ['UAE', 'United Arab Emirates'],
  LAO: ['Laos'],
  VNM: ['Vietnam', 'Viet Nam'],
  IRN: ['Iran', 'Persia'],
  CHN: ['China', 'Inner Mongolia', 'Tibet'],
  BHS: ['Bahamas', 'The Bahamas'],
  GMB: ['Gambia', 'The Gambia'],
  SAH: ['Western Sahara'],
};

/** Map-only scraps that aren't countries anyone asks about. */
const SKIP = new Set(['ATA', 'ATC', 'IOA', 'KAS', 'CSI', 'CNM', 'ESB', 'WSB', 'USG', 'BJN', 'SER', 'SCR', 'PGA']);

const fetchJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json() as Promise<{ type: string; features: { properties: Record<string, any>; geometry: unknown }[] }>;
};

/** GeoJSON → simplified TopoJSON with properties { id, name, mn } on object "regions". */
const toTopo = async (geo: object, simplify: string) => {
  const out = await mapshaper.applyCommands(
    `-i regions.json -simplify ${simplify} keep-shapes -clean -o regions.topojson format=topojson quantization=10000 precision=0.001`,
    { 'regions.json': JSON.stringify(geo) }
  );
  return out['regions.topojson'] as string;
};

const mnRegion = new Intl.DisplayNames(['mn'], { type: 'region' });

const main = async () => {
  fs.mkdirSync(MAPS, { recursive: true });

  // ── Mongolia ──
  const mng = await fetchJson(SOURCES.mongolia);
  const aimags: Place[] = [];
  mng.features = mng.features.map((f) => {
    const a = AIMAGS[f.properties.shapeISO];
    if (!a) throw new Error(`unknown aimag ${f.properties.shapeISO} ${f.properties.shapeName}`);
    aimags.push({ id: a.id, en: a.en, mn: a.mn, aliases: a.aliases });
    return { ...f, properties: { id: a.id, name: a.en, mn: a.mn } };
  });
  fs.writeFileSync(path.join(MAPS, 'mongolia.json'), await toTopo(mng, '25%'));

  // ── World ──
  const ne = await fetchJson(SOURCES.world);
  const countries: Place[] = [];
  ne.features = ne.features
    .filter((f) => !SKIP.has(f.properties.ADM0_A3))
    .map((f) => {
      const p = f.properties;
      const id = p.ADM0_A3 as string;
      // Short common name ("China"), unless Natural Earth abbreviated it ("Dem. Rep. Congo").
      const en = (p.NAME && !p.NAME.includes('.') ? p.NAME : p.NAME_EN || p.NAME) as string;
      const iso2 = p.ISO_A2_EH !== '-99' ? p.ISO_A2_EH : p.ISO_A2 !== '-99' ? p.ISO_A2 : null;
      let mn = en;
      try {
        if (iso2) mn = mnRegion.of(iso2) ?? en;
      } catch {
        // not a region code ICU knows
      }
      const aliases = [...new Set([p.NAME, p.NAME_EN, p.NAME_LONG, p.ADMIN, ...(COUNTRY_ALIASES[id] ?? [])])].filter(
        (a) => a && a !== en && !a.includes('.')
      );
      countries.push({ id, en, mn, aliases, continent: p.CONTINENT });
      return { ...f, properties: { id, name: en, mn } };
    });
  fs.writeFileSync(path.join(MAPS, 'world.json'), await toTopo(ne, '12%'));

  fs.writeFileSync(PLACES, `${JSON.stringify({ mongolia: aimags, world: countries }, null, 1)}\n`);
  for (const f of ['mongolia.json', 'world.json']) {
    console.log(`maps/${f}: ${Math.round(fs.statSync(path.join(MAPS, f)).size / 1024)} KB`);
  }
  console.log(`places: ${aimags.length} aimags, ${countries.length} countries`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
