import { Router } from 'express';
import authFunction from './auth.routes';
import notesFunction from './notes.routes';

const router = Router();

router.post('/api/auth/register', (req, res) => {
    console.log('POST /api/auth/register hit'); // <-- перевірка
    res.send('ok');
});

router.use('/auth', authFunction);
router.use('/notes', notesFunction);

export default router;
