import { Router } from 'express';
import {
  submitContactMessage,
  getAdminMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/contact.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';
import { contactRateLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

router.post('/', contactRateLimiter, submitContactMessage);
router.get('/admin', authenticateToken, requireRole(['ADMIN']), getAdminMessages);
router.patch('/admin/:id', authenticateToken, requireRole(['ADMIN']), updateMessageStatus);
router.delete('/admin/:id', authenticateToken, requireRole(['ADMIN']), deleteMessage);

export default router;
