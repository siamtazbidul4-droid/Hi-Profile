import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User, IUser, UserRole } from '../models/User.model.js';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined = req.cookies?.[config.cookieName];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Authentication required. Please sign in to access this resource.',
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Session expired or user account no longer exists.',
      });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        error: 'Your session has expired. Please log in again.',
      });
      return;
    }
    res.status(401).json({
      success: false,
      error: 'Invalid authentication token.',
    });
  }
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required.',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Forbidden: This action requires one of the following roles: [${allowedRoles.join(', ')}]`,
      });
      return;
    }

    next();
  };
}
