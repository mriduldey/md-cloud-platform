import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';
import { users } from './mock/user';


const authRouter = Router();

// Zod schema
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

authRouter.post('/register', async (req: any, res: any) => {
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
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

authRouter.post('/login', async (req: any, res: any) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const { email, password } = result.data;

    const user = users.get(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    return res.status(200).json({ token });
})

export default authRouter;
