'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '../../../lib/api';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter
} from '@/components/ui/card';

export default function ProfilePage() {
    const [form, setForm] = useState({ name: '', avatar: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await apiRequest('/auth/me', {
                    token: localStorage.getItem('token') || '',
                });
                setForm({ name: data.name || '', avatar: data.avatar || '' });
            } catch {
                setStatus('error');
            }
        }
        loadProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await apiRequest('/user/profile', {
                method: 'PUT',
                token: localStorage.getItem('token') || '',
                body: form,
            });
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-8">
            <CardHeader>
                <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={form.name}
                        required
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input
                        id="avatar"
                        type="url"
                        value={form.avatar}
                        onChange={e => setForm({ ...form, avatar: e.target.value })}
                        className="mt-1"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" onClick={handleSubmit} className="w-full">
                    {status === 'loading' ? 'Saving...' : 'Save Profile'}
                </Button>
                {status === 'success' && <p className="text-green-600 text-center">Profile updated!</p>}
                {status === 'error' && <p className="text-red-600 text-center">Failed to save, please try again.</p>}
            </CardFooter>
        </Card>
    );
}
