// apps/api/src/routes/users/index.ts

import express from 'express';
import { users } from './mock/user';
import { requireAuth } from '../../middleware/requireAuth';
import { profileHandler } from './profile';
import { requireRole } from '../../middleware/requireRole';

const router = express.Router();

router.get('/', requireAuth, requireRole(['admin']), (req, res) => {
    const allUsers = Array.from(users.entries()).map(([email, data]) => ({
        email,
        name: data.name,
        avatar: data.avatar,
        role: data.role,
    }));
    res.json(allUsers);
    return;
});

router.put('/profile', requireAuth, profileHandler);

export default router;
