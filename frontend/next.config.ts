import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value:
                            "default-src 'self'; " +
                            // 👇 ДОДАЛИ: http://127.0.0.1:5001
                            "connect-src 'self' http://localhost:5001 http://127.0.0.1:5001; " +
                            // 👇 ПРО ВСЯК ВИПАДОК ТУТ ТЕЖ:
                            "img-src 'self' data: http://localhost:5001 http://127.0.0.1:5001; " +
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
                            "style-src 'self' 'unsafe-inline';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
