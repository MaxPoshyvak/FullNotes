import { Request, Response } from 'express';
import { Note } from '../models/Note';

// 👇 Допоміжна функція, щоб дістати ID незалежно від методу входу
const getUserIdFromRequest = (req: any) => {
    return req.user?.userId || req.user?.id || req.user?._id;
};

export const getNotes = async (req: Request & { user?: any }, res: Response) => {
    const currentUserId = getUserIdFromRequest(req);

    if (!currentUserId) {
        return res.status(401).json({ message: 'User not identified' });
    }

    // Шукаємо нотатки саме цього юзера
    const notes = await Note.find({ userId: currentUserId }).sort({ createdAt: -1 });
    res.json(notes);
};

export const postNotes = async (req: Request & { user?: any }, res: Response) => {
    const currentUserId = getUserIdFromRequest(req);

    if (!currentUserId) {
        return res.status(401).json({ message: 'User not identified' });
    }

    const note = await Note.create({
        userId: currentUserId, // 👈 Тепер тут правильний ID
        title: req.body.title,
        content: req.body.content,
    });

    res.json(note);
};

export const deleteNotes = async (req: Request & { user?: any }, res: Response) => {
    const currentUserId = getUserIdFromRequest(req);

    if (!currentUserId) {
        return res.status(401).json({ message: 'User not identified' });
    }

    // Видаляємо тільки якщо ID нотатки співпадає І вона належить цьому юзеру
    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: currentUserId,
    });

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(204).json({ message: 'Note deleted successfully' });
};

export const updateNotes = async (req: Request & { user?: any }, res: Response) => {
    const currentUserId = getUserIdFromRequest(req);

    if (!currentUserId) {
        return res.status(401).json({ message: 'User not identified' });
    }

    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: currentUserId }, // Перевірка власника
        req.body,
        { new: true }
    );

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
};
