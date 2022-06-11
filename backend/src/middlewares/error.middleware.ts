import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';
import CustomError from '../erros/customError';
import { HttpCodes } from '../utils/http-codes';

export const errorMiddleware = (
  err: CustomError | QueryFailedError | TypeError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let customError;
  console.log(err);

  if (err instanceof CustomError) {
    customError = err;
    console.log('CustomError');
    console.log(customError);
  } else if (err instanceof QueryFailedError) {
    if (err.driverError.code === '23502') {
      customError = new CustomError(
        `null value in column '${err.driverError.column}' of relation '${err.driverError.table}' violates not-null constraint`,
        HttpCodes.BAD_REQUEST,
      );
    } else {
      customError = new CustomError(err);
    }
  } else {
    customError = new CustomError(err);
  }

  res.status(customError.status).send(customError);
};
