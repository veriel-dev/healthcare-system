import { config } from '../config/config';
import mongoose from 'mongoose';
export const cleanDataBase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    const collections = await mongoose.connection.db?.listCollections().toArray();
    if (collections) {
      await Promise.all(
        collections.map(async (collection) => {
          try {
            await mongoose.connection.db?.collection(collection.name).deleteMany({});
          } catch (err) {
            console.error(`Error al limpiar la colección ${collection.name}:`, err);
          }
        }),
      );
    }
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error durante la limpieza o cierre de la conexión a MongoDB:', err);
  }
};
cleanDataBase();
