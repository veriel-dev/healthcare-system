import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpirationInterval: process.env.JWT_EXPIRE || '1h',
  baseUrl: process.env.BASE_URL || 'http://lcoalhost:5050',
  baseUrlFrontend: process.env.BASE_URL_FRONTEND || 'http://127.0.0.1:5173',
  baserUrlFrontedLocal: process.env.BASE_URL_FRONTEND_LOCAL || 'http://localhost:5173',
  barUrlFrontedNetworOne: process.env.BASE_URL_FRONTEND_NETWORK_1,
  barUrlFrontedNetworTwo: process.env.BASE_URL_FRONTEND_NETWORK_2,
  isProduction: process.env.NODE_ENV === 'production',
  scriptTailwindCss: process.env.SCRIPT_TAILWIND_CSS,
  stylesFontAewsome: process.env.STYLES_FONT_AWESONE,
  imgBanner: process.env.IMG_BANNER,
};
