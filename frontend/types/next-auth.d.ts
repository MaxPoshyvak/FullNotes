import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email?: string | null;
            username?: string;
        };
    }

    interface User {
        id: string;
        email?: string | null;
        username?: string;
        accessToken?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        email?: string | null;
        username?: string;
        accessToken?: string;
    }
}
