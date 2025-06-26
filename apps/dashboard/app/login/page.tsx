'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../../lib/api';
import { setAuthToken } from '@lib/auth';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const data = await apiRequest<{ token: string }>('/auth/google', {
                method: 'POST',
                body: { credential: credentialResponse.credential },
            });

            setAuthToken(data.token);
            router.push('/dashboard');
        } catch (error) {
            console.error('Google login error', error);
            alert(
                error && typeof error === 'object' && 'message' in error
                    ? (error as { message: string }).message
                    : 'Google login failed'
            );
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-pink-500">
            <Card className="w-full max-w-sm p-6 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => alert('Login Failed')}
                    />
                    <Button
                        variant="outline"
                        onClick={() => alert('Implement email/password login next')}
                    >
                        Login with email
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
