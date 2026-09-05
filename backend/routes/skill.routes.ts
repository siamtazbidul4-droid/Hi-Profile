import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skill.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSkills);
router.post('/', authenticateToken, requireRole(['ADMIN', 'EDITOR']), createSkill);
router.put('/:id', authenticateToken, requireRole(['ADMIN', 'EDITOR']), updateSkill);
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), deleteSkill);

export default router;
