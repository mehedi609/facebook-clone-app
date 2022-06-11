import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';

import { errorMiddleware } from './middlewares';
import { userRoutes } from './routes';
import { NotFoundError } from './erros';

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
      const err = new NotFoundError('Route not found');
      next(err);
    });

    this.app.use(errorMiddleware);
  }
}
