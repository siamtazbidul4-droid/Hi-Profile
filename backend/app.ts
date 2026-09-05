import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/api.routes.js';
import { sanitizeNoSql } from './middleware/sanitize.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

export function createApp(): express.Application {
  const app = express();

  // Trust proxy for Render reverse proxy setup
  app.set('trust proxy', 1);

  // Security headers with relaxed content security policy for preview iframe and assets
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  // CORS handling with cookie support
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // Parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Prevent NoSQL operator injections
  app.use(sanitizeNoSql);

  // Mount API endpoints
  app.use('/api', apiRoutes);

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
}