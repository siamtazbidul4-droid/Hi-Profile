import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/setting.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticateToken, requireRole(['ADMIN']), updateSettings);

export default router;
