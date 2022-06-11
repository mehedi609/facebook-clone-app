import { Response } from 'express';
import { HttpCodes } from './http-codes';

export const sendOKResponse = (response: Response, data) => {
  const key = Object.keys(data)[0];
  const value = Object.values(data)[0];

  let result = 0;
  if (Array.isArray(value)) {
    result = value.length;
  } else if (typeof value === 'object') {
    result = 1;
  }

  return response.status(HttpCodes.OK).json({
    success: true,
    status: HttpCodes.OK,
    result,
    [key]: value,
  });
};
