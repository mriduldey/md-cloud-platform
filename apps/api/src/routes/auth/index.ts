import express from 'express';
import { registerHandler } from './register';
import { loginHandler } from './login';
import { requireAuth } from '../../middleware/requireAuth';
import { googleAuthHandler } from './google';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/google', googleAuthHandler);

router.get('/me', requireAuth, (req: any, res: any) => {
    return res.json({ user: (req as any).user });
});
export default router;
