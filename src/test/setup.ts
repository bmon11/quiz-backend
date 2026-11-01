import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let server: MongoMemoryServer;

export const startTestDb = async () => {
  server = await MongoMemoryServer.create();
  await mongoose.connect(server.getUri(), { dbName: 'quiz-test' });
};

export const stopTestDb = async () => {
  await mongoose.disconnect();
  await server?.stop();
};

export const clearTestDb = async () => {
  const collections = await mongoose.connection.db!.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
};
