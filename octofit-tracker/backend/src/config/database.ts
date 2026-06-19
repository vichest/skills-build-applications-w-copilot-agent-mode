import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected to octofit_db');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
