'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../lib/api';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const validateToken = async () => {
            try {
                const res = await apiRequest<{ user: { email: string } }>('/auth/me', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.user) {
                    setUser(res.user);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Token validation failed', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [router]);

    if (loading) return <div className="p-4 text-white">Checking authentication...</div>;

    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
            <p className="mt-2">Logged in as <strong>{user?.email}</strong></p>
            <button
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/login');
                }}
            >
                Logout
            </button>

        </div>
    );
}
