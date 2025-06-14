import express from 'express';
import { registerHandler } from './register';
import { loginHandler } from './login';
import { requireAuth } from '../../middleware/requireAuth';
import { googleLoginHandler } from './google';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/google', googleLoginHandler);

router.get('/me', requireAuth, (req: any, res: any) => {
    return res.json({ user: (req as any).user });
});
export default router;
