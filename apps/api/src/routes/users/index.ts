// apps/api/src/routes/users/index.ts

import express from 'express';
import { users } from './mock/user';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { profileHandler } from './profile';

const router = express.Router();

router.get('/', requireAuth, requireAdmin, (req, res) => {
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
