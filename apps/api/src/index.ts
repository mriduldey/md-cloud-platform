import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth/index';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ✅ Mount router
app.use('/api/auth', authRouter);

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
