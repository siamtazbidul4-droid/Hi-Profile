import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 attempts per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
});

export const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // max 15 contact submissions per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many message submissions from this connection. Please try again later.',
  },
});
