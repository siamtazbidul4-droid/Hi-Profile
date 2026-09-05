import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { config } from '../config/env.js';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

/**
 * Uploads a file buffer directly to Cloudinary using upload_stream
 * @param buffer Buffer from multer
 * @param folder Cloudinary target folder
 * @param filename Optional filename or public_id prefix
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string = 'portfolio',
  filename?: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const options: Record<string, any> = {
      folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };

    if (filename) {
      const sanitizedName = filename
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '_');
      options.public_id = `${sanitizedName}_${Date.now()}`;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('[Cloudinary Upload Error]', error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Cloudinary upload result returned empty.'));
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an image from Cloudinary by public ID
 */
export async function deleteFromCloudinary(publicId: string): Promise<any> {
  return cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
