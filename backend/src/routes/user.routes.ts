import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import UserController from '../controller/user.controller';

const router = Router();

const userController = container.resolve(UserController);

router.get('/', userController.all);
router.post('/register', userController.register);

export default router;
