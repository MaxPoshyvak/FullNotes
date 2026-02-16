import { Router } from 'express';
import { loginController, registerController, requestMagicLink, verifyMagicLink } from '../controllers/auth.controller';
import { registerSchema, loginSchema } from '../validation/auth.schema';
import { validate } from '../middlewares/validation';

const router = Router();

router.post('/login', validate(loginSchema), loginController);
router.post('/register', validate(registerSchema), registerController);

router.post('/magic-link', requestMagicLink);
router.get('/verify', verifyMagicLink);

export default router;
