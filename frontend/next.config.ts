import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        // Оновлений рядок з усіма дозволами:
                        value: "default-src 'self'; connect-src 'self' https://fullnotes.onrender.com https://fullnotes-backend.onrender.com; img-src 'self' data: https://fullnotes.onrender.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo=' 'sha256-6LU9PSbLOz3Fut6nSXIUTAR/I8FA+yDUlMq4ITGptFo=' 'sha256-zSosKOsZVFrezBWW3FR2g7W37YEb3joSvRUwHNbmKrU=' 'sha256-CRBN/fH/CfT4EZGt3lULeOdHJGGaOefA6GHHVE/9Ow4=' 'sha256-xiRz0wX/L2QNFUSelY6FG0GQSHWhuGpD0sAOkVt059c='; style-src 'self' 'unsafe-inline';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
