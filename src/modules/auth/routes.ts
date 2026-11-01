import { Router } from 'express';
import { z } from 'zod';
import { User } from './user.model';
import { checkPassword, hashPassword, publicUser, requireAuth, signToken, verifyGoogle } from './auth';
import { HttpError, parse } from '../shared/validate';
import { rateLimit } from '../../middlewares/rateLimit';

const router = Router();
const limit = rateLimit({ windowMs: 60_000, max: 10 });

const session = (user: Parameters<typeof publicUser>[0]) => ({
  token: signToken(String(user._id)),
  user: publicUser(user),
});

const email = z.string().trim().toLowerCase().email('must be an email').max(200);
const password = z.string().min(8, 'at least 8 characters').max(200);

router.post('/register', limit, async (req, res) => {
  const body = parse(z.object({ name: z.string().trim().min(1).max(80), email, password }), req.body);
  const existing = await User.findOne({ email: body.email }).select('+passwordHash').lean();
  if (existing?.passwordHash) throw new HttpError(409, 'This email is already registered — sign in instead');

  const passwordHash = await hashPassword(body.password);
  // An account made with Google first gets a password added to it.
  const user = existing
    ? await User.findByIdAndUpdate(existing._id, { $set: { passwordHash, name: existing.name || body.name } }, { new: true }).lean()
    : (await User.create({ email: body.email, name: body.name, passwordHash })).toObject();
  res.status(201).json(session(user!));
});

router.post('/login', limit, async (req, res) => {
  const body = parse(z.object({ email, password: z.string().min(1).max(200) }), req.body);
  const user = await User.findOne({ email: body.email }).select('+passwordHash').lean();
  if (!user || !(await checkPassword(body.password, user.passwordHash))) {
    throw new HttpError(401, user && !user.passwordHash ? 'This email signs in with Google' : 'Wrong email or password');
  }
  await User.updateOne({ _id: user._id }, { $set: { lastSeenAt: new Date() } });
  res.json(session(user));
});

router.post('/google', limit, async (req, res) => {
  const { credential } = parse(z.object({ credential: z.string().min(10).max(5000) }), req.body);
  const profile = await verifyGoogle(credential);
  const emailLower = profile.email.toLowerCase();
  // Same person by Google id, else by email (links an email+password account).
  const found = (await User.findOne({ googleId: profile.sub }).lean()) ?? (await User.findOne({ email: emailLower }).lean());
  const set = {
    googleId: profile.sub,
    lastSeenAt: new Date(),
    ...(profile.picture && { avatar: profile.picture }),
    ...(!found?.name && profile.name && { name: profile.name }),
  };
  const user = found
    ? await User.findByIdAndUpdate(found._id, { $set: set }, { new: true }).lean()
    : (await User.create({ email: emailLower, name: profile.name ?? '', ...set })).toObject();
  res.json(session(user!));
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

router.patch('/me', requireAuth, async (req, res) => {
  const { name } = parse(z.object({ name: z.string().trim().min(1).max(80) }), req.body);
  const user = await User.findByIdAndUpdate(req.user!.id, { $set: { name } }, { new: true }).lean();
  res.json({ user: publicUser(user!) });
});

export default router;
