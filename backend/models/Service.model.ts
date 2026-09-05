import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
  priceRange: string;
  timeline: string;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, default: 'Layers' },
    features: [{ type: String, required: true }],
    deliverables: [{ type: String }],
    idealFor: { type: String, required: true },
    priceRange: { type: String, required: true },
    timeline: { type: String, required: true },
    displayOrder: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published', index: true },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.index({ status: 1, displayOrder: 1 });

export const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
