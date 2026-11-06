import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import topicRoutes from './modules/topic/routes';
import questionRoutes from './modules/question/routes';
import attemptRoutes from './modules/attempt/routes';
import authRoutes from './modules/auth/routes';
import meRoutes from './modules/me/routes';
import adminRoutes from './modules/admin/routes';
import jeopardyRoutes from './modules/jeopardy/routes';
import placeRoutes from './modules/place/routes';
import tournamentRoutes from './modules/tournament/routes';
import { HttpError } from './modules/shared/validate';

export const createApp = () => {
  const app = express();

  const origins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.set('trust proxy', 1);
  app.use(cors(origins.length ? { origin: origins } : undefined));
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });
  // Vector maps (npm run maps). Same folder from src/ and dist/.
  app.use('/maps', express.static(path.resolve(__dirname, '..', 'maps'), { maxAge: '7d' }));
  app.use('/topics', topicRoutes);
  app.use('/quiz', questionRoutes);
  app.use('/attempts', attemptRoutes);
  app.use('/auth', authRoutes);
  app.use('/me', meRoutes);
  app.use('/admin', adminRoutes);
  app.use('/jeopardy', jeopardyRoutes);
  app.use('/places', placeRoutes);
  app.use('/tournament', tournamentRoutes);

  app.use((_req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  // Express 5 forwards rejected async handlers here.
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) return res.status(err.status).json({ message: err.message });
    if (err?.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON' });
    console.error('[error]', err);
    res.status(500).json({ message: 'Something went wrong' });
  });

  return app;
};
