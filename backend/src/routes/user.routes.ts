import { Request, Response, Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  res.json('User get route');
});

export { userRoutes };
