import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'eQFMOx4WFy4NcW05rtKM68+SQhjtPI3IGNqklpJTdsk=',
  jwtExpiresIn: '7d',
  cookieName: 'portfolio_admin_token',
  adminEmail: process.env.ADMIN_EMAIL || 'siamtazbidul4@gmail.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Siam12345',
  clientUrl: process.env.CLIENT_URL || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'xrve6lry',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '662174295138434',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || 'AA2td8sw-JHSGOUVVsE5xtL-FYA',
  // SMTP Configuration (Gmail SMTP)
  smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpPort: parseInt(process.env.SMTP_PORT || '587', 10),
  smtpUser: process.env.SMTP_USER || 'siamtazbidul4@gmail.com',
  smtpPassword: process.env.SMTP_PASSWORD || 'ltcpshyfsotigxow',
  smtpFromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'siamtazbidul4@gmail.com',
  smtpFromName: process.env.SMTP_FROM_NAME || 'best protfilue',
  contactReceiverEmail: process.env.CONTACT_RECEIVER_EMAIL || process.env.ADMIN_EMAIL || 'siamtazbidul4@gmail.com',
};
