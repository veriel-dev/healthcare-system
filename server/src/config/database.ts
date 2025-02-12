import mongoose from 'mongoose';
import { config } from './config';

/**
 * Conecta la aplicación a la base de datos de MongoDB utilizando Mongoose.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      autoIndex: true,
    });

    mongoose.connection.on('disconnected', () => {});

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
