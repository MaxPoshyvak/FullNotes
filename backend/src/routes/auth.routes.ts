import { Router } from 'express';
import { loginController, registerController } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../validation/auth.schema';
import { validate } from '../middlewares/validation';

const router = Router();

router.post('/login', validate(loginSchema), loginController);
router.post('/register', validate(registerSchema), registerController);
// router.post('/logout', (req, res) => {

export default router;
