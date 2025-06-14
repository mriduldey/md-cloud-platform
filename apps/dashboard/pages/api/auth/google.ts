import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const backendRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
            req.body,
            { headers: { 'Content-Type': 'application/json' } }
        );

        res.status(backendRes.status).json(backendRes.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
