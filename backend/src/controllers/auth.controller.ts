import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        expiresIn: '1h',
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
        user: newUser._id,
    });
};
