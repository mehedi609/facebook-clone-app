import { BaseError } from './base-error';
import { HttpCodes } from '../utils';

export class RequestValidationError extends BaseError {
  public message: Array<{ message: string }>;

  constructor(message: Array<{ message: string }>) {
    super(message, HttpCodes.UNPROCESSABLE_ENTITY);
  }
}
