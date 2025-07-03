// apps/api/src/middleware/requireRole.ts

import { NextFunction } from 'express';
import { getUserFromToken } from '@auth/index';

export function requireRole(allowedRoles: string[]) {
    return async (req: any, res: any, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token' });
        }

        const token = authHeader.replace('Bearer ', '');
        const user = await getUserFromToken(token);

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ error: 'Forbidden: Access denied' });
        }

        // Attach user to request object for downstream use
        (req as any).user = user;

        return next();
    };
}
