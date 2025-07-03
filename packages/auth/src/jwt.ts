import jwt from 'jsonwebtoken';
import type { JwtUserPayload } from '@shared/index';

const JWT_SECRET = process.env.JWT_SECRET || 'default-dev-secret'; // use env

export async function getUserFromToken(token: string): Promise<JwtUserPayload | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload & {
            iat?: number;
            exp?: number;
        };

        return {
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
        };
    } catch (err) {
        console.error('JWT verification failed:', err);
        return null;
    }
}

export function signJwt(user: JwtUserPayload): string {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
}
