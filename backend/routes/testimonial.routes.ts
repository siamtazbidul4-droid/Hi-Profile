import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getTestimonials);
router.post('/', authenticateToken, requireRole(['ADMIN']), createTestimonial);
router.put('/:id', authenticateToken, requireRole(['ADMIN']), updateTestimonial);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), deleteTestimonial);

export default router;
