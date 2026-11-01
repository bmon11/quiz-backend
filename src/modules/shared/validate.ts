import { Request } from 'express';
import { z, ZodTypeAny } from 'zod';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Parse with zod; a bad payload becomes a 400 with the first issue's message. */
export const parse = <S extends ZodTypeAny>(schema: S, value: unknown): z.infer<S> => {
  const result = schema.safeParse(value);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new HttpError(400, `${issue.path.join('.') || 'input'}: ${issue.message}`);
  }
  return result.data;
};

export const objectId = z.string().regex(/^[0-9a-f]{24}$/i, 'must be an id');

export const ipOf = (req: Request) =>
  (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
