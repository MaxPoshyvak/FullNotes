import React from 'react';
import { Lock, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const NoAccount = function () {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased flex flex-col items-center justify-center p-4">
            {/* Логотип (невеликий зверху) */}
            <div className="absolute top-8 left-8 flex items-center gap-2 fade-in-up">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/30">
                    M
                </div>
                <span className="font-bold text-xl text-gray-900">ModernApp</span>
            </div>

            <div className="max-w-md w-full text-center">
                {/* Ілюстрація / Іконка */}
                <div className="mb-8 flex justify-center fade-in-up">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-blue-100 border border-gray-100 float">
                            <Lock className="w-10 h-10 text-blue-600" />
                        </div>
                        {/* Декоративні елементи */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-gray-50 text-white shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Текстовий контент */}
                <div className="fade-in-up delay-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Доступ обмежено</h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Щоб переглядати та створювати нотатки, вам необхідно увійти у свій обліковий запис. Ваші ідеї в
                        безпеці з нами!
                    </p>
                </div>

                {/* Кнопки дій */}
                <div className="space-y-3 fade-in-up delay-200">
                    <Link
                        href="/login"
                        className="w-full group flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5">
                        <LogIn className="w-5 h-5" />
                        <span>Увійти в акаунт</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Link>

                    <Link
                        href="/register"
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-all duration-200 hover:border-gray-300 focus:ring-2 focus:ring-gray-100">
                        <UserPlus className="w-5 h-5 text-gray-500" />
                        <span>Створити новий акаунт</span>
                    </Link>
                </div>

                {/* Додаткова інформація */}
                <p className="mt-8 text-xs text-gray-400 fade-in-up delay-200">
                    Продовжуючи, ви погоджуєтесь з нашими{' '}
                    <a href="#" className="underline hover:text-gray-600">
                        Умовами
                    </a>{' '}
                    та{' '}
                    <a href="#" className="underline hover:text-gray-600">
                        Політикою конфіденційності
                    </a>
                    .
                </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 text-center w-full">
                <p className="text-xs text-gray-300">© 2024 NextNotes Inc.</p>
            </div>
        </div>
    );
};
