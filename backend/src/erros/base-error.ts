import { HttpCodes } from '../utils';

export class BaseError extends Error {
  public message: any;

  public httpCode: HttpCodes;

  constructor(message: any, httpCode: HttpCodes) {
    super(message);

    this.message = message;
    this.httpCode = httpCode;

    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
