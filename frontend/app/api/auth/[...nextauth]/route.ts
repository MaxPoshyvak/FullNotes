import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                // 🔥 запит на твій бек
                const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const user = await res.json();
                if (!res.ok) return null;

                return {
                    id: user.user.id,
                    email: user.user.email,
                    username: user.user.username,
                    accessToken: user.accessToken,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email; // 👈
                token.username = user.username;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.username = token.username as string;
            }
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
