import mongoose from 'mongoose';

/** Connects to MongoDB Atlas (MONGODB_URI). Indexes are small, so autoIndex stays on. */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in environment variables.');
  await mongoose.connect(uri, { maxPoolSize: 20, serverSelectionTimeoutMS: 10_000 });
  console.log(`MongoDB connected (${mongoose.connection.name})`);
};

export default connectDB;
