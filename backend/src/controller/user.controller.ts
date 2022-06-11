import { NextFunction, Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';
import asyncHandler from 'express-async-handler';
import UserService from '../services/user.service';
import { sendOKResponse } from '../utils/send-ok-response';
import CustomError from '../erros/customError';
import { HttpCodes } from '../utils/http-codes';

@autoInjectable()
export default class UserController {
  public userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public all = async (_req: Request, res: Response, _next: NextFunction) => {
    // const users = await this.userService.findAll();
    return res.json('hello world');
  };

  // async one(request: Request, response: Response, next: NextFunction) {
  //   return this.userRepository.findOneByOrFail({ id: +request.params.id });
  // }

  register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (await this.userService.findUserByEmail(req.body.email)) {
      return next(new CustomError('Email already been taken', HttpCodes.BAD_REQUEST));
    }

    if (await this.userService.findUserByUsername(req.body.username)) {
      return next(new CustomError('Username already been taken', HttpCodes.BAD_REQUEST));
    }

    const user = await this.userService.register(req.body);
    sendOKResponse(res, { user });
  });
}
