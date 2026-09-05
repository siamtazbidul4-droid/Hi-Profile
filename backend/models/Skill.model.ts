import mongoose, { Document, Schema, Model } from 'mongoose';

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';

export interface ISkill extends Document {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 to 100
  icon: string; // lucide icon identifier or tech tag
  experienceYears?: number;
  highlightText?: string;
  displayOrder: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'],
      required: true,
      index: true,
    },
    proficiency: { type: Number, required: true, min: 0, max: 100, default: 85 },
    icon: { type: String, required: true, default: 'Code' },
    experienceYears: { type: Number, default: 5 },
    highlightText: { type: String },
    displayOrder: { type: Number, default: 0, index: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
  },
  {
    timestamps: true,
  }
);

SkillSchema.index({ category: 1, status: 1, displayOrder: 1 });

export const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
