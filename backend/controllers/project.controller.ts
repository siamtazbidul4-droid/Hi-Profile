import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.model.js';
import { ProjectSchema } from '../validators/schemas.js';

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, featured, search, includeUnpublished } = req.query;
    const filter: Record<string, any> = {};

    // Only allow viewing unpublished if explicitly requested by admin
    if (includeUnpublished !== 'true') {
      filter.published = true;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
}

export async function getProjectBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug }).lean();

    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }

    // Fetch up to 3 related projects in the same category or overall
    const related = await Project.find({
      _id: { $ne: project._id },
      published: true,
      category: project.category,
    })
      .limit(3)
      .select('title slug shortDescription featuredImage technologies category')
      .lean();

    res.json({ success: true, data: project, related });
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = ProjectSchema.parse(req.body);
    const existing = await Project.findOne({ slug: validatedData.slug });
    if (existing) {
      res.status(409).json({ success: false, error: 'A project with this slug already exists.' });
      return;
    }

    const project = await Project.create(validatedData);
    res.status(201).json({ success: true, message: 'Project created successfully.', data: project });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = ProjectSchema.parse(req.body);

    const project = await Project.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }

    res.json({ success: true, message: 'Project updated successfully.', data: project });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found.' });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
