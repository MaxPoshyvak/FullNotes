import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Notes } from '@/components/shared';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div>
                <h1>Please log in to continue</h1>
            </div>
        );
    }

    return (
        <Notes
            username={session.user.username as string}
            email={session.user.email as string}
            session={session as any}
        />
    );
}
