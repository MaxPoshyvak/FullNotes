import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)', // для всіх сторінок
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' https://fullnotes.onrender.com; script-src 'self' 'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='; style-src 'self';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
