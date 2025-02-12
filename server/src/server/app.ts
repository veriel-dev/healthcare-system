import path from 'path';

import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';

import { config } from '../config/config';
import { connectDB } from '../config/database';
import { ApiError, errorHandler } from '../middleware/error.middleware';
import authRoutes from '../routes/auth/auth.routes';
import userRoutes from '../routes/user/user.routes';
import patientsRoutes from '../routes/patient/patient.routes';
import '../config/passportConfig';
import { securityMiddleware } from '../middleware/security.middleware';

class Server {
  public app: Express;
  private PREFIX_URL: String;
  private isProduction: Boolean;

  constructor() {
    this.app = express();
    this.PREFIX_URL = '/api/v1';
    this.connectDb();
    this.middleware();
    this.routes();
    // Error Handling - IMPORTANTE: debe ser el último middleware
    this.app.use(errorHandler);
    this.isProduction = config.isProduction;
  }

  private middleware(): void {
    securityMiddleware(this.app, Boolean(this.isProduction));
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
  private routes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'OK' });
    });
    this.app.get('/', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../views', 'index.html'));
    });
    this.app.use(`${this.PREFIX_URL}/auth`, authRoutes);
    this.app.use(`${this.PREFIX_URL}/users`, userRoutes);
    this.app.use(`${this.PREFIX_URL}/patients`, patientsRoutes);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(new ApiError(404, 'Route not found'));
    });
  }
  private async connectDb(): Promise<void> {
    await connectDB();
  }
  public async start() {
    this.app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  }
}

export default Server;
