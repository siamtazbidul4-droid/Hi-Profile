import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/env.js';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[API Error]', err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: 'Validation failed on submitted payload.',
      details: err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      error: `Invalid resource identifier format for '${err.path}'.`,
    });
    return;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    res.status(409).json({
      success: false,
      error: `A resource with this ${field} already exists.`,
    });
    return;
  }

  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = err.message || 'An unexpected server error occurred.';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
}
