import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'FullNotes — Personal Notes Manager',
    description:
        'FullNotes is a modern note-taking app with user authentication, JWT-protected API, and personal notes management.',

    metadataBase: new URL('https://fullnotes-frontend.onrender.com'),

    keywords: [
        'notes app',
        'note taking',
        'personal notes',
        'Next.js notes',
        'React notes',
        'FullStack app',
        'NextAuth',
        'JWT',
        'MongoDB',
    ],

    authors: [
        {
            name: 'Max',
            url: 'https://github.com/MaxPoshyvak',
        },
    ],

    creator: 'Max',
    publisher: 'FullNotes',

    openGraph: {
        title: 'FullNotes — Personal Notes Manager',
        description: 'A full-stack note-taking app with authentication and personal notes management.',
        url: 'https://fullnotes-frontend.onrender.com',
        siteName: 'FullNotes',
        images: [
            {
                url: '/note-taking-strategies.jpeg',
                width: 1200,
                height: 630,
                alt: 'FullNotes App Screenshot',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'FullNotes — Personal Notes Manager',
        description: 'A full-stack note-taking app with authentication and personal notes management.',
        images: ['/note-taking-strategies.jpeg'],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },

    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta httpEquiv="Content-Security-Policy" content="..." />
                <link rel="icon" type="image/svg" href="/favicon.ico" />
                <meta name="google-site-verification" content="EliDbmxg_vKG7Un_rO2WFKnhlC0q_-wxS9Qr9S-vbvA" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
