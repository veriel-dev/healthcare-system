import mongoose from 'mongoose';
import { config } from '../config/config';

export default async () => {
  await mongoose.connect(config.mongoUri);
};
