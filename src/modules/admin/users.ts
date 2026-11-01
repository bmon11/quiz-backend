import { Router } from 'express';
import { z } from 'zod';
import { User } from '../auth/user.model';
import { Attempt } from '../attempt/attempt.model';
import { Question } from '../question/question.model';
import { ROLES, isAdminEmail, publicUser, requireAdmin } from '../auth/auth';
import { HttpError, objectId, parse } from '../shared/validate';
import { escapeRe } from './helpers';

// Registered people, for admins: who they are, how much they play and add, and their role.

const router = Router();
router.use(requireAdmin);

const listQuery = z.object({
  q: z.string().trim().max(100).optional(),
  role: z.enum(ROLES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

router.get('/', async (req, res) => {
  const { q, role, page, limit } = parse(listQuery, req.query);
  const match: Record<string, unknown> = {};
  if (q) {
    const re = new RegExp(escapeRe(q), 'i');
    match.$or = [{ email: re }, { name: re }];
  }
  // ADMIN_EMAILS people are admins whatever their stored role.
  const envAdmins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (role === 'admin') match.$and = [{ $or: [{ role: 'admin' }, { email: { $in: envAdmins } }] }];
  else if (role) match.$and = [{ role: role === 'user' ? { $in: ['user', null] } : role }, { email: { $nin: envAdmins } }];

  const [users, total, roleCounts] = await Promise.all([
    User.find(match)
      .select('+passwordHash')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(match),
    User.aggregate([{ $group: { _id: { $cond: [{ $in: ['$email', envAdmins] }, 'admin', { $ifNull: ['$role', 'user'] }] }, n: { $sum: 1 } } }]),
  ]);

  const ids = users.map((u) => u._id);
  const [plays, added] = await Promise.all([
    Attempt.aggregate([
      { $match: { userId: { $in: ids } } },
      { $group: { _id: '$userId', n: { $sum: 1 }, avg: { $avg: '$percent' }, last: { $max: '$createdAt' } } },
    ]),
    Question.aggregate([{ $match: { createdBy: { $in: ids }, hidden: { $ne: true } } }, { $group: { _id: '$createdBy', n: { $sum: 1 } } }]),
  ]);
  const playBy = new Map(plays.map((p) => [String(p._id), p]));
  const addedBy = new Map(added.map((a) => [String(a._id), a.n as number]));

  res.json({
    total,
    page,
    roles: Object.fromEntries(ROLES.map((r) => [r, roleCounts.find((c) => c._id === r)?.n ?? 0])),
    users: users.map((u) => {
      const p = playBy.get(String(u._id));
      return {
        ...publicUser(u),
        roleFromEnv: isAdminEmail(u.email),
        signIn: [u.passwordHash && 'password', u.googleId && 'google'].filter(Boolean),
        createdAt: u.createdAt,
        lastSeenAt: u.lastSeenAt ?? null,
        quizzes: p?.n ?? 0,
        avgPercent: p ? Math.round(p.avg) : null,
        lastPlayedAt: p?.last ?? null,
        questionsAdded: addedBy.get(String(u._id)) ?? 0,
      };
    }),
  });
});

router.patch('/:id', async (req, res) => {
  const id = parse(objectId, req.params.id);
  const { role } = parse(z.object({ role: z.enum(ROLES) }), req.body);
  if (id === req.user!.id) throw new HttpError(400, 'You cannot change your own role');
  const user = await User.findById(id).lean();
  if (!user) throw new HttpError(404, 'User not found');
  if (isAdminEmail(user.email)) throw new HttpError(409, 'This person is an admin through ADMIN_EMAILS');
  const updated = await User.findByIdAndUpdate(id, { $set: { role } }, { new: true }).lean();
  res.json({ user: publicUser(updated!) });
});

export default router;
