import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB from '../config/db';
import { createApp } from '../app';
import { bundles } from '../seed/data';
import { seedBundles } from '../seed/seed';

// Local try-out without Atlas: in-memory MongoDB, seeded, API on PORT.
// Usage: npm run dev:memory   (data is gone when the process stops)
const run = async () => {
  const mongo = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongo.getUri('quiz');
  await connectDB();
  for (const line of await seedBundles(bundles)) console.log(`  ✓ ${line}`);
  const port = Number(process.env.PORT) || 4010;
  createApp().listen(port, () => console.log(`Quiz API (in-memory DB) on :${port}`));
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
