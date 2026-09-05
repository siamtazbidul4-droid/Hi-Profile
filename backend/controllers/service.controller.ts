import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service.model.js';
import { ServiceSchema } from '../validators/schemas.js';

export async function getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { includeDrafts } = req.query;
    const filter: Record<string, any> = {};

    if (includeDrafts !== 'true') {
      filter.status = 'published';
    }

    const services = await Service.find(filter).sort({ displayOrder: 1, createdAt: 1 }).lean();
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    next(err);
  }
}

export async function createService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = ServiceSchema.parse(req.body);
    const service = await Service.create(validatedData);
    res.status(201).json({ success: true, message: 'Service created successfully.', data: service });
  } catch (err) {
    next(err);
  }
}

export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = ServiceSchema.parse(req.body);
    const service = await Service.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found.' });
      return;
    }
    res.json({ success: true, message: 'Service updated successfully.', data: service });
  } catch (err) {
    next(err);
  }
}

export async function deleteService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      res.status(404).json({ success: false, error: 'Service not found.' });
      return;
    }
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
