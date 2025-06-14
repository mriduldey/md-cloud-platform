import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';
import { users } from './mock/user';


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const loginHandler = async (req: any, res: any) => {
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

    const token = jwt.sign({ email }, JWT_SECRET!, {
        expiresIn: '1h',
    });

    return res.status(200).json({ token });
}