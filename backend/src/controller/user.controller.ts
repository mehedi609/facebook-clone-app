import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import expressAsyncHandler from 'express-async-handler';
import { UserService } from '../services';
import {
  sendOKResponse,
  HttpCodes,
  createToken,
  verifyToken,
  sendVerificationEmail,
} from '../utils';
import CustomError from '../erros/customError';
import { config } from '../config';

@autoInjectable()
export class UserController {
  constructor(private userService?: UserService) {}

  public all = async (_req: Request, res: Response, _next: NextFunction) => {
    // const users = await this.userService.findAll();
    return res.json('hello world');
  };

  public register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (await this.userService.findUserByEmail(req.body.email)) {
        return next(new CustomError('Email already been taken', HttpCodes.BAD_REQUEST));
      }

      if (await this.userService.findUserByUsername(req.body.username)) {
        return next(
          new CustomError('Username already been taken', HttpCodes.BAD_REQUEST),
        );
      }

      const user = await this.userService.register(req.body);

      const emailVerificationToken = createToken({ id: user.id }, '30m');

      const url = `${config.mailer.baseUrl}/activate/${emailVerificationToken}`;

      await sendVerificationEmail(user.email, user.firstName, url);

      const token = createToken({ id: user.id }, '30d');

      sendOKResponse(res, {
        ...user,
        token,
        msg: 'Registration successful! Please activate your email to start.',
      });
    },
  );

  public activateAccount = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const decoded = verifyToken(req.body.token);

      const user = await this.userService.findUserById(decoded.id);

      if (user.verified) {
        return next(
          new CustomError(
            `This email "${user.email}" is already been activated`,
            HttpCodes.BAD_REQUEST,
          ),
        );
      }

      await this.userService.updateVerifiedStatus(user.id, true);

      sendOKResponse(res, { message: 'Account has benn activated successfully' });
    },
  );
}

export const userController = new UserController();
