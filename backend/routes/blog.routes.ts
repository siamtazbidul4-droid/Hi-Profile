import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blog.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), createBlogPost);
router.put('/:id', authenticateToken, requireRole(['ADMIN', 'EDITOR']), updateBlogPost);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), deleteBlogPost);

export default router;
