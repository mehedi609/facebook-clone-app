import { BaseError } from './base-error';
import { HttpCodes } from '../utils';

export class NotFoundError extends BaseError {
  constructor(msg) {
    super(msg, HttpCodes.NOT_FOUND);
  }
}
