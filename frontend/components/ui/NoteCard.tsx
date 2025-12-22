import React from 'react';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface Props {
    className?: string;
    note: {
        _id: string;
        title: string;
        content: string;
        date: string;
    };
    handleDeleteNote: (id: string, e: React.MouseEvent) => void;
}

export const NoteCard: React.FC<Props> = ({ className, note, handleDeleteNote }) => {
    return (
        <div
            className={cn(
                'group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-100 transition-all duration-300 relative flex flex-col h-64',
                className
            )}>
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Нотатка</span>
                <button
                    onClick={(e) => handleDeleteNote(note._id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100"
                    title="Видалити">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{note.title}</h3>

            <div className="grow overflow-hidden relative">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap line-clamp-5">{note.content}</p>
                {/* Градієнт знизу тексту для ефекту "читати далі" */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-white to-transparent"></div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                <span>{note.date}</span>
            </div>
        </div>
    );
};
