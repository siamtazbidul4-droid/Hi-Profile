import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial.model.js';
import { TestimonialSchema } from '../validators/schemas.js';

export async function getTestimonials(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { includeDrafts, featured } = req.query;
    const filter: Record<string, any> = {};

    if (includeDrafts !== 'true') {
      filter.status = 'published';
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const testimonials = await Testimonial.find(filter).sort({ displayOrder: 1, createdAt: -1 }).lean();
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    next(err);
  }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = TestimonialSchema.parse(req.body);
    const testimonial = await Testimonial.create(validatedData);
    res.status(201).json({ success: true, message: 'Testimonial created successfully.', data: testimonial });
  } catch (err) {
    next(err);
  }
}

export async function updateTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = TestimonialSchema.parse(req.body);
    const testimonial = await Testimonial.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!testimonial) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, message: 'Testimonial updated successfully.', data: testimonial });
  } catch (err) {
    next(err);
  }
}

export async function deleteTestimonial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      res.status(404).json({ success: false, error: 'Testimonial not found.' });
      return;
    }
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
