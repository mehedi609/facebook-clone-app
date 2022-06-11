import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import expressAsyncHandler from 'express-async-handler';
import { UserService } from '../services';
import {
  sendOKResponse,
  createToken,
  verifyToken,
  sendVerificationEmail,
} from '../utils';
import { config } from '../config';
import { BadRequestError } from '../erros';

@autoInjectable()
export class UserController {
  constructor(private userService?: UserService) {}

  public register = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (await this.userService.findUserByEmail(req.body.email)) {
        return next(new BadRequestError('Email already been taken'));
      }

      if (await this.userService.findUserByUsername(req.body.username)) {
        return next(new BadRequestError('Username already been taken'));
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
          new BadRequestError(`This email "${user.email}" is already been activated`),
        );
      }

      await this.userService.updateVerifiedStatus(user.id, true);

      sendOKResponse(res, { message: 'Account has benn activated successfully' });
    },
  );
}

export const userController = new UserController();
