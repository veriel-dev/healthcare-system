import { LIC, generateIdUnique } from '../utils/generateIdUnique';
import { relationShipValues, roles, specialties, UserStatus } from '../types/auth.types';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

const generateUser = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(roles),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    speciality: faker.helpers.arrayElement(specialties),
    licenseNumber: generateIdUnique(LIC),
    status: UserStatus.ACTIVE,
    contactInfo: {
      phone: '685304859',
      address: faker.location.streetAddress(),
      emergencyContact: {
        name: faker.person.firstName(),
        phone: '685304859',
        relationship: faker.helpers.arrayElement(relationShipValues),
      },
    },
    schedule: [
      {
        day: 'Monday',
        startTime: '08:00',
        endTime: '16:00',
      },
      {
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '14:00',
      },
    ],
    education: {
      institution: 'Universidad de Extramadura, Uex',
      degree: 'Graduado en Física',
      year: '2021',
      country: 'Spain',
    },
    workingHours: {
      maxPatientsPerDay: Math.floor(Math.random() * 11),
      preferredAppointmentDuration: Math.floor(Math.random() * 11),
      breakTime: {
        start: new Date(),
        end: new Date(),
      },
    },
    notificationPreferences: {
      email: true,
      sms: false,
      pushNotifications: false,
    },
    lastLogin: new Date(),
  };
};

export const generateUsers = (count: number) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateUser());
  }
  return users;
};

// const user = generateUser();

async function generateAndSaveUsers() {
  try {
    const users = generateUsers(50);

    const dataToSave = {
      users,
      metadata: {
        generatedAt: new Date().toISOString(),
        count: users.length,
      },
    };
    const jsonData = JSON.stringify(dataToSave, null, 2);
    const outputPath = path.join(__dirname, 'generated-users.json');
    await fs.promises.writeFile(outputPath, jsonData, 'utf8');
    console.log(`✅ Se han generado ${users.length} usuarios y guardado en ${outputPath}`);
  } catch (error) {
    console.error('❌ Error al generar o guardar los usuarios:', error);
  }
}
generateAndSaveUsers();
