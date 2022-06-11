import { ValidationError } from 'class-validator';

export const validationErrorMessages = (errors: ValidationError[]) =>
  errors.map((error: ValidationError) => ({
    message: Object.values(error.constraints)[0],
  }));
