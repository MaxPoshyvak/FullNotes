'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const login = async () => {
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Додаємо стилі для анімації прямо в компонент */}
            <style>{`
        .fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            {/* Заголовок та Логотип */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md fade-in-up">
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">З поверненням!</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Будь ласка, увійдіть у свій акаунт</p>
            </div>

            {/* Основна картка */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md fade-in-up delay-100">
                <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200 sm:rounded-2xl sm:px-10 border border-gray-100">
                    {/* Соціальні кнопки */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-gray-200">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.36-1.09-.56-2.13-.48-3.08.48-1.04 1.07-2.73.99-4.04-.66C4.4 17.37 2.5 13.56 4.22 10.2c.87-1.68 2.52-2.82 4.41-2.9 1.11-.06 2.18.39 2.92.83.74.43 1.77.43 2.52-.08.82-.56 2.18-.87 3.56-.39 1.54.52 2.7 1.63 3.36 3.16-2.9 1.67-2.37 5.76.66 7.15-.65 1.57-1.65 3.37-3.32 5.09h-.02l-.01.01h.01c-.69.7-1.2.77-1.26.75zM15.42 2.89c-.11 1.88-1.7 3.6-3.47 3.73-.25-1.92 1.48-3.76 3.47-3.73z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Apple</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">або через email</span>
                        </div>
                    </div>

                    <form className="space-y-5" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Електронна пошта
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail color="#cbd5e0" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                                    placeholder="example@mail.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Пароль
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockKeyhole color="#cbd5e0" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />

                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePassword}>
                                    {!showPassword ? (
                                        // Eye Icon (Show)
                                        <Eye color="#cbd5e0" />
                                    ) : (
                                        // Eye Off Icon (Hide)
                                        <EyeOff color="#cbd5e0" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={login}
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/30">
                                Увійти
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Не маєте акаунту?{' '}
                                    <Link href="/register" className="font-bold text-blue-600 hover:text-blue-500">
                                        Зареєструватися
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">© 2024 ModernApp Inc. Всі права захищено.</p>
                </div>
            </div>
        </div>
    );
}
