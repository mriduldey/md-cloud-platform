// apps/dashboard/app/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <div className="text-center mt-20 text-3xl font-bold text-green-600">
            ✅ Logged in successfully! Welcome to Dashboard.
        </div>
    );
}
