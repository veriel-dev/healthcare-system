import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  ValidationChain,
  ValidationError,
  FieldValidationError,
} from 'express-validator';

interface FormattedError {
  field: string;
  message: string;
}
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors: FormattedError[] = errors.array().map((err: ValidationError) => {
      const fieldError = err as FieldValidationError;
      return {
        field: fieldError.path,
        message: fieldError.msg,
      };
    });

    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: formattedErrors,
    });
  };
};
