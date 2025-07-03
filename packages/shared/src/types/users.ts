// packages/shared/src/types/user.ts
export type UserRole = 'admin' | 'user' | 'moderator';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    passwordHash: string;
}
