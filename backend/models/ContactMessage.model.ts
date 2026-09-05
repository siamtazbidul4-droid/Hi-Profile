import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectBudget?: string;
  timeline?: string;
  isRead: boolean;
  isArchived: boolean;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    projectBudget: { type: String },
    timeline: { type: String },
    isRead: { type: Boolean, default: false, index: true },
    isArchived: { type: Boolean, default: false, index: true },
    ipAddress: { type: String },
  },
  {
    timestamps: true,
  }
);

ContactMessageSchema.index({ isRead: 1, createdAt: -1 });

export const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
