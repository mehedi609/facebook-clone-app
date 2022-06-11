import { HttpCodes } from '../utils/http-codes';

export default class CustomError {
  success!: boolean;

  status!: number;

  errors!: any;

  constructor(
    errors: any = 'Something went wrong',
    status: number = HttpCodes.INTERNAL_SERVER_ERROR,
  ) {
    this.success = false;
    this.status = status;
    this.errors = typeof errors === 'string' ? [{ message: errors }] : errors;
  }
}
