import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });

    const token = auth.split(' ')[1];

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) return res.status(500).json({ message: 'JWT_SECRET not configured' });
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // { id, email }
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
