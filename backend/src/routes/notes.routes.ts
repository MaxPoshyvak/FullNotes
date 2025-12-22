import { Router } from 'express';
import { getNotes, postNotes } from '../controllers/notes.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, postNotes);
// router.post('/register', validate(registerSchema), registerController);

export default router;
