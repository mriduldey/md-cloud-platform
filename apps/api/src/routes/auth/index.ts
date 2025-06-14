import express from 'express';
import { registerHandler } from './register';
import { loginHandler } from './login';

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
