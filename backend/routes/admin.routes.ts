import { Router } from 'express';
import { getAdminStats, getDbHealth } from '../controllers/admin.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/stats', authenticateToken, requireRole(['ADMIN', 'EDITOR']), getAdminStats);
router.get('/db-status', authenticateToken, requireRole(['ADMIN', 'EDITOR']), getDbHealth);

export default router;
