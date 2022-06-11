import { Response } from 'express';
import { HttpCodes } from './http-codes';

export const sendOKResponse = (response: Response, data) => {
  let result = 0;
  if (Array.isArray(data)) {
    result = data.length;
  } else if (typeof data === 'object') {
    result = 1;
  }

  return response.status(HttpCodes.OK).json({
    success: true,
    status: HttpCodes.OK,
    result,
    data,
  });
};
