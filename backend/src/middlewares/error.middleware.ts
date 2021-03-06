import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../erros';
import { HttpCodes } from '../utils';

export const errorMiddleware = (
  err: BaseError,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  response.status(err.httpCode || HttpCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    errors: typeof err.message === 'string' ? [{ message: err.message }] : err.message,
  });

  return next(err);
};
