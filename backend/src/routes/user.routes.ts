import { Router } from 'express';
import { userController } from '../controller/user.controller';

const router = Router();

router.get('/', userController.all);
router.post('/register', userController.register);
router.post('/activate', userController.activateAccount);

export default router;
