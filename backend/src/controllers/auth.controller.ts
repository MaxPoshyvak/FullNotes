import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { MagicToken } from '../models/MagicToken';
import { generateToken } from '../utils/generateToken';
import { sendMagicLinkEmail } from '../utils/sendEmail';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid email or password',
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid email or password',
        });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: 'JWT_SECRET not configured' });

    const accessToken = jwt.sign({ id: user._id, email: user.email }, secret, {
        expiresIn: '7d',
    });

    user.accessToken = accessToken;
    await user.save();

    res.json({
        status: 'ok',
        message: 'User logged in successfully',
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
};

export const registerController = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            status: 'error',
            message: 'User already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
        email,
        username,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        status: 'ok',
        message: 'User registered successfully',
        user: {
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
        },
    });
};

// controllers/auth.controller.ts

export const requestMagicLink = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }

    // створюємо користувача, якщо нема
    await User.findOneAndUpdate({ email }, { email }, { upsert: true });

    const token = generateToken();

    await MagicToken.create({
        email,
        token,
        used: false,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 хв
    });

    const link = `http://localhost:3000/magic-login?token=${token}`;

    await sendMagicLinkEmail(email, link);

    res.json({ message: 'Magic link sent' });
};

export const verifyMagicLink = async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Token required' });
    }

    const magicToken = await MagicToken.findOne({ token });

    if (!magicToken) {
        return res.status(400).json({ message: 'Invalid token' });
    }

    if (magicToken.used) {
        return res.status(400).json({ message: 'Token already used' });
    }

    if (magicToken.expiresAt < new Date()) {
        return res.status(400).json({ message: 'Token expired' });
    }

    magicToken.used = true;
    await magicToken.save();

    const user = await User.findOne({ email: magicToken.email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // 🔐 створюємо JWT
    const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    });

    res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        token: accessToken,
    });
};
