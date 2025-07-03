
import { User } from '@shared/index';

export function isAdmin(user: User) {
    return user.role === 'admin';
}

export function isModerator(user: User) {
    return user.role === 'admin' || user.role === 'moderator';
}