'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
        });
    };

    return (
        <>
            <h1>Login Page</h1>
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
            />
            <button onClick={register}>Login</button>
        </>
    );
}
