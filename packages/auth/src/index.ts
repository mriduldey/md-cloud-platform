// Example auth logic

export function isAuthenticated(token: string | null): boolean {
    return Boolean(token && token.startsWith("Bearer "));
}
