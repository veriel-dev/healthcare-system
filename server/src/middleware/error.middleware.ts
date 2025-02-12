import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: Error | ApiError,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
export const errorHandler = (
  err: Error | ApiError,
  __req: Request,
  res: Response,
  __next: NextFunction,
): void => {
  res.setHeader('Content-Type', 'application/json');

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  const statusCode = 500;
  res.status(statusCode).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
  });
};
