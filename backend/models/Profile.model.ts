import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface IStatistic {
  label: string;
  value: string;
  description?: string;
}

export interface IExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface IProfile extends Document {
  name: string;
  professionalTitle: string;
  tagline: string;
  biography: string;
  aboutMarkdown: string;
  profileImage: string;
  secondaryImage?: string;
  location: string;
  availability: string;
  yearsOfExperience: number;
  statistics: IStatistic[];
  experience: IExperienceItem[];
  socialLinks: ISocialLink[];
  email: string;
  phone?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, trim: true },
    professionalTitle: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    biography: { type: String, required: true },
    aboutMarkdown: { type: String, required: true },
    profileImage: { type: String, required: true },
    secondaryImage: { type: String },
    location: { type: String, required: true },
    availability: { type: String, default: 'Available for Select Architecture & Full-Stack Engagements' },
    yearsOfExperience: { type: Number, default: 8 },
    statistics: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        description: { type: String },
      },
    ],
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        current: { type: Boolean, default: false },
        description: [{ type: String }],
        technologies: [{ type: String }],
      },
    ],
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String },
      },
    ],
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    resumeUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
