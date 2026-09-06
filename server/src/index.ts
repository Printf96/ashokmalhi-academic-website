import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env, assertProductionSecrets } from './config/env.js';

async function main(): Promise<void> {
  assertProductionSecrets();

  try {
    await connectDatabase();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      '[startup] Could not connect to MongoDB. The API will still start, but data-backed routes will fail until a database is available.',
      err
    );
  }

  const app = createApp();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] Listening on port ${env.port} (${env.nodeEnv})`);
  });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[startup] Fatal error during startup:', err);
  process.exit(1);
});
