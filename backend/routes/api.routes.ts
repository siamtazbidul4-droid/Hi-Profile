import { Router } from 'express';
import authRoutes from './auth.routes.js';
import profileRoutes from './profile.routes.js';
import projectRoutes from './project.routes.js';
import skillRoutes from './skill.routes.js';
import serviceRoutes from './service.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import blogRoutes from './blog.routes.js';
import contactRoutes from './contact.routes.js';
import settingRoutes from './setting.routes.js';
import adminRoutes from './admin.routes.js';
import uploadRoutes from './upload.routes.js';
import { getDbHealth } from '../controllers/admin.controller.js';

const router = Router();

// Public health check and DB diagnostic endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/db/status', getDbHealth);

// Sub-routes
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/admin', adminRoutes);

export default router;
