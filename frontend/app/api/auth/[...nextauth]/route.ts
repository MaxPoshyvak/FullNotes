import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        // 🔹 Звичайний email/password
        Credentials({
            name: 'credentials',
            credentials: { email: {}, password: {} },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
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

        // 🔹 Magic Link login
        Credentials({
            id: 'MagicLink',
            name: 'Magic Link',
            credentials: { token: { label: 'Token', type: 'text' } },
            async authorize(credentials) {
                console.log('🛠 [NextAuth] Authorize start. Token:', credentials?.token);

                try {
                    // 1️⃣ Змінюємо URL: прибираємо /auth (якщо в тебе router.get('/verify'))
                    // 2️⃣ Додаємо токен прямо в URL, бо це GET запит
                    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify?token=${credentials?.token}`;

                    console.log('🛠 [NextAuth] Fetching URL:', url);

                    const res = await fetch(url, {
                        method: 'GET', // 👈 3️⃣ Змінюємо POST на GET
                        headers: { 'Content-Type': 'application/json' },
                        // ❌ body тут НЕ потрібен, бо це GET
                    });

                    console.log('🛠 [NextAuth] Response Status:', res.status);

                    if (!res.ok) {
                        const errorText = await res.text();
                        console.error('❌ [NextAuth] API Error Body:', errorText);
                        return null;
                    }

                    const data = await res.json();

                    // Якщо прийшла помилка
                    if (!res.ok) return null;

                    return {
                        // 👇 ВАЖЛИВО: перетворюємо ObjectId на рядок, щоб NextAuth не подавився
                        id: data.user.id.toString(),
                        email: data.user.email,
                        username: data.user.username,
                        // 👇 ВАЖЛИВО: Ти показав у лозі, що ключ називається 'token', а не 'accessToken'
                        accessToken: data.token,
                    };
                } catch (e) {
                    console.error('❌ [NextAuth] Fetch error:', e);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },

    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                console.log('uwd [JWT Callback] User object received:', user); // 👈 Подивись сюди при логіні
                token.id = user.id;
                token.email = user.email;
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
