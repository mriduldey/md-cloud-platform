// apps/api/src/middleware/requireAdmin.ts

import { Request, Response, NextFunction } from 'express';
import { users } from '../routes/users/mock/user';

export const requireAdmin = (req: any, res: Response, next: NextFunction): void => {
    const user = users.get(req.user?.email);
    if (!user || user.role !== 'admin') {
        res.status(403).json({ error: 'Forbidden: Admins only' });
        return;
    }
    next();
};
