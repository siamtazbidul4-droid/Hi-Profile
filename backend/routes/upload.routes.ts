import { Router } from 'express';
import { uploadMiddleware } from '../middleware/upload.middleware.js';
import { uploadSingleImage, deleteUploadedImage } from '../controllers/upload.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * POST /api/upload
 * Protected route for admin asset and image uploads to Cloudinary
 */
router.post(
  '/',
  authenticateToken,
  (req, res, next) => {
    // Handle both 'file' and 'image' field names gracefully
    uploadMiddleware.single('file')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      if (!req.file) {
        // Try fallback field name 'image'
        uploadMiddleware.single('image')(req, res, (err2) => {
          if (err2) {
            return res.status(400).json({ success: false, error: err2.message });
          }
          next();
        });
        return;
      }
      next();
    });
  },
  uploadSingleImage
);

/**
 * DELETE /api/upload
 * Optional deletion from Cloudinary by public_id
 */
router.delete('/', authenticateToken, deleteUploadedImage);

export default router;
