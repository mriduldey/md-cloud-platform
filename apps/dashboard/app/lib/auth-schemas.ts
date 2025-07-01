// apps/dashboard/lib/auth-schemas.ts
import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
