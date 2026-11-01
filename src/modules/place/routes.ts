import { Router } from 'express';
import { readPlaceFacts, type PlaceFacts } from '../../seed/place-facts';
import { HttpError } from '../shared/validate';

const router = Router();

let cache: PlaceFacts | null = null;

// One region's profile, opened when it is tapped on a map.
router.get('/:map/:id', (req, res) => {
  cache ??= readPlaceFacts();
  const profile = cache[req.params.map as keyof PlaceFacts]?.[req.params.id];
  if (!profile) throw new HttpError(404, 'No facts for this place yet');
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(profile);
});

export default router;
