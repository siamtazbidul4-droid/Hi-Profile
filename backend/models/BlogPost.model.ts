import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: Date;
  readingTime: string;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    author: {
      name: { type: String, default: 'Alexander Vance' },
      role: { type: String, default: 'Principal Systems Architect' },
      avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    },
    publishedAt: { type: Date, default: Date.now, index: true },
    readingTime: { type: String, default: '6 min read' },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
