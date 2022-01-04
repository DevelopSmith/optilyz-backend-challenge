import mongoose from 'mongoose';

require('./user');
require('./task');

export default async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI || '', {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

