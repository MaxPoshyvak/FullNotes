import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // твій authOptions

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
        <div>
            <h1>thx</h1>
        </div>
    );
}
