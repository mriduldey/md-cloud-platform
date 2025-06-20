'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../lib/api';

export default function LoginPage() {
    const router = useRouter();

    const handleSuccess = async (credentialResponse) => {
        try {
            const data = await apiRequest < { token: string } > ('/auth/google', {
                method: 'POST',
                body: { credential: credentialResponse.credential },
            });

            setAuthToken(data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Google login error', error);
            alert(error.message || 'Google login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="p-10 bg-white rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login Failed')} />
            </div>
        </div>
    );
}
