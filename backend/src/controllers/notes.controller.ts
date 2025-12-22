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
