import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db';
import { bundles } from '../seed/data';
import { seedBundles } from '../seed/seed';

// Usage: npm run seed  (writes to the DB in MONGODB_URI)
const run = async () => {
  await connectDB();
  for (const line of await seedBundles(bundles)) console.log(`  ✓ ${line}`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error(err.message ?? err);
  await mongoose.disconnect();
  process.exit(1);
});
