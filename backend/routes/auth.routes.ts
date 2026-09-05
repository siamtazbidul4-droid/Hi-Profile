import { Router } from 'express';
import { login, logout, getMe } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { authRateLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/login', authRateLimiter, login);
router.post('/logout', logout);
router.get('/me', authenticateToken, getMe);

export default router;
