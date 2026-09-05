import { Request, Response, NextFunction } from 'express';
import { Profile } from '../models/Profile.model.js';
import { ProfileUpdateSchema } from '../validators/schemas.js';

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) {
      res.status(404).json({ success: false, error: 'Profile data not found.' });
      return;
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = ProfileUpdateSchema.parse(req.body);
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(validatedData);
    } else {
      Object.assign(profile, validatedData);
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      data: profile,
    });
  } catch (err) {
    next(err);
  }
}
