import { Router } from 'express';
import authFunction from './auth.routes';
import notesFunction from './notes.routes';

const router = Router();

router.use('/auth', authFunction);
router.use('/notes', notesFunction);

export default router;
