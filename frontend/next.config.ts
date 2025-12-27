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
                        value: `default-src 'self'; connect-src 'self' http://localhost:3000 ${process.env.NEXT_PUBLIC_API_URL}; img-src 'self' data: ${process.env.NEXT_PUBLIC_API_URL}; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';`,
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
