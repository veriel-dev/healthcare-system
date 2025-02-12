import cors from 'cors';
import { config } from './config';
export interface CorsSecurityConfig {
  corsOptions: cors.CorsOptions;
}

// Development Environment
export const developmentConfigCors: CorsSecurityConfig = {
  corsOptions: {
    origin: [
      config.baseUrlFrontend,
      config.baseUrl,
      config.baserUrlFrontedLocal,
      config.barUrlFrontedNetworOne!!,
      config.barUrlFrontedNetworTwo!!,
      'http://localhost:4173',
      ' http://10.255.255.254:4173',
      'http://172.22.157.245:4173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
};

// Production Environment
export const productionConfigCors: CorsSecurityConfig = {
  corsOptions: {
    origin: [config.baseUrlFrontend],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
};
