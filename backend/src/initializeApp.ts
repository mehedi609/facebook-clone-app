import { Application, json, NextFunction, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { userRoutes } from '@/routes/user.routes';
import { BaseError } from '@/erros/BaseError';
import { HttpCodes } from '@/utils/http-codes';
import { errorMiddleware } from '@/middlewares/error.middleware';

export class InitializeApp {
  private readonly app: Application;

  constructor(router: { app: Application }) {
    this.app = router.app;

    this.initializeSecurity();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeSecurity(): void {
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.set('json spaces', 2);
    this.app.use(urlencoded({ extended: false }));

    // Use Morgan to log all requests to the console
    this.app.use(morgan('tiny'));
  }

  private initializeRoutes(): void {
    this.app.use('/api/users', userRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use((_req: Request, _res: Response, next: NextFunction): void => {
      const err = new BaseError('Route not found', HttpCodes.NOT_FOUND);
      next(err);
    });

    this.app.use(errorMiddleware);
  }
}
