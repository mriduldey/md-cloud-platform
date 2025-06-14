import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';
import { users } from './mock/user';

// Zod schema
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const registerHandler = async (req: any, res: any) => {
    try {
        const parsed = registerSchema.parse(req.body);

        if (users.has(parsed.email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(parsed.password, 10);
        users.set(parsed.email, { passwordHash });

        const token = jwt.sign({ email: parsed.email }, JWT_SECRET!, {
            expiresIn: '1h',
        });

        return res.status(201).json({ token });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.errors });
        }
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}