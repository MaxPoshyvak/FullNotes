import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // 2. БЕЗПЕКА: Дозволяємо картинки та скрипти
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        // Дозволяємо підключення і до localhost, і до Render
                        value: "default-src 'self'; connect-src 'self' http://localhost:3000 https://fullnotes.onrender.com; img-src 'self' data: https://fullnotes.onrender.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
