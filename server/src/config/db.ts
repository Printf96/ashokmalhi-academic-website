import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

let isConnected = false;

export async function connectDatabase(): Promise<typeof mongoose> {
  if (isConnected) return mongoose;

  mongoose.connection.on('connected', () => {
    isConnected = true;
    // eslint-disable-next-line no-console
    console.log(`[db] Connected to MongoDB (${env.nodeEnv})`);
  });

  mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error('[db] MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    // eslint-disable-next-line no-console
    console.warn('[db] MongoDB disconnected');
  });

  await mongoose.connect(env.mongodbUri);
  return mongoose;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  isConnected = false;
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
