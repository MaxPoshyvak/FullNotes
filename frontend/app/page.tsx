import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            console.log('Session:', session);
            setSession(session);
        };

        checkSession();
    }, []);

    if (!session) {
        return (
            <div>
                <h1>Please log in to continue</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>thx</h1>
        </div>
    );
}
