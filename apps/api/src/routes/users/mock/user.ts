import { User } from '@shared/index';

export const users = new Map<string, User>();

// Example: seed one admin and one normal user (optional for testing)
users.set('admin@example.com', {
    id: "1",
    passwordHash: '$2b$10$ZEM.wfzxY9z7PVW6mpvPW.BLeoHXjp7mBbWXManBuu2DPXpRg.Erq',
    name: 'Admin1',
    avatar: '',
    role: 'admin',
    email: 'admin@example.com',
});

users.set('user@example.com', {
    id: "2",
    passwordHash: '$2b$10$ZEM.wfzxY9z7PVW6mpvPW.BLeoHXjp7mBbWXManBuu2DPXpRg.Erq',
    name: 'User1',
    avatar: '',
    role: 'user',
    email: 'user@example.com'
});