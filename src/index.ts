import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import { createApp } from './app';

const PORT = Number(process.env.PORT) || 4010;

connectDB()
  .then(() => {
    createApp().listen(PORT, () => console.log(`Quiz API listening on :${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
