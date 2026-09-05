import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.model.js';
import { BlogPost } from '../models/BlogPost.model.js';
import { Service } from '../models/Service.model.js';
import { Skill } from '../models/Skill.model.js';
import { Testimonial } from '../models/Testimonial.model.js';
import { ContactMessage } from '../models/ContactMessage.model.js';
import { getDatabaseStatus } from '../config/database.js';

export async function getAdminStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalBlogPosts,
      publishedPosts,
      totalServices,
      publishedServices,
      totalSkills,
      activeSkills,
      totalTestimonials,
      totalMessages,
      unreadMessages,
      latestMessages,
      dbStatus,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ status: 'published' }),
      Service.countDocuments(),
      Service.countDocuments({ status: 'published' }),
      Skill.countDocuments(),
      Skill.countDocuments({ status: 'active' }),
      Testimonial.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
      getDatabaseStatus(),
    ]);

    res.json({
      success: true,
      data: {
        projects: { total: totalProjects, published: publishedProjects },
        blog: { total: totalBlogPosts, published: publishedPosts },
        services: { total: totalServices, published: publishedServices },
        skills: { total: totalSkills, active: activeSkills },
        testimonials: { total: totalTestimonials },
        messages: { total: totalMessages, unread: unreadMessages },
        latestMessages,
        database: dbStatus,
      },
    });
  } catch (err) {
    next(err);
  }
}

export function getDbHealth(req: Request, res: Response): void {
  const status = getDatabaseStatus();
  res.json({
    success: true,
    data: status,
  });
}
