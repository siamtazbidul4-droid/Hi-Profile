import { Request, Response, NextFunction } from 'express';
import { SiteSetting } from '../models/SiteSetting.model.js';
import { SiteSettingSchema } from '../validators/schemas.js';

export async function getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let settings = await SiteSetting.findOne().lean();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = SiteSettingSchema.parse(req.body);
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create(validatedData);
    } else {
      Object.assign(settings, validatedData);
      await settings.save();
    }
    res.json({ success: true, message: 'Site settings updated successfully.', data: settings });
  } catch (err) {
    next(err);
  }
}
