// apps/api/src/routes/users/profile.ts

import { z } from 'zod';
import { users } from './mock/user';

const schema = z.object({
    name: z.string().min(1),
    avatar: z.string().url().optional(),
});

export const profileHandler = async (req: any, res: any) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });

    const user = users.get(req.user.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = result.data.name;
    if (result.data.avatar) user.avatar = result.data.avatar;

    users.set(req.user.email, user); // Not strictly needed for Map reference, but safe

    res.json({ message: 'Profile updated', user });
};
