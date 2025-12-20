import { Router } from 'express';
import authFunction from './auth.routes';

const router = Router();

router.use('/auth', authFunction);

export default router;
