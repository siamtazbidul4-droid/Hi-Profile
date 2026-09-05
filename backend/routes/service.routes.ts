import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getServices);
router.post('/', authenticateToken, requireRole(['ADMIN']), createService);
router.put('/:id', authenticateToken, requireRole(['ADMIN']), updateService);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), deleteService);

export default router;
