
import mongoose from 'mongoose';

import { config } from './env.js';

export interface DatabaseStatus {
  connected: boolean;
  mode: 'atlas' | 'disconnected';
  uriSanitized: string;
  host: string;
  dbName: string;
  modelsRegistered: string[];
}

export async function connectDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const connectionUri = config.mongodbUri;

  if (!connectionUri || connectionUri.trim() === '') {
    throw new Error(
      'MONGODB_URI is not configured. Please provide a valid MongoDB Atlas connection string.',
    );
  }

  try {
    console.log('Connecting to MongoDB Atlas / External Cluster...');

    await mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(
      'Successfully connected to MongoDB Atlas / External Cluster.',
    );

    return mongoose;
  } catch (err) {
    console.error(
      'Fatal: Failed to connect to MongoDB Atlas / External Cluster:',
      err,
    );

    throw err;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}

export function getDatabaseStatus(): DatabaseStatus {
  const isConnected = mongoose.connection.readyState === 1;
  const rawUri = config.mongodbUri || '';

  const mode: 'atlas' | 'disconnected' = isConnected
    ? 'atlas'
    : 'disconnected';

  // Mask password in URI for security.
  const sanitized = rawUri.replace(
    /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/,
    '$1******$3',
  );

  return {
    connected: isConnected,
    mode,
    uriSanitized: mode === 'atlas' ? sanitized : 'Not Connected',
    host: mongoose.connection.host || 'localhost',
    dbName: mongoose.connection.name || 'portfolio',
    modelsRegistered: Object.keys(mongoose.models),
  };
}

