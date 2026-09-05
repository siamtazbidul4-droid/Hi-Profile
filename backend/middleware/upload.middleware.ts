import multer from 'multer';
import { Request } from 'express';

// Use in-memory buffer storage so files are streamed directly to Cloudinary without local disk clutter
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Allow all standard image formats
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ];

  if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files (JPEG, PNG, WebP, GIF, SVG, AVIF) are supported.'));
  }
};

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file limit
  },
  fileFilter,
});
