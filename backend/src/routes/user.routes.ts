import { Router } from 'express';
import { userController } from '../controller/user.controller';

const router = Router();

router.post('/register', userController.register);
router.post('/activate', userController.activateAccount);
router.post('/login', userController.login);

export default router;
