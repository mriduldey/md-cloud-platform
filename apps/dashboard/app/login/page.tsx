'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginFormData } from '@/lib/auth-schemas';
import { apiRequest } from '../../lib/api';
import { setAuthToken } from '@lib/auth';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const router = useRouter();

    // Email/password form setup``
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    // Email login handler
    const onEmailSubmit = async (data: LoginFormData) => {
        try {
            const res = await apiRequest<{ token: string }>('/auth/login', { method: 'POST', body: data });
            setAuthToken(res.token);
            router.push('/dashboard');
        } catch {
            alert('Email login failed');
        }
    };

    // Google OAuth handler
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const res = await apiRequest<{ token: string }>('/auth/google', {
                method: 'POST',
                body: { credential: credentialResponse.credential },
            });
            setAuthToken(res.token);
            router.push('/dashboard');
        } catch {
            alert('Google login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4">
            <Card className="w-full max-w-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4 p-6">
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} />
                            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password')} />
                            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                        </div>
                    </CardContent>

                    <CardFooter className="space-y-4">
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-gray-400">or</span>
                            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('Google login failed')} />
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
