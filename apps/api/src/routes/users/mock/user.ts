// 🔐 In-memory mock user store
export type User = {
    passwordHash: string;
    name: string;
    avatar: string;
    role: 'admin' | 'user';
};

export const users = new Map<string, User>();

// Example: seed one admin and one normal user (optional for testing)
users.set('admin@example.com', {
    passwordHash: '$2b$10$ZEM.wfzxY9z7PVW6mpvPW.BLeoHXjp7mBbWXManBuu2DPXpRg.Erq',
    name: 'Admin1',
    avatar: '',
    role: 'admin',
});

users.set('user@example.com', {
    passwordHash: '$2b$10$ZEM.wfzxY9z7PVW6mpvPW.BLeoHXjp7mBbWXManBuu2DPXpRg.Erq',
    name: 'User1',
    avatar: '',
    role: 'user',
});