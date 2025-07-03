
export function isAuthenticated(token: string | null): boolean {
    return Boolean(token && token.startsWith("Bearer "));
}

export * from './rbac';
export * from './jwt';