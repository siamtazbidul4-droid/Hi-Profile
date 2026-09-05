import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), createProject);
router.put('/:id', authenticateToken, requireRole(['ADMIN', 'EDITOR']), updateProject);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), deleteProject);

export default router;
