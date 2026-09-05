import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISiteSetting extends Document {
  siteTitle: string;
  siteDescription: string;
  tagline: string;
  contactEmail: string;
  phone?: string;
  location: string;
  timezone: string;
  availabilityBanner: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  discordUrl?: string;
  resumePdfUrl: string;
  seoKeywords: string[];
  googleAnalyticsId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    siteTitle: { type: String, default: 'Alexander Vance — Senior Full-Stack & Systems Architect' },
    siteDescription: {
      type: String,
      default: 'Luxury developer portfolio showcasing distributed systems, high-concurrency Node.js/React architectures, and MongoDB Atlas database engineering.',
    },
    tagline: { type: String, default: 'Designing resilient full-stack systems and luxury digital interfaces.' },
    contactEmail: { type: String, default: 'alexander.vance.dev@gmail.com' },
    phone: { type: String, default: '+1 (555) 234-8900' },
    location: { type: String, default: 'San Francisco, CA / Remote Worldwide' },
    timezone: { type: String, default: 'UTC-8 (PST / PDT)' },
    availabilityBanner: { type: String, default: 'Q3/Q4 Architecture Advisory & Lead Engineering: Open' },
    githubUrl: { type: String, default: 'https://github.com' },
    linkedinUrl: { type: String, default: 'https://linkedin.com' },
    twitterUrl: { type: String, default: 'https://x.com' },
    discordUrl: { type: String, default: 'https://discord.com' },
    resumePdfUrl: { type: String, default: 'https://example.com/resume.pdf' },
    seoKeywords: [{ type: String }],
    googleAnalyticsId: { type: String },
  },
  {
    timestamps: true,
  }
);

export const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
