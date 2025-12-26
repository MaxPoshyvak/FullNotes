import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)', // для всіх сторінок
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' https://fullnotes.onrender.com; script-src 'self'; style-src 'self';",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
