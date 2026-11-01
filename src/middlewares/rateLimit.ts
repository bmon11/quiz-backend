import { Request, Response, NextFunction } from "express";

// Simple in-memory sliding-window rate limiter, keyed by client IP.
// Good enough for a single-process deployment; swap for Redis if we scale out.
export const rateLimit = ({ windowMs, max }: { windowMs: number; max: number }) => {
  const hits = new Map<string, number[]>();

  // Цонхноос гарсан түлхүүрүүдийг үе үе хасна — хүсэлт бүрт бүх map-ийг
  // гүйхгүй (өмнө нь 10k-аас дээш үед хүсэлт бүрт бүтэн scan хийдэг байсан).
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    }
  }, Math.max(windowMs, 60_000)).unref();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";
    const key = `${req.baseUrl}${req.path}:${ip}`;

    const stamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (stamps.length >= max) {
      return res.status(429).json({
        message: "Too many requests — please wait a moment and try again.",
      });
    }
    stamps.push(now);
    hits.set(key, stamps);

    next();
  };
};
