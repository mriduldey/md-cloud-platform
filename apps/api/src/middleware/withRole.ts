import { NextFunction } from 'express';
import { getUserFromToken } from '@auth/index'; // Adjust path based on your structure

export function withRole(allowedRoles: string[]) {
    return async (req: any, res: any, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({ error: 'Unauthorized: No token provided' });
            }

            const user = await getUserFromToken(token);
            if (!user || !allowedRoles.includes(user.role)) {
                return res.status(403).json({ error: 'Forbidden: Access denied' });
            }

            // Attach user to request for further handlers
            (req as any).user = user;

            next();
        } catch (error) {
            console.error('RBAC error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
