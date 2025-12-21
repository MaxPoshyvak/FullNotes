import { loginSchema } from '@/validation/auth.schema';
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
                // try {
                //     await loginSchema.validate(credentials, { abortEarly: false });
                // } catch (err: any) {
                //     const errors: Record<string, string> = {};
                //     err.inner.forEach((e: any) => {
                //         if (e.path) errors[e.path] = e.message;
                //     });
                //     console.log(errors);
                // }
                // 🔥 запит на твій бек
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });

                const user = await res.json();
                if (!res.ok) return null;

                return {
                    id: user.id,
                    email: user.email,
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
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id!;
                session.user.email = token.email as string;
            }
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
