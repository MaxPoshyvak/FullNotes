import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
    className?: string;
    title: string;
    content: string;
    setIsModalOpen: (isOpen: boolean) => void;
    handleCreateNote: (e: React.FormEvent<HTMLFormElement>) => void;
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
}

export const CreateNotesModal: React.FC<Props> = ({
    className,
    title,
    content,
    setIsModalOpen,
    handleCreateNote,
    setTitle,
    setContent,
}) => {
    return (
        <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6', className)}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsModalOpen(false)}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl scale-in overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-900">Нова нотатка</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleCreateNote} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Наприклад: Список покупок"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Зміст</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Про що ви думаєте?"
                            rows={6}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400 resize-none"></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            disabled={!title && !content}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5">
                            Зберегти нотатку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
