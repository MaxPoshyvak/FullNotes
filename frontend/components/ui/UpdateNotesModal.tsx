import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface Props {
    className?: string;
    title: string;
    content: string;
    _id: string;
    setIsUpdateModalOpen: (isOpen: boolean) => void;
    handleUpdateNote: (_id: string, updatedData: { title: string; content: string }) => void;
}

export const UpdateNotesModal: React.FC<Props> = ({
    className,
    title,
    content,
    _id,
    setIsUpdateModalOpen,
    handleUpdateNote,
}) => {
    const [localTitle, setLocalTitle] = useState(title);
    const [localContent, setLocalContent] = useState(content);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleUpdateNote(_id, {
            title: localTitle.trim() || 'Без назви',
            content: localContent.trim(),
        });
        setIsUpdateModalOpen(false);
    };

    return (
        <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6', className)}>
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsUpdateModalOpen(false)}></div>

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl scale-in overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-semibold text-gray-900">Оновити нотатку</h3>
                    <button
                        onClick={() => setIsUpdateModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={localTitle}
                            onChange={(e) => setLocalTitle(e.target.value)}
                            placeholder="Наприклад: Список покупок"
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Зміст</label>
                        <textarea
                            value={localContent}
                            onChange={(e) => setLocalContent(e.target.value)}
                            placeholder="Про що ви думаєте?"
                            rows={6}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            disabled={!localTitle.trim() && !localContent.trim()}
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5">
                            Оновити нотатку
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
