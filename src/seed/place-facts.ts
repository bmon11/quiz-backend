import fs from 'node:fs';
import path from 'node:path';
import type { MapName, PlaceProfile } from './types';

// Region profiles for the maps (npm run place-facts). Read straight from the
// JSON file by the API — no collection, no seed step.

export const placeFactsFile = path.resolve(__dirname, '../..', 'src/seed/data/place-facts.json');

export type PlaceFacts = Partial<Record<MapName, Record<string, PlaceProfile>>>;

export const readPlaceFacts = (): PlaceFacts =>
  fs.existsSync(placeFactsFile) ? (JSON.parse(fs.readFileSync(placeFactsFile, 'utf8')) as PlaceFacts) : {};
