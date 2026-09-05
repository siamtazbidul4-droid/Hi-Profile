import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { config } from '../config/env.js';
import { LoginSchema } from '../validators/schemas.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = LoginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your email and password.',
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please verify your email and password.',
      });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Set secure HTTP-only cookie
    res.cookie(config.cookieName, token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token, // Also return token for clients that prefer Bearer headers
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.clearCookie(config.cookieName, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
}

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Not authenticated.',
    });
    return;
  }

  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      avatar: req.user.avatar,
    },
  });
}
