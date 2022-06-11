import jwt from 'jsonwebtoken';
import { config } from '../config';

export const createToken = ({ id }, expiresIn): string => {
  return jwt.sign(
    {
      id,
    },
    config.jwt.secret,
    { expiresIn },
  );
};

export const verifyToken = (token: string) => jwt.verify(token, config.jwt.secret);
