export type UserRole = 'ADMIN' | 'EDITOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Statistic {
  label: string;
  value: string;
  description?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ProfileData {
  _id?: string;
  name: string;
  professionalTitle: string;
  tagline: string;
  biography: string;
  aboutMarkdown?: string;
  profileImage: string;
  secondaryImage?: string;
  location: string;
  availability: string;
  yearsOfExperience: number;
  statistics: Statistic[];
  experience?: ExperienceItem[];
  socialLinks?: SocialLink[];
  email: string;
  phone?: string;
  resumeUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProjectCategory = 'Full-Stack' | 'Cloud & Systems' | 'AI & ML' | 'Fintech' | 'Open Source';

export interface ProjectArchitecture {
  frontend?: string;
  backend?: string;
  database?: string;
  infrastructure?: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  fullDescription?: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  featuredImage: string;
  galleryImages?: string[];
  technologies: string[];
  category: ProjectCategory;
  architecture?: ProjectArchitecture;
  metrics?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';

export interface SkillData {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon: string;
  experienceYears?: number;
  highlightText?: string;
  displayOrder: number;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceData {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  deliverables?: string[];
  idealFor?: string;
  priceRange: string;
  timeline: string;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialData {
  _id: string;
  clientName?: string;
  name?: string;
  role: string;
  company: string;
  avatar: string;
  quote?: string;
  testimonial?: string;
  rating: number;
  projectRef?: string;
  projectRelation?: string;
  featured?: boolean;
  displayOrder?: number;
  status?: 'published' | 'draft';
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPostData {
  _id: string;
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
  publishedAt: string;
  readingTime: string;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessageData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectBudget?: string;
  timeline?: string;
  isRead: boolean;
  isArchived?: boolean;
  ipAddress?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SiteSettingsData {
  _id?: string;
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
  availabilityBannerText?: string;
  isAvailableForHire?: boolean;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    medium?: string;
  };
}

export type SiteSettingData = SiteSettingsData;

export interface DbStatus {
  connected: boolean;
  state: string;
  mode: 'memory' | 'atlas' | 'disconnected';
  host: string;
  port?: number;
  databaseName: string;
  uri: string;
  collections: { name: string; count: number }[];
}

export interface DatabaseStatus {
  connected: boolean;
  mode: 'atlas' | 'memory' | 'disconnected';
  uriSanitized: string;
  host: string;
  dbName: string;
  modelsRegistered: string[];
}

export interface AdminStats {
  projects: { total: number; published: number };
  blog: { total: number; published: number };
  services: { total: number; published: number };
  skills: { total: number; active: number };
  testimonials: { total: number };
  messages: { total: number; unread: number };
  latestMessages: ContactMessageData[];
  database: DatabaseStatus;
}
