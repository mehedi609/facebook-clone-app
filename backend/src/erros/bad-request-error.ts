import { BaseError } from './base-error';
import { HttpCodes } from '../utils';

export class BadRequestError extends BaseError {
  constructor(msg) {
    super(msg, HttpCodes.BAD_REQUEST);
  }
}
