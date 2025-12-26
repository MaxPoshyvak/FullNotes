import { Router } from 'express';
import { deleteNotes, getNotes, postNotes, updateNotes } from '../controllers/notes.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, postNotes);
router.delete('/:id', authMiddleware, deleteNotes);
router.put('/:id', authMiddleware, updateNotes);

export default router;
