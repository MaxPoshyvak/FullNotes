'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
        });

        if (!res.ok) {
            alert('Помилка реєстрації');
            return;
        }

        // 🔥 автологін після реєстрації
        await signIn('credentials', {
            email,
            password,
            callbackUrl: '/dashboard',
        });
    };

    return (
        <>
            <h1>Register Page</h1>
            <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
            />
            <button onClick={register}>Register</button>
        </>
    );
}
