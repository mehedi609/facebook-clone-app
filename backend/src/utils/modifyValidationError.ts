import { ValidationError } from 'class-validator';

const validationErrorMessages = (errors: ValidationError[]) =>
  errors.map((error: ValidationError) => ({
    message: Object.values(error.constraints)[0],
  }));

export default validationErrorMessages;
