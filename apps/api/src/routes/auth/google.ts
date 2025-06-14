import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthHandler = async (req: any, res: any) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ error: 'Missing Google credential' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const email = payload?.email;

        if (!email) {
            return res.status(400).json({ error: 'Email not found in Google payload' });
        }

        // Optionally create user in mock DB here

        const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        return res.json({ token });
    } catch (err) {
        console.error('Google OAuth error:', err);
        return res.status(401).json({ error: 'Invalid Google credential' });
    }
};
