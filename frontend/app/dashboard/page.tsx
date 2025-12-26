import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Notes, NoAccount } from '@/components/shared';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <NoAccount />;
    }

    return (
        <Notes
            username={session.user.username as string}
            email={session.user.email as string}
            session={session as any}
        />
    );
}
