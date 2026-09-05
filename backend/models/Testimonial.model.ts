import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  avatar: string;
  testimonial: string;
  rating: number;
  projectRelation?: string;
  featured: boolean;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    avatar: { type: String, required: true },
    testimonial: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    projectRelation: { type: String },
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ status: 1, displayOrder: 1 });

export const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
