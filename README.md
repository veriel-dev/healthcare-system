
## Modelos de Datos Principales (MongoDB)

### User 
```typescript 

export interface IUser extends Document {
  _id: ObjectId
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  speciality?: string;
  licenseNumber?: string;
  status: string;
  contactInfo: {
    phone: string;
    address?: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

```


### EndPoints API Principales 

### Autenticación 
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- GET /api/v1/auth/me
- POST /api/v1/auth/change-password
- GET /api/v1/auth/google
- GET /api/v1/auth/google/callback


### Frontend 
- React 18+
- TypeScript 
- React Router 
- React Query / SWR 
- Tailwind CSS 
- Schadn/ui
- React Hook Form 
- Zod
- Jest + React Testing Library 

### Backend 
- Node.js 
- TypeScript 
- Expres.js 
- MongoDB + Mongoose 
- JWT par autenticación 
- bcrypt, para el hash de contraseñas 
- Jest 
- Winstorn, para logging  
- cors 
- helmet, para seguridad 

