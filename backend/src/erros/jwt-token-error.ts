import { BaseError } from './base-error';
import { HttpCodes } from '../utils';

export class JwtTokenError extends BaseError {
  constructor() {
    super('Token invalid or expired', HttpCodes.UNAUTHORIZED);
  }
}
