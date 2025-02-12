import { config } from '../config/config';
import mongoose from 'mongoose';
import { User, Patient, Appointment, MedicalRecord, Inventory } from '../models';

async function initializeDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    // Verificar que los modelos se han registrado correctamente

    // Crear índices
    await Promise.all([
      User.createIndexes(),
      Patient.createIndexes(),
      Appointment.createIndexes(),
      MedicalRecord.createIndexes(),
      Inventory.createIndexes(),
    ]);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Ejecutar el script
initializeDatabase();
