import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

import { signOut } from 'next-auth/react';

interface Props {
    className?: string;
    username: string;
}

export const Header: React.FC<Props> = ({ className, username }) => {
    return (
        <header className={cn('bg-white border-b border-gray-200 sticky top-0 z-30', className)}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/30">
                            M
                        </div>
                        <span className="font-bold text-xl text-gray-900">Мої Нотатки</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-400 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
                            onClick={() => signOut({ callbackUrl: '/login' })}>
                            Sign out
                        </button>
                        <div className="hidden sm:flex text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg items-center gap-2">
                            <Search className="w-4 h-4" />
                            <span>Пошук (demo)</span>
                        </div>
                        <h2>{username}</h2>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border-2 border-white shadow-sm">
                            OK
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
