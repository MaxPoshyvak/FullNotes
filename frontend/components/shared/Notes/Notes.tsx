'use client';

import React, { useEffect, useState } from 'react';
import { Plus, FileText } from 'lucide-react';

import { CreateNotesModal, NoteCard } from '@/components/ui/';
import { Header } from '@/components/shared/';

interface Note {
    _id: string;
    title: string;
    content: string;
    date: string;
}

interface Props {
    username: string;
    email: string;
    session: { accessToken: string };
}

export function Notes({ username, session }: Props) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Функція створення нотатки
    const handleCreateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() && !content.trim()) return;

        const newNote: Note = {
            _id: Date.now().toString(),
            title: title || 'Без назви',
            content: content,
            date: new Date().toLocaleDateString('uk-UA', {
                day: 'numeric',
                month: 'long',
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setNotes([newNote, ...notes]);
        setTitle('');
        setContent('');
        setIsModalOpen(false);

        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify({ title: newNote.title, content: newNote.content }),
            });
            if (!response.ok) {
                throw new Error('Failed to create note');
            }

            const data = await response.json();
            console.log('Note created:', data);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    // Видалення нотатки
    const handleDeleteNote = (_id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotes(notes.filter((note) => note._id !== _id));
    };

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notes', {
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
        fetchNotes();
    }, [session.accessToken]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            {/* Верхня панель */}
            <Header username={username} />

            {/* Основний контент */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Заголовок секції */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 fade-in-up">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Всі записи</h1>
                        <p className="text-gray-500 text-sm mt-1">Керуйте своїми ідеями в одному місці</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5">
                        <Plus className="w-5 h-5" />
                        Створити нотатку
                    </button>
                </div>

                {/* Стан: Немає нотаток */}
                {notes.length === 0 ? (
                    <div
                        className="flex flex-col items-center justify-center py-20 fade-in-up"
                        style={{ animationDelay: '0.1s' }}>
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">У вас поки немає нотаток</h3>
                        <p className="text-gray-500 text-center max-w-sm mt-2 mb-8">
                            Створіть свою першу нотатку, щоб записати ідею, список справ або важливу інформацію.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            Створити зараз
                        </button>
                    </div>
                ) : (
                    /* Сітка нотаток */
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up"
                        style={{ animationDelay: '0.1s' }}>
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} handleDeleteNote={handleDeleteNote} />
                        ))}
                    </div>
                )}
            </main>

            {/* Модальне вікно створення */}
            {isModalOpen && (
                <CreateNotesModal
                    title={title}
                    content={content}
                    setIsModalOpen={setIsModalOpen}
                    handleCreateNote={handleCreateNote}
                    setTitle={setTitle}
                    setContent={setContent}
                />
            )}
        </div>
    );
}
