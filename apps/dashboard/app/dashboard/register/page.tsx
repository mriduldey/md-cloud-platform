'use client';

import { useState } from 'react';
import { apiRequest } from '../../../lib/api';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await apiRequest('/auth/register', {
                method: 'POST',
                body: form,
            });
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="mt-1"
                            />
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col items-center">
                    <Button type="submit" onClick={handleSubmit} className="w-full">
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </Button>
                    {status === 'success' && <p className="mt-2 text-green-600">Registration successful!</p>}
                    {status === 'error' && <p className="mt-2 text-red-600">Registration failed.</p>}
                </CardFooter>
            </Card>
        </div>
    );
}
