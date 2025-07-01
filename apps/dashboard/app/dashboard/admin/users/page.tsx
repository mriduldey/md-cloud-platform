'use client';

import { useState, useEffect } from 'react';
import { columns, User } from './columns';
import { DataTable } from './data-table';
import { apiRequest } from '../../../../lib/api';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function loadUsers() {
            try {
                const token = localStorage.getItem('token') || '';
                const data = await apiRequest<User[]>('/user', { token });
                setUsers(data);
            } catch (err: any) {
                console.error('Failed to fetch users:', err);
                setError(err.message || 'Could not load users');
            }
        }
        loadUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">User Management</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {users === null ? (
                <p>Loading...</p>
            ) : users.length > 0 ? (
                <DataTable columns={columns} data={users} />
            ) : (
                <p className="text-gray-500">No users found.</p>
            )}
        </div>
    );
}
