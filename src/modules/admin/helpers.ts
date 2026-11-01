import { User } from '../auth/user.model';

export const escapeRe = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** id → display name, for "added by" labels. */
export const authorNames = async (ids: unknown[]) => {
  const unique = [...new Set(ids.filter(Boolean).map(String))];
  if (!unique.length) return new Map<string, string>();
  const users = await User.find({ _id: { $in: unique } }).select('name email').lean();
  return new Map(users.map((u) => [String(u._id), u.name || u.email.split('@')[0]]));
};
