import {
  productionConfigCors,
  developmentConfigCors,
  CorsSecurityConfig,
} from '../config/configCors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from '../config/config';

const allowedDomain = (config: CorsSecurityConfig) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('origin');

    const allowedOrigins = config.corsOptions.origin as string[];

    if (origin && !allowedOrigins.includes(origin)) {
      return res.status(403).json({
        error: 'Origen no permitido',
      });
    }
    next();
  };
};
export const securityMiddleware = (app: express.Application, isProduction = false) => {
  const configSecurity = isProduction ? productionConfigCors : developmentConfigCors;
  // CORS
  app.use(cors(configSecurity.corsOptions));
  //app.options('*', cors(configSecurity.corsOptions));
  app.use(allowedDomain(configSecurity) as express.RequestHandler);
  // Helmet
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'unsafe-none' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", config.scriptTailwindCss!!],
          styleSrc: ["'self'", config.stylesFontAewsome!!, "'unsafe-inline'"],
          imgSrc: ["'self'", config.imgBanner!!],
          objectSrc: ["'none'"],
        },
      },
    }),
  );
};
