import { Request, Response, NextFunction } from 'express';
import { BlogPost } from '../models/BlogPost.model.js';
import { BlogPostSchema } from '../validators/schemas.js';

export async function getBlogPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, tag, search, includeDrafts, page = '1', limit = '10' } = req.query;
    const filter: Record<string, any> = {};

    if (includeDrafts !== 'true') {
      filter.status = 'published';
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (tag && typeof tag === 'string') {
      filter.tags = tag;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [posts, total] = await Promise.all([
      BlogPost.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(limitNum).lean(),
      BlogPost.countDocuments(filter),
    ]);

    // Aggregate unique categories and tags
    const allPublished = await BlogPost.find({ status: 'published' }).select('category tags').lean();
    const categoriesSet = new Set<string>();
    const tagsSet = new Set<string>();
    for (const p of allPublished) {
      if (p.category) categoriesSet.add(p.category);
      if (Array.isArray(p.tags)) {
        for (const t of p.tags) tagsSet.add(t);
      }
    }

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
      meta: {
        categories: Array.from(categoriesSet),
        tags: Array.from(tagsSet),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getBlogPostBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      res.status(404).json({ success: false, error: 'Article not found.' });
      return;
    }

    // Increment views atomically in background
    BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).exec();

    // Fetch related articles
    const related = await BlogPost.find({
      _id: { $ne: post._id },
      status: 'published',
      category: post.category,
    })
      .limit(3)
      .select('title slug excerpt coverImage publishedAt readingTime category')
      .lean();

    res.json({ success: true, data: post, related });
  } catch (err) {
    next(err);
  }
}

export async function createBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = BlogPostSchema.parse(req.body);
    const existing = await BlogPost.findOne({ slug: validatedData.slug });
    if (existing) {
      res.status(409).json({ success: false, error: 'An article with this slug already exists.' });
      return;
    }

    const post = await BlogPost.create(validatedData);
    res.status(201).json({ success: true, message: 'Article created successfully.', data: post });
  } catch (err) {
    next(err);
  }
}

export async function updateBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = BlogPostSchema.parse(req.body);
    const post = await BlogPost.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!post) {
      res.status(404).json({ success: false, error: 'Article not found.' });
      return;
    }
    res.json({ success: true, message: 'Article updated successfully.', data: post });
  } catch (err) {
    next(err);
  }
}

export async function deleteBlogPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      res.status(404).json({ success: false, error: 'Article not found.' });
      return;
    }
    res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
