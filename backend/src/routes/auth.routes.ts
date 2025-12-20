import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.controller';
import { log } from 'console';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);

export default router;
