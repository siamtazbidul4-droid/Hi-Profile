import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticateToken, requireRole(['ADMIN']), updateProfile);

export default router;
