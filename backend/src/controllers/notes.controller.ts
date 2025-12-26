import { Request, Response } from 'express';
import { Note } from '../models/Note.';

export const getNotes = async (req: Request & { user?: { id: string } }, res: Response) => {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
};

export const postNotes = async (req: Request & { user?: { id: string } }, res: Response) => {
    const note = await Note.create({
        userId: req.user.id,
        title: req.body.title,
        content: req.body.content,
    });

    res.json(note);
};

export const deleteNotes = async (req: Request & { user?: { id: string } }, res: Response) => {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.status(204).json({ message: 'Note deleted successfully' });
};

export const updateNotes = async (req: Request & { user?: { id: string } }, res: Response) => {
    const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, {
        new: true,
    });

    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
};
