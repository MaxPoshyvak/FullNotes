'use client';

import React, { useEffect, useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { CreateNotesModal, NoteCard, UpdateNotesModal } from '@/components/ui/';
import { Header } from '@/components/shared/';
import { Note } from '@/types/Notes';
import { handleDeleteNote, handleUpdateNote, handleCreateNote, getNotes } from '@/utility/notesFunction';

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
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    useEffect(() => {
        getNotes(session, setNotes);
    }, [session]);

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
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up"
                        style={{ animationDelay: '0.1s' }}>
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                handleDeleteNote={(e) => handleDeleteNote(note._id, e, setNotes, notes, session)}
                                handleUpdateNote={(id, updatedFields) =>
                                    handleUpdateNote(
                                        id,
                                        updatedFields,
                                        setIsUpdateModalOpen,
                                        setSelectedNote,
                                        setNotes,
                                        notes,
                                        session
                                    )
                                }
                            />
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
                    handleCreateNote={(e) =>
                        handleCreateNote(
                            e,
                            title,
                            content,
                            setTitle,
                            setContent,
                            setIsModalOpen,
                            setNotes,
                            notes,
                            session
                        )
                    }
                    setTitle={setTitle}
                    setContent={setContent}
                />
            )}

            {/* Модальне вікно оновлення */}
            {isUpdateModalOpen && selectedNote && (
                <UpdateNotesModal
                    title={selectedNote.title}
                    content={selectedNote.content}
                    _id={selectedNote._id}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    handleUpdateNote={(id, updatedFields) =>
                        handleUpdateNote(
                            id,
                            updatedFields,
                            setIsUpdateModalOpen,
                            setSelectedNote,
                            setNotes,
                            notes,
                            session
                        )
                    }
                />
            )}
        </div>
    );
}
