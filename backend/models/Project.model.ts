import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProjectArchitecture {
  frontend?: string;
  backend?: string;
  database?: string;
  infrastructure?: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  featuredImage: string;
  galleryImages: string[];
  technologies: string[];
  category: 'Full-Stack' | 'Cloud & Systems' | 'AI & ML' | 'Fintech' | 'Open Source';
  architecture?: IProjectArchitecture;
  metrics?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    tagline: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    keyFeatures: [{ type: String }],
    featuredImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    technologies: [{ type: String, required: true }],
    category: {
      type: String,
      enum: ['Full-Stack', 'Cloud & Systems', 'AI & ML', 'Fintech', 'Open Source'],
      default: 'Full-Stack',
      index: true,
    },
    architecture: {
      frontend: { type: String },
      backend: { type: String },
      database: { type: String },
      infrastructure: { type: String },
    },
    metrics: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    published: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ published: 1, displayOrder: 1 });
ProjectSchema.index({ category: 1, published: 1 });

export const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
