import { Request, Response } from 'express';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';

export async function uploadSingleImage(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No image file was provided in the request payload. Ensure field name is "file" or "image".',
      });
      return;
    }

    const folder = (req.body?.folder as string) || (req.query?.folder as string) || 'portfolio';
    const originalName = req.file.originalname;

    const result = await uploadBufferToCloudinary(req.file.buffer, folder, originalName);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        original_filename: originalName,
      },
      message: 'Image uploaded successfully to Cloudinary.',
    });
  } catch (error: any) {
    console.error('[Upload Controller Error]', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload image to Cloudinary.',
      details: error.http_code ? `Cloudinary HTTP status: ${error.http_code}` : undefined,
    });
  }
}

export async function deleteUploadedImage(req: Request, res: Response): Promise<void> {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      res.status(400).json({
        success: false,
        error: 'Cloudinary public_id is required to delete an image.',
      });
      return;
    }

    const result = await deleteFromCloudinary(public_id);
    res.status(200).json({
      success: true,
      data: result,
      message: 'Image removed from Cloudinary.',
    });
  } catch (error: any) {
    console.error('[Cloudinary Delete Error]', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete image from Cloudinary.',
    });
  }
}
