import { User } from '../../models/user/user.model';
import Server from '../../server/app';
import request from 'supertest';

const server = new Server();
const validUser = {
  email: 'Tyra86@gmail.com',
  password: 'tkvO6XARSRqH6t4',
  role: 'receptionist',
  firstName: 'Brandyn',
  lastName: 'Kuhlman',
  speciality: 'Pediatrics',
  licenseNumber: 'LIC202541956',
  status: 'active',
  contactInfo: {
    phone: '685304859',
    address: '45235 Giovanni Curve',
    emergencyContact: {
      name: 'Winston',
      phone: '665997281',
      relationship: 'friend',
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
};

describe('Auth Endpoints - Register', () => {
  describe('POST /api/v1/auth/register', () => {
    it('Should register a new user successfully', async () => {
      const res = await request(server.app).post('/api/v1/auth/register').send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('data.token');
      expect(res.body).toHaveProperty('data.user.email', validUser.email);

      const user = await User.findOne({ email: validUser.email });
      expect(user).toBeTruthy();
      expect(user?.email).toBe(validUser.email);
    });

    it('Should fail with invalid role', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          role: 'invalid-role',
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('errors');
    });
    it('Should fail with email void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          email: '',
        });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'email');
      expect(res.body.errors[0]).toHaveProperty('message', 'El email es requerido');
      expect(res.body.errors[1]).toHaveProperty('field', 'email');
      expect(res.body.errors[1]).toHaveProperty('message', 'Debe ser un email válido');
    });
    it('Should fail with invalid email', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          email: '12321.com',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'email');
      expect(res.body.errors[0]).toHaveProperty('message', 'Debe ser un email válido');
    });
    it('Should fail with password void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          password: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'password');
      expect(res.body.errors[0]).toHaveProperty('message', 'La contraseña es requerida');
      expect(res.body.errors[1]).toHaveProperty('field', 'password');
      expect(res.body.errors[1]).toHaveProperty(
        'message',
        'La contraseña debe tener al menos 6 caracteres',
      );
    });
    it('Should fail with password.length < 6', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          password: '1234',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'password');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'La contraseña debe tener al menos 6 caracteres',
      );
    });
    it('Should fail with firstName void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          firstName: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'firstName');
      expect(res.body.errors[0]).toHaveProperty('message', 'El nombre es requerido');
    });
    it('Should fail with lastName void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          lastName: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'lastName');
      expect(res.body.errors[0]).toHaveProperty('message', 'El apellido es requerido');
    });
    it('Should fail with speciality void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          speciality: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'speciality');
      expect(res.body.errors[0]).toHaveProperty('message', 'La especialidad es requerida');
    });
    it('Should fail with invalid speciality', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          speciality: '1212',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'speciality');
      expect(res.body.errors[0]).toHaveProperty('message', 'Especialidad no válida');
    });
    it('Should fail with invalid licenseNumber', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          licenseNumber: '',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'licenseNumber');
      expect(res.body.errors[0]).toHaveProperty('message', 'El número de licencia es requerido');
    });
    it('Should fail with invalid status', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          status: '12321',
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'status');
      expect(res.body.errors[0]).toHaveProperty('message', 'El estado del usuario no es válido');
    });
    it('Should fail with contactInfo.phone void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          contactInfo: {
            phone: '',
            address: '45235 Giovanni Curve',
            emergencyContact: {
              name: 'Winston',
              phone: '665997281',
              relationship: 'friend',
            },
          },
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'contactInfo.phone');
      expect(res.body.errors[0]).toHaveProperty('message', 'El teléfono es requerido');
    });
    it('Should fail with contactInfo.address void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          contactInfo: {
            phone: '685304859',
            address: '',
            emergencyContact: {
              name: 'Winston',
              phone: '665997281',
              relationship: 'friend',
            },
          },
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'contactInfo.address');
      expect(res.body.errors[0]).toHaveProperty('message', 'La dirección del usuario es requerido');
    });
    it('Should fail with contactInfo.emergencyContact.phone void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          contactInfo: {
            phone: '685304859',
            address: '45235 Giovanni Curve',
            emergencyContact: {
              name: 'Winston',
              phone: '',
              relationship: 'friend',
            },
          },
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'contactInfo.emergencyContact.phone');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'El teléfono del contacto de emergencia es requerido',
      );
    });
    it('Should fail with invalid contactInfo.emergencyContact.phone', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/register')
        .send({
          ...validUser,
          contactInfo: {
            phone: '685304859',
            address: '45235 Giovanni Curve',
            emergencyContact: {
              name: 'Winston',
              phone: '',
              relationship: 'friend',
            },
          },
        });
      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'contactInfo.emergencyContact.phone');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'El teléfono del contacto de emergencia es requerido',
      );
    });
  });
});
describe('Auth Endpoints - Login', () => {
  describe('POST /api/v1/auth/login', () => {
    beforeEach(async () => {
      await request(server.app).post('/api/v1/auth/register').send(validUser);
    });
    it('should login successfully with valid credentials', async () => {
      const res = await request(server.app).post('/api/v1/auth/login').send({
        email: 'Tyra86@gmail.com',
        password: 'tkvO6XARSRqH6t4',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data.token');
    });
    it('should fail with password void', async () => {
      const res = await request(server.app).post('/api/v1/auth/login').send({
        email: 'Tyra86@gmail.co',
        password: '',
      });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'password');
      expect(res.body.errors[0]).toHaveProperty('message', 'La contraseña es requerida');
    });
    it('should fail with invalid password', async () => {
      const res = await request(server.app).post('/api/v1/auth/login').send({
        email: 'Tyra86@gmail.co',
        password: '1234',
      });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'password');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'La contraseña debe tener al menos 6 caracteres',
      );
    });
    it('should fail with email void', async () => {
      const res = await request(server.app).post('/api/v1/auth/login').send({
        email: '',
        password: 'tkvO6XARSRqH6t4',
      });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'email');
      expect(res.body.errors[0]).toHaveProperty('message', 'El email es requerido');
    });
    it('should fail with invalid email', async () => {
      const res = await request(server.app).post('/api/v1/auth/login').send({
        email: '21312.com',
        password: 'tkvO6XARSRqH6t4',
      });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'email');
      expect(res.body.errors[0]).toHaveProperty('message', 'Debe ser un email válido');
    });
  });
});
describe('Auth Endpoints - Me', () => {
  describe('GET /api/v1/auth/me', () => {
    let token: string;
    beforeEach(async () => {
      const loginRes = await request(server.app).post('/api/v1/auth/login').send({
        email: 'Tyra86@gmail.com',
        password: 'tkvO6XARSRqH6t4',
      });
      token = loginRes.body.data.token;
    });

    it('should get user profile with valid token', async () => {
      const res = await request(server.app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data.email', 'Tyra86@gmail.com');
    });

    it('should fail with invalid token', async () => {
      const res = await request(server.app)
        .get('/api/v1/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(401);
    });
  });
});

describe('Auth EndPoints - ChangePasswordValidate', () => {
  describe('GET /api/v1/auth/change-password', () => {
    let token: string;
    beforeEach(async () => {
      const loginRes = await request(server.app).post('/api/v1/auth/login').send({
        email: 'Tyra86@gmail.com',
        password: 'tkvO6XARSRqH6t4',
      });
      token = loginRes.body.data.token;
    });

    it('should get user profile with valid token', async () => {
      const res = await request(server.app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data.email', 'Tyra86@gmail.com');
    });
    it('should fail with newpassword void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'tkvO6XARSRqH6t4',
          newPassword: '',
        });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'newPassword');
      expect(res.body.errors[0]).toHaveProperty('message', 'La contraseña nueva es requerida');
    });
    it('should fail with invalid newpassword', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'tkvO6XARSRqH6t4',
          newPassword: '12321',
        });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'newPassword');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'La contraseña nueva debe tener al menos 6 caracteres',
      );
    });

    it('should fail with currentPassword void', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: '',
          newPassword: 'tkvO6XARSRqH6t5',
        });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'currentPassword');
      expect(res.body.errors[0]).toHaveProperty('message', 'La contraseña actual es requerida');
    });
    it('should fail with invalid newpassword', async () => {
      const res = await request(server.app)
        .post('/api/v1/auth/change-password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: '12312',
          newPassword: 'tkvO6XARSRqH6t4',
        });

      expect(res.status).toBe(400);
      expect(res.body.errors[0]).toHaveProperty('field', 'currentPassword');
      expect(res.body.errors[0]).toHaveProperty(
        'message',
        'La contraseña actual debe tener al menos 6 caracteres',
      );
    });
  });
});
