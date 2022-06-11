import { BaseError } from './base-error';
import { HttpCodes } from '../utils';

export class JwtTokenNoPayloadError extends BaseError {
  constructor() {
    super('No JWT token payload is available', HttpCodes.BAD_REQUEST);
  }
}
