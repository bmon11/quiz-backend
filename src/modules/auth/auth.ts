import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../shared/validate';
import { User } from './user.model';

const scrypt = promisify(crypto.scrypt) as (pw: string, salt: string, len: number) => Promise<Buffer>;

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  return `scrypt$${salt}$${(await scrypt(password, salt, 64)).toString('hex')}`;
};

export const checkPassword = async (password: string, stored?: string | null) => {
  const [, salt, hash] = stored?.split('$') ?? [];
  if (!salt || !hash) return false;
  const actual = await scrypt(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
};

// ── tokens: a minimal HS256 JWT, no dependency ──────────────────────────

const TOKEN_DAYS = 30;
const b64 = (value: object | Buffer) =>
  (Buffer.isBuffer(value) ? value : Buffer.from(JSON.stringify(value))).toString('base64url');

const secret = () => {
  const value = process.env.JWT_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV === 'production') throw new Error('JWT_SECRET is not set');
  return 'dev-only-secret';
};

const sign = (body: string) => crypto.createHmac('sha256', secret()).update(body).digest();

export const signToken = (userId: string) => {
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: userId, iat: now, exp: now + TOKEN_DAYS * 86400 })}`;
  return `${body}.${b64(sign(body))}`;
};

export const verifyToken = (token: string): string | null => {
  const [head, payload, signature] = token.split('.');
  if (!head || !payload || !signature) return null;
  const expected = sign(`${head}.${payload}`);
  const given = Buffer.from(signature, 'base64url');
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (typeof claims.sub !== 'string' || !(claims.exp > Date.now() / 1000)) return null;
    return claims.sub;
  } catch {
    return null;
  }
};

// ── roles ──────────────────────────────────────────────────────────────

const adminEmails = () =>
  new Set((process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase()).filter(Boolean));

export const roleOf = (user: { email: string; role?: string | null }) =>
  user.role === 'admin' || adminEmails().has(user.email) ? 'admin' : 'user';

export const publicUser = (user: { _id: unknown; email: string; name?: string | null; avatar?: string | null; role?: string | null }) => ({
  id: String(user._id),
  email: user.email,
  name: user.name || user.email.split('@')[0],
  avatar: user.avatar || '',
  role: roleOf(user),
});

export type AuthUser = ReturnType<typeof publicUser>;

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

// ── middleware ─────────────────────────────────────────────────────────

/** Sets req.user when a valid Bearer token is sent; anonymous requests pass through. */
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const userId = header?.startsWith('Bearer ') ? verifyToken(header.slice(7)) : null;
  if (userId && /^[0-9a-f]{24}$/i.test(userId)) {
    const user = await User.findById(userId).lean();
    if (user) req.user = publicUser(user);
  }
  next();
};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  await optionalAuth(req, res, () => undefined);
  if (!req.user) throw new HttpError(401, 'Please sign in');
  next();
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  await requireAuth(req, res, () => undefined);
  if (req.user?.role !== 'admin') throw new HttpError(403, 'Admins only');
  next();
};

// ── Google ─────────────────────────────────────────────────────────────

export type GoogleProfile = { sub: string; email: string; name?: string; picture?: string };

/**
 * Checks a Google Identity Services ID token with Google's tokeninfo endpoint
 * (it validates the signature and expiry) and that it was issued for our client.
 */
const verifyWithGoogle = async (credential: string): Promise<GoogleProfile> => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) throw new HttpError(503, 'Google sign-in is not configured');
  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
  if (!res.ok) throw new HttpError(401, 'Google sign-in failed');
  const info = (await res.json()) as Record<string, string>;
  const issuerOk = info.iss === 'accounts.google.com' || info.iss === 'https://accounts.google.com';
  if (info.aud !== clientId || !issuerOk || info.email_verified !== 'true' || !info.email) {
    throw new HttpError(401, 'Google sign-in failed');
  }
  return { sub: info.sub, email: info.email, name: info.name, picture: info.picture };
};

let googleVerifier = verifyWithGoogle;
/** Tests swap in a fake verifier. */
export const setGoogleVerifier = (fn: typeof verifyWithGoogle | null) => {
  googleVerifier = fn ?? verifyWithGoogle;
};
export const verifyGoogle = (credential: string) => googleVerifier(credential);
