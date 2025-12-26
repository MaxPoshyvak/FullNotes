import type { Note } from '@/types/Notes';
import { date } from 'yup';

export const handleDeleteNote = async (
    _id: string,
    e: React.MouseEvent,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    notes: Note[],
    session: any
) => {
    e.stopPropagation();
    setNotes(notes.filter((note) => note._id !== _id));

    try {
        const response = await fetch(`/api/notes/${_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete note');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
};

export const handleUpdateNote = async (
    _id: string,
    updatedFields: Partial<Note>,
    setIsUpdateModalOpen: any,
    setSelectedNote: any,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    notes: Note[],
    session: any
) => {
    setIsUpdateModalOpen(true);
    setSelectedNote(notes.find((note) => note._id === _id) || null);
    setNotes((prev) => prev.map((n) => (n._id === _id ? { ...n, ...updatedFields } : n)));

    try {
        await fetch(`/api/notes/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(updatedFields),
        });
    } catch (error) {
        console.error(error);
    }
};

export const handleCreateNote = async (
    e: React.FormEvent,
    title: string,
    content: string,
    setTitle: any,
    setContent: any,
    setIsModalOpen: any,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    notes: Note[],
    session: any
) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    try {
        const response = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify({
                title,
                content,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create note');
        }

        // 👉 Отримуємо нотатку з MongoDB (з `_id`)
        const createdNote = await response.json();

        const newNote: Note = {
            _id: createdNote._id, // 🎉 правильний ID від Mongo
            title: createdNote.title,
            content: createdNote.content,
            date: createdNote.date || new Date(),
        };

        // 👉 Малюємо на фронті
        setNotes([newNote, ...notes]);
        setTitle('');
        setContent('');
        setIsModalOpen(false);

        console.log('Note created:', newNote);
    } catch (error) {
        console.error('Error creating note:', error);
    }
};

export const getNotes = async (session: any, setNotes: React.Dispatch<React.SetStateAction<Note[]>>) => {
    try {
        const response = await fetch('/api/notes', {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        const data = await response.json();
        setNotes([...data]);
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
};
