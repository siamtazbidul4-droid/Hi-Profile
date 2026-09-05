import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ProfileUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  professionalTitle: z.string().min(1, 'Professional title is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  biography: z.string().min(10, 'Biography is required'),
  aboutMarkdown: z.string().min(10, 'About markdown is required'),
  profileImage: z.string().url('Profile image must be a valid URL'),
  secondaryImage: z.string().url('Secondary image must be a valid URL').optional().or(z.literal('')),
  location: z.string().min(1, 'Location is required'),
  availability: z.string().min(1, 'Availability is required'),
  yearsOfExperience: z.number().min(0),
  statistics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      description: z.string().optional(),
    })
  ).optional(),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      current: z.boolean().default(false),
      description: z.array(z.string()),
      technologies: z.array(z.string()),
    })
  ).optional(),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url(),
      icon: z.string().optional(),
    })
  ).optional(),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  resumeUrl: z.string().optional().or(z.literal('')),
});

export const ProjectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  tagline: z.string().min(5, 'Tagline is required'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 characters'),
  problem: z.string().min(10, 'Problem overview is required'),
  solution: z.string().min(10, 'Solution overview is required'),
  keyFeatures: z.array(z.string()).default([]),
  featuredImage: z.string().url('Featured image must be a valid URL'),
  galleryImages: z.array(z.string().url()).default([]),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  category: z.enum(['Full-Stack', 'Cloud & Systems', 'AI & ML', 'Fintech', 'Open Source']),
  architecture: z.object({
    frontend: z.string().optional(),
    backend: z.string().optional(),
    database: z.string().optional(),
    infrastructure: z.string().optional(),
  }).optional(),
  metrics: z.array(z.string()).optional(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Tools']),
  proficiency: z.number().min(0).max(100),
  icon: z.string().default('Code'),
  experienceYears: z.number().min(0).default(5),
  highlightText: z.string().optional(),
  displayOrder: z.number().default(0),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const ServiceSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  subtitle: z.string().min(2, 'Subtitle is required'),
  description: z.string().min(10, 'Description is required'),
  icon: z.string().default('Layers'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  deliverables: z.array(z.string()).default([]),
  idealFor: z.string().min(2, 'Ideal for description is required'),
  priceRange: z.string().min(1, 'Price range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  displayOrder: z.number().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const TestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  avatar: z.string().url('Avatar must be a valid URL'),
  testimonial: z.string().min(10, 'Testimonial is required'),
  rating: z.number().min(1).max(5).default(5),
  projectRelation: z.string().optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  status: z.enum(['published', 'draft']).default('published'),
});

export const BlogPostSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.string().min(20, 'Content is required'),
  coverImage: z.string().url('Cover image must be a valid URL'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  readingTime: z.string().default('5 min read'),
  status: z.enum(['published', 'draft']).default('published'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featured: z.boolean().default(false),
});

export const ContactMessageSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().trim().email('Please provide a valid email address').max(200, 'Email must be at most 200 characters'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be at most 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be at most 5000 characters'),
  projectBudget: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
});

export const SiteSettingSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  tagline: z.string().min(1),
  contactEmail: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  timezone: z.string().min(1),
  availabilityBanner: z.string().min(1),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  twitterUrl: z.string().url(),
  discordUrl: z.string().optional(),
  resumePdfUrl: z.string(),
  seoKeywords: z.array(z.string()).default([]),
  googleAnalyticsId: z.string().optional(),
});
